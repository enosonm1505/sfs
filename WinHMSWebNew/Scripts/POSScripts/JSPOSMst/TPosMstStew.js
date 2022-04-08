var app = angular.module('POSTApp', ['webix']);

app.controller("PosMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstSteward = {

        id: "frmMstSteward",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        height: 950,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtStewId",
                               label: "Steward ID",
                               labelAlign: "left",
                               labelWidth: 135,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 6 },
                              // pattern: { mask: "######", allow: /[0-9]/g },
                           },
                           {
                               view: "button",
                               id: 'btnISrch',
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
                       id: "txtStewNM",
                       label: "Steward Name",
                       labelAlign: "left",
                       labelWidth: 135,
                       inputWidth: 400,
                       width: 400,
                       attributes: { maxlength: 40 }
                   },
                   {
                       view: "richselect",
                       id: "ddlType",
                       label: "Type",
                       labelAlign: "left",
                       labelWidth: 135,
                       inputWidth: 320,
                       width: 320,
                       options: fnLoadSort(),
                       value: "0"
                       
                   },
                    {
                        view: "text",
                        id: "txtMobile",
                        label: "Mobile",
                        labelAlign: "left",
                        labelWidth: 135,
                        inputWidth: 300,
                        width: 250,
                        attributes: { maxlength: 15 },
                        pattern: { mask: "###############", allow: /[0-9]/g }
                    },
                    {
                        id: "ChkRestServ",
                        view: "checkbox",
                        label: "Restrict Other Server Tables View",
                        labelAlign: "left",
                        labelWidth: 215,
                        width: 250,
                        on: {
                            "onChange": function () {

                            }
                        }
                    },
                ]
            }
         ]
    }
});

function fnLoadSort() {
    var Rows = [];
    var set = {};
    Rows.push({ id: "0", value: "Server" });
    Rows.push({ id: "1", value: "Cashier" });
    Rows.push({ id: "2", value: "Captain" });
    Rows.push({ id: "3", value: "Therapist" });
    return Rows;
}

function fnDisable() {
    $$("txtStewId").disable();
    $$("ChkActive").disable();
    $$("txtStewNM").disable();

    $$("ddlType").disable();
    $$("txtMobile").disable();
    $$("ChkRestServ").disable();
  
}

function fnEnable() {
    $$("txtStewId").enable();
    $$("ChkActive").enable();
    $$("txtStewNM").enable();

    $$("ddlType").enable();
    $$("txtMobile").enable();
    $$("ChkRestServ").enable();
}

function fnCallInfPopup() {

    var Dataset = fnLoadOpenData();
    
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "Steward Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
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
                            { header: ["Steward Id", { content: "textFilter" }, ], id: "EMP_ID", width: 100, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Steward Name", { content: "textFilter" }, ], id: "EMP_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.EMP_ID) == $.trim(selectedRows[0].EMP_ID);
                            });

                            if (Filter1.length > 0) {

                                fnLoadSort();
                                fnEnable();

                                $$("txtStewId").setValue(Filter1[0].EMP_ID);
                                $$("txtStewNM").setValue(Filter1[0].EMP_NM);
                                $$("ChkActive").setValue($.trim(Filter1[0].ACTIVE_IND) != null ? Filter1[0].ACTIVE_IND : "0");
                                $$("ddlType").setValue($.trim(Filter1[0].B_IND));
                                $$("txtMobile").setValue($.trim(Filter1[0].MOB_ID));
                                $$("ChkRestServ").setValue($.trim(Filter1[0].A_IND) != null ? Filter1[0].A_IND : "0");

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
                             paddingX: 300,
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
    dataparam["REQTYPE"] = "GET_MST_STEWOPEN";
    dataparam["PROGNAME"] = "GET_MST_STEWARD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosMaster/COMAPI_CALL",
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

function fnRemoveClass(Mode) {
    $("#btnNew").removeClass("ClickBtn");
    $("#btnOpen").removeClass("ClickBtn");
    $("#btnView").removeClass("ClickBtn");
    $("#btnSave").removeClass("ClickBtn");
    $("#btnRef").removeClass("ClickBtn");

    if ($.trim(Mode) == "N") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    } else if ($.trim(Mode) == "O") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "V") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', true);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "") {
        $('#btnNew').prop('disabled', false);
        $('#btnView').prop('disabled', false);
        $('#btnOpen').prop('disabled', false);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', true);
    }
}


function fnStewValidate() {

    var Dataset = fnLoadOpenData();


    if ($.trim($$("txtStewId").getValue()) == "") {
        AlertMessage("Steward Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtStewNM").getValue()) == "") {
        AlertMessage("Steward Name cannot be empty !");
        return false;
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.EMP_ID) == $.trim($$("txtStewId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.EMP_NM) == $.trim($$("txtStewNM").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Steward Name is already exists !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.EMP_ID) != $.trim($$("txtStewId").getValue())) && ($.trim(Dataset.BN_ITEM_NM) == $.trim($$("txtStewNM").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Name is already exists");
            return false;
        }
    }


    if ($.trim($$("ddlType").getValue()) == "") {
        AlertMessage("Type cannot be empty !");
        return false;
    }

    //if ($.trim($$("txtMobile").getValue()) == "") {
    //    AlertMessage("Mobile cannot be empty !");
    //    return false;
    //}

    return true;
}



function fnSaveStewardData() {

    if (!fnStewValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_STEWSAVE";
    dataparam["PROGNAME"] = "GET_MST_STEWARD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["curmode"] = $("#hdnCurMode").val();
  
    dataparam["txtStewId"] = $.trim($$("txtStewId").getValue());
    dataparam["txtStewNM"] = $.trim($$("txtStewNM").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());

    dataparam["ddlType"] = $.trim($$("ddlType").getValue());
    dataparam["txtMobile"] = $.trim($$("txtMobile").getValue());
    dataparam["ChkRestServ"] = $.trim($$("ChkRestServ").getValue());
   
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/PosMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True")
                {
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

function fnLoadPropertyChange() {
   
}







