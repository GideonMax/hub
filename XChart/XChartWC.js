class Chart extends HTMLElement {
  constructor () {
    super();
    this.Container = document.createElement("div");
    this.Container.style.height = "250px";
    this.Container.style.width = "250px";
    this.Container.className = 'diagram-Container';
  }
connectedCallback() {
    var values
    var names
    $.get("/XChart.dat", function(data,status){
      values = data.stat_values;
      names = data.stat_names;
    }).then( (_)=>{
    var Max = values.reduce(function(a,b){return Math.max(a,b)})
    for(var i =0; i<values.length;i++)
    {
      var c_collumn = document.createElement("div");
      c_collumn.className="Chart-Container";
      if(values[i]*100/Max>0)
      {
        c_collumn.style.height=(values[i]*100/Max)+"%"
      }
      else {
        c_collumn.style.height="15.48%"
      }
      var c_value= document.createElement("div");
      c_value.className='Chart-Title';
      c_value.innerText=""+ values[i];
      c_collumn.appendChild(c_value);
      var c_rectangle =document.createElement("div");
      c_rectangle.className= 'Chart';
      c_rectangle.style.height= "87%"
      c_collumn.appendChild(c_rectangle);
      var c_Title = document.createElement("div");
      c_Title.className='Chart-Title';
      c_Title.innerText= names[i]
      c_collumn.appendChild(c_Title);
      this.Container.appendChild(c_collumn);
    }
    this.appendChild(this.Container);
  }
  ,(error)=>{console.error(error);} )

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
