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

function stat_file_increment_by_num(stat/*stats's number*/,file,serialization_number_array)
{
  if(! fs.existsSync(file) )
  {
    // initialize file as array of zeros if it does not exist
    var str = ""
    for(var i =1;i<serialization_number_array.length;i++)str+="0\n"
    str+="0"
    fs.writeFileSync(file,str)
  }

  var str_arr = get_stats_array(file) //convert file to array
  if(str_arr.length < serialization_number_array.length)
  {
    for(var idx = str_arr.length;idx<=serialization_number_array.length;idx++)str_arr.push("0")
  }
  if(str_arr.length > serialization_number_array.length)
  {
    console.error("the file has more values then there are registered products/statistics in the serialization array\nthis could be a result of removing an item from serialization array without removing the item's value from the text file\nif you still have access to the previous version of the serialization array, you should compare it to the new serialization array and remove the necessary lines\nif you don't have access to it, you should reinitiate the file by removing it\nif this bug is not the result of changing the serialization array but a result of changing the file, either change the serialization array to reflect the changes made to the file or revert the changes made to the file\nit is reccomended to use the given functions to make any changes");
    return
  }

  str_arr[product]++
  set_stats_file(str_arr,file)
  return
}

function set_stat_by_num(num,val,file)
{
  var a=get_stats_array(file)
  a[num]=val;
  set_stats_file(a,file)
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

function remove_stat_by_num(serial_number, serialization_array,stats_file)
{
    var file_text = fs.readFileSync(stats_file).toString()
    var str_arr = file_text.split("\n")
    str_arr.splice(serial_number,1)
    serialization_array.splice(serial_number,1)
    fs.writeFileSync(stats_file,str_arr.join("\n"))
    return serialization_array
}

function remove_stat_by_name(name, serialization_array,stats_file)
{
  for(var i = 0;i<serialization_array.length;i++)
  {
    if(serialization_array[i]==name)return remove_stat_by_num(i,serialization_array,stats_file)
  }
  console.error("there was no such item");
  return serialization_array
}

function get_stat_by_num(serial_number, stats_file)
{
  var file_text = fs.readFileSync(stats_file).toString()
  var str_arr = file_text.split("\n") //convert file to array
  return parseInt(str_arr[serial_number])
}
function get_stat_by_name(name, stats_file, serialization_array)
{
  if(! serialization_array.includes(name))return false
  return get_stat_by_num(serialization_array.indexOf(name),stats_file)
}
function add_stat(name,serialization_array,stats_file)
{
  serialization_array.push(name)
  fs.appendFileSync(stats_file,"\n0")
  return serialization_array
}
