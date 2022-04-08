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

   
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtAsonDt")) {
        document.getElementById('txtAsonDt').value = date;
        cal.callCloseHandler();
    }

    //var currDt = document.getElementById("hdnCurDt").value;
    //var ReqFrm = document.getElementById("hdnReqFrm").value;
    //if (ReqFrm == '1' || ReqFrm == '2')
    //    var FDt = document.getElementById("txtAsonDt").value;

    //if (ReqFrm == '1') {
    //    var Dif = DateDiff("d", currDt, FDt);
    //    if (cal.sel.id == "txtAsonDt") {
    //        if (cal.dateClicked && (cal.sel.id == "txtAsonDt")) {
    //            var btn = document.getElementById('btnView');
    //            if (parseInt(Dif) > 0) {
    //                document.getElementById("txtAsonDt").value = currDt;
    //                return false;
    //            }
    //            else {
    //                btn.click();
    //            }
    //        }
    //    }
    //}
    //else if (ReqFrm == '2') {
    //    var Dif = DateDiff("d", FDt, currDt);
    //    if (cal.sel.id == "txtAsonDt") {
    //        if (cal.dateClicked && (cal.sel.id == "txtAsonDt")) {
    //            var btn = document.getElementById('btnView');
    //            if (parseInt(Dif) > 0) {
    //                document.getElementById("txtAsonDt").value = currDt;
    //                btn.click();
    //                return false;
    //            }
    //            else {
    //                btn.click();
    //            }
    //        }
    //    }
    //}
    //else if (ReqFrm == '3') {
    //    var FrmDt = document.getElementById("txtFDate").value;
    //    var ToDt = document.getElementById("txtToDate").value;

    //    var dtDif = DateDiff("d", FrmDt, ToDt);

    //    if (cal.sel.id == "txtFDate") {
    //        if (cal.dateClicked && (cal.sel.id == "txtFDate")) {
    //            var Dif = DateDiff("d", currDt, FrmDt);
    //            if (parseInt(Dif) > 0) {
    //                document.getElementById('divMsgAlert').style.display = "";
    //                document.getElementById('lblAlertPop').innerText = 'From Date cannot be greater than current date';
    //                document.getElementById("txtFDate").value = currDt; //DateAdd("d", -1, currDt);
    //                return false;
    //            }
    //        }
    //    }
    //    if (cal.sel.id == "txtToDate") {
    //        if (cal.dateClicked && (cal.sel.id == "txtToDate")) {

    //            if (parseInt(dtDif) < 0) {
    //                document.getElementById('divMsgAlert').style.display = "";
    //                document.getElementById('lblAlertPop').innerText = 'To Date Can not be less than From Date';
    //                document.getElementById("txtToDate").value = currDt; //DateAdd("d", 1, fdt);
    //                return false;
    //            }

    //            Dif = DateDiff("d", currDt, ToDt);

    //            if (parseInt(Dif) > 0) {
    //                document.getElementById('divMsgAlert').style.display = "";
    //                document.getElementById('lblAlertPop').innerText = 'To date cannot be greater than Current date';
    //                document.getElementById("txtToDate").value = currDt;  //DateAdd("d", -1, currDt);
    //                return false;
    //            }
    //        }
    //    }
    //}
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


function fnRowClkColor(GridId, rowIndex) {
    var grd = document.getElementById(GridId);

    for (var i = 0; i < grd.rows.length; i++) {
        grd.rows[i].style.backgroundColor = "#fff";
        grd.rows[i].style.color = "#000";
    }
    for (var i = 0; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex].style.backgroundColor = '#FFD455';
            grd.rows[rowIndex].style.color = "#000";
            break;
        }
    }
}


function IsNumericKey(evt) {
    var charcode = (evt.which) ? evt.which : event.keyCode;
    if (charcode > 31 && (charcode < 40 || charcode > 57))
        return false;
    return true;
}


//Product Filter Item Select

function fnSelProduct(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("hdnProductId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnProdSel');
    btn.click();
}

function Calculategrid(RwIds) {
    //debugger;
    var lblWstamt = 0;
    var Total = 0;
    var Index = 0;

    var grid = document.getElementById('grdOpenStock');

    if (grid.rows.length > 0) {

        for (var i = 0; i < grid.rows.length - 1; i++) {
            var vyqty = 0; var Vval = 0;

            var Rate = document.getElementById('grdOpenStock_txtStkRate_' + i).value;
            var Qty= document.getElementById('grdOpenStock_txtStkQty_' + i).value;

            if (Qty!="" && Qty.toString() != '0.000')
                Vval = parseFloat(Qty * Rate).toFixed(2)
            else
                Vval = parseFloat(0).toFixed(2);

            if (Qty != "" && Qty.toString() != 'NaN')
                document.getElementById('grdOpenStock_txtStkRate_' + i).value = parseFloat(Rate).toFixed(6);
            else
                document.getElementById('grdOpenStock_txtStkRate_' + i).value = parseFloat(0).toFixed(6);

            if (Qty != "" && Qty.toString() != 'NaN')
                document.getElementById('grdOpenStock_txtStkQty_' + i).value = parseFloat(Qty).toFixed(2);
            else
                document.getElementById('grdOpenStock_txtStkQty_' + i).value = parseFloat(0).toFixed(2);

            document.getElementById('grdOpenStock_txtStkVal_' + i).value = parseFloat(Vval).toFixed(2);
            Total = parseFloat(Total) + parseFloat(Vval);
        }
        document.getElementById('txttotalStackval').value = parseFloat(Total).toFixed(2);
    }
}







