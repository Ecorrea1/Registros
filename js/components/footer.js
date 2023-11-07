class Footer extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.message = '© Derechos Reservados 2023 | OPTICA MONTENCARLOS',
      this.classnamemessage = 'copyright'
    ];
  }

  static get observedAttributes(){ return ['message', 'classname','classnamemessage']; }
  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }
  connectedCallback() {
    this.innerHTML = `
    <footer class="${ this.classnama }">
      <p class="${ this.classnamemessage }">${this.message}</p>
    </footer>`;
  }
}

customElements.define('footer-component', Footer);