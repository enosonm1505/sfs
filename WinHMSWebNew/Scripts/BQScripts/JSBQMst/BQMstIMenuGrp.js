
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstIMenuGrp = {

        id: "frmMstIMenuGrp",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols:[
                           {
                               view: "text",
                               id: "txtGrpId",
                               label: "Menu Group Id",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 200,
                               width: 200,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnMSrch',
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
                       id: "txtGrpNM",
                       label: "Menu Group Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 25 }
                   },
                   {
                         view: "text",
                         id: "txtSeqNo",
                         label: "Seq No",
                         labelAlign: "Left",
                         labelWidth: 120,
                         inputWidth: 180,
                         width: 180,

                   }
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtGrpId").disable();
    $$("txtGrpNM").disable();
    $$("txtSeqNo").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtGrpId").enable();
    $$("txtGrpNM").enable();
    $$("txtSeqNo").enable();
    $$("ChkActive").enable();
}

function ClearData() {
    $$("txtGrpId").setValue("");
    $$("txtGrpNM").setValue("");
    $$("txtSeqNo").setValue("");
    $$("ChkActive").setValue("");
}

function fnSaveIMenuGrpData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_IMENUGRPSAVE";
    dataparam["PROGNAME"] = "GET_MST_ITEMMENUGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtGrpId"] = $.trim($$("txtGrpId").getValue());
    dataparam["txtGrpNM"] = $.trim($$("txtGrpNM").getValue());
    dataparam["txtSeqNo"] = $.trim($$("txtSeqNo").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());

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

    if ($.trim($$("txtGrpId").getValue()) == "") {
        AlertMessage("Menu group Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtGrpNM").getValue()) == "") {
        AlertMessage("Menu group Name cannot be empty !");
        return false;
    }

    if ($.trim($$("txtSeqNo").getValue()) == "") {
        AlertMessage("Seq No cannot be empty !");
        return false;
    }
    var Dataset = fnLoadOpenData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.G_I) == $.trim($$("txtGrpId").getValue());
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
        head: "Menu Group Search",
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
            minWidth: 450,
            maxWidth: 450,
            elements: [
                {
                    view: "datatable",
                    id: "grdSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: ["ID", { content: "textFilter" }, ], id: "G_I", width: 70, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Menu Group Name ", { content: "textFilter" }, ], id: "G_N", width: 200, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.G_I) == $.trim(selectedRows[0].G_I);
                            });

                            if (Filter1.length > 0) {
                                $$("txtGrpId").setValue(Filter1[0].G_I);
                                $$("txtGrpNM").setValue($.trim(Filter1[0].G_N));
                                $$("txtSeqNo").setValue($.trim(Filter1[0].S_N));
                                
                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
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
    dataparam["REQTYPE"] = "GET_MST_IMENUGRPOPEN";
    dataparam["PROGNAME"] = "GET_MST_ITEMMENUGRP";
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