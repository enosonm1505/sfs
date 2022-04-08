
var SplitVnuLoad = function (Request, SplitVnuID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["SplitVnuID"] = SplitVnuID;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/BQMaster/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            $("#txtSplitVnuNm").val(Detemp.SplitVnu[0].SV_NM);
            $("#txtSeqNo").val(Detemp.SplitVnu[0].SEQ_NO);
            if (Detemp.SplitVnu[0].A_IND == "" || Detemp.SplitVnu[0].A_IND == null)
                $("#chkActv")[0].checked = true;
            else
                $("#chkActv")[0].checked = false;
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var SplitVnuSave = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["SplitVnuNm"] = $("#txtSplitVnuNm").val().trim();
    reqobj["SeqNo"] = $("#txtSeqNo").val().trim();
    if (Request.Mode == "OPEN")
        reqobj["SplitVnuID"] = $("#ddlSplitVnu").val();
    else
        reqobj["SplitVnuID"] = $("#txtSplitVnu").val().trim();

    if ($("#chkActv")[0].checked == true)
        reqobj["A_IND"] = null;
    else
        reqobj["A_IND"] = 1;

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