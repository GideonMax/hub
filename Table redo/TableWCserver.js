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
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    TableFirebase.removeDate(datestring);
  }
  res.send("success");
});
app.post("/actAdd.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.editNormal(req.body.day,req.body.data.name,req.body.data);

  }
  else{
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    TableFirebase.editDate(datestring,req.body.data.name,req.body.data);
  }
  res.send("success");
});
app.post("/actRemove.post",(req,res)=>{
  if(req.body.normal==='true'){
    TableFirebase.activityRemoveNormal(req.body.day,req.body.name);
  }else{
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
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
    var root= req.body.root.split("-");
    var rootDate= new Date(root[2],root[1]-1,root[0]);
    var date= new Date(rootDate.getTime()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    ret= TableFirebase.getDate(datestring);
  }
  ret.then(data=>res.json(data));
});

app.get("/*",(req,res)=>{
  res.sendFile(__dirname+"/TableChange.html");
});
app.listen(3000);
