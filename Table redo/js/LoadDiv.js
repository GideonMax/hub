class loaded extends HTMLElement {
  static get observedAttributes() {
    return ['file', 'withScript'];
  }
  constructor() {
    super();
  }

  connectedCallback() {
    this.container = document.createElement("div");
    this.appendChild(this.container);
  }
  clear() {
    this.container.innerHTML = "";
  }
  attributeChangedCallback(name, oldvalue, newvalue) {
    if (name != 'file') return;
    this.clear();

    fetch(newvalue + ".load")
      .then(res => res.text())
      .then(text => {
        this.container.innerHTML += text;
        if (this.getAttribute('withScript') == 'true') {
          import(newvalue + ".js").then(ns => {
            if (ns.onLoad != undefined) ns.onLoad();
          });
        }
      });
  }
}
window.customElements.define("loaded-div", loaded);