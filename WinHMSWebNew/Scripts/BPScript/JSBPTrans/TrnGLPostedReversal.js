var app = angular.module('BPTApp', ['webix']);
app.controller("BPTransController", function ($scope) {
    $("#LoadDIv").hide();
    var searchicon = "<span class='fa fa-search ' ></span>";
    var TrnTy = fnTrnTyLoad();
    fnLoadBPInitCont();
    var date = new Date();
    date.setDate(date.getDate() );
    date.toLocaleDateString();

    $scope.frmTrnGLPostedReversal = {

        id: "frmTrnGLPostedReversal",
        view: 'form',
        minWidth: "auto",
        maxWidth: "auto",
        paddingX: 40,
        elements: [
            {
                paddingX: 10,
                PaddingY: 10,
                rows: [
                   {
                       rows: [
                          {
                              cols: [
                                  {
                                      view: "richselect",
                                      id: "ddlTrnTy",
                                      value: $("#hdnTrnTy").val(),
                                      label: "Type",
                                      labelAlign: "Right",
                                      labelWidth: 120,
                                      inputWidth: 320,
                                      width: 350,
                                      options: TrnTy,
                                      on: {
                                          onChange: function (newval, oldval) {
                                              $$("GridData").clearAll();


                                          }

                                      }
                                  },
                                  {
                                      view: 'datepicker',
                                      label: 'As on',
                                      id: 'AsOnDt',
                                      minWidth: 190,
                                      labelWidth: 90,
                                      inputWidth: 210,
                                      width: 220,
                                      stringResult: true,
                                      format: "%d/%m/%Y",
                                      value: date,
                                      on: {
                                            onChange: function (newval, oldval) {
                                                $$("GridData").clearAll();


                                            }

                                        }

                                  },
                                  {
                                      id: "btnDisplay",
                                      view: 'button',
                                      label: 'Display',
                                      inputWidth: 80,
                                      labelWidth: 30,
                                      width: 80,
                                      on: {
                                          onItemClick: function () {
                                             fnLoadGridData();
                                          }
                                      }
                                  },

                              ]

                          },
                       ]
                   },
                   {
                       paddingY: 20,

                       cols: [
                           {
                               view: "datatable",
                               id: "GridData",
                               select: "row",
                               data: [],
                               width: 1200,
                               height: 430,//350,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                                   debugger;
                                   //if (common.column.id == "CommNarr")
                                   //    return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                   
                                       { header: "Trn No", id: "ixDISPTrnNo", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Trn Date", id: "ixTrnDt", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Party", id: "ixPartyNm", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Bill/CrNt", id: "ixBillCrNt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Bill No", id: "IXBILLNO", hidden: true },
                                       { header: "Bill Date", id: "ixBillDt", hidden: true },
                                          {
                                              header: "Bill Amt", id: "ixBillAmt", width: 130, css: { 'text-align': 'right ! important' }, tooltip: false,
                                              format: function (value) {
                                                  return fnCurrFormat(value);
                                              },
                                          },
                                       { header: "Receipt Amt", id: "ixRcptAmt", width: 130, css: { 'text-align': 'right ! important' }, tooltip: false,
                                       format: function (value) {
                                           return fnCurrFormat(value);
                                       },
                                       },
                                       {
                                           header: "Difference", id: "ixDiff", width: 130, css: { 'text-align': 'right ! important' }, tooltip: false,
                                           format: function (value) {
                                               return fnCurrFormat(value);
                                           },
                                       },

                                        { header: "Revert", id: "ixAppr", width: 50, template: "{common.checkbox()}", css: { 'text-align': 'right ! important' }, tooltip: false },
                                       { header: "PartyId", id: "ixPartyId", hidden: true },
                                       { header: "TrnNo", id: "ixTrnNo", hidden: true },

                                     
                                       

                               ],
                               on: {


                                   'onItemClick': function (id, index, cell) {
                                       //if (id.column == 'Select') {
                                       //    var getval = this.getItem(id.row);


                                       //    var Dr = getval.ixDR;
                                       //    var Cr = getval.ixCR;
                                       //    var Drcr = "";
                                       //    if (Dr != "") Drcr = "1"; else Drcr = "2";
                                       //    var TrnTy = $$("ddlTrnTy").getValue();
                                       //    fnLoadAccountNm(TrnTy, Drcr);
                                       //    $$("AcNmSearchPop").show();
                                       //}


                                   },
                                   'onBlur': function () {
                                      
                                   },
                               }

                           }]
                   },
                ]
            }]
    }
});

function fnLoadGridData() {
    debugger;
    $$("GridData").clearAll();
    $("#LoadDIv").show();


    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOADGLPOSTTRANSREVERSAL";
    dataparam["PROGNAME"] = "GET_GLPOSTTRANSREVERSAL";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["AsOnDt"] = $$("AsOnDt").getText();
    dataparam["TrnTy"] = $$("ddlTrnTy").getValue();
    var DataVal = JSON.stringify(dataparam);
    
    $.ajax({
        async: false,
        url: "/BPTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                if (d == "All Fiscal Periods Closed")
                {
                    AlertMessage($.trim(d));
                }
                else {
                    rowData = JSON.parse(d);
                    $$("GridData").parse(rowData);
                    $$("GridData").refresh();                   
                }
                $("#LoadDIv").hide();
              
            }
            else {
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
    $("#LoadDIv").hide();

   
};
function fnSaveValid() {
    debugger;

   

    if ($$("ddlTrnTy").getValue() == "") {
        AlertMessage('Transaction type Cannot be empty');
        return false;
    }

    if ($$("AsOnDt").getValue() == "") {
        AlertMessage('As on date Cannot be empty');
        return false;
    }



    var data = $$("GridData").serialize();
    var lenval = data.length;
    if (lenval == 0) {
        AlertMessage('Bill details Cannot be empty');
        return false;
    }

    var chk = "0";
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if (data[i].ixAppr == "1") {
                chk = "1";
                break;
            }
        }

        if ($.trim(chk) != "1") {
            AlertMessage("Atleast one row Should be selected");
            return false;
        }


    }




    return true;
}
function fnGLPostReversalSave() {

    if (fnSaveValid() == false) {
        return false;
    }
    debugger;
    var BillData = $$("GridData").serialize(true);
    var lenval = BillData.length;

    var DataStore = [];

    var dataparam = {};

    debugger;

    if (lenval > 0) {

        DataStore = BillData;
    }

    dataparam["REQTYPE"] = "GET_GLPOSTINGREVERSALSAVE";
    dataparam["PROGNAME"] = "GET_GLPOSTTRANSREVERSAL";
    dataparam["CompanyID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["AsOnDt"] = $.trim($$("AsOnDt").getText());
    dataparam["TrnTy"] = $.trim($$("ddlTrnTy").getValue());
    dataparam["grdData"] = BillData;



    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: "/BPTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                   
                    $$("GridData").clearAll();
                  
                }
                else {
                    AlertMessage($.trim(rowData));
                }
            }
        },
    });
}
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
    //debugger;
    if (value == null || value == undefined) return "";
    if (isNaN(value)) return "";

    if (value.toString() != "") {
        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                ////afterPoint = CurrDelimit + afterPoint
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            //x = Math.floor(x);

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        else {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }

            x = x.toString();

            //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
            //var res = x.replace(/(\d{3})/g, "1,")
            var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            if (res.indexOf('.') > 0) {

                res = res.replace(".", CurrDelimit)
            }


            return res;
        }
    }
    else {
        return value;
    }
};
function fnCurrFormat(value) {

    var Currfrmt = $("#CURRENCY_FORMAT").val();
    var CurrDelimit = $("#CURRENCY_DELIMIT").val();
    var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
};
function fnLoadProperty() {

    var dataProp = fnPropertyLoad("1");

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnTrnTyLoad() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOADTRNTYPE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();   
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
   
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BPTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
              
                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (i == 0) {
                            $("#hdnTrnTy").val(rowData[i].id);
                            break;
                        }
                    }
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}
function fnLoadBPInitCont() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOADBPINITCONT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
   


    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BPTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;
                if (lenval != 0) {
                            $("#CURRENCY_FORMAT").val(rowData[0].CURRENCY_FORMAT);
                            $("#CURRENCY_DELIMIT").val(rowData[0].CURRENCY_DELIMIT);
                            $("#CURRENCY_DECIMLIMIT").val(rowData[0].VAL_DECIM_LIMIT);                           
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
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
    }).then(function (result) {

    })
}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}