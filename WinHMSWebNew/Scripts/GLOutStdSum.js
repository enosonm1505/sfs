$("#AC_NM").attr('disabled', true);
$("#AC_ID").attr('disabled', true);
var grid = $("#grid2").data("kendoGrid");


function RowdataBound() {
    debugger;
    var AMT = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().AMT.sum;
    var BELOW30 = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().BELOW30.sum;
    var BELOW60 = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().BELOW60.sum;
    var BELOW90 = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().BELOW90.sum;
    var BELOW180 = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().BELOW180.sum;
    var ABOVE180 = $("#OutStandingAgeSum").data().kendoGrid.dataSource.aggregates().ABOVE180.sum;
    $("#AMTS").text(AMT);
    $("#BELOW30S").text(BELOW30);
    $("#BELOW60S").text(BELOW60);
    $("#BELOW90S").text(BELOW90);
    $("#BELOW180S").text(BELOW180);
    $("#ABOVE180S").text(ABOVE180);

    var grid = $("#OutStandingAgeSum").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var ACnm = row.AC_NM;
        if (ACnm == "Total") {
            var element = $('tr[data-uid="' + row.uid + '"]');
            $(element).addClass("TotalColor");
        }
    })
}




$("#GroupNmSearch").click(function () {
    var window = $("#GroupNameSearch");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
})

$("#allpartDiv2").hide();
$("#DateType").val("VouchDt");
$('#VoucherDateV').click(function () {
    $("#DateType").val("VouchDt");
})
$('#DueDate').click(function () {
    $("#DateType").val("DueDate");
})
$('#BillDate').click(function () {
    $("#DateType").val("BillDate");
})

$("#openSearch").click(function () {
    var window = $("#OutStandingBillSearchCustPop");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
})

var chkap = $("#ChkAR").val();
var chkar = $("#ChkAP").val();
$.ajax({
    type: "POST",
    url: "/GLTransaction/fnLoadIND_GroupVal",
    data: "id1=" + chkap + "&id2=" + chkar,
    success: function (data) {
    }
});





$("#excel").click(function () {
    $("#OutStandingAgeSum").data("kendoGrid").saveAsExcel();
})
$("#pdf").click(function () {

    $("#OutStandingAgeSum").data("kendoGrid").saveAsPDF();
});


  $(document).on("click", "#Display", function (e) {
            debugger;
            var grid = $("#GroupGrid").data("kendoGrid");
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            var dataSource = grid.dataSource;
            var total = grid.dataSource.data().length;
            var FinalAC_ID = "";
            if (total != 0) {
                var no = (total - 1);
                var Amount1 = "0";
                var item = 0;
                for (; item < total; item++) {
                    if (grid.dataSource._data[item].Select == true) {
                        var AC_ID = grid.dataSource._data[item].AC_ID;
                        if (item == 0) {
                            FinalAC_ID = AC_ID;
                        }
                        else {
                            FinalAC_ID = FinalAC_ID + "," + AC_ID;
                        }
                    }
                }
            }
            var DateType = $("#DateType").val();
            var DivVal = $("#Division").val();
            var FDRCRTrn = "";
            var DrTrn = $("#DrTrn").val();
            var CrTrn = $("#DrTrn").val();
            if ($("#DrTrn")[0].checked == true && $("#CrTrn")[0].checked == true) {
                FDRCRTrn = "3";
            }
            else if ($("#CrTrn")[0].checked == true) {
                FDRCRTrn = "2";
            }
            else if ($("#DrTrn")[0].checked == true) {
                FDRCRTrn = "1";
            }

            if (FinalAC_ID == "") {
                FinalAC_ID = $("#GroupName").val();
              
            }
            if (FinalAC_ID != "") {
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/DisplayFunction",
                    data: "id1=" + FinalAC_ID + "&DateType=" + DateType + "&DivVal=" + DivVal + "&FDRCRTrn=" + FDRCRTrn,
                    success: function (data) {
                        $("#OutStandingAgeSum").data("kendoGrid").dataSource.read();

                    }
                });
            }
            else {
                $("#AlertMessageHdn").val('Please Select Group Name.');
                $("#alertType").val('fail');
                AlertMesaage();
            }
        });
        function AlertMesaage() {
            var meg = $("#AlertMessageHdn").val();
            $("#alertMeg").text(meg);

            var alertty = $("#alertType").val();
            if (alertty == 'fail') {
                $("#alertimg").show();
                $("#saveimg").hide();
            }
            else {
                $("#saveimg").show();
                $("#alertimg").hide();
            }
            var window = $("#AlertBill");
            var kWnd = window.data("kendoWindow");
            kWnd.center().open();
        }

        $("#GroupGrid table").on("change", "td", function (e) {
           
            var grid = $("#GroupGrid").data("kendoGrid");
            var rowIndex = grid._rowVirtualIndex;
            var no = rowIndex;
            document.getElementById("chkbx");
            var dataSource = grid.dataSource;
            if (grid._current[0].childNodes[0].checked == true) {
                grid.dataSource._data[no].Select = true;
                $("#GroupName").data('kendoDropDownList').value(0).text(" ");
            }
            else if (grid._current[0].childNodes[0].checked == false) {
                grid.dataSource._data[no].Select = false;
            }

        });

        $("#Allpartychkbx2").click(function () {
            var Allpartychkbx = $("#Allpartychkbx2").val();
            if ($("#Allpartychkbx2")[0].checked == true) {
                $("#allpartDiv2").hide();
            }
            else if ($("#Allpartychkbx2")[0].checked == false) {
                $("#allpartDiv2").show();
            }
        })

        $("#GroupName").change(function () {
            $("#OutStandingAgeSum").data('kendoGrid').dataSource.data([]);
            var gropnm = $("#GroupName").val();
            if (gropnm != "") {
                var grid = $("#GroupGrid").data("kendoGrid");
                var rowIndex = grid._rowVirtualIndex;
                var no = rowIndex;
                var dataSource = grid.dataSource;
                var total = grid.dataSource.data().length;
                if (total != 0) {
                    var item = 0;
                    for (; item < total; item++) {
                        grid.dataSource._data[item].Select == false;
                    }
                }
            }
        })
        function printGrid() {
            var gridElement = $("#OutStandingAgeSum"),
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
                    '<body onload="window.print()">';

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
           // win.print();
        }
