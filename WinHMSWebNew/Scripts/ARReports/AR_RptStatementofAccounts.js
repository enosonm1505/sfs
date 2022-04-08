var app = angular.module('ARTApp', ['webix']);

app.controller("ARReportController", function ($scope) {
    $("#pageload").hide();//S.VijayaLakshmi''4/3/20

    var dataProp = fnPropertyLoad();
    fnPageLoad();

    var ARCont = fnMstARControl();
    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    }

    $scope.divExcel = {
        view: "button",
        id: "divExcel",
        //container: "divExcel",
        //type: "icon",
        label: "Excel",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Excel",
        click: function () {

            //var FullData = $$("PartyBillRpt").serialize();
            //var len = FullData.length;
            //if (len > 0) {
            //    $("#LoadDIv").show();
            //    webix.toExcel($$("PartyBillRpt"), {
            //        filename: "SOA",
            //        styles: true,
            //        spans: true,
            //        header: true,
            //        name: "Statement Of Accounts",
            //        docHeader: "Statement Of Accounts",
            //    });
            //    $("#LoadDIv").hide();
            //}
            //else {
            //    AlertMessage('Records not present in Report');
            //    return false;;
            //}

            var vHeader = "Statement Of Accounts";
            var FullData = "";
            FullData = $$("PartyBillRpt").serialize();
            var len = FullData.length;
            var CompNm = $$("ddlProperty").getText();
            var AsOn = $("#hdnCurDt").val();
            var values = "";// fnCurrDtTime();
            var vDate = "";// values[0];
            var vTm = "";//values[1];
            if (len > 0) {
                debugger;

                var vExpoartGrid = webix.copy($$("PartyBillRpt"), -1);
                fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, "", "", AsOn);

            }
            else {
                alert("Records not present in Report");
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
            debugger;

            var FullData = $$("PartyBillRpt").serialize();
            var len = FullData.length;
            if (len > 0) {

                if (parseInt($("#hdnPartyCnt").val()) <= 10) {

                    var PartyArr = $("#hdnPrintParty").val().split(',');

                    if (PartyArr.length > 0) {
                        for (i = 0; i < PartyArr.length; i++) {

                            if ($.trim(PartyArr[i]) != "") {

                                //var MtInd = "false"; var SummInd = "true";
                                //var SumTotal = "S";

                                var Host = window.location.host;
                                var PageUrl = "http://" + Host.toString().trim() + "/GL/RptPdfOpen.aspx";
                                var Mleft = (screen.width / 2) - (840 / 2);
                                var Mtop = (screen.height / 2) - (550 / 2);
                                window.open("/GL/RptPdfOpen.aspx?FISCALYR=" + $("#hdnFiscalYr").val() + "&COMPID=WS" + "&Sdt=" + $$("dateFrom").getValue() + "&EDt=" + $$("dateTo").getValue()
                                        + "&ChkParty=" + ($$("ChkAllParty").getValue()) + "&Acids=" + PartyArr[i] + "&ChkPending=" + $$("chkpendBills").getValue()
                                        + "&RPT=ARSOA" + " ", '_blank', "width=840px,height=550,scrollbars=yes,top=\'+Mtop+\',left=\'+Mleft+\'", 0)

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

    //Update Popup Search
    $scope.UpdatePopupSearch = {
        view: "window",
        close: true,
        modal: true,
        id: "UpdatePopupSearch",
        head: "Updation of Bills",
        position: "center",
        width: 400,
        height: 200,
        body: {
            view: "form",
            elements: [{
                rows: [{
                    view: "text", id: "txtUpDate",
                    label: "Date",
                    value: ARCont[0].BILL_LAST_UPDATE_DT1,
                    inputWidth: 300,
                },
                {
                    view: "text", id: "txtUpTm",
                    label: "Time",
                    inputWidth: 300,
                    value: ARCont[0].BILL_LAST_UPDATE_TM,
                },
                {
                    cols: [{

                    },
                {
                    cols: [
                        {
                            view: "button",
                            id: "OkUpdt",
                            value: "Ok",
                            align: "right",
                            inputWidth: 70,
                            on:
                                {
                                    'onItemClick': function () {
                                        debugger;
                                        FnLoadSOADisplay("Ok");
                                        $$("UpdatePopupSearch").hide();
                                    }
                                }
                        },
                        {
                            view: "button",
                            id: "CancelUpdt",
                            value: "Cancel",
                            align: "right",
                            inputWidth: 70,
                            on: {
                                'onItemClick': function () {                                 
                                    FnLoadSOADisplay("Cancel");
                                    $$("UpdatePopupSearch").hide();
                                }
                            },
                        }],
                }],
                }],
            }]
        }
    };


    function fnMstARControl() {

        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_MSTARCONTROL";
        dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                //debugger;
                if (d != "") {
                    rowData = JSON.parse(d);
                }
            },
        });

        return rowData;
    }

    function fnPageLoad() {
        debugger;
        var dataparam = {};
        var rowData = "";
        var PostDt = "";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["REQTYPE"] = "GET_DEFAULTDT";
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                debugger;
                if (d != "") {
                    rowData = JSON.parse(d);
                  //  $("#hdnCurDt1").val(rowData[0].CURRDT);
                    $("#hdnCurDt1").val(rowData[0].CURRDT1);
                    $("#hdnCurDt").val(rowData[0].CURRDT);
                    $("#hdnCurTm").val(rowData[0].CURRTM);
                }
            },
        });
        return rowData;
    }

    $scope.divRptform = {
        view: 'form',
        minWidth: 900,
        MinHeight: 550,
        id: 'divRptform',
        elements: [
            {
                rows: [
                    {
                        cols: [
                            {
                                id: "ChkAllParty",
                                view: "checkbox",
                                label: "Party All",
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
                                //label: "Part",
                                id: "txtParty",
                                stringResult: true,
                                labelWidth: 50,
                                inputWidth: 300,
                                readonly: true,
                                hidden: true,
                                minwidth: 300,
                                width: 300,
                            },
                            {
                                view: "button",
                                id: 'SrchParty',
                                minWidth: 100,
                                labelWidth: 0,
                                width: 100,
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
                            {
                                view: "datepicker",
                                id: "dateFrom",
                                stringResult: true,
                                label: "From",
                                labelAlign: "right",
                                css: "ason_lbl",
                                format: "%d/%m/%Y",
                                align: "Left",
                                width: 200,
                                value: $("#hdnCurDt").val(),//hdnCurDt1
                                on: {
                                    onChange: function () {
                                        $$("PartyBillRpt").clearAll();
                                        $$("PartyBillRpt").refresh();
                                       
                                    }
                                }
                            },
                            {
                                 view: "datepicker",
                                 id: "dateTo",
                                 stringResult: true,
                                 label: "To",
                                 labelAlign: "right",
                                 css: "ason_lbl",
                                 format: "%d/%m/%Y",
                                 align: "Right",
                                 width: 160,
                                 labelWidth: 40,
                                 value: $("#hdnCurDt").val(),////hdnCurDt1
                                 on: {
                                     onChange: function () {
                                         $$("PartyBillRpt").clearAll();
                                         $$("PartyBillRpt").refresh();
                                       
                                     }
                                 }
                             },
                             {
                                 view: "button",
                                 id: "btnDisplay",
                                 value: "Display",
                                 width: 70,
                                 on: {
                                     onItemClick: function () {
                                         $$("UpdatePopupSearch").show();
                                     }
                                 }
                             },
                             {
                                 view: "checkbox",
                                 id: "chkpendBills",
                                 value: 0 ,//1,
                                 label: "Pending Bills",
                                 labelWidth: 100,
                                 labelAlign: "Right",
                                 minWidth: 200,
                                 on: {
                                     onChange: function (newval, oldval)
                                     {
                                         $$("PartyBillRpt").clearAll();
                                         $$("PartyBillRpt").refresh();
                                     }
                                 }
                             }
                        ]
                    },
                    {
                        view: "treetable",
                        id: "PartyBillRpt",
                        spans: true,
                        select: "row",
                        data: [],
                        height: 440,
                       css:"mt-2",
                        scheme: {
                            $change: function (item) {
                                debugger;
                                if ($.trim(item.DETAIL) == "Total" || item.DETAIL == "Grand Total") {
                                    item.$css = "Rowhighlight";
                                }
                                if ($.trim(item.GRPHEAD) == "1") {
                                    $$("PartyBillRpt").addSpan(item.id, "TRNTYPE", 2, 1, null, "Rowhighlight");
                                   // item.$css = "GrpHeaderClr"
                                }
                                if ($.trim(item.GRPHEAD) == "H") {
                                    $$("PartyBillRpt").addSpan(item.id, "TRNTYPE", 2, 1, null, null);
                                    $$("PartyBillRpt").addSpan(item.id, "DRAMT", 3, 1, null, null);
                                    $$("PartyBillRpt").addSpan(item.id, "REFTYNM", 3, 1, null, "GrpHeaderClr");
                                    // item.$css = "GrpHeaderClr"
                                }
                            },
                        },
                        columns: [
                          { header: "Trn ID", id: "TRNID", width: 60, css: { 'text-align': 'Center ! important' } },
                          { header: "Ac id", id: "ACID", width: 100,hidden: true, css: { 'text-align': 'left ! important' } },
                          {
                              header: "Ac Nm", id: "ACNM", width: 300, hidden: true ,css: { 'text-align': 'left ! important' },
                          },

                          { header: "Trn Type", id: "TRNTYPE", width: 160, css: { 'text-align': 'left ! important' } },
                          { header: "Trn No", id: "VOUCHNO", width: 100,  hidden: true,css: { 'text-align': 'left ! important' } },
                          { header: "Trn Dt", id: "VOUCHDT", width: 100, css: { 'text-align': 'left ! important' } },
                          { header: "Ref Type", id: "REFTYNM", width: 100, css: { 'text-align': 'left ! important' } },
                          { header: "Ref Name", id: "REFNM", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: "Detail", id: "DETAIL", width: 100, css: { 'text-align': 'Center ! important' } },
                           { header: "Due Date", id: "DUEDT", width: 100,hidden:true, css: { 'text-align': 'Center ! important' } },
                          { header: "Dr Amt", id: "DRAMT", width: 100, css: { 'text-align': 'Right ! important' } },
                           { header: "Cr Amt", id: "CRAMT", width: 100, css: { 'text-align': 'Right ! important' } },
                         { header: "Balance Amt", id: "OUTST", width: 100, css: { 'text-align': 'Right ! important' } },
                           { header: "GRPHEAD", id: "GRPHEAD", width: 100, hidden: true, css: { 'text-align': 'left ! important' } },
                        ],
                    },
                ]
            }
        ]
    }
});

function fnPropertyLoad() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCompId").val("WS");
            }
        },
    });
    return rowData;
}

function fnCallPartySearch() {
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Party Search",
        id: 'Partypopup',
        modal: true,
        width: 500,
        height: 500,
        close: true,
        body: {
            view: "form",
            elements: [
           {
            rows: [
               {
                   id: "PartyGrid",
                   select: 'row',
                   view: "datatable",
                   adjustRowHeight: true,
                   fixedRowHeight: false,
                   columns: [
                            { header: ["Type", { content: "textFilter" }], id: "PARTY_TY_NM", width: 100, css: { 'text-align': 'left ! important' } },
                           { header: ["Name", { content: "textFilter" }], id: "PARTY_NM", width: 300, css: { 'text-align': 'left ! important' } },
                           { header: "Select", id: "ChkGrdAllParty", template: "{common.checkbox()}", width: 59, css: { 'text-align': 'center ! important' } },
                           { header: "", id: "PARTY_ID", hidden: true },
                   ],
                   scroll: "y",
                   data: [],

               },
               {
                   cols: [
                       {
                           view: 'label',
                           label: ' ',
                           name: 'label1',
                           id: 'label1',
                           labelWidth: 100,
                       },
                       {
                           cols: [
                               {
                                   view: 'button',
                                   type: "icon",
                                   icon: "wxi-file",
                                   label: 'Ok',
                                   minWidth: 100,
                                   align: "right",
                                   on: {
                                       onItemClick: function () {
                                           debugger;
                                           var itemval = $$("PartyGrid").getSelectedItem();
                                           $$("Partypopup").hide();

                                           var PartId = ""; var PartNM = "";

                                           var Cnt = 0;

                                           var grdData = $$("PartyGrid").serialize();

                                           for (i = 0; i < grdData.length; i++) {

                                               if ($.trim(grdData[i].ChkGrdAllParty) == "1") {

                                                   Cnt = parseInt(Cnt) + 1;

                                                   if ($.trim(PartId) == "") {
                                                       PartId = $.trim(grdData[i]["PARTY_ID"]);

                                                       PartNM = $.trim(grdData[i]["PARTY_NM"]);
                                                   }
                                                   else {
                                                       PartId = PartId + "," + $.trim(grdData[i]["PARTY_ID"]);

                                                       PartNM = PartNM + "," + $.trim(grdData[i]["PARTY_NM"]);
                                                   }
                                               }
                                           }

                                           $("#hdnPartyCnt").val(Cnt);

                                           $("#hdnPartyId").val(PartId);
                                           $$("txtParty").setValue(PartNM);
                                       }
                                   }
                               },
                               {
                                   view: 'button',
                                   type: "icon",
                                   icon: "wxi-close",
                                   label: 'Cancel',
                                   minWidth: 100,

                                   align: "right",
                                   on: {
                                       onItemClick: function () {
                                           $$("Partypopup").hide();
                                       }
                                   }
                               }
                           ]
                       }
                   ]
               }
            ]
           }]
        }
    }).show();
    LoadPartyData();
  
}

function LoadPartyData() {
    var dataparam = {};

    dataparam["REQTYPE"] = "GETALLPARTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["IdsAllParty"] = "";
    dataparam["IdsPartySub"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            rowData = JSON.parse(d);
            $$("PartyGrid").clearAll();
            $$("PartyGrid").parse(rowData);
            $$("PartyGrid").refresh();
        },
    });

}

function Fontstyle(value, config) {
    // debugger;
    if ($.trim(config.GRPHEAD) == "1") {
        return { "color": "Black", "font-weight": "Bold" };
    }
};

function FnLoadSOADisplay(Update) {
    $("#pageload").show();//S.VijayaLakshmi''4/3/20
    $$("PartyBillRpt").clearAll();
    $$("PartyBillRpt").refresh();
 
    var dataparam = {};
    debugger;
    dataparam["REQTYPE"] = "GETSTATEMENTOFACCOUNTS";
    dataparam["COMPID"] = $("#hdnCompId").val();

    var hdnAllParty = "";
    if ($$("ChkAllParty").getValue() == 0) hdnAllParty = $("#hdnPartyId").val();
    
    dataparam["PartySrch"] = hdnAllParty
    dataparam["IdsAllParty"] = hdnAllParty;
    dataparam["PendingBills"] = $$("chkpendBills").getValue();
    dataparam["FromDt"] = $$("dateFrom").getValue();
    dataparam["ToDt"] = $$("dateTo").getValue();
    dataparam["Update"] = Update;
    dataparam["txtUpDate"] = $$("txtUpDate").getValue();
    dataparam["txtUpTm"] = $$("txtUpTm").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                var ColArry = ""; var PCurId = ""; var Cnt = 0;

                if (rowData.length > 0) {
                    for (i = 0; i < rowData.length; i++) {

                        var ACId = $.trim(rowData[i].ACID);

                        if ($.trim(ACId) != $.trim(PCurId)) {

                            Cnt = parseInt(Cnt) + 1;

                            if ($.trim(ACId) != "") {
                                if ($.trim(ColArry) == "")
                                    ColArry = ACId;
                                else
                                    ColArry = ColArry + ',' + ACId;
                            }
                        }

                        PCurId = ACId;
                    }
                }

                $("#hdnPartyCnt").val(Cnt);

                $("#hdnPrintParty").val(ColArry);


                $$("PartyBillRpt").clearAll();
                $$("PartyBillRpt").parse(rowData);
                $$("PartyBillRpt").openAll();
                $$("PartyBillRpt").refresh();
            }
        },
    });
    $("#pageload").hide();//S.VijayaLakshmi''4/3/20
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

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}