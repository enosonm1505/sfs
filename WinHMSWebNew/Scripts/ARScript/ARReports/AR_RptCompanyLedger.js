var app = angular.module('ARTApp', ['webix']);

app.controller("ARReportController", function ($scope) {
    $("#pageload").hide();//S.VijayaLakshmi''4/3/20

    var dataProp = fnPropertyLoad();

    var VPostDt = fnPageLoad();


    $scope.divExcel = {
        view: "button",
        id: "divExcel",
        //container: "divExcel",
        //type: "icon",
        label: "Excel",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Excel",
        click: function () {

            var FullData = $$("CompanyLedgerRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                //$("#LoadDIv").show();
                webix.toExcel($$("CompanyLedgerRpt"), {
                    filename: "CompanyLedger",
                    styles: true,
                    spans: true,
                    header: true,
                    name: "Company Ledger",
                    docHeader: "Company Ledger",
                });
                //$("#LoadDIv").hide();
            }
            else {
                AlertMessage('Records not present in Report');
                return false;;
            }
        }
    }

    $scope.divPdf = {
        view: "button",
        id: "divPdf",
        label: "Print",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Print",
        click: function () {
            var FullData = $$("CompanyLedgerRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                webix.print($$("CompanyLedgerRpt"), {
                    filename: "CompanyLedger",
                    styles: true,
                    spans: false,
                    header: true,
                    css: true,
                    name: "Company Ledger",
                    docHeader: "Company Ledger",
                    orientation: "landscape",
                    height: 1350,
                });
            }
            else {
                AlertMessage('Records not present in Report');
                return false;;
            }
        }
    }

    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: $.trim($("#hdnCompId").val()),
        label: "Property",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                VPostDt = fnPageLoad();
              //  $$("dateFrom").setValue(VPostDt);
            }
        }
    }

    webix.ui({
        view: 'form',
        id: "divRptform",
        container: "divRptform",
        minWidth: 900,
        maxWidth: 1200,
        height: 480,
        elements: [
            {
                paddingX: 0,

                rows: [
                     {
                         paddingX: 10,
                         cols: [
                             {
                                 width: 120
                                 
                             },
                             {
                                
                                 width: 50
                             },
                             {
                                 width: 150
                                
                             },
                             
                             {
                                 view: "datepicker",
                                 id: "dateFrom",
                                 disable: true,
                                 stringResult: true,
                                 label: "From",
                                 format: "%d/%m/%Y",
                                 value: $("#hdnCurDt").val(),
                                 labelAlign: "Right",
                                 labelWidth: 80,
                                 inputWidth: 200,
                                 width: 200,
                             },
                             {
                                 view: "datepicker",
                                 id: "dateTo",
                                 disable: true,
                                 stringResult: true,
                                 label: "To",
                                 format: "%d/%m/%Y",
                                 value: $("#hdnCurDt").val(),
                                 labelAlign: "Right",
                                 labelWidth: 80,
                                 inputWidth: 200,
                                 width: 200,

                             },
                             {
                                 view: "button",
                                 id: "DisplatBtn",
                                 value: "Display",
                                 width: 70,
                                 on: {
                                     onItemClick: function () {
                                         fnLoadCompanyLedgerDisplay();
                                     }
                                 }
                             },
                             //{
                             
                             //}
                         ]
                     },
                     {
                         paddingX: 10,
                         paddingY: 20,
                         cols: [
                             {
                                 view: "treetable",
                                 id: "CompanyLedgerRpt",
                                 spans: true,
                                 select: "row",
                                 data: [],
                                 height: 440,
                                 scheme: {
                                     $change: function (item) {
                                         debugger;
                                         if ($.trim(item.DUEDT) == "Total" || item.DUEDT == "Grand Total") {
                                             item.$css = "Rowhighlight";
                                         }
                                         if ($.trim(item.GRPHEAD) == "1") {
                                             item.$css = "GrpHeaderClr"
                                         }
                                     },
                                 },
                                 columns: [
                                 
                                   {
                                       header: "Company Name", id: "COMPNM", width: 300 ,css: { 'text-align': 'left ! important' },
                                   },
                                 
                                   { header: "Opening Bal", id: "OPENBAL", width: 100, css: { 'text-align': 'Right ! important' } },
                                    { header: "Debit", id: "DEBIT", width: 100, css: { 'text-align': 'Right ! important' } },
                                  { header: "Credit", id: "CREDIT", width: 100, css: { 'text-align': 'Right ! important' } },
                                      { header: "Closing Bal", id: "CLOSEBAL", width: 100, css: { 'text-align': 'Right ! important' } },
                                    { header: "GRPHEAD", id: "GRPHEAD", width: 100, hidden: true, css: { 'text-align': 'left ! important' } },
                                 ],
                             }
                         ]
                     }
                ]
            }
        ],
    });

});

function Fontstyle(value, config) {
    // debugger;
    if ($.trim(config.GRPHEAD) == "1") {
        return { "color": "Black", "font-weight": "Bold" };
    }
};
function fnPropertyLoad() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                //$("#hdnCompId").val("WS");
            }
        },
    });
    return rowData;
}
function fnPageLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    var PostDt = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["REQTYPE"] = "GET_DEFAULTDT";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                //  $("#hdnCurDt1").val(rowData[0].CURRDT);
                $("#hdnCurDt1").val(rowData[0].CURRDT1);
                $("#hdnCurDt").val(rowData[0].CURRDT);
                $("#hdnCurTm").val(rowData[0].CURRTM);
            }
        },
    });
    return rowData;
}
function fnLoadCompanyLedgerDisplay() {
    debugger;
    $("#pageload").show();//S.VijayaLakshmi''4/3/20
    $$("CompanyLedgerRpt").clearAll();
    $$("CompanyLedgerRpt").refresh();
 
    var dataparam = {};
    debugger;



    dataparam["REQTYPE"] = "GETCOMPANYLEDGERDISPLAY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    //dataparam["PendingBills"] = $$("chkpendBills").getValue();
    dataparam["FrmDt"] = $$("dateFrom").getValue();
    dataparam["ToDt"] = $$("dateTo").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                $$("CompanyLedgerRpt").clearAll();
                $$("CompanyLedgerRpt").parse(rowData);
                $$("CompanyLedgerRpt").openAll();
                $$("CompanyLedgerRpt").refresh();
            }
        },
    });
    $("#pageload").hide();//S.VijayaLakshmi''4/3/20
}








