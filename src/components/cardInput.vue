<template>
    <q-card-section>
      <div class="flex justify-center">
<!--        SETOR-->
        <div class="q-mr-sm">

          <div class="text-bold" style="font-size: 1rem">
            Setor
          </div>

          <q-select
            outlined
            style="width: 90px"
            :options="sectorOption"
            v-model="tagsInfo.sector"
            label="Setor"
            behavior="dialog"
          />
        </div>

<!--        RACK-->
        <div class="q-mr-sm">

          <div class="text-bold" style="font-size: 1rem">
            Rack
          </div>

          <q-input
            outlined
            v-model="tagsInfo.rack.initial"
            mask="##"
            unmasked-value
            reverse-fill-mask
            class="q-mb-sm"
            label="Rack Inicial"
          />

          <q-input
            outlined
            v-model="tagsInfo.rack.final"
            mask="##"
            unmasked-value
            reverse-fill-mask
            label="Rack Final"
          />

        </div>

<!--        PREDIO-->
        <div class="q-mr-sm">

          <div class="text-bold" style="font-size: 1rem">
            Prédio
          </div>

          <q-input
            outlined
            v-model="tagsInfo.predio.initial"
            mask="##"
            unmasked-value
            reverse-fill-mask
            class="q-mb-sm"
            label="Prédio Inicial"
          />

          <q-input
            outlined
            v-model="tagsInfo.predio.final"
            mask="##"
            unmasked-value
            reverse-fill-mask
            label="Prédio Final"
          />

        </div>

<!--        APTO-->
        <div class="q-mr-sm">

          <div class="text-bold" style="font-size: 1rem">
            Apto
          </div>

          <q-input
            outlined
            v-model="tagsInfo.apto.initial"
            mask="##"
            unmasked-value
            reverse-fill-mask
            class="q-mb-sm"
            label="Apto Inicial"
          />

          <q-input
            outlined
            v-model="tagsInfo.apto.final"
            mask="##"
            unmasked-value
            reverse-fill-mask
            label="Apto Final"
          />

        </div>

<!--        NIVEL-->
        <div class="q-mr-sm">

          <div class="text-bold" style="font-size: 1rem">
            Nivel
          </div>

          <q-input
            outlined
            v-model="tagsInfo.level.initial"
            mask="##"
            unmasked-value
            reverse-fill-mask
            class="q-mb-sm"
            label="Nivel Inicial"
          />

          <q-input
            outlined
            v-model="tagsInfo.level.final"
            mask="##"
            unmasked-value
            reverse-fill-mask
            label="Nivel Final"
          />

        </div>

      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-bold text-center q-mb-sm" style="font-size: 1rem">
        Informações adicionais
      </div>

      <div class="flex flex-center">

        <q-input
          outlined
          v-model="tagsInfo.client"

          class="q-mb-sm q-mr-sm"
          input-class="text-uppercase"

          label="Cliente"
        />

        <q-select
          outlined
          style="width: 150px"
          :options="typeOption"
          v-model="tagsInfo.type"
          class="q-mb-sm q-mr-sm"
          label="Tipo"
        />

        <q-select
          outlined
          style="width: 150px"
          :options="areaOption"
          v-model="tagsInfo.area"
          class="q-mb-sm q-mr-sm"
          label="Area"
        />

        <q-select
          outlined
          style="width: 150px"
          :options="sizeOption"
          class="q-mb-sm"
          v-model="tagsInfo.size"
          label="Tamanho"
        />


      </div>


    </q-card-section>

    <q-card-section class="text-center">
      <q-btn
        label="Gerar Etiquetas"
        icon="mdi-newspaper-plus"
        outline
        @click="createLoading()"
        color="primary"
      />
    </q-card-section>

</template>

<script>

export default {
  name: "cardInput",

  data(){
    return{
      loading: false,
      printLabels: [],

      // ======= OPTIONS DOS SETORES ========
      sectorOption: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      typeOption: ['PALLET PBR', 'FIXED'],
      sizeOption: ['90x15', '100x25', '100x75'],
      areaOption: ['PICKING', 'PULMAO'],

      // ====== OBJ RECEBE O VALOR DOS INPUT =======
      tagsInfo: {
        sector: 'A',
        client: null,
        type: null,
        size: null,
        area: null,
        rack: {
          initial: 1,
          final: null
        },
        predio: {
          initial: 1,
          final: null
        },
        apto: {
          initial: 1,
          final: null
        },
        level: {
          initial: 1,
          final: null
        }
      }
    }
  },

  methods:{

    // ====== ENCAMINHA PARA FUNÇÃO =======
    createLoading(){
      this.$q.loading.show({
        message: 'Gerando etiquetas...'
      })

      setTimeout(()=>{
        this.validate(this.tagsInfo)
      },1000)
    },

    // ====== VERIFICAÇÕES ========
    validate(value){
      console.log(value)
      if (
        value.apto.initial === null ||
        value.apto.final === null ||
        value.rack.initial === null  ||
        value.rack.final === null  ||
        value.predio.initial === null  ||
        value.predio.final === null  ||
        value.level.initial === null  ||
        value.level.final === null ||
        value.client === null ||
        value.type === null ||
        value.area === null ||
        value.size === null
      ){

        this.$q.notify({
          type: 'negative',
          message: 'Preencha todos os campos',
          icon: 'warning'
        });

        this.$q.loading.hide();

      }else if(
        value.rack.initial > value.rack.final ||
        value.predio.initial > value.predio.final ||
        value.apto.initial > value.apto.final ||
        value.level.initial > value.level.final
      ){

        this.$q.notify({
          type: 'negative',
          message: 'Valor Inicial não pode ser menor que o valor Final',
          icon: 'warning'
        });

        this.$q.loading.hide();

      } else{
        this.mountedPrintLabels()
      }
    },

    // ====== FUNÇÃO QUE CRIA OS ENDEREÇOS =======
    async mountedPrintLabels() {

      for (let r = Number(this.tagsInfo.rack.initial); r <= Number(this.tagsInfo.rack.final); r++) {
        for (let p = Number(this.tagsInfo.predio.initial); p <= Number(this.tagsInfo.predio.final); p++) {
          for (let a = Number(this.tagsInfo.apto.initial); a <= Number(this.tagsInfo.apto.final); a++) {
            for (let l = Number(this.tagsInfo.level.initial); l <= Number(this.tagsInfo.level.final); l++) {
              // ====== CRIA O OBJ DAS ETIQUETAS ======
              const obj = {
                sector: this.tagsInfo.sector,
                client: this.tagsInfo.client.toUpperCase(),
                type: this.tagsInfo.type,
                size: this.tagsInfo.size,
                area: this.tagsInfo.area,
                zona: '',
                cluster: '',
                id: this.printLabels.length + 1,

                rack: ('0' + r).slice(-2),
                predio: ('0' + p).slice(-2),
                apto: ('0' + a).slice(-2),
                level: ('0' + l).slice(-2),
                label: `${this.tagsInfo.sector}${('0' + r).slice(-2)}-${('0' + p).slice(-2)}-${('0' + a).slice(-2)}-${('0' + l).slice(-2)}`,

                xpredio: '01'+ ('0' + a).slice(-2),
                xnivel: ('0' + l).slice(-2),
                xrack: ('0' + r).slice(-2),
                rua: '01',
                rack2: ('0' + r).slice(-2),
                index: '',
                wildcard: '',
                seta: 'CIMA',

              }
              // ======= ADICIONA O OBJ AO ARRAY ========
              this.printLabels.push(obj)
            }
          }
        }
      }

      console.log(this.printLabels)

      this.$emit('printLabels', this.printLabels)
      this.$q.loading.hide()
    },
  }
}
</script>

<style scoped>

</style>
