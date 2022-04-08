var Window1 = null;
var Window2 = null;
var Print = "<span  class='wc_fnt18 fas fa-1x  fa-print'></span>";
var excel = "<span  class=' wc_fnt18 far fa-1x fa-file-excel'></span>";

var PageLoad = function () {
    webix.ui({
        view: "button", id: "btnPrint", value: "Print", css: 'webix-secondary', width: 30, container: "divPrint", label: Print, tooltip: true,
       // hidden: window.VP == 1 ? false : true,
        on: {
            onItemClick: function () {
                fnGridPrint();
            }
        }
    });

    webix.ui({
        view: "button", id: "btnExcel", value: "Excel", css: 'webix-secondary', width: 30, container: "divExcel", label: excel, tooltip: true,
        //hidden:window.EXL_P == 1?false:true,
        on: {
            onItemClick: function () {
                fnExcelExport();

            }
        }
    });
    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    
    webix.ui({ view: "text", container: "divPeriod", id: "txtPeriod", labelWidth: 50, label: "Period", readonly:true,inputAlign:"center", on: { onChange: function (newVal, OldVal) { } } });
    webix.ui({ view: "label", container: "divLblLstDt", id: "lblLstDt", css: "REDLABEL" });

    webix.ui({ view: "checkbox", container: "divChkAllPeriod", id: "chkAllPeriod", labelWidth: 3, inputWidth: 120, customCheckbox: false, labelRight: "All Period", click: function () { fnLoadGrid() }, });
    
    webix.ui({
        container: "divOption", height: 18,
        padding: { top: 0, left: 0, bottom: 0, right: 0 }, css: "optHeight", click: function () { fnLoadGrid() }, inputWidth: 173,
        view: "radio", id: "OptRptType", labelWidth: 10, label: " ", customRadio: false,
        options: [{ id: 0, value: "Cumulative" }, { id: 1, value: "Monthwise" }, { id: 2, value: "Monthwise & Cumulative" }], vertical: true, value: "0",
    });

    webix.ui({ view: "text", labelWidth: 90, id: "FromDt", label: "FromDt", on: { onChange: function (newVal, OldVal) { }, }, hidden: true });
    webix.ui({ view: "text", labelWidth: 90, id: "ToDt", label: "ToDt", on: { onChange: function (newVal, OldVal) { }, }, hidden: true });
    webix.ui({ view: "datatable",  id: "gridComp", hidden: true });
    webix.ui({ view: "text", id: "txtPeriodSno", hidden: true });
    

    webix.ui({
        view: "button", id: "btnFilters", css: "webix_primary", value: "Filters", width: 30, label: '<span class="fa fa-filter"></span>', container: "divbtnFilters", tooltip: true,
        on: {
            onItemClick: function () {
                btnFilterClick();
            }
        }
    });
     
};

function GridDesign() {
    webix.ui({
        view: "treetable",
        id: "gridRpt",
        container: "divGrid",
        select: 'row',
        rowHeight: 30,
        fixedRowHeight: false,
        rowLineHeight: 23,
        css: "webix_header_border GridBalSheet",
        autoConfig: true,
        spans:true,
        data: [],
        columns: [
                    { header: 'Code', id: "ACC_CD", width: 70, css: { 'text-align': 'center ! important', }, hidden: true },                    
                    { header: "ParticularId", id: "ACC_ID", sort: "string", width: 50, css: { 'text-align': 'left ! important' }, hidden: true, },
                    { header: "Particulars", id: "ACC_NM", sort: "string", width: 310, css: { 'text-align': 'left ! important' }, },
                    { header: "Category", id: "ACC_CAT", sort: "string", width: 10, css: { 'text-align': 'left ! important' }, hidden: true, },
                    { header: "Color", id: "CLR", width: 50, css: { 'text-align': 'left ! important' }, hidden: true, },

        ],
        scheme: {
            $change: function (item) {                
                var Columns = $$('gridRpt').config.columns;
                var ColCnt = Columns.length;
                if (item.CLR == "BlueColor") {
                    //debugger;
                    if ($$("txtAccCd").getValue() == "1") $$("gridRpt").addSpan(item.id, "ACC_CD", ColCnt, 1, null, "BlueColor");
                    else $$("gridRpt").addSpan(item.id, "ACC_NM", ColCnt, 1, null, "BlueColor");
                    $$("gridRpt").refresh();
                }
                else item.$css = item.CLR;

            }

        },

        on: {
            onBeforeClose: function () {
                return false;
            },
            'onItemDblClick': function (id) {
                debugger;
                fnRowDblClick(id);
            },

        },
    });
    webix.ui({
        view: "datatable",
        id: "GrdPeriod",                
        hidden:true,      
        data: [],
        columns: [
                    { header: "Name", id: "id"},
                    { header: "FromDt", id: "FromDt", },
                    { header: "ToDt", id: "ToDt" },
                    { header: "FiscalYr", id: "FiscalYr" },                    
        ],

        on: {
            onBeforeClose: function () {
                return false;
            },                                
        },
    });
    gridResize();
}

function fnRowDblClick(RowId) {
    debugger;
    if (Window1 != null) {
        Window1 = Window1.close();
    }
    if (Window2 != null) {
        Window2 = Window2.close();
    }

    var selRow = $$("gridRpt").getItem(RowId);    
    var AC_NM = selRow.ACC_NM;
    AC_NM = AC_NM.replace(/&/g, '^');
    var AC_ID = selRow.ACC_ID;
    var AC_CAT = selRow.ACC_CAT;
    var Division = $("#Division").val();
    var From="";
    if ($$("chkAllPeriod").getValue() == "1") From = window.FiscalFromDt;
    else From = $$("FromDt").getValue();
  //  var From = window.FiscalFromDt; 
    var To = "";
    if ($$("chkAllPeriod").getValue() == "1") To = window.FiscalToDt;
    else To = $$("ToDt").getValue();



   

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);

    if (Division == "" || Division == undefined) Division = "";
    $("#AC_IDD").val(AC_ID);
    $("#AC_NMM").val(AC_NM);
    $("#From").val(From);
    $("#To").val(To);
   

    if (AC_ID == "" || AC_ID == null) return;

    //var UrlQryStr = CompId + "~" + Division + "~" + TRN_ID_SRNO + "~" + TRN_TY_ID + "~" + V_DT;
    if (AC_ID != "") {
        $.ajax({
            type: "POST",
            async: false,
            url: "/GLReports/GroupTrialBalancePopup",
            data: "COMP_ID=" + CompId + "&Division=" + Division + "&From=" + From + "&To=" + To + "&AC_NM=" + AC_NM + "&AC_ID=" + AC_ID,
            success: function (data) {
                GlPLWindowLoad(AC_CAT);
            }
        });
      
    }
    

};
function GlPLWindowLoad(AC_CAT) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "AccCntrlPopup",
            head: "",
            position: "center",
            autowidth: true,

            on: {
                onShow: function () {
                    var vWidth = window.innerWidth
                                   || document.documentElement.clientWidth
                                   || document.body.clientWidth;
                    var vHeight = window.innerHeight
                                   || document.documentElement.clientHeight
                                   || document.body.clientHeight;
                    if (vWidth > 800) vWidth = vWidth - 40;
                    vHeight = vHeight - 60;
                    $$('AccCntrlPopup').define("width", vWidth);
                    $$('AccCntrlPopup').define("height", vHeight)
                    $$('AccCntrlPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-profit",
                  //  css: { "margin-top": "-50px !important" },
                    src: AC_CAT == "L" ? "/GLReports/GLLedgerDetailPop?PARTIAL=1" : "/GLTransaction/AccControl?PARTIAL=1",
                }
                ],

            }
        }).show();

    })
};
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
        width: 350,
        move: true,
        body: {
            padding: { top: 20, left: 30, bottom: 20, right: 10 },
            rows: [

                    {
                        cols:[
                            {
                                width:150,
                                rows:[

                                        { view: "label", label: "SortOn", width: 120, css: "SubHeadLbl", height: 20 },
                                        {
                                            padding: { top: 0, left: 0, bottom: 0, right: 0 }, css: "optHeight",
                                            view: "radio", id: "OptSortOn", labelWidth: 10, label: " ", customRadio: false, 
                                            options: [ { id:1, value:"Seq No" }, { id:2, value:"Account Id" }], vertical: true, value: "1",
                                        },
                                        {height:20},
                                        { view: "label", label: "Compare", width: 120, css: "SubHeadLbl", height: 20 },
                                        { view: "checkbox", width: 230, id: "chkCompare", labelWidth: 10, labelRight: "With Last Year", customCheckbox: false,},
                                           
                                        
                                ]
                            },
                            {
                                rows:[
                                    { view: "label", label: "Options", width: 120, css: "SubHeadLbl", height: 20 },
                                    { view: "checkbox", width: 230, id: "chkAccCd", labelWidth: 10, labelRight: "Account Code", customCheckbox: false,},
                                    { view: "checkbox", width: 230, id: "chkSkipZero", labelWidth: 10, labelRight: "Skip Zero", customCheckbox: false,},
                                    { view: "checkbox", width: 230, id: "chkDispLedg", labelWidth: 10, labelRight: "Display Ledger", customCheckbox: false,},

                                ]
                            }
                        ]
                    },
                    
                    { cols: [{}, { view: "button", type: "icon", maxWidth: 80, id: "OkFilter", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { btnOkFilterClick(); } }], },

                    { view: "text", id: "txtSortOn", hidden: true, },
                    { view: "text", id: "txtCompare", hidden: true, },
                    { view: "text", id: "txtAccCd", hidden: true, },
                    { view: "text", id: "txtSkipZero", hidden: true, },
                    { view: "text", id: "txtDispLedg", hidden: true, },                    

            ]
        }
    });
};
function btnFilterClick() {
    debugger;
    $$("OptSortOn").setValue($$("txtSortOn").getValue());
    $$("chkCompare").setValue($$("txtCompare").getValue());
    $$("chkAccCd").setValue($$("txtAccCd").getValue());
    $$("chkSkipZero").setValue($$("txtSkipZero").getValue());
    $$("chkDispLedg").setValue($$("txtDispLedg").getValue());
    

    $$("RptAdvFilter").show();
};
function btnOkFilterClick() {
    debugger;    
    $$("txtSortOn").setValue($$("OptSortOn").getValue());
    $$("txtCompare").setValue($$("chkCompare").getValue());
    $$("txtAccCd").setValue($$("chkAccCd").getValue());
    $$("txtSkipZero").setValue($$("chkSkipZero").getValue());
    $$("txtDispLedg").setValue($$("chkDispLedg").getValue());
    $$("RptAdvFilter").hide();
    fnLoadGrid();
};

function fnPropertyLoad(CompId) {
    //debugger;
    Request = {
        REQTYPE: "GET_FNMULPROPERTY",
        COMPID: CompId,
    }
    Prop_Id = CompId;
    var rowData = [];
    var options =[];

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
                $$("Property").define("options",rowData);
                $$("Property").refresh();
                $$("Property").setValue(Prop_Id);

                $$("gridComp").parse(rowData);
            }
        },
    });
};

function FNLoadAllCompany(CompId) {
    //debugger;
    Request = {
        REQTYPE: "GET_FNLOADALLCOMPANY",
        COMPID: CompId,
    }            
    var rowData = [];
    var options =[];

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

                $$("gridComp").parse(rowData);
            }
        },
    });
};
function fnLondGlInitCont(CompId) {
    debugger;
    window.GL_CompanyID = "";
    window.FiscalFromDt = "";
    window.FiscalToDt = "";    
    
    window.AC_CD_IND = "0";
    window.GSTAppl = "0";
    window.DIV_APPL_IND = "0";
    window.G6_IND = "0";
    window.W1_IND = "0";
    window.OPEN_TRN_REP_IND = "0";
    window.AC_CD_IND = "0";


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
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.GL_CompanyID = rowData.GL_CompanyID;
                var dtComp = rowData.dtComp;
                var dtCont = rowData.dtCont;
                var dtCurPeriod = rowData.dtCurPeriod;
                window.AC_CD_IND = dtCont[0].AC_CD_IND;
                window.GSTAppl = dtComp[0].GL_VAT_IND;
                window.DIV_APPL_IND = dtCont[0].DIV_APPL_IND;
                window.G6_IND = dtCont[0].G6_IND;
                window.W1_IND = dtCont[0].W1_IND;
                window.OPEN_TRN_REP_IND = dtCont[0].OPEN_TRN_REP_IND;


                $("#CURRENCY_FORMAT").val(dtComp[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(dtComp[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(dtComp[0].VAL_DECIM_LIMIT);

                window.FiscalStartDT = rowData.FiscalFromDt;
                window.FiscalFromDt = rowData.PeriodStartDt;
                window.FiscalToDt = rowData.PeriodEndDt;
                if (dtCurPeriod.length > 0) {
                    $$("FromDt").setValue(dtCurPeriod[0].PERIOD_START_DT1);
                    $$("ToDt").setValue(dtCurPeriod[0].PERIOD_END_DT1);
                    $$("txtPeriod").setValue(dtCurPeriod[0].PERIOD_NM);
                    $$("txtPeriodSno").setValue(dtCurPeriod[0].PERIOD_SNO);
                    $$("lblLstDt").setValue("( " + dtCurPeriod[0].PERIOD_END_DT1 + " )");
                }               

            }
        },
    });
    
    //$$("gridRpt").showColumn("AC_CD");

    
    

   
};
function fnPropChange(CompId1) {
    //debugger;
    var bMulti = "0";
    var vSplit = [];    
    GridClear();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);

    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        //vSplit = CompId.split(",");
        //var newData = vSplit.filter(function (el) {
        //    return el.toString().trim().toUpperCase() == "WS";
        //});
        //if (newData.length > 0) CompId = newData[0].toString().trim();
        //else CompId = vSplit[0].toString().trim();   
        CompId = fnGetDefaultComp(CompId);
        bMulti = "1";
        $$("gridRpt").destructor();
        GridDesign();
        $$("chkAllPeriod").setValue("0");
        $$("chkAllPeriod").hide();
    }
    else {
        $$("gridRpt").destructor();
        GridDesign();       
        $$("chkAllPeriod").show();
    }
    
    FNLoadAllCompany(CompId);
    fnLondGlInitCont(CompId);    
    

    $$("txtSortOn").setValue('1');
    $$("txtCompare").setValue('0');
    if (window.AC_CD_IND == "1") $$("txtAccCd").setValue("1");
    else $$("txtAccCd").setValue('0');    
    $$("txtSkipZero").setValue('1');
    $$("txtDispLedg").setValue('1');
    fnPeriodLoad(CompId);

    fnLoadGrid();
      

};

function fnPeriodLoad(CompId) {
    var dataparam = {};
    var rowData = [];
    var options = [];
   //var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_GLPERIODLOADPRVFISC",
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
};
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
                       { header: "PRV_PER_ST_DT", id: "PRV_PERIOD_START_DT", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "PRV_PER_END_DT", id: "PRV_PERIOD_END_DT", hidden: true, css: { 'text-align': 'center ! important' } },
                       
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id) {
                        //debugger; 
                        if (id) fnPeriodOkClick(id);
                        else $$("PeriodPopup").hide();
                    },
                    'onKeyPress': function (code, e) {
                        //debugger;
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
                                //debugger;
                                if ($$("dtPeriodPop").count()>0) {
                                    var selRow = $$("dtPeriodPop").getSelectedItem();
                                    var id = selRow.id;
                                    if (id) fnPeriodOkClick(id);                                    
                                    
                                }
                                $$("PeriodPopup").hide();
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
    if (fnChkSessVal() == false) return;
    GridClear();
    if (Rowid) {
        var selRow = $$("dtPeriodPop").getItem(Rowid);
        if (selRow) {
            var PerStDt = selRow.PERIOD_START_DT;
            var PerEndDt = selRow.PERIOD_END_DT;
            $$("FromDt").setValue(PerStDt);
            $$("ToDt").setValue(PerEndDt);
            $$("txtPeriod").setValue(selRow.PERIOD_NM);
            $$("txtPeriodSno").setValue(selRow.PERIOD_SNO);
            $$("lblLstDt").setValue("( " + selRow.PERIOD_END_DT + " )");
        }
        
        
    }
    $$("PeriodPopup").hide();
    if ($$("lblLstDt").getValue() != "") fnLoadGrid();
}


function fnSuppressBlankRow(DataRows) {
    debugger;
    var vData = webix.copy(DataRows);
    var newData = vData.filter(function (el) {
        debugger;
        var OpenDr = 0;
        var OpenCr = 0;
        var CloseCr = 0;
        var CloseDr = 0;
        var TrnDr = 0;
        var TrnCr = 0;
        if (el["OPENDR"]) OpenDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        if (el["OPENCR"]) OpenCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        if (el["CLOSEDR"]) CloseDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        if (el["CLOSECR"]) CloseCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        if (el["TRNDR"]) TrnDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        if (el["TRNDR"]) TrnCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
        //return ((el["OPENDR"] == "" || el["OPENDR"] == 0 || el["OPENDR"] == null) && (el["OPENCR"] == "" || el["OPENCR"] == undefined || el["OPENCR"] == null)
        //     && (el["CLOSEDR"] == "" || el["CLOSEDR"] == undefined || el["CLOSEDR"] == null) && (el["CLOSECR"] == "" || el["CLOSECR"] == undefined || el["CLOSECR"] == null)
        //    && (el["TRNDR"] == "" || el["TRNDR"] == undefined || el["TRNDR"] == null) && (el["TRNCR"] == "" || el["TRNCR"] == undefined || el["TRNCR"] == null));

        if ($$("txtClsBal").getValue() == "1") {
            $$("gridRpt").showColumn("CLOSEDR");
            $$("gridRpt").showColumn("CLOSECR");
        }
        else {
            $$("gridRpt").hideColumn("CLOSEDR");
            $$("gridRpt").hideColumn("CLOSECR");
        }
        if ($$("txtOpnBal").getValue() == "1") {
            $$("gridRpt").showColumn("OPENDR");
            $$("gridRpt").showColumn("OPENCR");
        }
        else {
            $$("gridRpt").hideColumn("OPENDR");
            $$("gridRpt").hideColumn("OPENCR");
        }

        if ($$("txtTrans").getValue() == "1") {
            $$("gridRpt").showColumn("TRNDR");
            $$("gridRpt").showColumn("TRNCR");
        }
        else {
            $$("gridRpt").hideColumn("TRNDR");
            $$("gridRpt").hideColumn("TRNCR");
        }

        if ($$("txtClsBal").getValue() == "1" && $$("txtOpnBal").getValue() == "1" && $$("txtTrans").getValue() == "1") {
            return (OpenDr == 0 && OpenCr == 0 && CloseDr == 0 && CloseCr == 0 && TrnDr == 0 && TrnCr == 0);
        }
        else if ($$("txtClsBal").getValue() == "1" && $$("txtOpnBal").getValue() == "1") {
            return (OpenDr == 0 && OpenCr == 0 && CloseDr == 0 && CloseCr == 0);
        }
        else if ($$("txtTrans").getValue() == "1" && $$("txtOpnBal").getValue() == "1") {
            return (OpenDr == 0 && OpenCr == 0 && TrnDr == 0 && TrnCr == 0);
        }
        else if ($$("txtTrans").getValue() == "1" && $$("txtClsBal").getValue() == "1") {
            return (CloseDr == 0 && CloseCr == 0 && TrnDr == 0 && TrnCr == 0);
        }
        else if ($$("txtOpnBal").getValue() == "1") {
            return (OpenDr == 0 && OpenCr == 0);
        }
        else if ($$("txtClsBal").getValue() == "1") {
            return (CloseDr == 0 && CloseCr == 0);
        }
        else if ($$("txtTrans").getValue() == "1") {
            return (TrnDr == 0 && TrnCr == 0);
        }
    });
    debugger;
    $.each(newData, function (key, value) {
        debugger;
        //index = vData.indexOf(x => x.AC_ID === value.AC_ID);
        var index = vData.map(function (e) { return e.AC_ID; }).indexOf(value.AC_ID);
        if (index > -1) {
            vData.splice(index, 1);
        }
    });
    return vData;

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
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
function GridClear() {
    $$("gridRpt").clearAll();    
};
webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    //debugger;
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    
var offset = $("#divGrid").offset();

$$("gridRpt").define("height", ((vheight - offset.top - 30)));
$$("gridRpt").adjust();
    

};

function fnLoadGrid() {
    //debugger;
    if (fnChkSessVal() == false) return;
    try {

        if (Window1 != null) {
            Window1 = Window1.close();
        }
        if (Window2 != null) {
            Window2 = Window2.close();
        }
        var DispalyLedgerval = "";
        var Provisionalval = "";
        var SubLedgerval = "";
        var Sorton = "";
        var Memorandam = "";
        var InactiveLedger = "";
        var MonthWs = "";
        var SkipZero = "0"

        var vFromDt = window.FiscalStartDT ;
        var vToDt = $$("ToDt").getValue();
        if($$("txtDispLedg").getValue() == "1") DispalyLedgerval = "1";
        SubLedgerval = "";        
        Memorandam = "0";        
        MonthWs = $$("OptRptType").getValue();
        Provisionalval = "0";       
        Sorton = $$("txtSortOn").getValue();
        SkipZero = $$("txtSkipZero").getValue();               
        var PrevYrCompare = $$("txtCompare").getValue();

       

        var PeriodSno = $$("txtPeriodSno").getValue();
        if (PeriodSno == "") return false;


        var PeriodData = $$("dtPeriodPop").serialize(true);
        $$("gridRpt").clearAll();
        $$("gridRpt").destructor();
        GridDesign();
        
        //var CompId = $$("Property").getValue();
        var CompId = fnRetComboVal($$("Property"), "ORGID");
        var CompTy = fnRetComboVal($$("Property"), "TYPE");        
        var bMulti = "0";
        var vSplit = [];
        vSplit = CompId.split(",");
        //if (CompId.indexOf(",") >= 0) {
        if (CompTy == "2"){
            //var newData = vSplit.filter(function (el) {
            //    return el.toString().trim().toUpperCase() == "WS";
            //});
            //if (newData.length > 0) CompId = newData[0].toString().trim();
            //else CompId = vSplit[0].toString().trim();
            CompId = fnGetDefaultComp(CompId);
            bMulti = "1";
        }

        if (window.AC_CD_IND == "1") {
            if ($$("txtAccCd").getValue() == "1") $$("gridRpt").showColumn("ACC_CD");
            else $$("gridRpt").hideColumn("ACC_CD");
        }
        else {
            $$("gridRpt").hideColumn("ACC_CD");
        }

        if (MonthWs == "2") {
            $$("chkAllPeriod").blockEvent();
            $$("chkAllPeriod").setValue("0");
            $$("chkAllPeriod").unblockEvent();
            $$("chkAllPeriod").hide();
        }
        else {
            if (bMulti == "0") $$("chkAllPeriod").show();
            else {
                $$("chkAllPeriod").hide();
                $$("chkAllPeriod").blockEvent();
                $$("chkAllPeriod").setValue("0");
                $$("chkAllPeriod").unblockEvent();
            }
        }
        
        var i = 0;
        var ColVal = [];


        if (PeriodData.length == 0) return false;
        if ($$("chkAllPeriod").getValue() == "1") {

            for (var i = PeriodSno; i >= 1; i--) {
                //debugger;
                var newData = PeriodData.filter(function (el) {
                    return el.PERIOD_SNO == i;
                });

                if (newData.length > 0) {
                    var id = newData[0].PERIOD_START_DT + '//' + newData[0].PERIOD_END_DT;
                    var RwData = { id: id, FromDt: newData[0].PERIOD_START_DT, ToDt: newData[0].PERIOD_END_DT, FiscalYr: "", MonthCum: "0" };
                    $$("GrdPeriod").add(RwData, 0);
                    $$("GrdPeriod").refresh();
                    if (PrevYrCompare == "1") {
                        var id = newData[0].PRV_PERIOD_START_DT + '//' + newData[0].PRV_PERIOD_END_DT;
                        var RwData = { id: id, FromDt: newData[0].PRV_PERIOD_START_DT, ToDt: newData[0].PRV_PERIOD_END_DT, FiscalYr: "1", MonthCum: "0" };
                        $$("GrdPeriod").add(RwData, 0);
                        $$("GrdPeriod").refresh();
                    }
                }
            }
        }
        else {
            var newData = PeriodData.filter(function (el) {
                return el.PERIOD_SNO == PeriodSno;
            });

            if (newData.length > 0) {
                debugger;
                if (MonthWs == "2") {
                    var id = newData[0].PERIOD_START_DT + '//' + newData[0].PERIOD_START_DT;
                    var RwData = { id: id, FromDt: newData[0].PERIOD_START_DT, ToDt: newData[0].PERIOD_END_DT, FiscalYr: "", MonthCum: "1" };
                    $$("GrdPeriod").add(RwData, 0);
                    $$("GrdPeriod").refresh();
                }

                var id = newData[0].PERIOD_START_DT + '//' + newData[0].PERIOD_END_DT;
                var RwData = { id: id, FromDt: newData[0].PERIOD_START_DT, ToDt: newData[0].PERIOD_END_DT, FiscalYr: "", MonthCum: "0" };
                $$("GrdPeriod").add(RwData, 0);
                $$("GrdPeriod").refresh();

                if (PrevYrCompare == "1") {

                    if (MonthWs == "2") {
                        var id = "CUM_PRV_" + newData[0].PRV_PERIOD_START_DT + '//' + newData[0].PRV_PERIOD_END_DT;
                        var RwData = { id: id, FromDt: newData[0].PRV_PERIOD_START_DT, ToDt: newData[0].PRV_PERIOD_END_DT, FiscalYr: "1", MonthCum: "1" };
                        $$("GrdPeriod").add(RwData, 0);
                        $$("GrdPeriod").refresh();
                    }

                    var id = "PRV_" + newData[0].PRV_PERIOD_START_DT + '//' + newData[0].PRV_PERIOD_END_DT;
                    var RwData = { id: id, FromDt: newData[0].PRV_PERIOD_START_DT, ToDt: newData[0].PRV_PERIOD_END_DT, FiscalYr: "1", MonthCum: "0" };
                    $$("GrdPeriod").add(RwData, 0);
                    $$("GrdPeriod").refresh();



                }

            }
        }



        var FullData = $$("GrdPeriod").serialize();
        var len = FullData.length;

        if (bMulti == "0") {
            var len = FullData.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    debugger;
                    var key = "On" + "_" + FullData[i].ToDt.trim();
                    var Hdr = key.toString().replace("_", " ");
                    var vFisYr = FullData[i].FiscalYr.trim();
                    var vColumn = $$("gridRpt").config.columns;
                    var MonthCum = FullData[i].MonthCum;

                    if (vFisYr == "") {
                        if (MonthCum == "1") {
                            var key = "Cum" + "_" + FullData[i].ToDt.trim();
                            var Hdr = "Cumulative";
                            vColumn.push({
                                id: $.trim(key), header: [null, { text: Hdr }], css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                                template: function (obj, common, value, config, rowIndex) {
                                    if (value != null && value != "") {
                                        if (value < 0) {
                                            value = value * -1;
                                            vRet = "(" + fnCurrFormat(value) + ")";
                                        }
                                        else vRet = fnCurrFormat(value);
                                        return vRet;
                                    } else return "";

                                },
                            })
                        }
                        else {

                            if (MonthWs == "2") {
                                vColumn.push({
                                    id: $.trim(key), header: [{ text: Hdr, colspan: 2 }, { text: "Month" }], css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                                    template: function (obj, common, value, config, rowIndex) {
                                        if (value != null && value != "") {
                                            if (value < 0) {
                                                value = value * -1;
                                                vRet = "(" + fnCurrFormat(value) + ")";
                                            }
                                            else vRet = fnCurrFormat(value);
                                            return vRet;
                                        } else return "";

                                    },
                                })
                            }
                            else {
                                vColumn.push({
                                    id: $.trim(key), header: { text: Hdr, css: "webix_ss_header" }, css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                                    template: function (obj, common, value, config, rowIndex) {
                                        if (value != null && value != "") {
                                            if (value < 0) {
                                                value = value * -1;
                                                vRet = "(" + fnCurrFormat(value) + ")";
                                            }
                                            else vRet = fnCurrFormat(value);
                                            return vRet;
                                        } else return "";

                                    },
                                })

                            }

                        }
                    }
                    else {

                        if (MonthCum == "1") {
                            var key = "Cum" + "_" + FullData[i].ToDt.trim();
                            var Hdr = "Cumulative";
                            vColumn.push({
                                id: $.trim(key), header: [null, { text: Hdr, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }], width: 120, css: { 'text-align': 'right ! important; ' }, exportType: "number", exportFormat: "#,##0.00",
                                template: function (obj, common, value, config, rowIndex) {
                                    if (value != null && value != "") {
                                        if (value < 0) {
                                            value = value * -1;
                                            vRet = "(" + fnCurrFormat(value) + ")";
                                        }
                                        else vRet = fnCurrFormat(value);
                                        return vRet;
                                    } else return "";

                                },
                            })
                        }
                        else {
                            if (MonthWs == "2") {
                                vColumn.push({
                                    id: $.trim(key), header: [{ text: Hdr, colspan: 2, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, { text: "Month", css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }], width: 120, css: { 'text-align': 'right ! important; ' }, exportType: "number", exportFormat: "#,##0.00",
                                    template: function (obj, common, value, config, rowIndex) {
                                        if (value != null && value != "") {
                                            if (value < 0) {
                                                value = value * -1;
                                                vRet = "(" + fnCurrFormat(value) + ")";
                                            }
                                            else vRet = fnCurrFormat(value);
                                            return vRet;
                                        } else return "";

                                    },
                                })
                            }
                            else {
                                vColumn.push({
                                    id: $.trim(key), header: { text: Hdr, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, width: 120, css: { 'text-align': 'right ! important; ' }, exportType: "number", exportFormat: "#,##0.00",
                                    template: function (obj, common, value, config, rowIndex) {
                                        if (value != null && value != "") {
                                            if (value < 0) {
                                                value = value * -1;
                                                vRet = "(" + fnCurrFormat(value) + ")";
                                            }
                                            else vRet = fnCurrFormat(value);
                                            return vRet;
                                        } else return "";

                                    },
                                })
                            }
                        }

                    }
                }
                $$("gridRpt").refreshColumns();
            }
        }
        else {
            vSplit.forEach(function (entry) {
                var id = $.trim(entry);
                var Hdr = $.trim(entry);
                var dtComp = $$("gridComp").serialize();

                var CmpData = dtComp.filter(function (el) {
                    return el.id.toString().trim().toUpperCase() == $.trim(entry);
                });
                if (CmpData.length > 0) Hdr = CmpData[0].SHRT_NM;

                var vColumn = $$("gridRpt").config.columns;

                if (MonthWs == "0" || MonthWs == "1") {
                    if (PrevYrCompare == "1") {
                        var id1 = "PRV_" + id;
                        vColumn.push({
                            id: $.trim(id1), header: { text: Hdr, width: 120, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, width: 120, exportType: "number", exportFormat: "#,##0.00", css: { 'text-align': 'right ! important; ' },
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })
                    }
                    vColumn.push({
                        id: $.trim(id), header: Hdr, css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                        template: function (obj, common, value, config, rowIndex) {
                            if (value != null && value != "") {
                                if (value < 0) {
                                    value = value * -1;
                                    vRet = "(" + fnCurrFormat(value) + ")";
                                }
                                else vRet = fnCurrFormat(value);
                                return vRet;
                            } else return "";

                        },
                    })
                }
                else {
                    if (PrevYrCompare == "1") {

                        var id1 = "PRV_" + id;
                        var Hdr1 = "";
                        var newData = PeriodData.filter(function (el) {
                            return el.PERIOD_SNO == PeriodSno;
                        });
                        if (newData.length > 0) {
                            Hdr1 = Hdr + " (On_" + newData[0].PRV_PERIOD_END_DT + ")";
                        }

                        vColumn.push({
                            id: $.trim(id1), header: [{ text: Hdr1, colspan: 2, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, { text: "Month", css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;' } }], width: 120, exportType: "number", exportFormat: "#,##0.00", css: { 'text-align': 'right ! important; ' },
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })

                        var id1 = "CUM_PRV_" + id;
                        vColumn.push({
                            id: $.trim(id1), header: [null, { text: "Cumulative", css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }], width: 120, exportType: "number", exportFormat: "#,##0.00", css: { 'text-align': 'right ! important; ' },
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })


                    }

                    var Hdr1 = "";
                    var newData = PeriodData.filter(function (el) {
                        return el.PERIOD_SNO == PeriodSno;
                    });
                    if (newData.length > 0) {
                        Hdr1 = Hdr + " (On_" + newData[0].PERIOD_END_DT + ")";
                    }


                    if (MonthWs == "2") {
                        vColumn.push({
                            id: $.trim(id), header: [{ text: Hdr1, colspan: 2, }, { text: "Month", }], css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })
                    }
                    else {
                        vColumn.push({
                            id: $.trim(id), header: [{ text: Hdr, colspan: 2, }, { text: "Month", }], css: { 'text-align': 'right ! important; ', }, width: 120, exportType: "number", exportFormat: "#,##0.00",
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })
                    }

                    var id1 = "CUM_" + id;
                    vColumn.push({
                        id: $.trim(id1), header: [null, { text: "Cumulative", }], width: 120, exportType: "number", exportFormat: "#,##0.00", css: { 'text-align': 'right ! important; ' },
                        template: function (obj, common, value, config, rowIndex) {
                            if (value != null && value != "") {
                                if (value < 0) {
                                    value = value * -1;
                                    vRet = "(" + fnCurrFormat(value) + ")";
                                }
                                else vRet = fnCurrFormat(value);
                                return vRet;
                            } else return "";

                        },
                    })


                }


                $$("gridRpt").refreshColumns();
            })

            if (vSplit.length > 1) {
                var vColumn = $$("gridRpt").config.columns;
                if (MonthWs == "0" || MonthWs == "1") {
                    if (PrevYrCompare == "1") {
                        var id1 = "PRV_" + "TOT";
                        vColumn.push({
                            id: $.trim(id1), header: { text: "Consolidation", width: 130, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, width: 120, exportType: "number", css: { 'text-align': 'right ! important; ' }, exportFormat: "#,##0.00",
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })
                    }
                    vColumn.push({
                        id: "TOT", header: "Consolidation", css: { 'text-align': 'right ! important; ', }, width: 130, exportType: "number", exportFormat: "#,##0.00",
                        template: function (obj, common, value, config, rowIndex) {
                            if (value != null && value != "") {
                                if (value < 0) {
                                    value = value * -1;
                                    vRet = "(" + fnCurrFormat(value) + ")";
                                }
                                else vRet = fnCurrFormat(value);
                                return vRet;
                            } else return "";

                        },
                    })
                }
                else {

                    if (PrevYrCompare == "1") {
                        var id1 = "PRV_" + "TOT";
                        var Hdr1 = "";
                        var newData = PeriodData.filter(function (el) {
                            return el.PERIOD_SNO == PeriodSno;
                        });
                        if (newData.length > 0) {
                            Hdr1 = "Consolidation" + " (On_" + newData[0].PRV_PERIOD_END_DT + ")";
                        }
                        vColumn.push({
                            id: $.trim(id1), header: [{ text: Hdr1, colspan: 2, css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }, { text: "Month", css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }], width: 130, exportType: "number", css: { 'text-align': 'right ! important; ' }, exportFormat: "#,##0.00",
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })

                        var id1 = "CUM_PRV_" + "TOT";
                        vColumn.push({
                            id: $.trim(id1), header: [null, { text: "Cumulative", css: { 'background': '#b51454;', 'color': 'white;', 'font-weight': 'bold;', } }], width: 130, exportType: "number", exportFormat: "#,##0.00", css: { 'text-align': 'right ! important; ' },
                            template: function (obj, common, value, config, rowIndex) {
                                if (value != null && value != "") {
                                    if (value < 0) {
                                        value = value * -1;
                                        vRet = "(" + fnCurrFormat(value) + ")";
                                    }
                                    else vRet = fnCurrFormat(value);
                                    return vRet;
                                } else return "";

                            },
                        })

                    }
                    var Hdr1 = "";
                    var newData = PeriodData.filter(function (el) {
                        return el.PERIOD_SNO == PeriodSno;
                    });
                    if (newData.length > 0) {
                        Hdr1 = "Consolidation" + " (On_" + newData[0].PERIOD_END_DT + ")";
                    }
                    vColumn.push({

                        id: "TOT", header: [{ text: Hdr1, colspan: 2, }, { text: "Month", }], css: { 'text-align': 'right ! important; ', }, width: 130, exportType: "number", exportFormat: "#,##0.00",
                        template: function (obj, common, value, config, rowIndex) {
                            if (value != null && value != "") {
                                if (value < 0) {
                                    value = value * -1;
                                    vRet = "(" + fnCurrFormat(value) + ")";
                                }
                                else vRet = fnCurrFormat(value);
                                return vRet;
                            } else return "";

                        },
                    })

                    vColumn.push({
                        id: "CUM_TOT", header: [null, { text: "Cumulative" }], css: { 'text-align': 'right ! important; ', }, width: 130, exportType: "number", exportFormat: "#,##0.00",
                        template: function (obj, common, value, config, rowIndex) {
                            if (value != null && value != "") {
                                if (value < 0) {
                                    value = value * -1;
                                    vRet = "(" + fnCurrFormat(value) + ")";
                                }
                                else vRet = fnCurrFormat(value);
                                return vRet;
                            } else return "";

                        },
                    })
                }
                $$("gridRpt").refreshColumns();
            }


        }
        
        var MultiComp = "";
        var ReqType = "GET_FNLOADPROFITLOSS";
        if (bMulti == "1") {
                        
           // MultiComp = $$("Property").getValue();
            MultiComp = fnRetComboVal($$("Property"), "ORGID");
            ReqType = "GET_FNLOADPROFITLOSSMC";
        }

        Request = {
            REQTYPE: ReqType,
            COMPID: CompId,
            MULCOMPANY:MultiComp,
            GL_COMPID: window.GL_CompanyID,
            FISCALYEAR: window.FiscalYear,
            FromDt: vFromDt,
            ToDt: vToDt,
            Division: $("#Division").val(),
            DispalyLedgerval: DispalyLedgerval,
            SubLedgerval: SubLedgerval,
            Memorandam: Memorandam,
            Provisionalval: Provisionalval,
            Sorton: Sorton,
            MonthWs: MonthWs,
            SkipZero: SkipZero,
            Period: FullData,
            CompLstYr: PrevYrCompare,
            ShowAccCd : $$("txtAccCd").getValue(),
        }

        var dataparam = JSON.stringify(Request);

        

        var rowDatad = [];

        $("#LoadDIv").show();

        $.ajax({
            //async: false,
            async: true,
            url: "/GLReports/RPTAPI_CALL",
            type: 'POST',
            data: "request=" + dataparam,            
            success: function (d) {
                //debugger;
                if (d != "") {                  
                    rowDatad = JSON.parse(d);

                    $$("gridRpt").clearAll();
                    $$("gridRpt").parse(rowDatad);                   

                }
            },

            error: function (err) {
                $("#LoadDIv").hide();
                $("#alertType").val('fail');
            },
            complete: function () {
                $("#LoadDIv").hide();
            }

        });
    }
    catch (e) {
        $("#LoadDIv").hide();
        console.log(e.message)
    }

};

function fnChkSessVal() {
    debugger;
    var bVal = "0";
    $.ajax({
        async: false,
        url: "/GLReports/fnChkSessionval",
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

function fnRetComboVal(Obj, FldId) {
    if (Obj.getValue() == "") return "";
    var RetVal = "";
    var Data = Obj.getList().serialize();
    if (Data.length > 0) {
        var newData = Data.filter(function (el) {
            return el.id == Obj.getValue();
        });
        if (newData.length > 0) RetVal = newData[0][FldId].toString().trim();

    }

    return RetVal;
};
function fnGetDefaultComp(CompId) {
    if (CompId.indexOf(",") >= 0) {
        var vSplit = CompId.split(",");
        var newData = vSplit.filter(function (el) {
            return el.toString().trim().toUpperCase() == "WS";
        });
        if (newData.length > 0) CompId = newData[0].toString().trim();
        else CompId = vSplit[0].toString().trim();
    }
    return CompId;
};
