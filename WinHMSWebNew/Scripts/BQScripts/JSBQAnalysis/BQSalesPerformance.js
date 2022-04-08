
var app = angular.module('BQTApp', ['webix']);

app.controller("BQAnalysisController", function ($scope) {

    $("#LoadDIv").hide();
    $("#hdnpgLoad").val("1");
    fnAccountDt();
    var ddldrop = SalesOptddlLoad("M");
    var DynmCol_Nm;
    debugger;
    $scope.frmBQSalesPerformance = {
        id: "frmBQSalesPerformance",
        view: 'form',
        minWidth: 900,
        height: 550,
        elements: [
            {
               
                rows: [
                    {

                        css: "hgt",
                    cols: [{
                        rows:[{
                        
                            view: "button",
                            id: "CmpSrch",
                            type: 'icon',
                            css: "webix_primary",
                            icon: 'wxi-filter',
                               width: 40,
                            tooltip:"Option Selection",
                            on: {
                                                         
                                onItemClick: function () {
                                    debugger;
                                    loadSearchPopWindow();
                                }
                            }
                        }]
                        
                    },
                        {
                            view: "fieldset", label: "Group By", css: "webix_fieldset_label", body: {
                                        rows:[{
                                            cols:[{
                                                view: "radio",
                                                id: "rdbtnGRPBY",
                                                value: 1,
                                                inputWidth: 120,
                                                width: 120,
                                                css:".webix_Radio_btn",
                                                customRadio: false,
                                                options: [{ "id": 1, "value": "Reservation Wise" }, { "id": 2, "value": "Date Wise" }, { "id": 3, "value": "Summary" }],
                                                vertical: true,
                                            },              
                                            ]
                                        }]
                               
                                    },
                                },

                                {
                                    view: "fieldset", label: "Sort",css: "webix_fieldset_label2", body: {
                                        rows: [{
                                            cols: [{
                                                view: "radio",
                                                id: "rdbtnSORT",
                                                value: 4,
                                                css:"webix_Radio_btn",
                                                inputWidth: 60,
                                                width: 120,
                                                height:78,
                                                customRadio: false,
                                                minWidth: 80,
                                                options: [{ "id": 4, "value": "Fn Date" }, { "id": 5, "value": "Res No" }],
                                                vertical: true,
                                            },
                                            ]
                                        }]

                                    },
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
                                                     format: "%d/%m/%Y",
                                                     labelAlign: "Left",
                                                     labelWidth: 40,    
                                                     inputWidth: 160,
                                                     width: 160,
                                                     minWidth: 160,
                                                     value: $("#hdnCurrentDt").val(),
                                                 },
                                                  {
                                                      view: "datepicker",
                                                      id: "txtToDt",
                                                      disable: true,
                                                      stringResult: true,
                                                      label: "To",
                                                      format: "%d/%m/%Y",
                                                      labelAlign: "Left",
                                                      labelWidth: 30,
                                                      inputWidth: 160,
                                                      width: 160,
                                                      minWidth: 160,
                                                      value: $("#hdnCurrentDt").val(),
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
                                                      tooltip:"Options",

                                                      on: {
                                                         
                                                          onItemClick: function () {
                                                              debugger;
                                                              loadOptionPopWindow();
                                                          }
                                                      }
                                                  },
                                                  {
                                                      labelWidth: 100, inputWidth: 50,
                                                      width: 1250, minWidth: 450,
                                                  },
                                        ]
                                    
                                    },
                                     {
                                         view: "richselect",
                                         id: "ddlsalesopt",
                                         label: " Market Segment",
                                         labelAlign: "Left",
                                         labelWidth: 120,
                                         inputWidth: 300,
                                         width: 300,
                                         //placeholder:"<---All--->",
                                         options:ddldrop,
                                         on: {
                                             onChange: function (newval, oldval) {
                                             }
                                         }
                                     },
                                ]
                            },                        
                            ]
                            },
                   {

                       id: "salesPerformanceGrid",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       spans: true,
                       height: 430,
                       minWidth: 900,
                       position: "flex",
                       css: "webix_header_border wingrd_hight hgt",
                       data: [],
                       scheme: {                        
                           $change: function (item) {
                               var Columns = $$('salesPerformanceGrid').config.columns;
                               var ColCnt = Columns.length;
                               if (item.ixDt == "Grand Total" || item.BusTy == "GroupByNm" || item.ixDt != " Total ") {
                                   item.$css = "GroupGrTot";
                               }
                               if (item.ixDt != "Grand Total" || item.ixDt != "Total ") {
                                   item.ixDt.$css = "GroupGrTot";
                               }
                               if (item.ixDt == "Total" || item.ixDt == "Ses Total") {
                                   item.$css = "GroupTot";
                               }
                               if (item.BusTy == "GroupByNm")
                                   $$("salesPerformanceGrid").addSpan(item.id, "ixDt", 3, 1, null, "GroupByNm");
                               item.ixDt.$css = "GroupGrTot";   
                               $$("salesPerformanceGrid").refresh();   
                           }
                       },
                       columns: [
                           { header: "Date", id: "ixDt", width: 90, css: { 'text-align': 'left ! important' } },
                           { header: "Res/blk#", id: "ixRsvNo", width: 65, css: { 'text-align': 'left ! important' } },
                            { header: "Guest Name/Company", id: "ixGst", width: 120, css: { 'text-align': 'left ! important' } },
                            { header: "Pax", id: "ixCover", width: 80, css: { 'text-align': 'right ! important' } },
                       ],
                       data: [],
                   },
                ]
            }
        ]
    }

});

function loadOptionPopWindow() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptOptionsNewsrch",
        head: "Options Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,       
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "scrollview", scroll: "y", height: 250, width: 250, body: {
                        padding: { top: 0, left: 30, bottom: 20, right: 10 },
                        rows: [

                            {
                                view: "radio",
                                id: "rdbtnOptions",
                                inputWidth: 120,
                                width: 120,
                                height: 78,
                                customRadio: false,
                                options: [{ "id": "M", "value": "MarketSegment" }, { "id": "BT", "value": "Bussiness Type" }, { "id": "SP", "value": "Sales Person", hidden: $("#hdnH2Ind").val() == "1" ? true : false }, { "id": "F", "value": "Function" },
                                    { "id": "B", "value": "Booker", hidden: $("#hdnJ2Ind").val() == "1" ? true : false }, { "id": "C", "value": "Channel", hidden: $("#hdnI2Ind").val() == "1" ? true : false }, { "id": "V", "value": "Venue" }, { "id": "VS", "value": "Venue/Session" },
                                { "id": "CMP", "value": "Company" }, { "id": "G", "value": "Group Company" }, { "id": "S", "value": "Session" }, { "id": "VR", "value": "Venue Revenue per sq.ft", hidden: $("#hdnX2Ind").val()=="1"?true:false }],
                                vertical: true,
                                value: $("#hdnOptsId").val() == "" ? "M" : $("#hdnOptsId").val(),
                            },
                        ]
                    }
                },
               
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Ok',
                                             type: "icon",
                                             icon: "wxi-check",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     debugger;
                                                     $$('RptOptionsNewsrch').hide();
                                                     var optid = $.trim($$("rdbtnOptions").getValue());
                                                     $("#hdnpgLoad").val("2");
                                                     $("#hdnOptsId").val("");
                                                     $("#hdnOptsId").val(optid);

                                                     if ($("#hdnOptsId").val() == "M") {
                                                         $$("ddlsalesopt").define("label", "Market Segment");
                                                         $$("ddlsalesopt").refresh();
                                                         SalesOptddlLoad(optid);
                                                         $("#LayoutText").text("Banquet Sales Performance- Market Segment Wise");
                                                         DynmCol_Nm = "Market Segment";
                                                     }
                                                     else if ($("#hdnOptsId").val() == "BT") {
                                                         $$("ddlsalesopt").setValue();
                                                         $("#LayoutText").text("Banquet Sales Performance - Bussiness Type Wise");
                                                        $$("ddlsalesopt").define("label", "Bussiness Type");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Bussiness Type";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "SP") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Sales Person Wise");
                                                        $$("ddlsalesopt").define("label", "Sales Person");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Sales Person";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "F") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Function Wise");
                                                        $$("ddlsalesopt").define("label", "Function");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Function";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "B") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Booker Wise");
                                                        $$("ddlsalesopt").define("label", "Booker");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Booker";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "C") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Channel Wise");
                                                        $$("ddlsalesopt").define("label", "Channel");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                    }
                                                     else if ($("#hdnOptsId").val() == "V") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Venue Wise");
                                                        $$("ddlsalesopt").define("label", "Venue");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Venue";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "VS") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Venue/Session Wise");
                                                        $$("ddlsalesopt").define("label", "Venue/Session");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Venue";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "CMP") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Company Wise");
                                                        $$("ddlsalesopt").define("label", "Company");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Company";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "G") {
                                                         $("#LayoutText").text("Banquet Sales Performance -Group Company Wise");
                                                        $$("ddlsalesopt").define("label", "Group Company");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Company";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "S") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Session Wise");
                                                        $$("ddlsalesopt").define("label", "Session");
                                                        $$("ddlsalesopt").refresh();
                                                        SalesOptddlLoad(optid);
                                                        DynmCol_Nm = "Session";
                                                    }
                                                     else if ($("#hdnOptsId").val() == "VR") {
                                                         $("#LayoutText").text("Banquet Sales Performance - Venue Revenue per sq.ft Wise");
                                                        $$("ddlsalesopt").define("label", "Venue Revenue per sq.ft");
                                                        $$("ddlsalesopt").refresh();
                                                      SalesOptddlLoad(optid);                                                     
                                                        DynmCol_Nm = "Venue";
                                                     }
                                                     if ($("#hdnOptsId").val() == "G" || $("#hdnOptsId").val() == "CMP")
                                                         $$("ddlsalesopt").hide();
                                                     else $$("ddlsalesopt").show();
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
    $$("RptOptionsNewsrch").show();
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
                            { header: "Gs_ty", id: "GS_TY", hidden:true },
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
                                                 onItemClick: function () 
                                                 {
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
                                                         $$("txtVenue").setValue(VenNm);
                                                         $("#hdnGS_Id").val(Ven_Id);
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
    $$("grdVenueSrch").refresh();
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
                $("#hdnJ2Ind").val(rowData[0]["J2_Ind"]);
                $("#hdnH2Ind").val(rowData[0]["H2_Ind"]);
                $("#hdnI2Ind").val(rowData[0]["I2_Ind"]);
                $("#hdnX2Ind").val(rowData[0]["X2_Ind"]);
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
                    rowData.splice(0, 0, { value: "<---ALL--->", id: " " });
                    $$("ddlsalesopt").define("options", rowData);
                    $$("ddlsalesopt").setValue(" ");
                    $$("ddlsalesopt").refresh();
                }
            }
        }
    });

    return rowData;
}

function loadSearchPopWindow() {
    $("#hdnGS_Id").val("");
    $("#hdnGS_TY").val("");
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "cmpNewsrch",
        head: "Options Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 400,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "scrollview", scroll: "y", height: 250, width: 250, body: {
                        padding: { top: 20, left: 30, bottom: 20, right: 10 },
                        rows: [{
                            cols: [{
                                view: "checkbox", id: "chkCompany", labelWidth: 70, inputWidth: 100, value:1,
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
                                    // disabled:true,

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
                                                   }

                                               }
                                           }
                                       },
                                           {
                                               view: "text",
                                               id: "txtIndividual",
                                               readonly:true,
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
                                           width: 100, label: "Venue", labelAlign: "Left", customCheckbox: false,
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

                                               }
                                           }
                                       },
                                           {
                                               view: "text",
                                               id: "txtVenue",
                                               readonly: true,
                                               inputWidth: 180,
                                               width: 180,

                                           },
                                            {
                                                view: "button",
                                                id: "VenueSrch",
                                                type: 'icon',
                                                inputWidth: 40,
                                                icon: 'wxi-search',
                                                width: 40,
                                                disabled: true,

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
                    }
                },

                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 400,
                             paddingX: 280,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Ok',
                                             type: "icon",
                                             icon: "wxi-check",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$("cmpNewsrch").hide();
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
    $$("cmpNewsrch").show();
}

function fnGridPrint() {
    debugger;
    var vHeader = $("#LayoutText").val();
    var FullData = "";

    FullData = $$("salesPerformanceGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("salesPerformanceGrid"), {
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
    FullData = $$("salesPerformanceGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("salesPerformanceGrid"), {
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
    $("#LoadDIv").show();
    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SALESPERFORMANCE";
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
    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                debugger;
                var rowData = JSON.parse(d);
                var ColVal = [];
                $$("salesPerformanceGrid").clearAll();
                $$("salesPerformanceGrid").config.columns = ColVal;
                $$("salesPerformanceGrid").refreshColumns();
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
                                    id: "ixDt", width: 250, header: { text: DynmCol_Nm   }, css: { 'text-align': 'left ! important' },
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
                                id: "ixRsvNo", width: 100, header: { text: Hdr ,}, css: { 'text-align': 'left ! important' },
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
                    $$("salesPerformanceGrid").clearAll();
                    AlertMessage("No Records Found");
                }
                if (rowData.GridData != "" && rowData.GridData.length>0) {
                    $$("salesPerformanceGrid").config.columns = ColVal;
                    $$("salesPerformanceGrid").refreshColumns();
                    $$("salesPerformanceGrid").parse(rowData.GridData);
                    if ($$("rdbtnGRPBY").getValue() == "2" || $$("rdbtnGRPBY").getValue() == "3") {
                        
                        $$("salesPerformanceGrid").hideColumn("ixRsvNo");
                        $$("salesPerformanceGrid").hideColumn("ixGst");
                        $$("salesPerformanceGrid").hideColumn("ixCover");
                    }
                    if ($$("rdbtnGRPBY").getValue() == "3") {
                        debugger;
                        var grdsales = $$("salesPerformanceGrid").serialize();
                        
                            for (i = 0; i < grdsales.length; i++) {
                                if ($.trim(grdsales[i].ixDt) != "Grand Total" && $.trim(grdsales[i].BusTy) != "GroupByNm" && $.trim(grdsales[i].BusTy) != "SecGroup" && $.trim(grdsales[i].ixDt) != "Total" && $.trim(grdsales[i].ixDt) != "Ses Total") {
                                $$("salesPerformanceGrid").editStop();
                                $$("salesPerformanceGrid").remove(grdsales[i].id);
                                $$("salesPerformanceGrid").refresh();
                                }
                                else if ((grdsales[i].ixDt) == "Total" || $.trim(grdsales[i].BusTy) == "GroupByNm" ) {
                                    if ($$("rdbtnOptions").getValue() != "VS" && $$("rdbtnOptions").getValue() != "VR" && $$("rdbtnOptions").getValue() != "G"){
                                        $$("salesPerformanceGrid").editStop();
                                    if ($.trim(grdsales[i].BusTy) == "GroupByNm") {
                                        var vDtValue = grdsales[i].ixDt;
                                        $$("salesPerformanceGrid").remove(grdsales[i].id);
                                    }
                                    if ($.trim(grdsales[i].ixDt) == "Total") {
                                        $$("salesPerformanceGrid").updateItem(grdsales[i].id, { ixDt: vDtValue });
                                        $$("salesPerformanceGrid").refresh();
                                    }
                                }
                                }
                                else if ($.trim(grdsales[i].ixDt) == "Ses Total" || (grdsales[i].ixDt) == "Total " || $.trim(grdsales[i].BusTy) == "SecGroup") {
                                    $$("salesPerformanceGrid").editStop();
                                    if ($.trim(grdsales[i].BusTy) == "SecGroup") {
                                        var vDtValue = grdsales[i].ixDt;
                                        $$("salesPerformanceGrid").remove(grdsales[i].id);
                                    }
                                    if ($.trim(grdsales[i].ixDt) == "Ses Total" || (grdsales[i].ixDt) == "Total ") {
                                        $$("salesPerformanceGrid").updateItem(grdsales[i].id, { ixDt: vDtValue });
                                        $$("salesPerformanceGrid").refresh();
                                    }

                                }

                        }                    
                    }                 
                    $("#LoadDIv").hide();
                }
                else {
                    $$("salesPerformanceGrid").clearAll();
                    AlertMessage("No Records Found");
                }
                }
            
            else {
                $$("salesPerformanceGrid").clearAll();
                AlertMessage("No Records Found");
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
    $$("frmBQSalesPerformance").resize();
    $$("frmBQSalesPerformance").adjust();
    $$("salesPerformanceGrid").resize();
    $$("salesPerformanceGrid").adjust();
}