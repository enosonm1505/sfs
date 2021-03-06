var app = angular.module('ARRApp', ['webix']);

app.controller("ARReportController", function ($scope) {

    var dataProp = fnPropertyLoad();
    
    var VPostDt = fnPageLoad();

    $("#LoadDIv").hide();

    $scope.divExcel = {
        view: "button",
        id: "divExcel",
        label: "Excel",
        width: 80,
        tooltip: true, value: "Excel",
        click: function () {
            var vHeader = "Outstanding Bills Aging";
            var FullData = "";
            FullData = $$("grdOutStandAge").serialize();
            var len = FullData.length;
            var CompNm = $$("ddlProperty").getText();
            var AsOn = $$("dateAsOn").getValue();
            var values = "";// fnCurrDtTime();
            var vDate = "";// values[0];
            var vTm = "";//values[1];
            if (len > 0) {            
                debugger;
               
                var vExpoartGrid = webix.copy($$("grdOutStandAge"), -1);
                fnComExcelExport(vExpoartGrid, vHeader, vHeader, true, CompNm, vDate, vTm, "", "", AsOn);
             
            }
            else {
                alert("Records not present in Report");
            }
           
        }
    }


    $scope.divPdf = {
        view: "button",
        id: "divPdf",
        label: "Print",
        //icon: 'fa fa-file-excel-o',
        width: 80,
        tooltip: true, value: "Print",
        click: function () {
            var FullData = $$("grdOutStandAge").serialize();
            var len = FullData.length;
            if (len > 0) {
                $("#LoadDIv").show();
                webix.print($$("grdOutStandAge"), {
                    filename: "OutstandingBills",
                   
                    spans: false,
                    header: true,
                  
                    name: "Outstanding Bills Aging",
                    docHeader: "Outstanding Bills Aging",
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
        value: $.trim($("#hdnCompId").val()),
        label: "Property",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                VPostDt=  fnPageLoad();
                $$("dateAsOn").setValue(VPostDt);
            }
        }
    }

    webix.ui({
        view: 'form',
        id: "PartyOutStanding",
        container: "PartyOutStanding",
        minWidth: 1200,
        maxWidth: 1200,
        height: 520,
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
                                         fnCallUpdatePopup();
                                     }
                                 }
                             },
                             {
                                 view: "button",
                                 id: "btnfilter",
                                 label: "",
                                 width: 28,
                                 height: 30,
                                 css: "Ar_filter",
                                 type: 'icon',
                                 icon: 'fas fa-filter',
                                 disabled: false,
                                 on: {
                                     onItemClick: function () {
                                         $$("PopUpbtnfilter").show();
                                     }
                                 }
                             }
                         ]
                     },
                     {
                         paddingX: 10,
                         paddingY: 20,
                         cols: [
                             {
                                 view: "treetable",
                                 id: "grdOutStandAge",
                                 select: "row",
                                 height: 430,
                                 width:1100,
                                 css: "outstd_grd main_wxgrid",
                                 scroll: true, spans: true,
                                 scheme: {
                                     $change: function (item) {

                                         if ($.trim(item.RGrpInd) == "1") {
                                             item.$css = "GrpHeaderClr";
                                             $$("grdOutStandAge").addSpan(item.id, "VouchNo", 7, 1, null, "GrpHeaderClr");
                                         }
                                         if ($.trim(item.RGrpInd) == "2" || $.trim(item.RGrpInd) == "3") {
                                             item.$css = "Rowhighlight"
                                         }
                                     },
                                 },
                                 columns: [
                                        {
                                            header: "Party Sub Type", id: "PartyNm", sort: "string", width: 300, css: { 'text-align': 'left ! important' }, hidden: true,
                                        },
                                        {
                                            header: "Bill No", id: "VouchNo", sort: "int", width: 100, css: { 'text-align': 'center ! important' },

                                        },
                                        { header: "Bill Date", id: "VouchDt", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: "Narration", id: "NAR", width: 150, css: { 'text-align': 'left ! important' } },
                                        { header: "Ref Type", id: "RefTyNm", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: "Ref Name", id: "RefNm", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: "Due Date", id: "Duedt", width: 100, css: { 'text-align': 'Center ! important' } },//iif(obj.value >= 0 ? obj.value.toFixed(2) + "DR" : (-1 * obj.value).toFixed(2) + "CR");
                                        { header: "Balance Amt", id: "Amount", width: 100, css: { 'text-align': 'right ! important', collection: function (id) { return callFormat(); } }, },
                                        {
                                            header: "0 - 30", id: "30", width: 100, css: { 'text-align': 'right ! important' },
                                        },
                                        {
                                            header: "31 - 60", id: "60", width: 100, css: { 'text-align': 'right ! important' },
                                        },
                                        { header: "61 - 90", id: "90", width: 100, css: { 'text-align': 'right ! important' }, },
                                        { header: "91 - 180", id: "180", width: 100, css: { 'text-align': 'right ! important' }, },
                                        { header: "> 180", id: "181", width: 100, css: { 'text-align': 'right ! important' }, },
                                        { header: "AcCd", id: "AcCd", hidden: true },
                                 ],
                                 on: {
                                     onBeforeClose: function () {
                                         return false;
                                     },
                                 },
                             }
                         ]
                     }
                ]
            }
        ],
    });

    $scope.PopUpbtnfilter = {
        view: "window",
        close: true,
        modal: true,
        id: "PopUpbtnfilter",
        head: "FILTER",
        css: "classPop",
        body: {
            view: "form",
            elements: [{
                rows: [{
                    id: "ddlSortOn",
                    view: "combo",
                    value: 2, 
                    label: "Sort On", labelPosition: "top",
                    options: [
                        { "id": 1, "value": "Party Name" },
                        { "id": 2, "value": "Party Id" }
                    ]
                },
                    {
                        id: "ddlStatus",
                        view: "combo",
                        value: 2, 
                        label: "Status", labelPosition: "top",
                        options: [
                            { "id": 1, "value": "All Bill" },
                            { "id": 2, "value": "Due Bill" }
                        ]
                    },
                    {
                        id: "ddlAccordingTo",
                        view: "combo",
                        value: 2, 
                        label: "According To", labelPosition: "top",
                        options: [
                            { "id": 1, "value": "Due Date" },
                            { "id": 2, "value": "Voucher Date" }
                        ]
                    },
                    {
                        view: "button",
                        id: "filterok",
                        value: "OK",
                        css: "okbtn",
                        inputWidth: 50,
                        align: 'right',
                        on: {
                            onItemClick: function () {
                                $$("PopUpbtnfilter").hide();
                                prcfnLoadPartyOut("");
                            }
                        }
                    }]
            }]
        }
    };
});

function prcfnLoadPartyOut(Option) {

    debugger;

    var dataparam = {};
    var rowData = [];

    var IdsAllParty = $("#hdnAllParty").val();
    var IdsPartySub = $("#hdnPartySub").val();
   
    dataparam["REQTYPE"] = "GET_OUTSTANDINGBILLS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["VouchDt"] = $$("dateAsOn").getValue();
   
    dataparam["ddlAccordingTo"] = $$("ddlAccordingTo").getValue();
    dataparam["ddlStatus"] = $$("ddlStatus").getValue();
    dataparam["ddlSortOn"] = $$("ddlSortOn").getValue();

    dataparam["IdsAllParty"] = IdsAllParty == undefined ? "" : IdsAllParty;
    dataparam["IdsPartySub"] = IdsPartySub == undefined ? "" : IdsPartySub;

    if ($.trim(Option) == "1") {

        dataparam["txtUpDate"] = $$("txtUpDate").getValue();
        dataparam["txtUpTm"] = $$("txtUpTm").getValue();
        dataparam["UpDateInd"] = "1";
    }
    else {
        dataparam["txtUpDate"] = "";
        dataparam["txtUpTm"] = "";
        dataparam["UpDateInd"] = "";
    }
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "")
                rowData = JSON.parse(d);

            $$("grdOutStandAge").clearAll();
            $$("grdOutStandAge").parse(rowData);
            $$("grdOutStandAge").refresh();
        },
    });
}

function fnCallUpdatePopup() {

    var ARCont = fnMstARControl();

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "UpdatePopupSearch",
        head: "Updation of Bills",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        body: {
            view: 'form',
            elements: [
                {
                    rows: [{
                        id: "txtUpDate",
                        view: "text",
                        label: "Date",
                        value: ARCont[0].BILL_LAST_UPDATE_DT1,
                        labelAlign: "Right",
                        labelWidth: 65,
                        inputWidth: 280,
                        width: 300,

                    },
                    {
                        id: "txtUpTm",
                        view: "text",
                        label: "Time",
                        value: ARCont[0].BILL_LAST_UPDATE_TM,
                        labelAlign: "Right",
                        labelWidth: 65,
                        inputWidth: 160,
                        width: 200,
                    },
                    {
                        paddingX: 190,
                        cols: [
                            {
                                view: "button",
                                id: "OkUpdt",
                                value: "Ok",
                                align: "right",
                                inputWidth: 70,
                                width: 100,
                                on: {
                                    'onItemClick': function () {
                                        $$("UpdatePopupSearch").hide();
                                        prcfnLoadPartyOut("1");
                                        
                                    }
                                }
                            },
                            {
                                view: "button",
                                id: "CancelUpdt",
                                value: "Cancel",
                                align: "right",
                                inputWidth: 70,
                                width: 80,
                                on: {
                                    'onItemClick': function () {
                                        $$("UpdatePopupSearch").hide();
                                        prcfnLoadPartyOut("");
                                    }
                                },
                            }
                        ]
                    }
                    ]
                }
            ]
        },
    });

    $$("UpdatePopupSearch").show();
}

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