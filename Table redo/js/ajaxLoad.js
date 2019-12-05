function loadActRemove(){
  $("#form").load("/actRemove.load")
}
function removeDay()
{
  var table=document.querySelector("#table_container time-table");
  $.post("/remove.post",{ day: table.getAttribute('day'), normal: table.hasAttribute('normal')  }, (data,status)=>{

  })
}
function loadActAdd(){
  $("#form").load("/actAdd.load")
}
