var app = angular.module('ARTApp', ['webix']);

app.controller("ARReportController", function ($scope) {

    var dataProp = fnPropertyLoad();

    var VPostDt = fnPageLoad();

    $("#LoadDIv").hide();

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
            debugger;

            //var FullData = $$("PartyBillRpt").serialize();
            //var len = FullData.length;
            //if (len > 0) {
            //    $("#LoadDIv").show();
            //    webix.toExcel($$("PartyBillRpt"), {
            //        filename: "PartySettlement",
            //        styles: true,
            //        spans: true,
            //        header: true,
            //        name: "Party Bill And Settlement",
            //        docHeader: "Party Bill And Settlement",
            //    });
            //    $("#LoadDIv").hide();
            //}
            //else {
            //    AlertMessage('Records not present in Report');
            //    return false;;
            //}

            $("#LoadDIv").show();
            debugger;
            var vHeader = "Party Bill And Settlement";
            var FullData = "";
            FullData = $$("PartyBillRpt").serialize();
            var len = FullData.length;
            var CompNm = $$("ddlProperty").getText();
            var AsOn = $$("dateAsOn").getValue();
            var values = "";// fnCurrDtTime();
            var vDate = "";// values[0];
            var vTm = "";//values[1];
            if (len > 0) {

                debugger;
                var vExpoartGrid = webix.copy($$("PartyBillRpt"), -1);
                fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, "", "", AsOn);
                $("#LoadDIv").hide();
            }
            else {
                $("#LoadDIv").hide();
                alert("Records not present in Report");
            }
        }
    }

    $scope.divPdf = {
        view: "button",
        id: "divPdf",
        //container: "divExcel",
        //type: "icon",
        label: "Print",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Print",
        click: function () {

            var FullData = $$("PartyBillRpt").serialize();
            var len = FullData.length;
            if (len > 0) {
                $("#LoadDIv").show();
                webix.print($$("PartyBillRpt"), {
                    filename: "OutstandingBills",
                    spans: false,
                    header: true,
                    name: "Party Bill And Settlement",
                    docHeader: "Party Bill And Settlement",
                    orientation: "landscape",
                    height: 1350,
                });
                $("#LoadDIv").hide();
            }
            else {
                AlertMessage('Records not present in Report');
                return false;;
            }
        }
    }

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

                $$("dateAsOn").setValue(VPostDt);
            }
        }
    }

    webix.ui({
        view: 'form',
        id: "divRptform",
        container: "divRptform",
        minWidth: 1000,
        maxWidth: 1200,
        height: 480,
        elements: [
            {
                paddingX: 0,

                rows: [
                     {
                         paddingX: 10,
                         cols: [
                             {
                                 view: "checkbox",
                                 id: "ChkAllParty",
                                 label: "All Parties",
                                 value: "1",
                                 labelWidth: 70,
                                 width: 120,
                                 on: {
                                     "onChange": function () {
                                         if ($$("ChkAllParty").getValue() == "0")
                                             $$("IbtnPSrch").show();
                                         else
                                             $$("IbtnPSrch").hide();

                                         $("#hdnAllParty").val("");
                                     }
                                 }
                             },
                             {
                                 view: "button",
                                 id: "IbtnPSrch",
                                 label: "",
                                 type: 'icon',
                                 icon: 'wxi-search',
                                 css: "Ar_search",
                                 inputWidth: 30,
                                 width: 50,
                                 height: 20,
                                 hidden: true,
                                 on: {

                                     onItemClick: function () {
                                         fnCallPopPartySrch();
                                     }
                                 }
                             },
                             {
                                 view: "checkbox",
                                 id: "ChkPartySubTy",
                                 label: "Party Sub Type",
                                 labelWidth: 110,
                                 width: 150,
                                 value: "1",
                                 on: {
                                     "onChange": function () {
                                         if ($$("ChkPartySubTy").getValue() == "0")
                                             $$("IbtnPSSrch").show();
                                         else
                                             $$("IbtnPSSrch").hide();

                                         $("#hdnPartySub").val("");
                                     }
                                 }
                             },
                             {
                                 view: "button",
                                 id: "IbtnPSSrch",
                                 label: "",
                                 inputWidth: 30,
                                 width: 50,
                                 height: 20,
                                 type: 'icon',
                                 icon: 'wxi-search',
                                 css: "Ar_search",
                                 hidden: true,
                                 on: {

                                     onItemClick: function () {
                                         fnCallPopPartySubSrch();
                                     }
                                 }
                             },
                             {
                                 view: "datepicker",
                                 id: "dateAsOn",
                                 disable: true,
                                 stringResult: true,
                                 label: "Ason Date",
                                 format: "%d/%m/%Y",
                                 value: $("#hdnCurDt").val(),
                                 labelAlign: "Right",
                                 labelWidth: 80,
                                 inputWidth: 200,
                                 width: 230,
                             },
                             {
                                 view: "button",
                                 id: "DisplatBtn",
                                 value: "Display",
                                 width: 70,
                                 on: {
                                     onItemClick: function () {
                                         fnPartBillsSettleDisp();
                                     }
                                 }
                             },
                             {
                                 view: "checkbox",
                                 id: "chkpendBills",
                                 value: 1,
                                 label: "Pending Bills",
                                 labelWidth: 100,
                                 labelAlign: "Right",
                                 minWidth: 200,
                                 on: {
                                     onChange: function (newval, oldval) {
                                         $$("PartyBillRpt").clearAll();
                                         $$("PartyBillRpt").refresh();

                                     }
                                 }
                             },
                             {
                                   view: "checkbox",
                                   id: "chkShwCC",
                                   label: "Show Credit Card No",
                                   labelWidth: 150,
                                   labelAlign: "Right",
                                   minWidth: 200,
                                   on: {
                                       onChange: function (newval, oldval) {
                                           debugger;
                                           $("#hdnCCInd").val(newval);

                                           if ($("#hdnCCInd").val() == "1") {
                                               $$("PartyBillRpt").showColumn("CCNo");
                                               $$("PartyBillRpt").showColumn("EXPDT");
                                           }
                                           else {
                                               $$("PartyBillRpt").hideColumn("CCNo");
                                               $$("PartyBillRpt").hideColumn("EXPDT");
                                           }
                                       }
                                   }
                               }
                         ]
                     },
                     {
                         paddingY: 20,
                         cols: [
                             {
                                 view: "treetable",
                                 id: "PartyBillRpt",
                                 select: "row",
                                 data: [],
                                 height: 400,
                                 scroll: true,
                                 spans: true,
                                 scheme: {
                                     $change: function (item) {
                                         //debugger;
                                         if ($.trim(item.RGrpInd) == "1" ) {
                                             item.$css = "Rowhighlight";
                                         }
                                         if ($.trim(item.RGrpInd) == "2") {
                                             item.$css = "GrpHeaderClr"
                                             $$("PartyBillRpt").addSpan(item.id, "TrnTy", 7, 1, null, "GrpHeaderClr");
                                         }
                                     },
                                 },
                                 columns: [
                                   { header: "Ac id", id: "AcId", width: 100, hidden: true, css: { 'text-align': 'left ! important' } },
                                   {
                                       header: "Ac Nm", id: "ACNm", width: 300, hidden: true, css: { 'text-align': 'left ! important' },
                                   },
                                   { header: "Trn Type", id: "TrnTy", width: 160, css: { 'text-align': 'left ! important' } },
                                   { header: "Trn No", id: "VouchNo", width: 100, css: { 'text-align': 'center ! important' } },
                                   { header: "Trn Dt", id: "VouchDt", width: 100, css: { 'text-align': 'center ! important' } },
                                   { header: "Ref Type", id: "RefTyNm", width: 100, css: { 'text-align': 'left ! important' } },
                                   { header: "Ref Name", id: "RefNm", width: 100, css: { 'text-align': 'left ! important' } },
                                   { header: "Due Date", id: "Duedt", width: 100, css: { 'text-align': 'Center ! important' } },//iif(obj.value >= 0 ? obj.value.toFixed(2) + "DR" : (-1 * obj.value).toFixed(2) + "CR");
                                   { header: "Dr Amt", id: "DrAmt", width: 100, css: { 'text-align': 'Right ! important' } },
                                   { header: "Cr Amt", id: "CrAmt", width: 100, css: { 'text-align': 'Right ! important' } },
                                   { header: "Outstanding", id: "OutStand", width: 100, css: { 'text-align': 'Right ! important' } },
                                   { header: "Credit Card No", id: "CCNo", width: 150, hidden: true, css: { 'text-align': 'left ! important' } },
                                   { header: "Expiry DT", id: "EXPDT", width: 100, hidden: true, css: { 'text-align': 'left ! important' } },
                                   { header: "GRPHEAD", id: "RGrpInd",hidden: true, css: { 'text-align': 'left ! important' } },
                                 ],
                             }
                         ]
                     }
                ]
            }
        ],
    });

});

function fnPartBillsSettleDisp() {
    $("#LoadDIv").show();
    $$("PartyBillRpt").clearAll();
    $$("PartyBillRpt").refresh();
 
    var dataparam = {};

    var IdsAllParty = $("#hdnAllParty").val();
    var IdsPartySub = $("#hdnPartySub").val();

    dataparam["REQTYPE"] = "GET_PARTYBILLANDSETTLE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["VouchDt"] = $$("dateAsOn").getValue();

    dataparam["PartyId"] = (IdsAllParty == undefined ? "" : IdsAllParty);
    dataparam["PartySTy"] = (IdsPartySub == undefined ? "" : IdsPartySub);
    dataparam["ChkPending"] = $$("chkpendBills").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                var rowData = JSON.parse(objRes);

                $$("PartyBillRpt").clearAll();
                $$("PartyBillRpt").parse(rowData);
                $$("PartyBillRpt").refresh();
                
            }
        },
    });
    $("#LoadDIv").hide();//S.VijayaLakshmi''4/3/20
}








