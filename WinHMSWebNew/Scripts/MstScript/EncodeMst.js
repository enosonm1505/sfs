
var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {

    $("#LoadDIv").hide();
  //  var PartyType = ddlPartyType();
    $scope.frmMstEncoder = {

        id: "frmMstEncoder",
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
                               id: "txtEncoderId",
                               label: "Encoder Id",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 200,
                               width: 200,
                               disabled: true,
                               attributes: { maxlength: 2 }
                           },
                           {
                               view: "button",
                               id: 'btnsrchEncoderId',
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
                                       debugger;
                                       srchEncodergrid();
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
                           
                       ]
                   },
                   {
                       view: "text",
                       id: "txtName",
                       label: "Name",
                       labelAlign:"Left",
                       labelWidth: 120,
                       inputWidth: 380,
                       width: 350,
                       disabled: true,
                       attributes: { maxlength: 15 }

                   },
                ]
            }
        ]
    }
});



function srchEncodergrid() {
    debugger;
    var Dataset = fnLoadEncoderGrid();
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopUpEncoderGrid",
        head: "Encoder Search",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridMstEncoder",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                           { id: "EC_ID", header: ['Encoder Id', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                           { header: ["Encoder Name", { content: "textFilter" }], id: "EC_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["", { content: "textFilter" }], id: "A_IND", hidden:true },


                   ],
                   data: [],
                   on: {

                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridMstEncoder").getSelectedItem();
                           $$("txtEncoderId").setValue(selRow.EC_ID);
                           $$("txtName").setValue(selRow.EC_NM);
                           if (selRow.A_IND == "1") {
                               $$("ChkActive").setValue("1");
                           }
                           else
                           {
                               $$("ChkActive").setValue("0");
                           }

                           $$("gridMstEncoder").hide();
                           $$("PopUpEncoderGrid").hide();

                       },
                   },

               },

            ],

        }

    });
    $$("PopUpEncoderGrid").show();
    $$("gridMstEncoder").clearAll();
    $$("gridMstEncoder").parse(Dataset);
    $$("gridMstEncoder").refresh();
};



function fnLoadEncoderGrid() {
    debugger
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_FNENCODER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CURMODE"] = $("#hdnCurMode").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                debugger;
                rowData = JSON.parse(d);

                //var TblOutlet = rowData.TBLOUTLET;
                //$$("ddlOutlet").define("options", TblOutlet);
                //$$("ddlOutlet").refresh();
            }
        }

    });
    return rowData;
}


function fnNew() {
    debugger;
    $("#hdnCurMode").val("N");
    $$("txtEncoderId").enable();
    $$("txtName").enable();
    $$("ChkActive").enable();
    $$("ChkActive").setValue("1");
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}
function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
   // $$("txtEncoderId").enable();
    $$("txtName").enable();
    $$("ChkActive").enable();
    $$("btnsrchEncoderId").show();
    $$("ChkActive").enable();
    document.getElementById("NEW").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("REFRESH").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}
function fnView() {
    $("#hdnCurMode").val("V");
    $$("txtEncoderId").disable();
    $$("txtName").disable();
    $$("ChkActive").disable();
    $$("btnsrchEncoderId").show();

    document.getElementById("SAVE").disabled = true;
    document.getElementById("NEW").disabled = true;
    document.getElementById("OPEN").disabled = true;
    fnRemoveClass($("#hdnCurMode").val());
}

function fnRefresh() {
    debugger;
    $("#hdnCurMode").val("");
    $$("txtEncoderId").disable();
    $$("txtName").disable();
    $$("txtEncoderId").setValue("");
    $$("txtName").setValue("");
    $$("ChkActive").disable();
    $$("ChkActive").setValue("");
    $$("btnsrchEncoderId").hide();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("VIEW").disabled = false;
    fnRemoveClass($("#hdnCurMode").val());
}


function fnSave() {
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        if (bvalid == true) {
            var dataparam = {};
            var rowData = [];
            dataparam["REQTYPE"] = "GET_FNSAVEMSTENCODER";
            dataparam["COMPID"] = $("#hdnCompId").val();
            dataparam["ENCODERID"] = $$("txtEncoderId").getValue();
            dataparam["ENCODERNM"] = $$("txtName").getValue();
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



function fnValidation() {
    debugger;
    var Dataset = fnLoadChkEncId();
    if ($("#hdnCurMode").val() == "N") {

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.EC_ID) == $.trim($$("txtEncoderId").getValue());
        });

        if (Filter.length > 0) {
            AlertMessage("Record already Exists!");
            return false;
        }
    }

    if (($.trim($$("txtEncoderId").getValue()) == "")) {
        AlertMessage("Encoder Id can not be empty");
        return false;
    }

    if (($.trim($$("txtName").getValue()) == "")) {
        AlertMessage("Encoder Name can not be empty");
        return false;
    }
    
    return true;
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
        $('#VIEW').removeClass("btnButtonClick");

    } else if ($.trim(Mode) == "O") {
        $('#OPEN').addClass("btnButton btnButtonClick");
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#VIEW").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
    }
    else if ($.trim(Mode) == "V") {
        $('#VIEW').addClass("btnButton btnButtonClick");
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').removeClass("btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");

    }
    else if ($.trim(Mode) == "") {
        $('#NEW').removeClass("btnButtonClick");
        $('#REFRESH').addClass("btnButton btnButtonClick");
        $("#OPEN").removeClass("btnButtonClick");
        $("#VIEW").removeClass("btnButtonClick");
        $("#SAVE").removeClass("btnButtonClick");
    }
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

function fnLoadChkEncId() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_ENCO_ID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ENCODERID"] = $$("txtEncoderId").getValue();
    dataparam["ENCODERNM"] = $$("txtName").getValue();
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
