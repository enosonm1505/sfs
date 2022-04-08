var Window1 = null;
var Window2 = null;

var PageLoad = function () {

    webix.ui({
        container: "divPropbox", inputwidth: 250,width: 250, view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } }
    });
    webix.ui({ container: "divDivis", label:"Division", labelWidth: 90, view: "richselect", id: "ddlDivis", on: { onChange: function (newVal, OldVal) { GridClear(); } }, });
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "FromDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    webix.ui({
        container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    });
    webix.ui({ container: "divBtnDisplay", id: "btnDispay",  css: "webix_primary", view: "button",width:80, inputWidth: 80, label: "Display", click: function () { fnLoadGrid(); } });
    //webix.ui({ container: "divChkDr", width: 100, view: "checkbox", id: "chkDr", label: "DR Trn", customCheckbox: false, value: "1", click: function () { GridClear(); } });
    //webix.ui({ container: "divChkCr", width: 100, view: "checkbox", id: "chkCr", label: "CR Trn", customCheckbox: false, value: "1", click: function () { GridClear(); }});
    //webix.ui({ container: "divSubled", width: 100, view: "checkbox", id: "chkSub", label: "Sub Ledger", customCheckbox: false, value: "1", click: function () { GridClear(); } });
    //webix.ui({ container: "divChkAcCd", width: 100, view: "checkbox", id: "chkAcCd", label: "Ac Cd", customCheckbox: false, click: function () { GridClear(); } });

};
function fnFromDtChange() {
    debugger;
    GridClear();
    //var vStartDt = window.FiscalStartDT;
    //vStartDt = vStartDt.replace(/-/g, '');
    //vStartDt = parseFloat(vStartDt);
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
                { id: "AC_CD", header: 'Code', width: 100, css: { 'text-align': 'center ! important', }, hidden:true },
                { id: "AC_NM", header: 'Name', width: 280, css: { 'text-align': 'left ! important', }, },
                {
                    header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Opening Balance" }, { text: "DR", css: { 'text-align': 'center', } }],
                    id: "OPENDR",  width: 140, css: { 'text-align': 'right ! important', }, exportType: "number",
                    exportFormat: "#,##0.00",
                },                
                {
                    header: [null, { css: { 'text-align': 'center' }, text: "CR", }],
                    id: "OPENCR", width: 140, css: { 'text-align': 'right ! important', }, exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {   header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Transaction" }, { text: "DR", css: { 'text-align': 'center', } }],
                    id: "TRNDR",  width: 140, css: { 'text-align': 'right ! important', },  exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {   header: [null, { css: { 'text-align': 'center' }, text: "CR", }],
                    id: "TRNCR",  width: 140, css: { 'text-align': 'right ! important', }, exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Closing Balance" }, { text: "DR", css: { 'text-align': 'center', } }],
                    id: "CLOSEDR", width: 140, exportType: "number", css: { 'text-align': 'right ! important', },
                    exportFormat: "#,##0.00",
                },
                {   header: [null, { css: { 'text-align': 'center' }, text: "CR", }],
                    id: "CLOSECR",  width: 140, css: { 'text-align': 'right ! important', },                    
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                                
                { id: "AC_ID",  width: 90, hidden: true },
                { id: "AC_CAT",  width: 90, hidden: true },
                { id: "CIND",  width: 200, hidden: true },
                { id: "LINKACCID",  width: 200, hidden: true },
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
                    debugger;
                    item.$css = item.CLR;                    
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
function GridDesign1() {
    webix.ui({
        id: "gridMain",
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
                { id: "AC_CD", header: 'Code', width: 100, css: { 'text-align': 'center ! important', }, hidden: true },
                { id: "AC_NM", header: 'Name', width: 280, css: { 'text-align': 'left ! important', }, },
                { id: "AC_ID", width: 90, hidden: true },
                { id: "AC_CAT", width: 90, hidden: true },
                { id: "CIND", width: 200, hidden: true },
                { id: "LINKACCID", width: 200, hidden: true },
                { id: "CLR", header: { text: "CLR", }, hidden: true },

        ],
        data: [],
        on: {

            'onItemDblClick': function (id) {
                debugger;
                //fnRowDblClick(id);
            },
        },
        scheme: {
            $change: function (item) {

                if (item.CLR != "" && item.CLR != null) {
                    debugger;
                    var Columns = $$('gridMain').config.columns;
                    var ColCnt = Columns.length;
                    var rowid = item.id;
                    debugger;
                    item.$css = item.CLR;
                }
            },
            $export: function (obj) {
                debugger;
                var item = webix.copy(obj);                
                var ColInd = 0;
                if (item.CLR != "ExcelHead") {

                    $$("gridMain").eachColumn(
                        function (columnId) {
                            ColInd = $$("gridMain").getColumnIndex(columnId);
                            if(ColInd>2)
                            {
                                var vAmt = item[columnId];
                                if (vAmt != null && vAmt != undefined) {
                                    var vAmt1 = vAmt.replace(/,/g, '');
                                    vAmt1 = parseFloat(vAmt1);
                                    item[columnId] = vAmt1;
                                }
                            }
                        }
                    )

                                    
                }

                return item;
            }
        },

    });
};
function fnRowDblClick(RowId) {
    debugger;
    if (Window1 != null) {
        Window1 = Window1.close();
    }
    if (Window2 != null) {
        Window2 = Window2.close();
    }

    var selRow = $$("gridRpt").getItem(RowId);    
    var AC_NM = selRow.AC_NM;
    var AC_ID = selRow.AC_ID;
    var AC_CAT = selRow.AC_CAT;
    var Division = $$("ddlDivis").getValue();
    var From = $$("FromDt").getText();
    var To = $$("ToDt").getText();

    //var CompId = $$("Property").getValue();

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);

    if (Division == "<-ALL->") Division = "";
    $("#AC_IDD").val(AC_ID);
    $("#AC_NMM").val(AC_NM);
    $("#From").val(From);
    $("#To").val(To);
   

    if (AC_ID == "" || AC_ID == null) return;

    //var UrlQryStr = CompId + "~" + Division + "~" + TRN_ID_SRNO + "~" + TRN_TY_ID + "~" + V_DT;
    if (AC_ID != "")
    {
        $.ajax({
            type: "POST",
            async: false,
            url: "/GLReports/GroupTrialBalancePopup",
            data: "COMP_ID=" + CompId + "&Division=" + Division + "&From=" + From + "&To=" + To + "&AC_NM=" + AC_NM + "&AC_ID=" + AC_ID,
            success: function (data) {
                var PageUrl = "";
                if (AC_CAT == "G") {
                    //Window1 = window.open("/GLTransaction/AccControl?PARTIAL=1", "PopupWindow", "width=970,height=540,left=30,top=100");
                    PageUrl = "/GLTransaction/AccControl?PARTIAL=1";
                }
                else if (AC_CAT == "L") {                
                    //Window2 = window.open("/GLReports/GLLedgerDetailPop?PARTIAL=1", "PopupWindow", "width=1300,height=540,left=30,top=100");
                    PageUrl = "/GLReports/GLLedgerDetailPop?PARTIAL=1";
                }

                GlDrillDownWindowLoad(PageUrl);
            }

        });
     
    }
   

};
function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillLedDetPopup",
            head: "",
            position: "center",
            autowidth: true,
            on: {
                onShow: function () {
                    debugger;
                    var vWidth = window.innerWidth
                                   || document.documentElement.clientWidth
                                   || document.body.clientWidth;
                    var vHeight = window.innerHeight
                                   || document.documentElement.clientHeight
                                   || document.body.clientHeight;
                    if (vWidth > 800) vWidth = vWidth - 20;
                    if (vHeight > 550) vHeight = vHeight - 20;
                    $$('DrillLedDetPopup').define("width", vWidth);
                    $$('DrillLedDetPopup').define("height", vHeight)
                    $$('DrillLedDetPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-LedDet",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
                }
                ],

            }
        }).show();

    })
};
function loadOptionPopWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptOptionsNew",
        head: "Advance filter",
        position: "center",
        css: "WebIxStyle",
        height: 380,
        width: 350,
        move: true,
        body: {
            rows: [
                    {
                       
                            padding: { top: 20, left: 30, bottom: 20, right: 10 },
                            rows: [
                                {
                                    padding: { top: 5, left: 0, bottom: 0, right: 0, },                                    
                                    cols: [
                                        {
                                            
                                                rows: [                                                    
                                                    {  view: "label", label: "Filter", width: 80, css: "lblul",},
                                                    { view: "checkbox", id: "chkOpnBal", width: 150, labelWidth: 5, labelRight: "Opening Balance", customCheckbox: false, click: function () { fnChkOpenClick(); }, },
                                                    { view: "checkbox", id: "chkTrans", width: 110, labelWidth: 5, labelRight: "Transaction", customCheckbox: false, click: function () { fnChkTransClick(); }, },
                                                    { view: "checkbox", id: "chkClsBal", width: 110,  labelWidth: 5, labelRight: "Closing Balance", customCheckbox: false, click: function () { fnChkClsClick(); }, },
                                
                                
                                                ]
                                           
                                        }
                                    ]
                                },
                                
                                { view: "checkbox", id: "chkSuppress", labelWidth: 5, labelRight: "Suppress Zero", customCheckbox: false, click: function () { }, },
                                
                                {
                                   padding: { top: 5, left: 0, bottom: 0, right: 0, },                                    
                                    cols: [
                                        {
                                         
                                            width:200,
                                            rows: [
                                                   { view: "label", label: "Sort On", width: 60, css: "lblul", },
                                                    {
                                                         
                                                        width: 130, labelWidth: 5, view: "checkbox", id: "chkLedgNm", labelRight: "Ledger Name", customCheckbox: false, click: function () { }

                                                    },
                                                      {
                                                          width: 130, labelWidth: 5, view: "checkbox", id: "chkAccGrp", labelRight: "Account Group", customCheckbox: false, click: function () { }
                                                      },
                                                       
                                                    

                                                ]
                                           // },
                                        },
                                    ]
                                },                                                                

                                { view: "text", id: "txtClsBal", hidden: true, value: "1" },
                                { view: "text", id: "txtTrans", hidden: true, value: "1" },
                                { view: "text", id: "txtOpnBal", hidden: true, value: "1" },
                                { view: "text", id: "txtSuppress", hidden: true, value: "1" },
                                { view: "text", id: "txtLedgNm", hidden: true, value: "1" },
                                { view: "text", id: "txtAccGrp", hidden: true, value: "0" },
                                                               

                                
                            ]
                     
                    },
                    { cols: [{}, { view: "button", id: "Okoptions", css: "webix-primary", align: "right", label: "OK", inputWidth: 80, width: 80, onItemClick: function () { btnOkOptionClick(); } }], }
            ]

        }
    });
};
function btnOkOptionClick() {
    debugger;
    GridClear();
    $$("txtClsBal").setValue($$("chkClsBal").getValue());
    $$("txtTrans").setValue($$("chkTrans").getValue());
    $$("txtOpnBal").setValue($$("chkOpnBal").getValue());
    $$("txtSuppress").setValue($$("chkSuppress").getValue());
    $$("txtLedgNm").setValue($$("chkLedgNm").getValue());
    $$("txtAccGrp").setValue($$("chkAccGrp").getValue());
    //var CompId = $$("Property").getValue();

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);

    var vOpt = "";
    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        $$("gridMain").destructor();
        GridDesign1();
        fnHeader();

        if ($$("txtOpnBal").getValue() == "1") vOpt = "1";
        else if ($$("txtTrans").getValue() == "1") vOpt = "2";
        else if ($$("txtClsBal").getValue() == "1") vOpt = "3";
        

        if (vOpt == "1") {
            $("#LayoutText").text("Trial Balance - Opening Balance");
        }
        else if (vOpt == "2") {
            $("#LayoutText").text("Trial Balance - Transaction");
        }
        else if (vOpt == "3") {
            $("#LayoutText").text("Trial Balance - Closing Balance");
        }
    }
    else {
        fnShowColumn();
        $("#LayoutText").text("Trial Balance");
    }
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {  
    $$("chkClsBal").setValue($$("txtClsBal").getValue());
    $$("chkTrans").setValue($$("txtTrans").getValue());
    $$("chkOpnBal").setValue($$("txtOpnBal").getValue());
    $$("chkSuppress").setValue($$("txtSuppress").getValue());
    $$("chkLedgNm").setValue($$("txtLedgNm").getValue());
    $$("chkAccGrp").setValue($$("txtAccGrp").getValue());    
    $$("RptOptionsNew").show();
};
//function fnPropertyLoad(CompId) {
//    debugger;
//    var dataparam = {};
//    var rowData = [];
//    Request = {
//        REQTYPE: "GET_FNPROPERTYLOAD",
//        COMPID: CompId,
//    }

//    var DataVal = JSON.stringify(Request);
//    $.ajax({
//        async: false,
//        url: "/GLReports/RPTAPI_CALL",
//        type: 'POST',
//        data: "request=" + DataVal,
//        success: function (d) {
//            debugger;
//            if (d != "") {
//                rowData = JSON.parse(d);
//                $$("Property").define("options", rowData)
//            }
//        },
//    });

//    //return rowData;
//};

function fnPropertyLoad(CompId) {
    debugger;
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
            debugger;
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
    debugger;
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
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);                        

                $$("gridComp").parse(rowData);
            }
        },
    });
};
function fnLondGlInitCont(CompId) {

    $$("txtClsBal").setValue("1");
    $$("txtTrans").setValue("1");
    $$("txtOpnBal").setValue("1");
    $$("txtSuppress").setValue("1");
    $$("txtLedgNm").setValue("1");
    $$("txtAccGrp").setValue("1");
    $("#Group")[0].checked = false;
    $("#Ledger")[0].checked == true;

    fnGroupClick();
    fnLedgerClick();


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
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.GL_CompanyID = rowData.GL_CompanyID;
                var dtComp = rowData.dtComp;
                var dtCont = rowData.dtCont;
                window.AC_CD_IND = dtCont[0].AC_CD_IND;
                window.GSTAppl = dtComp[0].GL_VAT_IND;
                window.DIV_APPL_IND = dtCont[0].DIV_APPL_IND;
                window.G6_IND = dtCont[0].G6_IND;
                window.W1_IND = dtCont[0].W1_IND;
                window.OPEN_TRN_REP_IND = dtCont[0].OPEN_TRN_REP_IND;


                $("#CURRENCY_FORMAT").val(dtComp[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(dtComp[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(dtComp[0].VAL_DECIM_LIMIT);

                //$$("FromDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                //$$("FromDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                //$$("FromDt").refresh();

                //$$("ToDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                //$$("ToDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                //$$("ToDt").refresh();


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
        $$("gridMain").showColumn("AC_CD");

    }
    else {
        $$("gridRpt").hideColumn("AC_CD");
        $$("gridMain").hideColumn("AC_CD");
    }

    if (window.DIV_APPL_IND == "1") {
        //document.getElementById("divDiv").style.visibility = "visible";
        //document.getElementById("lblDiv").style.visibility = "visible";
        //$$("ddlDivis").show(); 
        $("#divDiv").show();
    }
    else {
        //document.getElementById("divDiv").style.visibility = "hidden";
        //document.getElementById("lblDiv").style.visibility = "hidden";
        //$$("ddlDivis").hide();  
        $("#divDiv").hide();
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

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");    

    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        //vSplit = CompId.split(",");
        //var newData = vSplit.filter(function (el) {
        //    return el.toString().trim().toUpperCase() == "WS";
        //});
        //if (newData.length > 0) CompId = newData[0].toString().trim();
        //else CompId = vSplit[0].toString().trim();
        CompId = fnGetDefaultComp(CompId);

        fnHeader(); 
        bMulti = "1";             
       
    }
    else {
        $$("gridRpt").show();
        $$("gridMain").hide();
        $$("gridRpt").adjust();
        
    }

    fnLondGlInitCont(CompId);
    if (bMulti == "0") {
        if (window.DIV_APPL_IND == "1") {
            $("#divDiv").show();
        }
        $("#LayoutText").text("Trial Balance");
    }
    else {
        $("#divDiv").hide();
        $$("txtClsBal").setValue("0");
        $$("txtTrans").setValue("0");
        $$("txtOpnBal").setValue("1");
        $("#LayoutText").text("Trial Balance - Opening Balance");
    }

    GridClear();
    FNLoadAllCompany(CompId);
    //fnGroupLoad();
    fnDivisLoad();    
    
    //fnGlVchTy();
    fnPeriodLoad();
    //fnShowColumn();
    //LoadDate();
    //fnHeader();

};
function fnDivisLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
            debugger;
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
function fnPeriodLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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

function fnHeader() {
    //var CompId = $$("Property").getValue();
    debugger;
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    

    $$("gridMain").destructor();
    GridDesign1();

    if (window.AC_CD_IND == "1") {
        $$("gridMain").showColumn("AC_CD");
    }
    else {
        $$("gridMain").hideColumn("AC_CD");
    }
    var bMulti = "1";
    var MULCOMPANY = CompId;
    var vSplit = CompId.split(",");

    var vOpt = "";

    if ($$("txtOpnBal").getValue() == "1") vOpt = "1";
    else if ($$("txtTrans").getValue() == "1") vOpt = "2";
    else if ($$("txtClsBal").getValue() == "1") vOpt = "3";

    //var newData = vSplit.filter(function (el) {
    //    return el.toString().trim().toUpperCase() == "WS";
    //});
    //if (newData.length > 0) CompId = newData[0].toString().trim();
    //else CompId = vSplit[0].toString().trim();

    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);

    var ColVal = [];
    var vColumn = $$("gridMain").config.columns;
    vSplit.forEach(function (entry) {
        var Hdr = $.trim(entry);
        dtComp = $$("gridComp").serialize();
        var CmpData = dtComp.filter(function (el) {
            return el.id.toString().trim().toUpperCase() == $.trim(entry);
        });
        if (CmpData.length > 0) Hdr = CmpData[0].SHRT_NM;

        var vId = "";
        var vId1 = "";        
        vId = $.trim(entry) + "#" + "OPENDR";
        vId1 = $.trim(entry) + "#" + "OPENCR";

        var set = {
            id: vId, header: [{ colspan: 6, css: { 'text-align': 'center' }, text: Hdr }, { colspan: 2, text: "Opening Balance", css: { 'text-align': 'center', } }, { text: "DR", css: { 'text-align': 'center ! important' } }], width: 110, css: { 'text-align': 'right ! important' },            
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set);

        var set1 = {
            id: vId1, header: [null, null, { text: "CR", css: { 'text-align': 'center' } }], width: 110, css: { 'text-align': 'right ! important' },
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set1);

        vId = $.trim(entry) + "#" + "TRNDR";
        vId1 = $.trim(entry) + "#" + "TRNCR";

        set = {
            id: vId, header: [null, { colspan: 2, css: { 'text-align': 'center' }, text: "Transaction " }, { text: "DR", css: { 'text-align': 'center' } }], width: 110, css: { 'text-align': 'right ! important' },
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set);

        set1 = {
            id: vId1, header: [null, null, { text: "CR", css: { 'text-align': 'center', } }], width: 110, css: { 'text-align': 'right ! important'},
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set1);

        vId = $.trim(entry) + "#" + "CLOSEDR";
        vId1 = $.trim(entry) + "#" + "CLOSECR";

        set = {
            id: vId, header: [null, { colspan: 2, css: { 'text-align': 'center' }, text: "Closing Balance " }, { text: "DR", css: { 'text-align': 'center'} }], width: 110, css: { 'text-align': 'right ! important'},
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set);

        set1 = {
            id: vId1, header: [null, null, { text: "CR", css: { 'text-align': 'center', } }], width: 110, css: { 'text-align': 'right ! important', },
            exportType: "number",
            exportFormat: "#,##0.00",
        };
        vColumn.push(set1);

    });

    
    var set = {
        id: "TOTOPENDR", header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Total Opening Balance" }, { text: "DR", css: { 'text-align': 'center' } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);

    var set = {
        id: "TOTOPENCR", header: [null, { text: "CR", css: { 'text-align': 'center', } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);
    
    var set = {
        id: "TOTTRNDR", header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Total Transaction" }, { text: "DR", css: { 'text-align': 'center', } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);

    var set = {
        id: "TOTTRNCR", header: [null, { text: "CR", css: { 'text-align': 'center', } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);
    
    var set = {
        id: "TOTCLOSEDR", header: [{ colspan: 2, css: { 'text-align': 'center' }, text: "Total Closing Balance" }, { text: "DR", css: { 'text-align': 'center', } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);

    var set = {
        id: "TOTCLOSECR", header: [null, { text: "CR", css: { 'text-align': 'center', } }], width: 150, css: { 'text-align': 'right ! important', },
        exportType: "number",
        exportFormat: "#,##0.00",
    };
    vColumn.push(set);
    

    $$("gridMain").refreshColumns();
    $$("gridMain").refresh();
    $$("gridMain").show();
    $$("gridRpt").hide();
    $$("gridMain").adjust();
    gridResize();

};

function fnLoadGrid() {
    debugger;
    $$("gridRpt").clearAll();
    $$("gridMain").clearAll();
    fnShowColumn();
    var bMulti = "0";
    var MULCOMPANY = "";
        
    var DivId = $$("ddlDivis").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();

    var vOpt = "";

    if ($$("txtOpnBal").getValue() == "1") vOpt = "1";
    else if ($$("txtTrans").getValue() == "1") vOpt = "2";
    else if ($$("txtClsBal").getValue() == "1") vOpt = "3";
    
    var ReqNm = "";
    ReqNm = "GET_FNLOADTRIALBALANCE"
    
    if (DivId == "<-ALL->") DivId = "";
    CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");

    //if (CompId.indexOf(",") >= 0) {
    if(CompTy =="2"){
        $$("gridMain").destructor();
        GridDesign1();
        
        DivId = "";
        ReqNm = "GET_FNLOADTRIALBALANCEMULTICOMP";
        bMulti = "1";
        MULCOMPANY = CompId;
        fnHeader();
        CompId = fnGetDefaultComp(CompId);
    }
    
    var chkSuppress = "0";
    var ChkGroup = "0";
    var ChkSubLedger = "0";
    var ChkLedger = "0";
    var ChkSubLedgerVis = "0";
    var ChkSubLedgerGrp = "0";

    var ChkOrderLedger = "0";
    ChkOrderLedger = $$("txtLedgNm").getValue();    

    if ($("#SubLedger")[0].checked == true) {
        ChkSubLedger = "1";
    }
    if ($("#Group")[0].checked == true) {
        ChkGroup = "1";
    }
    chkSuppress = $$("txtSuppress").getValue();    

    if ($("#Ledger")[0].checked == true) {
        ChkLedger = "1";
    }
    if ($("#SubLedgerGrp")[0].checked == true && $("#SubLedgerGrp").is(":visible")) {
        ChkSubLedgerGrp = "1";
    }
    if ($("#SubLedger").is(":visible")) ChkSubLedgerVis = "1";    
    debugger;
    Request = {        
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        MULCOMPANY: MULCOMPANY,
        FISCALYEAR: window.FiscalYear,
        DIVID: DivId,        
        STARTDT : window.FiscalFromDt,
        FROMDT: FromDt,        
        TODT: ToDt,        
        C_DIV_APPL: window.DIV_APPL_IND, 
        chkSuppress:chkSuppress,
        ChkGroup:ChkGroup,
        ChkSubLedger:ChkSubLedger,
        ChkLedger: ChkLedger,
        ChkSubLedgerGrp:ChkSubLedgerGrp,
        ChkSubLedgerVis: ChkSubLedgerVis,
        OPTIONS: vOpt,

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
                //if (chkSuppress == "1") rowData = fnSuppressBlankRow(rowData);
                if (bMulti == "1") {
                    $$("gridMain").parse(rowData);
                    $$("gridMain").refresh();
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

function fnShowColumn() {
    GridClear();
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

};

function fnChkClsClick() {
    debugger;
    //CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    
    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        if ($$("chkClsBal").getValue() == "1") {
            $$("chkOpnBal").setValue() == "0"; $$("chkTrans").setValue() == "0";
        }
        else {
            if ($$("chkOpnBal").getValue() == "0" && $$("chkTrans").getValue() == "0") $$("chkClsBal").setValue("1");
        }
    }
    else {
        if ($$("chkClsBal").getValue() == "0") {
            if ($$("chkOpnBal").getValue() == "0" && $$("chkTrans").getValue() == "0") $$("chkClsBal").setValue("1");

        }
    }
};
function fnChkTransClick() {
    debugger;
    //CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        if ($$("chkTrans").getValue() == "1") {
            $$("chkOpnBal").setValue() == "0"; $$("chkClsBal").setValue() == "0";
        }
        else {
            if ($$("chkOpnBal").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkTrans").setValue("1");
        }
    }
    else {
        if ($$("chkTrans").getValue() == "0") {
            if ($$("chkOpnBal").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkTrans").setValue("1");

        }
    }
};

function fnChkOpenClick() {
    debugger;
    //CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2") {
        if ($$("chkOpnBal").getValue() == "1") {
            $$("chkClsBal").setValue() == "0"; $$("chkTrans").setValue() == "0";
        }
        else {
            if ($$("chkTrans").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkOpnBal").setValue("1");
        }
    }
    else{
        if ($$("chkOpnBal").getValue() == "0") {
            if($$("chkTrans").getValue() == "0" && $$("chkClsBal").getValue() == "0") $$("chkOpnBal").setValue("1"); 
        
        }    
    }
};

function fnGroupClick() {
    GridClear();
    if ($("#Group")[0].checked == true) {
        $('#SubLedgerGrp').prop('checked', false);
        $('#SubLedger').prop('checked', false);
        $("#divSubGrp").hide();
    }
    else {
        $("#divSubGrp").show();
        $('#SubLedger').prop('checked', false);
        $('#SubLedgerGrp').prop('checked', true);
    }
};

function fnLedgerClick() {
    GridClear();
    debugger;
    if ($("#Ledger")[0].checked == true) {
        $("#divSubLedger").show();
        if ($("#Group")[0].checked == false) {
            $("#divSubGrp").show();
        }
        $("#SubLedgerGrp").prop("checked", true);
    }
    else {
        $("#divSubGrp").hide();
        $("#divSubLedger").hide();
        $('#SubLedger').prop('checked', false);
        $('#SubLedgerGrp').prop('checked', false);
    }
};
function fnSuLedgerClick() {
    GridClear();
    if ($("#SubLedger")[0].checked == false) {
        if ($("#SubLedgerGrp")[0].checked == false) {
            if ($("#Group")[0].checked == false) {
                $('#SubLedger').prop('checked', true);
            }
        }

    }
    else {
        $('#SubLedgerGrp').prop('checked', false);
    }

};
function fnSubGrpClick() {
    GridClear();
    if ($("#SubLedgerGrp")[0].checked == false) {
        if ($("#SubLedger")[0].checked == false) {
            if ($("#Group")[0].checked == false) {
                $('#SubLedgerGrp').prop('checked', true);
            }
        }
    }
    else {
        $('#SubLedger').prop('checked', false);
    }
};

function GridClear() {
    $$("gridRpt").clearAll();
    $$("gridMain").clearAll();
};
webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    //if (choice == "1") {
        var offset = $("#divGrid").offset();

        $$("gridRpt").define("height", ((vheight - offset.top - 30)));
        $$("gridRpt").adjust();
        if ($$("gridMain")) {
            $$("gridMain").define("height", ((vheight - offset.top - 30)));
            $$("gridMain").adjust();
        }

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