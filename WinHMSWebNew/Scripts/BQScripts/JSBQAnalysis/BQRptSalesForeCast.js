
var app = angular.module('BQTApp', ['webix']);

app.controller("BQAnalysisController", function ($scope) {

    $("#LoadDIv").hide();
    $("#hdnpgLoad").val("1");
    fnAccountDt();
    fnLoadDATE();
    fnLoadBNControl();
    fnLoadMstCompany();
    var ddldrop = [];
    ddldrop = SalesOptddlLoad("M");
    var DynmCol_Nm;
    debugger;
    $scope.BQRptSalesForeCast = {
        id: "BQRptSalesForeCast",
        view: 'form',
        minWidth: 900,
        height: 550,
        elements: [
            {

                rows: [
                    {
                        cols: [{
                            rows: [

                             {
                                 view: "richselect",
                                 id: "ddlsalesopt",
                                 label: " Market Segment",
                                 labelAlign: "Left",
                                 labelWidth: 140,
                                 inputWidth: 310,
                                 width: 360,
                                 placeholder: "ALL",
                                 options: ddldrop,
                                 on: {
                                     onChange: function (newval, oldval) {
                                     }
                                 }
                             },
                             

                            ]

                        },
                        {
                            id:"emtyspc",
                            width: 320,
                            hidden: true,
                        },
                            

                                {
                                    rows: [
                                        {
                                            cols: [

                                                        {
                                                            view: "datepicker",
                                                            id: "txtFrmDate",
                                                            stringResult: true,
                                                            label: "From",
                                                            format: $("#hdnDateFrmt").val() == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                                            labelAlign: "Left",
                                                            labelWidth: 40,
                                                            inputWidth: 160,
                                                            width: 160,
                                                            minWidth: 160,
                                                            value: $("#hdnCurrentDt").val(),  
                                                            on: {
                                                                onChange: function (newval, oldval) {
                                                                    DateChk();
                                                                }
                                                            }
                                                        },
                                                      {
                                                          view: "datepicker",
                                                          id: "txtToDt",
                                                          disable: true,
                                                          stringResult: true,
                                                          label: "To",
                                                          format: $("#hdnDateFrmt").val() == "1" ? "%d/%m/%Y" : "%m/%d/%Y",
                                                          labelAlign: "Left",
                                                          labelWidth: 30,
                                                          inputWidth: 160,
                                                          width: 160,
                                                          minWidth: 160,
                                                          value: $("#hdnTODt").val(),
                                                      },
                                                      {
                                                          view: "button",
                                                          id: 'btnDisplay',
                                                          label: "Display", labelAlign: "left",
                                                          labelWidth: 0,
                                                          inputWidth: 100,
                                                          width: 100,
                                                          minWidth: 100,
                                                          on: {
                                                              onItemClick: function () {
                                                                  display();
                                                              }
                                                          }
                                                      },

                                                      {
                                                          view: "button",
                                                          id: "optionsSrch",
                                                          type: 'icon',
                                                          css: "webix_primary ",
                                                          inputWidth: 40,
                                                          icon: 'wxi-filter',
                                                          width: 40,
                                                          tooltip: "Advanced Options",

                                                          on: {

                                                              onItemClick: function () {
                                                                  debugger;
                                                                  $$("AdvFilter").show();
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
                    //{},
                   {

                       id: "salesForecastGrid",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       resizeColumn: true,
                       resizeRow: true,
                       spans: true,
                       height: 450,
                       minWidth: 900,
                       position: "flex",
                       //css: "webix_header_border wingrd_hight hgt",
                       data: [],
                       scheme: {
                           $change: function (item) {
                               var Columns = $$('salesForecastGrid').config.columns;
                               var ColCnt = Columns.length;
                               if (item.ixDt == "Total" || item.ixDt == "Ses Total" ||item.ixDt == "Grand Total") {
                                   item.$css = "GroupTot";
                               }
                               if (item.BusTy == "GroupByNm"){
                                   $$("salesForecastGrid").addSpan(item.id, "ixDt", 3, 1, null, "GroupGrTot");
                                   $$("salesForecastGrid").refresh(item.id);
                                   }
                               $$("salesForecastGrid").refresh();
                           }
                       },
                       columns: [
                           { header: "Date", id: "ixDt", width: 120, css: { 'text-align': 'left ! important' } },
                           { header: "Res/blk#", id: "ixRsvNo", width: 120, css: { 'text-align': 'left ! important' } },
                            { header: "Guest Name/Company", id: "ixGst", width: 180, css: { 'text-align': 'left ! important' } },
                            { header: "Pax", id: "ixCover", width: 120, css: { 'text-align': 'right ! important' } },
                       ],
                       data: [],
                   },
                ]
            }
        ]
    }
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "AdvFilter",
        head: "Advance Filter",
        position: "center",
        width: 600,
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
                            width: 345,
                            rows: [

                                    { view: "template", template: "Options", css: " SecHeader", height: 25, width: 250 },
                                    {
                                        padding: { top: 0, left: 10, bottom: 0, right: 10 },
                                        rows: [
                                               {
                                                   view: "radio",
                                                   id: "rdbtnOptions",
                                                   inputWidth: 140,
                                                   width: 140,
                                                   height: 78,
                                                   customRadio: false,
                                                   options: [{ "id": "M", "value": "MarketSegment" }, { "id": "BT", "value": "Bussiness Source" }, { "id": "SP", "value": "Sales Person", hidden: $("#hdnH2Ind").val() == "1" ? false : true }, { "id": "F", "value": "Function" },
                                                       { "id": "B", "value": "Booker", hidden: $("#hdnJ2Ind").val() == "1" ? false : true }, { "id": "C", "value": "Channel", hidden: $("#hdnI2Ind").val() == "1" ? false : true }, { "id": "V", "value": "Venue" }, { "id": "S", "value": "Session" }, { "id": "VS", "value": "Venue/Session" },
                                                   { "id": "CMP", "value": "Company" }, { "id": "G", "value": "Group Company" }, { "id": "VR", "value": "Venue Revenue per sq.ft", hidden: $("#hdnX2Ind").val() == "1" ? false : true }],
                                                   vertical: true,
                                                   value: $("#hdnOptsId").val() == "" ? "M" : $("#hdnOptsId").val(),
                                                   on: {
                                                       "onChange": function (newval, oldVal) {
                                                           if (newval == "V"||newval=="VR"||newval=="VS") {
                                                               $$("chkVenue").show();
                                                               $$("txtVenue").show();
                                                               $$("VenueSrch").show();
                                                           }
                                                           else{
                                                               $$("chkVenue").hide();
                                                               $$("txtVenue").hide();
                                                               $$("VenueSrch").hide();
                                                               $("#hdnVEN_ID").val(""); $$("txtVenue").setValue("");
                                                           }

                                                       }
                                                   }
                                               },

                                               { view: "template", template: "Search", css: " SecHeader", height: 25, width: 250 },
                                               {
                                                  
                                                   cols: [{
                                                       view: "checkbox", id: "chkCompany", labelWidth: 70, inputWidth: 100, value: 1,
                                                       width: 100, label: "Company", labelAlign: "Left", customCheckbox: false,
                                                       on: {
                                                           "onChange": function (newval, oldVal) {
                                                               if (newval == "1") {
                                                                   $$("chkIndividual").setValue("0");
                                                                   $$("chkVenue").setValue("0");
                                                                   $$("btncmpsearch").enable();
                                                                   $$("VenueSrch").disable();
                                                                   $$("IndividualSrch").disable();
                                                                   $$("txtVenue").setValue("");
                                                                   $$("txtIndividual").setValue("");
                                                                   $("#hdnVEN_ID").val("");
                                                               }
                                                               if (newval == "0") {
                                                                   $("#hdnGS_Id").val("");
                                                                   $("#hdnGS_TY").val("");
                                                                   $("#hdnVEN_ID").val("");
                                                                   $$("txtcmpany").setValue("");
                                                               }

                                                           }
                                                       }
                                                   },
                                                       {
                                                           view: "text",
                                                           id: "txtcmpany",
                                                           inputWidth: 180,
                                                           width: 180,
                                                           readonly: true,
                                                       },
                                                        {
                                                            view: "button",
                                                            id: "btncmpsearch",
                                                            type: 'icon',
                                                            inputWidth: 40,
                                                            icon: 'wxi-search',
                                                            width: 40,

                                                            on: {

                                                                onItemClick: function () {
                                                                    debugger;
                                                                    fnCmpySrchPopup();
                                                                }
                                                            }
                                                        },
                                                   ]
                                               },
                                               


                                                {
                                                    cols: [{
                                                        view: "checkbox", id: "chkIndividual", labelWidth: 70, inputWidth: 100,
                                                        width: 100, label: "Individual", labelAlign: "Left", customCheckbox: false,
                                                        on: {
                                                            "onChange": function (newval, oldVal) {
                                                                if (newval == "1") {
                                                                    $$("chkCompany").setValue("0");
                                                                    $$("chkVenue").setValue("0");
                                                                    $$("IndividualSrch").enable();
                                                                    $$("VenueSrch").disable();
                                                                    $$("btncmpsearch").disable();
                                                                    $$("txtVenue").setValue("");
                                                                    $$("txtcmpany").setValue("");
                                                                    $("#hdnVEN_ID").val("");
                                                                }
                                                                if (newval == "0") {
                                                                    $("#hdnGS_Id").val("");
                                                                    $("#hdnGS_TY").val("");
                                                                    $("#hdnVEN_ID").val("");
                                                                    $$("txtIndividual").setValue("");
                                                                }

                                                            }
                                                        }
                                                    },
                                                        {
                                                            view: "text",
                                                            id: "txtIndividual",
                                                            readonly: true,
                                                            inputWidth: 180,
                                                            width: 180,

                                                        },
                                                         {
                                                             view: "button",
                                                             id: "IndividualSrch",
                                                             type: 'icon',
                                                             inputWidth: 40,
                                                             icon: 'wxi-search',
                                                             width: 40,
                                                             disabled: true,

                                                             on: {

                                                                 onItemClick: function () {
                                                                     debugger;
                                                                     fnGuestPopup();
                                                                 }
                                                             }
                                                         },
                                                    ]
                                                },




                                   {
                                       cols: [{
                                           view: "checkbox", id: "chkVenue", labelWidth: 70, inputWidth: 100,
                                           width: 100, label: "Venue", labelAlign: "Left", customCheckbox: false, hidden:true,
                                           on: {
                                               "onChange": function (newval, oldVal) {
                                                   if (newval == "1") {
                                                       $$("chkCompany").setValue("0");
                                                       $$("chkIndividual").setValue("0");
                                                       $$("VenueSrch").enable();
                                                       $$("IndividualSrch").disable();
                                                       $$("btncmpsearch").disable();
                                                       $$("txtcmpany").setValue(""); $$("txtIndividual").setValue("");
                                                   }
                                                   if (newval == "0") {
                                                       $("#hdnGS_Id").val("");
                                                       $("#hdnGS_TY").val("");
                                                       $("#hdnVEN_ID").val("");
                                                       $$("txtVenue").setValue("");
                                                   }

                                               }
                                           }
                                       },
                                           {
                                               view: "text",
                                               id: "txtVenue",
                                               readonly: true,
                                               inputWidth: 180,
                                               width: 180,
                                               hidden: true,

                                           },
                                            {
                                                view: "button",
                                                id: "VenueSrch",
                                                type: 'icon',
                                                inputWidth: 40,
                                                icon: 'wxi-search',
                                                width: 40,
                                                disabled: true,
                                                hidden: true,
                                                on: {

                                                    onItemClick: function () {
                                                        debugger;
                                                        fnVenuePopup();
                                                    }
                                                }
                                            },
                                       ]
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

                                            { view: "template", template: "Filter", css: " SecHeader", height: 25, width: 257 },

                                            {
                                                padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                     {
                                                         cols: [{
                                                             id: "chktentative",
                                                             view: "checkbox",
                                                             label: "Tentative",
                                                             labelAlign: "left",
                                                             value: "1",
                                                             labelWidth: 64,
                                                             width: 100,
                                                             on: {
                                                                 "onChange": function (newval, oldVal) {
                                                                     if (newval == "1") {                                                                        
                                                                        
                                                                     }
                                                                     if (newval == "0") {
                                                                         $$("chkConfirmed").setValue("1");
                                                                     }

                                                                 }
                                                             }

                                                         },

                                                         ]
                                                     },
                                                     {

                                                         rows: [{
                                                             id: "chkConfirmed",
                                                             view: "checkbox",
                                                             label: "Confirmed",
                                                             labelAlign: "left",
                                                             value: "1",
                                                             labelWidth: 64,
                                                             width: 100,
                                                             on: {
                                                                 "onChange": function (newval, oldVal) {
                                                                     if (newval == "1") {
                                                                         //$$("chkConfirmed").setValue("0");
                                                                     }
                                                                     if (newval == "0") {
                                                                         $$("chktentative").setValue("1");
                                                                     }

                                                                 }
                                                             }
                                                         }]


                                                     },

                                                ]
                                            },
                                    ]
                                },

                                {
                                    view: "layout",
                                    css: "LayBorder",
                                    rows: [

                                            { view: "template", template: "Group By", css: " SecHeader", height: 25, width: 257 },

                                            {
                                                padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                     {
                                                         view: "radio",
                                                         id: "rdbtnGRPBY",
                                                         value: 1,
                                                         inputWidth: 120,
                                                         width: 105,
                                                       //  css: ".webix_Radio_btn",
                                                         customRadio: false,
                                                         options: [{ "id": 1, "value": "Reservation Wise" }, { "id": 2, "value": "Date Wise" }, { "id": 3, "value": "Summary" }],
                                                         vertical: true,
                                                     },
                                                
                                                ]
                                            },


                                    ]
                                },
                                {
                                    view: "layout",
                                    css: "LayBorder",

                                    rows: [

                                            { view: "template", template: "Sort On", css: " SecHeader", height: 25, width: 250 },
                                            {
                                                padding: { top: 10, left: 10, bottom: 20, right: 10 },
                                                rows: [
                                                   {
                                                       view: "radio",
                                                       id: "rdbtnSORT",
                                                       value: 4,
                                                      // css: "webix_Radio_btn",
                                                       inputWidth: 60,
                                                       width: 80,
                                                       height: 78,
                                                       customRadio: false,
                                                       minWidth: 80,
                                                       options: [{ "id": 4, "value": "Fn Date" }, { "id": 5, "value": "Res No" }],                          
                                                       vertical: true,
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
                           cols: [{}, { view: "button", type: "icon", id: "OkFilter", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { fnOptOkBtnClick(); } }],
                       }
                    ]

                },

            ]
        }
    });

    //End

});


function fnLoadMstCompany() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnDateFrmt").val(rowData[0]["DEF_DT_FORMAT"]);
            }
        }
    });
    return rowData;
}

function fnOptOkBtnClick() {
    $$('AdvFilter').hide(); $$("emtyspc").hide();
    //$$('RptOptionsNewsrch').hide();
    var optid = $.trim($$("rdbtnOptions").getValue());
    $("#hdnpgLoad").val("2");
    $("#hdnOptsId").val("");
    $("#hdnOptsId").val(optid);


    if ($("#hdnOptsId").val() == "M") {
        $$("ddlsalesopt").define("label", "Market Segment");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        $("#LayoutText").text("Sales Forecast - Market Segment Wise");
        DynmCol_Nm = "Market Segment";
    }
    else if ($("#hdnOptsId").val() == "BT") {
        $$("ddlsalesopt").setValue();
        $("#LayoutText").text("Sales Forecast - Bussiness Source Wise");
        $$("ddlsalesopt").define("label", "Bussiness Source");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Bussiness Source";
    }
    else if ($("#hdnOptsId").val() == "SP") {
        $("#LayoutText").text("Sales Forecast - Sales Person Wise");
        $$("ddlsalesopt").define("label", "Sales Person");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Sales Person";
    }
    else if ($("#hdnOptsId").val() == "F") {
        $("#LayoutText").text("Sales Forecast - Function Wise");
        $$("ddlsalesopt").define("label", "Function");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Function";
    }
    else if ($("#hdnOptsId").val() == "B") {
        $("#LayoutText").text("Sales Forecast - Booker Wise");
        $$("ddlsalesopt").define("label", "Booker");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Booker";
    }
    else if ($("#hdnOptsId").val() == "C") {
        $("#LayoutText").text("Sales Forecast - Channel Wise");
        $$("ddlsalesopt").define("label", "Channel");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Channel";
    }
    else if ($("#hdnOptsId").val() == "V") {
        $("#LayoutText").text("Sales Forecast - Venue Wise");
        $$("ddlsalesopt").define("label", "Venue");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Venue";
    }
    else if ($("#hdnOptsId").val() == "VS") {
        $("#LayoutText").text("Sales Forecast - Venue/Session Wise");
        $$("ddlsalesopt").define("label", "Venue/Session");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Venue/Session";
        
    }
    else if ($("#hdnOptsId").val() == "CMP") {
        $("#LayoutText").text("Sales Forecast - Company Wise");
        $$("ddlsalesopt").define("label", "Company");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Company";
        $$("emtyspc").show();
    }
    else if ($("#hdnOptsId").val() == "G") {
        $("#LayoutText").text("Sales Forecast -Group Company Wise");
        $$("ddlsalesopt").define("label", "Group Company");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Company"; $$("emtyspc").show();
    }
    else if ($("#hdnOptsId").val() == "S") {
        $("#LayoutText").text("Sales Forecast - Session Wise");
        $$("ddlsalesopt").define("label", "Session");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Session";
    }
    else if ($("#hdnOptsId").val() == "VR") {
        $("#LayoutText").text("Sales Forecast - Venue Revenue per sq.ft Wise");
        $$("ddlsalesopt").define("label", "Venue Revenue per sq.ft");
        $$("ddlsalesopt").refresh();
        SalesOptddlLoad(optid);
        DynmCol_Nm = "Venue";
    }
    if ($("#hdnOptsId").val() == "G" || $("#hdnOptsId").val() == "CMP")
        $$("ddlsalesopt").hide();
    else $$("ddlsalesopt").show();

}

function fnCmpySrchPopup() {

    var Dataset = fnLoadMstParty();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOptCmpSrch",
        head: "Company Search",
        position: "center",
        minWidth: 500,
        maxWidth: 500,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 530,
            maxWidth: 530,
            elements: [
                {
                    view: "datatable",
                    id: "grdcmpySrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "PARTYID", id: "PARTY_ID", hidden: true },
                            { header: "PARTYTY_ID", id: "PARTY_TY_ID", hidden: true },
                            { header: ["Guest Name", { content: "textFilter" }, ], id: "PARTY_NM", width: 180, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: "Address", id: "ADDRS_1", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.PARTY_ID) == $.trim(selectedRows[0].PARTY_ID);
                            });
                            if (Filter1.length > 0) {
                                $("#hdnGS_Id").val("");
                                $("#hdnGS_TY").val("");
                                $$("txtcmpany").setValue($.trim(Filter1[0].PARTY_NM));
                                $("#hdnGS_Id").val($.trim(Filter1[0].PARTY_ID));
                                $("#hdnGS_TY").val($.trim(Filter1[0].PARTY_TY_ID));
                            }

                            $$('PopupOptCmpSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 380,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupOptCmpSrch').hide();
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

    $$("PopupOptCmpSrch").show();

    $$("grdcmpySrch").clearAll();
    $$("grdcmpySrch").parse(Dataset);
    $$("grdcmpySrch").refresh();
}

function fnLoadMstParty() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MSTPARTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnGuestPopup() {

    var Dataset = fnLoadFoGuest();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOptGuestSrch",
        head: "Guest Search",
        position: "center",
        minWidth: 500,
        maxWidth: 500,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 530,
            maxWidth: 530,
            elements: [
                {
                    view: "datatable",
                    id: "grdGuestSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Gs_ID", id: "GS_ID", hidden: true },
                            { header: "Gs_ty", id: "GS_TY", hidden: true },
                            { header: ["Guest Name", { content: "textFilter" }, ], id: "GS_NM", width: 180, StringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: "Address", id: "ADD1", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.GS_ID) == $.trim(selectedRows[0].GS_ID);
                            });
                            if (Filter1.length > 0) {
                                $("#hdnGS_Id").val("");
                                $("#hdnGS_TY").val("");
                                $$("txtIndividual").setValue($.trim(Filter1[0].GS_NM));
                                $("#hdnGS_Id").val($.trim(Filter1[0].GS_ID));
                                $("#hdnGS_TY").val($.trim(Filter1[0].GS_TY));
                            }

                            $$('PopupOptGuestSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 380,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupOptGuestSrch').hide();
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

    $$("PopupOptGuestSrch").show();

    $$("grdGuestSrch").clearAll();
    $$("grdGuestSrch").parse(Dataset);
    $$("grdGuestSrch").refresh();
}

function fnLoadFoGuest() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_GUESTPROFOPEN";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnVenuePopup() {

    var Dataset = fnLoadVenueOpt();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOptVenSrch",
        head: "Venue Search",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 450,
            elements: [
                {
                    view: "datatable",
                    id: "grdVenueSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Venueid", id: "VENUE_ID", hidden: true },
                            { header: ["Venue", { content: "textFilter" }, ], id: "VENUE_NM", width: 250, StringResult: true, css: { 'text-align': 'left ! important' } },
                           { header: ["Select All", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "ChkAccsel", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 230,
                             paddingX: 250,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'OK',
                                             type: "icon",
                                             icon: "wxi-check",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     debugger;
                                                     var Ven_Id = "";
                                                     var VenNm = "";
                                                     var vAdd = false;

                                                     $$("grdVenueSrch").data.each(function (obj) {

                                                         if (obj.ChkAccsel == "1") {
                                                             if (VenNm != "") {
                                                                 VenNm = VenNm + "," + $.trim(obj.VENUE_NM)
                                                             }
                                                             else {
                                                                 VenNm = $.trim(obj.VENUE_NM)
                                                             }

                                                             if (Ven_Id != "") {
                                                                 Ven_Id = Ven_Id + "," + $.trim(obj.VENUE_ID)
                                                             }
                                                             else {
                                                                 Ven_Id = $.trim(obj.VENUE_ID)
                                                             }
                                                             vAdd = true;
                                                         }
                                                     });

                                                     if (Ven_Id != "") {
                                                         $("#hdnGS_Id").val("");
                                                         $("#hdnGS_TY").val("");
                                                         $("#hdnVEN_ID").val("");
                                                         $$("txtVenue").setValue(VenNm);
                                                         $("#hdnVEN_ID").val(Ven_Id);
                                                     }
                                                     if (vAdd == true)
                                                         $$('PopupOptVenSrch').hide();
                                                     else
                                                         webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                                                 },

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

    $$("PopupOptVenSrch").show();

    $$("grdVenueSrch").clearAll();
    $$("grdVenueSrch").parse(Dataset);
    var VenuID = $("#hdnVEN_ID").val();


    var data = $$("grdVenueSrch").serialize();
    var lenval = data.length;
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if (VenuID != "") {
                if (VenuID.includes($.trim(data[i].VENUE_ID)) == true)
                    data[i].ChkAccsel = "1";
                else
                    data[i].ChkAccsel = "0";

            }
        }
    }
               
    $$("grdVenueSrch").refresh();
    //$("#RmBuildid").val("");
}

function fnLoadVenueOpt() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNVENUE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["LoadTy"] = "01";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnLoadBNControl() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnJ2Ind").val(rowData[0].J2_IND);
                $("#hdnH2Ind").val(rowData[0].H2_IND);
                $("#hdnI2Ind").val(rowData[0].I2_IND);
                $("#hdnX2Ind").val(rowData[0].X2_IND);
            }
        }
    });
    return rowData;
}

function fnLoadDATE() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SALFORECAST_DATEFN";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnTODt").val(rowData[0]["todate"]);
            }
        }
    });
    return rowData;
}

function SalesOptddlLoad(optid) {
    debugger;

    var OptId = optid;
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SALESOPTDDLLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["OptId"] = OptId;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if ($("#hdnpgLoad").val() == "2") {
                    rowData.splice(0, 0, { value: "ALL", id: " " });
                    $$("ddlsalesopt").define("options", rowData);
                    $$("ddlsalesopt").setValue(" ");
                    $$("ddlsalesopt").refresh();
                }
                else
                    rowData.splice(0, 0, { value: "ALL", id: " " });
            }
        }
    });

    return rowData;
}



function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").text();
    var FullData = "";

    FullData = $$("salesForecastGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("salesForecastGrid"), {
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
    var vHeader = $("#LayoutText").text();
    var FullData = "";
    FullData = $$("salesForecastGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("salesForecastGrid"), {
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
    var etodt = $$("txtToDt").getText();
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

function display() {
    debugger;
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    if (!validateDate()) {
        return false;
    }
    $("#LoadDIv").show();
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SALESFORECAST";
    dataparam["COMPID"] = $("#hdnCompId").val();  
    fromDate = $$("txtFrmDate").getText();
    toDate = $$("txtToDt").getText();
    dataparam["fromDate"] = fromDate;
    dataparam["toDate"] = toDate;
    dataparam["rdbtnGRPBY"] = $$("rdbtnGRPBY").getValue();
    dataparam["rdbtnSORT"] = $$("rdbtnSORT").getValue();
    dataparam["ddlsalesopt"] = $$("ddlsalesopt").getValue();
    if ($("#hdnpgLoad").val() == "1") dataparam["rdbtnOptions"] = "M"
    else dataparam["rdbtnOptions"] = $$("rdbtnOptions").getValue();
    dataparam["HdnGsID"] = $("#hdnGS_Id").val();
    dataparam["HdnGsTy"] = $("#hdnGS_TY").val();  
    dataparam["hdnVEN_ID"] = $("#hdnVEN_ID").val(); 
    dataparam["DateFrmt"] = $("#hdnDateFrmt").val();  
    dataparam["chktentative"] = $$("chktentative").getValue();
    dataparam["chkConfirmed"] = $$("chkConfirmed").getValue();
    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                debugger;
                var rowData = JSON.parse(d);
                var ColVal = [];
                $$("salesForecastGrid").clearAll();
                $$("salesForecastGrid").config.columns = ColVal;
                $$("salesForecastGrid").refreshColumns();
                var str = [];
                var GridCol = [];
                GridCol = rowData.GridCol;
                if (GridCol.length > 0) {
                    $.each(rowData.GridCol, function (key, value) {
                        var Hdr = value.toString();
                        str = Hdr.split('_');
                        var HId = "";
                        if (str.length > 0) {
                            Hdr = str[0];
                            HId = str[1];
                        }
                        var vCss = "";
                        var vWidth = 100;
                        if (HId == "ixDt") {
                            if ($$("rdbtnGRPBY").getValue() == "3") {
                                var set = {
                                    id: "ixDt", width: 250, header: { text: DynmCol_Nm }, css: { 'text-align': 'left ! important' },
                                };
                            }
                            else {
                                var set = {
                                    id: "ixDt", width: 150, header: { text: Hdr }, css: { 'text-align': 'left ! important' },
                                };
                            }

                        }
                        else if (HId == "ixRsvNo") {
                            var set = {
                                id: "ixRsvNo", width: 100, header: { text: Hdr, }, css: { 'text-align': 'left ! important' },
                            };

                        }
                        else if (HId == "ixGst") {
                            var set = {
                                id: "ixGst", width: 200, header: { text: Hdr }, css: { 'text-align': 'left ! important' },
                            };

                        }
                        else if (HId == "ixCover") {
                            var set = {
                                id: $.trim(HId), width: 100, footer: "Total:", header: { text: Hdr }, css: { 'text-align': 'right ! important' },
                            };

                        }
                        else {
                            var set = {
                                id: $.trim(HId), width: 100, footer: { content: 'summColumn' }, format: webix.i18n.numberFormat, header: { text: Hdr }, css: { 'text-align': 'right ! important' },
                            };
                        }
                        ColVal.push(set);
                    });
                }
                else {
                    $$("salesForecastGrid").clearAll();
                    AlertMessage("No Records Found");
                }
                if (rowData.GridData != "" && rowData.GridData.length > 0) {
                    $$("salesForecastGrid").config.columns = ColVal;
                    $$("salesForecastGrid").refreshColumns();
                    $$("salesForecastGrid").parse(rowData.GridData);
                    if ($$("rdbtnGRPBY").getValue() == "2" || $$("rdbtnGRPBY").getValue() == "3") {

                        $$("salesForecastGrid").hideColumn("ixRsvNo");
                        $$("salesForecastGrid").hideColumn("ixGst");
                        $$("salesForecastGrid").hideColumn("ixCover");
                    }
                    if ($$("rdbtnGRPBY").getValue() == "3") {
                        debugger;
                        var grdsales = $$("salesForecastGrid").serialize();

                        for (i = 0; i < grdsales.length; i++) {
                            if ($.trim(grdsales[i].ixDt) != "Grand Total" && $.trim(grdsales[i].BusTy) != "GroupByNm" && $.trim(grdsales[i].BusTy) != "SecGroup" && $.trim(grdsales[i].ixDt) != "Total" && $.trim(grdsales[i].ixDt) != "Ses Total") {
                                $$("salesForecastGrid").editStop();
                                $$("salesForecastGrid").remove(grdsales[i].id);
                                $$("salesForecastGrid").refresh();
                            }
                            else if ((grdsales[i].ixDt) == "Total" || $.trim(grdsales[i].BusTy) == "GroupByNm") {
                                if ($$("rdbtnOptions").getValue() != "VS" && $$("rdbtnOptions").getValue() != "VR" && $$("rdbtnOptions").getValue() != "G") {
                                    $$("salesForecastGrid").editStop();
                                    if ($.trim(grdsales[i].BusTy) == "GroupByNm") {
                                        var vDtValue = grdsales[i].ixDt;
                                        $$("salesForecastGrid").remove(grdsales[i].id);
                                    }
                                    if ($.trim(grdsales[i].ixDt) == "Total") {
                                        $$("salesForecastGrid").updateItem(grdsales[i].id, { ixDt: vDtValue });
                                        $$("salesForecastGrid").refresh();
                                    }
                                }
                            }
                            else if ($.trim(grdsales[i].ixDt) == "Ses Total" || (grdsales[i].ixDt) == "Total " || $.trim(grdsales[i].BusTy) == "SecGroup") {
                                $$("salesForecastGrid").editStop();
                                if ($.trim(grdsales[i].BusTy) == "SecGroup") {
                                    var vDtValue = grdsales[i].ixDt;
                                    $$("salesForecastGrid").remove(grdsales[i].id);
                                }
                                if ($.trim(grdsales[i].ixDt) == "Ses Total" || (grdsales[i].ixDt) == "Total ") {
                                    $$("salesForecastGrid").updateItem(grdsales[i].id, { ixDt: vDtValue });
                                    $$("salesForecastGrid").refresh();
                                }

                            }

                        }
                    }
                    $("#LoadDIv").hide();
                }
                else {
                    $$("salesForecastGrid").clearAll();
                    AlertMessage("No Records Found");
                }
            }

            else {
                $$("salesForecastGrid").clearAll();
                AlertMessage("No Records Found");
                $("#LoadDIv").hide();
            }
        }
    });
    $("#divTheme").removeClass("pagefalse");
    $("#pageload").hide();
    $("#LoadDIv").hide();
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
    $$("BQRptSalesForeCast").resize();
    $$("BQRptSalesForeCast").adjust();
    $$("salesForecastGrid").resize();
    $$("salesForecastGrid").adjust();
}