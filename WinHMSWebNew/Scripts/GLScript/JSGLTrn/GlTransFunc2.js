
var Delicon = "<span class='webix_icon wxi-trash'></span>";

function fnMainDetRowAdd(option) {
    debugger;
    var grdData = $$("grdGLTransDet").serialize();
    var lenval = grdData.length;

    var CrAmt = ""; var DrAmt = "";
    if (grdData.length != 0) {

        var vNewDb = 0; var vNewCr = 0;

        for (i = 0; i < grdData.length; i++) {

            vNewDb = vNewDb + (grdData[i].Debit == "" || grdData[i].Debit == "NaN" || grdData[i].Debit == null ? 0 : parseFloat(grdData[i].Debit));

            vNewCr = vNewCr + (grdData[i].Credit == "" || grdData[i].Credit == "NaN" || grdData[i].Credit == null ? 0 : parseFloat(grdData[i].Credit));
        }

        
    }

    var DrCR = "";
    if ($.trim(option) == "0") {
        if ($("#hdnFirstDrCrInd").val() == "1")
            DrCR = "DR";
        else
            DrCR = "CR";
    }
    else {

     
        var vDbTot = 0;
        var cr = parseFloat(vNewCr).toFixed(2);
        var dr =parseFloat(vNewDb).toFixed(2);
        if (parseFloat(cr) > parseFloat(dr)) DrCR = "CR"; else DrCR = "DR";
        if (DrCR == "DR") vDbTot = parseFloat(parseFloat(vNewDb).toFixed(2) - (parseFloat(vNewCr).toFixed(2)));
        else vDbTot = parseFloat((parseFloat(vNewCr).toFixed(2)) - (parseFloat(vNewDb).toFixed(2)));
       
        if( DrCR == "CR")
        {
            DrAmt = vDbTot.toFixed(2);
            CrAmt = "";
            DrCR = "DR"
        }
        else
        {
            if ($("#hdnDefGlTrnTy").val() != "0")
            {
                CrAmt = vDbTot.toFixed(2);
                DrAmt = "";
                DrCR = "CR"
            }
            else {
                DrAmt = "";// vDbTot.toFixed(2);
                CrAmt = "";
                DrCR = "DR"
            }
          
        }


    }



    var CurNm = "";
    var CurIds = $.trim($("#hdnBaseCurrId").val());
    var PsRate = "";
    var FornAmt = "";
    var RateTy = "";
    if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
    {
        if (grdData.length != 0) {
            var currow = $$("grdGLTransDet").getSelectedItem();
            CurIds = currow.CurrId;
            if (parseFloat(vDbTot) > 0)
            {
                PsRate = currow.PsRate;
                FornAmt = parseFloat(vDbTot) / currow.PsRate;
                RateTy = currow.RateTy;
            }
               
        }
    }
 
    var ddlcurrency = fnLoadCurrency();
    if (ddlcurrency.length != 0) {
        var CurrData = ddlcurrency.filter(function (ddlcurrency) {
            return ddlcurrency.id == $.trim(CurIds);
        });

        if (CurrData.length != 0) CurNm = CurrData[0].id;
    }
    if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdData.length != 0)  {
        var firstid = $$("grdGLTransDet").getFirstId();
        var getval = $$("grdGLTransDet").getItem(firstid);
        CurNm = getval.CurrId;
        PsRate = getval.PsRate;
        FornAmt = parseFloat(vDbTot) / getval.PsRate;
        RateTy = getval.RateTy;
    }

    var Rowid= parseFloat($("#hdnTransDetRowId").val());
   
    var addrow = {
        RowId: (Rowid == 0 ? 0 : Rowid), Drcr: DrCR, ACCD: '', hdnAcId: '', AcNM: '', hdnCurNm: '', CurrId: CurNm, CurBal: '', FCurBal: '', Credit: CrAmt, Debit: DrAmt, Narr: '', DocNo: '', DocDt: '',
        PsRate: PsRate, FornAmt: FornAmt, RateTy: RateTy, SNo: '', ActCR: '', ActDR: '', ReConInd: '', ReConDt: '', LKAcId: '', Cdt: '', ApprBy: '', VNo: '',
        ProjId: '', ProjNm: '', ChkAind: '', ChkBind: '', ChkCind: '', ChkDind: '', ChkEind: '', ChkFind: '', TrInd: '', SN1: '', TdInd: '',
        ChkLind: '', ChkMind: '', ChkNind: '', ChkOind: '', Gainl: '', VatInd: '', CBy: '', ApprDt: '', ReConBy: '', hdnFornAmt: '', AcTy: '', PostInd: '',PostTy:'',
    };
    Rowid = Rowid + 1;
    $("#hdnTransDetRowId").val(Rowid);
    if ($("#hdnCurMode").val() == "N") {

        if ($.trim(option) == "0") {

            if (lenval == 0) {
                $$("grdGLTransDet").add(addrow);
            }
        }
    }
    if ($.trim(option) == "1") {

        if (lenval != 0) {

            if (!fnMainGridValidate())
                return false;

            $$("grdGLTransDet").add(addrow);
        }
        else if (lenval == 0)
            $$("grdGLTransDet").add(addrow);
    }
   
        $$("grdGLTransDet").select($$("grdGLTransDet").getLastId());
        webix.UIManager.setFocus($$("grdGLTransDet"));
        var itemval = $$("grdGLTransDet").getSelectedItem();
        $$("grdGLTransDet").editCell(itemval.id, "Drcr", false, true);
        $("#hdnTrnNewRowAdd").val("1");
        $("#hdnCurrDC").val(DrCR);

    $$("grdGLTransDet").refresh();
}

function fnBillDetRowAdd(option,RowId,vDRCR,hdnAcId,ConvRt,FornAmt) {

    if ($$("grdBillDet") != undefined) {
       
        var grdData = $$("grdBillDet").serialize();
        var lenval = grdData.length;

        debugger;

        var vRowId = 0; var HDRCR = ""; var vhdnAcId = ""; var vConvRt = ""; var vFornAmt = "";
        if (option == 1) {
            var getval = $$("grdGLTransDet").getSelectedItem();
           // vRowId = grdData[lenval - 1].RowId;
            vRowId = getval.RowId;
            //HDRCR = grdData[lenval - 1].Drcr;
            HDRCR = getval.Drcr;
            vhdnAcId = grdData[lenval - 1].hdnAcId;
            vConvRt = grdData[lenval - 1].BillConvrt;
            vFornAmt = grdData[lenval - 1].FornAmt;
        }
        else {
            HDRCR = vDRCR;
            vRowId = RowId;
            vhdnAcId = hdnAcId;
            vConvRt =ConvRt;
            vFornAmt =FornAmt;
        }

        var DefRefNm = ""; var DefRefId = "";
        DefRefId = "1";
     
        var addrow = {
            RowId: vRowId,
            RefTyId: DefRefId, RefTyNm: DefRefNm, RefNm: '', BillDt: $("#hdnCurrentDt").val(), DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', FornAmt: vFornAmt,
            Drcr: HDRCR, OFornBAmt: '', BillConvrt: vConvRt, diffAmt: '', hdnAcId: vhdnAcId, CBy: '', CDt: '', AdjBy: '', AdjDt: '',
        };

     

            if ($.trim(option) == "0") {

                if (lenval == 0) {
                    $$("grdBillDet").add(addrow);
                }
            }
      
        if ($.trim(option) == "1") {

            if (lenval != 0) {

                for (i = 0; i < lenval; i++) {

                 
                    var DrAmt = (grdData[i].DrAmt == "" ? 0 : parseFloat(grdData[i].DrAmt));

                    var CrAmt = (grdData[i].CrAmt == "" ? 0 : parseFloat(grdData[i].CrAmt));

                    if (DrAmt == 0 && CrAmt == 0) {
                        return false;
                    }
                }

                $$("grdBillDet").add(addrow);
            }
            else if (lenval == 0)
                $$("grdBillDet").add(addrow);
        }

        //$$("grdBillDet").select($$("grdBillDet").getLastId());
        //webix.UIManager.setFocus($$("grdBillDet"));
        //var itemval = $$("grdBillDet").getSelectedItem();        
        //$$("grdBillDet").select(itemval.id, "RefTyId", true);
       
        $$("grdBillDet").refresh();
    }
}

function fnAddAnalRow(option) {
    debugger;
    var grdData = $$("grdGlAnaly").serialize();
    var lenval = grdData.length;

    var addrow = {
        AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
        AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
        AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '',Amount:'',RowId:'',hdnAcId:'',
    };

 //   if ($("#hdnCurMode").val() == "N") {

        if ($.trim(option) == "0") {

            if (lenval == 0) {
                $$("grdGlAnaly").add(addrow);
            }
        }
   // }
    if ($.trim(option) == "1") {

        if (lenval != 0) {

            for (i = 0; i < lenval; i++) {

                if ((grdData[i].AnalID1 != "" || grdData[i].AnalID2 != "" || grdData[i].AnalID3 != "" || grdData[i].AnalID4 != "" || grdData[i].AnalID5 != ""
                    || grdData[i].AnalID6 != "" || grdData[i].AnalID7 != "" || grdData[i].AnalID8 != "" || grdData[i].AnalID9 != "" || grdData[i].AnalID10 != "") && (grdData[i].Amount != "")) {
                   // return true;
                }
                else {
                    return false;
                }
            }

            $$("grdGlAnaly").add(addrow);
        }
        else if (lenval == 0)
            $$("grdGlAnaly").add(addrow);
    }

    $$("grdGlAnaly").refresh();
}

//Account Search
function fnCallPopupAccontSrch(TaxDet) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "PopupAccNmSrch",
        head: "Account Search",
        position: "center",
        minWidth: 450,
        maxWidth: 450,
        //resizeColumn: true,
        //resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 450,
            maxWidth: 450,

            elements: [
                {
                    view: "datatable",
                    id: "grdAccount",
                    select: "row",
                    data: [],
                    height: 460,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: ["AC_CD", { content: "textFilter" }], id: "AC_CD", width: 100, css: { 'text-align': 'center ! important' }, hidden: ($("#hdnAcCdInd").val() == "1"?false :true) },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 310, css: { 'text-align': 'left ! important' } },
                            { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                            { header: "A_IND", id: "A_IND", hidden: true },
                            { header: "B_IND", id: "B_IND", hidden: true },
                            { header: "C_IND", id: "C_IND", hidden: true },
                            { header: "D_IND", id: "D_IND", hidden: true },
                            { header: "E_IND", id: "E_IND", hidden: true },
                            { header: "F_IND", id: "F_IND", hidden: true },
                            { header: "L_IND", id: "L_IND", hidden: true },
                            { header: "M_IND", id: "M_IND", hidden: true },
                            { header: "N_IND", id: "N_IND", hidden: true },
                            { header: "O_IND", id: "O_IND", hidden: true },

                    ],
                    ready:function(){
                        this.getFilter("AC_ALT_NM").focus();
                        $$("grdAccount").select($$("grdAccount").getFirstId());
                        webix.UIManager.setFocus($$("grdAccount"));
                       
                        
                    },
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);
                            var CurRows = $$("grdGLTransDet").getSelectedItem();
                            var AnaAppl = "";
                            var A_IND = $.trim(selectedRows[0].A_IND);
                            var B_IND = $.trim(selectedRows[0].B_IND);
                            var C_IND = $.trim(selectedRows[0].C_IND);
                            var D_IND = $.trim(selectedRows[0].D_IND);
                            var E_IND = $.trim(selectedRows[0].E_IND);
                            var F_IND = $.trim(selectedRows[0].F_IND);
                            var L_IND = $.trim(selectedRows[0].L_IND);
                            var M_IND = $.trim(selectedRows[0].M_IND);
                            var N_IND = $.trim(selectedRows[0].N_IND);
                            var O_IND = $.trim(selectedRows[0].O_IND);

                            CurRows.AcNM = $.trim(selectedRows[0].AC_ALT_NM).replace(/&/g, '');
                            CurRows.hdnAcId = $.trim(selectedRows[0].AC_ID);
                            CurRows.ACCD = $.trim(selectedRows[0].AC_CD);
                            CurRows.BILL_DETAIL_IND = $.trim(selectedRows[0].BILL_DETAIL_IND);
                            if (A_IND == "1" || B_IND == "1" || C_IND == "1" || D_IND == "1" || E_IND == "1" || F_IND == "1" || L_IND == "1" || M_IND == "1"|| N_IND == "1"|| O_IND == "1")
                            {
                                AnaAppl = "1";
                            }
                            CurRows.AnaAppl = AnaAppl;
                            CurRows.ChkAind = A_IND;
                            CurRows.ChkBind = B_IND;
                            CurRows.ChkCind = C_IND;
                            CurRows.ChkDind = D_IND;
                            CurRows.ChkEind = E_IND;
                            CurRows.ChkFind = F_IND;
                            CurRows.ChkLind = L_IND;
                            CurRows.ChkMind = M_IND;
                            CurRows.ChkNind = N_IND;
                            CurRows.ChkOind = O_IND;
                           
                            $$("grdGLTransDet").refresh();
                            fnDeleteRowBillDetData();
                            fnDeleteRowGstDetData();
                            fnDeleteRowAnaData();
                          
                            if (AnaAppl == "1")
                            {
                                fnCallAnaysis($.trim(selectedRows[0].AC_ID), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);
                            }
                            else
                            {
                                $$("grdGlAnaly").hide();
                               
                            }
                            CurRows.btnGST = "";
                            if ($("#hdnGSTAppl").val() == "1" || $("#hdnInGstInd").val() == "1" || $("#hdnK_TAX").val() == "4" || $("#hdnK_TAX").val() == "3" || $("#hdnK_TAX").val() == "2" || $("#hdnM_TAX").val() == "4")
                            {
                                //var TBLDATA = fnGLTrnAcIdWiseLoad($.trim(selectedRows[0].AC_ID));
                                //CurRows.btnGST = TBLDATA.TBLGSTCOL;
                                var TaxCaption = fnLoadTaxCap($.trim(selectedRows[0].AC_ID), TaxDet);
                                CurRows.btnGST = TaxCaption;
                              
                            }

                            $$("grdGLTransDet").refresh();
                            $$("grdGLTransDet").select($$("grdGLTransDet").getSelectedId());
                            webix.UIManager.setFocus($$("grdGLTransDet"));
                            var itemval = $$("grdGLTransDet").getSelectedItem();
                            if (itemval.Drcr == "DR" && $("#hdnMULTI_CURRENCY_IND").val() != "1")
                                $$("grdGLTransDet").editCell(itemval.id, "Debit", false, true);
                            else if (itemval.Drcr == "CR" && $("#hdnMULTI_CURRENCY_IND").val() != "1")
                                $$("grdGLTransDet").editCell(itemval.id, "Credit", false, true);
                            else $$("grdGLTransDet").editCell(itemval.id, "CurrId", false, true);
                          
                            $$('PopupAccNmSrch').hide();
                        },
                        'onKeyPress': function (code, e) {
                            debugger;
                            var selRow = this.getSelectedItem();
                            var rowid = selRow.id;
                            var charCode = e.which || e.keyCode;
                            if (charCode == '13') {
                                var valid = this.getSelectedId(true);
                                var id = { row: valid[0].row };
                                this.callEvent("onItemDblClick", [id]);
                            }
                           
                        },
                        
                   

                       
                          'onBeforeFilter': function () {
                                this.select(this.getFirstId());
                                webix.UIManager.setFocus(this);
                                this.refresh();
                                },
                                'onAfterFilter': function () {
                                    //debugger;
                                    this.select(this.getFirstId());
                                    webix.UIManager.setFocus(this);
                                    this.refresh();
                                }
                       
                   
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 350,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAccNmSrch').hide();
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

   
}

function fnLoadAccountSrch(DrCrInd) {

    //$("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNACCSRCH";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["DivId"] = $$("ddldivision").getValue();
    dataparam["DrCrInd"] = (DrCrInd == "CR" ? 2 : 1);
    dataparam["CLASS_TY_ID"] = $("#hdnClssTyId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdAccount").clearAll();
                $$("grdAccount").parse(rowData);
                $$("grdAccount").refresh();
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
function fnLoadTaxCap(AcId, TaxDet) {
    debugger;
    var TaxCaption = $.trim($("#hdnTAXCap").val());
    var Parenttrntyid = $.trim($("#hdnParentTrnTyId").val());
    if (TaxCaption == "") TaxCaption = "VAT";
    var TranType = $.trim($("#hdnDefGlTrnTy").val());
    if (Parenttrntyid != "4" && Parenttrntyid != "5") TaxCaption = "";
    if ($("#hdnGSTAppl").val() == "1" || $("#hdnInGstInd").val() == "1" || $("#hdnK_TAX").val() != "" || $("#hdnM_TAX").val() != "") {

        var SrchData = TaxDet.filter(function (TaxDet) {
            return TaxDet.AC_ID == $.trim(AcId);
        });

        if (SrchData.length == 0) {
            if (AcId.substring(0, 12) != "000100010001" && AcId.substring(0, 12) != "000100010003" && AcId.substring(0, 12) != "000200040003"
             && AcId.substring(0, 12) != "000100010004") TaxCaption = TaxCaption;
            else TaxCaption = "";

        }
        else {
            if ((TranType == "2" || TranType == "4") && AcId.substring(0, 12) == "000100010004" && $("#hdnGSTAppl").val() == "1") TaxCaption = TaxCaption;
            else TaxCaption = "";

        }
    }
    return TaxCaption;
}
function fnGLTrnAcIdWiseLoad(AcId) {

  
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNACIDWISELOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["ParentTrnTyId"] = $("#hdnParentTrnTyId").val();
    dataparam["GstAppl"] = $("#hdnGSTAppl").val();
    dataparam["InGstInd"] = $("#hdnInGstInd").val();
    dataparam["K_TAX"] = $("#hdnK_TAX").val();
    dataparam["M_TAX"] = $("#hdnM_TAX").val();
    dataparam["TaxCaption"] = $("#hdnTAXCap").val();
    dataparam["AcId"] = AcId;

    var DataVal = JSON.stringify(dataparam);
    var rowData = "";
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
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

function fnCallAnaysis(AC_ID, A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND) {
    var getval = $$("grdGLTransDet").getSelectedItem();
    var id = $$("grdGlAnaly").getFirstId();
    var getval1 = $$("grdGlAnaly").getItem(id);
    var Amt = "";
    if (parseFloat(getval.Credit) > 0) Amt = getval.Credit == "" ? "0" : parseFloat(getval.Credit);
    else Amt = getval.Debit == "" ? "0" : parseFloat(getval.Debit);
    $$("grdGlAnaly").refresh();
    $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(Amt).toFixed(2);
    $$("grdGlAnaly").refreshColumns();
    
    var addrow = {
        Amount:Amt
    };

    $$("grdGlAnaly").clearAll();
    $$("grdGlAnaly").parse(addrow);
    $$("grdGlAnaly").refresh();



    var cnt = 0;

 //   debugger;

    if (A_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM1");
        $$("grdGlAnaly").showColumn("btnAnalID1");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM1");
        $$("grdGlAnaly").hideColumn("btnAnalID1");
    }

    if (B_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM2");
        $$("grdGlAnaly").showColumn("btnAnalID2");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM2");
        $$("grdGlAnaly").hideColumn("btnAnalID2");
    }

    if (C_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM3");
        $$("grdGlAnaly").showColumn("btnAnalID3");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM3");
        $$("grdGlAnaly").hideColumn("btnAnalID3");
    }

    if (D_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM4");
        $$("grdGlAnaly").showColumn("btnAnalID4");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM4");
        $$("grdGlAnaly").hideColumn("btnAnalID4");
    }

    if (E_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM5");
        $$("grdGlAnaly").showColumn("btnAnalID5");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM5");
        $$("grdGlAnaly").hideColumn("btnAnalID5");
    }

    if (F_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM6");
        $$("grdGlAnaly").showColumn("btnAnalID6");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM6");
        $$("grdGlAnaly").hideColumn("btnAnalID6");
    }

    if (L_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM7");
        $$("grdGlAnaly").showColumn("btnAnalID7");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM7");
        $$("grdGlAnaly").hideColumn("btnAnalID7");
    }

    if (M_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM8");
        $$("grdGlAnaly").showColumn("btnAnalID8");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM8");
        $$("grdGlAnaly").hideColumn("btnAnalID8");
    }

    if (N_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM9");
        $$("grdGlAnaly").showColumn("btnAnalID9");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM9");
        $$("grdGlAnaly").hideColumn("btnAnalID9");
    }

    if (O_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM10");
        $$("grdGlAnaly").showColumn("btnAnalID10");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM10");
        $$("grdGlAnaly").hideColumn("btnAnalID10");
    }

    if (parseInt(cnt) != 0) {
        fnCallAnalyData();
        $$("grdGlAnaly").show();
     //   $$("HidLblAnaly").hide();
        $$("grdGlAnaly").define("width", (parseInt(cnt) * 340));
        $$("grdGlAnaly").resize();



        $$("grdGlAnaly").refresh();

    }
    else {
        $$("grdGlAnaly").hide();
      //  $$("HidLblAnaly").show();
    }
}

function fnCallAnaysis_Old(AC_ID) {

    var addrow = {
        Drcr: ''
    };

    $$("grdGlAnaly").clearAll();
    $$("grdGlAnaly").parse(addrow);
    $$("grdGlAnaly").refresh();

    var Analysis = fnDisplayAnal(AC_ID);

    var TblCnt = Analysis.TBLANAYCNT;
    var Headers = Analysis.TBLHEAD;

    var cnt = 0;

    debugger;

    if (TblCnt[0].A_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM1");
        $$("grdGlAnaly").showColumn("btnAnalID1");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM1");
        $$("grdGlAnaly").hideColumn("btnAnalID1");
    }

    if (TblCnt[0].B_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM2");
        $$("grdGlAnaly").showColumn("btnAnalID2");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM2");
        $$("grdGlAnaly").hideColumn("btnAnalID2");
    }

    if (TblCnt[0].C_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM3");
        $$("grdGlAnaly").showColumn("btnAnalID3");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM3");
        $$("grdGlAnaly").hideColumn("btnAnalID3");
    }

    if (TblCnt[0].D_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM4");
        $$("grdGlAnaly").showColumn("btnAnalID4");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM4");
        $$("grdGlAnaly").hideColumn("btnAnalID4");
    }

    if (TblCnt[0].E_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM5");
        $$("grdGlAnaly").showColumn("btnAnalID5");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM5");
        $$("grdGlAnaly").hideColumn("btnAnalID5");
    }

    if (TblCnt[0].F_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM6");
        $$("grdGlAnaly").showColumn("btnAnalID6");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM6");
        $$("grdGlAnaly").hideColumn("btnAnalID6");
    }

    if (TblCnt[0].L_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM7");
        $$("grdGlAnaly").showColumn("btnAnalID7");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM7");
        $$("grdGlAnaly").hideColumn("btnAnalID7");
    }

    if (TblCnt[0].M_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM8");
        $$("grdGlAnaly").showColumn("btnAnalID8");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM8");
        $$("grdGlAnaly").hideColumn("btnAnalID8");
    }

    if (TblCnt[0].N_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM9");
        $$("grdGlAnaly").showColumn("btnAnalID9");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM9");
        $$("grdGlAnaly").hideColumn("btnAnalID9");
    }

    if (TblCnt[0].O_IND == "1") {
        $$("grdGlAnaly").showColumn("AnalNM10");
        $$("grdGlAnaly").showColumn("btnAnalID10");

        cnt = cnt + 1;
    }
    else {
        $$("grdGlAnaly").hideColumn("AnalNM10");
        $$("grdGlAnaly").hideColumn("btnAnalID10");
    }

    if (parseInt(cnt) != 0) {
        fnCallAnalyData();
        $$("grdGlAnaly").show();
     //   $$("HidLblAnaly").hide();
        $$("grdGlAnaly").define("width", (parseInt(cnt) * 340));
        $$("grdGlAnaly").resize();

       

        $$("grdGlAnaly").refresh();

    }
    else {
        $$("grdGlAnaly").hide();
     //   $$("HidLblAnaly").show();
    }
}
function fnCallAnalyData() {
    debugger;
    var itemval = $$("grdGLTransDet").getSelectedItem();
    var dsGlAnalyData = $$("grdGlAnalyData").serialize();

    if (dsGlAnalyData.length == 0) {
       
    }
    else {

        var CurrData = dsGlAnalyData.filter(function (dsGlAnalyData) {
            return dsGlAnalyData.RowId == $.trim(itemval.RowId);
        });

        if (CurrData.length == 0) {
           
        }
        else {
            $$("grdGlAnaly").clearAll();
            $$("grdGlAnaly").parse(CurrData);
            $$("grdGlAnaly").refresh();
        }
    }
}
function CallAnalysisPopup() {
    debugger;

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAnalySrch",
        head: "Analysis",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,

            elements: [
                {
                    view: "datatable",
                    id: "grdAnalySrch",
                    select: "row",
                    data: [],
                    height: 430,
                    scroll: "y",
                    columns: [
                          { header: ["Code", { content: "textFilter" }], id: "TC_ID", width: 80, css: { 'text-align': 'center ! important' } },
                          { header: ["Analysis", { content: "textFilter" }], id: "TC_NM", width: 300, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {

                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);

                            var AnalyId = $.trim(selectedRows[0].TC_ID);
                            var AnalyNm = $.trim(selectedRows[0].TC_NM).replace(/&/g, '');
                            
                            var CurRows = $$("grdGlAnaly").getSelectedItem();
                            var ColId = $("#hdnAnaColId").val();
                            if ($.trim(ColId) == "1") {
                                CurRows.AnalID1 = AnalyId;
                                CurRows.AnalNM1 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "2") {
                                CurRows.AnalID2 = AnalyId;
                                CurRows.AnalNM2 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "3") {
                                CurRows.AnalID3 = AnalyId;
                                CurRows.AnalNM3 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "4") {
                                CurRows.AnalID4 = AnalyId;
                                CurRows.AnalNM4 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "5") {
                                CurRows.AnalID5 = AnalyId;
                                CurRows.AnalNM5 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "6") {
                                CurRows.AnalID6 = AnalyId;
                                CurRows.AnalNM6 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "7") {
                                CurRows.AnalID7 = AnalyId;
                                CurRows.AnalNM7 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "8") {
                                CurRows.AnalID8 = AnalyId;
                                CurRows.AnalNM8 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "9") {
                                CurRows.AnalID9 = AnalyId;
                                CurRows.AnalNM9 = AnalyNm;
                            }
                            else if ($.trim(ColId) == "10") {
                                CurRows.AnalID10 = AnalyId;
                                CurRows.AnalNM10 = AnalyNm;
                            }

                            $$("grdGlAnaly").refresh();
                            fnStoreAnaData();
                            $$('PopupAnalySrch').hide();
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
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupAnalySrch').hide();
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

    //var Analysis = fnDisplayAnal(AC_ID);

    //var Headers = Analysis.TBLHEAD;

    //var SrchData = Headers.filter(function (Headers) {
    //    return Headers.L_ID == $.trim(ColId);
    //});

    //$$("grdAnalySrch").clearAll();
    //$$("grdAnalySrch").parse(SrchData);
    //$$("grdAnalySrch").refresh();

    //$$("PopupAnalySrch").show();
}
function fnCallAnaPopDataShow(SrchData)
{
    if ($$("grdAnalySrch") != undefined)
    {
        $$("grdAnalySrch").clearAll();
        $$("grdAnalySrch").parse(SrchData);
        $$("grdAnalySrch").refresh();
    }
       
  
    $$("PopupAnalySrch").show();
}

function fnCallLogPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "LogPopup",
        head: "Log",
        position: "center",
        minWidth: 700,
        maxWidth: 700,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 700,
            maxWidth: 700,

            elements: [
                {
                    view: "datatable",
                    id: "grdLog",
                    select: "row",
                    data: [],
                    height: 460,
                    scroll: "xy",
                    spans:true,
                    columns: [
                        
                             { header: ["Create Dt", ], id: "CDt", width: 90, css: { 'text-align': 'center ! important' } },
                              { header: ["Time", ], id: "CTm", width: 50, css: { 'text-align': 'center ! important' } },
                                 { header: ["By", ], id: "CBy", width: 50, css: { 'text-align': 'left ! important' } },
                                  { header: ["", ], id: "Type", width: 70, css: { 'text-align': 'left ! important' } },
                                      { header: ["Old", ], id: "Old", width: 200, css: { 'text-align': 'left ! important' } },
                                           { header: ["New", ], id: "New", width: 200, css: { 'text-align': 'left ! important' } },
                                                { header: ["CLR", ], id: "CLR", hidden:true, },
                         

                    ],
                    scheme: {
                        $change: function (item) {
                            if (item.CLR != "" && item.CLR != null) {
                                debugger;
                                var Columns = $$('grdLog').config.columns;
                                var ColCnt = Columns.length;
                                var rowid = item.id;
                              
                                if (item.CLR == "DetHead") {
                                    //$$("grdLog").addCellCss(rowid, "CDt", "DetHead");
                                    $$("grdLog").addSpan(item.id, "CDt", 6, 1, null, "GrpHeaderClr");
                                }
                               
                                else {
                                    debugger;
                                    item.$css = item.CLR;
                                }
                            }
                        }},
                    on: {
                     






                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 600,
                             paddingX: 600,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('LogPopup').hide();
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
    })

    fnLoadLogPopDet();
    $$("LogPopup").show();
}
function fnLoadLogPopDet() {

    //$("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNLOGDET";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $("#hdnDefGlTrnTy").val();
    dataparam["TRNID"] = $("#hdnGLTrnId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdLog").clearAll();
                $$("grdLog").parse(rowData);
                $$("grdLog").refresh();
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
//Project Search
function fnCallProjSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupProjSrch",
        head: "Project Search",
        position: "center",
        minWidth: 550,
        maxWidth: 550,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 550,
            maxWidth: 550,
            elements: [
                {
                    view: "datatable",
                    id: "grdProject",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: ["ProjectID", { content: "textFilter" }], id: "ProjId", width: 70, css: { 'text-align': 'center ! important' } },
                            { header: ["Short Name", { content: "textFilter" }], id: "ProjSNm", width: 80, css: { 'text-align': 'left ! important' } },
                            { header: ["Name", { content: "textFilter" }], id: "ProjNM", width: 200, css: { 'text-align': 'left ! important' } },
                            { header: "Start Date", id: "SatrtDt", width: 100, css: { 'text-align': 'center ! important' } },
                            { header: "Status", id: "Status", width: 60, css: { 'text-align': 'center ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);

                            var CurRows = $$("grdGLTransDet").getSelectedItem();

                            CurRows.ProjId = $.trim(selectedRows[0].ProjId);
                            CurRows.ProjNm = $.trim(selectedRows[0].ProjNM);

                            $$("grdGLTransDet").refresh();
                            $$('PopupProjSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 450,
                             paddingX: 440,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             css: "webix_primary",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupProjSrch').hide();
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

    fnLoadProjectLoad();
    $$("PopupProjSrch").show();
}

function fnLoadProjectLoad() {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNPROJSRCH";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdProject").clearAll();
                $$("grdProject").parse(rowData);
                $$("grdProject").refresh();
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

//Bank Search
function fnCallBankSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupBankSrch",
        head: "Bank Search",
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
                    id: "grdBank",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "B_ID", hidden: true },
                            { header: "AC_CD", id: "BR_N", hidden: true },
                            { header: ["Bank Name", { content: "textFilter" }], id: "B_NM", width: 350, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);

                            $$("txtBank").setValue($.trim(selectedRows[0].B_NM));
                            $$("txtBranch").setValue($.trim(selectedRows[0].BR_N));
                            $("#hdnBankId").val($.trim(selectedRows[0].B_ID));

                            $$('PopupBankSrch').hide();
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
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupBankSrch').hide();
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

    fnLoadBanks();
    $$("PopupBankSrch").show();
}

function fnLoadBanks() {

    //$("#LoadDIv").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLTRNBANKSRCH";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: true,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdBank").clearAll();
                $$("grdBank").parse(rowData);
                $$("grdBank").refresh();
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

//Bank Search
function fnCallBillDetails(ddlRefTy, Curr, FornAmt,ConvRt) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupBillDet",
        head: "Bill Details",
        position: "center",
        minWidth: 830,
        maxWidth: 830,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,
        move:true,

        body: {
            view: 'form',
            minWidth: 830,
            maxWidth: 830,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "txtBPopAmt",
                                    stringResult: true,
                                    label: "Amount",
                                    labelAlign: "left",
                                    inputAlign: "right",
                                    labelWidth: 60,
                                    inputWidth: 150,
                                    width: 150,
                                 
                                    //value: (Opt == "1" ? (CrAmt != "" ? parseFloat(CrAmt).toFixed(2) : 0) : (DrAmt != "" ? parseFloat(DrAmt).toFixed(2) : 0)),
                                },
                                {
                                    view: "label",
                                    id: "lblDRCR",
                                    labelAlign: "Left",
                                    inputWidth: 50,
                                    width: 50,
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCurr",
                                    stringResult: true,
                                    label: "Currency",
                                    labelAlign: "Right",
                                    labelWidth: 80,
                                    inputWidth: 180,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    disabled:true,
                                    width: 180,
                                    value:$("#hdnMULTI_CURRENCY_IND").val() == "1" ? Curr:"",
                                },
                                {
                                    view: "text",
                                    id: "txtBPopFAmt",
                                    stringResult: true,
                                    label: "Forn Amt",
                                    labelAlign: "Right",
                                    labelWidth: 110,
                                    inputWidth: 200,
                                    hidden: true,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    inputAlign: "right",
                                    disabled:true,
                                    width: 200,
                                    value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(FornAmt).toFixed(2):"",
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCovt",
                                    stringResult: true,
                                    label: "Conv.Rt",
                                    labelAlign: "Right",
                                    labelWidth: 100,
                                    inputWidth: 180,
                                    hidden: ($("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true),
                                    inputAlign: "right",
                                    disabled:true,
                                    width: 250,
                                    value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(ConvRt ).toFixed(2): "",
                                },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdBillDet",
                            select: "row",
                            //data: [{}],
                            data: [],
                            height: 280,
                            editable: true,
                            footer: true,
                            navigation: true,
                            autoConfig: true,
                            position: "flex",
                            scroll: "y",
                            columns: [
                                    { header: "Ref.Type Name", id: "RefTyId", width: 130, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlRefTy; } },
                                    { header: "Ref.Name", id: "RefNm", width: 200, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Bill Date", id: "BillDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Due Date", id: "DueDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' }, footer: { text: "Total" } },
                                    {
                                        header: "Debit", id: "DrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" },
                                       
                                        format: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                        editParse: function (value) {
                                            return webix.Number.parse(value, webix.i18n);
                                        },
                                        editFormat: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                     
                                       
                                    },
                                    {
                                        header: "Credit", id: "CrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" },
                                       
                                        format: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                        editParse: function (value) {
                                            return webix.Number.parse(value, webix.i18n);
                                        },
                                        editFormat: function (value) {
                                            return fnCurrFormat(value);
                                        },
                                      
                                    },
                                    {
                                        header: "From Amt", id: "FornAmt", hidden: true, width: 100, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        format: webix.i18n.numberFormat, footer: { content: "summColumn" }
                                    },
                                    { header: "RefTyNm", id: "RefTyNm", hidden: true },
                                    { header: "Drcr", id: "Drcr", hidden: true },
                                    { header: "hdnAcId", id: "hdnAcId", hidden: true },

                                    { header: "OAmt", id: "OFornBAmt", hidden: true },
                                    { header: "Convrt", id: "BillConvrt", hidden: true },
                                    
                                    { header: "FornOrgAmt", id: "OFornBAmt", hidden: true },
                                    { header: "diffAmt", id: "diffAmt", hidden: true },
                                    { header: "RowId", id: "RowId", hidden: true },
                                    { header: "CBy", id: "CBy", hidden: true },
                                    { header: "CDt", id: "CDt", hidden: true },
                                    { header: "AdjBy", id: "AdjBy", hidden: true },
                                    { header: "AdjDt", id: "AdjDt", hidden: true },
                                     { header: "UpDt", id: "billudt", hidden: true },
                                    { header: "", id: "btnBDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            ],
                            ready: function () {
                                $$("grdBillDet").select($$("grdBillDet").getFirstId());
                                webix.UIManager.setFocus($$("grdBillDet"));
                                //$$("grdBillDet").select($$("grdBillDet").getFirstId(), "RefTyId", true);

                            },
                            on: {
                                'onBeforeEditStart': function (id) {
                                    var getval = $$("grdBillDet").getItem(id);
                                    if (id.column == 'RefNm' || id.column == 'BillDt' || id.column == 'DueDt' )
                                    {
                                        if (getval.RefTyId !=undefined && getval.RefTyId == "3") return false;
                                        else return true;
                                    }
                                    if (id.column == "CrAmt") {
                                        if (getval.Drcr == "DR") return false;
                                        else return true;
                                    }
                                    if (id.column == "DrAmt") {
                                        if (getval.Drcr == "CR") return false;
                                        else return true;
                                    }
                                       
                                },
                                'onEditorChange': function (id, value, row) {
                                    debugger;
                                    var getval = $$("grdBillDet").getItem(id);
                                    
                                    var TrnVal = $$("grdGLTransDet").getSelectedItem();
                                   

                                   
                                    if (id.column == 'RefTyId') {

                                        getval.BillDt = $("#hdnCurrentDt").val();
                                        getval.DueDt = $("#hdnCurrentDt").val();
                                        getval.RefNm = "";
                                        getval.CBy = "";
                                        getval.CDt = "";
                                        getval.AdjBy = "";
                                        getval.AdjDt = "";
                                        getval.Drcr = $.trim(TrnVal.Drcr);
                                        getval.CrAmt = "";
                                        getval.DrAmt = "";
                                        getval.hdnAcId = $.trim(TrnVal.hdnAcId);
                                   

                                        var CurrData = ddlRefTy.filter(function (ddlRefTy) {
                                            return ddlRefTy.id == $.trim(value);
                                        });

                                        if (CurrData.length > 0)
                                            getval.RefTyNm = CurrData[0].value;

                                        if ($.trim(CurrData[0].value) == "Advance") {
                                            getval.BillDt = $$("txtFrmDate").getValue();
                                            getval.DueDt = $$("txtFrmDate").getValue();
                                        }

                                        $$("grdBillDet").refresh();

                                        if (value == "3") {
                                          
                                            fnPopUpPendingBills(getval.hdnAcId, ddlRefTy);
                                           
                                        }
                                        
                                    }
                                },
                                'onItemClick': function (id, e, node, trg) {
                                    var getval = $$("grdBillDet").getItem(id.row);

                                    $("#hdnBGClickCol").val(id.column);
                                    //debugger;
                                    if (id.column == 'btnBDel') {
                                        debugger;
                                        $$("grdBillDet").editCancel();
                                        $$("grdBillDet").remove($$("grdBillDet").getSelectedId());
                                        $$("grdBillDet").refresh();

                                        var dsBillDet = $$("grdBillDet").serialize();
                                        var TrnVal = $$("grdGLTransDet").getSelectedItem();

                                        fnBillTotal();
                                        if (dsBillDet.length == 0) {
                                            
                                            fnBillDetRowAdd('0', $.trim(TrnVal.RowId), $.trim(TrnVal.Drcr), $.trim(TrnVal.hdnAcId), $.trim(TrnVal.PsRate), $.trim(TrnVal.FornAmt));
                                        }
                                    }
                              
                               
                                   
                                 
                                },
                                'onKeyPress': function (e, id) {

                                    var getval = $$("grdBillDet").getSelectedItem();
                                    debugger;
                                    var charCode = (e.which) ? e.which : event.keyCode;
                                    if (charCode == 9)
                                    {
                                        return true;
                                    }
                                    if ($.trim($("#hdnBGClickCol").val()) == "CrAmt" || $.trim($("#hdnBGClickCol").val()) == "DrAmt") {
                                        if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                                            return true
                                        }
                                      
                                        if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                                            if (e == 40) {
                                                var TrnVal = $$("grdGLTransDet").getSelectedItem();
                                                fnBillDetRowAdd('1', $.trim(TrnVal.RowId), $.trim(TrnVal.Drcr), $.trim(TrnVal.hdnAcId), $.trim(TrnVal.PsRate), $.trim(TrnVal.FornAmt));
                                            }

                                            return false;
                                        }
                                        else {
                                            return true;
                                        }

                                        
                                    }
                                   
                                },
                                'onBlur': function () {
                                    debugger;                                  
                                 
                                    fnBillTotal();
                                    $$("grdBillDet").refresh();

                                    ////  $$("grdBillDet").editStop(); Calender not show previous
                                    
                                },
                                'onAfterEditStop': function (state, editor) {
                                    fnBillTotal();
                                    $$("grdBillDet").refresh();
                                },
                                'onAfterEditStart': function (id) {
                                var getColumn = id.column;
                                SelectedColumn = getColumn;
                                if (getColumn == "CrAmt" || getColumn == "DrAmt") {
                                    this.getEditor().getInputNode().setAttribute("maxlength", 14);
                                    this.getEditor().getInputNode().style.textAlign = "right";
                                }
                                if (getColumn == "RefNm") {
                                    this.getEditor().getInputNode().setAttribute("maxlength", 40);
                                }

                                },
                                onLiveEdit: function (state, editor) {
                                    debugger;
                                    var columnId = editor.column;
                                    var Row = editor.row;
                                    var SelRow = $$("grdBillDet").getItem(Row);
                                  

                                    if (columnId == "CrAmt") {
                                        var value = state.value;
                                        value = parseFloat(state.value);
                                        if (value < 0) value = (value * -1);
                                        if (value > 99999999.99) {// 9999999999.999
                                            SelRow.CrAmt = state.old;
                                            editor.setValue(state.old);
                                            this.editCancel();
                                            this.editCell(Row, "CrAmt", true, true)
                                            editor = this.getEditor();
                                            editor.getInputNode().selectionStart = state.old.length;

                                        }
                                        this.updateItem(Row, SelRow);
                                        this.refresh(Row);
                                    }
                                    if (columnId == "DrAmt") {
                                        debugger;
                                        var value = state.value;
                                        value = value.replace(/,/g, '');
                                        value = parseFloat(state.value);
                                        if (value < 0) value = (value * -1);
                                        if (value > 99999999.99) {// 9999999999.999
                                            SelRow.DrAmt = state.old;
                                            editor.setValue(state.old);
                                            this.editCancel();
                                            this.editCell(Row, "DrAmt", true, true)
                                            editor = this.getEditor();
                                            editor.getInputNode().selectionStart = state.old.length;

                                        }
                                        this.updateItem(Row, SelRow);
                                        this.refresh(Row);
                                    }
                                },
                            }
                        },
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 900,
                             rows: [
                                 {
                                     cols: [
                                          {
                                              view: "label",
                                              id: "lblBDiff",
                                              label: "Difference :",
                                              labelAlign: "Right",
                                              inputWidth: 100,
                                              width: 100,
                                              css: "RedColor",
                                          },
                                          {
                                              view: "label",
                                              id: "txtBDiffAmt",
                                              label: "",
                                              labelAlign: "Left",
                                              inputWidth: 80,
                                              width: 120,

                                          },
                                           {
                                               view: "text",
                                               id: "txtBPopGainAmt",
                                               stringResult: true,
                                               label: "Gain/Loss",
                                               labelAlign: "Right",
                                               labelWidth: 90,
                                               hidden: true,
                                               inputWidth: 180,
                                             //  hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true,
                                               inputAlign: "right",
                                               disabled: true,
                                               width: 180,
                                           },
                                           {
                                               view: "text",
                                               id: "txtBPopFAmtDiff",
                                               stringResult: true,
                                               label: "FornAmt Diff",
                                               labelAlign: "Right",
                                               labelWidth: 90,
                                               hidden: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? false : true,
                                               value: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? parseFloat(FornAmt).toFixed(2) : "",
                                               inputAlign: "right",
                                               inputWidth: 180,
                                               disabled:true,
                                               width: 180,
                                              
                                           },
                                     ]
                                 },
                                 {
                                    
                                     cols: [
                                         {
                                             width:630,
                                         },
                                         {
                                              view: 'button',
                                              label: 'Done',
                                              css: "webix_primary",
                                              id:"CbnDone",
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                  
                                                      var TotDebit = 0;
                                                      var TotCredit = 0;
                                                      
                                                      var grdBillDet = $$("grdBillDet").serialize();

                                                      if (grdBillDet.length != 0) {

                                                          for (i = 0; i < grdBillDet.length; i++) {
                                                              var RefTyId = $.trim(grdBillDet[i].RefTyId);
                                                              if (RefTyId == "" || RefTyId==undefined)
                                                              {
                                                                  AlertMessage("Reference Type found empty !");
                                                                  return;
                                                              }
                                                              if (RefTyId == "1" || RefTyId == "2")
                                                              {
                                                                  var vRet = $.trim(grdBillDet[i].RefNm);
                                                                  vRet=  $.trim(vRet).replace(/'/g, '');
                                                                  if (vRet == "")
                                                                  {
                                                                      AlertMessage("Reference Name found empty !");
                                                                      return;
                                                                  }
                                                              }
                                                              if (RefTyId != "4")
                                                              {
                                                                  var vRet = $.trim(grdBillDet[i].DueDt);
                                                                  if (vRet == "") {
                                                                      AlertMessage("Due Date found empty !");
                                                                      return;
                                                                  }

                                                                  var vRet = $.trim(grdBillDet[i].BillDt);
                                                                  if (vRet == "") {
                                                                      AlertMessage("Bill Date found empty !");
                                                                      return;
                                                                  }

                                                              }
                                                              var DrAmt = (grdBillDet[i].DrAmt == "" ? 0 : parseFloat(grdBillDet[i].DrAmt));
                                                              var CrAmt = (grdBillDet[i].CrAmt == "" ? 0 : parseFloat(grdBillDet[i].CrAmt));

                                                              if (DrAmt == 0 && CrAmt == 0) {
                                                                  AlertMessage("Debit/Credit value(s) found empty !");
                                                                  return;
                                                              }
                                                              TotDebit = parseFloat(TotDebit) + parseFloat(DrAmt);
                                                              TotCredit = parseFloat(TotCredit) + parseFloat(CrAmt);

                                                              for (j = 0; j < grdBillDet.length; j++) {
                                                                  var vRet = $.trim(grdBillDet[i].RefNm);
                                                                  var vRet1 = $.trim(grdBillDet[j].RefNm);
                                                                  if($.trim(grdBillDet[i].id)!=$.trim(grdBillDet[j].id))
                                                                  {
                                                                      if (vRet == vRet1 && RefTyId!="3")
                                                                      {
                                                                          AlertMessage("Reference Name already exists. !");
                                                                          return;
                                                                      }
                                                                  }

                                                              }

                                                          }

                                                      }
                                                      debugger;
                                                      var TotDiff1 = parseFloat(TotDebit) - parseFloat(TotCredit);
                                                      var Amount=($$("txtBDiffAmt").getValue() == "" ? 0 : parseFloat($$("txtBDiffAmt").getValue())).toFixed(2);
                                                      var ActAmt =($$("txtBPopAmt").getValue() == "" ? 0 : parseFloat($$("txtBPopAmt").getValue())).toFixed(2);

                                                   //   var DiffAmt=(parseFloat(ActAmt)-parseFloat(ActAmt));
                                                      var getval = $$("grdGLTransDet").getSelectedItem();

                                                     
                                                     

                                                      if ((Amount < 0) || parseFloat(Amount) != 0) {

                                                          if ((TotDiff1 < 0 && getval.Drcr == "DR") || (TotDiff1 > 0 && getval.Drcr == "CR")) {
                                                              AlertMessage("Difference: " + Amount + "/- found.");
                                                              return;
                                                          }

                                                          webix.modalbox({
                                                              title: "Confirmation !",
                                                              buttons: ["Yes", "No", "Cancel"],
                                                              width: 400,
                                                              height: 150,
                                                              text: "Difference: " + (Amount <0 ? Amount*(-1) :Amount) + "/- found.Processed with update ?"
                                                          }).then(function (result) {
                                                              var type = "";
                                                              if (result == 0) {
                                                                  fnBillDetDataRef();
                                                                  if ($$("grdBillDet") != undefined) {
                                                                      $$("grdBillDet").clearAll();
                                                                      $$("grdBillDet").refresh();
                                                                  }
                                                                  var getval = $$("grdGLTransDet").getSelectedItem();
                                                                  if (getval.Drcr == "DR") getval.Debit = ActAmt - Amount;                                                                  
                                                                  if (getval.Drcr == "CR") getval.Credit = ActAmt - Amount;
                                                                  $$("grdGLTransDet").refresh();
                                                                  $$('PopupBillDet').hide();

                                                              }
                                                              else if (result == 1) {

                                                              }
                                                              else if (result == 2) {

                                                              }
                                                          });

                                                      }
                                                      else {
                                                          fnBillDetDataRef();
                                                          if ($$("grdBillDet") != undefined) {
                                                              $$("grdBillDet").clearAll();
                                                              $$("grdBillDet").refresh();
                                                          }

                                                          
                                                          $$('PopupBillDet').hide();
                                                      }
                                                  }
                                              }
                                          },
                                          {
                                              width: 10,
                                          },
                                          {
                                              view: 'button',
                                              label: 'Close',
                                              id: 'CbnClose',
                                              css: "webix_primary",
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      debugger;
                                                    
                                                      $$('PopupBillDet').hide();
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

    debugger;

    var itemval = $$("grdGLTransDet").getSelectedItem();

    if (itemval.Drcr == "CR")
        $$("txtBPopAmt").setValue((itemval.Credit == "" ? 0 : parseFloat(itemval.Credit)).toFixed(2));
    else
        $$("txtBPopAmt").setValue((itemval.Debit == "" ? 0 : parseFloat(itemval.Debit)).toFixed(2));

    $$("lblDRCR").define("label", itemval.Drcr);
    $$("lblDRCR").refresh();
   
    var dsGlTrans = $$("grdGLTrnData").serialize();

    if (dsGlTrans.length == 0) {
        fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId, itemval.PsRate, itemval.FornAmt);
    }
    else {
     
        var DtFilter = dsGlTrans.filter(function (dsGlTrans) {
            return dsGlTrans.RowId == $.trim(itemval.RowId);
        });

        if (DtFilter.length == 0) {
            fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId, itemval.PsRate, itemval.FornAmt);
        }
        else {
            
            var DataStore = [];
            for (k = 0; k < DtFilter.length; k++) {

               
                if (DtFilter[k].hdnAcId != "") {

                    var CrAmt = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);

                    var DrAmt = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);

                    var FormAmt = (DtFilter[k].FormAmt || DtFilter[k].FormAmt == "NaN" || DtFilter[k].FormAmt == null ? 0 : parseFloat(DtFilter[k].FormAmt)).toFixed(2);

                    var addrow = {
                        Drcr: DtFilter[k].Drcr, ACCD: DtFilter[k].ACCD, hdnAcId: DtFilter[k].hdnAcId, AcNM: DtFilter[k].AcNM, hdnCurNm: DtFilter[k].hdnCurNm,
                        CurrId: DtFilter[k].CurrId, SlNo: DtFilter[k].SlNo, FCurBal: DtFilter[k].FCurBal, Credit: DtFilter[k].Credit, Debit: DtFilter[k].Debit, Narr: DtFilter[k].Narr,
                        DocNo: DtFilter[k].DocNo, DocDt: DtFilter[k].DocDt,

                        RefTyId: DtFilter[k].RefTyId, RefTyNm: DtFilter[k].RefTyNm, RefNm: DtFilter[k].RefNm, DueDt: DtFilter[k].DueDt.toString(),
                        BillDt: DtFilter[k].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FormAmt,

                        DETREF: DtFilter[k].DETREF, DATREF: DtFilter[k].DATREF, BILLREFSNO: DtFilter[k].BILLREFSNO, BILLREFBDT: DtFilter[k].BILLREFBDT,
                        BILLREFVNO: DtFilter[k].BILLREFVNO, billclno: DtFilter[k].billclno, billcldt: DtFilter[k].billcldt, billudt: DtFilter[k].billudt,
                        Nbilludt: DtFilter[k].Nbilludt,
                        CBy: DtFilter[k].CBy, CDt: DtFilter[k].CDt, AdjBy: DtFilter[k].AdjBy, AdjDt: DtFilter[k].AdjDt,
                        Gloss: DtFilter[k].Gloss, Fornbase: DtFilter[k].Fornbase, FornBill: DtFilter[k].FornBill, ConvrtBill: DtFilter[k].ConvrtBill,
                        EFornamt: DtFilter[k].EFornamt, btds: DtFilter[k].btds, btdsref: DtFilter[k].btdsref, SlId: DtFilter[k].SlId, RateTy: DtFilter[k].RateTy, RowId: DtFilter[k].RowId
                    };

                    DataStore = DataStore.concat(addrow);
                }
            }
            $$("grdBillDet").clearAll();
            $$("grdBillDet").parse(DataStore);
            $$("grdBillDet").refresh();
        }
    }

    fnBillTotal();
    $$("txtBPopAmt").disable();
    $$("PopupBillDet").show();
    webix.UIManager.setFocus($$("CbnDone"));
}

function fnCallNarrPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "NarrPopup",
        head: "Narration",
        position: "center",
        minWidth: 750,
        maxWidth: 750,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 750,
            maxWidth: 750,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "txtLineNarr",
                                    stringResult: true,
                                    label: "Line Narration",
                                    labelAlign: "Right",
                                    labelWidth: 90,
                                    inputWidth: 700,
                                    width: 700,
                                    attributes: { maxlength: 90 },
                                    on: {
                                        'onKeyPress': function (e, id) {
                                            debugger;
                                            var charCode = (e.which) ? e.which : event.keyCode;
                                            if (charCode == 13) webix.UIManager.setFocus($$("btnNarrrOk"));
                                        }
                                    }
                                   
                                },
                             
                            ]
                        },


                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 900,
                             rows: [
                                
                                 {

                                     cols: [
                                         {
                                             width: 630,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Ok',
                                             id: "btnNarrrOk",
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     var itemval = $$("grdGLTransDet").getSelectedItem();
                                                     //  itemval.Narr = $.trim($$("txtLineNarr").getValue()).replace(/&/g, '');
                                                     itemval.Narr = $.trim($$("txtLineNarr").getValue());
                                                     $$("grdGLTransDet").refresh();
                                                     $$('NarrPopup').hide();
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
    })
  
  
    debugger;

    
}
function fnCallReasonPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ReasonPopup",
        head: "Reason",
        position: "center",
        minWidth: 750,
        maxWidth: 750,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 500,

        body: {
            view: 'form',
            minWidth: 750,
            maxWidth: 750,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "TxtReason",
                                    stringResult: true,
                                    label: "Reason",
                                    labelAlign: "Right",
                                    labelWidth: 90,
                                    inputWidth: 700,
                                    width: 700,
                                    attributes: { maxlength: 90 },

                                },

                            ]
                        },


                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 900,
                             rows: [

                                 {

                                     cols: [
                                         {
                                             width: 630,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Ok',
                                             css: "webix_primary",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('ReasonPopup').hide();
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
    })


    debugger;


}

function fnBillTotal() {
  //  debugger;
    var itemval = $$("grdGLTransDet").getSelectedItem(true);

    if (itemval.length > 0) {

        var retVal = 0;
        var DetAdmt = $$("txtBPopAmt").getValue();
        var DrAmt = 0; var CrAmt = 0;

        var grdBillDet = $$("grdBillDet").serialize();

        if (grdBillDet.length != 0) {

            for (i = 0; i < grdBillDet.length; i++) {

                DrAmt = DrAmt + (grdBillDet[i].DrAmt == "" || grdBillDet[i].DrAmt == null || grdBillDet[i].DrAmt == "NaN" ? 0 : parseFloat(grdBillDet[i].DrAmt))

                CrAmt = CrAmt + (grdBillDet[i].CrAmt == "" || grdBillDet[i].CrAmt == null || grdBillDet[i].CrAmt == "NaN" ? 0 : parseFloat(grdBillDet[i].CrAmt))
            }
        }

        //if ($.trim(itemval[0].Drcr) == "CR")
        //    retVal = parseFloat(DetAdmt) - parseFloat(CrAmt);
        //else
        //    retVal = parseFloat(DetAdmt) - parseFloat(DrAmt);
        if ($.trim(itemval[0].Drcr) == "CR")
            retVal = parseFloat(DetAdmt) - (parseFloat(CrAmt) - parseFloat(DrAmt));
        else
            retVal = parseFloat(DetAdmt) - (parseFloat(DrAmt) - parseFloat(CrAmt));

        $$("txtBDiffAmt").setValue(retVal.toFixed(2));
    }
}
function fnMainGridTotal() {
   //   debugger;
   

        var DrAmt = 0; var CrAmt = 0;

        var grdGLTransDet = $$("grdGLTransDet").serialize();

        if (grdGLTransDet.length != 0) {

            for (i = 0; i < grdGLTransDet.length; i++) {

                DrAmt = DrAmt + (grdGLTransDet[i].Debit == "" || grdGLTransDet[i].Debit == null || grdGLTransDet[i].Debit == "NaN" ? 0 : parseFloat(grdGLTransDet[i].Debit))

                CrAmt = CrAmt + (grdGLTransDet[i].Credit == "" || grdGLTransDet[i].Credit == null || grdGLTransDet[i].Credit == "NaN" ? 0 : parseFloat(grdGLTransDet[i].Credit))
            }
        } 
        var retVal = (parseFloat(DrAmt) - parseFloat(CrAmt));
        if (retVal < 0)
        {
            retVal = retVal * (-1);
            $$("lblTDiff").define("label", "Credit Difference ")
            $$("txtTDiffAmt").setValue("(" + retVal.toFixed(2) + ")");
           
        }
        else {
            $$("lblTDiff").define("label", "Debit Difference ")
            $$("txtTDiffAmt").setValue(retVal.toFixed(2));
        }
        $$("lblTDiff").refresh()
       
     
  
}


//Pending Bills
function fnPopUpPendingBills(vhdnAcId, ddlRefTy) {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupPendBills",
        head: "Pending Bills",
        position: "center",
        minWidth: 930,
        maxWidth: 930,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 930,
            maxWidth: 930,

            elements: [
                {
                    view: "datatable",
                    id: "grdPending",
                    select: "row",
                    data: [],
                    height: 430,
                    scroll: "y",
                    columns: [
                            { header: ["Ref.Nm.", { content: "textFilter" }], id: "RefNM", width: 125, css: { 'text-align': 'left ! important' } },
                            { header: ["Voucher No", { content: "textFilter" }], id: "VouchNo", width: 90, css: { 'text-align': 'left ! important' } },
                            { header: ["Due Date", { content: "textFilter" }], id: "DueDt", width: 95, css: { 'text-align': 'left ! important' } },
                            { header: ["Pending Amt", { content: "textFilter" }], id: "PendAmt", width: 95, css: { 'text-align': 'right ! important' } },
                            { header: "", id: "CrDr", width: 40, css: { 'text-align': 'right ! important' } },
                            { header: "Select", id: "ChkSelect", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 55, css: { 'text-align': 'center ! important' } },
                            { header: ["Narration", { content: "textFilter" }], id: "Narration", width: 200, css: { 'text-align': 'right ! important' } },
                            { header: "Curr", id: "Curr", width: 80, css: { 'text-align': 'right ! important' } },
                            { header: "Forn Amt", id: "FAmt", width: 100, css: { 'text-align': 'right ! important' } },
                            { header: "TrnId", id: "TrnId", hidden: true },
                            { header: "ConvFact", id: "ConvFact", hidden: true },
                            { header: "DueDt1", id: "DueDt1", hidden: true, editor: 'date', format: webix.Date.dateToStr("%d-%m-%Y"), liveEdit: true, },
                               { header: "UpDt", id: "billudt", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 930,
                             paddingX: 830,
                             rows: [
                                 {
                                     cols: [
                                          {
                                              view: 'button',
                                              label: 'Ok',
                                              css: "webix_primary",
                                              maxWidth: 75,
                                              inputWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      debugger;
                                                      var data = $$("grdPending").serialize();
                                                      var grdData = $$("grdBillDet").serialize();
                                                      var lenval = grdData.length;
                                                      var vRowId = $$("grdGLTransDet").getSelectedId();

                                                      var DtFilter = data.filter(function (data) {
                                                          return data.ChkSelect == "1";
                                                      });
                                                      if (DtFilter.length == 0)
                                                      {
                                                          AlertMessage("Please Select the Bill !");
                                                          return;
                                                      }
                                                      
                                                      if (lenval > 0 )
                                                      {
                                                          $$("grdBillDet").editCancel();
                                                          $$("grdBillDet").remove($$("grdBillDet").getSelectedId());
                                                          $$("grdBillDet").refresh();
                                                      }
                                                        grdData = $$("grdBillDet").serialize();
                                                        lenval = grdData.length;
                                                     
                                                        TrnVal = $$("grdGLTransDet").getSelectedItem();
                                                      for (i = 0; i < data.length; i++) {

                                                          debugger;
                                                          if (data[i].ChkSelect == "1") {
                                                             
                                                              var PendRefNm = $.trim(data[i].RefNM);
                                                              var vRefTyNM = "";

                                                              var dataval = $$("grdBillDet").getSelectedItem();

                                                          //    var vRowId = grdData[lenval - 1].RowId;
                                                              //  var HDRCR = grdData[lenval - 1].Drcr;
                                                              var HDRCR = $.trim(data[i].CrDr);
                                                              var vRefTyId = "3";


                                                              var CurrData = ddlRefTy.filter(function (ddlRefTy) {
                                                                  return ddlRefTy.id == $.trim(vRefTyId);
                                                              });

                                                              if (CurrData.length > 0)
                                                                  vRefTyNM = CurrData[0].value;

                                                           
                                                                  var addrow = {
                                                                      RowId: vRowId,
                                                                      RefTyId: vRefTyId, RefTyNm: vRefTyNM, RefNm: data[i].RefNM, BillDt: data[i].DueDt1, DueDt: data[i].DueDt1,
                                                                      DrAmt: (HDRCR == "CR" ? data[i].PendAmt : ""), CrAmt: (HDRCR == "DR" ? data[i].PendAmt : ""), FornAmt: data[i].FAmt,
                                                                      Drcr: (HDRCR == "CR" ? "DR" : "CR"), OFornBAmt: '', BillConvrt: $("#hdnMULTI_CURRENCY_IND").val() == "1" ? $.trim(TrnVal.PsRate) : data[i].ConvFact, diffAmt: '', hdnAcId: vhdnAcId, CBy: '', CDt: '', AdjBy: '', AdjDt: '', billudt: data[i].billudt
                                                                  };
                                                                  $$("grdBillDet").add(addrow);
                                                          

                                                          
                                                          }
                                                      }


                                                      $$("grdBillDet").refresh();
                                                      fnBillTotal();
                                                      $$('PopupPendBills').hide();
                                                  }
                                              }
                                          },
                                          {
                                              view: 'button',
                                              label: 'Close',
                                              css: "webix_primary",
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      $$('PopupPendBills').hide();
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

    fnLoadPendingBills(vhdnAcId);

    debugger;
    var grdBillDet = $$("grdBillDet").serialize();
    var grdTranData = $$("grdGLTrnData").serialize();
    var grdPendata = $$("grdPending").serialize();
    if (grdTranData.length > 0 && grdPendata.length > 0) {

        var DtFilter = grdTranData.filter(function (grdTranData) {
            return grdTranData.RefTyId == 3;
        });

        if (DtFilter.length != 0) {
            for (k = 0; k < DtFilter.length; k++) {
                var PendFilter = grdPendata.filter(function (grdPendata) {
                    return grdPendata.RefNM == $.trim(DtFilter[k].RefNm);
                });
                if (PendFilter.length != 0) {
                    $$("grdPending").editCancel();
                    $$("grdPending").remove(PendFilter[0].id);
                    $$("grdPending").refresh();
                }
            }
        }
    }
    debugger;
    if (grdBillDet.length > 0 && grdPendata.length > 0) {

        var DtFilter = grdBillDet.filter(function (grdBillDet) {
            return grdBillDet.RefTyId == 3;
        });

        if (DtFilter.length != 0) {
            for (k = 0; k < DtFilter.length; k++) {
                var PendFilter = grdPendata.filter(function (grdPendata) {
                    return grdPendata.RefNM == $.trim(DtFilter[k].RefNm);
                });
                if (PendFilter.length != 0) {
                    $$("grdPending").editCancel();
                    $$("grdPending").remove(PendFilter[0].id);
                    $$("grdPending").refresh();
                }
            }
        }
    }


    $$("PopupPendBills").show();
   
    

   
}
function fnFloatText(code, e, vText) {
    debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
   

    if (charCode == 46 || charCode == 37 || charCode == 39 || charCode == 190 || charCode == 110) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    //if (charCode == 13)
    //{
    //    $$("grdGLTransDet").select($$("grdGLTransDet").getSelectedId());
    //    webix.UIManager.setFocus($$("grdGLTransDet"));
    //    var itemval = $$("grdGLTransDet").getSelectedItem();
    //    $$("grdGLTransDet").editCell(itemval.id, "Debit", false, true);
    //    return true;
    
    //}
    else {
        debugger;
       
        return true;
    }
};

function fnLoadPendingBills(AcId) {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PENDINGBILLLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Mode"] = $("#hdnCurMode").val();
    dataparam["Acid"] = AcId;
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    if($("#hdnCurMode").val()=="O") dataparam["TrnId"] = $("#hdnGLTrnId").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdPending").clearAll();
                $$("grdPending").parse(rowData);
                $$("grdPending").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
    debugger;
   
}
function fnStoreAnaData()
{
    debugger;
    var DataStore = [];

    var grdGlAnaly = [];

    if ($$("grdGlAnaly") != undefined)
        grdGlAnaly = $$("grdGlAnaly").serialize();

    var grdGlAnalyData = $$("grdGlAnalyData").serialize();

    var grdTranDet = $$("grdGLTransDet").serialize();

    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
 
    if (grdTranDet.length != 0) {
        var CurrSelRowId = DetSelRow.RowId;

        for (i = 0; i < grdTranDet.length; i++) {
          
            var CurrRowId = grdTranDet[i].RowId;
            var AnaAppl = grdTranDet[i].AnaAppl;

            if ($.trim(AnaAppl)== "1")
            {
                if (grdGlAnalyData.length == 0) {

                    if (grdGlAnaly.length != 0) {
                        for (j = 0; j < grdGlAnaly.length; j++) {
                            var Amt = (grdGlAnaly[j].Amount == "" ? 0 : parseFloat(grdGlAnaly[j].Amount)).toFixed(2);
                            var AnalID1 = (grdGlAnaly[j].AnalID1 == "" ? "" : $.trim(grdGlAnaly[j].AnalID1));
                            var AnalID2 = (grdGlAnaly[j].AnalID2 == "" ? "" : $.trim(grdGlAnaly[j].AnalID2));
                            var AnalID3 = (grdGlAnaly[j].AnalID3 == "" ? "" : $.trim(grdGlAnaly[j].AnalID3));
                            var AnalID4 = (grdGlAnaly[j].AnalID4 == "" ? "" : $.trim(grdGlAnaly[j].AnalID4));
                            var AnalID5 = (grdGlAnaly[j].AnalID5 == "" ? "" : $.trim(grdGlAnaly[j].AnalID5));
                            var AnalID6 = (grdGlAnaly[j].AnalID6 == "" ? "" : $.trim(grdGlAnaly[j].AnalID6));
                            var AnalID7 = (grdGlAnaly[j].AnalID7 == "" ? "" : $.trim(grdGlAnaly[j].AnalID7));
                            var AnalID8 = (grdGlAnaly[j].AnalID8 == "" ? "" : $.trim(grdGlAnaly[j].AnalID8));
                            var AnalID9 = (grdGlAnaly[j].AnalID9 == "" ? "" : $.trim(grdGlAnaly[j].AnalID9));
                            var AnalID10 = (grdGlAnaly[j].AnalID10 == "" ? "" : $.trim(grdGlAnaly[j].AnalID10));

                            var addrow = {
                                AnalID1: AnalID1, AnalNM1: grdGlAnaly[j].AnalNM1, btnAnalID1: '', AnalID2: AnalID2, AnalNM2: grdGlAnaly[j].AnalNM2, btnAnalID2: '', AnalID3: AnalID3, AnalNM3: grdGlAnaly[j].AnalNM3, btnAnalID3: '', AnalID4:AnalID4, AnalNM4: grdGlAnaly[j].AnalNM4, btnAnalID4: '',
                                AnalID5: AnalID5, AnalNM5: grdGlAnaly[j].AnalNM5, btnAnalID5: '', AnalID6: AnalID6, AnalNM6: grdGlAnaly[j].AnalNM6, btnAnalID6: '', AnalID7: AnalID7, AnalNM7: grdGlAnaly[j].AnalNM7, btnAnalID7: '', AnalID8:AnalID8, AnalNM8: grdGlAnaly[j].AnalNM8, btnAnalID8: '',
                                AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId,
                            };
                      

                            DataStore = DataStore.concat(addrow);
                        }
                    }
                    else {

                        if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {
                            var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                            var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);

                            var Amt = 0;
                            if (Credit != 0) Amt = Credit;
                            else if (Debit != 0) Amt = Debit;
                        
                            var addrow = {
                                AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId,
                            };
                            DataStore = DataStore.concat(addrow);
                        }
                    }
                }
                else {

                    if (CurrSelRowId == CurrRowId) {

                        if (grdGlAnaly.length != 0) {
                            for (j = 0; j < grdGlAnaly.length; j++) {

                                var Amt = (grdGlAnaly[j].Amount == "" ? 0 : parseFloat(grdGlAnaly[j].Amount)).toFixed(2);
                                var AnalID1 = (grdGlAnaly[j].AnalID1 == "" ? "" : $.trim(grdGlAnaly[j].AnalID1));
                                var AnalID2 = (grdGlAnaly[j].AnalID2 == "" ? "" : $.trim(grdGlAnaly[j].AnalID2));
                                var AnalID3 = (grdGlAnaly[j].AnalID3 == "" ? "" : $.trim(grdGlAnaly[j].AnalID3));
                                var AnalID4 = (grdGlAnaly[j].AnalID4 == "" ? "" : $.trim(grdGlAnaly[j].AnalID4));
                                var AnalID5 = (grdGlAnaly[j].AnalID5 == "" ? "" : $.trim(grdGlAnaly[j].AnalID5));
                                var AnalID6 = (grdGlAnaly[j].AnalID6 == "" ? "" : $.trim(grdGlAnaly[j].AnalID6));
                                var AnalID7 = (grdGlAnaly[j].AnalID7 == "" ? "" : $.trim(grdGlAnaly[j].AnalID7));
                                var AnalID8 = (grdGlAnaly[j].AnalID8 == "" ? "" : $.trim(grdGlAnaly[j].AnalID8));
                                var AnalID9 = (grdGlAnaly[j].AnalID9 == "" ? "" : $.trim(grdGlAnaly[j].AnalID9));
                                var AnalID10 = (grdGlAnaly[j].AnalID10 == "" ? "" : $.trim(grdGlAnaly[j].AnalID10));

                                //var addrow = {
                                //    AnalID1: grdGlAnaly[j].AnalID1, AnalNM1: grdGlAnaly[j].AnalNM1, btnAnalID1: '', AnalID2: grdGlAnaly[j].AnalID2, AnalNM2: grdGlAnaly[j].AnalNM2, btnAnalID2: '', AnalID3: grdGlAnaly[j].AnalID3, AnalNM3: grdGlAnaly[j].AnalNM3, btnAnalID3: '', AnalID4: grdGlAnaly[j].AnalID4, AnalNM4: grdGlAnaly[j].AnalNM4, btnAnalID4: '',
                                //    AnalID5: grdGlAnaly[j].AnalID5, AnalNM5: grdGlAnaly[j].AnalNM5, btnAnalID5: '', AnalID6: grdGlAnaly[j].AnalID6, AnalNM6: grdGlAnaly[j].AnalID6, btnAnalID6: '', AnalID7: grdGlAnaly[j].AnalID7, AnalNM7: grdGlAnaly[j].AnalNM7, btnAnalID7: '', AnalID8: grdGlAnaly[j].AnalID8, AnalNM8: grdGlAnaly[j].AnalNM8, btnAnalID8: '',
                                //    AnalID9: grdGlAnaly[j].AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: grdGlAnaly[j].AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
                                //};
                                var addrow = {
                                    AnalID1: AnalID1, AnalNM1: grdGlAnaly[j].AnalNM1, btnAnalID1: '', AnalID2: AnalID2, AnalNM2: grdGlAnaly[j].AnalNM2, btnAnalID2: '', AnalID3: AnalID3, AnalNM3: grdGlAnaly[j].AnalNM3, btnAnalID3: '', AnalID4: AnalID4, AnalNM4: grdGlAnaly[j].AnalNM4, btnAnalID4: '',
                                    AnalID5: AnalID5, AnalNM5: grdGlAnaly[j].AnalNM5, btnAnalID5: '', AnalID6: AnalID6, AnalNM6: grdGlAnaly[j].AnalNM6, btnAnalID6: '', AnalID7: AnalID7, AnalNM7: grdGlAnaly[j].AnalNM7, btnAnalID7: '', AnalID8: AnalID8, AnalNM8: grdGlAnaly[j].AnalNM8, btnAnalID8: '',
                                    AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {
                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);
                                var Amt = 0;
                                if (Credit != 0) Amt = Credit;
                                else if (Debit != 0) Amt = Debit;

                                var addrow = {
                                    AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                    AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId,
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                    }
                    else {

                        var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
                            return grdGlAnalyData.RowId == CurrRowId;
                        });

                        if (DtFilter.length == 0) {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);
                                var Amt = 0;
                                if (Credit != 0) Amt = Credit;
                                else if (Debit != 0) Amt = Debit;
                             

                                var addrow = {
                                    AnalID1: '', AnalNM1: '', btnAnalID1: '', AnalID2: '', AnalNM2: '', btnAnalID2: '', AnalID3: '', AnalNM3: '', btnAnalID3: '', AnalID4: '', AnalNM4: '', btnAnalID4: '',
                                    AnalID5: '', AnalNM5: '', btnAnalID5: '', AnalID6: '', AnalNM6: '', btnAnalID6: '', AnalID7: '', AnalNM7: '', btnAnalID7: '', AnalID8: '', AnalNM8: '', btnAnalID8: '',
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: grdTranDet[i].hdnAcId,
                                };
                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            for (k = 0; k < DtFilter.length; k++) {

                                if (DtFilter[k].hdnAcId != "") {

                                    var CrAmt = (DtFilter[k].CrAmt == "" ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);

                                    var DrAmt = (DtFilter[k].DrAmt == "" ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);

                                    var Amt = (DtFilter[k].Amount == "" ? 0 : parseFloat(DtFilter[k].Amount)).toFixed(2);

                                    var addrow = {
                                        AnalID1: DtFilter[k].AnalID1, AnalNM1: DtFilter[k].AnalNM1, btnAnalID1: '', AnalID2: DtFilter[k].AnalID2, AnalNM2: DtFilter[k].AnalNM2, btnAnalID2: '', AnalID3: DtFilter[k].AnalID3, AnalNM3: DtFilter[k].AnalNM3, btnAnalID3: '', AnalID4: DtFilter[k].AnalID4, AnalNM4: DtFilter[k].AnalNM4, btnAnalID4: '',
                                        AnalID5: DtFilter[k].AnalID5, AnalNM5: DtFilter[k].AnalNM5, btnAnalID5: '', AnalID6: DtFilter[k].AnalID6, AnalNM6: DtFilter[k].AnalID6, btnAnalID6: '', AnalID7: DtFilter[k].AnalID7, AnalNM7: DtFilter[k].AnalNM7, btnAnalID7: '', AnalID8: DtFilter[k].AnalID8, AnalNM8: DtFilter[k].AnalNM8, btnAnalID8: '',
                                        AnalID9: DtFilter[k].AnalID9, AnalNM9: DtFilter[k].AnalNM9, btnAnalID9: '', AnalID10: DtFilter[k].AnalID10, AnalNM10: DtFilter[k].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: CurrRowId, hdnAcId: DtFilter[k].hdnAcId,
                                    };

                                    DataStore = DataStore.concat(addrow);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $$("grdGlAnalyData").clearAll();
    $$("grdGlAnalyData").parse(DataStore);
    $$("grdGlAnalyData").refresh();
}

function fnDeleteRowBillDetData()
{
    debugger;
    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
    var CurrSelRowId = DetSelRow.RowId;
    var grdTranData = $$("grdGLTrnData").serialize();
    var DtFilter = grdTranData.filter(function (grdTranData) {
        return grdTranData.RowId == CurrSelRowId;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            //if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {
            if (DtFilter[k].hdnAcId != "") {
                $$("grdGLTrnData").editCancel();
                $$("grdGLTrnData").remove(DtFilter[k].id);
                $$("grdGLTrnData").refresh();
            }
        }
    }
}
function fnDeleteRowAnaData() {
    debugger;
    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
    var CurrSelRowId = DetSelRow.RowId;
    var grdGlAnalyData = $$("grdGlAnalyData").serialize();
    var DtFilter = grdGlAnalyData.filter(function (grdGlAnalyData) {
        return grdGlAnalyData.RowId == CurrSelRowId;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            if (DtFilter[k].hdnAcId != "") {
                $$("grdGlAnalyData").editCancel();
                $$("grdGlAnalyData").remove(DtFilter[k].id);
                $$("grdGlAnalyData").refresh();
            }
        }
    }
}
function fnBillDetDataRef() {
    debugger;
    var DataStore = [];

    var grdBillDet = [];

    if ($$("grdBillDet") != undefined)
        grdBillDet = $$("grdBillDet").serialize();

    var grdTranData = $$("grdGLTrnData").serialize();

    var grdTranDet = $$("grdGLTransDet").serialize();

    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
   
   

    if (grdTranDet.length != 0) {
        var CurrSelRowId = DetSelRow.RowId;

        for (i = 0; i < grdTranDet.length; i++) {

            var CurrRowId = grdTranDet[i].RowId;
            var BillDetailInd = grdTranDet[i].BILL_DETAIL_IND;
            if (BillDetailInd == "1")
            {

                if (grdTranData.length == 0) {

                    if (grdBillDet.length != 0) {
                        for (j = 0; j < grdBillDet.length; j++) {
                            if (CurrSelRowId == CurrRowId)
                            {
                                var Credit = (grdTranDet[i].Credit == "" || grdTranDet[i].Credit == "NaN" || grdTranDet[i].Credit == null) ? 0 : parseFloat(grdTranDet[i].Credit).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" || grdTranDet[i].Debit == "NaN" || grdTranDet[i].Debit == null) ? 0 : parseFloat(grdTranDet[i].Debit).toFixed(2);

                                var CrAmt = (grdBillDet[j].CrAmt == "" || grdBillDet[j].CrAmt == "NaN" || grdBillDet[j].CrAmt == null) ? 0 : parseFloat(grdBillDet[j].CrAmt).toFixed(2);

                                var DrAmt = (grdBillDet[j].DrAmt == "" || grdBillDet[j].DrAmt == "NaN" || grdBillDet[j].DrAmt == null) ? 0 : parseFloat(grdBillDet[j].DrAmt).toFixed(2);
                                var FornAmt = (grdBillDet[j].FornAmt == undefined || grdBillDet[j].FornAmt == "" || grdBillDet[j].FornAmt == "NaN" || grdBillDet[j].FornAmt == null) ? 0 : parseFloat(grdBillDet[j].FornAmt).toFixed(2);
                                var Drcr = grdTranDet[i].Drcr;
                                if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdBillDet[j].BillConvrt != undefined) FornAmt = Drcr == "DR" ? parseFloat(DrAmt / parseFloat(grdBillDet[j].BillConvrt).toFixed(7)).toFixed(2) : parseFloat(CrAmt / parseFloat(grdBillDet[j].BillConvrt).toFixed(7)).toFixed(2);
                                var Sno = j + 1;

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                    BillDt: grdBillDet[j].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FornAmt,
                                    CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt, AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,

                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: grdBillDet[j].billudt != undefined ? grdBillDet[j].billudt:"", Nbilludt: '',
                                    Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: grdBillDet[j].BillConvrt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdBillDet[j].BillConvrt, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                            
                        }
                    }
                    else {

                        if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                            var Credit = (grdTranDet[i].Credit == "" || grdTranDet[i].Credit == "NaN" || grdTranDet[i].Credit== null )? 0 : parseFloat(grdTranDet[i].Credit).toFixed(2);

                            var Debit = (grdTranDet[i].Debit == "" || grdTranDet[i].Debit == "NaN" || grdTranDet[i].Debit == null )? 0 : parseFloat(grdTranDet[i].Debit).toFixed(2);

                            var addrow = {
                                Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                CBy: '', CDt: '', AdjBy:'', AdjDt: '',

                                DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId
                            };

                            DataStore = DataStore.concat(addrow);
                        }
                    }
                }
                else {

                    if (CurrSelRowId == CurrRowId) {

                        if (grdBillDet.length != 0) {
                            for (j = 0; j < grdBillDet.length; j++) {

                                var Credit = (grdTranDet[i].Credit == "" || grdTranDet[i].Credit == "NaN" || grdTranDet[i].Credit == null)? 0 : parseFloat(grdTranDet[i].Credit).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" || grdTranDet[i].Debit == "NaN" || grdTranDet[i].Debit ==null) ? 0 : parseFloat(grdTranDet[i].Debit).toFixed(2);

                                var CrAmt = (grdBillDet[j].CrAmt == "" || grdBillDet[j].CrAmt == "NaN" || grdBillDet[j].CrAmt == null)  ? 0 : parseFloat(grdBillDet[j].CrAmt).toFixed(2);

                                var DrAmt = (grdBillDet[j].DrAmt == "" || grdBillDet[j].DrAmt == "NaN" || grdBillDet[j].DrAmt == null )? 0 : parseFloat(grdBillDet[j].DrAmt).toFixed(2);
                                var FornAmt = (grdBillDet[j].FornAmt == "" || grdBillDet[j].FornAmt == "NaN" || grdBillDet[j].FornAmt == null || grdBillDet[j].FornAmt == undefined) ? 0 : parseFloat(grdBillDet[j].FornAmt).toFixed(2);
                                var Drcr = grdTranDet[i].Drcr;
                                if ($("#hdnMULTI_CURRENCY_IND").val() == "1" && grdTranDet[i].PsRate != undefined) FornAmt = Drcr == "DR" ?parseFloat( DrAmt / parseFloat(grdTranDet[i].PsRate).toFixed(7)).toFixed(2) : parseFloat(CrAmt / parseFloat(grdTranDet[i].PsRate).toFixed(7)).toFixed(2);

                                var Sno = j + 1;

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                    BillDt: grdBillDet[j].BillDt.toString(), DrAmt: grdBillDet[j].DrAmt, CrAmt: grdBillDet[j].CrAmt, FormAmt:FornAmt,
                                    CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt, AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: grdBillDet[j].billudt != undefined ? grdBillDet[j].billudt : "", Nbilludt: '',
                                    Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = (grdTranDet[i].Credit == "" || grdTranDet[i].Credit == "NaN" || grdTranDet[i].Credit == null )? 0 : parseFloat(grdTranDet[i].Credit).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" || grdTranDet[i].Debit == "NaN" || grdTranDet[i].Debit == null) ? 0 : parseFloat(grdTranDet[i].Debit).toFixed(2);


                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                    CBy: '', CDt: '', AdjBy:'', AdjDt:'',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                    }
                    else {

                        var DtFilter = grdTranData.filter(function (grdTranData) {
                            return grdTranData.RowId == CurrRowId;
                        });

                        if (DtFilter.length == 0) {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = (grdTranDet[i].Credit == "" || grdTranDet[i].Credit == "NaN" || grdTranDet[i].Credit ==null)? 0 : parseFloat(grdTranDet[i].Credit).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" || grdTranDet[i].Debit == "NaN" || grdTranDet[i].Debit == null)? 0 : parseFloat(grdTranDet[i].Debit).toFixed(2);

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: "1", RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: grdTranDet[i].FornAmt == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].FornAmt,
                                    CBy: '', CDt: '', AdjBy: '', AdjDt: '',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: grdTranDet[i].PsRate == undefined || $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : grdTranDet[i].PsRate, EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: CurrRowId
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            for (k = 0; k < DtFilter.length; k++) {

                                //if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {
                                if (DtFilter[k].hdnAcId != "") {

                                    var CrAmt = (DtFilter[k].CrAmt == "" || DtFilter[k].CrAmt == "NaN" || DtFilter[k].CrAmt == null)  ? 0 : parseFloat(DtFilter[k].CrAmt).toFixed(2);

                                    var DrAmt = (DtFilter[k].DrAmt == "" || DtFilter[k].DrAmt == "NaN" || DtFilter[k].DrAmt == null) ? 0 : parseFloat(DtFilter[k].DrAmt).toFixed(2);

                                    var FormAmt = (DtFilter[k].FormAmt =="" || DtFilter[k].FormAmt == "NaN" || DtFilter[k].FormAmt == null) ? 0 : parseFloat(DtFilter[k].FormAmt).toFixed(2);
                                  
                                    var addrow = {
                                        Drcr: DtFilter[k].Drcr, ACCD: DtFilter[k].ACCD, hdnAcId: DtFilter[k].hdnAcId, AcNM: DtFilter[k].AcNM, hdnCurNm: DtFilter[k].hdnCurNm,
                                        CurrId: DtFilter[k].CurrId, SlNo: DtFilter[k].SlNo, FCurBal: DtFilter[k].FCurBal, Credit: DtFilter[k].Credit, Debit: DtFilter[k].Debit, Narr: DtFilter[k].Narr,
                                        DocNo: DtFilter[k].DocNo, DocDt: DtFilter[k].DocDt,

                                        RefTyId: DtFilter[k].RefTyId, RefTyNm: DtFilter[k].RefTyNm, RefNm: DtFilter[k].RefNm, DueDt: DtFilter[k].DueDt.toString(),
                                        BillDt: DtFilter[k].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FormAmt,

                                        DETREF: DtFilter[k].DETREF, DATREF: DtFilter[k].DATREF, BILLREFSNO: DtFilter[k].BILLREFSNO, BILLREFBDT: DtFilter[k].BILLREFBDT,
                                        BILLREFVNO: DtFilter[k].BILLREFVNO, billclno: DtFilter[k].billclno, billcldt: DtFilter[k].billcldt, billudt: DtFilter[k].billudt!=undefined?DtFilter[k].billudt:"",
                                        Nbilludt: DtFilter[k].Nbilludt,
                                        CBy: DtFilter[k].CBy, CDt: DtFilter[k].CDt, AdjBy: DtFilter[k].AdjBy, AdjDt: DtFilter[k].AdjDt,
                                        Gloss: DtFilter[k].Gloss, Fornbase: DtFilter[k].Fornbase, FornBill: DtFilter[k].FornBill, ConvrtBill: DtFilter[k].ConvrtBill,
                                        EFornamt: DtFilter[k].EFornamt, btds: DtFilter[k].btds, btdsref: DtFilter[k].btdsref, SlId: DtFilter[k].SlId, RateTy: DtFilter[k].RateTy, RowId: CurrRowId
                                    };

                                    DataStore = DataStore.concat(addrow);
                                }
                            }
                        }
                    }
                }
        }
        }
    }

    $$("grdGLTrnData").clearAll();
    $$("grdGLTrnData").parse(DataStore);
    $$("grdGLTrnData").refresh();
}

function fnCallVatPopup(Drcr, AcId)
{
    var row3 = {

        cols: [
            {},
            {},
            {
                align: "right",
                rows: [
                  {
                      cols: [{
                          view: "button",
                          id: "addrowGst",
                          css: "webix_primary",
                          width: 60,
                          type: "icon",
                          icon: "wxi-plus",
                          click: function () {
                              var addrow = {
                                  HSN_CD: '', CAT_ID: '', TaxClass: '', TAX_CLASS_ID: '', IGST_P: '', IGST_A: '', ixTc1Cd: '',
                                  ixTc1vInd: '', CGST_P: '', CGST_A: '', ixTc2Cd: '', ixTc2vInd: '', SGST_P: '', SGST_A: '',
                                  ixTc3Cd: '', ixTc3vInd: '', CESS_P: '', CESS_A: '', ixTc4Cd: '', ixTc4vInd: '', TaxAmount: '',
                                  ixTc1Cd: '', ixTc1vInd: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Cd: '', ixTc3vInd: '', ixTc4vInd: '', TRN_ID_SRNO: '',
                                  TaxPer: '', TAXABLE_AMT: '', REM: '', TX_TY: '', IGST_ID: '', CGST_ID: '', SGST_ID: '', CESS_ID: '', IN_TY: '',
                                  IGST_REBIND: '', CGST_REBIND: '', SGST_REBIND: '', CESS_REBIND: '', DC: Drcr, BILL_ITEM_NM: AcId, GL_AC_ID: '', GL_AC_CD: '', GL_AC_NM: '', TotTax: ''
                              };
                              $$("GstGrid").add(addrow);
                              $$("GstGrid").refresh();
                          },
                      }, {
                          view: "button",
                          id: "deleterowGst",
                          css: "webix_primary",
                          width: 60,
                          type: "icon",
                          icon: "wxi-trash",
                          click: function () {
                              if ($$("GstGrid").getSelectedId() != undefined) {
                                  var id = $$("GstGrid").getSelectedId();
                                  var getitem = $$("GstGrid").getItem(id);
                                  $$("GstGrid").remove($$("GstGrid").getSelectedId());
                                  $$("GstGrid").refresh();

                                  var dsGlGst = $$("GstGrid").serialize();
                                  if (dsGlGst.length == 0) {
                                      var addrow = {
                                          HSN_CD: '', CAT_ID: '', TaxClass: '', TAX_CLASS_ID: '', IGST_P: '', IGST_A: '', ixTc1Cd: '',
                                          ixTc1vInd: '', CGST_P: '', CGST_A: '', ixTc2Cd: '', ixTc2vInd: '', SGST_P: '', SGST_A: '',
                                          ixTc3Cd: '', ixTc3vInd: '', CESS_P: '', CESS_A: '', ixTc4Cd: '', ixTc4vInd: '', TaxAmount: '',
                                          ixTc1Cd: '', ixTc1vInd: '', ixTc2Cd: '', ixTc2vInd: '', ixTc3Cd: '', ixTc3vInd: '', ixTc4vInd: '', TRN_ID_SRNO: '',
                                          TaxPer: '', TAXABLE_AMT: '', REM: '', TX_TY: '', IGST_ID: '', CGST_ID: '', SGST_ID: '', CESS_ID: '', IN_TY: '',
                                          IGST_REBIND: '', CGST_REBIND: '', SGST_REBIND: '', CESS_REBIND: '', DC: Drcr, BILL_ITEM_NM: AcId, GL_AC_ID: '', GL_AC_CD: '', GL_AC_NM: '', TotTax: ''
                                      };
                                      $$("GstGrid").add(addrow);
                                      $$("GstGrid").refresh();
                                  }
                              }
                          },
                      }],
                  }],
            }]
    }
    var saveIcon = "<span class='fa fa-save' ></span>";
    var closeIcon = "<span class='fa fa-close' ></span>";

    var row4 = {

        cols: [{},
               {},
    {
       
        rows: [{
            cols: [{
                view: "button",
                id: "SaveGst",
                css: "webix_primary",
                width: 60,
                //label: saveIcon,
                label: "Save",
                click: function () {
                    debugger;
                    if ($$("GstBillDrop").getValue() == "") {
                        AlertMessage("Bill no cannot be empty !..");
                        return false;
                    }
                    var GstGrid = $$("GstGrid").serialize();
                    if (GstGrid.length != 0) {
                        var TotTax = 0;
                        for (i = 0; i < GstGrid.length; i++) {
                            var TaxAmt = (GstGrid[i].TaxAmount == "" || GstGrid[i].TaxAmount  ==undefined || GstGrid[i].TaxAmount == "NaN" ? 0 : parseFloat(GstGrid[i].TaxAmount));
                            if (TaxAmt == 0 ) {
                                AlertMessage("Taxable amount cannot be empty !");
                                return false ;
                            }
                            TotTax = parseFloat(TotTax) + parseFloat(TaxAmt);
                        }
                        fnSaveGstBill();
                        debugger;
                        var getval = $$("grdGLTransDet").getSelectedItem();
                        if (getval.Drcr == "DR") getval.Debit = TotTax;
                        if (getval.Drcr == "CR") getval.Credit = TotTax;
                        if ($("#hdnMULTI_CURRENCY_IND").val() == "1")
                        {
                            var DtFilter = CurSalePurRate.filter(function (CurSalePurRate) {
                                return $.trim(CurSalePurRate.CURRENCY_ID) == $.trim(getval.CurrId);
                            });
                            if (DtFilter.length > 0) {
                               
                                getval.PsRate = DtFilter[0].PUR_CONV_RATE;
                                getval.RateTy = "0";
                                getval.FornAmt = parseFloat(TotTax / getval.PsRate);
                            }
                        }
                        $$("grdGLTransDet").refresh();
                        if (getval.AnaAppl == "1")
                        {
                            var dsGlAna = $$("grdGlAnaly").serialize();

                            if (dsGlAna.length == 1) {
                                var id = $$("grdGlAnaly").getFirstId();
                                var getval1 = $$("grdGlAnaly").getItem(id);
                                if (parseFloat(getval.Credit) > 0) getval1.Amount = parseFloat(getval.Credit);
                                else getval1.Amount = parseFloat(getval.Debit);
                                $$("grdGlAnaly").getColumnConfig("Amount").header[0].text = parseFloat(getval1.Amount).toFixed(2);
                                webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderGrClr");
                                webix.html.removeCss($$("grdGlAnaly").getNode(), "HeaderRedClr");
                                $$("grdGlAnaly").getColumnConfig("Amount").header[0].css = "HeaderGrClr";
                                $$("grdGlAnaly").refreshColumns();
                                $$("grdGlAnaly").refresh();
                            }
                        }
                      


                        
                        var dsGlGstData = $$("grdGLGstData").serialize();
                        if (dsGlGstData.length != 0) {

                            var CurrData = dsGlGstData.filter(function (dsGlGstData) {
                                return dsGlGstData.RowId == $.trim(getval.RowId);
                            });
                           
                            if (CurrData.length != 0) {
                                for (k = 0; k < CurrData.length; k++) {
                                    var GL_AC_ID = $.trim(CurrData[k].GL_AC_ID);
                                    var GL_AC_NM = $.trim(CurrData[k].GL_AC_NM)
                                    var GL_AC_CD = $.trim(CurrData[k].GL_AC_CD)
                                    var TaxAmt = parseFloat(CurrData[k].TotTax);
                                    if (GL_AC_ID != "" && TaxAmt != 0 && $.trim(TaxAmt) != "NaN")
                                    {
                                        var grdData = $$("grdGLTransDet").serialize();
                                        var chk = "";
                                        for (j = 0; j < grdData.length; j++) {
                                            if ($.trim(grdData[j].hdnAcId) == GL_AC_ID)
                                            {
                                                if (grdData[j - 1].Drcr == "CR") {
                                                    grdData[j].Credit = TaxAmt;
                                                }
                                                else {
                                                    grdData[j].Debit = TaxAmt;
                                                }
                                                if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                                    PsRate = grdData[j - 1].PsRate;
                                                    RateTy = "0";
                                                    FornAmt = parseFloat(TaxAmt / PsRate);
                                                }
                                                chk = "1";
                                                break;
                                            }
                                        }
                                        if (chk == "")
                                        {
                                            var DrCR = ""; var DrAmt = ""; var CrAmt = "";

                                            var lenval = grdData.length;
                                            if (grdData[lenval - 1].Drcr == "CR") {
                                                DrCR = "CR";
                                                CrAmt = TaxAmt;
                                            }
                                            else {
                                                DrCR = "DR";
                                                DrAmt = TaxAmt;
                                            }
                                            CurNm = grdData[lenval - 1].CurrId;
                                            var PsRate = ""; var RateTy = ""; var FornAmt = "";
                                            if ($("#hdnMULTI_CURRENCY_IND").val() == "1") {
                                                PsRate = grdData[lenval - 1].PsRate;
                                                RateTy = "0";
                                                FornAmt = parseFloat(TaxAmt / PsRate);
                                            }
                                            var Rowid = parseFloat( $("#hdnTransDetRowId").val());
                                            var addrow = {
                                                RowId: Rowid, Drcr: DrCR, ACCD: GL_AC_CD, hdnAcId: GL_AC_ID, AcNM: GL_AC_NM, hdnCurNm: '', CurrId: CurNm, CurBal: '', FCurBal: '', Credit: CrAmt, Debit: DrAmt, Narr: '', DocNo: '', DocDt: '',
                                                PsRate: $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : PsRate, FornAmt: $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : FornAmt, RateTy: $("#hdnMULTI_CURRENCY_IND").val() != "1" ? "" : RateTy, SNo: '', ActCR: CrAmt, ActDR: DrAmt, ReConInd: '', ReConDt: '', LKAcId: '', Cdt: '', ApprBy: '', VNo: '',
                                                ProjId: '', ProjNm: '', ChkAind: '', ChkBind: '', ChkCind: '', ChkDind: '', ChkEind: '', ChkFind: '', TrInd: '', SN1: '', TdInd: '',
                                                ChkLind: '', ChkMind: '', ChkNind: '', ChkOind: '', Gainl: '', VatInd: '', CBy: '', ApprDt: '', ReConBy: '', hdnFornAmt: '', AcTy: '', PostInd: '', PostTy: '',
                                            };
                                            Rowid = parseFloat(Rowid) + 1;
                                            $( "#hdnTransDetRowId").val(Rowid);
                                            $$("grdGLTransDet").add(addrow);
                                          
                                        }
                                        
                                    }
                                  
                                }
                                $$("grdGLTransDet").refresh();
                               
                            }

                        }

                        $$('GstPop').hide();
                    }

                  
                },
            }, {
                view: "button",
                id: "CancelGst",
                css: "webix_primary",
                width: 60,
                label: "Close",
                click: function () {
                    $$("GstPop").hide();
                },
            }],
        }],
    }]
    }



    var row1 = {

        view: "richselect",
        id: "GstBillDrop",
        width: 300, labelWidth: 120,
        label: "Bill No",
        options: [],
        on: {
            'onChange': function (e) {
               GstBillDropChange(e);
            }

        }
         
    }
    var searchicon = "<span class='fa fa-search' ></span>";
    var row2 = {
        view: "tabview",
        id: "vatTabs",
        minWidth: 1050,
        maxWidth: 1050,
        height: 400,
        tabbar: {
            width: 200,
        },
        cells: [
           
            {
                header: "Main",
                id: "gstTab",
              //  scroll: true,
                body: {
                    rows: [
                        row3,
                        //Cell1 Row1
                        {
                            view: "datatable",
                            id: "GstGrid",
                            editable: true,
                            select: 'row',
                            data: [{}],
                            footer: true,
                            columns: [
                                { id: "HSN_CD", header: "HSN Code", width: 100, editor: "text", editor: "text", hidden: true },
                                { header: "", id: "HCDButtonType", width: 50, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                { id: "TaxCode", header: "Tax Code", width: 100, editor: "text", },
                                { header: "", id: "ButtonType", width: 50, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                { id: "TaxClass", header: "Tax Class", width: 100, },
                                { id: "TAX_CLASS_ID", header: "", hidden: true, },
                                {
                                    id: "TaxAmount", header: "Taxable Amt", width: 100, editor: "text", liveEdit: true, css: { 'text-align': 'right ! important'}, footer: { content: "summColumn" },
                                    
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "IGST_P", header: "CGST%", width: 100, },
                                {
                                    id: "IGST_A", header: "CGST Amt", width: 100, css: { 'text-align': 'right ! important' },
                                  
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "CGST_P", header: "SGST%", width: 100, },
                                {
                                    id: "CGST_A", header: "SGST Amt", width: 100, css: { 'text-align': 'right ! important' },
                                    
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "SGST_P", header: "IGST%", width: 100, },
                                {
                                    id: "SGST_A", header: "IGST Amt", width: 100, css: { 'text-align': 'right ! important' },
                                    
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "CESS_P", header: "Cess%", width: 100, },
                                {
                                    id: "CESS_A", header: "Cess Amt", width: 100, css: { 'text-align': 'right ! important' },
                                    
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "CAT_ID", header: "", hidden: true, width: 100, hidden: true },
                                { id: "IGST_ID", header: "", hidden: true },
                                { id: "IGST_REBIND", header: "", hidden: true },
                                { id: "CGST_ID", header: "", hidden: true },
                                { id: "CGST_REBIND", header: "", hidden: true },
                                { id: "SGST_ID", header: "", hidden: true },
                                { id: "SGST_REBIND", header: "", hidden: true },
                                { id: "CESS_ID", header: "", hidden: true },
                                { id: "CESS_REBIND", header: "", hidden: true },
                                { id: "TRN_ID_SRNO", header: "", hidden: true },
                                { id: "TaxPer", header: "", hidden: true },
                                {
                                    id: "TAXABLE_AMT", header: "", hidden: true,
                                    //format: function (value) {
                                    //    return webix.Number.parse(value, {
                                    //        groupDelimiter: "",
                                    //        groupSize: '',
                                    //        decimalDelimiter: ".",
                                    //        decimalSize: 2

                                    //    });
                                    //},
                                    //editFormat: function (value) {
                                    //    return webix.Number.parse(value, {
                                    //        groupDelimiter: "",
                                    //        groupSize: '',
                                    //        decimalDelimiter: ".",
                                    //        decimalSize: $("#CURRENCY_DECIMLIMIT").val()

                                    //    });
                                    //},
                                    format: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                    editParse: function (value) {
                                        return webix.Number.parse(value, webix.i18n);
                                    },
                                    editFormat: function (value) {
                                        return fnCurrFormat(value);
                                    },
                                },
                                { id: "REM", header: "", hidden: true },
                                { id: "TX_TY", header: "", hidden: true },
                                { id: "IN_TY", hidden: true },
                                { id: "DC", hidden: true },
                                { id: "BILL_ITEM_NM", hidden: true },
                                { id: "HCD", hidden: true },
                                { id: "GL_AC_ID", hidden: true },
                                { id: "GL_AC_NM", hidden: true },
                                 { id: "GL_AC_CD", hidden: true },
                                    { id: "TotTax", hidden: true },
                                       { id: "TAX_COMP_IND", hidden: true },
                                    
                            ],
                            on: {
                                'onItemClick': function (id) {
                                    debugger;
                                    if ($$("GstBillDrop").getValue() == "")
                                    {
                                        AlertMessage("Bill no cannot be empty !..");
                                        return false;
                                    }
                                    var getval = this.getItem(id.row);
                                    if (id.column == "ButtonType" ) {

                                        fnCallPopGstTaxSrch();
                                        this.refresh();
                                    }
                                    else if (id.column == "HCDButtonType") {

                                       // HCDHSNGrid();
                                       // this.refresh();
                                    }
                                    this.refresh();
                                },
                                'onLiveEdit': function (old, id) {
                                    debugger;
                                    var getval = this.getItem(id.row);
                                    if (id.column == "TaxAmount") {
                                        var TaxAmt = getval.TaxAmount;
                                        
                                        var Tot_Tax = 0;
                                        if (getval.IGST_P != undefined && getval.IGST_P != "") {
                                            var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.IGST_P) / (100));
                                            getval.IGST_A = Actual.toFixed(2);
                                            Tot_Tax = Tot_Tax + parseFloat(Actual);

                                        }
                                        if (getval.CGST_P != undefined && getval.CGST_P != "") {
                                            var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.CGST_P) / (100));
                                            getval.CGST_A = Actual.toFixed(2);
                                            Tot_Tax = Tot_Tax + parseFloat(Actual);
                                        }
                                        if (getval.SGST_P != undefined && getval.SGST_P != "") {
                                            var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.SGST_P) / (100));
                                            getval.SGST_A = Actual.toFixed(2);
                                            Tot_Tax = Tot_Tax + parseFloat(Actual);
                                        }
                                        if (getval.CESS_P != undefined && getval.CESS_P != "") {
                                            var Actual = (parseFloat(TaxAmt)) * (parseFloat(getval.CESS_P) / (100));
                                            getval.CESS_A = Actual.toFixed(2);
                                            Tot_Tax = Tot_Tax + parseFloat(Actual);
                                        }
                                        getval.TotTax = Tot_Tax.toFixed(2);
                                        this.refresh();
                                    
                                    }
                                   // fnSaveGstBill();
                                }
                            }
                        }
                    ],
                },

            },
            {
                header: "Gst Details",
                id: "gstTab",
                body: {
                  //  scroll: true,
                    view: "form",
                    height: 420,
                    elements: [
                        {
                            rows: [
                                {
                                    cols: [
                                      

                                        {
                                            view: "search",
                                            id: "SrchPartyNm",
                                            width: 300, labelWidth: 120,
                                            readonly: true,
                                            label: "Party Nm",
                                            //  hidden: true,
                                            disabled:true,
                                            on: {
                                                "onSearchIconClick": function () {
                                                    debugger;
                                                    $$('GstPartyPop').show();
                                                }
                                            }
                                        },

                                    {

                                        cols: [{
                                            view: 'label',
                                            label: "",
                                        }]
                                    },
                                    {
                                        paddingX: 30,
                                        cols: [
                                           {
                                               view: "button",
                                               id: "AddCashBill",
                                               width: 100,
                                               label: "Add Cash Bill",
                                               on: {
                                                   "onItemClick": function (e) {
                                                  
                                                       $$("GstDetailBillNo").enable(false);
                                                       $$("SaveBill").enable(false);
                                                       $$("SrchPartyNm").enable(true);
                                                       $$("GstDetailBillAmt").enable(true);

                                                       $$("SrchPartyNm").show();
                                                       $$("BillType").show();
                                                       $$("GSTSupplierType").hide();
                                                       $$("RevChrgeChk").hide();
                                                       $$("RevChargePer").hide();
                                                       $$("RevChrgReason").hide();
                                                       $$("BoeNo").hide();
                                                       $$("BoeAmt").hide();
                                                       $$("BOEDT").hide();
                                                       $$("GstIn").hide();
                                                       $$("StateNM").hide();
                                                       $$("SrchPartyNm").setValue("");
                                                   }
                                               }
                                           },
                                               {
                                                   view: "button",
                                                   id: "SaveBill",
                                                   width: 100,
                                                   label: "Save Bill",
                                                   disabled: true,
                                                   on: {
                                                       'onItemClick': function () {
                                                           if ($$("GstDetailBillNo").getValue() == "") {
                                                               AlertMessage("Bill No cannot be empty !..");
                                                               return false;
                                                           }
                                                           if ($$("SrchPartyNm").getValue() == "") {
                                                               AlertMessage("Party Name cannot be empty !..");
                                                               return false;
                                                           }
                                                           if ($$("GstDetailBillAmt").getValue() == "") {
                                                               AlertMessage("Bill Amount cannot be empty !..");
                                                               return false;
                                                           }
                                                           fnSaveGstBill();
                                                       }
                                                   }
                                               }
                                        ]
                                    }
                                    ]
                                },
                                {
                                    cols: [
                                        {
                                            view: "select",
                                            id: "RegType",
                                            width: 300, labelWidth: 120,
                                            label: "Reg Type",
                                          //  options: GstDropLoad("GstRegGTypeLoad"),
                                            onChange: function () { RegTypeChange(); },
                                        },
                                        {
                                            view: "richselect",
                                            id: "ddlSupvat",
                                            width: 300, labelWidth: 120,
                                            label: "Supplier Vat Group",
                                          //  options: GstDropLoad("GstSupVatLoad"),
                                        },
                                        {
                                            paddingX: 30,
                                            cols: [{
                                                view: "search",
                                                id: "workOrderno",
                                                width: 300, labelWidth: 120,
                                                label: "Work Order No",
                                                hidden: true,
                                            }]
                                        },
                                    ]
                                },
                                {
                                    view: 'label',
                                    label: "",
                                },
                                {
                                    cols: [
                                        {
                                            view: "richselect",
                                            id: "TrnType",
                                            width: 300, labelWidth: 120,
                                            label: "Trn Type",
                                            hidden:true,
                                         //   options: GstDropLoad("GstTrnTypeLoad"),
                                           
                                        },
                                        { view:"label",id:"HidTrnTy",width:300,label:""},
                                        {
                                            paddingX: 20,
                                            cols: [
                                                {
                                                    view: "text",
                                                    id: "GstDetailBillNo",
                                                    labelWidth: 70,
                                                    width: 200,
                                                    label: "Bill no",
                                                //    pattern: { mask: "#########", allow: /[0-9]/g },
                                                    disabled: true,
                                                 //   inputAlign: "right",
                                                    on: {
                                                        onBlur: function () {

                                                            var BillNoVal = $$("GstDetailBillNo").getValue();
                                                            var billNo = $$("GstBillDrop").getValue();
                                                            if (billNo == "") {
                                                                $$("GstBillDrop").define("options", [{ id: BillNoVal, value: BillNoVal }]);
                                                                $$("GstBillDrop").refresh();
                                                                $$("GstBillDrop").setValue(BillNoVal);

                                                            }
                                                            else {

                                                                var data = $$("GstBillDrop").config.options;
                                                                $$("GstBillDrop").define("options", []);

                                                                var arr = [];
                                                                //$.each(data, function (key, value) {
                                                                //    if (value.id != billNo) { arr.push(value); }
                                                                //});
                                                                var set = { id: BillNoVal, value: BillNoVal };
                                                                arr.push(set)
                                                                $$("GstBillDrop").define("options", arr);
                                                                $$("GstBillDrop").setValue(BillNoVal);
                                                            }

                                                        }
                                                    }
                                                },
                                               {
                                                   paddingX: 20, cols: [
                                        {
                                            view: "text",
                                            id: "GstDetailBillAmt",
                                            labelWidth: 80,
                                            width: 180,
                                            disabled:true,
                                            label: "Bill Amt",
                                            attributes: { maxlength: 9 },
                                            pattern: { mask: "#########", allow: /[0-9]/g },
                                            format: "1111.00",
                                            inputAlign: "right"
                                         

                                        }]
                                               }
                                            ]
                                        },
                                        {
                                            view: 'label',
                                            label: "",
                                        }
                                    ]
                                },
                                {

                                    cols: [
                                        {
                                            view: "richselect",
                                            id: "BillType",
                                            width: 300, labelWidth: 120,
                                            label: "Bill Type",
                                          //  options: GstDropLoad("GstBillTypeLoad"),
                                        },
                                        {
                                            paddingX: 20,
                                            cols: [{
                                                view: "datepicker",
                                                id: "GstDetailBillDate",
                                                width: 200, labelWidth: 70,
                                                stringResult: true,
                                                label: "Bill dt",
                                                format: "%d/%m/%Y",
                                                labelAlign: "left",
                                                inputWidth: 200,
                                              
                                            }]
                                        },
                                        {
                                            view: "text",
                                            id: "GstVatRegNo",
                                            labelWidth: 80,
                                            width: 180,
                                            label: "Vat Reg.No",
                                            attributes: { maxlength: 15 },
                                        }
                                    ]
                                },
                                {
                                    view: 'label',
                                    label: "", hidden: true,
                                },
                                {
                                    cols: [
                                        {
                                            view: "richselect",
                                            id: "SupplyType",
                                            width: 300, labelWidth: 120,
                                            label: "Supply Type",
                                            //options: GstDropLoad("GSTSupplierType"), //hidden: true,
                                            onChange: function (e) {
                                                SupplyTypeChange(e);
                                            }
                                        },
                                        {
                                            view: 'label',
                                            label: "", hidden: true,
                                        },
                                        {
                                            view: 'label',
                                            label: "", hidden: true,
                                        }
                                    ]
                                },
                                {
                                    view: 'label',
                                    label: "",
                                },
                                {

                                    cols: [{
                                      
                                        id: "frmStype",
                                        rows: [{
                                            cols: [{
                                                view: "richselect",
                                                id: "GSTSupplierType",
                                                width: 180,
                                                label: "Supplier Type",
                                             //   options: GstDropLoad("GSTSupplierType"),
                                               
                                            },
                                         {
                                             paddingX: 20,
                                             cols: [
                                          {
                                              view: "search",
                                              id: "POSPlaceNM",
                                              labelWidth: 50,
                                              width: 150,
                                              label: "Pos",
                                              onChange: function () {
                                                  $("#PlaceTy").val("1");
                                                  PosAndStateSearchArg();
                                               
                                              }
                                          }]
                                         }],
                                        },
                                        {
                                            view: "checkbox",
                                            id: "RevChrgeChk",
                                            width: 300, labelWidth: 120,
                                            label: "Rev.chrg",
                                            //hidden: true,
                                            onChange: function () {
                                                if (this.checked == true)
                                                    REVDIV2(1);
                                                else REVDIV2(0);
                                            }
                                        }, {
                                            view: "text",
                                            id: "RevChargePer",
                                            width: 300, labelWidth: 120,
                                            label: "Rev.chrg %",
                                           
                                        }, {
                                            view: "text",
                                            id: "RevChrgReason",
                                            width: 300, labelWidth: 120,
                                            label: "Reason",
                                          
                                        }],

                                    },
                                        {
                                            paddingX: 20,
                                            rows: [{
                                                view: "search",
                                                id: "GstIn",
                                                width: 300, labelWidth: 120,
                                                label: "Gst Reg.No.", hidden: true,
                                            }, {
                                                view: "search",
                                                id: "StateNM",
                                                width: 300, labelWidth: 120,
                                                label: "State",
                                                onChange: function () {
                                                    $("#PlaceTy").val("2");
                                                    PosAndStateSearchArg();
                                                  
                                                }
                                            }]
                                        },
                                        {
                                            id: "frmOrginal",
                                            paddingX: 20,
                                            view: "fieldset",
                                            label: "Orginal Bill",                                            
                                            body: {
                                                rows: [{
                                                    view: "text",
                                                    id: "txtNo",
                                                    width: 200,
                                                    label: "No",
                                                }, {

                                                    view: "datepicker",
                                                    id: "dateDt",
                                                    width: 200,
                                                    label: "Date",
                                                    format: "%d/%m/%Y",
                                                }]
                                            }
                                        }

                                    ]
                                },

                             
                                   {
                                       id: "FraImpGds",
                                       cols: [{
                                           rows: [{
                                               cols: [{
                                                   view: "text",
                                                   id: "BoeNo",
                                                   width: 180,
                                                   labelWidth: 70,
                                                   label: "BOE No",
                                              
                                               },
                                              {
                                                  paddingX: 20,
                                                  cols: [
                                              {
                                                  view: "text",
                                                  id: "BoeAmt",
                                                  label: "BOE Amt",
                                                  labelWidth: 50,
                                                  width: 150,
                                                 
                                              }],
                                              }],
                                           }, {
                                               view: "datepicker",
                                               id: "BOEDT",
                                               width: 150,
                                               label: "BOE Dt",
                                               format: "%d/%m/%Y",
                                              
                                           },
                                        {
                                            view: "text",
                                            id: "PortCd",
                                            width: 300, labelWidth: 120,
                                            label: "Port Cd",
                                         
                                        }
                                           ]
                                       }],
                                   },

                                   {
                                       id: "frmSup",
                                       cols: [
                                      {
                                          rows: [{
                                              view: "text",
                                              id: "txtBrnNo",
                                              width: 300, labelWidth: 120,
                                              label: "BRN Number",
                                              

                                          }, {
                                              view: "text",
                                              id: "txtTanNo",
                                              width: 300, labelWidth: 120,
                                              label: "TAN Number",
                                           
                                          }, {
                                              view: "text",
                                              id: "txtNationalId",
                                              width: 300, labelWidth: 120,
                                              label: "National ID Number",
                                              
                                          },
                                          ]
                                      },
                                       ]
                                   },
                            ]
                        }]
                },
            }
        ]

    }


    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstPop",
        head: "VAT",
        scroll: true,
        height: 550,
        position: "center",
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        body: {
            rows: [row1, row2, row4]
          
        }
    })

}

function fnLoadDefGst() {
    debugger;
    var IN_VAT_IND = ($("#hdnK_TAX").val() !="" || $("#hdnK_TAX").val() !="") ?"1" :"";
    var IN_GST_IND = $("#hdnInGstInd").val();
    $$("frmStype").hide();
    $$("frmSup").hide();
    $$("FraImpGds").hide();
    $$("frmOrginal").hide();
    $$("GstIn").config.label = "Reg No";  
   

    var GW_IND = 0;//  $("#GW_IND").val();
    if (GW_IND == 1) {
        $$("workOrderno").show();
    }
    else {
        $$("workOrderno").hide();
    }

  

    var partyTy = $("#hdnSrchPartyTy").val();
    if (IN_VAT_IND == "1") {

        var tab = $$("vatTabs").getTabbar();
        tab.config.options[1].value = "Vat Details";
        tab.render();

        $$("frmStype").hide();
        $$("StateNM").hide();
      
        $$("SupplyType").show();
        $$("RegType").hide();
        $$("frmSup").hide();
        $$("SupplyType").hide();
        if (partyTy == "S") {
            $$("RegType").hide();
            $$("ddlSupvat").show();

            req = [];
            set = { "PartyTy": "S" };
            req.push(set);
            //var ddlData = GstDataLoad("GstSupVatLoad", JSON.stringify(set));
            //$$("ddlSupvat").define("options", ddlData);
        }
        else {
            $$("RegType").hide();
            $$("TrnType").hide();
            $$("HidTrnTy").show();
            $$("frmSup").hide();
            $$("ddlSupvat").config.label = "Tax Category";
            
            var ddlData = [{value:"REGULAR TAXABLE",id:"0"}, {value:"EXEMPTED",id:"X"}, { value:"ZERO RATED", id:"Z"}];
            $$("ddlSupvat").define("options", ddlData);
        }
        
    }
    else if (IN_GST_IND == "1") {
        $$("frmStype").show();
        $$("SupplyType").hide();
        var tab = $$("vatTabs").getTabbar();
        tab.config.options[1].value = "GST Details";
        tab.render();
    }
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GLDEFGSTLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01"; 
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        type: "POST",
        url: "/GLTrans/COMAPI_CALL",
        cache: false,
        async: false,
        data: "request=" + DataVal,
        success: function (data) {

            if (data != undefined && data != null && data != "") {
                dataRec = JSON.parse(data);
               
                $$("grdParty").clearAll();
                $$("grdParty").parse(dataRec.TBLGSTACC);
                $$("grdParty").refresh();

                if (IN_VAT_IND == "1") {
                    $$("GstGrid").hideColumn("HSN_CD");
                    $$("GstGrid").hideColumn("HCDButtonType");
                }
                else {
                    $$("GstGrid").showColumn("HSN_CD");
                    $$("GstGrid").showColumn("HCDButtonType");
                }
                $$("GstGrid").hideColumn("IGST_P");
                $$("GstGrid").hideColumn("IGST_A");
                $$("GstGrid").hideColumn("CGST_P");
                $$("GstGrid").hideColumn("CGST_A");
                $$("GstGrid").hideColumn("SGST_P");
                $$("GstGrid").hideColumn("SGST_A");
                $$("GstGrid").hideColumn("CESS_P");
                $$("GstGrid").hideColumn("CESS_A");

                //  $.each(dataRec, function (K, v) {
                var TAX_COMP_NM = $.trim(dataRec.TBLGSTCNT[0].TAX_COMP_NM);
                if (dataRec.TBLGSTCNT[0].TAX_COMP_IND == "1") {
                    $$("GstGrid").showColumn("IGST_P");
                    $$("GstGrid").showColumn("IGST_A");
                    
                    $$("GstGrid").getColumnConfig("IGST_P").header = TAX_COMP_NM + " %";
                    $$("GstGrid").getColumnConfig("IGST_A").header = TAX_COMP_NM + " Amt";
                    $$("GstGrid").refreshColumns();
                }
                   
                else if (dataRec.TBLGSTCNT[0].TAX_COMP_IND == "2") {
                    $$("GstGrid").showColumn("CGST_P");
                    $$("GstGrid").showColumn("CGST_A");
                    $$("GstGrid").getColumnConfig("CGST_P").header = TAX_COMP_NM + " %";
                    $$("GstGrid").getColumnConfig("CGST_A").header = TAX_COMP_NM + " Amt";
                }
                else if (dataRec.TBLGSTCNT[0].TAX_COMP_IND == "3") {
                    $$("GstGrid").showColumn("SGST_P");
                    $$("GstGrid").showColumn("SGST_A");
                    //if (IN_VAT_IND == "1") {
               
                    $$("GstGrid").getColumnConfig("SGST_P").header = TAX_COMP_NM + " %";
                    $$("GstGrid").getColumnConfig("SGST_A").header = TAX_COMP_NM + " Amt";
                }
                else if (dataRec.TBLGSTCNT[0].TAX_COMP_IND == "4") {
                    $$("GstGrid").showColumn("CESS_P");
                    $$("GstGrid").showColumn("CESS_A");
                    $$("GstGrid").getColumnConfig("CESS_P").header = TAX_COMP_NM + " %";
                    $$("GstGrid").getColumnConfig("CESS_A").header = TAX_COMP_NM + " Amt";
                }
                //});
            }
        }
    });
   

}
function fnCallPopupGstPartySrch() {
  
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstPartyPop",
        head: "Account Search",
        position: "center",
        minWidth: 450,
        maxWidth: 450,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 660,

        body: {
            view: 'form',
            minWidth: 450,
            maxWidth: 450,

            elements: [
                {
                    view: "datatable",
                    id: "grdParty",
                    select: "row",
                    data: [],
                    height: 460,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                            { header: ["AC_CD", { content: "textFilter" }], id: "AC_CD", width: 100, css: { 'text-align': 'center ! important' },  },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                          

                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);
                            
                            $$("SrchPartyNm").setValue($.trim(selectedRows[0].AC_ALT_NM));
                            $("hdnSrchPartyId").val($.trim(selectedRows[0].AC_CD));
                            $("hdnSrchACCD").val($.trim(selectedRows[0].AC_CD));
                            if ($("#hdnParentTrnTyId").val() == "4") $("#hdnSrchPartyTy").val("C"); else $("#hdnSrchPartyTy").val("S");
                            $$('GstPartyPop').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 350,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('GstPartyPop').hide();
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

  
}
function fnCallPopGstTaxSrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GstTaxPop",
        head: "Tax Search",
        position: "center",
        minWidth: 380,
        maxWidth: 450,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "grdTaxClass",
                select: 'row',
                height: 380,
                editable: false,
                scroll: "y",
                columns: [
                    { id: "AC_ID",  header: ["Tax Code", { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, },
                    { id: "AC_NM", header: ["Account Name", { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' }, },
                    { id: "Tax_Per", hidden: true },
                    { id: "REBATE_IND", hidden: true },
                     { id: "TAX_COMP_IND", hidden: true },
                    { id: "Shrt_Nm", hidden: true },
                     { id: "GL_AC_ID", hidden: true },
                    { id: "GL_AC_NM", hidden: true },
                        { id: "GL_AC_CD", hidden: true },
                    
                ],
                data: [],
                on: {
                    'onItemdblClick': function (id) {
                        debugger;
                        var getval1 = this.getItem(id.row);
                       // getval.TaxAmount = $$("GstDetailBillAmt").getValue();
                      
                        var getval = $$("GstGrid").getSelectedId();
                        var gstindx = $$("GstGrid").getItem(getval.id);

                        gstindx.TAX_CLASS_ID = getval1.AC_ID;
                        gstindx.TaxCode = getval1.AC_ID;
                        gstindx.TaxClass = getval1.AC_NM;
                        gstindx.TaxPer = getval1.Tax_Per;
                        gstindx.GL_AC_ID = $.trim(getval1.GL_AC_ID);
                        gstindx.GL_AC_NM = $.trim(getval1.GL_AC_NM);
                        gstindx.GL_AC_CD = $.trim(getval1.GL_AC_CD);
                        gstindx.TAX_COMP_IND = $.trim(getval1.TAX_COMP_IND);
                       
                        if (getval1.TAX_COMP_IND == "1")
                        {
                            gstindx.IGST_P = getval1.Tax_Per;
                            gstindx.IGST_A = $$("GstDetailBillAmt").getValue();
                            gstindx.IGST_ID = getval1.AC_ID;
                            gstindx.IGST_REBIND = getval1.REBATE_IND;
                        }
                      

                        if (getval1.TAX_COMP_IND == "2") {
                            gstindx.CGST_P = getval1.Tax_Per;
                            gstindx.CGST_A = $$("GstDetailBillAmt").getValue();
                            gstindx.CGST_ID = getval1.AC_ID;
                            gstindx.CGST_REBIND = getval1.REBATE_IND;
                        }

                        if (getval1.TAX_COMP_IND == "3") {
                            gstindx.SGST_P = getval1.Tax_Per;
                            gstindx.SGST_A = $$("GstDetailBillAmt").getValue();
                            gstindx.SGST_ID = getval1.AC_ID;
                            gstindx.SGST_REBIND = getval1.REBATE_IND;
                        }

                        if (getval1.TAX_COMP_IND == "4") {
                            gstindx.CESS_P = getval1.Tax_Per;
                            gstindx.CESS_A = $$("GstDetailBillAmt").getValue();
                            gstindx.CESS_ID = getval1.AC_ID;
                            gstindx.CESS_REBIND = getval1.REBATE_IND;
                        }
                        var TotTax=0;
                        var TaxAmt = $$("GstDetailBillAmt").getValue();
                        if (getval1.TAX_COMP_IND=="1") {//2
                            var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(getval1.Tax_Per) + (100));
                            gstindx.IGST_A = (TaxAmt - Actual).toFixed(2);
                            gstindx.TaxAmount = Actual.toFixed(2);
                            TotTax = TotTax + parseFloat(gstindx.IGST_A);
                        }
                        if (getval1.TAX_COMP_IND == "2") {//3
                            var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(getval1.Tax_Per) + (100));
                            gstindx.CGST_A = (TaxAmt - Actual).toFixed(2);
                            gstindx.TaxAmount = Actual.toFixed(2);
                            TotTax = TotTax + parseFloat(gstindx.CGST_A);
                        }
                        if (getval1.TAX_COMP_IND == "3") {//1
                            var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(getval1.Tax_Per) + (100));
                            gstindx.SGST_A = (TaxAmt - Actual).toFixed(2);
                            gstindx.TaxAmount = Actual.toFixed(2);
                            TotTax = TotTax + parseFloat(gstindx.SGST_A);
                        }
                        if (getval1.TAX_COMP_IND == "4") {
                            var Actual = (parseFloat(TaxAmt) * (100)) / (parseFloat(getval1.Tax_Per) + (100));
                            gstindx.CESS_A = (TaxAmt - Actual).toFixed(2);
                            gstindx.TaxAmount = Actual.toFixed(2);
                            TotTax = TotTax + parseFloat(gstindx.CESS_A);
                        }
                        gstindx.TotTax = TotTax.toFixed(2);
                        $$("GstGrid").refresh();
                        $$("GstTaxPop").hide();
                    
              
                       // fnSaveGstBill();
                        $$("GstGrid").refresh();
                    },
                },
            }]
        }
    });
    fnLoadGstTaxClassSrch();

    $$("grdTaxClass").refresh();
    $$("GstTaxPop").show();

}
function GstBillDropChange(e) {
    debugger;
    var BillNo = $$("GstBillDrop").getValue();
    $$("GstDetailBillNo").setValue(BillNo);
    var dsGlTrans = $$("grdGLTransDet").serialize();
    var itemval = $$("grdGLTransDet").getSelectedItem();
    var dsGLTrnData = $$("grdGLTrnData").serialize();
    if (dsGLTrnData.length != 0) {
        var CurrData = dsGLTrnData.filter(function (dsGLTrnData) {
            return dsGLTrnData.RefNm == $.trim(BillNo);
        });


        if (CurrData.length != 0) {
            for (k = 0; k < CurrData.length; k++) {
                var BillNo = CurrData[k].RefNm;
                var RowId = CurrData[k].RowId;
                var MainRowInx = CurrData[k].hdnAcId;
                var BillDate = CurrData[k].BillDt;
                var GstDetailBillNo = CurrData[k].RefNm;
                var Depit = CurrData[k].DrAmt;
                var Credit = CurrData[k].CrAmt;
                var Amt = 0;
                if (Depit != "" && Depit != undefined && Depit != null && parseFloat(Depit) != "0" )
                    Amt = Depit;
                else if (Credit != "" && Credit != undefined && Credit != null && parseFloat(Credit) != "0")
                    Amt = Credit;
                if (dsGlTrans.length != 0) {
                    var CurrData1 = dsGlTrans.filter(function (dsGlTrans) {
                        return dsGlTrans.RowId == $.trim(RowId);
                    });
                }
                if (CurrData1.length > 0) {
                    var AC_NM = CurrData1[0].AcNM;
                    var AC_ID = CurrData1[0].hdnAcId;
                    var AC_CD = CurrData1[0].ACCD;
                   
                   
                    if (AC_ID.substring(0, 12) == "000200040003") {
                        var dataparam = {};
                        dataparam["AC_ID"] = AC_ID;
                        dataparam["AC_CD"] = AC_CD;
                        dataparam["REQTYPE"] = "GET_GSTSUPVATLOAD";
                        dataparam["PROGNAME"] = "GET_GLTRNSC01";
                        $("#hdnSrchPartyTy").val("S");
                        $$("ddlSupvat").config.label = "Supplier Vat Group";
                        $$("ddlSupvat").define("options", []);
                        var DataVal = JSON.stringify(dataparam);
                        $.ajax({
                            type: "POST",
                            url: "/GLTrans/COMAPI_CALL",
                            data: "request=" + DataVal,
                            async: false,
                            success: function (data) {
                                var rowData = JSON.parse(data);
                                $$("ddlSupvat").define("options", rowData);
                                $$("ddlSupvat").refresh();
                            }
                        });
                    }
                    else {
                        if (AC_ID.substring(0, 12) == "000100010004") $("#hdnSrchPartyTy").val("C");
                        $$("ddlSupvat").config.label = "Tax Category";

                        var ddlData = [{ value: "REGULAR TAXABLE", id: "0" }, { value: "EXEMPTED", id: "X" }, { value: "ZERO RATED", id: "Z" }];
                        $$("ddlSupvat").define("options", ddlData);
                    }
                }



                $$("GstDetailBillDate").setValue(BillDate);
                $$("SrchPartyNm").setValue(AC_NM);
                $("#hdnSrchPartyId").val(AC_ID);
                $("#hdnSrchACCD").val(AC_CD);
                $$("GstDetailBillNo").setValue(BillNo);
                $$("GstDetailBillAmt").setValue(Amt);
                break;
            }
        }
    }


        var dsGlGstData = $$("grdGLGstData").serialize();
       
        if (dsGlGstData.length != 0 && dsGlGstData != undefined) {

            var CurrData = dsGlGstData.filter(function (dsGlGstData) {
                return dsGlGstData.SnoBill == $.trim(BillNo);
            });


            if (CurrData.length != 0) {
                for (k = 0; k < CurrData.length; k++) {
                    var GstBillDrop = CurrData[k].SnoBill;
                    var GstDetailBillDate = CurrData[k].BillDate;
                    var GstDetailBillAmt = CurrData[k].AmountStr;
                    var GSTPARTYID = CurrData[k].AC_ID;
                    var ACCD = CurrData[k].AC_CD;
                    var PARTY_TY = CurrData[k].PARTY_TY;
                    var GSTPARTYNM = CurrData[k].AC_NM;
                    var RegType = CurrData[k].REG_TY;
                    var TrnType = CurrData[k].TRN_TY;
                    var BillType = CurrData[k].BILL_TY;
                    var SupplyType = CurrData[k].SUPPLY_TY;
                    var GstIn = CurrData[k].GST_IN;
                    var StateID = CurrData[k].ST_CD;
                    var StateNM = CurrData[k].ST_NM;
                    var POSPlaceID = CurrData[k].PLACE_ID;
                    var POSPlaceNM = CurrData[k].PLACE_NM;
                    var RevChrgeChk = CurrData[k].REV_CHRG;
                    var RevChargePer = CurrData[k].REV_PER;
                    var RevChrgReason = CurrData[k].REV_REASON;
                    var BoeNo = CurrData[k].BOE_NO;
                    var BoeAmt = CurrData[k].BOE_AMT;
                    var BOEDT = CurrData[k].BOE_DT;
                    var PortCd = CurrData[k].PORT_CD;
                    var DC = CurrData[k].DC;
                    var BILL_ITEM_NM = CurrData[k].BILL_ITEM_NM;
                    var Sup_Cat = CurrData[k].Sup_Cat;
                    var PTX_RG_No = CurrData[k].PTX_RG_No;
                    //   $$("GstBillDrop").setValue(GstBillDrop);
                    $$("SrchPartyNm").setValue(GSTPARTYNM);
                    //   $("#GSTPARTYID").val(GSTPARTYID);
                    $("#hdnSrchPartyId").val(GSTPARTYID);
                    $("#hdnSrchPartyTy").val(PARTY_TY);
                    $("#hdnSrchACCD").val(ACCD);
                    $$("ddlSupvat").setValue(Sup_Cat);
                    $$("GstVatRegNo").setValue(PTX_RG_No);
                    $$("StateNM").setValue(StateNM);
                    $$("POSPlaceNM").setValue(POSPlaceNM);
                    //  $("#StateID").val(StateID);
                    //    $("#POSPlaceID").val(POSPlaceID);
                    $$("RegType").setValue(RegType);
                    $$("TrnType").setValue(TrnType);
                    $$("BillType").setValue(BillType);
                    $$("SupplyType").setValue(SupplyType);
                    if (RevChrgeChk == "1") $$("RevChrgeChk").setValue("1");
                    else $$("RevChrgeChk").setValue("0");
                    $$("RevChargePer").setValue(RevChargePer);
                    $$("RevChrgReason").setValue(RevChrgReason);
                    $$("BoeNo").setValue(BoeNo);
                    $$("BoeAmt").setValue(BoeAmt);
                    $$("BOEDT").setValue(BOEDT);
                    $$("PortCd").setValue(PortCd);
                    $$("GstDetailBillAmt").setValue(GstDetailBillAmt);
                    $$("GstDetailBillDate").setValue(GstDetailBillDate);
                    $$("GstIn").setValue(GstIn);
                    $$("GstDetailBillNo").setValue(BillNo);
                }
                $$("GstGrid").clearAll();
                $$("GstGrid").parse(CurrData);
                $$("GstGrid").refresh();
            }
        }


  
};
function fnCallGstdata()
{
    debugger;

    var itemval = $$("grdGLTransDet").getSelectedItem();
    var dsGLTrnData = $$("grdGLTrnData").serialize();
    var BillNo = "";
    if (dsGLTrnData.length != 0) {
        $$("GstBillDrop").define("options", []);
        var billArr = [];
        for (k = 0; k < dsGLTrnData.length; k++) {
            BillNo = dsGLTrnData[k].RefNm;
            set = { id: BillNo, value: BillNo };
            billArr.push(set);
        }
        $$("GstBillDrop").define("options", billArr);
        $$("GstBillDrop").setValue(BillNo);
    }
   

    var dsGlGstData = $$("grdGLGstData").serialize();

   
    if (dsGlGstData.length != 0) {

        var CurrData = dsGlGstData.filter(function (dsGlGstData) {
            return dsGlGstData.RowId == $.trim(itemval.RowId);
        });
     
      
        if (CurrData.length != 0) {
            for (k = 0; k < CurrData.length; k++) {
                var GstBillDrop = CurrData[k].SnoBill;
                var GstDetailBillDate = CurrData[k].BillDate;
                var GstDetailBillAmt = CurrData[k].AmountStr;
                var GSTPARTYID = CurrData[k].AC_ID;
                var PARTY_TY = CurrData[k].PARTY_TY;
                var GSTPARTYNM = CurrData[k].AC_NM;
                var ACCD = CurrData[k].AC_CD;
                var RegType = CurrData[k].REG_TY;
                var TrnType = CurrData[k].TRN_TY;
                var BillType = CurrData[k].BILL_TY;
                var SupplyType = CurrData[k].SUPPLY_TY;
                var GstIn = CurrData[k].GST_IN;
                var StateID = CurrData[k].ST_CD;
                var StateNM = CurrData[k].ST_NM;
                var POSPlaceID = CurrData[k].PLACE_ID;
                var POSPlaceNM = CurrData[k].PLACE_NM;
                var RevChrgeChk = CurrData[k].REV_CHRG;
                var RevChargePer = CurrData[k].REV_PER;
                var RevChrgReason = CurrData[k].REV_REASON;
                var BoeNo = CurrData[k].BOE_NO;
                var BoeAmt = CurrData[k].BOE_AMT;
                var BOEDT = CurrData[k].BOE_DT;
                var PortCd = CurrData[k].PORT_CD;
                var DC = CurrData[k].DC;
                var BILL_ITEM_NM = CurrData[k].BILL_ITEM_NM;
                var Sup_Cat = CurrData[k].Sup_Cat;
                var PTX_RG_No = CurrData[k].PTX_RG_No;
                $$("GstBillDrop").setValue(GstBillDrop);
                $$("SrchPartyNm").setValue(GSTPARTYNM);
                //   $("#GSTPARTYID").val(GSTPARTYID);
                $("#hdnSrchPartyId").val(GSTPARTYID);
                $("#hdnSrchPartyTy").val(PARTY_TY);
                $("#hdnSrchACCD").val(ACCD);
                $$("ddlSupvat").setValue(Sup_Cat);
                $$("GstVatRegNo").setValue(PTX_RG_No);

                $$("StateNM").setValue(StateNM);
                $$("POSPlaceNM").setValue(POSPlaceNM);
              //  $("#StateID").val(StateID);
            //    $("#POSPlaceID").val(POSPlaceID);
                $$("RegType").setValue(RegType);
                $$("TrnType").setValue(TrnType);
                $$("BillType").setValue(BillType);
                $$("SupplyType").setValue(SupplyType);
                if (RevChrgeChk == "1") $$("RevChrgeChk").setValue("1");
                else $$("RevChrgeChk").setValue("0");
                $$("RevChargePer").setValue(RevChargePer);
                $$("RevChrgReason").setValue(RevChrgReason);
                $$("BoeNo").setValue(BoeNo);
                $$("BoeAmt").setValue(BoeAmt);
                $$("BOEDT").setValue(BOEDT);
                $$("PortCd").setValue(PortCd);
                $$("GstDetailBillAmt").setValue(GstDetailBillAmt);
                $$("GstDetailBillDate").setValue(GstDetailBillDate);
                $$("GstIn").setValue(GstIn);
                $$("GstDetailBillNo").setValue(GstBillDrop);

                var BillNoVal = $$("GstDetailBillNo").getValue();
                var billNo = $$("GstBillDrop").getValue();
                if (billNo == "") {
                    $$("GstBillDrop").define("options", [{ id: BillNoVal, value: BillNoVal }]);
                    $$("GstBillDrop").refresh();
                    $$("GstBillDrop").setValue(BillNoVal);

                }
                else {

                    var data = $$("GstBillDrop").config.options;
                    $$("GstBillDrop").define("options", []);

                    var arr = [];
                  
                    var set = { id: BillNoVal, value: BillNoVal };
                    arr.push(set)
                    $$("GstBillDrop").define("options", arr);
                    $$("GstBillDrop").setValue(BillNoVal);
                }
              
            }
            $$("GstGrid").clearAll();
            $$("GstGrid").parse(CurrData);
            $$("GstGrid").refresh();
        }
    }
}

function fnSaveGstBill() {
    debugger;
    var grdGstData = $$("grdGLGstData").serialize();
    var grdTranDet = $$("grdGLTransDet").serialize();
    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
    var GstGrid = $$("GstGrid").serialize();  
    var total1 = GstGrid.length;
    var GstBillDrop = $$("GstBillDrop").getValue();
    var GSTPARTYNM = $$("SrchPartyNm").getValue();
    var ACCD = $("#hdnSrchACCD").val();
    var GSTPARTYID = $("#hdnSrchPartyId").val();
    var StateID = "";//$("#StateID").val();
    var StateNM = "";//$$("StateNM").getValue();
    var POSPlaceID = ""; //$("#POSPlaceID").val();
    var POSPlaceNM = "";//$$("POSPlaceNM").getValue();
    var RegType = $$("RegType").getValue();
    var TrnType = $$("TrnType").getValue();
    var BillType = $$("BillType").getValue();
    var SupplyType = $$("SupplyType").getValue();
    var RevChrgeChk = 0;
    if ($$("RevChrgeChk").getValue() == "1") {
        RevChrgeChk = 1;
    }

    var RevChargePer = $$("RevChargePer").getValue();
    var RevChrgReason = $$("RevChrgReason").getValue();
    var BoeNo = $$("BoeNo").getValue();
    var BoeAmt = $$("BoeAmt").getValue();
    var BOEDT = $$("BOEDT").getValue();
    var PortCd = $$("PortCd").getValue();
    var GstDetailBillAmt = $$("GstDetailBillAmt").getValue();
    var GstDetailBillDate = $$("GstDetailBillDate").getValue();
    var GstIn = $$("GstIn").getValue();
    var DataStore = [];
    if (GstBillDrop != "") {
        if (total1 != "" || total1 != 0) {
            var j = 0;
           
            var DtFilter = grdGstData.filter(function (grdGstData) {
                return grdGstData.SnoBill == GstBillDrop;
            });

            if (DtFilter.length != 0) {
                for (k = 0; k < DtFilter.length; k++) {

                  //  if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {
                        $$("grdGLGstData").editCancel();
                        $$("grdGLGstData").remove(DtFilter[k].id);
                        $$("grdGLGstData").refresh();
                   // }
                }
            }
            var i = 0; var totTaxAmt = 0; var OverAlltotTaxAmt = 0;
            for (; i < total1; i++) {
                //totTaxAmt = 0;
                var TaxCode = GstGrid[i].TaxCode;
                var TaxPer = GstGrid[i].TaxPer;
                var TaxClass = GstGrid[i].TaxClass;
                var TaxAmount = GstGrid[i].TaxAmount;
                var IGST_P = GstGrid[i].IGST_P == undefined ? "" : GstGrid[i].IGST_P ;
                var IGST_A = GstGrid[i].IGST_A == undefined ? "" : GstGrid[i].IGST_A;
                var IGST_ID = GstGrid[i].IGST_ID == undefined ? "" : GstGrid[i].IGST_ID;
                var IGST_REBIND = GstGrid[i].IGST_REBIND == undefined ? "" : GstGrid[i].IGST_REBIND;
                var CGST_P = GstGrid[i].CGST_P == undefined ? "" : GstGrid[i].CGST_P;
                var CGST_A = GstGrid[i].CGST_A == undefined ? "" : GstGrid[i].CGST_A;
                var CGST_ID = GstGrid[i].CGST_ID == undefined ? "" : GstGrid[i].CGST_ID;
                var CGST_REBIND = GstGrid[i].CGST_REBIND == undefined ? "" : GstGrid[i].CGST_REBIND;
                var SGST_P = GstGrid[i].SGST_P == undefined ? "" : GstGrid[i].SGST_P;
                var SGST_A = GstGrid[i].SGST_A == undefined ? "" : GstGrid[i].SGST_A;
                var SGST_ID = GstGrid[i].SGST_ID == undefined ? "" : GstGrid[i].SGST_ID;
                var SGST_REBIND = GstGrid[i].SGST_REBIND == undefined ? "" : GstGrid[i].SGST_REBIND;
                var CESS_P = GstGrid[i].CESS_P == undefined ? "" : GstGrid[i].CESS_P;
                var CESS_A = GstGrid[i].CESS_A == undefined ? "" : GstGrid[i].CESS_A;
                var CESS_ID = GstGrid[i].CESS_ID == undefined ? "" : GstGrid[i].CESS_ID;
                var CESS_REBIND = GstGrid[i].CESS_REBIND == undefined ? "" : GstGrid[i].CESS_REBIND;
                var GL_AC_ID = GstGrid[i].GL_AC_ID == undefined ? "" : GstGrid[i].GL_AC_ID;
                var GL_AC_NM = GstGrid[i].GL_AC_NM == undefined ? "" : GstGrid[i].GL_AC_NM;
                var GL_AC_CD = GstGrid[i].GL_AC_CD == undefined ? "" : GstGrid[i].GL_AC_CD;
                var Tot_Tax = GstGrid[i].TotTax == undefined ? "" : GstGrid[i].TotTax;
                var TAX_COMP_IND = GstGrid[i].TAX_COMP_IND == undefined ? "" : GstGrid[i].TAX_COMP_IND;
                var INP_TY = "";
                var PARTY_TY = $("#hdnSrchPartyTy").val();
                if (PARTY_TY == "") PARTY_TY = "S";
                if (PARTY_TY != "C") B_TRN_ID_SRNO = "1"; else B_TRN_ID_SRNO="0";
                var PTX_RG_No = $$("GstVatRegNo").getValue();
                var PTX_ST_CD = "";//$("#StateID").val(StateID);
                var PTX_RG_Ty = "";
                var TX_RG_CD = "";
                var GTRN_TY = $$("TrnType").getValue();
                var GINV_TY = $$("BillType").getValue();
                var TRN_ID_SRNO = DetSelRow.RowId;
                var BRN_NO = $$("txtBrnNo").getValue();
                var TAN_No = $$("txtTanNo").getValue();
                var Sup_Cat = $$("ddlSupvat").getValue();
                var EXEMP_IND = "";
                var HCD = "";
                var ORD_NO = $$("workOrderno").getValue();
                var ORD_DT = "";
                var GWO_ID = "";
                var NID_No = $$("txtNationalId").getValue();
                var DC = DetSelRow.Drcr;
                var BILL_ITEM_NM = $.trim(DetSelRow.AcNM);
                if (Tot_Tax == "")
                {
                    Tot_Tax = 0;
                    
                    var Actual = (parseFloat(GstDetailBillAmt) * (100)) / (parseFloat(TaxPer) + (100));
                    var Tax = (GstDetailBillAmt - Actual).toFixed(2);
                    Tot_Tax = Tot_Tax + parseFloat(Tax);
                    Tot_Tax = Tot_Tax.toFixed(2);
                }
               
                
                var addrow = {
                    TaxCode: TaxCode, TaxClass: TaxClass, TaxAmount: TaxAmount,TaxPer:TaxPer,
                    IGST_P: IGST_P, IGST_A: IGST_A, IGST_ID: IGST_ID, IGST_REBIND: IGST_REBIND,
                    CGST_P: CGST_P, CGST_A: CGST_A, CGST_ID: CGST_ID, CGST_REBIND: CGST_REBIND,
                    SGST_P: SGST_P, SGST_A: SGST_A, SGST_ID: SGST_ID, SGST_REBIND: SGST_REBIND,
                    CESS_P: CESS_P, CESS_A: CESS_A, CESS_ID: CESS_ID, CESS_REBIND: CESS_REBIND,
                    SnoBill: GstBillDrop, BillDate: GstDetailBillDate, AmountStr: GstDetailBillAmt,
                    AC_ID: GSTPARTYID, AC_NM: GSTPARTYNM, AC_CD:ACCD,REG_TY: RegType, TRN_TY: TrnType, BILL_TY: BillType,
                    SUPPLY_TY: SupplyType, GST_IN: GstIn, ST_CD: StateID, ST_NM: StateNM, PLACE_ID: POSPlaceID,
                    PLACE_NM: POSPlaceNM, REV_CHRG: RevChrgeChk, REV_PER: RevChargePer, REV_REASON: RevChrgReason,
                    BOE_NO: BoeNo, BOE_AMT: BoeAmt, BOE_DT: BOEDT, PORT_CD: PortCd,
                    PARTY_TY: PARTY_TY, PTX_RG_No: PTX_RG_No, PTX_ST_CD: PTX_ST_CD, PTX_RG_Ty: PTX_RG_Ty, TX_RG_CD: TX_RG_CD, GTRN_TY: GTRN_TY, GINV_TY: GINV_TY,
                    TRN_ID_SRNO: TRN_ID_SRNO, B_TRN_ID_SRNO:B_TRN_ID_SRNO,BRN_NO: BRN_NO, TAN_No: TAN_No,
                    Sup_Cat: Sup_Cat, EXEMP_IND: EXEMP_IND, HCD: HCD, ORD_NO: ORD_NO, ORD_DT: ORD_DT, GWO_ID: GWO_ID, NID_No: NID_No, DC: DC,
                    BILL_ITEM_NM: BILL_ITEM_NM, GST_TY: '', RefNm: GstBillDrop, GL_AC_ID: GL_AC_ID, GL_AC_NM: GL_AC_NM,GL_AC_CD:GL_AC_CD,TotTax:Tot_Tax,TAX_COMP_IND:TAX_COMP_IND, RowId: DetSelRow.RowId
                };

                DataStore = DataStore.concat(addrow);
            }
            $$("grdGLGstData").parse(DataStore);
            $$("grdGLGstData").refresh();
        }
    }
}
function fnLoadGstTaxClassSrch()
{
    debugger;
    var dataparam = {};
    var rowdata = "";
 
    //var TaxTy = localStorage.getItem("TaxTy");
   
    dataparam["REQTYPE"] = "GET_GSTTAXCLASSLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01"; 
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["SupTy"] = $$("SupplyType").getValue();
    dataparam["SupVat"] = $$("ddlSupvat").getValue();
    dataparam["BTy"] = "";
    dataparam["VTy"] = $("#hdnParentTrnTyId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        type: "POST",
        url: "/GLTrans/COMAPI_CALL",
        cache: false,
        async: false,
        data: "request=" + DataVal,
        success: function (data) {

            if (data != undefined && data != null && data != "") {
                rowdata = JSON.parse(data);
                $$("grdTaxClass").clearAll();
                $$("grdTaxClass").parse(rowdata);
                $$("grdTaxClass").refresh();
            }
        }
        });
    return rowdata;
               
}
function fnDeleteRowGstDetData() {
    debugger;
    var DetSelRow = $$("grdGLTransDet").getSelectedItem();
    var CurrSelRowId = DetSelRow.RowId;
    var grdGLGstData = $$("grdGLGstData").serialize();
    var DtFilter = grdGLGstData.filter(function (grdGLGstData) {
        return grdGLGstData.RowId == CurrSelRowId;
    });

    if (DtFilter.length != 0) {
        for (k = 0; k < DtFilter.length; k++) {

            // if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {
            $$("grdGLGstData").editCancel();
            $$("grdGLGstData").remove(DtFilter[k].id);
            $$("grdGLGstData").refresh();
            //  }
        }
    }
}

function fnLoadPdc() {
    debugger;
    var dataparam = {};
    var rowdata = "";


    $("#LoadDIv").show();
    dataparam["REQTYPE"] = "GET_GLTRNPDCLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTyId"] = $$("ddlPdcTrnTy").getValue();
    dataparam["ChkAsOn"] = $$("ChkAsOn").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        type: "POST",
        url: "/GLTrans/COMAPI_CALL",
        cache: false,
        async: true,
        data: "request=" + DataVal,
        success: function (data) {

            if (data != undefined && data != null && data != "") {
                debugger;
                rowdata = JSON.parse(data);
                $$("grdPDCSrch").clearAll();
                var Options = $$("grdPDCSrch").getColumnConfig("VouchTy").collection;
                Options.clearAll();
                Options.parse(rowdata.TblTRNTY);
                $$("grdPDCSrch").parse(rowdata.TBLPDC);
                $("#hdnPDCParentTrnTy").val(rowdata.PDCPARENTTRN[0]);
                $$("grdPDCSrch").refresh(); 
            }
        }
    });
    $("#LoadDIv").hide();
    return rowdata;

}