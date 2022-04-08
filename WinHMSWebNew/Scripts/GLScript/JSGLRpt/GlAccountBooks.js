var app = angular.module('GLTApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    var dt = new Date();
    fnAccountDt("2");
    $("#hdnPgLoad").val("1");
    var ddlBook = fnLoadBookddl();
    fnLoadDefaultDt();
    $("#LoadDIv").hide();
    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmAccountBooks = {

        id: "frmAccountBooks",
        view: 'form',
        minWidth: 1200,
        maxWidth: 5000,
        minHeight: 550,
        elements: [
            {

                rows: [
                    {
                        cols: [
                            {
                                view: "richselect",
                                id: "ddlBook",
                                stringResult: true,
                                label: "Book",
                                labelAlign: "Left",
                                options: ddlBook,
                                value: " ",
                                labelWidth: 38,
                                inputWidth: 280,
                                width: 327,
                            },

                             {
                                 view: "datepicker",
                                 id: "FrmDt",
                                 inputWidth: 155, labelWidth: 38,
                                 width: 172,
                                 label: "From",
                                 value: $("#hdnStDate").val(),
                                 format: "%d/%m/%Y",
                             },
                              {
                                  view: "datepicker",
                                  id: "ToDt",
                                  width: 140, labelWidth: 25,
                                  label: "To",
                                  value: $("#hdnEndDate").val(),
                                  format: "%d/%m/%Y",
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
                              },



        
                                    {
                                        view: "checkbox",
                                        id: "ChkCurYrLedger",
                                        width: 180, labelWidth: 0,
                                        labelRight: "Current Year Ledger",
                                        hidden:true,
                                    }


                        ]
                    },
                    {
                        cols: [


                           {
                               view: 'label',
                               inputWidth: 80,
                               width: 458,
                               label: '',
                           },
                               {

                                   id: "btnDisplay",
                                   view: "button",
                                   width: 128, labelWidth: 90,
                                   inputWidth: 100,
                                   label: "Display",
                                   //disabled: true,
                                   css: "webix_primary",
                                   on: {
                                       onItemClick: function () {

                                           fnDisplay();

                                           $("#hdnPgLoad").val("2");

                                       }
                                   }
                               },
                                {
                                    view: "checkbox",
                                    id: "Chkcmpyheader",
                                    width: 180, labelWidth: 0,
                                    labelRight: "Company Header",
                                    hidden:true,
                                }

                        ]
                    },
            {
                paddingY: 5,

                cols: [

                    {
                        view: "datatable",
                        id: "GridData",
                        select: "row",
                        data: [],
                        height: 400,
                        editable: true,
                        hover: "gridHover",
                        tooltip: true,
                        scroll: true,
                        resizeColumn: true,
                        resizeRow: true,
                        spans: true,
                        autoConfig: true,
                        position: "flex",


                        columns: [
                             { header: "TRN_IDD", id: "TRN_IDD", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false, hidden: true },
                                 { header: "Vouch Dt", id: "Voucher_Date", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false, },
                                 { header: "Vouch No", id: "Voucher_NoAC", width: 90, css: { 'text-align': 'center ! important' }, tooltip: false, },
                                  { header: "AC_ID", id: "AC_ID", width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                                 { header: "AC_NM", id: "AC_NM", width: 300, css: { 'text-align': 'center ! important' },},
                                  { header: "Trn Type", id: "Trn_shrtNm", width: 110, css: { 'text-align': 'center ! important' }, },
                                // { header: "Due Dt", id: "DueDate", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },                          
                                 { header: "Dr_Amt", id: "DR_AMT", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                { header: "Cr_Amt", id: "CR_AMT", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                 { header: "Narration", id: "Narration", width: 250, css: { 'text-align': 'left ! important' },  },
                                  { header: "Com-Narration", id: "Com_Narration", width: 250, css: { 'text-align': 'left ! important' }, },
                                { header: "Currency", id: "Currency", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                { header: "Forn_Amt", id: "Forn_amt", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false, hidden: true },


                        ],
                        scheme: {
                            $change: function (item) {
                                debugger;

                                if (item.AC_NM == "Opening Balance" || item.AC_NM == "Cumulative Total" ||item.AC_NM =="Day Closing Balance") {
                                    var rowid = item.id;
                                    item.$css = "GroupGrTot";
                                    $$("GridData").refresh();

                                }

                            },

                        },
                        on: {
                            'onItemDblClick': function (id) {
                                debugger;
                                fnRowDblClick(id);
                            },


                            onAfterContextMenu: function (id, e, node) {
                                webix.delay(function () { this.select(id.row); }, this);
                            }
                        }


                    }
                ]
            },



                ]

            }
        ]
    };

    webix.ui({
        view: "window",
        id: "frmFilter",
        close: true,
        modal: true,
        head: "Advanced Filter",
        position: "center",
        width: 600,

        body: {
            paddingX: 30,
            cols: [{
                rows: [
                    {
                  
                            view: "label",
                            label: "Options",
                            width: 180,
                            css: "lblln",
                    },
                      {
                       
                             view: "checkbox",
                             id: "ChkCumTot",
                             width: 180, labelWidth: 0,
                             labelRight: "Cumulative Total", value: 1,
                      },
                       {

                           view: "checkbox",
                           id: "ChkDyclosBal",
                           width: 180, labelWidth: 0,
                           labelRight: "Day Closing Balance", value: 1,
                       },
                         {

                             view: "checkbox",
                             id: "ChkComonNarr",
                             width: 180, labelWidth: 0,
                             labelRight: "Common Narration", value: 1,
                             on: {
                                 "onChange": function (newval, oldVal) {
                                  
                                     if (newval == "1") {
                                         $$("GridData").showColumn("Com_Narration");
                                     }
                                     else {
                                         $$("GridData").hideColumn("Com_Narration");
                                     }
                                 }
                             }
                         },
                         {

                             view: "checkbox",
                             id: "ChkLineNarr",
                             width: 180, labelWidth: 0,
                             labelRight: "Line Narration", value: 1,
                             on: {
                                 "onChange": function (newval, oldVal) {
                                     if (newval == "1") {
                                         $$("GridData").showColumn("Narration");
                                     }
                                     else {
                                         $$("GridData").hideColumn("Narration");
                                     }
                                 }
                             }
                         },
                     

                    {
                        view: "label",
                        label: "Sort On",
                        width: 180,
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
                        options: [{ "id": 1, "value": "Date" }, { "id": 2, "value": "Voucher No" }, { "id": 3, "value": "Ref/Chq" }],
                        vertical: true,
                    },

                  


                {},

                {
                    cols: [{},{
                        view: "button",
                        id: "btnFok",
                        width: 56, labelWidth: 80,
                        label: "OK",
                        align: "right",
                        on: {
                            'onItemClick': function () {
                                $$("frmFilter").hide();
                            },
                        }
                    }]
                    
                }
                ],
            }],
        },
    });
    

});

function fnRowDblClick(RowId) {
    debugger;
    var selRow = $$("GridData").getItem(RowId);
    var TRN_IDD = selRow.TRN_IDD;
    var Narration = selRow.Com_Narration;
    var AC_NM = selRow.AC_NM;
    var VouchNo = selRow.Voucher_NoAC;
    var Date = selRow.Voucher_Date;
    if (TRN_IDD == "" || TRN_IDD == null) return;
    $.ajax({
        type: "POST",
        url: "/GLReports/OpenTransaction",
        cache: false,
        charset: 'utf-8',
        data: "ID=" + TRN_IDD,
        success: function (data) {

        }
    });




    //Window1 = window.open("/GLTrans/GLTransaction?Page=2&PARTIAL=1", "PopupWindow", "width=1100,height=600,left=30,top=50");
    var PageUrl = "/GLTrans/GLTransaction?Page=2&PARTIAL=1";
    GlDrillDownWindowLoad(PageUrl);

    return true;


}

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

function fnDisplay() {
    debugger;
    $("#LoadDIv").show();
    $("#hdnPgLoad").val("2");
    if ($.trim($$("ddlBook").getValue()) == "") {
        alert("Select Book");
        $("#LoadDIv").hide();
        return false;
    }
    var rowDatad = [];
    var FrmDt = $$("FrmDt").getText();
    var ToDt = $$("ToDt").getText();
    var ddlBook = $$("ddlBook").getValue();
    var rdbtnSortOn = $$("rdbtnSortOn").getValue();
    var ChkCumTot = $$("ChkCumTot").getValue();
    var ChkDyclosBal = $$("ChkDyclosBal").getValue();

    Request = {
        REQTYPE: "GET_FNLOADACCBOOK",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        FrmDt: FrmDt,
        ToDt :ToDt,
        ddlBook: ddlBook,
        rdbtnSortOn: rdbtnSortOn,
        ChkCumTot: ChkCumTot,
        ChkDyclosBal: ChkDyclosBal
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: true,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "" && d != undefined && d != null && d!="[]") {
                rowDatad = JSON.parse(d);
                $$("GridData").clearAll();
                $$("GridData").parse(rowDatad);
                $$("GridData").refresh();
                $("#LoadDIv").hide();
                //$$("GridData").adjustRowHeight();
                //$$("GridData").refresh();
            }
            else {
                $$("GridData").clearAll();
                alert("No Record Found");
                $("#LoadDIv").hide();
            }
        }
    })
 
};


function fnPropChange(CompId) {
    debugger;
    if ($("#hdnPgLoad").val() == "2") {
        $$("GridData").clearAll();
        fnLoadBookddl();
    }

};





function fnLoadBookddl() {
    var rowData = [];
    var ary = [];
    Request = {
        REQTYPE: "GET_FNLOADBOOKNM",
        GL_COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
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
                for (i = 0; i < rowData.length; i++) {
                    var set = {};
                    set.id = rowData[i].id;
                    set.value = rowData[i].value;
                    ary.push(set);
                }
             //   ary.splice(0, 0, { value: "ALL", id: " " });

            }
        },
    });
    return ary;

}

function fnLoadDefaultDt() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FNLOADDEFAULTDATE";
    dataparam["PROGNAME"] = "GET_GLTRNBANKRECON";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnStDate").val(rowData[0].SDT);
                $("#hdnEndDate").val(rowData[0].EDT);
            }
        },
    });

    return rowData;
};

function fnGridPrint() {
    debugger;
    var vHeader = "Account Books";
    var FullData = "";

    FullData = $$("GridData").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("GridData"), {
            docHeader: vHeader,
            fit: "page",
            style: true,
            spans: true,
            scroll: false,
            mode: "landscape"
        });
    }
    else {
        alert("Records not present in Report");
    }


};


function fnExcelExport() {
    var vHeader = $("#LayoutText").val();
    var FullData = "";
    FullData = $$("GridData").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("GridData"), {
            filename: vHeader,
            styles: true,
            name: vHeader,
            docHeader: vHeader,
            rawValues: true,
        });
    }
    else {
        alert("Records not present in Report");
    }
};


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

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}


function CurrencyFormat()
{ return webix.Number.numTostr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) }

//webix.event(window, "resize", function () {
//     gridResize("1");
//});
//function gridResize(choice) {
//    debugger;
//    var vWidth = $("#divform").width();
//    $$("frmAccountBooks").define("width", vWidth);
//    $$("frmAccountBooks").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmAccountBooks").define("height", vheight - 100);
//    $$("frmAccountBooks").resize();
//    var vWidth = $("#divform").width();
//    $$("frmAccountBooks").define("width", vWidth);
//    $$("frmAccountBooks").resize();
//    if (choice == "1") {
//        var offsetTop = $$("GridData").getNode().offsetTop;


//        $$("GridData").define("height", ((vheight - offsetTop - 160)));
//        $$("GridData").adjust();
//    }

//}