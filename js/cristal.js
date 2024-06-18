"use strict";

let nameValidator = false;
let descriptionValidator = false;
let currentPage = 1;
let limitInfo = 10;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

const btnNewTreatment =document.getElementById('btn_create_cristals');
const btnEditTreatment =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'ID', 'Nombre', 'Descripcion', 'Habilitado', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const enabledInput = document.getElementById('enabled');

// Show titles of table
const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}
    
const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length == 0 || !data || !Array.isArray(data)) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, description, enabled } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success">EDITAR</button>`,
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, name, description,  showBadgeBoolean(enabled), actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado( Math.ceil( data.length / limit ) );
  paginado('#table_registros', limitInfo);
}

// Show all registers in the table
const showCristals = async () => {
  const registers = await consulta( api + 'cristals');
  printList( registers.data );
}

// const showCristals = async (current = currentPage, limit = limitInfo) => {
//   try {
//     const registers = await consulta(api + 'cristals?page=' + current + '&limit=' + limit);
//     const { data, page, total } = registers;
    
//     // Guardar registros en Local Storage
//     localStorage.setItem('registros', JSON.stringify(data));
    
//     // Optimización del DOM usando DocumentFragment
//     const dataContainer = document.getElementById('pagination-container');
//     const fragment = document.createDocumentFragment();
    
//     data.forEach(item => {
//       const dataElement = document.createElement('div');
//       dataElement.textContent = item.name; // Ejemplo de propiedad
//       fragment.appendChild(dataElement);
//     });
    
//     // Limpia el contenedor y agrega el fragmento
//     dataContainer.innerHTML = '';
//     dataContainer.appendChild(fragment);
    
//     // Crear y mostrar paginación
//     createPagination(total, page);
    
//     // Suponiendo que printList es una función para imprimir la lista
//     return printList(data);
//   } catch (error) {
//     console.error('Hubo un error al obtener los registros:', error);
//   }
// }

const sendInfo = async (idCristal = '', action = 'CREATE'|'EDIT') => {
 
  nameValidator = validateAllfields(nameInput, divErrorName);

//   if (!nameValidator && !descriptionValidator) return console.log('Ingrese Nombre de Cristal');
  if (!nameValidator) return console.log('Ingrese Nombre de Cristal');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    description: descriptionInput.value,
    enabled : parseInt(enabled.value)
  }

  const result = await createEditCristal( data, idCristal );
  if (!result) return showMessegeAlert( true, 'Error al editar el registro');
  await showCristals();
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  showMessegeAlert( false, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
}

const createEditCristal = async ( data, uid = '') => {  
  const query = uid == '' ? 'cristals' : `cristals/edit/${ uid }`
  return await fetch( api + query , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => {
      console.log(response.ok);
      return true;
    }
  )
  .catch(err => {
    console.error(err)
    return false;
  });
}
async function showModalCreateOrEdit( uid ) {
  myModal.show();
  formRegister.reset();

  const register = await consulta( api + 'cristals/' + uid );
  toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const { name, description, enabled } = register.data;

  idInput.value = uid;
  nameInput.value =  name;
  descriptionInput.value = description;
  enabledInput.value = enabled;
}

function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  descriptionInput.value = '';
  enabledInput.value = 1;
}

btnNewTreatment.addEventListener('click', () => {
    clearForm()
    toggleMenu('edit_register', false);
    toggleMenu('save_register', true);
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  await sendInfo('', 'CREATE');
});

btnEditRegister.addEventListener('click', async (e) => await sendInfo(idInput.value, 'EDIT'));

// Al abrir la pagina
window.addEventListener("load", async() => {
    isSession();
    showTitlesTable();
    await showCristals();
    const fader = document.getElementById('fader');
    fader.classList.add("close");
    fader.style.display = 'none';
  }
)