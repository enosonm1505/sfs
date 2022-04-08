
var app = angular.module('BQTApp', ['webix']);

app.controller("BQQueriesController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();

    $scope.frmSessionVenueHeader = {

        id: "frmSessionVenueHeader",
        view: 'form',
        minWidth: 500,
        height:39,
        elements: [
            {
                rows: [
                  {
                      cols: [
                          {
                              width: 200,
                          },
                          {

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
                                      $$("txtFrmDate").setValue(webix.Date.add(new Date($$("txtFrmDate").getValue()), -1, 'month'));
                                      $("#hdnFromDt").val($$("txtFrmDate").getValue());

                                  }
                              }
                          },
                          {
                              view: "datepicker",
                              id: "txtFrmDate",
                              disable: true,
                              label: "",
                              stringResult: true,
                              //format: "%d/%m/%Y",
                              format: "%M-%Y",
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
                                      fnLoadSessionVenueUsage();
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
                                      $$("txtFrmDate").setValue(webix.Date.add(new Date($$("txtFrmDate").getValue()), 1, 'month'));
                                      $("#hdnFromDt").val($$("txtFrmDate").getValue());
                                      fnLoadSessionVenueUsage();
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

function fnLoadSessionVenueUsage() {
   // debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SESSIONVENUEUSAGE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Date"] = $("#hdnFromDt").val();
    $("#LoadDIv").show();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                $("#LoadDIv").show();

                if ($$("frmSessionVenueUsage"))
                    $$("frmSessionVenueUsage").destructor();

                fnSessionVenueUsageDesign();

                var ColVal = [];
                $$("grdSessionVenue").clearAll();
                $$("grdSessionVenue").config.columns = ColVal;
                $$("grdSessionVenue").refreshColumns();

                var str = [];
                // debugger;

                $.each(rowData.GridCol, function (key, value) {
                    //  debugger;

                    var Hdr = value.toString();
                    str = Hdr.split('_');

                    var HId = "";
                    if (str.length > 0) {
                        Hdr = str[0];
                        HId = str[1];
                    }
                    //  var Hdr = value.toString();
                    var vCss = "";
                    var vWidth = 100;

                    if (HId == "VenueNM") {
                        var set = {
                            id: $.trim(HId), width: 150, header: { text: Hdr },// cssFormat: Fontstyle,
                        };
                    }
                    else {
                        var set = {
                            id: $.trim(HId),
                            width: 32, header: { text: Hdr },// cssFormat: Fontstyle,
                        };
                    }
                    ColVal.push(set);
                });

                var set = {
                    id: "VenueId", hidden: true
                };
                ColVal.push(set);

                var set = {
                    id: "SessionId", hidden: true
                };
                ColVal.push(set);

                var set = {
                    id: "RowNO", hidden: true
                };
                ColVal.push(set);

                $$("grdSessionVenue").config.columns = ColVal;
                $$("grdSessionVenue").refreshColumns();
                $$("grdSessionVenue").parse(rowData.GridData);
                var vId = $$("grdSessionVenue").getFirstId();
                $$("grdSessionVenue").freezeRow(vId, true);
                $$("grdSessionVenue").refresh();

                $("#LoadDIv").hide();
            }
        }
    });

  
}

function fnSessionVenueUsageDesign() {

    debugger;
 
    webix.ui({
        container: "frmSessionVenueUsage",
        id: "frmSessionVenueUsage",
        view: 'form',
        minWidth: 900,
        //maxWidth: 1100,
        elements: [
            {
                rows: [
                 
                   {
                       view: "datatable",
                       id: "grdSessionVenue",
                       select: "row",
                       data: [],
                       height: 450,

                       autoconfig: true,
                       areaselect: true,
                       tooltip: true,
                       spans: true,
                       scroll: true,
                       rowHeight: 20,
                       
                       scheme: {
                           $change: function (item) {
                               debugger;
                               var rowid = item.id;
                               if (item.RowNO == "1") {
                                   item.$css = "VenueRow1";
                               }
                               else if (item.RowNO == "2") {
                                   item.$css = "DayNmRow";

                                   var obj = $$("grdSessionVenue").getItem(rowid);
                                   $.each(obj, function (k, v) {

                                       var vi = "";
                                       if (v != "" && v != null) {
                                           vi = v;
                                       }

                                       if (vi.length <= 5) {
                                           if (vi.includes("_W")) {

                                               $$("grdSessionVenue").addCellCss(rowid, k, "Weekend");
                                           }
                                       }
                                   });
                               }
                               else {
                                   var obj = $$("grdSessionVenue").getItem(rowid);
                                   $.each(obj, function (k, v) {

                                       if ((v == "C" || v == "c" || v == "T" || v == "t") && k != "VenueId" && k != "SessionId" && k != "VenueNm" && k != "RowNo") {

                                           if (v == "C" || v == "c")
                                               $$("grdSessionVenue").addSpan(rowid, k, 1, 1, "C", "ConfStatus");

                                           if (v == "T" || v == "t")
                                               $$("grdSessionVenue").addSpan(rowid, k, 1, 1, "T", "TentStatus");
                                       }
                                   });
                               }
                           }
                       },
                       columns: [
                       { id: "VenueId", header: "", hidden: true },
                       { id: "SessionId", header: "", hidden: true },
                       { id: "VenueNM", header: "Venue", width: 150, stringResult: true },
                       ],

                       on: {
                           'onAfterScroll': function () {
                               $$("grdSessionVenue").refresh();
                           },
                       }
                   }
                ]
            }
        ]
    });
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
