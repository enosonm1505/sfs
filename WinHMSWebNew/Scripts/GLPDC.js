
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
    var grid = $("#grid").data("kendoGrid");
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
     
     maingridrowadd();  
    setTimeout(function () {
        var Trans = $("#Transfer");
        //kendo.ui.progress(Trans, true);
       

            //debugger;
            var grd = $("#grid").data("kendoGrid");
            var len = grd.dataSource._data.length;
            if (len == 0)
            { $("#addrow").click(); kendo.ui.progress(Trans, false); }
      




    }, 2000);
  
    $("#SaveBT").click(function (e) {
        debugger;
        var grid = $("#grid").data('kendoGrid');
        var postUrl;
        var paramValue;
        var gridValue = $("#grid").data("kendoGrid").dataSource.data();
        var gridData = $("#grid").data('kendoGrid').dataSource.data();
        var gridValue2 = $("#HiddenGrid").data("kendoGrid").dataSource.data();
        var gridData2 = $("#HiddenGrid").data('kendoGrid').dataSource.data();
        var AnalysissGrid = $("#AnalysisHiddenGrid").data('kendoGrid').dataSource.data();
        var DivAPPLIND = $("#DivAPPLIND").val();
        var TransDate = $("#Date").val();
        var TranType = $("#Trantype").val();
        var ACCountNm = $("#AccountDtval").val();
        var Division = $("#Division").val();
        var CommonNarration = $("#CommonNarration").val();
        var VoucherNo = $("#VoucherNo").val();
        var ButtonTYpe = $("#ButtonTYpe").val();
        
        paramValue = JSON.stringify({ TransList: gridData, BillList: gridData2, AnalysisList: AnalysissGrid, TranTyID: TranType, TranDate: TransDate, Division: Division, CommaonNarrtion: CommonNarration, VouchNo: VoucherNo, ACCountNm: ACCountNm, ButtonType: ButtonTYpe });
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        if (total == undefined) {
            total = 0;
        }
        var no = (total - 1);
        var TotalValue = $("#FinalDiffAMT").text();
        var dd = TotalValue.replace("D/C Difference: ", "");
        TotalValue = dd;
        var it = 0;
        var checkdatevalidtion = true;
        var checkNovalidtion = true;
        for (; it < total; it++) {
            if (grid.dataSource._data[it].checkDate == "" || grid.dataSource._data[it].checkDate ==  null) {
                checkdatevalidtion = false;
            }
            if (grid.dataSource._data[it].CheckNoStr == "" || grid.dataSource._data[it].CheckNoStr == null) {
                checkNovalidtion = false;
            }
        }
        if (TransDate != "" && TranType != "" && total != 0) {
            if(grid._data[no].Depit != 0 || grid._data[no].Depit != "" || grid._data[no].Credit != 0 || grid._data[no].Credit != "" ){
                if (grid._data[no].AC_NM != null) {
                    if (checkNovalidtion == true) {
                        if (checkdatevalidtion == true) {
                            var id = $("#Date").val(); 
                                $.ajax({
                                    type: "POST",
                                    url: "/GLTransaction/Date",
                                    cache: false,
                                    charset: 'utf-8',
                                    data: "TransDate=" + id,
                                    success: function (data) {
                                        if (data.d != "") {
                                            $("#Date").val(data.d);
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
                                                        url: "/GLTransaction/SaveGridPDC",
                                                        cache: false,
                                                        charset: 'utf-8',
                                                        data: paramValue,
                                                        success: function (data) {
                                                            var alertVal = data.v.ErroMeg;                                                          
                                                            if (alertVal == "Operation Failed..!") {
                                                                $("#AlertMessageHdn").val(alertVal);
                                                                $("#alertType").val('fail');
                                                                AlertMesaage();
                                                            }
                                                            else {
                                                                var buttonObject1 = $("#SaveBT").kendoButton().data("kendoButton");
                                                                buttonObject1.enable(false);
                                                                grid.refresh();
                                                                var bttnty = $("#ButtonTYpe").val();
                                                                if (bttnty == "T") {
                                                                    $("#AlertMessageHdn").val("Updated Successfully..!");                                                                   
                                                                }
                                                                else {
                                                                    $("#AlertMessageHdn").val(alertVal);
                                                                }                                                               
                                                                SaveMesaageWindow();
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
                                        else if (data.d == null) {
                                            $("#Date").val("");
                                            $("#AlertMessageHdn").val("Date is Not in Fisical Year.");
                                            $("#alertType").val('fail');
                                            AlertMesaage();
                                        }                                       
                                    }
                                })                           

                        }

                        else {
                            $("#AlertMessageHdn").val("Cheque Date Can't be Empty..!");
                            $("#alertType").val('fail');
                            AlertMesaage();
                        }
                    }
                    else {
                        $("#AlertMessageHdn").val("Cheque No Can not be Empty..!");
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
            else if (TransDate != "" && TranType != "" && total != 0 && (grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Depit == "" || grid.dataSource._data[no].Credit == 0 || grid.dataSource._data[no].Credit == "" )){
                if (TranType == "2") {
                    $("#AlertMessageHdn").val("Depit Value Can not be Empty..!");
                } else {
                    $("#AlertMessageHdn").val("Credit Value Can not be Empty..!");
                }

                $("#alertType").val('fail');
                AlertMesaage();
            }
        }
        else if (TransDate == "" && TranType == "" && total == 0) {
            $("#AlertMessageHdn").val("Select Transaction Type & Transaction Date.");
            $("#alertType").val('fail');
            AlertMesaage();
        }
        else if (TransDate == "" && TranType != "" && total != 0) {
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

$("#addrow").click(function (e) {
   
        NewGridRow(e);
    
});
$("#deleterow").click(function (e) {
   
        CancelGridRow(e);
    
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

function SaveMesaageWindow() {  
    var meg = $("#AlertMessageHdn").val();
    $("#alertMegsave").text(meg);
  
    var window = $("#MessageSave");
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
            dataSource.add({ DC: dropdownval, Depit: "", Credit: "", Currency: DefaultCurrency, ConvertButton: "R", checkDate: TransDate, RowIndexHiden: total });
        }
    }
 
}

var grid = $("#grid").data("kendoGrid");
    //// START NEW Button Click Function 
function NewGridRow(e) {
   
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
                dataSource.add({ DC: dropdownval, Depit: "", Credit: "", Currency: DefaultCurrency, ConvertButton: "R", checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
            if (0 >= TotalValue && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0 ) {

                if (grid._data[no].AC_NM != null && grid._data[no].AC_NM != "") {

                    if (0 <= TotalValue) {
                        dataSource.add({ DC: dropdownval, AC_NM: null, Depit: TotalValue, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                        dataSource.add({ DC: dropdownval, AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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

            else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0 ) {
                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                    dataSource.add({ DC: dropdownval, AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
            else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && grid.dataSource._data[no].Depit == 0 || grid.dataSource._data[no].Credit == 0 ) {
                $("#AlertMessageHdn").val('Please Select Account Name and Enter Debit & Credit value.');
                $("#alertType").val('fail');
                AlertMesaage();  
            }
            else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null && grid.dataSource._data[no].Depit != 0 || grid.dataSource._data[no].Credit != 0 ) {
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
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));    
    }
    //// END NEW Button Click Function  
    //// START Cancel Button Click Function 
    function CancelGridRow(e) {
        var grid = $("#grid").data("kendoGrid");
        grid.select().each(function () {
            var dataItem = grid.dataItem($(this));
            grid.dataSource.remove(dataItem);        
        })                   
        var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
    }
    //// END Cancel Button Click Function 

    function ClearRowGrid(e) {
        $("#grid").data("kendoGrid").cancelChanges();
        $("#Popupgrid").data('kendoGrid').cancelChanges();
        $("#HiddenGrid").data('kendoGrid').cancelChanges();                  
        $("#ForeignCurrencyDIV").hide();
        var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        var finalDiff = Number(depitfinTotal - CreditfinTotal);
        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
        $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
        $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
    }
//// START TrasactionDate  Change Function 

   
    $("#Date").change(function (e) {
        maingridrowadd();
    })
    $("#Date").blur(function (e) {
        var grid = $("#grid").data('kendoGrid');
        var id = $("#Date").val();
        $.ajax({
            type: "POST",
            url: "/GLTransaction/Date",
            cache: false,
            charset: 'utf-8',
            data: "TransDate=" + id,
            success: function (data) {
                if (data.d != "") {
                    $("#Date").val(data.d);
                }
                else if (data.d == "") {
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

        var grid = $("#grid").data('kendoGrid');
        var Vouchno = $("#VoucherNo").val();
        var Trnatypeid = $("#Trantype").val();

        if (Trnatypeid != "" && Vouchno != 0 && Vouchno != null) {
            if (VOUCH_NO_IND == 2) {
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/VoucherNoValidate",
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
        $(e.container).find('input[name="DC"]').attr("disabled", true);
       // $(e.container).closest("tr").css("background-color", "lightgreen");
        var DefaultCurrency = $("#DefaultCurrency").val();
        var dataSource = grid.dataSource;
        if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
            $(e.container).find('input[name="Analysis"]').attr("disabled", true);
            objbrowserName = "Chrome";
            objfullVersion = objAgent.substring(objOffsetVersion + 7);
            if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
                $(e.container).find('input[name="Depit"]').attr("readonly", true);
                $(e.container).find('input[name="Credit"]').attr("readonly", false);
                $(e.container).find('input[name="Credit"]').focus();
            }
            else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency == DefaultCurrency) {
                $(e.container).find('input[name="Credit"]').attr("readonly", true);
                $(e.container).find('input[name="Depit"]').focus();
            }
            else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
                $(e.container).find('input[name="Depit"]').attr("readonly", true);
                $(e.container).find('input[name="Credit"]').attr("readonly", false);
                $(e.container).find('input[name="Credit"]').focus();
              
            }
            else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].Currency != DefaultCurrency) {
                  $(e.container).find('input[name="Depit"]').attr("readonly", false);
              
                  $(e.container).find('input[name="Credit"]').attr("readonly", true);
                  $(e.container).find('input[name="Depit"]').focus();
            
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
        var dropdownval = $("#dropdownval").val();
        if (grdd != null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 == null) {

            if (grdd.id == "DC") {
               
            }
        }

        else if (grdd == null && grdd1 != null && grdd2 == null && grdd3 == null && grdd4 == null) {
            if (grdd1.id == "Depit") {
                debugger;
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var dropdownval = $("#dropdownval").val();
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                var DepitVal = grdd1.value;
                var CreditVal = grid.dataSource._data[no].Credit;
                if (keyCode == 66) {
                    var DepitVal = grdd1.value;
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
                                        if (DepitVal != 0 && CreditVal == 0) {
                                            $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                            $("#Depicreditval").text(dropdownval);
                                        }
                                        else if (DepitVal == 0 && CreditVal != 0) {
                                            $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                            $("#Depicreditval").text(dropdownval);
                                        }
                                    }
                                    else if (grid.dataSource._data[no].Currency != DefaultCurrency) {

                                        if (ConvertbuttonType == "S") {
                                            var ForgAmount = "0";
                                            if (DepitVal != 0 && CreditVal == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text(dropdownval);
                                            }
                                            else if (DepitVal == 0 && CreditVal != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.SALEConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text(dropdownval);
                                            }
                                        }

                                        else if (ConvertbuttonType == "P") {
                                            var ForgAmount = "0";
                                            if (DepitVal != 0 && CreditVal == 0) {
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text(dropdownval);
                                            }
                                            else if (DepitVal == 0 && CreditVal != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.SALEConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text(dropdownval);
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
                    debugger;
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
                        grid.dataSource._data[no].Depit = Number(DepitVal);
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
                                        dataSource.add({ DC: dropdownval, AC_NM: null, Depit: "", ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                                        dataSource.add({ DC: dropdownval, AC_NM: null, Depit: "", ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                                else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && DepitVal != 0 || CreditVal != 0) {
                                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                    dataSource.add({ DC: dropdownval, AC_NM: null, Depit: "", Credit: "", ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RowIndexHiden: total });
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
                        var finalDiff = Number(depitfinTotal - CreditfinTotal);
                        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
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
        else if (grdd == null && grdd1 == null && grdd2 != null && grdd3 == null && grdd4 == null) {
            if (grdd2.id == "Credit") {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var DepitVal = grid.dataSource._data[no].Depit;
                var CreditVal = grdd2.value;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66 ) {
                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grdd2.value;
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (DepitVal == 0 && CreditVal != 0) {
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

                        grid.dataSource._data[no].Credit = Number(CreditVal);
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
                                        dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                            else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && DepitVal != 0 || CreditVal != 0) {
                                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                    dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                        var finalDiff = Number(depitfinTotal - CreditfinTotal);
                        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
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
                //var window = $("#AccName");
                //var kWnd = window.data("kendoWindow");
                //kWnd.center().open();
                //var datasource = $("#grid2").data("kendoGrid").dataSource;
                ////Clear filters:
                //datasource.filter([]);
                //return false;
              
                 

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
        else if (grdd == null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 != null) {
            if (grdd4.id == "Narration") {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#NarrationValue").val(grid._data[no].Narration);
                var window = $("#Narrationpop");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
                return false;
            }
        }

    });

    $("#grid table").on("keypress", "td", function (e) {
        var charCode = e.which || e.keyCode;
        if (charCode == 46)
            return true
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    });
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
    //// END Depit & Credit Editable False Function      
    $("#grid table").on("keyup", "td", function (e) {

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
                var analvalue = grdd1.value;
                $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(analvalue).toFixed(2));
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                var DepitVal = grdd1.value;
                var CreditVal = grid.dataSource._data[no].Credit;
                if (keyCode == 66) {
                    var DepitVal = grdd1.value;
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (DepitVal == 0 && CreditVal != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }
                                    }
                                    var AmountValuee = $("#AmountPop").val();
                                    var grid2 = $("#Popupgrid").data('kendoGrid');
                                    $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
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
                        grid.dataSource._data[no].Depit = Number(DepitVal);
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
                                        dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                            else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && DepitVal != 0 || CreditVal != 0) {
                                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                    dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                        var finalDiff = Number(depitfinTotal - CreditfinTotal);
                        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
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
        else if (grdd == null && grdd1 == null && grdd2 != null && grdd3 == null && grdd4 == null) {
            if (grdd2.id == "Credit") {
                var analvalue = grdd2.value;
                $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(analvalue).toFixed(2));
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var DepitVal = grid.dataSource._data[no].Depit;
                var CreditVal = grdd2.value;
                $("#sample").val(rowIndex);
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
                var len = value.length;
                if (keyCode == 66) {
                    var DepitVal = grid.dataSource._data[no].Depit;
                    var CreditVal = grdd2.value;
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.SALEConvertRate);
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
                                                ForgAmount = Number(DepitVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(DepitVal).toFixed(2));
                                                $("#Depicreditval").text("DR");
                                            }
                                            else if (DepitVal == 0 && CreditVal != 0) {
                                                ForgAmount = Number(CreditVal) / Number(data.d.PURConvertRate);
                                                $("#ConvertRatePOP").val(Number(data.d.PURConvertRate).toFixed(2));
                                                $("#ForcurAmount").val(Number(ForgAmount).toFixed(2));
                                                $("#AmountPop").val(Number(CreditVal).toFixed(2));
                                                $("#Depicreditval").text("CR");
                                            }
                                        }
                                    }
                                    var AmountValuee = $("#AmountPop").val();
                                    $("#differenceAmount").text(Number(AmountValuee).toFixed(2));
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

                        grid.dataSource._data[no].Credit = Number(CreditVal);
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
                                        dataSource.add({ DC: "DR", AC_NM: null, Depit: Sum, ConvertButton: conButton, Credit: "", Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                            else if (0 < TotalValue && grid.dataSource._data[no].DC != "" && DepitVal != 0 || CreditVal != 0) {
                                if (grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].AC_NM != "") {
                                    dataSource.add({ DC: "CR", AC_NM: null, Depit: "", Credit: TotalValue, ConvertButton: conButton, Currency: FirstRowCurrency, checkDate: TransDate, RefrDate: TransDate, DocDate: TransDate, RowIndexHiden: total });
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
                        var finalDiff = Number(depitfinTotal - CreditfinTotal);
                        $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
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
                var window = $("#AccName");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
                var datasource = $("#grid2").data("kendoGrid").dataSource;
                //Clear filters:
                datasource.filter([]);
                return false;
            }
        }
        else if (grdd == null && grdd1 == null && grdd2 == null && grdd3 == null && grdd4 != null) {
            if (grdd4.id == "Narration") {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                $("#NarrationValue").val(grid._data[no].Narration);
                $("#NarrationValue").focusin();
                var window = $("#Narrationpop");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
                return false;
            }
        }
    });

    $("#grid table").on("change", "td", function (e) {

        var keyCode = (e.keyCode ? e.keyCode : e.which);
        var key = e.key;
        var grdd1 = document.getElementById("Depit");
        var grdd2 = document.getElementById("Credit");
        var grdd3 = document.getElementById("Currency");
        var DefaultCurrency = $("#DefaultCurrency").val();

        if (grdd1 != null && grdd2 == null && grdd3 == null) {
            if (grdd1.id == "Depit") {

                var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
            }
        }
        else if (grdd1 == null && grdd2 != null && grdd3 == null) {
            if (grdd2.id == "Credit") {
                var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                var finalDiff = Number(depitfinTotal - CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));

            }
        }
        else if (grdd1 == null && grdd2 == null && grdd3 != null) {
            if (grdd3.id == "Currency") {
                var grid = $("#grid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var dataSource = grid.dataSource;
                var value = grid.dataSource._data[no].DC;
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
                    var finalDiff = Number(depitfinTotal - CreditfinTotal);
                    $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                    $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                    $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
                }
            }

        }
    });

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
        $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl).toFixed(2));
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
        $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl).toFixed(2));
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
        $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(TotalConVAl).toFixed(2));
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

    $("#ForcurAmount").keypress(function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 109 || keyCode == 189 || keyCode == 45 || keyCode == 173) {
            return false;
        }
        var charCode = (e.which) ? e.which : e.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    })

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
                url: "/GLTransaction/CurrentBalance",
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

    $("#grid table").on("click", "tr.k-state-selected", function (e) {

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
        if (dt != 0 || dt != "") {
            $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(dt).toFixed(2));
        }
        else {
            $("#AnalysisGrid th[data-field= AnalysisAMt]").html(Number(Ct).toFixed(2));
        }
        var grid2 = $("#AnalysisGrid").data("kendoGrid");
        grid2.cancelChanges();

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
            //var window = $("#AccName");
            //var kWnd = window.data("kendoWindow");
            //kWnd.center().open();
            //var grid2 = $("#grid2").data("kendoGrid");
            //var datasource = $("#grid2").data("kendoGrid").dataSource;
            //datasource.filter([]);
            AccountGrid("");
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



    })

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

        var grid1 = $("#Popupgrid").data('kendoGrid');
        var dataSource = grid1.dataSource;
        var ReferenceNM = $("#ReferenceNM").val();

        if (ReferenceNM == "") {
            ReferenceNM = "NewBillRef";
        }
        var TransactionDate = $("#Date").val();
        if (grid1.dataSource.data().length == 0 || grid1.dataSource.data().length == undefined) {
            dataSource.add({ ReferenceTypeName: ReferenceNM, BillDate: TransactionDate, Duedate: TransactionDate, Depit: "", Credit: "", AmountPopG: 0 });
            var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
            $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
            $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));
            $("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
            $("#popNamefieldnm").text("Total: ");
           
        }
    }

    function Total(e) {
        debugger;
        var PopdepitfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Depit.sum;
        var PopCreditfinTotal = $("#Popupgrid").data().kendoGrid.dataSource.aggregates().Credit.sum;
        $("#PopDepitTotal").text(Number(PopdepitfinTotal).toFixed(2));
        $("#PopCreditTotal").text(Number(PopCreditfinTotal).toFixed(2));
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

        var ReferenceNameVal = grid1.dataSource._data[no].ReferenceName;
        var chkfn = "";
        $.ajax({
            type: "POST",
            url: "/GLTransaction/ReferenceNameChk",
            cache: false,
            charset: 'utf-8',
            data: "ReferenceNameVal=" + ReferenceNameVal,
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

        if (chkfn == "true") {

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
        }
    };

    function CancelRowPopup(e) {

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

            var depitfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
            var CreditfinTotal = $("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
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
                    //grid1.dataSource._data[no].Depit = 0
                    //grid1.dataSource._data[no].Credit = 0;
                    //grid1.refresh();
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
                    grid1.dataSource._data[no].ReferenceName = "";
                    grid1.dataSource._data[no].Depit = ""
                    grid1.dataSource._data[no].Credit = "";
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
            var lastVal = grid1.dataSource._data[no].Credit;
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

        var grdd4 = document.getElementById("BillDate");
        var grdd5 = document.getElementById("Duedate");
        var Depitd = document.getElementById("Depit");
        var Creditd = document.getElementById("Credit");
        var ReferenceName = document.getElementById("ReferenceName");

        debugger;
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

                if (ReferenceTypeName != "AgnsBlRef") {
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/ReferenceNameChk",
                        cache: false,
                        charset: 'utf-8',
                        data: "ReferenceNameVal=" + ReferenceNameVal,
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

                    debugger;

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
                                    })
                                    Ptotal = Pendinggid.dataSource.data().length;
                                    break;
                                }
                            }

                        }
                    }

                }

                POpTotal(e);
            }
        }

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

        var grid = $("#Popupgrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        var dataSource = grid.dataSource;

        if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
            objbrowserName = "Chrome";
            objfullVersion = objAgent.substring(objOffsetVersion + 7);

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

        if (keyCode == 40) {

            grid.dataSource._data[no].Depit = Number(DepitVal);
            grid.dataSource._data[no].Credit = Number(CreditVal);

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
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/ReferenceNameChk",
                    cache: false,
                    charset: 'utf-8',
                    data: "ReferenceNameVal=" + ReferenceNameVal,
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
                                    if (DepitVal != 0 || CreditVal != 0 || DepitVal != "" || CreditVal != "") {
                                        dataSource.add({ ReferenceTypeName: ReferenceNM, ReferenceName: null, BillDate: TransactionDate, Duedate: TransactionDate, Depit: "", Credit: "", AmountPopG: 0 });
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


        return true;
    });

    $("#Popupgrid table").on("focus", "td", function (e) {

        var grid = $("#Popupgrid").data("kendoGrid");
        var rowIndex = grid._rowVirtualIndex;
        var no = rowIndex;
        $("#RowIndexHidenPopup").val(rowIndex);
    });

    $("#Done").click(function (e) {
        var diffval = $("#differenceAmount").text();

        var AmountPop = $("#AmountPop").val();

        var dd = diffval.replace("D/C Difference: ", "");
        diffval = dd;

        if (diffval == "0.00") {
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
            var Rowemptychk = "";
            var Valuechk = "";

            if (total != 0) {
                var item3 = 0;
                for (; item3 < total; item3++) {
                    if (grid.dataSource._data[item3].ReferenceTypeName == null || grid.dataSource._data[item3].ReferenceName == null || grid.dataSource._data[item3].ReferenceName == undefined || grid.dataSource._data[item3].ReferenceName == "") {
                        Rowemptychk = "false";
                        break;
                    }
                    if (grid.dataSource._data[item3].Depit == "" && grid.dataSource._data[item3].Credit == "") {
                        Valuechk = "false";
                        break;
                    }
                }

                if (Rowemptychk == "") {
                    if (Valuechk == "") {
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
                    }
                    else {
                        $("#AlertMessageHdn").val("Enter Depit or Credit Value..!");
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                }
                else {
                    $("#AlertMessageHdn").val("Reference Name Can not be empty..!");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
            }
        }

        else if (diffval != "0.00") {

            if (Number(diffval) < Number(AmountPop)) {
                $("#diffamt").text(diffval);
                var window = $("#Message");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
            else {
                $("#AlertMessageHdn").val("Difference Amount: " + diffval + "/-" + "found?");
                $("#alertType").val('fail');
                AlertMesaage();
            }


        }
        else if (diffval == "0.00") {

            $("#AlertMessageHdn").val("D/C Difference should be equal Zero..!");
            $("#alertType").val('fail');
            AlertMesaage();
        }
    });

    $("#Close").click(function () {
        var window = $("#BillDetails");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    });
    ///ACC NAme Search
    //ACC Name
    $('#grid2').on("dblclick", "tr.k-state-selected", function (e) {

        var grid = $("#grid").data("kendoGrid");
        var gridAnalysis = $("#AnalysisGrid").data("kendoGrid");
        var Rowinx = grid._rowVirtualIndex;
        var grid2 = $("#grid2").data("kendoGrid");
        grid.selectable.userEvents.currentTarget.rowIndex;
        var rowIndex1 = grid2.selectable.userEvents.currentTarget.rowIndex;
        var nu = rowIndex1;
        var no = $("#RowIndexHiden").val();
        var ACC_NM = grid2._data[nu].AC_NM;
        var ACC_ID = grid2._data[nu].AC_ID;
        var ACC_CD = grid2._data[nu].AC_CD;
        var BillDeatil_IND = grid2._data[nu].BillDeatil_IND;

        //var decoded = ACC_NM.replace("&amp;", "&");
        var datav = $("#grid").data().kendoGrid.dataSource.data()[no];
        datav.set("AC_NM", ACC_NM);
        datav.set("AC_CD", ACC_CD);
        datav.set("AC_ID", ACC_ID);
        datav.set("BillDeatil_IND", BillDeatil_IND);
        var paramValue;
        paramValue = JSON.stringify({ ID: ACC_NM });
        var gridLewngth = grid2.dataSource.data().length;

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
        gridAnalysis.refresh();
    });
    //// END POPUP  Value Assign Function
    //// START POPUP  CLOSE
    $('#grid2').on("dblclick", "tr.k-state-selected", function (e) {
        var window = $("#AccName");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
        var grid2 = $("#grid2").data("kendoGrid");
        var datasource = $("#grid2").data("kendoGrid").dataSource;
        datasource.filter([]);
        var grid = $("#grid").data("kendoGrid");
        var no = $("#RowIndexHiden").val();
        var uid = grid._data[no].uid;
        // var uid = data[0].uid;
        var row = grid.table.find('tr[data-uid="' + uid + '"]');
        // grid.select(row);

        //  var focusedCell = $("#grid tr[data-uid='" + uid + "'] td:nth-child(" + (7) + ")");
        //$('#grid').data('kendoGrid').editCell(focusedCell);        
    });
    //// END POPUP  CLOSE
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
                AnaSave(e);
            }
        }
    });
    function editval(e) {
        var valigrid = $("#AnalysisGrid").data("kendoGrid");
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

   