
$("#PendingBillGrid table").on("change", "td", function (e) {
    //debugger;
  
    debugger;
    var filter = $("#PendingBillGrid").data("kendoGrid").dataSource.filter()
    var allData = $("#PendingBillGrid").data("kendoGrid").dataSource.data();
    var query = new kendo.data.Query(allData);
    var filtereddata = query.filter(filter).data;
    var total = filtereddata.length;
    if (total != 0) {
        var no = (total - 1);
        var Amount1 = "0";
        var item = 0;
        for (; item < total; item++) {
            if (filtereddata[item].Select == true) {
                var value = filtereddata[item].AmountPop;
                var DC = filtereddata[item].DC;
                if (DC.toString().toLowerCase() == "DR")
                    value = (1 * value);
                else if (DC.toString().toUpperCase() == "CR")
                    value = ((-1) * value);


                Amount1 = Number(Amount1) + Number(value);
            }
        }
    }

    $("#AmountPopG").val(Number(Amount1).toFixed(2));


    //var total = grid.dataSource.data().length;
    //if (total != 0) {
    //    var no = (total - 1);
    //    var Amount1 = "0";
    //    var item = 0;
    //    for (; item < total; item++) {
    //        if (grid.dataSource._data[item].Select == true) {
    //            var value = grid.dataSource._data[item].AmountPop;
    //            var DC = grid.dataSource._data[item].DC;
    //            if (DC.toString().toLowerCase() == "DR")
    //                value = (1 * value);
    //            else if (DC.toString().toUpperCase() == "CR")
    //                value = ((-1) * value);

    //            Amount1 = Number(Amount1) + Number(value);
    //        }
    //    }
    //}

    //$("#AmountPopG").val(Number(Amount1).toFixed(2));
});
function HiddengridLoad() {
    if ($("#BTN_TYPE").val() == "OPEN") {
        
       
        var item1 = 0;
        var grid = $("#grid").data("kendoGrid");
        var grid3 = $("#HiddenGrid").data('kendoGrid');
        var grid4 = $("#openBillGrid").data('kendoGrid');
        var MainTotal = grid.dataSource.data().length;
        var total = grid3.dataSource.data().length;
        var total4 = grid4.dataSource.data().length;
        var item = 0;
        if ((total == 0 || total == "" || total == undefined) && $("#HIDDENGRIDLOAD").val() != "1") {
        
        for (; item1 < MainTotal; item1++) {
            var RowIndex = item1;
            item = 0;
            for (; item < total4; item++) {
                var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;

                var BillDate = grid4.dataSource._data[item].BillDate;                
                //BillDate.setHours(10, 40, 40, 000);               
                var Duedate = grid4.dataSource._data[item].Duedate;
              //  Duedate.setHours(10, 40, 40, 000);
                var Depit = grid4.dataSource._data[item].Depit;
                var Credit = grid4.dataSource._data[item].Credit;
                var ACC_ID = grid4.dataSource._data[item].AC_ID;
                var CBY = grid4.dataSource._data[item].CBY;
                var CDT = grid4.dataSource._data[item].CDT;
                var ADJBY = grid4.dataSource._data[item].ADJBY;
                var ADJDT = grid4.dataSource._data[item].ADJDT;
                
                if (RowIndex == ACC_ID) {
                    $("#HIDDENGRIDLOAD").val("1");
                    var dataSource2 = grid3.dataSource;
                    dataSource2.add({
                        ReferenceTypeName: ReferenceTypeName,
                        ReferenceName: ReferenceName,
                        BillDate: BillDate,
                        Duedate: Duedate,
                        Depit: Depit,
                        Credit: Credit,
                        AC_ID: RowIndex,
                        CBY: CBY,
                        CDT: CDT,
                        ADJBY: ADJBY,
                        ADJDT: ADJDT
                    });
                }



            }

            

        }
        }
    }
   
}
function dateMask() {
    $.unique($(".k-input")).each(function (key, value) {
        var val = $(this)[0].attributes["data-role"];
        if ($(this)[0].attributes["data-role"] != undefined) {
            if (val.nodeValue == "datepicker") {
                var _dateId = $(this);
                _dateId.kendoMaskedTextBox({
                    mask: "00/00/0000"
                });
            }
        }
    });
}

$("[name='Depit']").attr("min", "0");
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent;
var objbrowserName = navigator.appName;
var objfullVersion = '' + parseFloat(navigator.appVersion);
var objBrMajorVersion = parseInt(navigator.appVersion, 10);
var objOffsetName, objOffsetVersion, ix;
$("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
// $("#grid2").data("kendoGrid").refresh();
$("#ForeignCurrencyDIV").hide();
$("#HiddenGrid").hide();

function ReadyLoad() {
    $("#HIDDENGRIDLOAD").val("");
   dateMask();
var B_IND = $("#B_IND").val();
var dcval = $("#dcval").val();
var dropdownval = $("#dropdownval").val();
var DefaultCurrency = $("#DefaultCurrency").val();
var COMMON_NARR_APPL = $("#COMMON_NARR_APPL").val();
var VOUCH_NO_IND = $("#VOUCH_NO_IND").val();
var ReferenceNM = $("#ReferenceNM").val();


$("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
$("#PopDepitTotal").text(Number(0).toFixed(2));
$("#PopCreditTotal").text(Number(0).toFixed(2));
if (B_IND == 1) {
    $("#BankDeatil").show();
}
else {
    $("#BankDeatil").hide();
}
$("#Depit").attr('disabled', true);
$("#Credit").attr('disabled', true);
$("#AnalysisBalance").attr('disabled', true);
$("#AnalysisTotal").attr('disabled', true);
$("#ForeignCurrNM").attr('disabled', true);
$("#PURConvertRate").attr('disabled', true);
$("#SALEConvertRate").attr('disabled', true);
$("#BankNM").attr('disabled', true);
$("#BranchNM").attr('disabled', true);
$("#AmountPop").attr('disabled', true);
$("#ForeignCurrNMPOP").attr('disabled', true);
$("#ForeignCurrAmountPOP").attr('disabled', true);
$("#ConvertRatePOP").attr('disabled', true);
$("#PopupDepitTotal").attr('disabled', true);
$("#PopupCreditTotal").attr('disabled', true);
$("#GainLoss").attr('disabled', true);
$("#ForeginDiffAmount").attr('disabled', true);
//// START Transaction Date Load 
var dropdown = $("#DCHidden").val();
var grid = $("#grid").data("kendoGrid");

var TrnType = $("#Trantype").val();
$.ajax({
    type: "POST",
    url: "/GLTransaction/Date",
    data: "TrnType=" + TrnType,
    async: false,
    success: function (data) {
        if (data != null) {
            //$("#Date").val(data.d.TrasactionDate);???????????????????
            $("#Date").val(data.d);
        }
    }
});
$("#Purchase").show();
$("#Sale").hide();
$("#PURConvertRate").show();
$("#SALEConvertRate").hide();
$("#ForeignCurrencyDIV").hide();
$("#ConvertButton").val("Purchase");
//// END Transaction Date Load    
/// Default Row  
// maingridrowadd();----------------------------------------------------------------------
//Default Row
$("*").mouseenter(function (e) {
    e.stopPropagation();
})
//// START GRID Values SAVE function 
//  $("#SaveGridRow").one("click mouseenter", function (e){

//// END GRID Values SAVE function 
var Page = $("#Page").val();
if (Page == "2") {
    var Localstrval = localStorage.getItem("TRN_IDD");
    var TRN_IDD = ""; var DateVal = ""; var Narration = ""; var VouchNo = "";
    if (Localstrval != "" && Localstrval != null) {
        DateVal = localStorage.getItem("Date");
        localStorage.clear();
    }
    else { DateVal = window.opener.document.getElementById('Date').defaultValue; }
    $("#Date").val(DateVal);
    $("#Date").data("kendoDatePicker").value = DateVal;


  
}

}

//$(document).ready(function () {
//    dateMask();
//    var B_IND = $("#B_IND").val();
//    var dcval = $("#dcval").val();
//    var dropdownval = $("#dropdownval").val();
//    var DefaultCurrency = $("#DefaultCurrency").val();
//    var COMMON_NARR_APPL = $("#COMMON_NARR_APPL").val();
//    var VOUCH_NO_IND = $("#VOUCH_NO_IND").val();
//    var ReferenceNM = $("#ReferenceNM").val();


//    $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
//    $("#PopDepitTotal").text(Number(0).toFixed(2));
//    $("#PopCreditTotal").text(Number(0).toFixed(2));
//    if (B_IND == 1) {
//        $("#BankDeatil").show();
//    }
//    else {
//        $("#BankDeatil").hide();
//    }
//    $("#Depit").attr('disabled', true);
//    $("#Credit").attr('disabled', true);
//    $("#AnalysisBalance").attr('disabled', true);
//    $("#AnalysisTotal").attr('disabled', true);
//    $("#ForeignCurrNM").attr('disabled', true);
//    $("#PURConvertRate").attr('disabled', true);
//    $("#SALEConvertRate").attr('disabled', true);
//    $("#BankNM").attr('disabled', true);
//    $("#BranchNM").attr('disabled', true);
//    $("#AmountPop").attr('disabled', true);
//    $("#ForeignCurrNMPOP").attr('disabled', true);
//    $("#ForeignCurrAmountPOP").attr('disabled', true);
//    $("#ConvertRatePOP").attr('disabled', true);
//    $("#PopupDepitTotal").attr('disabled', true);
//    $("#PopupCreditTotal").attr('disabled', true);
//    $("#GainLoss").attr('disabled', true);
//    $("#ForeginDiffAmount").attr('disabled', true);
//    //// START Transaction Date Load 
//    var dropdown = $("#DCHidden").val();
//    var grid = $("#grid").data("kendoGrid");

//    var TrnType = $("#Trantype").val();
//    $.ajax({
//        type: "POST",
//        url: "/GLTransaction/Date",
//        data: "TrnType=" + TrnType,
//        async: false,
//        success: function (data) {
//            if (data != null) {
//                //$("#Date").val(data.d.TrasactionDate);???????????????????
//                $("#Date").val(data.d);
//            }
//        }
//    });
//    $("#Purchase").show();
//    $("#Sale").hide();
//    $("#PURConvertRate").show();
//    $("#SALEConvertRate").hide();
//    $("#ForeignCurrencyDIV").hide();
//    $("#ConvertButton").val("Purchase");
//    //// END Transaction Date Load    
//    /// Default Row  
//    // maingridrowadd();----------------------------------------------------------------------
//    //Default Row
//    $("*").mouseenter(function (e) {
//        e.stopPropagation();
//    })
//    //// START GRID Values SAVE function 
//    //  $("#SaveGridRow").one("click mouseenter", function (e){

//    //// END GRID Values SAVE function 
//    var Page = $("#Page").val();
//    if (Page == "2") {
//        var Localstrval = localStorage.getItem("TRN_IDD");
//        var TRN_IDD = ""; var DateVal = ""; var Narration = ""; var VouchNo = "";
//        if (Localstrval != "" && Localstrval != null) {
//            DateVal = localStorage.getItem("Date");
//            localStorage.clear();
//        }
//        else { DateVal = window.opener.document.getElementById('Date').defaultValue; }
//        $("#Date").val(DateVal);
//        $("#Date").data("kendoDatePicker").value = DateVal;
//    }

//});
var Trans = $("#Transfer");

function ValidationBill(e) {
    var grid = $("#grid").data('kendoGrid');
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var returnVal = 0;
    var grid2 = $("#HiddenGrid").data('kendoGrid');
    var dataSource2 = grid2.dataSource;
    var total2 = grid2.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }
    //S.Vijayalakshmi''5/6/20
    var grid3 = $("#openBillGrid").data('kendoGrid');
    var dataSource3 = grid3.dataSource;
    var total3 = grid3.dataSource.data().length;
    if (total3 == undefined) {
        total3 = 0;
    }
    //

    var item = 0;
    var item2 = 0;
    var TestVal = 0;
    var MainAC_NM = "";

        for (; item < total; item++) {
        if (grid.dataSource._data[item].BillDeatil_IND == 1) {
            item2 = 0;
                //total3==0 cond Added by S.VijayaLakshmi''5/6/20
                if (total != 0 && (total2 == 0 || total3==0)) {
                    TestVal = 1;
                }
           
            
            var DC = grid.dataSource._data[item].DC;
            var Amount = 0;
            var Amount2 = 0;
            if (DC == "DR") Amount = grid.dataSource._data[item].Depit;
            else Amount = grid.dataSource._data[item].Credit;

            if (total2 != 0) {
                $.each(grid2.dataSource._data, function (k, v) {
                if (grid.dataSource._data[item].RowIndexHiden == v.AC_ID) {
                    if (DC == "DR") {
                        if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                            Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + parseFloat(v.Depit.toString().replace(/,/g, ''));
                        else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                            if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Credit.toString().replace(/,/g, '')));
                            }
                        }
                    }
                    else {
                        if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                            Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Depit.toString().replace(/,/g, '')));
                        else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                            if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + (parseFloat(v.Credit.toString().replace(/,/g, '')));
                            }
                        }
                    }
                }
            });
            }
            else
            {
                $.each(grid3.dataSource._data, function (k, v) {
                    if (grid.dataSource._data[item].RowIndexHiden == v.AC_ID) {
                        if (DC == "DR") {
                            if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + parseFloat(v.Depit.toString().replace(/,/g, ''));
                            else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                                if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                    Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Credit.toString().replace(/,/g, '')));
                                }
                            }
                        }
                        else {
                            if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Depit.toString().replace(/,/g, '')));
                            else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                                if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                    Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + (parseFloat(v.Credit.toString().replace(/,/g, '')));
                                }
                            }
                        }
                    }
                });
            }
            
         


            //for (; item2 < total2; item2++) {
            //    if (grid.dataSource._data[item].RowIndexHiden == grid2.dataSource._data[item2].AC_ID) {
            //        if (DC == "DR") {
            //            if (grid2.dataSource._data[item2].Depit != "" && grid2.dataSource._data[item2].Depit != undefined) {
            //                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(grid2.dataSource._data[item2].Depit.toString().replace(/,/g, ''));
            //            }
            //        }
            //        else {
            //            if (grid2.dataSource._data[item2].Credit != "" && grid2.dataSource._data[item2].Credit != undefined) {
            //                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(grid2.dataSource._data[item2].Credit.toString().replace(/,/g, ''));
            //            }
            //        }
            //    }
            //}
            if (Amount != "" && Amount != undefined) {
                if (Number(Amount.toString().replace(/,/g, '')).toFixed(2) != Number(Amount2.toString().replace(/,/g, '')).toFixed(2)) {
                    returnVal = 1;
                }
            }
        }
            }


    
    return returnVal;
}

function ValidationBillReverse(e) {
    var grid = $("#grid").data('kendoGrid');
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var returnVal = 0;
    var grid2 = $("#HiddenGrid").data('kendoGrid');
    var dataSource2 = grid2.dataSource;
    var total2 = grid2.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }
    var item = 0;
    var item2 = 0;
    var TestVal = 0;
    var MainAC_NM = "";
    for (; item < total; item++) {
        if (grid.dataSource._data[item].BillDeatil_IND == 1) {
            item2 = 0;
            if (total != 0 && total2 == 0) {
                TestVal = 1;
            }
            var DC = grid.dataSource._data[item].DC;
            var Amount = 0;
            var Amount2 = 0;
            if (DC == "DR") Amount = grid.dataSource._data[item].Depit;
            else Amount = grid.dataSource._data[item].Credit;


            $.each(grid2.dataSource._data, function (k, v) {
                if (grid.dataSource._data[item].RowIndexHiden == v.AC_ID) {
                    if (DC == "CR") {
                        if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                            Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Depit.toString().replace(/,/g, '')));
                        else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                            if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + (parseFloat(v.Credit.toString().replace(/,/g, '')));
                            }
                        }
                    }
                    else {
                        if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                            Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + (parseFloat(v.Depit.toString().replace(/,/g, '')));
                        else if (v.Credit != "" && v.Credit != undefined && v.Credit != null) {
                            if (parseFloat(v.Credit.toString().replace(/,/g, '')) != 0) {
                                Amount2 = parseFloat(Amount2.toString().replace(/,/g, '')) + ((-1) * parseFloat(v.Credit.toString().replace(/,/g, '')));
                            }
                        }
                    }
                }
            });

            if (Amount != "" && Amount != undefined) {
                if (Number(Amount.toString().replace(/,/g, '')).toFixed(2) != Number(Amount2.toString().replace(/,/g, '')).toFixed(2)) {
                    returnVal = 1;
                }
            }
        }
    }
    return returnVal;
}

function fnTrnValidation() {
    var COMMON_NARR_APPL = $("#COMMON_NARR_APPL").val();
    var VOUCH_NO_IND = $("#VOUCH_NO_IND").val();
    var TranType = $("#Trantype").val();
    var TransDate = $("#Date").val();
    var TotalValue = $("#FinalDiffAMT").text();
    var CommonNarration = $("#CommonNarration").val();
    var VoucherNo = $("#VoucherNo").val();

    if (TranType == "") {
        $("#AlertMessageHdn").val("Please Select Transaction Type.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    if (TransDate == "") {
        $("#AlertMessageHdn").val("Please Select Transaction Date.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }

    var grid = $("#grid").data('kendoGrid');
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var no = (total - 1);
    var Values = grid.dataSource._data[no];

    if (Values.AC_NM == null || Values.AC_NM == "") {
        $("#AlertMessageHdn").val("Select Account Name .");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    if ((Values.Credit == null || Values.Credit == '') && (Values.Depit == null || Values.Depit == '')) {
        $("#AlertMessageHdn").val("Enter Credit or Debit.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    debugger;
    if ((VOUCH_NO_IND == 2 || VOUCH_NO_IND == 3) && VOUCH_NO_IND != undefined) {
        if (VoucherNo == "") {
            $("#AlertMessageHdn").val('Voucher Number Mandatory.');
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
        else if (VOUCH_NO_IND == 2 && VoucherNo != "")
        {
            var BTN_TYPE = $("#BTN_TYPE").val();
            var TRN_IDD = $("#TRN_IDD").val();
            var DivAPPLIND = $("#DivAPPLIND").val();
            var Division = $("#Division").val();
            
            var ChkVouch="";
            $.ajax({
                type: "POST",
                url: "/GLTransaction/VoucherNoValidate",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "VouchNo=" + VoucherNo + "&BTN_TYPE=" + BTN_TYPE + "&DivApplInd=" + DivAPPLIND + "&Division=" + Division + "&TrnId=" + TRN_IDD + "&TransId=" + TranType,
                success: function (data) {
                    if (data.d != "") {
                        $("#AlertMessageHdn").val("Voucher No already Exist.");
                        $("#alertType").val('fail');
                        AlertMesaage();
                        ChkVouch = "1";
                    }
                   
                }
            });
            if (ChkVouch == "1") return false;
        }
    }

    if (TotalValue == 0) {
        if (CommonNarration == "" && COMMON_NARR_APPL == "1") {
            $("#AlertMessageHdn").val('Common Narration Mandatory.');
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }

  

    return true;
}

function SaveGLTRNgrid(e) {
    debugger;
    if ($("#BTN_TYPE").val() == "OPEN") HiddengridLoad();
    var COMMON_NARR_APPL = $("#COMMON_NARR_APPL").val();
    var A1_Ind_V = $("#A1_Ind_V").val();
    var ApprAppl = $("#ApprAppl").val();
    var APP_User = $("#APP_User").val();
    var VocherApproval = "";
    var Vouchappsavests = $("#Vouchappsavests").val();
    if (Vouchappsavests == "0") {
        if (A1_Ind_V == "1" && ApprAppl == "1") {
            if (APP_User == "0") {
                VocherApproval = "F";
            }
        }
    }
    if (e==undefined) e="";
    var griddataGST = $("#GstGridHidden").data('kendoGrid').dataSource.data();
    var events = [];
    $.each(griddataGST, function (i, value) {
        var obj = {};
        obj["TaxCode"] = value.TaxCode;
        obj["TaxClass"] = value.TaxClass;
        obj["TaxAmount"] = value.TaxAmount;

        obj["ixTc1Per"] = value.ixTc1Per;
        obj["ixTc1Amt"] = value.ixTc1Amt;
        obj["ixTc1Cd"] = value.ixTc1Cd;
        obj["ixTc1vInd"] = value.ixTc1vInd;
        obj["ixTc2Per"] = value.ixTc2Per;
        obj["ixTc2Amt"] = value.ixTc2Amt;
        obj["ixTc2Cd"] = value.ixTc2Cd;
        obj["ixTc2vInd"] = value.ixTc2vInd;
        obj["ixTc3Per"] = value.ixTc3Per;
        obj["ixTc3Amt"] = value.ixTc3Amt;
        obj["ixTc3Cd"] = value.ixTc3Cd;
        obj["ixTc3vInd"] = value.ixTc3vInd;
        obj["ixTc4Per"] = value.ixTc4Per;
        obj["ixTc4Amt"] = value.ixTc4Amt;
        obj["ixTc4Cd"] = value.ixTc4Cd;
        obj["ixTc4vInd"] = value.ixTc4vInd;

        obj["SnoBill"] = value.SnoBill;
        obj["BillDate"] = value.BillDate;
        obj["AmountStr"] = value.AmountStr;
        obj["AC_CD"] = value.AC_CD;
        obj["AC_ID"] = value.AC_ID;
        obj["AC_NM"] = value.AC_NM;
        obj["A_IND_ID"] = value.A_IND_ID;
        obj["B_IND_ID"] = value.B_IND_ID;
        obj["C_IND_ID"] = value.C_IND_ID;
        obj["D_IND_ID"] = value.D_IND_ID;
        obj["E_IND_ID"] = value.E_IND_ID;
        obj["F_IND_ID"] = value.F_IND_ID;
        obj["F_IND_VAl"] = value.F_IND_VAl;
        obj["L_IND_ID"] = value.L_IND_ID;
        obj["L_IND_VAl"] = value.L_IND_VAl;
        obj["M_IND_ID"] = value.M_IND_ID;
        obj["N_IND_ID"] = value.N_IND_ID;
        obj["O_IND_ID"] = value.O_IND_ID;
        obj["A_IND_VAl"] = value.A_IND_VAl;
        obj["B_IND_VAl"] = value.B_IND_VAl;
        obj["C_IND_VAl"] = value.C_IND_VAl;
        obj["D_IND_VAl"] = value.D_IND_VAl;

        obj["INP_TY"] = value.INP_TY;
        obj["PARTY_TY"] = value.PARTY_TY;
        obj["PTX_RG_No"] = value.PTX_RG_No;
        obj["PTX_ST_CD"] = value.PTX_ST_CD;
        obj["PTX_RG_Ty"] = value.PTX_RG_Ty;
        obj["TX_RG_CD"] = value.TX_RG_CD;
        obj["GTRN_TY"] = value.GTRN_TY;
        obj["GINV_TY"] = value.GINV_TY;

        obj["TRN_ID_SRNO"] = value.TRN_ID_SRNO;
        obj["BRN_NO"] = value.BRN_NO;
        obj["TAN_No"] = value.TAN_No;
        obj["Sup_Cat"] = value.Sup_Cat;
        obj["EXEMP_IND"] = value.EXEMP_IND;
        obj["HCD"] = value.HCD;
        obj["ORD_NO"] = value.ORD_NO;
        obj["ORD_DT"] = value.ORD_DT;
        obj["GWO_ID"] = value.GWO_ID;
        obj["NID_No"] = value.NID_No;

        obj["DC"] = value.DC;
        obj["BILL_ITEM_NM"] = value.BILL_ITEM_NM;

        events.push(obj);
    });

    griddataGST = events;

    if (VocherApproval == "F") {
        var window = $("#VouchAppr");
        var kWnd = window.data("kendoWindow");
        kWnd.center().open();
    }
    else if (VocherApproval == "") {
        var window = "";
        var kWnd = "";
        var COMMON_NARR_APPL = $("#COMMON_NARR_APPL").val();
        var grid = $("#grid").data('kendoGrid');
        var postUrl="";
        var paramValue = [];
        var gridValue = $("#grid").data("kendoGrid").dataSource.data();
        var gridData = $("#grid").data('kendoGrid').dataSource.data();

        var Arr = [];
        $.each($("#grid").data('kendoGrid').dataSource._data, function (key, value) {
            var set = {};
            //var RefrDate = DocDate = checkDate = null;
            var RefrDate = DocDate = checkDate = "";
            if (value.RefrDate != null && value.RefrDate.toString() != "" && value.RefrDate.toString() != undefined) {
                RefrDate = Date(value.RefrDate); RefrDate = new Date(RefrDate); //dateFormat(RefrDate, "dd/mm/yyyy"); 
            }
            if (value.DocDate != null && value.DocDate.toString() != "" && value.DocDate.toString() != undefined) {
                DocDate = Date(value.DocDate); DocDate = new Date(DocDate);//dateFormat(DocDate, "dd/mm/yyyy"); 
            }
            if (value.checkDate != null && value.checkDate.toString() != "" && value.checkDate.toString() != undefined) {
                //checkDate = Date(value.checkDate);
                checkDate = value.checkDate;
                checkDate = new Date(checkDate);//dateFormat(checkDate, "dd/mm/yyyy"); 
                checkDate.setDate(checkDate.getDate() + 1);
            }

            set["DC"] = value.DC;
      
            set["Depit"] = value.Depit;
            
            set["Credit"] = value.Credit;

            set["Currency"] = value.Currency;
            set["ConvertButton"] = value.ConvertButton;
            set["CheckNoStr"] = value.CheckNoStr;
            set["RefrDate"] = RefrDate;
            set["DocDate"] = DocDate;
            set["checkDate"] = checkDate;//(value.checkDate != undefined && value.checkDate != "" && value.checkDate != null) ? null : value.checkDate;
            set["RefrNo"] = value.RefrNo; //(value.RefrDate != undefined && value.RefrDate != "" && value.RefrDate != null) ? null : value.RefrDate;
            set["DocNo"] = value.DocNo; //(value.DocDate != undefined && value.DocDate != "" && value.DocDate != null) ? null : value.DocDate;
            set["RowIndexHiden"] = value.RowIndexHiden;
            set["AC_NM"] = value.AC_NM;
            set["AC_CD"] = value.AC_CD;
            set["AC_ID"] = value.AC_ID;
            set["BillDeatil_IND"] = value.BillDeatil_IND;
            set["GSTCol"] = value.GSTCol;
            set["INdVal"] = value.INdVal;
            set["NARRATION"] = value.Narration;//S.VIJAYAlAKSHMI 23/7/20
            Arr.push(set);
        });
        gridData = JSON.stringify(Arr);
        debugger;
        //gridData = JSON.stringify(gridData);
        var gridValue2 = $("#HiddenGrid").data("kendoGrid").dataSource.data();
        var gridData2 = $("#HiddenGrid").data('kendoGrid').dataSource.data();
        var AnalysissGrid = "";
        AnalysissGrid = $("#AnalysisHiddenGrid").data('kendoGrid').dataSource.data();
        var DivAPPLIND = $("#DivAPPLIND").val();
        var Division = $("#Division").val();
        var TransDate = $("#Date").val();
        var TranType = $("#Trantype").val();
        var CommonNarration = $("#CommonNarration").val();
        var VoucherNo = $("#VoucherNo").val();
        var RecType = $("#RcptType").val();
        var BankNM = $("#BankID").val();
        var BranchNM = $("#BranchNM").val();
        var BTN_TYPE = $("#BTN_TYPE").val();
        var TRN_IDD = $("#TRN_IDD").val();
        var VOUCH_NO_IND = $("#VOUCH_NO_IND").val();
        var Reason = ""; var LFiscalYr = ""; var LtrnId = ""; var LAmt = "";
        if (localStorage.getItem("RevReason") != undefined && localStorage.getItem("RevReason") != null && localStorage.getItem("RevReason") != "") {
            Reason = localStorage.getItem("RevReason");
            LFiscalYr = localStorage.getItem("FsYr");
            LtrnId = localStorage.getItem("TRN_IDD");
            LAmt = localStorage.getItem("LAmt");
        }
        localStorage.setItem("PrintTrnType", TranType);
        var A1Reson = localStorage.getItem("A1Reason");
        if (A1Reson == null) A1Reson = "";
        var grid = $("#grid").data("kendoGrid");
        var totdr = 0;
        $.each(grid.dataSource._data, function (key, val) {
            if (val.Depit != "" && val.Depit != undefined && val.Depit != null)
                totdr = totdr + parseFloat(val.Depit);
        });
        debugger;
        var CurUpDt = $("#curUpdateDate").val();
        var gridhid = $("#HiddenGrid").data('kendoGrid');
       // var gridopen = $("#openBillGrid").data('kendoGrid');

        
        var hidtotal = gridhid.dataSource.data().length;
     //   var opentotal = gridopen.dataSource.data().length;
        if (hidtotal != 0  )

        {
            paramValue = JSON.stringify({ TransList: gridData, BillList: gridData2, AnalysisList: AnalysissGrid, TranTyID: TranType, TranDate: TransDate, Division: Division, CommaonNarrtion: CommonNarration, VouchNo: VoucherNo, RecType: RecType, BankNM: BankNM, BranchNM: BranchNM, BankAc_ID: "", TotalAmt: totdr, Trnfun: "Trn", griddataGST: griddataGST, BTN_TYPE: BTN_TYPE, TRN_IDD: TRN_IDD, Reason: Reason, LFiscalYr: LFiscalYr, LtrnId: LtrnId, LAmt: LAmt, CurUpDt: CurUpDt, A1Reson: A1Reson });

        }

       
        else {
            if ($("#BTN_TYPE").val() != "OPEN")
            {
                var gridData3 = $("#openBillGrid").data('kendoGrid').dataSource.data();
                paramValue = JSON.stringify({ TransList: gridData, BillList: gridData3, AnalysisList: AnalysissGrid, TranTyID: TranType, TranDate: TransDate, Division: Division, CommaonNarrtion: CommonNarration, VouchNo: VoucherNo, RecType: RecType, BankNM: BankNM, BranchNM: BranchNM, BankAc_ID: "", TotalAmt: totdr, Trnfun: "Trn", griddataGST: griddataGST, BTN_TYPE: BTN_TYPE, TRN_IDD: TRN_IDD, Reason: Reason, LFiscalYr: LFiscalYr, LtrnId: LtrnId, LAmt: LAmt, CurUpDt: CurUpDt, A1Reson: A1Reson });
            }
            else {
                paramValue = JSON.stringify({ TransList: gridData, BillList: gridData2, AnalysisList: AnalysissGrid, TranTyID: TranType, TranDate: TransDate, Division: Division, CommaonNarrtion: CommonNarration, VouchNo: VoucherNo, RecType: RecType, BankNM: BankNM, BranchNM: BranchNM, BankAc_ID: "", TotalAmt: totdr, Trnfun: "Trn", griddataGST: griddataGST, BTN_TYPE: BTN_TYPE, TRN_IDD: TRN_IDD, Reason: Reason, LFiscalYr: LFiscalYr, LtrnId: LtrnId, LAmt: LAmt, CurUpDt: CurUpDt, A1Reson: A1Reson });

            }
           

        }
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no = (total - 1);
        var TotalValue = $("#FinalDiffAMT").text();
        var dd = TotalValue.replace("D/C Difference:", "");
        TotalValue = dd;

        if (!fnTrnValidation())
            return false;

        if (TransDate != "" && TranType != "" && total != 0) {
            if (grid._data[no].Depit != 0 || grid._data[no].Credit != 0 || grid._data[no].Depit != "" || grid._data[no].Credit != "") {
                if (grid._data[no].AC_NM != null) {
                    if (TotalValue == 0) {
                        if (CommonNarration == "" && COMMON_NARR_APPL == "1") {
                            $("#AlertMessageHdn").val('Common Narration Mandatory.');
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else {
                            var vouchNoCheck = 0;
                            if ((VOUCH_NO_IND == 2 || VOUCH_NO_IND == 3) && VOUCH_NO_IND != undefined) {
                                if (VoucherNo == "") {
                                    vouchNoCheck = 0;
                                    $("#AlertMessageHdn").val('Voucher Number Mandatory.');
                                    $("#alertType").val('fail');
                                    AlertMesaage();
                                }
                                else if (VoucherNo != "") {

                                    vouchNoCheck = 1;
                                }
                            }
                            var grid2 = $("#HiddenGrid").data('kendoGrid');
                           
                            var dataSource2 = grid2.dataSource;
                            var total2 = grid2.dataSource.data().length;

                            if (total2 == undefined) {
                                total2 = 0;
                            }
                            //S.VijayaLakshmi''5/6/20
                            
                            var grid3 = $("#openBillGrid").data('kendoGrid');
                            var dataSource3 = grid3.dataSource;
                            var total3 = grid3.dataSource.data().length;
                            if (total3 == undefined) {
                                total3 = 0;
                            }
                            if ($("#BTN_TYPE").val() == "OPEN") total3 = 0;
                          
                            //
                           
                            var item = 0;
                            var item2 = 0;
                            var TestVal = 0;
                            var MainAC_NM = "";
                            debugger;
                            for (; item < total; item++) {
                                if (grid.dataSource._data[item].BillDeatil_IND == 1) {
                                    item2 = 0;
                                    if (total != 0 && ( total2 == 0 || total3==0)) {
                                        TestVal = 1;
                                    }
                                    if (total2 != 0)//if Cond Only Added by S.VijayaLakshmi''5/6/20
                                    {
                                        for (; item2 < total2; item2++) {
                                            if (grid.dataSource._data[item].RowIndexHiden == grid2.dataSource._data[item2].AC_ID) {
                                                break;
                                            }
                                            else if (item2 + 1 == total2) {
                                                MainAC_NM = grid.dataSource._data[item].AC_NM;
                                                TestVal = 1;
                                                break;
                                            }
                                        }
                                    }
                                    else //Added by S.Vijayalakhmi 5/6/20
                                    {
                                        for (; item2 < total3; item2++) {
                                            if (grid.dataSource._data[item].RowIndexHiden == grid3.dataSource._data[item2].AC_ID) {
                                                break;
                                            }
                                            else if (item2 + 1 == total3) {
                                                MainAC_NM = grid.dataSource._data[item].AC_NM;
                                                TestVal = 1;
                                                break;
                                            }
                                        }
                                    }

                                    
                                }
                            }

                            var TestVal = "";

                            var pageRev = localStorage.getItem("PageRev");
                            //if (pageRev == '3')
                            //    TestVal = ValidationBillReverse(e);
                            //else
                                TestVal = ValidationBill(e);

                            if (TestVal == 0) {
                                var grid4 = $("#AnalysisHiddenGrid").data('kendoGrid');
                                var total4 = grid4.dataSource._data.length;
                                if (total4 == undefined) {
                                    total4 = 0;
                                }
                                var itemA = 0;
                                var item2A = 0;
                                var TestValA = 0;
                                for (; itemA < total; itemA++) {
                                    if (grid.dataSource._data[itemA].INdVal == 1) {

                                        item2A = 0;
                                        if (total != 0 && total4 == 0) {
                                            TestValA = 1;
                                        }
                                        for (; item2A < total4; item2A++) {
                                            if (grid.dataSource._data[itemA].RowIndexHiden == grid4.dataSource._data[item2A].RowIndexHiden) {
                                                break;
                                            }
                                            else if (item2A + 1 == total4) {
                                                TestValA = 1;
                                            }
                                        }
                                    }
                                }
                                debugger;
                                if (TestValA == 0) {
                                    kendo.ui.progress(Trans, true);
                                    $.ajax({
                                        type: "POST",
                                        //contentType: "application/json",
                                        //accepts: "application/json",
                                        //dataType: "json",
                                        async: false,
                                        url: "/GLTransaction/SaveGrid",
                                        cache: false,
                                        charset: 'utf-8',
                                        data: "request=" + encodeURIComponent(paramValue),
                                        //data: paramValue,
                                        success: function (data) {
                                            var alertVal = data.v.ErroMeg;
                                            var VoucherNo = data.v.VoucherNo;
                                            var Trn_id = data.v.TRN_ID;
                                            localStorage.setItem("PrintTrnId", Trn_id);
                                            $("#VoucherNo").val(VoucherNo);
                                            kendo.ui.progress(Trans, false);
                                            if (alertVal == "Operation Failed..!") {
                                                //===Added by S.Vijayalakshmi''13/5/20
                                                //var buttonObject1 = $("#SaveGridRow").kendoButton().data("kendoButton");                                               
                                                //buttonObject1.enable(false);
                                                $("#grid").data("kendoGrid").dataSource.data("");
                                                //====
                                                $("#AlertMessageHdn").val(alertVal);
                                                $("#alertType").val('fail');
                                                AlertMesaage();
                                               
                                               
                                            }
                                            else if (alertVal === "Select Division...!") {
                                                $("#AlertMessageHdn").val(alertVal);
                                                $("#alertType").val('fail');
                                                AlertMesaage();
                                            }
                                            else {
                                                debugger;
                                                var buttonObject1 = $("#SaveGridRow").kendoButton().data("kendoButton");
                                                buttonObject1.enable(false);
                                                //$('.t-toolbar .t-button').addClass('t-state-disabled').click(function () { return false });                                                }
                                                grid.refresh();
                                                $("#AlertMessageHdn").val(alertVal);
                                                $("#VouchPrint").show();
                                                if (BTN_TYPE == "NEW") SaveMesaageWindow();
                                                else SaveMesaageWindowTRN();
                                            }
                                        }
                                    });
                                }
                                else {
                                    $("#AlertMessageHdn").val("Analysis Process Pending..!");
                                    $("#alertType").val('fail');
                                    AlertMesaage();
                                }
                            }
                            else {
                                if (MainAC_NM != "") {
                                    $("#AlertMessageHdn").val("Pending Bills are  not settled Property for " + MainAC_NM + " .account. ");
                                    $("#alertType").val('fail');
                                    AlertMesaage();
                                }
                                else {
                                    $("#AlertMessageHdn").val("D/C Value does not Match with the Pending Bill Settlement(s) Made.");
                                    $("#alertType").val('fail');
                                    AlertMesaage();
                                }
                            }
                        }
                    }
                    else {
                        $("#AlertMessageHdn").val("Difference Value must be Equal to Zero .");
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                }
                else {
                    $("#AlertMessageHdn").val("Select Account Name .");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
            else if (TransDate != "" && TranType != "" && total != 0 && grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Credit == 0 || grid.dataSource._data[no].Depit == "" || grid.dataSource._data[no].Credit == "") {
                $("#AlertMessageHdn").val("Invalid Account.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }
        else if (TransDate == "" && TranType == "" && total == 0) {
            $("#AlertMessageHdn").val("Select Transaction Type & Transaction Date.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (TransDate == "" && TranType != "" && total == 0) {
            $("#AlertMessageHdn").val("Select Transaction Date.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (TransDate != "" && TranType == "" && total == 0) {
            $("#AlertMessageHdn").val("Select Transaction Type.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (TransDate != "" && TranType != "" && total == 0) {
            $("#AlertMessageHdn").val("Enter Grid Values.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
    }

}
$("#addrow").click(function (e) {
    HiddengridLoad();
    NewGridRow(e);
   
});
$("#Open").click(function (e) {
    debugger;
    HiddengridLoad();
    
});
$("#deleterow").click(function (e) {
    HiddengridLoad();
    CancelGridRow(e);
   
});
$("#addanarow").click(function (e) {

    var grid = $("#AnalysisGrid").data("kendoGrid");
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var dataSource = grid.dataSource;
    var no1 = total - 1;
    var item = 0;
    var validatae = false;
    if (total != 0) {

        var len = grid.columns.length;
        var check = "";
        for (; item < len; item++) {
            if (grid.columns[item].hidden == undefined) {
                var fieldval = grid.columns[item].field;
                if (fieldval == "A_IND_VAl") {
                    check = grid._data[no1].A_IND_VAl;
                }
                else if (fieldval == "B_IND_VAl") { check = grid._data[no1].B_IND_VAl; }
                else if (fieldval == "C_IND_VAl") { check = grid._data[no1].C_IND_VAl; }
                else if (fieldval == "D_IND_VAl") { check = grid._data[no1].D_IND_VAl; }
                else if (fieldval == "E_IND_VAl") { check = grid._data[no1].E_IND_VAl; }
                else if (fieldval == "F_IND_VAl") { check = grid._data[no1].F_IND_VAl; }
                else if (fieldval == "L_IND_VAl") { check = grid._data[no1].L_IND_VAl; }
                else if (fieldval == "M_IND_VAl") { check = grid._data[no1].M_IND_VAl; }
                else if (fieldval == "N_IND_VAl") { check = grid._data[no1].N_IND_VAl; }
                else if (fieldval == "O_IND_VAl") { check = grid._data[no1].O_IND_VAl; }
                else if (fieldval == "AnalysisAMt") { check = grid._data[no1].AnalysisAMt; }
                if (check != "") {
                    validatae = true;
                }
                else {
                    validatae = false;
                    break;
                }
            }
        }
        if (validatae == true) {
            dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: 0 });
        }
        else {
            $("#AnalysisGrid th").addClass("hdcolor2");
        }
    }
    else if (total == 0) {
        dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: 0 });
    }
    grid.refresh();
});
$("#deleteanarow").click(function (e) {
    var grid = $("#AnalysisGrid").data("kendoGrid");
    grid.select().each(function () {
        var dataItem = grid.dataItem($(this));
        grid.dataSource.remove(dataItem);
    })
    grid.refresh();
    var grid2 = $("#grid").data("kendoGrid");
    var rowind = grid2._rowVirtualIndex;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    if (total != 0) {
        var Amount1 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = (grid.dataSource._data[item].AnalysisAMt == "" || grid.dataSource._data[item].AnalysisAMt == null || grid.dataSource._data[item].AnalysisAMt == undefined) ? 0 : grid.dataSource._data[item].AnalysisAMt;
            if (value != null) {
                Amount1 = parseFloat(Amount1.toString().replace(/,/g, '')) + parseFloat(value.toString().replace(/,/g, ''));
            }
            $("#AnalysisTotal").val(parseFloat(Amount1.toString().replace(/,/g, '')).toFixed(2));
            var analy = (grid2._data[rowind].Depit == "" || grid2._data[rowind].Depit == null || grid2._data[rowind].Depit == undefined) ? 0 : grid2._data[rowind].Depit;
            var analy2 = (grid2._data[rowind].Credit == "" || grid2._data[rowind].Credit == null || grid2._data[rowind].Credit == undefined) ? 0 : grid2._data[rowind].Credit;
            if (analy != 0) {
                var balancee = parseFloat(analy.toString().replace(/,/g, '')) - parseFloat(Amount1.toString().replace(/,/g, ''));
                $("#AnalysisBalance").val(parseFloat(balancee.toString().replace(/,/g, '')).toFixed(2));
            }
            else if (analy2 != 0) {
                var balancee = parseFloat(analy2.toString().replace(/,/g, '')) - parseFloat(Amount1.toString().replace(/,/g, ''));
                $("#AnalysisBalance").val(parseFloat(balancee.toString().replace(/,/g, '')).toFixed(2));
            }
        }
    }
    AnaSave(e);
    grid.refresh();
});

function AlertMesaageConfirmation() {
    var meg = $("#AlertMessageHdn").val();
    $("#alertMegCfm").text(meg);

    var alertty = $("#alertType").val();
    if (alertty == 'fail') {
        $("#alertimgCfm").show();
        $("#saveimgCfm").hide();
    }
    else {
        $("#saveimgCfm").show();
        $("#alertimgCfm").hide();
    }
    var window = $("#AlertConfirm");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();

}
function AlertMesaage() {
    debugger;
    var meg = $("#AlertMessageHdn").val();
    $("#alertMeg").text(meg);

    var alertty = $("#alertType").val();
    if (alertty == 'fail') {
        $("#alertimg").show();
        $("#saveimg").hide();
    }
    else {
        $("#saveimg").show();
        $("#alertimg").hide();
    }
    var window = $("#Alert");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();

}
function SaveMesaageWindow() {
    var meg = $("#AlertMessageHdn").val();
    $("#alertMegsave").text(meg);

    var window = $("#MessageSave");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function SaveMesaageWindowTRN() {
    var meg = $("#AlertMessageHdn").val();
    $("#alertMegsaveTrn").text(meg);
    var window = $("#MessageSaveTRN");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function maingridrowadd() {
    var dropdownval = $("#dropdownval").val();
    var DefaultCurrency = $("#DefaultCurrency").val();
    var grid = $("#grid").data("kendoGrid");
    var TransDate = $("#Date").val();
    var total = grid.dataSource.data().length;
    var no = (total - 1);
    var dataSource = grid.dataSource;
    if (DefaultCurrency != "") {
        if (grid.dataSource.data().length == 0 || grid.dataSource.data().length == undefined) {
            dataSource.add({ DC: dropdownval, Depit: "", Credit: "", AC_NM: "", Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
        }
    }
}

var grid = $("#grid").data("kendoGrid");
//// START NEW Button Click Function 
function NewGridRow(e) {
    debugger;
    var B_IND = $("#B_IND").val();
    var dcval = $("#dcval").val();
    var dropdownval = $("#dropdownval").val();
    var DefaultCurrency = $("#DefaultCurrency").val();
    var grid = $("#grid").data("kendoGrid");
    var TransDate = $("#Date").val();
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    var no = (total - 1);
    if (total != 0 || total != undefined) {
        var no = (total - 1);
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        
        for (; item < total; item++) {
          
            var value = grid.dataSource._data[item].Depit;
            if (value == null) value = "";
            var value2 = grid.dataSource._data[item].Credit;
            if (value2 == null) value2 = "";
            //Added by S.Vijayalakshmi''15/5/20
            if(value !="") grid.dataSource._data[item].Depit = Number(value == "" ? 0 : value.toString().replace(/,/g, ''));//S.Vijayalakshmi''15/5/20
            if (value2 != "")  grid.dataSource._data[item].Credit = Number(value2 == "" ? 0 : value2.toString().replace(/,/g, ''));//S.Vijayalakshmi''15/5/20
            //
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }
        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1 + Amount2;
        var CreditTotal = Amount2 + Amount1;
        var finalTotal = Number(DepitTotal.toString().replace(/,/g, '')) - Number(CreditTotal.toString().replace(/,/g, ''));
        $("#differenceAmountgrid").text(Number(finalTotal.toString().replace(/,/g, '')).toFixed(2));
        var PURConvrate = $("#PURConvertRate").val();
        var ForgAmount = "0";
    }
    $("#DepitTotal").val(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").val(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));

    if (grid.dataSource.data().length == 0 || grid.dataSource.data().length == undefined) {
        if (dropdownval != "" && TransDate != "") {
            dataSource.add({ DC: dropdownval, Depit: "", Credit: "", Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
        }
        else if (dropdownval == "" && TransDate == "") {
            $("#AlertMessageHdn").val("Please Select Transaction Type & Transaction Date.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (dropdownval == "" && TransDate != "") {
            $("#AlertMessageHdn").val("Please Select Transaction Type.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (dropdownval != "" && TransDate == "") {
            $("#AlertMessageHdn").val("Please Select Transaction Date.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        $("#DepitTotal").val(Number(0).toFixed(2));
        $("#CreditTotal").val(Number(0).toFixed(2));
    }
    else if (grid.dataSource.data().length != 0 || grid.dataSource.data().length != undefined) {
        //if (grid.datasource._data[no].RowIndexHiden != no) {
        //    total = Number(total) + 1;
        //}
        var FirstRowCurrency = grid.dataSource._data[0].Currency;
        if (FirstRowCurrency == DefaultCurrency) {
            var conButton = "R";
        }
        else {
            var conButton = "P";
        }
        if (0 >= TotalValue && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0) {

            if (grid._data[no].AC_NM != null && grid._data[no].AC_NM != "") {

                if (0 <= TotalValue) {
                    dataSource.add({ DC: "DR", AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                    if (FirstRowCurrency == DefaultCurrency) {
                        $("#ForeignCurrencyDIV").hide();
                    }
                    else if (FirstRowCurrency != DefaultCurrency) {
                        $("#ForeignCurrencyDIV").show();
                        ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                        $("#Purchase").show();
                        $("#Sale").hide();
                        $("#PURConvertRate").show();
                        $("#SALEConvertRate").hide();
                        $("#ConvertButton").val("Purchase");
                    }
                }
                else if (0 > TotalValue) {
                    var Sum = -(TotalValue);
                    dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                    if (FirstRowCurrency == DefaultCurrency) {
                        $("#ForeignCurrencyDIV").hide();
                    }
                    else if (FirstRowCurrency != DefaultCurrency) {
                        ForgAmount = Number(Sum.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                        $("#ForeignCurrencyDIV").show();
                        $("#Purchase").show();
                        $("#Sale").hide();
                        $("#PURConvertRate").show();
                        $("#SALEConvertRate").hide();
                        $("#ConvertButton").val("Purchase");
                    }
                }
            }
            else {
                $("#AlertMessageHdn").val("Select Account Name.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }

        else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0) {
            if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                if (FirstRowCurrency == DefaultCurrency) {
                    $("#ForeignCurrencyDIV").hide();
                }
                else if (FirstRowCurrency != DefaultCurrency) {
                    ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                    $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                    $("#ForeignCurrencyDIV").show();
                    $("#Purchase").show();
                    $("#Sale").hide();
                    $("#PURConvertRate").show();
                    $("#SALEConvertRate").hide();
                    $("#ConvertButton").val("Purchase");
                }
            }
            else {
                $("#AlertMessageHdn").val("Select Account Name.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }
        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Credit == 0) {
            $("#AlertMessageHdn").val('Please Select Account Name and Enter Debit & Credit value.');
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0) {
            $("#AlertMessageHdn").val("Select Account Name.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Credit == 0) {
            $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
    }
    var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
    var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
    var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
    $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));//Uncomment by S.VijayaLakshmi''14.5.20
    $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
}
//// END NEW Button Click Function  
//// START Cancel Button Click Function 
function CancelGridRow(e) {
    debugger;
    var grid = $("#grid").data("kendoGrid");
    grid.select().each(function () {
        var dataItem = grid.dataItem($(this));
        grid.dataSource.remove(dataItem);
        
       
        if (dataItem.INdVal == "1") {
            var grid2 = $("#AnalysisGrid").data("kendoGrid");
            grid2.dataSource.data([]);

            var grid2 = $("#AnalysisHiddenGrid").data("kendoGrid");
            $.each(grid2.dataSource._data, function (key, value) {
                if (grid._rowVirtualIndex == value.RowIndexHiden) {
                    grid2.dataSource.remove(value);
                }
            });
            $("#AnalysisGridsts").hide();
            $("#AnalysisGridtoolbar").hide();
        }
    });
    var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
    if (depitfinTotal == null) depitfinTotal = "";
    var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
    if (CreditfinTotal == null) CreditfinTotal = "";
    var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal == undefined ? 0 : CreditfinTotal.toString().replace(/,/g, ''));
    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
    $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
}
//// END Cancel Button Click Function 

function ClearRowGrid(e) {
    $("#grid").data("kendoGrid").cancelChanges();
    $("#Popupgrid").data('kendoGrid').cancelChanges();
    $("#HiddenGrid").data('kendoGrid').cancelChanges();
    $("#ForeignCurrencyDIV").hide();
    var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
    var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
    var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
    $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
}
//// START TrasactionDate  Change Function 
$("#Date").change(function (e) {
    maingridrowadd();
})
$("#Date").blur(function (e) {
    var grid = $("#grid").data('kendoGrid');
    var id = $("#Date").val();
    var TrnType = $("#Trantype").val();
    if (id != "") {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/Date",
            cache: false,
            charset: 'utf-8',
            async: false,
            data: "TransDate=" + id + "&TrnType=" + TrnType,
            success: function (data) {

                if (data.d != "") {
                    if (data.d == "1") {
                        $("#Date").val("");
                        $("#AlertMessageHdn").val("Voucher Date is greater than Current Date.");
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                    else $("#Date").val(data.d);
                }
                else if (data.d == "") {
                    $("#Date").val("");
                    $("#AlertMessageHdn").val("Date is Not in Fisical Year.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
        });
    }
    var grid = $("#grid").data("kendoGrid");
    if (grid.dataSource._data.length == 0) {

        maingridrowadd();
    }

});
$("#DFDate").click(function (e) {
    var Trntype = $("#Trantype").val();
    var Tdate = $("#Date").val();
    $.ajax({
        type: "POST",
        url: "/GLTransaction/DefaultDate",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "Trntype=" + Trntype + "&Tdate=" + Tdate,
        success: function (data) {
            if (data.d != "") {
                $("#Date").val(data.d);
                maingridrowadd();
            }
        }
    });

})
//// END TrasactionDate  Change Function 

//// START TrasactionDate  Change Function 
$("#VoucherNo").change(function () {

    var grid = $("#grid").data('kendoGrid');
    var Vouchno = $("#VoucherNo").val();
    var Trnatypeid = $("#Trantype").val();

    if (Trnatypeid != "" && Vouchno != 0 && Vouchno != null) {
        if (VOUCH_NO_IND == 2) {
            $.ajax({
                type: "POST",
                url: "/GLTransaction/VoucherNoValidate",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "VouchNo=" + Vouchno + "&TransId=" + Trnatypeid,
                success: function (data) {
                    if (data.d != "") {
                        $("#VoucherNo").val(data.d);
                    }
                    else if (data.d == "") {
                        $("#VoucherNo").val(data.d);
                        $("#AlertMessageHdn").val("Voucher No already Exist.");
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                }
            });
        }
    }

    else if (Trnatypeid == "" && Vouchno != 0 && Vouchno != null) {
        $("#VoucherNo").val("");
        $("#AlertMessageHdn").val("Please Select Transaction Type.");
        $("#alertType").val('fail');
        AlertMesaage();
    }
    else if (Trnatypeid != "" && Vouchno == 0 && Vouchno != null) {
        $("#AlertMessageHdn").val("Please Enter Voucher No.");
        $("#alertType").val('fail');
        AlertMesaage();
    }
});
//// END TrasactionDate  Change Function        

//// START Depit & Credit Editable False Function 
function edit(e) {

    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    $(e.container).find('input[name="Narration"]').attr("readOnly", true);
    $(e.container).find('input[name="AC_NM"]').attr("readOnly", true);
    $(e.container).find('input[name="AC_CD"]').attr("disabled", true);
    $(e.container).find('input[name="DC"]').attr("readOnly", true);
    // $(e.container).closest("tr").css("background-color", "lightgreen");
    var DefaultCurrency = $("#DefaultCurrency").val();
    var dataSource = grid.dataSource;
    if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {

        $(e.container).find('input[name="Analysis"]').attr("disabled", true);
        objbrowserName = "Chrome";
        objfullVersion = objAgent.substring(objOffsetVersion + 7);
        if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
            $(e.container).find('input[name="Depit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
    }
        // In Microsoft internet explorer
    else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
        objbrowserName = "Microsoft Internet Explorer";
        objfullVersion = objAgent.substring(objOffsetVersion + 5);
        $(e.container).find('input[name="Analysis"]').attr("disabled", true);
        if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
            $(e.container).find('input[name="Depit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
        }
    }
        // In Firefox
    else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
        objbrowserName = "Firefox";
        (e.container).find('input[name="Analysis"]').attr("readonly", true);
        if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
            $(e.container).find('input[name="Depit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("readonly", true);
            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
    }

    else {
        $(e.container).find('input[name="Analysis"]').attr("disabled", true);
        if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
            $(e.container).find('input[name="Depit"]').focus();
        }
        else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
        }
        else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
            $(e.container).find('input[name="Depit"]').attr("disabled", true);
            $(e.container).find('input[name="Credit"]').attr("disabled", true);
        }
    }
    var TransDate = $("#Date").val();
    if (TransDate == "") {
        $("#AlertMessageHdn").val("Please Select Transaction Date.");
        $("#alertType").val('fail');
        AlertMesaage();
    }
    else {
        var grdd = document.getElementById("Depit");
        var grddcd = document.getElementById("Credit");
        var grdd1 = document.getElementById("Narration");
        var grdd2 = document.getElementById("Analysis");
        var grdd3 = document.getElementById("CheckNoStr");
        var grdd4 = document.getElementById("checkDate");

        var grid = $("#grid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        $("#RowIndexHiden").val(rowIndex);
        if (grdd != null || grddcd != null || grdd1 != null || grdd2 != null || grdd3 != null || grdd4 != null) {
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            if (grid.dataSource._data[no].AC_NM != "" && grid.dataSource._data[no].AC_NM != undefined) {

            }
            else {
                $("#AlertMessageHdn").val("Account Name Can not be Empty.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }
    }

}
//// END Depit & Credit Editable False Function  

$("#grid table").on("keydown", "td", function (e) {
    debugger;
    $("#ConvertRatePOP").val("");
    $("#ForcurAmount").val("");
    $("#AmountPop").val("");
    $("#Depicreditval").text("");
    $("#ForeignCurrAmountPOP").val("");
    $("#ForeginDiffAmount").val("");
    $("#PopupDepitTotal").val("");
    $("#PopupCreditTotal").val("");
    
    var DefaultCurrency = $("#DefaultCurrency").val();
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    var key = e.key;
    var grdd = document.getElementById("DC");
    var grdd1 = document.getElementById("Depit");
    var grdd2 = document.getElementById("Credit");
    var grdd3 = document.getElementById("AC_NM");
    var grdd4 = document.getElementById("Narration");
    var grdd5 = document.getElementById("CheckNoStr");
    var grdd6 = document.getElementById("checkDate");
    var grdd7 = document.getElementById("RefrNo");
    var grdd8 = document.getElementById("RefrDate");

    if (grdd != null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 == null) {

        if (grdd.id == "DC") {
            var grid = $("#grid").data("kendoGrid");
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            var dataSource = grid.dataSource;
            var value = grid.dataSource._data[no].DC;
            var len = value.length;
            if (keyCode == 67 || keyCode == 99) {
                var data = $("#grid").data().kendoGrid.dataSource.data()[no];
                data.set("DC", "CR");
                grid._data[no].Depit = 0;
                $("#grid").data("kendoGrid").refresh();
                return false;
            }
            else if (keyCode == 68 || keyCode == 100) {
                var data = $("#grid").data().kendoGrid.dataSource.data()[no];
                data.set("DC", "DR");
                grid._data[no].Credit = 0;
                $("#grid").data("kendoGrid").refresh();
                return false;
            }
            else if (keyCode != 67 && keyCode != 68 && keyCode != 99 && keyCode != 100) {
                return false;
            }
        }
    }

    else if (grdd == null && grdd1 != null && grdd2 == null && grdd3 == null && grdd4 == null) {

        if (grdd1.id == "Depit") {

            var grid = $("#grid").data("kendoGrid");
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            $("#sample").val(rowIndex);
            var dataSource = grid.dataSource;
            var value = grid.dataSource._data[no].DC;
            var AccountID = grid.dataSource._data[no].AC_ID;
            var len = value.length;
            var DepitVal = grdd1.value;
            var CreditVal = grid.dataSource._data[no].Credit;
            if (DepitVal == null || DepitVal == undefined) DepitVal = 0;
            if (CreditVal == null || CreditVal == undefined) CreditVal = 0;
            if (keyCode == 66) {
                if ($("#BTN_TYPE").val() == "OPEN") HiddengridLoad();
                var DepitVal = grdd1.value;
                var CreditVal = grid.dataSource._data[no].Credit;

                if (DepitVal == null || DepitVal == undefined) DepitVal = 0;
                if (CreditVal == null || CreditVal == undefined) CreditVal = 0;
                if (DepitVal != 0 || CreditVal != 0) {
                    if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                        var id = grid.dataSource._data[no].Currency;

                        $.ajax({
                            type: "POST",
                            url: "/GLTransaction/ForeignCurrency",
                            data: "Currency=" + id,
                            async: false,
                            success: function (data) {
                                $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);
                                var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                var convertratee = data.d.PURConvertRate;
                                var ForgAmount = "0";
                                if (grid.dataSource._data[no].Currency == DefaultCurrency) {

                                    if (DepitVal != 0 && CreditVal == 0) {
                                        $("#AmountPop").val(Number(DepitVal.toString().replace(/,/g, '')).toFixed(2));
                                        $("#Depicreditval").text("DR");
                                    }
                                    else if (DepitVal == 0 && CreditVal != 0) {
                                        $("#AmountPop").val(Number(CreditVal.toString().replace(/,/g, '')).toFixed(2));
                                        $("#Depicreditval").text("CR");
                                    }
                                }
                                else if (grid.dataSource._data[no].Currency != DefaultCurrency) {

                                    if (ConvertbuttonType == "S") {
                                        var ForgAmount = "0";
                                        if (DepitVal != 0 && CreditVal == 0) {
                                            ForgAmount = Number(DepitVal == "" ? 0 : DepitVal.toString().replace(/,/g, '')) / Number(data.d.SALEConvertRate.toString().replace(/,/g, ''));
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate.toString().replace(/,/g, '')).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                            $("#AmountPop").val(Number(DepitVal.toString().replace(/,/g, '')).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (DepitVal == 0 && CreditVal != 0) {
                                            ForgAmount = Number(CreditVal.toString().replace(/,/g, '')) / Number(data.d.SALEConvertRate.toString().replace(/,/g, ''));
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                            $("#AmountPop").val(Number(CreditVal.toString().replace(/,/g, '')).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }

                                    else if (ConvertbuttonType == "P") {
                                        var ForgAmount = "0";
                                        if (DepitVal != 0 && CreditVal == 0) {
                                            ForgAmount = Number(DepitVal == "" ? 0 : DepitVal.toString().replace(/,/g, '')) / Number(data.d.PURConvertRate.toString().replace(/,/g, ''));
                                            $("#ConvertRatePOP").val(Number(data.d.PURConvertRate.toString().replace(/,/g, '')).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                            $("#AmountPop").val(Number(DepitVal.toString().replace(/,/g, '')).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (DepitVal == 0 && CreditVal != 0) {
                                            ForgAmount = Number(CreditVal.toString().replace(/,/g, '')) / Number(data.d.PURConvertRate.toString().replace(/,/g, ''));
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate.toString().replace(/,/g, '')).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                            $("#AmountPop").val(Number(CreditVal.toString().replace(/,/g, '')).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }
                                }
                                var AmountValuee = $("#AmountPop").val();
                                var grid2 = $("#Popupgrid").data('kendoGrid');
                                $("#ForeignCurrAmountPOP").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                $("#ForeginDiffAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                            }
                        });

                        $("#Popupgrid").data("kendoGrid").refresh();
                        if (grid.dataSource._data[no].Currency != DefaultCurrency) {

                            $("#f1").show();
                            $("#ForeignCurrNMPOP").show();
                            $("#f3").show();
                            $("#ForeignCurrAmountPOP").show();
                            $("#f5").show();
                            $("#ConvertRatePOP").show();
                            $("#f7").show();
                            $("#GainLoss").show();
                            $("#f9").show();
                            $("#ForeginDiffAmount").show();
                        }
                        else if (grid.dataSource._data[no].Currency == DefaultCurrency) {
                            $("#f1").hide();
                            $("#ForeignCurrNMPOP").hide();
                            $("#f3").hide();
                            $("#ForeignCurrAmountPOP").hide();
                            $("#f5").hide();
                            $("#ConvertRatePOP").hide();
                            $("#f7").hide();
                            $("#GainLoss").hide();
                            $("#f9").hide();
                            $("#ForeginDiffAmount").hide();
                            var Popupgrid = $("#Popupgrid").data("kendoGrid");
                            $("#Popupgrid").find("table th").eq(6).hide();
                            $("#Popupgrid").find("table Column").eq(6).hide();
                            $("#Popupgrid").data("kendoGrid").refresh();

                        }
                        $("#Popupgrid").data('kendoGrid').cancelChanges();
                        $("#PopupDepitTotal").val(Number(0).toFixed(2));
                        $("#PopupCreditTotal").val(Number(0).toFixed(2));

                        var grid2 = $("#Popupgrid").data('kendoGrid');
                        var grid3 = $("#HiddenGrid").data('kendoGrid');
                        var grid4 = $("#openBillGrid").data('kendoGrid');

                        var dataSource = grid2.dataSource;
                        var total = grid3.dataSource.data().length;
                        var total4 = grid4.dataSource.data().length;
                        if (total == undefined) {
                            total = 0;
                        }
                        
                        var item = 0;
                        //&& total!=0 Added by S.VijaaLakshmi''5/6/20
                        if (grid.dataSource._data[no].ReferenceName != "D" && total!= 0) {
                            for (; item < total; item++) {
                                var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                var BillDate = grid3.dataSource._data[item].BillDate;
                                var Duedate = grid3.dataSource._data[item].Duedate;
                                var Depit = grid3.dataSource._data[item].Depit;
                                var Credit = grid3.dataSource._data[item].Credit;
                                var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                var CBY = grid3.dataSource._data[item].CBY;
                                var CDT = grid3.dataSource._data[item].CDT;
                                var ADJBY = grid3.dataSource._data[item].ADJBY;
                                var ADJDT = grid3.dataSource._data[item].ADJDT;
                                if (rowIndex == ACC_ID) {
                                    dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID, CBY: CBY, CDT: CDT, ADJBY: ADJBY, ADJDT: ADJDT });
                                    // $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
                                }
                            }
                        }
                        else {
                            if ($("#BTN_TYPE").val() != "OPEN") {
                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    if (Credit == null) Credit = "";
                                    if (Depit == null) Depit = "";
                                    var CBY = grid4.dataSource._data[item].CBY;
                                    var CDT = grid4.dataSource._data[item].CDT;
                                    var ADJBY = grid4.dataSource._data[item].ADJBY;
                                    var ADJDT = grid4.dataSource._data[item].ADJDT;
                                    if (grid.dataSource._data[no].RowIndexHiden == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID, CBY: CBY, CDT: CDT, ADJBY: ADJBY, ADJDT: ADJDT });



                                    }

                                    // var RowIndex = $("#sample").val();

                                    //if ($("#BTN_TYPE").val()=="OPEN")
                                    //{
                                    //    if (total == 0 || total == "" || total == undefined) {
                                    //        var BillDt = grid4.dataSource._data[item].BillDate;
                                    //        BillDt.setHours(10, 40, 40, 000);
                                    //        var RowIndex = grid.dataSource._data[no].RowIndexHiden;
                                    //        var dataSource2 = grid3.dataSource;
                                    //        dataSource2.add({
                                    //            ReferenceTypeName: ReferenceTypeName,
                                    //            ReferenceName: ReferenceName,
                                    //            BillDate: BillDt,
                                    //            Duedate: Duedate,
                                    //            Depit: Depit,
                                    //            Credit: Credit,
                                    //            AC_ID: RowIndex
                                    //        });
                                    //    }
                                    //}








                                }
                            }
                        }
                        debugger;

                        $.ajax({
                            type: "POST",
                            url: "/GLTransaction/PendingBillNM",
                            cache: false,
                            async: false,
                            charset: 'utf-8',
                            data: "ID=" + AccountID,
                            success: function (data) {
                                $("#PendingBillGrid").data("kendoGrid").dataSource.read();
                            }
                        });
                        Total(e);

                        var DepitV = grdd1.value;
                        var CreditV = grid.dataSource._data[no].Credit;

                        var grid1 = $("#Popupgrid").data('kendoGrid');
                        var dataSource = grid1.dataSource;
                        if (grid1.dataSource.data().length == 0 || grid1.dataSource.data().length == undefined) {

                            if (DepitV != "" && CreditV == "") {
                                $("#differenceAmount").text("D/C Difference: " + Number(DepitV.toString().replace(/,/g, '')).toFixed(2));
                            }
                            else if (DepitV == "" && CreditV != "") {
                                $("#differenceAmount").text("D/C Difference: " + Number(CreditV.toString().replace(/,/g, '')).toFixed(2));
                            }
                        }
                        else {

                            $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
                        }

                        billrow(e);
                        POpTotal(e);
                        var window = $("#BillDetails");
                        var kWnd = window.data("kendoWindow");
                        kWnd.center().open();
                        return false;
                    }
                    else if (grid.dataSource._data[no].BillDeatil_IND == 0) {
                        return false;
                    }
                }
                else {
                    $("#AlertMessageHdn").val("Debit & Credit  Value Zero.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                    return false;
                }
            }
            else if (keyCode == 40) {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var total = grid.dataSource.data().length;
                if (total == undefined) {
                    total = 0;
                }
                var no1 = total - 1;
                var keyCode = (e.keyCode ? e.keyCode : e.which);

                if (no1 == no) {
                    grid.dataSource._data[no].Depit = Number(DepitVal == "" ? 0 : DepitVal.toString().replace(/,/g, ''));
                    var B_IND = $("#B_IND").val();
                    var dcval = $("#dcval").val();
                    var dropdownval = $("#dropdownval").val();
                    var DefaultCurrency = $("#DefaultCurrency").val();
                    var grid = $("#grid").data("kendoGrid");
                    var TransDate = $("#Date").val();
                    var dataSource = grid.dataSource;
                    var total = grid.dataSource.data().length;
                    var no = (total - 1);
                    if (total != 0 || total != undefined) {
                        var no = (total - 1);
                        var Amount1 = "0";
                        var Amount2 = "0";
                        var item = 0;
                        for (; item < total; item++) {
                            var value = grid.dataSource._data[item].Depit;
                            var value2 = grid.dataSource._data[item].Credit;
                            if (value == null) value = "0";
                            if (value2 == null) value2 = "0";
                            if (value != null && value2 != null) {
                                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
                            }
                        }
                        if (Amount1 != null && Amount2 != null) {
                            TotalValue = (Amount1 - Amount2)
                        }
                        var DepitTotal = Amount1 + Amount2;
                        var CreditTotal = Amount2 + Amount1;
                        var finalTotal = Number(DepitTotal.toString().replace(/,/g, '')) - Number(CreditTotal.toString().replace(/,/g, ''));
                        $("#differenceAmountgrid").text(Number(finalTotal.toString().replace(/,/g, '')).toFixed(2));
                        var PURConvrate = $("#PURConvertRate").val();
                        var ForgAmount = "0";
                    }
                    $("#DepitTotal").val(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
                    $("#CreditTotal").val(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
                    if (grid.dataSource.data().length != 0 || grid.dataSource.data().length != undefined) {

                        var FirstRowCurrency = grid.dataSource._data[0].Currency;
                        if (FirstRowCurrency == DefaultCurrency) {
                            var conButton = "R";
                        }
                        else {
                            var conButton = "P";
                        }

                        if (0 >= TotalValue && (DepitVal != 0 || CreditVal != 0)) {

                            if (grid._data[no].AC_NM != null && grid._data[no].AC_NM != "") {

                                if (0 <= TotalValue) {
                                    dataSource.add({ DC: "DR", AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                    if (FirstRowCurrency == DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").hide();
                                    }
                                    else if (FirstRowCurrency != DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").show();
                                        ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                        $("#Purchase").show();
                                        $("#Sale").hide();
                                        $("#PURConvertRate").show();
                                        $("#SALEConvertRate").hide();
                                        $("#ConvertButton").val("Purchase");
                                    }
                                }
                                else if (0 > TotalValue) {
                                    var Sum = -(TotalValue);
                                    dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                    if (FirstRowCurrency == DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").hide();
                                    }
                                    else if (FirstRowCurrency != DefaultCurrency) {
                                        ForgAmount = Number(Sum.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                        $("#ForeignCurrencyDIV").show();
                                        $("#Purchase").show();
                                        $("#Sale").hide();
                                        $("#PURConvertRate").show();
                                        $("#SALEConvertRate").hide();
                                        $("#ConvertButton").val("Purchase");
                                    }
                                }
                            }
                            else {
                                $("#AlertMessageHdn").val("Select Account Name.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && (DepitVal != 0 || CreditVal != 0)) {
                            if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                if (FirstRowCurrency == DefaultCurrency) {
                                    $("#ForeignCurrencyDIV").hide();
                                }
                                else if (FirstRowCurrency != DefaultCurrency) {
                                    ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                    $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                    $("#ForeignCurrencyDIV").show();
                                    $("#Purchase").show();
                                    $("#Sale").hide();
                                    $("#PURConvertRate").show();
                                    $("#SALEConvertRate").hide();
                                    $("#ConvertButton").val("Purchase");
                                }
                            }
                            else {
                                $("#AlertMessageHdn").val("Select Account Name.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && DepitVal == 0 || CreditVal == 0) {
                            $("#AlertMessageHdn").val('Please Select Account Name and Enter Debit & Credit value.');
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && DepitVal != 0 || CreditVal != 0) {
                            $("#AlertMessageHdn").val("Select Account Name.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM != null && DepitVal == 0 || CreditVal == 0) {
                            $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                    }
                    var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                    var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                    var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
                    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                    $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
                    $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
                }
                else {
                    if (arrows.indexOf(e.keyCode) >= 0) {
                        setTimeout(function () {
                            data.select($("#grid_active_cell").closest("tr"));
                        }, 1);
                    }
                    return true;
                }
            }
        }
    }
    else if (grdd == null && grdd1 == null && grdd2 != null && grdd3 == null && grdd4 == null) {
        if (grdd2.id == "Credit") {
            debugger;
            var grid = $("#grid").data("kendoGrid");
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            var DepitVal = grid.dataSource._data[no].Depit;
            var AccountID = grid.dataSource._data[no].AC_ID;
            var CreditVal = grdd2.value;
            $("#sample").val(rowIndex);
            var dataSource = grid.dataSource;
            var value = grid.dataSource._data[no].DC;
            var len = value.length;
            if (keyCode == 66) {
                if ($("#BTN_TYPE").val() == "OPEN") HiddengridLoad();
                var DepitVal = grid.dataSource._data[no].Depit;
                var CreditVal = grdd2.value;

                if (DepitVal == null || DepitVal == undefined) DepitVal = 0;
                if (CreditVal == null || CreditVal == undefined) CreditVal = 0;

                if (DepitVal != 0 || CreditVal != 0) {
                    if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                        var id = grid.dataSource._data[no].Currency;

                        $.ajax({
                            type: "POST",
                            url: "/GLTransaction/ForeignCurrency",
                            data: "Currency=" + id,
                            async: false,
                            success: function (data) {
                                $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);
                                var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                var convertratee = data.d.PURConvertRate;
                                var ForgAmount = "0";
                                if (grid.dataSource._data[no].Currency == DefaultCurrency) {
                                    if (DepitVal != 0 && CreditVal == 0) {
                                        $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                        $("#Depicreditval").text("DR");
                                    }
                                    else if (DepitVal == 0 && CreditVal != 0) {
                                        $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                        $("#Depicreditval").text("CR");
                                    }
                                }
                                else if (grid.dataSource._data[no].Currency != DefaultCurrency) {
                                    if (ConvertbuttonType == "S") {
                                        var ForgAmount = "0";
                                        if (DepitVal != 0 && CreditVal == 0) {
                                            ForgAmount = Number(DepitVal == "" ? 0 : DepitVal) / Number(data.d.SALEConvertRate);
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                            $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (DepitVal == 0 && CreditVal != 0) {
                                            ForgAmount = Number(CreditVal) / Number(data.d.SALEConvertRate);
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                            $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }
                                    else if (ConvertbuttonType == "P") {
                                        var ForgAmount = "0";
                                        if (DepitVal != 0 && CreditVal == 0) {
                                            ForgAmount = Number(DepitVal == "" ? 0 : DepitVal) / Number(data.d.PURConvertRate);
                                            $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                            $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (DepitVal == 0 && CreditVal != 0) {
                                            ForgAmount = Number(CreditVal == "" ? 0 : CreditVal == "" ? 0 : CreditVal) / Number(data.d.PURConvertRate);
                                            $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                            $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }
                                }
                                var AmountValuee = $("#AmountPop").val();
                                $("#ForeignCurrAmountPOP").val(Number(ForgAmount).toFixed(2));
                                $("#ForeginDiffAmount").val(Number(ForgAmount).toFixed(2));
                            }
                        });


                        if (grid.dataSource._data[no].Currency != DefaultCurrency) {
                            $("#f1").show();
                            $("#ForeignCurrNMPOP").show();
                            $("#f3").show();
                            $("#ForeignCurrAmountPOP").show();
                            $("#f5").show();
                            $("#ConvertRatePOP").show();
                            $("#f7").show();
                            $("#GainLoss").show();
                            $("#f9").show();
                            $("#ForeginDiffAmount").show();
                        }
                        else if (grid.dataSource._data[no].Currency == DefaultCurrency) {
                            $("#f1").hide();
                            $("#ForeignCurrNMPOP").hide();
                            $("#f3").hide();
                            $("#ForeignCurrAmountPOP").hide();
                            $("#f5").hide();
                            $("#ConvertRatePOP").hide();
                            $("#f7").hide();
                            $("#GainLoss").hide();
                            $("#f9").hide();
                            $("#ForeginDiffAmount").hide();
                            $("#forignColumnHiden").val(true);
                        }
                        $("#Popupgrid").data('kendoGrid').cancelChanges();
                        $("#PopupDepitTotal").val(Number(0).toFixed(2));
                        $("#PopupCreditTotal").val(Number(0).toFixed(2));

                        var grid2 = $("#Popupgrid").data('kendoGrid');
                        var grid3 = $("#HiddenGrid").data('kendoGrid');
                        var grid4 = $("#openBillGrid").data('kendoGrid');

                        var dataSource = grid2.dataSource;
                        var total = grid3.dataSource.data().length;
                        var total4 = grid4.dataSource.data().length;
                        if (total == undefined) {
                            total = 0;
                        }
                        var item = 0;
                        
                        //   && Total!=0  Added by S.VijayaLakshmi''5/6/20 
                        if (grid.dataSource._data[no].ReferenceName != "D" && total != 0) {
                            for (; item < total; item++) {
                                var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                var BillDate = grid3.dataSource._data[item].BillDate;
                                var Duedate = grid3.dataSource._data[item].Duedate;
                                var Depit = grid3.dataSource._data[item].Depit;
                                var Credit = grid3.dataSource._data[item].Credit;
                                var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                var CBY = grid3.dataSource._data[item].CBY;
                                var CDT = grid3.dataSource._data[item].CDT;
                                var ADJBY = grid3.dataSource._data[item].ADJBY;
                                var ADJDT = grid3.dataSource._data[item].ADJDT;
                                if (rowIndex == ACC_ID) {
                                    dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID,CBY:CBY,CDT:CDT,ADJBY:ADJBY,ADJDT:ADJDT });
                                    $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
                                }
                            }
                        }
                        else {
                            if ($("#BTN_TYPE").val() !="OPEN") {
                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    var CBY = grid4.dataSource._data[item].CBY;
                                    var CDT = grid4.dataSource._data[item].CDT;
                                    var ADJBY = grid4.dataSource._data[item].ADJBY;
                                    var ADJDT = grid4.dataSource._data[item].ADJDT;
                                    if (Credit == null) Credit = "";
                                    if (Depit == null) Depit = "";
                                    if (grid.dataSource._data[no].RowIndexHiden == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID, CBY: CBY, CDT: CDT, ADJBY: ADJBY, ADJDT: ADJDT });
                                        $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
                                    }

                                    //if ($("#BTN_TYPE").val() == "OPEN") {
                                    //    if (total == 0 || total == "" || total == undefined) {
                                    //        var RowIndex = grid.dataSource._data[no].RowIndexHiden;
                                    //        var dataSource2 = grid3.dataSource;
                                    //        var BillDt = grid4.dataSource._data[item].BillDate;
                                    //        BillDt.setHours(10, 40, 40, 000);
                                    //        dataSource2.add({
                                    //            ReferenceTypeName: ReferenceTypeName,
                                    //            ReferenceName: ReferenceName,
                                    //            BillDate: BillDt,
                                    //            Duedate: Duedate,
                                    //            Depit: Depit,
                                    //            Credit: Credit,
                                    //            AC_ID: RowIndex
                                    //        });
                                    //    }
                                    //}

                                }
                            }
                           
                            //

                        }
                     
                        debugger;
                        $.ajax({
                            type: "POST",
                            url: "/GLTransaction/PendingBillNM",
                            cache: false,
                            async: false,
                            charset: 'utf-8',
                            data: "ID=" + AccountID,
                            success: function (data) {
                                $("#PendingBillGrid").data("kendoGrid").dataSource.read();
                            }
                        });
                        Total(e);
                        var DepitV = grid.dataSource._data[no].Depit;
                        var CreditV = grdd2.value;

                        var grid1 = $("#Popupgrid").data('kendoGrid');
                        var dataSource = grid1.dataSource;
                        if (grid1.dataSource.data().length == 0 || grid1.dataSource.data().length == undefined) {

                            if (DepitV != 0 && CreditV == 0) {
                                $("#differenceAmount").text("D/C Difference: " + Number(DepitV.toString().replace(/,/g, '')).toFixed(2));
                            }
                            else if (DepitV == 0 && CreditV != 0) {
                                $("#differenceAmount").text("D/C Difference: " + Number(CreditV.toString().replace(/,/g, '')).toFixed(2));
                            }
                        }
                        else {

                            $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
                        }
                        billrow(e);
                        POpTotal(e);
                        var window = $("#BillDetails");
                        var kWnd = window.data("kendoWindow");
                        kWnd.center().open();
                        return false;
                    }
                    else if (grid.dataSource._data[no].BillDeatil_IND == 0) {

                    }
                }
                else {
                    $("#AlertMessageHdn").val("Debit & Credit  Value Zero.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                    return false;
                }
            }
            else if (keyCode == 40) {

                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var total = grid.dataSource.data().length;
                if (total == undefined) {
                    total = 0;
                }
                var no1 = total - 1;
                var keyCode = (e.keyCode ? e.keyCode : e.which);

                if (no1 == no) {

                    grid.dataSource._data[no].Credit = Number(CreditVal.toString().replace(/,/g, ''));
                    var B_IND = $("#B_IND").val();
                    var dcval = $("#dcval").val();
                    var dropdownval = $("#dropdownval").val();
                    var DefaultCurrency = $("#DefaultCurrency").val();
                    var grid = $("#grid").data("kendoGrid");
                    var TransDate = $("#Date").val();
                    var dataSource = grid.dataSource;
                    var total = grid.dataSource.data().length;
                    var no = (total - 1);
                    if (total != 0 || total != undefined) {
                        var no = (total - 1);
                        var Amount1 = "0";
                        var Amount2 = "0";
                        var item = 0;
                        for (; item < total; item++) {
                            var value = grid.dataSource._data[item].Depit;
                            var value2 = grid.dataSource._data[item].Credit;
                            if (value == null) value = "0";
                            if (value2 == null) value2 = "0";
                            if (value != null && value2 != null) {
                                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
                            }
                        }
                        if (Amount1 != null && Amount2 != null) {
                            TotalValue = (Amount1 - Amount2)
                        }
                        var DepitTotal = Amount1 + Amount2;
                        var CreditTotal = Amount2 + Amount1;
                        var finalTotal = Number(DepitTotal.toString().replace(/,/g, '')) - Number(CreditTotal.toString().replace(/,/g, ''));
                        $("#differenceAmountgrid").text(Number(finalTotal.toString().replace(/,/g, '')).toFixed(2));
                        var PURConvrate = $("#PURConvertRate").val();
                        var ForgAmount = "0";
                    }
                    $("#DepitTotal").val(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
                    $("#CreditTotal").val(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
                    if (grid.dataSource.data().length != 0 || grid.dataSource.data().length != undefined) {
                        var FirstRowCurrency = grid.dataSource._data[0].Currency;
                        if (FirstRowCurrency == DefaultCurrency) {
                            var conButton = "R";
                        }
                        else {
                            var conButton = "P";
                        }
                        if (0 >= TotalValue && (DepitVal != 0 || CreditVal != 0)) {

                            if (grid._data[no].AC_NM != null && grid._data[no].AC_NM != "") {

                                if (0 <= TotalValue) {
                                    dataSource.add({ DC: "DR", AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                    if (FirstRowCurrency == DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").hide();
                                    }
                                    else if (FirstRowCurrency != DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").show();
                                        ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                        $("#Purchase").show();
                                        $("#Sale").hide();
                                        $("#PURConvertRate").show();
                                        $("#SALEConvertRate").hide();
                                        $("#ConvertButton").val("Purchase");
                                    }
                                }
                                else if (0 > TotalValue) {
                                    var Sum = -(TotalValue);
                                    dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                    if (FirstRowCurrency == DefaultCurrency) {
                                        $("#ForeignCurrencyDIV").hide();
                                    }
                                    else if (FirstRowCurrency != DefaultCurrency) {
                                        ForgAmount = Number(Sum.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                        $("#ForeignCurrencyDIV").show();
                                        $("#Purchase").show();
                                        $("#Sale").hide();
                                        $("#PURConvertRate").show();
                                        $("#SALEConvertRate").hide();
                                        $("#ConvertButton").val("Purchase");
                                    }
                                }
                            }
                            else {
                                $("#AlertMessageHdn").val("Select Account Name.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && (DepitVal != 0 || CreditVal != 0)) {
                            if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total });
                                if (FirstRowCurrency == DefaultCurrency) {
                                    $("#ForeignCurrencyDIV").hide();
                                }
                                else if (FirstRowCurrency != DefaultCurrency) {
                                    ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                                    $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                                    $("#ForeignCurrencyDIV").show();
                                    $("#Purchase").show();
                                    $("#Sale").hide();
                                    $("#PURConvertRate").show();
                                    $("#SALEConvertRate").hide();
                                    $("#ConvertButton").val("Purchase");
                                }
                            }
                            else {
                                $("#AlertMessageHdn").val("Select Account Name.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && (DepitVal == 0 || CreditVal == 0)) {
                            $("#AlertMessageHdn").val('Please Select Account Name and Enter Debit & Credit value.');
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && (DepitVal != 0 || CreditVal != 0)) {
                            $("#AlertMessageHdn").val("Select Account Name.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM != null && (DepitVal == 0 || CreditVal == 0)) {
                            $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                    }
                    var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                    var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                    var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
                    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
                    $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                    $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
                }
                else {
                    if (arrows.indexOf(e.keyCode) >= 0) {
                        setTimeout(function () {
                            data.select($("#grid_active_cell").closest("tr"));
                        }, 1);
                    }
                    return true;
                }
            }
        }
    }
    else if (grdd == null && grdd1 == null && grdd2 == null && grdd3 != null && grdd4 == null) {
        if (grdd3.id == "AC_NM") {
            if (keyCode == 40) {

                NextRowCreation(e);
            }
            else {
                //var datasource = $("#grid2").data("kendoGrid").dataSource;

                //$(e.container).find('input[name="AC_NM"]').focusout();
                //$(e.container).find('input[name="AC_NM"]').blur(); alert("2");

                if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || keyCode == 32 || (keyCode >= 97 && keyCode <= 122)
                    || ((specialkeys.indexOf(e.keyCode) != -1) && e.charCode != e.keyCode)) {
                    $("#grid").data("kendoGrid").closeCell();
                    $('[name="AC_NM"]', e.container).blur(function () { return true; });
                    var grd = $("#grid").data("kendoGrid");
                    grd._selectedIds = {};
                    grd.clearSelection();
                    //grd.refresh();

                    AccountGrid(key);
                }

            }
        }
    }
    else if (grdd == null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 != null) {
        if (grdd4.id == "Narration") {
            if (keyCode == 40) {

                NextRowCreation(e);
            }
            else {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#NarrationValue").val(grid._data[no].Narration);
                $("#NarrationValue").focus();
                var window = $("#Narrationpop");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
                $("#NarrationValue").trigger("click");
            }
        }
    }
    else if (grdd == null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 == null
        && (grdd5 != null || grdd7 != null)) {
        if (grdd5.id == "CheckNoStr" || grdd7.id == "RefrNo") {
            if (keyCode == 40) {

                NextRowCreation(e);
            }
        }
    }

});
function NextRowCreation(e) {

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var DepitVal = grid.dataSource._data[no].Depit;
    var CreditVal = grid.dataSource._data[no].Credit;
    var no1 = total - 1;
    var keyCode = (e.keyCode ? e.keyCode : e.which);

    if (no1 == no) {

        var B_IND = $("#B_IND").val();
        var dcval = $("#dcval").val();
        var dropdownval = $("#dropdownval").val();
        var DefaultCurrency = $("#DefaultCurrency").val();
        var grid = $("#grid").data("kendoGrid");
        var TransDate = $("#Date").val();
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        var no = (total - 1);
        if (total != 0 || total != undefined) {
            var no = (total - 1);
            var Amount1 = "0";
            var Amount2 = "0";
            var item = 0;
            for (; item < total; item++) {
                var value = grid.dataSource._data[item].Depit;
                var value2 = grid.dataSource._data[item].Credit;
                if (value == null) value = "0";
                if (value2 == null) value2 = "0";
                if (value != null && value2 != null) {
                    Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                    Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
                }
            }
            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2)
            }
            var DepitTotal = Amount1 + Amount2;
            var CreditTotal = Amount2 + Amount1;
            var finalTotal = Number(DepitTotal.toString().replace(/,/g, '')) - Number(CreditTotal.toString().replace(/,/g, ''));
            $("#differenceAmountgrid").text(Number(finalTotal).toFixed(2));
            var PURConvrate = $("#PURConvertRate").val();
            var ForgAmount = "0";
        }
        $("#DepitTotal").val(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
        $("#CreditTotal").val(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
        if (grid.dataSource.data().length != 0 || grid.dataSource.data().length != undefined) {
            var FirstRowCurrency = grid.dataSource._data[0].Currency;
            if (FirstRowCurrency == DefaultCurrency) {
                var conButton = "R";
            }
            else {
                var conButton = "P";
            }
            if (0 >= TotalValue && DepitVal != 0 || CreditVal != 0) {

                if (grid._data[no].AC_NM != null && grid._data[no].AC_NM != "") {

                    if (0 <= TotalValue) {
                        dataSource.add({ DC: "DR", AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                        if (FirstRowCurrency == DefaultCurrency) {
                            $("#ForeignCurrencyDIV").hide();
                        }
                        else if (FirstRowCurrency != DefaultCurrency) {
                            $("#ForeignCurrencyDIV").show();
                            ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                            $("#Purchase").show();
                            $("#Sale").hide();
                            $("#PURConvertRate").show();
                            $("#SALEConvertRate").hide();
                            $("#ConvertButton").val("Purchase");
                        }
                    }
                    else if (0 > TotalValue) {
                        var Sum = -(TotalValue);
                        dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                        if (FirstRowCurrency == DefaultCurrency) {
                            $("#ForeignCurrencyDIV").hide();
                        }
                        else if (FirstRowCurrency != DefaultCurrency) {
                            ForgAmount = Number(Sum.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                            $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                            $("#ForeignCurrencyDIV").show();
                            $("#Purchase").show();
                            $("#Sale").hide();
                            $("#PURConvertRate").show();
                            $("#SALEConvertRate").hide();
                            $("#ConvertButton").val("Purchase");
                        }
                    }
                }
                else {
                    $("#AlertMessageHdn").val("Select Account Name.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
            else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && DepitVal != 0 || CreditVal != 0) {
                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                    dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                    if (FirstRowCurrency == DefaultCurrency) {
                        $("#ForeignCurrencyDIV").hide();
                    }
                    else if (FirstRowCurrency != DefaultCurrency) {
                        ForgAmount = Number(TotalValue.toString().replace(/,/g, '')) / Number(PURConvrate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                        $("#ForeignCurrencyDIV").show();
                        $("#Purchase").show();
                        $("#Sale").hide();
                        $("#PURConvertRate").show();
                        $("#SALEConvertRate").hide();
                        $("#ConvertButton").val("Purchase");
                    }
                }
                else {
                    $("#AlertMessageHdn").val("Select Account Name.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
            else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && DepitVal == 0 || CreditVal == 0) {
                $("#AlertMessageHdn").val('Please Select Account Name and Enter Debit & Credit value.');
                $("#alertType").val('fail');
                AlertMesaage();
            }
            else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && DepitVal != 0 || CreditVal != 0) {
                $("#AlertMessageHdn").val("Select Account Name.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
            else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM != null && DepitVal == 0 || CreditVal == 0) {
                $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }

        var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
    }
    else {
        if (arrows.indexOf(e.keyCode) >= 0) {
            setTimeout(function () {
                data.select($("#grid_active_cell").closest("tr"));
            }, 1);
        }
        return true;
    }


}
$("#grid table").on("keypress", "td", function (e) {

    var charCode = e.which || e.keyCode;
    if (charCode == 46)
        return true
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
});

//// END Depit & Credit Editable False Function   
$("#grid table").on("change", "td", function (e) {

    var keyCode = (e.keyCode ? e.keyCode : e.which);
    var key = e.key;
    var grdd1 = document.getElementById("Depit");
    var grdd2 = document.getElementById("Credit");
    var grdd3 = document.getElementById("Currency");
    var DefaultCurrency = $("#DefaultCurrency").val();

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    var value = grid.dataSource._data[no].DC;
    var RowIndexHiden = grid.dataSource._data[no].RowIndexHiden;

    if (grdd1 != null && grdd2 == null && grdd3 == null) {
        if (grdd1.id == "Depit") {
            var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
            $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
            $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
        }
    }
    else if (grdd1 == null && grdd2 != null && grdd3 == null) {
        if (grdd2.id == "Credit") {
            var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
            $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
            $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
        }
    }
    else if (grdd1 == null && grdd2 == null && grdd3 != null) {
        if (grdd3.id == "Currency") {

            //  var currencyVAL = grid.dataSource._data[no].Currency;
            grid._data[no].Depit = 0;
            grid._data[no].Credit = 0;
            var id = grdd3.value;
            $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(0).toFixed(2));
            $("#curridd").text(id);
            if (id != DefaultCurrency) {
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/ForeignCurrency",
                    async: false,
                    data: "Currency=" + id,
                    success: function (data) {
                        $("#ForeignCurrNM").val(data.d.ForeignCurrNM);
                        $("#PURConvertRate").val(Number(data.d.PURConvertRate).toFixed(2));
                        $("#SALEConvertRate").val(Number(data.d.SALEConvertRate).toFixed(2));
                        $("#ForcurAmount").val(Number(0).toFixed(2));
                        // Access the row that is selected
                        var select = grid.dataSource._data[no].Depit;
                        var select2 = grid.dataSource._data[no].Credit;
                        grid.dataSource._data[no].Depit = 0;
                        grid.dataSource._data[no].Credit = 0;
                        grid._data[no].ConvertButton = "P";
                        grid.closeCell();
                        grid.refresh();

                        var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                        var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                        var finalDiff = Number(depitfinTotal - CreditfinTotal);
                        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

                        // grid.refocusLastEditedCell();                               
                        removeBill(RowIndexHiden);
                    }
                });
                $("#ForeignCurrencyDIV").show();
            }
            else if (id == DefaultCurrency) {
                grid._data[no].Depit = 0;
                grid.dataSource._data[no].Credit = 0;
                grid.dataSource._data[no].ConvertButton = "R";
                grid.dataSource._data[no].Currency = id;
                $("#ForeignCurrencyDIV").hide();
                grid.closeCell();
                grid.refresh();
                var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
            }
        }
    }


    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    $("#TemRowIndex").val(no)
    $("#RowIndexHiden").val(rowIndex);
    var dataSource = grid.dataSource;
    var DefaultCurrency = $("#DefaultCurrency").val();
    var id = grid.dataSource._data[no].Currency;
    var INTVAL = grid.dataSource._data[no].INdVal;
    var dt = grid.dataSource._data[no].Depit;
    var Ct = grid.dataSource._data[no].Credit;
    var DC = grid.dataSource._data[no].DC;
    if (INTVAL == "1") {
        if (dt != 0 || dt != "" || dt != null) {
            $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(dt.toString().replace(/,/g, '')).toFixed(2));
        }
        else {
            $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(Ct.toString().replace(/,/g, '')).toFixed(2));
        }
        var grid2 = $("#AnalysisGrid").data("kendoGrid");
        grid2.cancelChanges();

        grid2.dataSource.data([]);
        var grid3 = $("#AnalysisHiddenGrid").data('kendoGrid');
        var dataSource2 = grid2.dataSource;
        var total = grid3.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var item = 0;
        for (; item < total; item++) {
            var A_IND_VAl = grid3.dataSource._data[item].A_IND_VAl;
            var B_IND_VAl = grid3.dataSource._data[item].B_IND_VAl;
            var C_IND_VAl = grid3.dataSource._data[item].C_IND_VAl;
            var D_IND_VAl = grid3.dataSource._data[item].D_IND_VAl;
            var E_IND_VAl = grid3.dataSource._data[item].E_IND_VAl;
            var F_IND_VAl = grid3.dataSource._data[item].F_IND_VAl;
            var L_IND_VAl = grid3.dataSource._data[item].L_IND_VAl;
            var M_IND_VAl = grid3.dataSource._data[item].M_IND_VAl;
            var N_IND_VAl = grid3.dataSource._data[item].N_IND_VAl;
            var O_IND_VAl = grid3.dataSource._data[item].O_IND_VAl;
            var AnalysisAMt = grid3.dataSource._data[item].AnalysisAMt;
            var RowIndexHiden = grid3.dataSource._data[item].RowIndexHiden;
            if (rowIndex == RowIndexHiden) {
                dataSource2.add({ A_IND_VAl: A_IND_VAl, B_IND_VAl: B_IND_VAl, C_IND_VAl: C_IND_VAl, D_IND_VAl: D_IND_VAl, E_IND_VAl: E_IND_VAl, F_IND_VAl: F_IND_VAl, L_IND_VAl: L_IND_VAl, M_IND_VAl: M_IND_VAl, N_IND_VAl: N_IND_VAl, O_IND_VAl: O_IND_VAl, AnalysisAMt: AnalysisAMt });
            }
        }
        var Checktotal = grid2.dataSource.data().length;
        if (Checktotal == 0 || Checktotal == undefined) {
            dataSource2.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: "0" });
        }
        return true;
    }

});


function removeBill(rowIndex) {
    var grid2 = $("#HiddenGrid").data('kendoGrid');
    var total2 = grid2.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }
    if (total2 != 0) {
        var item2 = 0;
        for (; item2 < total2; item2++) {
            if (rowIndex == grid2.dataSource._data[item2].AC_ID) {
                var uid = grid2._data[item2].uid;
                // var uid = data[0].uid;
                var row = grid2.table.find('tr[data-uid="' + uid + '"]');
                grid2.select(row);
                grid2.select().each(function () {
                    var dataItem = grid2.dataItem($(this));
                    // grid2.removeRow($(dataItem)); //just gives alert message
                    grid2.dataSource.remove(dataItem);
                })
                item2 = item2 - 1;
                total2 = grid2.dataSource.data().length;
                if (total2 == undefined) {
                    total2 = 0;
                }
            }
        }
    }
    debugger;
    //S.Vijayalakshmi''8/9/20
    //if ($("#BTN_TYPE").val() == "OPEN")
    //{
       
    //    grid2 = $("#openBillGrid").data('kendoGrid');
    //    total2 = grid2.dataSource.data().length;
    //    if (total2 == undefined) {
    //        total2 = 0;
    //    }
    //    if (total2 != 0) {
    //        var item2 = 0;
    //        for (; item2 < total2; item2++) {
    //            if (rowIndex == grid2.dataSource._data[item2].AC_ID) {
    //                var uid = grid2._data[item2].uid;
    //                // var uid = data[0].uid;
    //                var row = grid2.table.find('tr[data-uid="' + uid + '"]');
    //                grid2.select(row);
    //                grid2.select().each(function () {
    //                    var dataItem = grid2.dataItem($(this));
                       
    //                    grid2.dataSource.remove(dataItem);
    //                })
    //                item2 = item2 - 1;
    //                total2 = grid2.dataSource.data().length;
    //                if (total2 == undefined) {
    //                    total2 = 0;
    //                }
    //            }
    //        }
    //    }
    //}
    

    //

}
$("#up").click(function () {

    $("#Purchase").hide();
    $("#Sale").show();
    $("#PURConvertRate").hide();
    $("#SALEConvertRate").show();
    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var SALEConvartRate = $("#SALEConvertRate").val();
    var PURConvartRate = $("#PURConvertRate").val();
    var ForeignAmount = $("#ForcurAmount").val();
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    grid._data[no].ConvertButton = "S";
    var TotalConVAl = (SALEConvartRate * ForeignAmount);
    grid._data[no].PURConvertRate = SALEConvartRate;
    grid._data[no].ForcurAmount = ForeignAmount;
    var Dcval = grid.dataSource._data[no].DC;
    if (Dcval == "DR") {
        grid._data[no].Depit = TotalConVAl;
        grid._data[no].Credit = 0;
        $("#grid").data("kendoGrid").refresh();
    }
    else if (Dcval == "CR") {
        grid._data[no].Credit = TotalConVAl;
        grid._data[no].Depit = 0;
        $("#grid").data("kendoGrid").refresh();
    }
    $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl.toString().replace(/,/g, '')).toFixed(2));
    var total = grid.dataSource.data().length;
    if (total != 0) {
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid.dataSource._data[item].Depit;
            var value2 = grid.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }
        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
    }
    $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue.toString().replace(/,/g, '')).toFixed(2));
    $("#DepitTotal").text(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").text(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
});
$("#down").click(function () {

    $("#Purchase").show();
    $("#Sale").hide();
    $("#PURConvertRate").show();
    $("#SALEConvertRate").hide();
    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var SALEConvartRate = $("#SALEConvertRate").val();
    var PURConvartRate = $("#PURConvertRate").val();
    var ForeignAmount = $("#ForcurAmount").val();

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;

    grid._data[no].ConvertButton = "P";
    var TotalConVAl = (PURConvartRate * ForeignAmount);
    grid._data[no].PURConvertRate = PURConvartRate;
    grid._data[no].ForcurAmount = ForeignAmount;
    var Dcval = grid.dataSource._data[no].DC;
    if (Dcval == "DR") {
        grid._data[no].Depit = TotalConVAl;
        grid._data[no].Credit = 0;
        $("#grid").data("kendoGrid").refresh();
    }
    else if (Dcval == "CR") {
        grid._data[no].Credit = TotalConVAl;
        grid._data[no].Depit = 0;
        $("#grid").data("kendoGrid").refresh();
    }
    $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl.toString().replace(/,/g, '')).toFixed(2));
    var total = grid.dataSource.data().length;
    if (total != 0) {
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid.dataSource._data[item].Depit;
            var value2 = grid.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }

        if (Amount1 != null && Amount2 != null) {

            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
    }
    $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue.toString().replace(/,/g, '')).toFixed(2));
    $("#DepitTotal").text(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").text(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
});
$("#ForcurAmount").focus(function () {
    var forvall = $("#ForcurAmount").val();
    if (forvall == "0.00") {
        $("#ForcurAmount").val("");
    }
    else {
        $("#ForcurAmount").val(forvall);
    }
});
$("#ForcurAmount").keyup(function () {
    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var SALEConvartRate = $("#SALEConvertRate").val();
    var PURConvartRate = $("#PURConvertRate").val();
    var ForeignAmount = $("#ForcurAmount").val();
    var ConvertbuttonType = $("#ConvertButton").val();

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    if (ConvertbuttonType == "Sale") {
        grid._data[no].ConvertButton = "S";
        var TotalConVAl = (SALEConvartRate * ForeignAmount);
        grid._data[no].PURConvertRate = SALEConvartRate;
        grid._data[no].ForcurAmount = ForeignAmount;
    }
    else if (ConvertbuttonType == "Purchase") {
        grid._data[no].ConvertButton = "P";
        var TotalConVAl = (PURConvartRate * ForeignAmount);
        grid._data[no].PURConvertRate = PURConvartRate;
        grid._data[no].ForcurAmount = ForeignAmount;
    }
    $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl.toString().replace(/,/g, '')).toFixed(2));
    var Dcval = grid.dataSource._data[no].DC;
    if (Dcval == "DR") {
        grid._data[no].Depit = TotalConVAl;
        grid._data[no].Credit = 0;

        $("#grid").data("kendoGrid").refresh();
    }
    else if (Dcval == "CR") {
        grid._data[no].Credit = TotalConVAl;
        grid._data[no].Depit = 0;
        $("#grid").data("kendoGrid").refresh();
    }

    var total = grid.dataSource.data().length;
    if (total != 0) {
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid.dataSource._data[item].Depit;
            var value2 = grid.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }

        if (Amount1 != null && Amount2 != null) {

            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
    }
    $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue.toString().replace(/,/g, '')).toFixed(2));
    $("#DepitTotal").text(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
    $("#CreditTotal").text(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
});
$("#ForcurAmount").keypress(function (e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 109 || keyCode == 189 || keyCode == 45 || keyCode == 173) {
        return false;
    }
    var charCode = (e.which) ? e.which : e.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
});

function Jsondate(s) {
    return new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1]));
}

function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
    //return [date.getFullYear(), mnth, day].join("-");
}

$("#BankNm").click(function (e) {
    var window = $("#BankName");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
});

$("#CurrentBalance").click(function (e) {

    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    var AC_ID = grid._data[no].AC_ID;
    var total = grid.dataSource.data().length;
    var AC_NM = grid._data[no].AC_NM;
    $("#LedgNM").text(AC_NM);
    var DC = grid._data[no].DC;
    $("#BaseAMT").text(DC);

    if (total != 0) {
        $.ajax({
            type: "POST",
            async: false,
            url: "/GLTransaction/CurrentBalance",
            data: "ID=" + AC_ID,
            success: function (data) {
                var val = data.d;
                $("#CurrBalance").text(Number(val.toString().replace(/,/g, '')).toFixed(2));
                if (val != 0) {
                    var window = $("#CurrentBalancePOPup");
                    var kWnd = window.data("kendoWindow");
                    kWnd.center().open();
                }
            }
        });
    }
});

$("#grid table").on("click", "tr.k-state-selected", function (e) {
    // debugger;
    if ($("#BTN_TYPE").val() == "OPEN") HiddengridLoad();
    var AnalyHdnGrd = localStorage.getItem("AnalyHdnGrd");
    var pageRev = localStorage.getItem("PageRev");
    if (pageRev == "2" || pageRev == "3") {
        if (AnalyHdnGrd != undefined && AnalyHdnGrd != "" && AnalyHdnGrd != null) {
            AnalyHdnGrd = JSON.parse(AnalyHdnGrd);
            AnalysisHiddenGrd(AnalyHdnGrd);
            localStorage.setItem("AnalyHdnGrd", "");
        }
    }

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    $("#TemRowIndex").val(no)
    $("#RowIndexHiden").val(rowIndex);
    var dataSource = grid.dataSource;
    var DefaultCurrency = $("#DefaultCurrency").val();
    var id = grid.dataSource._data[no].Currency;
    var INTVAL = grid.dataSource._data[no].INdVal;
    var dt = grid.dataSource._data[no].Depit;
    var Ct = grid.dataSource._data[no].Credit;
    var DC = grid.dataSource._data[no].DC;
    var AC_ID = grid.dataSource._data[no].AC_ID;

    if (DC != "") {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/GLLedgerLoadArgs",
            data: "DC=" + DC,
            success: function (data) {
                //$("#grid2").data("kendoGrid").dataSource.read();
            }
        });
    }

    if (dt != 0 && dt != "" && dt != null) {
        $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(dt.toString().replace(/,/g, '')).toFixed(2));
    }
    else {
        $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(Ct.toString().replace(/,/g, '')).toFixed(2));
    }
    var grid2 = $("#AnalysisGrid").data("kendoGrid");
    grid2.cancelChanges();
    grid2.dataSource.data([]);

    var AAcNm = ""; var AAcId = ""; var AAmt = "";
    if (AC_ID != "" && AC_ID != undefined && AC_ID != null) {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/AnlyDefLoad",
            data: "Acid=" + AC_ID,
            async: false,
            success: function (d) {
                if (d != "" && d != undefined && d != null && d != '{}') {
                    var dVal = JSON.parse(d);
                    if (dVal.TrnTy.length != undefined && dVal.TrnTy.length > 0) {
                        var indx = $("#hdnAnlyIndex").val();
                        AAcNm = dVal.TrnTy[0].TC_NM;
                        AAcId = dVal.TrnTy[0].A_C;
                        AAmt = dVal.TrnTy[0].D_P;
                    }
                }
            }
        });
    }

    var grid3 = $("#AnalysisHiddenGrid").data('kendoGrid');
    var dataSource2 = grid2.dataSource;
    var total = grid3.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }



    var item = 0;
    for (; item < total; item++) {
        var A_IND_VAl = grid3.dataSource._data[item].A_IND_VAl;
        var B_IND_VAl = grid3.dataSource._data[item].B_IND_VAl;
        var C_IND_VAl = grid3.dataSource._data[item].C_IND_VAl;
        var D_IND_VAl = grid3.dataSource._data[item].D_IND_VAl;
        var E_IND_VAl = grid3.dataSource._data[item].E_IND_VAl;
        var F_IND_VAl = grid3.dataSource._data[item].F_IND_VAl;
        var L_IND_VAl = grid3.dataSource._data[item].L_IND_VAl;
        var M_IND_VAl = grid3.dataSource._data[item].M_IND_VAl;
        var N_IND_VAl = grid3.dataSource._data[item].N_IND_VAl;
        var O_IND_VAl = grid3.dataSource._data[item].O_IND_VAl;
        var AnalysisAMt = grid3.dataSource._data[item].AnalysisAMt;
        var RowIndexHiden = grid3.dataSource._data[item].RowIndexHiden;
        if (rowIndex == RowIndexHiden) {
            dataSource2.add({
                A_IND_VAl: A_IND_VAl, B_IND_VAl: B_IND_VAl, C_IND_VAl: C_IND_VAl, D_IND_VAl: D_IND_VAl, E_IND_VAl: E_IND_VAl,
                F_IND_VAl: F_IND_VAl, L_IND_VAl: L_IND_VAl, M_IND_VAl: M_IND_VAl, N_IND_VAl: N_IND_VAl, O_IND_VAl: O_IND_VAl, AnalysisAMt: AnalysisAMt
            });
        }
    }
    var Checktotal = grid2.dataSource.data().length;
    if (Checktotal == 0 || Checktotal == undefined) {
        dataSource2.add({ A_IND_VAl: AAcNm, A_IND_ID: AAcId, B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: "0" });
    }

    if (INTVAL == "1") {
        $("#AnalysisGridsts").show();
        $("#AnalysisGridtoolbar").show();
    }
    else {
        $("#AnalysisGridsts").hide();
        $("#AnalysisGridtoolbar").hide();
    }

    if (id != DefaultCurrency) {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/ForeignCurrency",
            data: "Currency=" + id,
            async: false,
            success: function (data) {
                $("#ForeignCurrNM").val(data.d.ForeignCurrNM);
                $("#PURConvertRate").val(Number(data.d.PURConvertRate.toString().replace(/,/g, '')).toFixed(2));
                $("#SALEConvertRate").val(Number(data.d.SALEConvertRate.toString().replace(/,/g, '')).toFixed(2));
                var DepitVal = grid.dataSource._data[no].Depit;
                var CreditVal = grid.dataSource._data[no].Credit;
                var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;

                if (ConvertbuttonType == "S") {
                    var ForgAmount = "0";
                    if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                        ForgAmount = Number(DepitVal.toString().replace(/,/g, '')) / Number(data.d.SALEConvertRate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                    }
                    else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                        ForgAmount = Number(CreditVal.toString().replace(/,/g, '')) / Number(data.d.SALEConvertRate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                    }
                    else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit == 0) {
                        $("#ForcurAmount").val(Number(0).toFixed(2));
                    }
                    $("#Purchase").hide();
                    $("#Sale").show();
                    $("#PURConvertRate").hide();
                    $("#SALEConvertRate").show();
                }
                else if (ConvertbuttonType == "P") {
                    var ForgAmount = "0";
                    if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                        ForgAmount = Number(DepitVal.toString().replace(/,/g, '')) / Number(data.d.PURConvertRate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                    }
                    else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                        ForgAmount = Number(CreditVal.toString().replace(/,/g, '')) / Number(data.d.PURConvertRate.toString().replace(/,/g, ''));
                        $("#ForcurAmount").val(Number(ForgAmount.toString().replace(/,/g, '')).toFixed(2));
                    }
                    else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit == 0) {
                        $("#ForcurAmount").val(Number(0).toFixed(2));
                    }
                    $("#Purchase").show();
                    $("#Sale").hide();
                    $("#PURConvertRate").show();
                    $("#SALEConvertRate").hide();
                }
            }
        });
        $("#curridd").text(id);
        $("#ForeignCurrencyDIV").show();
    }
    else if (id == DefaultCurrency) {
        $("#ForeignCurrencyDIV").hide();
    }
});

$("#grid table").on("dblclick", "tr.k-state-selected", function (e) {
    debugger;
    if ($("#BTN_TYPE").val() == "OPEN") HiddengridLoad();
    var grdd = document.getElementById("AC_NM");
    var grddcd = document.getElementById("AC_CD");
    var grdd1 = document.getElementById("Narration");
    var grdd2 = document.getElementById("Analysis");
    //var Depitv = document.getElementById("Depit");
    //var Creditv = document.getElementById("Credit");
    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    $("#RowIndexHiden").val(rowIndex);
    if (grdd != null || grddcd != null) {

        AccountGrid("");
        //AccountNameLoad();
        //var window = $("#AccName");
        //var kWnd = window.data("kendoWindow");
        //kWnd.center().open();
    }
    else if (grdd1 != null) {
        if (grdd1.id == "Narration" && grdd1 != null && grdd == null && grdd2 == null) {
            var no = rowIndex;
            $("#NarrationValue").val(grid._data[no].Narration);
            $("#NarrationValue").focusin();
            var window = $("#Narrationpop");
            var kWnd = window.data("kendoWindow");
            kWnd.center().open();
        }
    }
});

function error_handler(e) {
    if (e.errors) {
        var message = "Errors:\n";
        $.each(e.errors, function (key, value) {
            if ('errors' in value) {
                $.each(value.errors, function () {
                    message += this + "\n";
                });
            }
        });
    }
}

//Billl Detail..............

function billrow(e) {
    debugger;
    var grid1 = $("#Popupgrid").data('kendoGrid');
    var dataSource = grid1.dataSource;
    var ReferenceNM = $("#ReferenceNM").val();

    if (ReferenceNM == "") {
        ReferenceNM = "NewBillRef";
    }
    var TransactionDate = $("#Date").val();
    if (grid1.dataSource.data().length == 0 || grid1.dataSource.data().length == undefined) {
        //dataSource.add({ ReferenceTypeName: ReferenceNM, BillDate: TransactionDate, Duedate: TransactionDate, Depit: "", Credit: "", AmountPopG: 0 });

        grid1.addRow();
        var roww = $("#Popupgrid").data("kendoGrid").table.find('tr:eq(' + 0 + ')');
        $("#Popupgrid").data("kendoGrid").select(roww);

        var rowData = grid1.dataItem(roww);
        rowData.ReferenceTypeName = ReferenceNM;
        kendoFastReDrawRow(grid1, roww);
        grid1.refresh();
        //$.each(grid1.dataSource._data, function (key, value) {
        //    if ((grid1.dataSource._data.length == 1) && key == 0) {
        //        value.ReferenceTypeName = ReferenceNM;
        //        grid1.refresh();
        //    }
        //});

        footerTotal();
        $("#popNamefieldnm").text("Total: ");
    }

}


function footerTotal() {
    var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
    var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
    if (PopdepitfinTotal != undefined && PopdepitfinTotal != "")
        $("#PopDepitTotal").text(Number(PopdepitfinTotal.toString().replace(/,/g, '')).toFixed(2));
    else $("#PopDepitTotal").text("");
    if (PopCreditfinTotal != undefined && PopCreditfinTotal != "")
        $("#PopCreditTotal").text(Number(PopCreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
    else $("#PopCreditTotal").text("");
}


function Total(e) {
    footerTotal();
    $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
    $("#popNamefieldnm").text("Total: ");

}

function NewRowpopup(e) {
    var grid1 = $("#Popupgrid").data('kendoGrid');
    var dataSource = grid1.dataSource;

    if (ReferenceNM == "") {
        ReferenceNM = "NewBillRef";
    }
    var TransactionDate = $("#Date").val();
    var total = grid1.dataSource.data().length;

    if (total == undefined) {
        total = 0;
    }
    if (total != 0) {
        var no = (total - 1);
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid1.dataSource._data[item].Depit;
            var value2 = grid1.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }
        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
    }
    var diffval = $("#differenceAmount").text();
    var ReferenceNM = $("#ReferenceNM").val();

    if (ReferenceNM == "") {
        ReferenceNM = "NewBillRef";
    }

    var ReferenceNameVal = grid1.dataSource._data[no].ReferenceName;
    var chkfn = "";
    if (ReferenceNameVal != "") {
        var Maingrid = $("#grid").data('kendoGrid');
        var maindataSource = Maingrid.dataSource;
        var MainrowIndex = Maingrid._rowVirtualIndex;
        var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;
        $.ajax({
            type: "POST",
            url: "/GLTransaction/ReferenceNameChk",
            cache: false,
            async: false,
            charset: 'utf-8',
            data: "ReferenceNameVal=" + ReferenceNameVal + "&AC_ID=" + Main_AC_ID,
            success: function (data) {
                if (data.d == "1") {
                    chkfn = "true";
                }
                else if (data.d == "0") {

                    $("#AlertMessageHdn").val("Reference Name already exists...Want to add Date & month to Ref. Name ?");
                    $("#alertType").val('fail');
                    ReferenceMesg();
                    chkfn = "false";
                }
            }
        });
    }

    if (chkfn == "true") {

        if (grid1.dataSource.data().length != 0 || grid1.dataSource.data().length != undefined) {

            if (grid1.dataSource._data[no].ReferenceTypeName != null && grid1.dataSource._data[no].ReferenceName != null && grid1.dataSource._data[no].ReferenceName != "") {
                if (grid1.dataSource._data[no].Depit != 0 || grid1.dataSource._data[no].Credit != 0) {
                    dataSource.add({ ReferenceTypeName: ReferenceNM, ReferenceName: null, BillDate: TransactionDate, Duedate: TransactionDate, Depit: 0, Credit: 0, AmountPopG: 0 });

                    footerTotal();
                    $("#popNamefieldnm").text("Total: ");
                    $("#differenceAmount").text(diffval);
                }
                else {
                    $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
            else {
                $("#AlertMessageHdn").val("Can not Empty value Accepted");
                $("#alertType").val('fail');
                AlertMesaage();
            }
        }
    }
};

function CancelRowPopup(e) {

    var AmountValuee = $("#AmountPop").val();
    $("#differenceAmount").text("D/C Difference: " + Number(AmountValuee.toString().replace(/,/g, '')).toFixed(2));
    $("#PopupDepitTotal").val(Number(0).toFixed(2));
    $("#PopupCreditTotal").val(Number(0).toFixed(2));
    var grid1 = $("#Popupgrid").data("kendoGrid");
    grid1.select().each(function () {
        var dataItem = grid1.dataItem($(this));
        grid1.removeRow($(dataItem)); //just gives alert message
        grid1.dataSource.remove(dataItem);

    })
    var dataSource = grid1.dataSource;
    var total = grid1.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var no = (total - 1);
    if (total != 0) {
        var no = (total - 1);
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid1.dataSource._data[item].Depit == "" ? 0 : grid1.dataSource._data[item].Depit;
            var value2 = grid1.dataSource._data[item].Credit == "" ? 0 : grid1.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }

        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
        var Difference = 0;
        var AmountName = $("#Depicreditval").text();
        if (AmountName == "DR") {
            var lastVal = grid1.dataSource._data[no].Depit;
            var diffval = $("#differenceAmount").text();
            var dd = diffval.replace("D/C Difference: ", "");
            diffval = dd;
            var AmountValuee = $("#AmountPop").val();
            var nettotal = Number(AmountValuee.toString().replace(/,/g, '')) + Number(Amount2.toString().replace(/,/g, ''));
            Difference = Number(nettotal.toString().replace(/,/g, '')) - Number(Amount1.toString().replace(/,/g, ''));
        }
        else if (AmountName == "CR") {
            var lastVal = grid1.dataSource._data[no].Depit;
            var diffval = $("#differenceAmount").text();
            var dd = diffval.replace("D/C Difference: ", "");
            diffval = dd;
            var AmountValuee = $("#AmountPop").val() == "" ? 0 : $("#AmountPop").val();
            var nettotal = Number(AmountValuee.toString().replace(/,/g, '')) - Number(Amount2.toString().replace(/,/g, ''));
            Difference = Number(nettotal.toString().replace(/,/g, '')) + Number(Amount1.toString().replace(/,/g, ''));

        }
        if (Difference != "")
            $("#differenceAmount").text("D/C Difference: " + Number(Difference.toString().replace(/,/g, '')).toFixed(2));
        else $("#differenceAmount").text("0.0");

        footerTotal();

        var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));

    }
}
function ClearRowPopup(e) {
    $("#Popupgrid").data("kendoGrid").cancelChanges();
    var AmountValuee = $("#AmountPop").val();
    $("#differenceAmount").text("D/C Difference: " + Number(AmountValuee.toString().replace(/,/g, '')).toFixed(2));
    footerTotal();

}
$("#Popupgrid table").on("change", "td", function (e) {
    debugger;
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    var key = e.key;
    var grid1 = $("#Popupgrid").data('kendoGrid');
    var dataSource = grid1.dataSource;
    var dataSource = grid1.dataSource;
    var rowIndex = grid1._rowVirtualIndex;
    var no = rowIndex;
    $("#BillgridRowIndexHdn").val(rowIndex);

    var grdd1 = document.getElementById("ReferenceTypeName");
    var grdd2 = document.getElementById("Depit");
    var grdd3 = document.getElementById("Credit");
    if (grdd1 != null && grdd2 == null && grdd3 == null) {
  
        debugger;
        if (grdd1.id == "ReferenceTypeName") {
            debugger;
            var grid1 = $("#Popupgrid").data('kendoGrid');
            var dataSource = grid1.dataSource;
            var rowIndex = grid1._rowVirtualIndex;
            var no = rowIndex;
            var PendingBillGrid = $("#PendingBillGrid").data("kendoGrid");
            var opdataSource = PendingBillGrid.dataSource;
            var dataSource = grid1.dataSource;
            var ID = $("#ReferenceTypeName").val();
            $.ajax({
                type: "POST",
                url: "/GLTransaction/ReferenceChange",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "ID=" + ID,
                success: function (data) {
                    debugger;
                    //  grid1.dataSource._data[no].ReferenceTypeName = data.d;
                    $("#ReferenceTypeNamehdn").val(data.d);
                    var dataval = $("#Popupgrid").data().kendoGrid.dataSource.data()[no];
                   
                    dataval.set("ReferenceTypeName", data.d);
                   
                    var uid = grid1._data[no].uid;
                    var secrow = grid1.table.find('tr[data-uid="' + uid + '"]');
                    grid1.select(secrow);
                }
            });
            if (ID == 3) {
                var grid = $("#grid").data("kendoGrid");
                var PendingBillGrid = $("#PendingBillGrid").data("kendoGrid");

                var Count = PendingBillGrid.dataSource.data().length;
                //  alert(Count);
                if (Count != 0) {
                    var window = $("#PendingBill");
                    var kWnd = window.data("kendoWindow");
                    kWnd.center().open();
                
                }
                
                var exval = $("#AmountPop").val();
                $("#PendAMount").val(exval);
                $("#AmountPopG").val(Number(0).toFixed(2));
                // grid1.dataSource._data[no].ReferenceTypeName = "AgnsBlRef";
            }
            else {
                var datav = $("#Popupgrid").data().kendoGrid.dataSource.data()[no];
                debugger;
              
                datav.set("ReferenceName", "");
                datav.set("Depit", "");
                datav.set("Credit", "");
                grid1.refresh();
            }
        }
        POpTotal(e);
    }
    else if (grdd1 == null && grdd2 != null && grdd3 == null) {
        if (grdd2.id == "Depit") {
            POpTotal(e);
        }
    }

    else if (grdd1 == null && grdd2 == null && grdd3 != null) {
        if (grdd3.id == "Credit") {
            POpTotal(e);
        }
    }

});
function POpTotal(e) {
    debugger;
    var grid1 = $("#Popupgrid").data('kendoGrid');
    var dataSource = grid1.dataSource;
    var total = grid1.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    if (total != 0) {
        var no = (total - 1);
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid1.dataSource._data[item].Depit;
            var value2 = grid1.dataSource._data[item].Credit;
            if (value == null || value == '') value = "0";
            if (value2 == null || value2 == '') value2 = "0";
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }
        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2)
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;
    }
    var Difference = 0;
    var AmountName = $("#Depicreditval").text();
    if (AmountName == "DR") {
        var lastVal = grid1.dataSource._data[no].Depit;
        var diffval = $("#differenceAmount").text();
        var dd = diffval.replace("D/C Difference: ", "");
        diffval = dd;
        var AmountValuee = $("#AmountPop").val();
        var nettotal = Number(AmountValuee.toString().replace(/,/g, '')) + Number(Amount2.toString().replace(/,/g, ''));
        Difference = Number(nettotal.toString().replace(/,/g, '')) - Number(Amount1.toString().replace(/,/g, ''));
    }
    else if (AmountName == "CR") {
        var lastVal = grid1.dataSource._data[no].Depit;
        var diffval = $("#differenceAmount").text();
        var dd = diffval.replace("D/C Difference: ", "");
        diffval = dd;
        var AmountValuee = $("#AmountPop").val();
        var nettotal = Number(AmountValuee.toString().replace(/,/g, '')) - Number(Amount2.toString().replace(/,/g, ''));
        Difference = Number(nettotal.toString().replace(/,/g, '')) + Number(Amount1.toString().replace(/,/g, ''));
    }
    $("#differenceAmount").text("D/C Difference: " + Number(Difference.toString().replace(/,/g, '')).toFixed(2));
    if (Amount1 == "") Amount1 = "0";
    if (Amount2 == "") Amount2 = "0";
    $("#PopDepitTotal").text(Number(Amount1.toString().replace(/,/g, '')).toFixed(2));
    $("#PopCreditTotal").text(Number(Amount2.toString().replace(/,/g, '')).toFixed(2));
}

$("#Popupgrid table").on("blur", "td", function (e) {
    debugger;
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    var key = e.key;
    var grid1 = $("#Popupgrid").data('kendoGrid');
    var dataSource = grid1.dataSource;
    var dataSource = grid1.dataSource;
    var rowIndex = grid1._rowVirtualIndex;
    var no = rowIndex;

    var grdd4 = document.getElementById("BillDate");
    var grdd5 = document.getElementById("Duedate");
    var Depitd = document.getElementById("Depit");
    var Creditd = document.getElementById("Credit");
    var ReferenceName = document.getElementById("ReferenceName");


    if (grdd4 != null && grdd5 == null && ReferenceName == null) {
        if (grdd4.id == "BillDate") {

            var Maingrid = $("#grid").data('kendoGrid');
            var maindataSource = Maingrid.dataSource;
            var MainrowIndex = Maingrid._rowVirtualIndex;

            var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;
            var BDate = grid1.dataSource._data[no].BillDate;
            var BillDate = convert(BDate);
            $.ajax({
                type: "POST",
                url: "/GLTransaction/BillDateCalulate",
                data: "ID=" + Main_AC_ID + "&ID2=" + BillDate,
                async: false,
                success: function (data) {
                    var CreditDays = data.d;
                    grid1.dataSource._data[no].Duedate = Jsondate(CreditDays);
                    POpTotal(e);
                    grid1.refresh();
                }
            });
        }
    }
    else if (grdd4 == null && grdd5 != null && ReferenceName == null) {
        if (grdd5.id == "Duedate") {
            var DueDate = grid1.dataSource._data[no].Duedate;
            var sampledate = $("#Date").val();
            var date1 = sampledate.substring(0, 2);
            var month1 = sampledate.substring(3, 5);
            var year1 = sampledate.substring(6, 10);
            var voucherDate = new Date(year1, month1 - 1, date1);

            if (voucherDate < DueDate) {
                grid1.dataSource._data[no].Duedate = DueDate;
            }
            else if (voucherDate > DueDate) {
                grid1.dataSource._data[no].Duedate = sampledate;
                $("#AlertMessageHdn").val("Due date can not be less than Voucher Date.");
                $("#alertType").val('fail');
                AlertMesaage();
            }
            POpTotal(e);
        }
    }

    else if (grdd4 == null && grdd5 == null && ReferenceName != null && Depitd == null && Creditd == null) {

        if (ReferenceName.id == "ReferenceName") {
            var ReferenceNameVal = grid1.dataSource._data[no].ReferenceName;
            var ReferenceTypeName = grid1.dataSource._data[no].ReferenceTypeName;

            var Maingrid = $("#grid").data('kendoGrid');
            var maindataSource = Maingrid.dataSource;
            var MainrowIndex = Maingrid._rowVirtualIndex;
            var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;

            if (ReferenceTypeName != "AgnsBlRef") {
                if (ReferenceNameVal != "") {
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/ReferenceNameChk",
                        cache: false,
                        async: false,
                        charset: 'utf-8',
                        data: "ReferenceNameVal=" + ReferenceNameVal + "&AC_ID=" + Main_AC_ID,
                        success: function (data) {
                            if (data.d == "1") {
                            }
                            else if (data.d == "0") {
                                $("#AlertMessageHdn").val("Reference Name already exists...Want to add Date & month to Ref. Name ?");
                                $("#alertType").val('fail');
                                ReferenceMesg();
                            }
                        }
                    });
                }
            }
        }
        else if (ReferenceTypeName == "AgnsBlRef") {
            var PopupgridData = $("#Popupgrid").data('kendoGrid');
            var HiddenGriddata = $("#HiddenGrid").data('kendoGrid');
            var Pendinggid = $("#PendingBillGrid").data("kendoGrid");

            var HTotal = HiddenGriddata.dataSource.data().length;
            var Ptotal = Pendinggid.dataSource.data().length;
            var PopupgriTotal = PopupgridData.dataSource.data().length;

            if (HTotal == undefined) {
                HTotal = 0;
            }
            if (PopupgriTotal == undefined) {
                PopupgriTotal = 0;
            }
            if (HTotal != 0) {
                var item2 = 0;
                for (; item2 < HTotal; item2++) {
                    Ptotal = Pendinggid.dataSource.data().length;
                    var RefNAme = HiddenGriddata.dataSource._data[item2].ReferenceName;
                    var itemf = 0;
                    for (; itemf < Ptotal; itemf++) {
                        var RefNAme2 = Pendinggid.dataSource._data[itemf].ReferenceName;
                        if (RefNAme == RefNAme2) {
                            var uid = Pendinggid._data[itemf].uid;
                            var row = Pendinggid.table.find('tr[data-uid="' + uid + '"]');
                            Pendinggid.select(row);
                            Pendinggid.select().each(function () {
                                var dataItem = Pendinggid.dataItem($(this));
                                Pendinggid.dataSource.remove(dataItem);

                            })
                            Ptotal = Pendinggid.dataSource.data().length;
                            break;
                        }
                    }

                }
            }
            if (PopupgriTotal != 0) {
                var item2 = 0;
                for (; item2 < PopupgriTotal; item2++) {
                    Ptotal = Pendinggid.dataSource.data().length;
                    var RefNAme = PopupgridData.dataSource._data[item2].ReferenceName;
                    var itemf = 0;
                    for (; itemf < Ptotal; itemf++) {
                        var RefNAme2 = Pendinggid.dataSource._data[itemf].ReferenceName;
                        if (RefNAme == RefNAme2) {
                            var uid = Pendinggid._data[itemf].uid;
                            var row = Pendinggid.table.find('tr[data-uid="' + uid + '"]');
                            Pendinggid.select(row);
                            Pendinggid.select().each(function () {
                                var dataItem = Pendinggid.dataItem($(this));
                                Pendinggid.dataSource.remove(dataItem);
                            });
                            Ptotal = Pendinggid.dataSource.data().length;
                            break;
                        }
                    }

                }
            }

        }

        POpTotal(e);
    }
    POpTotal(e);
});
function ReferenceMesg() {
    var meg = $("#AlertMessageHdn").val();
    $("#alertMegRef").text(meg);

    var alertty = $("#alertType").val();
    if (alertty == 'fail') {
        $("#alertimgRef").show();
        $("#saveimgRef").hide();
    }
    else {
        $("#saveimgRef").show();
        $("#alertimgRef").hide();
    }
    var window = $("#ReferenceMeg");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function PopupGridedit(e) {
    debugger;
    var grid = $("#Popupgrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex == undefined ? 0 : rowIndex;
    var dataSource = grid.dataSource;

    if (dataSource._data.length == 0)
        return;

    if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
        objbrowserName = "Chrome";
        objfullVersion = objAgent.substring(objOffsetVersion + 7);
        //if ($("#AGNSTBILL").val() == "")
        //{

       
        if (grid.dataSource._data[no] != undefined && grid.dataSource._data[no].Depit != "" && grid.dataSource._data[no].Depit != null) {

            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
        else if (grid.dataSource._data[no] != undefined && grid.dataSource._data[no].Credit != "" && grid.dataSource._data[no].Credit != null) {

            $(e.container).find('input[name="Depit"]').attr("readonly", true);
        }
        else {

            $(e.container).find('input[name="Credit"]').attr("readonly", false);
            $(e.container).find('input[name="Depit"]').attr("readonly", false);
        }
      //  }

        if (grid._data[no] != undefined && grid._data[no].ReferenceTypeName == "AgnsBlRef") {
            $(e.container).find('input[name="ReferenceName"]').attr("readonly", true);
            $(e.container).find('input[name="BillDate"]').attr("readonly", true);
            $(e.container).find('input[name="Duedate"]').attr("readonly", true);
        }
        else {
            $(e.container).find('input[name="ReferenceName"]').attr("readonly", false);
            $(e.container).find('input[name="BillDate"]').attr("readonly", false);
            $(e.container).find('input[name="Duedate"]').attr("readonly", false);
        }
    }
        // In Firefox
    else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
        objbrowserName = "Firefox";

        if (grid.dataSource._data[no].Depit != "" && grid.dataSource._data[no].Depit != null) {

            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
        else if (grid.dataSource._data[no].Credit != "" && grid.dataSource._data[no].Credit != null) {

            $(e.container).find('input[name="Depit"]').attr("readonly", true);
        }
        else {

            $(e.container).find('input[name="Credit"]').attr("readonly", false);
            $(e.container).find('input[name="Depit"]').attr("readonly", false);
        }

        if (grid._data[no].ReferenceTypeName == "AgnsBlRef") {
            $(e.container).find('input[name="ReferenceName"]').attr("readonly", true);
            $(e.container).find('input[name="BillDate"]').attr("readonly", true);
            $(e.container).find('input[name="Duedate"]').attr("readonly", true);
        }
        else {
            $(e.container).find('input[name="ReferenceName"]').attr("readonly", false);
            $(e.container).find('input[name="BillDate"]').attr("readonly", false);
            $(e.container).find('input[name="Duedate"]').attr("readonly", false);
        }
    }
    else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
        objbrowserName = "Microsoft Internet Explorer";
        objfullVersion = objAgent.substring(objOffsetVersion + 5);


        if (grid.dataSource._data[no].Depit != "" && grid.dataSource._data[no].Depit != null) {

            $(e.container).find('input[name="Credit"]').attr("readonly", true);
        }
        else if (grid.dataSource._data[no].Credit != "" && grid.dataSource._data[no].Credit != null) {

            $(e.container).find('input[name="Depit"]').attr("readonly", true);
        }
        else {

            $(e.container).find('input[name="Credit"]').attr("readonly", false);
            $(e.container).find('input[name="Depit"]').attr("readonly", false);
        }
        if (grid.datasource._data[no].ReferenceTypeName == "AgnsBlRef") {

            $(e.container).find('input[name="ReferenceName"]').attr("readonly", true);
            $(e.container).find('input[name="BillDate"]').attr("readonly", true);
            $(e.container).find('input[name="Duedate"]').attr("readonly", true);
        }
        else {
            $(e.container).find('input[name="ReferenceName"]').attr("readonly", false);
            $(e.container).find('input[name="BillDate"]').attr("readonly", false);
            $(e.container).find('input[name="Duedate"]').attr("readonly", false);
        }
    }
    else {

        if (grid.dataSource._data[no].Depit != "" && grid.dataSource._data[no].Depit != null) {

            $(e.container).find('input[name="Credit"]').attr("disabled", true);
        }
        else if (grid.dataSource._data[no].Credit != "" && grid.dataSource._data[no].Credit != null) {

            $(e.container).find('input[name="Depit"]').attr("disabled", true);
        }
        else {

            $(e.container).find('input[name="Credit"]').attr("disabled", false);
            $(e.container).find('input[name="Depit"]').attr("disabled", false);
        }

        if (grid.dataSource._data[no].ReferenceTypeName == "AgnsBlRef") {

            $(e.container).find('input[name="ReferenceName"]').attr("disabled", true);
            $(e.container).find('input[name="BillDate"]').attr("disabled", true);
            $(e.container).find('input[name="Duedate"]').attr("disabled", true);
        }
        else {
            $(e.container).find('input[name="ReferenceName"]').attr("disabled", false);
            $(e.container).find('input[name="BillDate"]').attr("disabled", false);
            $(e.container).find('input[name="Duedate"]').attr("disabled", false);
        }
    }
    $(e.container).find('input[name="AmountPopG"]').attr("disabled", true);
}

$("#Popupgrid table").on("keydown", "tr", function (e) {
    debugger;
    var grid = $("#Popupgrid").data("kendoGrid");
    var grdd1 = document.getElementById("Depit");
    var grdd2 = document.getElementById("Credit");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var no1 = total - 1;
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    var DepitVal = 0;
    var CreditVal = 0;
    if (grdd1 != null && grdd2 == null) {
        DepitVal = grdd1.value;
        CreditVal = grid.dataSource._data[no].Credit;
    }
    else
        if (grdd1 == null && grdd2 != null) {
            DepitVal = grid.dataSource._data[no].Depit;
            CreditVal = grdd2.value;
        }

    CreditVal = (CreditVal == "" || CreditVal == null) ? 0 : CreditVal;
    DepitVal = (DepitVal == "" || DepitVal == null) ? 0 : DepitVal;
    if (keyCode == 40) {
        if (no == no1) {
            grid.dataSource._data[no].Depit = Number(DepitVal == "" ? 0 : DepitVal.toString().replace(/,/g, ''));
            grid.dataSource._data[no].Credit = Number(CreditVal == "" ? 0 : CreditVal.toString().replace(/,/g, ''));

            var ReferenceNameVal = grid.dataSource._data[no].ReferenceName;
            var ReferenceTypeName = grid.dataSource._data[no].ReferenceTypeName;
            var grid1 = $("#Popupgrid").data('kendoGrid');
            var chkk = "false";
            var total = grid1.dataSource.data().length;
            if (total == undefined) {
                total = 0;
            }
            if (total != 0) {
                if (total > 1) {
                    var no = (total - 1);
                    var item = 0;
                    for (; item < no; item++) {
                        if (ReferenceNameVal == grid1.dataSource._data[item].ReferenceName) {
                            chkk = "true";
                            break;
                        }
                    }
                }
            }

            if (ReferenceTypeName == "AgnsBlRef") {
                chkk = "false";
            }
            if (chkk == "false") {
                if (ReferenceNameVal != "") {
                    var Maingrid = $("#grid").data('kendoGrid');
                    var maindataSource = Maingrid.dataSource;
                    var MainrowIndex = Maingrid._rowVirtualIndex;
                    var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;

                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/ReferenceNameChk",
                        cache: false,
                        async: false,
                        charset: 'utf-8',
                        data: "ReferenceNameVal=" + ReferenceNameVal + "&AC_ID=" + Main_AC_ID,
                        success: function (data) {

                            if (ReferenceTypeName == "AgnsBlRef") {
                                data.d = "1";
                            }
                            if (data.d == "1") {

                                var grid1 = $("#Popupgrid").data('kendoGrid');
                                var dataSource = grid1.dataSource;

                                if (ReferenceNM == "") {
                                    ReferenceNM = "NewBillRef";
                                }
                                var TransactionDate = $("#Date").val();
                                var total = grid1.dataSource.data().length;

                                if (total == undefined) {
                                    total = 0;
                                }
                                if (total != 0) {
                                    var no = (total - 1);
                                    var Amount1 = "0";
                                    var Amount2 = "0";
                                    var item = 0;
                                    for (; item < total; item++) {
                                        var value = grid1.dataSource._data[item].Depit;
                                        var value2 = grid1.dataSource._data[item].Credit;
                                        if (value != null && value2 != null) {
                                            Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                                            Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
                                        }
                                    }
                                    if (Amount1 != null && Amount2 != null) {
                                        TotalValue = (Amount1 - Amount2)
                                    }
                                    var DepitTotal = Amount1;
                                    var CreditTotal = Amount2;
                                }

                                var diffval = $("#differenceAmount").text();
                                var ReferenceNM = $("#ReferenceNM").val();

                                if (ReferenceNM == "") {
                                    ReferenceNM = "NewBillRef";
                                }
                                if (grid1.dataSource.data().length != 0 || grid1.dataSource.data().length != undefined) {

                                    if (grid1.dataSource._data[no].ReferenceTypeName != null && grid1.dataSource._data[no].ReferenceName != null && grid1.dataSource._data[no].ReferenceName != "") {
                                        if (DepitVal != 0 || CreditVal != 0 || DepitVal != "" || CreditVal != "") {
                                            //dataSource.add({ ReferenceTypeName: ReferenceNM, ReferenceName: null, BillDate: TransactionDate, Duedate: TransactionDate, Depit: "", Credit: "", AmountPopG: 0 });
                                            grid1.addRow();

                                            $.each(grid1.dataSource._data, function (key, value) {

                                                if (key == (grid1.dataSource._data.length - 1)) {
                                                    value.ReferenceTypeName = ReferenceNM;
                                                    return;
                                                }
                                            });

                                            footerTotal();

                                            $("#popNamefieldnm").text("Total: ");
                                            $("#differenceAmount").text(diffval);
                                        }
                                        else {
                                            $("#AlertMessageHdn").val("D/C Value(s) found Empty.");
                                            $("#alertType").val('fail');
                                            AlertMesaage();
                                        }
                                    }
                                    else {
                                        $("#AlertMessageHdn").val("Can not Empty value Accepted");
                                        $("#alertType").val('fail');
                                        AlertMesaage();
                                    }
                                }
                            }
                            else if (data.d == "0") {
                                $("#AlertMessageHdn").val("Reference Name already exists...Want to add Date & month to Ref. Name ?");
                                $("#alertType").val('fail');
                                ReferenceMesg();
                            }
                        }
                    });

                }
                else if (chkk == "true") {
                    $("#AlertMessageHdn").val("Reference Name Already exist..!");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
        }
    }

    return true;
});

$("#Popupgrid table").on("focus", "td", function (e) {

    var grid = $("#Popupgrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    $("#RowIndexHidenPopup").val(rowIndex);
});

$("#Okpop").click(function (e) {
    debugger;

    //     $("#Popupgrid").data('kendoGrid').dataSource.data([]);

    var grid = $("#PendingBillGrid").data("kendoGrid");
    var dataSource = grid.dataSource;
    var grid2 = $("#Popupgrid").data("kendoGrid");
    var dataSource2 = grid2.dataSource;
    TotalBill = grid2.dataSource.data().length;
    var itemBill = 0;

  




    //S.VijayaLakshmi''9/7/20
    var filter = $("#PendingBillGrid").data("kendoGrid").dataSource.filter()
    var allData = $("#PendingBillGrid").data("kendoGrid").dataSource.data();
    var query = new kendo.data.Query(allData);
    var filtereddata = query.filter(filter).data;
    //
    var total = 0;
    if (filtereddata.length == grid.dataSource.data().length) {
        total = grid.dataSource.data().length;
    }
    else {
        total = filtereddata.length;
    }
    //if (TotalBill != 0)
    //{
    //    var decBill = TotalBill - 1;
    //    var it=0;
    //      for (; itemBill < TotalBill; itemBill++) {
    //    //for (itemBill = TotalBill - 1; 0; itemBill--) {
    //          debugger;
    //          it =  decBill;
    //        var ReferenceTypeName1 = grid2.dataSource._data[it].ReferenceTypeName;
    //        var Credit = grid2.dataSource._data[it].Credit;
    //        if ((ReferenceTypeName1 == "AgnsBlRef" || ReferenceTypeName1 == "" || ReferenceTypeName1 == "3")) {
    //            var uid = grid2._data[it].uid;
    //            var row = grid2.table.find('tr[data-uid="' + uid + '"]');
    //            grid2.select(row);
    //            grid2.select().each(function () {
    //                var dataItem = grid2.dataItem($(this));
    //                grid2.dataSource.remove(dataItem);
    //            })
    //        }
    //        decBill = decBill - 1;
    //    }
    //    grid2.refresh();

    //}
    if (TotalBill > 0)
    {
        var uid = grid2._data[TotalBill - 1].uid;
        var row = grid2.table.find('tr[data-uid="' + uid + '"]');
        grid2.select(row);
        grid2.select().each(function () {
            var dataItem = grid2.dataItem($(this));
            grid2.dataSource.remove(dataItem);
        })
    }
    TotalBill = grid2.dataSource.data().length;
  

    if (total != 0) {
        

        var no = (total - 1);
        var Amount1 = "0";
        var it = 0;
        var item = 0;
        var checkrowdel = "";
        if (filtereddata.length == grid.dataSource.data().length) {
            for (; it < total; it++) {
                if (grid.dataSource._data[it].Select == true) {
                    checkrowdel = "1";
                }
            }
        }
        else {
            for (; it < total; it++) {
                if (filtereddata[it].Select == true) {
                    checkrowdel = "1";
                }
            }
        }

        if (checkrowdel == "1") {
           
                //grid2.select().each(function () {
                //    var dataItem = grid2.dataItem($(this));
                //    grid2.dataSource.remove(dataItem);
                //})
           
          
            if (filtereddata.length == grid.dataSource.data().length) {
                for (; item < total; item++) {
                    if (grid.dataSource._data[item].Select == true) {
                        var ReferenceName = grid.dataSource._data[item].ReferenceName;
                        var Duedate = grid.dataSource._data[item].Duedate;
                        var AmountPop = grid.dataSource._data[item].AmountPop;
                        var SnoBill = grid.dataSource._data[item].SnoBill;
                        var DC = grid.dataSource._data[item].DC;
                        var itemBill = 0;
                        var ExistRow = "";

                        if (TotalBill > 0)
                        {
                            for (; itemBill < TotalBill; itemBill++) {
                                
                                debugger;
                                it = itemBill;
                                var ReferenceTypeName1 = grid2.dataSource._data[it].ReferenceTypeName;
                                var ReferenceName1 = grid2.dataSource._data[it].ReferenceName;
                                var Credit = grid2.dataSource._data[it].Credit;
                                if ((ReferenceTypeName1 == "AgnsBlRef" || ReferenceTypeName1 == "" || ReferenceTypeName1 == "3") && $.trim(ReferenceName)==$.trim(ReferenceName1)) {
                                    ExistRow = "1";
                                    break;
                                }
                               
                                      
                            }
                            grid2.refresh();
                        }
                        //else
                        //{
                        //    if (TotalBill == "1")
                        //    {
                        //        var Credit = grid2.dataSource._data[0].Credit;
                        //        var Depit = grid2.dataSource._data[0].Depit;
                        //        if ((parseFloat(Credit) <= 0 && parseFloat(Depit) <= 0 )|| (Depit==null && Credit==null)) 
                        //        {
                        //            grid2.select().each(function () {
                        //                var dataItem = grid2.dataItem($(this));
                        //                grid2.dataSource.remove(dataItem);
                        //            })
                        //        }
                               

                        //    }

                        //}
                        
                        var itemBill = 0;
                        if (ExistRow == "")
                        {
                            if (DC == "DR") {
                                dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: 0, Credit: AmountPop, SnoBill: SnoBill,CBY:"",CDT:"",ADJBY:"",ADJDT:"" });
                                var uid = grid._data[item].uid;
                                var row = grid.table.find('tr[data-uid="' + uid + '"]');
                                var row1 = grid2.table.find('tr[data-uid="' + uid + '"]');
                                row1.find('input[name="Credit"]').attr("readonly", true);
                            }
                            else {
                                dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: AmountPop, Credit: 0, SnoBill: SnoBill, CBY: "", CDT: "", ADJBY: "", ADJDT: "" });
                                var uid = grid._data[item].uid;
                                var row = grid.table.find('tr[data-uid="' + uid + '"]');
                                var row1 = grid2.table.find('tr[data-uid="' + uid + '"]');
                                row1.find('input[name="Depit"]').attr("readonly", true);

                            }
                        }
                        


                    }
                }
            }
            else {
                for (; item < total; item++) {
                    if (filtereddata[item].Select == true) {
                        var ReferenceName = filtereddata[item].ReferenceName;
                        var Duedate = filtereddata[item].Duedate;
                        var AmountPop = filtereddata[item].AmountPop;
                        var SnoBill = filtereddata[item].SnoBill;
                        var DC = filtereddata[item].DC;
                        var itemBill = 0;
                        var ExistRow = "";

                        if (TotalBill > 0) {
                            for (; itemBill < TotalBill; itemBill++) {

                                debugger;
                                it = itemBill;
                                var ReferenceTypeName1 = grid2.dataSource._data[it].ReferenceTypeName;
                                var ReferenceName1 = grid2.dataSource._data[it].ReferenceName;
                                var Credit = grid2.dataSource._data[it].Credit;
                                if ((ReferenceTypeName1 == "AgnsBlRef" || ReferenceTypeName1 == "" || ReferenceTypeName1 == "3") && $.trim(ReferenceName) == $.trim(ReferenceName1)) {
                                    ExistRow = "1";
                                    break;

                                }
                               


                            }
                            grid2.refresh();
                        }
                        //else {
                        //    if (TotalBill == "1") {
                        //        var Credit = grid2.dataSource._data[0].Credit;
                        //        var Depit = grid2.dataSource._data[0].Depit;
                        //        if ((parseFloat(Credit) <= 0 && parseFloat(Depit) <= 0 )|| (Depit==null && Credit==null)) {
                        //            grid2.select().each(function () {
                        //                var dataItem = grid2.dataItem($(this));
                        //                grid2.dataSource.remove(dataItem);
                        //            })
                        //        }


                        //    }

                        //}
                        if (ExistRow == "")
                        {
                            if (DC == "DR") {
                                dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: 0, Credit: AmountPop, SnoBill: SnoBill, CBY: "", CDT: "", ADJBY: "", ADJDT: "" });
                                var uid = filtereddata[item].uid;

                                //  var row = grid.table.find('tr[data-uid="' + uid + '"]');

                            }
                            else {
                                dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: AmountPop, Credit: 0, SnoBill: SnoBill, CBY: "", CDT: "", ADJBY: "", ADJDT: "" });
                                var uid = filtereddata[item].uid;
                                // var row = grid.table.find('tr[data-uid="' + uid + '"]');

                            }
                        }
                       

                    }
                }
            }
            grid2.refresh();
            $("#AGNSTBILL").val("1");
            POpTotal(e);

          

            var window = $("#PendingBill");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();
        }
        else {

            $("#AlertMessageHdn").val("Select any one Bill..!");
            $("#alertType").val('fail');
            AlertMesaage();
        }
    }

});
$("#Done").click(function (e) {
    debugger;
    var diffval = $("#differenceAmount").text();
    var AmountPop = $("#AmountPop").val();
    var BTN_TYPE = $("#BTN_TYPE").val();
    var dd = diffval.replace("D/C Difference: ", "");
    diffval = dd;
    var Maingrid = $("#grid").data('kendoGrid');
    var maindataSource = Maingrid.dataSource;
    var MainrowIndex = Maingrid._rowVirtualIndex;
    var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;

    var grid = $("#Popupgrid").data('kendoGrid');
    var grid2 = $("#HiddenGrid").data('kendoGrid');
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var RowIndex = $("#sample").val();
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var dataSource2 = grid2.dataSource;
    var total2 = grid2.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }
    var gridpop = $("#Popupgrid").data('kendoGrid');
    var rowIndexPop = gridpop._rowVirtualIndex;
    var ReferenceName = document.getElementById("ReferenceName");
    var bool = true;
    if (ReferenceName.id == "ReferenceName") {
        var ReferenceNameVal = gridpop.dataSource._data[rowIndexPop].ReferenceName;
        var ReferenceTypeName = gridpop.dataSource._data[rowIndexPop].ReferenceTypeName;


        if (ReferenceTypeName != "AgnsBlRef") {
            if (ReferenceNameVal != "") {
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/ReferenceNameChk",
                    cache: false,
                    async: false,
                    charset: 'utf-8',
                    data: "ReferenceNameVal=" + ReferenceNameVal + "&AC_ID=" + Main_AC_ID,
                    success: function (data) {
                        if (data.d == "1") {
                        }
                        else if (data.d == "0") {
                            bool = false;
                            $("#AlertMessageHdn").val("Reference Name already exists...Want to add Date & month to Ref. Name ?");
                            $("#alertType").val('fail');
                            ReferenceMesg();
                            return false;
                        }
                    }
                });
            }
        }
    }
    if (bool == false) return false;

    if (total2 != 0) {
        var item2 = 0;
        for (; item2 < total2; item2++) {
            if (RowIndex == grid2.dataSource._data[item2].AC_ID) {
                var uid = grid2._data[item2].uid;
                // var uid = data[0].uid;
                var row = grid2.table.find('tr[data-uid="' + uid + '"]');
                grid2.select(row);
                grid2.select().each(function () {
                    var dataItem = grid2.dataItem($(this));
                    // grid2.removeRow($(dataItem)); //just gives alert message
                    grid2.dataSource.remove(dataItem);
                })
                item2 = item2 - 1;
                total2 = grid2.dataSource.data().length;
                if (total2 == undefined) {
                    total2 = 0;
                }
            }
        }
    }


    var Rowemptychk = "";
    var Valuechk = "";
    var ReferenceNameDuplication = "0";
    if (total != 0) {
        var item3 = 0;

        for (; item3 < total; item3++) {
            if (grid.dataSource._data[item3].ReferenceTypeName.toString().toLowerCase() == "agnsblref" && (grid.dataSource._data[item3].ReferenceTypeName == null || grid.dataSource._data[item3].ReferenceName == null || grid.dataSource._data[item3].ReferenceName == undefined || grid.dataSource._data[item3].ReferenceName == "")) {
                Rowemptychk = "false";
                break;
            }
            if ((grid.dataSource._data[item3].Depit == "" && grid.dataSource._data[item3].Credit == "") || (grid.dataSource._data[item3].Depit == "" && grid.dataSource._data[item3].Credit == null) || (grid.dataSource._data[item3].Depit ==null && grid.dataSource._data[item3].Credit == "")  || (grid.dataSource._data[item3].Depit == null && grid.dataSource._data[item3].Credit == null)) {
                Valuechk = "false";
                break;
            }
            if (BTN_TYPE == "NEW") {

                $.each(grid.dataSource._data, function (key, value) {
                    var _match = $.grep(grid.dataSource._data, function (elementVal, index) {
                        return elementVal.ReferenceName == value.ReferenceName && value.ReferenceTypeName != "agnsblref";
                    });
                    if (_match.length > 1) {
                        // debugger;
                        ReferenceNameDuplication = "1";
                        return;
                    }
                });

                $.each(grid.dataSource._data, function (key, value) {
                    var _match = $.grep(grid2.dataSource._data, function (elementVal, index) {
                        return elementVal.ReferenceName == value.ReferenceName && value.ReferenceTypeName != "agnsblref";
                    });
                    if (_match.length > 0) {
                        // debugger;
                        ReferenceNameDuplication = "1";
                        return;
                    }
                });

                //if (ReferenceNameDuplication != "1") {
                //    if (total2 != 0) {
                //        debugger;
                //        var ite = 0;
                //        for (; ite < total2; ite++) {
                //            if (grid.dataSource._data[item3].ReferenceName == grid2.dataSource._data[ite].ReferenceName
                //                && grid.dataSource._data[item3].SnoBill != grid2.dataSource._data[ite].AC_ID) {
                //                ReferenceNameDuplication = "1";
                //                break;
                //            }
                //        }
                //    }
                //}
            }
        }

        if (Rowemptychk != "") {
            $("#AlertMessageHdn").val("Reference Name Can not be empty..!");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
        if (Valuechk != "") {
            $("#AlertMessageHdn").val("Enter Debit or Credit Value..!");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
        if (ReferenceNameDuplication != "0") {
            $("#AlertMessageHdn").val("Reference Name Already Exist..!");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }

        if (diffval != "0.00") {
            var totCredit = 0; var totDepit = 0;
            $.each(grid.dataSource._data, function (key, value) {
                totCredit += (value.Credit != "" && value.Credit != null) ? parseFloat((value.Credit).toString().replace(/,/g, '')) : 0;
                totDepit += (value.Depit != "" && value.Depit != null) ? parseFloat((value.Depit).toString().replace(/,/g, '')) : 0;
               
            });

            var grdMain = $("#grid").data("kendoGrid");
            var rowIndexMain = grdMain._rowVirtualIndex;
            var noMain = rowIndexMain;

            var Amount = AmountPop == "" ? 0 : parseFloat(AmountPop.toString().replace(/,/g, ''));
            var totDiff = 0;
            if (grdMain.dataSource._data[noMain].DC == "DR")
                totDiff = (Amount - (totDepit - totCredit));
            else totDiff = (Amount - (totCredit - totDepit));


            var tempDef1 = (totDepit - totCredit).toFixed(2);

            if (((grdMain.dataSource._data[noMain].DC == "DR") && (parseFloat(tempDef1.toString().replace(/,/g, '')) < 0)) || ((grdMain.dataSource._data[noMain].DC == "CR") && (parseFloat(tempDef1.toString().replace(/,/g, '')) > 0))) {
                $("#AlertMessageHdn").val("Difference " + diffval + "/- found..!");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }

            var aganist = 0;
            var _match = $.grep(grid.dataSource._data, function (elementVal, index) {
                return elementVal.ReferenceTypeName.toString().toLowerCase() == "agnsblref";
            });
            if (_match.length > 0) {
                aganist = 1;
            }

            if (aganist == 1 || aganist == 0) {
                $("#AlertMessageHdn").val("Difference Amount: " + diffval + "/-" + "found? Proced with update?");
                $("#alertType").val('fail');
                AlertMesaageConfirmation();
            }
            else {
                $("#AlertMessageHdn").val("Amount cannot be grater than Ref.Bill Amt " + AmountPop + "..!");
                $("#alertType").val('fail');
                AlertMesaage();
            }
            return false;
        }

        var item = 0;
        debugger;
        for (; item < total; item++) {
            var ReferenceName = grid.dataSource._data[item].ReferenceName;
            var ReferenceTypeName = grid.dataSource._data[item].ReferenceTypeName;
            var BillDate = grid.dataSource._data[item].BillDate;
            var Duedate = grid.dataSource._data[item].Duedate;
            var Depit = grid.dataSource._data[item].Depit;
            var Credit = grid.dataSource._data[item].Credit;
            var RowIndex = $("#sample").val();
            var CBY = grid.dataSource._data[item].CBY;
            var CDT = grid.dataSource._data[item].CDT;
            var ADJBY = grid.dataSource._data[item].ADJBY;
            var ADJDT = grid.dataSource._data[item].ADJDT;
            dataSource2.add({
                ReferenceTypeName: ReferenceTypeName,
                ReferenceName: ReferenceName,
                BillDate: BillDate,
                Duedate: Duedate,
                Depit: Depit,
                Credit: Credit,
                AC_ID: RowIndex,
                CBY: CBY,
                CDT: CDT,
                ADJBY: ADJBY,
                ADJDT: ADJDT

            });
            
        }
        var window = $("#BillDetails");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    }

    // if (diffval == "0.00") {
    //    $("#AlertMessageHdn").val("D/C Difference should be equal Zero..!");
    //    $("#alertType").val('fail');
    //    AlertMesaage();
    //}
});

$("#Close").click(function () {
    var window = $("#BillDetails");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
});

/////Analysis Pop code
$('#AnalysisACCGrid').on("dblclick", "td", function (e) {
    var grid = $("#AnalysisGrid").data("kendoGrid");
    var grid2 = $("#AnalysisACCGrid").data("kendoGrid");
    var Rowindex = grid2._rowVirtualIndex;
    var value = grid2._data[Rowindex].TC_NM;
    var ID = grid2._data[Rowindex].TC_ID;
    var Rowindex2 = grid._rowVirtualIndex;
    var indval = $("#INdVal").val();
    if (indval == "1") {
        grid._data[Rowindex2].A_IND_VAl = value;
        grid._data[Rowindex2].A_IND_ID = ID;
    }
    else if (indval == "2") {
        grid._data[Rowindex2].B_IND_VAl = value;
        grid._data[Rowindex2].B_IND_ID = ID;
    }
    else if (indval == "3") {
        grid._data[Rowindex2].C_IND_VAl = value;
        grid._data[Rowindex2].C_IND_ID = ID;
    }
    else if (indval == "4") {
        grid._data[Rowindex2].D_IND_VAl = value;
        grid._data[Rowindex2].D_IND_ID = ID;
    }
    else if (indval == "5") {
        grid._data[Rowindex2].E_IND_VAl = value;
        grid._data[Rowindex2].E_IND_ID = ID;
    }
    else if (indval == "6") {
        grid._data[Rowindex2].F_IND_VAl = value;
        grid._data[Rowindex2].F_IND_ID = ID;
    }
    else if (indval == "7") {
        grid._data[Rowindex2].L_IND_VAl = value;
        grid._data[Rowindex2].L_IND_ID = ID;
    }
    else if (indval == "8") {
        grid._data[Rowindex2].M_IND_VAl = value;
        grid._data[Rowindex2].M_IND_ID = ID;
    }
    else if (indval == "9") {
        grid._data[Rowindex2].N_IND_VAl = value;
        grid._data[Rowindex2].N_IND_ID = ID;
    }
    else if (indval == "10") {
        grid._data[Rowindex2].O_IND_VAl = value;
        grid._data[Rowindex2].O_IND_ID = ID;
    }
    grid.refresh();
    var window = $("#AnalysisACC");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
});

$("#AnalysisHiddenGrid").hide();
function AnaSave(e) {
    var valigrid = $("#AnalysisGrid").data("kendoGrid");
    var ValrowIndex = valigrid._rowVirtualIndex;
    var noo = ValrowIndex;
    var totall = valigrid.dataSource.data().length;
    if (totall == undefined) {
        totall = 0;
    }
    var no1 = totall - 1;
    var item = 0;
    var validatae = false;
    var len = valigrid.columns.length;
    var check = "";
    for (; item < len; item++) {
        if (valigrid.columns[item].hidden == undefined) {
            var fieldval = valigrid.columns[item].field;
            if (fieldval == "A_IND_VAl") {
                check = valigrid._data[no1].A_IND_VAl;
            }
            else if (fieldval == "B_IND_VAl") { check = valigrid._data[no1].B_IND_VAl; }
            else if (fieldval == "C_IND_VAl") { check = valigrid._data[no1].C_IND_VAl; }
            else if (fieldval == "D_IND_VAl") { check = valigrid._data[no1].D_IND_VAl; }
            else if (fieldval == "E_IND_VAl") { check = valigrid._data[no1].E_IND_VAl; }
            else if (fieldval == "F_IND_VAl") { check = valigrid._data[no1].F_IND_VAl; }
            else if (fieldval == "L_IND_VAl") { check = valigrid._data[no1].L_IND_VAl; }
            else if (fieldval == "M_IND_VAl") { check = valigrid._data[no1].M_IND_VAl; }
            else if (fieldval == "N_IND_VAl") { check = valigrid._data[no1].N_IND_VAl; }
            else if (fieldval == "O_IND_VAl") { check = valigrid._data[no1].O_IND_VAl; }
            else if (fieldval == "AnalysisAMt") { check = valigrid._data[no1].AnalysisAMt; }
            if (check != "") {
                validatae = true;
            }
            else {
                validatae = false;
                break;
            }
        }
    }
    var diffval = $("#AnalysisBalance").val();
    if (diffval == "0.00") {
        $("#AnalysisGrid th").removeClass("hdcolor2");
        $("#AnalysisGrid th").addClass("hdcolor1");
        if (validatae == true) {
            var grid = $("#AnalysisGrid").data('kendoGrid');
            var grid2 = $("#AnalysisHiddenGrid").data('kendoGrid');
            var RowIndex = $("#TemRowIndex").val();
            var dataSource = grid.dataSource;
            var total = grid.dataSource.data().length;
            if (total == undefined) {
                total = 0;
            }
            var dataSource2 = grid2.dataSource;
            var total2 = grid2.dataSource.data().length;
            if (total2 == undefined) {
                total2 = 0;
            }
            if (total2 != 0) {
                var item2 = 0;
                for (; item2 < total2; item2++) {
                    if (RowIndex == grid2.dataSource._data[item2].RowIndexHiden) {
                        var uid = grid2._data[item2].uid;
                        // var uid = data[0].uid;
                        var row = grid2.table.find('tr[data-uid="' + uid + '"]');
                        grid2.select(row);
                        grid2.select().each(function () {
                            var dataItem = grid2.dataItem($(this));
                            // grid2.removeRow($(dataItem)); //just gives alert message
                            grid2.dataSource.remove(dataItem);
                        })
                        item2 = item2 - 1;
                        total2 = grid2.dataSource.data().length;
                        if (total2 == undefined) {
                            total2 = 0;
                        }
                    }
                }
            }
            var item = 0;
            for (; item < total; item++) {
                var A_IND_VAl = grid.dataSource._data[item].A_IND_VAl;
                var A_IND_ID = grid.dataSource._data[item].A_IND_ID;
                var B_IND_VAl = grid.dataSource._data[item].B_IND_VAl;
                var B_IND_ID = grid.dataSource._data[item].B_IND_ID;
                var C_IND_VAl = grid.dataSource._data[item].C_IND_VAl;
                var C_IND_ID = grid.dataSource._data[item].C_IND_ID;
                var D_IND_VAl = grid.dataSource._data[item].D_IND_VAl;
                var D_IND_ID = grid.dataSource._data[item].D_IND_ID;
                var E_IND_VAl = grid.dataSource._data[item].E_IND_VAl;
                var E_IND_ID = grid.dataSource._data[item].E_IND_ID;
                var F_IND_VAl = grid.dataSource._data[item].F_IND_VAl;
                var F_IND_ID = grid.dataSource._data[item].F_IND_ID;
                var L_IND_VAl = grid.dataSource._data[item].L_IND_VAl;
                var L_IND_ID = grid.dataSource._data[item].L_IND_ID;
                var M_IND_VAl = grid.dataSource._data[item].M_IND_VAl;
                var M_IND_ID = grid.dataSource._data[item].M_IND_ID;
                var N_IND_VAl = grid.dataSource._data[item].N_IND_VAl;
                var N_IND_ID = grid.dataSource._data[item].N_IND_ID;
                var O_IND_VAl = grid.dataSource._data[item].O_IND_VAl;
                var O_IND_ID = grid.dataSource._data[item].O_IND_ID;
                var AnalysisAMt = grid.dataSource._data[item].AnalysisAMt;
                var RowIndex = $("#TemRowIndex").val();
                dataSource2.add({ RowIndexHiden: RowIndex, A_IND_VAl: A_IND_VAl, B_IND_VAl: B_IND_VAl, C_IND_VAl: C_IND_VAl, D_IND_VAl: D_IND_VAl, E_IND_VAl: E_IND_VAl, F_IND_VAl: F_IND_VAl, L_IND_VAl: L_IND_VAl, M_IND_VAl: M_IND_VAl, N_IND_VAl: N_IND_VAl, O_IND_VAl: O_IND_VAl, A_IND_ID: A_IND_ID, B_IND_ID: B_IND_ID, C_IND_ID: C_IND_ID, D_IND_ID: D_IND_ID, E_IND_ID: E_IND_ID, F_IND_ID: F_IND_ID, L_IND_ID: L_IND_ID, M_IND_ID: M_IND_ID, N_IND_ID: N_IND_ID, O_IND_ID: O_IND_ID, AnalysisAMt: AnalysisAMt });
            }
            $("#AnalysisGrid th").removeClass("hdcolor2");
            $("#AnalysisGrid th").addClass("hdcolor1");
            grid2.refresh();
        }
        else {
            //----------Change Header Color---------------- 
            $("#AnalysisGrid th").removeClass("hdcolor1");
            $("#AnalysisGrid th").addClass("hdcolor2");

        }
    }
    else if (diffval != "0.00") {
        //----------Change Header Color----------------          
        $("#AnalysisGrid th").removeClass("hdcolor1");
        $("#AnalysisGrid th").addClass("hdcolor2");
    }
}

$("#Exit").click(function () {
    var window = $("#AnalysisVal");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
});
$('#AnalysisGrid').on("blur", "td", function (e) {

    var grid = $("#AnalysisGrid").data("kendoGrid");
    var grdd = document.getElementById("AnalysisAMt");
    if (grdd != null) {
        if (grdd.id == "AnalysisAMt") {
            var grid2 = $("#grid").data("kendoGrid");
            var rowind = grid2._rowVirtualIndex;
            var total = grid.dataSource.data().length;
            if (total == undefined) {
                total = 0;
            }

            if (total != 0) {
                var Amount1 = "0";
                var item = 0;
                for (; item < total; item++) {
                    var value = grid.dataSource._data[item].AnalysisAMt;
                    if (value != null && value != "" && value != undefined) {
                        Amount1 = parseFloat(Amount1.toString().replace(/,/g, '')) + parseFloat(value.toString().replace(/,/g, ''));
                    }
                    $("#AnalysisTotal").val(Number(Amount1.toString().replace(/,/g, '')).toFixed(2));
                    var analy = grid2._data[rowind].Depit;
                    analy = (analy == "" || analy == null || analy == undefined) ? 0 : analy;
                    var analy2 = grid2._data[rowind].Credit;
                    analy2 = (analy2 == "" || analy2 == null || analy2 == undefined) ? 0 : analy2;
                    if (analy != 0) {
                        var balancee = parseFloat(analy.toString().replace(/,/g, '')) - parseFloat(Amount1.toString().replace(/,/g, ''));
                        $("#AnalysisBalance").val(parseFloat(balancee.toString().replace(/,/g, '')).toFixed(2));
                    }
                    else if (analy2 != 0) {
                        var balancee = parseFloat(analy2.toString().replace(/,/g, '')) - parseFloat(Amount1.toString().replace(/,/g, ''));
                        $("#AnalysisBalance").val(parseFloat(balancee.toString().replace(/,/g, '')).toFixed(2));
                    }
                }
            }
            AnaSave(e);
        }
    }
});
function editval(e) {
    var valigrid = $("#AnalysisGrid").data("kendoGrid");
    if (valigrid.dataSource._data.length > 0) {
        var ValrowIndex = valigrid._rowVirtualIndex;
        var no1 = ValrowIndex;

        var item = 0;
        var validatae = false;
        var len = valigrid.columns.length;
        var check = "";
        for (; item < len; item++) {
            if (valigrid.columns[item].hidden == undefined) {
                var fieldval = valigrid.columns[item].field;
                if (fieldval == "A_IND_VAl") {
                    check = valigrid._data[no1].A_IND_VAl;
                }
                else if (fieldval == "B_IND_VAl") { check = valigrid._data[no1].B_IND_VAl; }
                else if (fieldval == "C_IND_VAl") { check = valigrid._data[no1].C_IND_VAl; }
                else if (fieldval == "D_IND_VAl") { check = valigrid._data[no1].D_IND_VAl; }
                else if (fieldval == "E_IND_VAl") { check = valigrid._data[no1].E_IND_VAl; }
                else if (fieldval == "F_IND_VAl") { check = valigrid._data[no1].F_IND_VAl; }
                else if (fieldval == "L_IND_VAl") { check = valigrid._data[no1].L_IND_VAl; }
                else if (fieldval == "M_IND_VAl") { check = valigrid._data[no1].M_IND_VAl; }
                else if (fieldval == "N_IND_VAl") { check = valigrid._data[no1].N_IND_VAl; }
                else if (fieldval == "O_IND_VAl") { check = valigrid._data[no1].O_IND_VAl; }
                if (check != "") {
                    validatae = true;
                }
                else {
                    validatae = false;
                    break;
                }
            }
        }

        if (validatae == false) {
            if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
                $(e.container).find('input[name="AnalysisAMt"]').attr("readonly", true);

            }
                // In Microsoft internet explorer
            else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
                objbrowserName = "Microsoft Internet Explorer";
                objfullVersion = objAgent.substring(objOffsetVersion + 5);
                $(e.container).find('input[name="AnalysisAMt"]').attr("disabled", true);
            }
                // In Firefox
            else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
                objbrowserName = "Firefox";
                (e.container).find('input[name="AnalysisAMt"]').attr("readonly", true);
            }

            else {
                $(e.container).find('input[name="AnalysisAMt"]').attr("disabled", true);
            }
        }
        else if (validatae == true) {

            if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
                $(e.container).find('input[name="AnalysisAMt"]').attr("readonly", false);

            }
                // In Microsoft internet explorer
            else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
                objbrowserName = "Microsoft Internet Explorer";
                objfullVersion = objAgent.substring(objOffsetVersion + 5);
                $(e.container).find('input[name="AnalysisAMt"]').attr("disabled", false);

            }
                // In Firefox
            else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
                objbrowserName = "Firefox";
                (e.container).find('input[name="AnalysisAMt"]').attr("readonly", false);

            }

            else {
                $(e.container).find('input[name="AnalysisAMt"]').attr("disabled", false);
            }
        }

        $(e.container).find('input[name="A_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="B_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="C_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="D_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="E_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="F_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="L_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="M_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="N_IND_VAl"]').attr("readOnly", true);
        $(e.container).find('input[name="O_IND_VAl"]').attr("readOnly", true);

        var A = document.getElementById("A_IND_VAl");
        var B = document.getElementById("B_IND_VAl");
        var C = document.getElementById("C_IND_VAl");
        var D = document.getElementById("D_IND_VAl");
        var E = document.getElementById("E_IND_VAl");
        var F = document.getElementById("F_IND_VAl");
        var L = document.getElementById("L_IND_VAl");
        var M = document.getElementById("M_IND_VAl");
        var N = document.getElementById("N_IND_VAl");
        var O = document.getElementById("O_IND_VAl");
        var idVAL = "";

        if (A != null || B != null || C != null || D != null || E != null || F != null || L != null || M != null || N != null || O != null) {
            if (A != null) idVAL = "A";
            else if (B != null) idVAL = "B";
            else if (C != null) idVAL = "C";
            else if (D != null) idVAL = "D";
            else if (E != null) idVAL = "E";
            else if (F != null) idVAL = "F";
            else if (L != null) idVAL = "L";
            else if (M != null) idVAL = "M";
            else if (N != null) idVAL = "N";
            else if (O != null) idVAL = "O";
            var grid2 = $("#AnalysisGrid").data("kendoGrid");
            $.ajax({
                type: "POST",
                url: "/GLTransaction/AnalysisAcNmValuee",
                data: "ID=" + idVAL,
                async: false,
                success: function (data) {
                    var val = data.d;
                    $("#INdVal").val(val);
                    $("#AnalysisACCGrid").data("kendoGrid").dataSource.read();
                    var window = $("#AnalysisACC");
                    var kWnd = window.data("kendoWindow");
                    kWnd.center().open();
                }
            });
        }
    }
}

$("#AnalysisGrid table").on("keyup", "tr", function (e) {
    var AnaAMT = "";
    var grdd = document.getElementById("AnalysisAMt");
    if (grdd != null) {
        if (grdd.id == "AnalysisAMt") {
            AnaAMT = grdd.value;
        }
    }
    var grid = $("#AnalysisGrid").data("kendoGrid");
    var grid2 = $("#AnalysisHiddenGrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var dataSource = grid.dataSource;
    var dataSource2 = grid2.dataSource;
    var no1 = total - 1;
    var item = 0;
    var validatae = false;
    var len = grid.columns.length;
    var check = "";
    grid._data[no1].AnalysisAMt = Number(AnaAMT).toFixed(2);
    for (; item < len; item++) {
        if (grid.columns[item].hidden == undefined) {
            var fieldval = grid.columns[item].field;
            if (fieldval == "A_IND_VAl") {
                check = grid._data[no1].A_IND_VAl;
            }
            else if (fieldval == "B_IND_VAl") { check = grid._data[no1].B_IND_VAl; }
            else if (fieldval == "C_IND_VAl") { check = grid._data[no1].C_IND_VAl; }
            else if (fieldval == "D_IND_VAl") { check = grid._data[no1].D_IND_VAl; }
            else if (fieldval == "E_IND_VAl") { check = grid._data[no1].E_IND_VAl; }
            else if (fieldval == "F_IND_VAl") { check = grid._data[no1].F_IND_VAl; }
            else if (fieldval == "L_IND_VAl") { check = grid._data[no1].L_IND_VAl; }
            else if (fieldval == "M_IND_VAl") { check = grid._data[no1].M_IND_VAl; }
            else if (fieldval == "N_IND_VAl") { check = grid._data[no1].N_IND_VAl; }
            else if (fieldval == "O_IND_VAl") { check = grid._data[no1].O_IND_VAl; }
            else if (fieldval == "AnalysisAMt") { check = AnaAMT; }
            if (check != "") {
                validatae = true;
            }
            else {
                validatae = false;
                break;
            }
        }
    }

    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 40) {
        if (no1 == no) {
            if (validatae == true) {
                dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: 0 });
            }
            else {
                $("#AnalysisGrid th").addClass("hdcolor2");
            }
        }
        else {
            return true;
        }
    }
    return true;
});
//// bANK sEARCH nAME
$('#BankGrid').on("click", "td", function (e) {

    var grid = $("#BankGrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    $("#BankNM").val(grid._data[no].BankNM);
    $("#BankID").val(grid._data[no].BankID);
    $("#BranchNM").val(grid._data[no].BranchNM);
});
//// END POPUP  Value Assign Function 
//// START POPUP  CLOSE
$('#BankGrid').on("dblclick", "td.k-state-selected", function (e) {

    var window = $("#BankName");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
    $('#BankGrid').data("kendoGrid").refresh();
});
/////mESSAGE
$("#No").click(function (e) {
    var window = $("#Message");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
});

$("#Yes").click(function (e) {
    var DRCRval = $("#Depicreditval").text();
    var Maingrid = $("#grid").data('kendoGrid');
    var diffval = $("#differenceAmount").text();
    var dd = diffval.replace("D/C Difference: ", "");
    diffval = dd;
    var AmountValuee = $("#AmountPop").val();
    var maingridAmt = Number(AmountValuee.toString().replace(/,/g, '')) - Number(diffval.toString().replace(/,/g, ''));
    if (maingridAmt != 0) {
        var grid = $("#Popupgrid").data('kendoGrid');
        var grid2 = $("#HiddenGrid").data('kendoGrid');
        var postUrl;
        var paramValue;
        var gridValue = $("#Popupgrid").data("kendoGrid").dataSource.data();
        var gridData = $("#Popupgrid").data('kendoGrid').dataSource.data();
        var RowIndex = $("#sample").val();
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        var dataSource2 = grid2.dataSource;
        var total2 = grid2.dataSource.data().length;
        if (total2 == undefined) {
            total2 = 0;
        }
        if (total2 != 0) {
            var item2 = 0;
            for (; item2 < total2; item2++) {
                if (RowIndex == grid2.dataSource._data[item2].AC_ID) {
                    var uid = grid2._data[item2].uid;
                    // var uid = data[0].uid;
                    var row = grid2.table.find('tr[data-uid="' + uid + '"]');
                    grid2.select(row);
                    grid2.select().each(function () {
                        var dataItem = grid2.dataItem($(this));
                        grid2.dataSource.remove(dataItem);
                    })
                    item2 = item2 - 1;
                    total2 = grid2.dataSource.data().length;
                }
            }
        }
        var item = 0;
        for (; item < total; item++) {
            var ReferenceName = grid.dataSource._data[item].ReferenceName;
            var ReferenceTypeName = grid.dataSource._data[item].ReferenceTypeName;
            var BillDate = grid.dataSource._data[item].BillDate;
            var Duedate = grid.dataSource._data[item].Duedate;
            var Depit = grid.dataSource._data[item].Depit;
            var Credit = grid.dataSource._data[item].Credit;
            var CBY = grid.dataSource._data[item].CBY;
            var CDT = grid.dataSource._data[item].CDT;
            var ADJBY = grid.dataSource._data[item].ADJBY;
            var ADJDT = grid.dataSource._data[item].ADJDT;
            var RowIndex = $("#sample").val();
            dataSource2.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: RowIndex, CBY: CBY, CDT: CDT, ADJBY: ADJBY, ADJDT: ADJDT });
        }
        var window = $("#Message");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();

        var window2 = $("#BillDetails");
        var kWnd2 = window2.data("kendoWindow");
        kWnd2.center().close();
        if (maingridAmt < 0) {
            maingridAmt = Number(-1) * Number(maingridAmt.toString().replace(/,/g, ''));
        }
        if (DRCRval == "DR") {
            Maingrid._data[RowIndex].Depit = maingridAmt;
        }
        else if (DRCRval == "CR") {
            Maingrid._data[RowIndex].Credit = maingridAmt;
        }
        Maingrid.refresh();
    }
    else {
        $("#AlertMessageHdn").val("Already Value Equal to Zero.");
        $("#alertType").val('fail');
        AlertMesaage();
        var window = $("#Message");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();

        var window2 = $("#BillDetails");
        var kWnd2 = window2.data("kendoWindow");
        kWnd2.center().close();
    }
    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    var value = grid.dataSource._data[no].DC;
    var total = grid.dataSource.data().length;
    if (total != 0) {
        var Amount1 = "0";
        var Amount2 = "0";
        var item = 0;
        for (; item < total; item++) {
            var value = grid.dataSource._data[item].Depit;
            var value2 = grid.dataSource._data[item].Credit;
            if (value != null && value2 != null) {
                Amount1 = Number(Amount1.toString().replace(/,/g, '')) + Number(value.toString().replace(/,/g, ''));
                Amount2 = Number(Amount2.toString().replace(/,/g, '')) + Number(value2.toString().replace(/,/g, ''));
            }
        }
        if (Amount1 != null && Amount2 != null) {
            TotalValue = (Amount1 - Amount2);
        }
        var DepitTotal = Amount1;
        var CreditTotal = Amount2;

        $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue.toString().replace(/,/g, '')).toFixed(2));
        $("#DepitTotal").text(Number(DepitTotal.toString().replace(/,/g, '')).toFixed(2));
        $("#CreditTotal").text(Number(CreditTotal.toString().replace(/,/g, '')).toFixed(2));
    }
});

$("#CnlCfm").click(function (e) {
    var window = $("#AlertConfirm");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();

    var window = $("#BillDetails");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
});

$("#yesCfm").click(function (e) {
    debugger;
    var diffval = $("#differenceAmount").text();
    var AmountPop = $("#AmountPop").val();
    var BTN_TYPE = $("#BTN_TYPE").val();
    var dd = diffval.replace("D/C Difference: ", "");
    diffval = dd;
    var grid = $("#Popupgrid").data('kendoGrid');
    var grid2 = $("#HiddenGrid").data('kendoGrid');
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var RowIndex = $("#sample").val();
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    if (total == undefined) {
        total = 0;
    }
    var dataSource2 = grid2.dataSource;
    var total2 = grid2.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }

    if (total != 0) {

        if (total2 != 0) {
            var item2 = 0;
            for (; item2 < total2; item2++) {
                if (RowIndex == grid2.dataSource._data[item2].AC_ID) {
                    var uid = grid2._data[item2].uid;
                    // var uid = data[0].uid;
                    var row = grid2.table.find('tr[data-uid="' + uid + '"]');
                    grid2.select(row);
                    grid2.select().each(function () {
                        var dataItem = grid2.dataItem($(this));
                        // grid2.removeRow($(dataItem)); //just gives alert message
                        grid2.dataSource.remove(dataItem);
                    })
                    item2 = item2 - 1;
                    total2 = grid2.dataSource.data().length;
                    if (total2 == undefined) {
                        total2 = 0;
                    }
                }
            }
        }

        var item = 0;
        var _sumDebit = 0;
        var _sumCredit = 0;
        for (; item < total; item++) {
            var ReferenceName = grid.dataSource._data[item].ReferenceName;
            var ReferenceTypeName = grid.dataSource._data[item].ReferenceTypeName;
            var BillDate = grid.dataSource._data[item].BillDate;
            var Duedate = grid.dataSource._data[item].Duedate;
            var Depit = grid.dataSource._data[item].Depit;
            var Credit = grid.dataSource._data[item].Credit;
            var RowIndex = $("#sample").val();
            var CBY = grid.dataSource._data[item].CBY;
            var CDT = grid.dataSource._data[item].CDT;
            var ADJBY = grid.dataSource._data[item].ADJBY;
            var ADJDT = grid.dataSource._data[item].ADJDT;

            _sumDebit = _sumDebit + parseFloat(Depit == "" || Depit == null ? 0 : Depit);
            _sumCredit = _sumCredit + parseFloat(Credit == "" || Credit == null ? 0 : Credit);

            dataSource2.add({
                ReferenceTypeName: ReferenceTypeName,
                ReferenceName: ReferenceName,
                BillDate: BillDate,
                Duedate: Duedate,
                Depit: (Depit == "" || Depit == null) ? 0 : Depit,
                Credit: (Credit == "" || Credit == null) ? 0 : Credit,
                AC_ID: RowIndex,
                CBY: CBY,
                CDT: CDT,
                ADJBY: ADJBY,
                ADJDT: ADJDT
            });
        }

        var _mainGrid = $("#grid").data('kendoGrid');
        var firstcell = _mainGrid.selectable.userEvents.currentTarget.closest("tr");
        var dataItem = _mainGrid.dataItem(firstcell);
        if (dataItem.DC == "DR") {
            var _debit = _sumDebit - _sumCredit;
            dataItem.Depit = _debit.toFixed(2);
        }
        else if (dataItem.DC == "CR") {
            var _credit = _sumCredit - _sumDebit;
            if (_credit < 0)
                _credit = (-1) * _credit;
            //dataItem.Credit = _credit;
            dataItem.Credit = _credit.toFixed(2);
        }
        _mainGrid.refresh();

        var window = $("#AlertConfirm");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();

        var window = $("#BillDetails");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();

        var depitfinTotal = 0;
        var CreditfinTotal = 0;

        $.each(_mainGrid.dataSource._data, function (key, value) {
            depitfinTotal += parseFloat((value.Depit == "" || value.Depit == null ) ? 0 : value.Depit);
            CreditfinTotal += parseFloat((value.Credit == "" || value.Credit == null) ? 0 : value.Credit);
        });

        var finalDiff = Number(depitfinTotal.toString().replace(/,/g, '')) - Number(CreditfinTotal.toString().replace(/,/g, ''));
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff.toString().replace(/,/g, '')).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal.toString().replace(/,/g, '')).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal.toString().replace(/,/g, '')).toFixed(2));
    }
});
function kendoFastReDrawRow(grid, row) {
    // debugger;
    var dataItem = grid.dataItem(row);

    var rowChildren = $(row).children('td[role="gridcell"]');

    for (var i = 0; i < grid.columns.length; i++) {

        var column = grid.columns[i];
        var template = column.template;
        var cell = rowChildren.eq(i);

        if (template !== undefined) {
            var kendoTemplate = kendo.template(template);

            // Render using template
            cell.html(kendoTemplate(dataItem));
        } else {
            var fieldValue = dataItem[column.field];

            var format = column.format;
            var values = column.values;

            if (values !== undefined && values != null) {
                // use the text value mappings (for enums)
                for (var j = 0; j < values.length; j++) {
                    var value = values[j];
                    if (value.value == fieldValue) {
                        cell.html(value.text);
                        break;
                    }
                }
            } else if (format !== undefined) {
                // use the format
                cell.html(kendo.format(format, fieldValue));
            } else {
                // Just dump the plain old value
                cell.html(fieldValue);
            }
        }
    }

}

$("#VouchPrint").click(
    function (e) {
        $("#okkksave").click();
        var TrnId = localStorage.getItem("PrintTrnId");
        var ddlVouchtype = localStorage.getItem("PrintTrnType");
        var CompId = localStorage.getItem("CompId");
        var hdnFiscalYear = localStorage.getItem("fiscalYr");
        window.open('../GL/RptPdfOpen.aspx?TRNID=' + TrnId + "&DDLVOUCHTYPE=" + ddlVouchtype + "&COMPID=" + CompId + "&FISCALYR=" + hdnFiscalYear + "&RPT=" + "GLVP", '_blank', 'width=840px,height=550,scrollbars=yes,top=\'+Mtop+\',left=\'+Mleft+\'', 0)
    }
    );

var AccountNameLoad = function (SearchVal) {
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/GLTransaction/GLACC2",
        cache: false,
        async: false,
        data: {},
        success: function (data) {

            dataRec = data;
            rowDatad = data;
            $$("grid2").clearAll();
            $$("grid2").parse(rowDatad);
            $$("grid2").refresh();
            $$('AccName').show();

        }
    });


}

function AccountGrid(SearchVal) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AccName",
        head: "Account Details",
        position: "center",
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "grid2",
                container: "grid2v",
                select: 'row',
                height: 380,
                width: 480,
                editable: false,
                scroll: "y",
                columns: [
                    { id: "AC_CD", header: ["Account Code", { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                        { id: "AC_NM", header: ["Account Name", { content: "textFilter" }], width: 360, css: { 'text-align': 'left ! important' }, },
                        { id: "AC_ID", hidden: true },
                        { id: "BillDeatil_IND", hidden: true },
                ],
                data: DataVal,
                on: {
                    'onItemdblClick': function (id) {
                        var getval = this.getItem(id.row);

                        AccountSearch(getval.AC_NM, getval.AC_ID, getval.AC_CD, getval.BillDeatil_IND);
                        $$('AccName').hide();
                    },
                    'onKeyPress': function (e) {

                        if (e == '13') {
                            var valid = this.getSelectedId(true);
                            var id = { row: valid[0].row };
                            this.callEvent("onItemdblClick", [id]);
                        }
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                },
            }]
        }
    });
    var DataVal = AccountNameLoad(SearchVal);

    $$("grid2").eachColumn(function (id, col) {
        var filter = this.getFilter(id).focus();
    });
    $$("grid2").refresh();

}


function AccountSearch(ACNM, ACID, ACCD, BillDeatilIND) {
    var grid = $("#grid").data("kendoGrid");
    var gridAnalysis = $("#AnalysisGrid").data("kendoGrid");
    var Rowinx = grid._rowVirtualIndex;
    var no = $("#RowIndexHiden").val();
    var ACC_NM = ACNM;
    var ACC_ID = ACID;
    var ACC_CD = ACCD;
    var BillDeatil_IND = BillDeatilIND;

    //var decoded = ACC_NM.replace("&amp;", "&");
    var datav = $("#grid").data().kendoGrid.dataSource.data()[no];
    datav.set("AC_NM", ACC_NM);
    datav.set("AC_CD", ACC_CD);
    datav.set("AC_ID", ACC_ID);
    datav.set("BillDeatil_IND", BillDeatil_IND);
    var paramValue;
    paramValue = JSON.stringify({ ID: ACC_NM });
    //var gridLewngth = grid2.dataSource.data().length;

    var gridhd = $("#HiddenGrid").data('kendoGrid');
    var dataSource2 = gridhd.dataSource;
    var total2 = gridhd.dataSource.data().length;
    if (total2 == undefined) {
        total2 = 0;
    }
    if (total2 != 0) {
        var item2 = 0;
        for (; item2 < total2; item2++) {
            if (Rowinx == gridhd.dataSource._data[item2].AC_ID) {
                var uid = gridhd._data[item2].uid;
                var row = gridhd.table.find('tr[data-uid="' + uid + '"]');
                gridhd.select(row);
                gridhd.select().each(function () {
                    var dataItem = gridhd.dataItem($(this));
                    // grid2.removeRow($(dataItem)); //just gives alert message
                    gridhd.dataSource.remove(dataItem);
                })
                item2 = item2 - 1;
                total2 = gridhd.dataSource.data().length;
                if (total2 == undefined) {
                    total2 = 0;
                }
            }
        }
    }
    debugger;
    var AnalysisHiddenGrid = $("#AnalysisHiddenGrid").data('kendoGrid');
    $.each(AnalysisHiddenGrid.dataSource._data, function (key, value) {
        if (grid._rowVirtualIndex == value.RowIndexHiden) {
            AnalysisHiddenGrid.dataSource.remove(value);
        }
    });

    var AC_ID = grid._data[Rowinx].AC_ID;
    if (AC_ID != "") {

        $.ajax({
            type: "POST",
            url: "/GLTransaction/AnalysisProcess",
            data: "ID=" + AC_ID,
            success: function (data) {
                if (data.a == 1 || data.b == 1 || data.c == 1 || data.d == 1 || data.e == 1 || data.f == 1 || data.l == 1 || data.m == 1 || data.n == 1 || data.o == 1) {
                    grid._data[no].INdVal = "1";
                    $("#AnalysisGridsts").show();
                    $("#AnalysisGridtoolbar").show();
                }
                else {
                    grid._data[no].INdVal = "0";
                    $("#AnalysisGridsts").hide();
                    $("#AnalysisGridtoolbar").hide();
                }
                grid.refresh();
                var indexAny = "";
                if (data.a == 1 || data.b == 1 || data.c == 1 || data.d == 1 || data.e == 1 || data.f == 1 || data.l == 1 || data.m == 1 || data.n == 1 || data.o == 1) {
                    var gridAna = $("#AnalysisGrid").data("kendoGrid");

                    if (data.a == 1) {
                        $("#AnalysisGrid th[data-field= A_IND_VAl]").html(data.aH);
                        gridAna.showColumn(0);
                        indexAny = 0 + ",";
                    }
                    else { gridAna.hideColumn(0); }
                    if (data.b == 1) {
                        $("#AnalysisGrid th[data-field= B_IND_VAl]").html(data.bH);
                        gridAna.showColumn(1);
                        indexAny = 1 + ",";
                    }
                    else { gridAna.hideColumn(1); }
                    if (data.c == 1) {
                        $("#AnalysisGrid th[data-field= C_IND_VAl]").html(data.cH);
                        gridAna.showColumn(2);
                        indexAny = 2 + ",";
                    }
                    else { gridAna.hideColumn(2); }
                    if (data.d == 1) {
                        $("#AnalysisGrid th[data-field= D_IND_VAl]").html(data.dH);
                        gridAna.showColumn(3);
                        indexAny = 3 + ",";
                    }
                    else { gridAna.hideColumn(3); }
                    if (data.e == 1) {
                        $("#AnalysisGrid th[data-field= E_IND_VAl]").html(data.eH);
                        gridAna.showColumn(4);
                        indexAny = 4 + ",";
                    }
                    else { gridAna.hideColumn(4); }
                    if (data.f == 1) {
                        $("#AnalysisGrid th[data-field= F_IND_VAl]").html(data.fH);
                        gridAna.showColumn(5);
                        indexAny = 5 + ",";
                    }
                    else { gridAna.hideColumn(5); }
                    if (data.l == 1) {
                        $("#AnalysisGrid th[data-field= L_IND_VAl]").html(data.lH);
                        gridAna.showColumn(6);
                        indexAny = 6 + ",";
                    }
                    else { gridAna.hideColumn(6); }
                    if (data.m == 1) {
                        $("#AnalysisGrid th[data-field= M_IND_VAl]").html(data.mH);
                        gridAna.showColumn(7);
                        indexAny = 7 + ",";
                    }
                    else { gridAna.hideColumn(7); }
                    if (data.n == 1) {
                        $("#AnalysisGrid th[data-field= N_IND_VAl]").html(data.nH);
                        gridAna.showColumn(8);
                        indexAny = 8 + ",";
                    }
                    else { gridAna.hideColumn(8); }
                    if (data.o == 1) {
                        $("#AnalysisGrid th[data-field= O_IND_VAl]").html(data.oH);
                        gridAna.showColumn(9);
                        indexAny = 9 + ",";
                    }
                    else { gridAna.hideColumn(9); }
                    gridAna.showColumn(19);

                    $("#hdnAnlyIndex").val(indexAny);
                }
                $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(0).toFixed(2));
                $("#TemRowIndex").val(no);
                rowIndex = no;
                var Main_AC_ID = grid._data[no].AC_ID;
                var grid2 = $("#AnalysisGrid").data("kendoGrid");
                grid2.cancelChanges();
                var dataSource = grid2.dataSource;
                var grid2 = $("#AnalysisGrid").data('kendoGrid');
                var dataSource = grid2.dataSource;
                var Checktotal = grid2.dataSource.data().length;
                if (Checktotal == 0 || Checktotal == undefined) {
                    dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: "0" });
                }
            }
        })
        //Gst Load Start

        var TranType = $("#Trantype").val();
        $.ajax({
            type: "POST",
            url: "/GLTransaction/GstColumnLoad",
            cache: false,
            charset: 'utf-8',
            async: false,
            data: "ID=" + AC_ID + "&TranType=" + TranType,
            success: function (data) {
                grid._data[no].GSTCol = data.v;
            }
        });
        grid.refresh();
        //Gst Load End

        $.ajax({
            type: "POST",
            url: "/GLTransaction/PendingBillNM",
            cache: false,
            charset: 'utf-8',
         
            data: "ID=" + AC_ID,           
            success: function (data) {
                debugger;
                $("#PendingBillGrid").data("kendoGrid").dataSource.read();
            }
        });
    }
    gridAnalysis.refresh();
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var AnalysisProcess = function (trnId, fiscalYr) {

    var TranType = $("#Trantype").val();
    var grid = $("#grid").data('kendoGrid');

    $.ajax({
        type: "POST",
        url: "/GLTransaction/AnalysisCost",
        data: "fiscalYr=" + fiscalYr + "&trnid=" + trnId,
        async: false,
        success: function (_Data) {
            if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
                var d = JSON.parse(_Data);


                localStorage.setItem("AnalyHdnGrd", JSON.stringify(d.TrnTy));
                localStorage.setItem("GstHdnGrd", JSON.stringify(d.GstTax));
            }
        }
    });


    var no = 0;
    $.each(grid.dataSource._data, function (key, value) {

        var AnalysisHiddenGrid = $("#AnalysisHiddenGrid").data('kendoGrid');
        var AC_ID = value.AC_ID;
        if (AC_ID != "") {
            $.ajax({
                type: "POST",
                url: "/GLTransaction/AnalysisProcess",
                data: "ID=" + AC_ID,
                async: false,
                success: function (data) {
                    if (data.a == 1 || data.b == 1 || data.c == 1 || data.d == 1 || data.e == 1 || data.f == 1 || data.l == 1 || data.m == 1 || data.n == 1 || data.o == 1) {
                        grid._data[key].INdVal = "1";
                        no = "1";
                        $("#TemRowIndex").val(key);
                        //$("#AnalysisGridsts").show();
                        //$("#AnalysisGridtoolbar").show();
                    }
                    else {
                        grid._data[key].INdVal = "0";
                        //$("#AnalysisGridsts").hide();
                        //$("#AnalysisGridtoolbar").hide();
                    }
                    grid.refresh();

                    if (data.a == 1 || data.b == 1 || data.c == 1 || data.d == 1 || data.e == 1 || data.f == 1 || data.l == 1 || data.m == 1 || data.n == 1 || data.o == 1) {
                        var gridAna = $("#AnalysisGrid").data("kendoGrid");

                        if (data.a == 1) {
                            $("#AnalysisGrid th[data-field= A_IND_VAl]").html(data.aH);
                            gridAna.showColumn(0);
                        }
                        else { gridAna.hideColumn(0); }
                        if (data.b == 1) {
                            $("#AnalysisGrid th[data-field= B_IND_VAl]").html(data.bH);
                            gridAna.showColumn(1);
                        }
                        else { gridAna.hideColumn(1); }
                        if (data.c == 1) {
                            $("#AnalysisGrid th[data-field= C_IND_VAl]").html(data.cH);
                            gridAna.showColumn(2);
                        }
                        else { gridAna.hideColumn(2); }
                        if (data.d == 1) {
                            $("#AnalysisGrid th[data-field= D_IND_VAl]").html(data.dH);
                            gridAna.showColumn(3);
                        }
                        else { gridAna.hideColumn(3); }
                        if (data.e == 1) {
                            $("#AnalysisGrid th[data-field= E_IND_VAl]").html(data.eH);
                            gridAna.showColumn(4);
                        }
                        else { gridAna.hideColumn(4); }
                        if (data.f == 1) {
                            $("#AnalysisGrid th[data-field= F_IND_VAl]").html(data.fH);
                            gridAna.showColumn(5);
                        }
                        else { gridAna.hideColumn(5); }
                        if (data.l == 1) {
                            $("#AnalysisGrid th[data-field= L_IND_VAl]").html(data.lH);
                            gridAna.showColumn(6);
                        }
                        else { gridAna.hideColumn(6); }
                        if (data.m == 1) {
                            $("#AnalysisGrid th[data-field= M_IND_VAl]").html(data.mH);
                            gridAna.showColumn(7);
                        }
                        else { gridAna.hideColumn(7); }
                        if (data.n == 1) {
                            $("#AnalysisGrid th[data-field= N_IND_VAl]").html(data.nH);
                            gridAna.showColumn(8);
                        }
                        else { gridAna.hideColumn(8); }
                        if (data.o == 1) {
                            $("#AnalysisGrid th[data-field= O_IND_VAl]").html(data.oH);
                            gridAna.showColumn(9);
                        }
                        else { gridAna.hideColumn(9); }
                        gridAna.showColumn(19);
                    }
                    $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(0).toFixed(2));
                    rowIndex = key;
                    var Main_AC_ID = grid._data[key].AC_ID;
                    var grid2 = $("#AnalysisGrid").data("kendoGrid");
                    grid2.cancelChanges();
                    var dataSource = grid2.dataSource;
                    var grid2 = $("#AnalysisGrid").data('kendoGrid');
                    var dataSource = grid2.dataSource;
                    var Checktotal = grid2.dataSource.data().length;
                    if (Checktotal == 0 || Checktotal == undefined) {
                        dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: "0" });
                    }
                }
            });
            //Gst Load Start

            $.ajax({
                type: "POST",
                url: "/GLTransaction/GstColumnLoad",
                cache: false,
                charset: 'utf-8',
                async: false,
                data: "ID=" + AC_ID + "&TranType=" + TranType,
                success: function (data) {
                    grid._data[key].GSTCol = data.v;
                }
            });
            grid.refresh();
            //Gst Load End

        }
    });

}
function GstHiddenLoad(d) {
    var griddataGST = $("#GstGridHidden").data('kendoGrid').dataSource;
    griddataGST.data([]);
    $.each(d, function (i, value) {
        debugger;
        obj = {};
        obj["TaxCode"] = value.CC_ID;
        obj["TaxClass"] = value.TAX_CC_NM;
        obj["TaxAmount"] = value.GROSS_AMT;

        obj["ixTc3Per"] = value.TAX1_PER;
        obj["ixTc3Amt"] = value.TAX1_AMT;
        obj["ixTc3Cd"] = value.CC1_ID;
        obj["ixTc3vInd"] = value.TAX1_REBATE_IND;
        obj["ixTc1Per"] = value.TAX2_PER;
        obj["ixTc1Amt"] = value.TAX2_AMT;
        obj["ixTc1Cd"] = value.CC2_ID;
        obj["ixTc1vInd"] = value.TAX2_REBATE_IND;
        obj["ixTc2Per"] = value.TAX3_PER;
        obj["ixTc2Amt"] = value.TAX3_AMT;
        obj["ixTc2Cd"] = value.CC3_ID;
        obj["ixTc2vInd"] = value.TAX3_REBATE_IND;
        obj["ixTc4Per"] = value.TAX4_PER;
        obj["ixTc4Amt"] = value.TAX4_AMT;
        obj["ixTc4Cd"] = value.CC4_ID;
        obj["ixTc4vInd"] = value.TAX4_REBATE_IND;

        obj["SnoBill"] = value.REF_NM;
        obj["BillDate"] = value.BILL_DT;
        obj["AmountStr"] = value.BILL_AMT;
        obj["AC_CD"] = value.AC_CD;
        obj["AC_ID"] = value.AC_ID;
        obj["AC_NM"] = value.AC_NM;
        obj["A_IND_ID"] = "";//value.A_IND_ID;
        obj["B_IND_ID"] = "";//value.B_IND_ID;
        obj["C_IND_ID"] = "";//value.C_IND_ID;
        obj["D_IND_ID"] = "";//value.D_IND_ID;
        obj["E_IND_ID"] = value.PTX_RG_NO;
        obj["F_IND_ID"] = "";//value.F_IND_ID;
        obj["F_IND_VAl"] = "";//value.F_IND_VAl;
        obj["L_IND_ID"] = value.POS;
        obj["L_IND_VAl"] = "";//value.L_IND_VAl;
        obj["M_IND_ID"] = value.REV_CHG_IND;
        obj["N_IND_ID"] = value.REV_CHG_PER;
        obj["O_IND_ID"] = value.REV_CHG_IND //value.O_IND_ID;   
        obj["A_IND_VAl"] = value.BOE_NO;
        obj["B_IND_VAl"] = value.BOE_VAL;
        obj["C_IND_VAl"] = value.BOE_DT;
        obj["PORT"] = value.BOE_DT;

        obj["INP_TY"] = value.INP_TY;
        obj["PARTY_TY"] = value.AC_TY;
        obj["PTX_RG_No"] = value.PTX_RG_NO;
        obj["PTX_ST_CD"] = value.PTX_ST_CD;
        obj["PTX_RG_Ty"] = value.PTX_RG_Ty;
        obj["TX_RG_CD"] = value.TX_RG_CD;
        obj["GTRN_TY"] = value.GTRN_TY;
        obj["GINV_TY"] = value.GINV_TY;

        obj["TRN_ID_SRNO"] = value.TRN_ID_SRNO;
        obj["BRN_NO"] = value.OTH1_NO;
        obj["TAN_No"] = value.OTH2_NO;
        obj["Sup_Cat"] = value.PARTY_TAX_GR_ID;
        obj["EXEMP_IND"] = value.TAX_EXEMP;
        obj["HCD"] = value.HCD;
        obj["ORD_NO"] = value.ORD_NO;
        obj["ORD_DT"] = value.ORD_DT;
        obj["GWO_ID"] = "";//value.GWO_ID;
        obj["NID_No"] = value.OTH3_NO;

        if (value.DRCR_IND == "1")
            obj["DC"] = "Dr";
        else obj["DC"] = "Cr";
        obj["BILL_ITEM_NM"] = value.BILL_ITEM_NM;

        griddataGST.add(obj);
    });
    $("#GstGridHidden").data('kendoGrid').refresh();
}
function AnalysisHiddenGrd(d) {
    debugger;
    var grid2 = $("#AnalysisHiddenGrid").data("kendoGrid");
    grid2.dataSource.data([]);
    $.each(d, function (key, value) {
        var A_IND_VAl = ((value.COST1 == undefined || value.COST1 == null || value.COST1 == "") ? "" : value.TC_NM);
        var A_IND_ID = value.COST1;
        var B_IND_VAl = ((value.COST2 == undefined || value.COST2 == null || value.COST2 == "") ? "" : value.TC_NM);
        var B_IND_ID = value.COST2;
        var C_IND_VAl = ((value.COST3 == undefined || value.COST3 == null || value.COST3 == "") ? "" : value.TC_NM);
        var C_IND_ID = value.COST3;
        var D_IND_VAl = ((value.COST4 == undefined || value.COST4 == null || value.COST4 == "") ? "" : value.TC_NM);
        var D_IND_ID = value.COST4;
        var E_IND_VAl = ((value.COST5 == undefined || value.COST5 == null || value.COST5 == "") ? "" : value.TC_NM);
        var E_IND_ID = value.COST5;
        var F_IND_VAl = ((value.COST6 == undefined || value.COST6 == null || value.COST6 == "") ? "" : value.TC_NM);
        var F_IND_ID = value.COST6;
        var L_IND_VAl = ((value.COST7 == undefined || value.COST7 == null || value.COST7 == "") ? "" : value.TC_NM);
        var L_IND_ID = value.COST7;
        var M_IND_VAl = ((value.COST8 == undefined || value.COST8 == null || value.COST8 == "") ? "" : value.TC_NM);
        var M_IND_ID = value.COST8;
        var N_IND_VAl = ((value.COST9 == undefined || value.COST9 == null || value.COST9 == "") ? "" : value.TC_NM);
        var N_IND_ID = value.COST9;
        var O_IND_VAl = ((value.COST10 == undefined || value.COST10 == null || value.COST10 == "") ? "" : value.TC_NM);
        var O_IND_ID = value.COST10;
        var AnalysisAMt = value.AAMT;
      //  var RowIndex = $("#TemRowIndex").val();
        //var RowIndex = ((value.TRN_ID_SRNO == undefined || value.TRN_ID_SRNO == null || value.TRN_ID_SRNO == "") ? "" : (value.TRN_ID_SRNO)-1);
        var RowIndex = ((value.SR_NO == undefined || value.SR_NO == null || value.SR_NO == "") ? "" : (value.SR_NO) - 1);
        
        $("#AnalysisHiddenGrid").data("kendoGrid").dataSource.add({ RowIndexHiden: RowIndex, A_IND_VAl: A_IND_VAl, B_IND_VAl: B_IND_VAl, C_IND_VAl: C_IND_VAl, D_IND_VAl: D_IND_VAl, E_IND_VAl: E_IND_VAl, F_IND_VAl: F_IND_VAl, L_IND_VAl: L_IND_VAl, M_IND_VAl: M_IND_VAl, N_IND_VAl: N_IND_VAl, O_IND_VAl: O_IND_VAl, A_IND_ID: A_IND_ID, B_IND_ID: B_IND_ID, C_IND_ID: C_IND_ID, D_IND_ID: D_IND_ID, E_IND_ID: E_IND_ID, F_IND_ID: F_IND_ID, L_IND_ID: L_IND_ID, M_IND_ID: M_IND_ID, N_IND_ID: N_IND_ID, O_IND_ID: O_IND_ID, AnalysisAMt: AnalysisAMt });
        $("#AnalysisHiddenGrid").data("kendoGrid").refresh();
    });
}

var GetCurUpdateDt = function (trnId, fiscalYr) {
    $.ajax({
        type: "POST",
        url: "/GLTransaction/TrnUpateDate",
        data: "fiscalYr=" + fiscalYr + "&trnid=" + trnId,
        async: false,
        success: function (_Data) {
            if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
                var d = JSON.parse(_Data);
                //alert(d);
                $("#curUpdateDate").val(d);
            }
        }
    });
}