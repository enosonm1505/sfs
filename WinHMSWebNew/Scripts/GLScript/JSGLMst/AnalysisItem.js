
var app = angular.module('GLMApp', ['webix']);

app.controller("GLMasterController", function ($scope) {
    $("#LoadDIv").hide();
    var DefFun = fnLoadDef();
    var dataProp = fnPropertyLoad();
    var dropvalue = fnLoadDropval();
    var searchicon = "<span class='webix_icon wxi-search'></span>";

    var Filter3 = dataProp.filter(function (dataProp) {
        return (dataProp.id == $.trim($("#hdnCompId").val()));

    });
    debugger;
    $scope.frmanalysisList = {
        id: "frmanalysisList",
        view: 'form',
        minWidth: 900,
        height: 550,
        width: 950,
        elements: [
            {
                rows: [
                   {
                       cols: [
                               {
                                   id: "analysisitem",
                                   view: "richselect",
                                   label: "Analysis Item",
                                   labelAlign: "left",
                                   labelWidth: 100, inputwidth: 180,
                                   width: 300,
                                   options: dropvalue,
                                   on: {
                                       onChange: function (newval, oldval) {
                                           fnddlGroupName();
                                       }
                                   }
                               },
                       ]
                   },
                       {
                           cols: [
                                {

                                    id: "analysisListGrid",
                                    select: 'row',
                                    view: "datatable",
                                    fixedRowHeight: false,
                                    rowLineHeight: 23,
                                    autoConfig: true,
                                    height: 500,
                                    hidden: false,
                                    Width: 500,
                                    position: "flex",
                                    css: "webix_header_border wingrd_hight",
                                    data: [],
                                    columns: [

                                        { header: "Session", id: "ixseNm", width: 320, hidden: false, css: { 'text-align': 'left ! important' }, fillspace: true },
                                         { header: "Analysis Code", id: "ixAnaId", width: 320, hidden: false, css: { 'text-align': 'left ! important' }, fillspace: true },
                                         { header: "SessionId", id: "ixseId", width: 320, hidden: true, css: { 'text-align': 'left ! important' }, fillspace: true },
                                         { header: "AnalysisName", id: "ixAnNm", width: 320, hidden: true, css: { 'text-align': 'left ! important' }, fillspace: true },
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
                                            $$("grdAnalySrch").show();
                                            $$("PopupAnalySrch").show();
                                        }

                                    }
                                },
                           ]
                       },
                ]
            }
        ]
    }
}
       );

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
                          { header: ["Code", { content: "textFilter" }], id: "TC_ID", width: 80, css: { 'text-align': 'center ! important' } },
                          { header: ["Analysis", { content: "textFilter" }], id: "TC_NM", width: 300, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            var selRow = $$("grdAnalySrch").getSelectedItem();
                            var GrdRow = $$("analysisListGrid").getSelectedItem();
                            GrdRow["ixAnaId"] = selRow.TC_ID;
                            $$("analysisListGrid").refresh();
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
    dataparam["REQTYPE"] = "GET_MST_GRIDVALUE";
    dataparam["PROGNAME"] = "GET_MST_GRIDANALYSISITEM";
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



function fnLoadDropval() {
    debugger;
    //OPENCONTROL();
    var openmode = "1";
    var rowData = [];

    try {
        Request = {
            REQTYPE: "GET_MST_DROPVALUE",
            PROGNAME: "GET_MST_ANALYSISITEM",
            COMPID: $("#hdnCompId").val(),
            OPENMODE: openmode,
        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);
        $.ajax({
            async: false,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {

                if (d != "") {
                    rowData = JSON.parse(d);
                }
            }
        });
        return rowData;
    }
    catch (e) {
        console.log(e.message);

    }
}




function fnddlGroupName() {
    debugger;
    var ddlGroupID = $$("analysisitem").getValue();

    $$("analysisListGrid").clearAll();
    var rowdata = [];
    if (ddlGroupID != "") {

        try {
            Request = {
                REQTYPE: "GET_MST_LOADCHNGDROPVALUE",
                PROGNAME: "GET_MST_CHNGDROPVALUE",
                COMPID: $("#hdnCompId").val(),
                L_TY: ddlGroupID,
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
                        rowdata = JSON.parse(d);
                        if (rowdata != null && rowdata != "") {
                            $$("analysisListGrid").clearAll();
                            $$("analysisListGrid").parse(rowdata);
                            $$("analysisListGrid").refresh();
                        }

                    }


                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
    }


};

function fnRefresh() {
    document.getElementById("btnSave").disabled = true;
    $$("analysisListGrid").clearAll();
    $$("analysisitem").disable();
    $$("analysisitem").setValue("");
    $("#hdnCmpId").val("");
}


function fnOpen() {
    OPENCONTROL();
    var openmode = "1";
    var rowData = [];

    try {
        Request = {
            REQTYPE: "GET_MST_DROPVALUE",
            PROGNAME: "GET_MST_ANALYSISITEM",
            COMPID: $("#hdnCompId").val(),
            OPENMODE: openmode,
        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: false,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {

                if (d != "") {
                    rowData = JSON.parse(d);


                }
            }
        });
        return rowData;
    }
    catch (e) {
        console.log(e.message);

    }

}


function OPENCONTROL() {

    document.getElementById("btnSave").disabled = false;


}


function fnSave() {
    debugger;

    var bValid = fnValidation();
    if (bValid == true) {
        debugger;
        var data = $$("analysisListGrid").serialize();
        data = JSON.stringify(data);

        var ddlGroupID = $$("analysisitem").getValue();


        try {
            Request = {
                REQTYPE: "GET_MST_LOADFNSAVE",
                PROGNAME: "GET_MST_FNSAVE",
                COMPID: $("#hdnCompId").val(),
                analysisgrid: data,
                L_TY: ddlGroupID


            }
            var rowData = 0;

            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: true,
                url: "/GLMaster/COMAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (data) {
                    debugger;
                    if (data != "") {
                        debugger;
                        rowData = JSON.parse(data);
                        if (!rowData) rowData = "";
                        if (rowData.Status == "0") {
                            webix.message({
                                type: 'warning',
                                text: rowData.Message,
                            })

                        }
                        else if (rowData.Status == "1") {
                            webix.message({
                                type: 'success',
                                text: rowData.Message,

                            })
                            fnRefresh();
                        }
                    }
                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
    }
};


function fnValidation() {
    debugger;
    var data = $$("analysisListGrid").serialize();
    var Lenmaingrd = data.length;

    if (Lenmaingrd != 0) {

        for (var i = 0; i < Lenmaingrd; i++) {

            if (data[i].ixseNm == null || data[i].ixseNm == undefined || data[i].ixseNm == "") {
                webix.message({ type: 'warning', text: 'Analysis Item cannot be empty' });

                return false;
            }
        }

    }
    else if (Lenmaingrd == 0) {
        webix.message({ type: 'warning', text: 'Analysis Item cannot be empty' });
        return false;
    }
    if ($$("analysisitem").getValue() == "") {
        webix.message({ type: 'warning', text: 'Analysisitem cannot be empty' });
        webix.UIManager.setFocus($$("analysisitem"));
        return false;
    }

    return true;
}


function fnLoadDef() {
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

