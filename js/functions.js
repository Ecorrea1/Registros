const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}

function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => { console.log( err ) } )
  });
}
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length == 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick='showModalCreateOrEdit(${ id },${true}, "show_register")' value=${ id } class="btn btn-primary">VER</button>`,
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, ${false}, "edit_register")' value=${ id } class="btn btn-success">EDITAR</button>`,
    ]

    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, age,name, `+569${ phone }`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10), actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
}

function downloadCSV(csv, filename) {
  let csvFile;
  let downloadLink;
  // CSV file
  csvFile = new Blob([csv], {type: "text/csv"});
  // Download link
  downloadLink = document.createElement("a");
  // File name
  downloadLink.download = filename;
  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);
  // Hide download link
  downloadLink.style.display = "none";
  // Add the link to DOM
  document.body.appendChild(downloadLink);
  // Click download link
  downloadLink.click();
}

function exportTableToCSV(filename) {
  const csv = [];
  const rows = document.querySelectorAll("table tr");
  
  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll("td, th");
    for (let j = 0; j < cols.length; j++ ) row.push(cols[j].innerText);
    csv.push(row.join(","));        
  }
  // Download CSV file
  downloadCSV(csv.join("n"), filename);
}
  
function exportTableToExcel(tableID, filename = ''){
  let downloadLink;
  const dataType = 'application/vnd.ms-excel';
  const tableSelect = document.getElementById(tableID);
  const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  // Create download link element
  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
    const blob = new Blob(['ufeff', tableHTML], { type: dataType });
    navigator.msSaveOrOpenBlob( blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    // Setting the file name
    downloadLink.download = filename;
    //triggering the function
    downloadLink.click();
  }
}