<template>
  <q-card-section>
    <div class="flex justify-center">
      <!--        RACK-->
      <div class="q-mr-sm" v-if="clientConfirm">

        <div class="text-bold" style="font-size: 1rem">
          Doca Inicial
        </div>

        <q-input
          outlined
          v-model="tagsInfo.doca.initial"
          mask="##"
          unmasked-value
          reverse-fill-mask
          class="q-mb-sm"
          label="Doca Inicial"
        />

      </div>

      <div class="q-mr-sm" v-if="clientConfirm">

        <div class="text-bold" style="font-size: 1rem">
          Doca Final
        </div>

        <q-input
          outlined
          v-model="tagsInfo.doca.final"
          mask="##"
          unmasked-value
          reverse-fill-mask
          class="q-mb-sm"
          label="Doca Final"
        />

      </div>

      <div class="text-bold" style="font-size: 1rem" v-if="clientConfirm">
        <div class="text-bold" style="font-size: 1rem">
          Setor
        </div>



        <q-select
          outlined
          style="width: 250px"
          :options="sectorOption"
          v-model="tagsInfo.sector"
          class="q-mb-sm q-mr-sm"
          label="Setor"
        />
      </div>

      <div class="text-bold" v-if="!clientConfirm" style="font-size: 1rem">

        <div class="text-bold" style="font-size: 1rem">
          Cliente
        </div>
        <q-input
          outlined
          v-model="tagsInfo.client"
          class="q-mb-sm q-mr-sm"
          input-class="text-uppercase"
          label="Cliente"
        />
      </div>

      <div class="text-bold" v-if="!clientConfirm" style="font-size: 1rem">
        <div class="text-bold" style="font-size: 1rem">
          Cliente Abreviação
        </div>
        <q-input
          outlined
          v-model="tagsInfo.clientAbrev"
          class="q-mb-sm q-mr-sm"
          input-class="text-uppercase"
          label="Cliente Abreviação"
        />
      </div>

    </div>
  </q-card-section>

  <q-card-section class="text-center">
    <q-btn
      :label="clientConfirm ? 'Adicionar': 'Confirmar Cliente'"
      :icon="clientConfirm ? 'mdi-newspaper-plus' : 'mdi-account-multiple-plus'"
      outline
      @click="clientConfirm ? createLoading() : confirmClient()"
      color="primary"
    />
  </q-card-section>

</template>

<script>

export default {
  name: "cardInputDoca",

  data() {
    return {
      loading: false,
      printLabels: [],
      clientConfirm: false,

      // ======= OPTIONS DOS SETORES ========
      sectorOption: ['DOCAS DE SAÍDA', 'DOCAS DE ENTRADA', 'BUFEER DE CONSOLIDAÇÃO', 'BUFEER', 'CENTRO DE QUALIDADE', 'GARANTIA', 'MESA DE EMBALAGEM', 'MESA DE CONFERÊNCIA', 'IMPRESSORAS', 'DEVOLUÇÃO', 'PRONTO PARA ARMAZENAR', 'CROSSDOCKING', 'CORREDOR', 'CHECKOUT'],

      // ====== OBJ RECEBE O VALOR DOS INPUT =======
      tagsInfo: {
        sector: null,
        client: null,
        clientAbrev: null,
        doca: {
          initial: 1,
          final: null
        },
      }
    }
  },

  methods: {

    // ====== CONFIRMANDO CLIENTE ======
    confirmClient(){
      if(this.tagsInfo.client === null || this.tagsInfo.clientAbrev === null){
        this.$q.notify({
          type: 'negative',
          message: 'Preencha todos os campos',
          icon: 'warning'
        });
      }else{
        this.clientConfirm = true;
      }
    },

    // ====== ENCAMINHA PARA FUNÇÃO =======
    createLoading() {
      this.$q.loading.show({
        message: 'Gerando etiquetas...'
      })

      setTimeout(() => {
        this.validate(this.tagsInfo)
      }, 1000)
    },

    // ====== VERIFICAÇÕES ========
    validate(value) {
      console.log(value)
      if (
        value.doca.initial === null ||
        value.doca.final === null ||
        value.sector === null ||
        value.client === null ||
        value.clientAbrev === null
      ) {

        this.$q.notify({
          type: 'negative',
          message: 'Preencha todos os campos',
          icon: 'warning'
        });

        this.$q.loading.hide();

      } else if (
        value.doca.initial > value.doca.final
      ) {

        this.$q.notify({
          type: 'negative',
          message: 'Valor Inicial não pode ser menor que o valor Final',
          icon: 'warning'
        });

        this.$q.loading.hide();

      } else {
        this.mountedPrintLabels()
      }
    },

    // ====== FUNÇÃO QUE CRIA OS ENDEREÇOS =======
    async mountedPrintLabels() {

      for (let d = Number(this.tagsInfo.doca.initial); d <= Number(this.tagsInfo.doca.final); d++) {
        // ====== CRIA O OBJ DAS ETIQUETAS DOCAS ======
        const obj = {
          sector: this.tagsInfo.sector,
          client: this.tagsInfo.client.toUpperCase(),
          doca: ('0' + d).slice(-2),
          clientAbrev: this.tagsInfo.clientAbrev.toUpperCase(),
          id: this.printLabels.length + 1,
          address: `${this.verifySector(this.tagsInfo.sector)}${('0' + d).slice(-2)}${this.tagsInfo.clientAbrev.toUpperCase()}`,

        }
        // ======= ADICIONA O OBJ AO ARRAY ========
        this.printLabels.push(obj)
      }

      console.log(this.printLabels)

      this.$emit('printLabels', this.printLabels)
      this.$q.loading.hide()
    },

    verifySector(sector){

      switch (sector) {
        case 'DOCAS DE SAÍDA':
          return 'DS';

        case 'DOCAS DE ENTRADA':
          return 'DE';

        case 'BUFEER DE CONSOLIDAÇÃO':
          return 'BC';

        case 'BUFFER':
          return 'BU';

        case 'CENTRO DE QUALIDADE':
          return 'CQ';

        case 'GARANTIA':
          return 'GA';

        case 'MESA DE EMBALAGEM':
          return 'ME';

        case 'MESA DE CONFERÊNCIA':
          return 'MC'

        case 'IMPRESSORAS':
          return 'IMP';

        case 'DEVOLUÇÃO':
          return 'DV';

        case 'PRONTO PARA ARMAZENAR':
          return 'PA';

        case 'CROSSDOCKING':
          return 'CD';

        case 'CORREDOR':
          return 'CO';

        case 'CHECKOUT':
          return 'CK';

        default:
          return 'DC'
      }

    }
  }
}
</script>

<style scoped>

</style>
