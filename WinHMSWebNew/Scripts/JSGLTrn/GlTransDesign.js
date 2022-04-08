
var app = angular.module('GLTApp', ['webix']);
var Headers = [];
var fnGLtrnType = [];
//app.controller("GLTransController", function ($scope) {
function FormLoad() {
    debugger;
    var searchicon = "<span class='webix_icon wxi-search'></span>";

    var Delicon = "<span class='webix_icon wxi-trash'></span>";

    //-------------------------------------------------------------------------

    var DivLoad = [];
    var DefLoad = fnGlTrnDefLoad();

    ////////var Analysis = fnDisplayAnal("");
    ////////var Headers = Analysis.TBLHEAD;

    Headers = DefLoad.TBLHEAD;

    $("#LoadDIv").hide();

   ////// //fnGlControl();
   ////// //fnMstCompany();
   ////////fnAccountDt("1");

    //var ddlcurrency = fnLoadCurrency();
    var ddlcurrency = DefLoad.TBLCURRENCY;
    ////var fnGLtrnType = fnLoadGLTrnType();
    fnGLtrnType = DefLoad.TBLTRNTY;

    $("#hdnDefGlTrnTy").val("3")

    if ($("#hdnC_DIV_APPL").val() == "1")
        DivLoad = DefLoad.TBLDIV; //fnLoadDivision("1");

    //$scope.GlTransaction = {
    webix.ui({
        id: "GlTransaction",
        container: 'DivForm',
        view: 'form',
        //minWidth: 1310,
        //maxWidth: 1310,
        //paddingX: 50,
        minWidth: 1000,
        maxWidth: 5000,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               rows: [
                                   {
                                       view: "combo",
                                       id: "ddlTrnType",
                                       label: "Transaction Type",
                                       labelAlign: "left",
                                       labelWidth: 110,
                                       inputWidth: 280,
                                       width: 400,
                                       options: fnGLtrnType,
                                       disabled: true,
                                       //value: $("#hdnDefGlTrnTy").val(),
                                       on: {
                                           onChange: function (newval, oldval) {
                                               $("#hdnDefGlTrnTy").val(newval);
                                               fnLoadGLTrnTyInd();
                                           }
                                       }
                                   },
                                   {
                                       rows: [
                                           {
                                               cols: [
                                                   {
                                                       view: "datepicker",
                                                       id: "txtFrmDate",
                                                       disable: true,
                                                       stringResult: true,
                                                       label: "Transaction Date",
                                                       format: "%d/%m/%Y",
                                                       value: $("#hdnCurrentDt").val(),
                                                       labelAlign: "left",
                                                       labelWidth: 110,
                                                       inputWidth: 250,
                                                       width: 400,
                                                   },
                                                   {
                                                       id: "btnBill",
                                                       view: 'button',
                                                       label: 'Bill',
                                                       inputWidth: 100,
                                                       labelWidth: 30,
                                                       width: 130,
                                                       hidden: true,
                                                       on: {
                                                           onItemClick: function () {

                                                           }
                                                       }
                                                   }
                                               ]
                                           }
                                       ]
                                   },
                                   {
                                       cols: [
                                           {
                                               view: "text",
                                               id: "txtVouchNo",
                                               stringResult: true,
                                               label: "Voucher No",
                                               labelAlign: "left",
                                               labelWidth: 110,
                                               inputWidth: 250,
                                               width: 250,
                                               disabled: true,
                                               attributes: { maxlength: 9 },
                                               pattern: { mask: "#########", allow: /[0-9]/g },
                                           },
                                           {
                                               view: "combo",
                                               id: "ddlClass",
                                               value: "",
                                               label: "Class",
                                               labelAlign: "Right",
                                               labelWidth: 60,
                                               inputWidth: 170,
                                               hidden: true,
                                               width: 170,
                                               //options: fnClasLoad,
                                               on: {
                                                   onChange: function (newval, oldval) {
                                                   }
                                               }
                                           },


                                       ]
                                   }
                               ]
                           },
                           {
                               paddingX: 100,
                               rows: [
                                   {
                                       cols: [
                                           {
                                               view: "combo",
                                               id: "ddldivision",
                                               value: $("#hdnDivDef").val(),
                                               label: "Division",
                                               labelAlign: "left",
                                               labelWidth: 120,
                                               inputWidth: 320,
                                               width: 400,
                                               hidden: ($("#hdnC_DIV_APPL").val() == "1" ? false : true),
                                               options: DivLoad,
                                               on: {
                                                   onChange: function (newval, oldval) {
                                                   }
                                               }
                                           },
                                           {
                                               id: "btnAttach",
                                               view: 'button',
                                               label: 'Attachment',
                                               inputWidth: 100,
                                               labelWidth: 30,
                                               width: 130,
                                               hidden: ($("#hdnAttachAppl").val() == "1" ? true : true),
                                               on: {
                                                   onItemClick: function () {

                                                   }
                                               }
                                           },
                                           {
                                               id: "btnRecur",
                                               view: 'button',
                                               label: 'Recurring',
                                               inputWidth: 100,
                                               labelWidth: 30,
                                               width: 130,
                                               hidden: true,
                                               on: {
                                                   onItemClick: function () {
                                                   }
                                               }
                                           },
                                           {
                                               view: "label",
                                               id: "lblHead",
                                               label: "",
                                               inputWidth: 100,
                                               width: 100,
                                               css: "ForeRedColor",
                                           }
                                       ]
                                   },
                                  {
                                      cols: [
                                          {
                                              view: "textarea",
                                              id: "txtNarra",
                                              stringResult: true,
                                              label: "Voucher Narration",
                                              labelAlign: "left",
                                              labelWidth: 120,
                                              inputWidth: 550,//700
                                              width: 550,
                                              attributes: { maxlength: 250 },
                                          },



                                      ]

                                  },


                                  {
                                      cols: [
                                           {
                                               view: "combo",
                                               id: "ddlRcptTy",
                                               label: "Rcpt Tytpe",
                                               labelAlign: "Right",
                                               labelWidth: 120,
                                               inputWidth: 280,
                                               width: 300,
                                               hidden: ($("#hdnRcptInd").val() == "1" ? false : true),
                                               on: {
                                                   onChange: function (newval, oldval) {

                                                       $$("txtBank").setValue("");
                                                       $$("txtBranch").setValue("");
                                                       $("#hdnBankId").val("");

                                                       if ($.trim(newval) != "NONE") {
                                                           $$("txtBank").enable();
                                                           $$("btnBanksrch").enable();
                                                           $$("txtBranch").enable();
                                                       }
                                                       else {
                                                           $$("txtBank").disable();
                                                           $$("btnBanksrch").disable();
                                                           $$("txtBranch").disable();
                                                       }
                                                   }
                                               }
                                           },
                                           {
                                               view: "text",
                                               id: "txtBank",
                                               stringResult: true,
                                               label: "Bank",
                                               hidden: ($("#hdnRcptInd").val() == "1" ? false : true),
                                               labelWidth: 40,
                                               labelAlign: "Right",
                                               inputWidth: 230,
                                               readonly: true,
                                               disabled: true,
                                               minwidth: 230,
                                               width: 230,
                                           },
                                            {
                                                view: "button",
                                                id: 'btnBanksrch',
                                                hidden: ($("#hdnRcptInd").val() == "1" ? false : true),
                                                minWidth: 350,
                                                labelWidth: 0,
                                                width: 40,
                                                inputWidth: 30,
                                                height: 28,
                                                type: 'icon',
                                                icon: 'wxi-search',
                                                css: "Ar_search",
                                                on: {
                                                    onItemClick: function () {

                                                        fnCallBankSearch();
                                                    }
                                                }
                                            },
                                            {
                                                view: "text",
                                                id: "txtBranch",
                                                stringResult: true,
                                                label: "Branch",
                                                labelAlign: "Right",
                                                hidden: ($("#hdnRcptInd").val() == "1" ? false : true),
                                                labelWidth: 60,
                                                disabled: true,
                                                inputWidth: 230,
                                                minwidth: 230,
                                                width: 230,
                                            },

                                      ]
                                  },
                                  {
                                      cols: [
                                            {
                                                width: 700,
                                            },
                                            {
                                                id: "btnTDS",
                                                view: 'button',
                                                label: 'TDS',
                                                inputWidth: 60,
                                                labelWidth: 30,
                                                width: 70,
                                                hidden: true,
                                                on: {
                                                    onItemClick: function () {
                                                    }
                                                }
                                            },
                                            {
                                                id: "btnOtherDed",
                                                view: 'button',
                                                label: 'Other Deductions',
                                                inputWidth: 130,
                                                labelWidth: 30,
                                                width: 150,
                                                hidden: true,
                                                on: {
                                                    onItemClick: function () {
                                                    }
                                                }
                                            },
                                            {
                                                id: "btnAddress",
                                                view: 'button',
                                                label: 'Address',
                                                inputWidth: 100,
                                                labelWidth: 30,
                                                width: 150,
                                                hidden: true,
                                                on: {
                                                    onItemClick: function () {
                                                    }
                                                }
                                            },
                                            {
                                                id: "btnGST",
                                                view: 'button',
                                                label: 'GST',
                                                inputWidth: 65,
                                                labelWidth: 30,
                                                width: 400,
                                                hidden: true,
                                                on: {
                                                    onItemClick: function () {
                                                    }
                                                }
                                            },


                                      ]
                                  }
                               ]
                           }
                       ]
                   },
                   {
                       paddingY: 5,
                       cols: [
                           {
                               view: "datatable",
                               id: "grdGLTransDet",
                               select: "row",
                               data: [],
                               //width: 1250,
                               //height: 330,
                               editable: true,
                               footer: true,
                               navigation: true,
                               autoConfig: true,
                               scroll: "xy",
                               css: "webix_header_border",
                               scheme: {
                                   $change: function (item) {
                                       debugger;
                                       var rowid = item.id;
                                       
                                       if ($("#hdnGSTAppl").val() == "1" || $("#hdnInGstInd").val() == "1" || $("#hdnK_TAX").val() == "4" || $("#hdnK_TAX").val() == "3" || $("#hdnK_TAX").val() == "2" || $("#hdnM_TAX").val() == "4") {
                                           var TBLDATA = fnGLTrnAcIdWiseLoad(item.hdnAcId);
                                           if (TBLDATA != "" && TBLDATA != "[]") item.btnGST = TBLDATA.TBLGSTCOL; else item.btnGST = ""; 
                                         
                                       }
                                       else {
                                           item.btnGST = "";
                                       }
                                       if ($.trim(item.btnGST) != "") {
                                           $$("grdGLTransDet").addCellCss(rowid, "btnGST", "RowHighlight");
                                       }
                                       $$("grdGLTransDet").refresh();

                                   },
                               },
                               columns: [
                                       { header: "D/C", id: "Drcr", width: 50, editor: 'combo', liveEdit: true, collection: function (id) { return [ { value: "DR", id: "DR" },{ value: "CR", id: "CR" },] }, css: { 'text-align': 'center ! important' } },
                                       { header: "AC CD", id: "ACCD", width: 90, css: { 'text-align': 'left ! important' } },
                                       { header: "AC ID", id: "hdnAcId", width: 90, hidden: true },
                                       {
                                           header: "Account Name", id: "AcNM", width: 300, css: { 'text-align': 'left ! important' },
                                           footer: { text: "Total" }
                                       },
                                       { header: "Currency", id: "CurrId", hidden: true, width: 100, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlcurrency; } },
                                       { header: "Employee", id: "hdnCurNm", width: 150, hidden: true, css: { 'text-align': 'left ! important' } },
                                       { header: "CurBal", id: "CurBal", hidden: true },
                                       { header: "FCurBal", id: "FCurBal", hidden: true },
                                        {
                                            header: "Debit", id: "Debit", width: 130, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                            footer: { content: "summColumn" }, format: webix.i18n.numberFormat,
                                            //format: function (value) {
                                            //    return fnCurrFormat(value);
                                            //},
                                            //editFormat: function (value) {
                                            //    return webix.Number.parse(value, {
                                            //        groupDelimiter: "",
                                            //        groupSize: '',
                                            //        decimalDelimiter: ".",
                                            //        decimalSize: $("#CURRENCY_DECIMLIMIT").val()

                                            //    });
                                            //},
                                        },
                                       {
                                           header: "Credit", id: "Credit", width: 130, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                           footer: { content: "summColumn" },format: webix.i18n.numberFormat,
                                           //format: function (value) {
                                           //    return fnCurrFormat(value);
                                           //},
                                           //editFormat: function (value) {
                                           //    return webix.Number.parse(value, {
                                           //        groupDelimiter: "",
                                           //        groupSize: '',
                                           //        decimalDelimiter: ".",
                                           //        decimalSize: $("#CURRENCY_DECIMLIMIT").val()

                                           //    });
                                           //},
                                       },

                                       { header: "Narration", id: "Narr", width: 230, css: { 'text-align': 'left ! important' } },

                                     
                                       { header: "Document No", id: "DocNo", width: 110, editor: 'text', liveEdit: true, hidden: true, css: { 'text-align': 'left ! important' } },
                                       { header: "Document Dt", id: "DocDt", hidden: true, width: 110, stringResult: true, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                       { header: "Analysis", id: "btnAnalySrch", hidden: true, width: 60, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                       { header: "PsRate", id: "PsRate", hidden: true, },
                                       { header: "FornAmt", id: "FornAmt", hidden: true, },
                                       { header: "RateTy", id: "RateTy", hidden: true, },
                                       { header: "SNo", id: "SNo", hidden: true, },
                                       { header: "ActCR", id: "ActCR", hidden: true, },
                                       { header: "ActDR", id: "ActDR", hidden: true, },
                                       { header: "ReConInd", id: "ReConInd", hidden: true, },
                                       { header: "ReConDt", id: "ReConDt", hidden: true, },
                                       { header: "LKAcId", id: "LKAcId", hidden: true, },
                                       { header: "Cdt", id: "Cdt", hidden: true, },
                                       { header: "ApprBy", id: "ApprBy", hidden: true, },
                                       { header: "VNo", id: "VNo", hidden: true, },
                                       { header: "ProjId", id: "ProjId", hidden: true, },
                                       { header: "Project ", id: "ProjNm", width: 150, hidden: ($("#hdnProjApplInd").val() == "1" ? false : true), css: { 'text-align': 'left ! important' } },
                                       { header: "", id: "btnProjSrch", width: 40, template: searchicon, hidden: ($("#hdnProjApplInd").val() == "1" ? false : true), css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                       { header: "TrInd", id: "TrInd", hidden: true, },
                                       { header: "SNo", id: "SN1", hidden: true, },
                                       { header: "TdInd", id: "TdInd", hidden: true, },
                                       { header: "", id: "btnCostSrch", width: 40, template: searchicon, hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                       { header: "SNo", id: "SN1", hidden: true, },
                                       { header: "Gainl", id: "Gainl", hidden: true, },
                                       { header: "vatInd", id: "vatInd", hidden: true, },
                                       { header: "CBy", id: "CBy", hidden: true, },
                                       { header: "apprdt", id: "apprdt", hidden: true, },
                                       { header: ($("#hdnInGstInd").val() == "1" ? "GST" : $("#hdnTAXCap").val()), id: "btnGST", width: 40,  hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                       { header: "ReconBy", id: "ReconBy", hidden: true, },
                                       { header: "hdnFAmt", id: "hdnFAmt", hidden: true, },
                                       { header: "", id: "btnDet", width: 40, template: searchicon, hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                       { header: "AcTy", id: "AcTy", hidden: true, },
                                       { header: "PostInd", id: "PostInd", hidden: true, },
                                       { header: "RowId", id: "RowId", hidden: true, },
                                       { header: "PostTy", id: "PostTy", hidden: true, },
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
                                        { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                                           { header: "AnaAppl", id: "AnaAppl", hidden: true },
                                          { header: "", id: "btnGDel", hidden: true },

                               ],
                               on: {
                                 
                                   'onBeforeEditStart': function (id) {
                                    //   debugger;
                                       var getval = this.getItem(id);

                                       if (id.column == "Credit") {
                                           if (getval.Drcr == "DR"  ) return false;
                                           else return true;
                                       }
                                       if (id.column == "Debit") {
                                           if (getval.Drcr == "CR" ) return false;
                                           else return true;
                                       }
                                 
                                   },
                                   'onItemClick': function (id, e, node, trg) {
                                       var getval = this.getItem(id.row);
                                       var drcr = getval.Drcr;
                                       drcr = drcr.toUpperCase();
                                       getval.Drcr = drcr;
                                       this.refresh();
                                       $("#hdnGridClickCol").val(id.column);

                                       if (id.column == "btnProjSrch" || id.column == "Debit" || id.column == "Credit" || id.column == "DocNo" || id.column == "DocDt") {
                                           if (getval.hdnAcId == "") {
                                               AlertMessage("Account Name cannot be empty !");
                                               $$("grdGLTransDet").refresh();
                                               return false;
                                           }
                                       }

                                       if (id.column == 'btnGDel') {
                                           debugger;
                                           $$("grdGlAnaly").hide();
                                           fnDeleteRowBillDetData();
                                           fnDeleteRowAnaData();
                                           fnDeleteRowGstDetData();
                                           $$("grdGLTransDet").editCancel();
                                           $$("grdGLTransDet").remove($$("grdGLTransDet").getSelectedId());
                                           $$("grdGLTransDet").refresh();
                                           $$("grdGLTransDet").refresh();
                                           var dsGlTrans = $$("grdGLTransDet").serialize();
                                           if (dsGlTrans.length == 0) {
                                               fnMainDetRowAdd('0');
                                           }





                                       }
                                       else if (id.column == "Narr" ) {

                                           var itemval = $$("grdGLTransDet").getSelectedItem();
                                           $$("txtLineNarr").setValue($.trim(itemval.Narr));
                                           $$("NarrPopup").show();
                                           debugger;
                                           webix.UIManager.setFocus($$("txtLineNarr"));
                                       
                                       }
                                       else if (id.column == 'ACCD' || id.column == 'AcNM'   ) {
                                         
                                           debugger;
                                           fnCallPopupAccontSrch();
                                           fnLoadAccountSrch($.trim(getval.Drcr));
                                           $$("PopupAccNmSrch").show();

                                       }
                                       else if (id.column == "btnProjSrch") {
                                           fnCallProjSearch();
                                       }
                                       else if (id.column == "btnGST") {
                                           if ($.trim(getval.btnGST) != ""    )
                                           {
                                               fnCallVatPopup($.trim(getval.Drcr), $.trim(getval.hdnAcId) );
                                               fnCallPopupGstPartySrch();
                                               fnLoadDefGst();
                                               fnCallGstdata();
                                               $$("GstPop").show();
                                              
                                              
                                           }
                                         
                                       }
                                       else if (id.column == "Debit") {
                                       
                                       }
                                       else if (id.column == "Credit") {
                                         
                                        
                                       }
                                       if ($.trim(getval.hdnAcId) != "" && $.trim(getval.AnaAppl) == "1") {
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
                                           if (id.column != 'btnGDel') {
                                               fnCallAnaysis($.trim(getval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);
                                               if ($.trim(getval.AnaAppl) == "1") {
                                                   if (parseFloat(getval.Credit) != 0 || parseFloat(getval.Debit) != 0) {
                                                       var dsGlAna = $$("grdGlAnaly").serialize();

                                                       if (dsGlAna.length == 1) {
                                                           var id = $$("grdGlAnaly").getFirstId();
                                                           var getval1 = $$("grdGlAnaly").getItem(id);
                                                           if (parseFloat(getval.Credit) > 0) getval1.Amount = getval.Credit == "" ? "0" : parseFloat(getval.Credit);
                                                           else getval1.Amount = getval.Debit == "" ? "0" : parseFloat(getval.Debit);
                                                           $$("grdGlAnaly").refresh();
                                                           $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(getval1.Amount).toFixed(2);
                                                           webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                                           webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                                           //$$("grdGlAnaly").getColumnConfig("Amount").header[0].css = { "background": "#24A259" };
                                                           $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderGrClr";
                                                           $$("grdGlAnaly").refreshColumns();
                                                       }

                                                   }
                                               }

                                           }


                                       }
                                       else {
                                           $$("grdGlAnaly").hide();
                                         
                                       }


                                   },
                                   'onAfterEditStart': function (id) {
                                       var getColumn = id.column;
                                       SelectedColumn = getColumn;
                                       if (getColumn == "Credit" || getColumn == "Debit") {
                                           this.getEditor().getInputNode().setAttribute("maxlength", 14);
                                           this.getEditor().getInputNode().style.textAlign = "right";
                                       }
                                       if (getColumn == "Drcr" ) {
                                           this.getEditor().getInputNode().setAttribute("maxlength", 2);
                                         
                                       }
                                       if (getColumn == "DocNo") {
                                           this.getEditor().getInputNode().setAttribute("maxlength", 40);
                                       }
                                   },
                                   'onLiveEdit': function (state, editor) {
                                       //debugger;
                                       var columnId = editor.column;
                                       var Row = editor.row;
                                       var SelRow = this.getItem(Row);


                                       if (columnId == "Credit") {
                                           var value = state.value;
                                           value = parseFloat(state.value);
                                           if (value < 0) value = (value * -1);
                                           if (value > 9999999999.999) {//99999999.99
                                               SelRow.Credit = state.old;
                                               editor.setValue(state.old);
                                               this.editCancel();
                                               //editor.focus();
                                               this.editCell(Row, "Credit", true, true)
                                               editor = this.getEditor();
                                               editor.getInputNode().selectionStart = state.old.length;

                                           }
                                           this.updateItem(Row, SelRow);
                                           this.refresh(Row);
                                       }
                                       if (columnId == "Debit") {
                                           debugger;
                                           var value = state.value;
                                           value = value.replace(/,/g, '');
                                           value = parseFloat(state.value);
                                           if (value < 0) value = (value * -1);
                                           if (value > 9999999999.999) {//99999999.99
                                               SelRow.Debit = state.old;
                                               editor.setValue(state.old);
                                               this.editCancel();
                                               //editor.focus();
                                               this.editCell(Row, "Debit", true, true)
                                               editor = this.getEditor();
                                               editor.getInputNode().selectionStart = state.old.length;

                                           }
                                           this.updateItem(Row, SelRow);
                                           this.refresh(Row);
                                       }
                                   },
                                   'onEditorChange': function (id, value, row) {
                                       debugger;
                                       var getval = this.getItem(id);
                                      
                                       if (id.column == 'CurrId') {
                                           getval.hdnCurNm = value;
                                       }
                                       if (id.column == 'Drcr') {
                                       
                                           getval.Credit = "";
                                           getval.Debit = "";
                                           fnDeleteRowBillDetData();
                                           fnDeleteRowAnaData();
                                           fnDeleteRowGstDetData();
                                           getval.AnaAppl = "";
                                           getval.BILL_DETAIL_IND = "";
                                           getval.btnGST = "";
                                           getval.hdnAcId = "";
                                           getval.ACCD = "";
                                           getval.AcNM = "";
                                           getval.ChkAind = "";
                                           getval.ChkBind = "";
                                           getval.ChkCind = "";
                                           getval.ChkDind = "";
                                           getval.ChkEind = "";
                                           getval.ChkFind = "";
                                           getval.ChkLind = "";
                                           getval.ChkMind = "";
                                           getval.ChkNind = "";
                                           getval.ChkOind = "";
                                           getval.DocNo = "";
                                           getval.DocDt = "";
                                           this.refresh();
                                        
                                       }
                                      
                                     
                                       if (id.column == 'Credit' || id.column == 'Debit') {
                                           if (getval.AnaAppl == "1") {
                                               if (parseFloat(getval.Credit) != 0 || parseFloat(getval.Debit) != 0) {
                                                   var dsGlAna = $$("grdGlAnaly").serialize();

                                                   if (dsGlAna.length == 1) {
                                                       var id = $$("grdGlAnaly").getFirstId();
                                                       var getval1 = $$("grdGlAnaly").getItem(id);
                                                       if (parseFloat(getval.Credit) > 0) getval1.Amount = parseFloat(getval.Credit);
                                                       else getval1.Amount = parseFloat(getval.Debit);
                                                       $$("grdGlAnaly").refresh();
                                                       $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(getval1.Amount).toFixed(2);
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                                       //$$("grdGlAnaly").getColumnConfig("Amount").header[0].css = { "background": "#24A259" };
                                                       $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderGrClr";
                                                     
                                                       $$("grdGlAnaly").refreshColumns();
                                                   }

                                               }
                                           }

                                       }
                                       if (id.column == 'DocNo') {

                                           if( getval.DocDt=="")getval.DocDt = $("#hdnCurrentDt").val();
                                           this.refresh();

                                       }
                                   },
                                 
                                   'onKeyPress': function (e, id) {
                                       //  debugger;
                                       var itemval = $$("grdGLTransDet").getSelectedItem();
                                       var LastId = $$("grdGLTransDet").getLastId();
                                       var A_IND = $.trim(itemval.ChkAind);
                                       var B_IND = $.trim(itemval.ChkBind);
                                       var C_IND = $.trim(itemval.ChkCind);
                                       var D_IND = $.trim(itemval.ChkDind);
                                       var E_IND = $.trim(itemval.ChkEind);
                                       var F_IND = $.trim(itemval.ChkFind);
                                       var L_IND = $.trim(itemval.ChkLind);
                                       var M_IND = $.trim(itemval.ChkMind);
                                       var N_IND = $.trim(itemval.ChkNind);
                                       var O_IND = $.trim(itemval.ChkOind);
                                       var BILL_DETAIL_IND = $.trim(itemval.BILL_DETAIL_IND);
                                       var charCode = (e.which) ? e.which : event.keyCode;
                                       $("#hdnBillDetInd").val(BILL_DETAIL_IND);
                                       if ($.trim($("#hdnGridClickCol").val()) == "Credit") {
                                           var ddlRefTy = "";
                                           if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                               return true
                                           }
                                           if ((charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) || charCode == 13) {
                                               if ((e == 66 || e == 13) && $("#hdnBillDetInd").val() == "1" ) {
                                                   if (BILL_DETAIL_IND == "1") {
                                                       var BillLoad = fnLoadBillDet(itemval.hdnAcId);
                                                       var BillDetInd = BillLoad.TBLBILLDETIND;
                                                       if (BillDetInd.length > 0)
                                                           $("#hdnBillDetInd").val(BillDetInd[0].BILL_DETAIL_IND);
                                                       ddlRefTy = BillLoad.TBLBREFLOAD;
                                                   }

                                                   var Debit = (itemval.Debit == "" ? 0 : parseFloat(itemval.Debit));

                                                   var Credit = (itemval.Credit == "" ? 0 : parseFloat(itemval.Credit));

                                                   if (Debit != 0 || Credit != 0) {
                                                       $$("grdGLTransDet").refresh();
                                                       fnCallBillDetails(ddlRefTy);
                                                       return false;
                                                   }
                                                   else
                                                       return false;
                                               }
                                               else {
                                                   debugger;
                                                   if (e == 40 && LastId == itemval.id ) {
                                                       fnMainDetRowAdd('1');
                                                       if ($.trim(itemval.hdnAcId) != "" && $.trim(itemval.AnaAppl) == "1") {
                                                           fnCallAnaysis($.trim(itemval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);

                                                       }
                                                       else {
                                                           $$("grdGlAnaly").hide();
                                                         
                                                       }

                                                   }
                                                   //$$("grdGLTransDet").select($$("grdGLTransDet").getSelectedId() + 1);
                                                   //webix.UIManager.setFocus($$("grdGLTransDet"));
                                                   //$$("grdGLTransDet").focusEditor({
                                                   //    row: $$("grdGLTransDet").getSelectedId() + 1,
                                                   //    column: "Drcr"
                                                   //});
                                                   return false;
                                               }
                                           }
                                           else {
                                               return true;
                                           }
                                       }
                                       else if ($.trim($("#hdnGridClickCol").val()) == "Debit") {
                                           ddlRefTy = "";
                                           debugger;

                                           if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                               return true
                                           }
                                           // var charCode = (e.which) ? e.which : event.keyCode;
                                           if ((charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105))) ) || charCode==13) {
                                               if ((e == 66 || e == 13) && $("#hdnBillDetInd").val() == "1") {
                                                   if (BILL_DETAIL_IND == "1") {
                                                       var BillLoad = fnLoadBillDet(itemval.hdnAcId);

                                                       var BillDetInd = BillLoad.TBLBILLDETIND;

                                                       if (BillDetInd.length > 0)
                                                           $("#hdnBillDetInd").val(BillDetInd[0].BILL_DETAIL_IND);

                                                       ddlRefTy = BillLoad.TBLBREFLOAD;
                                                   }

                                                   var Debit = (itemval.Debit == "" ? 0 : parseFloat(itemval.Debit));

                                                   var Credit = (itemval.Credit == "" ? 0 : parseFloat(itemval.Credit));

                                                   if (Debit != 0 || Credit != 0) {
                                                       $$("grdGLTransDet").refresh();
                                                       fnCallBillDetails(ddlRefTy);
                                                       return false;
                                                   }
                                                   else
                                                       return false;
                                               }
                                               else {
                                                   if (e == 40 && LastId == itemval.id ) {
                                                       fnMainDetRowAdd('1');
                                                       if ($.trim(itemval.hdnAcId) != "" && $.trim(itemval.AnaAppl) == "1") {
                                                           fnCallAnaysis($.trim(itemval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);

                                                       }
                                                       else {
                                                           $$("grdGlAnaly").hide();
                                                         
                                                       }
                                                   }
                                                   //$$("grdGLTransDet").select($$("grdGLTransDet").getSelectedId()+1);
                                                   //webix.UIManager.setFocus($$("grdGLTransDet"));
                                                   //$$("grdGLTransDet").focusEditor({
                                                   //    row: $$("grdGLTransDet").getSelectedId() + 1,
                                                   //    column: "Drcr"
                                                   //});
                                                   return false;
                                               }
                                           }
                                           else {
                                               return true;
                                           }
                                           
                                       }
                                       else if ($.trim($("#hdnGridClickCol").val()) == "Drcr") {
                                           debugger;
                                           if (charCode != 9)
                                           {
                                               if (charCode == 67 || charCode == 68 || charCode == 8 || charCode == 82) {
                                                   return true;
                                               }
                                               else {
                                                   return false;
                                               }
                                           }
                                           
                                       }

                                       if (e == 40 && LastId == itemval.id ) {
                                           fnMainDetRowAdd('1');
                                           if ($.trim(itemval.hdnAcId) != "" && $.trim(itemval.AnaAppl) == "1") {
                                               fnCallAnaysis($.trim(itemval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);

                                           }
                                           else {
                                               $$("grdGlAnaly").hide();
                                            
                                           }
                                       }
                                   },

                                   'onBlur': function () {
                                       var getval = $$("grdGLTransDet").getSelectedItem();
                                       var drcr = getval.Drcr;
                                       drcr = drcr.toUpperCase();
                                       getval.Drcr = drcr;
                                        this.refresh();
                                        fnMainGridTotal();
                                      // $$("grdGLTransDet").editStop(); //Commented for calender not go previous
                                       $$("grdGLTransDet").refresh();
                                   },
                                   'onAfterEditStop': function (state, editor) {
                                       if (editor.column == 'Drcr') {
                                           var id = $$("grdGLTransDet").getSelectedId();
                                           if (id != undefined) {
                                               var getval = $$("grdGLTransDet").getItem(id.row);
                                               getval.Credit = "";
                                               getval.Debit = "";
                                               fnDeleteRowBillDetData();
                                               fnDeleteRowAnaData();
                                               fnDeleteRowGstDetData();
                                               getval.AnaAppl = "";
                                               getval.BILL_DETAIL_IND = "";
                                               getval.btnGST = "";
                                               getval.hdnAcId = "";
                                               getval.ACCD = "";
                                               getval.AcNM = "";
                                               getval.ChkAind = "";
                                               getval.ChkBind = "";
                                               getval.ChkCind = "";
                                               getval.ChkDind = "";
                                               getval.ChkEind = "";
                                               getval.ChkFind = "";
                                               getval.ChkLind = "";
                                               getval.ChkMind = "";
                                               getval.ChkNind = "";
                                               getval.ChkOind = "";
                                               getval.DocNo = "";
                                               getval.DocDt = "";
                                               this.refresh();
                                           }
                                       }
                                       fnMainGridTotal();
                                       $$("grdGLTransDet").refresh();
                                   }
                               }
                           },
                           {
                               cols: [
                                    {
                                        rows: [

                                            {
                                                view: "button",
                                                type: "icon",
                                                icon: "wxi-plus",
                                                label: "",                                             
                                                id: "TrnRowAdd",
                                                width: 30,
                                                click: function () {
                                                    if ($$("ddlTrnType").getValue() == "") {
                                                        AlertMessage("Transaction Type cannot be empty !");
                                                        return false;
                                                    }
                                                    var itemval = $$("grdGLTransDet").getSelectedId();
                                                    var LastId = $$("grdGLTransDet").getLastId();
                                                    if (LastId == itemval) {
                                                        fnMainDetRowAdd('1');
                                                        if ($.trim(itemval.hdnAcId) != "" && $.trim(itemval.AnaAppl) == "1") {
                                                            fnCallAnaysis($.trim(itemval.hdnAcId), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);

                                                        }
                                                        else {
                                                            $$("grdGlAnaly").hide();

                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                   {
                                       rows: [

                                   {
                                       view: "button",
                                       type: "icon",
                                       icon: "wxi-trash",
                                       label: "",                                       
                                       id: "TrnRowDelete",
                                       width: 30,
                                       click: function () {
                                           $$("grdGlAnaly").hide();
                                           fnDeleteRowBillDetData();
                                           fnDeleteRowAnaData();
                                           fnDeleteRowGstDetData();
                                           $$("grdGLTransDet").editCancel();
                                           $$("grdGLTransDet").remove($$("grdGLTransDet").getSelectedId());
                                           $$("grdGLTransDet").refresh();




                                           $$("grdGLTransDet").refresh();
                                           var dsGlTrans = $$("grdGLTransDet").serialize();
                                           fnMainGridTotal();
                                           if (dsGlTrans.length == 0) {
                                               fnMainDetRowAdd('0');
                                           }
                                       }
                                   }

                                       ]
                                   },


                               ]
                              
                           },



                       ]
                   },

                   {
                       cols: [
                           {
                               width:800,//1000
                               id:'grdanalcol',
                               rows:[
                                   {
                                       view: "datatable",
                                       id: "grdGlAnaly",
                                       select: "row",
                                       data: [],
                                       //width:1000,
                                      // height: 110,                                    
                                       scroll: "xy",
                                       editable: true,
                                       hidden: true,
                                       columns: [
                                               { header: "AnalID1", id: "AnalID1", hidden: true },
                                               { header: "Analysis 1", id: "AnalNM1", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID1", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID2", id: "AnalID2", hidden: true },
                                               { header: "Analysis 2", id: "AnalNM2", width: 140, hidden: true,  css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID2", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID3", id: "AnalID3", hidden: true },
                                               { header: "Analysis 3", id: "AnalNM3", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID3", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID4", id: "AnalID4", hidden: true },
                                               { header: "Analysis 4", id: "AnalNM4", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID4", width: 40, template: searchicon, hidden: true, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID5", id: "AnalID5", hidden: true },
                                               { header: "Analysis 5", id: "AnalNM5", width: 140, hidden: true,  css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID5", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID6", id: "AnalID6", hidden: true },
                                               { header: "Analysis 6", id: "AnalNM6", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID6", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID7", id: "AnalID7", hidden: true },
                                               { header: "Analysis 7", id: "AnalNM7", width: 140, hidden: true,  css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID7", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID8", id: "AnalID8", hidden: true },
                                               { header: "Analysis 8", id: "AnalNM8", width: 140, hidden: true,  css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID8", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID9", id: "AnalID9", hidden: true },
                                               { header: "Analysis 9", id: "AnalNM9", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID9", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                                               { header: "AnalID10", id: "AnalID10", hidden: true },
                                               { header: "Analysis 10", id: "AnalNM10", width: 140, hidden: true, css: { 'text-align': 'left ! important' } },
                                               { header: "", id: "btnAnalID10", width: 40, hidden: true, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                               {
                                                   header: "Amount", id: "Amount", width: 100, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                                   format: function (value) {
                                                       return fnCurrFormat(value);
                                                   },
                                                   editFormat: function (value) {
                                                       return webix.Number.parse(value, {
                                                           groupDelimiter: "",
                                                           groupSize: '',
                                                           decimalDelimiter: ".",
                                                           decimalSize: $("#CURRENCY_DECIMLIMIT").val()

                                                       });
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
                                                       fnAddAnalRow('1');

                                                   }

                                               }
                                              // debugger;
                                               if (id.column != "btnADel" && id.column != "Amount") {
                                                   $("#hdnAnaColId").val($.trim(ColId));
                                                   var SrchData = Headers.filter(function (Headers) {
                                                       return Headers.L_ID == $.trim(ColId);
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
                                                   getval1 = $$("grdGLTransDet").getSelectedItem();
                                                   var TotAmt = 0;
                                                   if (parseFloat(getval1.Credit) > 0) TotAmt = getval1.Credit == "" ? "0" : parseFloat(getval1.Credit);
                                                   else TotAmt = getval1.Debit == "" ? "0" : parseFloat(getval1.Debit);
                                                   $$("grdGlAnaly").refresh();
                                                   $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(Amt).toFixed(2);
                                                   if (parseFloat(TotAmt).toFixed(2) == parseFloat(Amt).toFixed(2))
                                                   {
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                                       //$$("grdGlAnaly").getColumnConfig("Amount").header[0].css = { "background": "#24A259" };
                                                       $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderGrClr";
                                                   }
                                                   else
                                                   {
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                                       webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                                       //   $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = { "background": "#f24835" };
                                                       $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderRedClr";

                                                   }
                                                  
                                                   $$("grdGlAnaly").refreshColumns();
                                               }
                                           },
                                           'onBlur': function () {
                                               webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                               webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                               $$("grdGlAnaly").editStop();
                                               fnStoreAnaData();
                                              
                                               $$("grdGlAnaly").refresh();
                                           },
                                           'onKeyPress': function (e, id) {
                                               
                                               var charCode = (e.which) ? e.which : event.keyCode;
                                               if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39 || charCode == 13 ) {
                                                   return true;
                                               }
                                               if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                                                   if (e == 40) {
                                                       debugger;
                                                       fnAddAnalRow('1');
                                                   }
                                                   return false;
                                               }
                                               else {
                                                   return true;
                                               }
                                           },
                                           'onAfterEditStop': function (state, editor) {
                                               fnStoreAnaData();
                                               $$("grdGlAnaly").refresh();
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
                               ]},
                          

                           {
                               rows: [

                                   {
                                       cols: [
                                        {
                                            view: "label",
                                            id: "lblTDiff",
                                            label: "Difference :",
                                            labelAlign: "Right",
                                            inputWidth: 100,
                                            width: 100,
                                            css: "Greenclr",
                                        },
                                        {
                                            view: "label",
                                            id: "txtTDiffAmt",
                                            label: "",
                                            labelAlign: "Left",
                                            inputWidth: 80,
                                            width: 120,
                                            css: "Greenclr",

                                        },
                                       ]
                                   },
                                  
                                    {
                                        view: "label",
                                        id: "lblCby",
                                        label:"",
                                        inputWidth: 300,
                                        width: 300,
                                        labelAlign: "right",
                                        hidden:true,
                                        css: "LblColor",
                                    },
                                    {
                                        view: "label",
                                        id: "lblUby",
                                        label:"",
                                        inputWidth: 300,
                                        width: 300,
                                        labelAlign: "right",
                                        hidden: true,
                                        css: "LblColor",
                                    }
                               ]
                            
                           },
                      
                       ]
                   },
                   {
                       view: "datatable",
                       id: "grdGlAnalyData",
                       select: "row",
                       data: [],
                       //width: 1250,
                       //height: 150,
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
                       ],
                       on: {
                       }
                   },
                    {
                        view: "datatable",
                        id: "grdGLGstData",
                        select: "row",
                        data: [],
                      //  minwidth: 900,
                       // height: 150,
                        scroll: true,
                        hidden: true,
                        columns: [
                            
                                { header: "RowId", id: "RowId", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "RefNm", id: "RefNm", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "TaxCode", id: "TaxCode", width: 50, css: { 'text-align': 'left ! important' } },
                                  { header: "TaxPer", id: "TaxPer", width: 50, css: { 'text-align': 'left ! important' } },
                                { header: "TaxClass", id: "TaxClass", width: 70, css: { 'text-align': 'left ! important' } },
                                { header: "TaxAmount", id: "TaxAmount", width: 120, css: { 'text-align': 'left ! important' } },
                                 { header: "TotTax", id: "TotTax", width: 120, css: { 'text-align': 'left ! important' } },
                                { header: "IGST_P", id: "IGST_P", width: 150, css: { 'text-align': 'left ! important' } },
                                { header: "IGST_A", id: "IGST_A", width: 60, css: { 'text-align': 'left ! important' } },
                                { header: "IGST_ID", id: "IGST_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "IGST_REBIND", id: "IGST_REBIND", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "CGST_ID", id: "CGST_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "CGST_REBIND", id: "CGST_REBIND", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "CGST_P", id: "CGST_P", width: 150, css: { 'text-align': 'left ! important' } },
                                { header: "CGST_A", id: "CGST_A", width: 60, css: { 'text-align': 'left ! important' } },
                                { header: "SGST_ID", id: "SGST_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "SGST_REBIND", id: "SGST_REBIND", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "SGST_P", id: "SGST_P", width: 150, css: { 'text-align': 'left ! important' } },
                                { header: "SGST_A", id: "SGST_A", width: 60, css: { 'text-align': 'left ! important' } },
                                { header: "CESS_ID", id: "CESS_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "CESS_REBIND", id: "CESS_REBIND", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "CESS_P", id: "CESS_P", width: 150, css: { 'text-align': 'left ! important' } },
                                { header: "CESS_A", id: "CESS_A", width: 60, css: { 'text-align': 'left ! important' } },
                                { header: "SnoBill", id: "SnoBill", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BillDate", id: "BillDate", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "AmountStr", id: "AmountStr", width: 90, css: { 'text-align': 'left ! important' } },
                                 { header: "AC_ID", id: "AC_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "AC_NM", id: "AC_NM", width: 90, css: { 'text-align': 'left ! important' } },
                                  { header: "AC_CD", id: "AC_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "REG_TY", id: "REG_TY", width: 100, css: { 'text-align': 'left ! important' } },
                                { header: "TRN_TY", id: "TRN_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BILL_TY", id: "BILL_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "SUPPLY_TY", id: "SUPPLY_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GST_IN", id: "GST_IN", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "ST_CD", id: "ST_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "ST_NM", id: "ST_NM", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PLACE_ID", id: "PLACE_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PLACE_NM", id: "PLACE_NM", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "REV_CHRG", id: "REV_CHRG", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "REV_PER", id: "REV_PER", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "REV_REASON", id: "REV_REASON", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BOE_NO", id: "BOE_NO", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BOE_AMT", id: "BOE_AMT", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BOE_DT", id: "BOE_DT", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PORT_CD", id: "PORT_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PARTY_TY", id: "PARTY_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GST_TY", id: "GST_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PTX_RG_No", id: "PTX_RG_No", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PTX_ST_CD", id: "PTX_ST_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "PTX_RG_Ty", id: "PTX_RG_Ty", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "TX_RG_CD", id: "TX_RG_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GTRN_TY", id: "GTRN_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GINV_TY", id: "GINV_TY", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "TRN_ID_SRNO", id: "TRN_ID_SRNO", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "B_TRN_ID_SRNO", id: "TRN_ID_SRNO", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BRN_NO", id: "BRN_NO", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "TAN_No", id: "TAN_No", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "Sup_Cat", id: "Sup_Cat", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "EXEMP_IND", id: "EXEMP_IND", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "HCD", id: "HCD",  width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "ORD_NO", id: "ORD_NO", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "ORD_DT", id: "ORD_DT", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GWO_ID", id: "GWO_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "NID_No", id: "NID_No", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "DC", id: "DC", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "BILL_ITEM_NM", id: "BILL_ITEM_NM", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GL_AC_ID", id: "GL_AC_ID", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GL_AC_NM", id: "GL_AC_NM", width: 90, css: { 'text-align': 'left ! important' } },
                                { header: "GL_AC_CD", id: "GL_AC_CD", width: 90, css: { 'text-align': 'left ! important' } },
                                   { header: "TAX_COMP_IND", id: "TAX_COMP_IND", width: 90, css: { 'text-align': 'left ! important' } },
                             



                        ],
                        on: {
                        }
                    },
                   {
                       view: "datatable",
                       id: "grdGLTrnData",
                       select: "row",
                       data: [],
                     //  minwidth: 900,
                     //  height: 150,
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

                       ],
                       on: {
                       }
                   },




                ],
            }
        ]
        // };
        });
}

function fnCallPopUpPDCSrch() {
   
   var  TrnTy = fnGLtrnType;
   webix.ui({
       view: "window",
       close: true,
       modal: true,
       id: "PopupPDCSrch",
       head: "Post Dated Cheques",
       position: "center",
       minWidth: 930,
       maxWidth: 930,
       resizeColumn: true,
       resizeRow: true,
      // css: "webix_header_border",
       css: "WebIxStyle",
       height: 500,

       body: {
           view: 'form',
           minWidth: 930,
           maxWidth: 930,

           elements: [
               {
           rows: [
               {
                   rows: [
                       {

                           cols: [{

                               view: "richselect",
                               id: "ddlPdcTrnTy",
                               label: "Transaction Type",
                               labelAlign: "left",
                               labelWidth: 110,
                               inputWidth: 300,
                               width: 400,
                               options: TrnTy,
                               value: "2",
                               on: {
                                   onChange: function (newval, oldval) {
                                       fnLoadPdc();
                                   }
                               }
                           },
                           {},
                             {
                                 view: "label",
                                 id: "LblNotes",
                                 label: "Double Click to select transaction",
                                 inputWidth: 300,
                                 width: 300,
                                 labelAlign: "left",
                                 css: "LblColor",
                             },
                           {
                               view: "checkbox",
                               id: "ChkAsOn",
                               label: "As On",
                               inputWidth: 150,
                               customCheckbox: false,
                               value: "1",
                               click: function () {
                                   fnLoadPdc();
                               }
                       
                            }
                           ]

                       },
                       {
                           cols: [{
                               view: "datatable",
                               id: "grdPDCSrch",
                               select: "row",
                               hover: "gridHover",
                               data: [],
                               height: 380,
                               editable:true,
                               scroll: "y",
                               columns: [
                                       { header: ["Chq Dt", ], id: "ChqDt", width: 125, css: { 'text-align': 'center ! important' } },
                                       { header: ["Chq No", ], id: "ChqNo", width: 90, css: { 'text-align': 'left ! important' } },
                                       { header: "Voucher Type", id: "VouchTy", width: 130, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return []; } },
                                       { header: ["Narration"], id: "Narr", width: 200, css: { 'text-align': 'left ! important' } },
                                       { header: ["Ledger"], id: "LedgerNm", width: 200, css: { 'text-align': 'left ! important' } },
                                       { header: ["Amount", ], id: "Amt", width: 95, css: { 'text-align': 'right ! important' } },
                                       //{ header: "Transfer To GL", id: "ChkSelect", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 55, css: { 'text-align': 'center ! important' } },
                                        { header: ["TrnId", ], id: "TrnId", hidden: true },
                                       { header: ["FYear", ], id: "FYear", hidden: true },
                                       { header: ["OTrnTyId", ], id: "OTrnTyId", hidden: true },
                                       { header: ["NTrnTyId", ], id: "NTrnTyId", hidden: true },

                                       
                               ],
                               on: {
                                 
                                   'onItemDblClick': function (id, e, node) {
                                       debugger;
                                       var getval = this.getSelectedItem(id.row);
                                       $("#hdnGLTrnId").val($.trim(getval[0].TrnId));
                                       $("#hdnPdcTrnTyId").val($.trim(getval[0].VouchTy));
                                       $("#hdnPdcFYear").val($.trim(getval[0].FYear));
                                       fnLoadTransactionTrn();
                                       $$("TrnRowAdd").disable();
                                       $$("TrnRowDelete").disable();
                                       $$("grdGLTransDet").disable();
                                       $$('PopupPDCSrch').hide();
                                   }
                               }
                           }]
                       },
                     
                   
                   
                   ]
               }]
                  

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
                                  label: "Close",
                                  maxWidth: 75,
                                  inputWidth: 70,
                                  on: {
                                      onItemClick: function () {
                                          $$('PopupPDCSrch').hide();
                                      }
                                  }
                              }]
                        }]
                }]
            }

           ]
             
       }
       
      
            })
   fnLoadPdc();
   $$('PopupPDCSrch').show(); 
}



webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("GlTransaction").define("width", vWidth);
    $$("GlTransaction").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;


    $$("GlTransaction").define("height", vheight - 100);
    $$("GlTransaction").resize();
    var vWidth = $("#divform").width();
    $$("GlTransaction").define("width", vWidth);
    $$("GlTransaction").resize();
    if (choice == "1") {
        var offsetTop = $$("grdGLTransDet").getNode().offsetTop;

        $$("grdGLTransDet").define("height", ((vheight - offsetTop - 190)));//160
        $$("grdGLTransDet").adjust();

      
        $$("grdGlAnaly").define("height", ((80)));
        $$("grdGlAnaly").adjust();
    }





}