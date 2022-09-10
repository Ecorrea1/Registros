const modeDevelop = window.location.port == '5500';
const trying = false;
const api = modeDevelop && trying  ? 'http://192.168.1.15:3000/api/' : 'https://registersapi.onrender.com/api/';

let nameValidator = false;
let ageValidator = false;
let phoneValidator = false;
let dateAttentionValidator = false;
let totalValidator = false;
let paymentValidator = false;
let cristalValidator = false;
let treatmentValidator = false;
let frameValidator = false;
let professionalValidator = false;

let quantityRowsOfTable = 13;

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
const titlesTable = [ 'ID', 'Nombre', 'Edad', 'Teléfono', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación', 'Acciones' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');
// const btnEditRegister = document.getElementById('editRegister');
// const btnShowRegister = document.getElementById('showRegister');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show modal to create register
const myModal = new bootstrap.Modal('#myModal', {
  keyboard: false
})

const modalRegister = document.getElementById('myModal');
const modalTitle = modalRegister.querySelector('.modal-title');

const formRegister = document.getElementById('createRegister');

// Inputs of Modal to create register
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const totalInput = document.getElementById('total');
const paymentInput = document.getElementById('payment');
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
const nearEyeRightCylinderInput = document.getElementById('nearEyeRightCylinder');
const nearEyeRightGradeInput = document.getElementById('nearEyeRightGrade');
const nearEyeRightPupillaryDistanceInput = document.getElementById('nearEyeRightPupillaryDistance');
const nearEyeLeftSphereInput = document.getElementById('nearEyeLeftSphere');
const nearEyeLeftCylinderInput = document.getElementById('nearEyeLeftCylinder');
const nearEyeLeftGradeInput = document.getElementById('nearEyeLeftGrade');
const nearEyeLeftPupillaryDistanceInput = document.getElementById('nearEyeLeftPupillaryDistance');

const idInput = document.getElementById('uid');

const btnCreateRegister = document.getElementById('create_register');
const btnSaveRegister = document.getElementById('save_register');
const btnEditRegister = document.getElementById('edit_register');
const btnReset = document.getElementById('btnReset');

// Div to show error
const divErrorName = document.getElementById('divErrorName');
const divErrorAge = document.getElementById('divErrorAge');
const divErrorPhone = document.getElementById('divErrorPhone');
const divErrorTotal = document.getElementById('divErrorTotal');
const divErrorPayment = document.getElementById('divErrorPayment');
const divErrorCristal = document.getElementById('divErrorCristal');
const divErrorTreatment = document.getElementById('divErrorTreatment');
const divErrorFrame = document.getElementById('divErrorFrame');
const divErrorObservation = document.getElementById('divErrorObservation');
const divErrorProfessional = document.getElementById('divErrorProfessional');
const divErrorDateAttention = document.getElementById('divErrorDateAttention');

// Show titles of table
const showTitlesTable = () => {
    let titles = '';
    for (let i = 0; i < titlesTable.length; i++) {
        titles += `<th>${titlesTable[i]}</th>`;
    }
    tableTitles.innerHTML = `<tr>${titles}</tr>`;
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
  if( data.length == 0 ) {
    showMessegeAlert(false, 'No se encontraron registros');
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  
  for (const i in data ) {
    const { id, name, age, phone, cristal, treatment, frame, professional, date_attention, created_at } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick="showModalCreateOrEdit(${id}, true, 'save_register')" value=${id} class="btn btn-primary">VER</button>`,
      `<button type="button" id='btnEditRegister' onClick="showModalCreateOrEdit(${id}, false, 'edit_register')" value=${id} class="btn btn-success">EDITAR</button>`,
      // `<button type="button" class="btn btn-danger">ELIMINAR</button>`
    ]

    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, name, age, `+569${phone}`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10), actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
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

// Show frames options in select
const showInitModal = async () => {
  // showOptions('frame', api + 'registers/table/frames');
  showOptions('treatment', api + 'registers/table/treatment');
  showOptions('cristal', api + 'registers/table/cristals');
  showOptions('professional', api + 'registers/table/professionals');
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
  if ( nameSearchInput.value === '' && phoneSearchInput.value === '' && dateAttentionInputSearch.value === '' ) {
    showTablePagination();
  } else {
    const searchQuery = '&name=' + nameSearchInput.value + '&phone=' + phoneSearchInput.value + '&date_attention=' + dateAttentionInputSearch.value;
    searchRegister( searchQuery );
    // formSearch.reset();
  }
});

async function initState () {
  dateAttentionInputSearch.max = new Date().toISOString().substring(0,10);
  showTitlesTable();
  await showTablePagination();
  // showInitModal();
}

initState();

const createEditRegister = async (data, method ='POST', uid = '') => {
  const query = uid == '' ? 'registers' : `registers/edit/${uid}`
  return await fetch( api + query , {
    method: method,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  } );
}

modalRegister.addEventListener('show.bs.modal', () => {
  dateAttentionInput.max = new Date().toISOString().substring(0,10);
  toggleMenu(btnReset.id);
  addDisabledOrRemove(false, 'disabled');
  formRegister.reset();
});

document.querySelector(`#create_register`).addEventListener('submit', async (e) => {
  // nameInput.addEventListener('input', (e) => e.target.value);
  e.preventDefault();
  //Verificar que los campos esten llenos
    nameValidator = validateAllfields(nameInput, divErrorName);
    ageValidator = validateAllfields(ageInput, divErrorAge, true);
    phoneValidator = validateAllfields(phoneInput, divErrorPhone, true);
    dateAttentionValidator = validateAllfields(totalInput, divErrorTotal, true);
    totalValidator = validateAllfields(totalInput, divErrorTotal, true);
    paymentValidator = validateAllfields(paymentInput, divErrorPayment, true);
    cristalValidator = validateAllfields(cristalInput, divErrorCristal, true);
    treatmentValidator = validateAllfields(treatmentInput, divErrorTreatment, true);
    frameValidator = validateAllfields(frameInput, divErrorFrame, true);
    professionalValidator = validateAllfields(professionalInput, divErrorProfessional, true);


    if (nameValidator, ageValidator, phoneValidator, dateAttentionValidator, totalValidator, paymentValidator, cristalValidator, treatmentValidator, frameValidator, professionalValidator) {
      console.log('All inputs are valid');
    }
    const data = {
      name: nameInput.value,
      age: parseInt(ageInput.value),
      phone: parseInt(phoneInput.value),
      total: parseInt(totalInput.value),
      payment: parseInt(paymentInput.value),
      balance: parseInt(totalInput.value) - parseInt(paymentInput.value),
      cristal: parseInt(cristalInput.value),
      treatment: parseInt(treatmentInput.value),
      frame: parseInt(frame.value),
      observation: observationInput.value,
      professional: parseInt(professional.value),
      date_attention: dateAttentionInput.value,
      far_eye_right_sphere: parseFloat(farEyeRightSphereInput.value),
      far_eye_right_cylinder: parseFloat(farEyeRightCylinderInput.value),
      far_eye_right_grade: parseInt(farEyeRightGradeInput.value),
      far_eye_right_pupillary_distance: parseInt(farEyeRightPupillaryDistanceInput.value),
      far_eye_left_sphere: parseFloat(farEyeLeftSphereInput.value),
      far_eye_left_cylinder: parseFloat(farEyeLeftCylinderInput.value),
      far_eye_left_grade: parseInt(farEyeLeftGradeInput.value),
      far_eye_left_pupillary_distance: parseInt(farEyeLeftPupillaryDistanceInput.value),
      near_eye_right_sphere: parseFloat(nearEyeRightSphereInput.value),
      near_eye_right_cylinder: parseFloat(nearEyeRightCylinderInput.value),
      near_eye_right_grade: parseInt(nearEyeRightGradeInput.value),
      near_eye_right_pupillary_distance: parseInt(nearEyeRightPupillaryDistanceInput.value),
      near_eye_left_sphere: parseFloat(nearEyeLeftSphereInput.value),
      near_eye_left_cylinder: parseFloat(nearEyeLeftCylinderInput.value),
      near_eye_left_grade: parseInt(nearEyeLeftGradeInput.value),
      near_eye_left_pupillary_distance: parseInt(nearEyeLeftPupillaryDistanceInput.value)
    };
    
    createEditRegister(data, 'POST' ).then(response => {
      if(response.status === 201){
        console.log('Estoy dentro del formulario de creado');
        showRegisters();
        // reset of Formulary
        formRegister.reset();
        // modalTitle.textContent = `Nuevo registro ingresado de ${data.name}`;
        //Close modal
        bootstrap.Modal.getInstance(modalRegister).hide();
        showMessegeAlert( false, `Nuevo registro ingresado`);
      }
    }).catch(err => {
      console.log(err)
      showMessegeAlert(true, 'Error al crear el registro');
    });
  // }
});

btnCreateRegister.addEventListener('click', () => {
  showBtnOfForm('save_register');
});

document.querySelector(`#edit_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  btnSelected = 'edit_register';
  console.log('Estoy entrando con el boton de editar y que pasa');
    const data = {
      name: nameInput.value,
      age: parseInt(ageInput.value),
      phone: parseInt(phoneInput.value),
      total: parseInt(totalInput.value),
      payment: parseInt(paymentInput.value),
      balance: parseInt(totalInput.value) - parseInt(paymentInput.value),
      cristal: parseInt(cristalInput.value),
      treatment: parseInt(treatmentInput.value),
      frame: parseInt(frame.value),
      observation: observationInput.value,
      professional: parseInt(professional.value),
      date_attention: dateAttentionInput.value,
      far_eye_right_sphere: parseFloat(farEyeRightSphereInput.value),
      far_eye_right_cylinder: parseFloat(farEyeRightCylinderInput.value),
      far_eye_right_grade: parseInt(farEyeRightGradeInput.value),
      far_eye_right_pupillary_distance: parseInt(farEyeRightPupillaryDistanceInput.value),
      far_eye_left_sphere: parseFloat(farEyeLeftSphereInput.value),
      far_eye_left_cylinder: parseFloat(farEyeLeftCylinderInput.value),
      far_eye_left_grade: parseInt(farEyeLeftGradeInput.value),
      far_eye_left_pupillary_distance: parseInt(farEyeLeftPupillaryDistanceInput.value),
      near_eye_right_sphere: parseFloat(nearEyeRightSphereInput.value),
      near_eye_right_cylinder: parseFloat(nearEyeRightCylinderInput.value),
      near_eye_right_grade: parseInt(nearEyeRightGradeInput.value),
      near_eye_right_pupillary_distance: parseInt(nearEyeRightPupillaryDistanceInput.value),
      near_eye_left_sphere: parseFloat(nearEyeLeftSphereInput.value),
      near_eye_left_cylinder: parseFloat(nearEyeLeftCylinderInput.value),
      near_eye_left_grade: parseInt(nearEyeLeftGradeInput.value),
      near_eye_left_pupillary_distance: parseInt(nearEyeLeftPupillaryDistanceInput.value)
    };
    
    createEditRegister(data, 'POST', idInput.value ).then(response => {
      if(response.status === 200){
        showRegisters();
        // reset of Formulary
        formRegister.reset();
        modalTitle.textContent = `Registro editado de ${data.name}`;
        //Close modal
        bootstrap.Modal.getInstance(modalRegister).hide();
        showMessegeAlert( false, `Registro Editado`);
      }
    }).catch(err => {
      console.log(err)
      showMessegeAlert(true, 'Error al editar el registro');
    });
  // }
});

async function showModalCreateOrEdit( uid, isReadOnly = true, btnAction ) {
  
  myModal.show();

  if (isReadOnly) {
    toggleMenu(btnSaveRegister.id);
    toggleMenu(btnReset.id);
    toggleMenu(btnEditRegister.id);
  } 
  
  if (isReadOnly == false) {
    console.log(`${ btnAction == 'save_register' ? 'Estamos Agregando datos desde el boton' : 'Estamos editando desde el boton' }`);
    showBtnOfForm(btnAction);
  }

  addDisabledOrRemove( isReadOnly ?? false , 'disabled');

  const register = await consulta( api + 'registers/' + uid );
  console.log(register.data);
  console.log(register.msg);
  
  const { 
    name, 
    age, 
    phone,
    total, 
    payment,
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
    near_eye_right_sphere,
    near_eye_left_sphere,
    near_eye_right_cylinder,
    near_eye_left_cylinder,
    near_eye_right_grade,
    near_eye_left_grade,
    near_eye_right_pupillary_distance,
    near_eye_left_pupillary_distance
 } = register.data;

  dateAttentionInput.type = 'text';

  idInput.value = uid;
  nameInput.value =  name;
  dateAttentionInput.value = date_attention.substring(0,10);
  ageInput.value = age;
  phoneInput.value = phone;
  totalInput.value = total;
  paymentInput.value = payment;
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
  nearEyeLeftSphereInput.value = near_eye_left_sphere;
  nearEyeRightCylinderInput.value = near_eye_right_cylinder;
  nearEyeLeftCylinderInput.value = near_eye_left_cylinder;
  nearEyeRightGradeInput.value = near_eye_right_grade;
  nearEyeLeftGradeInput.value = near_eye_left_grade;
  nearEyeRightPupillaryDistanceInput.value = near_eye_right_pupillary_distance;
  nearEyeLeftPupillaryDistanceInput.value = near_eye_left_pupillary_distance;

}

//Funciones de muestra de mensajes de alerta
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
  if (isErro) {
    alert.classList.add('alert-danger');
    alert.classList.remove('alert-success');
  } else {
    alert.classList.add('alert-success');
    alert.classList.remove('alert-danger');
  }
  alert.textContent = message;
  alert.style.display = 'block';
  setTimeout(() => {
    alert.style.display = 'none';
  } , time);
}

function showError( divInput, divError, messageError = '', show = true ) {
  if (show){
    divError.innerHTML = messageError;
    divInput.style.borderColor = '#ff0000';
  }else{
    divError.innerHTML = messageError;
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
  }
}

// Funciones verificadores de campos
function verifyIsFilled( input, divError ) {
  if (input.value == '') {
    divError.style.display = 'block';
    return false;
  } else {
    divError.style.display = 'none';
    return true;
  }
}

function  validateLetters( input ) {
  //Validar que solo sean letras
  const regex = /[A-z]/g;
  return regex.test(input.value) ? true : false;
}

function validateAllfields( divInput, divError, fieldNumber = false ) {
  if(verifyIsFilled(divInput, divError)){
    if (fieldNumber) {
      if (validateNumber(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      } 
      showError(divInput, divError, 'Solo se permiten numeros');
      return false;
    } else {
      if(validateLetters(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      }
      showError(divInput, divError, 'Solo se permiten letras');
      return false;
    }
  } else {
    showError(divInput, divError, 'Este campo es obligatorio');
    return false;
  }
}

function toggleMenu( id, enabled = false) {
  enabled ? document.getElementById(id).classList.remove('d-none') : document.getElementById(id).classList.add("d-none");
}

function addDisabledOrRemove( disabled = true, attribute = 'readonly' ) {
  disabled ? nameInput.setAttribute(attribute, true) : nameInput.removeAttribute(attribute);
  disabled ? ageInput.setAttribute(attribute, true) : ageInput.removeAttribute(attribute);
  disabled ? dateAttentionInput.setAttribute(attribute, true) : dateAttentionInput.removeAttribute(attribute);
  disabled ? phoneInput.setAttribute(attribute, true) : phoneInput.removeAttribute(attribute);
  disabled ? totalInput.setAttribute(attribute, true) : totalInput.removeAttribute(attribute);
  disabled ? paymentInput.setAttribute(attribute, true) : paymentInput.removeAttribute(attribute);
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
  disabled ? nearEyeRightCylinderInput.setAttribute(attribute, true) : nearEyeRightCylinderInput.removeAttribute(attribute);
  disabled ? nearEyeRightGradeInput.setAttribute(attribute, true) : nearEyeRightGradeInput.removeAttribute(attribute);
  disabled ? nearEyeRightPupillaryDistanceInput.setAttribute(attribute, true) : nearEyeRightPupillaryDistanceInput.removeAttribute(attribute);
  disabled ? nearEyeLeftSphereInput.setAttribute(attribute, true) : nearEyeLeftSphereInput.removeAttribute(attribute);
  disabled ? nearEyeLeftCylinderInput.setAttribute(attribute, true) : nearEyeLeftCylinderInput.removeAttribute(attribute);
  disabled ? nearEyeLeftGradeInput.setAttribute(attribute, true) : nearEyeLeftGradeInput.removeAttribute(attribute);
  disabled ? nearEyeLeftPupillaryDistanceInput.setAttribute(attribute, true) : nearEyeLeftPupillaryDistanceInput.removeAttribute(attribute);
}

function showBtnOfForm( btnOption ) {
  const btnActionSelected = btnOption == 'save_register' ? btnSaveRegister.id : btnEditRegister.id;
  const btnActionNotSelected = btnOption == 'save_register' ? btnEditRegister.id : btnSaveRegister.id;

  console.log(btnOption);
  toggleMenu(btnActionSelected, true);
  toggleMenu(btnActionNotSelected, false );
}