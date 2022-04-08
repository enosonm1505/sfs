// JavaScript source code
var CmnPopLoad = function (Request, Glurl) {
    debugger;
    GridPop();
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;  
    reqobj["REQTYPE"] = Request.REQTYPE;

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseQuote/API_CALL",
        type: 'POST',
        data: "request=" + ParamVal,  
        success: function (d) {
           debugger;
           var Detemp = JSON.parse(d);
            var grid = $("#CmnGrid").data("kendoGrid");
            grid.dataSource.data(Detemp.Itm);
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}



var GridPop = function ()
{  
   debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { validation: { required: true }, type: "string" },
                    NM: { type: "string" },
                }
            }
        }, 
    });

    $("#CmnGrid").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
      scrollable: true,
       navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {
                field: "ID", title: 'Id', width: 20, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "NM", title: 'Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
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


var GridPopPur = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    INDENT_NO: { validation: { required: true }, type: "string" },
                    INDENTDT: { type: "string" },
                    NARRATION: { type: "string" },

                    UNIT_ID: { type: "string" },
                    PO_TY_ID: { type: "string" },
                    
                },
                

            }
        },
    });

    $("#PurReqSrcGrd").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
        scrollable: true,
      navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {
               // width:50,
                field: "INDENT_NO", title: 'PR NO', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 150,
                field: "INDENTDT", title: 'PR DT', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width:200,
                field: "NARRATION", title: 'Narration', width: 150, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                title: 'Select', width: 40,
                template:  "<input type='checkBox' id='chkCmp'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" },
            },
        ],
        //header
        editable: false,

    });
}


function uomid(prodid, TO_UOM_ID) {
    debugger;

    window.uomToFrom = "";
    //  window.iduom = "";
    // iduom = Detemp.TOUOMID;

    var filterop = window.iduom;
    var filterop1 = window.Fromuom;

    var fil = $.grep(filterop, function (v) {
        // debugger;
        var lens = (v.FROM_UOM_ID.trim() == TO_UOM_ID.trim()) && (v.SR_NO == '0' || v.PROD_ID.trim() == prodid.trim());
        return lens;

    });
    console.log(fil);


    var fil1 = $.grep(filterop1, function (v) {
        // debugger;
        var lens = (v.TO_UOM_ID.trim() == TO_UOM_ID.trim()) && (v.SR_NO == '0' || v.PROD_ID.trim() == prodid.trim());
        return lens;

    });
    console.log(fil1);


    //window.re = fil;

    var events = [];
    debugger;
    var prev = "";
    var prev1 = "";

    var valobj = {};

    valobj["UnomID"] = TO_UOM_ID;

    valobj["UnomNM"] = TO_UOM_ID;

    events.push(valobj);

    if (fil.length != 0) {
        $.each(fil, function (i, value) {

            // var cut = value.TO_UOM_ID
            //   if (cut != prev) {
            var valobj = {};

            valobj["UnomID"] = value.TO_UOM_ID;

            valobj["UnomNM"] = value.TO_UOM_ID;

            events.push(valobj);
            //   }
            // prev = value.TO_UOM_ID;
        });
    }

    if (fil1.length != 0) {
        $.each(fil1, function (i, value) {

            // var cut = value.TO_UOM_ID
            //   if (cut != prev) {
            var valobj = {};

            valobj["UnomID"] = value.FROM_UOM_ID;

            valobj["UnomNM"] = value.FROM_UOM_ID;

            events.push(valobj);
            //   }
            // prev = value.TO_UOM_ID;
        });
    }

    uomToFrom = events;
}

function Uomtofrom(container, options) {
    debugger;
    _grid = $("#PurMainGrd").data("kendoGrid");
    var _Selectedgrid = _grid.dataItem(_grid.select());

    uomid(_Selectedgrid.Itemid, _Selectedgrid.PROD_UOM);

    var ddlUomTo = window.uomToFrom;
  

    $('<input data-bind="value:' + options.field + '"/>').appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "UnomNM",
            dataValueField: "UnomID",
            dataSource: ddlUomTo,
            autoWidth: true,
            //height: 80,
            open: adjustDropDownWidth,
            attributes: { style: "height:10px;" },
            template: "<span data-id='${data.UnomID}'>${data.UnomNM}</span>",
            select: function (e) {
                var id = e.item.find("span").attr("data-id");
                var nm = e.item.find("span").text();
                _Selectedgrid.UnomID = "";
                _Selectedgrid.UnomID = id;
                _Selectedgrid.UnomNM = nm;
                //_grid.refresh();
                //var rowindx = _grid.selectable.userEvents.currentTarget.rowIndex;
                //var firstcell = _grid.table.find('tr:eq(' + rowindx + ')');
                //_grid.select(firstcell);
                //firstcell.trigger('click');
            }
        });
}





var GridPurmainpop = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PROD_ID: { validation: { required: true }, type: "string", editable: false },
                    UOM_ID: { type: "string", editable: false },
                    PROD_DETAILS: { type: "string", editable: false },
                    INDENT_NO: { type: "string", editable: false },
                    PENDQTY: { type: "number" },
                    //UOMID: { type: "string" , editor: Uomtofrom},
                    PROD_NM1: { type: "string", editable: false },
                    PROD_UOM: { type: "string", editable: false },
                   

                },
                

            }
        },pageSize: 10,
    });

    $("#PurGrdReq").kendoGrid({

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
            {
                width:150,
                field: "PROD_NM1", title: 'Product Name', width: 150, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 50,
                field: "INDENT_NO", title: 'PR NO', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 50,
                field: "PROD_UOM", title: 'UOM', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
             {
                 width: 100,
                 field: "PENDQTY", title: 'Balance Qty', width: 100, attributes: { style: "text-align:right" },
                 filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains",                        
                     }
                 }
             },
            {
                title: 'Select', width: 40,
                template: "<input type='checkBox' id='chkCmp'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" },
            },
        ],
        //header
        editable: true,

    });
}

//Prepare Request for Multiple Supplier
var GridPopPurscr = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PARTY_ID: { validation: { required: true }, type: "string" },
                    PARTY_NM: { type: "string" },
                }
            }
        }, 
    });

    $("#MulSupGrid").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
        scrollable: true,
        navigatable: true, 
        // change: Footerrowcalc,   
        columns: [
            {
                field: "PARTY_ID", title: 'Id', width: 20, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "PARTY_NM", title: 'Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
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

var GridPopMulSup = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: { 
                    PARTY_ID: { validation: { required: true }, type: "string" },
                    PARTY_NM: { type: "string", display: false },
                }
            }
        },
    });

    $("#PurReqMul").kendoGrid({

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
            {
                field: "PARTY_NM", title: 'Name', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
              {
                  width: 15,
                  template: "<i class='fa fa-search' onclick='EditGuest();' style='cursor:pointer; padding-right: 0px;' title='Edit Profile'></i>", attributes: { style: "text-align:center" }
              },

             {
                 width: 15,
                 template: "<i class='fa fa-trash-o' onclick='FnDeleReqType();' style='cursor:pointer; padding-right: 0px;'  title='Delete'></i>", attributes: { style: "text-align:center" }
             },

             {
                 width: 25,
                 template: "<button type='button' class='btn btn-custom' onclick='fnReqTypeAdd();'  Style='height:12px'  data-button='Add' title='Add'><i class='fa fa fa-plus'></i> </button>", attributes: { style: "text-align:center" }
             },
        ],
        //header
        editable: false,

    });
}

var GridpopReqeuno = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                     DISP_NO: { type: "string" },
                    PARTY_ID: { type: "string" },
                    RFQ_ID: { validation: { required: true },type: "numeric" }, 
                    RFQ_DT: { type: "string" },
                    PARTY_NM: { type: "string" },
                    REM: { type: "string"},
                   
                }
            }
        },
    });

    $("#CmnGridReqno").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
        scrollable: true,
        navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {
                width: 50,
                field: "RFQ_ID", title: 'Req No', width: 40, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }

            },
            {

                field: "RFQ_DT", title: 'Req Dt', width: 70, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "PARTY_NM", title: 'Supplier', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {

                field: "REM", title: 'Request Details', width: 100, attributes: { style: "text-align:left" }, filterable: {
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

var GridMainPuritems = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    Itemid: { type: "string", editable: false },
                    ItemNm: { type: "string", editable: false },                    
                    Datails: {  type: "string" },
                    Qty: { type: "number", validation: { min: 0 } },
                    PROD_UOM: { type: "string" },
                    ARRV: { type: "date" },                   
                    Narration: {  type: "string" },
                    
                }
            }
        },
    });

    $("#PurMainGrd").kendoGrid({

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
            {
                width: 50,
                field: "Itemid", title: 'Item Id', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 25,
                template: "<i class='fa fa-search' onclick='SearchItemsProd();' style='cursor:pointer; padding-right: 0px;' title='Search'></i>", attributes: { style: "text-align:center" }
            },
            {
                width: 100,
                field: "ItemNm", title: 'Item Name', width: 98, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },

            {
                width: 75,
                field: "Datails", title: 'Details', width: 74, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
              {
                  width: 25,
                  template: "<i class='fa fa-search' onclick='ItemDetailsPOP();' style='cursor:pointer; padding-right: 0px;' title='Edit Profile'></i>", attributes: { style: "text-align:center" }
              },

            {
                width: 75,
                field: "Qty", title: 'Qty', type: "number", format: "{0:n3}", width: 74, attributes: { style: "text-align:right" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },

             { field: "PROD_UOM", title: 'Uom', width: '70px', editor: Uomtofrom },
             {
                 width: 75,
                 field: "ARRV", type:"date", title: 'Need by Dt',  width: '74px', 
                 format: "{0: dd/MM/yyyy}",
                 filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },

             {
                 width: 100,
                 field: "Narration", title: 'Narration', width: 98, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },

              {
                  width: 25,
                  template: "<i class='fa fa-trash-o'  onclick='DeleteFunction();' style='cursor:pointer; padding-right: 0px;'  title='Delete'></i>", attributes: { style: "text-align:center" }
              },
              {
                  width: 25,
                  template: "<button type='button' class='btn btn-custom' onclick='fnAddNewRow();'  Style='height:12px'  data-button='Add' title='Add'><i class='fa fa fa-plus'></i> </button>", attributes: { style: "text-align:center" }
              },

        ],
        //header
        editable: true,
        //change: onPurMainGrdgridchange

    });
}

function onPurMainGrdgridchange()
{
    debugger;


    

    var date = $("#ARRV").data("kendoDatePicker");

    


    var grid = $("#PurMainGrd").data("kendoGrid");
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
    var Cellindx = grid._current[0].cellIndex;
    if(Cellindx == 7)
    {
        var date = grid.dataSource._data[rowIndex].ARRV;
        //alert(date);
    }
   

}

function FnDeleReqType()
{
    var grid = $("#PurReqMul").data("kendoGrid");

    debugger
    var total = grid.dataSource.data().length;
    ////if (total != 1) {
    grid.select().each(function () {
        var dataItem = grid.dataItem($(this));
        grid.dataSource.remove(dataItem);
    });

    if (total == 1)
        fnReqTypeAdd();
}


//$("#btnResAdd").click(function (e) {
//    //debugger;
       
//    var newgrd = {}
//    newgrd.Itemid = "";
//    newgrd.ItemNm = "";
//    newgrd.Datails = "";
//    newgrd.Qty = "";
//    newgrd.PROD_UOM = "";
//    newgrd.ARRV = "";
//    newgrd.Narration = "";
//    var Mngrd = $("#PurMainGrd").data("kendoGrid");      
//    Mngrd.dataSource.add(newgrd);
//    Mngrd.refresh();


//    //AddRow("PurMainGrd");
//    //var _grid_Datas = $("#GrdReservation").data("kendoGrid");
//    //var selectedItem = _grid_Datas.dataItem(_grid_Datas.select());
//    //selectedItem.ARRV_DAY = "Thu";
//    //selectedItem.DEPART_DAY = "Thu";
//    //_grid_Datas.refresh();
//})
//onclick = 'fnAddNewRow()'

function fnAddNewRow()  {
   debugger;
   var alermsm = $("#PurMainGrd").data("kendoGrid").dataSource.data();
   var Alert = $.grep(alermsm, function (v) {
       var lens = (v.ItemNm.trim() == "");
       return lens;

   });
   console.log(Alert);

   if (Alert.length > 0) {
       $("#AlertImg").show();
       $("#DivSuccess").hide();
       $("#DivAlert").show();
       $("#DivAlertPopup").modal('show');
       $(".AlertPoptxt").html("Item can't be Empty.");
       return false;
   }

   var Alert1 = $.grep(alermsm, function (v) {
       debugger;
       //if (v.Qty == 0)
       //{
       //    $("#DivAlertPopup").modal('show');
       //    $(".AlertPoptxt").html("Quantity  can't be Empty.");
       //    return false;
       //}

       var lens = (v.Qty == null || v.Qty == 0);
       return lens;

   });
   console.log(Alert1);
   if (Alert1.length > 0) {
       $("#AlertImg").show();
       $("#DivSuccess").hide();
       $("#DivAlert").show();
       $("#DivAlertPopup").modal('show');
       $(".AlertPoptxt").html("Quantity can't be Empty.");
       return false;
   }  

    var newgrd = {}
    newgrd.Itemid = "";
    newgrd.ItemNm = "";
    newgrd.Datails = "";
    newgrd.Qty = "";
    newgrd.PROD_UOM = "";
    newgrd.ARRV = "";
    newgrd.Narration = "";
    var Mngrd = $("#PurMainGrd").data("kendoGrid");
    Mngrd.dataSource.add(newgrd);
    Mngrd.refresh();
}


function DelTermsCond()
{


    var grid = $("#GridTermsCond").data("kendoGrid");

    debugger
    // var total = grid.dataSource.data().length;
    ////if (total != 1) {
    grid.select().each(function () {
        debugger;
        var dataItem = grid.dataItem($(this));       
        dataItem.TEXTBOX = "";
        dataItem.PO_TERMS_ID = "";
            //grid.dataSource.remove(dataItem);
    });
    $("#GridTermsCond").data("kendoGrid").refresh();
}


   

function fnReqTypeAdd() {
   debugger;

    var alermsm = $("#PurReqMul").data("kendoGrid").dataSource.data();
   
    var Alert = $.grep(alermsm, function (v) {
        var lens = (v.PARTY_NM.trim() == "");
        return lens;

    });
    console.log(Alert);

    if (Alert.length > 0) {
        $("#AlertImg").show();
        $("#DivSuccess").hide();
        $("#DivAlert").show();
        $("#DivAlertPopup").modal('show');
        $(".AlertPoptxt").html("Multiple Supplier can't be Empty.");
        return false;
    }
    var newgrd = {}
    newgrd.PARTY_ID = "";
    newgrd.PARTY_NM = "";
    var Mngrd = $("#PurReqMul").data("kendoGrid");
    Mngrd.dataSource.add(newgrd);
    Mngrd.refresh();
    var view = Mngrd.dataSource.view();

    //if (view.length > 0)
    //{
    //    Mngrd.select(Mngrd.table.find("tr[data-uid='" + view[view.length].uid + "']"));
    //}


}

function DeleteFunction() {
    var grid = $("#PurMainGrd").data("kendoGrid");

    debugger
    var total = grid.dataSource.data().length;
    ////if (total != 1) {
        grid.select().each(function () {
            var dataItem = grid.dataItem($(this));
            grid.dataSource.remove(dataItem);
        });

        if (total == 1)
            emptygrd();
}

var CustKendoDatepicker = function (container, options) {
    //debugger;
    //options.model.NIGHTS = 1;
    _grid = $("#GrdReservation").data("kendoGrid");
    // var rowindx = _grid.selectable.userEvents.currentTarget.rowIndex;           //Get Row Index
    // var rowindx = _grid.select();
    //var days;
    //$('<input data-bind="value:' + options.field + '">').appendTo(container)
    //.kendoDatePicker({
    //    change: function () {
    //        debugger;
    //        if (options.field == "ARRV") {
    //            var arrvval = this.value();
    //            days = (arrvval - options.model.DEPART) / (1000 * 60 * 60 * 24);
    //            options.model.NIGHTS = days;
    //            options.model.ARRV_DAY = GetdayName(arrvval);
    //        }           
    //        _grid.refresh();
    //        //_grid.select('tr:eq(0)');
    //        //   var firstcell = _grid.table.find('tr:eq(' + rowindx + ')');
    //        //  _grid.select(firstcell);
    //        //firstcell.trigger('click');
    //    }
    //});
}

var GridTermsConditions = function () {
   // debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PO_TERMS_TY_ID: { validation: { required: true }, type: "string" },
                    PO_TERMS_TY_NM: { type: "string" },
                    TEXTBOX: { type: "string" },
                    PO_TERMS_ID: { type: "string" },
                }
            }
        },
    });

    $("#GridTermsCond").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        Height: 300,
        scrollable: true,
        sortable: true,
        selectable: "row",
        navigatable: true,
        // change: Footerrowcalc,
        columns: [            
            {
                field: "PO_TERMS_TY_NM", title: 'Name', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },

             {
                 field: "TEXTBOX", title: 'Name', width: 100, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },

             {
                 width: 15,
                 template: "<i class='fa fa-search' onclick='ScrTermsCond();' style='cursor:pointer; padding-right: 0px;' title='Edit Profile'></i>", attributes: { style: "text-align:center" }
             },

             {
                 width: 15,
                 template: "<i class='fa fa-trash-o' onclick='DelTermsCond();' style='cursor:pointer; padding-right: 0px;'  title='Delete'></i>", attributes: { style: "text-align:center" }
             },

        ],
        //header
        editable: false,

    });
}

function DelTerms() {
    debugger;
    var grid = $("#GridTermsCond").data("kendoGrid");
    var rowindx = grid.selectable.userEvents.currentTarget.rowIndex;

    var getchild = $("#GridTermsCond").data("kendoGrid").dataSource.data()[rowindx];
    getchild.TEXTBOX = "";
    getchild.PO_TERMS_ID = "";
    //getchild.PO_TERMS_TY_ID = "";
    //getchild.PO_TERMS_TY_NM = "";

    $("#GridTermsCond").data("kendoGrid").refresh();

}


var GridInstruction = function () {
  //  debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    SNo: { validation: { required: true }, type: "string" },
                    Instruction: { type: "string" },
                    //TEXTBOX: { type: "string" },
                }
            }
        },
    });

    $("#GridInstruc").kendoGrid({

        dataSource: datsource,
        //filterable:
        //    {
        //        mode: "row"
        //    },
        selectable: "row",
        scrollable: {
            scrollable: true,
            Height: 300,
            virtul: false
        },
        navigatable: true,
        // change: Footerrowcalc,
        columns: [
             {
                 field: "SNo", title: 'S No', width: 20, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },

              {
                  field: "Instruction", title: 'Instruction', width: 100, attributes: { style: "text-align:left" }, filterable: {
                      cell: {
                          showOperators: false, operator: "contains",
                          suggestionOperator: "contains"
                      }
                  }
              },          

             {
                 width: 15,
                 template: "<i class='fa fa-trash-o' onclick='fnInstrucDelet();' style='cursor:pointer; padding-right: 0px;'  title='Delete'></i>", attributes: { style: "text-align:center" }
             },

             {
                 width: 25,
                 template: "<button type='button' class='btn btn-custom' onclick='fnReqInstruAdd();'  Style='height:12px'  data-button='Add' title='Add'><i class='fa fa fa-plus'></i> </button>", attributes: { style: "text-align:center" }
             },

        ],
        //header
        editable: true,

    });
}




function fnInstrucDelet() {
    var grid1 = $("#GridInstruc").data("kendoGrid");

    debugger
    var total = grid1.dataSource.data().length;
    grid1.select().each(function () {
        var dataItem = grid1.dataItem($(this));
        grid1.dataSource.remove(dataItem);
    });

    if (total == 1)
        fnReqInstruAdd();
    else {
        var events = [];
        //var grid2 = $("#GridInstruc").data("kendoGrid");
        var grid3 = $("#GridInstruc").data("kendoGrid");
        for (var i = 0; i < grid3._data.length; i++) {

            var valIns = {};

            valIns["SNo"] = i + 1;

            valIns["Instruction"] = grid3.dataSource._data[i].Instruction;

            events.push(valIns);
            //var newdel = {};
            //newdel.SNo = i + 1;
            //newdel.Instruction = grid3.dataSource._data[i].Instruction;
         
        }
        grid3.dataSource.data(events);

       
    }
}


function fnReqInstruAdd() {
    debugger;

    var alermsm = $("#GridInstruc").data("kendoGrid").dataSource.data();

    var Alert = $.grep(alermsm, function (v) {
        var lens = (v.Instruction.trim() == "");
        return lens;

    });
    console.log(Alert);

    if (Alert.length > 0) {
        $("#AlertImg").show();
        $("#DivSuccess").hide();
        $("#DivAlert").show();
        $("#DivAlertPopup").modal('show');
        $(".AlertPoptxt").html("Instructions can't be Empty.");
        return false;
    }


    var Mngrd = $("#GridInstruc").data("kendoGrid");
    var total = Mngrd.dataSource.data().length;
    var newgrd = {}
    if (total == 0)
        newgrd.SNo = 1;
    else
        newgrd.SNo = total + 1;

    newgrd.Instruction = "";
    Mngrd.dataSource.add(newgrd);
    Mngrd.refresh();
}

var GridBatchQuote = function () {
    //   debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BATCH_ID: { validation: { required: true }, type: "string" },
                    DISP_NO: { type: "string" },
                    BATCH_REF: { type: "string" },
                    BATCH_DESC: { type: "string" },
                }
            }
        },

    });

    $("#GridBatchqu").kendoGrid({

        dataSource: datsource,
        //filterable:
        //    {
        //        mode: "row"
        //    },

        height: 400,
        // scrollable: true,
        sortable: true,
        selectable: "row",
        navigatable: true,

        // change: Footerrowcalc,
        columns: [
             {
                 field: "BATCH_ID", title: 'Batch No', width: 50, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },

              {
                  field: "BATCH_REF", title: 'Ref No', width: 50, attributes: { style: "text-align:left" }, filterable: {
                      cell: {
                          showOperators: false, operator: "contains",
                          suggestionOperator: "contains"
                      }
                  }
              },

               {
                   field: "BATCH_DESC", title: 'Description', width: 100, attributes: { style: "text-align:left" }, filterable: {
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

//Search Terms and Conditions
var GrdscrTerms = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PO_TERMS_TY_ID: { validation: { required: true }, type: "string" },
                    PO_TERMS_ID: { type: "string" },
                    PO_TERMS_1: { type: "string" },
                },


            }
        }, pageSize: 8,
    });

    $("#GridScrTerm").kendoGrid({

        dataSource: datsource,      
        selectable: "row",
        scrollable: true,
        navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {
                
                field: "PO_TERMS_1", title: 'PR NO', width: 150, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                //field: "PO_TERMS_1", title: 'PR NO', width: 150, attributes: { style: "text-align:left; display:none" }, filterable: {
                //    cell: {
                //        showOperators: false, operator: "contains",
                //        suggestionOperator: "contains"
                //    }
                //},

                title: 'Select', width: 40,
                template: "<input type='checkBox' id='chkTemscnt' onclick='fntemscnt();'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" },
            },
        ],
        //header
        editable: false
       // change: SelectItems
    });
}


function SelectItems() {
    debugger;
    var grid = $("#GridScrTerm").data("kendoGrid");
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
    var Cellindx = grid._current[0].cellIndex;

    alert(Cellindx);
    if (Cellindx == 7) {
        var date = grid.dataSource._data[rowIndex].ARRV;
        //alert(date);
    }


}



var GrdItemSrh = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    PROD_ID: { type: "string" },
                    PROD_NM: { type: "string" },
                },


            }
        }, 
    });

    $("#CmnItmGrid").kendoGrid({

        dataSource: datsource,
        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        scrollable: true,
        navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {

                field: "PROD_ID", title: 'Prod Id', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {

                field: "PROD_NM", title: 'Prod Name', width: 150, attributes: { style: "text-align:left" }, filterable: {
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

var ddlQuotebasic = function (Request, Glurl) {
    //debugger;
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQTYPE"] = Request.REQTYPE;

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseQuote/API_CALL",
        type: 'POST',
        data: "request=" + ParamVal,
        success: function (data) {
            //debugger;
            var Detemp = JSON.parse(data);
           
           
        }
    });
}


var LoadItemsSrh = function (Request, Glurl) {
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};


    var reqobj = {};
    reqobj["COMPID"] = COMPID;
    reqobj["REQTYPE"] = "LOADITEMSDETAILS";
    reqobj["PRODGRPID"] = window.DDLProdgrp;
    reqobj["PRODSUBGRPID"] = window.DDLProdsubgrp;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            debugger;
            $('#DDLProdgrp').kendoDropDownList({ dataTextField: "PROD_GR_NM", dataValueField: "PROD_GR_ID", dataSource: values.PRODGRP, height: 100, optionLabel: "<--All-->" });
            $('#DDLProdSubgrp').kendoDropDownList({ dataTextField: "PROD_SUB_GR_NM", dataValueField: "PROD_SUB_GR_ID", dataSource: values.PRODSUBGRP, height: 100, optionLabel: "<--All-->" });

            var grid = $("#CmnItmGrid").data("kendoGrid");
            grid.dataSource.data(values.PRODGRID);

        }
    });


function fnAddNewRow1() {
    debugger;

    var newgrd = {}
    newgrd.Itemid = "";
    newgrd.ItemNm = "";
    newgrd.Datails = "";
    newgrd.Qty = "";
    newgrd.PROD_UOM = "";
    newgrd.ARRV = "";
    newgrd.Narration = "";
    var Mngrd = $("#PurMainGrd,#PurQuoteMainGrd").data("kendoGrid");
    Mngrd.dataSource.add(newgrd);
    Mngrd.refresh();
}

function DeleteFunction1() {
    var grid = $("#PurMainGrd,#PurQuoteMainGrd").data("kendoGrid");

    debugger
    var total = grid.dataSource.data().length;
    ////if (total != 1) {
        grid.select().each(function () {
            var dataItem = grid.dataItem($(this));
            grid.dataSource.remove(dataItem);
        });

        if (total == 1)
            emptygrd();
}


    //reqobj["COMPID"] = Request.COMPID;
    //reqobj["REQTYPE"] = Request.REQ_NM;
    //reqobj["PRODGRPID"] = window.DDLProdgrp;
    //reqobj["PRODSUBGRPID"] = window.DDLProdsubgrp;
    //var ParamVal = JSON.stringify(reqobj);
    //$.ajax({
    //    type: "POST",
    //    url: "/PurchaseQuote/API_CALL",
    //    data: "request=" + ParamVal,
    //    success: function (data) {
    //        var values = JSON.parse(data);
    //        debugger;
    //        $('#DDLProdgrp').kendoDropDownList({ dataTextField: "PROD_GR_NM", dataValueField: "PROD_GR_ID", dataSource: values.DROPPRODGRP, height: 100, optionLabel: "<all>" });
    //        $('#DDLProdSubgrp').kendoDropDownList({ dataTextField: "PROD_SUB_GR_NM", dataValueField: "PROD_SUB_GR_ID", dataSource: values.DROPPRODSUBGRP, height: 100, optionLabel: "<all>" });


    //        var grid = $("#CmnItmGrid").data("kendoGrid");
    //        grid.dataSource.data(values.DROPPRODGRID);

    //    }
    //});
}