
var EvnTyLoad = function (Request, EvnTyID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["EvnTyID"] = EvnTyID;
   
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            debugger;
            var Detemp = JSON.parse(d);
            $("#txtEvnTyNm").val(Detemp.EvnTy[0].E_NM);
            $("#txtSeqNo").val(Detemp.EvnTy[0].A_IND);
            if (Detemp.EvnTy[0].A_IND == "1")
                $("#chkActv")[0].checked = false;
            else
                $("#chkActv")[0].checked = true;

            if ($.trim(Detemp.EvnTy[0].BACK_CLR) != undefined && $.trim(Detemp.EvnTy[0].BACK_CLR) != '')
                $("#divColor").data("kendoColorPicker").value("#" + $.trim(Detemp.EvnTy[0].BACK_CLR));
            else
                $("#divColor").data("kendoColorPicker").value("#ff0000");
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var EvnTySave = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["EvnTyNm"] = $("#txtEvnTyNm").val().trim();
    if (Request.Mode == "OPEN")
        reqobj["EvnTyID"] = $("#ddlEvnTy").val();
    else
        reqobj["EvnTyID"] = $("#txtEvnTy").val().trim();

    if ($("#chkActv")[0].checked == true)
        reqobj["A_IND"] = null;
    else
        reqobj["A_IND"] = '1';

    reqobj["BACK_CLR"] = $("#divColor").val();

        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);

            if (Detemp == "SUCCESS") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/SaveImage.png');
                $("#AlertPoptxt").text("Saved Sucessfully.");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").show();
                $("#btnpopAlertcan").hide();
            }
            else if (Detemp == "FAILURE" || Detemp == "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text("Operation Failed!");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
            else if (Detemp != "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text(Detemp);
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
        }
    });
}