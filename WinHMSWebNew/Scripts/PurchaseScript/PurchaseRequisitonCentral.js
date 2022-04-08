function PageLoadFn(COMPID) {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var EditIcon = "<span class='webix_icon wxi-pencil' style='margin-top: 5px;'></span>";
    var ViewIcon = "<span class='webix_icon wxi-eye' style='margin-top: 5px;'></span>";
    var SearchIcon = "<span class='webix_icon wxi-search' style='margin-top: 5px;'></span>";
    var CloseIcon = "<span class='webix_icon wxi-close' style='margin-top: 5px;'></span>";
    var DeleteIcon = "<span class='webix_icon wxi-trash' style='margin-top: 5px;'></span>";
    var Roweditcss = "";
    debugger;
    var wid_35 = ((screen.width - 100) * 0.35);
    var wid_30 = ((screen.width - 100) * 0.30);
    var wid_20 = ((screen.width - 100) * 0.20);
    var wid_15 = ((screen.width - 100) * 0.15);
    var wid_12 = ((screen.width - 100) * 0.12);
    var wid_11 = ((screen.width - 100) * 0.11);
    var wid_10 = ((screen.width - 100) * 0.1);
    var wid_9 = ((screen.width - 100) * 0.09);
    var wid_7 = ((screen.width - 100) * 0.07);
    var wid_8 = ((screen.width - 100) * 0.08);
    var wid_6 = ((screen.width - 100) * 0.06);
    var wid_5 = ((screen.width - 100) * 0.05);
    var wid_4 = ((screen.width - 100) * 0.04);
    var ddlId = ['ddlProperty'];
    var DDLVal = DropdownLoad(ddlId);
    webix.ui({
        container: "divPropbox",
        view: "richselect",
        maxWidth: 400,
        id: "ddlProperty",
        options: DDLVal.ddlProperty,
        value: COMPID,
        on: {
            onChange: function () {
                var reqobj = {};
                reqobj["COMPID"] = $$("ddlProperty").getValue();
                var dataparam = JSON.stringify(reqobj);
                $.ajax({
                    async: false,
                    url: "/MaterialCtrl/PeropertyChange",
                    type: 'POST',
                    data: "request=" + dataparam,
                    success: function (d) {
                        debugger;
                    },
                });
                ChangePrperty();
            }
        }
    });
   
    webix.ui({
        container: "prcom1",
        view: "combo",
       // label: 'Combo',
        value: "One",
        placeholder:"All",
        inputWidth: '270',
        
        options: ["All","My Request","Applicable Cost Center" ]
    });
   
    webix.ui({
        container: "DivUnit",
        view: 'richselect',
       // label: 'Unit',
        id: 'UnitDDL',
        value: '',
        options: [],
       // labelWidth: 0,
        on: {
            onChange: function () {
               
            }
        }
    });
    webix.ui({
        container: "DivStatus",
        view: 'richselect',
        label: 'Status',
        id: 'StatusDDL',
        value: '',
        options: [],
        labelWidth: 50,
        on: {
            onChange: function () {

            }
        }
    });
    
    var ReqPage = {
        view: "pager",
        id: "ReqPage",
        template: "{common.prev()} {common.pages()} {common.next()}",
        size: 10,
        group: 5,
        css:"float-right",
        
        
    };
    webix.ui({
        view: "pager",
        id: "ReqPage",
        template: "{common.prev()} {common.pages()} {common.next()}",
        size: 10,
        group: 5,
        css: "float-right",

    });
    webix.ui({
        container: "DivProdGrid",
        view: "datatable",
        id: "RequestGrid",
        name: 'RequestGrid',
        select: 'row',
        columns: [
                 { header: "Request No.", id: "REQUESTNO", width: wid_8, css: { 'text-align': 'center ! important' }, },
                 { header: "Request Name", id: "REQUESTNAME", width: wid_15, editor: "text", css: { 'text-align': 'left ! important' }, },
                 { header: "Create By", id: "CREATEBY", width: wid_7, css: { 'text-align': 'center ! important' } },
                 { header: "Create Dt", id: "CREATEDATE", width: wid_6, css: { 'text-align': 'center ! important' }, },
              //   { header: "Create Tm", id: "CREATETIME", width: wid_7, editor: "text", css: { 'text-align': 'right ! important' }, },
                  { header: "Item", id: "Item", width: wid_15, css: { 'text-align': 'center ! important' }, },
                 { header: "Store/CC", id: "STORE/CC", width: wid_8, css: { 'text-align': 'center ! important' }, },
                 { header: "Status", id: "STATUS", width: wid_7, css: { 'text-align': 'center ! important' }, },
                 { header: "Order Info", id: "ORDERINFO", width: wid_8, css: { 'text-align': 'center ! important' }, },
                 { header: "", id: "EDITMODE", width: wid_4, template: EditIcon, css: { 'text-align': 'center ! important', 'padding': '0px ! important', 'color': 'white' }, hidden: false, },
                 { header: "", id: "VIEWMODE", width: wid_4, template: ViewIcon, css: { 'text-align': 'center ! important', 'padding': '0px ! important', 'color': 'white' }, hidden: false, },
                 { header: "", id: "DELETEMODE", width: wid_4, template: DeleteIcon, css: { 'text-align': 'center ! important', 'padding': '0px ! important', 'color': 'white' }, hidden: false, },
                 { header: "", id: "CLOSEMODE", width: wid_4, template: CloseIcon, css: { 'text-align': 'center ! important', 'padding': '0px ! important', 'color': 'white' }, hidden: false, },

        ],
        editable: true,
        minHeight: 350,
        fixedRowHeight: false, rowLineHeight: 20,
        ready: function () {
           
        },
        css: "wrap",
        pager: "ReqPage",
        data: [],
        on: {
            'onKeyPress': function (e) {
                // debugger;
                if (e == '40') {
                    var nodeid = $$("RequestTemplateGrid").getSelectedId(true);
                    var lastid = $$("RequestTemplateGrid").getLastId();
                    if (nodeid[0].row == lastid) {
                        AddRequestTemplateRow();
                    }
                }
            },
            'onBeforeEditStart': function (id) {
                var getval = this.getItem(id.row);
                if (id.column == 'ProdUOM') {
                    debugger;
                    var Options = this.getColumnConfig("ProdUOM").collection;
                    var reqobj1 = {};
                    var UOMHd = "";
                    var UOMSTR = [];
                    reqobj1["REQTYPE"] = "FNUOMLoad";
                    reqobj1["prodId"] = getval.PRODID;
                    reqobj1["hdnUOM"] = getval.ProdUOM;
                    var dataparam1 = JSON.stringify(reqobj1);
                    $.ajax({
                        async: false,
                        url: "/MaterialCtrl/MPAPI_CALL",
                        type: 'POST',
                        data: "request=" + dataparam1,
                        success: function (d) {
                            debugger;
                            if (d != "[]") {

                                Options.clearAll();
                                UOMHd = JSON.parse(d);
                                Options.parse(UOMHd);
                            }
                            else {
                                Options.clearAll();
                                UOMSTR = { id: getval.ProdUOM, value: getval.ProdUOM };
                                Options.parse(UOMSTR);
                            }
                        },
                    });
                    return true;
                }

                else if (id.column == 'ProdMRQty') {
                    debugger;
                    if ($("#Mode_type").val() != "VIEW") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }

            },
            'onAfterEditStart': function (id) {
                if (id.column == 'ProdUOM') {
                    var Options = this.getColumnConfig("ProdUOM").collection;
                    Options.clearAll();
                    UOMSTR = types;
                    Options.parse(UOMSTR);
                    $$("RequestTemplateGrid").refresh();
                }
                else if (id.column == 'ProdId') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 10);
                }
                else if (id.column == 'ProdMRQty') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 8);
                }
            },
            'onItemClick': function (id) {
                debugger;
                if (id.column == 'DELETEMODE') {
                    $$("RequestTemplateGrid").editStop();
                    $$("RequestTemplateGrid").editCancel();
                    webix.confirm({
                        title: "Confirmation !",
                        ok: "Yes", cancel: "No",
                        text: "Are you sure to Delete this line Item !"
                    })
                  .then(function () {
                      $$("RequestTemplateGrid").editCancel();
                      $$("RequestTemplateGrid").remove($$("RequestTemplateGrid").getSelectedId());
                      $$("RequestTemplateGrid").refresh();
                  })
                  .fail(function () {

                  });
                }
                else if (id.column == 'PRODSRCHMODE') {
                    ProdSearchPopup();
                }

            },
            'onAfterEditStop': function (state, editor) {
                if (editor.column == 'ProdMRQty') {
                    debugger;
                    if (state.value != state.old) {
                        var getval = this.getItem(editor.row);
                        if (isNaN(state.value) == true) {
                            getval.ProdMRQty = "";
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                            }
                            else {
                                getval.ProdMRQty = "";
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                        }
                        else {
                            getval.ProdMRQty = "";
                        }
                    }
                }
                if (editor.column == 'PRODID') {
                    debugger;
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        var rowDatap = [];
                        var reqobj = {};
                        var setfocusval = "";
                        reqobj["REQTYPE"] = "ProductOnGrigLoad";
                        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                        reqobj["ddlStore"] = $$("ddlStore").getValue();
                        reqobj["stkInd"] = $("#stkInd").val();
                        reqobj["cirInd"] = $("#cirInd").val();
                        reqobj["mrdInd"] = $("#mrdInd").val();
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        reqobj["matEmulateInd"] = $("#matEmulateInd").val();
                        reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
                        reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
                        reqobj["txtProdIdpop"] = state.value;
                        reqobj["txtProdNmpop"] = '';

                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/MaterialCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                debugger;
                                if (d != "[]") {
                                    setfocusval = "1";
                                    rowDatap = JSON.parse(d);
                                    var ff = rowDatap.length;
                                    var FullData = $$("RequestTemplateGrid").serialize();
                                    var len = FullData.length;
                                    if (len != 1) {
                                        for (i = 0; i < len; i++) {
                                            var itemId = $.trim(FullData[i].PRODID);
                                            if ($.trim(rowDatap[0].PRODID) == itemId && $.trim(FullData[i].id) != editor.row) {
                                                alert("This product is already added!...");
                                                getval.PRODID = '';
                                                getval.PRODNM = '';
                                                getval.TOUOM = '';
                                                getval.ConvFact = '';
                                                getval.ProdUOMHd = '';
                                                getval.ProdUOM = '';
                                                getval.ProdMRQty = '';
                                                getval.declen = '';
                                                var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                                $$("RequestTemplateGrid").editCell(editor.row, "PRODID", false, true);
                                                $$("RequestTemplateGrid").refresh();
                                                return false;
                                            }
                                        }
                                    }
                                    var prodId = rowDatap[0].PRODID;
                                    var prodNm = rowDatap[0].PRODNM;
                                    var popUom = rowDatap[0].UOM;
                                    var toUom = rowDatap[0].TOUOM;
                                    var convF = rowDatap[0].CONV_FACT_BASE;
                                    var decLen = rowDatap[0].UOMDECLEN;
                                    getval.PRODID = prodId;
                                    getval.PRODNM = prodNm;
                                    getval.TOUOM = toUom;
                                    getval.ConvFact = convF;
                                    getval.ProdUOMHd = popUom;
                                    getval.ProdUOM = popUom;
                                    getval.ProdMRQty = '';
                                    getval.declen = decLen;
                                }
                                else {
                                    setfocusval = "0";
                                    alert("Product Id not valid!");
                                    getval.PRODID = '';
                                    getval.PRODNM = '';
                                    getval.TOUOM = '';
                                    getval.ConvFact = '';
                                    getval.ProdUOMHd = '';
                                    getval.ProdUOM = '';
                                    getval.ProdMRQty = '';
                                    getval.declen = '';
                                }

                            },
                        });


                        if (setfocusval == "1") {
                            var itemval = $$("RequestTemplateGrid").getSelectedItem();
                            $$("RequestTemplateGrid").editCell(editor.row, "ProdMRQty", false, true);
                            $$("RequestTemplateGrid").refresh();

                        }
                        else {
                            var itemval = $$("RequestTemplateGrid").getSelectedItem();
                            $$("RequestTemplateGrid").editCell(editor.row, "PRODID", false, true);
                            $$("RequestTemplateGrid").refresh();
                        }
                        this.adjustRowHeight("PRODNM");
                    }
                }
                if (editor.column == 'ProdUOM') {
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        getval.ProdUOMHd = state.value;
                        getval.ProdMRQty = '';
                        getval.ProdUOM = state.value;
                        var reqobj = {};
                        reqobj["REQTYPE"] = "UOMChangeLoadFN";
                        reqobj["prodId"] = getval.PRODID;
                        reqobj["hdnUOM"] = getval.ProdUOMHd;
                        reqobj["ToUOM"] = getval.TOUOM;
                        reqobj["stkInd"] = $("#stkInd").val();
                        reqobj["mrdInd"] = $("#mrdInd").val();
                        reqobj["ddlStore"] = $$("ddlStore").getValue();
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/MaterialCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                debugger;
                                if (d != "") {
                                    data = JSON.parse(d);
                                    getval.ConvFact = data.ConvFact;
                                    getval.declen = data.declen;
                                }
                            },
                        });
                    }
                }
                if (editor.column == 'PRODNM') {
                    debugger;
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        var rowDatap = [];
                        var reqobj = {};
                        var setfocusval = "";
                        reqobj["REQTYPE"] = "ProductOnGrigLoad";
                        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                        reqobj["ddlStore"] = $$("ddlStore").getValue();
                        reqobj["stkInd"] = $("#stkInd").val();
                        reqobj["cirInd"] = $("#cirInd").val();
                        reqobj["mrdInd"] = $("#mrdInd").val();
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        reqobj["matEmulateInd"] = $("#matEmulateInd").val();
                        reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
                        reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
                        reqobj["txtProdIdpop"] = '';
                        reqobj["txtProdNmpop"] = state.value;

                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/MaterialCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                debugger;
                                if (d != "[]") {
                                    setfocusval = "1";
                                    rowDatap = JSON.parse(d);
                                    var ff = rowDatap.length;
                                    var FullData = $$("RequestTemplateGrid").serialize();
                                    var len = FullData.length;
                                    if (len != 1) {
                                        for (i = 0; i < len; i++) {
                                            var itemId = $.trim(FullData[i].PRODID);
                                            if ($.trim(rowDatap[0].PRODID) == itemId && $.trim(FullData[i].id) != editor.row) {
                                                alert("This product already Added!...");
                                                getval.PRODID = '';
                                                getval.PRODNM = '';
                                                getval.TOUOM = '';
                                                getval.ConvFact = '';
                                                getval.ProdUOMHd = '';
                                                getval.ProdUOM = '';
                                                getval.ProdMRQty = '';
                                                getval.declen = '';
                                                var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                                $$("RequestTemplateGrid").editCell(editor.row, "PRODNM", false, true);
                                                $$("RequestTemplateGrid").refresh();
                                                return false;
                                            }
                                        }
                                    }

                                    var prodId = rowDatap[0].PRODID;
                                    var prodNm = rowDatap[0].PRODNM;
                                    var popUom = rowDatap[0].UOM;
                                    var toUom = rowDatap[0].TOUOM;
                                    var convF = rowDatap[0].CONV_FACT_BASE;
                                    var decLen = rowDatap[0].UOMDECLEN;
                                    getval.PRODID = prodId;
                                    getval.PRODNM = prodNm;
                                    getval.TOUOM = toUom;
                                    getval.ConvFact = convF;
                                    getval.ProdUOMHd = popUom;
                                    getval.ProdUOM = popUom;
                                    getval.ProdMRQty = '';
                                    getval.declen = decLen;
                                }
                                else {
                                    setfocusval = "0";
                                    alert("Product Id not valid!");
                                    getval.PRODID = '';
                                    getval.PRODNM = '';
                                    getval.TOUOM = '';
                                    getval.ConvFact = '';
                                    getval.ProdUOMHd = '';
                                    getval.ProdUOM = '';
                                    getval.ProdMRQty = '';
                                    getval.declen = '';
                                }

                            },
                        });


                        if (setfocusval == "1") {
                            var itemval = $$("RequestTemplateGrid").getSelectedItem();
                            $$("RequestTemplateGrid").editCell(editor.row, "ProdMRQty", false, true);
                            $$("RequestTemplateGrid").refresh();

                        }
                        else {
                            var itemval = $$("RequestTemplateGrid").getSelectedItem();
                            $$("RequestTemplateGrid").editCell(editor.row, "PRODNM", false, true);
                            $$("RequestTemplateGrid").refresh();
                        }
                        this.adjustRowHeight("PRODNM");
                    }
                }
                if (editor.column == 'DETAILS') {
                    this.adjustRowHeight("DETAILS");
                }

            },
        }
    });
    $$("RequestGrid").getPager().clone({
        container: "DivProdPage",
        template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}"
    });
    ChangePrperty();
    gridResize("1");
    $("#DELETE").prop('disabled', true);
    fnDisable();
}
function ProdSearchPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 32; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: 'Product Search',
        id: 'ProdSearchPopup',
        modal: true,
        width: 500,
        close: true,
        body: {
            view: 'form',
            width: 500,
            elements: [
                {
                    rows: [
                        {
                            view: 'richselect',
                            label: 'Group',
                            id: 'ddlGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 400,
                            on: {
                                onChange: function () {
                                    FnddlSubGroup();
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: 'richselect',
                            label: 'Sub Group',
                            id: 'ddlSubGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 400,
                            on: {
                                onChange: function () {
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: "datatable",
                            id: "ProdSearchGrid",
                            name: 'ProdSearchGrid',
                            select: 'row',
                            scrollX: false,
                            columns: [
                                     { header: ["Product Id", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' } },
                                      { header: ["Product Name", { content: "textFilter" }], id: "PROD_NM", width: 360, css: { 'text-align': 'left ! important' } },

                            ],
                            editable: true,
                            minWidth: 450,
                            fixedRowHeight: false,
                            rowLineHeight: 28,
                            rowHeight:28,
                            height: 350,
                            data: [],
                            on: {
                                'onItemDblClick': function (id) {
                                    debugger;
                                    var getval = $$("RequestTemplateGrid").getSelectedItem();
                                    var getval1 = this.getItem(id.row);
                                    if (getval1.PROD_ID != "") {
                                        var rowDatap = [];
                                        var reqobj = {};
                                        var setfocusval = "";
                                        reqobj["REQTYPE"] = "ProductOnGrigLoad";
                                        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                                        reqobj["ddlStore"] = $$("ddlStore").getValue();
                                        reqobj["stkInd"] = $("#stkInd").val();
                                        reqobj["cirInd"] = $("#cirInd").val();
                                        reqobj["mrdInd"] = $("#mrdInd").val();
                                        reqobj["Mode_type"] = $("#Mode_type").val();
                                        reqobj["matEmulateInd"] = $("#matEmulateInd").val();
                                        reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
                                        reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
                                        reqobj["txtProdIdpop"] = getval1.PROD_ID;
                                        reqobj["txtProdNmpop"] = '';

                                        var dataparam = JSON.stringify(reqobj);
                                        $.ajax({
                                            async: false,
                                            url: "/MaterialCtrl/MPAPI_CALL",
                                            type: 'POST',
                                            data: "request=" + dataparam,
                                            success: function (d) {
                                                debugger;
                                                if (d != "[]") {
                                                    setfocusval = "1";
                                                    rowDatap = JSON.parse(d);
                                                    var ff = rowDatap.length;
                                                    var FullData = $$("RequestTemplateGrid").serialize();
                                                    var len = FullData.length;
                                                    if (len != 1) {
                                                        for (i = 0; i < len; i++) {
                                                            var itemId = $.trim(FullData[i].PRODID);
                                                            if ($.trim(rowDatap[0].PRODID) == itemId && $.trim(FullData[i].id) != getval.id) {
                                                                alert("This product is already added!...");
                                                                getval.PRODID = '';
                                                                getval.PRODNM = '';
                                                                getval.TOUOM = '';
                                                                getval.ConvFact = '';
                                                                getval.ProdUOMHd = '';
                                                                getval.ProdUOM = '';
                                                                getval.ProdMRQty = '';
                                                                getval.declen = '';
                                                                var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                                                $$("RequestTemplateGrid").editCell(getval.id, "PRODID", false, true);
                                                                $$("RequestTemplateGrid").refresh();
                                                                $$('ProdSearchPopup').hide();
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    var prodId = rowDatap[0].PRODID;
                                                    var prodNm = rowDatap[0].PRODNM;
                                                    var popUom = rowDatap[0].UOM;
                                                    var toUom = rowDatap[0].TOUOM;
                                                    var convF = rowDatap[0].CONV_FACT_BASE;
                                                    var decLen = rowDatap[0].UOMDECLEN;
                                                    getval.PRODID = prodId;
                                                    getval.PRODNM = prodNm;
                                                    getval.TOUOM = toUom;
                                                    getval.ConvFact = convF;
                                                    getval.ProdUOMHd = popUom;
                                                    getval.ProdUOM = popUom;
                                                    getval.ProdMRQty = '';
                                                    getval.declen = decLen;
                                                }
                                                else {
                                                    setfocusval = "0";
                                                    alert("Product Id not valid!");
                                                    getval.PRODID = '';
                                                    getval.PRODNM = '';
                                                    getval.TOUOM = '';
                                                    getval.ConvFact = '';
                                                    getval.ProdUOMHd = '';
                                                    getval.ProdUOM = '';
                                                    getval.ProdMRQty = '';
                                                    getval.declen = '';
                                                }

                                            },
                                        });


                                            var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                            $$("RequestTemplateGrid").editCell(getval.id, "ProdMRQty", false, true);
                                            $$("RequestTemplateGrid").refresh();
                                            $$("RequestTemplateGrid").adjustRowHeight("PRODNM");
                                    }
                                    $$('ProdSearchPopup').hide();
                                }
                            }
                        },
                        {
                            view: 'checkbox',
                            labelRight: 'Word Search',
                            id: 'WordSearchChk',
                            labelWidth: 0,
                            value: 0,
                            width: 300,
                            on: {
                                onChange: function (newValue, oldValue, config) {

                                }
                            }
                        },
                        {
                            view: 'checkbox',
                            labelRight: 'Show 2nd line of Item Description',
                            id: 'Item2LineChk',
                            labelWidth: 0,
                            value: 0,
                            width: 300,
                            on: {
                                onChange: function (newValue, oldValue, config) {
                                    if (newValue == 1) {
                                        $$("ProdSearchGrid").config.rowLineHeight = 20;
                                        $$("ProdSearchGrid").config.css = "wrap";
                                        $$("ProdSearchGrid").config.rowHeight = 40;
                                        $$("ProdSearchGrid").resize();
                                        $$("ProdSearchGrid").refresh();
                                        $$("ProdSearchGrid").adjustRowHeight("PROD_NM");
                                    }
                                    else {
                                        $$("ProdSearchGrid").config.rowLineHeight = 28;
                                        $$("ProdSearchGrid").config.css = "";
                                        $$("ProdSearchGrid").config.rowHeight = 28;
                                        $$("ProdSearchGrid").resize();
                                        $$("ProdSearchGrid").refresh();
                                        $$("ProdSearchGrid").adjustRowHeight("PROD_NM");
                                    }
                                }
                            }
                        },
                        {
                            paddingY: 5,
                            cols: [
                                {},
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    width: 100,
                                    align: "center",
                                    css: 'webix_primary',
                                    on: {
                                        onItemClick: function () {
                                            var getval = $$("RequestTemplateGrid").getSelectedItem();
                                            var getval1 = $$("ProdSearchGrid").getSelectedItem();
                                            if (getval1.PROD_ID != "") {
                                                var rowDatap = [];
                                                var reqobj = {};
                                                var setfocusval = "";
                                                reqobj["REQTYPE"] = "ProductOnGrigLoad";
                                                reqobj["ddlProperty"] = $$("ddlProperty").getValue();
                                                reqobj["ddlStore"] = $$("ddlStore").getValue();
                                                reqobj["stkInd"] = $("#stkInd").val();
                                                reqobj["cirInd"] = $("#cirInd").val();
                                                reqobj["mrdInd"] = $("#mrdInd").val();
                                                reqobj["Mode_type"] = $("#Mode_type").val();
                                                reqobj["matEmulateInd"] = $("#matEmulateInd").val();
                                                reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
                                                reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
                                                reqobj["txtProdIdpop"] = getval1.PROD_ID;
                                                reqobj["txtProdNmpop"] = '';

                                                var dataparam = JSON.stringify(reqobj);
                                                $.ajax({
                                                    async: false,
                                                    url: "/MaterialCtrl/MPAPI_CALL",
                                                    type: 'POST',
                                                    data: "request=" + dataparam,
                                                    success: function (d) {
                                                        debugger;
                                                        if (d != "[]") {
                                                            setfocusval = "1";
                                                            rowDatap = JSON.parse(d);
                                                            var ff = rowDatap.length;
                                                            var FullData = $$("RequestTemplateGrid").serialize();
                                                            var len = FullData.length;
                                                            if (len != 1) {
                                                                for (i = 0; i < len; i++) {
                                                                    var itemId = $.trim(FullData[i].PRODID);
                                                                    if ($.trim(rowDatap[0].PRODID) == itemId && $.trim(FullData[i].id) != getval.id) {
                                                                        alert("This product is already added!...");
                                                                        getval.PRODID = '';
                                                                        getval.PRODNM = '';
                                                                        getval.TOUOM = '';
                                                                        getval.ConvFact = '';
                                                                        getval.ProdUOMHd = '';
                                                                        getval.ProdUOM = '';
                                                                        getval.ProdMRQty = '';
                                                                        getval.declen = '';
                                                                        var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                                                        $$("RequestTemplateGrid").editCell(getval.id, "PRODID", false, true);
                                                                        $$("RequestTemplateGrid").refresh();
                                                                        $$('ProdSearchPopup').hide();
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                            var prodId = rowDatap[0].PRODID;
                                                            var prodNm = rowDatap[0].PRODNM;
                                                            var popUom = rowDatap[0].UOM;
                                                            var toUom = rowDatap[0].TOUOM;
                                                            var convF = rowDatap[0].CONV_FACT_BASE;
                                                            var decLen = rowDatap[0].UOMDECLEN;
                                                            getval.PRODID = prodId;
                                                            getval.PRODNM = prodNm;
                                                            getval.TOUOM = toUom;
                                                            getval.ConvFact = convF;
                                                            getval.ProdUOMHd = popUom;
                                                            getval.ProdUOM = popUom;
                                                            getval.ProdMRQty = '';
                                                            getval.declen = decLen;
                                                        }
                                                        else {
                                                            setfocusval = "0";
                                                            alert("Product Id not valid!");
                                                            getval.PRODID = '';
                                                            getval.PRODNM = '';
                                                            getval.TOUOM = '';
                                                            getval.ConvFact = '';
                                                            getval.ProdUOMHd = '';
                                                            getval.ProdUOM = '';
                                                            getval.ProdMRQty = '';
                                                            getval.declen = '';
                                                        }

                                                    },
                                                });


                                                var itemval = $$("RequestTemplateGrid").getSelectedItem();
                                                $$("RequestTemplateGrid").editCell(getval.id, "ProdMRQty", false, true);
                                                $$("RequestTemplateGrid").refresh();
                                               
                                            }
                                            $$('ProdSearchPopup').hide();

                                        }
                                    }
                                },
                               {
                                   view: 'button',
                                   label: 'Cancel',
                                   width: 100,
                                   align: "center",
                                   css: 'webix_primary',
                                   on: {
                                       onItemClick: function () {
                                           $$('ProdSearchPopup').hide();
                                       }
                                   }
                               }
                            ]
                        },
                    ]
                }
            ]
        }
    }).show();
    FnddlGroup();
    FnddlSubGroup();
    FnProductSearchLoad();
}
function HDClr(value, config) {
    if (config.INACTIVE_IND == "Active") {
        return "Greencolor";
    }
    else
        return "redcolor";
}
function AddRequestTemplateRow() {
    debugger;
    var data = $$("RequestTemplateGrid").serialize();
    var lenval = data.length;
    var indx = "";
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            debugger;
            indx = i;
            if (data[i].PRODID == "" && data[i].PRODNM == "") {
                alert("Product should be selected");
                return false;
            }

        }
        var addrow = {
            PRODID: '', PRODNM: ''
        };

        $$("RequestTemplateGrid").add(addrow);
        $$("RequestTemplateGrid").select($$("RequestTemplateGrid").getLastId());
        webix.UIManager.setFocus($$("RequestTemplateGrid"));
        var itemval = $$("RequestTemplateGrid").getSelectedItem();
        $$("RequestTemplateGrid").editCell(itemval.id, "PRODID", false, true);
        $$("RequestTemplateGrid").refresh();
    }
    else {
        var addrow = {
            PRODID: '', PRODNM: ''
        };
        $$("RequestTemplateGrid").add(addrow);
        $$("RequestTemplateGrid").select($$("RequestTemplateGrid").getLastId());
        webix.UIManager.setFocus($$("RequestTemplateGrid"));
        var itemval = $$("RequestTemplateGrid").getSelectedItem();
        $$("RequestTemplateGrid").editCell(itemval.id, "PRODID", false, true);
        $$("RequestTemplateGrid").refresh();
    }

};
function fnLoadStoreDef(mode) {
    //debugger;

    var response = "";
    var reqobj = {};
    if (mode == "fnvalid")
        reqobj["REQTYPE"] = "FnDefultLoad";
    else if (mode == "store") {
        reqobj["REQTYPE"] = "DDlStoreLoad";
        reqobj["User_Privld_Ind"] = $("#User_Privld_Ind").val();
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    }

    else if (mode == "storeId") {
        reqobj["REQTYPE"] = "FnStoreidLoad";
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
        reqobj["ddlStore"] = $$("ddlStore").getValue();
        $("#hdnStoreId").val($$("ddlStore").getValue());
    }
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            response = JSON.parse(d);
            if (mode == "store") {
                // $$("ddlStore").clearAll();
                $$("ddlStore").data.options = response;
                $$("ddlStore").refresh();
            }
            else if (mode == "fnvalid") {
                var ithInd = response.ithInd;
                $("#mrdInd").val(response.mrdInd);
                $("#cirInd").val(response.cirInd);
                $("#matEmulateInd").val(response.matEmulateInd);
                $("#costLinkDept").val(response.costLinkDept);
                $("#vUserDeptInd").val(response.vUserDeptIND);
                $("#User_Privld_Ind").val(response.User_Privld_Ind);

                if ($("#costLinkDept").val() == "")
                    $("#costLinkDept").val("0");
                
            }
            else if (mode == "storeId") {
                fnLoadStoreId(response);
            }
        },
    });
}
function fnLoadStoreId(res) {
    debugger;
    $("#mrCcHeaderInd").val($.trim(res.mrCcHeaderInd));
    $("#departApplInd").val($.trim(res.departApplInd));
    $("#ccApplInd").val($.trim(res.ccApplInd));
    $("#aInd").val($.trim(res.aInd));
    $("#dInd").val($.trim(res.dInd));
    $("#unitId").val($.trim(res.unitId));
    $("#altUomApplInd").val($.trim(res.altUomApplInd));
    $("#cStoreId").val($.trim(res.cStoreId));
    $("#prodGrApplInd").val($.trim(res.prodGrApplInd));
    $("#sameItemApplInd").val($.trim(res.sameItemApplInd));
    $("#stkInd").val($.trim(res.stkInd));
    $("#projApplInd").val($.trim(res.prjApplInd));
    $("#machineApplInd").val($.trim(res.machineItemApplInd));
    $("#cb2Ind").val($.trim(res.cb2Ind));
    $("#iA1Ind").val($.trim(res.iA1Ind));
    $("#requireBef").val($.trim(res.requireBef));
    $("#requireCur").val($.trim(res.requireCur));
    $("#E1_IND").val($.trim(res.E1_IND));

}
function ChangePrperty() {

    fnLoadStoreDef("fnvalid");

    fnLoadStoreDef("store");

    // fnLoadStoreDef("storeId");
}

function CleraGridValue() {
    $$("RequestTemplateGrid").clearAll();
    $$("RequestTemplateGrid").refresh();
}
function LoadHideGridColumns() {
    debugger;
  
    if ($("#machineApplInd").val() == "1") {
        $$("RequestTemplateGrid").showColumn('ASSET');
    }
    else {
        $$("RequestTemplateGrid").hideColumn('ASSET');
    }
    if ($("#ccApplInd").val() != "0") {
        $$("CostCenterDDL").show();
    }
    else {
        $$("CostCenterDDL").hide();
    }
    
  
}
function DDLStoreCgangefn() {
    var reqobj = {};
    reqobj["REQTYPE"] = "FnStoreidLoad";
    reqobj["iA1Ind"] = $("#iA1Ind").val();
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            fnLoadStoreId(rowDatad);
        },
    });
}
function FnddlCostcenter() {
    debugger;
    $("#hdnShowCC").val("0");
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlCostCenterLoad";
    reqobj["deptInd"] = $("#vUserDeptInd").val();
    reqobj["costLinkDept"] = $("#costLinkDept").val() == "" ? "0" : $("#costLinkDept").val();
    reqobj["store"] = $$("ddlStore").getValue();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["ccApplInd"] = $("#ccApplInd").val() == "" ? "0" : $("#ccApplInd").val();
    reqobj["MRCCHeader"] = $("#mrCcHeaderInd").val() == "" ? "0" : $("#mrCcHeaderInd").val();
    reqobj["matEmulateInd"] = $("#matEmulateInd").val() == "" ? "0" : $("#matEmulateInd").val();
   
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("CostCenterDDL").define("options", rowDatad);
            $$("CostCenterDDL").refresh();
        },
    });
}
function FnddlMRTemplate() {
    debugger;
  
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnddlMRTemplate";
    reqobj["store"] = $$("ddlStore").getValue();
    reqobj["ccApplInd"] = $("#ccApplInd").val() == "" ? "0" : $("#ccApplInd").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("TemplateNameDDL").define("options", rowDatad);
            $$("TemplateNameDDL").refresh();
        },
    });
}
function ListProductIdLoad() {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductIdLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["stkInd"] = $("#stkInd").val();
    reqobj["cirInd"] = $("#cirInd").val();
    reqobj["mrdInd"] = $("#mrdInd").val();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["matEmulateInd"] = $("#matEmulateInd").val();
    reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
    reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatap = JSON.parse(d);
                $$("RequestTemplateGrid").getColumnConfig("PRODID").suggest = rowDatap;
                $$("RequestTemplateGrid").refresh();
            }
            

        },
    });
    
}
function ListProductNameLoad() {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductNameLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["stkInd"] = $("#stkInd").val();
    reqobj["cirInd"] = $("#cirInd").val();
    reqobj["mrdInd"] = $("#mrdInd").val();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["matEmulateInd"] = $("#matEmulateInd").val();
    reqobj["prodGrApplInd"] = $("#prodGrApplInd").val();
    reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatap = JSON.parse(d);
                $$("RequestTemplateGrid").getColumnConfig("PRODNM").suggest = rowDatap;
                $$("RequestTemplateGrid").refresh();
            }
            

        },
    });
    
}
function OpenMRTLoad() {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "OpenMRTLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["Tmplt_No"] = $$("TemplateNameDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatap = JSON.parse(d);
                if (rowDatap.MRTDt.length > 0) {
                    $$("Narration").setValue(rowDatap.MRTDt[0].NARRATION);
                    
                }
                if (rowDatap.PRODdt.length > 0) {
                    var SetVal = [];
                    $$("CostCenterDDL").setValue($.trim(rowDatap.PRODdt[0].COST_ID));
                    for (i = 0; i < rowDatap.PRODdt.length; i++) {
                        var getval = {};
                        var prodId = rowDatap.PRODdt[i].PRODID;
                        var prodNm = rowDatap.PRODdt[i].PRODNM;
                        var popUom = rowDatap.PRODdt[i].UOM;
                        var toUom = rowDatap.PRODdt[i].TOUOM;
                        var convF = rowDatap.PRODdt[i].CONV_FACT_BASE;
                        var decLen = rowDatap.PRODdt[i].UOMDECLEN;
                        var ProdMRQty = rowDatap.PRODdt[i].MR_QTY;
                        getval.PRODID = prodId;
                        getval.PRODNM = prodNm;
                        getval.TOUOM = toUom;
                        getval.ConvFact = parseFloat(convF).toFixed(decLen);;
                        getval.ProdUOMHd = popUom;
                        getval.ProdUOM = popUom;
                        getval.ProdMRQty = parseFloat(ProdMRQty).toFixed(decLen);
                        getval.declen = decLen;
                        SetVal.push(getval);
                    }
                    $$("RequestTemplateGrid").clearAll();
                    $$("RequestTemplateGrid").parse(SetVal);
                }
            }


        },
    });

} 
function SaveMRTFN() {
    var rowDatap = [];
    $$("RequestTemplateGrid").editStop();
    $$("RequestTemplateGrid").editCancel();
    var FullData = $$("RequestTemplateGrid").serialize();
    var len = FullData.length;
    if (len == 0) {
        alert('Details is empty');
        return false;
    }
    for (i = 0; i < len; i++) {
        var itemId = $.trim(FullData[i].PRODID);
        var mrQty = $.trim(FullData[i].ProdMRQty);
       
        if (itemId == "") {
            alert("Prod Id is Empty");
            $$("RequestTemplateGrid").select(FullData[i].id, "PRODID", false);
            webix.UIManager.setFocus($$("RequestTemplateGrid"));
            $$("RequestTemplateGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
            $$("RequestTemplateGrid").editCancel();
            return false;
        }
        if ($.trim(FullData[i].ProdUOM) == "") {
            alert("UOM is Empty");
            $$("RequestTemplateGrid").select(FullData[i].id, "ProdUOM", false);
            webix.UIManager.setFocus($$("RequestTemplateGrid"));
            $$("RequestTemplateGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
            $$("RequestTemplateGrid").editCancel();
            return false;
        }
        if (mrQty == "" || parseFloat(mrQty) <= 0) {
            alert("MR Qty should be valid");
            $$("RequestTemplateGrid").select(FullData[i].id, "ProdMRQty", false);
            webix.UIManager.setFocus($$("RequestTemplateGrid"));
            $$("RequestTemplateGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
            return false;
        }
       
        
       
      
        if ($("#sameItemApplInd").val() == "1") {
            for (j = 0; j < len; j++) {
                if (i != j) {
                    if (FullData[i].ProdId == FullData[j].ProdId) {
                        alert("Item Duplicate Prod_Id " + FullData[i].ProdId);
                        $$("RequestTemplateGrid").select(FullData[i].id, "ProdMRQty", false);
                        webix.UIManager.setFocus($$("RequestTemplateGrid"));
                        $$("RequestTemplateGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                        $$("RequestTemplateGrid").editCancel();
                        return false;
                    }
                }
            }
        }
       
        
    }
    FullData = JSON.stringify(FullData);
    var stroe = $$("ddlStore").getValue();
    if (stroe == "") {
        alert('Store should be selected');
        $("#ddlStore").focus();
        return false;
    }
    if ($("#Mode_type").val() == "NEW") {
        var TemplateNameTxt = $$("TemplateNameTxt").getValue();
        if (TemplateNameTxt == "") {
            alert('Template Name should be selected');
            $("#TemplateNameTxt").focus();
            return false;
        }
    }
    if ($("#ccApplInd").val() != "0") {
        var CostCenterDDL = $$("CostCenterDDL").getValue();
        if (CostCenterDDL == "") {
            alert('Cost Center should be selected');
            $("#CostCenterDDL").focus();
            return false;
        }
    }
    var reqobj = {};
    reqobj["REQTYPE"] = "SaveMRTFN";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["TemplateName"] = $$("TemplateNameTxt").getValue();
    reqobj["TemplateNameDDL"] = $$("TemplateNameDDL").getValue();
    reqobj["Narration"] = $$("Narration").getValue();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["CostCenter"] = $$("CostCenterDDL").getValue();
    reqobj["FullData"] = FullData;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatap = JSON.parse(d);
                if (rowDatap.OUTPUT == "SUCCESS") {
                    alert("Saved Successfully!...");
                    fnRefresh();
                }
                else {
                    alert(rowDatap.OUTPUT);
                }
            }
        },
    });

}
function fnNew() {
    fnRefresh();
    fnEnable();
    $$("TemplateNameDDL").hide();
    $$("TemplateNameTxt").show();
    $("#NEW").prop('disabled', false);
    $("#OPEN").prop('disabled', true);
    $("#VIEW").prop('disabled', true);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("NEW");
    $$("RequestTemplateGrid").enable();
    $$("RequestTemplateAdd_Btn").enable();
    $$("Narration").enable();
    $$("CostCenterDDL").enable();
    $$("TemplateNameTxt").enable();
}
function fnOpen() {
    fnRefresh();
    fnEnable();
    $$("TemplateNameDDL").show();
    $$("TemplateNameTxt").hide();
    $$("RequestTemplateGrid").enable();
    $$("RequestTemplateAdd_Btn").enable();
    $("#NEW").prop('disabled', true);
    $("#OPEN").prop('disabled', false);
    $("#VIEW").prop('disabled', true);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("OPEN");
    $$("Narration").enable();
    $$("CostCenterDDL").enable();
    $$("TemplateNameTxt").enable();
}
function fnView() {
    fnRefresh();
    fnEnable();
    $$("ddlStore").enable();
    $$("Narration").disable();
    $$("CostCenterDDL").disable();
    $$("TemplateNameTxt").disable();
    $$("TemplateNameDDL").enable();
    $$("TemplateNameDDL").show();
    $$("TemplateNameTxt").hide();
    $$("RequestTemplateGrid").disable();
    $$("RequestTemplateAdd_Btn").disable();
    $("#NEW").prop('disabled', true);
    $("#OPEN").prop('disabled', true);
    $("#VIEW").prop('disabled', false);
    $("#DELETE").prop('disabled', false);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', true);
    $("#Mode_type").val("VIEW");
}
function fnDelete() {
    if ($$("TemplateNameDDL").getValue() != "") {
        $$("RequestTemplateGrid").editStop();
        $$("RequestTemplateGrid").editCancel();
        webix.confirm({
            title: "Confirmation !",
            ok: "Yes", cancel: "No",
            text: "Are you sure to Delete this Template !"
        })
      .then(function () {
          var reqobj = {};
          reqobj["REQTYPE"] = "DeleteMRTFN";
          reqobj["ddlProperty"] = $$("ddlProperty").getValue();
          reqobj["ddlStore"] = $$("ddlStore").getValue();
          reqobj["TemplateNameDDL"] = $$("TemplateNameDDL").getValue();
          reqobj["Narration"] = $$("Narration").getValue();
          var dataparam = JSON.stringify(reqobj);
          $.ajax({
              async: false,
              url: "/MaterialCtrl/MPAPI_CALL",
              type: 'POST',
              data: "request=" + dataparam,
              success: function (d) {
                  debugger;
                  if (d != "") {
                      rowDatap = JSON.parse(d);
                      if (rowDatap.OUTPUT == "SUCCESS") {
                          alert("Template Deleted!...");
                          fnRefresh();
                      }
                      else {
                          alert(rowDatap.OUTPUT);
                      }
                  }
              },
          });
      })
      .fail(function () {

      });
    }
}
function fnRefresh() {
    fnDisable();
    $$("ddlStore").setValue('');
    $$("Narration").setValue('');
    $$("CostCenterDDL").setValue('');
    $$("TemplateNameTxt").setValue('');
    $$("TemplateNameDDL").setValue('');
    $$("RequestTemplateGrid").editCancel();
    $$("RequestTemplateGrid").editStop();
    $$("RequestTemplateGrid").clearAll();
    $$("TemplateNameDDL").hide();
    $$("TemplateNameTxt").show();
    $("#NEW").prop('disabled', false);
    $("#OPEN").prop('disabled', false);
    $("#VIEW").prop('disabled', false);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("");
}
function FnddlGroup() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlGroupLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["prodGrApplInd"] = $("#prodGrApplInd").val() == "" ? "0" : $("#prodGrApplInd").val();
    reqobj["PrdGrpUsrRst"] = $("#prdGrpUsrRst").val() == "" ? "0" : $("#prdGrpUsrRst").val();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("ddlGroup").define("options", rowDatad);
            $$("ddlGroup").refresh();
        },
    });
}
function FnProductSearchLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnProductSearchLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    reqobj["ddlSubGroup"] = $$("ddlSubGroup").getValue();
    reqobj["prodGrApplInd"] = $("#prodGrApplInd").val() == "" ? "0" : $("#prodGrApplInd").val();
    reqobj["PrdGrpUsrRst"] = $("#prdGrpUsrRst").val() == "" ? "0" : $("#prdGrpUsrRst").val();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("ProdSearchGrid").clearAll();
            $$("ProdSearchGrid").parse(rowDatad);
            $$("ProdSearchGrid").refresh();
        },
    });
}
function FnddlSubGroup() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlSubGroupLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MaterialCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("ddlSubGroup").define("options", rowDatad);
            $$("ddlSubGroup").refresh();
        },
    });
}
function fnEnable() {
    $$("CostCenterDDL").enable();
    $$("TemplateNameTxt").enable();
    $$("TemplateNameDDL").enable();
    $$("Narration").enable();
    $$("RequestTemplateGrid").enable();
    $$("RequestTemplateAdd_Btn").enable();
    $$("ddlStore").enable();
}
function fnresize() {
    $$("StatusDDL").resize();
    $$("UnitDDL").resize();
    $$("ddlProperty").resize();
    $$("RequestGrid").resize();
    
}
function fnDisable() {
    $$("CostCenterDDL").disable();
    $$("TemplateNameTxt").disable();
    $$("TemplateNameDDL").disable();
    $$("Narration").disable();
    $$("RequestTemplateGrid").disable();
    $$("RequestTemplateAdd_Btn").disable();
    $$("ddlStore").disable();
}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vheight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
    var offsetTop = $$("RequestGrid").getNode().offsetTop;

    $$("RequestGrid").define("height", ((vheight - offsetTop - 350)));
    $$("RequestGrid").adjust();
   
    
}
