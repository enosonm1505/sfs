
var SplitSelectedColumn = "";
var SelectedDiscColumn = "";
var Md_Cash = "1";var Md_Comp = "3"; var Md_CC = "2"; var Md_Staff = "6"; var Md_Chq = "5"; var Md_Compli = "7"; var Md_Void = "V"; 
var Md_Mem = "9"; var Md_Forn = "8"; var Md_ToRoom = "4"; var Md_Pay = "M"; var Md_CCoupon = "C"; var Md_FundsTransf = "B";
var Md_PayBill = "Q"; var Md_CashCard = "G";
var sCardNo = "";
var NewMode = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    mode = "NEW";
    $("#divTheme").removeClass("pagefalse");
    $("#OPEN").prop("disabled", true);
    $("#SAVE").prop("disabled", false);
    $("#DELETE").prop("disabled", true);
    $("#VIEW").prop("disabled", true);
    $("#PREV").prop("disabled", false);
    $("#NEW").addClass("ClickBtn");
    $("#OPEN").removeClass("ClickBtn");
    $("#SAVE").removeClass("ClickBtn");
    $("#DELETE").removeClass("ClickBtn");
    $("#VIEW").removeClass("ClickBtn");
    $("#REFRESH").removeClass("ClickBtn");
    $("#PREV").removeClass("ClickBtn");

    EnableMode();
    if (VOUCH_GENERATE_IND == "1")
    {
        $$("txtAdvVoucher").disable();
    }
    else {
        $$("txtAdvVoucher").enable();
    }  

   
};
var OpenMode = function () {
    if (fnChkSessVal() == false) return;
    mode = "OPEN";
    $("#divTheme").removeClass("pagefalse");
    $("#NEW").prop("disabled", true);
    $("#SAVE").prop("disabled", false);
    $("#DELETE").prop("disabled", true);
    $("#VIEW").prop("disabled", true);
    $("#PREV").prop("disabled", false);

    $("#OPEN").addClass("ClickBtn");
    $("#NEW").removeClass("ClickBtn");
    $("#SAVE").removeClass("ClickBtn");
    $("#DELETE").removeClass("ClickBtn");
    $("#VIEW").removeClass("ClickBtn");
    $("#REFRESH").removeClass("ClickBtn");
    $("#PREV").removeClass("ClickBtn");

    $$("txtAccDt").enable();
    $$("ddlAdvVoucherRefund").enable();
    $$("txtAdvVoucher").hide();
    $$("ddlAdvVoucherRefund").show();

    var FirsId = $$("ddlPayMode").getPopup().getList().getFirstId();
    if (FirsId) $$("ddlPayMode").setValue(FirsId);

};
var ViewMode = function () {
    if (fnChkSessVal() == false) return;
    mode = "VIEW";
    $("#divTheme").addClass("pagefalse");
    $("#OPEN").prop("disabled", true);
    $("#NEW").prop("disabled", true);
    $("#SAVE").prop("disabled", true);
    $("#DELETE").prop("disabled", false);
    $("#PREV").prop("disabled", true);

    $("#NEW").removeClass("ClickBtn");
    $("#OPEN").removeClass("ClickBtn");
    $("#SAVE").removeClass("ClickBtn");
    $("#DELETE").removeClass("ClickBtn");
    $("#VIEW").addClass("ClickBtn");
    $("#REFRESH").removeClass("ClickBtn");
    $("#PREV").removeClass("ClickBtn");

    //DisableMode();
    $$("txtAccDt").enable();
    $$("ddlAdvVoucherRefund").enable();
    $$("txtAdvVoucher").hide();
    $$("ddlAdvVoucherRefund").show();
};
var RefreshMode = function () {   
    debugger;
    if (fnChkSessVal() == false) return;
    $("#OPEN").prop("disabled", false);
    $("#NEW").prop("disabled", false);
    $("#VIEW").prop("disabled", false);
    $("#SAVE").prop("disabled", true);
    $("#DELETE").prop("disabled", true);
    $("#PREV").prop("disabled", true);

    $("#NEW").removeClass("ClickBtn");
    $("#OPEN").removeClass("ClickBtn");
    $("#SAVE").removeClass("ClickBtn");
    $("#DELETE").removeClass("ClickBtn");
    $("#VIEW").removeClass("ClickBtn");
    $("#REFRESH").addClass("ClickBtn");
    $("#PREV").removeClass("ClickBtn");
    fnRefresh();
    DisableMode();
};
var DisableMode = function () {
    debugger;    
    $$("txtAccDt").disable();
    $$("txtResNo").disable();
    $$("ChkDeposit").disable();    
    $$("txtAmount").disable();       
    $$("txtNarr").disable();      
    $$("ddlTaxClass").disable();    
    $$("ddlPayMode").disable();    
    $$("ddlTaxId").disable();    
    $$("ddlAdvVoucherRefund").disable();
    $$("txtSACCd").disable();
    $$("txtAdvVoucher").show();
    $$("ddlAdvVoucherRefund").hide();
   
};
var EnableMode = function () {
    $$("txtAccDt").enable();
    $$("txtResNo").enable();
    $$("ChkDeposit").enable();
    $$("txtAmount").enable();
    $$("txtNarr").enable();
    $$("ddlTaxClass").enable();
    $$("ddlPayMode").enable();
    $$("ddlTaxId").enable();
    $$("ddlAdvVoucherRefund").enable();
    $$("txtSACCd").enable();
};
var InitVariables = function () {
    window.K_TAX = "";
    window.IN_GST_IND = "";
    window.G_ADV_EXL = "";
    window.TX_ST_CD = "";
    window.VOUCH_GENERATE_IND = "";
    window.VOUCH_PRINT_IND = "";
    window.MISC_TY_NM = "";
    window.APPL_IND = "";
    window.REV_ID = "";
    window.NA_BNQ_POST_IND = "";
    window.C_NM = "";
    window.P_IND = "";
    window.J3_IND = "";
    window.U1_IND = "";
    window.VAT_RES_ADV_TAX = "";
    window.V1_IND = "";
    window.M_TAX = "";
    window.BQ_TAX_C = "";
    window.TAX_CC_NM = "";   
    window.BQ_HCD = "";
    window.SHOWTGL = "0";
    window.BASE_CURRENCY = "";
    window.CURR_DT = "";
    window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = "";
    window.CURRENCY_DECIMLIMIT = "";
    window.BN_OUTLET_ID = "";
    window.AccDt103 = "";
    window.NAccDate103 = "";
    window.mode = "";
    window.Forn_Tariff_Appl_Ind = "";
    window.TAX_CAPTION = "";
    window.SACCode = "";
    window.C_Reserve_Status = "";
    window.CC_PARTY_ID = "";
    window.C_MISC_TY_IND = "B"
    window.Usr_log_ind = "";
    window.Deposit_Amt = "";
    window.sCheckReserveDate="";
    window.sCheckReserveBy = "";
    window.CancelRes == "";

};
var LoadInds = function (CompId) {
    debugger;
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQ_NM"] = "LOADADVANCEIND";
    var dataparam = JSON.stringify(reqobj);
    dataparam = encodeURIComponent(dataparam);

    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);
            window.K_TAX = Detemp.RA[0].K_TAX;//K_TAX
            window.IN_GST_IND = Detemp.RA[0].IN_GST_IND;//IN_GST_IND
            window.G_ADV_EXL = Detemp.RA[0].G_ADV_EXL;//G_ADV_EXL
            window.TX_ST_CD = Detemp.RA[0].TX_ST_CD;//CompStcd
            window.Usr_log_ind = Detemp.RA[0].R4_ID;
            window.TAX_CAPTION = "VAT";
            if(Detemp.RA[0].A5_ID.toString().trim()) window.TAX_CAPTION = Detemp.RA[0].A5_ID.toString().trim();
            window.VOUCH_GENERATE_IND = Detemp.RA1[0].VOUCH_GENERATE_IND;//C_Vouch_Gen_Ind
            window.VOUCH_PRINT_IND = Detemp.RA1[0].VOUCH_PRINT_IND;//bRep
            window.MISC_TY_NM = Detemp.RA1[0].MISC_TY_NM;//strCaption
            window.APPL_IND = Detemp.RA1[0].APPL_IND;//C_Appl_Ind
            window.REV_ID = Detemp.RA1[0].REV_ID;//Mis_Rev_Id
            window.NA_BNQ_POST_IND = Detemp.RA2[0].NA_BNQ_POST_IND;//C_NA_BNQ_POST_IND
            window.C_NM = Detemp.RA3[0].C_NM;//strVouchPrintPrgNm
            window.P_IND = Detemp.RA3[0].P_IND;//Curappl
            window.J3_IND = Detemp.RA3[0].J3_IND;//vPrintDef
            window.U1_IND = Detemp.RA3[0].U1_IND;//Dep_Appl
            window.VAT_RES_ADV_TAX = Detemp.RA3[0].VAT_RES_ADV_TAX;//DefTaxId
            window.V1_IND = Detemp.RA3[0].V1_IND; //FoGstResAppl
            window.M_TAX = Detemp.RA[0].M_TAX;//GstAppl
            window.CURRENCY_FORMAT = Detemp.RA[0].CURRENCY_FORMAT;
            window.CURRENCY_DELIMIT = Detemp.RA[0].CURRENCY_DELIMIT;
            window.CURRENCY_DECIMLIMIT = Detemp.RA[0].VAL_DECIM_LIMIT;
            window.BASE_CURRENCY = Detemp.RA[0].BASE_CURRENCY_ID.toString().trim();
            window.CURR_DT = Detemp.RA[0].CURDT1;
            window.BN_OUTLET_ID = Detemp.RA3[0].BN_OUTLET_ID.toString().trim();           

            window.Forn_Tariff_Appl_Ind = Detemp.RA[0].FORN_TARIFF_APPL_IND;

            window.BQ_TAX_C = "";
            window.TAX_CC_NM = "";
            if (Detemp.RA4.length > 0) {
                if (Detemp.RA4[0].TAX_CC_ID != null && Detemp.RA4[0].TAX_CC_ID != undefined) window.BQ_TAX_C = Detemp.RA4[0].TAX_CC_ID;//Default Tax Id
                if (Detemp.RA4[0].TAX_CC_NM != null && Detemp.RA4[0].TAX_CC_NM != undefined) window.TAX_CC_NM = Detemp.RA4[0].TAX_CC_NM;//Default Tax Nm                
            }

            window.BQ_HCD = "";
            if (Detemp.RA5.length > 0) {
                if (Detemp.RA5[0].HCD != null && window.BQ_HCD != undefined) window.BQ_HCD = Detemp.RA5[0].HCD;//Default SAC Code
            }
         
            

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
var AccDtLoad = function (CompId) {
    debugger;
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQ_NM"] = "FNACCOUNTDT";
    var dataparam = JSON.stringify(reqobj);
    var Detemp = [];
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            Detemp = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return Detemp;

};
var formatDate=function(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
};
var fnLoadTax = function (CompId) {
    debugger;    
    Request = {
        REQ_NM: "FNADVLOADTAX",
        COMPID: CompId,
    }
    var rowData = [];    
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnLoadTaxClass = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNADVLOADTAXCLASS",
        COMPID: CompId,
        IND_GST_IND: IN_GST_IND,
        K_TAX: K_TAX,
        TAX_CAPTION: TAX_CAPTION
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnLoadCur = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNLOADCUR",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnLoadFoTarCur = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNLOADFOTARCUR",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnGetApplUser = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNGETAPPLUSER",
        COMPID: CompId,
        PRGRMLNKID: "BQMNUTRNBILLCRPRNT"
    }

    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var ResSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ResSrchPop",
        head: " Reservation Search",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 550,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridResSrch",
                    select: 'row',
                    //editable: true,
                    css: "webix_header_border",
                    //scrollX: false,
                    columns: [                            
                            { id: "BLOCK_RESERVE_NO", header:['RES#', {content: "textFilter", }], width: 70, css: { 'text-align': 'center ! important' }, },
                            { id: "GUEST_ID", header: 'GuestId', hidden: true },
                            { id: "GUEST_TYPE", header: 'GuestId', hidden: true },
                            { id: "GUEST_TYPE_NM", header: 'Type', width: 80, css: { 'text-align': 'left ! important' }, hidden: true },
                            { id: "GUEST_NM", header: ['Guest', { content: "textFilter", }], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                            { id: "FUNCTION_NM", header: 'Function', width: 180, css: { 'text-align': 'left ! important' }, },
                            { id: "VENUE_NM", header: 'Venue Name', width: 180, css: { 'text-align': 'left ! important' }, },                            
                            { id: "FUNCTION_ID", header: 'FunctionId', hidden: true },                            
                            { id: "NARRATION", header: 'Narration', hidden: true },
                            { id: "STATUS_IND", header: 'STATUS_IND', hidden: true },
                            { id: "MISC_TRN_NO", header: 'MISC_TRN_NO', hidden: true },
                            { id: "TAX_C", header: 'TAX_C', hidden: true },
                            { id: "HCD", header: 'HCD', hidden: true },
                            { id: "UPDATE_BY", header: 'UPDATE_BY', hidden: true },
                            { id: "UPDATE_DT", header: 'UPDATE_DT', hidden: true },                            

                    ],
                    data: [],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var RowId = selRow.id;
                            fnLoadResData(RowId);
                            $$("ResSrchPop").getTopParentView().hide();
                            
                        },

                        'onItemDblClick': function (id) {
                            debugger;                            
                            fnLoadResData(id);                            
                            $$("ResSrchPop").getTopParentView().hide();

                        },

                    },

                },
                
            ],
        }
    });
};
var ResAdvRefSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ResAdvRefSrchPop",
        head: " Reservation Search",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 550,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridResAdvRefSrch",
                    select: 'row',
                    //editable: true,
                    css: "webix_header_border",
                    //scrollX: false,
                    columns: [
                            { id: "BLOCK_RESERVE_NO", header: ['RES#', { content: "textFilter", }], width: 70, css: { 'text-align': 'center ! important' }, },
                            { id: "GUEST_ID", header: 'GuestId', hidden: true },
                            { id: "GUEST_TYPE", header: 'GuestId', hidden: true },
                            { id: "GUEST_TYPE_NM", header: 'Type', width: 80, css: { 'text-align': 'left ! important' }, hidden: true },
                            { id: "GUEST_NM", header: ['Guest', { content: "textFilter", }], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                            { id: "FUNCTION_NM", header: 'Function', width: 180, css: { 'text-align': 'left ! important' }, },
                            { id: "VENUE_NM", header: 'Venue Name', width: 180, css: { 'text-align': 'left ! important' }, },
                            { id: "FUNCTION_ID", header: 'FunctionId', hidden: true },
                            { id: "NARRATION", header: 'Narration', hidden: true },
                            { id: "STATUS_IND", header: 'STATUS_IND', hidden: true },
                            //{ id: "MISC_TRN_NO", header: 'MISC_TRN_NO', hidden: true },
                            //{ id: "TAX_C", header: 'TAX_C', hidden: true },
                            //{ id: "HCD", header: 'HCD', hidden: true },
                            { id: "UPDATE_BY", header: 'UPDATE_BY', hidden: true },
                            { id: "UPDATE_DT", header: 'UPDATE_DT', hidden: true },
                          

                    ],
                    data: [],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var RowId = selRow.id;
                            fnLoadResRefData(RowId);
                            $$("ResAdvRefSrchPop").getTopParentView().hide();

                        },

                        'onItemDblClick': function (id) {
                            debugger;
                            fnLoadResRefData(id);
                            $$("ResAdvRefSrchPop").getTopParentView().hide();

                        },

                    },

                },

            ],
        }
    });
};
var fnChkBillRaised = function (RES_NO) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNBILLSETTRAISED",
        COMPID: CompId,
        RES_NO: RES_NO,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var ResSrchLoadData = function (CompId) {
    debugger;
    $("#LoadDIv").show();
    var ChkDeposit = $$("ChkDeposit").getValue();
    Request = {
        REQ_NM: "FNLOADADVREFUNDRESV",
        COMPID: CompId,
        ChkDeposit: ChkDeposit
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;

            if (data != "") {
                rowData = JSON.parse(data);
                if (ChkDeposit == "1")
                {
                    $$("gridResAdvRefSrch").parse(rowData);
                    $$("gridResAdvRefSrch").refresh();
                    if ($$("gridResAdvRefSrch").count()) {
                        $$("gridResAdvRefSrch").select($$("gridResAdvRefSrch").getFirstId());
                    }
                    $$("ResAdvRefSrchPop").show();
                    webix.UIManager.setFocus($$("gridResAdvRefSrch"));
                }
                else
                {
                    $$("gridResSrch").parse(rowData);
                    $$("gridResSrch").refresh();
                    if ($$("gridResSrch").count()) {
                        $$("gridResSrch").select($$("gridResSrch").getFirstId());
                    }
                    $$("ResSrchPop").show();
                    webix.UIManager.setFocus($$("gridResSrch"));
                }

            }
            $("#LoadDIv").hide();
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#LoadDIv").hide();
            
        }
    });
    return rowData;
}
var fnOpenResPop = function () {
    var bVal = fnIsValidDt();
    if (bVal == false) return;
    var vCompId = $$("Property").getValue();
    $$("gridResSrch").clearAll();
    $$("gridResSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("gridResAdvRefSrch").clearAll();
    $$("gridResAdvRefSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    ResSrchLoadData(vCompId);
    
};
var fnIsValidDt = function () {
    debugger;
    if ($$("txtAccDt").getValue() == "") {
        webix.message({ type: 'warning', text: 'Account Dt cannot be empty' });
        webix.UIManager.setFocus($$("txtAccDt"));
        return false;
    }

    var vBillDt = $$("txtAccDt").getValue();

    CompId = $$("Property").getValue();

    var vAccLd = AccDtLoad(CompId);
    var vAccDt = vAccLd.Acc_Dt103;
    vAccDt = formatDate(vAccDt);
    vAccDt = vAccDt.replace("-", "");
    vAccDt = vAccDt.replace("-", "");
    vAccDt = parseFloat(vAccDt);

    vBillDt = formatDate(vBillDt);
    vBillDt = vBillDt.replace("-", "");
    vBillDt = vBillDt.replace("-", "");
    vBillDt = parseFloat(vBillDt);

    if (vBillDt < vAccDt) {
        webix.message({ type: 'warning', text: 'Night Audit Started. Please Reload the screen.' });
        return false
    }
    return true;
};
function fnFloatText(code, e, vText) {
    debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    //var dotPos = vText.indexOf(".");

    if (charCode == 46 || charCode == 37 || charCode == 39 || charCode == 190 || charCode == 110) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        debugger;
        //if (e.target.selectionStart >= dotPos+3 && dotPos==3) {
        //    return false;
        //}
        //else
        return true;
    }
};
var fnloadAdvRefVoucherDet = function (VouchNo) {
    debugger;
    if (VouchNo == "") return;
    var compId = $$("Property").getValue();
    var ResNo = ""; var GstTypeNm = ""; var GstNm = ""; var ResNarr = ""; var StatusInd = "";
    var TAX_C = ""; var HCD = ""; var D1_IND = ""; var SETL_MODE_ID = ""; var Amt = "0"; var RetAmt = "0";
    var CC_PARTY_ID = ""; var PARTY_NM = ""; var CC_E_DT = ""; var CC_NO = ""; CURRENCY_ID = "";
    var CONV_RATE = ""; var FORN_AMT = ""; var TAX_ID = ""; var BANK_NM = "";
    window.C_Reserve_Status = "";
    $$("txtGstNm").setValue("");
    $$("txtAdvance").setValue("");
    $$("txtNarr").setValue("");
    $$("txtGstType").setValue("");
    $$("txtSACCd").setValue("");
    $$("ddlTaxClass").setValue("");
    $$("txtResNo").setValue("");
    $$("ddlTaxId").setValue("");
    $$("txtAmount").setValue("");
    $$("txtRetAmount").setValue("");
    $$("ChkDeposit").setValue(0);
    window.SACCode = "";
    window.CC_PARTY_ID = "";
    window.Deposit_Amt = "0";
    window.sCheckReserveDate = "";
    window.sCheckReserveBy = "";
    window.CancelRes == "";

    if (mode == "OPEN") {                        
        $$("txtAmount").enable();
        $$("txtRetAmount").enable();
        $$("txtNarr").enable();
        $$("ddlTaxClass").enable();
        $$("ddlPayMode").enable();
        $$("ddlTaxId").enable();        
        $$("txtSACCd").enable();
    }
    Request = {
        REQ_NM: "FNLOADADVREFVOUCHERDET",
        COMPID: compId,
        TRN_NO: VouchNo,
        MISC_TY_ID:"H"        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0)
                {
                    if (rowData[0].RESERVE_NO) ResNo = rowData[0].RESERVE_NO;
                    if (rowData[0].GUEST_TYPE_NM) GstTypeNm = rowData[0].GUEST_TYPE_NM;
                    if (rowData[0].GUEST_NM) GstNm = rowData[0].GUEST_NM;
                    ResNarr = rowData[0].NARRATION;
                    StatusInd = rowData[0].STATUS_IND;
                    TAX_C = rowData[0].TAX_C;
                    HCD = rowData[0].HCD;
                    D1_IND = rowData[0].D1_IND;
                    SETL_MODE_ID = rowData[0].SETL_MODE_ID;
                    CC_PARTY_ID = rowData[0].CC_PARTY_ID;
                    PARTY_NM = rowData[0].PARTY_NM;
                    CC_E_DT = rowData[0].CC_E_DT1;
                    CC_NO = rowData[0].CC_NO;
                    CURRENCY_ID = rowData[0].CURRENCY_ID;
                    CONV_RATE = rowData[0].CONV_RATE;
                    BANK_NM = rowData[0].BANK_NM;
                    if (rowData[0].FORN_AMT) FORN_AMT = rowData[0].FORN_AMT;
                    TAX_ID = rowData[0].TAX_ID;
                    if (D1_IND == "1") $$("ChkDeposit").setValue(1);
                    Amt = rowData[0].AMT;
                    RetAmt = rowData[0].RETENTION_AMT;
                    UPDATE_BY = rowData[0].UPDATE_BY;
                    UPDATE_DT = rowData[0].UPDATE_DT;

                    if (ResNo != "") {
                        $$("txtResNo").setValue(ResNo);
                        $$("txtGstType").setValue(GstTypeNm);
                        $$("txtGstNm").setValue(GstNm);
                        $$("txtNarr").setValue(ResNarr);
                        window.C_Reserve_Status = StatusInd;
                        Request = {
                            REQ_NM: "FNLOADDEPAMT",
                            COMPID: compId,
                            RES_NO: ResNo,
                            CHKDEPOSIT: D1_IND
                        }
                        var rowData = [];
                        requestData = JSON.stringify(Request);
                        requestData = encodeURIComponent(requestData);
                        $.ajax({
                            async: false,
                            url: "/BQRes/API_CALL",
                            type: 'POST',
                            data: "request=" + requestData,
                            success: function (data) {
                                debugger;
                                if (data != "") {
                                    rowData = JSON.parse(data);
                                    $$("txtAdvance").setValue(rowData);

                                }
                            },
                            error: function (request, status, error) {
                                console.log("Error Failrue");
                            }
                        });

                    }

                    $$("txtAmount").setValue(Amt);
                    $$("txtRetAmount").setValue(RetAmt);
                    window.Deposit_Amt = Amt;
                    window.RetAmt = RetAmt;
                    window.sCheckReserveDate = UPDATE_DT;
                    window.sCheckReserveBy = UPDATE_BY;

                    debugger;
                    if (IN_GST_IND == "1") {
                        if (HCD != "") {
                            $$("txtSACCd").setValue(HCD);
                            $$("txtSACCd").disable();
                            $$("ddlTaxClass").setValue(TAX_C);
                            $$("ddlTaxClass").disable();
                        }
                        else {
                            $$("txtSACCd").setValue(BQ_HCD);
                            $$("txtSACCd").enable();
                            $$("ddlTaxClass").setValue(window.BQ_TAX_C);
                            $$("ddlTaxClass").enable();
                        }
                    }
                    else if (TAX_C != "") {
                        $$("txtSACCd").setValue(HCD);
                        $$("txtSACCd").disable();
                        $$("ddlTaxClass").setValue(TAX_C);
                        $$("ddlTaxClass").disable();
                    }
                    else {

                        $$("txtSACCd").setValue(BQ_HCD);
                        $$("txtSACCd").enable();
                        $$("ddlTaxClass").setValue(window.BQ_TAX_C);
                        $$("ddlTaxClass").enable();
                    }

                    $$("ddlPayMode").setValue(SETL_MODE_ID);

                    if(SETL_MODE_ID=="2")
                    {
                        $$("txtCC_CardNo").setValue(CC_NO);
                        $$("txtCC_Company").setValue(PARTY_NM);
                        if (CC_E_DT != "") {
                            CC_E_DT = new Date(CC_E_DT);
                            $$("scCCExpDt").setValue(CC_E_DT);
                        }
                        $$("txtCCAuthNo").setValue(BANK_NM);
                        window.CC_PARTY_ID=CC_PARTY_ID;
                        if(CURRENCY_ID!="" && CURRENCY_ID!=BASE_CURRENCY && P_IND == "1")
                        {
                            $$("ddlCrCdCurr").setValue(CURRENCY_ID);
                            $$("txtCrCdCurrEq").setValue(FORN_AMT);
                            $$("txtCrCdconvrt").setValue(CONV_RATE);
                            fnFrnAmtChange("2");
                        }
                    }
                    else if(SETL_MODE_ID=="3")
                    {
                        $$("txtComp_Comp").setValue(PARTY_NM);
                        window.CC_PARTY_ID = CC_PARTY_ID;
                    }
                    else if (SETL_MODE_ID == "5") {
                        $$("txtCHQ_ChqNo").setValue(CC_NO);
                        $$("txtCHQ_Bank").setValue(BANK_NM);
                        if (CURRENCY_ID != "" && CURRENCY_ID != BASE_CURRENCY && P_IND == "1") {
                            $$("ddlCrCurr").setValue(CURRENCY_ID);
                            $$("txtCrCurrEq").setValue(FORN_AMT);
                            $$("txtconvrt").setValue(CONV_RATE);
                            fnFrnAmtChange("5");
                        }
                    }
                    else if (SETL_MODE_ID == "8") {                       
                        $$("ddlCurr").setValue(CURRENCY_ID);
                        $$("txtEqvAmt").setValue(FORN_AMT);
                        $$("txtFEX_ConvRate").setValue(CONV_RATE);
                        fnFrnAmtChange("8");
                    }
                    else if (SETL_MODE_ID == "B") {
                        $$("txtBankNm").setValue(BANK_NM);
                        $$("txtBankAcNo").setValue(CC_NO);
                        if (CC_E_DT != "") {
                            CC_E_DT = new Date(CC_E_DT);
                            $$("scDepositDt").setValue(CC_E_DT);
                        }
                    }
                    else if (SETL_MODE_ID == "Q") {
                        $$("txtPB_Company").setValue(PARTY_NM);
                        $$("txtPB_TrnID").setValue(CC_NO);
                        $$("txtPB_Mob").setValue(BANK_NM);
                        if (CC_E_DT != "") {
                            CC_E_DT = new Date(CC_E_DT);
                            $$("scDepositDt").setValue(CC_E_DT);
                        }
                        window.CC_PARTY_ID = CC_PARTY_ID;
                    }
                    $$("txtAmount").setValue(Amt);
                    
                    if(V1_IND=="1" && M_TAX =="1" )
                    {
                        if (TAX_ID != "") {
                            $$("ddlTaxId").setValue(TAX_ID);
                        }
                        else {

                        }
                    }
                } 
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });


};
var SacSrchWindowLoad = function () {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SacSrchPop",
        head: " SAC Search",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 550,
        move: true,        
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridSacSrch",
                    select: 'row',
                    fixedRowHeight: false,
                    css: "webix_header_border",
                    columns: [
                            { id: "ID", header: ['SAC', {content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "NM", header: ['Services', { content: "textFilter", }], fillspace:true, css: { 'text-align': 'left ! important' }, },
                            { id: "HCD_TYPE", hidden: true },
                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            SacSrchRet(id);
                            $$("SacSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var SacSrchRet = function (RowId) {
    debugger;
    var selRow = $$("gridSacSrch").getItem(RowId);
    var vId = selRow.ID;
    var vNm = selRow.NM;
    var vSTy = selRow.HCD_TYPE;
    $$("txtSACCd").setValue(vId);
    window.SACCode = vId;
};
var SacSrchLoadData = function () {
    debugger;
    $("#LoadDIv").show();

    $$("gridSacSrch").clearAll();
    $$("gridSacSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "IMGSAC",
        COMPID: CompId,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.Itm.length > 0) {
                    $$("gridSacSrch").parse(rowData.Itm);
                    $$("gridSacSrch").adjustRowHeight("NM",true);
                    $$("gridSacSrch").refresh();                    
                    if ($$("gridSacSrch").count()) {
                        $$("gridSacSrch").select($$("gridSacSrch").getFirstId());
                    }
                    webix.UIManager.setFocus($$("gridSacSrch"));
                }
            }
            $("#LoadDIv").hide();
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#LoadDIv").hide();
        }
    });
    
};
var fnBtnSacSrchClick = function () {
    if (fnChkSessVal() == false) return;
    SacSrchLoadData();
    $$("SacSrchPop").show();
};
var fnLoadResData = function (RowId) {
    debugger;
    $$("txtGstNm").setValue("");
    $$("txtAdvance").setValue("");
    $$("txtNarr").setValue("");
    $$("txtGstType").setValue("");
    $$("txtSACCd").setValue("");
    $$("ddlTaxClass").setValue("");
    $$("ddlTaxId").setValue("");
    $$("txtAmount").setValue("");    
    window.SACCode = "";
    window.C_Reserve_Status = "";
    window.CC_PARTY_ID = "";
    window.sCheckReserveDate = "";
    window.sCheckReserveBy = "";
    window.CancelRes == "";
   
    var selRow = $$("gridResSrch").getItem(RowId);
    var ResNo = selRow.BLOCK_RESERVE_NO;
    var GstId = selRow.GUEST_ID;
    var GstNm = selRow.GUEST_NM;
    var GstTypeNm = selRow.GUEST_TYPE_NM;
    var GstTyId = selRow.GUEST_TYPE;
    var FnId = selRow.FUNCTION_ID;
    var ResNarr = selRow.NARRATION;
    var StatusInd = selRow.STATUS_IND;
    var CompId = $$("Property").getValue();
    var MISC_TRN_NO = selRow.MISC_TRN_NO;
    var TAX_C = selRow.TAX_C;
    var HCD = selRow.HCD;

    $$("txtResNo").setValue(ResNo);
    $$("txtGstType").setValue(GstTypeNm);
    $$("txtGstNm").setValue(GstNm);
    $$("txtNarr").setValue(ResNarr);
   // $$("txtAdvVoucher").setValue(MISC_TRN_NO);
    window.C_Reserve_Status = StatusInd;
    CHKDEPOSIT = $$("ChkDeposit").getValue();
    window.sCheckReserveDate = selRow.UPDATE_DT;
    window.sCheckReserveBy = selRow.UPDATE_BY;
    debugger;
    if (MISC_TRN_NO != "") {
        if (IN_GST_IND=="1")
        {
            if (HCD.toString().trim() != "") {
                $$("txtSACCd").setValue(HCD.toString().trim());
                $$("txtSACCd").disable();
                $$("ddlTaxClass").setValue(TAX_C.toString().trim());
                $$("ddlTaxClass").disable();
            }
            else {
                $$("txtSACCd").setValue(BQ_HCD);
                $$("txtSACCd").enable();
                $$("ddlTaxClass").setValue(window.BQ_TAX_C);
                $$("ddlTaxClass").enable();
            }
        }
        else if (TAX_C.toString().trim() != "")
        {
            $$("txtSACCd").setValue(HCD.toString().trim());
            $$("txtSACCd").disable();
            $$("ddlTaxClass").setValue(TAX_C.toString().trim());
            $$("ddlTaxClass").disable();
        }
        else {

            $$("txtSACCd").setValue(BQ_HCD);
            $$("txtSACCd").enable();
            $$("ddlTaxClass").setValue(window.BQ_TAX_C);
            $$("ddlTaxClass").enable();
        }
        
    }
    else {
        $$("txtSACCd").setValue(BQ_HCD);
        $$("txtSACCd").enable();
        $$("ddlTaxClass").setValue(window.BQ_TAX_C);
        $$("ddlTaxClass").enable();
    }

    Request = {
        REQ_NM: "FNLOADDEPAMT",
        COMPID: CompId,
        RES_NO: ResNo,
        CHKDEPOSIT: CHKDEPOSIT
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("txtAdvance").setValue(rowData);
                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });    
    
};
var fnLoadResRefData = function (RowId) {
    debugger;
    $$("txtGstNm").setValue("");
    $$("txtAdvance").setValue("");
    $$("txtNarr").setValue("");
    $$("txtGstType").setValue("");
    $$("txtSACCd").setValue("");
    $$("ddlTaxClass").setValue("");
    $$("ddlTaxId").setValue("");
    $$("txtAmount").setValue("");
    window.SACCode = "";
    window.C_Reserve_Status = "";
    window.CC_PARTY_ID = "";
    window.sCheckReserveDate = "";
    window.sCheckReserveBy = "";
    window.CancelRes == "";

    var selRow = $$("gridResAdvRefSrch").getItem(RowId);
    var ResNo = selRow.BLOCK_RESERVE_NO;
    var GstId = selRow.GUEST_ID;
    var GstNm = selRow.GUEST_NM;
    var GstTypeNm = selRow.GUEST_TYPE_NM;
    var GstTyId = selRow.GUEST_TYPE;
    var FnId = selRow.FUNCTION_ID;
    var ResNarr = selRow.NARRATION;
    var StatusInd = selRow.STATUS_IND;
    var CompId = $$("Property").getValue();
    var MISC_TRN_NO = "";
    var TAX_C = "";
    var HCD = "";
    var MISC_TRN_NO = selRow.MISC_TRN_NO;
    //var TAX_C = selRow.TAX_C;
    //var HCD = selRow.HCD;


    $$("txtResNo").setValue(ResNo);
    $$("txtGstType").setValue(GstTypeNm);
    $$("txtGstNm").setValue(GstNm);
    $$("txtNarr").setValue(ResNarr);
    window.C_Reserve_Status = StatusInd;
    CHKDEPOSIT = $$("ChkDeposit").getValue();
    window.sCheckReserveDate = selRow.UPDATE_DT;
    window.sCheckReserveBy = selRow.UPDATE_BY;
    debugger;
    if (MISC_TRN_NO != "") {
        if (IN_GST_IND == "1") {
            if (HCD.toString().trim() != "") {
                $$("txtSACCd").setValue(HCD.toString().trim());
                $$("txtSACCd").disable();
                $$("ddlTaxClass").setValue(TAX_C.toString().trim());
                $$("ddlTaxClass").disable();
            }
            else {
                $$("txtSACCd").setValue(BQ_HCD);
                $$("txtSACCd").enable();
                $$("ddlTaxClass").setValue(window.BQ_TAX_C);
                $$("ddlTaxClass").enable();
            }
        }
        else if (TAX_C.toString().trim() != "") {
            $$("txtSACCd").setValue(HCD.toString().trim());
            $$("txtSACCd").disable();
            $$("ddlTaxClass").setValue(TAX_C.toString().trim());
            $$("ddlTaxClass").disable();
        }
        else {

            $$("txtSACCd").setValue(BQ_HCD);
            $$("txtSACCd").enable();
            $$("ddlTaxClass").setValue(window.BQ_TAX_C);
            $$("ddlTaxClass").enable();
        }

    }
    else {
        $$("txtSACCd").setValue(BQ_HCD);
        $$("txtSACCd").enable();
        $$("ddlTaxClass").setValue(window.BQ_TAX_C);
        $$("ddlTaxClass").enable();
    }

    Request = {
        REQ_NM: "FNLOADDEPAMT",
        COMPID: CompId,
        RES_NO: ResNo,
        CHKDEPOSIT: CHKDEPOSIT
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("txtAdvance").setValue(rowData);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

};
var fnSettleModeChange = function (settleMde) {
    debugger;
    fnDisableAllMode();
    $$("txtCash_Narr").setValue("");
    $$("txtComp_Comp").setValue();
    $$("txtCC_CardNo").setValue("");
    $$("txtCC_Company").setValue("");
    $$("scCCExpDt").setValue("");
    $$("txtCCAuthNo").setValue("");
    $$("txtCHQ_Bank").setValue("");
    $$("txtCHQ_ChqNo").setValue("");
    //$$("scChqDt").setValue("");
    $$("ddlCrCurr").setValue("");
    $$("txtCrCurrEq").setValue("");
    $$("txtconvrt").setValue("");
    $$("txtPB_Company").setValue("");
    $$("txtPB_TrnID").setValue("");
    $$("scDepDt").setValue("");
    $$("txtPB_Mob").setValue("");
    $$("txtPB_Depstr").setValue("");
    $$("txtBankNm").setValue("");
    $$("txtBankAcNo").setValue("");
    $$("scDepositDt").setValue("");
    $$("txtFEX_ConvRate").setValue("");
    $$("ddlCurr").setValue("");
    $$("txtEqvAmt").setValue("");    
    $$("txtCrCdCurrEq").setValue("");    
    $$("txtCrCdconvrt").setValue("");
    if (mode != "VIEW") $$("txtAmount").enable();

    fnDisDet(settleMde);
};
var fnDisableAllMode = function () {
    debugger;
    $$("fmCash").hide()    
    $$("fmCreditCard").hide();
    $$("fmCompany").hide();    
    $$("fmCheque").hide();        
    $$("fmFExch").hide();            
    $$("fmFund").hide();
    $$("fmPayBill").hide();
};
var fnDisDet = function (settleMde) {
    debugger;
    fnDisableAllMode();
    window.CC_PARTY_ID = "";

    switch (settleMde) {
        case Md_Cash:
            //$$("fmCash").show()
            //$$("txtCash_Narr").setValue("");
            break;        
        case Md_Comp:
            $$("fmCompany").show();
            if (mode == "VIEW") $$("fmCompany").disable();
            else $$("fmCompany").enable();
            $$("txtComp_Comp").setValue();            
            Cur_Comp_Id = "";
            break;
        case Md_CC:
            $$("fmCreditCard").show();
            if (mode == "VIEW") $$("fmCreditCard").disable();
            else $$("fmCreditCard").enable();
            $$("txtCC_CardNo").setValue("");
            $$("txtCC_Company").setValue("");
            $$("scCCExpDt").setValue("");
            $$("txtCCAuthNo").setValue("");
            $$("txtCrCdCurrEq").setValue("");
            $$("txtCrCdCurrEq").hide();
            $$("txtCrCdconvrt").setValue("");
            $$("txtCrCdconvrt").hide();
            $$("ddlCrCdCurr").hide();
            if (P_IND == "1") {
                $$("ddlCrCdCurr").show();
            }
            $$("ddlCrCdCurr").setValue(BASE_CURRENCY);                       
            break;
        
        case Md_Chq:
            $$("fmCheque").show();
            if (mode == "VIEW") $$("fmCheque").disable();
            else $$("fmCheque").enable();
            $$("txtCHQ_Bank").setValue("");
            $$("txtCHQ_ChqNo").setValue("");
            //$$("scChqDt").setValue("");
            $$("ddlCrCurr").setValue("");
            $$("txtCrCurrEq").setValue("");
            $$("txtconvrt").setValue("");            
            $$("txtCrCurrEq").hide();
            $$("txtconvrt").hide();
            $$("ddlCrCurr").hide();
            if (P_IND == "1") {
                $$("ddlCrCurr").show();
            }
            $$("ddlCrCurr").setValue(BASE_CURRENCY);            
            break;       
       
        case Md_PayBill:
            $$("fmPayBill").show();
            if (mode == "VIEW") $$("fmPayBill").disable();
            else $$("fmPayBill").enable();
            $$("txtPB_Company").setValue("");
            $$("txtPB_TrnID").setValue("");
            $$("scDepDt").setValue("");
            $$("txtPB_Mob").setValue("");
            $$("txtPB_Depstr").setValue("");
            break;
        case Md_FundsTransf:
            $$("fmFund").show();
            if (mode == "VIEW") $$("fmFund").disable();
            else $$("fmFund").enable();
            $$("txtBankNm").setValue("");
            $$("txtBankAcNo").setValue("");
            $$("scDepositDt").setValue("");
            break;        
        case Md_Forn:
            $$("fmFExch").show();
            if (mode == "VIEW") $$("fmFExch").disable();
            else $$("fmFExch").enable();
            $$("txtFEX_ConvRate").setValue("");
            $$("ddlCurr").setValue("");
            $$("txtEqvAmt").setValue("");
            $$("txtAmount").disable();
            $$("txtAmount").setValue("0");
            
        default:
    }


};
var CompSrchWindowLoad = function () {
    debugger;
    webix.ui({
        view: "window",
        //close: true,
        modal: true,
        id: "CompSrchPop",
        head: {

            view: "toolbar", css: "webix_toolar webix_win_head", elements: [
                { id: "CmpSrchWindowTiltle", template: "Company Search", css: "webix_view webix_header webix_win_title windowHead " },
                {
                    view: "icon", icon: "wxi-close", click: function () {
                        $$("CompSrchPop").hide();
                    }
                }
            ]
        },
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 450,
        move: true,

        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridCompSrch",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [
                            { id: "ixCompId", header: [{ content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "ixCompNm", header: [{ content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixPId", hidden: true },
                            { id: "ixDepend", hidden: true },
                            { id: "ixDpSrno", hidden: true },
                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            CompSrchRet(id);
                            $$("CompSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var CompSrchLoadData = function (PARTY_TYPE, UnApproveInd) {
    debugger;
    $$("gridCompSrch").clearAll();
    $$("gridCompSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADCOMPSRCHDATA",
        COMPID: CompId,
        PARTY_TYPE: PARTY_TYPE,
        UnApproveInd: UnApproveInd,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    $$("gridCompSrch").parse(rowData);
                    $$("gridCompSrch").refresh();
                    if ($$("gridCompSrch").count()) {
                        $$("gridCompSrch").select($$("gridCompSrch").getFirstId());
                    }
                    webix.UIManager.setFocus($$("gridCompSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnBtnCreditCardSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("CREDITCARD", "1");
    SrchType = "CREDITCARD";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Company Search");
    $$("CompSrchPop").show();
};
var CompSrchRet = function (RowId) {
    debugger;
    window.CC_PARTY_ID = "";
    var selRow = $$("gridCompSrch").getItem(RowId);
    var vId = selRow.ixCompId;
    var vNm = selRow.ixCompNm;
    var vSId = selRow.ixPId;
    var vDepNm = selRow.ixDepend;
    var vDepSrNo = selRow.ixDpSrno;
    if (SrchType == "CREDITCARD") {
        window.CC_PARTY_ID = vId;
        $$("txtCC_Company").setValue(vNm)
        $$("txtCC_CardNo").setValue("");
        //fnStoreToSpread(Md_CC);        
    }
    
    else if (SrchType == "PARTY") {
        window.CC_PARTY_ID = vId;
        $$("txtComp_Comp").setValue(vNm)
        //var vNarr = $$("txtComp_Comp").getValue() + " (Cmp Id:" + vId + ")";
        //$$("txtComp_Narr").setValue(vNarr);
        //fnStoreToSpread(Md_CC);
    }
    else if (SrchType == "GUEST") {
        if (fnChkValidToRmGst(vId) == false) return;
        Cur_Room_No = vId;
        $$("txtRoom_Guest").setValue(vNm);
        $$("txtRoom_No").setValue(vId);
    }
    else if (SrchType == "PAY BILL") {
        window.CC_PARTY_ID = vId;
        $$("txtPB_Company").setValue(vNm)
        //fnStoreToSpread(Md_CC);
    }     

};
var fnBtnCompSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("PARTY", "1");
    SrchType = "PARTY";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Company Search");
    $$("CompSrchPop").show();
};
var fnBtnPBCompSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("PAY BILL", "1");
    SrchType = "PAY BILL";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Pay Bill");
    $$("CompSrchPop").show();
};
var fnddlCrCurrChange = function () {
    debugger;
    var Temp_Bal_Amt = "";
    var Temp_Cur_Amt = "";
    var Temp_Mode_Text = "";
    var vCurrId = $$("ddlCrCurr").getValue();
    
    var vFrnAmt = "";
    var vFExConvRt = "";
    var vBaseFexVal = 0;
    var Temp_Cur_Amt = 0;
    var vConvRate = 0;
    var vDecLen = 0;

    var newData = 0;
    if (vCurrId != "") {
        var gridCurr = $$("gridCurr").serialize();
        if (gridCurr.length > 0) {
            newData = gridCurr.filter(function (el) {
                return el.id == vCurrId;
            });
        }

        if (newData.length > 0) {
            debugger;
            $$("txtCrCurrEq").setValue("0");
            if (newData[0].SALE_CONV_RATE) vConvRate = newData[0].SALE_CONV_RATE;
            $$("txtconvrt").setValue(vConvRate);

            if (vCurrId != window.BASE_CURRENCY) {
                $$("txtCrCurrEq").show();
                $$("txtconvrt").show();
                $$("txtAmount").disable();
            }
            else {
                $$("txtCrCurrEq").hide();
                $$("txtconvrt").hide();
                if (mode != "VIEW") $$("txtAmount").enable();
            }

        }
        fnFrnAmtChange("5");
    }    

};
var fnMandatory = function() {
    debugger;

    if (fnIsValidDt() == false) return false;

    if (mode == "NEW") {
        if (VOUCH_GENERATE_IND == "0" || VOUCH_GENERATE_IND == "") {
            if ($$("txtAdvVoucher").getValue()) {
                webix.message({ type: 'warning', text: 'Voucher No. cannot be empty' });
                webix.UIManager.setFocus($$("txtAdvVoucher"));
                return false;
            }
        }
        if ($$("txtResNo").getValue()=="") {
            webix.message({ type: 'warning', text: 'Reservation No. cannot be empty' });
            webix.UIManager.setFocus($$("txtResNo"));
            return false;
        }
    }
    if (mode == "OPEN") {
        if ($$("ddlAdvVoucherRefund").getValue()=="") {
            webix.message({ type: 'warning', text: 'Voucher No. cannot be empty' });
            webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
            return false;
        }
    }

    if (IN_GST_IND == "1" && $$("ChkDeposit").getValue() == "0") {
        if ($$("txtSACCd").getValue() == "") {
            webix.message({ type: 'warning', text: 'SAC Code cannot be empty' });
            webix.UIManager.setFocus($$("txtSACCd"));
            return false;
        }

        if ($$("ddlTaxClass").getValue() == "") {
            webix.message({ type: 'warning', text: 'Tax Class cannot be empty' });
            webix.UIManager.setFocus($$("ddlTaxClass"));
            return false;
        }
        else if (K_TAX == "2" || K_TAX == 3) {
            if ($$("ChkDeposit").getValue() == "0") {
                webix.message({ type: 'warning', text: 'Tax Class cannot be empty' });
                webix.UIManager.setFocus($$("ddlTaxClass"));
                return false;
            }
        }
    }
    if (window.C_Reserve_Status == "8") {
        webix.message({ type: 'warning', text: 'Reservation is Closed' });
        if (mode == "OPEN") webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
        else webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }
    if (C_Reserve_Status == "9") {
        webix.message({ type: 'warning', text: 'Reservation is Cancelled' });
        if (mode == "OPEN") webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
        else webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }
    var vPartyId = ""; var vCCNo = ""; var vBankNm = ""; var VCurId = ""; var vFornAmt = ""; vConvRate = "";
    var PayMode = $$("ddlPayMode").getValue();


    if (!($$("txtAmount").getValue()) || $$("txtAmount").getValue()==0)
    {        
        webix.message({ type: 'warning', text: 'Amount cannot be empty' });
        webix.UIManager.setFocus($$("txtAmount"));
        return false;        
    }

    var AMOUNT = $$("txtAmount").getValue();
    var ADVAMOUNT = $$("txtAdvance").getValue();
    var RETENTION_AMT = $$("txtRetAmount").getValue();
    if (RETENTION_AMT == "") RETENTION_AMT = 0;
    var Ret_Amt = window.RetAmt;
    if (Ret_Amt == "" || Ret_Amt == undefined) Ret_Amt = 0;

    var DepAmt = window.Deposit_Amt;
    if (DepAmt == "" || DepAmt == undefined) DepAmt = 0;

    var Totamt = parseFloat(RETENTION_AMT) + parseFloat(AMOUNT);
  
    if (Totamt - parseFloat(Ret_Amt) - parseFloat(DepAmt) > parseFloat(ADVAMOUNT)) {
        webix.message({ type: 'warning', text: 'Amount exceeds the Advance amount' });
        webix.UIManager.setFocus($$("txtAmount"));
        return false;
    }
    if(PayMode=="" || PayMode==null || PayMode == undefined)
    {            
        webix.message({ type: 'warning', text: 'Payment Mode cannot be empty' });
        webix.UIManager.setFocus($$("ddlTaxClass"));
        return false;
    }
    
    switch (PayMode) {
        case Md_Cash:
            return true;
            break;

        case Md_Comp:
            vPartyId = $$("txtComp_Comp").getValue();
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Company cannot be empty' });
                webix.UIManager.setFocus($$("txtComp_Comp"));
                return false;
            }
            break;
        case Md_CC:
            vCCNo = $$("txtCC_CardNo").getValue();
            vPartyId = $$("txtCC_Company").getValue();
            VCurId = $$("ddlCrCdCurr").getValue();
            vFornAmt = $$("txtCrCdCurrEq").getValue();
            vConvRate = $$("txtCrCdconvrt").getValue();
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'CC Company cannot be empty ' });
                webix.UIManager.setFocus($$("txtCC_Company"));
                return false;
            }
            if (vCCNo == "") {
                webix.message({ type: 'warning', text: 'CC No cannot be empty' });
                webix.UIManager.setFocus($$("txtCC_CardNo"));
                return false;
            }
            debugger;
            if (VCurId != "" && VCurId != window.BASE_CURRENCY) {
                if (vFornAmt == "") vFornAmt = 0;
                vFornAmt = parseFloat(vFornAmt);
                if (vFornAmt == 0) {
                    webix.message({ type: 'warning', text: 'Foreign Amt cannot be empty' });
                    webix.UIManager.setFocus($$("txtCrCdCurrEq"));
                    return false;
                }

                if (vConvRate == "") {
                    webix.message({ type: 'warning', text: 'Conversion Rate can not be empty' });
                    webix.UIManager.setFocus($$("txtCrCdconvrt"));
                    return false;
                }
            }
            break;

        case Md_Chq:
            vChqNo = $$("txtCHQ_ChqNo").getValue();
            vBankNm = $$("txtCHQ_Bank").getValue();
            VCurId = $$("ddlCrCurr").getValue();
            vFornAmt = $$("txtCrCurrEq").getValue();
            vConvRate = $$("txtconvrt").getValue();
            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'Chque No cannot be empty' });
                webix.UIManager.setFocus($$("txtCHQ_ChqNo"));
                return false;
            }
            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Bank Name cannot be empty' });
                webix.UIManager.setFocus($$("txtCHQ_Bank"));
                return false;
            }
            debugger;
            if (VCurId != "" && VCurId != window.BASE_CURRENCY) {
                if (vFornAmt == "") vFornAmt = 0;
                vFornAmt = parseFloat(vFornAmt);
                if (vFornAmt == 0) {
                    webix.message({ type: 'warning', text: 'Foreign Amt cannot be empty' });
                    webix.UIManager.setFocus($$("txtCrCurrEq"));
                    return false;
                }

                if (vConvRate == "") {
                    webix.message({ type: 'warning', text: 'Conversion Rate can not be empty' });
                    webix.UIManager.setFocus($$("txtconvrt"));
                    return false;
                }
            }
            break;
        case Md_Forn:
            VCurId = $$("ddlCurr").getValue();
            vFornAmt = $$("txtEqvAmt").getValue();
            vConvRate = $$("txtFEX_ConvRate").getValue();            
            if (VCurId == "") {
                webix.message({ type: 'warning', text: 'Currency ID cannot be empty' });
                webix.UIManager.setFocus($$("ddlCurr"));
                return false;
            }
            if (vFornAmt == "") vFornAmt = 0;
            vFornAmt = parseFloat(vFornAmt);
            if (vFornAmt == 0) {
                webix.message({ type: 'warning', text: 'Foreign Amt cannot be empty' });
                webix.UIManager.setFocus($$("txtEqvAmt"));
                return false;
            }

            if (vConvRate == "") {
                webix.message({ type: 'warning', text: 'Conversion Rate cannot be empty' });
                webix.UIManager.setFocus($$("txtFEX_ConvRate"));
                return false;
            }
            break;
        case Md_FundsTransf:
            vChqNo = $$("txtBankAcNo").getValue();
            vBankNm = $$("txtBankNm").getValue();
            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Bank Name cannot be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("txtBankNm"));
                return false;
            }
            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'A/C No cannot be empty' });
                webix.UIManager.setFocus($$("txtBankAcNo"));
                return false;
            }
            break;
        case Md_PayBill:
            vNarr = $$("scDepDt").getValue();
            vPartyId = $$("txtPB_Company").getValue();
            vChqNo = $$("txtPB_TrnID").getValue();
            vBankNm = $$("txtPB_Mob").getValue();

            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Pay Bill Company cannot be empty ' });
                webix.UIManager.setFocus($$("txtPB_Company"));
                return false;
            }

            if (vNarr == "") {
                webix.message({ type: 'warning', text: 'Deposit Date cannot be empty' });
                webix.UIManager.setFocus($$("scDepDt"));
                return false;
            }

            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'Transaction ID cannot be empty' });
                webix.UIManager.setFocus($$("txtPB_TrnID"));
                return false;
            }

            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Mobile No cannot be empty' });
                webix.UIManager.setFocus($$("txtPB_Mob"));
                return false;
            }

        default:
            return true;
    }
    return true;
};
var fnAdvanceRefundSave = function () {
    debugger;


    var ACC_DT = $$("txtAccDt").getValue();
    var ChkDeposit = $$("ChkDeposit").getValue();
    var RES_NO = $$("txtResNo").getValue();
    var MISC_TY_ID = "H";// "B";
    var AMOUNT = $$("txtAmount").getValue();
    var ADVAMOUNT = $$("txtAdvance").getValue();
    //    var RETENTION_AMT = "0";
    var RETENTION_AMT = $$("txtRetAmount").getValue();
    var RET_AMT = window.RetAmt;
    var SETTLE_MODE = $$("ddlPayMode").getValue();
    var VOUCH_NO ="";
    if (VOUCH_GENERATE_IND == "0" && mode=="NEW")
    {
        VOUCH_NO = $$("txtAdvVoucher").getValue();
    }
    var HCD = $$("txtSACCd").getValue();
    var TAX_C = $$("ddlTaxClass").getValue();
    var NARRATION = $$("txtNarr").getValue();
    var GUEST_NM = $$("txtGstNm").getValue();
    var TAXID = $$("ddlTaxId").getValue();
    var C_PARTY_ID=""
    var CURRENCY_ID = ""
    var CONV_RATE = ""
    var FORN_AMT = "";
    var CC_NO = "";
    var CC_E_DT = "";
    var PARTY_NM = "";
    var TRN_NO = $$("ddlAdvVoucherRefund").getValue();
    var  MISC_TRN_NO=$$("txtAdvVoucher").getValue();
   
   
    

    switch (SETTLE_MODE) {
        case Md_Comp:
            C_PARTY_ID = CC_PARTY_ID;
            break;
        case Md_CC:
            C_PARTY_ID = CC_PARTY_ID;
            CC_NO = $$("txtCC_CardNo").getValue();            
            CURRENCY_ID = $$("ddlCrCdCurr").getValue();
            FORN_AMT = $$("txtCrCdCurrEq").getValue();
            CONV_RATE = $$("txtCrCdconvrt").getValue();
            PARTY_NM = $$("txtCCAuthNo").getValue();
            var myformat = webix.Date.dateToStr("%d/%m/%Y");
            var textStr = $$("scCCExpDt").config.value;
            var textStr1 = myformat(textStr);
            CC_E_DT = textStr1;
            break;
        case Md_Chq:
            C_PARTY_ID = CC_PARTY_ID;
            CC_NO = $$("txtCHQ_ChqNo").getValue();
            PARTY_NM = $$("txtCHQ_Bank").getValue();
            CURRENCY_ID = $$("ddlCrCurr").getValue();
            FORN_AMT = $$("txtCrCurrEq").getValue();
            CONV_RATE = $$("txtconvrt").getValue();            
            break;
        case Md_Forn:
            CURRENCY_ID = $$("ddlCurr").getValue();
            FORN_AMT = $$("txtEqvAmt").getValue();
            CONV_RATE = $$("txtFEX_ConvRate").getValue();            
            break;
        case Md_FundsTransf:
            CC_NO = $$("txtBankAcNo").getValue();
            PARTY_NM = $$("txtBankNm").getValue();
            CC_E_DT = $$("scDepositDt").getText();            
            break;
        case Md_PayBill:
            CC_E_DT = $$("scDepDt").getText();
            C_PARTY_ID = CC_PARTY_ID;
            CC_NO = $$("txtPB_TrnID").getValue();
            PARTY_NM = $$("txtPB_Mob").getValue();
            break;
    }

    var CompId = $$("Property").getValue();
    $("#LoadDIv").show();
    Request = {
        REQ_NM: "FNSAVEADVANCEREFUND",
        COMPID: CompId,
        ACC_DT: ACC_DT,
        Mode: mode,
        MISC_TRN_NO: MISC_TRN_NO,
        TRN_NO:TRN_NO,
        ChkDeposit: ChkDeposit,
        DEPOSIT_AMT:window.Deposit_Amt,
        RES_NO : RES_NO, 
        MISC_TY_ID : MISC_TY_ID,
        RETENTION_AMT: RETENTION_AMT,
        ADVAMOUNT:ADVAMOUNT,
        AMOUNT: AMOUNT,
        RET_AMT: RET_AMT,
        SETTLE_MODE : SETTLE_MODE,
        VOUCH_NO :VOUCH_NO,
        HCD : HCD, 
        TAX_C : TAX_C, 
        NARRATION :NARRATION,
        GUEST_NM : GUEST_NM,
        TAXID : TAXID,
        CC_PARTY_ID: C_PARTY_ID,
        CURRENCY_ID : CURRENCY_ID,
        CONV_RATE : CONV_RATE,
        FORN_AMT : FORN_AMT,
        CC_NO : CC_NO,
        CC_E_DT : CC_E_DT,
        PARTY_NM: PARTY_NM,
        MISC_TRN_NO: MISC_TRN_NO,
        sCheckReserveDate: sCheckReserveDate,
        sCheckReserveBy: sCheckReserveBy
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.response == "1")
                {
                    if(mode=="NEW")
                    {
                        $$("txtAdvVoucher").setValue(rowData.C_Disp_No);
                    }  
                    $("#LoadDIv").hide();
                    //webix.alert({
                    //    type: 'success',
                    //    ok: "OK",
                    //    text: "Saved Successfully"
                    //}).then(function () {
                    //    debugger;
                    //    RefreshMode();
                    //})
                   fnCallPrint(rowData.TRN_NO);
                    RefreshMode();
                }
                else {
                    if (rowData.Message != "") {
                        webix.message({
                            type: 'warning',
                            text: rowData.Message
                        })
                        $("#LoadDIv").hide();
                    }
                    else {
                        webix.message({
                            type: 'warning',
                            text: 'Error on Saving'
                        })
                        $("#LoadDIv").hide();
                    }
                }
            }
            else {
                webix.message({
                    type: 'warning',
                    text: 'Error on Saving'
                })
                $("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#LoadDIv").hide();
        }
    });

}
var fnddlCrCdCurrChange = function () {
    debugger;
    var Temp_Bal_Amt = "";
    var Temp_Cur_Amt = "";
    var Temp_Mode_Text = "";
    var vCurrId = $$("ddlCrCdCurr").getValue();

    var vFrnAmt = "";
    var vFExConvRt = "";
    var vBaseFexVal = 0;
    var Temp_Cur_Amt = 0;
    var vConvRate = 0;
    var vDecLen = 0;


    if (vCurrId != "") {
        var gridCurr = $$("gridCurr").serialize();
        if (gridCurr.length > 0) {
            newData = gridCurr.filter(function (el) {
                return el.id == vCurrId;
            });
        }

        if (newData.length > 0) {
            debugger;
            $$("txtCrCdCurrEq").setValue("0");
            if (newData[0].SALE_CONV_RATE) vConvRate = newData[0].SALE_CONV_RATE;
            $$("txtconvrt").setValue(vConvRate);

            if (vCurrId != window.BASE_CURRENCY) {
                $$("txtCrCdCurrEq").show();
                $$("txtAmount").disable();
                $$("txtCrCdconvrt").show();
            }
            else {
                $$("txtCrCdCurrEq").hide();
                $$("txtCrCdconvrt").hide();
                if(mode!="VIEW") $$("txtAmount").enable();
            }

        }
        fnFrnAmtChange("2");
    }


};
var fnddlCurrChange = function () {
    var Temp_Bal_Amt = "";
    var Temp_Cur_Amt = "";
    var Temp_Mode_Text = "";
    var vCurrId = $$("ddlCurr").getValue();
    var newData = [];

    
    
    if (vCurrId != "") {
        var gridCurr = $$("gridCurr").serialize();
        if (gridCurr.length > 0) {
            newData = gridCurr.filter(function (el) {
                return el.id == vCurrId;
            });
        }

        if (newData.length > 0) {
            debugger;
            var vConvRate = 0;
            var vDecLen = 0;
            if (newData[0].SALE_CONV_RATE) vConvRate = newData[0].SALE_CONV_RATE;
            $$("txtFEX_ConvRate").setValue(vConvRate); 
            
        }
        fnFrnAmtChange("8");
    }

    
};
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
     //debugger;

    if (value == null) return "";

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
            //if (x.indexOf('.') > 0) {
            //    afterPoint = x.substring(x.indexOf('.') + 1, x.length);
            //    afterPoint = CurrDelimit + afterPoint
            //}
            //x = Math.floor(x);
            var vArr = x.split('.');
            x = vArr[0].toString().trim();
            afterPoint = vArr[1].toString().trim();
            afterPoint = CurrDelimit + afterPoint

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
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
function fnCurrFormat(value) {

    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    var CurrDecimal = window.CURRENCY_DECIMLIMIT;
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};
var fnbtnNarrClick = function () {
    var ResNarr = $$("lblnar").getValue(ResNarr);
    if (ResNarr == "") return false;
    $$("txtNarr").setValue(ResNarr);
    $$("NarrPop").show();
};
var NarrPopWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "NarrPop",
        head: "Narration",
        position: "center",
        css: "WebIxStyle",
        height: 200,
        width: 250,
        move: true,
        body: {
            padding: { top: 10, left: 10, bottom: 20, right: 10 },
            rows: [
                    { view: "textarea", id: "txtNarr", label: "", laelWidth: 0, attributes:{ maxlength:60 },readonly:true },                    
                    //{
                    //    cols: [{}, {
                    //        view: "button", type: "icon", id: "OkNarr", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                    //        click: function () {
                    //            $$("NarrPop").hide();
                    //            $$("lblnar").setValue($$("txtNarr").getValue());
                    //        }
                    //    }],
                    //}
            ]
        }
    });
};
var fnClearCont = function () {
    debugger;
    window.SACCode = "";
    window.C_Reserve_Status = "";    
    window.CC_PARTY_ID = "";
    $$("txtResNo").setValue("");
    $$("txtGstType").setValue("");
    $$("txtGstNm").setValue("");
    $$("txtAdvance").setValue("");
    //$$("txtAccDt").setValue("");
    $$("txtAmount").setValue("");
    $$("txtRetAmount").setValue("");
    $$("ChkDeposit").setValue(0);
    $$("txtNarr").setValue("");
    $$("ddlTaxId").setValue("");
    $$("ddlAdvVoucherRefund").setValue("");
    $$("txtAdvVoucher").setValue("");
    $$("ddlTaxClass").setValue("");
    $$("txtSACCd").setValue("");
    window.Deposit_Amt = "0";
    window.sCheckReserveDate = "";
    window.sCheckReserveBy = "";
    window.CancelRes = "";

    $$("ddlPayMode").setValue("");
    
    $$("txtCash_Narr").setValue("");
    $$("txtComp_Comp").setValue();
    $$("txtCC_CardNo").setValue("");
    $$("txtCC_Company").setValue("");
    $$("scCCExpDt").setValue("");
    $$("txtCCAuthNo").setValue("");
    $$("txtCHQ_Bank").setValue("");
    $$("txtCHQ_ChqNo").setValue("");
    
    $$("ddlCrCurr").setValue("");
    $$("txtCrCurrEq").setValue("");
    $$("txtconvrt").setValue("");
    $$("txtPB_Company").setValue("");
    $$("txtPB_TrnID").setValue("");
    $$("scDepDt").setValue("");
    $$("txtPB_Mob").setValue("");
    $$("txtPB_Depstr").setValue("");
    $$("txtBankNm").setValue("");
    $$("txtBankAcNo").setValue("");
    $$("scDepositDt").setValue("");
    $$("txtFEX_ConvRate").setValue("");
    $$("ddlCurr").setValue("");
    $$("txtEqvAmt").setValue("");
    document.getElementById('lblAvailAdv').innerHTML = "Available Adv";
    fnDisableAllMode();

};
var fnRefresh = function () {
    if (fnChkSessVal() == false) return;
    fnClearCont();    
    webix.UIManager.setFocus($$("txtResNo"));   
    //window.location.reload();
};
var fnFrnAmtChange = function (vType) {
    debugger;
    var vConvRt = "";
    var vFAmt = "";
    var vRetAmt = 0;
    if (vType == "2") {
        vConvRt = $$("txtCrCdconvrt").getValue();
        vFAmt = $$("txtCrCdCurrEq").getValue();
        if (vConvRt == "") vConvRt = 0;
        if (vFAmt == "") vFAmt = 0;
        vRetAmt = parseFloat(vFAmt) * parseFloat(vConvRt);
    }
    else if (vType == "5") {
        vConvRt = $$("txtconvrt").getValue();
        vFAmt = $$("txtCrCurrEq").getValue();
        if (vConvRt == "") vConvRt = 0;
        if (vFAmt == "") vFAmt = 0;
        vRetAmt = parseFloat(vFAmt) * parseFloat(vConvRt);
    }
    else if (vType == "8") {
        vConvRt = $$("txtFEX_ConvRate").getValue();
        vFAmt = $$("txtEqvAmt").getValue();
        if (vConvRt == "") vConvRt = 0;
        if (vFAmt == "") vFAmt = 0;
        vRetAmt = parseFloat(vFAmt) * parseFloat(vConvRt);
    }

    $$("txtAmount").setValue(vRetAmt);

};
var fnVoucherLoad = function (ddlids) {
    debugger;
    var DateVal = $$("txtAccDt").getValue();
    var compId = $$("Property").getValue();
    
    var obj = {};
    obj["COMPID"] = compId;
    obj["REQ_NM"] = "DROP_DOWN";
    obj["DROP_DWN"] = ddlids;
    obj["Date"] = DateVal;
    var dataparam = JSON.stringify(obj);
    
    var rowData = [];
    
    
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            var ddlgrid = JSON.parse(d);
            //ddlVoucherNo
            $.each(ddlgrid, function (key, value) {
                debugger;
                var Rows = [];
                var set = {};
                $.each(value, function (key1, value1) {
                    set = {
                        id: $.trim(value1.ITEM_VAL), value:$.trim(value1.ITEM_NM)
                    };
                    Rows.push(set);
                });                
                $$(key).define("options", Rows);
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
var fnChkDepositClick = function () {
    var CompId = $$("Property").getValue();
    var CHKDEPOSIT = $$("ChkDeposit").getValue();
    var ResNo = $$("txtResNo").getValue();
    $$("txtAdvance").setValue(0);
    if (ResNo != "") {
        Request = {
            REQ_NM: "FNLOADDEPAMT",
            COMPID: CompId,
            RES_NO: ResNo,
            CHKDEPOSIT: CHKDEPOSIT
        }
        var rowData = [];
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);
        $.ajax({
            async: false,
            url: "/BQRes/API_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (data) {
                debugger;
                if (data != "") {
                    rowData = JSON.parse(data);
                    $$("txtAdvance").setValue(rowData);

                }
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
            }
        });
    }

    if (CHKDEPOSIT == "1") {
        $("#DivSACCD").hide();
        $("#DivTC").hide();
        document.getElementById('lblAvailAdv').innerHTML = "Available Deposit";
    }
    else {
        if (IN_GST_IND == "1") {
            $("#DivSACCD").show();
            $("#DivTC").show();
        }
        else if (K_TAX == "2" || K_TAX == "3") {
            $("#DivSACCD").hide();
            $("#DivTC").show();
        }
        else if (K_TAX == "4") {
            $("#DivSACCD").hide();
            $("#DivTC").hide();
        }
        else {
            $("#DivSACCD").hide();
            $("#DivTC").hide();
        }

        document.getElementById('lblAvailAdv').innerHTML = "Available Adv";
    }
};
var CancelResWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CancelResPop",
        position: "center",
        css: "WebIxStyle",
        height: 150,
        width: 450,
        move: true,
        body: {
            rows: [
                { view: "text", id: "txtCancResPop", label: "Cancel Reason", labelWidth: 120, attributes: { maxlength: 60 } },
                {
                    margin: 10, padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{
                        view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80,
                        click: function () { fnCancelResOkClick(); }, align: "right"
                    }
                    ]
                }
            ],
        }
    });
};
var fnCancelResOkClick = function () {
    var CanRes = $$("txtCancResPop").getValue();
    if (CanRes == "") {
        webix.message({ type: 'warning', text: "Cancel Reason cann't be empty" });
        return false;
    }
    window.CancelRes=CanRes;
    $$("CancelResPop").hide();
    fnAdvDelete();
}

function fnCancelBtnClick() {
    debugger;
    if (fnChkSessVal() == false) return;
    var bVal = true;
    var vNarr = "";

    if ($$("ddlAdvVoucherRefund").getValue() == "") {
        webix.message({ type: 'warning', text: 'Voucher No. cannot be empty' });
        webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
        return false;
    }

    if (window.C_Reserve_Status == "8") {
        webix.message({ type: 'warning', text: 'Reservation is Closed' });
        if (mode == "OPEN") webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
        else webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }
    if (C_Reserve_Status == "9") {
        webix.message({ type: 'warning', text: 'Reservation is Cancelled' });
        if (mode == "OPEN") webix.UIManager.setFocus($$("ddlAdvVoucherRefund"));
        else webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }

    webix.confirm({
        title: "Confirmation",
        ok: "Yes", cancel: "No",
        text: "Are you sure you want to Delete?",
    })
    .then(function (result) {
        debugger;
        if (result == true) {
            if (window.CancelRes == "") {
                $$("txtCancResPop").setValue("");
                $$("CancelResPop").show();
                return false;
            }
            else {
                fnAdvDelete();
            }            
        }
    });    

};
var fnAdvDelete = function () {
    if (fnChkSessVal() == false) return;
    var ACC_DT = $$("txtAccDt").getValue();
    var ChkDeposit = $$("ChkDeposit").getValue();
    var RES_NO = $$("txtResNo").getValue();
    var MISC_TY_ID = "H";
    var AMOUNT = $$("txtAmount").getValue();
    var RET_AMT = window.RetAmt;
    var SETTLE_MODE = $$("ddlPayMode").getValue();
    var NARRATION = $$("txtNarr").getValue();
    var TRN_NO = $$("ddlAdvVoucherRefund").getValue();

    var CompId = $$("Property").getValue();
    $("#LoadDIv").show();
    Request = {
        REQ_NM: "FNADVREFDELETE",
        COMPID: CompId,
        ACC_DT: ACC_DT,
        Mode: mode,
        TRN_NO: TRN_NO,
        ChkDeposit: ChkDeposit,
        DEPOSIT_AMT: window.Deposit_Amt,
        RES_NO: RES_NO,
        MISC_TY_ID: MISC_TY_ID,
        AMOUNT: AMOUNT,
        RET_AMT:RET_AMT,
        SETTLE_MODE: SETTLE_MODE,
        NARRATION: NARRATION,
        sCheckReserveDate: sCheckReserveDate,
        sCheckReserveBy: sCheckReserveBy,
        CanReason: CancelRes
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.response == "1") {
                    webix.message({
                        type: 'success',
                        text: 'Deleted Successfully'

                    })
                    RefreshMode();
                    $("#LoadDIv").hide();
                }
                else {
                    if (rowData.Message != "") {
                        webix.message({
                            type: 'warning',
                            text: rowData.Message
                        })
                        $("#LoadDIv").hide();
                    }
                    else {
                        webix.message({
                            type: 'warning',
                            text: 'Error on Deletion'
                        })
                        $("#LoadDIv").hide();
                    }
                }
            }
            else {
                webix.message({
                    type: 'warning',
                    text: 'Error on Deletion'
                })
                $("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#LoadDIv").hide();
        }
    });



};

function fnCallPrint(vBillNo) {
    debugger;
    var bVal = false;
    var PrintFlNm = "";

    PrintFlNm = window.BILL_PROG_NM;
    var CompId = $$("Property").getValue().toString().trim();

    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }
    //var vBillNo = $$("txtBillNo").getValue();
    var vBillTy = "B";

    var Host = window.location.host;
    var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";
    var Mleft = (screen.width / 2) - (840 / 2);
    var Mtop = (screen.height / 2) - (550 / 2);
    window.open(PageUrl + "?BILLNO=" + vBillNo + "&BillTy=" + vBillTy + "&COMPID=" + CompId + "&RPT=" + "BQBILL", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)


};


function fnChkSessVal() {
    debugger;
    var bVal = "0";
    $.ajax({
        async: false,
        url: "/BQBill/fnChkSessionval",
        type: 'POST',
        success: function (data) {
            debugger;
            if (data == "1") {
                bVal = "1";
            }
        },
        error: function (request, status, error) {
            bVal = "0";
        }
    });
    if (bVal == "1") return true;
    else {
        debugger;
        var Host = window.location.host;
        var LoadingUrl = "http://" + Host + "/Login.aspx";
        window.location.href = LoadingUrl;
    }

};


function fnCallPrint(TRN_NO) {

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
                                    label: "Saved Successfully",
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
                                            PrintFlNm = window.C_NM;

                                            var MiscBillNo = TRN_NO;
										
                                            debugger
                                            if ($$("ChkPrint").getValue() == "1") {
                                                var CompId = $$("Property").getValue();
                                                var Host = window.location.host;
                                                var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";
                                                var Mleft = (screen.width / 2) - (840 / 2);
                                                var Mtop = (screen.height / 2) - (550 / 2);
                                               window.open(PageUrl + "?MISCBILLNO=" + MiscBillNo + "&COMPID=" + CompId + "&RPT=" + "BQADVRFD", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)
												//window.open('/BQPdfOpen.aspx?MISCBILLNO="+ MiscBillNo + "&COMPID=WS&&RPT=" + "BQADVRFD" + "','_blank','width=840px,height=550,scrollbars=yes,top=\'+Mtop+\',left=\'+Mleft+\'',0)", true);
                                            }
                                            $$("PopupSuccess").hide();
                                        }
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    });
    $$("PopupSuccess").show();
}



