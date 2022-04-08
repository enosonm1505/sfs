var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var oldLink = null;
function DateAdd(vArg, vNum, vDate) {
    if (vArg == "d")
        numDate = AddDay(vNum, vDate);
    else if (vArg == "m")
        numDate = AddMonth(vNum, vDate);
    else
        numDate = AddYear(vNum, vDate);

    return numDate;
}
function AddDay(vNum, vDate) {
    var sp1 = vDate.split('/');
    var dy = sp1[0];
    var mn = sp1[1] - 1;
    var yr = sp1[2];
    var targetDate = new Date(yr, mn, dy);
    var numofins = DAY * vNum;
    var dateInMs = targetDate.getTime();

    dateInMs += numofins;
    targetDate.setTime(dateInMs);

    var dy1 = targetDate.getDate();
    var dm1 = targetDate.getMonth() + 1;
    var yr1 = targetDate.getFullYear();

    dy1 = dy1 + '';
    if (dy1.length < 2)
        dy1 = "0" + dy1;

    dm1 = dm1 + '';
    if (dm1.length < 2)
        dm1 = "0" + dm1;

    targetDate = dy1 + '/' + dm1 + '/' + yr1;

    return targetDate;
}
function AddMonth(vNum, vDate) {
    var sp1 = vDate.split('/');
    var dy = sp1[0];
    var mn = sp1[1] - 1;
    var yr = sp1[2];

    var targetDate = new Date(yr, parseInt(mn) + vNum, dy);
    var dateInMs = targetDate.getTime()

    targetDate.setTime(dateInMs);

    var dm1 = targetDate.getMonth() + 1;
    var yr1 = targetDate.getFullYear();

    dy = dy + '';

    if (dy.length < 2)
        dy = "0" + dy;

    dm1 = dm1 + '';

    if (dm1.length < 2)
        dm1 = "0" + dm1;

    targetDate = dy + '/' + dm1 + '/' + yr1;

    return targetDate;
}
function AddYear(vNum, vDate) {
    var sp1 = vDate.split('/');
    var dy = sp1[0];
    var mn = sp1[1];
    var yr = sp1[2];
    dy = dy + '';
    if (dy.length < 2)
        dy = "0" + dy;
    mn = mn + '';
    if (mn.length < 2)
        mn = "0" + mn;
    yr = parseInt(yr) + parseInt(vNum);
    targetDate = dy + '/' + mn + '/' + yr;

    return targetDate;
}
function DateDiff(vArg, vFrom, vTo) {
    if (vArg == "d")
        numDate = DiffDay(vFrom, vTo);
    else if (vArg == "m")
        numDate = DiffMonth(vFrom, vTo);
    else
        numDate = DiffYear(vFrom, vTo);

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
var oldLink = null;
function selected(cal, date) {
    //debugger;
    document.getElementById(cal.sel.id).value = date;

    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtEffectFrmDt"))
        cal.callCloseHandler();
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtSrcEffectFrmDt")) {
        cal.callCloseHandler();
        document.getElementById('imgSrcTaxstruct').click();
    }

    var currDt = document.getElementById("hdnAccDt").value;
    var FrmDt = document.getElementById("txtEffectFrmDt").value;
    
    if (cal.dateClicked && cal.sel.id == "txtEffectFrmDt") {
        var Dif = DateDiff("d", FrmDt, currDt);
        if (parseInt(Dif) > 0) {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Effective From date should not be less than account date - ' + currDt;
            document.getElementById('hdnFocus').value = '';

            //alert("Effective From date should not be less than account date - " + currDt);
            //document.getElementById("txtEffectFrmDt").value = currDt;
            return false;
        }
        var btn = document.getElementById('btnEffDt');
        btn.click();
    }
}
function closeHandler(cal) {
    cal.hide();
    _dynarch_popupCalendar = null;
}
function showCal(id, format, showsTime, showsOtherMonths) {
    //debugger;
    var el = document.getElementById(id);

    if (_dynarch_popupCalendar != null) {
        _dynarch_popupCalendar.hide();
    }
    else {
        var cal = new Calendar(1, null, selected, closeHandler);

        if (typeof showsTime == "string") {
            cal.showsTime = true;
            cal.time24 = (showsTime == "24");
        }
        if (showsOtherMonths)
            cal.showsOtherMonths = true;

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
//-----------grid search highlight------------
function Highlight(objTxt1, objGrd) {
    //debugger;
    var cntrlname = document.getElementById(objGrd);
    var Id = document.getElementById('txtSrcTaxId').value;
    var Name = document.getElementById('txtSrcTaxNm').value;
    var srchId;
    var srchName;
    var srchMobile;
    if (objTxt1 == 'txtSrcTaxId') {
        srchId = document.getElementById(objTxt1).value;
        if (Id != '')
            srchName = Name;
        else
            srchName = Name;
    }
    if (objTxt1 == 'txtSrcTaxNm') {
        srchName = document.getElementById(objTxt1).value;
        if (Name != '')
            srchId = Id;
        else
            srchId = Id;
    }
    var rows = cntrlname.getElementsByTagName("tr");
    var rowTop = 0;
    var FirstRow = rows[0];
    var loop;
    for (var loop = 0; loop < rows.length; loop++) {
        if (loop == 0)
            rows[loop].style.background = '';
        else
            rows[loop].style.background = '#fff';
    }
    if ((srchId != '') && (srchName == "")) {
        for (loop = 0; loop < rows.length; loop++) {
            var ok = 0;
            var cells = rows[loop].getElementsByTagName("td");
            for (i = 0; i < cells.length; i++) {
                if (cells[0].innerText.toLowerCase().startsWith(srchId.toLowerCase())) {
                    ok = 1;
                }
            }
            if (ok == 1) {
                CurrentRow = rows[loop];
                SendUp(CurrentRow, FirstRow);
                CurrentRow.style.background = '#FFD455';
            }
            else
                if (loop == 0)
                    rows[loop].style.background = '';
                else
                    rows[loop].style.background = '#fff';
        }
    }
    else if ((srchName != '') && (srchId == '')) {
        for (var loop = 0; loop < rows.length; loop++) {
            var ok = 0;
            var cells = rows[loop].getElementsByTagName("td");
            for (i = 0; i < cells.length; i++) {
                if (cells[1].innerText.toLowerCase().startsWith(srchName.toLowerCase())) {
                    ok = 1;
                }
            }
            if (ok == 1) {
                CurrentRow = rows[loop];
                SendUp(CurrentRow, FirstRow);
                CurrentRow.style.background = '#FFD455';
            }
            else
                if (loop == 0)
                    rows[loop].style.background = '';
                else
                    rows[loop].style.background = '#fff';
        }
    }
    else if ((srchId != '') && (srchName != '')) {
        for (var loop = 0; loop < rows.length; loop++) {
            var id1 = 0;
            var cells = rows[loop].getElementsByTagName("td");
            for (i = 0; i < cells.length; i++) {
                if ((cells[0].innerText.toLowerCase().startsWith(srchId.toLowerCase())) && (cells[1].innerText.toLowerCase().startsWith(srchName.toLowerCase()))) {
                    id1 = 1;
                }
            }
            if (id1 == 1) {
                CurrentRow = rows[loop];
                SendUp(CurrentRow, FirstRow);
                CurrentRow.style.background = '#FFD455';
            }
            else
                if (loop == 0)
                    rows[loop].style.background = '';
                else
                    rows[loop].style.background = '#fff';
        }
    }
}
function SendUp(CurrentRow, FirstRow) {
    FirstRow.parentNode.insertBefore(CurrentRow, FirstRow);
}
//====Decimal Point Validation===//

function validDecimal(e, txt, lmtBef, lmtAft) {
    //debugger;
    var txtVal = document.getElementById(txt);
    var keyCode = e.keyCode ? e.keyCode : e.which;

    var lmtUpto;

    switch (lmtBef) {// set limit (from value before decimal point)
        case 1: { lmtUpto = '10'; break; }
        case 2: { lmtUpto = '100'; break; }
        case 3: { lmtUpto = '1000'; break; }
        case 4: { lmtUpto = '10000'; break; }
        case 5: { lmtUpto = '100000'; break; }
        case 6: { lmtUpto = '1000000'; break; }
        case 7: { lmtUpto = '10000000'; break; }
    }

    if (keyCode > 31 && (keyCode < 48 || keyCode > 57) && keyCode != 46)// Exclude Special characters
        return false;
    else {
        var len = txtVal.value.length;
        var index = txtVal.value.indexOf('.');// Get the index of decimalpoint(.)

        if (index > 0 && keyCode == 46)// Exclude more than one decimal point
            return false;
        if (txtVal.value == '' && keyCode == 46)// Exclude decimal while field is null
            return false;

        if (index > 0) {// Allow values after decimal Point upto given Limit

            var curIndex = getCursorLocation(txtVal);// function to Get index of cursor
            var insertTxt = fnInsertTxtAtCurPos(txt, keyCode);// function Insert value(from keycode) at cursor Location

            if (curIndex <= index) {// Limits value before decimal Point(lmtBef)
                var chkStart = insertTxt.split('.')[0];
                if (chkStart > Number(lmtUpto))
                    return false;
            }
            else if (curIndex > index) {// Limits value after decimal Point(lmtAft)
                var chkEnd = insertTxt.split('.')[1];
                if (chkEnd.length > Number(lmtAft))
                    return false;
            }

            if (txtVal.value.split('.')[0].length <= Number(lmtBef) + 1 && txtVal.value.split('.')[0] <= Number(lmtUpto)
                && txtVal.value.split('.')[1].length < Number(lmtAft))
                return true;
            else if (txtVal.value.split('.')[0].length < Number(lmtBef) + 1 && txtVal.value.split('.')[0] <= Number(lmtUpto)
                && txtVal.value.split('.')[1].length == Number(lmtAft))
                return true;
            else
                return false;
        }
        else if (index == -1) {// Limits values before decimalPoint upto given Limit(w/o decimal point)
            var keyCodeval = txtVal.value + '' + String.fromCharCode(keyCode);

            if (keyCodeval > Number(lmtUpto))
                return false;

            if (txtVal.value.split('.')[0].length < Number(lmtBef) + 1 && txtVal.value.split('.')[0] < Number(lmtUpto) - 1)
                return true;
            else if (txtVal.value.split('.')[0].length < Number(lmtBef) + 1 && txtVal.value.split('.')[0] < Number(lmtUpto) && keyCode == 46)
                return true;
            else if (txtVal.value.split('.')[0].length <= Number(lmtBef) + 1 && txtVal.value.split('.')[0] <= Number(lmtUpto) && keyCode == 46)
                return true;
            else
                return false;
        }
    }
}
function getCursorLocation(txtbox) {//Function to get CursorLocation(i.e,Index)
    var locationIndex = 1;
    if (typeof txtbox.selectionStart == "number")
        locationIndex = txtbox.selectionStart;
    return locationIndex;
}
function fnInsertTxtAtCurPos(txt, keyCode) {// Function Insert value(from keycode) at cursor Location
    var txtVal = document.getElementById(txt);
    var curIndex = txtVal.selectionStart;

    var insertTxt = txtVal.value.slice(0, curIndex) + String.fromCharCode(keyCode) +
                            txtVal.value.slice(txtVal.selectionEnd);
    return insertTxt;
}
function fnAvoidDecAtLstPos(txt) {//funtion to avoid decimalpoint at last position
    //debugger;
    var txtBox = document.getElementById(txt);
    if (txtBox.value.indexOf('.') != -1) {
        if (txtBox.value.split('.')[1] == '')
            txtBox.value = txtBox.value.replace('.', '');
    }
}
//=======End Decimal Validation========//

//====Percentage Validation=====//

function validPercentage(e, txt) {
    //debugger;
    var txtVal = document.getElementById(txt);
    var keyCode = e.keyCode ? e.keyCode : e.which;

    if (keyCode > 31 && (keyCode < 48 || keyCode > 57) && keyCode != 46)// Exclude Special characters
        return false;
    else {
        var len = txtVal.value.length;
        var index = txtVal.value.indexOf('.');// Get the index of decimalpoint(.)

        if (index > 0 && keyCode == 46)// Exclude more than one decimal point
            return false;
        if (txtVal.value == '' && keyCode == 46)// Exclude decimal while field is null
            return false;

        if (index > 0) {// Allow values after decimal Point upto given Limit

            var curIndex = getCursorLocation(txtVal);// function to Get index of cursor
            var insertTxt = fnInsertTxtAtCurPos(txt, keyCode);// function Insert value(from keycode) at cursor Location

            if (curIndex <= index) {// Limits value before decimal Point
                var chkStart = insertTxt.split('.')[0];
                if (chkStart > 100)
                    return false;
                else if (chkStart == 100 && txtVal.value.split('.')[1].length == 2)
                    return false;
            }
            else if (curIndex > index) {// Limits value after decimal Point
                var chkEnd = insertTxt.split('.')[1];

                if (txtVal.value.split('.')[0] == 100 && keyCode != 48)
                    return false;
                if (chkEnd.length > 2)
                    return false;
            }

            if (txtVal.value.split('.')[0].length <= 3 && txtVal.value.split('.')[0] <= 100
                && txtVal.value.split('.')[1].length < 2)
                return true;
            else if (txtVal.value.split('.')[0].length < 3 && txtVal.value.split('.')[0] <= 100
                && txtVal.value.split('.')[1].length == 2)
                return true;
            else
                return false;
        }
        else if (index == -1) {// Limits values before decimalPoint upto given Limit(w/o decimal point)
            var keyCodeval = txtVal.value + '' + String.fromCharCode(keyCode);

            if (keyCodeval > 100)
                return false;
            if (keyCodeval == 100 && keyCode == 46)
                return false;

            if (txtVal.value.split('.')[0].length < 3 && txtVal.value.split('.')[0] < 99)
                return true;
            else if (txtVal.value.split('.')[0].length < 3 && txtVal.value.split('.')[0] < 100 && keyCode == 46)
                return true;
            else if (txtVal.value.split('.')[0].length <= 3 && txtVal.value.split('.')[0] <= 100 && keyCode == 46)
                return true;
            else
                return false;
        }
    }
}

function getCursorLocation(txtbox) {//Function to get CursorLocation(i.e,Index)
    var locationIndex = 1;
    if (typeof txtbox.selectionStart == "number")
        locationIndex = txtbox.selectionStart;
    return locationIndex;
}
function fnInsertTxtAtCurPos(txt, keyCode) {// Function Insert value(from keycode) at cursor Location
    var txtVal = document.getElementById(txt);
    var curIndex = txtVal.selectionStart;

    var insertTxt = txtVal.value.slice(0, curIndex) + String.fromCharCode(keyCode) +
                            txtVal.value.slice(txtVal.selectionEnd);
    return insertTxt;
}
function fnPercentOnblur(txt) {//funtion to put decimalpoint at last position on Percentage validation
    //debugger;
    var txtBox = document.getElementById(txt);
    if (txtBox.value != '' && Number(txtBox.value) < 100) {
        if (txtBox.value.split('.')[1] == '')
            txtBox.value = txtBox.value + '00';
        else if (txtBox.value.indexOf('.') == -1)
            txtBox.value = txtBox.value + '.00';
    }
    if (txtBox.value == '100.')
        txtBox.value = txtBox.value + '00';
}

//=====End % Validation=====//


function alphaNum(e) {
    //debugger;
    var keyCode = e.which ? e.which : e.keyCode;
    var alphaNum = /^[0-9a-zA-Z]+$/;

    var keyVal = String.fromCharCode(keyCode);
    if (keyVal.match(alphaNum)) {
        return true;
    }
    else
        return false;
}
function intOnlyChk(e) {
    var specialChar = new Array();
    specialChar.push(8);
    var keyCode = e.which ? e.which : e.keyCode;
    var ret = ((keyCode >= 48 && keyCode <= 58) || (specialChar.indexOf(keyCode) != -1))
    if (ret == false) {
        e.preventDefault();
        e.keyCode = 1;
    }
    return ret;
}
function chkDisp(chk, div) {
    if (document.getElementById(chk).checked == true)
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}
function validOndelete() {
    if (confirm('Are you sure want to delete.') == true)
        return true;
    else
        return false;
}
function taxStructClick() {
    document.getElementById('btnBindTaxStruct').click();
}
function Trim(nStr) { return nStr.replace(/(^\s*)|(\s*$)/g, ""); }
function encoding(val) {
    var res = val.replace("&nbsp;", "").replace("&#39;", "'").replace("&#39;", "'").replace("&quot;", '"').replace("&amp;", "&");
    return res;
}
function fnGridRowSelect(cellId0, cellId1, Grd) {//Grid Row Select
    //debugger;
    var Grid;
    Grid = document.getElementById(Grd);
    for (var i = 0; i < Grid.rows.length; i++) {
        //if (encoding(Grid.rows[i].cells[1].innerText) != "") {
        if ((encoding(Trim(Grid.rows[i].cells[0].innerText)) == encoding(Trim(cellId0))) && (encoding(Trim(Grid.rows[i].cells[1].innerText)) == encoding(Trim(cellId1)))) {
            Grid.rows[i].style.backgroundColor = 'rgba(151, 119, 17, 0.89)';
            Grid.rows[i].style.cursor = 'pointer';
        }
        else {
            Grid.rows[i].style.backgroundColor = "";
            Grid.rows[i].style.cursor = 'pointer';
        }
        //}
    }
}
function fnGridRowSelectTx(cellId0, cellId1, cellId2, Grd) {//Grid Row Select
    //debugger;
    var Grid;
    Grid = document.getElementById(Grd);
    for (var i = 0; i < Grid.rows.length; i++) {
        //if (encoding(Grid.rows[i].cells[1].innerText) != "") {
        if ((encoding(Trim(Grid.rows[i].cells[0].innerText)) == encoding(Trim(cellId0))) && (encoding(Trim(Grid.rows[i].cells[1].innerText)) == encoding(Trim(cellId1))) && (encoding(Trim(Grid.rows[i].cells[2].innerText)) == encoding(Trim(cellId2)))) {
            Grid.rows[i].style.backgroundColor = 'rgba(151, 119, 17, 0.89)';
            Grid.rows[i].style.cursor = 'pointer';
        }
        else {
            Grid.rows[i].style.backgroundColor = "";
            Grid.rows[i].style.cursor = 'pointer';
        }
        //}
    }
}
function bindTaxStruct(val0, val1, val2, val3, val4, val5, val6, val7) {
    debugger;
    var tabMode = document.getElementById('hdnTabMode');
    document.getElementById('txtTaxId').value = encoding(Trim(val0));
    document.getElementById('txtTaxNm').value = encoding(Trim(val1));

    if (tabMode.value == 'OPEN' || tabMode.value == 'VIEW' || tabMode.value == 'view') {
        document.getElementById('txtEffectFrmDt').value = encoding(Trim(val2));
        document.getElementById('hdnSrcEffectDt').value = encoding(Trim(val2));
    }
    else {
        document.getElementById('hdnSrcEffectDt').value = encoding(Trim(val2));
        document.getElementById('txtEffectFrmDt').value = '';
    }

    if (encoding(Trim(val3)) == 'true')
        document.getElementById('chkActive').checked = true;
    else
        document.getElementById('chkActive').checked = false;

    if (encoding(Trim(val4)) == 'true')
        document.getElementById('chkTaxInclAppl').checked = true;
    else
        document.getElementById('chkTaxInclAppl').checked = false;

    //if (encoding(Trim(val5)) == 'true')
    //    document.getElementById('chkApplBanq').checked = true;
    //else
    //    document.getElementById('chkApplBanq').checked = false;

    if (encoding(Trim(val6)) == 'true')
        document.getElementById('chkApplFoPos').checked = true;
    else
        document.getElementById('chkApplFoPos').checked = false;

    document.getElementById('hdnSlapId').value = encoding(Trim(val7));

    document.getElementById('btnBindTaxDet').click();
}
function bindTax(val0, val1) {
    //debugger;
    var Grid = document.getElementById('GrdTax');
    var Indx = document.getElementById('hdnRowIndx').value;

    document.getElementById("hdnRowPrevTaxId").value = document.getElementById(Grid.rows[Number(Indx) + 1].cells[1].getElementsByTagName('input')[0].id).value;

    document.getElementById(Grid.rows[Number(Indx) + 1].cells[1].getElementsByTagName('input')[0].id).value = encoding(Trim(val0));
    document.getElementById(Grid.rows[Number(Indx) + 1].cells[3].getElementsByTagName('input')[0].id).value = encoding(Trim(val1));

    if (Grid.rows.length > 1) {
        for (var i = 1; i < Grid.rows.length; i++) {
            if (i != Number(Indx) + 1) {
                if (document.getElementById(Grid.rows[i].cells[1].getElementsByTagName('input')[0].id).value == encoding(Trim(val0))) {
                    alert('Tax Id already Exists');
                    document.getElementById(Grid.rows[Number(Indx) + 1].cells[1].getElementsByTagName('input')[0].id).value = "";
                    document.getElementById(Grid.rows[Number(Indx) + 1].cells[3].getElementsByTagName('input')[0].id).value = "";

                    return false;
                }
            }
        }
    }
    document.getElementById('btnTaxPopClose').click();
}
function fnRowIndex(Indx) {
    //debugger;
    document.getElementById('hdnRowIndx').value = Indx;
}
//function validSingleChk(Indx) {
//    //debugger;
//    var grid = document.getElementById('GrdTax');
//    var selChk = document.getElementById(grid.rows[Indx].cells[10].getElementsByTagName('input')[0].id);
//    document.getElementById('hdnTaxSrNo').value = grid.rows[Indx].cells[0].innerText;
//    if (document.getElementById(grid.rows[Indx].cells[1].getElementsByTagName('input')[0].id).value == '') {
//        alert('Please select TaxId');
//        document.getElementById(grid.rows[Indx].cells[1].getElementsByTagName('input')[0].id).focus();
//        return false;
//    }
//    else if (document.getElementById(grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id).value == '') {
//        alert('Tax % cannot be empty.');
//        document.getElementById(grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id).focus();
//        return false;
//    }
//    else {
//        if (selChk.checked != false) {
//            for (var i = 1; i < grid.rows.length; i++) {
//                if (i != Indx) {
//                    document.getElementById(grid.rows[i].cells[10].getElementsByTagName('input')[0].id).checked = false;
//                }
//            }
//        }
//        else
//            selChk.checked = true;

//        document.getElementById('hdnChkInd').value = Indx;
//        document.getElementById('btnBindTaxVal').click();
//    }
//}

function validOnFocus1(Indx, id) {
    //debugger;
    document.getElementById('hdnCntrl').value = id;
    var grid = document.getElementById('GrdTax');
    var selChk = document.getElementById(grid.rows[Indx].cells[11].getElementsByTagName('input')[0].id);
    document.getElementById('hdnTaxSrNo').value = grid.rows[Indx].cells[0].innerText;

    document.getElementById('hdnFocus').value = grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id;

    document.getElementById('hdnChkInd').value = Indx;
    document.getElementById('btnBindTaxVal').click();

    return false;
}





function validOnFocus(Indx,id) {
    //debugger;
    document.getElementById('hdnCntrl').value =id;
    var grid = document.getElementById('GrdTax');
    var selChk = document.getElementById(grid.rows[Indx].cells[11].getElementsByTagName('input')[0].id);
    document.getElementById('hdnTaxSrNo').value = grid.rows[Indx].cells[0].innerText;
    if (document.getElementById(grid.rows[Indx].cells[1].getElementsByTagName('input')[0].id).value == '') {

        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Tax Id.';
        document.getElementById('hdnFocus').value = grid.rows[Indx].cells[1].getElementsByTagName('input')[0].id;

        //alert('Please select TaxId');
        //document.getElementById(grid.rows[Indx].cells[1].getElementsByTagName('input')[0].id).focus();
        return false;
    }
    else if (document.getElementById(grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id).value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Tax % cannot be empty.';
        document.getElementById('hdnFocus').value = grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id;
       
        //alert('Tax % cannot be empty.');
        //document.getElementById(grid.rows[Indx].cells[4].getElementsByTagName('input')[0].id).focus();
        return false;
    }
    else {
        for (var i = 1; i < grid.rows.length; i++) {
            if (i != Indx) {
                document.getElementById(grid.rows[i].cells[11].getElementsByTagName('input')[0].id).checked = false;
            }
            else
                document.getElementById(grid.rows[i].cells[11].getElementsByTagName('input')[0].id).checked = true;
        }
    }

    document.getElementById('hdnChkInd').value = Indx;
    document.getElementById('btnBindTaxVal').click();
}
function validAddNewTax() {
    //debugger;
    var Grid = document.getElementById('GrdTax');

    for (var i = 1; i < Grid.rows.length; i++) {
        var taxId = document.getElementById(Grid.rows[i].cells[1].getElementsByTagName('input')[0].id);
        var taxPerC = document.getElementById(Grid.rows[i].cells[4].getElementsByTagName('input')[0].id);
        var minTaxAmt = document.getElementById(Grid.rows[i].cells[5].getElementsByTagName('input')[0].id);
        var posCount = document.getElementById(Grid.rows[i].cells[6].getElementsByTagName('input')[0].id);
        var tblCompute = document.getElementById(Grid.rows[i].cells[9].getElementsByTagName('input')[0].id);

        if (taxId.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'TaxId cannot be empty.';
            document.getElementById('hdnFocus').value = Grid.rows[i].cells[1].getElementsByTagName('input')[0].id;

            //alert('TaxId should not be empty.');
            //document.getElementById(Grid.rows[i].cells[1].getElementsByTagName('input')[0].id).focus();
            return false;
        }
        else if (taxPerC.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'TaxId % cannot be empty.';
            document.getElementById('hdnFocus').value = Grid.rows[i].cells[4].getElementsByTagName('input')[0].id;

            //alert('Tax % should not be empty.');
            //document.getElementById(Grid.rows[i].cells[4].getElementsByTagName('input')[0].id).focus();
            return false;
        }
        //else if (minTaxAmt.value == '') {
        //    alert('Min Tax Amt should not be empty.');
        //    document.getElementById(Grid.rows[i].cells[5].getElementsByTagName('input')[0].id).focus();
        //    return false;
        //}
        //else if (posCount.value == '') {
        //    alert('In Pos Pax Count >= should not be empty.');
        //    document.getElementById(Grid.rows[i].cells[6].getElementsByTagName('input')[0].id).focus();
        //    return false;
        //}
        //else if (tblCompute.value == '') {
        //    alert('Fo Tables to be Compute should not be empty.');
        //    document.getElementById(Grid.rows[i].cells[9].getElementsByTagName('input')[0].id).focus();
        //    return false;
        //}
    }
    return true;
}
function validOnSave() {
    //debugger;
    var txtTaxId = document.getElementById('txtTaxId');
    var txtTaxNm = document.getElementById('txtTaxNm');
    var txtEffectFrmDt = document.getElementById('txtEffectFrmDt');

    if (txtTaxId.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'TaxId cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtTaxId';

        //alert('TaxId should not be empty.');
        //document.getElementById('txtTaxId').focus();
        return false;
    }
    else if (txtTaxNm.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'TaxName cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtTaxNm';

        //alert('TaxName should not be empty.');
        //document.getElementById('txtTaxNm').focus();
        return false;
    }
    else if (txtEffectFrmDt.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Effective Date cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtEffectFrmDt';

        //alert('Effective Date should not be empty.');
        //document.getElementById('txtEffectFrmDt').focus();
        return false;
    }
    var Grid = document.getElementById('GrdTax');
    if (Grid.rows.length == 2) {
        var taxId = document.getElementById(Grid.rows[1].cells[1].getElementsByTagName('input')[0].id);
        var taxPerC = document.getElementById(Grid.rows[1].cells[4].getElementsByTagName('input')[0].id);

        if (taxId.value != '') {
            if (taxPerC.value == '') {
                document.getElementById('divMsgAlert').style.display = 'block';
                document.getElementById('lblAlertPop').innerText = 'Tax % cannot be empty.';
                document.getElementById('hdnFocus').value = Grid.rows[1].cells[4].getElementsByTagName('input')[0].id;

                //alert('Tax % should not be empty.');
                //document.getElementById(Grid.rows[1].cells[4].getElementsByTagName('input')[0].id).focus();
                return false;
            }
        }
        else
            return true;
    }
    else {
        for (var i = 1; i < Grid.rows.length; i++) {
            var taxId = document.getElementById(Grid.rows[i].cells[1].getElementsByTagName('input')[0].id);
            var taxPerC = document.getElementById(Grid.rows[i].cells[4].getElementsByTagName('input')[0].id);
            var minTaxAmt = document.getElementById(Grid.rows[i].cells[5].getElementsByTagName('input')[0].id);
            var posCount = document.getElementById(Grid.rows[i].cells[6].getElementsByTagName('input')[0].id);
            var tblCompute = document.getElementById(Grid.rows[i].cells[9].getElementsByTagName('input')[0].id);

            if (taxId.value == '') {
                document.getElementById('divMsgAlert').style.display = 'block';
                document.getElementById('lblAlertPop').innerText = 'TaxId cannot be empty.';
                document.getElementById('hdnFocus').value = Grid.rows[i].cells[1].getElementsByTagName('input')[0].id;

                //alert('TaxId should not be empty.');
                //document.getElementById(Grid.rows[i].cells[1].getElementsByTagName('input')[0].id).focus();
                return false;
            }
            else if (taxPerC.value == '') {
                document.getElementById('divMsgAlert').style.display = 'block';
                document.getElementById('lblAlertPop').innerText = 'Tax % cannot be empty.';
                document.getElementById('hdnFocus').value = Grid.rows[i].cells[4].getElementsByTagName('input')[0].id;

                //alert('Tax % should not be empty.');
                //document.getElementById(Grid.rows[i].cells[4].getElementsByTagName('input')[0].id).focus();
                return false;
            }
            //else if (minTaxAmt.value == '') {
            //    alert('Min Tax Amt should not be emptfnAvoidDecAtLstPosy.');
            //    document.getElementById(Grid.rows[i].cells[5].getElementsByTagName('input')[0].id).focus();
            //    return false;
            //}
            //else if (posCount.value == '') {
            //    alert('In Pos Pax Count >= should not be empty.');
            //    document.getElementById(Grid.rows[i].cells[6].getElementsByTagName('input')[0].id).focus();
            //    return false;
            //}
            //else if (tblCompute.value == '') {
            //    alert('Fo Tables to be Compute should not be empty.');
            //    document.getElementById(Grid.rows[i].cells[9].getElementsByTagName('input')[0].id).focus();
            //    return false;
            //}
        }
    }

    return true;
}
function validOnNewRowSlap() {

    var txtTaxId=document.getElementById('txtTaxId');
    var ddlSlabTax = document.getElementById('ddlSlabTax').options[document.getElementById('ddlSlabTax').selectedIndex];
    var grid = document.getElementById('GrdSlab');

    if (txtTaxId.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Tax Id cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtTaxId';

        //alert('Tax Id cannot be empty.');
        //document.getElementById('txtTaxId').focus();
        return false;
    }
    else if (ddlSlabTax.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Slab Tax.';
        document.getElementById('hdnFocus').value = 'ddlSlabTax';

        //alert('Please select Slab Tax.');
        //document.getElementById('ddlSlabTax').focus();
        return false;
    }
    
    for (var i = 1; i < grid.rows.length; i++) {
        var txtToAmt = document.getElementById(grid.rows[i].cells[1].getElementsByTagName('input')[0].id);
        var txtTaxPer = document.getElementById(grid.rows[i].cells[2].getElementsByTagName('input')[0].id);

        if (txtToAmt.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'To Amount cannot be empty.';
            document.getElementById('hdnFocus').value = grid.rows[i].cells[1].getElementsByTagName('input')[0].id;

            //alert('To Amount cannot be empty.');
            //document.getElementById(grid.rows[i].cells[1].getElementsByTagName('input')[0].id).focus();
            return false;
        }
        else if (txtTaxPer.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Tax % cannot be empty.';
            document.getElementById('hdnFocus').value = grid.rows[i].cells[2].getElementsByTagName('input')[0].id;

            //alert('Tax % cannot be empty.');
            //document.getElementById(grid.rows[i].cells[2].getElementsByTagName('input')[0].id).focus();
            return false;
        }
    }
}

function fnCompFrmAmt(txt,index) {//Compare with From amount funtion to avoid decimalpoint at last position
    //debugger;
    var txtBox = document.getElementById(txt);
    var grid = document.getElementById('GrdSlab');

    if (txtBox.value.indexOf('.') != -1) {
        if (txtBox.value.split('.')[1] == '') {
            txtBox.value = txtBox.value.replace('.', '');
            return;
        }
    }

    var txtFrmAmt = document.getElementById(grid.rows[index].cells[0].getElementsByTagName('input')[0].id);

    if (txtBox.value != '') {
        if (Number(txtBox.value) < Number(txtFrmAmt.value)) {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'To Amount should be greater than From Amount.';
            document.getElementById('hdnFocus').value = txt;

            //alert('To Amount should be greater than From Amount.');
            //document.getElementById(txt).focus();
            return false;
        }
    }
}
function valOpenSlab() {

    var txtTaxId = document.getElementById('txtTaxId');
    var ddlSlabTax = document.getElementById('ddlSlabTax').options[document.getElementById('ddlSlabTax').selectedIndex];

    if (txtTaxId.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Tax Id cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtTaxId';

        //alert('Tax Id cannot be empty.');
        //document.getElementById('txtTaxId').focus();
        return false;
    }
    else if (ddlSlabTax.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Slab Tax.';
        document.getElementById('hdnFocus').value = 'ddlSlabTax';

        //alert('Please select Slab Tax..');
        //document.getElementById('ddlSlabTax').focus();
        return false;
    }
    else
        return true;
}

function validOnSaveSlap() {

    var txtTaxId = document.getElementById('txtTaxId');
    var ddlSlabTax = document.getElementById('ddlSlabTax').options[document.getElementById('ddlSlabTax').selectedIndex];
    var grid = document.getElementById('GrdSlab');
    var txtEffectFrmDt = document.getElementById('txtEffectFrmDt');

    if (txtTaxId.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Tax Id cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtTaxId';

        return false;
    }
    else if (ddlSlabTax.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Slab Tax.';
        document.getElementById('hdnFocus').value = 'ddlSlabTax';
        return false;
    }
    else if (txtEffectFrmDt.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Effective Date cannot be empty.';
        document.getElementById('hdnFocus').value = 'txtEffectFrmDt';
        return false;
    }

    for (var i = 1; i < grid.rows.length; i++) {
        var txtToAmt = document.getElementById(grid.rows[i].cells[1].getElementsByTagName('input')[0].id);
        var txtTaxPer = document.getElementById(grid.rows[i].cells[2].getElementsByTagName('input')[0].id);

        if (txtToAmt.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'To Amount cannot be empty.';
            document.getElementById('hdnFocus').value = grid.rows[i].cells[1].getElementsByTagName('input')[0].id;
            return false;
        }
        else if (txtTaxPer.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'TaxId % cannot be empty.';
            document.getElementById('hdnFocus').value = grid.rows[i].cells[2].getElementsByTagName('input')[0].id;
            return false;
        }
    }
}