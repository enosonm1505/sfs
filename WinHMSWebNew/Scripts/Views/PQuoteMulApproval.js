$(document).ready(function () {
    
    prcLoadProperty();

    $("#txtFromDt").kendoDatePicker({ format: "dd/MM/yyyy" });
    $("#txtFromDt").val();

    $("#txtToDt").kendoDatePicker({ format: "dd/MM/yyyy" });
    $("#txtToDt").val();

    $('#txtQtDt').kendoDatePicker({ format: "dd/MM/yyyy" });

    var todayDate = new Date();
    $("#txtQtDt").data("kendoDatePicker").value(todayDate);

    var todayDate = new Date();
    $("#txtFromDt").data("kendoDatePicker").value(todayDate);
    $("#txtToDt").data("kendoDatePicker").value(todayDate);

    $(".HdrBtnBx").hide();

    var listsource = [{ "Item": "Quote Date", "Value": "QD" }, { "Item": "Batch No.", "Value": "BN" }];
    $("#ddlApprove").kendoDropDownList({ dataTextField: "Item", dataValueField: "Value", dataSource: listsource, height: 100 });

    $("#ddlApprove").change(function () {
        if ($("#ddlApprove").val() == "BN") {
            $("#lblBatch").show();
            $("#txtBatchNo").show();
            $("#btnBathNo").show();
            $("#lblFrom").hide();
            $("#divFromDt").hide();
            $("#lblTo").hide();
            $("#divToDt").hide();
        }
        else {
            $("#lblBatch").hide();
            $("#txtBatchNo").hide();
            $("#btnBathNo").hide();
            $("#lblFrom").show();
            $("#divFromDt").show();
            $("#lblTo").show();
            $("#divToDt").show();
        }
    });

    $("#txtProdIds").hide();
    $("#btnSpecProd").hide();
    $("#ChkSpecific").change(function () {
        if ($("#ChkSpecific").prop("checked") == true) {
            $("#txtProdIds").show();
            $("#btnSpecProd").show();
        }
        else {
            $("#txtProdIds").hide();
            $("#btnSpecProd").hide();
        }
    });


    $("#grdPriceList ChkApprove:checkbox").change(function () {
        if ($(this).is(":checked")) {
            //alert("ok1");
        }
    });

    $('#grdQuoteApproval').on("click", "#IDChkPreff", function (e) {
        //debugger;
        var grid = $("#grdQuoteApproval").data("kendoGrid");
        var Selected = $(this).is(':checked');
        var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;

        if (Selected == true) {

            var CurProd = grid._data[rowIndex].hProdId;

            for (var j = 0; j < grid._data.length; j++) {

                $.each(grid._data, function (rowIndex, row) {

                    var PevProd = grid._data[j].hProdId;

                    if (PevProd.trim() == CurProd.trim())
                        grid.dataSource._data[j].Preff = "0";
                });
            }
            grid.dataSource._data[rowIndex].Preff = "1";
            grid.dataSource._data[rowIndex].Approve = "1";
            grid.dataSource._data[rowIndex].Reject = "";
        }
        else {
            if (grid.dataSource._data[rowIndex].Approve == "1")
                grid.dataSource._data[rowIndex].Preff = "";
            else {
                grid.dataSource._data[rowIndex].Preff = "";
                grid.dataSource._data[rowIndex].Approve = "";
            }
        }
        grid.refresh();

    });

    $('#grdQuoteApproval').on("click", "#IDChkApprove", function (e) {
        //debugger;
        //alert(0);
        var grid = $("#grdQuoteApproval").data("kendoGrid");
        var Selected = $(this).is(':checked');
        var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
        var no = rowIndex;
        if (Selected == true) {
            if (grid.dataSource._data[no].Reject == "1") {
                grid.dataSource._data[no].Reject = "";
                grid.dataSource._data[no].Approve = "1";
            }
            else {
                grid.dataSource._data[no].Approve = "1";
            }
        }
        else {
            if (grid.dataSource._data[no].Preff == "1") {
                grid.dataSource._data[no].Preff = "";
                grid.dataSource._data[no].Approve = "";
            }
            else {
                grid.dataSource._data[no].Approve = "";
            }
        }
        grid.refresh();

    });

    $('#grdQuoteApproval').on("click", "#IDChkReject", function (e) {
        //debugger;
        //alert(0);
        var grid = $("#grdQuoteApproval").data("kendoGrid");
        var Selected = $(this).is(':checked');
        var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
        var no = rowIndex;
        if (Selected == true) {
            if (grid.dataSource._data[no].Preff == "1") {
                grid.dataSource._data[no].Approve = "";
                grid.dataSource._data[no].Preff = "";
                grid.dataSource._data[no].Reject = "1";
            }
            else if (grid.dataSource._data[no].Approve == "1") {
                grid.dataSource._data[no].Reject = "1";
                grid.dataSource._data[no].Approve = "";
            }
            else {
                grid.dataSource._data[no].Reject = "1";
            }
        }
        else {
            grid.dataSource._data[no].Reject = "";
        }
        grid.refresh();
    });

    $("#CmnDivPOP").on('shown.bs.modal', function () {
        var grid = $("#CmnGridPOP").data("kendoGrid");
        grid.refresh();
    });

    $("#btnCncl,#btnclose").click(function () {
        $("#CmnDivPOP").modal("hide");
        $("#CmnGridPOP").empty();
    });

    $("#divPopProduct").on('shown.bs.modal', function () {
        var grid = $("#grdProdSrch").data("kendoGrid");
        grid.refresh();
    });

    $("#btnPrdCls,#btnPCls").click(function () {
        $("#divPopProduct").modal("hide");
        $("#grdProdSrch").empty();
    });

    $("#txtQtDt").change(function () {
        //debugger;
        GridPopQT();
        PrcLoadBatchList();
    });

    $("#grdProdSrch").on("click", "tbody > tr > td", function () {
        //$('#grdProdSrch').on("click", "tr", function (e) {
        var gridop = $("#grdProdSrch").data("kendoGrid");
        var row = $(this).closest("tr");
        var rowindex = gridop.selectable.userEvents.currentTarget.rowindex;
        var selitem = gridop.dataItem(gridop.select());

        var ArrayItm = [];
        var Items = "";

        var ProdId = selitem.PROD_ID;
        var ProdNm = selitem.PROD_NM1;

        if (ProdId.trim() != "") {
            $("#txtProdIds").val(ProdNm);
            $("#hdnProdId").val(ProdId);
            $("#divPopProduct").modal('hide');
        }
    })
});

function prcLoadProperty() {
    //debugger;
    window.Prop_Id = "";
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

function PrcDisplayQuote() {
    //debugger;

    var Table = {};
    Table["REQTYPE"] = "QUOTEAPPROVAL";
    Table["COMPID"] = $("#COMPID").val();
    Table["RptBaseTp"] = $("#ddlApprove").val();
    Table["StartDt"] = $("#txtFromDt").val();
    Table["EndDt"] = $("#txtToDt").val();
    Table["BatchNo"] = $("#hdnBatchId").val();

    if ($("#ChkSpecific").prop("checked") == true)
        Table["ProdIds"] = $("#hdnProdId").val();
    else
        Table["ProdIds"] = "";
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var result = $.parseJSON(data);
            var dataresult = "";

            $("#grdQuoteApproval").kendoGrid({
                scrollable: true,
                pageable: false,
                resizable: true,
                Batch: true,
                selectable: true,
                ServerOperation: false,
                dataSource: {
                    data: result,
                    pageSize: 500,
                },
                columns: [
                         {
                             field: "ProdId", title: "Prod Id", width: "100px",
                             headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "Product", title: "Product", width: "200px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "Uom", title: "Uom", width: "75px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "Supplier", title: "Supplier", width: "200px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "CurrName", title: "Currency", width: "75px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "Rate", title: "Rate", width: "85px", attributes: { style: "text-align:right" }, headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             }
                         },
                         {
                             field: "Preff", width: "100px", title: "Preff Supplier ", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },

                             template: "<input type='checkbox' name='ChkSelect' id='IDChkPreff' #=Preff=='1'?  checked='checked':''#   height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
                         },
                         {
                             field: "Approve", width: "70px", title: "Approve ", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                             template: "<input type='checkbox' name='ChkSelect' id='IDChkApprove' #=Approve=='1'?  checked='checked':''#  height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
                         },
                         {
                             field: "Reject", width: "70px", title: "Reject ", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                             template: "<input type='checkbox' name='ChkSelect' id='IDChkReject'  #=Reject=='1'?  checked='checked':''#  height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
                         },
                         {
                             field: "ShrtQty", title: "Shortage Qty", width: "100px", attributes: { style: "text-align:right" }, headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "DelayDay", title: "Delay Days", width: "100px", attributes: { style: "text-align:right" }, headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "BatchNo", title: "Batch No", width: "100px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "ValidUp", title: "Valid Upto", width: "100px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "QuoteDt", title: "Quote Dt", width: "100px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "QuoteNo", title: "Quote No", width: "100px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "RRNo", title: "PR No", width: "150px", headerAttributes: {
                                 "class": "table-header-cell", style: "text-align:center"
                             },
                         },
                         {
                             field: "hProdId", style: "text-align:center", "visible": false
                         },
                ],
            });
        }
    });
};

function PopupBatch() {
    //debugger;
    GridPopQT();
    PrcLoadBatchList();
}

function PrcLoadBatchList() {
    $("#txtQtDt").val();

    var reqobj = {};
    reqobj["COMPID"] = $("#COMPID").val();
    reqobj["REQTYPE"] = "BATCHSELECT";
    reqobj["CreatDt"] = $("#txtQtDt").val();

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            if (data != "") {
                var values = JSON.parse(data);
                var grid = $("#CmnGridPOP").data("kendoGrid");
                grid.dataSource.data(values);
            }
            else {
                $("#CmnGridPOP").empty();
            }
        }
    });
    $("#CmnDivPOP").modal('show');
}

var GridPopQT = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BATCH_ID: { type: "string" },
                    BATCH_REF: { type: "string" },
                    BATCH_DESC: { type: "string" },
                }
            }
        },
    });

    $("#CmnGridPOP").kendoGrid({
        dataSource: datsource,
        filterable:
        {
            mode: "row"
        },
        selectable: "row",
        height: 370,
        columns: [
            {
                field: "BATCH_ID", title: 'Batch No', width: "20%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
            {
                field: "BATCH_REF", title: 'Ref No', width: "20%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
            {
                field: "BATCH_DESC", title: 'Description', width: "50%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: "10%", title: "", headerAttributes: {
                    "class": "table-header-cell", style: "text-align:center"
                },
                template: "<input type='checkbox' name='ChkSelect' id='ChkSelect'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
            },
        ],
        editable: false,
    });
}

function SelectBatchNo() {
    //debugger;
    var grid = $("#CmnGridPOP").data("kendoGrid");
    var sel = $("input:checked", grid.tbody).closest("tr");

    var Items = "";
    var ArrayItm = [];

    $.each(sel, function (idx, row) {
        var Item = grid.dataItem(row);

        if (Items == "")
            Items = Item.BATCH_ID;
        else
            Items = Items + "','" + Item.BATCH_ID;

        ArrayItm.push(Item.BATCH_ID);
    })

    if (Items == "") {
        alert('Select atleast one Record');
    }
    else {

        $("#hdnBatchId").val(Items);
        $("#txtBatchNo").val(ArrayItm);
        $("#CmnDivPOP").modal("hide");
        $("#CmnGridPOP").empty();
    }
}

//Product Popup
function fnGetPopProd() {
    ProdGridPop();
    PrcLoadProductList();
}

var ProdGridPop = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PROD_ID: { type: "string" },
                    PROD_NM1: { type: "string" },
                    PROD_NM2: { type: "string" },
                }
            }
        },
    });

    $("#grdProdSrch").kendoGrid({
        dataSource: datsource,
        filterable:
        {
            mode: "row"
        },
        selectable: "row",
        pageable: {
        },
        height: 370,
        columns: [
            {
                field: "PROD_ID", title: 'Prod ID', width: "20%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
            {
                field: "PROD_NM1", title: 'Prod Name', width: "80%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
        ],
        editable: false,
        pageSize: 10
    });
}

function PrcLoadProductList() {

    var reqobj = {};
    reqobj["COMPID"] = $("#COMPID").val();
    reqobj["REQTYPE"] = "MSTPRODUCT";

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            if (data != "") {
                var values = JSON.parse(data);
                var grid = $("#grdProdSrch").data("kendoGrid");
                grid.dataSource.data(values);
            }
            else {
                $("#grdProdSrch").empty();
            }
        }
    });

    $("#divPopProduct").modal('show');
}

function fnSaveQuoteApproval() {
    //debugger;
    var RecItems1 = $("#grdQuoteApproval").data('kendoGrid').dataSource.data();

    var Table = {};
    Table["REQTYPE"] = "QUOTEAPPROVALSAVE";
    Table["COMPID"] = $("#COMPID").val();
    Table["grdQuoteAprl"] = JSON.stringify($("#grdQuoteApproval").data('kendoGrid').dataSource.data());
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        async: false,
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var Result = JSON.parse(data.trim());
            if (Result == "SUCCESS") {
                $("#DivAlertPopup").modal('show');
                $("#DivSuccess").show();
                $("#DivAlert").hide();
                $(".AlertPoptxt").text("Updated Sucessfully.");
                PrcDisplayQuote();
            }
            else {
                $("#DivAlert").show();
                $("#DivSuccess").hide();
                $(".AlertPoptxt").text("Updated Failed!");
                $("#DivAlertPopup").modal('show');
            }
        }
    });
}