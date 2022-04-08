
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstAnalyGrp = {

        id: "frmMstAnalyGrp",
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
                               view: "text",
                               id: "txtGroupId",
                               label: "Group Id",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnGrpSrch',
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
                       id: "txtGroupNM",
                       label: "Group Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                   },
                   {
                        view: "text",
                        id: "txtSeqNo",
                        label: "Seq No",
                        labelAlign: "Left",
                        labelWidth: 120,
                        inputWidth: 180,
                        width: 180,
                        on: {
                            onKeyPress: function (code, evt) {

                                evt = (evt) ? evt : window.event;
                                var charCode = (evt.which) ? evt.which : evt.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtGroupId").disable();
    $$("txtGroupNM").disable();
    $$("txtSeqNo").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtGroupId").enable();
    $$("txtGroupNM").enable();
    $$("txtSeqNo").enable();
    $$("ChkActive").enable();
}

function fnSaveAnaGrpData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_ANALYGRPSAVE";
    dataparam["PROGNAME"] = "GET_MST_ANALYSISGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtGroupId"] = $.trim($$("txtGroupId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtGroupNM"] = $.trim($$("txtGroupNM").getValue());
    dataparam["txtSeqNo"] = $.trim($$("txtSeqNo").getValue());

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

    var Dataset = fnLoadOpenData();

    if ($$("txtGroupId").getValue() == "") {
        AlertMessage("group Id cannot be empty !");
        return false;
    }

    if ($$("txtGroupNM").getValue() == "") {
        AlertMessage("group Name cannot be empty !");
        return false;
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.G_ID) == $.trim($$("txtGroupId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.G_NM) == $.trim($$("txtGroupNM").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Item Group Name is already exists !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.G_ID) != $.trim($$("txtGroupId").getValue())) && ($.trim(Dataset.G_NM) == $.trim($$("txtGroupNM").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Name is already exists");
            return false;
        }
    }

    if ($$("txtSeqNo").getValue() != "") {
        if (parseInt($$("txtSeqNo").getValue()) < 1 || parseInt($$("txtSeqNo").getValue()) > 99) {
            AlertMessage("Display Sequence No with in 1..99");
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
        head: "Analysis Group Search",
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
                            { header: "id", id: "G_ID", hidden: true, },
                            { header: ["Analysis Group Name", { content: "textFilter" }, ], id: "G_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.G_ID) == $.trim(selectedRows[0].G_ID);
                            });

                            if (Filter1.length > 0) {
                                $$("txtGroupId").setValue(Filter1[0].G_ID);
                                $$("txtGroupNM").setValue(Filter1[0].G_NM);
                                $$("txtSeqNo").setValue($.trim(Filter1[0].S_SEQ));

                                $$("ChkActive").setValue((Filter1[0].A_IND == null || Filter1[0].A_IND == "" ? "0" : parseInt(Filter1[0].A_IND)));
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
    dataparam["REQTYPE"] = "GET_MST_ANALYGRPOPEN";
    dataparam["PROGNAME"] = "GET_MST_ANALYSISGRP";
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