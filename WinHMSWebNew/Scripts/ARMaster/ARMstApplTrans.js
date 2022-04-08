
var app = angular.module('ARTApp', ['webix']);

app.controller("ARMasterController", function ($scope) {

    $("#LoadDIv").hide();

    $scope.frmApplTrans = {

        id: "frmApplTrans",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 550,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       view: "richselect",
                       id: "ddlTransType",
                       label: " Transaction Type",
                       labelAlign: "Right",
                       labelWidth: 165,
                       inputWidth: 390,
                       width: 390,
                       on: {
                           onChange: function (newval, oldval) {
                               fnLoadTransaction();
                           }
                       }
                   },
                   {height:10,},
                   {
                       width: 450,
                       cols: [
                           {
                               view: "datatable",
                               id: "grdApplTrans",
                               select: "row",
                               css: "common_grd",
                               disable: true,
                               data: [],
                               scroll:"y",
                               editable: true,
                               width: 450,
                               height: 450,
                               columns: [
                                       { header: "AcId", id: "AcCd", hidden: true },
                                       { header: "Account Name", id: "AcNm", width: 350, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, },
                                       { header: "Applicable", id: "Appl", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 100, css: { 'text-align': 'center ! important' } },
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

function fnDisable() {
    $$("ddlTransType").disable();
    $$("grdApplTrans").disable();
}

function fnEnable() {
    $$("ddlTransType").enable();
    $$("grdApplTrans").enable();
}

function fnSaveGLACCData() {

    if ($.trim($$("ddlTransType").getValue()) == "") {
        AlertMessage("Select Transaction Type");
        return;
    }

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_APPLTRANSSAVE";
    dataparam["PROGNAME"] = "GET_MST_APPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ddlTrnTy"] = $.trim($$("ddlTransType").getValue());

    var grdApplTrans = $$("grdApplTrans").serialize();
    var GridDepart = JSON.stringify(grdApplTrans);

    dataparam["TBLAPPLTRANS"] = GridDepart;

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
   
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/ARMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                var rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    AlertMessage("Updated Successfully");

                    $$("ddlTransType").setValue("");

                    $$("grdApplTrans").clearAll();
                    $$("grdApplTrans").refresh();
                   

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

function fnLoadTransaction() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_APPLTRANSOPEN";
    dataparam["PROGNAME"] = "GET_MST_APPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ddlTrnTy"] = $$("ddlTransType").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                $$("grdApplTrans").clearAll();
                $$("grdApplTrans").parse(rowData);
                $$("grdApplTrans").refresh();
            }
        }
    });
}

function fnDropLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_DROPLOAD";
    dataparam["PROGNAME"] = "GET_MST_APPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                if (rowData.length > 0) {
                    $$("ddlTransType").define("options", rowData);
                    $$("ddlTransType").refresh();
                }
            }
        }
    });
}
