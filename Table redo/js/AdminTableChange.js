
import {Post}from './Post.js';
function load(name,hasScript){
  var form =document.getElementById("form");
  form.setAttribute("withScript",""+hasScript);
  form.setAttribute("file",name);
}
function clearDiv(){
  document.getElementById("form").clear();
}
function loadActRemove(){
  load("/actRemove",true);
}

function loadActAdd(){
  load("/actAdd",true);
}
function removeDay()
{
  /**
   * @var {Table}table
   */
  var table=document.querySelector("#table_container time-table");
  Post("/remove.post",table.makeDateRequestData())
    .then(()=>{
    // eslint-disable-next-line no-undef
      reloadTable();
      window.clearDiv();
    });
}
window.removeDay=removeDay;
window.loadActAdd=loadActAdd;
window.loadActRemove=loadActRemove;
window.clearDiv=clearDiv;
tableSize=70;