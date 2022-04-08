var app = angular.module('GrupChkIn', ['webix']);
app.controller("CheckinController", function ($scope) {
    var searchicon = "<span class='fa fa-search'></span>"
    var ddlPropId = ["ddlProperty"];
    var dataProp = SingleDropdownLoadGrid(ddlPropId);
    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        disabled: true,
        options: dataProp.ddlProperty,
    };

    $scope.txtGroup = {
        view: "search",
        id: "txtGroup",
        labelWidth: 80,
        disabled: true,
        on: {
            onItemClick: function () {
                fnSearchGrpLoad();
            }
        }
    };
    $scope.txtResNo = {
        view: "text",
        id: "txtResNo",
        disabled: true,
        labelWidth: 40,
    };
    $scope.txtArrDt = {
        view: "text",
        id: "txtArrDt",
        disabled: true,
        labelWidth: 40,
        //options: LoadArrDet.ARR_DT,
    };
    $scope.txtArrTm = {
        view: "text",
        id: "txtArrTm",
        disabled: true,
        labelWidth: 40,
        //options: LoadArrDet.ARR_TM,
    };
    
    $scope.txtResTotRm = {
        view: "text",
        id: "txtResTotRm",
        disabled: true,
        labelWidth: 40,
    };
    $scope.txtResTotPax = {
        view: "text",
        id: "txtResTotPax",
        disabled: true,
        labelWidth: 40,
    };
    $scope.txtAlTotRm = {
        view: "text",
        id: "txtAlTotRm",
        disabled: true,
        labelWidth: 40,
    };
    $scope.txtAlTotPax = {
        view: "text",
        id: "txtAlTotPax",
        disabled: true,
        labelWidth: 40,
    };

    $scope.txtfilter = {
        view: "text",
        id: "txtfilter",
        labelWidth: 80,
        //options: LoadArrDet.ARR_TM,
    };

    $scope.GvGrupChkinTemp = {
        view: "datatable",
        id: "GvGrupChkinTemp",
        select: "row",
        data: [],
        height: 400,
        // width: 1260,
        columns: [
            { header: "Res.No", id: "RESERVE_NO", width: 80, css: { 'text-align': 'center ! important' } },
        ],
    };
    

    $scope.GvGrupChkin = {
        view: "datatable",
        id: "GvGrupChkin",
        select: "row",
        data: [],
        height: 400,
       // width: 1260,
        columns: [
            { header: "Res.No", id: "R_NO", width: 80, css: { 'text-align': 'center ! important' } },
            { header: "Seq.no#", id: "GUEST_SNO", width: 50, css: { 'text-align': 'center ! important' } },
            { header: "Title", id: "GUEST_INFORM_NM", width: 50, css: { 'text-align': 'center ! important' } },
            { header: ["Last Name", ], id: "C2_N2", width: 125, css: { 'text-align': 'left ! important' } },
            { header: ["First Name", ], id: "C2_N1", width: 125, css: { 'text-align': 'left ! important' } },
            { header: ["Company Name", ], id: "GUEST_PARTY_NM", width: 135, css: { 'text-align': 'left ! important' } },
            { header: "Pax", id: "CHECK_IN_PAX", width: 50, css: { 'text-align': 'center ! important' } },
            { header: "Departure", id: "DEP_DT", width: 90, css: { 'text-align': 'center ! important' } },
            { header: "Time", id: "DEPARTURE_TM", width: 50, css: { 'text-align': 'center ! important' } },
            { header: "Room Type", id: "ROOM_TY_NM", width: 100, css: { 'text-align': 'center ! important' } },
            { header: "Billing inst", id: "REM1", width: 100, css: { 'text-align': 'center ! important' }  },
            { header: "Ref.No", id: "O_NM", width: 100, css: { 'text-align': 'center ! important' }},
            { header: "RoomNo", id: "BLOCK_ROOM_NO", width: 75, cssFormat: BgClr, css: 'my_style' },
            { header: "", id: "ICON", width: 30, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
            { header: "Select Pax", id: "SELPAX", width: 100, template: "{common.checkbox()}" , css: { 'text-align': 'center ! important' } },
            { header: "Select", id: "SELECT", width: 50, template: "{common.checkbox()}" , css: { 'text-align': 'center ! important' } },

            { header: "Htitle", id: "GUEST_TITLE_ID", hidden: true },
            { header: "h", id: "UPDATE_DT", hidden: true },
            { header: "he1", id: "RATE_TY_ID", hidden: true },
            { header: "he2", id: "TARIFF_DISC_PER", hidden: true },
            { header: "he3", id: "PLAN_DISC_PER", hidden: true },
            { header: "h1", id: "GUEST_STATUS_ID", hidden: true },
            { header: "h2", id: "PLAN_AMT", hidden: true },
            { header: "h3", id: "RESERVE_NO", hidden: true },
            { header: "h4", id: "ROOM_TY_ID", hidden: true },
            { header: "h5", id: "PAX", hidden: true },
            { header: "h6", id: "CHILD", hidden: true },
            { header: "h7", id: "ARRIVAL_DT", hidden: true },
            { header: "h7ARR", id: "ARR_DT", hidden: true },
            { header: "h8", id: "DEPARTURE_DT", hidden: true },
            { header: "h9", id: "SH_IND", hidden: true },
            { header: "h10", id: "A3_NO", hidden: true },
            { header: "h11", id: "BLOCK_SNO", hidden: true },
            { header: "h12", id: "CHECK_IN_RMS", hidden: true },
            { header: "h13", id: "RESERVE_ROOMS", hidden: true },
            { header: "h14", id: "RM_BLK_NO", hidden: true },
            { header: "h15", id: "REGN_ID", hidden: true },
            { header: "h16", id: "CURRENCY_ID", hidden: true },
            { header: "h17", id: "UPDATE_DT", hidden: true },
            { header: "h18", id: "GUEST_TY_ID", hidden: true },
            { header: "h19", id: "PLAN_ID", hidden: true },
            { header: "h20", id: "ADULT", hidden: true },
            { header: "h21", id: "CH_2", hidden: true },
            { header: "h22", id: "CH_3", hidden: true },
            { header: "h23", id: "CHECK_IN_PAX", hidden: true },
            { header: "h25", id: "GUEST_NM", hidden: true },
            { header: "h26", id: "G_ID", hidden: true },
            { header: "h26", id: "ARRIVAL_TM", hidden: true },
            { header: "h27", id: "COLOR_CODE", hidden: true },
            { header: "h28", id: "ROOM_STATUS_IND", hidden: true },
            { header: "h29", id: "COLOR_CODE_IND", hidden: true },
        ],
        on: {
            'onItemClick': function (id) {
                var getval = this.getItem(id.row);
                if (id.column == 'ICON') {
                    debugger;
                    $("#hdnvRoomTy").val(getval.ROOM_TY_ID);
                    $("#hdnArrTm").val(getval.ARRIVAL_TM);
                    $("#hdnDeptdt").val(getval.DEP_DT);
                    $("#hdnDeptTm").val(getval.DEPARTURE_TM);
                    $("#hndvResNo").val(getval.RESERVE_NO);
                    $("#hdnArrdt").val(getval.ARR_DT);
                    $("#hdnBlockSno").val(getval.BLOCK_SNO);
                    $("#hdnOldRoomNo").val(getval.BLOCK_ROOM_NO);
                    $("#hdnOldBlkSno").val(getval.BLOCK_SNO);
                    $("#hdnvUpDt").val(getval.UPDATE_DT);
                    $("#hdnCheckinRms").val(getval.CHECK_IN_RMS);
                    $("#hdnCheckinPax").val(getval.CHECK_IN_PAX);
                    $("#hdnAdult").val(getval.ADULT);
                    $("#hdnChild").val(getval.CHILD);
                    $("#hdnChild2").val(getval.CH_2);
                    $("#hdnChild3").val(getval.CH_3);
                    $("#hdnGstId").val(getval.G_ID);
                    $("#hdnRooms").val(getval.RESERVE_ROOMS);
                    var propId = $$("ddlProperty").getValue();
                    //var Srch = "http://localhost:50172/FoMstAllRoom.aspx?vRmTy=CT&vFrmDt=04/02/2020&VFrmTm=23:59&vToDt=06/02/2020&VToTm=15:00&VProp=WS&VForm=RMA&GROWID=";
                    //var Srch = "http://localhost:1001/FoMstAllRoom.aspx?vRmTy=" + getval.ROOM_TY_ID + "&vFrmDt=" + getval.ARR_DT + "&VFrmTm=" + getval.ARRIVAL_TM + "&vToDt=" + getval.DEP_DT + "&VToTm=" + getval.DEPARTURE_TM + "&VProp=" + propId+"&VForm=RMW&GROWID=";
                    var Srch = "/FO/FoMstAllRoom.aspx?vRmTy=" + getval.ROOM_TY_ID + "&vFrmDt=" + getval.ARR_DT + "&VFrmTm=" + getval.ARRIVAL_TM + "&vToDt=" + getval.DEP_DT + "&VToTm=" + getval.DEPARTURE_TM + "&VProp=" + propId + "&VForm=RMA&GROWID=";
                    window.open(Srch , '_new', 'width=800px,height=480,scrollbars=no,top=180,left=\'+Mleft+\'', 0);
                    
                }
            },
            'onCheck': function (rowId, colId, status) {
                debugger;
                if (colId == 'SELPAX') {
                    //var getval = this.getItem(rowId);
                    //$("#hdnvRoomTy").val(getval.ROOM_TY_ID);
                    //$("#hdnArrTm").val(getval.ARRIVAL_TM);
                    //$("#hdnDeptdt").val(getval.DEP_DT);
                    //$("#hdnDeptTm").val(getval.DEPARTURE_TM);
                    //$("#hndvResNo").val(getval.RESERVE_NO);
                    //$("#hdnArrdt").val(getval.ARR_DT);
                    //$("#hdnBlockSno").val(getval.BLOCK_SNO);
                    //$("#hdnOldRoomNo").val(getval.BLOCK_ROOM_NO);
                    //$("#hdnOldBlkSno").val(getval.BLOCK_SNO);
                    //$("#hdnvUpDt").val(getval.UPDATE_DT);
                    //$("#hdnCheckinRms").val(getval.CHECK_IN_RMS);
                    //$("#hdnCheckinPax").val(getval.CHECK_IN_PAX);
                    //$("#hdnAdult").val(getval.ADULT);
                    //$("#hdnChild").val(getval.CHILD);
                    //$("#hdnChild2").val(getval.CH_2);
                    //$("#hdnChild3").val(getval.CH_3);
                    //$("#hdnGstId").val(getval.G_ID);
                    //$("#hdnRooms").val(getval.RESERVE_ROOMS);
                    //$("#hdnGstSno").val(getval.GUEST_SNO);
                    //$("#hdnNewRoomNo").val(getval.BLOCK_ROOM_NO);
                }
                else if (colId == 'SELECT') {
                    var getval = this.getItem(rowId);
                    debugger;
                    if (status == '1') {
                        var value = getval.RESERVE_NO;
                        var dataval = this.serialize();
                        for (i = 0; i < dataval.length; i++) {
                            var value = getval.RESERVE_NO;
                            if (dataval[i].RESERVE_NO == getval.RESERVE_NO) {
                                dataval[i].SELECT = '1';
                                dataval[i].SELPAX = '1';
                            }
                        }

                    }
                    else {
                        var value = getval.RESERVE_NO;
                        var dataval = this.serialize();
                        for (i = 0; i < dataval.length; i++) {
                            var value = getval.RESERVE_NO;
                            if (dataval[i].RESERVE_NO == getval.RESERVE_NO) {
                                dataval[i].SELECT = '0';
                                dataval[i].SELPAX = '0';
                            }
                        }
                    }

                    this.refresh();
                }
            }
        }
    };

    $scope.GvGroup = {
        view: "datatable",
        id: "GvGroup",
        select: "row",
        data: [],
        height: 450,
        width: 365,
        scrollX: false,
        columns: [
            { header: ["Reseve No.", { content: "textFilter" }], id: "R_NO", width: 100, css: { 'text-align': 'center ! important' }, sort: "number" },
            { header: ["Group Name", { content: "textFilter" }], id: "GROUP_NM", width: 265, css: { 'text-align': 'left ! important' } },
            { header: ["H1", { content: "textFilter" }], id: "D2_NO", hidden:true},
        ],
        on: {
            'onItemDblClick': function (id) {
                var selectedRows = this.getSelectedItem(id);
                var ResNo = selectedRows[0].R_NO;
                var D2_NO = selectedRows[0].D2_NO;
                var GrpName = selectedRows[0].GROUP_NM;
                $("#LoadBar").css("display", "block");
                var rowDatap = [];
                var reqobj = {};
                reqobj["REQTYPE"] = "FNLOADGROUPCHKIN";
                reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                reqobj["RESNO"] = ResNo;
                reqobj["D2_NO"] = D2_NO;
                reqobj["ARRDT"] = $$("txtArrDt").getValue();
                $("#D2No").val(selectedRows[0].D2_NO);
                $("#RNO").val(selectedRows[0].R_NO);
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
                                $$("txtGroup").setValue(GrpName);
                                $$("txtResNo").setValue(ResNo);
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
                                    var totMrVal = 0;
                                    var data = $$("GvGrupChkin").serialize();
                                    var lenval = data.length;
                                    var prono = 1;
                                    if (lenval != 0) {
                                        $$("GvGrupChkin").select($$("GvGrupChkin").getFirstId());
                                        webix.UIManager.setFocus($$("GvGrupChkin"));
                                        $$("GvGrupChkin").refresh();
                                    }
                                    
                                    var LoadRoomsTot = fnloadTotalRooms(D2_NO);

                                }
                                else {
                                    $scope.gridOptions.api.setRowData([]);
                                }
                            }
                            else {
                               // $("#DivAlert").show();
                               // $$("lblAlertPop1").setValue(data.OUTPUT);
                                AlertMessage(data.OUTPUT);
                            } 
                        }
                        else {
                            $scope.gridOptions.api.setRowData([]);
                        }

                    },
                });
                $("#LoadBar").css("display", "none");
            },
            'onKeyPress': function (e) {
                debugger;
                if (e == '13') {
                    var valid = $$("GvGroup").getSelectedId(true);
                    this.callEvent("onItemDblClick", [valid[0].id]);
                }
            },
        }
    };

    var fnloadTotalRooms = function (D2No) {
        debugger;
        var grid
        var dataparam = {};
        dataparam["REQTYPE"] = "FNLOADTOTALROOMS";
        dataparam["D2_No"] = D2No;
        dataparam["RESNO"] = $$("txtResNo").getValue(); 
        dataparam["ARRDT"] = $$("txtArrDt").getValue(); 
        dataparam = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/FoTrans/API_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (d) {
                debugger
                grid = JSON.parse(d);
                //var val = grid[0].TotRooms;
                $$("txtResTotRm").setValue(grid[0].TotRooms);
                $$("txtResTotPax").setValue(grid[0].TotPax);
                $$("txtAlTotRm").setValue(grid[0].TotAllotRooms);
                $$("txtAlTotPax").setValue(grid[0].TotAllotPax);
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
            }
        });
        return grid;
    };

    var fnSearchGrpLoad = function () {
        var rowDatad = [];
        var reqobj = {};
        reqobj["REQTYPE"] = "FNLOADGROUP";
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
                    rowDatad = JSON.parse(d);
                    $$("GvGroup").clearAll();
                    $$("GvGroup").parse(rowDatad);
                    $$("GvGroup").select($$("GvGroup").getFirstId());
                    webix.UIManager.setFocus($$("GvGroup"));
                }
            },
        });
        $('#DivGroupSearch').modal('show');
    };

});
function BgClr(value, config) {
    debugger;
    if (config.COLOR_CODE_IND == "0") {

        if (config.ROOM_STATUS_IND == "V") {
            return "Vacant";
        }
        else if (config.ROOM_STATUS_IND == "D") {
            return "Dirty";
        }
        else if (config.ROOM_STATUS_IND == "O") {
            return "occupied";
        }
        else if (config.ROOM_STATUS_IND == "I") {
            return "inspect";
        } else {
            return "whitecolor";
        }
    }
    else if (config.COLOR_CODE_IND == "1") {
        if (config.ROOM_STATUS_IND == "V") {
            return "Vacant1";
        }
        else if (config.ROOM_STATUS_IND == "D") {
            return "Dirty1";
        }
        else if (config.ROOM_STATUS_IND == "O") {
            return "occupied1";
        }
        else if (config.ROOM_STATUS_IND == "I") {
            return "inspect1";
        } else {
            return "whitecolor";
        }

    }
}