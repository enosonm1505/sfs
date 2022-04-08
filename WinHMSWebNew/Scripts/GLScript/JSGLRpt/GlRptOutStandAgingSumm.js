
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
    
    webix.ui({
        container: "divFrmDt", view: "datepicker", labelWidth: 90, id: "AsOnDt", format: "%d/%m/%Y", stringResult: true,
        on: { onChange: function (newVal, OldVal) { fnFromDtChange(); } }
    });
    
    webix.ui({ container: "divBtnDisplay", id: "btnDispay", css: "webix_primary", view: "button", inputWidth: 60, label: "Display", click: function () { fnbtnDisplayClick(); } });

    //webix.ui({       
        
    //    type: "space",
    //    id:"SpGrid


    //})

    
    
    
};
function fnFromDtChange() {
    debugger;
    GridClear();   

};

function btnGrpSrchClick() {
    if (fnChkSessVal() == false) return;
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
    if (fnChkSessVal() == false) return;
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
            { id: "ixPropId", header: 'PropertyId', hidden: true },//120
                { id: "ixPropNm", header: 'Property', hidden: true, width: 150, css: { 'text-align': 'left ! important', }, exportType: "string" },//120
                { id: "ixPartyID", header: 'AC Code', exportType: "string" ,hidden:true},
                { id: "ixPartyNm", header: 'Party Name', width: 280, css: { 'text-align': 'left ! important', }, exportType: "string" },
                { id: "ixMSMENo", header: 'MSME No.', width: 120, css: { 'text-align': 'center ! important', }, },
                { id: "ixAddress", header: 'Address', width: 350, css: { 'text-align': 'left ! important', }, exportType: "string" },
                { id: "ixCity", header: 'City', width: 140, css: { 'text-align': 'left ! important', }, exportType: "string" },
                { id: "ixAcHold", header: 'Account Holder', width: 250, exportType: "string" },
                { id: "ixifsc", header: 'IFSC Code', width: 120, css: { 'text-align': 'center ! important', }, exportType: "string" },
                { id: "ixAcnno", header: 'Account No.', width: 120, css: { 'text-align': 'center ! important', }, exportType: "string" },
                { id: "ixCreDays", header: 'Credit Days', width: 120, css: { 'text-align': 'center ! important', }, exportType: "string" },
                { id: "ixCreAmt", header: 'Credit Limit', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ixCrAmt", header: 'Credit Amt', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ixDrAmt", header: 'Debit Amt', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ixTrnTy", header: 'Vouch Type', width: 120, css: { 'text-align': 'center ! important', }, },                

                { id: "ixBal", header: 'Balance Amt', width: 120, css: { 'text-align': 'right ! important', },  exportFormat: "#,##0.00",},
                { id: "ixCreVar", header: 'Credit Variance', width: 120, css: { 'text-align': 'right ! important', },  exportFormat: "#,##0.00", },
                { id: "ixCur", header: { text: "No Due", }, width: 120, css: { 'text-align': 'right ! important', },  exportFormat: "#,##0.00", },
                { id: "ix0", header: '0 - 30', width: 120, css: { 'text-align': 'right ! important', },  exportFormat: "#,##0.00",},
                { id: "ix31", header: '31 - 60', width: 120, css: { 'text-align': 'right ! important', },  exportFormat: "#,##0.00", },
                { id: "ix61", header: '61 - 90', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ix91", header: '91 - 180', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ix181", header: ' > 180', width: 120, css: { 'text-align': 'right ! important', }, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ixHid", header: { text: "Trn_Id", },   hidden: true },                
                { id: "ixHid1", header: { text: "Trn_Id_Srno", },  hidden: true },           
                { id: "ixUnAdj", header: { text: "Un Adjusted", }, hidden: true, exportType: "number", exportFormat: "#,##0.00", },
                { id: "ixSalPer", header: { text: "Sales Person", }, hidden: true },
                { id: "ixNarration", header: { text: "Payment Note", }, hidden: true },
                          
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
            $export: function (obj) {
                debugger;
                
                
                var item = webix.copy(obj);
                var vBal = item.ixBal;
                var CrStr = "C";
                var DrStr = "D";
                if (item.CLR != "ExcelHead") {
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixBal = vBal1;
                    }
                    vBal = item.ix0;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ix0 = vBal1;
                    }
                    vBal = item.ix31;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ix31 = vBal1;
                    }
                    vBal = item.ix61;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ix61 = vBal1;
                    }
                    vBal = item.ix91;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ix91 = vBal1;
                    }
                    vBal = item.ix181;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ix181 = vBal1;
                    }
                    vBal = item.ixCreVar;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixCreVar = vBal1;
                    }


                    vBal = item.ixCreAmt;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        //vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        //if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixCreAmt = vBal1;
                    }


                    vBal = item.ixCrAmt;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        //vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        //if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixCrAmt = vBal1;
                    }

                    vBal = item.ixDrAmt;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        //vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        //if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixDrAmt = vBal1;
                    }

                    vBal = item.ixUnAdj;
                    if (vBal != null && vBal != undefined) {
                        var vBal1 = vBal.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        vBal1 = vBal1.replace(",", ""); vBal1 = vBal1.replace(",", "");
                        //vBal1 = vBal1.replace(CrStr, ""); vBal1 = vBal1.replace(DrStr, "");
                        vBal1 = parseFloat(vBal1);
                        //if (vBal.indexOf(CrStr) >= 0) vBal1 = vBal1 * -1;
                        item.ixUnAdj = vBal1;
                    }
                }
                return item;

            }

        },
        

    });

    

};
function TempGrid() {
    debugger;
    webix.ui({
        view: "datatable",
        scroll: false,
        width: 6000,
        height: 6000,
        id: "Grid1",
        container: "divGrid1",       
        columns: webix.copy(vExpoartGrid1,1),
          
    });
}
function fnRowDblClick(RowId) {
    debugger;

    debugger;
    var selRow = $$("gridRpt").getItem(RowId);

    var FiscYr = window.FiscalYear;
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    var bMulti = "0";
    //if (CompId.indexOf(",") >= 0) {
    if (CompTy == "2"){
        bMulti = "1";
    }
    if (bMulti == "1") CompId = $.trim(selRow.ixPropId);
    var PARTY_NM = selRow.ixPartyNm; 
    var PARTY_ID = selRow.ixHid;
    PARTY_ID = "'" + PARTY_ID + "'";
    var GROP_NM = $$("txtGroup").getValue();
    var GROP_ID = window.GroupIds;
    var LVL_ID = window.LevelIds;
    var V_DT = $$("AsOnDt").getText();
    V_DT = V_DT.replace("/", "-");
    V_DT = V_DT.replace("/", "-");
    var SW = Number(screen.width) - 100;
    var Sh = Number(screen.height) - 100;

    var UrlQryStr = CompId + "~" + GROP_ID + "~" + LVL_ID + "~" + GROP_NM + "~" + V_DT + "~" + PARTY_NM + "~" + PARTY_ID;
    UrlQryStr = encodeURIComponent(UrlQryStr);

   // UrlQryStr= HttpUtil .UrlEncode(UrlQryStr)

    if (PARTY_ID != "" && PARTY_ID != null) {
        if (GROP_NM != "" && GROP_NM != null) {
            //Window1 = window.open("/GLReports/GLRptPartyBillSettle?PARTIAL=1&ID=" + UrlQryStr + " ", "PartySettlement", "width=" + SW + ",height=" + Sh + ",left=50,top=10 ");
            var PageUrl = "/GLReports/GLRptPartyBillSettle?PARTIAL=1&ID=" + UrlQryStr + " ";
            GlDrillDownWindowLoad(PageUrl);
        }
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
            id: "DrillPartySetlPopup",
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

                    $$('DrillPartySetlPopup').define("width", vWidth);
                    $$('DrillPartySetlPopup').define("height", vHeight)
                    $$('DrillPartySetlPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-PartySetl",
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
        height: 450,
        width: 500,
        move: true,
        body: {
            padding: { top: 20, left: 10, bottom: 20, right: 10 },
            width: 400,
            rows: [

                    { view: "richselect", width: 400, labelWidth: 110, id: "ddlDivis", label: "Division", on: { onChange: function (newVal, OldVal) { } }, },
                    //{ view: "text", width: 400, labelWidth: 100, id: "txtRefNm", label: "Reference Name", },
                    
                    //{ view: "richselect", width: 400, labelWidth: 100, id: "ddlTrnTy", label: "Trn Type", on: { onChange: function (newVal, OldVal) { } }, },
                    {
                        view: "search", width: 370, labelWidth: 110, id: "txtVchTy", label: "Trn Type", readonly: true, placeholder: "<-ALL->",
                        on: {
                            onSearchIconClick: function () {
                                debugger;
                                btnVchTySrchClick();
                            }
                        }
                    },

                    {
                        cols: [
                              { view: "text", id: "txtAmount", width: 230, label: "Amount", labelWidth: 110, on: { "onKeyPress": function (code, e) { return fnFloatText(code, e, this.getValue()); }, } },
                              {
                                  view: "radio", id: "OptDrCr", customRadio: false,
                                  options: [
                                      { value: "DR", id: 1 },
                                      { value: "CR", id: 2 },
                                  ], vertical: false, value: 1,
                              }]
                    },

                    { width: 170, labelWidth: 140, view: "checkbox", id: "chkFilter", label: "Filter 0 balance Parties", customCheckbox: false, },
                    { width: 170, labelWidth: 140, view: "checkbox", id: "chkAdj", label: "Adj UnAdj DR/CR", customCheckbox: false, },
                    

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
                    { view: "text", id: "txtAR", hidden: true,
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
                    { view: "text", id: "txtTrnTyNm", hidden: true, },
                    { view: "text", id: "txtTrnTy", hidden: true, },
                    { view: "text", id: "txtReferNm", hidden: true, },
                    { view: "text", id: "txtDRCR", hidden: true, },
                    { view: "text", id: "hdtxtAmount", hidden: true },
                    { view: "text", id: "txtSvDrCr", hidden: true, value: "0" },
                    { view: "text", id: "txtFilter", hidden: true, },
                    { view: "text", id: "txtAdj", hidden: true, },
                    
                    
                    
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
                                
                                { view: "checkbox", id: "chkBalDet", labelWidth: 5, labelRight: "Balance Details", customCheckbox: false, },
                                { view: "checkbox", id: "chkMSME", labelWidth: 5, labelRight: "MSME No.", customCheckbox: false,hidden:true },                                
                                { view: "checkbox", id: "chkAddr", labelWidth: 5, labelRight: "Address", customCheckbox: false, },
                                { view: "checkbox", id: "chkCity", labelWidth: 5, labelRight: "City", customCheckbox: false, },
                                { view: "checkbox", id: "chkUnAdj", labelWidth: 5, labelRight: "UnAdjusted", customCheckbox: false, },
                                { view: "checkbox", id: "chkAccHold", labelWidth: 5, labelRight: "Account Holder", customCheckbox: false, },
                                { view: "checkbox", id: "chkIFSC", labelWidth: 5, labelRight: "IFSC Code", customCheckbox: false, },
                                { view: "checkbox", id: "chkAccNo", labelWidth: 5, labelRight: "Account No.", customCheckbox: false, },
                                { view: "checkbox", id: "chkCrDays", labelWidth: 5, labelRight: "Credit Days", customCheckbox: false, },
                                { view: "checkbox", id: "chkCrLmt", labelWidth: 5, labelRight: "Credit Limit", customCheckbox: false, },
                                { view: "checkbox", id: "chkCrVar", labelWidth: 5, labelRight: "Credit Variance", customCheckbox: false, },
                                { view: "checkbox", id: "chkSalePer", labelWidth: 5, labelRight: "Sales Person", customCheckbox: false, },
                                { view: "checkbox", id: "chkVouchGrp", labelWidth: 5, labelRight: "Voucher Type Grouping", customCheckbox: false, },
                                { view: "checkbox", id: "chkPayNote", labelWidth: 5, labelRight: "Payment Notes", customCheckbox: false, },

                                
                                { view: "text", id: "txtBalDet", hidden: true, },
                                { view: "text", id: "txtMSME", hidden: true, },
                                { view: "text", id: "txtAddr", hidden: true, },
                                { view: "text", id: "txtCity", hidden: true, },
                                { view: "text", id: "txtUnAdj", hidden: true, },
                                { view: "text", id: "txtAccHold", hidden: true, },
                                { view: "text", id: "txtIFSC", hidden: true, },
                                { view: "text", id: "txtAccNo", hidden: true, },
                                { view: "text", id: "txtCrDays", hidden: true, },
                                { view: "text", id: "txtCrLmt", hidden: true, },
                                { view: "text", id: "txtCrVar", hidden: true, },
                                { view: "text", id: "txtSalePer", hidden: true, },
                                { view: "text", id: "txtVouchGrp", hidden: true, },
                                { view: "text", id: "txtPayNote", hidden: true, },
                                
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
    $$("txtBalDet").setValue($$("chkBalDet").getValue());
    $$("txtMSME").setValue($$("chkMSME").getValue());
    $$("txtAddr").setValue($$("chkAddr").getValue());
    $$("txtCity").setValue($$("chkCity").getValue());
    $$("txtUnAdj").setValue($$("chkUnAdj").getValue());
    $$("txtAccHold").setValue($$("chkAccHold").getValue());
    $$("txtIFSC").setValue($$("chkIFSC").getValue());
    $$("txtAccNo").setValue($$("chkAccNo").getValue());
    $$("txtCrDays").setValue($$("chkCrDays").getValue());
    $$("txtCrLmt").setValue($$("chkCrLmt").getValue());
    $$("txtCrVar").setValue($$("chkCrVar").getValue());
    $$("txtSalePer").setValue($$("chkSalePer").getValue());
    $$("txtVouchGrp").setValue($$("chkVouchGrp").getValue());
    $$("txtPayNote").setValue($$("chkPayNote").getValue());
    fnShowColumn();
    $$("RptOptionsNew").hide();    
};
function btnOptionClick() {   
    
    $$("chkBalDet").setValue($$("txtBalDet").getValue());
    $$("chkMSME").setValue($$("txtMSME").getValue());
    $$("chkAddr").setValue($$("txtAddr").getValue());
    $$("chkCity").setValue($$("txtCity").getValue());
    $$("chkUnAdj").setValue($$("txtUnAdj").getValue());
    $$("chkAccHold").setValue($$("txtAccHold").getValue());    
    $$("chkIFSC").setValue($$("txtIFSC").getValue());    
    $$("chkAccNo").setValue($$("txtAccNo").getValue());    
    $$("chkCrDays").setValue($$("txtCrDays").getValue());    
    $$("chkCrLmt").setValue($$("txtCrLmt").getValue());    
    $$("chkCrVar").setValue($$("txtCrVar").getValue());    
    $$("chkSalePer").setValue($$("txtSalePer").getValue());    
    $$("chkVouchGrp").setValue($$("txtVouchGrp").getValue());    
    $$("chkPayNote").setValue($$("txtPayNote").getValue());    
    
    $$("RptOptionsNew").show();
};
function btnFilterClick() {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("chkDueDt").setValue($$("txtDueDt").getValue());
    $$("chkVouDt").setValue($$("txtVouDt").getValue());
    $$("chkrefdt").setValue($$("txtrefdt").getValue());
    $$("chkDr").setValue($$("txtDr").getValue());
    $$("chkCr").setValue($$("txtCr").getValue());
    $$("chkDueBill").setValue($$("txtDueBill").getValue());
    $$("chkAllBill").setValue($$("txtAllBill").getValue()); //txtDueDt
    $$("chkAR").setValue($$("txtAR").getValue());
    $$("chkAP").setValue($$("txtAP").getValue());
    $$("chkAL").setValue($$("txtAL").getValue());
    $$("chkDRCR").setValue($$("txtDRCR").getValue());

    $$("chkFilter").setValue($$("txtFilter").getValue());
    $$("chkAdj").setValue($$("txtAdj").getValue());
    

    if($$("txtDivId").getValue()=="") $$("ddlDivis").setValue("<-ALL->") ;
    else $$("ddlDivis").setValue($$("txtDivId").getValue());
    //if($$("txtTrnTy").getValue()=="") $$("ddlTrnTy").setValue("<-ALL->") ;
    //else $$("ddlTrnTy").setValue($$("txtTrnTy").getValue());

    //$$("txtRefNm").setValue($$("txtReferNm").getValue());

    $$("txtVchTy").setValue($$("txtTrnTyNm").getValue());
    window.VchTyIds = $$("txtTrnTy").getValue();

    $$("txtAmount").setValue($$("hdtxtAmount").getValue());
    if ($$("txtSvDrCr").getValue() == "0" || $$("txtSvDrCr").getValue() == "1" || $$("txtSvDrCr").getValue() == "") {
        $$("OptDrCr").setValue("1");
    }
    else $$("OptDrCr").setValue("2");

    
    
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
    $$("txtAllBill").setValue($$("chkAllBill").getValue());//chkDueDt
    $$("txtAR").setValue($$("chkAR").getValue());
    $$("txtAP").setValue($$("chkAP").getValue());
    $$("txtAL").setValue($$("chkAL").getValue());
    $$("txtDRCR").setValue($$("chkDRCR").getValue());

    $$("txtFilter").setValue($$("chkFilter").getValue());
    $$("txtAdj").setValue($$("chkAdj").getValue());   

    if ($$("txtrefdt").getValue() == "1") $$("chkrefdt").setValue("1");
    

    if ($$("ddlDivis").getValue() == "<-ALL->") $$("txtDivId").setValue("");
    else $$("txtDivId").setValue($$("ddlDivis").getValue());
    //if ($$("ddlTrnTy").getValue() == "<-ALL->") $$("txtTrnTy").setValue("");
    //else $$("txtTrnTy").setValue($$("ddlTrnTy").getValue());

    $$("txtTrnTyNm").setValue($$("txtVchTy").getValue());
    $$("txtTrnTy").setValue(window.VchTyIds);    

    //$$("txtReferNm").setValue($$("txtRefNm").getValue());
    $$("hdtxtAmount").setValue($$("txtAmount").getValue());
    $$("txtSvDrCr").setValue($$("OptDrCr").getValue());
    fnShowColumn();
    $$("RptAdvFilter").hide();
    
};
function fnPropertyLoad(CompId) {
    debugger;
    Request = {
        REQTYPE: "GET_FNMULPROPERTY",
        COMPID: CompId,
    }
    Prop_Id = CompId;
    var rowData = [];
    var options = [];

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
                $$("Property").define("options", rowData);
                $$("Property").refresh();
                $$("Property").setValue(Prop_Id);

                $$("gridComp").parse(rowData);
            }
        },
    });
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
    $$("txtParty").setValue("");
    $$("txtDivId").setValue("");
    $$("txtTrnTy").setValue("");
    $$("txtTrnTyNm").setValue("");

    $$("txtBalDet").setValue("0");
    $$("txtMSME").setValue("0");
    $$("txtAddr").setValue("0");
    $$("txtCity").setValue("0");
    $$("txtUnAdj").setValue("0");
    $$("txtAccHold").setValue("0");
    $$("txtIFSC").setValue("0");
    $$("txtAccNo").setValue("0");
    $$("txtCrDays").setValue("0");
    $$("txtCrLmt").setValue("0");
    $$("txtCrVar").setValue("0");
    $$("txtSalePer").setValue("0");
    $$("txtVouchGrp").setValue("0");
    $$("txtPayNote").setValue("0");
    $$("hdtxtAmount").setValue("");
    $$("txtSvDrCr").setValue("0");
    $$("txtFilter").setValue("1");
    $$("txtAdj").setValue("0");
    window.VchTyIds = "";

        
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
function fnPropChange(CompId) {
    debugger;
    $$("txtGroup").setValue("");
    $$("txtParty").setValue("");
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");

    var vSplit = [];
    //if (CompId.indexOf(",") >= 0) {
    if(CompTy =="2"){
        vSplit = CompId.split(",");
        //var newData = vSplit.filter(function (el) {
        //    return el.toString().trim().toUpperCase() == "WS";
        //});
        //if (newData.length > 0) CompId = newData[0].toString().trim();
        //else CompId = vSplit[0].toString().trim();
        CompId = fnGetDefaultComp(CompId);
        $$("gridRpt").showColumn("ixPropNm")
    }
    else {
        $$("gridRpt").hideColumn("ixPropNm")
    }


    if (fnChkSessVal() == false) return;
    fnLondGlInitCont(CompId);
    GridClear();
        
    //fnGroupLoad();
    fnDivisLoad();
    //fnTrnTyLoad(); 
    
    fnShowColumn();
    //LoadDate();
    //fnHeader();
    gridResize();

};

function fnDivisLoad() {
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
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
    //var CompId = $$("Property").getValue();

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
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
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    ReqNm = "";
    ReqNm = "GET_FNUPDTCLICK";

    debugger;
    var Request = {
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        ASONDT: AsOnDt,
        GRPID: GrpIds,
    }
    debugger;
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
    if (fnChkSessVal() == false) return;
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
    //var CompId = $$("Property").getValue();

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    //suggested by Edward;
   // if (CompTy == "2") {
        fnLoadGrid();
        return false;
    //}    
    ////
    //if (AcIds != "")
    //{
        
    //    var ReqNm = "";
    //    ReqNm = "GET_FNCALLUPDDISTAMT";       
       
    //    var Request = {        
    //        REQTYPE: ReqNm,
    //        COMPID: CompId,
    //        GL_COMPID: window.GL_CompanyID,
    //        FISCALYEAR: window.FiscalYear,
    //        ACCID: AcIds,
    //        ASONDT:AsOnDt
    //    }
        
    //    requestData = JSON.stringify(Request);
    //    requestData = encodeURIComponent(requestData);
    //    $.ajax({
    //        async: false,
    //        url: "/GLReports/RPTAPI_CALL",
    //        type: 'POST',
    //        data: "request=" + requestData,
    //        success: function (data) {
    //            debugger;
    //            if (data != "") {
    //                rowData = JSON.parse(data);
    //                if(rowData == "0"){
    //                    webix.message({ type: 'warning', text: 'Error On Update ' });
    //                    webix.UIManager.setFocus($$("txtGroup"));
    //                    bVal="0";
                        
    //                }
    //            }                
    //        },
    //        error: function (request, status, error) {
    //            console.log("Error Failure");  
    //            bVal="0";
    //        }
    //    });
    //    if (bVal == "0") return false;
    //    fnLoadGrid();
    //}
    //else
    //{       
    //    var ReqNm = "";
    //    ReqNm = "GET_FNUPDTPOPUPLOAD";
    //    bVal = "1";
    //    var Request = {
    //        REQTYPE: ReqNm,
    //        COMPID: CompId,
    //        GL_COMPID: window.GL_CompanyID,
    //        FISCALYEAR: window.FiscalYear,
    //        GRPID: GrpIds,           
    //    }

    //    requestData = JSON.stringify(Request);
    //    requestData = encodeURIComponent(requestData);
    //    $.ajax({
    //        async: false,
    //        url: "/GLReports/RPTAPI_CALL",
    //        type: 'POST',
    //        data: "request=" + requestData,
    //        success: function (data) {
    //            debugger;
    //            if (data != "") {
    //                rowData = JSON.parse(data);
    //                $$("txtLstUpdDt").setValue(rowData.RDate);
    //                $$("txtLstUpdTm").setValue(rowData.RTm);

    //                var vUpdDt = formatDateWebix(rowData.RDate);
    //                vUpdDt = vUpdDt.replace(/-/g, '');
    //                vUpdDt = parseFloat(vUpdDt);

    //                var vCurrDt = window.CURRDT;
    //                vCurrDt = vCurrDt.replace(/-/g, '');
    //                vCurrDt = parseFloat(vCurrDt);
    //                if(vUpdDt >= vCurrDt)
    //                {
    //                    bVal = "0";
    //                    $$("RptUpdateBill").show();
    //                    $("#LoadDIv").hide();

    //                }

    //            }
    //            else {
    //                bVal = "0";
    //            }
    //        },
    //        error: function (request, status, error) {
    //            console.log("Error Failure");
    //            bVal = "0";
    //        }
    //    });

    //    if (bVal == "0") return false;

    //    $$("RptUpdateBill").show();
    //    btnUpdateClick();
      
    
        
    //}
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
    var chkbal = "";
    var ChkVouchGrp = "";
    var SrchAmt = "";
    var vPayNote = window.X6_IND;

    var Srchdrcr = $$("txtSvDrCr").getValue();
    var SrchAmt = $$("hdtxtAmount").getValue();

    var RefNm = "";
    var vTrnTyId = $$("txtTrnTy").getValue();

    ChkDRCR = $$("txtDRCR").getValue();        
    chkVouDt = $$("txtVouDt").getValue();
        
    var DivId = $$("txtDivId").getValue();
    var FromDt = $$("AsOnDt").getText();          
    var chkDr = $$("txtDr").getValue();
    var chkCr = $$("txtCr").getValue();    
    if (DivId == "<-ALL->") DivId = "";
    //CompId = $$("Property").getValue();
    var chkDueDt = $$("txtDueDt").getValue();

    var chkFilter = $$("txtFilter").getValue();
    var chkAdj = $$("txtAdj").getValue();
    var bMulti = "0";
    //CompId = $$("Property").getValue();

    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2"){        
    //if (CompId.indexOf(",") >= 0) {
        bMulti = "1";
    }


    if (chkDr == "1" && chkCr == "1") DRCRTrn = "3";
    else if (chkDr == "1") DRCRTrn = "1" ;
    else if (chkCr == "1") DRCRTrn = "2";

    if ($$("txtBalDet").getValue() == "1") chkbal = "1";
    else chkbal = "0";

    if ($$("txtVouchGrp").getValue() == "1") ChkVouchGrp = "1";
    else ChkVouchGrp = "0";

    var vGrpIds1 = GrpIds.replace("'", "");
    vGrpIds1 = vGrpIds1.replace("'", "");
    
    if (chkDueDt  == "1") bDueDt="1";
    var ReqNm = "";
    if (AcIds == "" && (vGrpIds1 == "000100010004" || vGrpIds1 == "000200040003")) ReqNm = "GET_FNGLLOADOUTSTANDSUMMCONTAC";
    else ReqNm = "GET_FNGLLOADOUTSTANDSUMM"
       
    
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
        Forgrp:"1",
        DRCRTrn:DRCRTrn,        
        bDueDt: bDueDt,
        chkDueDt: chkDueDt,
        ChkDRCR: ChkDRCR,        
        vPayNote: vPayNote,
        chkVouDt: chkVouDt,
        vTrnTyId: vTrnTyId,               
        chkbal: chkbal ,
        ChkVouchGrp: ChkVouchGrp,
        SrchAmt: SrchAmt,
        Srchdrcr: Srchdrcr,
        chkFilter: chkFilter,
        chkAdj: chkAdj,
        bMulti: bMulti

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

    if ($$("txtBalDet").getValue() == "1") {
        $$("gridRpt").showColumn("ixCrAmt");
        $$("gridRpt").showColumn("ixDrAmt");
    }
    else {
        $$("gridRpt").hideColumn("ixCrAmt");
        $$("gridRpt").hideColumn("ixDrAmt");
    }

    if ($$("txtMSME").getValue() == "1") $$("gridRpt").showColumn("ixMSMENo");
    else $$("gridRpt").hideColumn("ixMSMENo");

    if ($$("txtAddr").getValue() == "1") $$("gridRpt").showColumn("ixAddress");
    else $$("gridRpt").hideColumn("ixAddress");

    if ($$("txtCity").getValue() == "1") $$("gridRpt").showColumn("ixCity");
    else $$("gridRpt").hideColumn("ixCity");

    if ($$("txtAccHold").getValue() == "1") $$("gridRpt").showColumn("ixAcHold");
    else  $$("gridRpt").hideColumn("ixAcHold");

    if ($$("txtIFSC").getValue() == "1") $$("gridRpt").showColumn("ixifsc");
    else  $$("gridRpt").hideColumn("ixifsc");

    if ($$("txtAccNo").getValue() == "1") $$("gridRpt").showColumn("ixAcnno");
    else  $$("gridRpt").hideColumn("ixAcnno");

    if ($$("txtCrDays").getValue() == "1") $$("gridRpt").showColumn("ixCreDays");
    else  $$("gridRpt").hideColumn("ixCreDays");

    if ($$("txtCrLmt").getValue() == "1") $$("gridRpt").showColumn("ixCreAmt");
    else  $$("gridRpt").hideColumn("ixCreAmt");

    if ($$("txtCrVar").getValue() == "1") $$("gridRpt").showColumn("ixCreVar");
    else $$("gridRpt").hideColumn("ixCreVar");

    if ($$("txtSalePer").getValue() == "1") $$("gridRpt").showColumn("ixSalPer");
    else $$("gridRpt").hideColumn("ixSalPer");

    if ($$("txtPayNote").getValue() == "1") $$("gridRpt").showColumn("ixNarration");
    else $$("gridRpt").hideColumn("ixNarration");

    if ($$("txtVouchGrp").getValue() == "1") $$("gridRpt").showColumn("ixTrnTy");
    else $$("gridRpt").hideColumn("ixTrnTy");

    if ($$("txtrefdt").getValue() == "1") $$("gridRpt").showColumn("ixCur");
    else if ($$("txtDueDt").getValue() == "1") $$("gridRpt").showColumn("ixCur");
    else $$("gridRpt").hideColumn("ixCur");
            

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

function btnVchTySrchClick() {
    if (fnChkSessVal() == false) return;
    $$("dtVoucherPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    fnGlVchTy();
    var ids = window.VchTyIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtVoucherPop").data.each(function (obj) {
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

        $$("dtVoucherPop").updateItem(obj.id, obj)


    })
    $$("dtVoucherPop").refresh();

    $$("VouchTyPopup").show();
    $$("dtVoucherPop").select($$("dtVoucherPop").getFirstId());
    webix.UIManager.setFocus($$("dtVoucherPop"));
    $$("dtVoucherPop").moveSelection("top");

};
function fnGlVchTy() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    //var CompId = $$("Property").getValue();
    var CompId = fnRetComboVal($$("Property"), "ORGID");
    var CompTy = fnRetComboVal($$("Property"), "TYPE");
    if (CompTy == "2") CompId = fnGetDefaultComp(CompId);
    Request = {
        REQTYPE: "GET_FNGLTRNTY",
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
               


            }
        },
    });

    //return rowData;
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
                            $$("txtVchTy").setValue("");
                            $$("dtVoucherPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK == "1") {
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
};
function fnchkapClick() {
    debugger;

    if ($$("chkAP").getValue() == "0") {
        if (Y6_IND == "1") {
            if ($$("chkAR").getValue() == "0" && $$("chkAL").getValue() == "0") $$("chkAP").setValue("1");
        }
        else {
            if ($$("chkAR").getValue() == "0") $$("chkAR").setValue("1");
        }
    }
};
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
};
function fnchkDueDtClick() {
    debugger;
    if ($$("chkDueDt").getValue() == "1") {
        $$("chkVouDt").setValue("0");
        $$("chkrefdt").setValue("0");
    }

    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkVouDt").setValue("1");


};
function fnchkVouDtClick() {
    if ($$("chkVouDt").getValue() == "1") {
        $$("chkDueDt").setValue("0");
        $$("chkrefdt").setValue("0");
    }

    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkVouDt").setValue("1");


};
function fnchkrefdtClick() {
    if ($$("chkrefdt").getValue() == "1") {
        $$("chkDueDt").setValue("0");
        $$("chkVouDt").setValue("0");
    }
    if ($$("chkDueDt").getValue() == "0" && $$("chkrefdt").getValue() == "0" && $$("chkVouDt").getValue == "0") $$("chkrefdt").setValue("1");
};

function fnChkBillDetClick() {

    if ($$("chkBillDet").getValue() == "1") $$("chkVchDet").setValue("0");

};
function GridClear() {
    $$("gridRpt").clearAll();
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



//function fnchkdispdtClick()
//{
//    debugger;
    
//    if ($$("chkdispdt").getValue() == "1") 
//    {
//        $$("chkdispdys").setValue("0");                
        
//    }    
//    if ($$("chkdispdt").getValue() == "0") $$("chkdispdt").setValue("0");
    
    
//}
//function fnchkdispdysClick() {
//    debugger;
//    if ($$("chkdispdys").getValue() == "1") {
//        $$("chkdispdt").setValue("0");        
//    }
//    if ($$("chkdispdys").getValue() == "0") $$("chkdispdt").setValue("1");


//}



webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    //if (choice == "1") {
        var offset = $("#divGrid").offset();


        //$$("divGrid").define("height", ((vheight - offset.top - 10)));
        //$$("divGrid").adjust();

        $$("gridRpt").define("height", ((vheight - offset.top - 30)));
        $$("gridRpt").adjust();
    //}





}








