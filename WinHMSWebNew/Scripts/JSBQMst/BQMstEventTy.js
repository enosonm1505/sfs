
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstEventTy = {

        id: "frmMstEventTy",
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
                               id: 'btnTySrch',
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
                                       fnCallEveSrchPopup();
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
                   },
                   {
                       view:"colorpicker", 
                       value:"#00DDDC",
                       id: "ClrColor",
                       label: "Seq No",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 200,
                       width: 200,
                   },
                ]
            }
        ]
    }
});

function ClearData() {
    $$("txtTypeId").setValue("");
    $$("txttypeNM").setValue("");
    $$("ChkActive").setValue("");
}

function fnDisable() {
    $$("txtTypeId").disable();
    $$("txttypeNM").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtTypeId").enable();
    $$("txttypeNM").enable();
    $$("ChkActive").enable();
}

function fnSaveEveTyData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_EVETYPESAVE";
    dataparam["PROGNAME"] = "GET_MST_EVENTTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtTypeId"] = $.trim($$("txtTypeId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txttypeNM"] = $.trim($$("txttypeNM").getValue());
    dataparam["ClrColor"] = $.trim($$("ClrColor").getValue());

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

    if ($$("txtTypeId").getValue() == "") {
        AlertMessage("Type Id cannot be empty !");
        return false;
    }

    if ($$("txttypeNM").getValue() == "") {
        AlertMessage("Type Name cannot be empty !");
        return false;
    }

    var Dataset = fnLoadEveTyData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.E_TY) == $.trim($$("txtTypeId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    return true;
}

function fnCallEveSrchPopup() {

    var Dataset = fnLoadEveTyData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGrdsSrch",
        head: "Event Type Search",
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
                            { header: "Id", id: "E_TY", hidden: true, },
                            { header: ["Event Type", { content: "textFilter" }, ], id: "E_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.E_TY) == $.trim(selectedRows[0].E_TY);
                            });

                            if (Filter1.length > 0) {

                                $$("txtTypeId").setValue(Filter1[0].E_TY);
                                $$("txttypeNM").setValue(Filter1[0].E_NM);
                                
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

function fnLoadEveTyData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_EVETYPEOPEN";
    dataparam["PROGNAME"] = "GET_MST_EVENTTY";
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