
var KotChrgLoad = function (Request, KotChrgID, Glurl, CtrlId) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USRID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = KotChrgID;
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQRes/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //var Detemp = JSON.parse(d);
            var Contorl_lists = [];
            Contorl_lists = CtrlId;
            var Detemp = JSON.parse(d);
            $.each(Detemp.Itm[0], function (key, Value) {
                $.each(Contorl_lists, function (key1, Value1) {
                    var dataid = Value1.Dataids;

                    if (dataid == key) {    
                        if (Value1.Type == 'text')
                            $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                            //debugger;
                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                            ddl.value(Detemp.Itm[0][dataid]);
                        }

                        if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
                            if (Detemp.Itm[0][dataid] == "" || Detemp.Itm[0][dataid] == null)
                                $("#" + Value1.Id)[0].checked = true;
                            else
                                $("#" + Value1.Id)[0].checked = false;
                        }
                    }
                });
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}
var KotSave = function (Request, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["FormMode"] = Request.Mode;
    reqobj["ListData"] = controlValue;
    var grd = $("#Grid").data("kendoGrid").dataSource.data();
    reqobj["Grid"] = JSON.stringify(grd);

  
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            if (Detemp == "SUCCESS") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/SaveImage.png');
                $("#AlertPoptxt").text("Saved Sucessfully.");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").show();
                $("#btnpopAlertcan").hide();
            }
            else if (Detemp == "FAILURE" || Detemp == "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text("Operation Failed!");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
            else if (Detemp != "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text(Detemp);
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
        }
    });
}

var Grid = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BN_GR_NM: { type: "string" },
                    PROD_NM: { type: "string" },
                    RATE: { type: "number" },
                    QTY: { editable: true, type: "number", validation: { min: 0 } },
                    COST_PER: { type: "number" },
                    DISC_AMT: { type: "double" },   
                    NET_VAL: { type: "number" },
                    SRNO: { type: "string" },
                    BN_GR_ID: { type: "string" },
                    PROD_ID: { type: "string" },
                }
            }
        },
    });

    $("#Grid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        scrollable: true,
        navigatable: true,
        columns: [
            { field: "BN_GR_NM", title: 'Type', width: 40, attributes: { style: "text-align:left" }, },
            {
                width: 10,
                template: "<img alt='R' id='SrchProd' width='20px' height='20px' Onclick='fnSrchProdR();' />", attributes: { style: "text-align:center;font-weight:Bolder" }
            },
            { field: "PROD_NM", title: 'Product Name', width: 50, attributes: { style: "text-align:left" } },
            {
                 width: 10,
                 template: "<span class='webix_icon wxi-search'></span><img src='../Images/search_icon.png' id='SrchProd' width='20px' height='20px' Onclick='fnSrchProd();' />", attributes: { style: "text-align:center" }
            },
            {
                width: 10,
                template: "<img alt='O' id='SrchProd' width='20px' height='20px' Onclick='fnSrchProdO();' />", attributes: { style: "text-align:center;font-weight:Bolder" }
            },
            { field: "QTY", title: 'Qty', width: 40, attributes: { style: "text-align:left" } },
            { field: "RATE", title: 'Rate', width: 40, format: "{0:n2}", attributes: { style: "text-align:left" } },
            { field: "NET_VAL", title: 'Value', width: 40, format: "{0:n2}", attributes: { style: "text-align:left" } },
        ],
        editable: true,
    });
}

var GridKotProd = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { type: "string" },
                    NM: { type: "string" },
                    LINK_PROD_GR_ID: { type: "string" },
                }
            }
        },
    });

    $("#CmnGrdGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        // scrollable: true,
        // navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "ID", title: 'Product Id', width: 30, attributes: { style: "text-align:left" } },
            { field: "NM", title: 'Product Nm', width: 70, attributes: { style: "text-align:left" } },
        ],
        //header
        editable: false,
    });
}

var GridKotProdR = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    MENU_ITEM_ID: { type: "string" },
                    MENU_ITEM_NM: { type: "string" },
                    MENU_ITEM_QTY: { type: "string" },
                    BN_GR_ID: { type: "string" },
                    SALE_RT: { type: "string" },
                    F_SL_RATE: { type: "string" },
                    BN_GR_NM: { type: "string" }
                }
            }
        },
    });

    $("#CmnGrdGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        // scrollable: true,
        // navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "BN_GR_NM", title: 'Type', width: 50, attributes: { style: "text-align:left" } },
            { field: "MENU_ITEM_NM", title: 'Item Name', width: 70, attributes: { style: "text-align:left" } },
             { field: "MENU_ITEM_QTY", title: 'Qty', width: 30, attributes: { style: "text-align:left" } },
            { field: "SALE_RT", title: 'Rate', width: 30, attributes: { style: "text-align:left" } },
            
        ],
        //header
        editable: false,
    });
}

var GridKotProdO = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    IT_NM: { type: "string" },
                    BN_GR_ID: { type: "string" },
                    PROD_GR_ID: { type: "string" },
                    PROD_SUB_GR_NM: { type: "string" },
                    R_ID: { type: "string" },
                    PROD_SUB_GR_ID: { type: "string" }
                }
            }
        },
    });

    $("#CmnGrdGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        // scrollable: true,
        // navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "IT_NM", title: 'Item Name', width: 50, attributes: { style: "text-align:left" } },
            { field: "PROD_SUB_GR_NM", title: 'Subgroup Name', width: 70, attributes: { style: "text-align:left" } }

        ],
        //header
        editable: false,
    });
}

function fnSrchProd() {
    debugger;
    var grid = $("#Grid").data("kendoGrid");
    var selitm = grid.dataItem(grid.select());
    var rowindx = grid.selectable.userEvents.currentTarget.rowIndex;

    if ($("#CmnGrdGrid").data("kendoGrid") != undefined)
        $("#CmnGrdGrid").kendoGrid('destroy').empty();

    window.hdnIndx = rowindx;
    GridKotProd();
    window.GetId = $("#imgSrchProd");
    GrdpopUp("IMGSRCHPROD");
    PopId = "IMGSRCHPROD";
    CtrlId = getControlsId();
    $("#CmnGrdHeading").text("Product Search");
    $("#PopDrop").show();
    $("#CmnGrdDiv").modal("show");

    PopHdnId = "KotSrchProd";

    grid.refresh();
}

function fnSrchProdR() {
    debugger;
    var grid = $("#Grid").data("kendoGrid");
    var selitm = grid.dataItem(grid.select());
    var rowindx = grid.selectable.userEvents.currentTarget.rowIndex;

    if ($("#CmnGrdGrid").data("kendoGrid") != undefined)
        $("#CmnGrdGrid").kendoGrid('destroy').empty();

    window.GridProd = selitm.PROD_ID;
    window.hdnIndx = rowindx;
    GridKotProdR();
    window.GetId = $("#imgSrchProd");
    GrdpopUp("IMGSRCHPRODR");
    PopId = "IMGSRCHPRODR";
    CtrlId = getControlsId();
    $("#CmnGrdHeading").text("Reserved Item Search");
    $("#PopDrop").show();
    $("#CmnGrdDiv").modal("show");

    PopHdnId = "KotSrchProdR";

    grid.refresh();
}

function fnSrchProdO() {
    debugger;
    var grid = $("#Grid").data("kendoGrid");
    var selitm = grid.dataItem(grid.select());
    var rowindx = grid.selectable.userEvents.currentTarget.rowIndex;

    if ($("#CmnGrdGrid").data("kendoGrid") != undefined)
        $("#CmnGrdGrid").kendoGrid('destroy').empty();

    window.GridProd = selitm.PROD_ID;
    window.hdnIndx = rowindx;
    GridKotProdO();
    window.GetId = $("#imgSrchProd");
    GrdpopUp("IMGSRCHPRODO");
    PopId = "IMGSRCHPRODO";
    CtrlId = getControlsId();
    $("#CmnGrdHeading").text("Reserved Item Search");
    $("#PopDrop").show();
    $("#CmnGrdDiv").modal("show");

    PopHdnId = "KotSrchProdO";

    grid.refresh();
}


var GridKot = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    KOT_NO: { type: "string" },
                    KOT_DT: { type: "string" },
                    UPDATE_DT: { type: "string" },
                    MKOT_NO: { validation: { required: true }, type: "string" }
                }
            }
        },
    });

    $("#CmnGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        // scrollable: true,
        // navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "MKOT_NO", title: 'KotNo', width: 20, attributes: { style: "text-align:left" } },
            { field: "KOT_DT", title: 'Function Dt', width: 50, attributes: { style: "text-align:left" } },
            { field: "UPDATE_DT", title: 'Time', width: 20, attributes: { style: "text-align:left" } },
        ],
        //header
        editable: false,
    });
}

var GridResv = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {

                    GUEST_NM: { type: "string" },
                    SESSION_NM: { type: "string" },
                    VENUE_NM: { type: "string" },
                    D_NO: { type: "string" },
                    VENUE_ID: { type: "string" },
                    SESSION_NM: { type: "string" },
                    SESSION_ID: { type: "string" },
                    BLOCK_RESERVE_NO: { validation: { required: true }, type: "string" }
                }
            }
        },
    });

    $("#CmnGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        // scrollable: true,
        // navigatable: true,
        // change: Footerrowcalc,
        columns: [
             { field: "BLOCK_RESERVE_NO", title: 'Resv No', width: 25, attributes: { style: "text-align:left" } },
             { field: "D_NO", title: 'P No', width: 25, attributes: { style: "text-align:left" } },
             { field: "GUEST_NM", title: 'Guest Name', width: 70, attributes: { style: "text-align:left" } },
             { field: "VENUE_NM", title: 'Venue Name', width: 40, attributes: { style: "text-align:left" } },
             { field: "SESSION_NM", title: 'Session Name', width: 40, attributes: { style: "text-align:left" } },
        ],
        //header
        editable: false,
    });
}


