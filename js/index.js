const modeDevelop = window.location.port == '5500'; 
const trying = true;
const api = modeDevelop && trying  ? 'http://192.168.1.83:3000/api/' : 'https://montecarlos-register.herokuapp.com/api/';

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
const titlesTable = [ 'ID', 'Nombre', 'Edad', 'Teléfono', 'Total', 'Pago', 'Saldo', 'Cristal', 'Tratamiento', 'Marco', 'Profesional', 'Fecha de atención', 'Fecha de creación', 'Acciones' ];
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
const idInput = document.getElementById('id');
const btnSaveRegister = document.getElementById('save_register');
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
  table.innerHTML ="";
  if( data.length == 0 ) {
    showMessegeAlert(false, 'No se encontraron registros');
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  
  for (const i in data ) {
    const { id, name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick='showModalF(${id})' value=${id} class="btn btn-primary">VER</button>`,
      `<button type="button" id='btnEditRegister' value=${id} class="btn btn-success">EDITAR</button>`,
      // `<button type="button" class="btn btn-danger">ELIMINAR</button>`
    ]

    const rowClass  = 'text-center';
    const customRow = `<td>${ [ id, name, age, `+569${phone}`, `$${total}`, `$${payment}`, `$${balance}`, cristal, treatment, frame, professional, date_attention.substring(0,10), created_at.substring(0,10), actions ].join('</td><td>') }</td>`;
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
    localStorage.setItem(select, JSON.stringify(result.data));
  }
  
  const options = data ?? JSON.parse(localStorage.getItem(select));

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

const createEditRegister = async (data, method ='POST') => {
  return await fetch( api + 'registers', {
    method: method,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  } );
}

//Change date to max date to today
modalRegister.addEventListener('show.bs.modal', () => {
  dateAttentionInput.max = new Date().toISOString().substring(0,10);
  btnSaveRegister.classList.remove("d-none");
  btnReset.classList.remove('d-none');
  addDisabledOrRemove(false, 'disabled');
  formRegister.reset();
  showInitModal();
});


document.querySelector('#createRegister').addEventListener('submit', async (e) => {
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
      date_attention: dateAttentionInput.value
    };
    
    createEditRegister(data, 'POST').then(response => {
      if(response.status === 201){
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

async function showModalF(uid) {
  
  myModal.show();

  toggleMenu(btnSaveRegister.id);
  toggleMenu(btnReset.id);
  addDisabledOrRemove(true, 'disabled');

  const register = await consulta( api + 'registers/' + uid );
  const { name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at } = register.data;
  
  nameInput.value =  name;
  dateAttentionInput.type = 'text';
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
function verifyIsFilled(input, divError) {
  if (input.value == '') {
    divError.style.display = 'block';
    return false;
  } else {
    divError.style.display = 'none';
    return true;
  }
}

function  validateLetters(input) {
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

function toggleMenu(id) {
  document.getElementById(id).classList.add("d-none");
}

function addDisabledOrRemove(disabled = true, attribute = 'readonly') {
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
}