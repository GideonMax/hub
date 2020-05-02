let express = require('express')
let fs= require('fs')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
class stats_handler{
  /**
   * creates a new stat handler attached to a certain folder and loads the folder or initializes it if it does not exist
   * @param {String} folder the folder which will hold the stats 
   */
  constructor(folder)
  {
    this.folder=folder;
    this.stats_f=folder+"/stats.txt"
    this.ser_f=folder+"/serialization.txt"
    if(! fs.existsSync(folder))
    {
      fs.mkdirSync(folder)
      fs.writeFileSync(this.stats_f,"")
      fs.writeFileSync(this.ser_f,"[]")
    }
    this.load()
    this.save()
  }
  /**
   * saves the data on the handler to the folder.
   */
  save(){
    var typedArray=new Uint32Array(this.stats_ar);
    fs.writeFileSync(this.stats_f,typedArray);
    fs.writeFileSync(this.ser_f, JSON.stringify(this.ser_ar))
  }
  load(){
    var buffer=fs.readFileSync(this.stats_f);
    var a=[];
    for(var i=0;i<buffer.length;i+=4){
      a.push(buffer.readUInt32LE(i));
    }
    this.stats_ar=a;
    this.ser_ar= JSON.parse( fs.readFileSync(this.ser_f).toString());
  }
  /**
   * adds a new stat
   * @param {String} name 
   */
  add_stat(name)
  {
    this.ser_ar.push(name)
    this.stats_ar.push(0)
  }
  /**
   * gets a stat's value
   * @param {number|String} stat
   * @returns {number}
   */
  get(stat)
  {
    if(typeof stat == 'string')
    {
      stat=this.indexOf(stat);
    }
    return this.stats_ar[stat];
  }
  /**
   * sets a stat's value
   * @param {number|String} stat
   * @param {number} value 
   */
  set(stat,value)
  {
    if(typeof stat == 'string')
    {
      stat=this.indexOf(stat)
    }
    this.stats_ar[stat]=value
  }
  get all_stat_names(){
    return this.ser_ar;
  }
  /**
   * 
   * @param {number|String} stat 
   */
  remove(stat)
  {
    if(typeof stat == 'string')
    {
      stat=this.indexOf(stat)
    }
    this.ser_ar.splice(stat,1)
    this.stats_ar.splice(stat,1)
  }
  /**
   * 
   * @param {number|String} stat 
   * @param {number} amount 
   */
  increase(stat,amount)
  {
    if(typeof stat == 'string')
    {
      stat=this.indexOf(stat)
    }
    this.stats_ar[stat]+=amount
  }
  reset()
  {
    for(var i = 0;i<this.stats_ar.length;i++)
    {
      this.set(i,0)
    }
  }
  /**
   * 
   * @param {String} stat 
   */
  indexOf(stat)
  {
    return this.ser_ar.indexOf(stat)
  }
  DebugOutput()
  {
    var ret ="{\n";
    var length=this.stats_ar.length;
    for(let i =0;i<length-1;i++)
    {
      ret+=this.ser_ar[i]+": "+this.stats_ar[i]+",\n";
    }
    ret+=this.ser_ar[length-1]+": "+this.stats_ar[length-1]+",\n";
    ret+="}";
    return ret;
  }
  delete_folder(){
    fs.rmdir(this.folder,{recursive:true},(err)=>{

    })
  }
}
module.exports=stats_handler;