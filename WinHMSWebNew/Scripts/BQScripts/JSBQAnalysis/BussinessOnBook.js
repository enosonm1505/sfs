var app = angular.module('BQTApp', ['webix']);

app.controller("BQAnalysisController", function ($scope) {
    debugger;
    $("#loading").hide();
     $("#LoadDIv").hide();
     $("#HdnPageLoad").val("1");
     $("#HdnPropLoad").val("1");
     //fnAccountDt();
     LoadDate();
    var LoadProp = fnLoadProperty();
    var ddlvenue= fnLoadVenue();
    $scope.frmBQBussinessOnBook = {
        id: "frmBQBussinessOnBook",
        view: 'form',
        minWidth: 900,
        height: 550,
        elements: [
            {

                rows: [
                                {
                                   
                                    cols: [
                                         {
                                             view: "richselect",
                                             id: "ddlProp",
                                             label: "Property",
                                             labelAlign: "Left",
                                             labelWidth: 120,
                                             inputWidth: 350,
                                             width: 350,
                                             options: LoadProp,
                                             value: $("#hdnCompId").val(),
                                             on: {
                                                 onChange: function (newval, oldval) {
                                                     $$("gridRpt").clearAll();
                                                     $$("gridRpt").refresh();
                                                     if (newval.indexOf(",") >= 0) {
                                                         $("#HdnPropLoad").val("2");
                                                         $$("ToMthDate").hide();
                                                         $$("ddlvenue").disable();
                                                         $$("chkpastdt").disable();
                                                         $$("chkpastdt").setValue("0");
                                                         $$("ddlvenue").setValue();
                                                         $$("FromMthDate").define("label", " Month");
                                                         $$("FromMthDate").refresh();
                                                         fnHeader();
                                                     }
                                                     else {
                                                         $("#HdnPropLoad").val("1");
                                                         $$("ToMthDate").show();
                                                         $$("ddlvenue").enable();
                                                         $$("chkpastdt").enable();
                                                         $$("FromMthDate").define("label", " From");
                                                         $$("FromMthDate").refresh();
                                                         fnHeader();
                                                     }
                                                     if ($("#HdnPageLoad").val() == "2")
                                                         display();
                                                 }
                                             }
                                         },
                                                        {
                                                            view: "datepicker",
                                                            id: "FromMthDate",
                                                            name: "FromMthDate",
                                                            stringResult: true,
                                                            label: "From",
                                                            format: "%M %Y",
                                                            type: "month",
                                                            labelAlign: "Left",
                                                            labelWidth: 40,
                                                            inputWidth: 160,
                                                            width: 160,
                                                            minWidth: 160,
                                                            value: $("#HdnFromMthDate").val(), 
                                                        },
                                                      {
                                                          view: "datepicker",
                                                          id: "ToMthDate",
                                                          name: "FromMthDate",
                                                          stringResult: true,
                                                          label: "To",
                                                          format: "%M %Y",
                                                          type: "month",
                                                          labelAlign: "Left",
                                                          labelWidth: 30,
                                                          inputWidth: 160,
                                                          width: 160,
                                                          minWidth: 160,
                                                          value: $("#HdnToMthDate").val(),
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
                                                                  fnHeader();
                                                                  display();
                                                                  $("#HdnPageLoad").val("2");
                                                              }
                                                          }
                                                      },
                                    ]
                                },
                                {
                                    cols:[{
                                        view: "richselect",
                                        id: "ddlvenue",
                                        label: " Venue",
                                        labelAlign: "Left",
                                        labelWidth: 120,
                                        inputWidth: 350,
                                        width: 350,
                                        options: ddlvenue,
                                        value:"ALL",
                                        on: {
                                            onChange: function (newval, oldval) {
                                                $$("gridRpt").clearAll();
                                                $$("gridRpt").refresh();
                                                if ($("#HdnPageLoad").val() == "2")
                                                    display();
                                            }
                                        }
                                    },
                                    {
                                        id: "chkpastdt",
                                        view: "checkbox",
                                        label: "Past Date",
                                        labelAlign: "Right",
                                        labelWidth: 140,
                                        width: 200,
                                        on: {
                                            "onChange": function (newval, oldval) {
                                                $$("gridRpt").clearAll();
                                                $$("gridRpt").refresh();
                                                if (newval == "1") {
                                                    $$("ddlvenue").setValue();
                                                    $$("ddlvenue").disable();
                                                    if ($("#HdnPageLoad").val() == "2")
                                                        display();
                                                }

                                                else {
                                                    $$("ddlvenue").enable();
                                                    if ($("#HdnPageLoad").val() == "2")
                                                        display();
                                                }
                                                
                                            }
                                        }
                                    }
                                    ]
                                },
                                    {
                                        labelWidth: 100, inputWidth: 50,
                                        width: 1250, minWidth: 450,
                                    },
                    {
                        id: "gridRpt",
                        select: 'row',
                        view: "datatable",
                        fixedRowHeight: false,
                        rowLineHeight: 23,
                        autoConfig: true,
                        resizeColumn: true,
                        resizeRow: true,
                        height: 430,
                        minWidth: 900,
                        position: "flex",
                        spans: true,
                        css: "webix_header_border wingrd_hight hgt",
                        data: [],
                        columns: [
                                { id: "DATE", header: { text: "Date", }, width: 100 },
                                { id: "CLR", hidden: true },
                        ],

                        scheme: {
                            $init: function (item) {
                                if (item.CLR != "" && item.CLR != null) {
                                    if (item.CLR == "1") {
                                        item.$css = "Value";
                                    }
                                   else if (item.CLR == "2") {
                                       item.$css = "Total";
                                    }                                 
                                }

                            },

                        },

                        on: {

                            onBeforeClose: function () {
                                return false;

                            },
                            onAfterload: function () {

                            }

                        },
                    },
                   
                ] 
            }
        ]
    }
}
); 


function display() {

    if ($("#HdnPropLoad").val() == "1") {
        if (!validateDate()) {
            return false;
        }
    }

    $("#loading").show();
    var rowData = [];
    var dataparam = {};
    var frmdate = $$("FromMthDate").getValue();  //
    var todate = $$("ToMthDate").getValue();
    frmdate = formatDate(frmdate);
    todate = formatDate(todate);
    dataparam["REQTYPE"] = "";
    dataparam["COMPID"] = $$("ddlProp").getValue();
    if ($("#HdnPropLoad").val() == "2") {
        dataparam["PROGNAME"] = "GET_PROPERTY_GRID";
        dataparam["frmdate"] = frmdate;
        dataparam["ddlprop"] = $$("ddlProp").getValue();
    }
    else {
        dataparam["PROGNAME"] = "GET_BUSSINESSONBOOKLOAD";
        //dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["frmdate"] = frmdate;
        dataparam["todate"] = todate;
        dataparam["chkpastdt"] = $$("chkpastdt").getValue();
        dataparam["ddlvenue"] = $$("ddlvenue").getValue();
    }
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("gridRpt").clearAll();
                $$("gridRpt").parse(rowData);             
            }
            $("#loading").hide();
        }
    });
}

function fnLoadVenue() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNVENUE";
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

function fnLoadProperty() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GETPROPERTYLOAD";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
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

function fnHeader() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "";
    if($("#HdnPropLoad").val() == "2"){
        dataparam["PROGNAME"] = "GET_PROPHEADER";
        dataparam["ddlprop"] = $$("ddlProp").getValue();
    }

     else{
        dataparam["PROGNAME"] = "GET_FNMONTHBETWNDT";
             dataparam ["frmdate"]  = $$("FromMthDate").getValue();
             dataparam["todate"] = $$("ToMthDate").getValue();
     }
            var dataparam = JSON.stringify(dataparam);
            $.ajax({
                async: false,
                url: "/BQAnalysis/COMAPI_CALL",
                type: 'POST',
                data: "request=" + dataparam,
                success: function (d) {
                    if (d != "") {  
                    rowData = JSON.parse(d);
                    if (rowData.length > 0) {

                        var vColumn = $$("gridRpt").config.columns;
                        vColumn.splice(1, vColumn.length);
                       // $$("gridRpt").refreshColumns();
                        $$("gridRpt").config.columns[0].header = "Date"
                        if($("#HdnPropLoad").val() == "1"){
                        $.each(rowData, function (key, value) {
                            var Hdr = value.MNTH_NM.toString().replace("_", " ");
                            var vCss = "";
                            var vWidth = 100;
                            var vColspan = 3;
                            var set = {
                                id: $.trim(value.MNTH_ID) + "#1", header: [{ text: Hdr, colspan: vColspan, css: { 'text-align': 'center' } }, "Revenue"], format: webix.i18n.numberFormat, width: vWidth, css: { 'text-align': 'right ! important' },
                            };
                            vColumn.push(set);
                            var set = {
                                id: $.trim(value.MNTH_ID) + "#2", header: [null, "Cover"], width: vWidth, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' },

                            };
                            vColumn.push(set);

                            var set = {
                                id: $.trim(value.MNTH_ID) + "#3", header: [null, "APC"], width: vWidth, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' },

                            };
                            vColumn.push(set);

                        });
                        }

                        else {
                            $.each(rowData, function (key, value) {
                                var Hdr = value.PROP_NM.toString();
                                var vCss = "";
                                var vWidth = 100;
                                var vColspan = 3;

                                var set = {
                                    id: $.trim(value.PROP_ID) + "#1", header: [{ text: Hdr, colspan: vColspan, css: { 'text-align': 'center' } }, "Revenue"], format: webix.i18n.numberFormat, width: vWidth, css: { 'text-align': 'right ! important' },

                                };
                                vColumn.push(set);
                                var set = {
                                    id: $.trim(value.PROP_ID) + "#2", header: [null, "Cover"], width: vWidth, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' },
  
                                };
                                vColumn.push(set);

                                var set = {
                                    id: $.trim(value.PROP_ID) + "#3", header: [null, "APC"], width: vWidth, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' },
          
                                };
                                vColumn.push(set);
                 
                            });
                        }

                        var set = {
                            id:"ixTotal", header:"Total", width: 100, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' },

                        };
                        vColumn.push(set);
                        $$("gridRpt").refreshColumns();

                    }
                }
                }
            });
}

function LoadDate() {

    var data1 = [];
    var dataparam = {};
    dataparam["ADDMONTH"] = "2";
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GETFRMMNTHTOMNTH";
    var dataparam = JSON.stringify(dataparam);
    $.ajax({
        type: "POST",
        url: "/BQAnalysis/COMAPI_CALL",
        //cache: false,
        async: false,
        charset: 'utf-8',
        data: "request=" + dataparam,

        success: function (data) {
             data1 = JSON.parse(data);
            var vFromMnth = data1[0].FRMMNTH.toString().trim();
            var vToMnth = data1[0].TOMNTH.toString().trim();
            var vAccMnth = data1[0].ACC_MNTH.toString().trim();
            vFromMnth = SetformatDate(vFromMnth);
            vToMnth = SetformatDate(vToMnth);
            $("#HdnFromMthDate").val(vFromMnth);
            $("#HdnToMthDate").val(vToMnth);    
        },
    });
    return data1;
}

function sidebarFn() {
    $$("gridRpt").resize();
    $$("gridRpt").adjust();
    $$("frmBQBussinessOnBook").resize();
    $$("frmBQBussinessOnBook").adjust();
}

function fnGridPrint() {
    var vHeader = $("#LayoutText").val();
    var FullData = "";

    FullData = $$("gridRpt").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("gridRpt"), {
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
    FullData = $$("gridRpt").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("gridRpt"), {
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

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}

function validateDate() {
    var efromdt = $.trim($$("FromMthDate").getText());
    efromdt = efromdt.replace(' ', '_');
    var efromMnth = efromdt.substring(0, 3);
    var efromYr = efromdt.substring(4, 8);
    efromMnth = FnRetMonth(efromMnth);
    efromdt = "01/" + efromMnth + "/" + efromYr;
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var etodt = $$("ToMthDate").getText();
    var efromMnth = etodt.substring(0, 3);
    var efromYr = etodt.substring(4, 8);
    efromMnth = FnRetMonth(efromMnth);
    etodt = "01/" + efromMnth + "/" + efromYr;
    var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage('From Date can not be greater than To date');
        return false;
    }

    return true;
}

function formatDate(StrDt) {
    var Parts = StrDt.split(" ");
    var MN = FnRetMonth(Parts[0]);
    var YR = Parts[1];
    var Str = "01" + "/" + MN + "/" + YR;
    return Str;
}

function SetformatDate(StrDt) {
    var Parts = StrDt.split(" ");
    var MN = FnRetMonth(Parts[0]);
    var YR = Parts[1];
   // var Str = "01" + "/" + MN + "/" + YR;
    var Str = YR + "/" + MN;
    return Str;
}

function FnRetMonth(StrMnNm) {
    var UStr = StrMnNm.toUpperCase();
    var str = "";

    switch (UStr) {
        case "JAN": str = "01"; break;
        case "FEB": str = "02"; break;
        case "MAR": str = "03"; break;
        case "APR": str = "04"; break;
        case "MAY": str = "05"; break;
        case "JUN": str = "06"; break;
        case "JUL": str = "07"; break;
        case "AUG": str = "08"; break;
        case "SEP": str = "09"; break;
        case "OCT": str = "10"; break;
        case "NOV": str = "11"; break;
        case "DEC": str = "12"; break;
    }

    return str;
}