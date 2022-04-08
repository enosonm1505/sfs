
function fnLoadProperty() {
    var dataProp = fnPropertyLoad('1');

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: " ",
        labelwidth: 50,
        inputwidth: 250,
        width: 320,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnLoadCurrency() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNCURRNM";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnLoadGLTrnType() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNSTYPE";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["Stag"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        $("#hdnDefGlTrnTy").val(rowData[i].id);
                        break;
                    }
                }
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnLoadRcptType() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_RECEIPTTYPE";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnLoadClass() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNCLASS";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}


function fnDisplayAnal(Acid) {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLANALYSISDISP";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["Acid"] = Acid;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnLoadBillDet(AcId) {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLBILLDETAILS";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["AcId"] = AcId;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnGlControl() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnAttachAppl").val(rowData[0].AttachAppl);
                $("#hdnNarrationInd").val(rowData[0].NARRATION_IND);
                $("#hdnC_DIV_APPL").val(rowData[0].C_DIV_APPL);
                $("#hdnAcCdInd").val(rowData[0].AC_CD_IND);
                $("#hdnMULTI_CURRENCY_IND").val(rowData[0].MULTI_CURRENCY_IND);
                $("#hdnProjApplInd").val(rowData[0].PROJECT_APPL_IND);
                $("#hdnCOMMON_NARR_APPL").val(rowData[0].COMMON_NARR_APPL);
                $("#hdnDateAddInd").val(rowData[0].D_IND);
                
            }
        },
    });
}

function fnMstCompany() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                
                $("#hdnGSTAppl").val($.trim(rowData[0].GL_VAT_IND));
                $("#hdnInGstInd").val($.trim(rowData[0].IN_GST_IND));
                $("#hdnBaseCurrId").val($.trim(rowData[0].BASE_CURRENCY_ID));
                $("#hdnK_TAX").val($.trim(rowData[0].K_TAX));
                $("#hdnM_TAX").val($.trim(rowData[0].M_TAX));
                $("#hdnTAXCap").val($.trim(rowData[0].A5_ID));
            }
        },
    });
}

function fnLoadGLTrnTyInd() {

    var fnClasLoad = fnLoadClass();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNTYPE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["Option"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnDOC_APPL_IND").val($.trim(rowData[0].DOC_APPL_IND));

                $("#hdnRcptInd").val($.trim(rowData[0].B_IND));

                $("#hdnFirstDrCrInd").val($.trim(rowData[0].FIRST_LINE_DRCR_IND));

                $("#hdnApprAppl").val($.trim(rowData[0].A3_IND));
                

                if ($$("txtFrmDate") != undefined)
                    $$("txtFrmDate").setValue($("#hdnCurrentDt").val());

                if ($$("ddlTrnType") != undefined)
                    $$("lblHead").setValue($$("ddlTrnType").getText());

                //if ($.trim(rowData[0].E_IND) == "1")
                //    $$("btnRecur").show();
                //else
                //    $$("btnRecur").hide();

                if ($("#hdnRcptInd").val() == "1") {
                    $$("ddlRcptTy").show();
                    $$("txtBank").show();
                    $$("btnBanksrch").show();
                    $$("txtBranch").show();

                    var RcptType = fnLoadRcptType();

                    $$("ddlRcptTy").define("options", RcptType);
                    $$("ddlRcptTy").refresh();
                    $$("ddlRcptTy").setValue("NONE");
                }
                else {
                    $$("ddlRcptTy").hide();
                    $$("txtBank").hide();
                    $$("btnBanksrch").hide();
                    $$("txtBranch").hide();
                }

                if ($$("grdGLTransDet") != undefined) {

                    if($$("grdGLTransDet").config.columns[6]!= undefined ) $$("grdGLTransDet").config.columns[6].width = 150;

                    if ($("#hdnDOC_APPL_IND").val() == "1") {
                        if ($$("grdGLTransDet").config.columns[5] != undefined)  $$("grdGLTransDet").config.columns[5].width = 230;
                        if ($$("grdGLTransDet").config.columns[6] != undefined)  $$("grdGLTransDet").config.columns[6].header = "Document No";
                        if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Document Dt";
                    }
                    else if ($("#hdnDOC_APPL_IND").val() == "2") {
                        if ($$("grdGLTransDet").config.columns[5] != undefined) $$("grdGLTransDet").config.columns[5].width = 230;
                        if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Ref No";
                        if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Ref Date";
                    }
                    else if ($("#hdnDOC_APPL_IND").val() == "3") {
                        if ($$("grdGLTransDet").config.columns[5] != undefined) $$("grdGLTransDet").config.columns[5].width = 230;
                        if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Document No";
                        if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Document Dt";
                    }

                    if ($("#hdnDOC_APPL_IND").val() == "1" || $("#hdnDOC_APPL_IND").val() == "2" || $("#hdnDOC_APPL_IND").val() == "3") {
                        $$("grdGLTransDet").showColumn("DocNo");
                        $$("grdGLTransDet").showColumn("DocDt");
                    }
                    else {
                        if ($$("grdGLTransDet").config.columns[5] != undefined) $$("grdGLTransDet").config.columns[5].width = 230;
                        $$("grdGLTransDet").hideColumn("DocNo");
                        $$("grdGLTransDet").hideColumn("DocDt");
                    }
                }

                $("#hdnVOUCH_NO_IND").val($.trim(rowData[0].VOUCH_NO_IND));

                if ($.trim(rowData[0].VOUCH_NO_IND) == "2" || $.trim(rowData[0].VOUCH_NO_IND) == "3")
                    $$("txtVouchNo").enable();
                else
                    $$("txtVouchNo").disable();

                if ($("#hdnCurMode").val() == "N") {
                }

                if ($.trim(rowData[0].TRN_TY_CAT) == "2") {

                    if (fnClasLoad.TBLCLASSCNT.length == 0)
                        $("#hdnClssTyId").val("1");
                    else {

                        if (fnClasLoad.TBLCLASS.length != 0) {

                            $$("ddlClass").show();
                            $$("ddlClass").define("options", fnClasLoad.TBLCLASS);
                            $$("ddlClass").refresh();
                        }
                        else {
                            $$("ddlClass").hide();
                        }
                    }
                }
                else {
                    $("#hdnClssTyId").val("1");
                }

                $$("grdGLTransDet").clearAll();
                $$("grdGLTransDet").refresh();

                fnMainDetRowAdd('0');

                if ($("#hdnAcCdInd").val() == "1")
                    $$("grdGLTransDet").showColumn("ACCD");
                else
                    $$("grdGLTransDet").hideColumn("ACCD");

                if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                    $$("grdGLTransDet").showColumn("CurNm");
                else
                    $$("grdGLTransDet").hideColumn("CurNm");

                if ($("#hdnNarrationInd").val() == "1")
                    $$("grdGLTransDet").showColumn("Narr");
                else
                    $$("grdGLTransDet").hideColumn("Narr");

                $$("grdGLTransDet").refreshColumns();

                if ($("#hdnGSTAppl").val() == "1" && $("#hdnCurMode").val() == "N" && $("#hdnInGstInd").val() == "1") {

                    if ($("#hdnDefGlTrnTy").val() == "4" || $("#hdnDefGlTrnTy").val() == "5" || $("#hdnDefGlTrnTy").val() == "8" || $("#hdnDefGlTrnTy").val() == "7")
                        $$("btnGST").show();
                    else
                        $$("btnGST").hide();
                }


                if ($$("grdBillDet") != undefined) {
                    $$("grdBillDet").clearAll();
                    $$("grdBillDet").refresh();
                }

                //if ($("#hdnGSTAppl").val() == "1" || $("#hdnInGstInd").val() == "1" || $("#hdnK_TAX").val() == "4" || $("#hdnK_TAX").val() == "3" || $("#hdnK_TAX").val() == "2" || $("#hdnM_TAX").val() == "4") 
                //    $$("grdGLTransDet").showColumn("btnGST");
                //else
                //    $$("grdGLTransDet").hideColumn("btnGST");

            }
        },
    });
}

function fnGLTrnSave() {

    if (!fnGLSaveValidate())
        return false;

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNSACTIONSAVE";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
  //  dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["cMode"] = $("#hdnCurMode").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["TrnDt"] = $$("txtFrmDate").getText();
    dataparam["edbVouchNo"] = $$("txtVouchNo").getValue();

    dataparam["divId"] = ($.trim($$("ddldivision").getValue()) != "" ? $$("ddldivision").getValue() : "");
    dataparam["txtComNar"] = $$("txtNarra").getValue();
    dataparam["ddlRcptty"] = $$("ddlRcptTy").getValue();
    dataparam["EdbBnkTy"] = $("#hdnBankId").val();
    dataparam["edbBrnch"] = $$("txtBranch").getValue();

    dataparam["ddlGstAdjTy"] = "";//Not Designed
    dataparam["ddlAddDet"] = "";//Not Designed
    dataparam["Rev_ind"] = $("#hdnRevInd").val();
    dataparam["TrnId"] = "";
    dataparam["TrnNature"] = $("#hdnTrnNature").val();
    dataparam["Trn_Cat"] = $("#hdnTrnCat").val();

    var dsGlTrans = $$("grdGLTransDet").serialize();
    var GridDtSet = JSON.stringify(dsGlTrans);
    dataparam["TBLGLTRANS"] = GridDtSet;

    debugger;
    var dsGlTrans = $$("grdGLTrnData").serialize();
    var gridData = JSON.stringify(dsGlTrans);
    dataparam["TBLGLVADATA"] = gridData;

    var dsGlTrans = $$("grdGlAnalyData").serialize();
    var gridData = JSON.stringify(dsGlTrans);
    dataparam["TBLGLANADATA"] = gridData;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                debugger;
                rowData = JSON.parse(objRes);
                if ($.trim(rowData).includes("Saved")==true)
                {
                    SuccessMsg($.trim(rowData));
                    $("#btnRef").click();
                }
                else  if ($.trim(rowData) == "Error")
                {
                    AlertMessage($.trim(rowData));
                    $("#btnRef").click();
                }
                else
                {
                    AlertMessage($.trim(rowData));
                }
                //if ($.trim(rowData) == "True") {
                //    SuccessMsg('Saved Successfully');
                //    $("#btnRef").click();
                //}
                //else if ($.trim(rowData) == "VOUCHNOEXIST")
                //{
                //    AlertMessage('Voucher No already exists..!');
                    
                //}
                //else {
                //    AlertMessage($.trim(rowData));
                //    if ($.trim(rowData).includes("Date")==false &&  $.trim(rowData).includes("Fiscal")==false )$("#btnRef").click();
                //}
            }
        },
    });
}

function fnGLSaveValidate() {

    if ($$("ddlTrnType").getValue() == "") {
        AlertMessage("Transaction Type cannot be empty !");
        return false;
    }

    if ($$("txtFrmDate").getValue() == "") {
        AlertMessage("Transaction Date cannot be empty !");
        return false;
    }

    if ($("#hdnC_DIV_APPL").val() == "1") {
        if ($$("ddldivision").getValue() == "") {
            AlertMessage("Division cannot be empty !");
            return false;
        } 
    }

    if ($("#hdnVOUCH_NO_IND").val() == "2" || $("#hdnVOUCH_NO_IND").val() == "3") {
        if ($$("txtVouchNo").getValue() == "") {
            AlertMessage("Voucher No cannot be empty !");
            return false;
        }
    }

    if ($("#hdnCOMMON_NARR_APPL").val() == "1") {
        if ($$("txtNarra").getValue() == "") {
            AlertMessage("Common Narration cannot be empty !");
            return false;
        }
    }

    if (!fnMainGridValidate())
        return false;

    var grdTrnDet= $$("grdGLTransDet").serialize();

    if (grdTrnDet.length != 0) {

        var DrAmt = 0; var CrAmt = 0;

        for (i = 0; i < grdTrnDet.length; i++) {

            DrAmt = DrAmt + (grdTrnDet[i].Debit == "" ? 0 : parseFloat(grdTrnDet[i].Debit));

            CrAmt = CrAmt + (grdTrnDet[i].Credit == "" ? 0 : parseFloat(grdTrnDet[i].Credit));
        }

        var tot = parseFloat(CrAmt) - parseFloat(DrAmt);

        if (tot < 0)
            tot = parseFloat(tot) * -1;

        if (DrAmt != CrAmt) {
            AlertMessage("Debit/Credit value is not  equal.Credit Difference - " + tot + " /- Found");
            return;
        }
    }

    return true;
}

function fnMainGridValidate() {
    var data = $$("grdGLTransDet").serialize();

    if (data.length != 0) {

        for (i = 0; i < data.length; i++) {

            if (data[i].hdnAcId == "") {

                if (i == 0 && data[i].AcNM == "") {
                    AlertMessage("Account Name cannot be empty !");
                    return false;
                }
                else {
                    AlertMessage("Invalid Account !");
                    return false;
                }
            }

            var DrAmt = (data[i].Debit != "" ? parseFloat(data[i].Debit) : 0);
            var CrAmt = (data[i].Credit != "" ? parseFloat(data[i].Credit) : 0);

            if ($.trim(data[i].Drcr) == "DR") {
                if (DrAmt == 0) {
                    AlertMessage("Debit cannot be zero value !");
                    return false;
                }
            }

            if ($.trim(data[i].Drcr) == "CR") {
                if (CrAmt == 0) {
                    AlertMessage("Credit cannot be zero value !");
                    return false;
                }
            }
            debugger;
            if ($.trim(data[i].BILL_DETAIL_IND)=="1")
            {
              
               
                var grdTranData = $$("grdGLTrnData").serialize();
                var DtFilter = grdTranData.filter(function (grdTranData) {
                    return grdTranData.RowId == data[i].RowId;
                });
                var TotDebit = 0;
                var TotCredit = 0;
                if (DtFilter.length != 0) {
                    for (k = 0; k < DtFilter.length; k++) {
                        var Cr= (DtFilter[k].CrAmt == "" ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);
                        var Dr = (DtFilter[k].DrAmt == "" ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);
                        TotCredit = parseFloat(TotCredit) + parseFloat(Cr);
                        TotDebit = parseFloat(TotDebit) + parseFloat(Dr);
                        if(DtFilter[k].RefTyId=="")
                        {
                            AlertMessage("Pending Bills are not settled properly for " + $.trim(data[i].AcNM) + " Account");
                            return false;
                        }
                      
                    }
                    if ($.trim(data[i].Drcr) == "DR"  && TotDebit!=DrAmt) 
                    {
                        AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                        return false;
                    }
                    else if ($.trim(data[i].Drcr) == "CR"  && TotCredit!=CrAmt) 
                    {
                        AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                        return false;
                    }
                }
                else {
                    AlertMessage("Pending Bills are not settled properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }
            }
           

            if ($.trim(data[i].AnaAppl)=="1")
            {
                var vBAmt = "0";
                var grdGlAnalyData = $$("grdGlAnalyData").serialize();
                var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
                    return grdGlAnalyData.RowId == data[i].RowId;
                });
                if (DtFilter.length != 0) {
                    for (k = 0; k < DtFilter.length; k++) {

                       
                        if ($.trim(DtFilter[k].Amount) == "" || parseFloat(DtFilter[k].Amount)==0) {
                            AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                            return false;
                        }

                        var AnalID1 = (DtFilter[k].AnalID1 == "" ? "" : $.trim(DtFilter[k].AnalID1));
                        var AnalID2 = (DtFilter[k].AnalID2 == "" ? "" : $.trim(DtFilter[k].AnalID2));
                        var AnalID3 = (DtFilter[k].AnalID3 == "" ? "" : $.trim(DtFilter[k].AnalID3));
                        var AnalID4 = (DtFilter[k].AnalID4 == "" ? "" : $.trim(DtFilter[k].AnalID4));
                        var AnalID5 = (DtFilter[k].AnalID5 == "" ? "" : $.trim(DtFilter[k].AnalID5));
                        var AnalID6 = (DtFilter[k].AnalID6 == "" ? "" : $.trim(DtFilter[k].AnalID6));
                        var AnalID7 = (DtFilter[k].AnalID7 == "" ? "" : $.trim(DtFilter[k].AnalID7));
                        var AnalID8 = (DtFilter[k].AnalID8 == "" ? "" : $.trim(DtFilter[k].AnalID8));
                        var AnalID9 = (DtFilter[k].AnalID9 == "" ? "" : $.trim(DtFilter[k].AnalID9));
                        var AnalID10 = (DtFilter[k].AnalID10 == "" ? "" : $.trim(DtFilter[k].AnalID10));


                        if (AnalID1 == "" && AnalID2 == "" && AnalID3 == "" && AnalID14 == "" && AnalID5 == "" && AnalID6 == "" && AnalID7 == "" && AnalID8 == "" && AnalID9 == "" && AnalID10 == "" ) {
                            AlertMessage("Analysis code not defined");
                            return false;
                        }
                        if(AnalID1=="" && data[i].ChkAind=="1")
                        {
                            AlertMessage("Analysis  Code not defined for Level 1");
                            return false;
                        }
                        if (AnalID2 == "" && data[i].ChkBind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 2");
                            return false;
                        }
                        if (AnalID3 == "" && data[i].ChkCind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 3");
                            return false;
                        }
                        if (AnalID4 == "" && data[i].ChkDind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 4");
                            return false;
                        }
                        if (AnalID5 == "" && data[i].ChkEind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 5");
                            return false;
                        }
                        if (AnalID6 == "" && data[i].ChkFind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 6");
                            return false;
                        }
                        if (AnalID7 == "" && data[i].ChkLind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 7");
                            return false;
                        }
                        if (AnalID8 == "" && data[i].ChkMind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 8");
                            return false;
                        }
                        if (AnalID9 == "" && data[i].ChkNind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 9");
                            return false;
                        }
                        if (AnalID10== "" && data[i].ChkOind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 10");
                            return false;
                        }
                        vBAmt = parseFloat(vBAmt) + parseFloat(DtFilter[k].Amount);
                        

                    }
                }
                else {
                    AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }
                if ((vBAmt != CrAmt && CrAmt > 0) || (vBAmt != DrAmt && DrAmt > 0))
                {
                    AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }
               

            }
           


        }
    }
    return true;
}

function fnClearValue() {

    $("#hdnCurMode").val("N");
    $("#hdnDefGlTrnTy").val("");

    $$("ddlTrnType").setValue("");
    $$("txtFrmDate").setValue("");
    $$("txtVouchNo").setValue("");
    $$("ddlClass").setValue("");

    $$("ddldivision").setValue("");

    $$("txtNarra").setValue("");

    $$("ddlRcptTy").setValue("");

    $$("txtBank").setValue("");

    $$("txtBranch").setValue("");

    $$("txtBranch").setValue("");

    $$("grdGLTransDet").clearAll();
    $$("grdGLTransDet").refresh();

    $$("grdGLTrnData").clearAll();
    $$("grdGLTrnData").refresh();

    if ($$("grdBillDet") != undefined) {
        $$("grdBillDet").clearAll();
        $$("grdBillDet").refresh();
    }
    $$("grdGlAnalyData").clearAll();
    $$("grdGlAnalyData").refresh();

    if ($$("grdGlAnaly") != undefined) {
        $$("grdGlAnaly").clearAll();
        $$("grdGlAnaly").refresh();
    }
}

