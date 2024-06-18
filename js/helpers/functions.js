const token = localStorage.getItem("token");
const rut = localStorage.getItem('rut');
const user = localStorage.getItem('name');
const userId = Number(localStorage.getItem('uid'));
const role = localStorage.getItem('role');

function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => { console.log( err ) } )
  });
}
// Función para crear botones de paginación
function createPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Limpia los botones existentes

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => showTablePagination(i);
    if (i === currentPage) pageButton.classList.add('active');
    paginationContainer.appendChild(pageButton);
  }
}

// function paginado( paginas, limit = 10){
//   const totalPages =  paginas > 32 ? 32 : paginas
//   for (let index = 0; index < totalPages; index++ ) document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="printList(${ index * limit })">${ index + 1}</button></li>`;
// }
function paginado( table, limit = 5,  bar = false, counter = true ){
  const options = {
    numberPerPage: limit, 
    goBar: bar, 
    pageCounter: counter
  };
  paginate.init(table, options);
}

//Funciones de muestra de mensajes de alerta
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
    if (isErro) {
      alertMessage.classList.add('alert-danger');
      alertMessage.classList.remove('alert-success');
    } else {
      alertMessage.classList.add('alert-success');
      alertMessage.classList.remove('alert-danger');
    }
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';
    setTimeout(() => {
      alertMessage.style.display = 'none';
    }, time);
}
  
function showError( divInput, divError, messageError = '', show = true ) {
  if (show){
    divError.innerText = messageError;
    divInput.style.borderColor = '#ff0000';
  } else {
    divError.innerText = messageError;
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
function validateNumber(input) {
  // Validar input que solo sean numeros negativos
  const regex = /^[0-9]*$/;
  return regex.test(input.value) ? true : false;
}

function validateAllfields( divInput, divError, fieldNumber = false ) {
  if(verifyIsFilled(divInput, divError)){
    if (fieldNumber) {
      if (validateNumber(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      } 
      showError(divInput, divError, 'Solo se permiten numeros', true);
      return false;
    } else {
      if(validateLetters(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      }
      showError(divInput, divError, 'Solo se permiten letras', true);
      return false;
    }
  } else {
    showError(divInput, divError, 'Este campo es obligatorio');
    return false;
  }
}

const toggleMenu = ( id, enabled = false) => enabled ? document.getElementById( id ).classList.remove('d-none') : document.getElementById( id ).classList.add("d-none");

const showBadgeBoolean = (enabled = 1) => `<span class="badge text-bg-${ enabled == 1 ? 'success' : 'danger' }">${enabled ? 'ACTIVADO' : 'DESACTIVADO'}</span>`

const btnClass = (data) => `<div class="btn-group" role="group"> ${ data }</div>`

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

function exportTableToPDF(tableID,  filename = 'registrosEnPdf' ) {
  const doc = new jsPDF('p', 'mm', 'a4'); // A4 page in portrait mode
  doc.autoTable({
     html: document.getElementById(tableID),
     startY: 20,
     theme: 'grid', // Optional, uses grid theme if not defined
     styles: {
       fontSize: 9,
       overflow: 'linebreak',
       columnWidth: 'wrap'
     },
     headerStyles: {
       fillColor: [231, 76, 60],
       fontSize: 12
     },
     bodyStyles: {
       fillColor: [255, 255, 255],
       strokeColor: [0, 0, 0],
       fontSize: 10
     },
     alternateRowStyles: {
       fillColor: [245, 245, 245]
     }
  });
 
  doc.save(`${filename}.pdf`); // Save the PDF with a filename
}
function closeSession() {
  localStorage.clear();
  noLogin();
}

function isSession(){
  if (!rut && url !== `${url}/login.html`) return window.location.href = `${url}/login.html`;
}

function noLogin() {
  let urlok = location.href.replace(url, "");
  (localStorage.getItem("token") === null && urlok !==`${url}/login.html`) 
  ? location.replace(`${url}/login.html`)
  : console.log("LOGEADO");
}