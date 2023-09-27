class Table extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <table id="table_registros" class="table table-striped table-xl table-bordered table-hover table-responsive-xxl">
          <caption>Lista de Registros</caption>
          <thead id="list_titles" class="table-dark"></thead>
          <tbody id="list_row"></tbody>
        </table>
        </tfoot>
        `;
    }

}

customElements.define('table-component', Table);