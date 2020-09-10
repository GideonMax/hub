import { Post } from './Post.js';
const Places = ['pool', 'sadna', 'hub', 'pnay', 'maz', '3olam', '2olam', '1olam',];
const Times = ['1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030', '2100'];
class Table extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'width', 'height', 'day', 'normal', 'root'];
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/TableWC.css";
    this.shadow.appendChild(link);
    this.table = document.createElement("table");
    this.shadow.appendChild(this.table);
  }
  makeDateRequestData() {
    if (this.hasAttribute("normal")) {
      return {
        day: this.getAttribute("day"),
        normal: 'true'
      };
    }
    let root = "";
    if (this.hasAttribute("root")) {
      root = this.getAttribute("root");
    }
    else {
      var date = new Date();
      root = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }
    return {
      day: this.getAttribute("day"),
      root: root,
      normal: 'false'
    };
  }

  connectedCallback() {

    var size = this.getAttribute('size');
    this.table.style.fontSize = size;
    var width = this.getAttribute('width');
    var height = this.getAttribute('height');
    this.table.style.width = width;
    this.table.style.height = height;
    Post("/table.dat", this.makeDateRequestData())
      .then(res => res.json())
      .then(data => {
        let tableMatrix=ProcessActivitiesIntoTable(data);

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
               `;
        for (var i = 0; i < tableMatrix.length; i++) {
          var row = tableMatrix[i];
          var trow = document.createElement("tr");

          var timeTD = document.createElement("td");
          var time = Times[i];
          timeTD.innerText = time.slice(0, 2) + ":" + time.slice(2);
          trow.appendChild(timeTD);
          for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var td = document.createElement("td");
            td.className = "card";
            td.style.border = "none";
            if (cell.hasOwnProperty('name')) {
              td.innerHTML = `<h3 class="cardtitle" style="color: ${cell.clr}">
            <b>${cell.name}</b>
            </h3>
            <h5 class="carddesc">${cell.co}<br>${cell.amount}</h5>`;
            }
            if (cell.border) {
              td.style.border = "0px solid transparent";
              td.style.borderRightColor = cell.clr;
              td.style.borderRightWidth = "2px";
              td.style.backgroundColor = "#EEEEEE";
              td.style.textAlign = "Right";
              //td.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
            }
            trow.appendChild(td);
          }
          this.table.appendChild(trow);
        }

      });
  }

}
/**
 * 
 * @param {object} data
 * @returns {object[][]}
 */
function ProcessActivitiesIntoTable(data) {
  let tableMatrix = new Array(Places.length);
  for (var i = 0; i < tableMatrix.length; i++) {
    tableMatrix[i] = new Array(8);
    for (var j = 0; j < 8; j++) {
      tableMatrix[i][j] = { clr: "#000", border: false };//set all the table's cells to blank by default
    }
  }
  for (var k in data) {
    var act = data[k];//act is the description of an activity from the database
    tableMatrix[Times.indexOf(act.tstart)][Places.indexOf(act.place)] = { border: true, clr: act.clr, co: act.co, name: act.name, amount:data.ParticipantAmount };
    for (var t = Times.indexOf(act.tstart) + 1; t < Times.indexOf(act.tend); t++) {
      tableMatrix[t][Places.indexOf(act.place)] = { clr: act.clr, border: true };
    }
  }
  return tableMatrix;
}

window.customElements.define('time-table', Table);
