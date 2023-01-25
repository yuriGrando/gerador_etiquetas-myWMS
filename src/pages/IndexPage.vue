<template>
  <q-page class="flex flex-center q-pa-xl bg-grey-6">
    <q-card
      class="flex-center bg-grey-4"
      flat
    >
        <q-btn
          v-if="!showHome"
          label="voltar"
          outline
          class="q-mt-sm q-ml-sm"
          color="primary"
          @click="backInputCard()"
        />

      <q-card-section>
        <div class="text-center">
          <q-icon
            name="mdi-newspaper-plus"
            size="md"
            color="primary"
          />
        </div>
        <div class="text-h6 text-center text-uppercase text-bold text-primary">
          Gerador de Etiquetas <br>
          {{ showCardPicking ? 'Picking' : showCardDoca ? 'Docas' : ''}}
        </div>
      </q-card-section>

      <q-card-section
        class="flex flex-center text-h6"
        v-if="showHome"
      >

        <q-card
          class="q-pa-md text-center cursor-pointer q-ma-sm"
          @click="openDialog('doca')"
        >
          <q-avatar
            icon="mdi-garage"
            class="text-white"
            size="100px"
            color="primary"
          />
          <div class="text-bold text-grey-9 q-mt-sm">
            Docas
          </div>
        </q-card>

        <q-card
          class="q-pa-md text-center cursor-pointer q-ma-sm"
          @click="openDialog('picking')"
        >
        <q-avatar
          icon="mdi-note-plus-outline"
          class="text-white"
          size="100px"
          color="primary"
        />
        <div class="text-bold text-grey-9 q-mt-sm">
          Picking
        </div>
    </q-card>

      </q-card-section>

      <card-input
        v-if="showCardPicking"
        @printLabels="getPrintLabels"
      />

      <card-input-doca
        v-if="showCardDoca"
        @printLabels="getPrintLabels"
      />

      <q-card-section>

        <table-print
          v-if="showTable"
          :rows="printLabels"
          :type="showCardDoca ? 'doca':'picking'"
          :columnsArray="showCardDoca ? columnsDoca : showCardPicking ? columnsPicking : ''"
        />

      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardInput from "components/cardInput";
import TablePrint from "components/tablePrint";
import CardInputDoca from "components/cardInputDoca";

export default defineComponent({
  name: 'IndexPage',
  components: {CardInputDoca, TablePrint, CardInput},

  data(){
    return{
      // ===== VAR SHOW ======
      showCardPicking : false,
      showCardDoca : false,
      showTable: false,
      showHome: true,

      printLabels: []
    }
  },

  methods:{
    backInputCard(){
      this.showTable = false;
      this.showCardDoca = false;
      this.showCardPicking = false;
      this.showHome = true;
    },

    getPrintLabels(prints){
      this.printLabels = prints;
      this.showTable = true;
      this.showCardPicking = false
    },

    openDialog(type){
      if(type === 'picking'){
        this.showHome = false;
        this.showCardDoca = false;
        this.showCardPicking = true;
      }else{
        this.showHome = false;
        this.showCardPicking = false;
        this.showCardDoca = true;
      }
    }
  }
})
</script>
