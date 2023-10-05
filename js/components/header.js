class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div class="container-fluid">
              <a class="navbar-brand" href="/index.html">Optica Montecarlos</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a id="url" class="nav-link" aria-current="page" href="/index.html">Incio</a>
                  </li>
                  <li class="nav-item">
                    <a id="url" class="nav-link" href="/history.html">Historial</a>
                  </li>
                  <li class="nav-item">
                    <a id="url" class="nav-link" href="/cristal.html">Cristals</a>
                  </li>
                  <li class="nav-item">
                    <a id="url" class="nav-link" href="/treatment.html">Tratamientos</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
    }

}

customElements.define('header-component', Header);