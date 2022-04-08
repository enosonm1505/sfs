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

            var FullData = $$("CompanyCreditLimitRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                //$("#LoadDIv").show();
                webix.toExcel($$("CompanyCreditLimitRpt"), {
                    filename: "CompanyCreditLimit",
                    styles: true,
                    spans: true,
                    header: true,
                    name: "Company Credit Limit",
                    docHeader: "Company Credit Limit",
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
            var FullData = $$("CompanyCreditLimitRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                webix.print($$("CompanyCreditLimit"), {
                    filename: "CompanyCreditLimit",
                    styles: true,
                    spans: false,
                    header: true,
                    css: true,
                    name: "Company Credit Limit",
                    docHeader: "Company Credit Limit",
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
        value:   $.trim($("#hdnCompId").val()),
        label: "Property",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                VPostDt = fnPageLoad();
              //  $$("dateAsOn").setValue(VPostDt);
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
                                 width: 50
                                 
                             },
                             {
                                 view: "datepicker",
                                 id: "dateAsOn",
                                 disable: true,
                                 stringResult: true,
                                 label: "Ason Date",
                                 format: "%d/%m/%Y",
                                 value: $("#hdnCurDt").val(),
                                 labelAlign: "Right",
                                 labelWidth: 80,
                                 inputWidth: 200,
                                 width: 230,
                             },
                             {
                                 view: "button",
                                 id: "DisplatBtn",
                                 value: "Display",
                                 width: 70,
                                 on: {
                                     onItemClick: function () {
                                         fnLoadCompanyCreditLimitDisplay();
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
                                 id: "CompanyCreditLimitRpt",
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
                                   { header: "Company Id", id: "COMPID", width: 100, css: { 'text-align': 'left ! important' } },
                                   {
                                       header: "Company Name", id: "COMPNM", width: 300 ,css: { 'text-align': 'left ! important' },
                                   },
                                 
                                   { header: "Balance", id: "BAL", width: 100, css: { 'text-align': 'Right ! important' } },
                                    { header: "Credit Limit", id: "CRLMT", width: 100, css: { 'text-align': 'Right ! important' } },
                                  { header: "Exceed", id: "EXCEED", width: 100, css: { 'text-align': 'Right ! important' } },
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
function fnLoadCompanyCreditLimitDisplay() {
    debugger;
    $("#pageload").show();//S.VijayaLakshmi''4/3/20
    $$("CompanyCreditLimitRpt").clearAll();
    $$("CompanyCreditLimitRpt").refresh();
 
    var dataparam = {};
    debugger;



    dataparam["REQTYPE"] = "GETCOMPANYCREDITLIMITDISPLAY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    //dataparam["PendingBills"] = $$("chkpendBills").getValue();
    dataparam["AsOndate"] = $$("dateAsOn").getValue();

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

                $$("CompanyCreditLimitRpt").clearAll();
                $$("CompanyCreditLimitRpt").parse(rowData);
                $$("CompanyCreditLimitRpt").openAll();
                $$("CompanyCreditLimitRpt").refresh();
            }
        },
    });
    $("#pageload").hide();//S.VijayaLakshmi''4/3/20
}








