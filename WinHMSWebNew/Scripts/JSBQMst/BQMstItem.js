
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    var MstSet = fnMstCompany();
    
    $scope.frmMstItem = {

        id: "frmMstItem",
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
                               id: "txtItemId",
                               label: "Item ID",
                               labelAlign: "right",
                               labelWidth: 135,
                               inputWidth: 210,
                               width: 210,
                               attributes: { maxlength: 2 }
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
                       id: "txtItemNM",
                       label: "Item Name",
                       labelAlign: "right",
                       labelWidth: 135,
                       inputWidth: 400,
                       width: 400,
                   },
                   {
                       view: "richselect",
                       id: "ddlGroup",
                       label: "Group",
                       labelAlign: "right",
                       labelWidth: 135,
                       inputWidth: 320,
                       width: 320,
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                    {
                        view: "text",
                        id: "txtRate",
                        label: "Rate",
                        labelAlign: "right",
                        labelWidth: 135,
                        inputWidth: 250,
                        width: 250,
                    },
                    {
                        view: "richselect",
                        id: "ddlTaxStruct",
                        label: "Tax Structure",
                        labelAlign: "right",
                        labelWidth: 135,
                        inputWidth: 550,
                        width: 550,
                        on: {
                            onChange: function (newval, oldval) {
                            }
                        }
                    },
                    {
                        view: "text",
                        id: "txtDisc",
                        label: "Max. Sales Discount %",
                        labelAlign: "right",
                        labelWidth: 135,
                        inputWidth: 250,
                        width: 250,
                    },
                    {
                         view: "richselect",
                         id: "ddlVenue",
                         label: "Venue",
                         labelAlign: "right",
                         labelWidth: 135,
                         inputWidth: 350,
                         width: 350,
                         on: {
                             onChange: function (newval, oldval) {
                             }
                         }
                    },
                    {
                        view: "richselect",
                        id: "ddlAnaGroup",
                        label: "Analysis Group",
                        labelAlign: "right",
                        labelWidth: 135,
                        inputWidth: 350,
                        width: 350,
                        on: {
                            onChange: function (newval, oldval) {
                            }
                        }
                    },
                    {
                        cols: [
                           {
                               view: "text",
                               id: "txtLInkRev",
                               label: "Link Revenue",
                               labelAlign: "right",
                               readonly:true,
                               labelWidth: 135,
                               inputWidth: 400,
                               width: 400,
                           },
                           {
                               view: "button",
                               id: 'btnLRSrch',
                               minWidth: 250,
                               labelWidth: 0,
                               width: 30,
                               height: 28,
                               type: 'icon',
                               icon: 'wxi-search',
                               css: "Ar_search",
                               on: {
                                   onItemClick: function () {
                                       fnCallRevenue();
                                   }
                               }
                           },
                        ]
                    },
                    {
                        view: "richselect",
                        id: "ddlVatType",
                        label: "VAT Type",
                        labelAlign: "right",
                        labelWidth: 135,
                        inputWidth: 350,
                        width: 350,
                        hidden:(MstSet[0].MUTAX=="1"?false:true),
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
    $$("ChkActive").disable();
    $$("txtItemNM").disable();
    $$("ddlGroup").disable();

    $$("txtItemId").disable();
    $$("txtRate").disable();
    $$("ddlTaxStruct").disable();
    $$("txtDisc").disable();
    $$("ddlVenue").disable();
    $$("ddlAnaGroup").disable();
    $$("txtLInkRev").disable();
    $$("ddlVatType").disable();
}

function fnEnable() {
    $$("ChkActive").enable();
    $$("txtItemNM").enable();
    $$("ddlGroup").enable();

    $$("txtItemId").enable();
    $$("txtRate").enable();
    $$("ddlTaxStruct").enable();
    $$("txtDisc").enable();
    $$("ddlVenue").enable();
    $$("ddlAnaGroup").enable();
    $$("txtLInkRev").enable();
    $$("ddlVatType").enable();
}

function fnLoadDropval() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_DROPVALUE";
    dataparam["PROGNAME"] = "GET_MST_ITEM";
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

                $$("ddlGroup").define("options", rowData.TBLGROUP);
                $$("ddlGroup").refresh();

                $$("ddlTaxStruct").define("options", rowData.TBLTAX);
                $$("ddlTaxStruct").refresh();

                $$("ddlVenue").define("options", rowData.TBLVENUE);
                $$("ddlVenue").refresh();

                $$("ddlAnaGroup").define("options", rowData.TBLLINKANA);
                $$("ddlAnaGroup").refresh();

                $$("ddlVatType").define("options", rowData.TBLVATTY);
                $$("ddlVatType").refresh();
            }
        }
    });
    return rowData;
}

function fnCallRevenue() {

    var Dataset = fnLoadDropval();
    debugger;

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupRevenue",
        head: "Revenue Search",
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
                            { header: ["Rev Id", { content: "textFilter" }, ], id: "REVENUE_ID", width: 80, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Revenue Name", { content: "textFilter" }, ], id: "REVENUE_NM", width: 280, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            $("#hdnLinkRevId").val(selectedRows[0].REVENUE_ID);
                            $$("txtLInkRev").setValue(selectedRows[0].REVENUE_NM);

                            $$('PopupRevenue').hide();
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
                                                     $$('PopupRevenue').hide();
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

    $$("PopupRevenue").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset.TBLREVENUE);
    $$("grdSrch").refresh();
}

function fnCallInfPopup() {

    var Dataset = fnLoadOpenData();
    var dtReven = fnLoadDropval();

    dtReven=dtReven.TBLREVENUE;

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "Item Search",
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
                            { header: ["Item Name", { content: "textFilter" }, ], id: "BN_ITEM_ID", width: 100, StringResult: true, css: { 'text-align': 'left ! important' } }, 
                            { header: ["Item Name", { content: "textFilter" }, ], id: "BN_ITEM_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.BN_ITEM_ID) == $.trim(selectedRows[0].BN_ITEM_ID);
                            });

                            if (Filter1.length > 0) {

                                fnLoadDropval();

                                $$("txtItemId").setValue(Filter1[0].BN_ITEM_ID);
                                $$("txtItemNM").setValue(Filter1[0].BN_ITEM_NM);
                                $$("ChkActive").setValue((Filter1[0].A_IND == null || Filter1[0].A_IND == "" ? "0" : parseInt(Filter1[0].A_IND)));

                                $$("ddlGroup").setValue($.trim(Filter1[0].BN_GR_ID));
                                $$("txtRate").setValue($.trim(Filter1[0].RATE));
                                $$("ddlTaxStruct").setValue($.trim(Filter1[0].TAX_STRUCT_ID));

                                $$("txtDisc").setValue($.trim(Filter1[0].SALE_DISC_PER));
                                $$("ddlVenue").setValue($.trim(Filter1[0].VENUE_ID));

                                $$("ddlAnaGroup").setValue($.trim(Filter1[0].G_ID));

                                $$("ddlVatType").setValue($.trim(Filter1[0].ITEM_VAT_TY_ID));

                                if (dtReven.length > 0) {
                                    var Filter1 = dtReven.filter(function (dtReven) {
                                        return $.trim(dtReven.REVENUE_ID) == $.trim(selectedRows[0].REV_ID);
                                    });

                                    if (Filter1.length > 0) {
                                        $$("txtLInkRev").setValue($.trim(Filter1[0].REVENUE_NM));
                                    }
                                }

                                $$('PopupOpenSrch').hide();
                            }
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
    dataparam["REQTYPE"] = "GET_MST_ITEMOPEN";
    dataparam["PROGNAME"] = "GET_MST_ITEM";
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

function fnSaveItemData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_ITEMSAVE";
    dataparam["PROGNAME"] = "GET_MST_ITEM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtItemId"] = $.trim($$("txtItemId").getValue());
    dataparam["txtItemNM"] = $.trim($$("txtItemNM").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());

    dataparam["ddlGroup"] = $.trim($$("ddlGroup").getValue());
    dataparam["txtRate"] = $.trim($$("txtRate").getValue());
    dataparam["ddlTaxStruct"] = $.trim($$("ddlTaxStruct").getValue());
    dataparam["txtDisc"] = $.trim($$("txtDisc").getValue());

    dataparam["ddlVenue"] = $.trim($$("ddlVenue").getValue());

    dataparam["ddlAnaGroup"] = $.trim($$("ddlAnaGroup").getValue());

    dataparam["txtLInkRev"] = $.trim($("#hdnLinkRevId").val());

    dataparam["ddlVatType"] = $.trim($$("ddlVatType").getValue());

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

    var Dataset = fnLoadOpenData();

    if ($$("txtItemId").getValue() == "") {
        AlertMessage("Item Id cannot be empty !");
        return false;
    }

    if ($$("txtGroupNM").getValue() == "") {
        AlertMessage("Item Name cannot be empty !");
        return false;
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.BN_ITEM_ID) == $.trim($$("txtItemId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.BN_ITEM_NM) == $.trim($$("txtItemNM").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Item Name is already exists !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.BN_ITEM_ID) != $.trim($$("txtItemId").getValue())) && ($.trim(Dataset.BN_ITEM_NM) == $.trim($$("txtItemNM").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Name is already exists");
            return false;
        }
    }

    if ($$("ddlGroup").getValue() == "") {
        AlertMessage("group cannot be empty !");
        return false;
    }

    if ($$("ddlVenue").getValue() == "") {
        AlertMessage("Venue cannot be empty !");
        return false;
    }

    if ($$("ddlAnaGroup").getValue() == "") {
        AlertMessage("Analysis Group cannot be empty !");
        return false;
    }

    var MstSet = fnMstCompany();

    if (MstSet[0].MUTAX == "1") {

        if ($$("ddlVatType").getValue() == "") {
            AlertMessage("VAT Type cannot be empty !");
            return false;
        }
    }
   
    return true;
}

