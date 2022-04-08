$(document).ready(function () {
    //debugger;
    //window.COMPID = @Html.Raw();
    //window.COMPID = ViewBag.COMPID;

    //alert(COMPID);


    prcLoadProperty();
    //window.COMPID = @Html.Raw(Json.Encode(ViewBag.COMPID));
    $("#txtReqFDt").kendoDatePicker({format:"dd/MM/yyyy"});
    $("#txtReqFDt").val();

    $("#txtReqTDt").kendoDatePicker({format:"dd/MM/yyyy"});
    $("#txtReqTDt").val();

    //var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
    var todayDate = new Date();
    $("#txtReqFDt").data("kendoDatePicker").value(todayDate);
    $("#txtReqTDt").data("kendoDatePicker").value(todayDate);

    $(".HdrBtnBx").hide();
    LoadDisplay();
});

function prcLoadProperty() {
    debugger;
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
            debugger;
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
    
        }


    });
    //var grid = $("#EmailSupplier").data("KendoGrid");
    //grid.tbody.on("click", ".k-checkbox", onClick);
}

function SendMailClick() {
    //debugger;
    var grid = $("#EmailSupplier").data("kendoGrid");
    var sel = $("input:checked", grid.tbody).closest("tr");

    var Items = [];

    $.each(sel, function (idx, row) {
        var Item = grid.dataItem(row);
        //Items.push(Item.DispNo + "~" + Item.Email + "~" + row.rowIndex);

        if (Item.DispNo != "") {

            var COMPID = $("#COMPID").val();
            var Table = {};
            Table["REQTYPE"] = "POQUOTEEMAIL";
            Table["COMPID"] = COMPID;
            Table["QuoteNo"] = Item.DispNo;
            Table["ToEmailId"] = Item.Email;

            var ParamVal = JSON.stringify(Table);

            $.ajax({
                type: "POST",
                url: "/PurchaseQuote/API_CALL",
                data: "request=" + ParamVal,
                success: function (data) {
                    OutPut = JSON.parse(data);

                    if (OutPut != "") {
                        if (OutPut == "True")
                            grid.dataSource._data[row.rowIndex].Status = 'Send Successfully';
                        else if (OutPut == "false")
                            grid.dataSource._data[row.rowIndex].Status = 'Send Faild';
                    }

                    grid.refresh();
                }
            });
        }
    })

    //for (i = 0; i < Items.length; i++) {

    //    var SelectIDs = [];
    //    SelectIDs = Items[i].split('~');
    //    var OutPut = "";
    //}

    //alert(sel[idx].rowIndex);
    //var element = $("#EmailSupplier").find($('tr[data-uid="' + row.uid + '"]').addClass('SuccessColor'));
    //find($('tr[data-uid="' + row.uid + '"]').cell.css('background-color', '#000').css('color', '#fff'));
}



function onClick(e) {
    debugger;

    var grid = $("#EmailSupplier").data("KendoGrid");
    var row = $(e.target).closest("tr");

    if (row.hasClass("k-state-selected")) {
        setTimeout(function (e) {
            var grid = $("#EmailSupplier").data("KendoGrid");
            grid.clearSelection();
        })
    }
    else
    {
        grid.clearSelection();
    }
}