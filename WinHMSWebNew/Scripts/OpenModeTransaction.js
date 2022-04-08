
       $("[name='Depit']").attr("min", "0");      
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent;
var objbrowserName = navigator.appName;
var objfullVersion = '' + parseFloat(navigator.appVersion);
var objBrMajorVersion = parseInt(navigator.appVersion, 10);
var objOffsetName, objOffsetVersion, ix;
$("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
// $("#grid2").data("kendoGrid").refresh();

$("#HiddenGrid").hide();

$(document).ready(function () {

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
    ////debugger;  

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
    var grid = $("#OpenModegrid").data("kendoGrid");
    $.ajax({
        type: "POST",
        url: "/GLTransaction/Date",
        data: "",
        success: function (data) {
            if (data == null) {
                $("#Date").val(data.d.TrasactionDate);
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

    // //debugger;
    $("#addrow").click(function (e) {
        NewGridRow(e);
    });
    $("#deleterow").click(function (e) {
        CancelGridRow(e);
    });
    //// START GRID Values SAVE function 
    $("#SaveGridRow").click(function (e) {
     
        var grid = $("#OpenModegrid").data('kendoGrid');
        var postUrl;
        var paramValue;
        var gridValue = $("#OpenModegrid").data("kendoGrid").dataSource.data();
        var gridData = $("#OpenModegrid").data('kendoGrid').dataSource.data();
        var gridValue2 = $("#HiddenGrid").data("kendoGrid").dataSource.data();
        var gridData2 = $("#HiddenGrid").data('kendoGrid').dataSource.data();
        var AnalysissGrid = $("#AnalysisHiddenGrid").data('kendoGrid').dataSource.data();
        var DivAPPLIND = $("#DivAPPLIND").val();
        var TransDate = $("#Date").val();
        var TranType = $("#Trantype").val();
        var Division = $("#Division").val();
        var CommonNarration = $("#CommonNarration").val();
        var VoucherNo = $("#VoucherNo").val();
     
        paramValue = JSON.stringify({ TransList: gridData, BillList: gridData2,AnalysisList:AnalysissGrid, TranTyID: TranType, TranDate: TransDate, Division: Division, CommaonNarrtion: CommonNarration, VouchNo: VoucherNo });
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no = (total - 1);
        var TotalValue = $("#FinalDiffAMT").text();
        var dd = TotalValue.replace("D/C Difference: ", "");
        TotalValue = dd;
        if (TransDate != "" && TranType != "" && total != 0) {
            if (grid._data[no].Depit != 0 || grid._data[no].Credit != 0) {
                if (grid._data[no].AC_NM != null) {
                    if (TotalValue == 0) {
                        if (CommonNarration == "" && COMMON_NARR_APPL == 1) {
                            $("#AlertMessageHdn").val('Common Narration Mandatory.');
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                        else {
                            var vouchNoCheck = 0;
                            if (VOUCH_NO_IND == 2 || VOUCH_NO_IND == 3) {
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
                            var item = 0;
                            var item2 = 0;
                            var TestVal = 0;
                            for (; item < total; item++) {
                                if (grid.dataSource._data[item].BillDeatil_IND == 1) {

                                    item2 = 0;
                                    if (total != 0 && total2 == 0) {
                                        TestVal = 1;
                                    }
                                    for (; item2 < total2; item2++) {
                                        if (grid.dataSource._data[item].RowIndexHiden == grid2.dataSource._data[item2].AC_ID) {
                                            break;
                                        }
                                        else if (item2 + 1 == total2) {
                                            TestVal = 1;
                                        }
                                    }
                                }
                            }
                            if (TestVal == 0) {
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json",
                                    accepts: "application/json",
                                    dataType: "json",
                                    url: "/GLTransaction/SaveGrid",
                                    cache: false,
                                    charset: 'utf-8',
                                    data: paramValue,
                                    success: function (data) {
                                        var alertVal = data.v.ErroMeg;
                                        if (alertVal == "Saved Successfully...!") {
                                           var buttonObject1 = $("#SaveGridRow").kendoButton().data("kendoButton");
                                           buttonObject1.enable(false);
                                            //$('.t-toolbar .t-button').addClass('t-state-disabled').click(function () { return false });                                                }
                                            grid.refresh();
                                           $("#AlertMessageHdn").val(alertVal);
                                          $("#alertType").val('success');
                                          AlertMesaage();                                       
                                       }
                                        else {
                                            $("#AlertMessageHdn").val(alertVal);
                                           $("#alertType").val('fail');
                                           AlertMesaage();
                                       }
                                    }                                    
                                });
                            }
                            else {
                                $("#AlertMessageHdn").val("D/C Value does not Match with the Pending Bill Settlement(s) Made.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                    }
                    else {
                        $("#AlertMessageHdn").val("Difference Value Can be Equal to Zero .");
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
            else if (TransDate != "" && TranType != "" && total != 0 && grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Credit == 0) {
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
    })
    //// END GRID Values SAVE function 
});
function AlertMesaage() {
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

var grid = $("#OpenModegrid").data("kendoGrid");
    //// START NEW Button Click Function 
    function NewGridRow(e) {
        // //debugger;
        var B_IND = $("#B_IND").val();
        var dcval = $("#dcval").val();
        var dropdownval = $("#dropdownval").val();
        var DefaultCurrency = $("#DefaultCurrency").val();
        var grid = $("#OpenModegrid").data("kendoGrid");
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
                if (value != null && value2 != null) {
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }
            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2)
            }
       
            var DepitTotal = Amount1 + Amount2;
            var CreditTotal = Amount2 + Amount1;
            var finalTotal = Number(DepitTotal) - Number(CreditTotal);
            $("#differenceAmountgrid").text(Number(finalTotal).toFixed(2));
            var PURConvrate = $("#PURConvertRate").val();
            var ForgAmount = "0";
        }
        $("#DepitTotal").val(Number(DepitTotal).toFixed(2));
        $("#CreditTotal").val(Number(CreditTotal).toFixed(2));

        if (grid.dataSource.data().length == 0 || grid.dataSource.data().length == undefined) {
            if ( dropdownval != "" && TransDate != "") {
                dataSource.add({ DC: dropdownval, Depit: 0, Credit: 0, Currency: DefaultCurrency, ConvertButton: "R", checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                        dataSource.add({ DC: "DR", AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: 0, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                        if (FirstRowCurrency == DefaultCurrency) {
                            $("#ForeignCurrencyDIV").hide();
                        }
                        else if (FirstRowCurrency != DefaultCurrency) {
                            $("#ForeignCurrencyDIV").show();
                            ForgAmount = Number(TotalValue) / Number(PURConvrate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                            $("#Purchase").show();
                            $("#Sale").hide();
                            $("#PURConvertRate").show();
                            $("#SALEConvertRate").hide();
                            $("#ConvertButton").val("Purchase");
                        }
                    }
                    else if (0 > TotalValue) {
                        var Sum = -(TotalValue);
                        dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: 0, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                        if (FirstRowCurrency == DefaultCurrency) {
                            $("#ForeignCurrencyDIV").hide();
                        }
                        else if (FirstRowCurrency != DefaultCurrency) {
                            ForgAmount = Number(Sum) / Number(PURConvrate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
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
                    dataSource.add({ DC: "CR", AC_NM: null, Depit: 0, Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
                    if (FirstRowCurrency == DefaultCurrency) {
                        $("#ForeignCurrencyDIV").hide();
                    }
                    else if (FirstRowCurrency != DefaultCurrency) {
                        ForgAmount = Number(TotalValue) / Number(PURConvrate);
                        $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
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

        var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
    
    }
    //// END NEW Button Click Function  
    //// START Cancel Button Click Function 
    function CancelGridRow(e) {

        var grid = $("#OpenModegrid").data("kendoGrid");
        grid.select().each(function () {
            var dataItem = grid.dataItem($(this));
            grid.dataSource.remove(dataItem);        
        })                   
        var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
    }
    //// END Cancel Button Click Function 

    function ClearRowGrid(e) {
        $("#OpenModegrid").data("kendoGrid").cancelChanges();
        $("#Popupgrid").data('kendoGrid').cancelChanges();
        $("#HiddenGrid").data('kendoGrid').cancelChanges();                  
        $("#ForeignCurrencyDIV").hide();
        var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
    }
    //// START TrasactionDate  Change Function 
    $("#Date").blur(function (e) {       
        var grid = $("#OpenModegrid").data('kendoGrid');
        var id = $("#Date").val();
        $.ajax({
            type: "POST",
            url: "/GLTransaction/Date",
            cache: false,
            charset: 'utf-8',
            data: "TransDate=" + id,
            success: function (data) {
                if (data.d != null) {
                    var dd = Jsondate(data.d);
                    var condt = convert(dd);
                    $("#Date").val(condt);
                }
                else if (data.d == null) {
                    $("#Date").val("");               
                    $("#AlertMessageHdn").val("Date is Not in Fisical Year.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
        });  
    });
    //// END TrasactionDate  Change Function 

    //// START TrasactionDate  Change Function 
    $("#VoucherNo").change(function () {
        // //debugger;
        var grid = $("#OpenModegrid").data('kendoGrid');
        var Vouchno = $("#VoucherNo").val();
        var Trnatypeid = $("#Trantype").val();
    
        if (Trnatypeid != "" && Vouchno != 0 && Vouchno != null) {
            if (VOUCH_NO_IND == 2) {
                $.ajax({
                    type: "POST",
                    url:"/GLTransaction/VoucherNoValidate",
                    cache: false,
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

    //// START AccountName POPUP & Narration POPUP Click Function    

    //// END AccountName POPUP & Narration POPUP Click Function 

    //// START Depit & Credit Editable False Function 
    function edit(e) {       
        var grid = $("#OpenModegrid").data("kendoGrid");
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

            var grid = $("#OpenModegrid").data("kendoGrid");
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
  
    $("#OpenModegrid table").on("keyup", "tr", function (e) {
        //  //debugger;
        var grid = $("#OpenModegrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no1 = total - 1;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 40) {
            if (no1 == no) {
                NewGridRow(keyCode);
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
        return false;
    });

    $("#OpenModegrid table").on("keypress", "td", function (e) {
        ////debugger;
        $("#ConvertRatePOP").val("");
        $("#ForcurAmount").val("");
        $("#AmountPop").val("");
        $("#Depicreditval").text("");
        $("#ForeignCurrAmountPOP").val("");
        $("#ForeginDiffAmount").val("");
        $("#PopupDepitTotal").val("");
        $("#PopupCreditTotal").val("");
        ////debugger;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grdd = document.getElementById("DC");
        var grdd1 = document.getElementById("Depit");
        var grdd2 = document.getElementById("Credit");
        var grdd3 = document.getElementById("AC_NM");
        var grdd4 = document.getElementById("Narration");
        var DefaultCurrency = $("#DefaultCurrency").val();
        if (grdd != null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 == null) {

            if (grdd.id == "DC") {
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 67 || keyCode == 99) {
                    var data = $("#OpenModegrid").data().kendoGrid.dataSource.data()[no];
                    data.set("DC", "CR");
                    grid._data[no].Depit = 0;
                    $("#OpenModegrid").data("kendoGrid").refresh();
                    return false;
                }
                else if (keyCode == 68 || keyCode == 100) {
                    var data = $("#OpenModegrid").data().kendoGrid.dataSource.data()[no];
                    data.set("DC", "DR");
                    grid._data[no].Credit = 0;
                    $("#OpenModegrid").data("kendoGrid").refresh();
                    return false;
                }
                else if (keyCode != 67 && keyCode != 68 && keyCode != 99 && keyCode != 100) {
                    return false;
                }

            }
        }

        else if (grdd == null && grdd1 != null && grdd2 == null && grdd3 == null && grdd4 == null) {

            if (grdd1.id == "Depit") {
                   
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66 || keyCode == 98) {

                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grid.dataSource._data[no].Credit;

                    if (DepitVal != 0 || CreditVal != 0) {
                        if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                            var id = grid.dataSource._data[no].Currency;
                            $.ajax({
                                type: "POST",
                                url:"/GLTransaction/ForeignCurrency",
                                data: "Currency=" + id,
                                success: function (data) {
                                    $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);

                                    var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                    var convertratee = data.d.PURConvertRate;
                                    var ForgAmount = "0";
                                    if (grid.dataSource._data[no].Currency == DefaultCurrency) {
                                        if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                            $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                            $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }
                                    else if (grid.dataSource._data[no].Currency != DefaultCurrency) {

                                        if (ConvertbuttonType == "S") {
                                            var ForgAmount = "0";
                                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }

                                        else if (ConvertbuttonType == "P") {
                                            var ForgAmount = "0";
                                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }
                                    }
                                    var AmountValuee = $("#AmountPop").val();
                                    var grid2 = $("#Popupgrid").data('kendoGrid');                                       
                                    // $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
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
                            if (grid.dataSource._data[no].ReferenceName != "D") {
                                for (; item < total; item++) {
                                    var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid3.dataSource._data[item].BillDate;
                                    var Duedate = grid3.dataSource._data[item].Duedate;
                                    var Depit = grid3.dataSource._data[item].Depit;
                                    var Credit = grid3.dataSource._data[item].Credit;
                                    var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                    if (rowIndex == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });

                                    }
                                }
                            }
                            else {

                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    if (grid.dataSource._data[no].AC_ID == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });

                                    }
                                }
                            }
                            Total(e);
                            billrow(e);                               
                            var window = $("#BillDetails");
                            var kWnd = window.data("kendoWindow");
                            kWnd.center().open();
                            return false;
                        }
                        else if (grid.dataSource._data[no].BillDeatil_IND == 0) {
                            //$("#AlertMessageHdn").val("Bill Detail Not Applicable.");
                            //$("#alertType").val('fail');
                            //AlertMesaage();                       
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
                else if (keyCode != 66 || keyCode != 98) { }
            }
        }
        else if (grdd == null && grdd1 == null && grdd2 != null && grdd3 == null && grdd4 == null) {
            if (grdd2.id == "Credit") {
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66 || keyCode == 98) {
                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grid.dataSource._data[no].Credit;
                    if (DepitVal != 0 || CreditVal != 0) {
                        if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                            var id = grid.dataSource._data[no].Currency;
                            $.ajax({
                                type: "POST",
                                url:"/GLTransaction/ForeignCurrency",
                                data: "Currency=" + id,
                                success: function (data) {
                                    $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);
                                    var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                    var convertratee = data.d.PURConvertRate;
                                    var ForgAmount = "0";
                                    if (grid.dataSource._data[no].Currency == "RS") {
                                        if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                            $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                            $("#Depicreditval").text("DR");
                                        }
                                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                            $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                            $("#Depicreditval").text("CR");
                                        }
                                    }
                                    else if (grid.dataSource._data[no].Currency != "RS") {
                                        if (ConvertbuttonType == "S") {
                                            var ForgAmount = "0";
                                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }
                                        else if (ConvertbuttonType == "P") {
                                            var ForgAmount = "0";
                                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }
                                    }
                                    var AmountValuee = $("#AmountPop").val();                                    
                                    // $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
                                    $("#ForeignCurrAmountPOP").val(Number(ForgAmount).toFixed(2));
                                    $("#ForeginDiffAmount").val(Number(ForgAmount).toFixed(2));
                                }
                            });
                            if (grid.dataSource._data[no].Currency != "RS") {
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
                            else if (grid.dataSource._data[no].Currency == "RS") {
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
                            if (grid.dataSource._data[no].ReferenceName != "D") {
                                for (; item < total; item++) {
                                    var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid3.dataSource._data[item].BillDate;
                                    var Duedate = grid3.dataSource._data[item].Duedate;
                                    var Depit = grid3.dataSource._data[item].Depit;
                                    var Credit = grid3.dataSource._data[item].Credit;
                                    var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                    if (rowIndex == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });

                                    }
                                }
                            }
                            else {

                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    if (grid.dataSource._data[no].AC_ID == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });

                                    }
                                }
                            }
                           
                            Total(e);
                            billrow(e);
                            var window = $("#BillDetails");
                            var kWnd = window.data("kendoWindow");
                            kWnd.center().open();
                            return false;
                        }
                        else if (grid.dataSource._data[no].BillDeatil_IND == 0) {
                            //$("#AlertMessageHdn").val("Bill Detail Not Applicable.");
                            //$("#alertType").val('fail');
                            //AlertMesaage();                        
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
                else if (keyCode != 66 || keyCode != 98) { }
            }
        }
      

    });

    //// END Depit & Credit Editable False Function      

    $("#OpenModegrid table").on("change", "td", function (e) {
        // //debugger;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grdd1 = document.getElementById("Depit");
        var grdd2 = document.getElementById("Credit");
        var grdd3 = document.getElementById("Currency");

        // //debugger;
        if (grdd1 != null && grdd2 == null && grdd3 == null) {
            if (grdd1.id == "Depit") {                
                var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));            
            }
        }
        else if (grdd1 == null && grdd2 != null && grdd3 == null) {
            if (grdd2.id == "Credit") {
                var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

            }
        }

        else if (grdd1 == null && grdd2 == null && grdd3 != null) {
            if (grdd3.id == "Currency") {
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                //  var currencyVAL = grid.dataSource._data[no].Currency;
                grid._data[no].Depit = 0;
                grid._data[no].Credit = 0;
                var id = grdd3.value;
                if (id != "RS") {
                    $.ajax({
                        type: "POST",
                        url:"/GLTransaction/ForeignCurrency",
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

                            var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                            var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                            var finalDiff = Number(depitfinTotal - CreditfinTotal);
                            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                            $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                            $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

                            // grid.refocusLastEditedCell();     
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
                        }

                    });
                   // $("#ForeignCurrencyDIV").show();
                }
                else if (id == "RS") {
                    grid._data[no].Depit = 0;
                    grid.dataSource._data[no].Credit = 0;
                    grid.dataSource._data[no].ConvertButton = "R";
                    grid.dataSource._data[no].Currency = id;
                    $("#ForeignCurrencyDIV").hide();
                    grid.closeCell();
                    grid.refresh();                   
                    var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                    var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                    var finalDiff = Number(depitfinTotal - CreditfinTotal);
                    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                    $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                    $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

                }
            }

        }
    }); 


    $("#up").click(function () {
        //   //debugger;
        $("#Purchase").hide();
        $("#Sale").show();
        $("#PURConvertRate").hide();
        $("#SALEConvertRate").show();
        var grid = $("#OpenModegrid").data("kendoGrid");
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
            $("#OpenModegrid").data("kendoGrid").refresh();
        }
        else if (Dcval == "CR") {
            grid._data[no].Credit = TotalConVAl;
            grid._data[no].Depit = 0;
            $("#OpenModegrid").data("kendoGrid").refresh();
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
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }
            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2)
            }          
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;
        }
        $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue).toFixed(2));
        $("#DepitTotal").text(Number(DepitTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditTotal).toFixed(2));
    });
    $("#down").click(function () {
        //   //debugger;
        $("#Purchase").show();
        $("#Sale").hide();
        $("#PURConvertRate").show();
        $("#SALEConvertRate").hide();
        var grid = $("#OpenModegrid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var SALEConvartRate = $("#SALEConvertRate").val();
        var PURConvartRate = $("#PURConvertRate").val();
        var ForeignAmount = $("#ForcurAmount").val();

        var grid = $("#OpenModegrid").data("kendoGrid");
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
            $("#OpenModegrid").data("kendoGrid").refresh();
        }
        else if (Dcval == "CR") {
            grid._data[no].Credit = TotalConVAl;
            grid._data[no].Depit = 0;
            $("#OpenModegrid").data("kendoGrid").refresh();
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
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }

            if (Amount1 != null && Amount2 != null) {

                TotalValue = (Amount1 - Amount2)
            }      
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;
        }
        $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue).toFixed(2));
        $("#DepitTotal").text(Number(DepitTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditTotal).toFixed(2));
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
        // //debugger;
        var grid = $("#OpenModegrid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var SALEConvartRate = $("#SALEConvertRate").val();
        var PURConvartRate = $("#PURConvertRate").val();
        var ForeignAmount = $("#ForcurAmount").val();
        var ConvertbuttonType = $("#ConvertButton").val();

        var grid = $("#OpenModegrid").data("kendoGrid");
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
        var Dcval = grid.dataSource._data[no].DC;
        if (Dcval == "DR") {
            grid._data[no].Depit = TotalConVAl;
            grid._data[no].Credit = 0;
            $("#OpenModegrid").data("kendoGrid").refresh();
        }
        else if (Dcval == "CR") {
            grid._data[no].Credit = TotalConVAl;
            grid._data[no].Depit = 0;
            $("#OpenModegrid").data("kendoGrid").refresh();
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
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }

            if (Amount1 != null && Amount2 != null) {

                TotalValue = (Amount1 - Amount2)
            }
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;
        }
        $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue).toFixed(2));
        $("#DepitTotal").text(Number(DepitTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditTotal).toFixed(2));
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
    
        var grid = $("#OpenModegrid").data("kendoGrid");
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
                url:"/GLTransaction/CurrentBalance",
                data: "ID=" + AC_ID,
                success: function (data) {
                    var val = data.d;
                    $("#CurrBalance").text(Number(val).toFixed(2));
                    if (val != 0) {
                        var window = $("#CurrentBalancePOPup");
                        var kWnd = window.data("kendoWindow");
                        kWnd.center().open();
                    }
                }
            });
        }
    });


    $("#OpenModegrid table").on("keypress", "td", function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 109 || keyCode == 189 || keyCode == 45 || keyCode == 173) {
            return false;
        }
        var charCode = (e.which) ? e.which : e.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    })

    $("#OpenModegrid table").on("click", "tr.k-state-selected", function (e) {
    
       var grid = $("#OpenModegrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        $("#RowIndexHiden").val(rowIndex);
        var dataSource = grid.dataSource;
        var id = grid.dataSource._data[no].Currency;
        if (id != "RS") {
            $.ajax({
                type: "POST",
                url: "/GLTransaction/ForeignCurrency",
                data: "Currency=" + id,
                success: function (data) {
                    $("#ForeignCurrNM").val(data.d.ForeignCurrNM);
                    $("#PURConvertRate").val(Number(data.d.PURConvertRate).toFixed(2));
                    $("#SALEConvertRate").val(Number(data.d.SALEConvertRate).toFixed(2));
                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grid.dataSource._data[no].Credit;
                    var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;

                    if (ConvertbuttonType == "S") {
                        var ForgAmount = "0";
                        if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                            ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                        }
                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                            ForgAmount = Number(CreditVal) / Number(data.d.SALEConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
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
                            ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                        }
                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                            ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                        }
                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit == 0) {
                            $("#ForcurAmount").val(Number(0).toFixed(2));
                        }
                        $("#Purchase").show();
                        $("#Sale").hide();
                        $("#PURConvertRate").show();
                        $("#SALEConvertRate").hide();                      
                    }
                    else  {
                        var ForgAmount = "0";
                        if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                            ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                        }
                        else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                            ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                            $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
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
          //  $("#ForeignCurrencyDIV").show();
        }
        else if (id == "RS") {

            $("#ForeignCurrencyDIV").hide();
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
        // //debugger;
        var grid1 = $("#Popupgrid").data('kendoGrid');
        var dataSource = grid1.dataSource;
        var ReferenceNM = $("#ReferenceNM").val();
        
        if (ReferenceNM == "") {
            ReferenceNM = "NewBillRef";
        }
        var TransactionDate = $("#Date").val();  
        if (grid1.dataSource.data().length == 0 || grid1.dataSource.data().length == undefined) {
            dataSource.add({ ReferenceTypeName: ReferenceNM, BillDate: TransactionDate, Duedate: TransactionDate, Depit: 0, Credit: 0, AmountPopG: 0 });
            var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
            $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));
            $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
            $("#popNamefieldnm").text("Total: ");
        }      
    }

    function Total(e) {  
        var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
        $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));
        $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
        $("#popNamefieldnm").text("Total: ");
                 
    }

    function NewRowpopup(e) { 
        // //debugger;
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
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
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
                if (grid1.dataSource._data[no].Depit != 0 || grid1.dataSource._data[no].Credit != 0) {
                    dataSource.add({ ReferenceTypeName: ReferenceNM, ReferenceName: null, BillDate: TransactionDate, Duedate: TransactionDate, Depit: 0, Credit: 0, AmountPopG: 0 });
                        
                    var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                    var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                    $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
                    $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));
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
    };

    function CancelRowPopup(e) {
        //    //debugger;
        var AmountValuee = $("#AmountPop").val();
        $("#differenceAmount").text("D/C Difference: " + Number(AmountValuee).toFixed(2));
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
                var value = grid1.dataSource._data[item].Depit;
                var value2 = grid1.dataSource._data[item].Credit;
                if (value != null && value2 != null) {
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }

            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2)
            }
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;


            var AmountName = $("#Depicreditval").text();           
            if (AmountName == "DR") {
                var lastVal = grid1.dataSource._data[no].Depit;
                var diffval = $("#differenceAmount").text();
                var dd = diffval.replace("D/C Difference: ", "");
                diffval = dd;
                var AmountValuee = $("#AmountPop").val();
                var nettotal = Number(AmountValuee) + Number(Amount2);
                var Difference = Number(nettotal) - Number(Amount1);
            }
            else if (AmountName == "CR") {
                var lastVal = grid1.dataSource._data[no].Depit;
                var diffval = $("#differenceAmount").text();
                var dd = diffval.replace("D/C Difference: ", "");
                diffval = dd;
                var AmountValuee = $("#AmountPop").val();
                var nettotal = Number(AmountValuee) - Number(Amount2);
                var Difference = Number(nettotal) + Number(Amount1);

            }

            $("#differenceAmount").text("D/C Difference: " + Number(Difference).toFixed(2));
            var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
            $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));

            var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            var finalDiff = Number(depitfinTotal - CreditfinTotal);
            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
            $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
            $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

        }
    }
    function ClearRowPopup(e) {
        $("#Popupgrid").data("kendoGrid").cancelChanges();
        var AmountValuee = $("#AmountPop").val();
        $("#differenceAmount").text("D/C Difference: " + Number(AmountValuee).toFixed(2));
        var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
        $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));

    }    

    $("#Popupgrid table").on("change", "td", function (e) {
        //  //debugger;
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
            if (grdd1.id == "ReferenceTypeName") {
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
                    charset: 'utf-8',
                    data: "ID=" + ID,
                    success: function (data) {
                        grid1.dataSource._data[no].ReferenceTypeName = data.d;
                        $("#ReferenceTypeNamehdn").val(data.d);                      
                        grid1.refresh();
                        var uid = grid1._data[no].uid;
                        // var uid = data[0].uid;
                        var secrow = grid1.table.find('tr[data-uid="' + uid + '"]');
                        grid1.select(secrow);
                    }
                });
                if (ID == 3) {

                    var grid = $("#OpenModegrid").data("kendoGrid");
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
                
                    grid1.dataSource._data[no].ReferenceName = "";
                    grid1.dataSource._data[no].Depit = 0
                    grid1.dataSource._data[no].Credit = 0;
                    grid1.refresh();
                }               
            }
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
                if (value != null && value2 != null) {
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }
            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2)
            }
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;
        }

        var AmountName = $("#Depicreditval").text();        
        if (AmountName == "DR") {
            var lastVal = grid1.dataSource._data[no].Depit;
            var diffval = $("#differenceAmount").text();
            var dd = diffval.replace("D/C Difference: ", "");
            diffval = dd;
            var AmountValuee = $("#AmountPop").val();
            var nettotal = Number(AmountValuee) + Number(Amount2);
            var Difference = Number(nettotal) - Number(Amount1);
        }
        else if (AmountName == "CR") {
            var lastVal = grid1.dataSource._data[no].Depit;
            var diffval = $("#differenceAmount").text();
            var dd = diffval.replace("D/C Difference: ", "");
            diffval = dd;
            var AmountValuee = $("#AmountPop").val();
            var nettotal = Number(AmountValuee) - Number(Amount2);
            var Difference = Number(nettotal) + Number(Amount1);
        }

        $("#differenceAmount").text("D/C Difference: " + Number(Difference).toFixed(2));
        var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        $("#PopDepitTotal").text(Number(Amount1).toFixed(2));
        $("#PopCreditTotal").text(Number(Amount2).toFixed(2));
    }

    $("#Popupgrid table").on("blur", "td", function (e) {

        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grid1 = $("#Popupgrid").data('kendoGrid');
        var dataSource = grid1.dataSource;
        var dataSource = grid1.dataSource;
        var rowIndex = grid1._rowVirtualIndex;
        var no = rowIndex;
        //   //debugger;             
        var grdd4 = document.getElementById("BillDate");
        var grdd5 = document.getElementById("Duedate");

        if (grdd4 != null && grdd5 == null) {
            if (grdd4.id == "BillDate") {
                ////debugger;
                var Maingrid = $("#OpenModegrid").data('kendoGrid');
                var maindataSource = Maingrid.dataSource;
                var MainrowIndex = Maingrid._rowVirtualIndex;

                var Main_AC_ID = Maingrid.dataSource._data[MainrowIndex].AC_ID;
                var BDate = grid1.dataSource._data[no].BillDate;
                var BillDate = convert(BDate);
                $.ajax({
                    type: "POST",
                    url:"/GLTransaction/BillDateCalulate",
                    data: "ID=" + Main_AC_ID + "&ID2=" + BillDate,
                    success: function (data) {
                        var CreditDays = data.d;
                        grid1.dataSource._data[no].Duedate = Jsondate(CreditDays);
                        POpTotal(e);
                        grid1.refresh();
                    }
                });               
            }
        }
        else if (grdd4 == null && grdd5 != null) {
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
    });

    function PopupGridedit(e) {
        //debugger;
     
        var grid = $("#Popupgrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var dataSource = grid.dataSource; 

        if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
            objbrowserName = "Chrome";
            objfullVersion = objAgent.substring(objOffsetVersion + 7);
            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                $(e.container).find('input[name="Credit"]').attr("readonly", true);
            }
            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                $(e.container).find('input[name="Depit"]').attr("readonly", true);
            }
            //debugger;
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
            // In Firefox
        else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
            objbrowserName = "Firefox";
            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                $(e.container).find('input[name="Credit"]').attr("readonly", true);
            }
            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                $(e.container).find('input[name="Depit"]').attr("readonly", true);
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
            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {
                $(e.container).find('input[name="Credit"]').attr("readonly", true);
            }
            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                $(e.container).find('input[name="Depit"]').attr("readonly", true);
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
            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0) {

                $(e.container).find('input[name="Credit"]').attr("disabled", true);
            }
            else if (grid.dataSource._data[no].Depit == 0 && grid.dataSource._data[no].Credit != 0) {
                $(e.container).find('input[name="Depit"]').attr("disabled", true);
            }
            ////debugger;
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

    $("#Popupgrid table").on("keyup", "tr", function (e) {
        // //debugger;
        var grid = $("#Popupgrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no1 = total - 1;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 40) {
            if (no1 == no) {
                NewRowpopup(keyCode);
            }
            else {
                return true;
            }
        }
        return false;
    });
    $("#Popupgrid table").on("focus", "td", function (e) {      
        //  //debugger;           
        var grid = $("#Popupgrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        $("#RowIndexHidenPopup").val(rowIndex);
    });
       
    $("#Done").click(function (e) {
        // //debugger;           
        var diffval = $("#differenceAmount").text();
        var dd = diffval.replace("D/C Difference: ", "");
        diffval = dd;
        if (diffval == "0.00") {
            var grid = $("#Popupgrid").data('kendoGrid');
            var grid2 = $("#HiddenGrid").data('kendoGrid');
              
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
            for (; item < total; item++) {
                var ReferenceName = grid.dataSource._data[item].ReferenceName;
                var ReferenceTypeName = grid.dataSource._data[item].ReferenceTypeName;
                var BillDate = grid.dataSource._data[item].BillDate;
                var Duedate = grid.dataSource._data[item].Duedate;
                var Depit = grid.dataSource._data[item].Depit;
                var Credit = grid.dataSource._data[item].Credit;
                var RowIndex = $("#sample").val();
                dataSource2.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: RowIndex });
            }          
            var window = $("#BillDetails");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();
            var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            var finalDiff = Number(depitfinTotal - CreditfinTotal);
            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
            $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
            $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
        }
        else if (diffval != "0.00") {            
            ////debugger;
            $("#diffamt").text(diffval);
            var window = $("#Message");
            var kWnd = window.data("kendoWindow");
            kWnd.center().open();

        }
          
    });

    $("#Close").click(function () {
        var window = $("#BillDetails");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    });

    ///ACC NAme Search
    //ACC Name
    $('#grid2').on("click", "td", function (e) {

        //  //debugger;
        var grid = $("#OpenModegrid").data("kendoGrid");
        var Rowinx = grid._rowVirtualIndex;
        var grid2 = $("#grid2").data("kendoGrid");
        var rowIndex1 = grid2._rowVirtualIndex;
        var nu = rowIndex1;
        var no = $("#RowIndexHiden").val();
        var ACC_NM = grid2._current[0].innerHTML;
        var paramValue;            
        paramValue = JSON.stringify({ ID: ACC_NM });
        var gridLewngth = grid2.dataSource.data().length;       
        $.ajax({
            type: "POST",
            contentType: "application/json",
            accepts: "application/json",
            dataType: "json",
            url: "/GLTransaction/AC_DET",
            cache: false,
            charset: 'utf-8',
            data: paramValue,
            success: function (data) {
                var decoded = ACC_NM.replace("&amp;", "&");                                             
                grid._data[no].AC_NM = decoded;                                             
                grid._data[no].AC_CD = data.b;
                grid._data[no].AC_ID = data.a;
                var AC_ID = data.a;                 
                grid._data[no].BillDeatil_IND = data.c;
                grid.refresh();
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
                var AnalysisHiddenGrid = $("#AnalysisHiddenGrid").data('kendoGrid');
                var AC_ID = grid._data[Rowinx].AC_ID;  
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/AnalysisProcess",
                    data: "ID=" + AC_ID,
                    success: function (data) {
                        if (data.a == 1 || data.b == 1 || data.c == 1 || data.d == 1 || data.e == 1 || data.f == 1 || data.l == 1 || data.m == 1 || data.n == 1 || data.o == 1) {
                            grid._data[no].INdVal = "1";
                            grid._data[no].Analysis = "Analysis";
                        }
                        else {
                            grid._data[no].INdVal = "0";
                            grid._data[no].Analysis = "";
                        }
                        grid.refresh();
                    }
                })

                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/PendingBillNM",
                    cache: false,
                    charset: 'utf-8',
                    data: "ID=" + AC_ID,
                    success: function (data) {
                        $("#PendingBillGrid").data("kendoGrid").dataSource.read();                           
                    }
                });
            }
        })
        
        //$(e.container).find('input[name="Depit"]').focus();
        //grid._data[no].AC_NM = grid2._data[nu].AC_NM;
        //grid._data[no].AC_CD = grid2._data[nu].AC_CD;
        //grid._data[no].AC_ID = grid2._data[nu].AC_ID;
        //grid._data[no].BillDeatil_IND = grid2._data[nu].BillDeatil_IND;
        // var AC_ID = grid2._data[nu].AC_ID;     
    });
    //// END POPUP  Value Assign Function 

    //// START POPUP  CLOSE
    $('#grid2').on("dblclick", "td.k-state-selected", function (e) {
        //  //debugger;
        var grid = $("#OpenModegrid").data("kendoGrid");
        var window = $("#AccName");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
        $('#grid').data("kendoGrid").refresh(); 

    });
    //// END POPUP  CLOSE

    /////Analysis Pop code
    $('#AnalysisACCGrid').on("dblclick", "td", function (e) {
        // BOO2
        // //debugger;          
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

    $("#Save").click(function (e) {
      
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

                    dataSource2.add({ RowIndexHiden: RowIndex, A_IND_VAl: A_IND_VAl, B_IND_VAl: B_IND_VAl, C_IND_VAl: C_IND_VAl, D_IND_VAl: D_IND_VAl, E_IND_VAl: E_IND_VAl, F_IND_VAl: F_IND_VAl, L_IND_VAl: L_IND_VAl, M_IND_VAl: M_IND_VAl, N_IND_VAl: N_IND_VAl, O_IND_VAl: O_IND_VAl,A_IND_ID:A_IND_ID,B_IND_ID:B_IND_ID,C_IND_ID:C_IND_ID,D_IND_ID:D_IND_ID,E_IND_ID:E_IND_ID,F_IND_ID:F_IND_ID,L_IND_ID:L_IND_ID,M_IND_ID:M_IND_ID,N_IND_ID:N_IND_ID,O_IND_ID:O_IND_ID, AnalysisAMt: AnalysisAMt });
                }
                grid2.refresh();
                $("#AlertMessageHdn").val("Value Saved Successfully.");
                $("#alertType").val('success');
                // AlertMesaage();
              
                var window = $("#AnalysisVal");
                var kWnd = window.data("kendoWindow");
                kWnd.center().close();
            }
            else {
                $("#AlertMessageHdn").val("can not Empty Value Accepted.");
                $("#alertType").val('fail');
                AlertMesaage();               
            }
        }
        else if (diffval != "0.00") {
            $("#AlertMessageHdn").val("Difference Value Can be Equal to Zero.");
            $("#alertType").val('fail');
            AlertMesaage();          
        }
    });

    $("#Exit").click(function () {
        var window = $("#AnalysisVal");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    });

    $('#AnalysisGrid').on("blur", "td", function (e) {
        var grid = $("#AnalysisGrid").data("kendoGrid");
        var grid2 = $("#OpenModegrid").data("kendoGrid");
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
                if (value != null) {
                    Amount1 = Number(Amount1) + Number(value);
                }
                $("#AnalysisTotal").val(Number(Amount1).toFixed(2));
                var analy = grid2._data[rowind].Depit;
                var analy2 = grid2._data[rowind].Credit;
                if (analy != 0) {
                    var balancee = Number(analy) - Number(Amount1);
                    $("#AnalysisBalance").val(Number(balancee).toFixed(2));
                }
                else if (analy2 != 0) {
                    var balancee = Number(analy2) - Number(Amount1);
                    $("#AnalysisBalance").val(Number(balancee).toFixed(2));
                }

            }
        }
    });

    function editval(e) {
        ////debugger;  
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
                url:"/GLTransaction/AnalysisAcNmValuee",
                data: "ID=" + idVAL,
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

    $("#AnalysisGrid table").on("keyup", "tr", function (e) {
       
        var grid = $("#AnalysisGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var dataSource = grid.dataSource;
        var no1 = total - 1;
        var item = 0;
        var validatae = false;
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
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 40) {
            if (no1 == no) {

                if (validatae == true) {
                    // grid.addRow();
                    dataSource.add({ A_IND_VAl: "", B_IND_VAl: "", C_IND_VAl: "", D_IND_VAl: "", E_IND_VAl: "", F_IND_VAl: "", L_IND_VAl: "", M_IND_VAl: "", N_IND_VAl: "", O_IND_VAl: "", AnalysisAMt: 0 });
                }
                else {
                    $("#AlertMessageHdn").val("can not Empty Value Accepted.");
                    $("#alertType").val('fail');
                    AlertMesaage();                  
                }

            }
            else {
                return true;
            }
        }
        return false;
    });
    //// bANK sEARCH nAME
    $('#BankGrid').on("click", "td", function (e) {
        // //debugger;
        var grid = $("#BankGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        $("#BankNM").val(grid._data[no].BankNM);
        $("#BranchNM").val(grid._data[no].BranchNM);
    });
    //// END POPUP  Value Assign Function 
    //// START POPUP  CLOSE
    $('#BankGrid').on("dblclick", "td.k-state-selected", function (e) {
        //  //debugger;
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
        //debugger;
        var DRCRval = $("#Depicreditval").text();
        var Maingrid = $("#OpenModegrid").data('kendoGrid');
        var diffval = $("#differenceAmount").text();
        var dd = diffval.replace("D/C Difference: ", "");
        diffval = dd;
        var AmountValuee = $("#AmountPop").val();
        var maingridAmt = Number(AmountValuee - diffval);
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
                var RowIndex = $("#sample").val();
                dataSource2.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: RowIndex });
            }
            var window = $("#Message");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();

            var window2 = $("#BillDetails");
            var kWnd2 = window2.data("kendoWindow");
            kWnd2.center().close();
            if (maingridAmt < 0) {
                maingridAmt = Number(-1) * Number(maingridAmt);
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
        var grid = $("#OpenModegrid").data("kendoGrid");
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
                    Amount1 = Number(Amount1) + Number(value);
                    Amount2 = Number(Amount2) + Number(value2);
                }
            }
            if (Amount1 != null && Amount2 != null) {
                TotalValue = (Amount1 - Amount2);
            }
            var DepitTotal = Amount1;
            var CreditTotal = Amount2;

            $("#FinalDiffAMT").text("D/C Difference: " + Number(TotalValue).toFixed(2));
            $("#DepitTotal").text(Number(DepitTotal).toFixed(2));
            $("#CreditTotal").text(Number(CreditTotal).toFixed(2));
        }
    });

    $("#OpenModegrid table").on("keyup", "tr", function (e) {
        //  //debugger;
        var grid = $("#OpenModegrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no1 = total - 1;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 40) {
            if (no1 == no) {
                NewGridRow(keyCode);
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
        return false;
    });

    $("#OpenModegrid table").on("keypress", "td", function (e) {
        ////debugger;
        $("#ConvertRatePOP").val("");
        $("#ForcurAmount").val("");
        $("#AmountPop").val("");
        $("#Depicreditval").text("");
        $("#ForeignCurrAmountPOP").val("");
        $("#ForeginDiffAmount").val("");
        $("#PopupDepitTotal").val("");
        $("#PopupCreditTotal").val("");
        ////debugger;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grdd = document.getElementById("DC");
        var grdd1 = document.getElementById("Depit");
        var grdd2 = document.getElementById("Credit");
        var grdd3 = document.getElementById("AC_NM");
        var grdd4 = document.getElementById("Narration");

        if (grdd != null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 == null) {

            if (grdd.id == "DC") {
                //var grid = $("#OpenModegrid").data("kendoGrid");
                //var rowIndex = grid._rowVirtualIndex;
                //var no = rowIndex;
                //var dataSource = grid.dataSource;
                //var value = grid.dataSource._data[no].DC;
                //var len = value.length;
                //if (keyCode == 67 || keyCode == 99) {
                //    var data = $("#OpenModegrid").data().kendoGrid.dataSource.data()[no];
                //    data.set("DC", "CR");
                //    grid._data[no].Depit = 0;
                //    $("#grid").data("kendoGrid").refresh();
                //    return false;
                //}
                //else if (keyCode == 68 || keyCode == 100) {
                //    var data = $("#grid").data().kendoGrid.dataSource.data()[no];
                //    data.set("DC", "DR");
                //    grid._data[no].Credit = 0;
                //    $("#grid").data("kendoGrid").refresh();
                //    return false;
                //}
                //else if (keyCode != 67 && keyCode != 68 && keyCode != 99 && keyCode != 100) {
                //    return false;
                //}
            }
        }

        else if (grdd == null && grdd1 != null && grdd2 == null && grdd3 == null && grdd4 == null) {

            if (grdd1.id == "Depit") {

                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66 || keyCode == 98) {

                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grid.dataSource._data[no].Credit;
               
                    if (DepitVal != 0 || CreditVal != 0) {
                        if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                            var id = grid.dataSource._data[no].Currency;
                            $.ajax({
                                type: "POST",
                                url: "/GLTransaction/ForeignCurrency",
                                data: "Currency=" + id,
                                success: function (data) {
                                    $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);

                                    var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                    var convertratee = data.d.PURConvertRate;
                                    var ForgAmount = "0";
                               
                                
                                    var AmountValuee = $("#AmountPop").val();
                                    var grid2 = $("#Popupgrid").data('kendoGrid');
                                    // $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
                                    $("#ForeignCurrAmountPOP").val(Number(ForgAmount).toFixed(2));
                                    $("#ForeginDiffAmount").val(Number(ForgAmount).toFixed(2));
                                   
                                }
                            });

                          
                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0 || grid.dataSource._data[no].Credit == "" || grid.dataSource._data[no].Credit == null) {
                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                $("#Depicreditval").text("DR");
                            }
                            else if (grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Depit == "" || grid.dataSource._data[no].Depit == null  && grid.dataSource._data[no].Credit != 0) {
                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                $("#Depicreditval").text("CR");
                            }

                          
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
                            if (grid.dataSource._data[no].ReferenceName != "D") {
                                for (; item < total; item++) {
                                    var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid3.dataSource._data[item].BillDate;
                                    var Duedate = grid3.dataSource._data[item].Duedate;
                                    var Depit = grid3.dataSource._data[item].Depit;
                                    var Credit = grid3.dataSource._data[item].Credit;
                                    var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                    if (rowIndex == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });
                                      }
                                }
                            }
                            else {

                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    if (grid.dataSource._data[no].AC_ID == ACC_ID) {
                                        if (grid.dataSource._data[no].Depit == Depit || grid.dataSource._data[no].Credit == Credit) {
                                            dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });
                                        }
                                    }
                                }
                            }
                            Total(e);
                            billrow(e);
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
                else if (keyCode != 66 || keyCode != 98) { }
            }

        }
        else if (grdd == null && grdd1 == null && grdd2 != null && grdd3 == null && grdd4 == null) {
            if (grdd2.id == "Credit") {
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66 || keyCode == 98) {
                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grid.dataSource._data[no].Credit;
                    if (DepitVal != 0 || CreditVal != 0) {
                        if (grid.dataSource._data[no].BillDeatil_IND == 1) {
                            var id = grid.dataSource._data[no].Currency;
                            $.ajax({
                                type: "POST",
                                url: "/GLTransaction/ForeignCurrency",
                                data: "Currency=" + id,
                                success: function (data) {
                                    $("#ForeignCurrNMPOP").val(data.d.ForeignCurrNM);
                                    var ConvertbuttonType = grid.dataSource._data[no].ConvertButton;
                                    var convertratee = data.d.PURConvertRate;
                                    var ForgAmount = "0";
                                  
                                    var AmountValuee = $("#AmountPop").val();
                                    // $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
                                    $("#ForeignCurrAmountPOP").val(Number(ForgAmount).toFixed(2));
                                    $("#ForeginDiffAmount").val(Number(ForgAmount).toFixed(2));
                                }
                            });
                            if (grid.dataSource._data[no].Depit != 0 && grid.dataSource._data[no].Credit == 0 || grid.dataSource._data[no].Credit == "" || grid.dataSource._data[no].Credit == null) {
                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                $("#Depicreditval").text("DR");
                            }
                            else if (grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Depit == "" || grid.dataSource._data[no].Depit == null && grid.dataSource._data[no].Credit != 0) {
                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                $("#Depicreditval").text("CR");
                            }

                        
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
                            if (grid.dataSource._data[no].ReferenceName != "D") {
                                for (; item < total; item++) {
                                    var ReferenceName = grid3.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid3.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid3.dataSource._data[item].BillDate;
                                    var Duedate = grid3.dataSource._data[item].Duedate;
                                    var Depit = grid3.dataSource._data[item].Depit;
                                    var Credit = grid3.dataSource._data[item].Credit;
                                    var ACC_ID = grid3.dataSource._data[item].AC_ID;
                                    if (rowIndex == ACC_ID) {
                                        dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });

                                    }
                                }
                            }
                            else {

                                for (; item < total4; item++) {
                                    var ReferenceName = grid4.dataSource._data[item].ReferenceName;
                                    var ReferenceTypeName = grid4.dataSource._data[item].ReferenceTypeName;
                                    var BillDate = grid4.dataSource._data[item].BillDate;
                                    var Duedate = grid4.dataSource._data[item].Duedate;
                                    var Depit = grid4.dataSource._data[item].Depit;
                                    var Credit = grid4.dataSource._data[item].Credit;
                                    var ACC_ID = grid4.dataSource._data[item].AC_ID;
                                    if (grid.dataSource._data[no].AC_ID == ACC_ID) {
                                        if (grid.dataSource._data[no].Depit == Depit || grid.dataSource._data[no].Credit == Credit) {
                                            dataSource.add({ ReferenceTypeName: ReferenceTypeName, ReferenceName: ReferenceName, BillDate: BillDate, Duedate: Duedate, Depit: Depit, Credit: Credit, AC_ID: ACC_ID });
                                        }
                                    }
                                }
                            }

                            Total(e);
                            billrow(e);
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
                else if (keyCode != 66 || keyCode != 98) { }
            }
        }
       
    });
    //// END Depit & Credit Editable False Function 
    $("#OpenModegrid table").on("change", "td", function (e) {
        // //debugger;
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grdd1 = document.getElementById("Depit");
        var grdd2 = document.getElementById("Credit");
        var grdd3 = document.getElementById("Currency");

        // //debugger;
        if (grdd1 != null && grdd2 == null && grdd3 == null) {
            if (grdd1.id == "Depit") {
                var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
            }
        }
        else if (grdd1 == null && grdd2 != null && grdd3 == null) {
            if (grdd2.id == "Credit") {
                var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

            }
        }

        else if (grdd1 == null && grdd2 == null && grdd3 != null) {
            if (grdd3.id == "Currency") {
                var grid = $("#OpenModegrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                //  var currencyVAL = grid.dataSource._data[no].Currency;
                grid._data[no].Depit = 0;
                grid._data[no].Credit = 0;
                var id = grdd3.value;
                if (id != "RS") {
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/ForeignCurrency",
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

                            var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                            var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                            var finalDiff = Number(depitfinTotal - CreditfinTotal);
                            $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                            $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                            $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

                            // grid.refocusLastEditedCell();     
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
                        }

                    });
                   // $("#ForeignCurrencyDIV").show();
                }
                else if (id == "RS") {
                    grid._data[no].Depit = 0;
                    grid.dataSource._data[no].Credit = 0;
                    grid.dataSource._data[no].ConvertButton = "R";
                    grid.dataSource._data[no].Currency = id;
                    $("#ForeignCurrencyDIV").hide();
                    grid.closeCell();
                    grid.refresh();
                    var depitfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                    var CreditfinTotal = $("#OpenModegrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                    var finalDiff = Number(depitfinTotal - CreditfinTotal);
                    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                    $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                    $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

                }
            }

        }
    });

    $("#PendingBillGrid table").on("change", "td", function (e) {
    
        var grid = $("#PendingBillGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        document.getElementById("chkbx");
        var dataSource = grid.dataSource;
        var value = grid.dataSource._data[no].AmountPop;

        if (grid._current[0].childNodes[0].checked == true) {
            grid.dataSource._data[no].Select = true;

        }
        else if (grid._current[0].childNodes[0].checked == false) {
            grid.dataSource._data[no].Select = false;
        }

        var total = grid.dataSource.data().length;
        if (total != 0) {
            var no = (total - 1);
            var Amount1 = "0";
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var value = grid.dataSource._data[item].AmountPop;
                    Amount1 = Number(Amount1) + Number(value);
                }
            }
        }

        $("#AmountPopG").val(Number(Amount1).toFixed(2));

    });
    $(document).on("click", "#AllCheck", function () {
            
        var grid = $("#PendingBillGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var dataSource = grid.dataSource;
        if (this.checked) {
            $("#PendingBillGrid tbody input:checkbox").attr("checked", this.checked);

            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = true;

                }

                var total = grid.dataSource.data().length;
                if (total != 0) {
                    var no = (total - 1);
                    var Amount1 = "0";
                    var item = 0;
                    for (; item < total; item++) {
                        var value = grid.dataSource._data[item].AmountPop;
                        Amount1 = Number(Amount1) + Number(value);
                    }
                }
                $("#AmountPopG").val(Number(Amount1).toFixed(2));

            }
        }
        else {
            $("#PendingBillGrid tbody input:checkbox").attr("checked", false);
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = false;
                }
                $("#AmountPopG").val(Number(0).toFixed(2));
            }
        }


        var total = grid.dataSource.data().length;
        if (total != 0) {
            var no = (total - 1);
            var Amount1 = "0";
            var item = 0;
            for (; item < total; item++) {
                var value = grid.dataSource._data[item].AmountPop;
                Amount1 = Number(Amount1) + Number(value);
            }
        }

        $("#AmountPopG").val(Number(Amount1).toFixed(2));
    });
    $(document).on("click", "#Autoadj", function () {     
        var grid = $("#PendingBillGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var dataSource = grid.dataSource;
        var DCVal = $("#Depicreditval").text();


        //  $(this).find("input[type=checkbox] .chkbox").prop('checked', true);
        // grid.find("td input:checkbox").prop("checked", $(this).prop("checked"));

        if (DCVal == "DR") {
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    if (grid.dataSource._data[item].DC == "CR") {
                        grid.dataSource._data[item].Select = true;
                        $(this).find("input[type=checkbox] #chkbox").prop('checked', true);
                        break;
                    }
                }
            }
        }
        else {
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    if (grid.dataSource._data[item].DC == "DR") {
                        grid.dataSource._data[item].Select = true;
                        $(this).find("input[type=checkbox] #chkbox").prop('checked', true);
                        break;
                    }
                }
            }
        }
        var total = grid.dataSource.data().length;
        if (total != 0) {
            var no = (total - 1);
            var Amount1 = "0";
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var value = grid.dataSource._data[item].AmountPop;
                    Amount1 = Number(Amount1) + Number(value);
                }
            }
        }

        $("#AmountPopG").val(Number(Amount1).toFixed(2));

    });
    $(document).on("click", "#Okpop", function (e) {
     
        var grid = $("#PendingBillGrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var dataSource = grid.dataSource;


        var grid2 = $("#Popupgrid").data("kendoGrid");
        var rowIndex2 = grid2._rowVirtualIndex;
        var no2 = rowIndex2;
        var dataSource2 = grid2.dataSource;

        grid2.select().each(function () {
            var dataItem = grid2.dataItem($(this));
            // grid1.removeRow($(dataItem)); //just gives alert message
            grid2.dataSource.remove(dataItem);

        })

        var total = grid.dataSource.data().length;
        if (total != 0) {
            var no = (total - 1);
            var Amount1 = "0";
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var ReferenceName = grid.dataSource._data[item].ReferenceName;
                    var Duedate = grid.dataSource._data[item].Duedate;
                    var AmountPop = grid.dataSource._data[item].AmountPop;
                    var SnoBill = grid.dataSource._data[item].SnoBill;

                    if (AmountPop > 0) {
                        dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: 0, Credit: AmountPop, SnoBill: SnoBill });
                        var uid = grid._data[item].uid;
                        var row = grid.table.find('tr[data-uid="' + uid + '"]');
                        grid.select(row);
                        grid.select().each(function () {
                            var dataItem = grid.dataItem($(this));
                            grid.dataSource.remove(dataItem);
                        })
                        item = item - 1;
                        total = grid.dataSource.data().length;
                    }
                    else {
                        var AmountPop = Number(-1) * Number(AmountPop);
                        dataSource2.add({ ReferenceTypeName: "AgnsBlRef", ReferenceName: ReferenceName, BillDate: Duedate, Duedate: Duedate, Depit: AmountPop, Credit: 0, SnoBill: SnoBill });

                        var uid = grid._data[item].uid;
                        var row = grid.table.find('tr[data-uid="' + uid + '"]');
                        grid.select(row);
                        grid.select().each(function () {
                            var dataItem = grid.dataItem($(this));
                            grid.dataSource.remove(dataItem);
                        })
                        item = item - 1;
                        total = grid.dataSource.data().length;
                    }
                }
            }
        }
        grid2.refresh();
        POpTotal(e);
        var window = $("#PendingBill");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    });
    $(document).on("click", "#Cancelpop", function () {
        var grid2 = $("#Popupgrid").data("kendoGrid");
        var rowIndex2 = grid2._rowVirtualIndex;
        var no2 = rowIndex2;
        var dataSource2 = grid2.dataSource;
        var CommDate = $("#TrasactionDate").val();
        // dataSource2.add({ ReferenceTypeName: "AgnsBlRef", BillDate: CommDate, Duedate: CommDate });
        var window = $("#PendingBill");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    });