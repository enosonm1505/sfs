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
                debugger;
                fnLoadFoControl(newval);
                var grid = fnGridRevenueLoad(newval);
                $$("grdRevPanel").clearAll();
                $$("grdRevPanel").parse(grid);
                $$("grdRevPanel").refresh();
            }
        }
    };

    fnLoadFoControl("WS");

    var DataRev = fnGridRevenueLoad("WS");

    $scope.grdRevPanel = {
        view: "datatable",
        id: "grdRevPanel",
        select: "row",
        data: DataRev,
        height: 450,
        adjustRowHeight: true,
        fixedRowHeight: false,
        editable :true,
        columns: [

              { header: "Sno", id: "SNO", width: 40, css: { 'text-align': 'left ! important' } },
              { header: "", id: "R_ID", width: 200, css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Revenue", id: "REVENUE_NM", css: { 'text-align': 'center ! important' },  },
               { header: "Outlet", id: "O_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "", id: "O_ID", width: 200, css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "", id: "S_ID", width: 200, css: { 'text-align': 'center ! important' }, hidden: true },
               { header: "Segment", id: "SEG_NM", width: 200, css: { 'text-align': 'center ! important' } },
               { header: "Account code", id: "A_CD", width: 200, css: { 'text-align': 'center ! important' } },
               { header : "Allowance Code",id:"ALW_CD",width: 200, css: { 'text-align': 'center ! important' },hidden :$("#hdnG23_Ind").val() == "1" ? false :true, },
               { header: "Analysis Code1", id: "A1_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code2", id: "A2_CD", width: 150, css: { 'text-align': 'center ! important' } },
               { header: "Analysis Code6", id: "A6_CD", width: 150, css: { 'text-align': 'center ! important' } },
        ],
        on: {
            'onItemDblClick': function (id) {
                $("#hdnAdd").val("1");
                var itemval = $$("grdRevPanel").getSelectedItem()
                $("#hdnRowId").val(itemval.id);
                LoadRevenuePopup();
                
                var Revenue = fnRevenue();
                $$("ddlRevenue").define("options", Revenue);
                $$("ddlRevenue").setValue($.trim(itemval.R_ID));

                var outlet = fnOutlet();
                $$("ddloutlet").define("options", outlet);
                $$("ddloutlet").setValue($.trim(itemval.O_ID));

                var Segment = fnSegment();
                $$("ddlsegment").define("options", Segment);
                $$("ddloutlet").setValue($.trim(itemval.S_ID));

                $$("txtsno").setValue(itemval.SNO);
                $$("txtAccode").setValue(itemval.A_CD);

               
                $$("txtAnacode1").setValue(itemval.A1_CD);
                $$("txtAnacode2").setValue(itemval.A2_CD);
                $$("txtAnacode6").setValue(itemval.A6_CD);
                $$("txtAllowCode").setValue(itemval.ALW_CD);

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


function fnLoadFoControl(CompId) {
        var dataparam = {};
        var rowData = "";
        dataparam["COMPID"] = CompId;
        dataparam["REQTYPE"] = "GET_FOCONTROL";
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/SUN_MST/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);
                    $("#hdnG23_Ind").val(rowData[0].G23_IND);
                }
            },
        });
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
function fnRevenue() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_REVENUE";
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
function fnSegment() {
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_SEGMENT";
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

function fnRevenueSave() {

    if ($$("ddlRevenue").getValue() == "") {
        alert("Please Select Revenue");
        $$("RevenuePopup").show();
        return false;
    }

    else if ($$("txtAccode").getValue() == "") {
        alert("Please Enter Account Code");
        $$("RevenuePopup").show();
        return false;
    }
    
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_PRODGRPSAVE";
    dataparam["L_TY"] = "1";
    dataparam["SNO"] = $$("txtsno").getValue();
    dataparam["O_ID"] = $$("ddloutlet").getValue();
    dataparam["R_ID"] = $$("ddlRevenue").getValue();
    dataparam["S_ID"] = $$("ddlsegment").getValue();
    dataparam["A_CD"] = $$("txtAccode").getValue();
    dataparam["A1_CD"] = $$("txtAnacode1").getValue();
    dataparam["A2_CD"] = $$("txtAnacode2").getValue();
    dataparam["A6_CD"] = $$("txtAnacode6").getValue
    dataparam["ALW_CD"] = $$("txtAllowCode").getValue();

    
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

function fnaddRevenue() {
    var grd = $$("grdRevPanel").serialize();
    var len = grd.length;
    
    if ($("#hdnAdd").val() == "") {
        if(len == 0)
            $$("txtsno").setValue(len + 1);
        else {
            var sno = fnMaxSno();
            $$("txtsno").setValue(sno);
        }
    }

    var res = fnRevenueSave();
    if (res == "True") {
        if ($("#hdnAdd").val() == "") {
            var addrow = {
                REVENUE_NM: $$("ddlRevenue").getText(), O_NM: $$("ddloutlet").getText(), SEG_NM: $$("ddlsegment").getText(),
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(),
                ALW_CD: $$("txtAllowCode").getValue()
            };
            $$("grdRevPanel").add(addrow);
        }
        else {
            var row_id = $("#hdnRowId").val();
            $$("grdRevPanel").updateItem(row_id, {
                REVENUE_NM: $$("ddlRevenue").getText(), O_NM: $$("ddloutlet").getText(), SEG_NM: $$("ddlsegment").getText(),
                A_CD: $$("txtAccode").getValue(), A1_CD: $$("txtAnacode1").getValue(),
                A2_CD: $$("txtAnacode2").getValue(), A6_CD: $$("txtAnacode6").getValue(), SNO: $$("txtsno").getValue(),
                ALW_CD: $$("txtAllowCode").getValue(), O_ID: $$("ddloutlet").getValue(), R_ID: $$("ddlRevenue").getValue(),
                S_ID: $$("ddlsegment").getValue(),
            });
        }
        $$("grdRevPanel").refresh();
        $$("RevenuePopup").hide();
    }
}

function fnMaxSno() {
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_MAXSNO";
    dataparam["L_TY"] = "1";
    

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

function fnGridRevenueLoad(newval) {
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = newval;
    dataparam["REQTYPE"] = "GET_PRODGRPOPEN";
    dataparam["L_TY"] = "1";
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

function LoadRevenuePopup() {
    var Revenue = fnRevenue();
    var outlet = fnOutlet();
    var segment = fnSegment();

    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Add/Edit Revenue",
        id: 'RevenuePopup',
        modal: true,
        width: 700,
        close: true,
        body: {

            rows: [
                
     {
        view: "combo",
        id: "ddlRevenue",
        label: "Revenue",
        disabled: false,
        width: 300,
        labelwidth: 170,
        options: Revenue,
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
        view: "combo",
        id: "ddlsegment",
        label: "Segment",
        disabled: false,
        width: 300,
        labelwidth: 170,
        options: segment,
    },


    {
        view: "text",
        id: "txtAccode",
        label: "Account Code1",
        disabled: false,
        height: 35,
        width: 300,
        labelwidth: 170,
    },

    {
        view: "text",
        id: "txtAllowCode",
        label: "Allowance Code",
        disabled: false,
        height: 35,
        width: 300,
        labelwidth: 170,
        hidden: $("#hdnG23_Ind").val() == "1" ? false :true,
    },

    {
        view: "text",
        id: "txtAnacode1",
        label: "Analysis Code1",
        disabled: false,
        height: 35,
        width: 300,
        labelwidth: 170,
    },
     {
        view: "text",
        id: "txtAnacode2",
        label: "Analysis Code2",
        disabled:false,
        height: 35,
        width: 300,
        labelwidth: 170,
    },
     {
        view: "text",
        id: "txtAnacode6",
        label: "Analysis Code6",
        disabled: false,
        height: 35,
        width: 300,
        labelwidth: 200,
    },
     {
        view: "text",
        id: "txtsno",
        label: "Analysis Code6",
        hidden: true,
        height: 35,
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
                                                   fnaddRevenue();
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
                                                    var del = fnDeleteRevenue();
                                                    if (del == "True") {
                                                        var row_id = $("#hdnRowId").val();
                                                        $$("grdRevPanel").remove(row_id);
                                                        $$("grdRevPanel").refresh();
                                                        $$("RevenuePopup").hide();
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
                                                   $$("RevenuePopup").hide();
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
function fnDeleteRevenue() {
    var dataparam = {};
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_DELETERECORD";
    dataparam["L_TY"] = "1";
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