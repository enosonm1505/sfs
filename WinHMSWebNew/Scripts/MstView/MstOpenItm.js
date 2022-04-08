var OpenItmLoad = function (Request, OpenItmID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = OpenItmID;
        var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
          var Detemp = JSON.parse(d);
            //sessionStorage.setItem(Detemp);
          GetOpenItmChange(Request.COMPID, Request.USER_ID, Request.CONSTRING, Request.Mode, OpenItmID, Glurl);
          var ddl = $("#ddlItm").data("kendoDropDownList");
          ddl.dataSource.data(Detemp.Itm);
          ddl.refresh();        
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var OpenItmTyLoad = function (Request, OpenItmTyID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = OpenItmTyID;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);
            // //debugger;
            OpenItmLoadSubGrp(Request.COMPID, Request.USER_ID, Request.CONSTRING, Request.Mode, Detemp.Itm[0].P_GR_ID,Glurl);
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
                            if (Detemp.Itm[0][dataid] == "1")
                                $("#" + Value1.Id)[0].checked = true;
                            else
                                $("#" + Value1.Id)[0].checked = false;
                        }
                    }
                });
            });;
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

function GetOpenItmChange(COMPID, USER_ID, CONSTRING, Mode, ID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj1 = {};
    reqobj1["COMPID"] = COMPID;
    reqobj1["USER_ID"] = USER_ID;
    reqobj1["REQ_NM"] = "OPENITMCHANGE";
    reqobj1["CONSTRING"] = CONSTRING;
    reqobj1["FormMode"] = Mode;
    reqobj1["ID"] = ID;
    var dataparam = JSON.stringify(reqobj1);

    $.ajax({
      
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);

                    if(Detemp.Itm[0].ITEM_TYPE == "B")
                        $("#txtItmTy").val("Banquet Item Master");
                    else if(Detemp.Itm[0].ITEM_TYPE == "P")
                        $("#txtItmTy").val("POS - Outlet Item Master");

                    $("#txtRevGrp").val(Detemp.Itm[0].PROD_GR_NM);
                    
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}



function OpenItmLoadSubGrp(COMPID, USER_ID, CONSTRING, Mode, ID, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj1 = {};
    reqobj1["COMPID"] = COMPID;
    reqobj1["USER_ID"] = USER_ID;
    reqobj1["REQ_NM"] = "OPENITMLOADSUBGRP";
    reqobj1["CONSTRING"] = CONSTRING;
    reqobj1["FormMode"] = Mode;
    reqobj1["ID"] = ID;
    var dataparam = JSON.stringify(reqobj1);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);

            var ddl = $("#ddlRevSub").data("kendoDropDownList");
            ddl.dataSource.data(Detemp.Itm);
            ddl.refresh();

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}



var OpenItmSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["ListData"] = controlValue;
    reqobj["GRPID"] = $("#ddlOpenItm").val();
    if (Request.Mode == "NEW")
        reqobj["ID"] = $("#txtItm").val();
    else
        reqobj["ID"] = $("#ddlItm").val();
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