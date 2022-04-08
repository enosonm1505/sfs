$("#AC_NM").attr('disabled', true);
$("#AC_ID").attr('disabled', true);
var grid = $("#grid2").data("kendoGrid");

function GridRowColor() {
    var grid = $("#grid2").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var element = $('tr[data-uid="' + row.uid + '"] ');
        $(element).addClass("length16");
    });
}
function Grid3RowColor() {
    var grid = $("#grid3").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var element = $('tr[data-uid="' + row.uid + '"] ');
        $(element).addClass("length16");
    })
}
function GridPOPRowColor() {
    var grid = $("#Datepopup").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var element = $('tr[data-uid="' + row.uid + '"] ');
        $(element).addClass("length16");
    })
}
function ColorChange() {
    //debugger;
    var grid = $("#Trialgrid").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var ACid = row.AC_ID;
        if (ACid.length == 4) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length4");
        }
        else if (ACid.length == 8) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length8");
        }
        else if (ACid.length == 12) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length12");
        }
        else if (ACid.length == 16) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length16");
        }
        else if (ACid.length == 20) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length20");
        }
        else if (ACid.length == 24) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length24");
        }
        else if (ACid.length == 28) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length28");
        }
        else if (ACid.length == 32) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length32");
        }
        else if (ACid.length == 36) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length36");
        }
        else if (ACid.length == 40) {
            var element = $('tr[data-uid="' + row.uid + '"] ');
            $(element).addClass("length40");
        }
    });
}

$(document).ready(function () {
    var OPDRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().OPENDR.sum;
    var OPCRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().OPENCR.sum;

    var TRDRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().TRNDR.sum;
    var TRCRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().TRNCR.sum;

    var CLDRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().CLOSEDR.sum;
    var CLCRTotal = $("#Trialgrid").data().kendoGrid.dataSource.aggregates().CLOSECR.sum;

    $("#OPDRTotal").text(Number(OPDRTotal).toFixed(2));
    $("#OPCRTotal").text(Number(OPCRTotal).toFixed(2));
    $("#TRDRTotal").text(Number(TRDRTotal).toFixed(2));
    $("#TRCRTotal").text(Number(TRCRTotal).toFixed(2));
    $("#CLDRTotal").text(Number(CLDRTotal).toFixed(2));
    $("#CLCRTotal").text(Number(CLCRTotal).toFixed(2));

    $('#Division').change(function () {
        $("#Trialgrid").data('kendoGrid').dataSource.data([]);
    })
    $('#From').change(function () {
        $("#Trialgrid").data('kendoGrid').dataSource.data([]);
    })
    $('#To').change(function () {
        $("#Trialgrid").data('kendoGrid').dataSource.data([]);
    })
    $("#Clear").click(function () {
        $("#Trialgrid").data('kendoGrid').dataSource.data([]);
    })

    $('#OB').change(function () {
        var grid = $("#Trialgrid").data("kendoGrid");
        if (this.checked) {
            grid.showColumn("OPENDR");
            grid.showColumn("OPENCR");
        }
        else {
            grid.hideColumn("OPENDR");
            grid.hideColumn("OPENCR");
        }
    })
    $('#TRN').change(function () {
        var grid = $("#Trialgrid").data("kendoGrid");
        if (this.checked) {
            grid.showColumn("TRNDR");
            grid.showColumn("TRNCR");
        }
        else {
            grid.hideColumn("TRNDR");
            grid.hideColumn("TRNCR");
        }
    })
    $('#CB').change(function () {
        var grid = $("#Trialgrid").data("kendoGrid");
        if (this.checked) {
            grid.showColumn("CLOSEDR");
            grid.showColumn("CLOSECR");
        }
        else {
            grid.hideColumn("CLOSEDR");
            grid.hideColumn("CLOSECR");
        }
    })
});
function fnFiscalYr() {
    var srch = "~/PopupFiscalYear.aspx";
    PopupFiscalYear = window.open(srch, "PopupFiscalYear", "height=350,width=300,scrollbars=yes,left=240,top=230");
}
$("#PeriodDate").click(function () {    
    window.open("/GL/PeriodDate", "PopupWindow", "width=350,height=400,left=400,top=220");
})

$("#PeriodDate2").click(function () {
    var window = $("#DatePopup");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
})

$('#Trialgrid').on("dblclick", "tr", function (e) {
    //debugger;
    var grid = $("#Trialgrid").data("kendoGrid");

    var AC_ID = grid.selectable._downTarget[0].childNodes['0'].innerHTML;
    var AC_CD = grid.selectable._downTarget[0].childNodes['1'].innerHTML;
    var AC_NM = grid.selectable._downTarget[0].childNodes['2'].innerHTML;
    var AC_CAT = grid.selectable._downTarget[0].childNodes['3'].innerHTML;
    var CIND = grid.selectable._downTarget[0].childNodes['4'].innerHTML;
    var OPENDR = grid.selectable._downTarget[0].childNodes['5'].innerHTML;
    var OPENCR = grid.selectable._downTarget[0].childNodes['6'].innerHTML;
    var TRNDR = grid.selectable._downTarget[0].childNodes['7'].innerHTML;
    var TRNCR = grid.selectable._downTarget[0].childNodes['8'].innerHTML;
    var CLOSEDR = grid.selectable._downTarget[0].childNodes['9'].innerHTML;
    var CLOSECR = grid.selectable._downTarget[0].childNodes['10'].innerHTML;

    $("#AC_ID").val(AC_ID);
    $("#AC_CD").val(AC_CD);
    $("#AC_NM").val(AC_NM);
    $("#AC_CAT").val(AC_CAT);
    $("#CIND").val(CIND);
    $("#OPENDR").val(OPENDR);
    $("#OPENCR").val(OPENCR);
    $("#TRNDR").val(TRNDR);
    $("#TRNCR").val(TRNCR);
    $("#CLOSEDR").val(CLOSEDR);
    $("#CLOSECR").val(CLOSECR);
    window.open("/GL/AccControl/", "PopupWindow", "width=800,height=560,left=100,top=100");
    return true;

});

function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
    //return [date.getFullYear(), mnth, day].join("-");
}
$('#Datepopup').on("dblclick", "tr", function (e) {
    //  debugger;
    var grid = $("#Datepopup").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex
    var From = grid.dataSource._data[no].From;
    var To = grid.dataSource._data[no].To;
    var FromDt = convert(From);
    var ToDt = convert(To);
    $("#From").val(FromDt);
    $("#To").val(ToDt);
    $("#Fromdt").val(FromDt);
    $("#Todt").val(ToDt);
    var window = $("#DatePopup");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();

})
$(document).ready(function () {

    $("#excel").click(function () {
        $("#Trialgrid").data("kendoGrid").saveAsExcel();
    })
    $("#pdf").click(function () {

        $("#Trialgrid").data("kendoGrid").saveAsPDF();
    });

    $("#excelpop").click(function () {
        $("#grid2").data("kendoGrid").saveAsExcel();
    })
    $("#pdfpop").click(function () {

        $("#grid2").data("kendoGrid").saveAsPDF();
    });

    $("#excelpop2").click(function () {
        $("#grid3").data("kendoGrid").saveAsExcel();
    })
    $("#pdfpop2").click(function () {

        $("#grid3").data("kendoGrid").saveAsPDF();
    });


})

function printGrid() {

    var gridElement = $("#Trialgrid"),
        printableContent = '',
        win = window.open('', '', 'width=800, height=500'),
        doc = win.document.open();

    var htmlStart =
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Kendo UI Grid</title>' +
            '<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
            '<style>' +
            'html { font: 11pt sans-serif; }' +
            '.k-grid { border-top-width: 0; }' +
            '.k-grid, .k-grid-content { height: auto !important; }' +
            '.k-grid-content { overflow: visible !important; }' +
            'div.k-grid table { table-layout: auto; width: 100% !important; }' +
            '.k-grid .k-grid-header th { border-top: 1px solid; }' +
            '.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
            '</style>' +
            '</head>' +
            '<body>';

    var htmlEnd =
            '</body>' +
            '</html>';

    var gridHeader = gridElement.children('.k-grid-header');
    if (gridHeader[0]) {
        var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
        printableContent = gridElement
            .clone()
                .children('.k-grid-header').remove()
            .end()
                .children('.k-grid-content')
                    .find('table')
                        .first()
                            .children('tbody').before(thead)
                        .end()
                    .end()
                .end()
            .end()[0].outerHTML;
    } else {
        printableContent = gridElement.clone()[0].outerHTML;
    }

    doc.write(htmlStart + printableContent + htmlEnd);
    doc.close();
    win.print();
}
