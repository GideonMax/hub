


var serviceAccount = require("../data/fire.json");
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-40ac5.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('/');

var normal = ref.child("normal")
var special = ref.child("special")
module.exports ={
getdate:async function (date)
{
    var a = await module.exports.getbdate(date)
    if(a != null)
    {
      if(a=="empty")
      return {};
      return a;
    }
    else
    {
        var b = date.split("-")
        var c = new Date(parseInt(b[2]),parseInt(b[1])-1,parseInt(b[0]),1,1,1,1)
        var nor = await module.exports.getnormal(c.getDay())
        await module.exports.setdate(date,nor)
        return nor;
    }
},
getnormal:async function (day)
{
    var a = await normal.child(day).once('value',function(snapshot)
    {
        return snapshot
    });
    return JSON.parse(JSON.stringify(a))
},
removedate:function (date)
{
    special.child(date).set("empty")
},
deletedate:function(data){
  special.child(date).remove()
}
,
removenormal:function (date)
{
    normal.child(date).remove()
},
actremovenormal:async function (date,activity)
{
    normal.child(date).child(activity).remove();
},
actremovedate:async function (date,activity)
{
    var a = await module.exports.getbdate(date)
    if(a == null)
    {
        var b = date.split("-")
        var c = new Date(parseInt(b[2]),parseInt(b[1]),parseInt(b[0]),1,1,1,1)
        var nor = module.exports.getnormal(c.getDay())
        module.exports.setdate(date,nor)
    }
    module.exports.actremovebdate(date,activity)
},
editdate:async function (date,activity,value)
{
    var a = await module.exports.getbdate(date)
    if(a == null)
    {
        var b = date.split("-")
        var c = new Date(parseInt(b[2]),parseInt(b[1]),parseInt(b[0]),1,1,1,1)
        var nor = module.exports.getnormal(c.getDay())
        module.exports.setdate(date,nor)
    }
    module.exports.editbdate(date,activity,value)
},

//edit normal days
editnormal:function (day,activity,value)
{
    normal.child(day).child(activity).set(value)
},

//DON'T USE THESE, THEY ARE MADE FOR THE USE OF OTHER COMMANDS
getbdate:async function (date)
{
    var a = await special.child(date).once('value',function(snapshot)
    {
        return snapshot
    });
    return JSON.parse(JSON.stringify(a))
},
editbdate:function(date,activity,value)
{
    special.child(date).child(activity).set(value)
},
setdate:function (date,value)
{
    special.child(date).set(value)
},
setnormal:function (date,value)
{
    normal.child(date).set(value)
},
actremovebdate:function (date,activity)
{
    special.child(date).child(activity).remove()
}
}
