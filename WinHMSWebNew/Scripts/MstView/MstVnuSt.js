
var VenueLoad = function (Request, Glurl, CtrlId) {

    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["CONSTRING"] = Request.CONSTRING;
    reqobj["FormMode"] = Request.Mode;
    reqobj["VENUE_ID"] = $("#ddlVenue").val();
    //debugger;
   
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

                var grid = $("#VnuGrid").data("kendoGrid");
                grid.dataSource.data(Detemp.Itm);
            }
            else {
                var grid = $("#VnuGrid").data("kendoGrid");
                grid.dataSource.data("");
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


//var VenueSave = function (Request, Glurl, controlValue) {
//    var reqobj = {};
//    //debugger;
//    reqobj["COMPID"] = Request.COMPID;
//    reqobj["USER_ID"] = Request.USER_ID;
//    reqobj["REQ_NM"] = Request.REQ_NM;
//    reqobj["CONSTRING"] = Request.CONSTRING;
//    reqobj["FormMode"] = Request.Mode;
//    reqobj["VENUE_ID"] = $("#ddlVenue").val();;
//    reqobj["ListData"] = $("#VnuGrid").data("kendoGrid").dataSource.data();
//    $.ajax({
//        async: false,
//        url: Glurl + "api/BQAPIMst/GetRequest",
//        type: 'POST',
//        contentType: 'application/json; charset=utf-8',
//        datatype: 'json',
//        data: JSON.stringify(reqobj),
//        success: function (d) {
//            //debugger;
//            var Detemp = JSON.parse(d);
//            if (Detemp == "SUCCESS") {
//                $("#AlertImg").show();
//                $("#AlertImg").attr('src', '../Images/SaveImage.png');
//                $("#AlertPoptxt").text("Saved Sucessfully.");
//                $("#DivAlertPopup").modal('show');
//                $("#btnpopAlertOk").show();
//                $("#btnpopAlertcan").hide();
//                $("#VnuGrid").data("kendoGrid").dataSource.data("");
//            }
//            else if (Detemp == "FAILURE" || Detemp == "") {
//                $("#AlertImg").show();
//                $("#AlertImg").attr('src', '../Images/AlertImage.png');
//                $("#AlertPoptxt").text("Operation Failed!");
//                $("#DivAlertPopup").modal('show');
//                $("#btnpopAlertOk").hide();
//                $("#btnpopAlertcan").show();
//            }
//            else if (Detemp != "") {
//                $("#AlertImg").show();
//                $("#AlertImg").attr('src', '../Images/AlertImage.png');
//                $("#AlertPoptxt").val(Detemp);
//                $("#DivAlertPopup").modal('show');
//                $("#btnpopAlertOk").hide();
//                $("#btnpopAlertcan").show();
//            }
//        }
//    });
//}




//function FldCount(container, options) {
//    _grid = $("#VnuGrid").data("kendoGrid");
//    var _Selectedgrid = _grid.dataItem(_grid.select());

//    $('<input data-bind="value:' + options.field + '"/>').appendTo(container)
//        .kendoDropDownList({
//            autoBind: false,
//            dataTextField: "Item",
//            dataValueField: "Value",
//            dataSource: [{ "Item": "", "Value": "" }, { "Item": "10", "Value": "10" },
//            { "Item": "20", "Value": "20" }, { "Item": "30", "Value": "30" }, { "Item": "40", "Value": "40" },
//            { "Item": "50", "Value": "50" }, { "Item": "60", "Value": "60" }, { "Item": "70", "Value": "70" },
//            { "Item": "80", "Value": "80" }, { "Item": "90", "Value": "90" }],
//            template: "<span data-id='${data.Item}'>${data.Value}</span>",
//            select: function (e) {
//                //debugger;
//                var id = e.item.find("span").attr("data-id");
//                var nm = e.item.find("span").text();
//                _Selectedgrid.CATG_ID = "";
//                _Selectedgrid.CATG_ID = id;
//                _Selectedgrid.CATG = nm;
//                // _grid.refresh();
//            }
//        });
//}

var Grid = function () {
    debugger
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { validation: { required: true }, type: "string" },
                    //VENUE_NM: { type: "string" },
                    MIN_PAX: { type: "string" },
                    MAX_PAX: { type: "string" },
                    C_BY: { type: "string" },
                    C_DT: { type: "string" },
                    
                }
            }
        },
    });

    $("#VnuGrid").kendoGrid({
        dataSource: datsource,
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "", title: 'Seating Arrangement', width: 20, editor:FldCount, attributes: { style: "text-align:left" }, },
            { field: "MIN_PAX", title: ' MIN.PAX', width: 70, attributes: { style: "text-align:left" } },
            { field: "MAX_PAX", title: 'MAX.PAX', width: 40, attributes: { style: "text-align:left" } },
            
           
        ],
        //header
        editable: true,
    });
}
