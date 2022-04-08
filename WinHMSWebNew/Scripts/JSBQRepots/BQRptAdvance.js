
var app = angular.module('BQTApp', ['webix']);

app.controller("BQReportsController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();
    $scope.frmBQAdvance = {
        id: "frmBQAdvance",
        view: 'form',
        minWidth: 1250,
        height: 550,
        elements: [{
            paddingX: 20,
            scroll: true,
            rows: [{
              
                cols: [{
                    minWidth: 250,
                }, {
                        view: "datepicker",
                        id: "txtDate",
                        stringResult: true,
                        label: "Date",
                        format: "%d/%m/%Y",
                        labelAlign: "Right",
                        labelWidth: 40,    
                        inputWidth: 160,
                        width: 160,
                        minWidth: 160,
                        value: $("#hdnCurrentDt").val(),
                    }, {
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
                         labelWidth: 100, inputWidth: 50,
                         width: 1250, minWidth: 450,
                     },
                    ]
            },
             {
                 height: 10,
             },
                {

                    id: "DisplayData",
                    container: "divGrid",
                    select: 'row',
                    view: "datatable",
                    fixedRowHeight: false,
                    rowLineHeight: 23,
                    autoConfig: true,
                    spans: true,
                    editable: true,
                    height: 430,
                    scroll: true,
                    minWidth: 900,
                    position: "flex",
                    css: "webix_header_border wingrd_hight",
                    data: [],
               
                    columns: [
                        { header: ["Bill No"], id: "TRN_NO", width: 100, css: { 'text-align': 'left ! important' } },
                        { header: ["Guest Type"], id: "Guest_Type_Nm", width: 200, css: { 'text-align': 'left ! important' } },
                         { header: ["Guest Name"], id: "Guest_Nm", width: 200, css: { 'text-align': 'left ! important' } },
                         { header: ["Amount"], id: "AMT", width: 200, css: { 'text-align': 'left ! important' } },
                         {
                             header: "Select", id: "CHK", editor: 'check', template: "{common.checkbox()}", minWidth: 200, css: { 'text-align': 'center ! important', 'height': '20px', 'minWidth': '20px', },
                            
                         },
                            
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
            },]
        }

});


function display() {
    debugger;
    $("#divTheme").addClass("pagefalse");
    $("#pageload").show();
    var dataparam = {};
    dataparam["PROGNAME"] = "LoadBQAdvanceRpt";
    dataparam["COMPID"] = $("#hdnCompId").val();
    fromDate = $$("txtDate").getText();
    if (fromDate == "") return;
    dataparam["fromDate"] = fromDate;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                SesssionData = rowData.data;
                if (SesssionData != "") {
                    rowData = d;
                    $$("DisplayData").clearAll();
                    $$("DisplayData").parse(rowData);
                    $$("DisplayData").refresh();
                }
            
            else {
                $$("DisplayData").clearAll();
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
function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}
function preview() {
    var reqobj = {};
    var PrintFlNm = "";
    PrintFlNm = window.C_NM;
    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }
    var data = $$("DisplayData").serialize();

    var newData = data.filter(function (el) {
        return el.CHK == 1;
    });
    debugger;
    var indx = "";
    var lenval = newData.length;
    if (lenval != 0) {
        MiscBillNo = newData[0].TRN_NO;
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
    window.open(PageUrl + "?MISCBILLNO=" + MiscBillNo + "&COMPID=" + CompId + "&RPT=" + "BQADV", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)
}

function fnGridPrint() {
    debugger;
    var vHeader = "Banquet Advance";
    var FullData = "";
    FullData = $$("DisplayData").serialize();
    var len = FullData.length;
    var newData = FullData.filter(function (el) {
        return el.CHK == 1;
    });
    if (newData.length > 0) {

        for (var i = 0; i < newData.length; i++) {
            webix.print($$("DisplayData"),
                {
                    docHeader: vHeader,
                    fontSize: 25,
                    textAlign: "left",
                    mode: "landscape",
                    fit: "data"
                });
        }
    }
    else {
        AlertMessage("Records not present in Report");
    }

};

function fnCallPrint(vMiscBillNo) {
    debugger;
    var PrintFlNm = "";
    PrintFlNm = window.C_NM;
    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }
    var data = $$("DisplayData").serialize();
    var newData = data.filter(function (el) {
        return el.CHK == 1;
    });
    debugger;
    var indx = "";
    var lenval = newData.length;
    
    if (lenval != 0) {
        MiscBillNo = newData[0].TRN_NO;
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
    window.open(PageUrl + "?MISCBILLNO=" + MiscBillNo + "&COMPID=" + CompId + "&RPT=" + "BQADV", "_blank", "width=840px,height=550,scrollbars=yes,top=" + Mtop + ",left=" + Mleft + "", 0)

};

function sidebarFn() {
    $$("frmBQAdvance").resize();
    $$("frmBQAdvance").adjust();
    $$("DisplayData").resize();
    $$("DisplayData").adjust();
}


function fnFromDtChange() {
    debugger;
    $$("DisplayData").clearAll();
    var bVal = "0";
    var NewDt = $$("txtDate").getValue();
    

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
                $$("txtDate").setValue(formatDate(Acc_Dt));
            }
        }

        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("txtDate").setValue($$("txtDate").getValue());
                bVal = "1";
            }
        }
    }
    if (bVal == "0") display();
}


function fnValidation() {
    debugger;
    var data = $$("DisplayData").serialize();
    var lenval = data.length;
    var bVal = true;
    if (lenval == 0) {
        return false;
    }
    var newData = data.filter(function (el) {
        return el.CHK == 1;
    });
    if (newData.length == 0) {
        webix.message({ type: 'warning', text: "Select Atleast one row" });
        return false;
    }
     RowLen = newData.length;
     webix.confirm({
         title: "Confirmation",
         ok: "Yes", cancel: "No",
         text: "Are you sure you want to Cancel?",
     }).then(function (result) {
         debugger;
         if (result == true) {

             for (var i = 0; i<RowLen; i++) {
                 debugger;
                 var NewId = newData[i].id;
                 // debugger;
                 var SelRow = $$("DisplayData").getItem(NewId);

                 var vSel = SelRow.CHK;
                 var rowData = [];
                 if (vSel == 1) {
                  

                     try {

                         Request = {
                             PROGNAME: "FNCHKKOTEXIST",
                             COMPID: $("#hdnCompId").val(),
                             vSesId: vSesId,
                             vVenID: vVenID,
                             vResNo: vResNo,

                         }
                         var rowData = [];
                         requestData = JSON.stringify(Request);
                         requestData = encodeURIComponent(requestData);
                         $.ajax({
                             async: false,
                             url: "/BQReports/COMAPI_CALL",
                             type: 'POST',
                             data: "request=" + requestData,
                             success: function (data) {
                                 debugger;
                                 if (data != "") {
                                     rowData = JSON.parse(data);
                                     if (rowData == "1") {
                                         webix.message({ type: 'warning', });
                                         $$("DisplayData").select(NewId);
                                         webix.UIManager.setFocus($$("DisplayData"));
                                         bVal = false;
                                     }
                                 }
                             },
                             error: function (request, status, error) {
                                 console.log("Error Failrue");
                             }
                         });
                         if (bVal == false) break;

                     }
                     catch (e) {
                         console.log(e.message)
                         $("#LoadDIv").hide();
                     }
                 }
             };
             if (bVal == false) return false;
             display();

         }
     });

   
}
