var app = angular.module('BQTApp', ['webix']);

app.controller("BQQueriesController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();

    var fnVenue = PrcLoadVenue();

    $scope.frmBanquetStatus = {

        id: "frmBanquetStatus",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 600,
        elements: [
            {
                paddingX: 30,
                rows: [
                   {
                       cols: [
                           {
                               width:200,
                               rows: [
                                   {
                                       id: "ChkRes",
                                       view: "checkbox",
                                       labelRight: "Reservation",
                                       labelAlign: "Right",
                                       labelWidth: 50,
                                       inputwidth: 40,
                                       Width: 100,
                                       value:"1",
                                       on: {
                                           "onChange": function (newval, oldVal) {
                                               if (newval == "1") {
                                                   $$("ChkBlock").setValue("0");
                                               }
                                               else
                                                   $$("ChkBlock").setValue("1");

                                               fnCallStatus();
                                           }
                                       }
                                   },
                                   {
                                        id: "ChkBlock",
                                        view: "checkbox",
                                        labelRight: "Block",
                                        labelAlign: "Right",
                                        labelWidth: 50,
                                        inputwidth: 40,
                                        Width: 100,
                                        on: {
                                            "onChange": function (newval, oldVal) {
                                                if (newval == "1")
                                                    $$("ChkRes").setValue("0");
                                                else
                                                    $$("ChkRes").setValue("1");
                                            }
                                        }
                                   },
                                   {
                                       view: "richselect",
                                       id: "ddlVenue",
                                       label: " Venue",
                                       labelAlign: "Left",
                                       labelWidth: 50,
                                       inputWidth: 200,
                                       width: 200,
                                       options: fnVenue,
                                       value:"ALL",
                                       on: {
                                           onChange: function (newval, oldval) {
                                           }
                                       }
                                   }
                               ]
                           },
                           {
                               width: 200,
                               rows: [
                                 {
                                     id: "ChkConf",
                                     view: "checkbox",
                                     labelRight: "Reservation",
                                     labelAlign: "Right",
                                     labelWidth: 50,
                                     inputwidth: 40,
                                     Width: 140,
                                     value:"1",
                                     on: {
                                         "onChange": function () {
                                         }
                                     }
                                 },
                                 {
                                     id: "ChkTent",
                                     view: "checkbox",
                                     labelRight: "Tentatve",
                                     labelAlign: "Right",
                                     labelWidth: 50,
                                     inputwidth: 40,
                                     value: "1",
                                     Width: 140,
                                     on: {
                                         "onChange": function () {
                                         }
                                     }
                                 },
                                  {
                                      id: "ChkCmp",
                                      view: "checkbox",
                                      labelRight: "Completed",
                                      labelAlign: "Right",
                                      labelWidth: 50,
                                      inputwidth: 40,
                                      Width: 140, value: "1",
                                      on: {
                                          "onChange": function () {
                                          }
                                      }
                                  }
                               ]
                           },
                           {
                               width:900,
                               rows: [
                                   {
                                       cols: [
                                           {
                                               view: "datepicker",
                                               id: "txtFrmDate",
                                               stringResult: true,
                                               label: "From",
                                               format: "%d/%m/%Y",
                                               value: $("#hdnCurrentDt").val(),
                                               inputWidth: 180,
                                               labelWidth: 50,
                                               width: 200,
                                           },
                                           {
                                               view: "datepicker",
                                               id: "txtToDt",
                                               stringResult: true,
                                               label: "To",
                                               format: "%d/%m/%Y",
                                               value: $("#hdnCurrentDt").val(),
                                               inputWidth: 140,
                                               labelWidth: 25,
                                               width: 160,
                                           },
                                           {
                                                view: "button",
                                                id: 'btnDisplay',
                                                label: "Display",
                                                width: 100,
                                                maxwidth:150,
                                                on: {
                                                    onItemClick: function () {
                                                        prcLoadBanquetStatus();
                                                    }
                                                }
                                            },
                                            //{
                                            //    id: "ChkCheckNo",
                                            //    view: "checkbox",
                                            //    labelRight: "Check No",
                                            //    labelWidth: 30,
                                            //    maxWidth:120,
                                            //    on: {
                                            //        "onChange": function () {
                                            //        }
                                            //    }
                                            //},
                                            {
                                               id: "ChkGrpon",
                                               view: "checkbox",
                                               labelRight: "Group on Function Wise",
                                               labelWidth: 1,
                                               minWidth: 170,
                                               on: {
                                                   "onChange": function () {
                                                   }
                                               }
                                            }
                                       ]
                                   },
                                   {
                                       cols: [
                                           {
                                               id: "lblSort",
                                               view: "label",
                                               label: "Sort :",
                                               maxWidth: 35,
                                               on: {
                                                   "onChange": function () {
                                                   }
                                               }
                                           },
                                           {
                                               id: "ChkNoWise",
                                               view: "checkbox",
                                               labelRight: "NO Wise",
                                               labelWidth: 15,
                                               maxWidth: 100,
                                               value:"1",
                                               on: {
                                                   "onChange": function () {
                                                   }
                                               }
                                           },
                                           {
                                               id: "ChkDtWise",
                                               view: "checkbox",
                                               labelRight: "Date Wise",
                                               labelWidth: 1,
                                               inputwidth: 40,
                                               Width: 40,
                                               on: {
                                                   "onChange": function () {
                                                   }
                                               }
                                           }

                                      ]
                                   }
                               ]
                           },
                       ]
                   },
                   {
                       paddingY: 10,
                       view: "datatable",
                       id: "grdBQStatus",
                       select: "row",
                       data: [],
                       height: 450,
                       scroll: true,
                       columns: [
                               { header: "Function Dt", id: "FunDt", width: 90, css: { 'text-align': 'left ! important' } },
                               { header: "Venue", id: "Venue", width: 100, css: { 'text-align': 'left ! important' } },
                               { header: "Session", id: "Session", width: 110, css: { 'text-align': 'left ! important' } },
                               { header: "Start Tm", id: "StartTm", width: 85, css: { 'text-align': 'left ! important' },hidden:true, },
                               { header: "End Tm", id: "EndTm", width: 85, css: { 'text-align': 'left ! important' }, hidden: true, },
                               { header: "Status", id: "Status", width: 110, css: { 'text-align': 'left ! important' } },
                               { header: "Res/Blk#", id: "BlkNo", width: 110, css: { 'text-align': 'left ! important' } },
                               { header: "Guest Ty", id: "GuestTy", width: 100, css: { 'text-align': 'left ! important' } },
                               { header: "Guest", id: "Guest", width: 200, css: { 'text-align': 'left ! important' } },
                               { header: "Function", id: "Fun", width: 150, css: { 'text-align': 'left ! important' } },
                               { header: "ExpPax", id: "EPax", width: 60, css: { 'text-align': 'center ! important' } },
                               { header: "GuarPax", id: "GPax", width: 70, css: { 'text-align': 'center ! important' } },
                               { header: "Plan Rate", id: "PlanRt", width: 90, css: { 'text-align': 'right ! important' } },
                               { header: "FB No", id: "FPNo", width: 70, css: { 'text-align': 'center ! important' } },
                              
                       ],
                       on: {
                           'onItemDblClick': function (id, e, node) {

                           }
                       }
                   }
                ]
            }
        ]
    }
});

function fnCallStatus() {

    if ($$("ChkRes").getValue() == "1") {

        $$("ChkConf").define("labelRight", "Reservation");
        $$("ChkConf").refresh();

        $$("ChkTent").define("labelRight", "Tentatve");
        $$("ChkTent").refresh();
    }
    else {
        $$("ChkConf").define("labelRight", "Maintenance Block");
        $$("ChkConf").refresh();

        $$("ChkTent").define("labelRight", "Wait List");
        $$("ChkTent").refresh();
    }
}

function PrcLoadVenue() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BNVENUE";
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
            }
        }
    });

    return rowData;
}


function prcLoadBanquetStatus() {

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_BANQUETSTATUS";
    dataparam["COMPID"] = $("#hdnCompId").val();

    dataparam["FrmDt"] = $$("txtFrmDate").getValue();
    dataparam["EndDt"] = $$("txtToDt").getValue();

    dataparam["Status"] = ($$("ChkRes").getValue()=="1"?"R":"B");
    dataparam["ChkConf"] = $$("ChkConf").getValue();
    dataparam["ChkTent"] = $$("ChkTent").getValue();
    dataparam["ChkCmp"] = $$("ChkCmp").getValue();
    dataparam["ddlVen"] = $$("ddlVenue").getValue();

    dataparam["ChkGrpFun"] = $$("ChkGrpon").getValue();
    dataparam["SortId"] = ($$("ChkNoWise").getValue() == "1" ? "1" : "2");

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/BQQueries/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                $$("grdBQStatus").clearAll();
                $$("grdBQStatus").parse(rowData);
                $$("grdBQStatus").refresh();
            }
        }
    });
    $("#LoadDIv").hide();
}
