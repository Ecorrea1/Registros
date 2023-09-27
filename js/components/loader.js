class Loader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div id="fader" class="fader">
          <div class="loading"></div>
          <p class="message">Cargando...</p>
        </div>
        `;
    }
}

customElements.define('loader-component', Loader);