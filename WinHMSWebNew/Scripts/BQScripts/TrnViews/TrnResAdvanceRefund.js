
var LoadInds = function (Request) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQ_NM"] = "LOADADVANCEIND";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);

            window.K_TAX = Detemp.RA[0].K_TAX;//K_TAX
            window.IN_GST_IND = Detemp.RA[0].IN_GST_IND;//IN_GST_IND
            window.G_ADV_EXL = Detemp.RA[0].G_ADV_EXL;//G_ADV_EXL
            window.TX_ST_CD = Detemp.RA[0].TX_ST_CD;//CompStcd
            window.VOUCH_GENERATE_IND = Detemp.RA1[0].VOUCH_GENERATE_IND;//C_Vouch_Gen_Ind
            window.VOUCH_PRINT_IND = Detemp.RA1[0].VOUCH_PRINT_IND;//bRep
            window.MISC_TY_NM = Detemp.RA1[0].MISC_TY_NM;//strCaption
            window.APPL_IND = Detemp.RA1[0].APPL_IND;//C_Appl_Ind
            window.REV_ID = Detemp.RA1[0].REV_ID;//Mis_Rev_Id
            window.NA_BNQ_POST_IND = Detemp.RA2[0].NA_BNQ_POST_IND;//C_NA_BNQ_POST_IND
            window.C_NM = Detemp.RA3[0].C_NM;//strVouchPrintPrgNm
            window.P_IND = Detemp.RA3[0].P_IND;//Curappl
            window.J3_IND = Detemp.RA3[0].J3_IND;//vPrintDef
            window.U1_IND = Detemp.RA3[0].U1_IND;//Dep_Appl
            window.VAT_RES_ADV_TAX = Detemp.RA3[0].VAT_RES_ADV_TAX;//DefTaxId
            window.V1_IND = Detemp.RA3[0].V1_IND; //FoGstResAppl
            window.M_TAX = Detemp.RA[0].M_TAX;//GstAppl

            var AccDate = Detemp.RA2[0].CUR_DT;
            var AccDatePic = $("#dateAccount").data("kendoDatePicker");
            AccDatePic.value(AccDate);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}



var LoadAdvance = function (Request, VouchId, CtrlId) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USRID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    reqobj["ID"] = VouchId;
    //if ($("#chkDeposit")[0].checked == true)
        reqobj["CHKDEPOSIT"] = "0";
    //else
    //    reqobj["CHKDEPOSIT"] = "0";

        reqobj["MISC_TY_ID"] = 'H';
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQRes/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            //var Detemp = JSON.parse(d);
            var Contorl_lists = [];
            Contorl_lists = CtrlId;
            var Detemp = JSON.parse(d);
            $.each(Detemp.Itm[0], function (key, Value) {
                $.each(Contorl_lists, function (key1, Value1) {
                    var dataid = Value1.Dataids;

                    if (dataid == key) {
                        if (Value1.Type == 'text')
                            $("#" + Value1.Id).val(Detemp.Itm[0][dataid]);

                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                            //debugger;
                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                            ddl.value(convert(Detemp.Itm[0][dataid]));
                        }

                        if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
                            if (Detemp.Itm[0][dataid] == "" || Detemp.Itm[0][dataid] == null)
                                $("#" + Value1.Id)[0].checked = true;
                            else
                                $("#" + Value1.Id)[0].checked = false;
                        }
                    }
                });
            });
            
            $("#txtAvailAdvance").val(Detemp.Amt)
            $("#txtAdvanceNarr").val(Detemp.Itm[0].NARRATION);


            var PayMode = Detemp.Itm[0].SETL_MODE_ID;

            var ddlPayMode = $("#ddlPayMode").data("kendoDropDownList");
            ddlPayMode.value(PayMode);

            $("#divCreditCard").hide();
            $("#divCmpy").hide();
            $("#divChq").hide();
            $("#divForgin").hide();
            $("#divFundTransfer").hide();
            $("#divPayBill").hide();

            if (PayMode == "2")
            {
                $("#divCreditCard").show();
                $("#txtCCCmpy").val(Detemp.Itm[0].PARTY_NM);
                window.CC_PARTY_ID = Detemp.Itm[0].CC_PARTY_ID;
                $("#txtCCNo").val(Detemp.Itm[0].CC_NO);
                $("#dateExpDt").data("kendoDataPicker").value(Detemp.Itm[0].CC_E_DT);
                $("#txtApprvCode").val();
            }
            else if (PayMode == "3") {
                $("#divCmpy").show();
                $("#txtCompy").val(Detemp.Itm[0].PARTY_NM);
                window.CC_PARTY_ID = Detemp.Itm[0].CC_PARTY_ID;
            }
            else if (PayMode == "5")
            {
                $("#divChq").show();
                $("#txtBankNm").val(Detemp.Itm[0].PARTY_NM);
                window.CC_PARTY_ID = Detemp.Itm[0].CC_PARTY_ID;
                $("#txtChqNo").val(Detemp.Itm[0].CC_NO);
            }
            else if (PayMode == "8")
            {
                $("#divForgin").show();
                var Currency = $("#ddlCurrency").data("kendoDropDownList");
                Currency.value(Detemp.Itm[0].CURRENCY_ID);
                $("#txtConvRate").val(Detemp.Itm[0].CONV_RATE);
                $("#txtFrgnAmt").val(Detemp.Itm[0].FORN_AMT);
            }

            else if (PayMode == "B")
            {
                $("#divFundTransfer").show();
                $("#txtBankName").val(Detemp.Itm[0].PARTY_NM);
                window.CC_PARTY_ID = Detemp.Itm[0].CC_PARTY_ID;
                $("#txtAccNo").val(Detemp.Itm[0].CC_NO);
                var ddlDeposit = $("#ddlDeposit").data("kendoDropDownList");
                ddlDeposit.value();
            }
            else if (PayMode == "Q") {
                $("#divPayBill").show();
                $("#txtPayBillCmpy").val(Detemp.Itm[0].PARTY_NM);
                window.CC_PARTY_ID = Detemp.Itm[0].CC_PARTY_ID;
                $("#txtTranId").val(Detemp.Itm[0].CC_NO);
                $("dateDeposit").data("kendoDatePicker").value(Detemp.Itm[0].CC_E_DT)
                $("#txtBillMob").val();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}
var AdvanceSave = function (Request, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["FormMode"] = Request.Mode;
    reqobj["ListData"] = controlValue;
    reqobj["AvailAmt"] = $("#txtAvailAdvance").val();
    var AccDatePic = $("#dateAccount").data("kendoDatePicker");
    reqobj["Acc_Dt"] = convert(AccDatePic.value());
    reqobj["MISC_TY_ID"] = 'H';
    var VouchNo = $("#ddlAdvVoucherRefund").data("kendoDropDownList");
    reqobj["ID"] = VouchNo.value();
    reqobj["NARRATION"] = $("#txtAdvanceNarr").val();
    reqobj["CHKDEPOSIT"] = "0";
        var PayMode = $("#ddlPayMode").val();
        reqobj["PayMode"] = PayMode;
        reqobj["CC_PARTY_ID"] = CC_PARTY_ID;
        if (PayMode == "2") {
            reqobj["PARTY_NM"] = $("#txtCCCmpy").val();
            var CCno = $("#txtCCNo").val();
            reqobj["CC_NO"] = CCno.substring(CCno.length-4, CCno.length);
            reqobj["CC_E_DT"] = convert($("#dateExpDt").data("kendoDataPicker").value());
            reqobj["TT_ID"] = CCno;
                $("#txtApprvCode").val();
        }
        else if (PayMode == "3") {
            reqobj["PARTY_NM"] = $("#txtCompy").val();
        }
        else if (PayMode == "5") {
            reqobj["PARTY_NM"] = $("#txtBankNm").val();
            reqobj["CC_NO"] = $("#txtChqNo").val();
        }
        else if (PayMode == "8") {
            var Currency = $("#ddlCurrency").data("kendoDropDownList");
            reqobj["CURRENCY_ID"] = Currency.value();
            reqobj["CONV_RATE"] = $("#txtConvRate").val();
            reqobj["FORN_AMT"] = $("#txtFrgnAmt").val();
        }
        else if (PayMode == "B") {
            reqobj["PARTY_NM"] = $("#txtBankName").val();
            reqobj["CC_NO"] = $("#txtAccNo").val();
            var ddlDeposit = $("#ddlDeposit").data("kendoDropDownList");
            reqobj["DEPOSIT"] = ddlDeposit.value();
        }
        else if (PayMode == "Q") {
            reqobj["PARTY_NM"] = $("#txtPayBillCmpy").val();
            reqobj["CC_NO"] = $("#txtTranId").val();
            reqobj["DEPOSIT"] = $("dateDeposit").data("kendoDatePicker").value();
            reqobj["BILL_MOB"] = $("#txtBillMob").val();
        }
    
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/BQRes/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            if (Detemp == "SUCCESS") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/SaveImage.png');
                $("#AlertPoptxt").text("Saved Sucessfully.");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").show();
                $("#btnpopAlertcan").hide();
            }
            else if (Detemp == "FAILURE" || Detemp == "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text("Operation Failed!");
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
            else if (Detemp != "") {
                $("#AlertImg").show();
                $("#AlertImg").attr('src', '../Images/AlertImage.png');
                $("#AlertPoptxt").text(Detemp);
                $("#DivAlertPopup").modal('show');
                $("#btnpopAlertOk").hide();
                $("#btnpopAlertcan").show();
            }
        }
    });
}

var ARRV =($("#PurMainGrd").data("kendoGrid").dataSource.data()[i].ARRV);
if((ARRV != "") && (ARRV != null))
{
    var dfasd = ARRV.toString();
    if(dfasd.length >15)
        newrw["ARRV"] = convert(MainGrd[i].ARRV);
    else
        newrw["ARRV"] = (MainGrd[i].ARRV); 
}

 

function convert(str) {
    debugger;
    var cndt = window.datafor;
    var date = new Date(str),

    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [ day, mnth, date.getFullYear()].join("/");
    }



var GridResPop = function () {
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BLOCK_RESERVE_NO: { validation: { required: true }, type: "string" },
                    GUEST_NM: { type: "string" },
                    FUNCTION_NM: { type: "string" },
                    VENUE_NM: { type: "string" },
                    VENUE_ID: { type: "string" },
                    GUEST_TYPE: { type: "string" },
                    GUEST_TYPE_NM: { type: "string" },
                    NARRATION: { type: "string" }
                }
            }
        },
    });

    $("#CmnGrid").kendoGrid({
        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
        columns: [
            {
                field: "BLOCK_RESERVE_NO", title: 'Reservation No', width: 20, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "GUEST_NM", title: 'Guest Name', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
             {
                 field: "FUNCTION_NM", title: 'Function Id', width: 100, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
            {
                field: "VENUE_NM", title: 'Venue Name', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
              
        ],
        //header
        editable: false,
    });
}