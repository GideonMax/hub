import {Post}from './Post.js';
function remove(){
  var name = document.querySelector("#name").value;
  var table=document.querySelector("#table_container time-table");
  var day = table.getAttribute("day")
  var normal = table.hasAttribute("normal")
  Post("/actRemove.post",{name:name,day:day,normal:normal})
  .then(res=>location.reload());
}
