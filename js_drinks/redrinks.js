let fs = require('fs')


function get_stats_array(file)
{
  var file_text = fs.readFileSync(file).toString()
  var str_arr = file_text.split("\n")
  if(str_arr[str_arr.length-1] =="")str_arr.pop()
  var a =[]
  for(var i =0; i<str_arr.length; i++)
  {
    a.push( parseInt(  str_arr[i]))
  }
  return a
}

function set_stats_file(array,file)
{
  var a =[]
  for(var i =0;i<array.length;i++)
  {
    a.push("" + array[i])
  }
  var text = a.join('\n')
  fs.writeFileSync(file,text)
  return
}

function load_serialization(file)//this function returns an array of strings where an item's index is its serialization number (its name)
{
  return JSON.parse( fs.readFileSync(file).toString())
}

function save_serialization(i_serialization_number_array,file)
{
  fs.writeFileSync(file, JSON.stringify(i_serialization_number_array))
  return
}

function add_stat(name,serialization_array,stats_file)
{
  serialization_array.push(name)
  fs.appendFileSync(stats_file,"\n0")
  return serialization_array
}
