
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
    dataparam["ARInd"] = $.trim($("#hdnARInd").val());

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
                    if ($("#hdnARInd").val() == "1") {
                        $("#LoadDIv").hide();
                        $("#hdnFieldId").val($.trim($$("ddlTransType").getValue()));
                        $("#hdnMstType").val("APPLTRANS");
                        fnARAPLMulticompPopup();
                    }

                    else {

                        AlertMessage("Updated Successfully");

                        $$("ddlTransType").setValue("");

                        $$("grdApplTrans").clearAll();
                        $$("grdApplTrans").refresh();


                        $("#LoadDIv").hide();
                        return;
                    }
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

// for multicompany concept
function fnARAPLMulticompPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ARMulticompAppl",
        head: "Appicable Properties",
        position: "center",
        minWidth: 300,
        maxWidth: 800,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 600,
            elements: [
                {
                    view: "datatable",
                    id: "grdARMulCompAppl",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    spans :true,
                    columns: [
                            { header: "Aids id", id: "COMPANY_ID", hidden: true, },
                            { header: "Aids id", id: "AcCd", hidden: true, },
                            { header: ["Properties"], id: "COMPANY_NM", width: 210, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Account Name"], id: "AcNm", width: 150, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: "Current Status", id: "chkAmend", template: "{common.rcheckbox()}", width: 120, css: { 'text-align': 'center ! important' } },
                            { header: "Amend Status", id: "chkActive", template: "{common.checkbox()}", width: 120, css: { 'text-align': 'center ! important' } },
                    ],
                    
                    type: {
                        rcheckbox: function (obj, common, value, config) {
                            var checked = (value == config.checkValue) ? 'checked="true"' : '';
                            return "<input disabled class='webix_table_checkbox' type='checkbox' " + checked + ">";
                        }
                    },
                },
                {
                    PaddingY: 10,
                    cols: [
                         {
                             minWidth: 500,
                             paddingX: 445,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Save',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('ARMulticompAppl').hide();
                                                     fnUpdateApplPartyTypeActiveInd();
                                                 }
                                             }
                                         },
                                         {
                                             width: 15,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Cancel',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('ARMulticompAppl').hide();
                                                 }
                                             }
                                         },
                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

    $$("ARMulticompAppl").show();
    fnDataApplLoadMulcompany();

}

function fnDataApplLoadMulcompany() {
    var dataparam = {};
    var rowData = [];

    dataparam["REQTYPE"] = "GET_MST_APPLMULCOMPDATA";
    dataparam["PROGNAME"] = "GET_MST_APPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MASTERID"] = $.trim($("#hdnFieldId").val());
    dataparam["MSTNAME"] = $.trim($("#hdnMstType").val());
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdARMulCompAppl").parse(rowData);
                var data = $$("grdARMulCompAppl").serialize();
                var lenval = data.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if ($.trim(data[i].Appl) == "1") {
                            data[i].chkAmend = "1";
                            data[i].chkActive = "1";
                        }
                        else {
                            data[i].chkAmend = "0";
                            data[i].chkActive = "0";
                        }
                    }
                }
                $$("grdARMulCompAppl").refresh();
            }
        }
    });
}

function fnUpdateApplPartyTypeActiveInd() {
    
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_APPLTRANSUPDATEACTIVEIND";
    dataparam["PROGNAME"] = "GET_MST_APPTRANS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MASTERID"] = $.trim($("#hdnFieldId").val());
    dataparam["MSTNAME"] = $.trim($("#hdnMstType").val());

    var grdApplTrans = $$("grdARMulCompAppl").serialize();
    var GridDepart = JSON.stringify(grdApplTrans);

    dataparam["DTACTIVEGRD"] = GridDepart;
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);


    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (rowData == "SUCCESS") {
                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    $("#btnRef").click();
                    $("#LoadDIv").hide();
                }
            }
        }
    });

}

