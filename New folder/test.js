class Chart extends HTMLElement {
  constructor () {
    super();
             this.Container = document.createElement("div");
             this.collumn = document.createElement("div");
             this.value = document.createElement("div");
             this.Title = document.createElement("div");
             this.v = document.createElement("div");

             this.Container.style.height = "250px";
             this.Container.style.width = "250px";
             this.collumn.style.height = "87%";
             this.value.innerText = "500";
             this.Title.innerText = "פטל"

             this.collumn.className = "Chart-Container";
             this.Container.className = 'diagram-Container';
             this.value.className = 'Chart-Title';
             this.Title.className = 'Chart-Title';
             this.v.className = 'Chart'
  }
connectedCallback() {
    this.collumn.appendChild(this.value);
    this.collumn.appendChild(this.v);
    this.collumn.appendChild(this.Title);
    this.Container.appendChild(this.collumn);
    this.appendChild(this.Container);

}
}

window.customElements.define('x-chart', Chart);
$(document).ready(function(){
  $.get("/test.dat", function(data,status){
    alert(data +"\n"+status)
  })
})
