
var SettLoad = function (Request, Contorl_lists, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',
    data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);

            $.each(Detemp.Sett[0], function (key, Value) {
                $.each(Contorl_lists, function (key1, Value1) {
                    var dataid = Value1.Dataids;

                    if (dataid == key) {
                        if (Value1.Type == 'text')
                            $("#" + Value1.Id).val(Detemp.Sett[0][dataid]);

                        if (Value1.Type == 'dropdownlist' || Value1.Type == undefined) {
                            var ddl = $("#" + Value1.Id).data("kendoDropDownList");
                            ddl.value(Detemp.Sett[0][dataid]);
                        }

                        if (Value1.Type == 'radio' || Value1.Type == 'checkbox') {
                            if (Detemp.Sett[0][dataid] == "1")
                                $("#" + Value1.Id)[0].checked = true;
                            else
                                $("#" + Value1.Id)[0].checked = false;
                        }

                        if (dataid == "E2_IND") {
                            if (Detemp.Sett[0]["E2_IND"] != "") $("#chkCon")[0].checked = true; else $("#chkTmp")[0].checked = true;
                        }

                        if (dataid == "E2_IND") {
                            if (Detemp.Sett[0]["E2_IND"] != "") $("#chkCon")[0].checked = true; else $("#chkTmp")[0].checked = true;
                        }

                        if (dataid == "COUP_ID") {
                            if (Detemp.Sett[0]["COUP_ID"] == "") { $("#txtCpnType").hide(); $("#txtCpnType").val(''); }
                            else { $("#txtCpnType").val(Detemp.Sett[0]["COUP_ID"]); $("#txtCpnType").show(); }
                        }

                        if (dataid == "DYN_CAP2" || dataid == "DYN_CAP3" || dataid == "DYN_CAP4" || dataid == "DYN_CAP1") {
                            if (Detemp.Sett[0]["DYN_CAP1"] != "" && Detemp.Sett[0]["DYN_CAP1"] != null)
                            { $("#chkDynCap1")[0].checked = true; $("#txtDynCap1").show(); }
                            else { $("#chkDynCap1")[0].checked = false; $("#txtDynCap1").val(""); $("#txtDynCap1").hide(); };

                            if (Detemp.Sett[0]["DYN_CAP2"] != "" && Detemp.Sett[0]["DYN_CAP2"] != null) { $("#chkDynCap2")[0].checked = true; $("#txtDynCap2").show(); }
                            else { $("#chkDynCap2")[0].checked = false; $("#txtDynCap2").val(""); $("#txtDynCap2").hide(); };

                            if (Detemp.Sett[0]["DYN_CAP3"] != "" && Detemp.Sett[0]["DYN_CAP3"] != null)
                            { $("#chkDynCap3")[0].checked = true; $("#txtDynCap3").show(); }
                            else { $("#chkDynCap3")[0].checked = false; $("#txtDynCap3").val(""); $("#txtDynCap3").hide(); };

                            if (Detemp.Sett[0]["DYN_CAP4"] != "" && Detemp.Sett[0]["DYN_CAP4"] != null) { $("#chkDynCap4")[0].checked = true; $("#txtDynCap4").show(); }
                            else { $("#chkDynCap4")[0].checked = false; $("#txtDynCap4").val(""); $("#txtDynCap4").hide(); };
                        }

                        if (Detemp.Sett[0]["K2_IND"] == "1")
                            $("#chkTaxIn")[0].checked = true; else $("#chkTaxIn")[0].checked = false;

                        if (Detemp.Sett[0]["I3_iND"] == "1")
                        { $("#chktaxinclu")[0].checked = true; change_chktaxinclu(); } else { $("#chktaxinclu")[0].checked = false; change_chktaxinclu(); }
                        
                        
                    }
                });
            });

            $("#chkVen")[0].checked = false;
            $("#chkCom")[0].checked = false;
            $("#chkNB")[0].checked = false;

            if (Detemp.Sett[0]["O2_IND"] == "1")
                $("#chkVen")[0].checked = true;
            else if (Detemp.Sett[0]["O2_IND"] == "2")
                $("#chkCom")[0].checked = true;
            else if (Detemp.Sett[0]["O2_IND"] == "3")
                $("#chkNB")[0].checked = true;

            if (Detemp.Sett[0]["P4_IND"] == "" || Detemp.Sett[0]["P4_IND"] == null)
                $("#chkFunProf")[0].checked = false;
            else
                $("#chkFunProf")[0].checked = true;

            if (Detemp.Sett[0]["L2_IND"] == "" || Detemp.Sett[0]["L2_IND"] == null)
                $("#chkPrBill")[0].checked = false;
            else
                $("#chkPrBill")[0].checked = true;

            if (Detemp.Sett[0]["E2_IND"] == "")
                $("#chkCon")[0].checked = true;
            else
                $("#chkTmp")[0].checked = true;

            if (Detemp.Sett[0]["P3_IND"] == "1")
                $("#chkflash")[0].checked = true;
            else
                $("#chkvqry")[0].checked = true;

            if (Detemp.Sett[0]["H_IND"] == "1")
                $("#chkDiplAppl")[0].checked = true;
            else
                $("#chkZeroTaxAppl")[0].checked = true;

            if (Detemp.Sett[0]["E2_IND"] == "1")
                $("#chkTmp")[0].checked = true;
            else
                $("#chkCon")[0].checked = true;

            if (Detemp.Sett[0]["D3_iND"] == "1")
                $("#chkAT")[0].checked = true;
            else
                $("#chkET")[0].checked = true;

            var Dep_Appl = Detemp.Sett[0]["U1_IND"];
            var CasheringAppl = Detemp.Sett[0]["A1_IND"];
            var BillFornAppl = Detemp.Sett[0]["C1_IND"];
            var FeedBkAppl = Detemp.Sett[0]["D1_IND"];
            var BanqInfAppl = Detemp.Sett[0]["E1_IND"];
            var AdvValAppl = Detemp.Sett[0]["F1_IND"];
            var GpaxValAppl = Detemp.Sett[0]["G1_IND"];
            var MinPaxValAppl = Detemp.Sett[0]["H1_IND"];
            var TentCutoffAppl = Detemp.Sett[0]["I1_IND"];
            var PlnValAppl = Detemp.Sett[0]["J1_IND"];
            var StageSetAppl = Detemp.Sett[0]["X3_IND"];
            var GLPostDtAppl = Detemp.Sett[0]["Y3_IND"];

            if (BanqInfAppl == "1") $("#divBqInterface").show(); else $("#divBqInterface").hide();
            if ($.trim(Detemp.Sett[0]["O3_IND"]) == "1" && BanqInfAppl == "1") $("#divBqInterfaceTax").show(); else $("#divBqInterfaceTax").hide();

            //Last Koc No 
            $("#txtLstKot").val(Detemp.KotNo[0].D_SNO);
            //Last Nc-Koc No 
            $("#txtLstNcKot").val(Detemp.KotNo[0].A_SNO);

            //Bill No 
            $("#txtnumbLastBillNo").val(Detemp.BillNo[0].DISP_SNO);
            //Nc-Bill No 
            $("#txtnumbLastNCBillNo").val(Detemp.BillNo[0].A_SNO);

            if(GLPostDtAppl == "1")
            {
                $("#divGlDt").show();
                $("#divGlNm").show();
            }
            else
            {
                $("#divGlDt").hide();
                $("#divGlNm").hide();
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var SettSave = function (Request, Glurl, controlValue) {
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["ListData"] = controlValue;

    if ($("#chkVen")[0].checked == true)
        reqobj["O2_IND"] = "1";
    else if ($("#chkCom")[0].checked == true)
        reqobj["O2_IND"] = "2";
    else if ($("#chkNB")[0].checked == true)
        reqobj["O2_IND"] = "3";
    else
        reqobj["O2_IND"] = null;

    if ($("#chkvqry")[0].checked == true)
        reqobj["P3_IND"] = null;
    else if ($("#chkflash")[0].checked == true)
        reqobj["P3_IND"] = "1";

    if ($("#chkDiplAppl")[0].checked == true)
        reqobj["H_IND"] = "1";
    else if ($("#chkZeroTaxAppl")[0].checked == true) 
        reqobj["H_IND"] = "2";

    if ($("#chkTmp")[0].checked == true)
        reqobj["E2_IND"] = "1";
    else if ($("#chkCon")[0].checked == true)
        reqobj["E2_IND"] = null;

    if ($("#chkAT")[0].checked == true)
        reqobj["D3_IND"] = "1";
    else if ($("#chkET")[0].checked == true)
        reqobj["D3_IND"] = null;

    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
    url: "/BQMaster/API_CALL",
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

//Load Default Indicator settings
var preDefIndsettingsLoad = function (Request, Contorl_lists, Glurl)
{
    var reqobj = {};
    //debugger;
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    reqobj["FormMode"] = Request.Mode;
    //debugger;
    reqobj["ListData"] = encodeURIComponent(Contorl_lists);
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQMaster/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
           debugger;
            var Detemp = JSON.parse(d);
            if (Detemp.CLM_IND == "1" && Detemp.CREDIT_IND == "1")
                $("#divCreditCouppon").show();
            else
                $("#divCreditCouppon").hide();
        }
    });
}



function GetPageControlls(divClass) {
    var Contorl_lists = [];

    $.unique($("#" + divClass).find("div[id^=ddl], :text, :checkbox,:radio")).each(function (e) {
        // //debugger;
        var controlValue = {};

        var $this = this;
        var dataids = $this.attributes['data-id'];
        controlValue.Id = this.id;

        if (dataids != undefined)
            controlValue.Dataids = $this.attributes['data-id'].nodeValue;
        else controlValue.Dataids = "";
        controlValue.Type = this.type;
        Contorl_lists.push(controlValue);
    });
}



