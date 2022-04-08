var app = angular.module('ARTApp', ['webix']);

app.controller("ARTransController", function ($scope) {

    var searchicon = "<span class='fa fa-search'></span>";

    var dataProp = fnPropertyLoad();
    fnLoadMstCompany();

    var GrdCol1 = "";
    //Loading Grid Combo data
    var ddlTypeData = [{ "id": "1", "value": "New Ref" }, { "id": "2", "value": "Advance" }, { "id": "3", "value": "Against Ref" }];

    var ddlMonth = [{ "id": "01", "value": "01" }, { "id": "02", "value": "02" }, { "id": "03", "value": "03" }, { "id": "04", "value": "04" }, { "id": "05", "value": "05" },
    { "id": "06", "value": "06" }, { "id": "07", "value": "07" }, { "id": "08", "value": "08" }, { "id": "09", "value": "09" }, { "id": "10", "value": "10" }, { "id": "11", "value": "11" },
    { "id": "12", "value": "12" }];


    var ddlyear = [{ "id": "2020", "value": "2020" }, { "id": "2021", "value": "2021" }, { "id": "2022", "value": "2022" }, { "id": "2023", "value": "2023" }, { "id": "2024", "value": "2024" },
  { "id": "2025", "value": "2025" }, { "id": "2026", "value": "2026" }, { "id": "2027", "value": "2027" }, { "id": "2028", "value": "2028" }, { "id": "2029", "value": "2029" }, { "id": "2030", "value": "2030" },
  { "id": "2031", "value": "2031" }];

    $scope.ddlProperty = {
        view: "richselect",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disable: false,
        labelwidth: 130,
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {

                $("#hdnCompId").val(newval);

                var curData = fnLoadCurrency("");
                $$("ddlCurrency").setValue(curData);

                var TrnTydata = fnTrnTypeLoad("");
                $$("ddlTrnType").setValue(TrnTydata);

                var VPostDt = fnPageLoad();
                $$("txtVoucherDt").setValue(VPostDt);
                $$("txtRefDt").setValue(VPostDt);

                var LoadPartydata = fnPartyLoaddata("");
                $$("SrchParty").options(LoadPartydata);

                var LoadDbLnkydata = fnCrDrAccount();
                $$("SrchDebitAcc").options(LoadDbLnkydata);
            }
        }
    }

    $scope.txtVoucherNo = {
        view: "text",
        id: "txtVoucherNo",
        //value: "0",
        label: "Vouch No",
        inputWidth: 200,
        labelWidth: 100,
        labelAlign: "Right",
        width: 200,
        on: {
            onKeyPress: function (code, evt) {

                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
                return true;
            }
        }
    }

    $scope.lblDetTotal = {
        view: "label",
        id: "lblDetTotal",
        //value: "0",
        label: "Total",
    }

    $scope.lblAcc = {
        view: "label",
        id: "lblAcc",
        //value: "0",
        label: "Credit",
    }
    
    $scope.txtDetTot = {
        view: "label",
        id: "txtDetTot",
        //value: "0",
        label: "0.00",
    }


    var curData = fnLoadCurrency("");
    $scope.ddlCurrency = {
        view: "richselect",
        id: "ddlCurrency",
        value: $("#hdnBaseCurrId").val(),
        label: "Currency",
        disable: true,
        inputWidth: 280,
        labelWidth: 100,
        options: curData,
        labelAlign: "Right",
        width: 280,
        on:
            {
                "onChange": function () {
                    fnLoadCurrency($$("ddlCurrency").getValue());
                    $$("txtConvFac").disable();

                    fnArControlLoad();

                    if ($.trim($("#MultiCurInd").val()) == "1") {
                        if ($("#hdnBaseCurrId").val() != $$("ddlCurrency").getValue())
                            $$("txtConvFac").show();
                    }
                    else {
                        $$("txtConvFac").hide();
                    }
                }
            }
    }

    var TrnTydata = fnTrnTypeLoad("");
    $scope.ddlTrnType = {
        view: "richselect",
        id: "ddlTrnType",
        //value: "0",
        label: "Trn Type",
        disable: true,
        inputWidth: 250,
        labelWidth: 100,
        options: TrnTydata,
        labelAlign: "Right",
        width: 300,
        on:{
            "onChange": function () {
                fnTrnTypeLoad($$("ddlTrnType").getValue());

                $("#hdnTrnTyId").val($$("ddlTrnType").getValue());
                fnArControlLoad();

                var ColumnConf = $$("grdDbtsAcc").config.columns;
                ColumnConf.splice(0, 1);
                $$("grdDbtsAcc").refreshColumns();

                if ($("#hdnDrCrInd").val() == "1") {
                    $("#lblCrDr").text("Debit");
                    $$("SrchDebitAcc").config.label = "Credit Account";
                    $$("SrchDebitAcc").refresh();
                 
                    ColumnConf.splice(0, 0, {
                        header: "Credit Account", id: "AC_NM", width: 300, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' },
                    });
                    $$("grdDbtsAcc").refreshColumns();
                }
                else {
                    $("#lblCrDr").text("Credit");
                    $$("SrchDebitAcc").config.label = "Debit Account";
                    $$("SrchDebitAcc").refresh();
                  
                    ColumnConf.splice(0, 0, {
                        header: "Debit Account", id: "AC_NM", width: 300, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' },
                    });
                    $$("grdDbtsAcc").refreshColumns();
                }

                if ($("#hdnVouchNoInd").val() == "1") {
                    $$("txtVoucherNo").disable();
                }
                else
                {
                    $$("txtVoucherNo").enable();
                }
                if ($("#hdnRefInd").val() == "1") {
                    $$("txtRefNo").show();
                    $$("txtRefDt").show();
                }
                else {
                    $$("txtRefNo").hide();
                    $$("txtRefDt").hide();
                }

                $$("SrchDebitAcc").setValue($("#hdnDefAltAcId").val())

                if ($("#hdnMode").val() == "N") {
                    $$("grdARTrans").clearAll();
                    $$("grdARTrans").refresh();
                    AddDetailsRowNew();
                    fnLoadCurrency($$("ddlCurrency").getValue());
                }
            }
        },
    }

    var VPostDt = fnPageLoad();
    $scope.txtVoucherDt = {
        view: "datepicker",
        id: "txtVoucherDt",
        disable: true,
        stringResult: true,
        label: "Voucher Dt",
        format: "%d/%m/%Y",
        value: VPostDt,
        labelAlign: "Right",
        inputWidth: 230,
        labelWidth: 100,
        width: 300,
    };

    $scope.txtRefDt = {
        view: "datepicker",
        id: "txtRefDt",
        disable: true,
        stringResult: true,
        label: "Ref Dt",
        format: "%d/%m/%Y",
        value: VPostDt,
        labelAlign: "Right",
        inputWidth: 230,
        labelWidth: 100,
        width: 300,
    };

    var LoadPartydata = fnPartyLoaddata("");
    $scope.SrchParty = {
        view: "richselect",
        id: "SrchParty",
        value: "",
        label: "Customer",
        disable: false,
        labelAlign: "Right",
        labelWidth: 100,
        width: 420,
        options: LoadPartydata,
        on: {
            "onChange": function () {
                fnPartyLoaddata($$("SrchParty").getValue());
            }
        }
    }

    var LoadDbLnkydata = fnCrDrAccount();
    $scope.SrchDebitAcc = {
        view: "richselect",
        id: "SrchDebitAcc",
        value: "",
        label: "Credit A/C",
        labelAlign: "Right",
        disable: false,
        labelWidth: 100,
        width: 420,
        options: LoadDbLnkydata,
        on: {
            onChange: function (newval, oldval) {

                var Filter1 = LoadDbLnkydata.filter(function (LoadDbLnkydata) {
                    return LoadDbLnkydata.id == $.trim(newval);
                });

                if (Filter1.length > 0) {
                    if ($.trim(Filter1[0].A_IND) == "1") {
                        $$("txtCCNo").show();
                        $$("ExpMM").show();
                        $$("ExpYY").show();
                        $("#hdnCCInd").val("1")
                    }
                    else {
                        $$("txtCCNo").hide();
                        $$("ExpMM").hide();
                        $$("ExpYY").hide();
                        $("#hdnCCInd").val("0")
                    }
                }
            }
        }
    }

    $scope.txtRefNo = {
        view: "text",
        id: "txtRefNo",
        disable: true,
        label: "Ref No",
        inputWidth: 200,
        labelWidth: 100,
        labelAlign: "Right",
        width: 300,
    };

    $scope.txtConvFac = {
        view: "text",
        id: "txtConvFac",
        disabled: true,
        label: "Conv Factor",
        inputWidth: 230,
        labelWidth: 100,
        hidden:true,
        labelAlign: "Right",
        width: 300,
    };

    $scope.txtNarr = {
        view: "text",
        id: "txtNarr",
        disable: true,
        label: "Narration",
        inputWidth: 800,
        labelWidth: 100,
        labelAlign: "Right",
        width: 900,
    };

    $scope.txtCCNo = {
        view: "text",
        id: "txtCCNo",
        label: "Credit Card No",
        inputWidth: 370,
        labelWidth: 100,
        labelAlign: "Right",
        hidden: true,
        width: 370,
        attributes: { maxlength: 17 },
        on: {
        onKeyPress: function (code, evt) {
            debugger;
            //var charCode = (evt.which) ? evt.which : event.keyCode

            //if (charCode != 46 && charCode > 31
            //  && (charCode < 48 || charCode > 57))
            //    return false;

            //return true;
        }
    }
    };

    $scope.btnCCIcon = {
        view: "button",
        id: 'btnCmpSrch',
        minWidth: 250,
        labelWidth: 0,
        width: 30,
        height: 28,
        type: 'icon',
        icon: 'wxi-eye',
        css: "Ar_search",
        hidden:true,
        on: {
            onItemClick: function () {
                fnPopupPass();
            }
        }
    },

    $scope.ExpMM = {
        view: "richselect",
        id: "ExpMM",
        value: "",
        label: "Expiry Month",
        disable: false,
        labelAlign: "Right",
        labelWidth: 100,
        width: 160,
        options: ddlMonth,
        value: "",
        hidden:true,
        on: {
            "onChange": function () {
            }
        }
    }

    $scope.ExpYY = {
        view: "richselect",
        id: "ExpYY",
        value: "",
        label: "Year",
        disable: false,
        labelAlign: "Right",
        labelWidth: 38,
        inputWidth: 130,
        width: 150,
        options: ddlyear,
        hidden: true,
        on: {
            "onChange": function () {
            }
        }
    }

    $scope.ChkOtherDed = {
        view: "checkbox",
        id: "ChkOtherDed",
        disable: true,
        label: "Other Deduction",
        labelWidth: 130,
        labelAlign: "Right",
        width:360,
        on: {
            "onChange": function () {
                if ($$("ChkOtherDed").getValue() == "1") {
                    $("#divCrDrAcc").show();

                    if ($("#hdnMode").val() == "N") {
                        AddNewCrDrRow();
                        //$("#btndbRowAdd").show();
                        //$("#btndbRowDel").show();
                    }
                }
                else {
                    $("#divCrDrAcc").hide();
                    //$("#btndbRowAdd").hide();
                    //$("#btndbRowDel").hide();
                }
            }
        }
    };

    $scope.grdARTrans = {
        view: "datatable",
        id: "grdARTrans",
        select: "row",
        css: "common_grd",
        disable: true,
        data: [],
        editable: true,
        height: 180,
        columns: [
                { header: "Type", id: "TrnTyId", width: 100, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlTypeData; } },
               { header: "Ref Nm", id: "RefNM", width:180 , editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
               { header: "Due.Date", id: "DueDt", width: 90, css: { 'text-align': 'left ! important' }, editor: 'date', stringResult: true,  format: webix.Date.dateToStr("%d/%m/%Y"),  },
               { header: "Amt", id: "Amt", width: 100, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' } },
               { header: "D/C", id: "DrCrInd", width: 60, css: { 'text-align': 'left ! important' } },
               { header: "YYMM", id: "YYMM", hidden: true },
        ],
        on: {
            'onItemClick': function (editor) {
                var getval = this.getItem(editor.row);

                if (editor.column == "RefNM") {
                    if (getval.TrnTyId == "") {
                        AlertMessage('Type Cannot be empty');
                        return false;
                    }
                }
                if (editor.column == "Amt") {
                    if (getval.RefNM == "") {
                        AlertMessage('Ref Name Cannot be empty');
                        return false;
                    }
                }
            },
            'onBlur': function () {
                $$("grdARTrans").refresh();
            },
            'onEditorChange': function (id, value) {
                var getval = this.getItem(id.row);

                if (id.column == 'TrnTyId') {

                    if ($.trim(value) == "1") {
                        if ($("#hdnDrCrInd").val() == "1") 
                            getval.DrCrInd = "Dr";
                        else
                            getval.DrCrInd = "Cr";
                        $$("grdARTrans").refresh();
                    }
                    else if ($.trim(value) == "2") {
                        if ($("#hdnDrCrInd").val() == "1")
                            getval.DrCrInd = "Dr";
                        else
                            getval.DrCrInd = "Cr";
                        $$("grdARTrans").refresh();
                    }
                    else if ($.trim(value) == "3") {

                        if ($.trim($$("SrchParty").getValue()) == "") {
                            AlertMessage('Party Cannot be empty');
                            return false;
                        }
                        else {
                            getval.DrCrInd = "";
                            //fnPendingBillsLoad();
                            //$('#divPendingBills').modal('show');
                            fnPrcLoadPendingPopup();
                        }
                    }
                }
            },
            'onAfterEditStop': function (state, editor) {
                if (editor.column == 'Amt') {
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        getval.Amt = parseFloat(state.value).toFixed(2);
                    }
                    $$("grdARTrans").refresh();
                    var data = $$("grdARTrans").serialize();
                    var lenval = data.length;
                    var TotAmt = 0;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].TrnTyId != "") {
                                var vVal = data[i].Amt;
                                TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
                            }
                        }
                    }

                    //$("#txtTot").text(parseFloat(TotAmt).toFixed(2));
                    $$("txtDetTot").setValue(parseFloat(TotAmt).toFixed(2));
                }
            },
        }
    };

    $scope.grdDbtsAcc = {
        view: "datatable",
        id: "grdDbtsAcc",
        css: "common_grd",
        select: "row",
        disable: true,
        editable: true,
        data: [],
        height: 100,
        width: 450,
        columns: [
               { header: "AcId", id: "AC_CD", hidden: true },
               { header: "Credit Account", id: "AC_NM", width: 300, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
               { header: "", id: "AcSrch", width: 30, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
               { header: "Amount", id: "AMOUNTS", width: 100, editor: 'text' ,liveEdit: true, css: { 'text-align': 'right ! important' } },
        ],
        on: {
            'onItemClick': function (id, index) {
                var getval = this.getItem(id.row);

                if (id.column == "AMOUNTS") {
                    if (getval.AccNm == "") {
                        AlertMessage('AccNm Cannot be empty');
                        return false;
                    }
                }

                if (id.column == "AcSrch") {

                    PrcLoadAcountSrchPopup();
                }
            },
            'onAfterEditStop': function (state, editor) {
                if (editor.column == 'AMOUNTS') {
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        getval.AMOUNTS = parseFloat(state.value).toFixed(2);
                    }
                    $$("grdDbtsAcc").refresh();
                    var data = $$("grdDbtsAcc").serialize();
                    var lenval = data.length;
                    var TotAmt = 0;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].AC_CD != "") {
                                var vVal = data[i].AMOUNTS;

                                TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
                            }
                        }
                    }

                    $("#txtDbTot").text(parseFloat(TotAmt).toFixed(2));
                }
            },
        }
    };
    });

    function fnTrnTypeLoad(TrnTyIds) {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_TRNTYPE";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["TrnType"] = $.trim(TrnTyIds);
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);

                    $("#hdnDrCrInd").val($.trim(rowData[0].DRCR_IND));
                    $("#hdnVouchNoInd").val($.trim(rowData[0].VOUCH_NO_IND));

                    $("#hdnRefInd").val($.trim(rowData[0].REF_IND));
                    $("#hdnRefNM").val($.trim(rowData[0].REF_NM));

                    $("#hdnDefAltAcId").val($.trim(rowData[0].DEF_ALT_AC_CD));

                    if (rowData[0].REF_IND != null && rowData[0].REF_IND != "") {

                        $$("txtRefNo").define('label', $.trim(rowData[0].REF_NM) + " No");
                        $$("txtRefNo").refresh();

                        $$("txtRefDt").define('label', $.trim(rowData[0].REF_NM) + " Dt");
                        $$("txtRefDt").refresh();
                    }
                }
            },
        });
        return rowData;
    }

    function fnPropertyLoad() {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
        dataparam["COMPID"] = "";
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);
                    $("#hdnCompId").val("WS");
                }
            },
        });
        return rowData;
    }

    function fnPendingBillsLoad() {
        var dataparam = {};
        dataparam["REQTYPE"] = "GET_ARPENDINGBILLSLOAD";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["PartyId"] = $.trim($$("SrchParty").getValue());
        dataparam["PartyTyid"] = $("#PartyTyId").val();
        dataparam["hdnDrCrInd"] = $("#hdnDrCrInd").val();
    
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    var rowData = JSON.parse(d);
                    $$("grdPendingBills").clearAll();
                    $$("grdPendingBills").parse(rowData);
                    $$("grdPendingBills").refresh();
                }
            },
        });
    }

    function fnPartyLoaddata(Partyid) {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_ARPARTYSEARCH";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["Partyid"] = Partyid;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);

                    if ($.trim(Partyid) != "")
                        $("#PartyTyId").val($.trim(rowData[0].PARTY_TY_ID));
                }
            },
        });
        return rowData;
    }

    function fnCrDrAccount() {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_ARGLACCSRCH";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["TrnType"] = $("#hdnTrnTyId").val();

        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
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

    function fnLoadMstCompany() {
        var dataparam = {};
        var rowData = "";
        var PostDt = "";
        dataparam["REQTYPE"] = "GET_MSTCOMPANY";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);
                    $("#hdnBaseCurrId").val(rowData[0].BASE_CURRENCY_ID);

                }
            },
        });
        return rowData;
    }

    function fnPageLoad() {
        var dataparam = {};
        var rowData = "";
        var PostDt = "";
        dataparam["REQTYPE"] = "GET_DEFAULTDT";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData  = JSON.parse(d);
                    //$$("txtVoucherDt").setValue(rowData[0].CURRDT);
                    //$$("txtRefDt").setValue(rowData[0].CURRDT);

                    rowData = rowData[0].CURRDT;
                }
            },
        });
        return rowData;
    }


    function fnArControlLoad() {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_ARCONTROL";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);

                    $("#MultiCurInd").val($.trim(rowData[0].MULTI_CUR_IND));

                    if ($.trim(rowData[0].MULTI_CUR_IND) == "1") {
                        $$("ddlCurrency").show();

                        if ($("#hdnBaseCurrId").val() != $$("ddlCurrency").getValue())
                            $$("txtConvFac").show();
                    }
                    else
                    {
                        $$("ddlCurrency").hide();
                        $$("txtConvFac").hide();
                    }
                }
            },
        });
    }


    function fnLoadCurrency(CurrIds) {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_MSTCURRENCY";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["CurrId"] = CurrIds;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);

                    if($.trim(CurrIds)!="")
                        $$("txtConvFac").setValue(parseFloat(rowData[0].SALE_CONV_RATE));
                }
            },
        });
        return rowData;
    }

    function fnLoadVoucherLoad() {
        var rowDatad = "";
        var dataparam = {};
        dataparam["REQTYPE"] = "GET_ARTRNOPEN";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["VouchNo"] = "";
        dataparam["TrnType"] = $$("ddlTrnType").getValue();
        var dataparam = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (dt) {
                rowDatad = JSON.parse(dt);
                $$("grdVouchSrch").clearAll();
                $$("grdVouchSrch").parse(rowDatad);
                $$("grdVouchSrch").refresh();
            },
        });
    }

    function AddDetailsRowNew() {
        $$("grdARTrans").refresh();
        var data = $$("grdARTrans").serialize();
        var lenval = data.length;
        var indx = "";
        if (lenval != 0) {
            for (i = 0; i < lenval; i++) {
                indx = i;
                if (data[i].TrnTyId == "" || data[i].RefNM == "" || data[i].DueDt == "" || data[i].Amt == "") {

                    if (data[i].TrnTyId == "")
                        AlertMessage('Row ' + (i + 1) + ' Trn Type Cannot be Empty');
                    else if (data[i].RefNM == "")
                        AlertMessage('Row ' + (i + 1) + ' RefNM Cannot be Empty');
                    else if (data[i].DueDt == "")
                        AlertMessage('Row ' + (i + 1) + ' Due Date Cannot be Empty');
                    else if (data[i].Amt == "")
                        AlertMessage('Row ' + (i + 1) + ' Amount Cannot be Empty');
                    return false;
                }
            }

            var addrow = {
                TrnTyId: '', RefNM: '', DueDt: '', Amt: '0.00', DrCrInd: '',YYMM:''
            };

            $$("grdARTrans").add(addrow);
            $$("grdARTrans").select($$("grdARTrans").getLastId());

            webix.UIManager.setFocus($$("grdARTrans"));
        }
        else {
            var addrow = {
                TrnTyId: '', RefNM: '', DueDt: '', Amt: '0.00', DrCrInd: '', YYMM: ''
            };

            $$("grdARTrans").add(addrow);
            //$$("grdARTrans").select($$("grdARTrans").getLastId());
            //webix.UIManager.setFocus($$("grdARTrans"));
            var itemval = $$("grdARTrans").getSelectedItem();
     
        }
        $$("grdARTrans").refresh();
    }

    function AddNewCrDrRow() {
        var data = $$("grdDbtsAcc").serialize();
        var lenval = data.length;
        var indx = "";
        if (lenval != 0) {
            for (i = 0; i < lenval; i++) {
                indx = i;
                if (data[i].AC_NM == "" || data[i].AMOUNTS == "") {
                    AlertMessage("empty");
                    return false;
                }
            }
            var addrow = {
                AC_CD: '', AC_NM: '', AMOUNTS: '',
            };

            $$("grdDbtsAcc").add(addrow);
        }
        else {
            var addrow = {
                AC_CD: '', AC_NM: '', AMOUNTS: '',
            };
            $$("grdDbtsAcc").add(addrow);
        }

        $$("grdDbtsAcc").refresh();
    }

    function fnFillArTransData(VouchId) {
        if ($.trim(VouchId) == "") {
            return false;
        }

        var rowData = [];
        var dataparam = {};
        dataparam["REQTYPE"] = "GET_ARTRNOPEN";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["VouchNo"] = $.trim(VouchId);
        dataparam["TrnType"] = $$("ddlTrnType").getValue();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (dt) {
                rowData = JSON.parse(dt);

                if (rowData != "") {

                    $$("txtVoucherNo").setValue(rowData[0].VOUCH_NO);

                    if (rowData[0].VOUCH_DT2 != "")
                        $$("txtVoucherDt").setValue($.trim(rowData[0].VOUCH_DT2));
                    else
                        $$("txtVoucherDt").setValue("");

                    if (rowData[0].DOC_NO != "")
                        $$("txtRefNo").setValue($.trim(rowData[0].DOC_NO));
                    else
                        $$("txtRefNo").setValue("");

                    if (rowData[0].DOC_DT1 != "")
                        $$("txtRefDt").setValue($.trim(rowData[0].DOC_DT1));
                    else
                        $$("txtRefDt").setValue("");

                    if (rowData[0].CURRENCY_ID != "")
                        $$("ddlCurrency").setValue($.trim(rowData[0].CURRENCY_ID));
                    else
                        $$("ddlCurrency").setValue("");

                    if (rowData[0].CONV_RATE != "")
                        $$("txtConvFac").setValue($.trim(rowData[0].CONV_RATE));
                    else
                        $$("txtConvFac").setValue("");

                    if (rowData[0].COM_NARRATION != "")
                        $$("txtNarr").setValue($.trim(rowData[0].COM_NARRATION));
                    else
                        $$("txtNarr").setValue("");

                    if (rowData[0].CC_CHQ_NO != "")
                        $$("txtCCNo").setValue($.trim(rowData[0].CC_CHQ_NO));
                    else
                        $$("txtCCNo").setValue("");

                    $("#hdnCCFullNo").val($.trim(rowData[0].TT_ID));

                    if ($.trim(rowData[0].CC_NARRATION) != "") {

                        var data = $.trim(rowData[0].CC_NARRATION).split('@')

                        var vdate = data[0].split('/')

                        if ($.trim(vdate[1]) != "")
                            $$("ExpMM").setValue($.trim(vdate[1]));
                        else
                            $$("ExpMM").setValue("");

                        if ($.trim(vdate[2]) != "")
                            $$("ExpYY").setValue($.trim($.trim(vdate[2])));
                        else
                            $$("ExpYY").setValue("");

                        $$("btnCmpSrch").show();
                    }

                    if (rowData[0].AC_CD != "") {
                        $("#hdnpartyId").val($.trim(rowData[0].AC_CD));
                        $$("SrchParty").setValue($.trim(rowData[0].AC_CD));
                    }
                    else {
                        $("#hdnpartyId").val("");
                        $$("SrchParty").setValue("");
                    }

                    if (rowData[0].ACCID != "") {
                        $("#hdnAccId").val($.trim(rowData[0].ACCID));
                        $$("SrchDebitAcc").setValue($.trim(rowData[0].ACCID));
                    }
                    else {
                        $("#hdnAccId").val("");
                    }

                    var TrnId = $.trim(rowData[0].TRN_ID);

                    var ParamLst = {};
                    ParamLst["REQTYPE"] = "GET_ARTRNBILLLOAD";
                    dataparam["COMPID"] = $("#hdnCompId").val();
                    ParamLst["TrnIds"] = TrnId;
                    var Params = JSON.stringify(ParamLst);
                    $.ajax({
                        async: false,
                        url: "/ARTrans/API_CALL",
                        type: 'POST',
                        data: "request=" + Params,
                        success: function (dt) {
                            var RetData = JSON.parse(dt);
                            if (RetData != "") {
                                $$("grdARTrans").clearAll();
                                $$("grdARTrans").parse(RetData);
                                $$("grdARTrans").refresh();
                            }
                        },
                    });

                    //=======================================================
                    var data = $$("grdARTrans").serialize();
                    var TotAmt = 0;
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].ddlType != "") {
                                var vVal = data[i].Amt;
                                TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
                            }
                        }
                        //$$("grdARTrans").select($$("grdARTrans").getFirstId());
                        //webix.UIManager.setFocus($$("grdARTrans"));
                        $$("grdARTrans").refresh();

                        //$("#txtTot").text(parseFloat(TotAmt).toFixed(2));
                        $$("txtDetTot").setValue(parseFloat(TotAmt).toFixed(2));
                    }
                    else
                    {
                        AddDetailsRowNew();
                    }

                    var ParamLst = {};
                    ParamLst["REQTYPE"] = "GET_ARCRDBACCOUNT";
                    dataparam["COMPID"] = $("#hdnCompId").val();
                    ParamLst["TrnId"] = $.trim(TrnId);
                    ParamLst["TrnType"] = $$("ddlTrnType").getValue();
                    var Params = JSON.stringify(ParamLst);
                    $.ajax({
                        async: false,
                        url: "/ARTrans/API_CALL",
                        type: 'POST',
                        data: "request=" + Params,
                        success: function (dt) {
                            var RetData = JSON.parse(dt);
                            if (RetData != "") {
                                $$("grdDbtsAcc").clearAll();
                                $$("grdDbtsAcc").parse(RetData);
                                $$("grdDbtsAcc").refresh();
                                //$("#divCrDrAcc").show();
                                //$$("ChkOtherDed").setValue("1");
                            }
                        },
                    });

                    var data = $$("grdDbtsAcc").serialize();
                    var lenval = data.length;
                    var TotAmt = 0;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].AC_CD != "") {
                                var vVal = data[i].AMOUNTS;

                                TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
                            }
                        }
                    }

                    $("#txtDbTot").text(parseFloat(TotAmt).toFixed(2));
                }
            },
        });
    }

    function fnARSaveTrncastion() {
        if (fnArSaveValidate()==false) {
            return false;
        }
  
        var dataparam = {};
        var rowData = "";

        var BillData = $$("grdARTrans").serialize();
        var GrdLen = BillData.length;

        if (GrdLen == 0) {
            AlertMessage('Grid is empty');
            return false;
        }

        var CrDbData = "";

        if ($$("ChkOtherDed").getValue() == "1") {
            CrDbData = $$("grdDbtsAcc").serialize();
            var Grd2Len = CrDbData.length;

            if (Grd2Len == 0) {
                AlertMessage('Grid is empty');
                return false;
            }
        }

        var GridData1 = JSON.stringify(BillData);
        var GridData2 = JSON.stringify(CrDbData);

        dataparam["REQTYPE"] = "GET_ARTRNSAVE";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["Mode"] = $.trim($("#hdnMode").val());
        dataparam["TrnType"] = $.trim($$("ddlTrnType").getValue());
        dataparam["PartyTyId"] = $.trim($("#PartyTyId").val());
        dataparam["PartyId"] = $.trim($$("SrchParty").getValue()); 
        dataparam["VouchNo"] = $.trim($$("txtVoucherNo").getValue());
        dataparam["VouchDt"] = $.trim($$("txtVoucherDt").getValue());
        dataparam["TrnId"] = $.trim($("#hdnVchIdNo").val());
        dataparam["RefNo"] = $.trim($$("txtRefNo").getValue());
        dataparam["RefDate"] = $.trim($$("txtRefDt").getValue());
        dataparam["TotAmt"] = $.trim($$("txtDetTot").getValue());
        dataparam["TotdbAmt"] = $.trim($("#txtDbTot").text());
        dataparam["Currency"] = $.trim($$("ddlCurrency").getValue());
        dataparam["ConvFact"] = $.trim($$("txtConvFac").getValue());
        dataparam["Narration"] = $.trim($$("txtNarr").getValue());
        dataparam["ChkOth"] = $.trim($$("ChkOtherDed").getValue());
        dataparam["CrDrAcId"] = $.trim($$("SrchDebitAcc").getValue());

        dataparam["CCNo"] = $.trim($$("txtCCNo").getValue());
        dataparam["ExpMM"] = $.trim($$("ExpMM").getValue());
        dataparam["ExpYY"] = $.trim($$("ExpYY").getValue());

        dataparam["Trnsgrid1"] = GridData1;
        dataparam["Trnsgrid2"] = CrDbData;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (objRes) {
                if (objRes != "") {
                    rowData = JSON.parse(objRes);

                    if ($.trim(rowData) == "True") {

                        if ($.trim($("#hdnMode").val()) == "N")
                            SuccessMessage('Saved Successfully');
                        else
                            SuccessMessage('Updated Successfully');

                      
                    }
                }
            },
        });
    }

    function fnCallBindPendBills() {
        var setCnt = false;
        var FullData = $$("grdPendingBills").serialize();
        var len = FullData.length;
        if (len > 0) {
            var data = $$("grdARTrans").serialize();
            $$("grdARTrans").clearAll();

            for (i = 0; i < len; i++) {
                if (FullData[i].ChkSelect == 1) {

                    var addrow = {
                        TrnTyId: '3', RefNM: FullData[i].RefNM, DueDt: FullData[i].DueDt, Amt: FullData[i].Amt, DrCrInd: FullData[i].DrCrInd, YYMM: FullData[i].YYMM
                    };
                    $$("grdARTrans").add(addrow);

                    setCnt = true;
                }
            }

            if (setCnt == false) {
                $$("grdARTrans").parse(data);
                AlertMessage('Select Atleast One Record !')
                return false
            }

            $$("grdARTrans").refresh();

            var data = $$("grdARTrans").serialize();
            var lenval = data.length;
            var TotAmt = 0;
            if (lenval != 0) {
                for (i = 0; i < lenval; i++) {
                    if (data[i].TrnTyId != "") {
                        var vVal = data[i].Amt;
                        TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
                    }
                }
            }

            //$("#txtTot").text(parseFloat(TotAmt).toFixed(2));
            $$("txtDetTot").setValue(parseFloat(TotAmt).toFixed(2));
        }

        $$('PopupPendingBills').hide();
    }

    function fnCallRefresh() {
        $$("ddlTrnType").setValue("");
        $$("txtVoucherNo").setValue("");
        $$("txtVoucherDt").setValue("");
        $$("txtRefNo").setValue("");
        $$("txtRefDt").setValue("");
        $$("ddlCurrency").setValue("");
        $$("txtConvFac").setValue("");
    

        $$("SrchDebitAcc").setValue("");
        $("#hdnAccId").val("");
    
        //$("#txtTot").val("0.00");
        $$("txtDetTot").setValue("0.00");

        $$("SrchParty").setValue("");
        $("#hdnpartyId").val("");

        $$("grdARTrans").clearAll();
        $$("grdARTrans").refresh();

        $$("grdDbtsAcc").clearAll();
        $$("grdDbtsAcc").refresh();

        $("txtDbTot").val("");
        $$("txtNarr").setValue("");
        $$("ChkOtherDed").setValue("0");

        $$("txtCCNo").setValue("");
        $$("ExpMM").setValue("");
        $$("ExpYY").setValue("");
    }

    function fnArSaveValidate() {

        if ($$("ddlTrnType").getValue() == "") {
            AlertMessage('Type Cannot be empty');
            return false;
        }

        if ($("#hdnMode").val() == "N") {
            if ($("#hdnVouchNoInd").val() != "1" && $$("txtVoucherNo").getValue() == "") {
                AlertMessage('Vouch No Cannot be empty');
                return false;
            }
        }
        else if ($$("txtVoucherNo").enable() == true && $$("txtVoucherNo").getValue() == "") {
            $$("txtVoucherNo").focus();
            AlertMessage('Vouch No Cannot be empty');
            return false;
        }

        if ($$("txtVoucherDt").getValue() == "") {
            AlertMessage('Vouch Date Cannot be empty');
            return false;
        }
        else
        {
            //Pending
        }

        if ($$("SrchParty").getValue() == "") {
            AlertMessage('Party Cannot be empty');
            return false;
        }

        if ($$("SrchDebitAcc").getValue() == "") {
            AlertMessage('Debit Account Cannot be empty');
            return false;
        }

        if ($("#hdnRefInd").val() == "1") {
            if ($$("txtRefNo").getValue() == "") {
                AlertMessage($("#hdnRefNM").val() + ' No Cannot be empty');
                return false;
            }

            if ($$("txtRefDt").getValue() == "") {
                AlertMessage($("#hdnRefNM").val() + ' Date Cannot be empty');
                return false;
            }
        }

        //Validating the Details Grid
        var data = $$("grdARTrans").serialize();
        var lenval = data.length;
        if (lenval != 0) {
            for (i = 0; i < lenval; i++) {
                if (i == 0 && data[i].TrnTyId == "" && data[i].Amt == "0.00") {
                    AlertMessage('No Record Exist');
                    return false;
                }
                else if (data[i].DueDt == "") {
                    AlertMessage('Due date Cannot be Empty !');
                    return false;
                }
                else if (data[i].Amt == "" || data[i].Amt == "0.00") {
                    AlertMessage('Amount Cannot be Empty !');
                    return false;
                }
            }
        }
        else
        {
            AlertMessage('No Record Exist');
            return false;
        }

        if ($("#MultiCurInd").val() == "1") {
            if ($$("ddlCurrency").getValue() == "") {
                AlertMessage('Currency Cannot be empty');
                return false;
            }
        }

        if ($$("txtDetTot").getValue() > 999999999999.999) {
            AlertMessage("Value exceeds the maximum value");
            return false;
        }

        if (lenval == 0) {
            AlertMessage('Transaction Bills is empty');
            return false;
        }

        if ($("#hdnCCInd").val()=="1") {

            if ($.trim($$("txtCCNo").getValue()) == "") {
                AlertMessage("Credit Card no cannot be empty");
                return false;
            }

            if ($.trim($$("ExpMM").getValue()) == "") {
                AlertMessage("Expiry Month cannot be empty");
                return false;
            }

            if ($.trim($$("ExpYY").getValue()) == "") {
                AlertMessage("Expiry year cannot be empty");
                return false;
            }
        }
        return true;
    }


    function PrcLoadAROpenPopup() {

        //Company PopUp Windows 
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "PopupOpenArTrans",
            head: "Voucher Search",
            position: "center",
            minWidth: 500,
            maxWidth: 500,
            resizeColumn: true,
            resizeRow: true,
            css: "webix_header_border",
            height: 550,
            body: {
                view: 'form',
                minWidth: 220,
                maxWidth: 220,

                elements: [
                    {
                        view: "datatable",
                        id: "grdVouchSrch",
                        select: "row",
                        data: [],
                        height: 350,
                        columns: [
                                 { header: "Voucher No", id: "VOUCH_NO", width: 90, css: { 'text-align': 'center ! important' } },
                                 { header: "Voucher Dt", id: "VOUCH_DT1", width: 110, css: { 'text-align': 'center ! important' } },
                                 { header: "TrnId", id: "TRN_ID", hidden: true },
                        ],
                        on: {
                            'onItemDblClick': function (id, e, node) {
                                var selectedRows = this.getSelectedItem(id.row);
                                var VouchId = $.trim(selectedRows[0].TRN_ID);
                                $("#hdnTrnId").val(VouchId);
                                $("#hdnVchIdNo").val(VouchId);
                                fnFillArTransData(VouchId);

                                $$("PopupOpenArTrans").hide();
                            }
                        }
                    },
                ]
            }
        });

        fnLoadVoucherLoad();
        $$("PopupOpenArTrans").show();
    }

    function fnPrcLoadPendingPopup() {

        //Company PopUp Windows 
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "PopupPendingBills",
            head: "Pending Bills",
            position: "center",
            minWidth: 500,
            maxWidth: 500,
            resizeColumn: true,
            resizeRow: true,
            css: "webix_header_border",
            height: 550,
            body: {
                view: 'form',
                minWidth: 500,
                maxWidth: 500,

                elements: [
                    {
                        view: "datatable",
                        id: "grdPendingBills",
                        select: "row",
                        data: [],
                        height: 350,
                        columns: [
                                { header: "YYMM", id: "YYMM", hidden: true },
                                { header: "Ref.Name", id: "RefNM", width: 180, editor: 'text', css: { 'text-align': 'left ! important' } },
                                { header: "Due Date", id: "DueDt", width: 100,  format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, css: { 'text-align': 'left ! important' } },
                                { header: "Pending Amount", id: "Amt", width: 90, editor: 'text', css: { 'text-align': 'right ! important' } },
                                { header: "", id: "DrCrInd", width: 30, editor: 'text', css: { 'text-align': 'Left ! important' } },
                                { header: "Select", id: "ChkSelect", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                        ],
                    },
                    {
                        PaddingY:20,
                        cols: [
                             {
                                 minWidth: 150,
                                 maxWidth: 150,
                                 paddingX: 330,
                                 rows: [
                                     {
                                         cols: [
                                             {
                                                 view: 'button',
                                                 label: 'Ok',
                                                 maxWidth: 70,
                                                 on: {
                                                     onItemClick: function () {
                                                         fnCallBindPendBills();
                                                         //$$('PopupPendingBills').hide();
                                                     }
                                                 }
                                             },
                                             {
                                                 view: 'button',
                                                 label: 'Close',
                                                 maxWidth: 70,
                                                 on: {
                                                     onItemClick: function () {
                                                         $$('PopupPendingBills').hide();
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
        fnPendingBillsLoad();
        $$("PopupPendingBills").show();
    }


    function PrcLoadAcountSrchPopup() {

        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "PopupAcountSrch",
            head: "Account Search",
            position: "center",
            minWidth: 500,
            maxWidth: 500,
            resizeColumn: true,
            resizeRow: true,
            css: "webix_header_border",
            height: 550,
            //autowidth: true,
            body: {
                view: 'form',
                minWidth: 350,
                maxWidth: 350,

                elements: [
                    {
                        view: "datatable",
                        id: "grdAcSearch",
                        select: "row",
                        data: [],
                        height: 350,
                        columns: [
                                 { header: "Ac Code", id: "id", width: 90, css: { 'text-align': 'Left ! important' } },
                                 { header: "Ac Name", id: "value", width: 240, css: { 'text-align': 'Left ! important' } },
                        ],
                        on: {
                            'onItemDblClick': function (id, e, node) {
                               
                                var selectedRows = this.getSelectedItem(id.row);

                                var dataval = $$("grdDbtsAcc").getSelectedItem();
                                if (selectedRows[0].id != "") {
                                    dataval.AC_CD = selectedRows[0].id;
                                    dataval.AC_NM = selectedRows[0].value;
                                }

                                $$("grdDbtsAcc").refresh();
                                $$("PopupAcountSrch").hide();
                            }
                        }
                    },
                    {
                        PaddingY: 20,
                        cols: [
                             {
                                 minWidth: 150,
                                 maxWidth: 150,
                                 paddingX: 280,
                                 rows: [
                                     {
                                         cols: [
                                            {
                                                view: 'button',
                                                label: 'Cancel',
                                                maxWidth: 70,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("PopupAcountSrch").hide();
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
        });

        fnAccountSrch();
        $$("PopupAcountSrch").show();
    }


    function fnAccountSrch() {
        var dataparam = {};
        var rowData = "";
        dataparam["REQTYPE"] = "GET_ARGLACCSRCH";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["TrnType"] = $("#hdnTrnTyId").val();

        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowDatad = JSON.parse(d);
                    $$("grdAcSearch").clearAll();
                    $$("grdAcSearch").parse(rowDatad);
                    $$("grdAcSearch").refresh();
                }
            },
        });
    }

    function fnChangCCNO() {
        var rowData = [];

        var dataparam = {};
        dataparam["REQTYPE"] = "GET_UPADTECCNO";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["VouchNo"] = $.trim($("#hdnTrnId").val());
        dataparam["CCNo"] = $.trim($$("txtACCNo").getValue());
        dataparam["ExpMM"] = $.trim($$("ExpMM").getValue());
        dataparam["ExpYY"] = $.trim($$("ExpYY").getValue());

        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/ARTrans/API_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (objRes) {
                if (objRes != "") {
                    rowData = JSON.parse(objRes);

                    $$("txtCCNo").setValue("");
                    $$("ExpMM").setValue("");
                    $$("ExpYY").setValue("");
                    $("#hdnCCFullNo").val("");

                    if ($.trim(rowData[0].CC_CHQ_NO) != "")
                        $$("txtCCNo").setValue($.trim(rowData[0].CC_CHQ_NO));
                    else
                        $$("txtCCNo").setValue("");

                    $$("txtCCNo").refresh();

                    $("#hdnCCFullNo").val($.trim(rowData[0].TT_ID));

                    if ($.trim(rowData[0].CC_NARRATION) != "") {

                        var data = $.trim(rowData[0].CC_NARRATION).split('@')

                        var vdate = data[0].split('/')

                        if ($.trim(vdate[1]) != "")
                            $$("ExpMM").setValue($.trim(vdate[1]));
                        else
                            $$("ExpMM").setValue("");

                        if ($.trim(vdate[2]) != "")
                            $$("ExpYY").setValue($.trim($.trim(vdate[2])));
                        else
                            $$("ExpYY").setValue("");
                    }

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

    function SuccessMessage(Text) {
        return webix.alert({
            ok: "Ok",
            width: 350,
            title: "Message",
            text: Text,
            modal: true,
        }).then(function (result) {
            $("#btnrefresh").click();
        })
    }