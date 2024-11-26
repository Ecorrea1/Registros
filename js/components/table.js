class Table extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <table id="table_registros" class="table table-striped table-xl table-bordered table-hover table-responsive-xxl">
          <thead id="list_titles" class="table-dark"></thead>
          <div class="spinner"></>
          <tbody id="list_row"></tbody>
        </table>
        `;
    }
}

customElements.define('table-component', Table);