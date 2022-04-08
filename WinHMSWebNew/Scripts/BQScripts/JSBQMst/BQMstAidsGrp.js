
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstAidsGrp = {

        id: "frmMstAidsGrp",
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
                               id: "txtAidsGrId",
                               label: "Aids Group Id",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnAidsSrch',
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
                                       fnCallAidsPopup();
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
                       id: "txtAidsGrName",
                       label: "Aids Group Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 20 }
                   },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtAidsGrId").disable();
    $$("txtAidsGrName").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtAidsGrId").enable();
    $$("txtAidsGrName").enable();
    $$("ChkActive").enable();
}

function fnSaveAidsGrpData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_AIDSGRPSAVE";
    dataparam["PROGNAME"] = "GET_MST_AIDSGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtAidsGrId"] = $.trim($$("txtAidsGrId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtAidsGrName"] = $.trim($$("txtAidsGrName").getValue());
    dataparam["BNQ_IND"] = $.trim($("#hdnBNQInd").val());

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

                    if ($("#hdnBNQInd").val() == "1") {
                        $("#LoadDIv").hide();
                        $("#hdnFieldId").val($.trim($$("txtAidsGrId").getValue()));
                        $("#hdnMstType").val("AIDSGROUP");
                        fnBanqMulticompPopup();
                    }
                    else {
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

    if ($.trim($$("txtAidsGrId").getValue()) == "") {
        AlertMessage("Aids group Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtAidsGrName").getValue()) == "") {
        AlertMessage("Aids group Name cannot be empty !");
        return false;
    }

    var Dataset = fnLoadAidsData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AIDS_GR_ID) == $.trim($$("txtAidsGrId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }


    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AIDS_GR_NM) == $.trim($$("txtAidsGrName").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Aids Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.AIDS_GR_ID) != $.trim($$("txtAidsGrId").getValue())) && ($.trim(Dataset.AIDS_GR_NM) == $.trim($$("txtAidsGrName").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Aids Name Already  exisit !");
            return false;
        }
    }

    return true;
}

function fnCallAidsPopup() {

    var Dataset = fnLoadAidsData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAidsSrch",
        head: "Aids Group Search",
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
                    id: "grdAidsSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Aids id", id: "AIDS_GR_ID", hidden: true, },
                            { header: ["Aids Name", { content: "textFilter" }, ], id: "AIDS_GR_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.AIDS_GR_ID) == $.trim(selectedRows[0].AIDS_GR_ID);
                            });

                            if (Filter1.length > 0) {
                                $$("txtAidsGrId").setValue(Filter1[0].AIDS_GR_ID);
                                $$("txtAidsGrName").setValue(Filter1[0].AIDS_GR_NM);

                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
                            }

                            $$('PopupAidsSrch').hide();
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
                                                     $$('PopupAidsSrch').hide();
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

    $$("PopupAidsSrch").show();

    $$("grdAidsSrch").clearAll();
    $$("grdAidsSrch").parse(Dataset);
    $$("grdAidsSrch").refresh();
}

function fnLoadAidsData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_AIDSGRPOPEN";
    dataparam["PROGNAME"] = "GET_MST_AIDSGRP";
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

