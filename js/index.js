const modeDevelop = false; 
const api = modeDevelop ? 'http://192.168.1.15:3000/api/' : 'https://montecarlos-register.herokuapp.com/api/';

function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
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
      let customRow = `<td>${ [ id, name, age, `+569${phone}`, `$${total}`, `$${payment}`, `$${balance}`, cristal, treatment, frame, observation, professional, date_attention.substring(0,10), created_at.substring(0,10) ].join('</td><td>') }</td>`;
      let row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
      document.getElementById("list_row").innerHTML += row;
  }
}

show_registers();

// const exampleModal = document.getElementById('myModal')
// exampleModal.addEventListener('show.bs.modal', event => {
//   // Button that triggered the modal
//   const button = event.relatedTarget
//   // Extract info from data-bs-* attributes
//   const recipient = button.getAttribute('data-bs-whatever')
//   // If necessary, you could initiate an AJAX request here
//   // and then do the updating in a callback.
//   //
//   // Update the modal's content.
//   const modalTitle = exampleModal.querySelector('.modal-title')
//   const modalBodyInput = exampleModal.querySelector('.modal-body input')

//   modalTitle.textContent = `New message to ${recipient}`
//   modalBodyInput.value = recipient
// })


const createRegister = document.getElementById('createRegister');
createRegister.addEventListener('submit', async (e) => {
  e.preventDefault();
  //Modal data
  const exampleModal = document.getElementById('myModal');
  const modalTitle = exampleModal.querySelector('.modal-title');

  const total = parseInt(document.getElementById('total').value);
  const payment = parseInt(document.getElementById('payment').value);
  if (total < payment) return document.getElementById('total').placeholder = 'Total must be greater than payment';

  const data = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    phone: document.getElementById('phone').value,
    total: total,
    payment: payment,
    balance: total - payment,
    cristal: document.getElementById('cristal').value,
    treatment: document.getElementById('treatment').value,
    frame: document.getElementById('frame').value,
    observation: document.getElementById('observation').value,
    professional: document.getElementById('professional').value,
    date_attention: document.getElementById('date_attention').value
  };

  const response = await fetch( api + 'registers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  } );
  console.log(response.ok);
  if (!response.ok) return modalTitle.textContent = `No pudimos ingresar registro de ${data.name}`;
  modalTitle.textContent = `Nuevo registro ingresado de ${data.name}`;
  show_registers();
  //limpiar formulario
  createRegister.reset();
  //cerrar modal completamente
  exampleModal.hide();
} 
);