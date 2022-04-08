var app = angular.module('GLTApp', ['webix']);
var ddlcurrency = [];
var Headers = [];
var ddlRefTy = "";
var searchicon = "<span class='webix_icon wxi-search'></span>";
var Delicon = "<span class='webix_icon wxi-trash'></span>";
function FormLoad()
{
    $("#LoadDIv").hide();
    var DefLoad = fnGlInterCompTransDefLoad();
    ddlcurrency = DefLoad.TBLCURRENCY;
    var FromProp = DefLoad.TBLFROMPROP;
    var ToProp = DefLoad.TBLTOPROP;
    fnGLtrnType = DefLoad.TBLTRNTY;
    Headers = DefLoad.TBLHEAD;
    webix.ui({
        id: "GlInterCompanyTrans",
        container: 'DivForm',
        view: 'form',      
        minWidth: 900,
        maxWidth: 5000,
        borderless: true,
        ready: function () {
            gridResizetr("1");
        },
        elements: [
            {
                rows: [
                  {
                      cols: [
                          {
                              rows:[
                                  {
                                      view: "combo",
                                      id: "ddlVchType",
                                      label: "Voucher Type",
                                      labelAlign: "left",
                                      labelWidth: 110,
                                      inputWidth: 280,
                                      width: 300,
                                      options: fnGLtrnType,
                                      required: true,
                                      on: {
                                          onChange: function (newval, oldval) {
                                              $("#hdnDefGlTrnTy").val(newval);
                                              fnLoadGLVchTyInd();
                                              fnRefreshGrid();
                                              fnPropRowadd("", "grdFromProp");
                                              fnPropRowadd("", "grdToProp");
                                            
                                          }
                                      }
                                  },
                              {
                                  view: "datepicker",
                                  id: "txtVchDt",
                                  required: true,
                                  disable: true,
                                  stringResult: true,
                                  label: "Voucher Dt",
                                  format: "%d/%m/%Y",
                                  value: $("#hdnCurrentDt").val(),
                                  labelAlign: "left",
                                  labelWidth: 110,
                                  inputWidth: 250,
                                  width: 300,
                                  on: {
                                      onChange: function (newval, oldval) {

                                      },
                                  }
                              },
                              ]

                             
                          },
                            {
                                view: "textarea",
                                id: "txtNarra",
                                stringResult: true,
                                label: "Voucher Narration",
                                labelAlign: "left",
                                labelWidth: 110,
                                inputWidth: 450,
                                minWidth: 450,
                                height: 50,                                     
                                attributes: { maxlength: 250 },
                            },
                      ]
                  },
                  {
                      cols: [
                           //{width:410},
                            {
                                cols: [
                                        

                                       {
                                           id: "ChkDebit",
                                           view: "checkbox",
                                           label: "Debit",
                                           labelAlign: "Left",
                                           value:1,
                                           width: 100, labelWidth: 40,
                                           on: {
                                               onChange: function (newVal, OldVal) {
                                                   if (newVal == 1) {
                                                       $$("ChkCredit").setValue("0");
                                                   }
                                                   else {
                                                       $$("ChkCredit").setValue("1");
                                                   }
                                                   fnRefreshGrid();
                                                   fnPropRowadd("", "grdFromProp");
                                                   fnPropRowadd("", "grdToProp");

                                               }
                                           }


                                       },
                                       {
                                           id: "ChkCredit",
                                           view: "checkbox",
                                           label: "Credit",
                                           labelAlign: "Left",
                                           width: 100, labelWidth: 40,
                                           on: {
                                               onChange: function (newVal, OldVal) {
                                                   if (newVal == 1) {
                                                       $$("ChkDebit").setValue("0");
                                                   }
                                                   else {
                                                       $$("ChkDebit").setValue("1");
                                                   }
                                                   fnRefreshGrid();
                                                   fnPropRowadd("", "grdFromProp");
                                                   fnPropRowadd("", "grdToProp");

                                               }
                                           }

                                       },
                                   
                                        
                                ]
                            },
                              {


                                  view: "button",
                                  type: "icon",
                                  icon: "wxi-trash",
                                  css: "webix_primary float-right",
                                  label: "",
                                  id: "TrnRowDelete",
                                  width: 30,
                                  click: function () {
                                    
                                      fnDeleteRowBillDetData("grdFromProp");
                                      fnDeleteRowAnaData("grdFromProp");
                                      $$("grdFromProp").editCancel();
                                      $$("grdFromProp").remove($$("grdFromProp").getSelectedId());
                                      $$("grdFromProp").refresh();
                                      $$("grdFromProp").refresh();
                                      var dsGlTrans = $$("grdFromProp").serialize();
                                     // fnMainGridTotal();
                                      if (dsGlTrans.length == 0) {
                                          fnPropRowadd('0',"grdFromProp");
                                      }
                                      if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                          //$("#hdnEditCur").val("1");
                                          //$$("TxtSalePurRate").setValue("");
                                          //$$("TxtFornAmt").setValue("");
                                          //$$("TxtSalePurRate").hide();
                                          //$$("TxtFornAmt").hide();
                                          //$$("BtnSalePur").hide();
                                          //$("#hdnEditCur").val("");
                                      }
                                  }
                              },


                            {
                                view: "button",
                                type: "icon",
                                css: "webix_primary float-right",
                                icon: "wxi-plus",
                                label: "",
                                id: "TrnRowAdd",
                                width: 30,
                                click: function () {
                                    if ($$("ddlVchType").getValue() == "") {
                                        AlertMessage("Voucher Type cannot be empty !");
                                        return false;
                                    }


                                    var itemval = $$("grdFromProp").getSelectedId();
                                    var LastId = $$("grdFromProp").getLastId();


                                    fnPropRowadd('1',"grdFromProp");
                                   
                                    if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                        //$("#hdnEditCur").val("1");
                                        //$$("TxtSalePurRate").setValue("");
                                        //$$("TxtFornAmt").setValue("");
                                        //$("#hdnEditCur").val("");

                                    }


                                }
                            }

                      ]
                  },
                    {
                        paddingY: 5,
                        view: "datatable",
                        id: "grdFromProp",
                        select: "row",
                        data: [],
                        editable: true,
                        navigation: true,
                        autoConfig: true,
                        css: "wrap",
                        scroll: "xy",
                        css: "webix_header_border",
                        scheme: {
                            $change: function (item) {
                               

                            },
                        },
                        columns: [
                              
                                { header: "From Property", id: "PropNm", width: 200 ,css: { 'text-align': 'left ! important' }, editor: "select",  collection: function (id) { return FromProp; } },
                                { header: "PropId", id: "PropId", hidden: true },
                                { header: "From Ledger", id: "AcNM", width: 200, css: { 'text-align': 'left ! important' }, },
                                  { header: "", id: "AccSel", width: 40, template: searchicon, css: { 'text-align': 'left ! important' }, },
                                { header: "LedgerId", id: "hdnAcId", hidden: true },
                                { header: "Accd", id: "ACCD", hidden: true },
                                 { header: "RowId", id: "RowId", hidden: true, },
                                {
                                    header: "Currency", id: "CurrId", hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1"?false:true, width: 80, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlcurrency; }
                                },
                                {
                                     header: "Amount", id: "Amt", width: 110, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },

                                     format: function (value) {
                                         return fnCurrFormat(value);
                                     },
                                     editParse: function (value) {
                                         return webix.Number.parse(value, webix.i18n);
                                     },
                                     editFormat: function (value) {
                                         return fnCurrFormat(value);
                                     },
                                },
                             
                                {
                                    header: "Narration", id: "Narr", width: 220, css: { 'text-align': 'left ! important' },
                                },

                                { header: "Doc No", id: "DocNo", width: 80, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                { header: "Doc Dt", id: "DocDt", width: 80, stringResult: true, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                { header: "", id: "AnaSel", width: 30, css: { 'text-align': 'left ! important' }, },
                               { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                               { header: "PsRate", id: "PsRate", hidden: true, },
                               { header: "FornAmt", id: "FornAmt", hidden: true, },
                               { header: "RateTy", id: "RateTy", hidden: true, },
                                 { header: "Aind", id: "ChkAind", hidden: true },
                                       { header: "Bind", id: "ChkBind", hidden: true },
                                       { header: "Cind", id: "ChkCind", hidden: true },
                                       { header: "Dind", id: "ChkDind", hidden: true },
                                       { header: "Eind", id: "ChkEind", hidden: true },
                                       { header: "Find", id: "ChkFind", hidden: true },
                                        { header: "Lind", id: "ChkLind", hidden: true },
                                       { header: "Mind", id: "ChkMind", hidden: true },
                                       { header: "Nind", id: "ChkNind", hidden: true },
                                       { header: "Oind", id: "ChkOind", hidden: true },
                                        { header: "AnaAppl", id: "AnaAppl", hidden: true },
                                             { header: "GridNm", id: "GridNm", hidden: true },
                            
                            
                           

                        ],
                        on: {
                           
                            'onItemClick': function (id, e, node, trg) {
                                var getval = this.getItem(id.row);
                                if (id.column == 'AccSel') {
                                    if (getval.PropNm == "") {
                                        AlertMessage("Property cannot be empty !");
                                        $$("grdToProp").refresh();
                                        return false;
                                    }
                                }
                                if (id.column == "Amt" || id.column == "DocNo" || id.column == "DocDt" || id.column == "DocDt" || id.column == "Narr" ) {
                                    if (getval.hdnAcId == "" || getval.hdnAcId ==undefined) {
                                        AlertMessage("Ledger cannot be empty !");
                                        $$("grdFromProp").refresh();
                                        return false;
                                    }
                                }

                                if (id.column == 'AccSel') {
                                    debugger;
                                    fnCallPopupAccontSrch("grdFromProp");
                                    fnLoadAccountSrch("grdFromProp","");
                                    $$("PopupAccNmSrch").show();

                                }
                                else if (id.column == "Narr") {
                                    fnCallNarrPopup("grdFromProp");
                                    var itemval = $$("grdFromProp").getSelectedItem();
                                    $$("txtLineNarr").setValue($.trim(itemval.Narr));
                                    $$("NarrPopup").show();
                                    debugger;
                                    webix.UIManager.setFocus($$("txtLineNarr"));

                                }
                                else if (id.column == "AnaSel" && getval.AnaAppl == "1" && $.trim(getval.hdnAcId) )
                                {
                                    fnPopupAnalysis("grdFromProp", getval.PropNm);
                                    CallAnalysisPopup("grdFromProp");
                                    var A_IND = $.trim(getval.ChkAind);
                                    var B_IND = $.trim(getval.ChkBind);
                                    var C_IND = $.trim(getval.ChkCind);
                                    var D_IND = $.trim(getval.ChkDind);
                                    var E_IND = $.trim(getval.ChkEind);
                                    var F_IND = $.trim(getval.ChkFind);
                                    var L_IND = $.trim(getval.ChkLind);
                                    var M_IND = $.trim(getval.ChkMind);
                                    var N_IND = $.trim(getval.ChkNind);
                                    var O_IND = $.trim(getval.ChkOind);
                                    fnCallAnaysis($.trim(getval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND, "grdFromProp");
                                }
                            },
                            'onLiveEdit': function (state, editor) {
                                debugger;
                                var columnId = editor.column;
                                var Row = editor.row;
                                var SelRow = this.getItem(Row);


                                if (columnId == "Amt") {
                                    var value = state.value;
                                    value = parseFloat(state.value);
                                    if (value < 0) value = (value * -1);
                                    if (value > 99999999.99) {
                                        SelRow.Credit = state.old;
                                        editor.setValue(state.old);
                                        this.editCancel();
                                        this.editCell(Row, "Amt", true, true)
                                        editor = this.getEditor();
                                        editor.getInputNode().selectionStart = state.old.length;
                                    }
                                    this.updateItem(Row, SelRow);
                                    this.refresh(Row);
                                }

                            },
                            'onKeyPress': function (e, id) {
                                var itemval = $$("grdFromProp").getSelectedItem();
                                var BILL_DETAIL_IND = $.trim(itemval.BILL_DETAIL_IND);
                                $("#hdnBillDetInd").val(BILL_DETAIL_IND);
                                var charCode = (e.which) ? e.which : event.keyCode;
                                var LastId = $$("grdFromProp").getLastId();
                                if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                    return true
                                }
                                if ((charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) || charCode == 13) {
                                   
                                    if ((e == 66 || e == 13) && $("#hdnBillDetInd").val() == "1") {
                                       
                                        if ($$("ChkDebit").getValue() == "1")
                                        {
                                            Debit = (itemval.Amt == "" ? 0 : parseFloat(itemval.Amt));
                                            Credit = 0;
                                        }
                                        else
                                        {
                                            Credit = (itemval.Amt == "" ? 0 : parseFloat(itemval.Amt));
                                            Debit = 0;
                                        }

                                       
                                        
                                        if (Debit != 0 || Credit != 0) {
                                            $$("grdFromProp").refresh();
                                            fnCallBillDetails(ddlRefTy, itemval.CurrId, itemval.FornAmt, itemval.PsRate,"grdFromProp","");
                                            return false;
                                        }
                                        else
                                            return false;
                                    }
                                    else {
                                        if (e == 40 && LastId == itemval.id) {
                                            fnPropRowadd("1","grdFromProp");
                                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                            //    $("#hdnEditCur").val("1");
                                            //    $$("TxtSalePurRate").setValue("");
                                            //    $$("TxtFornAmt").setValue("");
                                            //    $("#hdnEditCur").val("");
                                            }

                                        }

                                        return false;
                                    }
                                }
                                else {
                                    return true;
                                }
                            },
                             'onAfterEditStart': function (id) {
                                var getColumn = id.column;
                                SelectedColumn = getColumn;
                                if (getColumn == "Amt" || getColumn == "Debit") {
                                    this.getEditor().getInputNode().setAttribute("maxlength", 14);
                                    this.getEditor().getInputNode().style.textAlign = "right";
                                }
      
                                if (getColumn == "DocNo") {
                                    this.getEditor().getInputNode().setAttribute("maxlength", 40);
                                }
                                      
                             },
                             'onEditorChange': function (id, value, row) {
                                 debugger;
                                 var getval = this.getItem(id.row);

                                 if (id.column == 'CurrId' && $("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                     getval.PsRate = "";
                                     getval.FornAmt = "";
                                     getval.RateTy = "";
                                     getval.Amt = "";
                                     fnDeleteRowBillDetData("grdFromProp");
                                     fnDeleteRowAnaData("grdFromProp");
                                    
                                 }
                             }
                        }
                    },
                    {
                        cols:[
                          {


                              view: "button",
                              type: "icon",
                              icon: "wxi-trash",
                              css: "webix_primary float-right",
                              label: "",
                              id: "TrnRowDelToProp",
                              width: 30,
                              click: function () {
                                 
                                  fnDeleteRowBillDetData("grdToProp");
                                  fnDeleteRowAnaData("grdToProp");
                                  $$("grdToProp").editCancel();
                                  $$("grdToProp").remove($$("grdToProp").getSelectedId());
                                  $$("grdToProp").refresh();
                                  $$("grdToProp").refresh();
                                  var dsGlTrans = $$("grdToProp").serialize();
                                 // fnMainGridTotal();
                                  if (dsGlTrans.length == 0) {
                                      fnPropRowadd('0',"grdToProp");
                                  }
                                  if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                      //$("#hdnEditCur").val("1");
                                      //$$("TxtSalePurRate").setValue("");
                                      //$$("TxtFornAmt").setValue("");
                                      //$$("TxtSalePurRate").hide();
                                      //$$("TxtFornAmt").hide();
                                      //$$("BtnSalePur").hide();
                                      //$("#hdnEditCur").val("");
                                  }
                              }
                          },


                            {
                                view: "button",
                                type: "icon",
                                css: "webix_primary float-right",
                                icon: "wxi-plus",
                                label: "",
                                id: "TrnRowAddToProp",
                                width: 30,
                                click: function () {
                                    if ($$("ddlVchType").getValue() == "") {
                                        AlertMessage("Voucher Type cannot be empty !");
                                        return false;
                                    }


                                    var itemval = $$("grdToProp").getSelectedId();
                                    var LastId = $$("grdToProp").getLastId();


                                    fnPropRowadd('1', "grdToProp");
                                  
                                    if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                        //$("#hdnEditCur").val("1");
                                        //$$("TxtSalePurRate").setValue("");
                                        //$$("TxtFornAmt").setValue("");
                                        //$("#hdnEditCur").val("");

                                    }


                                }
                            }

                        ]

                    },
                      
                                    
                    {
                        paddingY: 5,
                        view: "datatable",
                        id: "grdToProp",
                        select: "row",
                        data: [],
                        editable: true,
                        navigation: true,
                        autoConfig: true,
                        css: "wrap",
                        scroll: "xy",
                        css: "webix_header_border",
                        scheme: {
                            $change: function (item) {


                            },
                        },
                        columns: [

                                { header: "To Property", id: "PropNm", width: 200, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ToProp; } },
                                   { header: "RowId", id: "RowId", hidden: true, },
                                { header: "PropId", id: "PropId", hidden: true },
                                { header: "To Ledger", id: "AcNM", width: 200, css: { 'text-align': 'left ! important' }, },
                                    { header: "", id: "AccSel", template: searchicon, width: 40, css: { 'text-align': 'left ! important' }, },
                                { header: "LedgerId", id: "hdnAcId", hidden: true },
                                 { header: "Accd", id: "ACCD", hidden: true },
                                {
                                    header: "Currency", id: "CurrId", hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true, width: 80, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlcurrency; }
                                },
                               
                                  {
                                      header: "Amount", id: "Amt", width: 110, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                   

                                      format: function (value) {
                                          return fnCurrFormat(value);
                                      },
                                      editParse: function (value) {
                                          return webix.Number.parse(value, webix.i18n);
                                      },
                                      editFormat: function (value) {
                                          return fnCurrFormat(value);
                                      },

                                  },

                                {
                                    header: "Narration", id: "Narr", width: 220, css: { 'text-align': 'left ! important' },
                                },

                                { header: "Doc No", id: "DocNo", width: 80, editor: 'text', liveEdit: true,  css: { 'text-align': 'left ! important' } },
                                { header: "Doc Dt", id: "DocDt",  width: 80, stringResult: true, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                { header: "", id: "AnaSel", width: 30, css: { 'text-align': 'left ! important' }, },
                                { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                                { header: "PsRate", id: "PsRate", hidden: true, },
                                { header: "FornAmt", id: "FornAmt", hidden: true, },
                                { header: "RateTy", id: "RateTy", hidden: true, },
                                { header: "Aind", id: "ChkAind", hidden: true },
                                { header: "Bind", id: "ChkBind", hidden: true },
                                { header: "Cind", id: "ChkCind", hidden: true },
                                { header: "Dind", id: "ChkDind", hidden: true },
                                { header: "Eind", id: "ChkEind", hidden: true },
                                { header: "Find", id: "ChkFind", hidden: true },
                                { header: "Lind", id: "ChkLind", hidden: true },
                                { header: "Mind", id: "ChkMind", hidden: true },
                                { header: "Nind", id: "ChkNind", hidden: true },
                                { header: "Oind", id: "ChkOind", hidden: true },
                                { header: "AnaAppl", id: "AnaAppl", hidden: true },
                                { header: "GridNm", id: "GridNm", hidden: true },

                        ],
                        on: {
                            'onItemClick': function (id, e, node, trg) {
                                this.refresh();
                                var getval = this.getItem(id.row);
                               
                                if (id.column == 'AccSel') {
                                    if (getval.PropNm == "") {
                                        AlertMessage("Property cannot be empty !");
                                        $$("grdToProp").refresh();
                                        return false;
                                    }
                                }

                                if (id.column == "Amt" || id.column == "DocNo" || id.column == "DocDt" || id.column == "DocDt" || id.column == "Narr" ) {
                                    if (getval.hdnAcId == "" || getval.hdnAcId == undefined ) {
                                        AlertMessage("Ledger cannot be empty !");
                                        $$("grdToProp").refresh();
                                        return false;
                                    }
                                }
                                if (id.column == 'AccSel') {

                                    debugger;
                                    fnCallPopupAccontSrch("grdToProp");
                                    fnLoadAccountSrch("grdToProp", getval.PropNm);
                                    $$("PopupAccNmSrch").show();

                                }
                                else if (id.column == "Narr") {
                                    fnCallNarrPopup("grdToProp");
                                    var itemval = $$("grdToProp").getSelectedItem();
                                    $$("txtLineNarr").setValue($.trim(itemval.Narr));
                                    $$("NarrPopup").show();
                                    debugger;
                                    webix.UIManager.setFocus($$("txtLineNarr"));
                                }
                                else if (id.column == "AnaSel" && getval.AnaAppl=="1" && $.trim(getval.hdnAcId)!="")
                                {
                                    fnPopupAnalysis("grdToProp", getval.PropNm);
                                    CallAnalysisPopup("grdToProp");
                                    var A_IND = $.trim(getval.ChkAind);
                                    var B_IND = $.trim(getval.ChkBind);
                                    var C_IND = $.trim(getval.ChkCind);
                                    var D_IND = $.trim(getval.ChkDind);
                                    var E_IND = $.trim(getval.ChkEind);
                                    var F_IND = $.trim(getval.ChkFind);
                                    var L_IND = $.trim(getval.ChkLind);
                                    var M_IND = $.trim(getval.ChkMind);
                                    var N_IND = $.trim(getval.ChkNind);
                                    var O_IND = $.trim(getval.ChkOind);                                 
                                    fnCallAnaysis($.trim(getval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND,"grdToProp");

                                }
                                   
                             
                            },
                            'onLiveEdit': function (state, editor) {
                                //debugger;
                                var columnId = editor.column;
                                var Row = editor.row;
                                var SelRow = this.getItem(Row);


                                if (columnId == "Amt") {
                                    var value = state.value;
                                    value = parseFloat(state.value);
                                    if (value < 0) value = (value * -1);
                                    if (value > 99999999.99) {
                                        SelRow.Credit = state.old;
                                        editor.setValue(state.old);
                                        this.editCancel();
                                        this.editCell(Row, "Amt", true, true)
                                        editor = this.getEditor();
                                        editor.getInputNode().selectionStart = state.old.length;
                                    }
                                    this.updateItem(Row, SelRow);
                                    this.refresh(Row);
                                }
                               
                            },
                            'onKeyPress': function (e, id) {
                                var itemval = $$("grdToProp").getSelectedItem();
                                var BILL_DETAIL_IND = $.trim(itemval.BILL_DETAIL_IND);
                                $("#hdnBillDetInd").val(BILL_DETAIL_IND);
                                var charCode = (e.which) ? e.which : event.keyCode;
                                var LastId = $$("grdToProp").getLastId();
                                if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                    return true
                                }
                                if ((charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) || charCode == 13) {
                                    if ((e == 66 || e == 13) && $("#hdnBillDetInd").val() == "1") {
                                       
                                        var Debit = (itemval.Debit == "" ? 0 : parseFloat(itemval.Debit));

                                        var Credit = (itemval.Credit == "" ? 0 : parseFloat(itemval.Credit));

                                        if (Debit != 0 || Credit != 0) {
                                            $$("grdFromProp").refresh();
                                            fnCallBillDetails(ddlRefTy, itemval.CurrId, itemval.FornAmt, itemval.PsRate, "grdToProp",itemval.PropNm);
                                            return false;
                                        }
                                        else
                                            return false;
                                    }
                                    else {
                                        if (e == 40 && LastId == itemval.id) {
                                            fnPropRowadd("1","grdToProp");
                                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                                //    $("#hdnEditCur").val("1");
                                                //    $$("TxtSalePurRate").setValue("");
                                                //    $$("TxtFornAmt").setValue("");
                                                //    $("#hdnEditCur").val("");
                                            }



                                        }

                                        return false;
                                    }
                                }
                                else {
                                    return true;
                                }
                            },
                            'onAfterEditStart': function (id) {
                            var getColumn = id.column;
                            SelectedColumn = getColumn;
                            if (getColumn == "Amt" || getColumn == "Debit") {
                                this.getEditor().getInputNode().setAttribute("maxlength", 14);
                                this.getEditor().getInputNode().style.textAlign = "right";
                            }
      
                            if (getColumn == "DocNo") {
                                this.getEditor().getInputNode().setAttribute("maxlength", 40);
                            }
                                      
                            },
                            'onEditorChange': function (id, value, row) {
                                debugger;
                                var getval = this.getItem(id.row);

                                if (id.column == 'CurrId' && $("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                    getval.PsRate = "";
                                    getval.FornAmt = "";
                                    getval.RateTy = "";
                                    getval.Amt = "";
                                    fnDeleteRowBillDetData("grdToProp");
                                    fnDeleteRowAnaData("grdToProp");

                                }
                                if (id.column == 'PropNm') getval.PropNm = value;

                                $$("grdToProp").updateItem(row, getval);
                                $$("grdToProp").refresh();
                            }

                        }
                    },
                                       {
                                           view: "datatable",
                                           id: "grdGLTrnData",
                                           select: "row",
                                           data: [],
                                           scroll: true,
                                           hidden: true,
                                           columns: [
                                                 { header: "RowId", id: "RowId", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "D/C", id: "Drcr", width: 50, css: { 'text-align': 'left ! important' } },
                                                  { header: "ACCD", id: "ACCD", width: 70, css: { 'text-align': 'left ! important' } },
                                                  { header: "hdnAcId", id: "hdnAcId", width: 120, css: { 'text-align': 'left ! important' } },
                                                  { header: "AcNM", id: "AcNM", width: 150, css: { 'text-align': 'left ! important' } },
                                                  { header: "CurrId", id: "CurrId", width: 60, css: { 'text-align': 'left ! important' } },
                                                  { header: "hdnCurNm", id: "hdnCurNm", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "SlNo", id: "SlNo", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "FCurBal", id: "FCurBal", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "Debit", id: "Debit", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "Credit", id: "Credit", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "Narr", id: "Narr", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "DocNo", id: "DocNo", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "Doc Dt", id: "DocDt", width: 100, css: { 'text-align': 'left ! important' } },
                                                  { header: "ConvRate", id: "ConvRate", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "FormAmt", id: "FormAmt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "RateTy", id: "RateTy", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "RefTyId", id: "RefTyId", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "RefTyNm", id: "RefTyNm", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "RefNm", id: "RefNm", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "DueDt", id: "DueDt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "BillDt", id: "BillDt", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "DrAmt", id: "DrAmt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "CrAmt", id: "CrAmt", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "DETREF", id: "DETREF", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "DATREF", id: "DATREF", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "SNo", id: "BILLREFSNO", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "BD", id: "BILLREFBDT", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "VN", id: "BILLREFVNO", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "ClNo", id: "billclno", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "ClDt", id: "billcldt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "UpDt", id: "billudt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "NewRefUpDt", id: "Nbilludt", width: 90, css: { 'text-align': 'left ! important' } },

                                                  { header: "CurGainL", id: "Gloss", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "OFornBAmt", id: "Fornbase", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "FBillAmt", id: "FornBill", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "BillConvrt", id: "ConvrtBill", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "MfronAmt", id: "EFornamt", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "tds", id: "btds", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "Reftds", id: "btdsref", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "SlId", id: "SlId", width: 90, css: { 'text-align': 'left ! important' } },
                                                  { header: "CBy", id: "CBy", hidden: true },
                                                  { header: "CDt", id: "CDt", hidden: true },
                                                  { header: "AdjBy", id: "AdjBy", hidden: true },
                                                  { header: "AdjDt", id: "AdjDt", hidden: true },
                                                  { header: "GridNm", id: "GridNm", hidden: true },
                                                  

                                           ],
                                           on: {
                                           }
                                       },
                                                          {
                                                              view: "datatable",
                                                              id: "grdGlAnalyData",
                                                              select: "row",
                                                              data: [],
                                                              editable: true,
                                                              hidden: true,
                                                              columns: [
                                                                      { header: "AnalID1", id: "AnalID1", hidden: true },
                                                                      { header: "Analysis 1", id: "AnalNM1", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID1", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID2", id: "AnalID2", hidden: true },
                                                                      { header: "Analysis 2", id: "AnalNM2", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID2", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID3", id: "AnalID3", hidden: true },
                                                                      { header: "Analysis 3", id: "AnalNM3", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID3", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID4", id: "AnalID4", hidden: true },
                                                                      { header: "Analysis 4", id: "AnalNM4", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID4", width: 40, template: searchicon, hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID5", id: "AnalID5", hidden: true },
                                                                      { header: "Analysis 5", id: "AnalNM5", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID5", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID6", id: "AnalID6", hidden: true },
                                                                      { header: "Analysis 6", id: "AnalNM6", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID6", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID7", id: "AnalID7", hidden: true },
                                                                      { header: "Analysis 7", id: "AnalNM7", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID7", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID8", id: "AnalID8", hidden: true },
                                                                      { header: "Analysis 8", id: "AnalNM8", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID8", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID9", id: "AnalID9", hidden: true },
                                                                      { header: "Analysis 9", id: "AnalNM9", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID9", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                                                      { header: "AnalID10", id: "AnalID10", hidden: true },
                                                                      { header: "Analysis 10", id: "AnalNM10", width: 140, hidden: true, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnAnalID10", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                                      {
                                                                          header: "Amount", id: "Amount", width: 100, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                                                      },
                                                                      { header: "RowId", id: "RowId", hidden: true, },
                                                                      { header: "hdnAcId", id: "hdnAcId", hidden: true, },
                                                                         { header: "GridNm", id: "GridNm", hidden: true },
                                                              ],
                                                              on: {
                                                              }
                                                          },

                ]
                          
                

            }]
    });
}
webix.event(window, "resize", function () {
    gridResizetr("1");
})
function gridResizetr(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("GlInterCompanyTrans").define("width", vWidth);
    $$("GlInterCompanyTrans").resize();


    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    var vWidth1 = window.innerWidth
                                  || document.documentElement.clientWidth
                                  || document.body.clientWidth;
   

    $$("GlInterCompanyTrans").define("height", vheight - 50);
    $$("GlInterCompanyTrans").resize();

    
    var offsetTop = $$("grdFromProp").getNode().offsetTop;

    $$("grdFromProp").define("height", ((vheight - offsetTop - 325)));
    $$("grdFromProp").resize();


    $$("grdToProp").define("height", ((vheight - offsetTop - 325)));
    $$("grdToProp").resize();

    $$("GlInterCompanyTrans").resize();
}
function fnDeleteRowBillDetData(GridNm) {
    debugger;
    var DetSelRow = $$(GridNm).getSelectedItem();
    var CurrSelRowId = DetSelRow.RowId;
    var grdTranData = $$("grdGLTrnData").serialize();
    var DtFilter = grdTranData.filter(function (grdTranData) {
        return grdTranData.RowId == CurrSelRowId && grdTranData.GridNm==GridNm ;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            if (DtFilter[k].hdnAcId != "") {
                $$("grdGLTrnData").editCancel();
                $$("grdGLTrnData").remove(DtFilter[k].id);
                $$("grdGLTrnData").refresh();
            }
        }
    }
}
function fnDeleteRowAnaData(GridNm) {
    debugger;
    var DetSelRow = $$(GridNm).getSelectedItem();
    var CurrSelRowId = DetSelRow.RowId;
    var grdGlAnalyData = $$("grdGlAnalyData").serialize();
    var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
        return grdGlAnalyData.RowId == CurrSelRowId && grdGlAnalyData.GridNm == GridNm;;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            if (DtFilter[k].hdnAcId != "") {
                $$("grdGlAnalyData").editCancel();
                $$("grdGlAnalyData").remove(DtFilter[k].id);
                $$("grdGlAnalyData").refresh();
            }
        }
    }
}
function fnCallAnaysis(AC_ID, A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND,GridNm) {
    var getval = $$(GridNm).getSelectedItem();
    var id = $$("grdGlAnaly").getFirstId();
    var getval1 = $$("grdGlAnaly").getItem(id);
    var Amt = "";
    if (parseFloat(getval.Amt) > 0) Amt = getval.Amt == "" ? "0" : parseFloat(getval.Amt);
   
    $$("grdGlAnaly").refresh();
   // $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(Amt).toFixed(2);
   // $$("grdGlAnaly").refreshColumns();

    var addrow = {
        Amount: Amt,
        GridNm: GridNm
    };

    $$("grdGlAnaly").clearAll();
    $$("grdGlAnaly").parse(addrow);
    $$("grdGlAnaly").refresh();



    var cnt = 0;

    //   debugger;

    if (A_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM1");
        $$("grdGlAnaly").showColumn("btnAnalID1");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM1");
        $$("grdGlAnaly").hideColumn("btnAnalID1");
    }

    if (B_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM2");
        $$("grdGlAnaly").showColumn("btnAnalID2");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM2");
        $$("grdGlAnaly").hideColumn("btnAnalID2");
    }

    if (C_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM3");
        $$("grdGlAnaly").showColumn("btnAnalID3");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM3");
        $$("grdGlAnaly").hideColumn("btnAnalID3");
    }

    if (D_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM4");
        $$("grdGlAnaly").showColumn("btnAnalID4");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM4");
        $$("grdGlAnaly").hideColumn("btnAnalID4");
    }

    if (E_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM5");
        $$("grdGlAnaly").showColumn("btnAnalID5");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM5");
        $$("grdGlAnaly").hideColumn("btnAnalID5");
    }

    if (F_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM6");
        $$("grdGlAnaly").showColumn("btnAnalID6");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM6");
        $$("grdGlAnaly").hideColumn("btnAnalID6");
    }

    if (L_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM7");
        $$("grdGlAnaly").showColumn("btnAnalID7");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM7");
        $$("grdGlAnaly").hideColumn("btnAnalID7");
    }

    if (M_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM8");
        $$("grdGlAnaly").showColumn("btnAnalID8");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM8");
        $$("grdGlAnaly").hideColumn("btnAnalID8");
    }

    if (N_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM9");
        $$("grdGlAnaly").showColumn("btnAnalID9");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM9");
        $$("grdGlAnaly").hideColumn("btnAnalID9");
    }

    if (O_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM10");
        $$("grdGlAnaly").showColumn("btnAnalID10");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM10");
        $$("grdGlAnaly").hideColumn("btnAnalID10");
    }

    if (parseInt(cnt) != 0) {
        fnCallAnalyData(GridNm);
        $$("grdGlAnaly").show();
        $$("grdGlAnaly").define("width", (parseInt(cnt) * 340));
        $$("grdGlAnaly").resize();



        $$("grdGlAnaly").refresh();

    }
    else {
        $$("grdGlAnaly").hide();
        //  $$("HidLblAnaly").show();
    }
}
function fnCallAnalyData(GridNm) {
    debugger;
    var itemval = $$(GridNm).getSelectedItem();
    var dsGlAnalyData = $$("grdGlAnalyData").serialize();

    if (dsGlAnalyData.length == 0) {

    }
    else {

        var CurrData = dsGlAnalyData.filter(function (dsGlAnalyData) {
            return dsGlAnalyData.RowId == $.trim(itemval.RowId) && dsGlAnalyData.GridNm == $.trim(itemval.GridNm);
        });

        if (CurrData.length == 0) {

        }
        else {
            $$("grdGlAnaly").clearAll();
            $$("grdGlAnaly").parse(CurrData);
            $$("grdGlAnaly").refresh();
        }
    }
}
function fnCallNarrPopup(GridNm) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "NarrPopup",
        head: "Narration",
        position: "center",
        minWidth: 750,
        maxWidth: 750,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 750,
            maxWidth: 750,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "txtLineNarr",
                                    stringResult: true,
                                    label: "Line Narration",
                                    labelAlign: "Right",
                                    labelWidth: 90,
                                    inputWidth: 700,
                                    width: 700,
                                    attributes: { maxlength: 90 },
                                    on: {
                                        'onKeyPress': function (e, id) {
                                            debugger;
                                            var charCode = (e.which) ? e.which : event.keyCode;
                                            if (charCode == 13) webix.UIManager.setFocus($$("btnNarrrOk"));
                                        }
                                    }

                                },

                            ]
                        },


                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 900,
                             rows: [

                                 {

                                     cols: [
                                         {
                                             width: 630,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Ok',
                                             id: "btnNarrrOk",
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     if ($.trim(GridNm) == "grdFromProp")
                                                     {
                                                         var itemval = $$("grdFromProp").getSelectedItem();
                                                         itemval.Narr = $.trim($$("txtLineNarr").getValue()).replace(/&/g, '');
                                                         $$("grdFromProp").refresh();
                                                     }
                                                     else
                                                     {
                                                         var itemval = $$("grdToProp").getSelectedItem();
                                                         itemval.Narr = $.trim($$("txtLineNarr").getValue()).replace(/&/g, '');
                                                         $$("grdToProp").refresh();
                                                     }
                                                   
                                                     $$('NarrPopup').hide();
                                                 }
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
    })


    debugger;


}
function fnGlInterCompTransDefLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLINTERCOMPTRANSDEFLOAD";
    dataparam["PROGNAME"] = "GET_GLINTERCOMPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PageMenu"] = $("#hdnGLTranPageMenu").val();
    

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
             
             //   $("#hdnMULTI_CURRENCY_IND").val(rowData.TBLGLCONT[0].MULTI_CURRENCY_IND);
                $("#CURRENCY_FORMAT").val(rowData.TBLMSTCOMP[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(rowData.TBLMSTCOMP[0].CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(rowData.TBLMSTCOMP[0].VAL_DECIM_LIMIT);
                $("#hdnCurrentDt").val(rowData.TBLACCDT[0].CURDT);
                $("#hdnBaseCurrId").val($.trim(rowData.TBLMSTCOMP[0].BASE_CURRENCY_ID));
                $("#hdnCONTROL_AC_ID").val($.trim(rowData.TBLGLCONT[0].CONTROL_AC_ID));

            }
        },
    });
    return rowData;
}
function fnLoadGLVchTyInd() {
    debugger;
   
   
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLVCHTYIND";
    dataparam["PROGNAME"] = "GET_GLINTERCOMPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                ddlRefTy = rowData.TBLBREFLOAD;
            }
        },
    });
}
function fnCallPopupAccontSrch(GridNm) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "PopupAccNmSrch",
        head: "Account Search",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 350,
            maxWidth: 350,

            elements: [
                {
                    view: "datatable",
                    id: "grdAccount",
                    select: "row",
                    data: [],
                    height: 460,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: ["AC_CD", { content: "textFilter" }], id: "AC_CD", width: 100, css: { 'text-align': 'center ! important' }, hidden: ($("#hdnAcCdInd").val() == "1" ? false : true) },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 310, css: { 'text-align': 'left ! important' } },
                            { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                             { header: "A_IND", id: "A_IND", hidden: true },
                            { header: "B_IND", id: "B_IND", hidden: true },
                            { header: "C_IND", id: "C_IND", hidden: true },
                            { header: "D_IND", id: "D_IND", hidden: true },
                            { header: "E_IND", id: "E_IND", hidden: true },
                            { header: "F_IND", id: "F_IND", hidden: true },
                            { header: "L_IND", id: "L_IND", hidden: true },
                            { header: "M_IND", id: "M_IND", hidden: true },
                            { header: "N_IND", id: "N_IND", hidden: true },
                            { header: "O_IND", id: "O_IND", hidden: true },
                           

                    ],
                    ready: function () {
                        this.getFilter("AC_ALT_NM").focus();
                        $$("grdAccount").select($$("grdAccount").getFirstId());
                        webix.UIManager.setFocus($$("grdAccount"));


                    },
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);
                            var A_IND = $.trim(selectedRows[0].A_IND);
                            var B_IND = $.trim(selectedRows[0].B_IND);
                            var C_IND = $.trim(selectedRows[0].C_IND);
                            var D_IND = $.trim(selectedRows[0].D_IND);
                            var E_IND = $.trim(selectedRows[0].E_IND);
                            var F_IND = $.trim(selectedRows[0].F_IND);
                            var L_IND = $.trim(selectedRows[0].L_IND);
                            var M_IND = $.trim(selectedRows[0].M_IND);
                            var N_IND = $.trim(selectedRows[0].N_IND);
                            var O_IND = $.trim(selectedRows[0].O_IND);

                            var CurRows = $$(GridNm).getSelectedItem();
                            var AnaAppl = "";
                            CurRows.AcNM = $.trim(selectedRows[0].AC_ALT_NM).replace(/&/g, '');
                            CurRows.hdnAcId = $.trim(selectedRows[0].AC_ID);
                            CurRows.ACCD = $.trim(selectedRows[0].AC_CD);
                            CurRows.BILL_DETAIL_IND = $.trim(selectedRows[0].BILL_DETAIL_IND);
                            if (A_IND == "1" || B_IND == "1" || C_IND == "1" || D_IND == "1" || E_IND == "1" || F_IND == "1" || L_IND == "1" || M_IND == "1" || N_IND == "1" || O_IND == "1") {
                                AnaAppl = "1";
                            }
                            CurRows.AnaAppl = AnaAppl;
                            CurRows.ChkAind = A_IND;
                            CurRows.ChkBind = B_IND;
                            CurRows.ChkCind = C_IND;
                            CurRows.ChkDind = D_IND;
                            CurRows.ChkEind = E_IND;
                            CurRows.ChkFind = F_IND;
                            CurRows.ChkLind = L_IND;
                            CurRows.ChkMind = M_IND;
                            CurRows.ChkNind = N_IND;
                            CurRows.ChkOind = O_IND;
                            $$(GridNm).refresh();

                            $$('PopupAccNmSrch').hide();
                        },
                        'onKeyPress': function (code, e) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var rowid = selRow.id;
                            var charCode = e.which || e.keyCode;
                            if (charCode == '13') {
                                var valid = this.getSelectedId(true);
                                var id = { row: valid[0].row };
                                this.callEvent("onItemDblClick", [id]);
                            }

                        },




                        'onBeforeFilter': function () {
                            this.select(this.getFirstId());
                            webix.UIManager.setFocus(this);
                            this.refresh();
                        },
                        'onAfterFilter': function () {
                            //debugger;
                            this.select(this.getFirstId());
                            webix.UIManager.setFocus(this);
                            this.refresh();
                        }


                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 350,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAccNmSrch').hide();
                                                 }
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


}
function fnLoadAccountSrch(GridNm,ToPropId) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLACCOUNTSRCH";
    dataparam["PROGNAME"] = "GET_GLINTERCOMPTRANS";
    if (GridNm == "grdToProp") dataparam["COMPID"] = "~" + ToPropId ; else dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
   
  

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdAccount").clearAll();
                $$("grdAccount").parse(rowData);
                $$("grdAccount").refresh();
            }
        },
        error: function () {
           
        },
        complete: function () {
            
        }
    });
}
function fnCurrFormat(value) {

    var Currfrmt = $("#CURRENCY_FORMAT").val();
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
    //debugger;
    if (value == null || value == undefined) return "";
    if (isNaN(value)) return "";

    if (value.toString() != "") {
        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                ////afterPoint = CurrDelimit + afterPoint
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            //x = Math.floor(x);                   

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        else {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }

            x = x.toString();

            //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
            //var res = x.replace(/(\d{3})/g, "1,")
            var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            if (res.indexOf('.') > 0) {

                res = res.replace(".", CurrDelimit)
            }


            return res;
        }
    }
    else {
        return value;
    }
};
function fnPropRowadd(option,GridNm) {
    var CurNm = "";
    var CurIds = $.trim($("#hdnBaseCurrId").val());
    var PsRate = "";
    var FornAmt = "";
    var RateTy = "";
    var grdData = $$(GridNm).serialize();
    var lenval = grdData.length;

    if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
        if (grdData.length != 0) {
            var currow = $$(GridNm).getSelectedItem();
            CurIds = currow.CurrId;
            if (parseFloat(vDbTot) > 0) {
                PsRate = currow.PsRate;
                FornAmt = parseFloat(vDbTot) / currow.PsRate;
                RateTy = currow.RateTy;
            }

        }
    }

   
    if (ddlcurrency.length != 0) {
        var CurrData = ddlcurrency.filter(function (ddlcurrency) {
            return ddlcurrency.id == $.trim(CurIds);
        });

        if (CurrData.length != 0) CurNm = CurrData[0].id;
    }
    if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdData.length != 0) {
        var firstid = $$(GridNm).getFirstId();
        var getval = $$(GridNm).getItem(firstid);
        CurNm = getval.CurrId;
        PsRate = getval.PsRate;
        FornAmt = parseFloat(vDbTot) / getval.PsRate;
        RateTy = getval.RateTy;
    }
    var Rowid = "";
    if ($.trim(GridNm) == "grdFromProp") Rowid = parseFloat($("#hdnFrmPropRowId").val());
    else parseFloat($("#hdnToPropRowId").val());
    var addrow = {
        RowId: (Rowid == 0 ? 0 : Rowid),PropNm: GridNm=="grdToProp"?"": $.trim($("#hdnCompId").val()), ACCD: '', hdnAcId: '', AcNM: '', CurrId: CurNm, Amt: '', Narr: '', DocNo: '', DocDt: '',
        PsRate: PsRate, FornAmt: FornAmt, RateTy: RateTy,AnaSel:"A",GridNm:GridNm
    };
    Rowid = Rowid + 1;
    if ($.trim(GridNm) == "grdFromProp") $("#hdnFrmPropRowId").val(Rowid);
    else $("#hdnToPropRowId").val(Rowid);
    $$(GridNm).add(addrow);
    $$(GridNm).select($$(GridNm).getLastId());
    webix.UIManager.setFocus($$(GridNm));
    $$(GridNm).refresh();
}

function fnRefreshGrid() {
    $$("grdFromProp").clearAll();
    $$("grdFromProp").refresh();
    $("#hdnFrmPropRowId").val("0");
    $$("grdToProp").clearAll();
    $$("grdToProp").refresh();
    $("#hdnToPropRowId").val("0");
    if ($$("grdBillDet") != undefined) {
        $$("grdBillDet").clearAll();
        $$("grdBillDet").refresh();
    }
    if ($$("grdGlAnaly") != undefined) {
        $$("grdGlAnaly").clearAll();
        $$("grdGlAnaly").refresh();
        $$("grdGlAnaly").hide();
    }
}
function fnCallBillDetails(ddlRefTy, Curr, FornAmt, ConvRt,GridNm,ToPropId) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupBillDet",
        head: "Bill Details",
        position: "center",
        minWidth: 830,
        maxWidth: 830,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 830,
            maxWidth: 830,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "txtBPopAmt",
                                    stringResult: true,
                                    label: "Amount",
                                    labelAlign: "left",
                                    inputAlign: "right",
                                    labelWidth: 60,
                                    inputWidth: 150,
                                    width: 150,

                                    //value: (Opt == "1" ? (CrAmt != "" ? parseFloat(CrAmt).toFixed(2) : 0) : (DrAmt != "" ? parseFloat(DrAmt).toFixed(2) : 0)),
                                },
                                {
                                    view: "label",
                                    id: "lblDRCR",
                                    labelAlign: "Left",
                                    inputWidth: 50,
                                    width: 50,
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCurr",
                                    stringResult: true,
                                    label: "Currency",
                                    labelAlign: "Right",
                                    labelWidth: 80,
                                    inputWidth: 180,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    disabled: true,
                                    width: 180,
                                    value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? Curr : "",
                                },
                                {
                                    view: "text",
                                    id: "txtBPopFAmt",
                                    stringResult: true,
                                    label: "Forn Amt",
                                    labelAlign: "Right",
                                    labelWidth: 110,
                                    inputWidth: 200,
                                    hidden: true,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    inputAlign: "right",
                                    disabled: true,
                                    width: 200,
                                    value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(FornAmt).toFixed(2) : "",
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCovt",
                                    stringResult: true,
                                    label: "Conv.Rt",
                                    labelAlign: "Right",
                                    labelWidth: 100,
                                    inputWidth: 180,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    inputAlign: "right",
                                    disabled: true,
                                    width: 250,
                                    value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(ConvRt).toFixed(2) : "",
                                },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdBillDet",
                            select: "row",
                            data: [],
                            height: 280,
                            editable: true,
                            footer: true,
                            navigation: true,
                            autoConfig: true,
                            position: "flex",
                            scroll: "y",
                            columns: [
                                    { header: "Ref.Type Name", id: "RefTyId", width: 130, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlRefTy; } },
                                    { header: "Ref.Name", id: "RefNm", width: 200, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Bill Date", id: "BillDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Due Date", id: "DueDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' }, footer: { text: "Total" } },
                                    {
                                        header: "Debit", id: "DrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" },

                                        format: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                        editParse: function (value) {
                                            return webix.Number.parse(value, webix.i18n);
                                        },
                                        editFormat: function (value) {
                                            return fnCurrFormat(value);
                                        },


                                    },
                                    {
                                        header: "Credit", id: "CrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" },

                                        format: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                        editParse: function (value) {
                                            return webix.Number.parse(value, webix.i18n);
                                        },
                                        editFormat: function (value) {
                                            return fnCurrFormat(value);
                                        },

                                    },
                                    {
                                        header: "From Amt", id: "FornAmt", hidden: true, width: 100, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        format: webix.i18n.numberFormat, footer: { content: "summColumn" }
                                    },
                                    { header: "RefTyNm", id: "RefTyNm", hidden: true },
                                    { header: "Drcr", id: "Drcr", hidden: true },
                                    { header: "hdnAcId", id: "hdnAcId", hidden: true },

                                    { header: "OAmt", id: "OFornBAmt", hidden: true },
                                    { header: "Convrt", id: "BillConvrt", hidden: true },

                                    { header: "FornOrgAmt", id: "OFornBAmt", hidden: true },
                                    { header: "diffAmt", id: "diffAmt", hidden: true },
                                    { header: "RowId", id: "RowId", hidden: true },
                                    { header: "CBy", id: "CBy", hidden: true },
                                    { header: "CDt", id: "CDt", hidden: true },
                                    { header: "AdjBy", id: "AdjBy", hidden: true },
                                    { header: "AdjDt", id: "AdjDt", hidden: true },

                                    { header: "", id: "btnBDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            ],
                            ready: function () {
                                $$("grdBillDet").select($$("grdBillDet").getFirstId());
                                webix.UIManager.setFocus($$("grdBillDet"));
                                //$$("grdBillDet").select($$("grdBillDet").getFirstId(), "RefTyId", true);

                            },
                            on: {
                                'onBeforeEditStart': function (id) {
                                    var getval = $$("grdBillDet").getItem(id);
                                    if (id.column == 'RefNm' || id.column == 'BillDt' || id.column == 'DueDt') {
                                        if (getval.RefTyId != undefined && getval.RefTyId == "3") return false;
                                        else return true;
                                    }
                                    if (id.column == "CrAmt") {
                                        if (getval.Drcr == "DR") return false;
                                        else return true;
                                    }
                                    if (id.column == "DrAmt") {
                                        if (getval.Drcr == "CR") return false;
                                        else return true;
                                    }

                                },
                                'onEditorChange': function (id, value, row) {
                                    debugger;
                                    var getval = $$("grdBillDet").getItem(id);

                                    var TrnVal = $$(GridNm).getSelectedItem();



                                    if (id.column == 'RefTyId') {

                                        getval.BillDt = $("#hdnCurrentDt").val();
                                        getval.DueDt = $("#hdnCurrentDt").val();
                                        getval.RefNm = "";
                                        getval.CBy = "";
                                        getval.CDt = "";
                                        getval.AdjBy = "";
                                        getval.AdjDt = "";
                                        getval.Drcr = $.trim(TrnVal.Drcr);
                                        getval.CrAmt = "";
                                        getval.DrAmt = "";
                                        getval.hdnAcId = $.trim(TrnVal.hdnAcId);


                                        var CurrData = ddlRefTy.filter(function (ddlRefTy) {
                                            return ddlRefTy.id == $.trim(value);
                                        });

                                        if (CurrData.length > 0)
                                            getval.RefTyNm = CurrData[0].value;

                                        if ($.trim(CurrData[0].value) == "Advance") {
                                            getval.BillDt = $$("txtVchDt").getValue();
                                            getval.DueDt = $$("txtVchDt").getValue();
                                        }

                                        $$("grdBillDet").refresh();

                                        if (value == "3") {

                                            fnPopUpPendingBills(getval.hdnAcId, ddlRefTy,GridNm,ToPropId);

                                        }

                                    }
                                },
                                'onItemClick': function (id, e, node, trg) {
                                    var getval = $$("grdBillDet").getItem(id.row);

                                    $("#hdnBGClickCol").val(id.column);
                                    //debugger;
                                    if (id.column == 'btnBDel') {
                                        debugger;
                                        $$("grdBillDet").editCancel();
                                        $$("grdBillDet").remove($$("grdBillDet").getSelectedId());
                                        $$("grdBillDet").refresh();

                                        var dsBillDet = $$("grdBillDet").serialize();
                                        var TrnVal = $$(GridNm).getSelectedItem();

                                        fnBillTotal(GridNm);
                                        if (dsBillDet.length == 0) {

                                            fnBillDetRowAdd('0', $.trim(TrnVal.RowId), $.trim(TrnVal.Drcr), $.trim(TrnVal.hdnAcId), $.trim(TrnVal.PsRate), $.trim(TrnVal.FornAmt),GridNm);
                                        }
                                    }




                                },
                                'onKeyPress': function (e, id) {

                                    var getval = $$("grdBillDet").getSelectedItem();
                                    debugger;
                                    var charCode = (e.which) ? e.which : event.keyCode;
                                    if (charCode == 9) {
                                        return true;
                                    }
                                    if ($.trim($("#hdnBGClickCol").val()) == "CrAmt" || $.trim($("#hdnBGClickCol").val()) == "DrAmt") {
                                        if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                            return true
                                        }

                                        if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                                            if (e == 40) {
                                                var TrnVal = $$(GridNm).getSelectedItem();
                                                var Drcr = "";
                                                if (GridNm == "grdFromProp")
                                                {
                                                    Drcr = $$("ChkDebit").getValue() == "1" ? "DR" : "CR";
                                                }
                                                else
                                                {
                                                    Drcr = $$("ChkDebit").getValue() == "1" ? "CR" : "DR";
                                                }
                                                fnBillDetRowAdd('1', $.trim(TrnVal.RowId), $.trim(Drcr), $.trim(TrnVal.hdnAcId), $.trim(TrnVal.PsRate), $.trim(TrnVal.FornAmt),GridNm);
                                            }

                                            return false;
                                        }
                                        else {
                                            return true;
                                        }


                                    }

                                },
                                'onBlur': function () {
                                    debugger;

                                    fnBillTotal(GridNm);
                                    $$("grdBillDet").refresh();

                                    ////  $$("grdBillDet").editStop(); Calender not show previous

                                },
                                'onAfterEditStop': function (state, editor) {
                                    fnBillTotal(GridNm);
                                    $$("grdBillDet").refresh();
                                },
                                'onAfterEditStart': function (id) {
                                    var getColumn = id.column;
                                    SelectedColumn = getColumn;
                                    if (getColumn == "CrAmt" || getColumn == "DrAmt") {
                                        this.getEditor().getInputNode().setAttribute("maxlength", 14);
                                        this.getEditor().getInputNode().style.textAlign = "right";
                                    }
                                    if (getColumn == "RefNm") {
                                        this.getEditor().getInputNode().setAttribute("maxlength", 40);
                                    }

                                },
                                onLiveEdit: function (state, editor) {
                                    debugger;
                                    var columnId = editor.column;
                                    var Row = editor.row;
                                    var SelRow = $$("grdBillDet").getItem(Row);


                                    if (columnId == "CrAmt") {
                                        var value = state.value;
                                        value = parseFloat(state.value);
                                        if (value < 0) value = (value * -1);
                                        if (value > 99999999.99) {// 9999999999.999
                                            SelRow.CrAmt = state.old;
                                            editor.setValue(state.old);
                                            this.editCancel();
                                            this.editCell(Row, "CrAmt", true, true)
                                            editor = this.getEditor();
                                            editor.getInputNode().selectionStart = state.old.length;

                                        }
                                        this.updateItem(Row, SelRow);
                                        this.refresh(Row);
                                    }
                                    if (columnId == "DrAmt") {
                                        debugger;
                                        var value = state.value;
                                        value = value.replace(/,/g, '');
                                        value = parseFloat(state.value);
                                        if (value < 0) value = (value * -1);
                                        if (value > 99999999.99) {// 9999999999.999
                                            SelRow.DrAmt = state.old;
                                            editor.setValue(state.old);
                                            this.editCancel();
                                            this.editCell(Row, "DrAmt", true, true)
                                            editor = this.getEditor();
                                            editor.getInputNode().selectionStart = state.old.length;

                                        }
                                        this.updateItem(Row, SelRow);
                                        this.refresh(Row);
                                    }
                                },
                            }
                        },
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 900,
                             rows: [
                                 {
                                     cols: [
                                          {
                                              view: "label",
                                              id: "lblBDiff",
                                              label: "Difference :",
                                              labelAlign: "Right",
                                              inputWidth: 100,
                                              width: 100,
                                              css: "RedColor",
                                          },
                                          {
                                              view: "label",
                                              id: "txtBDiffAmt",
                                              label: "",
                                              labelAlign: "Left",
                                              inputWidth: 80,
                                              width: 120,

                                          },
                                           {
                                               view: "text",
                                               id: "txtBPopGainAmt",
                                               stringResult: true,
                                               label: "Gain/Loss",
                                               labelAlign: "Right",
                                               labelWidth: 90,
                                               hidden: true,
                                               inputWidth: 180,
                                               //  hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true,
                                               inputAlign: "right",
                                               disabled: true,
                                               width: 180,
                                           },
                                           {
                                               view: "text",
                                               id: "txtBPopFAmtDiff",
                                               stringResult: true,
                                               label: "FornAmt Diff",
                                               labelAlign: "Right",
                                               labelWidth: 90,
                                               hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true,
                                               value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(FornAmt).toFixed(2) : "",
                                               inputAlign: "right",
                                               inputWidth: 180,
                                               disabled: true,
                                               width: 180,

                                           },
                                     ]
                                 },
                                 {

                                     cols: [
                                         {
                                             width: 630,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Done',
                                             css: "webix_primary",
                                             id: "CbnDone",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {

                                                     var TotDebit = 0;
                                                     var TotCredit = 0;

                                                     var grdBillDet = $$("grdBillDet").serialize();

                                                     if (grdBillDet.length != 0) {

                                                         for (i = 0; i < grdBillDet.length; i++) {
                                                             var RefTyId = $.trim(grdBillDet[i].RefTyId);
                                                             if (RefTyId == "" || RefTyId == undefined) {
                                                                 AlertMessage("Reference Type found empty !");
                                                                 return;
                                                             }
                                                             if (RefTyId == "1" || RefTyId == "2") {
                                                                 var vRet = $.trim(grdBillDet[i].RefNm);
                                                                 if (vRet == "") {
                                                                     AlertMessage("Reference Name found empty !");
                                                                     return;
                                                                 }
                                                             }
                                                             if (RefTyId != "4") {
                                                                 var vRet = $.trim(grdBillDet[i].DueDt);
                                                                 if (vRet == "") {
                                                                     AlertMessage("Due Date found empty !");
                                                                     return;
                                                                 }

                                                                 var vRet = $.trim(grdBillDet[i].BillDt);
                                                                 if (vRet == "") {
                                                                     AlertMessage("Bill Date found empty !");
                                                                     return;
                                                                 }

                                                             }
                                                             var DrAmt = (grdBillDet[i].DrAmt == "" ? 0 : parseFloat(grdBillDet[i].DrAmt));
                                                             var CrAmt = (grdBillDet[i].CrAmt == "" ? 0 : parseFloat(grdBillDet[i].CrAmt));

                                                             if (DrAmt == 0 && CrAmt == 0) {
                                                                 AlertMessage("Debit/Credit value(s) found empty !");
                                                                 return;
                                                             }
                                                             TotDebit = parseFloat(TotDebit) + parseFloat(DrAmt);
                                                             TotCredit = parseFloat(TotCredit) + parseFloat(CrAmt);

                                                             for (j = 0; j < grdBillDet.length; j++) {
                                                                 var vRet = $.trim(grdBillDet[i].RefNm);
                                                                 var vRet1 = $.trim(grdBillDet[j].RefNm);
                                                                 if ($.trim(grdBillDet[i].id) != $.trim(grdBillDet[j].id)) {
                                                                     if (vRet == vRet1 && RefTyId != "3") {
                                                                         AlertMessage("Reference Name already exists. !");
                                                                         return;
                                                                     }
                                                                 }

                                                             }

                                                         }

                                                     }
                                                     debugger;
                                                     var TotDiff1 = parseFloat(TotDebit) - parseFloat(TotCredit);
                                                     var Amount = ($$("txtBDiffAmt").getValue() == "" ? 0 : parseFloat($$("txtBDiffAmt").getValue())).toFixed(2);
                                                     var ActAmt = ($$("txtBPopAmt").getValue() == "" ? 0 : parseFloat($$("txtBPopAmt").getValue())).toFixed(2);

                                                    
                                                     var getval = $$(GridNm).getSelectedItem();
                                                     var drcr = "";
                                                     if (GridNm == "grdFromProp") drcr = $$("ChkDebit").getValue() == "1" ? "DR" : "CR";
                                                     else drcr = $$("ChkDebit").getValue() == "1" ? "CR" : "DR";
                                                     if ((Amount < 0) || parseFloat(Amount) != 0) {

                                                         if ((TotDiff1 < 0 && drcr == "DR") || (TotDiff1 > 0 && drcr == "CR")) {
                                                             AlertMessage("Difference: " + Amount + "/- found.");
                                                             return;
                                                         }

                                                         webix.modalbox({
                                                             title: "Confirmation !",
                                                             buttons: ["Yes", "No", "Cancel"],
                                                             width: 400,
                                                             height: 150,
                                                             text: "Difference: " + (Amount < 0 ? Amount * (-1) : Amount) + "/- found.Processed with update ?"
                                                         }).then(function (result) {
                                                             var type = "";
                                                             if (result == 0) {
                                                                 fnBillDetDataRef(GridNm);
                                                                 if ($$("grdBillDet") != undefined) {
                                                                     $$("grdBillDet").clearAll();
                                                                     $$("grdBillDet").refresh();
                                                                 }
                                                                 var getval = $$(GridNm).getSelectedItem();
                                                                 getval.Amt = ActAmt - Amount;
                                                                 $$(GridNm).refresh();
                                                                 $$('PopupBillDet').hide();

                                                             }
                                                             else if (result == 1) {

                                                             }
                                                             else if (result == 2) {

                                                             }
                                                         });

                                                     }
                                                     else {
                                                         fnBillDetDataRef(GridNm);
                                                         if ($$("grdBillDet") != undefined) {
                                                             $$("grdBillDet").clearAll();
                                                             $$("grdBillDet").refresh();
                                                         }


                                                         $$('PopupBillDet').hide();
                                                     }
                                                 }
                                             }
                                         },
                                          {
                                              width: 10,
                                          },
                                          {
                                              view: 'button',
                                              label: 'Close',
                                              id: 'CbnClose',
                                              css: "webix_primary",
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      debugger;

                                                      $$('PopupBillDet').hide();
                                                  }
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

    debugger;

    var itemval = $$(GridNm).getSelectedItem();

   
    $$("txtBPopAmt").setValue((itemval.Amt == "" ? 0 : parseFloat(itemval.Amt)).toFixed(2));
    var Drcr = "";
    if (GridNm == "grdFromProp")
    {
        if ($$("ChkDebit").getValue() == "1")
        {
            $$("lblDRCR").define("label", "DR");
            Drcr = "DR";
        }
           
        else
        {
            $$("lblDRCR").define("label", "CR");
            Drcr = "CR";
        }
         

    }
    else
    {
        if ($$("ChkCredit").getValue() == "1")
        {
            $$("lblDRCR").define("label", "DR");
            Drcr = "DR";
        }
      
        else
        {
            $$("lblDRCR").define("label", "CR");
            Drcr = "CR";
        }
           
    }
   
    $$("lblDRCR").refresh();

    var dsGlTrans = $$("grdGLTrnData").serialize();

    if (dsGlTrans.length == 0) {
        fnBillDetRowAdd('0', itemval.RowId, Drcr, itemval.hdnAcId, itemval.PsRate, itemval.FornAmt,GridNm);
    }
    else {

        var DtFilter = dsGlTrans.filter(function (dsGlTrans) {
            return dsGlTrans.RowId == $.trim(itemval.RowId) && dsGlTrans.GridNm == itemval.GridNm;
        });

        if (DtFilter.length == 0) {
            fnBillDetRowAdd('0', itemval.RowId,Drcr, itemval.hdnAcId, itemval.PsRate, itemval.FornAmt,GridNm);
        }
        else {

            var DataStore = [];
            for (k = 0; k < DtFilter.length; k++) {


                if (DtFilter[k].hdnAcId != "") {

                    var CrAmt = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);

                    var DrAmt = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);

                    var FormAmt = (DtFilter[k].FormAmt || DtFilter[k].FormAmt == "NaN" || DtFilter[k].FormAmt == null ? 0 : parseFloat(DtFilter[k].FormAmt)).toFixed(2);

                    var addrow = {
                        Drcr: DtFilter[k].Drcr, ACCD: DtFilter[k].ACCD, hdnAcId: DtFilter[k].hdnAcId, AcNM: DtFilter[k].AcNM, hdnCurNm: DtFilter[k].hdnCurNm,
                        CurrId: DtFilter[k].CurrId, SlNo: DtFilter[k].SlNo, FCurBal: DtFilter[k].FCurBal, Credit: DtFilter[k].Credit, Debit: DtFilter[k].Debit, Narr: DtFilter[k].Narr,
                        DocNo: DtFilter[k].DocNo, DocDt: DtFilter[k].DocDt,

                        RefTyId: DtFilter[k].RefTyId, RefTyNm: DtFilter[k].RefTyNm, RefNm: DtFilter[k].RefNm, DueDt: DtFilter[k].DueDt.toString(),
                        BillDt: DtFilter[k].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FormAmt,

                        DETREF: DtFilter[k].DETREF, DATREF: DtFilter[k].DATREF, BILLREFSNO: DtFilter[k].BILLREFSNO, BILLREFBDT: DtFilter[k].BILLREFBDT,
                        BILLREFVNO: DtFilter[k].BILLREFVNO, billclno: DtFilter[k].billclno, billcldt: DtFilter[k].billcldt, billudt: DtFilter[k].billudt,
                        Nbilludt: DtFilter[k].Nbilludt,
                        CBy: DtFilter[k].CBy, CDt: DtFilter[k].CDt, AdjBy: DtFilter[k].AdjBy, AdjDt: DtFilter[k].AdjDt,
                        Gloss: DtFilter[k].Gloss, Fornbase: DtFilter[k].Fornbase, FornBill: DtFilter[k].FornBill, ConvrtBill: DtFilter[k].ConvrtBill,
                        EFornamt: DtFilter[k].EFornamt, btds: DtFilter[k].btds, btdsref: DtFilter[k].btdsref, SlId: DtFilter[k].SlId, RateTy: DtFilter[k].RateTy, RowId: DtFilter[k].RowId
                    };

                    DataStore = DataStore.concat(addrow);
                }
            }
            $$("grdBillDet").clearAll();
            $$("grdBillDet").parse(DataStore);
            $$("grdBillDet").refresh();
        }
    }

    fnBillTotal(GridNm);
    $$("txtBPopAmt").disable();
    $$("PopupBillDet").show();
}
function fnPopupAnalysis(GridNm, ToPropId)
{
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAnalysis",
        head: "Analysis Code",
        position: "center",
        minWidth: 930,
        maxWidth: 930,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 930,
            maxWidth: 930,

            elements: [
                {
                    view: "datatable",
                    id: "grdGlAnaly",
                    select: "row",
                    data: [],
                    height: 250,
                    scroll: "xy",
                    editable: true,
                    columns: [
                            { header: "AnalID1", id: "AnalID1", hidden: true },
                            { header: "Analysis 1", id: "AnalNM1", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID1", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID2", id: "AnalID2", hidden: true },
                            { header: "Analysis 2", id: "AnalNM2", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID2", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID3", id: "AnalID3", hidden: true },
                            { header: "Analysis 3", id: "AnalNM3", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID3", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID4", id: "AnalID4", hidden: true },
                            { header: "Analysis 4", id: "AnalNM4", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID4", width: 40, template: searchicon, hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID5", id: "AnalID5", hidden: true },
                            { header: "Analysis 5", id: "AnalNM5", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID5", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID6", id: "AnalID6", hidden: true },
                            { header: "Analysis 6", id: "AnalNM6", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID6", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID7", id: "AnalID7", hidden: true },
                            { header: "Analysis 7", id: "AnalNM7", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID7", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID8", id: "AnalID8", hidden: true },
                            { header: "Analysis 8", id: "AnalNM8", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID8", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID9", id: "AnalID9", hidden: true },
                            { header: "Analysis 9", id: "AnalNM9", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID9", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            { header: "AnalID10", id: "AnalID10", hidden: true },
                            { header: "Analysis 10", id: "AnalNM10", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "", id: "btnAnalID10", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                            {
                                header: "Amount", id: "Amount", width: 80, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },

                                format: function (value) {
                                    return fnCurrFormat(value);
                                },
                                editParse: function (value) {
                                    return webix.Number.parse(value, webix.i18n);
                                },
                                editFormat: function (value) {
                                    return fnCurrFormat(value);
                                },

                            },
                            { header: "", id: "btnADel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                            { header: "RowId", id: "RowId", hidden: true, },
                            { header: "hdnAcId", id: "hdnAcId", hidden: true, },
                    ],
                    on: {
                        'onItemClick': function (id, e, node, trg) {

                            var getval = this.getItem(id.row);
                            var ColId = "";
                           
                            if (id.column == "btnAnalID1" || id.column == "AnalNM1") {

                                ColId = "1";
                            }
                            else if (id.column == "btnAnalID2" || id.column == "AnalNM2") {

                                ColId = "2";
                            }
                            else if (id.column == "btnAnalID3" || id.column == "AnalNM3") {

                                ColId = "3";
                            }
                            else if (id.column == "btnAnalID4" || id.column == "AnalNM4") {

                                ColId = "4";
                            }
                            else if (id.column == "btnAnalID5" || id.column == "AnalNM5") {

                                ColId = "5";
                            }
                            else if (id.column == "btnAnalID6" || id.column == "AnalNM6") {

                                ColId = "6";
                            }
                            else if (id.column == "btnAnalID7" || id.column == "AnalNM7") {

                                ColId = "7";
                            }
                            else if (id.column == "btnAnalID8" || id.column == "AnalNM8") {

                                ColId = "8";
                            }
                            else if (id.column == "btnAnalID9" || id.column == "AnalNM9") {

                                ColId = "9";
                            }
                            else if (id.column == "btnAnalID10" || id.column == "AnalNM10") {

                                ColId = "10";
                            }

                            if (id.column == "btnADel") {
                                $$("grdGlAnaly").editCancel();
                                $$("grdGlAnaly").remove($$("grdGlAnaly").getSelectedId());
                                $$("grdGlAnaly").refresh();

                                var dsGlAnaly = $$("grdGlAnaly").serialize();
                                if (dsGlAnaly.length == 0) {
                                    fnAddAnalRow('1',GridNm);

                                }

                            }
                            // debugger;
                            if (id.column != "btnADel" && id.column != "Amount") {
                                $("#hdnAnaColId").val($.trim(ColId));
                                var SrchData = Headers.filter(function (Headers) {
                                    return Headers.L_ID == $.trim(ColId) && Headers.COMPANY_ID== $.trim(ToPropId);
                                });
                                fnCallAnaPopDataShow(SrchData);
                            }
                        },
                        'onEditorChange': function (id, value, row) {
                            debugger;
                            var getval = this.getItem(id);

                            if (id.column == 'Amount') {
                                var grdGlAnaly = $$("grdGlAnaly").serialize();

                                if (grdGlAnaly.length != 0) {
                                    var Amt = 0;
                                    for (i = 0; i < grdGlAnaly.length; i++) {

                                        Amt = Amt + (grdGlAnaly[i].Amount == "" || grdGlAnaly[i].Amount == null || grdGlAnaly[i].Amount == "NaN" ? 0 : parseFloat(grdGlAnaly[i].Amount))
                                    }
                                }
                                getval1 = $$(GridNm).getSelectedItem();
                                var TotAmt = 0;
                                if (parseFloat(getval1.Credit) > 0) TotAmt = getval1.Credit == "" ? "0" : parseFloat(getval1.Credit);
                                else TotAmt = getval1.Debit == "" ? "0" : parseFloat(getval1.Debit);
                                $$("grdGlAnaly").refresh();
                                $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(Amt).toFixed(2);
                                if (parseFloat(TotAmt).toFixed(2) == parseFloat(Amt).toFixed(2)) {
                                    webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                    webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                   
                                    $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderGrClr";
                                }
                                else {
                                    webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                    webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");                                 
                                    $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderRedClr";

                                }

                                $$("grdGlAnaly").refreshColumns();
                            }
                        },
                        'onBlur': function () {
                            $$("grdGlAnaly").refresh();
                        },
                        'onKeyPress': function (e, id) {

                            var charCode = (e.which) ? e.which : event.keyCode;
                            if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39 || charCode == 13) {
                                return true;
                            }
                            if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                                if (e == 40) {
                                    debugger;
                                    fnAddAnalRow('1',GridNm);
                                }
                                return false;
                            }
                            else {
                                return true;
                            }
                        },
                        'onAfterEditStop': function (state, editor) {
                           // fnStoreAnaData();
                          //  $$("grdGlAnaly").refresh();
                        },
                        onLiveEdit: function (state, editor) {
                            //debugger;
                            var columnId = editor.column;
                            var Row = editor.row;
                            var SelRow = this.getItem(Row);


                            if (columnId == "Amount") {
                                var value = state.value;
                                value = parseFloat(state.value);
                                if (value < 0) value = (value * -1);
                                if (value > 99999999.99) {
                                    SelRow.Amount = state.old;
                                    editor.setValue(state.old);
                                    this.editCancel();
                                    //editor.focus();
                                    this.editCell(Row, "Amount", true, true)
                                    editor = this.getEditor();
                                    editor.getInputNode().selectionStart = state.old.length;

                                }
                                this.updateItem(Row, SelRow);
                                this.refresh(Row);
                            }
                        }

                    }
                   
                },
                                {
                                    PaddingY: 20,
                                    cols: [
                                         {
                                             minWidth: 930,
                                             paddingX: 830,
                                             rows: [
                                                 {
                                                     cols: [
                                                          {
                                                              view: 'button',
                                                              label: 'Ok',
                                                              css: "webix_primary",
                                                              maxWidth: 75,
                                                              inputWidth: 70,
                                                              on: {
                                                                  onItemClick: function () {
                                                                      debugger;
                                                                    
                                                                      $$("grdGlAnaly").editStop();
                                                                      fnStoreAnaData(GridNm);

                                                                      $$("grdGlAnaly").refresh();
                                                                      $$('PopupAnalysis').hide();
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              view: 'button',
                                                              label: 'Close',
                                                              css: "webix_primary",
                                                              maxWidth: 70,
                                                              on: {
                                                                  onItemClick: function () {
                                                                      $$('PopupAnalysis').hide();
                                                                  }
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
    $$("PopupAnalysis").show();
}
function fnAddAnalRow(option,GridNm) {
    debugger;
    var grdData = $$("grdGlAnaly").serialize();
    var lenval = grdData.length;

    var addrow = {
        AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
        AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
        AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: '', RowId: '', hdnAcId: '', GridNm: GridNm
    };

  

    if ($.trim(option) == "0") {

        if (lenval == 0) {
            $$("grdGlAnaly").add(addrow);
        }
    }
   
    if ($.trim(option) == "1") {

        if (lenval != 0) {

            for (i = 0; i < lenval; i++) {

                if ((grdData[i].AnalID1 != "" || grdData[i].AnalID2 != "" || grdData[i].AnalID3 != "" || grdData[i].AnalID4 != "" || grdData[i].AnalID5 != ""
                    || grdData[i].AnalID6 != "" || grdData[i].AnalID7 != "" || grdData[i].AnalID8 != "" || grdData[i].AnalID9 != "" || grdData[i].AnalID10 != "") && (grdData[i].Amount != "")) {
                    // return true;
                }
                else {
                    return false;
                }
            }

            $$("grdGlAnaly").add(addrow);
        }
        else if (lenval == 0)
            $$("grdGlAnaly").add(addrow);
    }

    $$("grdGlAnaly").refresh();
}
function fnCallAnaPopDataShow(SrchData) {
    $$("grdAnalySrch").clearAll();
    $$("grdAnalySrch").parse(SrchData);
    $$("grdAnalySrch").refresh();
    $$("PopupAnalySrch").show();
}
function CallAnalysisPopup(GridNm) {
    debugger;

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAnalySrch",
        head: "Analysis",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,

            elements: [
                {
                    view: "datatable",
                    id: "grdAnalySrch",
                    select: "row",
                    data: [],
                    height: 430,
                    scroll: "y",
                    columns: [
                          { header: ["Code", { content: "textFilter" }], id: "TC_ID", width: 80, css: { 'text-align': 'center ! important' } },
                          { header: ["Analysis", { content: "textFilter" }], id: "TC_NM", width: 300, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);

                            var AnalyId = $.trim(selectedRows[0].TC_ID);
                            var AnalyNm = $.trim(selectedRows[0].TC_NM).replace(/&/g, '');

                            var CurRows = $$("grdGlAnaly").getSelectedItem();
                            var ColId = $("#hdnAnaColId").val();
                            if ($.trim(ColId) == "1") {
                                CurRows.AnalID1 = AnalyId;
                                CurRows.AnalNM1 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "2") {
                                CurRows.AnalID2 = AnalyId;
                                CurRows.AnalNM2 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "3") {
                                CurRows.AnalID3 = AnalyId;
                                CurRows.AnalNM3 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "4") {
                                CurRows.AnalID4 = AnalyId;
                                CurRows.AnalNM4 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "5") {
                                CurRows.AnalID5 = AnalyId;
                                CurRows.AnalNM5 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "6") {
                                CurRows.AnalID6 = AnalyId;
                                CurRows.AnalNM6 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "7") {
                                CurRows.AnalID7 = AnalyId;
                                CurRows.AnalNM7 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "8") {
                                CurRows.AnalID8 = AnalyId;
                                CurRows.AnalNM8 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "9") {
                                CurRows.AnalID9 = AnalyId;
                                CurRows.AnalNM9 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "10") {
                                CurRows.AnalID10 = AnalyId;
                                CurRows.AnalNM10 = AnalyNm;
                            }

                            $$("grdGlAnaly").refresh();
                            fnStoreAnaData(GridNm);
                            $$('PopupAnalySrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAnalySrch').hide();
                                                 }
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

  
}

function fnStoreAnaData(GridNm) {
    debugger;
    var DataStore = [];

    var grdGlAnaly = [];

    if ($$("grdGlAnaly") != undefined)
        grdGlAnaly = $$("grdGlAnaly").serialize();

    var grdGlAnalyData = $$("grdGlAnalyData").serialize();

    var grdTranDet = $$(GridNm).serialize();

    var DetSelRow = $$(GridNm).getSelectedItem();

    if (grdTranDet.length != 0) {
        var CurrSelRowId = DetSelRow.RowId;
        var CurrGridNm = DetSelRow.GridNm;

        for (i = 0; i < grdTranDet.length; i++) {

            var CurrRowId = grdTranDet[i].RowId;
            var AnaAppl = grdTranDet[i].AnaAppl;

            if ($.trim(AnaAppl) == "1") {
                if (grdGlAnalyData.length == 0) {

                    if (grdGlAnaly.length != 0) {
                        for (j = 0; j < grdGlAnaly.length; j++) {
                            if (CurrSelRowId == CurrRowId && CurrGridNm == GridNm) {
                         

                            var Amt = (grdGlAnaly[j].Amount == "" ? 0 : parseFloat(grdGlAnaly[j].Amount)).toFixed(2);
                            var AnalID1 = (grdGlAnaly[j].AnalID1 == "" ? "" : $.trim(grdGlAnaly[j].AnalID1));
                            var AnalID2 = (grdGlAnaly[j].AnalID2 == "" ? "" : $.trim(grdGlAnaly[j].AnalID2));
                            var AnalID3 = (grdGlAnaly[j].AnalID3 == "" ? "" : $.trim(grdGlAnaly[j].AnalID3));
                            var AnalID4 = (grdGlAnaly[j].AnalID4 == "" ? "" : $.trim(grdGlAnaly[j].AnalID4));
                            var AnalID5 = (grdGlAnaly[j].AnalID5 == "" ? "" : $.trim(grdGlAnaly[j].AnalID5));
                            var AnalID6 = (grdGlAnaly[j].AnalID6 == "" ? "" : $.trim(grdGlAnaly[j].AnalID6));
                            var AnalID7 = (grdGlAnaly[j].AnalID7 == "" ? "" : $.trim(grdGlAnaly[j].AnalID7));
                            var AnalID8 = (grdGlAnaly[j].AnalID8 == "" ? "" : $.trim(grdGlAnaly[j].AnalID8));
                            var AnalID9 = (grdGlAnaly[j].AnalID9 == "" ? "" : $.trim(grdGlAnaly[j].AnalID9));
                            var AnalID10 = (grdGlAnaly[j].AnalID10 == "" ? "" : $.trim(grdGlAnaly[j].AnalID10));

                            var addrow = {
                                AnalID1: AnalID1, AnalNM1: grdGlAnaly[j].AnalNM1, btnAnalID1: '', AnalID2: AnalID2, AnalNM2: grdGlAnaly[j].AnalNM2, btnAnalID2: '', AnalID3: AnalID3, AnalNM3: grdGlAnaly[j].AnalNM3, btnAnalID3: '', AnalID4: AnalID4, AnalNM4: grdGlAnaly[j].AnalNM4, btnAnalID4: '',
                                AnalID5: AnalID5, AnalNM5: grdGlAnaly[j].AnalNM5, btnAnalID5: '', AnalID6: AnalID6, AnalNM6: grdGlAnaly[j].AnalNM6, btnAnalID6: '', AnalID7: AnalID7, AnalNM7: grdGlAnaly[j].AnalNM7, btnAnalID7: '', AnalID8: AnalID8, AnalNM8: grdGlAnaly[j].AnalNM8, btnAnalID8: '',
                                AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId, GridNm: grdTranDet[i].GridNm,
                            };


                            DataStore = DataStore.concat(addrow);
                        }
                        }
                    }
                    else {

                        if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {
                            var Credit = 0;
                            var Debit = 0;
                            if ($$("ChkCredit").getValue() == "1") {
                                if (GridNm == "grdFromProp") {
                                    Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Debit = 0;
                                }
                                else {
                                    Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Credit = 0;
                                }

                            }
                            else {
                                if (GridNm == "grdFromProp") {
                                    Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Credit = 0;
                                }
                                else {
                                    Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Debit = 0;
                                }

                            }

                            var Amt = 0;
                            if (Credit != 0) Amt = Credit;
                            else if (Debit != 0) Amt = Debit;

                            var addrow = {
                                AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId, GridNm: grdTranDet[i].GridNm,
                            };
                            DataStore = DataStore.concat(addrow);
                        }
                    }
                }
                else {

                    if (CurrSelRowId == CurrRowId && CurrGridNm == GridNm) {

                        if (grdGlAnaly.length != 0) {
                            for (j = 0; j < grdGlAnaly.length; j++) {

                                var Amt = (grdGlAnaly[j].Amount == "" ? 0 : parseFloat(grdGlAnaly[j].Amount)).toFixed(2);
                                var AnalID1 = (grdGlAnaly[j].AnalID1 == "" ? "" : $.trim(grdGlAnaly[j].AnalID1));
                                var AnalID2 = (grdGlAnaly[j].AnalID2 == "" ? "" : $.trim(grdGlAnaly[j].AnalID2));
                                var AnalID3 = (grdGlAnaly[j].AnalID3 == "" ? "" : $.trim(grdGlAnaly[j].AnalID3));
                                var AnalID4 = (grdGlAnaly[j].AnalID4 == "" ? "" : $.trim(grdGlAnaly[j].AnalID4));
                                var AnalID5 = (grdGlAnaly[j].AnalID5 == "" ? "" : $.trim(grdGlAnaly[j].AnalID5));
                                var AnalID6 = (grdGlAnaly[j].AnalID6 == "" ? "" : $.trim(grdGlAnaly[j].AnalID6));
                                var AnalID7 = (grdGlAnaly[j].AnalID7 == "" ? "" : $.trim(grdGlAnaly[j].AnalID7));
                                var AnalID8 = (grdGlAnaly[j].AnalID8 == "" ? "" : $.trim(grdGlAnaly[j].AnalID8));
                                var AnalID9 = (grdGlAnaly[j].AnalID9 == "" ? "" : $.trim(grdGlAnaly[j].AnalID9));
                                var AnalID10 = (grdGlAnaly[j].AnalID10 == "" ? "" : $.trim(grdGlAnaly[j].AnalID10));

                              
                                var addrow = {
                                    AnalID1: AnalID1, AnalNM1: grdGlAnaly[j].AnalNM1, btnAnalID1: '', AnalID2: AnalID2, AnalNM2: grdGlAnaly[j].AnalNM2, btnAnalID2: '', AnalID3: AnalID3, AnalNM3: grdGlAnaly[j].AnalNM3, btnAnalID3: '', AnalID4: AnalID4, AnalNM4: grdGlAnaly[j].AnalNM4, btnAnalID4: '',
                                    AnalID5: AnalID5, AnalNM5: grdGlAnaly[j].AnalNM5, btnAnalID5: '', AnalID6: AnalID6, AnalNM6: grdGlAnaly[j].AnalNM6, btnAnalID6: '', AnalID7: AnalID7, AnalNM7: grdGlAnaly[j].AnalNM7, btnAnalID7: '', AnalID8: AnalID8, AnalNM8: grdGlAnaly[j].AnalNM8, btnAnalID8: '',
                                    AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId, GridNm: grdTranDet[i].GridNm,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {
                                var Credit = 0; var Debit = 0;
                                if ($$("ChkCredit").getValue() == "1") {
                                    if (GridNm == "grdFromProp") {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                    else {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }

                                }
                                else {
                                    if (GridNm == "grdFromProp") {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    else {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }

                                }
                                var Amt = 0;
                                if (Credit != 0) Amt = Credit;
                                else if (Debit != 0) Amt = Debit;

                                var addrow = {
                                    AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                    AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId, GridNm: grdTranDet[i].GridNm,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                    }
                    else {

                        var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
                            return grdGlAnalyData.RowId == CurrRowId && grdGlAnalyData.GridNm==GridNm;
                        });

                        if (DtFilter.length == 0) {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);
                                var Amt = 0;
                                if (Credit != 0) Amt = Credit;
                                else if (Debit != 0) Amt = Debit;


                                var addrow = {
                                    AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                    AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId, GridNm: grdTranDet[i].GridNm
                                };
                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            for (k = 0; k < DtFilter.length; k++) {

                                if (DtFilter[k].hdnAcId != "") {

                                    var CrAmt = (DtFilter[k].CrAmt == "" ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);

                                    var DrAmt = (DtFilter[k].DrAmt == "" ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);

                                    var Amt = (DtFilter[k].Amount == "" ? 0 : parseFloat(DtFilter[k].Amount)).toFixed(2);

                                    var addrow = {
                                        AnalID1: DtFilter[k].AnalID1, AnalNM1: DtFilter[k].AnalNM1, btnAnalID1: '', AnalID2: DtFilter[k].AnalID2, AnalNM2: DtFilter[k].AnalNM2, btnAnalID2: '', AnalID3: DtFilter[k].AnalID3, AnalNM3: DtFilter[k].AnalNM3, btnAnalID3: '', AnalID4: DtFilter[k].AnalID4, AnalNM4: DtFilter[k].AnalNM4, btnAnalID4: '',
                                        AnalID5: DtFilter[k].AnalID5, AnalNM5: DtFilter[k].AnalNM5, btnAnalID5: '', AnalID6: DtFilter[k].AnalID6, AnalNM6: DtFilter[k].AnalID6, btnAnalID6: '', AnalID7: DtFilter[k].AnalID7, AnalNM7: DtFilter[k].AnalNM7, btnAnalID7: '', AnalID8: DtFilter[k].AnalID8, AnalNM8: DtFilter[k].AnalNM8, btnAnalID8: '',
                                        AnalID9: DtFilter[k].AnalID9, AnalNM9: DtFilter[k].AnalNM9, btnAnalID9: '', AnalID10: DtFilter[k].AnalID10, AnalNM10: DtFilter[k].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: DtFilter[k].hdnAcId, GridNm: DtFilter[k].GridNm,
                                    };

                                    DataStore = DataStore.concat(addrow);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //  $$("grdGlAnalyData").clearAll();
 
    var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
        return grdGlAnalyData.GridNm == GridNm;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            if (DtFilter[k].hdnAcId != "") {
                $$("grdGlAnalyData").editCancel();
                $$("grdGlAnalyData").remove(DtFilter[k].id);
                $$("grdGlAnalyData").refresh();
            }
        }
    }
    $$("grdGlAnalyData").parse(DataStore);
    $$("grdGlAnalyData").refresh();
}

function fnPopUpPendingBills(vhdnAcId, ddlRefTy,GridNm,ToPropId) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupPendBills",
        head: "Pending Bills",
        position: "center",
        minWidth: 930,
        maxWidth: 930,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 930,
            maxWidth: 930,

            elements: [
                {
                    view: "datatable",
                    id: "grdPending",
                    select: "row",
                    data: [],
                    height: 430,
                    scroll: "y",
                    columns: [
                            { header: ["Ref.Nm.", { content: "textFilter" }], id: "RefNM", width: 125, css: { 'text-align': 'left ! important' } },
                            { header: ["Voucher No", { content: "textFilter" }], id: "VouchNo", width: 90, css: { 'text-align': 'left ! important' } },
                            { header: ["Due Date", { content: "textFilter" }], id: "DueDt", width: 95, css: { 'text-align': 'left ! important' } },
                            { header: ["Pending Amt", { content: "textFilter" }], id: "PendAmt", width: 95, css: { 'text-align': 'right ! important' } },
                            { header: "", id: "CrDr", width: 40, css: { 'text-align': 'right ! important' } },
                            { header: "Select", id: "ChkSelect", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 55, css: { 'text-align': 'center ! important' } },
                            { header: ["Narration", { content: "textFilter" }], id: "Narration", width: 200, css: { 'text-align': 'right ! important' } },
                            { header: "Curr", id: "Curr", width: 80, css: { 'text-align': 'right ! important' } },
                            { header: "Forn Amt", id: "FAmt", width: 100, css: { 'text-align': 'right ! important' } },
                            { header: "TrnId", id: "TrnId", hidden: true },
                            { header: "ConvFact", id: "ConvFact", hidden: true },
                            { header: "DueDt1", id: "DueDt1", hidden: true, editor: 'date', format: webix.Date.dateToStr("%d-%m-%Y"), liveEdit: true, },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 930,
                             paddingX: 830,
                             rows: [
                                 {
                                     cols: [
                                          {
                                              view: 'button',
                                              label: 'Ok',
                                              css: "webix_primary",
                                              maxWidth: 75,
                                              inputWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      debugger;
                                                      var data = $$("grdPending").serialize();
                                                      var grdData = $$("grdBillDet").serialize();
                                                      var lenval = grdData.length;
                                                      var vRowId = $$(GridNm).getSelectedId();

                                                      var DtFilter = data.filter(function (data) {
                                                          return data.ChkSelect == "1";
                                                      });
                                                      if (DtFilter.length == 0) {
                                                          AlertMessage("Please Select the Bill !");
                                                          return;
                                                      }

                                                      if (lenval > 0) {
                                                          $$("grdBillDet").editCancel();
                                                          $$("grdBillDet").remove($$("grdBillDet").getSelectedId());
                                                          $$("grdBillDet").refresh();
                                                      }
                                                      grdData = $$("grdBillDet").serialize();
                                                      lenval = grdData.length;

                                                      TrnVal = $$(GridNm).getSelectedItem();
                                                      for (i = 0; i < data.length; i++) {

                                                          debugger;
                                                          if (data[i].ChkSelect == "1") {

                                                              var PendRefNm = $.trim(data[i].RefNM);
                                                              var vRefTyNM = "";

                                                              var dataval = $$("grdBillDet").getSelectedItem();

                                                             
                                                              var HDRCR = $.trim(data[i].CrDr);
                                                              var vRefTyId = "3";


                                                              var CurrData = ddlRefTy.filter(function (ddlRefTy) {
                                                                  return ddlRefTy.id == $.trim(vRefTyId);
                                                              });

                                                              if (CurrData.length > 0)
                                                                  vRefTyNM = CurrData[0].value;


                                                              var addrow = {
                                                                  RowId: vRowId,
                                                                  RefTyId: vRefTyId, RefTyNm: vRefTyNM, RefNm: data[i].RefNM, BillDt: data[i].DueDt1, DueDt: data[i].DueDt1,
                                                                  DrAmt: (HDRCR == "CR" ? data[i].PendAmt : ""), CrAmt: (HDRCR == "DR" ? data[i].PendAmt : ""), FornAmt: data[i].FAmt,
                                                                  Drcr: (HDRCR == "CR" ? "DR" : "CR"), OFornBAmt: '', BillConvrt: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? $.trim(TrnVal.PsRate) : data[i].ConvFact, diffAmt: '', hdnAcId: vhdnAcId, CBy: '', CDt: '', AdjBy: '', AdjDt: ''
                                                              };
                                                              $$("grdBillDet").add(addrow);



                                                          }
                                                      }


                                                      $$("grdBillDet").refresh();
                                                      fnBillTotal(GridNm);
                                                      $$('PopupPendBills').hide();
                                                  }
                                              }
                                          },
                                          {
                                              view: 'button',
                                              label: 'Close',
                                              css: "webix_primary",
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      $$('PopupPendBills').hide();
                                                  }
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

    fnLoadPendingBills(vhdnAcId,GridNm,ToPropId);

    debugger;
    var grdBillDet = $$("grdBillDet").serialize();
    var grdTranData = $$("grdGLTrnData").serialize();
    var grdPendata = $$("grdPending").serialize();
    if (grdTranData.length > 0 && grdPendata.length > 0) {

        var DtFilter = grdTranData.filter(function (grdTranData) {
            return grdTranData.RefTyId == 3;
        });

        if (DtFilter.length != 0) {
            for (k = 0; k < DtFilter.length; k++) {
                var PendFilter = grdPendata.filter(function (grdPendata) {
                    return grdPendata.RefNM == $.trim(DtFilter[k].RefNm);
                });
                if (PendFilter.length != 0) {
                    $$("grdPending").editCancel();
                    $$("grdPending").remove(PendFilter[0].id);
                    $$("grdPending").refresh();
                }
            }
        }
    }
    debugger;
    if (grdBillDet.length > 0 && grdPendata.length > 0) {

        var DtFilter = grdBillDet.filter(function (grdBillDet) {
            return grdBillDet.RefTyId == 3;
        });

        if (DtFilter.length != 0) {
            for (k = 0; k < DtFilter.length; k++) {
                var PendFilter = grdPendata.filter(function (grdPendata) {
                    return grdPendata.RefNM == $.trim(DtFilter[k].RefNm);
                });
                if (PendFilter.length != 0) {
                    $$("grdPending").editCancel();
                    $$("grdPending").remove(PendFilter[0].id);
                    $$("grdPending").refresh();
                }
            }
        }
    }


    $$("PopupPendBills").show();
}
function fnLoadPendingBills(AcId,GridNm,ToPropId) {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PENDINGBILLLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    if (GridNm == "grdToProp") dataparam["COMPID"] = "~" + ToPropId;else   dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Mode"] = $("#hdnCurMode").val();
    dataparam["Acid"] = AcId;
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    if ($("#hdnCurMode").val() == "O") dataparam["TrnId"] = $("#hdnGLTrnId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdPending").clearAll();
                $$("grdPending").parse(rowData);
                $$("grdPending").refresh();
            }
        },
        error: function () {
            
        },
        complete: function () {
            
        }
    });
    debugger;

}
function fnBillDetDataRef(GridNm) {
    debugger;
    var DataStore = [];

    var grdBillDet = [];

    if ($$("grdBillDet") != undefined)
        grdBillDet = $$("grdBillDet").serialize();

    var grdTranData = $$("grdGLTrnData").serialize();

    var grdTranDet = $$(GridNm).serialize();

    var DetSelRow = $$(GridNm).getSelectedItem();



    if (grdTranDet.length != 0) {
        var CurrSelRowId = DetSelRow.RowId;
        var CurrGridNm= DetSelRow.GridNm;
        for (i = 0; i < grdTranDet.length; i++) {

            var CurrRowId = grdTranDet[i].RowId;
            var BillDetailInd = grdTranDet[i].BILL_DETAIL_IND;
            if (BillDetailInd == "1") {

                if (grdTranData.length == 0) {

                    if (grdBillDet.length != 0) {
                        for (j = 0; j < grdBillDet.length; j++) {
                            if (CurrSelRowId == CurrRowId && CurrGridNm==GridNm) {
                                var Credit = 0;
                                var Debit = 0;

                                if ($$("ChkCredit").getValue() == "1")
                                {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                    else {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                   
                                }
                                else
                                {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    else {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                               
                                }
                                  
                            

                                var CrAmt = (grdBillDet[j].CrAmt == "" || grdBillDet[j].CrAmt == "NaN" || grdBillDet[j].CrAmt == null) ? 0 : parseFloat(grdBillDet[j].CrAmt).toFixed(2);

                                var DrAmt = (grdBillDet[j].DrAmt == "" || grdBillDet[j].DrAmt == "NaN" || grdBillDet[j].DrAmt == null) ? 0 : parseFloat(grdBillDet[j].DrAmt).toFixed(2);
                                var FornAmt = (grdBillDet[j].FornAmt == undefined || grdBillDet[j].FornAmt == "" || grdBillDet[j].FornAmt == "NaN" || grdBillDet[j].FornAmt == null) ? 0 : parseFloat(grdBillDet[j].FornAmt).toFixed(2);
                                var Drcr = grdTranDet[i].Drcr;
                                if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdBillDet[j].BillConvrt != undefined) FornAmt = Drcr == "DR" ? parseFloat(DrAmt / parseFloat(grdBillDet[j].BillConvrt).toFixed(7)).toFixed(2) : parseFloat(CrAmt / parseFloat(grdBillDet[j].BillConvrt).toFixed(7)).toFixed(2);
                                var Sno = j + 1;

                                var addrow = {
                                    Drcr: $$("ChkDebit").getValue()=="1"?"DR":"CR", ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                    BillDt: grdBillDet[j].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FornAmt,
                                    CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt, AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,

                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: grdBillDet[j].BillConvrt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdBillDet[j].BillConvrt, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId, GridNm: grdTranDet[i].GridNm
                                };

                                DataStore = DataStore.concat(addrow);
                            }

                        }
                    }
                    else {

                        if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {
                            var Credit = 0;
                            var Debit = 0;

                            if ($$("ChkCredit").getValue=="1")
                            {
                                if (GridNm == "grdFromProp")
                                {
                                    Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Debit = 0;
                                }
                                else {
                                    Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Credit = 0;
                                }
                            }
                            else
                            {
                                if (GridNm == "grdFromProp")
                                {
                                    Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Credit = 0;
                                }
                                else {
                                    Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                    Debit = 0;
                                }
                               
                            }
                             

                        

                            var addrow = {
                                Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                CBy: '', CDt: '', AdjBy: '', AdjDt: '',

                                DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId, GridNm: grdTranDet[i].GridNm,
                            };

                            DataStore = DataStore.concat(addrow);
                        }
                    }
                }
                else {

                    if (CurrSelRowId == CurrRowId && GridNm==CurrGridNm) {

                        if (grdBillDet.length != 0) {
                            for (j = 0; j < grdBillDet.length; j++) {

                                var Credit = 0;
                                var Debit = 0;
                                if ($$("ChkCredit").getValue() == "1") {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                    else
                                    {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                  
                                }
                                else {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    else {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                  
                                }

                                var CrAmt = (grdBillDet[j].CrAmt == "" || grdBillDet[j].CrAmt == "NaN" || grdBillDet[j].CrAmt == null) ? 0 : parseFloat(grdBillDet[j].CrAmt).toFixed(2);
                                var DrAmt = (grdBillDet[j].DrAmt == "" || grdBillDet[j].DrAmt == "NaN" || grdBillDet[j].DrAmt == null) ? 0 : parseFloat(grdBillDet[j].DrAmt).toFixed(2);
                                var FornAmt = (grdBillDet[j].FornAmt == "" || grdBillDet[j].FornAmt == "NaN" || grdBillDet[j].FornAmt == null || grdBillDet[j].FornAmt == undefined) ? 0 : parseFloat(grdBillDet[j].FornAmt).toFixed(2);
                                var Drcr = grdTranDet[i].Drcr;
                                if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdTranDet[i].PsRate != undefined) FornAmt = Drcr == "DR" ? parseFloat(DrAmt / parseFloat(grdTranDet[i].PsRate).toFixed(7)).toFixed(2) : parseFloat(CrAmt / parseFloat(grdTranDet[i].PsRate).toFixed(7)).toFixed(2);

                                var Sno = j + 1;

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                    BillDt: grdBillDet[j].BillDt.toString(), DrAmt: grdBillDet[j].DrAmt, CrAmt: grdBillDet[j].CrAmt, FormAmt: FornAmt,
                                    CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt, AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId, GridNm: grdTranDet[i].GridNm
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = 0;
                                var Debit = 0;
                                if ($$("ChkCredit").getValue() == "1") {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                    else {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    
                                }
                                else {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    else {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                  
                                }


                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                    CBy: '', CDt: '', AdjBy: '', AdjDt: '',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId, GridNm: grdTranDet[i].GridNm,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                    }
                    else {

                        var DtFilter = grdTranData.filter(function (grdTranData) {
                            return grdTranData.RowId == CurrRowId && grdTranData.GridNm == CurrGridNm;
                        });

                        if (DtFilter.length == 0) {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = 0;
                                var Debit = 0;
                                if ($$("ChkCredit").getValue() == "1") {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                    else {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                   
                                }
                                else {
                                    if (GridNm == "grdFromProp")
                                    {
                                        Debit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Credit = 0;
                                    }
                                    else {
                                        Credit = (grdTranDet[i].Amt == "" || grdTranDet[i].Amt == "NaN" || grdTranDet[i].Amt == null) ? 0 : parseFloat(grdTranDet[i].Amt).toFixed(2);
                                        Debit = 0;
                                    }
                                   
                                }

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: "1", RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                    CBy: '', CDt: '', AdjBy: '', AdjDt: '',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId, GridNm: grdTranDet[i].GridNm,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            for (k = 0; k < DtFilter.length; k++) {

                                
                                if (DtFilter[k].hdnAcId != "") {

                                    var CrAmt = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null) ? 0 : parseFloat(DtFilter[k].CrAmt).toFixed(2);

                                    var DrAmt = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null) ? 0 : parseFloat(DtFilter[k].DrAmt).toFixed(2);

                                    var FormAmt = (DtFilter[k].FormAmt == "" || DtFilter[k].FormAmt == "NaN" || DtFilter[k].FormAmt == null) ? 0 : parseFloat(DtFilter[k].FormAmt).toFixed(2);

                                    var addrow = {
                                        Drcr: DtFilter[k].Drcr, ACCD: DtFilter[k].ACCD, hdnAcId: DtFilter[k].hdnAcId, AcNM: DtFilter[k].AcNM, hdnCurNm: DtFilter[k].hdnCurNm,
                                        CurrId: DtFilter[k].CurrId, SlNo: DtFilter[k].SlNo, FCurBal: DtFilter[k].FCurBal, Credit: DtFilter[k].Credit, Debit: DtFilter[k].Debit, Narr: DtFilter[k].Narr,
                                        DocNo: DtFilter[k].DocNo, DocDt: DtFilter[k].DocDt,

                                        RefTyId: DtFilter[k].RefTyId, RefTyNm: DtFilter[k].RefTyNm, RefNm: DtFilter[k].RefNm, DueDt: DtFilter[k].DueDt.toString(),
                                        BillDt: DtFilter[k].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FormAmt,

                                        DETREF: DtFilter[k].DETREF, DATREF: DtFilter[k].DATREF, BILLREFSNO: DtFilter[k].BILLREFSNO, BILLREFBDT: DtFilter[k].BILLREFBDT,
                                        BILLREFVNO: DtFilter[k].BILLREFVNO, billclno: DtFilter[k].billclno, billcldt: DtFilter[k].billcldt, billudt: DtFilter[k].billudt,
                                        Nbilludt: DtFilter[k].Nbilludt,
                                        CBy: DtFilter[k].CBy, CDt: DtFilter[k].CDt, AdjBy: DtFilter[k].AdjBy, AdjDt: DtFilter[k].AdjDt,
                                        Gloss: DtFilter[k].Gloss, Fornbase: DtFilter[k].Fornbase, FornBill: DtFilter[k].FornBill, ConvrtBill: DtFilter[k].ConvrtBill,
                                        EFornamt: DtFilter[k].EFornamt, btds: DtFilter[k].btds, btdsref: DtFilter[k].btdsref, SlId: DtFilter[k].SlId, RateTy: DtFilter[k].RateTy, RowId: CurrRowId, GridNm: DtFilter[k].GridNm
                                    };

                                    DataStore = DataStore.concat(addrow);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // $$("grdGLTrnData").clearAll();
    var DtFilter = grdTranData.filter(function (grdTranData) {
        return grdTranData.GridNm == GridNm;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {


            if (DtFilter[k].hdnAcId != "") {
                $$("grdGLTrnData").editCancel();
                $$("grdGLTrnData").remove(DtFilter[k].id);
                $$("grdGLTrnData").refresh();
            }
        }
    }
    $$("grdGLTrnData").parse(DataStore);
    $$("grdGLTrnData").refresh();
}
function fnBillTotal(GridNm) {
     // debugger;
    var itemval = $$(GridNm).getSelectedItem(true);

    if (itemval.length > 0) {
        var retVal = 0;
        var DetAdmt = $$("txtBPopAmt").getValue();
        var DrAmt = 0; var CrAmt = 0;

        var grdBillDet = $$("grdBillDet").serialize();

        if (grdBillDet.length != 0) {

            for (i = 0; i < grdBillDet.length; i++) {
                DrAmt = DrAmt + (grdBillDet[i].DrAmt == "" || grdBillDet[i].DrAmt == null || grdBillDet[i].DrAmt == "NaN" ? 0 : parseFloat(grdBillDet[i].DrAmt))
                CrAmt = CrAmt + (grdBillDet[i].CrAmt == "" || grdBillDet[i].CrAmt == null || grdBillDet[i].CrAmt == "NaN" ? 0 : parseFloat(grdBillDet[i].CrAmt))
            }
        }
        var drcr = "";
        if (GridNm == "grdFromProp") drcr = $$("ChkDebit").getValue() == "1" ? "DR" : "CR";
        else drcr = $$("ChkDebit").getValue() == "1" ? "CR" : "DR";

        if (drcr == "CR")
            retVal = parseFloat(DetAdmt) - (parseFloat(CrAmt) - parseFloat(DrAmt));
        else
            retVal = parseFloat(DetAdmt) - (parseFloat(DrAmt) - parseFloat(CrAmt));

        $$("txtBDiffAmt").setValue(retVal.toFixed(2));
    }
}
function fnLoadBillDet(AcId) {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLBILLDETAILS";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["AcId"] = AcId;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
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
function fnBillDetRowAdd(option, RowId, vDRCR, hdnAcId, ConvRt, FornAmt,GridNm) {

    if ($$("grdBillDet") != undefined) {

        var grdData = $$("grdBillDet").serialize();
        var lenval = grdData.length;

        debugger;

        var vRowId = 0; var HDRCR = ""; var vhdnAcId = ""; var vConvRt = ""; var vFornAmt = "";
        if (option == 1) {
            var getval = $$(GridNm).getSelectedItem();
            vRowId = getval.RowId;
            if (GridNm == "grdFromProp") HDRCR = $$("ChkDebit").getValue() == "1" ? "DR" : "CR"; else $$("ChkDebit").getValue() == "1" ? "CR" : "DR";
            vhdnAcId = grdData[lenval - 1].hdnAcId;
            vConvRt = grdData[lenval - 1].BillConvrt;
            vFornAmt = grdData[lenval - 1].FornAmt;
        }
        else {
            HDRCR = vDRCR;
            vRowId = RowId;
            vhdnAcId = hdnAcId;
            vConvRt = ConvRt;
            vFornAmt = FornAmt;
        }

        var DefRefNm = ""; var DefRefId = "";
        DefRefId = "1";

        var addrow = {
            RowId: vRowId,
            RefTyId: DefRefId, RefTyNm: DefRefNm, RefNm: '', BillDt: $("#hdnCurrentDt").val(), DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', FornAmt: vFornAmt,
            Drcr: HDRCR, OFornBAmt: '', BillConvrt: vConvRt, diffAmt: '', hdnAcId: vhdnAcId, CBy: '', CDt: '', AdjBy: '', AdjDt: '',
        };



        if ($.trim(option) == "0") {

            if (lenval == 0) {
                $$("grdBillDet").add(addrow);
            }
        }

        if ($.trim(option) == "1") {

            if (lenval != 0) {

                for (i = 0; i < lenval; i++) {


                    var DrAmt = (grdData[i].DrAmt == "" ? 0 : parseFloat(grdData[i].DrAmt));

                    var CrAmt = (grdData[i].CrAmt == "" ? 0 : parseFloat(grdData[i].CrAmt));

                    if (DrAmt == 0 && CrAmt == 0) {
                        return false;
                    }
                }

                $$("grdBillDet").add(addrow);
            }
            else if (lenval == 0)
                $$("grdBillDet").add(addrow);
        }

        
        $$("grdBillDet").refresh();
    }
}
function fnGLSaveValidate() {
    debugger;
    if ($$("ddlVchType").getValue() == "") {
        AlertMessage("Voucher Type cannot be empty !");
        return false;
    }

    if ($$("txtVchDt").getValue() == "") {
        AlertMessage("Transaction Date cannot be empty !");
        return false;
    }

    if ($("#hdnCONTROL_AC_ID").val() == "") {
        AlertMessage("CONTROL_AC_ID cannot be empty !");
        return false;
    }

    if (!fnPropGridValidate("grdFromProp"))
        return false;

    if (!fnPropGridValidate("grdToProp"))
        return false;

    var FPAmt = fnGetTotalDiff("grdFromProp");
    var TPAmt = fnGetTotalDiff("grdToProp");
  
    var tot = parseFloat(FPAmt).toFixed(2) - parseFloat(TPAmt).toFixed(2);

    if (tot < 0)
        tot = parseFloat(tot) * -1;
    tot = parseFloat(tot).toFixed(2);
    if (parseFloat(FPAmt).toFixed(2) != parseFloat(TPAmt).toFixed(2)) {
        AlertMessage("Debit/Credit value is not  equal.Credit Difference - " + tot + " /- Found");
        return false;
    }

    return true;

}
function fnGetTotalDiff(GridNm)
{
    var grdTrnDet = $$(GridNm).serialize();
    if (grdTrnDet.length != 0) {

        var Amt = 0;

        for (i = 0; i < grdTrnDet.length; i++) {
            Amt = Amt + (grdTrnDet[i].Amt == "" || grdTrnDet[i].Amt == "NaN" || grdTrnDet[i].Amt == null ? 0 : parseFloat(grdTrnDet[i].Amt));
          
        }

      
    }

}
function fnGLInterCompTransSave() {
    debugger;
    $("#LoadDIv").show();
    if (!fnGLSaveValidate()) {
        $("#LoadDIv").hide();
        return false;
    }
   

    $('#btnSave').prop('disabled', true);


    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLINTERCOMPTRANSSAVE";
    dataparam["PROGNAME"] = "GET_GLINTERCOMPTRANS";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["cMode"] = $("#hdnCurMode").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["TrnDt"] = $$("txtVchDt").getText();
    if($$("ChkDebit").getValue()=="1") dataparam["DRCR"] ="DR" ;else  dataparam["DRCR"] ="CR" 
  //  dataparam["edbVouchNo"] = $$("txtVouchNo").getValue();

    //dataparam["divId"] = ($.trim($$("ddldivision").getValue()) != "" ? $$("ddldivision").getValue() : "");
    dataparam["txtComNar"] = $.trim($$("txtNarra").getValue()).replace(/&/g, '~');
  
   

  
   
  
   // if ($.trim($("#hdnCurMode").val()) != "N") dataparam["TrnId"] = $("#hdnGLTrnId").val();
    //dataparam["TrnNature"] = $("#hdnTrnNature").val();
 


    var GridDtSet = $$("grdFromProp").serialize();
    $.each(GridDtSet, function (key, sVal) {
        $.each(sVal, function (key, value) {

            if (value != null && value != undefined) sVal[key] = value.toString().replace(/&/g, '~');
        });
    });
    dataparam["TBLGLFROMPROPTRANS"] = GridDtSet;

    var GridDtSet = $$("grdToProp").serialize();
    $.each(GridDtSet, function (key, sVal) {
        $.each(sVal, function (key, value) {

            if (value != null && value != undefined) sVal[key] = value.toString().replace(/&/g, '~');
        });
    });
    dataparam["TBLGLTOPROPTRANS"] = GridDtSet;
    debugger;

    var gridData = $$("grdGLTrnData").serialize();
    $.each(gridData, function (key, sVal) {

        $.each(sVal, function (key, value) {

            if (value != null && value != undefined) sVal[key] = value.toString().replace(/&/g, '~'); 
        });
    });
    dataparam["TBLGLVADATA"] = gridData;


    var gridData = $$("grdGlAnalyData").serialize();
    $.each(gridData, function (key, sVal) {

        $.each(sVal, function (key, value) {

            if (value != null && value != undefined) sVal[key] = value.toString();
        });
    });
    dataparam["TBLGLANADATA"] = gridData;

  

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/GLTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                debugger;
                rowData = JSON.parse(objRes);
                if ($.trim(rowData).includes("Saved") == true) {


                   
                    AlertMessage($.trim(rowData));
                    $("#btnRef").click();
                    $("#btnNew").click();

                }
                else if ($.trim(rowData).includes("Unapproved") == true) {

                    //webix.modalbox({
                    //    title: "Confirmation !",
                    //    buttons: ["Yes", "No", "Cancel"],
                    //    width: 400,
                    //    height: 150,
                    //    text: $.trim(rowData),
                    //}).then(function (result) {
                    //    if (result == 0) {
                    //        $("#hdnUnApprMsg").val("1");
                    //        fnGLTrnSave();

                    //    }
                    //    else {
                    //        $("#hdnUnApprMsg").val("");
                    //    }
                    //});
                }
                else if ($.trim(rowData) == "Error") {

                    AlertMessage($.trim(rowData));
                    $("#LoadDIv").hide();
                    $('#btnSave').prop('disabled', false);
                   

                }
                else {
                    $("#LoadDIv").hide();
                    AlertMessage($.trim(rowData));

                }
                $('#btnSave').prop('disabled', false);

            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();

        }
    });


}
function fnPropGridValidate(GridNm) {
    var data = $$(GridNm).serialize();
    var Drcr=""
    if(GridNm=="grdFromProp")
    {
        if ($$("ChkDebit").getValue() == "1")  Drcr = "DR";
        else  Drcr = "CR";
    }
    else
    {
        if ($$("ChkDebit").getValue() == "1")  Drcr = "CR";
        else  Drcr = "DR";    
    }
    if (data.length != 0) {

        for (i = 0; i < data.length; i++) {
            if (data[i].PropNm == "") {
                AlertMessage("Property cannot be empty !");
                return false;
               
            }


            if (data[i].hdnAcId == "") {

                if (i == 0 && data[i].AcNM == "") {
                    AlertMessage("Account Name cannot be empty !");
                    return false;
                }
                else {
                    AlertMessage("Invalid Account !");
                    return false;
                }
            }



          
            var Amt = (data[i].Amt != "" && data[i].Amt != "NaN" && data[i].Amt != null ? parseFloat(data[i].Amt) : 0);

          
            if ($$("ChkDebit").getValue()=="1") {
                if (Amt == 0) {
                    if (GridNm == "grdFromProp") AlertMessage("Debit cannot be zero value !");
                    else AlertMessage("Credit cannot be zero value !");
                    return false;
                }
            }
                

            if ($$("ChkCredit").getValue() == "1") {
                if (Amt == 0) {
                    if (GridNm == "grdFromProp") AlertMessage("Credit cannot be zero value !");
                    else AlertMessage("Debit cannot be zero value !");
                    return false;
                }
            }
            debugger;
            var CurrId = $.trim(data[i].CurrId);
            if (CurrId != $.trim($("#hdnBaseCurrId").val()) && CurrId != "" && ($("#hdnMULTI_CURRENCY_IND").val() == "1")) {
                var PsRate = $.trim(data[i].PsRate);
                var FornAmt = $.trim(data[i].FornAmt);
                var vforn = parseFloat(PsRate * FornAmt);
                var vbase = "";
                //if ($$("ChkDebit").getValue() == "1") vbase = data[i].Debit;
                //if ($$("ChkCredit").getValue() == "1") vbase = data[i].Credit;
                vbase = data[i].Amt;
                var Diff = parseFloat(vbase) - parseFloat(vforn);
                var Diff1 = parseFloat(vforn) / parseFloat(PsRate);
                if ($.trim(Diff).includes("-") == true) Diff = Diff * -1;
                if ($.trim(Diff1).includes("-") == true) Diff1 = Diff1 * -1;
                if ($.trim(FornAmt).includes("-") == true) FornAmt = FornAmt * -1;
                if (parseFloat(Diff).toFixed(2) > 1 || parseFloat(Diff1).toFixed(2) != parseFloat(FornAmt).toFixed(2)) {
                    AlertMessage("Amount not Matching with Forn Amt");
                    return false;
                }
            }
            if ($.trim(data[i].BILL_DETAIL_IND) == "1") {


                var grdTranData = $$("grdGLTrnData").serialize();
                var DtFilter = grdTranData.filter(function (grdTranData) {
                    return grdTranData.RowId == data[i].RowId && grdTranData.GridNm==GridNm ;
                });
                var TotDebit = 0;
                var TotCredit = 0;
                if (DtFilter.length != 0) {
                    for (k = 0; k < DtFilter.length; k++) {
                        var Cr = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);
                        var Dr = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);
                        TotCredit = parseFloat(TotCredit) + parseFloat(Cr);
                        TotDebit = parseFloat(TotDebit) + parseFloat(Dr);
                        if (DtFilter[k].RefTyId == "") {
                            AlertMessage("Pending Bills are not settled properly for " + $.trim(data[i].AcNM) + " Account");
                            return false;
                        }

                    }
                  
                    if (Drcr == "DR" && parseFloat(TotDebit).toFixed(2) != parseFloat(Amt).toFixed(2)) {
                        AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                        return false;
                    }
                    else if (Drcr == "CR" && parseFloat(TotCredit).toFixed(2) != parseFloat(Amt).toFixed(2)) {
                        AlertMessage("Debit/Credit value does not match with the Pending Bill Settlement(s) made.");
                        return false;
                    }
                }
                else {
                    AlertMessage("Pending Bills are not settled properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }
            }


            if ($.trim(data[i].AnaAppl) == "1") {
                var vBAmt = "0";
                var grdGlAnalyData = $$("grdGlAnalyData").serialize();
                var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
                    return grdGlAnalyData.RowId == data[i].RowId && grdGlAnalyData.GridNm == GridNm;
                });
                if (DtFilter.length != 0) {
                    for (k = 0; k < DtFilter.length; k++) {


                        if ($.trim(DtFilter[k].Amount) == "" || DtFilter[k].Amount == "NaN" || DtFilter[k].Amount == null || parseFloat(DtFilter[k].Amount) == 0) {
                            AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                            return false;
                        }

                        var AnalID1 = (DtFilter[k].AnalID1 == "" ? "" : $.trim(DtFilter[k].AnalID1));
                        var AnalID2 = (DtFilter[k].AnalID2 == "" ? "" : $.trim(DtFilter[k].AnalID2));
                        var AnalID3 = (DtFilter[k].AnalID3 == "" ? "" : $.trim(DtFilter[k].AnalID3));
                        var AnalID4 = (DtFilter[k].AnalID4 == "" ? "" : $.trim(DtFilter[k].AnalID4));
                        var AnalID5 = (DtFilter[k].AnalID5 == "" ? "" : $.trim(DtFilter[k].AnalID5));
                        var AnalID6 = (DtFilter[k].AnalID6 == "" ? "" : $.trim(DtFilter[k].AnalID6));
                        var AnalID7 = (DtFilter[k].AnalID7 == "" ? "" : $.trim(DtFilter[k].AnalID7));
                        var AnalID8 = (DtFilter[k].AnalID8 == "" ? "" : $.trim(DtFilter[k].AnalID8));
                        var AnalID9 = (DtFilter[k].AnalID9 == "" ? "" : $.trim(DtFilter[k].AnalID9));
                        var AnalID10 = (DtFilter[k].AnalID10 == "" ? "" : $.trim(DtFilter[k].AnalID10));


                        if (AnalID1 == "" && AnalID2 == "" && AnalID3 == "" && AnalID14 == "" && AnalID5 == "" && AnalID6 == "" && AnalID7 == "" && AnalID8 == "" && AnalID9 == "" && AnalID10 == "") {
                            AlertMessage("Analysis code not defined");
                            return false;
                        }
                        if (AnalID1 == "" && data[i].ChkAind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 1");
                            return false;
                        }
                        if (AnalID2 == "" && data[i].ChkBind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 2");
                            return false;
                        }
                        if (AnalID3 == "" && data[i].ChkCind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 3");
                            return false;
                        }
                        if (AnalID4 == "" && data[i].ChkDind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 4");
                            return false;
                        }
                        if (AnalID5 == "" && data[i].ChkEind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 5");
                            return false;
                        }
                        if (AnalID6 == "" && data[i].ChkFind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 6");
                            return false;
                        }
                        if (AnalID7 == "" && data[i].ChkLind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 7");
                            return false;
                        }
                        if (AnalID8 == "" && data[i].ChkMind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 8");
                            return false;
                        }
                        if (AnalID9 == "" && data[i].ChkNind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 9");
                            return false;
                        }
                        if (AnalID10 == "" && data[i].ChkOind == "1") {
                            AlertMessage("Analysis  Code not defined for Level 10");
                            return false;
                        }
                        vBAmt = parseFloat(vBAmt) + parseFloat(DtFilter[k].Amount);



                    }
                }
                else {
                    AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }
                if ((parseFloat(vBAmt).toFixed(2) != parseFloat(Amt).toFixed(2) && parseFloat(Amt).toFixed(2) > 0) ) {
                    AlertMessage("Analysis Code are not Adjusted properly for " + $.trim(data[i].AcNM) + " Account");
                    return false;
                }


            }



        }
    }
    return true;
}

function fnClearValue() {

    $("#hdnCurMode").val("N");
    $$("txtVchDt").setValue("");
   
    $$("txtNarra").setValue("");

   
    $$("grdFromProp").editStop();
    $$("grdFromProp").clearAll();
    $$("grdFromProp").refresh();

    $$("grdToProp").editStop();
    $$("grdToProp").clearAll();
    $$("grdToProp").refresh();



    $$("grdGLTrnData").clearAll();
    $$("grdGLTrnData").refresh();

    if ($$("grdBillDet") != undefined) {
        $$("grdBillDet").clearAll();
        $$("grdBillDet").refresh();
    }
    $$("grdGlAnalyData").clearAll();
    $$("grdGlAnalyData").refresh();

    if ($$("grdGlAnaly") != undefined) {
        $$("grdGlAnaly").clearAll();
        $$("grdGlAnaly").refresh();
    }

   
   
  
    $("#hdnUnApprMsg").val("");
    $("#hdnFrmPropRowId").val("");
    $("#hdnToPropRowId").val("");
    $$("ddlVchType").setValue("");
    $("#hdnDefGlTrnTy").val("");
  //  $("#hdnEditCur").val("1");
    //$$("TxtSalePurRate").setValue("");
    //$$("TxtFornAmt").setValue("");
    //$$("TxtSalePurRate").hide();
    //$$("TxtFornAmt").hide();
    //$$("BtnSalePur").hide();
    //$("#hdnEditCur").val("");

}



