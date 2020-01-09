
var isNormal = true;
var currentDay = new Date().getDay();
var rootDate = null;
$(document).ready(() => {
    document.getElementById("datediv").style.visibility = 'hidden';
    reloadTable()
})
/**
 * 
 * @param {string} datestr date in format DD-MM-YYYY, redundant zeros excluded, this is the format our programs use
 * @returns {string} date in format YYYY-MM-DD, includes redundant zeros, this is the format HTML uses
 */
function DateFormatToWire(datestr) {
    var date = stringToDate(datestr);
    var year = date.getFullYear();
    var month=""+(date.getMonth() + 1);
    if(month.length==1){
        month="0"+month
    }
    var day = ""+date.getDate();
    if(day.length==1){
        day="0"+day;
    }
    return year + "-" + month + "-" + day;
}
/**
 * 
 * @param {string} date date in format YYYY-MM-DD, includes redundant zeros, this is the format HTML uses
 * @returns {string} date in format DD-MM-YYYY, redundant zeros excluded, this is the format our programs use
 */
function DateFormatFromWire(date){
    var split = date.split("-");
    return parseInt(split[2])+"-"+parseInt(split[1])+"-"+split[0];
}
/**
 * 
 * @param {Date} date a standard Date object
 * @returns {string} a date in format DD-MM-YYYY
 */
function dateToString(date) {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}
/**
 * 
 * @param {string} datestr a date in format DD-MM-YYYY
 * @returns {Date} a standard Date object
 */
function stringToDate(datestr) {
    var split = datestr.split("-");
    return new Date(parseInt( split[2]), split[1] - 1,parseInt( split[0]));
}
/**
 * updates the display
 */
function setDayDisplay() {
    var display = document.getElementById("currentDay")
    if (isNormal) {
        switch (currentDay) {
            case 0:
                display.innerText = "יום ראשון"
                break
            case 1:
                display.innerText = "יום שני"
                break
            case 2:
                display.innerText = "יום שלישי"
                break
            case 3:
                display.innerText = "יום רביעי"
                break
            case 4:
                display.innerText = "יום חמישי"
                break
            case 5:
                display.innerText = "יום שישי"
                break
            case 6:
                display.innerText = "יום שבת"
                break
        }
    }
    else {

        if (rootDate == null) {
            var date = new Date();
        }
        else {
            var date = stringToDate(rootDate);
        }
        date = new Date(date.getTime() + currentDay * 1000 * 60 * 60 * 24);
        display.innerText = dateToString(date)
    }
}

function setRootDate() {
    rootDate = DateFormatFromWire(document.getElementById("rootDate").value);
    currentDay=0;
    setDayDisplay()
    reloadTable()
}
function switchType() {
    isNormal = !isNormal;
    if(isNormal){
        document.getElementById("tableType").innerText ="מערכת בלי שינויים";
        currentDay =new Date().getDay();
        document.getElementById("datediv").style.visibility ='hidden';
    }
    else{
        document.getElementById("tableType").innerText ="מערכת עם שינויים";
        currentDay =0;
        document.getElementById("datediv").style.visibility ='visible';
        var date = ((rootDate==null)? new Date():stringToDate(rootDate));
        date = new Date(date.getTime() + currentDay * 1000 * 60 * 60 * 24);
        document.getElementById("rootDate").setAttribute("value",DateFormatToWire(dateToString(date)));
    }
    setDayDisplay()
    reloadTable()
}


function nextDay() {
    if (!(isNormal && currentDay >= 6)) {
        currentDay++;
        reloadTable();
        setDayDisplay();
    }
    if(! isNormal){
        document.getElementById("rootDate").stepUp(1)
    }
}
function prevDay() {
    if (!(isNormal && currentDay <= 0)) {
        currentDay--;
        reloadTable();
        setDayDisplay();
    }
    if(! isNormal){
        document.getElementById("rootDate").stepDown(1)
    }
}
function reloadTable() {
    $("#table_container").empty()
    var table = document.createElement("time-table")
    table.setAttribute("day", currentDay)
    if (rootDate != null) {
        table.setAttribute("root", rootDate)
    }
    if (isNormal) {
        table.setAttribute("normal", null)
    }
    setDayDisplay();
    document.getElementById("table_container").appendChild(table)
}