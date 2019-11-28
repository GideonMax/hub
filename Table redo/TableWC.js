const pl = new Array( '1olam','2olam','3olam','maz','pnay','hub','sadna','pool');
const Times =['1700','1730','1800','1830','1900','1930','2000','2030','2100'];
class Table extends HTMLElement{
  static get observedAttributes(){
    return ['day','normal'];
  }
  constructor(){
    super()
    this.shadow= this.attachShadow({mode:'open'});
    var link = document.createElement("link");
    link.rel="stylesheet";
    link.href="/TableWC.css";
    this.shadow.appendChild(link);
    this.table = document.createElement("table");

      this.table.innerHTML = `
               <tr>
                    <th>אולם ראשון</th>
                    <th>אולם שני</th>
                    <th>אולם שלישי</th>
                    <th>מזכירות</th>
                    <th>פנאי</th>
                    <th>האב</th>
                    <th>סדנא</th>
                    <th>בריכה</th>
                    <th>זמן/אולם</th>
               </tr>
               `
    this.shadow.appendChild(this.table);
  }
  connectedCallback(){
    $.post("/table.dat",{ day: this.getAttribute('day'), normal: this.hasAttribute('normal')  },(data,status)=>{
      this.table.innerHTML = `
               <tr>
                    <th>אולם ראשון</th>
                    <th>אולם שני</th>
                    <th>אולם שלישי</th>
                    <th>מזכירות</th>
                    <th>פנאי</th>
                    <th>האב</th>
                    <th>סדנא</th>
                    <th>בריכה</th>
                    <th>זמן/אולם</th>
               </tr>
               `
      var a =new Array(8);
      for (var i = 0; i < a.length; i++) {
        a[i]= new Array(8);
        for(var j = 0; j < 8; j++)
        {
          a[i][j]={clr:"ffffff"}
        }
      }
      for(var j in data){
        var i =data[j]
        a[Times.indexOf(i.tstart)][pl.indexOf(i.place)]={clr:i.clr,co:i.co,name:i.name}
        for(var j = Times.indexOf(i.tstart)+1;j<Times.indexOf(i.tend);j++)
        {
          a[j][pl.indexOf(i.place)]={clr:i.clr}
        }
      }
      for(var i=0;i<a.length; i++){
        var row=a[i];
        var trow = document.createElement("tr")
        for(var j =0;j<row.length;j++)
        {
          var collumn=row[j]
          var td = document.createElement("td")
          if(collumn.hasOwnProperty('name'))
          {
            td.innerHTML=collumn.name +"<br/>"+collumn.co;
          }
          td.style.backgroundColor="#"+ collumn.clr;
          trow.appendChild(td)
        }
        var timeTD=document.createElement("td")
        var time =Times[a.indexOf(row)]
        timeTD.innerText= time.slice(0,2)+":"+time.slice(2)
        trow.appendChild(timeTD)
        this.table.appendChild(trow)
      }
    })
  }
}

window.customElements.define('time-table', Table);
