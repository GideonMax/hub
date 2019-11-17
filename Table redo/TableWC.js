class Table extends HTMLElement{
  const Places = ['1olam','2olam','3olam','maz','pnay','hub','sadna','pool'];
  const Times =['1700','1730','1800','1830','1900','1930','2000','2030'];
  static get obsrevedAttributes(){
    return ['day','normal'];
  }
  constructor(){
    super()
    this.shadow= this.attachShadow({mode:'open'})
    this.table = document.createElement("table")
    this.table.innerHTML = `
               <tr>
                    <th style="border-left-width:0;">אולם ראשון</th>
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
    this.shadow.appendChild(table)
  }
  connectedCallback(){
    $.post("/table.dat",{ day: this.getAttribute('day'), normal: this.hasAttribute('normal')  },(data,status)=>{
      var a =new Array(8);
      for(var i in data){

      }
    })
  }
}
