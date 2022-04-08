
var EmpCatTyLoad = function (Request, EmpCatTyID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["EmpCatID"] = EmpCatTyID;
    reqobj["EmpCatSrc"] = $("#ddlEmpCatSrc").val();
        
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            $("#txtEmpCatTyNm").val(Detemp.EmpCat[0].EMP_NM);
            $("#chkYes")[0].checked = false;
            $("#chkNo")[0].checked = false;
            if (Detemp.EmpCat[0].ACTIVE_IND == "1")
                $("#chkYes")[0].checked = true;
            else
                $("#chkNo")[0].checked = true;
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var EmpCatTyIdLoad = function (Request, EmpCatSrc, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["EmpCatSrc"] = EmpCatSrc;
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            var ddlEmpCatTy = $("#ddlEmpCatTy").data("kendoDropDownList");
            ddlEmpCatTy.dataSource.data(Detemp.EmpCat);
            ddlEmpCatTy.refresh();

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var EmpCatTySave = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["EmpCatSrc"] = $("#ddlEmpCatSrc").val()
    reqobj["EmpCatTyNm"] = $("#txtEmpCatTyNm").val().trim();
  
    if (Request.Mode == "OPEN")
        reqobj["EmpCatID"] = $("#ddlEmpCatTy").val().trim();
    else
        reqobj["EmpCatID"] = $("#txtEmpCatTy").val().trim();

    if ($("#chkYes")[0].checked == true)
        reqobj["A_IND"] = 1;
    else
        reqobj["A_IND"] = null;

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