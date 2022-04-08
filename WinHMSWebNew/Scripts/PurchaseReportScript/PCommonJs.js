function fnLoadProperty()
{
    debugger;
    var dataProp = fnPropertyLoad();
    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();
    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
       // label: "Property",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    //dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseReports/MPAPI_CALL",
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

function fnMstCompany() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Controllers/MPAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

var SingleDropdownLoadGrid = function (DivId, Request) {
    //debugger;
    var ddlgrid
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;

    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ddlgrid = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};
var DropdownLoad = function (DivId, Request) {
    var ddlgrid = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;
    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ddlgrid = JSON.parse(d);
           
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};
