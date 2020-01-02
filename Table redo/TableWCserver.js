const express = require('express');
const app = express();
var fs = require('fs');
var TableFirebase= require("../requires/TableFirebase.js");
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.get("/:name.js",(req,res)=>{
  res.sendFile(__dirname+"/js/"+req.params.name+".js")
})

app.get("/:name.css",(req,res)=>{
  res.sendFile(__dirname+"/css/"+req.params.name+".css")
})

app.get("/:name.load",(req,res)=>{
  res.sendFile(__dirname+"/ajaxLoadForms/"+req.params.name+".html")
})

app.post("/remove.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.removenormal(req.body.day)
  }
  else{
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    TableFirebase.removedate(datestring)
  }
  res.send("success")
})
app.post("/actAdd.post",(req,res)=>{
 if(req.body.normal==='true'){
   TableFirebase.editnormal(req.body.day,req.body.data.name,req.body.data)

 }
 else{
   var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
   var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
   TableFirebase.editdate(datestring,req.body.data.name,req.body.data)
 }
 res.send("success")
})
app.post("/actRemove.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.actremovenormal(req.body.day,req.body.name)
  }else{
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    TableFirebase.actremovedate(datestring,req.body.name)
  }
  res.send("success")
})

app.post("/table.dat",async (req,res)=>{
  if(req.body.normal==='true') {
    var ret= await TableFirebase.getnormal( req.body.day );
  }
  else
  {
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    var ret= await TableFirebase.getdate(datestring);
  }
  res.send(ret);
})

app.get("/*",(req,res)=>{
  res.sendFile(__dirname+"/TableChange.html");
})
app.listen(3000)
