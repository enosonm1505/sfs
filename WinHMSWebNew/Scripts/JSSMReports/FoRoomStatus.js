var app = angular.module('SMTApp', ['webix']);

app.controller("SMReportsController", function ($scope) {

    $("#LoadDIv").hide();
    fnFoControl();

    $scope.frmRoomPosition = {

        id: "frmRoomPosition",
        view: 'form',
        minWidth: 1100,
        maxWidth: 1100,
        height: 39,
        elements: [
            {
                rows: [
                  {
                      cols: [
                          {
                              width: 250,
                          }, {
                               
                              id: "chkTentative",
                                   view: "checkbox",
                                   label: "Exclude Tentative",
                                   labelAlign: "left",
                                   labelWidth: 120,
                                   width: 200,
                                   on: {
                                       "onChange": function () {
                                       }
                                   }
                          },
                          {
                              view: "datepicker",
                              id: "txtArrDt",
                              label: "Arrival DT",
                              stringResult: true,
                              format: "%d/%m/%Y",
                              labelAlign: "left",
                              inputWidth: 190,
                              labelWidth:70,
                              width: 220,
                              value: $("#ArrDt").val(),
                              on: {
                                  'onChange': function (newv, oldv) {

                                      $("#EventInd").val("1");
                                      var Date1=new Date($$("txtArrDt").getValue());

                                      var Date2 = new Date($("#SysDt").val());

                                      if (Date1 <= Date2) {
                                          $$("txtArrDt").setValue($("#SysDt").val());

                                          $$("txtDeptDt").setValue(webix.Date.add(new Date($("#SysDt").val()), 24, 'day'));
                                      }
                                      else {
                                          $$("txtDeptDt").setValue(webix.Date.add(new Date($$("txtArrDt").getValue()), 24, 'day'));
                                      }

                                      $("#ArrDt").val($$("txtArrDt").getValue());
                                      $("#DeptDt").val($$("txtDeptDt").getValue());

                                      gridOrgListLoad();
                                  }
                              }
                          },
                          {
                               view: "datepicker",
                               id: "txtDeptDt",
                               label: "To",
                               stringResult: true,
                               format: "%d/%m/%Y",
                               labelAlign: "left",
                               inputWidth: 160,
                               labelWidth: 30,
                               width: 180,
                               value: $("#DeptDt").val(),
                               on: {
                                   'onChange': function (newv, oldv) {

                                       if ($("#EventInd").val() != "1") {
                                           var Date1 = new Date($$("txtArrDt").getValue());

                                           var Date2 = new Date($$("txtDeptDt").getValue());

                                           if (Date1 >= Date2)
                                               $$("txtDeptDt").setValue($$("txtArrDt").getValue());

                                           $("#DeptDt").val($$("txtDeptDt").getValue());

                                           gridOrgListLoad();
                                       }
                                   }
                               }
                          },
                          {
                              view: "button",
                              id: 'btnDisp',
                              minWidth: 250,
                              label: " Display",
                              width: 100,
                              on: {
                                  onItemClick: function () {
                                      gridOrgListLoad();
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

function gridOrgListLoad() {

    $("#LoadDIv").show();
    var dataparam = {};

    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_SMROOMPOSITION";
    dataparam["FRMDT"] =$("#ArrDt").val();
    dataparam["TODT"] = $("#DeptDt").val();
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CPROPID"] = $("#hdnPropId").val();
    var DataVal = JSON.stringify(dataparam);

    //var chkTentative = "";
    //if ($("#chkTentative")[0].checked == true)
    //    chkTentative = "Y";
    //else
    //    chkTentative = "N";

    $.ajax({
        type: "POST",
        async: true,
        url: "/SMReports/APIWCF_CALL",
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                
                var rowDatad = JSON.parse(data);

                if (rowDatad.ErrorMsg != "") {
                    $("#LoadDIv").hide();
                    alert(rowDatad.ErrorMsg);
                    return;
                }

                if (data == "NOROOMTYPES") {
                    $("#LoadDIv").hide();
                }
               
                if ($$("grdRoomPosdiv") != undefined) {
                    $$("grdRoomPosdiv").destructor();
                }

                GridDesign();
                var ColVal = [];

                $.each(rowDatad.GridCol, function (key, value) {
                    if (value == "Title") {
                        var set = {
                            id: $.trim(value), header: { text: "", height: 30, css: "Emptybg" }, css: { 'text-align': 'left !important' }, width: 130,
                            cssFormat: SetCondition,
                        };
                    }
                    else {
                        var Settext = value.substring(1, value.length);

                        if (~value.indexOf("~R")) {
                            var set = {
                                id: $.trim(value), header: { text: Settext.substring(0, Settext.length - 2), height: 30, css: "HolyDaybg" }, css: { 'text-align': 'center !important' }, width: 45,
                            };
                        }
                        else {
                            var set = {
                                id: $.trim(value), header: { text: Settext, height: 30, css: "YellowRows" }, css: { 'text-align': 'center !important' }, width: 45,
                                cssFormat: SetCondition,
                            };
                        }
                    }
                    ColVal.push(set);
                });

                $$("grdRoomPos").config.columns = ColVal;
                $$("grdRoomPos").refreshColumns();

                $$("grdRoomPos").parse(rowDatad.GridOpp);
                $$("grdRoomPos").refresh();
            }
            $("#EventInd").val("0");
            $("#LoadDIv").hide();
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }

    });
}

function GridDesign() {
    webix.ui({
        container: "grdRoomPosdiv",
        id: "grdRoomPosdiv",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        elements: [
            {
                rows: [
                   {
                       id: "grdRoomPos",
                       select: 'cell',
                       view: "treetable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       data: [],
                       scheme: {
                           $change: function (item) {  
                               if (item.Title == "Days") {
                                   item.$css = "YellowRows1";
                                   item.Title = "";
                               }
                               else if (item.Title == "Total Vacant") {
                                   item.$css = "VacantColor";
                               }
                           }
                       },
                       on: {
                           onBeforeClose: function () {
                               return false;
                           },
                       },
                   }
                ]
            }
        ]
    });
}

function SetCondition(value, config, id) {
    if (value < 0) {
        return { "background-color": "#ec2e2e", "color": "White", "font-weight": "Bold", "font-family": "Arial !important;" };
    }
    else if (value == "") {
        return { "background-color": "#fff !important", "border-bottom": " 1px solid #fff ! important", "border-top": " 1px solid #fff ! important" };
    }
};


function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["MODULEID"] = "FO";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SMReports/APIWCF_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnPropId").val(rowData[0].id);
            }
        },
    });
    return rowData;
}

function fnLoadProperty() {
    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        //label: "Property",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnPropId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnPropId").val(newval);
                gridOrgListLoad();
            }
        }
    });
}
