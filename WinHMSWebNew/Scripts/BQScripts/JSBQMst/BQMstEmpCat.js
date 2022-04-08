
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstEmpCat = {

        id: "frmMstEmpCat",
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
                               view: "richselect",
                               id: "ddlCategory",
                               label: " Category",
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
                               id: "txtCatId",
                               label: "Emplyee Id",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 200,
                               width: 200,
                               attributes: { maxlength: 5 }
                           },
                           {
                               view: "button",
                               id: 'btnCatSrch',
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
                       id: "txtEmpNm",
                       label: "Employee Name",
                       labelAlign: "Left",
                       labelWidth: 100,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 40 }
                   },
                   {
                       id: "lblNote",
                       view: "label",
                       label:"Note: Non active Employee is not consider in the transactions like KOT, ...",
                       labelWidth: 95,
                       width: 400,
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

function fnLoadCate() {
    var fnCat = [{ "id": "S", "value": "Sales Executive" }];

    $$("ddlCategory").define("options", fnCat);
    $$("ddlCategory").refresh();

    $$("ddlCategory").setValue("S");
}

function fnDisable() {
    $$("ddlCategory").disable();
    $$("txtCatId").disable();
    $$("txtEmpNm").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("ddlCategory").enable();
    $$("txtCatId").enable();
    $$("txtEmpNm").enable();
    $$("ChkActive").enable();
}

function ClearData() {
    $$("ddlCategory").setValue("");
    $$("txtCatId").setValue("");
    $$("txtEmpNm").setValue("");
    $$("ChkActive").setValue("");
}

function fnSaveEmpcatData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_EMPCATSAVE";
    dataparam["PROGNAME"] = "GET_MST_CATEMP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["ddlCategory"] = $.trim($$("ddlCategory").getValue());
    dataparam["txtCatId"] = $.trim($$("txtCatId").getValue());
    dataparam["txtEmpNm"] = $.trim($$("txtEmpNm").getValue());
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

    if ($.trim($$("ddlCategory").getValue()) == "") {
        AlertMessage("Category cannot be empty !");
        return false;
    }

    if ($.trim($$("txtCatId").getValue()) == "") {
        AlertMessage("Employee Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtEmpNm").getValue()) == "") {
        AlertMessage("Employee Name cannot be empty !");
        return false;
    }

    if ($.trim($$("ChkActive").getValue()) == "") {
        AlertMessage("Select Active Status!");
        return false;
    }

    var Dataset = fnLoadOpenData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.EMP_CAT_ID) == $.trim($$("ddlCategory").getValue())) && ($.trim(Dataset.EMP_ID) == $.trim($$("txtCatId").getValue()));
        });

        if (Filter3.length > 0) {
            AlertMessage("This Record Already exisit !");
            return false;
        }
    }

    return true;
}

function fnCallInfPopup() {

    var Dataset1 = fnLoadOpenData();

    var Dataset = Dataset1.filter(function (Dataset1) {
        return $.trim(Dataset1.EMP_CAT_ID) == $.trim($$("ddlCategory").getValue());
    });


    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "Employee Search",
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
                            { header:  ["ID", { content: "textFilter" }, ], id: "EMP_ID", width: 70, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Employee Name ", { content: "textFilter" }, ], id: "EMP_NM", width: 200, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return (($.trim(Dataset.EMP_CAT_ID) == $.trim(selectedRows[0].EMP_CAT_ID)) && ($.trim(Dataset.EMP_ID) == $.trim(selectedRows[0].EMP_ID)));
                            });

                            if (Filter1.length > 0) {

                                $$("ddlCategory").setValue(Filter1[0].EMP_CAT_ID);
                                $$("txtCatId").setValue(Filter1[0].EMP_ID);
                                $$("txtEmpNm").setValue($.trim(Filter1[0].EMP_NM));

                                var ChkVal = (Filter1[0].ACTIVE_IND == null || ($.trim(Filter1[0].ACTIVE_IND) == "0") == true ? "0" : "1");
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
    dataparam["REQTYPE"] = "GET_MST_EMPCATOPEN";
    dataparam["PROGNAME"] = "GET_MST_CATEMP";
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