function load(name){
    console.log(name);
    console.log(document.getElementById("form"));
    
    document.getElementById("form").setAttribute("file",name);
}
function loadActRemove(){
    load("/actRemove.load");
}

function loadActAdd(){
    load("/actAdd.load");
}
function removeDay()
{
  var table=document.querySelector("#table_container time-table");
  $.post("/remove.post",{ day: table.getAttribute('day'), normal: table.hasAttribute('normal')  }, (data,status)=>{
    location.reload();
  })
}