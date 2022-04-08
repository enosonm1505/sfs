var app = angular.module('GPApp', ['webix']);
app.controller("GPController", function ($scope) {

    var dataProp = ddlPropertyLoadFn();
    var grdcovers = fnGridCoversLoad("WS");

    
    var dataProp = ddlPropertyLoadFn();

    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disabled: false,
        options: dataProp,
        labelwidth: 130,
        on: {
            onChange: function (newval, oldval) {
                var grid = fnGridCoversLoad(newval);
                $$("grdCovers").clearAll();
                $$("grdCovers").parse(grid);
                $$("grdCovers").refresh();
            }
        }
    };


    $scope.grdCovers = {
        view: "datatable",
        id: "grdCovers",
        select: "row",
        data: grdcovers,
        height: 450,
        adjustRowHeight: true,
        fixedRowHeight: false,
        columns: [

              { header: "Sno", id: "SNO", width: 40, css: { 'text-align': 'left ! important' } },
               { header: "Outlet", id: "O_ID",css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Outlet", id: "O_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "", id: "SS_ID",  css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Session", id: "SS_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Account code", id: "A_CD", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code1", id: "A1_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code2", id: "A2_CD", width: 150, css: { 'text-align': 'center ! important'} },
               { header: "Analysis Code6", id: "A6_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "", id: "A_IND", css: { 'text-align': 'center ! important' }, hidden: true },
             
        ],
        on: {
            'onItemDblClick': function (id) {
                $("#hdnAdd").val("1");
                var itemval = $$("grdCovers").getSelectedItem()
                $("#hdnRowId").val(itemval.id);
                LoadCoverPopup();

                var outlet = fnOutlet();
                $$("ddloutlet").define("options", outlet);
                $$("ddloutlet").setValue($.trim(itemval.O_ID));

                if (itemval.A_IND == "P") {
                    $$("chkPos").setValue("1");
                    $$("chkBanq").setValue("0");
                }
                else {
                    $$("chkPos").setValue("0");
                    $$("chkBanq").setValue("1");
                }
                var session = fnSession($$("chkPos").getValue(), $$("chkBanq").getValue());
                $$("ddlsession").define("options", session);
                $$("ddlsession").setValue(itemval.SS_ID);

                $$("txtsno").setValue(itemval.SNO);
                $$("txtAccode").setValue(itemval.A_CD);


                $$("txtAnacode1").setValue(itemval.A1_CD);
                $$("txtAnacode2").setValue(itemval.A2_CD);
                $$("txtAnacode6").setValue(itemval.A6_CD);
                

            }
        }

    };
});

function ddlPropertyLoadFn() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "ddlPropertyLoadFn";
    var DataVal = JSON.stringify(dataparam);
    //DataVal = encodeURIComponent(DataVal);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "")
                rowData = JSON.parse(d);
        },
    });
    return rowData;
}

function fnSession(chkPos, chkBanq) {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_SESSION";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    if ($("#hdnSession").val() == "1") {
        dataparam["Pos"] = chkPos;
        dataparam["Banq"] = chkBanq;
    }
    else {
        dataparam["Pos"] = "1";
        dataparam["Banq"] = "0";
    }
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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

function fnOutlet() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_OUTLET";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "")
                rowData = JSON.parse(d);

        },
    });
    return rowData;
}

function fnGetProductGroupSave() {

    if ($$("ddloutlet").getValue() == "") {
        alert("Please Select Outlet");
        $$('CoverPopup').show();
        return false;
    }
    else if ($$("txtAccode").getValue() == "") {
        alert("Please Enter Account Code");
        $$("CoverPopup").show();
        return false;
    }
    //else if ($$("ddlsession").getValue() == "") {
    //    alert("Please Select Session");
    //    $$('CoverPopup').show();
    //    return false;
    //}
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_PRODGRPSAVE";
    dataparam["L_TY"] = "4";
    dataparam["SNO"] = $$("txtsno").getValue();
    dataparam["O_ID"] = $$("ddloutlet").getValue();
    dataparam["SS_ID"] = $$("ddlsession").getValue();
    dataparam["A_CD"] = $$("txtAccode").getValue();
    dataparam["A1_CD"] = $$("txtAnacode1").getValue();
    dataparam["A2_CD"] = $$("txtAnacode2").getValue();
    dataparam["A6_CD"] = $$("txtAnacode6").getValue();

    if($$("chkPos").getValue() == "1")
        dataparam["A_IND"] = "P";
    else if($$("chkBanq").getValue() == "1")
        dataparam["A_IND"] = "B";

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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

function fnaddCovers()
{
    var grd = $$("grdCovers").serialize();
    var len = grd.length;

    if ($("#hdnAdd").val() == "") {
        if (len == 0)
            $$("txtsno").setValue(len + 1);
        else {
            var sno = fnMaxSno();
            $$("txtsno").setValue(sno);
        }
    }

    var res = fnGetProductGroupSave();
    if (res == "True") {
        if ($("#hdnAdd").val() == "") {
            var addrow = {
                O_ID: $$("ddloutlet").getValue(), O_NM: $$("ddloutlet").getText(), SS_ID: $$("ddlsession").getValue(), SS_NM: $$("ddlsession").getText(),
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(),
            };
            $$("grdCovers").add(addrow);
        }
        else {
            var row_id = $("#hdnRowId").val();
            $$("grdCovers").updateItem(row_id, {
                O_ID: $$("ddloutlet").getValue(), O_NM: $$("ddloutlet").getText(), SS_ID: $$("ddlsession").getValue(), SS_NM: $$("ddlsession").getText(),
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(),
            });
        }
        $$("grdCovers").refresh();
        $$('CoverPopup').hide();
    }
}

function fnGridCoversLoad(CompId)
{
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = CompId;
    dataparam["REQTYPE"] = "GET_PRODGRPOPEN";
    dataparam["L_TY"] = "4";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "")
                rowData = JSON.parse(d);

        },
    });
    return rowData;
}

function LoadCoverPopup()
{
    var outlet = fnOutlet();
    var session = fnSession("1", "0");

    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Add/Edit Covers",
        id: 'CoverPopup',
        modal: true,
        width: 700,
        close: true,
        body: {

            rows: [

     {
         view: "combo",
         id: "ddloutlet",
         label: "Outlet",
         disabled: false,
         width: 300,
         labelwidth: 170,
         options: outlet,
     },


    {
        view: "checkbox",
        id: "chkPos",
        label: "POS",
        disabled: false,
        width: 300,
        labelwidth: 170,
        value: 1,
        on: {
            "onChange": function () {
                if ($$("chkPos").getValue() == "1") {
                    $$("chkBanq").setValue("0");
                    $("#hdnSession").val("1");
                    var rowData= fnSession($$("chkPos").getValue(), $$("chkBanq").getValue());
                    $$("ddlsession").define("options", rowData);
                    $$("ddlsession").setValue();
                }

            }
        }
    },

     {
         view: "checkbox",
         id: "chkBanq",
         label: "Banquet",
         disabled: false,
         height: 35,
         width: 300,
         labelwidth: 170,
         value: 0,
         on: {
             "onChange": function () {
                 if ($$("chkBanq").getValue() == "1") {
                     $("#hdnSession").val("1");
                     $$("chkPos").setValue("0");
                     var rowData = fnSession($$("chkPos").getValue(), $$("chkBanq").getValue());
                     $$("ddlsession").define("options", rowData);
                     $$("ddlsession").setValue();
                 }

             }
         }
     },

     
    {
        view: "combo",
        id: "ddlsession",
        label: "Session",
        disabled: false,
        width: 300,
        labelwidth: 170,
        options: session,
    },

    {
        view: "text",
        id: "txtAccode",
        label: "Account Code1",
        disabled: false,
        width: 300,
        labelwidth: 170,
        attributes: { maxlength: 10 }
    },
    {
        view: "text",
        id: "txtAnacode1",
        label: "Analysis Code1",
        disabled: false,
        width: 300,
        labelwidth: 170,
        attributes: { maxlength: 10 }
    },
    {
        view: "text",
        id: "txtAnacode2",
        label: "Analysis Code2",
        disabled: false,
        width: 300,
        labelwidth: 170,
        attributes: { maxlength: 10 }
    },
     {
         view: "text",
         id: "txtAnacode6",
         label: "Analysis Code6",
         disabled: false,
         width: 300,
         labelwidth: 200,
         attributes: { maxlength: 10 }
     },
     {
         view: "text",
         id: "txtsno",
         label: "Analysis Code6",
         hidden: true,
         width: 300,
         labelwidth: 200,
         value: "1",
     },
     

               {
                   view: 'form',
                   elements: [
                       {
                           cols: [
                               {
                                   view: 'label',
                                   label: ' ',
                                   name: 'label1',
                                   id: 'label1',
                                   labelWidth: 100,
                               },
                               {
                                   cols: [
                                       {
                                           view: 'button',
                                           type: "icon",
                                           icon: "wxi-file",
                                           label: 'Ok',
                                           minWidth: 100,
                                           align: "right",
                                           on: {
                                               onItemClick: function () {
                                                   fnaddCovers();
                                               }
                                           }
                                       },
                                       {
                                           view: 'button',
                                           type: "icon",
                                           icon: "wxi-file",
                                           label: 'Delete',
                                           minWidth: 100,
                                           align: "right",
                                           hidden: $("#hdnAdd").val() == "1" ? false : true,
                                           on: {
                                               onItemClick: function () {
                                                   var del = fnDeleteCovers();
                                                   if (del == "True") {
                                                       var row_id = $("#hdnRowId").val();
                                                       $$("grdCovers").remove(row_id);
                                                       $$("grdCovers").refresh();
                                                       $$("CoverPopup").hide();
                                                   }
                                               }
                                           }
                                       },
                                       {
                                           view: 'button',
                                           type: "icon",
                                           icon: "wxi-close",
                                           label: 'Cancel',
                                           minWidth: 100,

                                           align: "right",
                                           on: {
                                               onItemClick: function () {
                                                   $$("CoverPopup").hide();
                                               }
                                           }
                                       }
                                   ]
                               }
                           ]
                       }
                   ]
               }
            ]
        }
    }).show();

}

function fnDeleteCovers() {
    debugger;
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_DELETERECORD";
    dataparam["L_TY"] = "4";
    dataparam["SNO"] = $$("txtsno").getValue();


    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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
function fnMaxSno() {
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_MAXSNO";
    dataparam["L_TY"] = "4";


    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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