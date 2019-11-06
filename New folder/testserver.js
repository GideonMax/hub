const express = require('express');
const app = express();
var fs = require('fs');
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
let ejs = require('ejs')
const drinks =  require('../js_drinks/drinks_class.js');
app.use(bodyPraser.urlencoded({ extended: true }));

var serviceAccount = require(__dirname+ "/fire.json");
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-40ac5.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('/');
app.get("/test.dat",function(req,res){
  var handler = new drinks.stats_handler(__dirname+"/drinks.txt",__dirname+"/serialization.txt")
  res.send({stat_values:handler.stats_ar ,stat_names: handler.ser_ar} )
})
app.get("/test.js",function(req,res){
  res.sendFile(__dirname+"/test.js")
})
app.get("/test.css",function(req,res){
  res.sendFile(__dirname+"/test.css")
})
app.get("/*",function(req,res){
  res.sendFile(__dirname+"/test.html")
})


app.get("/barmen.dat",function(req,res){
  barmen.once('value',(data=>{
    res.send(data.val())
  }))
})


app.listen(3000)
