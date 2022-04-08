var GridPopQT = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    //QUOTE_ID: { validation: { required: true }, type: "string" },
                    QUOTE_NO: { type: "string" },
                    QUOTE_DT: { type: "string" },
                    //PARTY_ID: { type: "string" },
                    PARTY_NM: { type: "string" },
                }
            }},
    });

    $("#CmnGridPOP").kendoGrid({
        
        dataSource: datsource,

        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "QUOTE_NO", title: 'Quote No', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "QUOTE_DT", title: 'Quote Dt', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },
            {
                field: "PARTY_NM", title: 'Supplier', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
        ],
        //header
        editable: false,
    });
}

var GridQuoteReqpop = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    RFQ_ID: { validation: { required: true }, type: "string" },
                    DISP_NO: { type: "string" },
                    RFQ_DT: { type: "string" },
                    PARTY_ID: { type: "string" },
                    PARTY_NM: { type: "string" },
                    REM: { type: "string" },
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
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "DISP_NO", title: 'Request No', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "RFQ_DT", title: 'Request Dt', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },
            {
                field: "PARTY_NM", title: 'Supplier', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "REM", title: 'Request Details', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
        ],
        //header
        editable: false,
    });
}


var GridTaxSplit =  function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {

                    TAX: { type: "string" },
                    Rate: { type: "double" },
                    Value: { type: "double" },
                    ITEM_SNO: { type: "double" },
                    ItemId: { type: "string" },
                    taxper: { type: "double" },
                }
            }
        },
    });




    $("#CmnItmTaxGrid").kendoGrid
        ({

            dataSource: datsource,
            //filterable:
            //    {
            //        mode: "row"
            //    },
            selectable: "row",
            scrollable: true,
            navigatable: true,

            // change: Footerrowcalc,
            columns: [


                  { field: "TAX", title: 'Tax', width: '100px', editor: Taxddl },

                {
                    width: 100,
                    field: "Rate", title: 'Rate',  format: "{0:n6}", width: 70, attributes: { style: "text-align:left" }, filterable: {
                        cell: {
                            showOperators: false, operator: "contains",
                            suggestionOperator: "contains",
                            format: "{0:n6}"
                        }
                    }
                },

                {
                    width: 100,
                    field: "Value", title: 'Value', format: "{0:n2}", width: 70, attributes: { style: "text-align:left" }, filterable: {
                        cell: {
                            showOperators: false, operator: "contains",
                            suggestionOperator: "contains",
                            format: "{0:n2}"
                        }
                    }
                },
                {
                    width: 100,
                    field: "ITEM_SNO", title: 'ItmId', width: 70, attributes: { style: "text-align:left;display:none;" }, filterable: {
                        cell: {
                            showOperators: false, operator: "contains",
                            suggestionOperator: "contains",
                            
                        }
                    }
                },

                  {
                      width: 25,
                      template: "<button type='button' class='btn btn-custom' onclick='fnAddNewRowTax();'  Style='height:12px'  data-button='Add' title='Add'><i class='fa fa fa-plus'></i> </button>", attributes: { style: "text-align:center" }
                  },

            ],
            //header
            editable: true,

        });
}

function fnAddNewRowTax() {
    //debugger;
    var grid = $("#PurQuoteMainGrd").data("kendoGrid");
    var selitm = grid.dataItem(grid.select());

    var newgrd = {}
    newgrd.TAX = "";
    newgrd.Rate = "0.000000";
    newgrd.Value = "0.00";
    newgrd.ItemId = selitm.Itemid;
    newgrd.ITEM_SNO = selitm.ItemSno;
    newgrd.taxper = "0.00";
    var Taxgrd = $("#CmnItmTaxGrid").data("kendoGrid");
    Taxgrd.dataSource.add(newgrd);
    Taxgrd.refresh();
}


function Taxddl(container, options) {
    //debugger;
    _grid = $("#CmnItmTaxGrid").data("kendoGrid");
    var _Selectedgrid = _grid.dataItem(_grid.select());
    var ctg= window.TaxsplitId;

    $('<input data-bind="value:' + options.field + '"/>').appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "TAX_NM",
            dataValueField: "TAX_NM",
            dataSource: ctg,
            autoWidth: true,
            //height: 80,
            open: adjustDropDownWidth,
            
            attributes: { style: "height:10px;" },
            template: "<span data-id='${data.TAX_ID}'>${data.TAX_NM}</span>",
            select: function (e) {
                var id = e.item.find("span").attr("data-id");
                var nm = e.item.find("span").text();
                //_Selectedgrid.RES_TYPE = "";
                _Selectedgrid.TAX_ID = id;
                _Selectedgrid.TAX_NM = nm;
               
            }
        });
}

var GridMainPuritemsload = function () {
    // //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    Itemid: { editable: false, validation: { required: true }, type: "string" },
                    ItemNm: { editable: false, type: "string" },
                    Datails: { editable: false, validation: { required: true }, type: "string" },
                    Qty: { validation: { editable: true, required: true }, type: "string" },
                    PROD_UOM: { editable: true, type: "string" },
                    ARRV: { editable: true, type: "date" },
                    RequireQty: { editable: true, type: "number", validation: {min:0} },
                    quoteQty: { editable: true, type: "number", validation: { min: 0 } },
                    BasicRt: { editable: true, type: "number", validation: { min: 0 } },
                    OtherCh: { editable: false, type: "number", validation: { min: 0 } },
                    NetRt: { editable: false, type: "number", validation: { min: 0 } },
                    NetVal: { editable: false, type: "number", validation: { min: 0 } },
                    DeliveryDt: { editable: true, type: "date" },
                    Narration: { editable: false, validation: { required: true }, type: "string" },
                    ItemSno: { editable: false, type: "string", validation: { min: 0 } },
                    //approval
                    vChk: { editable: false, type: "string" },
                    vPref: { editable: false, type: "string" },
                    vRej: { editable: false, type: "string" },
                   // QUOTE_NO: { editable: false, type: "string" },

                }
            }
        },
    });

    $("#PurQuoteMainGrd").kendoGrid
    ({
        dataSource: datsource,
        //filterable:
        //    {
        //        mode: "row"
        //    },
        selectable: "row",
        scrollable: true,
        navigatable: true,
        //edit:grdCloseCell(),
        // change: Footerrowcalc,
        columns: [
            {
                width: 80,
                field: "Itemid", editable: false, title: 'Item Id', width: 80, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains",

                    }
                }
            },
            {
                width: 30,
                template: "<i class='fa fa-search' onclick='SearchItems();' Style='cursor:pointer; padding-right: 0px;' title='Search'></i>", attributes: { Style: "text-align:center" }
            },
            {
                width: 120,
                field: "ItemNm", title: 'Item Name', width: 120, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },

            {
                width: 75,
                field: "Datails", title: 'Details', width: 74, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 30,
                template: "<i class='fa fa-search' onclick='EditItmDet();'  style='cursor:pointer; padding-right: 0px;' title='Item Detail'></i>", attributes: { Style: "text-align:center" }
            },
              { field: "PROD_UOM", editable: true, title: 'Uom', width: '70px', editor: Uomtofrom },
            {
                width: 100,
                field: "RequireQty", title: 'Require Qty', format: "{0:n3}", width: 100, attributes: { Style: "text-align:left", min: 0, }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains",
                    }
                }
            },
            {
                width: 75,
                field: "quoteQty", title: 'Qty', format: "{0:n3}", width: 74, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains",
                        format: "{0:n3}"
                    }
                }
            },
            {
                width: 100,
                field: "BasicRt", title: 'Basic Rate', format: "{0:n4}", width: 100, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains",
                        format: "{0:n4}"
                    }
                }
            },
            {
                width: 100,
                field: "OtherCh", title: 'Other Charge', format: "{0:n4}", width: 100, attributes: { Style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains",
                        format: "{0:n2}"
                    }
                }
            },
           {
               width: 30,
               template: "<i class='fa fa-search' onclick='EditTax();' style='cursor:pointer; padding-right: 0px;' title='Tax Split '></i>", attributes: { Style: "text-align:center" }
           },

           {
               width: 75,
               field: "NetRt", title: 'Net Rate', format: "{0:n3}", width: 74, attributes: { Style: "text-align:left" }, filterable: {
                   cell: {
                       showOperators: false, operator: "contains",
                       suggestionOperator: "contains",
                       format: "{0:n2}"
                   }
               }
           },
           {
               width: 75,
               field: "NetVal", title: 'Net Value', format: "{0:n3}", width: 74, attributes: { Style: "text-align:left" }, filterable: {
                   cell: {
                       showOperators: false, operator: "contains",
                       suggestionOperator: "contains",
                       format: "{0:n2}"
                   }
               }
           },
            {
                width: 100,
                field: "DeliveryDt", title: 'Delivery Dt', width: '100px',
                format: "{0: dd/MM/yyyy}",
                filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            //approval page
              {
                  field: "vPref", title: 'Preff Supplier', width: 50,
                  template: "<input type='checkBox' id='vPref' onclick='QuoteGrdcheckchange()'   #=vPref=='1'?  checked='checked':''#   height=15px; width=15px;  />"// headerHtmlAttributes: { style: "text-align:Center;display:none;" },
              },
              {
                  field: "vChk", title: 'Approve', width: 50,
                  template: "<input type='checkBox' id='vChk' onclick='QuoteGrdcheckchange()'   #=vChk=='1'?  checked='checked':''# height=15px; width=15px;  />"// headerHtmlAttributes: { style: "text-align:Center;display:none;" },
              },
              {
                  field: "vRej", title: 'Reject', width: 50,
                  template: "<input type='checkBox' onclick='QuoteGrdcheckchange()' id='vRej'  #=vRej=='1'?  checked='checked':''# height=15px; width=15px;  />" //headerHtmlAttributes: { style: "text-align:Center;display:none;" },
              },
              //approval page

              {
                  title: 'Delete', width: 40,
                  template: "<i class='fa fa-trash-o'  onclick='DeleteFunction1();'  ></i>"
              },
              {
                  title: 'Add', width:40,
                  template: "<button type='button' class='btn btn-custom' onclick='fnAddNewRow1();'  ><i class='fa fa fa-plus'></i> </button>"
              },
        ],
        //header
        editable: true,

    });

}



$('#PurQuoteMainGrd').on("click", "#vPref", function (e) {
    debugger;
    var grid = $("#PurQuoteMainGrd").data("kendoGrid");
    var Selected = $(this).is(':checked');
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;

    if (Selected == true) {

        var CurProd = grid._data[rowIndex].hProdId;

        for (var j = 0; j < grid._data.length; j++) {

            $.each(grid._data, function (rowIndex, row) {

                var PevProd = grid._data[j].hProdId;

                if (PevProd == CurProd)
                    grid.dataSource._data[j].vPref = "0";
            });
        }
        grid.dataSource._data[rowIndex].vPref = "1";
        grid.dataSource._data[rowIndex].vChk = "1";
        grid.dataSource._data[rowIndex].vRej = "";
    }
    else {
        if (grid.dataSource._data[rowIndex].vChk == "1")
            grid.dataSource._data[rowIndex].vPref = "";
        else {
            grid.dataSource._data[rowIndex].vPref = "";
            grid.dataSource._data[rowIndex].vChk = "";
        }
    }
    grid.refresh();

});

$('#PurQuoteMainGrd').on("click", "#vChk", function (e) {
    debugger;
    //alert(0);
    var grid = $("#PurQuoteMainGrd").data("kendoGrid");
    var Selected = $(this).is(':checked');
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
    var no = rowIndex;
    if (Selected == true) {
        if (grid.dataSource._data[no].vRej == "1") {
            grid.dataSource._data[no].vRej = "";
            grid.dataSource._data[no].vChk = "1";
        }
        else {
            grid.dataSource._data[no].vChk = "1";
        }
    }
    else {
        if (grid.dataSource._data[no].vPref == "1") {
            grid.dataSource._data[no].vPref = "";
            grid.dataSource._data[no].vChk = "";
        }
        else {
            grid.dataSource._data[no].vChk = "";
        }
    }
    grid.refresh();

});

$('#PurQuoteMainGrd').on("click", "#vRej", function (e) {
    debugger;
    //alert(0);
    var grid = $("#PurQuoteMainGrd").data("kendoGrid");
    var Selected = $(this).is(':checked');
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
    var no = rowIndex;
    if (Selected == true) {
        //if (grid.dataSource._data[no].vPref == "1") {
        //    grid.dataSource._data[no].vPref == ""
        //    grid.dataSource._data[no].vChk = "";
        //    grid.dataSource._data[no].vRej = "1";
        //}
        //else if (grid.dataSource._data[no].vPref == "1") {
        //    grid.dataSource._data[no].vRej = "1";
        //    grid.dataSource._data[no].vPref = "";
        //}
        //else {
            grid.dataSource._data[no].vRej = "1";
            grid.dataSource._data[no].vPref = ""
            grid.dataSource._data[no].vChk = "";
        //}
    }
    else {
        grid.dataSource._data[no].vRej = "";
    }
    grid.refresh();
});







//function QuoteGrdcheckchange() {

//    var grid = $("#PurQuoteMainGrd").data("kendoGrid");
//    var Cellindx = grid._current[0].cellIndex;

//    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
//    var no = rowIndex;

//    if (window.PAGE == "2") {
//        var Approve = $("#ddlAppStatus").data("kendoDropDownList").value();
//        if (Approve != "2") {
//            grid.dataSource._data[no].vPref = "";
//            grid.dataSource._data[no].vChk = "";
//            grid.dataSource._data[no].vRej = "";
//            // grid.refresh();
//            return false;
//        }


//        if (Cellindx == "14") {
//            for (var i = no; i < grid.dataSource._data.length ; i++) {
//                debugger;
//                if (grid.dataSource._data[i].vPref == "1" || grid.dataSource._data[i].vPref == "") {
//                    grid.dataSource._data[i].vPref = "1";
//                    grid.dataSource._data[i].vChk = "1";
//                    grid.dataSource._data[i].vRej = "";
//                }
//                else if (grid.dataSource._data[i].vPref == "0") {
//                    grid.dataSource._data[i].vPref = "";
//                    grid.dataSource._data[i].vChk = "1";
//                    grid.dataSource._data[i].vRej = "";

//                }
               
//                // grid.refresh();
//                break;
//            }

//        }

//        if (Cellindx == "15") {
//            for (var i = no; i < grid.dataSource._data.length ; i++) {
//                grid.dataSource._data[i].vPref = "";
//                grid.dataSource._data[i].vChk = "1";
//                grid.dataSource._data[i].vRej = "";
//                // grid.refresh();
//                break;
//            }

//        }
//        if (Cellindx == "16") {
//            for (var i = no; i < grid.dataSource._data.length ; i++) {
//                grid.dataSource._data[i].vPref = "";
//                grid.dataSource._data[i].vChk = "";
//                grid.dataSource._data[i].vRej = "1";
//                //grid.refresh();
//                break;
//            }
//        }
//        grid.refresh();
//    }
   
//    //debugger;
//}

