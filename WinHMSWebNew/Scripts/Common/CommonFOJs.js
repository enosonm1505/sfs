var SingleDropdownLoadGrid = function (DivId, Request) {
    debugger;
    var ddlgrid = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "PROPERTYLOAD";
    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ddlgrid = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};

var fnsaveselrooms = function () {
    debugger;
    // var new= $("#hdnNewRoomNo").val();
    var grid
    var dataparam = {};
    dataparam["REQTYPE"] = "FNSAVEROOMSEL";
    dataparam["VRESNO"] = $("#hndvResNo").val();
    dataparam["OLDROOMNO"] = $("#hdnOldRoomNo").val();
    dataparam["NEWROOMNO"] = $("#hdnNewRoomNo").val();
    dataparam["VROOMTY"] = $("#hdnvRoomTy").val();
    dataparam["VUPDT"] = $("#hdnvUpDt").val();
    dataparam["BLOCKSNO"] = $("#hdnBlockSno").val();
    dataparam["VARRDT"] = $("#hdnArrdt").val();
    dataparam["VDEPDT"] = $("#hdnDeptdt").val();
    dataparam["FROM_TM"] = $("#hdnArrTm").val();
    dataparam["TO_TM"] = $("#hdnDeptTm").val();
    dataparam["B_IND"] = "";
    dataparam["NARRA"] = "";
    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            grid = JSON.parse(d);
            if (grid.OUTPUT != "1") {
                AlertMessage(grid.OUTPUT);
            }

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return grid;
};

var fnloadmaingrid = function () {
    debugger;
    var ResNo = $("#RNO").val();
    var D2_NO = $("#D2No").val();
    var GstName = $("#txtGstFilter").val();
    $("#LoadBar").css("display", "block");
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FNLOADGROUPCHKIN";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["RESNO"] = ResNo;
    reqobj["D2_NO"] = D2_NO;
    reqobj["GSTNAME"] = GstName;
    reqobj["ARRDT"] = $$("txtArrDt").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/FoTrans/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "") {
                var data = JSON.parse(d);
                if (data.OUTPUT == "") {
                    var HdData = data.TBLGRUPCKIN;
                    HdData = JSON.parse(HdData);
                    var GridData = data.TBLGRUPCKIN;
                    var GridData1 = data.TBLGRUPCKINTEMP;
                    if (GridData != "") {
                        debugger;
                        GridData = JSON.parse(GridData);
                        GridData1 = JSON.parse(GridData1);

                        var gridlength = GridData.length;
                        $$("GvGrupChkin").clearAll();
                        $$("GvGrupChkin").parse(GridData);

                        $$("GvGrupChkinTemp").clearAll();
                        $$("GvGrupChkinTemp").parse(GridData1);

                        $('#DivGroupSearch').modal('hide');
                        var data = $$("GvGrupChkin").serialize();
                        var lenval = data.length;
                        if (lenval != 0) {
                            $$("GvGrupChkin").select($$("GvGrupChkin").getFirstId());
                            webix.UIManager.setFocus($$("GvGrupChkin"));
                            $$("GvGrupChkin").refresh();
                        }
                    }
                    else {
                        $scope.gridOptions.api.setRowData([]);
                    }
                }
                else {
                    //AlertMessage(data.OUTPUT);
                    $("#DivAlert").show();
                    $$("lblAlertPop1").setValue(data.OUTPUT);
                }
            }
            else {
                $scope.gridOptions.api.setRowData([]);
            }

        },
    });
    $("#LoadBar").css("display", "none");
}

var fncheckin = function () {
    debugger;
    // var new= $("#hdnNewRoomNo").val();
    var grid
    var dataparam = {};
    var ResNo = $("#RNO").val();
    var D2_NO = $("#D2No").val();

    if (ResNo == "") {
        Message("Reservation No cannot be empty.", "error");
        return;
    }
    if (D2_NO == "") {
        Message("Group cannot be empty.", "error");
        return;
    }


    //var dataval = $("#GvGrupChkin").serialize();
    var dataval = $$("GvGrupChkin").serialize();

    var DatavalTemp = $$("GvGrupChkinTemp").serialize();

    var GstSno = "";
    var GstId = "";

    if (dataval == "") {
        Message("Group cannot be empty.", "error");
        return;
    }
    var chkbox = "";
    var assval = "";
    if (dataval.length > 0) {

        for (j = 0; j < DatavalTemp.length; j++) {
            for (i = 0; i < dataval.length; i++) {

                if (DatavalTemp[j].RESERVE_NO == dataval[i].RESERVE_NO) {

                    if (dataval[i].SELPAX == '1') {
                        chkbox = "1";
                        if (dataval[i].BLOCK_ROOM_NO == null) {
                            Message("Room No cannot be empty.", "error");
                            fnBtnOpenprocess();
                            return;
                        }
                        if (dataval[i].RESERVE_ROOMS == "") {
                            Message("Reserve Rooms cannot be empty.", "error");
                            fnBtnOpenprocess();
                            return;
                        }
                        if (dataval[i].CHECK_IN_RMS == "") {
                            Message("checkin Rooms cannot be empty.", "error");
                            fnBtnOpenprocess();
                            return;
                        }
                        if (i == 0) {
                            GstSno = dataval[i].GUEST_SNO;
                            GstId = dataval[i].G_ID;
                        }
                        else {
                            if (GstSno == "") {
                                GstSno = dataval[i].GUEST_SNO;
                                GstId = dataval[i].G_ID;
                            }
                            else {
                                GstSno = GstSno + ',' + dataval[i].GUEST_SNO;
                                GstId = GstId + ',' + dataval[i].G_ID;
                            }
                        }


                    }
                }

               
                if (dataval[i].SELPAX == '1' && dataval[i].BLOCK_ROOM_NO != "") {
                    dataparam["REQTYPE"] = "FNSAVECHKIN";
                    dataparam["ResNo"] = dataval[i].RESERVE_NO;
                    dataparam["RoomTyId"] = dataval[i].ROOM_TY_ID;
                    dataparam["ArrTm"] = dataval[i].ARRIVAL_TM;
                    dataparam["DepDt"] = dataval[i].DEP_DT;
                    dataparam["DepTm"] = dataval[i].DEPARTURE_TM;
                    dataparam["ArrDt"] = dataval[i].ARR_DT;
                    dataparam["BlockSNo"] = dataval[i].BLOCK_SNO;
                    dataparam["CheckinRooms"] = dataval[i].CHECK_IN_RMS;
                    dataparam["CheckinPax"] = dataval[i].CHECK_IN_PAX;
                    dataparam["Adult"] = dataval[i].ADULT;
                    dataparam["Child"] = dataval[i].CHILD;
                    dataparam["Child2"] = dataval[i].CH_2;
                    dataparam["Child3"] = dataval[i].CH_3;
                    dataparam["Rooms"] = dataval[i].RESERVE_ROOMS;
                    dataparam["RoomNo"] = dataval[i].BLOCK_ROOM_NO;
                    dataparam["Sharer"] = "N";
                    dataparam["ShrGst"] = "";
                    dataparam["ResSts"] = "1";
                    dataparam["ReqFrm"] = "C";
                    dataparam["SysNm"] = "TEST";
                }
                else {
                    break;
                }
            }
            
            if (chkbox == "1") {
                dataparam["PaxSNo"] = GstSno;
                dataparam["GstId"] = GstId;
                GstSno = ""; GstId = "";
                dataparam = JSON.stringify(dataparam);
                $.ajax({
                    async: false,
                    url: "/FoTrans/API_CALLXML",
                    type: 'POST',
                    data: "request=" + dataparam,
                    success: function (d) {
                        debugger;
                        grid = JSON.parse(d);
                        if (grid.OUTPUT == "1") {
                            Message("Checkin Successfully", "success");
                            //fnloadmaingrid();
                            window.location.reload();
                        }
                        else {
                            Message(grid.OUTPUT, "error");
                            fnBtnOpenprocess();
                        }

                    },
                    error: function (request, status, error) {
                        console.log("Error Failrue");
                    }
                });

            }
        }

        return grid;



        //for (i = 0; i < dataval.length; i++) {
        //    var Currval = dataval[i].RESERVE_NO;
        //    var prevval = "";
        //    if (dataval[i].SELPAX == '1') {
        //        chkbox = "1";
        //        if (i == 0 && Currval == prevval && prevval != "") {
        //            GstSno = dataval[i].GUEST_SNO;
        //            GstId = dataval[i].G_ID;
        //        }
        //        else {
        //            if (GstSno == "") {
        //                GstSno = dataval[i].GUEST_SNO;
        //                GstId = dataval[i].G_ID;
        //            }
        //            else {
        //                GstSno = GstSno + ',' + dataval[i].GUEST_SNO;
        //                GstId = GstId + ',' + dataval[i].G_ID;
        //            }
        //        }
        //        if (dataval[i].BLOCK_ROOM_NO == null) {
        //            Message("Room No cannot be empty.","error")
        //            fnBtnOpenprocess();
        //            return;
        //        }
        //        dataparam["REQTYPE"] = "FNSAVECHKIN";
        //        dataparam["ResNo"] = dataval[i].RESERVE_NO;
        //        dataparam["RoomTyId"] = dataval[i].ROOM_TY_ID;
        //        dataparam["ArrTm"] = dataval[i].ARRIVAL_TM;
        //        dataparam["DepDt"] = dataval[i].DEP_DT;
        //        dataparam["DepTm"] = dataval[i].DEPARTURE_TM;
        //        dataparam["ArrDt"] = dataval[i].ARR_DT;
        //        dataparam["BlockSNo"] = dataval[i].BLOCK_SNO;
        //        dataparam["CheckinRooms"] = dataval[i].CHECK_IN_RMS;
        //        dataparam["CheckinPax"] = dataval[i].CHECK_IN_PAX;
        //        dataparam["Adult"] = dataval[i].ADULT;
        //        dataparam["Child"] = dataval[i].CHILD;
        //        dataparam["Child2"] = dataval[i].CH_2;
        //        dataparam["Child3"] = dataval[i].CH_3;
        //        dataparam["Rooms"] = dataval[i].RESERVE_ROOMS;
        //        dataparam["RoomNo"] = dataval[i].BLOCK_ROOM_NO;
        //        dataparam["Sharer"] = "N";
        //        dataparam["ShrGst"] = "";
        //        dataparam["ResSts"] = "1";
        //        dataparam["ReqFrm"] = "C";
        //        dataparam["SysNm"] = "TEST";
        //        if ((Currval != prevval && prevval != "") || dataval[i].SELPAX == '1') {
        //            dataparam["PaxSNo"] = GstSno;
        //            dataparam["GstId"] = GstId;
        //            if (dataval[i].BLOCK_ROOM_NO == null) {
        //                Message("Room No cannot be empty.", "error");
        //                fnBtnOpenprocess();
        //                return;
        //            }
        //            if (dataval[i].RESERVE_ROOMS == "") {
        //                Message("Reserve Rooms cannot be empty.", "error");
        //                fnBtnOpenprocess();
        //                return;
        //            }
        //            if (dataval[i].CHECK_IN_RMS == "") {
        //                //$("#DivAlert").show();
        //                //$('#lblAlertPop1').val("checkin Rooms cannot be empty.") 
        //               // AlertMessage("checkin Rooms cannot be empty.");
        //                Message("checkin Rooms cannot be empty.", "error");
        //                fnBtnOpenprocess();
        //                return;
        //            }
        //            GstSno = ""; GstId = "";
        //            dataparam = JSON.stringify(dataparam);
        //            $.ajax({
        //                async: false,
        //                url: "/FoTrans/API_CALLXML",
        //                type: 'POST',
        //                data: "request=" + dataparam,
        //                success: function (d) {
        //                    debugger;
        //                    grid = JSON.parse(d);
        //                    if (grid.OUTPUT == "1") {
        //                        Message("Checkin Successfully", "success");
        //                       //fnloadmaingrid();
        //                        window.location.reload();
        //                    }
        //                    else
        //                    {
        //                        Message(grid.OUTPUT, "error");
        //                        fnBtnOpenprocess();
        //                    }

        //                },
        //                error: function (request, status, error) {
        //                    console.log("Error Failrue");
        //                }
        //            });
        //        }
        //        prevval = dataval[i].RESERVE_NO;
        //        return grid;
        //    }
        //}

        if (chkbox == "") {
            Message("select Room and Pax", "error");
        }

    }
};

var fnloadArrdt = function () {
    debugger;
    var ddlgrid
    var dataparam = {};
    dataparam["REQTYPE"] = "FNLOADARRDET";
    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ddlgrid = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};

function fnLoadArrDet() {
    var LoadArrDet = fnloadArrdt();
    $$("txtArrTm").setValue(LoadArrDet.ARR_TM);
    $$("txtArrDt").setValue(LoadArrDet.ARR_DT);
}

var fnBtnNewprocess = function () {
    $("#btnSave").attr("disabled", false);
    $("#btnView").attr("disabled", true);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", true);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}
var ShowBtn = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);

}

var fnBtnOpenprocess = function () {
    $("#btnSave").attr("disabled", false);
    $("#btnView").attr("disabled", true);
    $("#btnAdd").attr("disabled", true);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}

var fnBtnViewprocess = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", true);
    $("#btnModify").attr("disabled", true);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", false);
}

var fnBtnRefreshprocess = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}

//Controls Process Function for Reason=Enable/Reason1=Disable/Reason2=Clear
var CntrlProcess = function Process(DivId, Reason, Reason1, Reason2) {
    //debugger;
    var ddlids = [];
    $.unique($(DivId).find("select[id^=ddl]")).each(function () {
        ddlids.push(this.id);
    });

    var txtids = [];
    $.unique($(DivId).find("input[id^=txt]")).each(function () {
        txtids.push(this.id);
    });

    var Chkids = [];
    $.unique($(DivId).find("input[id^=chk]")).each(function () {
        Chkids.push(this.id);
    });

    var dateids = [];
    $.unique($(DivId).find("input[id^=date]")).each(function () {
        dateids.push(this.id);
    });
    var textarids = [];
    $.unique($(DivId).find("textarea[id^=txtar]")).each(function () {
        textarids.push(this.id);
    });

    var lblids = [];
    $.unique($(DivId).find("label[id^=lbl]")).each(function () {
        lblids.push(this.id);
    });

    if (ddlids != undefined) {
        $.each(ddlids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (txtids != undefined) {
        $.each(txtids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (textarids != undefined) {
        $.each(textarids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (Chkids != undefined) {
        $.each(Chkids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C') {
                var id = $("#" + value);
                id[0].checked = false;
            }
        });
    }

    if (dateids != undefined) {
        $.each(dateids, function (key, value) {

            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C') {
                var id = $("#" + value).data("kendoDatePicker");
                id.value("");
            }
        });
    }

    if (lblids != undefined) {
        $.each(lblids, function (key, value) {
            //if (Reason == 'E')
            //    $("#" + value).prop("disabled", false);
            //if (Reason1 == 'D')
            //    $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).text("");
        });
    }
}
//End Of Disable Controls Function

/*The Buttons  Click Events */
$("#btnOpen, #btnNew, #btnSave, #btnRefresh").on('click', function (event) {
    if (event) {
        var Currtargeid = event.currentTarget.id;
        var Targerid = "";
        switch (Currtargeid) {
            case "btnNew":
                PgMode = "NEW";
                PageMode("NEW");
                break;
            case "btnOpen":
                PgMode = "OPEN";
                PageMode("OPEN");
                break;
            case "btnRefresh":
                PgMode = "REFRESH";
                PageMode("REFRESH");
                break;
            case "btnSave":
                PageOnSave();
            default:
                break;
        }
    }
});