var app = angular.module('GPApp', ['webix']);
app.controller("GPController", function ($scope) {

    var dataProp = ddlPropertyLoadFn();
    
    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disabled: false,
        options: dataProp,
        labelwidth: 130,
        on: {
            onChange: function (newval, oldval) {
                fnLoadSettings(newval);
                $$("txtSusAcc").setValue($.trim(rowData[0].NA_SUSP_AC_ID));
                $$("txtGBalAcc").setValue($.trim(rowData[0].NA_CF_AC_ID));
                $$("txtRVT").setValue($.trim(rowData[0].REV_V_TY));
                $$("txtRVS").setValue($.trim(rowData[0].REV_V_SRC));
                $$("txtSVT").setValue($.trim(rowData[0].ST_V_TY));
                $$("txtSVS").setValue($.trim(rowData[0].ST_V_SRC));
                $$("txtEP").setValue($.trim(rowData[0].FL_SRC));
                $$("txtA1").setValue($.trim(rowData[0].A_ID));
                $$("txtA2").setValue($.trim(rowData[0].B_ID));
                $$("txtA3").setValue($.trim(rowData[0].C_ID));
                $$("txtA4").setValue($.trim(rowData[0].D_ID));
                $$("txtA5").setValue($.trim(rowData[0].E_ID));
                $$("txtA6").setValue($.trim(rowData[0].F_ID));
                $$("txtA7").setValue($.trim(rowData[0].G_ID));
                $$("txtA8").setValue($.trim(rowData[0].H_ID));
                $$("txtA9").setValue($.trim(rowData[0].I_ID));
                $$("txtB1").setValue($.trim(rowData[0].A1_ID));
                $$("txtB2").setValue($.trim(rowData[0].B1_ID));
                $$("txtB3").setValue($.trim(rowData[0].C1_ID));
                $$("txtB4").setValue($.trim(rowData[0].D1_ID));
                $$("txtB5").setValue($.trim(rowData[0].E1_ID));
                $$("txtB6").setValue($.trim(rowData[0].F1_ID));
                $$("txtB7").setValue($.trim(rowData[0].G1_ID));
                $$("txtB8").setValue($.trim(rowData[0].H1_ID));
                $$("txtB9").setValue($.trim(rowData[0].I1_ID));
                if ($.trim(rowData[0].M_IND) == "1") {
                    $$("ChkFisyr").setValue("1");
                    $$("ddlFisYrMth").setValue($.trim(rowData[0].S_M));
                    $$("ddlFisYrMth").enable();
                }
                else {
                    $$("ChkFisyr").setValue("0");
                    $$("ddlFisYrMth").setValue("");
                    $$("ddlFisYrMth").disable();
                }
                $$("chkArPost").setValue($.trim(rowData[0].N_IND));

                if ($.trim(rowData[0].CC_IND) == null || $.trim(rowData[0].CC_IND) == "")
                    $$("chkCrdCmp").setValue("1");
                else
                    $$("chkCrdCmp").setValue("0");

                if ($$("chkCrdCmp").getValue() == "1")
                {
                    $$("txtCrdAcc").show();
                    $$("txtCrdAcc").setValue($.trim(rowData[0].CC_AC_ID))
                    $$("txtSunAcc").show();
                    $$("txtSunAcc").setValue($.trim(rowData[0].CMP_AC_ID))
                }
                else {
                    $$("txtCrdAcc").hide();
                    $$("txtSunAcc").hide();
                    $$("txtCrdAcc").setValue("");
                    $$("txtSunAcc").setValue("");
                }
                if ($.trim(rowData[0].O_IND) == null || $.trim(rowData[0].O_IND) == "")
                    $$("chkStatstics").setValue("1");
                else
                    $$("chkStatstics").setValue("0");
            }
        }
    };

    var dataMon = loadFisYr();
    var OpenSet = fnLoadSettings("WS");

    $scope.DivForm = {
        view: 'form',
        minWidth: 900,
        MinHeight: 700,
        id: 'DivForm',
      
        elements: [
            {
                rows: [
                    {
                        cols:[{view: "text",
                            id: "txtSusAcc",
                            label: "Suspense Ac",
                            inputWidth: 270,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 200,
                            value: $.trim(rowData[0].NA_SUSP_AC_ID),
                        },
                            {
                                view: "text",
                                id: "txtA1",
                                label: "Ac code for Total Rooms",
                                inputWidth: 300,
                                labelWidth: 150,
                                labelAlign: "Right",
                                minWidth: 200,
                                value: $.trim(rowData[0].A_ID),
                            },
                            {
                                view: "text",
                                id: "txtB1",
                                inputWidth: 100,
                                minWidth: 400,
                                value: $.trim(rowData[0].A1_ID)
                            },
                        ]
                    },
                    {
                        cols: [{
                            view: "text",
                            id: "txtGBalAcc",
                            label: "Guest Balance Ac",
                            inputWidth: 260,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 200,
                            value: $.trim(rowData[0].NA_CF_AC_ID),

                        },
                        {
                            view: "text",
                            id: "txtA2",
                            label: "Complimentary",
                            inputWidth: 300,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 400,
                            value: $.trim(rowData[0].B_ID),
                        },
                         {
                             view: "text",
                             id: "txtB2",
                             inputWidth: 100,
                             minWidth: 400,
                             value: $.trim(rowData[0].B1_ID)
                         },
                        ]
                    },
                    {
                        cols: [{
                            view: "text",
                            id: "txtRVT",
                            label: "Revenue Voucher Type",
                            inputWidth: 260,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 200,
                            value: $.trim(rowData[0].REV_V_TY),

                        },
                        {
                            view: "text",
                            id: "txtA3",
                            label: "Out Of order",
                            inputWidth: 300,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 400,
                            value: $.trim(rowData[0].C_ID),
                        },
                         {
                             view: "text",
                             id: "txtB3",
                             inputWidth: 100,
                             minWidth: 400,
                             value: $.trim(rowData[0].C1_ID),
                         },

                        ]
                    },
                   {
                       cols: [{
                           view: "text",
                           id: "txtSVT",
                           label: "Stat Voucher Type",
                           inputWidth: 260,
                           labelWidth: 150,
                           labelAlign: "Right",
                           minWidth: 200,
                           value: $.trim(rowData[0].ST_V_TY),

                       },
                       {
                           view: "text",
                           id: "txtA4",
                           label: "House use",
                           inputWidth: 300,
                           labelWidth: 150,
                           labelAlign: "Right",
                           minWidth: 400,
                           value: $.trim(rowData[0].D_ID),
                       },
                        {
                            view: "text",
                            id: "txtB4",
                            inputWidth: 100,
                            minWidth: 400,
                            value: $.trim(rowData[0].D1_ID),
                        },

                       ]
                   },
                     {
                         cols: [{
                             view: "text",
                             id: "txtRVS",
                             label: "Revenue Voucher Screen",
                             inputWidth: 260,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 200,
                             value: $.trim(rowData[0].REV_V_SRC),

                         },
                         {
                             view: "text",
                             id: "txtA5",
                             label: "Vacant",
                             inputWidth: 300,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 400,
                             value: $.trim(rowData[0].E_ID),
                         },
                          {
                              view: "text",
                              id: "txtB5",
                              inputWidth: 100,
                              minWidth: 400,
                              value: $.trim(rowData[0].E1_ID),
                          },

                         ]
                     },

                     {
                         cols: [{
                             view: "text",
                             id: "txtSVS",
                             label: "Stat Voucher Screen",
                             inputWidth: 260,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 200,
                             value: $.trim(rowData[0].ST_V_SRC),

                         },
                         {
                             view: "text",
                             id: "txtA6",
                             label: "Retention Changed",
                             inputWidth: 300,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 400,
                             value: $.trim(rowData[0].F_ID),
                         },
                          {
                              view: "text",
                              id: "txtB6",
                              inputWidth: 100,
                              minWidth: 400,
                              value: $.trim(rowData[0].F1_ID),
                          },

                         ]
                     },

                     {
                         cols: [{
                             view: "text",
                             id: "txtEP",
                             label: "Export Path",
                             inputWidth: 260,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 200,
                             value: $.trim(rowData[0].FL_SRC),

                         },
                         {
                             view: "text",
                             id: "txtA7",
                             label: "Out of Service",
                             inputWidth: 300,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 400,
                             value: $.trim(rowData[0].G_ID),
                         },
                          {
                              view: "text",
                              id: "txtB7",
                              inputWidth: 100,
                              minWidth: 400,
                              value: $.trim(rowData[0].G1_ID),
                          },

                         ]
                     },

                      {
                          cols: [
                             
                          {
                              view:"checkbox", 
                              id:"ChkFisyr", 
                              label: "Start Fiscal Year Month",
                              labelWidth: 150,
                              minWidth: 170,
                              value: $.trim(rowData[0].M_IND),
                              on: {
                                  "onChange": function () {
                                      if ($$("ChkFisyr").getValue() == "1") {
                                          $$("ddlFisYrMth").enable();
                                          }
                                      else {
                                          $$("ddlFisYrMth").disable();
                                          $$("ddlFisYrMth").setValue("");
                                      }
                                  }
                              }
                          },
                          {
                              view: "combo",
                              id: "ddlFisYrMth",
                              inputWidth: 100,
                              //minWidth: 200,
                              options: dataMon,
                              disabled: $.trim(rowData[0].M_IND) == "1" ? false:true,
                              value: $.trim(rowData[0].S_M),
                          },
                           {
                               view: "text",
                               id: "txtA8",
                               label: "Day Use",
                               inputWidth: 300,
                               labelWidth: 150,
                               labelAlign: "Right",
                               minWidth: 400,
                               value: $.trim(rowData[0].H_ID),
                           },
                           {
                               view: "text",
                               id: "txtB8",
                               inputWidth: 100,
                               minWidth: 400,
                               value: $.trim(rowData[0].H1_ID),
                           },

                          ]
                      },
                       {
                           cols: [{
                               
                               view: "checkbox",
                               id: "chkArPost",
                               label: "AR to Sun Posting Applicable",
                               labelWidth: 150,
                               minWidth: 170,
                               value: $.trim(rowData[0].N_IND),
                           },
                           {
                               view: "text",
                               id: "txtA9",
                               label: "Management Block",
                               inputWidth: 300,
                               labelWidth: 150,
                               labelAlign: "Right",
                               minWidth: 400,
                               value: $.trim(rowData[0].I_ID),
                           },
                            {
                                view: "text",
                                id: "txtB9",
                                inputWidth: 100,
                                minWidth: 400,
                                value: $.trim(rowData[0].I1_ID),
                            },

                           ]
                       },
                       {
                           view: "checkbox",
                           id: "chkCrdCmp",
                           label: "Credit card company entries as single control Account",
                           labelWidth: 150,
                           minWidth: 170,
                           value: $.trim(rowData[0].CC_IND) == null || $.trim(rowData[0].CC_IND) == ""?"1":"0",
                           on: {
                               "onChange": function () {
                                   if ($$("chkCrdCmp").getValue() == "1") {
                                       $$("txtCrdAcc").show();
                                       $$("txtSunAcc").show();
                                   }
                                   else {
                                       $$("txtCrdAcc").hide();
                                       $$("txtSunAcc").hide();
                                   }
                               }
                           }
                           
                       },
                        {
                            view: "text",
                            id: "txtCrdAcc",
                            label: "Credit Card Control Accounts",
                            inputWidth: 300,
                            labelWidth: 150,
                            labelAlign: "Right",
                            minWidth: 400,
                            value: $.trim(rowData[0].CC_AC_ID),
                            hidden: $.trim(rowData[0].CC_IND) == null ||  $.trim(rowData[0].CC_IND) == "" ? false : true,
                        },
                         {
                             view: "text",
                             id: "txtSunAcc",
                             label: "Sundry debtors Control Accounts",
                             inputWidth: 300,
                             labelWidth: 150,
                             labelAlign: "Right",
                             minWidth: 400,
                             value: $.trim(rowData[0].CMP_AC_ID),
                             hidden: $.trim(rowData[0].CC_IND) == null ||  $.trim(rowData[0].CC_IND) == "" ? false : true,
                         },
                       {
                           view: "checkbox",
                           id: "chkStatstics",
                           label: "Create Statistics of FO, POS, Banquet",
                           labelWidth: 150,
                           minWidth: 170,
                           value: $.trim(rowData[0].O_IND) == null ||  $.trim(rowData[0].O_IND) == "" ? 1 : 0,
                           
                       },
                      
                ]
            }
        ]
    }

    
});

function fndisable()
{
    
    if ($$("ChkFisyr").getValue == "1")
        $$("ddlFisYrMth").enabled();
    else
        $$("ddlFisYrMth").disabled();
}

function fnSettingSave() {

    if (fnValidate() == false)
        return false;

    var dataparam = {};

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_SETTINGSAVE";
    dataparam["NA_SUSP_AC_ID"] = $.trim($$("txtSusAcc").getValue());
    dataparam["NA_CF_AC_ID"] = $.trim($$("txtGBalAcc").getValue());
    dataparam["REV_V_TY"] = $.trim($$("txtRVT").getValue());
    dataparam["REV_V_SRC"] = $.trim($$("txtRVS").getValue());
    dataparam["ST_V_TY"] = $.trim($$("txtSVT").getValue());
    dataparam["ST_V_SRC"] = $.trim($$("txtSVS").getValue());
    dataparam["FL_SRC"] = $.trim($$("txtEP").getValue());
    dataparam["A_ID"] = $.trim($$("txtA1").getValue());
    dataparam["B_ID"] = $.trim($$("txtA2").getValue());
    dataparam["C_ID"] = $.trim($$("txtA3").getValue());
    dataparam["D_ID"] = $.trim($$("txtA4").getValue());
    dataparam["E_ID"] = $.trim($$("txtA5").getValue());
    dataparam["F_ID"] = $.trim($$("txtA6").getValue());
    dataparam["G_ID"] = $.trim($$("txtA7").getValue());
    dataparam["H_ID"] = $.trim($$("txtA8").getValue());
    dataparam["I_ID"] = $.trim($$("txtA9").getValue());
    dataparam["A1_ID"] = $.trim($$("txtB1").getValue());
    dataparam["B1_ID"] = $.trim($$("txtB2").getValue());
    dataparam["C1_ID"] = $.trim($$("txtB3").getValue());
    dataparam["D1_ID"] = $.trim($$("txtB4").getValue());
    dataparam["E1_ID"] = $.trim($$("txtB5").getValue());
    dataparam["F1_ID"] = $.trim($$("txtB6").getValue());
    dataparam["G1_ID"] = $.trim($$("txtB7").getValue());
    dataparam["H1_ID"] = $.trim($$("txtB8").getValue());
    dataparam["I1_ID"] = $.trim($$("txtB9").getValue());
    dataparam["M_IND"] = $.trim($$("ChkFisyr").getValue());
    dataparam["S_M"] = $.trim($$("ddlFisYrMth").getValue());
    dataparam["N_IND"] = $.trim($$("chkArPost").getValue());
    dataparam["CC_IND"] = $.trim($$("chkCrdCmp").getValue());
    dataparam["O_IND"] = $.trim($$("chkStatstics").getValue());
    dataparam["CC_AC_ID"] = $.trim($$("txtCrdAcc").getValue());
    dataparam["CMP_AC_ID"] = $.trim($$("txtSunAcc").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    alert('Updated Successfully');
                    fnRefersh();
                }
            }
        },
    });
}

function fnValidate() {
    var count = 0;
    if ($$("txtSusAcc").getValue() == "") {
        alert('Please Enter Suspense A/c')
        count += 1;
        return false;
    }
    else if ($$("txtGBalAcc").getValue() == "") {
        alert('Please Enter Guest Balance A/c')
        count += 1;
        return false;
    }
    if (count == 0)
        return true;
    else
        return false;
}
function loadFisYr()
{
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FIS_MONTH";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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

function fnLoadSettings(CompId)
{
    var dataparam = {};
    dataparam["COMPID"] = CompId;
    dataparam["REQTYPE"] = "OPEN_SETTINGSAVE";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            
            if (objRes != "") {
                rowData = JSON.parse(objRes);
            }
        },
    });
    return rowData;
}

function fnRefersh() {
    
    $$("txtSusAcc").setValue(""); $$("txtGBalAcc").setValue("");
    $$("txtRVT").setValue(""); $$("txtRVS").setValue("");
    $$("txtSVT").setValue(""); $$("txtSVS").setValue("");
    $$("txtEP").setValue(""); $$("txtA1").setValue("");
    $$("txtA2").setValue(""); $$("txtA3").setValue("");
    $$("txtA4").setValue(""); $$("txtA5").setValue("");
    $$("txtA6").setValue(""); $$("txtA7").setValue("");
    $$("txtA8").setValue(""); $$("txtA9").setValue("");
    $$("txtB1").setValue(""); $$("txtB2").setValue("");
    $$("txtB3").setValue(""); $$("txtB4").setValue("");
    $$("txtB5").setValue(""); $$("txtB6").setValue("");
    $$("txtB7").setValue(""); $$("txtB8").setValue("");
    $$("txtB9").setValue(""); $$("txtSusAcc").setValue("");
    $$("ChkFisyr").setValue("0"); $$("ddlFisYrMth").setValue("");
    $$("ddlFisYrMth").disable(); $$("chkArPost").setValue("0");
    $$("chkCrdCmp").setValue("0"); $$("chkStatstics").setValue("0");
    $$("txtCrdAcc").setValue(""); $$("txtSunAcc").setValue("");
}

function ddlPropertyLoadFn() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "ddlPropertyLoadFn";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "")
                rowData = JSON.parse(d);
        },
    });
    return rowData;
}