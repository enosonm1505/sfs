
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
        url: "/MaterialCtrl/MPAPI_CALL",
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
        url: "/MaterialCtrl/MPAPI_CALL",
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
