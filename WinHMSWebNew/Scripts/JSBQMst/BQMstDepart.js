
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstDepart = {

        id: "frmMstDepart",
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
                               id: "txtDeptId",
                               label: "Department Id",
                               labelAlign: "Left",
                               labelWidth: 150,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnDSrch',
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
                       id: "txtDepName",
                       label: "Department Name",
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
    $$("txtDeptId").disable();
    $$("txtDepName").disable();
    $$("ChkActive").disable();
}

function fnEnable() {
    $$("txtDeptId").enable();
    $$("txtDepName").enable();
    $$("ChkActive").enable();
}

function fnSaveDeptData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_DEPARTSAVE";
    dataparam["PROGNAME"] = "GET_MST_DEPART";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtDeptId"] = $.trim($$("txtDeptId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtDepName"] = $.trim($$("txtDepName").getValue());

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

    if ($$("txtDeptId").getValue() == "") {
        AlertMessage("Department Id cannot be empty !");
        return false;
    }

    if ($$("txtDepName").getValue() == "") {
        AlertMessage("Department Name cannot be empty !");
        return false;
    }
    var Dataset = fnLoadDeptData();

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.DEPART_ID) == $.trim($$("txtDeptId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.DEPART_NM) == $.trim($$("txtDepName").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Department Name Already  exisit !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.DEPART_ID) != $.trim($$("txtDeptId").getValue())) && ($.trim(Dataset.DEPART_NM) == $.trim($$("txtDepName").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Department Name Already  exisit !");
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
        head: "Department Search",
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
                            { header: "ID", id: "DEPART_ID", hidden: true, },
                            { header: ["Department Name", { content: "textFilter" }, ], id: "DEPART_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.DEPART_ID) == $.trim(selectedRows[0].DEPART_ID);
                            });

                            if (Filter1.length > 0) {
                                $$("txtDeptId").setValue(Filter1[0].DEPART_ID);
                                $$("txtDepName").setValue(Filter1[0].DEPART_NM);
                                
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
    dataparam["REQTYPE"] = "GET_MST_DEPARTOPEN";
    dataparam["PROGNAME"] = "GET_MST_DEPART";
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