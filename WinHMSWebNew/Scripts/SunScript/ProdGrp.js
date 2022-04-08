var app = angular.module('GPApp', ['webix']);
app.controller("GPController", function ($scope) {

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
                var grid = fnGridProdLoad(newval);
                $$("grdPrdGrp").clearAll();
                $$("grdPrdGrp").parse(grid);
                $$("grdPrdGrp").refresh();
            }
        }
    };
    var grdPrdGrp = fnGridProdLoad("WS");

    $scope.grdPrdGrp = {
        view: "datatable",
        id: "grdPrdGrp",
        select: "row",
        data: grdPrdGrp,
        height: 450,
        adjustRowHeight: true,
        fixedRowHeight: false,
        columns: [

              { header: "Sno", id: "SNO", width: 40, css: { 'text-align': 'left ! important' } },
               { header: "Product Group", id: "PROD_NM", width: 200, css: { 'text-align': 'left ! important' } },
               { header: "", id: "G_ID", width: 200, css: { 'text-align': 'left ! important' }, hidden: true },
               { header: "Outlet", id: "O_ID", css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Outlet", id: "O_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Outlet", id: "SS_ID", css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Session", id: "SS_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Account code", id: "A_CD", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code1", id: "A1_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code2", id: "A2_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code6", id: "A6_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "", id: "A_IND", css: { 'text-align': 'center ! important' }, hidden: true },
              
        ],

        on: {
            'onItemDblClick': function (id) {
                $("#hdnAdd").val("1");
                var itemval = $$("grdPrdGrp").getSelectedItem()
                $("#hdnRowId").val(itemval.id);
                LoadProductGrpPopUp();
                var prodGrp = fnProduct();
                $$("ddlPrdGrp").define("options", prodGrp);
                $$("ddlPrdGrp").setValue($.trim(itemval.G_ID));

                var outlet = fnOutlet();
                $$("ddloutlet").define("options", outlet);
                $$("ddloutlet").setValue($.trim(itemval.O_ID));

                $$("txtsno").setValue(itemval.SNO);
                $$("txtAccode").setValue(itemval.A_CD);
                
                if (itemval.A_IND == "P") {
                    $$("chkPos").setValue("1");
                    $$("chkBanq").setValue("0");
                }
                else
                {
                    $$("chkPos").setValue("0");
                    $$("chkBanq").setValue("1");
                }
                var rowData = fnSession($$("chkPos").getValue(), $$("chkBanq").getValue());
                $$("ddlsession").define("options", rowData);
                $$("ddlsession").setValue(itemval.SS_ID);
                $$("txtAnacode1").setValue(itemval.A1_CD);
                $$("txtAnacode2").setValue(itemval.A2_CD);
                $$("txtAnacode6").setValue(itemval.A6_CD);
                
            }
        }

    };
});

function ddlPropertyLoadFn() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "ddlPropertyLoadFn";
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


function fnProduct() {
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_PRODUCT";
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

function fnSession(chkPos, chkBanq) {
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_SESSION";
    dataparam["Pos"] = chkPos;
    dataparam["Banq"] = chkBanq;
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
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_OUTLET";
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

    if ($$("ddlPrdGrp").getValue() == "")
    {
        alert("Please Select Product Group");
        $$("ProductGroupPopup").show();
        return false;
    }
    else if ($$("txtAccode").getValue() == "") {
        alert("Please Enter Account Code");
        $$("ProductGroupPopup").show();
        return false;
    }
    //else if ($$("ddloutlet").getValue() == "") {
    //    alert("Please Select Outlet");
    //    $$("ProductGroupPopup").show();
    //    return false;
    //}
    //else if ($$("ddlsession").getValue() == "") {
    //    alert("Please Select Session");
    //    $$("ProductGroupPopup").show();
    //    return false;
    //}
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_PRODGRPSAVE";
    dataparam["L_TY"] = "2";
    dataparam["SNO"] = $$("txtsno").getValue();
    dataparam["G_ID"] = $$("ddlPrdGrp").getValue();
    dataparam["O_ID"] = $$("ddloutlet").getValue();
    dataparam["SS_ID"] = $$("ddlsession").getValue();
    dataparam["A_CD"] = $$("txtAccode").getValue();
    dataparam["A1_CD"] = $$("txtAnacode1").getValue();
    dataparam["A2_CD"] = $$("txtAnacode2").getValue();
    dataparam["A6_CD"] = $$("txtAnacode6").getValue();
    if ($$("chkPos").getValue() == "1")
        dataparam["A_IND"] = "P";
    else if ($$("chkBanq").getValue() == "1")
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

function fnAddProdGrp()
{
    var grd = $$("grdPrdGrp").serialize();
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
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(), PROD_NM: $$("ddlPrdGrp").getText(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(), G_ID: $$("ddlPrdGrp").getValue(),
            };
            $$("grdPrdGrp").add(addrow);
        }
        else {
            var row_id = $("#hdnRowId").val();
            $$("grdPrdGrp").updateItem(row_id, {
                O_ID: $$("ddloutlet").getValue(), O_NM: $$("ddloutlet").getText(), SS_ID: $$("ddlsession").getValue(), SS_NM: $$("ddlsession").getText(),
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(), PROD_NM: $$("ddlPrdGrp").getText(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(), G_ID: $$("ddlPrdGrp").getValue(),
            });
        }
            
        $$("grdPrdGrp").refresh();
        $$("ProductGroupPopup").hide();
    }
}

function fnGridProdLoad(CompId)
{
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = CompId;
    dataparam["REQTYPE"] = "GET_PRODGRPOPEN";
    dataparam["L_TY"] = "2";
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

function LoadProductGrpPopUp()
{
    var prodGrp = fnProduct();
    var outlet = fnOutlet();
    var session = fnSession("1","0");

    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Add/Edit Product Group",
        id: 'ProductGroupPopup',
        modal: true,
        width: 700,
        close: true,
        body: {

            rows: [
                {
                    view: "combo",
                    id: "ddlPrdGrp",
                    label: "Product Group",
                    disabled: false,
                    width: 300,
                    labelwidth: 170,
                    options: prodGrp,
                    
                },
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
                    var rowData = fnSession($$("chkPos").getValue(), $$("chkBanq").getValue());
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
        attributes: { maxlength: 10 },
    },
    {
        view: "text",
        id: "txtAnacode1",
        label: "Analysis Code1",
        disabled: false,
        width: 300,
        labelwidth: 170,
        attributes: { maxlength: 10 },
        
    },
    {
        view: "text",
        id: "txtAnacode2",
        label: "Analysis Code2",
        disabled: false,
        width: 300,
        labelwidth: 170,
        attributes: { maxlength: 10 },
        
    },
     {
         view: "text",
         id: "txtAnacode6",
         label: "Analysis Code6",
         disabled: false,
         width: 300,
         labelwidth: 200,
         attributes: { maxlength: 10 },
         
     },
     {
         view: "text",
         id: "txtsno",
         label: "Analysis Code6",
         hidden: true,
         width: 300,
         labelwidth: 200,
         
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
                                                   fnAddProdGrp();
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
                                           hidden : $("#hdnAdd").val() == "1"?false:true,
                                           on: {
                                               onItemClick: function () {
                                                   var del = fnDeleteProdGroup();
                                                   if (del == "True") {
                                                       var row_id = $("#hdnRowId").val();
                                                       $$("grdPrdGrp").remove(row_id);
                                                       $$("grdPrdGrp").refresh();
                                                       $$("ProductGroupPopup").hide();
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
                                                   
                                                   $$("ProductGroupPopup").hide();
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

function fnDeleteProdGroup() {
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_DELETERECORD";
    dataparam["L_TY"] = "2";
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
    dataparam["L_TY"] = "2";


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