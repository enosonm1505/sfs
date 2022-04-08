var app = angular.module('POSTApp', ['webix']);

app.controller("POSReportsController", function ($scope) {

    $("#LoadDIv").hide();
    debugger;
    var ddl1 = [];
    fnCurrDate();
    FilterPopup();
   
    var dataset = fnMstCompany();
    var defdate = dataset[0].DEF_DT_FORMAT;
    var ddlSessId = fnSessionload();
    var ddlUserId = fnUserload();
    
    $scope.frmPOSRptSettlement = {
        id: "frmPOSRptSettlement",
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
                                width: 450,
                                readonly: true,
                                labelWidth: 110,
                                value: "ALL",
                                on: {
                                    onSearchIconClick: function () {
                                        $$("grdPosSetRpt").clearAll();
                                        $$("OutletSrch").show();
                                    }
                                }
                            },
                            {
                                view: "datepicker",
                                id: "txtForgDt",
                                stringResult: true,
                                label: "For",
                                format: "%d/%m/%Y",
                                format: defdate == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrentDt").val(),
                                labelAlign: "right",
                                inputWidth: 170,
                                labelWidth: 50,
                                minWidth: 160,
                                width: 180,
                                attributes: { maxlength: 8 },
                            },
                            {
                                id: "btnDispay",
                                view: "button",
                                minWidth: 100,
                                width: 80,
                                label: "Display",
                                on: {
                                    onItemClick: function () {
                                        if ($$("grdPosSetRpt"))
                                            $$("grdPosSetRpt").destructor();
                                        fnSettRptDisplay();
                                    }
                                }
                            },
                            {
                                view: "button",
                                id: "btnFilters",
                                css: "webix_primary",
                                value: "Filters",
                                width: 30,
                                label: '<span class="fa fa-filter"></span>',
                                tooltip: true,
                                on: {
                                    onItemClick: function () {
                                        $$("grdPosSetRpt").clearAll();
                                        $$("AdvFilter").show();
                                    }
                                }
                            },
                            {
                                view: "richselect",
                                id: "ddlSession",
                                label: "Session",
                                labelAlign: "right",
                                labelWidth: 60,
                                inputWidth: 200,
                                width: 200,
                                value: "ALL",
                                options: fnSessionload(),
                                on: {
                                    onChange: function (newval, oldval) {
                                        $$("grdPosSetRpt").clearAll();
                                    }
                                }
                            },
                            {
                                view: "richselect",
                                id: "ddlUser",
                                label: "User",
                                labelAlign: "right",
                                width: 200,
                                labelWidth: 60,
                                inputWidth: 200,
                                attributes: { maxlength: 30 },
                                value: "ALL",
                                options: ddlUserId,
                                on:
                                {
                                    onChange: function (newVal, OldVal) {
                                        $$("grdPosSetRpt").clearAll();
                                    }
                                },
                            }
                        ]
                    },
                ]
            }
        ]
    }
});

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
                        { id: "OUTLET_ID", header: ["Outlet Id", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                        { id: "OUTLET_NM", header: ["Outlet Name", { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, fillspace: true },
                        { id: "CHK", header: ["Select", { content: "masterCheckbox", contentId: "checkAll", css: { 'padding': '0px ! important', } }], editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
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
    fnOutletload();
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
                    Outletid = "'" + $.trim(data[i].OUTLET_ID) + "'";
                    Outletnm = "" + $.trim(data[i].OUTLET_NM) + "";
                }
                else {
                    Outletid += ",'" + $.trim(data[i].OUTLET_ID) + "'";
                    Outletnm += "," + $.trim(data[i].OUTLET_NM) + "";
                }
            }
        }
    }
    if (($.trim(Outletid) == "") || ($.trim(Outletnm) == "")) {
        fnOutletload();
        $$("ddlOutlet").setValue("ALL");
    }
    else {
        $("#hdnOutId").val(Outletid);
        $$("ddlOutlet").setValue(Outletnm);
    }

    $$("OutletSrch").hide();
};

function FilterPopup() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        height: 600,
        width: 600,
        move: true,
        body: {
            view: "form",
            id: "frmAdvFilter",
            padding: { right: 3, left: 3, bottom: 0 },
            elements: [
                {
                    width: 600,
                    rows: [
                        {
                            view: "layout",
                            width: 600,
                            cols: [
                                {
                                    view: "template",
                                    template: "Filter",
                                    css: "SecHeader",
                                    height: 25,
                                    width: 40,
                                },
                                {
                                    rows: [
                                        {
                                            view: "checkbox",
                                            id: "chkCancelbill",
                                            labelRight: "Cancel Bill",
                                            inputWidth: 170,
                                            labelWidth: 10,
                                            css: "FiltFont",
                                            width: 170, minWidth: 170,
                                        },
                                        {
                                            view: "checkbox",
                                            id: "chkSkipvoid",
                                            labelRight: "Skip Void",
                                            inputWidth: 170,
                                            css: "FiltFont",
                                            labelWidth: 10,
                                        },
                                        {
                                            view: "checkbox",
                                            id: "chkSuppress",
                                            labelRight: "Suppress Zero SettleType",
                                            css: "FiltFont",
                                            inputWidth: 170,
                                            labelWidth: 10,
                                        }
                                    ]
                                },
                                {
                                    view: "template",
                                    template: "Options",
                                    css: "SecHeader",
                                    height: 25,
                                    width: 60,
                                },
                                {
                                    rows: [
                                        {
                                            view: "checkbox",
                                            id: "chkSetAdv",
                                            labelRight: "Setle Amount",
                                            css: "FiltFont",
                                            inputWidth: 120,
                                            labelWidth: 10,
                                            width: 120, minWidth: 120,
                                        },
                                        {
                                            view: "checkbox",
                                            id: "chkNarr",
                                            labelRight: "Narration",
                                            css: "FiltFont",
                                            inputWidth: 120,
                                            labelWidth: 10,
                                            width: 120, minWidth: 120,
                                            value: 1,
                                        },
                                    ]
                                },
                                {
                                    view: "template",
                                    template: "GroupOn",
                                    css:"SecHeader",
                                    height: 25,
                                    width: 70,
                                },
                                {
                                    rows: [
                                        {
                                            view: "checkbox",
                                            id: "chkUser",
                                            labelRight: "User",
                                            css: "FiltFont",
                                            inputWidth: 100,
                                            labelWidth: 10,
                                            width: 100, minWidth: 100,
                                            //customCheckbox: false,
                                            value: 1,
                                            on: {
                                                onChange: function (newVal, OldVal) {
                                                    if (newVal == "1") {
                                                        $$("chkSession").setValue("0");
                                                    }
                                                }

                                            }

                                        },
                                        {
                                            view: "checkbox",
                                            id: "chkSession",
                                            labelRight: "Session",
                                            css: "FiltFont",
                                           // customCheckbox: false,
                                            inputWidth: 100,
                                            labelWidth: 10,
                                            width: 100, minWidth: 100,
                                            on: {
                                                onChange: function (newVal, OldVal) {
                                                    if (newVal == "1") {
                                                        $$("chkUser").setValue("0");
                                                    }
                                                }

                                            }

                                        },
                                    ]
                                },
                            ]
                        },
                         {
                             view: "template",
                             template: "Sort On",
                             css: "fontBold",
                             height: 25,
                             width: 370
                         },
                         {
                             padding: { top: 0, left: 10, bottom: 0, right: 10 },
                             rows: [
                                 {
                                     view: "checkbox",
                                     id: "chkBillno",
                                     css: "FiltFont",
                                     label: "Bill No Wise",
                                     labelWidth: 155,
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
                                        btnOkFilterClick();
                                    }
                                }
                            }],
                        }
                    ]
                }

            ]
        }
    });
}

function GridDesign() {
    webix.ui({
        id: "grdPosSetRpt",
        container: "divPosSetRpt",
        view: "treetable",
        select: 'row',
        view: "treetable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        spans: true,
        //height: 500,
        scroll: "xy",
        adjust: true,
        footer: true,
        css: "webix_header_border GrdSettle",
        data: [],
      //  leftSplit: 4,
        //rightSplit: 3,
        columns: [],
        on: {
        },
    });
}

function fnSessionload() {
    //debugger;
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_POSSESSION";
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
                if (!undefined) {
                    $$("ddlSession").define("options", rowData);
                    $$("ddlSession").define("value", "ALL");
                    $$("ddlSession").refresh();
                }
            }
        }
    });

    return rowData;
}

function fnOutletload() {

    var dataparam = {};
    var Outletid = "";
    dataparam["REQTYPE"] = "GET_POSSETTLEMENTOUTLET";
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
               // debugger;
                var rowData = JSON.parse(d);

                $$("grdOutNmSrch").clearAll();
                $$("grdOutNmSrch").parse(rowData);
                $$("grdOutNmSrch").refresh();

                if (rowData.length != 0) {
                    for (i = 0; i < rowData.length; i++) {
                        if ($.trim(Outletid) == "") {
                            Outletid = "'" + $.trim(rowData[i].OUTLET_ID) + "'";
                        }
                        else {
                            Outletid += ",'" + $.trim(rowData[i].OUTLET_ID) + "'";
                        }
                    }
                }
                $("#hdnOutId").val(Outletid);
                //$$("ddlOutlet").setValue("ALL");
            }
        }
    });
}

function fnUserload() {
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_POSSETTLEMENTUSER";
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

                if (!undefined) {
                    $$("ddlUser").define("options", rowData);
                    $$("ddlUser").define("value", "ALL");
                    $$("ddlUser").refresh();
                }
            }
        }
    });

    return rowData;
}

function btnOkFilterClick() {
    $$("AdvFilter").hide();
}
function fnSettRptDisplay() {
    
    var dataparam = {}; var rowData = [];

    dataparam["REQTYPE"] = "GET_POSBINDSETTLEMENT";
    dataparam["PROGNAME"] = "GET_POSSETTLEMENT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Outlet_Id"] = $("#hdnOutId").val();
    dataparam["SessionId"] = $.trim($$("ddlSession").getValue());
    dataparam["Fordt"] = $.trim($$("txtForgDt").getText());
    dataparam["User_Nm"] = $.trim($$("ddlUser").getValue());
    dataparam["SkipVoid"] = $.trim($$("chkSkipvoid").getValue());
    dataparam["CancBill"] = $.trim($$("chkCancelbill").getValue());
    dataparam["GrpUser"] = $.trim($$("chkUser").getValue());
    dataparam["GrpSession"] = $.trim($$("chkSession").getValue());
    dataparam["SortOnBill"] = $.trim($$("chkBillno").getValue());
    dataparam["OptionSetAdv"] = $.trim($$("chkSetAdv").getValue());
    dataparam["OptionNarr"] = $.trim($$("chkNarr").getValue());
    dataparam["FilterSuppress"] = $.trim($$("chkSuppress").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                DatabindtoGrid(rowData);
                debugger;
                if ($.trim($$("chkSuppress").getValue()) == "1") {
                    var cn = 0;
                    for (i = 2 ; rowData.GridCol.length > i ; i++) {
                        var remcol = "";
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
                            $$("grdPosSetRpt").hideColumn(removcol);
                        }
                    }
                }
                
                debugger;
                $$("grdPosSetRpt").group({
                    by: function (obj) {
                        //debugger;
                        return "Outlet : " + obj["OUTLET"];
                    },
                    row: function (obj) {
                        return obj.USER;
                    },
                    missing: "Other",
                    map: {
                        USER: [function (obj) {
                            return "Outlet : " + obj["OUTLET"];
                        }],
                    },
                    footer: vFooterGrp,
                });

                $$("grdPosSetRpt").openAll();
                $$("grdPosSetRpt").refresh();
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

function fnColDtbindtoGrid() {
   
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
                   

                $$("grdPosSetRpt").refresh();
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
    if ($$("grdPosSetRpt"))
        $$("grdPosSetRpt").destructor();
    GridDesign();
    vFooterGrp = {};
    //debugger;
    var ColVal = [];
    $.each(rowData.GridCol, function (key, value) {
        var set = {};

        if (value == "USER" || value == "TIME") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, css: { 'text-align': 'center !important' },
            };
        }
        else if (value == "CLR") {
            set = {
                id: $.trim(value), hidden: true,
            };
        }
        else if (value == "BILLNO") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 150, css: { 'text-align': 'left !important' }, footer: { text: "Grand Total", css: "LeftAlign", height: 24 },
            };
        }
        else if (value == "OUTLET") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, hidden: true, css: { 'text-align': 'center !important' },
            };
        }
        else if (value == "SESSION") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, css: { 'text-align': 'center !important' },
            };
        }
        else if (value == "NARRATION") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 150, css: { 'text-align': 'center !important' },
            };
        }
        else {
            //debugger;
            set = {
                id: value, header: [{ text: value, height: 30 }], width: 100, css: { 'text-align': 'right ! important' },
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
    vFooterGrp["BILLNO"] = ["Outlet Total", "string"];
    vFooterGrp["USER"] = ["", "string"];
    vFooterGrp["SESSION"] = ["", "string"];
    vFooterGrp["TIME"] = ["", "string"];
    vFooterGrp["NARRATION"] = ["", "string"];
    vFooterGrp["CLR"] = ["GrpTot1", "string"];
    vFooterGrp["$css"] = ["GrpTot1", "string"];

    $$("grdPosSetRpt").clearAll();
    $$("grdPosSetRpt").config.columns = ColVal;
    $$("grdPosSetRpt").refreshColumns();
    $$("grdPosSetRpt").parse(rowData.GridOpp);
    $$("grdPosSetRpt").show();

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
    //$$("grdPosSetRpt").resize();
    //$$("grdPosSetRpt").adjust();
    gridResize();
}

function fnExcelExport() {

    var vGrid = "";
    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("grdPosSetRpt");

    var values = fnCurrDtTime();
    var vDate = values[0];
    var vTm = values[1];
    var FromDt = $$("txtForgDt").getText();

    var vHeader = $("#LayoutText").text();
    var FullData = "";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {
        var vExpoartGrid = webix.copy(vGrid, -1);
        fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, "", "", FromDt);
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
    vGrid = $$("grdPosSetRpt");
    var FromDt = $$("txtForgDt").getText();

    var DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> For: " + FromDt + " </div></div>";
   
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
    debugger;
    $$("grdPosSetRpt").clearAll();
    fnOutletload();
    fnSessionload();
    fnUserload();
}
  


