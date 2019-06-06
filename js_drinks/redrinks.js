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
