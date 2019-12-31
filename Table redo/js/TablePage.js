function setDayDisplay(day) {
    var display = document.getElementById("currentDay")
    switch (day) {
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
var currentDay = new Date().getDay();
$(document).ready(() => {
    document.getElementById("day").value = currentDay;
    reloadTable()
})
function nextDay() {
    if (currentDay < 6) {
        currentDay++;
        document.getElementById("day").value = currentDay;
        reloadTable();
    }
}
function prevDay() {
    if (currentDay > 0) {
        currentDay--;
        document.getElementById("day").value = currentDay;
        reloadTable();
    }
}
function reloadTable() {
    $("#table_container").empty()
    var table = document.createElement("time-table")
    var day = currentDay;
    setDayDisplay(day);
    table.setAttribute("day", day)
    var normal = true
    if (normal) {
        table.setAttribute("normal", null)
    }
    document.getElementById("table_container").appendChild(table)
}