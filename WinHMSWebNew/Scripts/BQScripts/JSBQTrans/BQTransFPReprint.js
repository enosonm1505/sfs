
var app = angular.module('BQTApp', ['webix']);

app.controller("BQTransController", function ($scope) {
  
    $("#LoadDIv").hide();

    var Reserve = [{ "id": "P", "value": "Pending" }, { "id": "C", "value": "Completed" }, { "id": "CN", "value": "Cancelled" }, ];

    fnAccountDt();
    loadControl();
    $scope.frmBQTransFPReprint= {
        id: "frmBQTransFPReprint",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               view: "richselect",
                               id: "ddlReserve",
                               label: " Reservation",
                               labelAlign: "Left",
                               labelWidth: 80,
                               inputWidth: 260,
                               width: 280,
                               minWidth: 280,
                               options: Reserve,
                               value:"P",
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
                                           $$("txtFrmDate").show();
                                           $$("txtToDt").show();
                                       }
                                       else {
                                           $$("txtFrmDate").hide();
                                           $$("txtToDt").hide();
                                       }
                                   }
                               }
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
                                 hidden: true,
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
                                 width: 180, hidden: true,
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
                                          fnLoadGrid();
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
                       id: "gridMain",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       editable: true,
                       height: 460,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [

                               { id: "ixFPNo", header: 'F.P.No', width: 70, css: { 'text-align': 'center ! important', }, },
                               { id: "ixRes", header: ['Res#', { content: "textFilter", }], width: 70, css: { 'text-align': 'center ! important', }, },
                               { id: "ixGType", header: 'Type', width: 90, },
                               { id: "ixGnm", header: ['Guest/Company', { content: "textFilter", }], width: 230, },
                               { id: "ixFDt", header: { text: "FunctionDt", }, width: 90, css: { 'text-align': 'center ! important', } },
                               { id: "ixVenue", header: 'Venue', width: 100, },
                               { id: "ixSess", header: 'Session', width: 100, },
                               { id: "ixPax", header: 'Pax', width: 80, css: { 'text-align': 'right ! important;', }, },
                               { id: "ixrate", header: 'Rate', width: 90, css: { 'text-align': 'right ! important;', }, numberFormat: "111.00", },
                               { id: "ixBill", header: { text: "Bill Print", }, width: 90, css: { 'text-align': 'center ! important', } },
                               {
                                   id: "ixSel", header: "Select", editor: "Checkbox", width: 50, css: { 'text-align': 'center ! important', 'padding': '0px ! important', },
                                   template: function (obj, common, value, config) {
                                       // debugger;
                                       if (obj.ixGrpFirst == 1) return common.checkbox(obj, common, value, config);
                                       else return "";
                                   },
                               },
                               { id: "ixvid", header: 'VenueId', hidden: true, },
                               { id: "ixsid", header: 'SessionId', hidden: true, },
                               { id: "ixHidRes", header: 'ResNo', hidden: true, },
                               { id: "ixHiddenFpNo", header: 'SingleSel', hidden: true, },
                               { id: "ixGrpFirst", header: 'GrpFirst', hidden: true, },

                       ],
                       data: [],
                       on: {
                           'onCheck': function (rowId, col, status) {
                               debugger;
                               if (col == 'ixSel') {
                                   debugger;
                                   if (status == '1') {
                                       this.eachRow(function (row) {
                                           if (row != rowId) {
                                               var SelRow = this.getItem(row);
                                               SelRow.ixSel = "0";
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

function loadControl() {
    debugger;
    Request = {
        PROGNAME: "FNLOADCONTROL",
        COMPID: $("#hdnCompId").val(),
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);

                if (rowData[0].FP_PROG_NM) window.FP_PROG_NM = rowData[0].FP_PROG_NM;

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

};

function fnMandatory() {
    debugger;
    var vFrmDt = $$("txtFrmDate").getValue();
    var vToDt = $$("txtToDt").getValue();

    if (vFrmDt == "") {
        webix.message({ type: 'warning', text: 'From Date can not be empty' });
        webix.UIManager.setFocus($$("txtFrmDate"));
        return false;
    }

    if (vToDt == "") {
        webix.message({ type: 'warning', text: 'To Date can not be empty' });
        webix.UIManager.setFocus($$("txtToDt"));
        return false;
    }

    vFrmDt = vFrmDt.substring(0, 10);
    vToDt = vToDt.substring(0, 10);

    vFrmDt = vFrmDt.replace('-', '');
    vFrmDt = vFrmDt.replace('-', '');
    vFrmDt = parseFloat(vFrmDt);

    vToDt = vToDt.replace('-', '');
    vToDt = vToDt.replace('-', '');
    vToDt = parseFloat(vToDt);
    if (vFrmDt > vToDt) {
        webix.message({ type: 'warning', text: 'From Date cannot be greater than To Date' });
        webix.UIManager.setFocus($$("txtFrmDate"));
        return false;
    }

    return true;
};

function fnLoadGrid() {
    debugger;
    $$("gridMain").clearAll();

    if ($$("ChkDtRange").getValue() == 1) {
        if (fnMandatory() == false) return false;
    }
    $("#LoadDIv").show();

    var vFrmDt = $$("txtFrmDate").getValue();
    var vToDt = $$("txtToDt").getValue();

    if (vFrmDt != "") vFrmDt = vFrmDt.substring(0, 10);
    if (vToDt != "") vToDt = vToDt.substring(0, 10);

    debugger;

    Request = {
        PROGNAME: "FNFPPRINTGRDLOAD",
        COMPID: $("#hdnCompId").val(),
        vStatus: $$("ddlReserve").getValue(),
        vChkDtRnge: $$("ChkDtRange").getValue(),
        vFrmDt: vFrmDt,
        vToDt: vToDt,
    }

    var rowData = [];

    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridMain").parse(rowData.gridMain);
                $$("gridMain").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#LoadDIv").hide();
        }
    });
};

function fnCallPrint() {
    debugger;
    $("#LoadDIv").show();
    var data = $$("gridMain").serialize();
    var lenval = data.length;
    var bVal = false;
    var PrintFlNm = "";

    var PrinRt = "1";

    var newData = data.filter(function (el) {
        return el.ixSel == 1;
    });
    if (newData.length == 0) {
        webix.message({ type: 'warning', text: "Atleast one row has to be selected" });
        $("#LoadDIv").hide();
        return false;
    }
    debugger;
    PrintFlNm = window.FP_PROG_NM;

    if (PrintFlNm == "") {
        webix.message({ type: 'warning', text: "Print Program not defined" });
        $("#LoadDIv").hide();
        return false;
    }
    RowLen = newData.length;
    for (var i = 0; i < RowLen; i++) {
        var NewId = newData[i].id;
        // debugger;
        var SelRow = $$("gridMain").getItem(NewId);
        var vSel = SelRow.ixSel;
        var vResNo = SelRow.ixHidRes.toString().trim();
        var vFpNo = SelRow.ixHiddenFpNo.toString().trim();
        var rowData = [];
        var vSesId = SelRow.ixsid;
        var vVenID = SelRow.ixvid;
        var CompId = $("#hdnCompId").val().toString().trim();

        var Host = window.location.host;
        var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";


        var Mleft = (screen.width / 2) - (840 / 2);
        var Mtop = (screen.height / 2) - (550 / 2);
        window.open(PageUrl + "?RESERVENO=" + vResNo + "&FBNO=" + vFpNo + "&PRINTRATE=" + PrinRt + "&COMPID=" + CompId + "&RPT=" + "BQFP", "_blank", "width=840px,height=550,scrollbars=yes,top=\"" + Mtop + "\,left=\"" + Mleft + "\"", 0);



    }
    $("#LoadDIv").hide();

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

function fnFromDtChange() {
    debugger;
    $$("gridMain").clearAll();

    var NewDt = $$("txtFrmDate").getValue();
    var NewToDt = $$("txtToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("txtToDt").setValue($$("txtFrmDate").getValue());
            }
        }
    }

}

function fnToDtChange() {
    debugger;
    $$("gridMain").clearAll();
    var NewDt = $$("txtFrmDate").getValue();
    var NewToDt = $$("txtToDt").getValue();
    if (NewDt != null && NewDt != "") {
        NewDt = NewDt.substring(0, 10);
        NewDt = NewDt.replace(/-/g, '');
        NewDt = parseFloat(NewDt);

        if (NewToDt != null && NewToDt != "") {
            NewToDt = NewToDt.substring(0, 10);
            NewToDt = NewToDt.replace(/-/g, '');
            NewToDt = parseFloat(NewToDt);
            if (NewToDt < NewDt) {
                $$("txtFrmDate").setValue($$("txtToDt").getValue());
            }
        }
    }
}

function sidebarFn() {
    $$("frmBQTransFPReprint").resize();
    $$("frmBQTransFPReprint").adjust();
    $$("gridMain").resize();
    $$("gridMain").adjust();
}
