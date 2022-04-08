
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstVenGrp = {

        id: "frmMstVenGrp",
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
                               id: "txtGrpId",
                               label: "Group ID",
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
                       id: "txtGrpNm",
                       label: "Group Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                   },
                   {
                         view: "text",
                         id: "txtGrpShNm",
                         label: "Group Short Name",
                         labelAlign: "Left",
                         labelWidth: 120,
                         inputWidth: 250,
                         width: 250,
                   },
                   {
                        view: "text",
                        id: "txtDispSeq",
                        label: "Display Seq No",
                        labelAlign: "Left",
                        labelWidth: 120,
                        inputWidth: 200,
                        width: 200,
                   },
                   {
                       view: "richselect",
                       id: "ddlOutlet",
                       label: " Outlet",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 320,
                       width: 320,
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtGrpId").disable();
    $$("txtGrpNm").disable();
    $$("txtGrpShNm").disable();
    $$("txtDispSeq").disable();
    $$("ddlOutlet").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtGrpId").enable();
    $$("txtGrpNm").enable();
    $$("txtGrpShNm").enable();
    $$("txtDispSeq").enable();
    $$("ddlOutlet").enable();
    $$("ChkActive").enable();
}

function fnLoadDefFunction() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_OUTLETLOAD";
    dataparam["PROGNAME"] = "GET_MST_VENUEGRP";
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

                $$("ddlOutlet").define("options", rowData);
                $$("ddlOutlet").refresh();
            }
        }
    });
}

function fnSaveVenData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_VENGRPSAVE";
    dataparam["PROGNAME"] = "GET_MST_VENUEGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtGrpId"] = $.trim($$("txtGrpId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtGrpNm"] = $.trim($$("txtGrpNm").getValue());
    dataparam["txtGrpShNm"] = $.trim($$("txtGrpShNm").getValue());
    dataparam["txtDispSeq"] = $.trim($$("txtDispSeq").getValue());
    dataparam["ddlOutlet"] = $.trim($$("ddlOutlet").getValue());

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

    if ($$("txtGrpId").getValue() == "") {
        AlertMessage("Group Id cannot be empty !");
        return false;
    }

    if ($$("txtGrpNm").getValue() == "") {
        AlertMessage("Group Name cannot be empty !");
        return false;
    }

    if ($$("ddlOutlet").getValue() == "") {
        AlertMessage("Outlet cannot be empty !");
        return false;
    }

    var Dataset = fnLoadVenGrpData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.G_ID) == $.trim($$("txtGrpId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }


    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.G_NM) == $.trim($$("txtGrpNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Group Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.G_ID) != $.trim($$("txtGrpId").getValue())) && ($.trim(Dataset.G_NM) == $.trim($$("txtGrpNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Group Name Already  exisit !");
            return false;
        }
    }

    return true;
}

function fnCallGrpSrchPopup() {

    var Dataset = fnLoadVenGrpData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGrdsSrch",
        head: "Venue Group Search",
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
                            { header: "Group id", id: "G_ID", hidden: true, },
                            { header: ["Venue Group Name", { content: "textFilter" }, ], id: "G_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.G_ID) == $.trim(selectedRows[0].G_ID);
                            });

                            fnLoadDefFunction();

                            if (Filter1.length > 0) {

                                $$("txtGrpId").setValue(Filter1[0].G_ID);
                                $$("txtGrpNm").setValue(Filter1[0].G_NM);
                                $$("txtGrpShNm").setValue($.trim(Filter1[0].SHRT_NM));
                                $$("txtDispSeq").setValue($.trim(Filter1[0].S_N));
                                $$("ddlOutlet").setValue($.trim(Filter1[0].O_ID));
                                
                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
                            }

                            $$('PopupGrdsSrch').hide();
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
                                                     $$('PopupGrdsSrch').hide();
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

    $$("PopupGrdsSrch").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function fnLoadVenGrpData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_VENGRPOPEN";
    dataparam["PROGNAME"] = "GET_MST_VENUEGRP";
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