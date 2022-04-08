<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Report No Show
</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="MainContent" runat="server">
    
   
    <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
     <style type="text/css" >
        .my_style11 {
                font-weight:bold;
            }
    .form-control {
    display: block;
    width: 100%;
    height: 20px !important;
    padding: 0px 0px 0px 2px !important;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cecece !important;
    border-radius: .25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    /* font-family: 'Poppins'!important; */
    font-size: .8125rem !important;
    font-style: normal !important;
    font-weight: 200 !important;
}
         /*.btn {
                border: 1px solid #dad6d6 !important;
            }*/
    </style>
    <input type="hidden" id="hdnRevpar" /><input type="hidden" id="hdnRevpor" />
      <%:Html.Partial("_HeaderMenuFoMaster")%>
       <%--  <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>--%>
    <%-- <%@ Register TagName="MENUFO" TagPrefix="MN" Src="~/FO/FoMasterSM.ascx" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>
  --%>
       
    <script type="text/javascript">
        $(document).on('shown.lte.pushmenu', function () {
            var timeoutID;
            function delayedStart() {
                timeoutID = window.setTimeout(resizeAction, 350);
            }

            function resizeAction() {
                sidebarFn(1);
                //  alert("Sidebar is collapsed or expanded!")
                window.clearTimeout(timeoutID);
            }

            delayedStart();

        }).on('collapsed.lte.pushmenu', function () {
            var timeoutID;
            function delayedStart() {
                timeoutID = window.setTimeout(resizeAction, 350);
            }

            function resizeAction() {
                sidebarFn(2);
                //  alert("Sidebar is collapsed or expanded!")
                window.clearTimeout(timeoutID);
            }

            delayedStart();
        });
        function sidebarFn(val) {
            
            //var rowDatad = $$("gridRptt").serialize();

            //if ($$("gridRptt"))
            //    $$("gridRptt").destructor();
          
            //if ($("#chkNoShows")[0].checked == true) {
            //    GridLodFn();
            //    $$("gridRptt").hideColumn("ixSNo");
            //    $$("gridRptt").hideColumn("ixTyp");
            //    $$("gridRptt").hideColumn("IXCOL11");
            //    $$("gridRptt").hideColumn("ixCancDt");
            //    $$("gridRptt").hideColumn("ixCancTm");
            //    $$("gridRptt").hideColumn("IXCOL14");
            //    $$("gridRptt").hideColumn("IXCancNo");
            //}
            //if ($("#chkRoomTp")[0].checked == true) {
            //    GridLodFn();
            //    $$("gridRptt").showColumn("ixSNo");
            //    $$("gridRptt").showColumn("ixTyp");
            //    $$("gridRptt").showColumn("IXCOL11");
            //    $$("gridRptt").showColumn("ixCancDt");
            //    $$("gridRptt").showColumn("ixCancTm");
            //    $$("gridRptt").showColumn("IXCOL14");
            //    $$("gridRptt").showColumn("IXCancNo");
            //}
            //if ($("#chkReinstate")[0].checked == true) {
            //    webix.ui({
            //        view: "datatable",
            //        container: "gridRpt",
            //        id: "gridRptt",
            //        select: "row",
            //        data: [],
            //        height: 450,
            //        minWidth:900,
            //        columns: [
            //        { header: "Res No", id: "ixResNo", width: 100, css: { 'text-align': 'center ! important' } },
            //         { header: "Type", id: "IxType", width: 100, css: { 'text-align': 'center ! important' } },
            //          { header: "Reinstate Dt", id: "ixRDT", width: 100 },
            //          { header: "Guest Name", id: "ixGNm", width: 250 },
            //          { header: "Company Name", id: "ixComp", width: 250 },
            //          { header: "Tariff", id: "ixTariff", width: 100 },
            //          { header: "Total Tariff", id: "ixTotTariff", width: 110, css: { 'text-align': 'right ! important' } },
            //         { header: "Nights", id: "ixNights", width: 100, css: { 'text-align': 'center ! important' } },
            //          { header: "Actual Arrival Dt", id: "ixActArrival", width: 150 },
            //          { header: "Arrival Dt", id: "ixArrDt", width: 150 },
            //          { header: "Depart Dt", id: "IXDEP", width: 150 },
            //          { header: "Reinstate Reason", id: "ixReas", width: 250 },
            //         { header: "User", id: "ixUser", width: 100 },

            //        ],

            //    });
            //}
            //$$("gridRptt").clearAll();
            //$$("gridRptt").parse(rowDatad);
            //$$("gridRptt").show();
            $$("gridRptt").resize();
        }
        $(document).ready(function () {
            
            $("#divPage").removeClass("Pagefalse");
            $("#LoadDIv").hide();

            $("#MenuName").val('FOMNUREPSHOWCANCRSV');
            $("#MenuLvl").val('FOMNUANL');
            $("#MenuLvl1").val('');

            var propchk = '<%=Session["MLTPROPHISHIND"]%>';
            if (propchk == "1") $("#divPropbox").show();
            else if (propchk == "0") $("#divPropbox").hide();
            var compid = '<%=Session["COMPIDD"]%>';
            var pageMethod = '<%=Session["PageMethod"]%>';
            var text = "";

            $("#chkNoShows")[0].checked = true;
            $("#btnback").hide();

            $("#TotlaRooms").val("0");
            $("#TotlaPax").val("0");
            $("#lblNoshow").text("No Shows");
            GridLodFn();
       
            var htmlapp = ' <div id="gridRpt" style="width: 100%; height: 500px"> </div>';
            
            $("#chkNoShows").click(function () {
              
                $$('gridRptt').clearAll();
                $("#TotlaRooms").val("0");
                $("#TotlaPax").val("0");
                if ($("#chkNoShows")[0].checked == true) {
                    $("#chkNoShows")[0].checked = true;
                    $("#chkRoomTp")[0].checked = false;
                    $("#chkReinstate")[0].checked = false;
                    $("#Renoshow").show();
                    $("#totlrmpax").show();
                    $("#btnback").hide();
                    $("#Reinstate").hide();
                    $("#chkReinstateNo")[0].checked = false;
                    $("#ChkReinCancelled")[0].checked = false;
                    $("#lblNoshow").text("No Shows");
                    $("#chkRef").show();
                    $("#sRef").show();



                    $$("gridRptt").hideColumn("ixSNo");
                    $$("gridRptt").hideColumn("ixTyp");
                    $$("gridRptt").hideColumn("IXCOL11");
                    $$("gridRptt").hideColumn("ixCancDt");
                    $$("gridRptt").hideColumn("ixCancTm");
                    $$("gridRptt").hideColumn("IXCOL14");
                    $$("gridRptt").hideColumn("IXCancNo");

                    if ($("#chkRef")[0].checked == true)
                        $$("gridRptt").showColumn("ixRefer");
                    else
                        $$("gridRptt").hideColumn("ixRefer");

                    $$("gridRptt").refresh();


                }
            });

            $("#chkRoomTp").click(function () {
               
                $$('gridRptt').clearAll();
                $("#TotlaRooms").val("0");
                $("#TotlaPax").val("0");
                if ($("#chkRoomTp")[0].checked == true) {
                    $("#chkNoShows")[0].checked = false;
                    $("#chkRoomTp")[0].checked = true;
                    $("#chkReinstate")[0].checked = false;
                    $("#Renoshow").show();
                    $("#totlrmpax").show();
                    $("#Reinstate").hide();
                    $("#btnback").hide();
                    $("#chkReinstateNo")[0].checked = false;
                    $("#ChkReinCancelled")[0].checked = false;
                    $("#chkRef").show();
                    $("#sRef").show();

                    $("#lblNoshow").text("Cancelled Reservation");


                    $$("gridRptt").showColumn("ixSNo");
                    $$("gridRptt").showColumn("ixTyp");
                    $$("gridRptt").showColumn("IXCOL11");
                    $$("gridRptt").showColumn("ixCancDt");
                    $$("gridRptt").showColumn("ixCancTm");
                    $$("gridRptt").showColumn("IXCOL14");
                    $$("gridRptt").showColumn("IXCancNo");
                    if ($("#chkRef")[0].checked == true)
                        $$("gridRptt").showColumn("ixRefer");
                    else
                        $$("gridRptt").hideColumn("ixRefer");

                    $$("gridRptt").refresh();


                }
            });

            $("#chkReinstate").click(function () {
                if ($("#chkReinstate")[0].checked == true) {
                    $("#chkNoShows")[0].checked = false;
                    $("#chkRoomTp")[0].checked = false;
                    $("#chkReinstate")[0].checked = true;
                    $("#btnback").show();
                    $("#totlrmpax").hide();
                    $("#Renoshow").hide();
                    $("#Reinstate").show();
                    $("#chkReinstateNo")[0].checked = true;
                    $("#ChkReinCancelled")[0].checked = true;
                    $$('gridRptt').clearAll();
                    $('#gridRpt').remove();
                    $("#htmlapp").append(htmlapp);
                    $("#lblNoshow").text("Reinstate Reservation");
                    $("#chkRef").hide();
                    $("#sRef").hide();

                    webix.ui({
                        view: "datatable",
                        container: "gridRpt",
                        id: "gridRptt",
                        select: "row",
                        data: [],
                        height: 450,
                        autoConfig: true,
                        resizeColumn: true,
                        resizeRow: true,
                        //height: 460,
                        position: "flex",
                        columns: [
                        { header: "Res No", id: "ixResNo", width: 100, css: { 'text-align': 'center ! important' } },
                         { header: "Type", id: "IxType", width: 100, css: { 'text-align': 'center ! important' } },
                          { header: "Reinstate Dt", id: "ixRDT", width: 100 },
                          { header: "Guest Name", id: "ixGNm", width: 250 },
                          { header: "Company Name", id: "ixComp", width: 250 },
                          { header: "Tariff", id: "ixTariff", width: 100 },
                          { header: "Total Tariff", id: "ixTotTariff", width: 110, css: { 'text-align': 'right ! important' } },
                         { header: "Nights", id: "ixNights", width: 100, css: { 'text-align': 'center ! important' } },
                          { header: "Actual Arrival Dt", id: "ixActArrival", width: 150 },
                          { header: "Arrival Dt", id: "ixArrDt", width: 150 },
                          { header: "Depart Dt", id: "IXDEP", width: 150 },
                          { header: "Reinstate Reason", id: "ixReas", width: 250 },
                         { header: "User", id: "ixUser", width: 100 },

                        ],

                    });

                }
            });

            $("#chkRef").click(function () {
                if ($("#chkRef")[0].checked == true)
                    $$("gridRptt").showColumn("ixRefer");
                else
                    $$("gridRptt").hideColumn("ixRefer");

                $$("gridRptt").refresh();
            });


            $("#btnback").click(function () {
                location.reload();
            });
           




            $("#btnDisplay").click(function () {
                
                $("#LoadDIv").show();
                var frmdate = "";
                var todate = "";
                var PrcType = "";



                var Reinstant = "0";
                var ReinCancel = "0";
                if ($("#chkReinstateNo")[0].checked == true)
                    Reinstant = "1";
                if ($("#ChkReinCancelled")[0].checked == true)
                    ReinCancel = "1"

                var frmdate = $$("FromMthDate").getValue();
                var todate = $$("ToMthDate").getValue()
                var Reserver = ""
                if ($("#chkNoShows")[0].checked == true)
                    Reserver = "1";
                else if ($("#chkRoomTp")[0].checked == true)
                    Reserver = "2";
                else if ($("#chkReinstate")[0].checked == true)
                    Reserver = "3";




                if (frmdate == "") {
                    webix.message("From Date can't be empty", "warning", 500);
                    $("#LoadDIv").hide();
                    return;
                }


                if (todate == "") {
                    webix.message("To Date can't be empty", "warning", 500);
                    $("#LoadDIv").hide();
                    return;
                }






                var comp = $$("Property").getValue();


                var param = JSON.stringify({
                    comp: comp, frmdate: frmdate, todate: todate, Reserver: Reserver, ReinCancel: ReinCancel, Reinstant: Reinstant
                });

                var Currfrmt = $("#CURRENCY_FORMAT").val();
                var CurrDelimit = $("#CURRENCY_DELIMIT").val();
                var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();



                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    accepts: "application/json",
                    dataType: "json",
                    url: "/Reports/RptNoshowCancel",
                    cache: false,
                    async: true,
                    charset: 'utf-8',
                    data: param,
                    success: function (data) {
                        //
                        if (data != "") {
                            var rowDatad = JSON.parse(data);
                            $$('gridRptt').clearAll();



                            $$("gridRptt").parse(rowDatad.GIRD);
                            $("#TotlaRooms").val(rowDatad.Rooms)
                            $("#TotlaPax").val(rowDatad.Pax);
                            if ($("#chkRef")[0].checked == true)
                                $$('gridRptt').showColumn("ixRefer");
                            else
                                $$('gridRptt').hideColumn("ixRefer");

                            $$('gridRptt').refresh();
                            if ($("#chkReinstate")[0].checked == false) {
                                var row_id = $$("gridRptt").getLastId();
                                $$("gridRptt").addRowCss(row_id, "my_style11");
                            }
                        }
                    },
                    error: function (err) {
                        $("#LoadDIv").hide();
                    },
                    complete: function () {
                        
                        $("#LoadDIv").hide();
                    }
                });
            })


            function SMFromDateChange(e) {
                // 
                var From = $("#FromDate").val();
                var To = $("#ToDate").val();

                $.ajax({
                    type: "POST",
                    url: "/Reports/FTDateValidation",
                    cache: false,
                    charset: 'utf-8',
                    data: "F=" + From + "&T=" + To,
                    success: function (data) {
                        if (data.d != "") {
                            AlertMesaageDate();
                            $("#FromDate").val(To);
                        }
                    }
                });

            }

            function AlertMesaageDate() {
                var window = $("#CommonAlert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }

            function SMToDateChange(e) {
                //

                var From = $$("FromDate").getValue();
                var To = $$("ToDate").getValue()

                if (From == "") return false;
                if (To == "") return false;

                From = formatDate(From);
                To = formatDate(To);


                $.ajax({
                    type: "POST",
                    url: "/Reports/FTDateValidation",
                    cache: false,
                    charset: 'utf-8',
                    data: "F=" + From + "&T=" + To,
                    success: function (data) {
                        if (data.d != "") {
                            AlertMesaageDate();
                            $("#FromDate").val(To);
                        }
                    }
                });
            }

            function formatDate(StrDt) {
                //
                var Parts = StrDt.split(" ");
                var MN = FnRetMonth(Parts[0]);
                var YR = Parts[1];
                var Str = "01" + "/" + MN + "/" + YR;
                return Str;
            }

            function FnRetMonth(StrMnNm) {
                //
                var UStr = StrMnNm.toUpperCase();
                var str = "";

                switch (UStr) {
                    case "JAN": str = "01"; break;
                    case "FEB": str = "02"; break;
                    case "MAR": str = "03"; break;
                    case "APR": str = "04"; break;
                    case "MAY": str = "05"; break;
                    case "JUN": str = "06"; break;
                    case "JUL": str = "07"; break;
                    case "AUG": str = "08"; break;
                    case "SEP": str = "09"; break;
                    case "OCT": str = "10"; break;
                    case "NOV": str = "11"; break;
                    case "DEC": str = "12"; break;
                }

                return str;
            }

            function AlertMesaage() {
                var meg = $("#AlertMessageHdn").val();
                $("#alertMeg").text(meg);
                var alertty = $("#alertType").val();
                if (alertty == 'fail') {
                    $("#alertimg").show();
                    $("#saveimg").hide();
                }
                else {
                    $("#saveimg").show();
                    $("#alertimg").hide();
                }
                var window = $("#Alert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
            function DelAlertMesaage() {
                var meg = $("#AlertMessageHdn").val();
                $("#alertMeg1").text(meg);
                var alertty = $("#alertType").val();
                if (alertty == 'fail') {
                    $("#alertimg1").show();
                    $("#saveimg1").hide();
                }
                else {
                    $("#saveimg1").show();
                    $("#alertimg1").hide();
                }
                var window = $("#DEAlert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }

        });
           
        function GridLodFn() {
            webix.ui({
                view: "datatable",
                container: "gridRpt",
                id: "gridRptt",
                select: "row",
                data: [],
                height: 450,
                minWidth: 900,
                autoConfig: true,
                resizeColumn: true,
                resizeRow: true,
                //height: 460,
                position: "flex",
                columns: [
                { header: "S.No", id: "ixSNo", width: 70, css: { 'text-align': 'center ! important' } },
                 { header: "Type", id: "ixTyp", width: 70, css: { 'text-align': 'center ! important' } },
                  { header: "Reserve No", id: "ixResvNo", width: 100, css: { 'text-align': 'left ! important' } },
                  { header: "Reserve Date", id: "IxResDt", width: 130, css: { 'text-align': 'left ! important' } },
                  { header: "Type", id: "ixRmTy", width: 70, css: { 'text-align': 'center ! important' } },
                  { header: "Rooms", id: "ixRooms", width: 70, css: { 'text-align': 'right ! important' } },
                 { header: "Pax", id: "ixPax", width: 70, css: { 'text-align': 'right ! important' } },
                  { header: "Guest Name", id: "IXGSTNM", width: 200, css: { 'text-align': 'left ! important' } },
                  { header: "Company Name", id: "ixComp", width: 250, css: { 'text-align': 'left ! important' } },
                  { header: "Travel agent", id: "ixTravelNm", width: 200, css: { 'text-align': 'left ! important' } },
                  { header: "Night", id: "ixNights", width: 70, css: { 'text-align': 'left ! important' } },
                 { header: "Arrival", id: "ixarr", width: 100, css: { 'text-align': 'left ! important' } },
                  { header: "Depart", id: "ixDept", width: 100, css: { 'text-align': 'left ! important' } },
                  { header: "Rate Type", id: "ixRatetype", width: 100, css: { 'text-align': 'left ! important' } },
                  { header: "Tariff", id: "ixTariff", width: 70, css: { 'text-align': 'right ! important' } },
                  { header: "Total Tariff", id: "ixTotTariff", width: 110, css: { 'text-align': 'right ! important' } },
               { header: "Revenue Loss", id: "ixRevenueLoss", width: 120, css: { 'text-align': 'right ! important' } },
             { header: "Reinstate", id: "ixReinst", width: 80, css: { 'text-align': 'left ! important' } },
                  { header: "Paymade Mode", id: "ixPayMode", width: 120, css: { 'text-align': 'left ! important' } },
                     { header: "Cancel By", id: "IXCOL11", width: 100, css: { 'text-align': 'left ! important' } },
                  { header: "Cancel No", id: "IXCancNo", width: 100, css: { 'text-align': 'left ! important' } },
                    { header: "Cancel Dt", id: "ixCancDt", width: 100, css: { 'text-align': 'left ! important' } },
               { header: "Cancel Tm", id: "ixCancTm", width: 100, css: { 'text-align': 'center ! important' } },
                { header: "Cancel Reason", id: "IXCOL14", width: 250, css: { 'text-align': 'left ! important' } },
                { header: "Refer#", id: "ixRefer", width: 170, css: { 'text-align': 'left ! important' } },
                ],

            });
            $$("gridRptt").hideColumn("ixSNo");
            $$("gridRptt").hideColumn("ixTyp");
            $$("gridRptt").hideColumn("IXCOL11");
            $$("gridRptt").hideColumn("ixCancDt");
            $$("gridRptt").hideColumn("ixCancTm");
            $$("gridRptt").hideColumn("IXCOL14");
            $$("gridRptt").hideColumn("IXCancNo");
            if ($("#chkRef")[0].checked == true)
                $$("gridRptt").showColumn("ixRefer");
            else
                $$("gridRptt").hideColumn("ixRefer");

            $$("gridRptt").refresh();
        }

      


        ////$("#Property").change(function (e) {
        ////    
        ////    var PropertyId = $("#Property").val();
        ////    var countrydrop = $("#Property").data('kendoDropDownList');
        ////    $.ajax({
        ////        type: "POST",
        ////        url: "/Reports/PeopertySessionReAssign",
        ////        data: "PropertyId=" + PropertyId,
        ////        success: function (data) {
        ////            if (data != null && data != "" && data != undefined) {
        ////                $("#btnDisplay").click();
        ////                //this.form.submit();
        ////            }
        ////        }
        ////    });

        ////});
        ////function sessionReassign() {
        ////    var PropertyId = $("#Property").val();
        ////    var countrydrop = $("#Property").data('kendoDropDownList');
        ////    $.ajax({
        ////        type: "POST",
        ////        url: "/Reports/PeopertySessionReAssign",
        ////        data: "PropertyId=" + PropertyId,
        ////        success: function (data) {
        ////            if (data != null && data != "" && data != undefined) {
        ////                // $("#btnDisplay").click();
        ////                //this.form.submit();
        ////            }
        ////        }
        ////    });
        ////}

    </script>
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="FeaturedContent" runat="server">
   
    <div class="content">
       
        <div style="margin-top: 25px !important;" class="row new_hdr">
                        <div class="col-sm-3">

                              
        <div class="TextWidth" style="margin-top:10px;" id="divPropbox">
           
        </div>
       
                            
                        </div>
                        <div class="col-sm-5 text-center">
                            <strong>
                                <label  class="wc_hdr_tlt" id="lblNoshow"><strong>Segment Analysis  </strong></label>
                            </strong>
                        </div>
                        <div class="col-sm-4">
                            <div class="card-tools text-right mt-2">
                                <button type="button" class="btnButton" id="Print" title="Print" onclick="fnGridPrint()"><i class='fas fa-print'></i></button>
                                <button type="button" class="btnButton" id="Excel" title="Excel Export" onclick="fnExcelExport()"><i class="far fa-file-excel"></i></button>
                                <button type="button" class="btnButton" id="Email" title="Email" onclick="fnSendMail()"><i class="far fa-1x fa-envelope"></i></button>

                            </div>
                        </div>


                    </div>
          <%--<div class="TopHdr"  style="margin-top:30px;">
       
        <%using (Html.BeginForm("FOTaxReport", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
          {%>
        <div class="TextWidth" style="margin-top:5px;" id="divPropbox">
           
        </div>
        <%} %>

        <div class="TopHdrMod">
            <label id="lblNoshow"   style="color: black;  font-weight: bold"> </label>
        </div>
        <div class="HdrBtnBx">

             <div class="row">
                        <div class="col-sm-12">
                             <button type="button" id="Print" class="btnXX"> Print</button>
                               <button type="button" id="Excel" class="btnXX"> Excel</button>
                        </div>
                    </div>
          
        

        <%--    <%= Html.Kendo().Button()
                .Name("Print")    
                .HtmlAttributes(new { id="",   })               
                .Content("Print")%>
           <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="",  })               
                .Content("Excel")%>
        </div>
    </div>
</div>--%>
    <link href="../../Content/Contribute.css" rel="stylesheet" />

    <div id="MAIN" class="FullwidthDIV">
        <div id="LoadDIv" style="display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189">
            <img src="../../Images/progress.GIF" style="position: absolute;left:50%; top:45%; height:100px; width:80px;" />
        </div>


    <style>
        .TotalB {
            font-weight:bold;
            text-align:right;
        }

        .RowInt {
            text-align: right;
        }
    </style>
    <div id="divPage">
       
          <div class="fulwidth">
            <div style="width: 100%">               
                <div id="Renoshow" style="width:25%; float:left" class="control-label">
                    <div>
                        <span id="spNoshows">
                            <input  type="checkbox" id="chkNoShows" />&nbsp;No Shows</span>
                    </div> 
                    <div> 
                        <span id="spCancelled">
                            <input class="control-label" type="checkbox" id="chkRoomTp" />&nbsp;Cancelled Reservation</span>
                    </div>    
                     <div> 
                        <span id="spReinstate">
                            <input class="control-label" type="checkbox" id="chkReinstate" />&nbsp;Reinstate Reservation</span>
                    </div>                  
                </div>
              
                <div id="Reinstate" style="display:none; width:25%; float:left">
                    <div>
                        <span id="spReinstateno">
                            <input class="control-label" type="checkbox" id="chkReinstateNo" />Reinstate No Show</span>
                    </div> 
                    <div> 
                        <span id="spReinCancelled">
                            <input class="control-label" type="checkbox" id="ChkReinCancelled" />Reinstate Cancelled</span>
                    </div>    
                                      
                </div>

                <div style="width:40%; float:left;margin-top:5px;">
                    <div class="valbx0 control-label" style="padding-right:2px;">From</div>
                    <div class="valbx110">                        
                        <div id="divFromMthDate" >                            
                        </div>
                    </div>
                    <div class="valbx0 control-label" style="width:40px;padding-right:2px;">To</div>
                    <div class="valbx110" >                        
                        <div id="divToMthDate" >                            
                        </div>
                    </div>

                    <div></div>
                    <div class="txtbx60" style="padding-top:1px;margin-left:15px;">

                        <input type="button" id="btnDisplay" class="btn btn-sm wc_cstbtn30 wcauto_bx" value="Display" />
                    </div>                   

                </div>

             

                    <div class="mt-1" id="totlrmpax" style="float:left; width:22%">
                        <div class=" wc_fulwidth">
                    <div class="valbx0 control-lable" style="width:100px;padding-right:2px;  ">Total Rooms</div>
                                         
                        <div class="valbx1">
                            <input class="form-control" style="width:50px; text-align:center" readonly type="text" id="TotlaRooms" />
                        </div>
                            </div>
                   
                    
                  <div class=" wc_fulwidth">
                     <div class="valbx0 control-lable" style="width:100px;padding-right:2px;">Total Pax</div>
                                        
                        <div class="valbx1">
                            <input class="form-control" style="width:50px; text-align:center" readonly  type="text" id="TotlaPax" />
                         </div>
                      </div>
                    
                    
                  </div>

                <div class="mt-1" style="float:left; width:12%">
                        <div class=" wc_fulwidth">
                            <input type="checkbox" id="chkRef" title="Refer#" />
                            <span class="control-label" id="sRef">Refer#</span>
                            </div>
                  </div>
                   
                <div  id="divback" style="text-align:right">
                     <input type="button" id="btnback" class="btn btn-sm wc_cstbtn wcauto_bx mt-2 float-right mr-1" value="Back" />
                </div>    

            </div>
        </div>        

    </div>
        <div id="htmlapp" class="fulwidth">
            
            <div id="gridRpt" style="width: 100%; height: 500px">
                
            </div>
        </div>

   </div>
    <input type="hidden" id="AlertMessageHdn" />
    <input type="hidden" id="alertType" />
    <input type="hidden" id="Log" />
    <input type="hidden" id="W10_IND" />
    <input type="hidden" id="J15_IND" />
    <input type="hidden" id="COMPID" />
    <input type="hidden" id="CURRENCY_FORMAT" />
    <input type="hidden" id="CURRENCY_DELIMIT" />
    <input type="hidden" id="CURRENCY_DECIMLIMIT" />
    <input type="hidden" id="CHK_REV" VALUE="1"/>
    <input type="hidden" id="CHK_ARR" VALUE="1"/>
    <input type="hidden" id="CHK_RN" VALUE="1"/>
    <input type="hidden" id="CHK_RNWO" VALUE="1"/>

         </div>
    <%: Html.Partial("_RptRoomwsOptions") %>
    <%: Html.Partial("_CommonMeaasgeWindow") %>  
  
   
    <style>
        .Pagefalse {
            pointer-events: none;
            opacity: 0.6;
        }

        .GrpTot1{color: black; font-weight: Bold; font-family:Arial !important;}

        .GrpTot2{ color: black; font-weight: Bold; font-family: Arial !important; }

        .GrpTotBtm{ background-color:lightgray; color: Brown; font-weight: Bold; font-family: Arial !important; }

        .GrpTotGrnd{ background-color:blue; color: white; font-weight: Bold; font-family: Arial !important; }
        .GndTot{ background-color:blue; color: white; font-weight: Bold; font-family: Arial !important; }
        .HideRow{display:none !important }
        .form-control {
    display: block;
    width: 100%;
    height: 20px !important;
    padding: 0px 0px 0px 2px !important;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cecece !important;
    border-radius: .25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    /* font-family: 'Poppins'!important; */
    font-size: .8125rem !important;
    font-style: normal !important;
    font-weight: 200 !important;
}
    </style>

    <script>

        $(document).ready(function () {
            //
            $("#LoadDIv").hide();
            $("#MenuName").val('FOMNUREPSHOWCANCRSV');
            $("#MenuLvl").val('FOMNUANL');
            $("#MenuLvl1").val('');
            $("#Excel").click(function () {
                var FullData = $$("gridRptt").serialize();
                var fileName = $("#lblNoshow").text();
                var len = FullData.length;
                if (len > 0) {
                    webix.toExcel($$("gridRptt"), {
                        filename: fileName,
                        styles: true,
                        name: fileName,
                        docHeader: fileName,
                        rawValues: true,
                    });
                }
                else {
                    alert("Records not present in Report");
                }
            });
            $("#Print").click(function () {
                var FullData = $$("gridRptt").serialize();
                var fileName = $("#lblNoshow").text();
                var len = FullData.length;
                if (len > 0) {
                    webix.print($$("gridRptt"), {
                        docHeader: fileName,
                        fontSize: 25,
                        fit: "data",
                        scroll: false,
                        mode: "landscape"
                    });
                }
                else {
                    alert("Records not present in Report");
                }
            });


            webix.ready(function () {
                webix.ui({ container: "divFromMthDate", view: "datepicker", name: "FromMthDate", id: "FromMthDate", format: "%d/%m/%Y", stringResult: true, width: 125 });
                webix.ui({ container: "divToMthDate", view: "datepicker", name: "ToMthDate", id: "ToMthDate", format: "%d/%m/%Y", stringResult: true, width: 125 });
           
                webix.ui({
                    container: "divPropbox",
                    view: "richselect",
                    id: "Property",
                    //width: 220,
                    //autowidth:true,
                    options: LoadCompany(),
                    on: {
                        onChange: function (NewVal, OldVal) {
                            if (NewVal != "") {
                              
                              

                            }
                        }
                    }

                });

                var cmpid = '<%=Session["COMPIDD"]%>';
                $$("Property").setValue(cmpid);

                LoadDate();
               

            });


        });



        function LoadDate() {

            $.ajax({
                type: "POST",
                url: "/Reports/GetFrmMnthToMnth1",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "",
                success: function (data) {
                    
                    var data1 = JSON.parse(data.v);

                    var vFromDt = data1[0].FROMDATE.toString().trim();
                    var vToDt = data1[0].TODATE.toString().trim();
                    $$("FromMthDate").setValue(new Date(vFromDt));
                    $$("ToMthDate").setValue(new Date(vToDt));

                },
            });

        }

        function LoadCompany() {
            //
            var rowData = [];
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/fnLoadProperty",
                    data: "",
                    success: function (d) {
                        
                        if (d != "") {
                            rowData = JSON.parse(d);
                        }
                    },

                });
            }
            catch (e) {
                console.log(e.message)
            }
            return rowData;
        };


        function fnLoadRoomType() {
            //
            var rowData = [];
            var W10_IND = $("#W10_IND").val();
            var CHKPM = "0";
            var vCmpId = $$("Property").getValue();

            if ($("#chkPM")[0].checked == true) CHKPM = "1";
            if (W10_IND == "") W10_IND = "0";
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/fnLoadRoomType",
                    data: "CmpId=" + vCmpId + "&W10_IND=" + W10_IND + "&CHKPM=" + CHKPM,
                    success: function (d) {
                        rowData = JSON.parse(d);

                        $$("ddlRoomTp").define("options", rowData);
                        $$("ddlRoomTp").setValue("<-ALL->");
                    }
                });
            }
            catch (e) {
                console.log(e.message)
            }
            //return rowData;
        };

        function LoadCurrDet(vProperty) {
            //
            var rowDatad = [];
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/GetCurrFormatDetails",
                    data: "CmpId=" + vProperty,
                    success: function (d) {
                        if (d != "") {
                            rowDatad = JSON.parse(d);
                            $("#CURRENCY_FORMAT").val(rowDatad.CURRENCY_DECIMLIMIT);
                            $("#CURRENCY_DELIMIT").val(rowDatad.CURRENCY_DELIMIT);
                            $("#CURRENCY_DECIMLIMIT").val(rowDatad.CURRENCY_DECIMLIMIT);
                        }
                    }
                });

            }
            catch (e) {
                console.log(e.message)
            }
        };

        function LoadControl(vProperty) {
            //
            var rowDatad = [];
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/LoadFoControl",
                    data: "CmpId=" + vProperty,
                    success: function (d) {
                        //
                        if (d != "") {
                            rowDatad = JSON.parse(d);
                            var W10_IND = rowDatad.W10_IND;
                            var J15_IND = rowDatad.J15_IND;

                            $("#W10_IND").val(W10_IND);
                            $("#J15_IND").val(J15_IND);

                            if (W10_IND == "1") {
                                $("#dvPM").show();
                                $("#chkPM")[0].checked = true;
                            }
                            else $("#dvPM").hide();
                        }
                    }
                });
            }
            catch (e) {
                console.log(e.message)
            }
        };

        function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
            //

            if (value == null) return "";

            if (value.toString() != "") {

                <%--var Currfrmt = '<%=Session["CURRENCY_FORMAT"]%>';
                var CurrDelimit = '<%=Session["CURRENCY_DELIMIT"]%>';
                var CurrDecimal = '<%=Session["CURRENCY_DECIMLIMIT"]%>';--%>


                if (Currfrmt == "L") {
                    var x = parseFloat(value).toFixed(CurrDecimal);
                    var neg = false;
                    if (value < 0) {
                        neg = true;
                        //x = math.abs(x);
                    }

                    x = x.toString();
                    var afterPoint = '';
                    if (x.indexOf('.') > 0) {
                        afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                        afterPoint = CurrDelimit + afterPoint
                    }



                    x = Math.floor(x);
                    x = x.toString();
                    var lastThree = x.substring(x.length - 3);
                    var otherNumbers = x.substring(0, x.length - 3);
                    if (otherNumbers != '' && otherNumbers != '-')
                        lastThree = ',' + lastThree;
                    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                }
                else {
                    var x = parseFloat(value).toFixed(CurrDecimal);
                    var neg = false;
                    if (value < 0) {
                        neg = true;
                        //x = math.abs(x);
                    }

                    x = x.toString();

                    var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                    if (res.indexOf('.') > 0) {

                        res = res.replace(".", CurrDelimit)
                    }


                    return res;
                }
            }
            else {
                return value;
            }
        }

        function fnSendMail() {
            if (fnChkSessVal() == false) return;
            if (fnChkEmlSettAvl() == false) {
                webix.message("Mail Settings not defined", "warning");
                return;
            }
            $("#LoadDIv").show();
            var frmdate = "";
            var todate = "";
            var PrcType = "";



            var Reinstant = "0";
            var ReinCancel = "0";
            if ($("#chkReinstateNo")[0].checked == true)
                Reinstant = "1";
            if ($("#ChkReinCancelled")[0].checked == true)
                ReinCancel = "1"

            var frmdate = $$("FromMthDate").getValue();
            var todate = $$("ToMthDate").getValue()
            var Reserver = ""
            if ($("#chkNoShows")[0].checked == true)
                Reserver = "1";
            else if ($("#chkRoomTp")[0].checked == true)
                Reserver = "2";
            else if ($("#chkReinstate")[0].checked == true)
                Reserver = "3";




            if (frmdate == "") {
                webix.message("From Date can't be empty", "warning", 500);
                $("#LoadDIv").hide();
                return;
            }


            if (todate == "") {
                webix.message("To Date can't be empty", "warning", 500);
                $("#LoadDIv").hide();
                return;
            }

            var CompId = $$("Property").getValue();
            var COMPNM = $$("Property").getText();
            Request = {
                COMPID: CompId,
                COMPNM: COMPNM,
                frmdate: frmdate,
                todate: todate,
                Reserver: Reserver,
                ReinCancel: ReinCancel,
                Reinstant: Reinstant,
                //BASECURID: window.BASE_CURRENCY,
                //CURRENCYID: window.BASE_CURRENCY,
                //CURRENCYDECLEN: window.CURRENCY_DECIMLIMIT,
                //CURRENCYFORMAT: window.CURRENCY_FORMAT,
                //H14_IND: window.H14_Ind,
            }

            var rowData = [];
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: true,
                url: "/Reports/fnNARptNoShowEmailSend",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    
                    if (d != "") {
                        Ret = d;
                        if (d == "1") {
                            webix.alert("Mail Send Successfully");
                        }
                        else if (d == "2") {
                            webix.alert("Excel Export Error");
                        }
                        else if (d == "3") {
                            webix.alert("Error on Sending Mail");
                        }
                        else {
                            webix.alert("No Record found");
                        }
                    }
                    else {
                        webix.alert("No Record found");
                    }
                },
                complete: function () {
                    $("#LoadDIv").hide();
                },
                error: function (request, status, error) {
                    console.log("Error Failure");
                    $("#LoadDIv").hide();
                }
            });
        }

        function fnChkSessVal() {
            
            var bVal = "0";
            $.ajax({
                async: false,
                url: "/Reports/fnChkSessionval",
                type: 'POST',
                success: function (data) {
                    
                    if (data == "1") {
                        bVal = "1";
                    }
                },
                error: function (request, status, error) {
                    bVal = "0";
                }
            });
            if (bVal == "1") return true;
            else {
                
                var Host = window.location.host;
                var LoadingUrl = "http://" + Host + "/Login.aspx";
                window.location.href = LoadingUrl;
            }
        };

        function fnChkEmlSettAvl() {
            
            var CompId = $$("Property").getValue();
            var bRet = false;
            var Request = {
                REQTYPE: "GET_FNCHKEMLSETTAVAIL",
                COMPID: CompId,
                NoShow : "1",

            }
            var rowData = "";
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: false,
                url: "/Reports/FOAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (data) {
                    
                    if (data != "") {
                        rowData = JSON.parse(data);
                        if (rowData == "1") bRet = true;
                    }
                },
                error: function (request, status, error) {
                    console.log("Error Failrue");
                }
            });

            return bRet;

        };

    </script>
</asp:Content>











