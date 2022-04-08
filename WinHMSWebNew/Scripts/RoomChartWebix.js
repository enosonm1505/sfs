var vSpn;
var grid;
var rowDatadDet = [];
var Idst = 4;
var vLoadFirst = "1";

var page = 0,
    inCallback = false,
    isReachedScrollEnd = false;




function fnFoRoomChart(vStDate, vNoDys, vRmTy) {

    if (vRmTy == "ALL" || vRmTy == "'ALL'")
        vRmTy = "";

    vTempDt = vStDate;
    var vVal = vTempDt.split("/", 3)

    var vSlsh = "/";
    var vDt = vVal[0];
    var vMn = vVal[1];
    var vYr = vVal[2];

    vMn = vMn.concat(vSlsh);
    vYr = vYr.concat(vSlsh);

    vStDate = vYr.concat(vMn);
    vStDate = vStDate.concat(vDt);

    if ($$("TapeChartGrid"))
        $$("TapeChartGrid").destructor();

    webix.ui({

        view: "datatable",
        id: "TapeChartGrid",
        container: "FoRoomChartGrid",
        select: true,
        data: [],
        //  height: 450,
        minWidth: 900,
        header: false,
        //autoheight: true,
        autoconfig: true,
        areaselect: true,
        //topSplit: 2,
        leftSplit: 1,
        spans: true,
        css: "RoomChartDb",
        //scrollX:true,

        columns: [
            { id: "RoomTy", header: { text: "Room# Ty", rowspan: 2 }, width: 80, css: "hrowHead1", sort: "string" },
            { id: "RoomTyId", header: "", width: 80, hidden: false },
        ],
        on: {
            'onAfterScroll': function () {

                var pos = this.getScrollState();
                var url = "/TravelAgentBlock/fnCallTrvAgBlkContLazy";
                scrollHandlerGrid(url, "1", "TapeChartGrid");
                $$("TapeChartGrid").refresh();
            },

            'onAfterBlockSelect': function () {

                $("#Ty_ID").val("");

                $("#RGNO").val("");
                $("#RESERVE_NO").val("");

                var vArr = $$("TapeChartGrid").getSelectArea();
                vStartRow = vArr.start.row;
                vERow = vArr.end.row;
                vStartCol = vArr.start.column
                vECol = vArr.end.column

                var vCssval = fnGetGridCellBkColor(vStartRow, vStartCol);
                var vCssval1 = fnGetGridCellBkColor(vStartRow, vECol);

                var vIsSpanAppl = fnGetSpanDetCssColor(vStartRow, vStartCol, vECol);
                if (vIsSpanAppl == true) return;
                if (vStartRow === vERow && vStartRow != 1 && vStartRow != 2 && vStartCol != "RoomTy" && vECol != "RoomTy" && (vIsSpanAppl == false)) {
                    //foPopSel2(vStartRow, vStartCol, 8);

                    foPopSel1("E", vStartRow, vStartCol, vECol);

                }
                else if (vCssval == "hrow2" || vCssval == "hrow4") {

                    foPopSel1("B", vStartRow, vStartCol, vECol);
                }


                if (vStartRow == 1 || vStartRow == 2 || vStartCol == "RoomTy" || vECol == "RoomTy") {
                    $$("TapeChartGrid").removeSelectArea();
                }
            },

            'onItemDblClick': function (id) {



                var vCssval = fnGetGridCellBkColor(id.row, id.column);



                var getval = $$("TapeChartGrid").getItem(3);
                var vStDt = getval[id.column];
                var vEnDt = getval[id.column];

                var getval = $$("TapeChartGrid").getItem(4);
                var vColStNo = getval[id.column];
                var vColEtNo = getval[id.column];

                var vStTm = "", vEnTm = "";
                //if (vColStNo == "1") {
                //    vStTm = "00:00"
                //    vEnTm = "04:59"
                //}
                //else if (vColStNo == "2") {
                //    vStTm = "05:00"
                //    vEnTm = "10:59"
                //}
                //else if (vColStNo == "3") {
                //    vStTm = "11:00"
                //    vEnTm = "16:59"
                //}
                //else if (vColStNo == "4") {
                //    vStTm = "17:00"
                //    vEnTm = "23:59"
                //}

                if (vColStNo == "1") {
                    vStTm = "00:00"
                    vEnTm = "05:59"
                }
                else if (vColStNo == "2") {
                    vStTm = "06:00"
                    vEnTm = "11:59"
                }
                else if (vColStNo == "3") {
                    vStTm = "12:00"
                    vEnTm = "17:59"
                }
                else if (vColStNo == "4") {
                    vStTm = "18:00"
                    vEnTm = "23:59"
                }

                var getval = $$("TapeChartGrid").getItem(id.row);
                var vRoomNo = getval.RoomTyId.trim();

                var vVar = getval.RoomTy;
                var vVar = vVar.replace("  ", "#");
                vVar = vVar.split("#");
                var vRoomTy = vVar[1].trim();

                $("#ROOMNO").val(vRoomNo);
                $("#RMTY").val(vRoomTy);
                $("#ARRDT").val(vStDt);
                $("#DEPTDT").val(vEnDt);
                $("#ARRTM").val(vStTm);
                $("#DEPTTM").val(vEnTm);
                $("#RGNO").val("");
                $("#RESERVE_NO").val("");
                $("#Ty_ID").val("");

                var ROOMNO = vRoomNo;
                var RMTY = vRoomTy;
                var RGNO = "";
                var RESERVE_NO = "";

                var ARRDT = fnConvDdFormat(vStDt);
                var DEPTDT = fnConvDdFormat(vEnDt);
                var ARRTM = vStTm;
                var DEPTTM = vEnTm;

                var rowDatad = [];
                var reqobjK = {};
                reqobjK["REQID"] = "3";
                reqobjK["REQTYPE"] = "fnGetRoomChrRoomInfo";
                reqobjK["ROOM_NO"] = vRoomNo;
                reqobjK["RES_DATE"] = vStDt;
                reqobjK["COMPID"] = $$("Property").getValue();

                reqobjK["ST_TM"] = vStTm;
                reqobjK["END_TM"] = vEnTm;

                if (vCssval == "hrow2") {
                    reqobjK["STATUS_IND"] = "M";
                }
                else if (vCssval == "hrow4") {
                    reqobjK["STATUS_IND"] = "R";
                }
                else
                    reqobjK["STATUS_IND"] = "";

                if (vCssval == "hrow1")
                    reqobjK["RES_INFO"] = "0";
                else
                    reqobjK["RES_INFO"] = "1";

                var dataparam = JSON.stringify(reqobjK);
                $.ajax({
                    async: false,
                    url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
                    type: 'POST',
                    data: "htParam=" + dataparam,
                    success: function (d) {
                        rowDatad = JSON.parse(d);

                        if (rowDatad != []) {
                            $("#RGNO").val(rowDatad[0].pRegNo);
                            RGNO = rowDatad[0].pRegNo;
                            $("#RESERVE_NO").val(rowDatad[0].vResNo);
                            RESERVE_NO = rowDatad[0].vResNo;


                            if (vCssval == "hrow3") {
                                var ARRDT = rowDatad[0].vFromDt;
                                var DEPTDT = rowDatad[0].vToDt;

                                var ARRDT = fnConvDdFormat(ARRDT);
                                var DEPTDT = fnConvDdFormat(DEPTDT);

                                var ARRTM = rowDatad[0].vFromTm;
                                var DEPTTM = rowDatad[0].vToTm;

                                $("#ARRDT").val(ARRDT);
                                $("#DEPTDT").val(DEPTDT);
                                $("#ARRTM").val(ARRTM);
                                $("#DEPTTM").val(DEPTTM);

                            }

                        }
                    },
                });


                if (vCssval == "hrow1" || vCssval == "hrow3") {
                    if (vCssval == "hrow1") {
                        $("#Ty_ID").val("R");

                        GuestInfoWindowCall(ROOMNO, RMTY, RGNO, ARRDT, DEPTDT, ARRTM, DEPTTM);
                    }
                    else if (vCssval == "hrow3") {
                        $("#Ty_ID").val("R");
                        ReservationWindowCall(ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, "O", 2);

                    }

                }
                else if (vCssval == "hrow2" || vCssval == "hrow4") {
                    if (vCssval == "hrow2") {
                        $("#Ty_ID").val("M");
                        foPopSel1("B", id.row, id.column, id.column);
                    }
                    else if (vCssval == "hrow4") {
                        $("#Ty_ID").val("R");
                        foPopSel1("B", id.row, id.column, id.column);
                    }
                }

            },

            'onItemClick': function (id) {
                $$("TapeChartGrid").removeSelectArea();
            },

        }

    });

    $$("TapeChartGrid").clearAll();
    //grid.clearAll();
    //showPrgBar(2000);

    add_cols(vStDate, vNoDys, vRmTy);

    //$$("TapeChartGrid").refresh();
    gridResize();

}

webix.event(window, "resize", function () {
    gridResize();
})
function gridResize() {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    var offset = $("#FoRoomChartGrid").offset();
    if (offset != null && offset != undefined) {
        $$("TapeChartGrid").define("height", ((vheight - offset.top - 10)));
        $$("TapeChartGrid").adjust();
    }
}

function showPrgBar(delay) {
    webix.extend($$("TapeChartGrid"), webix.ProgressBar);
    $$("TapeChartGrid").showProgress({
        delay: delay,
        hide: true,
    });
}

function add_cols(vStDate, vNoDys, vRmTy) {

    var PrgStr = "<div  style='display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189'> <img src='../../Images/progress.GIF' style='position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;' /> </div>";
    //webix.extend($$("TapeChartGrid"), webix.ProgressBar);
    webix.extend($$("TapeChartGrid"), webix.OverlayBox);
    $$("TapeChartGrid").showOverlay(PrgStr);
    setTimeout(function () {
        rowDatadDet = "";
        var vSRNo = "";
        page = 0,
        inCallback = false,
        isReachedScrollEnd = false;

        var reqobj = {};
        reqobj["id"] = "";
        reqobj["RoomTy"] = "";
        reqobj["RoomTyId"] = "";

        var reqobj3 = {};
        reqobj3["id"] = "3";
        reqobj3["RoomTy"] = "";
        reqobj3["RoomTyId"] = "";

        var reqobj4 = {};
        reqobj4["id"] = "4";
        reqobj4["RoomTy"] = "";
        reqobj4["RoomTyId"] = "";

        var vStDt = vStDate;
        var vEndDt = FnDateAdd("D", vNoDys, vStDt, 111);

        var reqobjt = {};
        reqobjt["REQID"] = "3";
        reqobjt["REQTYPE"] = "RoomChartScheduler";
        reqobjt["Date1"] = vStDate;
        reqobjt["Date2"] = vEndDt;
        reqobjt["ROOM_TY"] = vRmTy;
        reqobjt["ROOM_NOS"] = vSRNo;
        reqobjt["COMPID"] = $$("Property").getValue();

        var dataparam = JSON.stringify(reqobjt);
        $.ajax({
            async: false,
            url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
            type: 'POST',
            data: "htParam=" + dataparam,
            success: function (d) {
                if (d != "")
                    rowDatadDet = JSON.parse(d);
            },
        });


        var vWk1 = "";
        var vWk2 = "";

        $.ajax({
            async: false,
            url: "/TravelAgentBlock/HolidaysLoad",
            type: 'POST',
            success: function (d) {
                //var abc = JSON.parse(d);
                vWk1 = d.w.Weekoff1;
                vWk2 = d.w.Weekoff2;
            },
        });



        var vD = "-";
        var k = -1;
        var cols = $$("TapeChartGrid").config.columns;

        var rowDatad = [];
        var reqobjK = {};
        reqobjK["REQID"] = "3";
        reqobjK["REQTYPE"] = "fnGetRoomChrtDateDet";
        reqobjK["START_DT"] = vStDate;
        reqobjK["NOOF_DYS"] = vNoDys;
        reqobjK["COMPID"] = $$("Property").getValue();

        var dataparam = JSON.stringify(reqobjK);
        $.ajax({
            async: false,
            url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
            type: 'POST',
            data: "htParam=" + dataparam,
            success: function (d) {
                if (d != "")
                    rowDatad = JSON.parse(d);
            },
        });

        for (var i = 0; i < vNoDys; i++) {

            //vStDt = FnDateAdd("D", i, vStDate, 111);

            vStDt = $.trim(rowDatad[i].DateAdd);

            var vDt = vStDt;
            vDt = vDt.concat(vD);
            //vDt = vDt.concat(i);
            var vStr = "";
            var j = 0;

            k = k + 4

            j = j + 1;

            vStr = vDt.concat(j);
            //cols.splice(k, 0, { id: vStr, header: [{ content: "columnGroup", batch: vDt, groupText: vDt, closed: false, colspan: 4 }, vStr], width: 20 });
            cols.splice(k, 0, { id: vStr, width: 14, header: vStr, css: "hrowBRight" });
            reqobj[vStr] = "";
            reqobj3[vStr] = vStDt;
            reqobj4[vStr] = "1";

            j = 5;
            j = j - 1;
            vStr = vDt.concat(j);
            //cols.splice(k, 0, { id: vStr, width: 20, batch: vDt, header: [null, vStr] });
            cols.splice(k, 0, { id: vStr, width: 14, header: vStr, css: "hrowBBottom" });
            reqobj[vStr] = "";
            reqobj3[vStr] = vStDt;
            reqobj4[vStr] = "4";

            j = j - 1;
            vStr = vDt.concat(j);
            cols.splice(k, 0, { id: vStr, width: 14, header: vStr, css: "hrowBBottom" });
            reqobj[vStr] = "";
            reqobj3[vStr] = vStDt;
            reqobj4[vStr] = "3";

            j = j - 1;
            vStr = vDt.concat(j);
            cols.splice(k, 0, { id: vStr, width: 14, header: vStr, css: "hrowBBottom" });
            reqobj[vStr] = "";
            reqobj3[vStr] = vStDt;
            reqobj4[vStr] = "2";
        }
        $$("TapeChartGrid").getColumnConfig("RoomTyId").hidden = true;

        $$("TapeChartGrid").refreshColumns();

        //$$("TapeChartGrid").add({ id:1, RoomTy: "Room#Ty", A01: "17-02-2019", A11: "18-02-2019", A21: "19-02-2019"});
        $$("TapeChartGrid").add({ id: 1, RoomTy: "Room#Ty" });
        $$("TapeChartGrid").add({ id: 2, RoomTy: "" });

        $$("TapeChartGrid").freezeRow(1, true);
        $$("TapeChartGrid").freezeRow(2, true);

        $$("TapeChartGrid").add(reqobj3);

        $$("TapeChartGrid").add(reqobj4);

        var ritem = $$("TapeChartGrid").getItem(3);
        ritem.hidden = true;
        $$("TapeChartGrid").updateItem(3, ritem);
        $$("TapeChartGrid").filter(function (obj) { return !obj.hidden; })

        ritem = $$("TapeChartGrid").getItem(4);
        ritem.hidden = true;
        $$("TapeChartGrid").updateItem(4, ritem);
        $$("TapeChartGrid").filter(function (obj) { return !obj.hidden; })

        vStDt = vStDate;
        var vD = "-1";
        if (vSpn == "1") {
            $$("TapeChartGrid").addSpan(1, "RoomTy", 1, 2, "Room#Ty", "hrowHead3");
        } else {
            $$("TapeChartGrid").addSpan(1, "RoomTy", 1, 2, "Room No", "hrowHead3");
        }

        for (var i = 0; i < vNoDys; i++) {

            //vStDt = FnDateAdd("D", i, vStDate, 111);
            //vDispdt = fnFormatDate(vStDt, "dd MMM");
            //vDay = FnGetDayofDate(vStDt);

            vStDt = $.trim(rowDatad[i].DateAdd);
            vDispdt = $.trim(rowDatad[i].DispDt);
            vDay = $.trim(rowDatad[i].DateDay);

            vColId = vStDt.concat(vD);

            if (vDay == vWk1 || vDay == vWk2) {
                $$("TapeChartGrid").addSpan(1, vColId, 4, 1, vDispdt, "hrowHead4");
                $$("TapeChartGrid").addSpan(2, vColId, 4, 1, vDay, "hrowHead4");
            }
            else {
                $$("TapeChartGrid").addSpan(1, vColId, 4, 1, vDispdt, "hrowHead5");
                $$("TapeChartGrid").addSpan(2, vColId, 4, 1, vDay, "hrowHead5");
            }
        }

        //$$("TapeChartGrid").refresh();

        var rowDatad = [];
        var reqobjD = {};
        reqobjD["REQID"] = "3";
        reqobjD["REQTYPE"] = "fnGetFoRoomType";
        reqobjD["ROOM_TY"] = vRmTy;
        if ($$("chkRmSeq").getValue() == "1")
            reqobjD["RM_SEQ"] = "1";
        else
            reqobjD["RM_SEQ"] = "0";

        reqobjD["COMPID"] = $$("Property").getValue();

        if ($$("chkRmPM").getValue() == "1")
            reqobjD["RM_PM"] = "1";
        else
            reqobjD["RM_PM"] = "0";

        var dataparam = JSON.stringify(reqobjD);
        $.ajax({
            async: false,
            url: "/TravelAgentBlock/fnCallTrvAgBlkContLazy",
            type: 'POST',
            data: "htParam=" + dataparam + "&pageNum=" + page + "&PostChk=0",
            success: function (d) {
                if (d != "") {
                    rowDatad = JSON.parse(d);
                }
            },
        });

        var vSq = "','";
        $.each(rowDatad, function (key1, value1) {

            var vRoomTyId = $.trim(value1.RoomTyId);
            if (vSRNo == "") {
                vSRNo = vRoomTyId
            }
            else {
                vSRNo = vSRNo.concat(vSq);
                vSRNo = vSRNo.concat(vRoomTyId);
            }
        })

        var rowDatadDetF = [];
        var reqobjt = {};
        reqobjt["REQID"] = "3";
        reqobjt["REQTYPE"] = "RoomChartScheduler";
        reqobjt["Date1"] = vStDate;
        reqobjt["Date2"] = vEndDt;
        reqobjt["ROOM_TY"] = vRmTy;
        reqobjt["ROOM_NOS"] = vSRNo;
        reqobjt["COMPID"] = $$("Property").getValue();

        var dataparam = JSON.stringify(reqobjt);
        $.ajax({
            async: false,
            url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
            type: 'POST',
            data: "htParam=" + dataparam,
            success: function (d) {
                if (d != "")
                    rowDatadDetF = JSON.parse(d);
            },
        });



        Idst = 4;

        $.each(rowDatad, function (key1, value1) {

            var vRoomTyId = $.trim(value1.RoomTyId);
            var vRoomTyNm = $.trim(value1.RoomTyNm);

            var retItmDet = JSON.stringify(reqobj);

            var ItmDet = JSON.parse(retItmDet);

            Idst = Idst + 1;
            ItmDet.id = Idst;
            ItmDet.RoomTy = vRoomTyNm;
            ItmDet.RoomTyId = vRoomTyId;
            $$("TapeChartGrid").add(ItmDet);

            var rowDatad1 = [];
            rowDatad1 = $.grep(rowDatadDetF, function (element, index) {

                return element.ROOM_NO == vRoomTyId;
            });

            $.each(rowDatad1, function (key, value) {

                var vGustInfoNm = $.trim(value.TITLE);
                var vColid = $.trim(value.ColumnId);
                var vNoOfCols = $.trim(value.NoOfCols);
                var vStsInd = $.trim(value.STATUS_IND);
                var vCssNm = "";

                if (vStsInd == "B") {
                    vCssNm = "hrow1";
                }
                else if (vStsInd == "R") {
                    vCssNm = "hrow4";
                }
                else if (vStsInd == "M") {
                    vCssNm = "hrow2";
                }
                else if (vStsInd == "G") {
                    vCssNm = "hrow3";
                }
                else if (vStsInd == "GT") {
                    vCssNm = "hrowT";
                }

                $$("TapeChartGrid").addSpan(Idst, vColid, parseInt(vNoOfCols), 1, vGustInfoNm, vCssNm);

                $$("TapeChartGrid").updateItem(Idst, { vColid: vGustInfoNm });
                //$$("TapeChartGrid").refresh(Idst);
                //$$("TapeChartGrid").refresh();

            })

        })

        //$$("TapeChartGrid").addCss("hrowHead1");

        $$("TapeChartGrid").refresh();
        $$("TapeChartGrid").hideOverlay();
    }, 0);


}

function foPopSel1(vMode, vRowId, vColdSid, vColdEid) {

    var getval = $$("TapeChartGrid").getItem(vRowId);
    var vVar = getval.RoomTy;
    var vVar = vVar.replace("  ", "#");
    vVar = vVar.split("#");
    var vRoomTy = vVar[1].trim();
    var vRoomNo = vVar[0].trim();

    var getval = $$("TapeChartGrid").getItem(3);
    var vStDt = getval[vColdSid];
    var vEnDt = getval[vColdEid];


    vStDt = fnConvDdFormat(vStDt);
    vEnDt = fnConvDdFormat(vEnDt);

    var getval = $$("TapeChartGrid").getItem(4);
    var vColStNo = getval[vColdSid];
    var vColEtNo = getval[vColdEid];

    var vStTm = "", vEnTm = "";
    //if (vColStNo == "1") {
    //    vStTm = "00:00"
    //}
    //else if (vColStNo == "2") {
    //    vStTm = "05:00"
    //}
    //else if (vColStNo == "3") {
    //    vStTm = "11:00"
    //}
    //else if (vColStNo == "4") {
    //    vStTm = "17:00"
    //}

    //if (vColEtNo == "1") {
    //    vEnTm = "04:59"
    //}
    //else if (vColEtNo == "2") {
    //    vEnTm = "10:59"
    //}
    //else if (vColEtNo == "3") {
    //    vEnTm = "16:59"
    //}
    //else if (vColEtNo == "4") {
    //    vEnTm = "23:59"
    //}

    if (vColStNo == "1") {
        vStTm = "00:00"
    }
    else if (vColStNo == "2") {
        vStTm = "06:00"
    }
    else if (vColStNo == "3") {
        vStTm = "12:00"
    }
    else if (vColStNo == "4") {
        vStTm = "18:00"
    }

    if (vColEtNo == "1") {
        vEnTm = "05:59"
    }
    else if (vColEtNo == "2") {
        vEnTm = "11:59"
    }
    else if (vColEtNo == "3") {
        vEnTm = "17:59"
    }
    else if (vColEtNo == "4") {
        vEnTm = "23:59"
    }

    $("#ROOMNO").val(vRoomNo);
    $("#RMTY").val(vRoomTy);
    $("#ARRDT").val(vStDt);
    $("#DEPTDT").val(vEnDt);
    $("#ARRTM").val(vStTm);
    $("#DEPTTM").val(vEnTm);

    //$("#RGNO").val("");
    //$("#RESERVE_NO").val("");

    var vHeader = "Room ";
    vHeader = vHeader.concat(vRoomNo);

    webix.ui({
        view: "window",
        modal: true,
        id: "foPopSel",
        head: vHeader,
        close: true,
        position: "center",
        autoheight: true,
        width: 200,
        //height:100,
        body: {
            view: "form",
            elements: [
                {
                    view: "button", label: "Quick Reservation", id: "ReserB", click: function onClickBut(id, e) {
                        $$("foPopSel").hide();

                        var Type = "Reservation";
                        var MODE = "N";
                        NewTapeBlocking(Type, MODE);
                    }
                },
                {
                    view: "button", label: "Block", id: "blcokB", click: function onClickBut(id, e) {

                        $$("foPopSel").hide();

                        var Type = "Block";
                        var MODE = "N";
                        NewTapeBlocking(Type, MODE);
                    }
                },
                {
                    view: "button", label: "Modify", id: "ModifyB", click: function onClickBut(id, e) {
                        $$("foPopSel").hide();

                        var Type = "Block";
                        var MODE = "O";
                        NewTapeBlocking(Type, MODE);
                    }
                },
                {
                    view: "button", label: "View", id: "ViewB", click: function onClickBut(id, e) {
                        $$("foPopSel").hide();

                        var Type = "Block";
                        var MODE = "V";
                        NewTapeBlocking(Type, MODE);
                    }
                },
                //{
                //    view: "button", label: "Release", id: "ReleaseB", click: function onClickBut(id, e) {
                //        $$("foPopSel").hide();

                //        var Type = "Block";
                //        var MODE = "R";
                //        NewTapeBlocking(Type, MODE);
                //    }
                //},

            ]
        }
    });

    if (vMode == "E") {
        $$("ReserB").show();
        $$("blcokB").show();

        $$("ModifyB").hide();
        $$("ViewB").hide();
        // $$("ReleaseB").hide();
    }
    else {
        $$("ReserB").hide();
        $$("blcokB").hide();

        $$("ModifyB").show();
        $$("ViewB").show();
        //  $$("ReleaseB").show();
    }

    $$("foPopSel").show();
}

function fnGetGridCellBkColor(vRowId, vColId) {

    var node = $$("TapeChartGrid").getItemNode({ row: vRowId, column: vColId });

    var node = $$("TapeChartGrid").getSpan();

    var CssNm = "";
    var nn = node[vRowId];

    var nm = "";
    if (nn != undefined) {
        nm = nn[vColId];
    }

    if (nm != undefined) {
        CssNm = nm[3];
    }

    return CssNm;
}

function fnGetSpanDetCssColor(vRowId, vColStId, vColEndId) {

    var node = $$("TapeChartGrid").getSpan();

    var CssNm = "";
    var nn = node[vRowId];

    var nm = "";
    if (nn != undefined) {
        var stColIndexNo = $$("TapeChartGrid").getColumnIndex(vColStId);
        var endColIndexNo = $$("TapeChartGrid").getColumnIndex(vColEndId);

        for (var i = stColIndexNo; i <= endColIndexNo; i++) {
            vColId = $$("TapeChartGrid").columnId(i);
            nm = nn[vColId];
            if (nm != undefined) {
                return true;
            }
        }
    }

    return false;
}

function rgb2hex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

function FnDateAdd(Format, ArgVal, ArgDate, FormatNo) {
    var rowDatad = "";
    var reqobj = {};

    reqobj["REQID"] = "3";
    reqobj["REQTYPE"] = "FnDateAdd";
    reqobj["ArgDate"] = ArgDate;
    reqobj["ArgVal"] = ArgVal;
    reqobj["Format"] = Format;
    reqobj["FormatNo"] = FormatNo;

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
        type: 'POST',
        data: "htParam=" + dataparam,
        success: function (d) {
            rowDatad = d;
        },
    });
    return rowDatad;
}

function fnFormatDate(ArgDate, ReqFormat) {
    var rowDatad = "";
    var reqobj = {};
    reqobj["REQID"] = "3";
    reqobj["REQTYPE"] = "fnFormatDate";
    reqobj["ArgDate"] = ArgDate;
    reqobj["ReqFormat"] = ReqFormat;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
        type: 'POST',
        data: "htParam=" + dataparam,
        success: function (d) {
            rowDatad = d;
        },
    });
    return rowDatad;
}

function FnGetDayofDate(ArgDate) {

    var rowDatad = "";
    var reqobj = {};
    reqobj["REQID"] = "3";
    reqobj["REQTYPE"] = "FnGetDayofDate";
    reqobj["DayDt"] = ArgDate;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/fnCallTrvAgBlkCont",
        type: 'POST',
        data: "htParam=" + dataparam,
        success: function (d) {
            rowDatad = d;
        },
    });
    return rowDatad;
}

var scrollHandlerGrid = function (url, req, grdID) {

    if (isReachedScrollEnd == false &&
        ($(document).scrollTop() <= $(document).height() - $(window).height())) {
        loadProjectData(url, req, grdID);
    }
}

function loadProjectData(loadMoreRowsUrl, req, grdID) {

    var rowDatad = [];

    var reqobj = {};
    reqobj["id"] = "";
    reqobj["RoomTy"] = "";
    reqobj["RoomTyId"] = "";
    reqobj["COMPID"] = $$("Property").getValue();

    if (page > -1 && !inCallback) {
        inCallback = true;
        page++;
        //$("div#loading").show();

        $.ajax({
            type: 'POST',
            url: loadMoreRowsUrl,
            data: "pageNum=" + page + "&PostChk=" + req,
            success: function (data, textstatus) {

                if (data != [] && data != "" && data != null) {
                    debugger;
                    rowDatad = JSON.parse(data);

                    if (rowDatad != '') {

                        var lenval = rowDatad.length;
                        for (var i = 0; i < lenval; i++) {

                            var vRoomTyId = $.trim(rowDatad[i].RoomTyId);
                            var vRoomTyNm = $.trim(rowDatad[i].RoomTyNm);

                            var retItmDet = JSON.stringify(reqobj);

                            var ItmDet = JSON.parse(retItmDet);

                            Idst = Idst + 1;
                            ItmDet.id = Idst;
                            ItmDet.RoomTy = vRoomTyNm;
                            ItmDet.RoomTyId = vRoomTyId;
                            $$("TapeChartGrid").add(ItmDet);

                            var rowDatad1 = [];
                            rowDatad1 = $.grep(rowDatadDet, function (element, index) {
                                return element.ROOM_NO == vRoomTyId;
                            });

                            $.each(rowDatad1, function (key, value) {
                                debugger;
                                var vGustInfoNm = $.trim(value.TITLE);
                                var vColid = $.trim(value.ColumnId);
                                var vNoOfCols = $.trim(value.NoOfCols);
                                var vStsInd = $.trim(value.STATUS_IND);

                                var vCssNm = "";

                                if (vStsInd == "B") {
                                    vCssNm = "hrow1";
                                }
                                else if (vStsInd == "R") {
                                    vCssNm = "hrow4";
                                }
                                else if (vStsInd == "M") {
                                    vCssNm = "hrow2";
                                }
                                else if (vStsInd == "G") {
                                    vCssNm = "hrow3";
                                }

                                $$("TapeChartGrid").addSpan(Idst, vColid, parseInt(vNoOfCols), 1, vGustInfoNm, vCssNm);

                                $$("TapeChartGrid").updateItem(Idst, { vColid: vGustInfoNm });
                                //$$("TapeChartGrid").refresh(Idst);
                                $$("TapeChartGrid").refresh();

                            })

                        }
                        $$("TapeChartGrid").refresh();

                    }
                    else {
                        page = -1;
                    }

                    inCallback = false;
                }
                // $("div#loading").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}


function fnConvDdFormat(vStDt) {
    var vSlsh = "/";

    vTempDt = vStDt;
    var vVal = vTempDt.split("/", 3)

    var vDt = vVal[2];
    var vMn = vVal[1];
    var vYr = vVal[0];

    vMn = vMn.concat(vSlsh);
    vDt = vDt.concat(vSlsh);

    vStDt = vDt.concat(vMn);
    vStDt = vStDt.concat(vYr);

    return vStDt;
}

function fnFocontrol(cmpid) {

    Request = {
        REQTYPE: "GET_FOCONTROL",
        COMPID: cmpid,
    }
    Prop_Id = cmpid;
    var rowData = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);

                if ($.trim(rowData[0].O6_IND) == "1") $("#MgtBlock").hide();
                else $("#MgtBlock").show();

                if ($.trim(rowData[0].R19_IND) == "1")
                    $$("chkRmSeq").setValue("1")
                else
                    $$("chkRmSeq").setValue("0")

                $$("StartDate").setValue($.trim(rowData[0].CUR_DT1));
                $("#hdnCurdt").val($.trim(rowData[0].CUR_DT1));
            }
        },
    });
    return rowData;
};

function fnFocont(cmpid) {

    Request = {
        REQTYPE: "GET_FOCONT",
        COMPID: cmpid,
    }
    Prop_Id = cmpid;
    var rowData = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $("#P11_IND").val($.trim(rowData[0].P11_IND));
                $("#T3_IND").val($.trim(rowData[0].T3_IND));
                $("#VV_IND").val($.trim(rowData[0].VV_IND));

                if ($.trim(rowData[0].W10_IND) == "1")
                    $$("chkRmPM").show();
                else
                    $$("chkRmPM").hide();

                if ($.trim(rowData[0].A26_IND) == "1")
                    $$("chkRmPM").setValue("1");
                else
                    $$("chkRmPM").setValue("0");

            }
        },
    });
    return rowData;
};

function LoadCompChange(CompId) {

    vLoadFirst = "1";
    var focontrol = fnFocontrol(CompId);
    var focont = fnFocont(CompId);

    ChartRoomTyLoad(CompId, "1");
    var DropRoom = $$("RoomTypeType").getValue();

    ChartFloor(CompId);
    ChartBlockType(CompId);

    var vDate = $$("StartDate").getValue();
    vDate = convert(vDate);
    vLoadFirst = "0";
    //getUnassignedArr(CompId, vDate);
    dropdownChange();
};
function getUnassignedArr(CompId, vDate) {
    Request = {
        REQTYPE: "GET_UNASSARRIVALS",
        COMPID: CompId,
        Account_Dt: vDate,
    }

    var rowData = [];
    var options = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                var strtext = "(" + $.trim(rowData) + ") Unassigned";
                $("#UnassignedArraivals").val(strtext);
            }
        },
    });
}

function dropdownChange() {

    if (vLoadFirst == "1") return false;
    var Date = $$("StartDate").getValue();
    Date = convert(Date);

    var RoomTypeType = "";
    //var ROOMTY = $.trim($("#ROOM_TY").val());
    var ROOMTY = $.trim($("#RmFilter").val());

    if (ROOMTY != "") {
        RoomTypeType = ROOMTY;
    }
    else {
        var DropRoom = $.trim($$("RoomTypeType").getValue());
        if (DropRoom != "") DropRoom = "'" + DropRoom + "'";
        RoomTypeType = DropRoom;
    }
    var FloorType = $.trim($$("FloorType").getValue());
    var BlockType = $.trim($$("BlockType").getValue());

    $.ajax({
        type: "POST",
        url: "/TravelAgentBlock/ChartDateArgs",
        data: "SchedulerDt=" + Date + "&RoomTypeType=" + RoomTypeType + "&FloorType=" + FloorType + "&BlockType=" + BlockType,
        success: function (data) {

            fnFoRoomChart(Date, 22, RoomTypeType);

        }
    });

    getUnassignedArr($$("Property").getValue(), Date);
}

function ChartFloor(cmpid) {
    Request = {
        REQTYPE: "ChartFloor",
        COMPID: cmpid,
    }
    Prop_Id = cmpid;
    var rowData = [];
    var options = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $$("FloorType").define("options", rowData);
                $$("FloorType").refresh();
                $$("FloorType").setValue("");
            }
        },
    });


};

function ChartBlockType(cmpid) {
    Request = {
        REQTYPE: "ChartRoomBuld",
        COMPID: cmpid,
    }
    Prop_Id = cmpid;
    var rowData = [];
    var options = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $$("BlockType").define("options", rowData);
                $$("BlockType").refresh();
                $$("BlockType").setValue("");

            }
        },
    });


};


function ChartRoomTyLoad(cmpid, choice) {
    Request = {
        REQTYPE: "ChartRoomTyLoad",
        COMPID: cmpid,
        Choice: choice,
    }
    Prop_Id = cmpid;
    var rowData = [];
    var options = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                if (choice == "1") {
                    $$("RoomTypeType").define("options", rowData);
                    $$("RoomTypeType").refresh();
                    $$("RoomTypeType").setValue("ALL");
                }
                else if (choice == "2") {
                    $$("grdRoomType").clearAll();
                    $$("grdRoomType").parse(rowData);
                    var RmBuild = $("#RmFilter").val();


                    var data = $$("grdRoomType").serialize();
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (RmBuild != "") {
                                if (RmBuild.includes($.trim(data[i].id)) == true)
                                    data[i].ChkSelect = "1";
                                else
                                    data[i].ChkSelect = "0";

                            }
                        }
                    }
                    $$("grdRoomType").refresh();
                    $("#RmFilter").val("")
                }
            }
        },
    });


};

function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}


function fnCallRoomFilterPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RoomFilterPopup",
        head: "Room Selection",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 350,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 700,

            elements: [

                {
                    padding: { bottom: 5, right: 5 },
                    cols: [
                        {
                            view: "datatable",
                            id: "grdRoomType",
                            select: "row",
                            data: [],
                            minWidth: 200,
                            height: 250,
                            scroll: "y",

                            columns: [
                                    { header: "id", id: "id", hidden: true },
                                    { header: "Room Type", id: "value", width: 220, editor: 'text', css: { 'text-align': 'left ! important' } },
                                    { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 50, css: { 'text-align': 'center ! important' } },

                            ],
                        },

                    ]
                },
                {

                    rows: [
                        {

                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    maxWidth: 70,
                                    align: "right",

                                    css: "webix_primary",
                                    on: {
                                        onItemClick: function () {
                                            var RmTyids = "";
                                            var data = $$("grdRoomType").serialize();
                                            var lenval = data.length;
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    if (data[i].ChkSelect == "1") {
                                                        if ($.trim(RmTyids) == "")
                                                            RmTyids = "'" + $.trim(data[i].id) + "'";
                                                        else
                                                            RmTyids += ",'" + $.trim(data[i].id) + "'";
                                                    }
                                                }
                                            }

                                            if (RmTyids == "") {
                                                webix.message({ type: 'warning', text: "No Rows select" });
                                            }
                                            else {
                                                $("#RmFilter").val(RmTyids);
                                                $$("RoomTypeType").blockEvent();
                                                $$("RoomTypeType").setValue("");
                                                $$("RoomTypeType").unblockEvent();
                                                dropdownChange();
                                                $$('RoomFilterPopup').hide();
                                            }

                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Close',
                                    maxWidth: 70,
                                    align: "right",
                                    css: "webix_primary",
                                    on: {
                                        onItemClick: function () {
                                            $$('RoomFilterPopup').hide();
                                        }
                                    }
                                },


                            ]

                        }
                    ]
                }
            ]
        }
    });
    ChartRoomTyLoad($$("Property").getValue(), "2");
    $$("RoomFilterPopup").show();
};

function fnCallUnAssignedPopup(CompId, Acdt, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl, pageNm) {

    var searchicon = "<span class='fa fa-search ' ></span>";

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "UnAssignedRoomArrivals",
        head: "Unassigned (" + Acdt + ") Arrivals",
        position: "center",
        width: 768,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        body: {

            rows: [
                {
                    view: "form",
                    id: "frmUnAssigned",
                    width: 800,
                    padding: { left: 35, top: 3 },
                    margin: 0,
                    elements: [
                        {
                            view: "button",
                            css: "webix_primary",
                            id: "btnDisplay",
                            label: "Auto Assign",
                            inputWidth: 150,
                            width: 200,
                            align: 'right',
                            click: function () {
                                fnbtnAutoAllocClick(CompId, pageNm, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl);
                            }
                        },

                {
                    view: "datatable",
                    id: "grdUnAssigned",
                    select: "row",
                    data: [],
                    autoconfig: true,
                    scroll: "y",

                    columns: [

                            { header: "Room Type", id: "ROOM_TY_NM", width: 170, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Reserve No", id: "R_NO", width: 70, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Guest", id: "GUEST_NM", width: 250, fillspace: true, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Arrival", id: "ARRIVAL_DT", width: 100, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Time", id: "ARRIVAL_TM", width: 50, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Room No", id: "ROOM_NO", width: 50, editor: 'text', css: { 'text-align': 'left ! important' } },
                             { id: "Srch", header: "", width: 40, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                            { header: "Room No", id: "ROOM_TY_ID", hidden: true },
                            { header: "Room No", id: "RESERVE_NO", hidden: true },
                            { header: "Room No", id: "DEPARTURE_DT", hidden: true },
                            { header: "Room No", id: "DEPARTURE_TM", hidden: true },
                            { header: "Room No", id: "RESERVE_ROOMS", hidden: true },
                            { header: "Room No", id: "UP_DT", hidden: true },


                    ],
                    on: {

                        'onItemClick': function (id) {
                            //var itemval = $$("PartyGrid").getSelectedItem();
                            var itemval = this.getItem(id.row);
                            var rowIndex = "";
                            var getColumn = id.column;
                            if (getColumn == "Srch") {
                                var RoomType = itemval.ROOM_TY_NM;
                                var Room_TY_ID = itemval.ROOM_TY_ID;
                                var RESERVE_NO = itemval.RESERVE_NO;
                                var R_NO = itemval.ROOM_TY_NM;
                                var DEP_DT = itemval.DEPARTURE_DT;
                                var DEP_TM = itemval.DEPARTURE_TM;
                                var ARR_DT = itemval.ARRIVAL_DT;
                                var ARR_TM = itemval.ARRIVAL_TM;
                                var UP_DT = itemval.UP_DT;
                                //var COMPID = $$("Property").getValue();

                                if (Room_TY_ID != null) Room_TY_ID = $.trim(Room_TY_ID);



                                ////RoomAssign(COMPID, Room_TY_ID, RESERVE_NO, DEP_DT, DEP_TM, ARR_DT, ARR_TM, rowIndex, UP_DT);
                                $$("RoomNoSrch").show();
                                fnRoomSrchLoad(CompId, FoRmChUserId, FoRmChConnStr, Room_TY_ID, ARR_DT, ARR_TM, DEP_DT, DEP_TM, pageNm, UnAssArrApiUrl);
                            }
                        },
                    },
                },

                    ]
                }
            ]
        }


    });
    AssignedPopupLoad(CompId, Acdt);
    $$("UnAssignedRoomArrivals").show();
};

function AssignedPopupLoad(cmpid, Acdt) {
    $$("grdUnAssigned").clearAll();
    Request = {
        REQTYPE: "UnassignedArraivalList",
        COMPID: cmpid,
        TravelschedulerDate: Acdt,// $("#hdnCurdt").val(),
    }
    Prop_Id = cmpid;
    var rowData = [];
    var options = [];

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdUnAssigned").clearAll();
                $$("grdUnAssigned").parse(rowData);
                $$("grdUnAssigned").refresh();

            }
        }
    });
}

function RoomAssign(COMPID, Room_TY_ID, RESERVE_NO, DEP_DT, DEP_TM, ARR_DT, ARR_TM, rowIndex, UP_DT) {
    var VForm = "TC";
    Window1 = window.open("/FO/FoMstAllRoom.aspx?vRmTy=" + Room_TY_ID + "&vFrmDt=" + ARR_DT + "&VFrmTm=" + ARR_TM + "&vToDt=" + DEP_DT + "&VToTm=" + DEP_TM + "&VProp=" + COMPID + "&vResNo=" + RESERVE_NO + "&hdnvUpDt=" + UP_DT + "&VForm=" + VForm + "&GROWID=" + rowIndex + "", "TapeChartRoomAssign", "width=800px,height=450,scrollbars=no,top=150,left=150 ");
};

function SaveRoomAssign(RmNo, COMPID, RmSrchPageId) {

    var Row = $$("grdUnAssigned").getSelectedId(false);
    var id = Row.row;
    var itemval = $$("grdUnAssigned").getItem(id);
    var rowIndex = "";
    var RoomType = itemval.ROOM_TY_NM;
    var Room_TY_ID = itemval.ROOM_TY_ID;
    var RESERVE_NO = itemval.RESERVE_NO;
    var R_NO = itemval.ROOM_TY_NM;
    var DEP_DT = itemval.DEPARTURE_DT;
    var DEP_TM = itemval.DEPARTURE_TM;
    var ARR_DT = itemval.ARRIVAL_DT;
    var ARR_TM = itemval.ARRIVAL_TM;
    var UP_DT = itemval.UP_DT;


    $("#LoadDIv").show();

    Request = {
        REQTYPE: "FNROOMASSINGSAVE",
        COMPID: COMPID,
        VRESNO: RESERVE_NO,
        OLDROOMNO: "",
        NEWROOMNO: RmNo,
        VROOMTY: Room_TY_ID,
        BLOCKSNO: "",
        VARRDT: ARR_DT,
        VDEPDT: DEP_DT,
        FROM_TM: ARR_TM,
        TO_TM: DEP_TM,
        B_IND: "",
        NARRA: "",
    }


    var DataVal = JSON.stringify(Request);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        async: true,
        url: "/TravelAgentBlock/FOAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {

            if (data != "") {

                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData.Status == "0") {
                    webix.message({
                        type: 'warning',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#LoadDIv").hide();
                }
                else if (rowData.Status == "1") {
                    AssignedPopupLoad(COMPID);

                    if (RmSrchPageId == "RMSTS") {
                        var btn = document.getElementById("btnRmsts");
                        btn.click();
                    }
                    $("#Refresh").click();
                    webix.message({
                        type: 'success',
                        text: rowData.Message,
                    })
                }
                $("#LoadDIv").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        },

    });


}

function fnbtnAutoAllocClick(CompId, pageNm, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl) {
    debugger;
    //var CompId = $$("Property").getValue();
    var ResNos = "";

    $$("grdUnAssigned").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("")
            else filter.value = "";
        }
    });
    $$("grdUnAssigned").filterByAll();
    var vGrid = $$("grdUnAssigned").serialize();
    var newData = vGrid.filter(function (el) {
        return (el.ROOM_NO == null || el.ROOM_NO == "");
    });
    var newData = vGrid.filter(function (el) {
        return (el.ROOM_NO == null || el.ROOM_NO == "");
    });

    if (newData.length > 0) {
        $.each(newData, function (key, obj) {
            if (ResNos != "") {
                ResNos = ResNos + "," + obj.RESERVE_NO;
            }
            else {
                ResNos = obj.RESERVE_NO;
            }

        });
    }

    if (ResNos != "")
        FoAutoAllocationWindowLoad(CompId, FoRmChUserId, FoRmChConnStr, pageNm, UnAssArrApiUrl, false, ResNos);
};
