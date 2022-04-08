var app = angular.module('ARTApp', ['webix']);

app.controller("ARTransController", function ($scope) {

    var dataProp = fnPropertyLoad();
    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        labelAlign: "Right",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                debugger;
                //var VPostDt = fnPageLoad();
                //$$("txtARPosting").setValue(VPostDt);
                $("#hdnCompId").val(newval);

                var VPostDt = fnPageLoad();
                $$("txtARPosting").setValue(VPostDt);
            }
        }
    }
    

    var VPostDt = fnPageLoad();
    //debugger;
    $scope.txtARPosting = {
        view: "datepicker",
        id: "txtARPosting",
        disable: true,
        stringResult: true,
        readonly: true,
        label: "AR Posting for",
        format: "%d/%m/%Y",
        value:VPostDt,
        labelWidth: 135,
    };

    $scope.txtNoRecCreated = {
        view: "text",
        id: "txtNoRecCreated",
        placeholder: "",
        label: "No of Records Created",
        labelWidth: 135,
    };

}); 

function fnPageLoad() {
    debugger;
    var dataparam = {};
    var rowData = "";
    var PostDt = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["REQTYPE"] = "GET_ARCONTROL";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                PostDt = rowData[0].Last_Na_Post_Dt1;
            }
        },
    });
    return PostDt
}

function fnPropertyLoad() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCompId").val("WS");
            }
        },
    });
    return rowData;
}

function fnNAArPosting() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["REQTYPE"] = "GET_NATOARPOSTING";
    dataparam["PostDt"] = $$("txtARPosting").getValue();
    
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") var VPostDt = fnPageLoad();
                $$("txtARPosting").setValue(VPostDt);
                rowData = JSON.parse(d);

            if ($.trim(rowData) == "True") {
               
                $$("txtNoRecCreated").setValue("");
                alert('Updated Successfully');
            }
            else {
                alert(rowData);
            }
        },
    });
    return rowData;
}
