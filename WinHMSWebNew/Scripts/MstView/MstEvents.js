
var EventsLoad = function (Request, EventsID, Glurl, CtrlId) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = EventsID;
    
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //var Detemp = JSON.parse(d);
            var Contorl_lists = [];
            Contorl_lists = CtrlId;
            var Detemp = JSON.parse(d);
            if (Detemp.Itm.length > 0) {
                $.each(Detemp.Itm[0], function (key, Value) {
                    $.each(Contorl_lists, function (key1, Value1) {
                        var dataid = Value1.Dataids;

                        if (dataid == key) {
                            if (Value1.Type == 'text')
                                $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

                            if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                                //debugger;
                                var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                                var ddlVal = Detemp.Itm[0][dataid].trim()
                                ddl.value(ddlVal);
                            }

                            if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
                                if (Detemp.Itm[0][dataid] == "" || Detemp.Itm[0][dataid] == null)
                                    $("#" + Value1.Id)[0].checked = true;
                                else
                                    $("#" + Value1.Id)[0].checked = false;
                            }
                        }
                    });
                });
                $("#txtNarr").val(Detemp.Itm[0]["E_N"]);
            }
            else {
                $("#txtNarr").val("");
                ClearValues();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}
var EventsSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = $("#dateEvents").data("kendoDatePicker").value();
    reqobj["E_N"] = $("#txtNarr").val();
    //debugger;
    reqobj["ListData"] = controlValue;

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

