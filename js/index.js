const modeDevelop = false; 
const api = modeDevelop ? 'http://192.168.1.15:3000/api/' : 'https://montecarlos-register.herokuapp.com/api/';

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
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show modal to create register
const modalRegister = document.getElementById('myModal');
const modalTitle = modalRegister.querySelector('.modal-title');

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

// Div to show error
const divErrorName = document.getElementById('divErrorName');
const divErrorAge = document.getElementById('divErrorAge');
const divErrorPhone = document.getElementById('divErrorPhone');
const divErrorTotal = document.getElementById('divErrorTotal');
const divErrorPayment = document.getElementById('divErrorPayment');
const divErrorBalance = document.getElementById('divErrorBalance');
const divErrorCristal = document.getElementById('divErrorCristal');
const divErrorTreatment = document.getElementById('divErrorTreatment');
const divErrorFrame = document.getElementById('divErrorFrame');
const divErrorObservation = document.getElementById('divErrorObservation');
const divErrorProfessional = document.getElementById('divErrorProfessional');
const divErrorDateAttention = document.getElementById('divErrorDateAttention');

function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => console.log( err ) )
  });
}

const printList = async ( data ) =>{
  table.innerHTML ="";
  for (const i in data ) {
    const { id, name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at } = data[i];
    let rowClass  = 'text-right';
    let customRow = `<td>${ [ id, name, age, `+569${phone}`, `$${total}`, `$${payment}`, `$${balance}`, cristal, treatment, frame, observation, professional, date_attention.substring(0,10), created_at.substring(0,10) ].join('</td><td>') }</td>`;
    let row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
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
  const options = await consulta( url );
  document.getElementById(select).innerHTML = "";
  for (const i in options.data ) {
    const { id, name } = options.data[i];
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

async function initState () {
  dateAttentionInputSearch.max = new Date().toISOString().substring(0,10);
  showTablePagination();
  // showInitModal();
}

initState();

const searchRegister = async ( searchQuery ) => {
  const register = await consulta( api + 'registers/search?page=1' + searchQuery );
  printList( register.data );
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  if ( nameSearchInput.value === '' && rutSearchInput.value === '' && phoneSearchInput.value === '' && dateAttentionInputSearch.value === '' ) {
    showTablePagination();
  } else {
    const searchQuery = '&name=' + nameSearchInput.value + '&rut=' + rutSearchInput.value + '&phone=' + phoneSearchInput.value + '&date_attention=' + dateAttentionInputSearch.value;
    searchRegister( searchQuery );
    // formSearch.reset();
  }
});

const createNewRegister = async (data) => {
  return await fetch( api + 'registers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  } );
}

//Change date to max date to today
modalRegister.addEventListener('show.bs.modal', () => {
  dateAttentionInput.max = new Date().toISOString().substring(0,10);
  showInitModal();
});


document.querySelector('#save_register').addEventListener('click', async (e) => {
  e.preventDefault();
  // nameInput.addEventListener('input', (e) => e.target.value);

  //Verificar que los campos esten llenos
  if(verifyIsFilled(nameInput, divErrorName)){
    validateLetters(nameInput) ? showError(nameInput, divErrorName, '', false) : showError(nameInput, divErrorName, 'Solo se permiten letras');
  } else {
    showError(nameInput, divErrorName, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(ageInput, divErrorAge)){
    validateNumber(ageInput) ? showError(ageInput, divErrorAge, '', false) : showError(ageInput, divErrorAge, 'Solo se permiten numeros');
  }else{
    showError(ageInput, divErrorAge, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(phoneInput, divErrorPhone)){
    validateNumber(phoneInput) ? showError(phoneInput, divErrorPhone, '', false) : showError(phoneInput, divErrorPhone, 'Solo se permiten numeros');
  }else {
    showError(phoneInput, divErrorPhone, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(totalInput, divErrorTotal)){
    validateNumber(totalInput) ? showError(totalInput, divErrorTotal, '', false) : showError(totalInput, divErrorTotal, 'Solo se permiten numeros');
  } else {
    showError(totalInput, divErrorTotal, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(paymentInput, divErrorPayment)){
    validateNumber(paymentInput) ? showError(paymentInput, divErrorPayment, '', false) : showError(paymentInput, divErrorPayment, 'Solo se permiten numeros');
  } else {
    showError(paymentInput, divErrorPayment, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(cristalInput, divErrorCristal)){
    validateNumber(cristalInput) ? showError(cristalInput, divErrorCristal, '', false) : showError(cristalInput, divErrorCristal, 'Solo se permiten numeros');
  } else { 
    showError(cristalInput, divErrorCristal, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(treatmentInput, divErrorTreatment)){
    validateNumber(treatmentInput) ? showError(treatmentInput, divErrorTreatment, '', false) : showError(treatmentInput, divErrorTreatment, 'Solo se permiten numeros');
  } else {
    showError(treatmentInput, divErrorTreatment, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(frameInput, divErrorFrame)){
    validateNumber(frameInput) ? showError(frameInput, divErrorFrame, '', false) : showError(frameInput, divErrorFrame, 'Solo se permiten numeros');
  } else {
    showError(frameInput, divErrorFrame, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(observationInput, divErrorObservation)){
    validateLetters(observationInput) ? showError(observationInput, divErrorObservation, '', false) : showError(observationInput, divErrorObservation, 'Solo se permiten letras');
  } else {
    showError(observationInput, divErrorObservation, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(professionalInput, divErrorProfessional)){
    validateLetters(professionalInput) ? showError(professionalInput, divErrorProfessional, '', false) : showError(professionalInput, divErrorProfessional, 'Solo se permiten letras');
  } else {
    showError(professionalInput, divErrorProfessional, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(dateAttentionInput, divErrorDateAttention)){
    validateDate(dateAttentionInput) ? showError(dateAttentionInput, divErrorDateAttention, '', false) : showError(dateAttentionInput, divErrorDateAttention, 'Solo se permiten letras');
  } else {
    showError(dateAttentionInput, divErrorDateAttention, 'Este campo es obligatorio');
  }

  if(verifyIsFilled(nameInput, divErrorName) && verifyIsFilled(ageInput, divErrorAge) && verifyIsFilled(phoneInput, divErrorPhone) && verifyIsFilled(totalInput, divErrorTotal) && verifyIsFilled(paymentInput, divErrorPayment) && verifyIsFilled(balanceInput, divErrorBalance) && verifyIsFilled(cristalInput, divErrorCristal) && verifyIsFilled(treatmentInput, divErrorTreatment) && verifyIsFilled(frameInput, divErrorFrame) && verifyIsFilled(observationInput, divErrorObservation) && verifyIsFilled(professionalInput, divErrorProfessional) && verifyIsFilled(dateAttentionInput, divErrorDateAttention)){
    
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
    
    createNewRegister(data).then(response => {
      if(response.status === 201){
        showRegisters();
        // reset of Formulary
        modalRegister.reset();
        // modalTitle.textContent = `Nuevo registro ingresado de ${data.name}`;
        //Close modal
        bootstrap.Modal.getInstance(modalRegister).hide();
        showMessegeAlert( false, `Nuevo registro ingresado`);
        // modalRegister.modal('hide');
      }
    }).catch(err => {
      console.log(err)
      showMessegeAlert(true, 'Error al crear el registro');
    });
  }
});

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

function showError( divInput, divError ,messageError = '', show = true ) {
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