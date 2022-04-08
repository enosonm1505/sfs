
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstAids = {

        id: "frmMstAids",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height:450,
        elements: [
            {
                paddingX:20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtAidsId",
                               label:"Aids Id",
                               labelAlign: "Left",
                               labelWidth: 100,
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
                       id: "txtAidsName",
                       label: "Aids Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 40 }
                   },
                   {
                       view: "richselect",
                       id: "ddlAidsGrId",
                       label: " Aids Group Id",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 320,
                       width: 320,
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                   {
                       view: "richselect",
                       id: "ddlDepart",
                       label: " Depart Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 320,
                       width: 320,
                       on: {
                           onChange: function (newval, oldval) {

                           }
                       }
                   }
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtAidsId").disable();
    $$("txtAidsName").disable();
    $$("ddlAidsGrId").disable();
    $$("ddlDepart").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtAidsId").enable();
    $$("txtAidsName").enable();
    $$("ddlAidsGrId").enable();
    $$("ddlDepart").enable();
    $$("ChkActive").enable();
}

function fnLoadDefFunction() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_AIDSLOAD";
    dataparam["PROGNAME"] = "GET_MST_AIDS";
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

                var TblVenGrp = rowData.TBLVENGRP;

                $$("ddlAidsGrId").define("options", TblVenGrp);
                $$("ddlAidsGrId").refresh();

                var TblDept = rowData.TBLDEPART;

                $$("ddlDepart").define("options", TblDept);
                $$("ddlDepart").refresh();
            }
        }
    });
}

function fnSaveAidsData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_AIDSSAVE";
    dataparam["PROGNAME"] = "GET_MST_AIDS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtAidsId"] = $.trim($$("txtAidsId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtAidsName"] = $.trim($$("txtAidsName").getValue());
    dataparam["ddlAidsGrId"] = $.trim($$("ddlAidsGrId").getValue());
    dataparam["ddlDepart"] = $.trim($$("ddlDepart").getValue());

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

    if ($.trim($$("txtAidsId").getValue()) == "") {
        AlertMessage("Aids Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtAidsName").getValue()) == "") {
        AlertMessage("Aids Name cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlDepart").getValue()) == "") {
        AlertMessage("Depart cannot be empty !");
        return false;
    }

    var Dataset = fnLoadAidsData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AIDS_ID) == $.trim($$("txtAidsId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

   
    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AIDS_NM) == $.trim($$("txtAidsName").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Aids Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.AIDS_ID) != $.trim($$("txtAidsId").getValue())) && ($.trim(Dataset.AIDS_NM) == $.trim($$("txtAidsName").getValue()));
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
        head: "Aids Search",
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
                            { header: "Aids id", id: "AIDS_ID", hidden: true, },
                            { header: ["Aids Name", { content: "textFilter" }, ], id: "AIDS_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.AIDS_ID) == $.trim(selectedRows[0].AIDS_ID);
                            });

                            fnLoadDefFunction();

                            if (Filter1.length > 0) {
                                $$("txtAidsId").setValue(Filter1[0].AIDS_ID);
                                $$("txtAidsName").setValue(Filter1[0].AIDS_NM);
                                $$("ddlAidsGrId").setValue($.trim(Filter1[0].AIDS_GR_ID));
                                $$("ddlDepart").setValue($.trim(Filter1[0].DEPART_ID));

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
    dataparam["REQTYPE"] = "GET_MST_AIDSOPEN";
    dataparam["PROGNAME"] = "GET_MST_AIDS";
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