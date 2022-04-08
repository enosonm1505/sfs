

var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {
    var Post_from = fnddlPostingFrom();
    $("#LoadDIv").hide();
    $scope.frmERPSettings = {

        id: "frmERPSettings",
        view: 'form',
        minWidth: 1250,     
        height: 950,
        elements: [
            {
                rows: [
                   {
                       height: 550,
                       id: "MTTabView",
                       view: "tabview",                   
                       type: "space",
                       tabbar: {
                       },
                       cells: [
                         {
                             header: "General",
                             body: {
                                 id: "Mainfrm",
                                 view: "form",
                                 scroll: true,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                       {
                                                           view: "richselect",
                                                           id: "ddlPostFrom",
                                                           label: "Posting From",
                                                           labelAlign: "Left",
                                                           labelWidth: 280,
                                                           inputWidth: 500,
                                                           width: 500,
                                                           options:Post_from,
                                                           on: {
                                                               onChange: function (newval, oldval) {
                                                                   debugger;
                                                                   if ($.trim(newval) == "BP01") {
                                                                       $$("ChkMemSettlement").hide();
                                                                       $$("ddlFrmPost").setValue("");
                                                                       $$("grdApplModule").enable();
                                                                       $$("grdApplModule").clearAll();
                                                                       $$("btnsrchPartyTyId").disable();
                                                                       $$("txtRoomCtrlLedger").disable();
                                                                       $$("txtRoomCtrlLedger").setValue("");
                                                                       $$("ChkFoBillNo").hide();
                                                                       $$("ChkBillNo").show();
                                                                       //$$("Billwisefrm").disable();
                                                                       
                                                                   }
                                                                   else if ($.trim(newval) == "FONA") {
                                                                       $$("ChkBillNo").hide();
                                                                       $$("ChkMemSettlement").show();
                                                                       //$$("ChkFoBillNo").show();
                                                                       $$("txtRoomCtrlLedger").disable();
                                                                       $$("grdApplModule").enable();
                                                                       $$("btnsrchPartyTyId").enable();
                                                                       $$("ddlFrmPost").enable();
                                                                       $$("ddlFrmPost").setValue("Night Audit Posting");
                                                                       $$("ChkBillNo").hide();
                                                                       //$$("Billwisefrm").enable();
                                                                       fnLoadGridAPPLMod();
                                                                   }
                                                                   else if ($.trim(newval) == "CMNA") {
                                                                       $$("ChkBillNo").hide();
                                                                       $$("ChkMemSettlement").hide();
                                                                       $$("ddlFrmPost").setValue("");
                                                                       $$("grdApplModule").enable();
                                                                       $$("grdApplModule").clearAll();
                                                                       $$("btnsrchPartyTyId").disable();
                                                                       $$("txtRoomCtrlLedger").disable();
                                                                       $$("txtRoomCtrlLedger").setValue("");
                                                                       $$("ChkFoBillNo").hide();
                                                                       //$$("Billwisefrm").disable();
                                                                    
                                                                   }
                                                                   fnddlChngPostingFrom();
                                                               }
                                                           }
                                                       },
                                                 ]
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtVoucherType",
                                                 label: "Post to Voucher Type",
                                                 labelAlign: "Left",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 attributes: { maxlength: 30 },
                                             },
                                             
                                             {
                                                 id: "ChkBillNo",
                                                 view: "checkbox",
                                                 label: "Bill No.includes MRN NO.& Bill Date",
                                                 labelAlign: "Left",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 hidden:true,
                                                 on: {
                                                     "onChange": function () {

                                                     }
                                                 }

                                             },
                                             {
                                                 id: "ChkFoBillNo",
                                                 view: "checkbox",
                                                 label: "Include FO in Bill NO",
                                                 labelAlign: "Left",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 hidden: true,
                                                 on: {
                                                     "onChange": function () {
                                                       //if  ($$("ChkFoBillNo").getValue == "1"){
                                                       //    $$("ChkFoBillNo").show();
                                                       //}
                                                       //else
                                                       //{
                                                       //    $$("ChkFoBillNo").hide();
                                                       //}
                                                     }
                                                 }
                                             },
                                             {
                                                 id: "ChkMemSettlement",
                                                 view: "checkbox",
                                                 label: "Each Member Settlement to be Posted Seperately",
                                                 labelAlign: "Left",
                                                 labelWidth: 280,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 hidden: true,
                                                 on: {
                                                     "onChange": function () {

                                                     }
                                                 }
                                             },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "Billwise",
                             id: "Billwisefrm",
                             //id: "MTBillWise",
                             disable:true,
                             body: {
                                 disable:true,
                                 view: "form",
                                 id: "Billwisefrm",
                                 select: true,
                                 height: 500,
                                 
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                       {
                                                           view: "richselect",
                                                           id: "ddlFrmPost",
                                                           label: "Posting From",
                                                           labelAlign: "Left",
                                                           labelWidth: 100,
                                                           inputWidth: 310,
                                                           width: 400,
                                                           on: {
                                                               onChange: function (newval, oldval) {

                                                               }
                                                           }
                                                       },
                                                   ]
                                              },
                                             {
                                                 cols: [
                                                     {
                                                         view: "datatable",
                                                         id: "grdApplModule",
                                                         select: "row",
                                                         height: 300,
                                                         fixedRowHeight: false,
                                                         rowLineHeight: 23,
                                                         autoConfig: true,
                                                         minWidth: 150,
                                                         width: 420,
                                                         position: "flex",
                                                         navigation: true,
                                                         css: "webix_header_border wingrd_hight",
                                                         data: [],
                                                         columns: [
                                                               { header: ["ModuleId"], id: "IxmoduleID", hidden: true, },
                                                               { header: ["Applicable Modules"], id: "IxmoduleNm", width: 280, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, },
                                                               { header: ["Billwise"], id: "APPL_IND", width: 40, editor: 'check', template: "{common.checkbox()}", css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' }, check: true, fillspace: true }

                                                         ],
                                                         data: [],
                                                         on: {
                                                             'onKeyPress': function (code, e) {
                                                                 //debugger;
                                                                 var selRow = this.getSelectedItem();
                                                                 var rowid = selRow.id;
                                                                 var vChk = selRow.APPL_IND;
                                                                 if (vChk == "1") selRow.APPL_IND = "1";
                                                                 else selRow.APPL_IND = "0";
                                                             },
                                                         }

                                                     },
                                                 ]
                                             },
                                             {
                                                 cols: [
                                                     {
                                                         view: "text",
                                                         id: "txtRoomCtrlLedger",
                                                         label: "To Room Control Ledger",
                                                         labelAlign: "Left",
                                                         labelWidth: 150,
                                                         inputWidth: 450,
                                                         width: 450,
                                                         disabled: true,
                                                         attributes: { maxlength: 40 },
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
                                                         on: {
                                                             onItemClick: function () {
                                                                 GridAccSrch();
                                                                 fnLoadGridAccScrh();
                                                             }
                                                         }
                                                     },
                                                 ]
                                              },
                                         ]
                                     }
                                 ]
                             }
                         },
                       ]
                   }
                ]
            }
        ]
     }

});

function GridAccSrch() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AccSrchGrid",
        head: "Account Search",
        position: "center",
        css: "WebIxStyle",
        height: 520,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "GridDtAccSrch",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                          { id: "AC_ID", header: ['Account Id'],hidden:true},
                           { header: ["Account Name", { content: "textFilter" }], id: "AC_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                   ],
                   data: [],
                   on: {

                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("GridDtAccSrch").getSelectedItem();
                           $$("txtRoomCtrlLedger").setValue(selRow.AC_NM);
                           $("#hdnAccId").val($.trim(selRow.AC_ID));
                           
                           $$("GridDtAccSrch").hide();
                           $$("AccSrchGrid").hide();
                       },
                   },
               },
            ],
        }

    });
    $$("AccSrchGrid").show();
};

function fnLoadGridAccScrh() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADACC_SRCH";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["POSTFROM"] = $$("ddlPostFrom").getValue();
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

                    $$("GridDtAccSrch").parse(rowData);
                    $$("GridDtAccSrch").refresh();
                }
            }
        },
    });
}

function fnLoadGridAPPLMod() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOADAPP_MOD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["POSTFROM"] = $$("ddlPostFrom").getValue();
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
                    debugger;
                    $$("grdApplModule").clearAll();
                    $$("grdApplModule").parse(rowData.dtAppMod);
                    $$("grdApplModule").refresh();
                    $$("txtRoomCtrlLedger").setValue(rowData.RoomCntrl);
                  
                }
            }
        },
    });
}

function fnddlPostingFrom() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_POSTFROM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
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
    return rowData.dtPostFrom;
}

function fnddlChngPostingFrom() {
    debugger;
    
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_CHNGPOSTFROM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["POSTFROM"] = $$("ddlPostFrom").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
            
                rowData = JSON.parse(d);
                debugger;
                $$("txtVoucherType").setValue($.trim(rowData[0]["V_TYPE"]));
                
                if (($.trim(rowData[0]["B_IND"]) == "1"))  {
                    $$("ChkBillNo").setValue("1");
                }
                else
                    $$("ChkBillNo").setValue("0");

                if ($.trim(rowData[0]["E_IND"]) == "1")
                    $$("ChkMemSettlement").setValue("0");
                else
                    $$("ChkMemSettlement").setValue("1");
                if (($.trim(rowData[0]["aa_ind"]) == "1")) {
                    if ($$("ddlPostFrom").getValue() == "FONA") {
                        $$("ChkFoBillNo").setValue("1");
                        $$("ChkFoBillNo").show();
                   }
                }
                else {
                    $$("ChkFoBillNo").setValue("0");
                }
                //if ($$("ddlPostFrom").getValue() == "FONA")
                //    $$("ChkFoBillNo").show();
              
            }
        },
    });
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

function fnSave() {
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        if (bvalid == true) {
            var dataparam = {};
            var rowData = [];
            dataparam["REQTYPE"] = "GET_FNSAVEERP_SETTINGS";
            dataparam["COMPID"] = $("#hdnCompId").val();
            dataparam["POSTINGFROM"] = $$("ddlPostFrom").getValue();
            dataparam["VOUCHERTY"] = $$("txtVoucherType").getValue();
            dataparam["CHKBILLNO"] = $.trim($$("ChkBillNo").getValue());
            dataparam["CHKFOBILLNO"] = $.trim($$("ChkFoBillNo").getValue());
            dataparam["CHKMEMSETT"] = $.trim($$("ChkMemSettlement").getValue());
            dataparam["ROOMLEDGER"] = $$("txtRoomCtrlLedger").getValue();
            dataparam["GRIDACCSRCH"] = $$("grdApplModule").serialize();
            dataparam["ACC_Id"] = $("#hdnAccId").val();

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
}


function fnValidation()
{
    debugger;
    if (($.trim($$("ddlPostFrom").getValue()) == "")) {
        AlertMessage("Posting From can not be empty");
        return false;
    }
    return true;
}

function fnRefresh()
{
    $$("ddlPostFrom").setValue("");
    $$("txtVoucherType").setValue("");
    $$("ChkBillNo").setValue("");
    $$("ChkFoBillNo").setValue("");
    $$("ChkMemSettlement").setValue("");
    $$("ddlFrmPost").setValue("");
    $$("ddlFrmPost").disable();
    $$("grdApplModule").clearAll();
    $$("grdApplModule").disable();
    $$("txtRoomCtrlLedger").setValue("");
    $$("txtRoomCtrlLedger").disable();
    $$("btnsrchPartyTyId").disable();
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

function disable() {
    debugger;
    $$("ddlFrmPost").disable();

}