
var app = angular.module('BQTApp', ['webix']);

app.controller("BQQueriesController", function ($scope) {

    $("#LoadDIv").hide();
    var valid = [
        { "id": "A1", "value": "Advance" },
        { "id": "A2", "value": "Plan Rate" },
        { "id": "A3", "value": "Venue Rate" },
        { "id": "A4", "value": "FP No" },
        { "id": "A5", "value": "Bill No" },
        { "id": "A6", "value": "Mobile" },
        { "id": "A7", "value": "EMail" },
        { "id": "A8", "value": "Booker" },
        { "id": "A9", "value": "Billing Instruction" },
    ];
    fnAccountDt();
    debugger;
    $scope.frmReservationList = {
        id: "frmReservationList",
        view: 'form',
        minWidth: 900,
        height: 550,
        elements: [
            {
                rows: [
                   {
                       cols: [
                            
                               {
                                   id: "ChkReservation",
                                   view: "checkbox",
                                   label: "Reservation",
                                   labelAlign: "left",
                                   labelWidth: 70, inputWidth: 100,
                                   width: 100, minWidth: 100,
                                   value: "1",
                                   disabled: true,
                               },
                           {
                               id: "ChkReserDateWise",
                               view: "checkbox",
                               label: "Reservation Date Wise",
                               labelAlign: "left",
                               labelWidth: 100, inputWidth: 150,
                               width: 150, minWidth: 150,
                               on: {
                                   "onChange": function (newval, oldVal) {
                                       if (newval == "1") {
                                           $$("ChkFunDateWise").setValue("0");
                                           $$("txtFrmDate").define("label", "Reservation From");
                                           $$("txtFrmDate").refresh();
                                       }
 
                                   }
                               }
                         
                           },
                           {
                               view: "datepicker",
                               id: "txtFrmDate",
                               stringResult: true,
                               label: "From Dt",
                               format: "%d/%m/%Y",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 220,
                               width: 230,
                               minWidth: 220,
                               value: $("#hdnCurrentDt").val(),
                           },
                             {
                                 view: "datepicker",
                                 id: "txtToDt",
                                 disable: true,
                                 stringResult: true,
                                 label: "To Dt",
                                 format: "%d/%m/%Y",
                                 labelAlign: "Left",
                                 labelWidth: 40,
                                 inputWidth: 160,
                                 width: 160,
                                 minWidth: 160,
                                 value: $("#hdnCurrentDt").val(),
                             },
                             {
                                 view: "button",
                                 id: 'btnDisplay',
                                 label: "Display", labelAlign: "left",
                                 labelWidth: 40,
                                 inputWidth: 110,
                                 width: 110,
                                 on: {
                                     onItemClick: function () {
                                         display();
                                     }
                                 }
                             },
                              {
                                  id: "ChkConfirmed",
                                  view: "checkbox",
                                  label: "Confirmed",
                                  labelAlign: "left",
                                  labelWidth: 70, inputWidth: 100,
                                  width: 100, minWidth: 100,
                                  value: "1",
                                  on: {
                                      "onChange": function (newval, oldVal) {                                          
                                          display();
                                      }
                                  }
                              },
                              {
                                  id: "multiOption",
                                  view: "multiselect",
                                  labelAlign: "left",
                                  inputWidth: 170,
                                   width: 170,
                                  options: valid,
                                  placeholder:"Options",
                                  on: {
                                      "onChange": function (newval, oldVal) {
                                          ShowOptionsColums(newval, oldVal);
                                         
                                      }
                                  }
                              },

                            
                       ]
                   },
                   {
                       cols: [
                            {
                                labelWidth: 100, inputWidth: 100,
                                width: 100, minWidth: 100,
                            },
                             {
                                 id: "ChkBlock",
                                 view: "checkbox",
                                 label: "Block",
                                 labelAlign: "left",
                                 labelWidth: 70, inputWidth: 100,
                                 width: 100, minWidth: 100,
                                 hidden: true,
                             },
                       {
                           id: "ChkFunDateWise",
                           view: "checkbox",
                           label: "Function Date Wise",
                           labelAlign: "left",
                           labelWidth: 100, inputWidth: 150,
                           minWidth: 150, width: 648,
                           value: "1",
                           on: {
                                 "onChange": function (newval, oldVal) {
                                if (newval == "1") {
                               $$("ChkReserDateWise").setValue("0");
                               $$("txtFrmDate").define("label", "Function From");
                               $$("txtFrmDate").refresh();
                                            }
                                            }
                                         }
                                        },                     
                       {
                           id: "ChkTentative",
                           view: "checkbox",
                           label: "Tentative",
                           labelAlign: "left",
                           value:"1",
                           labelWidth: 70, inputWidth: 100,
                           width: 100, minWidth: 100,
                           on: {
                               "onChange": function (newval, oldVal) {
                                   display();
                               }
                           }
                       },
                        
                       ]
                   },
                   {
                       cols: [
                           {
                               labelWidth: 100, inputWidth: 150,
                               width: 748, minWidth: 150,
                           },
                   {
                       id: "ChkCompleted",
                       view: "checkbox",
                       label: "Completed",
                       labelAlign: "left",
                       value: "1",
                       labelWidth: 70, inputWidth: 150,
                       width: 150, minWidth: 150,
                       on: {
                           "onChange": function (newval, oldVal) {
                               display();
                           }
                       }

                   }, {
                       labelWidth: 100, inputWidth: 150,
                       width: 700, minWidth: 150,
                   },

                       ]
                   },
                   {
                      
                       id: "reservListGrid",
                       container: "divGrid",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       height: 430,
                       minWidth: 900,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [
                           { header: ["Res/blk#", { content: "textFilter" }], id: "ixResNo", width: 65, css: { 'text-align': 'left ! important' } },
                           { header: "ResDate", id: "ixResDt", width: 90, css: { 'text-align': 'left ! important' } },
                           { header: "Type", id: "IXTYPE", width: 55, css: { 'text-align': 'left ! important' } },
                           { header: ["Guest", { content: "textFilter" }], id: "ixGuest", width: 120, css: { 'text-align': 'left ! important' } },
                           {
                               header: "Mobile", id: "ixMobile", width: 90, css: { 'text-align': 'right ! important' }, hidden: true,      
                           },
                           { header: "E-mail", id: "ixEMail", width: 120, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: "Booker", id: "ixBooker", width: 80, hidden: true, css: { 'text-align': 'left ! important' } },
                            { header: ["Status",{content:"textFilter"}], id: "ixStatus", width: 90, css: { 'text-align': 'left ! important' } },
                            { header: ["FnDate", { content: "textFilter" }], id: "ixFnDt", width: 90, css: { 'text-align': 'left ! important' } },
                           { header: ["Session", { content: "textFilter" }], id: "ixSession", width: 90, css: { 'text-align': 'left ! important' } },
                          { header: ["Venue", { content: "textFilter" }], id: "ixVenue", width: 90, css: { 'text-align': 'left ! important' } },
                            { header: ["FunctionNM", { content: "textFilter" }], id: "ixFnNm", width: 90, css: { 'text-align': 'left ! important' } },
                           { header: "GuarPax", id: "ixPax", width: 80, css: { 'text-align': 'right ! important' } },
                           {
                               header: "PlanRate", id: "ixPlan", width: 90, css: { 'text-align': 'right ! important' }, numberFormat: "111.00", hidden: true,
                           },
                           {
                               header: "Total", id: "ixTotal", width: 90, css: { 'text-align': 'right ! important' }, numberFormat: "111.00", 
                           },
                            {
                                header: "VenueRate", id: "ixVenueRate", width: 90, css: { 'text-align': 'right ! important' }, numberFormat: "111.00", hidden: true,
                            },
                           {
                               header: "Advance", id: "ixAdvance", width: 90, css: { 'text-align': 'right ! important' }, numberFormat: "111.00", hidden: true,
                           },
                            {
                                header: "F.P.NO", id: "ixFPNo", width: 80, css: { 'text-align': 'left ! important' }, hidden: true,  

                            },
                             { header: "Bill No", id: "IXBILLNO", width: 90, css: { 'text-align': 'left ! important' }, hidden: true, },
                            { header: "CreateBy", id: "IXRESBY", width: 90, css: { 'text-align': 'left ! important' }, },
                              { header: "Billing Instruction", id: "IXBILLINSTR", width: 90, css: { 'text-align': 'left ! important' }, hidden: true, },
                            { header: "Company", id: "", width: 90, css: { 'text-align': 'left ! important' }, hidden: true },
                       ],
                       data: [],
                   },
                ]
            }
        ]
    }
});

function ShowOptionsColums(newval, oldVal) {
    debugger;
    $$("reservListGrid").refresh();
    options = [];
    options = newval;//.split(',');

    $$("reservListGrid").hideColumn("ixAdvance");
    $$("reservListGrid").hideColumn("ixPlan");
    $$("reservListGrid").hideColumn("ixVenueRate");
    $$("reservListGrid").hideColumn("ixFPNo");
    $$("reservListGrid").hideColumn("IXBILLNO");
    $$("reservListGrid").hideColumn("ixMobile");
    $$("reservListGrid").hideColumn("ixEMail");
    $$("reservListGrid").hideColumn("ixBooker");
    $$("reservListGrid").hideColumn("IXBILLINSTR");

        for (i = 0; i < options.length; i++) {
            if (options[i] == "A1")
                $$("reservListGrid").showColumn("ixAdvance");
            if (options[i]== "A2")
                $$("reservListGrid").showColumn("ixPlan");
            if (options[i]== "A3")
                $$("reservListGrid").showColumn("ixVenueRate");
            if (options[i] == "A4")
                $$("reservListGrid").showColumn("ixFPNo");
            if (options[i] == "A5")
                $$("reservListGrid").showColumn("IXBILLNO");
            if (options[i] == "A6")
                $$("reservListGrid").showColumn("ixMobile");
            if (options[i] == "A7")
                $$("reservListGrid").showColumn("ixEMail");
            if (options[i] == "A8")
                $$("reservListGrid").showColumn("ixBooker");
            if (options[i] == "A9")
                $$("reservListGrid").showColumn("IXBILLINSTR");
        }
    
}

function fnGridPrint() {
    debugger;
    var vHeader = "Reservation List";
    var FullData = "";

    FullData = $$("reservListGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("reservListGrid"), {
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
    debugger;
    var vHeader = "Reservation List";
    var FullData = "";
    FullData = $$("reservListGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("reservListGrid"), {
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

function validateDate() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var etodt = $$("txtToDt").getText();
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
      if (efdate > etdate) {
            AlertMessage('From Date can not be greater than To date');
            return false;
        }
      return true;
    }

function display() {
    debugger;
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    if (!validateDate()) {
        return false;
    }
     var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_RESERVATIONLIST";
    dataparam["COMPID"] = $("#hdnCompId").val();
    fromDate = $$("txtFrmDate").getText();
    toDate = $$("txtToDt").getText();
    dataparam["fromDate"] = fromDate;
    dataparam["toDate"] = toDate;
    dataparam["ChkReservation"] = $$("ChkReservation").getValue();
    dataparam["ChkReserDateWise"] = $$("ChkReserDateWise").getValue();
    dataparam["ChkConfirmed"] = $$("ChkConfirmed").getValue();
    dataparam["ChkBlock"] = $$("ChkBlock").getValue();  
    dataparam["ChkFunDateWise"] = $$("ChkFunDateWise").getValue();
    dataparam["ChkTentative"] = $$("ChkTentative").getValue();
    dataparam["ChkCompleted"] = $$("ChkCompleted").getValue();

    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                debugger;
                var Detemp = (JSON.parse(d));
                if (Detemp != "") {
                    $$("reservListGrid").clearAll();
                    $$("reservListGrid").parse(Detemp);
                    $$("reservListGrid").refresh();
                }
                else {
                    $$("reservListGrid").clearAll();
                    AlertMessage("No Records Found");
                }
            }
            else {
                $$("reservListGrid").clearAll();
                AlertMessage("No Records Found");
            }
        }
    });
    $("#divTheme").removeClass("pagefalse");
    $("#pageload").hide();
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
    $$("frmReservationList").resize();
    $$("frmReservationList").adjust();
    $$("reservListGrid").resize();
    $$("reservListGrid").adjust();
}


