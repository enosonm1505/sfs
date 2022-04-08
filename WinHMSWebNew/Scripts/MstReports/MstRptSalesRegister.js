var app = angular.module('POSTApp', ['webix']);

app.controller("MstReportsController", function ($scope) {
    
    $("#LoadDIv").hide();
    var Dataset = fnMstCompany();
    var defdt = Dataset[0].DEF_DT_FORMAT;
    fnGetCurrdt();
    var ddlModule = fnModuleload();
    var Data = fnFirmPanNoload();
    var FirmNm = Data[0].COMPANY_NM;
    var PanNo = Data[0].VAT_REG_NO;

    GridDesign();
    FilterPopup();
    $scope.frmSalesRegister = {
        id: "frmSalesRegister",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        elements: [
            {
                cols: [
                    {
                        rows: [
                            {
                                view: "text",
                                id: "txtNmOfFirm",
                                label: "Name of Firm :",
                                labelAlign: "left",
                                labelWidth: 135,
                                inputWidth: 400,
                                readonly: true,
                                value: FirmNm,
                                width: 400,
                                attributes: { maxlength: 100 }
                            },
                            {
                                view: "text",
                                id: "txtPan",
                                label: "PAN :",
                                labelAlign: "left",
                                labelWidth: 135,
                                readonly: true,
                                inputWidth: 400,
                                value: PanNo,
                                width: 400,
                                attributes: { maxlength: 100 }
                            },
                        ]
                    },
                    {
                        rows: [
                           {
                               view: "datepicker",
                               id: "txtFrmDt",
                               stringResult: true,
                               label: "From",
                               labelWidth: 40,
                               inputWidth: 160,
                               width: 160,
                               labelAlign: "right",
                               minWidth: 160,
                               format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                               value: $("#hdnCurrdt").val(),
                               attributes: { maxlength: 8 },
                               on: { onChange: function (newVal, OldVal) { $$("gridSalesReg").clearAll(); } }
                           },
                        ]
                    },
                     {
                         rows: [
                            {
                                view: "datepicker",
                                id: "txtToDate",
                                stringResult: true,
                                label: "To",
                                labelWidth: 40,
                                inputWidth: 160,
                                width: 160,
                                labelAlign: "right",
                                minWidth: 160,
                                format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrdt").val(),
                                attributes: { maxlength: 8 },
                                on: { onChange: function (newVal, OldVal) { $$("gridSalesReg").clearAll(); } }
                            },
                         ]
                     },
                      {
                          rows: [
                           {
                               id: "btnDispay", view: "button", minWidth: 140, width: 80, labelAlign: "left", label: "Display", on: {
                                   onItemClick: function () {
                                       $$("gridSalesReg").clearAll();
                                       fndateValidation();
                                       fnLoadSalesRegisterRpt();
                                   }
                               }
                           },
                          ]
                      },
                      {
                          rows: [
                           {
                               view: "button", id: "btnFilters", css: "webix_primary", value: "Filters", width: 30, label: '<span class="fa fa-filter"></span>', container: "divbtnFilters", tooltip: true,
                               on: {
                                   onItemClick: function () {
                                       FilterPopup();
                                       $$("AdvFilter").show();
                                   }
                               }
                           },
                          ]
                      },
                      {
                          rows: [
                           {
                               view: "richselect",
                               id: "ddlModule",
                               label: "Module",
                               labelAlign: "right",
                               labelWidth: 60,
                               inputWidth: 200,
                               width: 200,
                               value: "ALL",
                               options: ddlModule,
                               on: {
                                   onChange: function (newval, oldval) {
                                       $$("gridSalesReg").clearAll();
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

function GridDesign() {

    webix.ui({
        id: "gridSalesReg",
        container: "divRpt",
        view: "treetable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        resizeColumn: true,
        resizeRow: true,
        footer: true,
        spans: true,
        minWidth: 900,
        position: "flex",
        css: "webix_header_border",
        data: [],
        columns: [
                { id: "Date", header: { text: "Bill Date", }, width: 70, css: { 'text-align': 'center  ! important' } },
                { id: "DateNep", header: { text: "Bill Date Nepal", css: "multiline" }, width: 100, css: { 'text-align': 'center ! important' } },
                { id: "HidBilNo", header: { text: "Bill NO", css: "multiline" }, width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                { id: "BillNo", header: { text: "Inv No", }, width: 70, css: { 'text-align': 'left! important' } },
                { id: "PurNm", header: { text: "Purchase Name", }, width: 170, css: { 'text-align': 'left ! important' } },
                {
                    id: "PurPAN", header: { text: "Purchase PAN", }, width: 120, css: { 'text-align': 'left ! important' },
                    footer: { text: "Grand Total", css: "LeftAlign" },
                },
                {
                    id: "TotSal", header: { text: "Total Sales", }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (Amt) {
                        return fnCurrFormat(Amt);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "TaxExem", header: { text: "Total Exempted Sales", css: "multiline" }, width: 110, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (Disc) {
                        return fnCurrFormat(Disc);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "SCharge", header: { text: "Zero Rated Sales(Export)", css: "multiline" }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (SCharge) {
                        return fnCurrFormat(SCharge);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Disc", header: { text: "Discount", }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (TA) {
                        return fnCurrFormat(TA);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Service", header: { text: "Service Charge", css: "multiline" }, width: 70, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (Tax) {
                        return fnCurrFormat(Tax);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Value", header: { text: "Taxable Sales Value", css: "multiline" }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (TotAmt) {
                        return fnCurrFormat(TotAmt);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Tax", header: { text: "Tax", }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (TotAmt) {
                        return fnCurrFormat(TotAmt);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                { id: "CLR", hidden: true },
        ],
        on: {
        },
    });
    gridResize();
};

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            //if (obj["CLR"] != "GrpTot1") {
            if (!isNaN(obj[value.columnId]) && obj[value.columnId] != null && obj[value.columnId] != "") result = parseFloat(result) + parseFloat(obj[value.columnId]);
            //}
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

function FilterPopup() {
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
                            rows: [
                                {
                                    view: "template",
                                    template: "Order By",
                                    height: 50,
                                    width: 60,
                                },
                                {
                                    cols: [
                                        {
                                            view: "radio",
                                            id: "rdBillDtNo",
                                            value: 2, options: [
                                                { "id": 1, "value": "Bill Date,Bill No" },
                                                { "id": 2, "value": "Module,Bill Date,Bill No" },
                                                { "id": 3, "value": "Bill No ,Bill Date" }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    view: "template",
                                    template: "Filter",
                                    height: 50,
                                    width: 40,
                                },
                                {
                                    rows: [
                                        {
                                            view: "checkbox",
                                            id: "chkFilInAct",
                                            labelRight: "Consider NC Sales",
                                            inputWidth: 170,
                                            labelWidth: 10,
                                            width: 170, minWidth: 170,
                                        },
                                    ]
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
                                        $$("AdvFilter").hide();
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


function fnFirmPanNoload() {
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_FIRMPANNO";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        async: false,
        url: "/MstReports/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnLoadSalesRegisterRpt() {

    var FromDt = $.trim($$("txtFrmDt").getText());
    var ToDt = $.trim($$("txtToDate").getText());
    var dataparam = {}; var rowData = [];

    dataparam["REQTYPE"] = "GET_LOADSALESREGISTER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FrmDT"] = FromDt;
    dataparam["ToDt"] = ToDt;
    dataparam["CmbMod"] = $.trim($$("ddlModule").getValue())
    dataparam["ChkNCSales"] = $.trim($$("chkFilInAct").getValue());
    dataparam["OptBill"] = $.trim($$("rdBillDtNo").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MstReports/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                $$("gridSalesReg").clearAll();
                $$("gridSalesReg").parse(rowData);
                $$("gridSalesReg").refresh();

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
function fnModuleload() {
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MODULEID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        async: false,
        url: "/MstReports/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });

    return rowData;
}

function fnExcelExport() {
    var vGrid = "";
    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("gridSalesReg");

    var values = fnCurrDtTime();
    var vDate = values[0];
    var vTm = values[1];
    var FromDt = $$("txtFrmDt").getText();
    var ToDate = $$("txtToDate").getText();

    var vHeader = $("#LayoutText").text();
    var FullData = "";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {
        var vExpoartGrid = webix.copy(vGrid, -1);
        fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, FromDt, ToDate, "");
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
    vGrid = $$("gridSalesReg");
    var FromDt = $$("txtFrmDt").getText();
    var ToDate = $$("txtToDate").getText();

    var DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> From: " + FromDt + "  TO : " + ToDate + "</div></div>";

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

function fndateValidation() {
    debugger;
    var txtFrmDate = $$("txtFrmDt").getText();
    var txtToDt = $$("txtToDate").getText();
    var efdate = new Date(txtFrmDate.split('/')[2], txtFrmDate.split('/')[1] - 1, txtFrmDate.split('/')[0]);
    var etdate = new Date(txtToDt.split('/')[2], txtToDt.split('/')[1] - 1, txtToDt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage("From Date can not be greater than To date");
        return false;
    }
}
