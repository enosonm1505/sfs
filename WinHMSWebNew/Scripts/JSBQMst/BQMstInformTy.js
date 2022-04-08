
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstInfromTy = {

        id: "frmMstInfromTy",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                paddingX: 50,
                rows: [
                   {
                       cols: [
                           {
                               view: "richselect",
                               id: "ddlInformTy",
                               label: " Inform Type",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 320,
                               width: 320,
                               on: {
                                   onChange: function (newval, oldval) {
                                       if ($.trim(newval) == "20")
                                           $$("ChkCanRes").show();
                                       else
                                           $$("ChkCanRes").hide();

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
                       cols:[
                           {
                               view: "text",
                               id: "txtInfId",
                               label: "ID",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 160,
                               width: 160,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnInfSrch',
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
                                       fnCallInfPopup();
                                   }
                               }
                           },
                       ]
                   },
                   {
                       view: "text",
                       id: "txtName",
                       label: "Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 30 }
                   },
                   {
                       view: "text",
                       id: "txtSeqNo",
                       label: "Sequence No",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 170,
                       width: 170,
                       attributes: { maxlength: 2 }
                   },
                   {
                       id: "ChkCanRes",
                       view: "checkbox",
                       labelRight: "Default Cancel Reason",
                       labelWidth: 95,
                       width: 400,
                       hidden:true,
                       on: {
                           "onChange": function () {

                           }
                       }
                   }
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("ddlInformTy").disable();
    $$("txtInfId").disable();
    $$("txtName").disable();
    $$("txtSeqNo").disable();
    $$("ChkActive").disable();
    $$("ChkCanRes").disable();
}

function fnEnable() {
    $$("ddlInformTy").enable();
    $$("txtInfId").enable();
    $$("txtName").enable();
    $$("txtSeqNo").enable();
    $$("ChkActive").enable();
    $$("ChkCanRes").enable();
}

function ClearData() {
    $$("ddlInformTy").setValue("");
    $$("txtInfId").setValue("");
    $$("txtName").setValue("");
    $$("txtSeqNo").setValue("");
    $$("ChkActive").setValue("");
}

function fnLoadInfromType() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_INFORMTYPE";
    dataparam["PROGNAME"] = "GET_MST_INFORMTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("ddlInformTy").define("options", rowData);
                $$("ddlInformTy").refresh();
            }
        }
    });
}

function fnSaveInformData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_INFROMTYSAVE";
    dataparam["PROGNAME"] = "GET_MST_INFORMTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["ddlInformTy"] = $.trim($$("ddlInformTy").getValue());
    dataparam["txtInfId"] = $.trim($$("txtInfId").getValue());
    dataparam["txtName"] = $.trim($$("txtName").getValue());
    dataparam["txtSeqNo"] = $.trim($$("txtSeqNo").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["ChkCanRes"] = $.trim($$("ChkCanRes").getValue());

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

    if ($$("ddlInformTy").getValue() == "") {
        AlertMessage("Inform Type cannot be empty !");
        return false;
    }

    if ($$("txtInfId").getValue() == "") {
        AlertMessage("ID cannot be empty !");
        return false;
    }

    if ($$("txtName").getValue() == "") {
        AlertMessage("Name cannot be empty !");
        return false;
    }

    if ($$("txtSeqNo").getValue() == "") {
        AlertMessage("Sequence No cannot be empty !");
        return false;
    }

    var Dataset = fnLoadOpenData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.IN_ID) == $.trim($$("ddlInformTy").getValue())) && ($.trim(Dataset.TY_ID) == $.trim($$("txtInfId").getValue()));
        });

        if (Filter3.length > 0) {
            AlertMessage("This Record Already exisit !");
            return false;
        }
    }

    return true;
}

function fnCallInfPopup() {

    var Dataset = fnLoadOpenData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "Inform Type Search",
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
                            { header: "Inform id", id: "TY_ID", hidden: true, },
                            { header: ["Inform Name", { content: "textFilter" }, ], id: "TY_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.TY_ID) == $.trim(selectedRows[0].TY_ID);
                            });

                            if (Filter1.length > 0) {

                                $$("ddlInformTy").setValue(Filter1[0].IN_ID);
                                $$("txtInfId").setValue(Filter1[0].TY_ID);
                                $$("txtName").setValue($.trim(Filter1[0].TY_NM));
                                $$("txtSeqNo").setValue($.trim(Filter1[0].S_NO));
                                
                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);

                                $$("ChkCanRes").setValue((Filter1[0].C_IND == null || Filter1[0].C_IND == "" ? "0" : parseInt(Filter1[0].C_IND)));
                            }

                            $$('PopupOpenSrch').hide();
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
                                                     $$('PopupOpenSrch').hide();
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

    $$("PopupOpenSrch").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function fnLoadOpenData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_INFROMTYOPEN";
    dataparam["PROGNAME"] = "GET_MST_INFORMTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ddlInformTy"] = $.trim($$("ddlInformTy").getValue());
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