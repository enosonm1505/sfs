


var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {
  
    $("#LoadDIv").hide();
    $scope.frmMstEncWorkStationLink = {

        id: "frmMstEncWorkStationLink",
        view: 'form',
        minWidth: 600,
        maxWidth: 600,
        height: 500,
        elements: [
            {
                paddingX: 20,
                rows: [

                    {
                        cols: [
                            {
                                view: "datatable",
                                id: "grdMstEncWrkStationLink",
                                select: "row",
                                height: 420,
                                fixedRowHeight: false,
                                rowLineHeight: 23,
                                autoConfig: true,
                                minWidth: 150,
                                width: 520,
                                scroll: true,
                                position: "flex",
                                editable: true,
                                spans: true,
                                navigation: true,
                                css: "webix_header_border wingrd_hight",
                                data: [],
                                columns: [
                                      { header: ["WorkStation Id"], id: "WS_ID",hidden:true },
                                      { header: ["WorkStation Name"], id: "WS_NM", width: 280, css: { 'text-align': 'left ! important' },  liveEdit: true },
                                     // { header: ["LinkEncoder Id"], id: "EC_ID", hidden: true },
                                      { header: ["Link Encoder"], id: "EC_ID", width: 200, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: false, fillspace: true, collection: function (id) { return []; } },

                                ],
                                data: [],
                                on: {
                                    
                                },
                            },
                        ]
                    },
                ]
            }
        ]
    }
});



function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
    fnDdlEncoder();
    $$("grdMstEncWrkStationLink").enable();
    document.getElementById("SAVE").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
    //OPENCONTROL();
    var openmode = "1";
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNLOADGRID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OPENMODE"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {

                rowData = JSON.parse(d);
                $$("grdMstEncWrkStationLink").clearAll();
                $$("grdMstEncWrkStationLink").parse(rowData);
                $$("grdMstEncWrkStationLink").refresh();
            }
        },
    });
  //  return rowData;
};


function fnDdlEncoder() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNDDLENCODER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OPENMODE"] = "1";

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
               // $$("grdMstEncWrkStationLink").clearAll();
                var Options = $$("grdMstEncWrkStationLink").getColumnConfig("EC_ID").collection;
                Options.clearAll();
                Options.parse(rowData.TBLENCODER);
                $$("grdMstEncWrkStationLink").parse(rowData.TBLENCODER);
                $$("grdMstEncWrkStationLink").refresh();
            }
        },
    });
};



function fnSave() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNSAVEENCODERLINK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MAINGRID"] = $$("grdMstEncWrkStationLink").serialize();
    requestData = JSON.stringify(dataparam);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: false,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    if (d != "") {
                        rowData = JSON.parse(d);
                        if ($.trim(rowData) == "True") {
                            SuccessMsg("Saved Successfully");
                            fnRefresh();
                            $("#LoadDIv").hide();
                            return;
                        }

                        else {
                            AlertMessage("Operation failed");
                            fnRefresh();
                            $$("grdMstEncWrkStationLink").refresh();
                            $("#LoadDIv").hide();
                            return;
                        }

                    }
                },

            });
        }


function fnRefresh() {
    debugger;
    $("#hdnCurMode").val("");
    $$("grdMstEncWrkStationLink").disable();
    $$("grdMstEncWrkStationLink").clearAll();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("OPEN").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}



function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
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
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
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

function fnRemoveClass(Mode) {

     if ($.trim(Mode) == "O") {
        $('#OPEN').addClass("btnButton btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
    }
    else if ($.trim(Mode) == "") {
        $('#REFRESH').addClass("btnButton btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
    }
}

