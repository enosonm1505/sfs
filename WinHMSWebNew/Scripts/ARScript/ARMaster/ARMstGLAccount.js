
var app = angular.module('ARTApp', ['webix']);

app.controller("ARMasterController", function ($scope) {

    $("#LoadDIv").hide();

    var ArCont = fnMstARControl();
    var dataSettleTy = fnSettleTyLoad();
    $scope.frmGlAccLink = {

        id: "frmGlAccLink",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtAcId",
                               label: "Ac CD",
                               labelAlign: "Right",
                               labelWidth: 145,
                               inputWidth: 240,
                               width: 240,
                               attributes: { maxlength: 6 },
                               on: {
                                   onKeyPress: function (code, evt) {

                                     
                                   }
                               }

                           },
                           {
                               view: "button",
                               id: 'btnTrnSrch',
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
                                       fnCallInfPopup();
                                   }
                               }
                           },
                            {
                                id: "chkActive",
                                view: "checkbox",
                                label: "Active",
                                labelAlign: "Right",
                                labelWidth: 170,
                                width: 200,
                                
                            },
                           {width:300,},
                           {
                               view: "label",
                               id: "txtReslab",
                               label: "Reserved",
                               hidden: true,
                               css: "RedColor"
                           },
                       ]
                   },
                   {
                       view: "text",
                       id: "txtAcNm",
                       label: "Ac Name",
                       labelAlign: "Right",
                       labelWidth: 145,
                       inputWidth: 460,
                       width: 460,
                   },
                    {
                        view: "richselect",
                        id: "ddlSettleTy",
                        value: "NONE",
                        label: "Settle Type",
                        labelAlign: "Right",
                        labelWidth: 145,
                        inputWidth: 300,
                        width: 460,
                        options: dataSettleTy,
                        on: {
                            onChange: function (newval, oldval) {
                                // $("#hdnCompId").val(newval);
                            }
                        }
                    },
                   {
                       cols: [
                         {
                             view: "text",
                             id: "txtLinkAcc",
                             label: "Link GL Account",
                             labelAlign: "Right",
                             labelWidth: 145,
                             inputWidth: 460,
                             width: 460,
                             readonly: true,
                             hidden: ($.trim(ArCont[0].LINK_AC_ID_IND) == "1" ? false : true),
                         },
                         {
                             view: "button",
                             id: 'btnGlSrch',
                             minWidth: 250,
                             labelWidth: 0,
                             width: 30,
                             height: 28,
                             type: 'icon',
                             icon: 'wxi-search',
                             css: "Ar_search",
                             hidden: ($.trim(ArCont[0].LINK_AC_ID_IND)=="1"?false:true),
                             on: {
                                 onItemClick: function () {

                                     if ($.trim($$("txtAcId").getValue()) == "") {
                                         AlertMessage("AC Cd cannot be empty !");
                                         return false;
                                     }
                                     else {
                                         fnCallGLAccSearch();
                                     }
                                 }
                             }
                         }
                       ]
                   },
                  
                ]
            }
        ]
    }
});
function fnSettleTyLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_SETTLETYPELOAD";
    dataparam["PROGNAME"] = "GET_MST_GLACCLINK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                //$("#hdnCompId").val("WS");
            }
        },
    });
    return rowData;
}

function fnDisable() {
    $$("txtAcId").disable();
    $$("txtAcNm").disable();
    $$("txtLinkAcc").disable();
    $$("btnGlSrch").disable();
}

function fnEnable() {

    $$("txtAcId").enable();
    $$("txtAcNm").enable();
    $$("txtLinkAcc").enable();
    $$("btnGlSrch").enable();
}

function fnSaveGLACCData() {

    if (!fnARValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_GLACCLINKSAVE";
    dataparam["PROGNAME"] = "GET_MST_GLACCLINK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["txtAcId"] = $.trim($$("txtAcId").getValue());
    dataparam["txtAcNm"] = $.trim($$("txtAcNm").getValue());
    dataparam["txtLinkAcc"] = $.trim($("#hdnAcCd").val());
    dataparam["ARInd"] = $.trim($("#hdnARInd").val());
    dataparam["Active"] = $.trim($$("chkActive").getValue());
    var SettleTy = "";

    if ($.trim($$("ddlSettleTy").getValue()) == "NONE") SettleTy = "";
    else SettleTy=$.trim($$("ddlSettleTy").getValue());
      
    dataparam["SettleTy"] = SettleTy;
    
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
                        $("#hdnFieldId").val($.trim($$("txtAcId").getValue()));
                        $("#hdnMstType").val("GLACCOUNT");
                        fnARMulticompPopup();
                    }
                    else {

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

function fnARValidate() {

    var Dataset = fnLoadOpenData();

    var ArCont = fnMstARControl();

    if ($.trim($$("txtAcId").getValue()) == "") {
        AlertMessage("AC Cd cannot be empty !");
        return false;
    }

    if ($.trim($$("txtAcNm").getValue()) == "") {
        AlertMessage("AC Name cannot be empty !");
        return false;
    }

    if ($.trim(ArCont[0].LINK_AC_ID_IND) == "1") {
        if ($.trim($$("txtLinkAcc").getValue()) == "") {
            AlertMessage("Link GL Account Cannot be empty !");
            return false;
        }
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AC_CD) == $.trim($$("txtAcId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }

        var Filter2 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.AC_NM) == $.trim($$("txtAcNm").getValue());
        });

        if (Filter2.length != 0) {
            AlertMessage("Ac Name is already exists !");
            return false;
        }
    }
    else {

        var Filter2 = Dataset.filter(function (Dataset) {
            return ($.trim(Dataset.AC_CD) != $.trim($$("txtAcId").getValue())) && ($.trim(Dataset.AC_NM) == $.trim($$("txtAcNm").getValue()));
        });

        if (Filter2.length != 0) {
            AlertMessage("Name is already exists");
            return false;
        }
    }

    return true;
}

function fnCallInfPopup() {

    var Dataset = fnLoadOpenData();
    ClearData();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOpenSrch",
        head: "GL Account Link Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: ["Ac Cd", { content: "textFilter" }, ], id: "AC_CD", width: 100, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Ac Name", { content: "textFilter" }, ], id: "AC_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                             { header: [""], id: "SETL_MODE_ID", hidden: true },
                              { header: [""], id: "B_IND", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            debugger;

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.AC_CD) == $.trim(selectedRows[0].AC_CD);
                            });

                            if (Filter1.length > 0) {

                                $$("txtAcId").setValue(Filter1[0].AC_CD);

                                $$("txtAcNm").setValue(Filter1[0].AC_NM);
                                if (Filter1[0].SETL_MODE_ID != "" && (Filter1[0].SETL_MODE_ID != null)) $$("ddlSettleTy").setValue(Filter1[0].SETL_MODE_ID); else $$("ddlSettleTy").setValue("NONE");
                              

                                $("#hdnAcCd").val(Filter1[0].LINK_AC_ID);

                                

                                var Dataset1 = fnLoadARGLAccount();

                                var Filter2 = Dataset1.filter(function (Dataset1) {
                                    return $.trim(Dataset1.AC_CD) == $.trim(Filter1[0].AC_CD);
                                });

                                if (Filter2.length > 0) {
                                    $$("txtLinkAcc").setValue(Filter2[0].AC_NM);
                                }

                                if ($.trim(Filter1[0].B_IND) == "" || $.trim(Filter1[0].B_IND) == null)
                                    $$("chkActive").setValue("1");
                                else
                                    $$("chkActive").setValue("0");


                                //if ($.trim(Filter1[0].R_IND) == "1") {
                                //    $('#btnSave').prop('disabled', true);
                                //    $$("txtReslab").show();
                                //}
                                //else {
                                //    $$("txtReslab").hide();
                                //    $('#btnSave').prop('disabled', true);
                                //}
                            }

                            $$('PopupOpenSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupOpenSrch').hide();
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

    $$("PopupOpenSrch").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function fnLoadOpenData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_GLACCLINKOPEN";
    dataparam["PROGNAME"] = "GET_MST_GLACCLINK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
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

function fnLoadARGLAccount() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_GLACCOUNT";
    dataparam["PROGNAME"] = "GET_MST_GLACCLINK";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARMaster/COMAPI_CALL",
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

function fnCallGLAccSearch() {

    var Dataset = fnLoadARGLAccount();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGLSrch",
        head: "GL Account Search",
        position: "center",
        minWidth: 450,
        maxWidth: 450,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 650,

        body: {
            view: 'form',
            minWidth: 450,
            maxWidth: 450,
            elements: [
                {
                    view: "datatable",
                    id: "grdGLSrch",
                    select: "row",
                    data: [],
                    height: 450,
                    scroll: "y",
                    columns: [
                            { header: "" ,id: "AC_ID",hidden:true  },
                            { header: ["Ac Cd", { content: "textFilter" }, ], id: "AC_CD", width: 100, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Ac Name", { content: "textFilter" }, ], id: "AC_NM", width: 300, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.AC_CD) == $.trim(selectedRows[0].AC_CD);
                            });

                            if (Filter1.length > 0 && $.trim(Filter1[0].AC_CD) != "") {

                                $$("txtAcId").setValue(Filter1[0].AC_CD);

                                $$("txtAcNm").setValue(Filter1[0].AC_NM);

                                $$("txtLinkAcc").setValue(Filter1[0].AC_NM);

                                $("#hdnAcCd").val(Filter1[0].AC_ID);
                            }
                            else {
                                $$("txtLinkAcc").setValue("");
                                $("#hdnAcCd").val("");
                            }

                            $$('PopupGLSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 550,
                             paddingX: 400,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGLSrch').hide();
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

    $$("PopupGLSrch").show();

    $$("grdGLSrch").clearAll();
    $$("grdGLSrch").parse(Dataset);
    $$("grdGLSrch").refresh();
}
