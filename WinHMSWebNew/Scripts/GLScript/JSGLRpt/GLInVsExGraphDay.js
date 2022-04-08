var app = angular.module('GLTApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    var dt = new Date();
    $("#hdnPgLoad").val("1");
    // fnLoadDefaultDt();
    $("#hdnTooltip").val("0");
    var division = fnDivisionLoad();
    fnGlControl();
    $("#LoadDIv").hide();
    $scope.frmGLInVsExGraphDay = {

        id: "frmGLInVsExGraphDay",
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
                                id: "ddlDivision",
                                stringResult: true,
                                label: "Division",
                                labelAlign: "Left",
                                hidden: ($("#hdnC_DIV_APPL").val() == "1" ? false : true),
                                labelWidth: 52,
                                inputWidth: 280,
                                options: division,
                                width: 330,
                            },
                             {
                                 width: 330,
                                 hidden: ($("#hdnC_DIV_APPL").val() == "1" ? true : false),
                             },

                             {
                                 view: "datepicker",
                                 id: "FrmDt",
                                 inputWidth: 155, labelWidth: 38,
                                 width: 158,
                                 label: "From",
                                 format: "%d/%m/%Y",
                                 stringResult: true,
                                 value: $("#hdnStDate").val(),
                             },

                              {
                                  view: "datepicker",
                                  id: "ToDt",
                                  width: 140, labelWidth: 25,
                                  label: "To",
                                  format: "%d/%m/%Y",
                                  stringResult: true,
                                  value: $("#hdnEndDate").val(),
                              },
                              {

                                  id: "btnDisplay",
                                  view: "button",
                                  width: 128, labelWidth: 90,
                                  inputWidth: 100, width: 100,
                                  label: "Display",
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
                                  tooltip: "Advance Options",
                                  label: '<span class="fa fa-filter"></span>',
                                  hidden:true,
                                  on: {

                                      onItemClick: function () {
                                          $$("frmFilter").show();
                                      }
                                  }
                              },


                        ]
                    },
              {
                  view: "chart",
                  type: "bar",
                  id: "InVsExpBarGraph",
                  width: 900,
                  height: 450,
                  gradient: "rising",
                  barWidth: 60,
                  scroll:true,
                  //falling
                  // hidden:true,
                  //alpha:0.8,
                  radius: 2,
                  border: true,
                  xAxis: {
                      template: "'#Month#",
                      title: "Date",
                      //origin:70
                      //lines:false
                  },
                  yAxis: {
                      step: 10,
                      title: "Value"
                  },
                  legend: {
                      values: [{ text: "Income", color: "#69ba00" }, { text: "Expenses", color: "#de619c" }],
                      // align: "right",
                      valign: "middle",
                      layout: "x",
                      width: 0.1,
                      height: 1,
                    
                  },
                  series: [
                    {
                        value: "#InCome#",
                        color: "#69ba00",
                        id:"inser",
                        //item: {
                        //    borderColor: "#447900",
                        //    color: "#69ba00"
                        //},
                        label: "#InCome#",
                        on:{
                            onItemClick: function (id, e, trg ) {
                                debugger;
                               // $$("inser").getValue();
                                id = this.getItem(id);
                                var Type = "";
                                var From = id.PERIOD_START_DT;
                                var To = id.PERIOD_END_DT;
                                  //if ($("#hdnTooltip").val() == "")
                                Type = "In";
                                // else if ($("#hdnTooltip").val() == "Ex") Type = "Ex";
                                DrilDown(id, From, To, Type);
                 
                            }
                        },
                        tooltip: {
                            template: function (obj) {
                                debugger;
                                $("#hdnTooltip").val("");
                                $("#hdnTooltip").val("In");
                                return "Income " + obj.InCome;
                            }

                        },
                        //tooltip: {
                        //    template: "(#Month#) " + "Income " + "#InCome#",
                          
                        //},
                  
                    },
                    {
                        value: "#Expenses#",
                        id: "inExr",
                        color: "#de619c",
                        label: "#Expenses#",
                        on: {   //onItemClick
                            onItemClick: function (id, e, node) {
                                debugger;
                                id = this.getItem(id);
                                var Type = "";
                                var From = id.PERIOD_START_DT;
                                var To = id.PERIOD_END_DT;
                         
                                Type = "Ex";
                                // else if ($("#hdnTooltip").val() == "Ex") Type = "Ex";
                                 if ($("#hdnTooltip").val() == "0")
                                DrilDown(id, From, To, Type);

                            }
                        },
                        tooltip: {
                            template: function (obj) {
                                debugger;
                                return "Expenses " + obj.Expense;
                            }

                        },
                      
                    },
                  ],
                  data: [],
                  on: {

                      on_dblclick: function (event, series, node) {
                          debugger;
                          
                      }
                  },
                  on: {
                      onLegendClick: function (id, e, node) {
                          debugger;
                          if (e == "0") {
                              $("#hdnTooltip").val("");
                              $("#hdnTooltip").val("In");
                              //$$("InVsExpBarGraph").hideSeries(1);
                              //$$("InVsExpBarGraph").showSeries(0);
                          }
                          else if (e == "1") {
                              $("#hdnTooltip").val("");
                              $("#hdnTooltip").val("Ex");
                              //$$("InVsExpBarGraph").hideSeries(0);
                              //$$("InVsExpBarGraph").showSeries(1);
                          }
                      }
                  }
              },

    


                ]

            }
        ]
    };

});



function DrilDown(id, From, To, Type) {

    var Division = $$("ddlDivision").getValue();

    var CompId = $$("ddlProperty").getValue();

    var AC_NM = "";

    if ($("#hdnTooltip").val() == "In") {
        var AC_ID = "0003";
    }
    else if ($("#hdnTooltip").val() == "Ex") {
        var AC_ID = "0004";
    }


   else if ($("#hdnTooltip").val() == "0") {
        if (Type == "In") var AC_ID = "0003";
        else if (Type == "Ex") var AC_ID = "0004";
    }
     var AC_CAT = "G";

    if (AC_ID != "") {
        $.ajax({
            type: "POST",
            async: false,
            url: "/GLReports/GroupTrialBalancePopup",
            data: "COMP_ID=" + CompId + "&Division=" + Division + "&From=" + From + "&To=" + To + "&AC_NM=" + AC_NM + "&AC_ID=" + AC_ID,
            success: function (data) {
                var PageUrl = "";
                if (AC_CAT == "G") {
                    //Window1 = window.open("/GLTransaction/AccControl?PARTIAL=1", "PopupWindow", "width=970,height=540,left=30,top=100");
                    PageUrl = "/GLTransaction/AccControl?PARTIAL=1";
                }
                else if (AC_CAT == "L") {
                    //Window2 = window.open("/GLReports/GLLedgerDetailPop?PARTIAL=1", "PopupWindow", "width=1300,height=540,left=30,top=100");
                    PageUrl = "/GLReports/GLLedgerDetailPop?PARTIAL=1";
                }

                GlDrillDownWindowLoad(PageUrl);
            }

        });

    }
}




function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillLedDetPopup",
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
                    $$('DrillLedDetPopup').define("width", vWidth);
                    $$('DrillLedDetPopup').define("height", vHeight)
                    $$('DrillLedDetPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-LedDet",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
                }
                ],

            }
        }).show();

    })
};


function fnGlControl() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLCONTROL";
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
                //$("#hdnAttachAppl").val(rowData[0].AttachAppl);
                //$("#hdnNarrationInd").val(rowData[0].NARRATION_IND);
                $("#hdnC_DIV_APPL").val(rowData[0].C_DIV_APPL);
                //$("#hdnAcCdInd").val(rowData[0].AC_CD_IND);
                //$("#hdnMULTI_CURRENCY_IND").val(rowData[0].MULTI_CURRENCY_IND);
                //$("#hdnProjApplInd").val(rowData[0].PROJECT_APPL_IND);
                //$("#hdnCOMMON_NARR_APPL").val(rowData[0].COMMON_NARR_APPL);
                //$("#hdnDateAddInd").val(rowData[0].D_IND);

            }
        },
    });
}

function fnDivisionLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    var ary = [];
    dataparam["REQTYPE"] = "GET_GLDIVISION";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["Option"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLReports/COMAPI_CALL",
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
                ary.splice(0, 0, {  id: " ", value: "ALL"});

            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });

    return ary;
}


function fnPropChange(CompId) {

    $$("InVsExpBarGraph").clearAll();
    $$("InVsExpBarGraph").refresh();
    fnDivisionLoad();
    fnDisplay();
    if ($("#hdnPgLoad").val() == "2") {
        // $$("GridData").clearAll();
    }
};



function fnDisplay() {
    debugger;

    $("#hdnPgLoad").val("2");
    var rowDatad = [];
    var FrmDt = $$("FrmDt").getText();
    var ToDt = $$("ToDt").getText();
    //var CmprlastYr = $$("ChkCmplastYr").getValue();  // "0";
   // var ddlDivision = $$("ddlDivision").getValue();

    
   // $("#LoadDIv").show();
    // $("#LoadDIv").hide();
    Request = {
        REQTYPE: "GET_FNLOADINVSEXPDAYGRAPH",
       // GL_COMPID: window.GL_CompanyID,
        //COMPID: $$("Property").getValue(),  
        COMP_ID:  $$("ddlProperty").getValue(),
        FISCALYEAR: $("#hdnDrildwnFisYr").val(),
        FRMDT: FrmDt,
        TODT: ToDt,
        MONTH: $("#hdnDrildwnMonth").val(),
        //ddlDivision: ddlDivision,  
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: true,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "" && d != undefined && d != null && d != "[]") {
                rowDatad = JSON.parse(d);
                        $$("InVsExpBarGraph").clearAll();
                        $$("InVsExpBarGraph").parse(rowDatad);
                        $$("InVsExpBarGraph").refresh();           
                        $("#LoadDIv").hide();
            }
            else {
                $$("InVsExpBarGraph").clearAll();
                $$("InVsExpBarGraph").refresh(); $$("InVsExpBarGraph").refresh();
                alert("No Record Found");
                $("#LoadDIv").hide();
            }
        }
    })

};




function GoBackScreen() {
    debugger;
   // $$("DrillPartySetlPopup").hide();

};


function fnGridPrint() {
    debugger;
    var vHeader = "Income Vs Expenses";
    var FullData = "";
        FullData = $$("InVsExpBarGraph").serialize();
    var len = FullData.length;
    if (len > 0) {
        if (len > 0 ) {
            webix.print($$("InVsExpBarGraph"), {
                docHeader: vHeader,
                fit: "page",
                style: true,
                spans: true,
                scroll: false,
                mode: "landscape"
            });
        }
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
//    $$("frmGLInVsExGraphDay").define("width", vWidth);
//    $$("frmGLInVsExGraphDay").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmGLInVsExGraphDay").define("height", vheight - 100);
//    $$("frmGLInVsExGraphDay").resize();
//    var vWidth = $("#divform").width();
//    $$("frmGLInVsExGraphDay").define("width", vWidth);
//    $$("frmGLInVsExGraphDay").resize();
//    if (choice == "1") {
//        var offsetTop = $$("GridData").getNode().offsetTop;


//        $$("GridData").define("height", ((vheight - offsetTop - 160)));
//        $$("GridData").adjust();
//    }

//}