
function fnLoadProperty() {

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        //label: "Property",
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
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
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

function fnMstCompany() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
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

function fnAccountDt() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
            }
        },
    });
}

function fnGetBNQInd() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BNQIND";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnBNQInd").val(rowData);
            }
        },
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
    })
}

function fnRemoveArry(DataSet, ColName, FilterVal) {
    var i = DataSet.length;
    while (i--) {
        if (DataSet[i]
            && DataSet[i].hasOwnProperty(ColName)
            && (arguments.length > 2 && DataSet[i][ColName] == FilterVal)) {

            DataSet.splice(i, 1);

        }
    }
    return DataSet;
}

function fnRemoveClass(Mode) {
    $("#btnNew").removeClass("ClickBtn");
    $("#btnOpen").removeClass("ClickBtn");
    $("#btnView").removeClass("ClickBtn");
    $("#btnSave").removeClass("ClickBtn");
    $("#btnRef").removeClass("ClickBtn");

    if ($.trim(Mode) == "N") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    } else if ($.trim(Mode) == "O") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "V") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', true);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "") {
        $('#btnNew').prop('disabled', false);
        $('#btnView').prop('disabled', false);
        $('#btnOpen').prop('disabled', false);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', true);
    }
}


// for multicompany concept
function fnBanqMulticompPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "BanquetMulticomp",
        head: "Appicable Properties",
        position: "center",
        minWidth: 300,
        maxWidth: 600,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 470,
            elements: [
                {
                    view: "datatable",
                    id: "grdBanqMulComp",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Aids id", id: "COMPANY_ID", hidden: true, },
                            { header: ["Properties"], id: "COMPANY_NM", width: 210, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: "Current Status", id: "chkAmend", template: "{common.rcheckbox()}", width: 120, css: { 'text-align': 'center ! important' } },
                            { header: "Amend Status", id: "chkActive", template: "{common.checkbox()}", width: 120, css: { 'text-align': 'center ! important' } },
                    ],
                    type:{
                        rcheckbox:function(obj, common, value, config){
                            var checked = (value == config.checkValue) ? 'checked="true"' : '';
                            return "<input disabled class='webix_table_checkbox' type='checkbox' "+checked+">";
                        }
                    },
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 315,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Save',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('BanquetMulticomp').hide();
                                                     fnUpdateActiveInd();
                                                 }
                                             }
                                         },
                                         {
                                             width: 15,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Cancel',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('BanquetMulticomp').hide();
                                                 }
                                             }
                                         },
                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

    $$("BanquetMulticomp").show();
    fnDataLoadMulcompany();

}

function fnDataLoadMulcompany() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADBANQMULCOMP";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MASTERID"] = $.trim($("#hdnFieldId").val());
    dataparam["MSTNAME"] = $.trim($("#hdnMstType").val());
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdBanqMulComp").parse(rowData);
                var data = $$("grdBanqMulComp").serialize();
                var lenval = data.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if ($.trim(data[i].ActiveInd) == "1") {
                            data[i].chkAmend = "1";
                            data[i].chkActive = "1";
                        }
                        else {
                            data[i].chkAmend = "0";
                            data[i].chkActive = "0";
                        }
                    }
                }
                $$("grdBanqMulComp").refresh();
            }
        }
    });
}

function fnUpdateActiveInd() {
    var data = $$("grdBanqMulComp").serialize();
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MULCOMPUPDATEACTIVEIND";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MASTERID"] = $.trim($("#hdnFieldId").val());
    dataparam["MSTNAME"] = $.trim($("#hdnMstType").val());
    dataparam["DTACTIVEGRD"] = data;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (rowData == "SUCCESS") {
                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
            }
        }
    });

}

function fnLoadTaxStructure() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_TAXSTRUCTURELOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
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