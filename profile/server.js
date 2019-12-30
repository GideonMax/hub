const express = require('express');
app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const admin = require('firebase-admin');
const FB = require('./FBKS');
const path = require('path')

app.set('view engine', 'ejs');

app.engine('ejs', ejs.renderFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.set('style', __dirname)
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(__dirname));
app.set('views', __dirname)
app.set('uploads', '../items/uploads')
// parse application/json
app.use(bodyParser.json())

app.get('/', indexPage);
app.get('/login', loginPage)

let FBKS = new FB(admin, require('./hubks-b0507-firebase-adminsdk-t8hxc-741d85cc26'), 'hubks-b0507');
async function indexPage(req, res){
  const teen = await fetchTeen(req.query.teen_name)
  const items = await fetchItems()
  if (!teen) res.status(200).render("home.ejs", {teen: null, items: null, error: 404})
  if (!teen['ID']) teen['ID'] = 'לא צוין'
  if (teen['school'] == '') teen['school'] = 'לא צוין'
  if (teen['mobilePhone'] == '') teen['mobilePhone'] = 'לא צוין'
  res.status(200).render("home.ejs", {teen: teen, error: 0, items: items})
}

async function fetchTeen(teen_name){
  return new Promise(resolve => setTimeout(() => {
    FBKS.readDBItems(`teens/${teen_name}`)
    .then((snapshot) => {
      resolve(snapshot.val())
    })
  }), 3000)
}

async function fetchItems() {
  return new Promise(resolve => setTimeout(() => {
    FBKS.readDBItems(`items`)
    .then((snapshot) => {
      resolve(snapshot.val())
    })
  }), 3000)
}

function loginPage(req, res) {

}

app.listen(3000)
