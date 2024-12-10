class Header extends HTMLElement {
  constructor() {
      super();
      this.attributesComponents = [
        this.name = 'Optica Montecarlos',
        this.classname = 'navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body'
      ];
  }

  static get observedAttributes() { return ['name', 'classname']; }

  attributeChangedCallback(attribute, _, newAttr) {
      this.attributesComponents = [...this.attributesComponents, attribute];
      this[attribute] = newAttr;
  }

  connectedCallback() {
      this.innerHTML = `
      <header>
        <nav class="${this.classname}" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">${this.name}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="pages">
                 <li><a id="url" name="registers" class="dropdown-item" href="/index.html">Registros</a></li>

                <li class="nav-item dropdown" id="logistic">
                    <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Configuracion</a>
                    <ul class="dropdown-menu">
                        <li><a id="url" name="event" class="dropdown-item" href="/cristal.html">Cristales</a></li>
                        <li><a id="url" name="candidates" class="dropdown-item" href="/treatment.html">Tratamientos</a></li>
                        <li><a id="url" name="ubication" class="dropdown-item disabled" href="/types.html">Tipos</a></li>
                        <li><a id="url" name="tables" class="dropdown-item disabled" href="/tables.html">Mesas</a></li>
                    </ul>
                </li>
              </ul>
                
                <ul id="user-info" class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a id="url" class="nav-link dropdown-toggle" name="url-login" href="/login.html" role="button" data-bs-toggle="dropdown" aria-expanded="false"> !Hola </a>
                        <ul class="dropdown-menu">
                            <li><a id="url" name="user" class="dropdown-item disabled" href="/user.html" href="#" disabled>Editar</a></li>
                            <li><a class="dropdown-item" name="close-session" onclick="closeSession()">Cerrar Sesion</a></li>
                        </ul>
                    </li>
                </ul>

            </div>
          </div>
        </nav>
    </header>
      `;

      // this.ocultarPaginasPorPermiso();
  }

  ocultarPaginasPorPermiso() {
    const pagesArray = JSON.parse(localStorage.getItem('pages') ) .map(item => item.page);
    const paginasPermitidas = pagesArray || ['user', 'close-session'];
    const items = document.querySelectorAll('#pages .nav-item');
    const pages = document.querySelectorAll('#pages .nav-item .dropdown-item');
    const userInfo = document.querySelectorAll('#user-info .nav-item .dropdown-item');


    items.forEach(page => {
        const pageId = page.id;
        if (!paginasPermitidas.includes(pageId)) {
            page.style.display = 'none';
        }
    });

    pages.forEach(page => {
      const pageName = page.getAttribute('name');
      if (!paginasPermitidas.includes(pageName)) {
          page.style.display = 'none';
      }
  });

    userInfo.forEach(page => {
      const pageName = page.getAttribute('name');
      if (!paginasPermitidas.includes(pageName)) {
          page.style.display = 'none';
      }
  });

}
}

customElements.define('header-component', Header);
