function ShowSearch(id, no) {
  
    if (no == "0")
        document.getElementById(id).style.display = 'none';
    else
        document.getElementById(id).style.display = '';

    return false;
}
function fnLocNM(Nm,Tym_zone,utc_tym,loc_seq_no) {
   
    document.getElementById('txtLocName').value = Nm;
    document.getElementById('txtTymZone').value = Tym_zone;
    document.getElementById('txtUtcTym').value = utc_tym;
    document.getElementById('hdnLocseqno').value = loc_seq_no;
    document.getElementById('divlocNm').style.display = "none";
    var btn = document.getElementById('btnLoad');
    btn.click();
    return false;
}

function closeHandler(cal) {
    cal.hide();
    _dynarch_popupCalendar = null;
}
function showGridEndCal(id, format, showsTime, showsOtherMonths) {
    
    var split = id.split("_");
    if (id.startsWith("grdDSTSettings_imgfrmDt")) {
        var txtFrmDt = "";
        if (split.length > 1)

            txtFrmDt = split[0] + "_txtFrmDt_" + split[2];
        id = txtFrmDt;
    }
    if (id.startsWith("grdDSTSettings_imgToDt")) {
        var txtFrmDt = "";
        if (split.length > 1)

            txtFrmDt = split[0] + "_txtToDt_" + split[2];
        id = txtFrmDt;
    }

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

function selected(cal, date) {
    
    document.getElementById(cal.sel.id).value = date;
   

    if (cal.dateClicked && cal.sel.id.startsWith("grdDSTSettings_txtFrmDt_")) {
       
        var from = cal.sel.id;
        var to = "grdDSTSettings_txtToDt_" + cal.sel.id.split("_")[2]
        var FrmDt = document.getElementById(from).value;
        var toDt = document.getElementById(to).value;
       
        if (toDt != "") {
            if (toDt <= FrmDt) {
                document.getElementById("divMsgAlert").style.display = "block";
                document.getElementById("lblAlertPop").innerText = "From date must Less than and not equal to To Date"
                document.getElementById(from).value = "";

                //if (toDt < FrmDt) {
                //    document.getElementById("divMsgAlert").style.display = "block";
                //    document.getElementById("lblAlertPop").innerText = "Selected date must be less than To date"
                //    document.getElementById(from).value = "";
                //}
                //else {
                //    document.getElementById(from).value = date;
                //}
            }
            else {
                document.getElementById(from).value = date;
            }
            
        }
    }

       if (cal.dateClicked && cal.sel.id.startsWith("grdDSTSettings_txtToDt_")) {
          
            var to = cal.sel.id;
            var from = "grdDSTSettings_txtFrmDt_" + cal.sel.id.split("_")[2]
            var FrmDt = document.getElementById(from).value;
            var toDt = document.getElementById(to).value;
            
            if (FrmDt != "") {
                if(toDt <= FrmDt)
                {
                    document.getElementById("divMsgAlert").style.display = "block";
                    document.getElementById("lblAlertPop").innerText = "To date must greater than and not equal to From Date"
                    document.getElementById(to).value = "";
                    //if (toDt < FrmDt) {
                    //    document.getElementById("divMsgAlert").style.display = "block";
                    //    document.getElementById("lblAlertPop").innerText = "Selected date must be greater than From date"
                    //    document.getElementById(to).value = "";
                    //}
                    //else {
                    //    document.getElementById(to).value = date;
                    //}
                }

                else {
                    document.getElementById(to).value = date;
                }
               
            }

        }
    
}

function closeHandler(cal) {
    cal.hide();
    _dynarch_popupCalendar = null;
}
function fnHideAlertPop()
{
    document.getElementById('divMsgAlert').style.display = "none";
    document.getElementById("lblAlertPop").innerText = "";
    document.getElementById('divlocNm').style.display = "none";
}
function fnvalidtime(id)
{
    debugger;
    var time = document.getElementById(id).value;
    //var re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]|):[0-5][0-9]$/;
   var re = /^([\+-])([0-9]|0[0-9]|1[0-9]|2[0-3]|):[0-5][0-9]$/;
    if (re.test(time)) {
        
    }
    else {
        document.getElementById("divMsgAlert").style.display = "block";
        document.getElementById("lblAlertPop").innerText = "Time Should be in (+HH:MM) or (-HH:MM) format"
        document.getElementById(id).value = "";
    }
}

function fnCheckActive(id)
{
    debugger;
    var split = id.split("_");
  
    if (split.length > 1)
        var index = split[2];
           
    var chk = document.getElementById(id);
    if (chk.checked == true) {
        var grid = document.getElementById('grdDSTSettings');
        if (grid != null) {
            for (var i = 1; i < grid.rows.length; i++) {
                if (i != index) {
                    var chk1 = grid.rows[i].cells[3].getElementsByTagName('input')[0].checked;
                    if (chk1 == true)
                        grid.rows[index].cells[3].getElementsByTagName('input')[0].checked = false
                }
            }
        }
    }
}