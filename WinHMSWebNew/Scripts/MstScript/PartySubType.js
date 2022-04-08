

var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {

    $("#LoadDIv").hide();
    var PartyType = ddlPartyType();
    $scope.frmMstPartySubType = {

        id: "frmMstPartySubType",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtPartSubTyId",
                               label: "Party Sub Type Id",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 200,
                               width: 200,
                               disabled: true,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnsrchPartyTyId',
                               minWidth: 250,
                               labelWidth: 0,
                               width: 30,
                               height: 28,
                               type: 'icon',
                               icon: 'wxi-search',
                               css: "Ar_search",
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       srchPartySubTypegrid();
                                       fnLoadPartySubTyScrh();
                                   }
                               }
                           },
                           {
                               id: "ChkActive",
                               view: "checkbox",
                               label: "Active",
                               labelAlign: "Right",
                               labelWidth: 70,
                               width: 200,
                               disabled: true,
                               on: {
                                   "onChange": function () {

                                   }
                               }
                           },

                           {
                               view: "label",
                               id: "lblReserved",
                               label: "RESERVED",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 430,
                               width: 350,
                               hidden: true,
                               attributes: { maxlength: 40 },
                               css: 'Label3',
                           },
                       ]
                   },
                   {
                       view: "text",
                       id: "txtPartySubTyName",
                       label: "Party Sub Type Name",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 430,
                       width: 350,
                       disabled: true,
                       attributes: { maxlength: 40 }
                       
                   },
                   {
                       view: "richselect",
                       id: "ddlPartyType",
                       label: "Party Type",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 350,
                       width: 350,
                       options: PartyType,
                      
                   },
                   {
                       view: "label",
                       id: "lbl1",
                       label: "Note:While Creating Party,if Party Sub Type is Linked to Party Type,",
                       labelAlign: "Left",
                       labelWidth: 140,
                       inputWidth: 380,
                       width: 350,
                       css: 'Label1',

                   },
                   {
                       view: "label",
                       id: "lbl1",
                       label: "Party Sub Type is mandatory",
                       labelAlign: "Left",
                       labelWidth: 120,
                       inputWidth: 350,
                       width: 350,
                       css: 'Label2',
                   },
                ]
            }
        ]
    }
});

function srchPartySubTypegrid() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PartySubTypeGrid",
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
                   id: "gridPartySubType",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                           { id: "PARTY_SUB_TY_ID", header: ['Party Id', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                           { header: ["Party Sub Type Name", { content: "textFilter" }], id: "PARTY_SUB_TY_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: [""], hidden: true, id: "PARTY_TY_ID", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: [""], hidden: true, id: "APPL_IND", width: 210, fillspace: true, },
                           { header: [""], hidden: true, id: "RESERVE_IND", width: 210, fillspace: true, },
                        ],
                   data: [],
                   on: {

                       'onItemDblClick': function (id) {
                           debugger;
                           $$("lblReserved").hide();
                           var selRow = $$("gridPartySubType").getSelectedItem();
                           $$("txtPartSubTyId").setValue(selRow.PARTY_SUB_TY_ID);
                           $$("txtPartySubTyName").setValue(selRow.PARTY_SUB_TY_NM);
                           $$("ddlPartyType").setValue(selRow.PARTY_TY_ID);
                           $$("ChkActive").setValue(selRow.APPL_IND);
                           if ($("#hdnCurMode").val() == "V" || $("#hdnCurMode").val() == "O") {
                               if (selRow.RESERVE_IND == "1") {
                                   $$("lblReserved").show();
                                   if ($("#hdnCurMode").val() == "V")
                                       document.getElementById("DELETE").disabled = true;
                               }
                               else {
                                   $$("lblReserved").hide();
                                   if ($("#hdnCurMode").val() == "V")
                                       document.getElementById("DELETE").disabled = false;
                               }
                           }

                          
                           $$("gridPartySubType").hide();
                           $$("PartySubTypeGrid").hide();

                       },
                   },

               },

            ],

        }

    });
    $$("PartySubTypeGrid").show();
};


function fnLoadPartySubTyScrh() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PARTYSUBTY_SRCH";
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

                    $$("gridPartySubType").parse(rowData);
                    $$("gridPartySubType").refresh();
                }
            }
        },
    });
}


function ddlPartyType()
{
    debugger;
    
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNDDLPARTYTYPE",
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


function fnNew()
{
    debugger;
    $("#hdnCurMode").val("N");
    $$("txtPartSubTyId").enable();
    $$("txtPartySubTyName").enable();
    $$("ddlPartyType").enable();
    $$("btnsrchPartyTyId").hide();
    $$("ChkActive").enable();
    $$("ChkActive").setValue("1");
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    $$("lblReserved").hide();
}

function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
    $$("txtPartSubTyId").disable();
    $$("txtPartySubTyName").enable();
    $$("ddlPartyType").enable();
    $$("btnsrchPartyTyId").show();
    $$("ChkActive").enable();
    //$$("lblReserved").setValue("");
    document.getElementById("NEW").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    $$("lblReserved").hide();
}

function fnRefresh() {
    debugger;
    $("#hdnCurMode").val("");
    $$("txtPartSubTyId").disable();
    $$("txtPartySubTyName").disable();
    $$("ddlPartyType").disable();
    $$("txtPartSubTyId").setValue("");
    $$("txtPartySubTyName").setValue("");
    $$("ddlPartyType").setValue("");
    $$("btnsrchPartyTyId").hide();
    $$("ChkActive").setValue("");
    $$("ChkActive").disable();
    $$("lblReserved").hide();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("VIEW").disabled = false;
    document.getElementById("DELETE").disabled = true;
    $$("lblReserved").hide();
}

function fnView() {
    $("#hdnCurMode").val("V") ;
    $$("txtPartSubTyId").disable();
    $$("txtPartySubTyName").disable();
    $$("ddlPartyType").disable();
    $$("btnsrchPartyTyId").show();
    $$("ChkActive").disable();

    document.getElementById("SAVE").disabled = true;
    document.getElementById("DELETE").disabled = false;
    document.getElementById("NEW").disabled = true;
    document.getElementById("OPEN").disabled = true;
}

function fnSave()
{
    debugger;
    var bvalid = fnValidation();
    if(bvalid==true){
        if (bvalid == true) {
            var dataparam = {};
            var rowData = [];
            dataparam["REQTYPE"] = "GET_FNSAVEPARTYSUBTY";
            dataparam["COMPID"] = $("#hdnCompId").val();
            dataparam["PARTYSUBTYID"] = $$("txtPartSubTyId").getValue();
            dataparam["PARTYSUBTYNM"] = $$("txtPartySubTyName").getValue();
            dataparam["DDLPARTYTYPE"] = $$("ddlPartyType").getValue();
            dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
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
    var Dataset = fnLoadChkParTyId();
    if ($("#hdnCurMode").val() == "N") {

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.PARTY_SUB_TY_ID) == $.trim($$("txtPartSubTyId").getValue());
        });

        if (Filter.length > 0) {
            AlertMessage("Record already Exists!");
            return false;
        }
    }


    if (($.trim($$("txtPartSubTyId").getValue()) == "")) {
        AlertMessage("Party Sub Type Id can not be empty");
        return false;
    }
   
    if (($.trim($$("txtPartySubTyName").getValue()) == "")) {
        AlertMessage("Party Sub Type Name can not be empty");
        return false;
    }

    if (($.trim($$("ddlPartyType").getValue()) == "")) {
        AlertMessage("Party Type can not be empty");
        return false;
    }
    if ($("#hdnCurMode").val() == "V")
        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.RESERVE_IND) == "1";
            AlertMessage("Reserved");
            return false;
        });

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


function fnRemove() {
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_FNREMOVEPARTYTYPE";
        dataparam["PARTYSUBTYID"] = $$("txtPartSubTyId").getValue();
        dataparam["PARTYSUBTYNM"] = $$("txtPartySubTyName").getValue();
        dataparam["DDLPARTYTYPE"] = $$("ddlPartyType").getValue();
        dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
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
    dataparam["REQTYPE"] = "GET_PARTYTY_ID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PARTYSUBTYID"] = $$("txtPartSubTyId").getValue();
    dataparam["PARTYSUBTYNM"] = $$("txtPartySubTyName").getValue();
    dataparam["DDLPARTYTYPE"] = $$("ddlPartyType").getValue();
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
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