
function fnLoadProperty() {
    var dataProp = fnPropertyLoad('1');

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "",
       // labelwidth: 50,
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
function fnLoadTransactionTrn()
{
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLOPENTRN";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["NEWCOMPID"] = $("#hdnGLNewCmpId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TRNID"] = $("#hdnGLTrnId").val();
    if ($("#hdnGLTranPageMenu").val() == "GLMNUTRNPDC")
    {
        dataparam["PdcTrnTyId"] = $("#hdnPdcTrnTyId").val();
        dataparam["PdcParentTrnTy"] = $("#hdnPDCParentTrnTy").val();
        dataparam["PageMenu"] = $("#hdnGLTranPageMenu").val();
        dataparam["PdcFYear"] = $("#hdnPdcFYear").val();
    }
    if ($("#hdnGLTranPage").val() == "3") dataparam["RevGl"] = "1";
    var DataVal = JSON.stringify(dataparam);
    
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                debugger;
                rowData = JSON.parse(d);
                if ($.trim(rowData).includes("PDCMSG") == true)
                {
                    var Msg = rowData.split("_");
                    AlertMessage($.trim(Msg[1]));

                }
                else {
                    $$("ddlTrnType").setValue($.trim(rowData.TBLMAIN[0].TRN_TY_ID));
                    $$("txtFrmDate").setValue($.trim(rowData.TBLMAIN[0].VOUCH_DT));
                    $$("txtNarra").setValue($.trim(rowData.TBLMAIN[0].NARRATION));
                    $$("txtVouchNo").setValue($.trim(rowData.TBLMAIN[0].VOUCH_NO));
                    $$("ddldivision").setValue($.trim(rowData.TBLMAIN[0].DIV_ID));
                    $("#hdnTrnNature").val($.trim(rowData.TBLMAIN[0].TRN_NATURE));
                    $("#hdnCBy").val($.trim(rowData.TBLMAIN[0].C_BY));
                    $("#hdnCDt").val($.trim(rowData.TBLMAIN[0].C_DT));
                    $("#hdnUBy").val($.trim(rowData.TBLMAIN[0].UPDATE_BY));
                    $("#hdnUDt").val($.trim(rowData.TBLMAIN[0].UPDATE_DT));

                    $$("grdGLTransDet").clearAll();
                    $$("grdGLTransDet").parse(rowData.TBLTRN);
                    $$("grdGLTransDet").refresh();

                    $$("grdGLTrnData").clearAll();
                    $$("grdGLTrnData").parse(rowData.TBLTRNBILL);
                    $$("grdGLTrnData").refresh();

                    $$("grdGlAnalyData").clearAll();
                    $$("grdGlAnalyData").parse(rowData.TBLANALYSIS);
                    $$("grdGlAnalyData").refresh();

                    $$("grdGLGstData").clearAll();
                    $$("grdGLGstData").parse(rowData.TBLGST);
                    $$("grdGLGstData").refresh();

                    fnMainGridTotal();
                    $$("grdGLTransDet").select($$("grdGLTransDet").getFirstId());//getLastId
                    webix.UIManager.setFocus($$("grdGLTransDet"));
                    if($("#hdnMULTI_CURRENCY_IND").val() == "1" )
                    {
                        var id = $$("grdGLTransDet").getFirstId();
                        var getval = $$("grdGLTransDet").getItem(id);
                        $$("TxtSalePurRate").setValue(getval.PsRate);
                        $$("TxtFornAmt").setValue(getval.FornAmt);
                        $$("TxtSalePurRate").show();
                        $$("TxtFornAmt").show();
                        $$("BtnSalePur").show();
                    }
                  
                }
                
            }
        },
    });

  //  return rowData;
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
function fnGlTrnDefLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNDEFLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PageMenu"] = $("#hdnGLTranPageMenu").val();
    dataparam["Program_Link_Id"] = $("#MenuName").val();
    
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                $("#hdnAttachAppl").val(rowData.TBLGLCONT[0].AttachAppl);
                $("#hdnNarrationInd").val(rowData.TBLGLCONT[0].NARRATION_IND);
                $("#hdnC_DIV_APPL").val(rowData.TBLGLCONT[0].C_DIV_APPL);
                $("#hdnAcCdInd").val(rowData.TBLGLCONT[0].AC_CD_IND);
                $("#hdnMULTI_CURRENCY_IND").val(rowData.TBLGLCONT[0].MULTI_CURRENCY_IND);
                $("#hdnProjApplInd").val(rowData.TBLGLCONT[0].PROJECT_APPL_IND);
                $("#hdnCOMMON_NARR_APPL").val(rowData.TBLGLCONT[0].COMMON_NARR_APPL);
                $("#hdnRESAPPL").val(rowData.TBLGLCONT[0].RESAPPL);
                $("#hdnDateAddInd").val(rowData.TBLGLCONT[0].D_IND);

                $("#hdnGSTAppl").val($.trim(rowData.TBLMSTCOMP[0].GL_VAT_IND));
                $("#hdnInGstInd").val($.trim(rowData.TBLMSTCOMP[0].IN_GST_IND));
                $("#hdnBaseCurrId").val($.trim(rowData.TBLMSTCOMP[0].BASE_CURRENCY_ID));
                $("#hdnK_TAX").val($.trim(rowData.TBLMSTCOMP[0].K_TAX));
                $("#hdnM_TAX").val($.trim(rowData.TBLMSTCOMP[0].M_TAX));
                $("#hdnTAXCap").val($.trim(rowData.TBLMSTCOMP[0].A5_ID));
                $("#CURRENCY_FORMAT").val(rowData.TBLMSTCOMP[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(rowData.TBLMSTCOMP[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(rowData.TBLMSTCOMP[0].VAL_DECIM_LIMIT);
                $("#hdnCurrentDt").val(rowData.TBLACCDT[0].CURDT);
                $("#hdnNewPriv").val(rowData.TBLUSERPRIV[0].NEW_PRIV);
                $("#hdnModPriv").val(rowData.TBLUSERPRIV[0].MOD_PRIV);
                $("#hdnViewPriv").val(rowData.TBLUSERPRIV[0].VIEW_PRIV);
                $("#hdnDelPriv").val(rowData.TBLUSERPRIV[0].DEL_PRIV);

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
                $("#CURRENCY_FORMAT").val(rowData[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(rowData[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(rowData[0].VAL_DECIM_LIMIT);
            }
        },
    });
}
function fnCurrFormat(value) {

    var Currfrmt = $("#CURRENCY_FORMAT").val();
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
    //debugger;
    if (value == null || value == undefined) return "";
    if (isNaN(value)) return "";

    if (value.toString() != "") {
        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                ////afterPoint = CurrDelimit + afterPoint
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            //x = Math.floor(x);                   

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        else {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }

            x = x.toString();

            //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
            //var res = x.replace(/(\d{3})/g, "1,")
            var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            if (res.indexOf('.') > 0) {

                res = res.replace(".", CurrDelimit)
            }


            return res;
        }
    }
    else {
        return value;
    }
};
function fnLoadGstColumn() {

}
function fnLoadCurSalePurRate() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURSALEPURRATE";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["TrnDt"] = $$("txtFrmDate").getText();
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
        error: function () {
            
        },
        complete: function () {
          
        }
    });
    return rowData;


}
function fnGLTrnDtCheck()
{
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNDATECHECK";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnDt"] = $$("txtFrmDate").getText();
    if ($$("txtFrmDate").getText() != "")
    {
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/GLTrans/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {

                if (d != "" && d != "True") {
                    // rowData = JSON.parse(d);
                    AlertMessage($.trim(d));
                    return false;
                }
            }

        });
    }
   
    return true;
}
function fnLoadGLTrnTyInd() {
    debugger;
    ////var fnClasLoad = fnLoadClass();
    var fnClasLoad = "";
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLTRNTYIND";
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
                fnClasLoad = rowData;
                $("#hdnCOMMON_NARR_APPL").val($.trim(rowData.TBLGLTRNTY[0].COMMON_NARR_APPL));

                $("#hdnDOC_APPL_IND").val($.trim(rowData.TBLGLTRNTY[0].DOC_APPL_IND));

                $("#hdnRcptInd").val($.trim(rowData.TBLGLTRNTY[0].B_IND));

                $("#hdnFirstDrCrInd").val($.trim(rowData.TBLGLTRNTY[0].FIRST_LINE_DRCR_IND));

                $("#hdnApprAppl").val($.trim(rowData.TBLGLTRNTY[0].A3_IND));
                $("#hdnParentTrnTyId").val($("#hdnDefGlTrnTy").val());
                if($.trim(rowData.TBLGLTRNTY[0].PARENT_TRN_TY_ID)!="")   $("#hdnParentTrnTyId").val($.trim(rowData.TBLGLTRNTY[0].PARENT_TRN_TY_ID));

                if ($$("txtFrmDate") != undefined)
                    $$("txtFrmDate").setValue($("#hdnCurrentDt").val());

                //if ($$("ddlTrnType") != undefined)
                //    $$("lblHead").setValue($$("ddlTrnType").getText());

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
                    if ($("#hdnAcCdInd").val() == "1")
                        $$("grdGLTransDet").showColumn("ACCD");
                    else
                        $$("grdGLTransDet").hideColumn("ACCD");

                    if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                        $$("grdGLTransDet").showColumn("CurNm");
                    else
                        $$("grdGLTransDet").hideColumn("CurNm");
                    
                    if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                        $$("grdGLTransDet").showColumn("CurrId");
                    else
                        $$("grdGLTransDet").hideColumn("CurrId");

                    if ($("#hdnNarrationInd").val() == "1")
                        $$("grdGLTransDet").showColumn("Narr");
                    else
                        $$("grdGLTransDet").hideColumn("Narr");

                  
                    
                    if ((($("#hdnDOC_APPL_IND").val() == "1" || $("#hdnDOC_APPL_IND").val() == "2" || $("#hdnDOC_APPL_IND").val() == "3") && ($.trim($("#hdnGLTranPageMenu").val()) != "GLMNUTRNPDC"))+
                       (($("#hdnDOC_APPL_IND").val() == "1" || $("#hdnDOC_APPL_IND").val() == "2" ) && ($.trim($("#hdnGLTranPageMenu").val()) == "GLMNUTRNPDC"))) {
                        $$("grdGLTransDet").showColumn("DocNo");
                        $$("grdGLTransDet").showColumn("DocDt");
                    }
                    else {

                        $$("grdGLTransDet").hideColumn("DocNo");
                        $$("grdGLTransDet").hideColumn("DocDt");

                    }
                
                  
                    if ($("#hdnGSTAppl").val() == "1" || $("#hdnInGstInd").val() == "1" || $("#hdnK_TAX").val() == "4" || $("#hdnK_TAX").val() == "3" || $("#hdnK_TAX").val() == "2" || $("#hdnM_TAX").val() == "4")
                        $$("grdGLTransDet").showColumn("btnGST");
                    else
                        $$("grdGLTransDet").hideColumn("btnGST");


                    if ($("#hdnDOC_APPL_IND").val() == "1") {
                        if ($("#hdnGLTranPageMenu").val() == "GLMNUTRNPDC")
                        {
                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                            {
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[8] != undefined) $$("grdGLTransDet").config.columns[8].header = "Chq Dt";
                            }
                            else
                            {
                                if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq Dt";
                            }
                           
                        }
                        else
                        {
                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                            {
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[8] != undefined) $$("grdGLTransDet").config.columns[8].header = "Chq Dt";
                            }
                            else
                            {
                                if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq Dt";
                            }
                          
                        }
                      
                    }
                    else if ($("#hdnDOC_APPL_IND").val() == "2") {
                        if ($("#hdnGLTranPageMenu").val() == "GLMNUTRNPDC") {
                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[8] != undefined) $$("grdGLTransDet").config.columns[8].header = "Chq Dt";
                            }
                            else
                            {
                                if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Chq No";
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Chq Dt";
                            }
                            
                        }
                        else {
                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Ref No";
                                if ($$("grdGLTransDet").config.columns[8] != undefined) $$("grdGLTransDet").config.columns[8].header = "Ref Date";
                            }
                            else
                            {
                                if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Ref No";
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Ref Date";
                            }
                          
                        }
                       
                    }
                    else if ($("#hdnDOC_APPL_IND").val() == "3") {
                        if ($("#hdnGLTranPageMenu").val() != "GLMNUTRNPDC") {
                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Document No";
                                if ($$("grdGLTransDet").config.columns[8] != undefined) $$("grdGLTransDet").config.columns[8].header = "Document Dt";
                            }
                            else
                            {
                                if ($$("grdGLTransDet").config.columns[6] != undefined) $$("grdGLTransDet").config.columns[6].header = "Document No";
                                if ($$("grdGLTransDet").config.columns[7] != undefined) $$("grdGLTransDet").config.columns[7].header = "Document Dt";
                            }
                         
                        }
                      
                    }

                    $$("grdGLTransDet").refreshColumns();
                }

                $("#hdnVOUCH_NO_IND").val($.trim(rowData.TBLGLTRNTY[0].VOUCH_NO_IND));

                if ($.trim(rowData.TBLGLTRNTY[0].VOUCH_NO_IND) == "2" || $.trim(rowData.TBLGLTRNTY[0].VOUCH_NO_IND) == "3")
                    $$("txtVouchNo").enable();
                else
                    $$("txtVouchNo").disable();
                
                if ($("#hdnCurMode").val() == "N") {
                }

                if ($.trim(rowData.TBLGLTRNTY[0].TRN_TY_CAT) == "2") {

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
                $("#hdnTransDetRowId").val("0");
                //fnMainDetRowAdd('0');

              

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
                if ($$("grdGlAnaly") != undefined) {
                    $$("grdGlAnaly").clearAll();
                    $$("grdGlAnaly").refresh();
                    $$("grdGlAnaly").hide();
                }
                $$("lblTDiff").define("label", "Difference :");
                $$("lblTDiff").refresh();
                $$("txtTDiffAmt").setValue("");
              
                if ($("#hdnGLTranPage").val()=="") fnMainDetRowAdd('0');
              

            }
        },
    });
}

function fnGLTrnDelete() {
    webix.confirm({
        title: "Confirmation ?",
        ok: "Yes", cancel: "No",
        text: "Are you sure you want to  delete this record ?"
    })
    .then(function () {
     
        debugger;
        if ($("#hdnGLTrnId").val() == "") {
            AlertMessage("Deletion is not possible !");
            return false;
        }

      
        if($("#hdnRESAPPL").val()=="1")
        {
            $$("ReaasonPopup").show();
        }
        if ($("#hdnRESAPPL").val() != "1" || ($("#hdnRESAPPL").val() == "1" && $$("TxtReason").getValue() != "" && $$("TxtReason").getValue() != undefined))
        {

            $("#LoadDIv").show();
            $('#btnDel').prop('disabled', true);
            var dataparam = {};
            dataparam["PROPNM"] = $$("ddlProperty").getText();
            dataparam["REQTYPE"] = "GET_GLTRNDELETE";
            dataparam["PROGNAME"] = "GET_GLTRNSC01";
            dataparam["COMPID"] = $$("ddlProperty").getValue();
            dataparam["cMode"] = $("#hdnCurMode").val();
            dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
            dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
            dataparam["TrnDt"] = $$("txtFrmDate").getText();
            dataparam["edbVouchNo"] = $$("txtVouchNo").getValue();
            dataparam["TrnId"] = $("#hdnGLTrnId").val();
            dataparam["NewCmpId"] = $("#hdnGLNewCmpId").val();
            dataparam["Reason"] = $$("TxtReason").getValue();
            dataparam["divId"] = ($.trim($$("ddldivision").getValue()) != "" ? $$("ddldivision").getValue() : "");
            var gridData = $$("grdGLTrnData").serialize();
            $.each(gridData, function (key, sVal) {

                $.each(sVal, function (key, value) {

                    if (value != null && value != undefined) sVal[key] = value.toString().replace(/&/g, '~'); // value.toString();
                });
            });
            dataparam["TBLGLVADATA"] = gridData;
            var DataVal = JSON.stringify(dataparam);
            $.ajax({
                async: true,
                url: "/GLTrans/COMAPI_CALL",
                type: 'POST',
                data: "request=" + DataVal,
                success: function (objRes) {
                    if (objRes != "") {
                        debugger;
                        rowData = JSON.parse(objRes);
                        if ($.trim(rowData).includes("Deleted") == true) {
                            $("#btnRef").click();
                            webix.modalbox({
                                title: "Message",
                                buttons: ["Ok"],
                                width: 400,
                                height: 150,
                                text: $.trim(rowData)
                            }).then(function (result) {
                                debugger;
                                var type = "";
                                if (result == 0) {
                                    $("#LoadDIv").hide();
                                    $("#hdnGLTrnId").val("");
                                    if ($("#hdnGLTranPage").val() != "") this.parent.$$("DrillTransPopup").hide();
                                }

                            });
                            //$("#LoadDIv").hide();
                            //SuccessMsg($.trim(rowData));
                            //$("#btnRef").click();
                            //$("#hdnGLTrnId").val("");
                            //if ($("#hdnGLTranPage").val() == "2") this.parent.$$("DrillTransPopup").hide();// window.close();
                        }
                        else if ($.trim(rowData) == "Error") {
                            $("#LoadDIv").hide();
                            AlertMessage($.trim(rowData));
                            $("#btnRef").click();
                        }
                        else {s
                            $("#LoadDIv").hide();
                            AlertMessage($.trim(rowData));
                        }

                    }
                },
            });
            $("#LoadDIv").hide();
            $('#btnDel').prop('disabled', false);
      
        }
  
    })
        .fail(function () {

        });
  
}
function fnGLTrnSave() {
    debugger;
    $("#LoadDIv").show();
    if (!fnGLSaveValidate())
    {
        $("#LoadDIv").hide();
        return false;
    }
    $("#LoadDIv").show();
  
    $('#btnSave').prop('disabled', true);
   
   
    var dataparam = {};
    dataparam["PROPNM"] = $$("ddlProperty").getText();
    dataparam["REQTYPE"] = "GET_GLTRNSAVE";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
  //  dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["cMode"] = $("#hdnCurMode").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["TrnDt"] = $$("txtFrmDate").getText();
    dataparam["edbVouchNo"] = $$("txtVouchNo").getValue();

    dataparam["divId"] = ($.trim($$("ddldivision").getValue()) != "" ? $$("ddldivision").getValue() : "");
    dataparam["txtComNar"] = $.trim($$("txtNarra").getValue()).replace(/&/g, '~');
    dataparam["ddlRcptty"] = $$("ddlRcptTy").getValue();
    dataparam["EdbBnkTy"] = $("#hdnBankId").val();
    dataparam["edbBrnch"] = $$("txtBranch").getValue();

    dataparam["ddlGstAdjTy"] = "";//Not Designed
    dataparam["ddlAddDet"] = "";//Not Designed
    dataparam["Rev_ind"] = $("#hdnRevInd").val();
    if ($("#hdnUnApprMsg").val() == "1") dataparam["UnAppr_Msg"] = "1";
    if ($("#hdnGLTranPage").val() == "2")
    {
        dataparam["NewCmpId"] = $("#hdnGLNewCmpId").val();
    }
  if($.trim($("#hdnCurMode").val())!="N")  dataparam["TrnId"] = $("#hdnGLTrnId").val();
    dataparam["TrnNature"] = $("#hdnTrnNature").val();
    dataparam["Trn_Cat"] = $("#hdnTrnCat").val();

    if ($("#hdnGLTranPageMenu").val() == "GLMNUTRNPDC") dataparam["GLTrnTagVal"] = $("#hdnGLTrnTagVal").val();
    if ($("#hdnGLTranPage").val() == "3") dataparam["RevGl"] = "1";

    //var dsGlTrans = $$("grdGLTransDet").serialize();
    //var GridDtSet = JSON.stringify(dsGlTrans);
    var GridDtSet = $$("grdGLTransDet").serialize();
    $.each(GridDtSet, function (key, sVal) {
        $.each(sVal, function (key, value) {
         
            if (value != null && value != undefined) {
                if (value == "Infinity") value = "";
                var val = value.toString().replace(/'/g, '');
                sVal[key] = val.toString().replace(/&/g, '~');
            }
        });
    });
    dataparam["TBLGLTRANS"] = GridDtSet;
    debugger;
 
    var gridData = $$("grdGLTrnData").serialize();
        $.each(gridData, function (key, sVal) {

            $.each(sVal, function (key, value) {

                if (value != null && value != undefined)
                {
                   var val = value.toString().replace(/'/g, '');
                   sVal[key] = val.toString().replace(/&/g, '~');
                }
            });
        });  
    dataparam["TBLGLVADATA"] = gridData;

  
    var gridData = $$("grdGlAnalyData").serialize();
        $.each(gridData, function (key, sVal) {

            $.each(sVal, function (key, value) {

                if (value != null && value != undefined) sVal[key] = value.toString();
            });
        });   
    dataparam["TBLGLANADATA"] = gridData;

    var gridData = $$("grdGLGstData").serialize();
    $.each(gridData, function (key, sVal) {

        $.each(sVal, function (key, value) {

            if (value != null && value != undefined) sVal[key] = value.toString();
        });
    });
    dataparam["TBLGLGSTDATA"] = gridData;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/GLTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                debugger;
                rowData = JSON.parse(objRes);
                if ($.trim(rowData).includes("Saved")==true)
                {
                  
                 
                    //$("#btnRef").click();
                   
                    //webix.modalbox({
                    //    title: "Message",
                    //    buttons: ["Ok"],
                    //    width: 400,
                    //    height: 150,
                    //    text: $.trim(rowData)
                    //}).then(function (result) {
                    //    debugger;
                    //    var type = "";
                    //    if (result == 0) {
                    //        $("#LoadDIv").hide();
                    //        if ($("#hdnGLTranPage").val() != "") this.parent.$$("DrillTransPopup").hide();
                    //    }
                     
                    //});
                    var vSplit = rowData.split("_");
                    var TrnId = $.trim(vSplit[0]);
                    var Msg = $.trim(vSplit[1]);
                    fnCallPrintVoucher(TrnId, Msg);
                
                }
                else if ($.trim(rowData).includes("Unapproved") == true)
                {
                    
                    webix.modalbox({
                        title: "Confirmation !",
                        buttons: ["Yes", "No", "Cancel"],
                        width: 400,
                        height: 150,
                        text: $.trim(rowData),
                    }).then(function (result) {
                        if (result == 0) {
                            $("#hdnUnApprMsg").val("1");
                            fnGLTrnSave();

                        }
                        else
                        {
                            $("#hdnUnApprMsg").val("");
                        }
                    });
                }
                else  if ($.trim(rowData) == "Error")
                {
                 
                    AlertMessage($.trim(rowData));
                    $("#btnRef").click();
                    $("#btnNew").click();
               
                }
                else
                {
                    $("#LoadDIv").hide();
                    AlertMessage($.trim(rowData));
                    
                }
                $('#btnSave').prop('disabled', false);
            
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
          
        }
    });
  
  
}
function fnCallPrintVoucher(TrnId,Msg) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSuccess",
        head: "Message",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        move: true,
        height: 150,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            height: 150,
            elements: [
                {
                    rows: [
                        {
                            paddingY: 10,
                            cols: [
                                {
                                    width: 110,
                                },
                                {
                                    view: "label",
                                    id: "lblSuccMsg",
                                    //label: "Saved Successfully",
                                    label:Msg,
                                    labelAlign: "Center",
                                }
                            ]
                        },
                        {
                            height: 5,
                        },
                        {
                            cols: [
                                {
                                    width: 50,
                                },
                                {
                                    id: "ChkPrint",
                                    view: "checkbox",
                                    labelRight: "Print",
                                    labelwidth: 100,
                                    inputWidth: 150, width: 150,

                                    on: {
                                        "onChange": function () {
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Ok', type: "icon", icon: "wxi-check",
                                    maxWidth: 75,
                                    inputWidth: 70,
                                    on: {
                                        onItemClick: function () {

                                            var PrinRt = "1";

                                            debugger
                                            if ($$("ChkPrint").getValue() == "1") {
                                                var CompId = $$("ddlProperty").getValue();
                                                var FiscalYear = $("#hdnFiscalYr").val();
                                                var TrnTy= $("#hdnDefGlTrnTy").val();

                                                var Host = window.location.host;
                                                var PageUrl = "http://" + Host.toString().trim() + "/GL/RptPdfOpen.aspx";

                                                var Mleft = (screen.width / 2) - (840 / 2);
                                                var Mtop = (screen.height / 2) - (550 / 2);
                                                $("#LoadDIv").hide();
                                                $("#btnRef").click();
                                                $("#btnNew").click();
                                                window.open(PageUrl + "?TRNID=" + TrnId + "&DDLVOUCHTYPE=" + TrnTy + "&COMPID=" + CompId + "&FISCALYR=" + FiscalYear + "&RPT=" + "GLVP", "_blank", "width=840px,height=550,scrollbars=yes,top=\"" + Mtop + "\,left=\"" + Mleft + "\"", 0);
                                                sleep(3000);
                                               
                                            }
                                            else
                                            {
                                                $("#LoadDIv").hide();
                                                $("#btnRef").click();
                                                $("#btnNew").click();
                                                fnhidePop();
                                            }
                                            fnhidePop();
                                           // $$("PopupSuccess").hide();
                                        }
                                    }
                                },
                            ]
                        }
                    ]
                }
            ],
         
        }
    });

    $$("PopupSuccess").show();
}
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
function fnhidePop()
{
    $$("PopupSuccess").hide();
    if ($("#hdnGLTranPage").val() != "") this.parent.$$("DrillTransPopup").hide();
}
function fnGLSaveValidate() {
    debugger;
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

    if (grdTrnDet.length != 0 && $("#hdnDefGlTrnTy").val() !="0") {

        var DrAmt = 0; var CrAmt = 0;

        for (i = 0; i < grdTrnDet.length; i++) {

            DrAmt = DrAmt + (grdTrnDet[i].Debit == "" || grdTrnDet[i].Debit == "NaN" || grdTrnDet[i].Debit == null ? 0 : parseFloat(grdTrnDet[i].Debit));

            CrAmt = CrAmt + (grdTrnDet[i].Credit == "" || grdTrnDet[i].Credit == "NaN" || grdTrnDet[i].Credit == null ? 0 : parseFloat(grdTrnDet[i].Credit));
        }

        var tot = parseFloat(CrAmt).toFixed(2) - parseFloat(DrAmt).toFixed(2);

        if (tot < 0)
            tot = parseFloat(tot) * -1;
        tot = parseFloat(tot).toFixed(2);
        if (parseFloat(DrAmt).toFixed(2) != parseFloat(CrAmt).toFixed(2)) {
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

            if( $("#hdnGLTranPageMenu").val()=="GLMNUTRNPDC" &&  data[i].DocNo == "") {
                AlertMessage("Cheque No cannot be empty !");
                return false;
            }
           

            var DrAmt = (data[i].Debit != "" && data[i].Debit!="NaN" && data[i].Debit!=null ? parseFloat(data[i].Debit) : 0);
            var CrAmt = (data[i].Credit != "" && data[i].Credit != "NaN" && data[i].Credit != null ? parseFloat(data[i].Credit) : 0);

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
            var CurrId = $.trim(data[i].CurrId);
            if (CurrId != $.trim($("#hdnBaseCurrId").val()) && CurrId!="" &&  ($("#hdnMULTI_CURRENCY_IND").val() == "1") )
            {
                var PsRate = $.trim(data[i].PsRate);
                var FornAmt = $.trim(data[i].FornAmt);
                var vforn = parseFloat(PsRate * FornAmt);
                var vbase="";
                if ($.trim(data[i].Drcr) == "DR") vbase = data[i].Debit;
                if ($.trim(data[i].Drcr) == "CR") vbase = data[i].Credit;
                var Diff = parseFloat(vbase) - parseFloat(vforn);
                var Diff1 = parseFloat(vforn) / parseFloat(PsRate);
                if ($.trim(Diff).includes("-") == true) Diff = Diff * -1;
                if ($.trim(Diff1).includes("-") == true) Diff1 = Diff1 * -1;
                if ($.trim(FornAmt).includes("-") == true) FornAmt = FornAmt * -1;
                if (parseFloat(Diff).toFixed(2) > 1 || parseFloat(Diff1).toFixed(2) != parseFloat(FornAmt).toFixed(2))
                {
                    AlertMessage("Amount not Matching with Forn Amt");
                    return false;
                }
            }
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
                        var Cr = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);
                        var Dr = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);
                        TotCredit = parseFloat(TotCredit) + parseFloat(Cr);
                        TotDebit = parseFloat(TotDebit) + parseFloat(Dr);
                        if(DtFilter[k].RefTyId=="")
                        {
                            AlertMessage("Pending Bills are not settled properly for " + $.trim(data[i].AcNM) + " Account");
                            return false;
                        }
                      
                    }
                    var TotDiff = TotDebit - TotCredit;
                    if (TotDiff < 0) TotDiff = TotDiff * (-1);
                    var Amt = ($.trim(data[i].Drcr) == "DR" ? DrAmt : CrAmt);
                    //if ($.trim(data[i].Drcr) == "DR" && parseFloat(TotDebit).toFixed(2) != parseFloat(DrAmt).toFixed(2))
                    //{
                    //    AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                    //    return false;
                    //}
                    //else if ($.trim(data[i].Drcr) == "CR" && parseFloat(TotCredit).toFixed(2) != parseFloat(CrAmt).toFixed(2))
                    //{
                    //    AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                    //    return false;
                    //}
                    if (parseFloat(TotDiff).toFixed(2) != parseFloat(Amt).toFixed(2))
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

                       
                        if ($.trim(DtFilter[k].Amount) == "" || DtFilter[k].Amount == "NaN" || DtFilter[k].Amount == null || parseFloat(DtFilter[k].Amount) == 0) {
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
                if ((parseFloat(vBAmt).toFixed(2) != parseFloat(CrAmt).toFixed(2) && parseFloat(CrAmt).toFixed(2) > 0) || (parseFloat(vBAmt).toFixed(2) != parseFloat(DrAmt).toFixed(2) && parseFloat(DrAmt).toFixed(2) > 0))
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

    $$("grdGLTransDet").editStop();
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

    if ($$("grdGLGstData") != undefined) {
        $$("grdGLGstData").clearAll();
        $$("grdGLGstData").refresh();
    }
    $$("lblTDiff").define("label", "Difference :");
    $$("lblTDiff").refresh();
    $$("txtTDiffAmt").setValue("");
    $$("grdGlAnaly").hide();
    $("#hdnUnApprMsg").val("");
    $("#hdnTrnNewRowAdd").val("");
    $("#hdnEditCur").val("1");
    $$("TxtSalePurRate").setValue("");
    $$("TxtFornAmt").setValue("");
    $$("TxtSalePurRate").hide();
    $$("TxtFornAmt").hide();
    $$("BtnSalePur").hide();
    $("#hdnEditCur").val("");
   
}

