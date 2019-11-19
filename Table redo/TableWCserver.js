const express = require('express');
const app = express();
var fs = require('fs');
var TableFirebase= require("../requires/TableFirebase.js");
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));


app.get("/TableWC.js",(req,res)=>{
  res.sendFile(__dirname+"/TableWC.js");
})

app.get("/TableWC.css",(req,res)=>{
  res.sendFile(__dirname+"/TableWC.css")
})

app.post("/table.dat",async (req,res)=>{
  console.log("req.body");
  console.log(req.body);
  if(req.body.normal==='true') {
    console.log("normal");
    var ret= await TableFirebase.getnormal( req.body.day );
  }
  else
  {
    console.log("date");
    var date= new Date(Date.now()+ (parseInt(req.body.day)*1000*60*60*24) );
    var datestring = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    var ret= await TableFirebase.getdate(datestring);
  }
  console.log("ret");
  console.log(ret);
  res.send(ret);
})

app.get("/*",(req,res)=>{
  res.sendFile(__dirname+"/Table.html");
})
app.listen(3000)
