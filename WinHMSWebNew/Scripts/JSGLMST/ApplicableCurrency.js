
var app = angular.module('GLMApp', ['webix']);
app.controller("GLMasterController", function ($scope) {
    var dataProp = fnPropertyLoad();
    var searchicon = "<span class='webix_icon wxi-search'></span>";
   // var a_ind="1";
   
    $("#LoadDIv").hide();
    $scope.frmApplicableCurrency = {

        id: "frmApplicableCurrency",
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
                                 view: "button",
                                 id: "btnDel",
                                 stringResult: true,
                                 type: "icon",
                                 icon: "wxi-trash",
                                 labelAlign: "Left",
                                 inputWidth: 65,
                                 labelWidth: 30,
                                 width: 100,
                                 height: 30,
                                 disabled:true,
                                 css: 'float-right',
                                 on: {
                                     onItemClick: function () {
                                         fnCallDelRow();
                                     }
                                 }

                             },

                            {
                                view: "button",
                                id: "btnAdd",
                                stringResult: true,
                                type: "icon",
                                icon: "wxi-plus",
                                labelAlign: "Left",
                                inputWidth: 65,
                                labelWidth: 30,
                                width: 70,
                                height: 30,
                                css: 'float-right',
                                disabled:true,
                                on: {
                                    onItemClick: function () {
                                        fnCallAddRow();
                                    },
                                   
                                }

                            },
                        ]

                    },


                    {
                        cols: [
                            {
                                view: "datatable",
                                id: "grdApplCurr",
                                select: "row",
                                height: 420,
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
                                      { header: ["CurrencyId"], id: "cur_id", hidden: true,fillspace:true},
                                      { header: ["Currency"], id: "currency_nm", width: 310, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, fillspace: true },
                                      { header: "", id: "btnCurrSrch", width: 60, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                      { header: ["Active"], id: "A_IND", width: 60, editor: 'check',  template: "{common.checkbox()}", css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' },check:true, }

                                ],
                                data: [],
                                on: {

                                    onItemClick: function (id) {
                                        var SelRow = this.getItem(id.row);
                                        var getColumn = id.column;

                                        if (getColumn == "btnCurrSrch") {
                                            fnGrdCurrSearch();
                                            fnLoadCurrScrh();
                                            $$("grdApplCurr").show();
                                            $$("PopupCurrSrch").show();
                                        }
                                    },
                                    
                                    'onKeyPress': function (code, e) {
                                        var selRow = this.getSelectedItem();
                                        var rowid = selRow.id;
                                        var vChk = selRow.A_IND;
                                        if (vChk == "1") {
                                            selRow.A_IND = "1";
                                        }
                                        else selRow.A_IND = "0";

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


function fnLoadCurrScrh() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_APPLCURRE_SRCH";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != null && rowData != "") {

                    $$("grdCurrSrch").parse(rowData);
                    $$("grdCurrSrch").refresh();
                }
            }
        },
    });
}



function fnOpen() {
    debugger;
   OPENCONTROL();
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LOAD_APPLCURR";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OpenMode"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != null && rowData != "") {
                    $$("grdApplCurr").parse(rowData);
                    $$("grdApplCurr").refresh();
                }
            }
        },
    });

}


function  OPENCONTROL()
{
    $$("frmApplicableCurrency").enable();
    $$("grdApplCurr").clearAll();
    $$("btnAdd").enable();
    $$("btnDel").enable();
    document.getElementById("btnSave").disabled = false;
}

function fnGrdCurrSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupCurrSrch",
        head: "Applicable Currency",
        position: "center",
        minWidth: 360,
        maxWidth: 360,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,
        body: {
            view: 'form',
            minWidth: 350,
            maxWidth: 350,
            elements: [
                {
                    view: "datatable",
                    id: "grdCurrSrch",
                    select: "row",
                    data: [],
                    height: 400,
                    scroll: "y",
                    columns: [
                          { header: ["Currency Id", { content: "textFilter" }], id: "CURRENCY_ID", width: 80, css: { 'text-align': 'left ! important' } },
                          { header: ["Currency Name", { content: "textFilter" }], id: "CURRENCY_NM", width: 300, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            var selRow = $$("grdCurrSrch").getSelectedItem();
                            var GrdRow = $$("grdApplCurr").getSelectedItem();
                            GrdRow["cur_id"] = selRow.CURRENCY_ID;
                            GrdRow["currency_nm"] = selRow.CURRENCY_NM;

                            $$("grdApplCurr").refresh();
                            $$("grdCurrSrch").hide();
                            $$("PopupCurrSrch").hide();
                        },

                     
                    }
                   
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 260,
                             paddingX: 260,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupCurrSrch').hide();
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
    $$("PopupCurrSrch").show();
}


function fnSave()
{
    debugger;
    var bValid = Validation();
   if (bValid == true) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_SAVE_APPLCURR";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["CURRENCY_GRID"] = $$("grdApplCurr").serialize();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: true,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (data) {
                if (data != "") {
                    rowData = JSON.parse(data);
                    if ($.trim(rowData) == "True") {
                        SuccessMsg("Saved Successfully");
                        fnRefresh();
                        $("#LoadDIv").hide();
                        return;
                    }

                    else {
                        AlertMessage("Operation failed");
                        fnRefresh();
                        $("#LoadDIv").hide();
                        return;
                    }
                }
            },
        });
    }
}



function Validation() {
    debugger;
    var data = $$("grdApplCurr").serialize();

    $$("grdApplCurr").refresh();

    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {

            if ($.trim(data[i].cur_id) == "") {

                for (f = 0; f < data.length; f++) {

                    if ($.trim(data[f].currency_nm) == "") {
                        AlertMessage("Currency cannot be empty");
                        return false;
                    }

                    else {

                        if ($.trim(data[i].currency_nm) == $.trim(data[f].currency_nm) && $.trim(data[f].cur_id) != "") {
                            AlertMessage("Currency already exists");
                            return false;
                        }

                    }
                }
            }
        }
    }

    else
    {
        if ((data.length == "0") || (data.length == null))
        {
            AlertMessage("No Record Found");
            return false;
        }

    }

    return true;
}
  

function fnRefresh()
{
    debugger;
    $$("grdApplCurr").clearAll();
    $$("btnAdd").disable();
    $$("btnDel").disable();
    document.getElementById("btnSave").disabled = true;

}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}


function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
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
        width: 250,
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

function fnCallAddRow() {
    debugger;
    $$("grdApplCurr").add({ "currency_nm": "", "A_IND": "1" });
    $$("grdApplCurr").refresh();
    $$("grdApplCurr").refreshColumns();
    
};


function fnCallDelRow() {
    debugger;
    var SelRow = $$("grdApplCurr").getSelectedId(false);
    $$("grdApplCurr").editStop();
    if (SelRow == undefined || SelRow == null)
        SelRow = $$("grdApplCurr").getSelectedItem();
    $$("grdApplCurr").remove(SelRow);

}
//function fnCallDelRow() {
//    debugger;

//    var SelRow = $$("grdApplCurr").getSelectedItem();
//    var cur_id = SelRow.CUR_ID;

//    var rowdata = [];
 
//        try {
//            Request = {
//                REQTYPE: "GET_MST_GRIDCURRDELETE",
//                cur_id: cur_id,

//            }
//            requestData = JSON.stringify(Request);
//            requestData = encodeURIComponent(requestData);
//            $.ajax({
//                async: false,
//                url: "/GLMaster/COMAPI_CALL",
//                type: 'POST',
//                data: "request=" + requestData,
//                success: function (data) {
//                    debugger;
//                    if (data != "") {
//                        rowData = JSON.parse(data);
//                        if ($.trim(rowData) == "True") {
//                            var SelRow = $$("grdApplCurr").getSelectedId(false);
//                            $$("grdApplCurr").remove(SelRow);
//                        }
//                        if ($.trim(rowData) == "false") {
//                            var SelRow = $$("grdApplCurr").getSelectedId(false);
//                            $$("grdApplCurr").remove(SelRow);
//                        }

//                        $("#LoadDIv").hide();
//                        return;
//                    }
//                    else {
//                        AlertMessage('Operation Failed');

//                        $("#LoadDIv").hide();
//                        return;
//                    }

//                },
//            });
//        }
//        catch (e) {
//            console.log(e.message);

//        }

//    }
