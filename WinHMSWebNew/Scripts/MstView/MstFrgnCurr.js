
var FCLoad = function (Request, FCID, Glurl, CtrlId) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = FCID;
    reqobj["IDTY"] = $("#ddlFCItmTy").val();
    
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
            $.each(Detemp.Itm[0], function (key, Value) {
                $.each(Contorl_lists, function (key1, Value1) {
                    var dataid = Value1.Dataids;

                    if (dataid == key) {
                        if (Value1.Type == 'text')
                            $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                            //debugger;
                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                            ddl.value(Detemp.Itm[0][dataid]);
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

            var grid = $("#Grid").data("kendoGrid");
            grid.dataSource.data(Detemp.Itm);
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}
var FCSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = $("#ddlFC").val();
    reqobj["IDTY"] = $("#ddlFCItmTy").val();
    reqobj["ListData"] = $("#Grid").data("kendoGrid").dataSource.data();
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
                $("#Grid").data("kendoGrid").dataSource.data("");
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


var Grid = function () {
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { validation: { required: true }, type: "string" },
                    NM: { type: "string", editable: false },
                    IT_RATE: { type: "string" },
                    C_BY: { type: "string" },
                    C_DT: { type: "string" },
                }
            }
        },
    });

    $("#Grid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "NM", title: 'Name', width: 70, attributes: { style: "text-align:left" }},
            { field: "IT_RATE", title: 'Rate', width: 40, attributes: { style: "text-align:left" } },
        ],
        //header
        editable: true,
    });
}