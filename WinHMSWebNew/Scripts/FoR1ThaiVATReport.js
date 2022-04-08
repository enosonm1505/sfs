webix.ready(function () {
    $("#LoadDIv").hide();
    var Print = "<span  class='wc_fnt18 fas fa-1x  fa-print'></span>";
    var excel = "<span  class=' wc_fnt18 far fa-1x fa-file-excel'></span>";

    var DFFDTFORMAT = $("#HdnDEFDTFORMAT").val();
    var FromDt = $("#HdnAccDt").val();
    var ToDt = $("#HdnAccDt").val();
    var vFromDt = formatDate(FromDt);
    var vToDt = formatDate(ToDt);

    GridDesign();

    webix.ui({
        view: "button",
        id: "Print",
        value: "Print",
        width: 70,
        container: "divPrint",
        label: Print,
        tooltip: true,
        on: {
            onItemClick: function () {
                fnGridPrint();
            }
        }

    });

    webix.ui({
        view: "button",
        id: "Excel",
        value: "Excel",
        width: 70,
        container: "divExcel",
        label: excel,
        tooltip: true,
        on: {
            onItemClick: function () {
                fnExcelExport();
            }
        }
    });
    webix.ui({
        container: "divFrom",
        view: "datepicker",
        name: "FromDt",
        label: "From :",
        labelWidth: 50,
        id: "FromDt",
        Width: 120,
        format: DFFDTFORMAT == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
        stringResult: true,
        value: vFromDt,
        on: {
            onChange: function () {
                $$("gridRpt").clearAll();
                FromDateValidation();
            }
        }
    });

    webix.ui({
        container: "divTo",
        view: "datepicker",
        name: "ToDt",
        label: "To :",
        labelWidth: 50,
        id: "ToDt",
        Width: 120,
        format: DFFDTFORMAT == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
        stringResult: true,
        value: vToDt,
        on: {
            onChange: function () {
                $$("gridRpt").clearAll();
                ToDateValidation();
            }
        }
    });

    webix.ui({
        container: "divbtnDisp",
        view: "button",
        id: "btnDisplay",
        css: "webix_primary",
        icon: "wxi-check",
        label: "Display",
        inputWidth: 70,
        width: 70,
        click: function () {
            fnbtnDisplay();
        }
    });

    webix.event(window, "resize", function () {
        gridResize();
    })

});

function GridDesign() {
    webix.ui({
        id: "gridRpt",
        container: "DivGrid",
        select: 'row',
        view: "treetable",
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,
        resizeColumn: true,
        resizeRow: true,
        footer: true,
        spans: true,
        minWidth: 900,
        position: "flex",
        css: "webix_header_border",
        data: [],
        columns: [

                { id: "GS_NO", header: { text: "Tax Invoice No", css: "multiline" }, width: 100, css: { 'text-align': 'left ! important' } },
                { id: "PAY_TY", header: { text: "PAY_TY", css: "multiline" }, width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                { id: "DESCR", header: { text: "Description", css: "multiline" }, width: 100, css: { 'text-align': 'left ! important' }, },
                {
                    id: "GUEST_NM", header: { text: "Guest Name", css: "multiline" }, width: 175, css: { 'text-align': 'left ! important' },
                    footer: { text: "Grand Total", css: "LeftAlign" },
                },
                { id: "ROOM_NO", header: { text: "Room", css: "multiline" }, width: 80, css: { 'text-align': 'center ! important' }, },
                {
                    id: "NON_VATABLE_AMT", header: { text: "Non-Vatable Amt", css: "multiline" }, fillspace: 0.1, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (NON_VATABLE_AMT) {
                        return fnCurrFormat(NON_VATABLE_AMT);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "VATABLE_AMT", header: { text: "Vatable Amt", css: "multiline" }, fillspace: 0.1, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (VATABLE_AMT) {
                        return fnCurrFormat(VATABLE_AMT);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "VAT", header: { text: "VAT", css: "multiline" }, fillspace: 0.1, width: 80, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (VAT) {
                        return fnCurrFormat(VAT);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "PTAX", header: { text: "Provincial Tax", css: "multiline" }, fillspace: 0.1, width: 80, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (PTAX) {
                        return fnCurrFormat(PTAX);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",
                },
                {
                    id: "Total", header: { text: "Total", css: "multiline" }, fillspace: 0.1, width: 100, css: { 'text-align': 'right ! important' },
                    footer: { content: "totalColumn" },
                    format: function (Total) {
                        return fnCurrFormat(Total);
                    },
                    exportType: "number",
                    exportFormat: "#,##0.00",

                },
                { id: "REFUNDED_VAT_INV_NO", header: { text: "Refund Vat Inv.no", css: "multiline" }, fillspace: 0.1, width: 100, css: { 'text-align': 'right ! important' }, },
                 { id: "CLR", hidden: true },

        ],

        scheme: {
            $change: function (item) {
                if (item.CLR != "" && item.CLR != null) {

                    item.$css = item.CLR;
                }
            },
        },
    });

};

function gridResize() {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    var offset = $("#DivGrid").offset();
    $$("gridRpt").define("height", ((vheight - offset.top - 10)));
    $$("gridRpt").adjust();
}

function formatDate(StrDt) {
    var Parts = StrDt.split("/");
    var Yr = Parts[0];
    var Mn = Parts[1];
    var Dt = Parts[2];
    var Str = Dt + "/" + Mn + "/" + Yr;
    return Str;
};

function FromDateValidation(e) {

    $$("gridRpt").clearAll();
    var frmdate = $$("FromDt").getText();
    var todate = $$("ToDt").getText();
    var sFrmDt = $$("FromDt").getText();
    var vAccDt = $("#HdnAccDt").val();

    var bSucc = "1";

    if (frmdate == "") {
        $("#LoadDIv").hide();
        bSucc = "0";
        return false;
    }


    if (todate == "") {
        $("#LoadDIv").hide();
        bSucc = "0";
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/Reports/FTDateValidation",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "F=" + frmdate + "&T=" + todate,
        success: function (data) {
            if (data.d != "") {
                $("#LoadDIv").hide();
                var vToDt = formatDate(sFrmDt);
                $$("ToDt").setValue(new Date(vToDt));
                bSucc = "0";
            }
        }
    });
    if (bSucc == "0") return false;


    $.ajax({
        type: "POST",
        url: "/Reports/FTDateValidation",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "F=" + frmdate + "&T=" + vAccDt,
        success: function (data) {
            if (data.d != "") {
                $("#LoadDIv").hide();
                var vFromDt = formatDate(vAccDt);
                $$("FromDt").setValue(new Date(vFromDt));

                bSucc = "0";
            }
        }
    });

    if (bSucc == "0") return false;
};

function ToDateValidation(e) {
    $$("gridRpt").clearAll();
    var frmdate = $$("FromDt").getText();
    var todate = $$("ToDt").getText();
    var sFrmDt = $$("ToDt").getText();
    var vAccDt = $("#HdnAccDt").val();

    var bSucc = "1";

    if (frmdate == "") {
        bSucc = "0";
        return false;
    }


    if (todate == "") {
        bSucc = "0";
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/Reports/FTDateValidation",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "F=" + frmdate + "&T=" + todate,
        success: function (data) {
            if (data.d != "") {
                var vToDt = formatDate(sFrmDt);
                $$("FromDt").setValue(new Date(vToDt));
                bSucc = "0";

            }
        }
    });

    if (bSucc == "0") return false;


    $.ajax({
        type: "POST",
        url: "/Reports/FTDateValidation",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "F=" + todate + "&T=" + vAccDt,
        success: function (data) {
            if (data.d != "") {
                var vFromDt = formatDate(vAccDt);
                $$("ToDt").setValue(new Date(vFromDt));
                bSucc = "0";
            }
        }
    });

    if (bSucc == "0") return false;

};

function fnbtnDisplay() {
    debugger;
    $$("gridRpt").clearAll();
    $("#LoadDIv").hide();
    var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNFOTHAIVATRPTLOADGRID";
    dataparam["COMPID"] = CompId;
    dataparam["FromDt"] = FromDt;
    dataparam["ToDt"] = ToDt;
    dataparam["DFFDTFORMAT"] = $("#HdnDEFDTFORMAT").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Reports/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                //$$("gridRpt").define(rowData);
                $$("gridRpt").parse(rowData);
                $$("gridRpt").refresh();
            }

            $$("gridRpt").group({
                by: function (obj) {
                    return "Payment Type : " + obj["PAY_TY"];
                },
                row: function (obj) {
                    return obj.GS_NO;
                },
                missing: "Other",
                map: {
                    GS_NO: [function (obj) {
                        return "Payment Type : " + obj["PAY_TY"];
                    }],
                },
                footer: {
                    GS_NO: ["", "string"],
                    PAY_TY: ["", "string"],
                    DESCR: ["", "string"],
                    GUEST_NM: ["Total", "string"],
                    ROOM_NO: ["", "string"],
                    NON_VATABLE_AMT: ["NON_VATABLE_AMT", "sum"],
                    VATABLE_AMT: ["VATABLE_AMT", "sum"],
                    VAT: ["VAT", "sum"],
                    PTAX: ["PTAX", "sum"],
                    Total: ["Total", "sum"],
                    CLR: ["GrpTot1", "string"],
                    $css: ["GrpTot1", "string"]
                }
            });
            $$("gridRpt").openAll();
            $$("gridRpt").refresh();
        },
        error: function (err) {
            $("#LoadDIv").hide();
        },
        complete: function () {

            $("#LoadDIv").hide();
        }
    });
}

function fnCurrFormat(value) {
    var Currfrmt = $("#CURRENCY_FORMAT").val();
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj.CLR != "GrpTot1") {
                if (!isNaN(obj[value.columnId]) && obj[value.columnId] != null && obj[value.columnId] != "") result = parseFloat(result) + parseFloat(obj[value.columnId]);
            }
        });
        node.firstChild.innerHTML = fnCurrFormat(result);
    }
}, webix.ui.datafilter.summColumn);

function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {

    if (value == null) return "";

    if (value.toString() != "") {

        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                afterPoint = CurrDelimit + afterPoint
            }
            x = Math.floor(x);
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
            }
            x = x.toString();
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

function fnGridPrint() {
    var vHeader = $("#lblRptCaption").text();
    var FullData = "";
    var vGrid = "";
    var CompId = $$("Property").getValue();
    vGrid = $$("gridRpt");
    var CompNm = $$("Property").getText();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();

    var DocHeader = "";
    DocHeader = "<div class='row'><div class='col-4 col-sm-4  text-left' style='font-weight:bold !important'>" + CompNm + "</div>" + "<div class='col-4 col-sm-4  text-center' style='text-align:center !important;font-weight:bold !important'>" + vHeader + "</div></div>" + "<div class='row'>" + "<div class='col-12 col-sm-12 text-center'> From : " + FromDt + " To : " + ToDt + "</div></div>";
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

function fnExcelExport() {
    var vGrid = "";
    var CompId = $$("Property").getValue();
    vGrid = $$("gridRpt");

    var CompNm = $$("Property").getText();
    var values = fnCurrDtTime();
    var vDate = values[0];
    var vTm = values[1];

    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var vHeader = $("#lblRptCaption").text();
    var FullData = "";
    FullData = vGrid.serialize();
    var len = FullData.length;
    if (len > 0) {
        var vExpoartGrid = webix.copy($$("gridRpt"), -1);
        fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, FromDt, ToDt,"");
    }
    else {
        alert("Records not present in Report");
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
        url: "/Reports/FOAPI_CALL",
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

function fnComExcelExport(grid, Name, DocHeader, styles, CompanyNm, CurrDate, CurrTime, FromDt, ToDt, AsOn) {
    debugger;

    ToDt = ToDt || "";
    FromDt = FromDt || "";
    AsOn = AsOn || "";
    DocHeader = DocHeader || "";
    CompanyNm = CompanyNm || "";
    var ColId = "";
    var vRows = 0;

    var vColmns = grid.config.columns;

    grid.spans = true;

    var HeadRow = vColmns[0].header.length;
    for (var i = 0; i < HeadRow; i++) {
        vRows += 1;
        grid.add({}, i);
        var row = grid.getIdByIndex(i);
        var SelRow = grid.getItem(row);
        grid.addRowCss(row, "webix_ss_header");
        $.each(vColmns, function (key, value) {
            debugger;
            ColId = value.id;
            grid.addCellCss(row, ColId, "webix_hcell");
            if (value.header[i]) {
                SelRow[value.id] = value.header[i].text;
                if (value.header[i].colspan) {
                    if (value.header[i].colspan > 1) {
                        grid.addSpan(row, ColId, value.header[i].colspan, 1, null, "webix_ss_header webix_hcell");
                    }
                }
            }

        })
        if (i == 0) FrzRow = row;
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    if (AsOn) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();
        ColId = vColmns[0].id;
        SelRow[ColId] = "AsOn :  " + AsOn;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);

    }
    else if (FromDt || ToDt) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();

        var DtString = "";
        DtString = "From : " + FromDt + "       To : " + ToDt;
        ColId = vColmns[0].id;
        SelRow[ColId] = DtString;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (DocHeader != "") {
        ColId = vColmns[vCenterCol - 1].id;
        ColId = vColmns[0].id;
        SelRow[ColId] = DocHeader;

        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

    }

    SelRow["CLR"] = "ExcelHead";
    grid.updateItem(row, SelRow);

    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (CompanyNm != "") {
        ColId = vColmns[0].id;
        SelRow[ColId] = CompanyNm + "  , " + CurrDate + "  , " + CurrTime;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextLeft xltextBold xlHdRemBorder");

    }
    SelRow["CLR"] = "ExcelHead";
    grid.updateItem(row, SelRow);
    grid.refresh();

    var data = webix.toExcel(grid, {
        filename: Name,
        filterHTML: true,
        styles: styles,
        spans: true,
        name: Name,
        docHeader: "",
        rawValues: true,
        header: false,
    });
    for (var j = 1; j <= vRows; j++) {
        grid.remove(grid.getFirstId());
    }
    grid.refresh();
};