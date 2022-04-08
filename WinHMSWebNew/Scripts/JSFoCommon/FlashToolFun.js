//==================================================================  Room Status ==============================================================================
var Resr = "", Advance1 = "", ResrCheck = "", MenuPriv = "";
var RoomBlock = "", DirtyRoom = "", GuestAmdSty = "", CheckOut = "";
var GuestLedg = "", ForeEx = "", Guestchrg = "", GuestInfo = "";
var GuestProf = "", Paidout = "", Refund = ""; PostTrf1 = ""; WalkIn = ""; PostTrffAll = "";
var ReserAd = "",RegCardPrint = "";
function fnRoomStatusLoadData(val) {
   
    $("#LoadDIv").show();

    CallRoomInfoDivFlash();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_FLASHROOMSTATUS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["RmSeq"] = $("#ChkRmStsSeq").val();
    dataparam["RmFilter"] = $("#RmFilter").val();
    dataparam["RmBuild"] = $("#RmBuildid").val();
    dataparam["chkPmInd"] = $("#ChkRmStsPM").val();
    dataparam["VType"] = $("#VType").val();
    dataparam["vFrmRm"] = $("#vFrmRm").val();
    dataparam["vToRm"] = $("#vToRm").val();
    dataparam["Feature_Ids"] = $("#RmFeatids").val();
   

    MenuPriv  = prcGetUserMenuPriv();
    Resr = MenuPriv[0].Reservation;
    Advance1 = MenuPriv[0].Advance;
    ResrCheck = MenuPriv[0].ResrCheck;
    DirtyRoom = MenuPriv[0].DirtyRoom;
    RoomBlock = MenuPriv[0].RoomBlock;
    GuestAmdSty = MenuPriv[0].GuestAmdSty;
    CheckOut = MenuPriv[0].CheckOut;
    GuestLedg = MenuPriv[0].GuestLedg;
    ForeEx = MenuPriv[0].ForeEx;
    Guestchrg = MenuPriv[0].Guestchrg;
    GuestInfo = MenuPriv[0].GuestInfo;
    GuestProf = MenuPriv[0].GuestProf;
    Paidout = MenuPriv[0].Paidout;
    Refund = MenuPriv[0].Refund;
    PostTrf1 = MenuPriv[0].PostTrff;
    WalkIn = MenuPriv[0].WalkIn;
    PostTrffAll = MenuPriv[0].PostTrffAll;
    ReserAd = MenuPriv[0].ReserAd;
    RegCardPrint = MenuPriv[0].RegCardPrint;

   
   
    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        async: true,
        url: "/FoTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {

                //
                var rowDatad = JSON.parse(data);

                if ($$("grdRoomStatusfrm"))
                    $$("grdRoomStatusfrm").destructor();

                
                fnRoomStatusDesign(val);

                $$("grdRoomStatus").clearAll();
                $$("grdRoomStatus").parse(rowDatad.dtroom);
                $$("grdRoomStatus").show();

                var Val = document.getElementById('lblDueIn').innerHTML;
                document.getElementById('lblDueIn').innerHTML = rowDatad.DueInCount;

                var Val = document.getElementById('lblDueOut').innerHTML;
                document.getElementById('lblDueOut').innerHTML = rowDatad.DueOutCount;

                var Val = document.getElementById('lblUnassDueIn').innerHTML;
                document.getElementById('lblUnassDueIn').innerHTML = rowDatad.UnAssDueInCount;
           

                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}

function fnRoomStatusDesign(val) {
    var count = 0;
    var wid_Val = '';
    if (val != '' && val != undefined) {
        wid_Val = val == 1 ? 58 : 68;
    }
    CallRoomInfoDivFlash();
    wid_Val = wid_Val == '' ? 58 : wid_Val;
    webix.ui({
        view: 'form',
        id: "grdRoomStatusfrm",
        css: "my_style",
        container: "grdRoomStatusfrm",
      //  minWidth: 900,
        
        //height: 450,
        elements: [
            {
                paddingX: 0,
                cols: [
                    {
                        rows: [
                             {
                                 cols: [
                                     {
                                         view: "datatable",
                                         id: "grdRoomStatus",
                                         select: "cell",
                                         header: false,
                                         data: [],
                                         css: "my_style",
                                         //minWidth: 900,
                                         //  maxWidth: 1920,
                                         //height: 420,
                                         
                                         columns: [
                                                {
                                                    header: "", id: "Col0",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col0).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                               {
                                                   header: "", id: "Col1",
                                                   template: function (obj) {

                                                       var array = $.trim(obj.Col1).split('~');
                                                       var RoomNo = array[0].toString();
                                                       return RoomNo;
                                                   },
                                                   width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                               },
                                               {
                                                   header: "", id: "Col2",
                                                   template: function (obj) {

                                                       var array = $.trim(obj.Col2).split('~');
                                                       var RoomNo = array[0].toString();
                                                       return RoomNo;
                                                   },
                                                   width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                               },
                                               {
                                                   header: "", id: "Col3",
                                                   template: function (obj) {

                                                       var array = $.trim(obj.Col3).split('~');
                                                       var RoomNo = array[0].toString();
                                                       return RoomNo;
                                                   },
                                                   width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                               },
                                                 {
                                                     header: "", id: "Col4",
                                                     template: function (obj) {

                                                         var array = $.trim(obj.Col4).split('~');
                                                         var RoomNo = array[0].toString();
                                                         return RoomNo;
                                                     },
                                                     width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                 },
                                                {
                                                    header: "", id: "Col5",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col5).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                                 {
                                                     header: "", id: "Col6",
                                                     template: function (obj) {

                                                         var array = $.trim(obj.Col6).split('~');
                                                         var RoomNo = array[0].toString();
                                                         return RoomNo;
                                                     },
                                                     width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                 },
                                                {
                                                    header: "", id: "Col7",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col7).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                                {
                                                    header: "", id: "Col8",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col8).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                               {
                                                   header: "", id: "Col9",
                                                   template: function (obj) {

                                                       var array = $.trim(obj.Col9).split('~');
                                                       var RoomNo = array[0].toString();
                                                       return RoomNo;
                                                   },
                                                   width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                               },
                                                {
                                                    header: "", id: "Col10",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col10).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                               {
                                                   header: "", id: "Col11",
                                                   template: function (obj) {

                                                       var array = $.trim(obj.Col11).split('~');
                                                       var RoomNo = array[0].toString();
                                                       return RoomNo;
                                                   },
                                                   width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                               },
                                                 {
                                                     header: "", id: "Col12",
                                                     template: function (obj) {

                                                         var array = $.trim(obj.Col12).split('~');
                                                         var RoomNo = array[0].toString();
                                                         return RoomNo;
                                                     },
                                                     width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                 },
                                                {
                                                    header: "", id: "Col13",
                                                    template: function (obj) {

                                                        var array = $.trim(obj.Col13).split('~');
                                                        var RoomNo = array[0].toString();
                                                        return RoomNo;
                                                    },
                                                    width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                },
                                              {
                                                  header: "", id: "Col14",
                                                  template: function (obj) {

                                                      var array = $.trim(obj.Col14).split('~');
                                                      var RoomNo = array[0].toString();
                                                      return RoomNo;
                                                  },
                                                  width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                              },
                                              {
                                                  header: "", id: "Col15",
                                                  template: function (obj) {
                                                      var array = $.trim(obj.Col15).split('~');
                                                      var RoomNo = array[0].toString();
                                                      return RoomNo;
                                                  },
                                                  width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                              },
                                              {
                                                  header: "", id: "Col16",
                                                  template: function (obj) {
                                                      var array = $.trim(obj.Col16).split('~');
                                                      var RoomNo = array[0].toString();
                                                      return RoomNo;
                                                  },
                                                  width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                              },
                                              {
                                                  header: "", id: "Col17",
                                                  template: function (obj) {
                                                      var array = $.trim(obj.Col17).split('~');
                                                      var RoomNo = array[0].toString();
                                                      return RoomNo;
                                                  },
                                                  width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                              },



                                         ],

                                         scheme: {
                                             $init: function (item) {
                                                 //
                                                 fnRetCssFlash(item);
                                             },
                                         },
                                         on: {
                                             'onItemClick': function (id, index, cell) {
                                                 //

                                                 var getval = this.getItem(id.row);

                                                 var vCol = id.column;

                                                 $.each(getval, function (k, v) {
                                                     //

                                                     if (k == vCol) {

                                                         var array = $.trim(v).split('~');
                                                         var RoomNo = array[0].toString();

                                                         var Status = "";
                                                         
                                                         if (array[1].toString().includes("#") == true) {
                                                             var stsArr = array[1].toString().split('#');
                                                             Status = stsArr[0].toString();
                                                             
                                                         }
                                                         else
                                                             Status = array[1].toString();

                                                         //var Status = array[1].toString();
                                                         var RmTyid = array[2].toString();
                                                         var RegNo = array[3].toString();
                                                         var RmTyNM = array[4].toString();
                                                         var GstNm = array[5].toString();


                                                         PrcLRoomStausPopup(RegNo, RoomNo, Status, RmTyid, RmTyNM, GstNm);

                                                         //var MenuPriv = prcGetUserMenuPriv();

                                                         if ($.trim(Status) == "D") {
                                                             if ($.trim(DirtyRoom) == "1") {
                                                                 $$("lblRmDirtyPopup").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmDirtyPopup").hide();
                                                         }
                                                         else if ($.trim(Status) == "M") {
                                                         }
                                                         else if ($.trim(Status) == "V") {

                                                             if ($.trim(RoomBlock) == "1")
                                                                 {
                                                                 $$("lblRmVacBlck").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmVacBlck").hide();

                                                             if ($.trim(WalkIn) == "1")
                                                                 {
                                                                 $$("lblRmVacwalkin").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmVacwalkin").hide();
                                                         }
                                                         else if ($.trim(Status) == "OB" || $.trim(Status) == "OW" || $.trim(Status) == "OBU" || $.trim(Status) == "OWU") {

                                                             if ($.trim(Advance1) == "1") {
                                                                 $$("lblRmOccadv").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccadv").hide();

                                                             if ($.trim(GuestAmdSty) == "1")
                                                                 {
                                                                 $$("lblRmOccAmdGsty").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccAmdGsty").hide();

                                                             if ($.trim(CheckOut) == "1")
                                                                 {
                                                                 $$("lblRmOccChkout").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccChkout").hide();

                                                             if ($.trim(Status) == "OW" || $.trim(Status) == "OWU") {
                                                                 if ($.trim(DirtyRoom) == "1"){
                                                                     $$("lblRmOccClrDirty").show();
                                                                     count++;
                                                                 }
                                                                 else
                                                                     $$("lblRmOccClrDirty").hide();
                                                             }

                                                             if ($.trim(GuestLedg) == "1"){
                                                                 $$("lblRmOccCurGstLed").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccCurGstLed").hide();


                                                             if ($.trim(ForeEx) == "1"){
                                                                 $$("lblRmOccFExc").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccFExc").hide();

                                                             if ($.trim(MenuPriv[0].Guestchrg) == "1")
                                                                 {
                                                                 $$("lblRmOccGstChrg").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccGstChrg").hide();

                                                             if ($.trim(GuestInfo) == "1"){
                                                                 $$("lblRmOccGstInfAmd").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccGstInfAmd").hide();

                                                             if ($.trim(GuestProf) == "1"){
                                                                 $$("lblRmOccGstProf").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccGstProf").hide();

                                                             if ($.trim(Paidout) == "1") {
                                                                 $$("lblRmOccPaidOut").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccPaidOut").hide();

                                                             if ($.trim(PostTrf1) == "1"){
                                                                 $$("lblRmOccPostTar").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccPostTar").hide();

                                                             if ($.trim(Refund) == "1"){
                                                                 $$("lblRmOccRefunds").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmOccRefunds").hide();
                                                         }
                                                         else if ($.trim(Status) == "BG") {
                                                             if ($.trim(RoomBlock) == "1"){
                                                                 $$("lblRmBClrBlk").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmBClrBlk").hide();

                                                         } else if ($.trim(Status) == "B") {
                                                             if ($.trim(RoomBlock) == "1"){
                                                                 $$("lblRmBClrBlk").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmBClrBlk").hide();
                                                         }

                                                         else if ($.trim(Status) == "BM") {
                                                             if ($.trim(RoomBlock) == "1"){
                                                                 $$("lblRmBClrBlk").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmBClrBlk").hide();
                                                         }
                                                         else if ($.trim(Status) == "BGD") {
                                                             if ($.trim(DirtyRoom) == "1") {
                                                                 $$("lblRmDirtyPopup").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmDirtyPopup").hide();

                                                             if ($.trim(RoomBlock) == "1") {
                                                                 $$("lblRmBClrBlk").show();
                                                                 count++;
                                                             }
                                                             else
                                                                 $$("lblRmBClrBlk").hide();
                                                         }
                                                     }
                                                 });
                                             }
                                         }
                                     }

                                 ]
                             }
                        ]
                    }
                ]
            }
        ],

    });
    gridResize("1");
}

//==============================================================================================================================================================

function fnRoomBuidingData() {
    //
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOBULDING";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });
    return rowData;
}

function PrcLRoomStausPopup(RegNo, RoomNo, Status, RmTyid, RmTyNM, GstNm) {

    //
    var vhight = 80;

    if ($.trim(Status) == "V")
        vhight = 100;
    else if ($.trim(Status) == "B")
        vhight = 70;
    else if ($.trim(Status) == "OB" || $.trim(Status) == "OW" || $.trim(Status) == "OBU" || $.trim(Status) == "OWU")
        vhight = 360;

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MENUNMPOPUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var PostTrf = "";
    var Advance = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                PostTrf = rowData[0].PostTrff;
                Advance = rowData[0].Advance;
            }
        },
    });

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupRoomSts",
        head: RoomNo + "- " + (GstNm == "" ? RmTyNM : GstNm),
        position: "center",
        minWidth: 250,
        maxWidth: 250,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        //height: 350,
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            //scroll: "y",
            height: vhight,
            elements: [
                {
                    rows: [
                        {
                            id: "lblRmBClrBlk",
                            view: 'label',
                            label: 'Clear Room Block',
                            maxWidth: 70,
                            hidden: true,
                            on: {
                                onItemClick: function () {
                                    //
                                    var pageNm = "FORoomBlocking.aspx";
                                    var pagelink = "Room Blocking";

                                    var BlockTy = "";

                                    if ($.trim(Status) == "B")
                                        BlockTy = "MAINTAINENCE";
                                    else if ($.trim(Status) == "BG")
                                        BlockTy = "GUEST";
                                    else if ($.trim(Status) == "BM")
                                        BlockTy = "MANAGEMENT";

                                    var str = window.location.href;
                                    var Url = str.replace("FoTrans/FOFlashTools", "");

                                    //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + RmTyid + '' + '&TYPE=' + $.trim(BlockTy) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
                                    window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + RmTyid + '' + '&TYPE=' + $.trim(BlockTy) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
                                    $$("PopupRoomSts").hide();
                                }
                            }
                        },

                        {
                            id: "lblRmVacBlck",
                            view: 'label',
                            label: 'Room Blocking',
                            maxWidth: 70,
                            hidden: true,
                            on: {
                                onItemClick: function () {
                                    //
                                    var pageNm = "FORoomBlocking.aspx";
                                    var pagelink = "Room Blocking";

                                    var typelist = "";

                                    var str = window.location.href;
                                    var Url = str.replace("FoTrans/FOFlashTools", "");

                                    //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + $.trim(RmTyid) + '' + '&TYPE=' + $.trim(typelist) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
                                    window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + $.trim(RmTyid) + '' + '&TYPE=' + $.trim(typelist) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');

                                    $$("PopupRoomSts").hide();
                                }
                            }
                        },
                         {
                             id: "lblRmVacwalkin",
                             view: 'label',
                             label: 'Walk In Check-In',
                             maxWidth: 70,
                             hidden: true,
                             on: {
                                 onItemClick: function () {

                                     //
                                     var pageNm = "Reservation.aspx";
                                     var pagelink = "Walk In Check-In";

                                     var typelist = "";

                                     var str = window.location.href;
                                     var Url = str.replace("FoTrans/FOFlashTools", "");

                                     //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + $.trim(RmTyid) + '' + '&TYPE=' + $.trim(typelist) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
                                     window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&Mode=WCN&RMNO=' + $.trim(RoomNo) + '' + '&RMTY=' + $.trim(RmTyid) + '' + '&TYPE=' + $.trim(typelist) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
                                     $$("PopupRoomSts").hide();
                                 }
                             }
                         },
                         //Room Dirty
                         {
                             id: "lblRmDirtyPopup",
                             view: 'label',
                             label: 'Clear Dirty Rooms',
                             maxWidth: 70,
                             hidden: true,
                             on: {
                                 onItemClick: function () {
                                     CallClearDirtyPopup(RoomNo, RmTyNM, Status);
                                     $$("PopupRoomSts").hide();
                                 }
                             }
                         },

                         //Occupaid
                         {
                             id: "lblRmOccadv",
                             view: 'label',
                             label: Advance,//'Advance',
                             maxWidth: 70,
                             hidden: true,
                             on: {
                                 onItemClick: function () {
                                     fnOccRmStauspop(1, RoomNo, RegNo);
                                     $$("PopupRoomSts").hide();
                                 }
                             }
                         },
                          {
                              id: "lblRmOccAmdGsty",
                              view: 'label',
                              label: 'Amend Guest Stay',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(2, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccChkout",
                              view: 'label',
                              label: 'Check Out',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(3, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccClrDirty",
                              view: 'label',
                              label: 'Clear Dirty Rooms',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      CallClearDirtyPopup(RoomNo, RmTyNM, Status);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccCurGstLed",
                              view: 'label',
                              label: 'Current Guest Ledger',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(5, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccFExc",
                              view: 'label',
                              label: 'Foreign Exchange',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(6, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccGstChrg",
                              view: 'label',
                              label: 'Guest Charges',
                              maxWidth: 70,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(7, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccGstInfAmd",
                              view: 'label',
                              //label: 'Guest Information Amendment',
                              label: 'Amend InHouse Guest',
                              maxWidth: 100,
                              hidden: true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(8, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                           {
                               id: "lblRmOccGstProf",
                               view: 'label',
                               label: 'Guest Profile',
                               maxWidth: 70,
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       //fnOccRmStauspop(9, RoomNo, RegNo);
                                       var fGstId = fnGetGuestId(RoomNo, RegNo);
                                       fnShowWebixGuestProf(fGstId, fGstId);
                                       $$("PopupRoomSts").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccPaidOut",
                               view: 'label',
                               label: 'Paid Out',
                               maxWidth: 70,
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(10, RoomNo, RegNo);
                                       $$("PopupRoomSts").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccPostTar",
                               view: 'label',
                               label: PostTrf,//'Post Tariff Single',
                               maxWidth: 70,
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(11, RoomNo, RegNo);
                                       $$("PopupRoomSts").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccRefunds",
                               view: 'label',
                               label: 'Refunds',
                               maxWidth: 70,
                               hidden: true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(16, RoomNo, RegNo);
                                       $$("PopupRoomSts").hide();
                                   }
                               }
                           }
                    ]
                }
            ],
        }
    });
    // 21/12/20
    if ($.trim(Status) == "D") {
        if ($.trim(DirtyRoom) == "1")
            $$("PopupRoomSts").show();
    }
    else if ($.trim(Status) == "V") {
        if ($.trim(RoomBlock) == "1" || $.trim(WalkIn) == "1")
            $$("PopupRoomSts").show();
    }
    else if ($.trim(Status) == "OB" || $.trim(Status) == "OW" || $.trim(Status) == "OBU" || $.trim(Status) == "OWU") {
        if ($.trim(Status) == "OW" || $.trim(Status) == "OWU") {
            if($.trim(DirtyRoom) == "1")
                $$("PopupRoomSts").show();
        }
        if ($.trim(Advance1) == "1" || $.trim(GuestAmdSty) == "1" || $.trim(CheckOut) == "1" || $.trim(GuestLedg) == "1"
            || $.trim(Guestchrg) == "1" || $.trim(GuestInfo) == "1" || $.trim(GuestProf) == "1" || $.trim(Refund) == "1"
            || $.trim(PostTrf1) == "1" || $.trim(Paidout) == "1" || $.trim(ForeEx) == "1") {
                $$("PopupRoomSts").show();
        }
    }
    else if ($.trim(Status) == "BG" || $.trim(Status) == "B" || $.trim(Status) == "BM") {
        if ($.trim(RoomBlock) == "1")
            $$("PopupRoomSts").show();
    }
    else
        $$("PopupRoomSts").show();
}

function fnOccRmStauspop(val, vRoomNo, vRegNo) {
    var pagelink = "";
    var PageNm = "";
    if (val == 1) {
        pageNm = "TrnCashierAdvance.aspx";
        pagelink = "Advance";
    }
    else if (val == 2) {
        pageNm = "FoAmdGuestStay.aspx";
        pagelink = "Amend Guest Stay";
    }
    else if (val == 3) {
        pageNm = "FoCheckOut.aspx";
        pagelink = "Check Out";
    }
    else if (val == 5) {
        pageNm = "FoQ1CurGstLedger.aspx";
        pagelink = "Current Guest Ledger";
    }
    else if (val == 6) {
        pageNm = "TrnForeignExchange.aspx";
        pagelink = "Foreign Exchange ";
    }
    else if (val == 7) {
        pageNm = "FoGuestCharges.aspx";
        pagelink = "Guest Charges";
    }
    else if (val == 8) {
        pageNm = "FOGstInfoAmend.aspx";
        pagelink = "Guest Information Amendment";
    }
    else if (val == 9) {
        pageNm = "FoGuestProfile.aspx";
        pagelink = "Guest Profile";
        
    }
    else if (val == 10) {
        pageNm = "FoPaidOut.aspx";
        pagelink = "Paid Out";
    }
    else if (val == 11) {
        pageNm = "FoPostTariffSingle.aspx";
        pagelink = "Post Tariff Single";
    }
    else if (val == 16) {
        pageNm = "FoRefunds.aspx";
        pagelink = "Refund";
    }

    var str = window.location.href;
    var Url = str.replace("FoTrans/FOFlashTools", "");

    //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(vRoomNo) + '&REGNO=' + $.trim(vRegNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
    window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(vRoomNo) + '&REGNO=' + $.trim(vRegNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
}

function fnRetCssFlash(Item) {
    //
    var rowid = 0;

    rowid = Item.id;

    $.each(Item, function (k, v) {
        //

        if (k != "id") {

            var array = $.trim(v).split('~');

            if (array != "") {
                var Status = "";
                var dueInOut = "";
                if (array[1].toString().includes("#") == true) {
                    var stsArr = array[1].toString().split('#');
                    Status = stsArr[0].toString();
                    dueInOut = stsArr[1].toString();
                }
                else
                    Status = array[1].toString();

                var BInd = array[6].toString();

                if ($.trim(Status) == "D") {

                    if (BInd == "1") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorDB1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorDB2F");
                    }
                    else {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorD1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorD2F");
                    }

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");
                       
                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");
                        
                    }

                    var Val = document.getElementById('lblDirty').innerHTML;
                    document.getElementById('lblDirty').innerHTML = parseInt(Val) + 1;

                }
                else if ($.trim(Status) == "V") {

                    if (BInd == "1") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorVB1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorVB2F");
                    }
                    else {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorV1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorV2F");
                    }

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                    }

                    var Val = document.getElementById('lblVacant').innerHTML;
                    document.getElementById('lblVacant').innerHTML = parseInt(Val) + 1;
                }
                else if ($.trim(Status) == "OB" || $.trim(Status) == "OW" || $.trim(Status) == "OBU" || $.trim(Status) == "OWU") {

                    if ($.trim(Status) == "OB") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorO1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorO2F");

                        if ($.trim(dueInOut) == "DUI") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                        }
                        if ($.trim(dueInOut) == "DUO") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                        }
                    }
                    else if ($.trim(Status) == "OW") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorOD1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorOD2F");

                        if ($.trim(dueInOut) == "DUI") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                        }
                        if ($.trim(dueInOut) == "DUO") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                        }

                        var Val = document.getElementById('lblOcpDirty').innerHTML;
                        document.getElementById('lblOcpDirty').innerHTML = parseInt(Val) + 1;
                    }
                    else if ($.trim(Status) == "OBU") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorOU1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorOU2F");

                        if ($.trim(dueInOut) == "DUI") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                        }
                        if ($.trim(dueInOut) == "DUO") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                        }
                    }
                    else if ($.trim(Status) == "OWU") {
                        if ($("#hdnColCodeIndF").val() == "1")
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorODU1F");
                        else
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorODU2F");

                        if ($.trim(dueInOut) == "DUI") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                        }
                        if ($.trim(dueInOut) == "DUO") {
                            $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                        }
                        var Val = document.getElementById('lblOcpDirty').innerHTML;
                        document.getElementById('lblOcpDirty').innerHTML = parseInt(Val) + 1;
                    }

                    var Val = document.getElementById('lblOccupation').innerHTML;
                    document.getElementById('lblOccupation').innerHTML = parseInt(Val) + 1;
                }
                else if ($.trim(Status) == "BG") {

                    if ($("#hdnColCodeIndF").val() == "1")
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBG1F");
                    else
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBG2F");

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                    }

                    var Val = document.getElementById('lblBGst').innerHTML;
                    document.getElementById('lblBGst').innerHTML = parseInt(Val) + 1;

                }
                else if ($.trim(Status) == "BGD") {

                    if ($("#hdnColCodeIndF").val() == "1")
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBGD1F");
                    else
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBGD2F");

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                    }

                    var Val = document.getElementById('lblBGst').innerHTML;
                    document.getElementById('lblBGst').innerHTML = parseInt(Val) + 1;

                }
                else if ($.trim(Status) == "B") {
                    if ($("#hdnColCodeIndF").val() == "1")
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBMT1F");
                    else
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBMT2F");

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                    }

                    var Val = document.getElementById('lblBlckMnt').innerHTML;
                    document.getElementById('lblBlckMnt').innerHTML = parseInt(Val) + 1;
                }
                else if ($.trim(Status) == "BM") {

                    if ($("#hdnColCodeIndF").val() == "1")
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBM1F");
                    else
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorBM2F");
                    

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOut");

                    }

                    var Val = document.getElementById('lblBlckMng').innerHTML;
                    document.getElementById('lblBlckMng').innerHTML = parseInt(Val) + 1;
                }
                else if ($.trim(Status) == "M") {
                    if ($("#hdnColCodeIndF").val() == "1")
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorM1F");
                    else
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgColorM2F");

                    if ($.trim(dueInOut) == "DUI") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueInF");

                    }
                    if ($.trim(dueInOut) == "DUO") {
                        $$("grdRoomStatus").addCellCss(rowid, k, "BgDueOutF");

                    }

                    var Val = document.getElementById('lblMaid').innerHTML;
                    document.getElementById('lblMaid').innerHTML = parseInt(Val) + 1;
                }
            }
        }
    });
}

function CallRoomInfoDivFlash() {

    if ($("#hdnColCodeIndF").val() == "1") {
        $("#divOcc").css("background-color", "#FF0000");
        $("#divDiry").css("background-color", "#FFFF00");
        $("#divVacant").css("background-color", "#80FF80");
        $("#divBG").css("background-color", "#C776ED");
        $("#divBMT").css("background-color", "#FF8000");
        $("#divBMG").css("background-color", "#95F0F2");
        $("#divOccupDity").css("background-color", "#FF0000");

        $("#divInsp").css("background-color", "#D9DB95");
        $("#divMaid").css("background-color", "#008000");
    }
    else {
        $("#divOcc").css("background-color", "#80FF80");
        $("#divDiry").css("background-color", "#CD9D94");
        $("#divVacant").css("background-color", "#C0FFFF");
        $("#divBG").css("background-color", "#FFFFC0");
        $("#divBMT").css("background-color", "#F9583C");
        $("#divBMG").css("background-color", "#FDCDFE");
        $("#divOccupDity").css("background-color", "#80FF80");

        $("#divInsp").css("background-color", "#D9DB95");
        $("#divMaid").css("background-color", "#008000");
    }

    document.getElementById('lblOccupation').innerHTML = "0";
    document.getElementById('lblVacant').innerHTML = "0";
    document.getElementById('lblDirty').innerHTML = "0";
    document.getElementById('lblBlckMnt').innerHTML = "0";
    document.getElementById('lblBlckMng').innerHTML = "0";
    document.getElementById('lblBGst').innerHTML = "0";
    document.getElementById('lblMaid').innerHTML = "0";
    document.getElementById('lblOcpDirty').innerHTML = "0";
    document.getElementById('lblDueOut').innerHTML = "0";
    document.getElementById('lblDueIn').innerHTML = "0";
}

///================================================================= Monthwise Room Status =====================================================================

function fnMonthLoadRoomSts(Opt) {
    //

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MONTHWISERMSTATUS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ROOMTY"] = "";
    dataparam["StartDt"] = $("#RoomPosStDt").val();
    dataparam["ClinkInd"] = (Opt != "0" ? $("#RmPosViewId").val() : "0");
    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        async: true,
        url: "/FoTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {

                //
                var rowDatad = JSON.parse(data);

                if (data == "NOROOMTYPES") {
                    //$("#pageloads").hide();
                }

                //
                if ($$("grdMnthRmPosition"))
                    $$("grdMnthRmPosition").destructor();

                GridDesign();

                var ColVal = [];

                //$.each(rowDatad.GridCol, function (key, value) {
                //    if (value == "Title") {
                //        var set = {
                //            id: $.trim(value), header: { text: "", height: 30, css: "EmptybgF" }, css: { 'text-align': 'left !important' }, width: 130,
                //            cssFormat: SetCondition,
                //        };
                //    }
                //    else {
                //        var Settext = value.substring(1, value.length);

                //        if (~value.indexOf("~R")) {
                //            var set = {
                //                id: $.trim(value), header: { text: Settext.substring(0, Settext.length - 2), height: 30, css: "HolyDaybgF" }, css: { 'text-align': 'center !important' }, minWidth: 40,fillspace:true
                //            };
                //        }
                //        else {
                //            var set = {
                //                id: $.trim(value), header: { text: Settext, height: 30, css: "YellowRowsF" }, css: { 'text-align': 'center !important' }, minWidth: 40,fillspace:true,
                //                cssFormat: SetCondition,
                //            };
                //        }
                //    }
                //    ColVal.push(set);
                //});

                $.each(rowDatad.GridCol, function (key, value) {
                    if (value == "Title" || value == "id") {
                        var set = {
                            id: $.trim(value), header: { text: "", height: 30, css: "EmptybgF" }, css: { 'text-align': 'left !important' }, width: 130,
                            cssFormat: SetCondition,
                        };
                    }
                    else {
                        var Settext = value.substring(1, value.length);

                        if (~value.indexOf("~R")) {
                            var set = {
                                id: $.trim(value), header: { text: Settext.substring(0, Settext.length - 2), height: 30, css: "HolyDaybgF" }, css: { 'text-align': 'center !important' }, minWidth: 40, fillspace: true
                            };
                        }
                        else {

                            var set = {
                                id: $.trim(value), header: { text: Settext, height: 30, css: "YellowRowsF" }, css: { 'text-align': 'center !important' }, minWidth: 40, fillspace: true,
                                cssFormat: SetCondition,
                            };
                        }
                    }
                    ColVal.push(set);
                });

                $$("grdMnthRmPos").clearAll();
                $$("grdMnthRmPos").config.columns = ColVal;
                $$("grdMnthRmPos").refreshColumns();
                $$("grdMnthRmPos").parse(rowDatad.GridOpp);
                $$("grdMnthRmPos").hideColumn("id");
                $$("grdMnthRmPos").hideColumn("RoomTy");
                $$("grdMnthRmPos").show();
                $$("txtSAccDt").setValue(rowDatad.DispDt);
                
                var item = $$("grdMnthRmPos").getItem(1);
                item.hidden = item.hidden ? false : true;
                $$("grdMnthRmPos").updateItem(1, item);
                $$("grdMnthRmPos").filter(function (obj) {
                    debugger;
                    return !obj.hidden;
                })
                $$("grdMnthRmPos").refresh();
                $("#LoadDIv").hide();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }

    });
}

function GridDesign() {
    webix.ui({
        view: 'form',
        id: "grdMnthRmPosition",
        container: "grdMnthRmPosition",
        minWidth: 900,
         maxWidth: 5000,
        height: 480,
        elements: [
            {
                paddingX: 5,
                PaddingY:0,
                css: "RightTemplate",
                paddingY: 0,
                paddingX: 0,
                rows: [

                     {
                         rows: [
                             {
                                 
                                 cols: [{},
                                     {
                                         id: "btnPosPrev",
                                         view: "button",
                                         stringResult: true,
                                         label: "<",
                                         labelWidth: 30,
                                         css:'webix_warning',
                                         width: 30,
                                         on: {
                                             "onItemClick": function () {

                                                 var PrevVal = $("#RmPosViewId").val();

                                                 if (PrevVal != "0")
                                                     $("#RmPosViewId").val(parseInt(PrevVal) - 1);

                                                 if (parseInt(PrevVal) > 0) {
                                                     fnMonthLoadRoomSts(1);
                                                 }
                                                 else {

                                                 }
                                             }
                                         }
                                     },
                                     {
                                         view: "datepicker",
                                         id: "txtSAccDt",
                                         stringResult: true,
                                         format: "%d/%m/%Y",
                                         disabled: true,
                                         value: $("#RoomPosStDt").val(),
                                         labelWidth: 65,
                                         width: 120,

                                     },
                                      {
                                          view: "button",
                                          id: "btnPosNext",
                                          stringResult: true,
                                          label: ">",
                                          css: 'webix_warning',
                                          labelWidth: 30,
                                          width: 30,
                                          on: {
                                              "onItemClick": function () {
                                                  $$("btnPosPrev").enable();

                                                  var PrevVal = $("#RmPosViewId").val();
                                                  $("#RmPosViewId").val(parseInt(PrevVal) + 1);
                                                  fnMonthLoadRoomSts(1);
                                              }
                                          }
                                      },
                                      {},
                                 ]
                             }
                         ] 
                     },
             
                    {
                        id: "grdMnthRmPos",
                        select: 'cell',
                        view: "treetable",
                        fixedRowHeight: false,
                        rowLineHeight: 23,
                        select: "row",
                        autoconfig: true,
                        areaselect: true,
                        data: [],
                        css: "inhs_gst grdMnthRmPos",
                        scroll: true,
                        scheme: {
                            $change: function (item) {
                                if (item.Title == "Days") {
                                    item.$css = "YellowRows1F";
                                    item.Title = "";
                                }
                                if (item.Title == "Total Vacant") {
                                    item.$css = "VacantColorF";
                                }
                            }
                        },
                        //10/12/2021
                        on: {
                            'onAfterBlockSelect': function () {
                                debugger;
                                $("#Ty_ID").val("");

                                $("#RGNO").val("");
                                $("#RESERVE_NO").val("");

                                var vArr = $$("grdMnthRmPos").getSelectArea();
                               
                                var vStartRow = vArr.start.row;
                                var vERow = vArr.end.row;
                                var vStartCol = vArr.start.column
                                var vECol = vArr.end.column

                                var getval = $$("grdMnthRmPos").getItem(vStartRow);
                                var vVar = getval.Title;
                                var vVar = vVar.replace("  ", "#");
                                vVar = vVar.split("#");
                                var vRoomTy = "";
                                var vRoomNo = "";


                                var data = $$("grdMnthRmPos").getItem(vStartRow);
                                var data1 = $$("grdMnthRmPos").getItem(vERow);
                                vRoomTy = $.trim(data["RoomTy"]);
                                if (vRoomTy != "" && $.trim(data1["RoomTy"]) != "") {
                                  if (vRoomTy ==  $.trim(data1["RoomTy"]))
                                    {
                                    var getval = $$("grdMnthRmPos").getItem(1);
                                    var vStDt = getval[vStartCol];
                                    var vEnDt = getval[vECol];

                                    vStDt = fnConvDdFormatFlash(vStDt);
                                    vEnDt = fnConvDdFormatFlash(vEnDt);

                                    var vStTm = "", vEnTm = "";
                                    var dataparam = {};
                                    dataparam["REQTYPE"] = "GET_FNLOADRESDEFDTTM";
                                    dataparam["COMPID"] = $("#hdnCompId").val();
                                    dataparam["USERID"] = $("#UserId").val();
                                    dataparam["CONSTRING"] = $("#ConnStr").val();
                                    var DataVal = JSON.stringify(dataparam);
                                    var rowData = [];
                                    $.ajax({
                                        type: "POST",
                                        async: true,
                                        url: "/FoTrans/CALL_ALLAPI",
                                        data: "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq",
                                        success: function (data) {
                                            if (data != "") {
                                                rowData = JSON.parse(data);
                                                vStTm = rowData.ResStTm;
                                                vEnTm = rowData.ResEndTm;
                                            }
                                        }
                                    });
                                    ReservationWindowCall(vRoomNo, vRoomTy, "", vStDt, vEnDt, vStTm, vEnTm, "N", 2);
                                  }
                                  else {
                                      this.unselectAll();
                                      return false;
                                  }
                                }
                                else {
                                    this.unselectAll();
                                    return false;
                                }
                               
                            },
                            'onBeforeBlockSelect': function (start, end, isFinal) {
                                var getval = $$("grdMnthRmPos").getItem(start.row);
                                var vRoomTy = $.trim(getval["RoomTy"]);
                                if (vRoomTy != "" && vRoomTy != undefined) {
                                    return true;
                                }
                                else {
                                    this.unselectAll();
                                    return false;
                                }
                               
                            },
                            'onItemClick': function (id) {
                                var getval = this.getItem(id.row);

                                $$("grdMnthRmPos").removeSelectArea();
                            },
                            "data->onDataUpdate": function (id, obj, operation) {
                                console.log(obj)
                            },
                        },
                     
                    }

             
                ]
            }
           
        ],

    });
    gridResize("2");
}

function fnGetGridCellBkColor(vRowId, vColId) {

    var node = $$("grdMnthRmPos").getItemNode({ row: vRowId, column: vColId });

    var node = $$("grdMnthRmPos").getSpan();

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

    var node = $$("grdMnthRmPos").getSpan();

    var CssNm = "";
    var nn = node[vRowId];

    var nm = "";
    if (nn != undefined) {
        var stColIndexNo = $$("grdMnthRmPos").getColumnIndex(vColStId);
        var endColIndexNo = $$("grdMnthRmPos").getColumnIndex(vColEndId);

        for (var i = stColIndexNo; i <= endColIndexNo; i++) {
            vColId = $$("grdMnthRmPos").columnId(i);
            nm = nn[vColId];
            if (nm != undefined) {
                return true;
            }
        }
    }

    return false;
}

function ReservationWindowCall(ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, MODE,TY) {
    $("#LoadDIv").show();
    var compId = $("#hdnCompId").val();
    var vMode = "";
    var apiUrl1 = "/FoTrans/CALL_ALLAPI";
    if(MODE == "N") vMode ="NEW";
    else if(MODE == "O") vMode ="OPEN";
    setTimeout(function () {
        BookingCreatePopup(compId, $("#ConnStr").val(), $("#UserId").val(), apiUrl1, "FO", false, "FLASHROOMPOS", ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, vMode, TY);
        var T3_Ind = $("#T3_IND").val();                                       
        $("#LoadDIv").hide();
    },0)
               

}

function SetCondition(value, config, id) {
    if (value < 0) {
        return { "background-color": "#ec2e2e !important;", "color": "#red !important;", "font-weight": "Bold !important;", "font-family": "Arial !important;" };
    }
    else if (value == "") {
        return { "background-color": "#fff !important;", "border-bottom": " 1px solid #fff ! important;", "border-top": " 1px solid #fff ! important;" };
    }
};


///================================================================= Guest In House =====================================================================

function fnLoadInHouseGuest() {
    //

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_INHOUSEGST";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["RmBlock"] = $$("ddlIRmBlock").getValue();
    dataparam["chkpm"] = $$("ChkInPm").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdInHouseGst").clearAll();
                $$("grdInHouseGst").parse(rowData.GridInHuse);
                $$("grdInHouseGst").refresh();
                $$("grdInHouseGst").show();
                $$("txtInhouseCnt").setValue(rowData.GridCnt);
                $("#LoadDIv").hide();
            }
        },
    });


}

function fnLoadExpDepart() {
    //

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_EXPDEPART";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["AsonDt"] = $$("txtAccDt1").getValue();
    dataparam["chkpm"] = $$("ChkDPM").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdExpDepart").clearAll();
                $$("grdExpDepart").parse(rowData);
                $$("grdExpDepart").refresh();

                var items = $$("grdExpDepart").count();
                $$("txtExDeptCnt").setValue(items);
                $("#LoadDIv").hide();
            }
        },
    });


}

function fnLoadExpArrival() {
    debugger;

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_EXPARRIVALLIST";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FrmDt"] = $$("txtArrAccDt").getValue();
    dataparam["chkpm"] = $$("ChkPM").getValue();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            
            if (d != "") {
                var rowData = JSON.parse(d);

                $$("grdExpArrial").clearAll();
                $$("grdExpArrial").parse(rowData.GridExArr);
                $$("grdExpArrial").hideColumn("Refer");
                $$("grdExpArrial").hideColumn("NetTariff");
                if ($("#Upgrade_ind").val() == "1")
                    $$("grdExpArrial").showColumn("Upgrade");
                else
                    $$("grdExpArrial").hideColumn("Upgrade");
                $$("grdExpArrial").hideColumn("Refer");

                if ($$("chkAdvance").getValue() == "1")
                    $$("grdExpArrial").showColumn("ResAdvance");
                else
                    $$("grdExpArrial").hideColumn("ResAdvance");

                if ($$("ChkERefer").getValue() == "1") 
                    $$("grdExpArrial").showColumn("Refer");

                if ($$("ChkNetTrff").getValue() == "1")
                    $$("grdExpArrial").showColumn("NetTariff");

                $$("grdExpArrial").refresh();

                $$("txtExArrCnt").setValue(rowData.GridCnt);
                $("#LoadDIv").hide();
            }
        },
    });
}

function CallInHseGstPopup(RoomNo, RegNo, RmTy,GuestId) {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MENUNMPOPUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var PostTrf = "";
    var Advance = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                PostTrf = rowData[0].PostTrff;
                Advance = rowData[0].Advance;
            }
        },
    });


    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupInHouseGst",
        head: "Room: " + RoomNo + "- " + RmTy,
        position: "center",
        minWidth: 275,
        maxWidth: 275,
        css: "webix_header_border",
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            height: 335,
            elements: [
                {
                    rows: [
                         //Occupaid
                         {
                             id: "lblRmOccadv",
                             view: 'label',
                             label: Advance,//'Advance',
                             maxWidth: 70,
                             hidden : $.trim(Advance1) == "1" ? false:true,
                             on: {
                                 onItemClick: function () {
                                     fnOccRmStauspop(1, RoomNo, RegNo);
                                     $$("PopupInHouseGst").hide();
                                 }
                             }
                         },
                          {
                              id: "lblRmOccAmdGsty",
                              view: 'label',
                              label: 'Amend Guest Stay',
                              maxWidth: 70,
                              hidden: $.trim(GuestAmdSty) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(2, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccChkout",
                              view: 'label',
                              label: 'Check Out',
                              maxWidth: 70,
                              hidden: $.trim(CheckOut) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(3, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccCurGstLed",
                              view: 'label',
                              label: 'Current Guest Ledger',
                              maxWidth: 70,
                              hidden: $.trim(GuestLedg) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(5, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccFExc",
                              view: 'label',
                              label: 'Foreign Exchange',
                              maxWidth: 70,
                              hidden: $.trim(ForeEx) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(6, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccGstChrg",
                              view: 'label',
                              label: 'Guest Charges',
                              maxWidth: 70,
                              hidden: $.trim(Guestchrg) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(7, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccGstInfAmd",
                              view: 'label',
                              //label: 'Guest Information Amendment',
                              label: 'Amend InHouse Guest',
                              maxWidth: 100,
                              hidden: $.trim(GuestInfo) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(8, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                           {
                               id: "lblRmOccGstProf",
                               view: 'label',
                               label: 'Guest Profile',
                               maxWidth: 70,
                               hidden: $.trim(GuestProf) == "1" ? false : true,
                               on: {
                                   onItemClick: function () {
                                       //fnOccRmStauspop(9, RoomNo, RegNo);
                                       var fGstId = fnGetGuestId(RoomNo, RegNo);
                                       fnShowWebixGuestProf(GuestId, GuestId);
                                       $$("PopupInHouseGst").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccPaidOut",
                               view: 'label',
                               label: 'Paid Out',
                               maxWidth: 70,
                               hidden: $.trim(Paidout) == "1" ? false : true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(10, RoomNo, RegNo);
                                       $$("PopupInHouseGst").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccPostTar",
                               view: 'label',
                               label: PostTrf, //'Post Tariff Single',
                               maxWidth: 70,
                               hidden: $.trim(PostTrf1) == "1" ? false : true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(11, RoomNo, RegNo);
                                       $$("PopupInHouseGst").hide();
                                   }
                               }
                           },
                           {
                               id: "lblRmOccRefunds",
                               view: 'label',
                               label: 'Refunds',
                               hidden: $.trim(Refund) == "1" ? false : true,
                               maxWidth: 70,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(16, RoomNo, RegNo);
                                       $$("PopupInHouseGst").hide();
                                   }
                               }
                           }
                    ]
                }
            ],
        }
    });
    if ($.trim(Refund) == "1" || $.trim(PostTrf1) == "1" || $.trim(GuestProf) == "1" || $.trim(GuestAmdSty) == "1" || $.trim(Paidout)== "1" || $.trim(Advance1) == "1"
        || $.trim(GuestLedg) == "1" || $.trim(Guestchrg) == "1" || $.trim(GuestInfo) == "1" || $.trim(ForeEx) == "1" || $.trim(DirtyRoom) == "1" || $.trim(CheckOut) == "1")
        $$("PopupInHouseGst").show();
}   

function CallExpDepPopup(RoomNo, RegNo, RmTy) {

    //

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupExpDepart",
        head: "Room: " + RoomNo + "- " + RmTy,
        position: "center",
        minWidth: 250,
        maxWidth: 250,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        //height: 350,
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            height: 200,
            elements: [
                {
                    rows: [

                          {
                              id: "lblRmOccAmdGsty",
                              view: 'label',
                              label: 'Amend Guest Stay',
                              maxWidth: 70,
                              hidden: $.trim(GuestAmdSty) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(2, RoomNo, RegNo);
                                      $$("PopupExpDepart").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccChkout",
                              view: 'label',
                              label: 'Check Out',
                              maxWidth: 70,
                              hidden: $.trim(CheckOut) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(3, RoomNo, RegNo);
                                      $$("PopupExpDepart").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccGstInfAmd",
                              view: 'label',
                              //label: 'Guest Information Amendment',
                              label: 'Amend InHouse Guest',
                              maxWidth: 100,
                              hidden: $.trim(GuestInfo) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(8, RoomNo, RegNo);
                                      $$("PopupExpDepart").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccRefunds",
                              view: 'label',
                              label: 'Refunds',
                              maxWidth: 70,
                              hidden: $.trim(Refund) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(16, RoomNo, RegNo);
                                      $$("PopupRoomSts").hide();
                                  }
                              }
                          },
                          {
                              id: "lblRmOccPaidOut",
                              view: 'label',
                              label: 'Paid Out',
                              maxWidth: 70,
                              hidden: $.trim(Paidout) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      fnOccRmStauspop(10, RoomNo, RegNo);
                                      $$("PopupInHouseGst").hide();
                                  }
                              }
                          },
                           {
                               id: "lblRmOccCurGstLed",
                               view: 'label',
                               label: 'Current Guest Ledger',
                               maxWidth: 70,
                               hidden: $.trim(GuestLedg) == "1" ? false : true,
                               on: {
                                   onItemClick: function () {
                                       fnOccRmStauspop(5, RoomNo, RegNo);
                                       $$("PopupInHouseGst").hide();
                                   }
                               }
                           },
                         
                    ]
                }
            ],
        }
    });
    if ($.trim(GuestAmdSty) == "1" || $.trim(GuestInfo) == "1" || $.trim(CheckOut) == "1" || $.trim(Refund) == "1"
        || $.trim(GuestLedg) == "1" || $.trim(Paidout) == "1")
        $$("PopupExpDepart").show();
}

function fnExpArrRightpop(val, ResvNo, RNo, RoomNo,GstId,SkipTariff) {
    
    var pagelink = "";
    var PageNm = "";

    var str = window.location.href;
    var Url = str.replace("FoTrans/FOFlashTools", "");

    if (val == 1) {
        pageNm = "Reservation.aspx";
        pagelink = "Reservation";

        //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(ResvNo) + '&RESNO=' + $.trim(RNo) + '&RNO=' + $.trim(ResvNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
        window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(RoomNo) + '&RESNO=' + $.trim(RNo) + '&RNO=' + $.trim(ResvNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
    }
    else if (val == 2) {
        pageNm = "TrnReservationAdvance.aspx";
        pagelink = "Reservation Advance";

        //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(ResvNo) + '&RESNO=' + $.trim(ResvNo) + '&RNO=' + $.trim(RNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
        window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(ResvNo) + '&RESNO=' + $.trim(ResvNo) + '&RNO=' + $.trim(RNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
    }
    else if (val == 3) {
        pageNm = "FoCheckInNew.aspx";
        pagelink = "Reservation Check-In";

        //window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(ResvNo) + '&RESNO=' + $.trim(ResvNo) + 
        //'&RNO=' + $.trim(RNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
        window.open(Url + 'FO/' + pageNm + '?Flash=1&COMPID=' + $("#hdnCompId").val() + '&RMNO=' + $.trim(ResvNo) + '&RESNO=' + $.trim(ResvNo) + '&RNO=' + $.trim(RNo) + '', '' + pagelink + '', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');
    }
    else if (val == 4) {
        pageNm = "FoPdfOpen.aspx";
        pagelink = "Reg Card Print";

        var Mleft = (screen.width / 2) - (840 / 2);
        var Mtop = (screen.height / 2) - (550 / 2);

        var Billstr = "";
        var RateInd = "1";
        if (SkipTariff == "1")
            RateInd = "0";
        if ($.trim(Billstr) == "")
            Billstr = ResvNo + "@" + $.trim(RateInd) + "@" + GstId;

        window.open(Url + 'FO/' + pageNm + '?COMPID=' + $("#hdnCompId").val() + '&BILLSTR=' + $.trim(Billstr) + '&PTYPE=R&RPT=RCD',
            'height=550px,width=840px,scrollbars=yes,left='+Mleft+',top='+Mtop+',resizable=no');
    }
}

function CallExpArrPopup(ResvNo, RNo, RoomNo, GuestNm, GstId, SkipTariff) {

    var PopUpHight = "250";
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MENUNMPOPUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var PostTrf = "";
    var Advance = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                PostTrf = rowData[0].PostTrff;
                Advance = rowData[0].ReserAd;
            }
        },
    });

    
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ExPArrivalPop",
        //head: "Re: " + RoomNo + "- " + GuestNm,
        head:  GuestNm,
        position: "center",
        minWidth: 250,
        maxWidth: 250,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: PopUpHight,
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            height: 140,
            elements: [
                {
                    rows: [

                          {
                              id: "lblReservation",
                              view: 'label',
                              label: 'Amend Reservation',
                              maxWidth: 70,
                              hidden: $.trim(Resr) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      $$("ExPArrivalPop").hide();
                                      var compId = $("#hdnCompId").val();
                                      var Res_No = ResvNo
                                      var apiUrl1 = "/FoTrans/CALL_ALLAPI";
                                      $("#LoadDIv").show();
                                      var vMode = "";
                                      vMode = "OPEN";
                                      setTimeout(function () {
                                          BookingCreatePopup(compId, $("#ConnStr").val(), $("#UserId").val(), apiUrl1, "FO", false, "FLASHEXPARR", "", "", Res_No, "", "", "", "", vMode, "4", "", "", "", "", "", "", "", "");
                                          $("#LoadDIv").hide();
                                      }, 0);
                                     
                                  }
                              }
                          },
                          {
                              id: "lblResvAdvance",
                              view: 'label',
                              label: Advance,//'Reservation Advance',
                              maxWidth: 70,
                              hidden: $.trim(ReserAd) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      $$("ExPArrivalPop").hide();
                                      fnExpArrRightpop(2, ResvNo, RNo, RoomNo,"","");
                                  }
                              }
                          },
                          {
                              id: "lblResvChkIn",
                              view: 'label',
                              label: 'Reservation Check-in',
                              maxWidth: 100,
                              hidden: $.trim(ResrCheck) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      $$("ExPArrivalPop").hide();
                                      fnExpArrRightpop(3, ResvNo, RNo, RoomNo,"","");
                                  }
                              }
                          },
                          {
                              id: "lblRegCard",
                              view: 'label',
                              label: 'Reg Card Print',
                              maxWidth: 100,
                              hidden: $.trim(RegCardPrint) == "1" ? false : true,
                              on: {
                                  onItemClick: function () {
                                      $$("ExPArrivalPop").hide();
                                      fnExpArrRightpop(4, ResvNo, RNo, RoomNo,GstId, SkipTariff);
                                  }
                              }
                          },
                    ]
                }
            ],
        }
    });
    if ($.trim(Resr) == "1" || $.trim(ResrCheck) == "1" || $.trim(ReserAd) == "1")
        $$("ExPArrivalPop").show();
}

function fnRoomPosPopup(ArrDt, DepartDt, RoomTy) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupRoomPos",
        head: "Re: " + RoomTy,
        position: "center",
        minWidth: 250,
        maxWidth: 250,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: PopUpHight,
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            height: 50,
            elements: [
                {
                    rows: [

                          {
                              id: "lblReservation",
                              view: 'label',
                              label: 'Reservation',
                              maxWidth: 70,
                              hidden : $.trim(Resr) == "1" ? false:true,
                              on: {
                                  onItemClick: function () {

                                      var str = window.location.href;
                                      var Url = str.replace("FoTrans/FOFlashTools", "");

                                      //window.open(Url + 'FO/Reservation.aspx?Flash=1&COMPID=' + $("#hdnCompId").val() + '&ARRVL=' + $.trim(ArrDt) + '&DEPART=' + $.trim(DepartDt) + '' + '&RMTYID= ' + $.trim(RoomTy) + '', + 'Reservation', 'height=' + (screen.height - 115) + ',width=' + (screen.width - 100) + ',scrollbars=no,left=15,top=10');
                                      window.open(Url + 'FO/Reservation.aspx?Flash=1&COMPID=' + $("#hdnCompId").val() + '&ARRVL=' + $.trim(ArrDt) + '&DEPART=' + $.trim(DepartDt) + '' + '&RMTYID= ' + $.trim(RoomTy) + '', + 'Reservation', 'height=' + (screen.height - 115) + ',width=1270px,scrollbars=no,left=15,top=10,resizable=no');

                                      $$("PopupRoomPos").hide();
                                  }
                              }
                          },
                    ]
                }
            ],
        }
    });
    if ($.trim(Resr) == "1")
        $$("PopupRoomPos").show();
}

function CallClearDirtyPopup(RoomNo, RmTyNM, Status) {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CLEARDIRTDET";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["RoomNo"] = RoomNo;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    //

    var TagRes = rowData[0].DRT_RS;
    var TagTm = rowData[0].DRT_DT;

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupClrDirtyRms",
        head: "Clear Dirty Room",
        position: "center",
        minWidth: 550,
        maxWidth: 550,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 350,
        body: {
            view: 'form',
            minWidth: 550,
            maxWidth: 550,
            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    id: "txtRoomNo",
                                    view: "text",
                                    stringResult: true,
                                    label: "Room",
                                    labelAlign: "Right",
                                    labelWidth: 80,
                                    inputWidth: 165,
                                    width: 280,
                                    value: RoomNo,
                                    readonly: true,
                                },
                                {
                                    view: "combo",
                                    id: "ddlPriority",
                                    label: "Priority",
                                    inputWidth: 230,
                                    labelWidth: 100,
                                    //options: curData,
                                    labelAlign: "Right",
                                    hidden: true,
                                    width: 280,
                                },
                            ]
                        },
                        {
                            cols: [
                                {
                                    id: "txtType",
                                    view: "text",
                                    stringResult: true,
                                    label: "Type",
                                    labelAlign: "Right",
                                    labelWidth: 80,
                                    inputWidth: 330,
                                    width: 340,
                                    value: RmTyNM,
                                    readonly: true,
                                },
                                {
                                    view: "text",
                                    id: "txtTagTime",
                                    label: "Tag Time",
                                    labelAlign: "Right",
                                    value: TagTm,
                                    readonly: true,
                                    labelwidth: 80,
                                    inputWidth: 170,
                                    width: 170,
                                },
                            ]
                        },
                        {
                            cols: [
                                {
                                    id: "txtTagReason",
                                    view: "text",
                                    stringResult: true,
                                    label: "Tag Reason",
                                    labelAlign: "Right",
                                    value: TagRes,
                                    readonly: true,
                                    labelWidth: 80,
                                    inputWidth: 510,
                                    width: 510,
                                    readonly: true,
                                },
                            ]
                        },
                         {
                             cols: [
                                 {
                                     id: "txtNarration",
                                     view: "text",
                                     stringResult: true,
                                     label: "Narration",
                                     labelAlign: "Right",
                                     labelWidth: 80,
                                     inputWidth: 510,
                                     width: 510,
                                     attributes: { maxlength: 40 },
                                    
                                 },
                             ]
                         },
                         {
                             cols: [
                                  {
                                      paddingX: 200,
                                      height: 50,
                                      rows: [
                                          {},
                                          {
                                              cols: [
                                                  {
                                                      id: "lblRuWantClr",
                                                      view: 'label',
                                                      label: 'Are you Sure want to clear',
                                                      labelWidth: 170,
                                                      width: 170,
                                                  },
                                                  {
                                                      view: 'button',
                                                      label: 'Yes',
                                                      width: 70,
                                                      on: {
                                                          onItemClick: function () {

                                                              //if ($$("txtNarration").getValue() == "") {
                                                              //    alert('Narration cannot be empty')
                                                              //}
                                                              //else {

                                                              var dataparam = {};
                                                              var rowData = "";
                                                              dataparam["REQTYPE"] = "GET_DIRTYSAVEDATA";
                                                              dataparam["COMPID"] = $("#hdnCompId").val();
                                                              dataparam["RoomNo"] = RoomNo;
                                                              dataparam["Narration"] = $$("txtNarration").getValue();
                                                              dataparam["Status"] = Status;
                                                              dataparam["Prior"] = "";//$$("ddlPriority").getValue()

                                                              var DataVal = JSON.stringify(dataparam);
                                                              DataVal = encodeURIComponent(DataVal);
                                                              $.ajax({
                                                                  async: false,
                                                                  url: "/FoTrans/COMAPI_CALL",
                                                                  type: 'POST',
                                                                  data: "request=" + DataVal,
                                                                  success: function (d) {
                                                                      //
                                                                      if (d != "") {
                                                                          rowData = JSON.parse(d);
                                                                      }
                                                                  },
                                                              });

                                                              if (rowData == "1") {
                                                                  $$("PopupClrDirtyRms").hide();
                                                                  $("#btnRoomSts").click();
                                                              }
                                                              else {
                                                                  $$("PopupClrDirtyRms").hide();
                                                                  alert(rowData);
                                                              }

                                                              // }
                                                          }
                                                      }
                                                  },

                                                 {
                                                     view: 'button',
                                                     label: 'No',
                                                     width: 70,
                                                     on: {
                                                         onItemClick: function () {
                                                             $$("PopupClrDirtyRms").hide();
                                                         }
                                                     }
                                                 }
                                              ]
                                          }
                                      ]
                                  }
                             ]
                         }
                    ]
                }
            ],
        }
    });

    $$("PopupClrDirtyRms").show();
}

function fnCallRoomFeaturePopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RoomFeaturePopup",
        head: "Room Features",
        position: "center",
        minWidth: 300,
        maxWidth: 320,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 300,

            elements: [
                {
                    view: "datatable",
                    id: "grdRmFeature",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "ROOM_FEATURE_ID", id: "ROOM_FEATURE_ID", hidden: true },
                            { header: "Features", id: "ROOM_FEATURE_NM", width: 210, editor: 'text', css: { 'text-align': 'left ! important' } },
                            { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 50, css: { 'text-align': 'center ! important' } },
                    ],
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 150,
                             maxWidth: 150,
                             paddingX: 130,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Ok',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     //$$("ChkRmstsFeat").setValue("0");
                                                     //debugger
                                                     var RmIds = "";
                                                     var data = $$("grdRmFeature").serialize();
                                                     var lenval = data.length;
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             // 
                                                             if (data[i].ChkSelect == "1") {
                                                                 if ($.trim(RmIds) == "")
                                                                     RmIds = "'" + $.trim(data[i].ROOM_FEATURE_ID) + "'";
                                                                 else
                                                                     RmIds += ",'" + $.trim(data[i].ROOM_FEATURE_ID) + "'";
                                                             }
                                                         }
                                                     }

                                                     $("#RmFeatids").val(RmIds);
                                                     $$('RoomFeaturePopup').hide();
                                                     $("#btnRoomSts").click();

                                                 }
                                             }
                                         },
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$("ChkRmstsFeat").setValue("0");
                                                     $$('RoomFeaturePopup').hide();
                                                     $("#RmFeatids").val("");
                                                 }
                                             }
                                         },


                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

    fnLoadFeatures();
    $$("RoomFeaturePopup").show();
}

function fnCallRoomFilterPopup() {
    var sorton = fnsorton();
   
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RoomFilterPopup",
        head: "Room Selection",
        position: "center",
        minWidth: 300,
        maxWidth: 500,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 700,

            elements: [
                 {
                     view: "combo",
                     id: "ddlSorton",
                     label: "Sort on",
                     width: 300,
                     labelwidth: 170,
                     value : $("#VType").val() == ""? "R":$("#VType").val(),
                     options:  sorton,
                     disabled: false,
                     on: {
                         onChange: function (newval, oldval) {
                             $("#Filterhead").val($$("ddlSorton").getText());
                             fnLoadBuilding();
                             fnloadsortonchange();
                         }
                     }

                 },
                {
                    cols: [
                        {
                            view: "datatable",
                            id: "grdRmBuild",
                            select: "row",
                            data: [],
                            height: 350,
                            scroll: "y",
                            
                            columns: [
                                    { header: "ROOM_BLD_ID", id: "ROOM_BLD_ID", hidden: true },
                                    { header: "Building", id: "ROOM_BLD_NM", width: 170, editor: 'text', css: { 'text-align': 'left ! important' } },
                                    //{ header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 50, css: { 'text-align': 'center ! important' } },
                                    { id: "ChkSelect", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important', 'text-align': 'center ! important' } }], width: 50, css: "check_box", template: "{common.checkbox()}" },

                            ],
                        },

                        {
                            rows: [
                                {

                                    view: "datatable",
                                    id: "grdRmFilter",
                                    select: "row",
                                    data: [],
                                    height: 350,
                                    hidden:true,
                                    scroll: "y",
                                    columns: [
                                            { header: "FLOOR_NO", id: "FLOOR_NO", hidden: true },
                                            { header: "", id: "FLOOR_NM", width: 170, editor: 'text', css: { 'text-align': 'left ! important' } },
                                            //{ header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 50, css: { 'text-align': 'center ! important' } },
                                            { id: "ChkSelect", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important', 'text-align': 'center ! important' } }], width: 50, css: "check_box", template: "{common.checkbox()}" },
                                            

                                    ],
                                },
                            {
                                view: "text",
                                id: "txtFrom",
                                label: "From",

                            },
                             {
                                 view: "text",
                                 id: "txtTo",
                                 label: "To",

                             },
                            ]
                            
                        },
                        
                       
                       
                    ]
                },
                {
                   // PaddingY: 60,
                    cols: [
                         {
                             minWidth: 150,
                             maxWidth: 150,
                             paddingX: 340,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Ok',
                                             maxWidth: 70,
                                             align: "right",
                                             css:"webix_primary",
                                             on: {
                                                 onItemClick: function () {
                                                     
                                                     var Bulds = "";
                                                     var FilIds = "";
                                                     var data = $$("grdRmBuild").serialize();
                                                     var lenval = data.length;
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             if (data[i].ChkSelect == "1") {
                                                                 if ($.trim(Bulds) == "")
                                                                     Bulds = "'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                                 else
                                                                     Bulds += ",'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                             }
                                                         }
                                                     }

                                                     var data = $$("grdRmFilter").serialize();
                                                     var lenval = data.length;
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             if (data[i].ChkSelect == "1") {
                                                                 if ($.trim(FilIds) == "")
                                                                     FilIds = "'" + $.trim(data[i].FLOOR_NO) + "'";
                                                                 else
                                                                     FilIds += ",'" + $.trim(data[i].FLOOR_NO) + "'";
                                                             }
                                                         }
                                                     }

                                                     $("#RmBuildid").val(Bulds);
                                                     $("#RmFilter").val(FilIds);
                                                     $("#VType").val($$("ddlSorton").getValue());
                                                     $("#vFrmRm").val($$("txtFrom").getValue());
                                                     $("#vToRm").val($$("txtTo").getValue());
                                                     $$('RoomFilterPopup').hide();
                                                     $("#btnRoomSts").click();

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
                                                     $("#RmBuildid").val("");
                                                     $("#RmFilter").val("");
                                                     $("#vFrmRm").val("");
                                                     $("#VType").val("");
                                                     $("#Filterhead").val("");
                                                     $("#vToRm").val("");
                                                 }
                                             }
                                         },


                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });
    
    fnLoadBuilding();
    fnloadsortonchange();
    $$("RoomFilterPopup").show();
}

function fnLoadFeatures() {
    //
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_ROOMFEATURE";
    dataparam["COMPID"] = $("#hdnCompId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdRmFeature").clearAll();
                $$("grdRmFeature").parse(rowData);
                $$("grdRmFeature").refresh();
            }
        },
    });
}

function fnLoadBuilding() {
   
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BUILDING";
    dataparam["COMPID"] = $("#hdnCompId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            $$("grdRmBuild").clearAll();
            if (d != "") {
                var rowData = JSON.parse(d);
                var RmBuild = $("#RmBuildid").val();
                var rowData = JSON.parse(d);
                $$("grdRmBuild").parse(rowData);
                var data = $$("grdRmBuild").serialize();
                var lenval = data.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (RmBuild != "") {
                            if (RmBuild.includes($.trim(data[i].ROOM_BLD_ID)) == true)
                                data[i].ChkSelect = "1";
                            else
                                data[i].ChkSelect = "0";

                        }
                    }
                }
               
                $$("grdRmBuild").refresh();
                $("#RmBuildid").val("");
            }
        },
    });
}

function fnloadsortonchange() {

    if ($$("ddlSorton").getValue() == "R") {
        $$("txtFrom").show();
        $$("txtFrom").setValue($("#vFrmRm").val());
        $$("txtTo").setValue($("#vToRm").val());
        $$("txtTo").show();
        $$("grdRmFilter").hide();
        $("#RmFilter").val("");
        $("#RmBuildid").val("");
    }
    else {
        
        $$("txtFrom").setValue("");
        $$("txtTo").setValue("");
        $$("txtFrom").hide();
        $$("txtTo").hide();
        $$("grdRmFilter").show();

        var dataparam = {};
        dataparam["REQTYPE"] = "GET_SORTONLOAD";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["DDLDROP"] = $$("ddlSorton").getValue();

        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/FoTrans/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                $$("grdRmFilter").clearAll();
                $$("grdRmFilter").getColumnConfig("FLOOR_NM").header[0].text = $("#Filterhead").val();
                $$("grdRmFilter").refreshColumns();
                if (d != "") {
                    var RmBuild = $("#RmFilter").val();
                    var rowData = JSON.parse(d);

                    $$("grdRmFilter").parse(rowData);
                    var data = $$("grdRmFilter").serialize();
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (RmBuild != "") {
                                if (RmBuild.includes($.trim(data[i].FLOOR_NO)) == true)
                                    data[i].ChkSelect = "1";
                                else
                                    data[i].ChkSelect = "0";

                            }
                        }
                    }
                    
                    $$("grdRmFilter").refresh();
                    $("#RmFilter").val("");
                    $("#RmBuildid").val("");
                }

            },
        });
    }
    
}

function fnsorton() {
    var rowdata = "";
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_SORTON";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var PostTrf = "";
    var Advance = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowdata = JSON.parse(d);
            }
        },
    });
    return rowdata;
}

function prcGetUserMenuPriv() {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MENUNMPOPUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CHOICE"] = "2";
    var rowData = "";
    
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                
            }
        },
    });
    return rowData;
}

function fnGetGuestId(RoomNo, RegNo) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GUESTID";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["RoomNo"] = RoomNo;
    dataparam["RegNo"] = RegNo;
    var rowData = "";

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });
    return rowData;
}

function fnShowWebixGuestProf(gstId, firstGstId) {
    debugger;
    var CompId = $("#hdnCompId").val();
    var UsrId = $("#UserId").val();
    var ConString = $("#ConnStr").val();
    $$('GuestProfilePop').show();


    fnLoadGuestProf(CompId, UsrId, ConString, "Flash", '/FoTrans/CALL_ALLAPI', false, gstId, firstGstId);
}

    webix.event(window, "resize", function () {
        gridResize("1");
    })   
    function gridResize(choice) {
        var vheight = window.innerHeight
               || document.documentElement.clientHeight
               || document.body.clientHeight;
        if (choice == "1") {
            var offset = $("#grdRoomStatusfrm").offset();


            $$("grdRoomStatusfrm").define("height", ((vheight - offset.top - 10)));
            $$("grdRoomStatusfrm").adjust();

            $$("grdRoomStatus").define("height", ((vheight - offset.top - 40)));
            $$("grdRoomStatus").adjust();
        }

        else if (choice == "2") {
            var offset = $("#grdMnthRmPosition").offset();

            $$("grdMnthRmPosition").define("height", ((vheight - offset.top - 10)));
            $$("grdMnthRmPosition").adjust();

            $$("grdMnthRmPos").define("height", ((vheight - offset.top - 40)));
            $$("grdMnthRmPos").adjust();
        }

        else if (choice == "3") {
            var offset = $("#grdInHouseGst").offset();

            $$("grdInHouseGst").define("height", ((vheight - offset.top - 50)));
            $$("grdInHouseGst").adjust();

            $$("grdInHouseGst").define("height", ((vheight - offset.top - 30)));
            $$("grdInHouseGst").adjust();
        }

        else if (choice == "4") {
            var offset = $("#grdExpArrial").offset();

            $$("grdExpArrial").define("height", ((vheight - offset.top - 50)));
            $$("grdExpArrial").adjust();

            $$("grdExpArrial").define("height", ((vheight - offset.top - 30)));
            $$("grdExpArrial").adjust();
        }

        else if (choice == "5") {
            var offset = $("#grdExpDepart").offset();

            $$("grdExpDepart").define("height", ((vheight - offset.top - 50)));
            $$("grdExpDepart").adjust();

            $$("grdExpDepart").define("height", ((vheight - offset.top - 30)));
            $$("grdExpDepart").adjust();
        }

    }

    function fnGuestAmendRefresh() {
        if ($('#hdnClkBtnId').val() == "1")
            fnLoadInHouseGuest();
        else if ($('#hdnClkBtnId').val() == "4")
            fnLoadExpArrival();
        else if ($('#hdnClkBtnId').val() == "5")
            fnLoadExpDepart();
    }

   

// UnAssigned Popup 
    function CallUnAssArrivals() {
        var UsrId = $("#UserId").val();
        var ConString = $("#ConnStr").val();
        var Acdt = $$("txtRmStsAccDt").getValue();
        Acdt = convert(Acdt);
        fnCallUnAssignedPopup(Acdt, UsrId, ConString, UnAssArrApiUrl);
    }

    function fnCallUnAssignedPopup(Acdt, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl) {

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
                                    fnbtnAutoAllocClick(Acdt, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl);
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
                                    

                                    if (Room_TY_ID != null) Room_TY_ID = $.trim(Room_TY_ID);
                                    $$("RoomNoSrch").show();
                                    fnRoomSrchLoad($("#hdnCompId").val(), FoRmChUserId, FoRmChConnStr, Room_TY_ID, ARR_DT, ARR_TM, DEP_DT, DEP_TM, "FLASH", "/TravelAgentBlock/CALL_ALLAPI");
                                }
                            },
                        },
                    },

                        ]
                    }
                ]
            }


        });
        AssignedPopupLoad($("#hdnCompId").val(), Acdt);
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
            url: UnAssArrApiUrl,//"/TravelAgentBlock/FOAPI_CALL",
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

    function SaveRoomAssignFlash(RmNo) {

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
        var COMPID = $("#hdnCompId").val();

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
            url: UnAssArrApiUrl,//"/TravelAgentBlock/FOAPI_CALL",
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
                        var Acdt = $$("txtRmStsAccDt").getValue();
                        Acdt = convert(Acdt);
                        AssignedPopupLoad($("#hdnCompId").val(),Acdt);
                        $("#Refresh").click();
                        webix.message({
                            type: 'success',
                            text: rowData.Message,
                        })

                        fnRoomStatusLoadData();
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

    function fnbtnAutoAllocClick(Acdt, FoRmChUserId, FoRmChConnStr, UnAssArrApiUrl) {
        
        var CompId = $("#hdnCompId").val();
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
            FoAutoAllocationWindowLoad(CompId, FoRmChUserId, FoRmChConnStr, "FLASH", UnAssArrApiUrl, false, ResNos);
    };

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }


    function fnConvDdFormatFlash(vStDt) {
        var vSlsh = "/";

        vTempDt = vStDt;
        var vVal = vTempDt.split("/", 3)

        var vDt = vVal[1];
        var vMn = vVal[0];
        var vYr = vVal[2];

        vMn = vMn.concat(vSlsh);
        vDt = vDt.concat(vSlsh);

        vStDt = vDt.concat(vMn);
        vStDt = vStDt.concat(vYr);

        return vStDt;
    }
    
   // end