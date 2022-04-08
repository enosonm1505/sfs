
var app = angular.module('GLRApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
   
    $("#LoadDIv").hide();
    fnAccountDt("2");
    var fnVouchrData = fnVchApprTrnTy();
    var GroupData = fnPartGrpLoad();
    fnLoadFiscalDt();

    $scope.frmPDCRegister = {

        id: "frmPDCRegister",
        view: 'form',
        minwidth: 1000,
        maxwidth: 5000,
        paddingX: 50,
        borderless: true,

        //ready: function () {
        //    gridResize("1");
        //},
        elements: [
            {
                cols: [
                    {
                        width:800,
                        rows: [
                            {
                                cols: [
                                    {
                                        id: "ChkReceipt",
                                        view: "checkbox",
                                        label: "Receipt",
                                        labelAlign: "Left",
                                        value:1,
                                        width: 200, labelWidth: 60,

                                    },
                                      {
                                          paddingX: 160,
                                          rows: [
                                              {
                                                  cols: [
                                                      {
                                                          view: "datepicker",
                                                          id: "FromDt",
                                                          width: 160, labelWidth: 45,
                                                          label: "As On",
                                                          value: $("#hdnCurrentDt").val(),
                                                          format: "%d/%m/%Y",
                                                           stringResult: true,
                                                      },
                                                       {
                                                           view: "datepicker",
                                                           id: "ToDt",
                                                           inputWidth: 140,
                                                           width: 180, labelWidth: 25,
                                                           label: "To",
                                                           value: $("#hdnCurrentDt").val(),
                                                           format: "%d/%m/%Y",
                                                            stringResult: true,
                                                           hidden: true,
                                                       },
                                                           {

                                                               view: "button",
                                                               id: "AdvSrch",
                                                               css: "webix_primary",
                                                               inputWidth: 40,
                                                               width: 80,
                                                               tooltip: true,
                                                               label: '<span class="fa fa-filter"></span>',
                                                               on: {

                                                                   onItemClick: function () {
                                                                       debugger;
                                                                       $$("frmFilter").show();
                                                                   }
                                                               }
                                                           }

                                                  ]
                                              }
                                          ]
                                      },
                                   
                                ]
                            },
                            {
                                cols: [
                                    {
                                        id: "ChkPayment",
                                        view: "checkbox",
                                        label: "Payment",
                                        labelAlign: "Left",
                                        width: 245, labelWidth: 60,
                                        value:1,
                                    },
                                  {width:160},
                                    {
                                       
                                        view: "button",
                                        id: "btnDisplay",
                                        width: 100, labelWidth: 90,
                                        label: "Display",
                                        css: "webix_primary",
                                        on: {
                                            'onItemClick': function () {
                                                Display();
                                            },
                                        }
                                    },
                                    //{

                                    //    view: "button",
                                    //    id: "AdvSrch",
                                    //    css: "webix_primary",
                                    //    inputWidth: 40,
                                    //    width: 80,                                       
                                    //    tooltip: true,
                                    //    label: '<span class="fa fa-filter"></span>',
                                    //    on: {

                                    //        onItemClick: function () {
                                    //            debugger;
                                    //            $$("frmFilter").show();
                                    //        }
                                    //    }
                                    //}
                                ],
                            },
                            
                        ]
                    },
                    {
                       /// paddingX:5,
                            rows: [{
                                cols: [{
                                    view: "radio",
                                    id: "rdbtnPending",
                                    value: 1,
                                    inputWidth: 120,
                                    width: 120,
                                    css: ".webix_fieldset_label2",
                                    customRadio: false,
                                    options: [{ "id": 1, "value": "Pending" }, { "id": 2, "value": "Regularised" }, ],
                                    vertical: true,
                                    on: {
                                        "onChange": function (newval, oldVal) {
                                            if (newval == "2") {
                                                $$("ToDt").show();
                                                $$("FromDt").define("label", "From");
                                                $$("FromDt").refresh();
                                                // $("#LayoutText").text("PDC Registration - Regularised");
                                                $$("FromDt").setValue(new Date(window.FiscalFromDt));
                                                $$("ToDt").setValue($("#hdnCurrentDt").val());
                                                $$("ToDt").setValue(new Date(window.FiscalToDt));
                                                $$("PDCRegGrid").clearAll();
                                            }
                                            else {
                                                $$("ToDt").hide();
                                                $$("FromDt").define("label", "As On");
                                                $$("FromDt").setValue($("#hdnCurrentDt").val());
                                                $$("FromDt").refresh();
                                              //  $("#LayoutText").text("PDC Registration - Pending");
                                                $$("PDCRegGrid").clearAll();
                                            }
                                        }
                                    }
                                },

                                ]
                            }

                            ]


                    }
                ]
            }, {
                    view: "label", label: "Double Click to Amend/Cancel for Current Fiscal Year", labelWidth: 600,css:"lblcl",
            },
            {
                rows: [
                    {
                        view: "datatable",
                        id: "PDCRegGrid",
                        select: 'row',
                        view: "datatable",
                        fixedRowHeight: false,
                        rowLineHeight: 23,
                        autoConfig: true,
                        resizeColumn: true,
                        resizeRow: true,
                        spans: true,
                        navigation: true,
                        position: "flex",
                        css: "webix_header_border wingrd_hight",
                        //  height: 450,
                        minHeight: 420,
                        width: 1000,
                     
                        scheme: {                        
                            $change: function (item) {
                                var Columns = $$('PDCRegGrid').config.columns;
                                var ColCnt = Columns.length;
                                if (item.VOCTY == "Receipt" || item.VOCTY == "Payment") {
                                    item.$css = "fontBld";
                                }
                         
                                $$("PDCRegGrid").refresh();
                            }
                        },
                               
                        columns: [
                            { id: "TRN_ID", header: "trnid", width: 180, hidden: true },
                             { id: "trn_Ty_id", header: "TrnTypeid", width: 180, hidden: true },
                             { id: "FISCAL_YEAR", header: "", width: 180, hidden: true },
                            { id: "VOCTY", header: "Vouch Type", width: 130, css: { 'text-align': 'center ! important' }, },
                            { id: "CDT", header: "Create Date", width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "VOCDT", header: "Voucher Date", width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "VOCNO", header: "Voucher", width: 100, css: { 'text-align': 'center ! important' }, },
                             { id: "PARTY", header: "Party", width: 300, css: { 'text-align': 'left ! important' }, },
                             { id: "CHEQDT", header: "Chq Date", width: 100, css: { 'text-align': 'center ! important' }, },
                             { id: "CHEQNO", header: "Chq No", width: 120, css: { 'text-align': 'center ! important' }, },
                            { id: "VouchNo", header: "Voucher No", width: 120, css: { 'text-align': 'center ! important' }, },
                             { id: "CHEQAMT", header: "Chq Amt", width: 110, css: { 'text-align': 'right ! important' }, },

                        ],
                       
                        on: {
                            'onItemDblClick': function () {
                                debugger;;
                                var dataItems = $$("PDCRegGrid").getSelectedItem();
                                
                                if ($$("rdbtnPending").getValue() == "1" && dataItems.FISCAL_YEAR == $("#hdnFiscalYr").val())
                                {
                                    if (dataItems.TRN_ID != undefined && dataItems.TRN_ID != "" && dataItems.TRN_ID != null) {

                                        $.ajax({
                                            type: "POST",
                                            url: "/GLReports/OpenTransaction",
                                            cache: false,
                                            charset: 'utf-8',
                                            data: "ID=" + $.trim(dataItems.TRN_ID),
                                            success: function (data) {
                                                //  Window1 = window.open("/GLTrans/GLTransaction?PageMenu=GLMNUTRNPDC&PARTIAL=1&Page=5", "PopupWindow", "width=1350,height=600,left=30,top=50");
                                                var PageUrl = "/GLTrans/GLTransaction?PageMenu=GLMNUTRNPDC&PARTIAL=1&Page=5";
                                                GlDrillDownWindowLoad(PageUrl);
                                                return true;
                                            }
                                        });
                                    }
                                }
                                    
                             
                            },

          
                            onAfterContextMenu: function (id, e, node) {
                                webix.delay(function () { this.select(id.row); }, this);
                            }
                        }
                    }
                ]
            }
        ]
    }

    webix.ui({
        view: "window",
        id: "frmFilter",
        close: true,
        modal: true,
        head: "Advance Filter",
        position: "center",
        width: 700,
    
        body: {
            paddingX: 30,
            cols: [{
                rows: [
                    {
                        view: "label",
                        label: "Filter",
                        width: 80,
                        css: "lblln",
                        
                    }, {
                        view: "richselect",
                        id: "ddlGroup",
                        width: 400, labelWidth: 100,
                        label: "Group",
                        options: GroupData,
                        placeholder: "<--Select-->",
                    },  {
                        cols: [{
                            cols: [{
                                view: "text",
                                id: "txtLedger",
                                width: 400,
                                labelWidth: 100,
                                label: "Ledger",
                                disabled: true,
                            }, {
                                view: "button",
                                id: 'btnLedgerSrch',
                                minWidth: 250,
                                labelWidth: 0,
                                width: 30,
                                height: 28,
                                type: 'icon',
                                css: "webix_primary",
                                icon: 'wxi-search',
                                //css: "Ar_search",
                           
                                on: {
                                    onItemClick: function () {
                                        fnCallPartySearch();
                                        // fnCallGrpSrchPopup();
                                    }
                                }
                            },
                            ]

                        }, 
                        ],
                    },
                 {
                     view: "datepicker",
                     id: "VoucherDt",
                     width: 220, labelWidth: 100,
                     label: "VoucherDate",
                     format: "%d/%m/%Y",
                     //hidden: true,
                     //value: new Date(), format: "%d/%m/%Y",
                 },

                {
                    cols: [{
                        view: "text",
                        id: "txtAmt",
                        width: 220,
                        labelWidth: 100,
                        label: "Amount",
                        placeholder: "0.00",
                        format: "11111111.00",
                          inputAlign: "right",
                    },
                    ]

                },
                {
                    cols: [{
                        view: "label",
                        label: "",
                        width: 100,
                    },

                 { view: "radio", id: "RdDrCr", value: "1", labelwidth: 30, options: [{ id: "1", value: "DR" }, { id: "2", value: "CR" }], customRadio: false, },
                 ]
                 },
                {
                    view: "richselect",
                    id: "ddlVocType",
                    width: 300, labelWidth: 100,
                    label: "Voucher Type",
                    options: fnVouchrData,
                }, {
                    view: "text",
                    id: "txtXheckNo",
                    width: 220, labelWidth: 100,
                    label: "Chk No",
                    placeholder: "0",
                    pattern: { mask: "##################", allow: /[0-9]/g }
                },
                 {
                     view: "label",
                     label: "Sort On",
                     width: 80,
                     css: "lblln",
                 },
                {                   
                        view: "radio",
                        id: "rdbtnSortOn",
                        value: 1,
                        inputWidth: 120,
                        width: 120,
                       // css: ".webix_Radio_btn",
                        customRadio: false,
                        options: [{ "id": 1, "value": "Voucher Date" }, { "id": 2, "value": "Create Date" }, { "id": 3, "value": "Cheque Date" }],
                        vertical: true,
                },  
                {},

                {
                    view: "button",
                    id: "btnFok",
                    width: 56, labelWidth: 80,
                    label: "ok",
                    align: "right",
                    css: "webix_primary",
                    on: {
                        'onItemClick': function () {
                            $$("frmFilter").hide();
                        },
                    }
                }],
            }],
        },
    });
});

function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillTransPopup",
            head: "",
            position: "center",
            autowidth: true,
            on: {
                onShow: function () {
                    debugger;
                    var vWidth = window.innerWidth
                                   || document.documentElement.clientWidth
                                   || document.body.clientWidth;
                    var vHeight = window.innerHeight
                                   || document.documentElement.clientHeight
                                   || document.body.clientHeight;
                    if (vWidth > 800) vWidth = vWidth - 20;
                    if (vHeight > 550) vHeight = vHeight - 20;

                    $$('DrillTransPopup').define("width", vWidth);
                    $$('DrillTransPopup').define("height", vHeight)
                    $$('DrillTransPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-Trans",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
                }
                ],

            }
        }).show();

    })
};
function fnPartGrpLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PARTYGRPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTy"] = "R";
    dataparam["Option"] = "2";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;

            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnVchApprTrnTy() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOAVOUCHERTYPE";
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;

            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });

    return rowData;
}


function fnLoadAccounNm() {
    debugger;
    var dataparam = {};
    var rowDatad = [];
    dataparam["REQTYPE"] = "GET_FNLOADACCOUNTNM";
    dataparam["COMPID"] = $("#hdnCompId").val(),
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                if (d != "" && d != undefined && d != null) {
                    rowDatad = JSON.parse(d);
                    $$("grdParty").clearAll();
                    $$("grdParty").parse(rowDatad);
                    $$("grdParty").refresh();

                }

            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnCallPartySearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupLoadParty",
        head: "Account Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        height: 550,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            height: 548,

            elements: [
                {
                    view: "datatable",
                    id: "grdParty",
                    select: "row",
                    data: [],
                    height: 548,
                    scroll: "y",
                    columns: [
                    
                            { header: "AC_CD", id: "AC_CD", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 400, css: { 'text-align': 'left ! important' } },
                      
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            $("#hdnPartyId").val($.trim(selectedRows[0].AC_ID));
                            $$("txtLedger").setValue(AcNm);
                            $$('PopupLoadParty').hide();
                            //fnLoadBillData();
                        }
                    }
                },
            ]
        }
    });
    $$("PopupLoadParty").show();
    fnLoadAccounNm();
   
}

function fnLoadFiscalDt()
{
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNLOADFISCALSTARTDTENDDT",
        COMPID: $("#hdnCompId").val(),
        FiscalYear:  $("#hdnFiscalYr").val(),
        GL_CompanyID: $("#hdnCompId").val(),
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.FiscalFromDt = rowData.FiscalFromDt;
                window.FiscalToDt = rowData.FiscalToDt;
             
            }
        },
    });

}
function Display() {
    debugger;
    var rowDatad = [];
   // var CompId = $$("Property").getValue();
    var FromDt = $$("FromDt").getText();
    var ToDt = $$("ToDt").getText();
    var ChkReceipt = $$("ChkReceipt").getValue();
    var ChkPayment = $$("ChkPayment").getValue();
    var rdbtnPending = $$("rdbtnPending").getValue();
    var ddlGroup = $$("ddlGroup").getValue();
    var txtLedger = $("#hdnPartyId").val();
    var VoucherDt = $$("VoucherDt").getValue();
    var txtAmt = $$("txtAmt").getValue();
    var RdDrCr = $$("RdDrCr").getValue();
    var ddlVocType = $$("ddlVocType").getValue();
    var txtXheckNo = $$("txtXheckNo").getValue();
    var rdbtnSortOn = $$("rdbtnSortOn").getValue();
    Request = {
        REQTYPE: "GET_FNLOADPDCREGISTER",
        COMPID: $("#hdnCompId").val(),
        //GL_COMPID: window.GL_CompanyID,
        FISCALYEAR: $("#hdnFiscalYr").val(),
        // GROUP_ID: GrpIds,
        FromDt: FromDt,
        ToDt: ToDt,
        ChkReceipt: ChkReceipt,
        ChkPayment: ChkPayment,
        rdbtnPending: rdbtnPending,
        ddlGroup: ddlGroup,
        txtLedger: txtLedger,
        VoucherDt: VoucherDt,
        txtAmt: txtAmt,
        RdDrCr: RdDrCr,
        ddlVocType: ddlVocType,
        txtXheckNo: txtXheckNo,
        rdbtnSortOn: rdbtnSortOn,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("PDCRegGrid").clearAll();
                $$("PDCRegGrid").parse(rowDatad);
                $$("PDCRegGrid").refresh();

            }
            else {
                $$("PDCRegGrid").clearAll();
                alert("No Record Found");
            }
        }
    })

};


webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
  
        $$("frmPDCRegister").define("width", vWidth);
        $$("frmPDCRegister").resize();
        var vheight = window.innerHeight
               || document.documentElement.clientHeight
               || document.body.clientHeight;


        $$("frmPDCRegister").define("height", vheight - 100);
        $$("frmPDCRegister").resize();
        //var vWidth = $("#divform").width();
        //$$("frmPDCRegister").define("width", vWidth);
        //$$("frmPDCRegister").resize();
        if (choice == "1") {
            var offsetTop = $$("PDCRegGrid").getNode().offsetTop;


            $$("PDCRegGrid").define("height", ((vheight - offsetTop - 160)));
            $$("PDCRegGrid").adjust();
        }

       

   
   

}


function CurrencyFormat()
{ return webix.Number.numTostr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) }



