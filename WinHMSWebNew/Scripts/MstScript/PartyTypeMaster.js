

var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {

    $("#LoadDIv").hide();
    var PartyLength = [{ "id": "4", "value": "4" }, { "id": "5", "value": "5" }, { "id": "6", "value": "6" }];
    //var GLLedAcc = ddlGLLedAcc();
    $scope.frmMstPartyType = {

        id: "frmMstPartyType",
        view: 'form',
        minWidth: 1540,
        maxWidth: 1540,
        height: 550,
        scroll:true,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtPartyTyId",
                               label: "Party Type Id",
                               labelAlign: "Left",
                               labelWidth: 210,
                               inputWidth: 280,
                               width: 280,
                               disabled: true,
                               attributes: { maxlength: 1 },
                           },
                           {
                               view: "button",
                               id: 'btnsrchPartyTyId',
                               minWidth: 300,
                               labelWidth: 0,
                               width: 30,
                               height: 28,
                               type: 'icon',
                               icon: 'wxi-search',
                               css: "Ar_search",
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       srchPartyTypegrid();
                                       fnLoadPartyTyScrh();
                                   }
                               }
                           },
                       ]
                   },
                   {
                       view: "text",
                       id: "txtPartyTyNm",
                       label: "Party Type Name",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 430,
                       width: 350,
                       disabled: true,
                       attributes: { maxlength: 15 },
                   },
                   {
                       id: "ChkShrtNm",
                       view: "checkbox",
                       label: "Short Name Applicable",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           "onChange": function () {

                           }
                       }

                   },
                   {
                       id: "ChkBlkListParty",
                       view: "checkbox",
                       label: " Black List of Party Applicable",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           "onChange": function () {

                           }
                       }

                   },
                   {
                       id: "ChkPartyType",
                       view: "checkbox",
                       label: "Party Type Applicable",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       id: "ChkAcLedger",
                       view: "checkbox",
                       label: "In Party Master,AC Ledger Mandatory",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           onChange: function (newval, oldval) {
                               if ($.trim(newval) == "1") {
                                   $$("ddlGLLedgAcc").show();
                                   ddlGLLedAcc();
                               }
                               else {
                                   $$("ddlGLLedgAcc").hide();
                                   ddlGLLedAcc();
                               }
                               if ($$("ChkAcLedger").getValue() == "1") {
                                   $$("lblGlLedACCNote").show();
                               }
                               else
                               {
                                   $$("lblGlLedACCNote").hide();
                               }
                           }
                       }
                   },
                   {
                       id: "ddlGLLedgAcc",
                       view: "richselect",
                       label: "GL Ledger Account",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 500,
                       width: 350,
                       disabled: true,
                       attributes: { maxlength: 40 },
                       //options: GLAcc,
                       //value: "NONE",
                       hidden: true,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       view: "label",
                       id: "lblGlLedACCNote",
                       label: "Note:For Party Master creation this ledger alone is selectable",
                       labelAlign: "Left",
                       labelWidth: 140,
                       inputWidth: 380,
                       width: 350,
                       hidden: true,
                       css: 'Label3',
                   },
                   {
                       id: "chkPartyGrp",
                       view: "checkbox",
                       label: "Party Group Applicable,Yes",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           "onChange": function () {

                           }
                       }
                   },
                   {
                       id: "ChkPartyId",
                       view: "checkbox",
                       label: "Party ID to be Generated",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 600,
                       width: 200,
                       disabled: true,
                       on: {
                           onChange: function (newval, oldval) {
                               //$$("txtPrefix").hide();
                               if ($.trim(newval) == "1") 
                               {
                                   $$("ddlPartyTyLen").show();
                                   $$("ddlPartyTyLen").setValue("4");
                                   $$("txtPrefix").show();
                               }
                               else
                               {
                                   $$("ddlPartyTyLen").hide();
                                   $$("txtPrefix").hide();
                               }
                           }
                       }
                   },
                   {
                       view: "richselect",
                       id: "ddlPartyTyLen",
                       label: "Length",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 330,
                       width: 350,
                       hidden: true,
                       options: PartyLength,
                       value : "4",
                       on: {
                           onChange: function (newval, oldval) {
                               if ($.trim(newval) == "6") {
                                   $$("txtPrefix").hide();
                               }
                               else {
                                   $$("txtPrefix").show();
                               }
                           }
                       }
                   },
                   {
                       view: "text",
                       id: "txtPrefix",
                       label: "Prefix with",
                       labelAlign: "Left",
                       labelWidth: 210,
                       inputWidth: 330,
                       width: 350,
                       hidden: true,
                       disabled: true,
                       attributes: { maxlength: 2 },
                       
                   },

                    {
                        cols: [
                        {
                            view: "checkbox",
                            id: "ChkCustField1",
                            label: "Custom Field 1 Applicable",
                            labelAlign: "Left",
                            labelWidth: 210,
                            inputWidth: 450,
                            width: 270,
                            minwidth: 250,
                            
                            disabled: true,
                            on: {
                                onChange: function (newval, oldval) {
                                    if ($.trim(newval) == "1") 
                                        {
                                            $$("txtCaption1").show();
                                        }
                                    else
                                    {
                                        $$("txtCaption1").hide();
                                    }
                                }
                            }
                        },
                        {
                            view: "text",
                            id: "txtCaption1",
                            label: "Caption",
                            labelAlign: "left",
                            labelWidth: 80,
                            inputWidth: 300,
                            width: 500,
                            minwidth: 500,
                            disabled: true,
                            hidden:true,
                            attributes: { maxlength: 30 },

                        },
                     ]
                    },
                     {
                         cols: [
                         {
                                 view: "checkbox",
                                 id: "ChkCustField2",
                                 label: "Custom Field 2 Applicable",
                                 labelAlign: "Left",
                                 labelWidth: 210,
                                 inputWidth: 450,
                                 width: 270,
                                 minwidth: 250,
                                 disabled: true,
                                 on: {
                                     onChange: function (newval, oldval) {
                                         if ($.trim(newval) == "1") 
                                             {
                                                 $$("txtCaption2").show();
                                             }
                                          else
                                            {
                                              $$("txtCaption2").hide();
                                             }

                                         }
                                     }
                                 },
                         {
                             view: "text",
                             id: "txtCaption2",
                             label: "Caption",
                             labelAlign: "left",
                             labelWidth: 80,
                             inputWidth: 300,
                             width: 500,
                             minwidth: 500,
                             disabled: true,
                             hidden: true,
                             attributes: { maxlength: 30 },

                         },
                         ]
                     },
                     {
                         cols: [
                         {
                             view: "checkbox",
                             id: "ChkCustField3",
                             label: "Custom Field 3 Applicable",
                             labelAlign: "Left",
                             labelWidth: 210,
                             inputWidth: 450,
                             width: 270,
                             minwidth: 250,
                             disabled: true,
                             on: {
                                 onChange: function (newval, oldval) {
                                     if ($.trim(newval) == "1") 
                                         {
                                             $$("txtCaption3").show();
                                         }
                                     else
                                     {
                                         $$("txtCaption3").hide();
                                     }

                                   }
                                 }
                              },
                         {
                             view: "text",
                             id: "txtCaption3",
                             label: "Caption",
                             labelAlign: "left",
                             labelWidth: 80,
                             inputWidth: 300,
                             width: 500,
                             minwidth: 500,
                             disabled: true,
                             hidden: true,
                             attributes: { maxlength: 30 },

                         },
                         ]
                     },
                     {
                         cols: [
                         {
                             view: "checkbox",
                             id: "ChkCustField4",
                             label: "Custom Field 4 Applicable",
                             labelAlign: "Left",
                             labelWidth: 210,
                             inputWidth: 450,
                             width: 270,
                             minwidth: 250,
                             disabled: true,
                             on: {
                                 onChange: function (newval, oldval) {
                                     if ($.trim(newval) == "1") 
                                         {
                                             $$("txtCaption4").show();
                                         }
                                     else
                                     {
                                         $$("txtCaption4").hide();
                                     }
                                 }
                             }
                         },
                         {
                             view: "text",
                             id: "txtCaption4",
                             label: "Caption",
                             labelAlign: "left",
                             labelWidth: 80,
                             inputWidth: 300,
                             width: 500,
                             minwidth: 500,
                             disabled: true,
                             hidden: true,
                             attributes: { maxlength: 30 },

                         },
                      ]
                     },

                     {
                         cols: [
                         {
                             view: "checkbox",
                             id: "ChkCustField5",
                             label: "Custom Field 5 Applicable",
                             labelAlign: "Left",
                             labelWidth: 210,
                             inputWidth: 450,
                             width: 270,
                             minwidth: 250,
                             disabled: true,
                             on: {
                                 onChange: function (newval, oldval) {
                                     if ($.trim(newval) == "1") 
                                         {
                                             $$("txtCaption5").show();
                                         }
                                     else
                                     {
                                         $$("txtCaption5").hide();
                                     }
                                 }
                             }
                         },
                         {
                             view: "text",
                             id: "txtCaption5",
                             label: "Caption",
                             labelAlign: "left",
                             labelWidth: 80,
                             inputWidth: 300,
                             width: 500,
                             minwidth: 500,
                             disabled: true,
                             hidden: true,
                             attributes: { maxlength: 30 },

                         },
                       ]
                     },
                      {
                          id: "ChkPanNoAppl",
                          view: "checkbox",
                          label: "Pan No Applicable",
                          labelAlign: "Left",
                          labelWidth: 210,
                          inputWidth: 600,
                          width: 200,
                          hidden:true,
                          disabled: true,
                          on: {
                              "onChange": function () {

                              }
                          }
                      },
                       {
                           view: "label",
                           id: "lbl1",
                           label: "Note:For Updating to Gl Account,settings are to be made at",
                           labelAlign: "Left",
                           labelWidth: 140,
                           inputWidth: 380,
                           width: 350,
                           css: 'Label1',

                       },
                       {
                           view: "label",
                           id: "lbl1",
                           label: "Company Setting & GL Account(as Control A/c)",
                           labelAlign: "Left",
                           labelWidth: 140,
                           inputWidth: 380,
                           width: 350,
                           css: 'Label2',
                     },
                ]
            }
        ]
    }
});

function fnEnable()
{
    debugger;
    $$("txtPartyTyId").enable();
    $$("btnsrchPartyTyId").enable();
    $$("txtPartyTyNm").enable();
    $$("ChkShrtNm").enable();
    $$("ChkBlkListParty").enable();
    $$("ChkPartyType").enable();
    $$("ChkAcLedger").enable();
    $$("ddlGLLedgAcc").enable();
    $$("chkPartyGrp").enable();
    $$("ChkPartyId").enable();
    $$("ddlPartyTyLen").enable();
    $$("txtPrefix").enable();
    $$("ChkCustField1").enable();
    $$("ChkCustField2").enable();
    $$("ChkCustField3").enable();
    $$("ChkCustField4").enable();
    $$("ChkCustField5").enable();
    $$("ChkPanNoAppl").enable();
    $$("txtCaption1").enable();
    $$("txtCaption2").enable();
    $$("txtCaption3").enable();
    $$("txtCaption4").enable();
    $$("txtCaption5").enable();
}

function fnDisable() {
    debugger;
    $$("txtPartyTyId").disable();
    $$("btnsrchPartyTyId").disable();
    $$("txtPartyTyNm").disable();
    $$("ChkShrtNm").disable();
    $$("ChkBlkListParty").disable();
    $$("ChkPartyType").disable();
    $$("ChkAcLedger").disable();
    $$("ddlGLLedgAcc").disable();
    $$("chkPartyGrp").disable();
    $$("ChkPartyId").disable();
    $$("ddlPartyTyLen").disable();
    $$("txtPrefix").disable();
    $$("ChkCustField1").disable();
    $$("ChkCustField2").disable();
    $$("ChkCustField3").disable();
    $$("ChkCustField4").disable();
    $$("ChkCustField5").disable();
    $$("ChkPanNoAppl").disable();
    $$("txtCaption1").disable();
    $$("txtCaption2").disable();
    $$("txtCaption3").disable();
    $$("txtCaption4").disable();
    $$("txtCaption5").disable();
}

function ClearValues() {
    debugger;
    $$("txtPartyTyId").setValue("");
    //$$("btnsrchPartyTyId").setValue
    $$("txtPartyTyNm").setValue("");
    $$("ChkShrtNm").setValue("");
    $$("ChkBlkListParty").setValue("");
    $$("ChkPartyType").setValue("");
    $$("ChkAcLedger").setValue("");
    $$("ddlGLLedgAcc").setValue("");
    $$("chkPartyGrp").setValue("");
    $$("ChkPartyId").setValue("");
    $$("ddlPartyTyLen").setValue("");
    $$("txtPrefix").setValue("");
    $$("ChkCustField1").setValue("");
    $$("ChkCustField2").setValue("");
    $$("ChkCustField3").setValue("");
    $$("ChkCustField4").setValue("");
    $$("ChkCustField5").setValue("");
    $$("ChkPanNoAppl").setValue("");
    $$("txtCaption1").setValue("");
    $$("txtCaption2").setValue("");
    $$("txtCaption3").setValue("");
    $$("txtCaption4").setValue("");
    $$("txtCaption5").setValue("");
}


function fnNew()
{
    debugger;
    $("#hdnCurMode").val("N");
    fnEnable();
    $$("txtPrefix").hide();
    $$("btnsrchPartyTyId").hide();
    $$("ChkPartyType").setValue("1");
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}

function fnOpen()
{
    debugger;
    fnEnable();
    $("#hdnCurMode").val("O");
    $$("btnsrchPartyTyId").show();
    $$("txtPrefix").hide();
    $$("txtPartyTyId").disable();
    //$$("ddlPartyTyLen").setValue("4");
    document.getElementById("NEW").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}

function fnView()
{
    $("#hdnCurMode").val("V");
    $$("btnsrchPartyTyId").show();
    $$("btnsrchPartyTyId").enable();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("DELETE").disabled = false;
    document.getElementById("NEW").disabled = true;
    document.getElementById("OPEN").disabled = true;
    fnRemoveClass($("#hdnCurMode").val());
}

function fnRefresh()
{
    debugger;
    $("#hdnCurMode").val("");
    ClearValues();
    fnDisable();
    $$("btnsrchPartyTyId").hide();
    $$("lblGlLedACCNote").hide();
    $$("txtPrefix").hide();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("VIEW").disabled = false;
    document.getElementById("DELETE").disabled = true;
    fnRemoveClass($("#hdnCurMode").val());
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

function srchPartyTypegrid() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PartyTypeGrid",
        head: "Party Search",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridPartyType",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                           { id: "PARTY_TY_ID", header: ['Party Id', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                           { header: ["Party Type Name", { content: "textFilter" }], id: "PARTY_TY_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { id: "SHRT_NM_APPL_IND", header: [""],hidden:true },
                           { id: "BLACK_LIST_APPL_IND", header: [""], hidden: true },
                           { id: "APPL_IND", header: [""], hidden: true },
                           { id: "AC_CD_IND", header: [""], hidden: true },
                           { id: "DEFAULT_AC_ID", header: [""], hidden: true },
                           { id: "B_IND", header: [""], hidden: true },
                           { id: "A_IND", header: [""], hidden: true },
                           { id: "H_L", header: [""], hidden: true },
                           { id: "P_X", header: [""], hidden: true },
                           { id: "A5_IND", header: [""], hidden: true },
                           { id: "B5_IND", header: [""], hidden: true },
                           { id: "C5_IND", header: [""], hidden: true },
                           { id: "D5_IND", header: [""], hidden: true },
                           { id: "E5_IND", header: [""], hidden: true },
                           { id: "A5_CP", header: [""], hidden: true },
                           { id: "B5_CP", header: [""], hidden: true },
                           { id: "C5_CP", header: [""], hidden: true },
                           { id: "D5_CP", header: [""], hidden: true },
                           { id: "E5_CP", header: [""], hidden: true },
                           { id: "J_IND", header: [""], hidden: true },
                     ],
                   data: [],
                   on: {
                       'onItemDblClick': function (id) {
                           debugger;
                           fnOpenPartySrch();
                       },
                   },
               },
            ],
        }
    });
    $$("PartyTypeGrid").show();
};

function fnOpenPartySrch()
{
    debugger;
    ddlGLLedAcc();
   // $$("ddlGLLedgAcc").refresh();
    var selRow = $$("gridPartyType").getSelectedItem();
    $$("txtPartyTyId").setValue($.trim(selRow.PARTY_TY_ID));
    $$("txtPartyTyNm").setValue($.trim(selRow.PARTY_TY_NM));
    $$("ChkShrtNm").setValue($.trim(selRow.SHRT_NM_APPL_IND));
    $$("ChkBlkListParty").setValue($.trim(selRow.BLACK_LIST_APPL_IND));
    $$("ChkPartyType").setValue($.trim(selRow.APPL_IND));
    $$("ChkAcLedger").setValue($.trim(selRow.AC_CD_IND));
    $$("ddlGLLedgAcc").setValue($.trim(selRow.DEFAULT_AC_ID));
    $$("chkPartyGrp").setValue($.trim(selRow.B_IND));
    $$("ChkPartyId").setValue($.trim(selRow.A_IND));
    $$("ddlPartyTyLen").setValue($.trim(selRow.H_L));
    $$("txtPrefix").setValue($.trim(selRow.P_X));
    $$("ChkCustField1").setValue($.trim(selRow.A5_IND));
    $$("ChkCustField2").setValue($.trim(selRow.B5_IND));
    $$("ChkCustField3").setValue($.trim(selRow.C5_IND));
    $$("ChkCustField4").setValue($.trim(selRow.D5_IND));
    $$("ChkCustField5").setValue($.trim(selRow.E5_IND));
    $$("txtCaption1").setValue($.trim(selRow.A5_CP));
    $$("txtCaption2").setValue($.trim(selRow.B5_CP));
    $$("txtCaption3").setValue($.trim(selRow.C5_CP));
    $$("txtCaption4").setValue($.trim(selRow.D5_CP));
    $$("txtCaption5").setValue($.trim(selRow.E5_CP));
    $$("ChkPanNoAppl").setValue($.trim(selRow.J_IND));

    if ($$("ddlPartyTyLen").getValue() == "") {
        $$("ddlPartyTyLen").setValue("4");
    }
    if (($$("txtPartyTyId").getValue() == "S")||($$("txtPartyTyId").getValue() == "C")) {
        $$("ChkPanNoAppl").show();
    }
    else
    {
        $$("ChkPanNoAppl").hide();
    }
    if ($$("ChkPartyId").getValue() == "1") {
        $$("txtPrefix").show();
    }
    else {
        $$("txtPrefix").hide();
    }
    if ($$("ddlPartyTyLen").getValue() == "6")
    {
        $$("txtPrefix").hide();
    }
    
    $$("gridPartyType").hide();
    $$("PartyTypeGrid").hide();
}

function fnLoadPartyTyScrh() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PARTYTY_SRCH";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != null && rowData != "") {

                    $$("gridPartyType").parse(rowData);
                    $$("gridPartyType").refresh();
                }
            }
        },
    });
}

function fnSave() {
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        if (bvalid == true) {
            var dataparam = {};
            var rowData = [];
            dataparam["REQTYPE"] = "GET_FNSAVEMSTPARTY";
            dataparam["COMPID"] = $("#hdnCompId").val();
            dataparam["PARTYTYID"] = $$("txtPartyTyId").getValue();
            dataparam["PARTYTYNM"] = $$("txtPartyTyNm").getValue();
            dataparam["SHRTNM_APPL"] = $$("ChkShrtNm").getValue();
            dataparam["BLKLIST_APPL"] = $.trim($$("ChkBlkListParty").getValue());
            dataparam["PARTYTY_APPL"] = $.trim($$("ChkPartyType").getValue());
            dataparam["ACLEDGER_MAND"] = $.trim($$("ChkAcLedger").getValue());
            dataparam["GLLEDGER_ACC"] = $.trim($$("ddlGLLedgAcc").getValue());
            dataparam["PARTYGRP_APPL"] = $.trim($$("chkPartyGrp").getValue());
            dataparam["PARTYID_GEN"] = $.trim($$("ChkPartyId").getValue());
            dataparam["DDLLENGTH"] = $.trim($$("ddlPartyTyLen").getValue());
            dataparam["PREFIX"] = $.trim($$("txtPrefix").getValue());
            dataparam["CUSFILED1_APPL"] = $.trim($$("ChkCustField1").getValue());
            dataparam["CUSFILED2_APPL"] = $.trim($$("ChkCustField2").getValue());
            dataparam["CUSFILED3_APPL"] = $.trim($$("ChkCustField3").getValue());
            dataparam["CUSFILED4_APPL"] = $.trim($$("ChkCustField4").getValue());
            dataparam["CUSFILED5_APPL"] = $.trim($$("ChkCustField5").getValue());
            dataparam["CAPTION1"] = $.trim($$("txtCaption1").getValue());
            dataparam["CAPTION2"] = $.trim($$("txtCaption2").getValue());
            dataparam["CAPTION3"] = $.trim($$("txtCaption3").getValue());
            dataparam["CAPTION4"] = $.trim($$("txtCaption4").getValue());
            dataparam["CAPTION5"] = $.trim($$("txtCaption5").getValue());
            dataparam["PANNO_APPL"] = $.trim($$("ChkPanNoAppl").getValue());
            dataparam["CURMODE"] = $("#hdnCurMode").val();
            var DataVal = JSON.stringify(dataparam);
            $.ajax({
                async: true,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + DataVal,
                success: function (data) {
                    if (data != "") {
                        rowData = JSON.parse(data);
                        if ($.trim(rowData) == "True") {
                            if ($("#hdnCurMode").val() == "N") {
                                SuccessMsg("Created Successfully");
                            }
                            else {
                                SuccessMsg("Updated Successfully");
                            }
                            fnRefresh();
                            $("#LoadDIv").hide();
                            return;
                        }
                        else if ($.trim(rowData) == "false") {
                            AlertMessage("Operation failed");
                            fnRefresh();
                            $("#LoadDIv").hide();
                            return;
                        }
                        else {
                            AlertMessage($.trim(rowData));
                            $("#LoadDIv").hide();
                            return;
                        }
                    }
                },
            });
        }
    }
}


function fnValidation()
{
    debugger;

    var Dataset = fnLoadChkParTyId();
    if ($("#hdnCurMode").val() == "N") {

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.PARTY_TY_ID) == $.trim($$("txtPartyTyId").getValue());
        });
        if (Filter.length > 0) {
            AlertMessage("Record already Exists!");
            return false;
        }

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.PARTY_TY_NM) == $.trim($$("txtPartyTyNm").getValue());
        });
        if (Filter.length > 0) {
            AlertMessage("Party Type Name already Exists!");
            return false;
        }
    }

    if (($.trim($$("txtPartyTyId").getValue()) == "")) {
        AlertMessage("Party Type Id can not be empty");
        return false;
    }
    if (($.trim($$("txtPartyTyNm").getValue()) == "")) {
        AlertMessage("Party Type Name can not be empty");
        return false;
    }
    if ($$("ChkCustField1").getValue() == "1") {
        if (($.trim($$("txtCaption1").getValue()) == "")) {
            AlertMessage("Caption can not be empty");
            return false;
        }
    }
    if ($$("ChkCustField2").getValue() == "1") {
        if (($.trim($$("txtCaption2").getValue()) == "")) {
            AlertMessage("Caption can not be empty");
            return false;
        }
    }  
       
    if ($$("ChkCustField3").getValue() == "1") {
        if (($.trim($$("txtCaption3").getValue()) == "")) {
            AlertMessage("Caption can not be empty");
            return false;
        }
    }
    if ($$("ChkCustField4").getValue() == "1") {
        if (($.trim($$("txtCaption4").getValue()) == "")) {
            AlertMessage("Caption can not be empty");
            return false;
        }
    }
    if ($$("ChkCustField5").getValue() == "1") {
            if (($.trim($$("txtCaption5").getValue()) == "")) {
                AlertMessage("Caption can not be empty");
                return false;
            }
        }
    return true;
}

function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function ddlLength() {
    debugger;
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNDDLLENGTH",
        COMPID: $("#hdnCompId").val(),
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });
    return rowData;
}


function ddlGLLedAcc() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var Party_Id = $$("txtPartyTyId").getValue();
    Request = {
        REQTYPE: "GET_FNDDLGLACC",
        COMPID: $("#hdnCompId").val(),
        PARTYTYID: Party_Id,
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                rowData.splice(0, 0, { value: "<-NONE->", id: "<-NONE->" });
                $$("ddlGLLedgAcc").setValue("<-NONE->")
                $$("ddlGLLedgAcc").define("options", rowData);
                $$("ddlGLLedgAcc").refresh();
            }
        },
    });
    return rowData;
}


function fnPropertyLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function fnLoadChkParTyId() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PARTY_ID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PARTYTYID"] = $$("txtPartyTyId").getValue();
    dataparam["PARTYTYNM"] = $$("txtPartyTyNm").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function fnRemove() {
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_FNREMOVE_PARTYTYPE";
        dataparam["PARTYTYID"] = $$("txtPartyTyId").getValue();
        dataparam["PARTYTYNM"] = $$("txtPartyTyNm").getValue();
        var DataVal = JSON.stringify(dataparam);

        $.ajax({
            async: true,
            url: "/Master/MSTAPI_CALL",
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