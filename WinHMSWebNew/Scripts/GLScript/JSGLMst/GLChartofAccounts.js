var app = angular.module('GLMApp', ['webix']);
var dtMultiComp = [];
function FormLoad() {
    $("#LoadDIv").hide();
    var DefLoad = fnGlCOADefLoad();
    if ($$("frmGLChartofAccounts"))
        $$("frmGLChartofAccounts").destructor();

    var DrAmt = parseFloat(DefLoad.DrAmt == null || DefLoad.DrAmt == "" ? "0" : DefLoad.DrAmt);
    var CrAmt = parseFloat(DefLoad.CrAmt == null || DefLoad.CrAmt == "" ? "0" : DefLoad.CrAmt);

    var Diff = parseFloat(DrAmt - CrAmt);
    Diff = Math.abs(Diff);

    Diff = fnCurrFormat(Diff.toString(), $("#VAL_DECIM_LIMIT").val());

    var DispDiff = "";
    var DispDrAmt = fnCurrFormat(DrAmt.toString(), $("#VAL_DECIM_LIMIT").val()) + " Dr";
    var DispCrAmt = fnCurrFormat(CrAmt.toString(), $("#VAL_DECIM_LIMIT").val()) + " Cr";

    if (Diff > 0) DispDiff = Diff + " Dr"
    else DispDiff = Diff;

    webix.ui({
        id: "frmGLChartofAccounts", 
        container: 'DivForm',
        view: 'form',
        minWidth: 900,
        css: 'GLCOA',
        maxWidth: 5000,
        borderless: true,
        ready: function () {
            gridResize("1");
        },
        elements: [
            {
                padding: { left: 5, top: 0, right: 2, },
                rows: [
                    {
                        cols: [
                        {
                            view: "search",
                            id: "TxtLedger",
                            label: "Ledger",
                            readonly: true,
                            inputAlign: "left",
                            inputWidth: 320,
                            width: 320,
                            on: {
                                onSearchIconClick: function () {
                                    //debugger;
                                    fnCallLedgerSearch();
                                }
                            }
                        },
                        {
                            view: "checkbox",
                            id: "ChkInAct",
                            labelRight: "Filter Inactive",
                            width: 200,
                            value: 1,
                            on: {
                                "onChange": function () {
                                }
                            }
                          
                        }
                        ]
                    },
                                    {
                                        padding: { left: 5, top: 5, right: 2, },
                                        type: "space",                                       
                                        cols: [
                                               {
                                                   margin: { top: 5, bottom: 2, },
                                                   padding: { left: 2, right: 2, },
                                                   rows: [
                                                    {
                                                        view: "tree",
                                                        select: true,
                                                        id: "TreeLedger",
                                                        data: [],
                                                        //height:450,
                                                        type:"lineTree",
                                                        gravity: 1,
                                                        css: "COAAccTree",
                                                        ///hover:"Treehover",
                                                        //template:"{common.icon()} {common.folder()} #value#",

                                                        template: function (obj, com) {
                                                            //debugger;
                                                            var icon = "";
                                                            if (obj.$count > 0) {
                                                                icon = obj.open ? ("&nbsp&nbsp<span class='fa fa-folder-open'></span>&nbsp") : ("&nbsp&nbsp<span class='fa fa-folder'></span>&nbsp");
                                                            }
                                                            else {
                                                                if (obj.AC_CAT == "L") icon = ("&nbsp&nbsp<span class='fa fa-file'></span>&nbsp");
                                                                else icon = ("&nbsp&nbsp<span class='fa fa-folder'></span>&nbsp");
                                                            }
                                                            return com.icon(obj, com) + icon + obj.value;
                                                        },
                                                        scheme: {
                                                            //Sets Header color
                                                            $change: function (item, h) {
                                                                //debugger;
                                                                var Id = item.id;
                                                                if (Id.includes("G_") == true) {
                                                                    item.$css = "TreeGrpClr";
                                                                }
                                                                else if (Id.includes("L_") == true && item.INT_APPL_IND=="0") {
                                                                    item.$css = "TreeLedClr";
                                                                }
                                                                else if (Id.includes("L_") == true && item.INT_APPL_IND == "1" ) {
                                                                    item.$css = "InActLedClr";
                                                                }
                                                            }
                                                        },
                                                        on: {
                                                            "onItemClick": function (id, e, node) {
                                                                //debugger;
                                                                //var obj = this.getItem(id);
                                                                //if (obj.$count) {
                                                                //    if (obj.open) obj.open = false;
                                                                //    else obj.open = true;
                                                                //    this.refresh();
                                                                //}

                                                                //fnClearValue();
                                                              
                                                                //if (id.includes("G_"))
                                                                //{
                                                                //    $$("ChkGroup").setValue("1");
                                                                //    $("#btnNew").prop('disabled', false);
                                                                    
                                                                //}
                                                                //else
                                                                //{
                                                                //    $$("ChkLedger").setValue("1");
                                                                //    $("#btnNew").prop('disabled', true);

                                                                //}
                                                                //if (id.substring(2, 14) == "000100010001" || id.substring(2, 14) == "000200010001" || id.substring(2, 14) == "000100010003") $$("ChkBkReqd").show();
                                                                //else $$("ChkBkReqd").hide();
                                                                //if ((id.substring(2, 6) == "0003" || id.substring(2, 6) == "0004") && id.length > 6) $$("ChkGrsProfit").show();
                                                                //else $$("ChkGrsProfit").hide();
                                                               
                                                                  
                                                                
                                                            },
                                                            onSelectChange: function () {
                                                                //debugger;
                                                                fnClearValue();
                                                                var SelId = this.getSelectedId(false);
                                                                if (SelId != undefined) {                                                                    
                                                                    var SelRow = this.getItem(SelId);
                                                                    $("#LoadDIv").show();
                                                                    setTimeout(function () {
                                                                        fnTreeSelectedChange();
                                                                        $("#LoadDIv").hide();
                                                                    }, 0);
                                                                    //$$("ChkGroup").setValue("0");
                                                                    //$$("ChkLedger").setValue("0");
                                                                    
                                                                    //if (SelId.includes("G_")) {
                                                                    //    $$("ChkGroup").setValue("1");
                                                                    //    $("#btnNew").prop('disabled', false);
                                                                        

                                                                    //}
                                                                    //else {
                                                                    //    $$("ChkLedger").setValue("1");
                                                                    //    $("#btnNew").prop('disabled', true);

                                                                    //}

                                                                    //if (SelId.length == 6) $$("ChkLedger").disable();
                                                                    //else if($("#hdnCurMode").val() == "N") $$("ChkLedger").enable();


                                                                    //if (SelId.substring(2, 14) == "000100010001" || SelId.substring(2, 14) == "000200010001" || SelId.substring(2, 14) == "000100010003") $$("ChkBkReqd").show();
                                                                    //else $$("ChkBkReqd").hide();
                                                                    //if ((SelId.substring(2, 6) == "0003" || SelId.substring(2, 6) == "0004") && SelId.length > 6) $$("ChkGrsProfit").show();
                                                                    //else $$("ChkGrsProfit").hide();
                                                                    
                                                                    
                                                                }

                                                            },
                                                        }
                                                    }
                                                   ]
                                               },
                                                {
                                                    id:"FrmInput",
                                                    width: "auto",
                                                    padding: { left: 5, top: 5, right: 2, },
                                                    type: "space",
                                                    disabled: true,
                                                    view:"form",
                                                    cols: [
                                                           {
                                                               margin: { top: 5, bottom: 2, },
                                                               padding: { left: 2, right: 2, },
                                                               rows: [
                                                                {
                                                                    cols: [
                                                                             {
                                                                                 view: "template",
                                                                                 select: true,
                                                                                 id: "TempRes",
                                                                                 inputWidth: 100,
                                                                                 minWidth: 130,
                                                                                 maxWidth: 130,
                                                                                 readonly: true,
                                                                                 borderless:true,
                                                                                 //hidden:true,
                                                                             },
                                                                             {
                                                                                 view: "checkbox",
                                                                                 id: "ChkActGrp",
                                                                                 name: "ChkActGrp",
                                                                                 labelRight: "Active Group",
                                                                                 Width: 250,                                                                                 
                                                                                 uncheckValue: "0", checkValue: "1",
                                                                                 hidden:true,
                                                                                 on: {
                                                                                     "onChange": function () {
                                                                                     }
                                                                                 }
                                                                             },
                                                                            {
                                                                                view: "checkbox",
                                                                                id: "ChkPrvFisYr",
                                                                                name: "ChkPrvFisYr",
                                                                                uncheckValue: "0", checkValue: "1",
                                                                                label: "Copy to Previous Fiscal year",
                                                                                Width: 350,
                                                                                labelWidth: 180,
                                                                                hidden: true,
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
                                                                          width: 110,
                                                                          rows: [
                                                                              {
                                                                                  view: "checkbox",
                                                                                  id: "ChkLedger",
                                                                                  name: "ChkLedger",
                                                                                  label: "Ledger",
                                                                                  uncheckValue: "0", checkValue: "1",
                                                                                  gravity: 1,
                                                                                  on: {
                                                                                      "onChange": function (newVal, OldVal) {                                                                                          

                                                                                          chkLedger_CheckedChanged();

                                                                                 
                                                                                 
                                                                                      }
                                                                                  }
                                                                              },
                                                                              {
                                                                                  view: "checkbox",
                                                                                  id: "ChkGroup",
                                                                                  name: "ChkGroup",
                                                                                  label: "Group",
                                                                                  uncheckValue: "0", checkValue: "1",
                                                                                  gravity: 1,
                                                                                  value:1,
                                                                                  on: {
                                                                                      onChange: function (newVal, OldVal) {

                                                                                          chkGroup_CheckedChanged();

                                                                                          
                                                                                     
                                                                                          
                                                                                    

                                                                                      }
                                                                                  }
                                                                              },
                                                                          ]
                                                                      },
                                                                       {
                                                                 
                                                                           rows: [
                                                                             {
                                                                                 view: "text",
                                                                                 id: "TxtLedgerNm",
                                                                                 name: "TxtLedgerNm",
                                                                                 label: "Ledger Name",
                                                                                 labelWidth: 100,
                                                                                 minWidth: 300,
                                                                                 maxWidth: 400,
                                                                                 attributes: $("#hdnNmLen").val() == "1" ? { maxlength: 60 } : { maxlength: 40 },
                                                                                 on: {
                                                                                     "onChange": function (newVal, OldVal) {
                                                                                         
                                                                                     },
                                                                                     "onTimedKeyPress": function (code, e) {
                                                                                         //debugger;
                                                                                         $$("TxtAlias").setValue($$("TxtLedgerNm").getValue());
                                                                                     },                                                                                     
                                                                                    "onKeyPress": function (code, e) {
                                                                                        if (e.key == "'") return false;                                                                                        
                                                                                    }                                                                                     
                                                                                 }
                                                                        
                                                                             },
                                                                             {
                                                                                 view: "text",
                                                                                 label: "Alias",
                                                                                 name: "TxtAlias",
                                                                                 id: "TxtAlias",
                                                                                 labelWidth: 100,
                                                                                 minWidth: 300,
                                                                                 maxWidth: 400,
                                                                                 attributes: $("#hdnNmLen").val() == "1" ? { maxlength: 60 } : { maxlength: 40 },
                                                                                 on: {                                                                                                                                                                          
                                                                                     "onKeyPress": function (code, e) {
                                                                                         if (e.key == "'") return false;
                                                                                     }
                                                                                 }
                                                                             },
                                                                           ]
                                                                       },
                                                                     ]
                                                                 },
                                                                  {
                                                                      cols: [
                                                                            {
                                                                                view: "checkbox",
                                                                                id: "ChkBookAppl",
                                                                                name: "ChkBookAppl",
                                                                                label: "Book Applicable ,yes",
                                                                                PositionAlign: 'right',
                                                                                uncheckValue: "0", checkValue: "1",
                                                                                width: 250,
                                                                                labelWidth: 180,
                                                                                left: 25,                                                                    
                                                                                on: {
                                                                                    "onChange": function (newVal,OldVal) {
                                                                                        if (newVal == "1") $$("TxtBookNm").show();
                                                                                        else {
                                                                                            $$("TxtBookNm").hide();
                                                                                            $$("TxtBookNm").setValue();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            {
                                                                                view: "text",
                                                                                label: "Book Name",
                                                                                name: "TxtBookNm",
                                                                                id: "TxtBookNm",
                                                                                labelWidth: 80,
                                                                                width: 300,
                                                                                attributes: { maxlength: 25 },
                                                                                hidden: true,
                                                                                on: {
                                                                                    "onKeyPress": function (code, e) {
                                                                                        if (e.key == "'") return false;
                                                                                    }
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        cols: [
                                                                             {
                                                                                 view: "checkbox",
                                                                                 id: "ChkPartyLink",
                                                                                 name: "ChkPartyLink",
                                                                                 label: "Party Master to be Linked ,yes",
                                                                                 PositionAlign: 'right',
                                                                                 width: 250,
                                                                                 labelWidth: 200,
                                                                                 uncheckValue: "0", checkValue: "1",
                                                                                 left: 25,
                                                                                 hidden:true,
                                                                                 on: {
                                                                                     "onChange": function (newVal,OldVal) {
                                                                                         //debugger;
                                                                                         if (this.isVisible() == false){
                                                                                             $$("ChkPartyLink").setValue('0'); 
                                                                                             return false;
                                                                                         }

                                                                                         if (newVal == "1"){
                                                                                             if ($$("ChkGroup").getValue() == "1"){
                                                                                                 $$("ddlPartyMaster").show();
                                                                                                 $$("ddlPartyMaster").enable();
                                                                                             }                                                                                         
                                                                                             else{                   
                                                                                                 $$("ddlPartyMaster").setValue('');
                                                                                                 $$("ddlPartyMaster").hide();
                                                                                                 $$("ddlPartyMaster").enable();
                                                                                             }
                                                                                         }
                                                                                         else{
                                                                                             $$("ddlPartyMaster").setValue('');
                                                                                             $$("ddlPartyMaster").hide();
                                                                                             $$("ddlPartyMaster").enable();
                                                                                         }
                                                                                         ACCODEVISIBLE("N", $$("ChkGroup").getValue(), newVal);

                                                                                     }
                                                                                 }
                                                                             },
                                                                             {
                                                                                 view: "richselect",
                                                                                 label: "Party Master",
                                                                                 id: "ddlPartyMaster",
                                                                                 name: "ddlPartyMaster",
                                                                                 align: "right",
                                                                                 labelWidth: 80,
                                                                                 width: 300,
                                                                                 hidden: true,
                                                                                 options:DefLoad.dtPartyTy == null?[]:DefLoad.dtPartyTy
                                                                             },
                                                                                   ]
                                                                               },
                                                                               {
                                                                                   Width: 150,
                                                                                   cols: [
                                                                             {
                                                                                 view: "checkbox",
                                                                                 id: "ChkControlInd",
                                                                                 name: "ChkControlInd",
                                                                                 label: "Is it Control A/c",
                                                                                 align: "right",
                                                                                 labelWidth: 200,
                                                                                 uncheckValue: "0", checkValue: "1",
                                                                                 hidden:true,
                                                                                 on: {
                                                                                     "onChange": function (newVal,OldVal) {

                                                                                         if (newVal == "1") $$("ChkControl").show();
                                                                                         else {
                                                                                             $$("ChkControl").hide();
                                                                                             $$("ChkControl").setValue('0');
                                                                                         }
                                                                                     }
                                                                                 }
                                                                             },
                                                                             {
                                                                             },
                                                                       ]
                                                                   },
                                                                    {
                                                                    cols: [
                                                                        {
                                                                            gravity: 3,
                                                                            rows:
                                                                                [
                                                                                        {
                                                                                            view: "label",
                                                                                            label: "Level-",
                                                                                            id: "lblLvl",
                                                                                            align: "right",
                                                                                            labelWidth: 80,
                                                                                            height: 22,
                                                                                        },
                                                                                        {
                                                                                            view: "label",
                                                                                            label: "Applicable Analysis",
                                                                                            id: "LblApplAnlysis",
                                                                                            align: "right",
                                                                                            labelWidth: 80,
                                                                                            gravity: 3,
                                                                                            height: 18,
                                                                                        },
                                                                                ]
                                                                        },
                                                                   {
                                                                       view: "checkbox",
                                                                       id: "ChkAna1",
                                                                       name: "ChkAna1",
                                                                       label: "1",
                                                                       align: "center",
                                                                       labelPosition: "top",
                                                                       gravity: 0.5,
                                                                       uncheckValue: "0", checkValue: "1",
                                                                       hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                       on: {
                                                                           "onChange": function () {
                                                                           }
                                                                       }
                                                                   },
                                                                     {
                                                                         view: "checkbox",
                                                                         id: "ChkAna2",
                                                                         name: "ChkAna2",
                                                                         label: "2",
                                                                         labelPosition: "top",
                                                                         align: "center",
                                                                         gravity: 0.5,
                                                                         uncheckValue: "0", checkValue: "1",
                                                                         hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                         on: {
                                                                             "onChange": function () {
                                                                             }
                                                                         }
                                                                     },
                                                                       {
                                                                           view: "checkbox",
                                                                           id: "ChkAna3",
                                                                           name: "ChkAna3",
                                                                           label: "3",
                                                                           align: "center",
                                                                           labelPosition: "top",
                                                                           gravity: 0.5,
                                                                           uncheckValue: "0", checkValue: "1",
                                                                           hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                           on: {
                                                                               "onChange": function () {
                                                                               }
                                                                           }
                                                                       },
                                                                         {
                                                                             view: "checkbox",
                                                                             id: "ChkAna4",
                                                                             name: "ChkAna4",
                                                                             label: "4",
                                                                             align: "center",
                                                                             labelPosition: "top",
                                                                             gravity: 0.5,
                                                                             uncheckValue: "0", checkValue: "1",
                                                                             hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                             on: {
                                                                                 "onChange": function () {
                                                                                 }
                                                                             }
                                                                         },
                                                                           {
                                                                               view: "checkbox",
                                                                               id: "ChkAna5",
                                                                               name: "ChkAna5",
                                                                               label: "5",
                                                                               align: "center",
                                                                               labelPosition: "top",
                                                                               gravity: 0.5,
                                                                               uncheckValue: "0", checkValue: "1",
                                                                               hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                               on: {
                                                                                   "onChange": function () {
                                                                                   }
                                                                               }
                                                                           },
                                                                     {
                                                                         view: "checkbox",
                                                                         id: "ChkAna6",
                                                                         name: "ChkAna6",
                                                                         label: "6",
                                                                         labelPosition: "top",
                                                                         align: "center",
                                                                         gravity: 0.5,
                                                                         uncheckValue: "0", checkValue: "1",
                                                                         hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                         on: {
                                                                             "onChange": function () {
                                                                             }
                                                                         }
                                                                     },
                                                                       {
                                                                           view: "checkbox",
                                                                           id: "ChkAna7",
                                                                           name: "ChkAna7",
                                                                           label: "7",
                                                                           align: "center",
                                                                           labelPosition: "top",
                                                                           gravity: 0.5,
                                                                           uncheckValue: "0", checkValue: "1",
                                                                           hidden: $("#hdnAnaAppl").val() == "1" ? false : true,
                                                                           on: {
                                                                               "onChange": function () {
                                                                               }
                                                                           }
                                                                       },
                                                                         {
                                                                             view: "checkbox",
                                                                             id: "ChkAna8",
                                                                             name: "ChkAna8",
                                                                             label: "8",
                                                                             align: "center",
                                                                             labelPosition: "top",
                                                                             gravity: 0.5,
                                                                             uncheckValue: "0", checkValue: "1",
                                                                             hidden: $("#hdnAnaAppl").val() == "1" && $("#hdnMultilevel").val() == "1" ? false : true,
                                                                             on: {
                                                                                 "onChange": function () {
                                                                                 }
                                                                             }
                                                                         },
                                                                           {
                                                                               view: "checkbox",
                                                                               id: "ChkAna9",
                                                                               name: "ChkAna9",
                                                                               label: "9",
                                                                               align: "center",
                                                                               labelPosition: "top",
                                                                               gravity: 0.5,
                                                                               uncheckValue: "0", checkValue: "1",
                                                                               hidden: $("#hdnAnaAppl").val() == "1" && $("#hdnMultilevel").val() == "1" ? false : true,
                                                                               on: {
                                                                                   "onChange": function () {
                                                                                   }
                                                                               }
                                                                           },
                                                                     {
                                                                         padding: { top: 20, },
                                                                         view: "checkbox",
                                                                         id: "ChkAna10",
                                                                         name: "ChkAna10",
                                                                         label: "10",
                                                                         labelPosition: "top",
                                                                         align: "left",
                                                                         labelWidth: 50,
                                                                         gravity: 0.5,
                                                                         uncheckValue: "0", checkValue: "1",
                                                                         hidden: $("#hdnAnaAppl").val() == "1" && $("#hdnMultilevel").val() == "1" ? false : true,
                                                                         on: {
                                                                             "onChange": function () {
                                                                             }
                                                                         }
                                                                     },
                                                                       {
                                                                           rows: [
                                                                               {},
                                                                               {
                                                                                   view: "button",
                                                                                   id: "CbnAdd",
                                                                                   label: "Add",
                                                                                   align: "right",
                                                                                   labelPosition: "top",
                                                                                   labelWidth: 50,
                                                                                   gravity: 1,
                                                                                   value: 1,
                                                                                   hidden:true,
                                                                                   on: {
                                                                                       "onChange": function () {
                                                                                       }
                                                                                   }
                                                                               }

                                                                           ]
                                                                       },

                                                                        ]
                                                                    },
                                                                      {
                                                                          gravity: 1,
                                                                          cols: [
                                                                        {
                                                                            width: 400,
                                                                            rows: [
                                                                                {
                                                                                    cols: [

                                                                                    {
                                                                                        view: "label",
                                                                                        label: "Level1",
                                                                                        id: "lblLvl1",
                                                                                        align: "right",
                                                                                        labelWidth: 100,
                                                                                        height: 22,
                                                                                        width: 205,
                                                                                        hidden: true,
                                                                                    },
                                                                                {
                                                                                    view: "button",
                                                                                    id: "btnDefAnlysis",                                                                                    
                                                                                    label: "Default Analysis",
                                                                                    align: "right",
                                                                                    labelPosition: "top",
                                                                                    labelWidth: 50,
                                                                                    gravity: 1,
                                                                                    width: 150,
                                                                                    hidden:true,
                                                                                    on: {
                                                                                        "onChange": function () {
                                                                                        }
                                                                                    }
                                                                                },
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    view: "checkbox",
                                                                                    id: "ChkControl",                                                                                    
                                                                                    label: "Control A/c Behaves Like a SubLedger in TB, Yes ",
                                                                                    align: "left",
                                                                                    labelWidth: 320,
                                                                                    width:350,
                                                                                    css: { "max-width": "350px" },
                                                                                    name: "ChkControl",
                                                                                    uncheckValue: "0", checkValue: "1",
                                                                                    hidden: true,
                                                                                    on: {
                                                                                        "onChange": function () {
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    cols: [
                                                                                    {
                                                                                        view: "text",
                                                                                        label: "Account Code",
                                                                                        id: "TxtAccCode",
                                                                                        name: "TxtAccCode",
                                                                                        labelWidth: 220,
                                                                                        width: 300,
                                                                                        css:"COAAccText",
                                                                                        attributes: { maxlength: 10 },
                                                                                        on: {
                                                                                            "onKeyPress": function (code, e) {
                                                                                                if (e.key == "'") return false;
                                                                                            }
                                                                                        }
                                                                                    //   hidden:true,
                                                                                    },
                                                                                    {
                                                                                        view: "button",
                                                                                        id: "btnChkCode",
                                                                                        label: "Chk. Code",
                                                                                        align: "left",
                                                                                        labelWidth: 90,
                                                                                        width: 90,
                                                                                        // hidden: true,
                                                                                        on: {
                                                                                            "onItemClick": function () {
                                                                                                //debugger;
                                                                                                if ($$("TxtAccCode").getValue() != "") fnDuplicateAccCdCheck($$("TxtAccCode").getValue());
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    view: "checkbox",
                                                                                    id: "ChkBillDet",
                                                                                    name: "ChkBillDet",
                                                                                    label: "Bill Details Required, yes",
                                                                                    labelPosition: "right",
                                                                                    labelWidth: 220,
                                                                                    width: 300,
                                                                                    css:{"max-width":"300px"},
                                                                                    hidden: true,
                                                                                    uncheckValue: "0", checkValue: "1",
                                                                                    on: {
                                                                                        "onChange": function () {
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    view: "checkbox",
                                                                                    id: "ChkGrsProfit",
                                                                                    name: "ChkGrsProfit",
                                                                                    label: "Affected Gross Profit, Yes",
                                                                                    labelPosition: "right",
                                                                                    labelWidth: 220,
                                                                                    width: 300,
                                                                                    css: { "max-width": "300px" },
                                                                                    hidden: true,
                                                                                    uncheckValue: "0", checkValue: "1",
                                                                                    on: {
                                                                                        "onChange": function () {
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    view: "checkbox",
                                                                                    id: "ChkBkReqd",
                                                                                    name: "ChkBkReqd",
                                                                                    label: "Bank Reconciliation Reqd, Yes",
                                                                                    labelPosition: "right",
                                                                                    labelWidth: 220,
                                                                                    width: 300,
                                                                                    css: { "max-width": "300px" },
                                                                                    hidden: true,
                                                                                    uncheckValue: "0", checkValue: "1",
                                                                                    on: {
                                                                                        "onChange": function () {
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    cols: [
                                                                                        {
                                                                                            view: "checkbox",
                                                                                            id: "ChkGrpDisp",
                                                                                            label: "Group Display Sequence Number",
                                                                                            labelPosition: "right",
                                                                                            labelWidth: 220,
                                                                                            width: 245,
                                                                                            name: "ChkGrpDisp",
                                                                                            uncheckValue: "0", checkValue: "1",
                                                                                            on: {
                                                                                                "onChange": function (newVal, oldVal) {
                                                                                                    if (newVal == "1") $$("TxtGrpDisp").show();
                                                                                                    else $$("TxtGrpDisp").hide();
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                            {
                                                                                                view: "text",
                                                                                                id: "TxtGrpDisp",
                                                                                                name: "TxtGrpDisp",
                                                                                                gravity: 1,
                                                                                                inputWidth: 80,
                                                                                                attributes:  { maxlength: 4 },
                                                                                                on: {
                                                                                                    "onChange": function () {
                                                                                                    },
                                                                                                    "onKeyPress": function (code, e) {
                                                                                                        return fnNumericText(code, e);
                                                                                                    },
                                                                                                }
                                                                                            },

                                                                                            {
                                                                                                view: "text",
                                                                                                id: "hdnGrpDisp",
                                                                                                name: "hdnGrpDisp",
                                                                                                gravity: 1,
                                                                                                inputWidth: 80,
                                                                                                hidden:true,
                                                                                                attributes:  { maxlength: 4 },
                                                                                                on: {
                                                                                                    "onChange": function () {
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                    ] 
                                                                                },                                                                                                   
                                                                                                  
                                                                            ]
                                                                        },
                                                                         {
                                                                             width: 200,
                                                                             rows: [
                                                                                      {
                                                                                          view: "fieldset", label: "Opening Balance",
                                                                                          body: {
                                                                                              height: 100,
                                                                                              rows: [
                                                                                                  {
                                                                                                      view: "text",
                                                                                                      label: "Debit Total",
                                                                                                      id: "TxtDr",
                                                                                                      inputAlign: "right",
                                                                                                      labelWidth: 80,
                                                                                                      readonly:true,
                                                                                                      css: "COAAccTextSmFont redColFont",
                                                                                                      value: DispDrAmt //parseFloat(DefLoad.DrAmt == null || DefLoad.DrAmt == "" ? "0" : DefLoad.DrAmt).toFixed(2) + " Dr",
                                                                                                  },
                                                                                              {
                                                                                                  view: "text",
                                                                                                  label: "Credit Total",
                                                                                                  id: "TxtCr",                                                                                            
                                                                                                  inputAlign: "right",
                                                                                                  labelWidth: 80,
                                                                                                  readonly: true,
                                                                                                  css: "COAAccTextSmFont redColFont",
                                                                                                  value: DispCrAmt, //parseFloat(DefLoad.CrAmt == null || DefLoad.CrAmt == "" ? "0" : DefLoad.CrAmt).toFixed(2) + " Cr", 
                                                                                              },
                                                                                               {
                                                                                                   view: "text",
                                                                                                   label: "Difference",
                                                                                                   id: "TxtDiff",
                                                                                                   inputAlign: "right",
                                                                                                   labelWidth: 80,
                                                                                                   readonly: true,
                                                                                                   css: "COAAccTextSmFont redColFont",
                                                                                                   value: DispDiff,
                                                                                               },
                                                                                               {},
                                                                                              ]
                                                                                          },
                                                                                      },
                                                                             ]
                                                                         },
                                                                          ]
                                                                      },
                                                                      {
                                                                                                       cols:[
                                                                                                           {
                                                                                                               view: "text",
                                                                                                               id: "TxtRepSeq",
                                                                                                               name: "TxtRepSeq",
                                                                                                               label: "P&L And B/S Report Sequence",
                                                                                                               labelPosition: "right",
                                                                                                               labelWidth: 220,
                                                                                                               inputWidth:280,
                                                                                                               width: 280,
                                                                                                               attributes: { maxlength: 2 },
                                                                                                               on: {
                                                                                                                   "onChange": function () {
                                                                                                                   },
                                                                                                                   "onKeyPress": function (code, e) {
                                                                                                                       return fnNumericText(code, e);
                                                                                                                   },
                                                                                                               }
                                                                                                           },
                                                                                                           {
                                                                                                               view: "label",
                                                                                                               id: "Lblsgrp",
                                                                                                               label: "(Applicable to all Ledgers under this Group)",
                                                                                                               gravity: 1,
                                                                                                               inputWidth: 0,                                                                                                               
                                                                                                               labelWidth:320,
                                                                                                               width: 320,
                                                                                                               hidden: true,
                                                                                                               on: {
                                                                                                                   "onChange": function () {
                                                                                                                   }
                                                                                                               }
                                                                                                           },                                                                                                         
                                                                                                       ]
                                                                      },
                                                                      {
                                                                                                       cols:[
                                                                                                           {
                                                                                                               view: "checkbox",
                                                                                                               id: "chkSpec",
                                                                                                               name: "chkSpec",
                                                                                                               label: "Accept only for the specific division, Yes",
                                                                                                               labelPosition: "right",
                                                                                                               labelWidth: 220,
                                                                                                               width: 245,
                                                                                                               hidden: true,
                                                                                                               uncheckValue: "0", checkValue: "1",
                                                                                                               on: {
                                                                                                                   "onChange": function () {
                                                                                                                   }
                                                                                                               }
                                                                                                           },
                                                                                                           {
                                                                                                               view: "richselect",
                                                                                                               id: "ddlDiv",
                                                                                                               name: "ddlDiv",
                                                                                                               label: "Division ",
                                                                                                               gravity: 1,
                                                                                                               inputWidth:200,
                                                                                                               labelWidth:70,
                                                                                                               width: 400,                                                                                                               
                                                                                                               hidden: true,
                                                                                                               options: DefLoad.dtDiv == null ? [] : DefLoad.dtDiv,
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
                                                                               view: "label",
                                                                               id: "LblOpen",
                                                                               label: "Opening Balance",
                                                                               labelPosition: "right",
                                                                               labelWidth: 210,
                                                                               width: 225,
                                                                               value: 1,
                                                                               hidden:true,
                                                                               on: {
                                                                                   "onChange": function () {
                                                                                   }
                                                                               }
                                                                           },
                                                                           {
                                                                               view: "text",
                                                                               id: "TxtOpen",
                                                                               name: "TxtOpen",
                                                                               gravity: 1,
                                                                               inputWidth: 100,
                                                                               width: 100,
                                                                               hidden: true,
                                                                               inputAlign: "right",
                                                                               css: "COAAccTextSmFont",
                                                                               //format: "1111111.00",
                                                                               format: {
                                                                                   parse: function (value) { 
                                                                                       if (value != undefined && value != null && value.toString().trim() != "") value = value.toString().replace(/,/g, "");
                                                                                       return value;
                                                                                   },
                                                                                   edit: function (value) {                                                                                       
                                                                                       return fnCurrFormat(value.toString());
                                                                                   },
                                                                               },
                                                                               on: {
                                                                                   //onChange: function (NewVal, OldVal) {
                                                                                   //    if (NewVal == "") {                                                                                           
                                                                                   //    }
                                                                                   //    else {
                                                                                   //        this.setValue(fnAmtFormat(NewVal, 2));
                                                                                   //    }
                                                                                   //},
                                                                                   "onKeyPress": function (code, e) {
                                                                                       debugger;
                                                                                       var CurPos = this.getInputNode().selectionStart;
                                                                                       var Input = this.getText();
                                                                                       return fnFloatText(code, e, Input, 14, $("#VAL_DECIM_LIMIT").val(), this.getInputNode().selectionStart);
                                                                                   }
                                                                               }
                                                                           },
                                                                           
                                                                           {
                                                                               view: "text",
                                                                               id: "LblDrCr",
                                                                               gravity: 1,
                                                                               inputWidth: 45,
                                                                               width: 45,
                                                                               //placeholder: "Dr",
                                                                               value: "Dr",
                                                                               hidden: true,
                                                                               //disabled: true,
                                                                               //readonly:true,
                                                                               on: {
                                                                                   "onChange": function () {
                                                                                   },
                                                                                   "onKeyPress": function (code, e) {
                                                                                       if (e.key == "C" || e.key == "c") {
                                                                                           $$("LblDrCr").setValue('Cr');                                                                                           
                                                                                       }
                                                                                       else if (e.key == "D" || e.key == "d") $$("LblDrCr").setValue('Dr');

                                                                                       return false
                                                                                   }                                                                                   
                                                                               }
                                                                           },
                                                                           {
                                                                           view: "button",
                                                                           id: "btnForn",
                                                                              label: "F",
                                                                            align: "left",                                                                          
                                                                            width: 40,
                                                                            hidden: true,
                                                                            on: {
                                                                             "onChange": function () {
                                                                               }
                                                                             }
                                                                           },
                                                                           {
                                                                               view: "button",
                                                                               id: "CbnBillVouch",
                                                                               label: "Bill Voucher",
                                                                               align: "left",
                                                                               width: 100,
                                                                               hidden: true,
                                                                               on: {
                                                                                   "onChange": function () {
                                                                                   },
                                                                                   onItemClick: function () {
                                                                                       fnShowBillVoucherWindow();
                                                                                   }
                                                                               }
                                                                           },
                                                                       ]
                                                                   },
                                                                     {
                                                                         cols: [
                                                                             {
                                                                                 view: "checkbox",
                                                                                 id: "ChkCapitPur",
                                                                                 name: "ChkCapitPur",
                                                                                 label: "Capital Purchase Account",
                                                                                 labelPosition: "right",
                                                                                 labelWidth: 220,
                                                                                 width: 245,
                                                                                 hidden: true,
                                                                                 uncheckValue: "0", checkValue: "1",
                                                                                 on: {
                                                                                     "onChange": function () {
                                                                                     }
                                                                                 }
                                                                             },                                                                                                                                                     
                                                                             {
                                                                                 view: "button",
                                                                                 id: "CbnDiv",
                                                                                 label: "Div Details",
                                                                                 align: "left",
                                                                                 width: 100,
                                                                                 hidden: true,
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
                                                                                 view: "checkbox",
                                                                                 id: "ddlCur",
                                                                                 name: "ddlCur",
                                                                                 label: "Ledger Currency",
                                                                                 labelPosition: "right",
                                                                                 labelWidth: 220,
                                                                                 width: 247,
                                                                                 hidden: true,
                                                                                 uncheckValue: "0", checkValue: "1",
                                                                                 on: {
                                                                                     "onChange": function () {
                                                                                     }
                                                                                 }
                                                                             },
                                                                             {
                                                                                 view: "richselect",
                                                                                 id: "",
                                                                                 align: "left",
                                                                                 width: 150,
                                                                                 value: 1,
                                                                                 hidden: true,
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
                                                                                  view: "checkbox",
                                                                                  id: "ChkInterComp",
                                                                                  name: "ChkInterComp",
                                                                                  label: "Is it inter Company Ledger",
                                                                                  labelPosition: "right",
                                                                                  labelWidth: 220,
                                                                                  width: 245,
                                                                                  uncheckValue: "0", checkValue: "1",
                                                                                  hidden: $("#hdnIntComp").val()=="1"?false:true,
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
                                                                                   view: "checkbox",
                                                                                   id: "",
                                                                                   label: "Respective Company to which it is applicable",
                                                                                   labelPosition: "right",
                                                                                   labelWidth: 300,
                                                                                   width: 280,
                                                                                   hidden: true,
                                                                                   uncheckValue: "0", checkValue: "1",
                                                                                   on: {
                                                                                       "onChange": function () {
                                                                                       }
                                                                                   }
                                                                               },
                                                                               {
                                                                                   view: "richselect",
                                                                                   id: "",                                                                                 
                                                                                   align: "left",
                                                                                   width: 150,
                                                                                   hidden: true,
                                                                                   on: {
                                                                                       "onChange": function () {
                                                                                       }
                                                                                   }
                                                                               },

                                                                           ]
                                                                       },



                                                                  //   {
                                                                  //       cols: [
                                                                  //{},
                                                                  // {},
                                                                  //       ]
                                                                  //   },
                                                                   //   {
                                                                   //       cols: [
                                                                   //{},
                                                                   // {},
                                                                   //       ]
                                                                   //   },
                                                                    //   {
                                                                    //       cols: [
                                                                    //{},
                                                                    // {},
                                                                    //       ]
                                                                    //   },
                                                               ]
                                                           },
                                                    ]
                                                },
                                        ]
                                    },
                ]
            }
        ]
    });
}
function fnAnalyHideShow()
{
    if($$("ChkGroup").getValue()=="1")
    {
        $$("ChkAna1").hide();
        $$("ChkAna2").hide();
        $$("ChkAna3").hide();
        $$("ChkAna4").hide();
        $$("ChkAna5").hide();
        $$("ChkAna6").hide();
        $$("ChkAna7").hide();
        $$("LblApplAnlysis").hide();
        $$("lblLvl").hide();
        $$("CbnAdd").hide();
        $$("ChkAna8").hide();
        $$("ChkAna9").hide();
        $$("ChkAna10").hide();

        $$("ChkAna1").setValue('0');
        $$("ChkAna2").setValue('0');
        $$("ChkAna3").setValue('0');
        $$("ChkAna4").setValue('0');
        $$("ChkAna5").setValue('0');
        $$("ChkAna6").setValue('0');
        $$("ChkAna7").setValue('0');                
        $$("CbnAdd").setValue('0');
        $$("ChkAna8").setValue('0');
        $$("ChkAna9").setValue('0');
        $$("ChkAna10").setValue('0');


    }
    else if ($$("ChkLedger").getValue() == "1") {      
        //$$("CbnAdd").show();
        if ($("#hdnAnaAppl").val() == "1") {

            var id = $$("TreeLedger").getSelectedId();
            var acId = id.substring(2, id.length);
            var obj = $$("TreeLedger").getItem(id);
            var AC_IND = obj.AC_IND == null ? "" : obj.AC_IND.toString().trim();

            $$("lblLvl").show();
            $$("LblApplAnlysis").show();
            $$("ChkAna1").show();
            $$("ChkAna2").show();
            $$("ChkAna3").show();
            $$("ChkAna4").show();
            $$("ChkAna5").show();
            $$("ChkAna6").show();
            $$("ChkAna7").show();
            if ($("#hdnMultilevel").val() == "0") {
                $$("ChkAna8").show();
                $$("ChkAna9").show();
                $$("ChkAna10").show();
            }

            if (acId.substring(0, 4) == "0003" || acId.substring(0, 4) == "0004" || acId.substring(0, 4) == "9000" || AC_IND == "E" || AC_IND == "I") {
                $$("ChkAna1").enable();
                $$("ChkAna2").enable();
                $$("ChkAna3").enable();
                $$("ChkAna4").enable();
                $$("ChkAna5").enable();
                $$("ChkAna6").enable();
                $$("ChkAna7").enable();
            }
            else {
                $$("ChkAna1").disable();
                $$("ChkAna2").disable();
                $$("ChkAna3").disable();
                $$("ChkAna4").disable();
                $$("ChkAna5").disable();
            }
        }

    }

  

}
function fnLoadProperty() {
    //debugger;
    var dataProp = fnPropertyLoad();
    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();
    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        labelwidth: 1,
        inputwidth: 180,
        width: 250,
        //value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                FormLoad();
                fnLoadGlAccTree();
                gridResize();
            }
        }
    });
}
function fnPropertyLoad() {
    //debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
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
webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    //debugger;
    var vWidth = $("#divform").width();
    $$("frmGLChartofAccounts").define("width", vWidth);
    $$("frmGLChartofAccounts").resize();


    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    var vWidth1 = window.innerWidth
                                  || document.documentElement.clientWidth
                                  || document.body.clientWidth;

    $$("frmGLChartofAccounts").define("height", vheight - 50);//100
    $$("frmGLChartofAccounts").resize();

    $$("TreeLedger").define("height", vheight - ($$('frmGLChartofAccounts').$view.offsetTop + $$('TreeLedger').$view.offsetTop + 20));
    $$("TreeLedger").resize();

    $$("FrmInput").define("height", vheight - ($$('frmGLChartofAccounts').$view.offsetTop + $$('TreeLedger').$view.offsetTop + 20));
    $$("FrmInput").resize();
    


}
function fnCallApplProp() {

    webix.ui({
        view: "window",
     //   close: true,
        modal: true,
        id: "PopupApplProp",
        head: "Applicable Properties",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdApplProp",
                    select: "row",
                    data: dtMultiComp,
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "", id: "CompId", hidden: true },
                            { header: "Properties", id: "CompNm", width: 230, css: { 'text-align': 'left ! important' } },
                            { header: ["Current", "Status"], id: "CurSts", tooltip: false, disabled: true, checkValue: "1", uncheckValue: "0", template: "{common.rcheckbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                            { header: ["Amend","Status"], id: "AmdSts", tooltip: false, checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                    ],
                    type: {
                        rcheckbox: function (obj, common, value, config) {
                            var checked = (value == config.checkValue) ? 'checked="true"' : '';
                            return "<input disabled class='webix_table_checkbox' type='checkbox' " + checked + ">";
                        }
                    },
                    on: {
                       
                    }



                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 230,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Save',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     fnGLCOASaveMst("1");
                                                     $$('PopupApplProp').hide();

                                                 }
                                             }
                                         },
                                          {
                                              view: 'button',
                                              label: 'Cancel',
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      fnGLCOASaveMst("");
                                                      $$('PopupApplProp').hide();

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

   
    $$("PopupApplProp").show();
}
function fnCallLedgerSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupLoadLedger",
        head: "Account Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,


            elements: [
                {
                    
                   
                      
                            view: "datatable",
                            id: "grdLedger",
                            select: "row",
                            data: [],
                            height: 350,
                            scroll: "y",
                            columns: [
                                    { header: "AC_ID", id: "AC_ID", hidden: true },
                                     { header: "AC_CD", id: "AC_CD", hidden: true },
                                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                                    { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                            ],
                            on: {
                                'onItemDblClick': function (id, e, node) {
                                    debugger;
                                  
                                    var selectedRows = this.getSelectedItem(id.row);
                                    var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                                    $("#hdnLedgerId").val($.trim(selectedRows[0].AC_ID));
                                    $$("TxtLedger").setValue(AcNm);

                                    var itemval = "L_" + $("#hdnLedgerId").val();
                                    $$("TreeLedger").select(itemval);
                                    webix.UIManager.setFocus($$("TreeLedger"));
                                    var AcId = $("#hdnLedgerId").val();
                                    AcId = AcId.substring(0, AcId.length - 4);
                                    $$("TreeLedger").closeAll();
                                    $$("TreeLedger").refresh();
                                    $$("TreeLedger").open("G_" + AcId, true);
                                    // $$("TreeLedger").moveSelection("top");
                                    //   $$("TreeLedger").move(itemval, 0);
                                    $$("TreeLedger").showItem(itemval);
                                    $$("TreeLedger").adjust();
                                    $$('PopupLoadLedger').hide();

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
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupLoadLedger').hide();

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

    fnLoadLedgerGrid();
    $$("PopupLoadLedger").show();
}
function fnLoadLedgerGrid() {
    //debugger;
    var rowDatad = [];

    var GrpIds = "";
    var InActLedger = $$("ChkInAct").getValue();
    Request = {
        REQTYPE: "GET_LEDGERLOAD",
        COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
        GROUP_ID: GrpIds,
        InActLedger: InActLedger,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("grdLedger").clearAll();
                $$("grdLedger").parse(rowDatad);
                $$("grdLedger").refresh();

            }
        }
    })

};
function fnLoadGlAccTree() {
   // debugger;
    var rowDatad = [];

    var GrpIds = "";
    Request = {
        REQTYPE: "GET_GLACCOUNTTREELOAD",
        COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
        GROUP_ID: GrpIds,
        COA: "1",
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                var data = JSON.parse(d);
                rowDatad = data.TBLFRMGRP;
                fnLoadTreeLedger(rowDatad);


            }
        }
    })
};
function fnLoadTreeLedger(rowDatad) {
    //debugger;
    var TreeArr = [];
    var TreeArr1 = [];
    var TreeArr2 = [];
    var TreeArr3 = [];
    var TreeArr4 = [];
    var TreeArr5 = [];
    var TreeArr6 = [];
    var TreeArr7 = [];
    var TreeArr8 = [];
    var TreeArr9 = [];
    var TreeArr10 = [];
    for (i = 0; i < rowDatad.length; i++) {
        if (rowDatad[i].AC_ID.trim() == "0000" || rowDatad[i].AC_ID.trim() == "9000" || rowDatad[i].AC_ID.trim() == "0001" || rowDatad[i].AC_ID.trim() == "0002" || rowDatad[i].AC_ID.trim() == "0003" || rowDatad[i].AC_ID.trim() == "0004" || rowDatad[i].AC_ID.trim() == "0005") {
            TreeArr2 = [];
            var test1 = {};
            test1['id'] = rowDatad[i].AC_CAT.trim() + "_" + rowDatad[i].AC_ID.trim();
            test1['value'] = rowDatad[i].AC_NM.trim();
            test1['RESERVE_IND'] = rowDatad[i].RESERVE_IND == null?"0": rowDatad[i].RESERVE_IND.toString().trim();
            test1['AC_CAT'] = rowDatad[i].AC_CAT == null ? "" : rowDatad[i].AC_CAT.toString().trim();
            test1['BILL_DETAIL_IND'] = rowDatad[i].BILL_DETAIL_IND == null ? "0" : rowDatad[i].BILL_DETAIL_IND.toString().trim();
            test1['AC_IND'] = rowDatad[i].AC_IND == null ? "" : rowDatad[i].AC_IND.toString().trim();
            test1['INT_APPL_IND'] = rowDatad[i].INT_APPL_IND == null ? "" : rowDatad[i].INT_APPL_IND.toString().trim();
            
            for (k = 0; k < rowDatad.length; k++) {
                if (rowDatad[k].AC_ID.length == 8 && rowDatad[k].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim()) {
                    TreeArr3 = [];
                    var test2 = {};
                    test2['id'] = rowDatad[k].AC_CAT.trim() + "_" + rowDatad[k].AC_ID.trim();
                    test2['value'] = rowDatad[k].AC_NM.trim();
                    test2['RESERVE_IND'] = rowDatad[k].RESERVE_IND == null ? "0" : rowDatad[k].RESERVE_IND.toString().trim();
                    test2['AC_CAT'] = rowDatad[k].AC_CAT == null ? "" : rowDatad[k].AC_CAT.toString().trim();
                    test2['BILL_DETAIL_IND'] = rowDatad[k].BILL_DETAIL_IND == null ? "0" : rowDatad[k].BILL_DETAIL_IND.toString().trim();
                    test2['AC_IND'] = rowDatad[k].AC_IND == null ? "" : rowDatad[k].AC_IND.toString().trim();
                    test2['INT_APPL_IND'] = rowDatad[k].INT_APPL_IND == null ? "" : rowDatad[k].INT_APPL_IND.toString().trim();
                    for (m = 0; m < rowDatad.length; m++) {
                        if (rowDatad[m].AC_ID.length == 12 && rowDatad[m].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[m].AC_ID.substring(0, rowDatad[m].AC_ID.length - 4) == rowDatad[k].AC_ID.trim()) {
                            var test3 = {};
                            test3['id'] = rowDatad[m].AC_CAT.trim() + "_" + rowDatad[m].AC_ID.trim();
                            test3['value'] = rowDatad[m].AC_NM.trim();
                            test3['RESERVE_IND'] = rowDatad[m].RESERVE_IND == null ? "0" : rowDatad[m].RESERVE_IND.toString().trim();
                            test3['AC_CAT'] = rowDatad[m].AC_CAT == null ? "" : rowDatad[m].AC_CAT.toString().trim();
                            test3['BILL_DETAIL_IND'] = rowDatad[m].BILL_DETAIL_IND == null ? "0" : rowDatad[m].BILL_DETAIL_IND.toString().trim();
                            test3['AC_IND'] = rowDatad[m].AC_IND == null ? "" : rowDatad[m].AC_IND.toString().trim();
                            test3['INT_APPL_IND'] = rowDatad[m].INT_APPL_IND == null ? "" : rowDatad[m].INT_APPL_IND.toString().trim();
                            for (n = 0; n < rowDatad.length; n++) {
                                if (rowDatad[n].AC_ID.length == 16 && rowDatad[n].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[n].AC_ID.substring(0, rowDatad[n].AC_ID.length - 4) == rowDatad[m].AC_ID.trim()) {
                                    var test4 = {};
                                    test4['id'] = rowDatad[n].AC_CAT.trim() + "_" + rowDatad[n].AC_ID.trim();
                                    test4['value'] = rowDatad[n].AC_NM.trim();
                                    test4['RESERVE_IND'] = rowDatad[n].RESERVE_IND == null ? "0" : rowDatad[n].RESERVE_IND.toString().trim();
                                    test4['AC_CAT'] = rowDatad[n].AC_CAT == null ? "" : rowDatad[n].AC_CAT.toString().trim();
                                    test4['AC_IND'] = rowDatad[n].AC_IND == null ? "" : rowDatad[n].AC_IND.toString().trim();
                                    test4['INT_APPL_IND'] = rowDatad[n].INT_APPL_IND == null ? "" : rowDatad[n].INT_APPL_IND.toString().trim();
                                    for (v = 0; v < rowDatad.length; v++) {
                                        if (rowDatad[v].AC_ID.length == 20 && rowDatad[v].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[v].AC_ID.substring(0, rowDatad[v].AC_ID.length - 4) == rowDatad[n].AC_ID.trim()) {
                                            var test5 = {};
                                            test5['id'] = rowDatad[v].AC_CAT.trim() + "_" + rowDatad[v].AC_ID.trim();
                                            test5['value'] = rowDatad[v].AC_NM.trim();
                                            test5['RESERVE_IND'] = rowDatad[v].RESERVE_IND == null ? "0" : rowDatad[v].RESERVE_IND.toString().trim();
                                            test5['AC_CAT'] = rowDatad[v].AC_CAT == null ? "" : rowDatad[v].AC_CAT.toString().trim();
                                            test5['BILL_DETAIL_IND'] = rowDatad[v].BILL_DETAIL_IND == null ? "0" : rowDatad[v].BILL_DETAIL_IND.toString().trim();
                                            test5['AC_IND'] = rowDatad[v].AC_IND == null ? "" : rowDatad[v].AC_IND.toString().trim();
                                            test5['INT_APPL_IND'] = rowDatad[v].INT_APPL_IND == null ? "" : rowDatad[v].INT_APPL_IND.toString().trim();
                                         
                                            //Start
                                            for (w = 0; w < rowDatad.length; w++) {
                                                if (rowDatad[w].AC_ID.length == 24 && rowDatad[w].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[w].AC_ID.substring(0, rowDatad[w].AC_ID.length - 4) == rowDatad[v].AC_ID.trim()) {
                                                    var test6 = {};
                                                    test6['id'] = rowDatad[w].AC_CAT.trim() + "_" + rowDatad[w].AC_ID.trim();
                                                    test6['value'] = rowDatad[w].AC_NM.trim();
                                                    test6['RESERVE_IND'] = rowDatad[w].RESERVE_IND == null ? "0" : rowDatad[w].RESERVE_IND.toString().trim();
                                                    test6['AC_CAT'] = rowDatad[w].AC_CAT == null ? "" : rowDatad[w].AC_CAT.toString().trim();
                                                    test6['BILL_DETAIL_IND'] = rowDatad[w].BILL_DETAIL_IND == null ? "0" : rowDatad[w].BILL_DETAIL_IND.toString().trim();
                                                    test6['AC_IND'] = rowDatad[w].AC_IND == null ? "" : rowDatad[w].AC_IND.toString().trim();
                                                    test6['INT_APPL_IND'] = rowDatad[w].INT_APPL_IND == null ? "" : rowDatad[w].INT_APPL_IND.toString().trim();
                                                  
                                                    for (x = 0; x < rowDatad.length; x++) {
                                                        if (rowDatad[x].AC_ID.length == 28 && rowDatad[x].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[x].AC_ID.substring(0, rowDatad[x].AC_ID.length - 4) == rowDatad[w].AC_ID.trim()) {
                                                            var test7 = {};
                                                            test7['id'] = rowDatad[x].AC_CAT.trim() + "_" + rowDatad[x].AC_ID.trim();
                                                            test7['value'] = rowDatad[x].AC_NM.trim();
                                                            test7['RESERVE_IND'] = rowDatad[x].RESERVE_IND == null ? "0" : rowDatad[x].RESERVE_IND.toString().trim();
                                                            test7['AC_CAT'] = rowDatad[x].AC_CAT == null ? "" : rowDatad[x].AC_CAT.toString().trim();
                                                            test7['BILL_DETAIL_IND'] = rowDatad[x].BILL_DETAIL_IND == null ? "0" : rowDatad[x].BILL_DETAIL_IND.toString().trim();
                                                            test7['AC_IND'] = rowDatad[x].AC_IND == null ? "" : rowDatad[x].AC_IND.toString().trim();
                                                            test7['INT_APPL_IND'] = rowDatad[x].INT_APPL_IND == null ? "" : rowDatad[x].INT_APPL_IND.toString().trim();
                                                            
                                                            for (y = 0; y < rowDatad.length; x++) {
                                                                if (rowDatad[y].AC_ID.length == 32 && rowDatad[y].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[y].AC_ID.substring(0, rowDatad[y].AC_ID.length - 4) == rowDatad[x].AC_ID.trim()) {
                                                                    var test8 = {};
                                                                    test8['id'] = rowDatad[y].AC_CAT.trim() + "_" + rowDatad[y].AC_ID.trim();
                                                                    test8['value'] = rowDatad[y].AC_NM.trim();
                                                                    test8['RESERVE_IND'] = rowDatad[y].RESERVE_IND == null ? "0" : rowDatad[y].RESERVE_IND.toString().trim();
                                                                    test8['AC_CAT'] = rowDatad[y].AC_CAT == null ? "" : rowDatad[y].AC_CAT.toString().trim();
                                                                    test8['BILL_DETAIL_IND'] = rowDatad[y].BILL_DETAIL_IND == null ? "0" : rowDatad[y].BILL_DETAIL_IND.toString().trim();
                                                                    test8['AC_IND'] = rowDatad[y].AC_IND == null ? "" : rowDatad[y].AC_IND.toString().trim();
                                                                    test8['INT_APPL_IND'] = rowDatad[y].INT_APPL_IND == null ? "" : rowDatad[y].INT_APPL_IND.toString().trim();
                                                                    

                                                            for (z = 0; z < rowDatad.length; z++) {
                                                                if (rowDatad[z].AC_ID.length == 36 && rowDatad[z].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[z].AC_ID.substring(0, rowDatad[z].AC_ID.length - 4) == rowDatad[y].AC_ID.trim()) {
                                                                    var test9 = {};
                                                                    test9['id'] = rowDatad[z].AC_CAT.trim() + "_" + rowDatad[z].AC_ID.trim();
                                                                    test9['value'] = rowDatad[z].AC_NM.trim();
                                                                    test9['RESERVE_IND'] = rowDatad[z].RESERVE_IND == null ? "0" : rowDatad[z].RESERVE_IND.toString().trim();
                                                                    test9['AC_CAT'] = rowDatad[z].AC_CAT == null ? "" : rowDatad[z].AC_CAT.toString().trim();
                                                                    test9['BILL_DETAIL_IND'] = rowDatad[z].BILL_DETAIL_IND == null ? "0" : rowDatad[z].BILL_DETAIL_IND.toString().trim();
                                                                    test9['AC_IND'] = rowDatad[z].AC_IND == null ? "" : rowDatad[z].AC_IND.toString().trim();
                                                                    test9['INT_APPL_IND'] = rowDatad[z].INT_APPL_IND == null ? "" : rowDatad[z].INT_APPL_IND.toString().trim();
                                                                  
                                                            for (b = 0; b < rowDatad.length; b++) {
                                                                if (rowDatad[b].AC_ID.length == 36 && rowDatad[b].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[b].AC_ID.substring(0, rowDatad[b].AC_ID.length - 4) == rowDatad[z].AC_ID.trim()) {
                                                                    var test10 = {};
                                                                    test10['id'] = rowDatad[b].AC_CAT.trim() + "_" + rowDatad[b].AC_ID.trim();
                                                                    test10['value'] = rowDatad[b].AC_NM.trim();
                                                                    test10['RESERVE_IND'] = rowDatad[b].RESERVE_IND == null ? "0" : rowDatad[b].RESERVE_IND.toString().trim();
                                                                    test10['AC_CAT'] = rowDatad[b].AC_CAT == null ? "" : rowDatad[b].AC_CAT.toString().trim();
                                                                    test10['BILL_DETAIL_IND'] = rowDatad[b].BILL_DETAIL_IND == null ? "0" : rowDatad[b].BILL_DETAIL_IND.toString().trim();
                                                                    test10['AC_IND'] = rowDatad[b].AC_IND == null ? "" : rowDatad[b].AC_IND.toString().trim();
                                                                    test10['INT_APPL_IND'] = rowDatad[b].INT_APPL_IND == null ? "" : rowDatad[b].INT_APPL_IND.toString().trim();
                                                                    TreeArr10.push(test10);
                                                                }
                                                            }
                                                            test9['data'] = TreeArr10;
                                                            TreeArr9.push(test9);
                                                            TreeArr10 = [];


                                                                }
                                                            }
                                                            test8['data'] = TreeArr9;
                                                            TreeArr8.push(test8);
                                                            TreeArr9 = [];

                                                                }
                                                            }

                                                            test7['data'] = TreeArr8;
                                                            TreeArr7.push(test7);
                                                            TreeArr8 = [];


                                                        }
                                                    }
                                                    test6['data'] = TreeArr7;
                                                    TreeArr6.push(test6);
                                                    TreeArr7 = [];




                                                }
                                            }
                                            test5['data'] = TreeArr6;
                                            TreeArr5.push(test5);
                                            TreeArr6 = [];

                                            //end




                                        }
                                    }
                                    test4['data'] = TreeArr5;
                                    TreeArr4.push(test4);
                                    TreeArr5 = [];
                                }
                            }
                            test3['data'] = TreeArr4;
                            TreeArr3.push(test3);
                            TreeArr4 = [];
                        }
                    }
                    test2['data'] = TreeArr3;
                    TreeArr2.push(test2);
                    TreeArr3 = [];
                }
            }
            test1['data'] = TreeArr2;
            TreeArr1.push(test1);
            TreeArr2 = [];
        }
    }
    $$('TreeLedger').clearAll();
    $$("TreeLedger").parse(TreeArr1);
    $$("TreeLedger").refresh();
    $$("TreeLedger").select($$("TreeLedger").getFirstId());
    webix.UIManager.setFocus($$("TreeLedger"));
    var itemval = $$("TreeLedger").getSelectedId();
    $$("TreeLedger").select(itemval);
}
function fnGlCOADefLoad() {
    //debugger;

    window.dtDiv = [];
    window.dtRefTy = [];
    window.dtTrnTy = [];
    window.dtCur = [];
    window.vDEFDt = "";
    window.C_DEF_DIV = "";
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLCOADEFLOAD";   
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                //debugger;
                $("#hdnAnaAppl").val(rowData.AnaAppl);
                $("#hdnMultilevel").val(rowData.TBLGLCONT[0].Multilevel);
                $("#hdnvZ6_Ind").val(rowData.TBLGLCONT[0].vZ6_Ind);
                $("#hdnIntComp").val(rowData.TBLGLCONT[0].IntComp_Ind);
                $("#hdnF1_IND").val(rowData.TBLMSTCOMP[0].F1_IND);
                $("#hdnNmLen").val(rowData.TBLMSTCOMP[0].NmLen);
                $("#hdnM_Tax").val(rowData.TBLMSTCOMP[0].M_Tax);
                $("#hdnBasCurId").val(rowData.TBLMSTCOMP[0].BASE_CURRENCY_ID);
                $("#VAL_DECIM_LIMIT").val(rowData.TBLMSTCOMP[0].VAL_DECIM_LIMIT);
                $("#CURRENCY_FORMAT").val(rowData.TBLMSTCOMP[0].CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(rowData.TBLMSTCOMP[0].CURRENCY_DELIMIT);


                $("#LedgCur").val(rowData.TBLGLCONT[0].E1_IND);
                $("#AC_CD_IND").val(rowData.TBLGLCONT[0].AC_CD_IND);
                $("#Y6_IND").val(rowData.TBLGLCONT[0].Y6_IND);
                $("#SUB_LEDG_CREATE_IND").val(rowData.TBLGLCONT[0].SUB_LEDG_CREATE_IND);
                $("#DefAnaAppl").val(rowData.TBLGLCONT[0].H6_IND);
                $("#DefAnaMand").val(rowData.TBLGLCONT[0].I6_IND);
                $("#MISAppl").val(rowData.TBLGLCONT[0].K6_IND)
                $("#MULTI_CURRENCY_IND").val(rowData.TBLGLCONT[0].MULTI_CURRENCY_IND);
                $("#H1_IND").val(rowData.TBLGLCONT[0].H1_IND);
                $("#DIV_APPL_IND").val(rowData.TBLGLCONT[0].DIV_APPL_IND);
                $("#A6_IND").val(rowData.TBLGLCONT[0].A6_IND);
                $("#H_IND").val(rowData.TBLGLCONT[0].H_IND);
                $("#D_IND").val(rowData.TBLGLCONT[0].D_IND);

                window.dtDiv = rowData.dtDiv;
                window.dtRefTy = rowData.dtRefTy;
                window.dtTrnTy = rowData.dtTrnTy;
                window.dtCur = rowData.dtCur;
                window.vDEFDt = rowData.vDEFDt;
                window.C_DEF_DIV = rowData.C_DEF_DIV;
                if (rowData.TBLMULTICOMP.length > 0) dtMultiComp = rowData.TBLMULTICOMP;
                window.MulCmpInd =rowData.MulCmpInd;
            }
        },
    });
    return rowData;
}
function fnClearValue ()
{
    $$("TxtLedgerNm").setValue("");
    $$("TxtAlias").setValue("");
    //$$("FrmInput").blockEvent();
    //$$('FrmInput').queryView(Boolean, 'all').forEach(v => v.blockEvent());
    
    //debugger;
    $$("ChkGroup").blockEvent();    
    $$("ChkLedger").blockEvent();
    
    $$("FrmInput").clear();
    $$("ChkGroup").unblockEvent();
    $$("ChkLedger").unblockEvent();
    
    
}
function fnGLCOASave() {
    debugger;
    if (!fnGlCOASaveValidate()) {
        return false;
    }

    if (window.MulCmpInd == "1") {
        fnCallApplProp();
    }
    else fnGLCOASaveMst("");

   

}
function fnGLCOASaveMst(ChkApplPpt)
{
    var dataparam = {};
    var acCat = $$("ChkGroup").getValue() == "1" ? "G" : "L";
    var grossPL = $$("ChkGroup").getValue();
    var AccId = $$("TreeLedger").getSelectedId();
    var OrgAccId = AccId.substring(2, AccId.length);
    var reserveInd = "0";
    var AccCdVis = $$("TxtAccCode").isVisible() == true ? "1" : "0";
    var AccCdEnable = $$("TxtAccCode").isEnabled() == true ? "1" : "0";

    var acTyApplInd = "";
    if ($$("ChkPartyLink").isVisible() == true && $$("ChkPartyLink").getValue() == "1") acTyApplInd = "1";
    else acTyApplInd = "0";

    var obj = $$("TreeLedger").getItem(AccId);
    if ($("#hdnCurMode").val() == "O") reserveInd = obj.RESERVE_IND == undefined || obj.RESERVE_IND == null ? "0" : obj.RESERVE_IND;

    var bankRecApplInd = $$("ChkBkReqd").getValue() == null ? "0" : $$("ChkBkReqd").getValue();
    var costApplInd = "0";// chkAccMulAna.Checked == true ? "1" : "0";

    var intApplInd = 0;
    intApplInd = $$("ChkActGrp").getValue();
    //if ($("#hdnCurMode").val() == "N") intApplInd = 0;
    var chkBook = $$("ChkBookAppl").getValue() == null ? "0" : $$("ChkBookAppl").getValue();

    var chkGP = "";
    var chkGPVis = "";
    if ($$("ChkGrsProfit").isVisible() == true) chkGPVis = "1";
    else chkGPVis = "0";

    chkGP = $$("ChkGrsProfit").getValue();

    var chkGPeble = $$("ChkGrsProfit").isEnabled() == true ? "1" : "0";

    var billDetVsl = "";
    if ($$("ChkBillDet").isVisible() == true) billDetVsl = "1"; else billDetVsl = "0";

    var billDetEnable = "";
    if ($$("ChkBillDet").isEnabled() == true) billDetEnable = "1"; else billDetEnable = "0";

    var billVchVisble = "";
    if ($$("CbnBillVouch").isVisible() == true) billVchVisble = "1"; else billVchVisble = "0";

    var bankRectVisible = "";
    if ($$("ChkBkReqd").isVisible() == true) bankRectVisible = "1"; else bankRectVisible = "0";


    var billDet = "";
    if ($$("ChkBillDet").isVisible() == true && $$("ChkBillDet").getValue() == "1")
        billDet = "1";
    else
        billDet = "0";

    var RptSeqVis = "";
    if ($$("TxtRepSeq").isVisible() == true) RptSeqVis == "1";

    var vCurrMode = "";

    if ($("#hdnCurMode").val() == "N") vCurrMode = "NEW";
    else if ($("#hdnCurMode").val() == "O") vCurrMode = "OPEN";

    if (vCurrMode == "") return false;

    if ($$("CbnBillVouch").isVisible() == true) {
        $.each(window.dtBillDet, function (key, sVal) {
            debugger;
            $.each(sVal, function (key, value) {
                if (value != null && value != undefined) sVal[key] = value.toString();
                else sVal[key] = "";
            });
        });
    }

    if (ChkApplPpt == "1")
    {
        var grdApplProp = $$("grdApplProp").serialize();
        $.each(grdApplProp, function (key, sVal) {
            $.each(sVal, function (key, value) {
                if (value != null && value != undefined) value.toString();
            });
        });
        dataparam["TBLAPPLPROP"] = grdApplProp;
    }
    

    $$("TxtOpen").setValue(acCat.toString().trim() == "G" ? "0" : $$("TxtOpen").getValue());

    dataparam["REQTYPE"] = "GET_GLCOASAVE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["J1_IND"] = window.MulCmpInd;
    dataparam["ACID"] = OrgAccId;
    dataparam["DRTRNAMT"] = "0";
    dataparam["CRTRNAMT"] = "0";
    dataparam["ACNM"] = $$("TxtLedgerNm").getValue();
    dataparam["ALIASNM"] = $$("TxtAlias").getValue();
    dataparam["ACCAT"] = acCat;
    dataparam["GROSSPL"] = grossPL;
    dataparam["OPENAMT"] = $$("TxtOpen").getValue();
    dataparam["DIVID"] = "";
    dataparam["CURID"] = $("#hdnBasCurId").val();
    dataparam["CONVRT"] = "1";
    dataparam["FAMT"] = "";
    dataparam["SEQINDX"] = $$("TxtRepSeq").getValue();

    dataparam["CHKGRPDISP"] = $$("ChkGrpDisp").getValue();
    dataparam["GRPDISPNO"] = $$("TxtGrpDisp").getValue();


    dataparam["BILLDET"] = billDet;
    dataparam["RESERVEIND"] = reserveInd;
    dataparam["ACTYAPPLIND"] = acTyApplInd;
    dataparam["ACCD"] = $.trim($$("TxtAccCode").getValue()).replace(/&/g, '');
    dataparam["ACCD_VIS"] = AccCdVis;
    dataparam["ACCD_ENB"] = AccCdEnable;
    dataparam["SUB_LEDG_CREATE_IND"] = $("#SUB_LEDG_CREATE_IND").val();
    dataparam["CONTROLACIND"] = $$("ChkControlInd").getValue();
    dataparam["CHKCONTROL"] = $$("ChkControl").getValue();
    dataparam["ACTY"] = $$("ddlPartyMaster").getValue();
    dataparam["BANKRECAPPLIND"] = bankRecApplInd;
    dataparam["CHKLEDGER"] = $$("ChkLedger").getValue();
    dataparam["CHKGROUP"] = $$("ChkGroup").getValue();
    dataparam["BOOKNM"] = $$("TxtBookNm").getValue();
    dataparam["COSTAPPLIND"] = costApplInd;
    dataparam["INTAPPLIND"] = intApplInd;
    dataparam["CDLEVL1"] = $$("ChkAna1").getValue() == null ? "0" : $$("ChkAna1").getValue();
    dataparam["CDLEVL2"] = $$("ChkAna2").getValue() == null ? "0" : $$("ChkAna2").getValue();
    dataparam["CDLEVL3"] = $$("ChkAna3").getValue() == null ? "0" : $$("ChkAna3").getValue();
    dataparam["CDLEVL4"] = $$("ChkAna4").getValue() == null ? "0" : $$("ChkAna4").getValue();
    dataparam["CDLEVL5"] = $$("ChkAna5").getValue() == null ? "0" : $$("ChkAna5").getValue();
    dataparam["CDLEVL6"] = $$("ChkAna6").getValue() == null ? "0" : $$("ChkAna6").getValue();
    dataparam["CDLEVL7"] = $$("ChkAna7").getValue() == null ? "0" : $$("ChkAna7").getValue();
    dataparam["CDLEVL8"] = $$("ChkAna8").getValue() == null ? "0" : $$("ChkAna8").getValue();
    dataparam["CDLEVL9"] = $$("ChkAna9").getValue() == null ? "0" : $$("ChkAna9").getValue();
    dataparam["CDLEVL10"] = $$("ChkAna10").getValue() == null ? "0" : $$("ChkAna10").getValue();

    dataparam["MTAXIND"] = $("#hdnM_Tax").val() == null ? "0" : $("#hdnM_Tax").val();
    dataparam["CAPUR"] = $$("ChkCapitPur").getValue();
    dataparam["DRCRIND"] = "";
    dataparam["VZ6IND"] = $("#hdnvZ6_Ind").val() == null ? "0" : $("#hdnvZ6_Ind").val();
    dataparam["COSTID"] = "";
    dataparam["MODE"] = vCurrMode;
    dataparam["CHKBOOK"] = chkBook;
    dataparam["DRCRTEXT"] = $$("LblDrCr").getValue();
    dataparam["CDIVAPPL"] = "0";
    dataparam["CHKACCEPT"] = $$("chkSpec").getValue() == null ? "0" : $$("chkSpec").getValue();
    dataparam["CHKGPVISIBLE"] = chkGPVis;
    dataparam["CHKGP"] = chkGP;
    dataparam["CHKGPENABLE"] = chkGPeble;
    dataparam["CHKBILLDET"] = billDet;
    dataparam["CHKBILLDETVIS"] = billDetVsl;
    dataparam["CHKBILLDETENABLE"] = billDetEnable;
    dataparam["BILLVOUCHVISIBLE"] = billVchVisble;
    dataparam["BILLVOUCHMODYFY"] = window.BillVouchMod;
    dataparam["RPTSEQVISIBLE"] = RptSeqVis;
    dataparam["BANKRECONVISIBLE"] = bankRectVisible;
    dataparam["BANKRECON"] = bankRecApplInd;
    dataparam["F1IND"] = $("#hdnF1_IND").val();
    dataparam["BASECURID"] = $("#hdnBasCurId").val();
    dataparam["POPENAMT"] = window.OpenAmt;
    dataparam["MISCOSTCODE"] = "";
    dataparam["MISCOSTCODE"] = "";
    dataparam["MISCOSTID"] = "";
    dataparam["TBLHIDDENBILL"] = window.dtBillDet;
   
   
    
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $("#LoadDIv").show();

    setTimeout(function () {
        $.ajax({
            async: false,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                //debugger;
                if (d != "") {
                    rowData = JSON.parse(d);
                    //debugger;
                    if (rowData.RETURN == "1") {
                        AlertMessage(rowData.MESSAGE);
                        fnRefresh(acCat + "_" + rowData.ACC_ID);
                    }
                    else {
                        AlertMessage(rowData.MESSAGE);
                    }

                    $("#LoadDIv").hide();

                }
            },
            complete: function () {
                $("#LoadDIv").hide();
            },
            error: function (err) {
                $("#LoadDIv").hide();
            }
        });
    }, 0);
}
function fnGlCOASaveValidate()
{

    var id = $$("TreeLedger").getSelectedId();
    var acId = id.substring(2, id.length);   
    var rowData = fnGetGlAccountDet(acId);
    var dtGLAcc = [];
    var ChkSCorSD = "0";
    var ac_ty_appl_ind = "0";

    if (rowData != null && rowData != "") {
        dtGLAcc = rowData.dtGlAc;
        ChkSCorSD = rowData.CheckSDorSC == null ? "0" : rowData.CheckSDorSC.toString().trim();
        ac_ty_appl_ind = dtGLAcc[0]["AC_TY_APPL_IND"] == null || dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim();
    }


    if ($$("ChkGroup").getValue() == "0" && $$("ChkLedger").getValue() == "0" ) {
        AlertMessage("Select Group Or ledger !");
        return false;
    }
    if ($$("TxtLedgerNm").getValue() == null || $$("TxtLedgerNm").getValue().toString().trim() == "")
    {
        if ($$("ChkGroup").getValue() == "1") AlertMessage("Group Name Cannot be empty !");
        else AlertMessage("Ledger Name Cannot be empty !");
        return false;
    }
    if ($$("TxtAlias").getValue() == null || $$("TxtAlias").getValue().toString().trim() == "") {
        AlertMessage("Alias Name Cannot be empty !");
        return false;
    }
    //if ($("#hdnPartyMasterShow")!=undefined )    
    if ($$("ddlPartyMaster").isVisible() == true)
    {
        if($$("ddlPartyMaster").getValue() == "")
        {
            AlertMessage( "Select Account Type");
            return false;
        }
    }
    var L_AC_ID = $$("TreeLedger").getSelectedId();
    if ((L_AC_ID.substring(2, 6) == "0003" || L_AC_ID.substring(2, 6) == "0004") &&  $$("ChkLedger").getValue()=="1")
    {
        if( $("#hdnAnaAppl").val()=="1")
        {
            if ($$("ChkAna1").getValue() == "0")
            {
                AlertMessage("Please Select Level1 Analysis");
                return false;
            }
        }
    }
  
    var PartyGenInd = "0";

    if ($("#SUB_LEDG_CREATE_IND") == "2") {
        if ($$("TxtAccCode").isVisible() == true) {
            var acId1 = acId.substring(0, (acId1.length - 4));
            if (acId1 != "") {
                var rowData1 = fnGetGlAccountDet(acId1);
                var dtGLAcc1 = [];
                var ac_ty_appl_ind1 = "0";

                if (rowData1 != null && rowData1 != "") {
                    dtGLAcc1 = rowData.dtGlAc;
                    ac_ty_appl_ind1 = dtGLAcc[0]["AC_TY_APPL_IND"] == null || dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim();
                }
                if (ac_ty_appl_ind1 == "1") {
                    var AcTy = dtGLAcc1[0]["AC_TY"].toString().trim();
                    var PartyGenInd = fnGetPartyGenInd(AcTy);
                    if (PartyGenInd == "0" && ChkSCorSD == "0" && $$("TxtAccCode").getValue() == "") {
                        AlertMessage("Account Code cannot be empty");
                        return false;
                    }
                }
            }
        }
    }
     
    if ($$("TxtAccCode").isVisible() == true && PartyGenInd == "0" && $("#AC_CD_IND").val() == "1") {
        if (($$("TxtAccCode").getValue() == null || $$("TxtAccCode").getValue().toString().trim() == "") && $$("ChkGroup").getValue() == "0") {
            AlertMessage("Account Code cannot be empty");
            return false;
        }
    }
    
    
    if ($$("ChkBookAppl").getValue() == "1") {
        if ($$("TxtBookNm").getValue() == null || $$("TxtBookNm").getValue().toString().trim() == "") {
            AlertMessage("Book Name Cannot be empty !");
            return false;
        }
    }


    if ($$("TxtRepSeq").isVisible() == true && $$("TxtRepSeq").isEnabled() == true ) {
        if ( ($$("TxtRepSeq").getValue() == null || $$("TxtRepSeq").getValue().toString().trim() == "") && $$("ChkGroup").getValue() == "1") {
            AlertMessage("Report Sequence No cannot be empty");
            return false;
        }
    }

    if ($$("ChkGrpDisp").getValue() == "1") {
        if ($$("TxtGrpDisp").isVisible() == true && $$("ChkGrpDisp").isEnabled() == true) {
            if ($$("TxtGrpDisp").getValue() == null || $$("TxtGrpDisp").getValue().toString().trim() == "") {
                AlertMessage("Group Display Sequence No cannot be empty");
                return false;
            }
            else if ($$("TxtGrpDisp").getValue().length < 4) {
                AlertMessage("Group Display Sequence No. length should be 4");
                return false;
            }
        }
    }
    var openAmt = $$("TxtOpen").getValue() == "" ? 0 : parseFloat($$("TxtOpen").getValue());
    if ($$("CbnBillVouch").isVisible() == true) {
        if (openAmt == 0) window.dtBillDet.length = 0;
       
        var bTotal = 0;
        if (window.dtBillDet) {
            for (var i = 0; i < window.dtBillDet.length; i++) {
                var vDrCrInd = window.dtBillDet[i]["DRCR_IND"].toString().trim();
                var vRefTyID = window.dtBillDet[i]["REF_TY_ID"].toString().trim();
                var vRefNm = window.dtBillDet[i]["REF_NM"].toString().trim();
                var vDueDt = window.dtBillDet[i]["DUE_DT"].toString().trim();
                var vVouchNo = window.dtBillDet[i]["VOUCH_NO"].toString().trim();
                var vVchDt = window.dtBillDet[i]["VOUCH_DT"].toString().trim();
                var vAmt = window.dtBillDet[i]["AMT"] == null || window.dtBillDet[i]["AMT"].toString().trim() == "" ? 0 : parseFloat(window.dtBillDet[i]["AMT"].toString().trim());
                var vTrnTyId = window.dtBillDet[i]["TRN_TY_ID"].toString().trim();

                if (window.dtBillDet.length == 1) {
                    if (vRefTyID.length == 0 && vRefNm.length == 0 && vVouchNo.length == 0 && vAmt.length == 0) {
                        break;
                    }
                    else {
                        if (vRefNm.length == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                        if (vDueDt.length == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                        if (vAmt.length == 0 || vAmt == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                        if (vVouchNo.length == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                        if (vVchDt.length == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                        if (vTrnTyId.length == 0) {
                            AlertMessage("Bill Voucher Detail is not Updated");
                            return false;
                        }
                    }
                }
                else {
                    if (vRefTyID.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vRefNm.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vDueDt.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vAmt.length == 0 || vAmt == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vVouchNo.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vVchDt.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                    if (vTrnTyId.length == 0) {
                        AlertMessage("Bill Voucher Detail is not Updated");
                        return false;
                    }
                }
                if (vDrCrInd == "1") bTotal += parseFloat(fnAmtFormat(vAmt, $("#VAL_DECIM_LIMIT").val()));
                else bTotal -= parseFloat(fnAmtFormat(vAmt, $("#VAL_DECIM_LIMIT").val()));
            }
           
        }
        //end loop
      
        if ($$("LblDrCr").getValue() == "Dr") {
            if ((parseFloat(bTotal) - parseFloat(openAmt)) != 0) {                
                webix.UIManager.setFocus($$("CbnBillVouch"));
                AlertMessage("Bill Voucher Detail is not Updated");
                return false;
            }
        }
        else {
            if ((parseFloat(bTotal) + parseFloat(openAmt)) != 0) {
                webix.UIManager.setFocus($$("CbnBillVouch"));
                AlertMessage("Bill Voucher Detail is not Updated");
                return false;
            }
        }
    }
//end
    return true;
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
};

function fnDuplicateAccCdCheck(AcCd) {    
    Request = {
        REQTYPE: "GET_FNDUPLICATEACCCDCHECK",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACCD: AcCd,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $("#LoadDIv").show();
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                //debugger;
                if (rowData == "Error" || rowData.length == 0) {
                    AlertMessage("Account Code is not Duplicate");
                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    fnShowDupAcCdShow(rowData);
                    $("#LoadDIv").hide();
                }
                
                
            }
        },
    });

}
function fnShowDupAcCdShow(Data) {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "DupAcCd",
        head: "Account Codes",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 380,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridRtTy",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                           { id: "AC_CD", header: ['A/C Code', { content: "textFilter", }], width: 80 },
                           { id: "AC_ALT_NM", header: ['Account Name', { content: "textFilter", }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                           { id: "AC_ID", hidden: true },
                   ],
                   data: Data,
                   on: {

                       'onItemDblClick': function (id) {
                           //debugger;

                           $$("DupAcCd").hide();

                       },
                       'onBeforeFilter': function () {
                       },
                       'onAfterFilter': function () {
                       }

                   },

               }],
        }
    }).show();

};

function fnGetGlAccountDet(AcId) {
    Request = {
        REQTYPE: "GET_FNGETCOAOPENDETAILS",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
        Y6_IND: $("#Y6_IND").val(),
        Mode: $("#hdnCurMode").val(),
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                debugger;
                if (rowData.TBLMULTICOMP.length>0) dtMultiComp = rowData.TBLMULTICOMP;
               
            }
        },
    });

    return rowData;
};

function fnSelectSCorSD(AcId) {
    Request = {
        REQTYPE: "GET_FNGETCHECKSDORSC",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $("#LoadDIv").show();
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#LoadDIv").hide();
            }
        },
    });

    return rowData;
};
function fnTreeSelectedChange() {

    debugger;
    var id = $$("TreeLedger").getSelectedId();
    var acId = id.substring(2, id.length);
    $$("ChkGroup").blockEvent();
    $$("ChkGroup").setValue("0");
    $$("ChkGroup").unblockEvent();
    $$("ChkLedger").blockEvent();
    $$("ChkLedger").setValue("0");
    $$("ChkLedger").unblockEvent();
    window.BillVouchMod = "0";
    window.dtBillDet = [];
    window.OpenAmt = "0";

    var obj = $$("TreeLedger").getItem(id);

    $$("ChkGrsProfit").disable();
    $$("ChkGrsProfit").setValue("0");

    if ($("#hdnF1_IND").val() == "0") {
        $$("ChkControl").enable();
    }

    $$("ChkGroup").enable();
    $$("ChkLedger").enable();
    $("#btnDel").prop('disabled', false);
    var mid = "";
    var mid2 = "";
    var bGL = false;
    if (id.length > 2) {

        mid = id.substring(0, 1);
        mid2 = obj.RESERVE_IND == null ? "0" : obj.RESERVE_IND.toString().trim();
        if (mid == "G") {
            bGL = true;
            $$("ChkGroup").setValue("1")
        }
        else {
            bGL = false;
            $$("ChkLedger").setValue("1")
        }
        
    }
    $$("TxtAccCode").setValue('');
    if (mid2 == "1") {
        $$("TempRes").define("template", "<span style='color : red;font-weight:bold'>RESERVED</span>");
        $$("TempRes").refresh();
        if (bGL == true) {
            var ChCount = obj.$count == null ? "0" : obj.$count;
            if (parseFloat(ChCount) == 0) $("#btnDel").prop('disabled', false);
            else $("#btnDel").prop('disabled', true);

        }
    }
    else {
        $$("TempRes").define("template", "");
        $$("TempRes").refresh();
        if (bGL == true) {
            var ChCount = obj.$count == null ? "0" : obj.$count;
            if (parseFloat(ChCount) > 0) {
                $("#btnDel").prop('disabled', true);
                $$("ChkGroup").disable();
                $$("ChkLedger").disable();
            }
            else {
                $("#btnDel").prop('disabled', false);
                $$("ChkGroup").enable();
                $$("ChkLedger").enable();
            }
        }
    }
    var rowData = fnGetGlAccountDet(acId);
    var dtGLAcc = [];
    var ChkSCorSD = "0";
    var CheckBillAppl = "0";
    window.CrDys = 0;

    if (rowData != null && rowData != "") {
        dtGLAcc = rowData.dtGlAc;
        ChkSCorSD = rowData.CheckSDorSC == null ? "0" : rowData.CheckSDorSC.toString().trim();
        CheckBillAppl = rowData.CheckBillAppl == null ? "0" : rowData.CheckBillAppl.toString().trim();
        window.CrDys = rowData.CrDys;
    }

    if (dtGLAcc.length > 0) {

        if (dtGLAcc[0]["AC_ALT_NM"] != null) $$("TxtAlias").setValue(dtGLAcc[0]["AC_ALT_NM"].toString().trim());


        var CONTROL_AC_IND = "0";
        if (dtGLAcc[0]["CONTROL_AC_IND"] != null && dtGLAcc[0]["CONTROL_AC_IND"].toString().trim() != "") {
            //if (dtGLAcc[0]["CONTROL_AC_IND"].toString().trim() == "1" || dtGLAcc[0]["CONTROL_AC_IND"].toString().trim() == "2") CONTROL_AC_IND = "1";
            CONTROL_AC_IND = dtGLAcc[0]["CONTROL_AC_IND"].toString().trim();
        }      


        //if (acId.length == 4)
        //    lblLevel.Text = "Level: PRIMARY";
        //else
        //    lblLevel.Text = "Level: " + acId.length / 4;


        //if (cDivAppl == 0)
        //    chkSpec.Checked = false;//chkAccept in vb

        //if (cDivAppl == 1 && bGL == false)
        //{
        //    if (!(string.IsNullOrEmpty(dtGLAcc.Rows[0]["DIV_ID"].ToString())))
        //    {
        //        chkSpec.Checked = true;
        //        ddlDiv.SelectedIndex = ddlDiv.Items.IndexOf(ddlDiv.Items.FindByValue(dtGLAcc.Rows[0]["DIV_ID"].toString().trim()));
        //    }
        //    else
        //        chkSpec.Checked = false;
        //}

        $$("ChkAna1").setValue(dtGLAcc[0]["A_IND"] == null || dtGLAcc[0]["A_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["A_IND"].toString().trim());
        $$("ChkAna2").setValue(dtGLAcc[0]["B_IND"] == null || dtGLAcc[0]["B_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["B_IND"].toString().trim());
        $$("ChkAna3").setValue(dtGLAcc[0]["C_IND"] == null || dtGLAcc[0]["C_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["C_IND"].toString().trim());
        $$("ChkAna4").setValue(dtGLAcc[0]["D_IND"] == null || dtGLAcc[0]["D_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["D_IND"].toString().trim());
        $$("ChkAna5").setValue(dtGLAcc[0]["E_IND"] == null || dtGLAcc[0]["E_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["E_IND"].toString().trim());
        $$("ChkAna6").setValue(dtGLAcc[0]["F_IND"] == null || dtGLAcc[0]["F_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["F_IND"].toString().trim());
        $$("ChkAna7").setValue(dtGLAcc[0]["L_IND"] == null || dtGLAcc[0]["L_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["L_IND"].toString().trim());
        $$("ChkAna8").setValue(dtGLAcc[0]["M_IND"] == null || dtGLAcc[0]["M_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["M_IND"].toString().trim());
        $$("ChkAna9").setValue(dtGLAcc[0]["N_IND"] == null || dtGLAcc[0]["N_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["N_IND"].toString().trim());
        $$("ChkAna10").setValue(dtGLAcc[0]["O_IND"] == null || dtGLAcc[0]["O_IND"].toString().trim() == "" ? "0" : dtGLAcc[0]["O_IND"].toString().trim());
        //txtMISCode.Text = "";            
        var oCurId = "";
        var fAmt = 0;
        var convRt = 0;
        oCurId = dtGLAcc[0]["C_I"] == null ? "" : dtGLAcc[0]["C_I"].toString();
        fAmt = parseFloat(dtGLAcc["F_A"] == null ? "0" : dtGLAcc["F_A"].toString());
        convRt = parseFloat(dtGLAcc["C_A"] == null ? "0" : dtGLAcc["C_A"].toString());

        if (oCurId != "") $$("btnForn").define("css", { "background-color": "yellow !important" });
        else $$("btnForn").define("css", { "background-color": "brown !important" });
        $$("btnForn").refresh();

        if (dtGLAcc[0]["AC_TY"] != null && dtGLAcc[0]["AC_TY"].toString().trim() != "") {
            $$("ddlPartyMaster").setValue(dtGLAcc[0]["AC_TY"].toString().trim());
        }
        else $$("ddlPartyMaster").setValue('');

        if ($$("ChkPartyLink").isVisible() == true) {
            if (dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim() != "") {
                $$("ChkPartyLink").setValue(dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim());
            }
            else
                $$("ChkPartyLink").setValue('1');

        }

        
        if (bGL == false) {
            if (dtGLAcc[0]["INT_APPL_IND"] == null || dtGLAcc[0]["INT_APPL_IND"].toString().trim() == "") $$("ChkActGrp").setValue('1');
            else $$("ChkActGrp").setValue('0');
            $$("ChkActGrp").define("labelRight", "Active Ledger");
            $$("ChkActGrp").refresh();

        }
        else {
            if (dtGLAcc[0]["INT_APPL_IND"] == null || dtGLAcc[0]["INT_APPL_IND"].toString().trim() == "") $$("ChkActGrp").setValue('1');
            else $$("ChkActGrp").setValue('0');

            $$("ChkActGrp").define("labelRight", "Active Group");
            $$("ChkActGrp").refresh();
        }
        var strCat = dtGLAcc[0]["AC_CAT"] == null ? "" : dtGLAcc[0]["AC_CAT"].toString().trim();
        if (acId.length == 4) {
            $$("ChkBookAppl").setValue('0');
            $$("ChkBookAppl").hide();
        }
        else if (strCat == "G") {
            $$("ChkBookAppl").setValue('1');
            $$("ChkBookAppl").show();
        }


        if (dtGLAcc[0]["BOOK_NM"] != null && dtGLAcc[0]["BOOK_NM"].toString().trim() != "" && dtGLAcc[0]["BOOK_NM"].toString().trim() != "0") {
            $$("ChkBookAppl").setValue('1');
            $$("TxtBookNm").setValue(dtGLAcc[0]["BOOK_NM"].toString().trim());
        }
        else {
            $$("ChkBookAppl").setValue('0');
            $$("TxtBookNm").setValue('');
        }
        var pOpenAmt = 0;
        if (bGL == false) {
            $$("CbnBillVouch").hide();
            if (dtGLAcc[0]["OPEN_AMT"] != null && dtGLAcc[0]["OPEN_AMT"].toString().trim() != "") {
                var pOpenAmt = parseFloat(dtGLAcc[0]["OPEN_AMT"] == null || dtGLAcc[0]["OPEN_AMT"].toString().trim() == "" ? "0" : dtGLAcc[0]["OPEN_AMT"].toString().trim());
                var sopenAmt = pOpenAmt;
                $$("TxtOpen").setValue(Math.abs(sopenAmt));
                var sopenAmtCalc = (sopenAmt);
                var dblDrAmt = 0;
                var dblCrAmt = 0;
                if (pOpenAmt < 0)
                    $$("LblDrCr").setValue("Cr");
                else
                    $$("LblDrCr").setValue("Dr");

                window.OpenAmt = Math.abs(pOpenAmt);

                //if ($$("LblDrCr").getValue() == "Dr") {
                //    $$("TxtDr").setValue(sopenAmtCalc.toString().trim() + " Dr");
                //    $$("TxtCr").setValue("0");
                //    dblDrAmt = sopenAmtCalc;
                //}
                //else {
                //    if (sopenAmtCalc < 0) $$("TxtCr").setValue((sopenAmtCalc * -1).toString().trim() + " Cr");
                //    else $$("TxtCr").setValue(sopenAmtCalc.toString().trim() + " Cr");
                //    $$("TxtDr").setValue("0");
                //    dblCrAmt = sopenAmtCalc;
                //}
                ////added new 
                //var tot = dblDrAmt + dblCrAmt;
                //if (tot > 0) $$("TxtDiff").setValue(tot.toString().trim() + "Dr");
                //else if (tot < 0) $$("TxtDiff").setValue((tot * -1).toString().trim() + "Dr");
                //else $$("TxtDiff").setValue(tot.toString());
            }
            else {
                $$("TxtOpen").setValue('0');
                pOpenAmt = 0;
            }

            //if (chkBillDet.Checked == true)
            //{
            //    btnBillVouch.Visible = true;
            //    btnBillVouch.Enabled = true;
            //    btnF.Visible = false;
            //}
        }
        else {
            $$("CbnBillVouch").hide();
            if ($$("ChkLedger").getValue() == "1" && $("#MULTI_CURRENCY_IND").val() == "1")
                $$("btnForn").show();
            else
                $$("btnForn").hide();
            pOpenAmt = 0;
        }
        $$("TxtAccCode").setValue(dtGLAcc[0]["AC_CD"] == null ? "" : dtGLAcc[0]["AC_CD"].toString().trim());

        if (CONTROL_AC_IND == "1" || CONTROL_AC_IND == "2")
            $$("ChkControlInd").setValue("1");
        else
            $$("ChkControlInd").setValue("0");

        if (bGL == true) {
            $$("ChkControlInd").setValue(CONTROL_AC_IND == "1" || CONTROL_AC_IND == "2" ?"1":"0");
            if (CONTROL_AC_IND == "1") {
                $$("ChkControl").setValue(1);
            }
            else
                $$("ChkControl").setValue('0');
        }
        else {
            if (dtGLAcc[0]["AC_TY"] != null && dtGLAcc[0]["AC_TY"].toString().trim() != "") $$("ddlPartyMaster").setValue(dtGLAcc[0]["AC_TY"].toString().trim());
            else $$("ddlPartyMaster").setValue('');
        }


        if (acId.substring(0, 4) == "9000"){
            $$("TxtOpen").disable();
            $$("btnForn").disable();
            $$("CbnDiv").disable();
            $$("LblDrCr").disable();
        }
        else{
            $$("TxtOpen").enable();
            $$("LblDrCr").enable();
            $$("btnForn").enable();
            $$("CbnDiv").enable();  
            if ((acId.substring(0, 4) == "0003" || acId.substring(0, 4) == "0004") && acId.length > 4) {
            }
            else{        
                if (fnAllowOpenBalModifications(acId) == "0"){
                    $$("TxtOpen").disable();
                    $$("LblDrCr").disable();                   
                }
            }
            if ($$("btnForn").isVisible() == true && oCurId != "") {
                $$("TxtOpen").disable();
                $$("LblDrCr").disable();
            }
        }

        //fnPopulateDivGrid(dtGLAcc.Rows[0]["AC_ID"].ToString());
        if ((acId.substring(0, 4) == "0003" || acId.substring(0, 4) == "0004") && acId.length > 4) {
            if (dtGLAcc[0]["AFFECT_GROSS_PL"] != null && dtGLAcc[0]["AFFECT_GROSS_PL"].toString().trim() != "")
                $$("ChkGrsProfit").setValue(dtGLAcc[0]["AFFECT_GROSS_PL"].toString().trim());
            else
                $$("ChkGrsProfit").setValue('0');

            $$("ChkGrsProfit").show();
            if (acId.length == 8 && mid != "1")
                $$("ChkGrsProfit").enable();
            else
                $$("ChkGrsProfit").disable();
        }
        else $$("ChkGrsProfit").hide();

        if ($("#hdnM_Tax").val() == "1") {
            if (bGL == false) {
                if (acId.substring(0, 8) == "00040003" || acId.substring(0, 4) == "00010002" && acId.length > 8) {
                    $$("ChkCapitPur").show();
                    $$("ChkCapitPur").setValue('0');
                    if (dtGLAcc[0]["CA_IND"].toString().trim() != "") {
                        if (dtGLAcc[0]["CA_IND"].toString().trim() != "0") $$("ChkCapitPur").setValue('1');
                    }
                    else {
                        $$("ChkCapitPur").hide();
                        $$("ChkCapitPur").setValue('0');
                    }
                }
            }
        }
        else {
            $("ChkCapitPur").hide();
            $$("ChkCapitPur").setValue('0');
        }

        if (dtGLAcc[0]["BANK_RECON_APPL_IND"] != null && dtGLAcc[0]["BANK_RECON_APPL_IND"].toString().trim() != "") $$("ChkBkReqd").setValue(dtGLAcc[0]["BANK_RECON_APPL_IND"].toString().trim());
        else $$("ChkBkReqd").setValue('0');


        if (ChkSCorSD == "1" || CheckBillAppl == "1") {
            var DetInd = dtGLAcc[0]["BILL_DETAIL_IND"] != null && dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim() != ""?dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim():"0"
            $$("ChkBillDet").setValue(DetInd);
            
        }
        else $$("ChkBillDet").setValue('0');
        if ($$("ChkPartyLink").isVisible() == true) {
            if (dtGLAcc[0]["AC_TY_APPL_IND"] != null && dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim() != "") $$("ChkPartyLink").setValue(dtGLAcc[0]["AC_TY_APPL_IND"].toString().trim());
            else $$("ChkPartyLink").setValue('0');
        }
        $$("ChkBillDet").show();
        if ($$("ChkGroup").getValue() == "1") $$("ChkBillDet").enable();
        else $$("ChkBillDet").disable();

        //fnDivision(dtGLAcc.Rows[0]["AC_CAT"].toString().trim(), dtGLAcc.Rows[0]["AC_ID"].ToString());

        if (dtGLAcc[0]["SEQ_INDX"] != null && dtGLAcc[0]["SEQ_INDX"].toString().trim() != "") $$("TxtRepSeq").setValue(dtGLAcc[0]["SEQ_INDX"].toString().trim().substring(dtGLAcc[0]["SEQ_INDX"].toString().trim().length - 2))
        else $$("TxtRepSeq").setValue('');


        $$("TxtLedgerNm").setValue(dtGLAcc[0]["AC_NM"].toString().trim());

        if (dtGLAcc[0]["AC_TY"] != null && dtGLAcc[0]["AC_TY"].toString().trim() != "") {
            $$("ddlPartyMaster").setValue(dtGLAcc[0]["AC_TY"].toString().trim());
        }
        else {
            $$("ddlPartyMaster").setValue('');
            if (dtGLAcc[0]["AC_CD"] != null && dtGLAcc[0]["AC_CD"].toString() != "") $$("TxtAccCode").setValue(dtGLAcc[0]["AC_CD"].toString().trim());

            //if (dtGLAcc[0]["CC_APPL_IND"] != null && dtGLAcc[0]["CC_APPL_IND"].toString().trim())
            //{                    
            //        chkAccMulAna.Checked = true;
            //}

            
        }

        if (dtGLAcc[0]["COA_DIS"].toString().trim() != "" && $$("ChkGroup").getValue() == "1") {
            $$("ChkGrpDisp").setValue("1");
            $$("TxtGrpDisp").setValue(dtGLAcc[0]["COA_DIS"].toString().trim().substring(dtGLAcc[0]["COA_DIS"].toString().trim().length - 4));
            $$("hdnGrpDisp").setValue(dtGLAcc[0]["COA_DIS"].toString().trim());
        }
        else {
            $$("ChkGrpDisp").setValue("0");
            $$("TxtGrpDisp").setValue('');
            $$("hdnGrpDisp").setValue('');
        }

        if (mid == "G") $("#btnNew").prop('disabled', false);
        else $("#btnNew").prop('disabled', true);

        var AllowMod = fnAllowModifications(acId);

        if (AllowMod == "0") {
            $$("TxtAccCode").disable();
            $$("btnChkCode").hide();
            $$("ChkBillDet").disable();
            $$("ChkControl").disable();
            $$("ChkLedger").disable();
            $$("ChkGroup").disable();
        }
        else {
            $$("TxtAccCode").enable();
            $$("ChkPartyLink").enable();
            $$("btnChkCode").show();
            $$("ChkBillDet").enable();
            $$("ChkControl").enable();            

        }

        if (ChkSCorSD == "1" || CheckBillAppl == "1") {
            $$("ChkBillDet").show();
        }
        else {
            $$("ChkBillDet").hide();
        }

        if (dtGLAcc != null && dtGLAcc.length > 0) {
            if (dtGLAcc[0]["BILL_DETAIL_IND"] != null && dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim() != "")
                billDetailInd = parseInt(dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim());
            else
                billDetailInd = "0";
        }

        if ($$("ChkLedger").getValue() == "1" && billDetailInd == "1") {
            $$("CbnBillVouch").show();
            $$("CbnBillVouch").enable();
            $$("btnForn").hide();
        }
        else {
            $$("CbnBillVouch").hide()
            if ($$("ChkLedger").getValue() == "1" && $("#MULTI_CURRENCY_IND").val() == "1") $$("btnForn").show();
            else $$("btnForn").hide();
        }

        if ($("#SUB_LEDG_CREATE_IND").val() == "3") {
            if (ChkSCorSD == "1") {
                if ($$("ChkGroup").getValue() == "1")  $("#btnNew").prop('disabled', false);                
                $$("ChkGroup").disable();
                $$("ChkLedger").disable();  
                if ($("#hdnCurMode").val() == "N") {
                    if($$("ChkGroup").getValue() == "0") $$("ChkGroup").setValue('1');
                }                
            }
        }


        // if (mid2 == "1") lblUserSys.Text = "Reserved"; else lblUserSys.Text = "";
        //ddlDiv.Enabled = false;


        if ($("#hdnvZ6_Ind").val() == "1")
        {
            if (acId.substring(0, 12) == "000100010004" || acId.substring(0, 12) == "000200040003")
            {
                $("#btnNew").prop('disabled', false);
                $("#btnOpen").prop('disabled', false);
                
            }
            else
            {
                $("#btnNew").prop('disabled', false);
                $("#btnOpen").prop('disabled', true);
            }
        }

        //if (bGL == true)
        //{
        //    chkAccMulAna.Checked = false;
        //    chkAccMulAna.Visible = false;
        //}
        //else
        //{
        //    if (costApplInd == 1)
        //        if (multiLevel == 0)
        //            chkAccMulAna.Visible = true;
        //}

        //chkSpec_CheckedChanged(null, null);

        //if (bGL == true)
        //{ chkSpec.Visible = false; divSpec.Style.Add("display", "none"); }
        //else
        //{ if (cDivAppl == 1) { chkSpec.Visible = true; divSpec.Style.Add("display", ""); } }

        //if (acId.length >= 12)
        //{
        //    if ((acId.Substring(0, 12) == "000100010001" || acId.Substring(0, 12) == "000200010001" || acId.Substring(0, 12) == "000100010003") && (bGL == false))
        //        chkReconcilation.Visible = true;
        //    else
        //        chkReconcilation.Visible = false;
        //}
        //else
        //    chkReconcilation.Visible = false;

        
        window.dtBillDet = fnLoadBillVoucherDetails(acId);
    }



};

function chkGroup_CheckedChanged() {
    //debugger;
    var controlAcInd = 0;
    var id = $$("TreeLedger").getSelectedId();
    var acId = id.substring(2, id.length);
    var NewSeqno = "01";
    var rowData = fnGetGlAccountDet(acId);
    var dtGLAcc = [];
    var ChkSCorSD = "0";

    if (rowData != null && rowData != "") {
        dtGLAcc = rowData.dtGlAc;
        ChkSCorSD = rowData.CheckSDorSC == null ? "0" : rowData.CheckSDorSC.toString().trim();
        NewSeqno = rowData.NewSeqno == null ? "01" : rowData.NewSeqno.toString().trim();
    }

    

    //$("#btnNew").prop('disabled', false);
        

    //if (dtGLAcc != null && dtGLAcc.length > 0) {
    //    if (dtGLAcc[0]["CONTROL_AC_IND"] != null && dtGLAcc[0]["CONTROL_AC_IND"].toString().trim() != "") controlAcInd = parseInt(dtGLAcc[0]["CONTROL_AC_IND"].toString().trim());
    //    else controlAcInd = 0;
    //}

    if (acId.length == 4) {
        if ($("#hdnCurMode").val() != "N") $$("ChkActGrp").show();
        $$("ChkLedger").disable();
        if ($$("ChkGroup").getValue() == "0") $$("ChkGroup").setValue('1');
        if ($("#hdnCurMode").val() == "N") $$("ChkActGrp").setValue('1');
    }

    $$("ChkInterComp").hide();
    $$("ChkInterComp").setValue('0');

    if ($$("ChkGroup").getValue() == 1) {
        $$("TxtRepSeq").show();
        $$("ChkGrpDisp").show();
        //$$("TxtGrpDisp").show();

        $$("ChkGrpDisp").enable();
        $$("TxtGrpDisp").enable();
    }

    $$("ChkBookAppl").show();
    $$("ChkBookAppl").setValue('0');
    
    if ($$("ChkBookAppl").getValue() == "1") {
        $$("TxtBookNm").show();
    }
    else {
        $$("TxtBookNm").hide();
    }
    $$("chkSpec").hide();
    if ($$("ChkGroup").getValue() == "1") {
        if($$("ChkLedger").getValue() == "1") $$("ChkLedger").setValue('0');
        $$("chkSpec").hide();
        if ($("#hdnCurMode").val() == "V" && acId.length == 4) {
            $$("ChkBookAppl").setValue('0');
            $$("ChkBookAppl").hide();
            $$("TxtBookNm").hide();
        }
        else {
            $$("ChkBookAppl").setValue('0');
            $$("ChkBookAppl").show();
        }
        $$("ChkBkReqd").hide();
    }
    else {
        $$("ChkBookAppl").hide();
        $$("TxtBookNm").hide();

        if ($("#DIV_APPL_IND").val() == "1") {
            $$("chkSpec").show();
        }
        if ($$("ChkLedger").isEnabled() == true) {
            if($$("ChkGroup").getValue() == "1") $$("ChkGroup").setValue('0');
            if ($$("ChkLedger").getValue() == "0") $$("ChkLedger").setValue('1');
        }
        else {

            if ($("#hdnCurMode").val() == "N" || $("#hdnCurMode").val() == "O") {
                ACCODEVISIBLE($("#hdnCurMode").val(), $$("ChkGroup").getValue(), $$("ChkPartyLink").getValue())
            }

        }

        if (acId.substring(0, 12) == "000100010001" || acId.substring(0, 12) == "000200010001" || acId.substring(0, 12) == "000100010003")
            $$("ChkBkReqd").show();
        else
            $$("ChkBkReqd").hide();

    }

    if ($$("ChkLedger").getValue() == "1") {
        var AcInd = dtGLAcc[0]["AC_IND"] == null ? "" : dtGLAcc[0]["AC_IND"].toString().trim();
        if ($("#hdnCurMode").val() == "N" && parseFloat($$("TxtOpen").getValue() == null  || $$("TxtOpen").getValue() == "" ? "0":$$("TxtOpen").getValue()) == 0){
            if (acId.substring(0,4) == "0001")  $$("LblDrCr").setValue("Dr");
            else if (acId.substring(0,4) == "0002")  $$("LblDrCr").setValue("Cr");
            else if (acId.substring(0, 4) == "0003" || AcInd == "I") $$("LblDrCr").setValue("Cr");
            else if (acId.substring(0, 4) == "0004" || AcInd == "E") $$("LblDrCr").setValue("Dr");
        }

        $$("TxtOpen").show();
        $$("LblDrCr").show();
        $$("LblOpen").show();

        $$("TxtLedgerNm").define("label", "Ledger Name");
        $$("TxtLedgerNm").refresh();
        $$("ChkBillDet").disable();
    }
    else {
        $$("TxtOpen").hide();
        $$("LblDrCr").hide();
        $$("LblOpen").hide();
        $$("TxtLedgerNm").define("label", "Group Name");
        $$("TxtLedgerNm").refresh();
    }


    if ($$("ChkGroup").getValue() == "1") {
        if (ChkSCorSD == "1") {
            $$("ChkBillDet").show();
            $$("ChkBillDet").enable();
            $$("ChkControl").show();
        }
        else {
            $$("ChkBillDet").hide();
            $$("ChkControl").hide();
        }

    }
    else {
        $$("ChkBillDet").hide();
        $$("ChkControl").hide();
    }

    fnAnalyHideShow();

    if (ChkSCorSD == "1") {
        if ($$("ChkGroup").getValue() == "1") $$("ChkPartyLink").show();
    }
    else $$("ChkPartyLink").hide();

    var billDetailInd = "0";

    if (dtGLAcc != null && dtGLAcc.length > 0) {
        if (dtGLAcc[0]["BILL_DETAIL_IND"] != null && dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim() != "")
            billDetailInd = parseInt(dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim());
        else
            billDetailInd = "0";
    }

    if ($$("ChkLedger").getValue() == "1" && billDetailInd == "1") {
        $$("CbnBillVouch").show();
        $$("CbnBillVouch").enable();
        $$("btnForn").hide();
    }
    else {
        $$("CbnBillVouch").hide()
        if ($$("ChkLedger").getValue() == "1" && $("#MULTI_CURRENCY_IND").val() == "1") $$("btnForn").show();
        else $$("btnForn").hide();
    }

    if ($$("ChkLedger").getValue() == "1") {
        $$("TxtRepSeq").hide();
        $$("TxtRepSeq").setValue('1');
    }
    else {
        $$("TxtRepSeq").show();

        if ($("#hdnCurMode").val() == "N") {
            $$("TxtRepSeq").setValue(NewSeqno);
        }
    }
    if ($("#hdnCurMode").val() == "N" || $("#hdnCurMode").val() == "O") {

        $$("TxtRepSeq").enable();
    }

    if ($("#hdnCurMode").val() != "N") {
        if (acId.length == 4) {
            $$("TxtRepSeq").disable();

        }
        else {
            $$("TxtRepSeq").enable();
        }
    }

    
   


    if (ChkSCorSD == "1") {
        if ($$("ChkGroup").getValue() == "1") {
            $$("ChkControlInd").show();
            if ($$("ChkControlInd").getValue() == "0") $$("ChkControl").hide();
            else $$("ChkControl").show();
        }
        else {
            $$("ChkControlInd").hide();
            $$("ChkControl").hide();
        }
    }
    else {
        $$("ChkControlInd").hide();
        $$("ChkControl").hide();
    }


    if ($$("ChkControl").isEnabled() == true) $$("ChkControlInd").enable();
    else $$("ChkControlInd").disable();

    if ($$("ChkGroup").getValue() == "1")
    {
        
        if ($("#hdnCurMode").val() != "N") {
            $$("ChkActGrp").show();
            $$("ChkActGrp").setValue('0');
        }
        else $$("ChkActGrp").setValue('1');
        
    }
    else
    {
        if ($("#hdnCurMode").val() != "N") {
            $$("ChkActGrp").show();
            $$("ChkActGrp").setValue('0');
        }
        else $$("ChkActGrp").setValue('1');
    }

    ACCODEVISIBLE($("#hdnCurMode").val(), $$("ChkGroup").getValue(), $$("ChkPartyLink").getValue())

    //chkPrtyLnk_CheckedChanged(null, null);
    //chkSpec_CheckedChanged(null, null);    

};

function chkLedger_CheckedChanged() {
    //debugger;
    var controlAcInd = 0;
    var id = $$("TreeLedger").getSelectedId();
    var acId = id.substring(2, id.length);
    var NewSeqno = "01";

    var rowData = fnGetGlAccountDet(acId);
    var dtGLAcc = [];
    var ChkSCorSD = "0"

    if (rowData != null && rowData != "") {
        dtGLAcc = rowData.dtGlAc;
        ChkSCorSD = rowData.CheckSDorSC == null ? "0" : rowData.CheckSDorSC.toString().trim();
        NewSeqno = rowData.NewSeqno == null ? "01" : rowData.NewSeqno.toString().trim();
    }

    $$("ChkInterComp").hide();
    $$("ChkInterComp").setValue('0');
    

    if (ChkSCorSD == "1") {
        if ($("#hdnCurMode").val() == "N") {                        
            $("#btnNew").prop('disabled', false);
            if (dtGLAcc != null && dtGLAcc.length > 0) {
                if (dtGLAcc[0]["CONTROL_AC_IND"] != null && dtGLAcc[0]["CONTROL_AC_IND"].toString().trim() != "") controlAcInd = parseInt(dtGLAcc[0]["CONTROL_AC_IND"].toString().trim());
                else controlAcInd = 0;
                if (controlAcInd != 1 && controlAcInd != 2) {
                    if(window.NewClick == "0") AlertMessage("Parent A/c is Not Defined as Control A/c");                    
                    if ($$("ChkLedger").getValue() == "1") {
                        window.NewClick = "1";
                        $$("ChkLedger").setValue("0");
                        window.NewClick = "0";
                    }
                    if ($$("ChkGroup").getValue() == "0") $$("ChkGroup").setValue('1');
                    return false;
                }
            }
            //if ($$("ChkGroup").getValue() == "1" && $$("ChkGroup").isEnabled()==true) $$("ChkGroup").setValue('0');
        }
    }    
    $$("chkSpec").hide();
    if ($$("ChkLedger").getValue() == "1") {
        $$("TxtOpen").show();
        $$("LblDrCr").show();
        $$("LblOpen").show();
        
        $$("TxtRepSeq").hide();
        $$("ChkGrpDisp").hide();
        $$("ChkGrpDisp").setValue('0');
        $$("TxtGrpDisp").hide();
        if ($("#hdnIntComp").val() == "1") $$("ChkInterComp").show();

        $$("ChkGroup").setValue('0');
        $$("ChkBookAppl").setValue('0');
        $$("ChkBookAppl").hide();
        $$("chkSpec").hide(); 
        

        if (acId.length >= 12) {
            if (acId.substring(0, 12) == "000100010001" || acId.substring(0, 12) == "000200010001" || acId.substring(0, 12) == "000100010003")
                $$("ChkBkReqd").show();
            else
                $$("ChkBkReqd").hide();
        }
    }
    else {
        
        if ($$("ChkGroup").isEnabled() == true) {
            $$("ChkBookAppl").show();
            if($$("ChkLedger").getValue() == "1") $$("ChkLedger").setValue('0');
            if ($$("ChkGroup").getValue() == "0") $$("ChkGroup").setValue("1");
            
        }
        else if ($$("ChkGroup").isEnabled() == false) {

            if ($("#hdnCurMode").val() == "N" || $("#hdnCurMode").val() == "O") {
                var bGrp = false;
                var intPM = "0";

                if ($$("ChkGroup").getValue() == "1") bGrp = true;
                if ($$("ChkPartyLink").getValue() == "1") intPM = "1";

                if (intPM == "1") $$("TxtAccCode").show();
                else $$("TxtAccCode").hide();

                $$("TxtRepSeq").hide();
            }            
        }

    }

    if ($$("ChkLedger").getValue() == "1") {
        var AcInd = dtGLAcc[0]["AC_IND"] == null ? "" : dtGLAcc[0]["AC_IND"].toString().trim();
        if ($("#hdnCurMode").val() == "N" && parseFloat($$("TxtOpen").getValue() == null || $$("TxtOpen").getValue() == "" ? "0" : $$("TxtOpen").getValue()) == 0) {
            if (acId.substring(0, 4) == "0001") $$("LblDrCr").setValue("Dr");
            else if (acId.substring(0, 4) == "0002") $$("LblDrCr").setValue("Cr");
            else if (acId.substring(0, 4) == "0003" || AcInd == "I") $$("LblDrCr").setValue("Cr");
            else if (acId.substring(0, 4) == "0004" || AcInd == "E") $$("LblDrCr").setValue("Dr");
        }


        $$("TxtLedgerNm").define("label", "Ledger Name");
        $$("TxtLedgerNm").refresh();
        $$("ChkBillDet").disable();

        if ($("#DIV_APPL_IND").val() == "1") {
            $$("chkSpec").show();
        }

    }
    else {
        $$("TxtLedgerNm").define("label", "Group Name");
        $$("TxtLedgerNm").refresh();
        $$("chkSpec").hide();
    }


    if ($$("ChkGroup").getValue() == "1") {
        if (ChkSCorSD == "1") {
            $$("ChkBillDet").show();
            $$("ChkBillDet").enable();
            $$("ChkControl").show();
        }
        else {
            $$("ChkBillDet").hide();
            $$("ChkControl").hide();
            $$("ChkControl").setValue('0');
        }

    }
    else {
        $$("ChkBillDet").hide();
        $$("ChkControl").hide();
        $$("ChkControl").setValue('0');
    }

    fnAnalyHideShow();

    if (ChkSCorSD == "1") {
        if ($$("ChkGroup").getValue() == "1") $$("ChkPartyLink").show();
        else {
            $$("ChkPartyLink").hide();
            $$("ChkPartyLink").setValue('0');
        }
    }
    else $$("ChkPartyLink").hide();

    var billDetailInd = "0";

    if (dtGLAcc != null && dtGLAcc.length > 0) {
        if (dtGLAcc[0]["BILL_DETAIL_IND"] != null && dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim() != "")
            billDetailInd = parseInt(dtGLAcc[0]["BILL_DETAIL_IND"].toString().trim());
        else
            billDetailInd = "0";
    }

    if ($$("ChkLedger").getValue() == "1" && billDetailInd == "1") {
        $$("CbnBillVouch").show();
        $$("CbnBillVouch").enable();
        $$("btnForn").hide();        
    }
    else {
        $$("CbnBillVouch").hide();
        if ($$("ChkLedger").getValue() == "1" && $("#MULTI_CURRENCY_IND").val() == "1") $$("btnForn").show();
        else $$("btnForn").hide();
    }


    if ($$("ChkLedger").getValue() == "1") {
        $$("TxtRepSeq").hide();
        $$("TxtRepSeq").setValue('1');
    }
    else {
        $$("TxtRepSeq").show();

        if ($("#hdnCurMode").val() == "N") {
            $$("TxtRepSeq").setValue(NewSeqno);
        }
    }

    if ($("#hdnCurMode").val() != "N") {
        if (acId.length == 4) {
            $$("TxtRepSeq").disable();

        }
        else {
            $$("TxtRepSeq").enable();
        }
    }

    if ($("#hdnCurMode").val() == "N" || $("#hdnCurMode").val() == "O") {
        var bGrp = false;
        var intPM = "0";

        if ($$("ChkGroup").getValue() == "1") bGrp = true;
        if ($$("ChkPartyLink").getValue() == "1") intPM = "1";

        if (intPM == "1") $$("TxtAccCode").show();
        else $$("TxtAccCode").hide();

        $$("TxtRepSeq").enable();
    }



    if (ChkSCorSD == "1") {
        if ($$("ChkGroup").getValue() == "1") {
            $$("ChkControlInd").show();
            if ($$("ChkControlInd").getValue() == "0") $$("ChkControl").hide();
            else $$("ChkControl").show();
        }
        else {
            $$("ChkControlInd").hide();
            $$("ChkControl").hide();
        }
    }
    else {
        $$("ChkControlInd").hide();
        $$("ChkControl").hide();
    }


    if ($$("ChkControl").enable() == true) $$("ChkControlInd").enable();
    else $$("ChkControlInd").disable();

    if ($$("ChkLedger").getValue() == "1") {
        if ($("#hdnCurMode").val() != "N") {
            $$("ChkActGrp").show();
            $$("ChkActGrp").setValue('0');
        }
        else $$("ChkActGrp").setValue('1');

    }
    else {
        if ($("#hdnCurMode").val() != "N") {
            $$("ChkActGrp").show();
            $$("ChkActGrp").setValue('0');
        }
        else $$("ChkActGrp").setValue('1');
    }

    $$("ChkBookAppl").show();
    $$("ChkBookAppl").setValue('0');

    ACCODEVISIBLE();
    
    

};

function fnAllowOpenBalModifications(AcId) {
    Request = {
        REQTYPE: "GET_FNALLOWOPENBALMODIFICATIONS",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });

    return rowData;
};


function fnAllowModifications(AcId) {
    Request = {
        REQTYPE: "GET_FNALLOWMODIFICATIONS",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });

    return rowData;
};
function fnCheckParyMst(AcId) {
    //debugger;
    Request = {
        REQTYPE: "GET_FNCHKPARTYMST",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });

    return rowData;
};

function ACCODEVISIBLE(Mode, bGroup, ControlAc) {
    if (bGroup == "0") {
        $$("TxtAccCode").show();
        $$("btnChkCode").show();
    }
    else {
        $$("TxtAccCode").show();
        $$("btnChkCode").show();

    }
};
function fnFloatText(code, e, vText, MaxLength, DecLength, CurPos) {

    //if (e.key == "Shift") return false;
    debugger;    
    //vText = vText.replace(/,/g, "");
    var NumLen = MaxLength - DecLength - 1;
    var charCode = e.which || e.keyCode;

    if (e.ctrlKey == true) return false;
    var dotPos = vText.toString().indexOf(".");
    if (dotPos != -1 && (charCode == 190 || charCode == 110)) return false;

    if ((e.shiftKey == true) && (charCode == 36 || charCode == 35 || charCode == 9)) return true;
    else if (e.shiftKey == true) return false;


    if ((charCode == 190 || charCode == 110) && DecLength == 0) return false;
    if (dotPos >= 0) {

        var vArr = vText.split('.');
        var afterPoint = vArr[1].toString().trim();
        var befPoint = vArr[0].toString().trim();
        if (charCode == 8 && CurPos == dotPos + 1 && afterPoint.length > 0) return false;
        if (charCode == 46 && CurPos == dotPos && afterPoint.length > 0) return false;
        if (afterPoint.length == DecLength && CurPos > dotPos) {
            if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;
        }
        if (befPoint.length == NumLen && CurPos <= dotPos) if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;
    }
    else if (vText.length == NumLen) if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;

    if ((charCode == 46 || charCode == 37 || charCode == 39 || charCode == 190 || charCode == 110) && e.shiftKey == false) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        //debugger;
        //if (e.target.selectionStart >= dotPos+3 && dotPos==3) {
        //    return false;
        //}
        //else
        return true;
    }


};

function fnAmtFormat(value, Decimal) {
    //debugger;
    var RetStr = "";       
    if (value == null || value == undefined || value == "") return "";
    value = value.toString().replace(/,/g, "");
    if (value == null || value == undefined || value == "") return "";
    if (isNaN(value)) return "";
    return parseFloat(value).toFixed(Decimal);
};

function fnAmtFormat1(value, Decimal) {
    debugger;
    var RetStr = "";    
    if (value == null || value == undefined || value == "") return "";
    value = value.toString().replace(/,/g, "");
    if (value == null || value == undefined || value == "") return "";
    return parseFloat(value).toFixed(Decimal);
};

function fnNumericText(code, e) {
    //debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    if (charCode == 46 || charCode == 37 || charCode == 39) {
        return true
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        //debugger;
        return true;
    }
};

function fnGetPartyGenInd(AcTy) {
    //debugger;
    Request = {
        REQTYPE: "GET_FNGETPARTYGENIND",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACTY: AcTy,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });

    return rowData;
};


function fnShowBillVoucherWindow(Data) {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "BilDetWindow",
        head: "Bill Details with Voucher(s)",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 950,
        move: true,
        on:{
            onShow: function () {
                var vOpenAmt = $$("TxtOpen").getValue();
                if ($$("LblDrCr").getValue() == "Dr") vOpenAmt = fnCurrFormat(vOpenAmt.toString()) + " Dr";
                else vOpenAmt = fnCurrFormat(vOpenAmt.toString()) + " Cr";

                $$("txtBillAmount").setValue(vOpenAmt);
                if ($$("TxtOpen").isEnabled() == true) {
                    $$("btnBillDone").enable();
                    $$("frmFormAmt").enable();
                    $$("AddBillVchDet").enable();
                    $$("DelBillVchDet").enable();
                }
                else {
                    $$("btnBillDone").disable();
                    $$("frmFormAmt").disable();
                    $$("AddBillVchDet").disable();
                    $$("DelBillVchDet").disable();
                }
                
                if (window.dtBillDet.length > 0) {
                    $$("gridBillVouch").parse(webix.copy(window.dtBillDet));

                }
                else {
                    fnBillGridAddRow();
                    var id = $$("TreeLedger").getSelectedId();
                    var acId = id.substring(2, id.length);                    
                    var Par_acId = acId.substring(0, 12);

                    var vId = $$("gridBillVouch").getFirstId();
                    var vItem = $$("gridBillVouch").getItem(vId);
                    if (Par_acId == "000100010004") {
                        vItem.TRN_TY_ID = "4";
                       
                    }
                    else if (Par_acId == "000200040003") {
                        vItem.TRN_TY_ID = "5";                       
                    }

                    vItem.DUE_DT = window.vDEFDt;

                    $$("gridBillVouch").updateItem(vId, vItem);
                    $$("gridBillVouch").refresh();
                    
                                  
                }
            }
        },
        body: {
            //view: 'form',
            minWidth: 400,
            maxWidth: 950,            
            rows: [
                {                   
                    PaddingY: 5,                    
                    cols: [                            
                        {
                            view: "text", width: 200, labelWidth: 70, id: "txtBillAmount", label: "Amount", readonly: true, inputAlign: "right", css: "COAAccTextSmFont"                           
                        },
                        {},
                        {
                            minWidth: 200,
                            maxWidth: 200,                            
                            css:{"text-align":"right !important"},
                            rows: [
                                 {
                                     cols: [{
                                         view: 'button',
                                         label: 'Add Row',
                                         id:"AddBillVchDet",
                                         maxWidth: 100,
                                         on: {
                                             onItemClick: function () {
                                                 $$("gridBillVouch").editStop();
                                                 if ($$("gridBillVouch").count() > 0) {
                                                     var vLstId = $$("gridBillVouch").getLastId();
                                                     var vData = $$("gridBillVouch").getItem(vLstId);
                                                     var vRefTyNm = vData.REF_TY_ID;
                                                     var vDebit =  vData.DEBIT != null && vData.DEBIT != "" ? parseFloat(vData.DEBIT) :0;
                                                     var vCredit =  vData.CREDIT != null && vData.CREDIT != "" ? parseFloat(vData.CREDIT) :0;
                                                     bDrCr = "0";
                                                 
                                                     if (vDebit == 0 && vDebit == 0) bDrCr = "0";
                                                     if (vDebit != 0 && vDebit > 0) bDrCr = "1";
                                                     if (vCredit != 0 && vCredit > 0) bDrCr = "1";
                                                     if ((vData.REF_TY_ID != null && vData.REF_TY_ID.toString().trim() != "") && bDrCr == "1") fnBillGridAddRow();
                                                 }
                                                 else fnBillGridAddRow();
                                             }
                                         }
                                     },
                                     {
                                         view: 'button',
                                         label: 'Delete Row',
                                         id: "DelBillVchDet",
                                         maxWidth: 100,
                                         on: {
                                             onItemClick: function () {
                                                 ///document.getElementById('hdnAutoSaveFlag').value = "1";
                                                 $$("gridBillVouch").editStop();
                                                 $$("gridBillVouch").remove($$("gridBillVouch").getSelectedId());
                                                 $$("gridBillVouch").refresh();
                                                 if ($$("gridBillVouch").count() == 0) fnBillGridAddRow();

                                             }
                                         }

                                     }
                                     ]
                                 }
                            ]
                        }
                    ]

                },
                            
               {
                   view: "datatable",
                   id: "gridBillVouch",
                   select: 'row',
                   css: "webix_header_border CoaGrid",
                   editable: true,
                   rowHeight: 24,
                   //height:300,
                   footer: true,
                   resizeColumn: true,
                   autoConfig: true,
                   columns: [                           
                           {
                               id: "REF_TY_ID", header: [{ text: 'Ref. Type', css: "multiline" }],  editor: "richselect", css: { 'text-align': 'left ! important' },
                               suggest: {
                                   view: "suggest",
                                   css: "CoaSugg1",
                                   body: {
                                       css: "CoaSugg",
                                       data: window.dtRefTy,
                                   }
                               },
                               template: function (obj, common, val, config) {                                   
                                   if (val != "" && val != null) {
                                       var data = config.suggest.body.data;
                                       var newData = data.filter(function (el) {
                                           return el.id == val;
                                       });
                                       if (newData.length > 0) return "<div style='width:100%'><div style='width: calc(100% - 22px); float: left;overflow: hidden;'>" + newData[0].value + "</div><div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div></div>";
                                       else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                                   }
                                   else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                               },
                           },
                           { id: "REF_NM", header: [{ text: 'Ref. Name', css: "multiline" }], width: 90, css: { 'text-align': 'left ! important' }, editor: "text", },
                           {
                               id: "DUE_DT", header: 'Due Date', editor: "date", format: webix.Date.dateToStr("%d/%m/%Y"), width: 90, css: { 'text-align': 'left ! important' }, stringResult: true,
                               template: function (obj, common, val, config) {                                   
                                   if (val != "" && val != null) {
                                       return "<div style='width:100%'><div style='width: calc(100% - 20px); float: left;overflow: hidden;'>" + val + "</div><div><span style='float:right;font-size:18px;line-height:24px' class='webix_icon wxi-calendar'></span></div></div>";
                                       
                                   }
                                   else return "<div><span style='float:right;font-size:18px;line-height:24px' class='webix_icon wxi-calendar'></span></div>";
                               },
                           },
                           { id: "VOUCH_NO", header: [{ text: "Voucher No.", css: "multiline" }], width: 80, css: { 'text-align': 'right ! important' }, editor: "text",  },
                           {
                               id: "VOUCH_DT", header: [{ text: "Voucher Date", css: "multiline" }], editor: "date", format: webix.Date.dateToStr("%d/%m/%Y"), width: 90, stringResult: true, css: { 'text-align': 'left ! important' },
                               template: function (obj, common, val, config) {
                                   if (val != "" && val != null) {
                                       return "<div style='width:100%'><div style='width: calc(100% - 20px); float: left;overflow: hidden;'>" + val + "</div><div><span style='float:right;font-size:18px;line-height:24px' class='webix_icon wxi-calendar'></span></div></div>";

                                   }
                                   else return "<div><span style='float:right;font-size:18px;line-height:24px' class='webix_icon wxi-calendar'></span></div>";
                               },
                           },
                           {
                               id: "TRN_TY_ID", header: [{ text: 'Trn Type', css: "multiline" }], editor: "richselect", css: { 'text-align': 'left ! important' }, footer: { text: "Total", css: "LeftAlign", height: 24 },
                               suggest: {
                                   view: "suggest",
                                   css: "CoaSugg1",
                                   body: {
                                       css: "CoaSugg",
                                       data: window.dtTrnTy,
                                   }
                               },
                               template: function (obj, common, val, config) {
                                   if (val != "" && val != null) {
                                       var data = config.suggest.body.data;
                                       var newData = data.filter(function (el) {
                                           return el.id == val;
                                       });
                                       if (newData.length > 0) return "<div style='width:100%'><div style='width: calc(100% - 22px); float: left;overflow: hidden;'>" + newData[0].value + "</div><div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div></div>";
                                       else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                                   }
                                   else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                               },
                           },                           
                           {
                                id: "CUR_ID", header: 'Currency', editor: "richselect", css: { 'text-align': 'left ! important' },width:60,
                               suggest: {
                                   view: "suggest",
                                   css: "CoaSugg1",
                                   body: {
                                       css: "CoaSugg",
                                       data: window.dtCur,
                                   }
                               },
                               template: function (obj, common, val, config) {
                                   if (val != "" && val != null) {
                                       var data = config.suggest.body.data;
                                       var newData = data.filter(function (el) {
                                           return el.id == val;
                                       });
                                       if (newData.length > 0) return "<div style='width:100%'><div style='width: calc(100% - 22px); float: left;overflow: hidden;'>" + newData[0].value + "</div><div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div></div>";
                                       else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                                   }
                                   else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                               },
                           },
                           
                           {
                               header: [{ text: "Debit Amount", css: "multiline" }],  id: "DEBIT", width: 100, css: { 'text-align': 'right ! important' }, editor: "text",
                               format: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editParse: function (value) {
                                   return fnAmtFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editFormat: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               footer: { content: "totalColumn" },
                           },
                           {
                               id: "CREDIT", header: [{ text: "Credit Amount", css: "multiline" }], width: 100, css: { 'text-align': 'right ! important' }, editor: "text",
                               format: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editParse: function (value) {
                                   return fnAmtFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editFormat: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               footer: { content: "totalColumn" },
                           },

                           {
                               id: "FORN_AMT", header: [{ text: "Forign Amount", css: "multiline" }], width: 110, css: { 'text-align': 'right ! important' }, editor: "text", hidden: true,
                               format: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editParse: function (value) {
                                   return fnAmtFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editFormat: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                           },
                           { id: "CON_FAC", header: "Conv. Factor", width: 70, css: { 'text-align': 'right ! important' }, hidden: true },

                           {
                               id: "DIV_ID", header: 'Division', editor: "richselect", css: { 'text-align': 'left ! important' }, hidden: true,
                               suggest: {
                                   view: "suggest",
                                   css: "CoaSugg1",
                                   body: {
                                       css: "CoaSugg",
                                       data: window.dtDiv,
                                   }
                               },
                               template: function (obj, common, val, config) {
                                   if (val != "" && val != null) {
                                       var data = config.suggest.body.data;
                                       var newData = data.filter(function (el) {
                                           return el.id == val;
                                       });
                                       if (newData.length > 0) return "<div style='width:100%'><div style='width: calc(100% - 22px); float: left;overflow: hidden;'>" + newData[0].value + "</div><div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div></div>";
                                       else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                                   }
                                   else return "<div style='padding-right: 2px;'><span style='float:right;font-size:30px;line-height:24px' class='webix_icon wxi-menu-down'></span></div>";
                               },
                           },
                           { id: "NAR", header: 'Narration', width: 100, css: { 'text-align': 'left ! important' }, editor: "popup", fillspace:true,minWidth:70},
                           {
                               header: "Advance Amount", id: "PAY_ADV_AMT", width: 120, css: { 'text-align': 'right ! important' }, editor: "text",hidden:true,
                               format: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editParse: function (value) {
                                   return fnAmtFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                               editFormat: function (value) {
                                   return fnCurrFormat(value, $("#VAL_DECIM_LIMIT").val());
                               },
                           },
                           
                           { id: "AC_ID", hidden: true },
                           { id: "AMT", hidden: true },
                           { id: "UPDATE_DT", hidden: true },
                           { id: "DRCR_IND", hidden: true },

                   ],
                   data: [],
                   scheme: {
                       $init: function (item) {
                           if (item.AMT != "" && item.AMT != null) {                               
                               if (item.DRCR_IND == "1") {
                                   item.DEBIT = item.AMT
                               }
                               else {
                                   item.CREDIT = item.AMT;
                               }

                           }
                           if (!(item.CUR_ID != "" && item.CUR_ID != null)) {                               
                               item.CUR_ID = $("#hdnBasCurId").val();
                           }
                       },                      
                   },
                   on: {

                       'onItemDblClick': function (id) {
                           //debugger;

                           //$$("DupAcCd").hide();

                       },
                       'onBeforeEditStart': function (id) {
                           if ($$("btnBillDone").isEnabled() == false) return false;
                           var getval = this.getItem(id.row);
                           SelectCoaColumn = id.column;
                           if (SelectCoaColumn == "CREDIT") {
                               this.editStop();
                               if (getval.DEBIT != null && !isNaN(getval.DEBIT) && getval.DEBIT.toString().trim() != "" && parseFloat(getval.DEBIT.toString().trim()) != 0) return false;
                           }
                           else if (SelectCoaColumn == "DEBIT") {
                               this.editStop();
                               if (getval.CREDIT != null && !isNaN(getval.CREDIT) && getval.CREDIT.toString().trim() != "" && parseFloat(getval.CREDIT.toString().trim()) != 0) return false;
                           }
                           
                       },
                       onAfterEditStart: function (cell) {
                           //debugger;
                           vRow = cell.row;
                           vCol = cell.column;
                           if (vCol == "VOUCH_NO") {
                               this.getEditor().getInputNode().setAttribute("maxlength", 6);
                               this.getEditor().getInputNode().style.textAlign = "right";
                           }
                           else if (vCol == "CREDIT" || vCol == "DEBIT" || vCol == "FORN_AMT" || vCol == "PAY_ADV_AMT") {
                               this.getEditor().getInputNode().setAttribute("maxlength", 14);
                               this.getEditor().getInputNode().style.textAlign = "right";
                           }
                           
                       },
                       onAfterEditStop: function (state, editor) {
                           //debugger;
                           
                           var columnId = editor.column;
                           var vId = editor.row;
                           var vItem = this.getItem(vId);

                           var id = $$("TreeLedger").getSelectedId();
                           var acId = id.substring(2, id.length);
                           var Par_acId = acId.substring(0, 12);
                           
                           if (state.value != state.old) {
                               if (columnId == "REF_TY_ID") {
                                   vItem.REF_NM = "";
                                   //vItem.CUR_ID = $("#hdnBasCurId").val();
                                   vItem.CREDIT = "";
                                   vItem.DEBIT = "";
                                   vItem.TRN_TY_ID = "";
                                   vItem.VOUCH_NO = "";
                                   vItem.VOUCH_DT = "";
                                   if (Par_acId == "000100010004") {
                                       vItem.TRN_TY_ID = "4";
                                   }
                                   else if (Par_acId == "000200040003") {
                                       vItem.TRN_TY_ID = "5";
                                   }
                                   $$("gridBillVouch").updateItem(vId, vItem);
                                   $$("gridBillVouch").refresh();
                               }
                               else if (columnId == "VOUCH_DT") {
                                   var vVouchDt = vItem.VOUCH_DT
                                   if (vVouchDt != null && vVouchDt != "") {
                                       vVouchDt = formatDt23To103(vVouchDt)
                                       if ($("#D_IND").val() == "1" || $("#D_IND").val() == "2") {
                                           var vDueDt = fnRetDateAdd(vVouchDt, "DAY", window.CrDys, 121);
                                           vItem.DUE_DT = vDueDt;
                                           $$("gridBillVouch").updateItem(vId, vItem);
                                           $$("gridBillVouch").refresh();
                                       }
                                   }
                               }
                           }
                       },
                       
                       onKeyPress: function (code, e) {
                           //debugger;
                           var selRow = this.getSelectedItem(false);
                           var rowid = selRow.id;
                           var Item = this.getItem(rowid);
                           var charCode = e.which || e.keyCode;

                           if (this.getEditor() != null && this.getEditor() != 0) {
                               var Tval = this.getEditor().getValue() == null ? "" : this.getEditor().getValue();
                               var Pos = this.getEditor().getInputNode().selectionStart;
                               if (SelectCoaColumn == "VOUCH_NO") {                                   
                                   return fnNumericText(code, e);
                               }
                               else if (SelectCoaColumn == "CREDIT" || SelectCoaColumn == "DEBIT" || SelectCoaColumn == "FORN_AMT" || SelectCoaColumn == "PAY_ADV_AMT") {
                                   var maxLen = parseInt($("#VAL_DECIM_LIMIT").val()) + 8;
                                   return fnFloatText(code, e, Tval, maxLen, $("#VAL_DECIM_LIMIT").val(), Pos)

                               }
                               else if (SelectCoaColumn == "REF_NM") {
                                   if (e.key == "'") return false;
                               }
                           }
                       },
                       onBlur: function () {
                           if (SelectCoaColumn != "DUE_DT" && SelectCoaColumn != "VOUCH_DT") {
                               this.editStop()
                           }
                       }

                   },

               },
               {
                   //PaddingY: 5,
                   padding:{top:5,bottom:5,left:5,right:5},
                   cols: [
                       {
                           rows:[
                                {
                                    view: "text", width: 200, labelWidth: 70, id: "txtBillDiffAmount", label: "Difference", readonly: true, inputAlign: "right",
                                    css: "COAAccTextSmFont",
                                }
                           ]
                       },
                       {},
                       {
                          
                           id: "frmFormAmt",
                           view: "form",
                           hidden:true,
                           //css:{"border":"1px solid"},                         
                           rows: [                                
                                { view: "text", name: "txtFornCurr", width: 250, labelWidth: 110, id: "txtFornCurr", label: "Forign Currency", readonly: true,  },
                                {
                                    rows: [
                                        {
                                            cols: [
                                                {
                                                    rows: [

                                                            { view: "text", name: "txtFornConRt", width: 180, labelWidth: 110, id: "txtFornConRt", label: "Convert Rate", readonly: true, inputAlign: "right", },
                                                            { view: "text", name: "txtFornAmt", width: 180, labelWidth: 110, id: "txtFornAmt", label: "Forign Amt", readonly: true, inputAlign: "right", },
                                                    ]
                                                },
                                                {
                                                    view: "radio",
                                                    label: "",
                                                    width:60,
                                                    value: 1, options: [
                                                        { "id": 1, "value": "Dr" }, // the initially selected item
                                                        { "id": 2, "value": "Cr" }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                           ]

                       },
                       { css: { "margin-left": "2px !important" }},
                       {
                           rows: [ 
                               {
                                   view: 'button', label: 'Done', id:"btnBillDone", maxWidth: 70, 
                                   on: {
                                       onItemClick: function () {
                                           ///document.getElementById('hdnAutoSaveFlag').value = "1";
                                           fnBtnDoneClick();                                           
                                    

                                       }
                                    }
                               }
                            ]                                   
                       }
                   ]

               },
               {height:2}
            ],
        }
    }).show();

    

};
function fnBtnDoneClick() {
    $$("gridBillVouch").editStop();
    var dtData = $$("gridBillVouch").serialize();
    var id = $$("TreeLedger").getSelectedId();
    var acId = id.substring(2, id.length);
    var OpenAmt = $$("TxtOpen").getValue() == "" ? 0 : parseFloat($$("TxtOpen").getValue());
    var Mode = "";

    if ($("#hdnCurMode").val() == "N") Mode = "NEW";
    else if ($("#hdnCurMode").val() == "O") Mode = "OPEN";

    var TotCredit = 0;
    var TotDebit = 0;
    var vTotAmt = 0;
    $.each(dtData, function (key, sVal) {
        debugger;
        var DebitAmt = sVal["DEBIT"] != null &&  !isNaN(sVal["DEBIT"]) && sVal["DEBIT"].toString().trim() != "" ? parseFloat(sVal["DEBIT"].toString().trim()) : 0;
        var CreditAmt = sVal["CREDIT"] != null && !isNaN(sVal["CREDIT"]) && sVal["CREDIT"].toString().trim() != "" ? parseFloat(sVal["CREDIT"].toString().trim()) : 0;
        TotCredit += CreditAmt;
        TotDebit += DebitAmt;
        if (DebitAmt > 0) {
            sVal["AMT"] = DebitAmt;
            sVal["DRCR_IND"] = "1";
        }
        else {
            sVal["AMT"] = CreditAmt;
            sVal["DRCR_IND"] = "2";
        }
        $.each(sVal, function (key, value) {            
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    vTotAmt = parseFloat(TotDebit) - parseFloat(TotCredit);

    Request = {
        REQTYPE: "GET_FNVALIDATEBILLDET",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: acId,
        BILL_DET: dtData,
        OPEN_AMT: OpenAmt,
        MODE: Mode
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    var bRet = "1";
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (rowData.RETURN == "0") {
                    bRet = "0";
                    if (rowData.MESSAGE != "") {
                        AlertMessage(rowData.MESSAGE);
                        if (rowData.ROWID != "") {
                            webix.UIManager.setFocus($$("gridBillVouch"));
                            $$("gridBillVouch").select(rowData.ROWID);
                        }
                    }
                }
            }
        },
    });

    if (bRet == "0") return false;
    var TmpDiff = parseFloat($$("txtBillDiffAmount").getValue().toString().trim().replace(/,/g, "") == "" ? 0 : $$("txtBillDiffAmount").getValue().toString().trim().replace(/,/g, ""));
    if (TmpDiff > 0) {
        var StrMess = "Difference - " + fnCurrFormat(TmpDiff) + "/- found. Proceed with Opening balance update?";
        webix.confirm({
            title: "Confirmation",
            ok: "Yes", cancel: "No",
            text: StrMess,
            maxWidth:380,
            callback: function (result) {                
                if (result == false) {
                    return false;                    
                }
                else {
                    if (vTotAmt > 0) $$("LblDrCr").setValue('Dr');
                    else $$("LblDrCr").setValue('Cr');
                    $$("TxtOpen").setValue(Math.abs(vTotAmt));
                    window.dtBillDet = webix.copy(dtData);
                    window.BillVouchMod = "1";
                    $$("BilDetWindow").hide();
                }
            }
        });
    }
    else {
        if (vTotAmt > 0) $$("LblDrCr").setValue('Dr');
        else $$("LblDrCr").setValue('Cr');
        $$("TxtOpen").setValue(Math.abs(vTotAmt));
        window.dtBillDet = webix.copy(dtData);
        window.BillVouchMod = "1";
        $$("BilDetWindow").hide();
    }    
};
function formatDt23To103(StrDt) {
    //debugger;
    var Parts = StrDt.split("-");
    var Yr = Parts[0];
    var Mn = Parts[1];
    var Dt = Parts[2];
    var Str = Dt + "/" + Mn + "/" + Yr;
    return Str;
};

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        //debugger;
        var result = 0;
        var vCredit = 0;
        var vDebit = 0;
        master.data.each(function (obj) {
            //debugger; 
            if (!isNaN(obj[value.columnId]) && obj[value.columnId] != null && obj[value.columnId].toString().trim() != ""){
                result = parseFloat(result) + parseFloat(obj[value.columnId].toString().trim().replace(/,/g, ""));
            }
            if (value.columnId == "CREDIT" || value.columnId == "DEBIT") {
                if (!isNaN(obj["CREDIT"]) && obj["CREDIT"] != null && obj["CREDIT"].toString().trim() != "") {
                    vCredit = parseFloat(vCredit) + parseFloat(obj["CREDIT"].toString().trim().replace(/,/g, ""));
                }
                if (!isNaN(obj["DEBIT"]) && obj["DEBIT"] != null && obj["DEBIT"].toString().trim() != "") {
                    vDebit = parseFloat(vDebit) + parseFloat(obj["DEBIT"].toString().trim().replace(/,/g, ""));
                }
            }
        });
        debugger;
        if (vCredit == null || isNaN(vCredit) || vCredit == "") vCredit = 0;
        if (vDebit == null || isNaN(vDebit) || vDebit == "") vDebit = 0;
        result = fnCurrFormat(result.toString(), $("#VAL_DECIM_LIMIT").val());
        if ($$("txtBillDiffAmount")) {
            var vOpenAmt = $$("TxtOpen").getValue();
            var DiffAmt = 0;
            if ($$("LblDrCr").getValue() == "Dr") DiffAmt = parseFloat(vOpenAmt) - (parseFloat(vDebit) - parseFloat(vCredit));
            else DiffAmt = parseFloat(vOpenAmt) - (parseFloat(vCredit) - parseFloat(vDebit));
            if (DiffAmt < 0) {
                var strAmt = (parseFloat(DiffAmt) * -1).toString();
                $$("txtBillDiffAmount").setValue(fnCurrFormat(strAmt));
                $$("txtBillDiffAmount").define("css", { "color": "red !important" });
                $$("txtBillDiffAmount").refresh();
            }
            else {
                $$("txtBillDiffAmount").setValue(fnCurrFormat(DiffAmt.toString()));
                $$("txtBillDiffAmount").define("css", { "color": "black !important" });
                $$("txtBillDiffAmount").refresh();
            }
            
            //$$("txtBillDiffAmount").setValue(result.toString());
        }
        node.firstChild.innerHTML = result;
    }
}, webix.ui.datafilter.summColumn);

function fnLoadBillVoucherDetails(AcId) {
    Request = {
        REQTYPE: "GET_FNLOADBILLVOUCHERDETAILS",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        ACID: AcId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });

    return rowData;
};
function fnBillGridAddRow() {
    $$("gridBillVouch").editStop();
    addrow = {
        REF_TY_ID: "", REF_NM: "", DUE_DT: "", DRCR_IND: "", AMT: "", VOUCH_NO: "", VOUCH_DT: "", TRN_TY_ID: "", DIV_ID: "", CUR_ID: $("#hdnBasCurId").val(), FORN_AMT: "", CON_FAC: "",
        NAR: "", PAY_ADV_AMT: "", UPDATE_DT: "", CREDIT: "", DEBIT: ""
    };
    $$("gridBillVouch").add(addrow);
    $$("gridBillVouch").refresh();
};
function fnRetDateAdd(InputDate, InputType, InputIncCnt, RetDateFormat) {
    Request = {
        REQTYPE: "GET_FNRETDATEADD",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        DATE: InputDate, //103,
        TYPE: InputType, //Days,Years,Months
        INC_CNT: InputIncCnt,//Increament Count
        RET_FORMAT: RetDateFormat //103,121,101,...

    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);

    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });
    return rowData;
};


webix.editors.$popup.text = {
    view: "popup",
    body: { view: "textarea", width: 250, height: 90, attributes: { maxlength: 90 }, }
};

webix.editors.text = webix.extend({
    popupType: "text"
}, webix.editors.text);

function fnCurrFormat(value) {
  //  debugger;
    var Currfrmt = $("#CURRENCY_FORMAT").val(); 
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal =$("#VAL_DECIM_LIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
};
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
  //  debugger;

    if (value == null) return "";
    value = value.toString().replace(/,/g, "");
    if (value == null) return "";

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
            //if (x.indexOf('.') > 0) {
            //    afterPoint = x.substring(x.indexOf('.') + 1, x.length);
            //    afterPoint = CurrDelimit + afterPoint
            //}
            //x = Math.floor(x);
            var vArr = x.split('.');
            x = vArr[0].toString().trim();
            afterPoint = vArr[1].toString().trim();
            afterPoint = CurrDelimit + afterPoint

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
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


//webix.editors.$popup.time = {
//    view: "popup",
//    body: { view: "calendar", type: "time", icons: true }
//}
//webix.editors.textPop = webix.extend({
//    popupType: "time"
//}, webix.editors.date);



