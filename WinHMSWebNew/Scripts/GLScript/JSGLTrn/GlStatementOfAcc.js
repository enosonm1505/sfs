
var app = angular.module('GLRApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    //debugger;

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
            debugger;
          
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
    
    $scope.frmGlRptStateOfAcc = {

        id: "frmGlRptStateOfAcc",
        view: 'form',
        minWidth: "auto",
        maxWidth: "auto",
        paddingX: 50,
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
                                       width: 75,
                                       value: 1,
                                       on: {
                                           "onChange": function () {
                                               $("#hdnChkAr").val($$("ChkAr").getValue());

                                               debugger;
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
                                       width: 250,
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
                                       width: 240,
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
                                       width: 170,
                                   },
                                   {
                                       id: "btnDisplay",
                                       view: 'button',
                                       label: 'Display',
                                       inputWidth: 100,
                                       labelWidth: 30,
                                       width: 130,
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
                                       width: 130,
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
                                       width: 100,
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
                                      width: 150,
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
                                       width: 325,
                                       options: PartGrpData,
                                       on: {
                                           onChange: function (newval, oldval) {

                                           }
                                       },
                                   },
                                   {
                                         id: "ChkAllParty",
                                         view: "checkbox",
                                         label: "All Party",
                                         labelWidth: 60,
                                         width: 90,
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
                                         id: "txtParty",
                                         stringResult: true,
                                         hidden: true,
                                         labelWidth: 0,
                                         inputWidth: 280,
                                         readonly: true,
                                         minwidth: 280,
                                         width: 280,
                                     },
                                     {
                                         view: "button",
                                         id: 'SrchParty',
                                         hidden: true,
                                         minWidth: 350,
                                         labelWidth: 0,
                                         width: 100,
                                         inputWidth: 30,
                                         height: 28,
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
                               paddingY: 10,
                               cols: [
                               {
                                   view: "datatable",
                                   id: "grdSOABRpt",
                                   //select: "row",
                                   data: [],
                                   width: 1200,
                                   height: 450,
                                   //header: false,
                                   spans: true,
                                   scroll: "y",
                                   scheme: {
                                       $change: function (item) {
                                           debugger;
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
                                           { header: "Bill Dt", id: "Date", width: 100, css: { 'text-align': 'center ! important' }, },
                                           { header: "RefNM", id: "RefTy", width: 100, css: { 'text-align': 'left ! important' }, },
                                           { header: "Vouch Dt", id: "VouchDt", width: 100, css: { 'text-align': 'center ! important' }, },
                                           { header: "Vouch#", id: "VouchNo", width: 100, css: { 'text-align': 'center ! important' }, },
                                           { header: "VType", id: "VType", width: 100, css: { 'text-align': 'Left ! important' }, },
                                           { header: "Details", id: "RefNm", width: 350, css: { 'text-align': 'left ! important' } },
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

function fnLoadProperty() {
    debugger;
    var dataProp = fnPropertyLoad('2');

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnPartGrpLoad() {
    debugger;

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
            //debugger;
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
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            //debugger;
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            $("#hdnPartyId").val($.trim(selectedRows[0].AC_ID));
                            $$("txtParty").setValue(AcNm);
                            $$('PopupLoadParty').hide();
                            fnLoadBillData();
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
                                                     $$('PopupLoadParty').hide();
                                                     $("#hdnPartyId").val("");
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

    debugger;
    var PartyGrp = $$("ddlPartyGrp").getValue();
    fnLoadParty(PartyGrp, "grdParty","2");
    $$("PopupLoadParty").show();
}

function fnLoadStatementOfAcc() {

    debugger;

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

    dataparam["ChkAllParty"] = $$("ChkAllParty").getValue();

    if ($$("ChkAllParty").getValue() == "0")
        dataparam["ChkPartyIds"] = $("#hdnPartyId").val();
    else
        dataparam["ChkPartyIds"] = "";

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
            //debugger;
            if (d != "") {
                var rowData = JSON.parse(d);
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