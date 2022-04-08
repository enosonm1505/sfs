

var PageLoad = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 

        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
          
            if (Detemp.Itm[0].MU_TAX == "1") {
                $("#divVat").show();
            }
            else {
                $("#divVat").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


var ItmLoad = function (Request, ItmID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["GrdID"] = ItmID;
    reqobj["PopId"] = "BQTGRP";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            PopId = "";
            // //debugger;
            var Contorl_lists = [];
            Contorl_lists = CtrlId;
            var Detemp = JSON.parse(d);
            $.each(Detemp.Itm[0], function (key, Value) {
                $.each(Contorl_lists, function (key1, Value1) {
                    var dataid = Value1.Dataids;
                    //debugger;
                    if (dataid == key) {
                        if (Value1.Type == 'text')
                            $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                            ddl.value(Detemp.Itm[0][dataid]);
                        }

                        if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
                            if (Detemp.Itm[0][dataid] == "1")
                                $("#" + Value1.Id)[0].checked = true;
                            else
                                $("#" + Value1.Id)[0].checked = false;
                        }
                    }
                    
                });
            });
            debugger;
            
                if (Detemp.Itm[0]['A_IND'] == "1")
                    $("#chkFood")[0].checked = true;
                else if (Detemp.Itm[0]['A_IND'] == "2")
                    $("#chkChngGrp")[0].checked = true;

            
                if (Detemp.Itm[0]['COVER_IND'] == "1")
                    $("#chkCoverAnlys")[0].checked = false;
                else if (Detemp.Itm[0]['COVER_IND'] == "2")
                    $("#chkAppBudget")[0].checked = true;
                else
                    $("#chkCoverAnlys")[0].checked = true;
            
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


var ItmSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["ListData"] = controlValue;

    if ($("#chkFood")[0].checked == true)
        reqobj["A_IND"] = "1";
    else if ($("#chkChngGrp")[0].checked == true)
        reqobj["A_IND"] = "2";
    else reqobj["A_IND"] = null;

    if ($("#chkAppBudget")[0].checked == true)
        reqobj["COVER_IND"] = "2";
    else if ($("#chkCoverAnlys")[0].checked == true)
        reqobj["COVER_IND"] = null;
    else
        reqobj["COVER_IND"] = "1";


    if (Request.Mode == "NEW")
        reqobj["ID"] = $("#txtGrp").val();
    else
        reqobj["ID"] = $("#ddlGrp").val();

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