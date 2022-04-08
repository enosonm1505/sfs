
var SplitSelectedColumn = "";
var SelectedDiscColumn = "";
var sCardNo = "";
var ClearControlAll = function () {
    window.K_TAX = "";
    window.SHOWTGL = "0";
    window.InGstInd = "";
    window.TX_ST_CD = "";
    window.J3_IND = "";
    window.U1_IND = "";
    window.V1_IND = "";
    window.M_TAX = "";
    window.BASE_CURRENCY = "";
    window.CURR_DT = "";
    window.IN_GST_SUP_IND = "";
    window.SezTaxStructId = "";
    window.ExemptTaxStrId = "";
    window.Alt_Tax_Appl_ind = "";
    window.B2B_Tax_Appl_ind = "";
    window.TX_LEN = "";
    window.TAX_CAPTION = "";
    window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = "";
    window.CURRENCY_DECIMLIMIT = "";
    window.GrossDiscAppl = "";
    window.oprIntrfAppl = "";
    window.Z2_Ind = "";
    window.BFornCurappl = "";
    window.BN_E_Ind = "";
    window.BN_V_D_Ind = "";
    window.BN_VAT_ID1 = "";
    window.BN_VAT_ID2 = "";
    window.voutletid = "";
    window.TaxInclusiveAppl = "";
    window.PS_G_IND = "";
    window.PS_H_IND = "";
    window.PS_L2_IND = "";
    window.SCAppl = "";
    window.SCEx = "";
    window.vCopy = "";
    window.ConvRt = "";
    window.MUL_OUT_KOT = "";
    window.ResNo = "";
    window.ResBlkId = "";
    window.TX_SPL_IND = "";
    window.gstPrfId = "";
    window.GstId = "";
    window.GstNm = "";
    window.GstTyId = "";
    window.FnId = "";
    window.MktId = "";
    window.SchrgEx = "";
    window.Disc_Clear_Mode_Set = "0";
    window.AccDt103 = "";
    window.NAccDate103 = "";
    window.Kot_No_String = "";
    $("#CHKCURR").val("0");
    $("#BILLCURRID").val("");
    $$("gridMain").clearAll();
    $$("gridDisc").clearAll();
    $$("gridAddChr").clearAll();
    $$("gridKot").clearAll();
    $$("gridBill").clearAll();
    $$("gridSTax").clearAll();
    $$("gridAddress").clearAll();
    $$("gridCardTp").clearAll();
    $$("gridResSrch").clearAll();
    $$("gridVenSrch").clearAll();
    $$("txtResNo").setValue("");
    $$("txtType").setValue("");
    $$("txtGstType").setValue("");
    $$("txtGstNm").setValue("");
    $$("txtCurr").setValue("");
    $$("txtBillDt").setValue("");
    $$("txtBillNo").setValue("");
    $$("ChkCard").setValue(0);
    $$("ddlCardType").setValue("");
    $$("txtCardNo").setValue("");
    $$("txtMemb").setValue("");
    $$("txtCov").setValue("");
    $$("txtGstInNo").setValue("");
    $$("lblnar").setValue("");
    $$("ChkSerExmpt").setValue(0);
    $$("ChkTaxNotAppl").setValue(0);
    $$("ChkZeroTax").setValue(0);
    $$("txtTaxExmptRes").setValue("");
    $$("txtReason").setValue("");
    $$("txtBillInstr").setValue("");
    $$("txtBillInstr").hide();
   
    
}
var LoadInds = function (CompId) {
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQ_NM"] = "FNGETLOADCONT";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);
            var taxCap = "";

            window.BILL_PROG_NM

            window.K_TAX = Detemp.RA[0].K_TAX;//K_TAX
            window.InGstInd = Detemp.RA[0].IN_GST_IND;//IN_GST_IND            
            window.TX_ST_CD = Detemp.RA[0].TX_ST_CD.toString().trim();//CompStcd                        
            window.J3_IND = Detemp.RA3[0].J3_IND;//vPrintDef
            window.U1_IND = Detemp.RA3[0].U1_IND;//Dep_Appl            
            window.V1_IND = Detemp.RA3[0].V1_IND; //FoGstResAppl
            window.A_IND = Detemp.RA3[0].A_IND;
            window.B_IND = Detemp.RA3[0].B_IND;
            window.C_IND = Detemp.RA3[0].C_IND; 
            window.M_TAX = Detemp.RA[0].M_TAX;//GstAppl   
            window.BASE_CURRENCY = Detemp.RA[0].BASE_CURRENCY_ID.toString().trim();
            window.CURR_DT = Detemp.RA[0].CURDT1;
            window.IN_GST_SUP_IND = Detemp.RA[0].IN_GST_SUP_IND
            window.SezTaxStructId = Detemp.RA[0].BNQ_SEZ_TAX.toString().trim();
            window.ExemptTaxStrId = Detemp.RA[0].BNQ_EXEMP_TAX.toString().trim();
            window.Alt_Tax_Appl_ind = Detemp.RA[0].SEZ_RT_APPL;
            window.B2B_Tax_Appl_ind = Detemp.RA[0].B2B_RT_APPL;
            window.TX_LEN = Detemp.RA[0].TX_LEN;
            taxCap = Detemp.RA[0].A5_ID.toString().trim();
            if (taxCap != "") window.TAX_CAPTION = taxCap;
            else window.TAX_CAPTION = "VAT";
            window.CURRENCY_FORMAT = Detemp.RA[0].CURRENCY_FORMAT;
            window.CURRENCY_DELIMIT = Detemp.RA[0].CURRENCY_DELIMIT;
            window.CURRENCY_DECIMLIMIT = Detemp.RA[0].VAL_DECIM_LIMIT;

            window.GrossDiscAppl = Detemp.RA3[0].K4_IND;
            window.oprIntrfAppl = Detemp.RA3[0].O3_IND;
            window.Z2_Ind = Detemp.RA3[0].I_IND;
            window.BFornCurappl = Detemp.RA3[0].P_IND;
            window.BN_E_Ind = Detemp.RA3[0].E_IND;
            window.BN_V_D_Ind = Detemp.RA3[0].V_D_IND;
            window.BN_VAT_ID1 = Detemp.RA3[0].V_ID1.toString().trim();;
            window.BN_VAT_ID2 = Detemp.RA3[0].V_ID2.toString().trim();;
            window.voutletid = Detemp.RA3[0].BN_OUTLET_ID.toString().trim();
            window.TaxInclusiveAppl = Detemp.RA3[0].I3_IND;            
            window.PS_G_IND = Detemp.RA3[0].G_IND;
            window.PS_H_IND = Detemp.RA3[0].H_IND;
            window.PS_L2_IND = Detemp.RA3[0].L2_IND;
            window.SCAppl = Detemp.RA3[0].R1_IND;
            window.SCEx = Detemp.RA3[0].S1_IND;
            window.vCopy = Detemp.RA3[0].X1_IND;
            window.MUL_OUT_KOT = Detemp.RA3[0].O4_IND;
            window.BILL_PROG_NM = Detemp.RA3[0].BILL_PROG_NM;

            
            

            //var AccDate = Detemp.RA2[0].CUR_DT;
            //window.AccDt=AccDate;
            //var AccDatePic = $("#dateAccount").data("kendoDatePicker");
            //AccDatePic.value(AccDate);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
var AccDtLoad = function (CompId) {
    debugger;
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
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
var PageLoad = function () {
    debugger;
    GridDesign();
    

    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divResNo",
        position: "flex",
        id: "Layout1",
        cols: [
            {
                view: "search", labelWidth: 100, id: "txtResNo", label: "Reservation No", readonly: true, icon: "wxi-search",
                on: {
                    onSearchIconClick: function () {
                        debugger;
                        fnOpenResPop();
                    }
                }
            },

            { view: "button", width: 30, type: "icon", id: "btnNarr", tooltip: "Narration", css: "MybtnIcon", borderless: true, icon: "wxi-columns", click: function () { fnbtnNarrClick(); } },
        ],

    });
    webix.ui({ container: "divType", view: "text", id: "txtType", readonly: true });
    webix.ui({ container: "divGstType", view: "text", id: "txtGstType", labelWidth: 100, label: "Guest", readonly: true });
    webix.ui({ container: "divGst", view: "text", id: "txtGstNm", readonly: true });
    webix.ui({ container: "divCurr", view: "text", labelWidth: 100, id: "txtCurr", label: "Currency", readonly: true });
    webix.ui({
        container: "divBillDt",
        position: "flex",
        id: "Layout2",
        cols: [
            {
                view: "search", label: "Bill Date", labelWidth: 100, name: "BillDt", id: "txtBillDt", icon: "wxi-angle-up", readonly: true,
                on: {
                    onSearchIconClick: function () {
                        debugger;
                        if (window.SHOWTGL == "0") return false;
                        //this.setValue("");
                        if (this.config.icon == "wxi-angle-down") {
                            this.define("icon", "wxi-angle-up");
                            this.setValue(window.AccDt103);                            
                        }
                        else if (this.config.icon == "wxi-angle-up") {
                            this.define("icon", "wxi-angle-down");
                            this.setValue(window.NAccDate103);
                        }

                        this.refresh();
                        this.focus();

                        fnClearCont();

                    }
                }
            },

        ]

    });
    webix.ui({ container: "divBillNo", view: "text", labelWidth: 100, label: "Bill No", id: "txtBillNo", readonly: true });
    webix.ui({ container: "divCardChk", view: "checkbox", id: "ChkCard", labelWidth: 100, label: "Card Applicable", customCheckbox: false, click: function () { fnChkCardClick(); } });
    webix.ui({ container: "divCardType", view: "richselect", hidden: true, id: "ddlCardType", on: { onChange: function () { fnCardTypeChange() } } });
    webix.ui({
        container: "divCardNo", view: "text", labelWidth: 100, hidden: true, label: "Card No", id: "txtCardNo", attributes: { maxlength: 16 },
        on: {
            onKeyPress: function (code, e) {
                return fnCardKeyDown(code, e);
            },
            onBlur: function () {
                fnCardNoLostFocus();
                sCardNo = "";
            },
            onFocus: function () {
                sCardNo = "";
            },
            
        }
    });
    webix.ui({ container: "divMemb", view: "text", labelWidth: 100, hidden: true, id: "txtMemb", readonly: true, label: "Member Name", attributes: { maxlength: 40 }, on: { onKeyPress: function (code, e) { return fnNotAllowedSingleQuote(code, e); } } });
    webix.ui({ container: "divCovers", view: "text", labelWidth: 100, id: "txtCov", label: "Covers", readonly: true, hidden: true, });
    webix.ui({ container: "divGstIn", view: "text", labelWidth: 100, id: "txtGstInNo", label: "GSTIN No", attributes: { maxlength: 15 }, on: { onKeyPress: function (code, e) {return fnNotAllowedSingleQuote(code, e);} } });
    webix.ui({ container: "divDiscHd", view: "label", id: "lblDisc", label: "Discount", css: "Mylabel"});
    //webix.ui({ align: "right", container: "divbtnDisc", view: "button", width: 80, id: "btnDisc", borderless: true, value: "Apply", click: function () { fnbtnDiscApplyClick(); }});
    webix.ui({ container: "divresn", view: "text", labelWidth: 80, id: "txtReason", label: "Reason", hidden:true });
    webix.ui({ container: "divSerExmpt", view: "checkbox", id: "ChkSerExmpt", labelWidth: 150, label: "Service Charge Exempted", customCheckbox: false, click: function () { fnChkChkSerExmptClick(); } });
    webix.ui({ container: "divNoTax", view: "checkbox", id: "ChkTaxNotAppl", labelWidth: 150, label: "Tax not to be considered", customCheckbox: false, click: function () { fnChkTaxNaAplClick();} });
    webix.ui({ container: "divZeroTax", view: "checkbox", id: "ChkZeroTax", labelWidth: 130, label: "Zero Tax Applicable", customCheckbox: false, click: function () { fnChkZeroTaxAplClick(); } });
    webix.ui({ container: "divExmptRes", view: "text", labelWidth: 100, label: "Bill No", id: "txtTaxExmptRes", hidden: true, });
    webix.ui({ container: "divlblNar", view: "text", labelWidth: 100, label: "Narration", id: "lblnar", hidden: true, });
    webix.ui({ container: "divBillIns", view: "text", id: "txtBillInstr", labelWidth: 100, label: "Bill Inst", readonly: true, });

};
var GridDesign = function () {
    var searchicon = "<span class='fa fa-search ' ></span>";
    //var searchicon1 = "<span class='fa fa-trash ' ></span>";

    webix.ui({
        id: "gridMain",
        container: "divGrid",
        select: 'row',
        view: "datatable",        
        rowLineHeight: 23,
        autoConfig: true,
        editable: true,
        editaction:"dblclick",
        height: 150,
        position: "flex",
        //scroll: "auto",
        css: "webix_header_border",
        data: [],
        columns: [               

                { id: "ixV_FnDt", header: { text: " Function Dt", }, width: 90, css: { 'text-align': 'center ! important', } },
                { id: "ixV_VenueNm", header: 'Venue', width: 150, fillspace: true },
                { id: "ixV_SessNm", header: 'Session', width: 150, },
                //{ id: "ixV_But", header: "<div title='Row Delete' id='divbtnDel' ><i class='fa fa-trash' style='font-size:17px ! important'></i></div>", width: 30, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                { id: "ixV_But",  width: 30,header:"", template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                { id: "ixV_VenueId", header: 'VenueId', hidden: true, },
                { id: "ixV_SessId", header: 'SessionId', hidden: true, },
        ],
        data: [],

        on: {
            'onItemClick': function (id) {
                debugger;
                if (id.column == "ixV_But") {
                    fnVenBtnClick(id);
                }
            },

            onHeaderClick: function (header, event, target) {
                //debugger;
                //if (header.column == "ixV_But") {
                //    fnCallDelRow();
                //    var ResNo = window.ResNo;
                //    var ResBlkId = window.ResBlkId;
                //    var CompId = $$("Property").getValue();
                //    if (ResNo != "") {                                         
                //        fnLoadBillDet(CompId, ResNo, ResBlkId);
                //    }
                //}
                
            },            

            "onKeyPress": function (code, e) {
                debugger;
                var selRow = this.getSelectedItem();
                var LastRowId = this.getLastId();
                var rowid = selRow.id;                
                var charCode = e.which || e.keyCode;
                if (e.shiftKey == true) return false;
                if (e.ctrlKey == true) return false;

                data = $$("gridMain").serialize();
                if (data.length > 0) {
                    var newData = data.filter(function (el) {
                        return el.ixV_VenueNm == "";
                    });
                    if (newData.length > 0) {
                        return false;
                    }
                }                

                if (charCode == 40 && rowid == LastRowId) {
                    fnAddRow();
                }
                          

            },

            onBlur: function (prev_view) {
                this.editStop()
                this.refresh();
            },

            onBeforeClose: function () {
                return false;
            },

        }
    });

    

    webix.ui({
        id: "gridDisc",
        container: "divDisc",
        select: 'row',
        view: "datatable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        editable: true,        
        height: 150,
        position: "flex",
        //scroll: "auto",
        css: "webix_header_border",
        data: [],
        columns: [

                { id: "ixD_GrNm", header: { text: " Group", }, width: 90, css: { 'text-align': 'left ! important', }, fillspace: true },
                { id: "ixD_Disc", header: '%', width: 60, css: { 'text-align': 'right ! important;', }, editor: "text", liveEdit: true,  },
                {
                    id: "ixD_Amt", header: 'Disc Amt', width: 100, css: { 'text-align': 'right ! important;', }, editor: "text", liveEdit: true,
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                { id: "ixD_Mode", header: "Mode", hidden: true, },
                { id: "ixD_GrId", header: 'GrId', hidden: true, },
                { id: "ixD_Max", header: 'DMax', hidden: true, },
                { id: "ixD_Dper", header: 'DiscPer', hidden: true, },
        ],
        data: [],

        on: {            
            onLiveEdit: function (state, editor) {
                debugger;
                var columnId = editor.column;
                var Row = editor.row;
                var SelRow = this.getItem(Row);
                var DiscAmt = SelRow.ixD_Amt;
                var DiscPer = SelRow.ixD_Disc;
                if (columnId == "ixD_Amt") {
                    var value = state.value;
                    SelRow.ixD_Disc = "0";
                    var vvar =SelRow.ixD_Amt;
                    var vVar1 =SelRow.ixD_Max;                    
                    vvar = parseFloat(vvar);
                    vVar1 = parseFloat(vVar1);
                    if (value < 0) value = (value * -1);
                    //this.updateItem(Row, SelRow);
                    if (vvar > vVar1) {
                        SelRow.ixD_Amt = vVar1;
                        editor.setValue(vVar1);
                        this.editCancel();
                        //editor.focus();
                        this.editCell(Row, "ixD_Amt", true, true)
                        editor = this.getEditor();
                        editor.getInputNode().selectionStart = state.old.length;
                    }
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);

                }
                if (columnId == "ixD_Disc") {
                    var value = state.value;
                    SelRow.ixD_Amt = "0";
                    SelRow.ixD_Mode = "0";
                    SelRow.ixD_Dper = "0";
                    value = parseFloat(state.value);
                    if (value < 0) value = (value * -1);
                    if (value > 99.99) {
                        SelRow.ixD_Disc = state.old;
                        editor.setValue(state.old);
                        this.editCancel();
                        //editor.focus();
                        this.editCell(Row, "ixD_Disc", true, true)
                        editor = this.getEditor();
                        editor.getInputNode().selectionStart = state.old.length;

                    }
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);
                }
            },
            onAfterEditStart: function (id) {
                var getColumn = id.column;
                SelectedDiscColumn = getColumn;
                if (getColumn == "ixD_Disc") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 6);
                    this.getEditor().getInputNode().style.textAlign = "right";
                }
                else if (getColumn == "ixD_Amt") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 14);
                    this.getEditor().getInputNode().style.textAlign = "right";
                }

            },
            onAfterEditStop: function (id, editor) {
                debugger;
                var getColumn = editor.column;
                var value = id.value;
                var Row = editor.row;
                var SelRow = this.getItem(Row);
                
                if (getColumn == "ixD_Disc") {
                    if (value == "") SelRow.ixD_Disc = "0";
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);
                }
                else if (getColumn == "ixD_Amt") {
                    if (value == "") SelRow.ixD_Amt = "0";
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);
                }

            },

            'onCheck': function (row, col, state) {
                debugger;                
            },
            "onKeyPress": function (code, e) {
                debugger;
                var selRow = this.getSelectedItem();
                var rowid = selRow.id;
                //var columnId = this.getSelectedId(false).column;
                var charCode = e.which || e.keyCode;
                if (SelectedDiscColumn == "ixD_Disc" || SelectedDiscColumn == "ixD_Amt") {
                    if (e.ctrlKey == true || e.metaKey == true || e.altKey == true || e.shiftKey == true) {
                        return false;
                    }
                    if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                        return true
                    }
                    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                        return false;
                    }
                    else {

                        return true;
                    }
                }

            },
            onBlur: function (prev_view) {
                this.editStop();
                this.refresh();
            },            
        }
    });

    webix.ui({
        
            id: "gridAddChr",
            container: "divAddChr",
            select: 'row',
            view: "datatable",
            fixedRowHeight: false,
            rowLineHeight: 23,
            autoConfig: true,
            editable: true,            
            height: 180,            
            position: "flex",
            //scroll: "auto",
            css: "webix_header_border",
            data: [],
            columns: [

                    { id: "ixATaxNm", header: { text: "Additional Charges", }, width: 90, css: { 'text-align': 'left ! important', }, fillspace: true },
                    { id: "ixATaxSel", header: '', editor: "Checkbox", width: 40, template: "{common.checkbox()}", css: { 'text-align': 'center ! important' }, },
                    { id: "ixATaxId", header: 'Tax Id', hidden: true, },
                    { id: "ixATaxPer", header: "TaxPer", hidden: true, },
                    { id: "ixATaxInd", header: 'TaxInd', hidden: true, },
                    { id: "ixAMinAmt", header: 'MinAmt', hidden: true, },
                    { id: "ixATaxAplInd", header: 'ApplInd', hidden: true, },
                    { id: "ixAEffDt", header: 'Eff Dt', hidden: true, },
                    { id: "chr_opt", header: 'chr_opt', hidden: true, },
            ],
            data: [],

            on: {                
                onBeforeClose: function () {
                    return false;
                },
                'onCheck': function (row, col, state) {
                    debugger;
                    if (col == "ixATaxSel") {
                        fnChkAddChrgClick();
                    }
                }
            }
            
    });
    webix.ui({
        id: "gridKot",
        container: "divKot",
        select: 'row',
        view: "datatable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        editable: true,
        height: 200,
        position: "flex",
        //scroll: "auto",
        css: "webix_header_border",
        data: [],
        columns: [

                { id: "ixK_KotCat", header: { text: "Type", }, width: 90, fillspace: true },
                { id: "ixK_DummyKOT", header: 'KOT No', width: 60 },
                { id: "ixK_Covers", header: 'Covers', width: 60 },
                { id: "ixK_OrigKOT", header: "kOTnO", hidden: true, },
        ],
        data: [],

        on: {            
            'onItemDblClick': function (id) {
                debugger;                                   
                var selRow = $$("gridKot").getItem(id);
                var kotNo = selRow.ixK_OrigKOT;
                var kotDispNo = selRow.ixK_DummyKOT;
                var kotCat = selRow.ixK_KotCat;
                var vCmpId = $$("Property").getValue();
                KotPrvwPopLoadData(vCmpId, kotNo, kotCat, kotDispNo);
            },            
            onBeforeClose: function () {
                return false;
            },
        }
    });

    webix.ui({
        id: "gridBill",
        container: "divBill",
        select: 'row',
        view: "datatable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        editable: true,
        footer: true,
        resizeColumn: true,
        resizeRow: true,
        height: 200,
        //position: "flex",
        //scroll: "auto",
        css: "webix_header_border",
        data: [],
        columns: [

                { id: "ixB_BillNo", header: "SNo", width: 40, },
                { id: "ixB_Covers", header: 'Covers', width: 70, footer: { content: 'summColumn' }, css: { 'text-align': 'right ! important;', }, editor: "text", liveEdit: true, },
                {id: "ixB_BillValue", header: 'Bill Value', width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_Disc", header: "Discount", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_Taxes", header: "Taxes", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_RoundOff", header: "RndOff", width: 60, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_NetValue", header: "Net Value", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_RefPaidout", header: "PaidOut", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_adv", header: [{ text: "Less Adv/Refund", css: "multiline" }], width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_GL", header: "Gain/Loss", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_Payable",header: [{ text: "Amt Payable", css: "multiline" }], width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_FornRnd", header: "F.RndOff", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                {id: "ixB_FornAmt", header: "F.NetAmt", width: 80, css: { 'text-align': 'right ! important' }, footer: { content: 'summColumn' },
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                },
                { id: "ixB_BillNm", header: "", width: 30, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                { id: "ixB_Nm", header: "BillNm", hidden: true },
                { id: "ixB_Add1", header: "Add3", hidden: true },
                { id: "ixB_Add2", header: "Add2", hidden: true },
                { id: "ixB_Add3", header: "Add3", hidden: true },
                { id: "ixB_City", header: "City", hidden: true },
                { id: "ixB_Pin", header: "Pin", hidden: true },
                { id: "ixB_Cnt", header: "Cnt", hidden: true },
        ],
        data: [],

        on: {
            'onItemClick': function (id) {
                if (id.column == "ixB_BillNm") {
                    debugger;
                    fnLoadBillNmPop(id);
                }
            },
            onLiveEdit: function (state, editor) {
            },
            onAfterEditStart: function (id) {
                //debugger
                var getColumn = id.column;
                if (getColumn == "ixB_Covers") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 3);
                    this.getEditor().getInputNode().style.textAlign = "right";
                }                
            },

            "onKeyPress": function (code, e) {
                debugger;
                var selRow = this.getSelectedItem();
                var rowid = selRow.id;
                var columnId = this.getSelectedId(false).column;                
                var charCode = e.which || e.keyCode;
                if (e.shiftKey == true) return false;
                if (e.ctrlKey == true) return false;
                if (charCode == 46 || charCode == 189 || charCode == 37 || charCode == 39) {
                    return true
                }
                if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                    return false;
                }
                else {               

                    return true;


                }                

            },
            onBlur: function (prev_view) {
                debugger;
                this.editStop();
                this.refresh();
            },
            onBeforeClose: function () {
                return false;
            },
        }
    });


    webix.ui({
        id: "gridSTax",
        container: "divSTax",        
        view: "datatable",
        fixedRowHeight: false,        
        data: [],
        hidden:true,
        columns: [
                { id: "TAX_ID", header: "TAXID",  },                
        ],
        data: [],
        
    });

    webix.ui({
        id: "gridCRec",        
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "KOT_NO", header: "TAXID", },
                { id: "SR_NO", header: "TAXID", },
                { id: "SPLIT_SNO", header: "TAXID", },                
        ],
        data: [],
    });
    

    webix.ui({
        id: "gridCurr",
        container: "divCurr",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "CURRID", },
                { id: "value", header: "CURRNM", },
                { id: "SHRT_NM", header: "SHRT_NM", },
                { id: "SALE_CONV_RATE", header: "SALE_CONV_RATE", },
        ],
        data: [],

    });

    webix.ui({
        id: "gridAddress",
        container: "divAddress",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "Sno", header: "Sno", },
                { id: "Name", header: "Name", },
                { id: "Add1", header: "Add1", },
                { id: "Add2", header: "Add2", },
                { id: "Add3", header: "Add3", },
                { id: "City", header: "City", },
                { id: "CityId", header: "CityId", },
                { id: "PinCd", header: "PinCd", },
                { id: "Country", header: "Country", },
                { id: "CountryId", header: "CountryId", },
        ],
        data: [],

    });

    webix.ui({
        id: "gridCardTp",
        container: "divCardTp",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "L_TY", },
                { id: "value", header: "L_NM", },
                { id: "A_IND", header: "A_IND", },
                { id: "C_NO_S1", header: "C_NO_S1", },
                { id: "C_NO_L1", header: "C_NO_L1", },
                { id: "C_NO_S2", header: "C_NO_S2", },
                { id: "C_NO_L2", header: "C_NO_L2", },
                { id: "C_IND", header: "C_IND", },
                { id: "V_IND", header: "V_IND", },
        ],
        data: [],

    });
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
var fnGetSurCharge = function (CompId) {
    debugger;    
    Request = {
        REQ_NM: "FNGETSURCHARGE",
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
        height: 300,
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

                            { id: "ixResBlockNm", header: 'Block Name', hidden: true },
                            { id: "ixNo", header: 'No', width: 70, css: { 'text-align': 'center ! important' }, },
                            { id: "ixGuestId", header: 'GuestId', hidden: true },
                            { id: "ixGuestTypeNm", header: 'Type', width: 80, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGuestNm", header: 'Guest Name', width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                            { id: "ixVenueNm", header: 'Venue', width: 180, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGuestType", header: 'GuestTypeId', hidden: true },
                            { id: "ixResBlkId", header: 'BlkId', hidden: true },
                            { id: "ixFunctionId", header: 'FunctionId', hidden: true },
                            { id: "ixMarketId", header: 'MarketId', hidden: true },
                            { id: "ixGstProfId", header: 'GstProfId', hidden: true },
                            { id: "ixNar", header: 'Narration', hidden: true },

                    ],
                    data: [],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var ResNo = selRow.ixNo;
                            var GstId = selRow.ixGuestId;
                            var GstNm = selRow.ixGuestNm;
                            var GstTypeNm = selRow.ixGuestTypeNm;
                            var GstTyId = selRow.ixGuestType;
                            var ResBlkId = selRow.ixResBlkId;
                            var FnId = selRow.ixFunctionId;
                            var MktId = selRow.ixMarketId;
                            var gstPrfId = selRow.ixGstProfId;
                            var ResBlkNm = selRow.ixResBlockNm;
                            var ResNarr = selRow.ixNar;
                            var vCmpId = $$("Property").getValue();
                            $$("ResSrchPop").getTopParentView().hide();
                            fnLoadResData(vCmpId, ResNo, GstId, GstNm, GstTypeNm, GstTyId, ResBlkId, ResBlkNm, FnId, MktId, gstPrfId, ResNarr);                            
                            
                        },

                        'onItemDblClick': function (id) {
                            debugger;                                   
                            var selRow = $$("gridResSrch").getItem(id);
                            var ResNo = selRow.ixNo;
                            var GstId = selRow.ixGuestId;
                            var GstNm = selRow.ixGuestNm;
                            var GstTypeNm = selRow.ixGuestTypeNm;
                            var GstTyId = selRow.ixGuestType;                            
                            var ResBlkId = selRow.ixResBlkId;
                            var FnId = selRow.ixFunctionId;
                            var MktId = selRow.ixMarketId;
                            var gstPrfId = selRow.ixGstProfId;
                            var ResBlkNm = selRow.ixResBlockNm;
                            var ResNarr = selRow.ixNar;
                            var vCmpId = $$("Property").getValue();                           

                            fnLoadResData(vCmpId, ResNo, GstId, GstNm, GstTypeNm, GstTyId, ResBlkId, ResBlkNm, FnId, MktId, gstPrfId, ResNarr);
                            //$$("ResSrchPop").hide();
                            $$("ResSrchPop").getTopParentView().hide();

                        },

                    },

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
                                    if ($$("gridResSrch").count()) {
                                        var selRow = $$("gridResSrch").getSelectedItem();
                                        var ResNo = selRow.ixNo;
                                        var GstId = selRow.ixGuestId;
                                        var GstNm = selRow.ixGuestNm;
                                        var GstTypeNm = selRow.ixGuestTypeNm;
                                        var GstTyId = selRow.ixGuestType;
                                        var ResBlkId = selRow.ixResBlkId;
                                        var FnId = selRow.ixFunctionId;
                                        var MktId = selRow.ixMarketId;
                                        var gstPrfId = selRow.ixGstProfId;
                                        var ResBlkNm = selRow.ixResBlockNm;
                                        var vCmpId = $$("Property").getValue();

                                        fnLoadResData(vCmpId, ResNo, GstId, GstNm, GstTypeNm, GstTyId, ResBlkId, ResBlkNm, FnId, MktId, gstPrfId);
                                    }
                                    $$("ResSrchPop").hide();
                                },
                                align: "right"
                            }
                    ]
                }
            ],
        }
    });
};
var ResSrchLoadData = function (CompId,Mode) {
    debugger;
    Request = {
        REQ_NM: "FNLOADKOTRESDET",
        COMPID: CompId,
        Mode:Mode,
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
    var vData = ResSrchLoadData(vCompId, "Bill");
    $$("gridResSrch").parse(vData);
    $$("gridResSrch").refresh();
    if ($$("gridResSrch").count()) {
        $$("gridResSrch").select($$("gridResSrch").getFirstId());
    }    
    $$("ResSrchPop").show();
    webix.UIManager.setFocus($$("gridResSrch"));
};
var fnIsValidDt = function () {
    debugger;
    if ($$("txtBillDt").getValue() == "") {
        webix.message({ type: 'warning', text: 'Bill Date can not be empty' });
        webix.UIManager.setFocus($$("txtBillDt"));
        return false;
    }

    var vBillDt = $$("txtBillDt").getValue();

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
var fnChkCardClick = function () {    
    var vData = $$("gridCardTp").serialize();
    var vFirst = "";    
    debugger;
    if ($$("ChkCard").getValue() == 1) {
        $$("txtCardNo").show();
        $$("ddlCardType").show();
        if (vData.length > 0) {
            vFirst = vData[0].id;
            if (vFirst != "") $$("ddlCardType").setValue(vFirst);
            fnCardTypeChange();
        }
        
        $$("txtMemb").show();       

    }
    else {
        $$("txtCardNo").hide();
        $$("ddlCardType").hide();
        $$("txtMemb").hide();
    }

};
var fnGetCardType = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNGETCARDTYPE",
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
var fnLoadAddlTax = function (CompId, OutId, BillDt) {
    debugger;
    Request = {
        REQ_NM: "FNGETADDLTAX",
        COMPID: CompId,
        OUTID: OutId,
        BILLDT: BillDt,
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
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var TaxSel = 0;
                        if (value.chr_opt == 1 || value.chr_opt == 2) TaxSel = 1;
                        set = {
                            ixATaxNm: value.Tax_Nm, ixATaxSel: TaxSel, ixATaxId: value.Tax_Id, ixATaxPer: value.Tax_Pr, ixATaxInd: value.Tax_Ind,
                            ixAMinAmt: value.Min_Amt, ixATaxAplInd: value.Apl_ind, ixAEffDt: value.Ef_Fr, chr_opt: value.chr_opt
                        };
                        Rows.push(set);
                    });

                    $$("gridAddChr").parse(Rows);
                }
                else {

                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });


};
var fnChkAddChrgClick = function () {
    debugger;
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    gridMain = $$("gridMain").serialize();
    if (window.Kot_No_String != "") {
        if (ResNo != "") {
            if (gridMain.length > 0) {
                fnLoadBillSNo(CompId, "C");
            }
        }
    }
};
var fnLoadResData = function (CompId, ResNo, GstId, GstNm, GstTypeNm, GstTyId, ResBlkId, ResBlkNm, FnId, MktId, gstPrfId, ResNarr) {
    debugger;
    window.TX_SPL_IND = "";
    window.ResNo = "";
    window.ResBlkId = "";
    window.gstPrfId = "";
    window.GstId = "";
    window.GstNm = "";
    window.GstTyId = "";
    window.FnId = "";
    window.MktId = "";
    window.ConvRt = "";
    window.Kot_No_String = "";
    $$("gridMain").clearAll();
    $("#CHKCURR").val("0");
    $("#BILLCURRID").val("");
    $$("gridMain").clearAll();
    $$("gridDisc").clearAll();    
    $$("gridKot").clearAll();
    $$("gridBill").clearAll();    
    $$("gridAddress").clearAll();
    $$("ChkTaxNotAppl").setValue(0);
    $$("ChkTaxNotAppl").disable();
    $$("ChkSerExmpt").setValue(0);
    $$("txtType").setValue("");
    $$("txtGstType").setValue("");
    $$("txtGstNm").setValue("");
    $$("txtCurr").setValue("");
    $$("lblnar").setValue("")
    $$("txtTaxExmptRes").setValue("");
    $$("txtReason").setValue("");
    $$("txtBillInstr").setValue("");
    $$("txtBillInstr").hide();
    

    window.ResNo = ResNo;
    window.ResBlkId = ResBlkId;
    window.gstPrfId = gstPrfId;
    window.GstId = GstId;
    window.GstNm = GstNm;
    window.GstTyId = GstTyId;
    window.FnId = FnId;
    window.MktId = MktId;

    Request = {
        REQ_NM: "FNFILLRESDET",
        COMPID: CompId,
        RESNO: ResNo,
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

                var Rows = [];
                dtBnRes = rowData.DtMain;
                dtBnGst = rowData.DtGst;
                if (dtBnRes.length > 0) {
                    debugger;
                    if ($$("txtGstInNo").isVisible() == true) {
                        if (dtBnGst.length > 0) $$("txtGstInNo").setValue(dtBnGst[0].TX_RG_NO);
                    }

                    if (dtBnRes[0].Bill_Inst.toString().trim() != "") {
                        $$("txtBillInstr").setValue(dtBnRes[0].Bill_Inst);
                        $$("txtBillInstr").show();                        
                    }                   


                    if (dtBnRes.GUEST_TYPE == "C") {
                        if (dtBnGst.length > 0) {
                            if (window.PS_H_IND == 2) {
                                if (fnIsItSEZ(dtBnGst.CM_ID) == true) {
                                    if ($$("ChkZeroTax").isVisible() == true && window.TX_SPL_IND != "F" && window.TX_SPL_IND != "B") {
                                        $$("ChkZeroTax").setValue(1);
                                        fnChkZeroTaxAplClick();
                                    }
                                }
                            }
                            else if (window.PS_H_IND == 1) {
                                if (fnIsItEXMP(dtBnGst.CM_ID) == true) {
                                    if ($$("ChkTaxNotAppl").isVisible() == True) {
                                        $$("ChkTaxNotAppl").setValue(1);
                                        $$("ChkTaxNotAppl").disable();
                                        fnChkTaxNaAplClick();
                                    }
                                }
                            }
                        }
                    }
                    else if (window.InGstInd == 1 && dtBnRes.GUEST_TYPE == "O") {
                        if (dtBnGst.length > 0) {
                            window.TX_SPL_IND = dtBnGst.TX_SPL_IND;
                        }
                    }

                    if (window.K_TAX == 4) {
                        if (dtBnGst.length > 0) {
                            if (dtBnGst.M_IND == 1) {
                                if (window.PS_H_IND == 2) {
                                    $$("ChkZeroTax").setValue(1);
                                    fnChkZeroTaxAplClick();
                                }
                                else if (window.PS_H_IND == 1) {
                                    $$("ChkTaxNotAppl").setValue(1);
                                    fnChkTaxNaAplClick();
                                }
                            }
                        }
                    }

                    if (window.BASE_CURRENCY != dtBnRes.cur_id && window.BFornCurappl == "1" && dtBnRes.cur_id != "") {
                        $("#CHKCURR").val("1");
                        fnchkCurClick();
                        $("#BILLCURRID").val(dtBnRes.cur_id);
                        var data = $$("gridCurr").serialize();

                        var newData = data.filter(function (el) {
                            return el.id == dtBnRes.cur_id;
                        });
                        if (newData.length > 0) {
                            $$("txtCurr").setValue(newData[0].value)
                        }
                        else {
                            $$("txtCurr").setValue("");
                        }
                    }
                }                
                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

    $$("lblnar").setValue(ResNarr);
    $$("txtType").setValue(ResBlkNm);
    $$("txtResNo").setValue(ResNo);
    $$("txtGstType").setValue(GstTypeNm);
    $$("txtGstNm").setValue(GstNm);
    //if (window.InGstInd == "1") {
    //    $$("ChkTaxNotAppl").setValue(0);
    //    $$("txtTaxExmptRes").setValue("");
    //}
    if (ResNo!="") fnLoadBillDef(CompId, ResNo, ResBlkId);   
    
    
};
var fnIsItSEZ = function (vID) {
    debugger;
    bSucc = 0;
    Request = {
        REQ_NM: "FNISITSEZ",
        COMPID: CompId,
        vID: vID
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
                if (rowData.IsItSEZ == "1") {
                    window.TX_SPL_IND = rowData.TX_SPL_IND;
                    bSucc = 1;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSucc == 1) return true;
    else return false;

};
var fnIsItEXMP = function (vID) {
    debugger;
    bSucc = 0;
    Request = {
        REQ_NM: "FNISITEXMP",
        COMPID: CompId,
        vID: vID
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
                if (rowData.IsItEXMP == "1") {
                    bSucc = 1;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSucc == 1) return true;
    else return false;

};
var fnLoadKOTNos = function (CompId, ResNo, ResBlkId) {
    debugger;    
    var bSuc = 0;
    if (ResNo == "") return false;
    $$("gridKot").clearAll();
    var gridMain = $$("gridMain").serialize();
    var vLen = gridMain.length;
    if (vLen == 0) return false;
    Request = {
        REQ_NM: "FNLOADKOTNOS",
        COMPID: CompId,
        RESNO: ResNo,
        RESLKID: ResBlkId,
        gridMain: gridMain
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
                var vKotData = rowData.gridKot;
                var vKotNoString = rowData.Kot_No_String;
                var nCovers = rowData.numTotCovers;
                window.Kot_No_String = vKotNoString;
                $$("gridKot").parse(vKotData);
                $$("txtCov").setValue(nCovers);
                bSuc = 1;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSuc == 1) return true;
    else return false;

};
var fnLoadBnGroupIds = function (CompId) {
    debugger;
    var bSuc = 0;
    if (window.Kot_No_String == "") return false;
    Request = {
        REQ_NM: "FNLOADBNGROUPIDS",
        COMPID: CompId,
        Kot_No_String: window.Kot_No_String
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
                debugger;
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var DiscPer="0";
                        var DiscAmt="0";
                        if (value.ixD_Disc != "") DiscPer = value.ixD_Disc;
                        if(value.ixD_Amt != "") DiscAmt = value.ixD_Amt;
                        set = {
                            ixD_GrNm: value.ixD_GrNm, ixD_Disc: DiscPer, ixD_Amt: DiscAmt, ixD_Mode: value.ixD_Mode, ixD_GrId: value.ixD_GrId,
                            ixD_Max: value.ixD_Max,ixD_Dper: value.ixD_Dper
                        };
                        Rows.push(set);
                    });

                    $$("gridDisc").parse(Rows);                   
                }
               bSuc = 1;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSuc == 1) return true;
    else return false;

};
var fnLoadBillSNo = function (CompId, C_Ind) {
    debugger;
    $("#loading").show();
    var bSuc = 0;
    if (Kot_No_String == "") return false;
    var gridMain = $$("gridMain").serialize();
    var gridDisc= $$("gridDisc").serialize();
    var gridAddChr = $$("gridAddChr").serialize();
    var gridAddress = $$("gridAddress").serialize();

    $.each(gridDisc, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    $.each(gridMain, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    $.each(gridAddChr, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    $.each(gridAddress, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    var vBCurr = $("#BILLCURRID").val();
    var ChkCurr = $("#CHKCURR").val();
    var ChkCurrVis = "0";
    var chkscEx = $$("ChkSerExmpt").getValue()
    var chkscExVis = "0";
    if ($$("ChkSerExmpt").isVisible() == true) chkscExVis = "1";
    var ChkTaxNADiplVis = "0";
    var ChkTaxNADipl = $$("ChkTaxNotAppl").getValue();
    if ($$("ChkTaxNotAppl").isVisible() == true) ChkTaxNADiplVis = "1";
    var chkZeroTaxApplicable = $$("ChkZeroTax").getValue();
    var TaxExmptRes = $$("txtTaxExmptRes").getValue();
    var DiscNarr = $$("txtReason").getValue();
    var Guest_Profile_Id = window.gstPrfId;
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    var GstId = window.GstId ;
    var GstNm = window.GstNm ;
    var GstTyId = window.GstTyId;
    var FnId = window.FnId;
    var MktId = window.MktId;
    var numTotCovers = $$("txtCov").getValue();
    var chkCard = $$("ChkCard").getValue();
    var CardNo = $$("txtCardNo").getValue();
    var MembNm = $$("txtMemb").getValue();
    var CardType = $$("ddlCardType").getValue();
    var TxtGSTIN = $$("txtGstInNo").getValue();

   
    var rsCover = [];        
    var hash = {};  
    $$("gridBill").eachRow(function (row) {                
        var SelRow = $$("gridBill").getItem(row);
        var vBillNo = SelRow.ixB_BillNo;
        var vCov = SelRow.ixB_Covers;
        hash = {};
        hash = {
            sno: vBillNo,
            Covers: vCov
        }
        rsCover.push(hash);        
    });

    Request = {
        REQ_NM: "FNLOADBILLSNO",
        COMPID: CompId,
        Kot_No_String: window.Kot_No_String,       
        chkZeroTaxApplicable: chkZeroTaxApplicable,
        TX_SPL_IND: window.TX_SPL_IND,        
        ChkTaxNADipl: ChkTaxNADipl,
        ChkTaxNADiplVis:ChkTaxNADiplVis,
        sBillDt: $$("txtBillDt").getValue(),        
        BillCurr: vBCurr,
        ChkCurr: ChkCurr,
        chkscEx: chkscEx,
        chkscExVis:chkscExVis,
        gridMain:gridMain,
        gridDisc: gridDisc,
        gridAddChr: gridAddChr,
        gridAddress: gridAddress,
        TaxExmptRes: TaxExmptRes,
        DiscNarr: DiscNarr,
        ResNo: ResNo,
        ResBlkId:ResBlkId,
        Guest_Profile_Id: Guest_Profile_Id,
        GstId: GstId,
        GstNm: GstNm,
        GstTyId: GstTyId,
        FnId: FnId,
        MktId: MktId,
        numTotCovers: numTotCovers,
        rsCover: rsCover,
        chkCard: chkCard,
        CardNo: CardNo,
        MembNm:MembNm,
        C_Ind: C_Ind,
        CardType: CardType,
        TxtGSTIN: TxtGSTIN,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: true,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {               
                rowData = JSON.parse(data);
                if (rowData.RetStatus == "1") {
                    $$("gridBill").clearAll();
                    $$("gridDisc").clearAll();
                    var gridDisc = rowData.gridDisc;
                    var gridBill = rowData.gridBill;
                    //$$("gridDisc").parse(gridDisc);
                    $$("gridBill").parse(gridBill);
                    window.ConvRt = rowData.ConvRt;
                    if (gridDisc.length > 0) {
                        var Rows = [];
                        $.each(gridDisc, function (key, value) {
                            debugger;
                            var set = {};
                            var DiscPer = "0";
                            var DiscAmt = "0";
                            if (value.ixD_Disc != "") DiscPer = value.ixD_Disc;
                            if (value.ixD_Amt != "") DiscAmt = value.ixD_Amt;
                            set = {
                                ixD_GrNm: value.ixD_GrNm, ixD_Disc: DiscPer, ixD_Amt: DiscAmt, ixD_Mode: value.ixD_Mode, ixD_GrId: value.ixD_GrId,
                                ixD_Max: value.ixD_Max, ixD_Dper: value.ixD_Dper
                            };
                            Rows.push(set);
                        });

                        $$("gridDisc").parse(Rows);
                    }
                    bSuc = 1;
                    if (C_Ind == "F") {
                        $$("txtBillNo").setValue(rowData.RetBillNo);
                        webix.alert({
                            type: 'success',
                            ok: "OK",
                            text: "Saved Successfully"
                        }).then(function () {
                            debugger;
                            fnCallPrint(rowData.RetOrgBillNo);
                            fnRefresh();

                        })
                    }
                    $("#loading").hide();
                    
                }
                else if (rowData.RetStatus == "2") {
                    if (C_Ind == "F") {
                        webix.message({
                            type: 'danger',
                            text: 'Error on Saving'
                        })
                        bSuc = 0;
                        $("#loading").hide();
                    }
                    else {
                        webix.message({
                            type: 'warning',
                            text: 'Error on Loading'
                        })
                        $$("gridBill").clearAll();
                        $$("gridDisc").clearAll();
                        $$("gridMain").clearAll();
                        $$("gridKot").clearAll();
                        window.ConvRt = "";

                        bSuc = 0;
                        $("#loading").hide();
                    }

                }
                else if (rowData.RetStatus == "3") {
                    webix.message({
                        type: 'warning',
                        text: 'Tax Mismatch in Transaction'
                    })
                    bSuc = 0;
                    $("#loading").hide();
                }
            }
            
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
        }
    });
    if (bSuc == 1) return true;
    else return false;  

};

function fnCallPrint(vBillNo) {
    debugger;    
    var bVal = false;
    var PrintFlNm = ""; 
    
    PrintFlNm = window.BILL_PROG_NM;
    var CompId = $$("Property").getValue().toString().trim();

    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#loading").hide();
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
var fnLoadBillDef = function (CompId, ResNo, ResBlkId) {
    debugger;
    var bSuc = 0;   
    
    Request = {
        REQ_NM: "FNLOADBILLDEF",
        COMPID: CompId,
        ResNo: ResNo,
        ResBlkId: ResBlkId,
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
                    if (rowData.length == 1) {
                        var Rows = [];                        
                        var set = {};                        
                        set = {
                            ixV_FnDt: rowData[0].Kot_Dt1, ixV_VenueId: rowData[0].Venue_Id, ixV_VenueNm: rowData[0].Venue_Nm, ixV_SessId: rowData[0].Session_Id, ixV_SessNm: rowData[0].Session_Nm
                            
                        };
                        Rows.push(set);
                        $$("gridMain").parse(Rows);
                        debugger;
                        fnLoadBillDet(CompId,ResNo,ResBlkId);

                    }
                    else {
                        debugger;
                        var data = $$("gridMain").serialize();
                        if (data.length == 0) fnAddRow();
                        else $$("gridMain").select($$("gridMain").getFirstId());
                        $$("ResSrchPop").hide();
                        fnVenBtnClick($$("gridMain").getFirstId());
                        
                    }
                }
                
                bSuc = 1;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSuc == 1) return true;
    else return false;
};
var fnLoadBillDet = function (CompId, ResNo, ResBlkId) {
    debugger;
    window.Kot_No_String = ""
    $$("gridKot").clearAll();
    if (window.Disc_Clear_Mode_Set=="0") $$("gridDisc").clearAll();
    $$("gridBill").clearAll();   

    var gridMain = $$("gridMain").serialize();

    if (gridMain.length > 0) {
        fnLoadKOTNos(CompId, ResNo, ResBlkId);
        debugger;
        if (window.Kot_No_String == "") return false;

        debugger;
        if (window.Disc_Clear_Mode_Set == "0")  fnLoadBnGroupIds(CompId);
        fnLoadBillSNo(CompId,"C");        
    }
    

};
var fnVenBtnClick = function (RowId) {
    debugger;
    if (fnChkSessVal() == false) return;
    var bVal = fnIsValidDt();
    if (bVal == false) return;
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;

    if (ResNo == "") {
        webix.message({ type: 'warning', text: 'Reservation No Cannot be Empty' });
        webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }
    var gridMain = $$("gridMain").serialize();
    var srec = ""

    RowLen = gridMain.length;

    for (var i = 0; i < RowLen; i++) {
        debugger;
        var NewId = gridMain[i].id;
        var SelRow = $$("gridMain").getItem(NewId);
        var vVenueId = SelRow.ixV_VenueId;
        var vSessId = SelRow.ixV_SessId;
        var vFunDt = SelRow.ixV_FnDt;
        if (vVenueId != "") {
            if (srec == "") srec = vVenueId + "~" + vSessId + "~" + vFunDt;
            else srec = srec + "$" + vVenueId + "~" + vSessId + "~" + vFunDt;
        }
    }
    var vCompId = $$("Property").getValue();
    var vData = VenSrchLoadData(vCompId, "Bill", srec);
    $$("VenSrchPop").show();
    webix.UIManager.setFocus($$("gridVenSrch"));

};
var VenSrchLoadData = function (CompId, Mode, srec) {
    debugger;
    $$("gridVenSrch").clearAll();
    $$("gridVenSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    Request = {
        REQ_NM: "FNLOADVENPOPDATA",
        COMPID: CompId,
        Mode: Mode,
        ResNo: window.ResNo,
        ResBlkInd: window.ResBlkId

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
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vArr = "";
                        var vArr1 = "";
                        var vVendId = "";
                        var vFnDt = "";
                        var vSesId = "";
                        var bVal=false;
                        if (value.Venue_Id != null && value.Venue_Id != undefined) vVendId = value.Venue_Id.toString().trim();
                        if (value.Kot_Dt1 != null && value.Kot_Dt1 != undefined) vFnDt = value.Kot_Dt1.toString().trim();
                        if (value.Session_Id != null && value.Session_Id != undefined) vSesId = value.Session_Id.toString().trim();

                        if (srec != "") {
                            vArr = srec.split('$');
                            for (var i = 0; i < vArr.length; i++) {
                                var sVen = "";
                                var ssid = "";
                                var sfndt = "";
                                vArr1 = vArr[0].split('~');                                
                                if(vArr1[0] != null && vArr1[0] != undefined) sVen = vArr1[0].toString().trim();
                                if (vArr1[1] != null && vArr1[1] != undefined) ssid = vArr1[1].toString().trim();
                                if (vArr1[2] != null && vArr1[2] != undefined) sfndt = vArr1[2].toString().trim();
                                if (sVen == vVendId && ssid == vSesId && vFnDt == sfndt) {
                                    bVal = true;
                                    break;
                                }
                            }
                        }
                        if (bVal == false) {
                            set = {
                                ixFnDt: value.Kot_Dt1, ixVenueNm: value.Venue_Nm, ixSessNm: value.Session_Nm, ixVenueid: value.Venue_Id, ixfnId: "",
                                ixSessId: value.Session_Id,
                            };
                            Rows.push(set);
                        }
                    });
                    $$("gridVenSrch").parse(Rows);
                    $$("gridVenSrch").refresh();
                    if ($$("gridVenSrch").count()) {
                        $$("gridVenSrch").select($$("gridVenSrch").getFirstId());
                    }
                    

                }
                else {

                }

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnRetVenSrch = function (RowId) {
    var selRow = $$("gridVenSrch").getItem(RowId);
    var Ret_FnDt = selRow.ixFnDt;
    var Ret_VenueId = selRow.ixVenueid;
    var Ret_VenueNm = selRow.ixVenueNm;
    var Ret_SessId = selRow.ixSessId;
    var Ret_SessNm = selRow.ixSessNm;
    var vCmpId = $$("Property").getValue();
    var TarRow = $$("gridMain").getSelectedItem();
    var TarId = TarRow.id;    
    TarRow.ixV_FnDt = Ret_FnDt;
    TarRow.ixV_VenueId = Ret_VenueId;
    TarRow.ixV_VenueNm = Ret_VenueNm;
    TarRow.ixV_SessId = Ret_SessId;
    TarRow.ixV_SessNm = Ret_SessNm;
    $$("gridMain").updateItem(TarId, TarRow);

    $$("gridMain").refresh();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    fnLoadBillDet(vCmpId, ResNo, ResBlkId);
}
var VenSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "VenSrchPop",
        head: " Venue Search",
        position: "center",
        css: "WebIxStyle",
        height: 300,
        width: 520,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridVenSrch",
                    select: 'row',
                    //editable: true,
                    css: "webix_header_border",
                    //scrollX: false,
                    columns: [
                       

                            { id: "ixFnDt", header: 'Function Dt', css: { 'text-align': 'center ! important' }, },
                            { id: "ixVenueNm", header: 'Venue', width: 200, css: { 'text-align': 'left ! important' }, },
                            { id: "ixSessNm", header: 'Session', width: 200, css: { 'text-align': 'left ! important' }, },                            
                            { id: "ixVenueid", header: 'BlkId', hidden: true },
                            { id: "ixfnId", header: 'FunctionId', hidden: true },
                            { id: "ixSessId", header: 'MarketId', hidden: true },                            

                    ],
                    data: [],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var id = selRow.id;
                            $$("VenSrchPop").hide();
                            fnRetVenSrch(id);
                        },

                        'onItemDblClick': function (id) {
                            debugger;
                            $$("VenSrchPop").hide();
                            fnRetVenSrch(id);                            
                            

                        },
                    },
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
                                    if ($$("gridVenSrch").count()) {
                                        var selRow = $$("gridVenSrch").getSelectedItem();
                                        var RowId = selRow.id;
                                        fnRetVenSrch(RowId);
                                    }
                                    $$("VenSrchPop").hide();

                                },
                                align: "right"
                            }
                    ]
                }
            ],
        }
    });
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
var BillNmPopWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "BillNmPop",
        head: "Billing Name",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 530,
        move: true,
        body: {
            padding: { top: 20, left: 30, bottom: 20, right: 10 },
            rows: [
                    { view: "text", id: "txtName", label: "Name", laelWidth:100,  },
                    { view: "text", id: "txtAdd1", label: "Address", laelWidth: 100, },
                    { view: "text", id: "txtAdd2", label: " ", laelWidth: 100, },
                    { view: "text", id: "txtAdd3", label: " ", laelWidth: 100, },
                    { view: "text", id: "txtCountryId", label: "CountryId", readonly: true, hidden: true },
                    { cols: [{ view: "text", id: "txtCity", label: "City", laelWidth: 100, }, { view: "text", id: "txtPin", label: "Pin Code", laelWidth: 100, }, ] },
                    { cols: [{ view: "text", id: "txtCountry", label: "Country", readonly: true }, { view: "button", width: 30, type: "icon", id: "btnCountSrch", borderless: true, icon: "wxi-search", click: function () { fnbtnCountClick();} },] },                    
                    { cols: [{}, { view: "button", type: "icon", id: "OkAddrs", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { fnRetBillNm();} }], }
            ]
        }
    });
};
var fnLoadBillNmPop = function (id) {
    debugger;
    if (window.gstPrfId == "" || $$("txtResNo").getValue() == "") return false;

    var vName = "";
    var vAdd1 = "";
    var vAdd2 = "";
    var vAdd3 = "";
    var vCity = "";
    var vPinCd = "";
    var vCountry = "";
    var vCountryId = "";

    var sRow = $$("gridBill").getItem(id);
    var vSno = sRow.ixB_BillNo;
    vData = $$("gridAddress").serialize();
    var newData = vData.filter(function (el) {
        return el.Sno == vSno;
    });
    if (newData.length > 0) {
        var NewId = newData[0].id;
        var SelRow = $$("gridAddress").getItem(NewId);
        vName = SelRow.Name;
        vAdd1 = SelRow.Add1;
        vAdd2 = SelRow.Add2;
        vAdd3 = SelRow.Add3;
        vCity = SelRow.City;
        vPinCd = SelRow.PinCd;
        vCountry = SelRow.Country;
        vCountryId = SelRow.CountryId;
    }
    else {
        debugger;        
        Request = {
            REQ_NM: "FNLOADGSTADDR",
            COMPID: CompId,
            GSTID: window.gstPrfId
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
                          
                        vName = rowData[0].GS_NM;
                        vAdd1 = rowData[0].ADD1;
                        vAdd2 = rowData[0].ADD2;
                        vAdd3 = rowData[0].ADD3;
                        vCity = rowData[0].PL;
                        vPinCd = rowData[0].PN;
                        vCountry = rowData[0].COUNTRY_NM;
                        vCountryId = rowData[0].CT_ID;

                    }
                    else {

                    }

                }
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
            }
        });        

    }
    $$("txtName").setValue(vName);
    $$("txtAdd1").setValue(vAdd1);
    $$("txtAdd2").setValue(vAdd2);
    $$("txtAdd3").setValue(vAdd3);
    $$("txtCountryId").setValue(vCountryId);
    $$("txtCity").setValue(vCity);
    $$("txtPin").setValue(vPinCd);
    $$("txtCountry").setValue(vCountry);
    $$("BillNmPop").show();

};
var fnRetBillNm = function () {
    debugger;
    var SelRow = $$("gridBill").getSelectedItem();
    var vSno = SelRow.ixB_BillNo;

    var vName = $$("txtName").getValue();
    var vAdd1 = $$("txtAdd1").getValue();
    var vAdd2 = $$("txtAdd2").getValue();
    var vAdd3 = $$("txtAdd3").getValue();
    var vCountryId = $$("txtCountryId").getValue();
    var vCity = $$("txtCity").getValue();
    var vPinCd = $$("txtPin").getValue();
    var vCountry = $$("txtCountry").getValue();

    vData = $$("gridAddress").serialize();
    var newData = vData.filter(function (el) {
        return el.Sno == vSno;
    });
    if (newData.length > 0) {
        var NewId = newData[0].id;
        var NewRow = $$("gridAddress").getItem(NewId);
        NewRow.Name = vName;
        NewRow.Add1 = vAdd1;
        NewRow.Add2 = vAdd2;
        NewRow.Add3 = vAdd3;
        NewRow.City = vCity;
        NewRow.PinCd = vPinCd;
        NewRow.Country = vCountry;
        NewRow.CountryId = vCountryId;
        $$("gridAddress").updateItem(NewId, NewRow);
        $$("gridAddress").refresh();
    }
    else {
        var set = {};
        set = {
            Sno: vSno, Name: vName, Add1: vAdd1, Add2: vAdd2, Add3: vAdd3, City: vCity, PinCd: vPinCd, Country: vCountry, CountryId: vCountryId
        };
        ///Rows.push(set);
        $$("gridAddress").add(set);
        $$("gridAddress").refresh();

    }
    $$("BillNmPop").hide();
};
var fnbtnCountClick = function () {
    if (fnChkSessVal() == false) return;
    var vCmpId = $$("Property").getValue();
    CountrySrchLoadData(vCmpId);    
    $$("CountrySrchPop").show();

}
var CountrySrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CountrySrchPop",
        head: " Country Search",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 320,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridCountrySrch",
                    select: 'row',
                    //editable: true,
                    css: "webix_header_border",
                    //scrollX: false,
                    columns: [                            
                            { id: "ixCountryNm", header: ['Country', { content: "textFilter", }] , width: 300, css: { 'text-align': 'left ! important' }, fillspace:true},                            
                            { id: "ixCountryId", header: 'CountryId', hidden: true },                            

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            var selRow = $$("gridCountrySrch").getItem(id);
                            var Ret_CountryId = selRow.ixCountryId;
                            var Ret_CountryNm = selRow.ixCountryNm;
                            $$("txtCountry").setValue(Ret_CountryNm);
                            $$("txtCountryId").setValue(Ret_CountryId);
                            $$("CountrySrchPop").hide();
                        },

                    },

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
                                    if ($$("gridCountrySrch").count()) {
                                        var selRow = $$("gridCountrySrch").getSelectedItem();
                                        var Ret_CountryId = selRow.ixCountryId;
                                        var Ret_CountryNm = selRow.ixCountryNm;
                                        $$("txtCountry").setValue(Ret_CountryNm);
                                        $$("txtCountryId").setValue(Ret_CountryId);
                                    }
                                    $$("CountrySrchPop").hide();
                                },
                                align: "right"
                            }
                    ]
                }
            ],
        }
    });
};
var CountrySrchLoadData = function (CompId) {
    debugger;
    $$("gridVenSrch").clearAll();
    Request = {
        REQ_NM: "FNLOADCOUNTRYPOPDATA",
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
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        set = {
                            ixCountryNm: value.COUNTRY_NM, ixCountryId: value.COUNTRY_ID,
                        };
                        Rows.push(set);
                    });
                    $$("gridCountrySrch").parse(Rows);
                    $$("gridCountrySrch").refresh();
                    if ($$("gridCountrySrch").count()) {
                        $$("gridCountrySrch").select($$("gridCountrySrch").getFirstId());
                    }

                }
                else {

                }

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });    
};
var KotPrvwWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "KotPrvwPop",
        head: " KOT Preview",
        position: "center",
        css: "WebIxStyle",
        height: 300,
        width: 520,
        move: true,
        body: {
            rows: [
                { cols: [{ view: "text", id: "txtCat", label: "Category", labelWidth: 100, readonly: true }, { view: "text", id: "txtKotDispNo", label: "KOT No", laelWidth: 100, readonly: true }, ] },
                {
                    view: "datatable",
                    id: "gridKotPrvw",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [                            
                            { id: "ixItem", header: 'Item', width: 200, css: { 'text-align': 'left ! important' },fillspace:true },
                            { id: "ixQty", header: 'Qty', width: 80, css: { 'text-align': 'right ! important' }, },
                            { id: "ixRate", header: 'Rate', width: 100, css: { 'text-align': 'right ! important' },
                                format: function (value) {
                                    return fnCurrFormat(value);
                                },
                            },
                            {id: "ixVal", header: 'Value', width: 110, css: { 'text-align': 'right ! important' },
                                format: function (value) {
                                    return fnCurrFormat(value);
                                },
                            },
                    ],
                    data: [],
                }
            ],
        }
    });
};
var KotPrvwPopLoadData = function (CompId, KOTNO, kotCat, kotDispNo) {    
    debugger;
    $$("gridKotPrvw").clearAll();
    Request = {
        REQ_NM: "FNLOADKOTPOPDATA",
        COMPID: CompId,
        Kot_no: KOTNO
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
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        set = {
                            ixItem: value.PROD_NM, ixQty: value.QTY, ixRate: value.RATE, ixVal: value.NET_VAL,
                        };
                        Rows.push(set);
                    });
                    $$("gridKotPrvw").parse(Rows);  

                }
                else {

                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    $$("txtCat").setValue(kotCat);
    $$("txtKotDispNo").setValue(kotDispNo);
    $$("KotPrvwPop").show();
};
var fnchkCurClick = function () {
    var chkCur = $("#CHKCURR").val();
    if (chkCur == "1") {        
        $$("txtCurr").show();
        $$("gridBill").showColumn("ixB_FornRnd");
        $$("gridBill").showColumn("ixB_FornAmt");
        $$("gridBill").showColumn("ixB_GL");
    }
    else {
        $$("txtCurr").hide();
        $$("gridBill").hideColumn("ixB_FornRnd");
        $$("gridBill").hideColumn("ixB_FornAmt");
        $$("gridBill").hideColumn("ixB_GL");
    }
};
var TaxExempResWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "TaxExemResPop",        
        position: "center",
        css: "WebIxStyle",
        height: 150,
        width: 450,
        move: true,
        body: {
            rows: [
                { view: "text", id: "txtTaxExmptResPop", label: "Tax Exemption Reason", labelWidth: 120,attributes:{ maxlength:60 }},
                {margin: 10,padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{view: "button", type: "icon", icon: "wxi-check",label: "Ok",inputWidth: 80,
                        click: function () {fnExempResOkClick();}, align: "right"}
                    ]
                }                
            ],
        }
    });
};
var fnExempResOkClick = function () {
    debugger;
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    var ExempRes = $$("txtTaxExmptResPop").getValue();
    if (ExempRes == "") {
        webix.message({ type: 'warning', text: "Tax Exemption Reason cann't be empty" });
        return false;
    }
    $$("txtTaxExmptRes").setValue(ExempRes);
    $$("TaxExemResPop").hide();
    gridMain = $$("gridMain").serialize();
    if (gridMain.length > 0) {
        fnLoadBillDet(CompId, ResNo, ResBlkId);
    }
};
var fnChkTaxNaAplClick = function () {
    debugger;
    var bSuc = 0;
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    if ($$("ChkTaxNotAppl").getValue() == "1") {
        if (window.K_TAX == 4) {
            $$("txtTaxExmptRes").setValue("Exempted Body");
            bSuc = "1";
        }
        else {
            $$("txtTaxExmptResPop").setValue("");
            $$("TaxExemResPop").show();
        }
    }
    else {
        $$("txtTaxExmptRes").setValue("");
        bSuc = "1";
    }
    if (bSuc == "1") {
        gridMain = $$("gridMain").serialize();
        if (gridMain.length > 0) {
            fnLoadBillDet(CompId, ResNo, ResBlkId);
        }
    }
};
var fnChkKotDetZeroTax = function () {
    debugger;
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    Request = {
        REQ_NM: "FNCHKKOTDETZEROTAX",
        COMPID: CompId,
        ResNo: ResNo,
        ResBlkId: ResBlkId
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
                if (rowData.ChkKotDetZeroTax == "1") {
                    bSucc = 1;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSucc == 1) return true;
    else return false;
};
var fnChkZeroTaxAplClick = function () {
    debugger;
    var bSuc = 0;
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    if (window.InGstInd == "1") {
        var vChk = fnChkKotDetZeroTax();
        if (vChk == false) $$("ChkZeroTax").setValue(0);

        if ($$("ChkZeroTax").getValue() == "1" && vChk == true) {
            $$("txtTaxExmptResPop").setValue("");
            $$("TaxExemResPop").show();            
        }
        else {
            $$("txtTaxExmptRes").setValue("");
            bSuc = "1";
        }
    }
    else {
        if ($$("ChkZeroTax").getValue() == "1") {
            $$("txtTaxExmptResPop").setValue("");
            $$("TaxExemResPop").show();
        }
        else {
            $$("txtTaxExmptRes").setValue("");
            bSuc = "1";
        }
    }
    if (bSuc == "1") {
        gridMain = $$("gridMain").serialize();
        if (gridMain.length > 0) {
            fnLoadBillDet(CompId, ResNo, ResBlkId);
        }
    }
};
var fnValidate = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridDisc").refresh();
    $$("gridMain").editStop();
    $$("gridMain").refresh();
    var bVal = fnIsValidDt();
    if (bVal == false) return;

    var data = $$("gridMain").serialize();
    if (data != null && data != undefined) {
        if (data.length == 0) {
            webix.UIManager.setFocus($$("gridMain"));
            webix.message({ type: 'warning', text: 'Venue and Session Must be Chosen' });
            return false;
        }
        else {
            var newData = data.filter(function (el) {
                return el.ixV_VenueId.trim() == "" && el.ixV_SessId.trim() == "";
            });
            if (newData.length > 0) {
                webix.UIManager.setFocus($$("gridMain"));
                webix.message({ type: 'warning', text: 'Venue and Session Must be Chosen' });
                return false;
            }

        }
    }
    else {
        webix.UIManager.setFocus($$("gridMain"));
        webix.message({ type: 'warning', text: 'Venue and Session Must be Chosen' });
        return false;
    }


    var newData = data.filter(function (el) {
        return el.ixV_FnDt.trim() == "";
    });
    if (newData.length > 0) {
        webix.UIManager.setFocus($$("gridMain"));
        webix.message({ type: 'warning', text: 'Function Date can not be empty' });
        return false;
    }

    if ($$("ChkCard") == "1") {
        if ($$("txtCardNo").getValue() == "") {
            webix.UIManager.setFocus($$("txtCardNo"));
            webix.message({ type: 'warning', text: 'Card No can not be empty' });
            return false;
        }
    }

    if (window.InGstInd == "1") {
        var vGSTIN = $$("txtGstInNo").getValue();
        if (vGSTIN != "") {

            if (fnStateCodeExists(vGSTIN.substring(0,2)) == false)
            {
                webix.UIManager.setFocus($$("txtGstInNo"));
                webix.message({ type: 'warning', text: 'Reg No first two letters should be equal to State code' });
                return false;
            }

            if (vGSTIN.length != 15) {
                webix.UIManager.setFocus($$("txtGstInNo"));
                webix.message({ type: 'warning', text: 'GSTIN Number should be 15 Characters' });
                return false;
            }
        }
    }

    if (window.K_TAX == "2" || window.K_TAX == "3" || window.K_TAX == "4" || window.M_TAX == "2") {
        var vGSTIN = $$("txtGstInNo").getValue();
        if (vGSTIN != "" && window.TX_LEN > 0) {
            if (vGSTIN.length != window.TX_LEN) {
                webix.UIManager.setFocus($$("txtGstInNo"));
                webix.message({ type: 'warning', text: 'Length of Reg Number should be' + window.TX_LEN });
                return false;
            }
        }
    }

    if (window.PS_L2_IND == "1") {
        if (fncheckProvBill() == true) {
            webix.UIManager.setFocus($$("txtGstInNo"));
            webix.message({ type: 'warning', text: 'Provisional Bill not created.' });
            return false;
        }
    }

    var data1 = $$("gridBill").serialize();
    var newData = data1.filter(function (el) {
        return el.ixB_Covers == null || el.ixB_Covers.trim() == "" || el.ixB_Covers.trim() == "0";
    });

    if (newData.length > 0) {
        webix.confirm(
           {
               title: 'Confirmation',
               ok: 'yes',
               cancel: 'No',
               text: 'Cover is zero, Want to Proceed?',
               callback: function (result) {
                   if (result) {
                       debugger;
                       if ($$("txtReason").isVisible() == true && $$("txtReason").getValue() == "") {
                           webix.UIManager.setFocus($$("txtReason"));
                           webix.message({ type: 'warning', text: 'Discount Reason' });
                           return false;
                       }
                       var newCovers = $$("txtCov").getValue();
                       var ResNo = window.ResNo;
                       var ResBlkId = window.ResBlkId;
                       var CompId = $$("Property").getValue();

                       fnLoadKOTNos(CompId, ResNo, ResBlkId);

                       $$("txtCov").setValue(newCovers);
                       if (window.Kot_No_String == "") return false;

                       if (window.MUL_OUT_KOT == "0") {
                           if (fnMultiOutChk(Kot_No_String) == false) return false;
                       }
                       fnLoadBillSNo(CompId, "F");
                   }
                   else {
                       return false;
                   }
               }
           }
         );
    }
    else {
        debugger;
        if ($$("txtReason").isVisible() == true && $$("txtReason").getValue() == "") {
            webix.UIManager.setFocus($$("txtReason"));
            webix.message({ type: 'warning', text: 'Discount Reason' });
            return false;
        }
        var newCovers = $$("txtCov").getValue();
        var ResNo = window.ResNo;
        var ResBlkId = window.ResBlkId;
        var CompId = $$("Property").getValue();

        fnLoadKOTNos(CompId, ResNo, ResBlkId);

        $$("txtCov").setValue(newCovers);
        if (window.Kot_No_String == "") return false;
        if (window.MUL_OUT_KOT == "0") {
            if (fnMultiOutChk(Kot_No_String) == false) return false;
        }
        

        fnLoadBillSNo(CompId, "F");


    }
};
var MultiOutAlertWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "MultiOutAlertPop",
        head: " Multiple Outlets in Single Bill - Alert",
        position: "center",
        css: "WebIxStyle",
        height: 300,
        width: 520,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridMtOutAlrt",
                    select: 'row',                    
                    css: "webix_header_border",                    
                    columns: [
                            { id: "KotNo", header: 'KOT No', width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "O_Nm", header: 'Outlet',  css: { 'text-align': 'left ! important' },fillspace:true },                            
                    ],
                    data: [],                 

                },
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [
                            { view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () { $$("MultiOutAlertPop").hide(); }, align: "right" }
                    ]
                }
            ],
        }
    });
};
var fnMultiOutChk = function (Kot_No_String) {
    debugger;
    bSucc = 1;
    var rsTemp = [];
    var hash = {};
    $$("gridMtOutAlrt").clearAll();
    Request = {
        REQ_NM: "FNRETOUTLETDETKOTS",
        COMPID: CompId,
        Kot_No_String: Kot_No_String,        
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
                rowData.forEach(function (item) {
                    debugger;
                    var newArray = rsTemp.filter(function (el) {
                        return el.o_id == item.o_id;
                    });
                    if (newArray.length > 0) {
                        newArray[0].KotNo = newArray[0].KotNo + "," + item.MKot_No;
                    }
                    else {
                        hash = {};
                        hash = {
                            o_id: item.o_id,
                            KotNo: item.MKot_No,
                            O_Nm: item.outlet_nm
                        }
                        rsTemp.push(hash);
                    }       


                });
                if (rsTemp.length > 1) {
                    bSucc = 0;
                    $$("gridMtOutAlrt").parse(rsTemp);
                    $$("MultiOutAlertPop").show();
                }

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            bSucc = 0;
        }
    });
    if (bSucc == 1) return true;
    else return false;   
    
}
var fncheckProvBill = function () {
    debugger;
    var vData = $$("gridMain").serialize();
    var vFn_Dt = "";
    var vFn_Venue_Id = "";
    var vFn_Sess_Id = "";
    var ResNo = window.ResNo;
    if (vData.length > 0) {
        vFn_Dt = vData[0].ixV_FnDt;
        vFn_Venue_Id = vData[0].ixV_VenueId;
        vFn_Sess_Id = vData[0].ixV_SessId;
    }
    bSucc = 0;
    Request = {
        REQ_NM: "FNCHECKPROVBILL",
        COMPID: CompId,
        ResNo: ResNo,
        vFn_Dt: vFn_Dt,
        vFn_Venue_Id: vFn_Venue_Id,
        vFn_Sess_Id: vFn_Sess_Id
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
                if (rowData == "1") {
                    bSucc = 1;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    if (bSucc == 1) return true;
    else return false;

};
var fnAddRow = function () {
    debugger;
    var set = {};
    set = {
        ixV_FnDt: "", ixV_VenueId: "", ixV_VenueNm: "", ixVenueid: "", ixV_SessNm: "",ixV_SessId:""
    };
    $$("gridMain").add(set);
    $$("gridMain").select($$("gridMain").getLastId());
    $$("gridMain").refresh();
    webix.UIManager.setFocus($$("gridMain"));

};
var fnCallDelRow = function () {
    debugger;
    var SelRow = $$("gridMain").getSelectedId(false);
    $$("gridMain").editStop();
    $$("gridMain").refresh();
    if (SelRow == undefined || SelRow == null) SelRow = $$("gridMain").getLastId();
    $$("gridMain").remove(SelRow);

    var data = $$("gridMain").serialize();
    if (data.length == 0) {
        fnAddRow();
    }
    else {
        $$("gridMain").select($$("gridMain").getLastId());
        webix.UIManager.setFocus($$("gridMain"));
    }


};
var fnbtnNarrClick = function () {
    if (fnChkSessVal() == false) return;
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
var fnbtnDiscApplyClick = function () {
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridDisc").refresh();
    $$("gridBill").editStop();
    $$("gridBill").refresh();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    var CompId = $$("Property").getValue();
    window.Disc_Clear_Mode_Set = "1";
    fnLoadBillDet(CompId, ResNo, ResBlkId);
    window.Disc_Clear_Mode_Set = "0";

};
var fnClearCont = function () {
    debugger;
    window.Kot_No_String = "";
    window.ResNo = "";
    window.ResBlkId = "";
    window.TX_SPL_IND = "";
    window.gstPrfId = "";
    window.GstId = "";
    window.GstNm = "";
    window.GstTyId = "";
    window.FnId = "";
    window.MktId = "";
    window.Disc_Clear_Mode_Set = "0";
    $("#CHKCURR").val("0");
    $("#BILLCURRID").val("");
    $$("gridMain").clearAll();
    $$("gridDisc").clearAll();    
    $$("gridKot").clearAll();
    $$("gridBill").clearAll();
    $$("gridAddress").clearAll();
    $$("gridResSrch").clearAll();
    $$("gridVenSrch").clearAll();
    $$("txtResNo").setValue("");
    $$("txtType").setValue("");
    $$("txtGstType").setValue("");
    $$("txtGstNm").setValue("");
    $$("txtCurr").setValue("");
    $$("txtBillNo").setValue("");
    $$("ChkCard").setValue("0");
    $$("ddlCardType").setValue("");
    $$("txtCardNo").setValue("");
    $$("txtMemb").setValue("");
    $$("txtCov").setValue("");
    $$("txtGstInNo").setValue("");
    $$("lblnar").setValue("");    
    $$("ChkSerExmpt").setValue(0);
    $$("ChkTaxNotAppl").setValue(0);
    $$("ChkZeroTax").setValue(0);
    $$("txtTaxExmptRes").setValue("");
    $$("txtReason").setValue("");
    $$("txtBillInstr").setValue("");
    $$("txtBillInstr").hide();
    
    fnchkCurClick();
    fnChkCardClick();
    fnAddRow();
    

};
var fnStateCodeExists = function (vCd) {
    debugger;        
    bSucc = 0;
    Request = {
        REQ_NM: "FNSTATECODEEXISTS",
        COMPID: CompId,
        vCd: vCd,
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
                if (rowData == "1") {
                    bSucc = 1;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    if (bSucc == 1) return true;
    else return false;

};
var fnbtnDelRowClick = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridBill").editStop();
    fnCallDelRow();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    var CompId = $$("Property").getValue();
    if (ResNo != "") {
        fnLoadBillDet(CompId, ResNo, ResBlkId);
    }

};
var fnbtnAddRowClick = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridBill").editStop();
    data = $$("gridMain").serialize();
    if (data.length > 0) {
        var newData = data.filter(function (el) {
            return el.ixV_VenueNm == "";
        });
        if (newData.length > 0) {
            return false;
        }
    }

    fnAddRow();

};
var fnRefresh = function () {
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridBill").editStop();
    fnClearCont();    
    webix.UIManager.setFocus($$("txtResNo"));   
    //window.location.reload();
};
var fnbtnQtySplitClick = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridDisc").editStop();
    $$("gridDisc").refresh();
    $$("gridBill").editStop();
    $$("gridBill").refresh();
    $$("gridCRec").clearAll();
    var newCovers = 0;
    if (window.Kot_No_String == "") return false;    
    fnLoadBillToSplit();
    $$("SplitQtyPop").show();
};
var SplitQtyPopWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SplitQtyPop",
        head: "Split Quantity / Split Bill ",
        position: "center",
        css: "WebIxStyle",
        height: 330,
        width: 600,
        move: true,
        body: {
            rows: [
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{ view: "button", type: "icon", icon: "wxi-check", label: "Return", inputWidth: 80, click: function () { fnSaveSplitQtyBill();}, align: "right" }
                    ]
                },
                {
                    view: "datatable",
                    id: "gridSplitQty",
                    select: 'row',
                    editable: true,
                    autoconfig:true,
                    css: "webix_header_border",                    
                    columns: [
                            { id: "ixKotNo", header: 'KOT No', width: 80, css: { 'text-align': 'center ! important' }, },
                            { id: "ixItem", header: 'Item', width: 200, css: { 'text-align': 'left ! important' }, fillspace: true, editor: "text", liveEdit: true, },
                            { id: "ixQty", header: 'Qty', width: 80, css: { 'text-align': 'right ! important' }, editor: "text", liveEdit: true, numberFormat:"111.000"},
                            { id: "ixRate", header: 'Rate', width: 80, css: { 'text-align': 'right ! important' },  },
                            { id: "ixValue", header: 'Value',width: 80, css: { 'text-align': 'right ! important' },  },
                            { id: "ixSplitBll", header: 'Split Bill', width: 80, css: { 'text-align': 'right ! important' }, editor: "text", },
                            { id: "ixParSplitNo", header: 'Parent Split No',hidden:true },
                            { id: "ixSplitSNo", header: 'Split SNo',hidden:true },
                            { id: "ixQtySplitInd", header: 'Qty Split Ind',hidden:true },
                            { id: "ixOldQty", header: 'Old Qty', hidden: true },
                            { id: "ixProdId", header: 'Prod Id',hidden:true },
                            { id: "ixSrNo", header: 'Serial No',hidden:true },
                            { id: "ixCompId", header: 'Company Id',hidden:true },
                            { id: "ixUomId", header: 'Uom Id',hidden:true },
                            { id: "ixMaxDiscPer", header: 'Max Disc Per',hidden:true },
                            { id: "ixCostPer", header: 'CostPer',hidden:true },
                            { id: "ixPrdGrpId", header: 'Prod Group Id',hidden:true },
                            { id: "ixPrdSGrpId", header: 'Sub Group Id',hidden:true },
                            { id: "ixTaxStuctId", header: 'Tax Struct Id',hidden:true },
                            { id: "ixOutId", header: 'Outlet Id',hidden:true },
                            { id: "ixBillNo", header: 'Bill No',hidden:true },
                            { id: "ixFromRs", header: 'FromRs',hidden:true },
                            { id: "ixOrgKotNo", header: 'Org Kot No',hidden:true },
                            { id: "ixFornAmt", header: 'Forn Amt', hidden: true },
                            { id: "ixSpltCorr", header: 'Splt or Corr', hidden: true },
                            { id: "ixEditItm", header: 'ItemEdit', hidden: true },
                            

                    ],
                    data: [],
                    on: {

                        onAfterEditStart: function (id) {
                            debugger;
                            var getColumn = id.column;
                            var RowId = id.row;
                            var SelRow = this.getItem(RowId);
                            SplitSelectedColumn = getColumn;
                            if (getColumn == "ixQty") {
                                this.getEditor().getInputNode().setAttribute("maxlength", 9);
                                this.getEditor().getInputNode().style.textAlign = "right";
                            }
                            else if (getColumn == "ixItem") {
                                this.getEditor().getInputNode().setAttribute("maxlength", 30);
                                this.getEditor().getInputNode().style.textAlign = "left";
                            }

                        },
                        onAfterEditStop: function (id, editor) {
                            debugger;
                            var getColumn = editor.column;
                            var index = this.getIndexById(editor.row);
                            var getRow = this.getItem(editor.row);
                            if (getColumn == "ixQty") {
                                var OldQty = getRow.ixOldQty;
                                var EditQty = getRow.ixQty;
                                var Rate = getRow.ixRate;
                                var SRNO = getRow.ixSrNo;
                                var KotNo = getRow.ixOrgKotNo;
                                if (OldQty == "") OldQty = 0;
                                OldQty = parseFloat(OldQty);
                                if (EditQty == "") EditQty = 0;
                                EditQty = parseFloat(EditQty);
                                var vMaxSpltSno = getRow.ixSplitSNo;
                                var ParentSplitSNo = getRow.ixParSplitNo;
                                if (getRow.ixSpltCorr == "1") {
                                    if (EditQty == 0) {
                                        getRow.ixQty = OldQty;
                                        this.updateItem(editor.row, getRow);
                                        this.refresh();
                                    }
                                    else if (EditQty > OldQty) {
                                        getRow.ixQty = OldQty;
                                        this.updateItem(editor.row, getRow);
                                        this.refresh();
                                        webix.message({ type: 'warning', text: "Spitted Qty cann't be greater than Available Qty" });                                        
                                    }
                                    else if (EditQty != OldQty) {
                                        var NewQty = OldQty - EditQty;
                                        var vValue = parseFloat(NewQty * Rate);
                                        vValue = vValue.toFixed(2);
                                        vValue = vValue.toString().trim();
                                        index = index + 1;
                                        var copy = webix.copy(this.getItem(editor.row));
                                        delete copy.id;
                                        copy.ixQty = NewQty;
                                        copy.ixOldQty = NewQty;
                                        copy.ixValue = vValue;
                                        copy.ixQtySplitInd = "0";
                                        copy.ixFromRs = "";
                                        copy.ixSplitSNo = vMaxSpltSno + 1;
                                        copy.ixParSplitNo = ParentSplitSNo;
                                        this.add(copy, index);
                                        vValue = parseFloat(EditQty * Rate);
                                        vValue = vValue.toFixed(2);
                                        vValue = vValue.toString().trim();
                                        getRow.ixQtySplitInd = "1";
                                        getRow.ixValue = vValue;
                                        getRow.ixOldQty = EditQty;
                                        this.updateItem(editor.row, getRow);
                                        this.refresh();
                                    }
                                }
                                else if (getRow.ixSpltCorr == "2") {
                                    
                                    if (EditQty > OldQty) {
                                        getRow.ixQty = OldQty;
                                        this.updateItem(editor.row, getRow);
                                        this.refresh();
                                        webix.message({ type: 'warning', text: "Corrected Qty cann't be greater than Total Qty" });
                                    }
                                    else {
                                        debugger;
                                        var NewQty = OldQty - EditQty;
                                        var PrvRowId = this.getIdByIndex(index - 1);
                                        var PrvRow = this.getItem(PrvRowId)
                                        var vQty = PrvRow.ixQty + NewQty;
                                        var vValue = parseFloat(vQty * Rate);
                                        vValue = vValue.toFixed(2);
                                        vValue = vValue.toString().trim();
                                        if (EditQty == 0) {

                                            var set = {};
                                            set = {KOT_NO: KotNo, SR_NO: SRNO, SPLIT_SNO: vMaxSpltSno };
                                            $$("gridCRec").add(set);                                          
                                            

                                            PrvRow.ixQty = vQty;
                                            PrvRow.ixOldQty = vQty;
                                            PrvRow.ixValue = vValue;
                                            PrvRow.ixQtySplitInd = "0";                                            
                                            this.updateItem(PrvRowId, PrvRow);
                                            this.remove(editor.row);
                                            this.refresh();
                                        }
                                        else {
                                            PrvRow.ixQty = vQty;
                                            PrvRow.ixOldQty = vQty;
                                            PrvRow.ixValue = vValue;                                            
                                            this.updateItem(PrvRowId, PrvRow);
                                            vValue = parseFloat(EditQty * Rate);
                                            vValue = vValue.toFixed(2);
                                            vValue = vValue.toString().trim();
                                            getRow.ixValue = vValue;
                                            getRow.ixOldQty = EditQty;
                                            this.updateItem(editor.row, getRow);
                                            this.refresh();
                                        }
                                    }


                                }
                                this.eachRow(function (row) {
                                    var SelRow = this.getItem(row);
                                    SelRow.ixSpltCorr = "0";
                                    this.updateItem(row, SelRow);
                                    this.refresh();
                                });
                                                                
                            }
                        },

                        onBeforeEditStart: function (id) {
                            debugger;
                            var item = this.getItem(id.row);
                            var EditInd = item.ixSpltCorr;
                            var EditInd2 = item.ixEditItm;
                            if ((id.column == "ixQty") && (EditInd == "0" || EditInd == "")) return false;
                            if ((id.column == "ixItem") && (EditInd2 == "0" || EditInd == "")) return false;
                        },

                        "onKeyPress": function (code, e) {
                            debugger;                            
                            var charCode = e.which || e.keyCode;
                            var SelRow = this.getSelectedItem();
                            //var SelId = this.getSelectedId(false,true);
                            if (e.shiftKey == true) return false;
                            if (e.ctrlKey == true) return false;
                            if (SplitSelectedColumn == "ixQty") {
                                if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                    return true
                                }
                                if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                                    return false;
                                }
                                else {

                                    return true;
                                }
                            }

                        },
                        onBlur: function (prev_view) {
                            this.editStop();
                            this.refresh();
                        },
                    }
                },

                              
            ]
        }
    });

    webix.ui({
        view: "contextmenu",
        id: "my_menu",
        //css: { "color": "#ccc !important" },
        data: [
            "Detail",
            { $template: "Separator" }
            , "Info"
        ],
        on: {
            onItemClick: function (id) {
                debugger;
                var context = this.getContext();
                var RowId = context.id.row;
                var SelRow = $$("gridSplitQty").getItem(RowId);
                SelRow.ixSpltCorr = id;
                $$("gridSplitQty").editCell(RowId, "ixQty", true, true)
                editor = $$("gridSplitQty").getEditor();                                
            },
            onBeforeShow: function (id, row) {
                debugger;
                $$("my_menu").clearAll();
                var context = this.getContext();
                var RowId = context.id.row;
                var ColumnId = context.id.column;
                if (ColumnId != "ixQty") return false;
                var SelRow = $$("gridSplitQty").getItem(RowId);
                var SplitSno = SelRow.ixSplitSNo;
                var QtySplitInd = SelRow.ixQtySplitInd;
                var menudata = [];
                if (SplitSno == 0 && QtySplitInd != 1) {
                    menudata.push({ value: "Quantity Split", id: "1" });
                    $$("my_menu").parse(menudata);
                }
                else if (SplitSno != 0 && QtySplitInd != 1) {
                    menudata.push({ value: "Quantity Split", id: "1" });
                    menudata.push({ value: "Quantity Correction", id: "2" })
                    $$("my_menu").parse(menudata);
                }
                else return false;
                
                //menudata.push({ value: "Column: " + pos.column });
                

            }
        }

    });

    $$('my_menu').attachTo($$('gridSplitQty'));
};
var fnLoadBillToSplit = function () {
    debugger;
    $$("gridSplitQty").clearAll();
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADBILLTOSPLIT",
        COMPID: CompId,
        KotnosString: window.Kot_No_String
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
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var OriginalKotNo = value.KOT_No;
                        var ManualKOTNo = value.MKOT_No;
                        var ItemName = value.Prod_Nm.toString().trim();
                        var Rate = value.Rate;
                        var Qty = value.Qty;
                        var SplitBill = value.Split_Bill_SNo;
                        var vValue = value.NetValue;
                        if (value.Net_Val == "0" || value.Net_Val == "") vValue = "0";
                        var ParentSplitNo = value.Parent_Split_No;                        

                        var SplitSNo = value.Split_SNo;
                        var QtySplitInd = value.Qty_Split_Ind
                        var ProdId = value.Prod_ID.toString().trim();
                        var CompId = value.Company_Id.toString().trim();
                        var UomId = value.Uom_Id.toString().trim();
                        var Sale_Disc_Per = value.Sale_Disc_Per;
                        var Cost_Per = value.Cost_Per;
                        var SrNo = value.SrNo;
                        var Prod_Gr_Id = value.Prod_Gr_Id.toString().trim();
                        var Prod_Sub_Gr_Id = value.Prod_Sub_Gr_Id.toString().trim();
                        var Tax_Struct_Id = value.Tax_Struct_Id.toString().trim();
                        var Bn_Bill_No = value.Bn_Bill_No;
                        if (Bn_Bill_No == "0") Bn_Bill_No = "";
                        var vConvRt = 0;
                        var vFornAmt = 0;
                        var CurrId = $("#BILLCURRID").val();
                        var vEdit = "1";
                        if (vValue == "0") vEdit = "0"; 
                        if (CurrId != "") {
                            vConvRt = window.ConvRt;
                            if (vConvRt == "" || vConvRt == 0) vConvRt = 1;
                            vFornAmt = parseFloat(vValue / vConvRt);
                        }
                        var set = {};
                        set = {
                            ixKotNo: ManualKOTNo, ixItem: ItemName, ixQty: Qty, ixRate: Rate, ixValue: vValue, ixSplitBll: SplitBill, ixParSplitNo: ParentSplitNo,
                            ixSplitSNo: SplitSNo, ixQtySplitInd: QtySplitInd, ixProdId: ProdId, ixSrNo: SrNo, ixCompId: CompId, ixUomId: UomId, ixMaxDiscPer: Sale_Disc_Per,
                            ixCostPer: Cost_Per, ixPrdGrpId: Prod_Gr_Id, ixPrdSGrpId: Prod_Sub_Gr_Id, ixTaxStuctId: Tax_Struct_Id, ixBillNo: Bn_Bill_No, ixFromRs: "RS",
                            ixOrgKotNo: OriginalKotNo, ixFornAmt: vFornAmt, ixOldQty: Qty, ixSpltCorr: "0", ixEditItm: vEdit

                        };
                        Rows.push(set);
                    });
                    $$("gridSplitQty").parse(Rows);

                }
                else {

                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });




};
var fnSaveSplitQtyBill = function () {
    debugger;
    $("#loading").show();
    var bSuc = 0;
    var gridSplitQty = $$("gridSplitQty").serialize();
    var gridCRec = $$("gridCRec").serialize();

    $.each(gridSplitQty, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
        });
    });

    $.each(gridCRec, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
        });
    });

    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;

    var newCovers = 0;
    newCovers = $$("txtCov").getValue();

    Request = {
        REQ_NM: "FNSAVESPLITQTYBILL",
        COMPID: CompId,
        gridSplitQty: gridSplitQty,
        gridCRec: gridCRec,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: true,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);                
                if (rowData = "1") {
                    bSuc = 1;
                    $$("SplitQtyPop").hide();
                    window.Disc_Clear_Mode_Set = "1";
                    fnLoadBillDet(CompId, ResNo, ResBlkId);
                    window.Disc_Clear_Mode_Set = "0";
                    $$("txtCov").setValue(newCovers);
                    $("#loading").hide();
                }
                else {
                    webix.message({
                        type: 'danger',
                        text: "Error - Kot Bill Split"
                    })
                    $("#loading").hide();
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
        }
    });   
    
};
var fnUpdateSplitBill = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    var bSuc = 0;
    if (window.Kot_No_String == "") return false;
    $("#loading").show();
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    var gridKot = $$("gridKot").serialize();

    Request = {
        REQ_NM: "FNUPDATESPLITBILL",
        COMPID: CompId,
        gridKot: gridKot,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: true,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData = "1") {
                    bSuc = 1;
                    fnLoadBillDet(CompId, ResNo, ResBlkId);
                    $("#loading").hide();
                }
                else {
                    webix.message({
                        type: 'danger',
                        text: "Error - Kot Bill Split"
                    })
                    $("#loading").hide();
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
        }
    });


};
var fnChkChkSerExmptClick = function () {
    debugger;    
    var CompId = $$("Property").getValue();
    var ResNo = window.ResNo;
    var ResBlkId = window.ResBlkId;
    gridMain = $$("gridMain").serialize(); 
    if (window.Kot_No_String != "") {
        if (ResNo != "") {
            if (gridMain.length > 0) {                
                fnLoadBillSNo(CompId, "C");
            }
        }
    }
};
var fnNotAllowedSingleQuote = function (code, e) {
    debugger;
    var charCode = e.which || e.keyCode;
    if (charCode == 222) return false;
    else return true;
};
var fnCardTypeChange = function () {
    debugger;
    $$("txtCardNo").setValue("");
    $$("txtMemb").setValue("");
    var CardTp = $$("ddlCardType").getValue();
    var gridCardTp = $$("gridCardTp").serialize();
    if (CardTp.trim() != "") {
        if (gridCardTp.length > 0) {
            var newData = gridCardTp.filter(function (el) {
                return el.id == CardTp;
            });
            if (newData.length > 0) {
                if (newData[0].C_NO_L1 != 0) {
                    $$("txtCardNo").config.attributes.maxlength = parseInt(newData[0].C_NO_L1);
                    $$("txtCardNo").refresh();
                }
                else {
                    $$("txtCardNo").config.attributes.maxlength = 5;
                    $$("txtCardNo").refresh();
                }

                if (newData[0].A_IND == 1) {
                    $$("txtMemb").show();
                    if (newData[0].C_NO_L2 != 0 && newData[0].V_IND == 2) {
                        $$("txtMemb").config.attributes.maxlength = parseInt(newData[0].C_NO_L2);
                        $$("txtMemb").refresh();
                    }
                    else {
                        $$("txtMemb").config.attributes.maxlength = 40;
                        $$("txtMemb").refresh();
                    }
                }
                else {
                    $$("txtMemb").hide();
                }
            }
        }
    }
};
var fnCardKeyDown = function (code, e) {
    debugger;
    var CardTp = $$("ddlCardType").getValue();
    var gridCardTp = $$("gridCardTp").serialize();
    var sPos = 0;
    var slen = 0;
    var mPos = 0;
    var mLen = 0;
    var charCode = e.which || e.keyCode;
    if (charCode == 222) return false;
    else if (charCode == 13) {
        if (CardTp.trim() != "") {
            if (gridCardTp.length > 0) {
                var newData = gridCardTp.filter(function (el) {
                    return el.id == CardTp;
                });
                if (newData.length > 0) {

                    if (newData[0].C_NO_S1 == 0) sPos = 1;
                    else sPos = newData[0].C_NO_S1;

                    if (newData[0].C_NO_L1 == 0) slen = 5;
                    else slen = newData[0].C_NO_L1;

                    if ($$("txtMemb").isVisible() == true) {
                        if (newData[0].C_NO_S2 == 0) mPos = 1;
                        else mPos = newData[0].C_NO_S2;
                        if (newData[0].C_NO_L2 == 0) mLen = 5;
                        else mLen = newData[0].C_NO_L2;

                        $$("txtMemb").setValue(sCardNo.substring(mPos - 1, mLen));
                    }

                    sCardNo = sCardNo.substring(sPos - 1, slen)
                    $$("txtCardNo").setValue(sCardNo);
                    sCardNo = "";
                }
            }
        }
    }
    else {

        if (((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57)) || charCode == 32)
            sCardNo = sCardNo + String.fromCharCode(charCode);

    }


};
var fnCardNoLostFocus = function (code, e) {
    debugger;
    var vCardNo = $$("txtCardNo").getValue();
    if ($$("ChkCard").getValue() == "0") return false;
    if ($$("txtCardNo").getValue() == "") return false;
    var CardTp = $$("ddlCardType").getValue();
    var gridCardTp = $$("gridCardTp").serialize();
    if (gridCardTp.length > 0) {
        var newData = gridCardTp.filter(function (el) {
            return el.id == CardTp;
        });
        if (newData.length > 0) {
            if(newData[0].V_IND==1){
                CompId = $$("Property").getValue();
                Request = {
                    REQ_NM: "FNRETLAYALCARDMEMBDET",
                    COMPID: CompId,
                    CARD_TP: CardTp,
                    CARD_NO: vCardNo
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
                            if (rowData.length>0){                                
                                $$("txtMemb").setValue(rowData[0].L_Nm);
                            }
                            else{
                                webix.message({ type: 'warning', text: 'Card Not Found' });
                                webix.UIManager.setFocus($$("txtCardNo"));
                                $$("txtCardNo").setValue("");
                                $$("txtMemb").setValue("");
                            }
                        }
                        else{
                            webix.message({ type: 'warning', text: 'Card Not Found' });
                            webix.UIManager.setFocus($$("txtCardNo"));
                            $$("txtCardNo").setValue("");
                            $$("txtMemb").setValue("");
                        }
                    },                
                    error: function (request, status, error) {
                        console.log("Error Failrue");
                    }
                })
            }
        }
    }
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

////webix.protoUI({
////    name: "fadeInWindow",
////    $init: function () {
////        this.$ready.push(function () {
////            this.attachEvent("onShow", function () {
////                this.$view.className = this.$view.className.split("animated")[0] + " animated zoomIn";
////            })
////            this.attachEvent("onHide", function () {
////                this.$view.style.display = "block";
////                this.$view.className += " animated zoomOut";
////            })
////        });
////    }
////}, webix.ui.window);





