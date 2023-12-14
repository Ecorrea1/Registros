"use strict";
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
const titlesTable = [ 'ID', 'Rut', 'Nombre', 'Teléfono', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show titles of table
const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}

async function paginado( paginas, limit = 10){
  const totalPages =  paginas > 32 ? 32 : paginas
  for (let index = 0; index < totalPages; index++ ) document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="printList(${ index * limit })">${ index + 1}</button></li>`;
}
  
  const printList = async ( data, limit = 10 ) => {
    table.innerHTML = "";
    console.log(data)
    if( data.length == 0 || !data ) {
      showMessegeAlert( false, 'No se encontraron registros' );
      return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
    }
  
    for (const i in data ) {
      const { id, name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
      const rowClass  = 'text-right';
      const customRow = `<td>${ [ id, age, name, `+569${ phone }`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10) ].join('</td><td>') }</td>`;
      const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
      table.innerHTML += row;
    }
    paginado( Math.ceil( data.length / limit ) );
  }
  
  // Show all registers in the table
  const showRegisters = async () => {
    const registers = await consulta( api + 'registers');
    printList( registers.data );
  }

// Al abrir la pagina
window.addEventListener("load", async() => {
  isSession();
  showTitlesTable();
  await showRegisters();
  const fader = document.getElementById('fader');
  fader.classList.add("close");
  fader.style.display = 'none';
})

btnExportTableToCSV.addEventListener('click', () => exportTableToCSV('registros-optica.csv'));
btnExportTableToExcel.addEventListener('click', () => exportTableToExcel('table_registros','registros-optica.csv'));