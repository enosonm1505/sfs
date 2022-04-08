
var app = angular.module('BQTApp', ['webix']);

app.controller("BQQueriesController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();

    $scope.frmVenueHeader = {

        id: "frmVenueHeader",
        view: 'form',
        minWidth: 740,
        maxWidth: 740,
        height:39,
        elements: [
            {
                rows: [
                  {
                      cols: [
                          {
                              width: 400,
                          },
                          {
                              view: "label",
                              id: "lbldayNM",
                              stringResult: true,
                              label:  $("#hdnDayNm").val(),
                              labelWidth: 60,
                              labelAlign: "Right",
                              width: 60,
                          },
                          {
                              view: "button",
                              id: 'btnPrev',
                              minWidth: 250,
                              label: "< Prev",
                              width: 60,
                              on: {
                                  onItemClick: function () {
                                      $$("txtFrmDate").setValue(webix.Date.add(new Date($$("txtFrmDate").getValue()), -1, 'day'));
                                      $("#hdnFromDt").val($$("txtFrmDate").getValue());
                                      fnLoadVenueBook();
                                  }
                              }
                          },
                          {
                              view: "datepicker",
                              id: "txtFrmDate",
                              disable: true,
                              label: "",
                              stringResult: true,
                              format: "%d/%m/%Y",
                              value: $("#hdnCurrentDt").val(),
                              labelAlign: "Right",
                              inputWidth: 120,
                              labelWidth: 1,
                              width: 120,
                              icons: false,
                              body: {
                                  minDate: new Date(),
                                  maxDate: new Date()
                              },
                              on: {
                                  'onChange': function (newv, oldv) {
                                      $("#hdnFromDt").val($$("txtFrmDate").getValue());
                                      fnLoadVenueBook();
                                  }
                              }
                          },
                          {
                              view: "button",
                              id: 'btnNext',
                              minWidth: 250,
                              label: "Next>",
                              width: 60,
                              on: {
                                  onItemClick: function () {
                                      $$("txtFrmDate").setValue(webix.Date.add(new Date($$("txtFrmDate").getValue()), 1, 'day'));
                                      $("#hdnFromDt").val($$("txtFrmDate").getValue());
                                      fnLoadVenueBook();
                                  }
                              }
                          },
                          
                      ]
                  },
                ]
            }
        ]
    }
});

function fnLoadVenueBook() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_VENUEBOOKING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Date"] = $("#hdnFromDt").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                if ($$("lbldayNM")) {
                    $$("lbldayNM").define("label", rowData.STRDAY);
                    $$("lbldayNM").refresh();
                }

                $("#LoadDIv").show();

                if ($$("frmVenueBook"))
                    $$("frmVenueBook").destructor();

                fnVenBookDesign();

                $$("grdvenueBook").clearAll();
                $$("grdvenueBook").parse(rowData.TBLCREATE);
                $$("grdvenueBook").refresh();

                $("#LoadDIv").hide();
            }
        }
    });

    fnLoadBlockDet();
}

function fnVenBookDesign() {

    debugger;
    var ColCont = fnDisplayCol();

    webix.ui({
        container: "frmVenueBook",
        id: "frmVenueBook",
        view: 'form',
        minWidth: 1335,
        maxWidth: 1335,
        elements: [
            {
                rows: [
                   {
                       view: "datatable",
                       id: "grdvenueBook",
                    
                       select: "row",
                       data: [],
                       height: 500,
                       width: 1110,
                       //autoconfig: true,
                       autoconfig: true,
                       areaselect: true,
                       tooltip: true,
                       spans: true,
                       scroll: "y",
                       rowHeight: 20,
                       scheme: {
                           $change: function (item) {
                               if (item.RowNO == "1") {
                                   item.$css = "VenueRow1";
                               }
                               //else if (item.RowNO == "2") {
                               //    item.$css = "VenueRow2";
                               //}
                               //else if (item.RowNO == "3") {
                               //    item.$css = "VenueRow3";
                               //}
                               //else if (item.RowNO == "4") {
                               //    item.$css = "VenueRow4";
                               //}
                               //if (item.VenueNM != "") {
                               //    item.$css = "FirstRow";
                               //}
                           }
                       },
                       columns: [
                       { id: "VenueId", header: "", hidden: true },
                       { id: "VenueNM", header: "Venue", width: 120, stringResult: true, css: "VenueStyle" },

                       { id: "Col01", header: [{ text: "06", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'left ! important' } },
                       { id: "Col02", header: "02", width: 26, css: { 'text-align': 'Left ! important' }, tooltip: true, },
                       { id: "Col03", header: [{ text: "07", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col04", header: "04", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col05", header: [{ text: "08", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col06", header: "06", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col07", header: [{ text: "09", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col08", header: "08", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col09", header: [{ text: "10", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col10", header: "10", width: 26, css: { 'text-align': 'Left ! important' } },
                       {
                           id: "Col11", header: [{ text: "11", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' },
                           //tooltip: "<span class='name_column_tip'>My name is #Col11# .</span>"
                       },
                       { id: "Col12", header: "12", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col13", header: [{ text: "12", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col14", header: "14", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col15", header: [{ text: "13", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col16", header: "16", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col17", header: [{ text: "14", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col18", header: "18", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col19", header: [{ text: "15", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' }, tooltip: true, },
                       { id: "Col20", header: "20", width: 26, css: { 'text-align': 'Left ! important' } },

                       { id: "Col21", header: [{ text: "16", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col22", header: "22", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col23", header: [{ text: "17", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col24", header: "24", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col25", header: [{ text: "18", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col26", header: "26", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col27", header: [{ text: "19", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col28", header: "28", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col29", header: [{ text: "20", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col30", header: "30", width: 26, css: { 'text-align': 'Left ! important' } },

                       { id: "Col31", header: [{ text: "21", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col32", header: "32", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col33", header: [{ text: "22", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col34", header: "34", width: 26, css: { 'text-align': 'Left ! important' } },
                       { id: "Col35", header: [{ text: "23", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } },
                       { id: "Col36", header: "36", width: 26, css: { 'text-align': 'Left ! important' } },

                       { id: "Col37", header: [{ text: "00", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2 || ColCont == 1 || ColCont == 0) ? false : true), },
                       { id: "Col38", header: "38", width: 26, css: { 'text-align': 'Left ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2 || ColCont == 1 || ColCont == 0) ? false : true), },

                       { id: "Col39", header: [{ text: "01", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2 || ColCont == 1) ? false : true), },
                       { id: "Col40", header: "40", width: 26, css: { 'text-align': 'Left ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2 || ColCont == 1) ? false : true), },

                       { id: "Col41", header: [{ text: "02", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2) ? false : true), },
                       { id: "Col42", header: "42", width: 26, css: { 'text-align': 'Left ! important' }, hidden: ((ColCont == 4 || ColCont == 3 || ColCont == 2 ) ? false : true), },

                       { id: "Col43", header: [{ text: "03", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } , hidden: ((ColCont == 4 || ColCont == 3 ) ? false : true), },
                       { id: "Col44", header: "44", width: 26, css: { 'text-align': 'Left ! important' } , hidden: ((ColCont == 4 || ColCont == 3 ) ? false : true), },

                       { id: "Col45", header: [{ text: "04", colspan: 2, css: "hrowHead3" }], width: 26, css: { 'text-align': 'Center ! important' } , hidden: ((ColCont == 4  ) ? false : true), },
                       { id: "Col46", header: "46", width: 26, css: { 'text-align': 'Left ! important' }, hidden: ((ColCont == 4) ? false : true), },

                       ],

                       on: {
                           'onItemClick': function (id) {
                           },
                           'onAfterScroll': function () {
                               var pos = this.getScrollState();
                               $$("grdvenueBook").refresh();
                           },

                           'onAfterBlockSelect': function (start, end) {
                               var curGrid = $$("grdvenueBook").serialize();

                               var VenId = "";

                               var StartTm = fnGetTime(start.column, end.column, "S");

                               var EndTm = fnGetTime(start.column, end.column, "E");

                               if (curGrid.length) {

                                   var RowIndex = $$("grdvenueBook").getIndexById(start.row);

                                   VenId = curGrid[RowIndex].VenueId;
                               }
                           },
                           'onItemDblClick': function (id) {
                           }
                       }
                   }
                ]
            }
        ]
    });
}

function fnGetTime(ColNm,end,Ind) {

    var RetTm="";

    var CurColNm = $.trim(Ind == "S" ? ColNm : end);

    if (CurColNm == "Col01") {

        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "06:00" : "06:30");
        else
            RetTm = "06:00";
    }
    else if (CurColNm == "Col02") {
        RetTm = (Ind == "E" ? "07:00" : "06:30");
    }
    else if (CurColNm == "Col03") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "07:00" : "07:30");
        else
            RetTm = "07:00";
    }
    else if (CurColNm == "Col04") {
        RetTm = (Ind == "E" ? "08:00" : "07:30");
    }
    else if (CurColNm == "Col05") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "08:00" : "08:30");
        else
            RetTm = "08:00";
    }
    else if (CurColNm == "Col06") {
        RetTm = (Ind == "E" ? "09:00" : "08:30");
    }
    else if (CurColNm == "Col07") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "09:00" : "09:30");
        else
            RetTm = "09:00";
    }
    else if (CurColNm == "Col08") {
        RetTm = (Ind == "E" ? "10:00" : "09:30");
    }
    else if (CurColNm == "Col09") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "10:00" : "10:30");
        else
            RetTm = "10:00";
    }
    else if (CurColNm == "Col10") {
        RetTm = (Ind == "E" ? "11:00" : "10:30");
    }
    else if (CurColNm == "Col11") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "11:00" : "11:30");
        else
            RetTm = "11:00";
    }
    else if (CurColNm == "Col12") {
        RetTm = (Ind == "E" ? "12:00" : "11:30");
    }
    else if (CurColNm == "Col13") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "12:00" : "12:30");
        else
            RetTm = "12:00";
    }
    else if (CurColNm == "Col14") {
        RetTm = (Ind == "E" ? "13:00" : "12:30")
    }
    else if (CurColNm == "Col15") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "13:00" : "13:30")
        else
            RetTm = "13:00";
    }
    else if (CurColNm == "Col16") {
        RetTm = (Ind == "E" ? "14:00" : "13:30")
    }
    else if (CurColNm == "Col17") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "14:00" : "14:30")
        else
            RetTm = "14:00";
    }
    else if (CurColNm == "Col18")
    {
        RetTm = (Ind == "E" ? "15:00" : "14:30")
    }
    else if (CurColNm == "Col19") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "15:00" : "15:30")
        else
            RetTm = "15:00";
    }
    else if (CurColNm == "Col20") {
        RetTm = (Ind == "E" ? "16:00" : "15:30")
    }
    else if (CurColNm == "Col21") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "16:00" : "16:30")
        else
            RetTm = "16:00";
    }
    else if (CurColNm == "Col22") {
        RetTm = (Ind == "E" ? "17:00" : "16:30")
    }
    else if (CurColNm == "Col23") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "17:00" : "17:30")
        else
            RetTm = "17:00";
    }
    else if (CurColNm == "Col24") {
        RetTm = (Ind == "E" ? "18:00" : "17:30")
    }
    else if (CurColNm == "Col25") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "18:00" : "18:30")
        else
            RetTm = "18:00";
    }
    else if (CurColNm == "Col26") {
        RetTm = (Ind == "E" ? "19:00" : "18:30")
    }
    else if (CurColNm == "Col27") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "19:00" : "19:30")
        else
            RetTm = "19:00";
    }
    else if (CurColNm == "Col28") {
        RetTm = (Ind == "E" ? "20:00" : "19:30")
    }
    else if (CurColNm == "Col29") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "20:00" : "20:30")
        else
            RetTm = "20:00";
    }
    else if (CurColNm == "Col30") {
        RetTm = (Ind == "E" ? "21:00" : "20:30")
    }
    else if (CurColNm == "Col31") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "21:00" : "21:30")
        else
            RetTm = "21:00";
    }
    else if (CurColNm == "Col32") {
        RetTm = (Ind == "E" ? "22:00" : "21:30")
    }
    else if (CurColNm == "Col33") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "22:00" : "22:30")
        else
            RetTm = "22:00";
    }
    else if (CurColNm == "Col34") {
        RetTm = (Ind == "E" ? "23:00" : "22:30")
    }
    else if (CurColNm == "Col35") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "23:00" : "23:30")
        else
            RetTm = "23:00";
    }
    else if (CurColNm == "Col36") {
        RetTm = (Ind == "E" ? "00:00" : "23:30")
    }
    else if (CurColNm == "Col37") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "00:00" : "00:30")
        else
            RetTm = "00:00";
    }
    else if (CurColNm == "Col38") {
        RetTm = (Ind == "E" ? "01:00" : "00:30")
    }
    else if (CurColNm == "Col39") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "01:00" : "01:30")
        else
            RetTm = "01:00";
    }
    else if (CurColNm == "Col40")
    {
        RetTm = (Ind == "E" ? "02:00" : "01:30")
    }
    else if (CurColNm == "Col41") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "02:00" : "02:30")
        else
            RetTm = "02:00";
    }
    else if (CurColNm == "Col42") {
        RetTm = (Ind == "E" ? "03:00" : "02:30")
    }
    else if (CurColNm == "Col43") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "03:00" : "03:30")
        else
            RetTm = "03:00";
    }
    else if (CurColNm == "Col44") {
        RetTm = (Ind == "E" ? "04:00" : "03:30")
    }
    else if (CurColNm == "Col45") {
        if (CurColNm == $.trim(end))
            RetTm = (Ind == "S" ? "04:00" : "04:30")
        else
            RetTm = "04:00";
    }
    else if (CurColNm == "Col46") {
        RetTm = (Ind == "E" ? "05:00" : "04:30")
    }

    return RetTm;
}

function fnLoadBlockDet() {

    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_VENUEBOOKDET";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Date"] = $("#hdnFromDt").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {

                var GuestDet = JSON.parse(d);

                var dsgrd = $$("grdvenueBook").serialize();

                if (dsgrd.length != 0 ) {

                    for (i = 0; i < dsgrd.length; i++) {

                        if (GuestDet.length > 0) {

                            for (j = 0; j < GuestDet.length; j++) {

                                var DispRNo = GuestDet[j].DispRNo;

                                if (i == DispRNo) {

                                    var rowid = $$("grdvenueBook").getIdByIndex(i);

                                    var vDispText = GuestDet[j].DispTxt;

                                    var vBlkResvNo = GuestDet[j].BlckResNo;

                                    var BlockTy = GuestDet[j].BlockTy;

                                    var FrmCol = GuestDet[j].FromCol;

                                    var ToColCount = GuestDet[j].ToCntCol;

                                    var NextERow = GuestDet[j].NextERow;

                                    if ($.trim(BlockTy) == "R" || $.trim(BlockTy) == "2" || $.trim(BlockTy) == "FP") {

                                        vDispText = GuestDet[j].Caption1 + " </br>" + GuestDet[j].Caption2 + " " + GuestDet[j].Caption3
                                                    + "  </br>" + GuestDet[j].Caption4 + "  </br>" + GuestDet[j].Caption5 + " " + GuestDet[j].Caption6
                                                    + "  </br>" + GuestDet[j].Caption7 + "  " + GuestDet[j].Caption8;

                                        if ($.trim(BlockTy) == "2") {

                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "Tent");

                                            if (NextERow == 3) {
                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "Tent");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Tent");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "Tent");
                                            }
                                            else if (NextERow == 2) {

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "Tent");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Tent");
                                            }
                                        }
                                        else if ($.trim(BlockTy) == "R") {

                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "Conf");

                                            if (NextERow == 3) {
                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "Conf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Conf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "Conf");
                                            }
                                            else if (NextERow == 2) {

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "Conf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Conf");
                                            }
                                        }
                                        else  if ($.trim(BlockTy) == "FP") {
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "FbConf");

                                            if (NextERow == 3) {
                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "FbConf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "FbConf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "FbConf1");
                                            }
                                            else if (NextERow == 2) {

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption2, "FbConf");

                                                var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                                $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "FbConf1");
                                            }
                                        }
                                    }
                                    else if ($.trim(BlockTy) == "8") {

                                        vDispText = GuestDet[j].Caption1;

                                        $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "Comb");

                                        if (NextERow == 3) {
                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, "", "Comb");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, "", "Comb");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, "", "Comb4");
                                        }
                                    }
                                    else if ($.trim(BlockTy) == "1") {

                                        vDispText = GuestDet[j].Caption1;

                                        if ($.trim(vDispText) == "")
                                            vDispText = GuestDet[j].Caption2;

                                        $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "MBlock");

                                        if(NextERow==3)
                                        {
                                            var rowid = $$("grdvenueBook").getIdByIndex(i+1);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "MBlock");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "MBlock");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption5, "MBlock4");
                                        }
                                        else if (NextERow == 2) {
                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "MBlock");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "MBlock4");
                                        }
                                    }
                                    else if ($.trim(BlockTy) == "3") {

                                        vDispText = GuestDet[j].Caption1;

                                        if ($.trim(vDispText) == "")
                                            vDispText = GuestDet[j].Caption2;

                                        $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, vDispText, "Wait");

                                        if (NextERow == 3) {
                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Wait");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "Wait");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 3);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption5, "Wait");
                                        }
                                        else if (NextERow == 3) {
                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 1);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption3, "Wait");

                                            var rowid = $$("grdvenueBook").getIdByIndex(i + 2);
                                            $$("grdvenueBook").addSpan(rowid, FrmCol, parseInt(ToColCount), 1, GuestDet[j].Caption4, "Wait");
                                        }
                                    }

                                    $$("grdvenueBook").refresh();
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}


function fnLoadBlockDet1() {

    var dsgrd = $$("grdvenueBook").serialize();

    var TorRCnt = dsgrd.length / 4;

    if (TorRCnt != 0) {

        for (i = 1; i <= TorRCnt; i++) {

            var g = (i * 4) - 1;
            debugger;
            var VenueNM = dsgrd[(i * 4)].VenueNM;

            var rowid = $$("grdvenueBook").getIdByIndex(g);

            $$("grdvenueBook").addSpan(rowid, VenueNM, 4, 1, "Balaji", "Conf");
            $$("grdvenueBook").refresh();
        }
    }
}


function fnDisplayCol() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_VENBOOKSHOWTIME";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}





function fnAccountDt() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
                $("#hdnFromDt").val(rowData[0].CURDT);
                $("#hdnDayNm").val(rowData[0].DAYNM);
            }
        },
    });
}
