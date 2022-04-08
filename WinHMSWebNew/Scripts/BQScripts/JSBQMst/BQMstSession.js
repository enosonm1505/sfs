
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstSession = {

        id: "frmMstSession",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtSessionId",
                               label: "Session ID",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnsessionSrch',
                               minWidth: 250,
                               labelWidth: 0,
                               width: 30,
                               height: 28,
                               type: 'icon',
                               icon: 'wxi-search',
                               css: "Ar_search",
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       fnCallGrpSrchPopup();
                                   }
                               }
                           },
                           {
                               id: "ChkActive",
                               view: "checkbox",
                               label: "Active",
                               labelAlign: "Right",
                               labelWidth: 140,
                               width: 200,
                               on: {
                                   "onChange": function () {

                                   }
                               }
                           }
                       ]
                   },
                   {
                       view: "text",
                       id: "txtSesionNm",
                       label: "Session Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 25 },
                   },
                   {
                       id: "ChkSessApplic",
                       view: "checkbox",
                       label: "Session Applicable, Yes",
                       labelAlign: "Left",
                       labelWidth: 140,
                       width: 200,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       view: "text",
                       id: "txtDispSeq",
                       label: "Display Seq No",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 200,
                       width: 200,
                       attributes: { maxlength: 2 },
                       on: {
                           onKeyPress: function (code, evt) {
                               var specialKeys = new Array();
                               specialKeys.push(8); //Backspace
                               var keyCode = evt.which ? evt.which : evt.keyCode
                               var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || specialKeys.indexOf(keyCode) != -1);
                               return ret;
                           }
                       }
                   },
                   {
                       view: "datepicker",
                       format: "%H:%i",
                       id: "txtStrtTm",
                       label: "Start Time",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 200,
                       width: 240, minWidth: 240,

                       suggest: {
                           type: "calendar",
                           body: {
                               type: "time",
                               calendarTime: "%H:%i"
                           }
                       }
                   },
                   {
                       view: "datepicker",
                       format: "%H:%i",
                       id: "txtEndTm",
                       label: "End Time",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 200,
                       width: 240, minWidth: 240,

                       suggest: {
                           type: "calendar",
                           body: {
                               type: "time",
                               calendarTime: "%H:%i"
                           }
                       }
                   },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtSessionId").disable();
    $$("txtSesionNm").disable();
    //$$("txtGrpShNm").disable();
    $$("txtDispSeq").disable();
    $$("ChkSessApplic").disable();
    $$("ChkActive").disable();
    $$("txtStrtTm").disable();
    $$("txtEndTm").disable();

}

function fnEnable() {
    $$("txtSessionId").enable();
    $$("txtSesionNm").enable();
    $$("txtDispSeq").enable();
    $$("ChkSessApplic").enable();
    $$("ChkActive").enable();
    $$("txtStrtTm").enable();
    $$("txtEndTm").enable();

}

function fnSaveSessionData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_SESSIONSAVE";
    dataparam["PROGNAME"] = "GET_MST_SESSION";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtSessionId"] = $.trim($$("txtSessionId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtSesionNm"] = $.trim($$("txtSesionNm").getValue());
    dataparam["ChkSessApplic"] = $.trim($$("ChkSessApplic").getValue());
    dataparam["txtDispSeq"] = $.trim($$("txtDispSeq").getValue());


    if ($$("txtStrtTm").getValue() != "" && $$("txtStrtTm").getValue() != null) {
        var StrtTm = new Date($$("txtStrtTm").getValue());
        dataparam["txtStrtTm"] = (StrtTm.getHours().toString().length == 1 ? "0" + StrtTm.getHours() : StrtTm.getHours()) + ":"
            + (StrtTm.getMinutes().toString().length == 1 ? "0" + StrtTm.getMinutes() : StrtTm.getMinutes());
    }
    else {
        dataparam["txtStrtTm"] = "00:00";
    }


    if ($$("txtEndTm").getValue() != "" && $$("txtEndTm").getValue() != null) {
        var EndTm = new Date($$("txtEndTm").getValue());
        dataparam["txtEndTm"] = (EndTm.getHours().toString().length == 1 ? "0" + EndTm.getHours() : EndTm.getHours()) + ":"
            + (EndTm.getMinutes().toString().length == 1 ? "0" + EndTm.getMinutes() : EndTm.getMinutes());
    }
    else {
        dataparam["txtEndTm"] = "00:00";
    }

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {

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
                else {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
            }
        },
    });
}

function fnBQValidate() {
    debugger;

    if ($("#hdnCurMode").val() == "N") {

        if ($.trim($$("txtSessionId").getValue()) == "") {
            AlertMessage("Session Id cannot be empty !");
            return false;
        }
    }


    if ($.trim($$("txtSesionNm").getValue()) == "") {
        AlertMessage("Session Name cannot be empty !");
        return false;
    }
   if ($.trim($$("txtDispSeq").getValue()) == "") {
        AlertMessage("Display Seq No cannot be empty !");
        return false;
    }

    var Dataset = fnLoadSessionData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.SESSION_ID) == $.trim($$("txtSessionId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.SESSION_NM) == $.trim($$("txtSesionNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Session Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.SESSION_ID) != $.trim($$("txtSessionId").getValue())) && ($.trim(Dataset.SESSION_NM) == $.trim($$("txtSesionNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Session Name Already  exisit !");
            return false;
        }
    }

    return true;
}

function fnCallGrpSrchPopup() {

    var Dataset = fnLoadSessionData();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSessionSrch",
        head: "Session Name Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Session id", id: "SESSION_ID", hidden: true, },
                            { header: ["Session Name", { content: "textFilter" }, ], id: "SESSION_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.SESSION_ID) == $.trim(selectedRows[0].SESSION_ID);
                            });

                            //fnLoadDefFunction();

                            if (Filter1.length > 0) {

                                $$("txtSessionId").setValue($.trim(Filter1[0].SESSION_ID));
                                $$("txtSesionNm").setValue($.trim(Filter1[0].SESSION_NM));
                                $$("txtDispSeq").setValue($.trim(Filter1[0].DISP_SEQ_NO));
                                var SESSION_DISP_IND = (Filter1[0].SESSION_DISP_IND == null || ($.trim(Filter1[0].SESSION_DISP_IND) == "0") == true ? "0" : "1");
                                $$("ChkSessApplic").setValue(SESSION_DISP_IND);
                                var strttm = new Date('01/01/2020 ' + Filter1[0].S_T)
                                $$("txtStrtTm").setValue(strttm);
                                var endtm = new Date('01/01/2020 ' + Filter1[0].E_T)
                                $$("txtEndTm").setValue(endtm);

                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
                            }

                            $$('PopupSessionSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupSessionSrch').hide();
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

    $$("PopupSessionSrch").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function fnLoadSessionData() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_SESSIONOPEN";
    dataparam["PROGNAME"] = "GET_MST_SESSION";
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