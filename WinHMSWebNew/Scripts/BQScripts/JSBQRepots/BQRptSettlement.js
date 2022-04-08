
var app = angular.module('BQTApp', ['webix']);

app.controller("BQReportsController", function ($scope) {
  
    $("#LoadDIv").hide();

    fnAccountDt();
    var fnUser = loadUser();
    $scope.frmBQSettle = {
        id: "frmBQSettle",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               view: "richselect",
                               id: "ddlUser",
                               label: " User",
                               labelAlign: "Left",
                               labelWidth: 60,
                               inputWidth: 220,
                               width: 280,
                               minWidth: 280,
                               options: fnUser,
                               value: "ALL",
                               on: {
                                   onChange: function (newval, oldval) {
                                       fnLoadGrid();
                                   }
                               }
                           },
                           {
                               id: "ChkDtRange",
                               view: "checkbox",
                               label: "Date Range",
                               labelAlign: "left",
                               labelWidth: 100, inputWidth: 150,
                               width: 150, minWidth: 150,
                               on: {
                                   "onChange": function () {

                                       if ($$("ChkDtRange").getValue() == "1") {
                                           $$("txttxtToDt").show();
                                           $$("txtFrmDate").define("label", "From Dt");
                                           $$("txtFrmDate").refresh();
                                       }
                                       else {
                                           $$("txttxtToDt").hide();
                                           $$("txtFrmDate").define("label", "As on Dt");
                                           $$("txtFrmDate").refresh();
                                       }
                                   }
                               }
                           },
                           {
                               view: "datepicker",
                               id: "txtFrmDate",
                               stringResult: true,
                               label: "As on Dt",
                               format: "%d/%m/%Y",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 200,
                               width: 220,
                               minWidth: 220,
                               value: $("#hdnCurrentDt").val(),
                           },
                           {
                                 view: "datepicker",
                                 id: "txttxtToDt",
                                 disable: true,
                                 stringResult: true,
                                 label: "To Dt",
                                 format: "%d/%m/%Y",
                                 labelAlign: "Left",
                                 labelWidth: 40,
                                 inputWidth: 160,
                                 width: 180, hidden: true,
                                 minWidth: 180,
                                 value: $("#hdnCurrentDt").val(),
                           },
                           {
                               view: "button",
                               id: 'btnDisplay',
                               label: "Display", labelAlign: "left",
                               minWidth: 140, width: 100,
                               on: {
                                   onItemClick: function () {
                                       fnLoadGrid();
                                   }
                               }
                           },
                           {minWidth:10,},
                           {
                               id: "chkAdvance",
                               view: "checkbox",
                               label: "Advance",
                               labelAlign: "left",
                               labelWidth: 70, inputWidth: 120,
                               minWidth: 120,
                           },
                           {
                               id: "ChkZerobill",
                               view: "checkbox",
                               label: "Zero Bills",
                               labelAlign: "left",
                               labelWidth: 70, inputWidth: 150,
                               width: 120, minWidth: 120,
                           },
                       ]
                   },
                   {
                       height:10,
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
                       spans: true,
                       height:450,
                       navigation: true,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [
                               { id: "ixHBillNo", header: '',hidden:true,  },
                               { id: "ixUser",header: [{text:'User',height:34}],  width: 150,css: { 'text-align': 'left ! important', },},
                               { id: "ixBillNo", header: ['Bill No.', ], width: 120,css: { 'text-align': 'center ! important', },},                    
                               { id: "CLR", header: { text: "CLR", }, hidden:true },

                       ],
                       data: [],
                       scheme: {
                           $init: function (item) {
                               if (item.CLR != "" && item.CLR != null) {
                                   var Columns = $$('gridRpt').config.columns;
                                   var ColCnt = Columns.length;
                                   if (item.CLR == "GrpHead") {
                                       debugger;
                                       $$("gridRpt").addSpan(item.id, "ixUser", ColCnt, 1, null, "GrpHead");
                                       $$("gridRpt").refresh();
                                   }
                                   else item.$css = item.CLR;
                               }
                           },
                           $export: function (obj) {
                               debugger;
                               var item = webix.copy(obj);

                               $.each(item, function (key, value,id) {
                                   debugger;
                                   var ColIndex = $$("gridRpt").getColumnIndex(key);
                                   if(ColIndex>1 && key!="#TIME#" && key!="#NARR#")
                                   {
                                       var vAmt = item[key];
                                       if (vAmt != null && vAmt != undefined) {
                                           var vAmt1 = vAmt.replace(",", ""); vAmt1 = vAmt1.replace(",", ""); vAmt1 = vAmt1.replace(",", ""); vAmt1 = vAmt1.replace(",", "");
                                           vAmt1 = vAmt1.replace(",", ""); vAmt1 = vAmt1.replace(",", "");
                                           vAmt1 = parseFloat(vAmt1);
                                           item[key] = vAmt1;
                                       }
                                   }
                               });
                               return item;
                   
                        
                           }
                       },
                   }
                ]
            }
        ]
    }
});

function loadUser() {
    //get drpdwnlist based on the selection
    CompId =$("#hdnCompId").val();
    Request = {
        PROGNAME: "DrpDwnLoad",
        REQ_ID: "LoadDropDownForBQSettlement",
        COMPID: CompId,
    }

    var rowData = [];
    var options = [];

    requestData = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                options = rowData.drpdwnlst
            }
        }
    });
    return options;
};


function fnExcelExport() {
    debugger;
    var vHeader = @Html.Raw(Json.Encode(ViewBag.Title));
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
        alert("Records not present in Report");
    }
};

function fnGridPrint() {
    debugger;
    var vHeader =  @Html.Raw(Json.Encode(ViewBag.Title));
    var FullData = "";

    FullData = $$("gridRpt").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("gridRpt"), {
            docHeader: { text: vHeader, fontSize: 25,textAlign:"center",  color:0x663399},
            fit: "page",
            style:true,
            scroll: false,
            mode: "landscape"
        });
    }
    else {
        alert("Records not present in Report");
    }
};


function fnChkCancelledClick() {
    $$("gridRpt").clearAll();
    if ($$("chkCancelled").getValue() == 1) $$("gridRpt").showColumn("ixStatus");
    else $$("gridRpt").hideColumn("ixStatus");
};

function fnChkSettClick() {
    debugger;
    $$("gridRpt").clearAll();

    var SettleDet = $$("chkSett").getValue();
    if (SettleDet == 0) {
        $$("chkTips").hide();
        $("#Tips").val(0);

    }
    else {
        $("#Tips").val(0);
        $$("chkTips").show();
    }
    fnHeader();
};

function fnLoadGrid() {
    debugger;
    $$("gridRpt").clearAll();
    fnHeader();
    $("#loading").show();

    
    var fromDate = $$("txtFrmDate").getText();
    var toDate = $$("txtToDt").getText();
    var txtFrmDate = $$("txtFrmDate").getText();
    var user = $$("ddlUser").getValue();

    if (user == "<-ALL->") user = "";

   
    debugger;
    Request = {
        PROGNAME: "LoadBQSettlementNew",
        COMPID: $("#hdnCompId").val(),
        advanceChk: $$("chkAdvance").getValue(),
        ZeroChk: $$("ChkZerobill").getValue(),
        chkDateRange: $$("ChkDtRange").getValue(),
        user: user,
        fromDate: fromDate,
        toDate: toDate,
        txtFrmDate: txtFrmDate,

    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridRpt").parse(rowData);
                $$("gridRpt").adjustRowHeight("#NARR#", true);
                $$("gridRpt").refresh();
                $("#loading").hide();
            }
            else {
                $("#loading").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#loading").hide();
        }
    });
};

function fnSuppressBlank() {
    debugger;
    var vColumn = $$("gridRpt").config.columns;
    var vColCnt = vColumn.length;
    var vData = $$("gridRpt").serialize();
    for (var i = 0; i < vColumn.length; i++) {
        var ColumnId = vColumn[i].id;
        var newData = vData.filter(function (el) {
            return el[ColumnId] != "" && el[ColumnId] != undefined && el[ColumnId] != null;
        });
        if (newData.length == 0) {
            $$("gridRpt").hideColumn(ColumnId);
            i = i - 1;
        }

    }

};

function fnHeader() {
    debugger;

    $$("gridRpt").destructor();
    var vCmpId = $("#hdnCompId").val();
    var vColumn = $$("gridRpt").config.columns;
    debugger;
    Request = {
        PROGNAME: "BQLoadSettleHeader",
        COMPID: $("#hdnCompId").val(),
        FrmDt: $$("txtFrmDate").getText(),
        txtToDt: $$("txtToDt").getText(),
        txtFrmDateDt: $$("txtFrmDate").getText(),
        DtRnge: $$("ChkDtRange").getValue(),
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    var vHide = false;
    try {
        $.ajax({
            async: false,
            type: "POST",
            url: "/BQReports/COMAPI_CALL",
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                rowData = JSON.parse(d);
                var dtGrp = rowData.dtGrp;
                var set = {};
                var vWidth = 100;
                if (dtGrp.length > 0) {
                    $.each(dtGrp, function (key, value) {
                        //debugger;
                        var vId = value.SETL_MODE_ID.toString().trim();
                        var Hdr = value.SETL_MODE_NM.toString();
                        var vCss = "";
                        var ColVal = [];
                        ColVal = Hdr.split(' ');
                        if (ColVal.length > 1 && Hdr.length > 10) {
                            vCss = "multiline";
                        }
                        set = {
                            id: vId, header: [{ text: Hdr, css: vCss }], width: vWidth, css: { 'text-align': 'right ! important' },
                            exportType: "number", exportFormat: "#,##0.00",
                        };

                        vColumn.push(set);

                    });
                    //vHide=false;
                    ////if(chkTotVal==0) vHide=true;
                    //set = {
                    //    id: "#GRPTOT#", header: [{text: "Total Value",}], width: vWidth, css: { 'text-align': 'right ! important' },
                    //    exportType: "number",  hidden:vHide,exportFormat: "#,##0.00",                            
                    //};
                    //vColumn.push(set);
                }



                var set = {
                    id: "#TIPS#", header: [{ text: "Tips", }], width: vWidth, css: { 'text-align': 'right ! important' },
                    exportType: "number", hidden: vHide, exportFormat: "#,##0.00",
                };
                vColumn.push(set);

                var set = {
                    id: "#PAYABLEAMT#", header: [{ text: "Payable Amt", }], width: vWidth, css: { 'text-align': 'right ! important' },
                    exportType: "number", hidden: vHide, exportFormat: "#,##0.00",
                };
                vColumn.push(set);

                var set = {
                    id: "#BILLAMT#", header: [{ text: "Bill Amt", }], width: vWidth, css: { 'text-align': 'right ! important' },
                    exportType: "number", exportFormat: "#,##0.00",
                };
                vColumn.push(set);

                var set = {
                    id: "#PAIDOUT#", header: [{ text: "Paidout", }], width: vWidth, css: { 'text-align': 'right ! important' },
                    exportType: "number", exportFormat: "#,##0.00",
                };
                vColumn.push(set);

                vHide = false;
                //if(chkUser==0) vHide=true;
                var set = {
                    id: "#ADVANCE#", header: [{ text: "Advance", }], width: vWidth, css: { 'text-align': 'right ! important' },
                    exportType: "number", exportFormat: "#,##0.00",
                    hidden: vHide
                };
                vColumn.push(set);

                vHide = false;
                //var SettleDet = $$("chkSett").getValue();
                //if(SettleDet==0) vHide=true;
                var set = {
                    id: "#TIME#", header: [{ text: "Time", }], width: 50, css: { 'text-align': 'left ! important' },
                    hidden: vHide
                };
                vColumn.push(set);

                vHide = false;
                var set = {
                    id: "#NARR#", header: [{ text: "Narration", }], width: 300, css: { 'text-align': 'left ! important' },
                    hidden: vHide,
                };
                vColumn.push(set);

                vHide = true;
                var set = {
                    id: "#HIDDEN#", header: [{ text: "Hidden", }], width: 300, css: { 'text-align': 'left ! important' },
                    hidden: vHide
                };
                vColumn.push(set);


                $$("gridRpt").refreshColumns();
            }

        });
    }
    catch (e) {
        console.log(e.message)
    }
};

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
function formatDate(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
}
function fntxtFrmDateChange() {
    debugger;
    $$("gridRpt").clearAll();
    var NewDt = $$("txtFrmDate").getValue();
    var NewtxtToDt = $$("txtToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        if (NewtxtToDt != null && NewtxtToDt != "") {
            NewtxtToDt = NewtxtToDt.substring(0, 10);
            NewtxtToDt = NewtxtToDt.replace(/-/g, '');
            NewtxtToDt = parseFloat(NewtxtToDt);
            if (NewtxtToDt < NewDt) {
                $$("txtToDt").setValue($$("txtFrmDate").getValue());
            }
        }
    }
}

function fntxtToDtChange() {
    debugger;
    $$("gridRpt").clearAll();
    var NewDt = $$("txtFrmDate").getValue();
    var NewtxtToDt = $$("txtToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        if (NewtxtToDt != null && NewtxtToDt != "") {
            NewtxtToDt = NewtxtToDt.substring(0, 10);
            NewtxtToDt = NewtxtToDt.replace(/-/g, '');
            NewtxtToDt = parseFloat(NewtxtToDt);
            if (NewtxtToDt < NewDt) {
                $$("txtFrmDate").setValue($$("txtToDt").getValue());
            }
        }
    }
}




$('#enableDateRange').change(function () {
    $$("gridRpt").clearAll();
    if ($(this).prop('checked')) {
        $('#divtxtFrmDateDt').hide();
        $('#F_T').show();
    }
    else {
        $('#divtxtFrmDateDt').show();
        $('#F_T').hide();
    }
});

$('#advance').change(function () {
    $$("gridRpt").clearAll();
});

$('#zero').change(function () {
    $$("gridRpt").clearAll();
});

function dateValidation() {
    var etxtFrmDate = $("#from").val();
    var etxtToDt = $("#to").val();
    var efdate = new Date(etxtFrmDate.split('/')[2], etxtFrmDate.split('/')[1] - 1, etxtFrmDate.split('/')[0]);
    var etdate = new Date(etxtToDt.split('/')[2], etxtToDt.split('/')[1] - 1, etxtToDt.split('/')[0]);
    if (efdate > etdate) {
        $('#fErr').text('From Date can not be greater than To date');
        return false;
        $("#divTheme").removeClass("pagefalse");
        $("#pageload").hide();
    }
    else {
        $('#fErr').text(' ');
        return true;
    }
}

