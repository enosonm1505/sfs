
var VnuGrpLoad = function (Request, VnuGrpID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["FormMode"] = Request.Mode;
    reqobj["VnuGrpID"] = VnuGrpID;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            $("#txtVnuGrpNm").val(Detemp.VnuGrp[0].G_NM);
            $("#txtSeqNo").val(Detemp.VnuGrp[0].S_N);
            $("#txtShtNm").val(Detemp.VnuGrp[0].SHRT_NM);
            if (Detemp.VnuGrp[0].A_IND == "" || Detemp.VnuGrp[0].A_IND == null)
                $("#chkActv")[0].checked = true;
            else
                $("#chkActv")[0].checked = false;

            var ddlOutletVnuGrp = $("#ddlOutletVnuGrp").data("kendoDropDownList");
            ddlOutletVnuGrp.value(Detemp.VnuGrp[0].O_ID);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var VnuGrpSave = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["VnuGrpNm"] = $("#txtVnuGrpNm").val().trim();
    reqobj["SeqNo"] = $("#txtSeqNo").val().trim();
    if (Request.Mode == "OPEN")
        reqobj["VnuGrpID"] = $("#ddlVnuGrp").val();
    else
        reqobj["VnuGrpID"] = $("#txtVnuGrp").val().trim();

    if ($("#chkActv")[0].checked == true)
        reqobj["A_IND"] = null;
    else
        reqobj["A_IND"] = 1;

    reqobj["OutId"] = $("#ddlOutletVnuGrp").val().trim();
    reqobj["SHRT_NM"] = $("#txtShtNm").val().trim();

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