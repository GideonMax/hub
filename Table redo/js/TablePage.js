var isNormal = true;
var rootDate = null;
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


function dateToString(date) {
    return date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear();
}
function stringToDate(string) {
    var split = string.split("-");
    return new Date(split[2], split[1] - 1, split[0]);
}
function switchType() {
    isNormal = !isNormal;
    document.getElementById("tableType").innerText = (isNormal ? "מערכת בלי שינויים" : "מערכת עם שינויים");
    currentDay = (isNormal ? new Date().getDay() : 0)
    setDayDisplay()
    reloadTable()
}

var currentDay = new Date().getDay();
$(document).ready(() => {
    document.getElementById("day").value = currentDay;
    reloadTable()
})
function nextDay() {
    if(!(isNormal && currentDay>=6)){
        currentDay++;
        document.getElementById("day").value = currentDay;
        reloadTable();
        setDayDisplay();
    }
}
function prevDay() {
    if(!(isNormal && currentDay<=0)){
        currentDay--;
        document.getElementById("day").value = currentDay;
        reloadTable();
        setDayDisplay();
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