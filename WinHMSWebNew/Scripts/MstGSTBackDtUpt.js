function DateDiff(vArg, vFrom, vTo) {
    if (vArg == "d") {
        numDate = DiffDay(vFrom, vTo);

    }
    else if (vArg == "m") {
        numDate = DiffMonth(vFrom, vTo);
    }
    else {
        numDate = DiffYear(vFrom, vTo);
    }

    return numDate;
}
function DiffDay(vFrom, vTo) {
    fdt = vFrom;
    tdt = vTo;

    var day = 1000 * 60 * 60 * 24;

    var y = fdt.split("/");
    var z = tdt.split("/");

    var date2 = new Date(y[2], (y[1] - 1), y[0]);
    var date3 = new Date(z[2], (z[1] - 1), z[0]);

    var month2 = y[1] - 1;
    var month3 = z[1] - 1;

    var days2 = Math.ceil((date3.getTime() - date2.getTime()) / day);

    return days2;
}

function selected(cal, date) {

    document.getElementById(cal.sel.id).value = date;
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtDate")) {
        document.getElementById('txtDate').value = date;
        var btn = document.getElementById('btnDt');
        btn.click();
        closeHandler(cal);
    }
   }


var RetDbDate = function (str) {
    //debugger;
    var StrDt = new Date(str);
    var StYr = StrDt.getFullYear();
    var StMnth = StrDt.getMonth();
    var StDt = StrDt.getDate();

    if (StMnth < 12) {
        StMnth += 1;
    }

    if (StMnth < 10) {
        StMnth = "0" + StMnth;
    }

    if (StDt < 10) {
        StDt = "0" + StDt;
    }
    var DbDate = "";
    DbDate = StMnth + "/" + StDt + "/" + StYr;
    return DbDate;
}

function closeHandler(cal) {

    //debugger;
    cal.hide();
    window._dynarch_popupCalendar = null;
}

function showCal(id, format, showsTime, showsOtherMonths) {
    debugger;
    if (window._dynarch_popupCalendar != null) {
        window._dynarch_popupCalendar.hide();
    }
    else {
        var cal = new Calendar(1, null, selected, closeHandler);

        if (typeof showsTime == "string") {
            cal.showsTime = true;
            cal.time24 = (showsTime == "24");
        }
        if (showsOtherMonths) {
            cal.showsOtherMonths = true;
        }
        window._dynarch_popupCalendar = cal;
        cal.setRange(1900, 2070);
        cal.create();
    }
    //debugger;
    var el = document.getElementById(id);
    window._dynarch_popupCalendar.setDateFormat(format);
    window._dynarch_popupCalendar.parseDate1(el.value);
    window._dynarch_popupCalendar.sel = el;
    window._dynarch_popupCalendar.showAtElement(el, "Br");
    return false;
}
function onNumericonly(e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode > 31 && (keyCode < 48 || keyCode > 57) && keyCode != 46)// Exclude Special characters
        return false;
    else
        return true;
}