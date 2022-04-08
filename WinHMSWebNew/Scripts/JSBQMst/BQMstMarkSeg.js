
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstMarkSeg = {

        id: "frmMstMarkSeg",
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
                               id: "txtMarkId",
                               label: "Market Segment Id",
                               labelAlign: "Left",
                               labelWidth: 150,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnMSSrch',
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
                                       fnCallSrchPopup();
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
                       id: "txtMarkNm",
                       label: "Market Segment Name",
                       labelAlign: "Left",
                       labelWidth: 150,
                       inputWidth: 400,
                       width: 400,
                   },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtMarkId").disable();
    $$("txtMarkNm").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtMarkId").enable();
    $$("txtMarkNm").enable();
    $$("ChkActive").enable();
}

function fnSaveMSData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_MARKSEGSAVE";
    dataparam["PROGNAME"] = "GET_MST_MARKSEGMENT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtMarkId"] = $.trim($$("txtMarkId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtMarkNm"] = $.trim($$("txtMarkNm").getValue());

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

    if ($$("txtMarkId").getValue() == "") {
        AlertMessage("Market Segment ID cannot be empty !");
        return false;
    }

    if ($$("txtMarkNm").getValue() == "") {
        AlertMessage("Market Segment Name cannot be empty !");
        return false;
    }
    var Dataset = fnLoadDeptData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.MARKET_ID) == $.trim($$("txtMarkId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.MARKET_NM) == $.trim($$("txtMarkNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Market Segment Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.MARKET_ID) != $.trim($$("txtMarkId").getValue())) && ($.trim(Dataset.MARKET_NM) == $.trim($$("txtMarkNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Market Segment Name Already  exisit !");
            return false;
        }
    }

    return true;
}

function fnCallSrchPopup() {

    var Dataset = fnLoadDeptData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGrdSrch",
        head: "Market Segment Search",
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
                    id: "grdSearch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "ID", id: "MARKET_ID", hidden: true, },
                            { header: ["Market Segment", { content: "textFilter" }, ], id: "MARKET_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.MARKET_ID) == $.trim(selectedRows[0].MARKET_ID);
                            });

                            if (Filter1.length > 0) {
                                $$("txtMarkId").setValue(Filter1[0].MARKET_ID);
                                $$("txtMarkNm").setValue(Filter1[0].MARKET_NM);
                                
                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
                            }

                            $$('PopupGrdSrch').hide();
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
                                                     $$('PopupGrdSrch').hide();
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

    $$("PopupGrdSrch").show();

    $$("grdSearch").clearAll();
    $$("grdSearch").parse(Dataset);
    $$("grdSearch").refresh();
}

function fnLoadDeptData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_MARKSEGOPEN";
    dataparam["PROGNAME"] = "GET_MST_MARKSEGMENT";
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