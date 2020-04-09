const express = require('express');
const app = express();
var fs = require('fs');
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
const stats_handler = require('./requires/js_stats/stats_handler.js');
//var viewEngine =  require("./requires/textReplaceEngine.js").asyncReplaceEngine;
var ejs = require("ejs");
var stat_router=require("./requires/js_stats/stat_handler_router.js");


//app.engine('rpl',new viewEngine(null).replace);
app.engine('ejs',ejs.renderFile);
app.set('view-engine','ejs');
//app.set('view-engine','rpl');


app.get("/:name.wc", (req, res) => {
    res.sendFile(__dirname + "/WebComponents/" + req.params.name + ".js");
})

app.get("/:name.css", (req, res) => {
    res.sendFile(__dirname + "/css/" + req.params.name + ".css");
})

app.get("/:name.html", (req, res) => {
    res.sendFile(__dirname + "/html/" + req.params.name + ".html");
})

app.get("/:name.js", (req, res) => {
    res.sendFile(__dirname + "/js/" + req.params.name + ".js");
})

app.get("/:name.load", (req, res) => {
    res.sendFile(__dirname + "/load/" + req.params.name + ".html");
})


app.post("/XChart.dat", function (req, res) {
    var handler = new stats_handler('./data/' + req.body.folder);
    res.send({ stat_values: handler.stats_ar, stat_names: handler.ser_ar });
})
app.get("/ElementArrayTest.dat",(req,res)=>{
    res.send([{text:"test1"},{text:"test2"}]);
})

app.use("/stats",stat_router)

app.get("/*", (req, res) => {
    res.status(404);
})


app.listen(80);