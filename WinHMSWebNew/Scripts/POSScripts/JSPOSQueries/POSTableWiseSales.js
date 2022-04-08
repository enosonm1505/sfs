var app = angular.module('POSTApp', ['webix']);

app.controller("PosQueriesController", function ($scope) {

    $("#LoadDIv").hide();
    debugger;
    fnCurrDate();
    fnLoadOptionWindow();

    var Dataset = fnMstCompany();
    var defdt = Dataset[0].DEF_DT_FORMAT;
    var ddlOutletId = fnOutletload();
    GridDesign();
    fnShowHideCol();
    $scope.frmTableWiseSales = {
        id: "frmTableWiseSales",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        elements: [
            {
                rows: [
                    {
                        padding: { top: 0, bottom: 0, left: 20 },
                        cols: [
                            {
                                view: "richselect",
                                id: "ddlOutlet",
                                label: "Outlet",
                                labelAlign: "right",
                                labelWidth: 60,
                                inputWidth: 250,
                                width: 450,
                                value: "ALL",
                                options: ddlOutletId,
                                on: {
                                    onChange: function (newval, oldval) {
                                        $$("grdTabWiseSal").clearAll();
                                    }
                                }
                            },
                            {
                                view: "datepicker",
                                id: "txtFrmDt",
                                stringResult: true,
                                label: "For",
                                labelWidth: 40,
                                inputWidth: 160,
                                width: 160,
                                labelAlign: "right",
                                format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrentDt").val(),
                                attributes: { maxlength: 8 },
                                on: { onChange: function (newVal, OldVal) { $$("grdTabWiseSal").clearAll(); } }
                            },
                            {
                                view: "datepicker",
                                id: "txtToDt",
                                stringResult: true,
                                label: "To",
                                labelWidth: 40,
                                inputWidth: 160,
                                width: 160,
                                labelAlign: "right",
                                format: defdt == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                value: $("#hdnCurrentDt").val(),
                                attributes: { maxlength: 8 },
                                on: { onChange: function (newVal, OldVal) { $$("grdTabWiseSal").clearAll(); } }
                            },
                            {
                                id: "btnDispay", view: "button", minWidth: 140, width: 80, labelAlign: "left", label: "Display",
                                on: {
                                    onItemClick: function () {
                                        fndateValidation();
                                        if ($$("chkDetail").getValue() == "1") {
                                            $$("grdTabWiseSal").clearAll();
                                            fnLoadDetDisplay();
                                            fnGetOption();
                                        }
                                        else {
                                            $$("grdTabWiseSal").clearAll();
                                            fnLoadBillDisplay();
                                        }
                                    }
                                }
                            },
                            {
                                view: "button", id: "btnOptions", css: "webix_primary", value: "Options", width: 30, label: '<span class="fa fa-list"></span>', container: "divbtnoptions", tooltip: true, popup: "OptionsNew",
                                on: {
                                    onItemClick: function () {
                                        debugger;
                                        $$("grdTabWiseSal").clearAll();
                                        btnOptionClick();
                                    }
                                }
                            },
                        ]
                    },
                ]
            }
        ]
    }
});

function GridDesign() {
    webix.ui({
        id: "grdTabWiseSal",
        container: "divTabWiseSal",
        view: "treetable",
        select: 'row',
        view: "treetable",
        fixedRowHeight: false,
        rowLineheight: 23,
        autoConfig: true,
        spans: true,
        scroll: "xy",
        adjust: true,
        css: "webix_header_border webix_data_border",
        data: [],
        scheme:{
            $change:function(item){
                if (item.OutTotal == "OUT")
                    item.$css = "GrpTot1";
                if (item.OutTotal == "GrdTot")
                    item.$css = "GrpTotBtm";
            }
        },
        columns:fnGetGridCol(),
        on: {
        },
    });
    gridResize();
}

function fnGetGridCol() {
    if ($$("grdTabWiseSal"))
        $$("grdTabWiseSal").destructor();
    if ($$("chkDetail").getValue() == "1") {
        var GridColumn = [
            { id: "Outlet", header: { text: "Outlet", }, width: 180, css: { 'text-align': 'left  ! important' } },
            {
                id: "Table", header: { text: "Table", css: "multiline" }, width: 130, css: { 'text-align': 'left ! important' },
            },
        ]
        return GridColumn;
    }
    else  {
        if ($$("grdTabWiseSal"))
            $$("grdTabWiseSal").destructor();
        var GridColumn1 = [
             { id: "Outlet", header: { text: "Outlet", }, width: 130, css: { 'text-align': 'left  ! important' }, css: "GrpTot1", },
            {
                id: "Table", header: { text: "Table", css: "multiline" }, width: 100, css: { 'text-align': 'center ! important' },
            },
            {
                id: "Covers", header: { text: "Covers", css: "multiline" }, width: 130, css: { 'text-align': 'right ! important' },
                format: function (value) {
                    return fnComFormat(value);
                },
                exportType: "number",
                exportFormat: "#,##",
            },
            {
                id: "Sales", header: { text: "Sales", }, width: 100, css: { 'text-align': 'right! important' },
                format: function (value) {
                    return fnComFormat(value);
                },
                exportType: "number",
                exportFormat: "#,##",
            },
            {
                id: "APC", header: { text: "APC", }, width: 170, css: { 'text-align': 'right ! important' },
                format: function (value) {
                    return fnCurrFormat(value);
                },
                exportType: "number",
                exportFormat: "#,##0.00",
            },
            { id: "CLR", hidden: true },
        ]
        return GridColumn1;
    }
}

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        var result = 0;
        var vColumnId = value.columnId;
        master.data.each(function (obj) {
                if (!isNaN(obj[value.columnId]) && obj[value.columnId] != null && obj[value.columnId] != "") result = parseFloat(result) + parseFloat(obj[value.columnId]);
        });
        if (vColumnId == "Covers" || vColumnId == "Sales") node.firstChild.innerHTML = fnComFormat(result);
        else node.firstChild.innerHTML = fnCurrFormat(result);
    }
}, webix.ui.datafilter.summColumn);

function fnCurrFormat(value) {
    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    
    if ($$("chkDetail").getValue() == "1") {
        var CurrDecimal = "0";
        return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
    }
    else  {
        var CurrDecimal = window.CURRENCY_DECIMLIMIT;
       return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
    }
   
};

function fnComFormat(value) {
    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    var CurrDecimal = "0";

    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);   
};
function fnLoadOptionWindow() {

    if ($$("OptionsNew") != null) $$("OptionsNew").destructor();
    webix.ui({
        view: "popup",
        close: true,
        id: "OptionsNew",
        head: "Options",
        responsive: true,
        css: "WebIxStyle",
        autofit: true,
        width: 150,
        move: true,
        body: {
            rows: [
                {
                    view: "search", width: 250, labelWidth: 0, id: "txtSrch", label: "", padding: { top: 5, left: 0, bottom: 0, right: 0 }, margin: { bottom: 0 },
                    on: {
                        onTimedKeyPress: function () {
                            var Srchvalue = $$("txtSrch").getValue();
                            if (Srchvalue != "") {
                                var ContArr = $$("frmOptions").getChildViews();
                                if (ContArr.length > 0) {
                                    var vHt = 0;
                                    $.each(ContArr, function (key, obj) {
                                        if (obj.config.labelRight) {
                                            if (obj.config.labelRight.toString().toLowerCase().indexOf(Srchvalue.toLowerCase()) != -1) {
                                                $$(obj.config.id).show();
                                                vHt += $$(obj.config.id).$height + 6;
                                            }
                                            else $$(obj.config.id).hide();
                                        }
                                    });
                                    if (window.vOrgHt >= vHt) $$("OptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
                                    else $$("OptionsNew").define("height", window.vOrgHt);
                                    $$("OptionsNew").adjust();
                                }
                            }
                            else {
                                var ContArr = $$("frmOptions").getChildViews();
                                var vHt = 0;
                                if (ContArr.length > 0) {
                                    $.each(ContArr, function (key, obj) {
                                        if (obj.config.id) {
                                            vHt += $$(obj.config.id).$height + 6;
                                            $$(obj.config.id).show();
                                        }
                                    });
                                    if (window.vOrgHt >= vHt) $$("OptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
                                    else $$("OptionsNew").define("height", window.vOrgHt);
                                    $$("OptionsNew").adjust();
                                }
                            }
                        }
                    }
                },
                {
                    view: "form",
                    id: "frmOptions",
                    responsive: true,
                    scroll: "y",
                    padding: { top: 5, left: 0, bottom: 5, right: 0 },
                    elements: fnGetOption(),
                }
            ]
        }
    });
};

function btnOptionClick() {
    //debugger;
    $$("txtSrch").setValue('');
    var vHt = 0;
    var ContArr = $$("frmOptions").getChildViews();
    if (ContArr.length > 0) {
        $.each(ContArr, function (key, obj) {
            if (obj.config.id) {
                vHt += $$(obj.config.id).$height + 6;
                $$(obj.config.id).show();
            }
        });
        if (window.vOrgHt >= vHt) $$("OptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
        else $$("OptionsNew").define("height", window.vOrgHt);
        $$("OptionsNew").adjust();
    }
    fnShowHideCol();
};

function fnGetOption() {
    var vOpt = [];
    vOpt.push({ view: "checkbox", name: "chkDetail", id: "chkDetail", labelWidth: 5,value:"1", labelRight: "Detail", css: "OptCss", customCheckbox: false, height: 18, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } });
    vOpt.push({ view: "checkbox", name: "chkSales", id: "chkSales", labelWidth: 5, labelRight: "Sales", css: "OptCss", customCheckbox: false,readonly : true, height: 18,hidden: true, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } });
    vOpt.push({ view: "checkbox", name: "chkCovers", id: "chkCovers", labelWidth: 5, labelRight: "Covers", css: "OptCss", customCheckbox: false, height: 18,hidden : true, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } });
    vOpt.push({ view: "checkbox", name: "chkAPC", id: "chkAPC", labelWidth: 5, labelRight: "APC", css: "OptCss", customCheckbox: false, height: 18,hidden : true, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } });
    return vOpt;
}

function fnShowHideCol() {
    if ($$("chkDetail").getValue() == "1") {
        $$("grdTabWiseSal").hideColumn("Covers");
        $$("grdTabWiseSal").hideColumn("Sales");
        $$("grdTabWiseSal").hideColumn("APC");
        $$("chkSales").show();
        $$("chkSales").setValue("1");
        $$("chkCovers").show();
        if ($$("chkCovers").getValue() == "1"){
            $$("chkAPC").show();
        }
        else {
            $$("chkAPC").hide();
        }
    }
    else {
        if ($$("grdTabWiseSal"))
            $$("grdTabWiseSal").destructor();
        GridDesign();
        $$("grdTabWiseSal").showColumn("Covers");
        $$("grdTabWiseSal").showColumn("Sales");
        $$("grdTabWiseSal").showColumn("APC");
        $$("chkSales").hide();
        $$("chkSales").setValue("0");
        $$("chkCovers").hide();
        $$("chkCovers").setValue("0");
        $$("chkAPC").hide();
        $$("chkAPC").setValue("0");
    }
    $$("grdTabWiseSal").refreshColumns();
    $$("grdTabWiseSal").refresh();
}

function fnOutletload() {
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_OUTLETNAME";
    dataparam["PROGNAME"] = "GET_TABLEWISESALES";
    dataparam["COMPID"] = $("#hdnCompId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (!undefined) {
                    $$("ddlOutlet").define("options", rowData);
                    $$("ddlOutlet").define("value", "ALL");
                    $$("ddlOutlet").refresh();
                }
            }
        }
    });
    return rowData;
}

function fnLoadBillDisplay()
{
    debugger;
    if ($$("grdTabWiseSal"))
        $$("grdTabWiseSal").destructor();
    GridDesign();
    var dataparam = {}; var rowData = [];
    vFooterGrp = [];

    dataparam["REQTYPE"] = "GET_TABWISESALESBILL";
    dataparam["PROGNAME"] = "GET_TABLEWISESALES";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Outlet_Id"] = $.trim($$("ddlOutlet").getValue());
    dataparam["ForDt"] = $.trim($$("txtFrmDt").getText());
    dataparam["ToDt"] = $.trim($$("txtToDt").getText());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdTabWiseSal").parse(rowData);
                $$("grdTabWiseSal").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
    gridResize();
}

function fnLoadDetDisplay() {
    debugger;
    var dataparam = {}; var rowData = [];

    dataparam["REQTYPE"] = "GET_TABWISESALESDETAILS";
    dataparam["PROGNAME"] = "GET_TABLEWISESALES";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Outlet_Id"] = $.trim($$("ddlOutlet").getValue());
    dataparam["ForDt"] = $.trim($$("txtFrmDt").getText());
    dataparam["ToDt"] = $.trim($$("txtToDt").getText());
    dataparam["ChkCovers"] = $.trim($$("chkCovers").getValue());
    dataparam["CancBill"] = $.trim($$("chkAPC").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                DatabindtoGrid(rowData);
                $$("grdTabWiseSal").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
    gridResize();
}

function DatabindtoGrid(rowData) {
    if ($$("grdTabWiseSal"))
        $$("grdTabWiseSal").destructor();
    GridDesign();

    var Filter1 = [];
    var DateCol = rowData.GridCol;
    var BindValue = rowData.GridOpp;
    var ColVal = [];
    $.each(rowData.GridCol, function (key, value) {
        var set = {};
        if (value == "Outlet") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 130, css: { 'text-align': 'Left !important' }, css: "GrpTot1",
            };
        }
        else if (value == "CLR") {
            set = {
                id: $.trim(value), hidden: true,
            };
        }
        else if (value == "OutTotal") {
            set = {
                id: $.trim(value), hidden: true,
            };
        }
        else if (value == "Outlet_ID") {
            set = {
                id: $.trim(value), hidden: true,
            };
        }
        else if (value == "Table") {
            set = {
                id: $.trim(value), header: { text: value, height: 30 }, width: 100, css: { 'text-align': 'center !important' }, 
            };
        }
        else if (value == "CoSalAPC") {
            set = {
                id: $.trim(value), header: { text: "", height: 30 }, width: 70, css: { 'text-align': 'left !important' }, 
            };
        }
        else {
            set = {
                id: $.trim(value), header: [{ text: value, height: 30 }], width: 70, css: { 'text-align': 'right ! important' },
                format: function (value) {
                    return fnCurrFormat(value);
                },
                exportType: "number",
                exportFormat: "#,##",
            };
        }
        ColVal.push(set);
    });
    debugger;
    if ($$("chkCovers").getValue() == "1" && $$("chkAPC").getValue() == "1") {
        Filter1 = BindValue;
    }
    else if ($$("chkCovers").getValue() == "1") {
        debugger;

        Filter1 = BindValue.filter(function (rowData) {
            return ($.trim(rowData.CoSalAPC) == "Covers" ||  $.trim(rowData.CoSalAPC) == "Sales");
        });
    }
    else {
        Filter1 = BindValue.filter(function (rowData) {
            return $.trim(rowData.CoSalAPC) == "Sales";
        });
    }
 
    $$("grdTabWiseSal").clearAll();
    $$("grdTabWiseSal").config.columns = ColVal;
    $$("grdTabWiseSal").refreshColumns();
    $$("grdTabWiseSal").parse(Filter1);
    $$("grdTabWiseSal").show();
    gridResize();
}

function fnExcelExport() {

    var vGrid = "";
    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("grdTabWiseSal");

    var values = fnCurrDtTime();
    var vDate = values[0];
    var vTm = values[1];
    var FromDt = $$("txtFrmDt").getText();
    var ToDt = $$("txtToDt").getText();

    var vHeader = $("#LayoutText").text();
    var FullData = "";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {
        var vExpoartGrid = webix.copy(vGrid, -1);
        fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, FromDt, ToDt, "");
    }
    else {
        alert("Records not present in Report");
    }

};
function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").text();
    var FullData = "";
    var vGrid = "";

    var CompId = $$("ddlProperty").getValue();
    var CompNm = $$("ddlProperty").getText();
    vGrid = $$("grdTabWiseSal");
    var FromDt = $$("txtFrmDt").getText();
    var ToDt = $$("txtToDt").getText();

    var DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> From: " + FromDt + "   To: " + ToDt + "</div></div>";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {

        webix.print(vGrid, {
            docHeader: DocHeader,
            fit: "page",
            scroll: false,
            mode: "landscape"
        });
    }
    else {
        alert("Records not present in Report");
    }
};

function fndateValidation() {
    debugger;
    var txtFrmDate = $$("txtFrmDt").getText();
    var txtToDt = $$("txtToDt").getText();
    var efdate = new Date(txtFrmDate.split('/')[2], txtFrmDate.split('/')[1] - 1, txtFrmDate.split('/')[0]);
    var etdate = new Date(txtToDt.split('/')[2], txtToDt.split('/')[1] - 1, txtToDt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage("From Date can not be greater than To date");
        return false;
    }
}

function sidebarFn() {
    gridResize();
}

function fnLoadPropertyChange() {
    fnOutletload();
    $$("grdTabWiseSal").clearAll();
}
