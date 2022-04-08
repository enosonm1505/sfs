
var app = angular.module('GLMApp', ['webix']);
app.controller("GLMasterController", function ($scope) {
    $("#LoadDIv").hide();
    var DefFun = fnLoadDef();
    var dataProp = fnPropertyLoad();
    var searchicon = "<span class='webix_icon wxi-search'></span>";
    debugger;
    $scope.frmAnalysisItemDefaults = {
        id: "frmAnalysisItemDefaults",
        view: 'form',
        minWidth: 900,
        height: 550,
        width: 500,
        elements: [
            {
                rows: [
                    {
                        cols: [
                                 {
                                     id: "analysisItemDefaultGrid",
                                     select: 'row',
                                     view: "datatable",
                                     fixedRowHeight: false,
                                     rowLineHeight: 23,
                                     autoConfig: true,
                                     height: 500,
                                     Width: 500,
                                     position: "flex",
                                     css: "webix_header_border wingrd_hight",
                                     data: [],
                                     columns: [
                                          { header: "L_TY", id: "ixL_ty", width: 320,  hidden: true, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "Analysis Name", id: "ixA_Nm", hidden: true, width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "A_LV", id: "ixA_Lv", width: 320, hidden: true, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "Analysis Item", id: "ixL_Nm", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "Analysis Code", id: "ixL_Cd", width: 320, css: { 'text-align': 'left ! important' }, fillspace: true },
                                          { header: "", id: "btnAnalID1", width: 40, hidden: false, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                     ],
                                     data: [],
                                     on: {

                                         onItemClick: function (id) {
                                             var SelRow = this.getItem(id.row);
                                             var getColumn = id.column;

                                             if (getColumn == "btnAnalID1")
                                                 fnGrdSearch();
                                             fnLoadGrdsrch();
                                             $$("analysisItemDefaultGrid").show();
                                             $$("PopupAnalySrch").show();
                                         }

                                     }
                                 },
                        ]
                    }
                ]
            }
        ]
    }
  }
);

function fnOpen() {
    OPENCONTROL();
    debugger;
    var openmode = "1";
    var rowData = [];

    try {
        Request = {
            REQTYPE: "GET_MST_AIDEFAULT",
            COMPID: $("#hdnCompId").val(),
            OPENMODE: openmode,
        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: true,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                if (d != "" && d != null) {
                    rowData = JSON.parse(d);
                    if (rowData != null && rowData != "") {
                        $$("analysisItemDefaultGrid").clearAll();

                        $$("analysisItemDefaultGrid").parse(rowData);
                        $$("analysisItemDefaultGrid").refresh();
                    }
                }
            }
        });
        //return rowData;
    }
    catch (e) {
        console.log(e.message);

    }
}

function OPENCONTROL()
{
    debugger;
    document.getElementById("btnSave").disabled = false;
}

function fnGrdSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAnalySrch",
        head: "Analysis",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdAnalySrch",
                    select: "row",
                    data: [],
                    height: 430,
                    scroll: "y",
                    columns: [
                          { header: ["Code", { content: "textFilter" }], id: "ixtcid", width: 80, css: { 'text-align': 'center ! important' },fillspace:true },
                          { header: ["Analysis", { content: "textFilter" }], id: "ixtcnm", width: 300, css: { 'text-align': 'left ! important' },fillspace:true },
                          { header: ["L_ID", { content: "textFilter" }], id: "ixlid", width: 80, hidden:true, css: { 'text-align': 'left ! important' } }

                    ],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            var selRow = $$("grdAnalySrch").getSelectedItem();
                            var GrdRow = $$("analysisItemDefaultGrid").getSelectedItem();
                            GrdRow["ixL_Cd"] = selRow.ixtcid;
                            $$("analysisItemDefaultGrid").refresh();
                            $$("grdAnalySrch").hide();
                            $$("PopupAnalySrch").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAnalySrch').hide();
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
}


function fnLoadGrdsrch() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_AIDEFSEARCHGRID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "" && d != null) {
                rowdata = JSON.parse(d);
                if (rowdata != null && rowdata != "") {

                    $$("grdAnalySrch").parse(rowdata);
                    $$("grdAnalySrch").refresh();
                }
                else {

                }
            }


        },

    });

}


function fnSave() {
    debugger;
    var data = $$("analysisItemDefaultGrid").serialize();
    data = JSON.stringify(data);

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_AIDEFSAAVEFN";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["GRIDVAL"] = data;


    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
        url: "/GLMaster/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                SuccessMsg('Updated Successfully');
                $$("analysisItemDefaultGrid").clearAll();

            }
            else {
                AlertMessage("Save Failed!");
            }

            $("#LoadDIv").hide();


        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}

function AlertMessage(Text) {
    return webix.message({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    })
    //}).then(function (result) {

    //})
}
function SuccessMsg(Text) {
    return webix.message({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    })
    //}).then(function (result) {
    //    //window.location.reload();
    //})
}

function fnReport() {
    debugger;
    Window1 = window.open("/GLMaster/AnalysisItemDefReport", "PopupWindow", "width=990,height=600,left=30,top=50");
}

function fnRefresh() {
    document.getElementById("btnSave").disabled = true;
    $$("analysisItemDefaultGrid").clearAll();
    $("#hdnCmpId").val("");
}


function fnLoadDef() {
    debugger;

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_GLFISCALYRPERIOD";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
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
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
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

