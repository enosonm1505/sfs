
function fnLoadMstCompany() {

    var rowData = fnMstCompany();

    if (rowData.length > 0) {
        $("#hdnGstNmInd").val(rowData[0].GstNm_Ind);
        $("#hdnBaseCurId").val(rowData[0].BASE_CURRENCY_ID);
        $("#hdnCountryId").val(rowData[0].COUNTRY_ID);

        $("#hdnInGstInd").val(rowData[0].IN_GST_IND);
        $("#hdnKTaxInd").val(rowData[0].K_TAX);
        $("#hdnMTaxInd").val(rowData[0].M_TAX);
    }
}

function fnLoadBNControl() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnSpAppl").val(rowData[0].H2_IND);
                $("#hdnChAppl").val(rowData[0].I2_IND);
                $("#hdnBkrAppl").val(rowData[0].J2_IND);
                $("#hdnLoudMusAppl").val(rowData[0].L1_IND);
                $("#hdnComisnAppl").val(rowData[0].K1_IND);
                $("#hdnStageAppl").val(rowData[0].X3_IND);
                $("#hdnBrshiftAppl").val(rowData[0].Z1_IND);
                $("#hdnbsman").val(rowData[0].Z2_IND);
                $("#hdnspman").val(rowData[0].Y2_IND);
                $("#hdnFornCurAppl").val(rowData[0].P_IND);
                $("#hdnTaxIncAppl").val(rowData[0].K2_IND);
                $("#hdnTaxInclusiveAppl").val(rowData[0].I3_IND);
                $("#hdnMultiPln").val(rowData[0].O_IND);
                $("#hdnFoodPrep").val(rowData[0].N_IND);
                $("#hdnPlnItem").val(rowData[0].M1_IND);
                $("#hdnPlnAvail").val(rowData[0].J1_IND);
                $("#hdnMgrpAppl").val(rowData[0].S2_IND);
                $("#hdnG4Ind").val(rowData[0].G4_IND);
                $("#hdnMAdd").val(rowData[0].T2_IND);
                $("#hdnA3Ind").val(rowData[0].A3_IND);
                $("#hdnL3Ind").val(rowData[0].L3_IND);
                $("#hdnL3Ind").val(rowData[0].L3_IND);
                $("#hdnH4_Ind").val(rowData[0].L3_IND);
                
            }
        },
    });
}

function fnAccountDt() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_CURRENTDT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
            }
        },
    });
}

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        fnRemoveClass();
        fnClearData();
    })
}

function fnRemoveClass() {
    $("#btnNew").removeClass("ClickBtn");
    $("#btnOpen").removeClass("ClickBtn");
    $("#btnSave").removeClass("ClickBtn");
    $("#btnRef").removeClass("ClickBtn");

    $('#btnNew').prop('disabled', false);
    $('#btnOpen').prop('disabled', false);
    $('#btnSave').prop('disabled', true);
}

//------------------- Remove Data From Array--------------------

function fnRemoveArry(DataSet, ColName, FilterVal) {
    var i = DataSet.length;
    while (i--) {
        if (DataSet[i]
            && DataSet[i].hasOwnProperty(ColName)
            && (arguments.length > 2 && DataSet[i][ColName] == FilterVal)) {

            DataSet.splice(i, 1);

        }
    }
    return DataSet;
}
//--------------------------------------------------------------

function fnCreateDefGridRows() {

    fnVenueRowAdd('0');
    fnDepartRowAdd('0');
    fnFBRowAdd('0');
    fnMenuRowAdd('0');
    fnMOtherRowAdd('0');
    fnMItemRowAdd('0');
}

//------------------------------------------------------------------

//++++++++++++++++++++++++++++++++++++ Grid Rows Add ++++++++++++++++++++++++++++++++++++

function fnVenueRowAdd(option) {

    var grdVenue = $$("grdVenue").serialize();

    var Venlen = grdVenue.length;

    var vDate1 = ""; var vRowId = 0;

    if (grdVenue.length != 0) {

        var getval = $$("grdVenue").getItem($$("grdVenue").getFirstId());
        vDate1 = getval.vDate;

        vRowId = grdVenue[grdVenue.length - 1].RowId + 1;
    }

    var addrow = {
        RowId: vRowId, vDate: vDate1, vSessionId: '', vVenueId: '', vVenueNm: '', vStm: '', vEtm: '', vChkmain: '', vChklink: '',
        vnExtTm: '', vChkHold: '', vHoldRes: '', vSeatId: '', vODLocID: '', vF_NO: '', vD_NO: '',
        vF_ind: '', vf_sno: '', vsnsTm: '', vsnEtm: '', vPgStm: '', vpgEtm: '', vEventNm: '', vMvid: '',
    };

    if ($.trim(option) == "0") {
        if (Venlen == 0)
            $$("grdVenue").add(addrow);
    }
    else if ($.trim(option) == "1") {

        if (Venlen != 0) {

            for (i = 0; i < Venlen; i++) {

                if (grdVenue[i].vDate == "") {
                    AlertMessage("Date Cannot be empty");
                    return false;
                }
                if (grdVenue[i].vSessionId == "") {
                    AlertMessage("Session Cannot be Exits");
                    return false;
                }

                if (grdVenue[i].vVenueId == "") {
                    AlertMessage("Venue Cannot be Exits");
                    return false;
                }
            }
            $$("grdVenue").add(addrow);
        }
        else if (Venlen == 0)

            $$("grdVenue").add(addrow);
    }
    

    $$("grdVenue").refresh();
}

function fnDepartRowAdd(option) {
    var dtDepart = $$("grdDepart").serialize();

    var addrow = {
        DRowId: '', Departid: '',AidsId:'', AidsNm: '', Qty: '', Narration: '', AidsId: '', DepartNm: '', hdnSessionId: '', 
    };

    if ($.trim(option) == "0") {
        $$("grdDepart").clearAll();
        $$("grdDepart").refresh();
        $$("grdDepart").add(addrow);
    }
    else if ($.trim(option) == "1") {

        if (dtDepart.length != 0) {
            for (i = 0; i < dtDepart.length; i++) {

                if (dtDepart[i].Departid == "") {
                    AlertMessage("Department Cannot be empty");
                    return false;
                }

                if (dtDepart[i].AidsId == "") {
                    AlertMessage("Aids Cannot be empty");
                    return false;
                }
            }
            $$("grdDepart").add(addrow);
        }
        else {
            $$("grdDepart").add(addrow);
        }
    }

    $$("grdDepart").refresh();
}

function fnFBRowAdd(option) {

    var dtFB = $$("grdFB").serialize();

    var addrow = {
        vFBDate: '', vSessionid: '', nVenueNm: '', vPlanId: '', hdnPlnPkgId: '', vFBRate: '', vExpPax: '', vActPax: '',
        VenueCap: '', vFdPTm: '', vServerTm: '', ChkMT: '0', MTTime: '', ChkAT: '0', ATTime: '', vVenRate: '',
        chkTaxInd: '0', vTaxAmt: '', ChkVentaxInd: '0', vVentaxAmt: '', hdnvDSV: '', hdnVenueId: '', hdnfbkids: '', hdndriver: '',
        hdnPkgNm: '', FRowId: '',
    };

    if ($.trim(option) == "0") {
        $$("grdFB").clearAll();
        $$("grdFB").refresh();
        $$("grdFB").add(addrow);
    }
    else if ($.trim(option) == "1") {

        if (dtFB.length != 0) {

            for (i = 0; i < dtFB.length; i++) {
                if (dtFB[i].vSessionid == "") {
                    AlertMessage("Session Cannot be empty");
                    return false;
                }
                if (dtFB[i].hdnVenueId == "") {
                    AlertMessage("Venue Cannot be empty");
                    return false;
                }
                if (dtFB[i].vFBRate == "") {
                    AlertMessage("Rate Cannot be empty");
                    return false;
                }

                var vActPax1 = ($.trim(dtFB[i].vActPax) == "" ? 0 : parseInt(dtFB[i].vActPax));

                var vExpPax1 = ($.trim(dtFB[i].vExpPax) == "" ? 0 : parseInt(dtFB[i].vExpPax));

                if (vActPax1 == 0 && dtFB[i].hdnPlnPkgId != "") {
                    AlertMessage("Guaranteed Pax Cannot be empty");
                    return false;
                }
                else if (vActPax1 == 0 && dtFB[i].hdnPlnPkgId != "") {
                    AlertMessage("Please enter Guaranteed Pax");
                    return false;
                }

                if (vExpPax1 == 0 && dtFB[i].hdnPlnPkgId != "") {
                    AlertMessage("Expected Pax Cannot be empty");
                    return false;
                }
                else if (vExpPax1 == 0 && dtFB[i].hdnPlnPkgId != "") {
                    AlertMessage("Please enter Expected Pax");
                    return false;
                }
                if (parseInt(vExpPax1) < parseInt(vActPax1) && dtFB[i].hdnPlnPkgId != "") {
                    AlertMessage("Expected Pax should be Greater or equal to Guaranteed Pax");
                    return false;
                }
            }
            $$("grdFB").add(addrow);
        }
        else {
            $$("grdFB").add(addrow);
        }
    }

    $$("grdFB").refresh();
}

function fnMenuRowAdd(option) {

    var data = $$("grdMenu").serialize();

    var lenval = data.length;

    var addrow = {
        MFBDate: '', MSessionid: '', MVenueNm: '', hdnVenueId: '', hdnPlanId: '', hdnPlanNM: '', MRowId: ''
        //hdnPkg: '', 
    };

    if ($.trim(option) == "0") {
        if (lenval == 0)
            $$("grdMenu").add(addrow);
    }
    else if ($.trim(option) == "1") {
        if (lenval != 0) {
            for (i = 0; i < lenval; i++) {

                if (data[i].hdnVenueId == "") {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Venue Cannot be empty");
                    return false;
                }

                if (data[i].MSessionid == "") {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Session Cannot be empty");
                    return false;
                }
                if (data[i].MFBDate == "") {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Date Cannot be empty");
                    return false;
                }
            }
            $$("grdMenu").add(addrow);
        }
        else if (lenval == 0) {
            $$("grdMenu").add(addrow);
        }
    }

    $$("grdMenu").refresh();
}

function fnMItemRowAdd(option) {

    var dtItem = $$("grdItem").serialize();

    var StoreData = {
        MItemNM: '', MMenuQty: '', MMenuNarr: '', MMenuSeqNo: '', MPlanNm: '', hdnIItemId: '', hdnIVenId: '', hdnmSessId: '', hdnIPlnId: '', MRowId: '',
    };

    if ($.trim(option) == "0") {
        if (dtItem.length == 0)
            $$("grdItem").add(StoreData);
    }
    else if ($.trim(option) == "1") {
        if (dtItem.length != 0) {

            for (i = 0; i < dtItem.length; i++) {
                if (dtItem[i].MItemNM == "") {
                    AlertMessage("Item Cannot be empty");
                    return false;
                }
            }

            $$("grdItem").add(StoreData);
        }
        else if (dtItem.length == 0)
            $$("grdItem").add(StoreData);
    }

    $$("grdItem").refresh();
}

function fnMOtherRowAdd(option) {

    var dtOthers = $$("grdOthers").serialize();

    var addrow = {
        hdnIItemId: '', OTyId: '', MItemNM: '', MMenuQty: '', Rate: '', Disc: '', DiscAmt: '', SaleRate: '', hdnIVenId: '', hdnISessId: '', hdnIPlnId: '',
    };

    if ($.trim(option) == "0") {
        if (dtOthers.length == 0)
            $$("grdOthers").add(addrow);
    }
    else if ($.trim(option) == "1") {
        if (dtOthers.length != 0) {
            for (i = 0; i < dtOthers.length; i++) {
                if (dtOthers[i].OTyId == "") {
                    AlertMessage("Item Type Cannot be empty");
                    return false;
                }

                if (dtOthers[i].MItemNM == "") {
                    AlertMessage("Item Cannot be empty");
                    return false;
                }
            }
            $$("grdOthers").add(addrow);
        }
        else if (dtOthers.length == 0)
            $$("grdOthers").add(addrow);
    }

    $$("grdOthers").refresh();
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//===================================== Open Mode =====================================

function fnCallReservationPop(PopTy) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopReserveSrch",
        head: ($.trim(PopTy)=="RESV"?"Reservation Search":"W.L Search"),
        position: "center",
        minWidth: 1050,
        maxWidth: 1050,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 600,

        body: {
            view: 'form',
            minWidth: 1050,
            maxWidth: 1050,
            elements: [
                {
                    view: "datatable",
                    id: "grdResvSrch",
                    select: "row",
                    data: [],
                    height: 450,
                    scroll: "y",
                    columns: [
                            { header: ["Reserve#", { content: "textFilter" }, ], id: "RsvNo", width: 100, css: { 'text-align': 'Center ! important' }, sort: "int", },
                            { header: "Type", id: "GuestTy", width: 80, css: { 'text-align': 'left ! important' } },
                            { header: ["Guest Name", { content: "textFilter" }], id: "GuestNm", width: 300, css: { 'text-align': 'left ! important' } },
                            { header: "Pax", id: "Gpax", width: 69, css: { 'text-align': 'Center ! important' } },
                            { header: "Function", id: "Function", width: 140, css: { 'text-align': 'left ! important' } },
                            { header: "Start Dt", id: "startDt", width: 85, css: { 'text-align': 'left ! important' } },
                            { header: "End Dt", id: "EndDt", width: 85, css: { 'text-align': 'left ! important' } },
                            { header: "Venue", id: "venueNM", width: 170, css: { 'text-align': 'left ! important' } },
                    ],
                    ready: function () {
                        this.sort("RsvNo", "asc");
                        this.markSorting("RsvNo", "asc");
                    },
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();
                            var selectedRows = this.getSelectedItem(id.row);
                            fnClearData();

                            if ($.trim(PopTy) == "RESV") {

                                $$("txtResvNo").setValue(selectedRows[0].RsvNo);
                                fnDefaultResLoad();
                                fnDefaultVenue();
                                fnShowBQReserve(selectedRows[0].RsvNo);
                                $$('PopReserveSrch').hide();
                            }
                            else {
                                $("#hdnBlkSrchTag").val(selectedRows[0].RsvNo);
                                fnPopupStatus(selectedRows[0].RsvNo);
                                
                            }

                            $("#LoadDIv").hide();
                        },
                        'onKeyPress': function (e, id) {
                            if (e == 27) {
                                $$('PopReserveSrch').hide();
                            }
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 1050,
                             paddingX: 950,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopReserveSrch').hide();
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

    fnLoadResvDet(PopTy);
    $$("PopReserveSrch").show();
}

function fnLoadResvDet(PopTy) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQRESERVSRCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["SrchTy"] = PopTy;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdResvSrch").clearAll();
                $$("grdResvSrch").parse(rowData);
                $$("grdResvSrch").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnShowBQReserve(ReserveNo) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQRESVOPEN";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["ReserveNo"] = ReserveNo;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {

                var Filter = JSON.parse(d);


                var SelResData = Filter.TBLBNRES;

                var SelVenData = Filter.TBLVENUEPOS;

                var SelVenDepart = Filter.TBLDEPART;

                var selFB = Filter.TBLFB;

                var selDepart = Filter.TBLDEPART;

                var SetMenu1 = Filter.TBLMENU1;

                var SetMenu2 = Filter.TBLMENU;

                var SetMenu3 = Filter.TBLMPLAN2;

                var ChkAmend = Filter.STRCHKAMD;

                $("#cmbTitleTag").val($.trim(SelResData[0].GS_ID));

                $("#hdnGstId").val($.trim(SelResData[0].GUEST_ID));

                $$("ddlGuestTy").setValue($.trim(SelResData[0].GUEST_TYPE));

                $$("ddlTit").setValue($.trim($.trim(SelResData[0].GS_TI)));

                if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {
                    $$("txtFirstNm").show();
                    $$("txtGstName").define("width", 200);
                    $$("txtGstName").define("inputWidth", 200);
                    $$("txtGstName").resize();
                }
                else {
                    $$("txtFirstNm").hide();
                    $$("txtGstName").define("width", 350);
                    $$("txtGstName").define("inputWidth", 350);
                    $$("txtGstName").resize();
                }

                if ($.trim(SelResData[0].GUEST_TYPE) == "C") {
                    $$("txtHostBy").show();
                    $$("txtFirstNm").hide();
                    $$("txtGstName").define("width", 350);
                    $$("txtGstName").define("inputWidth", 350);
                    $$("txtGstName").resize();
                    $$("ddlTit").hide();
                }
                else {

                    $("#cmbTitleTag").val($.trim(SelResData[0].GUEST_ID));
                    $$("ddlTit").show();
                }

                $$("txtGstName").setValue(SelResData[0].GUEST_NM);

                if ($.trim(SelResData[0].GUEST_TYPE) != "C") {

                    if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {

                        if ($.trim(SelResData[0].GS_NM2) != "")
                            $$("txtGstName").setValue(SelResData[0].GS_NM2);

                        if ($.trim(SelResData[0].GS_NM1) != "")
                            $$("txtFirstNm").setValue(SelResData[0].GS_NM1);
                    }
                }

                $$("txtHostBy").setValue(SelResData[0].HS_B);

                $$("txtFrmDate").setValue(SelResData[0].FROMDT1);

                $$("txtToDt").setValue(SelResData[0].TODT1);
                $$("ddlFunTy").setValue($.trim(SelResData[0].FUNCTION_ID));

                $$("ddlMarkSeg").setValue($.trim(SelResData[0].MARKET_ID));

                $$("ddlBusSrc").setValue($.trim(SelResData[0].BUSINESS_ID));

                $$("ddlSetMode").setValue($.trim(SelResData[0].SETL_ID));

                if (SelResData[0].BL_ID != null)
                    $$("ddlBillInst").setValue($.trim(SelResData[0].BL_ID));

                if (SelResData[0].A_ID != null)
                    $$("ddlChannel").setValue($.trim(SelResData[0].A_ID));

                if (SelResData[0].C_ID != null)
                    $$("ddlSalesPer").setValue($.trim(SelResData[0].C_ID));

                //$$("txtBooker").setValue(SelResData[0].Guest_Nm)();
                //debugger;
                if (SelResData[0].DEPOSIT_AMT != null)
                {
                    var DepAmt = ($.trim(SelResData[0].DEPOSIT_AMT) == "" ? 0 : parseFloat($.trim(SelResData[0].DEPOSIT_AMT)));

                    $$("lblAdvAmt").show();
                    $$("txtAdvAmt").show();
                    $$("txtAdvAmt").setValue(DepAmt.toFixed(2));
                }

                if (SelResData[0].DEP_ADV_AMT != null) {
                    var DepAmt = ($.trim(SelResData[0].DEP_ADV_AMT) == "" ? 0 : parseFloat($.trim(SelResData[0].DEP_ADV_AMT)));

                    $$("lblDisAmt").show();
                    $$("txtDisAmt").show();
                    $$("txtDisAmt").setValue(DepAmt.toFixed(2));
                }

                if ($.trim(SelResData[0].RM_N) != "") {
                    $$("txtReminder").setValue($.trim(SelResData[0].RM_N));
                    $$("txtRDate").setValue(SelResData[0].RM_DT1);

                    var TimeFm1 = new Date('01/01/2020 ' + SelResData[0].RM_DTM)

                    $$("txtRTm").setValue(TimeFm1);

                    $$("txtRDate").show();
                    $$("txtRTm").show();
                    $$("ChkClsRem").show();
                }
                else {
                    $$("txtRDate").hide();
                    $$("txtRTm").hide();
                    $$("ChkClsRem").hide();
                }

                $$("txtNarration").setValue($.trim(SelResData[0].NARRATION));

                $$("txtResvDt").setValue($.trim(SelResData[0].RESERVE_DT1));
                $$("ddlStatus").setValue($.trim(SelResData[0].I_IND));

                if ($.trim(SelResData[0].I_IND) == "2") {
                    $$("txtCutdt").show();
                    $$("txtCutdt").setValue(SelResData[0].T_DT1);
                }
                else
                    $$("txtCutdt").hide();

                $("#hdnOldStatus").val(SelResData[0].I_IND);

                //$$("txtGPax").setValue(SelResData[0].CG_TM);

                if ($.trim(SelResData[0].CG_NM) != "" && SelResData[0].CG_TM != "") {

                    $$("txtCGst").setValue(SelResData[0].CG_NM);

                    $$("txtArrTm").show();
                    var TimeFm1 = new Date('01/01/2020 ' + SelResData[0].CG_TM)
                    $$("txtArrTm").setValue(TimeFm1);
                }

                $$("txtBaner").setValue(SelResData[0].BANNER_HEAD);
                $$("txtBookRef").setValue(SelResData[0].Booking_Ref);

                $$("ChkClsRem").setValue(($.trim(SelResData[0].E_IND) == "1" ? "1" : "0"));

                $$("ChkLMusic").setValue(($.trim(SelResData[0].M_IND) == "1" ? "1" : "0"));

                if (SelResData[0].L_IND == "1") {
                    $$("chkComappl").setValue("1");
                    $$("txtApprBy").setValue(SelResData[0].COMSN_APRV_BY);
                    $$("txtComNar").setValue(SelResData[0].COMSN_NARR);
                }

                if (SelResData[0].N_IND == "1") {
                    $$("ChkStgSetup").setValue("1");
                    $$("txtChf").setValue(SelResData[0].SETUP_NARR)
                }

                var dataparam = {};
                dataparam["REQTYPE"] = "GET_GETGSTCAPTION";
                dataparam["PROGNAME"] = "GET_BQRESCODE01";
                dataparam["COMPID"] = $("#hdnCompId").val();
                dataparam["GS_ID"] = $("#hdnGstId").val();
                dataparam["GstType"] = $.trim($$("ddlGuestTy").getValue());
                var DataVal = JSON.stringify(dataparam);
                $.ajax({
                    async: false,
                    url: "/BQTrans/COMAPI_CALL",
                    type: 'POST',
                    data: "request=" + DataVal,
                    success: function (d) {
                        if (d != "") {
                            //debugger;
                            var Filter = JSON.parse(d);

                            $$("lblGst").setValue(Filter);
                        }
                    }
                });

                $$("ChkShiftPri").setValue((SelResData[0].B1_IND == "1" ? "1" : "0"));

                $$("ChkShiftAft").setValue((SelResData[0].B2_IND == "1" ? "1" : "0"));

                //$$("ddlCurId").setValue(SelResData[0].Guest_Nm)();

                $$("txtAddress").setValue($.trim(SelResData[0].ADD1));
                $$("txtAddress1").setValue($.trim(SelResData[0].ADD2));
                $$("txtAddress2").setValue($.trim(SelResData[0].ADD3));
                $$("txtCity").setValue($.trim(SelResData[0].PLACE));
                $$("txtPincode").setValue($.trim(SelResData[0].PIN_CD));
                $$("txtPhone").setValue($.trim(SelResData[0].TEL));
                $$("txtMobile").setValue($.trim(SelResData[0].MOBILE));
                $$("txtEmail").setValue($.trim(SelResData[0].EMAIL));
                $$("txtEmail2").setValue($.trim(SelResData[0].EMAIL2));
                $$("txtContactP").setValue($.trim(SelResData[0].CONTACT_PERSON));
                $$("txtCPDesig").setValue($.trim(SelResData[0].CONTACT_DESIGNATION));
                $$("txtCPPhone").setValue($.trim(SelResData[0].CONTACT_TEL));

                if (SelVenData.length > 0) {
                    //Venue Tap Seeting SelVenData
                    $$("grdVenue").clearAll();
                    $$("grdVenue").parse(SelVenData);
                    $$("grdVenue").refresh();
                }
                else {
                    $$("grdVenue").clearAll();
                    $$("grdVenue").refresh();
                    fnVenueRowAdd('0');
                }

                if (selFB.length > 0) {
                    //FB Tap 
                    $$("grdFB").clearAll();
                    $$("grdFB").parse(selFB);
                    $$("grdFB").refresh();
                }
                else {
                    fnFBRowAdd('0');
                }

                if (selDepart.length > 0) {
                    $$("grdDepartShow").clearAll();
                    $$("grdDepartShow").parse(selDepart);
                    $$("grdDepartShow").refresh();
                }
                else {
                    $$("grdDepart").clearAll();
                    $$("grdDepart").refresh();
                    fnDepartRowAdd('0');
                }

                $$("grdVenue").select($$("grdVenue").getFirstId());
                webix.UIManager.setFocus($$("grdVenue"));
                if (SetMenu1.length > 0) {
                    $$("grdMenu").clearAll();
                    $$("grdMenu").parse(SetMenu1);
                    $$("grdMenu").refresh();
                }
                else {
                    $$("grdMenu").clearAll();
                    fnMenuRowAdd('0');
                }

                if (SetMenu2.length > 0) {
                    $$("grdMenuDetails").clearAll();
                    $$("grdMenuDetails").parse(SetMenu2);
                    $$("grdMenuDetails").refresh();
                }
                else {

                }

                if (SetMenu3.length > 0) {
                    //debugger;
                    $$("grdPlanStore").clearAll();
                    $$("grdPlanStore").parse(SetMenu3);
                    $$("grdPlanStore").refresh();
                }
                else {
                }

                $$("grdMenu").select($$("grdMenu").getFirstId());
                webix.UIManager.setFocus($$("grdMenu"));

                if ($.trim(ChkAmend) == "1") {
                    AlertMessage("F.P Already Released.");
                    return;
                }
            }
        },
    });
}

//======================================================================================

//++++++++++++++++++++++++++++++++++++ Reserve Tap ++++++++++++++++++++++++++++++++++++

function fnCallPopUpGstSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGuestDet",
        head: $$("ddlGuestTy").getText() + " Search",
        position: "center",
        minWidth: 1050,
        maxWidth: 1050,
        move: true,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 1050,
            maxWidth: 1050,

            elements: [
                {
                    view: "datatable",
                    id: "grdGuestDet",
                    select: "row",
                    data: [],
                    height: 400,
                    scroll: "y",
                    scheme: {
                        $change: function (item) {
                            if ($.trim(item.ColInd) == "R" && $$("ddlGuestTy").getValue() == "C") {
                                item.$css = "CompanyRowRed";
                            }
                        },
                    },
                    columns: [
                            { header: "Title", hidden: ($$("ddlGuestTy").getValue() == "C" ? true : false), id: "TitleNm", width: 50, css: { 'text-align': 'Center ! important' } },
                            { header: [($("#hdnGstNmInd").val() == "0" ? "Name" : "Last Name"), { content: "textFilter" }], id: "GuestNm", width: ($$("ddlGuestTy").getValue() == "C" ? 350 : ($("#hdnGstNmInd").val() == "0" ? 280 : 200)), css: { 'text-align': 'left ! important' } },
                            { header: ["First Name", { content: "textFilter" }], id: "GuestNmF", hidden: ($("#hdnGstNmInd").val() == "0" ? true : false), width: 130, css: { 'text-align': 'left ! important' } },
                            { header: ["Mobile", { content: "textFilter" }], id: "Mob", width: 110, css: { 'text-align': 'left ! important' } },
                            { header: ["Address", { content: "textFilter" }], id: "GstAddr", width: ($("#hdnGstNmInd").val() == "0" ? 250 : 200), css: { 'text-align': 'left ! important' } },
                            { header: ["City", { content: "textFilter" }], id: "Place", width: 130, css: { 'text-align': 'left ! important' } },
                            { header: ["Contact Name", { content: "textFilter" }], id: "Contact", width: 180, css: { 'text-align': 'left ! important' } },
                            { header: "TitleId", id: "TitleId", hidden: true },
                            { header: "GuestId", id: "GuestId", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);

                            $("#hdnGstId").val($.trim(selectedRows[0].GuestId));

                            $("#cmbTitleTag").val($.trim(selectedRows[0].GuestId));

                            $$("ddlTit").setValue(selectedRows[0].TitleId);

                            if ($$("ddlGuestTy").getValue() == "C") {
                                $$("txtGstName").setValue(selectedRows[0].GuestNm);
                            }
                            else {
                                $$("txtGstName").setValue(selectedRows[0].GuestNm);
                                $$("txtFirstNm").setValue(selectedRows[0].GuestNmF);
                            }

                            var dataparam = {};
                            dataparam["REQTYPE"] = "GET_GETGSTCAPTION";
                            dataparam["PROGNAME"] = "GET_BQRESCODE01";
                            dataparam["COMPID"] = $("#hdnCompId").val();
                            dataparam["GS_ID"] = $("#hdnGstId").val();
                            dataparam["GstType"] = $.trim($$("ddlGuestTy").getValue());
                            var DataVal = JSON.stringify(dataparam);
                            $.ajax({
                                async: false,
                                url: "/BQTrans/COMAPI_CALL",
                                type: 'POST',
                                data: "request=" + DataVal,
                                success: function (d) {
                                    if (d != "") {
                                        //debugger;
                                        var Filter = JSON.parse(d);

                                        $$("lblGst").setValue(Filter);
                                    }
                                }
                            });


                            $$('PopupGuestDet').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 950,
                             paddingX: 950,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGuestDet').hide();
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

    fnLoadGuestDetLoad();
    $$("PopupGuestDet").show();
}

function fnCallMemberSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGuestDet",
        head: "Member Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        move:true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,

            elements: [
                {
                    view: "datatable",
                    id: "grdGuestDet",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: ["Member id", { content: "textFilter" }], id: "MembId", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: ["Member Name", { content: "textFilter" }], id: "MembNM", width: 300, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);
                            $$("txtLastNm").setValue(selectedRows[0].MembNM);
                            $("#hdnGstId").val($.trim(selectedRows[0].MembId));

                            $$('PopupGuestDet').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 450,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGuestDet').hide();
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

    fnLoadGuestDetLoad();
    $$("PopupGuestDet").show();
}

function fnLoadGuestDetLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQGUESTSRCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GuestTy"] = $$("ddlGuestTy").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdGuestDet").clearAll();
                $$("grdGuestDet").parse(rowData);
                $$("grdGuestDet").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnDefaultResLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQRESDEFLOAD";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);

                var TblGstTy = rowData.TBLGUESTTY;

                $$("ddlGuestTy").define("options", TblGstTy);
                $$("ddlGuestTy").refresh();

                if ($("#hdnCurMode").val() == "N") {
                    $$("ddlGuestTy").setValue("O");
                }

                //------
                var TblFunct = rowData.TBLFUNCT;

                $$("ddlFunTy").define("options", TblFunct);
                $$("ddlFunTy").refresh();

                //------
                var TblMarket = rowData.TBLMARKET;

                $$("ddlMarkSeg").define("options", TblMarket);
                $$("ddlMarkSeg").refresh();

                //------
                var TblBuss = rowData.TBLBUSS;

                $$("ddlBusSrc").define("options", TblBuss);
                $$("ddlBusSrc").refresh();

                //------
                var TblSett = rowData.TBLSETTLE;

                $$("ddlSetMode").define("options", TblSett);
                $$("ddlSetMode").refresh();

                //------
                var TblTit = rowData.TBLTITLE;

                $$("ddlTit").define("options", TblTit);
                $$("ddlTit").refresh();

                if ($("#hdnCurMode").val() == "N") {
                    $$("ddlTit").setValue("1");
                }

                //Sales Person
                var TblSales = rowData.TBLSALES;

                $$("ddlSalesPer").define("options", TblSales);
                $$("ddlSalesPer").refresh();

                //Channel
                var TblChanl = rowData.TBLCHAN;

                $$("ddlChannel").define("options", TblChanl);
                $$("ddlChannel").refresh();

                //Billing Instruction
                var TblBillInst = rowData.TBLBILLINST;
                $$("ddlBillInst").define("options", TblBillInst);
                $$("ddlBillInst").refresh();

                var Staus = [{ "id": "R", "value": "Confirmed" }, { "id": "2", "value": "Tentative" }, { "id": "9", "value": "Cancelled" }];

                $$("ddlStatus").define("options", Staus);
                $$("ddlStatus").refresh();

                if ($("#hdnCurMode").val() == "N") {
                    $$("ddlStatus").setValue("R");
                }

                if ($("#hdnFornCurAppl").val() == "1") {
                    var TblCur = rowData.TBLCURR;
                    $$("ddlCurId").define("options", TblCur);
                    $$("ddlCurId").refresh();
                    $$("ddlCurId").setValue($("#hdnBaseCurId").val());
                }
            }
        },
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++ Venue Tap ++++++++++++++++++++++++++++++++++++

function fnDefaultVenue() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BQVENUEDEFLOAD";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
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

function fnCallAidsSearch(vDepartid, vDepartNm, vQty, vNarration, ColDeptIds, RowIndex) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAidsSrch",
        head: "Aids Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdAidsSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { hidden: true, id: "AIDS_ID", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: ["Aids Name", { content: "textFilter" }], id: "AIDS_NM", width: 300, css: { 'text-align': 'left ! important' } },
                             { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                    ],
                    on: {
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 230,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Ok', type: "icon", icon: "wxi-check",
                                             maxWidth: 75,
                                             inputWidth: 70,
                                             on: {
                                                 onItemClick: function () {

                                                     var data = $$("grdAidsSrch").serialize();

                                                     if (data.length > 0) {

                                                         var dtVenue = $$("grdVenue").getSelectedItem();

                                                         var DepBind = fnDepartBind();

                                                         for (i = 0; i < data.length; i++) {

                                                             if (data[i].ChkSelect == "1") {

                                                                 var AIDS_ID = $.trim(data[i].AIDS_ID);
                                                                 var AIDS_NM = $.trim(data[i].AIDS_NM);

                                                                 var addrow = {
                                                                     DRowId: dtVenue.RowId, Departid: vDepartid, AidsId: AIDS_ID, AidsNm: AIDS_NM, Qty: '', Narration: '', DepartNm: vDepartNm,
                                                                     hdnSessionId: dtVenue.vSessionId,
                                                                 };

                                                                 DepBind = DepBind.concat(addrow);
                                                             }
                                                         }

                                                         $$("grdDepart").clearAll();
                                                         $$("grdDepart").parse(DepBind);
                                                         $$("grdDepart").refresh();

                                                         if (DepBind.length == 0) {
                                                             fnDepartRowAdd('0');
                                                         }

                                                         fnCallDepartStore();
                                                     }

                                                     $$('PopupAidsSrch').hide();
                                                 }
                                             }
                                         },
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAidsSrch').hide();
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

    fnLoadAidsSearch(vDepartid, ColDeptIds);
    $$("PopupAidsSrch").show();
}

function fnDepartBind() {
    var ArrayDep = [];

    var data = $$("grdDepart").serialize();

    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {

            if (data[i].Departid != "" && data[i].AidsId != "") {
                var addrow = {
                    DRowId: data[i].DRowId, Departid: data[i].Departid, AidsId: data[i].AidsId, AidsNm: data[i].AidsNm, Qty: data[i].Qty, Narration: data[i].Narration,
                    DepartNm: data[i].DepartNm, hdnSessionId: data[i].hdnSessionId,
                };

                ArrayDep = ArrayDep.concat(addrow);
            }
        }
    }

    return ArrayDep;
}

function fnLoadAidsSearch(vDepartid, ColDeptIds) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_AIDSSEARCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["vDepart"] = vDepartid;
    dataparam["CollAids"] = ColDeptIds;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdAidsSrch").clearAll();
                $$("grdAidsSrch").parse(rowData);
                $$("grdAidsSrch").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnCallDepartStore() {

    var dtDeptStore = $$("grdDepartShow").serialize();

    var dtDepart = $$("grdDepart").serialize();

    var dtVenue = $$("grdVenue").serialize();

    var SetDept = [];

    if (dtVenue.length != 0 && dtVenue.length != 0) {

        var SelRowId = "";

        var dtSItem = $$("grdVenue").getSelectedItem(true);

        if (dtSItem.length > 0) {
            SelRowId = dtSItem[0].RowId;
        }

        for (k = 0; k < dtVenue.length; k++) {

            if ($.trim(SelRowId) == $.trim(k)) {

                var DepartItem = [];

                for (j = 0; j < dtDepart.length; j++) {

                    if (dtDepart[j].hdnSessionId != "" && dtDepart[j].Departid != "" && dtDepart[j].AidsId != "") {

                        var addrow = {
                            Departid: dtDepart[j].Departid, AidsNm: dtDepart[j].AidsNm, Qty: dtDepart[j].Qty, Narration: dtDepart[j].Narration, AidsId: dtDepart[j].AidsId,
                            DepartNm: dtDepart[j].DepartNm, hdnSessionId: dtVenue[k].vSessionId, DRowId: k,
                        };

                        SetDept = SetDept.concat(addrow);

                        DepartItem = DepartItem.concat(addrow);
                    }
                }

                if (DepartItem.length > 0) {
                    $$("grdDepart").clearAll();
                    $$("grdDepart").parse(DepartItem);
                    $$("grdDepart").refresh();
                }
                else {
                }
            }
            else {
                var Dept = dtDeptStore.filter(function (dtDeptStore) {
                    return dtDeptStore.DRowId == k;
                });

                if (Dept.length != 0) {
                    SetDept = SetDept.concat(Dept);
                }
            }
        }
        $$("grdDepartShow").clearAll();
        $$("grdDepartShow").parse(SetDept);
        $$("grdDepartShow").refresh();
    }
    else
    {
        $$("grdDepartShow").clearAll();
        $$("grdDepartShow").refresh();
    }

    $$("grdDepart").refresh();
    $$("grdVenue").refresh();

    fnCallFbUpdate();
    fnCallMenuUpdate();
}

function fnCallFbUpdate() {

    var dtFB = $$("grdFB").serialize();

    var dtVenue = $$("grdVenue").serialize();

    var SetDept = [];

    if (dtVenue.length != 0) {

        for (k = 0; k < dtVenue.length; k++) {

            for (f = 0; f < dtFB.length; f++) {

                if ($.trim(dtVenue[k].RowId) == $.trim(dtFB[f].FRowId)) {

                    dtFB[f].FRowId = dtVenue[k].RowId;
                    dtFB[f].vFBDate = dtVenue[k].vDate;
                    dtFB[f].vSessionid = dtVenue[k].vSessionId;
                    dtFB[f].nVenueNm = dtVenue[k].vVenueNm;
                    dtFB[f].hdnVenueId = dtVenue[k].vVenueId;
                }
            }
        }
    }
    $$("grdFB").refresh();
}

function fnCallMenuUpdate() {

    var dtFB = $$("grdFB").serialize();

    var dtMenu = $$("grdMenu").serialize();

    var SetDept = [];

    if (dtFB.length != 0) {

        for (k = 0; k < dtFB.length; k++) {

            for (f = 0; f < dtMenu.length; f++) {

                if ($.trim(dtFB[k].FRowId) == $.trim(dtMenu[f].MRowId)) {

                    dtMenu[f].MFBDate = dtFB[k].vFBDate
                    dtMenu[f].MSessionid = dtFB[k].vSessionid
                    dtMenu[f].hdnVenueId = dtFB[k].hdnVenueId
                    dtMenu[f].MVenueNm = dtFB[k].nVenueNm

                    dtMenu[f].hdnPlanId = dtFB[k].hdnPlnPkgId
                    dtMenu[f].hdnPlanNM = dtFB[k].hdnPkgNm
                    //dtMenu[f].hdnPkg = dtFB[k].nVenueNm

                    //prcMenuFillItem(dtFB[k].vSessionid, dtFB[k].hdnVenueId, dtFB[k].hdnPlnPkgId, dtFB[k].FRowId);

                    //$$("grdMenu").select($$("grdMenu").getFirstId());
                }
            }
        }
    }
    $$("grdMenu").refresh();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++ FB Tap ++++++++++++++++++++++++++++++++++++

function fnDefaultFBTap() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BQFBDEFLOAD";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
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

function fnCallVenueSelect(Gird) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupVenueSelect",
        head: "Venue Selection",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdPopVenue",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "VRowId", id: "VRowId",hidden:true, width: 30, css: { 'text-align': 'center ! important' } },
                            { header: "Date", id: "FbDate", width: 100, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, css: { 'text-align': 'left ! important' } },
                            { header: "Session", id: "SessionId", width: 60, css: { 'text-align': 'left ! important' } },
                            { header: "Venue", id: "VenueNM", width: 200, css: { 'text-align': 'left ! important' } },
                            { hidden: true, id: "VenueId", width: 10, css: { 'text-align': 'left ! important' } },
                            { hidden: true, id: "PlanId", width: 10, css: { 'text-align': 'left ! important' } },
                            { hidden: true, id: "PlanNm", width: 10, css: { 'text-align': 'left ! important' } },
                            //{ hidden: true, id: "Pkg", width: 10, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            var selectedRows = this.getSelectedItem(id.row);

                            if ($.trim(Gird) == "FB") {

                                var dataval = $$("grdFB").getSelectedItem();

                                if (selectedRows[0].id != "") {
                                    dataval.vFBDate = selectedRows[0].FbDate;
                                    dataval.vSessionid = selectedRows[0].SessionId;
                                    dataval.nVenueNm = selectedRows[0].VenueNM;
                                    dataval.hdnVenueId = selectedRows[0].VenueId;
                                    dataval.vTaxAmt = "0";
                                    dataval.ChkTaxInx = "0";
                                    dataval.vPlanId = "PLN";
                                    dataval.FRowId = selectedRows[0].VRowId;
                                }
                                $$("grdFB").refresh();

                                //var data = $$("grdMenu").serialize();
                                //var lenval = data.length;

                                //if ($("#hdnCurMode").val() == "N" && lenval == 0) {
                                //    fnMenuRowAdd('0');
                                //}

                                fnCallMenuUpdate();
                            }
                            else if ($.trim(Gird) == "MENU") {

                                var addNew = [];

                                var dataval = $$("grdMenu").serialize();

                                if (dataval.length != 0) {
                                    for (i = 0; i < dataval.length; i++) {

                                        if ($.trim(dataval[i].MSessionid) != "" && $.trim(dataval[i].hdnVenueId) != "") {
                                            var addrow = {
                                                MFBDate: dataval[i].MFBDate, MSessionid: dataval[i].MSessionid, MVenueNm: dataval[i].MVenueNm, hdnVenueId: dataval[i].hdnVenueId, hdnPlanId: dataval[i].hdnPlanId,
                                                hdnPlanNM: dataval[i].hdnPlanNM, MRowId: dataval[i].MRowId
                                                //hdnPkg: dataval[i].hdnPkg,
                                            };

                                            addNew = addNew.concat(addrow);
                                        }
                                    }
                                }

                                if (selectedRows[0].id != "") {

                                    var addrow = {
                                        MFBDate: selectedRows[0].FbDate, MSessionid: selectedRows[0].SessionId, MVenueNm: selectedRows[0].VenueNM, hdnVenueId: selectedRows[0].VenueId,
                                        hdnPlanId: selectedRows[0].PlanId, hdnPlanNM: selectedRows[0].PlanNm, MRowId: selectedRows[0].VRowId,
                                        //hdnPkg: selectedRows[0].Pkg,
                                    };

                                    addNew = addNew.concat(addrow);

                                    $$("grdMenu").clearAll();
                                    $$("grdMenu").parse(addNew);
                                    $$("grdMenu").refresh();

                                    prcMenuFillItem(selectedRows[0].SessionId, selectedRows[0].VenueId, selectedRows[0].PlanId, selectedRows[0].VRowId);
                                }

                                $$("grdMenu").select($$("grdMenu").getFirstId());

                            }

                            $$('PopupVenueSelect').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupVenueSelect').hide();
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

    var PopArray = fnLoadVenueDet(Gird);

    if ($.trim(Gird) == "FB") {

        var curGrid = $$("grdFB").serialize();

        var SelId = $$("grdFB").getSelectedId(true);

        var RowIndex = $$("grdFB").getIndexById(SelId[0].row);

        if (curGrid.length > 0) {
            for (j = 0; j < curGrid.length; j++) {
                if (RowIndex != j) {
                    fnRemoveArry(PopArray, 'VRowId', curGrid[j].FRowId);
                }
            }
        }
    }
    else if ($.trim(Gird) == "MENU") {
        //debugger;
        var curGrid = $$("grdMenu").serialize();

        var SelId = $$("grdMenu").getSelectedId(true);

        var RowIndex = $$("grdMenu").getIndexById(SelId[0].row);

        if (curGrid.length > 0) {
            for (j = 0; j < curGrid.length; j++) {

                if (RowIndex != j) {
                    fnRemoveArry(PopArray, 'VRowId', curGrid[j].MRowId);
                }
            }
        }
    }

    $$("grdPopVenue").clearAll();
    $$("grdPopVenue").parse(PopArray);
    $$("grdPopVenue").refresh();

    $$("PopupVenueSelect").show();
}

function fnLoadVenueDet(Gird) {

    var Array = [];

    if ($.trim(Gird) == "FB") {
        var data = $$("grdVenue").serialize();

        if (data.length != 0) {
            for (i = 0; i < data.length; i++) {

                if ($.trim(data[i].vSessionId) != "" && $.trim(data[i].vVenueId) != "") {
                    var addrow = {
                        FbDate: data[i].vDate, SessionId: data[i].vSessionId, VenueNM: data[i].vVenueNm, VenueId: data[i].vVenueId,
                        VRowId: data[i].RowId, PlanId: '', PlanNm: '', //Pkg: '',
                    };

                    Array = Array.concat(addrow);
                }
            }
        }
    }
    else {
        var data = $$("grdFB").serialize();

        if (data.length != 0) {
            for (i = 0; i < data.length; i++) {
                if ($.trim(data[i].vSessionid) != "" && $.trim(data[i].hdnVenueId) != "") {
                    var addrow = {
                        FbDate: data[i].vFBDate, SessionId: data[i].vSessionid, VenueNM: data[i].nVenueNm, VenueId: data[i].hdnVenueId,
                        PlanNm: data[i].hdnPkgNm, PlanId: data[i].hdnPlnPkgId, VRowId: data[i].FRowId,
                        //Pkg: data[i].vPlanId,
                    };

                    Array = Array.concat(addrow);
                }
            }
        }
    }
    return Array;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++ Menu Tap ++++++++++++++++++++++++++++++++++++



function prcMenuFillItem(MSessionid, hdnVenueId, hdnPlanId, SelMRowId) {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BQMENUFILLITEM";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PlanId"] = hdnPlanId;
    dataparam["SessionId"] = MSessionid;
    dataparam["VenueId"] = hdnVenueId;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {

                rowData = JSON.parse(d);

                var MenuFill = [];

                var Itemdata = rowData.TBLMENUITEM;

                var dtMDet = $$("grdMenuDetails").serialize();

                if (dtMDet.length > 0) {

                    var ItemArr = dtMDet.filter(function (dtMDet) {
                        return dtMDet.MRowId != SelMRowId;
                    });

                    if (ItemArr.length > 0) {
                        MenuFill = MenuFill.concat(ItemArr);
                    }
                }

                if (Itemdata.length != 0) {

                    for (j = 0; j < Itemdata.length; j++) {

                        if (Itemdata[j].hdnIItemId != "") {
                            var StoreData = {
                                MItemNM: Itemdata[j].MItemNM, MMenuQty: Itemdata[j].MMenuQty, MMenuNarr: (Itemdata[j].MMenuNarr == null ? '' : Itemdata[j].MMenuNarr),
                                MPlanNm: (Itemdata[j].MPlanNm == null ? '' : Itemdata[j].MPlanNm), hdnIItemId: Itemdata[j].hdnIItemId, hdnIVenId: Itemdata[j].hdnIVenId,
                                hdnISessId: Itemdata[j].hdnISessId, hdnIPlnId: Itemdata[j].hdnIPlnId, SNo: '', MMenuSeqNo: Itemdata[j].MMenuSeqNo, TyName: '',
                                OTyId: '', Rate: '', SaleRate: '', Disc: '', DiscAmt: '', GrdId: '1', MRowId: SelMRowId,
                            };
                            MenuFill = MenuFill.concat(StoreData);
                        }
                    }
                }

                $$("grdMenuDetails").clearAll();
                $$("grdMenuDetails").parse(MenuFill);
                $$("grdMenuDetails").refresh();

                //************************

                var MPlanArr = [];

                var PlanData = rowData.TBLITEM;

                var dtPlandt = $$("grdPlanStore").serialize();

                if (dtPlandt.length > 0) {

                    var PlanArr = dtPlandt.filter(function (dtPlandt) {
                        return dtPlandt.MRowId != SelMRowId;
                    });

                    if (PlanArr.length > 0) {
                        MPlanArr = MPlanArr.concat(PlanArr);
                    }
                }

                if (PlanData.length != 0) {

                    for (j = 0; j < PlanData.length; j++) {

                        var StoreData = {
                            ITEM_NM: PlanData[j].ITEM_NM, QTY: PlanData[j].QTY, hdnPVenId: PlanData[j].hdnPVenId, hdnPSessId: PlanData[j].hdnPSessId,
                            hdnPPlnId: PlanData[j].hdnPPlnId, MRowId: SelMRowId,
                        };

                        MPlanArr = MPlanArr.concat(StoreData);
                    }
                }

                $$("grdPlanStore").clearAll();
                $$("grdPlanStore").parse(MPlanArr);
                $$("grdPlanStore").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnCallPopupProdSrch(RowIndex) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupMProdSrch",
        head: "Plan Item Search",
        position: "center",
        minWidth: 530,
        maxWidth: 530,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 570,
        body: {
            view: 'form',
            minWidth: 530,
            maxWidth: 530,
            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "richselect",
                                    id: "ddlProdgrp",
                                    label: "Group",
                                    labelAlign: "Left",
                                    labelWidth: 45,
                                    inputWidth: 190,
                                    width: 200,
                                    on: {
                                        onChange: function (newval, oldval) {
                                            if (oldval != "") {

                                                var dataparam = {};
                                                var rowData = [];
                                                dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                dataparam["COMPID"] = $("#hdnCompId").val();
                                                var DataVal = JSON.stringify(dataparam);
                                                $.ajax({
                                                    async: false,
                                                    url: "/BQTrans/COMAPI_CALL",
                                                    type: 'POST',
                                                    data: "request=" + DataVal,
                                                    success: function (d) {
                                                        if (d != "") {
                                                            rowData = JSON.parse(d);

                                                            var Prodgrp = rowData.TBLPRODITEM;

                                                            var FilterProd=[];

                                                            if (newval != "00") {
                                                                FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                    return ($$("ddlProdSubgrp").getValue() == "00" ? $.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim($$("ddlProdSubgrp").getValue())));
                                                                });

                                                            }
                                                            else {
                                                                FilterProd = Prodgrp;
                                                            }

                                                            $$("grdMProd").clearAll();
                                                            $$("grdMProd").parse(FilterProd);
                                                            $$("grdMProd").refresh();
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                 {
                                     view: "richselect",
                                     id: "ddlProdSubgrp",
                                     label: "Sub Group",
                                     labelAlign: "Right",
                                     labelWidth: 75,
                                     inputWidth: 290,
                                     width: 290,
                                     on: {
                                         onChange: function (newval, oldval) {

                                             if (oldval != "") {

                                                 var dataparam = {};
                                                 var rowData = [];
                                                 dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                 dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                 dataparam["COMPID"] = $("#hdnCompId").val();
                                                 var DataVal = JSON.stringify(dataparam);
                                                 $.ajax({
                                                     async: false,
                                                     url: "/BQTrans/COMAPI_CALL",
                                                     type: 'POST',
                                                     data: "request=" + DataVal,
                                                     success: function (d) {
                                                         if (d != "") {
                                                             rowData = JSON.parse(d);

                                                             var Prodgrp = rowData.TBLPRODITEM;

                                                             var FilterProd = [];

                                                             if (newval != "00") {
                                                                 FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                     return ($$("ddlProdgrp").getValue() == "00" ? $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim($$("ddlProdgrp").getValue()) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval)));
                                                                 });

                                                             }
                                                             else {
                                                                 FilterProd = Prodgrp;
                                                             }

                                                             $$("grdMProd").clearAll();
                                                             $$("grdMProd").parse(FilterProd);
                                                             $$("grdMProd").refresh();
                                                         }
                                                     }
                                                 });
                                             }
                                         }
                                     }
                                 },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdMProd",
                            select: "row",
                            data: [],
                            height: 350,
                            scroll: "y",
                            columns: [
                                    { header: ["Item ID", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' } },
                                    { header: ["Item Name", { content: "textFilter" }], id: "PROD_NM1", width: 320, css: { 'text-align': 'left ! important' } },
                                    { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                            ],
                            on: {
                            }
                        }
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 350,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Ok', type: "icon", icon: "wxi-check",
                                             maxWidth: 75,
                                             inputWidth: 70,
                                             on: {
                                                 onItemClick: function () {

                                                     var Cnt = 0;

                                                     var dtMenu = $$("grdMenu").serialize();

                                                     var item = $$("grdMenu").getSelectedItem(true);

                                                     if (dtMenu.length != 0) {
                                                         var dtProd = $$("grdMProd").serialize();

                                                         var dtItem = $$("grdItem").serialize();

                                                         var dataval = $$("grdItem").getSelectedItem();

                                                         if (dtProd.length != 0) {
                                                             var PrevSeqNo = ""; var Mqty = "";

                                                             for (j = 0; j < dtProd.length; j++) {

                                                                 if (dtProd[j].ChkSelect == "1") {

                                                                     //debugger;

                                                                     if (dtItem.length != 0) {
                                                                         if ((RowIndex + Cnt) < dtItem.length) {
                                                                             dtItem[RowIndex + Cnt].MItemNM = dtProd[j].PROD_NM1
                                                                             dtItem[RowIndex + Cnt].hdnIItemId = dtProd[j].PROD_ID;

                                                                             dtItem[RowIndex + Cnt].hdnISessId = item[0].MSessionid;

                                                                             dtItem[RowIndex + Cnt].hdnIVenId = item[0].hdnVenueId;

                                                                             dtItem[RowIndex + Cnt].hdnIPlnId = item[0].hdnPlanId;

                                                                             PrevSeqNo = dtProd[j].MMenuSeqNo;
                                                                             Mqty = dtProd[j].MMenuQty;
                                                                         }
                                                                         else {
                                                                             var StoreData = {
                                                                                 MItemNM: dtProd[j].PROD_NM1, MMenuQty: Mqty, MMenuNarr: '', MMenuSeqNo: PrevSeqNo, MPlanNm: item[0].hdnPlanNM,
                                                                                 hdnIItemId: dtProd[j].PROD_ID, hdnIVenId: item[0].hdnVenueId, hdnISessId: item[0].MSessionid, hdnIPlnId: item[0].hdnPlanId,
                                                                                 MRowId: item[0].MRowId,
                                                                             };

                                                                             $$("grdItem").add(StoreData);
                                                                         }
                                                                     }
                                                                     Cnt = Cnt + 1;
                                                                 }
                                                             }
                                                         }
                                                     }

                                                     $$("grdItem").refresh();

                                                     fnCallMenuDetStore();

                                                     $$('PopupMProdSrch').hide();
                                                 }
                                             }
                                         },
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close', type: "icon", icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupMProdSrch').hide();
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

    fnMenuprodSearch('1');
    $$("PopupMProdSrch").show();
}

function fnCallOthertProdSrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupOthrProdSrch",
        head: "Plan Item Search",
        position: "center",
        minWidth: 500,
        maxWidth: 500,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 570,
        body: {
            view: 'form',
            minWidth: 530,
            maxWidth: 530,
            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "richselect",
                                    id: "ddlProdgrp1",
                                    label: "Group",
                                    labelAlign: "Left",
                                    labelWidth: 45,
                                    inputWidth: 190,
                                    width: 200,
                                    on: {
                                        onChange: function (newval, oldval) {
                                            if (oldval != "") {

                                                var dataparam = {};
                                                var rowData = [];
                                                dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                dataparam["COMPID"] = $("#hdnCompId").val();
                                                var DataVal = JSON.stringify(dataparam);
                                                $.ajax({
                                                    async: false,
                                                    url: "/BQTrans/COMAPI_CALL",
                                                    type: 'POST',
                                                    data: "request=" + DataVal,
                                                    success: function (d) {
                                                        if (d != "") {
                                                            rowData = JSON.parse(d);

                                                            var Prodgrp = rowData.TBLPRODITEM;

                                                            var FilterProd = [];

                                                            if (newval != "00") {
                                                                FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                    return ($$("ddlProdSubgrp1").getValue() == "00" ? $.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim($$("ddlProdSubgrp1").getValue())));
                                                                });

                                                            }
                                                            else {
                                                                FilterProd = Prodgrp;
                                                            }

                                                            $$("grdMProd1").clearAll();
                                                            $$("grdMProd1").parse(FilterProd);
                                                            $$("grdMProd1").refresh();
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                 {
                                     view: "richselect",
                                     id: "ddlProdSubgrp1",
                                     label: "Sub Group",
                                     labelAlign: "Right",
                                     labelWidth: 75,
                                     inputWidth: 260,
                                     width: 260,
                                     on: {
                                         onChange: function (newval, oldval) {
                                             if (oldval != "") {

                                                 var dataparam = {};
                                                 var rowData = [];
                                                 dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                 dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                 dataparam["COMPID"] = $("#hdnCompId").val();
                                                 var DataVal = JSON.stringify(dataparam);
                                                 $.ajax({
                                                     async: false,
                                                     url: "/BQTrans/COMAPI_CALL",
                                                     type: 'POST',
                                                     data: "request=" + DataVal,
                                                     success: function (d) {
                                                         if (d != "") {
                                                             var rowData = JSON.parse(d);

                                                             var Prodgrp = rowData.TBLPRODITEM;

                                                             var FilterProd = [];

                                                             if (newval != "00") {
                                                                 FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                     return ($$("ddlProdgrp1").getValue() == "00" ? $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim($$("ddlProdgrp1").getValue()) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval)));
                                                                 });

                                                             }
                                                             else {
                                                                 FilterProd = Prodgrp;
                                                             }

                                                             $$("grdMProd1").clearAll();
                                                             $$("grdMProd1").parse(FilterProd);
                                                             $$("grdMProd1").refresh();
                                                         }
                                                     }
                                                 });
                                             }
                                         }
                                     }
                                 },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdMProd1",
                            select: "row",
                            data: [],
                            height: 350,
                            scroll: "y",
                            columns: [
                                    { header: ["Item ID", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' } },
                                    { header: ["Item Name", { content: "textFilter" }], id: "PROD_NM1", width: 300, css: { 'text-align': 'left ! important' } },
                                    { header: "Sale Rate", id: "SALE_RATE", width: 60, format:webix.Number.numToStr({
                                        groupDelimiter:",",
                                        groupSize:3,
                                        decimalDelimiter:".",
                                        decimalSize:2}), css: { 'text-align': 'left ! important' } },
                            ],
                            on: {
                                'onItemDblClick': function (id, e, node) {
                                    var selectedRows = this.getSelectedItem(id.row);

                                    var dtMenu = $$("grdMenu").getSelectedItem(true);

                                    var CurRows = $$("grdOthers").getSelectedItem();

                                    CurRows.hdnIItemId = $.trim(selectedRows[0].PROD_ID);
                                    CurRows.MItemNM = $.trim(selectedRows[0].PROD_NM1);
                                    CurRows.hdnIVenId = dtMenu[0].hdnVenueId,
                                    CurRows.hdnISessId = dtMenu[0].MSessionid,
                                    CurRows.MRowId = dtMenu[0].MRowId,

                                    CurRows.Rate = $.trim(parseFloat(selectedRows[0].SALE_RATE).toFixed(2));
                                    CurRows.SaleRate = $.trim(parseFloat(selectedRows[0].SALE_RATE).toFixed(2));

                                    $$("grdOthers").refresh();
                                    fnCallMenuDetStore();
                                    $$('PopupOthrProdSrch').hide();
                                }
                            }
                        }
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 380,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close', type: "icon", icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupOthrProdSrch').hide();
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

    fnMenuprodSearch('2');
    $$("PopupOthrProdSrch").show();
}

function fnMenuprodSearch(Option) {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                if (Option == '1') {
                    $$("grdMProd").clearAll();
                    $$("grdMProd").parse(rowData.TBLPRODITEM);
                    $$("grdMProd").refresh();

                    $$("ddlProdgrp").define("options", rowData.TBLPRODGR);
                    $$("ddlProdgrp").refresh();

                    $$("ddlProdSubgrp").define("options", rowData.TBLPRODSGR);
                    $$("ddlProdSubgrp").refresh();

                    $$("ddlProdgrp").setValue("00");
                    $$("ddlProdgrp").refresh();

                    $$("ddlProdSubgrp").setValue("00");
                    $$("ddlProdSubgrp").refresh();
                }
                else {

                    $$("grdMProd1").clearAll();
                    $$("grdMProd1").parse(rowData.TBLPRODITEM);
                    $$("grdMProd1").refresh();

                    $$("ddlProdgrp1").define("options", rowData.TBLPRODGR);
                    $$("ddlProdgrp1").refresh();

                    $$("ddlProdSubgrp1").define("options", rowData.TBLPRODSGR);
                    $$("ddlProdSubgrp1").refresh();

                    $$("ddlProdgrp1").setValue("00");
                    $$("ddlProdgrp1").refresh();

                    $$("ddlProdSubgrp1").setValue("00");
                    $$("ddlProdSubgrp1").refresh();
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnFoorPrepSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupFDSrch",
        head: "Food Preparation",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdFoodgrd",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { hidden: true, id: "id", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: "Food Preparation", id: "value", width: 300, css: { 'text-align': 'left ! important' } },
                             { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                    ],
                    on: {
                        //'onItemDblClick': function (id, e, node) {
                        //}
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 230,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Ok', type: "icon", icon: "wxi-check",
                                             maxWidth: 75,
                                             inputWidth: 70,
                                             on: {
                                                 onItemClick: function () {

                                                     var data = $$("grdFoodgrd").serialize();

                                                     $$("txtPreparation").setValue("");

                                                     var MFDIds = ""; var MFDVals = "";

                                                     for (i = 0; i < data.length; i++) {

                                                         if (data[i].ChkSelect == "1") {

                                                             MFDIds = ($.trim(MFDIds) == "" ? $.trim(data[i].id) : MFDIds + ',' + $.trim(data[i].id));
                                                             MFDVals = ($.trim(MFDVals) == "" ? $.trim(data[i].value) : MFDVals + ',' + $.trim(data[i].value));
                                                         }

                                                         $$("txtPreparation").setValue(MFDVals);

                                                         $$("grdFoodgrd").refresh();
                                                         $$('PopupFDSrch').hide();
                                                     }
                                                 }
                                             }
                                         },
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close', type: "icon", icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupFDSrch').hide();
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

    var FnMenutap = fnLoadDefMenu();

    $$("grdFoodgrd").clearAll();
    $$("grdFoodgrd").parse(FnMenutap.TBLFOODPREP);
    $$("grdFoodgrd").refresh();

    $$("PopupFDSrch").show();
}

function fnLoadDefMenu() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BQMENUDEFLOAD";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
    return rowData;
}

function fnCallPlanStore() {

    var grdData = $$("grdMenu").serialize();

    var dtPlnStore = $$("grdPlanStore").serialize();

    var dtPlan = $$("grdPlan").serialize();

    var dtSelData = $$("grdMenu").getSelectedItem(true);

    var SelRowSessId = dtSelData[0].MSessionid;

    var DetStore = [];

    if (grdData.length != 0) {

        for (k = 0; k < grdData.length; k++) {

            var SessionId = grdData[k].MSessionid;

            if ($.trim(SelRowSessId) == $.trim(SessionId)) {

                if (dtPlan.length != 0) {

                    for (j = 0; j < dtPlan.length; j++) {

                        if (dtPlan[j].hdnPSessId != "") {
                            var StoreData = {
                                ITEM_NM: dtPlan[j].ITEM_NM, QTY: dtPlan[j].QTY, hdnPVenId: dtPlan[j].hdnPVenId, hdnPSessId: dtPlan[j].hdnPSessId,
                                hdnPPlnId: dtPlan[j].hdnPPlnId, MRowId: grdData[k].MRowId,
                            };
                        }

                        DetStore = DetStore.concat(StoreData);
                    }
                }
            }
            else {

                var Item = dtPlnStore.filter(function (dtPlnStore) {
                    return dtPlnStore.hdnPSessId == SessionId;
                });

                DetStore = DetStore.concat(Item);
            }
        }
    }

    $$("grdPlanStore").clearAll();
    $$("grdPlanStore").parse(DetStore);
    $$("grdPlanStore").refresh();
}

function fnCallMenuDetStore() {
    //debugger;
    var dtMDet = $$("grdMenuDetails").serialize();

    var grdData = $$("grdMenu").serialize();

    var dtItem = $$("grdItem").serialize();

    var dtOthers = $$("grdOthers").serialize();

    var dtSelData = $$("grdMenu").getSelectedItem(true);

    var SelMRowId = 0;

    if (dtSelData.length > 0)
        SelMRowId = dtSelData[0].MRowId;

    var DetStore = [];

    if (grdData.length != 0) {

        for (k = 0; k < grdData.length; k++) {

            var vMRowId = grdData[k].MRowId;

            if ($.trim(SelMRowId) == $.trim(vMRowId)) {

                if (dtItem.length != 0) {

                    for (j = 0; j < dtItem.length; j++) {

                        if (dtItem[j].hdnIItemId != "") {
                            var StoreData = {
                                MItemNM: dtItem[j].MItemNM, MMenuQty: dtItem[j].MMenuQty, MMenuNarr: (dtItem[j].MMenuNarr == null ? '' : dtItem[j].MMenuNarr), MPlanNm: (dtItem[j].MPlanNm == null ? '' : dtItem[j].MPlanNm),
                                hdnIItemId: dtItem[j].hdnIItemId, hdnIVenId: dtItem[j].hdnIVenId, hdnISessId: dtItem[j].hdnISessId, hdnIPlnId: dtItem[j].hdnIPlnId, SNo: '',
                                MMenuSeqNo: dtItem[j].MMenuSeqNo, TyName: '', OTyId: '', Rate: '', SaleRate: '', Disc: '', DiscAmt: '', GrdId: '1',
                                MRowId: grdData[k].MRowId,
                            };
                            DetStore = DetStore.concat(StoreData);
                        }
                    }
                }

                if (dtOthers.length != 0) {

                    for (g = 0; g < dtOthers.length; g++) {

                        if (dtOthers[g].OTyId != "" && dtOthers[g].hdnItemId != "") {

                            var StoreData = {
                                MItemNM: dtOthers[g].MItemNM, MMenuQty: dtOthers[g].MMenuQty, MMenuNarr: ' ', MPlanNm: '',
                                hdnIItemId: dtOthers[g].hdnIItemId, hdnIVenId: dtOthers[g].hdnIVenId, hdnISessId: dtOthers[g].hdnISessId,
                                hdnIPlnId: '2', SNo: '',
                                MMenuSeqNo: '', TyName: '', OTyId: dtOthers[g].OTyId, Rate: dtOthers[g].Rate, SaleRate: dtOthers[g].SaleRate, Disc: dtOthers[g].Disc,
                                DiscAmt: dtOthers[g].DiscAmt, GrdId: '2', MRowId: grdData[k].MRowId,
                            };

                            DetStore = DetStore.concat(StoreData);
                        }
                    }
                }
            }
            else {

                var Item = dtMDet.filter(function (dtMDet) {
                    return dtMDet.MRowId == vMRowId;
                });

                if (Item.length > 0) {
                    DetStore = DetStore.concat(Item);
                }
            }
        }
    }

    $$("grdMenuDetails").clearAll();
    $$("grdMenuDetails").parse(DetStore);
    $$("grdMenuDetails").refresh();

    fnCallPlanStore();
}

function fnFillMenuGrids(vRowId) {

    var dtMenu = $$("grdMenu").serialize();

    if (dtMenu.length == 0) {

        $$("grdItem").clearAll();
        $$("grdItem").refresh();

        $$("grdOthers").clearAll();
        $$("grdOthers").refresh();

        $$("grdPlan").clearAll();
        $$("grdPlan").refresh();

        fnMenuRowAdd('0');
        fnMItemRowAdd('0');
        fnMOtherRowAdd('0');
    }
    else {
        var dtMenuDet = $$("grdMenuDetails").serialize();

        if (dtMenuDet.length != 0) {

            var Dept = dtMenuDet.filter(function (dtMenuDet) {
                return (dtMenuDet.MRowId == vRowId && dtMenuDet.GrdId == '1');
            });

            if (Dept.length != 0) {
                $$("grdItem").clearAll();
                $$("grdItem").parse(Dept);
                $$("grdItem").refresh();
            }
            else {
                $$("grdItem").clearAll();
                $$("grdItem").refresh();
                fnMItemRowAdd('0');
            }
        }
        else {
            $$("grdItem").clearAll();
            $$("grdItem").refresh();
            fnMItemRowAdd('0');
        }

        if (dtMenuDet.length != 0) {

            var Dept = dtMenuDet.filter(function (dtMenuDet) {
                return (dtMenuDet.MRowId == vRowId && dtMenuDet.GrdId == '2');
            });

            if (Dept.length != 0) {
                $$("grdOthers").clearAll();
                $$("grdOthers").parse(Dept);
                $$("grdOthers").refresh();
            }
            else {
                $$("grdOthers").clearAll();
                $$("grdOthers").refresh();
                fnMOtherRowAdd('0');
            }
        }
        else {
            $$("grdOthers").clearAll();
            $$("grdOthers").refresh();
            fnMOtherRowAdd('0');
        }
        //debugger;
        var dtPlanStr = $$("grdPlanStore").serialize();

        if (dtPlanStr.length != 0) {

            var Dept = dtPlanStr.filter(function (dtPlanStr) {
                return (dtPlanStr.MRowId == vRowId);
            });

            $$("grdPlan").clearAll();
            $$("grdPlan").parse(Dept);
            $$("grdPlan").refresh();
        }
        else {
            $$("grdPlan").clearAll();
            $$("grdPlan").refresh();
        }
    }
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//########################################################## BQ VALIDATION ######################################################

function fnBQSaveValidate() {

    $$("BQTabView").getTabbar().setValue("ReserveFrm");


    if ($$("txtGstName").getValue() == "") {
        if ($("#hdnGstNmInd").val() != "0")
            AlertMessage("Last Name cannot be empty !");
        else
            AlertMessage("Guest Name cannot be empty !");

        return false;
    }

    if ($("#hdnGstId").val() == "") {
        FnGuestCreate();
        return false;
    }

    if ($$("txtResvDt").getValue() == "") {
        AlertMessage("Reserve Date cannot be empty !");
        return false;
    }

    if ($$("txtFrmDate").getValue() == "") {
        AlertMessage("Function From date cannot be empty !");
        return false;
    }

    if ($$("txtToDt").getValue() == "") {
        AlertMessage("Function To date cannot be empty !");
        return false;
    }

    if ($$("ddlStatus").getValue() == "2") {
        if ($$("txtCutdt").getValue() == "") {
            AlertMessage("Cut Off Due Date cannot be empty !");
            return false;
        }

        //Validation Pending 

        //If CDate(scCofdt.Text) > CDate(scFromDt.Text) Then
        //fnErrorHandler "Cut Off due Date should be less than Function From Date", wsInformation, , , True

    }

    if ($$("ddlFunTy").getValue() == "") {
        AlertMessage("Function Type cannot be empty !");
        return false;
    }

    if ($$("ddlMarkSeg").getValue() == "") {
        AlertMessage("Market Segment cannot be empty !");
        return false;
    }

    if ($("#hdnbsman").val() == "1") {
        if ($$("ddlBusSrc").getValue() == "") {
            AlertMessage("Business Source cannot be empty !");
            return false;
        }

        if ($$("ddlSetMode").getValue() == "") {
            AlertMessage("Settlement Mode cannot be empty !");
            return false;
        }
    }

    if (parseInt($$("txtGPax").getValue() == "" ? 0 : $$("txtGPax").getValue()) < 0) {
        AlertMessage("Expected Pax cannot be less than Zero !");
        return false;
    }

    if ($$("txtRTm").getValue() != "" && $$("txtRDate").getValue() == "") {
        AlertMessage("Reminder Date cannot be empty !");
        return false;
    }

    if ($("#hdnSpAppl").val() == "1") {
        if ($$("ddlSalesPer").getValue() == "1" && $$("hdnspman").getValue() == "1") {
            AlertMessage("Sales Person cannot be empty !");
            return false;
        }
    }

    var Result = fnValidateResDet();

    if ($.trim(Result) != "True") {

        if ($.trim(Result) == "false") 
            AlertMessage("Validation Failed");
        else
            AlertMessage($.trim(Result));

        return false;
    }
    else {

        if (!fnVenueValidate())
            return false;

        if (!fnValidVenueSession())
            return false;

        if ($("#hdnSaveTag").val() != "1") {

            if (!fnFBValidate())
                return false;

            if (!fnMenuValidate())
                return false;
        }
    }

    if ($.trim($("#hdnMAdd").val()) == "1") {

        if ($.trim($$("txtAddress").getValue()) == "") {
            AlertMessage("Address cannot be empty !");
            $$("BQTabView").getTabbar().setValue("GstForm");
            return false;
        }

        if ($.trim($$("txtCity").getValue()) == "") {
            $$("BQTabView").getTabbar().setValue("GstForm");
            AlertMessage("City cannot be empty !");
            return false;
        }
    }

    if ($.trim($("#hdnA3Ind").val()) == "1" && $.trim($$("txtPhone").getValue()) == "") {
        AlertMessage("Phone cannot be empty !");
        $$("BQTabView").getTabbar().setValue("GstForm");
        return false;
    }

    if ($.trim($("#hdnL3Ind").val()) == "1" && $.trim($$("txtMobile").getValue()) == "") {
        AlertMessage("Mobile cannot be empty !");
        $$("BQTabView").getTabbar().setValue("GstForm");
        return false;
    }

    return true;
}

function fnValidateResDet() {
    var dataparam = {};
    var rowData ="";

    dataparam["REQTYPE"] = "GET_BQRESVVALIDATE";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["VALID"] = "RESVALID";
    dataparam["txtResvNo"] = $.trim($$("txtResvNo").getValue());

    //******************* Reserve *********************************
    dataparam["GuestId"] = $("#hdnGstId").val();
    dataparam["cmbTitleTag"] = $("#cmbTitleTag").val();

    dataparam["ddlGuestTy"] = $.trim($$("ddlGuestTy").getValue());
    dataparam["txtGstName"] = $.trim($$("txtGstName").getValue());
    dataparam["txtFirstNm"] = $.trim($$("txtFirstNm").getValue());
    dataparam["txtFromDt"] = $.trim($$("txtFrmDate").getValue());
    dataparam["txtToDt"] = $.trim($$("txtToDt").getValue());
    dataparam["ddlStatus"] = $.trim($$("ddlStatus").getValue());
    dataparam["txtCutdt"] = $.trim($$("txtCutdt").getValue());

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);

    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);
            }
        }
    });

    return rowData;
}

function fnValidateVenDet() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BQRESVVALIDATE";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["VALID"] = "VENVALID";
    dataparam["txtResvNo"] = $.trim($$("txtResvNo").getValue());

    dataparam["ChkShiftPri"] = $.trim($$("ChkShiftPri").getValue());
    dataparam["ChkShiftAft"] = $.trim($$("ChkShiftAft").getValue());

    var dsgrdVenue = $$("grdVenue").serialize();
    var GridDataSet = JSON.stringify(dsgrdVenue);
    dataparam["TBLVENUE"] = GridDataSet;

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);
            }
        }
    });

    return rowData;
}

function fnVenueValidate() {
    var data = $$("grdVenue").serialize();

    if (data.length != 0) {

        $$("BQTabView").getTabbar().setValue("VenueFrm");

        for (i = 0; i < data.length; i++) {

            var startTime = data[i].vStm;

            var endTime = data[i].vEtm;

            if (data[i].vDate == "") {
                AlertMessage("Date cannot be empty !");
                return false;
            }
            else if (data[i].vSessionId == "") {
                AlertMessage("Session cannot be empty !");
                return false;
            }
            else if (data[i].vVenueId == "") {
                AlertMessage("Venue cannot be empty !");
                return false;
            }
            else if (startTime == "") {
                AlertMessage("Start Time cannot be empty !");
                return false;
            }
            else if (endTime == "") {
                AlertMessage("End Time cannot be empty !");
                return false;
            }
            else if (data[i].vChklink == "1") {
                if (data[i].vMvid == "") {
                    AlertMessage("Main Venue not defined for Linked Venue ");
                    return false;
                }
            }
        }
    }
    var Result = fnValidateVenDet();

    if ($.trim(Result) != "True") {
        if ($.trim(Result) == "false")
            AlertMessage("Validation Failed");
        else
            AlertMessage($.trim(Result));
        return false;
    }

    return true;
}

function fnFBValidate()
{
    var grdData = $$("grdFB").serialize();

    $$("BQTabView").getTabbar().setValue("FBFrm");
  
    if (grdData.length != 0) {

        for (i = 0; i < grdData.length; i++) {
            //debugger;
            var fnDt = grdData[i].vFBDate;
            var SessId = grdData[i].vSessionid;
            var VenId = grdData[i].hdnVenueId;
            var vRate = (grdData[i].vFBRate == "" ? 0 : parseFloat(grdData[i].vFBRate));
            var vExpPax1 = (grdData[i].vExpPax == "" ? 0 : parseInt(grdData[i].vExpPax));
            var vGarPax1 = (grdData[i].vActPax == "" ? 0 : parseInt(grdData[i].vActPax));
            var vVenCap = grdData[i].VenueCap;
            var vPlanNM = grdData[i].hdnPkgNm;
            var vPK = grdData[i].vPlanId;
            var vPlanID = grdData[i].hdnPlnPkgId;
            var vVnRt = (grdData[i].vVenRate == "" ? 0 : parseFloat(grdData[i].vVenRate));

            if ($("#hdnG4Ind").val() == "0") {

                if (fnDt == "" && SessId == "" && VenId == "") {
                    AlertMessage("Date/Session/Venue Cannot be Empty");
                    return false;
                }
            }

            if (vPlanNM=="" && vVnRt == 0) {

                if (vPK == "")
                    AlertMessage("Plan/Package Cannot be Empty");
                else
                    AlertMessage(vPK + "Cannot be empty");

                return false;
            }

            if (vRate == 0 && vPlanNM == "") {
                //
                //Plan Rate is Zero.You want to Proceed?
            }

            if (vGarPax1 == 0 && grdData[i].hdnPlnPkgId != "") {
                AlertMessage("Guaranteed Pax Cannot be empty");
                return false;
            }
            else if (vGarPax1 == 0 && grdData[i].hdnPlnPkgId != "") {
                AlertMessage("Please enter Guaranteed Pax");
                return false;
            }

            if (vExpPax1 == 0 && grdData[i].hdnPlnPkgId != "") {
                AlertMessage("Expected Pax Cannot be empty");
                return false;
            }
            else if (vExpPax1 == 0 && grdData[i].hdnPlnPkgId != "") {
                AlertMessage("Please enter Expected Pax");
                return false;
            }

            if (parseInt(vExpPax1) < parseInt(vGarPax1) && grdData[i].hdnPlnPkgId != "") {
                AlertMessage("Expected Pax should be Greater or equal to Guaranteed Pax");
                return false;
            }

            if (vVenCap != 0 && (vExpPax1 > vVenCap)) {

                AlertMessage(" '"+VenId+" ' Capacity is less than the Expected Pax");
                return false;
            }

            if ($("#hdnMultiPln").val() == "1") {

                for (j = 0; j < grdData.length; j++) {

                    if (i != j) {
                        if ($.trim(grdData[j].hdnPlnPkgId) == $.trim(grdData[i].hdnPlnPkgId)) {
                            AlertMessage("Plan already Defined");
                            return false;
                        }
                    }
                }
            }
        }
    }

    return true;
}

function fnMenuValidate() {
    var grdData = $$("grdMenu").serialize();

    var dtItem = $$("grdItem").serialize();

    var dtOthers = $$("grdOthers").serialize();

    if ($("#hdnG4Ind").val() == "1") {
        if (grdData.length == 0) {
            AlertMessage("Menu Details Cannot be empty");
            $$("BQTabView").getTabbar().setValue("MenuFrm");
            return false;
        }
    }

    if (dtItem.length > 0) {
        for (j = 0; j < dtItem.length; j++) {
            //debugger;
            var ItemId = dtItem[j].hdnIItemId;
            var ItemNM = dtItem[j].MItemNM;
            var Qty = (dtItem[j].MMenuQty == "" ? 0 : parseInt(dtItem[j].MMenuQty));

            if ($("#hdnG4Ind").val() == "1") {

                if ($.trim(ItemNM) == "") {
                    //debugger;
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Item Name Cannot be empty");
                    return false;
                }

                if ($.trim(dtItem[j].MMenuQty) == "") {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Qty Cannot be empty");
                    return false;
                }
                else if (Qty == 0) {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Qty Cannot be Zero");
                    return false;
                }
            }

        }
    }

    if (dtOthers.length > 0) {
        for (j = 0; j < dtOthers.length; j++) {

            var OTyId = dtOthers[j].OTyId;
            var ItemNM = dtOthers[j].MItemNM;

            var Qty = (dtOthers[j].MMenuQty == "" ? 0 : parseInt(dtOthers[j].MMenuQty));

            if (OTyId != "" && ItemNM != "") {

                if ($.trim(dtOthers[j].MMenuQty) == "") {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Qty Cannot be empty");
                    return false;
                }
                else if (Qty == 0) {
                    $$("BQTabView").getTabbar().setValue("MenuFrm");
                    AlertMessage("Qty Cannot be Zero");
                    return false;
                }
            }
        }
    }

    return true;
}

function fnValidVenueSession() {
    var grdData = $$("grdVenue").serialize();
    if (grdData.length != 0 && grdData.length != 1) {
        for (i = 0; i < grdData.length; i++) {
            for (j = 0; j < grdData.length; j++) {

                if (i != j) {
                    var vDate1 = grdData[j].vDate;

                    var vDate2 = grdData[i].vDate;

                    if ($.trim(grdData[j].vSessionId) == $.trim(grdData[i].vSessionId) && ($.trim(vDate1) == $.trim(vDate2))) {
                        AlertMessage("Session Duplication Cannot be Allowed !");
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

//#################################################################################################################################

function fnClearData() {

    var EmptySet = [];

    $$("ddlGuestTy").define("options", EmptySet);
    $$("ddlGuestTy").refresh();

    $$("ddlTit").define("options", EmptySet);
    $$("ddlTit").refresh();

    $$("txtGstName").setValue("");
    $$("txtFirstNm").setValue("");
    $$("txtHostBy").setValue("");
    $$("txtFrmDate").setValue("");
    $$("lblGst").setValue("");
    $$("txtToDt").setValue("");
    $$("txtToDt").setValue("");

    $$("ddlFunTy").setValue("");

    $$("ddlMarkSeg").setValue("");

    $$("ddlBusSrc").setValue("");

    $$("ddlSetMode").setValue("");

    $$("ddlBillInst").setValue("");

    $$("ddlChannel").setValue("");

    $$("ddlSalesPer").setValue("");

    $$("txtBooker").setValue("");
    $$("txtReminder").setValue("");
    $$("txtRDate").setValue($("#hdnCurrentDt").val());
    $$("txtRTm").setValue("");
    $$("txtRTm").hide();
    $$("txtRDate").hide();
    $$("txtNarration").setValue("");

    $$("txtResvNo").setValue("");
    $$("btnGstProf").show();
    $$("txtResvDt").setValue($("#hdnCurrentDt").val());
    $("#hdnOldStatus").val("");

    $$("ddlStatus").setValue("");

    $$("txtCutdt").setValue($("#hdnCurrentDt").val());
    $$("txtGPax").setValue("");
    $$("txtCGst").setValue("");

    $$("txtArrTm").setValue("");
    $$("txtBaner").setValue("");
    $$("txtBookRef").setValue("");
    $$("ChkClsRem").setValue("0");
    $$("ChkLMusic").setValue("0");
    $$("chkComappl").setValue("0");
    $$("txtApprBy").setValue("");
    $$("txtComNar").setValue("");
    $$("ChkStgSetup").setValue("0");
    $$("ChkShiftPri").setValue("0");
    $$("ChkShiftAft").setValue("0");
    $$("txtChf").setValue("");

    $$("ddlCurId").setValue("");

    //Venue Tap

    $$("grdVenue").clearAll();
    $$("grdVenue").refresh();

    $$("ddlSeating").setValue("");
    $$("txtMinPax").setValue("");
    $$("txtMaxPax").setValue("");

    $$("txtSnackPicTm").setValue("");
    $$("txtServerTm").setValue("");
    $$("txtFPNo").setValue("");
    $$("txtEventNM").setValue("");
    $$("txtEventTm").setValue("");

    $$("txtEndTm").setValue("");
    $$("txtFPDt").setValue("");

    $$("ddlPlanItem").setValue("");

    $$("grdDepart").clearAll();
    $$("grdDepart").refresh();

    $$("grdDepartShow").clearAll();
    $$("grdDepartShow").refresh();

    $$("grdFB").clearAll();
    $$("grdFB").refresh();

    $$("grdMenu").clearAll();
    $$("grdMenu").refresh();

    $$("grdPlan").clearAll();
    $$("grdPlan").refresh();

    $$("grdItem").clearAll();
    $$("grdItem").refresh();

    $$("grdOthers").clearAll();
    $$("grdOthers").refresh();

    $$("grdPlanStore").clearAll();
    $$("grdPlanStore").refresh();

    $$("grdMenuDetails").clearAll();
    $$("grdMenuDetails").refresh();


    $$("txtAddress").setValue("");
    $$("txtAddress1").setValue("");
    $$("txtAddress2").setValue("");
    $$("txtCity").setValue("");
    $$("txtPincode").setValue("");
    $$("txtPhone").setValue("");
    $$("txtMobile").setValue("");

    $$("txtEmail").setValue("");
    $$("txtEmail2").setValue("");
    $$("txtContactP").setValue("");

    $$("txtCPDesig").setValue("");
    $$("txtCPPhone").setValue("");

    $("#hdnGPpopInd").val("");
}

function fnPopSuccess(Msg, VchNo,Opt) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSuccess",
        head: "Message",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        move: true,
        height: 150,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            height: 150,
            elements: [
                {
                    rows: [
                        {
                            paddingY:10,
                            cols: [
                                {
                                    width: 50,
                                },
                                {
                                    view: "label",
                                    id: "lblSuccMsg",
                                    label: ($.trim(Opt) == "1" ? Msg + " Resv# : " + VchNo : Msg),//"<span class='webix_icon wxi-alert'></span>   " +
                                    labelAlign: "Center",
                                }
                            ]
                        },
                        {
                            height:15,
                        },
                        {
                            cols: [
                                {
                                    width:160,
                                },
                                {
                                    view: 'button',
                                    label: 'Ok', type: "icon", icon: "wxi-check",
                                    maxWidth: 75,
                                    inputWidth: 70,
                                    on: {
                                        onItemClick: function () {
                                            $$("PopupSuccess").hide();
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

    $$("PopupSuccess").show();
}


function fnPopupStatus(ResvNO) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupWLStatus",
        head: "Message",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        move: true,
        height: 200,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            height: 150,
            elements: [
                {
                    rows: [
                        {
                            view: "label",
                            id: "lblsts",
                            label: "Please Confirm the Selected Block is correct",
                            labelAlign: "Center",
                            width: 350,
                        },
                        {
                            height:40,
                            cols: [
                               {
                                   view: "radio",
                                   id:"RbtnStatus",
                                   label: "Status",
                                   width: 400,
                                   labelWidth: 130,
                                   labelAlign: "Right",
                                   value: "R", options: [
                                       { "id": "R", "value": "Confirmed" },
                                       { "id": "2", "value": "Tentative" }
                                   ]
                               }
                            ]
                        },
                        {
                            cols: [
                                 {
                                     width:130,
                                 },
                                 {
                                     view: 'button',
                                     label: 'Yes',
                                     maxWidth: 75,
                                     inputWidth: 70,
                                     on: {
                                         onItemClick: function () {
                                             $$("PopupWLStatus").hide();

                                             var Staus = [{ "id": "R", "value": "Confirmed" }, { "id": "2", "value": "Tentative" }, { "id": "9", "value": "Cancelled" }];

                                             $$("ddlStatus").define("options", Staus);
                                             $$("ddlStatus").refresh();

                                             $$("ddlStatus").setValue($.trim($$("RbtnStatus").getValue()));

                                             if ($.trim($$("RbtnStatus").getValue()) == "2") {
                                                 $$("txtCutdt").show();
                                             }
                                             else
                                                 $$("txtCutdt").hide();

                                             $("#hdnSaveTag").val("0");

                                             if (fnWLFillData($.trim(ResvNO))) {
                                                 $("#hdnSaveTag").val("1");
                                                 $("#hdnCurMode").val("N");
                                                 $('#btnSave').prop('disabled', false);
                                                 $('#btnOpen').prop('disabled', true);
                                                 $('#btnNew').prop('disabled', true);
                                                 $('#btnWL').prop('disabled', false);
                                                 $$("txtResvSrc").hide();
                                                 $$("BQTabView").getTabbar().setValue("ReserveFrm");
                                               
                                                 $("#btnSave").click();
                                                 $('#btnWL').prop('disabled', false);
                                             }

                                             $$('PopReserveSrch').hide();
                                         }
                                     }
                                 },
                                 {
                                     width: 50,
                                 },
                                 {
                                     view: 'button',
                                     label: 'Cancel',
                                     maxWidth: 75,
                                     inputWidth: 70,
                                     on: {
                                         onItemClick: function () {
                                             $$("PopupWLStatus").hide();
                                         }
                                     }
                                 },
                            ]
                        },
                        {
                            view: "label",
                            id: "lblNote1",
                            label: "Note: if 'Yes'. Reservation is created referring the Block",
                            width: 350,
                            labelAlign: "Center",
                        }
                    ]
                }
            ]
        }
    });

    $$("PopupWLStatus").show();
}

function fnWLFillData(ResvNos) {

    var valid = true;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_OPENWLSEARCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["BlkResNo"] = ResvNos;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            ////debugger;
            if (d != "") {
                var rowData = JSON.parse(d);
                var data1 = rowData.TBLWLFILL;

                var EMsg = rowData.BLKMsg;

                if ($.trim(EMsg) != "") {
                    AlertMessage(EMsg);
                    //$("#btnRef").click();
                    valid = false;
                }
                else {

                    fnDefaultResLoad();
                    $$("txtResvNo").setValue(ResvNos);
                    if (data1.length > 0) {

                        if ($.trim(data1[0].RM_N) != "") {

                            $$("txtReminder").setValue($.trim(data1[0].RM_N));
                            //$$("txtRDate").setValue(data1[0].RM_DT1);
                            ////$$("txtRTm").setValue(data1[0].CG_TM);

                            $$("txtRDate").show();
                            $$("txtRTm").show();
                            $$("ChkClsRem").show();
                        }
                        else {
                            $$("txtRDate").hide();
                            $$("txtRTm").hide();
                            $$("ChkClsRem").hide();
                        }

                        $("#hdnGstId").val($.trim(data1[0].GUEST_ID));

                        $$("ddlGuestTy").setValue($.trim(data1[0].GUEST_TYPE));

                        //$$("ddlTit").setValue($.trim($.trim(data1[0].GS_ID))); $("#cmbTitleTag").val($.trim(selectedRows[0].GuestId));

                        if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {
                            $$("txtFirstNm").show();
                            $$("txtGstName").define("width", 200);
                            $$("txtGstName").define("inputWidth", 200);
                            $$("txtGstName").resize();
                        }
                        else {
                            $$("txtFirstNm").hide();
                            $$("txtGstName").define("width", 350);
                            $$("txtGstName").define("inputWidth", 350);
                            $$("txtGstName").resize();
                        }

                        if ($.trim(data1[0].GUEST_TYPE) == "C") {
                            $$("txtHostBy").show();
                            $$("txtFirstNm").hide();
                            $$("txtGstName").define("width", 350);
                            $$("txtGstName").define("inputWidth", 350);
                            $$("txtGstName").resize();
                            $$("ddlTit").hide();
                        }
                        else {
                            $$("ddlTit").show();
                        }

                        $$("txtGstName").setValue(data1[0].GUEST_NM);

                        if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {

                            if ($.trim(data1[0].GS_NM2) != "")
                                $$("txtGstName").setValue(data1[0].GS_NM2);

                            if ($.trim(data1[0].GS_NM1) != "")
                                $$("txtFirstNm").setValue(data1[0].GS_NM1);
                        }

                        $$("txtAddress").setValue($.trim(data1[0].ADD1));
                        $$("txtAddress1").setValue($.trim(data1[0].ADD2));
                        $$("txtAddress2").setValue($.trim(data1[0].ADD3));
                        $$("txtCity").setValue($.trim(data1[0].PLACE));
                        $$("txtPincode").setValue($.trim(data1[0].PIN_CD));
                        $$("txtPhone").setValue($.trim(data1[0].TEL));
                        $$("txtMobile").setValue($.trim(data1[0].MOBILE));
                        $$("txtEmail").setValue($.trim(data1[0].EMAIL));
                        $$("txtEmail2").setValue($.trim(data1[0].EMAIL2));
                        $$("txtContactP").setValue($.trim(data1[0].CONTACT_PERSON));
                        $$("txtCPDesig").setValue($.trim(data1[0].CONTACT_DESIGNATION));
                        $$("txtCPPhone").setValue($.trim(data1[0].CONTACT_TEL));

                        $$("txtFrmDate").setValue(data1[0].FROMDT1);

                        $$("txtToDt").setValue(data1[0].TODT1);

                        $$("ddlFunTy").setValue($.trim(data1[0].FUNCTION_ID));

                        $$("ddlMarkSeg").setValue($.trim(data1[0].MARKET_ID));

                        $$("ddlBusSrc").setValue($.trim(data1[0].A1_ID));

                        $$("txtGPax").setValue(data1[0].NO_OF_PAX);

                    }

                    var SelWLVenData = rowData.TBLWLVENUEPOS;

                    if (SelWLVenData.length > 0) {
                        $$("grdVenue").clearAll();
                        $$("grdVenue").parse(SelWLVenData);
                        $$("grdVenue").select($$("grdVenue").getFirstId());
                    }
                    else
                        $$("grdVenue").clearAll();

                    //debugger;
                    var selWLFB = rowData.TBLWLFB;

                    if (selWLFB.length > 0) {
                        //FB Tap 
                        $$("grdFB").clearAll();
                        $$("grdFB").parse(selWLFB);
                        $$("grdFB").refresh();
                    }
                    else {
                        fnFBRowAdd('0');
                    }

                    fnDepartRowAdd('0');
                    fnMenuRowAdd('0');
                    fnMOtherRowAdd('0');
                    fnMItemRowAdd('0');
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
            valid = false;
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return valid;
}

//--------------------------------------------------------- Row Delete Function -----------------------------------------------

function fnCallVenueDelete(RowId) {

    var dtVenue = $$("grdVenue").serialize();

    var dtDeptStore = $$("grdDepartShow").serialize();

    //```````````````````````````````````````````````````````````````````````````````````````````````````//
    if (dtVenue.length > 0) {

        var DeptItem = [];

        var DtRows = dtDeptStore.filter(function (dtDeptStore) {
            return dtDeptStore.DRowId != $.trim(RowId);
        });

        if (DtRows.length > 0) {

            $$("grdDepartShow").clearAll();
            $$("grdDepartShow").refresh();
            DeptItem = DeptItem.concat(DtRows);
        }

        $$("grdDepartShow").clearAll();
        $$("grdDepartShow").parse(DeptItem);
        $$("grdDepartShow").refresh();

        if (dtVenue.length > 0) {
            $$("grdVenue").select($$("grdVenue").getFirstId());
        }
        else {
            $$("grdDepartShow").clearAll();
            $$("grdDepartShow").refresh();
            $$("grdDepart").clearAll();
            $$("grdDepart").refresh();
            fnDepartRowAdd('0');
        }
    }
    else {
        $$("grdDepartShow").clearAll();
        $$("grdDepartShow").refresh();
        $$("grdDepart").clearAll();
        $$("grdDepart").refresh();
        fnVenueRowAdd('0');
        fnDepartRowAdd('0');
    }

    fnCallFBDelete(RowId);
}

function fnCallFBDelete(RowId) {

    var dtFB = $$("grdFB").serialize();

    //```````````````````````````````````````````````````````````````````````````````````````````````````//
    var PopArray = [];

    var CntArry = dtFB.filter(function (dtFB) {
        return dtFB.FRowId != RowId;
    });

    if (CntArry.length > 0) {
        $$("grdFB").clearAll();
        $$("grdFB").parse(CntArry);
        $$("grdFB").refresh();
    }
    else {

        $$("grdFB").clearAll();
        $$("grdFB").refresh();

        fnFBRowAdd('0');
    }

    fnCallMenuDelete(RowId,'1');

    $$("grdMenu").select($$("grdMenu").getLastId());
}

function fnCallMenuDelete(RowId, Opt) {

    var dtMenu = $$("grdMenu").serialize();

    if (RowId.toString() == "") {

        if (dtMenu.length > 0)
            $$("grdMenu").select($$("grdMenu").getFirstId());

        return;
    }
     
    var dtPlanstore = $$("grdPlanStore").serialize();

    var dtMenuDet = $$("grdMenuDetails").serialize();

    //```````````````````````````````````````````````````````````````````````````````````````````````````//
    if (Opt == "1") {

        var CntArry = dtMenu.filter(function (dtMenu) {
            return dtMenu.MRowId != RowId;
        });

        if (CntArry.length > 0) {
            $$("grdMenu").clearAll();
            $$("grdMenu").parse(CntArry);
            $$("grdMenu").refresh();
        }
        else {
            $$("grdMenu").clearAll();
            fnMenuRowAdd('0');
            $$("grdMenu").select($$("grdMenu").getFirstId());
        }
    }
    //```````````````````````````````````````````````````````````````````````````````````````````````````//

    //debugger;
    var CntArry1 = dtPlanstore.filter(function (dtPlanstore) {
        return dtPlanstore.MRowId != RowId;
    });

    if (CntArry1.length > 0) {
        $$("grdPlanStore").clearAll();
        $$("grdPlanStore").parse(CntArry1);
        $$("grdPlanStore").refresh();
    }
    else {

        $$("grdPlanStore").clearAll();
        $$("grdPlanStore").refresh();

        $$("grdPlan").clearAll();
        $$("grdPlan").refresh();
    }

    //```````````````````````````````````````````````````````````````````````````````````````````````````//

    var CntArry2 = dtMenuDet.filter(function (dtMenuDet) {
        return dtMenuDet.MRowId != RowId;
    });

    if (CntArry2.length > 0) {
        $$("grdMenuDetails").clearAll();
        $$("grdMenuDetails").parse(CntArry2);
        $$("grdMenuDetails").refresh();
    }
    else {

        $$("grdMenuDetails").clearAll();
        $$("grdMenuDetails").refresh();

        $$("grdItem").clearAll();
        $$("grdItem").refresh();

        $$("grdOthers").clearAll();
        $$("grdOthers").refresh();

        fnMItemRowAdd('0');
        fnMOtherRowAdd('0');
    }
    //----------------------------------------------------------------------------------------------------------------------------------
}

function callVenueBookDet() {
    //$("#hdnVBResvNo").val(getParameterByName("ResvNo", currentURL));

    //$("#hdnVBSessNm").val(getParameterByName("SessNm", currentURL));

    $("#hdnCompId").val($("#hdnVBProperty").val());

    $$("ddlProperty").setValue($("#hdnVBProperty").val());

    $("#btnNew").click();

    $$("txtFrmDate").setValue($("#hdnVBDate").val());
    $$("txtToDt").setValue($("#hdnVBDate").val());

    var Staus = [{ "id": "R", "value": "Confirmed" }, { "id": "2", "value": "Tentative" }, { "id": "9", "value": "Cancelled" }];

    $$("ddlStatus").define("options", Staus);
    $$("ddlStatus").refresh();

    $$("ddlStatus").setValue($.trim($("#hdnVBBlockTy").val()));

    if ($.trim($("#hdnVBBlockTy").val()) == "2")
        $$("txtCutdt").show();
    else
        $$("txtCutdt").hide();

    var addrow = {
        RowId: 0, vDate: $("#hdnVBDate").val(), vSessionId: $("#hdnVBSessId").val(), vVenueId: $("#hdnVBVenueId").val(), vVenueNm: $("#hdnVBVenueNm").val(),
        vStm: $("#hdnVBSTm").val(), vEtm: $("#hdnVBETm").val(), vChkmain: '', vChklink: '',
        vnExtTm: '', vChkHold: '', vHoldRes: '', vSeatId: '', vODLocID: '', vF_NO: '', vD_NO: '',
        vF_ind: '', vf_sno: '', vsnsTm: '', vsnEtm: '', vPgStm: '', vpgEtm: '', vEventNm: '', vMvid: '',
    };

    $$("grdVenue").clearAll();
    $$("grdVenue").add(addrow);
    $$("grdVenue").refresh();
}


function fnVenBookConfrim() {
    return webix.alert({
        ok: "Ok",
        width: 350,
        height:180,
        title: "Venue Booking Message",
        text: "Did you want Prcesss ! ",
        modal: true,
    }).then(function (result) {
        callVenueBookDet();
    })
}


//Company Search 

function fnCallPopUpCmpSrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupCmpSrch",
        head: $$("ddlGuestTy").getText() + " Search",
        position: "center",
        minWidth: 800,
        maxWidth: 800,
        move: true,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 800,
            maxWidth: 800,
            elements: [
                {
                    rows:[
                        {
                            cols: [
                                {
                                    id: "ChkInHouse",
                                    view: "checkbox",
                                    label: "InHouse",
                                    labelWidth: 55,
                                    width: 100,
                                    hidden: ($$("ddlGuestTy").getValue() == "G" ? false : true),
                                    value:"1",
                                    on: {
                                        "onChange": function () {
                                            $$("chkExpect").setValue("0");
                                            $$("ChkGstPrf").setValue("0");
                                            $$("ChkInHouse").setValue("1");
                                            fnLoadCmpLoad();
                                        }
                                    }
                                },
                                {
                                    id: "chkExpect",
                                    view: "checkbox",
                                    label: "Expected",
                                    labelWidth: 60,
                                    width: 120,
                                    hidden: ($$("ddlGuestTy").getValue() == "G" ? false : true),
                                    on: {
                                        "onChange": function () {
                                            $$("ChkInHouse").setValue("0");
                                            $$("ChkGstPrf").setValue("0");
                                            $$("chkExpect").setValue("1");
                                            fnLoadCmpLoad();
                                        }
                                    }
                                },
                                {
                                    id: "ChkGstPrf",
                                    view: "checkbox",
                                    label: "Guest Profile",
                                    labelWidth: 90,
                                    width: 130,
                                    hidden: ($$("ddlGuestTy").getValue() == "G" ? false : true),
                                    on: {
                                        "onChange": function () {
                                            $$("ChkInHouse").setValue("0");
                                            $$("chkExpect").setValue("0");
                                            $$("ChkGstPrf").setValue("1");
                                            fnLoadCmpLoad();
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdCmpSrch",
                            select: "row",
                            data: [],
                            height: 400,
                            scroll: "y",
                            columns: [
                                    { header: "GuestId", id: "GuestId", hidden: true },
                                    { header: [($("#hdnGstNmInd").val() == "0" ? "" : "Company id"), { content: "textFilter" }], hidden: ($$("ddlGuestTy").getValue() == "G" ? true : false), id: "GuestId", width: 100, css: { 'text-align': 'left ! important' } },
                                    { header: [($$("ddlGuestTy").getValue()=="G" ? "Last Name" : "Company Name"), { content: "textFilter" }], id: "GuestNm", width: ($$("ddlGuestTy").getValue() == "C" ? 350 :  200), css: { 'text-align': 'left ! important' } },
                                    { header: ["First Name", { content: "textFilter" }], id: "GuestNmF", hidden: ($$("ddlGuestTy").getValue() == "C" ? true : false), width: ($$("ddlGuestTy").getValue() == "C" ? 130 : 250), css: { 'text-align': 'left ! important' } },
                                    { header: ["Address", { content: "textFilter" }], id: "GstAddr", width: 300, css: { 'text-align': 'left ! important' } },
                            ],
                            on: {
                                'onItemDblClick': function (id, e, node) {
                                    $("#LoadDIv").show();
                                    //debugger;
                                    var selectedRows = this.getSelectedItem(id.row);

                                    $("#hdnGstId").val($.trim(selectedRows[0].GuestId));

                                    if ($$("ddlGuestTy").getValue() == "C") {
                                        $$("txtGstName").setValue(selectedRows[0].GuestNm);
                                    }
                                    else {
                                        $$("txtGstName").setValue(selectedRows[0].GuestNm);
                                        $$("txtFirstNm").setValue(selectedRows[0].GuestNmF);
                                    }


                                    var dataparam = {};
                                    dataparam["REQTYPE"] = "GET_BQCMPSEARCH";
                                    dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                    dataparam["COMPID"] = $("#hdnCompId").val();
                                    dataparam["Option"] = "";

                                    dataparam["GuestId"] = $("#hdnGstId").val();
                                    dataparam["GuestTy"] = $.trim($$("ddlGuestTy").getValue());
                                    dataparam["ddlGstTit"] = ($$("ddlTit") == true ? $.trim($$("ddlTit").getValue()) : "");

                                    dataparam["txtGstName"] = $.trim($$("txtGstName").getValue());
                                    dataparam["txtAddress"] = $.trim($$("txtAddress").getValue());
                                    dataparam["txtAddress1"] = $.trim($$("txtAddress1").getValue());
                                    dataparam["txtAddress2"] = $.trim($$("txtAddress2").getValue());
                                    
                                    var DataVal = JSON.stringify(dataparam);
                                    DataVal = encodeURIComponent(DataVal);

                                    $.ajax({
                                        async: false,
                                        url: "/BQTrans/COMAPI_CALL",
                                        type: 'POST',
                                        data: "request=" + DataVal,
                                        success: function (d) {
                                            if (d != "") {
                                                //debugger
                                                var rowData = JSON.parse(d);

                                                $("#cmbTitleTag").val(rowData);

                                                $("#hdnGstId").val($.trim(rowData));

                                            }
                                        },
                                        error: function () {
                                            //$("#LoadDIv").hide();
                                        },
                                        complete: function () {
                                            //$("#LoadDIv").hide();
                                        }
                                    });


                                    $$('PopupCmpSrch').hide();
                                    $("#LoadDIv").hide();
                                }
                            }
                        }
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 680,
                             paddingX: 680,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupCmpSrch').hide();
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

    fnLoadCmpLoad();
    $$("PopupCmpSrch").show();
}

function fnLoadCmpLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQCMPSEARCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GuestTy"] = $$("ddlGuestTy").getValue();
    dataparam["ChkinHse"] = $$("ChkInHouse").getValue();
    dataparam["ChkExpct"] = $$("chkExpect").getValue();
    dataparam["ChkGstPrf"] = $$("ChkGstPrf").getValue();
    dataparam["Option"] = "SRCH";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdCmpSrch").clearAll();
                $$("grdCmpSrch").parse(rowData);
                $$("grdCmpSrch").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}


