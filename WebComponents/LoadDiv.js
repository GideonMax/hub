class loaded extends HTMLElement {
  static get observedAttributes() {
    return ['file']
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.container = document.createElement("div");
    this.shadow.appendChild(this.container)
  }
  attributeChangedCallback(name, oldvalue, newvalue) {
    $(this.container).load(newvalue)
  }

}
window.customElements.define("loaded-div",loaded)