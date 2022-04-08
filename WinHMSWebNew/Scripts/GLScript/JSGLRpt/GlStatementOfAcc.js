
var app = angular.module('GLRApp', ['webix']);

app.controller("GLReportsController", function ($scope) {

    $("#LoadDIv").hide();

    $("#hdnChkAP").val("1");
    $("#hdnChkAr").val("1");
    
    var PartGrpData = fnPartGrpLoad();
    fnAccountDt("2");

    $scope.divExcel = {
        view: "button",
        id: "divExcel",
        //container: "divExcel",
        //type: "icon",
        label: "Excel",
        //icon: 'fa fa-file-excel-o',
        width:80,
        tooltip: true, value: "Excel",
        click: function () {
          
            var FullData = $$("grdSOABRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                $("#LoadDIv").show();
                webix.toExcel($$("grdSOABRpt"), {
                    filename: "SOA",
                    styles: true,
                    spans: true,
                    header:false,
                    name: "Statement Of Accounts",
                    docHeader: "Statement Of Accounts",
                });
                $("#LoadDIv").hide();
            }
            else {
                AlertMessage('Records not present in Report');
                return false;;
            }
        }
    }

    $scope.divPrint = {
        view: "button",
        id: "divPrint",
        //container: "divExcel",
        //type: "icon",
        label: "Print",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Print",
        click: function () {

            var FullData = $$("grdSOABRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                
                if (parseInt($("#hdnPartyCnt").val()) <= 10) {

                    var PartyArr = $("#hdnPrintParty").val().split(',');

                    if (PartyArr.length > 0) {
                        for (i = 0; i < PartyArr.length; i++) {

                            if ($.trim(PartyArr[i]) != "") {

                                var MtInd = "false"; var SummInd = "true";
                                var SumTotal = "S";

                                var Host = window.location.host;
                                var PageUrl = "http://" + Host.toString().trim() + "/GL/RptPdfOpen.aspx";
                                var Mleft = (screen.width / 2) - (840 / 2);
                                var Mtop = (screen.height / 2) - (550 / 2);
                                window.open("/GL/RptPdfOpen.aspx?FISCALYR=" + $("#hdnFiscalYr").val() + "&GroupID=" + $$("ddlPartyGrp").getValue() + "&COMPID=" + $("#hdnCompId").val() + ""
                                                         + "&PId=" + PartyArr[i] + "&Sdt=" + $$("txtFrmDate").getValue() + "&EDt=" + $$("txtToDate").getValue()
                                                         + "&MtInd=" + MtInd + "&SummInd=" + SummInd + "&SumTotal=" + SumTotal
                                                         + "&RPT=" + "GLSOA" + " ", '_blank', "width=840px,height=550,scrollbars=yes,top=\'+Mtop+\',left=\'+Mleft+\'", 0)

                                sleep(3000);
                            }
                        }
                    }
                }
                else {

                    AlertMessage('Party Selection less then or equal 10 !');
                    return false;;
                }
            }
            else {
                AlertMessage('Records not present in Report');
                return false;;
            }

        }
    }
    
    $scope.frmGlRptStateOfAcc = {

        id: "frmGlRptStateOfAcc",
        view: 'form',
        minWidth: 1000,
        maxWidth: 5000,
        minHeight: 520,
       
        paddingX: 20,
        elements: [
            {
                
                paddingX: 10,
                PaddingY: 10,
                rows: [
                   {
                       rows: [
                           {
                               cols: [
                                   {
                                       id: "ChkAr",
                                       view: "checkbox",
                                       label: "AR",
                                       labelWidth: 24,
                                       labelAlign: "Left",
                                       inputWidth: 60,
                                       maxWidth: 75,
                                       value: 1,
                                       on: {
                                           "onChange": function () {
                                               $("#hdnChkAr").val($$("ChkAr").getValue());

                                               var PartGrpData = fnPartGrpLoad();
                                               $$("ddlPartyGrp").define("options", PartGrpData);
                                               $$("ddlPartyGrp").refresh();
                                               $$("ddlPartyGrp").setValue($("#hdnPartyDef").val());
                                           }
                                       }
                                   },
                                   {
                                       id: "ChkAp",
                                       view: "checkbox",
                                       label: "AP",
                                       labelWidth: 25,
                                       labelAlign: "Left",
                                       inputWidth: 60,
                                       maxWidth: 75,
                                       value: 1,
                                       on: {
                                           "onChange": function () {
                                               $("#hdnChkAP").val($$("ChkAp").getValue());

                                               var PartGrpData = fnPartGrpLoad();
                                               $$("ddlPartyGrp").define("options", PartGrpData);
                                               $$("ddlPartyGrp").refresh();
                                               $$("ddlPartyGrp").setValue($("#hdnPartyDef").val());
                                           }
                                       }
                                   },
                                   {
                                       view: "datepicker",
                                       id: "txtFrmDate",
                                       disable: true,
                                       stringResult: true,
                                       label: "For Period From",
                                       format: "%d/%m/%Y",
                                       value: $("#hdnCurrentDt").val(),
                                       labelAlign: "Left",
                                       inputWidth: 220,
                                       labelWidth: 100,
                                       maxWidth: 190,
                                       minWidth: 220,
                                   },
                                   {
                                       view: "datepicker",
                                       id: "txtToDate",
                                       disable: true,
                                       stringResult: true,
                                       label: "To",
                                       format: "%d/%m/%Y",
                                       value: $("#hdnCurrentDt").val(),
                                       labelAlign: "Right",
                                       inputWidth: 150,
                                       labelWidth: 30,
                                       maxWidth: 160,
                                       minWidth:160,
                                   },
                                   {
                                       id: "btnDisplay",
                                       view: 'button',
                                       css: "webix_primary",
                                       label: 'Display',
                                       inputWidth: 100,
                                       labelWidth: 30,
                                       maxWidth: 100,
                                       minWidth: 100,
                                       on: {
                                           onItemClick: function () {
                                               fnLoadStatementOfAcc();
                                           }
                                       }
                                   },
                                   //{
                                   //    view: "checkbox",
                                   //    id: "ChkPDCSum",
                                   //    labelRight: "PDC Summary",
                                   //    labelWidth: 30,
                                   //    width: 173,
                                   //    on: {
                                   //        "onChange": function () {
                                   //        }
                                   //    }
                                   //},
                                   {
                                       view: "checkbox",
                                       id: "ChkMnthTot",
                                       labelRight: "Month Total",
                                       labelWidth: 1,
                                       maxWidth: 130,
                                       value: 1,
                                       on: {
                                           "onChange": function () {
                                           }
                                       }
                                   },
                                   {
                                       view: "checkbox",
                                       id: "ChkDRTrn",
                                       labelRight: "DR Trn",
                                       labelWidth: 1,
                                       maxWidth: 100,
                                       value: 1,
                                       on: {
                                           "onChange": function () {
                                           }
                                       }
                                   },
                                  {
                                      view: "checkbox",
                                      id: "ChkCRTrn",
                                      labelRight: "CR Trn",
                                      labelWidth: 1,
                                      maxWidth: 150,
                                      value: 1,
                                      on: {
                                          "onChange": function () {
                                          }
                                      }
                                  }
                               ]
                           },
                           {
                               paddingY: 3,
                               cols: [
                                   {
                                       view: "combo",
                                       id: "ddlPartyGrp",
                                       value: $("#hdnPartyDef").val(),
                                       label: "Group",
                                       labelAlign: "Left",
                                       labelWidth: 50,
                                       inputWidth: 280,
                                       maxWidth: 325,
                                       options: PartGrpData,
                                       on: {
                                           onChange: function (newval, oldval) {

                                           }
                                       },
                                   },
                                   {
                                         id: "ChkAllParty",
                                         view: "checkbox",
                                         label: "Party All",
                                         labelWidth: 60,
                                         maxWidth: 90,
                                         value: 1,
                                         on: {
                                             "onChange": function () {
                                                 if ($$("ChkAllParty").getValue() == "0") {
                                                     $$("txtParty").show();
                                                     $$("SrchParty").show();
                                                     $("#hdnPartyId").val("");
                                                     $$("txtParty").setValue("");
                                                 }
                                                 else {
                                                     $$("txtParty").hide();
                                                     $$("SrchParty").hide();
                                                     $("#hdnPartyId").val("");
                                                     $$("txtParty").setValue("");
                                                 }
                                             }
                                         }
                                     },
                                     {
                                         view: "text",
                                         //label: "Part",
                                         id: "txtParty",
                                         stringResult: true,
                                         labelWidth:50,
                                         inputWidth: 300,
                                         readonly: true,
                                         hidden:true,
                                         minwidth: 300,
                                         maxWidth: 300,
                                     },
                                     {
                                         view: "button",
                                         id: 'SrchParty',
                                         minWidth: 350,
                                         labelWidth: 0,
                                         maxWidth: 100,
                                         inputWidth: 30,
                                         height: 28,
                                         hidden: true,
                                         type: 'icon',
                                         icon: 'wxi-search',
                                         css: "Ar_search",
                                         on: {
                                             onItemClick: function () {
                                                 fnCallPartySearch();
                                             }
                                         }
                                     },
                                      
                               ]
                           },
                           {
                               cols: [
                               {
                                   view: "datatable",
                                   id: "grdSOABRpt",
                                   select: "row",
                                   data: [],
                                   minHeight: 500,
                                   //maxHeight: 700,
                                   editable: true,
                                   //header: false,
                                   spans: true,
                                   //scroll: "y",
                                   scheme: {
                                       $change: function (item) {
                                           if ($.trim(item.Key) == "BS") {
                                               item.$css = "Rowhighlight";
                                               $$("grdSOABRpt").addSpan(item.id, "Date", 3, 1, null, "GrpHeaderClr");

                                               $$("grdSOABRpt").addSpan(item.id, "DRAmt", 3, 1, null, "GrpHeaderClr");
                                           }
                                           else if ($.trim(item.Key) == "B") {
                                               item.$css = "Rowhighlight";
                                           }
                                       },
                                   },

                                   columns: [
                                           { header: "Bill Dt", id: "Date", width: 90, css: { 'text-align': 'center ! important' }, },
                                           { header: "RefNM", id: "RefTy", width: 100, css: { 'text-align': 'left ! important' }, },
                                           { header: "Vouch Dt", id: "VouchDt", width: 80, css: { 'text-align': 'center ! important' }, },
                                           { header: "Vouch#", id: "VouchNo", width: 70, css: { 'text-align': 'center ! important' }, },
                                           { header: "VType", id: "VType", width: 70, css: { 'text-align': 'Left ! important' }, },
                                           { header: "Details", id: "RefNm", width: 550, css: { 'text-align': 'left ! important' } },
                                            { header: "DebitAmt", id: "DRAmt", width: 100, css: { 'text-align': 'Right ! important' } },
                                           { header: "CreditAmt", id: "CRAmt", width: 100, css: { 'text-align': 'Right ! important' } },
                                           { header: "BalanceAmt", id: "BalAmt", width: 100, css: { 'text-align': 'Right ! important' } },                                          
                                           { header: "OpenAmt", id: "OpenAmt", width: 100, hidden: true },
                                           { header: "TrnId", id: "TrnId", width: 100, hidden: true },
                                           { header: "TrnSrNo", id: "TrnSrNo", width: 100, hidden: true },
                                            { header: "VouchCap", id: "VouchCap", width: 100, hidden: true },
                                           { header: "RefNo", id: "RefNo", width: 100, hidden: true },
                                           //  { header: "Ref Ty", id: "ClNo", width: 100, css: { 'text-align': 'center ! important' }, },
                                           //{ header: "Ref Name", id: "ChqNo", width: 100, css: { 'text-align': 'center ! important' }, },
                                           //{ header: "Due/Bill Dt", id: "ChqDt", width: 100, css: { 'text-align': 'center ! important' }, },
                                   ],

                                   on: {

                                   }
                               }
                               ]
                           }
                       ]
                   },

                ],
            }
        ]
    };

});


function fnPartGrpLoad() {

    var ChInd = "";

    if ($("#hdnChkAr").val() == "1" && $("#hdnChkAP").val() == "1")
        ChInd = "";
    else if ($("#hdnChkAr").val() == "1")
        ChInd = "R";
    else if ($("#hdnChkAP").val() == "1")
        ChInd = "P";

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PARTYGRPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTy"] = ChInd;
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
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (i == 0) {
                            $("#hdnPartyDef").val(rowData[i].id);
                            break;
                        }
                    }
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
        resizeColumn: true,
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
                    id: "grdParty",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                            { header: "AC_CD", id: "AC_CD", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 300, css: { 'text-align': 'left ! important' } },
                            { header: "Select", id: "chkSelect", template: "{common.checkbox()}", width: 59, css: { 'text-align': 'center ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            //var selectedRows = this.getSelectedItem(id.row);
                            //var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            //$("#hdnPartyId").val($.trim(selectedRows[0].AC_ID));
                            //$$("txtParty").setValue(AcNm);
                            //$$('PopupLoadParty').hide();
                            //fnLoadBillData();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 230,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupLoadParty').hide();
                                                     $("#hdnPartyId").val("");
                                                 }
                                             }
                                         },
                                         {
                                             width:10,
                                         },
                                         {
                                              view: 'button',
                                              label: 'Ok',
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      var PartId = ""; var PartNM = "";

                                                      var Cnt = 0;

                                                      var grdData = $$("grdParty").serialize();

                                                      for (i = 0; i < grdData.length; i++) {

                                                          if ($.trim(grdData[i].chkSelect) == "1") {

                                                              Cnt = parseInt(Cnt) + 1;

                                                              if ($.trim(PartId) == "") {
                                                                  PartId = $.trim(grdData[i]["AC_ID"]);

                                                                  PartNM = $.trim(grdData[i]["AC_ALT_NM"]);
                                                              }
                                                              else {
                                                                  PartId = PartId + "," + $.trim(grdData[i]["AC_ID"]);

                                                                  PartNM = PartNM + "," + $.trim(grdData[i]["AC_ALT_NM"]);
                                                              }
                                                          }
                                                      }

                                                      $("#hdnPartyCnt").val(Cnt);

                                                      $("#hdnPartyId").val(PartId);
                                                      $$("txtParty").setValue(PartNM);

                                                      $$('PopupLoadParty').hide();
                                                  }
                                              }
                                          }
                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

    

    var PartyGrp = $$("ddlPartyGrp").getValue();
    fnLoadParty(PartyGrp, "grdParty","2");
    $$("PopupLoadParty").show();
}

function fnPartyLoad()
{
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PARTYSEARCH";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PartyGrp"] = $$("ddlPartyGrp").getValue();
    dataparam["Option"] = "2";

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
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnLoadStatementOfAcc() {

    if ($.trim($$("txtParty").getValue) == "") {
        AlertMessage('Party Cannot be empty !');
        return false;;
    }
   
    var ChkInd = "";

    if ($("#hdnChkAr").val() == "1" && $("#hdnChkAP").val() == "1")
        ChkInd = "";
    else if ($("#hdnChkAr").val() == "1" && $("#hdnChkAP").val() == "0")
        ChkInd = "R";
    else if ($("#hdnChkAP").val() == "1" && $("#hdnChkAr").val() == "0")
        ChkInd = "P";

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_STATEMENTOFACC";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["ChkTyId"] = ChkInd;
    dataparam["PartyGrp"] = $$("ddlPartyGrp").getValue();
    dataparam["FromDt"] = $$("txtFrmDate").getValue();
    dataparam["EndDt"] = $$("txtToDate").getValue();

    if ($$("ChkAllParty").getValue() == "0") {
        dataparam["ChkPartyIds"] = $("#hdnPartyId").val();
    }
    else {
        var PartId = "";

        var Cnt = 0;

        var DataLoad = fnPartyLoad();

        for (i = 0; i < DataLoad.length; i++) {

            Cnt = parseInt(Cnt) + 1;

            if ($.trim(PartId) == "")
                PartId = $.trim(DataLoad[i]["AC_ID"]);
            else
                PartId = PartId + "," + $.trim(DataLoad[i]["AC_ID"]);
        }

        $("#hdnPartyId").val(PartId);

        $("#hdnPartyCnt").val(Cnt);

        dataparam["ChkPartyIds"] = $("#hdnPartyId").val();
    }
    
    dataparam["ChkPdcSum"] = "";//$$("ChkPDCSum").getValue();
    dataparam["ChkDrTrn"] = $$("ChkDRTrn").getValue();
    dataparam["ChkCrTrn"] = $$("ChkCRTrn").getValue();
    dataparam["ChkMnthTot"] = $$("ChkMnthTot").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/GLReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                var ColArry = "";

                if (rowData.length > 0)
                {
                    for (i = 0; i < rowData.length; i++) {
                        var ACId = $.trim(rowData[i].AcID);

                        if ($.trim(ACId) != "") {
                            if ($.trim(ColArry) == "")
                                ColArry = ACId;
                            else
                                ColArry = ColArry +','+ ACId;
                        }
                    }
                }

                $("#hdnPrintParty").val(ColArry);

                $$("grdSOABRpt").clearAll();
                $$("grdSOABRpt").parse(rowData);
                $$("grdSOABRpt").refresh();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {

    debugger;
    var vWidth = $("#divform").width();
    $$("frmGlRptStateOfAcc").define("width", vWidth);
    $$("frmGlRptStateOfAcc").resize();

    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    $$("frmGlRptStateOfAcc").define("height", vheight - 100);
    $$("frmGlRptStateOfAcc").resize();
    
    if (choice == "1") {
        var offsetTop = $$("grdSOABRpt").getNode().offsetTop;
        $$("grdSOABRpt").define("height", ((vheight - offsetTop - 160)));
        $$("grdSOABRpt").adjust();
    }





}
