function remove(){
  var name = $("#name").val();
  var table=document.querySelector("#table_container time-table");
  var day = table.getAttribute("day")
  var normal = table.hasAttribute("normal")
  $.post("/actRemove.post",{name:name,day:day,normal:normal},(data,status)=>{
    location.reload();
  })
}
