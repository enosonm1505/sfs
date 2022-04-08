$("#DateType").val("VouchDt");
$("#Column1hdn").val("0 - 30");
$("#Column2hdn").val("31 - 45");
$("#Column3hdn").val("46 - 90");
$("#Column4hdn").val("91 - 120");
$("#Column5hdn").val("121 - 140");
$("#Column6hdn").val("141 - 180");
$("#Column7hdn").val("181 - 220");
$("#Column8hdn").val("221>");
$("#Column9hdn").val("241 - 260");
$("#Column10hdn").val("260 - 280");
$("#Column11hdn").val("281>");

function RowdataBound() {
    //debugger;
    var AMT = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().AMT.sum;
    var Column1 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column1.sum;
    var Column2 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column2.sum;
    var Column3 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column3.sum;
    var Column4 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column4.sum;
    var Column5 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column5.sum;
    var Column6 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column6.sum;
    var Column7 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column7.sum;
    var Column8 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column8.sum;
    var Column9 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column9.sum;
    var Column10 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column10.sum;
    var Column11 = $("#OutStandingAge").data().kendoGrid.dataSource.aggregates().Column11.sum;
    $("#AMTS").text(AMT);
    $("#Column1S").text(Column1);
    $("#Column2S").text(Column2);
    $("#Column3S").text(Column3);
    $("#Column4S").text(Column4);
    $("#Column5S").text(Column5);
    $("#Column6S").text(Column6);
    $("#Column7S").text(Column7);
    $("#Column8S").text(Column8);
    $("#Column9S").text(Column9);
    $("#Column10S").text(Column10);
    $("#Column11S").text(Column11);
    var grid = $("#OutStandingAge").data("kendoGrid");
    var data = grid.dataSource.data();
    $.each(data, function (i, row) {
        var ACid = row.AC_NM;
        //if (ACid == "Total") {
        //    var element = $('tr[data-uid="' + row.uid + '"] ');                  
        //    grid.select().each(function () {
        //        var dataItem = grid.dataItem($(this));                     
        //        grid.dataSource.remove(dataItem);                
        //    })
        //}
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
$("#addColumn").click(function () {
    var grid = $("#AddColumgrid").data("kendoGrid");
    var total = grid.dataSource.data().length;
    var no = (total - 1);
    var dataSource = grid.dataSource;
    if (grid.dataSource.data().length == 0 || grid.dataSource.data().length == undefined) {
        dataSource.add({ FromDays: 0, ToDAys: 30 });
        dataSource.add({ FromDays: 31, ToDAys: 45 });
        dataSource.add({ FromDays: 46, ToDAys: 90 });
        dataSource.add({ FromDays: 91, ToDAys: 120 });
        dataSource.add({ FromDays: 121, ToDAys: 140 });
        dataSource.add({ FromDays: 140, ToDAys: 180 });
        dataSource.add({ FromDays: 181, ToDAys: 220 });
        dataSource.add({ FromDays: 0, ToDAys: 0 });
        dataSource.add({ FromDays: 0, ToDAys: 0 });
        dataSource.add({ FromDays: 0, ToDAys: 0 });
    }
    var window = $("#AddColimnBillNm");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
})

$("#DeleteColumn").click(function () {
    $("#OutStandingAge").data('kendoGrid').dataSource.data([]);
    var grid = $("#OutStandingAge").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    var total = grid.columns.length;
    if (total != 0) {
        var no = (total - 1);
        var Amount1 = "0";
        var item = 0;
        var Grdnm = "";

        for (; item < total; item++) {
            if (grid.columns[item].hidden == undefined) {
                Grdnm = item;
            }
        }
        if (Grdnm > 2) {
            grid.hideColumn(Grdnm);
        }
        var total2 = grid.columns.length;
        var item2 = 0;
        for (; item2 < total2; item2++) {
            if (grid.columns[item2].hidden == undefined) {
                Grdnm = item2;
            }
        }
        var title = grid.columns[Number(Grdnm)].title;
        var S = title.split("-");
        var title = S[0];
        if (title == "0 ") {
            grid.hideColumn(13);
        }
        else {
            title = title + " " + ">";
            //$("#Column11hdn").val(title);               
            if (Grdnm == 3) {
                $("#OutStandingAge th[data-field= Column1]").html(title);
                $("#Column1hdn").val(title);
            }
            else if (Grdnm == 4) {
                $("#OutStandingAge th[data-field= Column2]").html(title);
                $("#Column2hdn").val(title);
            }
            else if (Grdnm == 5) {
                $("#OutStandingAge th[data-field= Column3]").html(title);
                $("#Column3hdn").val(title);
            }
            else if (Grdnm == 6) {
                $("#OutStandingAge th[data-field= Column4]").html(title);
                $("#Column4hdn").val(title);
            }
            else if (Grdnm == 7) {
                $("#OutStandingAge th[data-field= Column5]").html(title);
                $("#Column5hdn").val(title);
            }
            else if (Grdnm == 8) {
                $("#OutStandingAge th[data-field= Column6]").html(title);
                $("#Column6hdn").val(title);
            }
            else if (Grdnm == 9) {
                $("#OutStandingAge th[data-field= Column7]").html(title);
                $("#Column7hdn").val(title);
            }
            else if (Grdnm == 10) {
                $("#OutStandingAge th[data-field= Column8]").html(title);
                $("#Column8hdn").val(title);
            }
            else if (Grdnm == 11) {
                $("#OutStandingAge th[data-field= Column9]").html(title);
                $("#Column9hdn").val(title);
            }
            else if (Grdnm == 12) {
                $("#OutStandingAge th[data-field= Column10]").html(title);
                $("#Column10hdn").val(title);
            }
            else if (Grdnm == 13) {
                $("#OutStandingAge th[data-field= Column11]").html(title);
                $("#Column11hdn").val(title);
            }
        }
    }
})

$("#Allpartychkbx").click(function () {
    var Allpartychkbx = $("#Allpartychkbx").val();
    if ($("#Allpartychkbx")[0].checked == true) {
        $("#allpartDiv").hide();
    }
    else if ($("#Allpartychkbx")[0].checked == false) {
        $("#allpartDiv").show();
    }
})


$(document).on("click", "#Display", function (e) {
    var grid = $("#GroupGrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    var dataSource = grid.dataSource;
    var total = grid.dataSource.data().length;
    var FinalAC_ID = "";
    var FinalAC_ID2 = "";
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
    var Range1 = ""; var Range2 = ""; var Range3 = ""; var Range4 = ""; var Range5 = "";
    var Range6 = ""; var Range7 = ""; var Range8 = ""; var Range9 = ""; var Range10 = "";
    var Range11 = "";
    var grid2 = $("#OutStandingAge").data("kendoGrid");
    var dataSource2 = grid2.dataSource;
    var total2 = grid2.columns.length;
    if (total2 != 0) {
        var item2 = 0;
        var Grdnm = "";
        debugger;
        for (; item2 < total2; item2++) {
            if (grid2.columns[item2].hidden == undefined || grid2.columns[item2].hidden == false) {
                if (item2 == 3) {
                    Range1 = $("#Column1hdn").val();
                }
                else if (item2 == 4) {
                    Range2 = $("#Column2hdn").val();
                }
                else if (item2 == 5) {
                    Range3 = $("#Column3hdn").val();
                }
                else if (item2 == 6) {
                    Range4 = $("#Column4hdn").val();
                }
                else if (item2 == 7) {
                    Range5 = $("#Column5hdn").val();
                }
                else if (item2 == 8) {
                    Range6 = $("#Column6hdn").val();
                }
                else if (item2 == 9) {
                    Range7 = $("#Column7hdn").val();
                }
                else if (item2 == 10) {
                    Range8 = $("#Column8hdn").val();
                }
                else if (item2 == 11) {
                    Range9 = $("#Column9hdn").val();
                }
                else if (item2 == 12) {
                    Range10 = $("#Column10hdn").val();
                }
                else if (item2 == 13) {
                    Range11 = $("#Column11hdn").val();
                }
            }
        }
        // Range11 = $("#Column11hdn").val();

    }
    if (FinalAC_ID == "") {
        FinalAC_ID = $("#GroupName").val();
    }
    if (FinalAC_ID != "") {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/DisplayFunction",
            data: "id1=" + FinalAC_ID + "&Range1=" + Range1 + "&Range2=" + Range2 + "&Range3=" + Range3 + "&Range4=" + Range4 +
                "&Range5=" + Range5 + "&Range6=" + Range6 + "&Range7=" + Range7 + "&Range8=" + Range8 + "&Range9=" + Range9 + "&Range10=" + Range10
                + "&Range11=" + Range11 + "&DateType=" + DateType + "&DivVal=" + DivVal + "&FDRCRTrn=" + FDRCRTrn,
            success: function (data) {
                $("#OutStandingAge").data("kendoGrid").dataSource.read();
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

$("#GroupName").change(function () {
    $("#OutStandingAge").data('kendoGrid').dataSource.data([]);
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
$("#GroupGrid table").on("change", "td", function (e) {
    var grid = $("#GroupGrid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    document.getElementById("chkbx");
    var dataSource = grid.dataSource;
    if (grid._current[0].childNodes[0].checked == true) {
        grid.dataSource._data[no].Select = true;
        $("#GroupName").data('kendoDropDownList').value(0);
    }
    else if (grid._current[0].childNodes[0].checked == false) {
        grid.dataSource._data[no].Select = false;
    }

});

$("#openSearch").click(function () {
    var window = $("#OutStandingBillSearch");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
})

function printGrid() {
    var gridElement = $("#OutStandingAge"),
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
  //  win.print();
}
