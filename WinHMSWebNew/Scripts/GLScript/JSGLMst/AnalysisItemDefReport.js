var app = angular.module('GLMApp', ['webix']);
app.controller("GLMasterController", function ($scope) {
    $("#LoadDIv").hide();
    var DefFun = fnLoadDef();
    var dataProp = fnPropertyLoad();
    var AIReport = fnLoadReport();
    debugger;
    $scope.frmAnalysisItemDefaultsReports = {
        id: "frmAnalysisItemDefaultsReports",
        view: 'form',
        minWidth: 900,
        height: 950,
        width: 800,
        elements: [
            {
                rows: [
                    {
                        cols: [
                                 {
                                     id: "analysisItemDefaultGridReport",
                                     select: 'row',
                                     view: "datatable",
                                     fixedRowHeight: false,
                                     rowLineHeight: 23,
                                     autoConfig: true,
                                     height: 500,
                                     Width: 500,
                                     position: "flex",
                                     css: "webix_header_border wingrd_hight",
                                     data: [],
                                     columns: [
                                          { header: "A_LV", id: "ixA_LV", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "L_TY", id: "ixL_TY", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "L_NM", id: "ixL_NM", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "L_CD", id: "ixL_CD", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                         
                                     ],
                                     data: [],
                                     
                                 },
                        ]
                    }
                ]
            }
        ]
    }
}
);

function fnLoadReport() {
    debugger;
    var rowData = [];

    try {
        Request = {
            REQTYPE: "GET_MST_AIDEFAULTREPORT",
            COMPID: $("#hdnCompId").val(),
        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: true,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                if (d != "" && d != null) {
                    rowData = JSON.parse(d);
                    if (rowData != null && rowData != "") {
                        $$("analysisItemDefaultGridReport").clearAll();
                        $$("analysisItemDefaultGridReport").parse(rowData);
                        $$("analysisItemDefaultGridReport").refresh();
                    }
                }
            }
        });
        //return rowData;
    }
    catch (e) {
        console.log(e.message);

    }



}




function fnLoadDef() {
    debugger;

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_GLFISCALYRPERIOD";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnPropertyLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

