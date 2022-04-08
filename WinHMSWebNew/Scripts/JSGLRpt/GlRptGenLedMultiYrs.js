

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divGrp", view: "search", id: "txtGroup", readonly: true, placeholder: "<-ALL->",
        on: {
            onSearchIconClick: function () {
                debugger;
                btnGrpSrchClick();
            }
        }
        
        
    });
   
    webix.ui({
        container: "divLedger", view: "search", readonly: true, id: "txtLedger", placeholder: "<-ALL->", on: { onChange: function (newVal, OldVal) { } },
        on: {
            onSearchIconClick: function () {
                debugger;
                btnLedgSrchClick();
            }
        }
    });
    //webix.ui({ container: "divDivis", view: "combo", id: "ddlDivis", on: { onChange: function (newVal, OldVal) { } }, });
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "FromDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    webix.ui({
        container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    });
    webix.ui({ container: "divBtnDisplay", id: "btnDispay", view: "button", inputWidth: 60, label: "Display", click: function () { fnLoadGrid(); } });
   
};
function fnFromDtChange() {
    debugger;
    GridClear();
    
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

function btnGrpSrchClick() {
    $$("dtGroupPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtGroupPop").filterByAll();

    var ids = window.GroupIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtGroupPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtGroupPop").updateItem(obj.id, obj)

    })
    $$("dtGroupPop").refresh();

    $$("GroupPopup").show();
    $$("dtGroupPop").select($$("dtGroupPop").getFirstId());
    webix.UIManager.setFocus($$("dtGroupPop"));
    $$("dtGroupPop").moveSelection("top");

};
function btnVchTySrchClick() {
    $$("dtAcNmPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtAcNmPop").filterByAll();
    var ids = window.VchTyIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "")
    {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }   
    
    $$("dtAcNmPop").data.each(function (obj) {
        debugger;
        
        if (str.length>0)
        {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id ;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";        
        }
        else obj.CHK = "0";
            
        $$("dtAcNmPop").updateItem(obj.id, obj)


    })
    $$("dtAcNmPop").refresh();
    
    $$("AcNmPopup").show();
    $$("dtAcNmPop").select($$("dtAcNmPop").getFirstId());
    webix.UIManager.setFocus($$("dtAcNmPop"));
    $$("dtAcNmPop").moveSelection("top");

};
function btnLedgSrchClick() {
    debugger;
    fnLoadLedgerGrid();
    $$("dtLedgerPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtLedgerPop").filterByAll();
    var ids = window.LedgerIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtLedgerPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtLedgerPop").updateItem(obj.id, obj)

    })
    $$("dtLedgerPop").refresh();

    $$("LedgerPopup").show();
    $$("dtLedgerPop").select($$("dtLedgerPop").getFirstId());
    webix.UIManager.setFocus($$("dtLedgerPop"));
    $$("dtLedgerPop").moveSelection("top");

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
                //{ id: "ixButton", header: '', width: 30, css: { 'text-align': 'left ! important', }, hidden: true },
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
                { id: "IXCUMAL", header: { text: "Cumm.Bal", }, width: 120, css: { 'text-align': 'right ! important', }, hidden: true },
                { id: "IXHidd", header: { text: "Status", }, width: 90,  hidden: true },
                { id: "ixGSTNo", header: { text: "GST No", }, width: 90,  hidden: true },
                { id: "ixLnNarCol", header: { text: "Line Narration", }, width: 200,  hidden: true },
                { id: "ixComNarCol", header: { text: "Common Narration", }, width: 200,  hidden: true },
                { id: "ixForCurrID", header: { text: "Forn.Curr", }, width: 90,  hidden: true },
                { id: "ixForCurr", header: { text: "Forn.Amount", }, width: 90,  hidden: true },
                { id: "ixCBy", header: { text: "Creat By", }, width: 90,  hidden: true },
                { id: "ixCDt", header: { text: "Create Dt", }, width: 90,  hidden: true },
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

function loadAdvFilterWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptAdvFilter",
        head: "Advance Filter",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 500,
        move: true,
        body: {
            padding: { top: 20, left: 30, bottom: 20, right: 10 },
            rows: [
                    {
                        view: "search", width: 370, labelWidth: 110, id: "txtAcNm", label: "Accounts", readonly: true, placeholder: "<-ALL->",
                        on: {
                            onSearchIconClick: function () {
                                debugger;
                                btnVchTySrchClick();
                            }
                        }
                    },
                  
                    { view: "richselect", labelWidth: 110, id: "ddlDivis", label: "Division", on: { onChange: function (newVal, OldVal) { } }, },
                  
                    { width: 210, labelWidth: 110, view: "checkbox", id: "chkSub", label: "Sub Ledger", customCheckbox: false, },
                    
                    { cols: [{}, { view: "button", type: "icon", maxWidth: 80, id: "OkFilter", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { btnOkFilterClick(); } }], },

                    { view: "text", id: "txtAcName", hidden: true, },
                    { view: "text", id: "txtAcId", hidden: true, },
                    { view: "text", id: "txtDivId", hidden: true, },
                   
                    { view: "text", id: "txtSub", hidden: true, },
                    
                    
            ]
        }
    });
}
function loadOptionPopWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptOptionsNew",
        head: "Option",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 250,
        move: true,
        body: {
            rows: [
                    {
                        view: "scrollview", scroll: "y", height: 450, width: 250, body: {
                            padding: { top: 20, left: 30, bottom: 20, right: 10 },
                            rows: [
                               /// { view: "checkbox", id: "chkClBal", labelWidth: 5, labelRight: "Cummulative Balance", customCheckbox: false, },
                                
                                { view: "checkbox", id: "chkComNar", labelWidth: 5, labelRight: "Common Narration - Row", customCheckbox: false, click: function () { fnChkComNarClick(); }, },
                                { view: "checkbox", id: "chkLnNar", labelWidth: 5, labelRight: "Line Narration - Row", customCheckbox: false, click: function () { fnChkLnNarClick(); }, },
                              
                                { view: "checkbox", id: "chkChq", labelWidth: 5, labelRight: "Cheque/Due Dt./Due No.", customCheckbox: false, },
                                { view: "checkbox", id: "chkFornCur", labelWidth: 5, labelRight: "Forign Currency - Row", customCheckbox: false, click: function () { fnChkFornCurrClick(); }, },
                               
                                { view: "checkbox", id: "chkOrdByGrp", labelWidth: 5, labelRight: "Order By Group", customCheckbox: false, },
                                { view: "checkbox", id: "chkGrandTot", labelWidth: 5, labelRight: "Grand Total", customCheckbox: false, },
                                { view: "checkbox", id: "chkBillDet", labelWidth: 5, labelRight: "Bill Detail", customCheckbox: false, click: function () { fnChkBillDetClick(); }, },
                               
                                                                

                         
                                { view: "text", id: "txtComNar", hidden: true, value: "1" },
                                { view: "text", id: "txtLnNar", hidden: true, value: "1" },
                               
                                { view: "text", id: "txtChq", hidden: true, value: "1" },
                                { view: "text", id: "txtFornCur", hidden: true, value: "1" },
                              
                                { view: "text", id: "txtOrdByGrp", hidden: true, value: "1" },
                                { view: "text", id: "txtGrandTot", hidden: true, value: "1" },
                                { view: "text", id: "txtBillDet", hidden: true, value: "1" },
                                                             

                               
                            ]
                        }
                    },
                    { cols: [{}, { view: "button", type: "icon", id: "Okoptions", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { btnOkOptionClick(); } }], }
            ]

        }
    });
};
function btnOkOptionClick() {
    debugger;
 
    
    $$("txtComNar").setValue($$("chkComNar").getValue());
    $$("txtLnNar").setValue($$("chkLnNar").getValue());
    
    $$("txtChq").setValue($$("chkChq").getValue());
    $$("txtFornCur").setValue($$("chkFornCur").getValue());
  
    $$("txtGrandTot").setValue($$("chkGrandTot").getValue());
    $$("txtBillDet").setValue($$("chkBillDet").getValue());
   
    $$("txtOrdByGrp").setValue($$("chkOrdByGrp").getValue())

    fnShowColumn();
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {
    
   
    $$("chkComNar").setValue($$("txtComNar").getValue());
    $$("chkLnNar").setValue($$("txtLnNar").getValue());
   
    $$("chkChq").setValue($$("txtChq").getValue());
    $$("chkFornCur").setValue($$("txtFornCur").getValue());
  
    $$("chkGrandTot").setValue($$("txtGrandTot").getValue());
    $$("chkBillDet").setValue($$("txtBillDet").getValue());
   
    $$("chkOrdByGrp").setValue($$("txtOrdByGrp").getValue())
   $$("RptOptionsNew").show();
};
function btnFilterClick() {
    debugger;
    $$("txtAcNm").setValue($$("txtAcName").getValue());
    window.VchTyIds = $$("txtAcId").getValue();
    $$("ddlDivis").setValue($$("txtDivId").getValue());
   
    $$("chkSub").setValue($$("txtSub").getValue());
   
   
    
    $$("RptAdvFilter").show();
};
function btnOkFilterClick() {
    debugger;
    GridClear();
    $$("txtAcName").setValue($$("txtAcNm").getValue());
    $$("txtAcId").setValue(window.VchTyIds);
    $$("txtDivId").setValue($$("ddlDivis").getValue());
    
    $$("txtSub").setValue($$("chkSub").getValue());

    $$("RptAdvFilter").hide();
};
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
function fnLondGlInitCont(CompId) {


    $$("txtComNar").setValue("1");
    $$("txtLnNar").setValue("1");

    $$("txtChq").setValue("1");
    $$("txtFornCur").setValue("1");
   
    $$("txtGrandTot").setValue("1");
    $$("txtBillDet").setValue("1");
  
    $$("txtGroup").setValue("");
    $$("txtLedger").setValue("");
    $$("txtAcNm").setValue("");
  
    $$("chkSub").setValue("1");
    
    $$("txtAcName").setValue("");
    $$("txtAcId").setValue("");
    $$("txtDivId").setValue("<-ALL->");
  
    $$("txtSub").setValue("1");
    $$("txtOrdByGrp").setValue("1");
    GridClear();

    window.GL_CompanyID = "";    
    window.FiscalFromDt = "";
    window.FiscalToDt = "";
    window.GroupIds = "";
    window.LevelIds = "";
    window.LedgerIds = "";
    window.VchTyIds = "";
    window.AC_CD_IND = "0";
    window.GSTAppl = "0";
    window.DIV_APPL_IND = "0";
    window.CURRDT = "";
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
                window.CURRDT = dtComp[0].CURDT1;

                

                
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

               
                $$("FromDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                $$("FromDt").refresh();

              
                $$("ToDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                $$("ToDt").refresh();

                
             
            }
        },
    });

    

    if (window.DIV_APPL_IND == "1") {        
       
        $$("ddlDivis").show();
     
    }
    else {
        
        $$("ddlDivis").hide();
     
    }

  
    
}
function fnPropChange(CompId) {
    debugger;
    fnLondGlInitCont(CompId);
    GridClear();
        
    fnGroupLoad();
    fnDivisLoad();    
    
    fnGlAccounts();
    fnPeriodLoad();
    fnShowColumn();
  
};

function fnDivisLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_DIVISIONLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
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
                options = rowData;
                options.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
                $$("ddlDivis").define("options", options);

               
                $$("ddlDivis").setValue("<-ALL->")
            }
        },
    });

    //return rowData;
};



function fnGlAccounts() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
       
     
        REQTYPE: "GET_GLACCOUNTSLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        GroupIds:window.GroupIds 
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

                $$("dtAcNmPop").clearAll();
                $$("dtAcNmPop").parse(rowData);
                $$("dtAcNmPop").refresh();

                

                
            }
        },
    });

    //return rowData;
};

function fnGroupLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_GROUPLOAD",
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
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                
                $$("dtGroupPop").clearAll();
                $$("dtGroupPop").parse(rowData);
                $$("dtGroupPop").refresh();
               


            }
        },
    });

    //return rowData;
};

function GroupPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "GroupPopup",
        head: "Group",
        position: "center",
        minWidth: 340,
        maxWidth: 340,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtGroupPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "Account Code", id: "AC_CD",  hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "AC_ID", id: "id", hidden: true },
                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id, e, node) {
                        //debugger;
                        var selectedRows = this.getSelectedItem(id.row);
                        GridClear();
                        var vGrpNm = "";
                        var vGrpId = "";
                        var vLvlId = "";
                        window.GroupIds = "";
                        window.LevelIds = "";
                        $$("txtGroup").setValue("");

                        var vGrpNm = $.trim(selectedRows[0].value);
                        var vGrpId = "'" + $.trim(selectedRows[0].id) + "'" ;
                        var vLvlId = "'" + $.trim(selectedRows[0].LEVEL_NO) + "'";

                        if (vGrpId != "") {
                            window.GroupIds = vGrpId;
                            window.LevelIds = vLvlId;
                            $$("GroupPopup").hide();
                            $$("txtGroup").setValue(vGrpNm);

                        }
                       
                       
                        
                    }
                   
                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                   
                    {
                        
                        view: "button",                    
                        label: "Close",
                        inputWidth: 80,
                        click: function () {
                            GridClear();
                            window.GroupIds = "";
                            window.LevelIds = "";
                            $$("txtGroup").setValue("");
                            $$("GroupPopup").hide();
                           
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};

function LedgerPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "LedgerPopup",
        head: "Ledger",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtLedgerPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "Account Code", id: "AC_CD",  hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "AC_ID", id: "id", hidden: true },
                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                ],
                data: [{}],
                on: {
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
                        var rowid = selRow.id;
                        var charCode = e.which || e.keyCode;
                        if (charCode == '13') {
                            var valid = this.getSelectedId(true);
                            var id = { row: valid[0].row };
                            this.callEvent("onItemClick", [id]);
                        }
                        if (e.ctrlKey == false && e.altKey == false && e.shiftKey == false && charCode == 32) {
                            var vChk = selRow.CHK;
                            if (vChk == "1") selRow.CHK = "0";
                            else selRow.CHK = "1";
                            this.updateItem(rowid, selRow)
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
                            GridClear();
                            var vLedNm = "";
                            var vLedId = "";
                            window.LedgerIds = "";
                            $$("txtLedger").setValue("");
                            $$("dtLedgerPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK=="1") {
                                    if (vLedNm != "") {
                                        vLedNm = vLedNm + "," + obj.value
                                    }
                                    else {
                                        vLedNm = obj.value
                                    }
                                    if (vLedId != "") {
                                        vLedId = vLedId + ",'" + obj.id + "'"
                                    }
                                    else {
                                        vLedId = "'" + obj.id + "'"
                                    }
                                }
                            });
                            if (vLedId != "") {
                                window.LedgerIds = vLedId;
                                $$("LedgerPopup").hide();
                                $$("txtLedger").setValue(vLedNm);

                            }
                            else {
                                $$("LedgerPopup").hide();
                               
                            }
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};

function fnLoadLedgerGrid() {
    debugger;
    var rowDatad = [];
    var CompId = $$("Property").getValue();
    var GrpIds = window.GroupIds;
    Request = {
        REQTYPE: "GET_LEDGERLOAD",
        COMPID: window.GL_CompanyID,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        GROUP_ID:GrpIds
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtLedgerPop").clearAll();
                $$("dtLedgerPop").parse(rowDatad);
                $$("dtLedgerPop").refresh();

            }
        }
    })

};

function AcNmPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "AcNmPopup",
        head: "Accounts",
        position: "center",
        minWidth: 400,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtAcNmPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 310, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 70, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "Ac Id", id: "id", hidden: true },
                ],
                data: [{}],
                on: {
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
                        var rowid = selRow.id;
                        var charCode = e.which || e.keyCode;
                        if (charCode == '13') {
                            var valid = this.getSelectedId(true);
                            var id = { row: valid[0].row };
                            this.callEvent("onItemClick", [id]);
                        }
                        if (e.ctrlKey == false && e.altKey == false && e.shiftKey == false && charCode == 32) {
                            var vChk = selRow.CHK;
                            if (vChk == "1") selRow.CHK = "0";
                            else selRow.CHK = "1";
                            this.updateItem(rowid, selRow)
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
                            //GridClear();
                            var vVchTyNm = "";
                            var vVchTyId = "";
                            window.VchTyIds = "";
                            $$("txtAcNm").setValue("");
                            $$("dtAcNmPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK=="1") {
                                    if (vVchTyNm != "") {
                                        vVchTyNm = vVchTyNm + "," + obj.value
                                    }
                                    else {
                                        vVchTyNm = obj.value
                                    }
                                    if (vVchTyId != "") {
                                        vVchTyId = vVchTyId + ",'" + obj.id + "'"
                                    }
                                    else {
                                        vVchTyId = "'" + obj.id + "'"
                                    }
                                }
                            });
                            if (vVchTyId != "") {
                                window.VchTyIds = vVchTyId;
                                $$("AcNmPopup").hide();
                                $$("txtAcNm").setValue(vVchTyNm);

                            }
                            else {
                                $$("AcNmPopup").hide();
                                //webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                            }
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};

function fnPeriodLoad() {
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
        
    var DivId = $$("txtDivId").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();    
    var FVtype = "";
    var Crdr = "0";
    var sAmt = "";
    var svdt = "";
    var chkDr = "1";
    var chkCr ="1";
    var ids = window.LedgerIds;
    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var chksup = $$("txtSub").getValue();
    var chkClBal = "0";
    if (DivId == "<-ALL->") DivId = "";
    CompId = $$("Property").getValue();
    var ReqNm = "";
    if (chksup == 1) ReqNm = "GET_LOADRPTCURRENTLEDGERMULTIYRS"
    else ReqNm = "GET_LOADRPTCURRENTLEDGERSUMMMULTIYRS"
        

    bComCol = "0";
    bNarCol = "0";
    bGst = "0";
    bFoCol = "0";
    bFo = $$("txtFornCur").getValue();
    bVch = "0"; 
    bNa = $$("txtLnNar").getValue();
    bCo = $$("txtComNar").getValue();
    bCoS = "0";
    bCh = $$("txtChq").getValue();
    bBill = $$("txtBillDet").getValue();
    bGr = $$("txtGrandTot").getValue();
    bRecon = "0"; 
    bOrd = $$("txtOrdByGrp").getValue();
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
        bOrd: bOrd

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
function fnSuppressBlank() {
    debugger;
    var vColumn = $$("gridRpt").config.columns;
    var vColCnt = vColumn.length;
    var vData = $$("gridRpt").serialize();
    for (var i = 0; i < vColumn.length; i++) {
        var ColumnId = vColumn[i].id;
        var newData = vData.filter(function (el) {
            return el[ColumnId] != "" && el[ColumnId] != undefined && el[ColumnId] != null;
        });
        if (newData.length == 0) {
            $$("gridRpt").hideColumn(ColumnId);
            i = i - 1;
        }

    }

}
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
              
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            

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

function fnShowColumn() {
    GridClear();

    if ($$("txtComNarCol").getValue() == "1") $$("gridRpt").showColumn("ixComNarCol");
    else $$("gridRpt").hideColumn("ixComNarCol");

    if ($$("txtLnNarCol").getValue() == "1") $$("gridRpt").showColumn("ixLnNarCol");
    else $$("gridRpt").hideColumn("ixLnNarCol");

    if ($$("txtFornCurCol").getValue() == "1") { $$("gridRpt").showColumn("ixForCurr"); $$("gridRpt").showColumn("ixForCurrID"); }
    else { $$("gridRpt").hideColumn("ixForCurr"); $$("gridRpt").hideColumn("ixForCurrID"); }

    if ($$("txtCrBy").getValue() == "1") $$("gridRpt").showColumn("ixCBy");
    else $$("gridRpt").hideColumn("ixCBy");

    if ($$("txtCrDt").getValue() == "1") $$("gridRpt").showColumn("ixCDt");
    else $$("gridRpt").hideColumn("ixCDt");

    if ($$("txtDiv").getValue() == "1") $$("gridRpt").showColumn("ixDIV");
    else $$("gridRpt").hideColumn("ixDIV");

    if ($$("txtGst").getValue() == "1") $$("gridRpt").showColumn("ixGSTNo");
    else $$("gridRpt").hideColumn("ixGSTNo");

    if ($$("txtClBal").getValue() == "1") $$("gridRpt").showColumn("IXCUMAL");
    else $$("gridRpt").hideColumn("IXCUMAL");

    

};

function fnChkComNarClick() {
    if ($$("chkComNar").getValue() == "1") $$("chkComNarCol").setValue("0");

};
function fnChkComNarColClick() {
    if ($$("chkComNarCol").getValue() == "1") $$("chkComNar").setValue("0");

};
function fnChkLnNarClick() {
    if ($$("chkLnNar").getValue() == "1") $$("chkLnNarCol").setValue("0");

};
function fnChkLnNarColClick() {
    if ($$("chkLnNarCol").getValue() == "1") $$("chkLnNar").setValue("0");

};
function fnChkFornCurrClick() {
    if ($$("chkFornCur").getValue() == "1") $$("chkFornCurCol").setValue("0");
};
function fnChkFornCurrColClick() {
    if ($$("chkFornCurCol").getValue() == "1") $$("chkFornCur").setValue("0");
};

function fnChkVchDetClick() {
    if ($$("chkVchDet").getValue() == "1") {
        $$("chkCos").setValue("0");
        $$("chkBillDet").setValue("0");
    }
    else {
        $$("chkCos").setValue("1");
        $$("chkBillDet").setValue("1");
        $$("chkComNar").setValue("1");
        $$("chkLnNar").setValue("1");
    }
};

function fnChkBillDetClick() {

    if ($$("chkBillDet").getValue() == "1")  $$("chkVchDet").setValue("0");

}
function GridClear() {
    $$("gridRpt").clearAll();
}





