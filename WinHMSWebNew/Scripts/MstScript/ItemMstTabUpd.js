

var PageLoad = function () {

    webix.ui({ container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divGrp", view: "richselect", id: "ddlGroup", label: "Group", maxWidth: 350, labelWidth: 100, on: { onChange: function (newVal, OldVal) { fnPrdGrpChange(newVal); } }
    });
    
    webix.ui({
        container: "divSubGrp", view: "richselect", id: "ddlSubGroup", label: "Sub Group", maxWidth: 350, labelWidth: 100, on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } }
    });
    
        

    webix.ui({ container: "divBtnBlkEntry", id: "btnBlkEntry", view: "button", maxWidth: 110, label: "Bulk Entries", click: function () { fnbtnDisplayClick(); } });

};
function fnAsOnDtChange() {
    debugger;
    GridClear();
};
function fnPrdGrpChange(ProdGrpId) {
    GridClear();
    $$("ddlSubGroup").setValue("")
    fnSubGroupLoad(ProdGrpId);

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
        data: [],
        columns: [               
                { id: "ixItemNm", header: 'Item Name', width: 230, css: { 'text-align': 'left ! important', },  },
                { id: "ixHSNCd", header: "HSN Code", width: 90, css: { 'text-align': 'center ! important', },  },
                { id: "ixHSNBtn", header: '', width: 30, css: { 'text-align': 'center ! important', }, },
                { id: "ixProdBtn", header: '', width: 30, css: { 'text-align': 'left ! important', }, },
                { id: "ixInpTp", header: 'Input Type', width: 90, css: { 'text-align': 'left ! important', }, },
                {
                     id: "ixTaxCls", header: [{ colspan: 6, css: { 'text-align': 'center' }, text: "INTRA SUPPLY" }, { text: "Tax Code", css: { 'text-align': 'center', } }],
                     width: 90, css: { 'text-align': 'left ! important', },
                },                
                { id: "ixTaxClsBtn", header: [null, { text: "", }], width: 30 },
                { id: "ixTaxDes", header:[null,{css: { 'text-align': 'center' }, text: 'Description'}], minWidth: 230, maxWidth: 400, fillspace: true, css: { 'text-align': 'center ! important', }, },
                { id: "ixCGSTper", header: [null, { css: { 'text-align': 'center' }, text: 'GST %' }],  width: 70, css: { 'text-align': 'center ! important', }, },
                { id: "ixSGSTper", header: [null, { css: { 'text-align': 'center' }, text: 'SGST %' }], width: 75, css: { 'text-align': 'center ! important', }, },
                { id: "ixCESS", header: [null, { css: { 'text-align': 'center' }, text: 'CESS %' }], width: 75, css: { 'text-align': 'center ! important', }, },
                {
                   id: "ixTaxCls1", header: [{ colspan: 6, css: { 'text-align': 'center' }, text: "INTER SUPPLY" }, { text: "Tax Code", css: { 'text-align': 'center', } }],
                   width: 90, css: { 'text-align': 'left ! important', },
                },
                { id: "ixTaxClsBtn1", header: [null, { text: "", }], width: 30 },
                { id: "ixTaxDes1", header: [null, { css: { 'text-align': 'center' }, text: 'Description' }], minWidth: 260, maxWidth: 400, fillspace: true, css: { 'text-align': 'center ! important', }, },
                { id: "ixCGSTper1", header: [null, { css: { 'text-align': 'center' }, text: 'GST %' }], width: 70, css: { 'text-align': 'center ! important', }, },
                { id: "ixSGSTper1", header: [null, { css: { 'text-align': 'center' }, text: 'SGST %' }], width: 75, css: { 'text-align': 'center ! important', }, },
                { id: "ixCESS1", header: [null, { css: { 'text-align': 'center' }, text: 'CESS %' }], width: 75, css: { 'text-align': 'center ! important', }, },
                { id: "ixProdId",  hidden: true },
                { id: "ixupdate", hidden: true },                
                { id: "CLR", header: { text: "CLR", }, hidden: true },

            ],
        data: [],
        //on: {

        //    'onItemDblClick': function (id) {
        //        debugger;
        //        fnRowDblClick(id);
        //    },
        //},
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
    GridClear();
    fnGroupLoad();    
    //fnShowColumn();
    
};
function fnGroupLoad() {
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_PURPRODGRP",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
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
                //options.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
                $$("ddlGroup").define("options", options);               
                //$$("ddlGroup").setValue("<-ALL->")
            }
        },
    });

    //return rowData;
};

function fnSubGroupLoad(ProdGrpId) {
    debugger;

    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("Property").getValue();
    Request = {
        REQTYPE: "GET_PURPRODSUBGRP",
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        PROD_GRP_ID: ProdGrpId,
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
                //options.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
                $$("ddlSubGroup").define("options", options);
                //$$("ddlSubGroup").setValue("<-ALL->")
            }
        },
    });

    //return rowData;
};

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
    var ChkDRCR = $$("txtDRCR").getValue();    
    var chkdispdt = $$("txtdispdt").getValue();
    var bPending = $$("txtPendBills").getValue();
    //var chkSuppress = $$("txtSuppress").getValue();

    var chkVouchNo = $$("txtVNo").getValue();
    var FrmVNo = $$("hdnFrmVNo").getValue();
    var ToVNo = $$("hdnToVNo").getValue();
    var chkDtFilter = $$("txtDateWs").getValue();
    var chkDueDtFilter = $$("txtDueDateWs").getValue();
    var chkDueDtFilter = $$("txtDueDateWs").getValue();
    var From_Dt = $$("hdnFrmDt").getValue();
    var To_Dt = $$("hdnToDt").getValue(); 
    var DivId = $$("txtDivId").getValue();    
    if (DivId == "<-ALL->") DivId = "";
    var CompId = $$("Property").getValue(); 
    var bOnAc = $$("txtOnAc").getValue();

    var chkAddr = $$("chkAddr").getValue();
    var chkCont = $$("chkCont").getValue();
    var chkTel = $$("chkTel").getValue();        
    var ReqNm = "";
    ReqNm = "GET_FNGLLOADPARTYBILLS"

    debugger;
    Request = {
        REQTYPE: ReqNm,
        COMPID: CompId,
        GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: window.FiscalYear,
        DIVID: DivId,
        FROMDT: From_Dt,
        TODT: To_Dt,
        ASON: AsOnDt,
        chkAddr:chkAddr,
        chkCont:chkCont,
        chkTel:chkTel,
        GRPIDS: GrpIds,
        LEVIDS: LvlIds,
        ACCIDS: AcIds,
        bArAp: "0",//"1"
        bOnAc: bOnAc,
        Forgrp: "0",
        bPending: bPending,
        //DRCRTrn: DRCRTrn,
        LEVELNO: "0",        
        ChkDRCR: ChkDRCR,               
        vTrnTyId: vTrnTyId,
        REFERNM: RefNm,
        chkVouchNo: chkVouchNo,
        FrmVNo: FrmVNo,
        ToVNo: ToVNo,
        chkDtFilter: chkDtFilter,
        chkDueDtFilter: chkDueDtFilter,
        //chkSuppress: chkSuppress
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

    
    if ($$("txtBillDt").getValue() == "1") $$("gridRpt").showColumn("ixBillDt");
    else $$("gridRpt").hideColumn("ixBillDt");

    
    if ($$("txtdispdt").getValue() == "1") $$("gridRpt").showColumn("ixDueDt");
    else $$("gridRpt").hideColumn("ixDueDt");

    if ($$("txtFornAmt").getValue() == "1") {
        $$("gridRpt").showColumn("ixFamt");
        $$("gridRpt").showColumn("ixCur");
    }
    else {
        $$("gridRpt").hideColumn("ixFamt");
        $$("gridRpt").hideColumn("ixCur");
    }   
    if ($$("txtDiv").getValue() == "1") $$("gridRpt").showColumn("ixDiv");
    else $$("gridRpt").hideColumn("ixDiv");

    if ($$("txtchkCLNo").getValue() == "1") $$("gridRpt").showColumn("ixClNo");
    else $$("gridRpt").hideColumn("ixClNo");

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
function fnchkDateWsClick() {
    if ($$("chkDateWs").getValue() == "1") {
        $$("chkDueDateWs").setValue("0");
        $$("ToDt").setValue(formatDateWebix($$("AsOnDt").getText()));
        $$("FromDt").setValue('');
    }
    chkFilterDt();
};
function fnchkDueDateWsClick() {
    if ($$("chkDueDateWs").getValue() == "1") {
        $$("chkDateWs").setValue("0");
        $$("ToDt").setValue(formatDateWebix($$("AsOnDt").getText()));
        $$("FromDt").setValue('');
    }
    chkFilterDt();
};
function chkFilterDt() {
    if ($$("chkDateWs").getValue() == "1" || $$("chkDueDateWs").getValue() == "1") {
        $$("FromDt").enable();
        $$("ToDt").enable();
    }
    else {
        $$("FromDt").disable();
        $$("ToDt").disable();
        $$("ToDt").setValue('');
        $$("FromDt").setValue('');
    }
};
function fnchkapClick() {
    debugger;

    if ($$("chkAP").getValue() == "0") {
        if ($$("chkAR").getValue() == "0") $$("chkAR").setValue("1");
    }
};
function fnchkarClick() {
    debugger;

    if ($$("chkAR").getValue() == "0") {
        if ($$("chkAP").getValue() == "0") $$("chkAP").setValue("1");
    }
};
function fnchkVNoClick() {
    if ($$("chkVouchNo").getValue() == "1") {
        $$("txtFrmVNo").show();
        $$("txtToVNo").show();
    }
    else {
        $$("txtFrmVNo").hide();
        $$("txtToVNo").hide();
        $$("txtFrmVNo").setValue('');
        $$("txtToVNo").setValue('');
    }    
}
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





