function fnLoadDefPOMode() {
    debugger;
    $("#DefPOMode").data("kendoDropDownList");
   
}
function fnLoadPoPgm()
{
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var Table = {};
    Table["REQTYPE"] = "LOADPOPGM";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var ddlpgm = JSON.parse(data);
            $("#PoPrntPgm").kendoDropDownList({ dataTextField: "FORM_ID", dataValueField: "PROG_ID", dataSource: ddlpgm, height: 100, optionLabel: " " });
        }
    });
}
function fnLoadPIPgm(){
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var Table = {};
    Table["REQTYPE"] = "LOADPIPGM";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var ddlpgm = JSON.parse(data);
            $("#RqPrntPgm").kendoDropDownList({ dataTextField: "FORM_ID", dataValueField: "PROG_ID", dataSource: ddlpgm, height: 100, optionLabel: " " });
        }
    });
}
function fnPageControls() {
    //------------- Main TabStrip ---------
    $('#txtpoid').prop("disabled", true);
    $('#txtponm').prop("disabled", true);
    $('#SvcType').prop("disabled", true);
    $('#chkMulCury').prop("disabled", true);
    $('#txtrqadj').prop("disabled", true);
    $('#txtSRDay').prop("disabled", true);
    $('#chkBApyes').prop("disabled", true);
    $('#chkAgApyes').prop("disabled", true);
    $('#chkSBApyes').prop("disabled", true);
    $('#chkSDDApyes').prop("disabled", true);
    $('#chkStman').prop("disabled", true);
    $('#chkSP1').prop("disabled", true);
    $('#chkSP2').prop("disabled", true);
    $('#chkLaApyes').prop("disabled", true);
    $('#chkRundOff').prop("disabled", true);
    $('#chkCaMrkyes').prop("disabled", true);
    $('#chkUnAlert').prop("disabled", true);
    $('#chkAlPoDt').prop("disabled", true);
    $('#chkAlCurrDt').prop("disabled", true);
    $('#chkDefCon').prop("disabled", true);
    $('#chledit').prop("disabled", true);
    $('#chkDptSvc').prop("disabled", true);
    $('#chlAlunit').prop("disabled", true);
    $('#chlAlunit1').prop("disabled", true);
    $('#chkprpgm').prop("disabled", true);
    $('#chkSvcOrd').prop("disabled", true);
    $('#chkExclu').prop("disabled", true);
    $('#chkOrApp').prop("disabled", true);
    $('#chkedOrdr').prop("disabled", true);
    $('#chkDptMan').prop("disabled", true);
    $('#chkAlSRDt').prop("disabled", true);
    $('#chkAlCurrDt1').prop("disabled", true);
    $('#chkDptMan').prop("disabled", true);

    var ddl = $('#DefPOMode').data("kendoDropDownList");
    ddl.enable(false);
    $('#divrndoff').hide();
    $('#chkDptMan').prop("disabled", true);
    $('#chkSvc').prop("disabled", true);
    $('#divs1').hide();
    $('#divs2').hide();
    $('#divs3').hide();
    $('#divs4').hide();
    $('#divs5').hide(); $('#divs6').hide();

    // ----------------------- LineItems ----------------------------------------------
    var ddrt = $('#RateDecLen').data("kendoDropDownList");
    ddrt.enable(false);
    $('#chkLnApp').prop("disabled", true);
    $('#chkLnItm').prop("disabled", true);
    $('#chkSelApp').prop("disabled", true);
    $('#chlRtOp').prop("disabled", true);
    $('#chkRtMan').prop("disabled", true);
    $('#chkProdMst').prop("disabled", true);
    $('#chkLaProRt').prop("disabled", true);
   
    //----------------- Printing Programs -----------------------------------------------
    var ddr1t = $('#PoPrntPgm').data("kendoDropDownList");
    ddr1t.enable(false);
    var ddr2t = $('#RqPrntPgm').data("kendoDropDownList");
    ddr2t.enable(false);
    $('#chksamepgm').prop("disabled", true);
    $('#txtmswrd').prop("disabled", true);
    $('#txtexcel').prop("disabled", true);
    $('#txtpdf').prop("disabled", true);
    $('#chksamepgm1').prop("disabled", true);
    $('#chksaveprnt').prop("disabled", true);
    $('#txtsignby').prop("disabled", true);
    $('#chkprntord').prop("disabled", true);
    $('#chkprntrq').prop("disabled", true);
}
function fnrefresh() {
    $('#chkMulCury').prop("checked", false);
    $('#txtpoid').val("Select");
    $("#txtponm").val("");
    $('#txtrqadj').val("0");
    $('#txtSRDay').val("0");
    $('#SvcType').show();
    $('#chkBApyes').prop("checked", false);
    $('#chkAgApyes').prop("checked", false);
    $('#chkSBApyes').prop("checked", false);
    $('#chkSDDApyes').prop("checked", false);
    $('#chkStman').prop("checked", false);
    $('#chkSP1').prop("checked", false);
    $('#chkSP2').prop("checked", false);
    $('#chkLaApyes').prop("checked", false);
    $('#chkRundOff').prop("checked", false);
    $('#chkCaMrkyes').prop("checked", false);
    $('#chkUnAlert').prop("checked", false);
    $('#chkAlPoDt').prop("checked", false);
    $('#chkAlCurrDt').prop("checked", false);
    $('#chkDefCon').prop("checked", false);
    $('#chledit').prop("checked", false);
    $('#chkDptSvc').prop("checked", false);
    $('#chlAlunit').prop("checked", false);
    $('#chlAlunit1').prop("checked", false);
    $('#chkprpgm').prop("checked", false);
    $('#chkSvcOrd').prop("checked", false);
    $('#chkExclu').prop("checked", false);
    $('#chkOrApp').prop("checked", false);
    $('#chkedOrdr').prop("checked", false);
    $('#chkDptMan').prop("checked", false);
    $('#chkAlSRDt').prop("checked", false);
    $('#chkAlCurrDt1').prop("checked", false);
    $('#chkDptMan').prop("checked", false);
    var ddl = $('#DefPOMode').data("kendoDropDownList");
    ddl.enable(false);
    ddl.text("");
    var ddrt = $('#RateDecLen').data("kendoDropDownList");
    ddrt.enable(false);
    ddrt.text("");
    $('#chkLnApp').prop("checked", false);
    $('#chkLnItm').prop("checked", false);
    $('#chkSelApp').prop("checked", false);
    $('#chlRtOp').prop("checked", false);
    $('#chkRtMan').prop("checked", false);
    $('#chkProdMst').prop("checked", false);
    $('#chkLaProRt').prop("checked", false);

    var ddr1t = $('#PoPrntPgm').data("kendoDropDownList");
    ddr1t.enable(false);
    ddr1t.text("");
    var ddr2t = $('#RqPrntPgm').data("kendoDropDownList");
    ddr2t.enable(false);
    ddr2t.text("");
    $('#chksamepgm').prop("checked", false);
    $('#txtmswrd').val(" ");
    $('#txtexcel').val("");
    $('#txtpdf').val("");
    $('#chksamepgm1').prop("checked", false);
    $('#chksaveprnt').prop("checked", false);
    $('#txtsignby').val("");
    $('#chkprntord').prop("checked", false);
    $('#chkprntrq').prop("checked", false);
}
function fnNewModePageContols() {
    //------------- Main TabStrip ---------
   
    $('#SvcType').prop('disabled', false);
    $('#txtpoid').prop('disabled', false);
    $('#chkMulCury').prop("disabled", false);
    $('#txtrqadj').prop("disabled", false);
    $('#txtSRDay').prop("disabled", false);
    $('#chkBApyes').prop("disabled", false);
    $('#chkAgApyes').prop("disabled", false);
    $('#chkSBApyes').prop("disabled", false);
    $('#chkSDDApyes').prop("disabled", false);
    $('#chkStman').prop("disabled", false);
    $('#chkSP1').prop("disabled", false);
    $('#chkSP2').prop("disabled", false);
    $('#chkLaApyes').prop("disabled", false);
    $('#chkRundOff').prop("disabled", false);
    $('#chkCaMrkyes').prop("disabled", false);
    $('#chkUnAlert').prop("disabled", false);
    $('#chkAlPoDt').prop("disabled", false);
    $('#chkAlCurrDt').prop("disabled", false);
    $('#chkDefCon').prop("disabled", false);
    $('#chledit').prop("disabled", false);
    $('#chkDptSvc').prop("disabled", false);
    $('#chlAlunit').prop("disabled", false);
    $('#chlAlunit1').prop("disabled", false);
    $('#chkprpgm').prop("disabled", false);
    $('#chkSvcOrd').prop("disabled", false);
    $('#chkExclu').prop("disabled", false);
    $('#chkOrApp').prop("disabled", false);
    $('#chkedOrdr').prop("disabled", false);
    $('#chkDptMan').prop("disabled", false);
    $('#chkAlSRDt').prop("disabled", false);
    $('#chkAlCurrDt1').prop("disabled", false);
    $('#chkDptMan').prop("disabled", false);
    var ddl = $('#DefPOMode').data("kendoDropDownList");
    ddl.enable(true);
    ddl.text("Standard PO");
    $('#divrndoff').hide();
    $('#chkDptMan').prop("disabled", false);
    $('#chkSvc').prop("checked", true);
    $('#chkSvc').prop("disabled", true);
    // ----------------------- LineItems ----------------------------------------------
    var ddrt = $('#RateDecLen').data("kendoDropDownList");
    ddrt.enable(true);
    $('#chkLnApp').prop("disabled", false);
    $('#chkLnItm').prop("disabled", false);
    $('#chkSelApp').prop("disabled", false);
    $('#chlRtOp').prop("disabled", false);
    $('#chkRtMan').prop("disabled", false);
    $('#chkProdMst').prop("disabled", false);
    $('#chkLaProRt').prop("disabled", false);

    //----------------- Printing Programs -----------------------------------------------
    var ddrt = $('#PoPrntPgm').data("kendoDropDownList");
    ddrt.enable(true);
    var ddrt = $('#RqPrntPgm').data("kendoDropDownList");
    ddrt.enable(true);
    $('#chksamepgm').prop("disabled", false);
    $('#txtmswrd').prop("disabled", false);
    $('#txtexcel').prop("disabled", false);
    $('#txtpdf').prop("disabled", false);
    $('#chksamepgm1').prop("disabled", false);
    $('#chksaveprnt').prop("disabled", false);
    $('#txtsignby').prop("disabled", false);
    $('#chkprntord').prop("disabled", false);
    $('#chkprntrq').prop("disabled", false);
    fnLoadPIPgm();
    fnLoadPoPgm();
    fnLoadRate();
}
function fnOpenModeLoadData(svcid) {
    
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var Table = {};
    Table["REQTYPE"] = "LOADOPENMODEDATA";
    Table["COMPID"] = COMPID;
    Table["SVCID"] = svcid;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var d = JSON.parse(data);
            i=0;
            for (i; i < d.length; i++) {
               
                if (d[i].PO_TY_NM != "")
                    $('#txtponm').val(d[i].PO_TY_NM);

                if (d[i].CURRENCY_APPL_IND == "1")
                    $('#chkMulCury').prop("checked", true);
                else
                    $('#chkMulCury').prop("checked", false);

                if (d[i].po_dt_valid_ind  == "2")
                    $('#chkAlCurrDt').prop("checked", true);
                else if (d[i].po_dt_valid_ind == "1")
                    $('#chkAlPoDt').prop("checked", true);
                else
                    $('#chkAlCurrDt').prop("checked", false);
                    $('#chkAlPoDt').prop("checked", false);

                    if (d[i].INDENT_ADJ_PER != "") {
                        $('#txtrqadj').val(d[i].INDENT_ADJ_PER);
                    }
                    else {
                        $('#txtrqadj').val(0);
                    }

                if (d[i].NF3 != "")
                    $('#txtSRDay').val(d[i].NF3)
                else $('#txtSRDay').val(0);

                if (d[i].BUYER_APPL_IND == "1")
                    $('#chkBApyes').prop("checked", true);
                else $('#chkBApyes').prop("checked", false);

                if (d[i].AGENT_APPL_IND == "1")
                    $('#chkAgApyes').prop("checked", true);
                else $('#chkAgApyes').prop("checked", false);

                if (d[i].SIGN_BY_IND == "1")
                    $('#chkSBApyes').prop("checked", true);
                else $('#chkSBApyes').prop("checked", false);

                if (d[i].START_DELIV_DT_IND == "1")
                    $('#chkSDDApyes').prop("checked", true);
                else $('#chkSDDApyes').prop("checked", false);

                if (d[i].SP_TERM1_IND == "1")
                    $('#chkSP1').prop("checked", true);
                else $('#chkSP1').prop("checked", false);

                if (d[i].SP_TERM2_IND == "1")
                    $('#chkSP2').prop("checked", true);
                else $('#chkSP2').prop("checked", false);

                if (d[i].LAST_LINE_NARR_IND == "1")
                    $('#chkLaApyes').prop("checked", true);
                else $('#chkLaApyes').prop("checked", false);

                if (d[i].ROUND_OFF_APPL_IND == "1")
                    $('#chkRundOff').prop("checked", true);
                else $('#chkRundOff').prop("checked", false);

                if (d[i].CASE_MARKING_IND == "1")
                    $('#chkCaMrkyes').prop("checked", true);
                else $('#chkCaMrkyes').prop("checked", false);

                if (d[i].B_IND == "1")
                    $('#chkUnAlert').prop("checked", true);
                else $('#chkUnAlert').prop("checked", false);

                if (d[i].START_DELIV_DT_IND == "1")
                    $('#chkSP1').prop("checked", true);
                else $('#chkSP1').prop("checked", false);

                if (d[i].SP_TERM2_IND == "1")
                    $('#chkSP2').prop("checked", true);
                else $('#chkSP2').prop("checked", false); 

                if (d[i].x_ind == "2")
                    $('#chkAlCurrDt1').prop("checked", true);
                else if (d[i].x_ind == "1")
                    $('#chkAlSRDt').prop("checked", true);
                else
                    $('#chkAlSRDt').prop("checked", false);
                $('#chkAlCurrDt1').prop("checked", false); 

                if (d[i].NA3 == "1")
                    $('#chkDefCon').prop("checked", true);
                else $('#chkDefCon').prop("checked", false);

                if (d[i].N1_IND == "1")
                    $('#chledit').prop("checked", true);
                else $('#chledit').prop("checked", false);

                if (d[i].DSPO_IND == "1")
                    $('#chkDptSvc').prop("checked", true);
                else $('#chkDptSvc').prop("checked", false);

                if (d[i].INDENT_APPL_IND == "2") {
                    $('#chlAlunit1').prop("checked", true);
                    $('#divs1').show();
                    $('#divs2').show();
                    $('#divs3').show();
                    $('#divs4').show();
                }
                else if (d[i].INDENT_APPL_IND == "1") {
                    $('#chlAlunit').prop("checked", true);
                    $('#divs1').show();
                    $('#divs2').show();
                    $('#divs3').show();
                    $('#divs4').show();
                }
                else {
                    $('#chlAlunit1').prop("checked", false);
                    $('#chlAlunit').prop("checked", false);
                    $('#divs1').hide();
                    $('#divs2').hide();
                    $('#divs3').hide();
                    $('#divs4').hide();
                } 
                if (d[i].A_IND == "1")
                    $('#chksvcapp').prop("checked", true);
                else $('#chksvcapp').prop("checked", false);

                if (d[i].F1_IND == "1") {
                    $('#chksvc1').prop("checked", true);
                    $('divs4').show();
                }
                else {
                    $('#chksvc1').prop("checked", false);
                    $('divs4').hide();
                } 
                if (d[i].NI_IND == "1")
                    $('#chksvc2').prop("checked", true);
                else $('#chksvc2').prop("checked", false);

                if (d[i].PRINT_PROG_OPT_IND == "1")
                    $('#chkprpgm').prop("checked", true);
                else $('#chkprpgm').prop("checked", false); 

                if (d[i].H_IND == "2") {
                    debugger;
                    $('#chkSvcOrd').prop("checked", true);
                    $('#chkExclu').prop("checked", true);
                    var ddl = $('#DefPOMode').data("kendoDropDownList");
                    ddl.text("Blanket Agreement");
                }
                else {
                    $('#chkSvcOrd').prop("checked", false);
                    $('#chkExclu').prop("checked", false);
                    var ddl = $('#DefPOMode').data("kendoDropDownList");
                    ddl.text("Standard PO");
                }

                if (d[i].D1_IND != "")
                    $('#DefPOMode').text(d[i].D1_IND);
                else $('#DefPOMode').text(" "); 

                if (d[i].PO_APPROVE_APPL_IND == "1") {
                   $('#chkOrApp').prop("checked", true);
                    $('#divs5').show();
                }
                else {
                    $('#chkOrApp').prop("checked", false);
                    $('#divs5').hide();
                }

                if (d[i].G1_IND == "1") {
                    $('#ckmul1').prop("checked", true);
                    $('#divs6').show();
                }
                else {
                    $('#ckmul1').prop("checked", false);
                    $('#divs6').hide();
                }

                if (d[i].ROUND_OFF_ID != "")
                    $('#Rounoff').text(d[i].D1_IND);
                else $('#Rounoff').text(" "); 

                if (d[i].F_IND == "1")
                    $('#chkedOrdr').prop("checked", true);
                else $('#chkedOrdr').prop("checked", false);
               
                
                ////if (d[i].CURR_IND == "1")
                ////    $('#chkedOrdr').prop("checked", true);
                ////else $('#chkedOrdr').prop("checked", false);

                if (d[i].Po_Indent_Depart_Appl_Ind == "2")
                    $('#chkDptMan').prop("checked", true);
                else $('#chkDptMan').prop("checked", false);

                if (d[i].GS_IND == "1")
                    $('#chkSvc').prop("checked", true);
                else $('#chkSvc').prop("checked", false);

                //////// end Main Tabstrip ////////////////////

                if (d[i].RATE_DECIM_LEN != "") {
                    var drt = $('#RateDecLen').data('kendoDropDownList');
                    drt.text(d[i].RATE_DECIM_LEN);
                }
                else $('#RateDecLen').val(" ");

                if (d[i].LINE_ITEM_NARR_APPL_IND == "1")
                    $('#chkLnApp').prop("checked", true);
                else $('#chkLnApp').prop("checked", false); 
                
                if (d[i].LINE_DISC_APPL_IND == "1")
                    $('#chkLnItm').prop("checked", true);
                else $('#chkLnItm').prop("checked", false);

                if (d[i].PROD_GROUP_APPL_IND == "1")
                    $('#chkSelApp').prop("checked", true);
                else $('#chkSelApp').prop("checked", false);

                if (d[i].PO_R_IND == "2")
                    $('#chkRtMan').prop("checked", true);
                else if (d[i].PO_R_IND == "1")
                    $('#chlRtOp').prop("checked", true);
                else
                    $('#chlRtOp').prop("checked", false);
                    $('#chkRtMan').prop("checked", false); 

                    if (d[i].D_IND == "0") {
                        $('#chkProdMst').prop("checked", true);
                    }
                    if (d[i].D_IND == "1") {
                        $('#chkLaProRt').prop("checked", true);
                    }
                    if (d[i].D_IND == "-1") {
                        $('#chkProdMst').prop("checked", false);
                        $('#chkLaProRt').prop("checked", false);
                    }

                /////////// end Line items tabstrip /////////////
               
                if (d[i].PRINT_PROG_DEF != "") {
                    var dpo = $('#PoPrntPgm').data('kendoDropDownList');
                    dpo.text(d[i].PRINT_PROG_DEF);
                }
                else $('#PoPrntPgm').text(" ");

                if (d[i].PO_PRN_IND == "1")
                    $('#chksamepgm').prop("checked", true);
                else $('#chksamepgm').prop("checked", false); 

                if (d[i].PO_MSWRD_EXE != "")
                    $('#txtmswrd').val(d[i].PO_MSWRD_EXE);
                else $('#txtmswrd').val(" ");

                if (d[i].PO_MSXL_EXE != "")
                    $('#txtexcel').val(d[i].PO_MSXL_EXE);
                else $('#txtexcel').val(" ");

                if (d[i].PO_PDF_EXE != "")
                    $('#txtpdf').val(d[i].PO_PDF_EXE);
                else $('#txtpdf').val(" ");

                if (d[i].INDENT_PRINT_PROG_NM != ""){//$("#Stage").data('kendoDropDownList').Value(LEAD_STG);
                    var drq =  $('#RqPrntPgm').data('kendoDropDownList')
                    drq.text(d[i].INDENT_PRINT_PROG_NM);
                }
                else $('#RqPrntPgm').text(" ");

                if (d[i].REQ_PRN_IND == "1")
                    $('#chksamepgm1').prop("checked", true);
                else $('#chksamepgm1').prop("checked", false);

                if (d[i].PRS_IND == "1")
                    $('#chksaveprnt').prop("checked", true);
                else $('#chksaveprnt').prop("checked", false);

                if (d[i].SG_NM != "")
                    $('#txtsignby').val(d[i].SG_NM);
                else $('#txtsignby').val(" ");

                if (d[i].NG1 == "1")
                    $('#chkprntordr').prop("checked", true);
                else $('#chkprntordr').prop("checked", false);

                if (d[i].NH1 == "1")
                    $('#chkprntrq').prop("checked", true);
                else $('#chkprntrq').prop("checked", false);
           }
        }
    });
}
function showgrid() {
    var grid = $("#GridServiceType").data("kendoGrid");
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var Table = {};
    Table["REQTYPE"] = "LOADPOTYPE";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var ddlsvc = JSON.parse(data);
            grid.dataSource.data(ddlsvc);
        }
    });
}
function fnvalidate() {
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var svcid = $('#txtpoid').val();
    var txtnm = $('#txtponm').val();
    var Table = {};
    Table["REQTYPE"] = "VALIDSAVE";
    Table["COMPID"] = COMPID;
    Table["SVCID"] = svcid;
    Table["txtnm"] = txtnm;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var d = JSON.parse(data);
            if (d == "IDEXIST") {
                debugger;
                    $('#lblMsg1').text("PO Type ID already exist");
                    $('#divMsgAlert').show();
                    $('#txtpoid').val("");
                }
            }
        
        });
}
function fnvalidate1() {
    var COMPID = $('#divPropbox').data('kendoDropDownList').value();
    var svcid = $('#txtpoid').val();
    var txtnm = $('#txtponm').val();
    var Table = {};
    Table["REQTYPE"] = "VALIDSAVE";
    Table["COMPID"] = COMPID;
    Table["SVCID"] = svcid;
    Table["txtnm"] = txtnm;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Purchase_service/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var d = JSON.parse(data);
             if (d == "NMEXIST") {
                $('#lblMsg1').text("PO Type Name already exist");
                $('#divMsgAlert').show();
                $('#txtponm').val("");
            }
        }

    });
}
function fnLoadRate() {
   var data = [{ text: '1', value: '1' }, { text: '2', value: '2' }, { text: '3', value: '3' },
    { text: '4', value: '4' }, { text: '5', value: '5' }, { text: '6', value: '6' }]
   $("#RateDecLen").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: data, height: 100,optionLabel:""});
}


