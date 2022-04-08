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


function fnselectProdId(rowIndex) {
    var grd = document.getElementById('grdprodsrch');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnProductId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnBindProd');
    btn.click();
}

function fnselectAccID(rowIndex) {
    // debugger;
    var grd = document.getElementById('grdAccSrch');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hfAccRowID").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnaccClose');
    btn.click();
}

function fnselectEXAccID(rowIndex) {
    var grd = document.getElementById('grdAccSrch');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hfAccExRowID").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnExAccClose');
    btn.click();
}

function validDdlchk(grd, rowIndex) {
    var gridView = document.getElementById(grd);
    var ddlFromUnit = gridView.rows[rowIndex].cells[0].getElementsByTagName('select')[0];
    for (var i = 1; i < gridView.rows.length; i++) {

        if (i != rowIndex) {
            if (ddlFromUnit.value == document.getElementById(gridView.rows[i].cells[0].getElementsByTagName('select')[0].id).value) {
                document.getElementById('divMsgAlert').style.display = "";
                document.getElementById('lblAlertPop').innerText = 'From Unit already selected.';
                document.getElementById(gridView.rows[rowIndex].cells[0].getElementsByTagName('select')[0].id).value = '';
                document.getElementById(gridView.rows[rowIndex].cells[0].getElementsByTagName('select')[0].id).focus();
                break;
            }
        }
    }
}

function validDecimal(e, txt, lmtBef, lmtAft) {
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
    var txtBox = document.getElementById(txt);
    if (txtBox.value.split('.')[1] == '')
        txtBox.value = txtBox.value.replace('.', '');
}

function onTextLengthVal(txtId, lng)
{
    var Value=txtId.value;
    if (Value.length > lng)
    {
        txtId.value = Value.substring(0,149);
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Description Length should not be greater than 150.';
        txtId.focus();
        return false;
    }
}