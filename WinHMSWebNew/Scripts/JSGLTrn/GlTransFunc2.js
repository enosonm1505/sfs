
var Delicon = "<span class='webix_icon wxi-trash'></span>";

function fnMainDetRowAdd(option) {
    debugger;
    var grdData = $$("grdGLTransDet").serialize();
    var lenval = grdData.length;

    var CrAmt = ""; var DrAmt = "";

    var DrCR = "";
    if ($.trim(option) == "0") {

        if ($("#hdnFirstDrCrInd").val() == "1")
            DrCR = "DR";
        else
            DrCR = "CR";
    }
    else {
        if (grdData[lenval - 1].Drcr == "DR") {
            DrCR = "CR";
            DrAmt = grdData[lenval - 1].Credit;
            CrAmt = grdData[lenval - 1].Debit;
        }
        else {
            DrCR = "DR";
            CrAmt = grdData[lenval - 1].Debit;
            DrAmt = grdData[lenval - 1].Credit;
        }
    }

    var CurNm = "";
    var CurIds = $.trim($("#hdnBaseCurrId").val());
    var ddlcurrency = fnLoadCurrency();

    if (ddlcurrency.length != 0) {
        var CurrData = ddlcurrency.filter(function (ddlcurrency) {
            return ddlcurrency.id == $.trim(CurIds);
        });

        CurNm = CurrData[0].value
    }

    var addrow = {
        RowId:(lenval==0?0:lenval),Drcr: DrCR, ACCD: '', hdnAcId: '', AcNM: '', hdnCurNm: '', CurrId: CurNm, CurBal: '', FCurBal: '', Credit: CrAmt, Debit: DrAmt, Narr: '', DocNo: '', DocDt: '',
        PsRate: '', FornAmt: '', RateTy: '', SNo: '', ActCR: '', ActDR: '', ReConInd: '', ReConDt: '', LKAcId: '', Cdt: '', ApprBy: '', VNo: '',
        ProjId: '', ProjNm: '', ChkAind: '', ChkBind: '', ChkCind: '', ChkDind: '', ChkEind: '', ChkFind: '', TrInd: '', SN1: '', TdInd: '',
        ChkLind: '', ChkMind: '', ChkNind: '', ChkOind: '', Gainl: '', VatInd: '', CBy: '', ApprDt: '', ReConBy: '', hdnFornAmt: '', AcTy: '', PostInd: '',PostTy:'',
    };

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
    

    $$("grdGLTransDet").refresh();
}

function fnBillDetRowAdd(option,RowId,vDRCR,hdnAcId) {

    if ($$("grdBillDet") != undefined) {
       
        var grdData = $$("grdBillDet").serialize();
        var lenval = grdData.length;

        debugger;

        var vRowId = 0; var HDRCR = ""; var vhdnAcId = "";
        if (option == 1) {
            vRowId = grdData[lenval - 1].RowId;
            HDRCR = grdData[lenval - 1].Drcr;
            vhdnAcId = grdData[lenval - 1].hdnAcId;
        }
        else {
            HDRCR = vDRCR;
            vRowId = RowId;
            vhdnAcId = hdnAcId;
        }

        var DefRefNm = ""; var DefRefId = "";

        //if (ddlRefTy.length > 0) {
        //    if (ddlRefTy[0].DEF_VALUE != null && ddlRefTy[0].DEF_VALUE != "") {
        //        DefRefNm = ddlRefTy[ddlRefTy[0].DEF_VALUE].value;
        //        DefRefId = ddlRefTy[0].DEF_VALUE;
        //    }
        //}

        var addrow = {
            RowId: vRowId,
            RefTyId: DefRefId, RefTyNm: DefRefNm, RefNm: '', BillDt: $("#hdnCurrentDt").val(), DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', FornAmt: '',
            Drcr: HDRCR, OFornBAmt: '', BillConvrt: '', diffAmt: '', hdnAcId: vhdnAcId, CBy: '', CDt: '', AdjBy: '', AdjDt: '',
        };

        if ($("#hdnCurMode").val() == "N") {

            if ($.trim(option) == "0") {

                if (lenval == 0) {
                    $$("grdBillDet").add(addrow);
                }
            }
        }
        if ($.trim(option) == "1") {

            if (lenval != 0) {

                for (i = 0; i < lenval; i++) {

                    //if (grdData[i].RefTyId == "") {
                    //    return false;
                    //}

                    //if (grdData[i].BillDt == "") {
                    //    return false;
                    //}

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

    if ($("#hdnCurMode").val() == "N") {

        if ($.trim(option) == "0") {

            if (lenval == 0) {
                $$("grdGlAnaly").add(addrow);
            }
        }
    }
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
function fnCallPopupAccontSrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupAccNmSrch",
        head: "Account Name",
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
                    id: "grdAccount",
                    select: "row",
                    data: [],
                    height: 460,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: "AC_CD", id: "AC_CD", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
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

                            CurRows.AcNM = $.trim(selectedRows[0].AC_ALT_NM).replace("&","");
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
                           // fnBillDetDataRef();
                            fnDeleteRowAnaData();
                            if (AnaAppl == "1")
                            {
                                fnCallAnaysis($.trim(selectedRows[0].AC_ID), A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND);
                            }
                            else
                            {
                                $$("grdGlAnaly").hide();
                            }
                               
                            $$("grdGLTransDet").refresh();
                            $$('PopupAccNmSrch').hide();
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

    //fnLoadAccountSrch(DrCrInd);
    //$$("PopupAccNmSrch").show();
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
        async: true,
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

function fnCallAnaysis(AC_ID, A_IND, B_IND, C_IND, D_IND, E_IND, F_IND, L_IND, M_IND, N_IND, O_IND) {

    var addrow = {
        Drcr: ''
    };

    $$("grdGlAnaly").clearAll();
    $$("grdGlAnaly").parse(addrow);
    $$("grdGlAnaly").refresh();



    var cnt = 0;

    debugger;

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
        $$("grdGlAnaly").define("width", (parseInt(cnt) * 340));
        $$("grdGlAnaly").resize();



        $$("grdGlAnaly").refresh();

    }
    else {
        $$("grdGlAnaly").hide();
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
        $$("grdGlAnaly").define("width", (parseInt(cnt) * 340));
        $$("grdGlAnaly").resize();

       

        $$("grdGlAnaly").refresh();

    }
    else {
        $$("grdGlAnaly").hide();
    }
}
function fnCallAnalyData() {
    debugger;
    var itemval = $$("grdGLTransDet").getSelectedItem();
    var dsGlAnalyData = $$("grdGlAnalyData").serialize();

    if (dsGlAnalyData.length == 0) {
        // fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId);
    }
    else {

        var CurrData = dsGlAnalyData.filter(function (dsGlAnalyData) {
            return dsGlAnalyData.RowId == $.trim(itemval.RowId);
        });

        if (CurrData.length == 0) {
            //fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId);
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
                            var AnalyNm = $.trim(selectedRows[0].TC_NM);

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
    $$("grdAnalySrch").clearAll();
    $$("grdAnalySrch").parse(SrchData);
    $$("grdAnalySrch").refresh();
    $$("PopupAnalySrch").show();
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
function fnCallBillDetails(ddlRefTy) {

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
                                    labelWidth: 70,
                                    inputWidth: 180,
                                    width: 180,
                                 
                                    //value: (Opt == "1" ? (CrAmt != "" ? parseFloat(CrAmt).toFixed(2) : 0) : (DrAmt != "" ? parseFloat(DrAmt).toFixed(2) : 0)),
                                },
                                {
                                    view: "label",
                                    id: "lblDRCR",
                                    //label: (Opt == "1" ? "CR" : "DR"),
                                    labelAlign: "Left",
                                    inputWidth: 70,
                                    width: 70,
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCurr",
                                    stringResult: true,
                                    label: "Currency",
                                    labelAlign: "Right",
                                    labelWidth: 100,
                                    inputWidth: 180,
                                    hidden: true,
                                    width: 180,
                                },
                                {
                                    view: "text",
                                    id: "txtBPopFAmt",
                                    stringResult: true,
                                    label: "Fron Amt",
                                    labelAlign: "Right",
                                    labelWidth: 110,
                                    inputWidth: 200,
                                    hidden: true,
                                    width: 200,
                                },
                                {
                                    view: "text",
                                    id: "txtBPopCovt",
                                    stringResult: true,
                                    label: "Conv.Rt",
                                    labelAlign: "Right",
                                    labelWidth: 100,
                                    inputWidth: 180,
                                    hidden: true,
                                    width: 250,
                                },
                            ]
                        },
                        {
                            view: "datatable",
                            id: "grdBillDet",
                            select: "row",
                            data: [],
                            height: 280,
                            editable: true,
                            footer: true,
                            scroll: "y",
                            columns: [
                                    { header: "Ref.Type Name", id: "RefTyId", width: 130, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return ddlRefTy; } },
                                    { header: "Ref.Name", id: "RefNm", width: 200, editor: 'text', liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Bill Date", id: "BillDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' } },
                                    { header: "Due Date", id: "DueDt", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), liveEdit: true, css: { 'text-align': 'left ! important' }, footer: { text: "Total" } },
                                    {
                                        header: "Debit", id: "DrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" }, format: webix.i18n.numberFormat
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
                                        //        decimalSize: 2

                                        //    });
                                        //},
                                    },
                                    {
                                        header: "Credit", id: "CrAmt", width: 120, editor: 'text', liveEdit: true, css: { 'text-align': 'right ! important' },
                                        footer: { content: "summColumn" }, format: webix.i18n.numberFormat
                                        //format: function (value) {
                                        //    return webix.Number.parse(value, {
                                        //        groupDelimiter: "",
                                        //        groupSize: '',
                                        //        decimalDelimiter: ".",
                                        //        decimalSize: 2

                                        //    });
                                        //},
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

                                    { header: "", id: "btnBDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },

                            ],
                            on: {
                                'onBeforeEditStart': function (id) {
                                    var getval = this.getItem(id);
                                    if (id.column == 'RefNm' || id.column == 'BillDt' || id.column == 'DueDt' )
                                    {
                                        if(getval.RefTyId == "3")return false;                                       
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
                                    var getval = this.getItem(id);
                                    
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
                                        //if (getval.Drcr == "CR") {
                                        //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}
                                        //else
                                        //{
                                        //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}

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
                                            //Peding Bills
                                            //$$("grdBillDet").editCell(getval.id, "RefNm", true, true);
                                            //$$("grdBillDet").refresh();
                                            fnPopUpPendingBills(getval.hdnAcId, ddlRefTy);
                                           
                                        }
                                        else {
                                            //$$("grdBillDet").editCell(getval.id, "RefNm", false, true);
                                            //$$("grdBillDet").refresh();
                                        }
                                    }
                                },
                                'onItemClick': function (id, e, node, trg) {
                                    var getval = this.getItem(id.row);

                                    $("#hdnBGClickCol").val(id.column);
                                    debugger;
                                    if (id.column == 'btnBDel') {
                                        debugger;
                                        $$("grdBillDet").editCancel();
                                        $$("grdBillDet").remove($$("grdBillDet").getSelectedId());
                                        $$("grdBillDet").refresh();

                                        var dsBillDet = $$("grdBillDet").serialize();
                                        var TrnVal = $$("grdGLTransDet").getSelectedItem();

                                        fnBillTotal();
                                        if (dsBillDet.length == 0) {
                                            
                                            fnBillDetRowAdd('0', $.trim(TrnVal.RowId), $.trim(TrnVal.Drcr), $.trim(TrnVal.hdnAcId));
                                        }
                                    }
                                    else if (id.column == "CrAmt") {
                                        //if (getval.Drcr == "CR") {
                                        //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}
                                        //else {
                                        //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}
                                    }
                                    else if (id.column == "DrAmt") {

                                        //if (getval.Drcr == "DR") {
                                        //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}
                                        //else {
                                        //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                        //    $$("grdBillDet").refresh();
                                        //}
                                    }
                                    else if(id.column == "BillDt")
                                    {
                                        if (getval.RefTyId == "3") {
                                            //if (getval.Drcr == "DR") {
                                            //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                            //else {
                                            //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                        }
                                        else {
                                           
                                            

                                            $$("grdBillDet").editCell(getval.id, "BillDt", false, true);
                                            $$("grdBillDet").refresh();
                                        }
                                    }
                                    else if (id.column == "DueDt") {
                                        if (getval.RefTyId == "3") {
                                            //if (getval.Drcr == "DR") {
                                            //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                            //else {
                                            //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                        }
                                        else {
                                            //$$("grdBillDet").editCell(getval.id, "DueDt", false, true);
                                            //$$("grdBillDet").refresh();
                                        }
                                    }
                                    else if (id.column == "RefNm")
                                    {
                                        if (getval.RefTyId == "3")
                                        {
                                            //if (getval.Drcr == "DR") {
                                            //    $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                            //else {
                                            //    $$("grdBillDet").editCell(getval.id, "CrAmt", false, true);
                                            //    $$("grdBillDet").refresh();
                                            //}
                                        }
                                        else {
                                            //$$("grdBillDet").editCell(getval.id, "RefNm", false, true);
                                            //$$("grdBillDet").refresh();

                                          
                                        }
                                       

                                       
                                    }
                                },
                                'onKeyPress': function (e, id) {
                                    var getval = $$("grdBillDet").getSelectedItem();
                                    debugger;
                                    var charCode = (e.which) ? e.which : event.keyCode;
                                    if(charCode==9)
                                    {
                                        if (getval.Drcr == "CR") {
                                            $$("grdBillDet").editCell(getval.id, "DrAmt", false, true);
                                            $$("grdBillDet").editCell(getval.id, "CrAmt", true, true);
                                            $$("grdBillDet").refresh();
                                        }
                                        else if (getval.Drcr == "DR") {
                                            $$("grdBillDet").editCell(getval.id, "CrAmt", false, true)
                                            $$("grdBillDet").editCell(getval.id, "DrAmt", true, true);
                                            $$("grdBillDet").refresh();
                                        }
                                    }
                                    if ($.trim($("#hdnBGClickCol").val()) == "CrAmt" || $.trim($("#hdnBGClickCol").val()) == "DrAmt") {
                                       
                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {

                                            if (e == 40) {
                                                var TrnVal = $$("grdGLTransDet").getSelectedItem();
                                                fnBillDetRowAdd('1', $.trim(TrnVal.RowId), $.trim(TrnVal.Drcr), $.trim(TrnVal.hdnAcId));
                                            }

                                            return false;
                                        }
                                        
                                    }
                                },
                                'onBlur': function () {
                                    debugger;
                                    fnBillTotal();
                                    $$("grdBillDet").editStop();
                                    $$("grdBillDet").refresh();
                                    
                                },
                                'onAfterEditStop': function (state, editor) {
                                    fnBillTotal();
                                    $$("grdBillDet").refresh();
                                }
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
                                               labelWidth: 70,
                                               hidden: true,
                                               inputWidth: 180,
                                               width: 200,
                                           },
                                           {
                                               view: "text",
                                               id: "txtBPopFAmtDiff",
                                               stringResult: true,
                                               label: "FornAmt Diff",
                                               labelAlign: "Right",
                                               labelWidth: 90,
                                               hidden: true,
                                               inputWidth: 180,
                                               width: 280,
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
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
                                                      //fnBillDetDataRef();
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
                                              maxWidth: 70,
                                              on: {
                                                  onItemClick: function () {
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
        fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId);
    }
    else {

        var CurrData = dsGlTrans.filter(function (dsGlTrans) {
            return dsGlTrans.RowId == $.trim(itemval.RowId);
        });

        if (CurrData.length == 0) {
            fnBillDetRowAdd('0', itemval.RowId, itemval.Drcr, itemval.hdnAcId);
        }
        else {
            $$("grdBillDet").clearAll();
            $$("grdBillDet").parse(CurrData);
            $$("grdBillDet").refresh();
        }
    }

    fnBillTotal();
    $$("txtBPopAmt").disable();
    $$("PopupBillDet").show();
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
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     var itemval = $$("grdGLTransDet").getSelectedItem();
                                                     itemval.Narr = $$("txtLineNarr").getValue();
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


function fnBillTotal() {

    var itemval = $$("grdGLTransDet").getSelectedItem(true);

    if (itemval.length > 0) {

        var retVal = 0;
        var DetAdmt = $$("txtBPopAmt").getValue();
        var DrAmt = 0; var CrAmt = 0;

        var grdBillDet = $$("grdBillDet").serialize();

        if (grdBillDet.length != 0) {

            for (i = 0; i < grdBillDet.length; i++) {

                DrAmt = DrAmt + (grdBillDet[i].DrAmt == "" ? 0 : parseFloat(grdBillDet[i].DrAmt))

                CrAmt = CrAmt + (grdBillDet[i].CrAmt == "" ? 0 : parseFloat(grdBillDet[i].CrAmt))
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

                                                              var Chk = "";
                                                              for (j = 0; j < lenval; i++) {
                                                                  var BillRefTyId = $.trim(grdData[j].RefTyId);
                                                                  var BillRefNm =  $.trim(grdData[j].RefNm);
                                                                  if(BillRefTyId==vRefTyId && BillRefNm==PendRefNm)
                                                                  {
                                                                      Chk = "1";
                                                                      break;
                                                                  }

                                                              }
                                                              if (Chk == "")
                                                              {
                                                                  var addrow = {
                                                                      RowId: vRowId,
                                                                      RefTyId: vRefTyId, RefTyNm: vRefTyNM, RefNm: data[i].RefNM, BillDt: data[i].DueDt1, DueDt: data[i].DueDt1,
                                                                      DrAmt: (HDRCR == "CR" ? data[i].PendAmt : ""), CrAmt: (HDRCR == "DR" ? data[i].PendAmt : ""), FornAmt: data[i].FAmt,
                                                                      Drcr: (HDRCR == "CR" ? "DR" : "CR"), OFornBAmt: '', BillConvrt: data[i].ConvFact, diffAmt: '', hdnAcId: vhdnAcId,
                                                                  };
                                                                  $$("grdBillDet").add(addrow);
                                                              }
                                                              //if (i == 0) {
                                                              //    dataval.RefTyId = vRefTyId;
                                                              //    dataval.RefTyNm = vRefTyNM;
                                                              //    dataval.RefNm = data[i].RefNM;
                                                              //    dataval.BillDt = data[i].DueDt1;
                                                              //    dataval.DueDt = data[i].DueDt1;

                                                              //    if (HDRCR == "CR")
                                                              //        dataval.CrAmt = data[i].PendAmt;
                                                              //    else
                                                              //        dataval.DrAmt = data[i].PendAmt;

                                                              //    Drcr: HDRCR,
                                                              //    dataval.FornAmt = data[i].FAmt;
                                                              //    dataval.BillConvrt = data[i].ConvFact;
                                                              //    hdnAcId: vhdnAcId;
                                                              //}
                                                              //else {

                                                              //    var addrow = {
                                                              //        RowId: vRowId,
                                                              //        RefTyId: vRefTyId, RefTyNm: vRefTyNM, RefNm: data[i].RefNM, BillDt: data[i].DueDt1, DueDt: data[i].DueDt1,
                                                              //        DrAmt: (HDRCR == "DR" ? data[i].PendAmt : ""), CrAmt: (HDRCR == "CR" ? data[i].PendAmt : ""), FornAmt: data[i].FAmt,
                                                              //        Drcr: HDRCR, OFornBAmt: '', BillConvrt: data[i].ConvFact, diffAmt: '', hdnAcId: vhdnAcId,
                                                              //    };

                                                              //    $$("grdBillDet").add(addrow);
                                                              //}
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
    $$("PopupPendBills").show();
   
    

   
}

function fnLoadPendingBills(AcId) {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_PENDINGBILLLOAD";
    dataparam["PROGNAME"] = "GET_GLTRNSC01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Mode"] = $("#hdnCurMode").val();
    dataparam["Acid"] = AcId;
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnId"] ="";

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
                                AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
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
                                AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
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
                                    AnalID9: AnalID9, AnalNM9: grdGlAnaly[j].AnalNM9, btnAnalID9: '', AnalID10: AnalID10, AnalNM10: grdGlAnaly[j].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
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
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
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
                                    AnalID9: '', AnalNM9: '', btnAnalID9: '', AnalID10: '', AnalNM10: '', btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: grdTranDet[i].hdnAcId,
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
                                        AnalID9: DtFilter[k].AnalID9, AnalNM9: DtFilter[k].AnalNM9, btnAnalID9: '', AnalID10: DtFilter[k].AnalID10, AnalNM10: DtFilter[k].AnalNM10, btnAnalID10: '', Amount: Amt, RowId: i, hdnAcId: DtFilter[k].hdnAcId,
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

            if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {
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

                            var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                            var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);

                            var CrAmt = (grdBillDet[j].CrAmt == "" ? 0 : parseFloat(grdBillDet[j].CrAmt)).toFixed(2);

                            var DrAmt = (grdBillDet[j].DrAmt == "" ? 0 : parseFloat(grdBillDet[j].DrAmt)).toFixed(2);
                            var FornAmt = (grdBillDet[j].FornAmt ==undefined|| grdBillDet[j].FornAmt == "" ? 0 : parseFloat(grdBillDet[j].FornAmt)).toFixed(2);
                            var Sno = j + 1;

                            var addrow = {
                                Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                BillDt: grdBillDet[j].BillDt.toString(), DrAmt: DrAmt, CrAmt: CrAmt, FormAmt: FornAmt,
                                CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt,AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,

                                DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: '', EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: i
                            };

                            DataStore = DataStore.concat(addrow);
                        }
                    }
                    else {

                        if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                            var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                            var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);

                            var addrow = {
                                Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: '',
                                CBy: '', CDt: '', AdjBy:'', AdjDt: '',

                                DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: '', EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: i
                            };

                            DataStore = DataStore.concat(addrow);
                        }
                    }
                }
                else {

                    if (CurrSelRowId == CurrRowId) {

                        if (grdBillDet.length != 0) {
                            for (j = 0; j < grdBillDet.length; j++) {

                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);

                                var CrAmt = (grdBillDet[j].CrAmt == "" ? 0 : parseFloat(grdBillDet[j].CrAmt)).toFixed(2);

                                var DrAmt = (grdBillDet[j].DrAmt == "" ? 0 : parseFloat(grdBillDet[j].DrAmt)).toFixed(2);
                                var FornAmt = (grdBillDet[j].FornAmt == "" || grdBillDet[j].FornAmt==undefined ? 0 : parseFloat(grdBillDet[j].FornAmt)).toFixed(2);
                                var Sno = j + 1;

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: grdBillDet[j].RefTyId, RefTyNm: grdBillDet[j].RefTyNm, RefNm: grdBillDet[j].RefNm, DueDt: grdBillDet[j].DueDt.toString(),
                                    BillDt: grdBillDet[j].BillDt.toString(), DrAmt: grdBillDet[j].DrAmt, CrAmt: grdBillDet[j].CrAmt, FormAmt:FornAmt,
                                    CBy: grdBillDet[j].CBy, CDt: grdBillDet[j].CDt, AdjBy: grdBillDet[j].AdjBy, AdjDt: grdBillDet[j].AdjDt,
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: Sno, FornBill: '', ConvrtBill: '', EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: i
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            if (grdTranDet[i].hdnAcId != "" && grdTranDet[i].AcNM != "") {

                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);


                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: '',
                                    CBy: '', CDt: '', AdjBy:'', AdjDt:'',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: '', EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: i
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

                                var Credit = (grdTranDet[i].Credit == "" ? 0 : parseFloat(grdTranDet[i].Credit)).toFixed(2);

                                var Debit = (grdTranDet[i].Debit == "" ? 0 : parseFloat(grdTranDet[i].Debit)).toFixed(2);

                                var addrow = {
                                    Drcr: grdTranDet[i].Drcr, ACCD: grdTranDet[i].ACCD, hdnAcId: grdTranDet[i].hdnAcId, AcNM: grdTranDet[i].AcNM, hdnCurNm: grdTranDet[i].hdnCurNm,
                                    CurrId: grdTranDet[i].CurrId, SlNo: '', FCurBal: '', Credit: Credit, Debit: Debit, Narr: grdTranDet[i].Narr,
                                    DocNo: grdTranDet[i].DocNo, DocDt: grdTranDet[i].DocDt,

                                    RefTyId: '', RefTyNm: '', RefNm: '', DueDt: $("#hdnCurrentDt").val(), DrAmt: '', CrAmt: '', BillDt: $("#hdnCurrentDt").val(), FormAmt: '',
                                    CBy: '', CDt: '', AdjBy: '', AdjDt: '',
                                    DETREF: '', DATREF: '', BILLREFSNO: '', BILLREFBDT: '', BILLREFVNO: '', billclno: '', billcldt: '', billudt: '', Nbilludt: '',
                                    Gloss: '', Fornbase: '1', FornBill: '', ConvrtBill: '', EFornamt: '', btds: '', btdsref: '', SlId: '', RateTy: '', RowId: i
                                };

                                DataStore = DataStore.concat(addrow);
                            }
                        }
                        else {

                            for (k = 0; k < DtFilter.length; k++) {

                                if (DtFilter[k].hdnAcId != "" && DtFilter[k].AcNM != "") {

                                    var CrAmt = (DtFilter[k].CrAmt == "" ? 0 : parseFloat(DtFilter[k].CrAmt)).toFixed(2);

                                    var DrAmt = (DtFilter[k].DrAmt == "" ? 0 : parseFloat(DtFilter[k].DrAmt)).toFixed(2);

                                    var FormAmt = (DtFilter[k].FormAmt || DtFilter[k].FormAmt == "NaN" ? 0 : parseFloat(DtFilter[k].FormAmt)).toFixed(2);
                                  
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
                                        EFornamt: DtFilter[k].EFornamt, btds: DtFilter[k].btds, btdsref: DtFilter[k].btdsref, SlId: DtFilter[k].SlId, RateTy: DtFilter[k].RateTy, RowId: i
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