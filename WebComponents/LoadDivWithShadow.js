//This file, by decree of Master Max Merling, has been purged from JQuery and requires no further libraries, yay for 0 dependencies

class loadedShadow extends HTMLElement {
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
    fetch(newvalue)
    .then(res=>res.text())
    .then(text=>{
      this.container.innerHTML=newValue;
    });
  }

}
window.customElements.define("shadow-loaded-div",loadedShadow)