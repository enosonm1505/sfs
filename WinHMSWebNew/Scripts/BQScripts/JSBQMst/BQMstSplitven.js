
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstSplitVen = {

        id: "frmMstSplitVen",
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
                               id: "txtSplitVId",
                               label: "Split Venue ID",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 },
                               disabled:true,
                           },
                           {
                               view: "button",
                               id: 'btnVSrch',
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
                                       fnCallSpiltVenPopup();
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
                       id: "txtSplitVNm",
                       label: "Split Venue",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 30 },
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
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtSplitVId").disable();
    $$("txtSplitVNm").disable();
    $$("txtDispSeq").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtSplitVNm").enable();
    $$("txtDispSeq").enable();
    $$("ChkActive").enable();
}

function fnSaveVenData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_SPLITVENSAVE";
    dataparam["PROGNAME"] = "GET_MST_SPLITVEN";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtSplitVId"] = $.trim($$("txtSplitVId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtSplitVNm"] = $.trim($$("txtSplitVNm").getValue());
    dataparam["txtDispSeq"] = $.trim($$("txtDispSeq").getValue());

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


    if ($.trim($$("txtSplitVNm").getValue()) == "") {
        AlertMessage("Split Venue cannot be empty !");
        return false;
    }

    var Dataset = fnLoadVenData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.SV_ID) == $.trim($$("txtSplitVId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }


    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.SV_NM) == $.trim($$("txtSplitVNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Split Venue Already exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.SV_ID) != $.trim($$("txtSplitVId").getValue())) && ($.trim(Dataset.SV_NM) == $.trim($$("txtSplitVNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Split Venue Already exisit !");
            return false;
        }
    }

    return true;
}

function fnCallSpiltVenPopup() {

    var Dataset = fnLoadVenData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGrdsSrch",
        head: "Split Venue Search",
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
                            { header: "Split Id", id: "SV_ID", hidden: true, },
                            { header: ["Split Venue", { content: "textFilter" }, ], id: "SV_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.SV_ID) == $.trim(selectedRows[0].SV_ID);
                            });

                            if (Filter1.length > 0) {

                                $$("txtSplitVId").setValue(Filter1[0].SV_ID);
                                $$("txtSplitVNm").setValue(Filter1[0].SV_NM);
                                $$("txtDispSeq").setValue($.trim(Filter1[0].SEQ_NO));
                                
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

function fnLoadVenData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_SPLITVENOPEN";
    dataparam["PROGNAME"] = "GET_MST_SPLITVEN";
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