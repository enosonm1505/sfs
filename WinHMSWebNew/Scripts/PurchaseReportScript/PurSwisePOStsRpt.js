
var app = angular.module('BQTApp', ['webix']);
 valid = [
                                                                          { "id": "1", "value": "Pending Receipt" },
                                                                          { "id": "2", "value": "UnApproved" },
                                                                          { "id": "5", "value": "Completed" },
                                                                          { "id": "6", "value": "Short Closed" },
                                                                          { "id": "9", "value": "Cancelled" }, ]

 app.controller("PurchaseReportsController", function ($scope) {
     $("#LoadDIv").hide();
     fnAccountDt();
     var FnStore = fnstoreid();
     var prodgrp = fnLoadProdGrp();
     var POCategory = [
        { "id": " ", "value": "ALL" },
        { "id": "M0", "value": "L.P.O" },
        { "id": "M4", "value": "NON FOOD &  BEVERAGE" },
        { "id": "M8", "value": "Beverage A" },
     ]
    $scope.frmPurchaseReports = {
        id: "frmPurchaseReports",
        view: 'form',
        minWidth: 900,
        //width:1200,
        height: 550,
         //scroll:true,
        elements: [
           {
               rows: [
                  {
                      cols: [
                         {                            
                           
                             labelAlign: "Right",
                             labelWidth: 40,
                             inputWidth: 200,
                             height: 25,
                             width: 200,
                             minWidth: 100,                           
                             
                         },
                          {
                              view: "datepicker",
                              id: "txtFrmDate",
                              stringResult: true,
                              label: "From",
                              format: "%d/%m/%Y",
                              labelAlign: "Right",
                              labelWidth: 40,
                              inputWidth: 200,
                              height: 1,
                              //container: "divGrid",
                              width: 300,
                              minWidth: 300,                            
                              value: $("#hdnCurrentDt").val(),
                              on: {
                                  onChange: function () {
                                    //  PUfrmDateChange();
                                  }
                              }
                          },
                           {
                               view: "datepicker",
                               id: "txtToDate",
                               stringResult: true,
                               label: "To",
                               format: "%d/%m/%Y",
                               labelAlign: "Right",
                               labelWidth: 40,
                               inputWidth: 200,
                               width: 250,
                               height: 25,
                               minWidth: 340,                             
                               value: $("#hdnCurrentDt").val(),
                               on: {
                                   onChange: function () {
                                      // PUToDateChange();
                                   }
                               }
                           },
                            {
                                view: "datepicker",
                                id: "txtAson",
                                stringResult: true,
                                label: "AsOn",
                                format: "%d/%m/%Y",
                                labelAlign: "Right",
                                labelWidth: 40,
                                inputWidth: 200,
                                height: 1,
                                hidden:true,
                                container: "divGrid",
                                width: 300,
                                minWidth: 300,
                                value: $("#hdnCurrentDt").val(),
                                on: {
                                    onChange: function () {
                                        
                                    }
                                }
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
                                      //fnLoadFilterWindow();
                                      //btnFilterClick();
                                      //fnLoadUnit();
                                      //fnpotype();
                                      //fnstored();
                                      //fnCATEGORY();
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
                        popup: "RptOptionsNew",

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
                                       var Columns = $$('gridMain').config.columns;

                                       var ColCnt = Columns.length;
                                       debugger;

                                   },
                               },



                               columns: [


                                      { id: "Unit", header: 'Unit', width: 150, css: { 'text-align': 'center ! important' } },
                                       { id: "Store", header: "Store", width: 80, css: { 'text-align': 'center ! important' } },
                                     { id: "PONo", header: [{ text: "PO No", css: "multiline" }], width: 60, css: { 'text-align': 'center ! important' }, },
                                     { id: "PoDt", format: "%d/%m/%Y", header: [{ text: "PO Dt", css: "multiline" }], width: 100, css: { 'text-align': 'center ! important' }, },
                                     { id: "Dutdt", format: "%d/%m/%Y", header: [{ text: "Due Dt", css: "multiline" }], width: 100, css: { 'text-align': 'center ! important' }, },
                                     { id: "Status", header: "Status", minWidth: 130, css: { 'text-align': 'left ! important' } },
                                     { id: "Appr.By", header: "Appr.By", minWidth: 130, css: { 'text-align': 'left ! important' }, hidden: true, },
                                     { id: "Appr.Dt", header: "Appr.Dt", minWidth: 130, css: { 'text-align': 'left ! important' }, hidden: true, },
                                     { id: "ProdId", header: "Prod ID", minWidth: 50, css: { 'text-align': 'left ! important' }, },
                                     { id: "ProdNm", header: "Product Name", width: 200, css: { 'text-align': 'center ! important' } },
                                     { id: "UOM", header: "UOM", width: 50, css: { 'text-align': 'center ! important' } },
                                      { id: "CancelReason", header: "Cancel Reason", width: 50, css: { 'text-align': 'center ! important' }, hidden: true, },
                                      { id: "chkOrder", header: "Order Value", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                           { id: "chkPending", header: "Pending Value", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                          { id: "chkAdvance", header: "Advance Amt", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                     {
                                         id: "POQty",
                                         header: "PO Qty",
                                         width: 100,
                                         format: "1111111.000",
                                         css: { 'text-align': 'center ! important' }
                                     },
                                      { id: "ReceivedQty", header: "Received Qty", width: 100, css: { 'text-align': 'center ! important' } },
                                       { id: "BalanceQty", header: "Balance Qty", width: 100, css: { 'text-align': 'center ! important' } },
                                        { id: "PRNo", header: "PR No.", width: 100, css: { 'text-align': 'center ! important' } },
                                         { id: "GRNNo&Dt", header: "GRN No & Dt", width: 130, css: { 'text-align': 'center ! important' } },



                                       { id: "chkRemarks", header: "Remarks", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                        { id: "chkCreate", header: "Create By", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                         { id: "chkNext", header: "Next Lvl Approvers", width: 130, css: { 'text-align': 'center ! important' }, hidden: true, },

                                              { id: "chkApprover2", header: "Approver2", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                       { id: "chkRemarks2", header: "Approver2 Remarks2", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                        { id: "chkItem2", header: "Approver2 Item Remarks2", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                         { id: "chkNext", header: "Next Lvl Approvers", width: 130, css: { 'text-align': 'center ! important' }, hidden: true, },
                                              { id: "chkItem1", header: "Advance Amt", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                       { id: "chkRemarks", header: "Approver1", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                        { id: "chkCreate", header: "Approver1 Remarks1", width: 100, css: { 'text-align': 'center ! important' }, hidden: true, },
                                         { id: "chkNext", header: "Approver1 Item Remarks1", width: 130, css: { 'text-align': 'center ! important' }, hidden: true, },





                               ],
                               data: [],
                           },

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
                                                  id: "ddlPOCategory",
                                                  label: "PO Category",
                                                  labelAlign: "Left",
                                                  inputWidth: 350,
                                                  labelWidth: 110,
                                                  options: POCategory,
                                                  value: " ",
                                                  on: {
                                                      "onChange": function (newval, oldvalue) {

                                                          if ($.trim(newval) == "") {

                                                             // $$("ddlPoStatus").show();

                                                          }
                                                          else {
                                                              //$$("ddlPoStatus").setValue();
                                                             // $$("ddlPoStatus").hide();

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
                                                                 var mulProdGrp = $.trim($$("mulProdGrp").getValue());
                                                                 if (mulProdGrp != "") {
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
                                                     hidden: true,
                                                     on: {
                                                         "onChange": function (newval, oldVal) {

                                                         }
                                                     }
                                                 },


                                                     {
                                                         cols: [
                                                             {
                                                             view: "switch",
                                                             width: 158,
                                                             labelWidth: 110,
                                                             id: "chksuplier",
                                                             label: "Supplier",
                                                             on: {
                                                                 "onChange": function (newval, oldVal) {
                                                                     if (newval == "1") {
                                                                         $$("supliersrch").show();
                                                                     }
                                                                     if (newval == "0") {
                                                                         $$("supliersrch").hide();
                                                                         $("#hdnPartyID").val("");

                                                                         // $$("txtProd").setValue(""); $$("txtProd").hide();
                                                                     }

                                                                 }
                                                             }
                                                         },

    {
        view: "button",
        id: "supliersrch",
        type: 'icon',
        inputWidth: 30,
        icon: 'wxi-search',
        width: 30,
        // disabled: true,
        hidden: true,
        on: {

            onItemClick: function () {
                debugger;
                fnLoadSupplier();
                $$("PopupSuplierSrch").show();
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
                                                      value: " ",
                                                      //options: PoStatus,

                                                  },




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
                                                          // options: reqtype,
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
                                                    {
                                                        view: "label",
                                                        label: "",
                                                        width: 100,
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

                            //{
                            //    view: "search", id: "txtSrch", labelWidth: 5,
                            //    on: {
                            //        onTimedKeyPress: function () {
                            //            debugger;
                            //            var Srchvalue = $$("txtSrch").getValue();
                            //            if (Srchvalue != "") {
                            //                var ContArr = $$("RptOptionsNew").getChildViews();
                            //                if (ContArr.length > 0) {
                            //                    var vHt = 0;
                            //                    $.each(ContArr, function (key, obj) {
                            //                        if (obj.config.labelRight) {
                            //                            if (obj.config.labelRight.toString().toLowerCase().indexOf(Srchvalue.toLowerCase()) != -1) {
                            //                                $$(obj.config.id).show();
                            //                                vHt += $$(obj.config.id).$height + 6;
                            //                            }
                            //                            else $$(obj.config.id).hide();
                            //                        }
                            //                    });
                            //                    if (window.vOrgHt >= vHt) $$("RptOptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
                            //                    else $$("RptOptionsNew").define("height", window.vOrgHt);
                            //                    $$("RptOptionsNew").adjust();

                            //                }
                            //            }
                            //            else {
                            //                var ContArr = $$("RptOptionsNew").getChildViews();
                            //                var vHt = 0;
                            //                if (ContArr.length > 0) {
                            //                    $.each(ContArr, function (key, obj) {
                            //                        if (obj.config.id) {
                            //                            vHt += $$(obj.config.id).$height + 6;
                            //                            $$(obj.config.id).show();

                            //                        }
                            //                    });
                            //                    if (window.vOrgHt >= vHt) $$("RptOptionsNew").define("height", vHt + $$("txtSrch").$height + 30);
                            //                    else $$("RptOptionsNew").define("height", window.vOrgHt);
                            //                    $$("RptOptionsNew").adjust();
                            //                }
                            //            }
                            //        }
                            //    },
                            //},
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

                                        { view: "checkbox", name: "chkPending", id: "chkPending", labelWidth: 5, labelRight: "Pending Value", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", id: "chkAdvance", labelWidth: 5, labelRight: "Advance Amt", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "chkRemarks", id: "chkRemarks", labelWidth: 5, labelRight: "Remarks", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "chkCreate", id: "chkCreate", labelWidth: 5, labelRight: "Create By", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "chkNext", id: "chkNext", labelWidth: 5, labelRight: "Next Lvl Approvers", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "chkPR", id: "chkPR", labelWidth: 5, labelRight: "PR NO", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                { view: "checkbox", name: "chkGRN", id: "chkGRN", labelWidth: 5, labelRight: "GRN NO &DT", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },

                                //{ view: "checkbox", name: "chkApprover1", id: "chkApprover1", labelWidth: 5, labelRight: "Approver1", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkRemarks1", id: "chkRemarks1", labelWidth: 5, labelRight: "Approver1 Remarks1", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkItem1", id: "chkItem1", labelWidth: 5, labelRight: "Approver1 Item Remarks1", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },


                                //{ view: "checkbox", name: "chkApprover2", id: "chkApprover2", labelWidth: 5, labelRight: "Approver2", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkRemarks2", id: "chkRemarks2", labelWidth: 5, labelRight: "Approver2 Remarks2", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkItem2", id: "chkItem2", labelWidth: 5, labelRight: "Approver2 Item Remarks2", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkApprover3", id: "chkApprover3", labelWidth: 5, labelRight: "Approver3", css: "OptCss", customCheckbox: true, height: 30, },
                                //{ view: "checkbox", name: "chkRemarks3", id: "chkRemarks3", labelWidth: 5, labelRight: "Approver3 Remarks3", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkItem3", id: "chkItem3", labelWidth: 5, labelRight: "Approver3 Item Remarks3", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "Approver4", id: "Approver4", labelWidth: 5, labelRight: "Approver4", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "Remarks4", id: "Remarks4", labelWidth: 5, labelRight: "Approver4 Remarks4", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkItem4", id: "chkItem4", labelWidth: 5, labelRight: "Approver4 Item Remarks4", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "Approver5", id: "Approver5", labelWidth: 5, labelRight: "Approver5", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "Remarks5", id: "Remarks5", labelWidth: 5, labelRight: "Approver5 Remarks5", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } },
                                //{ view: "checkbox", name: "chkItem5", id: "chkItem5", labelWidth: 5, labelRight: "Approver5 Item Remarks5", css: "OptCss", customCheckbox: true, height: 30, on: { onItemClick: function () { this.focus(); fnShowHideCol() } } }

                        ]
                    }
                }
            ]
        }
    })


    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSuplierSrch",
        head: "Supplier Search",
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
                    id: "grdSuplierSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    editable: true,
                    columns: [
                            { header: "PARTY_ID", id: "PARTY_ID", hidden: true },
                            {
                                header: "PARTY NAME", id: "PARTY_NM", width: 320,
                                css: { 'text-align': 'left ! important' },
                            }, //StringResult: true,
                 //          { header: ["Select All", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "ChkAccsel", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                    ],
                    on: {

                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);



                            $("#hdnPartyID").val($.trim(selectedRows[0].PARTY_ID));


                            $$('PopupSuplierSrch').hide();

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
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     debugger;

                                                     $$('PopupSuplierSrch').hide();
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

function ShowOptionsColums(newval, oldVal) {
    debugger;
    $$("gridMain").refresh();
    options = [];
    options = newval;

    $$("gridMain").hideColumn("Appr.By");
    $$("gridMain").hideColumn("Appr.Dt");
    $$("gridMain").hideColumn("ProdId");
    
    for (i = 0; i < options.length; i++) {
        if (options[i] == "1")
            $$("gridMain").showColumn("Appr.By") 
            $$("gridMain").showColumn("Appr.Dt");
       
        if (options[i] == "2" )
            $$("gridMain").showColumn("ProdId");
    
        if ( options[i] == "5" )
            $$("gridMain").showColumn("ProdId");


        if(options[i] == "6")
            $$("gridMain").showColumn("ProdId");

        if (options[i] == "9")
            $$("gridMain").showColumn("ProdId");
    }
 

}



function fnLoadFilterWindow() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 630,
        move: true,
        body: {
            padding: { right: 3, left: 3, bottom: 0 },
            view: "form",
            id: "frmFilter",
            elements: [
                {
                    width: 630,
                    css: "LayBorder",
                    cols: [
                        {
                            view: "layout",
                            //css:"LayBorder",  
                            width: 372,
                            rows: [

                                    { view: "template", template: "Search", css: " SecHeader", height: 25, width: 370 },
                                    {
                                        padding: { top: 0, left: 10, bottom: 0, right: 10 },
                                        rows: [
                                             {
                                                 view: "richselect",
                                                 id: "ddlUser",
                                                 label: " Unit",
                                                 labelAlign: "Left",
                                                 width: 250,
                                                 labelWidth: 110,
                                              
                                             },
                                                         {
                                                             view: "richselect",
                                                             id: "ddlpotypoe",
                                                             label: " PO Type",
                                                             labelAlign: "Left",
                                                             width: 250,
                                                             labelWidth: 110,

                                                         },
                                                       
                                            {
                                                view: "richselect",
                                                width: 250,
                                                labelWidth: 110,
                                                id: "ddlcategory",
                                                label: "PO category",
                                                
                                            },
                                            {
                                                view: "text",
                                                width: 250,
                                                labelWidth: 110,
                                                id: "txtPRNo",
                                                label: "PRNo",
                                            },
                                             {
                                                 view: "text",
                                                 width: 250,
                                                 labelWidth: 110,
                                                 id: "txtPoNo",
                                                 label: "PoNo",
                                             },
                                           {
                                               view: "richselect",
                                               label: "Store",
                                               width: 250,
                                               labelWidth: 110,
                                               id: "ddlStore",
                                               on: {
                                                   onChange: function (newVal, OldVal) {
                                                   }
                                               }
                                           },
                                           {
                                               view: "checkbox",
                                               width: 350,
                                               labelWidth: 110,
                                               id: "chkSupplier",
                                               label: "Supplier",
                                           },
                                           {
                                               cols: [
                                                   {
                                                       view: "checkbox",
                                                       width: 200,
                                                       labelWidth: 110,
                                                       id: "chkboxSpecific",
                                                       label: "Specific PR",
                                                       on: {
                                                           "onChange": function (newval, oldvalue) {

                                                               if ($.trim(newval) == "1") {
                                                                   $$("txtspe").show();

                                                               }
                                                               else {
                                                                   $$("txtspe").hide();

                                                               }
                                                           }
                                                       }
                                                   },

                                                    {
                                                        view: "search",
                                                        width: 100,
                                                        labelWidth: 50,
                                                        id: "txtspe",
                                                        hidden:true,
                                                    },
                                               ]
                                           },
                                           {
                                               cols: [
                                                            {
                                                                view: "checkbox",
                                                                width: 200,
                                                                labelWidth: 110,
                                                                id: "chkSpecificPo",
                                                                label: "Specific PO",
                                                                on: {
                                                                    "onChange": function (newval, oldvalue) {

                                                                        if ($.trim(newval) == "1") {
                                                                            $$("txtspecpo").show();

                                                                        }
                                                                        else {
                                                                            $$("txtspecpo").hide();

                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: "search",
                                                                width: 100,
                                                                labelWidth: 50,
                                                                id: "txtspecpo",
                                                                hidden: true,
                                                            },
                                                              
                                            
                                               ]
                                           },]
                                    },
                            ]
                        },
                        {
                            rows: [
                                {
                                    view: "layout",
                                    css: "LayBorder",
                                    rows: [

                                            { view: "template", template: "Filters", css: " SecHeader", height: 25, width: 257 },

                                            {
                                                padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                    {
                                                        view: "richselect",
                                                        width: 240,
                                                        labelWidth: 80,
                                                        id: "ddlStatus",
                                                        label: "Status",
                                                        value: "ALL",
                                                        options:valid,
                                                        on: {
                                                            onChange: function (newval, oldval){
                                                                ShowOptionsColums(newval, oldval);
                                                               // fnDisable();
                                                                ClearData();
                                                            {
                                                                if ($.trim(newval) == "1") {
                                                                    $$("txtFrmDate").hide();
                                                                    $$("txtToDate").hide();
                                                                    $$("txtAson").show();
                                                                    $$("chkOutstanding").show();
                                                                    $$("chkDelayed").show();
                                                                    $$("chkDelayeddays").show();
                                                                    $$("chkDelayedDateb/w").show();
                                                                    $$("mints").show();
                                                                    fnDisable();
                                                                }
                                                                else if (($.trim(newval) == "2")) {
                                                                    $$("txtFrmDate").show();
                                                                    $$("txtToDate").show();
                                                                    $$("txtAson").hide();
                                                                    //$$("layout").hide();
                                                                    $$("chkOutstanding").hide();
                                                                    $$("chkDelayed").hide();
                                                                    $$("chkDelayeddays").hide();
                                                                    $$("chkDelayedDateb/w").hide();
                                                                    fnEnable();
                                                                }
                                                                else if (($.trim(newval) == "5")) {
                                                                    $$("txtFrmDate").show();
                                                                    $$("txtToDate").show();
                                                                    $$("txtAson").hide();
                                                                    $$("chkOutstanding").hide();
                                                                    $$("chkDelayed").hide();
                                                                    $$("chkDelayeddays").hide();
                                                                    $$("chkDelayedDateb/w").hide();
                                                                    //  $$("layout").hide();
                                                                    fnEnable();
                                                                }
                                                                else if (($.trim(newval) == "6")) {
                                                                    $$("txtFrmDate").show();
                                                                    $$("txtToDate").show();
                                                                    $$("txtAson").hide();
                                                                    $$("chkOutstanding").hide();
                                                                    $$("chkDelayed").hide();
                                                                    $$("chkDelayeddays").hide();
                                                                    $$("chkDelayedDateb/w").hide();
                                                                    // $$("layout").hide();
                                                                    fnEnable();
                                                                }
                                                                else if (($.trim(newval) == "9")) {
                                                                    $$("txtFrmDate").show();
                                                                    $$("txtToDate").show();
                                                                    $$("txtAson").hide();
                                                                    $$("chkOutstanding").hide();
                                                                    $$("chkDelayed").hide();
                                                                    $$("chkDelayeddays").hide();
                                                                    $$("chkDelayedDateb/w").hide();
                                                                    //$$("layout").hide();
                                                                    fnEnable();
                                                                }
                                                                }

                                                              

                                                        },
                                                      
                                                        
                                                    },
                                                    }
                                                   
                                                ]
                                            },


                                    ]
                                },
                                {
                                    view: "layout",
                                    css: "LayBorder",

                                    rows: [

                                            { view: "template", template: "Group By", css: " SecHeader", height: 25, width: 250},
                                            {
                                                padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                    {
                                                        view: "checkbox",
                                                        id: "chkArrange",
                                                        label: "Supplier",
                                                        labelWidth: 5,
                                                        width: 350,
                                                        labelWidth: 110,
                                                    },
                                                {
                                                    view: "checkbox",
                                                    id: "chkPONo",
                                                    label: "PO No",
                                                    labelWidth: 5,
                                                    width: 350,
                                                    labelWidth: 110,
                                                },

                                                ]
                                            },
                                            {}
                                    ]
                                },


                            {
                            view: "layout",
    css: "LayBorder",

    rows: [

            { view: "template", template: "Options", css: " SecHeader", height: 20, width: 250, hidden: true },
            {
                padding: { top: 8, left: 10, bottom: 20, right: 10 },
                rows: [
                    {
                        view: "checkbox",
                        id: "chkOutstanding",
                        label: "Outstanding Orders",
                        labelWidth: 5,
                        width: 350,
                        labelWidth: 110,
                        hidden: true,
                    },
                {
                    view: "checkbox",
                    id: "chkDelayed",
                    label: "Delayed",
                    labelWidth: 5,
                    width: 350,
                    labelWidth: 110,
                    hidden: true,
                    on: {
                        onChange: function (newval, oldval) {
                           // fnchangeItmType();
                           // fnDisable();
                            if ($.trim(newval) == "1") {
                                debugger;
                                $$("chkDelayeddays").enable();
                                $$("mints").show();
                            }
                            else if (($.trim(newval) == "0")) {
                                $$("chkDelayeddays").disable();
                                $$("mints").hide();
                            }
                        }
                    }
                },
                {
                    cols:[  {
                        view: "checkbox",
                        id: "chkDelayeddays",
                        label: "Delayed Days",
                        labelWidth: 5,
                        width: 350,
                        labelWidth: 110,
                        hidden: true,
                        on: {
                            onChange: function (newval, oldval) {
                               
                                if ($.trim(newval) == "1") {
                                    debugger;
                                    $$("mints").show();

                                }
                                else  ($.trim(newval) == "") 
                                    $$("mints").hide();
                               
                            }
                        }
                    },
                    {
                        view: "label",
                        id: "mints",
                        label: "All",
                        labelWidth: 30,
                        width: 50,
                        hidden: true,
                    }, ]
                    },
                
                 {
                     view: "checkbox",
                     id: "chkDelayedDateb/w",
                     label: "Due Date Between",
                     labelWidth: 5,
                     width: 350,
                     labelWidth: 110,
                     hidden: true,
                     on: {
                         onChange: function (newval, oldval) {
                        
                             if ($.trim(newval) == "1") {
                                 debugger;
                                 $$("txtFrmDate").show();
                                 $$("txtToDate").show();
                                 $$("txtAson").hide();

                             }
                          
                         }
                     }
                 },
                ]
            },
            {}
    ]
}
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
                           cols: [{}, {
                               view: "button",
                               type: "icon",
                               id: "OkFilter",
                               icon: "wxi-check",
                               label: "OK",
                               inputWidth: 100,
                               width: 100,
                               click: function ()
                               {
                                   btnOkFilterClick();
                                   $$("AdvFilter").hide ();
                               }
                           },
                           {
                                
                                    view: "button",
                                    type: "icon",
                                    id: "OkFiltercancel",
                                    icon: "wxi-check",
                                    label: "Cancel",
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
};

function fnLoadSupplier() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_SUPPLIERLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["APPROVE_VEND_IND"] = $("#hdnAPPROVE_VEND_IND").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdSuplierSrch").parse(rowData);
                $$("grdSuplierSrch").refresh();
            }
        }
    });

    //return rowData;
}


function fnShowHideCol() {
    $$("gridMain").clearAll();
    $$("gridMain").refresh();
    if ($$("chkPending").getValue() == "1")
        $$("gridMain").showColumn("chkPending");
    else
        $$("gridMain").hideColumn("chkPending");
        debugger;
        if ($$("chkOrderValue").getValue() == "1")
            $$("gridMain").showColumn("chkOrderValue");
        else $$("gridMain").hideColumn("chkOrderValue");

        if ($$("chkAdvance").getValue() == "1") $$("gridMain").showColumn("chkAdvance");
        else $$("gridMain").hideColumn("chkAdvance");

        if ($$("chkRemarks").getValue() == "1") $$("gridMain").showColumn("chkRemarks");
        else $$("gridMain").hideColumn("chkRemarks");

        if ($$("chkCreate").getValue() == "1") $$("gridMain").showColumn("chkCreate");
        else $$("gridMain").hideColumn("chkCreate");
        
        if ($$("chkNext").getValue() == "1") $$("gridMain").showColumn("chkNext");
        else $$("gridMain").hideColumn("chkNext");

        if ($$("chkPR").getValue() == "1") $$("gridMain").showColumn("chkPR");
        else $$("gridMain").hideColumn("chkPR");

        if ($$("chkNext").getValue() == "1") $$("gridMain").showColumn("chkNext");
        else $$("gridMain").hideColumn("chkNext");

      //  if ($$("chkApprover1").getValue() == "1") $$("gridMain").showColumn("chkApprover1");
//else $$("gridMain").hideColumn("chkApprover1");

       // if ($$("chkRemarks1").getValue() == "1") $$("gridMain").showColumn("chkRemarks1");
       // else $$("gridMain").hideColumn("chkRemarks2");
        if ($$("chkItem1").getValue() == "1") $$("gridMain").showColumn("chkItem1");
        else $$("gridMain").hideColumn("chkItem1");

       // if ($$("chkApprover2").getValue() == "1") $$("gridMain").showColumn("chkApprover2");
       // else $$("gridMain").hideColumn("chkApprover1");

       // if ($$("chkRemarks2").getValue() == "1") $$("gridMain").showColumn("chkRemarks2");
      //  else $$("gridMain").hideColumn("chkRemarks2");
       // if ($$("chkItem2").getValue() == "1") $$("gridMain").showColumn("chkItem2");
       // else $$("gridMain").hideColumn("chkItem2");

       // if ($$("chkApprover3").getValue() == "1") $$("gridMain").showColumn("chkApprover3");
      //  else $$("gridMain").hideColumn("chkApprover3");
      //  if ($$("chkRemarks3").getValue() == "1") $$("gridMain").showColumn("chkRemarks3");
     //   else $$("gridMain").hideColumn("chkRemarks3");
     //   if ($$("chkItem3").getValue() == "1") $$("gridMain").showColumn("chkItem3");
     //   else $$("gridMain").hideColumn("chkItem3");

       // if ($$("chkApprover4").getValue() == "1") $$("gridMain").showColumn("chkApprover4");
       // else $$("gridMain").hideColumn("chkApprover4");
      //  if ($$("chkRemarks4").getValue() == "1") $$("gridMain").showColumn("chkRemarks4");
     //   else $$("gridMain").hideColumn("chkRemarks2");
      //  if ($$("chkItem4").getValue() == "1") $$("gridMain").showColumn("chkItem4");
     //   else $$("gridMain").hideColumn("chkItem5");

     //   if ($$("chkApprover5").getValue() == "1") $$("gridMain").showColumn("chkApprover5");
      //  else $$("gridMain").hideColumn("chkApprover5");
      //  if ($$("chkRemarks5").getValue() == "1") $$("gridMain").showColumn("chkRemarks5");
     //   else $$("gridMain").hideColumn("chkRemarks5");
     //   if ($$("chkItem5").getValue() == "1") $$("gridMain").showColumn("chkItem5");
    //    else $$("gridMain").hideColumn("chkItem5");



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

function fnLoadGrid() {
    debugger;
    if (!validateDate()) {
        return false;
    }
  //  fnLoadFilterWindow();
  
   // btnOkFilterClick();
   // $("advfilter").hide();
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PUSUPPLIERWISE";    
    dataparam["COMPID"] = $("#hdnCompId").val();
    var FrmDate = $$("txtFrmDate").getText();
    var Todate = $$("txtToDate").getText();
    dataparam["FrmDate"] = FrmDate;
    dataparam["Todate"] = Todate;
    dataparam["ddlUser"] = $$("ddlUser").getValue();
    dataparam["ddlpotypoe"] = $$("ddlpotypoe").getValue();
    dataparam["ddlcategory"] = $$("ddlcategory").getValue();
    dataparam["txtPRNo"] = $$("txtPRNo").getValue();
    dataparam["txtPoNo"] = $$("txtPoNo").getValue();
    dataparam["ddlStatus"] = $$("ddlStatus").getValue()
    dataparam["chkArrange"] = $$("chkArrange").getValue();
    dataparam["chkPONo"] = $$("chkPONo").getValue();
    dataparam["ddlStore"] = $$("ddlStore").getValue();
    dataparam["chkSupplier"] = $$("chkSupplier").getValue();
    //$("#DEF_DT_FORMAT").val(response.DEF_DT_FORMAT);
    //if ($("#costLinkDept").val() == "")
    //    $("#costLinkDept").val("0");
    if (dataparam.DEF_DT_FORMAT == 1) {
        $$("txtFrmDate").define("format", '%d/%m/%Y');
        $$('txtFrmDate').refresh();
        $$("txtToDate").define("format", '%d/%m/%Y');
        $$('txtToDate').refresh();
    }
    else if (dataparam.DEF_DT_FORMAT == 2) {
        $$("txtFrmDate").define("format", '%m/%d/%Y');
        $$('txtFrmDate').refresh();
        $$("txtToDate").define("format", '%m/%d/%Y');
        $$('txtToDate').refresh();
    }



    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (data) {
            debugger;
             if (data != "" && data !="null")
             {
                var rowData = JSON.parse(data);
                $$("gridMain").clearAll();
                $$("gridMain").parse(rowData.Table);
                $$("gridMain").refresh();
                var str = [];
                var GridCol = [];
                GridCol = rowData.GridCol;
                }
           
            else {
                $$("gridMain").clearAll();
                AlertMessage("No Records Found");
            }
        }
    });
};

function PUToDateChange(e) {
    debugger;
   // $$("gridMain").clearAll();
    var frmdate = $$("txtFrmDate").getText();
    var todate = $$("txtToDate").getText();
  
  
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
                debugger;
                var vToDt = formatDate(sFrmDt);
                $$("txtFrmDate").setValue(new Date(vToDt));
                bSucc = "0";

            }
        }
    });

    if (bSucc == "0") return false;
};


function PUfrmDateChange(e) {
    debugger;
  //  $$("gridMain").clearAll();
    var frmdate = $$("txtFrmDate").getText();
    var todate = $$("txtToDate").getText();
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
                debugger;
           
                var vToDt = formatDate(sFrmDt);
                $$("ToDt").setValue(new Date(vToDt));
                bSucc = "0";
            }
        }
    });
    if (bSucc == "0") return false;
};


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
            styles: true,
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
                }}
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

function fnCATEGORY() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GETPOCATEGORY";
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
                $$("ddlcategory").define("options", rowData);
            }
        }
    });

    return rowData;
}


function fnstored() {
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
                $$("ddlStore").define("options", rowData);
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