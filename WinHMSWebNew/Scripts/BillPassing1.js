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
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtTrnDate")) {
        document.getElementById('txtTrnDate').value = date;
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
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtBatchDt")) {
        document.getElementById('txtBatchDt').value = date;
        cal.callCloseHandler();
    }
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtTrnDate")) {
        document.getElementById('txtTrnDate').value = date;
        cal.callCloseHandler();
    }

    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "s")) {
        document.getElementById('s').value = date;
        cal.callCloseHandler();
    }

    var grd = document.getElementById('TabBillPassing_TabMain_grdBills');
    var el;

    if (grd != null) {
        for (var row = 1; row < grd.rows.length; row++) {

            el = document.getElementById(grd.rows[row].cells[1].getElementsByTagName("INPUT")[0].id)

            if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == el.id)) {
                cal.callCloseHandler();
                break;
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

function showCalExpDt(RwID, format, showsTime, showsOtherMonths) {
    //debugger;

    var RowID;
    var grd = document.getElementById('TabBillPassing_TabMain_grdBills');
    if (grd != null) {

        RowID = RwID.parentNode.parentNode;
        var RwIndex = RowID.rowIndex;

        var el = document.getElementById(grd.rows[RwIndex].cells[1].getElementsByTagName("INPUT")[0].id)

        if (_dynarch_popupCalendar != null) {
            _dynarch_popupCalendar.hide();
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
            _dynarch_popupCalendar = cal;
            cal.setRange(1900, 2070);
            cal.create();
        }
        _dynarch_popupCalendar.setDateFormat(format);
        _dynarch_popupCalendar.parseDate1(el.value);
        _dynarch_popupCalendar.sel = el;
        _dynarch_popupCalendar.showAtElement(el.nextSibling, "Br");

        return false;
    }
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

//Select Purchase No
function fnSelPurNo(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("hdnPurNo").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnPurOk');
    btn.click();
}

//Select Purchase No
function fnSelParty(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("GetPartyId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnPartyOk');
    btn.click();
}

//select Cost Center

function fnSelectCC(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("hdnCCId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnCCSrch');
    btn.click();
}

function fnSelAnlyCode(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("hdnAnlyCode").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnGlTcOK');
    btn.click();
}

function fnSelAnlySrch(GridId, rowIndex) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById("hdnASrchRId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnAlySrcOk');
    btn.click();
}

//Select Purchase No
function RowDatabindVal(GridId, rowIndex, HiddenId, buttonid) {
    // debugger;
    var grd = document.getElementById(GridId);

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#F0F0F0";
            document.getElementById(HiddenId).value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById(buttonid);
    btn.click();
}

function fnSelectAll(grdId, ChkId, CellID) {

    var grd = document.getElementById(grdId);
    var chk = document.getElementById(ChkId);

    for (var i = 0; i < grd.rows.length; i++) {
        if (chk.checked == true) {
            document.getElementById(grd.rows[i].cells[CellID].getElementsByTagName('input')[0].id).checked = true;
        }
        else {
            document.getElementById(grd.rows[i].cells[CellID].getElementsByTagName('input')[0].id).checked = false;
        }
    }
}


function fnChckSelect() {
    var ObjGrid = document.getElementById('grdRowsRecDet');
    var chk = document.getElementById('chkSelAll');
    
    if (ObjGrid != null) {
        for (var i = 1; i < ObjGrid.rows.length; i++) {
            if (chk.checked == true) {
                document.getElementById(ObjGrid.rows[i].cells[11].getElementsByTagName('INPUT')[0].id).checked = true;
            }
            else {
                document.getElementById(ObjGrid.rows[i].cells[11].getElementsByTagName('INPUT')[0].id).checked = false;
            }
        }
    }
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
        a.document.write('User Name : ' + compNm + '<br>');
        a.document.close();
        a.focus();
        a.print();
        a.close();
        return false;
    }
}

function validSingleChk(Indx) {
    //debugger;
    var grid = document.getElementById('grdFiscalYear');
    var selChk = document.getElementById(grid.rows[Indx].cells[3].getElementsByTagName('input')[0].id);

    for (var i = 0; i < grid.rows.length; i++) {
        if (i != Indx) {
            grid.rows[i].style.backgroundColor = "#ffffff";
            document.getElementById(grid.rows[i].cells[3].getElementsByTagName('input')[0].id).checked = false;
        }
        else {
            document.getElementById(grid.rows[i].cells[3].getElementsByTagName('input')[0].id).checked = true;
            grid.rows[i].style.backgroundColor = "Pink";
        }
    }
}

function IsNumericKey(evt) {
    var charcode = (evt.which) ? evt.which : event.keyCode;
    if (charcode > 31 && (charcode < 40 || charcode > 57))
        return false;
    return true;
}

function grdBillValidations() {
    //debugger;
    var grid = document.getElementById('TabBillPassing_TabMain_grdBills');
    if (grid.rows.length > 0) {
        for (var i = 0; i < grid.rows.length - 1; i++) {
            var BillNo = document.getElementById('TabBillPassing_TabMain_grdBills_txtBillNo_' + i).value;
            var BillDate = document.getElementById('TabBillPassing_TabMain_grdBills_txtBillDt_' + i).value;

            if (BillNo == '') {
                alert('BillNo Cannot be empty !')
                return false;
            }
            if (BillDate == '') {
                alert('Bill Date Cannot be empty !')
                return false;
            }
        }
    }
}

function Calculategrid() {
    //debugger;

    var grid = document.getElementById('TabBillPassing_TabMain_grdBills');
    var Purgrid = document.getElementById('TabBillPassing_TabMain_grdDrPurAc');

    var UnadjBillAmt = document.getElementById('TabBillPassing_TabMain_lblUnadjBillAmt').innerHTML;

    var inputs = grid.getElementsByTagName("input");
    var Total = 0;
    if (grid.rows.length > 0) {
        for (var i = 0; i < grid.rows.length - 1; i++) {
            var Amount = document.getElementById('TabBillPassing_TabMain_grdBills_txtBillAmt_' + i).value;
            if (Amount != '') {
                Total = parseFloat(Total) + parseFloat(Amount);
                document.getElementById('TabBillPassing_TabMain_grdBills_txtBillAmt_' + i).innerHTML = parseFloat(Amount).toFixed(2)
            }
            else {
                document.getElementById('TabBillPassing_TabMain_grdBills_txtBillAmt_' + i).innerHTML = parseFloat(Total).toFixed(2)
            }
        }
    }
    var TotBillAmt = Total;
    var DiffAmt = (parseFloat(Total).toFixed(2) - parseFloat(UnadjBillAmt).toFixed(2));
    //
    var Purinputs = Purgrid.getElementsByTagName("input");
    var PurTotal = 0;
    if (Purgrid.rows.length > 0) {
        for (var i = 0; i < Purgrid.rows.length; i++) {
            var Amount1 = document.getElementById('TabBillPassing_TabMain_grdDrPurAc_txtAccAmount_' + i).value;
            if (Amount1 != '') {
                PurTotal = parseFloat(PurTotal) + parseFloat(Amount1);
                document.getElementById('TabBillPassing_TabMain_grdDrPurAc_txtAccAmount_' + i).innerHTML = parseFloat(Amount1).toFixed(2);
                document.getElementById('TabBillPassing_TabMain_grdDrPurAc_txtAccAmount_' + i).value = parseFloat(Amount1).toFixed(2);
            }
            else {
                parseFloat(Total).toFixed(2);
            }
        }
    }
    //document.getElementById('TabBillPassing_TabMain_lbltotDifference').innerHTML = parseFloat(DiffAmt).toFixed(2);
    document.getElementById('TabBillPassing_TabMain_lblTotBillAmt').innerHTML = parseFloat(TotBillAmt).toFixed(2);
    document.getElementById('TabBillPassing_TabMain_lblOtherAdjAmt').innerHTML = parseFloat(PurTotal).toFixed(2);
    document.getElementById('TabBillPassing_TabMain_lbltotDifference').innerHTML = (parseFloat(DiffAmt) - parseFloat(PurTotal)).toFixed(2);
    document.getElementById('TabBillPassing_TabMain_lblDiffAmt').innerHTML = parseFloat(PurTotal).toFixed(2);
    document.getElementById("hdntotDifference").value = (parseFloat(DiffAmt) - parseFloat(PurTotal)).toFixed(2);
}

function fnTmpSelectAll() {
    var ObjGrid = document.getElementById('grdRPrintbill');
    var chk = document.getElementById('ChkAllSelect');

    if (ObjGrid != null) {
        for (var i = 0; i < ObjGrid.rows.length; i++) {
            if (chk.checked == true) {
                document.getElementById(ObjGrid.rows[i].cells[6].getElementsByTagName('INPUT')[0].id).checked = true;
            }
            else {
                document.getElementById(ObjGrid.rows[i].cells[6].getElementsByTagName('INPUT')[0].id).checked = false;
            }
        }
    }
}

function fnRecDetails(GridId, rowIndex) {
    debugger;

    var grd = document.getElementById('TabBillPassing_TabMain_grdDeRecipts');

    for (var i = 0; i < grd.rows.length; i++) {
        grd.rows[i].style.backgroundColor = "#fff";
        grd.rows[i].style.color = "#000";
    }

    for (var i = 0; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex].style.backgroundColor = "#55f7ffc4";

            document.getElementById("hdnDetRecNo").value = grd.rows[i].cells[2].innerText;
            document.getElementById("hdnDetStrId").value = grd.rows[i].cells[1].innerText;

            var btn = document.getElementById("TabBillPassing_TabMain_btnDetails");
            btn.disabled = false;
            break;
        }
    }
}



