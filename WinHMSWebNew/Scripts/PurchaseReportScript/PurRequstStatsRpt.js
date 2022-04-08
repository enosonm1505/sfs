
var app = angular.module('MPApp', ['webix']);
app.controller("PurchaseReportsController", function ($scope) {
    $("#LoadDIv").hide();

    var reqtype = [
               { "id": "2", "value": "Daily" },
               { "id": "5", "value": "Regular" },
               { "id": "6", "value": "Reorder" }, ]

   var PrStatus = [
           { "id": " ", "value": "ALL" },
           { "id": "M0", "value": "Draft" },
           { "id": "M4", "value": "Pending Approval" },
           { "id": "M8", "value": "Approved" },
           { "id": "M3", "value": "Completed" },
           { "id": "M6", "value": "Cancelled" },
           {"id": "M9", "value": "Void"},
          { "id": "M5", "value": "Short Closed" },         
          { "id": "M7", "value": "Hold" },           
          { "id": "M1", "value": "Pending for PO" },
          { "id": "M2", "value": "Pending Receipt" },
   ]

    var PoStatus = [
{ "id": " ", "value": "ALL" },
{ "id": "M0", "value": "Draft" },
{ "id": "M3", "value": "Pending Approval" },
{ "id": "M1", "value": "Approved" },
{ "id": "M2", "value": "Completed" },
{ "id": "M4", "value": "Cancelled" },
{ "id": "M5", "value": "Short Closed" },
    ]
    var FnStore = fnstoreid();
    var prodgrp =fnLoadProdGrp();
   // var subgrpid =fnLoadProdSubGrp();
     fnAccountDt();
   fnLoadPoCtrl();
   //var potype = fnLoadPoType();
    $scope.frmRequstStatsRpt = {
        id: "frmRequstStatsRpt",
        view: 'form',
        minWidth: 900,
        //width: 1200,
       height: 550,
        //scroll: false,
        elements: [
           {
               rows: [
                  {
                      cols: [
                            
                              {
                                  view: "radio",
                                  id: "rdbtnBasis",
                                  value: 1,
                                  inputWidth: 120,
                                  width: 105,
                                  options: [{ "id": 1, "value": "Goods" }, { "id": 2, "value": "Service" },],
                                  vertical: true,
                              },
                           
                             
                                                    {
                                                        rows: [{
                                                            cols:[
                                                      {
                                                          view: "datepicker",
                                                          id: "txtFrmDate",
                                                          stringResult: true,
                                                          label: "From",
                                                          format: "%d/%m/%Y",
                                                          labelAlign: "Left",
                                                          labelWidth: 50,
                                                          inputWidth: 180,
                                                          width: 180,
                                                          minWidth: 180,
                                                          value: $("#hdnCurrentDt").val(),
                                                          on: {
                                                              onChange: function (newval, oldval) {
                                                                  //DateChk();
                                                              }
                                                          }
                                                      },
                         
                                                        {
                                                            view: "datepicker",
                                                            id: "txtToDate",
                                                            disable: true,
                                                            stringResult: true,
                                                            label: "To",
                                                            // format: $("#hdnDateFrmt").val() == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                                            format: "%d/%m/%Y",
                                                            labelAlign: "Left",
                                                            labelWidth: 50,
                                                            inputWidth: 180,
                                                            width: 180,
                                                            minWidth: 180,
                                                            value: $("#hdnCurrentDt").val(),
                                                        },
                        

                          {
                              view: "button",
                              id: 'btnDisplay',
                              label: "Display", labelAlign: "left",
                              labelWidth: 0,
                              inputWidth: 100,
                              width: 120,
                              minWidth: 120,
                              on: {
                                  onItemClick: function () {
                                      fnLoadGrid();


                                  }
                              }
                          },
                          {
                              view: "button",
                              id: "btnFilters",
                              value: "Filters",
                              width: 40,
                              label: '<span class="fa fa-filter"></span>',
                              tooltip: true,
                              on: {
                                  onItemClick: function () {
                                      debugger;
                                      $$("AdvFilter").show();

                                  }
                              }
                          },

                         {
                             view: "button",
                             id: "optionsSrch",
                             type: 'icon',
                             css: "webix_primary ",             
                             inputWidth: 40,
                             icon: 'fa fa-list',
                             width: 40,
                             tooltip: "Options",
                             popup:"RptOptionsNew",

                             on: {

                                 onItemClick: function () {
                                     debugger;
                                      $$("RptOptionsNew").show();
                                 }
                             }
                         },


                          {
                              labelWidth: 100, inputWidth: 50,
                              width: 1250, minWidth: 450,
                          },
                          ]}]}

                      ]

                  },
                   {
                       

                                  id: "gridMain",

                                  view: "datatable",
                                  fixedRowHeight: false,
                                  rowLineHeight: 23,
                                  autoConfig: true,
                                  resizeColumn: true,
                                  resizeRow: true,
                                  spans: true,
                                  height: 450,
                                  minWidth: 900,
                                  position: "flex",
                                  css: "webix_header_border wingrd_hight",

                                  scheme: {
                                      $change: function (item) {
                                          debugger;
                                          var Columns = $$('gridMain').config.columns;
                                          var ColCnt = Columns.length;
                                          var PR_NO = item.Prno;
                                          //var PreSiteId = "";
                                          if (PR_NO == $("#HdnPreVal").val()) {
                                              item.Prno = "";
                                          }
                                          else
                                              $("#HdnPreVal").val(item.Prno);
                                          item.Prno.$css = "PRNOHead";

                                      },

                                  },



                                  columns: [

                                        { id: "Prno", header: "P.R.No", width: 110, css: { 'text-align': 'center ! important' }, },
                                        { id: "PoDt", format: "%d/%m/%Y", header: "P.R.Date", width: 100, css: { 'text-align': 'center ! important' }, },
                                       // { id: "Dutdt", format: "%d/%m/%Y", header: [{ text: "Due Dt", css: "multiline" }], width: 100, css: { 'text-align': 'center ! important' }, },
                                        { id: "PRStatus", header: "PR Status", minWidth: 130, css: { 'text-align': 'center ! important','color':'white' }, cssFormat: HDClr1, },
                                        { header: "Color", id: "PRStsClr", width: 90, css: { 'text-align': 'center ! important' }, hidden: true },
                                          { id: "Approvedt", header: "Approved By & Dt", width: 120, css: { 'text-align': 'center ! important' }, hidden: true, },


                                          { id: "ConsPrno", header: "Cons Pr No", minWidth: 130, css: { 'text-align': 'center ! important' }, hidden: true, },
                                          { id: "CnsPrDt", header: "Cons Pr Date", minWidth: 130, css: { 'text-align': 'center ! important' }, hidden: true, },
                                          //{ id: "Uom", header: "Uom", minWidth: 130, css: { 'text-align': 'left ! important' } },
                                            { id: "Prod_id", header: "Product Id", width: 90, css: { 'text-align': 'center ! important' }, hidden: true, },

                                        { id: "ProdNM", header: "Product ", width: 200, css: { 'text-align': 'center ! important' } },
                                         { id: "Categry", header: "Category ", width: 200, css: { 'text-align': 'center ! important' } },
                                         { id: "Value", header: "Value", width: 80, css: { 'text-align': 'center ! important' }, hidden: true, },
                                        { id: "Uom", header: "Uom", minWidth: 70, css: { 'text-align': 'center ! important' } },
                                        { id: "P.R.Qty", header: "P.R.Units", minWidth: 120, css: { 'text-align': 'right ! important' }, format: webix.i18n.numberFormat, },
                                        { id: "CostNM", header: "Cost Name", minWidth: 150, css: { 'text-align': 'center ! important' }, },
                                        
                                        { id: "OrdQty", header: "Order Units", width: 100, css: { 'text-align': 'right ! important' }, format: webix.i18n.numberFormat, },
                                         { id: "ReceiptQty", header: "Receipt Units", width: 100, css: { 'text-align': 'right ! important' }, format: webix.i18n.numberFormat, },
                                         //{ id: "PenIndentQt", header: "Pending Indent Units", width: 100, css: { 'text-align': 'center ! important' },  },
                                           { id: "PenIndentQt", header: "Bal Units", width: 100, css: { 'text-align': 'right ! important' }, format: webix.i18n.numberFormat, },
                                           { id: "PrItmSts", header: "PR Item Status", width: 140, css: { 'text-align': 'center ! important', 'color': 'white' }, cssFormat: HDClr2, }, //---new columnn
                                            { header: "Color", id: "PrItemClr", width: 90, css: { 'text-align': 'center ! important' }, hidden: true },
                                            { id: "shortclqty", header:[ "Short Close","Units"], width: 100, css: { 'text-align': 'right ! important' }, hidden: true, format: webix.i18n.numberFormat, },
                                            { id: "ReqDate", header: "Require Date", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                              { id: "PendPoUnits", header: ["Pending", "Po Units"], width: 100, css: { 'text-align': 'right ! important' }, },

                                              { id: "POno", header: "PO No.", width: 100, css: { 'text-align': 'center ! important' } },  //--newcoloumn
                                              { id: "POSts", header: "PO Status.", width: 100, css: { 'text-align': 'center ! important' } },
                                               { id: "LstPoSuplier", header: "Po Supplier", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },

                                            // { id: "ITemClose", header: "Item Short Close", width: 100, css: { 'text-align': 'center ! important' }, },
                                              
                                                { id: "GRNNo_Dt", header: "GRN No & Dt", width: 130, css: { 'text-align': 'center ! important' } },
                                                  { id: "JustfyRes", header: "Justify Reason", width: 130, css: { 'text-align': 'center ! important' }, hidden: true, },
                                                   { id: "ReqInst", header: "Requester Instruction", width: 150, css: { 'text-align': 'center ! important' }, hidden: true, },
                                                    { id: "Remarks", header: "Remarks", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                          
                                                                                  
                                       
                                                
                                         
                                          { id: "PoSuplier", header: "Show Po Supplier", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },

                                          
                                            { id: "NxtApprov", header: "Next Lvl Approvers", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },

 

                                  ],
                                  data: [], 
                       
                   }

               ]


           },
          


        ]
    }



    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        //css: "WebIxStyle",
        height: 500,
        width: 750,
        move: true,
        body: {
            padding: { right: 3, left: 3, bottom: 0 },
            view: "form",
            id: "frmFilter",
            elements: [
                {
                    width: 750,
                    css: "LayBorder",
                    cols: [
                        {
                            view: "layout",
                            //css:"LayBorder",  
                            width: 372,
                            rows: [

                                    { view: "template", template: "Filter", css: " SecHeader", height: 25, width: 370 },
                                    {
                                        padding: { top: 0, left: 10, bottom: 0, right: 10 },
                                        rows: [

                                              {
                                                  view: "richselect",
                                                  id: "ddlPrStatus",
                                                  label: "PR Status",
                                                  labelAlign: "Left",
                                                  inputWidth: 350,
                                                  labelWidth: 110,
                                                  options: PrStatus,
                                                  value: " ",
                                                  on: {
                                                      "onChange": function (newval, oldvalue) {

                                                          if ($.trim(newval) == "") {

                                                              $$("ddlPoStatus").show();

                                                          }
                                                          else {
                                                              $$("ddlPoStatus").setValue();
                                                              $$("ddlPoStatus").hide();

                                                          }
                                                      }
                                                  }

                                              },

                                                 {
                                                     id: "mulcostcenter",
                                                     view: "multiselect",
                                                     label: "Cost Center",
                                                     labelAlign: "left",
                                                     labelWidth: 110,
                                                     inputWidth: 350,
                                                     width: 480,
                                                     options: FnStore,
                                                     placeholder: "Cost Center",
                                                     on: {
                                                         "onChange": function (newval, oldVal) {
                                                         }
                                                     }
                                                 },

                                                     {
                                                         id: "mulProdGrp",
                                                         view: "multiselect",
                                                         label: "Product Group",
                                                         labelAlign: "left",
                                                         labelWidth: 110,
                                                         inputWidth: 350,
                                                         width: 480,                                  
                                                         options: prodgrp,
                                                         placeholder: "Product Group",
                                                         on: {
                                                             "onChange": function (newval, oldVal) {
                                                                 // ShowOptionsColums(newval, oldVal);
                                                                 debugger;
                                                                 var mulProdGrp=  $.trim( $$("mulProdGrp").getValue());
                                                                 if(mulProdGrp!=""){
                                                                     $$("mulProdSubGrp").show();
                                                                     fnLoadProdSubGrp();
                                                                 }
                                                                 else $$("mulProdSubGrp").hide();
                                                             }
                                                         }
                                                     },




                                                 {
                                                     id: "mulProdSubGrp",
                                                     view: "multiselect",
                                                     label: "Product Sub Group",
                                                     labelAlign: "left",
                                                     labelWidth: 110,
                                                     inputWidth: 350,
                                                     width: 480,
                                                     placeholder: "Product Sub Group",
                                                     hidden:true,
                                                     on: {
                                                         "onChange": function (newval, oldVal) {

                                                         }
                                                     }
                                                 },

                                                     {cols:[{
                                                         view: "switch",
                                                         width: 158,
                                                         labelWidth: 110,
                                                         id: "chkprod",
                                                         label: "Product",
                                                         on: {
                                                             "onChange": function (newval, oldVal) {
                                                                 if (newval == "1") {
                                                                     $$("prodsrch").show();
                                                                     // $$("txtProd").show();
                                                                     $("#hdnSrchVal").val("Product");
                                                                 }
                                                                 if (newval == "0") {
                                                                     $$("prodsrch").hide();
                                                                     $("#hdnPrd_id").val("");
                                                                     $$("grdProdSrch").clearAll();
                                                                     $$("grdProdSrch").editStop();
                                                                     $$("grdProdSrch").add({ "prodid": "", "ProdName": "" });  //
                                                                     $$("grdProdSrch").refresh();
                                                                     $$("grdProdSrch").refreshColumns();
                                                                     // $$("txtProd").setValue(""); $$("txtProd").hide();
                                                                 }

                                                             }
                                                         }
                                                     },

{
    view: "button",
    id: "prodsrch",
    type: 'icon',
    inputWidth: 30,
    icon: 'wxi-search',
    width: 30,
    // disabled: true,
    hidden: true,
    on: {

        onItemClick: function () {
            debugger;
            $("#hdnSrchVal").val("Product");
            //  fnProdPopup();
            $$("PopupProdSrch").show();
        }
    }
},
]


                                                     },

                                                 
                                                  {
                                                      view: "richselect",
                                                      inputWidth: 350,
                                                      labelWidth: 110,
                                                      id: "ddlPoStatus",
                                                      label: "PO Status",
                                                      value:" ",
                                                      options: PoStatus,

                                                  },                                          

                                              //{
                                              //    cols: [{
                                              //        view: "checkbox",
                                              //        width: 135,
                                              //        labelWidth: 110,
                                              //        id: "chkprodGrp",
                                              //        label: "Product Group",
                                              //        on: {
                                              //            "onChange": function (newval, oldVal) {
                                              //                if (newval == "1") {
                                              //                    $$("prodGrpsrch").show();
                                              //                    $("#hdnSrchVal").val("Product Group");
                                              //                }
                                              //                if (newval == "0") {
                                              //                    $$("prodGrpsrch").hide();
                                              //                    $("#hdnPrdGrp_id").val("");
                                              //                    $$("chkprodSubGrp").hide();
                                              //                    $("#hdnPrdSubGrp_id").val("");
                                                             
                                              //                }

                                              //            }
                                              //        }
                                              //    },
                                                      
                                              //         {
                                              //             view: "button",
                                              //             id: "prodGrpsrch",
                                              //             type: 'icon',
                                              //             inputWidth: 30,
                                              //             icon: 'wxi-search',
                                              //             width: 30,
                                              //             // disabled: true,
                                              //             hidden: true,
                                              //             on: {

                                              //                 onItemClick: function () {
                                              //                     debugger;
                                              //                     $("#hdnSrchVal").val("Product Group");
                                              //                     fnProdPopup();
                                              //                     $$("chkprodSubGrp").show();
                                              //                 }
                                              //             }
                                              //         },
                                              //    ]
                                              //},

                                              //{
                                              //    cols: [{
                                              //        view: "checkbox",
                                              //        width: 135,
                                              //        labelWidth: 110,
                                              //        id: "chkprodSubGrp",
                                              //        label: "Product Sub Grp",
                                              //        hidden:true,
                                              //        on: {
                                              //            "onChange": function (newval, oldVal) {
                                              //                if (newval == "1") {
                                              //                    $$("prodSubGrpsrch").show();
                                              //                    $("#hdnSrchVal").val("Product Sub Group");
                                              //                }
                                              //                if (newval == "0") {
                                              //                    $$("prodSubGrpsrch").hide();
                                              //                    $("#hdnPrdSubGrp_id").val("");

                                              //                }

                                              //            }
                                              //        }
                                              //    },

                                              //         {
                                              //             view: "button",
                                              //             id: "prodSubGrpsrch",
                                              //             type: 'icon',
                                              //             inputWidth: 30,
                                              //             icon: 'wxi-search',
                                              //             width: 30,
                                              //             // disabled: true,
                                              //             hidden: true,
                                              //             on: {

                                              //                 onItemClick: function () {
                                              //                     debugger;
                                              //                     $("#hdnSrchVal").val("Product Sub Group");
                                              //                     fnProdPopup();
                                              //                 }
                                              //             }
                                              //         },
                                              //    ]
                                              //},


                                        ]
                                    },
                            ]
                        },


                        {
                            view: "layout",
                            //css:"LayBorder",  
                            width: 372,


                            rows: [
                                {
                                    view: "layout",
                                    css: "LayBorder",
                                    rows: [

                                            { view: "template", template: "", css: " SecHeader", height: 25, width: 370 },

                                            {
                                              //  padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                       {
                                                           view: "switch",
                                                           id: "rdbtnConsReq",
                                                           //value: 1,
                                                           labelWidth: 133,
                                                           inputWidth: 350,
                                                           //width: 480,
                                                           label: "Consoldated Request",
                                                           // customRadio: false,
                                                           // options: [{ "id": "Gds", "value": "Goods" }, { "id": "srs", "value": "Service" }, ],
                                                           // vertical: true,
                                                           on: {
                                                               onChange: function (newval, oldval) {
                                                                   debugger;
                                                                   if (newval == "1") {
                                                                       $$("chkConsPrno").setValue("1");
                                                                       $$("chkCnsPrDt").setValue("1");
                                                                       fnShowHideCol();
                                                                   }
                                                                   else {
                                                                       $$("chkConsPrno").setValue("0");
                                                                       $$("chkCnsPrDt").setValue("0");
                                                                       fnShowHideCol();
                                                                   }
                                                               }
                                                           }
                                                       },

                                                    {
                                                        view: "richselect",
                                                        id: "ddlPoType",
                                                        label: " Po Type",
                                                        labelAlign: "Left",
                                                        inputWidth: 350,
                                                        labelWidth: 90,
                                                        //options: potype,

                                                    },
                                                       {
                                                           id: "mulReqType",
                                                           view: "multiselect",
                                                           label: "Reqs Type",
                                                           labelAlign: "left",
                                                           labelWidth: 90,
                                                           inputWidth: 350,
                                                           width: 480,
                                                           //inputWidth: 540,
                                                           //labelWidth: 100,
                                                           //width: 550,
                                                           //css: 'wd_mltctrl',
                                                           options: reqtype,
                                                           placeholder: "Options",
                                                           value: "2,5,6",
                                                           //minHeight: 50,
                                                           on: {
                                                               "onChange": function (newval, oldVal) {
                                                                   // ShowOptionsColums(newval, oldVal);

                                                               }
                                                           }
                                                       },

                                                    {

                                                        view: "richselect",
                                                        id: "rdbtnSrtBY",
                                                        value: 1,
                                                        label: "SortBy",
                                                        labelAlign: "left",
                                                        labelWidth: 90,
                                                        inputWidth: 350,
                                                        width: 480,
                                                         //css: ".webix_Radio_btn",
                                                        //customRadio: false,
                                                        options: [{ "id": 1, "value": "Requisition Date" }, { "id": 2, "value": "Require Before" }, { "id": 3, "value": "Final Approved Date" }],
                                                        vertical: true,
                                                    },
                                                    {view:"label",
                                                    label:"",
                                                        width:100,
                                                    },
                                                    

                                                ]
                                            },
                                            


                                    ]
                                },
                  
                            ]
                        }
                    ]
                },
                {
                    view: "layout",
                    css: "LayBorder1",
                    padding: { top: 5, bottom: 5, right: 10 },
                    rows: [
                       {
                           cols: [{},
                           {

                               view: "button",
                               type: "icon",
                               id: "OkFiltercancel",
                               icon: "wxi-check",
                               label: "ok",
                               inputWidth: 100,
                               width: 100,
                               click: function () {
                                   $$("AdvFilter").hide();
                               }
                           },
                           ],

                       }
                    ]

                },
            ]
        }
    });



    webix.ui({
        view: "popup",
        close: true,
        // modal: true,
        id: "RptOptionsNew",
        head: "Options ",
        //position: "center",
        minWidth: 300,
        responsive: true,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
        autofit: true,
        resizeRow: true,
        css: "WebIxStyle",
        height: 450,
        width: 300,

        body: {
            view: 'form',
            minWidth: 500,
            maxWidth: 500,

            elements: [
                {
                    view: "scrollview", scroll: "y", height: 400, width: 250, body: {
                        padding: { top: 10, left: 30, bottom: 20, right: 10 },
                        //var vOpt = [];  
                        rows: [
                             { view: "template", template: "Optional Columns", css: " SecHeader", height: 25, },

                            {
                                view: "checkbox",
                                name: "chkOrderValue",
                                id: "chkOrderValue",
                                labelWidth: 5,
                                css: "OptCss",
                                labelRight: "Order Value",
                                customCheckbox: true,
                                height: 30,
                                on: { onItemClick: function () { this.focus(); fnShowHideCol() } }

                            },

                                        { view: "checkbox", name: "Approved By & Dt", id: "chkApprovedt", labelWidth: 5, labelRight: "Approved By & Dt", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

                                         { view: "checkbox", name: "Cons Pr No", id: "chkConsPrno", labelWidth: 5, labelRight: "Cons Pr No", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                          { view: "checkbox", name: "Cons Pr Date", id: "chkCnsPrDt", labelWidth: 5, labelRight: "Cons Pr Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },



                                { view: "checkbox", id: "chkReqDate", labelWidth: 5, labelRight: "Require Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "Show Prod_Id", id: "chkProd_id", labelWidth: 5, labelRight: "Show Prod_Id", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "Prod Rate", id: "chkProdRate", labelWidth: 5, labelRight: "Prod Rate", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

                                 { view: "checkbox", name: "Value", id: "chkValue", labelWidth: 5, labelRight: "Value", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                    { view: "checkbox", name: "Short Close Unit", id: "chkshortclqty", labelWidth: 5, labelRight: "Short Close Unit", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                  //   { view: "checkbox", name: "Require Date", id: "chkReqDate", labelWidth: 5, labelRight: "Require Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

                                     { view: "checkbox", name: "Justify Reason", id: "chkJustfyRes", labelWidth: 5, labelRight: "Justify Reason", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                      { view: "checkbox", name: "Requester Instruction", id: "chkReqInst", labelWidth: 5, labelRight: "Requester Instruction", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                         { view: "checkbox", name: "Remarks", id: "chkRemarks", labelWidth: 5, labelRight: "Remarks", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                        //  { view: "checkbox", name: "Show Po Supplier", id: "chkPoSuplier", labelWidth: 5, labelRight: "Show Po Supplier", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

                                        //  { view: "checkbox", name: "Show Last Po Supplier", id: "chkLstPoSuplier", labelWidth: 5, labelRight: "Show Last Po Supplier", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },




                               // { view: "checkbox", name: "Next Lvl Approvers", id: "chkNxtApprov", labelWidth: 5, labelRight: "Next Lvl Approvers", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },


                              //  { view: "checkbox", name: "Remarks", id: "chkremrks", labelWidth: 5, labelRight: " Remarks", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },


                        ]
                    }
                }
            ]
        }
    });

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupProdSrch",
        head: "Product Search",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        //css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 450,
            elements: [
                {
                    view: "datatable",
                    id: "grdProdSrch",
                    select: "row",
                    data: [{}],
                    height: 350,
                    scroll: "y",
                    editable:true,
                    columns: [
                            { header: "proid", id: "prodid", hidden: true },
                            {
                                header: "Product", id: "ProdName",  width: 320,
                                css: { 'text-align': 'left ! important' }, editor: "text", suggest: ProNMFilter
                            }, //StringResult: true,
                 //          { header: ["Select All", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "ChkAccsel", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                    ],
                    on: {
                      
                        'onAfterEditStop': function (state, editor) {
                            debugger;
                            var getvalset = this.getItem(editor.row);
                            var prodid = prodDetails.find(element =>element.value===getvalset.ProdName);
                            if(prodid==undefined){
                                getvalset.prodid="";
                                getvalset.ProdName="";
                            }
                            else
                                getvalset.prodid= prodid.prod_id;

                        },
                        'onKeyPress': function (e, id) {
                            if (e == 40) {
                                fngrdPlanItemRowAdd();
                                $$("grdProdSrch").refresh();
                            }
                        },
                    
                    },
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 230,
                             paddingX: 250,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'OK',
                                             type: "icon",
                                             icon: "wxi-check",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     debugger;

                                                     var grdProdSrch = $$("grdProdSrch").serialize();
                                                     var Prd_id = "";
                                                     var Prd_NM = "";
                                                     var vAdd = false;

                                                     $$("grdProdSrch").data.each(function (obj) {

                                                         // if (obj.ChkAccsel == "1") {
                                                         if (Prd_NM != "") {
                                                             Prd_NM = Prd_NM + "," + $.trim(obj.ProdName)
                                                         }
                                                         else {
                                                             Prd_NM = $.trim(obj.ProdName)
                                                         }

                                                         if (Prd_id != "") {
                                                             Prd_id = Prd_id + "," + $.trim(obj.prodid)
                                                         }
                                                         else {
                                                             Prd_id = $.trim(obj.prodid)
                                                         }
                                                         vAdd = true;
                                                         // }
                                                     });

                                                     if (Prd_id != "") {
                                                         //$("#hdnGS_Id").val("");
                                                         //("#hdnGS_TY").val("");
                                                         if ($("#hdnSrchVal").val() == "Product") {
                                                             $("#hdnPrd_id").val(""); //$$("txtProd").setValue(Prd_NM);
                                                             $("#hdnPrd_id").val(Prd_id);
                                                         }
                                                         else if ($("#hdnSrchVal").val() == "Product Group") {
                                                             $("#hdnPrdGrp_id").val("");
                                                             $("#hdnPrdGrp_id").val(Prd_id);
                                                         }
                                                         else if ($("#hdnSrchVal").val() == "Product Sub Group") {
                                                             $("#hdnPrdSubGrp_id").val("");
                                                             $("#hdnPrdSubGrp_id").val(Prd_id);
                                                         }
                                                        
                                                         
                                                        

                                                     }
                                                     if (vAdd == true)
                                                         $$('PopupProdSrch').hide();
                                                     else
                                                         webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                                                 },

                                             }
                                         },
                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });





});



function HDClr1(value, config) {
    debugger;
    if (config.PRStsClr != "") {
        return { "background": $.trim(config.PRStsClr) + " center ! important;" };
    }

}
function HDClr2(value, config) {
    debugger;
    if (config.PrItemClr != "") {
        return { "background": $.trim(config.PrItemClr) + " center ! important;" };
    }

}

var ProNMFilter = {
    view: "suggest",
    data: [],
    id: 'ProdNmFilter',
    //css: 'FilterProd',
    width: 150,
    height: 200,
    body: {
        dataFeed: function (text) {
            if (text.length > 2) {
                return fnLoadProduct(text);
            }
            else {
                return [];
            }
        }
    }
};

function fnProdPopup() {

   


    $$("PopupProdSrch").show();

    //$$("grdProdSrch").clearAll();
    //$$("grdProdSrch").parse(Dataset);
    //var PRODID = "";
    //if ($("#hdnSrchVal").val() == "Product") PRODID = $("#hdnPrd_id").val();
    //else if ($("#hdnSrchVal").val() == "Product Group") PRODID = $("#hdnPrdGrp_id").val();
    //else if ($("#hdnSrchVal").val() == "Product Sub Group") PRODID = $("#hdnPrdSubGrp_id").val();

    //var data = $$("grdProdSrch").serialize();
    //var lenval = data.length;
    //if (lenval != 0) {
    //    for (i = 0; i < lenval; i++) {
    //        if (PRODID != "") {
    //            if (PRODID.includes($.trim(data[i].Prod_id)) == true)
    //                data[i].ChkAccsel = "1";
    //            else
    //                data[i].ChkAccsel = "0";

    //        }
    //    }
    //}

    //$$("grdProdSrch").refresh();
    //$("#RmBuildid").val("");
}

function fngrdPlanItemRowAdd() {
    var dtplnitem = $$("grdProdSrch").serialize();
    for (i = 0; i < dtplnitem.length; i++) {
        if ($.trim(dtplnitem[i].ProdName) == "") {
            AlertMessage("Product Name Cannot be empty");
            return false;
        }
    }
    $$("grdProdSrch").editStop();
    $$("grdProdSrch").add({ "prodid": "", "ProdName": "" });  
    $$("grdProdSrch").refresh();
    $$("grdProdSrch").refreshColumns();
}


function fnLoadProdGrp() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADPRODGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    //dataparam["NFIND"] = $("#hdnNFIND").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        }
    });

    return rowData;
}

function fnLoadProdSubGrp() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADPRODSUBGRP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PrdGrpID"] = $.trim( $$("mulProdGrp").getValue());//$("#hdnPrdGrp_id").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);   //
                $$("mulProdSubGrp").define("options", rowData);
            }
        }
    });

    return rowData;
}






var prodDetails = [];

function fnLoadProduct(prodNm) {
    debugger;
    var dataparam = {};
    var rowData = [];
    if ($("#hdnSrchVal").val() == "Product"){
        dataparam["ProdNM"] = prodNm;
        dataparam["REQTYPE"] = "GET_LOADPRODNM";
    }
       
    else if ($("#hdnSrchVal").val() == "Product Group") //
        dataparam["REQTYPE"] = "GET_LOADPRODGRP";
    else if ($("#hdnSrchVal").val() == "Product Sub Group")
    {
        dataparam["REQTYPE"] = "GET_LOADPRODSUBGRP"; 
        dataparam["PrdGrpID"] = $("#hdnPrdGrp_id").val();
    }
    dataparam["COMPID"] = $("#hdnCompId").val();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                prodDetails=rowData;
               // $("#hdnNFIND").val(rowData[0]["NF1_IND"]);
            }
        }
    });

    return rowData;
}




function fnLoadPoCtrl() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_POCONTROL";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnNFIND").val(rowData[0]["NF1_IND"]);
            }
        }
    });

    return rowData;
}




function fnLoadPoType() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_POTYPE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["NFIND"] = $("#hdnNFIND").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlPoType").define("options", rowData);
               // $$("hdnNFIND").setValue(rowData[0]["NF1_IND"]);
                $$("ddlPoType").setValue(rowData[0]["id"]);
            }
        }
    });

    //return rowData;
}

function loadOptionPopWindow() {
    debugger;
    //webix.ui({
    //    view: "popup",
    //    close: true,
    //    // modal: true,
    //    id: "RptOptionsNew",
    //    head: "Options ",
    //    position: "center",
    //    minWidth: 300,
    //    responsive: true,
    //    maxWidth: 300,
    //    resizeColumn: true,
    //    move: true,
    //    autofit: true,
    //    resizeRow: true,
    //    css: "WebIxStyle",
    //    height: 450,
    //    width: 300,

    //    body: {
    //        view: 'form',
    //        minWidth: 500,
    //        maxWidth: 500,

    //        elements: [
    //            {
    //                view: "scrollview", scroll: "y", height: 400, width: 250, body: {
    //                    padding: { top: 10, left: 30, bottom: 20, right: 10 },
    //                    //var vOpt = [];  
    //                    rows: [

    //                        //{
    //                        //    view: "search", id: "txtSrch", labelWidth: 5,
    //                        //    on: {
    //                        //        onTimedKeyPress: function () {
    //                        //            debugger;
    //                        //            var Srchvalue = $$("txtSrch").getValue();
    //                        //            if (Srchvalue != "") {
    //                        //                var ContArr = $$("RptOptionsNew").getChildViews();
    //                        //                if (ContArr.length > 0) {
    //                        //                    var vHt = 0;
    //                        //                    $.each(ContArr, function (key, obj) {
    //                        //                        if (obj.config.labelRight) {
    //                        //                            if (obj.config.labelRight.toString().toLowerCase().indexOf(Srchvalue.toLowerCase()) != -1) {
    //                        //                                $$(obj.config.id).show();
    //                        //                                vHt += $$(obj.config.id).$height + 6;
    //                        //                            }
    //                        //                            else $$(obj.config.id).hide();
    //                        //                        }
    //                        //                    });
    //                        //                    if (window.vOrgHt >= vHt) $$("RptOptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
    //                        //                    else $$("RptOptionsNew").define("height", window.vOrgHt);
    //                        //                    $$("RptOptionsNew").adjust();

    //                        //                }
    //                        //            }
    //                        //            else {
    //                        //                var ContArr = $$("RptOptionsNew").getChildViews();
    //                        //                var vHt = 0;
    //                        //                if (ContArr.length > 0) {
    //                        //                    $.each(ContArr, function (key, obj) {
    //                        //                        if (obj.config.id) {
    //                        //                            vHt += $$(obj.config.id).$height + 6;
    //                        //                            $$(obj.config.id).show();

    //                        //                        }
    //                        //                    });
    //                        //                    if (window.vOrgHt >= vHt) $$("RptOptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
    //                        //                    else $$("RptOptionsNew").define("height", window.vOrgHt);
    //                        //                    $$("RptOptionsNew").adjust();
    //                        //                }
    //                        //            }
    //                        //        }
    //                        //    },
    //                        //},

    //                        {
    //                            view: "checkbox",
    //                            name: "chkOrderValue",
    //                            id: "chkOrderValue",
    //                            labelWidth: 5,
    //                            css: "OptCss",
    //                            labelRight: "Order Value",
    //                            customCheckbox: true,
    //                            height: 30,
    //                            on: { onItemClick: function () { this.focus(); fnShowHideCol() } }

    //                        },

    //                                    { view: "checkbox", name: "Approved By & Dt", id: "chkApprovedt", labelWidth: 5, labelRight: "Approved By & Dt", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

    //                                     { view: "checkbox", name: "Cons Pr No", id: "chkConsPrno", labelWidth: 5, labelRight: "Cons Pr No", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                                      { view: "checkbox", name: "Cons Pr Date", id: "chkCnsPrDt", labelWidth: 5, labelRight: "Cons Pr Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },



    //                            { view: "checkbox", id: "chkReqDate", labelWidth: 5, labelRight: "Require Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                            { view: "checkbox", name: "Show Prod_Id", id: "chkProd_id", labelWidth: 5, labelRight: "Show Prod_Id", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                            //{ view: "checkbox", name: "Prod Rate", id: "chkProdRate", labelWidth: 5, labelRight: "Prod Rate", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

    //                             { view: "checkbox", name: "Value", id: "chkValue", labelWidth: 5, labelRight: "Value", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                                { view: "checkbox", name: "Short Close Unit", id: "chkshortclqty", labelWidth: 5, labelRight: "Short Close Unit", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                              //   { view: "checkbox", name: "Require Date", id: "chkReqDate", labelWidth: 5, labelRight: "Require Date", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

    //                                 { view: "checkbox", name: "Justify Reason", id: "chkJustfyRes", labelWidth: 5, labelRight: "Justify Reason", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                                  { view: "checkbox", name: "Requester Instruction", id: "chkReqInst", labelWidth: 5, labelRight: "Requester Instruction", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                                     { view: "checkbox", name: "Remarks", id: "chkRemarks", labelWidth: 5, labelRight: "Remarks", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
    //                                      { view: "checkbox", name: "Show Po Supplier", id: "chkPoSuplier", labelWidth: 5, labelRight: "Show Po Supplier", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

    //                                    //  { view: "checkbox", name: "Show Last Po Supplier", id: "chkLstPoSuplier", labelWidth: 5, labelRight: "Show Last Po Supplier", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },




    //                           // { view: "checkbox", name: "Next Lvl Approvers", id: "chkNxtApprov", labelWidth: 5, labelRight: "Next Lvl Approvers", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },


    //                          //  { view: "checkbox", name: "Remarks", id: "chkremrks", labelWidth: 5, labelRight: " Remarks", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },


    //                    ]
    //                }
    //            }
    //        ]
    //    }
    //})
    //]
    // }
    $$("RptOptionsNew").show();
}


function fnShowHideCol() {
    $$("gridMain").clearAll();
    $$("gridMain").refresh();
    if ($$("chkApprovedt").getValue() == "1")
        $$("gridMain").showColumn("Approvedt");
    else
        $$("gridMain").hideColumn("Approvedt");
    if ($$("chkReqDate").getValue() == "1")
        $$("gridMain").showColumn("ReqDate");
    else $$("gridMain").hideColumn("ReqDate");

    if ($$("chkProd_id").getValue() == "1") $$("gridMain").showColumn("Prod_id");
    else $$("gridMain").hideColumn("Prod_id");

    //if ($$("chkProdRate").getValue() == "1") $$("gridMain").showColumn("ProdRate");
    //else $$("gridMain").hideColumn("ProdRate");

    if ($$("chkValue").getValue() == "1") $$("gridMain").showColumn("Value");
    else $$("gridMain").hideColumn("Value");

    if ($$("chkshortclqty").getValue() == "1") $$("gridMain").showColumn("shortclqty");
    else $$("gridMain").hideColumn("shortclqty");

    if ($$("chkJustfyRes").getValue() == "1") $$("gridMain").showColumn("JustfyRes");
    else $$("gridMain").hideColumn("JustfyRes");

    if ($$("chkReqInst").getValue() == "1") $$("gridMain").showColumn("ReqInst");
    else $$("gridMain").hideColumn("ReqInst");

    if ($$("chkRemarks").getValue() == "1") $$("gridMain").showColumn("Remarks");
    else $$("gridMain").hideColumn("Remarks");

    //if ($$("chkPoSuplier").getValue() == "1") $$("gridMain").showColumn("PoSuplier");
    //else $$("gridMain").hideColumn("PoSuplier");
    //if ($$("chkLstPoSuplier").getValue() == "1") $$("gridMain").showColumn("LstPoSuplier");
    //else $$("gridMain").hideColumn("LstPoSuplier");

    //if ($$("chkNxtApprov").getValue() == "1") $$("gridMain").showColumn("NxtApprov");
    //else $$("gridMain").hideColumn("NxtApprov");


    if ($$("chkConsPrno").getValue() == "1") $$("gridMain").showColumn("ConsPrno");
    else $$("gridMain").hideColumn("ConsPrno");
    if ($$("chkCnsPrDt").getValue() == "1") $$("gridMain").showColumn("CnsPrDt");
    else $$("gridMain").hideColumn("CnsPrDt");

    //if ($$("chkApprover5").getValue() == "1") $$("gridMain").showColumn("chkApprover5");
    //else $$("gridMain").hideColumn("chkApprover5");
    //if ($$("chkRemarks5").getValue() == "1") $$("gridMain").showColumn("chkRemarks5");
    //else $$("gridMain").hideColumn("chkRemarks5");
    //if ($$("chkItem5").getValue() == "1") $$("gridMain").showColumn("chkItem5");
    //else $$("gridMain").hideColumn("chkItem5");



    // $$("RptOptionsNew").hide();
    $$("gridMain").refreshColumns();
    $$("gridMain").refresh();
    //gridResize();
};

function validateDate() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var etodt = $$("txtToDate").getText();
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage('From Date can not be greater than To date');
        return false;
    }

    return true;
}

function fnLoadGrid() {
    debugger;
    if (!validateDate()) {
        return false;
    }
    $("#LoadDIv").show();
  //  fnLoadFilterWindow();

  //  btnOkFilterClick();
    //  $("advfilter").hide();
    $("#HdnPreVal").val("");
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_LOADREQSITION";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var FrmDate = $$("txtFrmDate").getText();
    var Todate = $$("txtToDate").getText();
    dataparam["FrmDate"] = FrmDate;
    dataparam["Todate"] = Todate;
    dataparam["PoType"] = $$("ddlPoType").getValue();// 
    dataparam["SortBy"] = $$("rdbtnSrtBY").getValue();// 
    dataparam["consreqs"] = $$("rdbtnConsReq").getValue();
    dataparam["mulReqType"] = $$("mulReqType").getValue();
    dataparam["ProdGrpId"] = $.trim( $$("mulProdGrp").getValue());//$("#hdnPrdGrp_id").val();
    dataparam["ProductId"] = $("#hdnPrd_id").val();
    dataparam["ProdSubGrpId"] = $.trim( $$("mulProdSubGrp").getValue());//$("#hdnPrdSubGrp_id").val();
    dataparam["Costcenter"] = $.trim( $$("mulcostcenter").getValue());
    dataparam["Basis"] = $.trim( $$("rdbtnBasis").getValue());
    dataparam["PoStatus"] = $.trim( $$("ddlPoStatus").getValue());
    dataparam["PrStatus"] = $.trim( $$("ddlPrStatus").getValue());
    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (data) {
            debugger;
            if (data != "" && data != "null" && data !="[]") {
                var rowData = JSON.parse(data);
                $$("gridMain").clearAll();
                $$("gridMain").parse(rowData);
                $$("gridMain").refresh();


                $$("gridMain").adjustRowHeight();
                $$("gridMain").refresh();
                $("#LoadDIv").hide();


            }

            else {
                $$("gridMain").clearAll();
                AlertMessage("No Records Found");
                $("#LoadDIv").hide();
            }
        }
    });
};


function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").val();
    var FullData = "";

    FullData = $$("gridMain").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("gridMain"), {
            docHeader: vHeader,
            fontSize: 25,
            textAlign: "left",
            mode: "landscape",
            fit: "data"
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }

};

function fnExcelExport() {
    debugger;
    var vHeader = $("#LayoutText").val();
    var FullData = "";
    FullData = $$("gridMain").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("gridMain"), {
            filename: vHeader,
            styles: false,
            name: vHeader,
            docHeader: vHeader,
            rawValues: true,
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }
};




function fnLoadUnit() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GETMSTUNIT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlUser").define("options", rowData);
            }
        }
    });

    return rowData;
}

function fnpotype() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GETPOTYPE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlpotypoe").define("options", rowData);
            }
        }
    });

    return rowData;
}


function fnstoreid() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GETSTOREID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
               // $$("ddlStore").define("options", rowData);
            }
        }
    });

    return rowData;
}

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}







function fnAccountDt() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDT";
    //  dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
            }
        },
    });
}