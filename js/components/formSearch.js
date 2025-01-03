class FormSearch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      this.innerHTML = `
      <div class=" container-search container">
        <form class="d-flex" role="search" id="form-search">
          <input class="form-control me-2" type="search" id="rutSearch" placeholder="Ingresa Rut" aria-label="Search">
          <input class="form-control me-2" type="search" id="nameSearch" placeholder="Ingresa Nombre" aria-label="Search">
          <input class="form-control me-2" type="number" id="phoneSearch" placeholder="Ingresa Telefono" aria-label="Search">
          <button class="btn btn-primary" type="submit">Buscar</button>
          <button id="btn-clear-search" class="btn btn-secondary" type="reset">Limpiar</button>
        </form>
      </div>`;
    }
}

customElements.define('form-search-component', FormSearch);