var SelectedColumn = "";
var mode = "";
var rsPk =[];
var Kot_Amend_dt="";
var Kot_Amend_Sts="";
var fnGetApplUser = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNGETAPPLUSER",
        COMPID: CompId,
        PRGRMLNKID: "BQMNUTRNBQKOTCHRG"
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

    $('#imgKotSrc').hide();
    $('#imgReserv').show();
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
    
    $$("txtNcType").enable();
    $$("txtReason").enable();
    $('#imgKotSrc').show();
    $('#imgReserv').hide();
    $$("txtCovers").enable();

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

    DisableMode();
    $$("txtNcType").disable();
    $$("txtReason").disable();
    $('#imgKotSrc').show();
};
var RefreshMode = function () {
    if (fnChkSessVal() == false) return;
    $('#DivNcTy').hide();
    $('#DivNcRes').hide();
    $('#imgKotDtup').hide();
    $('#imgKotDtDn').hide();

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
    $$("ddlCategory").setValue("");
    $$("ddlChargeTy").setValue("");
    $$("FnDt").setValue("");
    ClearControl();
    DisableMode();
};
var DisableMode = function () {
    $$("FnDt").disable();
    $$("ddlCategory").disable();
    $$("ddlChargeTy").disable();
    $$("txtCovers").disable();
    $$("ddlSteward").disable();
    $('#imgKotSrc').hide();
    $('#imgReserv').hide();
};
var EnableMode = function () {
    $$("FnDt").enable();
    $$("ddlCategory").enable();
    $$("ddlChargeTy").enable();
    $$("txtCovers").enable();
    $$("txtNcType").enable();
    $$("txtReason").enable();
    $$("ddlSteward").enable();

    $('#imgKotSrc').show();
    $('#imgReserv').show();
};
var ClearControl = function () {
    debugger;
    $$("ddlCategory").setValue("");
    $$("ddlChargeTy").setValue("");
    $$("FnDt").setValue("");
    $$("txtCovers").setValue("");
    $$("txtNcType").setValue("");
    $$("txtReason").setValue("");    
    $$("txtResNo").setValue("");
    $$("txtfunction").setValue("");
    $$("txtGuest").setValue("");
    $$("txtKotNo").setValue("");
    $$("txtKotDt").setValue("");
    $$("txtVenue").setValue("");
    $$("txtSession").setValue("");
    $$("txtCurrency").setValue("");
    $$("txtCurrencyId").setValue("");
    $$("txtConvRt").setValue("");    
    $$("txtBs").setValue("");
    $$("txtMarkId").setValue("");
    $$("gridMain").editStop();
    $$("gridMain").clearAll();
    $$("gridTemp").clearAll();
    $("#SessionId").val("");
    $("#VenueId").val("");
    $("#FunctionId").val("");
    $("#OrgkotNo").val("");
    $$("txtCurrency").hide();
    $$("ddlSteward").setValue("");
    Kot_Amend_dt = "";
    Kot_Amend_Sts = "";
    rsPk =[];
    fnAddRow();

};
var GridmainDesign = function() {
    debugger;
    var searchicon = "<span class=' fas fa-search ' ></span>";
   
    //var searchicon1 = "<span class='fa fa-trash ' ></span>";
    var Resicon = "<span class='fas fa-registered' ></span>";
   
    var Oicon = "<span class='far fa-circle' > </span >";
   
    webix.ui({
        id: "gridMain",
        container: "divGrid",
        select: 'row',
        view: "datatable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        editable: true,
        ///width: 1000,
        position: "flex",
        css: "webix_header_border wingrd_hight",
        data: [],
        columns: [

            { id: "ixTy", header: ['Type', ], width: 100, css: { 'text-align': 'left ! important', }, },
            {
                header: "", id: "ixResrvItemButt", header: { text: "", }, template: Resicon, width: 40, css: { 'text-align': 'center ! important', 'padding': '0px ! important' },
            },
            { id: "ixItemNm", header: ['Item Name', ], width: 300, css: { 'text-align': 'left ! important', }, },
            {
                header: "", id: "ixItemButt", header: { text: "", }, template: searchicon, width: 40, css: { 'text-align': 'center ! important', 'padding': '0px ! important' },
            },
            {
                header: "", id: "ixOpenItemButt", header: { text: "", }, template: Oicon, width: 40, css: { 'text-align': 'center ! important', 'padding': '0px ! important' },
            },
            {
                id: "ixQty", header: 'Qty', width: 170, css: { 'text-align': 'right ! important', }, editor: "text", liveEdit: true,
                format: function (value) {
                    return webix.Number.parse(value, {
                        groupDelimiter: "",
                        groupSize: '',
                        decimalDelimiter: ".",
                        decimalSize: 2

                    });
                },
                editFormat: function (value) {
                    return webix.Number.parse(value, {
                        groupDelimiter: "",
                        groupSize: '',
                        decimalDelimiter: ".",
                        decimalSize: window.CURRENCY_DECIMLIMIT

                    });
                },
            },
            {
                id: "ixrate", header: 'Rate', width: 150, css: { 'text-align': 'right ! important', }, editor: "text", liveEdit: true,
                format: function (value) {
                    return fnCurrFormat(value);
                },
                //editParse: function (value) {
                //    return webix.Number.parse(value, webix.i18n);
                //},
                editFormat: function (value) {
                    return webix.Number.parse(value, {
                        groupDelimiter: "",
                        groupSize: '',
                        decimalDelimiter: ".",
                        decimalSize: window.CURRENCY_DECIMLIMIT

                    });
                },
            },
            {
                id: "ixValue", header: 'Value', width: 100, css: { 'text-align': 'right ! important', },
                format: function (value) {
                    return fnCurrFormat(value);
                },
            },

            { id: "ixTyIdHidd", header: 'TypeId', hidden: true, },
            { id: "ixGrpId", header: 'BN_GR_ID', hidden: true, },
            { id: "ixItemTy", header: 'BN_GR_ID', hidden: true, },
            { id: "ixProdGrIdHidd", header: 'PROD_GR_ID', hidden: true, },
            { id: "ixProdSubGrIdHidd", header: 'PROD_SGR_ID', hidden: true, },
            { id: "ixSaleTaxStructIdHidd", header: 'TAXSTID', hidden: true, },
            { id: "ixUomIdHidd", header: 'UOMID', hidden: true, },
            { id: "ixItemID", header: 'PROD_ID', hidden: true, },
            { id: "ixSaleCostPerHidd", header: 'COST_PER', hidden: true, },
            { id: "ixSaleDiscPerHidd", header: 'DISC_AMT', hidden: true, },
            { id: "ixRevId", header: 'REV_ID', hidden: true, },
            { id: "ixBnItemTy", header: 'BNITMTY', hidden: true, },
            { id: "ixSRNO", header: 'SR_NO', hidden: true, },

        ],
        data: [],    
        scheme: {
            $change: function (obj) {
                obj.ixValue = (obj.ixQty * 1) * (obj.ixrate * 1);
            },
        },

        on: {
            'onItemClick': function (id) {
                if (mode == "VIEW") return false;
                if (id.column == "ixItemButt") {
                    fnItmSrchBtnClick(id.row);
                    this.editStop();
                }
                else if (id.column == "ixResrvItemButt") {
                    fnResItmSrchBtnClick(id.row);
                    this.editStop();
                }
                else if(id.column=="ixOpenItemButt"){
                    fnOpenItmSrchBtnClick(id.row);
                    this.editStop()
                }
            },

            onLiveEdit: function (state, editor) {
                //debugger;
                var columnId = editor.column;
                var Row = editor.row;
                var SelRow = this.getItem(Row);
                var DiscAmt = SelRow.ixD_Amt;
                var DiscPer = SelRow.ixD_Disc;
                
                if (columnId == "ixQty") {
                    var value = state.value;                    
                    value = parseFloat(state.value);
                    if (value < 0) value = (value * -1);
                    if (value > 99999999.99) {
                        SelRow.ixQty = state.old;
                        editor.setValue(state.old);
                        this.editCancel();
                        //editor.focus();
                        this.editCell(Row, "ixQty", true, true)
                        editor = this.getEditor();
                        editor.getInputNode().selectionStart = state.old.length;

                    }
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);
                }
                if (columnId == "ixrate") {
                    debugger;
                    var value = state.value;
                    value = value.replace(/,/g, '');                    
                    value = parseFloat(state.value);
                    if (value < 0) value = (value * -1);
                    if (value > 999999999.99) {
                        SelRow.ixrate = state.old;
                        editor.setValue(state.old);
                        this.editCancel();
                        //editor.focus();
                        this.editCell(Row, "ixrate", true, true)
                        editor = this.getEditor();
                        editor.getInputNode().selectionStart = state.old.length;

                    }
                    this.updateItem(Row, SelRow);
                    this.refresh(Row);
                }
            },
            "onKeyPress": function (code, e) {
                debugger;
                var selRow = this.getSelectedItem();
                var rowid = selRow.id;
                var charCode = e.which || e.keyCode;

                var LastRowId = this.getLastId();
                if (charCode == 40 && rowid == LastRowId) {
                    return fnbtnAddRowClick();
                }

                if (e.ctrlKey == true && e.altKey == true && e.shiftKey == false && charCode==75) {
                    fnItmSrchBtnClick(rowid);
                }
                if (e.ctrlKey == true && e.altKey == true && e.shiftKey == false && charCode == 82) {
                    fnResItmSrchBtnClick(rowid);
                }
                if (e.ctrlKey == true && e.altKey == true && e.shiftKey == false && charCode == 79) {
                    fnOpenItmSrchBtnClick(rowid);
                }
                

                if (SelectedColumn == "ixQty" || SelectedColumn == "ixrate") {
                    var vVal = selRow[SelectedColumn];
                    if (e.key=="." && vVal.indexOf('.') >0) return false;
                    if (e.ctrlKey == true || e.metaKey == true || e.altKey == true || e.shiftKey == true ) {
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
            onAfterEditStart: function (id) {
                var getColumn = id.column;
                SelectedColumn = getColumn;
                if (getColumn == "ixQty" || getColumn == "ixrate") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 14);
                    this.getEditor().getInputNode().style.textAlign = "right";
                }               

            },
            onAfterEditStop: function (state, editor) {
                //debugger;
                if (editor.column == "ixQty") {
                    if (!(state.value) || state.value == 0) {
                        webix.message({ type: 'warning', text: 'Qty should be greater than 0' });
                        //this.editCell(editor.row, "ixrate");
                        PopValid = "1";
                        return false;
                    }
                }
                if (editor.column == "ixrate") {
                    if (!(state.value) || state.value == 0) {
                        webix.message({ type: 'warning', text: 'Rate should be greater than 0' });
                        //this.editCell(editor.row, "ixrate"); 
                        PopValid = "1";
                        return false;
                    }
                }
                
            },

            onBlur: function (prev_view) {
                //debugger;
                RowId = this.getSelectedItem();
                this.editStop()
                if (RowId) {
                    this.refresh(RowId)
                }
            },
            onBeforeEditStart: function (id) {
                //debugger;
                if (mode == "VIEW") return false;
                var item = this.getItem(id.row);
                if (id.column == "ixrate")
                {
                    if (window.Rate_Edit == "0") return false;
                }                
                
                if (id.column == "ixrate" || id.column == "ixQty") {
                    if (!(item.ixItemNm)) {                        
                        return false;
                    }                    
                }
                
            },
            "onFocus": function(current_view, prev_view){
                debugger;

            },
            onBeforeClose: function () {
                debugger;
                PopValid = "";
                return false;
            },
        }
    });

    webix.ui({
        id: "gridCurr",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "CURRID", },
                { id: "value", header: "CURRNM", },
                { id: "SHRT_NM", header: "SHRT_NM", },
                { id: "SALE_CONV_RATE", header: "SALE_CONV_RATE", },
                { id: "VAL_DECIM_LIMIT", header: "VAL_DECIM_LIMIT", },

        ],
        data: [],

    });

    webix.ui({
        id: "gridGrp",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "GrpId", },
                { id: "value", header: "GrpNm", },
                { id: "LINK_PROD_GR_ID", header: "LINK_PROD_GR_ID", },
                { id: "ITEM_TYPE", header: "ITEM_TYPE", }

        ],
        data: [],

    });

    webix.ui({
        id: "gridTemp",        
        select: 'row',
        view: "datatable",        
        autoConfig: true,
        hidden:true,
        css: "webix_header_border",
        data: [],
        columns: [            
            { id: "ixItemNm", header: ['Item Name', ], width: 300, css: { 'text-align': 'left ! important', }, },    
            { id: "ixQty", header: 'Qty', width: 170, css: { 'text-align': 'right ! important', }, editor: "text", liveEdit: true, },
            { id: "ixrate", header: 'Rate', width: 150, css: { 'text-align': 'right ! important', }, editor: "text", liveEdit: true,},                        
            { id: "ixUomIdHidd", header: 'UOMID', hidden: true, },
            { id: "ixItemID", header: 'PROD_ID', hidden: true, },            
            { id: "ixSRNO", header: 'SR_NO', hidden: true, },
        ],
        data: [],       
        
    });


};
var fnAddRow = function (index) {
    debugger;
    index = index || "";
    var set = {};
    set = {
        ixTy: "", ixItemNm: "", ixQty: "", ixrate: "", ixValue: "", ixTyIdHidd: "",ixGrpId:"",ixItemTy:"",ixProdGrIdHidd:"",ixProdSubGrIdHidd:"",ixSaleTaxStructIdHidd:"",
        ixUomIdHidd:"",ixItemID:"",ixSaleCostPerHidd:"",ixSaleDiscPerHidd:"",ixRevId:"",ixBnItemTy:"",ixSRNO:"",
    };
    if (index == "") $$("gridMain").add(set);
    else $$("gridMain").add(set, index);
    //$$("gridMain").select($$("gridMain").getLastId());
    //$$("gridMain").refresh();
    //webix.UIManager.setFocus($$("gridMain"));    

};
var fnCategoryChange = function (newVal){
    debugger;
    fnfDtChange();

    var catId = newVal;
    if (catId == "K") {
        $("#DivChrTy").show();
    }
    else {
        $("#DivChrTy").hide();
    }
    $$("gridMain").clearAll();
    $$("gridTemp").clearAll();
    fnAddRow();
    $$("gridGrp").clearAll();
    
    var vCompId = $$("Property").getValue();    
    var ItemType = fnLoadItemType(vCompId, catId);
    if (ItemType) {
        if (ItemType.length > 0) {            
            $$("gridGrp").parse(ItemType);
        }
    }
}


var PrcLoadReserveSrchPopup = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupReserveSrch",
        head: " Reservation Search",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 650,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "GvReserve",
                    select: "row",
                    data: [],
                    css: "webix_header_border",
                    columns: [
                        { id: "BLOCK_RESERVE_NO", header: ['Res No', ], width: 80, css: { 'text-align': 'center ! important', }, },
                        { id: "D_NO", header: ['F.P No', ], width: 70, css: { 'text-align': 'center ! important', }, },
                        { id: "GUEST_NM", header: 'Guest', fillspace: true, },
                        { id: "VENUE_NM", header: 'Venue', width: 160, },
                        { id: "SESSION_NM", header: 'Session', width: 120, },
                        { id: "VENUE_ID", header: 'VenueId', hidden: true, },
                        { id: "SESSION_ID", header: 'SessionId', hidden: true, },
                          { id: "GUAR_PAX", header: 'GUAR_PAX', hidden: true, },

                    ],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var id = selRow.id;
                            $$("PopupReserveSrch").hide();
                            fnRetResSearch(id);
                            $$("gridMain").select($$("gridMain").getFirstId());
                            webix.UIManager.setFocus($$("gridMain"));
                        },                        
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            $$("PopupReserveSrch").hide();
                            fnRetResSearch(id);
                            $$("gridMain").select($$("gridMain").getFirstId());                            
                            webix.UIManager.setFocus($$("gridMain"));
                        }
                    }
                },

            ],
        }
    });
};
var fnRetResSearch = function (id) {
    $$("gridMain").clearAll();
    $$("gridTemp").clearAll();
    fnAddRow();
    $$("txtfunction").setValue("");
    $$("txtGuest").setValue("");
    $$("txtVenue").setValue("");
    $$("txtSession").setValue("");
    $$("txtBs").setValue("");
    $$("txtMarkId").setValue("");
    $$("txtCurrency").setValue("");
    $$("txtCurrencyId").setValue("");
    $$("txtCurrency").hide();
    $$("txtConvRt").setValue("");
    $("#SessionId").val("");
    $("#VenueId").val("");
    $("#FunctionId").val("");
    var HeadData = $$("GvReserve").getItem(id);
    $$("txtResNo").setValue(HeadData.BLOCK_RESERVE_NO);
    if (HeadData.FUNCTION_NM) $$("txtfunction").setValue(HeadData.FUNCTION_NM);
    if (HeadData.GUEST_NM) $$("txtGuest").setValue(HeadData.GUEST_NM);
    if (HeadData.VENUE_NM) $$("txtVenue").setValue(HeadData.VENUE_NM);
    if (HeadData.SESSION_NM) $$("txtSession").setValue(HeadData.SESSION_NM);
    if (HeadData.SESSION_ID) $("#SessionId").val(HeadData.SESSION_ID);
    if (HeadData.VENUE_ID) $("#VenueId").val(HeadData.VENUE_ID);
    if (HeadData.FUNCTION_ID) $("#FunctionId").val(HeadData.FUNCTION_ID);    
    if (HeadData.BUSINESS_ID) $$("txtBs").setValue(HeadData.BUSINESS_ID);
    if (HeadData.MARKET_ID) $$("txtMarkId").setValue(HeadData.MARKET_ID);
    if (HeadData.GUAR_PAX) $$("txtCovers").setValue(HeadData.GUAR_PAX);
    if(window.FornCurAppl==1){
        if (HeadData.CUR_ID){
            if (HeadData.CUR_ID != window.BASE_CURRENCY){
                $$("txtCurrency").show();
                $$("txtCurrencyId").setValue(HeadData.CUR_ID);
                $$("txtConvRt").setValue(HeadData.CON_RT);
                vData = $$("gridCurr").serialize();
                var newData = vData.filter(function (el) {
                    return el.id == HeadData.CUR_ID;
                });
                if (newData.length > 0){
                    $$("txtCurrency").setValue(newData[0].value);
                }                
            }
        }
    }
    
}
var fnLoadGrid = function () {
    debugger;
    $$("GvReserve").clearAll();
    $("#loading").show();
    var obj = {};
    obj["COMPID"] = $$("Property").getValue();
    obj["REQ_NM"] = "LOADRESEVEGRD";
    obj["F_DT"] = $$("FnDt").getText();

    ////var filt1 = $$("txtfilRevNo").getValue();
    ////var filt2 = $$("txtfilFP").getValue();

    ////obj["RESNO"] = filt1;
    ////obj["FPNO"] = filt2;
    var rowData = [];

    requestData = JSON.stringify(obj);
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
                var GridData = rowData.TBLRESERVE;
                $$("GvReserve").parse(GridData);
                $$("GvReserve").refresh();
                if ($$("GvReserve").count()) {
                    $$("GvReserve").select($$("GvReserve").getFirstId());
                }                
                $("#loading").hide();
                //$("#DivReserve").modal('show');
                $$("PopupReserveSrch").show();
                webix.UIManager.setFocus($$("GvReserve"));
            }
            else {
                $$("PopupReserveSrch").hide();
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
            $$("PopupReserveSrch").hide();
        }
    });
};
var PrcLoadKotPopup = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupKotSrch",
        head: "Kot Search",
        position: "center",
        css: "WebIxStyle",
        height: 450,
        width: 300,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "GvKot",
                    select: "row",
                    data: [],
                    css: "webix_header_border",
                    columns: [
                        { id: "MKOT_NO", header: ['Kot No', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important', }, },
                        { id: "KOT_DT", header: ['Function Dt', { content: "textFilter" }], width: 110, fillspace: true, css: { 'text-align': 'center ! important', }, },
                        { id: "UPDATE_DT", header: 'Time', width: 70, },
                        { id: "KOT_NO", header: 'Kot No', hidden: true, },
                    ],
                    on: {
                        onEnter: function (event) {
                            debugger;                            
                            var selectedRows = this.getSelectedItem();
                            var KotNo = selectedRows.KOT_NO;
                            $$("PopupKotSrch").hide();
                            fnLoadMainGrid(KotNo);
                            
                        },                      

                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getItem(id);
                            debugger;
                            var KotNo = selectedRows.KOT_NO;
                            $$("PopupKotSrch").hide();
                            fnLoadMainGrid(KotNo);
                                                        
                        }
                    }
                },
            ],
        }
    });
};
var fnLoadKotGrid = function () {
    debugger;
    $$("GvKot").clearAll();
    $("#loading").show();
    var obj = {};
    obj["COMPID"] = $$("Property").getValue();
    obj["REQ_NM"] = "LOADKOTPOP";
    var rowData = [];

    requestData = JSON.stringify(obj);
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
                var GridData = rowData.TBLKOT;
                $$("GvKot").parse(GridData);
                $$("GvKot").refresh();
                $("#loading").hide();
                if ($$("GvKot").count()) {
                    $$("GvKot").select($$("GvKot").getFirstId());
                }                
                $$("PopupKotSrch").show();
                webix.UIManager.setFocus($$("GvKot"));
            }
            else {
                $$("PopupKotSrch").hide();
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
            $$("PopupKotSrch").hide();
        }
    });
};
var fnLoadMainGrid = function (KotNo) {
    debugger;
   
    ClearControl();
    
    $$("gridMain").clearAll();
    $$("gridTemp").clearAll();
    $("#loading").show();
    var obj = {};
    obj["COMPID"] = $$("Property").getValue();
    obj["REQ_NM"] = "LOADMAINGRID";
    obj["KOTNO"] = KotNo;
    obj["TaxInclusiveAppl"] = window.TaxInclusiveAppl;
    obj["FornCurAppl"] = window.FornCurAppl;
    obj["BaseCurId"] = window.BASE_CURRENCY;
    var rowData = [];
    requestData = JSON.stringify(obj);
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
                var GridData = rowData.KOTDET;
                var HeadData = rowData.KOT;
                var CurrNm = rowData.CURRENCY_NM;
                rsPk =rowData.rsPk;                
                Kot_Amend_dt = HeadData[0].UPDATE_DT;
                Kot_Amend_Sts = HeadData[0].STATUS_IND;
                $$("ddlCategory").setValue(HeadData[0].KOT_CAT);
                $$("ddlChargeTy").setValue(HeadData[0].KOT_TYPE);
                $$("FnDt").setValue(HeadData[0].KOT_DT);
                $$("txtResNo").setValue(HeadData[0].RESERVE_NO);
                $$("txtfunction").setValue(HeadData[0].FUNCTION_NM);
                debugger;
                $$("txtGuest").setValue(HeadData[0].GUEST_NM);
                $$("txtKotNo").setValue(HeadData[0].MKOT_NO);
                //$$("txtKotDt").setValue(HeadData[0].KOT_DT);
                $$("txtVenue").setValue(HeadData[0].VENUE_NM);
                $$("txtSession").setValue(HeadData[0].SESSION_NM);
                $$("txtCovers").setValue(HeadData[0].C_NO);
                if (HeadData[0].A_ID != null)
                    $$("txtNcType").setValue(HeadData[0].A_ID.trim());
                else
                    $$("txtNcType").setValue("");
                $$("txtReason").setValue(HeadData[0].C_NAR);

                if (HeadData[0].G_ID != null) $$("ddlSteward").setValue(HeadData[0].G_ID)

                if (HeadData[0].CUR_ID)
                {
                    $$("txtCurrency").setValue(CurrNm);
                    $$("txtCurrencyId").setValue(HeadData[0].CUR_ID);
                    $$("txtConvRt").setValue(HeadData[0].CON_RT);
                    $$("txtCurrency").show();
                    
                }            
                if (rowData.KOT_DT) $$("txtKotDt").setValue(rowData.KOT_DT)

                $("#SessionId").val(HeadData[0].SESSION_ID);
                $("#VenueId").val(HeadData[0].VENUE_ID);
                $("#FunctionId").val(HeadData[0].FUNCTION_ID);
                $("#OrgkotNo").val(HeadData[0].KOT_NO);
                debugger;
                ////fnCategoryChange();
                ////fnCharTyChange();
                $$("gridMain").clearAll();
                $$("gridMain").parse(GridData);
                $$("gridMain").refresh();
                fnCopyToTempgrid();
                if ($$("gridMain").count == 0) fnAddRow();
                $("#loading").hide();
                if ($$("gridMain").count()) $$("gridMain").select($$("gridMain").getFirstId());
                webix.UIManager.setFocus($$("gridMain"));
                    //$("#DivReserve").modal('show');
                
            }
            else {
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
        }
    });
};
var fnCopyToTempgrid = function () {
    $$("gridTemp").clearAll();
    $$("gridMain").data.each(function (obj) {
        debugger;
        var vItemId="";var vItemNm ="";var vQty="";
        var vRate="";var vvalue="";var vUom="";var SrNo = "";var header="";
        if(obj.ixItemNm) vItemNm =obj.ixItemNm;
        if (obj.ixItemID) vItemId = obj.ixItemID;        
        if(obj.ixQty) vQty =obj.ixQty;
        if (obj.ixrate) vRate = obj.ixrate;
        if (obj.ixUomIdHidd) vUom = obj.ixUomIdHidd;
        if (obj.ixSRNO) SrNo = obj.ixSRNO;
        var set = {};
        set = {
            ixItemNm: vItemNm, ixItemID: vItemId, ixQty: vQty, ixrate: vRate, ixUomIdHidd: vUom,  ixSRNO: SrNo,
        };
        $$("gridTemp").add(set);
        $$("gridTemp").refresh();
    })
}
var fnCopyToTempgridNew = function () {    
    $$("gridMain").data.each(function (obj) {
        debugger;
        var vItemId = ""; var vItemNm = ""; var vQty = "";
        var vRate = ""; var vvalue = ""; var vUom = ""; var SrNo = ""; var header = "";
        if (obj.ixItemNm) vItemNm = obj.ixItemNm;
        if (obj.ixItemID) vItemId = obj.ixItemID;
        if (obj.ixQty) vQty = obj.ixQty;
        if (obj.ixrate) vRate = obj.ixrate;
        if (obj.ixUomIdHidd) vUom = obj.ixUomIdHidd;
        if (obj.ixSRNO) SrNo = obj.ixSRNO;
        if (SrNo == "") {
            var set = {};
            set = {
                ixItemNm: vItemNm, ixItemID: vItemId, ixQty: vQty, ixrate: vRate, ixUomIdHidd: vUom,  ixSRNO: SrNo,
            };
            $$("gridTemp").add(set);
            $$("gridTemp").refresh();
        }
    })
}
var fnLoadItemType = function (CompId,CatId) {
    Request = {
        REQ_NM: "FNLOADKOTBNGRP",
        COMPID: CompId,
        CAT_ID: CatId,        
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
var fnItmSrchBtnClick = function (RowId) {
    debugger;
    if (fnChkSessVal() == false) return;
    if ($$("txtResNo").getValue() == "")
    {
        webix.message({ type: 'warning', text: 'Reservation No. can not e empty' });        
        webix.UIManager.setFocus($$("txtResNo"));
        return false;        
    }
    $$("ChkActive").setValue(1);
    //$$("gridGrp").clearAll();
    $$("ddlType").define("options", []);
    var vCompId = $$("Property").getValue();
    var catId = $$("ddlCategory").getValue();
    //var ItemType = fnLoadItemType(vCompId, catId);
    var ItemType = $$("gridGrp").serialize();
    ItemType.splice(0, 0, {value:"<-ALL->",id:"<-ALL->",LINK_PROD_GR_ID:'',ITEM_TYPE:''});
    if (ItemType) {
        if (ItemType.length > 0) {
            $$("ddlType").define("options", ItemType);
            //if ($$("ddlType").count > 0)            
            
            $$("ddlType").setValue("");                     
            //$$("gridGrp").parse(ItemType);
        }
    }

    var SelRow=$$("gridMain").getItem(RowId);
    var vGrpID = SelRow.ixGrpId;
    var vItemType=SelRow.ixItemTy;
    var vTyId = SelRow.ixTyIdHidd;
    if (vTyId != "") $$("ddlType").setValue(vTyId);
    else $$("ddlType").setValue("<-ALL->");
    $$("ItemSrchPop").show();
    webix.UIManager.setFocus($$("gridItemSrch"));

};
var fnItemSrchWindowLoad= function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ItemSrchPop",
        head: " Item Search",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 450,
        move: true,
        body: {
            rows: [
                {
                    padding: { top: 20, left: 30, bottom: 10, right: 10 },
                    width: 450,
                    rows: [                        
                        {                           
                            cols: [

                                {
                                    view: "richselect", id: "ddlType", label: "Type", labelWidth: 60, width: 250, on: {
                                        onChange: function (newVal, OldVal) {
                                            fnItemSrchLoadData();
                                        }
                                    }
                                },
                                { view: "checkbox", id: "ChkActive", labelWidth: 60, label: "Active", css: { "margin-left": "14px !important;" }, customCheckbox: false, click: function () { fnItemSrchLoadData(); } },
                            ]
                        },                        
                    ]
                },

                {
                    view: "datatable",
                    id: "gridItemSrch",
                    select: 'row',
                    css: "webix_header_border",                    
                    columns: [
                            { id: "ID", header: ["Item Id", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "NM", header: ["Item Name", { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, },                            
                            { id: "PROD_GR_ID", hidden: true },
                    ],
                    data: [],
                    
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var id = selRow.id;
                            $$("ItemSrchPop").hide();
                            fnItemSrchRet(id);
                        },                        

                        'onItemDblClick': function (id) {
                            debugger;
                            $$("ItemSrchPop").hide();
                            fnItemSrchRet(id);                          
                            
                        },
                    },
                },

            ],
        }
    });
};
var fnItemSrchLoadData = function () {
    debugger;
    var GROUP = $$("ddlType").getText();
    if (GROUP == "") return ;
    $$("gridItemSrch").clearAll();
    $$("gridItemSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    var GROUPID = $$("ddlType").getValue();
    var CAT_ID = $$("ddlCategory").getValue();
    var chkActive = $$("ChkActive").getValue();
    if (GROUPID == "<-ALL->") GROUPID = "";
    else {
        if (CAT_ID.toString().trim() == "K") {
            vData = $$("gridGrp").serialize();
            var newData = vData.filter(function (el) {
                return el.id == GROUPID;
            });
            if (newData.length > 0) GROUPID = newData[0].LINK_PROD_GR_ID;
        }
    }

    $("#loading").show();

    Request = {
        REQ_NM: "FNLOADKOTPROD",
        COMPID: CompId,
        GROUPID: GROUPID,
        BN_OUTLET_ID: window.BN_OUTLET_ID,
        CAT_ID:CAT_ID,
        chkActive: chkActive
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
                if (rowData.length > 0) {
                    $$("gridItemSrch").parse(rowData);
                    $$("gridItemSrch").refresh();
                    if ($$("gridItemSrch").count()) {
                        $$("gridItemSrch").select($$("gridItemSrch").getFirstId());
                    }
                }
                $("#loading").hide();
            }
            else {
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
    //return rowData;
}
var fnItemSrchRet = function (RowId) {
    debugger;
    var selRow = $$("gridItemSrch").getItem(RowId);
    var vId = selRow.ID;
    var vNm = selRow.NM;
    var vTy = selRow.PROD_GR_ID;
    var selRow1 = $$("gridMain").getSelectedItem();
    var RowId1 = selRow1.id;
    var vTyId="";
    selRow1.ixItemID = vId;
    selRow1.ixItemNm = vNm;    
    vData = $$("gridGrp").serialize();
    if ($$("ddlCategory").getValue() == "K") {        
        var newData = vData.filter(function (el) {
            return el.LINK_PROD_GR_ID == vTy;
        });
    }
    else {
        var newData = vData.filter(function (el) {
            return el.id == vTy;
        });
    }
    if (newData.length > 0) {
        selRow1.ixTy=newData[0].value;
        selRow1.ixTyIdHidd=newData[0].id;
        selRow1.ixItemTy=newData[0].ITEM_TYPE;               
    }  
     
    $$("gridMain").updateItem(RowId1, selRow1);
    $$("gridMain").refresh(RowId1);
    selRow1 = $$("gridMain").getSelectedItem();
    vTyId = selRow1.ixItemTy;
    if (vTyId == "P") {
        fnLoadKOTProdDet(RowId1);
    }
    else if (vTyId == "B") {
        fnLoadKOTItemDet(RowId1);
    }
    
    vTyId = selRow1.ixTyIdHidd;
    if (vTyId == "V" || vTyId == "P") {
        fnLoadRateDet(RowId1);
    }
    debugger;
    $$("gridMain").editCell(RowId1, "ixQty");
    webix.UIManager.setFocus($$("gridMain"));
    

}
var InitVariables = function () {
    window.M_TAX = ""; window.BASE_CURRENCY = ""; window.CURR_DT = ""; window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = ""; window.CURRENCY_DECIMLIMIT = ""; window.FornCurAppl = "";
    window.BN_OUTLET_ID = ""; window.B_IND = ""; window.A_IND = ""; window.Usr_log_ind = "";
    window.C_IND = ""; window.AA_ID = ""; window.MultiPlnInd = ""; window.D2_IND = "";
    window.VenInd = ""; window.UniqueInd = ""; window.M2_IND = ""; window.TaxInclusiveAppl = "";
    window.BN_E_IND = "", window.BN_V_D_IND = "";  window.BN_VAT_ID1 = ""; window.BN_VAT_ID2 = "";
    window.PS_G_IND = ""; window.PS_H_IND = "";
}
var LoadInds = function (CompId) {
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQ_NM"] = "FNGETLOADKOTCONT";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);

            window.BASE_CURRENCY = Detemp.RA[0].BASE_CURRENCY_ID.toString().trim();
            window.CURR_DT = Detemp.RA[0].CURDT1;            
            window.CURRENCY_FORMAT = Detemp.RA[0].CURRENCY_FORMAT;
            window.CURRENCY_DELIMIT = Detemp.RA[0].CURRENCY_DELIMIT;
            window.CURRENCY_DECIMLIMIT = Detemp.RA[0].VAL_DECIM_LIMIT;
            window.M_TAX = Detemp.RA[0].M_TAX;
            window.Usr_log_ind = Detemp.RA[0].R4_ID;

            window.B_IND = Detemp.RA3[0].B_IND;
            window.A_IND = Detemp.RA3[0].A_IND;
            window.C_IND = Detemp.RA3[0].C_IND;
            window.MultiPlnInd = Detemp.RA3[0].O_IND;
            window.D2_IND = Detemp.RA3[0].D2_IND;           
            window.VenInd = Detemp.RA3[0].O2_IND;
            window.UniqueInd = Detemp.RA3[0].U2_IND;
            window.AA_ID = Detemp.RA3[0].AA_ID;
            window.M2_IND = Detemp.RA3[0].M2_IND;
            window.TaxInclusiveAppl = Detemp.RA3[0].I3_IND;
            window.FornCurAppl = Detemp.RA3[0].P_IND;
            window.BN_OUTLET_ID = Detemp.RA3[0].BN_OUTLET_ID.toString().trim();

            window.BN_E_IND = Detemp.RA3[0].BN_E_IND;
            window.BN_V_D_IND = Detemp.RA3[0].V_D_IND;
            window.BN_VAT_ID1 = Detemp.RA3[0].V_ID1;
            window.BN_VAT_ID2 = Detemp.RA3[0].V_ID2;
            window.PS_G_IND = Detemp.RA3[0].G_IND;
            window.PS_H_IND = Detemp.RA3[0].H_IND;

            if (window.FornCurAppl == "1") $("#dvCurr").show();
            else $("#dvCurr").hide();

            if (window.AA_ID == "1") $("#dvStw").show();
            else $("#dvStw").hide();


        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    


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
var fnLoadKOTProdDet = function (RowId) {
    debugger;
    var bSuc = 0;
    var selRow = $$("gridMain").getItem(RowId);
    vItemId = selRow.ixItemID;
    if (vItemId == "") return false;
    CompId = $$("Property").getValue();
    selRow.ixProdGrIdHidd ="";
    selRow.ixProdSubGrIdHidd = "";
    selRow.ixSaleTaxStructIdHidd = "";
    selRow.ixSaleCostPerHidd = "";
    selRow.ixSaleDiscPerHidd = "";
    selRow.ixrate = "";
    selRow.ixUomIdHidd = "";
    selRow.ixRevId = "";
    selRow.ixBnItemTy = "";
    $$("gridMain").updateItem(RowId, selRow);
    var CUR_ID = $$("txtCurrencyId").getValue();

    selRow = $$("gridMain").getItem(RowId);
    
    Request = {
        REQ_NM: "FNLOADKOTPRODDET",
        COMPID: CompId,
        PROD_ID: vItemId,
        FornCurAppl: window.FornCurAppl,
        BaseCurId: window.BASE_CURRENCY,
        BN_OUTLET_ID: window.BN_OUTLET_ID,
        CUR_ID:CUR_ID,
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
                var vRate = parseFloat(rowData.vRate);
                selRow.ixrate = vRate.toFixed(window.CURRENCY_DECIMLIMIT);
                selRow.ixSaleCostPerHidd = rowData.vSaleCostPer;
                selRow.ixSaleTaxStructIdHidd = rowData.vSaleTaxStruct;
                selRow.ixSaleDiscPerHidd = rowData.vSaleDiscPer;
                selRow.ixUomIdHidd = rowData.vUomId;
                selRow.ixProdGrIdHidd = rowData.vProdGrId;
                selRow.ixProdSubGrIdHidd = rowData.vProdSubGrId;
                selRow.ixRevId = "";
                selRow.ixBnItemTy = "B";
                $$("gridMain").updateItem(RowId, selRow);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
   
};
var fnLoadKOTItemDet = function (RowId) {
    debugger;
    var bSuc = 0;
    var selRow = $$("gridMain").getItem(RowId);
    vItemId = selRow.ixItemID;
    vTypeHid = selRow.ixTyIdHidd;
    if (vItemId == "") return false;
    CompId = $$("Property").getValue();

    selRow.ixProdGrIdHidd = "";
    selRow.ixProdSubGrIdHidd = "";
    selRow.ixSaleTaxStructIdHidd = "";
    selRow.ixSaleCostPerHidd = "";
    selRow.ixSaleDiscPerHidd = "";
    selRow.ixrate = "";
    selRow.ixUomIdHidd = "";
    selRow.ixRevId = "";
    selRow.ixBnItemTy = "";

    vData = $$("gridGrp").serialize();
    var newData = vData.filter(function (el) {
        return el.id == vTypeHid;
    });
    if (newData.length > 0) selRow.ixProdGrIdHidd = newData[0].LINK_PROD_GR_ID;

    $$("gridMain").updateItem(RowId, selRow);
    
    selRow = $$("gridMain").getItem(RowId);

    Request = {
        REQ_NM: "FNLOADKOTITEMDET",
        COMPID: CompId,
        PROD_ID: vItemId,
        
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
                var vRate = parseFloat(rowData.vRate);
                selRow.ixrate = vRate.toFixed(window.CURRENCY_DECIMLIMIT);
                //selRow.ixrate = rowData.vRate;                
                selRow.ixSaleTaxStructIdHidd = rowData.vSaleTaxStruct;
                selRow.ixSaleDiscPerHidd = rowData.vSaleDiscPer;                
                selRow.ixBnItemTy = "B";
                $$("gridMain").updateItem(RowId, selRow);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

};
var fnLoadKOTOpenItmDet = function (RowId) {
    debugger;
    var bSuc = 0;
    var selRow = $$("gridMain").getItem(RowId);
    var vItemId = selRow.ixItemID;
    var vItemNm = selRow.ixItemNm;
    if (vItemNm == "") return false;
    CompId = $$("Property").getValue();
    selRow.ixProdGrIdHidd = "";
    selRow.ixProdSubGrIdHidd = "";
    selRow.ixSaleTaxStructIdHidd = "";
    selRow.ixSaleCostPerHidd = "";
    selRow.ixSaleDiscPerHidd = "";
    selRow.ixrate = "";
    selRow.ixUomIdHidd = "";
    selRow.ixRevId = "";
    selRow.ixBnItemTy = "";
    $$("gridMain").updateItem(RowId, selRow);
    var CUR_ID = $$("txtCurrencyId").getValue();   
    selRow = $$("gridMain").getItem(RowId);

    Request = {
        REQ_NM: "FNLOADKOTOPENITMDET",
        COMPID: CompId,
        PROD_ID: vItemId,
        PROD_NM:vItemNm,
        FornCurAppl: window.FornCurAppl,
        BaseCurId: window.BASE_CURRENCY,
        BN_OUTLET_ID: window.BN_OUTLET_ID,
        CUR_ID: CUR_ID,
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
                selRow.ixrate = rowData.vRate;
                selRow.ixSaleCostPerHidd = rowData.vSaleCostPer;
                selRow.ixSaleTaxStructIdHidd = rowData.vSaleTaxStruct;
                selRow.ixSaleDiscPerHidd = rowData.vSaleDiscPer;                
                selRow.ixProdGrIdHidd = rowData.vProdGrId;
                selRow.ixProdSubGrIdHidd = rowData.vProdSubGrId;
                selRow.ixRevId = "";
                selRow.ixBnItemTy = "B";
                $$("gridMain").updateItem(RowId, selRow);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

};
var fnLoadRateDet = function (RowId) {
    debugger;
    var bSuc = 0;
    var selRow = $$("gridMain").getItem(RowId);
    var vItemId = selRow.ixItemID;
    var vTyId = selRow.ixTyIdHidd;    
    if (vItemId == "") return false;
    var CompId = $$("Property").getValue();
    var Session = $("#SessionId").val();
    var Venue = $("#VenueId").val();
    var CUR_ID = $$("txtCurrencyId").getValue();
    var FuncDt = $$("FnDt").getText();
    var ResNo = $$("txtResNo").getValue();
    Request = {
        REQ_NM: "FNLOADRATEDET",
        COMPID: CompId,
        PROD_ID: vItemId,
        FornCurAppl: window.FornCurAppl,
        BaseCurId: window.BASE_CURRENCY,        
        CUR_ID: CUR_ID,
        vTyId: vTyId,
        ResNo:ResNo,
        FuncDt:FuncDt,
        Session:Session,
        Venue:Venue,
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
                if (rowData.bFill == "1") {                    
                    selRow.ixrate = rowData.vRate;
                    if (vTyId == "P") {
                        if (rowData.vQty) selRow.ixQty = rowData.vQty;
                    }
                    $$("gridMain").updateItem(RowId, selRow);
                    $$("gridMain").refresh(RowId);
                }                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

};
var fnResItemSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ItemResSrchPop",
        head: "Reserved Item",
        position: "center",
        css: "WebIxStyle",
        height: 450,
        
        move: true,
        body: {
            rows: [
                {
                    padding: { top: 20, left: 30, bottom: 10, right: 10 },
                    
                    rows: [
                        {
                            cols: [

                                {
                                    view: "richselect", id: "ddlRType", label: "Type", labelWidth: 60, width: 250, on: {
                                        onChange: function (newVal, OldVal) {
                                            fnResItemSrchLoadData();
                                        }
                                    }
                                },
                                { view: "checkbox", id: "ChkRActive", labelWidth: 60, label: "Active", css: { "margin-left": "14px !important;" }, customCheckbox: false, click: function () { fnResItemSrchLoadData(); } },
                            ]
                        },
                    ]
                },

                {
                    view: "datatable",
                    id: "gridResItemSrch",
                    select: 'row',
                    width: 650,
                    css: "webix_header_border",
                    padding: { left: 10, right: 20 },
                    columns: [
                            { id: "ixItemTy", header: ["Type", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "ixItemID",hidden:true, },
                            { id: "ixItemNm", header: ["Item Name", { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixItemQty", header: "Qty", width: 100, css: { 'text-align': 'right ! important' }, },
                            { id: "ixItemRt", header: "Rate", width: 100, css: { 'text-align': 'right ! important' }, },
                            { id: "ResItmChk",header:"", editor: "Checkbox",width: 30, css: "check_box", template: "{common.checkbox()}" },
                            { id: "ixItemGr", hidden: true },
                    ],                    
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            //fnItemResSrchRet(id);
                            //$$("ItemResSrchPop").hide();
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
                                fnResItemSrchRet();
                                $$("ItemResSrchPop").hide();
                            },
                            align: "right"
                        }
                    ]
                }

            ],
        }
    });
};
var fnResItmSrchBtnClick = function (RowId) {
    debugger;
    if (fnChkSessVal() == false) return;
    var Session = $("#SessionId").val();
    var Venue = $("#VenueId").val();
    var FuncDt = $$("FnDt").getText();
    var ResNo = $$("txtResNo").getValue();
    $$("ChkRActive").setValue(1);
    if (ResNo == "") {
        webix.message({ type: 'warning', text: 'Reservation No. can not e empty' });
        webix.UIManager.setFocus($$("txtResNo"));
        return;
    }
    if (FuncDt == "") return;
    if (Session == "") return;
    if (Venue == "") return;
    //$$("gridGrp").clearAll();
    $$("ddlRType").define("options", []);
    var vCompId = $$("Property").getValue();
    var catId = $$("ddlCategory").getValue();
    var ItemType = $$("gridGrp").serialize();
    ItemType.splice(0, 0, { value: "Package", id: "PK", LINK_PROD_GR_ID: '', ITEM_TYPE: '' });
    ItemType.splice(0, 0, { value: "<-ALL->", id: "<-ALL->", LINK_PROD_GR_ID: '', ITEM_TYPE: '' });
    if (ItemType) {
        if (ItemType.length > 0) {
            $$("ddlRType").define("options", ItemType);
            $$("ddlRType").setValue("");
        }
    }

    var SelRow = $$("gridMain").getItem(RowId);
    var vGrpID = SelRow.ixGrpId;
    var vItemType = SelRow.ixItemTy;
    var vTyId = SelRow.ixTyIdHidd;
    if (vTyId != "") $$("ddlRType").setValue(vTyId);
    else $$("ddlRType").setValue("<-ALL->");
    $$("ItemResSrchPop").show();

};
var fnResItemSrchLoadData = function () {
    debugger;
    var GROUP = $$("ddlRType").getText();
    if (GROUP == "") return;
    $$("gridResItemSrch").clearAll();
    $$("gridResItemSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    var GROUPID = $$("ddlRType").getValue();
    var CAT_ID = $$("ddlCategory").getValue();
    var SelRow = $$("gridMain").getSelectedItem();
    var vTyId = SelRow.ixTyIdHidd;
    var CUR_ID = $$("txtCurrencyId").getValue();
    var Session = $("#SessionId").val();
    var Venue = $("#VenueId").val();
    var FuncDt = $$("FnDt").getText();
    var ResNo = $$("txtResNo").getValue();
    var chkActive = $$("ChkRActive").getValue();
    var SelItmId = "";
    var SelItmNm = "";

    $$("gridMain").data.each(function (obj) {
        debugger;

        if (SelItmNm != "") {
            SelItmNm = SelItmNm + "," + obj.ixItemNm
        }
        else {
            SelItmNm = obj.ixItemNm
        }

        if (SelItmId != "") {
            SelItmId = SelItmId + ",'" + obj.ixItemID + "'"
        }
        else {
            SelItmId = "'" + obj.ixItemID + "'"
        }

    });

    if (GROUPID == "<-ALL->") GROUPID = "";

    $("#loading").show();

    Request = {
        REQ_NM: "FNLOADKOTRESPROD",
        COMPID: CompId,
        BN_OUTLET_ID: window.BN_OUTLET_ID,
        CAT_ID: CAT_ID,
        CUR_ID: CUR_ID,
        GROUPID: GROUPID,
        ResNo: ResNo,
        Session: Session,
        Venue: Venue,
        FuncDt: FuncDt,
        MultiPlnInd: window.MultiPlnInd,
        chkActive: chkActive,
        SelItmId: SelItmId,
        SelItmNm: SelItmNm,

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
                if (rowData.length > 0) {
                    $$("gridResItemSrch").parse(rowData);
                    $$("gridResItemSrch").refresh();
                    if ($$("gridResItemSrch").count()) {
                        $$("gridResItemSrch").select($$("gridResItemSrch").getFirstId());
                    }
                    webix.UIManager.setFocus($$("gridResItemSrch"));
                }
                $("#loading").hide();
            }
            else {
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
    //return rowData;
};
var fnResItemSrchRet = function () {
    var vItemId ="";
    var vItemNm="";
    var vQty="";
    var vItemGrId="";
    var vRate="";
    var vTyNm = "";
    var selRow = "";
    var RowId = "";    
    var i = 0;
    

    $$("gridResItemSrch").data.each(function (obj) {
        debugger;
        i += 1;
        vItemId = ""; vItemNm = ""; vQty = ""; vItemGrId = "";
        vRate = ""; vTyNm = "";
        var vChk = "0";
        if (obj.ResItmChk != null && obj.ResItmChk != "") vChk = obj.ResItmChk;
        if (vChk == "1") {
            if (obj.ixItemID != null && obj.ixItemID !="" ) vItemId = obj.ixItemID;
            if (obj.ixItemNm != null && obj.ixItemNm != "") vItemNm = obj.ixItemNm;
            if (obj.ixItemQty != null && obj.ixItemQty != "") vQty = obj.ixItemQty;
            if (obj.ixItemGr != null && obj.ixItemGr != "") vItemGrId = obj.ixItemGr;
            if (obj.ixItemRt != null && obj.ixItemRt !="") vRate = obj.ixItemRt;
            if (obj.ixItemTy != null && obj.ixItemTy != "") vTyNm = obj.ixItemTy;

            
            if (i == 1) {
                selRow = $$("gridMain").getSelectedItem();
                RowId = selRow.id;
            }
            else {
                var vIndex = $$("gridMain").getIndexById(RowId);
                vIndex += 1;
                if (vIndex == $$("gridMain").count()) fnAddRow();
                RowId = $$("gridMain").getNextId(RowId, 1);
                selRow = $$("gridMain").getItem(RowId);

            }
            var vTyId = "";
            selRow.ixItemID = "";
            selRow.ixTyIdHidd = "";
            selRow.ixGrpId = "";
            selRow.ixProdGrIdHidd = "";
            selRow.ixProdSubGrIdHidd = "";
            selRow.ixSaleCostPerHidd = "";
            selRow.ixSaleTaxStructIdHidd = "";
            selRow.ixSaleDiscPerHidd = "";
            selRow.ixrate = "";
            selRow.ixUomIdHidd = "";
            selRow.ixItemNm = "";
            selRow.ixQty = "";
            selRow.ixValue = "";

            selRow.ixTy = vTyNm;
            vData = $$("gridGrp").serialize();
            var newData = vData.filter(function (el) {
                return el.value == vTyNm;
            });

            if (newData.length > 0) {
                selRow.ixTyIdHidd = newData[0].id;
                selRow.ixItemTy = newData[0].ITEM_TYPE;
                selRow.ixGrpId = newData[0].LINK_PROD_GR_ID
            }
            if (vTyNm = "Package") selRow.ixTyIdHidd = "PK";
            selRow.ixItemID = vItemId;
            selRow.ixItemNm = vItemNm;
            selRow.ixQty = vQty;
            selRow.ixTyIdHidd = vItemGrId;

            $$("gridMain").updateItem(RowId, selRow);
            $$("gridMain").refresh(RowId);
            selRow = $$("gridMain").getItem(RowId);
            vTyId = selRow.ixItemTy;
            if (vItemId.toString().toUpperCase() == "OPEN") {
                fnLoadKOTOpenItmDet(RowId);
                selRow.ixrate = vRate;
                $$("gridMain").updateItem(RowId, selRow);
            }
            else {
                if ($$("ddlCategory").getValue() == "K") {
                    fnLoadKOTProdDet(RowId);
                    selRow.ixrate = vRate;
                    $$("gridMain").updateItem(RowId, selRow);
                }
                else {
                    fnLoadKOTItemDet(RowId);
                    selRow.ixrate = vRate;
                    $$("gridMain").updateItem(RowId, selRow);

                }
            }
        }
    });
    debugger;
    if (RowId) $$("gridMain").editCell(RowId, "ixQty");

};
var fnOpenItemSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "OpenItemSrchPop",
        head: "Open Item",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 450,
        move: true,
        body: {
            rows: [
                {
                    padding: { top: 20, left: 30, bottom: 10, right: 10 },
                    width: 450,
                    rows: [
                        {
                            view: "richselect", id: "ddlOType", label: "Type", labelWidth: 60, width: 250, on: {
                                onChange: function (newVal, OldVal) {
                                    fnOpenItemSrchLoadData();
                                }
                            }
                            
                        },
                    ]
                },

                {
                    view: "datatable",
                    id: "gridOpenItemSrch",
                    select: 'row',                    
                    css: "webix_header_border",
                    padding: { left: 10, right: 20 },
                    columns: [                            
                            { id: "ixItemID", hidden: true },
                            { id: "ixItemNm", header: ["Item Name", { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixSubGrNm", header: ["Sub Group", { content: "textFilter", }], width:200, css: { 'text-align': 'left ! important' }, },
                            { id: "ixBnGrId", header: "BnGrpId", hidden: true },
                            { id: "ixProdGrId", header: "ProdGrpId",hidden: true },
                            { id: "ixProdSubGrId", hidden: true },
                            
                    ],
                    data: [],
                    on: {
                        onEnter: function (event) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var id = selRow.id;
                            $$("OpenItemSrchPop").hide();
                            fnOpeItemSrchRet(id);                            
                        },                       
                        'onItemDblClick': function (id) {
                            debugger;
                            $$("OpenItemSrchPop").hide();
                            fnOpeItemSrchRet(id);                            
                        },
                    },
                },
                

            ],
        }
    });
};
var fnOpenItemSrchLoadData = function () {
    debugger;
    var GROUP = $$("ddlOType").getText();
    if (GROUP == "") return;
    $$("gridOpenItemSrch").clearAll();
    $$("gridOpenItemSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    var GROUPID = $$("ddlOType").getValue();
    var CAT_ID = $$("ddlCategory").getValue();
    var SelRow = $$("gridMain").getSelectedItem();
    var vTyId = SelRow.ixTyIdHidd;        
    if (GROUPID == "<-ALL->") GROUPID = "";
    $("#loading").show();
    Request = {
        REQ_NM: "FNLOADKOTOPENITEM",
        COMPID: CompId,        
        CAT_ID: CAT_ID,        
        GROUPID: GROUPID,                
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
                if (rowData.length > 0) {
                    $$("gridOpenItemSrch").parse(rowData);
                    $$("gridOpenItemSrch").refresh();
                    if ($$("gridOpenItemSrch").count()) {
                        $$("gridOpenItemSrch").select($$("gridOpenItemSrch").getFirstId());
                    }
                    
                }
                $("#loading").hide();
            }
            else {
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
    //return rowData;
};
var fnOpenItmSrchBtnClick = function (RowId) {
    debugger;
    if ($$("txtResNo").getValue() == "") {
        webix.message({ type: 'warning', text: 'Reservation No. can not e empty' });
        webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }
    
    $$("ddlOType").define("options", []);
    var vCompId = $$("Property").getValue();
    var catId = $$("ddlCategory").getValue();    
    var ItemType = $$("gridGrp").serialize();
    ItemType.splice(0, 0, { value: "<-ALL->", id: "<-ALL->", LINK_PROD_GR_ID: '', ITEM_TYPE: '' });
    if (ItemType) {
        if (ItemType.length > 0) {
            $$("ddlOType").define("options", ItemType);
            //if ($$("ddlType").count > 0)            

            $$("ddlOType").setValue("");
            //$$("gridGrp").parse(ItemType);
        }
    }
    var SelRow = $$("gridMain").getItem(RowId);
    var vGrpID = SelRow.ixGrpId;
    var vItemType = SelRow.ixItemTy;
    var vTyId = SelRow.ixTyIdHidd;
    if (vTyId != "") $$("ddlOType").setValue(vTyId);
    else $$("ddlOType").setValue("<-ALL->");
    $$("OpenItemSrchPop").show();
    webix.UIManager.setFocus($$("gridOpenItemSrch"));

};
var fnOpeItemSrchRet = function (RowId) {
    debugger;
    var selRow = $$("gridOpenItemSrch").getItem(RowId);
    var vId = selRow.ixItemID;
    var vNm = selRow.ixItemNm;
    var vTy = selRow.ixBnGrId;
    var selRow1 = $$("gridMain").getSelectedItem();
    var RowId1 = selRow1.id;
    var vTyId = "";
    selRow1.ixItemID = vId;
    selRow1.ixItemNm = vNm;

    $$("gridMain").updateItem(RowId1, selRow1);
    $$("gridMain").refresh(RowId1);    
    fnLoadKOTOpenItmDet(RowId1);

    selRow1 = $$("gridMain").getItem(RowId1);
    vData = $$("gridGrp").serialize();
    
    var newData = vData.filter(function (el) {
        return el.id == vTy;
    });
    
    if (newData.length > 0) {
        selRow1.ixTy = newData[0].value;
        selRow1.ixTyIdHidd = newData[0].id;
        selRow1.ixProdGrIdHidd = newData[0].LINK_PROD_GR_ID;
    }

    $$("gridMain").updateItem(RowId1, selRow1);
    $$("gridMain").refresh(RowId1);
    debugger;
    $$("gridMain").editCell(RowId1, "ixQty");
    webix.UIManager.setFocus($$("gridMain"));
    
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

    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    var CurrDecimal = window.CURRENCY_DECIMLIMIT;
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};
var fnbtnAddRowClick = function () {
    debugger;
    if (mode == "VIEW") return false;
    $$("gridMain").editStop();
    $$("gridMain").refresh();
    data = $$("gridMain").serialize();
    if (data.length > 0) {
        var newData = data.filter(function (el) {
            return el.ixTy=="" || el.ixItemId == "" || el.ixQty == "" || el.ixrate == "" || el.ixQty == 0 || el.ixrate == 0;
        });
        if (newData.length > 0) {
            return false;
        }
    }   

    fnAddRow();
    $$("gridMain").select($$("gridMain").getLastId());
    $$("gridMain").refresh();
    webix.UIManager.setFocus($$("gridMain"));    

};
var fnbtnDelRowClick = function () {
    debugger;
    if (mode == "VIEW") return false;
    $$("gridMain").editStop();
    $$("gridMain").refresh();
    fnCallDelRow();    
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
var fnKotbtnSave = function () {
    if (fnChkSessVal() == false) return;
    if (fnValidate() == false) {
        debugger;
        return false;
    }
    if (mode == "OPEN")
    {        
        $$("txtModReason").setValue("");
        $$("ReasPop").show();
        webix.UIManager.setFocus($$("txtModReason"));
    }
    else {
        fnKotSave();
    }

}
var fnKotSave = function () {   
    debugger;
    
    fnCopyToTempgridNew();
    var CompId = $$("Property").getValue();
    var CAT_ID = $$("ddlCategory").getValue();
    var CHAR_TP = $$("ddlChargeTy").getValue();
    var CUR_ID = $$("txtCurrencyId").getValue();
    var Session = $("#SessionId").val();
    var Venue = $("#VenueId").val();
    var FuncDt = $$("FnDt").getText();
    var ResNo = $$("txtResNo").getValue();
    var ConvRt = $$("txtConvRt").getValue();
    var mKotNo = $$("txtKotNo").getValue();
    var KotNo = $("#OrgkotNo").val();
    var Reason = $$("txtReason").getValue();
    var NC_TP = $$("txtNcType").getValue();
    var Covers = $$("txtCovers").getValue();
    var Steward = $$("ddlSteward").getValue();
    var FuncId = $("#FunctionId").val();
    var BaseCurId = window.BASE_CURRENCY;
    var sCurrentOperation = mode;
    var MarkId = $$("txtMarkId").getValue();
    var BsId = $$("txtBs").getValue();
    var gridMain = $$("gridMain").serialize();
    var KOT_DT = $$("txtKotDt").getValue();
    var gridTemp = $$("gridTemp").serialize();
    var Mod_Reason = "";
    if(mode=="OPEN")  Mod_Reason = $$("txtModReason").getValue();    

    $.each(gridMain, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
        });
    });

    Request = {
        REQ_NM: "FNKOTSAVE",
        COMPID: CompId,
        CAT_ID: CAT_ID,
        CHAR_TP: CHAR_TP,
        CUR_ID: CUR_ID,
        BaseCurId: BaseCurId,
        FuncId: FuncId,
        ResNo: ResNo,
        KotNo: KotNo,
        mKotNo: mKotNo,
        Session: Session,
        Venue: Venue,
        FuncDt: FuncDt,
        NC_TP: NC_TP,
        Covers: Covers,
        gridMain: gridMain,
        BsId: BsId,
        Steward: Steward,
        Reason: Reason,
        ConvRt: ConvRt,
        sCurrentOperation: sCurrentOperation,
        MarkId: MarkId,
        rsPk: rsPk,
        Kot_Amend_dt: Kot_Amend_dt,
        Kot_Amend_Sts: Kot_Amend_Sts,
        KOT_DT: KOT_DT,
        Mod_Reason: Mod_Reason,
        gridTemp: gridTemp,
    }
    $("#loading").show();
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
                if (rowData.bRet == "1") {
                    if (mode == "NEW") {
                        $$("txtKotNo").setValue(rowData.DISP_KOT_NO);
                    }
                    window.PRINT_KOT_NO = "";
                    $("#loading").hide();
                    if (mode == "NEW") {
                        if (window.B_IND == "1") {
                            window.PRINT_KOT_NO = rowData.KOT_NO;
                            $$("SavePop").show();                            
                        }
                        else {
                            webix.alert({
                                text: rowData.Message,
                                type: 'success',
                                ok: "OK",
                            }).then(function () {
                                debugger;
                                $("#REFRESH").click();
                            })
                        }
                    }
                    else {
                        webix.alert({
                            text: rowData.Message,
                            type: 'success',
                            ok: "OK",                            
                        }).then(function () {
                            debugger;
                            $("#REFRESH").click();
                        })
                    }
                }
                else {
                    webix.message({
                        type: 'danger',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#loading").hide();
                }

            }
            else {
                $("#loading").hide();
            }

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
};
function fnCallPrint(KOTNO) {
    debugger;
    var bVal = false;
    var PrintFlNm = "";

    PrintFlNm = window.BILL_PROG_NM;
    var CompId = $$("Property").getValue();

    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#loading").hide();
        return false;
    }   

    var Host = window.location.host;
    var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";
     
    var Mleft = (screen.width / 2) - (840 / 2);
    var Mtop = (screen.height / 2) - (550 / 2);
    window.open(PageUrl + "?KOTNO=" + KOTNO.toString().trim() + "&COMPID=" + CompId.toString().trim() + "&RPT=" + "BQKOT", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)
       

};
var fnSaveWindow = function () {

    webix.ui({
        view: "window",
        id: "SavePop",
        width: 300,
        position: "center",
        css: "WebIxStyle",
        headHeight: 5,
        body: {
            rows: [
                {
                    width: 250,

                    rows: [
                        { view: "template", height: 40, template: "Saved Successfully", css: { "text-align": "center !important;", "font-weight": "bold;", "font-size": "16px !important;" } },
                        {
                            height: 40,
                            cols: [
                                    {},
                                { view: "checkbox", id: "chkPrint", width: 100, labelWidth: 70, label: "Print Kot", css: { "text-align": "center !important;" }, customCheckbox: false, },
                                {}
                            ]
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
                                        if ($$("chkPrint").getValue() == "1") fnCallPrint(window.PRINT_KOT_NO);
                                        $("#REFRESH").click();
                                        $$("SavePop").hide();
                                    },
                                    align: "center"
                                }
                            ]
                        }

                    ]
                },

            ],
        }
    });
};
var fnValidate = function () {
    debugger;
    $$("gridMain").editStop();
    $$("gridMain").refresh();
    var data = $$("gridMain").serialize();
    var bVal = "";
    var Session = $("#SessionId").val();

    debugger;
    if ($$("ddlCategory").getValue() == "") {
        webix.message({ type: 'warning', text: 'Category can not be empty' });
        webix.UIManager.setFocus($$("ddlCategory"));
        return false;
    }

    if ($$("txtKotDt").getValue() == "") {
        webix.message({ type: 'warning', text: 'KOT Date can not be empty' });
        webix.UIManager.setFocus($$("txtKotDt"));
        return false;
    }

    if ($$("ddlChargeTy").getValue() == "") {
        webix.message({ type: 'warning', text: 'Charge Type can not be empty' });
        webix.UIManager.setFocus($$("ddlChargeTy"));
        return false;
    }
    if ($$("txtResNo").getValue() == "") {
        webix.message({ type: 'warning', text: 'Reservation No. can not be empty' });
        webix.UIManager.setFocus($$("txtResNo"));
        return false;
    }

    if (window.A_IND != "1")
    {
        if ($$("txtKotNo").getValue() == "") {
            webix.message({ type: 'warning', text: 'KOT No. can not be empty' });
            webix.UIManager.setFocus($$("txtKotNo"));
            return false;
        }
        var Venue = $("#VenueId").val();
        if (window.VenInd != "3") {
            Request = {
                REQ_NM: "FNKOTVALIDATE",
                COMPID: CompId,                
                KotNo: $$("txtKotNo").getValue(),
                Session: Session,
                Venue: Venue,
                VenInd: window.VenInd,
                sCurrentOperation: mode,
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
                        if (rowData.bRet == "0") {                            
                            webix.message({ type: 'warning', text: rowData.Message });
                            bVal = "0";
                        }
                    }
                },
                error: function (request, status, error) {
                    console.log("Error Failrue");
                    bVal = "0";
                }
            });
            if (bVal == "0") return false;
        }

    }

    if ($$("ddlChargeTy").getValue() == "N")
    {
        if ($$("txtReason").getValue() == "")
        {
            webix.message({ type: 'warning', text: 'Reason can not be empty' });
            webix.UIManager.setFocus($$("txtReason"));
            return false;
        }    

        if ($$("txtNcType").getValue() == "")
        {
            webix.message({ type: 'warning', text: 'Type can not be empty' });
            webix.UIManager.setFocus($$("txtNcType"));
            return false;
        }
    }   
    if (window.AA_ID == "1")
    {
        if ($$("ddlSteward").getValue() == "")
        {
            webix.message({ type: 'warning', text: 'Steward can not be empty' });
            webix.UIManager.setFocus($$("ddlSteward"));
            return false;
        }
    }
    bVal = "1";

    $$("gridMain").data.each(function (obj) {
        debugger;
        var vTyNm="";var vItemId="";var vItemNm ="";var vQty="";
        var vRate="";var vvalue="";var vItemType="";var column = "";var header="";
        if(obj.ixItemNm) vItemNm =obj.ixItemNm;
        if (obj.ixItemID) vItemId = obj.ixItemID;
        if(obj.ixTy) vTyNm =obj.ixTy;
        if(obj.ixQty) vQty =obj.ixQty;
        if(obj.ixrate) vRate =obj.ixrate;
        if (obj.ixValue) vValue = obj.ixValue;
        if (obj.ixTyIdHidd) vItemType = obj.ixTyIdHidd;
        
        if (vTyNm.trim() == "") {
            column = $$("gridMain").getColumnConfig("ixTy");
            header = column.header[0].text;
            webix.message({ type: 'warning', text: header + ' can not be empty' });
            $$("gridMain").editCell(obj.id, "ixTy");
            webix.UIManager.setFocus($$("gridMain"));
            bVal = "0";
            return false;            
        }

        if (vItemType.trim() == "P" &&  (!($$("txtCovers").getValue()) && $$("txtCovers").getValue() ==0)){
            webix.message({ type: 'warning', text: 'Covers can not be empty' });
            webix.UIManager.setFocus($$("txtCovers"));
            bVal = "0";
            return false;
        }

        if (vItemId.trim() == "") {
            column = $$("gridMain").getColumnConfig("ixTy");
            header = column.header[0].text;
            webix.message({ type: 'warning', text: header + ' can not be empty' });
            $$("gridMain").editCell(obj.id, "ixItemButt");
            webix.UIManager.setFocus($$("gridMain"));
            bVal = "0";
            return false;
        }
        if (vQty == "" || vQty<=0) {
            column = $$("gridMain").getColumnConfig("ixQty");
            header = column.header[0].text;
            webix.message({ type: 'warning', text: header + ' can not be empty' });
            $$("gridMain").editCell(obj.id, "ixQty");
            webix.UIManager.setFocus($$("gridMain"));
            bVal = "0";
            return false;
        }

        if (vRate == "" || vRate<=0) {
            column = $$("gridMain").getColumnConfig("ixrate");
            header = column.header[0].text;
            webix.message({ type: 'warning', text: header + ' can not be empty' });
            $$("gridMain").editCell(obj.id, "ixrate");
            webix.UIManager.setFocus($$("gridMain"));
            bVal = "0";
            return false;
        }

        if (vValue > 9999999999.9999) {
            webix.message({ type: 'warning', text: 'Value exceeds maximum limit' });
            $$("gridMain").editCell(obj.id, "ixrate");
            webix.UIManager.setFocus($$("gridMain"));
            bVal = "0";
            return false;
        }       

    });
    if (bVal == "0") return false;
    
};
var ReasPopWindowLoad = function () {
    webix.ui({
        view: "window",        
        id: "ReasPop",
        close: true,
        modal:true,
        head: "Reason",
        position: "center",
        css: "WebIxStyle",
        height: 200,
        width: 450,
        move: true,
        body: {
            padding: { top: 10, left: 10, bottom: 20, right: 10 },
            rows: [
                    { view: "text", id: "txtModReason", label: "Modify Reason", labelWidth: 130, attributes:{ maxlength:60 }, },                    
                    {
                        cols: [{}, {
                            view: "button", type: "icon",  icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                            click: function () {
                                if ($$("txtModReason").getValue() == "") {
                                    webix.message({ type: 'warning', text: 'Reason can not be empty' });
                                    webix.UIManager.setFocus($$("txtModReason"));
                                    return false;
                                }

                                $$("ReasPop").hide();
                                if (mode == "OPEN") fnKotSave();
                                else fnKotDelete();
                            }
                        }],
                    }
            ]
        }
    });
};
var fnbtnKotDeleteClick = function () {
    if (fnChkSessVal() == false) return;
    if ($$("txtKotNo").getValue() == "") {
        webix.message({ type: 'warning', text: 'KOT No. can not be empty' });
        webix.UIManager.setFocus($$("txtKotNo"));
        return false;
    }
    webix.confirm({
        title: "Confirmation",
        ok: "Yes", cancel: "No",
        text: "Are you sure you want to Delete?",
    }).then(function (result) {
        debugger;
        if (result == true) {
            $$("txtModReason").setValue("");
            $$("ReasPop").show();
            webix.UIManager.setFocus($$("txtModReason"));
        }
    })

};
var fnKotDelete = function () {    
    debugger;
    var CompId = $$("Property").getValue();   
    var KotNo = $("#OrgkotNo").val();
    var ResNo = $$("txtResNo").getValue();
    var Reason = $$("txtModReason").getValue();
    var gridMain = $$("gridMain").serialize();
    var KOT_DT = $$("txtKotDt").getValue();
    var gridTemp = $$("gridTemp").serialize();
    var mKotNo = $$("txtKotNo").getValue();
    var Mod_Reason = "";
    if (mode == "OPEN") Mod_Reason = $$("txtModReason").getValue();

    Request = {
        REQ_NM: "FNKOTDELETE",
        COMPID: CompId,        
        KotNo: KotNo,
        mKotNo:mKotNo,
        Reason: Reason,
        gridMain: gridMain,
        gridTemp: gridTemp,
        KOT_DT: KOT_DT,
        Mod_Reason: Mod_Reason,
        ResNo: ResNo,
    }
    $("#loading").show();
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
                if (rowData == "1") {                    
                    $("#loading").hide();
                    webix.message({
                        type: 'success',                        
                        text: "Deleted Successfully"
                    })
                    $("#REFRESH").click();
                }
                else {
                    webix.message({
                        type: 'danger',
                        text: "Error on Deletion",
                    })
                    bSuc = 0;
                    $("#loading").hide();
                }

            }
            else {
                $("#loading").hide();
            }

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
};
var fnfDtChange = function () {
    $$("txtResNo").setValue("");
    $$("gridMain").clearAll();
    $$("gridTemp").clearAll();
    fnAddRow();
    $$("txtfunction").setValue("");
    $$("txtGuest").setValue("");
    $$("txtVenue").setValue("");
    $$("txtSession").setValue("");
    $$("txtBs").setValue("");
    $$("txtMarkId").setValue("");
    $$("txtCurrency").setValue("");
    $$("txtCurrencyId").setValue("");
    $$("txtCurrency").hide();
    $$("txtConvRt").setValue("");
    $("#SessionId").val("");
    $("#VenueId").val("");
    $("#FunctionId").val("");
    $$("txtCovers").setValue("");


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



