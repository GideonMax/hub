const express = require('express');
const app = express();
//var fs = require('fs');
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
//let ejs = require('ejs')
const drinks =  require('../js_stats/stats_handler.js');
app.use(bodyPraser.urlencoded({ extended: true }));

app.post("/XChart.dat",function(req,res){
  var handler = new drinks.stats_handler('../data/'+req.body.folder);
  res.send({stat_values:handler.stats_ar ,stat_names: handler.ser_ar} );
});
app.get("/XChartWC.js",function(req,res){
  res.sendFile(__dirname+"/XChartWC.js");
});
app.get("/XChart.css",function(req,res){
  res.sendFile(__dirname+"/XChart.css");
});
app.get("/*",function(req,res){
  res.sendFile(__dirname+"/XChart.html");
});

/*
app.get("/barmen.dat",function(req,res){
  var c = new Date()

  barmen.child(day(Date.getDay())).once('value',(data)=>{
    res.send(data.val())
  })
})
*/

app.listen(3000);
