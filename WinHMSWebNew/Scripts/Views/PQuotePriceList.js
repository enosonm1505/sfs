$(document).ready(function () {
    prcLoadProperty();
    $(".HdrBtnBx").hide();
    $("#ChkHoriz").prop('checked', true);
    $('#txtQtDt').kendoDatePicker({ format: "dd/MM/yyyy" });

    $("#CmnDivPOP").on('shown.bs.modal', function () {
        var grid = $("#CmnGridPOP").data("kendoGrid");
        grid.refresh();
    });

    $("#btnCncl,#btnclose").click(function () {
        $("#CmnDivPOP").modal("hide");
        $("#CmnGridPOP").empty();
    });

    $("#txtQtDt").change(function () {
        //debugger;
        GridPopQT();
        PrcLoadBatchList();
    });

    $("#txtQtDt").change(function () {
        //debugger;
        GridPopQT();
        PrcLoadBatchList();
    });

    var todayDate = new Date();
    $("#txtQtDt").data("kendoDatePicker").value(todayDate);

});

function prcLoadProperty() {
    //debugger;
    /*Global Variables of this Project*/
    window.Prop_Id = "";
    /*Global Variables of this Project*/

    //Property Dropdown Load
    var COMPID = $("#COMPID").val();
    var Table = {};
    Table["REQTYPE"] = "PROPERTY";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var ddlcomp = JSON.parse(data);
            //debugger;
            $("#divPropbox").kendoDropDownList({ dataTextField: "COMPANY_NM", dataValueField: "COMPANY_ID", dataSource: ddlcomp, height: 100 });
            $("#divPropbox").data("kendoDropDownList").value(COMPID);
        }
    });

    var OnchangeProp = function () {
        var dropdowlist = $("#divPropbox").data("kendoDropDownList");
        Prop_Id = dropdowlist.value();

        if ($.trim(Prop_Id) != "") {
            $("#divTheme").removeClass("pagefalse");
            DropdownCall(Request, pageurl, $.trim(Prop_Id)); //Request, pageurl, Prop_Id Given Id is the Window Variables of this Project   
        }
        else {
            $("#divTheme").addClass("pagefalse");
        }
    }
}

function PopupBatch() {
    //debugger;
    GridPopQT();
    PrcLoadBatchList();
}

function PrcLoadBatchList() {
    $("#txtQtDt").val();

    var reqobj = {};
    reqobj["COMPID"] = $("#COMPID").val();
    reqobj["REQTYPE"] = "BATCHSELECT";
    reqobj["CreatDt"] = $("#txtQtDt").val();

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            if (data != "") {
                var values = JSON.parse(data);
                var grid = $("#CmnGridPOP").data("kendoGrid");
                grid.dataSource.data(values);
            }
            else {
                $("#CmnGridPOP").empty();
            }
        }
    });
    $("#CmnDivPOP").modal('show');
}

var GridPopQT = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BATCH_ID: { type: "string" },
                    BATCH_REF: { type: "string" },
                    BATCH_DESC: { type: "string" },
                }
            }
        },
    });

    $("#CmnGridPOP").kendoGrid({
        dataSource: datsource,
        filterable:
        {
            mode: "row"
        },
        selectable: "row",
        height: 370,
        columns: [
            {
                field: "BATCH_ID", title: 'Batch No', width: "20%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
            {
                field: "BATCH_REF", title: 'Ref No', width: "20%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
            {
                field: "BATCH_DESC", title: 'Description', width: "50%", headerAttributes: { "class": "table-header-cell", style: "text-align:center" },
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: "10%", title: "", headerAttributes: {
                    "class": "table-header-cell", style: "text-align:center"
                },
                template: "<input type='checkbox' name='ChkSelect' id='ChkSelect'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" }
            },
        ],
        editable: false,
    });
}

function SelectBatchNo() {
    //debugger;
    var grid = $("#CmnGridPOP").data("kendoGrid");
    var sel = $("input:checked", grid.tbody).closest("tr");

    var Items = "";
    var ArrayItm = [];

    $.each(sel, function (idx, row) {
        var Item = grid.dataItem(row);

        if (Items == "")
            Items = Item.BATCH_ID;
        else
            Items = Items + "','" + Item.BATCH_ID;

        ArrayItm.push(Item.BATCH_ID);
    })

    if (Items == "") {
        alert('Select atleast one Record');
    }
    else {

        $("#BatchId").val(Items);
        $("#txtQuote").val(ArrayItm);
        $("#CmnDivPOP").modal("hide");
        $("#CmnGridPOP").empty();
    }
}

function setColumnWidths(grid, options) {
    var lockedCount = 0;
    for (var i = 0; i < options.columns.length; i++) {
        if (options.columns[i].hasOwnProperty('locked')) {
            if (options.columns[i].locked) {
                lockedCount++;
            }
        }
    }

    for (var i = 0; i < options.columns.length; i++) {
        var width = 900;
        grid.columns[i].width = width;
        if (options.columns[i].hasOwnProperty('locked') && options.columns[i].locked) {
            $("#grid .k-grid-header-locked").find("colgroup col").eq(i).width(width);
            $("#grid .k-grid-content-locked").find("colgroup col").eq(i).width(width);

        } else {
            $("#grid .k-grid-header-wrap").find("colgroup col").eq(i - lockedCount).width(width);
            $("#grid .k-grid-content").find("colgroup col").eq(i - lockedCount).width(width);
        }
    }
    // Hack to refresh grid visual state
    grid.reorderColumn(1, grid.columns[0]);
    grid.reorderColumn(1, grid.columns[0]);
}

function mergeGridRows(gridId, colTitle) {
    $('#' + gridId + '>.k-grid-content>table').each(function (index, item) {
        var dimension_col = 1;
        // First, scan first row of headers for the "Dimensions" column.
        $('#' + gridId + '>.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
            if ($(this).text() == colTitle) {

                // first_instance holds the first instance of identical td
                var first_instance = null;

                $(item).find('tr').each(function () {

                    // find the td of the correct column (determined by the colTitle)
                    var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                    if (first_instance == null) {
                        first_instance = dimension_td;
                        first_instance.attr('colspan', 7);

                    } else if (dimension_td.text() == first_instance.text()) {
                        // if current td is identical to the previous
                        // then remove the current td
                        dimension_td.remove();
                        // increment the rowspan attribute of the first instance
                        first_instance.attr('rowspan', typeof first_instance.attr('rowspan') == "undefined" ? 2 : first_instance.attr('rowspan') + 1);
                    } else {
                        // this cell is different from the last
                        first_instance = dimension_td;
                    }
                });
                return;
            }
            dimension_col++;
        });

    });
}

function fnPriceLoadList() {
    var GroupBy = "";
    if ($("#ChkHoriz").prop("checked") == true)
        GroupBy = "1";
    else if ($("#ChkVerti").prop("checked") == true)
        GroupBy = "2";

    var reqobj = {};
    reqobj["COMPID"] = $("#COMPID").val();
    reqobj["REQTYPE"] = "QUOTEPRICE";
    reqobj["BatchNo"] = $("#BatchId").val();
    reqobj["GroupBy"] = GroupBy;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {

            if (data.trim() != "") {
                var result = JSON.parse(data);
                //var result = $.parseJSON(data.Response);
                $("#grdPriceList").empty();

                $("#grdPriceList").kendoGrid({
                    scrollable: true,
                    pageable: false,
                    //sortable: true,
                    resizable: true,
                    Batch: true,
                    dataBound: function (e) {
                        var grid = $("#grdPriceList").data("kendoGrid");
                        var data = grid.dataSource.data();

                        if (GroupBy == "1") {
                            //debugger;
                            for (var j = 0; j < grid.columns.length; j++) {
                                var ColNm = grid.columns[j].field;
                                //if (ColNm == "ProdId" || ColNm == "ShrtQty" || ColNm == "DelayDay" || ColNm == "RequireQty")
                                //    $("#grdPriceList th[data-field= " + ColNm + "]").addClass("ColHWidth1");
                                //else if(ColNm == "Product" || ColNm == "Supplier")
                                //    $("#grdPriceList th[data-field= " + ColNm + "]").addClass("ColHWidth1");
                                //else
                                $("#grdPriceList th[data-field= " + ColNm + "]").addClass("ColHWidth1");
                            }

                            $.each(data, function (i, row) {
                                debugger;
                                var element = $('tr[data-uid="' + row.uid + '"]');

                                element[0].cells['0'].colSpan = element[0].cells.length;

                                for (var j = 0; j < element[0].cells.length; j++) {

                                    //if (j != 0)
                                    //    element[0].cells[j].hidden = true;

                                    var element3 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + j + ')');
                                    $(element3).addClass("ColCWidth1");


                                    //else if (i == 2 || i == 6) {
                                    //    var element3 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');
                                    //    $(element3).addClass("ColCWidth1");
                                    //}
                                    //else
                                    //{
                                    //    var element3 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');
                                    //    $(element3).addClass("ColCWidth1a");
                                    //}
                                    //    $(element3).addClass("");
                                }
                            });
                        }
                        else {

                            for (var j = 0; j < grid.columns.length; j++) {
                                var ColNm = grid.columns[j].field;
                                $("#grdPriceList th[data-field= " + ColNm + "]").addClass("ColumnHeaderWidth");
                            }

                            $.each(data, function (i, row) {
                                //debugger;
                                var element = $('tr[data-uid="' + row.uid + '"]');

                                element[0].cells['0'].colSpan = element[0].cells.length;

                                for (var i = 0; i < element[0].cells.length; i++) {
                                    // element[0].cells[i].hidden = true;
                                    var element3 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');
                                    $(element3).addClass("widthCell");
                                }
                            });
                        }
                    },
                    ServerOperation: false,
                    dataSource: {
                        data: result,
                        pageSize: 500
                    }
                });
            }
        }
    });
}