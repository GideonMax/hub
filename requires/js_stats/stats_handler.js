let express = require('express')
let fs= require('fs')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
class stats_handler{
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
  save()
  {
    var a =[]
    for(var i =0;i<this.stats_ar.length;i++)
    {
      a.push("" + this.stats_ar[i])
    }
    var text = a.join('\n')
    fs.writeFileSync(this.stats_f,text)
    fs.writeFileSync(this.ser_f, JSON.stringify(this.ser_ar))
  }
  load()
  {
    var file_text = fs.readFileSync(this.stats_f).toString()
    var str_arr = file_text.split("\n")
    if(str_arr[str_arr.length-1] =="")str_arr.pop()
    var a =[]
    for(var i =0; i<str_arr.length; i++)
    {
      a.push( parseInt(  str_arr[i]))
    }
    this.stats_ar =a
    this.ser_ar= JSON.parse( fs.readFileSync(this.ser_f).toString())
  }
  /**
   * 
   * @param {String} name 
   */
  add_stat(name)
  {
    this.ser_ar.push(name)
    this.stats_ar.push(0)
  }
  /**
   * 
   * @param {number|String} stat 
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
   * 
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