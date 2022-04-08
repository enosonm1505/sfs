
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
        fnRemoveClass();
        fnClearData();
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

function FnGuestCreate() {

    webix.ui({
        view: "window",
        modal: true,
        id: "PopupNewGst",
        head: "Message",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        move: true,
        height: 100,
        body: {
            view: 'form',
            minWidth: 350,
            maxWidth: 350,
            height: 100,
            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "label",
                                    id: "lblgst",
                                    label: "Create as New Guest !",
                                    labelAlign: "Center",
                                    width: 170,
                                },
                                {
                                    id: "btnGPYes",
                                    view: 'button',
                                    label: 'Yes',
                                    maxWidth: 75,
                                    inputWidth: 70,
                                    on: {
                                        onItemClick: function () {
                                            $$('PopupNewGst').hide();
                                            $("#hdnGPpopInd").val("0");
                                            fnCallGuestProfile($("#hdnCompId").val(), $$("ddlGuestTy").getValue(), $("#hdnGstId").val(), $$("ddlTit").getValue(), $$("txtFirstNm").getValue(), $$("txtGstName").getValue(), $("#hdnGstNmInd").val());
                                            return;
                                        }
                                    }
                                },
                                {
                                    id: "btnGPNO",
                                    view: 'button',
                                    label: 'No',
                                    maxWidth: 75,
                                    inputWidth: 70,
                                    on: {
                                        onItemClick: function () {
                                            debugger;
                                            $("#hdnGPpopInd").val("0");
                                            $$('PopupNewGst').hide();
                                            return;
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

    if ($.trim($("#hdnGstId").val()) == "") {
        if ($.trim($("#hdnGPpopInd").val()) != "1") {
            $("#hdnGPpopInd").val("1");
            $$('PopupNewGst').show();
        }
    }
}

function fnCallPopUpBookerSearch(Option) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupBookerSrch",
        head: "Booker Search",
        position: "center",
        minWidth: 850,
        maxWidth: 850,
        move: true,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 850,
            maxWidth: 850,

            elements: [
                {
                    view: "datatable",
                    id: "grdBooker",
                    select: "row",
                    data: [],
                    height: 400,
                    scroll: "y",
                    columns: [
                            { header: ["Last Name", { content: "textFilter" }], id: "vItemNm1", width: 180, css: { 'text-align': 'left ! important' } },
                            { header: ["First Name", { content: "textFilter" }], id: "vItemNm2", width: 180, css: { 'text-align': 'left ! important' } },
                            { header: ["Company", { content: "textFilter" }], id: "vCompNm", width: 250, css: { 'text-align': 'left ! important' } },
                            { header: ["City", { content: "textFilter" }], id: "vAd4", width: 200, css: { 'text-align': 'left ! important' } },
                            { header: "BookerId", id: "vBKId", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);

                            $$("txtBooker").setValue(selectedRows[0].vItemNm1 + '' + selectedRows[0].vItemNm2);
                            $("#hdnBookerId").val(selectedRows[0].vBKId);

                            $$('PopupBookerSrch').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                },
                {
                    PaddingY: 10,
                    cols: [
                         {
                             minWidth: 740,
                             paddingX: 740,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGuestDet').hide();
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

    fnBookerLoad(Option);
    $$("PopupBookerSrch").show();
}

function fnBookerLoad(Option) {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BOOKERSRCH";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Option"] = Option;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdBooker").clearAll();
                $$("grdBooker").parse(rowData);
                $$("grdBooker").refresh();
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
