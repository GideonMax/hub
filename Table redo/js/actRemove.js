/* eslint-disable no-unused-vars */
import {Post}from './Post.js';
window.remove=remove;
function remove(){
  var table=document.querySelector("#table_container time-table");
  var requestData=table.makeDateRequestData();
  requestData.name = document.querySelector("#name").value;
  Post("/actRemove.post",requestData)
    .then(()=>{
    // eslint-disable-next-line no-undef
      reloadTable();
      window.clearDiv();
    });
}
