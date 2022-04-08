//Date Select
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
    //cal.sel.value = date;
    var currDt = document.getElementById("hdnCurDt").value;

    document.getElementById(cal.sel.id).value = date;
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtFDate")) {
        document.getElementById('txtFDate').value = date;
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtToDate")) {
        document.getElementById('txtToDate').value = date;
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtAsonDt")) {
        document.getElementById('txtAsonDt').value = date;
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtFrmDt")) {
        document.getElementById('txtFrmDt').value = date;
        var btn = document.getElementById('btnView');
        btn.click();
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtDeptDt")) {
        document.getElementById('txtDeptDt').value = date;
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txttoDt")) {
        document.getElementById('txttoDt').value = date;
        cal.callCloseHandler();
    }
    var currDt = document.getElementById("hdnCurDt").value;

    var ReqFrm = document.getElementById("hdnReqFrm").value;
    if (ReqFrm == '1' || ReqFrm == '2')
        var FDt = document.getElementById("txtAsonDt").value;

    if (ReqFrm == '1') {
        var Dif = DateDiff("d", currDt, FDt);
        if (cal.sel.id == "txtAsonDt") {
            if (cal.dateClicked && (cal.sel.id == "txtAsonDt")) {
                if (parseInt(Dif) > 0) {
                    document.getElementById("txtAsonDt").value = currDt;
                    return false;
                }
            }
        }
    }
    else if (ReqFrm == '2') {
        var Dif = DateDiff("d", FDt, currDt);
        if (cal.sel.id == "txtAsonDt") {
            if (cal.dateClicked && (cal.sel.id == "txtAsonDt")) {
                var btn = document.getElementById('btnView');
                if (parseInt(Dif) > 0) {
                    document.getElementById("txtAsonDt").value = currDt;
                    btn.click();
                    return false;
                }
                else {
                    btn.click();
                }
            }
        }
    }

    else if (ReqFrm == '3') {
        debugger;
        var FrmDt = document.getElementById("txtFDate").value;
        var ToDt = document.getElementById("txtToDate").value;

        var dtDif = DateDiff("d", FrmDt, ToDt);

        if (cal.sel.id == "txtFDate") {
            if (cal.dateClicked && (cal.sel.id == "txtFDate")) {
                var Dif = DateDiff("d", currDt, FrmDt);
                if (parseInt(Dif) > 0) {
                    document.getElementById('divMsgAlert').style.display = "";
                    document.getElementById('lblAlertPop').innerText = 'From Date cannot be greater than current date';
                    document.getElementById("txtFDate").value = currDt; //DateAdd("d", -1, currDt);
                    return false;
                }
            }
        }
        if (cal.sel.id == "txtToDate") {
            if (cal.dateClicked && (cal.sel.id == "txtToDate")) {

                if (parseInt(dtDif) < 0) {
                    document.getElementById('divMsgAlert').style.display = "";
                    document.getElementById('lblAlertPop').innerText = 'To Date Can not be less than From Date';
                    document.getElementById("txtToDate").value = currDt; //DateAdd("d", 1, fdt);
                    return false;
                }

                Dif = DateDiff("d", currDt, ToDt);

                if (parseInt(Dif) > 0) {
                    document.getElementById('divMsgAlert').style.display = "";
                    document.getElementById('lblAlertPop').innerText = 'To date cannot be greater than Current date';
                    document.getElementById("txtToDate").value = currDt;  //DateAdd("d", -1, currDt);
                    return false;
                }
            }
        }
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
    if (document.getElementById("pnlGrids") != null) {
        document.getElementById("pnlGrids").style.display = "none";
    }

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


//-------------------------------------

function fnSelGuest(rowIndex) {
    //debugger;
    var grd = document.getElementById('grdGuestDet');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#FFFAE3";
            document.getElementById("hdnGstId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnGSel');
    btn.click();
}

function fnSelChkoutGuest(rowIndex) {
    //debugger;
    var grd = document.getElementById('grdGuestDet');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#FFFAE3";
            document.getElementById("hdnGstId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnGSel');
    btn.click();
}

//Reservation List

function closePopUP(divID) {
    document.getElementById(divID).style.display = 'none';
    return;
}


//Print Script

function fnCallPrint(pnlGrid, Headers) {
    //debugger;
    var Cnt = 0;
    var currdtime = document.getElementById('hdnCurDt').value;
    //var PropNm = document.getElementById('lblPID').innerText;
    //var compNm = document.getElementById('lblUId').innerText;

    var grid = document.getElementById(pnlGrid);
    //var grid = document.getElementById('grdChkOutGstLdg');
    if (grid == null) {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'No data to print.';
        return false;
    }
    else if (grid.children.length != 0) {
        var a = window.open('', '', 'left =' + screen.width + ',top=' + screen.height + ',width=0,height=0,toolbar=0,scrollbars=0,status=0');
        a.document.write('<b><center>' + Headers + '</center></b><br>');
        a.document.write('Property Name: ' + document.getElementById('ddlProperty').value + '<br><br>');
        a.document.write(document.getElementById(pnlGrid).outerHTML);
        a.document.write('</br><table width="100%"><tr><td align="right"><b style="color:#666666">Print Date :&nbsp;</b>' + '<b>' + currdtime + '</b></td></tr></table>');
        a.document.close();
        a.focus();
        a.print();
        a.close();
        return false;
    }
}