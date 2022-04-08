$(document).ready(function () {
    $("#pageload").hide();
    //debugger;
    prcLoadProperty();
    $("#txtReqFDt").kendoDatePicker({ format: "dd/MM/yyyy" });
    $("#txtReqFDt").val();

    $("#txtReqTDt").kendoDatePicker({ format: "dd/MM/yyyy" });
    $("#txtReqTDt").val();

    //var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
    var todayDate = new Date();
    $("#txtReqFDt").data("kendoDatePicker").value(todayDate);
    $("#txtReqTDt").data("kendoDatePicker").value(todayDate);

    $(".HdrBtnBx").hide();
    LoadDisplay();

    $("#ChkASelect:checkbox").change(function () {
        var grid = $("#EmailSupplier").data("kendoGrid");
        grid.refresh();
        var total = grid.dataSource.data().length;

        if ($(this).is(":checked")) {
            $("#EmailSupplier tbody tr input:checkbox").attr("checked", true);
            $("#ChkClear").attr('checked', false);

            if (total != 0) {
                for (var item = 0; item < total - 1; item++) {
                    grid.dataSource._data[item].Select = true;
                }
            }
            $("#ChkClear").attr('Disabled', false);
        }
        //else {
        //    $("#EmailSupplier tbody tr input:checkbox").attr("checked", false);
        //}
    });

    $("#ChkClear:checkbox").change(function () {
        var grid = $("#EmailSupplier").data("kendoGrid");
        var total = grid.dataSource.data().length;

        $("#EmailSupplier tbody tr input:checkbox").attr("checked", false);

        if ($(this).is(":checked")) {

            $("#ChkASelect").attr('checked', false);
            if (total != 0) {
                for (var item = 0; item < total - 1; item++) {
                    grid.dataSource._data[item].Select = false;
                }
            }
        }
    });

    $("#ChkClear").attr('Disabled', true);
    $("#ChkASelect").attr('Disabled', true);
});

function prcLoadProperty() {
    //debugger;
    /*Global Variables of this Project*/
    window.Prop_Id = "";
    /*Global Variables of this Project*/

    //Property Dropdown Load
    var COMPID = $("#COMPID").val();
    var Table = {};
    Table["REQTYPE"] = "PROPERTY";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var ddlcomp = JSON.parse(data);
            //debugger;
            $("#divPropbox").kendoDropDownList({ dataTextField: "COMPANY_NM", dataValueField: "COMPANY_ID", dataSource: ddlcomp, height: 100 });
            $("#divPropbox").data("kendoDropDownList").value(COMPID);
        }
    });

    var OnchangeProp = function () {
        var dropdowlist = $("#divPropbox").data("kendoDropDownList");
        Prop_Id = dropdowlist.value();

        if ($.trim(Prop_Id) != "") {
            $("#divTheme").removeClass("pagefalse");
            DropdownCall(Request, pageurl, $.trim(Prop_Id)); //Request, pageurl, Prop_Id Given Id is the Window Variables of this Project   
        }
        else {
            $("#divTheme").addClass("pagefalse");
        }
    }
}

function LoadDisplay() {
    //debugger;
    var Table = {};
    Table["REQTYPE"] = "EMAILRFQDISP";
    Table["COMPID"] = $("#COMPID").val();
    Table["ChkResend"] = $("#ChkDispatch").prop("checked") ? "1" : "0",
    Table["FrmDate"] = $("#txtReqFDt").val();
    Table["ToDate"] = $("#txtReqTDt").val();
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var result = $.parseJSON(data);
            var dataresult = "";

            if ($.trim(result) != "") {

                $("#EmailSupplier").kendoGrid({
                    scrollable: true,
                    pageable: false,
                    resizable: true,
                    Batch: true,
                    ServerOperation: false,
                    dataSource: {
                        data: result,
                        pageSize: 500,
                    },
                    columns: [
                             {
                                 field: "BatchNo", title: "Batch No", width: "10%",
                                 headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                             {
                                 field: "DispNo", title: "Quote No", width: "10%", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                             {
                                 field: "QtDate", title: "Request Dt", width: "10%", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                             {
                                 field: "SuppNm", title: "Supplier", width: "25%", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                             {
                                 field: "Email", title: "Email", width: "20%", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                             {
                                 width: "8%", title: "Select ", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                                 template: "<input type='checkbox' name='ChkSelect' id='ChkSelect'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
                             },
                             {
                                 field: "Status", title: "Send Status", width: "17%", headerAttributes: {
                                     "class": "table-header-cell", style: "text-align:center"
                                 },
                             },
                    ],
                });


                $("#ChkASelect").attr('Disabled', false);
            }
            else {

                $("#ChkClear").attr('Disabled', true);
                $("#ChkASelect").attr('Disabled', true);
            }
        }
    });
}

function SendMailClick() {
    //debugger;
    var grid = $("#EmailSupplier").data("kendoGrid");
    var data = grid.dataSource.data();

    try {
        $.each(data, function (i, row) {
            var Result = "";
            $("#pageload").show();
            $("#divTheme").addClass("Pagefalse");

            var select = $("input:checked", grid.tbody).closest("tr[data-uid='" + row.uid + "']")
            if (select.length == "1") {
                if (row.DispNo != "") {

                    var COMPID = $("#COMPID").val();
                    var Table = {};
                    Table["REQTYPE"] = "POQUOTEEMAIL";
                    Table["COMPID"] = COMPID;
                    Table["QuoteNo"] = row.DispNo;
                    Table["ToEmailId"] = row.Email;

                    Table["Suppier"] = row.SuppNm;
                    Table["ReqDt"] = row.QtDate;
                    Table["PCurr"] = row.PCurr;
                    Table["EXPTY"] = "M";

                    var ParamVal = JSON.stringify(Table);
                        
                    $.ajax({
                        type: "POST",
                        url: "/PurchaseQuote/APIMailSend",
                        data: "request=" + ParamVal,
                        success: function (Result) {
                            if (Result != "") {
                                if (Result == "True") {
                                    var Status = MailUpdateSts(row.QtNo);
                                    grid.dataSource._data[i].Status = 'Send Successfully';
                                    grid.refresh();
                                    $('tr[data-uid="' + row.uid + '"] td:nth-child(7) ').css("color", "#ffffff");
                                    $('tr[data-uid="' + row.uid + '"] td:nth-child(7) ').css("background-color", "green");
                                }
                                else if (Result == "False") {

                                    grid.dataSource._data[i].Status = 'Send Faild';
                                    grid.refresh();

                                    $('tr[data-uid="' + row.uid + '"] td:nth-child(7) ').css("color", "#ffffff");
                                    $('tr[data-uid="' + row.uid + '"] td:nth-child(7)').css("background-color", "Red");
                                }

                                $("#pageload").hide();
                                $("#divTheme").removeClass("Pagefalse");
                            }
                            else {
                                grid.dataSource._data[i].Status = 'Send Faild';
                                grid.refresh();

                                $('tr[data-uid="' + row.uid + '"] td:nth-child(7) ').css("color", "#ffffff");
                                $('tr[data-uid="' + row.uid + '"] td:nth-child(7)').css("background-color", "Red");

                                $("#pageload").hide();
                                $("#divTheme").removeClass("Pagefalse");
                            }
                         
                        }
                    });
                }
            }
            else
            {
                //if (grid.dataSource._data[i].Status != "") {
                //    grid.dataSource._data[i].Status = "";
                //    grid.refresh();
                //}
            }
        })
    }
    catch (exception) {
        $("#pageload").hide();
        $("#divTheme").removeClass("Pagefalse");
    }
}

function fnPreviewClick() {
    //debugger;
    var grid = $("#EmailSupplier").data("kendoGrid");
    var data = grid.dataSource.data();

    try {
        $.each(data, function (i, row) {
            var Result = "";
            $("#pageload").show();
            $("#divTheme").addClass("Pagefalse");

            var select = $("input:checked", grid.tbody).closest("tr[data-uid='" + row.uid + "']")
            if (select.length == "1") {
                if (row.DispNo != "") {

                    var COMPID = $("#COMPID").val();
                    var Table = {};
                    Table["REQTYPE"] = "POQUOTEEMAIL";
                    Table["COMPID"] = COMPID;
                    Table["QuoteNo"] = row.DispNo;
                    Table["ToEmailId"] = row.Email;
                    Table["Suppier"] = row.SuppNm;
                    Table["ReqDt"] = row.QtDate;
                    Table["PCurr"] = row.PCurr;
                    Table["EXPTY"] = "P";

                    var ParamVal = JSON.stringify(Table);

                    $.ajax({
                        type: "POST",
                        url: "/PurchaseQuote/APIMailSend",
                        data: "request=" + ParamVal,
                        success: function (Result) {
                            if (Result != "") {
                                grid.refresh();
                                window.open(Result, '_blank');
                            }
                            $("#pageload").hide();
                            $("#divTheme").removeClass("Pagefalse");
                        }
                    });
                }
            }
            else {
                //if (grid.dataSource._data[i].Status != "") {
                //    grid.dataSource._data[i].Status = "";
                //    grid.refresh();
                //}
            }
        })
    }
    catch (exception) {
        $("#pageload").hide();
        $("#divTheme").removeClass("Pagefalse");
    }

}

function MailUpdateSts(QuoteNo) {
    //Property Dropdown Load
    var COMPID = $("#COMPID").val();
    var Table = {};
    Table["REQTYPE"] = "UPDATERFQMAIL";
    Table["COMPID"] = COMPID;
    Table["QtNo"] = QuoteNo;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
        }
    });
}