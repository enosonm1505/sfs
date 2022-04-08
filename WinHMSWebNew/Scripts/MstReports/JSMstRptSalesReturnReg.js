var app = angular.module('POSTApp', ['webix']);

app.controller("MstReportsController", function ($scope) {

    $("#LoadDIv").hide();
    var Dataset = fnMstCompany();
    var defdt = Dataset[0].DEF_DT_FORMAT;
    fnGetCurrdt();
    var Data = fnFirmPanNoload();
    var FirmNm = Data[0].COMPANY_NM;
    var PanNo = Data[0].VAT_REG_NO;
    GridDesign();

    $scope.frmSalesReturnReg = {
        id: "frmSalesReturnReg",
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
                                labelAlign: "right",
                                labelWidth: 85,
                                inputWidth: 300,
                                readonly: true,
                                value: FirmNm,
                                width: 300,
                                attributes: { maxlength: 30 }
                            },
                            {
                                view: "text",
                                id: "txtPan",
                                label: "PAN :",
                                labelAlign: "right",
                                labelWidth: 85,
                                readonly: true,
                                inputWidth: 300,
                                value: PanNo,
                                width: 400,
                                attributes: { maxlength: 30 }
                            },
                        ]
                    },
                    {
                        padding: { top: 0, bottom: 0, left: 100 },
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
                                       fnLoadsalesReturnRegRpt();
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
                { id: "Bill_Dt", header: { text: "Date", }, width: 70, css: { 'text-align': 'center  ! important' } },
                { id: "Bill_no", header: { text: "Inv No", }, width: 70, css: { 'text-align': 'left! important' } },
                { id: "CUSTOMER_NM", header: { text: "Purchase Name", }, width: 170, css: { 'text-align': 'left ! important' } },
                {
                    id: "PAN_NO", header: { text: "Purchase PAN", }, width: 120, css: { 'text-align': 'left ! important' },
                    footer: { text: "Grand Total", css: "LeftAlign" },
                },
                {
                    id: "NET_AMT", header: { text: "Total Sales", }, width: 100, css: { 'text-align': 'right ! important' },
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
                    id: "DISCOUNT", header: { text: "Discount", }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (TA) {
                        return fnCurrFormat(TA);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "GROSS_AMT", header: { text: "Taxable Sales Value", css: "multiline" }, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (TotAmt) {
                        return fnCurrFormat(TotAmt);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Taxes", header: { text: "Taxes", }, width: 100, css: { 'text-align': 'right ! important' },
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
           // }
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

function fnLoadsalesReturnRegRpt() {

    var FromDt = $.trim($$("txtFrmDt").getText());
    var ToDt = $.trim($$("txtToDate").getText());
    var dataparam = {}; var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADSALESRETURNREG";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FrmDT"] = FromDt;
    dataparam["ToDt"] = ToDt;

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
    gridResize();
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

function sidebarFn() {
    gridResize();
}

