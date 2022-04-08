
function PrcDisplayToupDet() {
    //debugger;
    var Table = {};
    Table["REQTYPE"] = "CCTOPUPDETAILS";
    Table["FromDt"] = "02/10/2018";//$("#txtReqFDt").val();
    Table["ToDt"] = "02/10/2018";
    Table["vType"] = "";
    Table["GroupBy"] = "";
    Table["ChkGroup"] = "";
    
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/CCReports/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var result = $.parseJSON(data);
        }
    });
}