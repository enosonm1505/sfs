
var allFlag = '';
var pmFlag = '';
var Fulldata = [{
    REG_NO: '', R1_NO: '', ROOM_TY_ID: '', ROOM_NO: '', GSTNAME: '', PAX: '', PARTY_NM: '', TRV_AGENT_NM: '', ARRIVAL_DT: '', DEPARTURE_DT: ''
}];

$$("WebixGustSearchPop").config.close = function () {
    alert(1);
}


function GuestPopLoad() {

    var titNm = "";
    if ($("#InHouse").val() == "1")
        titNm = "In HouseGuest Search";
    else
        titNm = "Checked Out Guest Search";

    var Popup = webix.ui({
        //  container: "WebixGustSearchPop",
        view: "window",
        close: true,
        modal: true,
        id: "WebixGustSearchPop",
        head: {
            view: "toolbar",
            cols: [
              { view: "label", label: titNm },
              {
                  view: "icon", icon: "wxi-close", click: function () {
                      $$("WebixGustSearchPop").close();
                      $$("WebixGustSearchPopAdvance").close();
                  }
              }
            ]
        },
        position: "center",
        width: 1100,
        css: "pop",
        body: {
            view: "form",
            elements: [
                {
                    cols: [
                        //{
                //        view: "label",
                //        label: "",
                //        width:450
                //    },
                            {
                                view: "button",
                                id: "PM",
                                value: "P.M",
                                width: 35,
                                on: {
                                    onItemClick: function () {
                                        $$("GustSearchGrid").eachColumn(function (id, col) {
                                            var filter = this.getFilter(id);
                                            if (filter) {
                                                if (filter.setValue) filter.setValue("")	// suggest-based filters 
                                                else filter.value = "";					// html-based: select & text
                                            }
                                        });
                                        $$("GustSearchGrid").filterByAll();

                                        $$("WebixGustSearchPopAdvance").hide();
                                        webix.html.addCss($$("PM").$view, "BtnClr");
                                        webix.html.removeCss($$("All_Guest").$view, "BtnClr");
                                        webix.html.removeCss($$("Advance").$view, "BtnClr");
                                        debugger;


                                        if (pmFlag == 1) {
                                            $("#PM").val("");
                                            pmFlag = 0;
                                            webix.html.removeCss($$("PM").$view, "BtnClr");
                                        }
                                        else {
                                            $("#PM").val("1");
                                            pmFlag = 1;
                                        }

                                        $("#ALLGuest").val("");
                                        GetGuestSearchDet();
                                    }
                                }
                            },
                             {
                                 view: "button",
                                 id: "All_Guest",
                                 value: "All Guest",
                                 width: 70,
                                 on: {
                                     onItemClick: function () {
                                         debugger;
                                         $$("GustSearchGrid").eachColumn(function (id, col) {
                                             var filter = this.getFilter(id);
                                             if (filter) {
                                                 if (filter.setValue) filter.setValue("")	// suggest-based filters 
                                                 else filter.value = "";					// html-based: select & text
                                             }
                                         });
                                         $$("GustSearchGrid").filterByAll();
                                         $$("WebixGustSearchPopAdvance").hide();
                                         webix.html.removeCss($$("PM").$view, "BtnClr");
                                         webix.html.addCss($$("All_Guest").$view, "BtnClr");
                                         webix.html.removeCss($$("Advance").$view, "BtnClr");

                                         if (allFlag == 1) {
                                             $("#ALLGuest").val("");
                                             allFlag = 0;
                                             webix.html.removeCss($$("All_Guest").$view, "BtnClr");
                                         }
                                         else {
                                             $("#ALLGuest").val("1");
                                             allFlag = 1;
                                         }
                                         $("#PM").val("");
                                         //  $("#ALLGuest").val("1");
                                         pmFlag = 0;
                                         GetGuestSearchDet();
                                     }
                                 }
                             },
                              {
                                  view: "button",
                                  id: "Advance",
                                  value: "Advance",
                                  width: 70,
                                  on: {
                                      onItemClick: function () {
                                          debugger;
                                          $$("GustSearchGrid").eachColumn(function (id, col) {
                                              var filter = this.getFilter(id);
                                              if (filter) {
                                                  if (filter.setValue) filter.setValue("")	// suggest-based filters 
                                                  else filter.value = "";					// html-based: select & text
                                              }
                                          });
                                          $$("GustSearchGrid").filterByAll();
                                          webix.html.removeCss($$("PM").$view, "BtnClr");
                                          webix.html.removeCss($$("All_Guest").$view, "BtnClr");
                                          webix.html.addCss($$("Advance").$view, "BtnClr");
                                          $("#PM").val("");
                                          $("#ALLGuest").val("");

                                          //$$("ReferenceTxt").setValue("");
                                          //$$("MobileTxt").setValue("");
                                          //$$("RsrIDTxt").setValue("");

                                          $$("WebixGustSearchPopAdvance").show();
                                      }
                                  }
                              },
                              {
                                  view: "datepicker",
                                  id: "deptDtPkr",
                                  inputWidth: 270,
                                  label: "From Departure Date",
                                  labelWidth: 130,
                                  disabled: false,
                                  stringResult: true,
                                  format: "%d/%m/%Y",
                                  width: 350,
                                  zIndex: "auto",
                                  on: {
                                      'onChange': function () {
                                          //alert();
                                          GetGuestSearchDet();
                                          $$("GustSearchGrid").refresh();
                                      }
                                  },
                              },
                    ]
                },
            {
                id: "GustSearchGrid",
                select: 'row',
                view: "datatable",
                columns: [
                        { id: "REG_NO", header: ['Reg No.', { content: "textFilter" }], width: 70, },
                        { id: "R_NO", header: ['R No.', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' } },
                        { id: "ROOM_TY_ID", header: ['Type', { content: "textFilter" }], width: 60, css: { 'text-align': 'center ! important' } },
                        { id: "ROOM_NO", header: ['Room', { content: "textFilter" }], width: 75, css: { 'text-align': 'center ! important' } },
                      //  { id: "GUEST_INFORM_NM", header: ['Title', { content: "textFilter" }], width: 40, },
                        { id: "GSTNAME", header: ['Guest Name', { content: "textFilter" }], width: 245, },
                        { id: "PAX", header: ['Pax', { content: "textFilter" }], width: 40, css: { 'text-align': 'center ! important' } },
                        { id: "PARTY_NM", header: ['Company', { content: "textFilter" }], width: 170, },
                        { id: "TRV_AGENT_NM", header: ['Agent', { content: "textFilter" }], width: 125, },
                        { id: "GUEST_ID", header: 'GuestId', width: 140, hidden: true },
                        { id: "ARRIVAL_DT", header: ['Arrival Dt', { content: "textFilter" }], width: 100, },
                        { id: "ARRIVAL_TM", header: 'ARRIVAL_TM', width: 140, hidden: true },
                        { id: "DEPARTURE_DT", header: ['Departure Dt', { content: "textFilter" }], width: 100, },
                        { id: "DEPARTURE_TM", header: 'DEPARTURE_TM', width: 140, hidden: true },
                        { id: "RESERVE_NO", header: 'RESERVE_NO', width: 140, hidden: true },
                        { id: "COUNTRY_NM1", header: 'COUNTRY_NM1', width: 140, hidden: true },
                        { id: "DESGN", header: 'DESGN', width: 140, hidden: true },
                        { id: "GROUP_NM", header: 'GROUP_NM', width: 140, hidden: true },
                        { id: "ADULT", header: 'ADULT', width: 140, hidden: true },
                        { id: "CHILD", header: 'CHILD', width: 140, hidden: true },
                        { id: "LSTNM", header: 'LSTNM', width: 140, hidden: true },
                        { id: "FSTNM", header: 'FSTNM', width: 140, hidden: true },
                        { id: "FOINST", header: 'FOINST', width: 140, hidden: true },
                        { id: "BILLINST", header: 'BILLINST', width: 140, hidden: true },
                        { id: "MOBILE", header: 'MOBILE', width: 140, hidden: true },

                ],
                data: Fulldata,
                width: 1100,
                height: 420,
                on: {
                    'onItemDblClick': function (id) {

                        debugger;
                        $$('WebixGustSearchPop').hide();
                        var selectedRows = this.getSelectedItem(id.row);
                        var ROOM_NO = $.trim(selectedRows[0].ROOM_NO);
                        var REG_NO = selectedRows[0].REG_NO;
                        var ROOM_TY_ID = selectedRows[0].ROOM_TY_ID;
                        var GSTNAME = selectedRows[0].GSTNAME;
                        var GUEST_INFORM_NM = selectedRows[0].GUEST_INFORM_NM;

                        var ARRIVAL_DT = selectedRows[0].ARRIVAL_DT;
                        var ARRIVAL_TM = selectedRows[0].ARRIVAL_TM;
                        var DEPARTURE_DT = selectedRows[0].DEPARTURE_DT;
                        var DEPARTURE_TM = selectedRows[0].DEPARTURE_TM;
                        var RESERVE_NO = selectedRows[0].RESERVE_NO;
                        var ADULT = selectedRows[0].ADULT;
                        var CHILD = selectedRows[0].CHILD;
                        var PARTY_NM = selectedRows[0].PARTY_NM;
                        var GUEST_ID = selectedRows[0].GUEST_ID;
                        var LSTNM = selectedRows[0].LSTNM;
                        var FSTNM = selectedRows[0].FSTNM;
                        var FOINST = selectedRows[0].FOINST;
                        var BILLINST = selectedRows[0].BILLINST;

                        var Name = $.trim(selectedRows[0].GUEST_INFORM_NM) + $.trim(selectedRows[0].GSTNAME);
                        $("#hdnRoomNo").val(ROOM_NO);
                        $("#hdnRegNo").val(REG_NO);
                        $("#hdnRmTyId").val(ROOM_TY_ID);
                        $("#hdnGstName").val(GSTNAME);
                        $("#hdnGstInfNm").val(GUEST_INFORM_NM);

                        $("#hdnArrDt").val(ARRIVAL_DT);
                        $("#hdnArrTm").val(ARRIVAL_TM);
                        $("#hdnDeptDt").val(DEPARTURE_DT);
                        $("#hdnDeptTm").val(DEPARTURE_TM);
                        $("#hdnReserveNo").val(RESERVE_NO);
                        $("#hdnAdult").val(ADULT);
                        $("#hdnChild").val(CHILD);
                        $('#hdnPartyNm').val(PARTY_NM);
                        $('#hdnGuestID').val(GUEST_ID);
                        $('#hdnLstNM').val(FSTNM);
                        $('#hdnFstNM').val(LSTNM);
                        $('#hdnFOInst').val(FOINST);
                        $('#HdnBillInst').val(BILLINST);

                        //alert('hi');
                        debugger;
                        var btn = document.getElementById('btnRmOk');
                        btn.click();
                        //$("#btnRmOk").click();
                        this.clearAll();
                        debugger;

                    },
                    'onKeyPress': function (e) {
                        debugger;
                        if (e == '13') {
                            var valid = $$("GustSearchGrid").getSelectedId(true);
                            this.callEvent("onItemDblClick", [valid[0].id]);
                        }
                    }
                },
            },

            {
                view: "label",
                label: " ",
                height: 3
            },
            {
                view: "button", value: "Close", align: "right", inputWidth: 70, on: {
                    onItemClick: function () {
                        $("#PM").val("");
                        $("#ALLGuest").val("");
                        $$('WebixGustSearchPop').hide();
                    }
                }
            },
             //{
             //    cols: [
             //        //{
             ////        view: "label",
             ////        label: "",
             ////        width:450
             ////    },
             //            {
             //                view: "button",
             //                id: "PM",
             //                value: "P.M",
             //                width: 35,
             //                on: {
             //                    onItemClick: function () {
             //                        $$("GustSearchGrid").eachColumn(function (id, col) {
             //                            var filter = this.getFilter(id);
             //                            if (filter) {
             //                                if (filter.setValue) filter.setValue("")	// suggest-based filters 
             //                                else filter.value = "";					// html-based: select & text
             //                            }
             //                        });
             //                        $$("GustSearchGrid").filterByAll();

             //                        $$("WebixGustSearchPopAdvance").hide();
             //                        webix.html.addCss($$("PM").$view, "BtnClr");
             //                        webix.html.removeCss($$("All_Guest").$view, "BtnClr");
             //                        webix.html.removeCss($$("Advance").$view, "BtnClr");
             //                        debugger;

             //                        if (pmFlag == 1) {                                         
             //                            $("#PM").val("");
             //                            pmFlag = 0;
             //                            webix.html.removeCss($$("PM").$view, "BtnClr");
             //                        }
             //                        else {
             //                            $("#PM").val("1");
             //                            pmFlag = 1;
             //                        }

             //                        $("#ALLGuest").val("");
             //                        GetGuestSearchDet();
             //                    }
             //                }
             //            },
             //             {
             //                 view: "button",
             //                 id: "All_Guest",
             //                 value: "All Guest",
             //                 width: 70,
             //                 on: {
             //                     onItemClick: function () {
             //                         debugger;
             //                         $$("GustSearchGrid").eachColumn(function (id, col) {
             //                             var filter = this.getFilter(id);
             //                             if (filter) {
             //                                 if (filter.setValue) filter.setValue("")	// suggest-based filters 
             //                                 else filter.value = "";					// html-based: select & text
             //                             }
             //                         });
             //                         $$("GustSearchGrid").filterByAll();
             //                         $$("WebixGustSearchPopAdvance").hide();
             //                         webix.html.removeCss($$("PM").$view, "BtnClr");
             //                         webix.html.addCss($$("All_Guest").$view, "BtnClr");
             //                         webix.html.removeCss($$("Advance").$view, "BtnClr");

             //                         if (allFlag == 1) {
             //                             $("#ALLGuest").val("");
             //                             allFlag = 0;
             //                             webix.html.removeCss($$("All_Guest").$view, "BtnClr");
             //                         }
             //                         else {
             //                             $("#ALLGuest").val("1");
             //                             allFlag = 1;
             //                         }
             //                         $("#PM").val("");
             //                         //  $("#ALLGuest").val("1");
             //                         pmFlag = 0;
             //                         GetGuestSearchDet();
             //                     }
             //                 }
             //             },
             //              {
             //                  view: "button",
             //                  id: "Advance",
             //                  value: "Advance",
             //                  width: 70,
             //                  on: {
             //                      onItemClick: function () {
             //                          debugger;
             //                          $$("GustSearchGrid").eachColumn(function (id, col) {
             //                              var filter = this.getFilter(id);
             //                              if (filter) {
             //                                  if (filter.setValue) filter.setValue("")	// suggest-based filters 
             //                                  else filter.value = "";					// html-based: select & text
             //                              }
             //                          });
             //                          $$("GustSearchGrid").filterByAll();
             //                          webix.html.removeCss($$("PM").$view, "BtnClr");
             //                          webix.html.removeCss($$("All_Guest").$view, "BtnClr");
             //                          webix.html.addCss($$("Advance").$view, "BtnClr");
             //                          $("#PM").val("");
             //                          $("#ALLGuest").val("");

             //                          //$$("ReferenceTxt").setValue("");
             //                          //$$("MobileTxt").setValue("");
             //                          //$$("RsrIDTxt").setValue("");

             //                          $$("WebixGustSearchPopAdvance").show();
             //                      }
             //                  }
             //              },
             //              {
             //                  view: "datepicker",
             //                  id: "deptDtPkr",
             //                  inputWidth: 220,
             //                  label: "From Departure Date",
             //                  labelWidth: 100,
             //                  stringResult: true,
             //                  format: "%d/%m/%Y",
             //                  width: 350,

             //              },
             //     {
             //         view: "button", value: "Close", align: "right", inputWidth: 70, on: {
             //             onItemClick: function () {
             //                 $("#PM").val("");
             //                 $("#ALLGuest").val("");
             //                 $$('WebixGustSearchPop').hide();
             //             }
             //         }
             //     }]
             //},

            ]
        }


    }

);



    var PopUpTwo = webix.ui({
        //  container: "WebixGustSearchPopAdvance",
        view: "window",
        close: true,
        modal: true,
        id: "WebixGustSearchPopAdvance",
        head: "Advance Search",
        position: "center",
        hieght: 250,
        width: 400,
        body: {
            view: "form",
            elements: [
            {
                view: "text",
                id: "AgentTxt",
                width: 150,
                label: "Agent",
                width: 350,
                hidden: true,

            },
                {
                    view: "text",
                    id: "GroupTxt",
                    width: 150,
                    label: "Group",
                    width: 350,
                    hidden: true,
                },
                 {
                     view: "text",
                     id: "ReferenceTxt",
                     width: 150,
                     label: "Reference",
                     width: 250
                 },
                  {
                      view: "text",
                      id: "MobileTxt",
                      width: 150,
                      label: "Mobile",
                      width: 250
                  },
                   {
                       view: "text",
                       id: "PlaceTxt",
                       width: 150,
                       label: "Place",
                       width: 350,
                       hidden: true,
                   },
                     {
                         view: "text",
                         id: "RsrIDTxt",
                         width: 150,
                         label: "Rsr Id",
                         width: 350
                     },
                   {
                       cols: [{
                           view: "label", label: " ", inputWidth: 70,
                       }, {
                           cols: [{
                               view: "button", value: "Ok", align: "right", inputWidth: 70, on: {
                                   onItemClick: function () {
                                       GetGuestSearchDet();
                                       $$('WebixGustSearchPopAdvance').hide();
                                   }
                               }
                           },
                           {
                               view: "button", value: "Close", align: "right", inputWidth: 70, on: {
                                   onItemClick: function () {
                                       $("#PM").val("");
                                       $("#ALLGuest").val("");
                                       $$('WebixGustSearchPopAdvance').hide();
                                   }
                               }
                           }]
                       }]
                   }
            ]
        }
    });


    $$("deptDtPkr").setValue($("#hdnFrmDeptDt").val());

}

function GetGuestSearchDet() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FoCurrentGuestSearch";
    reqobj["PropID"] = $("#ddlProperty").val();
    reqobj["RegNo"] = "";
    reqobj["ResNo"] = "";
    reqobj["RoomTy"] = "";
    reqobj["Roomno"] = "";
    reqobj["GstNm"] = "";
    reqobj["PartyNm"] = "";
    reqobj["GrpNm"] = $$("GroupTxt").getValue();
    reqobj["TrvAgntNm"] = $$("AgentTxt").getValue();
    reqobj["GstRef"] = $$("ReferenceTxt").getValue();
    // reqobj["ResNo"] = $$("ReservationTxt").getValue();
    reqobj["Place"] = $$("PlaceTxt").getValue();
    reqobj["RsrId"] = $$("RsrIDTxt").getValue();
    reqobj["Mobile"] = $$("MobileTxt").getValue();
    //added by thillai on 12/02/2020
    if ($("#InHouse").val() != "1")
        reqobj["FrmDeptDt"] = $$("deptDtPkr").getValue();
    else
        reqobj["FrmDeptDt"] = "";

    if ($("#hdnTrnfRmNo").val() != undefined)
        reqobj["TrnfRmNo"] = $("#hdnTrnfRmNo").val();//for guest charge trnanfser
    else
        reqobj["TrnfRmNo"] = "";

    reqobj["AllGst"] = $("#ALLGuest").val();
    reqobj["PM"] = $("#PM").val();
    reqobj["InHouseGstFlag"] = $("#InHouse").val();
    reqobj["USRID"] = $("#UserId").val();
    reqobj["COMPID"] = $("#CompanyId").val();
    reqobj["CONSTRING"] = $("#ConnStr").val();
    var url = window.location.pathname;

    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');
    //alert(urlSpl);

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {

            debugger;
            if (d.d != "") {
                rowDatad = JSON.parse(d.d)
                $$("GustSearchGrid").clearAll();
                $$("GustSearchGrid").parse(rowDatad);
                $$('WebixGustSearchPop').show();
                $$("GustSearchGrid").refresh();
            }
            else {
                $$("GustSearchGrid").clearAll();
                $$('WebixGustSearchPop').show();
            }
        }
    });
    debugger;
    if ($("#InHouse").val() == "1") {
        $$("deptDtPkr").hide();
    }
    else {
        $$("deptDtPkr").show();
    }
    $$('WebixGustSearchPop').show();
}