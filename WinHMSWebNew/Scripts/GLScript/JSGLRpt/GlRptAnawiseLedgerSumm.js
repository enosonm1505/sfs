 var Window1 = null;
var Window2 = null;

var PageLoad = function () {

    webix.ui({
        container: "divPropbox", inputwidth: 250,width: 250, view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } }
    });
   

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
        container: "divLedger", view: "search", readonly: true, id: "txtLedger", inputAlign: "left", placeholder: "<-ALL->", on: { onChange: function (newVal, OldVal) { } },
        on: {
            onSearchIconClick: function () {
                debugger;
                btnLedgSrchClick();
            }
        }
    });
  
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "FromDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    webix.ui({
        container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    });
    webix.ui({ container: "divBtnDisplay", id: "btnDisplay",  css: "webix_primary", view: "button",width:80, inputWidth: 80, label: "Display", click: function () { fnLoadGrid(); } });
    

};
function fnFromDtChange() {
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
                $$("ToDt").setValue($$("FromDt").getValue());
            }
        }
    }

};
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

};
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
                { id: "AC_CD", header: 'AcCode', width: 100, css: { 'text-align': 'center ! important', }, hidden: true },
                { id: "AC_ID", header: 'AcId', width: 100, css: { 'text-align': 'center ! important', }, hidden: true },
                { id: "AC_NM", header: 'Name', width: 280, css: { 'text-align': 'left ! important', }, },
                {
                    header: "Opening Balance",
                    id: "OPENBAL",  width: 120, css: { 'text-align': 'right ! important', }, exportType: "number",
                    exportFormat: "#,##0.00",
                },                
              
                {
                    header: "Dr Amt",
                    id: "DRAMT",  width: 120, css: { 'text-align': 'right ! important', },  exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    header: "Cr Amt",
                    id: "CRAMT", width: 120, css: { 'text-align': 'right ! important', }, exportType: "number",
                    exportFormat: "#,##0.00",
                },
                 {
                     header: "Current Balance",
                     id: "CURBAL", width: 120, css: { 'text-align': 'right ! important', }, exportType: "number",
                     exportFormat: "#,##0.00",
                 },
                   {
                       header: "Closing Balance",
                       id: "CLOSEBAL", width: 120, css: { 'text-align': 'right ! important', }, exportType: "number",
                       exportFormat: "#,##0.00",
                   },
                   
                     { id: "CRDR", header: 'CR/DR', width: 70, css: { 'text-align': 'left ! important', }, },
               
                                
                { id: "ANAID",  width: 90, hidden: true },
                { id: "CLR", header: { text: "CLR", },  hidden: true },

        ],
        data: [],
        on: {

            'onItemDblClick': function (id) {
                debugger;
               
            },
        },
        scheme: {
            $change: function (item) {
                
                if (item.CLR != "" && item.CLR != null) {
                    debugger;
                    var Columns = $$('gridRpt').config.columns;
                    var ColCnt = Columns.length;
                    var rowid = item.id;                    
                    debugger;
                    item.$css = item.CLR;
                    if(item.CLR =="TOT"){
                        $$("gridRpt").addCellCss(rowid, "AC_NM", "StrRAlign");
                        }
                    }
            },
            $export: function (obj) {
                debugger;
                var item = webix.copy(obj);                
                var vAmt = item.OPENDR;
                if (item.CLR != "ExcelHead") {
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.OPENDR = vAmt1;
                    }

                    var vAmt = item.OPENCR;
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.OPENCR = vAmt1;
                    }
                    var vAmt = item.TRNDR;
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.TRNDR = vAmt1;
                    }
                    var vAmt = item.TRNCR;
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.TRNCR = vAmt1;
                    }
                    var vAmt = item.CLOSEDR;
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.CLOSEDR = vAmt1;
                    }
                    var vAmt = item.CLOSECR;
                    if (vAmt != null && vAmt != undefined) {
                        var vAmt1 = vAmt.replace(/,/g, '');
                        vAmt1 = parseFloat(vAmt1);
                        item.CLOSECR = vAmt1;
                    }
                }
                
                return item;

            }

        },
        

    });
    gridResize("1");

    webix.ui({
        id: "gridComp",
        view: "datatable",
        hidden: true,
        data: [],
        columns: [
                { id: "id", header: 'COMPANY_ID', width: 250, css: { 'text-align': 'left ! important', }, },
                { id: "value", header: 'COMPANY_NM', width: 100, css: { 'text-align': 'right ! important', } },
                { id: "TYPE", header: 'TYPE', width: 100, css: { 'text-align': 'right ! important', } },
                { id: "USER_ID", header: ['USER_ID', ], width: 100, css: { 'text-align': 'right ! important', } },
                { id: "SEQ_NO", header: { text: "SEQ_NO", }, width: 100, css: { 'text-align': 'right ! important', } },
                { id: "DEPART_ID", header: { text: "DEPART_ID", }, width: 100, css: { 'text-align': 'right ! important', } },
                { id: "ACTIVE_ID", header: { text: "ACTIVE_ID", }, width: 100, css: { 'text-align': 'right ! important', } },


        ],
        data: [],


        on: {
            onBeforeClose: function () {
                return false;
            },
        }
    });
}
//function GridDesign1() {
//    webix.ui({
//        id: "gridMain",
//        container: "divGrid",
//        select: 'row',
//        view: "datatable",
//        fixedRowHeight: false,
//        rowLineHeight: 23,
//        autoConfig: true,
//        resizeColumn: true,
//        resizeRow: true,
//        spans: true,
//        navigation: true,
//        position: "flex",
//        css: "webix_header_border wingrd_hight",
//        data: [],
//        columns: [
//                { id: "AC_CD", header: 'Code', width: 100, css: { 'text-align': 'center ! important', }, hidden: true },
//                { id: "AC_NM", header: 'Name', width: 280, css: { 'text-align': 'left ! important', }, },
//                { id: "AC_ID", width: 90, hidden: true },
//                { id: "AC_CAT", width: 90, hidden: true },
//                { id: "CIND", width: 200, hidden: true },
//                { id: "LINKACCID", width: 200, hidden: true },
//                { id: "CLR", header: { text: "CLR", }, hidden: true },

//        ],
//        data: [],
//        on: {

//            'onItemDblClick': function (id) {
//                debugger;
//                //fnRowDblClick(id);
//            },
//        },
//        scheme: {
//            $change: function (item) {

//                if (item.CLR != "" && item.CLR != null) {
//                    debugger;
//                    var Columns = $$('gridMain').config.columns;
//                    var ColCnt = Columns.length;
//                    var rowid = item.id;
//                    debugger;
//                    item.$css = item.CLR;
//                }
//            },
//            $export: function (obj) {
//                debugger;
//                var item = webix.copy(obj);                
//                var ColInd = 0;
//                if (item.CLR != "ExcelHead") {

//                    $$("gridMain").eachColumn(
//                        function (columnId) {
//                            ColInd = $$("gridMain").getColumnIndex(columnId);
//                            if(ColInd>2)
//                            {
//                                var vAmt = item[columnId];
//                                if (vAmt != null && vAmt != undefined) {
//                                    var vAmt1 = vAmt.replace(/,/g, '');
//                                    vAmt1 = parseFloat(vAmt1);
//                                    item[columnId] = vAmt1;
//                                }
//                            }
//                        }
//                    )

                                    
//                }

//                return item;
//            }
//        },

//    });
//};

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
                        view: "scrollview", scroll: "y", height: 250, width: 250, body: {
                            padding: { top: 20, left: 30, bottom: 20, right: 10 },
                            rows: [
                               
                               
                               
                                { view: "checkbox", id: "chkOpnBal", width: 150, labelWidth: 5, labelRight: "Opening Balance", customCheckbox: false, click: function () {  }, },
                                { view: "checkbox", id: "chkTrans", width: 150, labelWidth: 5, labelRight: "Transaction", customCheckbox: false, click: function () {  }, },
                                { view: "checkbox", id: "chkClsBal", width: 150, labelWidth: 5, labelRight: "Closing Balance", customCheckbox: false, click: function () {  }, },
                                 { view: "checkbox", id: "chkCurBal", width: 150, labelWidth: 5, labelRight: "Current Balance", customCheckbox: false, click: function () {  }, },


                                { view: "text", id: "txtClsBal", hidden: true, value: "1" },
                                { view: "text", id: "txtTrans", hidden: true, value: "1" },
                                { view: "text", id: "txtOpnBal", hidden: true, value: "1" },
                                 { view: "text", id: "txtCurBal", hidden: true, value: "0" },
                              

                               
                            ]
                        }
                    },
                    { cols: [{}, { view: "button", align: 'center', id: "Okoptions", css: 'webix-primary', label: "OK", inputWidth: 80, width: 80, click: function () { btnOkOptionClick(); } }], }
            ]

        }
    });
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
        width: 600,
        move: true,
        body: {
            padding: { top: 20, left: 30, bottom: 20, right: 10 },
            rows: [
                {
                    cols:[
                          { view: "richselect", labelWidth: 110, inputWidth: 300, width: 300, id: "ddlAnaLvl", label: "Ana Lvl", on: { onChange: function (newVal, OldVal) { } }, },
                       {
                           view: "button", id: 'SrchAna', minWidth: 250, width: 30, height: 28, type: 'icon', icon: 'wxi-search', css: "webix_primary",                          
                           on: {
                               onItemClick: function () {
                                   btnAnaSrchClick();
                               }}
                       },
                    ]

                },
              
                  
                    { width: 210, labelWidth: 110, view: "checkbox", id: "ChkSuppress", label: "Suppress Zero", customCheckbox: false, },
                    { width: 210, labelWidth: 110, view: "checkbox", id: "Chkgrpwise", label: "Groupwise", customCheckbox: false, },
                    { width: 210, labelWidth: 110, view: "checkbox", id: "ChkIncExp", label: "Income & Expense", customCheckbox: false, },
                    { cols: [{}, { view: "button", maxWidth: 80, id: "OkFilter", align: 'center', css: 'webix-primary', label: "OK", inputWidth: 80, width: 80, click: function () { btnOkFilterClick(); } }], },

                    { view: "text", id: "TxtSuppress", hidden: true, value: "1" },
                    { view: "text", id: "Txtgrpwise", hidden: true, value: "1" },
                    { view: "text", id: "TxtIncExp", hidden: true, value: "1" },
                    { view: "text", id: "TxtAnaLvl", hidden: true,},
                  

            ]
        }
    });
}
function btnFilterClick() {
    debugger;
    $$("ChkSuppress").setValue($$("TxtSuppress").getValue());
    $$("ChkIncExp").setValue($$("TxtIncExp").getValue());
    $$("ddlAnaLvl").setValue($$("TxtAnaLvl").getValue());
    $$("Chkgrpwise").setValue($$("Txtgrpwise").getValue());
   

    $$("RptAdvFilter").show();
};
function btnOkFilterClick() {
    debugger;
    GridClear();
    $$("TxtSuppress").setValue($$("ChkSuppress").getValue());
    $$("TxtIncExp").setValue($$("ChkIncExp").getValue());
    $$("TxtAnaLvl").setValue($$("ddlAnaLvl").getValue());
    $$("Txtgrpwise").setValue($$("Chkgrpwise").getValue());
    
    $$("RptAdvFilter").hide();
};
function btnOkOptionClick() {
    debugger;
    GridClear();
    $$("txtClsBal").setValue($$("chkClsBal").getValue());
    $$("txtTrans").setValue($$("chkTrans").getValue());
    $$("txtOpnBal").setValue($$("chkOpnBal").getValue());
    $$("txtCurBal").setValue($$("chkCurBal").getValue());
    fnShowColumn();

  
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {  
    $$("chkClsBal").setValue($$("txtClsBal").getValue());
    $$("chkTrans").setValue($$("txtTrans").getValue());
    $$("chkOpnBal").setValue($$("txtOpnBal").getValue());
    $$("RptOptionsNew").show();
};

function fnPropertyLoad(CompId) {
    debugger;
    Request = {
        //  REQTYPE: "GET_FNMULPROPERTY",
        REQTYPE: "GET_FNPROPERTYLOAD",
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
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("Property").define("options",rowData);
                $$("Property").refresh();
                $$("Property").setValue(Prop_Id);

             
            }
        },
    });
};


function fnLondGlInitCont(CompId) {

    $$("txtClsBal").setValue("1");
    $$("txtTrans").setValue("1");
    $$("txtOpnBal").setValue("1");
    $$("txtCurBal").setValue("0");
    $$("TxtSuppress").setValue("1");
    $$("Txtgrpwise").setValue("1");
    $$("TxtIncExp").setValue("1");
   

   


    window.GL_CompanyID = "";
    window.FiscalFromDt = "";
    window.FiscalToDt = "";
    window.GroupIds = "";
    window.LevelIds = "";
    window.LedgerIds = "";
    
   
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
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.GL_CompanyID = rowData.GL_CompanyID;
                var dtComp = rowData.dtComp;
                var dtCont = rowData.dtCont;
                window.AC_CD_IND = dtCont[0].AC_CD_IND;
                window.GSTAppl = dtComp[0].GL_VAT_IND;
               


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
            }
        },
    });

    if (window.AC_CD_IND == "1") {
        $$("gridRpt").showColumn("AC_CD");
       // $$("gridMain").showColumn("AC_CD");

    }
    else {
        $$("gridRpt").hideColumn("AC_CD");
      //  $$("gridMain").hideColumn("AC_CD");
    }

 

    if (window.OPEN_TRN_REP_IND == "1") {
        $$("txtOpnBal").setValue("1");
        $$("txtTrans").setValue("0");
    }
    else if (window.OPEN_TRN_REP_IND == "2") {
        $$("txtTrans").setValue("1");
        $$("txtOpnBal").setValue("1");
    }
    else if (window.OPEN_TRN_REP_IND == "0") {
        $$("txtOpnBal").setValue("1");
        $$("txtTrans").setValue("1");
    }
    if (window.G6_IND == "1") {
        $("#Group").prop("checked", true);
    }
    if (window.W1_IND == "1") {
        $("#Group").prop("checked", false);
        $("#Group").attr("disabled", true);
    }


    fnShowColumn();

    //if (window.GSTAppl == "1") $$("chkGstCd").show();
    //else  $$("chkGstCd").hide();
    //return rowData;
};
function fnPropChange(CompId) {
    debugger;
    var bMulti = "0";

    var vSplit = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");    

    
    //if (CompTy == "2"){
        
    //    CompId = fnGetDefaultComp(CompId);
  
    //    bMulti = "1";             
       
    //}
    //else {
    //    $$("gridRpt").show();   
    //    $$("gridRpt").adjust();
        
    //}

    fnLondGlInitCont(CompId);
    if (bMulti == "0") {
        if (window.DIV_APPL_IND == "1") {
            $("#divDiv").show();
        }
      
    }
    else {
        $("#divDiv").hide();
        $$("txtClsBal").setValue("0");
        $$("txtTrans").setValue("0");
        $$("txtOpnBal").setValue("1");
      
    }

    GridClear();
    fnGroupLoad();
    fnPeriodLoad();
    fnGlAnaLvlLoad();
   

};
function fnGlAnaLvlLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    Request = {
        REQTYPE: "GET_GLANALVLLOAD",
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
                options = rowData;                
                $$("ddlAnaLvl").define("options", options);
                $$("ddlAnaLvl").setValue(rowData[0].id);
                $$("TxtAnaLvl").setValue(rowData[0].id);
               


            }
        },
    });

    //return rowData;
};

function fnPeriodLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
                multiselect: true,
                areaselect: true,
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
                           
                            align:'center',
                            css: 'webix-primary',
                            label: "Ok",
                            inputWidth: 80,
                            click: function () {
                                debugger;
                                if ($$("dtPeriodPop").count()) {
                                   // var selRow = $$("dtPeriodPop").getSelectedItem();
                                    //var id = selRow.id;
                                    //fnPeriodOkClick(id);
                                    var selRow = $$("dtPeriodPop").getSelectArea();
                                    if (selRow != undefined)
                                    {
                                        var StRow = selRow.start;
                                        var id = StRow.row;
                                        var selectRow = $$("dtPeriodPop").getItem(id);
                                        var PerStDt = selectRow.PERIOD_START_DT1;
                                        $$("FromDt").setValue(PerStDt);

                                        var EndRow = selRow.end;
                                        id = EndRow.row;
                                        selectRow = $$("dtPeriodPop").getItem(id);
                                        var PerEndDt = selectRow.PERIOD_END_DT1;
                                        $$("ToDt").setValue(PerEndDt);
                                        $$("dtPeriodPop").removeSelectArea();
                                        $$("PeriodPopup").hide();
                                    }
                                    else {
                                        var selRow = $$("dtPeriodPop").getSelectedItem();
                                        var id = selRow.id;
                                        fnPeriodOkClick(id);
                                    }
                                 
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
        minWidth: 400,
        maxWidth: 400,
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
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "Account Code", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
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
                        align: 'center',
                        css: 'webix-primary',
                        label: "Ok",
                        inputWidth: 80,
                        click: function () {
                            debugger;
                            GridClear();
                            var vGrpNm = "";
                            var vGrpId = "";
                            var vLvlId = "";
                            window.GroupIds = "";
                            window.LevelIds = "";
                            $$("txtGroup").setValue("");
                            $$("dtGroupPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK == "1") {
                                    if (vGrpNm != "") {
                                        vGrpNm = vGrpNm + "," + obj.value
                                    }
                                    else {
                                        vGrpNm = obj.value
                                    }

                                    if (vGrpId != "") {
                                        vGrpId = vGrpId + ",'" + obj.id + "'";
                                        vLvlId = vLvlId + ",'" + obj.LEVEL_NO + "'";
                                    }
                                    else {
                                        vGrpId = "'" + obj.id + "'";
                                        vLvlId = "'" + obj.LEVEL_NO + "'";
                                    }
                                }
                            });
                            if (vGrpId != "") {
                                window.GroupIds = vGrpId;
                                window.LevelIds = vLvlId;
                                $$("GroupPopup").hide();
                                $$("txtGroup").setValue(vGrpNm);

                            }
                            else {
                                $$("GroupPopup").hide();
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
                       { header: "Account Code", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
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
                    },
                    'onItemDblClick': function (id, e, node) {
                        var selectedRows = this.getSelectedItem(id.row);
                        var vLedId = $.trim(selectedRows[0].id);
                        var vLedNm = $.trim(selectedRows[0].value);
                        GridClear();
                        window.LedgerIds = "'" + vLedId + "'";
                        $$("txtLedger").setValue(vLedNm);
                        $$("LedgerPopup").hide();
                    }

                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        align: 'center',
                        css: 'webix-primary',
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
                                if (obj.CHK == "1") {
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
function fnLoadLedgerGrid() {
    debugger;
    var rowDatad = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    var GrpIds = window.GroupIds;
    Request = {
        REQTYPE: "GET_LEDGERLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        GROUP_ID: GrpIds
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
function fnGroupLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    Request = {
        REQTYPE: "GET_GROUPLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        ANALWISERPT: "1",
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
               
                $$("dtGroupPop").clearAll();
                $$("dtGroupPop").parse(rowData);
                $$("dtGroupPop").refresh();
               


            }
        },
    });

    //return rowData;
};
function fnLoadAnalyGrid() {
    debugger;
    var rowDatad = [];
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    var AnaLvlId = $$("ddlAnaLvl").getValue();
    Request = {
        REQTYPE: "GET_ANALYLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        AnaLvlId: AnaLvlId
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
                $$("dtAnalyPop").clearAll();
                $$("dtAnalyPop").parse(rowDatad);
                $$("dtAnalyPop").refresh();

            }
        }
    })

};
function AnaPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "AnalyPopup",
        head: "Analysis",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtAnalyPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Analysis Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "Code", id: "id", hidden: true, css: { 'text-align': 'center ! important' } },
                        { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                     
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
                    },
                    'onItemDblClick': function (id, e, node) {
                        var selectedRows = this.getSelectedItem(id.row);
                        var vCode = $.trim(selectedRows[0].Code);
                     
                        GridClear();
                        window.AnaIds = "'" + vCode + "'";
                       
                    }

                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        align: 'center',
                        css: 'webix-primary',
                        label: "Ok",
                        inputWidth: 80,
                        click: function () {
                            debugger;
                            GridClear();
                            var vAnaNm = "";
                            var vCode = "";
                            window.AnaIds = "";
                            
                            $$("dtAnalyPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK == "1") {
                                    if (vAnaNm != "") {
                                        vAnaNm = vAnaNm + "," + obj.value
                                    }
                                    else {
                                        vAnaNm = obj.value;
                                    }
                                    if (vCode != "") {
                                        vCode = vCode + ",'" + obj.id + "'"
                                    }
                                    else {
                                        vCode = "'" + obj.id + "'"
                                    }
                                }
                            });
                            if (vCode != "") {
                                window.AnaIds = vCode;
                                $$("AnalyPopup").hide();
                              

                            }
                            else {
                                $$("AnalyPopup").hide();
                               
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
function btnAnaSrchClick() {
    fnLoadAnalyGrid();
    $$("dtAnalyPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtAnalyPop").filterByAll();
    debugger;
    var ids = window.AnaIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtAnalyPop").data.each(function (obj) {
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

        $$("dtAnalyPop").updateItem(obj.id, obj)

    })
    $$("dtAnalyPop").refresh();

    $$("AnalyPopup").show();
    $$("dtAnalyPop").select($$("dtAnalyPop").getFirstId());
    webix.UIManager.setFocus($$("dtAnalyPop"));
    $$("dtAnalyPop").moveSelection("top");

};


function fnLoadGrid() {
    debugger;
    $$("gridRpt").clearAll();
    //$$("gridMain").clearAll();
    fnShowColumn();
    var bMulti = "0";
    var MULCOMPANY = "";
        
    var AnaLvlId = $$("ddlAnaLvl").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();

    //var vOpt = "";

    //if ($$("txtOpnBal").getValue() == "1") vOpt = "1";
    //else if ($$("txtTrans").getValue() == "1") vOpt = "2";
    //else if ($$("txtClsBal").getValue() == "1") vOpt = "3";
    
    var ReqNm = "";
    ReqNm = "GET_GLANAWISELEDGERDISPLAY"
    
    
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");


    //if (CompTy == "2") {
    //    bMulti = "1";
    //}
   
    
    var ChkSuppress = "0";
    var Chkgrpwise = "0";
    var ChkIncExp = "0";
 
   
    ChkSuppress = $$("TxtSuppress").getValue();   
    ChkGrpwise = $$("Txtgrpwise").getValue();
    ChkIncExp = $$("TxtIncExp").getValue(); 
    var AcIds = window.LedgerIds;
    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var AnaIds = window.AnaIds;
    debugger;
    Request = {        
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        MULCOMPANY: MULCOMPANY,
        FISCALYEAR: window.FiscalYear,
        STARTDT : window.FiscalFromDt,
        FROMDT: FromDt,        
        TODT: ToDt,        
        ChkSuppress: ChkSuppress,
        ChkGrpwise: ChkGrpwise,
        CHKINCEXP: ChkIncExp,
        GRPIDS: GrpIds,
        LEVIDS: LvlIds,
        ACIDS: AcIds,
        ANALVLID: AnaLvlId,
        ANAIDS: AnaIds,
     

    }
    $("#LoadDIv").show();
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
                if (bMulti == "1") {
                    //$$("gridMain").parse(rowData);
                    //$$("gridMain").refresh();
                }
                else {
                    $$("gridRpt").parse(rowData);
                    $$("gridRpt").refresh();
                }
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
//function fnSuppressBlankRow(DataRows) {
//    debugger;
//    var vData = webix.copy(DataRows);
//    var newData = vData.filter(function (el) {
//        debugger;
//        var OpenDr = 0;
//        var OpenCr = 0;
//        var CloseCr = 0;
//        var CloseDr = 0;
//        var TrnDr = 0;
//        var TrnCr = 0;
//        if (el["OPENDR"]) OpenDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
//        if (el["OPENCR"]) OpenCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
//        if (el["CLOSEDR"]) CloseDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
//        if (el["CLOSECR"]) CloseCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
//        if (el["TRNDR"]) TrnDr = parseFloat(el["OPENDR"].replace(/,/g, ''));
//        if (el["TRNDR"]) TrnCr = parseFloat(el["OPENDR"].replace(/,/g, ''));
      

//        if ($$("txtClsBal").getValue() == "1") {
//            $$("gridRpt").showColumn("CLOSEDR");
//            $$("gridRpt").showColumn("CLOSECR");
//        }
//        else {
//            $$("gridRpt").hideColumn("CLOSEDR");
//            $$("gridRpt").hideColumn("CLOSECR");
//        }
//        if ($$("txtOpnBal").getValue() == "1") {
//            $$("gridRpt").showColumn("OPENDR");
//            $$("gridRpt").showColumn("OPENCR");
//        }
//        else {
//            $$("gridRpt").hideColumn("OPENDR");
//            $$("gridRpt").hideColumn("OPENCR");
//        }

//        if ($$("txtTrans").getValue() == "1") {
//            $$("gridRpt").showColumn("TRNDR");
//            $$("gridRpt").showColumn("TRNCR");
//        }
//        else {
//            $$("gridRpt").hideColumn("TRNDR");
//            $$("gridRpt").hideColumn("TRNCR");
//        }
//        if ($$("txtCurBal").getValue() == "1") {
//            $$("gridRpt").showColumn("CURBAL");
          
//        }
//        else {
//            $$("gridRpt").hideColumn("CURBAL");
       
//        }

//        if ($$("txtClsBal").getValue() == "1" && $$("txtOpnBal").getValue() == "1" && $$("txtTrans").getValue() == "1") {
//            return (OpenDr == 0 && OpenCr == 0 && CloseDr == 0 && CloseCr == 0 && TrnDr == 0 && TrnCr == 0);
//        }
//        else if ($$("txtClsBal").getValue() == "1" && $$("txtOpnBal").getValue() == "1") {
//            return (OpenDr == 0 && OpenCr == 0 && CloseDr == 0 && CloseCr == 0);
//        }
//        else if ($$("txtTrans").getValue() == "1" && $$("txtOpnBal").getValue() == "1") {
//            return (OpenDr == 0 && OpenCr == 0 && TrnDr == 0 && TrnCr == 0);
//        }
//        else if ($$("txtTrans").getValue() == "1" && $$("txtClsBal").getValue() == "1") {
//            return (CloseDr == 0 && CloseCr == 0 && TrnDr == 0 && TrnCr == 0);
//        }
//        else if ($$("txtOpnBal").getValue() == "1") {
//            return (OpenDr == 0 && OpenCr == 0);
//        }
//        else if ($$("txtClsBal").getValue() == "1") {
//            return (CloseDr == 0 && CloseCr == 0);
//        }
//        else if ($$("txtTrans").getValue() == "1") {
//            return (TrnDr == 0 && TrnCr == 0);
//        }
//    });
//    debugger;
//    $.each(newData, function (key, value) {
//        debugger;
//        //index = vData.indexOf(x => x.AC_ID === value.AC_ID);
//        var index = vData.map(function (e) { return e.AC_ID; }).indexOf(value.AC_ID);
//        if (index > -1) {
//            vData.splice(index, 1);
//        }
//    });
//    return vData;

//};
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
    var CompId = $$("Property").getValue();
    //var CompId = fnRetComboVal($$("Property"), "ORGID");
    //var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
    if ($$("txtClsBal").getValue() == "1") {
        $$("gridRpt").showColumn("CLOSEBAL");
        $$("gridRpt").showColumn("CRDR");
      
    }
    else {
        $$("gridRpt").hideColumn("CLOSEBAL");
        $$("gridRpt").hideColumn("CRDR");
     
    }
    if ($$("txtOpnBal").getValue() == "1") {
        $$("gridRpt").showColumn("OPENBAL");
     
    }
    else {
        $$("gridRpt").hideColumn("OPENBAL");
    
    }

    if ($$("txtTrans").getValue() == "1") {
        $$("gridRpt").showColumn("DRAMT");
        $$("gridRpt").showColumn("CRAMT");
    }
    else {
        $$("gridRpt").hideColumn("DRAMT");
        $$("gridRpt").hideColumn("CRAMT");
    }
    if ($$("txtCurBal").getValue() == "1") {
        $$("gridRpt").showColumn("CURBAL");

    }
    else {
        $$("gridRpt").hideColumn("CURBAL");

    }

};

//function fnChkClsClick() {
//    debugger;
//    //CompId = $$("Property").getValue();
//    var CompId = fnRetComboVal($$("Property"), "ORGID");
//    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    
//    //if (CompId.indexOf(",") >= 0) {
//    if (CompTy == "2"){
//        if ($$("chkClsBal").getValue() == "1") {
//            $$("chkOpnBal").setValue() == "0"; $$("chkTrans").setValue() == "0";
//        }
//        else {
//            if ($$("chkOpnBal").getValue() == "0" && $$("chkTrans").getValue() == "0") $$("chkClsBal").setValue("1");
//        }
//    }
//    else {
//        if ($$("chkClsBal").getValue() == "0") {
//            if ($$("chkOpnBal").getValue() == "0" && $$("chkTrans").getValue() == "0") $$("chkClsBal").setValue("1");

//        }
//    }
//};
//function fnChkTransClick() {
//    debugger;
//    //CompId = $$("Property").getValue();
//    var CompId = fnRetComboVal($$("Property"), "ORGID");
//    var CompTy = fnRetComboVal($$("Property"), "TYPE");
//    //if (CompId.indexOf(",") >= 0) {
//    if (CompTy == "2"){
//        if ($$("chkTrans").getValue() == "1") {
//            $$("chkOpnBal").setValue() == "0"; $$("chkClsBal").setValue() == "0";
//        }
//        else {
//            if ($$("chkOpnBal").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkTrans").setValue("1");
//        }
//    }
//    else {
//        if ($$("chkTrans").getValue() == "0") {
//            if ($$("chkOpnBal").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkTrans").setValue("1");

//        }
//    }
//};

//function fnChkOpenClick() {
//    debugger;
//    //CompId = $$("Property").getValue();
//    var CompId = fnRetComboVal($$("Property"), "ORGID");
//    var CompTy = fnRetComboVal($$("Property"), "TYPE");
//    //if (CompId.indexOf(",") >= 0) {
//    if (CompTy == "2") {
//        if ($$("chkOpnBal").getValue() == "1") {
//            $$("chkClsBal").setValue() == "0"; $$("chkTrans").setValue() == "0";
//        }
//        else {
//            if ($$("chkTrans").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkOpnBal").setValue("1");
//        }
//    }
//    else{
//        if ($$("chkOpnBal").getValue() == "0") {
//            if($$("chkTrans").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkOpnBal").setValue("1"); 
        
//        }    
//    }
//};







function GridClear() {
    $$("gridRpt").clearAll();
  //  $$("gridMain").clearAll();
};
webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
 
        var offset = $("#divGrid").offset();

        $$("gridRpt").define("height", ((vheight - offset.top - 30)));
        $$("gridRpt").adjust();
        //if ($$("gridMain")) {
        //    $$("gridMain").define("height", ((vheight - offset.top - 30)));
        //    $$("gridMain").adjust();
        //}

  

}

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