const express = require('express');
const app = express();
//var fs = require('fs');
var TableFirebase= require("../requires/TableFirebase.js");
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));

app.get("/admin",(req,res)=>{
  res.sendFile(__dirname+"/AdminTableChange.html");
});
app.get("/:name.js",(req,res)=>{
  res.sendFile(__dirname+"/js/"+req.params.name+".js");
});

app.get("/:name.html", (req, res) => {
  res.sendFile(__dirname + "/" + req.params.name + ".html");
});

app.get("/:name.css",(req,res)=>{
  res.sendFile(__dirname+"/css/"+req.params.name+".css");
});

app.get("/:name.svg",(req,res)=>{
  res.sendFile(__dirname+"/svg/"+req.params.name+".svg");
});

app.get("/:name.load",(req,res)=>{
  res.sendFile(__dirname+"/ajaxLoadForms/"+req.params.name+".html");
});

app.post("/remove.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.removeNormal(req.body.day);
  }
  else{
    var datestring = getRequestDate(req);
    TableFirebase.removeDate(datestring);
  }
  res.send("success");
});
app.post("/actAdd.post",(req,res)=>{
  let body=req.body;
  body.data.ParticipantAmount=0;
  if(req.body.normal==='true'){
    TableFirebase.editNormal(body.day,body.data.name,body.data);
  }
  else{
    var datestring = getRequestDate(req);
    TableFirebase.editDate(datestring,body.data.name,body.data);
  }
  res.send("success");
});
app.post("/actRemove.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.activityRemoveNormal(req.body.day,req.body.name);
  }else{
    var datestring = getRequestDate(req);
    TableFirebase.activityRemoveDate(datestring,req.body.name);
  }
  res.send("success");
});

app.post("/table.dat",(req,res)=>{
  var ret;
  if(req.body.normal==='true') {
    ret= TableFirebase.getNormal( req.body.day );
  }
  else
  {
    var datestring = getRequestDate(req);
    ret= TableFirebase.getDate(datestring);
  }
  ret.then(data=>res.json(data));
});
function getRequestDate(req){
  var rootDate= stringToDate(req.body.root);
  var date= new Date(rootDate.getTime()+ (parseInt(req.body.day)*1000*60*60*24) );
  return dateToString(date);
}
function stringToDate(str){
  var root= str.split("-");
  return new Date(root[2],root[1]-1,root[0]);
}
function dateToString(date){
  return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
}
app.get("/*",(req,res)=>{
  res.sendFile(__dirname+"/TableChange.html");
});
app.listen(3000);
