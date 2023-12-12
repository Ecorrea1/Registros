function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => { console.log( err ) } )
  });
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

  const showBadgeBoolean = (enabled = 1) => { 
    const enabledCristal = enabled ? 'ACTIVADO' : 'DESACTIVADO'
    return `<span class="badge text-bg-${ enabledCristal == 'ACTIVADO' ? 'success' : 'danger' }">${enabledCristal}</span>`
 }

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