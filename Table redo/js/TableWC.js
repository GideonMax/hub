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
                    <th></th>
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
                    <th></th>
               </tr>
               `
      var a =new Array(8);
      for (var i = 0; i < a.length; i++) {
        a[i]= new Array(8);
        for(var j = 0; j < 8; j++)
        {
          a[i][j]={clr:"#000"}
        }
      }
      for(var j in data){
        var i =data[j]
        a[Times.indexOf(i.tstart)][pl.indexOf(i.place)]={yes:null,clr:i.clr,co:i.co,name:i.name}
        for(var j = Times.indexOf(i.tstart)+1;j<Times.indexOf(i.tend);j++)
        {
          a[j][pl.indexOf(i.place)]={clr:i.clr,yes:null}
        }
      }
      for(var i=0;i<a.length; i++){
        var row=a[i];
        var trow = document.createElement("tr")
        for(var j =0;j<row.length;j++)
        {
          var collumn=row[j]
          var td = document.createElement("td")
          td.className = "card";
          td.style.borderColor = "transparent"
          if(collumn.hasOwnProperty('name'))
          {
            td.innerHTML=`<h3 class="cardtitle" style="color: ${collumn.clr}">
            <b>${collumn.name}</b>
            <\h3>
            <h5 class="carddesc">${collumn.co}</h5>`;
          } 
          if(collumn.hasOwnProperty('yes')){
            td.style.borderRightColor = collumn.clr;
            td.style.borderRightWidth = "2px";
            td.style.backgroundColor = "#f0f0f0";
            td.style.textAlign = "Right";
            //td.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
          }
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
