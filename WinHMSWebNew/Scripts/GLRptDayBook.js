$(document).ready(function () {
    
})

$("[name='Depit']").attr("min", "0");      
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent;
var objbrowserName = navigator.appName;
var objfullVersion = '' + parseFloat(navigator.appVersion);
var objBrMajorVersion = parseInt(navigator.appVersion, 10);
var objOffsetName, objOffsetVersion, ix;
$("#differenceAmount").text("D/C Difference: " + Number(0).toFixed(2));
//$("#grid2").data("kendoGrid").refresh();
$("#ForeignCurrencyDIV").hide();
$("#HiddenGrid").hide();
var Window1 = null;
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


    // //debugger;

  
    //Default Row

    //// START GRID Values SAVE function 
   
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
                                    var grid2 = $("#Popupgrid").data('kendoGrid');
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
                            $("#AlertMessageHdn").val("Bill Detail Not Applicable.");
                            $("#alertType").val('fail');
                            AlertMesaage();
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
                            $("#AlertMessageHdn").val("Bill Detail Not Applicable.");
                            $("#alertType").val('fail');
                            AlertMesaage();
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
                var window = $("#Narrationpop");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
                return false;

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


    $("#ClosePOP").click(function () {
        window.close();
    });


    $("#created").change(function () {
        // debugger;
        var grid = $("#DayBookgrid").data("kendoGrid");
        if (this.checked) {
            grid.showColumn("CreateBy");
        }
        else {
            grid.hideColumn("CreateBy");
        }
    });
    $("#Narration").change(function () {
        //debugger;
        var grid = $("#DayBookgrid").data("kendoGrid");
        if (this.checked) {
            grid.showColumn("Narration");
        }
        else {
            grid.hideColumn("Narration");
        }
    });

    function printGrid() {

        var gridElement = $('#grid'),
            printableContent = '',
            win = window.open('', '', 'width=800, height=500'),
            doc = win.document.open();

        var htmlStart =
                '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8" />' +
                '<title>Kendo UI Grid</title>' +
                '<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
                '<style>' +
                'html { font: 11pt sans-serif; }' +
                '.k-grid { border-top-width: 0; }' +
                '.k-grid, .k-grid-content { height: auto !important; }' +
                '.k-grid-content { overflow: visible !important; }' +
                'div.k-grid table { table-layout: auto; width: 100% !important; }' +
                '.k-grid .k-grid-header th { border-top: 1px solid; }' +
                '.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
                '</style>' +
                '</head>' +
                '<body onload="window.print()">';

        var htmlEnd =
                '</body>' +
                '</html>';

        var gridHeader = gridElement.children('.k-grid-header');
        if (gridHeader[0]) {
            var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
            printableContent = gridElement
                .clone()
                    .children('.k-grid-header').remove()
                .end()
                    .children('.k-grid-content')
                        .find('table')
                            .first()
                                .children('tbody').before(thead)
                            .end()
                        .end()
                    .end()
                .end()[0].outerHTML;
        } else {
            printableContent = gridElement.clone()[0].outerHTML;
        }

        doc.write(htmlStart + printableContent + htmlEnd);
        doc.close();
        win.print();
    }

    $("#PeriodDate").click(function () {
        //debugger;
        window.open("/GLTransaction/PeriodDate?PARTIAL=1", "PopupWindow", "width=350,height=400,left=400,top=220");

    })

    $('#DayBookgrid').on("dblclick", "tr", function (e) {
        var grid = $("#DayBookgrid").data("kendoGrid");
        var TRN_IDD = grid.selectable._downTarget[0].childNodes['10'].innerHTML;
        var Narration = grid.selectable._downTarget[0].childNodes['3'].innerHTML;
        var AC_NM = grid.selectable._downTarget[0].childNodes['2'].innerHTML;
        var VouchNo = grid.selectable._downTarget[0].childNodes['4'].innerHTML;
        var VouchType = grid.selectable._downTarget[0].childNodes['5'].innerHTML;
        var Date = grid.selectable._downTarget[0].childNodes['0'].innerHTML;
        var AC_ID = grid.selectable._downTarget[0].childNodes['11'].innerHTML;
        // var Date = convert(dd);        
        $("#TRN_IDD").val(TRN_IDD);
        $("#AC_ID").val(AC_ID);
        $("#Narration").val(Narration);
        $("#VouchNo").val(VouchNo);
        $("#VouchType").val(VouchType);
        $("#Date").val(Date);
        $.ajax({
            type: "POST",
            url: "/GLTransaction/OpenTransaction",
            cache: false,
            charset: 'utf-8',
            data: "ID=" + TRN_IDD,
            success: function (data) {
                Window1 = window.open("/GLTransaction/Transaction?Page=2", "PopupWindow", "width=1100,height=560,left=30,top=50");
                return true;
            }
        });
       
    });

    $('#DayBookgrid').on("click", "tr", function (e) {

        var grid = $("#DayBookgrid").data("kendoGrid");
        var TRN_IDD = grid.selectable._downTarget[0].childNodes['10'].innerHTML;
        var Narration = grid.selectable._downTarget[0].childNodes['3'].innerHTML;
        var AC_NM = grid.selectable._downTarget[0].childNodes['2'].innerHTML;
        var VouchNo = grid.selectable._downTarget[0].childNodes['4'].innerHTML;
        var VouchType = grid.selectable._downTarget[0].childNodes['5'].innerHTML;
        var Date = grid.selectable._downTarget[0].childNodes['0'].innerHTML;             
        $("#TRN_IDD").val(TRN_IDD);
        $("#Narration").val(Narration);
        $("#VouchNo").val(VouchNo);
        $("#VouchType").val(VouchType);
        $("#Date").val(Date);
        $.ajax({
            type: "POST",
            url: "/GLTransaction/OpenTransaction",
            cache: false,
            charset: 'utf-8',
            data: "ID=" + TRN_IDD,
            success: function (data) {
               
            }
        });       
    });

    $("#pdf").click(function () {
        $("#DayBookgrid").data("kendoGrid").saveAsPDF();
        if (Window1 != null) {
            Window1.window.close();
            Window1 = null;
        }
    });
    $("#excelACBook").click(function () {
        //  debugger;
        $("#AccountBookgrid").data("kendoGrid").saveAsExcel();
        if (Window1 != null) {
            Window1.window.close();
            Window1 = null;
        }
    })
    



