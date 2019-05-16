let nodemailer = require("nodemailer")
let xl = require("exceljs")
let fs = require("fs")



function object_to_xlsx(obj,file) {
  let workbook = new xl.Workbook()
  let sheet = workbook.addWorksheet("main")
  for (var d=0;d< Object.keys(obj).length;d++ ) {
    var key = Object.keys(obj)[d]
    var row = [key]
    console.log(Object.keys(obj));
    console.log(key)
    for (var i=0;i< Object.keys( obj[key]).length ;i++) {
      var thing = Object.keys( obj[key])[i]
      row.push( thing + ": "+  obj[key][thing])
    }
    sheet.addRow(row)
  }
  workbook.xlsx.writeFile(file)
  return
}
async function mailfile(filep,filen,sendto,mail,password) {
  let dd ={
    service: 'gmail.com',
    auth: {
      user: mail,
      pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
  }
  console.log(dd);
  let tr= nodemailer.createTransport(dd)
  console.log("tr: \n"+tr);
  let today = new Date()
  let title = "" + today.getDate() +"/" + (today.getMonth()+1) + "/" + today.getFullYear() +""
  let message=
  {
    from: '"hub" <' + mail +'>',
    to: sendto,
    subject: title,
    text:'',
    attachments:
    [
      {
        filename: filen,
        path:filep
      }
    ]
  }
  console.log("message: "+message);
  let ad = await tr.sendMail(message, function(error, info){
  if (error) {
    console.log("error: \n"+error + "\n" + info)
  } else {
    console.log('Email sent: ' + info.response)
  }
})}
