
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstNcKotTy = {

        id: "frmMstNcKotTy",
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
                               id: "txtTypeId",
                               label: "Type ID",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 },
                           },
                           {
                               view: "button",
                               id: 'btnTypeSrch',
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
                                       fnCallNcSrchPopup();
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
                       id: "txttypeNM",
                       label: "Type Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 25 },
                   },
                   {
                       view: "text",
                       id: "txtShrtNm",
                       label: "Short Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 5 },
                   },
                   {
                       view: "text",
                       id: "txtDispSeq",
                       label: "Seq No",
                       labelAlign: "Left",
                       labelWidth: 100,
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
    $$("txtTypeId").disable();
    $$("txttypeNM").disable();
    $$("txtShrtNm").disable();
    $$("txtDispSeq").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtTypeId").enable();
    $$("txttypeNM").enable();
    $$("txtShrtNm").enable();
    $$("txtDispSeq").enable();
    $$("ChkActive").enable();
}

function fnSaveNCKOtData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_NCKOTTYSAVE";
    dataparam["PROGNAME"] = "GET_MST_NCKOTTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtTypeId"] = $.trim($$("txtTypeId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txttypeNM"] = $.trim($$("txttypeNM").getValue());
    dataparam["txtShrtNm"] = $.trim($$("txtShrtNm").getValue());
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


    if ($.trim($$("txtTypeId").getValue()) == "") {
        AlertMessage("Type Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txttypeNM").getValue()) == "") {
        AlertMessage("Type Name cannot be empty !");
        return false;
    }

    if ($.trim($$("txtShrtNm").getValue()) == "") {
        AlertMessage("Short Name cannot be empty !");
        return false;
    }

    if ($.trim($$("txtDispSeq").getValue()) == "") {
        AlertMessage("Seq No cannot be empty !");
        return false;
    }


    var Dataset = fnLoadNCKotData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.N_TY) == $.trim($$("txtTypeId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    return true;
}

function fnCallNcSrchPopup() {

    var Dataset = fnLoadNCKotData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGrdsSrch",
        head: "NC Kot Type Search",
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
                            { header: "Id", id: "N_TY", hidden: true, },
                            { header: ["NC Kot Type", { content: "textFilter" }, ], id: "N_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.N_TY) == $.trim(selectedRows[0].N_TY);
                            });

                            if (Filter1.length > 0) {

                                $$("txtTypeId").setValue(Filter1[0].N_TY);
                                $$("txttypeNM").setValue(Filter1[0].N_NM);
                                $$("txtShrtNm").setValue(Filter1[0].S_NM);
                                $$("txtDispSeq").setValue($.trim(Filter1[0].A_IND));

                                var ChkVal = (Filter1[0].A1_IND == null || ($.trim(Filter1[0].A1_IND) == "0") == true ? "1" : "0");
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

function fnLoadNCKotData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_NCKOTTYOPEN";
    dataparam["PROGNAME"] = "GET_MST_NCKOTTY";
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