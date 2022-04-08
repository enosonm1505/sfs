var wid_35 = ((screen.width - 100) * 0.35);
var wid_30 = ((screen.width - 100) * 0.30);
var wid_20 = ((screen.width - 100) * 0.20);
var wid_18 = ((screen.width - 100) * 0.18);
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
var wid_3 = ((screen.width - 100) * 0.03);
var wid_2 = ((screen.width - 100) * 0.02);

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
   
    var ddlId = ['ddlProperty', 'ddlUOM'];
    var DDLVal = DropdownLoad(ddlId);
    var types = DDLVal.ddlUOM;
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
                //  SRNOLoadFn();
            }
        }
    });

    webix.ui({
        container: "DivPono",
        view: 'text',
        label: 'PO No',
        id: 'ddlPono',
        gravity: 1,
        labelWidth: 70,
        inputWidth: 200,
        options: [],
    });

    webix.ui({
        container: "DivUnit",
        view: 'richselect',
        id: 'UnitDDL',
        value: '',
        options: [],
        maxWidth: 400,
        on: {
            onChange: function () {
                // SRNOLoadFn();
            }
        }
    });
    var datefm = new Date();
    webix.ui({
        container: "divPodate",
        view: "datepicker",
        label: 'Po Date',
        labelWidth: 70,
        inputWidth: 200,
        id: "Podate",
        stringResult: true,
        value: datefm,
        format: "%d/%m/%Y",
    });

    
    webix.ui({
        container: "DivBasicDDl",
        view: 'richselect',
        label: 'Basis :',
        id: 'BasisDDL',
        labelWidth: 70,
        value: 'G',
        inputWidth: 200,
        options: [{ 'id': 'G', 'value': 'Goods' }, { 'id': 'S', 'value': 'Services' }],
        on: {
            onChange: function () {
               
            }
        }
    });
    webix.ui({
        container: "DivPOType",
        view: 'richselect',
        label: 'PO Type',
        id: 'POTypeDDL',
        value: '',
        options: [],
        labelWidth: 70,
        //inputWidth: 260,
        gravity: 1,
        on: {
            onChange: function () {
                DDlPOTypeChangeOrder();
                DDlPOTypeChangeOrder1();
                DDlVendorOrder();
                TaxCodeColumnLoad();
            }
        }
       
    });

    webix.ui({
        container: "divVendor",
        view: "combo",
        label: 'Vendor',
        labelWidth: 70,
        // inputWidth: 260,
        id: "DDLVendor",
        gravity: 1,
        on: {
            onChange: function () {
                VendorOrderChange();
            }
        }
    });

    webix.ui({
        container: "DivStatus",
        view: "text",
        label: 'Status',
        maxWidth: 400,
        labelPosition: "left",
        id: "StatusDDL",
    });
    webix.ui({
        container: "divGRvalue",
        view: "text",
        label: 'Gross Value',
        maxWidth: 400,
        id: "ddlgrvalue",
    });
    webix.ui({
        container: "divTax",
        view: "text",
        label: 'Tax',
        maxWidth: 400,
        id: "ddltax",
    });
    webix.ui({
        container: "divCharges",
        view: "text",
        label: 'Charges',
        maxWidth: 400,
        id: "ddlcharges",
        options: [],
    });
    webix.ui({
        container: "divValue",
        view: "text",
        label: 'Value',
        maxWidth: 400,
        inputWidth: 200,
        id: "ddlvalue",
    });
    webix.ui({
        container: "divCurrency",
        view: "combo",
        label: 'Currency',
        maxWidth: 400,
        id: "DDLCurrency",
        options: [],
    });
    webix.ui({
        container: "divresle",
        css: "mp_acticonbtn",
        view: "button",       
        type: "htmlbutton",      
        label: "<span class='fas fa-clipboard-check'>",       
        //label: "Mail",
        click: function () { fnprabtnPopup(); }
    });
    webix.ui({

        container: "DivAddBtnPO",
        view: "button",
        type: "htmlbutton",
        label: "<span class='fas fa-plus'>",
        id: 'POAdd_Btn',
        css: "mp_iconbtn",
        align: "right",
        on: {
            onItemClick: function () {
                AddPRTFN()
            }
        }
    });
    webix.ui({
        container: "DivDeleteBtnPO",
        view: "button",
        type: "htmlbutton",
        css: "mp_iconbtn",
        id: 'PODelete_Btn',
        label: "<span class='fas fa-trash'>",
        on: {
            onItemClick: function () {
                $$("POOrderGrid").editStop();
                $$("POOrderGrid").editCancel();
                var getval = $$("POOrderGrid").getSelectedItem();
                if (getval.Modetype == "OPEN") {
                    webix.confirm({
                        title: "Confirmation !",
                        ok: "Yes", cancel: "No",
                        text: "Are you sure to Delete this line Item !"
                    })
                  .then(function () {

                      getval.ModeDelete = '1';
                      getval.$css = "highlight";
                      $$("POOrderGrid").refresh();
                      $$("POOrderGrid").unselectAll();
                      var data = $$("POOrderGrid").serialize();
                      var lenval = data.length;
                      totMrVal = 0;
                      var totMrQty = 0;
                      if (lenval != 0) {
                          for (i = 0; i < lenval; i++) {
                              if (data[i].ProdId != "" && data[i].ModeDelete != 1) {
                                  var mrQty1 = data[i].ProdMRQty;
                                  var rate1 = data[i].ProdRate;
                                  var totMrQty1 = (mrQty1) * (rate1);
                                  totMrVal = (totMrVal) + (totMrQty1);
                              }
                          }
                      }
                      $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                      $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                  })
                    .fail(function () {

                    });
                }
                else {
                    getval.ModeDelete = '0';
                    $$("POOrderGrid").editCancel();
                    $$("POOrderGrid").remove($$("POOrderGrid").getSelectedId());
                    $$("POOrderGrid").refresh();
                    var data = $$("POOrderGrid").serialize();
                    var lenval = data.length;
                    totMrVal = 0;
                    var totMrQty = 0;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].ProdId != "") {
                                var mrQty1 = data[i].ProdMRQty;
                                var rate1 = data[i].ProdRate;
                                var totMrQty1 = (mrQty1) * (rate1);
                                totMrVal = (totMrVal) + (totMrQty1);
                            }
                        }
                    }
                    $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                    $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                }
            }
        }
    });
    
 
    webix.ui({
        container: "divprname111",
        view: "text",
        label: 'Name',
        maxWidth: 500,
        id: "",       
    });
    webix.ui({
        container: "divUom111",
        view: "text",
        label: 'UOM',
        maxWidth: 250,
        id: "",       
    });
   
    webix.ui({
        container: "DivVATPO",
        view: "switch", value: 0, id: 'VATPOChk', label: "VAT PO", labelWidth: 80, css: 'mt-1',hidden:true,
    });
    var ProIDFilter = {
        view: "suggest",
        data: [],
        id: 'ProdIdFilter',
        //css:'FilterProd',
        width: 150,
        height: 200,
        body: {
            dataFeed: function (text) {
                if (text.length > 2) {
                    return ListProductIdLoad(text);
                }
                else {
                    return [];
                }
            }
        }
    };
    var ProNMFilter = {
        view: "suggest",
        data: [],
        id: 'ProdNmFilter',
        //css: 'FilterProd',
        width: 150,
        height: 200,
        body: {
            dataFeed: function (text) {
                if (text.length > 2) {
                    return ListProductNameLoad(text);
                }
                else {
                    return [];
                }
                
            }
        }
    };
        webix.ui({
            container: "DivOrderGrid",
        view: "datatable",
        id: "POOrderGrid",
        name: 'POOrderGrid',
        select: 'row',
        scrollX: true,      
        columns: [                       
                             { header: "SNo", id: "SNRO", css: { 'text-align': 'center ! important' }, width: wid_3, },
                             { header: "Inp By", id: "ITEMCAT", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "combo", options: [{ 'id': '1', 'value': 'Item' }, { 'id': '2', 'value': 'Category' }], },
                             { header: "ID / Category", id: "PRODID", width: wid_7, editor: "text", css: { 'text-align': 'center ! important' }, editor: "text",suggest: ProIDFilter },
                             { header: "Prod Name", id: "PRODNM", css: { 'text-align': 'center ! important' }, width: wid_18, editor: "text", suggest: ProNMFilter },
                             { header: "", id: "PRODSRCHMODE", css: 'SearchBtnPO', width: wid_2, template: SearchIcon, },
                             { header: "Details", id: "DETAILS", css: { 'text-align': 'center ! important' }, width: wid_7, editor: "popup", },
                             { header: "Line Ty", id: "LINETYPE", css: { 'text-align': 'center ! important' }, width: wid_5, hidden: true, editor: "richselect", options: [{ 'id': 'Q', 'value': 'Qty' }, { 'id': 'F', 'value': 'Fixed Amount' }] },
                             { header: "UOM", id: "ProdUOM", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "richselect", options: types },
                             { header: "Qty", id: "ProdMRQty", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "text", liveEdit: true, numberFormat: "1.00", },
                             { header: "Rate", id: "ProdRate", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "text", liveEdit: true, numberFormat: "1.00", },
                             { header: "Rate Source ", id: "RateSource", css: { 'text-align': 'left ! important' }, width: wid_6, hidden: true, },
                             { header: "Disc %", id: "DiscPer", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "text", liveEdit: true, numberFormat: "1.00", },
                             { header: "Disc Rate", id: "DiscRate", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "text", liveEdit: true, numberFormat: "1.00", },
                             { header: "Value", id: "Amount", css: { 'text-align': 'left ! important' }, width: wid_5, numberFormat: "1.00", },
                             { header: "Tax Code", id: "TaxCode", css: { 'text-align': 'center ! important' }, width: wid_5, editor: "richselect", options: [], hidden: true, },
                             { header: "To UOM", id: "TOUOM", width: wid_8, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "ProdUOMHd", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "declen", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "Modetype", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "STATUS_IND", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "ModeDelete", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "INDENT_TRN_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "INDENT_PROD_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "PROD_SNO", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "PROD_GR_ID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "UOM_NAME", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "TOT_PO_UNIT", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "TOT_RECPT_UNIT", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "K_INDENT_PROD_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: " ", id: "Change_Ind", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                             { header: "h13", id: "AvgRate", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, numberFormat: "1.00", },
                             { header: "Conv Factor", id: "ConvFact", width: wid_8, editor: "text", css: { 'text-align': 'right ! important' }, hidden: true, },
                            
                           
        ],
        editable: true,
        ready: function () {
        },
        scheme: {
            $change: function (item) {
              
            }
        },
        css: "wrap",
        data: [],
        on: {
            onLiveEdit: function (state, editor) {
                //AlertMessage("1");

                var getval = this.getItem(editor.row);
                if (editor.column == "DiscPer") {
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var Rate = getval.ProdRate;
                            var ProdMRQty = getval.ProdMRQty;
                            var DiscRate = Rate * ProdMRQty * state.value / 100;
                            getval.DiscRate = parseFloat(DiscRate).toFixed(getval.declen);
                            var Amtval = Rate * ProdMRQty - DiscRate;
                            getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.DiscPer = parseFloat(state.value).toFixed(2);
                                    this.refresh();
                                }
                            }
                            
                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                        }
                    }
                }
                if (editor.column == "DiscRate") {
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var Rate = getval.ProdRate;
                            var ProdMRQty = getval.ProdMRQty;
                            var Amtval = (Rate * ProdMRQty) - state.value;
                            getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscRate = parseFloat(state.value).toFixed(2);
                                    this.refresh();
                                }
                            }

                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                        }
                    }
                }

                if (editor.column == "ProdMRQty") {
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var rate = getval.ProdRate;
                            var DiscRate = getval.DiscRate;
                            var Amtval = (rate * state.value) - DiscRate;
                            getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);;
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);

                                    this.refresh();
                                    var data = this.serialize();
                                    var lenval = data.length;
                                    var totMrQty = 0;
                                    totMrVal = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {

                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                }
                                else {
                                    getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);;
                                }
                            }
                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);;
                        }
                    }

                }
                if (editor.column == 'ProdRate') {

                    if (state.value != state.old) {
                        var getval = this.getItem(editor.row);

                        if (isNaN(state.value) == true) {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                if (parseInt(state.value) == 0) {
                                    getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                    getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                                }
                                else {
                                    var totMrQty = ((state.value) * (getval.ProdMRQty)) - (getval.DiscRate);
                                    getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                    getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                                    this.refresh();
                                    var data = this.serialize();
                                    var lenval = data.length;
                                    totMrVal = 0;
                                    var totMrQty = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {

                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                }
                            }
                            else {

                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            if (parseInt(state.value) == 0) {
                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else {
                                var totMrQty = ((state.value) * (getval.ProdMRQty)) - (getval.DiscRate);
                                getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                var totMrQty = 0;
                                totMrVal = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {

                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                        }
                    }
                }
            },
            'onKeyPress': function (e) {
                // 
                if (e == '40') {
                    var nodeid = $$("POOrderGrid").getSelectedId(true);
                    var lastid = $$("POOrderGrid").getLastId();
                    if (nodeid[0].row == lastid) {
                        AddRequestTemplateRow();
                    }
                }
            },
            'onCheck': function (row, col, val) {
                var getval = this.getItem(row);
                if (col == "CHECKIND") {
                    if ((getval.Modetype == "OPEN" && getval.ModeDelete == 1) || getval.STATUS_IND == 5 || getval.STATUS_IND == 6 || getval.STATUS_IND == 8 || getval.STATUS_IND == 9) {
                        this.blockEvent();
                        getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                        this.updateItem(row, getval);
                        this.unblockEvent();
                        return false;
                    }
                    if ($$("Shortclose").getValue() == 1) {
                        if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && (getval.TOT_PO_UNIT > 0 || getval.TOT_RECPT_UNIT > 0)) {

                        }
                        else {
                            this.blockEvent();
                            getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                            this.updateItem(row, getval);
                            this.unblockEvent();
                            return false;
                        }
                    }
                    else if ($$("CancelReq").getValue() == "1") {
                        if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && getval.TOT_PO_UNIT == 0 && getval.TOT_RECPT_UNIT == 0) {

                        }
                        else {
                            this.blockEvent();
                            getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                            this.updateItem(row, getval);
                            this.unblockEvent();
                            return false;
                        }
                    }
                }
            },
            'onBeforeEditStart': function (id) {
                var getval = this.getItem(id.row);
                if ((getval.Modetype == "OPEN" && getval.ModeDelete == 1) || getval.STATUS_IND == 5 || getval.STATUS_IND == 6 || getval.STATUS_IND == 8 || getval.STATUS_IND == 9) {
                    this.unselectAll();
                    return false;
                }
                if (getval.Modetype == "OPEN" && getval.K_INDENT_PROD_UID != "") {
                    getval.$css = "GrayClr";
                    this.unselectAll();
                    return false;
                }
                if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2) {

                    if ($("#N1_IND").val() != "1") {
                        getval.$css = "GrayClr";
                        this.unselectAll();
                        return false;
                    }
                    else {
                        if (getval.TOT_PO_UNIT > 0 && getval.TOT_RECPT_UNIT > 0) {
                            getval.$css = "GrayClr";
                            this.unselectAll();
                            return false;
                        }
                    }
                }

                if (id.column == 'CHECKIND') {
                    if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && (getval.TOT_PO_UNIT > 0 || getval.TOT_RECPT_UNIT > 0)) {
                        if ($$('ShortCloseChk').getValue() == 2) {

                        }
                        else {
                            this.unselectAll();
                            return false;
                        }
                    }
                    else if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && getval.TOT_PO_UNIT == 0 && getval.TOT_RECPT_UNIT == 0) {
                        if ($$('CancelChk').getValue() == 2) {

                        }
                        else {
                            this.unselectAll();
                            return false;
                        }
                    }
                    else {
                        this.unselectAll();
                        return false;
                    }
                }
                if (id.column == 'ProdUOM') {

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
                        url: "/PurchaseCtrl/MPAPI_CALL",
                        type: 'POST',
                        data: "request=" + dataparam1,
                        success: function (d) {

                            if (d != "[]") {

                                Options.clearAll();
                                UOMHd = JSON.parse(d);
                                UOMHd.push({ id: getval.ProdUOMHd, value: getval.ProdUOMHd });
                                Options.parse(UOMHd);
                            }
                            else {
                                Options.clearAll();
                                UOMSTR = { id: getval.ProdUOMHd, value: getval.ProdUOMHd };
                                Options.parse(UOMSTR);
                            }
                        },
                    });
                    return true;
                }

                else if (id.column == 'ProdMRQty') {

                    if ($("#Mode_type").val() != "VIEW") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (id.column == 'PRODID') {
                    $('#ProdIdVal').text('');
                    $('#ProdNameVal').text('');
                    $('#ProdUOMVal').text('');
                }
                else if (id.column == 'PRODNM') {
                    $('#ProdIdVal').text('');
                    $('#ProdNameVal').text('');
                    $('#ProdUOMVal').text('');
                }
            },
            'onAfterEditStart': function (id) {
                if (id.column == 'ProdUOM') {
                    var Options = this.getColumnConfig("ProdUOM").collection;
                    Options.clearAll();
                    UOMSTR = types;
                    Options.parse(UOMSTR);
                    $$("POOrderGrid").refresh();
                    return true;
                }
                else if (id.column == 'ProdId') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 10);
                }
                else if (id.column == 'ProdMRQty') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 8);
                }

            },
            'onItemClick': function (id) {

                var getval1 = this.getItem(id.row);
                $('#ProdIdVal').text(getval1.PRODID);
                $('#ProdNameVal').text(getval1.PRODNM);
                $('#ProdUOMVal').text(getval1.UOM_NAME);
                if (id.column == 'DELETEMODE') {

                }
                else if (id.column == 'PRODSRCHMODE') {
                    var getval = this.getItem(id.row);
                    getval.PRODID = '';
                    getval.PRODNM = '';
                    getval.TOUOM = '';
                    getval.ConvFact = '';
                    getval.ProdUOMHd = '';
                    getval.ProdUOM = '';
                    getval.ProdMRQty = '';
                    getval.DETAILS = '';
                    getval.ProdRate = '';
                    getval.AvgRate = '';
                    if (getval.ITEMCAT == 1) {
                        ProdSearchPopup();
                    }
                    else if (state.value == 2) {
                        FnProdCategoryLoad();
                        $$("POOrderGrid").getColumnConfig("PRODNM").suggest = [];
                        $$("POOrderGrid").refreshColumns();
                    }
                }

            },
            'onAfterEditStop': function (state, editor) {

                var getvalset = this.getItem(editor.row);
                if (getvalset.Modetype == "OPEN" && getvalset.STATUS_IND == "2") {
                    getvalset.Change_Ind = 1;
                }
                if (editor.column == 'TaxCode') {
                    var getval = this.getItem(editor.row);
                    var TaxDet = TaxCodeDetails(state.value);
                    var ObjKeyT = Object.keys(TaxDet);
                    var ObjValuesT = Object.values(TaxDet);
                    debugger;
                    var TsxVal = JSON.parse($('#TAX_Details').val());
                    for (i = 0; i < TsxVal.length; i++) {
                        getval[ObjKeyT[i]] = ObjValuesT[i];
                    }
                    this.refresh();
                }
                if (editor.column == "DiscPer") {
                    var getval = this.getItem(editor.row);
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var Rate = getval.ProdRate;
                            var ProdMRQty = getval.ProdMRQty;
                            var DiscRate = Rate * ProdMRQty * state.value / 100;
                            getval.DiscRate = parseFloat(DiscRate).toFixed(getval.declen);
                            var Amtval = Rate * ProdMRQty - DiscRate;
                            getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.DiscPer = parseFloat(state.value).toFixed(2);
                                    this.refresh();
                                }
                            }

                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);

                        }
                    }
                    var TaxDet = LineItemTaxCalculate(getval);
                    debugger;
                    for (i = 0; i < TaxDet.length; i++) {
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXAMT'] = parseFloat(TaxDet[i].C_AMT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXTOTAMT'] = parseFloat(TaxDet[i].VTOT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXROFAMT'] = parseFloat(TaxDet[i].DECAMT).toFixed(getval.declen);
                    }
                    this.refresh();
                }
                if (editor.column == "DiscRate") {
                    var getval = this.getItem(editor.row);
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var Rate = getval.ProdRate;
                            var ProdMRQty = getval.ProdMRQty;
                            var Amtval = (Rate * ProdMRQty) - state.value;
                            getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscRate = parseFloat(state.value).toFixed(2);
                                    this.refresh();
                                }
                            }

                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                        }
                    }
                    var TaxDet = LineItemTaxCalculate(getval);
                    debugger;
                    for (i = 0; i < TaxDet.length; i++) {
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXAMT'] = parseFloat(TaxDet[i].C_AMT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXTOTAMT'] = parseFloat(TaxDet[i].VTOT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXROFAMT'] = parseFloat(TaxDet[i].DECAMT).toFixed(getval.declen);
                    }
                    this.refresh();
                }

                if (editor.column == 'ITEMCAT') {
                    var getval = this.getItem(editor.row);
                    getval.PRODID = '';
                    getval.PRODNM = '';
                    getval.TOUOM = '';
                    getval.ConvFact = '';
                    getval.ProdUOMHd = '';
                    getval.ProdUOM = '';
                    getval.ProdMRQty = '';
                    getval.DETAILS = '';
                    getval.ProdRate = '';
                    getval.AvgRate = '';
                    if (state.value == 1) {
                        // ListProductIdLoad();
                        // ListProductNameLoad();
                    }
                    else if (state.value == 2) {
                        FnProdCategoryLoad();
                        $$("POOrderGrid").getColumnConfig("PRODNM").suggest = [];
                        $$("POOrderGrid").refreshColumns();
                    }

                }
                if (editor.column == 'ProdRate') {

                    var getval = this.getItem(editor.row);
                    if (state.value != '') {
                        if (isNaN(state.value) == true) {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                if (parseInt(state.value) == 0) {
                                    getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                    getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                    getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                                }
                                else {
                                    var totMrQty = ((state.value) * (getval.ProdMRQty)) - (getval.DiscRate);
                                    getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                    getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                                    var data = this.serialize();
                                    var lenval = data.length;
                                    totMrVal = 0;
                                    var totMrQty = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {

                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                }
                              
                            }
                            else {
                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            if (parseInt(state.value) == 0) {
                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                            }
                            else {
                                var totMrQty = ((state.value) * (getval.ProdMRQty)) - (getval.DiscRate);
                                getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                               
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                var totMrQty = 0;
                                totMrVal = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {

                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscPer = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                            getval.ProdRate = parseFloat(0).toFixed(getval.declen);
                        }
                    }
                    var TaxDet = LineItemTaxCalculate(getval);
                    debugger;
                    for (i = 0; i < TaxDet.length; i++) {
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXAMT'] = parseFloat(TaxDet[i].C_AMT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXTOTAMT'] = parseFloat(TaxDet[i].VTOT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXROFAMT'] = parseFloat(TaxDet[i].DECAMT).toFixed(getval.declen);
                    }
                    this.refresh();
                }
                if (editor.column == 'ProdMRQty') {

                    var getval = this.getItem(editor.row);
                    if (state.value == state.old || state.value != state.old) {

                        var rate = getval.ProdRate;
                        var DiscRate = getval.DiscRate;
                        var Amtval = (rate * state.value) - DiscRate;
                        getval.Amount = parseFloat(Amtval).toFixed(getval.declen);
                        if (isNaN(state.value) == true) {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                totMrVal = 0;
                                var totMrQty = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {

                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                             
                            }
                            else {
                                getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                                getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);;
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                            this.refresh();
                            var data = this.serialize();
                            var lenval = data.length;
                            var totMrQty = 0;
                            totMrVal = 0;
                            if (lenval != 0) {
                                for (i = 0; i < lenval; i++) {

                                    if (data[i].ProdId != "") {
                                        var mrQty1 = data[i].ProdMRQty;
                                        var rate1 = data[i].ProdRate;
                                        var totMrQty1 = (mrQty1) * (rate1);
                                        totMrVal = (totMrVal) + (totMrQty1);
                                    }
                                }
                            }
                          
                        }
                        else {
                            getval.Amount = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                            getval.ProdMRQty = parseFloat(0).toFixed(getval.declen);;
                        }
                    }
                    var TaxDet = LineItemTaxCalculate(getval);
                    debugger;
                    for (i = 0; i < TaxDet.length; i++) {
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXAMT'] = parseFloat(TaxDet[i].C_AMT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXTOTAMT'] = parseFloat(TaxDet[i].VTOT).toFixed(getval.declen);
                        getval[$.trim(TaxDet[i].APPL_TAX_ID) + '_TAXROFAMT'] = parseFloat(TaxDet[i].DECAMT).toFixed(getval.declen);
                    }
                    this.refresh();
                }
                if (editor.column == 'PRODID') {

                    var getval = this.getItem(editor.row);
                    if (state.value != "" && getval.ITEMCAT == 1) {
                        var splitval = state.value.split(' ');
                        if (splitval[0] != $.trim(getval.PRODID)) {
                            var rowDatap = [];
                            var reqobj = {};
                            var setfocusval = "";
                            reqobj["REQTYPE"] = "ProductOnGrigLoadPO";
                            reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                            reqobj["Mode_type"] = $("#Mode_type").val();
                            reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                            reqobj["D_IND"] = $("#D_IND").val();
                            reqobj["M1_IND_PO"] = $("#M1_IND_PO").val();
                            reqobj["IN_GST_IND"] = $("#IN_GST_IND").val();
                            reqobj["K_TAX_IND"] = $("#K_TAX_IND").val();
                            reqobj["PARTY_TAX_GR_ID"] = $("#PARTY_TAX_GR_ID").val();
                            reqobj["TAX_Details"] = $('#TAX_Details').val();
                            reqobj["txtProdIdpop"] = state.value;
                            reqobj["txtProdNmpop"] = '';

                            var dataparam = JSON.stringify(reqobj);
                            $.ajax({
                                async: false,
                                url: "/PurchaseCtrl/MPAPI_CALL",
                                type: 'POST',
                                data: "request=" + dataparam,
                                success: function (d) {

                                    if (d != "[]") {
                                        setfocusval = "1";
                                        rowDatap = JSON.parse(d);
                                        var prodId = rowDatap[0].PRODID;
                                        var prodNm = rowDatap[0].PRODNM;
                                        var popUom = rowDatap[0].UOM;
                                        var toUom = rowDatap[0].TOUOM;
                                        var convF = rowDatap[0].CONV_FACT_BASE;
                                        var decLen = rowDatap[0].UOMDECLEN;
                                        getval.PRODID = prodId;
                                        getval.PRODNM = prodNm;
                                        getval.TOUOM = toUom;
                                        getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                        getval.DETAILS = rowDatap[0].DETAILS;
                                        var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                        getval.ProdRate = prodRte;
                                        getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                        getval.ConvFact = convF;
                                        getval.ProdUOMHd = popUom;
                                        getval.ProdUOM = popUom;
                                        getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                        getval.TaxCode = rowDatap[0].TaxCode;
                                        var TsxVal = JSON.parse($('#TAX_Details').val());
                                        debugger;
                                        for (t = 0; t < TsxVal.length; t++) {
                                            getval[$.trim(TsxVal[t].APPL_TAX_ID)] =  rowDatap[0][$.trim(TsxVal[t].APPL_TAX_ID)];
                                        }
                                        $('#ProdIdVal').text(prodId);
                                        $('#ProdNameVal').text(prodNm);
                                        $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                        getval.declen = decLen;
                                        if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                            var rate = prodRte;
                                            var totMrQty1 = (getval.ProdMRQty) * (rate);
                                            getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                            getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                            $$("POOrderGrid").refresh();
                                            var data = $$("POOrderGrid").serialize();
                                            var lenval = data.length;
                                            totMrVal = 0;
                                            var totMrQty = 0;
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {

                                                    if (data[i].ProdId != "") {
                                                        var mrQty1 = data[i].ProdMRQty;
                                                        var rate1 = data[i].ProdRate;
                                                        var totMrQty1 = (mrQty1) * (rate1);
                                                        totMrVal = (totMrVal) + (totMrQty1);
                                                    }
                                                }
                                            }

                                        }
                                        if (getval.DiscPer != "" && getval.DiscPer != undefined) {
                                        }
                                        else {
                                            getval.DiscPer = '0.00';
                                        }
                                        if (getval.DiscRate != "" && getval.DiscRate != undefined) {
                                        }
                                        else {
                                            
                                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                        }

                                        var valFloat = '';
                                        for (i = 0; i < getval.declen; i++) {
                                            valFloat += '0';
                                        }
                                        $$("POOrderGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                        $$("POOrderGrid").getColumnConfig("DiscPer").numberFormat = '1.' + valFloat;
                                        var ratedec = $("#RATE_DECIM_LEN").val();
                                        var valFloat1 = '';
                                        for (i = 0; i < ratedec; i++) {
                                            valFloat1 += '0';
                                        }
                                        $$("POOrderGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("DiscRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").refreshColumns();
                                    }
                                    else {
                                        setfocusval = "0";
                                        getval.PRODID = '';
                                        getval.PRODNM = '';
                                        getval.TOUOM = '';
                                        getval.ConvFact = '';
                                        getval.ProdUOMHd = '';
                                        getval.ProdUOM = '';
                                        getval.ProdMRQty = '';
                                        getval.declen = '';
                                        getval.ProdRate = '';
                                        getval.AvgRate = '';
                                        getval.DETAILS = '';
                                        getval.Amount = '';
                                        getval.DiscPer = '';
                                        getval.DiscRate = '';
                                    }

                                },
                            });


                            if (setfocusval == "1") {
                                var itemval = $$("POOrderGrid").getSelectedItem();
                                $$("POOrderGrid").editCell(editor.row, "ProdMRQty", false, true);
                                $$("POOrderGrid").refresh();

                            }
                            else {
                                var itemval = $$("POOrderGrid").getSelectedItem();
                                $$("POOrderGrid").editCell(editor.row, "PRODID", false, true);
                                $$("POOrderGrid").refresh();
                            }
                            this.adjustRowHeight("PRODNM");
                        }
                    }
                }
                if (editor.column == 'ProdUOM') {
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        getval.ProdUOM = state.value;
                        var reqobj = {};
                        reqobj["REQTYPE"] = "UOMChangeLoadFN";
                        reqobj["prodId"] = getval.PRODID;
                        reqobj["hdnUOM"] = state.value;
                        reqobj["ToUOM"] = getval.TOUOM;
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {

                                if (d != "") {
                                    data = JSON.parse(d);
                                    getval.ConvFact = data.ConvFact;
                                    getval.declen = data.declen;
                                    getval.UOM_NAME = data.UOM_NAME;
                                    $('#ProdUOMVal').text(data.UOM_NAME);
                                    if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                        getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(data.declen);
                                        var prodRte = parseFloat(getval.AvgRate) * parseFloat(data.ConvFact);
                                        getval.ProdRate = parseFloat(prodRte).toFixed(data.declen);
                                        var rate = getval.ProdRate;
                                        var totMrQty = (getval.ProdMRQty) * (rate);
                                        getval.Amount = parseFloat(totMrQty).toFixed(data.declen);

                                    }
                                    else {
                                        var prodRte = parseFloat(getval.AvgRate) * parseFloat(data.ConvFact);
                                        getval.ProdRate = parseFloat(prodRte).toFixed(data.declen);
                                    }
                                    $$("POOrderGrid").refresh();
                                    var data = $$("POOrderGrid").serialize();
                                    var lenval = data.length;
                                    totMrVal = 0;
                                    var totMrQty = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {

                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                   
                                    var valFloat = '';
                                    for (i = 0; i < getval.declen; i++) {
                                        valFloat += '0';
                                    }
                                    $$("POOrderGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                    $$("POOrderGrid").getColumnConfig("DiscPer").numberFormat = '1.' + valFloat;
                                    var ratedec = $("#RATE_DECIM_LEN").val();
                                    var valFloat1 = '';
                                    for (i = 0; i < ratedec; i++) {
                                        valFloat1 += '0';
                                    }
                                    $$("POOrderGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                    $$("POOrderGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                    $$("POOrderGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                    $$("POOrderGrid").getColumnConfig("DiscRate").numberFormat = '1.' + valFloat1;
                                    $$("POOrderGrid").refreshColumns();
                                }
                            },
                        });
                    }
                    if (editor.column == 'ProdUOM') {
                        var Options = this.getColumnConfig("ProdUOM").collection;
                        Options.clearAll();
                        UOMSTR = types;
                        Options.parse(UOMSTR);
                        $$("POOrderGrid").refresh();
                    }
                }
                if (editor.column == 'PRODNM') {

                    var getval = this.getItem(editor.row);
                    if (state.value != "" && getval.ITEMCAT == 1) {
                        var rowDatap = [];
                        var reqobj = {};
                        var setfocusval = "";
                        reqobj["REQTYPE"] = "ProductOnGrigLoadPO";
                        reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                        reqobj["D_IND"] = $("#D_IND").val();
                        reqobj["M1_IND_PO"] = $("#M1_IND_PO").val();
                        reqobj["IN_GST_IND"] = $("#IN_GST_IND").val();
                        reqobj["K_TAX_IND"] = $("#K_TAX_IND").val();
                        reqobj["PARTY_TAX_GR_ID"] = $("#PARTY_TAX_GR_ID").val();
                        reqobj["TAX_Details"] = $('#TAX_Details').val();
                        reqobj["txtProdIdpop"] = '';
                        reqobj["txtProdNmpop"] = encodeURIComponent(state.value);

                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {

                                if (d != "[]") {


                                    rowDatap = JSON.parse(d);
                                    if ($.trim(getval.PRODID) != $.trim(rowDatap[0].PRODID)) {
                                        setfocusval = "1";
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
                                        getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                        getval.DETAILS = rowDatap[0].DETAILS;
                                        var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                        getval.ProdRate = prodRte;
                                        getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                        getval.ProdUOMHd = popUom;
                                        getval.ProdUOM = popUom;
                                        getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                        getval.TaxCode = rowDatap[0].TaxCode;
                                        var TsxVal = JSON.parse($('#TAX_Details').val());
                                        debugger;
                                        for (t = 0; t < TsxVal.length; t++) {
                                            getval[$.trim(TsxVal[t].APPL_TAX_ID)] = rowDatap[0][$.trim(TsxVal[t].APPL_TAX_ID)];
                                        }
                                        $('#ProdIdVal').text(prodId);
                                        $('#ProdNameVal').text(prodNm);
                                        $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                        getval.declen = decLen;
                                        if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                            var rate = prodRte;
                                            var totMrQty1 = (getval.ProdMRQty) * (rate);
                                            getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                            getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                            $$("POOrderGrid").refresh();
                                            var data = $$("POOrderGrid").serialize();
                                            var lenval = data.length;
                                            totMrVal = 0;
                                            var totMrQty = 0;
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {

                                                    if (data[i].ProdId != "") {
                                                        var mrQty1 = data[i].ProdMRQty;
                                                        var rate1 = data[i].ProdRate;
                                                        var totMrQty1 = (mrQty1) * (rate1);
                                                        totMrVal = (totMrVal) + (totMrQty1);
                                                    }
                                                }
                                            }
                                           

                                        }
                                        if (getval.DiscPer != "" && getval.DiscPer != undefined) {
                                        }
                                        else {
                                            getval.DiscPer = '0.00';
                                        }
                                        if (getval.DiscRate != "" && getval.DiscRate != undefined) {
                                        }
                                        else {
                                            getval.DiscRate = parseFloat(0).toFixed(getval.declen);
                                        }
                                       
                                        var valFloat = '';
                                        for (i = 0; i < getval.declen; i++) {
                                            valFloat += '0';
                                        }
                                        $$("POOrderGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                        $$("POOrderGrid").getColumnConfig("DiscPer").numberFormat = '1.' + valFloat;
                                        var ratedec = $("#RATE_DECIM_LEN").val();
                                        var valFloat1 = '';
                                        for (i = 0; i < ratedec; i++) {
                                            valFloat1 += '0';
                                        }
                                        $$("POOrderGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").getColumnConfig("DiscRate").numberFormat = '1.' + valFloat1;
                                        $$("POOrderGrid").refreshColumns();
                                    }
                                }
                                else {
                                    setfocusval = "0";
                                    getval.PRODID = '';
                                    getval.PRODNM = '';
                                    getval.TOUOM = '';
                                    getval.ConvFact = '';
                                    getval.ProdUOMHd = '';
                                    getval.ProdUOM = '';
                                    getval.DETAILS = ''
                                    getval.ProdMRQty = '';
                                    getval.declen = '';
                                    getval.ProdRate = '';
                                    getval.AvgRate = '';
                                    getval.Amount = '';
                                    getval.DiscRate = '';
                                    getval.DiscPer = 0;
                                }

                            },
                        });


                        if (setfocusval == "1") {
                            var itemval = $$("POOrderGrid").getSelectedItem();
                            $$("POOrderGrid").editCell(editor.row, "ProdMRQty", false, true);
                            $$("POOrderGrid").refresh();

                        }

                        this.adjustRowHeight("PRODNM");
                    }
                }
                if (editor.column == 'DETAILS') {
                    this.adjustRowHeight("DETAILS");
                }
                var getval1 = this.getItem(editor.row);
                $('#ProdIdVal').text(getval1.PRODID);
                $('#ProdNameVal').text(getval1.PRODNM);
                $('#ProdUOMVal').text(getval1.UOM_NAME);

               
                var ratedec = $("#RATE_DECIM_LEN").val();
                var valFloat1 = '';
                for (i = 0; i < ratedec; i++) {
                    valFloat1 += '0';
                }
                $$("TaxDiscDt").getColumnConfig("Disc_Per").numberFormat = '1.' + valFloat1;
                $$("TaxDiscDt").getColumnConfig("Disc_Rate").numberFormat = '1.' + valFloat1;
                $$("TaxDiscDt").refreshColumns();
               

                var data = $$("POOrderGrid").serialize();
                var Txdata = $$("TaxDiscDt").serialize();
                debugger;
                var lenval = data.length;
                var AmtTotTax = 0;
                if (lenval != 0) {
                    for (j = 0; j < Txdata.length; j++) {
                        var AmtTax = 0;
                        if (Txdata[j].Tax_Ind == 0) {
                            for (i = 0; i < lenval; i++) {
                                AmtTax = AmtTax + parseFloat(data[i][$.trim(Txdata[j].Tax_Id) + '_TAXAMT']);
                            }
                            Txdata[j].Disc_Rate = AmtTax;
                            AmtTotTax = AmtTotTax + AmtTax;
                        }
                    }
                }
                $$("AmtTotTax").setValue(AmtTotTax);
                $$("TaxDiscDt").clearAll();
                $$("TaxDiscDt").parse(Txdata);
                $$("TaxDiscDt").refresh();
            },
        }
    });
    webix.ui({
        container: "draft", view: "switch", value: 0, id: 'draft', label: "Draft", labelWidth: 100, css: 'mt-1',
        on: {
            onChange: function (newValue, oldValue, config) {
                if (newValue == 1) {
                    //("#POTapView").show();
                    fnCancelPopup();
                }
                else {
                    // $("#POTapView").hide();
                    $$("drafthd").hide();
                }
            }
        }
    });

    webix.ui({
        container: "Centralpurchaseorder", view: "switch", value: 0, id: 'draft', label: "Central PO", labelWidth: 80, css: 'mt-1',
        on: {
            onChange: function (newValue, oldValue, config) {
                if (newValue == 1) {
                    //("#POTapView").show();
                    fnCancelPopup();
                }
                else {
                    // $("#POTapView").hide();
                    $$("").hide();
                }
            }
        }
    });


    webix.ui({
        container: "divNetpo",
        view: 'text',
        label: 'Net PO',
        id: 'NetpoDDL1',
        value: '',
        options: [],
        labelWidth: 80,
        inputWidth: 200,       
    });


    webix.ui({
        container: "Reqitem", id: 'Reqitem', css: 'mp_txtbtn', view: "button", width: 130, value: 1, icon: "fal fa-plus",
        label:
        '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text">Request Items</span>', click: function () { fnPoReqitemPopup(); }
    });
    webix.ui({
        container: "PoDistribution", id: 'PoDistribution', css: 'mp_txtbtn', view: "button", width: 130, value: 1, icon: "fal fa-plus",
        label: '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text">Distribution</span>', click: function () { fnPoDistriPopup(); }
    });

    webix.ui({
        container: "addpoinfo", id: 'addpoinfo', css: 'mp_txtbtn', view: "button", width: 170, value: 1, icon: "fal fa-plus",
        label: '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text">Other Information</span>', click: function () { $$('POOtherInfoPopUp').show(); }
    });
   
    webix.ui({
        container: "Amendment", id: 'Amendment', css: 'mp_txtbtn', view: "button", width: 130, value: 1, icon: "fal fa-plus",
        label: '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text">Amendment</span>', click: function () { fnamendPopup(); }
    });

    webix.ui({
        container: "Documents", id: 'Documents', css: 'mp_txtbtn', view: "button", width: 110, value: 1, label:
        '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text"> Documents</span>', click: function () { fndocupPopup(); },
    });
   
    
    $("#Mode_type").val("NEW")
    fnaddinfonewPopup();
    fnLoadDef();
    FnPODefultLoad();
    DDlUnitLoad();
    DDlPOTypeLoad();
    DDlCurrencyOrder();
    DDlTaxCode();
   
   
}
function AddPRTFN() {
    AddRequestTemplateRow();
}
function AddRequestTemplateRow() {
   
    var data = $$("POOrderGrid").serialize();
    var lenval = data.length;
    var indx = "";
    var sno = 0;
    var PROD_SNO = 0;
    var INDENT_TRN_UID = '';
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {

            indx = i;
            sno = data[i].SNRO;
            INDENT_TRN_UID = data[i].INDENT_TRN_UID;
            PROD_SNO = data[i].PROD_SNO;
        }
        
        if ($("#Mode_type").val() != "NEW" && INDENT_TRN_UID != "" && INDENT_TRN_UID != undefined) {
            PROD_SNO = SRNOLoadFn(INDENT_TRN_UID);
            var addrow = {};

            addrow["CHECKIND"] = 0;
            addrow["SNRO"] = sno + 1;
            addrow["ITEMCAT"] = '1';
            addrow["LINETYPE"] = 'Q';
            addrow["PRODID"] = '';
            addrow["PRODNM"] = '';
            addrow["Modetype"] = 'NEW';
            addrow["ModeDelete"] = '0';
            addrow["Change_Ind"] = 0;
            addrow["PROD_SNO"] = PROD_SNO;
            addrow["STATUS_IND"] = 0;
            addrow["ITEM_NARRATION"] = '';
            addrow["PO_REM"] = '';
            var TsxVal = JSON.parse($('#TAX_Details').val());
            for (i = 0; i < TsxVal.length; i++) {
                    addrow[$.trim(TsxVal[i].APPL_TAX_ID)] = '';
                    addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXAMT'] = '';
                    addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXTOTAMT'] = '';
                    addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXROFAMT'] = '';
            }
        }
        else {
            var addrow = {}
            addrow["CHECKIND"] = 0;
            addrow["SNRO"] = sno + 1;
            addrow["ITEMCAT"] = '1';
            addrow["LINETYPE"] = 'Q';
            addrow["PRODID"] = '';
            addrow["PRODNM"] = '';
            addrow["Modetype"] = 'NEW';
            addrow["ModeDelete"] = '0';
            addrow["Change_Ind"] = 0;
            addrow["PROD_SNO"] = PROD_SNO + 1;
            addrow["STATUS_IND"] = 0;
            addrow["ITEM_NARRATION"] = '';
            addrow["PO_REM"] = '';
            var TsxVal = JSON.parse($('#TAX_Details').val());
            for (i = 0; i < TsxVal.length; i++) {
                addrow[$.trim(TsxVal[i].APPL_TAX_ID)] = '';
                addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXAMT'] = '';
                addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXTOTAMT'] = '';
                addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXROFAMT'] = '';
            }
        }
        $$("POOrderGrid").add(addrow);
        $$("POOrderGrid").select($$("POOrderGrid").getLastId());
        webix.UIManager.setFocus($$("POOrderGrid"));
        var itemval = $$("POOrderGrid").getSelectedItem();
        $$("POOrderGrid").editCell(itemval.id, "PRODID", false, true);
        $$("POOrderGrid").refresh();
    }
    else {
        var addrow = {};
        addrow["CHECKIND"] = 0;
        addrow["SNRO"] = 1;
        addrow["ITEMCAT"] = '1';
        addrow["LINETYPE"] = 'Q';
        addrow["PRODID"] = '';
        addrow["PRODNM"] = '';
        addrow["Modetype"] = 'NEW';
        addrow["ModeDelete"] = '0';
        addrow["Change_Ind"] = 0;
        addrow["PROD_SNO"] = 1;
        addrow["STATUS_IND"] = 0;
        addrow["ITEM_NARRATION"] = '';
        addrow["PO_REM"] = '';
        var TsxVal = JSON.parse($('#TAX_Details').val());
        for (i = 0; i < TsxVal.length; i++) {
            addrow[$.trim(TsxVal[i].APPL_TAX_ID)] = '';
            addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXAMT'] = '';
            addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXTOTAMT'] = '';
            addrow[$.trim(TsxVal[i].APPL_TAX_ID) + '_TAXROFAMT'] = '';
        }
        $$("POOrderGrid").add(addrow);
        $$("POOrderGrid").select($$("POOrderGrid").getLastId());
        webix.UIManager.setFocus($$("POOrderGrid"));
        var itemval = $$("POOrderGrid").getSelectedItem();
        $$("POOrderGrid").editCell(itemval.id, "PRODID", false, true);
        $$("POOrderGrid").refresh();
    }

};
function fnLoadDef() {
    //debugger;
    var response = "";
    var reqobj = {};
    reqobj["REQTYPE"] = "FnDefultLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            response = JSON.parse(d);
            var ithInd = response.ithInd;
            $("#mrdInd").val(response.mrdInd);
            $("#cirInd").val(response.cirInd);
            $("#matEmulateInd").val(response.matEmulateInd);
            $("#costLinkDept").val(response.costLinkDept);
            $("#vUserDeptInd").val(response.vUserDeptIND);
            $("#User_Privld_Ind").val(response.User_Privld_Ind);
            $("#vMjGrpAppl").val(response.vMjGrpAppl);
            $("#Base_Currency_ID").val(response.Base_Currency_ID);
            $("#DEF_DT_FORMAT").val(response.DEF_DT_FORMAT);
            if ($("#costLinkDept").val() == "")
                $("#costLinkDept").val("0");
            if (response.DEF_DT_FORMAT == 1) {
                $$("Podate").define("format", '%d/%m/%Y');
                $$('Podate').refresh();
            }
            else if (response.DEF_DT_FORMAT == 2) {
                $$("Podate").define("format", '%m/%d/%Y');
                $$('Podate').refresh();
            }
            $("#IN_GST_IND").val(response.IN_GST_IND);
            if (response.IN_GST_IND == 1) {
                $$("POOrderGrid").showColumn('TaxCode');
                $$('VATPOChk').show();
            }
            $("#K_TAX_IND").val(response.K_TAX_IND);
            $("#M1_IND_PO").val(response["M1_IND"]);
            if (response.K_TAX_IND == 2 || response.K_TAX_IND == 3 || response.K_TAX_IND == 4 || response.K_TAX_IND == 5 || response.K_TAX_IND == 6) {
                $$("POOrderGrid").showColumn('TaxCode');
            }
        },
    });
}
function FnPODefultLoad() {
    //debugger;

    var response = "";
    var reqobj = {};
    reqobj["REQTYPE"] = "FnPODefultLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            response = JSON.parse(d);
            $("#vStrInd").val(response.vStrInd);
            $("#vResStr").val(response.vResStr);
            $("#vResDept").val(response.vResDept);
            $("#V2lineInd").val(response.V2lineInd);
            $("#vDefPoTyID").val(response.vDefPoTyID);
            $("#VNF1_IND").val(response.VNF1_IND);
            $("#vDprApp").val(response.vDprApp);
            $("#vAuditInd").val(response.vAuditInd);
            $("#vUserGrpRes").val(response.vUserGrpRes);
            $("#DOC_ATTACH_IND").val(response.DOC_ATTACH_IND);
            $("#vUserUnitRes").val(response.vUserUnitRes);
            $("#vCstItmRes").val(response.vCstItmRes);
            $("#vBoqInd").val(response.vBoqInd);
            $("#vRqCatCCLink").val(response.vRqCatCCLink);
            $("#vOthLngId").val(response.vOthLngId);
            $("#vShowAuditLog").val(response.vShowAuditLog);
            $("#UomNameAppl").val(response.UomNameAppl);
        },
    });
}
function DDlUnitLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlUnitLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["vUserUnitRes"] = $("#vUserUnitRes").val() == "" ? "0" : $("#vUserUnitRes").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("UnitDDL").define("options", rowDatad);
            $$("UnitDDL").refresh();
            $$("UnitDDL").setValue(rowDatad[0].id);
            $$("UnitDDL").hide();
            if (rowDatad.length > 1) {
                $$("UnitDDL").show();
            }
        },
    });
}
function DDlPOTypeLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["GS_IND"] = $$("BasisDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("POTypeDDL").define("options", rowDatad);
            $$("POTypeDDL").refresh();
            $$("POTypeDDL").setValue(rowDatad[0].id);
        },
    });
}
function DDlPOTypeChangeOrder() {

    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeChangeOrder";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {

            rowDatad = JSON.parse(d);
            if (rowDatad.length > 0) {
                $("#APPROVE_VEND_IND").val(rowDatad[0]["APPROVE_VEND_IND"]);
                $("#PROD_GROUP_APPL_IND").val(rowDatad[0]["PROD_GROUP_APPL_IND"]);
                $("#ALT_UOM_APPL_IND").val(rowDatad[0]["ALT_UOM_APPL_IND"]);
                $("#PO_INDENT_DEPART_APPL_IND").val(rowDatad[0]["PO_INDENT_DEPART_APPL_IND"]);
                $("#INDENT_CC_APPL_IND").val(rowDatad[0]["INDENT_CC_APPL_IND"]);
                $("#PO_R_IND").val(rowDatad[0]["PO_R_IND"]);
                $("#RATE_DECIM_LEN").val(rowDatad[0]["RATE_DECIM_LEN"] == "" ? 2 : rowDatad[0]["RATE_DECIM_LEN"]);
                $("#A_IND").val(rowDatad[0]["A_IND"]);
                $("#C_IND").val(rowDatad[0]["C_IND"]);
                $("#H1_IND").val(rowDatad[0]["H1_IND"]);
                $("#H_IND").val(rowDatad[0]["H_IND"]);
                $("#DP_IND").val(rowDatad[0]["DP_IND"]);
              
            }
        },
    });
}
function VendorOrderChange() {
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "VendorOrderChange";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["PARTY_ID"] = $$("DDLVendor").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {

            rowDatad = JSON.parse(d);
            if (rowDatad.length > 0) {
                $("#PARTY_TAX_GR_ID").val(rowDatad[0]["PARTY_TAX_GR_ID"]);
            }
        },
    });
}

function DDlPOTypeChangeOrder1() {

    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeChangeOrder1";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {

            rowDatad = JSON.parse(d);
            if (rowDatad.length > 0) {
                $("#DPR_IND").val(rowDatad[0]["DPR_IND"]);
                $("#D_IND").val(rowDatad[0]["D_IND"]);
                $("#E_IND").val(rowDatad[0]["E_IND"]);
                $("#B1_IND").val(rowDatad[0]["B1_IND"]);
                $("#C1_IND").val(rowDatad[0]["C1_IND"]);
                $("#L1_IND").val(rowDatad[0]["L1_IND"]);
                $("#M1_IND").val(rowDatad[0]["M1_IND"]);
                $("#N1_IND").val(rowDatad[0]["N1_IND"]);
                $("#NK1_ind").val(rowDatad[0]["NK1_ind"]);
                $("#PRS_IND").val(rowDatad[0]["PRS_IND"]);
                $("#DBL_IND").val(rowDatad[0]["DBL_IND"]);
                $("#AD_IND").val(rowDatad[0]["AD_IND"]);
                $("#PRM_IND").val(rowDatad[0]["PRM_IND"]);
                $("#PONM_IND").val(rowDatad[0]["PONM_IND"]);
                $("#C_REQ_APPL").val(rowDatad[0]["C_REQ_APPL"]);
                $("#C_PO_APPL").val(rowDatad[0]["C_PO_APPL"]);
            }
        },
    });
}
function DDlVendorOrder() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlVendorOrder";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["APPROVE_VEND_IND"] = $("#APPROVE_VEND_IND").val() == "" ? "0" : $("#APPROVE_VEND_IND").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("DDLVendor").define("options", rowDatad);
            $$("DDLVendor").refresh();
        },
    });
}
function DDlCurrencyOrder() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlCurrencyOrder";
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            $$("DDLCurrency").define("options", rowDatad);
            $$("DDLCurrency").refresh();
        },
    });
}
function ListProductIdLoad(ProdIdFilter) {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductIdLoad";
    reqobj["vCstItmRes"] = $("#vCstItmRes").val();
    reqobj["VProdAppInd"] = $("#VProdAppInd").val();
    reqobj["vStrInd"] = $("#vStrInd").val();
    reqobj["A1IND"] = $("#B1_IND").val();
    reqobj["cmnCostId"] = '';
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    reqobj["ReqCatDDL"] = '';
    reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
    reqobj["DP_IND"] = $("#DP_IND").val();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["vReqClass"] = $("#vReqClass").val();
    if (ProdIdFilter != '' && ProdIdFilter != undefined) {
        reqobj["ProdIdFilter"] = ProdIdFilter;
    }
    else {
        reqobj["ProdIdFilter"] = '';
    }
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                rowDatap = JSON.parse(d);
            }
        },
    });
    return rowDatap;
}
function ListProductNameLoad(ProdNmFilter) {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductNameLoad";
    reqobj["vCstItmRes"] = $("#vCstItmRes").val();
    reqobj["VProdAppInd"] = $("#VProdAppInd").val();
    reqobj["vStrInd"] = $("#vStrInd").val();
    reqobj["A1IND"] = $("#B1_IND").val();
    reqobj["cmnCostId"] = '';
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    reqobj["ReqCatDDL"] = '';
    reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
    reqobj["DP_IND"] = $("#DP_IND").val();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["vReqClass"] = $("#vReqClass").val();
    if (ProdNmFilter != '' && ProdNmFilter != undefined) {
        reqobj["ProdNmFilter"] = ProdNmFilter;
    }
    else {
        reqobj["ProdNmFilter"] = '';
    }
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            if (d != "") {
                rowDatap = JSON.parse(d);
            }
        },
    });
    return rowDatap;
}
function TaxCodeColumnLoad() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "TaxCodeColumnLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["IN_GST_IND"] = $("#IN_GST_IND").val() == "" ? "0" : $("#IN_GST_IND").val();
    reqobj["K_TAX_IND"] = $("#K_TAX_IND").val() == "" ? "0" : $("#K_TAX_IND").val();
    reqobj["VATPO_IND"] = $$('VATPOChk').getValue();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            var wid_6 = ((screen.width - 100) * 0.06);
            var wid_5 = ((screen.width - 100) * 0.05);
            var wid_4 = ((screen.width - 100) * 0.04);
            $('#TAX_Details').val(d);
            rowDatad = JSON.parse(d);
            for (i = 0; i<rowDatad.length; i++) {
                var columns = $$("POOrderGrid").config.columns;
               
                    columns.splice(columns.length, 0, {
                        id: $.trim(rowDatad[i].APPL_TAX_ID),
                        header: $.trim(rowDatad[i].TAX_SHRT_NM) + '',
                        css: { 'text-align': 'right ! important' },
                        width: wid_6,
                    });
                    $$("POOrderGrid").refreshColumns();
                    columns.splice(columns.length, 0, {
                        id: $.trim(rowDatad[i].APPL_TAX_ID)+'_TAXAMT',
                        header: $.trim(rowDatad[i].TAX_SHRT_NM) + '',
                        css: { 'text-align': 'right ! important' },
                        width: wid_6,hidden:true
                    });
                    $$("POOrderGrid").refreshColumns();
                    columns.splice(columns.length, 0, {
                        id: $.trim(rowDatad[i].APPL_TAX_ID) + '_TAXTOTAMT',
                        header: $.trim(rowDatad[i].TAX_SHRT_NM) + '',
                        css: { 'text-align': 'right ! important' },
                        width: wid_6, hidden: true
                    });
                    $$("POOrderGrid").refreshColumns();
                    columns.splice(columns.length, 0, {
                        id: $.trim(rowDatad[i].APPL_TAX_ID) + '_TAXROFAMT',
                        header: $.trim(rowDatad[i].TAX_SHRT_NM) + '',
                        css: { 'text-align': 'right ! important' },
                        width: wid_6, hidden: true
                    });
                    $$("POOrderGrid").refreshColumns();
            }
            var TaxArySet = [];
            for (i = 0; i < rowDatad.length; i++) {
                var TaxSet = {};
                TaxSet.Tax_Id = rowDatad[i].APPL_TAX_ID;
                TaxSet.Tax_Nm = $.trim(rowDatad[i].TAX_SHRT_NM);
                TaxSet.Disc_Per = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                TaxSet.Disc_Rate = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
                TaxSet.Tax_Ind = '0';
                TaxSet.Tax_Code = '';
                TaxArySet.push(TaxSet);
            }
            var TaxSet = {};
            TaxSet.Tax_Id = 'DisTax';
            TaxSet.Tax_Nm = 'Discount';
            TaxSet.Disc_Per = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
            TaxSet.Disc_Rate = parseFloat(0).toFixed($("#RATE_DECIM_LEN").val());
            TaxSet.Tax_Ind = '1';
            TaxSet.Tax_Code = '';
            TaxArySet.push(TaxSet);
            $$("TaxDiscDt").clearAll();
            $$("TaxDiscDt").parse(TaxArySet);
            
           
        },
    });
} 
function DDlTaxCode() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlTaxCode";
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
            var Options = $$("POOrderGrid").getColumnConfig("TaxCode").collection;
            Options.parse(rowDatad);
            var Options1 = $$("TaxDiscDt").getColumnConfig("Tax_Code").collection;
            Options1.parse(rowDatad);
        },
    });
}
function FnProdCategoryLoad() {

    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnProdCategoryLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {

            rowDatad = JSON.parse(d);
            $$("POOrderGrid").getColumnConfig("PRODID").suggest = rowDatad;
            $$("POOrderGrid").refreshColumns();
        },
    });
}
function TaxCodeDetails(Tax_Code) {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "TaxCodeDetails";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["Tax_Code"] = Tax_Code;
    reqobj["TAX_Details"] = $('#TAX_Details').val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
        },
    });
    return rowDatad;
}
function LineItemTaxCalculate(Line_Prod) {
    debugger;
    var LineItem = [];
    LineItem.push(Line_Prod);
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "LineItemTaxCalculate";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["LineItem"] = JSON.stringify(LineItem);
    reqobj["TAX_Details"] = $('#TAX_Details').val();
    reqobj["IN_GST_IND"] = $("#IN_GST_IND").val() == "" ? "0" : $("#IN_GST_IND").val();
    reqobj["K_TAX_IND"] = $("#K_TAX_IND").val() == "" ? "0" : $("#K_TAX_IND").val();
    reqobj["VatInvInd"] = $$('VATPOChk').getValue();
    reqobj["DDLVendor"] = $$("DDLVendor").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            rowDatad = JSON.parse(d);
        },
    });
    return rowDatad;
}
function SavePOTRN() {
    var rowDatap = [];
    $$("POOrderGrid").editStop();
    $$("POOrderGrid").editCancel();
  
        var FullData = $$("POOrderGrid").serialize();
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
                $$("POOrderGrid").select(FullData[i].id, "PRODID", false);
                webix.UIManager.setFocus($$("POOrderGrid"));
                $$("POOrderGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("POOrderGrid").editCancel();
                return false;
            }
            if ($.trim(FullData[i].ProdUOM) == "") {
                alert("UOM is Empty");
                $$("POOrderGrid").select(FullData[i].id, "ProdUOM", false);
                webix.UIManager.setFocus($$("POOrderGrid"));
                $$("POOrderGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("POOrderGrid").editCancel();
                return false;
            }
            if (mrQty == "" || parseFloat(mrQty) <= 0) {
                alert("Qty should be valid");
                $$("POOrderGrid").select(FullData[i].id, "ProdMRQty", false);
                webix.UIManager.setFocus($$("POOrderGrid"));
                $$("POOrderGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                return false;
            }

        }
        FullData = JSON.stringify(FullData);


        var reqobj = {};
        reqobj["REQTYPE"] = "SavePOTRN";
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
        reqobj["UnitDDL"] = $$("UnitDDL").getValue();
        reqobj["DISP_SR_NO"] = $("#DISP_SR_NO").val();
        reqobj["SR_NO"] = $("#SR_NO").val();
        reqobj["PO_DT"] = $$("Podate").getValue();
        reqobj["POTypeDDL"] = $$("POTypeDDL").getValue();
        reqobj["TAX_Details"] = $('#TAX_Details').val();
        reqobj["IN_GST_IND"] = $("#IN_GST_IND").val() == "" ? "0" : $("#IN_GST_IND").val();
        reqobj["K_TAX_IND"] = $("#K_TAX_IND").val() == "" ? "0" : $("#K_TAX_IND").val();
        reqobj["VatInvInd"] = $$('VATPOChk').getValue();
        reqobj["DDLVendor"] = $$("DDLVendor").getValue();
        reqobj["StatusDDL"] = $$("StatusDDL").getValue();
        reqobj["DDLCurrency"] = $$("DDLCurrency").getValue();
        reqobj["Mode_type"] = $("#Mode_type").val();
        reqobj["vReqClass"] = $("#vReqClass").val();
        reqobj["PARTY_TAX_GR_ID"] = $("#PARTY_TAX_GR_ID").val();
        reqobj["H_IND"] = $("#H_IND").val();
        reqobj["TX_RG_TY"] = $("#TX_RG_TY").val();
        reqobj["Mode_PO"] = '';
        reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
        reqobj["GSInd"] = $$("BasisDDL").getValue();
        reqobj["Draft"] = $$("draft").getValue();
        reqobj["INDENT_TRN_UID"] = $("#INDENT_TRN_UID").val();
        reqobj["LOC_ID"] = $("#LOC_ID").val();
        reqobj["DEF_DT_FORMAT"] = $("#DEF_DT_FORMAT").val();
        reqobj["FullData"] = FullData;
        var dataparam = JSON.stringify(reqobj);
        $.ajax({
            async: false,
            url: "/PurchaseCtrl/MPAPI_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (d) {

                if (d != "") {
                    rowDatap = JSON.parse(d);
                    if (rowDatap.OUTPUT == "SUCCESS") {
                        alert("Saved Successfully!...  Request NO:" + rowDatap.DISP_SR_NO);
                        fnRefresh();
                    }
                    else {
                        alert(rowDatap.OUTPUT);
                    }
                }
                else if(d==9) {
                    alert('Popup Srno Note');
                }
            },
        });
}




function fnpurreqsPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "Purchase Requisition",
        id: 'reqitem',
        position: "center",
        body: {
            rows: [
                {
                    type: "space",
                    id: "a1",
                    padding: { top: 0, bottom: 1, left: 0, right: 0 },
                    rows: [
                      {
                          type: "space",
                          padding: { top: 5, bottom: 5, left: 0, right: 0 },
                          responsive: "a1",
                      }
                    ]
                },
          {

              view: 'form',
              padding: { top: 0, bottom: 1, left: 0, right: 0 },
              elements: [
                  {
                      rows: [
                          {
                              view: "datatable",
                              id: "PRreorderGrid",
                              name: 'PRreorderGrid',
                              select: 'row',
                              scrollX: true,
                              columns: [
                                       { header: "Sno", id: "SNRO", width: 50, css: { 'text-align': 'center ! important' } },
                                       { header: "Prod ID", id: "PRODID", width: 100, css: { 'text-align': 'center ! important' } },
                                       { header: "Prod Name", id: "PRODNM", width: 250, css: { 'text-align': 'center! important' } },
                                       { header: "Uom", id: "PRODUOM", width: 100, css: { 'text-align': 'center! important' } },
                                       { header: "Reodrder Level", id: "REORDER_LEVEL", width: 150, css: { 'text-align': 'center! important' } },
                                       { header: "Max Stock Qty", id: "MAXSTKQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                       { header: "Stock Qty", id: "STKQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                       { header: "Reorder Qty", id: "REORDERQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                       { header: { content: "masterCheckbox", contentId: "AcptInd" }, id: "ACCEPT_IND", width: 50, css: { 'text-align': 'center! important' }, template: "{common.checkbox()}" },
                                       { header: "Final Qty", id: "FINALQTY", width: 100, editor: "text", liveEdit: true, css: { 'text-align': 'center! important', fillspace: 2, }, numberFormat: "1.00", },
                                       { header: "Rate", id: "PRODRATE", width: 100, css: { 'text-align': 'right! important' }, numberFormat: "1.00", },
                                       { header: "Amount", id: "AMOUNT", width: 100, css: { 'text-align': 'right! important' }, numberFormat: "1.00", },
                                       { header: "To UOM", id: "TOUOM", width: wid_8, css: { 'text-align': 'center ! important' }, hidden: true, },
                                       { header: "", id: "DECLEN", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                                       { header: "", id: "AVGRATE", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, numberFormat: "1.00", },
                                       { header: "", id: "CONVFACT", width: wid_8, editor: "text", css: { 'text-align': 'right ! important' }, hidden: true, },
                                       { header: "", id: "PROD_GR_ID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                                       { header: "", id: "UOM_NAME", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                              ],
                              editable: true,
                              minWidth: 550,
                              fixedRowHeight: false,
                              rowLineHeight: 28,
                              rowHeight: 28,
                              height: '300',
                              data: [],
                          },
                      ]
                  }
              ]
          },
            {
                type: "space",
                id: "a1",
                padding: { top: 0, bottom: 1, left: 0, right: 0 },
                rows: [
                  {
                      type: "space",
                      padding: { top: 2, bottom: 2, left: 0, right: 0 },
                      responsive: "a1",
                      cols: [

                          {
                              padding: { top: 2, bottom: 2, left: 0, right: 0 },
                              rows: [
                              {
                                  view: 'combo',
                                  label: 'Supplier',
                                  options: [],
                                  minWidth: 250,
                                  maxWidth: 360,
                                  labelWidth: 100,
                                  //inputWidth: 300,
                              },
                              ]
                          },
{
    rows: [
               {
                   view: 'richselect',
                   label: 'Currency',
                   id: '',
                   value: '',
                   options: [],
                   placeholder: 'Regular',
                   minWidth: 250,
                   maxWidth: 360,
                   //inputWidth: 300,                                             
               },
    ]
},
{
    rows: [
                {
                    view: "button",
                    id: 'ok1',
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("reor").hide();
                        //$$("draft").setValue("0")
                    }
                },
    ]
},
                      ]
                  }
                ]
            },
          {
              view: 'form',
              width: 300,
              padding: { top: 0, bottom: 1, left: 0, right: 0 },
              elements: [
                  {
                      rows: [

//{ view:"tabbar", options:["One", "Two"], optionWidth:200, multiview:true },
//{ view:"multiview", cells:[
//{ id:"One", template:"First", height:100, },
//{ id:"Two", template:"Second", height:100, }
//]},

                          {
                              view: "datatable",
                              id: "PRreorderGrid1",
                              name: 'PRreorderGrid',
                              width: 300,
                              select: 'row',
                              scrollX: true,
                              columns: [

                                       { header: ["Quote No", ], id: "", css: { 'text-align': 'center ! important' } },
                                       { header: ["Quote Dt", ], id: "", css: { 'text-align': 'left ! important' } },
                                       { header: ["Vendor Supp No", ], id: "", css: { 'text-align': 'left ! important' } },
                                       { header: [" Valid Upto	", ], id: "", css: { 'text-align': 'left ! important' } },
                                       { header: ["Max Stock Qty", ], id: "", css: { 'text-align': 'center ! important' } },
                              ],
                              editable: true,
                              fixedRowHeight: false,
                              rowLineHeight: 28,
                              rowHeight: 28,
                              maxHeight: 100,
                              data: [],

                          },


                      ]
                  }
              ]
          },

            {
                view: "button",
                id: 'ok',
                type: "htmlbutton",
                css: "mp_btn",
                label: "Ok",
                autowidth: true,
                align: 'right',
                click: function () {
                    $$("reor").hide();
                    //$$("draft").setValue("0")
                }
            },

            ]
        }
    }).show();
}
function fnprabtnPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "A Screen",
        id: 'reqitem1',
        scrollX: true,
        position: "center",
        maxHeight: "900",
        body: {
            padding: 10,
            rows: [
                           {
                               type: "space",
                               padding: 0,
                               responsive: "select",
                               cols: [
                                     {
                                         view: 'combo',
                                         label: 'Po Type',
                                         options: [],
                                         minWidth: 250,
                                         maxWidth: 360,
                                         labelWidth: 100,
                                         //inputWidth: 300,
                                     },
    {
        view: "multiselect",
        //label: "Multi Property",
        placeholder: "Multi Property",
        labelWidth: 110,
        id: "",
        options: [
            { "id": 1, "value": "Alex Brown" },
            { "id": 2, "value": "Dan Simons" },
            { "id": 3, "value": "Gron Alanski" },
            { "id": 4, "value": "Dan Alanski" },
            { "id": 5, "value": "Dan Simons" },
            { "id": 6, "value": "Gron Alanski" },
            { "id": 7, "value": "Dan Alanski" },
            { "id": 8, "value": "Alex Brown" },
        ],
        //value: "1,4"
    },
             {
                 view: "multiselect",
                 //label: "Regular/Consolidate/Multi prop consolidate",
                 placeholder: "Regular / Consolidate/Multi property consolidate",
                 tooltip: "Regular / Consolidate/Multi property consolidate",
                 labelWidth: 150,
                 id: "",
                 options: [
                      { "id": 1, "value": "Alex Brown" },
                     { "id": 2, "value": "Dan Simons" },
                     { "id": 3, "value": "Gron Alanski" },
                     { "id": 4, "value": "Dan Alanski" },
                     { "id": 5, "value": "Dan Simons" },
                     { "id": 6, "value": "Gron Alanski" },
                     { "id": 7, "value": "Dan Alanski" },
                     { "id": 8, "value": "Alex Brown" },
                 ],
                 //value: "1,4"
             },
               {
                   id: 'POTypeDDL2',
                   view: "switch", value: 0, id: 'draft', label: 'Central Po', labelWidth: 100, css: 'mt-1',
                   inputWidth: 300,
                   gravity: 1,
               },
                               ]
                           },
{
    cols: [
        {
            rows: [
                {
                    cols: [
                         {

                             id: '',
                             css: "mp_acticonbtn",
                             view: "button",
                             type: "htmlbutton",
                             width: 40,
                             align: 'left',
                             label: "<span class='fas fa-list'>",
                             click: function () { fnlist1Popup(); }
                         },
                        {},
                    ]
                },

        {
            padding: 10,
            view: "datatable",
            name: 'List View',
            select: 'row',
            scrollX: true,
            // maxWidth: 900,
            maxHeight: 300,
            // padding: 5,
            css: '',
            columns: [
                                 { header: "Req No", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                 { header: "Req Dt", id: "id", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '1', },
                                 { header: "Req Name", id: "PRODID", width: wid_8, editor: "text", css: { 'text-align': 'center ! important' }, fillspace: '2', editor: "text", suggest: [] },
                                 { header: "Cost Center", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                                 { header: "Top Item", id: "id1", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                  { header: "Created BY", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                                 { header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '1', },

            ],
            //scrollX: true,
            //scroll: "auto",
            //autoConfig: true,
            editable: true,
            resizeColumn: { headerOnly: true },
            fixedRowHeight: false, rowLineHeight: 25, rowHeight: 25,
            css: "wrap",
            ready: function () { },
            data: [
            { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
            { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
            ],
        },
            ]
        },
        { width: 10, },
{
    rows: [
                {
                    cols: [{

                        id: '',
                        css: "mp_acticonbtn",
                        view: "button",
                        type: "htmlbutton",
                        width: 40,
                        align: 'left',
                        label: "<span class='fas fa-list'>",
                        click: function () { fnlist2Popup(); }
                    },
                     {},
                                       {
                                           padding: 10,
                                           view: "button",
                                           id: 'ok2',
                                           type: "htmlbutton",
                                           css: "mp_actbtn",
                                           label: "A",
                                           autowidth: true,
                                           align: 'right',
                                           click: function () { fnprabtnPopup(); }
                                       },
{
    view: "button",
    id: 'ok3',
    type: "htmlbutton",
    css: "mp_btn",
    label: "B",
    autowidth: true,
    align: 'right',
    click: function () { fnprbbtnPopup(); }
},

                    ]
                },
  {
      padding: 5,
      view: "datatable",
      id: "PRreorderGrid1",
      name: 'PRreorderGrid',
      select: 'row',
      //css: 'pohight',
      scrollX: true,
      columns: [
                { header: ["Quote No", ], id: "", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                { header: ["Quote Dt", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                { header: ["Vendor Supp No", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                { header: [" Valid Upto	", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                { header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "", css: { 'text-align': 'center ! important' }, fillspace: '1', },
      ],
      editable: true,
      fixedRowHeight: false,
      rowLineHeight: 25,
      rowHeight: 25,
      maxHeight: 200,
      data: [
       { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
       { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
      ],
  },

    ]
},
    ]
},
{
    type: "space",
    padding: 0,
    responsive: "select",
    padding: { top: 1, bottom: 2, left: 0, right: 0 },
    cols: [{ width: 250, },
{
    view: 'combo',
    label: 'Supplier',
    options: [],
    minWidth: 250,
    maxWidth: 360,
    labelWidth: 100,
    inputWidth: 300,
    labelPosition: 'left',
    padding: { top: 1, bottom: 0, left: 0, right: 0 },
},
{
    view: 'richselect',
    label: 'Currency',
    id: '',
    value: '',
    options: [],
    placeholder: 'Regular',
    minWidth: 250,
    maxWidth: 300,
    inputWidth: 300,
},
{
    view: "button",
    id: 'ok1',
    type: "htmlbutton",
    css: "mp_btn",
    label: "Ok",
    autowidth: true,
    align: 'right',
    click: function () {
        $$("reor").hide();
        //$$("draft").setValue("0")
    }
},
{},
    ]
},
{
    view: "datatable",
    name: 'Request based',
    id: "reqbase",
    select: 'row',
    scrollX: true,
    minWidth: 900,
    //css: 'pohight',
    columns: [
                         { header: "Product Name", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '4', },
                         { header: "Req No", id: "", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '1', },
                         { header: "", template: "{common.checkbox()}", id: "PRODID", width: wid_8, editor: "text", css: { 'text-align': 'center ! important' }, },
                         { header: "UOM", id: "id", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                         { header: "Req Qty", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                         { header: "Select", template: "{common.checkbox()}", id: "id2", css: { 'text-align': 'center ! important' }, },
                         { header: "PO Qty", id: "id", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                         { header: "Rate", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                         { header: "Req", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                         { header: "Cost Center", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                         { header: "Property ", id: "id", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                         { header: "Unit", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                         //{ header: "Disc %", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_4, },
                         //{ header: "Disc Amt", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_4, },
                         //{ header: "Value", id: "id", css: { 'text-align': 'left ! important' }, width: wid_4, },
                         //{ header: "Tax Code", id: "id1", css: { 'text-align': 'left ! important' }, width: wid_6, },
                         //{ header: "Igst%", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "CGST%", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "SGST%", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Cess %", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Tax1 %", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Tax2 %", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Othertaxes	", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Charges", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Charges2", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
                         //{ header: "Charges3", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_6, },
    ],
    //scrollX: true,
    //scroll: "auto",
    //autoConfig: true,
    editable: true,
    resizeColumn: { headerOnly: true },
    fixedRowHeight: false, rowLineHeight: 25, rowHeight: 25,
    css: "wrap",
    ready: function () { },
    data: [
{ id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
{ id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
    ],
},
{
    rows: [
        {
            padding: { top: 1, bottom: 1, right: 1, },
            cols: [
                 {},
                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_actbtn",
                    label: "Ok",
                    //width:100,                   
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("reqitem1").hide();
                        //$$("draft").setValue("0")
                    }
                },
            ]
        }
    ]
},
            ]
        },


    });
    $$("reqitem1").show();
}
function fnlist1Popup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "List",
        id: 'reqlist1',
        position: "center",
        body: {
            rows: [


                {
                    cols: [



                          {
                              id: "List View",
                              container: "DivReqTab",
                              type: "space",
                              rows: [
                                {
                                    type: "space",
                                    padding: 0,
                                    responsive: "select",
                                    cols: [
                                      {
                                          rows: [

                                      {
                                          cols: [
                                              {
                                                  container: "DivReqTab",
                                                  view: "datatable",
                                                  //  id: "List",
                                                  name: 'pogrd2',
                                                  select: 'row',
                                                  scrollX: true,
                                                  columns: [
                             { header: "Req No", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                             { header: "Req Dt", id: "id", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '1', },
                             { header: "Req Name", id: "PRODID", width: wid_8, editor: "text", css: { 'text-align': 'center ! important' }, fillspace: '2', editor: "text", suggest: [] },
                             { header: "Cost Center", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                             { header: "Top Item", id: "id1", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                             { header: "Created BY", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '2', },


                                                  ],
                                                  //scrollX: true,
                                                  //scroll: "auto",
                                                  //autoConfig: true,
                                                  editable: true,
                                                  resizeColumn: { headerOnly: true },
                                                  fixedRowHeight: false, rowLineHeight: 35, rowHeight: 35,
                                                  css: "wrap",
                                                  ready: function () {
                                                  },
                                                  data: [
                                          { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                          { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                                  ],
                                              },
                                          ]
                                      },

                                          ]
                                      },
                                    ]
                                }
                              ]
                          },

                    ]

                },
                 {
                     padding: 10,
                     cols: [
                         {},

                           //{
                           //    view: "button",
                           //    id: 'exit',
                           //    type: "htmlbutton",
                           //    css: "mp_btn",
                           //    label: "Exit",
                           //    autowidth: true,
                           //    align: 'right',
                           //    click: function () {
                           //        $$("reqlist1").hide();
                           //        //$$("draft").setValue("0")
                           //    }
                           //},
                      {
                          view: "button",
                          id: 'bok',
                          type: "htmlbutton",
                          css: "mp_actbtn",
                          label: "Ok",
                          autowidth: true,
                          align: 'right',
                          click: function () {
                              $$("reqlist1").hide();
                              //$$("draft").setValue("0")
                          }
                      },
                     ]
                 },
            ]
        }
    });

    $$("reqlist1").show();
}
function fnlist2Popup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "List",
        id: 'reqlist2',
        position: "center",
        body: {
            rows: [


                {
                    cols: [



                          {
                              id: "List View",
                              container: "DivReqTab",
                              type: "space",
                              rows: [
                                {
                                    type: "space",
                                    padding: 0,
                                    responsive: "select",
                                    cols: [
                                      {
                                          rows: [

                                      {
                                          cols: [
                                              {
                                                  container: "DivReqTab",
                                                  view: "datatable",
                                                  //  id: "List",
                                                  name: 'pogrd2',
                                                  select: 'row',
                                                  scrollX: true,
                                                  columns: [
                             { header: ["Quote No", ], id: "", css: { 'text-align': 'center ! important' }, fillspace: '2', },
            { header: ["Quote Dt", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
            { header: ["Vendor Supp No", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
            { header: [" Valid Upto	", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },

                                                  ],
                                                  //scrollX: true,
                                                  //scroll: "auto",
                                                  //autoConfig: true,
                                                  editable: true,
                                                  resizeColumn: { headerOnly: true },
                                                  fixedRowHeight: false, rowLineHeight: 35, rowHeight: 35,
                                                  css: "wrap",
                                                  ready: function () {
                                                  },
                                                  data: [
                                          { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                          { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                                  ],
                                              },
                                          ]
                                      },

                                          ]
                                      },
                                    ]
                                }
                              ]
                          },

                    ]

                },
                 {
                     padding: 10,
                     cols: [
                         {},

                           //{
                           //    view: "button",
                           //    id: 'exit',
                           //    type: "htmlbutton",
                           //    css: "mp_btn",
                           //    label: "Exit",
                           //    autowidth: true,
                           //    align: 'right',
                           //    click: function () {
                           //        $$("reqlist2").hide();
                           //        //$$("draft").setValue("0")
                           //    }
                           //},
                      {
                          view: "button",
                          id: 'bok',
                          type: "htmlbutton",
                          css: "mp_actbtn",
                          label: "Ok",
                          autowidth: true,
                          align: 'right',
                          click: function () {
                              $$("reqlist2").hide();
                              //$$("draft").setValue("0")
                          }
                      },
                     ]
                 },
            ]
        }
    });

    $$("reqlist2").show();
}
function fnprbbtnPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "B Screen",
        id: 'reqitem1',
        position: "center",
        body: {
            rows: [
                {
                    cols: [
                                         {
                                             view: "multiselect",
                                             label: "Select",
                                             placeholder: "Category",
                                             labelWidth: 80,
                                             options: [
                                                  { "id": 1, "value": "Alex Brown" },
                                                 { "id": 2, "value": "Dan Simons" },
                                                 { "id": 3, "value": "Gron Alanski" },
                                                 { "id": 4, "value": "Dan Alanski" },
                                                 { "id": 5, "value": "Dan Simons" },
                                                 { "id": 6, "value": "Gron Alanski" },
  { "id": 7, "value": "Dan Alanski" },
  { "id": 8, "value": "Alex Brown" },
                                             ],
                                             value: "1,4"
                                         },
                                          {
                                              view: "multiselect",
                                              label: "Product",
                                              labelWidth: 80,
                                              options: [
                                                  { "id": 1, "value": "Alex Brown" },
                                                  { "id": 2, "value": "Dan Simons" },
                                                  { "id": 3, "value": "Gron Alanski" },
                                                  { "id": 4, "value": "Dan Alanski" }
                                              ],
                                              value: "1,4"
                                          },
                                          {}
                    ]
                },
                 {
                     cols: [
                         { width: 80, },
                      {
                          view: "search",
                          align: "right",
                          placeholder: " Multi Select",
                          id: "search",
                          width: 375,
                      },
                      {},
                      {}
                     ]
                 },
                {
                    cols: [



                          {
                              id: "List View",
                              container: "DivReqTab",
                              type: "space",
                              rows: [
                                {
                                    type: "space",
                                    padding: 0,
                                    responsive: "select",
                                    cols: [
                                      {
                                          rows: [

                                      {
                                          cols: [
                                              {
                                                  container: "DivReqTab",
                                                  view: "datatable",
                                                  //  id: "List",
                                                  name: 'pogrd2',
                                                  select: 'row',
                                                  scrollX: true,
                                                  columns: [
                         { header: "Pr No", id: "id", css: { 'text-align': 'center ! important' }, },
                         { header: "Name", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                         { header: "Cost Center", id: "id2", css: { 'text-align': 'center ! important' }, editor: "combo", },
                         { header: "Item", id: "id", css: { 'text-align': 'center ! important' }, },
                         { header: "Qty", id: "id1", css: { 'text-align': 'center ! important' }, },
                         { header: "Rate", id: "id2", css: { 'text-align': 'center ! important' }, },
                         { header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "id", css: { 'text-align': 'center ! important' }, },
                         { header: "Supplier", id: "id1", css: { 'text-align': 'left ! important' }, },
                         { header: "<span webix_tooltip='Supplier' class='webix_icon fas fa-store'></span>", id: "id2", css: { 'text-align': 'center ! important' }, },
                         { header: "Select", id: "id2", css: { 'text-align': 'center ! important' }, },
                                                  ],
                                                  //scrollX: true,
                                                  //scroll: "auto",
                                                  //autoConfig: true,
                                                  editable: true,
                                                  resizeColumn: { headerOnly: true },
                                                  fixedRowHeight: false, rowLineHeight: 35, rowHeight: 35,
                                                  css: "wrap",
                                                  ready: function () {
                                                  },
                                                  data: [
                                          { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                          { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                                  ],
                                              },
                                          ]
                                      },

                                          ]
                                      },
                                    ]
                                }
                              ]
                          },

                    ]

                },
                 {
                     padding: 10,
                     cols: [
                         {},

                           {
                               view: "button",
                               id: 'exit',
                               type: "htmlbutton",
                               css: "mp_btn",
                               label: "Exit",
                               autowidth: true,
                               align: 'right',
                               click: function () {
                                   $$("reqitem1").hide();
                                   //$$("draft").setValue("0")
                               }
                           },
                      {
                          view: "button",
                          id: 'bok',
                          type: "htmlbutton",
                          css: "mp_actbtn",
                          label: "Ok",
                          autowidth: true,
                          align: 'right',
                          click: function () {
                              $$("reqitem1").hide();
                              //$$("draft").setValue("0")
                          }
                      },
                     ]
                 },
            ]
        }
    });
    $$("reqitem1").show();
}



webix.event(window, "resize", function () { gridResize("1"); })
function gridResize(choice) {
    var vheight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
    var offsetTop = $$("DivReqTab1").getNode().offsetTop;
    $$("POOrderGrid").define("height", ((vheight - offsetTop - 300)));
    $$("POOrderGrid").adjust();
}



function fnPoReqitemPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "Request Items",
        id: 'POReqITMPop',
        position: "center",
        body: {//template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
            rows: [
              {
                  view: 'form',
                  // width: 768,
                  elements: [
                      {
                          rows: [
                              {
                                  view: "datatable",
                                  name: 'Request based',
                                  id: "Reqitem",
                                  select: 'row',
                                  scrollX: true,
                                  minWidth: 900,
                                  columns: [
                                                       { header: "Product Name", id: "id", css: { 'text-align': 'left ! important' }, width: wid_5 },
                                                       { header: "Req No", id: "", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect",  },
                                                       { header: "", template: "{common.checkbox()}", id: "PRODID", width: wid_8, editor: "text", css: { 'text-align': 'center ! important' }, },
                                                       { header: "UOM", id: "id", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Req Qty", id: "id1", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Select", template: "{common.checkbox()}", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "PO Qty", id: "id", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Rate", id: "id1", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Req", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Cost Center", id: "id2", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Property ", id: "id", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                                       { header: "Unit", id: "id1", css: { 'text-align': 'center ! important' }, width: wid_5 },
                                  ],
                                  editable: true,
                                  ready: function () { },
                                  data: [],
                              },
                          ]
                      }
                  ]
              },

                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_actbtn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("POReqITMPop").hide();
                        //$$("draft").setValue("0")
                    }
                },
            ]
        }
    }).show();
}
function fnPoDistriPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "PO Distribution",
        id: 'PODistr',
        position: "center",
        body: {//template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
            rows: [
{
    type: "space",
    padding: 8,
    rows: [


      {
          type: "clean",

          rows: [

            {
                //css:"distritabber",
                borderless: true, view: "tabbar", id: 'tabbar',
                options: [
                      { value: 'Distribution', id: 'podist', },
                      { value: 'View All Distribution', id: 'podistview' },

                ]
            },
            {
                animate: {
                    type: "slide",
                    direction: "left"
                },
                fitBiggest: true,
                cells: [
                    {
                        id: "podist",
                        view: "form",
                        elementsConfig: {
                            width: 200,
                        },

                        elements: [
                            {
                                rows: [










                                {
                                    cols: [
                                        { view: "text", placeholder: "Prod ID", label: 'Prod ID	', width: 200, inputWidth: 180, },
                                      { view: "richselect", placeholder: "Qty / Amount", label: 'Line  Type', width: 280, inputWidth: 250, },
                                      { view: "text", placeholder: "Product Name", labelWidth: 130, label: 'Product Name', Width: 800, inputWidth: 600, width: 900, },
                                    ]
                                },

                                ]
                            },
                         {
                             view: "datatable",
                             name: 'Request based',
                             select: 'row',
                             scrollX: true,
                             minWidth: 900,
                             columns: [
                                                  { header: "Sno  ", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                                  { header: "Property	", id: "", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '3', },
                                                  { header: "Cost Center", id: "", editor: "text", css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '2', },
                                                  { header: "Distributed Units", id: "PRODID", css: { 'text-align': 'center ! important' }, fillspace: '2', },

                             ],
                             editable: true,
                             css: "wrap",
                             ready: function () { },
                             data: [
                         { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                         { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                             ],
                         },
                          {
                              rows: [
                                  {
                                      cols: [
                                          { view: "label", placeholder: "Uom", label: 'Uom:', width: 200, inputWidth: 180, },
                                        { view: "label", placeholder: "Units", label: 'Po Units:', width: 350, inputWidth: 250, },
                                        { view: "label", placeholder: "Units", labelWidth: 150, label: 'Distriuted Units:', Width: 800, inputWidth: 300, width: 900, },
                                      ]
                                  },

                              ]
                          },
                        ]
                    },
                  {
                      id: "podistview",
                      view: "datatable",
                      name: 'Request based',
                      select: 'row',
                      scrollX: true,
                      minWidth: 900,
                      //css: 'pohight',
                      columns: [
                                           { header: "Sno", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                           { header: "Product Name", id: "", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '4', },
                                           { header: "Line Type", id: "PRODID", editor: "text", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                                           { header: "Uom", id: "id", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                                           { header: "PO Units", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                                           { header: "Property", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '4', },
                                           { header: "Unit	   ", id: "id", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                                           { header: "Cost Center Qty", id: "id1", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                                           { header: "Distributed", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '3', },

                      ],
                      editable: true,
                       ready: function () { },
                      data: [
                  { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                  { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                      ],
                  },
                ]
            }
          ]
      }
    ]
},

                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_actbtn",
                    padding: { right: 10, },
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("PODistr").hide();
                        //$$("draft").setValue("0")
                    }
                },

            ]
        }
    }).show();
}
function fnaddinfonewPopup1() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "Other Information",
        id: 'PODistr',
        position: "center",
        body: {//template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
            rows: [
{
    //type: "space",
    //padding: 8,
    rows: [
      {
          type: "clean",
          rows: [
            {
                borderless: true, view: "tabbar", id: 'tabbar',
                selected: 'listView', multiview: true, options: [
                { value: 'Other Charges  &  Terms', id: 'podist', },
                { value: 'Delivery Location  &  Narration', id: 'podistview' },

                ]
            },
            {
                animate: {
                    type: "slide",
                    direction: "left"
                },
                fitBiggest: true,
                cells: [
                    {
                        id: "podist",
                        view: "form",
                        elementsConfig: {
                            width: 200,
                        },

                        elements: [
                              //{
                              //    view: "template",
                              //    template: "Other Chargers",
                              //     type:"section",
                              //    align: 'center',
                              //    css: 'addinfohdrtlt',
                              //},

                         {

                             view: "datatable",
                             name: '',
                             select: 'row',
                             scrollX: true,
                             maxHeight: 200,
                             // maxHeight: 300,
                             // padding: 5,
                             css: '',
                             columns: [
                                                  { header: "Taxes", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                                  { header: "%", id: "id", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", fillspace: '1', },
                                                  { header: "Amount", id: "PRODID", width: wid_8, editor: "text", css: { 'text-align': 'center ! important' }, fillspace: '2', editor: "text", suggest: [] },
                                                  { header: "Tax Code", id: "id", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                             //                   { header: "Top Item", id: "id1", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                             //                   { header: "Created BY", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                             //                   { header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "id2", css: { 'text-align': 'center ! important' }, fillspace: '1', },

                             //
                             ],
                             //scrollX: true,
                             //scroll: "auto",
                             //autoConfig: true,
                             editable: true,
                             resizeColumn: { headerOnly: true },
                             fixedRowHeight: false, rowLineHeight: 25, rowHeight: 25,
                             css: "wrap",
                             ready: function () { },
                             data: [
                             { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                             { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                             ],
                         },
                          {
                              rows: [
                                  {
                                      cols: [{},
                                          {},


                                          { view: "text", placeholder: "Total Value", label: 'Total Value', width: 200, inputWidth: 180, },
                                        { view: "text", placeholder: "Round Off", label: 'Round Off', width: 300, inputWidth: 250, },
                                        { view: "text", css: '', placeholder: "Order Value", labelWidth: 100, label: 'Order Value', inputWidth: 350, width: 400, },
                                      ]
                                  },

                              ]
                          },
                            {
                                view: "template",
                                template: "Terms",
                                type: "section",
                                //  height:20,
                                align: 'center',
                                css: 'Text-primary',
                            },
                             {

                                 view: "datatable",
                                 id: "PRreorderGrid1",
                                 name: 'PRreorderGrid',
                                 select: 'row',
                                 //css: 'pohight',
                                 maxHeight: 180,
                                 scrollX: true,
                                 columns: [
                                           { header: ["Payment Terms", ], id: "", css: { 'text-align': 'center ! important' }, fillspace: '2', },
                                           { header: ["", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                                           //{ header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "", css: { 'text-align': 'center ! important' }, fillspace: '1', },
                                           //{ header: { content: "masterCheckbox" }, template: "{common.checkbox()}", id: "", css: { 'text-align': 'center ! important' }, fillspace: '1', },

                                 ],
                                 editable: true,
                                 fixedRowHeight: false,
                                 rowLineHeight: 25,
                                 rowHeight: 25,
                                 //maxHeight: 200,
                                 data: [
                                  { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                  { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                 ],
                             },
                                 {
                                     rows: [
                                         {
                                             cols: [



                                               { view: "text", placeholder: "", label: 'Your Ref', width: 500, inputWidth: 450, },
                                               { view: "text", placeholder: "", label: 'Our Ref', width: 500, inputWidth: 450, },
                                               { view: "datepicker", placeholder: "", labelWidth: 100, label: 'Deliver Before', inputWidth: 250, width: 400, },
                                               {
                                                   view: "button",
                                                   id: '',
                                                   type: "htmlbutton",
                                                   css: "mp_actbtn",
                                                   label: "General Terms",
                                                   width: 400,
                                                   autowidth: true,
                                                   align: 'right',
                                               },
                                             ]
                                         },

                                     ]
                                 },
                        ]
                    },
                    {
                        id: "podistview",
                        view: "form",
                        elementsConfig: {
                            width: 200,
                        },

                        elements: [


        {
            rows: [
                {
                    cols: [
                         {
                             view: "template",
                             template: "Suppliers Address",
                             type: "header",
                             align: 'center',
                             css: 'addinfohdrtlt',
                         },
                    ]
                },
        {
            padding: 5,
            cols: [
                { width: 10, },
                                {
                                    view: 'richselect',
                                    //  label: 'Poperty',
                                    placeholder: 'Select Property',
                                    id: '',
                                    value: '',
                                    options: [],
                                    labelWidth: 100,
                                    //inputWidth: 300,
                                    gravity: 1,
                                },
                 {
                     view: 'combo',
                     //label: 'Location',
                     id: '',
                     placeholder: 'Select Location',
                     value: '',
                     options: [],
                     labelWidth: 100,
                     //inputWidth: 300,
                     gravity: 1,
                 },
                { width: 10, },
            ]
        },
{},



      {
          minWidth: 330,
          cols: [
               { width: 10, },
              {
                  view: "fieldset", label: "Supplier Address",
                  body: {
                      rows: [
                          {
                              view: 'textarea',
                              //label: 'Location',
                              id: '',
                              placeholder: 'Address',
                              value: '',
                              options: [],
                              labelWidth: 100,
                              //inputWidth: 300,
                              gravity: 1,
                              inputWidth: 300,
                              minHeight: 160,
                          },
                      { height: 10, },
                      ]
                  }
              },
                { width: 5, },
          ]
      },
            ]
        },



{
    rows: [
                {
                    cols: [{
                        css: 'addinfohdrtlt',
                        view: "template",
                        template: "Narration",
                        type: "header",
                        align: 'center',
                    },
                    ]
                },
   {
       view: 'textarea',
       label: 'Narration',
       id: 'NarrationTxt',
       labelPosition: "top",
       inputHeight: 80,
       inputWidth: 450,
       minWidth: 675,
       height: 100,
       on: {
           onChange: function () {
           }
       }
   },
                    {
                        view: 'textarea',
                        label: 'Supplier Narration',
                        id: 'SupNarrationTxt',
                        labelPosition: "top",
                        inputHeight: 80,
                        inputWidth: 450,
                        minWidth: 675,
                        height: 100,
                        on: {
                            onChange: function () {

                            }
                        }
                    },
                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("Narrationpop").hide();
                        //$$("draft").setValue("0")
                    }
                },
    ]

},

                        ]
                    },

                ]
            }
          ]
      }
    ]
},

                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_actbtn",
                    padding: { right: 10, },
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("PODistr").hide();
                        //$$("draft").setValue("0")
                    }
                },

            ]
        }
    }).show();
}
function fndocupPopup() {
    webix.ui({
        view: "window",
        height: 350,
        width: 300,
        head: "Documents Upload",
        id: 'Documentspop',
        position: "center",
        body: {
            //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
            rows: [
      {
          view: "uploader", value: 'Upload Documents', css: 'mp_btn', link: "mytemplate",
          upload: "//docs.webix.com/samples/21_upload/php/upload.php", width: 300,
          name: "files", id: "files"
      },
      {
          id: "mytemplate", autoheight: true,
          template: function (data) {
              var names = [];
              if (data.each)
                  data.each(function (obj) {
                      if (obj.status == "server")
                          names.push("<a target='__blank' href='//docs.webix.com/samples/21_upload/php/files/" + obj.name + "'>" + obj.name + "</a>");
                      else
                          names.push(obj.name);
                  });
              return names.join(", &nbsp;&nbsp;&nbsp; ");
          },
          borderless: true
      },
      {
          view: "text",
          //label: 'PR Value',
          id: 'text1',
          width: 300,
          labelWidth: 100,
          //inputWidth: 150,
          gravity: 1,
          placeholder: "File Details"
      },
{
    view: "button",
    id: 'ok',
    type: "htmlbutton",
    css: "mp_btn",
    label: "Ok",
    autowidth: true,
    align: 'right',
    click: function () {
        $$("Documentspop").hide();
        // $$("draft").setValue("0")
    }
},
            ]
        }
    }).show();
}
function fnamendPopup() {
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "Amendment",
        id: 'Amend',
        position: "center",
        body: {

            //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
            rows: [

{
    cols: [


{
    view: 'richselect',
    label: 'Store',
    id: 'POTypeDDL1',
    value: '',
    options: [],
    labelWidth: 100,
    //inputWidth: 300,
    gravity: 1,
},

{
    view: 'richselect',
    label: 'Reorder Item Group',
    id: 'POTypeDDL2',
    value: '',
    css: 'ml-4',
    options: [],
    labelWidth: 150,
    //inputWidth: 300,
    gravity: 1,
},
{
    align: 'center',
    view: "button",
    id: "my_button",
    value: "Generate",

    css: "mp_btn",


    inputWidth: 100
},
    ]
},


          {
              view: 'form',
              // width: 768,
              elements: [
                  {
                      rows: [

                          {
                              view: "datatable",
                              id: "PRreorderGrid",
                              name: 'PRreorderGrid',
                              select: 'row',
                              scrollX: true,
                              columns: [
                                        { header: ["Sno", ], id: "", width: 50, css: { 'text-align': 'center ! important' } },
                                        { header: ["Prod ID", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: ["Prod Name", ], id: "", width: 150, css: { 'text-align': 'left ! important' } },
                                        { header: [" Uom	", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: ["Reodrder Level", ], id: "", width: 150, css: { 'text-align': 'left ! important' } },
                                        { header: ["Max Stock Qty", ], id: "", width: 100, css: { 'text-align': 'center ! important' } },
                                        { header: ["Stock Qty", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: [" Reoder Qty", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: [" Accept		", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: ["Final Qty", ], id: "", width: 100, css: { 'text-align': 'left ! important', fillspace: 2, } },
                                        { header: [" Rate			", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: ["Amount	       ", ], id: "", width: 100, css: { 'text-align': 'left ! important' } },

                              ],

                              editable: true,
                              minWidth: 550,
                              fixedRowHeight: false,
                              rowLineHeight: 28,
                              rowHeight: 28,
                              // height: 400,
                              data: [],

                          },


                      ]
                  }
              ]
          },

            {
                view: "button",
                id: 'ok',
                type: "htmlbutton",
                css: "mp_btn",
                label: "Ok",
                autowidth: true,
                align: 'right',
                click: function () {
                    $$("Amend").hide();
                    //$$("draft").setValue("0")
                }
            },

            ]
        }
    }).show();
}
function fnaddinfonewPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        modal: true,
        fullscreen: true,
        move: true,
        close: true,
        head: "Other Information",
        id: 'POOtherInfoPopUp',
        position: "center",
        body: {
            rows: [
              {

                  borderless: true, view: "tabbar", id: 'tabbar',
                  selected: 'listView', multiview: true, options: [
                  { value: 'Other Charges  &  Terms', id: 'podist', },
                  { value: 'Delivery Location  &  Narration', id: 'podistview' },
                  ]
              },
              {
                  animate: {
                      type: "slide",
                      direction: "left"
                  },
                  fitBiggest: true,
                  cells: [
                      {
                          id: "podist",
                          view: "form",
                          elements: [
                              {
                                  cols: [
                                      {
                                          rows: [
                                               {
                                                   view: "template",
                                                   template: "Other Chargers",
                                                   type: "section",
                                                   align: 'center',
                                                   css: 'addinfohdrtlt',
                                               },
                                               {
                                                   view: "datatable",
                                                   name: 'TaxDiscDt',
                                                   id: 'TaxDiscDt',
                                                   select: 'row',
                                                   scrollX: true,
                                                   height: 250,
                                                   columns: [
                                                                        { header: "Taxes", id: "Tax_Nm", css: { 'text-align': 'left ! important' }, width: wid_15 },
                                                                        { header: "%", id: "Disc_Per", width: wid_10,numberFormat: "1.00", css: { 'text-align': 'center ! important' }, editor: "text", },
                                                                        { header: "Amount", id: "Disc_Rate", width: wid_10,numberFormat: "1.00", editor: "text", css: { 'text-align': 'center ! important' },  editor: "text", },
                                                                        { header: "Tax Code", id: "Tax_Code", width: wid_15, css: { 'text-align': 'left ! important' }, editor: "richselect", options: [] },
                                                                        { header: "", id: "Tax_Id", width: wid_8, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                        { header: "", id: "Tax_Ind", width: wid_8, css: { 'text-align': 'left ! important' },hidden:true },

                                                   ],
                                                   editable: true,
                                                   data: [{}],
                                                   scheme: {
                                                       $change: function (item) {
                                                           if (item.Tax_Ind == 0) {
                                                               item.$css = "TaxCodeClr";
                                                           }
                                                           
                                                       }
                                                   },
                                                   on: {
                                                       'onBeforeEditStart': function (id) {
                                                           var getval = this.getItem(id.row);
                                                           if (getval.Tax_Ind == 1) {
                                                               return true;
                                                           }
                                                           else {
                                                               return false;
                                                           }
                                                       }
                                                   }
                                               },
                                               { height: 5, },
                                               { view: "text", format: "1.00", disabled: true, placeholder: "00.00", label: 'Tax Value', id: 'AmtTotTax', inputWidth: 250, align: "right", },
                                          ]
                                      },

                                     { width: 30, },
                                      {
                                          rows: [
                              {
                                  view: "template",
                                  template: "Terms",
                                  type: "section",
                                  align: 'center',
                                  css: 'Text-primary',
                              },
                               {
                                   view: "datatable",
                                   id: "PRreorderGrid1",
                                   name: 'PRreorderGrid',
                                   select: 'row',
                                   // maxWidth: 600,
                                   height: 250,
                                   scrollX: true,
                                   columns: [
                                             { header: ["Payment Terms", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '1', },
                                             { header: ["", ], id: "", css: { 'text-align': 'left ! important' }, fillspace: '2', },
                                              { header: ["", ], id: "", css: { 'text-align': 'center ! important' }, width: wid_4, },
                                             { header: ["", ], id: "", css: { 'text-align': 'center ! important' }, width: wid_4, },
                                   ],
                                   editable: true,
                                   data: [
                                    { id: 1, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                    { id: 2, id0: "The Shawshank Redemption", id1: "dddd", id2: "dddd", id3: "dddd", id4: "dddd", id5: "dddd", id6: "dddd", id7: "dddd", id8: "dddd", id9: "dddd", id10: "dddd", id11: "dddd", id12: "dddd", id13: "dddd", id14: "dddd", id15: "dddd", },
                                   ],
                               },
                                   { height: 5, },
                                                { view: "text", placeholder: "", label: 'Your Ref', labelWidth: 130, inputWidth: 500, align: "right", },
                                                { view: "text", placeholder: "", label: 'Our Ref', labelWidth: 130, inputWidth: 500, align: "right", },
                                                { view: "datepicker", placeholder: "", label: 'Deliver Before', alignLabel: 'left', inputWidth: 280, labelWidth: 130, align: "right", },
                                                { view: "button", id: '', type: "htmlbutton", css: "mp_actbtn", label: "General Terms", align: 'right', inputWidth: 150, align: "left", },
                                          ]
                                      },
                                  ]
                              },
                          ]
                      },
                      {
                          id: "podistview",
                          view: "form",
                          elements: [
          {
              rows: [
                  {
                      cols: [
                           {
                               view: "template",
                               template: "Suppliers Address",
                               type: "header",
                               align: 'center',
                               css: 'addinfohdrtlt',
                           },
                      ]
                  },
          {
              padding: 5,
              cols: [
                  { width: 10, },
                                  {
                                      view: 'richselect',
                                      //  label: 'Poperty',
                                      placeholder: 'Select Property',
                                      id: '',
                                      value: '',
                                      options: [],
                                      labelWidth: 100,
                                      //inputWidth: 300,
                                      gravity: 1,
                                  },
                   {
                       view: 'combo',
                       //label: 'Location',
                       id: '',
                       placeholder: 'Select Location',
                       value: '',
                       options: [],
                       labelWidth: 100,
                       //inputWidth: 300,
                       gravity: 1,
                   },
                  { width: 10, },
              ]
          },
  { width: 10, },
        {
            minWidth: 330,
            cols: [
                 { width: 10, },
                {
                    view: "fieldset", label: "Supplier Address",
                    body: {
                        rows: [
                            {
                                view: 'textarea',
                                //label: 'Location',
                                id: '',
                                placeholder: 'Address',
                                value: '',
                                options: [],
                                labelWidth: 100,
                                //inputWidth: 300,
                                gravity: 1,
                                inputWidth: 300,
                                minHeight: 160,
                            },
                        { height: 10, },
                        ]
                    }
                },
                  { width: 5, },
            ]
        },
              ]
          },
  {
      rows: [
                  {
                      cols: [{
                          css: 'addinfohdrtlt',
                          view: "template",
                          template: "Narration",
                          type: "header",
                          align: 'center',
                      },
                      ]
                  },
     {
         view: 'textarea',
         label: 'Narration',
         id: 'NarrationTxt',
         labelPosition: "top",
         inputHeight: 80,
         inputWidth: 450,
         minWidth: 675,
         height: 100,
         on: {
             onChange: function () {
             }
         }
     },
                      {
                          view: 'textarea',
                          label: 'Supplier Narration',
                          id: 'SupNarrationTxt',
                          labelPosition: "top",
                          inputHeight: 80,
                          inputWidth: 450,
                          minWidth: 675,
                          height: 100,
                          on: {
                              onChange: function () {

                              }
                          }
                      },
                  {
                      view: "button",
                      id: 'ok',
                      type: "htmlbutton",
                      css: "mp_btn",
                      label: "Ok",
                      autowidth: true,
                      align: 'right',
                      click: function () {
                          $$("Narrationpop").hide();
                          //$$("draft").setValue("0")
                      }
                  },
      ]

  },

                          ]
                      },



                  ]
              },
                      {
                          view: "button",
                          id: 'ok',
                          type: "htmlbutton",
                          css: "mp_actbtn",
                          padding: { right: 10, },
                          label: "Ok",
                          autowidth: true,
                          align: 'right',
                          click: function () {
                              $$("PODistr").hide();
                              //$$("draft").setValue("0")
                          }
                      },

            ]
        }
    });
}