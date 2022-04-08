
var app = angular.module('ARTApp', ['webix']);

app.controller("ARMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmVouchTy = {

        id: "frmVouchTy",
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
                               id: "txtTrnTyId",
                               label: "Trn Type Id",
                               labelAlign: "Right",
                               labelWidth: 165,
                               inputWidth: 260,
                               width: 260,
                               attributes: { maxlength: 2 },
                               on: {
                                   onKeyPress: function (code, evt) {

                                       evt = (evt) ? evt : window.event;
                                       var charCode = (evt.which) ? evt.which : evt.keyCode;
                                       if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                           return false;
                                       }
                                       return true;
                                   }
                               }

                           },
                           {
                               view: "button",
                               id: 'btnTrnSrch',
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
                       id: "txtTrnTyNm",
                       label: "Trn Type Name",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 480,
                       width: 480,
                   },
                   {
                       view: "richselect",
                       id: "ddlVouchNoTy",
                       label: " Voucher No Type",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 390,
                       width: 390,
                       on: {
                           onChange: function (newval, oldval) {

                           }
                       }
                   },
                   {
                       view: "text",
                       id: "txtVouchNo",
                       label: "Voucher No",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 280,
                       width: 280,
                       attributes: { maxlength: 6 },
                       on: {
                           onKeyPress: function (code, evt) {

                               evt = (evt) ? evt : window.event;
                               var charCode = (evt.which) ? evt.which : evt.keyCode;
                               if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                   return false;
                               }
                               return true;
                           }
                       }
                   },
                   {
                       view: "datepicker",
                       id: "txtVouchDt",
                       stringResult: true,
                       label: "Vouch Dt",
                       format: "%d/%m/%Y",
                       //value: FromDt,
                       labelAlign: "Right",
                       labelWidth: 165,
                       width: 280,
                   },
                   {
                       view: "text",
                       id: "txtVouchPrf",
                       label: "Voucher Prefix",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 230,
                       width: 230,
                       attributes: { maxlength: 4 },
                   },
                   {
                       id: "ChkEditYes",
                       view: "checkbox",
                       label: "Edit Applicable, Yes",
                       labelAlign: "Right",
                       labelWidth: 165,
                       width: 200,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       id: "rbtnGrp",
                       view: "radio",
                       label: " ",
                       value: "D",
                       vertical: false,
                       labelAlign: "Right",
                       labelWidth: 165,
                       width: 500,
                       height: 40,
                       options: [
                           { "id": "D", "value": "Debit" },//,
                           { "id": "C", "value": "Credit" },
                       ],
                       on: {
                           onChange: function (newval, oldval) {

                           }
                       }
                   },
                   {
                       view: "richselect",
                       id: "ddlAdjType",
                       label: " ADJ Type",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 390,
                       width: 390,
                       on: {
                           onChange: function (newval, oldval) {

                           }
                       }
                   },
                   {
                       view: "richselect",
                       id: "ddlDefAcLink",
                       label: "Default Ac Link",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 390,
                       width: 390,
                       on: {
                           onChange: function (newval, oldval) {

                           }
                       }
                   },
                   {
                       id: "ChkRefYes",
                       view: "checkbox",
                       label: "Ref No / Dt Applicable, Yes",
                       labelAlign: "Right",
                       labelWidth: 165,
                       width: 200,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       view: "text",
                       id: "txtRefNm",
                       label: "Display Ref Name",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 300,
                       width: 300,
                   },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtTrnTyId").disable();
    $$("txtTrnTyNm").disable();
    $$("ddlVouchNoTy").disable();
    $$("txtVouchNo").disable();

    $$("txtVouchDt").disable();
    $$("txtVouchPrf").disable();
    $$("ChkEditYes").disable();

    $$("rbtnGrp").disable();
    $$("ddlAdjType").disable();
    $$("ddlDefAcLink").disable();

    $$("ChkRefYes").disable();
    $$("txtRefNm").disable();
}

function fnEnable() {
   
    $$("txtTrnTyId").enable();
    $$("txtTrnTyNm").enable();
    $$("ddlVouchNoTy").enable();
    $$("txtVouchNo").enable();

    $$("txtVouchDt").enable();
    $$("txtVouchPrf").enable();
    $$("ChkEditYes").enable();

    $$("rbtnGrp").enable();
    $$("ddlAdjType").enable();
    $$("ddlDefAcLink").enable();

    $$("ChkRefYes").enable();
    $$("txtRefNm").enable();
}

function fnSaveVchData() {

    if (!fnARValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_VOUCHTYSAVE";
    dataparam["PROGNAME"] = "GET_MST_VOUCHTYPE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtTrnTyId"] = $.trim($$("txtTrnTyId").getValue());
    dataparam["txtTrnTyNm"] = $.trim($$("txtTrnTyNm").getValue());
    dataparam["ddlVouchNoTy"] = $.trim($$("ddlVouchNoTy").getValue());
    dataparam["txtVouchNo"] = $.trim($$("txtVouchNo").getValue());

    dataparam["txtVouchDt"] = $.trim($$("txtVouchDt").getValue());
    dataparam["txtVouchPrf"] = $.trim($$("txtVouchPrf").getValue());
    dataparam["ChkEditYes"] = $.trim($$("ChkEditYes").getValue());
    dataparam["rbtnGrp"] = $.trim($$("rbtnGrp").getValue());

    dataparam["ddlAdjType"] = $.trim($$("ddlAdjType").getValue());
    dataparam["ddlDefAcLink"] = $.trim($$("ddlDefAcLink").getValue());
    dataparam["ChkRefYes"] = $.trim($$("ChkRefYes").getValue());
    dataparam["txtRefNm"] = $.trim($$("txtRefNm").getValue());

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/ARMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                var rowData = JSON.parse(objRes);

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

function fnARValidate() {

    var Dataset = fnLoadOpenData();

    if ($$("txtTrnTyId").getValue() == "") {
        AlertMessage("Trn Type Id cannot be empty !");
        return false;
    }

    if ($.trim($$("txtTrnTyNm").getValue()) == "") {
        AlertMessage("Trn Type Name cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlVouchNoTy").getValue())  == "") {
        AlertMessage("Voucher No Type cannot be empty !");
        return false;
    }

    if ($.trim($$("txtVouchNo").getValue()) == "") {
        AlertMessage("Voucher No cannot be empty !");
        return false;
    }

    if ($.trim($$("txtVouchDt").getValue()) == "") {
        AlertMessage("Voucher Date cannot be empty !");
        return false;
    }

    if ($.trim($$("rbtnGrp").getValue()) == "") {
        AlertMessage("Select Debit/Credit");
        return false;
    }
    
    if ($.trim($$("ddlAdjType").getValue())== "") {
        AlertMessage("ADJ Type cannot be empty !");
        return false;
    }

    if ($.trim($$("txtRefNm").getValue()) == "" && $.trim($$("ChkRefYes").getValue()) =="0") {
        AlertMessage("Ref Name Cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlDefAcLink").getValue())  == "") {
        AlertMessage("Default Ac Link Cannot be empty !");
        return false;
    }
    
    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.TRN_TY_ID) == $.trim($$("txtTrnTyId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Trn Type ID Already exisit !");
            return false;
        }

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.TRN_TY_NM) == $.trim($$("txtTrnTyNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Trn Type Name is already exists !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.TRN_TY_ID) != $.trim($$("txtTrnTyId").getValue())) && ($.trim(Dataset.TRN_TY_NM) == $.trim($$("txtTrnTyNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Trn Type Name is already exists");
            return false;
        }
    }

    return true;
}

function fnCallInfPopup() {

    var Dataset = fnLoadOpenData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "Voucher Type Search",
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
                            { header: ["Voucher Type Id", { content: "textFilter" }, ], id: "TRN_TY_ID", width: 80, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Voucher Type Name", { content: "textFilter" }, ], id: "TRN_TY_NM", width: 280, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.TRN_TY_ID) == $.trim(selectedRows[0].TRN_TY_ID);
                            });

                            if (Filter1.length > 0) {

                                fnLoadDefFunc();

                                $$("txtTrnTyId").setValue(Filter1[0].TRN_TY_ID);

                                $$("txtTrnTyNm").setValue(Filter1[0].TRN_TY_NM);

                                $$("ddlVouchNoTy").setValue(Filter1[0].VOUCH_NO_IND);

                                $$("txtVouchNo").setValue($.trim(Filter1[0].LAST_VOUCH_NO));

                                $$("txtVouchDt").setValue($.trim(Filter1[0].LAST_VOUCH_DT1));

                                $$("txtVouchPrf").setValue($.trim(Filter1[0].PREFIX_NO));

                                $$("ChkEditYes").setValue(($.trim(Filter1[0].EDIT_IND) == "1" ? "1" : "0"));

                                $$("ChkRefYes").setValue(($.trim(Filter1[0].REF_IND) == "1" ? "1" : "0"));

                                $$("txtRefNm").setValue($.trim(Filter1[0].REF_NM));

                                $$("ddlAdjType").setValue($.trim(Filter1[0].DEF_ADJ_TYPE));

                                $$("ddlDefAcLink").setValue($.trim(Filter1[0].DEF_ALT_AC_CD));

                                $$("rbtnGrp").setValue(($.trim(Filter1[0].DRCR_IND) == "2" ? "C" : "D"));
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
    dataparam["REQTYPE"] = "GET_MST_VOUCHTYOPEN";
    dataparam["PROGNAME"] = "GET_MST_VOUCHTYPE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
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

function fnLoadARGLAccount() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MSTARGLACCOUNT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
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

function fnLoadDefFunc() {

    var VchNoTy = [{ "id": "1", "value": "AutoGeneration" }, { "id": "2", "value": "Accept VoucherNo(Unique)" }];

    var AdjSet = [{ "id": "1", "value": "New Ref" }, { "id": "2", "value": "Advance Ref" }, { "id": "3", "value": "Against Ref" }];

    var GlAcc = fnLoadARGLAccount();

    $$("ddlVouchNoTy").define("options", VchNoTy);
    $$("ddlVouchNoTy").refresh();

    $$("ddlAdjType").define("options", AdjSet);
    $$("ddlAdjType").refresh();

    $$("ddlDefAcLink").define("options", GlAcc);
    $$("ddlDefAcLink").refresh();
}