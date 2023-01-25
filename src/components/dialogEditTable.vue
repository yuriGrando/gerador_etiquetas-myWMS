<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-bar>
        <q-icon name="mdi-book-edit-outline" />
        <div>Editar Tabela</div>

        <q-space />

        <q-btn dense flat icon="close" @click="closeDialog()" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>

        <table-edit
          :rows="rows"
          @change-printLabels="changeRows"
        />

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>


import TableEdit from "components/tableEdit";
export default {
  name: "dialogEditTable",
  components: {TableEdit},
  props:{
    dialog: Boolean,
    rows: Array,
  },

  data(){
    return{

    }
  },

  computed:{
    showDialog: {
      get: function () {
        return this.dialog
      },
    },
  },

  methods:{
    closeDialog(){
      this.$emit('close-dialog')
    },

    changeRows(rows){
      this.closeDialog();
      this.$emit('change-rows', rows);
    }
  }
}
</script>

<style scoped>

</style>
