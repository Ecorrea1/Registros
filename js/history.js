"use strict";

let currentPage = 1;
let limitInfo = 10;

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
const titlesTable = [ 'Rut', 'Nombre', 'Teléfono', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación' ];
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
const printList = async ( data, page = currentPage, total = 1 ) => {
  table.innerHTML = "";
  // console.log(data)
  if( data.length == 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ age, name, `+569${ phone }`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10) ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado('#table_registros', limit);
  createPagination(total, page);
}
  
// Show all registers in the table
// const showRegisters = async () => {
//   const registers = await consulta( api + 'registers');
//   printList( registers.data );
// }

const showTablePagination = async (current = currentPage) => {
  try {

    currentPage = current;
    const registers = await consulta(api + 'registers?page=' + current + '&limit=' + limitInfo);
    const { data, page, total } = registers;
    
    // Guardar registros en Local Storage
    localStorage.setItem('registros', JSON.stringify(data));
    
    // Optimización del DOM usando DocumentFragment
    // const dataContainer = document.getElementById('pagination-container');
    // const fragment = document.createDocumentFragment();
    
    // data.forEach(item => {
      // const dataElement = document.createElement('div');
      // dataElement.textContent = item.name; // Ejemplo de propiedad
      // fragment.appendChild(dataElement);
    // });
    
    // Limpia el contenedor y agrega el fragmento
    // dataContainer.innerHTML = '';
    // dataContainer.appendChild(fragment);
    
    // Crear y mostrar paginación
    
    
    // Suponiendo que printList es una función para imprimir la lista
    return printList(data, page, total);
  } catch (error) {
    console.error('Hubo un error al obtener los registros:', error);
  }
}

// Al abrir la pagina
window.addEventListener("load", async() => {
  isSession();
  showTitlesTable();
  await showTablePagination(currentPage);
  // const fader = document.getElementById('fader');
  // fader.classList.add("close");
  // fader.style.display = 'none';
})

btnExportTableToCSV.addEventListener('click', () => exportTableToCSV('registros-optica.csv'));
btnExportTableToExcel.addEventListener('click', () => exportTableToExcel('table_registros','registros-optica.csv'));