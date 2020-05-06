/* eslint-disable no-unused-vars */
import {Post}from './Post.js';
export function onLoad(){
  const Times =['1700','1730','1800','1830','1900','1930','2000','2030','2100'];
  for(var i of Times){
    var text=i.slice(0,2)+":"+i.slice(2);
    var option = "<option value=\""+i+"\">"+text+"</option>";
    document.getElementById("start_time").innerHTML+=option;
    document.getElementById("end_time").innerHTML+=option;
  }

}
/*
document.addEventListener("readystatechange", (event)=>{
  console.log("yes");
  const Times =['1700','1730','1800','1830','1900','1930','2000','2030','2100'];
  for(var k in Times){
    var i = Times[k];
    var text=i.slice(0,2)+":"+i.slice(2);
    var option = "<option value=\""+i+"\">"+text+"</option>";
    document.getElementById("start_time").append(option);
    document.getElementById("end_time").append(option);
  }

});*/
window.add=add;
function add(){
  var table=document.querySelector("#table_container time-table");
  var requestData=table.makeDateRequestData();
  var name = getVal("name");
  var co = getVal("co");
  var start_time= getVal("start_time");//#start_time
  var end_time=getVal("end_time");
  var clr = getVal("clr");
  var place = getVal("place");
  requestData.data={
    name:name,
    co:co,
    tstart:start_time,
    tend:end_time,
    clr:clr,
    place:place
  };
  Post("/actAdd.post",requestData)
    .then(()=>{
      // eslint-disable-next-line no-undef
      reloadTable();
      window.clearDiv();
    });
}

/**
 * 
 * @param {String} str 
 */
function getVal(str){
  return document.getElementById(str).value;
}