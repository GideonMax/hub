class loaded extends HTMLElement {
  static get observedAttributes() {
    return ['file'];
  }
  constructor() {
    super();
  }

  connectedCallback(){
    this.container = document.createElement("div");
    this.appendChild(this.container);
  }

  attributeChangedCallback(name, oldvalue, newvalue) {
    fetch(newvalue)
      .then(res=>res.text())
      .then(text=>this.container.innerHTML=text);
  }
}
window.customElements.define("loaded-div",loaded);