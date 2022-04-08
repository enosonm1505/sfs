var app = angular.module('POSTApp', ['webix']);

app.controller("PosReportsController", function ($scope) {

    $("#LoadDIv").hide();
    debugger;
    fnCurrDate();
    var Dataset = fnMstCompany();
    var defdt = Dataset[0].DEF_DT_FORMAT;

    $scope.frmSalesDayBk = {
        id: "frmSalesDayBk",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        elements: [
            {
                rows: [
                    {
                        cols: [
                            {
                                view: "search",
                                id: "ddlOutlet",
                                label: "Outlet",
                                labelAlign: "right",
                                width: 350,
                                readonly: true,
                                labelWidth: 60,
                                minWidth: 300,
                                value: "ALL",
                                on: {
                                    onSearchIconClick: function () {
                                        $$("gridRpt").clearAll();
                                        $$("OutletSrch").show();
                                    }
                                }
                            },
                            {
                                width: 30,
                            },
                            {
                                view: "button", id: "btnFilters", css: "webix_primary", value: "Filters", width: 30, label: '<span class="fa fa-filter"></span>', container: "divbtnFilters", tooltip: true,
                                on: {
                                    onItemClick: function () {
                                        $$("gridRpt").clearAll();
                                        $$("AdvFilter").show();
                                    }
                                }
                            },
                            {
                                width: 100,
                            },
                            {
                                view: "datepicker",
                                id: "txtForgDt",
                                stringResult: true,
                                label: "For",
                                labelWidth: 40,
                                inputWidth: 160,
                                width: 160,
                                labelAlign: "right",
                                minWidth: 160,
                                format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrentDt").val(),
                                attributes: { maxlength: 8 },
                                on: { onChange: function (newVal, OldVal) { $$("gridRpt").clearAll(); } }
                            },
                            {
                                view: "datepicker",
                                id: "txtToDt",
                                stringResult: true,
                                label: "To",
                                labelWidth: 40,
                                inputWidth: 160,
                                width: 160,
                                labelAlign: "right",
                                minWidth: 160,
                                hidden: true,
                                format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrentDt").val(),
                                attributes: { maxlength: 8 },
                                on: { onChange: function (newVal, OldVal) { $$("gridRpt").clearAll(); } }
                            },
                            {
                                id: "btnDispay", view: "button", minWidth: 140, width: 80, labelAlign: "left", label: "Display", on: {
                                    onItemClick: function () {
                                        fnValidation();
                                        if ($$("gridRpt"))
                                            $$("gridRpt").destructor();
                                        fnSalesDayBkRptDisplay();
                                        debugger;
                                    }
                                }
                            },
                            {
                                id: "chktime",
                                view: "checkbox",
                                label: "Time",
                                labelAlign: "right",
                                labelwidth: 20,
                                inputwidth: 40,
                                minwidth: 50,
                                width: 105,
                                on: {
                                    "onChange": function () {
                                        if ($$("chktime").getValue() == "1") {
                                            $$("txtStrtTm").show();
                                            $$("txtEndTm").show();
                                        }
                                        else {
                                            $$("txtStrtTm").hide();
                                            $$("txtEndTm").hide();
                                        }
                                    }
                                }
                            },
                            {
                                view: "datepicker",
                                format: "%H:%i",
                                id: "txtStrtTm",
                                label: "From",
                                labelAlign: "right",
                                labelWidth: 40,
                                inputWidth: 120,
                                width: 120,
                                minWidth: 240,
                                hidden: true,
                                suggest: {
                                    type: "calendar",
                                    body: {
                                        type: "time",
                                        calendarTime: "%H:%i"
                                    }
                                }
                            },
                            {
                                view: "datepicker",
                                format: "%H:%i",
                                id: "txtEndTm",
                                label: "To",
                                labelAlign: "right",
                                labelWidth: 40,
                                inputWidth: 120,
                                hidden: true,
                                width: 140, minWidth: 240,
                                suggest: {
                                    type: "calendar",
                                    body: {
                                        type: "time",
                                        calendarTime: "%H:%i"
                                    }
                                }
                            },

                        ]
                    },
                ]
            }
        ]
    }
});

function fnLoadFilterWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 500,
        move: true,
        body: {
            view: "form",
            id: "frmFilter",
            elements: [
                {
                    view: "layout",
                    css: "LayBorder1",
                    cols: [
                        {
                            rows: [
                                 { view: "template", template: "Filters", css: " SecHeader", height: 25, width: 257 },
                                 {
                                     view: "layout",
                                     css: "LayBorder1",
                                     rows: [
                                         { view: "checkbox", id: "chkPrdTot", labelWidth: 5, labelRight: "Product Total", customCheckbox: false, css: "FiltFont", },
                                         {
                                             view: "checkbox", id: "chkPrtSetDet", labelWidth: 5, labelRight: "Print Settlement Details", customCheckbox: false, css: "FiltFont",
                                             on: {
                                                 "onChange": function () {
                                                     if ($$("chkPrtSetDet").getValue() == "1") {
                                                         $$("chkTips").show();
                                                     }
                                                     else {
                                                         $$("chkTips").hide();
                                                     }
                                                 },
                                             }
                                         },
                                         { view: "checkbox", id: "chkTips", labelWidth: 5, labelRight: "Tips", customCheckbox: false, hidden: true, css: "FiltFont", },
                                         { view: "checkbox", id: "chkPrtCnlBils", labelWidth: 5, labelRight: "Print Cancel/Void Bills", customCheckbox: false, css: "FiltFont", },
                                         { view: "checkbox", id: "chkNcKot", labelWidth: 5, labelRight: "NCKOT Consider", customCheckbox: false, css: "FiltFont", },
                                         {
                                             view: "checkbox", id: "chkTaxExm", labelWidth: 5, labelRight: "Tax Exempted", customCheckbox: false, css: "FiltFont",
                                             on: {
                                                 "onChange": function () {
                                                     if ($$("chkTaxExm").getValue() == "1") {
                                                         $$("chkPrtSetDet").hide();
                                                         $$("chkPrdTot").hide();
                                                         $$("chkPrtCnlBils").hide();
                                                         $$("chkNcKot").hide();
                                                         $$("chkPeriod").show();
                                                         $$("chkPrtSetDet").setValue("0");
                                                         $$("chkPrdTot").setValue("0");
                                                         $$("chkNcKot").setValue("0");
                                                         $$("chkPrtCnlBils").setValue("0");
                                                     }
                                                     else {
                                                         $$("chkPrtSetDet").show();
                                                         $$("chkPrdTot").show();
                                                         $$("chkPrtCnlBils").show();
                                                         $$("chkNcKot").show();
                                                         $$("chkPeriod").hide();
                                                         $$("chkPeriod").setValue("0");
                                                     }
                                                 },
                                             }
                                         },
                                         {
                                             view: "checkbox", id: "chkPeriod", labelWidth: 5, labelRight: "Period", customCheckbox: false, hidden: true, css: "FiltFont",
                                             on: {
                                                 "onChange": function () {
                                                     if ($$("chkPeriod").getValue() == "1") {
                                                         $$("txtToDt").show();
                                                     }
                                                     else {
                                                         $$("txtToDt").hide();
                                                     }
                                                 }
                                             },
                                         },
                                         { view: "checkbox", id: "chkSuprBlkFlds", labelWidth: 5, labelRight: "Supress Blank Fields", customCheckbox: false, css: "FiltFont", },
                                     ]
                                 }
                            ]
                        },
                        {

                            view: "layout",
                            css: "LayBorder1",
                            rows: [

                                { view: "template", template: "Options", css: "SecHeader", height: 25, width: 257 },
                                {

                                    view: "checkbox", id: "chkCovers", labelWidth: 5, labelRight: "Covers", customCheckbox: false,css:"FiltFont",
                                    on: {
                                        "onChange": function () {
                                            fnShowHideCol();
                                        }
                                    },
                                },
                                {
                                    view: "checkbox", id: "chkDisAmt", labelWidth: 5, labelRight: "Discount Amount", customCheckbox: false, css: "FiltFont",
                                    on: {
                                        "onChange": function () {
                                            fnShowHideCol();
                                        }
                                    },
                                },
                            ]
                        },
                    ]
                },
                {
                    view: "layout",
                    css: "LayBorder1",
                    padding: { top: 5, bottom: 5, right: 10 },
                    rows: [
                        {
                            cols: [{}, {
                                view: "button", type: "icon", id: "OkFilter", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, on: {
                                    onItemClick: function () {
                                        fnClickHideFilter();
                                    }
                                }
                            }],
                        }
                    ]
                },
                { view: "text", name: "hdnPrtSetDet", id: "hdnPrtSetDet", hidden: true, },
                { view: "text", name: "hdnTips", id: "hdnTips", hidden: true, },
                { view: "text", name: "hdnPrtCnlBils", id: "hdnPrtCnlBils", hidden: true },
                { view: "text", name: "hdnchNcKot", id: "hdnchNcKot", hidden: true },
                { view: "text", name: "hdnPrdTot", id: "hdnPrdTot", hidden: true },
                { view: "text", name: "hdnBlkFlds", id: "hdnSupBlkFlds", hidden: true },
                { view: "text", name: "hdnchkTaxExm", id: "hdnchkTaxExm", hidden: true },
                { view: "text", name: "hdnchkPeriod", id: "hdnchkPeriod", hidden: true },
            ]
        }
    });
};

function fnShowHideCol() {
    debugger;

    if ($$("chkCovers").getValue() == "1") $$("gridRpt").showColumn("Pax");
    else $$("gridRpt").hideColumn("Pax");

    if ($$("chkDisAmt").getValue() == "1") $$("gridRpt").showColumn("DiscAmt");
    else $$("gridRpt").hideColumn("DiscAmt");

    $$("gridRpt").refreshColumns();
    $$("gridRpt").refresh();
}

function OutletPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "OutletSrch",
        head: "Outlet Search",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 350,
        move: true,
        body: {
            view: "form",
            id: "frmOutletSel",
            padding: { top: 0, bottom: 0, left: 1, right: 1 },
            elements: [
                {
                    view: "datatable",
                    id: "grdOutNmSrch",
                    select: 'row',
                    data: [],
                    css: "webix_header_border",
                    columns: [
                        { id: "OutLet_Id", header: ["Outlet Id", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                        { id: "Outlet_NM", header: ["Outlet Name", { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, fillspace: true },
                        { id: "CHK", header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                    ],
                },
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [
                        {},
                        {
                            view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () {
                                debugger;
                                GrdOutletNameSelct();
                            },
                            align: "right"
                        },
                        {
                            paddingX: 40,
                            view: 'button',
                            label: 'Cancel',
                            type: "icon",
                            icon: "wxi-close-circle",
                            width: 100,
                            on: {
                                onItemClick: function () {
                                    $$('OutletSrch').hide();
                                }
                            }
                        }
                    ]
                }
            ],
        }
    });
    debugger;
    fnOutletload();
}

function fnOutletload() {
    debugger;
    var dataparam = {};
    var Outletid = "";

    dataparam["REQTYPE"] = "GET_OUTLETNAME";
    dataparam["PROGNAME"] = "GET_SALESDAYBOOK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                debugger;
                var rowData = JSON.parse(d);

                $$("grdOutNmSrch").clearAll();
                $$("grdOutNmSrch").parse(rowData);
                $$("grdOutNmSrch").refresh();

                if (rowData.length != 0) {
                    for (i = 0; i < rowData.length; i++) {
                        if ($.trim(Outletid) == "") {
                            Outletid = "'" + $.trim(rowData[i].OutLet_Id) + "'";
                        }
                        else {
                            Outletid += ",'" + $.trim(rowData[i].OutLet_Id) + "'";
                        }
                    }
                }
                $("#hdnOutId").val(Outletid);
            }
        }
    });
}

function GrdOutletNameSelct() {
    debugger;
    var Outletid = "";
    var Outletnm = "";
    var data = $$("grdOutNmSrch").serialize();

    if (data.length != 0) {
        for (i = 0; i < data.length; i++) {
            if (data[i].CHK == "1") {
                if ($.trim(Outletid) == "") {
                    Outletid = "'" + $.trim(data[i].OutLet_Id) + "'";
                    Outletnm = "" + $.trim(data[i].Outlet_NM) + "";
                }
                else {
                    Outletid += ",'" + $.trim(data[i].OutLet_Id) + "'";
                    Outletnm += "," + $.trim(data[i].Outlet_NM) + "";
                }
            }
        }
    }
    if (($.trim(Outletid) == "") || ($.trim(Outletnm) == "")) {
        debugger;
        fnOutletload();
        $$("ddlOutlet").setValue("ALL");
    }
    else {
        $("#hdnOutId").val(Outletid);
        $$("ddlOutlet").setValue(Outletnm);
    }

    $$("OutletSrch").hide();
};

function fnClickHideFilter() {
    debugger;

    $$("hdnPrtSetDet").setValue($$("chkPrtSetDet").getValue());
    $$("hdnTips").setValue($$("chkTips").getValue());
    $$("hdnPrtCnlBils").setValue($$("chkPrtCnlBils").getValue());
    $$("hdnchNcKot").setValue($$("chkNcKot").getValue());
    $$("hdnPrdTot").setValue($$("chkPrdTot").getValue());
    $$("hdnSupBlkFlds").setValue($$("chkSuprBlkFlds").getValue());
    $$("hdnchkTaxExm").setValue($$("chkTaxExm").getValue());
    $$("hdnchkPeriod").setValue($$("chkPeriod").getValue());

    $$("AdvFilter").hide();
};

function fnChkFilterClear() {
    debugger;

    $$("hdnPrtSetDet").setValue("");
    $$("hdnTips").setValue("");
    $$("hdnPrtCnlBils").setValue("");
    $$("hdnchNcKot").setValue("");
    $$("hdnPrdTot").setValue("");
    $$("hdnSupBlkFlds").setValue("");
    $$("hdnchkTaxExm").setValue("");
    $$("hdnchkPeriod").setValue("");
    $$("chkCovers").setValue("");
    $$("chkDisAmt").setValue("");

    $$("AdvFilter").hide("");
};


function fnValidation() {
    debugger;
    dateValidation();
    if ($$("txtStrtTm").getValue() != "" && $$("txtStrtTm").getValue() != null) {
        var StrtTm = new Date($$("txtStrtTm").getValue());
        var StrtTmHr = (StrtTm.getHours().toString().length == 1 ? "0" + StrtTm.getHours() : StrtTm.getHours()) + ":"
            + (StrtTm.getMinutes().toString().length == 1 ? "0" + StrtTm.getMinutes() : StrtTm.getMinutes());
    }
    else {
        var StrtTmHr = "00:00";
    }
    if ($$("txtStrtTm").getValue() != "" && $$("txtStrtTm").getValue() != null) {
        var StrtTm = new Date($$("txtStrtTm").getValue());
        var StrtTmHr = (StrtTm.getHours().toString().length == 1 ? "0" + StrtTm.getHours() : StrtTm.getHours()) + ":"
            + (StrtTm.getMinutes().toString().length == 1 ? "0" + StrtTm.getMinutes() : StrtTm.getMinutes());
    }
    else {
        var StrtTmHr = "00:00";
    }

    if ($$("txtEndTm").getValue() != "" && $$("txtEndTm").getValue() != null) {
        var EndTm = new Date($$("txtEndTm").getValue());
        var EndTmHr = (EndTm.getHours().toString().length == 1 ? "0" + EndTm.getHours() : EndTm.getHours()) + ":"
            + (EndTm.getMinutes().toString().length == 1 ? "0" + EndTm.getMinutes() : EndTm.getMinutes());
    }
    else {
        var EndTmHr = "00:00"
    }

    if (StrtTmHr.toString() > EndTmHr.toString()) {
        AlertMessage("Start time cannot be greater than End Time");
        return false;
    }
    else {
        return true;
    }
}

function dateValidation() {
    debugger;
    var txtFrmDate = $$("txtForgDt").getText();
    var txtToDt = $$("txtToDt").getText();
    var efdate = new Date(txtFrmDate.split('/')[2], txtFrmDate.split('/')[1] - 1, txtFrmDate.split('/')[0]);
    var etdate = new Date(txtToDt.split('/')[2], txtToDt.split('/')[1] - 1, txtToDt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage("From Date can not be greater than To date");
        return false;
    }
}
function GridDesign() {
    // debugger;
    webix.ui({
        id: "gridRpt",
        container: "divRpt",
        view: "treetable",
        select: 'row',
        view: "treetable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        spans: true,
        scroll: "xy",
        adjust: true,
        footer: true,
        css: "webix_header_border GrdSettle",
        data: [],
        columns: [
             { id: "Session", header: [{ text: 'Session', height: 34 }], width: 150, css: { 'text-align': 'left ! important', }, },
             { id: "BillNo", header: ['Bill No.', ], width: 120, css: { 'text-align': 'center ! important', }, },
             { id: "Pax", header: [{ text: 'Pax', height: 34 }], width: 150, css: { 'text-align': 'left ! important', }, },
             { id: "BillAmt", header: ['BillAmt', ], width: 120, css: { 'text-align': 'center ! important', }, },
        ],
        on: {
        },
    });
}

function fnColDtbindtoGrid() {
    debugger;
    var dataparam = {}; var rowData = [];
    dataparam["REQTYPE"] = "GET_POSBINDCOLHEADER";
    dataparam["PROGNAME"] = "GET_POSSETTLEMENT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                DatabindtoGrid(rowData);

                $$("gridRpt").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}
function fnSalesDayBkRptDisplay() {
    debugger;
    var dataparam = {}; var rowData = [];

    dataparam["REQTYPE"] = "GET_BINDSALESDAYBOOK";
    dataparam["PROGNAME"] = "GET_SALESDAYBOOK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OutletId"] = $("#hdnOutId").val();
    dataparam["FrmDT"] = $.trim($$("txtForgDt").getText());
    dataparam["ToDt"] == ($$("chkPeriod").getValue() == "1" ? $.trim($$("txtToDt").getText()) : "");
    dataparam["FrmTm"] = ($$("chktime").getValue() == "1" ? $.trim($$("txtStrtTm").getText()) : "");
    dataparam["ToTm"] = ($$("chktime").getValue() == "1" ? $.trim($$("txtEndTm").getText()) : "");
    dataparam["VoidBil"] = $.trim($$("hdnPrtCnlBils").getValue());
    dataparam["TaxExmpt"] = $.trim($$("hdnchkTaxExm").getValue());
    dataparam["SetDt"] = $.trim($$("hdnPrtSetDet").getValue());
    dataparam["Tips"] = $.trim($$("hdnTips").getValue());
    dataparam["NCbill"] = $.trim($$("hdnchNcKot").getValue());
    dataparam["PrdTot"] = $.trim($$("hdnPrdTot").getValue());
    dataparam["SuprFields"] = $.trim($$("hdnSupBlkFlds").getValue());
    dataparam["Period"] = $.trim($$("hdnchkPeriod").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                DatabindtoGrid(rowData);
                if ($.trim($$("hdnSupBlkFlds").getValue()) == "1") {
                    var cn = 0;
                    for (i = 2 ; rowData.GridCol.length > i ; i++) {
                        var removcol = "";
                        removcol = rowData.GridCol[i];
                        for (j = 0 ; rowData.GridOpp.length > j ; j++) {
                            if (rowData.GridOpp[j][removcol] == "0.00") {
                                cn = 0;
                            }
                            else {
                                cn = 1; break;
                            }
                        }
                        if (cn == "0") {
                            $$("gridRpt").hideColumn(removcol);
                        }
                    }
                }

                $$("gridRpt").group({
                    by: function (obj) {
                        //debugger;
                        return "Outlet : " + obj["OUTLETNM"];
                    },
                    row: function (obj) {
                        return obj.SESSION;
                    },
                    missing: "Other",
                    map: {
                        SESSION: [function (obj) {
                            return "Outlet : " + obj["OUTLETNM"];
                        }],
                    },
                    footer: vFooterGrp,
                });

                $$("gridRpt").openAll();
                $$("gridRpt").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}

function DatabindtoGrid(rowData) {
    if ($$("gridRpt"))
        $$("gridRpt").destructor();
    GridDesign();
    vFooterGrp = {};
    debugger;
    var TaxColmn = rowData.GridTaxCol;
    var ColVal = [];
    $.each(rowData.GridCol, function (key, value) {
        var set = {};

        if (value == "SESSION") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 70, css: { 'text-align': 'center !important' },
            };
        }
        else if (value == "CLR") {
            set = {
                id: $.trim(value), hidden: true,
            };
        }
        else if (value == "BILLNO") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, css: { 'text-align': 'center !important' }, footer: { text: "Grand Total", css: "LeftAlign", height: 24 },
            };
        }
        else if (value == "SetlDetails") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, css: { 'text-align': 'center !important' },
            };
        }
        else if (value == "OUTLETNM") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, hidden: true, css: { 'text-align': 'center !important' },
            };
        }
        else {
            debugger;
            var Filter1 = TaxColmn.filter(function (TaxColmn) {
                return $.trim(TaxColmn.REVENUE_ID) == $.trim(value);
            });
            var taxNm = "";
            if (Filter1.length > 0)
                taxNm = Filter1[0]["REVENUE_SHR_NM"];
            else
                taxNm = value;
            set = {
                id: value, header: [{ text: taxNm, height: 30 }], width: 100, css: { 'text-align': 'right ! important' },
                format: function (value) {
                    return fnCurrFormat(value);
                },
                exportType: "number",
                exportFormat: "#,##0.00",
                footer: { content: "totalColumn" },
            };

        }
        ColVal.push(set);
        vFooterGrp[value] = [value, "sum"];
    });
    vFooterGrp["BILLNO"] = ["Total", "string"];
    vFooterGrp["SESSION"] = ["", "string"];
    vFooterGrp["SetlDetails"] = ["", "string"];
    vFooterGrp["CLR"] = ["GrpTot1", "string"];
    vFooterGrp["$css"] = ["GrpTot1", "string"];

    $$("gridRpt").clearAll();
    $$("gridRpt").config.columns = ColVal;
    $$("gridRpt").refreshColumns();
    $$("gridRpt").parse(rowData.GridOpp);
    $$("gridRpt").show();

    gridResize();

}

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj["CLR"] != "GrpTot1") {
                if (!isNaN(obj[value.columnId]) && obj[value.columnId] != null && obj[value.columnId] != "") result = parseFloat(result) + parseFloat(obj[value.columnId]);
            }
        });
        node.firstChild.innerHTML = fnCurrFormat(result);
    }
}, webix.ui.datafilter.summColumn);

function fnCurrFormat(value) {

    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    var CurrDecimal = window.CURRENCY_DECIMLIMIT;
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};

function sidebarFn() {
    gridResize();
}


function fnExcelExport() {

    var vGrid = "";
    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("gridRpt");

    var values = fnCurrDtTime();
    var vDate = values[0];
    var vTm = values[1];
    var FromDt = $$("txtForgDt").getText();
    var ToDt = $$("txtToDt").getText();

    var vHeader = $("#LayoutText").text();
    var FullData = "";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {
        var vExpoartGrid = webix.copy(vGrid, -1);
        if ($$("chkPeriod").getValue() == "0") fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, "", "", FromDt);
        else fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, FromDt, ToDt, "");
    }
    else {
        alert("Records not present in Report");
    }

};
function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").text();
    var FullData = "";
    var vGrid = "";

    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("gridRpt");
    var FromDt = $$("txtForgDt").getText();
    var ToDt = $$("txtToDt").getText();

    if ($$("chkPeriod").getValue() == "0")
        var DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> For: " + FromDt + " </div></div>";
    else
        var DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> From: " + FromDt + "   To: " + ToDt + "</div></div>";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {

        webix.print(vGrid, {
            docHeader: DocHeader,
            fit: "page",
            scroll: false,
            mode: "landscape"
        });
    }
    else {
        alert("Records not present in Report");
    }

};

function fnLoadPropertyChange() {
    $$("gridRpt").clearAll();
    fnOutletload();
}


