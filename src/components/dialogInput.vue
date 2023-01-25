<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-bar>
        <q-icon name="mdi-book-edit-outline" />
        <div>Editar campo - {{label}}</div>

        <q-space />

        <q-btn dense flat icon="close" @click="closeDialog()" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="text-center">

        <q-select
          v-if="field === 'area'"
          outlined
          :options="optionArea"
          v-model="inputValue"
          class="q-mb-sm"
          input-class="text-uppercase"
          :label="label"
        />

        <q-select
          v-else-if="field === 'seta'"
          outlined
          :options="optionArrow"
          v-model="inputValue"
          class="q-mb-sm"
          input-class="text-uppercase"
          :label="label"
        />

        <q-input
          v-else
          outlined
          v-model="inputValue"
          class="q-mb-sm"
          input-class="text-uppercase"
          :label="label"
        />

        <q-btn
          color="green"
          outline
          class="fit"
          icon="mdi-check-bold"
          label="Confirmar"
          @click="changeValue(field)"
        />

      </q-card-section>

    </q-card>


  </q-dialog>

</template>

<script>
export default {
  name: "dialogInput",
  props:{
    openDialog: Boolean,
    field: String,
    label: String,
  },

  computed:{
    showDialog: {
      get: function () {
        return this.openDialog
      },
    },
  },

  data(){
    return{
      inputValue: '',

      optionArrow: ['CIMA', 'BAIXO'],
      optionArea: ['PICKING', 'PULMAO'],
    }
  },

  methods:{
    closeDialog(){
      this.inputValue = '';
      this.$emit('close-dialog')
    },

    // ====== EMIT PARA ALTERAR O VALOR DO TABELA ======
    changeValue(field){
      this.$emit('change-value', {
        field: field,
        data: this.inputValue.toUpperCase(),
      });

      this.inputValue = '';
      this.closeDialog();
    }
  }
}
</script>

<style scoped>

</style>
