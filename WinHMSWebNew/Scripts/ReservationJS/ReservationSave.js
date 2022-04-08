
$("#Cancres").click(function (e) {
    var ReservationAdvance = $("#ReservationAdvance").text();
   
    if (ReservationAdvance != "0.00" && ReservationAdvance != "0") {
        $("#refundamt").text(ReservationAdvance);
        var window = $("#PendingAdvanceRefundConfirm");
        var kWnd = window.data("kendoWindow");
        kWnd.center().open();
    }
    else {
        var txtResno = $("#txtResno").val();
        var grid = $("#GrdReservation").data("kendoGrid");
        var no = $("#ReservationRowHidden").val();
        var SAVE_STS = grid.dataSource._data[no].SAVE_STS;
        if (SAVE_STS != "N") {
            if (txtResno != "") {
                var grid = $("#GrdReservation").data("kendoGrid");
                var total = grid.dataSource._data.length;
                if (total > 1) {
                    $("#canceltypeoptionDiv").show();
                }
                var window = $("#ReservationCancelPop");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
        } else {
            var grid = $("#GrdReservation").data("kendoGrid");
            var uid = grid._data[no].uid;
            var row = grid.table.find('tr[data-uid="' + uid + '"]');
            grid.select(row[no]);
            grid.select().each(function () {
                var dataItem = grid.dataItem($(this));
                grid.dataSource.remove(dataItem);
            });
            var grid = $("#GrdReservation").data("kendoGrid");
            var total = grid.dataSource.data().length;
            if (total > 0) {
                var Lrowindx = Number(total) - 1;
                var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + Lrowindx + ')');
                $("#GrdReservation").data("kendoGrid").select(roww);
                $("#ReservationRowHidden").val(Lrowindx);
                GetLocalStorageData(Lrowindx);
            }
        }
    }
});

function line_Reservation_Cancel()
{
    var grid = $("#GrdReservation").data("kendoGrid");   
    var no = $("#ReservationRowHidden").val();
    var GUID = $("#GUID").val();
  
    var getindex = localStorage.getItem("RowIndex" + no + GUID);
    // Remove if Already Record is there.
    if (getindex != null) {
        localStorage.removeItem("RowIndex" + no + GUID);
        localStorage.removeItem("AllControls" + no + GUID);
        localStorage.removeItem("GrdGuest" + no + GUID);
        localStorage.removeItem("PackageGrid" + no + GUID);
    }
    var Canceltype = "1";
    if ($("#chkCanCurRes")[0].checked == true)
    {
        Canceltype = "1";
    }
    else if ($("#chkCanallRes")[0].checked == true) {
        Canceltype = "2";
    }
    var RESNO = grid.dataSource._data[no].RESNO;
    var R_NO = grid.dataSource._data[no].RNO;
    var CancDT = $("#txtareaCanDt").val();
    var CanBy = $("#txtareaCanBy").val();
    var CanNO = $("#txtareaCanNo").val();
    var CanReason = $("#txtareaCanReason").val();
    var CanReqBy = $("#txtareaCanReqBy").val();
   
    var dataparam = {};
    dataparam["COMPID"] = $("#divPropbox").val();
    dataparam["REQTYPE"] = "CANCEL_RESERVATION";
    dataparam["txtResno"] = RESNO;
    dataparam["txtResId"] = R_NO;
    dataparam["CANC_REASON"] = CanReason;
    dataparam["CANC_REQ_BY"] = CanReqBy;
    dataparam["CANC_DT"] = CancDT;
    dataparam["CANC_BY"] = CanBy;
    dataparam["CANC_NO"] = CanNO;
    dataparam["CANC_TY"] = Canceltype;
    
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FO/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        beforeSend: function () { $("#loading").show(); },
        success: function (data) {
            debugger;
            var grid = $("#GrdReservation").data("kendoGrid"); 
            var uid = grid._data[no].uid;
            var row = grid.table.find('tr[data-uid="' + uid + '"]');
            grid.select(row[no]);
            grid.select().each(function () {
                var dataItem = grid.dataItem($(this));
                grid.dataSource.remove(dataItem);
            });
            var window = $("#ReservationCancelPop");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();
            var window = $("#ResCancelConfirm");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();
            
          var grid = $("#GrdReservation").data("kendoGrid");
            var total = grid.dataSource.data().length;
            if (total > 0) {
                var Lrowindx = Number(total) - 1;
                var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + Lrowindx + ')');
                $("#GrdReservation").data("kendoGrid").select(roww);
                $("#ReservationRowHidden").val(Lrowindx);
                GetLocalStorageData(Lrowindx);
                $("#ResEmailChk").hide();
                $("#AlertMessageHdn").val("  Reservation Canceled  Successfully.");
                SaveMesaageWindow();
            } else {
                $("#ResEmailChk").hide();
                $("#AlertMessageHdn").val("  Reservation Canceled  Successfully.");
                SaveMesaageWindow();
            }
           $("#txtareaCanDt").val("");
           $("#txtareaCanBy").val("");
           $("#txtareaCanNo").val("");
            $("#txtareaCanReason").val("");
            $("#txtareaCanReqBy").val("");
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        },
        complete: function () { $("#loading").hide(); }
    });
}

$('#GrdReservation').on("blur", "tr", function (e) {
    var grid = $("#GrdReservation").data("kendoGrid");
    var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
    var no = rowIndex; 
});

$("#btnResAdd").click(function (e) {
    var meg = 0;
    $("#RATE_LOADID").val("");
    ReservationSaveMain(meg);
});

$("#ReservationSaveMain").click(function (e) {
    var meg = 1;
    ReservationSaveMain(meg);
});

var LastSelectedRowSave = function (meg, rowindx) {
   $("#Last_Line_Indx").val(rowindx);
    var grid = $("#GrdReservation").data("kendoGrid");   
     var LastRowData = grid.dataSource._data[rowindx];
     if (LastRowData.SAVE_STS == "N") {
         $("#PageLoadVal").val("1");
         var window = $("#AddnewResSaveConfirm");
         var kWnd = window.data("kendoWindow");
         kWnd.center().open();
     }
     else {
         $("#PageLoadVal").val("");
         if (!RowValidation(LastRowData))
             return false;
         ReaervationDataSave(rowindx, meg, LastRowData);
     }
  } 

var ReservationSaveMain = function (meg) {
    var _grid_Datas = $("#GrdReservation").data("kendoGrid");
    var selectedItem = _grid_Datas.dataItem(_grid_Datas.select());
    var BTN_TYPE = $("#BTN_TYPE").val();

    if (selectedItem == null) {
        var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + 0 + ')');
        $("#GrdReservation").data("kendoGrid").select(roww);
    }
    var selectedItem = _grid_Datas.dataItem(_grid_Datas.select());
    if (selectedItem != null) {            
        var rowindx = _grid_Datas.select()[0].rowIndex;
        if (Number(rowindx) >= 0) {
            var grid = $("#GrdReservation").data("kendoGrid");
            var total = grid.dataSource.data().length;
            if (total == 0) {
                ReservationAddRow();
            }
            else {
                var LastRowData = grid.dataSource._data[rowindx];
                var ARRV_DT = kendo.toString(kendo.parseDate(LastRowData.ARRV), 'dd/MM/yyyy');
                var DEPART = kendo.toString(kendo.parseDate(LastRowData.DEPART), 'dd/MM/yyyy');
                $.ajax({
                    url: "/FO/ARR_DEP_TIME_Validatation",
                    type: 'POST',
                    datatype: 'json',
                    data: "ARRDT=" + ARRV_DT + "&DEPDT=" + DEPART + "&ARRTM=" + LastRowData.ARRV_TM + "&DEPTM=" + LastRowData.DEPART_TM,
                    async: false,
                    success: function (data) {
                        debugger;                      
                        if (data.v == 1) {
                            $("#AlertMessageHdn").val(" Departure Time hasto be Greater than Arrival Time.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                            return false;
                        }
                        else if (data.v == 2) {
                            if (BTN_TYPE == "I" || BTN_TYPE == "S") {
                                $("#AlertMessageHdn").val(" Arrival Date hasto be Greater than Account Date.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                                return false;
                            }
                        }
                        else if (data.v == 3) {
                            if (BTN_TYPE == "I" || BTN_TYPE == "S") {
                                $("#AlertMessageHdn").val(" Departure Date hasto be Greater than Account Date.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                                return false;
                            }
                        }
                       else {

                           var GstGrid = $("#GrdGuest").data("kendoGrid");
                           if (GstGrid.dataSource._data.length > 0) {
                               var GUST_ID = GstGrid.dataSource._data[0].GUST_ID;
                               var GUST_TITLE = GstGrid.dataSource._data[0].GUST_TITLE;
                               var GUST_TITLE_ID = GstGrid.dataSource._data[0].GUST_TITLE_ID;
                               var GUST_LNM = GstGrid.dataSource._data[0].GUST_LNM;
                               var GUST_FNM = GstGrid.dataSource._data[0].GUST_FNM;
                               ExistingGUESTDetialsLoad(GUST_ID, GUST_TITLE, GUST_TITLE_ID, GUST_LNM, GUST_FNM);
                           }
                            if (!RowValidation(LastRowData))
                                return false;
                            ReaervationDataSave(rowindx, meg, LastRowData);
                        }
                    }
                });
            }
        }
        else {
            $("#AlertMessageHdn").val("RowIndex Cannot be Negative Value.");
            $("#alertType").val('fail');
            AlertMesaage();          
        }
    }
    else {
        $("#AlertMessageHdn").val("Please Select the Row of Reservation Grid.");
        $("#alertType").val('fail');
        AlertMesaage();     
    }
}

var RowValidation = function (LastRowData)
{
    if (LastRowData.RES_TYPE == "") {
        $("#AlertMessageHdn").val("Room Type Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage();              
                return false;
                }
    if (LastRowData.ARRV == "") {
        $("#AlertMessageHdn").val("Arraival Date Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage();             
                return false;               
                }
    if (LastRowData.DEPART == "") {
        $("#AlertMessageHdn").val("Departure Date Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage(); 
        return false;
                }
    if (LastRowData.ARRV_TM == "") {
        $("#AlertMessageHdn").val("Arraival Time Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage();              
       return false;                
                }
    if (LastRowData.DEPART_TM == "") {
        $("#AlertMessageHdn").val("Departure Time Cannot be Empty.");
        $("#alertType").val('fail');
        AlertMesaage();             
    return false;               
    }
   
    var cc_ind = dates.CC_IND;
    if (cc_ind == "1") {

    } else {

    }
        if (LastRowData.ADLT == "" && LastRowData.CHLD == "" && LastRowData.CHLD1 == "" && LastRowData.CHLD2 == "")
                {
                    if (LastRowData.ADLT == "0" &&
                        LastRowData.CHLD == "0" &&
                        LastRowData.CHLD1 == "0" &&
                        LastRowData.CHLD2 == "0") {
                        $("#AlertMessageHdn").val("Pax Cannot be Empty.");
                        $("#alertType").val('fail');
                        AlertMesaage();
                        return false;
                    }
                }
                if (LastRowData.R_TY == "") {
                    $("#AlertMessageHdn").val(" Rate Type Cannot be Empty.");
                    $("#alertType").val('fail');
                    AlertMesaage();                 
                    return false;
                }
                //if (pgindic.PLAN_APPL_IND == 1) {
                //    if (LastRowData.PLAN == "") {
                //        $("#AlertMessageHdn").val(" Paln Cannot be Empty.");
                //        $("#alertType").val('fail');
                //        AlertMesaage();
                //        return false;
                //    }
                //}
                if (LastRowData.RES_STSID == "3") {
                   var dateCuttoffDate =  $("#dateCuttoffDate").data("kendoDatePicker").value();
                   if (dateCuttoffDate == "") {
                        $("#AlertMessageHdn").val(" Enter Reconfirmation Date.");
                        $("#alertType").val('fail');
                        AlertMesaage();
                        return false;
                    }
                   else 
                   {

                   }
                }
                if (LastRowData.RES_STS == "") {
                    $("#AlertMessageHdn").val("Status  Cannot be Empty.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                    return false;
                }
               // if (pgindic.B7_IND == 1) {
                    var Pax = Number(LastRowData.ADLT) + Number(LastRowData.CHLD) + Number(LastRowData.CHLD1) + Number(LastRowData.CHLD2);
                    var GrdGuest = $("#GrdGuest").data("kendoGrid").dataSource.data();
                    if (GrdGuest.length != 0) {
                        if (GrdGuest.length > Pax) {
                            $("#AlertMessageHdn").val(" No of Pax Should be Equal to " + Pax + "(Created Guests).");
                            $("#alertType").val('fail');
                            AlertMesaage();
                            return false;
                        }
                    }
                    if (GrdGuest.length != 0) {
                        debugger;
                        var idx = Number(GrdGuest.length - 1);
                        if (idx < 0) idx = idx * -1;
                        if ((GrdGuest[idx].GUST_LNM == "" && GrdGuest[idx].GUST_FNM == "") || (GrdGuest[idx].GUST_LNM == undefined && GrdGuest[idx].GUST_FNM == undefined)) {
                            $("#AlertMessageHdn").val("Guest Name Cannot be Empty.");
                            $("#alertType").val('fail');
                            AlertMesaage();
                            return false;
                        }
                    }

               // }      
        return true;
      }

var PageFieldValidation = function (PageControls) { 
  
    if (pgindic.GUEST_TY_IND == 1) {
        if (PageControls["ddlguestyp"] == "") {
            $("#AlertMessageHdn").val("Guest Type  Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.MARKET_MAND_IND == 1) {
        if (PageControls["ddlmarktseg"] == "") {
            $("#AlertMessageHdn").val("Market Segment  Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.GEND_IND == 1) {
        var Gendid = $("#ddlgender").data("kendoDropDownList").value();
        if (Gendid == "") {
            // EditGuest();
            $("#AlertMessageHdn").val("Gender Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.A3_IND == 1) {
        var txtCCNO = $("#txtCCNO").val();
        if (txtCCNO == "") {
            $("#AlertMessageHdn").val("Credit Card No Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.D15_IND == 1) {
        var dateguestdob = $("#dateguestdob").val();
        if (dateguestdob == "") {
            $("#AlertMessageHdn").val(" Guest DOB Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.C17_IND == 0)
        {
        if (pgindic.RESRV_MODE_IND == 1) {
            if (PageControls["ddlresmode"] == "") {
                $("#AlertMessageHdn").val("Reservation Mode Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        }
}
    if (pgindic.PASS_IND == 1) {

        var txtEditGstcntryID = $("#txtEditGstcntryID").val().toString().trim();       
        if (pgindic.COUNTRY_ID != txtEditGstcntryID) {
            var txtpassport = $("#txtpassport").val();
            if (txtpassport == "") {
                $("#AlertMessageHdn").val("Passport No Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        }
        //var ddldocttype = $("#ddldocttype").data("kendoDropDownList").value();
        //ddldocttype = ddldocttype.trim();
        //alert(ddldocttype);
        //if(ddldocttype != "P")
        //{
        //    $("#AlertMessageHdn").val(" Document type should be Passport.");
        //    $("#alertType").val('fail');
        //    AlertMesaage();
        //    return false;
        //}
    }
    if (pgindic.I3_IND == 1) {
        if (pgindic.D19_IND == 1) {
            if (PageControls["txtref"] == "") {
                $("#AlertMessageHdn").val("Reference No  Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        }
    }
    if (pgindic.I17_IND == 1) {
        if (PageControls["ddlgusetsts"] == "") {
            $("#AlertMessageHdn").val("Guest Status Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.J2_IND == 1) {
        if (pgindic.CONTCT_IND == 1) {
            if (PageControls["txtbooker"] == "") {
                $("#AlertMessageHdn").val("Booker Name Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        }
    }
    if (pgindic.B19_IND == 1) {
            if (PageControls["ddlvisitpur"] == "") {
                $("#AlertMessageHdn").val("Visit Purpose Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
        }
    }
    if (pgindic.SALE_IND == 2) {
        if (PageControls["ddlsalpersn"] == "") {
            $("#AlertMessageHdn").val(" Sales Person  Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.BUSINESS_MAND_IND == 1) {
        if (PageControls["ddlbussrc"] == "") {
            $("#AlertMessageHdn").val(" Business Source  Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.VV_IND == 1) {
        if (PageControls["comp_id"] == "") {
            $("#AlertMessageHdn").val(" Company  Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.A17_IND == 0) {
        if (pgindic.Q11_IND == 1) {
            if (PageControls["agent_id"] == "") {
                $("#AlertMessageHdn").val(" Travel Agent Mandatory.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        }
    }
    var GrdGuest = $("#GrdGuest").data("kendoGrid").dataSource.data();   
    if (GrdGuest.length == 0)
    {
        $("#AlertMessageHdn").val(" Guest Mandatory.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    else
    {
        if (GrdGuest[0].GUST_ID == "") {
            $("#AlertMessageHdn").val(" Guest Mandatory.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    var MOBILE =GrdGuest[0].GUEST_MOBILE;
    var EMAIL = GrdGuest[0].EMAIL;
    var ADDRESS = GrdGuest[0].ADD1;
    var COUNTRY_ID = GrdGuest[0].COUNTRY_ID;

    var txtGuestEmail = $("#txtGuestEmail").val();
    var txGuestEmail2 = $("#txGuestEmail2").val();
    var txtmob = $("#txtmob").val();
        
    if (pgindic.B15_IND != "") {  //-------email
        if (EMAIL == "" && txtGuestEmail == "" && txGuestEmail2 == "") {
            $("#AlertMessageHdn").val(" Email Cannot be Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.G15_IND != "") {//---------mobile
        if (MOBILE == "" && txtmob == "") {
            $("#AlertMessageHdn").val(" Mobile No Cannot be Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.EE_IND != "") {//----------Country
        if (COUNTRY_ID == "") {
            $("#AlertMessageHdn").val(" Country Cannot be Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    if (pgindic.H7_IND != "") {//------Address
        if (ADDRESS == "") {
            $("#AlertMessageHdn").val(" Address Cannot be Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    var NIGHTS = PageControls["NIGHTS"];
    var A2_ID = $("#A2_ID").val();
    var A3_ID = $("#A3_ID").val();
    if (Number(A2_ID) > Number(NIGHTS))
    {
        $("#AlertMessageHdn").val(" Minimum stay "+A2_ID+" days.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    if (Number(A3_ID) < Number(NIGHTS)) {
        $("#AlertMessageHdn").val(" Maximum stay " + A3_ID + " days.");
        $("#alertType").val('fail');
        AlertMesaage();
        return false;
    }
    return true;
}

function GET_Page_Values()
{
   var PageControls = {}
    PageControls["ddlgusetsts"] = $("#ddlgusetsts").data("kendoDropDownList").value();
    PageControls["ddlsalpersn"] = $("#ddlsalpersn").data("kendoDropDownList").value();
    PageControls["ddlguestyp"] = $("#ddlguestyp").data("kendoDropDownList").value();
    PageControls["ddlresmode"] = $("#ddlresmode").data("kendoDropDownList").value();
    PageControls["ddlmarktseg"] = $("#ddlmarktseg").data("kendoDropDownList").value();
    PageControls["ddlbillng"] = $("#ddlbillng").data("kendoDropDownList").value();
    PageControls["ddlpayment"] = $("#ddlpayment").data("kendoDropDownList").value();
    PageControls["ddlbussrc"] = $("#ddlbussrc").data("kendoDropDownList").value();
    PageControls["ddlchannl"] = $("#ddlchannl").data("kendoDropDownList").value();
    PageControls["txtgustevnt"] = $("#txtgustevnt").val();
    PageControls["txtgustevntID"] = $("#txtgustevntID").val();

    PageControls["txtareaspl"] = $("#txtareaspl").val();
    PageControls["txtareaguest"] = $("#txtareaguest").val();
    PageControls["txtareachkin"] = $("#txtareachkin").val();
    PageControls["txtareachkout"] = $("#txtareachkout").val();
    PageControls["txtareanarra"] = $("#txtareanarra").val();

    PageControls["txttarfdiscperc"] = $("#txttarfdiscperc").val();
    PageControls["txttarfdiscamnt"] = $("#txttarfdiscamnt").val();
    PageControls["txtnettrfamnt"] = $("#txtnettrfamnt").val();
    if ($("#chksharp")[0].checked == true) PageControls["chksharp"] = "1";
    else PageControls["chksharp"] = "0";

    PageControls["txtplanamnt"] = $("#txtplanamnt").val();
    PageControls["txtchildamnt"] = $("#txtchildamnt").val();
    PageControls["txtplandiscper"] = $("#txtplandiscper").val();
    PageControls["txtplandiscamnt"] = $("#txtplandiscamnt").val();

    PageControls["agent_id"] = $("#agent_id").val();
    PageControls["txtagent"] = $("#txtagent").val();
    PageControls["txtagentch"] = $("#txtagentch").val();
    PageControls["comp_id"] = $("#comp_id").val();
    PageControls["txtcompany"] = $("#txtcompany").val();
    PageControls["group_id"] = $("#group_id").val();
    PageControls["txtgroup"] = $("#txtgroup").val();
    PageControls["BookerID"] = $("#BookerID").val();
    PageControls["ddltitle"] = $("#ddltitle").val();
    PageControls["txtbooker"] = $("#txtbooker").val();
    PageControls["source_id"] = $("#source_id").val();
    PageControls["txtsource"] = $("#txtsource").val();

    PageControls["ddlupgrade"] = $("#ddlupgrade").data("kendoDropDownList").value();
    PageControls["ddlvisitpur"] = $("#ddlvisitpur").data("kendoDropDownList").value();
    PageControls["ddlguestcatg"] = $("#ddlguestcatg").data("kendoDropDownList").value();

    if ($("#chkregcrd")[0].checked == true) PageControls["chkregcrd"] = "1";
    else PageControls["chkregcrd"] = "0";

    PageControls["txtvouch"] = $("#txtvouch").val();
    PageControls["txtref"] = $("#txtref").val();
    PageControls["txtareapos"] = $("#txtareapos").val();

    return PageControls;
}

var ReaervationDataSave = function (indx, meg, LastRowData) {
    try {
        debugger;
        $("#pageProgressdiv").show();
        debugger;
        var PageControls = GET_Page_Values();

    if (!PageFieldValidation(PageControls)) {
        $("#pageProgressdiv").hide();
        return false;
    }
    //Get all Control Values
    var AllControls = PageControls;
    var GrdGuest = $("#GrdGuest").data("kendoGrid").dataSource.data();
    var GrdReservation = $("#GrdReservation").data("kendoGrid").dataSource.data();
    var PromtTariffEditGrid = $("#PromtTariffEditGrid").data("kendoGrid").dataSource.data();
    var PackageGrid = $("#PromptPackageDeatilsSearch").data("kendoGrid").dataSource.data();
    if (PromtTariffEditGrid.length == 0)
    {
        var BTN_TYPE = $("#BTN_TYPE").val();
        if (BTN_TYPE == "N") {
            TarifEditCall();
            PromtTariffEditGrid = $("#PromtTariffEditGrid").data("kendoGrid").dataSource.data();
        }
    }
    var GUID = $("#GUID").val();

   var dd = $("#GrdReservation").data("kendoGrid");
   for (var i = 0; i < dd.dataSource.data.length; i++) {
       var Tarif = dd.dataSource._data[i].TARF;
       if (Tarif.toString().includes(',')) Tarif = Tarif.replace(',', '');
        dd.dataSource._data[i].TARF = Number(Tarif).toFixed(2);
    }
   dd.refresh();
   var dg = $("#GrdGuest").data("kendoGrid");
   for (var i = 0; i < dg.dataSource._data.length; i++) {
       var GUEST_SNO = dg.dataSource._data[i].GUEST_SNO;
       var GUST_ID = dg.dataSource._data[i].GUST_ID;
       if (GUEST_SNO != "" && GUEST_SNO != undefined && GUEST_SNO != null) {
           dg.dataSource._data[i].GUEST_SNO = GUEST_SNO.toString();
       }
       if (GUST_ID == "" || GUST_ID == undefined || GUST_ID == null) {
           $("#pageProgressdiv").hide();
           var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + indx + ')');
           $("#GrdReservation").data("kendoGrid").select(roww);
           $("#AlertMessageHdn").val(" Guest ID Cannot be Empty. Please Save Guest Details.");
           $("#alertType").val('fail');
           AlertMesaage();
           return false;
       }
   }
   dg.refresh();

    //Temp Save all Control Values in LOCAL STROAGE
   var getindex = localStorage.getItem("RowIndex" + indx + GUID);
  
   //var GrdRouteConfigVal = localStorage.getItem("GrdRouteConfigVal" + indx + GUID);
   //var RoutingSplitgrid = localStorage.getItem("RoutingSplitgrid" + indx + GUID);
   //var Routeaddress1 = localStorage.getItem("Routeaddress1" + indx + GUID);
   //var Routeaddress2 = localStorage.getItem("Routeaddress2" + indx + GUID);
   //var Routeaddress3 = localStorage.getItem("Routeaddress3" + indx + GUID);
   //var Routeaddress4 = localStorage.getItem("Routeaddress4" + indx + GUID);

    // Remove if Already Record is there.
    if (getindex != null)
    {
        localStorage.removeItem("RowIndex" + indx + GUID);
        localStorage.removeItem("AllControls" + indx + GUID);
        localStorage.removeItem("GrdReservation" + indx + GUID);
        localStorage.removeItem("GrdGuest" + indx + GUID);
        localStorage.removeItem("PromtTariffEditGrid" + indx + GUID);
        localStorage.removeItem("PackageGrid" + indx + GUID);
    }
       localStorage.setItem("RowIndex" + indx + GUID, indx);
       localStorage.setItem("AllControls" + indx + GUID, JSON.stringify(AllControls));
       localStorage.setItem("GrdReservation" + indx + GUID, JSON.stringify(GrdReservation));
       localStorage.setItem("GrdGuest" + indx + GUID, JSON.stringify(GrdGuest));
       localStorage.setItem("PromtTariffEditGrid" + indx + GUID, JSON.stringify(PromtTariffEditGrid));
       localStorage.setItem("PackageGrid" + indx + GUID, JSON.stringify(PackageGrid));

var BaseCurr = $("#BASE_CURRENCY").val();
var ReserveCurr = $("#RES_CURRENCY").val();
var ARRV_DT = kendo.toString(kendo.parseDate(LastRowData.ARRV), 'dd/MM/yyyy');
var  ARRV_TM = LastRowData.ARRV_TM;
var DEPART_DT = kendo.toString(kendo.parseDate(LastRowData.DEPART), 'dd/MM/yyyy');
var NIGHTS = LastRowData.NIGHTS;
var DEPART_TM = LastRowData.DEPART_TM;
var CHRT = $("#CHRT").val();
    //Reservation Save FO_API
     var dataparam = {};
     dataparam["COMPID"] = $("#divPropbox").val();
     dataparam["REQTYPE"] = "SAVE_RESERVATION";
     dataparam["AllControls"] = JSON.stringify(AllControls);
     dataparam["ReservationGrid"] = JSON.stringify(GrdReservation);
     dataparam["GrdGuest"] = JSON.stringify(GrdGuest);
     dataparam["PromtTariffEditGrid"] = JSON.stringify(PromtTariffEditGrid);
     dataparam["PackageGrid"] = JSON.stringify(PackageGrid);
     
     //dataparam["GrdRouteConfigVal"] = JSON.stringify(GrdRouteConfigVal);
     //dataparam["RoutingSplitgrid"] = JSON.stringify(RoutingSplitgrid);
     //dataparam["Routeaddress1"] = JSON.stringify(Routeaddress1);
     //dataparam["Routeaddress2"] = JSON.stringify(Routeaddress2);
     //dataparam["Routeaddress3"] = JSON.stringify(Routeaddress3);
     //dataparam["Routeaddress4"] = JSON.stringify(Routeaddress4);

     dataparam["BaseCurr"] = BaseCurr;
     dataparam["ReserveCurr"] = ReserveCurr;
     dataparam["ReserveIndx"] = indx;
     dataparam["txtResno"] = $("#txtResno").val();
     dataparam["txtResId"] = $("#txtResId").val();
     dataparam["ARRV_DT"] = ARRV_DT;
     dataparam["ARRV_TM"] = ARRV_TM;
     dataparam["DEPART_DT"] = DEPART_DT;
     dataparam["DEPART_TM"] = DEPART_TM;
     dataparam["NIGHTS"] = NIGHTS;
    
    
     debugger;
     var DataVal = JSON.stringify(dataparam);
     $("#pageProgressdiv").show();
     $.ajax({
         type: "POST",
         contentType: "application/json",
         accepts: "application/json",
         dataType: "json",
        url: "/FO/SAVE_RESERVATION",
         cache: false,
         charset: 'utf-8',
         data: DataVal,
         async:false,
         beforeSend: function () { $("#pageProgressdiv").show(); },
         success: function (data) {
             debugger;
             $("#pageProgressdiv").hide();
             if (data != "") {
                 var responsedata = JSON.parse(data);
                 var MegVal = responsedata.Meg;
                 var RESNO = responsedata.RESNO;
                 var R_NO = responsedata.R_NO;
                 var FileName = responsedata.FileName;
                 var EmailInd = responsedata.EmailInd;
                 var grid = $("#GrdReservation").data("kendoGrid");
                 $("#txtResno").val(RESNO);
                 $("#txtResId").val(R_NO);
                 $("#HdntxtResno").val(RESNO);
                 $("#HdntxtResId").val(R_NO);
                 debugger;
                 grid.dataSource._data[indx].RESNO = RESNO;
                 grid.dataSource._data[indx].RNO = R_NO;
                 grid.dataSource._data[indx].SAVE_STS = "A";
                 grid.refresh();
                 if (MegVal == "1") {
                     if(meg == 0) copyrowval(LastRowData, meg);
                     if (meg == 1) {

                         document.getElementById("ReservationEmail").checked = false;

                         var type = $("#BTN_TYPE").val();
                          
                         if (type == 'N') {
                             $("#AlertMessageHdn").val(" Saved Successfully.");
                         }
                         else {
                             $("#AlertMessageHdn").val("Reservation Amended.");
                         }
                         SaveMesaageWindow();
                         if (FileName != undefined && FileName != "" && FileName != null && EmailInd != undefined && EmailInd != "" && EmailInd != null) { //for email
                             $("#ResEmailChk").show();
                             $("#from").val("");
                             $("#cc").val("");
                             $("#sub").val("");
                             $("#to").val("");
                            
                             if (type == 'N')
                                 $("#sub").val('Reservation Confirmation');
                             else if (type == 'A')
                                 $("#sub").val('Reservation Amendment');

                             $("#to").val($("#txtGuestEmail").val());
                             debugger;
                             //document.getElementById("iframe").src = '<%=Session["filePath"]%>';
                             var nm = FileName;
                             var id = document.getElementById("iframe");
                             //id.src = '../../ReservationMail/' + nm + '.html'; //for local
                             id.src = 'ReservationMail/GuestMail.html'; //for hosted
                             //id.src = id.src;
                             //id.contentWindow.location.reload(true);     
                         }
                     }
                     if (meg == 0) var rowindx = Number(indx) + 1;
                     else {
                         var rowindx = indx;
                     }
                     var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + rowindx + ')');
                     $("#GrdReservation").data("kendoGrid").select(roww);
                     $("#ReservationRowHidden").val(rowindx);
                     var window = $("#AddnewResSaveConfirm");
                     var kWnd = window.data("kendoWindow");
                     kWnd.center().close();
                 }
                 else {
                     $("#AlertMessageHdn").val(" Saved Failed...!");
                     $("#alertType").val('fail');
                     AlertMesaage();
                 }
             }
             else {
                 $("#AlertMessageHdn").val(" Saved Failed...!");
                 $("#alertType").val('fail');
                 AlertMesaage();
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         },
     });

    }
    catch(e)
    {
        $("#pageProgressdiv").hide();
    }
};

function copyrowval(LastRowData, meg)
{
    var grid = $("#GrdReservation").data("kendoGrid");
    if (meg == 0) {
        var data = [];
        var GROUP_SPLIT = $("#GROUP_SPLIT").val();
        var RMS = "1";
        if(GROUP_SPLIT == "1")
         {
            RMS = "1";
         }
        else RMS = LastRowData.RMS;
        data = {
            RES_ID: LastRowData.RES_ID,
            RES_TYPE: LastRowData.RES_TYPE,
            RES_TYNM: LastRowData.RES_TYNM,
            ARRV: LastRowData.ARRV,
            ARRV_TM: LastRowData.ARRV_TM,
            ARRV_DAY: LastRowData.ARRV_DAY,
            NIGHTS: LastRowData.NIGHTS,
            DEPART: LastRowData.DEPART,
            DEPART_TM: LastRowData.DEPART_TM,
            DEPART_DAY: LastRowData.DEPART_DAY,
            RMS: RMS,
            ADLT: LastRowData.ADLT,
            CHLD: LastRowData.CHLD,
            CHLD1: LastRowData.CHLD1,
            CHLD2: LastRowData.CHLD2,
            ROOM: "",
            R_TY_ID: LastRowData.R_TY_ID,
            R_TY: LastRowData.R_TY,
            TARF: LastRowData.TARF,
            PLAN: LastRowData.PLAN,
            RES_STSID: LastRowData.RES_STSID,
            RES_STS: LastRowData.RES_STS,
            EDIT_STS: "0",
            SAVE_STS: "N",
            LOAD_STS: "0",
            RESNO: "",
            RNO: ""
        }
        grid.dataSource.add(data);
        grid.refresh();
    }
}

var ReservationAddRow = function () {
    var grid = $("#GrdReservation").data("kendoGrid");
    grid.addRow();
};

$("#CheckIN").click(function (e) {
    debugger;
    $("#pageProgressdiv").show();
    var CHRT = $("#CHRT").val();
    var meg = 2;
    var ID = "";
    var GUST_ID = "";

    var RESNO = $("#txtResno").val();
    var R_NO = $("#txtResId").val();
    var chk = false;
    var grid = $("#GrdGuest").data("kendoGrid");
    var datasource = grid.dataSource.data();
    for (var i = 0; i < datasource.length; i++) {
        var A_IND = grid.dataSource._data[i].A_IND;
        var CHECKVAL = grid.dataSource._data[i].CHECKVAL;
        if (A_IND == "" || A_IND == null || A_IND == undefined) {
            if (CHECKVAL == "1") {
                if (ID == "") ID = grid.dataSource._data[i].GUEST_SNO;
                else ID = ID + "," + grid.dataSource._data[i].GUEST_SNO;

                if (GUST_ID == "") GUST_ID = grid.dataSource._data[i].GUST_ID;
                else GUST_ID = GUST_ID + "," + grid.dataSource._data[i].GUST_ID;
                chk = true;
            }
        }
    }


    if (CHRT == "2") {
      
        if (RESNO != "" && RESNO != null && RESNO != undefined) {
            if (chk == true) {
                ReservationSaveMain(meg);
                CheckinProcess(RESNO, ID, GUST_ID);
            } else {
                $("#pageProgressdiv").hide();
                $("#AlertMessageHdn").val("Select atleast one Guest.");
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }
        } else {
            $("#pageProgressdiv").hide();
            $("#AlertMessageHdn").val(" Reservation No cannot be Empty.");
            $("#alertType").val('fail');
            AlertMesaage();
            return false;
        }
    }
    else if (CHRT == "3") {
        ReservationSaveMain(meg);
        var RESNO = $("#txtResno").val();
        var R_NO = $("#txtResId").val();
        if (RESNO != "" && RESNO != null && RESNO != undefined) {
            CheckinProcess(RESNO, ID, GUST_ID);
        }
    }
   $("#pageProgressdiv").hide();
});

var CheckinProcess = function (RESNO, ID, GUST_ID) {
    var dates = "";
    var dataparam = {};
    dataparam["COMPID"] = $("#divPropbox").val();
    dataparam["REQTYPE"] = "KIOSKGETRESDET";
    dataparam["RESNO"] = RESNO;
    var DataVal = JSON.stringify(dataparam);
    $("#pageProgressdiv").show();
    $.ajax({
        async: false,
        url: "/FO/CHECK_IN_API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        beforeSend: function () { $("#pageProgressdiv").show(); },
        success: function (response) {
            debugger;
            dates = JSON.parse(response);
            if (dates.ERRMSG != undefined) {
                $("#AlertMessageHdn").val(dates.ERRMSG);
                $("#alertType").val('fail');
                AlertMesaage();
                return false;
            }

            var RoomNo = dates.RESERVEDATAS[0].ROOMNO;
            var CurrDays = dates.DIFFCURDAYS[0].DIFFDATE;
            var AccDays = dates.DIFFACCDAYS[0].DIFFDATE;
            var mulresind = dates.MULRESIND;
            var GstDetails = dates.GSTDETAILS;

            var cc_ind = dates.CC_IND;
            var Datecomp = "";
            var Datecomp1 = "";

            // Request Parameters
            var ReqId = "KSK";
            var ResNo = dates.RESERVEDATAS[0].RESERVE_NO;
            var Chkpax = dates.RESERVEDATAS[0].CHECK_IN_PAX;
            var ChkRms = dates.RESERVEDATAS[0].CHECK_IN_RMS;
            var Adult = dates.RESERVEDATAS[0].ADULT;
            var Child = dates.RESERVEDATAS[0].CHILD;
            var Ch2 = dates.RESERVEDATAS[0].CH_2;
            var Ch3 = dates.RESERVEDATAS[0].CH_3;
            var RoomNo = dates.RESERVEDATAS[0].ROOMNO;
            var Room_Ty_Id = dates.RESERVEDATAS[0].ROOM_TY_ID;
            var Block_No = dates.RESERVEDATAS[0].BLOCK_SNO;
            var FrmDt = dates.RESERVEDATAS[0].ARR_DT;
            var ToDt = dates.RESERVEDATAS[0].DEP_DT;
            var vArrTm = dates.RESERVEDATAS[0].ARRIVAL_TM;
            var vDepTm = dates.RESERVEDATAS[0].DEPARTURE_TM;
            var GstId = GUST_ID;
            var Userid = "GUEST";
            var Rooms = dates.RESERVEDATAS[0].RESERVE_ROOMS;
            var Sharer = "N";
            var ShrGst = "N";
            var ResSts = dates.GUESTSTATUS;//RESERVE_STATUS
            var ReqFrm = "C";
            var SysNm = "KSK";
            var Dyn1 = dates.RESERVEDATAS[0].DYN1;
            var Dyn2 = dates.RESERVEDATAS[0].DYN2;
            if (ID == null || ID == undefined) ID = "";
            var Paxso = ID;
            var Reservestatus = dates.RESERVEDATAS[0].RESERVE_STATUS;
            if (CurrDays > 0)
                Datecomp = "10";
            else if (CurrDays > 0 && cc_ind == "0")
                Datecomp = "-10";
            else
                Datecomp = "11";

            if (cc_ind == "1" && Datecomp == "11") {
                if (AccDays == "0") {
                    Datecomp1 = "20";
                }
                else {
                    Datecomp1 = "21";
                }
            }
            if (Datecomp == "11" || Datecomp1 == "21") {
                if (Reservestatus == "5") {
                    Rooms = parseInt(dates.RESERVEDATAS[0].RESERVE_ROOMS) + parseInt(dates.RESERVEDATAS[0].CHECK_IN_RMS);
                    Adult = parseInt(dates.RESERVEDATAS[0].CHECK_IN_ADULT) + parseInt(dates.RESERVEDATAS[0].ADULT);
                    Chkpax = parseInt(dates.RESERVEDATAS[0].CHECK_IN_PAX) + parseInt(dates.RESERVEDATAS[0].PAX);
                    Child = parseInt((dates.RESERVEDATAS[0].PAX - dates.RESERVEDATAS[0].ADULT) + Ch2 + Ch3);
                }
                else {

                }
            }
            else {
                if (Datecomp == "10") {
                    $("#AlertMessageHdn").val("Arrival Date Greater then system Date.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                    return false;
                }
                else if (Datecomp == "-10") {
                    $("#AlertMessageHdn").val("Arrival Date Lesser then system Date.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                    return false;
                }
                else if (Datecomp1 == "20") {
                    $("#AlertMessageHdn").val("Arrival Date Greater then Account Date.");
                    $("#alertType").val('fail');
                    AlertMesaage();
                }
                return;
            }
            var SaveChkin = JSON.stringify({
                REQTYPE: 'KIOSKCHECKIN', COMPID: $("#divPropbox").val(), CMPID: $("#divPropbox").val(), REQID: ReqId, RESNO: ResNo, CHKPAX: Chkpax, ADULT: Adult, CHILD: Child, CHILD2: Ch2, CHILD3: Ch3,
                CHKRMS: ChkRms, ROOMNO: RoomNo, ROOMTYID: Room_Ty_Id, BLOCKNO: Block_No, FRMDT: FrmDt, TODT: ToDt, ARRTM: vArrTm, DEPTM: vDepTm, GSTID: GstId, USERID: Userid, ROOMS: Rooms, SHARER: Sharer,
                SHRGST: ShrGst, RESSTS: ResSts, REQFRM: ReqFrm, SYSNM: SysNm, DYN1: Dyn1, DYN2: Dyn2, PAXSNO: Paxso
            });
            $.ajax({
                // async: false,
                url: "/FO/CHECK_IN_API_CALL",
                type: 'POST',
                data: "request=" + SaveChkin,
                beforeSend: function () { $("#pageProgressdiv").show(); },
                success: function (response) {
                    debugger;
                    $("#pageProgressdiv").hide();
                    if (dates != "") {
                        dates = JSON.parse(response);
                    } else {

                    }
                    if (dates.ERRMSG != undefined && dates.ERRMSG != "") {
                        $("#AlertMessageHdn").val(dates.ERRMSG);
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                    else {
                        $("#ResEmailChk").hide();
                        var RegNo = dates.REGNO;
                        var GUID = $("#GUID").val();
                        localStorage.setItem("RMNO" + GUID, RoomNo);
                        localStorage.setItem("REGNO" + GUID, RegNo);
                        $("#AlertMessageHdn").val("Room No: " + RoomNo + " Checked In Successfully.");
                        SaveMesaageWindow();

                    }
                },
                complete: function () { $("#pageProgressdiv").hide(); }
            });
        },
        complete: function () { $("#pageProgressdiv").hide(); }
    });
};

