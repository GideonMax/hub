var express=require("express");
var router=express.Router();
const stats_handler = require('./stats_handler.js');
const data_directory='./data/';
/**
 * @type {Object}
 */
var handlers={};
function get_handler(dir){
  /**
     * @type {stats_handler}
     */
  var a;
  if(handlers.hasOwnProperty(dir)){
    a=handlers[dir];
  }
  else{
    a=new stats_handler(data_directory+dir);
    handlers[dir]=a;
  }
  return a;
}

router.post("/directory/new",(req,res)=>{
  var a=new stats_handler(data_directory+req.body.dir);
  handlers[req.body.dir]=a;
  res.sendStatus(200);
});
// eslint-disable-next-line no-unused-vars
router.post("/stat/new",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.add_stat(req.body.name);
  a.save();
});
router.post("/stat/get",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  res.send({value:a.get(req.body.name)});
});
router.post("/stat/set",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.set(req.body.name,parseInt(req.body.value));
  a.save();
  res.sendStatus(200);
});
router.post("/stat/remove",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.remove(req.body.name);
  a.save();
  res.sendStatus(200);
});
router.post("/stat/increase",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.increase(req.body.name,parseInt(req.body.value));
  a.save();
  res.sendStatus(200);
});
router.post("/directory/reset",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.reset();
  a.save();
  res.sendStatus(200);
});
router.post("/directory/remove",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  a.delete_folder();
  res.sendStatus(200);
});
router.post("/directory/allNames",(req,res)=>{
  /**
     * @type {stats_handler}
     */
  var a=get_handler(req.body.dir);
  res.send(a.all_stat_names);
});
module.exports=router;