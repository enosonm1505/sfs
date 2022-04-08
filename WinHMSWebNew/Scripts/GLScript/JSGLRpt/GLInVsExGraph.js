var app = angular.module('GLTApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    var dt = new Date();
    fnLondGlInitCont(CompId);
    fnAccountDt("2");
    $("#hdnPgLoad").val("1");
    $("#hdnPrevYrLoad").val("0");
    fnLoadDefaultDt();
    fnGlControl();
    var division = fnDivisionLoad();
    $("#LoadDIv").hide();
    $scope.frmGLInVsExGraph = {

        id: "frmGLInVsExGraph",
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
                                labelWidth: 52,
                                inputWidth: 280,
                                hidden: ($("#hdnC_DIV_APPL").val() == "1" ? false : true),
                                options: division,
                                value:" ",
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
                                 format: "%M %Y",
                                 type: "month",
                                 value: $("#hdnStDate").val(),
                                 
                             },
                              {
                                  view: "datepicker",
                                  id: "ToDt",
                                  width: 140, labelWidth: 25,
                                  label: "To",
                                  format: "%M %Y",
                                  type: "month",
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
                                  tooltip:"Advance Options",
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
                  view: "chart",
                  type: "bar",  
                  id: "InVsExpBarGraph",
                  width: 900,
                  height: 500,
                  gradient: "rising",
                  barWidth: 60,
                  radius: 2,
                  border: true,
                  xAxis: {
                      template: "'#Month2#",
                      title: "Period",
                  },
                  yAxis: {
                      start: 0,
                      step: 100,

                      end: 1000,
                      title: "Amt (In 1000)"
                  },
                  legend: {
                      values: [{ text: "Income", color: "#69ba00" }, { text: "Expenses", color: "#de619c" }],          //{ text: "Income(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#69ba00" : "#69ba00", },                       { text: "Expenses(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#de619c" : "#de619c" }
                      valign: "middle",
                      layout: "x",
                      width: 0.1,
                      height:1,
                  },
                  series: [
                    {
                        value: "#InCome#",
                        color: "#69ba00",
                        label: "#InCome#",
                        tooltip: {
                            template: "(#Month2#) "+"Income " + "#InCome#" 
                        }
                    },
                    {
                        value: "#InCome1#",
                        color: "#69ba00",

                        label: "#InCome1#",
                        tooltip: {
                            template: "(#Month2#) " + "Income " + "#InCome1#"
                        }
                    },
                    {
                        value: "#Expenses#",
                        color: "#de619c",
                        label: "#Expenses#",
                        tooltip: {
                            template: "(#Month2#) "+"Expenses " + "#Expenses#" 
                        }
                    },
                     {
                         value: "#Expenses1#",
                         color: "#de619c",
                         label: "#Expenses1#",
                         tooltip: {
                             template: "(#Month2#) " + "Expenses " + "#Expenses1#"
                         }
                     },
                  ],
                  data: [],
                  on: {
                      onItemClick: function (id, e, node) {
                          debugger;
                          id = this.getItem(id);
                          var PERIOD_STRT_DT = "01" + id.PERIOD_END_DT.slice(2);
                          var PERIOD_END_DT = id.PERIOD_END_DT;
                          var FiscYr = id.FiscalYear;
                          var COMP_ID = id.Comp_Id;
                          var Month = id.Month2;
                          var Division = $$("ddlDivision").getValue();
                          var SW = Number(screen.width) - 100;
                          var Sh = Number(screen.height) - 100;

                          var UrlQryStr = COMP_ID + "~" + PERIOD_STRT_DT + "~" + PERIOD_END_DT + "~" + FiscYr + "~" + Month + "~" + Division;// "~" + PARTY_NM + "~" + PARTY_ID;
                          UrlQryStr = encodeURIComponent(UrlQryStr);
                          if (Month != "" && Month != null) {
                                  //  Window1 = window.open("/GLReports/GLRptPartyBillSettle?ID=" + UrlQryStr + "", "PartySettlement", "width=" + SW + ",height=" + Sh + ",left=50,top=10 ");
                              var PageUrl = "/GLReports/GLInVsExGraphDay?PARTIAL=1&ID=" + UrlQryStr + "";
                                  GlDrillDownWindowLoad(PageUrl);
                              }
                      }
                  },
                  'onBeforeFilter': function () {
                      this.select(this.getFirstId());
                      webix.UIManager.setFocus(this);
                      this.refresh();
                  },
                  'onAfterFilter': function () {
                      //debugger;
                      this.select(this.getFirstId());
                      webix.UIManager.setFocus(this);
                      this.refresh();
                  }
              },

             {
                 view: "chart",
                 type: "line",  
                 id:"InVsExLineGraph",
                 width: 900,
                 height: 500,
                 gradient: "rising",
                 hidden: true,
                 xAxis: {
                     template: "'#Month2#",
                     title: "Period",
                     //origin:70
                     //lines:false
                 },
                 yAxis: {
                     start:0,
                     step: 100,                   
                     end: 1000,
                     title: "Amt (In 1000)"
                 },
                 //origin: 35,
                 line: {
                     color: "#69ba00",
                     width: 2
                 },
                 offset: 0,
                 legend: {
                     values: [{ text: "Income(Curr Yr)", color: "#69ba00" }, { text: "Income(Prev Yr)" }, { text: "Expenses(Curr Yr)", color: "#4aa397" }, { text: "Expenses(Prev Yr)" }],
                     // align: "right",
                     valign: "middle",
                     layout: "x",
                     width: 50,
                     margin: 8,
                     marker: {
                         type: "item",
                         width: 18
                     }
                 },
                 series: [
                   {
                       value: "#InCome#",
                       item: {
                           borderColor: "#447900",
                           color: "#69ba00",
                           type: "r",
                           radius:3
                       },
                       line: {
                           color: "#69ba00",
                           width: 2
                       },
                       label:"#InCome#",
                       tooltip: {
                           template: "(#Month2#)"+"Income " + "#InCome#"
                       }
                   },
                   {
                       value: "#InCome1#",
                       item: {
                           borderColor: "#0a796a",
                           color: "#4aa397",
                           type: "t",
                           radius: 4 //radious:0
                       },
                       line: {
                           color: "#4aa397",
                           width: 2
                       },
                       label: "#InCome1#",
                       tooltip: {
                           template: "(#Month2#)" + "Income " + "#InCome1#"
                       }
                   },
                   {
                       value: "#Expenses#", hidden: true,
                       item: {
                           borderColor: "#b7286c",
                           color: "#de619c",
                           type: "r",  
                           radius: 3
                       },
                       line: {
                           color: "#de619c",
                           width: 2,
                          
                       },
                       label: "#Expenses#",
                       tooltip: {
                           template:"(#Month2#)"+ "Expenses " + "#Expenses#"
                       }
                   },
                       {
                           value: "#Expenses1#",
                           hidden: true,
                           item: {
                               borderColor: "#ca6f1e",
                               color: "#e67e22",
                               type: "t",  //r-round , s-squre , t-triangle
                               radius: 4
                           },
                           line: {
                               color: "#e67e22",
                               width: 2,

                           },
                           label: "#Expenses1#",
                           tooltip: {
                               template: "(#Month2#)" + "Expenses " + "#Expenses1#"
                           }
                       },

                 ],
                 data: [],
                 on: {
                     onItemClick: function (id, e, node) {
                     },
                     'onBeforeFilter': function () {
                         this.select(this.getFirstId());
                         webix.UIManager.setFocus(this);
                         this.refresh();
                     },
                     'onAfterFilter': function () {
                         //debugger;
                         this.select(this.getFirstId());
                         webix.UIManager.setFocus(this);
                         this.refresh();
                     }
                 },

             },


                   {
                       view: "chart",
                       type: "line",   
                       id: "InVsExGrphMulty",
                       width: 900,
                       height: 500,
                       gradient: "rising",
                       xAxis: {
                           template: "'#Month2#",
                           title: "Period",
                       },
                       yAxis: {
                           start: 0,
                           step: 100,

                           end: 1000,
                           title: "Amt (In 1000)"
                       },
                       data: [],
                       on: {
                           onItemClick: function (id, e, node) {
                               //debugger;
                               //id = this.getItem(id);
                               //alert("value is: " + id.InCome + "Income" + id.Expenses + "Expenses")
                           },
                           'onBeforeFilter': function () {
                               this.select(this.getFirstId());
                               webix.UIManager.setFocus(this);
                               this.refresh();
                           },
                           'onAfterFilter': function () {
                               //debugger;
                               this.select(this.getFirstId());
                               webix.UIManager.setFocus(this);
                               this.refresh();
                           }
                       },
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
                          id: "ChkCmplastYr",
                          view: "checkbox",
                          labelRight: "Compare With Last Year",
                          labelWidth: 0,
                          width: 152,
                          on: {
                              "onChange": function (newval, oldVal) {
                                  debugger;
                                  $$("InVsExpBarGraph").clearAll();
                                  $$("InVsExpBarGraph").refresh();
                                  $$("InVsExLineGraph").clearAll();
                                  $$("InVsExLineGraph").refresh();
                                  if (newval == "1") {
                                      $$("ChkLineGrph").enable();
                                      $("#hdnPrevYrLoad").val("1");
                                      $$("InVsExpBarGraph").refresh();
                                      if ($("#hdnPgLoad").val() == "2")
                                          fnDisplay();

                                   var ary= [{ text: "Income(Curr Yr)", color: "#69ba00" }, { text: "Income(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#69ba00" : "#69ba00", }, { text: "Expenses(Curr Yr)", color: "#de619c" }, { text: "Expenses(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#de619c" : "#de619c" }]
                                      const Barchart = $$("InVsExpBarGraph");
                                      Barchart.define('legend', {
                                          values: ary,
                                          valign: "middle",
                                          layout: "x",
                                          height: 1,
                                      });
                                      $$("InVsExpBarGraph").refresh();
                                  }
                                  else {
                                      $$("ChkLineGrph").disable();
                                      $$("ChkLineGrph").setValue("0")
                                      $$("InVsExLineGraph").hide();
                                      $$("InVsExpBarGraph").show();
                                      $("#hdnPrevYrLoad").val("0");
                                      $$("InVsExpBarGraph").refresh(); $$("rdbtnInOrEx").disable();
                                      if ($("#hdnPgLoad").val() == "2")
                                          fnDisplay();
                                      var ary = [{ text: "Income", color: "#69ba00" }, { text: "Expenses", color: "#de619c" }, ]
                                      const Barchart = $$("InVsExpBarGraph");
                                      Barchart.define('legend', {
                                          values: ary,
                                          valign: "middle",
                                          layout: "x",
                                          height: 1,
                                      });
                                      $$("InVsExpBarGraph").refresh();
                                  }
                              }
                          }
                      },

                        {
                            view: "checkbox",
                            id: "ChkLineGrph",
                            width: 180, labelWidth: 0,
                            labelRight: "Line Graph",
                            disabled: true,
                            on: {
                                "onChange": function (newval, oldVal) {
                                    if (newval == "1") {
                                        $$("InVsExLineGraph").show();
                                        $$("InVsExpBarGraph").hide();
                                        $$("rdbtnInOrEx").enable();
                                        lineHideShow($$("rdbtnInOrEx").getValue());
                                    }
                                    else {
                                        $$("InVsExLineGraph").hide();
                                        $$("InVsExpBarGraph").show();
                                        $$("rdbtnInOrEx").disable();
                                    }

                                }
                            }
                        },
                        {
                            view: "radio",
                            id: "rdbtnInOrEx",
                            value: 1,
                            inputWidth: 120,
                            width: 120,
                            disabled:true,
                            css: ".RtBtnAlign",
                            customRadio: false,
                            options: [{ "id": 1, "value": "Income" }, { "id": 2, "value": "Expenses" }, ],
                            vertical: true,
                            on: {
                                "onChange": function (newval, oldVal) {
                                    lineHideShow(newval);

                                }
                            }
                        },




                {},

                {
                    cols: [{}, {
                        view: "button",
                        id: "btnFok",
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


function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillPartySetlPopup",
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

                    $$('DrillPartySetlPopup').define("width", vWidth);
                    $$('DrillPartySetlPopup').define("height", vHeight)
                    $$('DrillPartySetlPopup').resize();
                }, 'onKeyPress': function (code, e) {
                    debugger;
                    if (e == "27") {
                        $$('DrillPartySetlPopup').hide();
                    }


                },
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-PartySetl",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
                }
                ],

            }
        }).show();

    })
};

function fnLondGlInitCont(CompId) {
    debugger;
    window.GL_CompanyID = "";
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNLONDGLINITCONT",
        COMPID: CompId,
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
                window.GL_CompanyID = rowData.GL_CompanyID;
                //window.FiscalYear = rowData.FiscalYear;
                //window.FiscalStartDT = rowData.FiscalFromDt;
                //window.FiscalFromDt = rowData.PeriodStartDt;
                //window.FiscalToDt = rowData.PeriodEndDt;

                //$$("ToDt").setValue(rowData.FiscalToDt);
                //$$("AsOnDt").getPopup().getBody().config.minDate = new Date(rowData.FiscalFromDt);
                //$$("AsOnDt").getPopup().getBody().config.maxDate = new Date(rowData.FiscalToDt);
                //$$("AsOnDt").refresh();

            }
        },
    });
}


function fnPropertyLoadd(CompId) {
    debugger;
    Request = {
        REQTYPE: "GET_FNMULPROPERTY",
        COMPID: CompId,
    }
    Prop_Id = CompId;
    var rowData = [];
    var options = [];

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
                $$("Property").define("options", rowData);
                $$("Property").refresh();
                $$("Property").setValue(Prop_Id);
            }
        },
    });
};

function lineHideShow(value) {
    if (value == "1") {
        $$("InVsExLineGraph").hideSeries(2); $$("InVsExLineGraph").hideSeries(3);
        $$("InVsExLineGraph").showSeries(0); $$("InVsExLineGraph").showSeries(1);
    }
    else {
        $$("InVsExLineGraph").hideSeries(0); $$("InVsExLineGraph").hideSeries(1);
        $$("InVsExLineGraph").showSeries(2); $$("InVsExLineGraph").showSeries(3);
    }
}

function BarHideShow(value) {
    if (value == "1") {
        $$("InVsExpBarGraph").showSeries(1); $$("InVsExpBarGraph").showSeries(3);
    }
    else {
        $$("InVsExpBarGraph").hideSeries(1); $$("InVsExpBarGraph").hideSeries(3);
    }
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
                   ary.splice(0, 0, { value: "ALL", id: " " });

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

function fnPropChange(CompId) {

    CompId = $$("Property").getValue();
    if (CompId.indexOf(",") >= 0) {
        $$("ChkCmplastYr").setValue("0");
        $$("ChkLineGrph").setValue("0");
        $$("rdbtnInOrEx").enable();
        $$("ChkCmplastYr").disable();
        $$("ChkLineGrph").disable();
       // $$("rdbtnInOrEx").disable();

    }
    else {
        $$("ChkCmplastYr").enable();
        $$("ChkLineGrph").disable();
        $$("rdbtnInOrEx").disable();
    }

    $$("InVsExpBarGraph").clearAll();
    $$("InVsExpBarGraph").refresh(); $$("InVsExpBarGraph").refresh();
    $$("InVsExLineGraph").clearAll();
    $$("InVsExLineGraph").refresh(); $$("InVsExLineGraph").refresh();
    $$("InVsExGrphMulty").clearAll();
    $$("InVsExGrphMulty").refresh(); $$("InVsExGrphMulty").refresh();
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
    var CmprlastYr = $$("ChkCmplastYr").getValue();  
    var ddlDivision = $$("ddlDivision").getValue();
    var bMulti = "0";
    CompId = $$("Property").getValue();
    if (CompId.indexOf(",") >= 0) {
        bMulti = "1";

        $$("InVsExLineGraph").hide();
        $$("InVsExpBarGraph").hide();
        $$("InVsExGrphMulty").show();

    }
    else {
        if ($$("ChkCmplastYr").getValue() == "1" && $$("ChkLineGrph").getValue() == "1") {
            $$("InVsExLineGraph").show();
            $$("InVsExGrphMulty").hide();
            $$("InVsExpBarGraph").hide();
        }
        else {
            $$("InVsExLineGraph").hide();
            $$("InVsExGrphMulty").hide();
            $$("InVsExpBarGraph").show();
        }
    }
    $("#LoadDIv").show();
    Request = {
        REQTYPE: "GET_FNLOADINVSEXPGRAPH",
        GL_COMPID: window.GL_CompanyID,
        COMPID: $$("Property").getValue(),
        FiscalYear: $("#hdnFiscalYr").val(),
        FrmDt: FrmDt,
        ToDt: ToDt,
        CmprlastYr: CmprlastYr,
        ddlDivision: ddlDivision,
        bMulti: bMulti
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
                var dtCash = rowDatad.dtCash;
                if (dtCash.length > 0) {

                    var MULTICOMP = rowDatad.dtMultiCmp;
                    if (bMulti != "1") {
                        $$("InVsExpBarGraph").clearAll();
                        $$("InVsExpBarGraph").parse(rowDatad.dtCash);
                        $$("InVsExpBarGraph").refresh();
                        $$("InVsExLineGraph").clearAll();
                        $$("InVsExLineGraph").parse(rowDatad.dtCash);
                        $$("InVsExLineGraph").refresh();
                        $("#LoadDIv").hide();
                    }

                    if (bMulti == "1") {
                        debugger;

                        var InOrEx = $$("rdbtnInOrEx").getValue();
                        if (InOrEx == "1") var InVsExOpt = "Income";
                        else var InVsExOpt = "Expenses";

                        var mulcompNM = rowDatad.dtMulCompNm;

                        $$("InVsExGrphMulty").clearAll();
                        var str = []; str = CompId.split(',');
                        var str1 = []; str1 = CompId.split(','); var ary = [];

                        const linechart = $$("InVsExGrphMulty");
                        linechart.removeAllSeries();

                        for (i = 0; i < str.length; i++) {
                            if (InOrEx == "1") var MULCMP = str1[i] + "1";
                            else var MULCMP = str1[i] + "2";
                             //var STRRR = "WS1";  
                            let color = "#" + Math.random().toString(16).substr(2, 6);

                            var set = {};

                            linechart.addSeries({
                                // value: '#InCome${i}#',
                                value: "#" + MULCMP + "#",
                                // value: '#" + MULCMP + "$#',
                                item: {
                                    borderColor: "#447900",
                                    color: color,
                                    type: "r",
                                    radius: 3
                                },
                                line: {
                                    color: color,
                                    width: 2,
                                },
                                label:"#" + MULCMP + "#",
                                tooltip: {
                                    template: "(#Month2#)" + InVsExOpt+": " + "#" + MULCMP + "#",
                                }
                            }
                                );

                            set.text = mulcompNM[i].CompanyNM + "(" + InVsExOpt + ")";
                            set.color = color; ary.push(set);
                            //legend: {
                            //        values: [{ text: "Income(Curr Yr)", color: "#69ba00" }, { text: "Income(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#69ba00" : "#69ba00", }, { text: "Expenses(Curr Yr)", color: "#de619c" }, { text: "Expenses(Prev Yr)", color: ($.trim($("#hdnPrevYrLoad").val())) == "1" ? "#de619c" : "#de619c" }],
                            //    // align: "right",
                            //        valign: "middle",
                            //        layout: "x",
                            //        width: 0.1,
                            //        height:1,
                            //        },


                            $$("InVsExGrphMulty").parse(rowDatad.dtMultiCmp);
                            $$("InVsExGrphMulty").refresh();
                        }

                        linechart.define('legend', {
                            values: ary,
                            valign: "middle",
                            layout: "x",
                            height: 1,
                        });
                        $$("InVsExGrphMulty").refresh();
                    }
                    $("#LoadDIv").hide();
                }
                else {
                    $$("InVsExpBarGraph").clearAll();
                    $$("InVsExpBarGraph").refresh(); 
                    $$("InVsExLineGraph").clearAll();
                    $$("InVsExLineGraph").refresh(); 
                    $$("InVsExGrphMulty").clearAll();
                    $$("InVsExGrphMulty").refresh(); 
                    alert("No Record Found");
                    $("#LoadDIv").hide();
                }

            }
            else {
                 $$("InVsExpBarGraph").clearAll();
                 $$("InVsExpBarGraph").refresh(); $$("InVsExpBarGraph").refresh();
                $$("InVsExLineGraph").clearAll(); 
                $$("InVsExLineGraph").refresh(); $$("InVsExLineGraph").refresh();
                $$("InVsExGrphMulty").clearAll();
                $$("InVsExGrphMulty").refresh(); $$("InVsExGrphMulty").refresh();
                alert("No Record Found");
                $("#LoadDIv").hide();
            }
        }
    })

};

function fnLoadDefaultDt() {
    debugger;
    var rowData = [];
    var ary = [];
    Request = {
        REQTYPE: "GET_FNLOADMONTH",
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
                $("#hdnStDate").val($.trim(rowData[0].SDT));
                $("#hdnEndDate").val($.trim(rowData[0].EDT));
            }
        },
    });

    return rowData;
};

function fnGridPrint() {
    debugger;
    var vHeader = "Income Vs Expenses";
    var FullData = "";
    var linegrph = $$("ChkLineGrph").getValue();
    if(linegrph!="1")
        FullData = $$("InVsExpBarGraph").serialize();
    else FullData = $$("InVsExLineGraph").serialize();

    CompId = $$("Property").getValue();
    if (CompId.indexOf(",") >= 0) {
        FullData = $$("InVsExGrphMulty").serialize();
        var len = FullData.length;
        if (len > 0){
            webix.print($$("InVsExGrphMulty"), {
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
    }
    else{

    var len = FullData.length;
    if (len > 0) {
        if (len > 0 && linegrph != "1") {
            webix.print($$("InVsExpBarGraph"), {
                docHeader: vHeader,
                fit: "page",
                style: true,
                spans: true,
                scroll: false,
                mode: "landscape"
            });
        }
        if (len > 0 && linegrph == "1") {
            webix.print($$("InVsExLineGraph"), {
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
//    $$("frmGLInVsExGraph").define("width", vWidth);
//    $$("frmGLInVsExGraph").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmGLInVsExGraph").define("height", vheight - 100);
//    $$("frmGLInVsExGraph").resize();
//    var vWidth = $("#divform").width();
//    $$("frmGLInVsExGraph").define("width", vWidth);
//    $$("frmGLInVsExGraph").resize();
//    if (choice == "1") {
//        var offsetTop = $$("GridData").getNode().offsetTop;


//        $$("GridData").define("height", ((vheight - offsetTop - 160)));
//        $$("GridData").adjust();
//    }

//}