function fnLoadProperty() {

    var dataProp = fnPropertyLoad();
    if ($$("Property"))
        $$("Property").destructor();

    webix.ui({
        view: "richselect",
        id: "Property",
        container: "divPropbox",
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
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Reports/FOAPI_CALL",
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

    window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = "";
    window.CURRENCY_DECIMLIMIT = "";

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOREPORTCOMPANY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Reports/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                var defdate = rowData[0].DEF_DT_FORMAT;
                var CURRENCY_FORMAT = rowData[0].CURRENCY_FORMAT;
                var CURRENCY_DELIMIT = rowData[0].CURRENCY_DELIMIT;
                var CURRENCY_DECIMLIMIT = rowData[0].VAL_DECIM_LIMIT;
                $("#HdnDEFDTFORMAT").val(defdate);
                $("#CURRENCY_FORMAT").val(CURRENCY_FORMAT);
                $("#CURRENCY_DELIMIT").val(CURRENCY_DELIMIT);
                $("#CURRENCY_DECIMLIMIT").val(CURRENCY_DECIMLIMIT);

            }
        },
    });

    return rowData;
}

function fnAccountDt() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_FRMMNTHTOMNTH";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Reports/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                var vCurrDt = rowData[0].CURRDT.toString().trim();
                var vAccDt = rowData[0].ACC_DT.toString().trim();
                $("#HdnCurrDt").val(vCurrDt);
                $("#HdnAccDt").val(vAccDt);
            }
        },
    });

    return rowData;
}

