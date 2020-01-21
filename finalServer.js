const express = require('express');
const app = express();
var fs = require('fs');
const bodyPraser = require('body-parser');
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
const drinks = require('./requires/js_stats/stats_handler.js');

app.get("/:name.wc", (req, res) => {
    res.sendFile(__dirname + "/WebComponents/" + req.params.name + ".js")
})

app.get("/:name.css", (req, res) => {
    res.sendFile(__dirname + "/css/" + req.params.name + ".css");
})

app.get("/:name.html", (req, res) => {
    res.sendFile(__dirname + "/html/" + req.params.name + ".html");
})

app.post("/XChart.dat", function (req, res) {
    var handler = new drinks.stats_handler('./data/' + req.body.folder)
    res.send({ stat_values: handler.stats_ar, stat_names: handler.ser_ar })
})

app.get("/:name.js", (req, res) => {
    res.sendFile(__dirname + "/js/" + req.params.name + ".js")
})

app.get("/:name.load", (req, res) => {
    res.sendFile(__dirname + "/load/" + req.params.name + ".html");
})

app.get("/*", (req, res) => {
    res.status(404)
})

app.listen(3000)