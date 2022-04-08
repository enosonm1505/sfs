

var BillLoad = function (Request, BillID, Glurl, CtrlId) {
    
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["CONSTRING"] = Request.CONSTRING;
    reqobj["FormMode"] = Request.Mode;
    reqobj["T_T"] = BillID;
    //debugger;
    reqobj["M_E"] = $("#dateEvents").data("kendoDatePicker").value();

    $.ajax({
        async: false,
        url: Glurl + "api/BQAPIMst/GetRequest",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify(reqobj),
        success: function (d) {
            //var Detemp = JSON.parse(d);
            var Contorl_lists = [];
            Contorl_lists = CtrlId;
            var Detemp = JSON.parse(d);
            //debugger;
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

                var grid = $("#BillGrid").data("kendoGrid");
                grid.dataSource.data(Detemp.Itm);
            }
            else {
                var grid = $("#BillGrid").data("kendoGrid");
                grid.dataSource.data("");
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


var BillSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["CONSTRING"] = Request.CONSTRING;
    reqobj["FormMode"] = Request.Mode;
    reqobj["M_E"] = $("#dateEvents").data("kendoDatePicker").value();
    reqobj["T_T"] = $("#ddlMsgFor").val();
    reqobj["ListData"] = $("#BillGrid").data("kendoGrid").dataSource.data();
    $.ajax({
        async: false,
        url: Glurl + "api/BQAPIMst/GetRequest",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify(reqobj),
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
                $("#BillGrid").data("kendoGrid").dataSource.data("");
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

//var FCLoad = function (Request,MSGID, Glurl, CtrlId) {
//    //debugger;
//    var  JSON.parse(request);
//    var reqobj = {};
//    reqobj["COMPID"] = Request.COMPID;
//    reqobj["USER_ID"] = Request.USER_ID;
//    reqobj["REQ_NM"] = Request.REQ_NM;
//    reqobj["CONSTRING"] = Request.CONSTRING;
//    reqobj["FormMode"] = Request.Mode;
//    reqobj["ID"] = MSGID;
//    //reqobj["IDTY"] = $("#ddlFCItmTy").val();

//    $.ajax({
//        async: false,
//        url: Glurl + "api/BQAPIMst/GetRequest",
//        type: 'POST',
//        contentType: 'application/json; charset=utf-8',
//        datatype: 'json',
//        data: JSON.stringify(reqobj),
//        success: function (d) {
//            //var Detemp = JSON.parse(d);
//            var Contorl_lists = [];
//            Contorl_lists = CtrlId;
//            var Detemp = JSON.parse(d);
//            $.each(Detemp.Itm[0], function (key, Value) {
//                $.each(Contorl_lists, function (key1, Value1) {
//                    var dataid = Value1.Dataids;

//                    if (dataid == key) {
//                        if (Value1.Type == 'text')
//                            $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

//                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
//                            //debugger;
//                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
//                            ddl.value(Detemp.Itm[0][dataid]);
//                        }

//                        if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
//                            if (Detemp.Itm[0][dataid] == "" || Detemp.Itm[0][dataid] == null)
//                                $("#" + Value1.Id)[0].checked = true;
//                            else
//                                $("#" + Value1.Id)[0].checked = false;
//                        }
//                    }
//                });
//            });

//            var grid = $("#BillGrid").data("kendoGrid");
//            grid.dataSource.data(Detemp.Itm);
//        },
//        error: function (request, status, error) {
//            console.log("Error Failrue");
//        }
//    });
//}




var Grid = function () {
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { validation: { required: true }, type: "string" },
                    M_S: { type: "string" },
                    M_E:{type:"string"},
                    M_1: { type: "string" },
                    M_2: { type: "string" },
                    C_BY: { type: "string" },
                    C_DT: { type: "string" },
                }
            }
        },
    });

    $("#BillGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "M_S", title: 'From Date', width: 40, attributes: { style: "text-align:left" }, },
            { field: "M_E", title: 'To Date', width: 40, attributes: { style: "text-align:left" } },
            { field: "M_1", title: 'Message 1', width: 30, attributes: { style: "text-align:left" } },
             { field: "M_2", title: 'Message 2', width: 30, attributes: { style: "text-align:left" } },
        ],
        //header
        editable: true,
    });
}