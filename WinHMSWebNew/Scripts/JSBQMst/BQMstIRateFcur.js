
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmMstIRate = {

        id: "frmMstIRate",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 500,
        elements: [
            {
                paddingX: 50,
                rows: [
                   {
                       cols:[
                           {
                               view: "richselect",
                               id: "ddlCurrency",
                               label: "Currency",
                               labelAlign: "Left",
                               labelWidth: 60,
                               inputWidth: 250,
                               width: 300,
                               on: {
                                   onChange: function (newval, oldval) {
                                       fnLoadOpenData();
                                   }
                               }
                           },
                           {
                               view: "richselect",
                               id: "ddlItemType",
                               label: "Item Type",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 300,
                               width: 300,
                               on: {
                                   onChange: function (newval, oldval) {
                                       fnLoadOpenData();
                                   }
                               }
                           }
                       ]
                   },
                   {
                       paddingY:20,
                     
                       cols:[
                           {
                               view: "datatable",
                               id: "grdItemrate",
                               select: "row",
                               editable: true,
                               data: [],
                               height: 430,width: 450,
                               scroll: "y",
                               columns: [
                                       { header: "ItemId", id: "ItemId", hidden: true },
                                       { header: "Item", id: "ItemNM", width: 300, css: { 'text-align': 'Left ! important' } },
                                       { header: "Rate", id: "ItemRate", width: 130, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                               ],
                               on: {

                               }
                           }
                       ]
                   }
                ]
            }
        ]
    }
});

function ClearData() {
    $$("ddlItemType").setValue("");
    $$("ddlCurrency").setValue("");

    $$("grdItemrate").clearAll();
    $$("grdItemrate").refresh();
}

function fnSaveIRateData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_IRATESAVE";
    dataparam["PROGNAME"] = "GET_MST_ITEMRATEFCUR";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["ddlCurrency"] = $.trim($$("ddlCurrency").getValue());
    dataparam["ddlItemType"] = $.trim($$("ddlItemType").getValue());

    var dsgrdMenu = $$("grdItemrate").serialize();
    var GridMenu = JSON.stringify(dsgrdMenu);
    dataparam["TBLIRATE"] = GridMenu;

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {

                    AlertMessage("created Successfully");
                    $("#btnRef").click();
                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
            }
        },
    });
}

function fnBQValidate() {

    if ($$("ddlCurrency").getValue() == "") {
        AlertMessage("Currency cannot be empty !");
        return false;
    }

    if ($$("ddlItemType").getValue() == "") {
        AlertMessage("Item Type cannot be empty !");
        return false;
    }
    return true;
}

function fnLoadOpenData() {

    if ($.trim($$("ddlCurrency").getValue()) != "" && $.trim($$("ddlItemType").getValue()) != "") {
        var dataparam = {};
        dataparam["REQTYPE"] = "GET_MST_IRATEOPEN";
        dataparam["PROGNAME"] = "GET_MST_ITEMRATEFCUR";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["ddlCurrency"] = $.trim($$("ddlCurrency").getValue());
        dataparam["ddlItemType"] = $.trim($$("ddlItemType").getValue());
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/BQMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    var rowData = JSON.parse(d);
                    $$("grdItemrate").clearAll();
                    $$("grdItemrate").parse(rowData);
                    $$("grdItemrate").refresh();
                }
            }
        });
    }
}

function fnDefaultDropLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_LOADDROPVALUE";
    dataparam["PROGNAME"] = "GET_MST_ITEMRATEFCUR";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                debugger;
                var rowData = JSON.parse(d);

                var TBLCURR = rowData.TBLCURR;

                $$("ddlCurrency").define("options", TBLCURR);
                $$("ddlCurrency").refresh();

                var TBLITEM = rowData.TBLITEM;

                $$("ddlItemType").define("options", TBLITEM);
                $$("ddlItemType").refresh();
            }
        }
    });
}