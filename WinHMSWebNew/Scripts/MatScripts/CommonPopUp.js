var retStkItmDet = "";

function fnStkProdSrchPopUp(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId) {
    webix.ui({
        view: "window",
        modal: true,
        id: "fnStkProdSrchPopUp",
        head: "Product Search",
        close: true,
        position: "center",
        height: 600,
        width: 600,
        hidden: false,
        body: {
            view: "form",
            elements: [
                {
                    cols: [
                        {
                            view: "text", label: "", id: "txtNewSrchProdId", width: 100, height:30,
                            on:
                            {
                                'onKeyPress': function (e) {
                                    if (e == '13') {
                                        $$("btnNewProdSrch").callEvent("onItemClick");
                                    }

                                },
                            }
                        },
                        {
                            view: "text", label: "", id: "txtNewSrchProdNm", width: 400, height:30,
                            on:
                            {
                                'onKeyPress': function (e) {
                                    debugger;
                                    if (e == '13') {
                                        $$("btnNewProdSrch").callEvent("onItemClick");

                                    }

                                },
                            }
                        },
                        {
                            view: "button", id: "btnNewProdSrch", inputwidth: 50, width: 60, type: 'icon', icon: "wxi-search",
                            on:
                            {
                                'onItemClick': function onClickPrdSrchBut() {

                                    $$("NewProdSrchGrid").clearAll();
                                    fnLoadStkProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, "1");
                                    
                                },
                            },
                        }
                    ]
                },
                {
                    view: "datatable",
                    id: "NewProdSrchGrid",
                    select: "row",
                    data: [],
                    height: 480,
                    width: 600,
                    hidden: false,
                    columns: [

                        { header: "Prod ID", id: "PRODID", width: 90, css: { 'text-align': 'left ! important' } },
                       { header: "Product Name", id: "PRODNM", width: 330, css: { 'text-align': 'left ! important' } },
                       { header: "UOM", id: "UOM", width: 50, css: { 'text-align': 'center ! important' } },
                       { header: "Stock", id: "STKQTY", width: 80, css: { 'text-align': 'right ! important' } },
                        { header: "h1", id: "BASE_UOM", hidden: true },
                        { header: "h2", id: "AVG_RATE", hidden: true },
                        { header: "h3", id: "CONV_FACT_BASE", hidden: true },
                        { header: "h4", id: "UOM_DEC_LEN", hidden: true },

                    ],

                    on: {
                        'onItemDblClick': function (id) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id);
                            var itmDet = {};

                            if (FormId == "MATREQ") {

                                itmDet["prodId"] = selectedRows[0].PRODID;
                                itmDet["prodNm"] = selectedRows[0].PRODNM;
                                itmDet["prodNm1"] = selectedRows[0].PRODNM2;
                                itmDet["prodUom"] = selectedRows[0].UOM;
                                itmDet["stkQty"] = selectedRows[0].STKQTY;
                                itmDet["avgRt"] = selectedRows[0].AVG_RATE;
                                itmDet["prodRate"] = selectedRows[0].PROD_RATE;
                                itmDet["BaseUom"] = selectedRows[0].BASE_UOM;
                                itmDet["convF"] = selectedRows[0].CONV_FACT_BASE;
                                itmDet["decLen"] = selectedRows[0].UOM_DEC_LEN;
                                //itmDet["ExpDtAcceptInd"] = selectedRows[0].EXPIRY_DT_IND;

                                retStkItmDet = JSON.stringify(itmDet);

                                ProdSrchPopUpDblClick();
                            }

                            this.clearAll();
                            $$("txtNewSrchProdId").setValue("");
                            $$("txtNewSrchProdNm").setValue("");
                            $$("fnStkProdSrchPopUp").hide();
                            
                        },
                        'onKeyPress': function (e) {
                            debugger;
                            if (e == '13') {
                                var valid = $$("NewProdSrchGrid").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0].id]);
                            }
                        },
                    }

                },
                {
                    cols: [
                        {
                            view: "checkbox", label: "Word Search", id: "ChkNewWrdSrch", labelWidth: 80, width: 200,
                        },
                        {
                            view: "checkbox", label: "Stock Item", id: "ChkNewStkItem", labelWidth: 80, width: 200,
                        },
                    ]
                },
            ]

        },
    });
    debugger;
    fnLoadStkProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, "1");

    webix.UIManager.setFocus($$("txtNewSrchProdNm"));

}

function fnLoadStkProdSrchGrid(reqobj) {
    var rowDatad = "";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        url: "/MaterialMgt/fnStkProductIdLoadCom",
        data: "htParam=" + dataparam,
        success: function (d) {
            rowDatad = JSON.parse(d);
        },
    });

    return rowDatad;
}

function fnLoadStkProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, IsFirstLoad) {
    var rowDatap = [];
    var reqobj = {};

    reqobj["REQTYPE"] = "fnStkProductIdLoadCom";
    
    reqobj["ddlStore"] = StoreId;
    reqobj["stkInd"] = StockInd;
    reqobj["CST_ITM_RES"] = CstItmRes;
    reqobj["matEmulateInd"] = MatEmulInd;
    reqobj["prodGrApplInd"] = ProdGrpAppl;
    reqobj["sCurrentOperation"] = "";
    reqobj["ddlProperty"] = "";
    reqobj["prodId"] = "";
    reqobj["IsFirstLoad"] = IsFirstLoad;
    if ($$("ChkNewWrdSrch").getValue() == "1")
        reqobj["WordSrch"] = "1";
    else
        reqobj["WordSrch"] = "";

    if ($$("ChkNewStkItem").getValue() == "1")
        reqobj["StockItm"] = "1";
    else
        reqobj["StockItm"] = "";

    if (MatEmulInd == "1") {
        reqobj["costId"] = StoreId;
    }
    else {
        reqobj["costId"] = CostId;
    }

    reqobj["txtProdIdpop"] = $$("txtNewSrchProdId").getValue();
    reqobj["txtProdNMpop"] = $$("txtNewSrchProdNm").getValue();

    var rowDatap = fnLoadStkProdSrchGrid(reqobj);
    if (rowDatap.length > 0) {
        $$("NewProdSrchGrid").clearAll();
        $$("NewProdSrchGrid").parse(rowDatap);
        $$("NewProdSrchGrid").select($$("NewProdSrchGrid").getFirstId());
        webix.UIManager.setFocus($$("NewProdSrchGrid"));
    }
    else {
        $$("NewProdSrchGrid").clearAll();
    }
}


function fnNewProdSrchPopUp(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId) {
    webix.ui({
        view: "window",
        modal: true,
        id: "fnNewProdSrchPopUp",
        head: "Product Search",
        close: true,
        position: "center",
        height: 600,
        width: 600,
        hidden: false,
        body: {
            view: "form",
            elements: [
                {
                    cols: [
                        {
                            view: "text", label: "", id: "txtSrchProdId", width: 100, height:30,
                            on:
                            {
                                'onKeyPress': function (e) {
                                    if (e == '13') {
                                        $$("btnProdSrch").callEvent("onItemClick");
                                    }

                                },
                            }
                        },
                        {
                            view: "text", label: "", id: "txtSrchProdNm", width: 400, height:30,
                            on:
                            {
                                'onKeyPress': function (e) {
                                    
                                    if (e == '13') {
                                        $$("btnProdSrch").callEvent("onItemClick");

                                    }

                                },
                            }
                        },
                        {
                            view: "button", id: "btnProdSrch", inputwidth: 50, width: 60, type: 'icon', icon: "wxi-search",
                            on:
                            {
                                'onItemClick': function onClickPrdSrchBut() {
                                    $$("ProdSrchGrid").clearAll();
                                    fnLoadProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, "1");

                                },
                            },
                        }
                    ]
                },
                {
                    view: "datatable",
                    id: "ProdSrchGrid",
                    select: "row",
                    data: [],
                    height: 480,
                    width: 600,
                    hidden: false,
                    columns: [

                        //{ header: ["Prod ID", { content: "textFilter" }], id: "PRODID", width: 100, css: { 'text-align': 'left ! important' } },
                        //{ header: ["Product Name", { content: "textFilter" }], id: "PRODNM", width: 450, css: { 'text-align': 'left ! important' } },

                        { header: "Prod ID", id: "PRODID", width: 100, css: { 'text-align': 'left ! important' } },
                        { header: "Product Name", id: "PRODNM", width: 450, css: { 'text-align': 'left ! important' } },

                       //{ header: "UOM", id: "UOM", hidden: true, css: { 'text-align': 'center ! important' } },
                       //{ header: "Stock", id: "STKQTY", hidden: true, css: { 'text-align': 'right ! important' } },
                       // { header: "h1", id: "BASE_UOM", hidden: true },
                       // { header: "h2", id: "AVG_RATE", hidden: true },
                       // { header: "h3", id: "CONV_FACT_BASE", hidden: true },
                       // { header: "h4", id: "UOM_DEC_LEN", hidden: true },

                    ],

                    on: {
                        'onItemDblClick': function (id) {
                            
                            var selectedRows = this.getSelectedItem(id);
                            var itmDet = {};

                            if (FormId == "PHYRECON") {

                                itmDet["prodId"] = selectedRows[0].PRODID;
                                itmDet["prodNm"] = selectedRows[0].PRODNM;
                                itmDet["prodNm1"] = selectedRows[0].PRODNM2;
                                itmDet["prodUom"] = selectedRows[0].UOM;
                                itmDet["stkQty"] = selectedRows[0].STKQTY;
                                itmDet["avgRt"] = selectedRows[0].AVG_RATE;
                                itmDet["prodRate"] = selectedRows[0].PROD_RATE;
                                itmDet["BaseUom"] = selectedRows[0].BASE_UOM;
                                itmDet["convF"] = selectedRows[0].CONV_FACT_BASE;
                                itmDet["decLen"] = selectedRows[0].UOM_DEC_LEN;
                                itmDet["ExpDtAcceptInd"] = selectedRows[0].EXPIRY_DT_IND;

                                retItmDet = JSON.stringify(itmDet);

                                //fnAddPhyRecFromSrchForm();
                            }
                            else if (FormId == "MATRECPT")
                            {
                                
                                $("#SrchProductID").val(selectedRows[0].PRODID);
                                $("#SrchProductNm").val(selectedRows[0].PRODNM);
                                ProdSrchPopUpDblClick();
                            }

                            this.clearAll();
                            $$("txtSrchProdId").setValue("");
                            $$("txtSrchProdNm").setValue("");

                            $("#SrchProductID").val("");
                            $("#SrchProductNm").val("");

                            $$("fnNewProdSrchPopUp").hide();

                        },
                        'onKeyPress': function (e) {
                            if (e == '13') {
                                var valid = $$("ProdSrchGrid").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0].id]);
                            }
                        },
                    }

                },
                {
                    view: "checkbox", label: "Word Search", id: "txtWrdSrch", labelWidth: 80, width: 200,
                },
            ]

        },
    });

    
    fnLoadProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, "1");
    
    webix.UIManager.setFocus($$("txtSrchProdNm"));

}

function fnLoadProdSrchGrid(reqobj) {
     var rowDatad = "";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        url: "/MaterialMgt/fnProductIdLoadCom",
        data:"htParam="+ dataparam,
        success: function (d) {
            rowDatad = JSON.parse(d);
        },
    });

    return rowDatad;
}

function fnLoadProdListGrid(FormId, StoreId, StockInd, CstItmRes, MatEmulInd, ProdGrpAppl, CostId, IsFirstLoad)
{
    var rowDatap = [];
    var reqobj = {};
    
    reqobj["REQTYPE"] = "fnProductIdLoadCom";
    
    reqobj["ddlStore"] = StoreId;
    reqobj["stkInd"] = StockInd;
    reqobj["CST_ITM_RES"] = CstItmRes;
    reqobj["matEmulateInd"] = MatEmulInd;
    reqobj["prodGrApplInd"] = ProdGrpAppl;
    reqobj["sCurrentOperation"] = "";
    reqobj["ddlProperty"] = "";
    reqobj["prodId"] = "";
    reqobj["IsFirstLoad"] = IsFirstLoad;
    if ($$("txtWrdSrch").getValue() == "1")
        reqobj["WordSrch"] = "1";
    else
        reqobj["WordSrch"] = "";

    if (MatEmulInd == "1") {
        reqobj["costId"] = StoreId;
    }
    else {
        reqobj["costId"] = CostId;
    }

    reqobj["txtProdIdpop"] = $$("txtSrchProdId").getValue();
    reqobj["txtProdNMpop"] = $$("txtSrchProdNm").getValue();

    var rowDatap = fnLoadProdSrchGrid(reqobj);
    if (rowDatap.length > 0) {
        $$("ProdSrchGrid").clearAll();
        $$("ProdSrchGrid").parse(rowDatap);
        $$("ProdSrchGrid").select($$("ProdSrchGrid").getFirstId());
        webix.UIManager.setFocus($$("ProdSrchGrid"));
    }
    else {
        $$("ProdSrchGrid").clearAll();
    }
}


function fnNewSupplierSrchPopUp(FormId) {
    webix.ui({
        view: "window",
        modal: true,
        id: "fnNewSupplierSrchPopUp",
        head: "Party Search",
        close: true,
        position: "center",
        height: 600,
        width: 500,
        hidden: false,
        body: {
            view: "form",
            elements: [
                {
                    cols: [
                        {
                            view: "text", label: "", id: "txtSrchSuppId", width: 100, height: 30,
                            on:
                            {
                                'onKeyPress': function (e) {
                                    if (e == '13') {
                                        $$("btnSuppSrch").callEvent("onItemClick");
                                    }

                                },
                            }
                        },
                        {
                            view: "text", label: "", id: "txtSrchSuppNm", width: 300, height: 30,
                            on:
                            {
                                'onKeyPress': function (e) {

                                    if (e == '13') {
                                        $$("btnSuppSrch").callEvent("onItemClick");

                                    }

                                },
                            }
                        },
                        {
                            view: "button", id: "btnSuppSrch", inputwidth: 50, width: 60, type: 'icon', icon: "wxi-search",
                            on:
                            {
                                'onItemClick': function onClickPartySrchBut() {
                                    $$("SupplierSrchGrid").clearAll();
                                    fnLoadSupplierListGrid(FormId);

                                },
                            },
                        }
                    ]
                },
                {
                    view: "datatable",
                    id: "SupplierSrchGrid",
                    select: "row",
                    data: [],
                    height: 500,
                    width: 500,
                    hidden: false,
                    columns: [

                        { header: "Supplier ID", id: "SUPPLIER_ID", width: 100, css: { 'text-align': 'left ! important' } },
                        { header: "Supplier Name", id: "SUPPLIER_NM", width: 350, css: { 'text-align': 'left ! important' } },
                        { header: "PARTY_TY_ID", id: "PARTY_TY_ID", hidden: true },
                        { header: "TX_RG_TY", id: "TX_RG_TY", hidden: true },
                        { header: "VAT_GS", id: "VAT_GS", hidden: true },

                    ],

                    on: {
                        'onItemDblClick': function (id) {

                            var selectedRows = this.getSelectedItem(id);
                            var itmDet = {};

                            if (FormId == "MATRECPT") {

                                $("#SrchProductID").val(selectedRows[0].SUPPLIER_ID);
                                $("#SrchProductNm").val(selectedRows[0].SUPPLIER_NM);

                                $("#PartyTY_ID").val(selectedRows[0].PARTY_TY_ID);
                                $("#TX_RG_TY").val(selectedRows[0].TX_RG_TY);
                                $("#VAT_GS").val(selectedRows[0].VAT_GS);

                                PartySrchPopUpDblClick();
                            }

                            this.clearAll();
                            $$("txtSrchSuppId").setValue("");
                            $$("txtSrchSuppNm").setValue("");

                            $("#SrchProductID").val("");
                            $("#SrchProductNm").val("");
                            
                            $$("fnNewSupplierSrchPopUp").hide();

                        },
                        'onKeyPress': function (e) {
                            if (e == '13') {
                                var valid = $$("SupplierSrchGrid").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0].id]);
                            }
                        },
                    }

                },
            ]

        },
    });


    fnLoadSupplierListGrid(FormId);

    webix.UIManager.setFocus($$("txtSrchSuppNm"));

}

function fnLoadSupplierSrchGrid(reqobj) {
    var rowDatad = "";

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        url: "/MaterialMgt/fnSupplierIdLoadCom",
        data: "htParam=" + dataparam,
        success: function (d) {
            rowDatad = JSON.parse(d);
        },
    });

    return rowDatad;
}

function fnLoadSupplierListGrid(FormId) {
    var rowDatap = [];
    var reqobj = {};

    reqobj["REQTYPE"] = "fnSupplierIdLoadCom";
        
    reqobj["SrchSuppId"] = $$("txtSrchSuppId").getValue();
    reqobj["SrchSuppNm"] = $$("txtSrchSuppNm").getValue();
    //reqobj["SrchSuppId"] = "";
    //reqobj["SrchSuppNm"] = "";
    reqobj["Party_Ty_Id"] = "S";
    reqobj["Store_Type"] = "";
    
    var rowDatap = fnLoadProdSrchGrid(reqobj);
    if (rowDatap.length > 0) {
        $$("SupplierSrchGrid").clearAll();
        $$("SupplierSrchGrid").parse(rowDatap);
        $$("SupplierSrchGrid").select($$("SupplierSrchGrid").getFirstId());
        webix.UIManager.setFocus($$("SupplierSrchGrid"));
    }
    else {
        $$("SupplierSrchGrid").clearAll();
    }

}