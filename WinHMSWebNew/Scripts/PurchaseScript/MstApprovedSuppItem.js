var types=[];
var app = angular.module('PUApp', ['webix']);
app.controller("PurchaseCtrlController", function ($scope) {
    $("#LoadDIv").hide();
    var ddlId = ['ddlUOM'];
    var DDLVal = DropdownLoad(ddlId);
    types = DDLVal.ddlUOM;
    var searchicon = "<span class='webix_icon wxi-search'></span>";
    var dtUOM = [];
    $scope.frmMstApproSuppItem = {
        id:"frmMstApproSuppItem",
        view: 'form',
        minWidth: 900,
        height: 600,
        scroll:true,
        elements: [
            {
                rows: [
                      {
                         
                          cols: [
                              {
                                  view: "text",
                                  id: "txtSupplier",
                                  label: "Supplier",
                                  labelAlign: "left",
                                  labelWidth: 80,
                                  inputWidth: 400,
                                  width: 400,
                                  minWidth: 400,
                                  disabled: true,
                              },
                              {
                                  view: "button",
                                  id: 'btnsrchSupplier',
                                  minWidth: 250,
                                  labelWidth: 0,
                                  width: 30,
                                  minWidth: 30,
                                  height: 28,
                                  type: 'icon',
                                  icon: 'wxi-search',
                                  css: "Ar_search",
                                  disabled: true,
                                  on: {
                                      onItemClick: function () {
                                          debugger;
                                          $$("grdMstApprSupp").editStop();
                                          $$("grdMstApprSupp").refresh();
                                          $$("grdMstApprSupp").editStop();
                                          $$("grdMstApprSupp").clearAll();
                                          srchSuppliergrid();
                                          FnPartySearchLoad();
                                      }
                                  }
                                 
                              },
                               {
                                   view: "text",
                                   id: "txtProduct",
                                   label: "Product",
                                   labelAlign: "left",
                                   labelWidth: 80,
                                   inputWidth: 400,
                                   width: 400,
                                   minwidth: 400,
                                   hidden:true,
                                   disabled: true,
                               },
                              {
                                  view: "button",
                                  id: 'btnsrchProdId',
                                  minWidth: 250,
                                  labelWidth: 0,
                                  width: 30,
                                  minwidth: 30,
                                  height: 28,
                                  type: 'icon',
                                  icon: 'wxi-search',
                                  css: "Ar_search",
                                  disabled: true,
                                  hidden: true,
                                  on: {
                                      onItemClick: function () {
                                          debugger;
                                          $$("grdMstApprSupp").editStop();
                                          $$("grdMstApprSupp").clearAll();
                                          $$("grdMstApprSupp").refresh();
                                          $$("grdMstApprSupp").editStop();
                                          $$("grdMstApprSupp").clearAll();
                                          if ($("#hdnCurMode").val() == "V") {
                                              $$("grdMstApprSupp").hideColumn("ProdrSrch");
                                          }
                                          ProdSearchPopup();
                                          if ($$("ChkItemSupp").getValue() == "1") {
                                              $$("btnProdOk").hide();
                                          }
                                          $$("ProdSearchGrid").hideColumn("a_ind");
                                        
                                          
                                      }
                                  }
                              },

                              {
                                  view: "button",
                                  id: "btnAddRate",
                                  stringResult: true,
                                  label: "Add Rate",
                                  labelAlign: "Left",
                                  inputWidth: 100,
                                  labelWidth: 30,
                                  //width: 100,
                                  minwidth: 100,
                                  disabled: true,
                                 
                                  on: {
                                      onItemClick: function () {
                                          var valid = fnAddRowVal();
                                          if (valid == true) {
                                              //$$("grdMstApprSupp").hideColumn("ProdrSrch");
                                              var rowid = $$("grdMstApprSupp").getSelectedId();
                                              var itemval = $$("grdMstApprSupp").getSelectedItem();
                                              var data = $$("grdMstApprSupp").serialize();
                                              var i = 0;
                                              if (data.length > 0) {
                                                  $.each(data, function (key, value) {
                                                      i = i + 1;
                                                      if (value.id == rowid.id) {
                                                          if (i != "0") {
                                                              var addrow = {
                                                                  Currency_Id: itemval.Currency_Id,
                                                                  PROD_NM1: itemval.PROD_NM1,
                                                                  PARTY_ID: itemval.PARTY_ID,
                                                                  Prod_Uom: itemval.Prod_Uom,
                                                                  Prod_Id: itemval.Prod_Id,
                                                                  PARTY_NM: itemval.PARTY_NM,
                                                                  RT_FDT: $("#hdnCurrentDt").val(),
                                                                  //ColSrchInd:itemval.ColSrchInd,
                                                                  ColSrchInd: "",
                                                                  Basic_rate:"0.0000"

                                                                  //VAL_2DT:  $("#hdnCurrentDt").val(),
                                                              };
                                                              $$("grdMstApprSupp").add(addrow, i);
                                                              $$("grdMstApprSupp").refresh();
                                                              return false;
                                                          }
                                                      }

                                                  });
                                              }

                                          }
                                      }
                                  }

                              },
                              {
                                  id: "ChkSuppItem",
                                  view: "checkbox",
                                  label: "Supplier Item",
                                  labelAlign: "Right",
                                  labelWidth: 140,
                                  width: 200,
                                  disabled: true,
                                  value:"1",
                                  on: {
                                      onChange: function (newval, oldval) {
                                     
                                          $$("grdMstApprSupp").editStop();
                                          if ($.trim(newval) == "1") {
                                              $$("btnsrchSupplier").enable();
                                              $$("ChkItemSupp").enable();
                                              $$("ChkItemSupp").setValue("0");
                                              $$("grdMstApprSupp").showColumn("Prod_Id");
                                              $$("grdMstApprSupp").showColumn("PROD_NM1");
                                              $$("grdMstApprSupp").hideColumn("PARTY_NM");
                                              $$("grdMstApprSupp").clearAll();
                                              $$("txtSupplier").setValue("");
                                          }
                                          else
                                          {
                                              $$("ChkItemSupp").setValue("1");
                                          }
                                      }
                                  }
                              },
                               {
                                   id: "ChkItemSupp",
                                   view: "checkbox",
                                   label: "Item Supplier",
                                   labelAlign: "Right",
                                   labelWidth: 80,
                                   width: 200,
                                   disabled: true,
                                   on: {
                                       onChange: function (newval, oldval) {
                                           $$("grdMstApprSupp").editStop();
                                           if ($.trim(newval) == "1") {
                                               $$("btnsrchProdId").enable();
                                               $$("ChkSuppItem").setValue("0");
                                               //$$("ChkSuppItem").disable();
                                               $$("txtProduct").show();
                                               $$("btnsrchProdId").show();
                                               $$("txtSupplier").hide();
                                               $$("btnsrchSupplier").hide();
                                               $$("grdMstApprSupp").showColumn("PARTY_NM");
                                               $$("grdMstApprSupp").hideColumn("Prod_Id");
                                               $$("grdMstApprSupp").hideColumn("PROD_NM1");
                                               $$("grdMstApprSupp").clearAll();
                                               $$("txtProduct").setValue("");
                                           }
                                           else
                                           {
                                               $$("txtProduct").hide();
                                               $$("btnsrchProdId").hide();
                                               $$("txtSupplier").show();
                                               $$("btnsrchSupplier").show();
                                               $$("btnsrchProdId").disable();
                                               $$("ChkSuppItem").setValue("1");
                                           }
                                       }
                                   }
                               },
                              
                                {
                                    id: "AddRow",
                                    view: "button",
                                    type: "icon",
                                    icon: "wxi-plus",
                                    labelAlign: "Right",
                                    labelWidth: 140,
                                    width: 60,
                                    minwidth: 60,
                                    disabled: true,
                                    value: "1",
                                    on: {
                                        onItemClick: function () {
                                            var valid = fnAddRowVal();
                                            if (valid == true) {
                                                fnCallAddRow();
                                                var data = $$("grdMstApprSupp").serialize();
                                            }
                                        }
                                    }
                                },
                                 {
                                     id: "RemoveRow",
                                     view: "button",
                                     type: "icon",
                                     icon: "wxi-trash",
                                      labelAlign: "Right",
                                      labelWidth: 140,
                                     width:60,
                                     minwidth: 60,
                                     disabled: false,
                                     value: "1",
                                     on: {
                                         onItemClick: function () {
                                             fnCallDelRow();
                                         }
                                     }
                                 },
                               
                          ]

                      },
                     
                {
                    cols: [
                        {

                            view: "datatable",
                            scroll: true,
                            id: "grdMstApprSupp",
                            select: "row",
                            autoConfig: true,
                            spans: true,
                            navigation: true,
                            height: 480,
                            editable:true,
                            css: "webix_header_border wingrd_hight",
                            minWidth: 900,
                           data: [],
                           columns: [
                              { header: ["Product"], id: "PROD_NM1", width: 230, css: { 'text-align': 'left ! important' },  },

                              { header: ["Product Id"], id: "Prod_Id", width: 110, css: { 'text-align': 'left ! important' }, },

                              { header: ["Party_Id"], id: "PARTY_ID", hidden:true },

                              { header: ["Supplier"], id: "PARTY_NM", width: 230, css: { 'text-align': 'left ! important' } , liveEdit: false, hidden: true },

                              { header: "", id: "ProdrSrch", width: 60, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' }, hidden:true},

                              { header: ["UOM"], id: "Prod_Uom", width: 80, css: { 'text-align': 'left ! important' }, editor: 'richselect', options: types,  },
                              
                              { header: ["Currency"], id: "Currency_Id", width: 70, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, },
                             
                              {
                                  header: "Rate Valid From", id: "RT_FDT", width: 150, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"),
                                  stringResult: true, liveEdit: true, css: { 'text-align': 'left ! important' },
                                  //format: function (val) {
                                  //    var Format = "%d/%m/%Y";
                                  //    if ($("#hdnDefDateFormat").val() == "2") Format = "%m/%d/%Y";
                                  //    var myformat = webix.Date.dateToStr(Format);
                                  //    if (val) return myformat(val);
                                  //   else val;
                                  //}
                              },

                              { header: ["Rate"], id: "Basic_rate", width: 90, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true,numberFormat: "1.0000"  },  //format: webix.i18n.numberFormat,

                              { header: ["LAND_RATE"], id: "LAND_RATE", hidden: true },

                              { header: ["GST"], id: "gst_ind", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' } ,hidden:true},

                              { header: ["GST%"], id: "gstPer", width: 60, css: { 'text-align': 'left ! important' }, editor: "text",   numberFormat: "1111.0000",hidden:true },

                              { header: ["Reg Type"], id: "RGTYPE", width: 90, css: { 'text-align': 'left ! important' }, },

                              { header: ["Inter GST"], id: "INTERGST", width: 90, css: { 'text-align': 'left ! important' },  },

                              { header: ["Intra GST"], id: "INTRAGST", width: 90, css: { 'text-align': 'left ! important' },  },

                              {
                                  header: ["Rate Valid upto"], id: "VAL_2DT", width: 120, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, liveEdit: true, css: { 'text-align': 'left ! important' },
                                  //format: function (val) {
                                  //    var Format = "%d/%m/%Y";
                                  //    if ($("#hdnDefDateFormat").val() == "2") Format = "%m/%d/%Y";
                                  //    var myformat = webix.Date.dateToStr(Format);
                                  //    if (val) return myformat(val);
                                  //    else val;,
                                  //}, 
                              },
                              { header: ["Quote Ref.No"], id: "QUOTE_REF_NO", width: 130, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, },

                              { header: ["Preffered Supplier"], id: "P_IND", editor: 'check', template: "{common.checkbox()}", width: 130, css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' },hidden:true },

                              { header: ["Last Update Date"], id: "RATE_UPDATE_DT", width: 120, css: { 'text-align': 'left ! important' },},

                              { header: [""], id: "ColSrchInd", width: 90, css: { 'text-align': 'left ! important' }, hidden: true },
                              
                           ],
                           data: [],
                        on: {
                            'onBlur': function () {
                                $$("grdMstApprSupp").refresh();
                              
                            },
                            'onAfterEditStop': function (state, editor) {
                                debugger;
                                var getvalset = this.getItem(editor.row);
                                if (editor.column == "Basic_rate") {
                                   var getval = this.getItem(editor.row);
                                    if (state.value != state.old) 
                                    {
                                        debugger;
                                        if (isNaN(state.value) == false) {
                                            getval.Basic_rate=parseFloat(state.value).toFixed(4);
                                            this.refresh();
                                        }
                                    }
                                    // if(state.value==state.old){
                                    //    debugger;
                                    //    if (isNaN(state.value) == false) {
                                    //        getval.Basic_rate=parseFloat(state.value).toFixed(4);
                                    //        this.refresh();
                                    //    }
                                  
                                    //}
                                }
                                //$$("grdMstApprSupp").editStop();
                                //$$("grdMstApprSupp").refresh();
                              
                            },
                          
                            onAfterEditStart: function (id) {
                                debugger;
                                var getval = this.getItem(id.row);
                                if (id.column == 'QUOTE_REF_NO') {
                                    this.getEditor().getInputNode().setAttribute("maxlength", 20);
                                    $$("grdMstApprSupp").refresh();
                                }
                                if (id.column == 'Prod_Uom') {
                                   
                                    var Options = this.getColumnConfig("Prod_Uom").collection;
                                    Options.clearAll();
                                    UOMSTR = types;
                                    Options.parse(UOMSTR);
                                    var SetUom=types.find(element => element.id===getval.Prod_Uom);
                                    if(SetUom==undefined || SetUom==[] || SetUom==''){
                                        var Options = $$("grdMstApprSupp").getColumnConfig("Prod_Uom").collection;
                                        Options.clearAll();
                                        types.push({ id:getval.Prod_Uom, value: getval.Prod_Uom });
                                        Options.parse(types);
                                    }
                                    $$("grdMstApprSupp").refresh();
                                    return true;
                                }

                            },
                           
                            'onBeforeEditStart': function (id) {
                                   debugger;
                                   var getval = this.getItem(id.row);
                                   if ($("#hdnCurMode").val() == "O") {

                                      // if ($$("ChkSuppItem").getValue() == "1") {
                                           if (getval.ColSrchInd == "1") {
                                               if (id.column == "Prod_Uom") {
                                                   return false;
                                               }
                                               
                                               if (id.column == "RT_FDT") {
                                                   return false;
                                               }

                                               else {
                                                   return true;
                                               }
                                           }

                                           if ($$("ChkSuppItem").getValue() == "1") {
                                               if (getval.Prod_Id == "") {
                                                   if (id.column == "Prod_Uom") {
                                                       return false;
                                                   }

                                                   else {
                                                       return true;
                                                   }
                                               }
                                           }

                                           if ($$("ChkItemSupp").getValue() == "1") {
                                               if (getval.PARTY_ID == "") {
                                                   if (id.column == "Prod_Uom") {
                                                       return false;
                                                   }

                                                   else {
                                                       return true;
                                                   }
                                               }
                                           }

                                           if (id.column == 'Prod_Uom') {
                                               debugger;
                                               var Options = this.getColumnConfig("Prod_Uom").collection;
                                               var reqobj1 = {};
                                               var UOMSTR = [];
                                               var rowData = "";
                                               reqobj1["REQTYPE"] = "GET_FNUOMALTER";
                                               reqobj1["prodId"] = getval.Prod_Id;
                                               reqobj1["prodUOM"] = getval.Prod_Uom;
                                               var dataparam1 = JSON.stringify(reqobj1);
                                               $.ajax({
                                                   async: false,
                                                   url: "/PurchaseCtrl/MPAPI_CALL",
                                                   type: 'POST',
                                                   data: "request=" + dataparam1,
                                                   success: function (d) {
                                                       debugger;
                                                       if (d != "[]") {
                                                           Options.clearAll();
                                                           rowData = JSON.parse(d);
                                                           rowData.push({ id: getval.Prod_Uom, value: getval.Prod_Uom });
                                                           Options.parse(rowData);
                                                       }
                                                       else {
                                                           Options.clearAll();
                                                           UOMSTR = { id: getval.Prod_Uom, value: getval.Prod_Uom };
                                                           Options.parse(UOMSTR);

                                                       }
                                                   },
                                               });
                                               return true;
                                          
                                       }
                                           
                                     
                                   }
                                if ($("#hdnCurMode").val() == "V") {
                                    if (id.column == "Basic_rate") {
                                        return false;
                                    }
                                    if (id.column == "QUOTE_REF_NO")
                                    {
                                        return false;
                                    }
                                       
                                    if (id.column == "Currency_Id"){
                                        return false;
                                    }
                                       
                                    if (id.column == "RT_FDT"){
                                        return false;
                                    }
                                        
                                    if (id.column == "VAL_2DT") {
                                        return false;
                                    }
                                    if (id.column == "Prod_Uom") {
                                        return false;
                                    }
                                }
                            },
                           

                            onItemClick: function (id) {
                                debugger;
                                var SelRow = this.getItem(id.row);
                                var getColumn = id.column;

                                if ($$("ChkSuppItem").getValue() == "1") {
                                    if (getColumn == "ProdrSrch") {
                                        if (SelRow.ColSrchInd == "") {
                                            ProdSearchPopup();
                                            $$("ProdSearchGrid").showColumn("a_ind");
                                        }
                                    }
                                    if (id.column == 'Prod_Uom') {
                                        var Options = this.getColumnConfig("Prod_Uom").collection;
                                        Options.clearAll();
                                        UOMSTR = types;
                                        Options.parse(UOMSTR);
                                        $$("grdMstApprSupp").refresh();
                                        return true;
                                    }
                                }

                                if ($$("ChkItemSupp").getValue() == "1") {
                                    if (getColumn == "ProdrSrch") {
                                        if (SelRow.ColSrchInd == "") {
                                            srchSuppliergrid();
                                            $$("MstGridSupplier").showColumn("a_ind");
                                            $$("btnSuppOk").show();
                                            FnPartySearchLoad();
                                        }
                                        
                                    }
                                    if (id.column == 'Prod_Uom') {
                                        debugger;
                                        var Options = this.getColumnConfig("Prod_Uom").collection;
                                        Options.clearAll();
                                        UOMSTR = types;
                                        Options.parse(UOMSTR);
                                        $$("grdMstApprSupp").refresh();
                                        return true;
                                    }
                                }
                            },


                            'onCheck': function (rowId, colId) {
                                debugger;
                                var itemval = this.getItem(rowId);
                                
                                if (itemval.gst_ind == "1") {
                                    $$("grdMstApprSupp").updateItem(rowId, {
                                        gstPer:"0.00",});
                                }

                                if (itemval.gst_ind == "0") {
                                    $$("grdMstApprSupp").updateItem(rowId, {
                                        gstPer: "",
                                    });
                                }
                            },

                          }
                       },
                     ]
                  },
               ]
            }
        ]
    }
   
});
 //gridResize("1");

function fnAddRowVal() {
    debugger;
    if (($.trim($$("ChkSuppItem").getValue()) == "1")) {
        if (($.trim($$("txtSupplier").getValue()) == "")) {
            AlertMessage("Supplier can not be empty");
            return false;
        }
    }
    if (($.trim($$("ChkItemSupp").getValue()) == "1")) {
        if (($.trim($$("txtProduct").getValue()) == "")) {
            AlertMessage("Product can not be empty");
            return false;
        }
    }

    var data = $$("grdMstApprSupp").serialize();
    $$("grdMstApprSupp").refresh();

    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            if (($.trim($$("ChkSuppItem").getValue()) == "1")) {
                if ($.trim(data[i].PROD_NM1) == "") {
                    AlertMessage("Product cannot be empty");
                    return false;
                }
            }
            if (($.trim($$("ChkItemSupp").getValue()) == "1")) {
                if ($.trim(data[i].PARTY_NM) == "") {
                    AlertMessage("Supplier cannot be empty");
                    return false;
                }
            }
        }
    }

    return true;
}



function fnOpen() {
    debugger;
    fnEnable();
    $("#hdnCurMode").val("O");
    $$("btnAddRate").show();
    $$("btnAddRate").enable();
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}

function fnView() {
    debugger;
    $("#hdnCurMode").val("V");
    $$("btnAddRate").disable();
    $$("btnsrchProdId").enable();
    $$("btnsrchSupplier").enable();
    $$("ChkSuppItem").enable();
    $$("ChkItemSupp").enable();
    $$("AddRow").disable();
    $$("RemoveRow").disable();
    $$("grdMstApprSupp").enable();
   // $$("grdMstApprSupp").disable();
   // $$("grdMstApprSupp").hideColumn("ProdrSrch");
    document.getElementById("SAVE").disabled = true;
    document.getElementById("DELETE").disabled = false;
    document.getElementById("OPEN").disabled = true;
    fnRemoveClass($("#hdnCurMode").val());
}


function fnEnable() {
    debugger;
    $$("grdMstApprSupp").enable();
    $$("btnsrchProdId").enable();
    $$("btnsrchSupplier").enable();
    $$("btnAddRate").enable();
    $$("btnAddRate").enable();
    $$("ChkItemSupp").enable();
    $$("ChkSuppItem").enable();
    $$("AddRow").enable();
    $$("RemoveRow").enable();
}

function fnRefresh() {
    
    $("#hdnCurMode").val("");
    $$("txtSupplier").disable();
    $$("btnsrchSupplier").disable();
    $$("txtProduct").disable();
    $$("txtProduct").setValue("");
    $$("btnsrchProdId").disable();
    $$("btnAddRate").disable();
    $$("ChkSuppItem").disable();
    $$("ChkItemSupp").disable();
    $$("txtSupplier").setValue("");
    $$("txtProduct").disable();
    $$("grdMstApprSupp").editStop();
    $$("grdMstApprSupp").clearAll();
    $$("AddRow").disable();
    fnRemoveClass($("#hdnCurMode").val());
    document.getElementById("SAVE").disabled = true;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("VIEW").disabled = false;
    document.getElementById("DELETE").disabled = true;
  
}

function ProdSearchPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 32; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    //debugger;
    webix.ui({
        view: "window",
        modal: true,
        close: true,
        id: "ProdSearchPopup",
        head: "List of Products",
        position: "center",
       // css: "WebIxStyle",
        width: 400,
        move: true,
        body: {
            view: 'form',
            width: 400,
            elements: [
                {
                    rows: [
                        
                        {
                            view: 'richselect',
                            label: 'Product Group',
                            id: 'ddlGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 350,
                            on: {
                                onChange: function () {
                                    FnddlSubGroup();
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: 'richselect',
                            label: 'Product Sub Group',
                            id: 'ddlSubGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 350,
                            on: {
                                onChange: function () {
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: "datatable",
                            id: "ProdSearchGrid",
                            name: 'ProdSearchGrid',
                            select: 'row',
                            scrollX: false,
                            columns: [
                                      { header: ["Product Id", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' },},
                                      { header: ["Product Name", { content: "textFilter" }], id: "PROD_NM1", width: 300, css: { 'text-align': 'left ! important' }, fillspace: true, },
                                      { header: ["Prod_uom"], id: "PROD_UOM", hidden: true, },
                                      { header: ["Party_Id"], id: "Party_Id", hidden: true, },
                                      { header: ["Reg_Type"], id: "Reg_Type", hidden: true, },
                                      { header: ["INTERGST"], id: "Inter_Gst_Nm", hidden: true, },
                                      { header: ["INTRAGST"], id: "Intra_Gst_Nm", hidden: true, },
                                      { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "a_ind", editor: 'check', template: "{common.checkbox()}", width: 70, css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' }, },

                                     
                            ],
                            editable: true,
                            minWidth: 550,
                            fixedRowHeight: false,
                            rowLineHeight: 28,
                            rowHeight: 28,
                            height: 350,
                            data: [],
                            on: {
                                'onItemDblClick': function (id) {
                                    debugger;
                                    if ($("#hdnCurMode").val() == "V") {
                                        $$("grdMstApprSupp").hideColumn("ProdrSrch");
                                    }
                                    else {
                                        $$("grdMstApprSupp").showColumn("ProdrSrch");
                                    }
                                   // $$("grdMstApprSupp").showColumn("ProdrSrch");
                                   
                                    if ($$("ChkSuppItem").getValue() == "1") {
                                     
                                            var selRow = $$("ProdSearchGrid").getSelectedItem();
                                            var GrdRow = $$("grdMstApprSupp").getSelectedItem();
                                           
                                            GrdRow["Prod_Id"] = selRow.PROD_ID;
                                            GrdRow["PROD_NM1"] = selRow.PROD_NM1;
                                            GrdRow["Prod_Uom"] = selRow.Prod_Uom;
                                            GrdRow["PARTY_ID"] = selRow.Party_Id;
                                            GrdRow["Currency_Id"] = "RS";
                                            GrdRow["RT_FDT"] = $("#hdnCurrentDt").val();
                                            GrdRow["Basic_rate"] = "0.0000";

                                            $$("grdMstApprSupp").refresh();
                                    }

                                    if ($$("ChkItemSupp").getValue() == "1") {
                                      //  $$("grdMstApprSupp").refresh();
                                        var selRow = $$("ProdSearchGrid").getSelectedItem();
                                        $$("txtProduct").setValue(selRow.PROD_NM1);
                                        $("#hdnProd_Id").val($.trim(selRow.PROD_ID));
                                        $$("grdMstApprSupp").showColumn("RGTYPE");
                                        $$("grdMstApprSupp").showColumn("INTERGST");
                                        $$("grdMstApprSupp").showColumn("INTRAGST");
                                        $$("grdMstApprSupp").hideColumn("Prod_Id");
                                        $("#hdnProdUom").val($.trim(selRow.PROD_UOM));
                                        $("#hdnCurrencyId").val("RS");
                                        fnddlUOMAlter();
                                        FnApprSuppItemLoad();
                                       
                                        $$("grdMstApprSupp").refresh();
                                    }
                                    var data = $$("grdMstApprSupp").serialize();
                                    $$("grdMstApprSupp").refresh();

                                    if ((data.length == "0") || (data.length == null)) {
                                        fnCallAddRow();
                                    }
                                    $$("ProdSearchGrid").hide();
                                    $$("ProdSearchPopup").hide();

                                }
                            },
                        },
                        
                        {
                            paddingY: 5,
                            cols: [
                                {},
                                 {
                                     view: 'button',
                                     label: 'OK',
                                     id:'btnProdOk',
                                     width: 100,
                                     align: "center",
                                     //hidden:true,
                                     css: 'webix_primary',
                                     on: {
                                         onItemClick: function () {
                                             debugger;
                                           
                                             var data = $$("grdMstApprSupp").serialize();
                                             var SelId = $$("grdMstApprSupp").getSelectedId(true);
                                             var RowIndex = $$("grdMstApprSupp").getIndexById(SelId[0].row);
                                          
                                             for (var i = 0; i < data.length; i++) {
                                                 var ProdBind = fnProdBind();
                                                 if (RowIndex == i) {
                                                     for (var a = 0; a < ProdBind.length; a++) {
                                                         if (a == 0) {
                                                             var row_id = SelId[0].id;
                                                          
                                                             $$("grdMstApprSupp").updateItem(row_id, {
                                                                 Prod_Id: ProdBind[a].PROD_ID,
                                                                 PROD_NM1:ProdBind[a].PROD_NM1,
                                                                 Prod_Uom: ProdBind[a].PROD_UOM,
                                                                 Currency_Id: "RS",
                                                                 PARTY_ID: ProdBind[a].Party_Id,
                                                                 RT_FDT: $("#hdnCurrentDt").val(),
                                                                // VAL_2DT: $("#hdnCurrentDt").val(),
                                                                 RGTYPE: ProdBind[a].Reg_Type,
                                                                 INTERGST: ProdBind[a].Inter_Gst_Nm,
                                                                 INTRAGST: ProdBind[a].Intra_Gst_Nm,
                                                                 ColSrchInd:"",
                                                                 Basic_rate:"0.0000",
                                                                 RATE_UPDATE_DT:"",
                                                                 VAL_2DT:"",
                                                                 LAND_RATE:"",
                                                                 P_IND :"0",
                                                                 QUOTE_REF_NO:"",
                                                             });
                                                         }
                                                         else {
                                                             var addRow = {
                                                                 Prod_Id: ProdBind[a].PROD_ID,
                                                                 PROD_NM1: ProdBind[a].PROD_NM1,
                                                                 Prod_Uom: ProdBind[a].PROD_UOM,
                                                                 Currency_Id: "RS",
                                                                 RT_FDT: $("#hdnCurrentDt").val(),
                                                                 //VAL_2DT: $("#hdnCurrentDt").val(),
                                                                 RGTYPE: ProdBind[a].Reg_Type,
                                                                 PARTY_ID: ProdBind[a].Party_Id,
                                                                 INTERGST: ProdBind[a].Inter_Gst_Nm,
                                                                 INTRAGST: ProdBind[a].Intra_Gst_Nm,
                                                                 ColSrchInd: "",
                                                                 Basic_rate:"0.0000",
                                                                 RATE_UPDATE_DT:"",
                                                                 VAL_2DT:"",
                                                                 LAND_RATE:"",
                                                                 P_IND :"0",
                                                                 QUOTE_REF_NO:"",
                                                             }
                                                             RowIndex = RowIndex + 1;
                                                             $$("grdMstApprSupp").add(addRow, RowIndex);
                                                         }

                                                         $$("grdMstApprSupp").refresh();
                                                     }
                                                 }
                                                 $$("ProdSearchPopup").hide();
                                             }

                                         }
                                     }
                                 },
                               {
                                   view: 'button',
                                   label: 'Cancel',
                                   width: 100,
                                   align: "center",
                                   css: 'webix_primary',
                                   on: {
                                       onItemClick: function () {
                                           $$('ProdSearchPopup').hide();
                                       }
                                   }
                               }
                            ]
                        },
                    ]
                }
            ]
        }
    }).show();
    FnddlGroup();
    FnddlSubGroup();
    FnProductSearchLoad();
}

function fnCallAddRow() {
    debugger;
        $$("grdMstApprSupp").add({
            Prod_Id: "", PROD_NM1: "", PARTY_ID: "", PARTY_NM: "", Prod_Uom: "", Currency_Id: "", RT_FDT: $("#hdnCurrentDt").val(),P_IND:0,
            Mod_Dt: "", Basic_rate: "0.0000", LAND_RATE: "", gst_ind: "", gstPer: "", RGTYPE: "", INTERGST: "", INTRAGST: "", QUOTE_REF_NO: "",
            RATE_UPDATE_DT:"", VAL_2DT:"", ColSrchInd : 0,
        });
        $$("grdMstApprSupp").refresh();
        $$("grdMstApprSupp").refreshColumns();
   
};

function FnProductSearchLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_PRODUCTSRCH";
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    reqobj["ddlSubGroup"] = $$("ddlSubGroup").getValue();
    reqobj["hdnPartyId"] = $("#hdnPartyId").val();
    reqobj["hdnProd_Id"] = $("#hdnProd_Id").val();
    if ($$("ChkSuppItem").getValue() == "1"){
        var SelRow = $$("grdMstApprSupp").getSelectedItem();
        if (SelRow != "") {
            reqobj["Reg_Type"] = SelRow.RGTYPE;
        }
    }

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("ProdSearchGrid").clearAll();
            $$("ProdSearchGrid").parse(rowDatad);
            $$("ProdSearchGrid").refresh();
        },
    });
}



function srchSuppliergrid() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SupplierGrid",
        head: "Supplier Search",
        position: "center",
        //css: "WebIxStyle",
        height: 500,
        width: 550,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "MstGridSupplier",
                   select: 'row',
                   //css: "webix_header_border",
                   columns: [
                           { id: "PARTY_ID", header: ['Supplier Id', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                           { header: ["Supplier Name", { content: "textFilter" }], id: "PARTY_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["Prod_Id"], id: "Prod_Id", hidden: true, },
                           { header: ["RegType"], id: "Reg_Type", hidden: true, },
                           { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "a_ind", editor: 'check', template: "{common.checkbox()}", width: 70, css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' },hidden:true },
                   ],
                   data: [],
                   on: {
                       'onItemDblClick': function (id) {
                           if ($("#hdnCurMode").val() == "V") {
                               $$("grdMstApprSupp").hideColumn("ProdrSrch");
                           }
                           else {
                               $$("grdMstApprSupp").showColumn("ProdrSrch");
                           }
                           if ($$("ChkItemSupp").getValue() == "1") {
                               debugger;
                             
                               var selRow = $$("MstGridSupplier").getSelectedItem();
                               var GrdRow = $$("grdMstApprSupp").getSelectedItem();
                               var selRow1 = $$("ProdSearchGrid").getSelectedItem();
                             
                               GrdRow["PARTY_ID"] = selRow.PARTY_ID;
                               GrdRow["PARTY_NM"] = selRow.PARTY_NM;
                               GrdRow["Prod_Uom"] = selRow1.PROD_UOM;
                               GrdRow["Prod_Id"] = selRow.Prod_Id;
                               GrdRow["Currency_Id"] = "RS";
                               GrdRow["RT_FDT"] = $("#hdnCurrentDt").val();
                               GrdRow["Basic_rate"] = "0.0000";

                               $$("grdMstApprSupp").refresh();


                           }

                           if ($$("ChkSuppItem").getValue() == "1") {
                               debugger;
                               var selRow = $$("MstGridSupplier").getSelectedItem();
                               $$("txtSupplier").setValue(selRow.PARTY_NM);
                               $("#hdnPartyId").val($.trim(selRow.PARTY_ID));
                          
                               if ($("#hdnGstInd").val() == "1") {
                                   $$("grdMstApprSupp").showColumn("RGTYPE");
                                   $$("grdMstApprSupp").showColumn("INTERGST");
                                   $$("grdMstApprSupp").showColumn("INTRAGST");
                                   $$("grdMstApprSupp").showColumn("Prod_Id");
                                   
                               }
                               if ($("#hdnPrefSupp").val() == "1") {
                                   $$("grdMstApprSupp").showColumn("P_IND");
                               }
                              
                               FnApprSuppItemLoad();
                           }
                       

                           var data = $$("grdMstApprSupp").serialize();
                           $$("grdMstApprSupp").refresh();
                           if ((data.length == "0") || (data.length == null)) {
                               fnCallAddRow();
                           }
                          
                           $$("MstGridSupplier").hide();
                           $$("SupplierGrid").hide();

                       },
                       'onKeyPress': function (code, e) {
                           //debugger;
                           var selRow = this.getSelectedItem();
                           var rowid = selRow.id;
                           var vChk = selRow.a_ind;
                           if (vChk == "1") selRow.a_ind = "1";
                           else selRow.a_ind = "0";

                       },

                   },

               },

               {
                   paddingY: 5,
                   cols: [
                       {},
                      {
                          view: 'button',
                          label: 'OK',
                          id:"btnSuppOk",
                          width: 100,
                          align: "center",
                          hidden:true,
                          css: 'webix_primary',
                          on: {
                              onItemClick: function () {
                                  var data = $$("grdMstApprSupp").serialize();
                                  var SelId = $$("grdMstApprSupp").getSelectedId(true);
                                  var RowIndex = $$("grdMstApprSupp").getIndexById(SelId[0].row);
                                      for (var i = 0; i < data.length; i++) {
                                          var SuppBind = fnSuppBind();
                                          if (RowIndex == i)
                                          {
                                              for (var a = 0; a < SuppBind.length; a++) {
                                                  if (a == 0) {
                                                      var row_id = SelId[0].id;
                                                      $$("grdMstApprSupp").updateItem(row_id, {
                                                          PARTY_ID: SuppBind[a].PARTY_ID,
                                                          PARTY_NM: SuppBind[a].PARTY_NM,
                                                          Prod_Id: SuppBind[a].Prod_Id,
                                                          RGTYPE: SuppBind[a].Reg_Type,
                                                          Currency_Id: "RS",
                                                          Prod_Uom: $("#hdnProdUom").val(),
                                                          RT_FDT: $("#hdnCurrentDt").val(),
                                                          ColSrchInd:"",
                                                          Basic_rate:"0.0000",
                                                          RATE_UPDATE_DT:"",
                                                          VAL_2DT:"",
                                                          LAND_RATE:"",
                                                          P_IND :"0",
                                                          QUOTE_REF_NO:"",
                                                      });
                                                  }
                                                  else {
                                                      var addRow = {
                                                          PARTY_ID: SuppBind[a].PARTY_ID,
                                                          PARTY_NM: SuppBind[a].PARTY_NM,
                                                          Prod_Id: SuppBind[a].Prod_Id,
                                                          Currency_Id: "RS",
                                                          RGTYPE: SuppBind[a].Reg_Type,
                                                          Prod_Uom: $("#hdnProdUom").val(),
                                                          RT_FDT: $("#hdnCurrentDt").val(),
                                                          ColSrchInd: "",
                                                          Basic_rate:"0.0000",
                                                          RATE_UPDATE_DT:"",
                                                          VAL_2DT:"",
                                                          LAND_RATE:"",
                                                          P_IND :"0",
                                                          QUOTE_REF_NO:"",

                                                      }
                                                      RowIndex = RowIndex + 1;
                                                      $$("grdMstApprSupp").add(addRow, RowIndex);
                                                  }

                                                  $$("grdMstApprSupp").refresh();
                                              }
                                          }
                                          $$("SupplierGrid").hide();
                                      }
                                  }
                              }
                          },
                      {
                          view: 'button',
                          label: 'Cancel',
                          width: 100,
                          align: "center",
                          css: 'webix_primary',
                          on: {
                              onItemClick: function () {
                                  $$('MstGridSupplier').hide();
                                  $$("SupplierGrid").hide();
                              }
                          }


                      }
                   ]
               },

            ],

        }

    });
    $$("SupplierGrid").show();
};



function fnProdBind() {
   debugger;
    var ArrayProd = [];
    var data = $$("ProdSearchGrid").serialize();

    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {

            if (data[i].a_ind == "1") {
             
                var addrow = {
                    PROD_ID: data[i].PROD_ID,
                    PROD_NM1: data[i].PROD_NM1,
                    PROD_UOM: data[i].PROD_UOM,
                    Reg_Type: data[i].Reg_Type,
                    Inter_Gst_Nm: data[i].Inter_Gst_Nm,
                    Intra_Gst_Nm: data[i].Intra_Gst_Nm,
                    Party_Id: data[i].Party_Id,
                 
                };
                debugger;
                var SetUom=types.find(element => element.id===data[i].PROD_UOM);
                if(SetUom==undefined || SetUom==[] || SetUom==''){
                    var Options = $$("grdMstApprSupp").getColumnConfig("Prod_Uom").collection;
                    Options.clearAll();
                    types.push({ id: data[i].PROD_UOM, value: data[i].PROD_UOM });
                    Options.parse(types);
                }
            
               
                ArrayProd = ArrayProd.concat(addrow);
               
            }
        }
    }

    return ArrayProd;
}


function fnSuppBind() {
    var ArraySupp = [];
    var data = $$("MstGridSupplier").serialize();

    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {

            if (data[i].a_ind == "1") {
                var addrow = {
                    PARTY_ID: data[i].PARTY_ID,
                    PARTY_NM: data[i].PARTY_NM,
                    Prod_Id: data[i].Prod_Id,
                    Reg_Type: data[i].Reg_Type,
                };

                ArraySupp = ArraySupp.concat(addrow);
            }
        }
    }

    return ArraySupp;
}


function FnPartySearchLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_SUPPLIERSRCH";
    reqobj["hdnProd_Id"] = $("#hdnProd_Id").val();
   
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("MstGridSupplier").clearAll();
            $$("MstGridSupplier").parse(rowDatad);
            $$("MstGridSupplier").refresh();
        },
    });
}



function FnApprSuppItemLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_APPRSUPPLOAD";
    reqobj["ChkSuppItem"] = $$("ChkSuppItem").getValue();
    reqobj["ChkItemSupp"] = $$("ChkItemSupp").getValue();
    reqobj["hdnPartyId"] = $("#hdnPartyId").val();
    reqobj["hdnProd_Id"] = $("#hdnProd_Id").val();
    reqobj["hdnCurrDt"] = $("#hdnCurrentDt").val();
    reqobj["DEF_DATE_FORMAT"] = $("#hdnDefDateFormat").val();

   // reqobj["CHK_GSTIND"] = $("#hdnGstInd").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                debugger;
                rowDatad = JSON.parse(d);
                $$("grdMstApprSupp").clearAll();
                $$("grdMstApprSupp").parse(rowDatad.dtSupppLd);
                $$("grdMstApprSupp").refresh();
                var DataProd=rowDatad.dtSupppLd;
                for(i=0;i<DataProd.length;i++){

                    var SetUom=types.find(element => element.id===$.trim(DataProd[i].Prod_Uom));
                    if(SetUom==undefined || SetUom==[] || SetUom==''){
                        var Options = $$("grdMstApprSupp").getColumnConfig("Prod_Uom").collection;
                        Options.clearAll();
                        types.push({ id: $.trim(DataProd[i].Prod_Uom), value: $.trim(DataProd[i].Prod_Uom) });
                        Options.parse(types);
                    }
                }

                
            }
        },
    });
}

function fnSave() {
    debugger;
        var bvalid = fnValidation();
        if (bvalid == true) {
            debugger;
                var dataparam = {};
                var rowData = [];
                dataparam["REQTYPE"] = "GET_FNSAVEAPPRSUPP_ITEM";
                dataparam["txtSupplier"] = $$("txtSupplier").getValue();
                dataparam["txtProduct"] = $$("txtProduct").getValue();
                dataparam["ChkSuppItem"] = $.trim($$("ChkSuppItem").getValue());
                dataparam["ChkItemSupp"] = $.trim($$("ChkItemSupp").getValue());
                //dataparam["grdMstApprSupp"] = $$("grdMstApprSupp").serialize();

                var GridDtSet = $$("grdMstApprSupp").serialize();
                $.each(GridDtSet, function (key, sVal) {
                    $.each(sVal, function (key, value) {
                        if (value != null && value != undefined)
                        sVal[key] = value.toString();
                    });
                });
                dataparam["grdMstApprSupp"] =GridDtSet;


                dataparam["hdnPartyId"] = $("#hdnPartyId").val();
                dataparam["hdnProd_Id"] = $("#hdnProd_Id").val();
                dataparam["DEF_DATE_FORMAT"] = $("#hdnDefDateFormat").val();
                var DataVal = JSON.stringify(dataparam);
                DataVal = encodeURIComponent(DataVal);

                $.ajax({
                    async: true,
                    url: "/PurchaseCtrl/MPAPI_CALL",
                    type: 'POST',
                    data: "request=" + DataVal,
                    success: function (data) {
                        if (data != "") {
                            debugger;
                            rowData = JSON.parse(data);
                            if ($.trim(rowData) == "True") {
                                SuccessMsg("Updated Successfully");
                                fnRefresh();
                                $("#LoadDIv").hide();
                                return;
                            }

                            else {
                                AlertMessage("Operation failed");
                                fnRefresh();
                                $("#LoadDIv").hide();
                                return;
                            }
                        }
                    },
                });
            }
    }


function fnValidation() {
    debugger;
    if (($.trim($$("ChkSuppItem").getValue()) == "1")) {
        if (($.trim($$("txtSupplier").getValue()) == "")) {
            AlertMessage("Supplier can not be empty");
            return false;
        }
    }
    if (($.trim($$("ChkItemSupp").getValue()) == "1")) {
        if (($.trim($$("txtProduct").getValue()) == "")) {
            AlertMessage("Product can not be empty");
            return false;
        }
    }

    var data = $$("grdMstApprSupp").serialize();
    $$("grdMstApprSupp").refresh();

    if (data.length != 0) {
        debugger;

      
        for (var i = 0; i < data.length; i++) {
            if (($.trim($$("ChkSuppItem").getValue()) == "1")) {
                if ($.trim(data[i].PROD_NM1) == "") {
                    AlertMessage("Product cannot be empty");
                    return false;
                }
            }
            if (($.trim($$("ChkItemSupp").getValue()) == "1")) {
                if ($.trim(data[i].PARTY_NM) == "") {
                    AlertMessage("Supplier cannot be empty");
                    return false;
                }
            }
            var idate = $.trim(data[i].RT_FDT);
            idate = convert(idate);
            //if (data[i].ColSrchInd == "") {
            //        if (idate < $("#hdnCurrentDt").val()) {
            //            AlertMessage("Rate Valid From date can not be less than Current date");
            //            return false;
            //        }
            //}
           
            var toDate = $.trim(data[i].VAL_2DT);
            toDate = convert(toDate);
            var f1date = new Date(idate.split('/')[2], idate.split('/')[1] - 1, idate.split('/')[0]);
            var e1date = new Date(toDate.split('/')[2], toDate.split('/')[1] - 1, toDate.split('/')[0]);
          
            if (f1date > e1date) {
                if (toDate != "") {
                    AlertMessage('Rate valid Upto Date can not be less than Rate valid from date');
                    return false;
                }
            }

            if (data[i].ColSrchInd == "") {
                var curDate = $("#hdnCurrentDt").val();
                var ecurdate = new Date(curDate.split('/')[0], curDate.split('/')[1] - 1, curDate.split('/')[2]);
                if (f1date < ecurdate) {
                    AlertMessage("Rate Valid From date can not be less than Current date");
                    return false;
                }
            }

            //var idate = $.trim(data[i].RT_FDT);
            var Rate = $.trim(data[i].Basic_rate);
            if ((Rate == "")||(Rate=="0")||(Rate=="0.0000")) {
                AlertMessage("Rate Can not be empty");
                return false;
            }
            //idate = convert(idate);
            for ( var f = 0; f < data.length; f++) {
                var fdate = $.trim(data[f].RT_FDT);
                fdate = convert(fdate);
                if (i != f)
                {

                    if ($$("ChkSuppItem").getValue()=="1")
                        {
                        if ($.trim(data[f].Prod_Id) == $.trim(data[i].Prod_Id)) {
                            var efdate = new Date(fdate.split('/')[2], fdate.split('/')[1] - 1, fdate.split('/')[0]);
                            var etdate = new Date(idate.split('/')[2], idate.split('/')[1] - 1, idate.split('/')[0]);
                            if ($.trim(efdate) == $.trim(etdate)) {
                                AlertMessage("Rate Valid From Date is Duplicate");
                                return false;
                            }
                        }
                    }
                    if ($$("ChkItemSupp").getValue() == "1") {
                        if ($.trim(data[f].PARTY_ID) == $.trim(data[i].PARTY_ID)) {
                            var efdate = new Date(fdate.split('/')[2], fdate.split('/')[1] - 1, fdate.split('/')[0]);
                            var etdate = new Date(idate.split('/')[2], idate.split('/')[1] - 1, idate.split('/')[0]);
                            if ($.trim(efdate) == $.trim(etdate)) {
                                AlertMessage("Rate Valid From Date is Duplicate");
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    else {

        if ((data.length == null) || (data[0].PARTY_NM == "")||(data[0].Prod_Id == "")) {
            fnCallAddRow();
            AlertMessage("No Record Found");
            return false;
        }
    }

    return true;
}
        
function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}


function FnddlSubGroup() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_SUBGROUPLOAD";
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            rowDatad.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
            $$("ddlSubGroup").setValue("<-ALL->")
            $$("ddlSubGroup").define("options", rowDatad);
            $$("ddlSubGroup").refresh();
        },
    });
}

function FnddlGroup() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_GROUPLOAD";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            rowDatad.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
            $$("ddlGroup").setValue("<-ALL->");
            $$("ddlGroup").define("options", rowDatad);
            $$("ddlGroup").refresh();
        },
    });
}


function fnddlCurrency() {
   // var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "GET_FNDDLCURRENCYLOAD";

    var dtCurrency = [];
    var DataVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                
                rowData = JSON.parse(d);
                dtCurrency = rowData.TBLCURR;
            }
        },
    });
    return rowData.TBLCURR;
};


function fnddlUOMAlter() {
    debugger;
    var reqobj = {};
    var dtUomA = [];
    reqobj["REQTYPE"] = "GET_FNUOMALTER";
    reqobj["prodId"] = $("#hdnProd_Id").val();
    reqobj["prodUOM"] = $("#hdnProdUom").val();
    //reqobj["uoms"] = types;
    var UOMSTR = [];
    var DataVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
              //  Options.clearAll();
                rowData = JSON.parse(d);
                $$("grdMstApprSupp").clearAll();
                var Options = $$("grdMstApprSupp").getColumnConfig("Prod_Uom").collection;
                Options.clearAll();
                Options.parse(rowData);
                $$("grdMstApprSupp").parse(rowData);
                $$("grdMstApprSupp").refresh();
            }
           
        },
    });
};


function fnLoadProperty() {
    var dataProp = [];
    dataProp =  fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        //label: "Property",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                fnDefDateFormat();
            }
        }
    });
}

function fnPropertyLoad() {
    
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    //dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}


function fnDefDateFormat() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["COMPID"] = $("#hdnCompId").val();
    reqobj["REQTYPE"] = "GET_DEFDATEFORMAT";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $("#hdnDefDateFormat").val($.trim(rowDatad));
            if(rowDatad == "2")
                window.DEF_DT_FORMAT = "%m/%d/%Y";

        },
    });
    return rowDatad;
}

function fnChkGstInd() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["COMPID"] = $("#hdnCompId").val();
    reqobj["REQTYPE"] = "GET_FNGSTIND";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $("#hdnGstInd").val($.trim(rowDatad));
            
        },
    });
    return rowDatad;
}

function fnChkPrefSupp() {

    var rowDatad = [];
    var reqobj = {};
    reqobj["COMPID"] = $("#hdnCompId").val();
    reqobj["REQTYPE"] = "GET_PREFFSUPP";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            rowDatad = JSON.parse(d);
            $("#hdnPrefSupp").val($.trim(rowDatad));

        },
    });
    return rowDatad;
}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}

function fnRemoveClass(Mode) {

    if ($.trim(Mode) == "N") {
        $('#NEW').addClass("btnButton btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
        $("#DELETE").removeClass("btnButtonClick");
        $('#VIEW').removeClass("btnButtonClick");

    } else if ($.trim(Mode) == "O") {
        $('#OPEN').addClass("btnButton btnButtonClick");
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#VIEW").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
        $("#DELETE").removeClass("btnButtonClick");
    }
    else if ($.trim(Mode) == "V") {
        $('#VIEW').addClass("btnButton btnButtonClick");
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
        $("#DELETE").removeClass("btnButtonClick");

    }
    else if ($.trim(Mode) == "") {
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').addClass("btnButton btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#VIEW").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
        $("#DELETE").removeClass("btnButtonClick");
    }
}


function fnRemove() {
    debugger;
    //var bvalid = fnValidation();
    //if (bvalid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_FNREMOVESUPPITEM";
        dataparam["txtSupplier"] = $$("txtSupplier").getValue();
        dataparam["txtProduct"] = $$("txtProduct").getValue();
        dataparam["ChkSuppItem"] = $$("ChkSuppItem").getValue();
        dataparam["ChkItemSupp"] = $$("ChkItemSupp").getValue();
        dataparam["hdnPartyId"] = $("#hdnPartyId").val();
        dataparam["hdnProd_Id"] = $("#hdnProd_Id").val();

        var DataVal = JSON.stringify(dataparam);
        DataVal = encodeURIComponent(DataVal);

        $.ajax({
            async: true,
            url: "/PurchaseCtrl/MPAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (data) {
                if (data != "") {
                    rowData = JSON.parse(data);
                    if ($.trim(rowData) == "True") {
                        SuccessMsg("Deleted Successfully");
                        fnRefresh();
                        $("#LoadDIv").hide();
                        return;
                    }
                   
                    else {
                       
                        AlertMessage("No Record Found");
                        $("#LoadDIv").hide();
                        return;
                    }
                }
            },
        });
  //  }
}

function fnCallDelRow() {
    debugger;
    var SelRow = $$("grdMstApprSupp").getSelectedId(false);
    var data = $$("grdMstApprSupp").serialize();
    $$("grdMstApprSupp").editStop();
    if (SelRow == undefined || SelRow == null)  SelRow = $$("grdMstApprSupp").getLastId();
       
    {
        $$("grdMstApprSupp").remove(SelRow);
       
    }
    if(data.length=="1")
    {
        fnCallAddRow();
    }
}

function fnCurrentDt() {
    
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDATE";
    dataparam["DEF_DATE_FORMAT"] = $("#hdnDefDateFormat").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val($.trim(rowData[0]["CURDT1"]));
               
            }
        },
    });
}


function PageLoadFn() {
    debugger;
    webix.ui({
     //  container: "divPropbox",
        view: "richselect",
        maxWidth: 400,
        id: "ddlProperty",
        options: DDLVal.ddlProperty,
        value: $("#hdnCompId").val(),
        on: {
            onChange: function () {
                debugger;
                var reqobj = {};
                reqobj["COMPID"] = $$("ddlProperty").getValue();
                var dataparam = JSON.stringify(reqobj);
                $.ajax({
                    async: false,
                    url: "/MaterialCtrl/PeropertyChange",
                    type: 'POST',
                    data: "request=" + dataparam,
                    success: function (d) {
                        debugger;
                    },
                });

               
            }

        }
    });

}
    function fnresize() {
        $$("frmMstApproSuppItem").resize();
        $$("frmMstApproSuppItem").adjust();
    }




