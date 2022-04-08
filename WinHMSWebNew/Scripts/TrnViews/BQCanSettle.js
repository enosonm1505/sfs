
var app = angular.module('BQTApp', ['webix']);

app.controller("BQBillController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmBQCanSet = {
        id: "frmBQCanSet",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               minWidth: 250,
                           },
                           {
                               cols: [
                                   {
                                       view: "search", label: "Bill Date", labelWidth: 80, inputidth: 220, width: 220, name: "BillDt", id: "txtBillDt", icon: "wxi-angle-up", readonly: true,
                                       on: {
                                           onSearchIconClick: function () {
                                               debugger;
                                             //  if (window.SHOWTGL == "0") return false;
                                              
                                               if (this.config.icon == "wxi-angle-down") {
                                                   this.define("icon", "wxi-angle-up");
                                                   this.setValue(window.AccDt103);
                                               }
                                               else if (this.config.icon == "wxi-angle-up") {
                                                   this.define("icon", "wxi-angle-down");
                                                   //  this.setValue(window.NAccDate103);
                                                   this.setValue(window.AccDt103);
                                               }

                                               this.refresh();
                                               this.focus();
                                               fnLoadGrid();

                                           }
                                       }
                                   },

                               ]

                           },
                           {
                               view: "button",
                               id: 'btnDisplay',
                               label: "Display", labelAlign: "left",
                               minWidth: 100, width: 100,
                               on: {
                                   onItemClick: function () {
                                       fnLoadGrid();
                                   }
                               }
                           }, {
                               minWidth: 500,
                           }
                       ]
                   },
                   {
                       height: 10,
                   },
                   {
                       id: "gridMain",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       editable: true,
                       height: 420,
                       minWidth:900,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [
                           
                               {id: "IXBILLNO", header: 'Bill No.', minWidth: 120,css: { 'text-align': 'center ! important', },},
                               {id: "ixGuestTy", header: 'Guest Ty', minWidth: 100,},
                               {id: "ixGuestNm",header: ['Guest Name', ], minWidth: 260,},
                               { id: "ixResNo", header: { text: "Reserve#", }, minWidth: 100,  css: { 'text-align': 'center ! important', } },
                               {id: "ixBillAmt", header: { text: "Bill Amount", },  minWidth: 120,css: { 'text-align': 'right ! important', },
                                   format: function (value) {
                                       return fnCurrFormat(value);
                                   },
                               },
                               {id: "ixSelect",header:"Select", editor: "Checkbox", minWidth: 50, css: {'text-align': 'center ! important', 'padding': '0px ! important', } ,
                                   template: "{common.checkbox()}",
                               },
                               { id: "ixHidBillNo", header: 'HBillNo', hidden:true, },
                               { id: "ixBillTy", header: 'BillTy', hidden:true, },
                               { id: "IxCovers", header: 'Covers', hidden:true, },
                               { id: "ixSession", header: 'Session',hidden:true,  },
                               { id: "ixHidDisp", header: 'Disp',hidden:true,  },
                       ],
                       data: [],

                       on: {
                           'onCheck': function (row, col, state) {
                               fnCheckClick(row);
                           },
                           "onKeyPress": function (code, e) {
                               debugger;
                               var selRow = this.getSelectedItem();
                               var rowid = selRow.id;
                               var charCode = e.which || e.keyCode;

                               if (e.ctrlKey == false && e.altKey == false && e.shiftKey == false && charCode==32) {
                                   var vChk= selRow.ixSelect;
                                   if(vChk=="1") selRow.ixSelect="0";
                                   else selRow.ixSelect="1";
                                   $$("gridMain").updateItem(rowid,selRow)
                                   fnCheckClick(rowid);
                               }
                           },

                           onBlur: function (prev_view) {


                           },
                           onBeforeClose: function () {
                               return false;
                           },
                       }
                   },
                   {
                       view: "text",
                       id: "txtNarr",
                       stringResult: true,
                       label: "Cancel Reason",
                       labelAlign: "Left",
                       labelWidth: 110,
                       inputWidth: 700,
                       attributes:{ maxlength:120 },
                       minWidth: 700,
                   }
                ]
            }
        ]

    }
    //$$("txtBillDt").enable();
    //$$("txtBillDt").setValue(window.AccDt103);
  
  
});





function sidebarFn() {
    $$("frmBQCanSet").resize();
    $$("frmBQCanSet").adjust();
    $$("gridMain").resize();
    $$("gridMain").adjust();
}
