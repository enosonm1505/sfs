
function gridOrgListLoad(e) {
    //debugger;

    $("#pageloads").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_SMROOMPOSITION";
    dataparam["ROOMTY"] = $("#BTN_TYPE").val()
    dataparam["FRMDT"] = $$("txtArrival").getValue();
    dataparam["TODT"] = $$("txtDepart").getValue();
    dataparam["CPROPID"] = $$("ddlProperty").getValue();
    var DataVal = JSON.stringify(dataparam);

    //var chkTentative = "";
    //if ($("#chkTentative")[0].checked == true)
    //    chkTentative = "Y";
    //else
    //    chkTentative = "N";

    $.ajax({
        type: "POST",
        async: true,
        url: "/SalesAndMarket/APIWCF_CALL",
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                
                debugger;
               var rowDatad = JSON.parse(data);

                if (rowDatad.ErrorMsg != "") {
                    $("#pageloads").hide();
                    alert(rowDatad.ErrorMsg);
                    return;
                }

                if (data == "NOROOMTYPES") {
                    $("#pageloads").hide();
                }

               
                if ($$("grdRoomPos") != undefined) {
                    $$("grdRoomPos").destructor();
                }

                GridDesign();
                var ColVal = [];

                $.each(rowDatad.GridCol, function (key, value) {
                    if (value == "Title") {
                        var set = {
                            id: $.trim(value), header: { text: "", height: 30, css: "Emptybg" }, css: { 'text-align': 'left !important' }, width: 130,
                            cssFormat: SetCondition,
                        };
                    }
                    else {
                        var Settext = value.substring(1, value.length);

                        if (~value.indexOf("~R")) {
                            var set = {
                                id: $.trim(value), header: { text: Settext.substring(0, Settext.length - 2), height: 30, css: "HolyDaybg" }, css: { 'text-align': 'center !important' }, width: 45,
                            };
                        }
                        else {
                            var set = {
                                id: $.trim(value), header: { text: Settext, height: 30, css: "YellowRows" }, css: { 'text-align': 'center !important' }, width: 45,
                                cssFormat: SetCondition,
                            };
                        }
                    }
                    ColVal.push(set);
                });

                $$("grdRoomPos").config.columns = ColVal;
                $$("grdRoomPos").refreshColumns();

                $$("grdRoomPos").parse(rowDatad.GridOpp);
            }

            $("#pageloads").hide();
        },
        error: function () {
            $("#pageloads").hide();
        },
        complete: function () {
            $("#pageloads").hide();
        }

    });
}

function GridDesign() {
    webix.ui({
        id: "grdRoomPos",
        container: "grdRoomPosdiv",
        select: 'cell',
        view: "treetable",                
        fixedRowHeight: false,
        rowLineHeight: 23,
        autoConfig: true,                
        data: [],
        scheme: {
            $change: function (item) {  
                if (item.Title == "Days") {
                    item.$css = "YellowRows1";
                    item.Title = "";
                }
                else if (item.Title == "Total Vacant") {
                    item.$css = "VacantColor";
                }
            }
        },
        on: {
            'onItemClick': function (id, value, index) {
                var getval = this.getItem(id.row);
                if (getval.Title != "" && getval.Title != "Total Vacant" && id.column != "Title") {

                    //var FO_IND = '<%=Session["FO_IND"]%>';

                    //var F = "";
                    //var T = "";
                    //var ARRDT = "";
                    //var DEPTDT = "";
                    //var RMTY = "";

                    //var FrmDt = $("#FromDate").val();
                    //var ToDt = $("#ToDate").val();
                    //$.ajax({
                    //    type: "POST",
                    //    async: false,
                    //    url: "/SalesAndMarket/RoomposGetDate",
                    //    data: "FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&F=" + F + "&T=" + T,
                    //    success: function (data) {
                    //        ARRDT = data.v;
                    //        DEPTDT = data.w;
                    //    }
                    //});

                    //$("#RMTY").val(RMTY);
                    //$("#ARRDT").val(ARRDT);
                    //$("#DEPTDT").val(DEPTDT);

                    //webix.ui({
                    //    id: "RmBookPopup",
                    //    view: "window",
                    //    position: "Center",
                    //    head: "Select Options",
                    //    height: 120,
                    //    width: 200,
                    //    close: true,
                    //    body: {
                    //        view: 'form',
                    //        minWidth: 200,
                    //        maxWidth: 100,
                    //        elements: [
                    //            {
                    //                PaddingY: 20,
                    //                maxheight: 20,
                    //                paddingX: 10,
                    //                rows: [
                    //                    {
                    //                        view: "label",
                    //                        id: "lblReserv",
                    //                        label: "Reservation (confirm)",
                    //                        labelAlign: "left",
                    //                        hidden: (FO_IND == 1 || FO_IND == 3 ? true : false),
                    //                        css: "Poptext",
                    //                        "click": function (id, event) {

                    //                            var RMTY = $("#RMTY").val();
                    //                            var ARRDT = $("#ARRDT").val();
                    //                            var DEPTDT = $("#DEPTDT").val();
                    //                            var STS = "1";
                    //                            ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);

                    //                            $$('RmBookPopup').hide();



                    //                        }
                    //                    },
                    //                      {
                    //                          view: "label",
                    //                          id: "lblWait",
                    //                          label: "Waiting List",
                    //                          labelAlign: "left",
                    //                          hidden: (FO_IND == 2 || FO_IND == 3 ? true : false),
                    //                          css: "Poptext",
                    //                          "click": function (id, event) {

                    //                              var RMTY = $("#RMTY").val();
                    //                              var ARRDT = $("#ARRDT").val();
                    //                              var DEPTDT = $("#DEPTDT").val();
                    //                              var STS = "2";
                    //                              ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);

                    //                              $$('RmBookPopup').hide();
                    //                          }
                    //                      }
                    //                ]
                    //            }
                    //        ]
                    //    }

                    //}).show();
                }
            },
            onBeforeSelect: function (id) {
                    return false;
            },
            onBeforeClose: function () {
                return false;
            },
        },
    });
}

function SetCondition(value, config, id) {
    if (value < 0) {
        return { "background-color": "#ec2e2e", "color": "White", "font-weight": "Bold", "font-family": "Arial !important;" };
    }
    else if (value == "") {
        return { "background-color": "#fff !important", "border-bottom": " 1px solid #fff ! important", "border-top": " 1px solid #fff ! important" };
    }
};

//function SMDateChange() {
//    var From = $("#FromDate").val();
//    var To = $("#ToDate").val();

//    var BTN_TYPE = $("#BTN_TYPE").val();
//    $.ajax({
//        type: "POST",
//        url: "/SalesAndMarket/RMDateValidation",
//        async: false,
//        cache: false,
//        charset: 'utf-8',
//        data: "F=" + From + "&T=" + To + "&BTN_TYPE=" + BTN_TYPE,
//        success: function (data) {
//            if (data.d == "FALSE") {
//                $("#BTN_TYPE").val("");
//                $("#AlertMessageHdn").val("Depature date  should not be less than To Arrival date...!");
//                $("#alertType").val('fail');
//                AlertMesaage();
//                return false;
//            }
//            else if (data.d == "N") {
//                $("#BTN_TYPE").val("");
//            }
//            else {
//                $("#ToDate").val(data.d);
//            }
//        }
//    });
//    return true;
//}

//$("#RoomPositionGrid").on("mouseup", "tr", function (e) {
//    var grid = $("#RoomPositionGrid").data("kendoGrid");
//    var row = $(this).closest("tr");
//    var rowIndex = $("tr", grid.tbody).index(row);
//    var no = rowIndex;
//    if (Number(rowIndex) >= 2) {
//        var gridSelect = grid.select();
//        var len = gridSelect.length;
//        var RMTY = grid.dataSource._data[no].Title;
//        var ARRDT = "";
//        var DEPTDT = "";
//        var F = Number(gridSelect[0].cellIndex) - 1;
//        var T = Number(gridSelect[Number(len) - 1].cellIndex) - 1;
//        var FrmDt = $("#FromDate").val();
//        var ToDt = $("#ToDate").val();
//        $.ajax({
//            type: "POST",
//            async: false,
//            url: "/SalesAndMarket/RoomposGetDate",
//            data: "FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&F=" + F + "&T=" + T,
//            success: function (data) {
//                ARRDT = data.v;
//                DEPTDT = data.w;
//            }
//        });

//        $("#RMTY").val(RMTY);
//        $("#ARRDT").val(ARRDT);
//        $("#DEPTDT").val(DEPTDT);
//        var x = e.screenX;
//        var y = e.screenY;
//        var Menu = $("#menu").data("kendoContextMenu");
//        x = Number(x) - 10;
//        y = Number(y) - 150;

//        var FO_IND = '<%=Session["FO_IND"]%>';

//        if (FO_IND == "1") {
//            $("#options").show();
//            $("#Reservation").show();
//            $("#WaitList").hide();
//            Menu.open(x, y);
//        }
//        else if (FO_IND == "2") {
//            $("#options").show();
//            $("#Reservation").hide();
//            $("#WaitList").show();
//            Menu.open(x, y);
//        }
//        else if (FO_IND == "3") {
//            $("#options").show();
//            $("#Reservation").show();
//            $("#WaitList").show();
//            Menu.open(x, y);
//        }
//        else {
//            $("#Reservation").hide();
//            $("#WaitList").hide();
//            $("#options").hide();
//            Menu.close();
//        }
//    }
//});

// $("#Reservation").click(function (e) {
//    var RMTY = $("#RMTY").val();
//    var ARRDT = $("#ARRDT").val();
//    var DEPTDT = $("#DEPTDT").val();
//    var STS = "1";
//    ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);
//});

//$("#WaitList").click(function (e) {
//    var RMTY = $("#RMTY").val();
//    var ARRDT = $("#ARRDT").val();
//    var DEPTDT = $("#DEPTDT").val();
//    var STS = "2";
//    ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);
//});

//function ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS) {
//    var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
//    var COMPID = $("#Property").data('kendoDropDownList').value();
//    var SW = Number(screen.width) - 20;
//    var Sh = Number(screen.height) - 100;
//    window.open("/FO/Reservation.aspx?RMPOS=1" +
//   "&RMTY=" + RMTY + "&ARRDT=" + ARRDT + "&DEPTDT=" + DEPTDT + "&COMPID=" + COMPID + "&SLID=" + SALE_PER_ID + "&RMSTS=" + STS, "Reservation", "width=1200,height=600,left=50,top=30 ");
//};

//function ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS) {
//    var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
//    var COMPID = $("#Property").data('kendoDropDownList').value();
//    var SW = Number(screen.width) - 20;
//    var Sh = Number(screen.height) - 100;
//    window.open("/FO/Reservation.aspx?RMPOS=1" +
//   "&RMTY=" + RMTY + "&ARRDT=" + ARRDT + "&DEPTDT=" + DEPTDT + "&COMPID=" + COMPID + "&SLID=" + SALE_PER_ID + "&RMSTS=" + STS, "Reservation", "width=1200,height=600,left=50,top=30 ");
//};

//if (Page != "1") {
//    var date = '<%=Session["CURR_DT"]%>';
//    $("#FromDate").data("kendoDatePicker").value(date);

//    $.ajax({
//        type: "POST",
//        url: "/SalesAndMarket/RMDateAdd",
//        async: false,
//        cache: false,
//        charset: 'utf-8',
//        data: "F=" + date,
//        success: function (data) {
//            $("#ToDate").data("kendoDatePicker").value(data.d);
//        }
//    });
//}
//else {
//    var ARRV = '<%=Session["ARRV"]%>';
//    var DEPA = '<%=Session["DEPA"]%>';
//    $("#FromDate").data("kendoDatePicker").value(ARRV);
//    $("#ToDate").data("kendoDatePicker").value(DEPA);
//}

//function display() {
//    //
//    if (!SMDateChange()) {
//        //
//        return false;
//    }
//    var BTN_TYPE = $("#BTN_TYPE").val();
//    var FrmDt = $("#FromDate").val();
//    var ToDt = $("#ToDate").val();
//    var ddl = "";

//    var chkTentative = "";
//    if ($("#chkTentative")[0].checked == true)
//        chkTentative = "Y";
//    else
//        chkTentative = "N";

//    $.ajax({
//        type: "POST",
//        async: false,
//        url: "/SalesAndMarket/SM_RptRoomPositionGrid",
//        data: "BTN_TYPE=" + BTN_TYPE + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&ddl=" + ddl + "&chkTanTiv=" + chkTentative,
//        success: function (data) {
//            
//            if (data.Response != "NoRoomType") {
//                var result = $.parseJSON(data.ResponseStr);
//                var dataresult = "";
//                $("#RoomPositionGrid").kendoGrid({
//                    scrollable: {
//                        scrollable: true,
//                        height: "300px"
//                    },
//                    pageable: false,
//                    resizable: true,
//                    Batch: true,
//                    navigatable: true,
//                    selectable: "multiple cell",
//                    dataBound: function (e) {
//                        var grid = $("#RoomPositionGrid").data("kendoGrid");
//                        
//                        var data = grid.dataSource.data();
//                        var datalen = data.length - 1;
//                        var d = 0;
//                        $.each(data, function (i, row) {
//                            var m = 0;
//                            var element = $('tr[data-uid="' + row.uid + '"]');

//                            //
//                            var element3 = $('tr[data-uid="' + row.uid + '"] ');
//                            for (; m < element3[0].cells.length; m++) {
//                                if (m == (element3[0].cells.length - 1))
//                                    element3.addClass("gridRowBorder");

//                            }
//                            if (element.length > 0) {
//                                d = 0;
//                                for (; d < element[0].cells.length; d++) {

//                                    var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + (d + 1) + ')');

//                                    var dtxt = [];
//                                    var cellval = "";
//                                    cellval = element[0].cells[d].innerText;
//                                    dtxt = cellval.split('~');
//                                    var len = dtxt.length;
//                                    if (len > 1) {
//                                        element[0].cells[d].innerText = dtxt[0];
//                                        element2.addClass("rowHeadColor");
//                                        // element[0].cells[d].HtmlAttributes["style"] = "background:red;";
//                                    }
//                                    else if (cellval < 0) {
//                                        if (i == datalen)
//                                        { }
//                                        else
//                                            element2.addClass("rowNegtvColor");
//                                    }
//                                    if (datalen == i) {
//                                        if (d == 0) { element2.addClass("boldVacant"); }
//                                        else
//                                            element2.addClass("VacantColor");
//                                    }
//                                    else {
//                                        if (i > 1) {
//                                            if (d == 0) element2.addClass("RowColor");
//                                        }
//                                        element2.addClass("GridFontSize");
//                                    }

//                                    if (i == 1) {
//                                        element2.addClass("fontWeightGrid");
//                                    }
//                                }
//                            }
//                        })
//                        for (var i = 0; i < grid.columns.length; i++) {
//                            grid.autoFitColumn(i);
//                        }
//                    },
//                    ServerOperation: false,
//                    dataSource: {
//                        data: result.GridOpp,
//                        pageSize: 500
//                    }
//                });
//            }
//            else {
//                $("#BTN_TYPE").val("");
//                $("#AlertMessageHdn").val("No Room Types are available...!");
//                $("#alertType").val('fail');
//                AlertMesaage();
//                return false;
//            }
//        }
//    });
//    //var grid = $("#RoomPositionGrid");
//    //grid.addClass("kendogrid");
//}

//$("#RoomPositionGrid").on("mouseup", "tr", function (e) {
//    var grid = $("#RoomPositionGrid").data("kendoGrid");
//    var row = $(this).closest("tr");
//    var rowIndex = $("tr", grid.tbody).index(row);
//    var no = rowIndex;
//    if (Number(rowIndex) >= 2) {
//        var gridSelect = grid.select();
//        var len = gridSelect.length;
//        var RMTY = grid.dataSource._data[no].Title;
//        var ARRDT = "";
//        var DEPTDT = "";
//        var F = Number(gridSelect[0].cellIndex) - 1;
//        var T = Number(gridSelect[Number(len) - 1].cellIndex) - 1;
//        var FrmDt = $("#FromDate").val();
//        var ToDt = $("#ToDate").val();
//        $.ajax({
//            type: "POST",
//            async: false,
//            url: "/SalesAndMarket/RoomposGetDate",
//            data: "FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&F=" + F + "&T=" + T,
//            success: function (data) {
//                ARRDT = data.v;
//                DEPTDT = data.w;
//            }
//        });

//        $("#RMTY").val(RMTY);
//        $("#ARRDT").val(ARRDT);
//        $("#DEPTDT").val(DEPTDT);
//        var x = e.screenX;
//        var y = e.screenY;
//        var Menu = $("#menu").data("kendoContextMenu");
//        x = Number(x) - 10;
//        y = Number(y) - 150;

//        var FO_IND = '<%=Session["FO_IND"]%>';

//        if (FO_IND == "1") {
//            $("#options").show();
//            $("#Reservation").show();
//            $("#WaitList").hide();
//            Menu.open(x, y);
//        }
//        else if (FO_IND == "2") {
//            $("#options").show();
//            $("#Reservation").hide();
//            $("#WaitList").show();
//            Menu.open(x, y);
//        }
//        else if (FO_IND == "3") {
//            $("#options").show();
//            $("#Reservation").show();
//            $("#WaitList").show();
//            Menu.open(x, y);
//        }
//        else {
//            $("#Reservation").hide();
//            $("#WaitList").hide();
//            $("#options").hide();
//            Menu.close();
//        }
//    }
//});

// $("#Reservation").click(function (e) {
//    var RMTY = $("#RMTY").val();
//    var ARRDT = $("#ARRDT").val();
//    var DEPTDT = $("#DEPTDT").val();
//    var STS = "1";
//    ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);
//});

//$("#WaitList").click(function (e) {
//    var RMTY = $("#RMTY").val();
//    var ARRDT = $("#ARRDT").val();
//    var DEPTDT = $("#DEPTDT").val();
//    var STS = "2";
//    ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS);
//});

//function ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS) {
//    var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
//    var COMPID = $("#Property").data('kendoDropDownList').value();
//    var SW = Number(screen.width) - 20;
//    var Sh = Number(screen.height) - 100;
//    window.open("/FO/Reservation.aspx?RMPOS=1" +
//   "&RMTY=" + RMTY + "&ARRDT=" + ARRDT + "&DEPTDT=" + DEPTDT + "&COMPID=" + COMPID + "&SLID=" + SALE_PER_ID + "&RMSTS=" + STS, "Reservation", "width=1200,height=600,left=50,top=30 ");
//};


//function ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS) {
//    var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
//    var COMPID = $("#Property").data('kendoDropDownList').value();
//    var SW = Number(screen.width) - 20;
//    var Sh = Number(screen.height) - 100;
//    window.open("/FO/Reservation.aspx?RMPOS=1" +
//   "&RMTY=" + RMTY + "&ARRDT=" + ARRDT + "&DEPTDT=" + DEPTDT + "&COMPID=" + COMPID + "&SLID=" + SALE_PER_ID + "&RMSTS=" + STS, "Reservation", "width=1200,height=600,left=50,top=30 ");
//};


//function ReservationWindowCall(RMTY, ARRDT, DEPTDT, STS) {
//    var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
//    var COMPID = $("#Property").data('kendoDropDownList').value();
//    var SW = Number(screen.width) - 20;
//    var Sh = Number(screen.height) - 100;
//    window.open("/FO/Reservation.aspx?RMPOS=1" +
//   "&RMTY=" + RMTY + "&ARRDT=" + ARRDT + "&DEPTDT=" + DEPTDT + "&COMPID=" + COMPID + "&SLID=" + SALE_PER_ID + "&RMSTS=" + STS, "Reservation", "width=1200,height=600,left=50,top=30 ");
//};
