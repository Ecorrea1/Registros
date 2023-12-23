"use strict";

let nameValidator = false;
let ageValidator = false;
let phoneValidator = false;
let dateAttentionValidator = false;
let totalValidator = false;
let cristalValidator = false;
let treatmentValidator = false;
let frameValidator = false;
let professionalValidator = false;

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
const titlesTable = [ 'ID', 'Rut', 'Nombre', 'Teléfono', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación', 'Acciones' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show modal to create register
const myModal = new bootstrap.Modal('#myModal', { keyboard: false });

const modalRegister = document.getElementById('myModal');
const modalTitle = modalRegister.querySelector('.modal-title');

const formRegister = document.getElementById('createRegister');

// Inputs of Modal to create register
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const totalInput = document.getElementById('total');
const cristalInput = document.getElementById('cristal');
const treatmentInput = document.getElementById('treatment');
const frameInput = document.getElementById('frame');
const observationInput = document.getElementById('observation');
const professionalInput = document.getElementById('professional');
const dateAttentionInput = document.getElementById('date_attention');

const farEyeRightSphereInput = document.getElementById('farEyeRightSphere');
const farEyeRightCylinderInput = document.getElementById('farEyeRightCylinder');
const farEyeRightGradeInput = document.getElementById('farEyeRightGrade');
const farEyeRightPupillaryDistanceInput = document.getElementById('farEyeRightPupillaryDistance');
const farEyeLeftSphereInput = document.getElementById('farEyeLeftSphere');
const farEyeLeftCylinderInput = document.getElementById('farEyeLeftCylinder');
const farEyeLeftGradeInput = document.getElementById('farEyeLeftGrade');
const farEyeLeftPupillaryDistanceInput = document.getElementById('farEyeLeftPupillaryDistance');

const nearEyeRightSphereInput = document.getElementById('nearEyeRightSphere');

const idInput = document.getElementById('uid');

const btnCreateRegister = document.getElementById('create_register');
const btnSaveRegister = document.getElementById('save_register');
const btnEditRegister = document.getElementById('edit_register');
const btnReset = document.getElementById('btnReset');
const btnClearSearch = document.getElementById('btn-clear-search');

// Div to show error
const divErrorName = document.getElementById('divErrorName');
const divErrorAge = document.getElementById('divErrorAge');
const divErrorPhone = document.getElementById('divErrorPhone');
const divErrorTotal = document.getElementById('divErrorTotal');
const divErrorCristal = document.getElementById('divErrorCristal');
const divErrorTreatment = document.getElementById('divErrorTreatment');
const divErrorFrame = document.getElementById('divErrorFrame');
const divErrorObservation = document.getElementById('divErrorObservation');
const divErrorProfessional = document.getElementById('divErrorProfessional');
const divErrorDateAttention = document.getElementById('divErrorDateAttention');

// Show titles of table
const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  console.log(data)
  if( data.length == 0 || !data ) {
    // showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
    const actions = [
      '<div class="btn-group" role="group">',
      `<button type="button" id='btnShowRegister' onClick='showModalCreateOrEdit(${ id },${true}, "show_register")' value=${ id } class="btn btn-primary">VER</button>`,
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, ${false}, "edit_register")' value=${ id } class="btn btn-success">EDITAR</button>`,
      ,'</div>'
    ]

    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, age,name, `+569${ phone }`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10), actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  paginado('#table_registros', 5);
}

// Show all registers in the table
const showRegisters = async () => {
  const registers = await consulta( api + 'registers');
  printList( registers.data );
}

// Show register by id
const showRegistersForId = async ( id ) => {
  const register = await consulta( api + 'registers/' + id );
  printList( register.data );
}

// Show register by filters
const showRegistersForFilters = async ( filters ) => {
  const register = await consulta( api + 'registers/' + filters );
  printList( register.data );
}

// Show frames options in select
const showInitModal = async () => {
  await showOptions('treatment', api + 'registers/table/treatment');
  await showOptions('cristal', api + 'registers/table/cristals');
}

// Show table with registers with pagination
const showTablePagination = async ( page = 1, limit = 10 ) => {
  const registers = await consulta( api + 'registers?page=' + page + '&limit=' + limit );
  printList( registers.data );
}

const searchRegister = async ( searchQuery ) => {
  const register = await consulta( api + 'registers/search?page=1' + searchQuery );
  printList( register.data );
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  if ( rutSearchInput.value === '' && nameSearchInput.value === '' && phoneSearchInput.value === '' && dateAttentionInputSearch.value === '' ) return showTablePagination();
  
  const searchQuery = '&age=' + parseInt(rutSearchInput.value) + '&name=' + nameSearchInput.value + '&phone=' + phoneSearchInput.value + '&date_attention=' + dateAttentionInputSearch.value;
  return  searchRegister( searchQuery );
  
});

const sendInfo = async (uid = '', btnAction) => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  ageValidator = validateAllfields(ageInput, divErrorAge, true);
  phoneValidator = validateAllfields(phoneInput, divErrorPhone, true);
  dateAttentionValidator = validateAllfields(totalInput, divErrorTotal, true);
  totalValidator = validateAllfields(totalInput, divErrorTotal, true);
  cristalValidator = validateAllfields(cristalInput, divErrorCristal, true);
  treatmentValidator = validateAllfields(treatmentInput, divErrorTreatment, true);
  frameValidator = validateAllfields(frameInput, divErrorFrame);
  professionalValidator = validateAllfields(professionalInput, divErrorProfessional);

  if (!nameValidator, !ageValidator, !phoneValidator, !dateAttentionValidator, !totalValidator, !cristalValidator, !treatmentValidator, !frameValidator, !professionalValidator) {
    return console.log('Hay input con problemas');
  }

  const data = {
    name: nameInput.value.toUpperCase(),
    age: parseInt(ageInput.value),
    phone: parseInt(phoneInput.value),
    total: parseInt(totalInput.value),
    cristal: parseInt(cristalInput.value),
    treatment: parseInt(treatmentInput.value),
    frame: frame.value.toUpperCase(),
    observation: observationInput.value.toUpperCase(),
    professional: professional.value.toUpperCase(),
    date_attention: dateAttentionInput.value,
    far_eye_right_sphere: parseFloat(farEyeRightSphereInput.value),
    far_eye_right_cylinder: parseFloat(farEyeRightCylinderInput.value),
    far_eye_right_grade: parseInt(farEyeRightGradeInput.value),
    far_eye_right_pupillary_distance: parseInt(farEyeRightPupillaryDistanceInput.value),
    far_eye_left_sphere: parseFloat(farEyeLeftSphereInput.value),
    far_eye_left_cylinder: parseFloat(farEyeLeftCylinderInput.value),
    far_eye_left_grade: parseInt(farEyeLeftGradeInput.value),
    far_eye_left_pupillary_distance: parseInt(farEyeLeftPupillaryDistanceInput.value),
    near_eye_right_sphere: parseFloat(nearEyeRightSphereInput.value)
  };

  createEditRegister(data, 'POST', uid )
  .then(async response => {
    if(response.ok){
      await showRegisters();
      // reset of Formulary
      formRegister.reset();
      modalTitle.textContent = btnAction == 'edit_register' ? `Registro editado de ${data.name}` : 'Registro Creado';
      //Close modal
      bootstrap.Modal.getInstance(modalRegister).hide();
      document.querySelector(".modal-backdrop").remove();
      modalTitle.textContent = '';
      showMessegeAlert( false, 'edit_register' ? `Registro Editado` : 'Registro Creado');
    }
  }).catch(err => {
    console.log(err)
    showMessegeAlert( true, 'Error al editar el registro');
  });
}

const createEditRegister = async (data, method ='POST', uid = '') => {  
  const query = uid == '' ? 'registers' : `registers/edit/${ uid }`
  return await fetch( api + query , {
    method: method,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
}

modalRegister.addEventListener('show.bs.modal', () => {
  dateAttentionInput.max = new Date().toISOString().substring(0,10);
  toggleMenu(btnReset.id);
  addDisabledOrRemove(false, 'disabled');
  formRegister.reset();
});

btnCreateRegister.addEventListener('click', () => clearForm());

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  sendInfo('', 'save_register')
});

document.querySelector(`#edit_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  sendInfo(idInput.value, 'edit_register');
});

async function showModalCreateOrEdit( uid, isReadOnly = true, btnAction ) {
  myModal.show();
  formRegister.reset();

  if ( isReadOnly ) {
    toggleMenu( btnSaveRegister.id );
    toggleMenu( btnReset.id );
    toggleMenu( btnEditRegister.id );
  } 
  
  if ( isReadOnly == false ) {
    console.log(`${ btnAction == 'save_register' ? 'Estamos Agregando datos desde el boton' : 'Estamos editando desde el boton' }`);
    if( btnAction == 'edit_register' ) {
      toggleMenu( btnEditRegister.id, true );
      toggleMenu( btnSaveRegister.id );
    }
    if( btnAction == 'save_register' ) {
      toggleMenu( btnEditRegister.id, false );
      toggleMenu( btnSaveRegister.id, true );
    }
  }

  addDisabledOrRemove( isReadOnly ?? false , 'disabled');

  const register = await consulta( api + 'registers/' + uid );
  
  const { 
    name, 
    age, 
    phone,
    total,
    cristal, 
    treatment, 
    frame, 
    observation, 
    professional, 
    date_attention,
    far_eye_right_sphere,
    far_eye_left_sphere,
    far_eye_right_cylinder,
    far_eye_left_cylinder,
    far_eye_right_grade,
    far_eye_left_grade,
    far_eye_right_pupillary_distance,
    far_eye_left_pupillary_distance,
    near_eye_right_sphere
 } = register.data;

  idInput.value = uid;
  nameInput.value =  name;
  dateAttentionInput.value = date_attention.substring(0,10);
  ageInput.value = age;
  phoneInput.value = phone;
  totalInput.value = total;
  cristalInput.value = cristal;
  treatmentInput.value = treatment;
  frameInput.value = frame;
  observationInput.value = observation;
  professionalInput.value = professional;

  farEyeRightSphereInput.value = far_eye_right_sphere;
  farEyeLeftSphereInput.value = far_eye_left_sphere;
  farEyeRightCylinderInput.value = far_eye_right_cylinder;
  farEyeLeftCylinderInput.value = far_eye_left_cylinder;
  farEyeRightGradeInput.value = far_eye_right_grade;
  farEyeLeftGradeInput.value = far_eye_left_grade;
  farEyeRightPupillaryDistanceInput.value = far_eye_right_pupillary_distance;
  farEyeLeftPupillaryDistanceInput.value = far_eye_left_pupillary_distance;
  
  nearEyeRightSphereInput.value = near_eye_right_sphere;
}

function addDisabledOrRemove( disabled = true, attribute = 'readonly' ) {
  disabled ? nameInput.setAttribute(attribute, true) : nameInput.removeAttribute(attribute);
  disabled ? ageInput.setAttribute(attribute, true) : ageInput.removeAttribute(attribute);
  disabled ? dateAttentionInput.setAttribute(attribute, true) : dateAttentionInput.removeAttribute(attribute);
  disabled ? phoneInput.setAttribute(attribute, true) : phoneInput.removeAttribute(attribute);
  disabled ? totalInput.setAttribute(attribute, true) : totalInput.removeAttribute(attribute);
  disabled ? treatmentInput.setAttribute(attribute, true) : treatmentInput.removeAttribute(attribute);
  disabled ? cristalInput.setAttribute(attribute, true) : cristalInput.removeAttribute(attribute);
  disabled ? professionalInput.setAttribute(attribute, true) : professionalInput.removeAttribute(attribute);
  disabled ? frameInput.setAttribute(attribute, true) : frameInput.removeAttribute(attribute);
  disabled ? observationInput.setAttribute(attribute, true) : observationInput.removeAttribute(attribute);

  disabled ? farEyeRightSphereInput.setAttribute(attribute, true) : farEyeRightSphereInput.removeAttribute(attribute);
  disabled ? farEyeRightCylinderInput.setAttribute(attribute, true) : farEyeRightCylinderInput.removeAttribute(attribute);
  disabled ? farEyeRightGradeInput.setAttribute(attribute, true) : farEyeRightGradeInput.removeAttribute(attribute);
  disabled ? farEyeRightPupillaryDistanceInput.setAttribute(attribute, true) : farEyeRightPupillaryDistanceInput.removeAttribute(attribute);
  disabled ? farEyeLeftSphereInput.setAttribute(attribute, true) : farEyeLeftSphereInput.removeAttribute(attribute);
  disabled ? farEyeLeftCylinderInput.setAttribute(attribute, true) : farEyeLeftCylinderInput.removeAttribute(attribute);
  disabled ? farEyeLeftGradeInput.setAttribute(attribute, true) : farEyeLeftGradeInput.removeAttribute(attribute);
  disabled ? farEyeLeftPupillaryDistanceInput.setAttribute(attribute, true) : farEyeLeftPupillaryDistanceInput.removeAttribute(attribute);
  
  disabled ? nearEyeRightSphereInput.setAttribute(attribute, true) : nearEyeRightSphereInput.removeAttribute(attribute);
}

function clearForm() {
  modalTitle.textContent = ''
  nameInput.value = ''
  ageInput.value = ''
  dateAttentionInput.value = ''
  phoneInput.value = ''
  totalInput.value = ''
  professionalInput.value = ''
  frameInput.value = ''
  observationInput.value = ''
  farEyeRightSphereInput.value = ''
  farEyeRightCylinderInput.value = ''
  farEyeRightGradeInput.value = ''
  farEyeRightPupillaryDistanceInput.value = ''
  farEyeLeftSphereInput.value = ''
  farEyeLeftCylinderInput.value = ''
  farEyeLeftGradeInput.value = ''
  farEyeLeftPupillaryDistanceInput.value = ''
  nearEyeRightSphereInput.value = ''
  
  nameInput.style.borderColor = 'hsl(270, 3%, 87%)'
  ageInput.style.borderColor = 'hsl(270, 3%, 87%)'
  dateAttentionInput.style.borderColor = 'hsl(270, 3%, 87%)'
  phoneInput.style.borderColor = 'hsl(270, 3%, 87%)'
  totalInput.style.borderColor = 'hsl(270, 3%, 87%)'
  professionalInput.style.borderColor = 'hsl(270, 3%, 87%)'
  frameInput.style.borderColor = 'hsl(270, 3%, 87%)'
  observationInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeRightSphereInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeRightCylinderInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeRightGradeInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeRightPupillaryDistanceInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeLeftSphereInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeLeftCylinderInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeLeftGradeInput.style.borderColor = 'hsl(270, 3%, 87%)'
  farEyeLeftPupillaryDistanceInput.style.borderColor = 'hsl(270, 3%, 87%)'
  nearEyeRightSphereInput.style.borderColor = 'hsl(270, 3%, 87%)'

  divErrorName.innerText = ''
  divErrorAge.innerText = ''
  divErrorPhone.innerText = ''
  divErrorTotal.innerText = ''
  divErrorFrame.innerText = ''
  divErrorProfessional.innerText = ''
  divErrorDateAttention.innerText = ''
}

btnCreateRegister.addEventListener('click', () => {
  toggleMenu(btnEditRegister.id, false);
  toggleMenu(btnSaveRegister.id, true);
});
// Funcion que limpia los campos de busqeuda
btnClearSearch.addEventListener('click', () => showRegisters());

// Al abrir la pagina
window.addEventListener("load", async() => {
  
  isSession();
  dateAttentionInputSearch.max = new Date().toISOString().substring(0,10);
  showTitlesTable();
  await showTablePagination();
  showInitModal();

  const fader = document.getElementById('fader');
  fader.classList.add("close");
  fader.style.display = 'none';

})