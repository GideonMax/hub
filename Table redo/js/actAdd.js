function add(){
  console.log("yes");
  var name = $("#name").val();
  var co = $("#co").val();
  var start_time= $("#start_time").val();
  var end_time=$("#end_time").val();
  var clr = $("#clr").val();
  var place = $("#place").val();
  var table=document.querySelector("#table_container time-table");
  var day = table.getAttribute("day")
  var normal = table.hasAttribute("normal")
  $.post("/actAdd.post",
  {
    day:day,
    normal:normal,
    data:{
    name:name,
    co:co,
    tstart:start_time,
    tend:end_time,
    clr:clr,
    place:place
    }
  },(data,status)=>{
  location.reload();
  })
}
