

var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {
    var dataProp = fnPropertyLoad();

    $("#LoadDIv").hide();
    $scope.frmMstGLAccount = {

        id: "frmMstGLAccount",
        view: 'form',
        minWidth: 1050,
        maxWidth: 1050,
        height: 400,
        elements: [
            {
                paddingX: 20,
                rows: [

                    {
                        
                        cols: [
                            
                            {
                                view: "text",
                                id: "ddlaccid",
                                label: " Account Id",
                                labelAlign: "Left",
                                inputWidth: 320,
                                inputHeight: 30,
                                labelWidth: 100,
                                attributes: { maxlength: 30 },
                                disabled: true,
                               
                            },
                            
                            {

                                view: "button",
                                id: 'btnsrchAccId',
                                minWidth: 250,
                                labelWidth: 0,
                                inputWidth: 30,
                                width: 690,
                                height: 28,
                                type: 'icon',
                                icon: 'wxi-search',
                                css: 'float-right',
                                hidden: true,
                                on: {
                                    onItemClick: function () {
                                        srchAccgrid();
                                        fnLoadACCScrh();
                                    }
                                }

                            },

                        ]

                    },

                    {
                        cols: [
                            {
                                view: "text",
                                id: "txtAcccName",
                                label: " Account Name",
                                labelAlign: "Left",
                                inputWidth: 320,
                                labelWidth: 100,
                                attributes: { maxlength: 30 },
                                disabled: true,
                                
                            },

                        ]

                    },

                     {
                         cols: [
                             {
                                 view: "label",
                                 id: "txtNote",
                                 label: "Note : External Account Ledger codes are defined here.This ledger code will be Linked for each Revenue Id,",
                                 labelAlign: "Left",
                                 inputWidth: 900,
                                // labelWidth: 300,
                                 css: 'Label1',
                                
                             },

                         ]

                     },
                     {
                         cols: [
                             {
                                 view: "label",
                                 id: "txtNote",
                                 label: "which has to be posted to Accounts at the end of Night Audit.",
                                 labelAlign: "Left",
                                 inputWidth: 900,
                                 // labelWidth: 300,
                                 css: 'Label1',

                             },

                         ]

                     },
                ]
            }
        ]
    }
});


function fnNew()
{
    debugger;
    $("#hdnCurMode").val("N");
    $$("ddlaccid").enable();
    $$("txtAcccName").enable();
    $$("btnsrchAccId").hide();
   // $$("ddlaccid").hide();
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
}

function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
    $$("ddlaccid").disable();
    $$("txtAcccName").enable();
    $$("btnsrchAccId").show();
    document.getElementById("NEW").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("VIEW").disabled = true;
    document.getElementById("DELETE").disabled = true;
    document.getElementById("REFRESH").disabled = false;
}

function fnRefresh()
{
    debugger;
    $("#hdnCurMode").val("");
    $$("ddlaccid").disable();
    $$("ddlaccid").setValue("");
    $$("txtAcccName").disable();
    $$("btnsrchAccId").hide();
    $$("ddlaccid").setValue("");
    $$("txtAcccName").setValue("");
    document.getElementById("SAVE").disabled = true;
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("VIEW").disabled = false;
    document.getElementById("DELETE").disabled = true;
}

function fnView()
{
    $$("ddlaccid").disable();
    $$("txtAcccName").disable();
    $$("btnsrchAccId").show();
    document.getElementById("SAVE").disabled = true;
    document.getElementById("DELETE").disabled = false;
}


function srchAccgrid() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AccountGrd",
        head: "ACCOUNT SEARCH",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridAccountGrd",
                   select: 'row',
                   css: "webix_header_border",
                   columns: [
                           { id: "AC_ID", header: ['ACCOUNT ID', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                           { header: ["ACCOUNT NAME", { content: "textFilter" }], id: "AC_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["", { content: "textFilter" }],hidden:true, id: "C_BY", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["", { content: "textFilter" }], hidden: true, id: "C_DT", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["", { content: "textFilter" }], hidden: true, id: "UPDATE_BY", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { header: ["", { content: "textFilter" }], hidden: true, id: "UPDATE_DT", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },


                   ],
                   data: [],
                   on: {

                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridAccountGrd").getSelectedItem();
                           $$("ddlaccid").setValue(selRow.AC_ID);
                           $$("txtAcccName").setValue(selRow.AC_NM);
                          // $$("txtCBY").setValue(selRow.C_BY)

                           $$("gridAccountGrd").hide();
                           $$("AccountGrd").hide();


                       },

                   },

               },



            ],
        }

    });
    $$("AccountGrd").show();
};



function fnLoadACCScrh() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_ACCCOUNT_SRCH";
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

                    $$("gridAccountGrd").parse(rowData);
                    $$("gridAccountGrd").refresh();
                }
            }
        },
    });
}

function fnSave()
{
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_FNSAVELINKACC";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["ACCID"] = $$("ddlaccid").getValue();
        dataparam["ACCNM"] = $$("txtAcccName").getValue();
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
                       
                        else
                        {
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

function fnValidation()
{
    debugger;

    var Dataset = fnLoadChkACCId();

    if ($("#hdnCurMode").val() == "N") {

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AC_ID) == $.trim($$("ddlaccid").getValue());
        });

        if (Filter.length > 0) {
            AlertMessage("Record already Exists");
            return false;
        }

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AC_NM) == $.trim($$("txtAcccName").getValue());
        });

        if (Filter.length > 0) {
            AlertMessage("Account Name already Exists");
            return false;
        }
        
    }

    if ($("#hdnCurMode").val() == "O") {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.AC_ID) != $.trim($$("ddlaccid").getValue())) && ($.trim(Dataset.AC_NM) == $.trim($$("txtAcccName").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Account Name Already  exisit !");
            return false;
        }


    }
    if (($.trim($$("ddlaccid").getValue()) == "")) {
        AlertMessage("Account Id can not be empty");
        return false;
    }
    if (($.trim($$("txtAcccName").getValue()) == "")) {
        AlertMessage("Account Name can not be empty");
        return false;
    }

   
    return true;
}


function fnRemove()
{
    debugger;
    var bvalid = fnValidation();
    if (bvalid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_FNREMOVELINKACC";
        dataparam["ACCID"] = $$("ddlaccid").getValue();
        dataparam["ACCNM"] = $$("txtAcccName").getValue();
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

function fnLoadChkACCId() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_ACC_ID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ACCID"] = $$("ddlaccid").getValue();
    dataparam["ACCNM"] = $$("txtAcccName").getValue();
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


//var pageLoad=function()
//{
//    webix.ui({ container: "divlblAccid", view: "label", id: "lblAccId", label: "Account Id" });
//    webix.ui({ container: "divtxtTxtId", view: "text", id: "ddlaccid", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 2 } });
//    webix.ui({ container: "divlblAccName", view: "label", label: "Account Name", id: "lblAccNm" });
//    webix.ui({ container: "divtxtAccName", view: "text", id: "txtAcccName", });
   
//}

