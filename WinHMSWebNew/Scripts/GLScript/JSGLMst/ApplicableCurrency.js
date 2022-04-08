
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











//app.controller("UrbanPiperMstrController", function ($scope) {
//    var Delicon = "<span class='webix_icon wxi-trash'></span>";
//    debugger;
//    $("#LoadDIv").hide();
//    // var vDdlVal = $$("ddlVendor").getValue();
//    $scope.frmMstDeliveryPartner = {
//        id: "frmMstDeliveryPartner",
//        view: 'form',
//        minWidth: 800,
//        height: 550,
//        elements: [
//            {
//                paddingX: 20,
//                rows: [
//                    {
//                        view: "richselect",
//                        id: "ddlIntegrator",
//                        label: "Integrator",
//                        labelAlign: "Left",
//                        labelWidth: 100,
//                        inputWidth: 320,
//                        width: 420,
//                        disabled:true,
//                        on: {
//                            onChange: function (newval, oldval) {
//                                debugger;
//                                $$("gridmain").clearAll();
//                                fnLoadMainGrid();
//                            }
//                        }
//                    },

//                    {
//                        view: "button",
//                        id: "btnAdd",
//                        stringResult: true,
//                        type: "icon",
//                        icon: "wxi-plus",
//                        labelAlign: "left",
//                        inputWidth: 65,
//                        labelWidth: 30,
//                        width: 200,
//                        height: 30,
//                        css: 'float-right',
//                        disabled: true,
//                        on: {
//                            onItemClick: function () {
//                                var bValid = fnValidation();
//                                if (bValid == true) {
//                                    fnCallAddRow();
//                                }
//                            }
//                        }

//                    },
                     
//                     {
//                         id: "gridmain",
//                         select: 'row',
//                         view: "datatable",
//                         fixedRowHeight: false,
//                         autoConfig: true,
//                         spans: true,
//                         height: 400,
//                         minWidth: 500,
//                         editable: true,
//                         adjust: true,
//                         data: [],
//                         columns: [
//                                 { header: "Id", editor: "text", id: "dp_id", css: { 'text-align': 'left ! important' }, hidden: false, width: 100 },
//                                 { header: "Name", editor: "text", id: "dp_nm", css: { 'text-align': 'left ! important' }, hidden: false, width: 180 },
//                                 { header: "Short Name", editor: "text", css: { 'text-align': 'left ! important' }, id: "shrt_nm", hidden: false, width: 180 },
//                                 { header: "Status", id: "inactive_ind", css: { 'text-align': 'left ! important' }, hidden: false, width: 180 },

//                                 { header: "", id: "btnVDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                        
//                         ],
//                         on: {

//                             'onItemClick': function (id, value) {

//                                 var RowIndex = $$("gridmain").getIndexById(id.row);

//                                 if (id.column == 'btnVDel') {

//                                     webix.confirm({
//                                         title: "Confirmation !",
//                                         ok: "Yes", cancel: "No",
//                                         text: "Are you sure to Delete this line Item !"
//                                     })
//                                   .then(function () {
//                                       $$("gridmain").editCancel();
//                                       $$("gridmain").remove($$("gridmain").getSelectedId());
//                                       $$("gridmain").refresh();
//                                   })
//                                   .fail(function () {

//                                   });
//                                 }
//                             },
//                             'onBeforeEditStart': function (id) {
//                                 debugger;
//                                 var getval = this.getItem(id.row);
//                                 if ($("#hdnCurMode").val() == "V")
//                                 {

//                                     if (id.column == "dp_id") {
//                                         return false;
//                                     }
//                                     if (id.column == "dp_nm") {
//                                         return false;
//                                     }
//                                     if (id.column == "shrt_nm") {
//                                         return false;
//                                     }
//                                     //if (id.column == "btnVDel") {
//                                     //    return false;
//                                     //}
//                                     if (id.column == "inactive_ind") {
//                                         return false;
//                                     }
//                                     else
//                                     {
//                                         return true;
//                                     }
//                                 }

//                             },

//                             onAfterEditStart: function (id) {
//                                 if (id.column == 'dp_id')
//                                     this.getEditor().getInputNode().setAttribute("maxlength", 4);
//                                 $$("gridmain").refresh();
//                                 if (id.column == 'dp_nm')
//                                     this.getEditor().getInputNode().setAttribute("maxlength", 20);
//                                 $$("gridmain").refresh();
//                                 if (id.column == 'shrt_nm')
//                                     this.getEditor().getInputNode().setAttribute("maxlength", 10);
//                                 $$("gridmain").refresh();
//                             }
//                         }
//                     },

//                ]
//            }
//        ]
//    }
  
//});





<style>
    .custom {
        font-weight: bold;
        cursor: pointer;
    }
    .checked {
        color: green;
    }
    .notchecked {
        color: red;
    }
        .cmn-toggle
        {
            position: absolute;
            margin-left: -9999px;
            visibility: hidden;
        }
        .cmn-toggle + label {
            display: block;
            position: relative;
            cursor: pointer;
            outline: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: non: none;
            -ms-user-select: none;
            user-select: none;
        }
        /* ============================================================
      SWITCH 1 - ROUND
    ============================================================ */
        input.cmn-toggle-round + label {
            padding: 2px;
            width: 40px;
            height: 20px;
            background-color: #DDDDDD;
            -webkit-border-radius: 60px;
            -moz-border-radius: 60px;
            -ms-border-radius: 60px;
            -o-border-radius: 60px;
            border-radius: 60px;
        }
            input.cmn-toggle-round + label:before, input.cmn-toggle-round + label:after {
                display: block;
                position: absolute;
                top: 1px;
                left: 1px;
                bottom: 1px;
                content: "";
            }
            input.cmn-toggle-round + label:before {
                right: 1px;
                background-color: #F1F1F1;
                -webkit-border-radius: 60px;
                -moz-border-radius: 60px;
                -ms-border-radius: 60px;
                -o-border-radius: 60px;
                border-radius: 60px;
                -webkit-transition: background 0.4s;
                -moz-transition: background 0.4s;
                -o-transition: background 0.4s;
                transition: background 0.4s;
            }
            input.cmn-toggle-round + label:after {
                width: 20px;
                background-color: #fff;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                -ms-border-radius: 100%;
                -o-border-radius: 100%;
                border-radius: 100%;
                -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                -moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                -webkit-transition: margin 0.4s;
                -moz-transition: margin 0.4s;
                -o-transition: margin 0.4s;
                transition: margin 0.4s;
            }
        input.cmn-toggle-round:checked + label:before {
            background-color: #8CE196;
        }
        input.cmn-toggle-round:checked + label:after {
            margin-left: 20px;
        }
    .bq_avialbtn {
        height: 22px;
        margin: 1%;
        vertical-align: middle;
        line-height: 13px;
        width:100%!important;
        font-weight: normal;
        border-radius: 5px !important;
        color: #fff;
        background-color: #63B776;
        border-color: #63B776 !important;
    }
    .bq_unavialbtn {
        height: 22px;
        margin: 1%;
        vertical-align: middle;
        line-height: 13px;
        width: 100% !important;
        font-weight: normal;
        border-radius: 5px !important;
        color: #fff;
        background-color: #B95050;
        border-color: #B95050 !important;
        border-right: 50px;
    }
    .bq_avialstr {
        color: #63B776;
    }
    .bq_unavialstr {
        color: #B95050;
    }
</style>
9:24
function custom_checkbox(obj, common, value) {
    debugger;
    if (value)
        return "<div class='webix_table_checkbox custom checked btn btn-sm bq_avialbtn'> Open </div>";
    else
        return "<div class='webix_table_checkbox custom notchecked btn btn-sm bq_unavialbtn'> Closed </div>";
};

header: "New Status", id: "chkNew_Status", width: 100, template: custom_checkbox, on: { onChange: function () { this.focus(); StarIcon() }


https://192.168.1.2:8080/svn/WIN_CRS_SYNC/SYNC_CRS/UrbanPiper



https://projects.winsargroup.com/


20@Saranya







