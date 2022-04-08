

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divGrp", view: "search", id: "txtGroup", readonly: true, 
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
        container: "divParty", view: "search", readonly: true, id: "txtParty", placeholder: "<-ALL->", on: { onChange: function (newVal, OldVal) { } },
        on: {
            onSearchIconClick: function () {
                debugger;
                if (window.GroupIds == "") return;
                btnPartySrchClick();
            }
        }
    });
    //webix.ui({ container: "divDivis", view: "combo", id: "ddlDivis", on: { onChange: function (newVal, OldVal) { } }, });
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "AsOnDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    //webix.ui({
    //    container: "divToDt", view: "datepicker", labelWidth: 90, id: "ToDt", format: "%d/%m/%Y", stringResult: true,
    //    on: { onChange: function (newVal, OldVal) { fnToDtChange(); } }
    //});
    webix.ui({ container: "divBtnDisplay", id: "btnDispay", view: "button", inputWidth: 60, label: "Display", click: function () { fnbtnDisplayClick(); } });
    //webix.ui({ container: "divChkDr", width: 100, view: "checkbox", id: "chkDr", label: "DR Trn", customCheckbox: false, value: "1", click: function () { GridClear(); } });
    //webix.ui({ container: "divChkCr", width: 100, view: "checkbox", id: "chkCr", label: "CR Trn", customCheckbox: false, value: "1", click: function () { GridClear(); }});
    //webix.ui({ container: "divSubled", width: 100, view: "checkbox", id: "chkSub", label: "Sub Ledger", customCheckbox: false, value: "1", click: function () { GridClear(); } });
    //webix.ui({ container: "divChkAcCd", width: 100, view: "checkbox", id: "chkAcCd", label: "Ac Cd", customCheckbox: false, click: function () { GridClear(); } });

};
function fnFromDtChange() {
    debugger;
    GridClear();

    //var NewDt = $$("FromDt").getValue();
    //var NewToDt = $$("ToDt").getValue();
    //if (NewDt !=null && NewDt != "") {
    //    NewDt = NewDt.substring(0, 10);
    //    NewDt = NewDt.replace(/-/g, '');
    //    NewDt = parseFloat(NewDt);

    //    if (NewToDt != null && NewToDt != "") {
    //        NewToDt = NewToDt.substring(0, 10);
    //        NewToDt = NewToDt.replace(/-/g, '');
    //        NewToDt = parseFloat(NewToDt);
    //        if (NewToDt < NewDt) {
    //            $$("ToDt").setValue($$("FromDt").getValue());
    //        }
    //    }
    //}    

};

function btnGrpSrchClick() {
    $$("dtGroupPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    //$$("dtGroupPop").filterByAll();

    fnGroupLoad();

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
    

};
function btnPartySrchClick() {
    debugger;
    
    $$("dtPartyPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    //$$("dtPartyPop").filterByAll();
    fnLoadPartyGrid();
    var ids = window.PartyIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtPartyPop").data.each(function (obj) {
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

        $$("dtPartyPop").updateItem(obj.id, obj)

    })
    $$("dtPartyPop").refresh();

    $$("PartyPopup").show();
    $$("dtPartyPop").select($$("dtPartyPop").getFirstId());
    webix.UIManager.setFocus($$("dtPartyPop"));
    

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
                { id: "ixBillNo", header: 'Vouch No.', width: 100, css: { 'text-align': 'center ! important', }, exportType: "string" },//120
                { id: "ixVtype", header: { text: "Voucher Type", }, width: 120, css: { 'text-align': 'left ! important', }, exportType: "string" ,hidden:true},
                { id: "ixBillDt", header: 'Vouch Dt', width: 100, css: { 'text-align': 'center ! important', }, },//120
                { id: "ixRefTy", header: { text: "Ref Type", }, width: 120, css: { 'text-align': 'left ! important', }, exportType: "string" },
                { id: "ixRefNm", header: { text: "Ref Name", }, width: 140, css: { 'text-align': 'left ! important', }, exportType: "string" },
                { id: "ixNarr", header: 'Line Narration', width: 250, exportType: "string" },
                { id: "ixBillDate", header: 'Ref Dt', width: 120, css: { 'text-align': 'center ! important', }, },
                { id: "ixDueDt", header: 'Due Dt', width: 120, css: { 'text-align': 'center ! important', }, },                
                { id: "ixBal", header: 'Balance Amt', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //exportFormat: "#,##0.00",
                },
                { id: "ixCur", header: { text: "No Due", }, width: 120, css: { 'text-align': 'right ! important', }, },
                { id: "ix0", header: '0 - 30', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //exportFormat: "#,##0.00",
                },  
                { id: "ix31", header: '31 - 60', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //    exportFormat: "#,##0.00",
                }, 
                { id: "ix61", header: '61 - 90', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //exportFormat: "#,##0.00",
                }, 
                { id: "ix91", header: '91 - 180', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //exportFormat: "#,##0.00",
                },
                { id: "ix181", header: ' > 180', width: 120, css: { 'text-align': 'right ! important', },
                    //format: function (value) {
                    //    return fnCurrFormat(value);
                    //},
                    //exportType: "number",
                    //exportFormat: "#,##0.00",
                }, 
                { id: "ixHid", header: { text: "Trn_Id", },   hidden: true },                
                { id: "ixHid1", header: { text: "Trn_Id_Srno", },  hidden: true },           
                { id: "ixRef_SNo", header: { text: "Ref Sno", },   hidden: true },                
                { id: "ixRef_Ty_ID", header: { text: "Ref Ty Id", }, hidden: true },
                { id: "ixTrnTyId", header: { text: "Trn Ty Id", }, hidden: true },
                { id: "ixAc_ID", header: { text: "Acc Id", },  hidden: true },           
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
                        //$$("gridRpt").refresh();
                        $$("gridRpt").addCellCss(rowid, "ixBillNo", "LedGroup");
                    }
                    if (item.CLR == "BILLNORED") {
                        $$("gridRpt").addCellCss(rowid, "ixBillNo", "BILLNORED");
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
    var TRN_ID = selRow.ixHid;
    var TRN_ID_SRNO = selRow.ixHid1;
    var TRN_TY_ID = selRow.ixTrnTyId;
    var VOUCH_DT = selRow.ixBillDt;
    var CompId = $$("Property").getValue();
    
    if (TRN_ID == "" || TRN_ID == null) return;      

    V_DT = VOUCH_DT.replace("/", "-");
    V_DT = V_DT.replace("/", "-");
    var SW = Number(screen.width) - 100;
    var Sh = Number(screen.height) - 100;

    if (TRN_ID == "0") {
        webix.alert({ text: "Opening Balance. Not possible to view. ", type: "alert-warning" });
        return;
    }
    

    var UrlQryStr = CompId + "~" + TRN_ID + "~" + TRN_ID_SRNO + "~" + TRN_TY_ID + "~" + V_DT;
    UrlQryStr = encodeURIComponent(UrlQryStr);

    if (TRN_ID != "" && TRN_ID != null) {
        if (TRN_ID_SRNO != "" && TRN_ID_SRNO != null) {
            //Window1 = window.open("/GLTransaction/DayBook/" + TRN_ID + "~" + TRN_ID_SRNO + "~" + TRN_TY_ID + "~" + V_DT + "", "DayBookOpenBillRef", "width=" + SW + ",height=" + Sh + ",left=50,top=20 ");            
            Window1 = window.open("/GLTransaction/GlReversalEntry/?RPage=" + "1" + "&ID=" + UrlQryStr + "", "DayBookOpenBillRef", "width=" + SW + ",height=" + Sh + ",left=50,top=20 ");

        }
    }          

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
            padding: { top: 20, left: 10, bottom: 20, right: 10 },
            width: 400,
            rows: [

                    { view: "richselect", width: 400, labelWidth: 100, id: "ddlDivis", label: "Division", on: { onChange: function (newVal, OldVal) { } }, },
                    { view: "text", width: 400, labelWidth: 100, id: "txtRefNm", label: "Reference Name",  },
                    { view: "richselect", width: 400, labelWidth: 100, id: "ddlTrnTy", label: "Trn Type", on: { onChange: function (newVal, OldVal) { } }, },
                    

                    {
                        padding: { top: 5, left: 0, bottom: 0, right: 0, },
                        css:{"height":"48px !important"},
                        cols: [
                            //{ width: 73, view: "label", height: 40, },                           
                            {
                                type: "space", width: 175, css: { "margin-right": "10px !important", "background": "white", "border-width": "1px 1px 1px 1px !important;", "border-color": "#0798af! important;" },
                               
                                    rows: [
                                        {
                                            padding: { top: 0, left: 0, bottom: 0, right: 0 },
                                            cols:[
                                                    {
                                                        width: 50, labelWidth: 0, view: "checkbox", id: "chkAR", labelRight: "AR", customCheckbox: false, click: function () { fnchkarClick(); }
                                                    },
                                                    {
                                                        width: 50, labelWidth: 0, view: "checkbox", id: "chkAP", labelRight: "AP", customCheckbox: false, click: function () { fnchkapClick(); }
                                                    },
                                                    {
                                                        width: 50, labelWidth: 0, view: "checkbox", id: "chkAL", labelRight: "A&L", customCheckbox: false, click: function () { fnchkALClick(); }
                                                    },
                                            ]

                                        },                               

                                    ]
                               
                            },
                            {
                                
                                type: "space", label: "", width: 175, css: { "margin-left": "10px !important", "background": "white", "border-width": "1px 1px 1px 1px !important;", "border-color": "#0798af! important;" },
                                                                   
                                    rows: [

                                        {                                            
                                            cols: [
                                                    
                                                    {
                                                        width: 75, labelWidth: 55, view: "checkbox", id: "chkDueBill", label: "Due Bill", customCheckbox: false, click: function () { fnchkDueDtClick(); }

                                                    },
                                                    {
                                                        width: 75, labelWidth: 55, view: "checkbox", id: "chkAllBill", label: "All Bills", customCheckbox: false, click: function () { fnchkAllBillClick(); }
                                                    },
                                            ]
                                        }

                                    ]
                                
                            },
                        ]
                    },
                    {
                        padding: { top: 5, left: 0, bottom: 0, right: 0, },
                        css: { "height": "48px !important" },
                        cols: [
                            //{ width: 73, view: "label", height: 40, },  
                            
                            {
                                type: "space", label: "", width: 175, css: { "margin-right": "10px !important", "background": "white", "border-width": "1px 1px 1px 1px !important;", "border-color": "#0798af! important;" },

                                rows: [
                                    {
                                        padding: { top: 0, left: 0, bottom: 0, right: 0 },
                                        cols: [
                                                {
                                                    width: 75, labelWidth: 55, view: "checkbox", id: "chkDRCR", label: "DR/CR", customCheckbox: false, click: function () { fnchkDRCRClick(); }
                                                    

                                                },
                                                {
                                                   
                                                },
                                        ]

                                    },

                                ]

                            },
                            {
                                type: "space", label: "", id:"spDrCr", width: 175, css: { "margin-left": "10px !important", "background": "white", "border-width": "1px 1px 1px 1px !important;", "border-color": "#0798af! important;" },
                               
                                    rows: [
                                        {
                                            padding: { top: 0, left: 0, bottom: 0, right: 0 },
                                            cols: [
                                                    {
                                                        width: 75, labelWidth: 55, view: "checkbox", id: "chkDr", label: "DR Trn", customCheckbox: false,

                                                    },
                                                    {
                                                        width: 75, labelWidth: 55, view: "checkbox", id: "chkCr", label: "CR Trn", customCheckbox: false,
                                                    },
                                            ]

                                        },

                                    ]
                                
                            },
                            
                        ]
                    },

                    {
                        padding: { top: 5, left: 0, bottom: 0, right: 0, },
                        //css: { "height": "60px !important" },
                        cols: [                            
                            {
                                view: "fieldset", label: "Age According To",
                                body: {
                                    rows: [
                                        {
                                            padding: { top: 0, left: 0, bottom: 0, right: 0 },
                                            cols: [
                                                    {
                                                        width: 120, labelWidth: 70, view: "checkbox", id: "chkDueDt", label: "Due Dt", customCheckbox: false, click: function () { fnchkDueDtClick(); }

                                                    },
                                                    {
                                                        width: 123, labelWidth: 85, view: "checkbox", id: "chkVouDt", label: "Voucher Dt", customCheckbox: false, click: function () { fnchkVouDtClick(); }
                                                    },
                                                    {
                                                        width: 120, labelWidth: 70, view: "checkbox", id: "chkrefdt", label: "Bill Dt", customCheckbox: false, click: function () { fnchkrefdtClick(); }
                                                    },
                                            ]
                                        }

                                    ]
                                },
                            },
                        ]
                    },

                                    
                    
                    { padding: { top: 10, left: 0, bottom: 0, right: 0, }, cols: [{}, { view: "button", type: "icon", maxWidth: 80, id: "OkFilter", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { btnOkFilterClick(); } }], },

                    { view: "text", id: "txtDueDt", hidden: true, },
                    { view: "text", id: "txtVouDt", hidden: true, },
                    { view: "text", id: "txtrefdt", hidden: true, },
                    { view: "text", id: "txtDr", hidden: true, },
                    { view: "text", id: "txtCr", hidden: true, },
                    { view: "text", id: "txtDueBill", hidden: true, },
                    { view: "text", id: "txtAllBill", hidden: true },
                    
                    {
                        view: "text", id: "txtAR", hidden: true,
                        on:
                            {
                                onChange:
                                    function (newVal, oldVal) {
                                        if (newVal != oldVal) {
                                            window.GroupIds = "";
                                            window.LevelIds = "";
                                            $$("txtGroup").setValue("");
                                            window.PartyIds = "";
                                            $$("txtParty").setValue("");
                                        }
                                    }
                            }
                    },
                    {
                        view: "text", id: "txtAP", hidden: true,
                        on:
                            {
                                onChange:
                                    function (newVal, oldVal) {
                                        if (newVal != oldVal) {
                                            window.GroupIds = "";
                                            window.LevelIds = "";
                                            $$("txtGroup").setValue("");
                                            window.PartyIds = "";
                                            $$("txtParty").setValue("");
                                        }
                                    }
                            }
                    },
                    {
                        view: "text", id: "txtAL", hidden: true,
                        on:
                            {
                                onChange:
                                    function (newVal, oldVal) {
                                        if (newVal != oldVal) {
                                            window.GroupIds = "";
                                            window.LevelIds = "";
                                            $$("txtGroup").setValue("");
                                            window.PartyIds = "";
                                            $$("txtParty").setValue("");
                                        }
                                    }
                            }
                    },
                    { view: "text", id: "txtDivId", hidden: true, },
                    { view: "text", id: "txtTrnTy", hidden: true, },
                    { view: "text", id: "txtReferNm", hidden: true, },
                    { view: "text", id: "txtDRCR", hidden: true, },
                    
                    
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
        height: 350,
        width: 250,
        move: true,
        body: {
            rows: [
                    {
                        view: "scrollview", scroll: "y", height: 250, width: 250, body: {
                            padding: { top: 20, left: 30, bottom: 20, right: 10 },
                            rows: [
                                
                                { view: "checkbox", id: "chkBillDt", labelWidth: 5, labelRight: "RefDate", customCheckbox: false, },
                                { view: "checkbox", id: "chkFornCur", labelWidth: 5, labelRight: "Foreign Currency", customCheckbox: false,hidden:true },                                
                                { view: "checkbox", id: "chkLnNar", labelWidth: 5, labelRight: "Line Narration", customCheckbox: false, },
                                { view: "checkbox", id: "chkVchTy", labelWidth: 5, labelRight: "Voucher Type", customCheckbox: false, },

                                {
                                    padding: { top: 5, left: 0, bottom: 0, right: 0, },
                                    css: { "height": "48px !important" },
                                    cols: [                                                                               
                                        {

                                            type: "space", label: "", width: 180, css: { "margin-left": "10px !important", "background": "white", "border-width": "1px 1px 1px 1px !important;", "border-color": "#0798af! important;" },

                                            rows: [

                                                {
                                                    cols: [

                                                            {
                                                                width: 75, labelWidth: 55, view: "checkbox", id: "chkdispdt", label: "Due Dt", customCheckbox: false, click: function () { fnchkdispdtClick(); }

                                                            },
                                                            {
                                                                width: 85, labelWidth: 65, view: "checkbox", id: "chkdispdys", label: "Due Days", customCheckbox: false, click: function () { fnchkdispdysClick(); }
                                                            },
                                                    ]
                                                }

                                            ]

                                        },
                                    ]
                                },
                                                                                               

                                
                                { view: "text", id: "txtFornCur", hidden: true, },
                                { view: "text", id: "txtLnNar", hidden: true, },
                                { view: "text", id: "txtVchTy", hidden: true, },
                                { view: "text", id: "txtBillDt", hidden: true, },
                                { view: "text", id: "txtdispdt", hidden: true, },
                                { view: "text", id: "txtdispdys", hidden: true, },

                                //{ cols: [{}, { view: "button", type: "icon", id: "Okoptions", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { $("#Display").click(); $$("RptOptionsNew").hide(); } }], }
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
    $$("txtFornCur").setValue($$("chkFornCur").getValue());
    $$("txtLnNar").setValue($$("chkLnNar").getValue());
    $$("txtVchTy").setValue($$("chkVchTy").getValue());
    $$("txtBillDt").setValue($$("chkBillDt").getValue());
    $$("txtdispdt").setValue($$("chkdispdt").getValue());
    $$("txtdispdys").setValue($$("chkdispdys").getValue());    
    fnShowColumn();
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {

    
    $$("chkFornCur").setValue($$("txtFornCur").getValue());
    $$("chkLnNar").setValue($$("txtLnNar").getValue());
    $$("chkVchTy").setValue($$("txtVchTy").getValue());
    $$("chkBillDt").setValue($$("txtBillDt").getValue());

    $$("chkdispdt").setValue($$("txtdispdt").getValue());
    $$("chkdispdys").setValue($$("txtdispdys").getValue());    
    
    $$("RptOptionsNew").show();
};
function btnFilterClick() {
    debugger;

    $$("chkDueDt").setValue($$("txtDueDt").getValue());
    $$("chkVouDt").setValue($$("txtVouDt").getValue());
    $$("chkrefdt").setValue($$("txtrefdt").getValue());
    $$("chkDr").setValue($$("txtDr").getValue());
    $$("chkCr").setValue($$("txtCr").getValue());
    $$("chkDueBill").setValue($$("txtDueBill").getValue());
    $$("chkAllBill").setValue($$("txtDueDt").getValue());
    $$("chkAR").setValue($$("txtAR").getValue());
    $$("chkAP").setValue($$("txtAP").getValue());
    $$("chkAL").setValue($$("txtAL").getValue());
    $$("chkDRCR").setValue($$("txtDRCR").getValue());
    

    if($$("txtDivId").getValue()=="") $$("ddlDivis").setValue("<-ALL->") ;
    else $$("ddlDivis").setValue($$("txtDivId").getValue());
    if($$("txtTrnTy").getValue()=="") $$("ddlTrnTy").setValue("<-ALL->") ;
    else $$("ddlTrnTy").setValue($$("txtTrnTy").getValue());

    $$("txtRefNm").setValue($$("txtReferNm").getValue());

    
    
    $$("RptAdvFilter").show();
};
function btnOkFilterClick() {
    debugger;
    GridClear();
    $$("txtDueDt").setValue($$("chkDueDt").getValue());
    $$("txtVouDt").setValue($$("chkVouDt").getValue());
    $$("txtrefdt").setValue($$("chkrefdt").getValue());
    $$("txtDr").setValue($$("chkDr").getValue());
    $$("txtCr").setValue($$("chkCr").getValue());
    $$("txtDueBill").setValue($$("chkDueBill").getValue());
    $$("txtAllBill").setValue($$("chkDueDt").getValue());
    $$("txtAR").setValue($$("chkAR").getValue());
    $$("txtAP").setValue($$("chkAP").getValue());
    $$("txtAL").setValue($$("chkAL").getValue());
    $$("txtDRCR").setValue($$("chkDRCR").getValue());

    if($$("chkrefdt").getValue()=="1") $$("txtBillDt").setValue("1");
    

    if ($$("ddlDivis").getValue() == "<-ALL->") $$("txtDivId").setValue("");
    else $$("txtDivId").setValue($$("ddlDivis").getValue());
    if ($$("ddlTrnTy").getValue() == "<-ALL->") $$("txtTrnTy").setValue("");
    else $$("txtTrnTy").setValue($$("ddlTrnTy").getValue());

    $$("txtReferNm").setValue($$("txtRefNm").getValue());  
    fnShowColumn();
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
    $$("txtDueDt").setValue("0");
    $$("txtVouDt").setValue("1");
    $$("txtrefdt").setValue("0");
    $$("txtDr").setValue("1");
    $$("txtCr").setValue("1");
    $$("txtDueBill").setValue("1");
    $$("txtAllBill").setValue("0");
    $$("txtAR").setValue("1");
    $$("txtAP").setValue("1");
    $$("txtAL").setValue("1");
    $$("txtDRCR").setValue("1");
    $$("txtBillDt").setValue("0");
    $$("txtFornCur").setValue("0");
    $$("txtLnNar").setValue("0");
    $$("txtVchTy").setValue("0");
    $$("txtParty").setValue("");
    $$("txtDivId").setValue("");
    $$("txtTrnTy").setValue("");
    $$("txtdispdt").setValue("1");
    $$("txtdispdys").setValue("0");

        
    GridClear();

    window.GL_CompanyID = "";
    //window.FiscalYear = "";
    window.FiscalFromDt = "";
    window.FiscalToDt = "";
    window.GroupIds = "";
    window.LevelIds = "";
    window.PartyIds = "";
    window.VchTyIds = "";
    window.AC_CD_IND = "0";
    window.GSTAppl = "0";
    window.DIV_APPL_IND = "0";
    window.Y6_IND = "0";
    window.X6_IND = "0";
    window.V6_IND = "0";
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
                //window.FiscalYear = rowData.FiscalYear;
                //window.FiscalStartDT = rowData.FiscalFromDt;
                //window.FiscalFromDt = rowData.PeriodStartDt;
                //window.FiscalToDt = rowData.PeriodEndDt;
                
                //$$("ToDt").setValue(rowData.FiscalToDt);
                var dtComp = rowData.dtComp;
                var dtCont = rowData.dtCont;
                window.AC_CD_IND = dtCont[0].AC_CD_IND;
                window.GSTAppl = dtComp[0].GL_VAT_IND;
                window.DIV_APPL_IND = dtCont[0].DIV_APPL_IND;
                window.Y6_IND = dtCont[0].Y6_IND;
                window.MULTI_CURRENCY_IND = dtCont[0].MULTI_CURRENCY_IND;
                window.X6_IND = dtCont[0].X6_IND;
                window.V6_IND = dtCont[0].V6_IND;

                window.CURRDT = dtComp[0].CURDT1;
                

                $("#CURRENCY_FORMAT").val(dtComp[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(dtComp[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(dtComp[0].VAL_DECIM_LIMIT);

                //$$("AsOnDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                //$$("AsOnDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                //$$("AsOnDt").refresh();
                
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

                var vCurrDt = window.CURRDT;
                vCurrDt = vCurrDt.replace(/-/g, '');
                vCurrDt = parseFloat(vCurrDt);
                var vEndDt = rowData.FiscalToDt;
                vEndDt = vEndDt.replace(/-/g, '');
                vEndDt = parseFloat(vEndDt);

                if (vEndDt < vCurrDt) $$("AsOnDt").setValue(rowData.FiscalToDt);
                else $$("AsOnDt").setValue(window.CURRDT);
                
            }
        },
    });

    if (window.DIV_APPL_IND == "1") {                
        $$("ddlDivis").show();        
    }
    else {        
        $$("ddlDivis").hide();        
    }
    if (window.MULTI_CURRENCY_IND == "1") {
        $$("chkFornCur").show();
    }
    else {
        $$("chkFornCur").hide();
    }

    if (window.AC_CD_IND == "1") {
        $$("dtPartyPop").showColumn("AC_CD");
    }
    else {
        $$("dtPartyPop").hideColumn("AC_CD");
    }

    if (window.Y6_IND == "1") {
        $$("chkAL").show();
        $$("chkAL").setValue("1");
    }
    else {
        $$("chkAL").hide();
        $$("chkAL").setValue("0");
    }

    if (window.V6_IND == "2") document.getElementById('lblAsOn').innerHTML = "As At"
    else document.getElementById('lblAsOn').innerHTML = "As On"

    //if (window.GSTAppl == "1") $$("chkGstCd").show();
    //else  $$("chkGstCd").hide();
    //return rowData;
}
function fnPropChange(CompId) {
    debugger;
    fnLondGlInitCont(CompId);
    GridClear();
        
    //fnGroupLoad();
    fnDivisLoad();
    fnTrnTyLoad(); 
    
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
function fnGroupLoad() {
    debugger;
    $$("dtGroupPop").clearAll();
    var dataparam = {};
    var rowData = [];    
    var CompId = $$("Property").getValue();
    var ARApFil = "";
    var ALAppl = "0";
    var vBool = "0";
    if ($$("txtAL").getValue() == "1" && window.Y6_IND == "1") ALAppl = "1";

    if ($$("txtAR").getValue() == "1" && $$("txtAP").getValue() == "0")  ARApFil = "AR";
    else if ($$("txtAR").getValue() == "0" && $$("txtAP").getValue() == "1") ARApFil = "AP";
    else
    {
        ARApFil = "";
        if(window.Y6_IND == "1")
            if ($$("txtAR").getValue() == "1" && $$("txtAP").getValue() == "1") vBool = "1";
        
    }

    Request = {
        REQTYPE: "GET_FNPARTYGROUPLOAD",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        Bill_Ind: "1",
        vBool: vBool,
        ALAppl: ALAppl,
        ARApFil: ARApFil,        
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

function fnTrnTyLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_FNGLTRNTY",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
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
                $$("ddlTrnTy").define("options", options);

                //$$("ddlGroup").getList().config.yCount = 12;

                //$$("ddlDivis").getPopup().define("template", "#value#");
                //$$("ddlDivis").getPopup().define('filter', function (item, value) {
                //    //debugger;                            
                //    if (item.value.toString().toLowerCase().indexOf(value.toString().toLowerCase()) >= 0)
                //        return true;
                //    return false;
                //});
                //$$("ddlDivis").refresh();
                $$("ddlTrnTy").setValue("<-ALL->")
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
                        type: "icon",
                        icon: "wxi-check",
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
                            window.PartyIds = "";
                            $$("txtParty").setValue("");
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

function PartyPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "PartyPopup",
        head: "Account Search",
        position: "center",        
        maxWidth: 450,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtPartyPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' },fillspace:true, },
                       { header: "AC_CD", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },                       
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
                            window.PartyIds = "";
                            $$("txtParty").setValue("");
                            $$("dtPartyPop").data.each(function (obj) {
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
                                window.PartyIds = vLedId;
                                $$("PartyPopup").hide();
                                $$("txtParty").setValue(vLedNm);

                            }
                            else {
                                $$("PartyPopup").hide();
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

function fnLoadPartyGrid() {
    debugger;
    var rowDatad = [];
    var CompId = $$("Property").getValue();
    var GrpIds = window.GroupIds;
    Request = {
        REQTYPE: "GET_FNPARTYLOAD",
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
                $$("dtPartyPop").clearAll();
                $$("dtPartyPop").parse(rowDatad);
                $$("dtPartyPop").refresh();

            }
        }
    })

};

function btnCancelClick() {
    $$("RptUpdateBill").hide();
    fnLoadGrid();
}
function btnUpdateClick() {
    $("#LoadDIv").show();
    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var AcIds = window.PartyIds;
    var AsOnDt = $$("AsOnDt").getText();
    var CompId = $$("Property").getValue();
    ReqNm = "";
    ReqNm = "GET_FNUPDTCLICK";


    var Request = {
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        ASONDT: AsOnDt,
        GRPID: GrpIds,
    }

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
                if (rowData == "1") bVal = "1";
                $("#LoadDIv").hide();
                $$("RptUpdateBill").hide();
                fnLoadGrid();
            }
            else {
                bVal = "0";
                $("#LoadDIv").hide();
                $$("RptUpdateBill").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            bVal = "0";
            $("#LoadDIv").hide();
            $$("RptUpdateBill").hide();
        }
    });


}

function loadUpdateBillWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptUpdateBill",
        head: "Update Bills",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 300,
        move: true,
        body: {
            padding: { top: 20, left: 10, bottom: 20, right: 10 },
            width: 300,
            rows: [

                    { view: "text", width: 280, labelWidth: 150, id: "txtLstUpdDt", label: "Last Update Date", readonly: true, on: { onChange: function (newVal, OldVal) { } }, inputAlign: 'center', },
                    { view: "text", width: 280, labelWidth: 150, id: "txtLstUpdTm", label: "Time", readonly: true, on: { onChange: function (newVal, OldVal) { } }, inputAlign: 'center', },

                    { padding: { top: 10, left: 0, bottom: 0, right: 0, }, cols: [{}, { view: "button", type: "icon", maxWidth: 80, id: "btnUpdate", icon: "wxi-check", label: "Update", inputWidth: 80, width: 80, click: function () { btnUpdateClick(); } }, { view: "button", type: "icon", maxWidth: 80, id: "btnCancel", icon: "wxi-close-circle", label: "Cancel", inputWidth: 80, width: 80, click: function () { btnCancelClick(); } }], },


            ]
        }
    });
};

function fnbtnDisplayClick() {
    debugger;
    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var AcIds = window.PartyIds;
    var AsOnDt = $$("AsOnDt").getText();
    var bVal="1";

    if (AsOnDt == "") {
        webix.message({ type: 'warning', text: 'Date can not be empty' });
        webix.UIManager.setFocus($$("AsOnDt"));
        return false;
    }

    if (GrpIds == "") {
        webix.message({ type: 'warning', text: 'Group can not be empty' });
        webix.UIManager.setFocus($$("txtGroup"));
        return false;
    }
    if ($$("chkDr").getValue() == "0" && $$("chkCr").getValue() == "0") $$("chkDr").setValue("1");

    var rowData = [];
    var requestData = "";
    var CompId = $$("Property").getValue();

    if (AcIds != "")
    {
        
        var ReqNm = "";
        ReqNm = "GET_FNCALLUPDDISTAMT";       
       
        var Request = {        
            REQTYPE: ReqNm,
            COMPID: CompId,
            GL_COMPID: window.GL_CompanyID,
            FISCALYEAR: window.FiscalYear,
            ACCID: AcIds,
            ASONDT:AsOnDt
        }
        
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);
        $.ajax({
            async: false,
            url: "/GLReports/RPTAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (data) {
                debugger;
                if (data != "") {
                    rowData = JSON.parse(data);
                    if(rowData == "0"){
                        webix.message({ type: 'warning', text: 'Error On Update ' });
                        webix.UIManager.setFocus($$("txtGroup"));
                        bVal="0";
                        
                    }
                }                
            },
            error: function (request, status, error) {
                console.log("Error Failure");  
                bVal="0";
            }
        });
        if (bVal == "0") return false;
        fnLoadGrid();
    }
    else
    {       
        var ReqNm = "";
        ReqNm = "GET_FNUPDTPOPUPLOAD";
        bVal = "1";
        var Request = {
            REQTYPE: ReqNm,
            COMPID: CompId,
            GL_COMPID: window.GL_CompanyID,
            FISCALYEAR: window.FiscalYear,
            GRPID: GrpIds,           
        }

        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);
        $.ajax({
            async: false,
            url: "/GLReports/RPTAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (data) {
                debugger;
                if (data != "") {
                    rowData = JSON.parse(data);
                    $$("txtLstUpdDt").setValue(rowData.RDate);
                    $$("txtLstUpdTm").setValue(rowData.RTm);

                    var vUpdDt = formatDateWebix(rowData.RDate);
                    vUpdDt = vUpdDt.replace(/-/g, '');
                    vUpdDt = parseFloat(vUpdDt);

                    var vCurrDt = window.CURRDT;
                    vCurrDt = vCurrDt.replace(/-/g, '');
                    vCurrDt = parseFloat(vCurrDt);
                    if(vUpdDt >= vCurrDt)
                    {
                        bVal = "0";
                        $$("RptUpdateBill").show();
                        $("#LoadDIv").hide();

                    }

                }
                else {
                    bVal = "0";
                }
            },
            error: function (request, status, error) {
                console.log("Error Failure");
                bVal = "0";
            }
        });

        if (bVal == "0") return false;

        $$("RptUpdateBill").show();
        btnUpdateClick();
        //$("#LoadDIv").show();

        //bVal="1";
        //ReqNm = "";
        //ReqNm = "GET_FNUPDTCLICK";

        //var Request = {
        //    REQTYPE: ReqNm,
        //    COMPID: CompId,
        //    GL_COMPID: window.GL_CompanyID,
        //    FISCALYEAR: window.FiscalYear,            
        //    ASONDT:AsOnDt,
        //    GRPID: GrpIds,
        //}

        //requestData = JSON.stringify(Request);
        //requestData = encodeURIComponent(requestData);
        //$.ajax({
        //    async: true,
        //    url: "/GLReports/RPTAPI_CALL",
        //    type: 'POST',
        //    data: "request=" + requestData,
        //    success: function (data) {
        //        debugger;
        //        if (data != "") {
        //            rowData = JSON.parse(data);
        //            if (rowData == "1") bVal = "1";
        //            $("#LoadDIv").hide();
        //            $$("RptUpdateBill").hide();
        //            fnLoadGrid();
        //        }
        //        else {
        //            bVal = "0";
        //            $("#LoadDIv").hide();
        //            $$("RptUpdateBill").hide();
        //        }
        //    },
        //    error: function (request, status, error) {
        //        console.log("Error Failure");
        //        bVal = "0";
        //        $("#LoadDIv").hide();
        //        $$("RptUpdateBill").hide();
        //    }
        //});
    
        
    }
}

function fnLoadGrid() {
    debugger;
    $$("gridRpt").clearAll();   
    $("#LoadDIv").show();

    var GrpIds = window.GroupIds;
    var LvlIds = window.LevelIds;
    var AcIds = window.PartyIds;
    var AsOnDt = $$("AsOnDt").getText();
    var DRCRTrn = "";
    var bDueDt = "";
    var vPayNote = window.X6_IND;

    var RefNm = $$("txtReferNm").getValue();

    var vTrnTyId = $$("txtTrnTy").getValue();

    ChkDRCR = $$("txtDRCR").getValue();
    chkForncur = $$("txtFornCur").getValue();
    chkdispdt = $$("txtdispdt").getValue();
    chkVouDt = $$("txtVouDt").getValue();
        
    var DivId = $$("txtDivId").getValue();
    var FromDt = $$("AsOnDt").getText();          
    var chkDr = $$("txtDr").getValue();
    var chkCr = $$("txtCr").getValue();    
    if (DivId == "<-ALL->") DivId = "";
    CompId = $$("Property").getValue();
    var chkDueDt = $$("txtDueDt").getValue();

    if (chkDr == "1" && chkCr == "1") DRCRTrn = "3";
    else if (chkDr == "1") DRCRTrn = "1" ;
    else if (chkCr == "1") DRCRTrn = "2";

    if (chkDueDt  == "1") bDueDt="1";
    var ReqNm = "";
    ReqNm = "GET_FNGLLOADOUTSTANDBILLS"    
    
    debugger;
    Request = {        
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        DIVID: DivId,        
        FROMDT: FromDt,        
        CHKDR: chkDr,
        CHKCR: chkCr,        
        GRPIDS: GrpIds,
        LEVIDS: LvlIds,
        ACCIDS: AcIds,
        bArAp: "1",        
        bOnAc: "1",
        Forgrp: "0",
        DRCRTrn:DRCRTrn,
        LEVELNO:"0",        
        bDueDt: bDueDt,
        chkDueDt: chkDueDt,
        ChkDRCR: ChkDRCR,
        chkForncur: chkForncur,
        vPayNote: vPayNote,
        chkVouDt: chkVouDt,
        vTrnTyId: vTrnTyId,
        REFERNM: RefNm,
        chkdispdt: chkdispdt

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

function fnShowColumn() {
    GridClear();

    if ($$("txtLnNar").getValue() == "1") $$("gridRpt").showColumn("ixNarr");
    else $$("gridRpt").hideColumn("ixNarr");

    if ($$("txtVchTy").getValue() == "1") $$("gridRpt").showColumn("ixVtype");
    else $$("gridRpt").hideColumn("ixVtype");

    if ($$("txtBillDt").getValue() == "1") $$("gridRpt").showColumn("ixBillDate");
    else $$("gridRpt").hideColumn("ixBillDate");

    if ($$("txtrefdt").getValue() == "1") $$("gridRpt").showColumn("ixCur");
    else if ($$("txtDueDt").getValue() == "1") $$("gridRpt").showColumn("ixCur");
    else $$("gridRpt").hideColumn("ixCur");  
       

    if ($$("txtdispdt").getValue() == "1") {
        $$("gridRpt").getColumnConfig("ixDueDt").header[0].text = "Due Dt";
        $$("gridRpt").refreshColumns();
    } 
    

    if ($$("txtdispdys").getValue() == "1") {
        $$("gridRpt").getColumnConfig("ixDueDt").header[0].text = "Due Days";
        $$("gridRpt").refreshColumns();
    }
    

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

function fnchkDRCRClick() {
    debugger;
    if ($$("chkDRCR").getValue() == "1") {
        $$("spDrCr").show();
    }
    else {
        $$("spDrCr").hide();        
        $$("chkDr").setValue("1");
        $$("chkCr").setValue("1");        
    }
}

function fnchkDueDtClick() {
    debugger;
    if ($$("chkDueBill").getValue() == "1") {        
        $$("chkAllBill").setValue("0");
    }
    
};
function fnchkAllBillClick() {
    debugger;
     if ($$("chkAllBill").getValue() == "1") {
        $$("chkDueBill").setValue("0");

    }
};
function fnchkALClick() {
    debugger;    
    if ($$("chkAL").getValue() == "0" && $$("chkAP").getValue() == "0" && $$("chkAR").getValue() == "0") $$("chkAL").setValue("1");
}
function fnchkapClick() {
    debugger;
    
    if ($$("chkAP").getValue() == "0")
    {
        if (Y6_IND == "1")
        {
            if ($$("chkAR").getValue() == "0" && $$("chkAL").getValue() == "0") $$("chkAP").setValue("1");
        }
        else
        {
            if ($$("chkAR").getValue() == "0") $$("chkAR").setValue("1");
        }
    }
}
function fnchkarClick() {
    debugger;
    
    if ($$("chkAR").getValue() == "0") {
        if (Y6_IND == "1") {
            if ($$("chkAP").getValue() == "0" && $$("chkAL").getValue() == "0") $$("chkAR").setValue("1");
        }
        else {
            if ($$("chkAP").getValue() == "0") $$("chkAP").setValue("1");
        }
    }
}
function fnchkDueDtClick()
{
    debugger;
    if ($$("chkDueDt").getValue() == "1")
    {
        $$("chkVouDt").setValue("0");
        $$("chkrefdt").setValue("0");        
    }
        
    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkVouDt").setValue("1");
    
   
}
function fnchkVouDtClick() {
    if ($$("chkVouDt").getValue() == "1") {
        $$("chkDueDt").setValue("0");
        $$("chkrefdt").setValue("0");
    }

    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkVouDt").setValue("1");


}
function fnchkrefdtClick() {
    if ($$("chkrefdt").getValue() == "1") {
        $$("chkDueDt").setValue("0");
        $$("chkVouDt").setValue("0");
    }
    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkrefdt").setValue("1");
}

function fnChkBillDetClick() {

    if ($$("chkBillDet").getValue() == "1")  $$("chkVchDet").setValue("0");

}
function GridClear() {
    $$("gridRpt").clearAll();
}

function fnchkdispdtClick()
{
    debugger;
    
    if ($$("chkdispdt").getValue() == "1") 
    {
        $$("chkdispdys").setValue("0");                
        
    }    
    if ($$("chkdispdt").getValue() == "0") $$("chkdispdt").setValue("0");
    
    
}
function fnchkdispdysClick() {
    debugger;
    if ($$("chkdispdys").getValue() == "1") {
        $$("chkdispdt").setValue("0");        
    }
    if ($$("chkdispdys").getValue() == "0") $$("chkdispdt").setValue("1");


}

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

}





