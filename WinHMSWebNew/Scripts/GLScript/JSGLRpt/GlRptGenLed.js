

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect", inputwidth: 250, width: 250, id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divGrp", view: "search", id: "txtGroup", readonly: true, inputAlign:"left", placeholder: "<-ALL->",
        on: {
            onSearchIconClick: function () {
                debugger;
                btnGrpSrchClick();
            }
        }
    });
    //webix.ui({
    //    container: "divVchTy", view: "search", id: "txtVchTy", readonly: true, placeholder: "<-ALL->",
    //    on: {
    //        onSearchIconClick: function () {
    //            debugger;
    //            btnVchTySrchClick();
    //        }
    //    }
    //});
    webix.ui({
        container: "divLedger", view: "search", readonly: true, id: "txtLedger", inputAlign:"left", placeholder: "<-ALL->", on: { onChange: function (newVal, OldVal) { } },
        on: {
            onSearchIconClick: function () {
                debugger;
                btnLedgSrchClick();
            }
        }
    });
    //webix.ui({ container: "divDivis", view: "combo", id: "ddlDivis", on: { onChange: function (newVal, OldVal) { } }, });
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "FromDt", inputAlign: "left", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    webix.ui({
        container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt",inputAlign:"left", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    });
    webix.ui({ container: "divBtnDisplay", css: "webix_primary", id: "btnDispay", view: "button",width:80, inputWidth: 80, label: "Display", click: function () { fnLoadGrid(); } });
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
    $$("dtVoucherPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtVoucherPop").filterByAll();
    var ids = window.VchTyIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "")
    {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }   
    
    $$("dtVoucherPop").data.each(function (obj) {
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
            
        $$("dtVoucherPop").updateItem(obj.id, obj)


    })
    $$("dtVoucherPop").refresh();
    
    $$("VouchTyPopup").show();
    $$("dtVoucherPop").select($$("dtVoucherPop").getFirstId());
    webix.UIManager.setFocus($$("dtVoucherPop"));
    $$("dtVoucherPop").moveSelection("top");

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
gridResize("1");

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
            //Window1 = window.open("/GLTrans/GLTransaction?Page=2&PARTIAL=1", "PopupWindow", "width=1100,height=600,left=30,top=50");
            var PageUrl = "/GLTrans/GLTransaction?Page=2&PARTIAL=1";
            GlDrillDownWindowLoad(PageUrl);
        }
    });
   

    
  
   
    
    return true;
     

}

function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillTransPopup",
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
                  
                    $$('DrillTransPopup').define("width", vWidth);
                    $$('DrillTransPopup').define("height", vHeight)
                    $$('DrillTransPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-Trans",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
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
        width: 500,
        move: true,
        body: {
            padding: { top: 20, left: 30, bottom: 20, right: 10 },
            rows: [
                    {
                        view: "search", width: 370, labelWidth: 110, id: "txtVchTy", label: "VoucherTy", readonly: true, placeholder: "<-ALL->",
                        on: {
                            onSearchIconClick: function () {
                                debugger;
                                btnVchTySrchClick();
                            }
                        }
                    },
                    { view: "richselect", labelWidth: 110, id: "ddlDivis", label: "Division", on: { onChange: function (newVal, OldVal) { } }, },
                    { width: 210, labelWidth: 110, view: "checkbox", id: "chkDr", label: "DR Trn", customCheckbox: false, },
                    { width: 210, labelWidth: 110, view: "checkbox", id: "chkCr", label: "CR Trn", customCheckbox: false, },
                    { width: 210, labelWidth: 110, view: "checkbox", id: "chkSub", label: "Sub Ledger", customCheckbox: false, },
                    {cols: [
                            { view: "datepicker", id: "ScvDt", label: "Voucher Dt",width:230, labelWidth: 110, format: "%d/%m/%Y", stringResult: true, },{}
                        ]
                    },                    
                    { cols: [
                            { view: "text", id: "txtAmount", width: 230, label: "Amount", labelWidth: 110, on: { "onKeyPress": function (code, e) { return fnFloatText(code, e, this.getValue()); }, } },
                            {view: "radio", id: "OptDrCr", customRadio: false, 
                        options:[
                            { value:"DR", id:1 },
                            { value:"CR", id:2 },                        
                        ],vertical:false,value:1,}]
                    },
                    { cols: [{}, { view: "button",  maxWidth: 80, id: "OkFilter", align:'center', css: 'webix-primary', label: "OK", inputWidth: 80, width: 80, click: function () { btnOkFilterClick(); } }], },

                    { view: "text", id: "txtVchTyNm", hidden: true, },
                    { view: "text", id: "txtVchTyId", hidden: true, },
                    { view: "text", id: "txtDivId", hidden: true, },
                    { view: "text", id: "txtDr", hidden: true, },
                    { view: "text", id: "txtCr", hidden: true, },
                    { view: "text", id: "txtSub", hidden: true, },
                    { view: "text", id: "hdScvDt",  hidden: true },
                    { view: "text", id: "hdtxtAmount", hidden: true },
                    { view: "text", id: "txtSvDrCr", hidden: true,value:"0" },
                    
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
                                { view: "checkbox", id: "chkClBal", labelWidth: 5, labelRight: "Cummulative Balance", customCheckbox: false, },
                                //{ view: "checkbox", id: "chkCompany", labelWidth: 5, labelRight: "Company Heading", customCheckbox: false, },
                                { view: "checkbox", id: "chkComNar", labelWidth: 5, labelRight: "Common Narration - Row", customCheckbox: false, click: function () { fnChkComNarClick(); }, },
                                { view: "checkbox", id: "chkLnNar", labelWidth: 5, labelRight: "Line Narration - Row", customCheckbox: false, click: function () { fnChkLnNarClick(); }, },
                                { view: "checkbox", id: "chkComNarCol", labelWidth: 5, labelRight: "Common Narration - Col", customCheckbox: false, click: function () { fnChkComNarColClick(); }, },
                                { view: "checkbox", id: "chkLnNarCol", labelWidth: 5, labelRight: "Line Narration - Col", customCheckbox: false, click: function () { fnChkLnNarColClick(); }, },
                                { view: "checkbox", id: "chkChq", labelWidth: 5, labelRight: "Cheque/Due Dt./Due No.", customCheckbox: false, },
                                { view: "checkbox", id: "chkFornCur", labelWidth: 5, labelRight: "Forign Currency - Row", customCheckbox: false, click: function () { fnChkFornCurrClick(); }, },
                                { view: "checkbox", id: "chkFornCurCol", labelWidth: 5, labelRight: "Forign Currency - Col", customCheckbox: false, click: function () { fnChkFornCurrColClick(); }, },
                                { view: "checkbox", id: "chkGstCd", labelWidth: 5, labelRight: "GST Code", customCheckbox: false, },
                                { view: "checkbox", id: "chkOrdByGrp", labelWidth: 5, labelRight: "Order By Group", customCheckbox: false, },
                                { view: "checkbox", id: "chkGrandTot", labelWidth: 5, labelRight: "Grand Total", customCheckbox: false, },
                                { view: "checkbox", id: "chkBillDet", labelWidth: 5, labelRight: "Bill Detail", customCheckbox: false, click: function () { fnChkBillDetClick(); }, },
                                { view: "checkbox", id: "chkVchDet", labelWidth: 5, labelRight: "Voucher Detail", customCheckbox: false, click: function () { fnChkVchDetClick(); }, },
                                { view: "checkbox", id: "chkCos", labelWidth: 5, labelRight: "Common Narration - single ln", customCheckbox: false, },                                
                                { view: "checkbox", id: "chkReconDt", labelWidth: 5, labelRight: "Recon.Date", customCheckbox: false, },
                                { view: "checkbox", id: "chkCrBy", labelWidth: 5, labelRight: "Create By", customCheckbox: false, },
                                { view: "checkbox", id: "chkCrDt", labelWidth: 5, labelRight: "Create Date", customCheckbox: false, },                                
                                { view: "checkbox", id: "chkDiv", labelWidth: 5, labelRight: "Division", customCheckbox: false, },
                                                                

                                { view: "text", id: "txtClBal", hidden:true,value:"0" },
                                { view: "text", id: "txtCompany", hidden: true, value: "0" },
                                { view: "text", id: "txtComNar", hidden: true, value: "1" },
                                { view: "text", id: "txtLnNar", hidden: true, value: "1" },
                                { view: "text", id: "txtComNarCol", hidden: true, value: "0" },
                                { view: "text", id: "txtLnNarCol", hidden: true, value: "0" },
                                { view: "text", id: "txtChq", hidden: true, value: "1" },
                                { view: "text", id: "txtFornCur", hidden: true, value: "1" },
                                { view: "text", id: "txtFornCurCol", hidden: true, value: "0" },
                                { view: "text", id: "txtOrdByGrp", hidden: true, value: "1" },
                                { view: "text", id: "txtGrandTot", hidden: true, value: "1" },
                                { view: "text", id: "txtBillDet", hidden: true, value: "1" },
                                { view: "text", id: "txtVchDet", hidden: true, value: "0" },
                                { view: "text", id: "txtCos", hidden: true, value: "0" },
                                { view: "text", id: "txtCrBy", hidden: true, value: "0" },
                                { view: "text", id: "txtCrDt", hidden: true, value: "0" },
                                { view: "text", id: "txtDiv", hidden: true, value: "0" },
                                { view: "text", id: "txtGst", hidden: true, value: "0" },
                                { view: "text", id: "txtReconDt", hidden: true, value: "0" },                                

                                //{ cols: [{}, { view: "button", type: "icon", id: "Okoptions", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { $("#Display").click(); $$("RptOptionsNew").hide(); } }], }
                            ]
                        }
                    },
                    { cols: [{}, { view: "button", align: 'center', id: "Okoptions", css: 'webix-primary', label: "OK", inputWidth: 80, width: 80, click: function () { btnOkOptionClick(); } }], }
            ]

        }
    });
};
function btnOkOptionClick() {
    debugger;
    $$("txtClBal").setValue($$("chkClBal").getValue());
    //$$("txtCompany").setValue($$("chkCompany").getValue());
    $$("txtComNar").setValue($$("chkComNar").getValue());
    $$("txtLnNar").setValue($$("chkLnNar").getValue());
    $$("txtComNarCol").setValue($$("chkComNarCol").getValue());
    $$("txtLnNarCol").setValue($$("chkLnNarCol").getValue());
    $$("txtChq").setValue($$("chkChq").getValue());
    $$("txtFornCur").setValue($$("chkFornCur").getValue());
    $$("txtFornCurCol").setValue($$("chkFornCurCol").getValue());
    $$("txtGrandTot").setValue($$("chkGrandTot").getValue());
    $$("txtBillDet").setValue($$("chkBillDet").getValue());
    $$("txtVchDet").setValue($$("chkVchDet").getValue());
    $$("txtCos").setValue($$("chkCos").getValue());
    $$("txtCrBy").setValue($$("chkCrBy").getValue());
    $$("txtCrDt").setValue($$("chkCrDt").getValue());
    $$("txtDiv").setValue($$("chkDiv").getValue());
    $$("txtReconDt").setValue($$("chkReconDt").getValue());
    $$("txtOrdByGrp").setValue($$("chkOrdByGrp").getValue())

    fnShowColumn();
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {
    $$("chkClBal").setValue($$("txtClBal").getValue());
    //$$("chkCompany").setValue($$("txtCompany").getValue());
    $$("chkComNar").setValue($$("txtComNar").getValue());
    $$("chkLnNar").setValue($$("txtLnNar").getValue());
    $$("chkComNarCol").setValue($$("txtComNarCol").getValue());
    $$("chkLnNarCol").setValue($$("txtLnNarCol").getValue());
    $$("chkChq").setValue($$("txtChq").getValue());
    $$("chkFornCur").setValue($$("txtFornCur").getValue());
    $$("chkFornCurCol").setValue($$("txtFornCurCol").getValue());
    $$("chkGrandTot").setValue($$("txtGrandTot").getValue());
    $$("chkBillDet").setValue($$("txtBillDet").getValue());
    $$("chkVchDet").setValue($$("txtVchDet").getValue());
    $$("chkCos").setValue($$("txtCos").getValue());
    $$("chkCrBy").setValue($$("txtCrBy").getValue());
    $$("chkCrDt").setValue($$("txtCrDt").getValue());
    $$("chkDiv").setValue($$("txtDiv").getValue());
    $$("chkReconDt").setValue($$("txtReconDt").getValue());
    $$("chkOrdByGrp").setValue($$("txtOrdByGrp").getValue())
    $$("RptOptionsNew").show();
};
function btnFilterClick() {
    debugger;
    $$("txtVchTy").setValue($$("txtVchTyNm").getValue());
    window.VchTyIds = $$("txtVchTyId").getValue();
    $$("ddlDivis").setValue($$("txtDivId").getValue());
    $$("chkDr").setValue($$("txtDr").getValue());
    $$("chkCr").setValue($$("txtCr").getValue());
    $$("chkSub").setValue($$("txtSub").getValue());
   
    var ScvDt=$$("hdScvDt").getValue();
    if(ScvDt!=null && ScvDt != undefined && ScvDt != "")
    {
        ScvDt=formatDateWebix(ScvDt);
        $$("ScvDt").setValue(ScvDt);
    }
    else{
        $$("ScvDt").setValue("");
    }
    $$("txtAmount").setValue($$("hdtxtAmount").getValue());
    if ($$("txtSvDrCr").getValue() == "0" || $$("txtSvDrCr").getValue() == "1" || $$("txtSvDrCr").getValue() == "")
    {
        $$("OptDrCr").setValue("1");
    }
    else $$("OptDrCr").setValue("2");
    
    $$("RptAdvFilter").show();
};
function btnOkFilterClick() {
    debugger;
    GridClear();
    $$("txtVchTyNm").setValue($$("txtVchTy").getValue());
    $$("txtVchTyId").setValue(window.VchTyIds);
    $$("txtDivId").setValue($$("ddlDivis").getValue());
    $$("txtDr").setValue($$("chkDr").getValue());
    $$("txtCr").setValue($$("chkCr").getValue());
    $$("txtSub").setValue($$("chkSub").getValue());
    $$("hdScvDt").setValue($$("ScvDt").getText())    
    $$("hdtxtAmount").setValue($$("txtAmount").getValue());    
    $$("txtSvDrCr").setValue($$("OptDrCr").getValue());
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

    $$("txtClBal").setValue("0");
    $$("txtCompany").setValue("0");
    $$("txtComNar").setValue("1");
    $$("txtLnNar").setValue("1");
    $$("txtComNarCol").setValue("0");
    $$("txtLnNarCol").setValue("0");
    $$("txtChq").setValue("1");
    $$("txtFornCur").setValue("1");
    $$("txtFornCurCol").setValue("0");
    $$("txtGrandTot").setValue("1");
    $$("txtBillDet").setValue("1");
    $$("txtVchDet").setValue("0");
    $$("txtCos").setValue("0");
    $$("txtCrBy").setValue("0");
    $$("txtCrDt").setValue("0");
    $$("txtDiv").setValue("0");
    $$("txtReconDt").setValue("0");
    $$("txtGroup").setValue("");
    $$("txtLedger").setValue("");
    $$("txtVchTy").setValue("");
    $$("chkDr").setValue("1");
    $$("chkCr").setValue("1");
    $$("chkSub").setValue("1");
    //$$("chkAcCd").setValue("0");
    $$("hdScvDt").setValue("");
    $$("hdtxtAmount").setValue("");
    $$("txtSvDrCr").setValue("0");
    $$("txtVchTyNm").setValue("");
    $$("txtVchTyId").setValue("");
    $$("txtDivId").setValue("<-ALL->");
    $$("txtDr").setValue("1");
    $$("txtCr").setValue("1");
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
                //window.FiscalYear = rowData.FiscalYear;
                //window.FiscalStartDT = rowData.FiscalFromDt;
                //window.FiscalFromDt = rowData.PeriodStartDt;
                //window.FiscalToDt = rowData.PeriodEndDt;
                //$$("FromDt").setValue(rowData.FiscalFromDt);
                //$$("ToDt").setValue(rowData.FiscalToDt);
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

    //if (window.AC_CD_IND == "1") $$("chkAcCd").show();
    //else {
    //    $$("chkAcCd").hide();
    //    $$("chkAcCd").setValue("0");
    //}

    if (window.DIV_APPL_IND == "1") {        
        //document.getElementById("divDiv").style.visibility = "visible";
        //document.getElementById("lblDiv").style.visibility = "visible";
        $$("ddlDivis").show();
        $$("chkDiv").show();
    }
    else {
        //document.getElementById("divDiv").style.visibility = "hidden";
        //document.getElementById("lblDiv").style.visibility = "hidden";
        $$("ddlDivis").hide();
        $$("chkDiv").hide();
    }

    if (window.GSTAppl == "1") $$("chkGstCd").show();
    else  $$("chkGstCd").hide();
    //return rowData;
}
function fnPropChange(CompId) {
    debugger;
    fnLondGlInitCont(CompId);
    GridClear();
        
    fnGroupLoad();
    fnDivisLoad();    
    
    fnGlVchTy();
    fnPeriodLoad();
    fnShowColumn();
    //LoadDate();
    //fnHeader();

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

                //$$("ddlGroup").getList().config.yCount = 12;

                //$$("ddlDivis").getPopup().define("template", "#value#");
                //$$("ddlDivis").getPopup().define('filter', function (item, value) {
                //    //debugger;                            
                //    if (item.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) >= 0)
                //        return true;
                //    return false;
                //});
                //$$("ddlDivis").refresh();
                $$("ddlDivis").setValue("<-ALL->")
            }
        },
    });

    //return rowData;
};

function fnGlVchTy() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_GLVCHTYLOAD",
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

                $$("dtVoucherPop").clearAll();
                $$("dtVoucherPop").parse(rowData);
                $$("dtVoucherPop").refresh();

                //options = rowData;
                //options.splice(0, 0, { value: "-ALL-", id: "-ALL-" });
                //$$("ddlVchTy").define("options", options);

                ////$$("ddlGroup").getList().config.yCount = 12;

                //$$("ddlVchTy").getPopup().define("template", "#value#");
                //$$("ddlVchTy").getPopup().define('filter', function (item, value) {
                //    //debugger;                            
                //    if (item.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) >= 0)
                //        return true;
                //    return false;
                //});
                //$$("ddlVchTy").refresh();
                //$$("ddlVchTy").setValue("-ALL-");

                
            }
        },
    });

    //return rowData;
};

function fnGroupLoad() {
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
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                //$$("ddlGroup").getList().config.yCount = 12;
                $$("dtGroupPop").clearAll();
                $$("dtGroupPop").parse(rowData);
                $$("dtGroupPop").refresh();
                //options = rowData;
                //options.splice(0, 0, { value: "-ALL-", id: "-ALL-" });
                //$$("ddlGroup").define("options", options);
                ////$$("ddlGroup").getPopup().define("template", "#value#");
                //$$("ddlGroup").getPopup().define('filter', function (item, value) {
                //    //debugger;                            
                //    if (item.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) >= 0)
                //        return true;
                //    return false;
                //});
                //$$("ddlGroup").refresh();
                //$$("ddlGroup").setValue("-ALL-");


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
                                if (obj.CHK=="1") {
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

function VchTyPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "VouchTyPopup",
        head: "Voucher Type",
        position: "center",
        minWidth: 400,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtVoucherPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Voucher Type", { content: "textFilter" }], id: "value", width: 310, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 70, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "Voucher Id", id: "id", hidden: true },
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
                            //GridClear();
                            var vVchTyNm = "";
                            var vVchTyId = "";
                            window.VchTyIds = "";
                            $$("txtVchTy").setValue("");
                            $$("dtVoucherPop").data.each(function (obj) {
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
                                $$("VouchTyPopup").hide();
                                $$("txtVchTy").setValue(vVchTyNm);

                            }
                            else {
                                $$("VouchTyPopup").hide();
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
                            align: 'center',
                            css: 'webix-primary',
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
    var FVtype = $$("txtVchTyId").getValue();
    var Crdr = $$("txtSvDrCr").getValue();
    var sAmt = $$("hdtxtAmount").getValue();
    var svdt = $$("hdScvDt").getValue();    
    var chkDr = $$("txtDr").getValue();
    var chkCr = $$("txtCr").getValue();
    var ids = window.LedgerIds;
    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var chksup = $$("txtSub").getValue();
    var chkClBal = $$("txtClBal").getValue();
    if (DivId == "<-ALL->") DivId = "";
    CompId = $$("Property").getValue();
    var ReqNm = "";
    if (chksup == 1) ReqNm = "GET_LOADRPTCURRENTLEDGER"
    else ReqNm = "GET_LOADRPTCURRENTLEDGERSUMM"
        

    bComCol = $$("txtComNarCol").getValue();
    bNarCol = $$("txtLnNarCol").getValue();
    bGst = "0";
    bFoCol = $$("txtFornCurCol").getValue();
    bFo = $$("txtFornCur").getValue();
    bVch = $$("txtVchDet").getValue();
    bNa = $$("txtLnNar").getValue();
    bCo = $$("txtComNar").getValue();
    bCoS = $$("txtCos").getValue();
    bCh = $$("txtChq").getValue();
    bBill = $$("txtBillDet").getValue();
    bGr = $$("txtGrandTot").getValue();
    bRecon = $$("txtReconDt").getValue();
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

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    if (choice == "1") {
        var offset = $("#divGrid").offset();

        $$("gridRpt").define("height", ((vheight - offset.top - 30)));
        $$("gridRpt").adjust();
    }





}