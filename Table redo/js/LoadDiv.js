class loaded extends HTMLElement {
  static get observedAttributes() {
    return ['file']
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldvalue, newvalue) {
    $(this.container).load(newvalue)
  }
  
  connectedCallback(){
    this.container = document.createElement("div");
    this.appendChild(this.container)
  }

}
window.customElements.define("loaded-div",loaded)