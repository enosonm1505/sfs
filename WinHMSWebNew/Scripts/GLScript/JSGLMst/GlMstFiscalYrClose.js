
var app = angular.module('GLMApp', ['webix']);

app.controller("GLMasterController", function ($scope) {
    //debugger;

    $("#LoadDIv").hide();

    var DefFun = fnLoadDef();

    var dataProp = fnPropertyLoad();

    var Filter3 = dataProp.filter(function (dataProp) {
        return (dataProp.id == $.trim($("#hdnCompId").val()));
    });

    $scope.frmFiscalYrClose = {

        id: "frmFiscalYrClose",
        view: 'form',
        minWidth: 1200,
        maxWidth: 5000,
        minHeight: 550,
        borderless:true,
        elements: [
            {
                rows: [
                    {
                        view: "text",
                        id: "txtCompany",
                        stringResult: true,  readonly: true,
                        label: "Company",
                        labelAlign: "left",
                        labelWidth: 90,
                        inputWidth: 400,
                        width: 400,
                        value: Filter3[0].value,
                        hidden:true,
                    },
                    {
                        view: "label",
                        id: "txtCap",
                        stringResult: true,
                        label: "Current Fiscal Year",
                        labelWidth: 90,
                        inputWidth: 280,
                        width: 300,
                        css: 'wc-bld',
                    },
                    {
                        paddingX:30,
                        cols: [
                            {
                                view: "datepicker",
                                id: "txtFrmDate",
                                readonly: true,
                                stringResult: true,
                                label: "From",
                                format: "%d/%m/%Y",
                                labelAlign: "Right",
                                inputWidth: 220,
                                labelWidth: 100,
                                width: 240,
                                value: DefFun[0].MINSTARTDT,
                            },
                            {
                                view: "datepicker",
                                id: "txtToDt",
                                readonly: true,
                                stringResult: true,
                                label: "To",
                                format: "%d/%m/%Y",
                                labelAlign: "Left",
                                inputWidth: 150,
                                labelWidth: 25,
                                width: 150,
                                value: DefFun[0].MAXSTARTDT,
                            }
                        ]
                    },
                    {
                         view: "text",
                         id: "txtNarration",
                         stringResult: true,
                         label: "Narration",
                         labelAlign: "left",
                         labelWidth: 90,
                         inputWidth: 550,
                         width: 550,
                    },
                    {
                        view: "label",
                        id: "lblNote",
                        stringResult: true,
                        label: "Note:-  No Transaction allowed for the Closed Fiscal Year and all Transactions are freezed.",
                        labelWidth: 90,
                        inputWidth: 550,
                        width: 550,
                        css: "wc-rdtlt",
                    },
                    //{
                    //    cols: [
                    //         {
                    //             id: "btnLog",
                    //             view: 'button',
                    //             label: 'Log',
                    //             inputWidth: 100,
                    //             labelWidth: 30,
                    //             width: 130,
                    //             on: {
                    //                 onItemClick: function () {
                    //                 }
                    //             }
                    //         },
                    //         {width:300,},
                    //         {
                    //             id: "btnProceed",
                    //            view: 'button',
                    //            label: 'Proceed',
                    //            inputWidth: 100,
                    //            labelWidth: 30,
                    //            width: 130,
                    //            on: {
                    //                onItemClick: function () {

                    //                    if ($$("txtNarration").getValue() == "") {
                    //                        AlertMessage('Narration Cannot be empty !');
                    //                        return false;;
                    //                    }
                    //                    $("#LoadDIv").show();
                    //                    var dataparam = {};
                    //                    dataparam["REQTYPE"] = "GET_CLOSEFISCALYEAR";
                    //                    dataparam["PROGNAME"] = "";
                    //                    dataparam["COMPID"] = $("#hdnCompId").val();
                    //                    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
                    //                    dataparam["FromDt"] = $$("txtFrmDate").getValue();
                    //                    dataparam["EndDt"] = $$("txtToDt").getValue();

                    //                    var DataVal = JSON.stringify(dataparam);
                    //                    $.ajax({
                    //                        async: true,
                    //                        url: "/GLMaster/FISCALAPI_CALL",
                    //                        type: 'POST',
                    //                        data: "request=" + DataVal,
                    //                        success: function (d) {
                    //                            if (d != "") {
                    //                                var rowData = JSON.parse(d);
                    //                                AlertMessage(rowData);
                    //                                $("#LoadDIv").hide();
                    //                                $$("txtNarration").setValue("");
                    //                                return;
                    //                            }
                    //                        }
                    //                    });
                    //                }
                    //            }
                    //        }
                    //    ]
                    //},
                ],
            }
        ]
    };
});
function fnProceed()
{
    if ($$("txtNarration").getValue() == "") {
        AlertMessage('Narration Cannot be empty !');
        return false;;
    }
    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_CLOSEFISCALYEAR";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["FromDt"] = $$("txtFrmDate").getValue();
    dataparam["EndDt"] = $$("txtToDt").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/GLMaster/FISCALAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                AlertMessage(rowData);
                $("#LoadDIv").hide();
                $$("txtNarration").setValue("");
                return;
            }
        }
    });
}
function fnLoadDef() {
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

function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnLoadProperty() {
    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);

                var Filter3 = dataProp.filter(function (dataProp) {
                    return (dataProp.id == $.trim(newval));
                });

                $$("txtCompany").setValue(Filter3[0].value);

                var DefFun = fnLoadDef();

                $$("txtFrmDate").setValue(DefFun[0].MINSTARTDT);

                $$("txtFrmDate").setValue(DefFun[0].MAXSTARTDT);

            }
        }
    });
}


function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}