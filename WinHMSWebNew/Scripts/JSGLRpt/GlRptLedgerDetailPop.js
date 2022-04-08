

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect",hidden:true, id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
     
        container: "divLedger", view: 'text', readonly: true, id: "txtLedger", on: { onChange: function (newVal, OldVal) { } },
    });
    
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "FromDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    webix.ui({
        container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    });
    webix.ui({ container: "DivPerdSel", id: "btnPerdSel", view: "button", inputWidth: 30, width: 30, icon: 'wxi-search', type: 'icon', click: function () { fnLoadPeriodPop(); } });
    webix.ui({ container: "divBtnDisplay", id: "btnDispay", view: "button", inputWidth: 60, label: "Display", click: function () { fnLoadGrid(); } });
  
    webix.ui({ container: "divCummBal", width: 250, view: "checkbox", id: "ChkCummBal", hidden:true,label: "Cummulative Balance", customCheckbox: false, disabled: true, value: "0", click: function () { GridClear(); } });
    webix.ui({ container: "divDayTotal", width: 250, view: "checkbox",hidden:true, id: "ChkDayTotal", label: "Day Total", customCheckbox: false, value: "1", disabled: true, click: function () { GridClear(); } });
    

};
function fnLoadPeriodPop() {
    $$("PeriodPopup").show();
    $$("dtPeriodPop").select($$("dtPeriodPop").getFirstId());
    webix.UIManager.setFocus($$("dtPeriodPop"));
    $$("dtPeriodPop").moveSelection("top");
}
function fnFromDtChange() {
    debugger;
    GridClear();
    //var vStartDt = window.FiscalStartDT;
    //vStartDt = vStartDt.replace(/-/g, '');
    //vStartDt = parseFloat(vStartDt);
    var NewDt = $$("FromDt").getValue();
    var NewToDt = $$("ToDt").getValue();
    if (NewDt !=null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);
        
        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("ToDt").setValue($$("FromDt").getValue());
            }
        }
    }    

}
function fnToDtChange() {
    debugger;
    GridClear();    
    var NewDt = $$("FromDt").getValue();
    var NewToDt = $$("ToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);
        
        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("FromDt").setValue($$("ToDt").getValue());
            }
        }
    }

}

function GridDesign() {    
    webix.ui({
        id: "gridRpt",
        container: "divGrid",
        select: 'row',
        view: "datatable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        resizeColumn: true,
        resizeRow: true,
        spans: true,
        navigation: true,        
        position: "flex",
        css: "webix_header_border wingrd_hight",
        data: [],
        columns: [
                { id: "ixVouchDt", header: 'Vouch Dt',  width: 120, css: { 'text-align': 'center ! important', }, },
                { id: "ixVouchNo", header: 'Vouch No.',  width: 100, css: { 'text-align': 'center ! important', }, },
                { id: "ixDet", header: 'Particulars', width: 400, },
                
                { id: "ixTrnTyp", header: { text: "Trn Type", }, width: 120, css: { 'text-align': 'left ! important', } },
                { id: "ixTrnId", header: { text: "Trn Id", }, width: 120, hidden: true },
                { id: "ixTrnIdSrno", header: { text: "Trn Id Srno", }, width: 120, hidden: true },
                { id: "ixAcId1", header: { text: "Acc Id", }, width: 120, hidden: true },
                { id: "IXDRAMT", header: 'DR_Amt', width: 120, css: { 'text-align': 'right ! important', },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                { id: "IXCRAMT", header: 'CR_Amt', width: 120, css: { 'text-align': 'right ! important', },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
               
                
                { id: "ixComNarCol", header: { text: "Common Narration", }, width: 200,  hidden: true },
                { id: "ixVouchType", header: { text: "Vouch Type", }, width: 90, hidden: true },
                { id: "ixDIV", header: { text: "Division", }, width: 90,  hidden: true },
                { id: "CLR", header: { text: "CLR", },  hidden: true },

        ],
        data: [],
        on: {

            'onItemDblClick': function (id) {
                debugger;
                  fnRowDblClick(id); 

                
            },
        },
        scheme: {
            $change: function (item) {
                
                if (item.CLR != "" && item.CLR != null) {
                    debugger;
                    var Columns = $$('gridRpt').config.columns;
                    var ColCnt = Columns.length;
                    var rowid = item.id;
                    if (item.CLR == "LedGroup") {
                        debugger;
                        //$$("gridRpt").addSpan(item.id, "ixVouchDt", 3, 1, null, "LedGroup");
                        //$$("gridRpt").refresh(item.id);
                        $$("gridRpt").addCellCss(rowid, "ixVouchDt", "LedGroup");                        
                    }
                    else if (item.CLR == "DetHead") {                        
                        $$("gridRpt").addCellCss(rowid, "ixDet", "DetHead");
                    }
                    else if(item.CLR =="TYRALIGN"){
                        $$("gridRpt").addCellCss(rowid, "ixTrnTyp", "StrRAlign");
                    }
                    else {
                        debugger;
                        item.$css = item.CLR;
                    }
                }
            },

        },
        

    });   
};
function fnRowDblClick(RowId) {
    debugger;
    var selRow = $$("gridRpt").getItem(RowId);
    var TRN_IDD = selRow.ixTrnId;
    var Narration = selRow.ixComNarCol;
    var AC_NM = selRow.ixDet;
    var VouchNo = selRow.ixVouchNo;
    var Date = selRow.ixVouchDt;
    if (TRN_IDD == "" || TRN_IDD == null) return;
    $.ajax({
        type: "POST",
        url: "/GLReports/OpenTransaction",
        cache: false,
        charset: 'utf-8',
        data: "ID=" + TRN_IDD,
        success: function (data) {

        }
    });
    
    Window1 = window.open("/GLTransaction/Transaction?Page=2&PageLoadMethod=1&OpenTrnId=" + TRN_IDD + "&TranDate=" + Date + "&VouchNo=" + VouchNo + "", "PopupWindow", "width=1100,height=560,left=30,top=50");
    return true;
    //}          

}
function fnPropertyLoad(CompId) {
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNPROPERTYLOAD",
        COMPID: CompId,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("Property").define("options", rowData)
            }
        },
    });

    //return rowData;
};
function GridClear() {
    $$("gridRpt").clearAll();
}
function fnPropChange(CompId) {
    debugger;
    fnLondGlInitCont(CompId);
    GridClear();
  
    fnPeriodLoad();
   // fnShowColumn();
   

};






function fnLondGlInitCont(CompId) {

  
  //  $$("txtLedger").setValue("");
   
    GridClear();

    window.GL_CompanyID = "";
    window.FiscalFromDt = "";
    window.FiscalToDt = "";
    window.LedgerIds = "";
    window.VchTyIds = "";
    window.AC_CD_IND = "0";
    window.GSTAppl = "0";
    window.DIV_APPL_IND = "0";
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNLONDGLINITCONT",
        COMPID: CompId,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.GL_CompanyID = rowData.GL_CompanyID;
              
                var dtComp = rowData.dtComp;
                var dtCont = rowData.dtCont;
               
                window.AC_CD_IND = dtCont[0].AC_CD_IND;
                window.GSTAppl = dtComp[0].GL_VAT_IND;
                window.DIV_APPL_IND = dtCont[0].DIV_APPL_IND;
                $("#CURRENCY_FORMAT").val(dtComp[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(dtComp[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(dtComp[0].VAL_DECIM_LIMIT);




            }
        },
    });


    var rowData = [];
    Request = {
        REQTYPE: "GET_FNLOADFISCALSTARTDTENDDT",
        COMPID: CompId,
        FiscalYear: window.FiscalYear,
        GL_CompanyID: window.GL_CompanyID
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.FiscalStartDT = rowData.FiscalFromDt;
                window.FiscalFromDt = rowData.PeriodStartDt;
                window.FiscalToDt = rowData.PeriodEndDt;
                $$("FromDt").setValue(rowData.FiscalFromDt);
                $$("ToDt").setValue(rowData.FiscalToDt);

                $$("FromDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                $$("FromDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                $$("FromDt").refresh();

                $$("ToDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                $$("ToDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                $$("ToDt").refresh();
            }
        },
    });

    

  
}

function fnPeriodLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_GLPERIODLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                //$$("ddlGroup").getList().config.yCount = 12;
                $$("dtPeriodPop").clearAll();
                $$("dtPeriodPop").parse(rowData);
                $$("dtPeriodPop").refresh();
            }
        },
    });

    //return rowData;
}

function PeriodPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "PeriodPopup",
        head: "Period",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtPeriodPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Period Name",], id: "PERIOD_NM",fillspace:true, width: 140, css: { 'text-align': 'left ! important' } },
                       { header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Period Date", }, "From"], id: "PERIOD_START_DT", width: 100, css: { 'text-align': 'center ! important' }, },
                       { header: [null, "To"], id: "PERIOD_END_DT", width: 100, css: { 'text-align': 'center ! important' }, },
                       { header: "Period Sno", id: "PERIOD_SNO", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "Period Sno", id: "PERIOD_START_DT1", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "Period Sno", id: "PERIOD_END_DT1", hidden: true, css: { 'text-align': 'center ! important' } },
                       
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id) {
                        debugger;                        
                        //var selRow = this.getItem(id);
                        //var PerStDt = selRow.PERIOD_START_DT1;
                        //var PerEndDt = selRow.PERIOD_END_DT1;
                        //$$("FromDt").setValue(PerStDt);
                        //$$("ToDt").setValue(PerEndDt);
                        //$$("PeriodPopup").hide();
                        fnPeriodOkClick(id);
                    },
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
                        var rowid = selRow.id;
                        var charCode = e.which || e.keyCode;
                        if (charCode == '13') {                                                        
                            this.callEvent("onItemDblClick", [rowid]);
                        }                        
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        //debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                        {
                            view: "button",
                            type: "icon",
                            icon: "wxi-check",
                            label: "Ok",
                            inputWidth: 80,
                            click: function () {
                                debugger;
                                if ($$("dtPeriodPop").count()) {
                                    var selRow = $$("dtPeriodPop").getSelectedItem();
                                    var id = selRow.id;
                                    fnPeriodOkClick(id);
                                    
                                }                                
                            },
                            align: "right"
                        }
                ]
            }
            ],

        }
    });
};

function fnPeriodOkClick(Rowid) {
    GridClear();
    var selRow = $$("dtPeriodPop").getItem(Rowid);
    var PerStDt = selRow.PERIOD_START_DT1;
    var PerEndDt = selRow.PERIOD_END_DT1;
    $$("FromDt").setValue(PerStDt);
    $$("ToDt").setValue(PerEndDt);
    $$("PeriodPopup").hide();
}
function fnLoadGrid() {
    debugger;
    $$("gridRpt").clearAll();   
    $("#LoadDIv").show();
        
   // var DivId = $$("txtDivId").getValue();
    var DivId = "";
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();    
    var FVtype = "";
    var Crdr = "0";
    var sAmt = "";
    var svdt = "";
    var chkDr = "1";
    var chkCr = "1";
    var ids = "'" + window.opener.document.getElementById('AC_IDD').defaultValue + "'";//window.LedgerIds;
    var GrpIds = "";//window.GroupIds;
    var LvlIds = "";
    var chksup = "1";
    var chkClBal = "0";
   // if (DivId == "<-ALL->") DivId = "";
    CompId = $$("Property").getValue();
    var ReqNm = "";
    //if (chksup == 1) ReqNm = "GET_LOADRPTCURRENTLEDGER"
    //else ReqNm = "GET_LOADRPTCURRENTLEDGERSUMM"
    ReqNm = "GET_LOADRPTLEDGERDETAILPOP"

    bComCol = "0";
    bNarCol = "0";
    bGst = "0";
    bFoCol = "0";
    bFo = "1";
    bVch = "0";
    bNa = "1";
    bCo = "1";
    bCoS = "0";
    bCh = "1";
    bBill = "1";
    bGr = "0";
    bRecon = "0";
    bOrd = "1";
    bDayTot = "1";
    debugger;
    Request = {        
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        DIVID: DivId,
        SEL_VOUCH_TY: FVtype,
        STARTDT : window.FiscalFromDt,
        FROMDT: FromDt,
        TODT: ToDt,
        TODT: ToDt,
        CRDR: Crdr,
        SAMT: sAmt,
        SVDT: svdt,
        CHKDR: chkDr,
        CHKCR: chkCr,
        LEDGER_ID: ids,
        GROUP_ID: GrpIds,
        LEVEL_ID: LvlIds,
        chksup: chksup,
        chkClBal: chkClBal,
        bComCol:bComCol,
        bNarCol:bNarCol,
        bGst:bGst,
        bFoCol:bFoCol,
        bFo:bFo,
        bVch:bVch,
        bNa:bNa,
        bCo:bCo,
        bCoS:bCoS,
        bCh: bCh,
        bGr:bGr,
        bBill: bBill,
        bRecon:bRecon,
        C_DIV_APPL: window.DIV_APPL_IND,
        bOrd: bOrd,
        bDayTot: bDayTot

    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridRpt").parse(rowData);
                $$("gridRpt").refresh();                
                $("#LoadDIv").hide();

            }
            else {
                $("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#LoadDIv").hide();
        }
    });
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
function fnCurrFormat(value) {

    var Currfrmt = $("#CURRENCY_FORMAT").val();
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
};
function fnNumericText(code, e) {
    debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    if (charCode == 46 || charCode == 37 || charCode == 39) {
        return true
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        debugger;
        return true;
    }
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

function formatDateWebix(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2].substring(0, 4);
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
};

function fnCurrDtTime() {
    var vDate = "";
    var vTime = "";
    var rowData = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_FNLOADCURRDTTM",
        COMPID: CompId,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                vDate = rowData.GDate;
                vTime = rowData.GTime;
            }
        },
    });

    return [vDate, vTime];

};







