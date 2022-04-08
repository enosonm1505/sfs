
var NcKotTyLoad = function (Request, NcKotTyID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["NcKotTyID"] = NcKotTyID;
   
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            $("#txtNcKotTyNm").val(Detemp.NcKotTy[0].N_NM);
            $("#txtSeqNo").val(Detemp.NcKotTy[0].A_IND);
            $("#txtShtNm").val(Detemp.NcKotTy[0].S_NM);
            if (Detemp.NcKotTy[0].A1_IND == "1")
                $("#chkActv")[0].checked = false;
            else
                $("#chkActv")[0].checked = true;
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var NcKotTySave = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["NcKotTyNm"] = $("#txtNcKotTyNm").val().trim();
    reqobj["SeqNo"] = $("#txtSeqNo").val().trim();
    if (Request.Mode == "OPEN")
        reqobj["NcKotTyID"] = $("#ddlNcKotTy").val();
    else
        reqobj["NcKotTyID"] = $("#txtNcKotTy").val().trim();

    if ($("#chkActv")[0].checked == true)
        reqobj["A1_IND"] = null;
    else
        reqobj["A1_IND"] = 1;

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