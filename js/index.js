const api = 'https://montecarlos-register.herokuapp.com/api/';

const consulta = (url) => {
  return new Promise((resolve, reject) => {
      const requestOptions = { method: 'GET', redirect: 'follow' };

      fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => { resolve(JSON.parse(JSON.stringify(data))); })
          .catch(err => console.log(err))
  });
}

const allRegisters = async () => {
  const registers = await consulta(api + 'registers');
  console.log('registers', registers);
  return registers;
}


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
