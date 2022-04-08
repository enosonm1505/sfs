
var Current_Mode = "";
var SelectedColumn = "";

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divPartySubTy", view: "richselect", id: "ddlPartySubTy", label: "Party Sub Type", maxWidth: 350, labelWidth: 100, on: { onChange: function (newVal, OldVal) { fnPartySubTyIdChange(newVal); } }
    });         

    webix.ui({ container: "divBtnBlkEntry", id: "btnBlkEntry", view: "button", maxWidth: 110, label: "Bulk Entries", click: function () { fnbtnDisplayClick(); } });

    webix.ui({
        id: "gridTaxCat",        
        view: "datatable",        
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "ID", },
                { id: "value", header: "NAME", },                

        ],
        data: [],

    });

    webix.ui({
        id: "gridRegTp",        
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "ID", },
                { id: "value", header: "NAME", },                

        ],
        data: [],

    });

    webix.ui({
        id: "gridParty",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "ID", },
                { id: "value", header: "NAME", },
                { id: "TX_RG_NO", header: "TX_RG_NO", },
                

        ],
        data: [],

    });

};
function fnAsOnDtChange() {
    debugger;
    GridClear();
};
function fnPartySubTyIdChange(PartySubTyId) {
    GridClear();
    fnLoadGrid(PartySubTyId);   
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
        css: "webix_header_border",
        editable:true,
        data: [],
        columns: [

                { id: "ixSuppNm", header: 'Name', width: 300, css: { 'text-align': 'left ! important', }, },
                {
                    id: "ixTaxGrp", editor: "richselect", header: "Supplier Tax Group", width: 200, css: { 'text-align': 'left ! important', },
                    template: function (obj, common, val, config) {
                        //debugger;
                        if (val != "" && val != null) {
                            var data = config.collection;
                            var newData = data.filter(function (el) {
                                return el.id == val;
                            });
                            if (newData.length > 0) return newData[0].value + "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                            else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                        }
                        else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                    },
                    suggest: {
                        template: '#value#', //template of the input when editor is opened, default
                        filter: function (item, value) { //redefines default webix combo filter
                            if (item.value.toString().toLowerCase().indexOf(value.toLowerCase()) === 0) return true;
                            return false;
                        },
                        //body: {
                        //    yCount: 5,
                        //}
                    },
                },
                { id: "ixRegNo", header: 'Reg No', width: 200, css: { 'text-align': 'left ! important', }, editor: "text", liveEdit: true,  },
                { id: "ixBRN", header: 'BRN Number', width: 200, css: { 'text-align': 'left ! important', }, editor: "text", liveEdit: true, },
                { id: "ixTan", header: 'TAN Number', width: 200, css: { 'text-align': 'left ! important', }, editor: "text", liveEdit: true, },
                { id: "ixNatIdNo", header: 'National ID Number', width: 200, css: { 'text-align': 'left ! important', }, editor: "text", liveEdit: true, },
                { id: "ixTaxGrp1", hidden: true },
                { id: "ixRegNo1", hidden: true },
                { id: "ixBRN1", hidden: true },
                { id: "ixTan1", hidden: true },
                { id: "ixNatIdNo1", hidden: true },
                { id: "ixSuppId", hidden: true },
                { id: "ixupdate", hidden: true },                
                { id: "CLR", header: { text: "CLR", }, hidden: true },

            ],
        data: [],
        //rules:{
        //    "ixRegNo": isAlphaNumeric,
        //    "ixBRN": isAlphaNumeric
        //},
        on: {
            onAfterEditStart: function (id) {                
                var getColumn = id.column;
                SelectedColumn = getColumn;
                if (getColumn == "ixRegNo") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 15);
                    if (window.K_TAX_IND == "2" || window.K_TAX_IND == "3" || window.K_TAX_IND == "4" || window.TEMP_K_TAX_IND == "2" || window.TEMP_K_TAX_IND == "3" || window.TEMP_K_TAX_IND == "4") {
                        if (window.TX_LEN > 0) {
                            this.getEditor().getInputNode().setAttribute("maxlength", window.TX_LEN);
                        }
                    }                   
                    //this.getEditor().getInputNode().style.textAlign = "right";
                }
                else if (getColumn == "ixBRN" || getColumn == "ixTan" || getColumn == "ixNatIdNo") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 30);
                }
            },            
            'onBeforeEditStart': function (id) {
                //debugger;
                if (Current_Mode == "VIEW") return false;
                
                var row = this.getItem(id.row);
                var col = this.getColumnConfig(id.column);
                if (id.column == "ixTaxGrp" && window.PARTY_TY_ID == "S") {
                    var RegTp = $$("gridRegTp").serialize();
                    col.collection = RegTp;
                }
                else if (id.column == "ixTaxGrp" && window.PARTY_TY_ID == "C") {
                    var TaxCat = $$("gridTaxCat").serialize();
                    col.collection = TaxCat;
                }
                
               
            },

            'onBeforeEditStop': function (values, editor) {
                //debugger;                
                if (editor.column == "ixTaxGrp") {
                    if (values.value == null || values.value == "") {                                               
                        return false;                        
                    }
                }
                
            },

            'onPaste': function (vtext) {
                debugger;                
                alert(vtext);

            },

            "onKeyPress": function (code, e) {
                //debugger;
                //var selRow = this.getSelectedItem();
                //var rowid = selRow.id;
                //var charCode = e.which || e.keyCode;                
                
                // if ((e.shiftKey == false && charCode > 43 && charCode < 58) || // numeric (0-9)
                //    (e.shiftKey == false && charCode > 64 && charCode < 91) || // upper alpha (A-Z)
                //    (e.shiftKey == false && charCode > 96 && code < 123) || code == 188 || code == 189
                //     || charCode == 39 || charCode == 8 || charCode == 35 || charCode == 36 || charCode == 37 || charCode == 32 ) { // lower alpha (a-z)
                //    return true;
                //}
                //else {
                //    return false;
                //}
                
            },           

            onBlur: function () {
                this.editStop();
                this.refresh();
            },
        },
        scheme: {
            $change: function (item) {

                if (item.CLR != "" && item.CLR != null) {
                    debugger;
                    var Columns = $$('gridRpt').config.columns;
                    var ColCnt = Columns.length;
                    var rowid = item.id;
                    
                    item.$css = item.CLR;
                    
                }
            },
            
        },       


    });   

};

function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (code == 44 || code == 45 || code == 32) 
        {

        }
        else if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) ) { // lower alpha (a-z)
            debugger;
            return false;
        }        
    }
    return true;
};

//function equals(a, b) {
//    a = a.toString().toLowerCase();
//    return a.indexOf(b) !== -1;
//}

//$$("gridRpt").filterByAll = function () {
//    //get filter values
//    var text = $$("textField").getValue();
//    //unfilter for empty search text
//    if (!text) return $$("gridRpt").filter();

//    //filter using OR logic
//    $$("gridRpt").filter(function (obj) {
//        if (equals(obj.year, text)) return true;
//        if (equals(obj.title, text)) return true;
//        return false;
//    });
//};

var LoadInds = function (CompId) {
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQTYPE"] = "GET_FNGETLOADCONT";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            var Detemp = JSON.parse(d);
            window.BASE_CURRENCY = Detemp.RA[0].BASE_CURRENCY_ID.toString().trim();
            window.CURR_DT = Detemp.RA[0].CURDT1;
           
            window.M_TAX = Detemp.RA[0].M_TAX;
            window.TX_LEN = Detemp.RA[0].TX_LEN;
            window.K_TAX_IND = Detemp.RA[0].K_TAX;
            window.TEMP_K_TAX_IND = Detemp.RA[0].TEMP_K_TAX;
            if (Detemp.RA[0].A5_ID != null && Detemp.RA[0].A5_ID != "") window.TAX_CAPTION = Detemp.RA[0].A5_ID;

            window.CURRENCY_FORMAT = Detemp.RA[0].CURRENCY_FORMAT;
            window.CURRENCY_DELIMIT = Detemp.RA[0].CURRENCY_DELIMIT;
            window.CURRENCY_DECIMLIMIT = Detemp.RA[0].VAL_DECIM_LIMIT;
            

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });


    if (window.PARTY_TY_ID == "S") $$("gridRpt").getColumnConfig("ixTaxGrp").header[0].text = "Supplier Tax Group";
    else $$("gridRpt").getColumnConfig("ixTaxGrp").header[0].text = "Tax Category";

    if ((window.PARTY_TY_ID == "S") && (window.K_TAX_IND=="4" || window.TEMP_K_TAX_IND ==4))
    {
        $$("gridRpt").showColumn("ixBRN");
        $$("gridRpt").showColumn("ixTan");
        $$("gridRpt").showColumn("ixNatIdNo");
    }
    else {
        $$("gridRpt").hideColumn("ixBRN");
        $$("gridRpt").hideColumn("ixTan");
        $$("gridRpt").hideColumn("ixNatIdNo");
    }
};

function fnPropertyLoad(CompId) {
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_PROPERTYLOAD",
        COMPID: CompId,        
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function fnPropChange(CompId) {
    debugger;
    if (fnChkSessVal() == false) return;
    
    window.BASE_CURRENCY = "";
    window.CURR_DT = "";

    window.M_TAX = "";
    window.TX_LEN = "";
    window.K_TAX_IND = "";
    window.TEMP_K_TAX_IND = "";

    window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = "";
    window.CURRENCY_DECIMLIMIT = "";
    window.TAX_CAPTION = "VAT";

    Current_Mode = "";

    $$("gridRpt").editStop();


    ClearCont();    
    LoadInds();
    fnPartySubTyLoad();
    fnLoadTaxCat();
    fnLoadRegTy();    
    fnOpenMode();
    //fnShowColumn();
    debugger;   
    var col = $$("gridRpt").getColumnConfig("ixTaxGrp");
    if (window.PARTY_TY_ID == "S") {
        var RegTp = $$("gridRegTp").serialize();
        col.collection = RegTp;
    }
    else if (window.PARTY_TY_ID == "C") {
        var TaxCat = $$("gridTaxCat").serialize();
        col.collection = TaxCat;
    }
    
};
function fnPartySubTyLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_PARTYSUBTY",
        COMPID: CompId,
        PARTY_TY_ID: window.PARTY_TY_ID,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                options = rowData;
                options.splice(0, 0, { value: "Regular", id: "<-Regular->" });
                $$("ddlPartySubTy").define("options", options);
                //$$("ddlPartySubTy").setValue("<-Regular->")
            }
        },
    });

    //return rowData;
};

function fnLoadTaxCat() {
    $$("gridTaxCat").clearAll();
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_LOADTAXCAT",
        COMPID: CompId,
        PARTY_TY_ID: window.PARTY_TY_ID,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);                
                $$("gridTaxCat").parse(rowData);
                //$$("ddlPartySubTy").setValue("<-Regular->")
            }
        },
    });

    //return rowData;
};

function fnLoadRegTy() {
    $$("gridRegTp").clearAll();
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_LOADTAXREGTYP",
        COMPID: CompId,
        PARTY_TY_ID: window.PARTY_TY_ID,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("gridRegTp").parse(rowData);
                //$$("ddlPartySubTy").setValue("<-Regular->")
            }
        },
    });

    //return rowData;
};

function fnLoadPartyAll() {
    $$("gridParty").clearAll();
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_FNLOADPARTYALL",
        COMPID: CompId,
        PARTY_TY_ID: window.PARTY_TY_ID,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("gridParty").parse(rowData);
            }
        },
    });    
};

function fnLoadGrid(PARTY_SUB_TY_ID) {
    debugger;
    $$("gridRpt").clearAll();
    var CompId = $$("Property").getValue();
    
    if (PARTY_SUB_TY_ID == "") return false;
    var ReqNm = "";
    ReqNm = "GET_LOADPARTYTAXGRP"

    debugger;
    Request = {
        REQTYPE: ReqNm,
        COMPID: CompId,
        PARTY_SUB_TY_ID: PARTY_SUB_TY_ID,
        PARTY_TY_ID: window.PARTY_TY_ID,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridRpt").parse(rowData);
                $$("gridRpt").refresh();
                //$("#LoadDIv").hide();
            }
            else {
                //$("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            //$("#LoadDIv").hide();
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

function GridClear() {
    $$("gridRpt").editStop();
    $$("gridRpt").clearAll();
};

function ClearCont() {
    GridClear();
    $$("ddlPartySubTy").setValue("");
};

function fnOpenMode() {
    ClearCont();
    $$("ddlPartySubTy").enable();
    $$("gridRpt").enable();
    $("#OPEN").addClass("ClickBtn");
    $("#REFRESH").removeClass("ClickBtn");
    $("#OPEN").prop("disabled", true);
    $("#SAVE").prop("disabled", false);
    $("#VIEW").prop("disabled", true);

    Current_Mode = "OPEN";
    fnLoadPartyAll();
};

function fnViewMode() {
    ClearCont();
    $$("ddlPartySubTy").enable();
    $$("gridRpt").enable();
    $("#VIEW").addClass("ClickBtn");
    $("#REFRESH").removeClass("ClickBtn");
    $("#OPEN").prop("disabled", true);
    $("#SAVE").prop("disabled", true);
    $("#VIEW").prop("disabled", true);
    Current_Mode = "VIEW";
};

function fnRefresh() {
    ClearCont();
    $$("ddlPartySubTy").disable();
    $$("gridRpt").disable();

    $("#OPEN").prop("disabled", false);
    $("#SAVE").prop("disabled", true);
    $("#VIEW").prop("disabled", false);

    $("#OPEN").removeClass("ClickBtn");
    $("#SAVE").removeClass("ClickBtn");
    $("#VIEW").removeClass("ClickBtn");
    $("#REFRESH").addClass("ClickBtn");

    Current_Mode = "";

};

function fnChkSessVal() {
    debugger;
    var bVal = "0";
    $.ajax({
        async: false,
        url: "/Master/fnChkSessionval",
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

function fnValidation () {
    debugger;
    var bSuc = true;
    if (Current_Mode == "") {
        //webix.message({ type: 'warning', text: "Mode Cannot be Empty." });        
        return false;
    }

    var CompId = $$("Property").getValue();
    var PARTY_SUB_TY_ID = $$("ddlPartySubTy").getValue();
    $$("gridRpt").editStop();
    $$("gridRpt").refresh();

    if (!($$("ddlPartySubTy").getValue())) {
        webix.message({ type: 'warning', text: 'Party Sub Type can not be empty' });
        webix.UIManager.setFocus($$("ddlPartySubTy"));
        return false;
    }
    var gridData = $$("gridRpt").serialize();
    var gridParty = $$("gridParty").serialize();

    if (gridData.length == 0) {
        webix.message({ type: 'warning', text: 'No Record to Save' });
        return false;
    }

    if (window.K_TAX_IND=="3" || window.TEMP_K_TAX_IND =="3")
    {
        $.each(gridData, function (key, sVal) {
            //debugger;
            var vRegNo = "";            
            var vRegTy = "";
            var vSuppId = "";
            var RowId = sVal["id"];
            if (sVal["ixRegNo"] != null && sVal["ixRegNo"] != "") {
                vRegNo = sVal["ixRegNo"].toString().trim();
            }

            if (sVal["ixRegNo"] != null && sVal["ixRegNo"] != "") {
                vRegNo = sVal["ixRegNo"].toString().trim();
            }

            if (sVal["ixTaxGrp"] != null && sVal["ixTaxGrp"] != "") {
                vRegTy = sVal["ixTaxGrp"].toString().trim();
            }

            if (sVal["ixSuppId"] != null && sVal["ixSuppId"] != "") {
                vSuppId = sVal["ixSuppId"].toString().trim();
            }

            //if (vRegNo != "") {
            //    if (isAlphaNumeric(vRegNo) == false) {
            //        webix.message({ type: 'warning', text: 'Alpha Numeric Only allowed in Reg No Column '  });
            //        $$("gridRpt").clearSelection();
            //        webix.UIManager.setFocus($$("gridRpt"));
            //        $$("gridRpt").select(RowId);
            //        $$("gridRpt").showItem(RowId);
            //        $$("gridRpt").refresh();
            //        bSuc = false;
            //        return false;

            //    }
            //}

            if(vRegNo != "" && window.TX_LEN > 0)
            {
                if(vRegNo.length !=  window.TX_LEN )
                {
                    webix.message({ type: 'warning', text: 'Length of Reg Number should be ' + window.TX_LEN.toString().trim() });
                    $$("gridRpt").clearSelection();
                    webix.UIManager.setFocus($$("gridRpt"));
                    $$("gridRpt").select(RowId);
                    $$("gridRpt").showItem(RowId);
                    $$("gridRpt").refresh();
                    bSuc = false;
                    return false;
                }
            }
        
        });
    }

    if (!(window.K_TAX_IND == "3" || window.TEMP_K_TAX_IND == "3")) {
        $.each(gridData, function (key, sVal) {
            //debugger;
            var vRegNo = "";
            var vRegTy = "";
            var vSuppId = "";
            var RowId = sVal["id"];
            if (sVal["ixRegNo"] != null && sVal["ixRegNo"] != "") {
                vRegNo = sVal["ixRegNo"].toString().trim();
            }
            if (sVal["ixTaxGrp"] != null && sVal["ixTaxGrp"] != "") {
                vRegTy = sVal["ixTaxGrp"].toString().trim();
            }

            if (sVal["ixSuppId"] != null && sVal["ixSuppId"] != "") {
                vSuppId = sVal["ixSuppId"].toString().trim();
            }
            if (vSuppId != "") {
                if (vRegNo != "" && window.TX_LEN > 0) {
                    if (vRegNo.length != window.TX_LEN) {
                        $$("gridRpt").clearSelection();
                        webix.message({ type: 'warning', text: 'Length of Reg Number should be ' + window.TX_LEN.toString().trim() });
                        webix.UIManager.setFocus($$("gridRpt"));
                        $$("gridRpt").select(RowId);
                        $$("gridRpt").showItem(RowId);
                        $$("gridRpt").refresh();
                        bSuc = false;
                        return false;
                    }
                }              

                if (vRegNo != "") {                    
                    //if (isAlphaNumeric(vRegNo) == false) {
                    //    debugger;
                    //    webix.message({ type: 'warning', text: 'Alpha Numeric Only allowed in Reg No Column '});
                    //    $$("gridRpt").clearSelection();
                    //    webix.UIManager.setFocus($$("gridRpt"));
                    //    $$("gridRpt").select(RowId);
                    //    $$("gridRpt").showItem(RowId);
                    //    $$("gridRpt").refresh();
                    //    bSuc = false;
                    //    return false;

                    //}

                    var newData = gridData.filter(function (el) {
                        return el.ixRegNo == vRegNo && el.ixSuppId != vSuppId;
                    });
                    if (newData.length > 0) {
                        $$("gridRpt").clearSelection();
                        webix.message({ type: 'warning', text: 'Dublicate ' + TAX_CAPTION.toString().trim() + " Reg Number not allowed" });
                        webix.UIManager.setFocus($$("gridRpt"));
                        $$("gridRpt").select(RowId);
                        $$("gridRpt").showItem(RowId);
                        $$("gridRpt").refresh();
                        bSuc = false;
                        return false;
                    }
                    debugger;
                    var newData1 = gridParty.filter(function (el) {
                        return el.TX_RG_NO == vRegNo && el.id != vSuppId;
                    });
                    if (newData1.length > 0) {
                        $$("gridRpt").clearSelection();
                        webix.message({ type: 'warning', text: 'Dublicate ' + TAX_CAPTION.toString().trim() + " Reg Number not allowed" });
                        webix.UIManager.setFocus($$("gridRpt"));
                        $$("gridRpt").select(RowId);
                        $$("gridRpt").showItem(RowId);
                        $$("gridRpt").refresh();
                        bSuc = false;
                        return false;
                    }
                }
            }
            

        });
    }

    if (bSuc == false) return false;
    fnSave();
};

function fnSave() {
    debugger;

    var sgridData = $$("gridRpt").serialize();

    var gridData = sgridData.filter(function (el) {
        return el.ixRegNo != el.ixRegNo1 || el.ixBRN != el.ixBRN1 || el.ixTan != el.ixTan1 || el.ixNatIdNo != el.ixNatIdNo1 || el.ixTaxGrp != el.ixTaxGrp1;
    });    

    var CompId = $$("Property").getValue();
    var PARTY_SUB_TY_ID = $$("ddlPartySubTy").getValue();
    $.each(gridData, function (key, sVal) {
        //debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    $("#pageloaddiv").show();

    Request = {
        REQTYPE: "GET_FNSAVEPARTYTAUPD",
        COMPID: CompId,
        PARTY_SUB_TY_ID: PARTY_SUB_TY_ID,
        PARTY_TY_ID: window.PARTY_TY_ID,
        gridData: gridData

    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                debugger;
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData.Status == "0") {
                    webix.message({
                        type: 'warning',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#pageloaddiv").hide();
                }
                else if (rowData.Status == "1") {
                    webix.message({
                        type: 'success',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#pageloaddiv").hide();
                    fnRefresh();
                    fnOpenMode();
                }

            }

        },
        complete: function () { $("#pageloaddiv").hide(); },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#pageloaddiv").hide();
        }
    });

};






