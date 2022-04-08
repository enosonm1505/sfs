var app = angular.module('GrupChkIn', ['webix']);
app.controller("CheckinController", function ($scope) {
    var searchicon = "<span class='webix_icon_btn wxi-search'></span>";
    //var Prop_Id = ViewBag.COMP;
    //alert(Prop_Id);
    var ddlPropId = ["ddlProperty"];
    debugger;
    var dataProp = SingleDropdownLoadGrid(ddlPropId);
    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        //value: Prop_Id,
        disabled: true,
        options: dataProp.ddlProperty,
        on: {
            onChange: function (newv, oldv) {
               // sessionReassign();
                fnBtnOpenprocess();
                $$("txtGroup").setValue("");
                $$("txtResNo").setValue("");
                $$("txtResTotRm").setValue("");
                $$("txtResTotPax").setValue("");
                $$("txtAlTotRm").setValue("");
                $$("txtAlTotPax").setValue("");
                fnLoadArrDet();
                $$("GvGrupChkin").clearAll();
                $$("GvGrupChkin").refresh();
            }

        }
    };

    $scope.txtGroup = {
        view: "search",
        id: "txtGroup",
        labelWidth: 100,
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
        Width: 60,
    };
    $scope.txtArrDt = {
        view: "text",
        id: "txtArrDt",
        disabled: true,
       Width: 120,
        //options: LoadArrDet.ARR_DT,
    };
    $scope.txtArrTm = {
        view: "text",
        id: "txtArrTm",
        disabled: true,
       Width: 90,
        //options: LoadArrDet.ARR_TM,
    };
    
    $scope.txtResTotRm = {
        view: "text",
        id: "txtResTotRm",
        disabled: true,
        labelWidth: 40,
        inputAlign: "center",
    };
    $scope.txtResTotPax = {
        view: "text",
        id: "txtResTotPax",
        disabled: true,
        labelWidth: 40,
        inputAlign: "center",
        
    };
    $scope.txtAlTotRm = {
        view: "text",
        id: "txtAlTotRm",
        disabled: true,
        labelWidth: 40,
        inputAlign: "center",
    };
    $scope.txtAlTotPax = {
        view: "text",
        id: "txtAlTotPax",
        disabled: true,
        labelWidth: 40,
        inputAlign: "center",
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
    
    
    $scope.GvGroup = {
        view: "datatable",
        id: "GvGroup",
        select: "row",
        data: [],
        height: 450,
        width: 450,
        scrollX: false,
        columns: [
            { header: ["Reseve No.", { content: "textFilter" }], id: "R_NO", width: 120, css: { 'text-align': 'center ! important' }, sort: "number" },
            { header: ["Group Name", { content: "textFilter" }], id: "GROUP_NM", width: 300, css: { 'text-align': 'left ! important' } },
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
                //reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                reqobj["COMPID"] = $$("ddlProperty").getValue();
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
                                $("#txtGstFilter").val("");
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
        dataparam["COMPID"] = $$("ddlProperty").getValue();
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
        reqobj["COMPID"] = $$("ddlProperty").getValue();
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
    if (config.CHKBOX == "0") {
        return "whitecolor";

    }

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