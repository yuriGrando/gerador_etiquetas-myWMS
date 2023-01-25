<template>
  <q-table
    :rows="dataTable"
    :columns="type === 'doca' ? columnsDoca : columnsPicking"
    flat
    :rows-per-page-options="[0]"
    class="bg-grey-4"
    id="table_print"
    style="width: calc(100vw - 200px); max-width: calc(100vw - 200px);"
    :selection="type === 'doca' ? 'none' : 'multiple'"
    v-model:selected="selected"
  >

    <template v-slot:top>
      <div class="flex flex-center q-mb-sm fit">
        <q-btn
          label="Gerar Etiquetas"
          icon="mdi-file-pdf-box"
          outline
          class="q-mr-sm"
          :loading="loadingPDF"
          @click="createPDF(type)"
          color="primary"
        />

        <q-btn
          label="Gerar Excel"
          icon="mdi-microsoft-excel"
          outline
          class="q-mr-sm"
          :loading="loadingExcel"
          @click="createExcel()"
          color="green"
        />

        <q-btn
          v-if="type !== 'doca'"
          label="Editar Tabela"
          icon="mdi-book-edit-outline"
          outline
          :loading="loadingExcel"
          @click="editTable()"
          color="blue"
        />
      </div>

      <div class="fit text-center">

      </div>

      <dialog-edit-table
        :dialog="dialogEdit"
        @close-dialog="dialogEdit = false"
        :rows="selected"
        @change-rows="changeValueTable"
      />

    </template>

  </q-table>
</template>

<script>
import {generatePDF} from "src/pdf/generatePDF";
import {generateXlsx} from "src/excel/generateExcel";
import DialogEditTable from "components/dialogEditTable";

const columnsPicking = [
  { name: 'label', label: 'EAN', align: 'left', field: 'label'},
  { name: 'sector', align: 'center', label: 'Setor', field: 'sector'},
  { name: 'rack', label: 'Rack', align: 'center', field: 'rack',},
  { name: 'predio', label: 'Predio', align: 'center', field: 'predio' },
  { name: 'apto', label: 'Apto', align: 'center', field: 'apto' },
  { name: 'level', label: 'Nivel', align: 'center', field: 'level' },
  { name: 'client', label: 'Cliente', align: 'left', field: 'client' },
  { name: 'type', label: 'Tipo', align: 'left', field: 'type' },
  { name: 'area', label: 'Area', align: 'left', field: 'area' },
  { name: 'cluster', label: 'Cluster', align: 'left', field: 'cluster' },
  { name: 'zona', label: 'ZONA', align: 'left', field: 'zona' },
  { name: 'xpredio', label: 'X (Prédio)', align: 'center', field: 'xpredio' },
  { name: 'xnivel', label: 'X (Nível)', align: 'center', field: 'xnivel' },
  { name: 'xrack', label: 'X (Rack)', align: 'center', field: 'xrack' },
  { name: 'rua', label: 'Rua', align: 'center', field: 'rua' },
  { name: 'rack2', label: 'Rack', align: 'center', field: 'rack2' },
  { name: 'index', label: 'Index', align: 'left', field: 'index' },
  { name: 'wildcard', label: 'WILDCARD', align: 'left', field: 'wildcard' },
  { name: 'seta', label: 'Seta', align: 'left', field: 'seta' },
  { name: 'size', label: 'Obs:', align: 'right', field: 'size' },
];

const columnsDoca = [
  { name: 'address', label: 'Endereço', align: 'left', field: 'address' },
  { name: 'sector', align: 'left', label: 'Setor', field: 'sector' },
  { name: 'doca', label: 'Doca', align: 'center', field: 'doca' },
  { name: 'client', label: 'Cliente', align: 'left', field: 'client' },
  { name: 'clientAbrev', label: 'Cliente Abreviado', align: 'left', field: 'clientAbrev' },
]

export default {
  name: "tablePrint",
  components: {DialogEditTable},
  props:{
    rows: Array,
    type: String
  },

  data(){
    return{

      // ====== loadings ======
      loadingPDF : false,
      loadingExcel: false,

      // ====== DIALOG ======
      dialogEdit : false,
      columnsDoca,
      columnsPicking,

      selected: [],
      data: this.rows,
    }
  },

  watch:{
    selected(){
      console.log(this.selected);
    }
  },

  computed:{
    dataTable: function (){
      return this.data;
    }
  },

  methods:{

    // ====== CRIA O PDF DAS ETIQUETAS ========
    createPDF(type){
      console.log(type)
      this.loadingPDF = true;

      if(type === 'picking'){
        setTimeout(async () => {
          await generatePDF(this.rows, `${this.data[0].client}_${this.data[0].sector}`, `${this.data[0].size}`);
          this.loadingPDF = false
        },3000);
      }

      if(type === 'doca'){
        setTimeout(async () => {
          await generatePDF(this.rows, `${this.data[0].client}_DOCA`, `doca`);
          this.loadingPDF = false
        },3000);
      }


    },

    // ====== CRIA O EXCEL DAS ETIQUETAS ========
    createExcel(){
      generateXlsx(this.data, this.data[0].client, 'doca');
    },

    // ====== ABRE O DIALOG PARA EDIÇÃO DOS CAMPOS =======
    editTable(){
      if(this.selected.length < 1){
        this.$q.notify({
          type: 'negative',
          message: 'Nem uma etiqueta selecionada',
          icon: 'warning'
        });
      }else{
        this.dialogEdit = true;
      }


    },

    // ====== ALTERA OS VALORES DA TABELA - RECEBE O VALOR VIA EMIT =======
    changeValueTable(newObj){
      newObj.forEach(obj => {
        const idx = this.data.findIndex(data => data.id === obj.id);
        this.data[idx] = obj;
      })
    }
  }
}
</script>

<style scoped>

</style>
