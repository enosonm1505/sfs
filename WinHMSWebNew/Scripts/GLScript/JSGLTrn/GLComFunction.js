
function fnPropertyLoad(Opt) {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: (Opt == "1" ? "/GLTrans" : "/GLReports") + "/COMAPI_CALL",
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

function fnAccountDt(Opt) {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: (Opt == "1" ? "/GLTrans" : "/GLReports") + "/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                //debugger;
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
            }
        },
    });
    return rowData;
}

function fnLoadParty(PartyGrpId, TblGridId, Opt) {
    debugger;

    //$("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PARTYSEARCH";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PartyGrp"] = PartyGrpId;
    dataparam["Option"] = Opt;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: (Opt == "1" ? "/GLTrans" : "/GLReports") + "/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                var rowData = JSON.parse(d);
                $$(TblGridId).clearAll();
                $$(TblGridId).parse(rowData);
                $$(TblGridId).refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
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

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}

function fnLoadDivision(Opt) {
    //debugger;

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLDIVISION";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Option"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: (Opt == "1" ? "/GLTrans" : "/GLReports") + "/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        //debugger;
                        if (rowData[i].RES_DIV_IND == "1") {
                            $("#hdnDivDef").val(rowData[i].id);
                        }
                        else if (i == 0) {
                            $("#hdnDivDef").val(rowData[i].id);
                        }
                    }
                }
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
