import * as xlsx from "xlsx";

export function generateXlsx(printLabels, client, size) {
  console.log(printLabels)
  const wb = xlsx.utils.book_new();

  wb.Props = {
    Title: 'Planilha',
    Subject: 'Planilha Endereços',
    Author: 'SPARKAG',
    CreatedDate: new Date()
  };

  wb.SheetNames.push('Planilha Etiquetas');

  let data = [];

  const tableData = document.getElementById('table_print');
  console.log(tableData)

  for(let i = 0; i < printLabels.length; i++){
    let createArray = [
      printLabels[i].label,
      printLabels[i].sector,
      printLabels[i].rack,
      printLabels[i].predio,
      printLabels[i].apto,
      printLabels[i].level,
      printLabels[i].client,
      printLabels[i].type,
      printLabels[i].size
    ]
    data.push(createArray);
  }

  console.log(data)

  // const ws = xlsx.utils.aoa_to_sheet(data);
  const ws = xlsx.utils.table_to_sheet(tableData);
  wb.Sheets['Planilha Etiquetas'] = ws;

  xlsx.writeFile(wb, `${client}_${size}.xlsx`, {bookType: 'xlsx', type: "binary"})

}



