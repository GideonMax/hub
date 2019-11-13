const express = require('express');
const app = express();
var fs = require('fs');
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
let ejs = require('ejs')
const drinks =  require('../js_stats/stats_handler.js');
app.use(bodyPraser.urlencoded({ extended: true }));

var serviceAccount = require(__dirname+ "/fire.json");
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-40ac5.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('/');
app.get("/XChart.dat",function(req,res){
  var handler = new drinks.stats_handler('../js_stats/statTest')
  res.send({stat_values:handler.stats_ar ,stat_names: handler.ser_ar} )
})
app.get("/XChartWC.js",function(req,res){
  res.sendFile(__dirname+"/XChartWC.js")
})
app.get("/test.css",function(req,res){
  res.sendFile(__dirname+"/XChart.css")
})
app.get("/*",function(req,res){
  res.sendFile(__dirname+"/XChart.html")
})

/*
app.get("/barmen.dat",function(req,res){
  var c = new Date()

  barmen.child(day(Date.getDay())).once('value',(data)=>{
    res.send(data.val())
  })
})
*/
function day(da)
{
    if(da>6||da<0)return null;
    switch(da)
    {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}

app.listen(3000)
