/* eslint-disable no-unused-vars */
import {Post}from './Post.js';
function load(name){
  document.getElementById("form").setAttribute("file",name);
}
function loadActRemove(){
  load("/actRemove.load");
}

function loadActAdd(){
  load("/actAdd.load");
}
function removeDay()
{
  var table=document.querySelector("#table_container time-table");
  Post("/remove.post",{ day: table.getAttribute('day'), normal: table.hasAttribute('normal')  })
    .then(res=>location.reload());
}
tableSize=70;