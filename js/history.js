let quantityRowsOfTable = 13;

const btnExportTableToCSV = document.getElementById('export_csv');
const btnExportTableToExcel = document.getElementById('export_excel');

// Show Alert
const alert = document.getElementById('alert-msg');

// Formulario de busqueda
const formSearch = document.getElementById('form-search');

const nameSearchInput = document.getElementById('nameSearch');
const rutSearchInput = document.getElementById('rutSearch');
const phoneSearchInput = document.getElementById('phoneSearch');
const dateAttentionInputSearch = document.getElementById('dateAttentionSearch');

const nameSearchError = document.getElementById('nameSearchError');
const rutSearchError = document.getElementById('rutSearchError');
const phoneSearchError = document.getElementById('phoneSearchError');

// Show table 
const titlesTable = [ 'ID', 'Nombre', 'Edad', 'Teléfono', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show titles of table
const showTitlesTable = () => {
    let titles = '';
    for (const i in titlesTable ) {
      titles += `<th>${ titlesTable[i] }</th>`;
    }
    tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}

function consulta  ( url ) {
    return new Promise(( resolve, reject ) => {
      fetch( url, { method: 'GET', redirect: 'follow' } )
      .then( response => response.json() )
      .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
      .catch( err => console.log( err ) )
    });
  }
  
  const printList = async ( data ) => {
    table.innerHTML = "";
    console.log(data)
    if( data.length == 0 || !data ) {
      showMessegeAlert( false, 'No se encontraron registros' );
      return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
    }
  
    for (const i in data ) {
      const { id, name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
      const actions = [
        `<button type="button" id='btnShowRegister' onClick='showModalCreateOrEdit(${ id },${true}, "show_register")' value=${ id } class="btn btn-primary">VER</button>`,
      ]
  
      const rowClass  = 'text-right';
      const customRow = `<td>${ [ id, name, age, `+569${ phone }`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10) ].join('</td><td>') }</td>`;
      const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
      table.innerHTML += row;
    }
  }
  
  // Show all registers in the table
  const showRegisters = async () => {
    const registers = await consulta( api + 'registers');
    printList( registers.data );
  }

// Show options in select 
const showOptions = async ( select, url ) => {

    let data;
  
    if (!localStorage.getItem(select)) {
      console.log('Estoy dentro porque no existe en el localStorage');
      const result = await consulta( url );
      data = result.data;
      localStorage.setItem( select, JSON.stringify(result.data) );
    }
    
    const options = data ?? JSON.parse( localStorage.getItem( select ) );
  
    document.getElementById(select).innerHTML = "";
    for (const i in options ) {
      const { id, name } = options[i];
      const option = `<option value="${id}">${name}</option>`;
      document.getElementById(select).innerHTML += option;
    }
  }

  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

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
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("n"), filename);
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}


// Funcion que limpia los campos de busqeuda
//btnClearSearch.addEventListener('click', () => showRegisters());
showTitlesTable();
showRegisters();

btnExportTableToCSV.addEventListener('click', () => exportTableToCSV('registros-optica.csv'));
btnExportTableToExcel.addEventListener('click', () => exportTableToExcel('table_registros','registros-optica.csv'));