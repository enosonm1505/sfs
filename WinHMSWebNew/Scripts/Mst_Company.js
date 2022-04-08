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

    if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "oth_txtVatRegDt"))
        cal.callCloseHandler();
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
//function valChkDisp(chk, div) {
//    var checkBox = document.getElementById(chk);

//    if (checkBox.checked == true) {
//        document.getElementById(div).style.display = 'block';
//        document.getElementById('oth_txtCaption').disabled=false;
//        document.getElementById('oth_txtNumber').disabled=true;
//    }
//    else
//        document.getElementById(div).style.display = 'none';
//}
function validEmail(txt) {
    var txtBox = document.getElementById(txt).value;
    if (txtBox != "") {
        var emailPat = /^(\".*\"|[A-Za-z]\w*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z]\w*(\.[A-Za-z]\w*)+)$/;
        var emailid = txtBox;
        var matchArray = emailid.match(emailPat);
        if (matchArray == null) {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Enter valid email.';
            
            document.getElementById('hdnFocus').value = txt;
           
            //alert("Enter valid email.");
            //document.getElementById(txt).focus();
            return false;
        }
    }
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
function alrtImgDelete() {//Confirmation to delete image
    //debugger;
    if (confirm('Are you sure want to remove image.') == true) {
        return true;
    }
    else {
        return false;
    }
}
function valfileOnchange() {
    document.getElementById('sett_txtPath').value = document.getElementById('sett_fupdApplPath').value;
}
function validOnSave() {
    var hdnCompId = document.getElementById('hdnCompId');

    var cmpNmRpt = document.getElementById('cmp_txtCompanyNmRpt');
    var cmpNm = document.getElementById('cmp_txtCompanyNm');
    var shrtNM = document.getElementById('cmp_txtShortNm');
    var ddlCurrency = document.getElementById('cmp_ddlCurrency').options[document.getElementById('cmp_ddlCurrency').selectedIndex];

    var txtAddress1 = document.getElementById('add_txtAddress1');
    var txtCity = document.getElementById('add_txtCity');
    var txtZipCode = document.getElementById('add_txtZipCode');
    var ddlCountry = document.getElementById('add_ddlCountry').options[document.getElementById('add_ddlCountry').selectedIndex];
    var txtemail = document.getElementById('add_txtEmail');
    var applnPath = document.getElementById('sett_txtPath');

    var valApplicable = document.getElementById('oth_chkVatAppl');

    if (cmpNmRpt.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Company Name for rerports cannot be empty.';
        document.getElementById('hdnFocus').value = 'cmp_txtCompanyNmRpt';

        //alert('Company Name for rerports should not be empty.');
        setTab(0);
        return false;
    }
    else if (cmpNm.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Company Name cannot be empty.';
        document.getElementById('hdnFocus').value = 'cmp_txtCompanyNm';

        //alert('Company Name should not be empty.');
        setTab(0);
        //document.getElementById('cmp_txtCompanyNm').focus();
        return false;
    }
    else if (shrtNM.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Short Name cannot be empty.';
        document.getElementById('hdnFocus').value = 'cmp_txtShortNm';

        //alert('Short Name should not be empty.');
        setTab(0);
        //document.getElementById('cmp_txtShortNm').focus();
        return false;
    }
    else if (ddlCurrency.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Currency.';
        document.getElementById('hdnFocus').value = 'cmp_ddlCurrency';

        //alert('Please select Currency.');
        setTab(0);
        //document.getElementById('cmp_ddlCurrency').focus();
        return false;
    }
    else if (txtAddress1.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Address cannot be empty.';
        document.getElementById('hdnFocus').value = 'add_txtAddress1';

        //alert('Address should not be empty.');
        setTab(1);
        //document.getElementById('add_txtAddress1').focus();
        return false;
    }
    else if (txtCity.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'City cannot be empty.';
        document.getElementById('hdnFocus').value = 'add_txtCity';

        //alert('City should not be empty.');
        setTab(1);
        document.getElementById('add_txtCity').focus();
        return false;
    }
    else if (txtZipCode.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'ZipCode cannot be empty.';
        document.getElementById('hdnFocus').value = 'add_txtZipCode';

        //alert('ZipCode should not be empty.');
        setTab(1);
        //document.getElementById('add_txtZipCode').focus();
        return false;
    }
    else if (ddlCountry.value == '') {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Select Country.';
        document.getElementById('hdnFocus').value = 'add_ddlCountry';

        //alert('Please select Country.');
        setTab(1);
        //document.getElementById('add_ddlCountry').focus();
        return false;
    }

    else if ((txtemail.value != "")) {
        debugger;
        var txtBox = document.getElementById('add_txtEmail').value;
        if (txtBox != "") {
            var emailPat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var emailid = txtBox;
            var matchArray = emailid.match(emailPat);
            if (matchArray == null) {
                document.getElementById('divMsgAlert').style.display = 'block';
                document.getElementById('lblAlertPop').innerText = 'Enter valid email.';

                document.getElementById('hdnFocus').value = 'add_txtEmail';

                //alert("Enter valid email.");
                //document.getElementById(txt).focus();
                return false;
            }
        }
    }
    else if(hdnCompId.value=='WS'){
        if (applnPath.value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Application cannot be empty.';
            document.getElementById('hdnFocus').value = 'sett_txtPath';

            //alert('Application should not be empty.');
            setTab(2);
            //document.getElementById('sett_txtPath').focus();
            return false;
        }
    }
    else if (valApplicable.checked == true) {

        if (document.getElementById('oth_txtCaption').value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Caption cannot be empty.';
            document.getElementById('hdnFocus').value = 'oth_txtCaption';

            //alert("Caption should not be empty.");
            setTab(3);
            //document.getElementById('oth_txtCaption').focus();
            return false;
        }
        else if (document.getElementById('oth_txtNumber').value == '') {
            document.getElementById('divMsgAlert').style.display = 'block';
            document.getElementById('lblAlertPop').innerText = 'Number cannot be empty.';
            document.getElementById('hdnFocus').value = 'oth_txtNumber';

            //alert("Number should not be empty.");
            setTab(3);
            //document.getElementById('oth_txtNumber').focus();
            return false;
        }
        
    

        else
            return true;
    }
    
    else
        return true;
}
function setTab(n) {
    var tabContainer = $find('tabMain');
    tabContainer.set_activeTab(tabContainer.get_tabs()[n]);
}

// added by monisha on 30/04/2017
function ShowSearch(id, no) {
    // debugger;
    if (no == "0")
        document.getElementById(id).style.display = 'none';
    else
        document.getElementById(id).style.display = '';

    return false;
}
function fntymZone(id, Nm, utc_tym, loc_seq_no) {
    debugger;
    document.getElementById('txtTymZone').value = utc_tym;
    document.getElementById('hdnLocseqno').value = loc_seq_no;
    document.getElementById('divTymZone').style.display = "none";
    return false;
}