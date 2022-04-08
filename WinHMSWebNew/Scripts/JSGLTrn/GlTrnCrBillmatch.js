
var app = angular.module('GLTApp', ['webix']);

app.controller("GLTransController", function ($scope) {
    //debugger;

    $("#LoadDIv").hide();

    var PartGrpData = fnPartGrpLoad();

    var DivLoad = fnLoadDivision();

    $scope.frmCrBillMatch = {

        id: "frmCrBillMatch",
        view: 'form',
        minWidth: "auto",
        maxWidth: "auto",
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
                               width: 1200,
                               height: 350,
                               editable: true,
                               tooltip: true,
                               scroll: "y",
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
                                       //debugger;
                                       var getval = this.getItem(row);

                                       if (getval.ChkSelect == "0") {
                                           getval.AdjAmt = "";
                                           getval.ChkInd = "0";
                                       }
                                       else {

                                           var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

                                           var DbAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

                                           var UnAdjAmt = ($.trim($$("txtUnAdjAmt").getValue()) == "" ? 0 : parseFloat($$("txtUnAdjAmt").getValue().replace(",", ""))).toFixed(2);

                                           var BalAmt = parseFloat(getval.BalAmt.replace(",", "")).toFixed(2);

                                           if (parseFloat(BalAmt) < parseFloat(vChAmt)) {

                                               if (parseFloat(BalAmt) > parseFloat(vChAmt - DbAmt)) {
                                                   getval.AdjAmt = parseFloat(vChAmt - DbAmt).toFixed(2);
                                               }
                                               else {
                                                   getval.AdjAmt = BalAmt;
                                               }
                                           }
                                           else {
                                               if (parseFloat(vChAmt) > 0) {
                                                   getval.AdjAmt = parseFloat(vChAmt - DbAmt).toFixed(2);
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
                                   'onItemClick': function (id, index, cell) {
                                       //debugger;
                                       if (id.column == 'AdjAmt') {
                                           var getval = this.getItem(id.row);

                                           if (getval.ChkInd == "0") {
                                               AlertMessage("Select Row !");
                                               return false;
                                           }

                                           fnCallAmount();
                                           $$("grdLoadBills").refresh();
                                       }

                                   },
                                   'onBlur': function () {
                                       //debugger;
                                       $$("grdLoadBills").editStop();
                                       $$("grdLoadBills").refresh();
                                   },
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
                                       inputWidth: 400,
                                       width: 520,
                                   },
                                   {
                                        view: "text",
                                        id: "txtDebitAmt",
                                        stringResult: true,
                                        label: "Debit Amount",
                                        readonly: true,
                                        labelAlign: "Right",
                                        labelWidth: 90,
                                        inputWidth: 220,
                                        width: 250,
                                   },
                                   {
                                         view: "text",
                                         id: "txtUnAdjAmt",
                                         stringResult: true,
                                         label: "Unadjusted Amount",
                                         readonly: true,
                                         labelAlign: "Right",
                                         labelWidth: 130,
                                         inputWidth: 250,
                                         width: 280,
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

function fnCallAmount() {

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


function fnLoadProperty() {

    var dataProp = fnPropertyLoad();

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

function fnPropertyLoad() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = "";
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
            }
        },
    });

    return rowData;
}

function fnPartGrpLoad() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PARTYGRPLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
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

function fnLoadDivision() {
    //debugger;

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GLDIVISION";
    dataparam["COMPID"] = $("#hdnCompId").val();
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
                        //debugger;
                        if (rowData[i].RES_DIV_IND == "1") {
                            $("#hdnDivDef").val(rowData[i].id);
                        }
                        else if (i == 0) {
                            $("#hdnDivDef").val(rowData[i].id);
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

    fnLoadParty();
    $$("PopupLoadParty").show();
}

function fnLoadParty() {
    //debugger;

    $("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PARTYSEARCH";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PartyGrp"] = $$("ddlPartyGrp").getValue();

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
                $$("grdParty").clearAll();
                $$("grdParty").parse(rowData);
                $$("grdParty").refresh();
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
    $("#LoadDIv").hide();
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
                            $$("txtVouchamt").setValue(selectedRows[0].PendAmt);
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
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PartyTyId"] = $("#hdnPartyId").val();
    dataparam["TrnTy"] = $("#hdnTrnTy").val();

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
                $$("grdCrDrTrans").clearAll();
                $$("grdCrDrTrans").parse(rowData);
                $$("grdCrDrTrans").refresh();
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
   
    var BillData = $$("grdLoadBills").serialize();
    var GridData1 = JSON.stringify(BillData);
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_CREDITSAVEBILLS";
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
    
    dataparam["grdData"] = GridData1;

    debugger;

    var vChAmt = ($.trim($$("txtVouchamt").getValue()) == "" ? 0 : parseFloat($$("txtVouchamt").getValue().replace(",", ""))).toFixed(2);

    var DbAmt = ($.trim($$("txtDebitAmt").getValue()) == "" ? 0 : parseFloat($$("txtDebitAmt").getValue().replace(",", ""))).toFixed(2);

    var UnAdjAmt = ($.trim($$("txtUnAdjAmt").getValue()) == "" ? 0 : parseFloat($$("txtUnAdjAmt").getValue().replace(",", ""))).toFixed(2);

    dataparam["txtToPayAmt"] = $.trim(DbAmt);
    dataparam["txtAdjAmt"] = $.trim(UnAdjAmt);
    dataparam["txtVchAmt"] = $.trim(vChAmt);

    var DataVal = JSON.stringify(dataparam);

    $("#LoadDIv").show();

    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                $("#LoadDIv").hide();

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                    fnLoadBillData();
                    $("#btnRefresh").click();
                }
                else {
                    AlertMessage($.trim(rowData));
                }
            }
        },
    });

    $("#LoadDIv").hide();
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

    debugger;
    var data = $$("grdLoadBills").serialize();
    var lenval = data.length;
    if (lenval != 0) {
        var ContFlag = false;
        for (i = 0; i < lenval; i++) {
            //debugger;
            
            if (data[i].ChkInd == "1") {
                ContFlag = true;
                break;
            }
        }

        if (ContFlag == false) {
            AlertMessage("Atleast one row Should be selected");
            return false;
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