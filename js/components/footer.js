class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="">
          <div class="copyright">
            © Derechos Reservados 2023 | <a href="https://impulsandonegocios.cl">ImpulsandoNegocios</a>
          </div>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);