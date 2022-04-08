var app = angular.module('POSTApp', ['webix']);

app.controller("MstReportsController", function ($scope) {

    $("#LoadDIv").hide();
    var Dataset = fnMstCompany();
    var defdt = Dataset[0].DEF_DT_FORMAT;
    fnGetCurrdt();
    GridDesign();

    $scope.frmAuditTrail = {
        id: "frmAuditTrail",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        elements: [
            {
                cols: [
                    {
                        padding: { top: 0, bottom: 0, left: 450 },
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
                               on: { onChange: function (newVal, OldVal) { $$("gridAudtTrail").clearAll(); } }
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
                                on: { onChange: function (newVal, OldVal) { $$("gridAudtTrail").clearAll(); } }
                            },
                         ]
                     },
                      {
                          rows: [
                           {
                               id: "btnDispay", view: "button", minWidth: 140, width: 80, labelAlign: "left", label: "Display", on: {
                                   onItemClick: function () {
                                       $$("gridAudtTrail").clearAll();
                                       fndateValidation();
                                       fnLoadAuditTrail();
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
        id: "gridAudtTrail",
        container: "divRpt",
        view: "treetable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        resizeColumn: true,
        resizeRow: true,
        spans: true,
        minWidth: 900,
        position: "flex",
        css: "webix_header_border",
        data: [],
        columns: [
                { id: "User", header: { text: "User", }, width: 120, css: { 'text-align': 'center  ! important' }, hidden: true, },
                { id: "DtTm", header: { text: "Date & Time", }, width: 130, css: { 'text-align': 'center  ! important' } },
                { id: "Module", header: { text: "Module", }, width: 70, css: { 'text-align': 'left! important' } },
                { id: "Action", header: { text: "Action", }, width: 70, css: { 'text-align': 'left ! important' } },
                { id: "Detail", header: { text: "Details", }, width: 100, css: { 'text-align': 'left ! important' }, },
        ],
        on: {
        },
    });
    gridResize();
};

function fnLoadAuditTrail() {

    vFooterGrp = {};
    var FromDt = $.trim($$("txtFrmDt").getText());
    var ToDt = $.trim($$("txtToDate").getText());
    var dataparam = {}; var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADAUDITTRAIL";
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
                $$("gridAudtTrail").clearAll();
                $$("gridAudtTrail").parse(rowData);
                vFooterGrp["DtTm"] = ["", "string"];
                vFooterGrp["Module"] = ["", "string"];
                vFooterGrp["Action"] = ["", "string"];
               
                $$("gridAudtTrail").group({
                    by: function (obj) {
                        debugger;
                        return "User : " + obj["User"];
                    },
                    row: function (obj) {
                        return obj.DtTm;
                    },
                    missing: "Other",
                    map: {
                        DtTm: [function (obj) {
                            return "User : " + obj["User"];
                        }],
                    },
                    footer: vFooterGrp,
                });

                $$("gridAudtTrail").openAll();
                $$("gridAudtTrail").refresh();
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
    vGrid = $$("gridAudtTrail");

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
    vGrid = $$("gridAudtTrail");
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

