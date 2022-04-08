var app = angular.module('BQTApp', ['webix']);

app.controller("BQReportsController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();

    var funOutet = PrcLoadOutlet();

    var fnVenue = PrcLoadVenue();
   
    var Settle = PrcLoadSettle();

    $scope.frmRptSettleTy = {

        id: "frmRptSettleTy",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 600,
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
                               inputWidth: 265,
                               width: 290,
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
                                width: 250,
                                options: fnVenue,
                                value: "ALL",
                                on: {
                                    onChange: function (newval, oldval) {
                                    }
                                }
                            },
                            {
                               width:900,
                               rows: [
                                   {
                                       cols: [
                                           {
                                               view: "datepicker",
                                               id: "txtFrmDate",
                                               stringResult: true,
                                               label: "From",
                                               format: "%d/%m/%Y",
                                               value: $("#hdnCurrentDt").val(),
                                               inputWidth: 155,
                                               labelWidth: 40,
                                               width: 185,
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
                                               width: 160,
                                           },
                                           {
                                                view: "button",
                                                id: 'btnDisplay',
                                                label: "Display",
                                                width: 100,
                                                maxwidth:150,
                                                on: {
                                                    onItemClick: function () {
                                                        prcLoadSettleType();
                                                    }
                                                }
                                            },
                                       ]
                                   },
                               ]
                           },
                       ]
                   },
                   {
                       view: "richselect",
                       id: "ddlSetType",
                       label: " Settlement Type",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 265,
                       width: 290,
                       options: Settle,
                       value: "ALL",
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                   {
                       view: "datatable",
                       id: "grdBQSettle",
                       select: "row",
                       data: [],
                       height: 450,
                       scroll: true,
                       columns: [
                               { header: "Company", id: "Company", width: 290, css: { 'text-align': 'left ! important' } },
                               { header: "Date", id: "Date", width: 90, css: { 'text-align': 'center ! important' } },
                               { header: "Time  ", id: "Time", width: 80, css: { 'text-align': 'center ! important' } },
                               { header: "Outlet", id: "Outlet", width: 100, css: { 'text-align': 'left ! important' }, },
                               { header: "Bill No", id: "BillNo", width: 100, css: { 'text-align': 'left ! important' }, },
                               { header: "Currency", id: "Curr", width: 110, css: { 'text-align': 'left ! important' } ,hidden:true,},
                               { header: "Forn Amt", id: "Forgn", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Settle Amt", id: "SettleAmt", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Tips", id: "Tips", width: 110, css: { 'text-align': 'right ! important' } },
                               { header: "Total Amt", id: "Total", width: 120, css: { 'text-align': 'right ! important' } },
                               { header: "Remarks", id: "Remark", width: 100, css: { 'text-align': 'left ! important' } },
                               { header: "UserNmae", id: "UserNM", width: 100, css: { 'text-align': 'left ! important' } },
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
