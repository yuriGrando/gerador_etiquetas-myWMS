<template>
  <q-table
    :rows="tableData"
    :columns="columns"
    :row-key="rows.id"
    class="my-sticky-header-column-table"
    flat
  >

    <template v-slot:header="props">
      <q-th
        style="height: 50px"
        class="q-pb-sm "
        v-for="col in props.cols"
        :key="col.field"
        :props="props"
        icon="mdi-pencil"
        @click="col.field === 'label'? '': openInput(col.field, col.label)"
        :prop="col.value"
        :class="col.field === 'label'? 'bg-green-2 ': 'cursor-pointer'"
      >

        {{ col.label }}
        <q-icon
          v-if="col.field !== 'label'"
          name="mdi-pencil"
        />
      </q-th>
    </template>

  </q-table>

  <div class=" fit flex justify-end">
    <q-btn
      outline
      label="Confirmar alterações"
      color="green"
      @click="changePrintLabels()"
      icon="mdi-check-bold"
    />
  </div>

  <dialog-input
    :field="fieldEdit"
    :label="labelEdit"
    :open-dialog="dialogInput"
    @close-dialog="dialogInput = false"
    @change-value="changeRows"
  />
</template>

<script>
import DialogInput from "components/dialogInput";
const columns = [
  { name: 'label', label: 'EAN', align: 'left', field: 'label'},
  { name: 'area', label: 'Area', align: 'left', field: 'area' },
  { name: 'cluster', label: 'Cluster', align: 'left', field: 'cluster' },
  { name: 'zona', label: 'Zona', align: 'left', field: 'zona' },
  { name: 'index', label: 'Index', align: 'left', field: 'index' },
  { name: 'wildcard', label: 'WILDCARD', align: 'left', field: 'wildcard' },
  { name: 'seta', label: 'Seta', align: 'left', field: 'seta' },
]

export default {
  name: "tableEdit",
  components: {DialogInput},
  props: {
    rows: Array,
  },

  data(){
    return{
      columns,

      data: this.rows,

      fieldEdit : '',
      labelEdit: '',
      dialogInput: false
    }
  },

  computed:{
    tableData: function (){
      return this.data;
    }
  },

  methods:{
    openInput(field, label){
      this.dialogInput = true;
      this.labelEdit = label;
      this.fieldEdit = field;
    },

    // ====== MUDA O VALOR DOS CAMPOS CONFORME O INPUT PREENCHIDO =====
    changeRows(value){
      this.data.forEach(data => {
        data[value.field] = value.data;
      });
    },

    // ===== EMIT PARA ALTERAR O VALOR NO OBJ PRINCIPAL ======
    changePrintLabels(){
      this.$emit('change-printLabels', this.data);
    }
  }

}
</script>

<style lang="sass">
.my-sticky-header-column-table
  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c7e4c8 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
