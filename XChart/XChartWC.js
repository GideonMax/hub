class Chart extends HTMLElement {
  static get obsrevedAttributes(){
    return ['color']
  }

  constructor () {
    super();
    this.shadow = this.attachShadow({ 'mode': 'open' });
    var link = document.createElement("link");
    link.rel="stylesheet";
    link.href="test.css";
    this.shadow.appendChild(link);
    this.Container = document.createElement("div");
    this.Container.style.height = "250px";
    //this.Container.style.width = "250px";
    this.Container.className = 'diagram-Container';
  }
connectedCallback() {
    var values
    var names
    $.get("/XChart.dat", (data,status)=>{
    values = data.stat_values;
    names = data.stat_names;
    this.Container.style.width= 55*values.length+"px";
    var Max = values.reduce(function(a,b){return Math.max(a,b)});
    for(var i =0; i<values.length;i++)
    {

      var c_collumn = document.createElement("div");//c_collumn contains the collumn's name, value and rectangle
      c_collumn.className="Chart-Container";
      if(values[i]>0)
      {
        c_collumn.style.height=(values[i]*100/Max)+"%"
      }
      else {
        c_collumn.style.height="15.48%"
      }

      var c_value= document.createElement("div");//number on top of collumn
      c_value.className='Chart-Title';
      c_value.innerText=""+ values[i];
      c_collumn.appendChild(c_value);

      var c_rectangle =document.createElement("div");//collumn's rectangle
      c_rectangle.className= 'Chart';
      c_rectangle.style.height= "87%";
      if(values[i]==Max)
      {
        if(this.hasAttribute('color'))
        {
          c_rectangle.style.backgroundColor=this.getAttribute('color')
        }
        else
        {
          c_rectangle.style.backgroundColor='#e91e63'
        }
      }
      c_collumn.appendChild(c_rectangle);

      var c_Title = document.createElement("div");
      c_Title.className='Chart-Title';
      c_Title.innerText= names[i]
      c_collumn.appendChild(c_Title);
      this.Container.appendChild(c_collumn);
    }
    this.shadow.appendChild(this.Container);
  } )

}
}

window.customElements.define('x-chart', Chart);
/////PULL BARMEN FROM DATA BASE
/*
$(document).ready( ()=>{
  $.get("/barmen.dat",(data,status)=>{

    data now contains a JSON like object that looks exactly like the "barmen" branch in the database

  })
} )
*/


/////
/*






*/
