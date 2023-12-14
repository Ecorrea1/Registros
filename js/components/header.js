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

            <div class="d-flex">
                <ul class="navbar-nav me-auto mb-2  mb-lg-0">
                  <li class="nav-item dropdown">
                    <a id="url" class="nav-link dropdown-toggle" name="url-login" href="/login.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Iniciar Sesion
                    </a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item disabled" href="#">Editar</a></li>
                    <li><a class="dropdown-item" onclick="closeSession()">Cerrar Sesion</a></li>
                    </ul>
                  </li>
              
                  </ul>
                </div>
          </div>

          </nav>
        `;
    }

}

customElements.define('header-component', Header);