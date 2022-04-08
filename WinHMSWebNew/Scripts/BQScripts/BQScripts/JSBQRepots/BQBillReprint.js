
var app = angular.module('BQTApp', ['webix']);

app.controller("BQReportsController", function ($scope) {
  
    $("#LoadDIv").hide();

    fnAccountDt();
    $scope.frmBillReprint= {
        id: "frmBillReprint",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {minWidth:250,
                           },
                           {
                                 view: "datepicker",
                                 id: "txtFrmDate",
                                 stringResult: true,
                                 label: "From Dt",
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
                                 id: "txtToDt",
                                 disable: true,
                                 stringResult: true,
                                 label: "To Dt",
                                 format: "%d/%m/%Y",
                                 labelAlign: "Left",
                                 labelWidth: 40,
                                 inputWidth: 160,
                                 width: 180, 
                                 minWidth: 180,
                                 value: $("#hdnCurrentDt").val(),
                             },
                             {
                                  view: "button",
                                  id: 'btnDisplay',
                                  label: "Display", labelAlign: "left",
                                  minWidth: 100, width: 100,
                                  on: {
                                      onItemClick: function () {
                                          display();
                                      }
                                  }
                             },
                             {
                                 minWidth: 100,
                             },
                             {
                                 id: "ChkProvBill",
                                 view: "checkbox",
                                 label: "Province Bill",
                                 labelAlign: "left",
                                 labelWidth: 100, inputWidth: 150,
                                 width: 150, minWidth: 150,
                                 on: {
                                     "onChange": function () {
                                         display();
                                     }
                                 }
                             },
                             {
                                 minWidth: 500,
                             }
                       ]
                   },
                   {
                       height:10,
                   },
                   {
                       id: "billReprintGrid",
                       container: "divGrid",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       editable: true,
                       height: 460,
                       minWidth:900,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [
                           { header: "Bill Dt", id: "BILL_DT", minWidth: 90, css: { 'text-align': 'left ! important' } },
                           { header: ["Bill No", { content: "textFilter" }], id: "GS_BILL", minWidth: 90, css: { 'text-align': 'left ! important' } },
                           { header: "GuestTy", id: "GUEST_TYPE", minWidth: 90, css: { 'text-align': 'left ! important' } },
                           { header: ["Guest Name", { content: "textFilter" }], id: "GUEST_NM", minWidth: 300, css: { 'text-align': 'left ! important' } },
                           { header: "Reserve#", id: "RESERVE_NO", minWidth: 80, css: { 'text-align': 'left ! important' } },
                           {
                               header: "Bill Amount", id: "BILL_AMT", minWidth: 120, css: { 'text-align': 'right ! important' }, numberFormat: "111.00",
                           },
                           {
                               header: "PaidOuts", id: "ADJ_PAIDOUT_AMT", minWidth: 120, css: { 'text-align': 'right ! important' }, numberFormat: "111.00",
                           },
                           {
                                 header: "Advance", id: "ADJ_ADV_AMT", minWidth: 120, css: { 'text-align': 'right ! important' }, numberFormat: "111.00",
                            },
                            {
                                  header: "Payable Amt", id: "Payable_Amt", minWidth: 120, css: { 'text-align': 'right ! important' }, numberFormat: "111.00",

                            },
                            { header: "Select", id: "CHK", editor: 'check', template: "{common.checkbox()}", minWidth: 70, css: { 'text-align': 'center ! important', 'height': '20px', 'minWidth': '20px' } },
                            { header: "Bill No", id: "BILL_NO", minWidth: 90, css: { 'text-align': 'left ! important' }, hidden: true },
                            { header: "Guest", id: "BILL_TYPE", minWidth: 200, css: { 'text-align': 'left ! important' }, hidden: true },
                            { header: "Company", id: "forn_cur", minWidth: 200, css: { 'text-align': 'left ! important' }, hidden: true },
                       ],
                       data: [],

                       on: {
                           'onCheck': function (rowId, colId, status) {
                               debugger;
                               if (colId == 'CHK') {
                                   var getval = this.getItem(rowId);
                                   debugger;
                                   if (status == '1') {
                                       this.eachRow(function (row) {
                                           debugger;
                                           var SelRow = this.getItem(row);
                                           if (SelRow.id != rowId) {
                                               SelRow.CHK = "0";
                                               this.updateItem(row, SelRow);
                                           }
                                       });
                                       this.refresh();
                                   }
                               }
                           },
                       }
                   },
                ]
            }
        ]
    }
});

var SesssionData, Acc_Dt, Allow_Acc_Dt;
var bill_type = "", bill_no = "", disp_bill_no = "";

function preview() {
    var reqobj = {};


    var PrintFlNm = "";
    PrintFlNm = window.BILL_PROG_NM;
    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }

    var data = $$("billReprintGrid").serialize();

    var newData = data.filter(function (el) {
        return el.CHK == 1;
    });
    debugger;
    var indx = "";
    var lenval = newData.length;
    if (lenval != 0) {
        bill_type = newData[0].BILL_TYPE;
        bill_no = newData[0].BILL_NO;
        disp_bill_no = newData[0].DISP_BILL_NO;
    }
    else {
        webix.message({ type: 'warning', text: "Select Bill " });
        return;
    }

    var CompId = $("#hdnCompId").val().toString().trim();


    var Host = window.location.host;
    var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";
    var Mleft = (screen.width / 2) - (840 / 2);
    var Mtop = (screen.height / 2) - (550 / 2);
    window.open(PageUrl + "?BILLNO=" + bill_no + "&BillTy=" + bill_type + "&COMPID=" + CompId + "&RPT=" + "BQBILL", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)
}

function fnCallPrint(vBillNo) {
    debugger;
    var PrintFlNm = "";
    PrintFlNm = window.BILL_PROG_NM;
    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }

    var data = $$("billReprintGrid").serialize();

    var newData = data.filter(function (el) {
        return el.CHK == 1;
    });
    debugger;
    var indx = "";

    var lenval = newData.length;
    if (lenval != 0) {
        bill_type = newData[0].BILL_TYPE;
        bill_no = newData[0].BILL_NO;
        disp_bill_no = newData[0].DISP_BILL_NO;
    }
    else {
        webix.message({ type: 'warning', text: "Select Bill" });
        return false;
    }

    var CompId = $("#hdnCompId").val().toString().trim();
    var Host = window.location.host;
    var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";
    var Mleft = (screen.width / 2) - (840 / 2);
    var Mtop = (screen.height / 2) - (550 / 2);
    window.open(PageUrl + "?BILLNO=" + bill_no + "&BillTy=" + bill_type + "&COMPID=" + CompId + "&RPT=" + "BQBILL", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)


};

function fnGridPrint() {
    debugger;
    var vHeader = "Bill Reprint";
    var FullData = "";

    FullData = $$("billReprintGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("billReprintGrid"), {
            docHeader: vHeader,
            fontSize: 25,
            textAlign: "left",
            mode: "landscape",
            fit: "data"
        });
    }
    else {
        alert("Records not present in Report");
    }

};
function validateDate() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var etodt = $$("txtToDt").getText();
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
    var account_dt = new Date(Acc_Dt.split('/')[2], Acc_Dt.split('/')[0] - 1, Acc_Dt.split('/')[1]);
    if (Allow_Acc_Dt == "False") {
        if (efdate < account_dt) {
            AlertMessage('From Date can not be greater than Account date');//bq_bill_alert3

        }
        else if (efdate > etdate) {
            AlertMessage('From Date can not be greater than To date');//bq_bill_alert4

        }
        else {
            display();

        }
    }
    else {
        if (efdate > etdate) {
            AlertMessage('From Date can not be greater than To date');//bq_bill_alert4

        }
        else {
            display();

        }
    }
}

function acc_dt() {
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    var reqobj = {};
    reqobj["PROGNAME"] = "indicators";
    reqobj["COMPID"] = $("#hdnCompId").val();
    Acc_Dt = "";
    Allow_Acc_Dt = "";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                var Detemp = (JSON.parse(d));
                var ind = Detemp;
                if (ind.length > 0) {
                    Acc_Dt = ind[0].Account_dt1;
                    Allow_Acc_Dt = ind[0].AllowBkdt;
                    window.BILL_PROG_NM = ind[0].BILL_PROG_NM;
                }
            }
            else {
                $("#divTheme").removeClass("pagefalse");
                $("#pageload").hide();
            }
        }
    });
    $("#divTheme").removeClass("pagefalse");
    $("#pageload").hide();
}
function display() {
    debugger;
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    var reqobj = {};
    reqobj["PROGNAME"] = "LoadBQBillReprint";
    reqobj["COMPID"] = $("#hdnCompId").val();
    from = $$("txtFrmDate").getText();
    to = $$("txtToDt").getText();


    if (from == "") return;
    if (to == "") return;


    reqobj["from"] = from;
    reqobj["to"] = to;
    if ($$("ChkProvBill").getValue() == 1)
        reqobj["prov_bil"] = "1";
    else
        reqobj["prov_bil"] = "0";
    //reqobj["from"] = from.split('-')[1] + '/' + from.split('-')[0] + '/' + from.split('-')[2];
    // reqobj["to"] = to.split('-')[1] + '/' + to.split('-')[0] + '/' + to.split('-')[2];
    //reqobj["prov_bil"] = ($('#prov_bil').prop('checked') ? "1" : "0");

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                var Detemp = (JSON.parse(d));
                SesssionData = Detemp.data;
                if (SesssionData != "") {
                    rowData = d;
                    $$("billReprintGrid").clearAll();
                    $$("billReprintGrid").parse(rowData);
                    $$("billReprintGrid").refresh();
                    //document.getElementById("divShow").style.display = "";
                }
                else {
                    $$("billReprintGrid").clearAll();
                    AlertMessage("No Records Found");
                }
            }
            else {
                $$("billReprintGrid").clearAll();
                AlertMessage("No Records Found");
            }
        }
    });
    $("#divTheme").removeClass("pagefalse");
    $("#pageload").hide();
}
function SessionLoad(val) {
    debugger;
    var op1 = "";
    val2 = $$("txtFrmDate").getText();
    val2 = val2.split('/')[1] + '/' + val2.split('/')[0] + '/' + val2.split('/')[2];
    val3 = $$("txtToDt").getText();
    val3 = val3.split('/')[1] + '/' + val3.split('/')[0] + '/' + val3.split('/')[2];
    val4 = bill_type;
    var Paramval = JSON.stringify({ Values: val, from: val2, to: val3, bill_type: val4 });
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        cache: false,
        charset: 'utf-8',
        data: Paramval,
        url: "/BQReports/AssignSessionforBill",
        success: function (d) {
        }
    });
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

function formatDate(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
}

function fnFromDtChange() {
    debugger;
    $$("billReprintGrid").clearAll();
    var bVal = "0";
    var NewDt = $$("txtFrmDate").getValue();
    var NewToDt = $$("txtToDt").getValue();

    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        var vAcc_Dt = formatDate(Acc_Dt);
        vAcc_Dt = vAcc_Dt.substring(0, 10);
        vAcc_Dt = vAcc_Dt.replace(/-/g, '');
        vAcc_Dt = parseFloat(vAcc_Dt);

        if (Allow_Acc_Dt == "False") {

            if (NewDt < vAcc_Dt) {
                webix.message({ type: 'warning', text: 'Bill Date cannot be less than Account Date' });
                $$("txtFrmDate").setValue(formatDate(Acc_Dt));
            }
        }

        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("txtToDt").setValue($$("txtFrmDate").getValue());
                bVal = "1";
            }
        }
    }
    if (bVal == "0") display();
}

function fnToDtChange() {
    debugger;
    $$("billReprintGrid").clearAll();
    var bVal = "0";
    var NewDt = $$("txtFrmDate").getValue();
    var NewToDt = $$("txtToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        var vAcc_Dt = formatDate(Acc_Dt);
        vAcc_Dt = vAcc_Dt.substring(0, 10);
        vAcc_Dt = vAcc_Dt.replace(/-/g, '');
        vAcc_Dt = parseFloat(vAcc_Dt);

        if (Allow_Acc_Dt == "False") {

            if (NewDt < vAcc_Dt) {
                webix.message({ type: 'warning', text: 'Bill Date cannot be less than Account Date' });
                $$("txtToDt").setValue(formatDate(Acc_Dt));
            }
        }

        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("txtFrmDate").setValue($$("txtToDt").getValue());
                bVal = "1";
            }
        }
    }

    if (bVal == "0") display();
}

function sidebarFn() {
    $$("frmBillReprint").resize();
    $$("frmBillReprint").adjust();
    $$("billReprintGrid").resize();
    $$("billReprintGrid").adjust();
}