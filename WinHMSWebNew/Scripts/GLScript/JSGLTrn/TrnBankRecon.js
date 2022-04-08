var app = angular.module('GLTApp', ['webix']);

app.controller("GLTransController", function ($scope) {
    var dt = new Date();
    fnAccountDt("1");
    $("#hdnDrCrval").val("1");
    $("#hdnPgLoad").val("1");
    $("#hdnChkRecon").val("0");
    var ddlBank = fnLoadBankddl();
    fnLoadDefaultDt();
    $("#LoadDIv").hide(); 
    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmBankRecon = {

        id: "frmBankRecon",
        view: 'form',
        minWidth: 1200,
        maxWidth: 5000,
        minHeight: 550,
        elements: [
            {
               
                       rows: [
                           {
                               cols: [
                                   {
                                       view: "richselect",
                                       id: "ddlBank",
                                       stringResult: true,
                                       label: "Bank",
                                       labelAlign: "Left",
                                       options: ddlBank,
                                       labelWidth: 38,
                                       inputWidth: 230,
                                       width: 318,
                                   },

                                    {
                                        view: "datepicker",
                                        id: "FromDt",
                                        width: 155, labelWidth: 38,
                                        label: "From",
                                        value: $("#hdnStDate").val(),
                                        format: "%d/%m/%Y",
                                    },
                                     {
                                         view: "datepicker",
                                         id: "ToDt",
                                         width: 140, labelWidth: 25,
                                         label: "To",
                                         value: $("#hdnEndDate").val(),
                                         format: "%d/%m/%Y",
                                     },

                                     {

                                         view: "button",
                                         id: "AdvSrch",
                                         css: "webix_primary",
                                         inputWidth: 40,
                                         width: 80,
                                         tooltip: true,
                                         label: '<span class="fa fa-filter"></span>',
                                         on: {

                                             onItemClick: function () {
                                                 debugger;
                                                 $$("frmFilter").show();
                                             }
                                         }
                                     },

                                           {
                                               id: "ChkReconDt",
                                               view: "checkbox",
                                               label: "Recon After to Dt",
                                               labelAlign: "Right",
                                               labelWidth: 140,
                                               width: 200,
                                               value: 1,
                                               hidden:true,
                                               on: {
                                                   "onChange": function () {

                                                   }
                                               }
                                           },

                               ]
                           },
                           {
                               cols: [

                                   
                                  {
                                      view: 'label',
                                      inputWidth: 80,
                                      width: 438,
                                      label:'',
                                  },
                                      {

                                          id: "btnDisplay",
                                          view: "button",
                                          width: 100, labelWidth: 90,
                                          label: "Display",
                                          //disabled: true,
                                          css: "webix_primary",
                                          on: {
                                              onItemClick: function () {
                                                  $("#hdnPgLoad").val("1");
                                                  fnDisplay();
                                                  if ($$("ddlBank").getValue() != "") {
                                                      fnLoadAmnt1();
                                                      fnLoadAmnt2();
                                                  }
                                                  $("#hdnPgLoad").val("2");
                                                  
                                              }
                                          }
                                      },

                               ]
                           },
                   {
                       paddingY: 5,

                       cols: [
      
                           {
                               view: "datatable",
                               id: "GridData",
                               //   hidden:true,
                               select: "row",
                               data: [],
                               //width: 1100,
                               height: 350,//350,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               resizeColumn: true,
                               resizeRow: true,
                               spans: true,
                               autoConfig: true,
                               position: "flex",

                               tooltip: function (obj, common) {
                                  
                                   if (common.column.id == "ixFullNar")
                                       return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                    { header: "ixtrnid", id: "ixtrnid", hidden: true },
                                        { header: "ixtrnidsrno", id: "ixtrnidsrno", hidden: true },
                                       { header: "Voucher Dt", id: "ixVchDt", width: 130, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Voucher No", id: "ixVchNo", width: 80, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Trn Type", id: "ixTrnType", width: 80, css: { 'text-align': 'center ! important' }, tooltip: false },
                                        { header: "ChqNo", id: "ixChqNo", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                        { header: "ChqDt", id: "ixChqDt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                        { header: "Narration", id: "ixNarr", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "DrAmt", id: "ixDrTemp", width: 100, css: { 'text-align': 'right ! important' }, }, 
                                       { header: "CrAmt", id: "ixCrTemp", width: 100, css: { 'text-align': 'right ! important' }, }, 
                                           {
                                               header: "Reconcilled", id: "chkReconcilled", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 47, css: { 'text-align': 'center ! important' },
                                                
                                           },

                                        {
                                            header: "Recon Dt", id: "ixReconDt", width: 85, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, liveEdit: true, css: { 'text-align': 'left ! important' },disabled:true,
                                        },
                                        { header: "Currency", id: "ixCur", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                        { header: "Frmt_Amt", id: "ixFamt", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                       { header: "ixFiscalYear", id: "ixFiscalYear", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                       { header: "ixFullNar", id: "ixFullNar", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                       { header: "ixTrnTyId", id: "ixTrnTyId", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                       { header: "Voucher Dt", id: "ixReconDt2", width: 130, css: { 'text-align': 'center ! important' }, tooltip: false,hidden:true },
                                      
                               ],
                               on: {

                                   'onCheck':function(rowId,colId,state){
                                       debugger;
                                       $("#hdnChkRecon").val("ChkRecon");

                                       if ($("#hdnDrCrval").val() == "1") {
                                           $("#hdnreconDr").val("0"); $("#hdnreconCr").val("0");
                                       }

                                       var item = this.getItem(rowId);
                                       if (item.chkReconcilled=="1" && item && item.ixNarr != "Total" && item.ixNarr != "Grand Total") {
                                           var valdr = $("#hdnreconDr").val(); var valcr = $("#hdnreconCr").val();
                                           valdr = parseFloat(valdr) + parseFloat($.trim(item.ixDrTemp));
                                           valcr = parseFloat(valcr) + parseFloat($.trim(item.ixCrTemp));
                                           $("#hdnreconDr").val(valdr); $("#hdnreconCr").val(valcr);
                                           $$("txtReconDr").setValue(valdr);
                                           $$("txtReconCr").setValue(valcr);
                                           $("#hdnDrCrval").val("2");
                                       }
                                     else  if (item.chkReconcilled=="0" && item && item.ixNarr != "Total" && item.ixNarr != "Grand Total") {
                                                 var valdr = $("#hdnreconDr").val(); var valcr = $("#hdnreconCr").val();
                                                 valdr = parseFloat(valdr) - parseFloat($.trim(item.ixDrTemp));
                                                 valcr = parseFloat(valcr) - parseFloat($.trim(item.ixCrTemp));
                                                 $("#hdnreconDr").val(valdr); $("#hdnreconCr").val(valcr);
                                                 $$("txtReconDr").setValue(valdr);
                                                 $$("txtReconCr").setValue(valcr);
                                       }
                                   },


                                   'onItemClick': function (id, index, cell) {
                                       debugger;
                                       if (id.column == 'chkReconcilled') {
                                           var getval = this.getItem(id.row);

                                           if (getval.chkReconcilled == "1") {
                                               getval.ixReconDt = $("#hdnCurrentDt").val();
                                           }
                                           $("#hdnChkRecon").val("0");
                                       }

                                   },
                                   'onItemDblClick': function (id) {
                                       debugger;;
                                    if (id.column == "ixNarr") {
                                           fnCallNarrPopup();
                                           var itemval = $$("GridData").getSelectedItem();
                                           $$("txtLineNarr").setValue($.trim(itemval.ixFullNar));
                                           $$("NarrPopup").show();
                                           debugger;
                                           webix.UIManager.setFocus($$("txtLineNarr"));

                                       }

                                   },
                                   'onBlur': function () {
                                       ////debugger;
                                       //$$("grdLoadBills").editStop();
                                       //$$("grdLoadBills").refresh();
                                   },
                               },
                               scheme: {
                                   $change: function (item) {
                                      // debugger;
                                       
                                       if ($("#hdnDrCrval").val() == "1") {
                                           $("#hdnreconDr").val("0"); $("#hdnreconCr").val("0");
                                       }
                                       item.ixReconDt2 = item.ixReconDt;
                                       if (item.ixNarr != "Total" && item.ixNarr != "Grand Total" && window.PAGETYPE == "2"&& $("#hdnPgLoad").val()=="1") {
                                           debugger;
                                           if (item.ixReconDt != "" && item.ixReconDt != null) {
                                               var date1 = item.ixReconDt;
                                               var convDate1 = date1.split("/");

                                               convDate1 = convDate1[2] + "/" + convDate1[1] + "/" + convDate1[0];
                                               item.ixReconDt = convDate1; 
                                           }
                                       }

                                       if(window.PAGETYPE == "1"){
                                     
                                       if (item.chkReconcilled != "1") {
                                           if(window.PAGETYPE == "1")
                                               item.ixReconDt = "";
                                           //$$("txtReconDr").setValue("0.00");
                                           //$$("txtReconCr").setValue("0.00");
                                         
                                       }
                                       if (item.chkReconcilled == "1" && item.ixReconDt == "" && item.ixNarr != "Total" && item.ixNarr != "Grand Total") {
                                           if ($$("ChkSysDt").getValue() == "1")
                                               item.ixReconDt = $("#hdnCurrentDt").val();
                                           else {
                                               var date = item.ixVchDt;
                                               var convDate = date.split("/");
                          
                                               convDate = convDate[2] + "/" + convDate[1] + "/" + convDate[0];
                                               item.ixReconDt = convDate; 
                                           }
                                       }
                            
                                       }
                        
                                       if (item.ixVchDt == "~Previous Period Transaction(s)" || item.ixVchDt == "~Selected Period Transaction(s)") {
                                           if (item.ixVchDt == "~Previous Period Transaction(s)")
                                               item.ixVchDt = "Previous Period Transaction(s)";
                                           if (item.ixVchDt == "~Selected Period Transaction(s)")
                                               item.ixVchDt = "Selected Period Transaction(s)";
                                           var rowid = item.id;
                                           $$("GridData").addSpan(item.id, "ixVchDt", 10, 1, null, "GroupTot");
                                           item.ixVchDt.$css = "GroupGrTot";
                                           $$("GridData").refresh();

                                       }
                                       if (item.ixNarr == "Total" || item.ixNarr == "Grand Total") {
                                           item.$css = "GroupGrTot";
                                           item.chkReconcilled = "0";
                                           item.ixReconDt = "";
                                       }
                                       $("#hdnChkRecon").val("0");
                                   },

                               },

                           }
                       ]
                   },
                               {
                                   rows: [
                                       {
                                           cols: [
                                            {
                                                id: "lblcloseBal",
                                                view: "label",
                                                label: "Closing Balance :",
                                                labelAlign: "Right",
                                                labelWidth: 270,
                                                width: 315,
                                                value: 1,
                                                css: "Maroonclr",
                                                on: {
                                                    "onChange": function () {

                                                    }
                                                }
                                            },
                                            {
                                                view: "label",
                                                id: "txtClosBal",
                                                label: "",
                                                labelAlign: "Left",
                                                inputWidth: 85,
                                                width: 300,
                                                css: "Greenclr",

                                            },
                                            {
                                                view: "label",
                                                id: "lblReconTot",
                                                label: "Reconcilled Total :",
                                                labelAlign: "Left",
                                                inputWidth: 80,
                                                width: 120,
                                                css: "Maroonclr",

                                            },
                                            {
                                                view: "label",
                                                id: "txtReconDr",
                                                label: "0.00",
                                                labelAlign: "Left",
                                                inputWidth: 80,
                                                width: 120,
                                                css: "Greenclr",

                                            },
                                             {
                                                 view: "label",
                                                 id: "txtReconCr",
                                                 label: "0.00",
                                                 labelAlign: "Left",
                                                 inputWidth: 80,
                                                 width: 120,
                                                 css: "Greenclr",

                                             },

                                           ]
                                       },

                                        {
                                            cols: [
                                             {
                                                 id: "lblBalBkst",
                                                 view: "label",
                                                 label: "Balance As Per Bank Statement :",
                                                 labelAlign: "Right",
                                                 labelWidth: 270,
                                                 width: 315,
                                                 value: 1, css: "Maroonclr",
                                                 on: {
                                                     "onChange": function () {

                                                     }
                                                 }
                                             },
                                             {
                                                 view: "label",
                                                 id: "txtBalBnkst",
                                                 label: "",
                                                 labelAlign: "Left",
                                                 inputWidth: 85,
                                                 width: 120,
                                                 css: "Greenclr",

                                             },
                                            ]
                                        },

                                       {
                                           cols: [
                                            {
                                                id: "ChkConsiderTrnDt",
                                                view: "checkbox",
                                                label: "Consider Transaction not reconciled Prior to From dt",
                                                labelAlign: "Left",
                                                labelWidth: 280,
                                                width: 315,
                                                value: 1, css: "Maroonclr",
                                                on: {
                                                    "onChange": function (newval, oldVal) {
                                                        if (newval == "1") {
                                                            $$("txtConsiderBal").show();
                                                        }
                                                        else {
                                                            $$("txtConsiderBal").hide();
                                                  
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                view: "label",
                                                id: "txtConsiderBal",
                                                label: "",
                                                labelAlign: "Left",
                                                inputWidth: 80,
                                                width: 120,
                                                css: "Greenclr",

                                            },
                                           ]
                                       },

                              
                                   ]

                               },


                       ]
                
            }
        ]
    };
    webix.ui({
        view: "window",
        id: "frmFilter",
        close: true,
        modal: true,
        head: "Advanced Filter",
        position: "center",
        width: 600,

        body: {
            paddingX: 30,
            cols: [{
                rows: [
                    {
                        cols:[{
                        view: "label",
                        label: "Based on",
                        width: 180,
                        css: "lblln",
                        },
                        {
                            view: "label",
                            label: "Consider",
                            width: 80,
                            css: "lblln",
                        },
                        ]

                    },
                      {
                          cols: [{
                              view: "checkbox",
                              id: "ChkVouchDt",
                              width: 180, labelWidth: 0,
                              labelRight: "Voucher Date",
                              value: 1,
                              on: {
                                  "onChange": function (newval, oldVal) {
                                      if (newval == "1") {
                                          $$("ChkReconcilDt").setValue("0");
                                      }
                                      else {
                                          $$("ChkReconcilDt").setValue("1");

                                      }
                                  }
                              }
                          },
                          {
                              view: "checkbox",
                              id: "ChkDebit",
                              width: 180, labelWidth: 0,
                              labelRight: "Debit", value: 1,
                          },
                          ]

                      },
                      {
                          cols: [{
                              view: "checkbox",
                              id: "ChkReconcilDt",
                              width: 180, labelWidth: 0,
                              labelRight: "Reconciled Date",
                              on: {
                                  "onChange": function (newval, oldVal) {
                                      if (newval == "1") {
                                          $$("ChkVouchDt").setValue("0");
                                      }
                                      else {
                                          $$("ChkVouchDt").setValue("1");

                                      }
                                  }
                              }
                          },
                          {
                              view: "checkbox",
                              id: "ChkCredit",
                              width: 180, labelWidth: 0,
                              labelRight: "Credit",
                              value: 1,
                          },
                          ]

                      },

                    {
                        cols: [{
                            view: "label",
                            label: "Filter",
                            width: 180,
                            css: "lblln",
                        },
                        {
                            view: "checkbox",
                            id: "ChkReconAftTodt",
                            width: 180, labelWidth: 0,
                            labelRight: "Recon After To Dt", value: 1,
                        },
                        ]

                    },
                    
                
                    {
                        view: "text",
                        id: "txtCheckNo",
                        width: 220, labelWidth: 65,
                        label: "Check No",
                    },
                    {
                        view: "text",
                        id: "txtNarration",
                        width: 220, labelWidth: 65,
                        label: "Narration",
                        hidden:true,
                    },
                     {
                         view: "text",
                         id: "txtDrAmt",
                         width: 220, labelWidth: 65,
                         label: "DR Amt",
                         pattern: { mask: "##################", allow: /[0-9]/g }
                     },
                     {
                         view: "text",
                         id: "txtCrAmt",
                         width: 220, labelWidth: 65,
                         label: "CR Amt",
                         pattern: { mask: "##################", allow: /[0-9]/g }
                     },
                     {
                         view: "label",
                         label: "Options",
                         width: 80,
                         css: "lblln",
                     },
                     {
                         view: "checkbox",
                         id: "ChkSummWtDetail",
                         width: 300, labelWidth: 0,
                         labelRight: "Summary with Chq Details",
                         hidden: true
                     },
                      {
                          view: "checkbox",
                          id: "ChkLineNr",
                          width: 300, labelWidth: 0,
                          labelRight: "Narration as Line Narration",
                      },
                       {
                           view: "checkbox",
                           id: "ChkRecondt",
                           width: 300, labelWidth: 0,
                           labelRight: "Reconsider Date",
                       },
                        {
                            view: "checkbox",
                            id: "ChkSysDt",
                            width: 300, labelWidth: 0,
                            labelRight: "System Date as Reconcile Dt",
                            value:1,
                        },
                        {
                            view: "label",
                            label: "Sort On",
                            width: 80,
                            css: "lblln",
                        },
                        {
                            view: "checkbox",
                            id: "ChkSrtOn",
                            width: 300, labelWidth: 0,
                            labelRight: "Cheque Date",
                        },

                
                {},

                {
                    view: "button",
                    id: "btnFok",
                    width: 56, labelWidth: 80,
                    label: "OK",
                    align: "right",
                    on: {
                        'onItemClick': function () {
                            $$("frmFilter").hide();
                        },
                    }
                }],
            }],
        },
    });


    //gridResize("1");
});


function fnDisplay() {
    debugger;

    if ($$("ChkDebit").getValue() != 1 && $$("ChkCredit").getValue() != 1) {
        alert("Select Credit or Debit");
        return false;
    }
    if ($$("ddlBank").getValue() == "") {
        alert("Select Bank");
        return false;
    }

    var rowDatad = [];
    // var CompId = $$("Property").getValue();  
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBank = $$("ddlBank").getValue();
    var ChkSrtOn = $$("ChkSrtOn").getValue();
    var ChkDebit = $$("ChkDebit").getValue();
    var ChkCredit = $$("ChkCredit").getValue();
    //var txtLedger = $("#hdnPartyId").val();   
    var ChkReconDt = $$("ChkReconDt").getValue();
    var ChkReconcilDt = $$("ChkReconcilDt").getValue();
    var ChkSysDt = $$("ChkSysDt").getValue();
    var ChkConsiderTrnDt = $$("ChkConsiderTrnDt").getValue();
    var txtCheckNo = $$("txtCheckNo").getValue();
    var txtDrAmt = $$("txtDrAmt").getValue();
    var txtCrAmt = $$("txtCrAmt").getValue();
    var txtNarr = $$("txtNarration").getValue();
    if (window.PAGETYPE == "1")
        var REQTYPE = "GET_FNLOADTRNBANKRECON";
    else if(window.PAGETYPE =="2")
        var REQTYPE = "GET_FNLOADTRNRECONREVERSE";
    Request = {
        PROGNAME: "GET_GLTRNBANKRECON",
        REQTYPE: REQTYPE,
        COMPID: $("#hdnCompId").val(),
        //GL_COMPID: window.GL_CompanyID,
        FiscalYear: $("#hdnFiscalYr").val(),
        // GROUP_ID: GrpIds,
        FromDt: FromDt,
        ToDt: ToDt,
        ddlBank: ddlBank,
        ChkSrtOn: ChkSrtOn,
        ChkDebit: ChkDebit,
        ChkCredit: ChkCredit,
        ChkReconDt: ChkReconDt,
        ChkReconcilDt:ChkReconcilDt,
        ChkSysDt: ChkSysDt,
        ChkConsiderTrnDt: ChkConsiderTrnDt,
        txtCheckNo: txtCheckNo,
        txtDrAmt: txtDrAmt,
        txtCrAmt: txtCrAmt,
        txtNarr: txtNarr
        //ChkForeignCurr: ChkForeignCurr,
    }

    var DataVal = (JSON.stringify(Request));
    
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                ClrControl();
                $$("GridData").clearAll();
                $$("GridData").parse(rowDatad);
                $$("GridData").refresh();
                $("#hdnDrCrval").val("1");
                //$$("GridData").adjustRowHeight();
                //$$("GridData").refresh();
            }
            else {
                $$("GridData").clearAll();
                alert("No Record Found");
            }
        }
    })

};


function fnPropChange(CompId) {
    debugger;
    ClrControl();
    fnLoadBankddl();
};


function fnLoadAmnt1() {
    debugger;
    $("#hdnAmnt1").val("");
    var rowDatad = [];
    // var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBank = $$("ddlBank").getValue();

    Request = {
        PROGNAME: "GET_GLTRNBANKRECON",
        REQTYPE: "GET_FNLOADTRAILBAL",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        FromDt: FromDt,
        ToDt: ToDt,
        ddlBank: ddlBank,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);

                $("#hdnAmnt1").val(rowDatad[0].OPNAMNT);

                $$("txtClosBal").setValue(rowDatad[0].OPNAMNT);
                //$$("GridData").refresh();

            }
            else {

            }
        }
    })

};


function fnLoadAmnt2() {
    debugger;
    var rowDatad = [];
    // var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBank = $$("ddlBank").getValue();

    Request = {
        PROGNAME: "GET_GLTRNBANKRECON",
        REQTYPE: "GET_FNLOADAMNT",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        LblAmnt: $("#hdnAmnt1").val(),
        FromDt: FromDt,
        ToDt: ToDt,
        ddlBank: ddlBank,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);

                $$("txtBalBnkst").setValue(rowDatad.BALASBANKST);
                if ($$("ChkConsiderTrnDt").getValue() == "1")
                    $$("txtConsiderBal").setValue(rowDatad.CONSITRNAMNT);
                else $$("txtConsiderBal").setValue("");
                //$$("GridData").refresh();

            }
            else {

            }
        }
    })

};


function fnAuditSave() {
    debugger;
    if (!fnValidate()) {
        alert("Select Record");
        return false;
    }
    var rowDatad = [];
    // var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBank = $$("ddlBank").getValue();
    var data = $$("GridData").serialize();
    data = JSON.stringify(data);

    Request = {
        PROGNAME: "GET_GLTRNBANKRECON",
        REQTYPE: "AUDITSAVE",
        COMPID: $("#hdnCompId").val(),
        PAGETYPE: window.PAGETYPE ,
        FiscalYear: $("#hdnFiscalYr").val(),
        ddlBank: ddlBank,
        FromDt: FromDt,
        ToDt: ToDt,
        BankReconData: data,

    }

    var DataVal = JSON.stringify(Request);
    DataVal = encodeURIComponent(DataVal);

    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            rowDatad = JSON.parse(d);
            if ($.trim(rowData) == "True") {
               
                alert("Saved Successfully");
                $$("GridData").clearAll();
                fnDisplay();
                return;
            }
            else {
                alert("Operation Failed");
                return;
            }
        }
    })

};


function fnSave() {
    debugger;
    //if (!fnValidate()) {
    //    alert("Select Record");
    //    return false;
    //}
    var rowDatad = [];
    // var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBank = $$("ddlBank").getValue();
    var data = $$("GridData").serialize();
    data = JSON.stringify(data);

    Request = {
        PROGNAME: "GET_GLTRNBANKRECON",
        REQTYPE: "SAVETRNBANKGRD",
        COMPID: $("#hdnCompId").val(),
        PAGETYPE: window.PAGETYPE,
        FiscalYear: $("#hdnFiscalYr").val(),
        // GROUP_ID: GrpIds,
        FromDt: FromDt,
        ToDt: ToDt,
        BankReconData: data,

    }

    var DataVal = JSON.stringify(Request);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "1") {
                rowDatad = JSON.parse(d);
                alert("Saved Successfully");
                ClrControl();
                fnDisplay();
            }
            else {
                alert("Operation Failed");
            }
        }
    })

};


function fnValidate() {
    var data = $$("GridData").serialize();
    var LenGrid = data.length;
    for (var i = 0; i < LenGrid; i++) {
        if ($.trim(data[i].chkReconcilled) == 1) {
            return true;
        }
    }
    return false;
}

function ClrControl() {
    $$("GridData").clearAll();
    $$("txtReconDr").setValue("0.00");
    $$("txtReconCr").setValue("0.00");
    $$("txtClosBal").setValue("0.00");
    $$("txtBalBnkst").setValue("0.00");
    $$("txtConsiderBal").setValue("0.00");
}





function fnLoadBankddl() {
    debugger;
    var dataparam = {};
    var rowData =[];
    dataparam["REQTYPE"] = "GET_GLTRNBANK";
    dataparam["PROGNAME"] = "GET_GLTRNBANKRECON";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
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
};

function fnLoadDefaultDt() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNLOADDEFAULTDATE";
    dataparam["PROGNAME"] = "GET_GLTRNBANKRECON";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnStDate").val(rowData[0].SDT);
                $("#hdnEndDate").val(rowData[0].EDT);
            }
        },
    });

    return rowData;
};



function fnCallNarrPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "NarrPopup",
        head: "Narration",
        position: "center",
        minWidth: 550,
        maxWidth: 550,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 550,
            maxWidth: 550,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "textarea",
                                    id: "txtLineNarr",
                                    stringResult: true,
                                    label: "Line Narration",
                                    labelAlign: "Right",
                                    labelWidth: 90,
                                    inputWidth: 500,
                                    height:150,
                                    width: 500,
                                    disabled:true,
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
                                                     var itemval = $$("GridData").getSelectedItem();
                                                     itemval.Narr = $.trim($$("txtLineNarr").getValue()).replace(/&/g, '');
                                                     $$("GridData").refresh();
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
}


function fnGridPrint() {
    debugger;
    if (window.PAGETYPE == "1")
        var vHeader = "Bank Reconcillation";
    else if (window.PAGETYPE == "2")
        var vHeader = "Reconcillation Reversing";
    var FullData = "";

    FullData = $$("GridData").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("GridData"), {
            docHeader: vHeader,
            fit: "page",
            style: true,
            spans: true,
            scroll: false,
            mode: "landscape"
        });
    }
    else {
        alert("Records not present in Report");
    }


};


function fnExcelExport() {
    var vHeader = $("#LayoutText").val();
    var FullData = "";
    FullData = $$("GridData").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("GridData"), {
            filename: vHeader,
            styles: true,
            name: vHeader,
            docHeader: vHeader,
            rawValues: true,
        });
    }
    else {
        alert("Records not present in Report");
    }
};


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

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}


function CurrencyFormat()
{ return webix.Number.numTostr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) }

//webix.event(window, "resize", function () {
//     gridResize("1");
//});
//function gridResize(choice) {
//    debugger;
//    var vWidth = $("#divform").width();
//    $$("frmBankRecon").define("width", vWidth);
//    $$("frmBankRecon").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmBankRecon").define("height", vheight - 100);
//    $$("frmBankRecon").resize();
//    var vWidth = $("#divform").width();
//    $$("frmBankRecon").define("width", vWidth);
//    $$("frmBankRecon").resize();
//    if (choice == "1") {
//        var offsetTop = $$("GridData").getNode().offsetTop;


//        $$("GridData").define("height", ((vheight - offsetTop - 160)));
//        $$("GridData").adjust();
//    }

//}