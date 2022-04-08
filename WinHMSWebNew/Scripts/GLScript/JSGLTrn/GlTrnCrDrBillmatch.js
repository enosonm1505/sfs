
var app = angular.module('GLTApp', ['webix']);

app.controller("GLTransController", function ($scope) {
    //debugger;

    $("#LoadDIv").hide();

    var PartGrpData = fnPartGrpLoad();

    var DivLoad = fnLoadDivision("1");

    $scope.frmCrBillMatch = {

        id: "frmCrBillMatch",
        view: 'form',
        minWidth: "1100",
        maxWidth: "5000",
        paddingX: 40,
        elements: [
            {
                paddingX: 10,
                PaddingY: 10,
                rows: [
                   {
                       rows: [
                           {
                               cols: [
                                   {
                                       view: "text",
                                       id: "txtArAp",
                                       stringResult: true,
                                       label: "Ar / Ap",
                                       disabled: true,
                                       labelAlign: "Right",
                                       value: ($.trim($("#hdnTrnTy").val()) == "R" ? "Accounts Receivable" : "Accounts Payable"),
                                       labelWidth: 90,
                                       inputWidth: 280,
                                       width: 300,
                                   },
                                   {
                                       view: "combo",
                                       id: "ddlPartyGrp",
                                       value: $("#hdnPartyDef").val(),
                                       label: "Party Group",
                                       labelAlign: "Right",
                                       labelWidth: 80,
                                       inputWidth: 320,
                                       width: 350,
                                       options: PartGrpData,
                                       on: {
                                           onChange: function (newval, oldval) {
                                               $$("txtParty").setValue("");
                                               $("#hdnPartyId").val("");
                                               $$("txtVouchTy").setValue("");
                                               $$("txtVouchDt").setValue("");
                                               $$("txtVouchNo").setValue("");
                                               $$("txtRefName").setValue("");
                                               $$("txtVouchamt").setValue("");
                                               $$("txtDebitAmt").setValue("");
                                               $$("txtUnAdjAmt").setValue("");
                                           }
                                       }
                                   },
                                   {
                                       view: "combo",
                                       id: "ddldivison",
                                       value: $("#hdnDivDef").val(),
                                       label: "Division",
                                       labelAlign: "Right",
                                       labelWidth: 60,
                                       inputWidth: 250,
                                       width: 250,
                                       //hidden:true,
                                       options: DivLoad,
                                       on: {
                                           onChange: function (newval, oldval) {

                                           }
                                       }
                                   },
                               ]
                           },
                           {
                               cols: [
                                   {
                                       view: "text",
                                       id: "txtVouchTy",
                                       stringResult: true,
                                       label: "Voucher Type",
                                       labelAlign: "Right",
                                       labelWidth: 90,
                                       inputWidth: 280,
                                       disabled: true,
                                       width: 300,
                                   },
                                   {
                                       view: "text",
                                       id: "txtParty",
                                       stringResult: true,
                                       label: "Party",
                                       labelAlign: "Right",
                                       labelWidth: 80,
                                       inputWidth: 320,
                                       readonly:true,
                                       width: 320,
                                   },
                                   {
                                       view: "button",
                                       id: 'SrchParty',
                                       minWidth: 250,
                                       labelWidth: 0,
                                       width: 30,
                                       height: 28,
                                       type: 'icon',
                                       icon: 'wxi-search',
                                       css: "Ar_search",
                                       on: {
                                           onItemClick: function () {
                                               $$("txtParty").setValue("");
                                               $("#hdnPartyId").val("");
                                               $$("txtVouchTy").setValue("");
                                               $$("txtVouchDt").setValue("");
                                               $$("txtVouchNo").setValue("");
                                               $$("txtRefName").setValue("");
                                               $$("txtVouchamt").setValue("");
                                               $$("txtDebitAmt").setValue("");
                                               $$("txtUnAdjAmt").setValue("");

                                               if ($$("ddlPartyGrp").getValue() == "") {
                                                   AlertMessage('Party Cannot be empty');
                                                   return false;
                                               }
                                               else {
                                                   fnCallPartySearch();
                                               }
                                           }
                                       }
                                   },
                                   {
                                       width:50,
                                   },
                                   {
                                       id: "btnDisplay",
                                       view: 'button',
                                       label: 'AutoAdj',
                                       inputWidth: 80,
                                       labelWidth: 30,
                                       width: 80,
                                       on: {
                                           onItemClick: function () {
                                               fncallAutoAdjAmount();
                                           }
                                       }
                                   }
                               ]
                           },
                           {
                               cols: [
                                   {
                                       view: "text",
                                       id: "txtVouchNo",
                                       stringResult: true,
                                       label: "Voucher No",
                                       labelAlign: "Right",
                                       labelWidth: 90,
                                       inputWidth: 165,
                                       width: 165,
                                       disabled: true,
                                   },
                                   {
                                       view: "button",
                                       id: 'SrchVoucher',
                                       labelWidth: 0,
                                       inputWidth: 30,
                                       width:125,
                                       height: 28,
                                       type: 'icon',
                                       icon: 'wxi-search',
                                       css: "Ar_search",
                                       on: {
                                           onItemClick: function () {
                                               if ($("#hdnPartyId").val() == "") {
                                                   AlertMessage('Party Cannot be empty');
                                                   return false;
                                               }
                                               else {
                                                   fnCallVoucherPop();
                                               }
                                           }
                                       }
                                   },
                                   {
                                        view: "text",
                                        id: "txtVouchDt",
                                        stringResult: true,
                                        label: "Voucher Dt",
                                        labelAlign: "Right",
                                        disabled: true,
                                        labelWidth: 90,
                                        inputWidth: 190,
                                        width: 190,
                                   },
                                   {
                                        view: "text",
                                        id: "txtRefName",
                                        stringResult: true,
                                        label: "Ref Nm",
                                        labelAlign: "Right",
                                        disabled: true,
                                        labelWidth: 90,
                                        inputWidth: 250,
                                        width: 250,
                                    },
                                    {
                                          view: "text",
                                          id: "txtVouchamt",
                                          stringResult: true,
                                          label: "Voucher Amt",
                                          disabled: true,
                                          labelAlign: "Right",
                                          labelWidth: 90,
                                          inputWidth: 190,
                                          width: 190,
                                      },
                               ]
                           }
                       ]
                   },

                   {
                       paddingY: 20,

                       cols:[
                           {
                               view: "datatable",
                               id: "grdLoadBills",
                               select: "row",
                               data: [],
                               //minHeight: 500,
                               //maxHeight: 700,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                               debugger;
                               if (common.column.id == "CommNarr")
                               return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                       { header: "S.No", id: "SNo", width: 50, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Tyn Type", id: "TrnTy", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Vouch No", id: "BillNo", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Vouch Dt", id: "BillDt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Ref Ty", id: "RefTyNm", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Ref Name", id: "RefNm", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Due/Bill Dt", id: "DueDt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Bal Amt", id: "BalAmt", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                       { header: "Select", id: "ChkSelect", tooltip: false, checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important' } },
                                       { header: "Adjust Amt", id: "AdjAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' }, tooltip: false },
                                       { header: "", id: "DrCrInd", width: 50, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Narration", id: "CommNarr", tooltip: true, width: 200, css: { 'text-align': 'left ! important' } },
                                       { header: "TrnSno", id: "TrnSno", hidden: true },
                                       { header: "Trnidsrno", id: "Trnidsrno", hidden: true },
                                       { header: "RefTyId", id: "RefTyId", hidden: true },
                                       { header: "RefDt", id: "RefDt", hidden: true },
                                       { header: "UpdateDt", id: "UpdateDt", hidden: true },
                                       { header: "TrnTyId", id: "TrnTyId", hidden: true },
                                       { header: "TrnId", id: "TrnId", hidden: true },
                                       { header: "ChkInd", id: "ChkInd", hidden: true },
                               ],
                               on: {
                                   'onCheck': function (row, column, state, editor) {
                                       debugger;
                                       var getval = this.getItem(row);

                                       if (getval.ChkSelect == "0") {
                                           getval.AdjAmt = "";
                                           getval.ChkInd = "0";
                                       }
                                       else {

                                           var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

                                           var DbAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

                                           var UnAdjAmt = ($.trim($$("txtUnAdjAmt").getValue()) == "" ? 0 : parseFloat($$("txtUnAdjAmt").getValue().replace(",", ""))).toFixed(2);

                                           var BalAmt = parseFloat(getval.BalAmt.replace(",", "").replace(",", "")).toFixed(2);

                                           if (parseFloat(BalAmt) < parseFloat(vChAmt)) {

                                               if (parseFloat(BalAmt) > parseFloat(vChAmt - DbAmt)) {
                                                   getval.AdjAmt =parseFloat(vChAmt - DbAmt)<0?"0.00": parseFloat(vChAmt - DbAmt).toFixed(2);
                                               }
                                               else {
                                                   getval.AdjAmt = BalAmt;
                                               }
                                           }
                                           else {
                                               if (parseFloat(vChAmt) > 0) {
                                                 //  getval.AdjAmt = parseFloat(vChAmt - DbAmt).toFixed(2);
                                                 
                                                   getval.AdjAmt =parseFloat(vChAmt - DbAmt)<0?"0.00": parseFloat(vChAmt - DbAmt).toFixed(2);
                                                 
                                                  
                                               }
                                               else
                                                   getval.AdjAmt = BalAmt;
                                           }

                                           $$("grdLoadBills").refresh();

                                           getval.ChkInd = "1";
                                       }

                                       fnCallAmount();

                                       $$("grdLoadBills").refresh();
                                   },
                                   'onAfterEditStop': function (state, editor) {
                                       //debugger;

                                       if (editor.column == 'AdjAmt') {
                                           var getval = this.getItem(editor.row);

                                           if (state.value != "") {
                                               getval.AdjAmt = parseFloat(state.value).toFixed(2);
                                           }

                                           fnCallAmount();
                                           $$("grdLoadBills").refresh();
                                       }
                                   },
                                   'onBeforeEditStart': function (id) {
                                       var getval = $$("grdLoadBills").getItem(id);
                                       if (id.column == 'RefNm' || id.column == 'BillDt' || id.column == 'DueDt' )
                                       {
                                           if (getval.RefTyId !=undefined && getval.RefTyId == "3") return false;
                                           else return true;
                                       }
                                       if (id.column == "AdjAmt") {
                                           if (getval.ChkInd == "0") return false;
                                           else return true;
                                       }
                                   },
                                   'onItemClick': function (id, index, cell) {
                                       //debugger;
                                       if (id.column == 'AdjAmt') {
                                           var getval = this.getItem(id.row);
                                          
                                           //if (getval.ChkInd == "0") {
                                           //    AlertMessage("Select Row !");
                                           //    return false;
                                           //}

                                           fnCallAmount();
                                           $$("grdLoadBills").refresh();
                                       }

                                   },
                                   'onBlur': function () {
                                       //debugger;
                                       $$("grdLoadBills").editStop();
                                       $$("grdLoadBills").refresh();
                                   },
                                   //'onKeyPress': function (e, id) {
                                   //    debugger;
                                   //    var charCode = (e.which) ? e.which : event.keyCode;
                                   //    if (charCode == "189") return false;
                                      
                                   //}
                               },
                               ready: function () {
                                   gridResize("1");
                               }
                           }
                       ]
                   },
                   {
                       rows: [
                           {
                               cols: [
                                   {
                                       view: "text",
                                       id: "txtNarration",
                                       stringResult: true,
                                       label: "Narration",
                                       labelAlign: "Right",
                                       labelWidth: 90,
                                       inputWidth: 350,
                                       maxWidth: 350,
                                       minWidth: 350,
                                   },
                                   {
                                        view: "text",
                                        id: "txtDebitAmt",
                                        stringResult: true,
                                        label: "Debit Amount",
                                        readonly: true,
                                        labelAlign: "Right",
                                        labelWidth: 90,
                                        maxWidth: 220,
                                        inputWidth: 200,
                                        minWidth: 220,
                                   },
                                   {
                                         view: "text",
                                         id: "txtUnAdjAmt",
                                         stringResult: true,
                                         label: "Unadjusted Amount",
                                         readonly: true,
                                         labelAlign: "Right",
                                         labelWidth: 130,
                                         inputWidth: 300, 
                                         maxWidth: 300,
                                         minWidth: 300,
                                         css: { 'color': 'red ! important' }
                                     },
                               ]
                           }
                       ]
                   }
                ],
            }
        ]
    };

    

});

gridResize("1");


function fnCallAmount() {
    debugger;
    var TotAmt = 0;

    var data = $$("grdLoadBills").serialize();
    var lenval = data.length;

    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            //debugger;
            if (data[i].AdjAmt != null && data[i].AdjAmt != "") {
                var vVal = data[i].AdjAmt.replace(",", "");
                TotAmt = parseFloat(TotAmt) + parseFloat(vVal);
            }
        }
    }

    $$("txtDebitAmt").setValue(parseFloat(TotAmt).toFixed(2));

    var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

    var DbAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

    $$("txtUnAdjAmt").setValue((parseFloat(DbAmt) != 0 ? parseFloat(vChAmt - DbAmt) : 0).toFixed(2));
}

function fncallAutoAdjAmount() {
    debugger;
    var BillData = $$("grdLoadBills").serialize();

    debugger;
    var CurrData = BillData.filter(function (BillData) {
        return BillData.ChkSelect == "1";
    });


    if (CurrData.length != 0) {
        for (k = 0; k < CurrData.length; k++) {
            CurrData[k].ChkSelect = "0";
            CurrData[k].AdjAmt = "";
            CurrData[k].ChkInd = "";
        }
        $$("grdLoadBills").refresh();
    }
    var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

    for (i = 0; i < BillData.length; i++) {

        var BalAmt = ($.trim(BillData[i].BalAmt) == "" ? 0 : parseFloat(BillData[i].BalAmt.replace(",", "").replace(",", ""))).toFixed(2);

        if (vChAmt == 0)
            break;

        if (parseFloat(BalAmt) < parseFloat(vChAmt)) {

            BillData[i].ChkSelect = "1";

            BillData[i].AdjAmt = BillData[i].BalAmt;
            vChAmt = parseFloat(vChAmt) - BalAmt;

            $("#hdnContFlag").val("1");
            BillData[i].ChkInd = "1";
        }
        else {

            BillData[i].ChkSelect = "1";
            BillData[i].AdjAmt = parseFloat(vChAmt).toFixed(2);
            vChAmt = parseFloat(vChAmt) - vChAmt;
            $("#hdnContFlag").val("1");
            BillData[i].ChkInd = "1";
        }

        $$("grdLoadBills").refresh();
    }
    fnCallAmount();
}

function fnLoadProperty() {

    var dataProp = fnPropertyLoad("1");

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnPartGrpLoad() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PARTYGRPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTy"] = $("#hdnTrnTy").val();
    dataparam["Option"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (i == 0) {
                            $("#hdnPartyDef").val(rowData[i].id);
                            break;
                        }
                    }
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

    return rowData;
}

function fnCallPartySearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupLoadParty",
        head: "Account Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
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
                    id: "grdParty",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: "AC_CD", id: "AC_CD", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            //debugger;
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            $("#hdnPartyId").val($.trim(selectedRows[0].AC_ID));
                            $$("txtParty").setValue(AcNm);
                            $$('PopupLoadParty').hide();
                            fnLoadBillData();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupLoadParty').hide();
                                                     $("#hdnPartyId").val("");
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

    var PartyGrp = $$("ddlPartyGrp").getValue();
    fnLoadParty(PartyGrp, "grdParty", "2");
    $$("PopupLoadParty").show();
}

function fnCallVoucherPop() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupDrCrTrans",
        head: ($("#hdnTrnTy").val()=="R"?"Credit":"Debit")+" Transaction",
        position: "center",
        minWidth: 850,
        maxWidth: 850,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {

            view: 'form',
            minWidth: 850,
            maxWidth: 850,
            elements: [

                {

                    view: "datatable",
                    id: "grdCrDrTrans",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Vouch Ty", id: "VouchTyNm", width: 80, css: { 'text-align': 'left ! important' } },
                            { header: "Ref.Nm", id: "RefNm", width: 80, css: { 'text-align': 'left ! important' } },
                            { header: "Due Dt", id: "DueDt", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: "Vouch No", id: "VouchNo", width: 80, css: { 'text-align': 'center ! important' } },
                            { header: "Vouch Dt", id: "VouchDt", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: "Narration", id: "Narr", width: 200, css: { 'text-align': 'left ! important' } },
                            { header: "Pending Amount", id: "PendAmt", width: 120, css: { 'text-align': 'right ! important' } },
                            { header: "", id: "DrCrInd", width: 45, css: { 'text-align': 'center ! important' } },
                            { header: "TrnId", id: "TrnId", hidden: true },
                            { header: "TrnIdSrNo", id: "TrnIdSrNo", hidden: true },
                            { header: "RefTyId", id: "RefTyId", hidden: true },
                            { header: "VouchTyId", id: "VouchTyId", hidden: true },
                            { header: "VouchTyNm", id: "VouchTy", hidden: true },
                            { header: "UpdateDt", id: "UpdateDt", hidden: true },
                            { header: "BillDt", id: "BillDt", hidden: true },
                            { header: "VouchDt1", id: "VouchDt1", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);
                            $$("txtVouchTy").setValue(selectedRows[0].VouchTy);
                            $$("txtVouchDt").setValue(selectedRows[0].VouchDt);
                            $$("txtVouchNo").setValue(selectedRows[0].VouchNo);
                            $$("txtRefName").setValue(selectedRows[0].RefNm);
                            $$("txtVouchamt").setValue(parseFloat(selectedRows[0].PendAmt.replace(',', '').replace(',', '')));
                            $$("txtNarration").setValue(selectedRows[0].ComNarr);
                            $$("txtUnAdjAmt").setValue(selectedRows[0].PendAmt);
                            $("#hdnBillDt").val(selectedRows[0].BillDt)
                            $("#hdnUpdateDt").val(selectedRows[0].UpdateDt);
                            $("#hdnTrnId").val(selectedRows[0].TrnId);
                            $("#hdnTrnIdSrNo").val(selectedRows[0].TrnIdSrNo);
                            $("#hdnRefTyId").val(selectedRows[0].RefTyId);
                            $("#hdnTrnTyId").val(selectedRows[0].VouchTyId);
                            $("#hdnDueDt").val(selectedRows[0].DueDt);

                            var VchAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

                            var DebitAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

                            $$("txtUnAdjAmt").setValue(parseFloat(VchAmt - DebitAmt).toFixed(2));
                            
                            $$('PopupDrCrTrans').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 800,
                             paddingX: 750,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupDrCrTrans').hide();
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

    fnLoadDrCrDet();
    $$("PopupDrCrTrans").show();
}

function fnLoadDrCrDet() {
    //debugger;

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_CRDRTRANSDET";
    dataparam["PROGNAME"] = "GET_GLTRNCRDRBILL01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PartyTyId"] = $("#hdnPartyId").val();
    dataparam["TrnTy"] = $("#hdnTrnTy").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdCrDrTrans").clearAll();
                $$("grdCrDrTrans").parse(rowData);
                $$("grdCrDrTrans").refresh();
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

function fnLoadBillData() {
    
    $("#LoadDIv").show();

    var dataparam = {};
    $$("grdLoadBills").clearAll();
    $$("grdLoadBills").refresh();

    dataparam["REQTYPE"] = "GET_FILLDATABILLS";
    dataparam["PROGNAME"] = "GET_GLTRNCRDRBILL01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["AcId"] = $("#hdnPartyId").val();
    dataparam["TrnTy"] = $("#hdnTrnTy").val();
    dataparam["DivId"] = $.trim($$("ddldivison").getValue());

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdLoadBills").clearAll();
                $$("grdLoadBills").parse(rowData);
                $$("grdLoadBills").refresh();
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

function fnPrcSaveData() {
   
    if (fnGlCRSaveValid() == false) {
        return false;
    }
    $("#LoadDIv").show();
    var BillData = $$("grdLoadBills").serialize(true);
    var lenval = BillData.length;

    var DataStore = [];

    var dataparam = {};

    debugger;

    if(lenval>0)
    {
        for (i = 0; i < BillData.length; i++) {

            if (BillData[i].ChkSelect == "1") {
                var addrow = {
                    SNo: BillData[i].SNo, TrnTy: BillData[i].TrnTy, BillNo: BillData[i].BillNo, BillDt: BillData[i].BillDt,
                    RefTyNm: BillData[i].RefTyNm, RefNm: BillData[i].RefNm, DueDt: BillData[i].DueDt, BalAmt: BillData[i].BalAmt,
                    AdjAmt: BillData[i].AdjAmt, DrCrInd: BillData[i].DrCrInd, CommNarr: BillData[i].CommNarr, TrnSno: BillData[i].TrnSno,
                    Trnidsrno: BillData[i].Trnidsrno, RefTyId: BillData[i].RefTyId, RefDt: BillData[i].RefDt, UpdateDt: BillData[i].UpdateDt,
                    TrnTyId: BillData[i].TrnTyId, TrnId: BillData[i].TrnId, ChkInd: BillData[i].ChkInd
                };

                DataStore = DataStore.concat(addrow);
            }
        }
    }
    dataparam["PROPNM"] = $$("ddlProperty").getText();
    dataparam["REQTYPE"] = "GET_CREDITSAVEBILLS";
    dataparam["PROGNAME"] = "GET_GLTRNCRDRBILL01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["AcId"] = $("#hdnPartyId").val();
    dataparam["TrnTyInd"] = $("#hdnTrnTy").val();
    dataparam["txtVouchDt"] = $.trim($$("txtVouchDt").getValue());
    dataparam["txtUpdateDt"] = $.trim($("#hdnUpdateDt").val());
    dataparam["txtVouchNo"] = $.trim($$("txtVouchNo").getValue());
    dataparam["txtRefNm"] = $.trim($$("txtRefName").getValue());
    dataparam["TrnId"] = $.trim($("#hdnTrnId").val());
    dataparam["txtTrnSrNo"] = $.trim($("#hdnTrnIdSrNo").val());
    dataparam["RefTyId"] = $.trim($("#hdnRefTyId").val());
    dataparam["txtTrnTyId"] = $.trim($("#hdnTrnTyId").val());
    dataparam["txtNarr"] = $.trim($$("txtNarration").getValue());
    dataparam["txtBillDt"] = $.trim($("#hdnBillDt").val());
    dataparam["txtDueDt"] = $.trim($("#hdnDueDt").val());
    dataparam["ddlDivId"] = $.trim($$("ddldivison").getValue());
    
    dataparam["grdData"] = DataStore;

    var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

    var DbAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

    var UnAdjAmt = ($.trim($$("txtUnAdjAmt").getValue()) == "" ? 0 : parseFloat($$("txtUnAdjAmt").getValue().replace(",", ""))).toFixed(2);

    dataparam["txtToPayAmt"] = $.trim(DbAmt);
    dataparam["txtAdjAmt"] = $.trim(UnAdjAmt);
    dataparam["txtVchAmt"] = $.trim(vChAmt);

    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/GLTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                    fnLoadBillData();
                    $("#btnRefresh").click();
                }
                else {
                    AlertMessage($.trim(rowData));
                }
                $("#LoadDIv").hide();
            }
        },
    });
  
}

function fnLoadRefData() {
    $$("txtVouchTy").setValue("");
    $$("txtVouchDt").setValue("");
    $$("txtVouchNo").setValue("");
    $$("txtRefName").setValue("");
    
    $$("txtNarration").setValue("");
   
    $("#hdnBillDt").val("")
    $("#hdnUpdateDt").val("");
    $("#hdnTrnId").val("");
    $("#hdnTrnIdSrNo").val("");
    $("#hdnRefTyId").val("");
    $("#hdnTrnTyId").val("");
    $("#hdnDueDt").val("");

    $$("txtVouchamt").setValue("");
    $$("txtDebitAmt").setValue("");
    $$("txtUnAdjAmt").setValue("");
}

function fnGlCRSaveValid() {
    //debugger;

    if ($$("txtArAp").getValue() == "") {
        AlertMessage('Ar / Ap Cannot be empty');
        return false;
    }

    if ($$("ddlPartyGrp").getValue() == "") {
        AlertMessage('Party Group Cannot be empty');
        return false;
    }

    if ($("#hdnPartyId").val() == "") {
        AlertMessage('Party Cannot be empty');
        return false;
    }

    if ($("#hdnTrnId").val() == "") {
        AlertMessage('Voucher No Cannot be empty');
        return false;
    }

    if ($("#hdnTrnIdSrNo").val() == "") {
        AlertMessage('Transaction Id Srno Cannot be empty');
        return false;
    }
    
    if (parseFloat($$("txtUnAdjAmt").getValue()) < 0) {
        AlertMessage("Sum of debit Amount cannot be greater than voucher Amount.");
        return false;
    }

    var data = $$("grdLoadBills").serialize();
    var lenval = data.length;
    $("#hdnContFlag").val("");
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if (data[i].ChkInd == "1") {
                $("#hdnContFlag").val("1");
                break;
            }
        }

        if ($.trim($("#hdnContFlag").val()) != "1") {
            AlertMessage("Atleast one row Should be selected");
            return false;
        }

        for (i = 0; i < lenval; i++) {
            if (data[i].ChkInd == "1") {
                vamt = data[i].BalAmt;
                vadjamt = data[i].AdjAmt;
                vamt = $.trim(vamt).replace(/,/g, '');
                vadjamt = $.trim(vadjamt).replace(/,/g, '')
                if (parseFloat(vadjamt) <= 0 || $.trim(vadjamt)=="") {
                    AlertMessage("Adjusted Amount cannot be less than or equal to zero ..!");
                    data[i].AdjAmt.select;
                    return false;
                }
                if (parseFloat(vadjamt) > parseFloat(vamt)) {
                    AlertMessage("Adjusted Amount cannot be greater than Bill Amount");
                    data[i].BalAmt.select;
                    return false;
                }
            }
        }
    }




    return true;
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
        //window.location.reload();
    })
}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("frmCrBillMatch").define("width", vWidth);
    $$("frmCrBillMatch").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;

    
    $$("frmCrBillMatch").define("height", vheight - 100);
    $$("frmCrBillMatch").resize();
     var vWidth = $("#divform").width();
            $$("frmCrBillMatch").define("width", vWidth);
            $$("frmCrBillMatch").resize();
    if (choice == "1") {
        var offsetTop = $$("grdLoadBills").getNode().offsetTop;
        

        $$("grdLoadBills").define("height", ((vheight - offsetTop - 160)));
        $$("grdLoadBills").adjust();
    }





}
