var app = angular.module('BQTApp', ['webix']);



app.controller("BQReportsController", function ($scope) {
    fnAccountDt();
    debugger;
    $("#LoadDIv").hide();
    //  $("#hdnPageLoad").val("1");
    $("#hdchkMaterialization").val("1");
    //$$("chkMaterialization").setValue("1");
    // $("#hdddlVenuGrp").val("ALL"); 
    //$("#hdchkclose").val("1"); 

    $scope.frmBQAdvanceMaterialization = {
        id: "frmBQAdvanceMaterialization",
        view: 'form',
        minWidth: 900,
        height: 550,
        elements: [
            {

                rows: [
                    {

                        cols: [
                                {
                                    rows: [
                                        {
                                            cols: [
                                                {


                                                    labelAlign: "Right",
                                                    labelWidth: 40,
                                                    inputWidth: 100,
                                                    height: 25,
                                                    width: 200,
                                                    minWidth: 100,



                                                },
                                                     {
                                                         view: "datepicker",
                                                         id: "txtFrmDate",
                                                         stringResult: true,
                                                         label: "From",
                                                         format: "%d/%m/%Y",
                                                         labelAlign: "Right",
                                                         labelWidth: 40,
                                                         inputWidth: 160,
                                                         height: 1,
                                                         //  format: $("#hdnDateFrmt").val() == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                                         container: "divGrid",
                                                         width: 160,
                                                         minWidth: 160,
                                                         value: $("#hdnCurrentDt").val(),
                                                         on: {
                                                             onChange: function (newval, oldval) {
                                                                 //  DateChk();
                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "datepicker",
                                                         id: "txtToDate",
                                                         stringResult: true,
                                                         label: "To",
                                                         format: "%d/%m/%Y",
                                                         labelAlign: "Right",
                                                         labelWidth: 40,
                                                         inputWidth: 160,
                                                         width: 160,
                                                         //format: $("#hdnDateFrmt").val() == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                                         height: 25,
                                                         minWidth: 160,
                                                         value: $("#hdnCurrentDt").val(),
                                                         on: {
                                                             onChange: function (newval, oldval) {
                                                                 //DateChk();
                                                             }
                                                         }
                                                     },


                                                     {
                                                         view: "datepicker",
                                                         id: "txtAson",
                                                         stringResult: true,
                                                         label: "As on",
                                                         format: "%d/%m/%Y",
                                                         labelAlign: "Right",
                                                         labelWidth: 40,
                                                         inputWidth: 160,
                                                         height: 1,
                                                         container: "divGrid",
                                                         width: 160,
                                                         minWidth: 160,
                                                         value: $("#hdnCurrentDt").val(),
                                                         hidden: true,
                                                         on: {
                                                             onChange: function () {
                                                                 //PUfrmDateChange();
                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnDisplay',
                                                         label: "Display", labelAlign: "left",
                                                         labelWidth: 0,
                                                         inputWidth: 100,
                                                         width: 120,
                                                         minWidth: 120,
                                                         on: {
                                                             onItemClick: function () {

                                                                 display();


                                                             }
                                                         }
                                                     }, {
                                                         view: "button",
                                                         id: "btnFilters",
                                                         value: "Filters",
                                                         width: 40,
                                                         label: '<span class="fa fa-filter"></span>',
                                                         tooltip: true,
                                                         on: {

                                                             onItemClick: function () {
                                                                 //fnLoadFilterWindow();
                                                                 fnVenGroupLoad();
                                                                 btnFilterClick();
                                                                 fnclear();
                                                                 // ShowOptionsColums();
                                                                 // $("#hdnPageLoad").val("2");
                                                                 // btnOkFilterClick();
                                                                 debugger;
                                                             }
                                                         }
                                                     },

                                                      {
                                                          labelWidth: 100, inputWidth: 50,
                                                          width: 1250, minWidth: 450,
                                                      },
                                            ]

                                        },

                                    ]
                                },
                        ]
                    },
                   {
                       id: "gridmain",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       autoConfig: true,
                       height: 500,
                       minWidth: 900,
                       scroll: true,
                       footer: true,
                       // position: "flex",                       
                       data: [],

                       columns: [
                          //  { header: "Reserve No", id: "Reserve_no", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                            { header: "Reserve No", id: "RESERVE_NO", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                           { header: "Guest", id: "GUEST_NM", width: 200, css: { 'text-align': 'left ! important' }, hidden: false },
                           { header: "Function ", id: "FUNCTION_NM", width: 200, css: { 'text-align': 'left ! important' }, hidden: true },
                           { header: "Function Dt ", id: "FROM_DT", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                           { header: "Refund Amt", id: "Refund_Amt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                       { header: "Retention Amt ", id: "REFUNDAMT", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                              { header: "Advance DT ", id: "adTRN_DT", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                 { header: "Advance No ", id: "GS_NO", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                             { header: "Date", id: "U_Trn_dt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                              { header: "Time", id: "Update_Dt", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                              { header: "Settlement Mode", id: "Setl_Mode_NM", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                              { header: "Advance Amt", id: "Amt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true, sort: sortByGuest },
                                 { header: "Adjusted Amt", id: "Adj_Adv_Amt", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                                  { header: "Pending Amt", id: "PendingAmt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                               { header: "adv.Status", id: "advStatus", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                               { header: "Res.Status", id: "ResStatus", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                               { header: "Create By", id: "A_C_BY", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                { header: "Create By", id: "a_Update_by", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                 { header: "Tax ID", id: "Tax_Nm", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                 { header: "Tax Amount  ", id: "T_T", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                           { header: "Reservation Date ", id: "Reserve_dt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                             { header: "Amt ", id: "c_By", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                               { header: "Amt ", id: "deposit_amt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                  { header: "Reserve Status ", id: "Res_Status", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                  { header: "Reserve By ", id: "U_C_BY", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                            { header: "Bill No", id: "GS_BILL", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                            { header: "Bill Amt", id: "Bill_AMT", format: "1111111.000", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                            { header: "Advance Receipt Dt", id: "Trn_dt", width: 180, css: { 'text-align': 'left ! important' }, hidden: false },
                            { header: "Adjusted Dt", id: "Bill_Dt", width: 120, css: { 'text-align': 'left ! important' }, hidden: false },
                            { header: "User", id: "C_BY", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                              { header: "Advance No ", id: "DISP_SNO", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                              { header: "Venue Group", id: "G_NM", width: 100, css: { 'text-align': 'left ! important' }, hidden: false },
                                  { header: "Venue ", id: "VENUE_NM", width: 120, css: { 'text-align': 'left ! important' }, hidden: false },
                                   { header: "Cash ", id: "cash", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                     { header: "C.Card ", id: "ccard", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                       { header: "Cheque", id: "cheque", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                     { header: "Total", id: "AMT", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                      { header: "Narration", id: "NARRATION", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                      { header: "Forn.Cur", id: "forncur", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },
                                      { header: "Forn.Amt", id: "fornamt", width: 120, css: { 'text-align': 'left ! important' }, hidden: true },

                       ],
                       //data: [],
                       on: {
                           "onresize": webix.once(function () {
                               this.adjustRowHeight("FUNCTION_NM", true);
                           })
                       }
                   },
                ]
            }
        ]
    }
    fnLoadFilterWindow();
});
function sortByGuest(R1, R2) {
    debugger;
    var a = R1.GUEST_NM1;
    var b = R2.GUEST_NM1;
    var skip = R1.CLR;
    if (a == null) a = "";
    if (b == null) b = "";
    var c = R1.ROOM_NO;
    var d = R2.ROOM_NO;
    var skip = R1.CLR;
    if (c == null) c = "";
    if (d == null) d = "";
    var s = "00000000" + c;
    c = s.substr(s.length - 8);
    var s = "00000000" + d;
    d = s.substr(s.length - 8);
    a = a.toString().trim() + c;
    b = b.toString().trim() + d;
    if (skip == null || skip == undefined) skip = "";
    if (skip != "") return 0;
    else return a > b ? 1 : (a < b ? -1 : 0);
};
function display() {
    debugger;
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    $("#LoadDIv").show();
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_ADVANCE_MATERIALIZATION";
    dataparam["COMPID"] = $("#hdnCompId").val();
    fromDate = $$("txtFrmDate").getText();
    toDate = $$("txtToDate").getText();
    dataparam["fromDate"] = fromDate;
    dataparam["toDate"] = toDate;
    dataparam["txtReserNoverserach"] = $("#hdtxtReserNoverserach").val();
    dataparam["chkArrange"] = $("#hdchkArrange").val();
    dataparam["ddlVenuGrp"] = $("#hdddlVenuGrp").val();
    dataparam["chkPending"] = $("#hdchkPending").val() == "1" ? $("#hdchkPending").val() : "0";
    dataparam["chkMaterialization"] = $("#hdchkMaterialization").val() == "1" ? $("#hdchkMaterialization").val() : "0";
    dataparam["chkAdvance"] = $("#hdchkAdvance").val() == "1" ? $("#hdchkAdvance").val() : "0";
    dataparam["chkSummary"] = $("#hdkSummary").val();
    dataparam["chkFunctiondetails"] = $("#hdnchkFunctiondetails").val();
    dataparam["chkstatusav"] = $("#hdchkstatusav").val();
    dataparam["chkclose"] = $("#hdchkclose").val();
    debugger;
    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "" && d != "[]") {
                debugger;
                var rowData = JSON.parse(d);
                $$("gridmain").clearAll();
                $$("gridmain").parse(rowData);
                $$("gridmain").refresh();
            }
            else {
                $$("gridmain").clearAll();
                AlertMessage("No Records Found");
            }
        }
    });
    $("#divTheme").removeClass("pagefalse");
    $("#pageload").hide();
    $("#LoadDIv").hide();
}

function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").val();
    var FullData = "";

    FullData = $$("gridmain").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("gridmain"), {
            docHeader: vHeader,
            fontSize: 25,
            textAlign: "left",
            mode: "landscape",
            fit: "data"
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }

};

function fnExcelExport() {
    var vHeader = $("#LayoutText").val();
    var FullData = "";
    FullData = $$("gridmain").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("gridmain"), {
            filename: vHeader,
            styles: true,
            name: vHeader,
            docHeader: vHeader,
            rawValues: true,
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }
};
function fnLoadFilterWindow() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 630,
        move: true,
        body: {
            padding: { right: 3, left: 3, bottom: 0 },
            view: "form",
            id: "frmFilter",

            elements: [
                {
                    width: 630,
                    css: "LayBorder",
                    cols: [
                        {
                            view: "layout",
                            //css:"LayBorder",  
                            width: 300,

                            rows: [

                                    { view: "template", template: "Search", css: " SecHeader", height: 25, width: 370 },
                                    {
                                        padding: { top: 0, left: 10, bottom: 0, right: 10 },
                                        rows: [
                                            {
                                                view: "text",
                                                id: "txtReserNoverserach",
                                                label: "Reserve No",
                                                labelAlign: "Left",
                                                width: 250,
                                                labelWidth: 110,

                                            },
                                        ]
                                    },
                            ]
                        },
                        {
                            rows: [

                                {
                                    view: "layout",
                                    css: "LayBorder",

                                    rows: [

                                            { view: "template", template: "Options", css: " SecHeader", height: 25, width: 200 },
                                            {
                                                padding: { top: 5, left: 5, bottom: 20, right: 5 },
                                                rows: [
                                                    {
                                                        view: "checkbox",
                                                        id: "chkArrange",
                                                        label: "Foreign Currency",
                                                        labelWidth: 5,
                                                        width: 350,
                                                        labelWidth: 110,
                                                        //   value: "0",
                                                        on: {
                                                            "onChange": function (newval) {
                                                                debugger;
                                                                // if ( $("#hdchkMaterialization").val() != "1" && $("#hdchkAdvance").val() != "1") {

                                                                if (newval == "1") {
                                                                    // $$("chkMaterialization").setValue("1");
                                                                    // $$("chkAdvance").setValue("0")
                                                                    //if (chkMaterialization =="1"){
                                                                    $$("gridmain").showColumn("forncur");
                                                                    $$("gridmain").showColumn("fornamt");
                                                                    //}
                                                                }
                                                                else {


                                                                    $$("gridmain").hideColumn("forncur");
                                                                    $$("gridmain").hideColumn("fornamt");
                                                                    //$$("gridmain").hideColumn("forncur");
                                                                    //$$("gridmain").hideColumn("fornamt");
                                                                    //$$("gridmain").showColumn("Narration");
                                                                    //$$("gridmain").showColumn("Update_by");
                                                                    //$$("gridmain").showColumn("AMT");
                                                                    //$$("gridmain").showColumn("ccard");
                                                                    //$$("gridmain").showColumn("cash");
                                                                    //$$("gridmain").showColumn("Update_Dt");
                                                                    //$$("gridmain").showColumn("GS_NO");
                                                                    //$$("gridmain").showColumn("FUNCTION_NM");
                                                                    //$$("gridmain").showColumn("Reserve_no");
                                                                    //$$("gridmain").showColumn("Guest_nm");
                                                                }
                                                            }
                                                        }


                                                    },


                                           {
                                               view: "checkbox",
                                               width: 350,
                                               labelWidth: 110,
                                               id: "chkPending",
                                               label: "Pending Advance",
                                               //value: "0",
                                               on: {
                                                   "onChange": function (newval, oldVal) {
                                                       debugger;
                                                       if (newval == "1") {
                                                           $$("chkMaterialization").setValue("0");
                                                           $$("chkAdvance").setValue("0")
                                                           $$("chkFunctiondetails").show();
                                                           $$("txtAson").show();
                                                           $("#LayoutText").text("Banquet Advance(Pending)");
                                                           $$("txtFrmDate").hide();
                                                           $$("txtToDate").hide();
                                                           $$("txtAson").show();
                                                           $$("txtAson").disable();
                                                           $$("chkFunctiondetails").show();
                                                           $$("chkArrange").hide();
                                                           $$("chkstatusav").hide();

                                                           $$("gridmain").showColumn("Guest_nm");
                                                           $$("gridmain").showColumn("Reserve_dt");
                                                           $$("gridmain").showColumn("deposit_amt");
                                                           $$("gridmain").showColumn("U_C_BY");
                                                           $$("gridmain").showColumn("FUNCTION_NM");
                                                           $$("gridmain").showColumn("Res_Status");
                                                           $$("gridmain").showColumn("RESERVE_NO");
                                                           $$("gridmain").hideColumn("forncur");
                                                           $$("gridmain").hideColumn("fornamt");
                                                           $$("gridmain").hideColumn("NARRATION");
                                                           $$("gridmain").hideColumn("C_BY");
                                                           $$("gridmain").hideColumn("AMT");
                                                           $$("gridmain").hideColumn("Update_Dt");
                                                           $$("gridmain").hideColumn("adTRN_DT");
                                                           $$("gridmain").hideColumn("DISP_SNO");
                                                           $$("gridmain").hideColumn("cash");

                                                           $$("gridmain").hideColumn("cheque");
                                                           $$("gridmain").hideColumn("ccard");
                                                       }
                                                       else if (newval == "0" && oldVal != "") {
                                                           $$("chkFunctiondetails").show();

                                                           $("#LayoutText").text("Banquet Advance");
                                                           $$("gridmain").showColumn("NARRATION");
                                                           $$("gridmain").showColumn("C_BY");
                                                           $$("gridmain").showColumn("AMT");
                                                           $$("gridmain").showColumn("Update_Dt");
                                                           $$("gridmain").showColumn("adTRN_DT");
                                                           $$("gridmain").showColumn("DISP_SNO");
                                                           $$("gridmain").showColumn("FUNCTION_NM");
                                                           $$("gridmain").showColumn("Guest_nm");
                                                           $$("gridmain").showColumn("RESERVE_NO");
                                                           $$("gridmain").showColumn("C_BY");
                                                           $$("gridmain").showColumn("cash");

                                                           $$("gridmain").showColumn("cheque");
                                                           $$("gridmain").showColumn("ccard");
                                                           //////////////////////////////////

                                                           $$("gridmain").hideColumn("Reserve_dt");
                                                           $$("gridmain").hideColumn("deposit_amt");
                                                           $$("gridmain").hideColumn("U_C_BY");
                                                           $$("gridmain").hideColumn("Res_Status");
                                                           $$("gridmain").hideColumn("GS_NO");


                                                           $$("txtFrmDate").show();
                                                           $$("txtToDate").show();
                                                           $$("txtAson").hide();

                                                       }

                                                   }


                                               }
                                           },

                                            {
                                                view: "checkbox",
                                                width: 200,
                                                labelWidth: 110,
                                                id: "chkFunctiondetails",
                                                label: "Function Details",
                                                hidden: true,

                                            },

                                           {
                                               cols: [
                                                   {
                                                       view: "checkbox",
                                                       width: 200,
                                                       labelWidth: 110,
                                                       id: "chkMaterialization",
                                                       label: "Materialization",
                                                       value: "1",
                                                       on: {
                                                           "onChange": function (newval, oldVal) {
                                                               debugger;

                                                               if (newval == "1") {
                                                                   debugger;

                                                                   $$("chkPending").setValue("0");
                                                                   $$("chkAdvance").setValue("0")
                                                                   $("#LayoutText").text("Banquet Advance - Materialization");
                                                                   $$("chkArrange").show();
                                                                   $$("txtAson").hide();
                                                                   $$("chkFunctiondetails").setValue("0")
                                                                   $$("chkFunctiondetails").hide();
                                                                   $$("gridmain").showColumn("Guest_nm");
                                                                   $$("gridmain").showColumn("GS_BILL");
                                                                   $$("gridmain").showColumn("Bill_AMT");
                                                                   $$("gridmain").showColumn("Update_Dt");

                                                                   $$("gridmain").showColumn("Update_Dt");
                                                                   $$("gridmain").showColumn("Adj_Adv_Amt");
                                                                   $$("gridmain").showColumn("Guest_nm");
                                                                   $$("gridmain").showColumn("VENUE_NM");

                                                                   $$("gridmain").showColumn("G_NM");
                                                                   $$("gridmain").showColumn("Update_by");
                                                                   $$("gridmain").showColumn("RESERVE_NO");
                                                                   $$("gridmain").showColumn("Bill_Dt");
                                                                   $$("gridmain").showColumn("Trn_dt");
                                                                   $$("gridmain").showColumn("C_BY");

                                                                   $$("gridmain").hideColumn("adTRN_DT");
                                                                   $$("gridmain").hideColumn("GS_NO");
                                                                   $$("gridmain").hideColumn("AMT");
                                                                   $$("gridmain").hideColumn("NARRATION");
                                                                   $$("gridmain").hideColumn("U_C_BY");
                                                                   $$("gridmain").hideColumn("AMT");
                                                                   $$("gridmain").hideColumn("ccard");
                                                                   $$("gridmain").hideColumn("cash");
                                                                   $$("gridmain").hideColumn("Amt");
                                                                   $$("gridmain").hideColumn("Amt");
                                                                   $$("gridmain").hideColumn("FUNCTION_NM");
                                                                   $$("gridmain").hideColumn("DISP_SNO");
                                                                   $$("gridmain").hideColumn("Res_Status");
                                                                   $$("gridmain").hideColumn("Tax_Nm");
                                                                   $$("gridmain").hideColumn("Reserve_dt");

                                                                   $$("gridmain").hideColumn("deposit_amt");
                                                                   $$("gridmain").hideColumn("cheque");
                                                                   $$("gridmain").hideColumn("ccard");

                                                               }

                                                                   //if (chkArrange == "1") {
                                                                   //    $$("gridmain").showColumn("forncur");
                                                                   //    $$("gridmain").showColumn("fornamt");
                                                                   //}
                                                                   //else if (chkArrange == "0") {
                                                                   //    $$("gridmain").hideColumn("forncur");
                                                                   //    $$("gridmain").hideColumn("fornamt");
                                                                   //}

                                                                   //else if (newval == "0" && $("#hdchkMaterialization").val("1")) {
                                                                   //    $("#LayoutText").text("Banquet Advance");
                                                                   //}
                                                               else if (newval == "0" && oldVal != "") {
                                                                   debugger;


                                                                   ///////////////

                                                                   $("#LayoutText").text("Banquet Advance");
                                                                   $$("chkFunctiondetails").show();
                                                                   $$("gridmain").showColumn("NARRATION");
                                                                   $$("gridmain").showColumn("C_BY");
                                                                   $$("gridmain").showColumn("AMT");
                                                                   $$("gridmain").showColumn("Update_Dt");
                                                                   $$("gridmain").showColumn("adTRN_DT");
                                                                   $$("gridmain").showColumn("DISP_SNO");
                                                                   $$("gridmain").showColumn("FUNCTION_NM");
                                                                   $$("gridmain").showColumn("Guest_nm");
                                                                   $$("gridmain").showColumn("RESERVE_NO");
                                                                   $$("gridmain").showColumn("C_BY");
                                                                   $$("gridmain").showColumn("cash");
                                                                   //////////////////////////////////
                                                                   $$("gridmain").showColumn("cheque");
                                                                   $$("gridmain").showColumn("ccard");

                                                                   $$("gridmain").hideColumn("GS_BILL");
                                                                   $$("gridmain").hideColumn("Bill_AMT");

                                                                   $$("gridmain").hideColumn("Adj_Adv_Amt");
                                                                   $$("gridmain").hideColumn("VENUE_NM");

                                                                   $$("gridmain").hideColumn("G_NM");
                                                                   $$("gridmain").hideColumn("Update_by");
                                                                   //   $$("gridmain").hideColumn("Reserve_no");
                                                                   $$("gridmain").hideColumn("Bill_Dt");
                                                                   $$("gridmain").hideColumn("Trn_dt");
                                                                   $$("gridmain").hideColumn("GS_NO");

                                                                   //////////////////////////////////////

                                                               }





                                                           }
                                                       }
                                                   },


                                               ]
                                           },

                                                            {
                                                                cols: [{
                                                                    view: "checkbox",
                                                                    width: 140,
                                                                    labelWidth: 110,
                                                                    id: "chkAdvance",
                                                                    label: "Advance List",
                                                                    //value:"0",
                                                                    on: {
                                                                        "onChange": function (newval, oldVal) {
                                                                            //  $$("chkMaterialization").setValue("0")
                                                                            if (newval == "1") {
                                                                                debugger;
                                                                                $$("chkFunctiondetails").setValue("0")
                                                                                $$("chkFunctiondetails").hide();
                                                                                $$("chkclose").setValue("1");
                                                                                $$("chkstatusav").setValue("1");
                                                                                $$("txtAson").hide();
                                                                                $$("chkPending").setValue("0");
                                                                                $$("chkMaterialization").setValue("0")
                                                                                $("#LayoutText").text("Banquet Advance list");
                                                                                $$("chkSummary").setValue("");
                                                                                $$("chkSummary").show();
                                                                                $$("advchkpending").show();
                                                                                $$("advchkclose").show();
                                                                                $$("chkclose").show();
                                                                                $$("chkstatusav").show();
                                                                                $$("chkArrange").show();



                                                                                $$("gridmain").hideColumn("Trn_dt");
                                                                                $$("gridmain").hideColumn("Bill_Dt");
                                                                                $$("gridmain").hideColumn("Bill_AMT");
                                                                                $$("gridmain").hideColumn("G_NM");
                                                                                $$("gridmain").hideColumn("AMT");
                                                                                $$("gridmain").hideColumn("GS_BILL");
                                                                                $$("gridmain").hideColumn("VENUE_NM");
                                                                                $$("gridmain").hideColumn("cash");
                                                                                $$("gridmain").hideColumn("adTRN_DT");
                                                                                $$("gridmain").hideColumn("C_BY");
                                                                                $$("gridmain").hideColumn("NARRATION");
                                                                                $$("gridmain").hideColumn("cheque");
                                                                                $$("gridmain").hideColumn("ccard");
                                                                                $$("gridmain").showColumn("T_T");
                                                                                $$("gridmain").showColumn("RESERVE_NO");
                                                                                $$("gridmain").showColumn("Tax_Nm");
                                                                                $$("gridmain").showColumn("Setl_Mode_NM");
                                                                                $$("gridmain").showColumn("Guest_nm");
                                                                                $$("gridmain").showColumn("FUNCTION_NM");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("ADVAMT");
                                                                                $$("gridmain").showColumn("Adj_Adv_Amt");
                                                                                $$("gridmain").showColumn("Amt");
                                                                                $$("gridmain").showColumn("PendingAmt");
                                                                                $$("gridmain").showColumn("advStatus");
                                                                                $$("gridmain").showColumn("Res_Status");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("GS_NO");
                                                                                $$("gridmain").showColumn("Update_Dt");
                                                                                $$("gridmain").showColumn("a_Update_by");
                                                                                $$("gridmain").showColumn("U_Trn_dt");
                                                                                $$("gridmain").hideColumn("DISP_SNO");

                                                                            }


                                                                            else if (newval == "0" && oldVal != "") {
                                                                                debugger;
                                                                                $$("chkclose").show();
                                                                                $$("chkclose").setValue("0");
                                                                                $$("chkstatusav").setValue("0");
                                                                                $$("chkSummary").setValue("0");
                                                                                $$("chkSummary").hide();
                                                                                $$("advchkpending").hide();
                                                                                $$("advchkclose").hide();
                                                                                $$("chkclose").hide();
                                                                                $$("chkstatusav").hide();
                                                                                $$("chkArrange").hide();
                                                                                $$("chkFunctiondetails").hide();
                                                                                $("#LayoutText").text("Banquet Advance");
                                                                                $$("gridmain").showColumn("NARRATION");
                                                                                $$("gridmain").showColumn("C_BY");
                                                                                $$("gridmain").showColumn("AMT");
                                                                                $$("gridmain").showColumn("Update_Dt");
                                                                                $$("gridmain").showColumn("adTRN_DT");
                                                                                $$("gridmain").showColumn("DISP_SNO");
                                                                                $$("gridmain").showColumn("FUNCTION_NM");
                                                                                $$("gridmain").showColumn("Guest_nm");
                                                                                $$("gridmain").showColumn("RESERVE_NO");
                                                                                $$("gridmain").showColumn("Update_Dt");
                                                                                $$("gridmain").showColumn("C_BY");
                                                                                $$("gridmain").showColumn("cheque");
                                                                                $$("gridmain").showColumn("ccard");

                                                                                $$("gridmain").hideColumn("T_T");
                                                                                $$("gridmain").hideColumn("Tax_Nm");
                                                                                $$("gridmain").hideColumn("Setl_Mode_NM");
                                                                                $$("gridmain").hideColumn("FROM_DT");
                                                                                $$("gridmain").hideColumn("ADVAMT");
                                                                                $$("gridmain").hideColumn("Adj_Adv_Amt");
                                                                                $$("gridmain").hideColumn("Amt");
                                                                                $$("gridmain").hideColumn("PendingAmt");
                                                                                $$("gridmain").hideColumn("advStatus");
                                                                                $$("gridmain").hideColumn("Res_Status");
                                                                                $$("gridmain").hideColumn("FROM_DT");
                                                                                $$("gridmain").hideColumn("a_Update_by");
                                                                                $$("gridmain").hideColumn("U_Trn_dt");
                                                                                $$("gridmain").hideColumn("Refund_Amt");
                                                                                $$("gridmain").hideColumn("REFUNDAMT");
                                                                                $$("gridmain").hideColumn("GS_NO");
                                                                            }


                                                                        }
                                                                    }
                                                                },

                                                                {
                                                                    view: "checkbox",
                                                                    width: 100,
                                                                    labelWidth: 57,
                                                                    id: "chkstatusav",
                                                                    label: "Adv.status",
                                                                    hidden: true,
                                                                    on: {
                                                                        "onChange": function (newval, oldVal) {
                                                                            debugger;
                                                                            if (newval == "1" && $$("chkAdvance").setValue("1") == "1") {
                                                                                $$("chkclose").setValue("1");
                                                                                $$("chkstatusav").setValue("1");
                                                                            }
                                                                            else {

                                                                            }



                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    view: "label",
                                                                    width: 50,
                                                                    labelWidth: 50,
                                                                    id: "advchkpending",
                                                                    label: "Pending",
                                                                    hidden: true,

                                                                },

                                                                ]
                                                            },

                                                            {

                                                                cols: [{
                                                                    view: "checkbox",
                                                                    width: 200,
                                                                    labelWidth: 110,
                                                                    id: "chkSummary",
                                                                    label: "Summary",
                                                                    // value: 2,
                                                                    hidden: true,
                                                                    on: {
                                                                        "onChange": function (newval, oldVal) {

                                                                            if (newval == "1") {
                                                                                $$("chkFunctiondetails").hide();
                                                                                $$("gridmain").showColumn("Guest_nm");
                                                                                $$("gridmain").showColumn("FUNCTION_NM");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("ADVAMT");
                                                                                $$("gridmain").showColumn("Adj_Adv_Amt");
                                                                                $$("gridmain").showColumn("Amt");
                                                                                $$("gridmain").showColumn("PendingAmt");
                                                                                $$("gridmain").showColumn("advStatus");
                                                                                $$("gridmain").showColumn("Res_Status");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("REFUNDAMT");
                                                                                $$("gridmain").showColumn("Refund_Amt");

                                                                                $$("gridmain").hideColumn("GS_NO");
                                                                                $$("gridmain").hideColumn("Update_Dt");
                                                                                $$("gridmain").hideColumn("Trn_dt");
                                                                                $$("gridmain").hideColumn("U_Trn_dt");

                                                                                $$("gridmain").hideColumn("G_NM");
                                                                                $$("gridmain").hideColumn("Tax_Nm");
                                                                                $$("gridmain").hideColumn("T_T");
                                                                                $$("gridmain").hideColumn("GS_BILL");
                                                                                $$("gridmain").hideColumn("VENUE_NM");
                                                                                $$("gridmain").hideColumn("Setl_Mode_NM");
                                                                                ///-------------

                                                                                $$("gridmain").hideColumn("Bill_Dt");

                                                                                $$("gridmain").hideColumn("DISP_SNO");

                                                                                $$("gridmain").showColumn("RESERVE_NO");
                                                                            }

                                                                            else if (newval == "0" && oldVal != "") {
                                                                                debugger;
                                                                                $$("chkFunctiondetails").hide();
                                                                                $$("gridmain").showColumn("T_T");
                                                                                $$("gridmain").showColumn("Tax_Nm");
                                                                                $$("gridmain").showColumn("Setl_Mode_NM");
                                                                                $$("gridmain").showColumn("Guest_nm");
                                                                                $$("gridmain").showColumn("FUNCTION_NM");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("ADVAMT");
                                                                                $$("gridmain").showColumn("Adj_Adv_Amt");
                                                                                $$("gridmain").showColumn("Amt");
                                                                                $$("gridmain").showColumn("PendingAmt");
                                                                                $$("gridmain").showColumn("advStatus");
                                                                                $$("gridmain").showColumn("Res_Status");
                                                                                $$("gridmain").showColumn("FROM_DT");
                                                                                $$("gridmain").showColumn("DISP_SNO");
                                                                                $$("gridmain").showColumn("Update_Dt");
                                                                                $$("gridmain").showColumn("a_Update_by");
                                                                                $$("gridmain").showColumn("U_Trn_dt");
                                                                                $$("gridmain").hideColumn("Refund_Amt");
                                                                                $$("gridmain").hideColumn("REFUNDAMT");
                                                                                $$("gridmain").hideColumn("GS_NO");

                                                                            }
                                                                        }
                                                                    },
                                                                },
                                                                {
                                                                    cols:
                                                                        [{
                                                                            view: "checkbox",
                                                                            width: 50,
                                                                            labelWidth: 50,
                                                                            id: "chkclose",
                                                                            hidden: true,
                                                                            on: {
                                                                                "onChange": function (newval, oldVal) {

                                                                                    if (newval == "1") {
                                                                                        $$("chkstatusav").setValue("0");
                                                                                    }



                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            view: "label",
                                                                            width: 50,
                                                                            labelWidth: 50,
                                                                            id: "advchkclose",
                                                                            label: "Closed",
                                                                            hidden: true,

                                                                        },



                                                                        ]
                                                                },

                                                                ]


                                                            },




                                                            {
                                                                view: "richselect",
                                                                id: "ddlVenuGrp",
                                                                label: " Venu Group",
                                                                labelAlign: "Left",
                                                                width: 250,
                                                                labelWidth: 110,
                                                                placeholder: "ALL",
                                                            },


                                                ]
                                            },
                                            {}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    view: "layout",
                    css: "LayBorder1",
                    padding: { top: 5, bottom: 5, right: 10 },
                    rows: [
                       {
                           cols: [{}, {
                               view: "button",
                               type: "icon",
                               id: "OkFilter",
                               icon: "wxi-check",
                               label: "OK",
                               inputWidth: 100,
                               width: 100,
                               click: function (newval, oldVal) {
                                   btnOkFilterClick();

                               }
                           },

                           {

                               view: "button",
                               type: "icon",
                               id: "OkFiltercancel",
                               icon: "wxi-check",
                               label: "Cancel",
                               inputWidth: 100,
                               width: 100,
                               click: function () {

                                   $$("AdvFilter").hide();
                                   // $("#hdnPageLoad").val("1");
                               }
                           },


                                //{ view: "text", name: "hdtxtReserNoverserach", id: "hdtxtReserNoverserach", hidden: true, },
                                //{ view: "text", name: "hdchkArrange", id: "hdchkArrange", hidden: true, value: '0' },
                                //{ view: "text", name: "hdddlVenuGrp", id: "hdddlVenuGrp", hidden: true,  },
                                //{ view: "text", name: "hdchkPending", id: "hdchkPending", hidden: true,  },
                                //{ view: "text", name: "hdchkMaterialization", id: "hdchkMaterialization", hidden: true, value:'1' },
                                //{ view: "text", name: "hdchkAdvance", id: "hdchkAdvance", hidden: true, value: '0' },
                                //{ view: "text", name: "hdchkstatusav", id: "hdchkstatusav", hidden: true, value: '0' },
                                //{ view: "text", name: "hdchkclose", id: "hdchkclose", hidden: true, value: '0' },

                           ],

                       }
                    ]

                },
            ]
        }
    });
};




function btnFilterClick() {
    debugger;

    $$("chkArrange").setValue($("#hdchkArrange").val());
    $$("txtReserNoverserach").setValue($("#hdtxtReserNoverserach").val());
    $$("ddlVenuGrp").setValue($("#hdddlVenuGrp").val());
    $$("chkPending").setValue($("#hdchkPending").val());
    $$("chkAdvance").setValue($("#hdchkAdvance").val());
    $$("chkstatusav").setValue($("#hdchkstatusav").val());
    $$("chkclose").setValue($("#hdchkclose").val());
    $$("chkSummary").setValue($("#hdkSummary").val());
    $$("chkFunctiondetails").setValue($("#hdnchkFunctiondetails").val());

    $$("chkMaterialization").setValue($("#hdchkMaterialization").val());
    // $("#hdnPageLoad").val("1");
    $$("AdvFilter").show();
};
function btnOkFilterClick() {
    debugger;
    $$("gridmain").clearAll();
    $("#hdchkArrange").val($$("chkArrange").getValue());
    $("#hdtxtReserNoverserach").val($$("txtReserNoverserach").getValue());
    $("#hdddlVenuGrp").val($$("ddlVenuGrp").getValue());
    $("#hdchkPending").val($$("chkPending").getValue());
    $("#hdchkMaterialization").val($$("chkMaterialization").getValue());
    $("#hdchkAdvance").val($$("chkAdvance").getValue());
    $("#hdchkstatusav").val($$("chkstatusav").getValue());
    $("#hdchkclose").val($$("chkclose").getValue());
    $("#hdkSummary").val($$("chkSummary").getValue());
    $("#hdnchkFunctiondetails").val($$("chkFunctiondetails").getValue());

    // $("#hdnPageLoad").val("2");
    $$("AdvFilter").hide();

};

function fnVenGroupLoad() {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_VENUGROUPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var rowData = [];
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                rowData.splice(0, 0, { value: "ALL", });
                $$("ddlVenuGrp").define("options", rowData);
            }
        }
    });
    return rowData;
}
function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}

function sidebarFn() {
    $$("frmBQAdvanceMaterialization").resize();
    $$("frmBQAdvanceMaterialization").adjust();
    $$("gridmain").resize();
    $$("gridmain").adjust();
}


function DateChk() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var curdt = $("#hdnCurrentDt").val();
    //var etodt = $$("txtToDt").getText();
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var ecurdate = new Date(curdt.split('/')[0], curdt.split('/')[1] - 1, curdt.split('/')[2]);
    if (efdate < ecurdate) {
        $$("txtFrmDate").setValue($("#hdnCurrentDt").val());
        return false;
    }
    return true;
}
function validateDate() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var etodt = $$("txtToDate").getText();
    if ($("#hdnDateFrmt").val() == "1") {
        var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
        var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
    }
    else {
        var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[0] - 1, efromdt.split('/')[1]);
        var etdate = new Date(etodt.split('/')[2], etodt.split('/')[0] - 1, etodt.split('/')[1]);
    }
    if (efdate > etdate) {
        AlertMessage('From Date can not be greater than To date');
        return false;
    }

    return true;
}

function fnclear() {
    $$("txtReserNoverserach").setValue("");
}