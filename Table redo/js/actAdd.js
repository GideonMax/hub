import {Post}from './Post.js';
document.addEventListener("readystatechange", (event)=>{
  for(var k in Times){
    var i = Times[k]
    var text=i.slice(0,2)+":"+i.slice(2)
    var option = "<option value=\""+i+"\">"+text+"</option>"
    document.getElementById("start_time").appendChild(option);
    document.getElementById("end_time").appendChild(option);
  }

})

function add(){
  var name = getVal("name");
  var co = getVal("co");
  var start_time= getVal("start_time");//#start_time
  var end_time=getVal("end_time");
  var clr = getVal("clr");
  var place = getVal("place");
  var table=document.querySelector("#table_container time-table");
  var day = table.getAttribute("day")
  var normal = table.hasAttribute("normal")
  Post("/actAdd.post",
  {
    day:day,
    normal:normal,
    data:{
    name:name,
    co:co,
    tstart:start_time,
    tend:end_time,
    clr:clr,
    place:place
    }
  })
  .then(res=>location.reload());
}

/**
 * 
 * @param {String} str 
 */
function getVal(str){
  return document.getElementById(str).value;
}