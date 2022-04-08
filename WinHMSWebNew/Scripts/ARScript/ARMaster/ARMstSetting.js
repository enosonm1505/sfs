var app = angular.module('ARTApp', ['webix']);

app.controller("ARMasterController", function ($scope) {

    $scope.frmArSetting = {
        id: "frmArSetting",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        paddingX:20,
        elements: [
            {
                rows: [
                   {
                       id:"ARTabView",
                       view: "tabview",
                       type: "space",
                       cells: [
                         {
                             header: "<span class='fa fa-home'></span> General",
                             width:130,
                             body: {
                                 id: "General",
                                 view: "form",
                                 select: true,
                                 height: 450,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 view: "datepicker",
                                                 id: "txtPostDt",
                                                 stringResult: true,
                                                 label: "NA FO to be Posted For",
                                                 format: "%d/%m/%Y",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 400,
                                                 width: 500,
                                             },
                                             {
                                                 view: "datepicker",
                                                 id: "txtArEditDt",
                                                 stringResult: true,
                                                 label: "AR Trn Edit Allowed From Dt",
                                                 format: "%d/%m/%Y",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 400,
                                                 width: 500,
                                             },
                                             {
                                                  id: "chkMultiCur",
                                                  view: "checkbox",
                                                  label: "Multi currency Applicable, Yes",
                                                  labelAlign: "Right",
                                                  labelWidth: 280,
                                                  inputWidth: 400,
                                                  width: 500,
                                                  on: {
                                                      "onChange": function () {
                                                      }
                                                  }
                                             },
                                             {
                                                 view: "richselect",
                                                 id: "ddlTrnType",
                                                 label: "  Transaction Type for Company Bills From FO",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                             {
                                                 view: "richselect",
                                                 id: "ddlTrnTyAdv",
                                                 label: "  Transaction Type for Advances From FO",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                             {
                                                 view: "richselect",
                                                 id: "ddlTrnTyRef",
                                                 label: "  Transaction Type for Advance Refund From FO",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                             {
                                                 id: "chkGlModule",
                                                 view: "checkbox",
                                                 label: "GL Module to be Validated for  Gl Account, Yes",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     "onChange": function () {
                                                     }
                                                 }
                                             },
                                             {
                                                 view: "richselect",
                                                 id: "ddlRecTrnTy",
                                                 label: "Receipt Transaction Type",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtPrintPrg",
                                                 stringResult: true,
                                                 label: "Receipt Print Prog",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtSOA",
                                                 stringResult: true,
                                                 label: "Statement Of Accounts Print Program",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtCPrintProg",
                                                 stringResult: true,
                                                 label: "Covering Letter Print Program",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtRecLineCap",
                                                 stringResult: true,
                                                 label: "Receipt Last Line Caption",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 1050,
                                                 width: 1050,
                                             },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class='fa fa-street-view'></span> Commission",
                             width: 130,
                             body: {
                                 id: "CommFrm",
                                 view: "form",
                                 height: 450,
                                 elements: [
                                     {
                                         rows: [
                                            {
                                                id: "chkComPost",
                                                view: "checkbox",
                                                label: "Commission Posting Applicable ",
                                                labelAlign: "Right",
                                                labelWidth: 280,
                                                inputWidth: 400,
                                                width: 500,
                                                on: {
                                                    "onChange": function () {
                                                    }
                                                }
                                            },
                                             {
                                                 view: "richselect",
                                                 id: "ddlRoundOff",
                                                 label: "Round Off",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                             {
                                                 view: "richselect",
                                                 id: "ddlTransTy",
                                                 label: "Transaction Type ",
                                                 labelAlign: "Right",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                     }
                                                 }
                                             },
                                         ]
                                     }
                                 ]
                             }
                         },
                       ],
                       tabbar: {
                           on: {
                               onAfterTabClick: function () {
                               }
                           }
                       }
                   },
                ]
            }
        ]
    };
});

function fnLoadDropvalues()
{
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_DROPVALUE";
    dataparam["PROGNAME"] = "GET_MST_ARSETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                $$("ddlTrnType").define("options", rowData.TBLARTRN);
                $$("ddlTrnType").refresh();

                $$("ddlTrnTyAdv").define("options", rowData.TBLARTRN);
                $$("ddlTrnTyAdv").refresh();

                $$("ddlTrnTyRef").define("options", rowData.TBLARTRN);
                $$("ddlTrnTyRef").refresh();

                $$("ddlRecTrnTy").define("options", rowData.TBLARTRN);
                $$("ddlRecTrnTy").refresh();

                $$("ddlTransTy").define("options", rowData.TBLARTRN);
                $$("ddlTransTy").refresh();

                $$("ddlRoundOff").define("options", rowData.TBLMSTROUND);
                $$("ddlRoundOff").refresh();

            }
        }
    });

   
}

function fnDisable() {
    
    $$("txtPostDt").disable();
    $$("txtArEditDt").disable();
    $$("chkMultiCur").disable();
    $$("ddlTrnType").disable();

    $$("ddlTrnTyAdv").disable();
    $$("ddlTrnTyRef").disable();
    $$("chkGlModule").disable();

    $$("ddlRecTrnTy").disable();
    $$("txtPrintPrg").disable();
    $$("txtSOA").disable();

    $$("txtCPrintProg").disable();
    $$("ddlTransTy").disable();

    $$("chkComPost").disable();

    $$("ddlRoundOff").disable();
    $$("txtRecLineCap").disable();
}

function fnEnable() {

    $$("txtPostDt").enable();
    $$("txtArEditDt").enable();
    $$("chkMultiCur").enable();
    $$("ddlTrnType").enable();

    $$("ddlTrnTyAdv").enable();
    $$("ddlTrnTyRef").enable();
    $$("chkGlModule").enable();

    $$("ddlRecTrnTy").enable();
    $$("txtPrintPrg").enable();
    $$("txtSOA").enable();

    $$("txtCPrintProg").enable();
    $$("ddlTransTy").enable();

    $$("chkComPost").enable();

    $$("ddlRoundOff").enable();
    $$("txtRecLineCap").enable();
}

function ClearData() {

    $$("txtPostDt").setValue("");
    $$("txtArEditDt").setValue("");
    $$("chkMultiCur").setValue("0");
    $$("ddlTrnType").setValue("");

    $$("ddlTrnTyAdv").setValue("");
    $$("ddlTrnTyRef").setValue("");
    $$("chkGlModule").setValue("0");

    $$("ddlRecTrnTy").setValue("");
    $$("txtPrintPrg").setValue("");
    $$("txtSOA").setValue("");

    $$("txtCPrintProg").setValue("");
    $$("ddlTransTy").setValue("");

    $$("chkComPost").enable("0");

    $$("ddlRoundOff").setValue("");
    $$("txtRecLineCap").setValue("");
}

function fnSaveARData() {

    //if (!fnARValidate()) {
    //    $("#LoadDIv").hide();
    //    return false;
    //}

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_ARSETTINGSAVE";
    dataparam["PROGNAME"] = "GET_MST_ARSETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();

    dataparam["txtPostDt"] = $.trim($$("txtPostDt").getValue());
    dataparam["txtArEditDt"] = $.trim($$("txtArEditDt").getValue());
    dataparam["chkMultiCur"] = $.trim($$("chkMultiCur").getValue());

    dataparam["ddlTrnType"] = $.trim($$("ddlTrnType").getValue());
    dataparam["ddlTrnTyAdv"] = $.trim($$("ddlTrnTyAdv").getValue());
    dataparam["ddlTrnTyRef"] = $.trim($$("ddlTrnTyRef").getValue());

    dataparam["chkGlModule"] = $.trim($$("chkGlModule").getValue());
    dataparam["ddlRecTrnTy"] = $.trim($$("ddlRecTrnTy").getValue());

    dataparam["txtPrintPrg"] = $.trim($$("txtPrintPrg").getValue());
    dataparam["txtSOA"] = $.trim($$("txtSOA").getValue());
    dataparam["txtCPrintProg"] = $.trim($$("txtCPrintProg").getValue());
    dataparam["txtRecLineCap"] = $.trim($$("txtRecLineCap").getValue());

    dataparam["chkComPost"] = $.trim($$("chkComPost").getValue());
    dataparam["ddlRoundOff"] = $.trim($$("ddlRoundOff").getValue());
    dataparam["ddlTransTy"] = $.trim($$("ddlTransTy").getValue());

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
                    AlertMessage("Updated Successfully");
                    $("#btnRef").click();
                }
                else {
                    AlertMessage("Save Failed");
                }

                $("#LoadDIv").hide();
                return;
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

    if ($.trim($$("ddlVouchNoTy").getValue()) == "") {
        AlertMessage("Voucher No Type cannot be empty !");
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

    if ($.trim($$("txtVouchNo").getValue()) == "") {
        AlertMessage("Voucher No cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlAdjType").getValue()) == "") {
        AlertMessage("ADJ Type cannot be empty !");
        return false;
    }

    if ($.trim($$("txtRefNm").getValue()) == "" && $.trim($$("ChkRefYes").getValue()) == "0") {
        AlertMessage("Ref Name Cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlDefAcLink").getValue()) == "") {
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

function fnLoadARSettingLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MSTARCONTROL";
    dataparam["PROGNAME"] = "GET_MST_ARSETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                fnLoadDropvalues();

                $$("txtPostDt").setValue(rowData[0].LAST_NA_POST_DT1);
                $$("txtArEditDt").setValue(rowData[0].LAST_ALLOW_EDIT_DT1);

                $$("chkMultiCur").setValue($.trim(rowData[0].MULTI_CUR_IND) == "1" ? "1" : "0");
                $$("ddlTrnType").setValue($.trim(rowData[0].DEF_NA_TRN_TY_ID));

                $$("ddlTrnTyAdv").setValue($.trim(rowData[0].J_ID));
                $$("ddlTrnTyRef").setValue($.trim(rowData[0].K_ID));
                $$("chkGlModule").setValue($.trim(rowData[0].LINK_AC_ID_IND) == "1" ? "1" : "0");

                $$("ddlRecTrnTy").setValue(rowData[0].RCPT_TRN_TY_ID);
                $$("txtPrintPrg").setValue(rowData[0].RCPT_PRG_NM);
                $$("txtSOA").setValue(rowData[0].SOA_PRINT_NM);

                $$("txtCPrintProg").setValue(rowData[0].N_NM);
                $$("txtRecLineCap").setValue(rowData[0].RCPT_LINE);
                
                $$("ddlRoundOff").setValue(rowData[0].R_ND);
                $$("ddlTransTy").setValue(rowData[0].TRN_TY_ID);

            }
        }
    });
}

