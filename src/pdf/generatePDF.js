import {jsPDF} from 'jspdf';
import 'svg2pdf.js';
import {logoSparkBase64} from "assets/logoSparkBase64";
import {arrowBase64, arrowDownBase64} from "assets/arrowBase64";

export function generatePDF(printLabels, sector, type){

  switch (type) {

    case '90x15':
      tag_01();
      console.log('90x15')
      break;

    case '100x25':
      tag_02();
      console.log('100x25')
      break;

    case '100x75':
      tag_03();
      console.log('100x75')
      break;

    case 'doca':
      tag_04();
      console.log('doca')
      break;

    default:
      break;
  }

  // ======= GERAR PDF ETIQUETAS =======

  // MODELO 90X15 MM
  function tag_01(){

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [9, 1.5]
    });

    for(let i = 0; i < printLabels.length; i++){

      // ====== TEXTO =======
      doc.setFont("helvetica", 'bold');
      doc.setFontSize(17.7)
      doc.text(printLabels[i].label, 3, 0.55, );

      // ====== GERANDO DATAMATRIX ======

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}`, 'PNG', 7.33,0.15,1.2,1.2);

      // ====== GERANDO CODIGO DE BARRAS - code128 ========

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=code128&text=${printLabels[i].label}`, 'PNG', 3,0.69,3.8,0.68);

      // ====== CRIA NOVA PAG ======
      if(i < printLabels.length - 1){
        doc.addPage();
      }

    }

    doc.save(`Etiquetas_${sector}`);
  }

  // MODELO 100X25 MM
  function tag_02(){

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [10, 2.5]
    });

    for(let i = 0; i < printLabels.length; i++){

      // ====== TEXTO =======
      doc.setFont("helvetica", 'bold');
      doc.setFontSize(4.25);
      doc.text('Setor', 0.68, 0.2, );
      doc.text('Rack', 1.55, 0.2, );
      doc.text('Predio', 2.74, 0.2, );
      doc.text('Apto', 4.1, 0.2, );
      doc.text('Nivel', 5.28, 0.2, );

      doc.setFontSize(25.3)
      doc.text(printLabels[i].label, 0.6, 1, );

      // ====== FLECHA ========
      if(printLabels[i].seta === 'CIMA'){
        doc.addImage(arrowBase64, 6.25,0.25,0.8,0.76)
      }else{
        doc.addImage(arrowDownBase64, 6.25,0.25,0.8,0.7)
      }

      // ====== GERANDO DATAMATRIX ======
      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}&includetext`, 'PNG', 7.67,0.35,1.55,1.55);

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}&includetext`, 'PNG', 6.16,1.2,0.9,0.9);

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}&includetext`, 'PNG', 0.48,1.2,0.9,0.9);


      // ====== GERANDO CODIGO DE BARRAS ========

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=code128&text=${printLabels[i].label}`, 'PNG', 1.717,1.2,4.2,0.88)

      // ====== SITE SPARK ========
      doc.setFont("helvetica", 'bold');
      doc.setFontSize(5);
      doc.text('www.sparkag.com.br', 7.5, 2.1);

      // ====== CRIA NOVA PAG ======
      if(i < printLabels.length - 1){
        doc.addPage()
      }

    }

    doc.save(`Etiquetas_${sector}`)
  }

  // MODELO 100X75 MM
  function tag_03(){

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [10, 7.5]
    });

    for(let i = 0; i < printLabels.length; i++){

      // ====== TEXTO =======
      doc.setFont("helvetica", 'bold');
      doc.setFontSize(38)
      doc.text(printLabels[i].label, 0.8, 1.5, );

      // ====== LINHA =======
      doc.setLineWidth(0.02)
      doc.line(0.5,1.9, 9.5,1.9)

      // ====== SITE SPARK ========
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(12);
      doc.text('www.sparkag.com.br', 5.5, 2.3);

      // ====== GERANDO DATAMATRIX ======
      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}&includetext`, 'PNG', 5.45,3.2,3.7,3.7);

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].label}&includetext`, 'PNG', 0.85,4.16,2.57,2.57);

      // ====== GERANDO CODIGO DE BARRAS ========

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=code128&text=${printLabels[i].label}&includetext`, 'PNG', 0.85,2.3,3.4,1.6)

      // ====== CRIA NOVA PAG ======
      if(i < printLabels.length - 1){
        doc.addPage()
      }

    }

    doc.save(`Etiquetas_${sector}_${type}`)
  }

  function tag_04(){

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [10, 7.5]
    });

    for(let i = 0; i < printLabels.length; i++){

      // ====== TEXTO =======
      doc.setFont("helvetica", 'bold');
      doc.setFontSize(61.5);
      if(printLabels[i].sector === 'IMPRESSORAS'){
        doc.text(printLabels[i].address, 0.5, 2);
      }else{
        doc.text(printLabels[i].address, 0.8, 2);
      }

      // ====== SITE SPARK ========
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(10);
      doc.text('www.sparkag.com.br', 5.3, 2.4);

      // ====== GERANDO DATAMATRIX ======
      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].address}&includetext`, 'PNG', 5.35,3,3.8,3.8);

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${printLabels[i].address}&includetext`, 'PNG', 0.87,4.28,2.53,2.53);

      // ====== GERANDO CODIGO DE BARRAS ========

      doc.addImage(`https://bwipjs-api.metafloor.com/?bcid=code128&text=${printLabels[i].address}`, 'PNG', 0.87,2.8,3.56,1.3)

      // ====== CRIA NOVA PAG ======
      if(i < printLabels.length - 1){
        doc.addPage()
      }

    }

    doc.save(`Etiquetas_${sector}_${type}`)
  }

  }
