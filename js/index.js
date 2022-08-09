const api = 'asdasd';

const getData = async () => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
} 


const submitNewData = async (data) => {
    const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
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
