const pl = ['pool','sadna','hub','pnay','maz','3olam','2olam','1olam',];
const Times =['1700','1730','1800','1830','1900','1930','2000','2030','2100'];
class Table extends HTMLElement{
  static get observedAttributes(){
    return ['size','width','height','day','normal','root'];
  }
  constructor(){
    super()
    this.shadow= this.attachShadow({mode:'open'});
    var link = document.createElement("link");
    link.rel="stylesheet";
    link.href="/TableWC.css";
    this.shadow.appendChild(link);
    this.table = document.createElement("table");
    this.shadow.appendChild(this.table);
  }
  makeDataRequestData(){
    if(this.hasAttribute("normal")){
      return {
        day: this.getAttribute("day"),
        normal: 'true'
      };
    }
    let root="";
    if(this.hasAttribute("root")){
      root=this.getAttribute("root");
    }
    else{
      var date = new Date();
      root= date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    }
    return{
      day: this.getAttribute("day"),
      root:root,
      normal:'false'
    };
  }

  connectedCallback(){
    
    var size = this.getAttribute('size');
    this.table.style.fontSize=size;
    var width = this.getAttribute('width');
    var height = this.getAttribute('height');
    this.table.style.width=width;
    this.table.style.height=height;

    $.post("/table.dat",this.makeDataRequestData(),(data,status)=>{
      this.table.innerHTML = `
               <tr>
                    <th class="empty"></th>
                    <th>בריכה</th>
                    <th>סדנא</th>
                    <th>האב</th>
                    <th>פנאי</th>
                    <th>מזכירות</th>
                    <th>אולם שלישי</th>
                    <th>אולם שני</th>
                    <th>אולם ראשון</th>
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
        
        var timeTD=document.createElement("td")
        var time =Times[a.indexOf(row)]
        timeTD.innerText= time.slice(0,2)+":"+time.slice(2)
        trow.appendChild(timeTD)
        for(var j =0;j<row.length;j++)
        {
          var collumn=row[j]
          var td = document.createElement("td")
          td.className = "card";
          td.style.border = "none";
          if(collumn.hasOwnProperty('name'))
          {
            td.innerHTML=`<h3 class="cardtitle" style="color: ${collumn.clr}">
            <b>${collumn.name}</b>
            <\h3>
            <h5 class="carddesc">${collumn.co}</h5>`;
          }
          if(collumn.hasOwnProperty('yes')){
            td.style.border = "0px solid transparent";
            td.style.borderRightColor = collumn.clr;
            td.style.borderRightWidth = "2px";
            td.style.backgroundColor = "#EEEEEE";
            td.style.textAlign = "Right";
            //td.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
          }
          trow.appendChild(td)
        }
        this.table.appendChild(trow)
      }
    })
  }

}

window.customElements.define('time-table', Table);
