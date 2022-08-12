const modeDevelop = false; 
const api = modeDevelop ? 'http://192.168.1.15:3000/api/' : 'https://montecarlos-register.herokuapp.com/api/';

function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    const requestOptions = { method: 'GET', redirect: 'follow' };
    console.log(`${url}`);
    fetch( url, requestOptions )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => console.log( err ) )
  });
}

// Show all registers in the table
const show_registers = async () => {
  const registers = await consulta( api + 'registers');
  imprimirLista( registers.data );
}


async function imprimirLista( data ) {
  
  document.getElementById("list_row").innerHTML ="";
  for (const i in data ) {
      const { id, name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at } = data[i];
      let rowClass  = 'text-right';
      let customRow = `<td>${ [ id, name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at ].join('</td><td>') }</td>`;
      let row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
      document.getElementById("list_row").innerHTML += row;
  }
}

show_registers();

const exampleModal = document.getElementById('myModal')
exampleModal.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient
})
