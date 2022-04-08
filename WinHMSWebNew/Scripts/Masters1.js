
//grd.rows[rowIndex - 1].style.backgroundColor = "rgb(57, 97, 182)";
//Common Scripts
function NumericValidation(eventObj) {
    var keycode;

    if (eventObj.keyCode) //For IE
        keycode = eventObj.keyCode;
    else if (eventObj.Which)
        keycode = eventObj.Which;  // For FireFox
    else
        keycode = eventObj.charCode; // Other Browser

    if (keycode != 8) //if the key is the backspace key
    {
        if (keycode < 48 || keycode > 57) //if not a number
            return false; // disable key press
        else
            return true; // enable key press
    }
}

function mathRoundForDecimal(Source) {
    var txtRate = document.getElementById(Source);
    var txt = txtRate.value;
    if (!isNaN(txt) && isFinite(txt) && txt.length != 0) {

        var decimal = Math.round(txt * 100) / 100;
        txtRate.value = decimal.toFixed(4);
    } else {
        txtRate.value = "0.0000";
    }
}

function selected(cal, date) {
    cal.sel.value = date;
    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "txtChkDate")) {
        document.getElementById('txtChkDate').value = date;
        cal.callCloseHandler();
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
};

function closeHandler(cal) {

    //debugger;
    cal.hide();
    window._dynarch_popupCalendar = null;
}

function showCal(id, format, showsTime, showsOtherMonths) {
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

//Common Row Click Color
function fnRowClkColor(GridId, rowIndex) {
    
    var grd = document.getElementById(GridId);

    for (var i = 0; i < grd.rows.length; i++) {
        grd.rows[i].style.backgroundColor = "#fff";
        grd.rows[i].style.color = "#000";
    }
    for (var i = 0; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex].style.backgroundColor = "rgba(238, 216, 126, 0.68)";
            grd.rows[rowIndex].style.color = "#000";
            break;
        }
    }
}

function PartyIdchk() {
    var btn = document.getElementById('Partyidck');
    btn.click();
}

function fnPrdSGrpIdchk() {
    var btn = document.getElementById('btnPSGId');
    btn.click();
}

function fnchkNatIds() {
    var btn = document.getElementById('btnNatId');
    btn.click();
}

function fnchkCatIds() {
    //debugger;
    var btn = document.getElementById('btnCatId');
    btn.click();
}

function fnProdIdchk() {
    var btn = document.getElementById('btnChkId');
    btn.click();
}

function fnMstProdIdchk() {
    //var btn = document.getElementById('btnChkId');
    //btn.click();
}

function fnSelectAccNM(rowIndex) {
    // debugger;
    var grd = document.getElementById('GVAccSrch');
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnDefAcID").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnGetAcc');
    btn.click();
}

function fnPartyNM() {
    var PartyNM = document.getElementById('txtpartyNM').value;
    if (PartyNM == "") {
        alert('Party Name cannot be empty');
        document.getElementById('txtpartyNM').focus();
        return false;
    }
}

function fnShortNM() {
    var ShrtNM = document.getElementById('txtShorNm').value;
    if (ShrtNM == "") {
        alert('Short Name cannot be empty');
        document.getElementById('txtShorNm').focus();
        return false;
    }
}

function mathRoundFor2Dec(Source) {
    var txtRate = document.getElementById(Source);
    var txt = txtRate.value;
    if (!isNaN(txt) && isFinite(txt) && txt.length != 0) {
        var decimal = Math.round(txt * 100) / 100;
        txtRate.value = decimal.toFixed(2);
    }
   
}

function fnCancel() {
    document.getElementById('divCitySrch').style.display = 'none';
    return false;
}

function fnSelParty(rowIndex) {
    // debugger;
    var grd = document.getElementById('GvPartySrch');

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnpartyId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnparty');
    btn.click();
}

function fnselectProdId(rowIndex) {
    // debugger;
    var grd = document.getElementById('gvprodsrch');

    //if (grd != null) {
    //    for (var i = 1; i < grd.rows.length; i++) {
    //        grd.rows[i].style.backgroundColor = "#E8E8E8";
    //    }
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnProductId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnCancel');
    btn.click();
}

function fnSelectCityRow(GvRowID, RtyID) {
    //  debugger;
    var grd = document.getElementById('gvCitypinSrch');
    for (var i = 1; i < grd.rows.length; i++) {
        grd.rows[i].style.backgroundColor = "#E8E8E8";
    }
    for (var i = 1; i < grd.rows.length; i++) {
        if (i == GvRowID) {
            grd.rows[GvRowID].style.backgroundColor = "#7F7FFF";
            //document.getElementById("hdnSrchProdID").value=grd.rows[GvRowID].cells[0].innerText  //Get RT-Ty
            document.getElementById("hdnCityRowID").value = GvRowID - 1;  //Get RT-Ty                  
            break;
        }
    }
    var btn = document.getElementById('btnCity');
    btn.click();
}

function fnSelCityRow(GvRowID, RtyID) {
    //debugger;
    var grd = document.getElementById('gvCitypinSrch');
    for (var i = 1; i < grd.rows.length; i++) {
        grd.rows[i].style.backgroundColor = "#E8E8E8";
    }
    for (var i = 1; i < grd.rows.length; i++) {
        if (i == GvRowID) {
            grd.rows[GvRowID].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnCityRowID").value = GvRowID - 1;  //Get RT-Ty                  
            break;
        }
        //var btn = document.getElementById('SupplyTabControl_TabAddress_btnCity');
        //btn.click();
    }
}

function fnSelCntry(GvRowID, RtyID) {
    //debugger;
    var grd = document.getElementById('gvCountry');
    //for (var i = 1; i < grd.rows.length; i++) {
    //     //grd.rows[i].style.backgroundColor = "#E8E8E8";
    // }
    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == GvRowID) {
            grd.rows[GvRowID - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnCntryId").value = GvRowID - 1;
            break;
        }
    }
    var btn = document.getElementById('btnCountry');
    btn.click();
}

//Product Masters
function fnProdNM() {
    var ProdNM = document.getElementById('txtProductNM').value;
    if (ProdNM == "") {
        alert('Product Name cannot be empty');
        document.getElementById('txtProductNM').focus();
        return false;
    }
}
function fnRemoveZoro() {
    //debugger;
    var Rate = document.getElementById('txtRate').value;

    if(Rate.indexOf('.')!=-1)
    {
        var Prefix = Rate.split('.')[0];
        document.getElementById('txtRate').value = Prefix;
    }
}
function fnRemoveZoro1(gridId,rowIndex) {
    //debugger;
    var Grid = document.getElementById(gridId);
    //var Rate = document.getElementById('GvConFact_txtConvFac_0').value;
    var Rate = document.getElementById(Grid.rows[rowIndex].cells[2].getElementsByTagName('input')[0].id).value;
    document.getElementById("hdnFactorRowID").value = rowIndex - 1;
    if (Rate.indexOf('.') != -1) {
        var Prefix = Rate.split('.')[0];
        document.getElementById(Grid.rows[rowIndex].cells[2].getElementsByTagName('input')[0].id).value = Prefix;
    }
}
function GridRoundoff(gridId, rowIndex) {
    var Grid = document.getElementById(gridId);
    var txt = document.getElementById(Grid.rows[rowIndex].cells[2].getElementsByTagName('input')[0].id).value;
    if (!isNaN(txt) && isFinite(txt) && txt.length != 0) {

        var decimal = Math.round(txt * 100) / 100;
        document.getElementById(Grid.rows[rowIndex].cells[2].getElementsByTagName('input')[0].id).value = decimal.toFixed(4);
    } else {
        document.getElementById(Grid.rows[rowIndex].cells[2].getElementsByTagName('input')[0].id).value = "0.0000";
    }
}
function fnSelUser(rowIndex) {
     //debugger;
    var grd = document.getElementById('GrdSinUser');

    for (var i = 0; i < grd.rows.length; i++) {
        if (i == rowIndex) {
            document.getElementById("hdnUserRowId").value = rowIndex;
            break;
        }
    }
    var btn = document.getElementById('btnCan');
    btn.click();
}

function fnSelectRev(rowIndex) {
    var grd = document.getElementById('GrdRevenue');

    for (var i = 1; i <= grd.rows.length; i++) {
        if (i == rowIndex) {
            grd.rows[rowIndex - 1].style.backgroundColor = "#7F7FFF";
            document.getElementById("hdnRevId").value = rowIndex - 1;
            break;
        }
    }
    var btn = document.getElementById('btnEdit');
    btn.click();
}

function TaxValidation() {
   debugger;
    var TaxNM = document.getElementById('txtTaxNm').value;
    var TaxShrtNM = document.getElementById('txtTaxShrtNM').value;
    var RevId = document.getElementById('txtRevenuNM').value;
    var SeqNo = document.getElementById('txtSeqNo').value;
    var CurMode = document.getElementById('CurrMode').value;
    var txtSacCode = document.getElementById('txtSacCode').value;
    var ChkSerChrg = document.getElementById('ChkSerChrg');
    var ChkTaxChrg = document.getElementById('ChkTaxChrg');
    var chkisGst = document.getElementById('chkisGst');
    var chkTarGsttax = document.getElementById('chkTarGsttax');
    var InGstInd = document.getElementById('hdnINGSTIND').value;

    if (CurMode == "New") {
        var TaxId = document.getElementById('txtTaxId').value;
        if (TaxId == "") {
            document.getElementById('divMsgAlert').style.display = "";
            document.getElementById('lblAlertPop').innerText = 'Tax Id Cannot be empty';
            document.getElementById('txtTaxId').focus();
            return false;
        }
    }
    else if (CurMode == "Open") {
        var ddlTaxId = document.getElementById('ddlTaxId').options[document.getElementById('ddlTaxId').selectedIndex];
        if (ddlTaxId.text == "") {
            document.getElementById('divMsgAlert').style.display = "";
            document.getElementById('lblAlertPop').innerText = 'Tax Id Cannot be empty';
            document.getElementById('ddlTaxId').focus();
            return false;
        }
    }
    if (TaxNM == "") {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Tax Name Cannot be empty';
        document.getElementById('txtTaxNm').focus();
        return false;
    }
    else if (TaxShrtNM == "") {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Tax Short Name Cannot be empty';
        document.getElementById('txtTaxShrtNM').focus();
        return false;
    }
    else if (RevId == "") {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Revenue Name Cannot be empty';
        document.getElementById('txtRevenuNM').focus();
        return false;
    }
    else if (SeqNo == "") {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Sequence No Cannot be empty';
        document.getElementById('txtSeqNo').focus();
        return false;
    }

    else if (chkisGst.checked == true && ChkTaxChrg.checked == true && ChkSerChrg.checked == true) {
            document.getElementById('divMsgAlert').style.display = "";
            document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
            document.getElementById('chkisGst').focus();
            return false;
    }
    else if (chkisGst.checked == true && ChkTaxChrg.checked == true && ChkSerChrg.checked == false) {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
        document.getElementById('chkisGst').focus();
        return false;
    }
    else if (chkisGst.checked == true && ChkTaxChrg.checked == false && ChkSerChrg.checked == true) {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
        document.getElementById('chkisGst').focus();
        return false;
    }

    else if (chkisGst.checked == false && ChkTaxChrg.checked == true && ChkSerChrg.checked == true) {
        document.getElementById('divMsgAlert').style.display = "";
        document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
        document.getElementById('chkisGst').focus();
        return false;
    }

    //else if (ChkSerChrg.checked == true) {

        //if (ChkTaxChrg.checked == true) {
        //    document.getElementById('divMsgAlert').style.display = "";
        //    document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
        //    document.getElementById('ChkTaxChrg').focus();
        //    return false;
        //}
        //else if (chkisGst.checked == true) {
        //    document.getElementById('divMsgAlert').style.display = "";
        //    document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
        //    document.getElementById('chkisGst').focus();
        //    return false;
        //}
        //else if (txtSacCode == "") {
    //    if (txtSacCode == "") {
    //        document.getElementById('divMsgAlert').style.display = "";
    //        document.getElementById('lblAlertPop').innerText = 'HSN Code Can not be empty';
    //        document.getElementById('txtSacCode').focus();
    //        return false;
    //    }

    
    //}
    //else if(ChkTaxChrg.checked == true)
    //{
    //    if(chkTarGsttax.checked == true)
    //    {
    //        document.getElementById('divMsgAlert').style.display = "";
    //        document.getElementById('lblAlertPop').innerText = 'Only one Tax Type is Allowed';
    //        document.getElementById('chkisGst').focus();
    //        return false;
    //    }
    //}
    //else if (chkTarGsttax.checked == true) {
    //    if(chkisGst.checked == true)
    //    {
    //        document.getElementById('divMsgAlert').style.display = "";
    //        document.getElementById('lblAlertPop').innerText = "Can't select both 'GST Tax' and 'Applicable for Target Tax'";
    //        document.getElementById('chkisGst').focus();
    //        return false;
    //    }
    //}

    //else if (chkisGst.checked == true) {

    //    var chkCGST = document.getElementById('chkCGST');
    //    var chksGST = document.getElementById('chksGST');
    //    var ChlIgst = document.getElementById('ChlIgst');
    //    var chkcess = document.getElementById('chkcess');

    //    if ((chkCGST.checked == false) && (chksGST.checked == false) && (ChlIgst.checked == false) && (chkcess.checked == false)) {
    //        document.getElementById('divMsgAlert').style.display = "";
    //        document.getElementById('lblAlertPop').innerText = 'Select One Tax Component';
    //        document.getElementById('chkisGst').focus();
    //        return false;
    //    }
    //}

    else if (InGstInd == "1" || InGstInd == "2") {
        if(chkisGst.checked == true && chkTarGsttax.checked == true)
        {
                    document.getElementById('divMsgAlert').style.display = "";
                    document.getElementById('lblAlertPop').innerText = "Can't select both 'GST Tax' and 'Applicable for Target Tax'";
                    document.getElementById('chkisGst').focus();
                    return false;
        }
        else if (chkisGst.checked == true) {

            var chkCGST = document.getElementById('chkCGST');
            var chksGST = document.getElementById('chksGST');
            var ChlIgst = document.getElementById('ChlIgst');
            var chkcess = document.getElementById('chkcess');

            if ((chkCGST.checked == false) && (chksGST.checked == false) && (ChlIgst.checked == false) && (chkcess.checked == false)) {
                document.getElementById('divMsgAlert').style.display = "";
                document.getElementById('lblAlertPop').innerText = 'Select One Tax Component';
                document.getElementById('chkisGst').focus();
                return false;
            }
        }
        else if (ChkSerChrg.checked == true) {
            if (txtSacCode == "") {
                document.getElementById('divMsgAlert').style.display = "";
                document.getElementById('lblAlertPop').innerText = 'HSN Code Can not be empty';
                document.getElementById('txtSacCode').focus();
                return false;
            }
        }
    }



}



