var app = angular.module('GLTApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    var dt = new Date();
    fnAccountDt("2");
    $("#hdnPgLoad").val("1");
    var ddlGroup = fnLoadGroupddl();
    fnLoadDefaultDt();
    $("#LoadDIv").hide();
    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmOpenBalLst = {

        id: "frmOpenBalLst",
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
                                id: "ddlGroup",
                                stringResult: true,
                                label: "Group",
                                labelAlign: "Left",
                                options: ddlGroup,
                                value:" ",
                                labelWidth: 38,
                                inputWidth: 280,
                                width: 393,
                            },

                             {
                                 view: "datepicker",
                                 id: "AsonDt",
                                 inputWidth: 155, labelWidth: 38,
                                 width:158,
                                 label: "As On",
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
                                  hidden : true,
                              },
                              {

                                  id: "btnDisplay",
                                  view: "button",
                                  width: 128, labelWidth: 90,
                                  inputWidth: 100, width: 100,
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

                                      view: "button",
                                      id: "AdvSrch",
                                      css: "webix_primary",
                                      inputWidth: 40,
                                      width: 80,
                                      tooltip: true,
                                      label: '<span class="fa fa-filter"></span>',
                                      on: {

                                          onItemClick: function () {
                                              $$("frmFilter").show();
                                          }
                                      }
                                  },

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
                        editable: true,
                        hover: "gridHover",
                        tooltip: true,
                        scroll: true,
                        resizeColumn: true,
                        resizeRow: true,
                        spans: true,
                        autoConfig: true,
                        position: "flex",
                        css: "webix_header_border wingrd_hight",

                        columns: [
                                { header: "Ac_Cd", id: "AC_CD", width: 130, css: { 'text-align': 'center ! important' }, tooltip: false },
                                { header: "Ac Name", id: "AC_NM", width: 300, css: { 'text-align': 'center ! important' }, },
                                { header: "Dr_Amt", id: "DRBaseAmt", width: 120, css: { 'text-align': 'right ! important' }, tooltip: false },
                                 { header: "Cr_Amt", id: "CRBaseAmt", width: 120, css: { 'text-align': 'right ! important' }, tooltip: false },
                                 { header: "Vouch Dt", id: "Voucher_Date", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false, hidden: true },
                                 { header: "Vouch No", id: "Voucher_NoAC", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false, hidden: true },
                                 { header: "Ref Type", id: "RefType", width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                                { header: "Ref Name", id: "RefName", width: 130, css: { 'text-align': 'center ! important' },  hidden: true },
                                 { header: "Due Dt", id: "DueDate", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false, hidden: true },
                                 
                                 { header: "DR", id: "DR_AMT", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false, hidden: true },
                                { header: "CR", id: "CR_AMT", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false, hidden: true },
                                { header: "Currency", id: "Currency", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false, hidden: true },
                                { header: "Forn_Amt", id: "Forn_amt", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false, hidden: true },
                                { header: "Narration", id: "Narration", width: 250, css: { 'text-align': 'left ! important' },  hidden: true },


                        ],
                        scheme: {
                            $change: function (item) {

                                if (item.AC_NM == "Total" || item.AC_NM == "Difference") {
                                    var rowid = item.id;
                                    item.$css = "GroupGrTot";
                                    $$("GridData").refresh();

                                }
                            
                            },

                        },
                     

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
        width: 400,
        css: "WebIxStyle",
        move: true,
        body: {
           // paddingX: 30,
            cols: [{
                rows: [
                  
                      {
                          id: "ChkBilldet",
                          view: "checkbox",
                          labelRight: "Bill Details",
                          labelWidth: 0,
                          width: 150,
                          on: {
                              "onChange": function (newval, oldVal) {
                                  $$("GridData").clearAll();
                                  ShowOptionsColums(newval, oldVal);
                                  if (newval == "1") {
                                      $$("ChkFornAmt").enable();
                                  }
                                  else {
                                      $$("ChkFornAmt").disable();
                                      $$("ChkFornAmt").setValue("0");
                                  }
                              }
                          }
                      },
                      {
                          view: "checkbox",
                          id: "ChkFornAmt",
                          width: 180, labelWidth: 0,
                          labelRight: "Forn.Amt",
                          disabled: true,
                          on: {
                              "onChange": function (newval, oldVal) {
                                  $$("GridData").clearAll();
                                  showcolFornAmt(newval, oldVal);
                                       
                              }
                          }
                      },
                       {
                           view: "checkbox",
                           id: "ChkCurYrLedger",
                           width: 180, labelWidth: 0,
                           labelRight: "Current Year Ledger",
                       },

                {},

                {
                    cols: [{},{
                        view: "button",
                        id: "btnFok",
                       // inputWidth: 80, width: 80,
                        width: 56, labelWidth: 80,
                        icon: "wxi-check",
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

function ShowOptionsColums(newval, oldVal) {

    if (newval == "1") {
        $$("GridData").showColumn("Voucher_Date");
        $$("GridData").showColumn("ixPlan");
        $$("GridData").showColumn("ixVenueRate");
        $$("GridData").showColumn("Voucher_NoAC");
        $$("GridData").showColumn("RefType");
        $$("GridData").showColumn("RefName");
        $$("GridData").showColumn("DueDate");
        $$("GridData").showColumn("DR_AMT");
        $$("GridData").showColumn("CR_AMT");
        $$("GridData").showColumn("Narration");
    }
    else {
        $$("GridData").hideColumn("Voucher_Date");
        $$("GridData").hideColumn("ixPlan");
        $$("GridData").hideColumn("ixVenueRate");
        $$("GridData").hideColumn("Voucher_NoAC");
        $$("GridData").hideColumn("RefType");
        $$("GridData").hideColumn("RefName");
        $$("GridData").hideColumn("DueDate");
        $$("GridData").hideColumn("DR_AMT");
        $$("GridData").hideColumn("CR_AMT");
        $$("GridData").hideColumn("Narration");
    }

}

function showcolFornAmt(newval, oldVal) {

    if (newval == "1") {
        $$("GridData").showColumn("Currency");
        $$("GridData").showColumn("Forn_amt");

    }
    else {
        $$("GridData").hideColumn("Currency");
        $$("GridData").hideColumn("Forn_amt");

    }

}


function fnDisplay() {
    $("#LoadDIv").show();
    $("#hdnPgLoad").val("2");
    if ($$("ddlGroup").getValue() == "") {
        alert("Select Group");
        return false;
    }
    var rowDatad = [];
    var AsonDt = $$("AsonDt").getText();
    var ddlGroup = $$("ddlGroup").getValue();
    var ChkBilldetail = $$("ChkBilldet").getValue(); 
    var ChkCurYrLedger = $$("ChkCurYrLedger").getValue();
   
    Request = {
        REQTYPE: "GET_FNLOADBALLIST",
        COMPID: $("#hdnCompId").val(),
        FiscalYear: $("#hdnFiscalYr").val(),
        AsonDt: AsonDt,
        ddlGroup: ddlGroup,
        ChkBilldetail: ChkBilldetail,
        ChkCurYrLedger: ChkCurYrLedger
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: true,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "" && d != undefined && d != null) {
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
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            bVal = "0";
            $("#LoadDIv").hide();
        }
    })

};


function fnPropChange(CompId) {
    if ($("#hdnPgLoad").val() == "2") {
        $$("GridData").clearAll();
        fnLoadGroupddl();
    }

};


function ClrControl() {
    $$("GridData").clearAll();
}


function fnLoadGroupddl() {
    var rowData = [];
    var ary = [];
    Request = {
        REQTYPE: "GET_GROUPLOAD",
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
            if (d != "") {
                rowData = JSON.parse(d);
                for (i = 0; i < rowData.length; i++) {
                    var set = {};
                    set.id = rowData[i].id;
                    set.value = rowData[i].value;
                    ary.push(set);
                }
                ary.splice(0, 0, { value: "ALL", id: " " });

            }
        },
    });
    return ary;

}

function fnLoadDefaultDt() {
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
    var vHeader = "Opening Balance List";
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
//    $$("frmOpenBalLst").define("width", vWidth);
//    $$("frmOpenBalLst").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmOpenBalLst").define("height", vheight - 100);
//    $$("frmOpenBalLst").resize();
//    var vWidth = $("#divform").width();
//    $$("frmOpenBalLst").define("width", vWidth);
//    $$("frmOpenBalLst").resize();
//    if (choice == "1") {
//        var offsetTop = $$("GridData").getNode().offsetTop;


//        $$("GridData").define("height", ((vheight - offsetTop - 160)));
//        $$("GridData").adjust();
//    }

//}