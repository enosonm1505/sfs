var app = angular.module('BQTApp', ['webix']);

app.controller("BQReportsController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();

    var funOutet = PrcLoadOutlet();

    var fnVenue = PrcLoadVenue();
   
    var Settle = PrcLoadSettle();

    $scope.frmRptSettTy = {

        id: "frmRptSettTy",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                paddingX: 5,
                rows: [
                   {
                       cols: [
                           {
                               view: "richselect",
                               id: "ddlOutlet",
                               label: " Outlet",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 265, width: 290,
                               minWidth: 290, 
                               options: funOutet,
                               value:$("#hdnOutId").val(),
                               on: {
                                   onChange: function (newval, oldval) {
                                   }
                               }
                           },
                           {
                                view: "richselect",
                                id: "ddlVenue",
                                label: " Venue",
                                labelAlign: "Left",
                                labelWidth: 45,
                                inputWidth: 200,
                                width:250,
                                minWidth: 250,
                                options: fnVenue,
                                value: "ALL",
                                on: {
                                    onChange: function (newval, oldval) {
                                    }
                                }
                           },
                           {
                               view: "datepicker",
                               id: "txtFrmDate",
                               stringResult: true,
                               label: "From",
                               format: "%d/%m/%Y",
                               value: $("#hdnCurrentDt").val(),
                               inputWidth: 155,
                               labelWidth: 40,
                               width: 155, minWidth: 155,
                           },
                            {
                                view: "datepicker",
                                id: "txtToDt",
                                stringResult: true,
                                label: "To",
                                format: "%d/%m/%Y",
                                value: $("#hdnCurrentDt").val(),
                                inputWidth: 140,
                                labelWidth: 25,
                                width: 140, minWidth: 140,
                            },
                            {
                                view: "button",
                                id: 'btnDisplay',
                                label: "Display",
                                width: 100,
                                minWidth: 100,
                                on: {
                                    onItemClick: function () {
                                        var ColumnConf = $$("grdBQSettle").config.columns;

                                        ColumnConf.splice(0, 1);
                                        $$("grdBQSettle").refreshColumns();

                                        ColumnConf.splice(0, 0, {
                                            header: ($.trim($$("ddlSetType").getValue()) != "ALL" ? "Company" : "Settle To"), id: "Company", width: 200, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' },
                                        });
                                        $$("grdBQSettle").refreshColumns();

                                        prcLoadSettleType();
                                    }   
                                }
                            },
                            {
                                minWidth:200,
                            }
                       ]
                   },
                   {
                       view: "richselect",
                       id: "ddlSetType",
                       label: " Settlement Type",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 265,
                       minWidth: 290,
                       options: Settle,
                       value: "ALL",
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                   {

                       id: "grdBQSettle",
                       view: "datatable",
                       select: "row",
                       data: [],
                       height: 420,
                       minWidth: 900,
                       scheme: {
                           $change: function (item) {
                               if (item.RBInd == "1") {
                                   item.$css = "GroupTot";
                               }
                               else if (item.GrpInd == "2") {
                                   item.$css = "GroupTot";
                               }
                           }
                       },
                       columns: [
                               { header: "Company", id: "Company", width: 200, css: { 'text-align': 'left ! important' } },
                               { header: "Date", id: "Date", width: 90, css: { 'text-align': 'center ! important' } },
                               { header: "Time  ", id: "Time", width: 70, css: { 'text-align': 'center ! important' } },
                               { header: "Outlet", id: "Outlet", width: 100, css: { 'text-align': 'left ! important' }, },
                               { header: "Bill No", id: "BillNo", width: 100, css: { 'text-align': 'left ! important' }, },
                               { header: "Currency", id: "Curr", width: 110, css: { 'text-align': 'left ! important' }, hidden: true, },
                               { header: "Forn Amt", id: "Forgn", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Settle Amt", id: "SettleAmt", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Tips", id: "Tips", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Total Amt", id: "Total", width: 100, css: { 'text-align': 'right ! important' } },
                               { header: "Remarks", id: "Remark", width: 250, css: { 'text-align': 'left ! important' } },
                               { header: "UserName", id: "UserNM", width: 100, css: { 'text-align': 'left ! important' } },
                       ],
                       on: {
                           'onItemDblClick': function (id, e, node) {

                           }
                       }
                   }
                ]
            }
        ]
    }
});

function PrcLoadVenue() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BNVENUE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
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

function PrcLoadOutlet() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BNOUTLET";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                $("#hdnOutId").val($.trim(rowData[0].id));
            }
        }
    });

    return rowData;
}

function PrcLoadSettle() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_SETTLEMENTTYPE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
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

function PrcLoadVenue() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BNVENUE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
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

function prcLoadSettleType() {

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_BQSETTLEMENTTY";
    dataparam["COMPID"] = $("#hdnCompId").val();

    dataparam["FrmDt"] = $$("txtFrmDate").getValue();
    dataparam["EndDt"] = $$("txtToDt").getValue();
    dataparam["ddlOutlet"] = $$("ddlOutlet").getValue();
    dataparam["ddlVenue"] = $$("ddlVenue").getValue();
    dataparam["ddlSetType"] = $$("ddlSetType").getValue();

    dataparam["FUserIds"] = "";

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                $$("grdBQSettle").clearAll();
                $$("grdBQSettle").parse(rowData);
                $$("grdBQSettle").refresh();
            }
        }
    });
    $("#LoadDIv").hide();
}

function sidebarFn() {
    $$("frmRptSettTy").resize();
    $$("frmRptSettTy").adjust();
    $$("grdBQSettle").resize();
    $$("grdBQSettle").adjust();
}