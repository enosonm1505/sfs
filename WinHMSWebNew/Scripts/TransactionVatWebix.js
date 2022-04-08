webix.protoUI({
    name: 'NText',
    pattern: { mask: "####-##-##" },
    $init: function (config) {

        this.attachEvent("onKeyPress", function (code, e) {

            if (code > 31 && (code != 35 && code != 36 && code != 37 && code != 38 && code != 39 && code != 40 && code != 46 && code != 110 && code != 190 && (code < 48 || code > 57))) return false;

        });

    }

}, webix.ui.text);

var row3 = {

    cols: [
        {},
        {},
        {
            align: "right",
            rows: [
              {
                  cols: [{
                      view: "button",
                      id: "addrowGst",
                      width: 60,
                      type: "icon",
                      icon: "wxi-plus",
                      click: function () {
                          var addrow = {
                              HSN_CD: '', CAT_ID: '', TaxClass: '', TAX_CLASS_ID: '', ixTc1Per: '', ixTc1Amt: '', ixTc1Cd: '',
                              ixTc1vInd: '', ixTc2Per: '', ixTc2Amt: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Per: '', ixTc3Amt: '',
                              ixTc3Cd: '', ixTc3vInd: '', ixTc4Per: '', ixTc4Amt: '', ixTc4Cd: '', ixTc4vInd: '', TaxAmount: '',
                              ixTc1Cd: '', ixTc1vInd: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Cd: '', ixTc3vInd: '', ixTc4vInd: '', TRN_ID_SRNO: '',
                              TAX_PER: '', TAXABLE_AMT: '', REM: '', TX_TY: '', IGST_ID: '', CGST_ID: '', SGST_ID: '', CESS_ID: '', IN_TY: '',
                              IGST_REBIND: '', CGST_REBIND: '', SGST_REBIND: '', CESS_REBIND: '', DC: localStorage.getItem("DC"), BILL_ITEM_NM: localStorage.getItem("AC_NM"),
                          };
                          $$("GstGrid").add(addrow);
                          $$("GstGrid").refresh();
                      },
                  }, {
                      view: "button",
                      id: "deleterowGst",
                      width: 60,
                      type: "icon",
                      icon: "wxi-trash",
                      click: function () {
                          if ($$("GstGrid").getSelectedId() != undefined) {
                              var id = $$("GstGrid").getSelectedId();
                              var getitem = $$("GstGrid").getItem(id);
                              //if (getitem.HDN != "1") {
                              $$("GstGrid").remove($$("GstGrid").getSelectedId());
                              $$("GstGrid").refresh();
                              //}
                          }
                      },
                  }],
              }],
        }]
}
var saveIcon = "<span class='fa fa-save' ></span>";
var closeIcon = "<span class='fa fa-close' ></span>";
var row4 = {

    cols: [{},
           {},
{
    //align: "right",
    rows: [{
        cols: [{
            view: "button",
            id: "SaveGst",
            width: 60,
            label: saveIcon,
            click: function () {
                saveGst();
            },
        }, {
            view: "button",
            id: "CancelGst",
            width: 60,
            label: closeIcon,
            click: function () {
                $$("GstEntry").hide();
            },
        }],
    }],
}]
}

var row1 = {
    view: "select",
    id: "GstBillDrop",
    width: 300, labelWidth: 120,
    label: "Bill No",
    options: [],
    on: {
        'onChange': function (e) {
            GstBillDropChange(e);
        }

    }
}
var searchicon = "<span class='fa fa-search' ></span>";
var row2 = {
    view: "tabview",
    id: "vatTabs",
    minWidth: 1050,
    maxWidth: 1050,
    height: 400,
    tabbar: {
        width: 200,
    },
    cells: [
        //width:200,
        {
            header: "Main",
            id: "gstTab",
            scroll: true,
            //height:350,
            body: {
                rows: [
                    row3,
                    //Cell1 Row1
                    {
                        view: "datatable",
                        id: "GstGrid",
                        editable: true,
                        select: 'row',
                        columns: [ 
                            { id: "HSN_CD", header: "HSN Code", width: 100, editor: "text", editor: "text", hidden: true },
                            { header: "", id: "HCDButtonType", width: 50, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                            { id: "TaxCode", header: "Tax Code", width: 100, editor: "text", },
                            { header: "", id: "ButtonType", width: 50, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                            { id: "TaxClass", header: "Tax Class", width: 100, },
                            { id: "TAX_CLASS_ID", header: "", hidden: true, },
                            { id: "TaxAmount", header: "Taxable Amt", width: 100, editor: "text", liveEdit: true },
                            { id: "ixTc1Per", header: "CGST%", width: 100, },
                            { id: "ixTc1Amt", header: "CGST Amt", width: 100, },
                            { id: "ixTc2Per", header: "SGST%", width: 100, },
                            { id: "ixTc2Amt", header: "SGST Amt", width: 100,},
                            { id: "ixTc3Per", header: "IGST%", width: 100, },
                            { id: "ixTc3Amt", header: "IGST Amt", width: 100,  },
                            { id: "ixTc4Per", header: "Cess%", width: 100, },
                            { id: "ixTc4Amt", header: "Cess Amt", width: 100, },
                            { id: "CAT_ID", header: "", hidden: true, width: 100, hidden: true },
                            { id: "ixTc1Cd", header: "", hidden: true },
                            { id: "ixTc1vInd", header: "", hidden: true },
                            { id: "ixTc2Cd", header: "", hidden: true },
                            { id: "ixTc2vInd", header: "", hidden: true },
                            { id: "ixTc3Cd", header: "", hidden: true },
                            { id: "ixTc3vInd", header: "", hidden: true },
                            { id: "ixTc4Cd", header: "", hidden: true },
                            { id: "ixTc4vInd", header: "", hidden: true },
                            { id: "TRN_ID_SRNO", header: "", hidden: true },
                            { id: "TAX_PER", header: "", hidden: true },
                            { id: "TAXABLE_AMT", header: "", hidden: true },
                            { id: "REM", header: "", hidden: true },
                            { id: "TX_TY", header: "", hidden: true },
                            { id: "IGST_ID", header: "", hidden: true },
                            { id: "CGST_ID", header: "", hidden: true },
                            { id: "SGST_ID", header: "", hidden: true },
                            { id: "CESS_ID", header: "", hidden: true },
                            { id: "IN_TY", hidden: true },
                            { id: "IGST_REBIND", header: "", hidden: true },
                            { id: "CGST_REBIND", header: "", hidden: true },
                            { id: "SGST_REBIND", header: "", hidden: true },
                            { id: "CESS_REBIND", header: "", hidden: true },
                            { id: "DC", hidden: true },
                            { id: "BILL_ITEM_NM", hidden: true },
                            { id: "HCD", hidden: true },
                        ],
                        on: {
                            'onItemClick': function (id) {
                                debugger;
                                var getval = this.getItem(id.row);
                                if (id.column == "ButtonType") {
                                    
                                    TaxClassGridGrid();
                                    this.refresh();
                                }
                                else if (id.column == "HCDButtonType") {
                                    
                                    HCDHSNGrid();
                                    this.refresh();
                                }
                                this.refresh();
                            },
                            'onLiveEdit': function (old,id) {
                                debugger;
                                var getval = this.getItem(id.row);
                                if (id.column == "TaxAmount") {
                                    var TaxAmt = getval.TaxAmount;
                                    //var Griddata = $("#GstGrid").data().kendoGrid.dataSource.data()[gstindx];
                                    //if (getval.ixTc1Per != undefined && getval.ixTc1Per != "")
                                    //    getval.ixTc1Amt = ((parseFloat(TaxAmt) * (100)) / (parseFloat(getval.ixTc1Per) + (100))).toFixed(2);
                                    //if (getval.ixTc2Per != undefined && getval.ixTc2Per != "")
                                    //    getval.ixTc2Amt = ((parseFloat(TaxAmt) * (100)) / (parseFloat(getval.ixTc2Per) + (100))).toFixed(2);
                                    //if (getval.ixTc3Per != undefined && getval.ixTc3Per != "")
                                    //    getval.ixTc3Amt = ((parseFloat(TaxAmt) * (100)) / (parseFloat(getval.ixTc3Per) + (100))).toFixed(2);
                                    //if (getval.ixTc4Per != undefined && getval.ixTc4Per != "")
                                    //    getval.ixTc4Amt = ((parseFloat(TaxAmt) * (100)) / (parseFloat(getval.ixTc4Per) + (100))).toFixed(2);

                                    if (getval.ixTc1Per != undefined && getval.ixTc1Per != "") {
                                        var Actual = (parseFloat(TaxAmt)) *  (parseFloat(getval.ixTc1Per) / (100));
                                        getval.ixTc1Amt = Actual.toFixed(2);
                                        
                                    }
                                    if (getval.ixTc2Per != undefined && getval.ixTc2Per != "") {
                                        var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.ixTc2Per) / (100));
                                        getval.ixTc2Amt = Actual.toFixed(2);
                                    }
                                    if (getval.ixTc3Per != undefined && getval.ixTc3Per != "") {
                                        var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.ixTc3Per) / (100));
                                        getval.ixTc3Amt = Actual.toFixed(2);
                                    }
                                    if (getval.ixTc4Per != undefined && getval.ixTc4Per != "") {
                                        var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.ixTc4Per) / (100));
                                        getval.ixTc4Amt = Actual.toFixed(2);
                                    }

                                    this.refresh();
                                }
                                billChangeTaxSave();
                            }
                        }
                    }
                ],
            },

        },
        {
            header: "Gst Details",
            id: "gstTab",
            body: {
                scroll: true,
                view: "form",
                height: 420,
                elements: [
                    {
                        rows: [
                            {
                                cols: [
                                    {
                                        view: "search",
                                        id: "SrchPartyNm",
                                        width: 300, labelWidth: 120,
                                        label: "Party Nm",
                                        hidden: true,
                                        on: {
                                            "onItemClick": function () {
                                                
                                                partyGrid();
                                                $("GstPartySrch").show();
                                            }
                                        }
                                    },

                                {

                                    cols: [{
                                        view: 'label',
                                        label: "",
                                    }]
                                },
                                {
                                    paddingX: 30,
                                    cols: [
                                       {
                                           view: "button",
                                           id: "AddCashBill",
                                           width: 100,
                                           label: "Add Cash Bill",
                                           on: {
                                               "onItemClick": function (e) {
                                                   //$("#GstBillDrop").data("kendoDropDownList").data([]);
                                                   //$$("GstDetailBillNo").setValue("");
                                                   //$$("GstDetailBillAmt").setValue("");
                                                   $$("GstDetailBillNo").enable(false);
                                                   $$("SaveBill").enable(false);

                                                   $$("SrchPartyNm").show();
                                                   $$("BillType").show();
                                                   $$("GSTSupplierType").hide();
                                                   $$("RevChrgeChk").hide();
                                                   $$("RevChargePer").hide();
                                                   $$("RevChrgReason").hide();
                                                   $$("BoeNo").hide();
                                                   $$("BoeAmt").hide();
                                                   $$("BOEDT").hide();
                                                   $$("GstIn").hide();
                                                   $$("StateNM").hide();
                                                   $$("SrchPartyNm").setValue("");
                                               }
                                           }
                                       },
                                           {
                                               view: "button",
                                               id: "SaveBill",
                                               width: 100,
                                               label: "Save Bill",
                                               disabled: true,
                                               on: {
                                                   'onItemClick': function () {
                                                       billChangeTaxSave();
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
                                        view: "select",
                                        id: "RegType",
                                        width: 300, labelWidth: 120,
                                        label: "Reg Type",
                                        options: GstDropLoad("GstRegGTypeLoad"),
                                        onChange: function () { RegTypeChange(); },
                                    },
                                    {
                                        view: "select",
                                        id: "ddlSupvat",
                                        width: 300, labelWidth: 120,
                                        label: "Supplier Vat Group",
                                        options: GstDropLoad("GstSupVatLoad"),
                                    },
                                    {
                                        paddingX: 30,
                                        cols: [{
                                            view: "search",
                                            id: "workOrderno",
                                            width: 300, labelWidth: 120,
                                            label: "Work Order No",
                                            hidden: true,
                                        }]
                                    },
                                ]
                            },
                            {
                                view: 'label',
                                label: "",
                            },
                            {
                                cols: [
                                    {
                                        view: "select",
                                        id: "TrnType",
                                        width: 300, labelWidth: 120,
                                        label: "Trn Type",
                                        options: GstDropLoad("GstTrnTypeLoad"),
                                        //options: [],
                                    },
                                    {
                                        paddingX: 20,
                                        cols: [
                                            {
                                                view: "text",
                                                id: "GstDetailBillNo",
                                                labelWidth: 70,
                                                width: 200,
                                                label: "Bill no",
                                                disabled: true,
                                                on: {
                                                    onBlur: function () {
                                                        
                                                        var BillNoVal = $$("GstDetailBillNo").getValue();
                                                        var billNo = $$("GstBillDrop").getValue();
                                                        if (billNo == "") {
                                                            $$("GstBillDrop").define("options", [{ id: BillNoVal, value: BillNoVal }]);
                                                            $$("GstBillDrop").refresh();
                                                            $$("GstBillDrop").setValue(BillNoVal);

                                                        }
                                                        else {
                                                            
                                                            var data = $$("GstBillDrop").config.options;
                                                            $$("GstBillDrop").define("options", []);

                                                            var arr = [];
                                                            $.each(data, function (key, value) {
                                                                if (value.id != billNo) { arr.push(value); }
                                                            });
                                                            var set = { id: BillNoVal, value: BillNoVal };
                                                            arr.push(set)
                                                            $$("GstBillDrop").define("options", arr);
                                                            $$("GstBillDrop").setValue(BillNoVal);
                                                        }

                                                    }
                                                }
                                            },
                                           {
                                               paddingX: 20, cols: [
                                    {
                                        view: "NText",
                                        id: "GstDetailBillAmt",
                                        labelWidth: 80,
                                        width: 180,
                                        label: "Bill Amt",

                                    }]
                                           }
                                        ]
                                    },
                                    {
                                        view: 'label',
                                        label: "",
                                    }
                                ]
                            },
                            {

                                cols: [
                                    {
                                        view: "select",
                                        id: "BillType",
                                        width: 300, labelWidth: 120,
                                        label: "Bill Type",
                                        options: GstDropLoad("GstBillTypeLoad"),
                                    },
                                    {
                                        paddingX: 20,
                                        cols: [{
                                            view: "datepicker",
                                            id: "GstDetailBillDate",
                                            width: 200, labelWidth: 70,
                                            label: "Bill dt",
                                            format: "%d/%m/%Y",
                                        }]
                                    },
                                    {
                                        view: "NText",
                                        id: "GstVatRegNo",
                                        labelWidth: 80,
                                        width: 180,
                                        label: "Vat Reg.No",
                                    }
                                ]
                            },
                            {
                                view: 'label',
                                label: "", hidden: true,
                            },
                            {
                                cols: [
                                    {
                                        view: "select",
                                        id: "SupplyType",
                                        width: 300, labelWidth: 120,
                                        label: "Supply Type",
                                        options: GstDropLoad("GSTSupplierType"), //hidden: true,
                                        onChange: function (e) {
                                            SupplyTypeChange(e);
                                        }
                                    },
                                    {
                                        view: 'label',
                                        label: "", hidden: true,
                                    },
                                    {
                                        view: 'label',
                                        label: "", hidden: true,
                                    }
                                ]
                            },
                            {
                                view: 'label',
                                label: "",
                            },
                            {

                                cols: [{
                                    //frmStype
                                    id: "frmStype",
                                    rows: [{
                                        cols: [{
                                            view: "select",
                                            id: "GSTSupplierType",
                                            width: 180,
                                            label: "Supplier Type",
                                            options: GstDropLoad("GSTSupplierType"),
                                            //hidden: true,
                                        },
                                     {
                                         paddingX: 20,
                                         cols: [
                                      {
                                          view: "search",
                                          id: "POSPlaceNM",
                                          labelWidth: 50,
                                          width: 150,
                                          label: "Pos",
                                          //hidden: true,
                                          onChange: function () {
                                              $("#PlaceTy").val("1");
                                              PosAndStateSearchArg();
                                              var window = $("#StateSearchPop");
                                              var kWnd = window.data("kendoWindow");
                                              kWnd.center().open();
                                          }
                                      }]
                                     }],
                                    },
                                    {
                                        view: "checkbox",
                                        id: "RevChrgeChk",
                                        width: 300, labelWidth: 120,
                                        label: "Rev.chrg",
                                        //hidden: true,
                                        onChange: function () {
                                            if (this.checked == true)
                                                REVDIV2(1);
                                            else REVDIV2(0);
                                        }
                                    }, {
                                        view: "NText",
                                        id: "RevChargePer",
                                        width: 300, labelWidth: 120,
                                        label: "Rev.chrg %",
                                        //hidden: true,
                                    }, {
                                        view: "text",
                                        id: "RevChrgReason",
                                        width: 300, labelWidth: 120,
                                        label: "Reason",
                                        //hidden: true,
                                    }],

                                },
                                    {
                                        paddingX: 20,
                                        rows: [{
                                            view: "search",
                                            id: "GstIn",
                                            width: 300, labelWidth: 120,
                                            label: "Gst Reg.No.", hidden: true,
                                        }, {
                                            view: "search",
                                            id: "StateNM",
                                            width: 300, labelWidth: 120,
                                            label: "State", //hidden: true,
                                            onChange: function () {
                                                $("#PlaceTy").val("2");
                                                PosAndStateSearchArg();
                                                var window = $("#StateSearchPop");
                                                var kWnd = window.data("kendoWindow");
                                                kWnd.center().open();
                                            }
                                        }]
                                    },
                                    {
                                        id: "frmOrginal",
                                        paddingX: 20,
                                        view: "fieldset",
                                        label: "Orginal Bill",
                                        //hidden: true,
                                        body: {
                                            rows: [{
                                                view: "text",
                                                id: "txtNo",
                                                width: 200,
                                                label: "No",
                                            }, {

                                                view: "datepicker",
                                                id: "dateDt",
                                                width: 200,
                                                label: "Date",
                                                format: "%d/%m/%Y",
                                            }]
                                        }
                                    }

                                ]
                            },

                            //FraImpGds
                               {
                                   id: "FraImpGds",
                                   cols: [{
                                       rows: [{
                                           cols: [{
                                               view: "NText",
                                               id: "BoeNo",
                                               width: 180,
                                               labelWidth: 70,
                                               label: "BOE No",
                                               //hidden: true,
                                           },
                                          {
                                              paddingX: 20,
                                              cols: [
                                          {
                                              view: "NText",
                                              id: "BoeAmt",
                                              label: "BOE Amt",
                                              labelWidth: 50,
                                              width: 150,
                                              //hidden: true,
                                          }],
                                          }],
                                       }, {
                                           view: "datepicker",
                                           id: "BOEDT",
                                           width: 150,
                                           label: "BOE Dt",
                                           format: "%d/%m/%Y",
                                           //hidden: true,
                                       },
                                    {
                                        view: "text",
                                        id: "PortCd",
                                        width: 300, labelWidth: 120,
                                        label: "Port Cd",
                                        //hidden: true,
                                    }
                                       ]
                                   }],
                               },

                               {
                                   id: "frmSup",
                                   cols: [
                                  {
                                      rows: [{
                                          view: "text",
                                          id: "txtBrnNo",
                                          width: 300, labelWidth: 120,
                                          label: "BRN Number",
                                          //hidden: true,

                                      }, {
                                          view: "text",
                                          id: "txtTanNo",
                                          width: 300, labelWidth: 120,
                                          label: "TAN Number",
                                          //hidden: true,
                                      }, {
                                          view: "text",
                                          id: "txtNationalId",
                                          width: 300, labelWidth: 120,
                                          label: "National ID Number",
                                          //hidden: true,
                                      },
                                      ]
                                  },
                                   ]
                               },
                        ]
                    }]
            },
        }
    ]

}

function CreatingVatPopup() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstEntry",
        scroll: true,
        height: 550,
        position: "center",
        body: {
            rows: [row1, row2, row4]
        }
    });
    var addrow = {
        HSN_CD: '', CAT_ID: '', TaxClass: '', TAX_CLASS_ID: '', ixTc1Per: '', ixTc1Amt: '', ixTc1Cd: '',
        ixTc1vInd: '', ixTc2Per: '', ixTc2Amt: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Per: '', ixTc3Amt: '',
        ixTc3Cd: '', ixTc3vInd: '', ixTc4Per: '', ixTc4Amt: '', ixTc4Cd: '', ixTc4vInd: '', TaxAmount: '',
        ixTc1Cd: '', ixTc1vInd: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Cd: '', ixTc3vInd: '', ixTc4vInd: '', TRN_ID_SRNO: '',
        TAX_PER: '', TAXABLE_AMT: '', REM: '', TX_TY: '', IGST_ID: '', CGST_ID: '', SGST_ID: '', CESS_ID: '', IN_TY: '',
        IGST_REBIND: '', CGST_REBIND: '', SGST_REBIND: '', CESS_REBIND: ''
    };
    $$("GstGrid").add(addrow);
    $$("GstGrid").refresh();
}
var BillType = "B";
function LoadVisibleItemGst() {
    var IN_VAT_IND = $("#IN_VAT_IND").val();
    var IN_GST_IND = $("#IN_GST_IND").val();
    $$("frmStype").hide();
    $$("frmSup").hide();
    $$("FraImpGds").hide();
    $$("frmOrginal").hide();
    $$("GstIn").config.label = "Reg No";   //ssCompany1.caption = Trim(TAX_CAPTION) & "Details"
    //ssTab.TabCaption(1) = Trim(TAX_CAPTION) & "Details"

    var GW_IND = 0;//  $("#GW_IND").val();
    if (GW_IND == 1) {
        $$("workOrderno").show();
    }
    else {
        $$("workOrderno").hide();
    }

    //If Bty = "V" Then
    //ssTab.TabVisible(1) = False
    //cmbbillno.Visible = False
    //lblInvNo.Visible = False
    //End If


    var partyTy = localStorage.getItem("Pty");
    if (IN_VAT_IND == "1") {

        var tab = $$("vatTabs").getTabbar();
        tab.config.options[1].value = "Vat Details";
        tab.render();

        $$("frmStype").hide();
        $$("StateNM").hide();//State
        //$$("TrnType").hide(); //TrnTy
        //document.getElementById("TrnType").style.visibility = "hidden";
        $$("SupplyType").show();//supply
        $$("RegType").hide();//Reg Type
        $$("frmSup").hide();
        $$("SupplyType").hide();
        if (partyTy == "S") {
            $$("RegType").hide();
            $$("ddlSupvat").show();

            req = [];
            set = { "PartyTy": "S" };
            req.push(set);
            var ddlData = GstDataLoad("GstSupVatLoad", JSON.stringify(set));
            $$("ddlSupvat").define("options", ddlData);
        }
        else {
            $$("RegType").hide();
            $$("TrnType").hide();
            $$("frmSup").hide();
            $$("ddlSupvat").config.label = "Tax Category";
        }
    }
    else if (IN_GST_IND == "1") {
        $$("frmStype").show();
        $$("SupplyType").hide();
        var tab = $$("vatTabs").getTabbar();
        tab.config.options[1].value = "GST Details";
        tab.render();
    }
    $.ajax({
        type: "POST",
        url: "/GLTransaction/GstGridCol",
        cache: false,
        async: false,
        data: [],
        success: function (data) {
            
            if (data != undefined && data != null && data != "") {
                dataRec = JSON.parse(data);
                if (IN_VAT_IND == "1") {
                    $$("GstGrid").hideColumn("HSN_CD");
                    $$("GstGrid").hideColumn("HCDButtonType");
                }
                else {
                    $$("GstGrid").showColumn("HSN_CD");
                    $$("GstGrid").showColumn("HCDButtonType");
                }
                $$("GstGrid").hideColumn("ixTc1Per");
                $$("GstGrid").hideColumn("ixTc1Amt");
                $$("GstGrid").hideColumn("ixTc2Per");
                $$("GstGrid").hideColumn("ixTc2Amt");
                $$("GstGrid").hideColumn("ixTc3Per");
                $$("GstGrid").hideColumn("ixTc3Amt");
                $$("GstGrid").hideColumn("ixTc4Per");
                $$("GstGrid").hideColumn("ixTc4Amt");

                $.each(dataRec, function (K, v) {
                    if (v.TAX_COMP_IND == "1") {
                        $$("GstGrid").showColumn("ixTc3Per");
                        $$("GstGrid").showColumn("ixTc3Amt");
                        if (IN_VAT_IND == "1") {
                            $$("GstGrid").getColumnConfig("ixTc3Per").header = "Vat %";
                            $$("GstGrid").getColumnConfig("ixTc3Amt").header = "Vat Amt";
                            $$("GstGrid").refreshColumns();
                        }
                    }
                    else if (v.TAX_COMP_IND == "2") {
                        $$("GstGrid").showColumn("ixTc1Per");
                        $$("GstGrid").showColumn("ixTc1Amt");
                    }
                    else if (v.TAX_COMP_IND == "3") {
                        $$("GstGrid").showColumn("ixTc2Per");
                        $$("GstGrid").showColumn("ixTc2Amt");
                    }
                    else if (v.TAX_COMP_IND == "4") {
                        $$("GstGrid").showColumn("ixTc4Per");
                        $$("GstGrid").showColumn("ixTc4Amt");
                    }
                });
            }
        }
    });

}


var GstHCDLoad = function () {
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/GLTransaction/LoadHCD",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: {},
        success: function (_Data) {
            if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
                var d = JSON.parse(_Data);
                $$("GstHCDGrid").clearAll();
                $$("GstHCDGrid").parse(d.TrnTy);
            }
        }
    });
}

function HCDHSNGrid() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstHCDSrch",
        head: "Tax Search",
        position: "center",
        maxWidth: 500,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "GstHCDGrid",
                select: 'row',
                height: 420,
                editable: false,
                scroll: "y",
                columns: [
                    { id: "HCD", header: ["Tax Code", { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                    { id: "HCD_TXT", header: ["Account Name", { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' }, },
                    { id: "Type", hidden: true },
                ],
                data: [],
                on: {
                    'onItemdblClick': function (id) {
                        
                        var getval = this.getItem(id.row);
                        var gstgrd = $$("GstGrid").getSelectedId();
                        var gstValue = $$("GstGrid").getItem(gstgrd.id);
                        gstValue.HCD = getval.HCD;
                        gstValue.HSN_CD = getval.HCD
                        $$("GstGrid").refresh();
                        $$("GstHCDSrch").hide();
                    },
                },
            }]
        }
    });
    GstHCDLoad();

    $$("GstHCDGrid").refresh();
    $$("GstHCDSrch").show();

}

function TaxClassGridGrid() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstTaxSrch",
        head: "Tax Search",
        position: "center",
        minWidth: 380,
        maxWidth: 450,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "TaxClassGrid",
                select: 'row',
                height: 380,
                editable: false,
                scroll: "y",
                columns: [
                    { id: "AC_ID", hidden: true, header: ["Tax Code", { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                    { id: "AC_NM", header: ["Account Name", { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' }, },
                    { id: "Tax_per", hidden: true },
                    { id: "Shrt_nm", hidden: true },
                ],
                data: [],
                on: {
                    'onItemdblClick': function (id) {
                        
                        var getval = this.getItem(id.row);
                        getval.TaxAmount = $$("GstDetailBillAmt").getValue();
                        taxdblClick(getval);
                        $$("GstGrid").refresh();
                    },
                },
            }]
        }
    });
    GstTaxLoad();

    $$("TaxClassGrid").refresh();
    $$("GstTaxSrch").show();

}

var GstTaxLoad = function () {
    debugger;
    var dataRec = "";
    var vTy = $("#Trantype").val();
    var bTy = "";//"V";
    var TaxTy = localStorage.getItem("TaxTy");
    var ddlSupTy =  $$("SupplyType").getValue();
    var ddlSupVat = $$("ddlSupvat").getValue();
    $.ajax({
        type: "POST",
        url: "/GLTransaction/GSTTaxClassLoad",
        cache: false,
        async: false,
        data: "vTy=" + vTy + "&bty=" + bTy + "&SupTy=" + ddlSupTy + "&SupVat=" + ddlSupVat,
        success: function (data) {
            
            rowDatad = JSON.parse(data);
            $$("TaxClassGrid").clearAll();
            $$("TaxClassGrid").parse(rowDatad);
            $$("TaxClassGrid").refresh();
        }
    });
}

function taxdblClick(val) {
    var grid = $("#TaxClassGrid");
    var AC_ID = val.AC_ID;
    var AC_NM = val.AC_NM;
    var taxPer = val.Tax_per;
    var ShortName = val.Shrt_nm;
    var GstGrid = $$("GstGrid");

    $.ajax({
        type: "POST",
        url: "/GLTransaction/GSTTAXLOAD",
        data: "ID=" + AC_ID + "&PER=" + AC_NM,
        async: false,
        success: function (data) {
            var getval = $$("GstGrid").getSelectedId();
            
            var gstindx = $$("GstGrid").getItem(getval.id);

            gstindx.TAX_CLASS_ID = AC_ID;
            gstindx.TaxCode = AC_ID;
            gstindx.TaxClass = AC_NM;
            gstindx.ixTc1Per = data.v.ixTc1Per;
            gstindx.ixTc1Amt = data.v.ixTc1Amt;
            gstindx.ixTc1Cd = data.v.ixTc1Cd;
            gstindx.ixTc1vInd = data.v.ixTc1vInd;

            gstindx.ixTc2Per = data.v.ixTc2Per;
            gstindx.ixTc2Amt = data.v.ixTc2Amt;
            gstindx.ixTc2Cd = data.v.ixTc2Cd;
            gstindx.ixTc2vInd = data.v.ixTc2vInd;

            gstindx.ixTc3Per = data.v.ixTc3Per;
            gstindx.ixTc3Amt = data.v.ixTc3Amt;
            gstindx.ixTc3Cd = data.v.ixTc3Cd;
            gstindx.ixTc3vInd = data.v.ixTc3vInd;

            gstindx.ixTc4Per = data.v.ixTc4Per;
            gstindx.ixTc4Amt = data.v.ixTc4Amt;
            gstindx.ixTc4Cd = data.v.ixTc4Cd;
            gstindx.ixTc4vInd = data.v.ixTc4vInd;
            var TaxAmt = $$("GstDetailBillAmt").getValue();
            //var Griddata = $("#GstGrid").data().kendoGrid.dataSource.data()[gstindx];
            if (data.v.ixTc1Per != undefined && data.v.ixTc1Per != "") {
                var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(data.v.ixTc1Per) + (100));
                gstindx.ixTc1Amt = (TaxAmt - Actual).toFixed(2);
                gstindx.TaxAmount = Actual;
            }
            if (data.v.ixTc2Per != undefined && data.v.ixTc2Per != "") {
                var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(data.v.ixTc2Per) + (100));
                gstindx.ixTc2Amt = (TaxAmt - Actual).toFixed(2);
                gstindx.TaxAmount = Actual;
            }
            if (data.v.ixTc3Per != undefined && data.v.ixTc3Per != "") {
                var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(data.v.ixTc3Per) + (100));
                gstindx.ixTc3Amt = (TaxAmt - Actual).toFixed(2);
                gstindx.TaxAmount = Actual.toFixed(2);
            }
            if (data.v.ixTc4Per != undefined && data.v.ixTc4Per != "") {
                var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(data.v.ixTc4Per) + (100));
                gstindx.ixTc4Amt = (TaxAmt - Actual).toFixed(2);
                gstindx.TaxAmount = Actual.toFixed(2);
            }
            $$("GstGrid").refresh();
            $$("GstTaxSrch").hide();
        }
    });
    billChangeTaxSave();
}

function partyGrid() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstPartySrch",
        head: "Party Search",
        position: "center",
        minWidth: 380,
        maxWidth: 450,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "GstPartyGrid",
                select: 'row',
                height: 380,
                editable: false,
                scroll: "y",
                columns: [
                    { id: "AC_CD", hidden: true, header: ["Account Code", { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                    { id: "AC_NM", header: ["Account Name", { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' }, },
                    { id: "AC_ID", hidden: true },
                    //{ id: "BillDeatil_IND", hidden: true },
                ],
                data: [],
                on: {
                    'onItemdblClick': function (id) {
                        var getval = this.getItem(id.row);
                        $$("SrchPartyNm").setValue(getval.AC_NM);
                        $("#GSTPARTYID").val(getval.AC_ID);

                        GstPartyDblClick(getval.AC_ID);
                        $("GstPartySrch").show();
                    },
                },
            }]
        }
    });
    GstPartyLoad();

    //$$("PartyAcGrid").eachColumn(function (id, col) {
    //    
    //    var filter = this.getFilter(id).focus();
    //    //if (id == "AC_NM") {
    //    //    filter.value = SearchVal;
    //    //    filter.autofocus = true;
    //    //}
    //});
    $$("GstPartyGrid").refresh();
    $$("GstPartySrch").show();

}

var GstPartyLoad = function () {
    var dataRec = "";
    var vTy = $("#Trantype").val();
    $.ajax({
        type: "POST",
        url: "/GLTransaction/GstPartyLoad",
        cache: false,
        async: false,
        data: "vTy=" + vTy,
        success: function (data) {
            
            rowDatad = JSON.parse(data);
            $$("GstPartyGrid").clearAll();
            $$("GstPartyGrid").parse(rowDatad);
            $$("GstPartyGrid").refresh();
        }
    });
}

var GstPartyDblClick = function (AcId) {
    var PartyTy = '';
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/GLTransaction/GstPartyDblClick",
        cache: false,
        async: false,
        data: "AcId=" + AcId,
        success: function (data) {
            if (data != undefined && data != null && data != "") {
                dataRec = JSON.parse(data);
                if (dataRec.length > 0) {
                    PartyTy = dataRec[0].PARTY_TY_ID;
                    if (PartyTy == "S" || vTy == "5")
                        vSupcat = dataRec[0].PARTY_TAX_GR_ID;
                    else
                        vSupcat = dataRec[0].TX_SPL_IND;


                    //Call prcSetName(CStr(vSupcat), cmbsupvat)
                    $$("txtBrnNo").setValue(dataRec[0].oth1_no);
                    $$("txtTanNo").setValue(dataRec[0].oth2_no);
                    //edbId.Text = dataRec[0].oth3_no;
                    $$("GstIn").setValue(dataRec[0].TX_RG_NO);
                    $$("GstVatRegNo").setValue(dataRec[0].TX_RG_NO);
                    $$("GstPartySrch").hide();
                }

            }
        }
    });
}

function GstDropLoad(id) {
    var _Data = "";
    $.ajax({
        type: "POST",
        url: "/GLTransaction/" + id,
        async: false,
        success: function (data) {
            if (data != "")
                _Data = data;
            else _Data = [];
        }
    });
    return _Data
}

function GstDataLoad(id, data) {
    var _Data = "";
    $.ajax({
        type: "POST",
        url: "/GLTransaction/" + id,
        data: "req=" + data,
        async: false,
        success: function (data) {
            if (data != "")
                _Data = data;
            else _Data = [];
        }
    });
    return _Data
}

function BillDropBasedValues(BillNo, MainRowInx, BillDate, GstDetailBillNo, PartyName, Depit, Credit) {

    
    $$("GstDetailBillDate").setValue(BillDate);
    $$("SrchPartyNm").setValue(PartyName);
    $$("GstDetailBillNo").setValue(BillNo);
    if (Depit != null && Depit != "")
        $$("GstDetailBillAmt").setValue(Depit);
    else if (Credit != null && Credit != "")
        $$("GstDetailBillAmt").setValue(Credit);
    $("#GSTPARTYID").val(MainRowInx);
    //$$("GstDetailBillAmt"). disable

    var _partyId = "";
    var vPartyTy = "";
    var supid = [];
    var cmpid = [];
    grid = $("#grid").data("kendoGrid")
    var Hdata = grid.dataSource._data;
    if (Hdata != 0) {
        $.each(Hdata, function (key, value) {
            var MainRowInx = value.AC_ID;
            _partyId = MainRowInx;
            if ((_partyId.toString().substring(0, 12) == "000100010004") || (_partyId.toString().substring(0, 12) == "000200040003")) {
                if (_partyId.toString().substring(0, 12) == "000100010004") {
                    set = {};
                    vPartyTy = "C";
                    set["id"] = _partyId;
                    set["ty"] = "C";
                    cmpid.push(set);
                }
                else if (_partyId.toString().substring(0, 12) == "000200040003") {
                    set = {};
                    vPartyTy = "S";
                    set["id"] = _partyId;
                    set["ty"] = "S";
                    supid.push(set);
                }
            }

        });

        if (vPartyTy != undefined && vPartyTy != "") {
            if (supid.length > 0) {
                MainRowInx = supid[(supid.length - 1)].id;
                vPartyTy = supid[(supid.length - 1)].ty;
                partyDetails(MainRowInx, vPartyTy);
            }
            else if (cmpid.length > 0) {
                MainRowInx = cmpid[(cmpid.length - 1)].id;
                vPartyTy = cmpid[(cmpid.length - 1)].ty;
                partyDetails(MainRowInx, vPartyTy);
            }
        }
    }
}

//Webix
$("#grid").on("click", "td", function (e) {
    var hdnGstGrddata = localStorage.getItem("GstHdnGrd");
    var pageRev = localStorage.getItem("PageRev");
    if (pageRev == "2" || pageRev == "3") {
        if (hdnGstGrddata != undefined && hdnGstGrddata != "" && hdnGstGrddata != null) {
            hdnGstGrddata = JSON.parse(hdnGstGrddata);
            GstHiddenLoad(hdnGstGrddata);
            localStorage.getItem("GstHdnGrd", "");
        }
    }

    var grid = $("#grid").data("kendoGrid");
    var no = grid._rowVirtualIndex;
    var GSTCol = grid.dataSource._data[no].GSTCol;
    var DC = grid.dataSource._data[no].DC;
    var AC_NM = grid.dataSource._data[no].AC_NM;
    var Cellindx = grid._current[0].cellIndex;

    var GstGrid = $$("GstGrid");
    var GstGridHIdden = $("#GstGridHidden").data("kendoGrid");
    var total1 = GstGrid.length;
    var total2 = GstGridHIdden.dataSource._data.length;
    var SBIllNo = "";
    if (Cellindx == "15") {
        var IN_GST_IND = $("#IN_GST_IND").val();
        var IN_VAT_IND = $("#IN_VAT_IND").val();
        if (IN_GST_IND == "1" || IN_VAT_IND == "1") {
            if (GSTCol == "GST" || GSTCol == "VAT") {
                
                localStorage.setItem("TaxTy", GSTCol);
                localStorage.setItem("DC", DC);
                localStorage.setItem("AC_NM", AC_NM);
                var HiddenGriddata = $("#HiddenGrid").data('kendoGrid');
                var HTotal = HiddenGriddata.dataSource.data().length;
                if (HTotal == undefined) {
                    HTotal = 0;
                }
                $$("GstBillDrop").define("options", []);
                if (HTotal != 0) {
                    var item2 = 0;
                    var billArr = [];
                    for (; item2 < HTotal; item2++) {
                        setarr = {};
                        var BillNo = HiddenGriddata.dataSource._data[item2].ReferenceName;
                        var MainRowInx = HiddenGriddata.dataSource._data[item2].AC_ID;
                        var BillDate = HiddenGriddata.dataSource._data[item2].BillDate;
                        var GstDetailBillNo = HiddenGriddata.dataSource._data[item2].ReferenceName;
                        var PartyName = grid.dataSource._data[MainRowInx].AC_NM;
                        var Depit = HiddenGriddata.dataSource._data[item2].Depit;
                        var Credit = HiddenGriddata.dataSource._data[item2].Credit;
                        set = { id: BillNo, value: BillNo };
                        billArr.push(set);
                    }

                    $$("GstBillDrop").define("options", billArr);
                    $$("GstBillDrop").setValue(BillNo);

                    var inx = HiddenGriddata.dataSource._data[0].AC_ID;
                    SBIllNo = HiddenGriddata.dataSource._data[0].ReferenceName;
                    
                    var AC_CD = grid._data[inx].AC_CD;
                    var AC_ID = grid._data[inx].AC_ID;
                    var j = 0;
                    if (total2 != 0) {
                        $$("GstGrid").clearAll();
                        for (; j < total2; j++) {
                            if (SBIllNo == GstGridHIdden.dataSource._data[j].SnoBill) {
                                var TaxCode = GstGridHIdden.dataSource._data[j].TaxCode;
                                var TaxClass = GstGridHIdden.dataSource._data[j].TaxClass;
                                var TaxAmount = GstGridHIdden.dataSource._data[j].TaxAmount;
                                var ixTc1Per = GstGridHIdden.dataSource._data[j].ixTc1Per;
                                var ixTc1Amt = GstGridHIdden.dataSource._data[j].ixTc1Amt;
                                var ixTc1Cd = GstGridHIdden.dataSource._data[j].ixTc1Cd;
                                var ixTc1vInd = GstGridHIdden.dataSource._data[j].ixTc1vInd;
                                var ixTc2Per = GstGridHIdden.dataSource._data[j].ixTc2Per;
                                var ixTc2Amt = GstGridHIdden.dataSource._data[j].ixTc2Amt;
                                var ixTc2Cd = GstGridHIdden.dataSource._data[j].ixTc2Cd;
                                var ixTc2vInd = GstGridHIdden.dataSource._data[j].ixTc2vInd;
                                var ixTc3Per = GstGridHIdden.dataSource._data[j].ixTc3Per;
                                var ixTc3Amt = GstGridHIdden.dataSource._data[j].ixTc3Amt;
                                var ixTc3Cd = GstGridHIdden.dataSource._data[j].ixTc3Cd;
                                var ixTc3vInd = GstGridHIdden.dataSource._data[j].ixTc3vInd;
                                var ixTc4Per = GstGridHIdden.dataSource._data[j].ixTc4Per;
                                var ixTc4Amt = GstGridHIdden.dataSource._data[j].ixTc4Amt;
                                var ixTc4Cd = GstGridHIdden.dataSource._data[j].ixTc4Cd;
                                var ixTc4vInd = GstGridHIdden.dataSource._data[j].ixTc4vInd;
                                var GstBillDrop = GstGridHIdden.dataSource._data[0].SnoBill;
                                var GstDetailBillDate = GstGridHIdden.dataSource._data[0].BillDate;
                                var GstDetailBillAmt = GstGridHIdden.dataSource._data[0].AmountStr;
                                var GSTPARTYID = GstGridHIdden.dataSource._data[0].AC_ID;
                                var GSTPARTYNM = GstGridHIdden.dataSource._data[0].AC_NM;
                                var RegType = GstGridHIdden.dataSource._data[0].A_IND_ID;
                                var TrnType = GstGridHIdden.dataSource._data[0].B_IND_ID;
                                var BillType = GstGridHIdden.dataSource._data[0].C_IND_ID;
                                var SupplyType = GstGridHIdden.dataSource._data[0].D_IND_ID;
                                var GstIn = GstGridHIdden.dataSource._data[0].E_IND_ID;
                                var StateID = GstGridHIdden.dataSource._data[0].F_IND_ID;
                                var StateNM = GstGridHIdden.dataSource._data[0].F_IND_VAl;
                                var POSPlaceID = GstGridHIdden.dataSource._data[0].L_IND_ID;
                                var POSPlaceNM = GstGridHIdden.dataSource._data[0].L_IND_VAl;
                                var RevChrgeChk = GstGridHIdden.dataSource._data[0].M_IND_ID;
                                var RevChargePer = GstGridHIdden.dataSource._data[0].N_IND_ID;
                                var RevChrgReason = GstGridHIdden.dataSource._data[0].O_IND_ID;
                                var BoeNo = GstGridHIdden.dataSource._data[0].A_IND_VAl;
                                var BoeAmt = GstGridHIdden.dataSource._data[0].B_IND_VAl;
                                var BOEDT = GstGridHIdden.dataSource._data[0].C_IND_VAl;
                                var PortCd = GstGridHIdden.dataSource._data[0].D_IND_VAl;
                                var DC = GstGridHIdden.dataSource._data[0].DC;
                                var BILL_ITEM_NM = GstGridHIdden.dataSource._data[0].BILL_ITEM_NM;

                                GstGrid.add({
                                    TaxCode: TaxCode, TaxClass: TaxClass, TaxAmount: TaxAmount,
                                    ixTc1Per: ixTc1Per, ixTc1Amt: ixTc1Amt, ixTc1Cd: ixTc1Cd, ixTc1vInd: ixTc1vInd,
                                    ixTc2Per: ixTc2Per, ixTc2Amt: ixTc2Amt, ixTc2Cd: ixTc2Cd, ixTc1v2nd: ixTc2vInd,
                                    ixTc3Per: ixTc3Per, ixTc3Amt: ixTc3Amt, ixTc3Cd: ixTc3Cd, ixTc1v3nd: ixTc3vInd,
                                    ixTc4Per: ixTc4Per, ixTc4Amt: ixTc4Amt, ixTc4Cd: ixTc4Cd, ixTc1v4nd: ixTc4vInd,
                                    DC: DC, BILL_ITEM_NM: BILL_ITEM_NM
                                });
                                
                                $$("GstBillDrop").setValue(GstBillDrop);
                                $$("SrchPartyNm").setValue(GSTPARTYNM);
                                $("#GSTPARTYID").val(GSTPARTYID);
                                $$("StateNM").setValue(StateNM);
                                $$("POSPlaceNM").setValue(POSPlaceNM);
                                $("#StateID").val(StateID); $("#POSPlaceID").val(POSPlaceID);
                                $$("RegType").setValue(RegType);
                                $$("TrnType").setValue(TrnType);
                                $$("BillType").setValue(BillType);
                                $$("SupplyType").setValue(SupplyType);
                                if (RevChrgeChk == "1") $$("RevChrgeChk").checked = true;
                                else $$("RevChrgeChk").checked = false;
                                $$("RevChargePer").setValue(RevChargePer);
                                $$("RevChrgReason").setValue(RevChrgReason);
                                $$("BoeNo").setValue(BoeNo);
                                $$("BoeAmt").setValue(BoeAmt);
                                $$("BOEDT").setValue(BOEDT);
                                $$("PortCd").setValue(PortCd);
                                $$("GstDetailBillAmt").setValue(GstDetailBillAmt);
                                $$("GstDetailBillDate").setValue(GstDetailBillDate);
                                $$("GstIn").setValue(GstIn);
                                GstGrid.refresh();
                            }
                        }
                    }
                    
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/GstRegtyLoad",
                        data: "AC_ID=" + AC_ID + "&AC_CD=" + AC_CD,
                        async: false,
                        success: function (data) {
                            $$("RegType").define("options", data);
                        }
                    });
                    var BillDrop = $$("GstBillDrop").getValue();
                    if (BillDrop != "") {
                        BillDropBasedValues(BillNo, MainRowInx, BillDate, GstDetailBillNo, PartyName, Depit, Credit);
                    }
                    else {
                        BillNo = "";
                        MainRowInx = grid.dataSource._data[no].AC_ID;
                        BillDate = grid.dataSource._data[no].BillDate;
                        GstDetailBillNo = "";
                        PartyName = grid.dataSource._data[no].AC_NM;
                        Depit = grid.dataSource._data[no].Depit;
                        Credit = grid.dataSource._data[no].Credit;
                        BillDropBasedValues(BillNo, MainRowInx, BillDate, GstDetailBillNo, PartyName, Depit, Credit);
                    }
                } else {
                    var BillNo = "";
                    var MainRowInx = grid.dataSource._data[no].AC_ID;
                    var BillDate = "";
                    var GstDetailBillNo = "";
                    var PartyName = grid.dataSource._data[no].AC_NM;
                    var Depit = grid.dataSource._data[no].Depit;
                    var Credit = grid.dataSource._data[no].Credit;
                    BillDropBasedValues(BillNo, MainRowInx, BillDate, GstDetailBillNo, PartyName, Depit, Credit);
                }
                LoadVisibleItemGst();
                $$("GstEntry").show();

            }
            else {
                localStorage.setItem("TaxTy", "");
                localStorage.setItem("DC", "");
                localStorage.setItem("AC_NM", "");
            }
        }
    }
});

function partyDetails(_partyId, vPartyTy) {

    localStorage.setItem("Pty", vPartyTy);
    req = [];
    set = { "PartyId": _partyId, "PartyTy": vPartyTy };
    req.push(set);

    var partyRes = GstDataLoad("GstPartyDetails", JSON.stringify(set));
    var GSTPARTYID = "";
    var GSTPARTYNM = "";
    if (partyRes.length > 0) {
        partyRes = JSON.parse(partyRes);
        GSTPARTYID = partyRes[0].AC_ID;
        GSTPARTYNM = partyRes[0].PARTY_NM;
    }

    $$("SrchPartyNm").setValue(GSTPARTYNM);
    $("#GSTPARTYID").val(GSTPARTYID);
    $$("GstVatRegNo").setValue(partyRes[0].TX_RG_NO);

    $$("SrchPartyNm").show();


}


function TotalBillAmt(id) {
    var Amt = 0;
    var HiddenGriddata = $("#HiddenGrid").data('kendoGrid');
    $.each(HiddenGriddata.dataSource._data, function (k, v) {
       // if (v.AC_ID == id) {
            if (v.Depit != "" && v.Depit != undefined && v.Depit != null)
                Amt = Amt + parseFloat(v.Depit);
            else if (v.Credit != "" && v.Credit != undefined && v.Credit != null)
                Amt = Amt + parseFloat(v.Credit);
      //  }
    });

    return Amt;
}

function TotalTaxAmt(id) {
    var Amt = 0;
    var HiddenGriddata = $("#HiddenGrid").data('kendoGrid');
    $.each(HiddenGriddata.dataSource._data, function (k, v) {
        if (v.TaxAmount != "" && v.TaxAmount != undefined && v.TaxAmount != null)
            Amt = Amt + parseFloat(v.TaxAmount);
    });
    return Amt;
}


function GstBillDropChange(e) {
    var BillNo = $$("GstBillDrop").getValue();
    $$("GstDetailBillNo").setValue(BillNo);
    var grid = $("#grid").data("kendoGrid");
    var HiddenGriddata = $("#HiddenGrid").data('kendoGrid');
    var HTotal = HiddenGriddata.dataSource.data().length;
    if (HTotal == undefined) {
        HTotal = 0;
    }

    if (HTotal != 0) {
        var item2 = 0;
        for (; item2 < HTotal; item2++) {
            var BillNoRef = HiddenGriddata.dataSource._data[item2].ReferenceName;
            if (BillNoRef == BillNo) {
                var MainRowInx = HiddenGriddata.dataSource._data[item2].AC_ID;
                var BillDate = HiddenGriddata.dataSource._data[item2].BillDate;
                var GstDetailBillNo = HiddenGriddata.dataSource._data[item2].ReferenceName;
                var Depit = HiddenGriddata._data[item2].Depit;
                var Credit = HiddenGriddata._data[item2].Credit;
                var AC_NM = grid._data[MainRowInx].AC_NM;
                var AC_ID = grid._data[MainRowInx].AC_ID;
                var AC_CD = grid._data[MainRowInx].AC_CD;

                var Amt = 0;
                if (Depit != "" && Depit != undefined && Depit != null)
                    Amt = Depit;
                else if (Credit != "" && Credit != undefined && Credit != null)
                    Amt = Credit;
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/GstRegtyLoad",
                    data: "AC_ID=" + AC_ID + "&AC_CD=" + AC_CD,
                    async: false,
                    success: function (data) {
                        $$("RegType").define("options", data);
                    }
                });
                $$("GstDetailBillDate").setValue(BillDate);
                $$("SrchPartyNm").setValue(AC_NM);
                $$("GstDetailBillNo").setValue(BillNo);
                $$("GstDetailBillAmt").setValue(Amt);
                break;
            }
        }
    }
    var GstGrid = $$("GstGrid");
    var GstGridHIdden = $("#GstGridHidden").data("kendoGrid");
    var total2 = GstGridHIdden.dataSource.data().length;
    if (total2 != 0) {
        GstGrid.clearAll();
        var j = 0;
        for (; j < total2; j++) {
            if (BillNo == GstGridHIdden.dataSource._data[j].SnoBill) {
                var TaxCode = GstGridHIdden.dataSource._data[j].TaxCode;
                var TaxClass = GstGridHIdden.dataSource._data[j].TaxClass;
                var TaxAmount = GstGridHIdden.dataSource._data[j].TaxAmount;
                var ixTc1Per = GstGridHIdden.dataSource._data[j].ixTc1Per;
                var ixTc1Amt = GstGridHIdden.dataSource._data[j].ixTc1Amt;
                var ixTc1Cd = GstGridHIdden.dataSource._data[j].ixTc1Cd;
                var ixTc1vInd = GstGridHIdden.dataSource._data[j].ixTc1vInd;
                var ixTc2Per = GstGridHIdden.dataSource._data[j].ixTc2Per;
                var ixTc2Amt = GstGridHIdden.dataSource._data[j].ixTc2Amt;
                var ixTc2Cd = GstGridHIdden.dataSource._data[j].ixTc2Cd;
                var ixTc2vInd = GstGridHIdden.dataSource._data[j].ixTc2vInd;
                var ixTc3Per = GstGridHIdden.dataSource._data[j].ixTc3Per;
                var ixTc3Amt = GstGridHIdden.dataSource._data[j].ixTc3Amt;
                var ixTc3Cd = GstGridHIdden.dataSource._data[j].ixTc3Cd;
                var ixTc3vInd = GstGridHIdden.dataSource._data[j].ixTc3vInd;
                var ixTc4Per = GstGridHIdden.dataSource._data[j].ixTc4Per;
                var ixTc4Amt = GstGridHIdden.dataSource._data[j].ixTc4Amt;
                var ixTc4Cd = GstGridHIdden.dataSource._data[j].ixTc4Cd;
                var ixTc4vInd = GstGridHIdden.dataSource._data[j].ixTc4vInd;
                var GstBillDrop = GstGridHIdden.dataSource._data[j].SnoBill;
                var GstDetailBillDate = GstGridHIdden.dataSource._data[j].BillDate;
                var GstDetailBillAmt = GstGridHIdden.dataSource._data[j].AmountStr;
                var GSTPARTYID = GstGridHIdden.dataSource._data[j].AC_ID;
                var GSTPARTYNM = GstGridHIdden.dataSource._data[j].AC_NM;
                var RegType = GstGridHIdden.dataSource._data[j].A_IND_ID;
                var TrnType = GstGridHIdden.dataSource._data[j].B_IND_ID;
                var BillType = GstGridHIdden.dataSource._data[j].C_IND_ID;
                var SupplyType = GstGridHIdden.dataSource._data[j].D_IND_ID;
                var GstIn = GstGridHIdden.dataSource._data[j].E_IND_ID;
                var StateID = GstGridHIdden.dataSource._data[j].F_IND_ID;
                var StateNM = GstGridHIdden.dataSource._data[j].F_IND_VAl;
                var POSPlaceID = GstGridHIdden.dataSource._data[j].L_IND_ID;
                var POSPlaceNM = GstGridHIdden.dataSource._data[j].L_IND_VAl;
                var RevChrgeChk = GstGridHIdden.dataSource._data[j].M_IND_ID;
                var RevChargePer = GstGridHIdden.dataSource._data[j].N_IND_ID;
                var RevChrgReason = GstGridHIdden.dataSource._data[j].O_IND_ID;
                var BoeNo = GstGridHIdden.dataSource._data[j].A_IND_VAl;
                var BoeAmt = GstGridHIdden.dataSource._data[j].B_IND_VAl;
                var BOEDT = GstGridHIdden.dataSource._data[j].C_IND_VAl;
                var PortCd = GstGridHIdden.dataSource._data[j].D_IND_VAl;
                var DC = GstGridHIdden.dataSource._data[j].DC;
                var BILL_ITEM_NM = GstGridHIdden.dataSource._data[j].BILL_ITEM_NM;
                GstGrid.add({
                    TaxCode: TaxCode, TaxClass: TaxClass, TaxAmount: TaxAmount,
                    ixTc1Per: ixTc1Per, ixTc1Amt: ixTc1Amt, ixTc1Cd: ixTc1Cd, ixTc1vInd: ixTc1vInd,
                    ixTc2Per: ixTc2Per, ixTc2Amt: ixTc2Amt, ixTc2Cd: ixTc2Cd, ixTc1v2nd: ixTc2vInd,
                    ixTc3Per: ixTc3Per, ixTc3Amt: ixTc3Amt, ixTc3Cd: ixTc3Cd, ixTc1v3nd: ixTc3vInd,
                    ixTc4Per: ixTc4Per, ixTc4Amt: ixTc4Amt, ixTc4Cd: ixTc4Cd, ixTc1v4nd: ixTc4vInd,
                    DC: DC, BILL_ITEM_NM: BILL_ITEM_NM
                });
                $("SrchPartyNm").val(GSTPARTYNM);
                $("#GSTPARTYID").val(GSTPARTYID);
                $("#StateID").val(StateID);
                $$("StateNM").setValue(StateNM);
                $("#POSPlaceID").val(POSPlaceID);
                $$("POSPlaceNM").setValue(POSPlaceNM);

                $$("RegType").setValue(RegType);
                $$("TrnType").setValue(TrnType);
                $$("BillType").setValue(BillType);
                $$("SupplyType").setValue(SupplyType);
                if (RevChrgeChk == "1") {
                    $$("RevChrgeChk").checked = true;
                }
                else $$("RevChrgeChk").checked = false;
                $$("RevChargePer").setValue(RevChargePer);
                $$("RevChrgReason").setValue(RevChrgReason);
                $$("BoeNo").setValue(BoeNo);
                $$("BoeAmt").setValue(BoeAmt);
                $$("BOEDT").setValue(BOEDT);
                $$("PortCd").setValue(PortCd);
                $$("GstDetailBillAmt").setValue(GstDetailBillAmt);
                $$("GstDetailBillDate").setValue(GstDetailBillDate);
                $$("GstIn").setValue(GstIn);
            }
        }
    }
};

function RegTypeChange() {
    var RegType = $$("RegType").getValue();
    var TrnType = $$("TrnType").getValue();
    var BillType = $$("BillType").getValue();
    var PartyType = $$("PartyType").getValue();
    if (PartyType == "S") {
        if (RegType == "R") {
            $$("TrnType").setValue("11");
            $$("BillType").setValue("1");
            $$("RevChrgeChk").show();
            $$("RevChrgeChk").checked = false;
        }
        else if (RegType == "C") {
            $$("TrnType").setValue("11");
            $$("BillType").setValue("2");
            $$("RevChrgeChk").show();
            $$("RevChrgeChk").checked = true;
            //$$("#REVDIV2").show();
            REVDIV2(1);
        }
        else if (RegType == "U") {
            $$("TrnType").setValue("11");
            $$("BillType").setValue("2");
            $$("RevChrgeChk").show();
            $$("RevChrgeChk").checked = true;
            //$("#REVDIV2").show();
            REVDIV2(1);
        }
    }
    else if (PartyType == "S") {
        if (RegType == "K") {
            $$("TrnType").setValue("1");
            $$("BillType").setValue("1");
            $$("RevChrgeChk").hide();
            $$("RevChrgeChk").checked = false;
            $$("SupplyType").setValue("2");
        }
        else if (RegType == "R") {
            $$("TrnType").setValue("1");
            $$("BillType").setValue("1");
            $$("REVDIV").hide();
            $$("RevChrgeChk").checked = false;
            $$("SupplyType").setValue("2");
        }
    }
}

function SupplyTypeChange(e) {
    var SupplyType = $$("SupplyType").getValue();
    if (SupplyType != "") {
        $.ajax({
            type: "POST",
            url: "/GLTransaction/GstSupplyType",
            data: "SupplyType=" + SupplyType,
            async: false,
            success: function (data) {
                $("#TaxClassGrid").data("kendoGrid").dataSource.read();
            }
        });
    }
}

function TrnType(e) {
    var RegType = $$("RegType").getValue();
    var TrnType = $$("TrnType").getValue();
    var BillType = $$("BillType").getValue();
    var PartyType = $$("PartyType").getValue();

    if (TrnType == "11") {
        $$("RevChrgeChk").show();
        BOEDIV(0);
        $$("BillType").show();
        $$("SupplyType").show();
        $$("POSPlaceNM").show();
        $$("GstIn").show();
        $$("StateNM").show();
    }
    else if (TrnType == "12") {
        $$("RevChrgeChk").hide();
        BOEDIV(1);
        $$("BillType").hide();
        $$("SupplyType").hide();
        $$("POSPlaceNM").hide();
        $$("GstIn").hide();
        $$("StateNM").hide();
    }
    else if (TrnType == "13") {
        $$("RevChrgeChk").show();
        BOEDIV(0);
        $$("BillType").hide();
        $$("SupplyType").show();
        $$("POSPlaceNM").show();
        $$("GstIn").show();
        $$("StateNM").show();
    }
    else if (TrnType == "17") {
        $$("RevChrgeChk").hide();
        BOEDIV(0);
        $$("BillType").hide();
        $$("SupplyType").show();
        $$("POSPlaceNM").hide();
        $$("GstIn").hide();
        $$("StateNM").hide();
    }

}

function REVDIV2(val) {
    if (val == 0) {
        $$("RevChargePer").hide();
        $$("RevChrgReason").hide();
    }
    else {
        $$("RevChargePer").show();
        $$("RevChrgReason").show();
    }
}

function BOEDIV(val) {
    if (val == 0) {
        $$("PortCd").hide();
        $$("BOEDT").hide();
        $$("BoeAmt").hide();
        $$("BoeNo").hide();
    }
    else {
        $$("PortCd").show();
        $$("BOEDT").show();
        $$("BoeAmt").show();
        $$("BoeNo").show();
    }
}

function PosAndStateSearchArg() {
    var PlaceTy = $("#PlaceTy").val();
    $.ajax({
        type: "POST",
        url: "/GLTransaction/PosAndStateSearchArg",
        data: "PlaceTy=" + PlaceTy,
        async: false,
        success: function (data) {
            $("#StateSearchGrid").data("kendoGrid").dataSource.read();
        }
    });
}

function gstGridKeyUp(e) {
    var grid = $$("GstGrid").data("kendoGrid");
    var Cellindx = grid._current[0].cellIndex;
    var no = grid.selectable.userEvents.currentTarget.rowIndex;
    if (Cellindx == "3") {
        var TaxAmt = $("#TaxAmount").val();
        if (TaxAmt != "") {
            var ixTc1Per = grid.dataSource._data[no].ixTc1Per;
            var ixTc2Per = grid.dataSource._data[no].ixTc2Per;
            var ixTc3Per = grid.dataSource._data[no].ixTc3Per;
            var ixTc4Per = grid.dataSource._data[no].ixTc4Per;
            var Griddata = $("#GstGrid").data().kendoGrid.dataSource.data()[no];
            Griddata.set("ixTc1Amt", Number(ixTc1Per) * Number(TaxAmt));
            Griddata.set("ixTc2Amt", Number(ixTc2Per) * Number(TaxAmt));
            Griddata.set("ixTc3Amt", Number(ixTc3Per) * Number(TaxAmt));
            Griddata.set("ixTc4Amt", Number(ixTc4Per) * Number(TaxAmt));
            Griddata.set("TaxAmount", TaxAmt);

            var total2 = grid.dataSource.data().length;
            if (total2 == undefined) {
                total2 = 0;
            }
            if (total2 != 0) {
                var item2 = 0;
                var TaxAmount = 0;
                for (; item2 < total2; item2++) {
                    TaxAmount = Number(TaxAmount) + Number(grid.dataSource._data[item2].TaxAmount);
                }
                $("#GSTTotal").val(Number(TaxAmount).toFixed(2));
            }
        }
    }
};

function WAlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}


function saveGst() {
    var GstGridHIdden = $("#GstGridHidden").data("kendoGrid");
    var grHdnGstData = GstGridHIdden.dataSource._data;
    var data = $$("GstBillDrop").config.options;
    var bcheckTax = true;
    var bcheckTaxVal = true;
    $.each(data, function (k, v) {
        var checkTax = $.grep(grHdnGstData, function (ele, key) {
            return ele.SnoBill == v.id && (ele.TaxCode != "" || ele.TaxCode != null || ele.TaxCode != undefined);
        });

        if (checkTax.length == 0) {
            bcheckTax = false;
            bcheckTaxVal = v.id;
        }
    });
    
    if (bcheckTax == false) {
        WAlertMessage("Bill no : " + bcheckTaxVal + " must have Tax Detatils");
        return false;
    }

    var grid = $("#grid").data("kendoGrid");
    var GstGrid = $$("GstGrid").serialize();
    var GstGridHIdden = $("#GstGridHidden").data("kendoGrid");
    var total1 = GstGrid.length;
    var total2 = GstGridHIdden.dataSource.data().length;

    var GstBillDrop = $$("GstBillDrop").getValue();
    var GSTPARTYNM = $$("SrchPartyNm").getValue();
    var GSTPARTYID = $("#GSTPARTYID").val();
    var StateID = $("#StateID").val();
    var StateNM = $$("StateNM").getValue();
    var POSPlaceID = $("#POSPlaceID").val();
    var POSPlaceNM = $$("POSPlaceNM").getValue();
    var RegType = $$("RegType").getValue();
    var TrnType = $$("TrnType").getValue();
    var BillType = $$("BillType").getValue();
    var SupplyType = $$("SupplyType").getValue();
    var RevChrgeChk = 0;
    if ($$("RevChrgeChk").checked == true) {
        RevChrgeChk = 1;
    }
    
    var RevChargePer = $$("RevChargePer").getValue();
    var RevChrgReason = $$("RevChrgReason").getValue();
    var BoeNo = $$("BoeNo").getValue();
    var BoeAmt = $$("BoeAmt").getValue();
    var BOEDT = $$("BOEDT").getValue();
    var PortCd = $$("PortCd").getValue();
    var GstDetailBillAmt = $$("GstDetailBillAmt").getValue();
    var GstDetailBillDate = $$("GstDetailBillDate").getValue();
    var GstIn = $$("GstIn").getValue();



    if (GstBillDrop != "") {
        if (total1 != "" || total1 != 0) {

            //var j = 0;
            //for (; j < total2; j++) {
            //    if (GstBillDrop == GstGridHIdden.dataSource._data[j].SnoBill) {
            //        var uid = GstGridHIdden._data[j].uid;
            //        var row = GstGridHIdden.table.find('tr[data-uid="' + uid + '"]');
            //        GstGridHIdden.select(row);
            //        GstGridHIdden.select().each(function () {
            //            var dataItem = GstGridHIdden.dataItem($(this));
            //            GstGridHIdden.dataSource.remove(dataItem);
            //        });
            //        j = j - 1;
            //        total2 = GstGridHIdden.dataSource.data().length;
            //        if (total2 == undefined) {
            //            total2 = 0;
            //        }
            //    }
            //}
            var i = 0; var totTaxAmt = 0; var OverAlltotTaxAmt = 0; var CurACID = []; var PrevACID = []; var totTaxColAmt = 0;
            for (; i < total2; i++) {
                //totTaxAmt = 0;
                var TaxCode = GstGridHIdden.dataSource._data[i].TaxCode;
                var TaxClass = GstGridHIdden.dataSource._data[i].TaxClass;
                var TaxAmount = GstGridHIdden.dataSource._data[i].TaxAmount;
                var ixTc1Per = GstGridHIdden.dataSource._data[i].ixTc1Per;
                var ixTc1Amt = GstGridHIdden.dataSource._data[i].ixTc1Amt;
                var ixTc1Cd = GstGridHIdden.dataSource._data[i].ixTc1Cd;
                var ixTc1vInd = GstGridHIdden.dataSource._data[i].ixTc1vInd;
                var ixTc2Per = GstGridHIdden.dataSource._data[i].ixTc2Per;
                var ixTc2Amt = GstGridHIdden.dataSource._data[i].ixTc2Amt;
                var ixTc2Cd = GstGridHIdden.dataSource._data[i].ixTc2Cd;
                var ixTc2vInd = GstGridHIdden.dataSource._data[i].ixTc2vInd;
                var ixTc3Per = GstGridHIdden.dataSource._data[i].ixTc3Per;
                var ixTc3Amt = GstGridHIdden.dataSource._data[i].ixTc3Amt;
                var ixTc3Cd = GstGridHIdden.dataSource._data[i].ixTc3Cd;
                var ixTc3vInd = GstGridHIdden.dataSource._data[i].ixTc3vInd;
                var ixTc4Per = GstGridHIdden.dataSource._data[i].ixTc4Per;
                var ixTc4Amt = GstGridHIdden.dataSource._data[i].ixTc4Amt;
                var ixTc4Cd = GstGridHIdden.dataSource._data[i].ixTc4Cd;
                var ixTc4vInd = GstGridHIdden.dataSource._data[i].ixTc4vInd;
                var INP_TY = "";
                var PARTY_TY = localStorage.getItem("Pty");
                var PTX_RG_No = $$("GstVatRegNo").getValue();
                var PTX_ST_CD = "";//$("#StateID").val(StateID);
                var PTX_RG_Ty = "";
                var TX_RG_CD = "";
                var GTRN_TY = $$("TrnType").getValue();
                var GINV_TY = $$("BillType").getValue();
                var TRN_ID_SRNO = "";
                var BRN_NO = $$("txtBrnNo").getValue();
                var TAN_No = $$("txtTanNo").getValue();
                var Sup_Cat = $$("ddlSupvat").getValue();
                var EXEMP_IND = "";
                var HCD = "";
                var ORD_NO = $$("workOrderno").getValue();
                var ORD_DT = "";
                var GWO_ID = "";
                var NID_No = $$("txtNationalId").getValue();
                var DC = localStorage.getItem("DC");
                var BILL_ITEM_NM = localStorage.getItem("AC_NM");
                //GstGridHIdden.dataSource.add({
                //    TaxCode: TaxCode, TaxClass: TaxClass, TaxAmount: TaxAmount,
                //    ixTc1Per: ixTc1Per, ixTc1Amt: ixTc1Amt, ixTc1Cd: ixTc1Cd, ixTc1vInd: ixTc1vInd,
                //    ixTc2Per: ixTc2Per, ixTc2Amt: ixTc2Amt, ixTc2Cd: ixTc2Cd, ixTc1v2nd: ixTc2vInd,
                //    ixTc3Per: ixTc3Per, ixTc3Amt: ixTc3Amt, ixTc3Cd: ixTc3Cd, ixTc1v3nd: ixTc3vInd,
                //    ixTc4Per: ixTc4Per, ixTc4Amt: ixTc4Amt, ixTc4Cd: ixTc4Cd, ixTc1v4nd: ixTc4vInd,
                //    SnoBill: GstBillDrop, BillDate: GstDetailBillDate, AmountStr: GstDetailBillAmt,
                //    AC_ID: GSTPARTYID, AC_NM: GSTPARTYNM, A_IND_ID: RegType, B_IND_ID: TrnType, C_IND_ID: BillType,
                //    D_IND_ID: SupplyType, E_IND_ID: GstIn, F_IND_ID: StateID, F_IND_VAl: StateNM, L_IND_ID: POSPlaceID,
                //    L_IND_VAl: POSPlaceNM, M_IND_ID: RevChrgeChk, N_IND_ID: RevChargePer, O_IND_ID: RevChrgReason,
                //    A_IND_VAl: BoeNo, B_IND_VAl: BoeAmt, C_IND_VAl: BOEDT, D_IND_VAl: PortCd,
                //    PARTY_TY: PARTY_TY, PTX_RG_No: PTX_RG_No, PTX_ST_CD: PTX_ST_CD, PTX_RG_Ty: PTX_RG_Ty, TX_RG_CD: TX_RG_CD, GTRN_TY: GTRN_TY, GINV_TY: GINV_TY,
                //    TRN_ID_SRNO: TRN_ID_SRNO, BRN_NO: BRN_NO, TAN_No: TAN_No,
                //    Sup_Cat: Sup_Cat, EXEMP_IND: EXEMP_IND, HCD: HCD, ORD_NO: ORD_NO, ORD_DT: ORD_DT, GWO_ID: GWO_ID, NID_No: NID_No, DC: DC,
                //    BILL_ITEM_NM: BILL_ITEM_NM
                //});
                var no = $("#RowIndexHiden").val();
                var DC = grid.dataSource._data[no].DC;
                var DefaultCurrency = $("#DefaultCurrency").val();
                var TaxTy = localStorage.getItem("TaxTy");
                var total = grid.dataSource.data().length;
                var ActualUpdateIndex = (grid.dataSource._data.length - 1);
                $.ajax({
                    type: "POST",
                    url: "/GLTransaction/GSTTAX_AC_NM_FIND",
                    data: "ID=" + TaxCode + "&TaxTy=" + TaxTy,
                    async: false,
                    success: function (data) {
                        var PerCount = 0;
                        var len = 0;
                        if (DC == "DR") {
                            if (data.v.AC_ID != "" && data.v.AC_ID != null) {
                                CurACID = { _Acid: data.v.AC_ID };
                                len = $.grep(PrevACID, function (ele, v) { return (ele._Acid == data.v.AC_ID) });
                                if (len.length == 0)
                                    PrevACID.push(CurACID);

                                if (ixTc3Per != undefined && ixTc3Per != null && ixTc3Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc3Per);
                                    var ACID = data.v.AC_ID;
                                    var Amt = 0;
                                    Amt = ixTc3Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "DR", AC_ID: data.v.AC_ID, AC_CD: data.v.AC_CD, AC_NM: data.v.AC_NM, BillDeatil_IND: data.v.BillDeatil_IND, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Depit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Depit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Depit = parseFloat(grid.dataSource._data[inxx].Depit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.B_IND_ID != "" && data.v.B_IND_ID != null) {
                                if (ixTc1Per != undefined && ixTc1Per != null && ixTc1Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc1Per);
                                    var ACID = data.v.B_IND_ID;
                                    var Amt = 0;
                                    Amt = ixTc1Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "DR", AC_ID: data.v.B_IND_ID, AC_CD: data.v.A_IND_ID, AC_NM: data.v.C_IND_ID, BillDeatil_IND: data.v.D_IND_ID, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Depit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Depit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Depit = parseFloat(grid.dataSource._data[inxx].Depit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.M_IND_ID != "" && data.v.M_IND_ID != null) {
                                if (ixTc2Per != undefined && ixTc2Per != null && ixTc2Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc2Per);
                                    var ACID = data.v.M_IND_ID;
                                    var Amt = 0;
                                    Amt = ixTc2Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "DR", AC_ID: data.v.M_IND_ID, AC_CD: data.v.L_IND_ID, AC_NM: data.v.N_IND_ID, BillDeatil_IND: data.v.O_IND_ID, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Depit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Depit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Depit = parseFloat(grid.dataSource._data[inxx].Depit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.B_IND_VAl != "" && data.v.B_IND_VAl != null) {
                                if (ixTc4Per != undefined && ixTc4Per != null && ixTc4Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc4Per);
                                    var ACID = data.v.B_IND_VAl;
                                    var Amt = 0;
                                    Amt = ixTc4Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "DR", AC_ID: data.v.B_IND_VAl, AC_CD: data.v.A_IND_VAl, AC_NM: data.v.C_IND_VAl, BillDeatil_IND: data.v.D_IND_VAl, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Depit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Depit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Depit = parseFloat(grid.dataSource._data[inxx].Depit) + parseFloat(Amt);
                                    }
                                }
                            }
                        }
                        else {
                            
                            if (data.v.AC_ID != "" && data.v.AC_ID != null) {
                                CurACID = { _Acid: data.v.AC_ID };
                                len = $.grep(PrevACID, function (ele, v) { return (ele._Acid == data.v.AC_ID) });
                                if (len.length == 0)
                                    PrevACID.push(CurACID);
                                if (ixTc3Per != undefined && ixTc3Per != null && ixTc3Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc3Per);
                                    var ACID = data.v.AC_ID;
                                    var Amt = 0;
                                    Amt = ixTc3Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "CR", AC_ID: data.v.AC_ID, AC_CD: data.v.AC_CD, AC_NM: data.v.AC_NM, BillDeatil_IND: data.v.BillDeatil_IND, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Credit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Credit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Credit = parseFloat(grid.dataSource._data[inxx].Credit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.B_IND_ID != "" && data.v.B_IND_ID != null) {
                                if (ixTc1Per != undefined && ixTc1Per != null && ixTc1Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc1Per);
                                    var ACID = data.v.B_IND_ID;
                                    var Amt = 0;
                                    Amt = ixTc1Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "CR", AC_ID: data.v.B_IND_ID, AC_CD: data.v.A_IND_ID, AC_NM: data.v.C_IND_ID, BillDeatil_IND: data.v.D_IND_ID, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Credit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Credit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Credit = parseFloat(grid.dataSource._data[inxx].Credit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.M_IND_ID != "" && data.v.M_IND_ID != null) {
                                if (ixTc2Per != undefined && ixTc2Per != null && ixTc2Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc2Per);
                                    var ACID = data.v.M_IND_ID;
                                    var Amt = 0;
                                    Amt = ixTc2Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "CR", AC_ID: data.v.M_IND_ID, AC_CD: data.v.L_IND_ID, AC_NM: data.v.N_IND_ID, BillDeatil_IND: data.v.O_IND_ID, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Credit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Credit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Credit = parseFloat(grid.dataSource._data[inxx].Credit) + parseFloat(Amt);
                                    }
                                }
                            }
                            total = grid.dataSource.data().length;
                            if (data.v.B_IND_VAl != "" && data.v.B_IND_VAl != null) {
                                if (ixTc4Per != undefined && ixTc4Per != null && ixTc4Per != 0) {
                                    PerCount = PerCount + parseFloat(ixTc4Per);
                                    var ACID = data.v.B_IND_VAl;
                                    var Amt = 0;
                                    Amt = ixTc4Amt;
                                    totTaxAmt = parseFloat(totTaxAmt) + parseFloat(Amt);
                                    totTaxColAmt = parseFloat(totTaxColAmt) + parseFloat(TaxAmount);
                                    //Amt = totTaxAmt;
                                    var t = 0;
                                    var chk = "";
                                    var inxx = 0;
                                    for (; t < total; t++) {
                                        if (grid.dataSource._data[t].AC_ID == ACID) {
                                            chk = "1";
                                            inxx = t;
                                        }
                                    }
                                    OverAlltotTaxAmt = parseFloat(OverAlltotTaxAmt) + parseFloat(Amt);
                                    if (chk == "") {
                                        grid.dataSource.add({ DC: "CR", AC_ID: data.v.B_IND_VAl, AC_CD: data.v.A_IND_VAl, AC_NM: data.v.C_IND_VAl, BillDeatil_IND: data.v.D_IND_VAl, Currency: DefaultCurrency, ConvertButton: "R", checkDate: "", RefrDate: "", DocDate: "", RowIndexHiden: total, Credit: Amt });
                                    }
                                    else {
                                        if (len == 0)
                                            grid.dataSource._data[inxx].Credit = parseFloat(Amt);
                                        else
                                            grid.dataSource._data[inxx].Credit = parseFloat(grid.dataSource._data[inxx].Credit) + parseFloat(Amt);
                                    }
                                }
                            }
                        }
                        //var Page = $("#Page").val();
                        //if (Page == "3") {
                        //    if (PerCount != 0) {
                        //        if (DC == "DR") {
                        //            if (totTaxAmt != "" && totTaxAmt != 0)
                        //                grid.dataSource._data[ActualUpdateIndex].Depit = totTaxAmt;
                        //        }
                        //        else {
                        //            if (totTaxAmt != "" && totTaxAmt != 0)
                        //                grid.dataSource._data[ActualUpdateIndex].Credit = totTaxAmt;
                        //        }
                        //    }
                        //}
                        //else {
                        ActualUpdateIndex = (grid.dataSource._data.length - 1);
                        if (PerCount != 0) {
                            var amtActual = TotalBillAmt(no);
                            amtActual = (amtActual == "" || amtActual == undefined || amtActual == null) ? 0 : amtActual;
                            if (amtActual != totTaxColAmt)
                                amtActual = totTaxColAmt;
                            if (DC == "DR") {
                                if (totTaxAmt != "" && totTaxAmt != 0) {
                                    //grid.dataSource._data[no].Depit = parseFloat(amtActual) - parseFloat(totTaxAmt);
                                    grid.dataSource._data[no].Depit = totTaxColAmt;
                                }
                            }
                            else {
                                if (totTaxAmt != "" && totTaxAmt != 0) {
                                    //grid.dataSource._data[no].Credit = parseFloat(amtActual) - totTaxAmt;
                                    grid.dataSource._data[no].Credit = totTaxColAmt;
                                }
                            }
                        }
                        //}
                        grid.refresh();
                    }

                });

            }
            
            var totdr = 0; var totcr = 0;
            if (DC == "DR") {
                $.each(grid.dataSource._data, function (key, val) {
                    if (val.Depit != "" && val.Depit != undefined && val.Depit != null)
                        totdr += parseFloat(val.Depit);
                    if (val.Credit != "" && val.Credit != undefined && val.Credit != null)
                        totcr += parseFloat(val.Credit);
                });
                var depitfinTotal = totdr;//$("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = totcr;//$("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                depitfinTotal = (depitfinTotal == undefined || depitfinTotal == "") ? 0 : depitfinTotal.toString().replace(/,/g, '');
                CreditfinTotal = (CreditfinTotal == undefined || CreditfinTotal == "") ? 0 : CreditfinTotal.toString().replace(/,/g, '');
                var finalDiff = Number(depitfinTotal) - Number(CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
            }
            else {
                $.each(grid.dataSource._data, function (key, val) {
                    if (val.Depit != "" && val.Depit != undefined && val.Depit != null)
                        totdr += parseFloat(val.Depit);
                    if (val.Credit != "" && val.Credit != undefined && val.Credit != null)
                        totcr += parseFloat(val.Credit);
                });
                var depitfinTotal = totdr;//$("#grid").data().kendoGrid.dataSource.aggregates().Depit.sum;
                var CreditfinTotal = totcr;//$("#grid").data().kendoGrid.dataSource.aggregates().Credit.sum;
                depitfinTotal = (depitfinTotal == undefined || depitfinTotal == "") ? 0 : depitfinTotal.toString().replace(/,/g, '');
                CreditfinTotal = (CreditfinTotal == undefined || CreditfinTotal == "") ? 0 : CreditfinTotal.toString().replace(/,/g, '');
                var finalDiff = Number(depitfinTotal) - Number(CreditfinTotal);
                $("#FinalDiffAMT").text("D/C Difference: " + Number(finalDiff).toFixed(2));
                $("#DepitTotal").text(Number(depitfinTotal).toFixed(2));
                $("#CreditTotal").text(Number(CreditfinTotal).toFixed(2));
            }


        }
        $$("GstEntry").hide();

    }
    else {
        $("#AlertMessageHdn").val(" Bill No Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage();
    }

}

function billChangeTaxSave() {
    debugger;
    var grid = $("#grid").data("kendoGrid");
    var GstGrid = $$("GstGrid").serialize();
    var GstGridHIdden = $("#GstGridHidden").data("kendoGrid");
    var total1 = GstGrid.length;
    var total2 = GstGridHIdden.dataSource.data().length;

    var GstBillDrop = $$("GstBillDrop").getValue();
    var GSTPARTYNM = $$("SrchPartyNm").getValue();
    var GSTPARTYID = $("#GSTPARTYID").val();
    var StateID = $("#StateID").val();
    var StateNM = $$("StateNM").getValue();
    var POSPlaceID = $("#POSPlaceID").val();
    var POSPlaceNM = $$("POSPlaceNM").getValue();
    var RegType = $$("RegType").getValue();
    var TrnType = $$("TrnType").getValue();
    var BillType = $$("BillType").getValue();
    var SupplyType = $$("SupplyType").getValue();
    var RevChrgeChk = 0;
    if ($$("RevChrgeChk").checked == true) {
        RevChrgeChk = 1;
    }
    
    var RevChargePer = $$("RevChargePer").getValue();
    var RevChrgReason = $$("RevChrgReason").getValue();
    var BoeNo = $$("BoeNo").getValue();
    var BoeAmt = $$("BoeAmt").getValue();
    var BOEDT = $$("BOEDT").getValue();
    var PortCd = $$("PortCd").getValue();
    var GstDetailBillAmt = $$("GstDetailBillAmt").getValue();
    var GstDetailBillDate = $$("GstDetailBillDate").getValue();
    var GstIn = $$("GstIn").getValue();

    if (GstBillDrop != "") {
        if (total1 != "" || total1 != 0) {
            var j = 0;
            for (; j < total2; j++) {
                if (GstBillDrop == GstGridHIdden.dataSource._data[j].SnoBill) {
                    var uid = GstGridHIdden._data[j].uid;
                    var row = GstGridHIdden.table.find('tr[data-uid="' + uid + '"]');
                    GstGridHIdden.select(row);
                    GstGridHIdden.select().each(function () {
                        var dataItem = GstGridHIdden.dataItem($(this));
                        GstGridHIdden.dataSource.remove(dataItem);
                    });
                    j = j - 1;
                    total2 = GstGridHIdden.dataSource.data().length;
                    if (total2 == undefined) {
                        total2 = 0;
                    }
                }
            }
            var i = 0; var totTaxAmt = 0; var OverAlltotTaxAmt = 0;
            for (; i < total1; i++) {
                //totTaxAmt = 0;
                var TaxCode = GstGrid[i].TaxCode;
                var TaxClass = GstGrid[i].TaxClass;
                var TaxAmount = GstGrid[i].TaxAmount;
                var ixTc1Per = GstGrid[i].ixTc1Per;
                var ixTc1Amt = GstGrid[i].ixTc1Amt;
                var ixTc1Cd = GstGrid[i].ixTc1Cd;
                var ixTc1vInd = GstGrid[i].ixTc1vInd;
                var ixTc2Per = GstGrid[i].ixTc2Per;
                var ixTc2Amt = GstGrid[i].ixTc2Amt;
                var ixTc2Cd = GstGrid[i].ixTc2Cd;
                var ixTc2vInd = GstGrid[i].ixTc2vInd;
                var ixTc3Per = GstGrid[i].ixTc3Per;
                var ixTc3Amt = GstGrid[i].ixTc3Amt;
                var ixTc3Cd = GstGrid[i].ixTc3Cd;
                var ixTc3vInd = GstGrid[i].ixTc3vInd;
                var ixTc4Per = GstGrid[i].ixTc4Per;
                var ixTc4Amt = GstGrid[i].ixTc4Amt;
                var ixTc4Cd = GstGrid[i].ixTc4Cd;
                var ixTc4vInd = GstGrid[i].ixTc4vInd;
                var INP_TY = "";
                var PARTY_TY = localStorage.getItem("Pty");
                var PTX_RG_No = $$("GstVatRegNo").getValue();
                var PTX_ST_CD = "";//$("#StateID").val(StateID);
                var PTX_RG_Ty = "";
                var TX_RG_CD = "";
                var GTRN_TY = $$("TrnType").getValue();
                var GINV_TY = $$("BillType").getValue();
                var TRN_ID_SRNO = "";
                var BRN_NO = $$("txtBrnNo").getValue();
                var TAN_No = $$("txtTanNo").getValue();
                var Sup_Cat = $$("ddlSupvat").getValue();
                var EXEMP_IND = "";
                var HCD = "";
                var ORD_NO = $$("workOrderno").getValue();
                var ORD_DT = "";
                var GWO_ID = "";
                var NID_No = $$("txtNationalId").getValue();
                var DC = localStorage.getItem("DC");
                var BILL_ITEM_NM = localStorage.getItem("AC_NM");
                GstGridHIdden.dataSource.add({
                    TaxCode: TaxCode, TaxClass: TaxClass, TaxAmount: TaxAmount,
                    ixTc1Per: ixTc1Per, ixTc1Amt: ixTc1Amt, ixTc1Cd: ixTc1Cd, ixTc1vInd: ixTc1vInd,
                    ixTc2Per: ixTc2Per, ixTc2Amt: ixTc2Amt, ixTc2Cd: ixTc2Cd, ixTc1v2nd: ixTc2vInd,
                    ixTc3Per: ixTc3Per, ixTc3Amt: ixTc3Amt, ixTc3Cd: ixTc3Cd, ixTc1v3nd: ixTc3vInd,
                    ixTc4Per: ixTc4Per, ixTc4Amt: ixTc4Amt, ixTc4Cd: ixTc4Cd, ixTc1v4nd: ixTc4vInd,
                    SnoBill: GstBillDrop, BillDate: GstDetailBillDate, AmountStr: GstDetailBillAmt,
                    AC_ID: GSTPARTYID, AC_NM: GSTPARTYNM, A_IND_ID: RegType, B_IND_ID: TrnType, C_IND_ID: BillType,
                    D_IND_ID: SupplyType, E_IND_ID: GstIn, F_IND_ID: StateID, F_IND_VAl: StateNM, L_IND_ID: POSPlaceID,
                    L_IND_VAl: POSPlaceNM, M_IND_ID: RevChrgeChk, N_IND_ID: RevChargePer, O_IND_ID: RevChrgReason,
                    A_IND_VAl: BoeNo, B_IND_VAl: BoeAmt, C_IND_VAl: BOEDT, D_IND_VAl: PortCd,
                    PARTY_TY: PARTY_TY, PTX_RG_No: PTX_RG_No, PTX_ST_CD: PTX_ST_CD, PTX_RG_Ty: PTX_RG_Ty, TX_RG_CD: TX_RG_CD, GTRN_TY: GTRN_TY, GINV_TY: GINV_TY,
                    TRN_ID_SRNO: TRN_ID_SRNO, BRN_NO: BRN_NO, TAN_No: TAN_No,
                    Sup_Cat: Sup_Cat, EXEMP_IND: EXEMP_IND, HCD: HCD, ORD_NO: ORD_NO, ORD_DT: ORD_DT, GWO_ID: GWO_ID, NID_No: NID_No, DC: DC,
                    BILL_ITEM_NM: BILL_ITEM_NM
                });
            }
        }
    }
}

function A1ReasonFrm(id) {
    webix.ui({
        view: "window",
        id: "FrmA1Reason",
        close: true,
        modal: true,
        head: "Reason",
        position: "center",
        width: 500,
        body: {
            cols: [{
                paddingX: 30,
                rows: [{
                    view: "textarea",
                    id: "txtA1Reason",
                    width: 400, labelWidth: 50,
                    label: "Reason",
                    height: 100,
                    attributes: { maxlength: 60 }
                }, {
                    view: "button",
                    id: "btnA1ReasonOk",
                    align: "right",
                    width: 60,
                    label: "Ok",
                    on: {
                        'onItemClick': function () {
                            if ($$("txtA1Reason").getValue() != "") {
                                localStorage.setItem("A1Reason", $$("txtA1Reason").getValue());
                                $$("FrmA1Reason").hide();
                                if (id == "save")
                                    SaveGLTRNgrid();
                                else
                                    FinalDeleteProcess();
                            }
                            else WAlertMessage("Enter reason to proceed.")
                        },
                    }
                }],
            }]
        }
    });
    $$("FrmA1Reason").show();
}