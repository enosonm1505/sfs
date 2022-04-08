$(function () {
    window.Tag = "M";
    $(".HdrBtnBx").on('click', 'button', function (e) {
      
        var $thid = this.dataset.button;
        var settings = pgindic;
        switch ($thid) {
            case "New":
                Tag = "M";
                PageSettngInit(settings);
                $("#BTN_TYPE").val("N");
                $("#TARIFF_LOAD_TYPE").val("N");
                $("#ResAdvanceDiv").hide();
                break;
            case "Amend":
                Tag = "A";
                PageSettngInit(settings);
                $("#resSerch").val("");
                $("#BTN_TYPE").val("A");
                $("#LASTDYADIV").hide();
                $("#ADDONARRDTDIV").hide();                
                debugger;              
                $("#TARIFF_LOAD_TYPE").val("A");
                $("#ResAdvanceDiv").hide();
                ResGridLoadfn("","","");
                document.getElementById("arraivaltoday").checked = false;
                break;
            case "Query":
                Tag = "Q";
                PageSettngInit(settings);
                $("#BTN_TYPE").val("Q");
                break;
            case "Relcanc":
                Tag = "I";
                PageSettngInit(settings);
                $("#BTN_TYPE").val("I");
                $("#TARIFF_LOAD_TYPE").val("A");
                $("#LASTDYADIV").show();
                $("#ADDONARRDTDIV").hide();    
                $("#ResAdvanceDiv").hide();
                $("#LastDaysVal").val("4");
                ResGridLoadfn("9", "4", "");
                document.getElementById("arraivaltoday").checked = false;
                $("#ResSerachty").val("1");
                var window = $("#ReservationSerachWindow");
                var kWnd = window.data("kendoWindow");
                kWnd.setOptions({
                    title: "<i class='fa fa-desktop fa-lg'></i>  Re-Instate Cancel",
                });
                kWnd.center().open();
                break;
            case "Relnoshow":
                Tag = "S";
                PageSettngInit(settings);
                $("#BTN_TYPE").val("S");
                $("#LASTDYADIV").show();
                $("#ADDONARRDTDIV").hide();    
                $("#TARIFF_LOAD_TYPE").val("A");
                $("#ResAdvanceDiv").hide();
                $("#LastDaysVal").val("4");
                ResGridLoadfn("8", "4", "");
                document.getElementById("arraivaltoday").checked = false;
                $("#ResSerachty").val("1");
                var window = $("#ReservationSerachWindow");
                var kWnd = window.data("kendoWindow");
                kWnd.setOptions({
                    title: "<i class='fa fa-desktop fa-lg'></i>  Re-Instate NoShow",
                });
                kWnd.center().open();
                break;
            case "Cancres":
                PageSettngInit(settings);
                Tag = "C";
                $("#BTN_TYPE").val("C");
                break;
            case "Addon":
                debugger;
                Tag = "O";
                PageSettngInit(settings);
                $("#BTN_TYPE").val("O");
                $("#LASTDYADIV").hide();
                $("#ADDONARRDTDIV").show();    
                $("#TARIFF_LOAD_TYPE").val("A");
                $("#ResAdvanceDiv").hide();
                var AddnDt = $("#AddOnArrDt").val();
                $("#AddonArrdate").data("kendoDatePicker").value(AddnDt);
                ResGridLoadfn("", "", "");
                document.getElementById("arraivaltoday").checked = false;
                $("#ResSerachty").val("1");
                var window = $("#ReservationSerachWindow");
                var kWnd = window.data("kendoWindow");
                kWnd.setOptions({
                    title: "<i class='fa fa-desktop fa-lg'></i>  Reservation/InHouse",
                });
                kWnd.center().open();

                break;
            default:
                break;
        }
        if ($thid != "Save" && $thid != "CheckIn" && $thid != "Cancres") {
            btnActiveSet($thid);
            ClearPageValues();
            DefaultReadyFn();
        }
        if ($thid == "Amend") {
            var CHRT = $("#CHRT").val().toString().trim();
            if (CHRT == "") {               
                $("#Cancres").show();
            }
            else if (CHRT == "2") {
                ResGridLoadfn("1", "", "");
                document.getElementById("arraivaltoday").checked = true;
                $("#Cancres").hide();
            }
            else $("#Cancres").hide();
                
            $("#ResSerachty").val("1");            
            var window = $("#ReservationSerachWindow");
            var kWnd = window.data("kendoWindow");
            kWnd.setOptions({
                title: "<i class='fa fa-desktop fa-lg'></i>  Reservation Search",
            });
            kWnd.center().open();
        }
        $("#loading").hide();
    });

    function  btnActiveSet($thid)
    {        
        $("#New").removeClass("btn-custom-active");
        $("#Amend").removeClass("btn-custom-active");
        $("#Query").removeClass("btn-custom-active");
        $("#Relcanc").removeClass("btn-custom-active");
        $("#Relnoshow").removeClass("btn-custom-active");
        $("#Cancres").removeClass("btn-custom-active");
        $("#Addon").removeClass("btn-custom-active");
        $("#ReservationSaveMain").removeClass("btn-custom-active");
        $("#ReservationSaveMain").removeClass("pagefalse");
        $("#" + $thid).addClass("btn-custom-active");
        if ($thid == "New" || $thid == "Amend" || $thid == "Relcanc" || $thid == "Relnoshow" || $thid == "Addon")
        {
            $(".themedess").removeClass("pagefalse");
        }
    }

    $("#btnCommunicator").on('click', function (e) {

    });
    function ClearPageValues()
    {
        $("#txtResno").val("");
        $("#txtResId").val("");
        $("#ddlgusetsts").data("kendoDropDownList").value("");
        $("#ddlsalpersn").data("kendoDropDownList").value("");
        $("#ddlguestyp").data("kendoDropDownList").value("");
        $("#ddlresmode").data("kendoDropDownList").value("");
        $("#ddlmarktseg").data("kendoDropDownList").value("");
        $("#ddlbillng").data("kendoDropDownList").value("");
        $("#ddlpayment").data("kendoDropDownList").value("");
        $("#ddlbussrc").data("kendoDropDownList").value("");
        $("#ddlchannl").data("kendoDropDownList").value("");
        $("#txtgustevnt").val("");
        $("#txtareaspl").val("");
        $("#txtareaguest").val("");
        $("#txtareachkin").val("");
        $("#txtareachkout").val("");
        $("#txttarfdiscperc").val("0.00");
        $("#txttarfdiscamnt").val("0.00");
        $("#txtnettrfamnt").val("0.00");      
         document.getElementById("chksharp").checked = false;
        $("#txtplanamnt").val("0.00");
        $("#txtchildamnt").val("0.00");
        $("#txtplandiscper").val("0.00");
        $("#txtplandiscamnt").val("0.00");
        $("#agent_id").val("");
        $("#txtagent").val("");
        $("#txtagentch").val("");
        $("#comp_id").val("");
        $("#txtcompany").val("");
        $("#group_id").val("");
        $("#txtgroup").val("");
        $("#BookerID").val("");
        $("#ddltitle").val("");
        $("#txtbooker").val("");
        $("#source_id").val("");
        $("#txtsource").val("");
        $("#ddlupgrade").data("kendoDropDownList").value("");
        $("#ddlvisitpur").data("kendoDropDownList").value("");
        $("#ddlguestcatg").data("kendoDropDownList").value("");
        document.getElementById("chkregcrd").checked = false;
        $("#txtvouch").val("");
        $("#txtref").val("");
        $("#txtareapos").val("");
        $("#GrdReservation").data("kendoGrid").dataSource.data([]);
        $("#GrdGuest").data("kendoGrid").dataSource.data([]);
        $("#PromtTariffEditGrid").data("kendoGrid").dataSource.data([]);
        $("#PromptPackageDeatilsSearch").data("kendoGrid").dataSource.data([]);

        $(".companylbl").removeClass('Narration_norm');
        $("#btninfocomp").css('background', ' #ffffff');
        $("#disclabl").removeClass('Narration_norm');
        $("#btnlog").removeClass("bgyellowcolor");
    }

    $("button[custom='prompt']").on('click', function (e) {
        debugger;
        var $this = $(this).attr("modal");
        $("#" + $this).modal("show");
        //alert("Ohhh Its Called" + $this);
    });

    /*Anchor Popup Funciton*/
    //$(".btn[href^=#]").click(function (e) {
    //   
    //    e.preventDefault();
    //    var href = $(this).attr('href');
    //    $(href).modal('toggle');
    //});
    /*End of Anchor Popup Funciton*/


    /*Promp Section Started*/
    $("div[id^='prompt']").on("click", "tbody > tr > td", function (e) {
        var _ModalPop = e.delegateTarget.ownerDocument.activeElement.id;
        var _grid_id = e.delegateTarget.id;
        var _grid_Datas = $("#" + _grid_id).data("kendoGrid");
        var selectedItem = _grid_Datas.dataItem(_grid_Datas.select());
        //console.log(selectedItem); console.log("Popup " + _ModalPop);
        $("#" + _ModalPop).modal('hide');
        //console.log(" Prompt :" + _grid_id);
        switch ($.trim(_grid_id)) {
            case "promptcompany":
                //console.log(selectedItem);
                if ($.trim(selectedItem.BLACK_LIST_IND) != "1") {
                    var COMPANYSelection = $("#COMPANYSelection").val();
                    if (COMPANYSelection == "1") {
                      var  _grid = $("#PromtTariffEditGrid").data("kendoGrid");
                      var no = _grid.selectable.userEvents.currentTarget.rowIndex;
                      _grid.dataSource._data[no].Company = $.trim(selectedItem.PARTY_NM);
                      _grid.dataSource._data[no].CompanyId = $.trim(selectedItem.PARTY_ID);
                      _grid.refresh();
                        $("#COMPANYSelection").val("");
                    }
                    else {
                        debugger;
                        if (selectedItem.GS_ID != "" && selectedItem.GS_ID != null) $("#ddlgusetsts").data("kendoDropDownList").value($.trim(selectedItem.GS_ID));
                        if (selectedItem.GT_ID != "" && selectedItem.GT_ID != null) $("#ddlguestyp").data("kendoDropDownList").value($.trim(selectedItem.GT_ID));
                        if (selectedItem.C_ID != "" && selectedItem.C_ID != null) $("#ddlmarktseg").data("kendoDropDownList").value($.trim(selectedItem.C_ID));
                        if (selectedItem.PM_ID != "" && selectedItem.PM_ID != null) $("#ddlpayment").data("kendoDropDownList").value($.trim(selectedItem.PM_ID));
                        if (selectedItem.RM_ID != "" && selectedItem.RM_ID != null) $("#ddlresmode").data("kendoDropDownList").value($.trim(selectedItem.RM_ID));
                        if (selectedItem.BI_ID != "" && selectedItem.BI_ID != null) $("#ddlbillng").data("kendoDropDownList").value($.trim(selectedItem.BI_ID));
                        if (selectedItem.D_ID != "" && selectedItem.D_ID != null) $("#ddlbussrc").data("kendoDropDownList").value($.trim(selectedItem.D_ID));
                     
                        $("#txtcompany").val($.trim(selectedItem.PARTY_NM));
                        $("#comp_id").val($.trim(selectedItem.PARTY_ID));
                        Company_load(selectedItem);
                        
                        Company_Tariff_Load(selectedItem.PARTY_ID);
                        //***********company besde discount********
                       // FO_PARTY_DISC_LOAD(selectedItem.PARTY_ID);
                    }
                } else {
                    $("#AlertMessageHdn").val(" ! Blocklists Company.");
                    $("#alertType").val('fail');
                    AlertMesaage();                  
                }
                break;

            case "prompttravelagnt":
                var AGENTSelection = $("#AGENTSelection").val();
                if (AGENTSelection == "1") {
                    var _grid = $("#PromtTariffEditGrid").data("kendoGrid");
                    var no = _grid.selectable.userEvents.currentTarget.rowIndex;
                    _grid.dataSource._data[no].TAgent = $.trim(selectedItem.TRV_AGENT_NM);
                    _grid.dataSource._data[no].TAgentId = $.trim(selectedItem.TRV_AGENT_ID);
                    _grid.refresh();
                    $("#AGENTSelection").val("");
                }
                else {
                    $("#txtagent").val($.trim(selectedItem.TRV_AGENT_NM));
                    $("#agent_id").val($.trim(selectedItem.TRV_AGENT_ID)); 
                    if (pgindic.J_IND == 1) {
                        $("#TrvBlockDiv").show();
                    }
                    else
                    {
                        $("#TrvBlockDiv").hide();
                    }                    
                }
                break;
            case "promptBook":
                $("#txtbooker").val(selectedItem.BK_NM);
                $("#BookerID").val(selectedItem.BK_ID);
                break;

            case "promptgroup":
                $("#txtgroup").val($.trim(selectedItem.GROUP_NM));
                $("#group_id").val($.trim(selectedItem.GROUP_ID));
                break;

            case "promptSource":
                $("#txtsource").val($.trim(selectedItem.PARTY_NM));
                $("#source_id").val($.trim(selectedItem.PARTY_ID));
                break;

            case "promptGrdRateType":
                $("#RateType").modal('hide');
                RateTariff(selectedItem);
                break;

            case "promptplan":
                PlanTariff(selectedItem);
                break;

            default:
                break;
        }

    });
    
    var FO_PARTY_DISC_LOAD = function (PARTY_ID) {       
        var dataparam = {};
        dataparam["COMPID"] = $("#divPropbox").val();
        dataparam["REQTYPE"] = "FO_PARTY_DISC";
        dataparam["PARTY_ID"] = PARTY_ID;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/FO/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (data) {
                debugger;
                var party_Percen = ""
                if (data != "" && data != null) party_Percen = JSON.parse(data);             
                if (party_Percen != null && party_Percen != undefined && party_Percen != "") {
                    $("#PartyDiscPerDiv").show();
                    $("#txtAllowDiscPerce").val(party_Percen);
                }
                else
                {
                    $("#PartyDiscPerDiv").hide();
                    $("#txtAllowDiscPerce").val(0);
                }
            }
        });
    };
    
    var Company_Tariff_Load = function (PARTY_ID) {
        debugger;
        _grid = $("#GrdReservation").data("kendoGrid");
        _Selectedgrid = _grid.dataItem(_grid.select());
        var RM_TY = "";
        if ($("#TariffChange")[0].checked == true) {
            RM_TY = $("#ddlupgrade").data("kendoDropDownList").value();
        }
        else {
            RM_TY = _Selectedgrid.RES_TYPE;
        }
        console.log(pgindic);
        var Grid_Data;
        var obj = {};
        var dataparam = JSON.parse(Request);
        dataparam["COMPID"] = Prop_Id;
        dataparam["REQTYPE"] = "RATE_TYPE";
        dataparam["CURRENCY_ID"] = pgindic.BASE_CURRENCY_ID;
        dataparam["ROOM_TYPE"] = RM_TY;
        dataparam["TO_DT"] = _Selectedgrid.ARRV;
        dataparam["RATE_TY_ID"] = "";
        dataparam["PARTY_ID"] = PARTY_ID;
        dataparam["RATE_LOADID"] = "1";
        obj.request = dataparam;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            url: "/FO/API_CALL",
            type: 'POST',
            datatype: 'json',
            data: "request=" + DataVal,
            success: function (data) {
                Grid_Data = JSON.parse(data);
                var $grid = $("#promptGrdRateType").data("kendoGrid");
                $grid.dataSource.data(Grid_Data.RATE_TARIFF);
                $grid.dataSource.filter([]);
                $grid.refresh();              
                $("#RATETYSelection").val("1")
                var dataVal = $grid.dataSource._data[0];
                RateTariff(dataVal);
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
            }
        });
        return Grid_Data;
    };
       
    var Company_load = function (data) {
        $this_propm = $("#btninfocomp");
        var style_elemt = "<div class='panel panel-default'> <div class='panel-heading'> <i class='fa fa-address-card'></i> Company Contact Information </div><div class='panel-body'>"; //Panel Heading
        style_elemt += "<div class='col-lg-12 col-md-12' style='background: linear-gradient(330deg, #7cc0d3, #3F51B5);  border-radius: 10px; padding:0px; color: white'><div class='col-lg-10 col-md-10' style='font-weight:bold;'><i class='fa fa-adn'></i> Address :</div><div class='col-lg-12 col-md-12' style='margin-left:22px;'></br> " + data.ADDRS_1 + " </br> " + data.ADDRS_2 + "  </br> " + data.ADDRS_3 + "  </div></div>" //Address Element
        //style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-4 col-md-4' style='padding:2px; margin-top: 2px; background: #ecca62; border-radius: 8px; text-align: center;'><div class='col-lg-12 col-md-12'> Place </div><div class='col-lg-12 col-md-12'> <i class='fa fa-bus fa-3x'></i></div><div class='col-lg-12 col-md-12'> Karaikudi </div></div>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-12 col-md-12'  style='margin: 2px; background: linear-gradient(280deg, #f1f1da, #2196F3); border-radius: 8px 0px 0px 8px;'><i class='fa fa-bus'></i> City : " + data.PLACE + " </div></div>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-12 col-md-12'  style='margin: 2px; background: linear-gradient(280deg, #f1f1da, #8BC34A); border-radius: 8px 0px 0px 8px;'><i class='fa fa-envelope-o'></i> PinCode : " + data.POSTAL_CODE + "  </div></div>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-12 col-md-12'  style='margin: 2px; background: linear-gradient(280deg, #f1f1da, #FF9800); border-radius: 8px 0px 0px 8px;'><i class='fa fa-mobile fa-lg'></i> PhoneNo : " + data.PHONE_NO + "   </div></div>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-12 col-md-12'  style='margin: 2px; background: linear-gradient(280deg, #f1f1da, #9E9E9E); border-radius: 8px 0px 0px 8px;'><i class='fa fa-fax'></i> Fax No : " + data.FAX_NO + "   </div></div>";
        style_elemt += "<div class='col-lg-12 col-md-12' style='padding:0px;'><div class='col-lg-12 col-md-12'  style='margin: 2px; background: linear-gradient(280deg, #f1f1da, #e2b2a0); border-radius: 8px 0px 0px 8px;'><i class='fa fa-institution (alias)'></i> GSTIN No : " + data.TAX_NO + "   </div></div>";
        style_elemt += "</div>"; //Second Tab
        $(".companylbl").removeClass('Narration_norm');
       
        if ($.trim(data.BLACK_LIST_REM) != "") {
            style_elemt += "<div class='col-lg-12 col-md-12'><div class='col-lg-8 col-md-8 '> <a href='#ModalComp_Narration' data-toggle='modal' data-target='#ModalComp_Narration' class='btn btn-danger Narration' style='color: white;'><i class='fa fa-comment'></i>Narration!</a></div></div>";
            $(".companylbl").addClass('Narration_norm');
            $("#txtareanarra").val(data.BLACK_LIST_REM);
        }
        else {
            $("#txtareanarra").val("");
        }
        style_elemt += "</div></div>"; //Panel End
        //var style_elemt = "<b><i class='fa fa-address-card'></i> Address Info </b>";
        $this_propm.css('background', ' #FFEB3B');
        $this_propm["0"].dataset.content = style_elemt;
        // var style_elemt = 'style="padding:0px; top:2px;" data-container="body" data-toggle="popover" data-placement="right" data-original-title="" title=""  data-content="Optional Tariff Amount Set info:<br /><button class="btn btn-warning"> Read More... </button>">';
        // $this_prompt.html(style_elemt);
    }

    $(".companylbl").dblclick(function (e) {

        var txtareanarra = $("#txtareanarra").val();
        if (txtareanarra != "") {
            $("#ModalComp_Narration").modal('show');
        }
       
    });

    var PlanTariff = function (data) {
        var PLANSelection = $("#PLANSelection").val();
        if (PLANSelection == "1") {
            var _grid = $("#PromtTariffEditGrid").data("kendoGrid");
            var no = _grid.selectable.userEvents.currentTarget.rowIndex;
            _grid.dataSource._data[no].Plan = $.trim(data.PLAN_ID);
            _grid.refresh();
            $("#PLANSelection").val("");
            var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + no + ')');
            $("#GrdReservation").data("kendoGrid").select(roww);
        }
        else {
            var _grid = $("#GrdReservation").data("kendoGrid");
            var selectedItem = _grid.dataItem(_grid.select());
            var rowindx = _grid.select()[0].rowIndex;
            selectedItem.PLAN = $.trim(data.PLAN_ID);
            $("#txtplanamnt").val(Comma(Number(Math.abs($.trim(data.ADULT_PLAN)).toFixed(2))));
            $("#txtchildamnt").val(Comma(Number(Math.abs($.trim(data.CHILD_PLAN)).toFixed(2))));
            _grid.refresh();
            var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + rowindx + ')');
            $("#GrdReservation").data("kendoGrid").select(roww);
        }
    };


    var RateTariff = function (dataVal) {
        var RATETYSelection = $("#RATETYSelection").val();
        if (RATETYSelection == "1") {

            var _grid = $("#GrdReservation").data("kendoGrid");
            var RATE_LOADID = $("#RATE_LOADID").val();
            var selectedItem = _grid.dataItem(_grid.select());
            var no = _grid.selectable.userEvents.currentTarget.rowIndex;
            var RES_TYPE = $.trim(dataVal.RES_TYPE);
            selectedItem.R_TY_ID = $.trim(dataVal.RATE_TY_ID);
            selectedItem.R_TY = $.trim(dataVal.RATE_TY_NM);
            selectedItem.PK_ID = $.trim(dataVal.PK_ID);
            selectedItem.MK_ID = $.trim(dataVal.MK_ID);
            if (selectedItem.MK_ID != "" && selectedItem.MK_ID != null)
            {
                $("#ddlmarktseg").data("kendoDropDownList").value(selectedItem.MK_ID);
            }
            var PLAN = "";
            if (dataVal.PLAN_ID != "" && dataVal.PLAN_ID != null) {
                selectedItem.PLAN = $.trim(dataVal.PLAN_ID);
                PLAN = $.trim(dataVal.PLAN_ID);
            }
            else {
                selectedItem.PLAN = $.trim(pgindic.DEF_PLAN_ID);
                PLAN = $.trim(pgindic.DEF_PLAN_ID);
            }
            if (RATE_LOADID == "1") {
                selectedItem.RATE_CLASS_TYPE = "C";
            }
            $("#PK_ID").val($.trim(dataVal.PK_ID));
            _grid.refresh();
          
            var GUID = $("#GUID").val();
            var getindex = localStorage.getItem("RowIndex" + no + GUID);
            if (getindex != null) {
                localStorage.removeItem("PromtTariffEditGrid" + no + GUID);
            }
            //package Grid Clear code
            var PromptPackageDeatilsSearch = $("#PromptPackageDeatilsSearch").data("kendoGrid");
            if (PromptPackageDeatilsSearch != "" && PromptPackageDeatilsSearch != null && PromptPackageDeatilsSearch != undefined) {
                $("#PromptPackageDeatilsSearch").data("kendoGrid").dataSource.data([]);
            }
            $("#txttarfdiscperc").val("0.00");
            $("#txttarfdiscamnt").val("0.00");
            $("#txtnettrfamnt").val("0.00");
            $("#txtplanamnt").val(Comma(Number(Math.abs($.trim(dataVal.PLAN_AMT)).toFixed(2))));
            $("#txtchildamnt").val(Comma(Number(Math.abs($.trim(dataVal.TAR_FIVE)).toFixed(2))));
            $("#txtplandiscper").val("0.00");
            $("#txtplandiscamnt").val("0.00");
            var CURID = $("#ddlcurrency").data("kendoDropDownList").value();
            $("#BaseCurr").text(CURID);
            $("#RES_CURRENCY").val(CURID);
          
            if (PLAN != "" && PLAN != null)
            {
                GET_Plan_Amount(PLAN, CURID);
            }
            debugger;
            //TotalTariffValUpgrade(RES_TYPE);
             TotalTariffVal();
            var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + no + ')');
            $("#GrdReservation").data("kendoGrid").select(roww);
        }
        else if (RATETYSelection == "2") {
            var _grid = $("#prompRoomShiftGrid").data("kendoGrid");
            var selectedItem = _grid.dataItem(_grid.select());
            selectedItem.R_TY_ID = $.trim(dataVal.RATE_TY_ID);
            selectedItem.R_TY = $.trim(dataVal.RATE_TY_NM);
            _grid.refresh();
            var rowindx = _grid.select()[0].rowIndex;
            var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + rowindx + ')');
            $("#GrdReservation").data("kendoGrid").select(roww);
        }
        else if (RATETYSelection == "3") {
            var _grid = $("#PromtTariffEditGrid").data("kendoGrid");
            var selectedItem = _grid.dataItem(_grid.select());
            selectedItem.R_TY_ID = $.trim(dataVal.RATE_TY_ID);
            selectedItem.R_TY = $.trim(dataVal.RATE_TY_NM);
            _grid.refresh();
            var rowindx = _grid.select()[0].rowIndex;
            var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + rowindx + ')');
            $("#GrdReservation").data("kendoGrid").select(roww);
        }
    }
});

var GET_Plan_Amount = function (PLAN_ID, CURID)
{   
    var dataparam = {};
    dataparam["COMPID"] = $("#divPropbox").val();
    dataparam["REQTYPE"] = "GET_Plan_Amount";   
    dataparam["PLAN_ID"] = PLAN_ID;
    dataparam["CURID"] = CURID;   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FO/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            debugger;
            var DataJson = JSON.parse(data);
            if (DataJson[0] != null && DataJson[0] != undefined) {
                $("#txtplanamnt").val(Comma(Number(Math.abs($.trim(DataJson[0].SINGLE_PLAN))).toFixed(2)));
                $("#txtchildamnt").val(Comma(Number(Math.abs($.trim(DataJson[0].PL_C))).toFixed(2)));
            }
        }
    });
}

function Comma(Num) { //function to add commas to textboxes  
    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

window.ArrvalDt = "";
var PageSettngInit = function (setting) { 
    var FloatButton = $(".float-sm");
    var toppx = 255;
    setRouting(FloatButton, toppx, setting);
    if (setting.W3_IND != 1) {
        $("#AlertMessageHdn").val(" Group Settings Not Done.");
        $("#alertType").val('fail');
        AlertMesaage();      
        //$("#divTheme").addClass("pagefalse");
        //$(".float-sm").addClass("pagefalse");
    }

    if(setting.CC_IND == 1)
    {
        /*Get Account_Dt & Audi_Ind*/
        if (setting.AUDIT_IND == 1) {
        //    'If night audit in progress add 1 day with CUR_DT and return
        //    ''fnErrorHandler "Night Audit in Progress.", wsInformation, , , True
            ArrvalDt = setting.DEFAULT_DT;
        }
        else {
            //Return CUR_DT as Arrival_date and 23:59 as Arr_Tm
            ArrvalDt = setting.CUR_DT;
        }
    }
   /// console.log(Date(setting.DEFAULT_DT));
}

function Jsondate(s) {
    return new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1]));
}

function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
    //return [date.getFullYear(), mnth, day].join("-");
}


var setRouting = function (FloatButton, toppx, setting) {
   
    if (setting.TARIFF_EDIT_IND == 0) $('.float-tariff').css("display", "none");
    if (setting.F1_IND == 0) $('.float-pack').css("display", "none");
    if (setting.NN_IND == 0) $('.float-route').css("display", "none");
    if (setting.I10_IND == 0) $('.float-auto').css("display", "none");
    if (setting.SP_ITEM_IND == 0) $('.float-amenit').css("display", "none");
    if (setting.F6_IND == 0) $('.float-RoomShift').css("display", "none");
    if (setting.C10_IND == 0) $('.float-promo').css("display", "none");
    $('.float-other').css("display", "none");
    
    if (setting.NN_IND == 2) {
        if (Tag == "A" || Tag == "N" || Tag == "S" || Tag == "I" || Tag == "L") {
            $('.float-route').css("display", "block");
        }
        else if (Tag == "M" || Tag == "O")
            $('.float-route').css("display", "block");
    }
  
    
    $("#btnCommunicator").hide();
    if (Tag == "A" || Tag == "N" || Tag == "S" || Tag == "I" || Tag == "Q" || Tag == "L")
    {
        if (setting.MAIL_APPL_IND == 2) {
            // $("#btnCommunicator").show();
        }
    }
    
    $.each(FloatButton["0"].children, function (key, value) {     
        var display = value.style.display;
        if (display != "none") {
            $(this).css("top", toppx + "px");
            toppx += 35;
        }
    });
}

