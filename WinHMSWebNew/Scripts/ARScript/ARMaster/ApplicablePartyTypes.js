

var app = angular.module('ARTApp', ['webix']);

app.controller("ARMasterController", function ($scope) {
    
    $("#LoadDIv").hide();
    $scope.frmApplPartyTypes = {

        id: "frmApplPartyTypes",
        view: 'form',
        //   position: "center",
        minWidth: 500,
        maxWidth: 500,
        height: 500,
        elements: [
            {
                paddingX: 20,
                rows: [

                    {
                        cols: [
                            {
                                view: "datatable",
                                id: "grdApplParty",
                                select: "row",
                                height: 400,
                                fixedRowHeight: false,
                                rowLineHeight: 23,
                                autoConfig: true,
                                minWidth: 150,
                                width: 420,
                                position: "flex",
                                spans: true,
                                navigation: true,
                                css: "webix_header_border wingrd_hight",
                                data: [],
                                columns: [
                                      { header: ["CurrencyId"], id: "PARTY_TY_ID", hidden: true, },
                                      { header: ["Party Type Name"], id: "PARTY_TY_NM", width: 280, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, },
                                      { header: ["Applicable"], id: "APPL_IND", width: 40, editor: 'check', template: "{common.checkbox()}", css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' }, check: true, fillspace: true }

                                ],
                                data: [],
                                on: {

                                    'onKeyPress': function (code, e) {
                                        var selRow = this.getSelectedItem();
                                        var rowid = selRow.id;
                                        var vChk = selRow.APPL_IND;
                                        if (vChk == "1") {
                                            selRow.APPL_IND = "1";
                                        }
                                        else selRow.APPL_IND = "0";

                                    },
                                }

                            },
                        ]
                    },
                ]
            }
        ]
    }
});


function fnOpen() {
    debugger;
    OPENCONTROL();
    var dataparam = {};
    var rowData = [];
    dataparam["PROGNAME"] = "GET_MST_APPLPARTY";
    dataparam["REQTYPE"] = "GET_APPLPARTY_LOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OpenMode"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != null && rowData != "") {
                    $$("grdApplParty").parse(rowData);
                    $$("grdApplParty").refresh();
                }
            }
        },
    });

}


function OPENCONTROL() {
    debugger;
    document.getElementById("btnSave").disabled = false;

}

function ClearData()
{
    $$("grdApplParty").clearAll();
    document.getElementById("btnSave").disabled = true;
}


function fnSave() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["PROGNAME"] = "GET_MST_SAVEAPPLPARTY";
    dataparam["REQTYPE"] = "GET_SAVE_APPLPARTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["APPLPARTY_GRID"] = $$("grdApplParty").serialize();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                if ($.trim(rowData) == "True") {

                    if ($("#hdnARInd").val() == "1") {
                        $("#LoadDIv").hide();
                        $("#hdnFieldId").val();
                        $("#hdnMstType").val("APPLPARTY");
                        fnARAPLMulticompPopup();
                    }
                    else {
                        SuccessMsg("Created Successfully");
                        ClearData();
                        $("#LoadDIv").hide();
                        return;
                    }
                }

                else {
                    AlertMessage("Operation failed");
                    ClearData();
                    $("#LoadDIv").hide();
                    return;
                }
            }
        },
    });
}


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
                    spans: true,
                    columns: [
                            { header: "Aids id", id: "COMPANY_ID", hidden: true, },
                            { header: "Aids id", id: "AcCd", hidden: true, },
                            { header: ["Properties"], id: "COMPANY_NM", width: 210, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Party Type Name"], id: "AcNm", width: 150, StringResult: true, css: { 'text-align': 'left ! important' } },
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

    dataparam["REQTYPE"] = "GET_MST_APPLPARTYMULCOMPDATA";
    dataparam["PROGNAME"] = "GET_MST_APPLPARTY";
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
    dataparam["REQTYPE"] = "GET_MST_APPLPARTYUPDATEACTIVEIND";
    dataparam["PROGNAME"] = "GET_MST_APPLPARTY";
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


