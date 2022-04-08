
    var app = angular.module('BQTApp', ['webix']);

    app.controller("BQMasterController", function ($scope) {
        var searchicon = "<span class='webix_icon wxi-search'></span>";
        $("#LoadDIv").hide();
        fnLoadMUTAX();
        fnLoadPlnItemValid();
        var TaxStruct=  fnLoadTaxStructure();
        var Pln = $("#hdnPlnItem").val();
        if(Pln=="1"){
        var valid = [{ "id": "A", "value": "None" }, { "id": "I", "value": "Item" }, { "id": "S", "value": "Menu Group" }];
       }
        $scope.frmMstPlanItems = {

            id: "frmMstPlanItems",
            view: 'form',
            minWidth: 1340,
            maxWidth: 1340,
            height: 450,
            elements: [
                {
                    paddingX: 20,
                    rows: [
                       {
                           cols: [
                               {
                                   view: "text",
                                   id: "txtPlanId",
                                   label: "Plan ID",
                                   labelAlign: "Left",
                                   labelWidth: 120,
                                   inputWidth: 210,
                                   width: 210,
                                   attributes: { maxlength: 10 }
                               },
                               {
                                   view: "button",
                                   id: 'btnPlanSrch',
                                   minWidth: 250,
                                   labelWidth: 0,
                                   width: 30,
                                   height: 28,
                                   type: 'icon',
                                   icon: 'wxi-search',
                                   css: "Ar_search",
                                   hidden: true,
                                   on: {
                                       onItemClick: function () {
                                        
                                           fnCallGrpSrchPopup();
                                       }
                                   }
                               },
                               {
                                   id: "ChkActive",
                                   view: "checkbox",
                                   label: "Active",
                                   labelAlign: "Right",
                                   labelWidth: 140,
                                   width: 200,
                                   on: {
                                       "onChange": function () {

                                       }
                                   }
                               }
                           ]
                       },
                       {
                           view: "text",
                           id: "txtPlanNm",
                           label: "Plan Name",
                           labelAlign: "Left",
                           labelWidth: 120,
                           inputWidth: 400,
                           width: 400,
                           attributes: { maxlength: 30 },
                       },

                        {
                            cols: [
                                {
                                    view: "text",
                                    id: "txtRate",
                                    label: "Rate",
                                    labelAlign: "Left",
                                    labelWidth: 120,
                                    inputWidth: 280,
                                    width: 300,
                               
                                   format: "11111111.0000",
                                   attributes: { maxlength: 12 },
                                
                                },

                                {
                                    view: "text",
                                    id: "txtMaxDiscount",
                                    label: "Max Discount%",
                                    labelAlign: "Left",
                                    labelWidth: 100,
                                    inputWidth: 210,
                                    width: 210,
                                    format: "11111111.00",
                                    attributes: { maxlength: 5 }  
                                },

                            ]
                        },
                        {
                            view: "richselect",
                            id: "ddlTaxstruc",
                            label: " Tax Structure",
                            labelAlign: "Left",
                            labelWidth: 120,
                            inputWidth: 400,
                            width: 400,
                            options:TaxStruct,
                            on: {
                                onChange: function (newval, oldval) {
                                }
                            }
                        },

                           {
                               cols: [
                                    {
                                        view: "label",
                                        id: "lblplnitem",
                                        label: " Plan Items",
                                        labelAlign: "Left",
                                        labelWidth: 120,
                                        width: 580,

                                    },
                                 
                                   {
                                       id: "btnDelplnitem",
                                       view: 'button',

                                       type: "icon",
                                       icon: "wxi-trash",
                                       inputWidth: 70,
                                       width: 90,
                                       on: {
                                           onItemClick: function () {
                                               fnCallDelPlnRow();
                                           }
                                       }
                                   },
                                    {
                                        view: "label",
                                        id: "lblpredefitem",
                                        label: "Preferred default Items",
                                        labelAlign: "Left",
                                        labelWidth: 115,
                                        width: 295,
                                   
                                    },
                                    {
                                        id: "btnDelpredefitem",
                                        view: 'button',
                                        type: "icon",
                                        icon: "wxi-trash",
                                        inputWidth: 70,
                                        width: 80,
                                        on: {
                                            onItemClick: function () {
                                                fnCallDelpredefRow();
                                            }
                                        }
                                    },
                                   
                               ]
                           },
                       

                         {
                             cols: [
                                 {
                                    view: "datatable",
                                     id: "grdPlanItem",
                                     select: "row",
                                     data: [],
                                     height: 250,
                                     minWidth: 400,
                                     width:660,
                                     editable: true,
                                     scroll: true,
                                     columns: [
                                             { header: "Id", id: "ITEM_id", width: 30, hidden: true, },

                                               { header: "Item Name", id: "ITEM_NM", width: 180, css: { 'text-align': 'right ! important' }, attributes: { maxlength: 25 }, editor: 'text', liveEdit: true },

                                                { header: "Qty", id: "QTY", width: 50, format: webix.i18n.intFormat, css: { 'text-align': 'right ! important' }, value: 1, attributes: { maxlength: 8 }, editor: 'text', liveEdit: true, },

                                                { header: "SeqNo", id: "D_SQ", width: 80, css: { 'text-align': 'right ! important' }, format: webix.i18n.intFormat, editor: 'text', liveEdit: true },
                                               
                                               { header: "Validate For", id: "VALID_FOR", width: 130, hidden: (Pln == "1" ? false : true), css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return valid; } },
                                         
                                               { header: "Id", id: "PROD_ID", width: 30, hidden: true, },
                                                { header: "Id", id: "PROD_GR_ID", width: 30, hidden: true, },
                                                { header: "Item/Sub Group", id: "vIGRPNM", width: 160, css: { 'text-align': 'right ! important' }, hidden: (Pln == "1" ? false : true),  },
                                                { header: "", id: "btnISrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' }, hidden: (Pln == "1" ? false : true), },
                                     ],
                                     rules: {
                                         ITEM_NM: webix.rules.isNotEmpty,
                                         D_SQ: webix.rules.isNotEmpty,

                                     },
                                     on: {
                                         'onKeyPress': function (e, id) {
                                             debugger;
                                             if (e == 40) {
                                                 fngrdPlanItemRowAdd();

                                                 $$("grdPlanItem").refresh();
                                             }
                                         },
                                         'onAfterEditStart': function (id) {                                          
                                             if (id.column == 'QTY')
                                                 this.getEditor().getInputNode().setAttribute("maxlength", 5);
                                             if (id.column == 'D_SQ')
                                                 this.getEditor().getInputNode().setAttribute("maxlength", 5);
                                             if (id.column == 'ITEM_NM')
                                                 this.getEditor().getInputNode().setAttribute("maxlength", 25);
                                             $$("grdPlanItem").refresh();

                                         },
                                         'onEditorChange': function (id, value, row) {
                                             debugger;
                                             var getval = this.getItem(id);
                                             getval.vIGRPNM = "";
                                             getval.PROD_GR_ID = "";
                                             getval.PROD_ID = "";
                                             getval.VALID_FOR = value;
                                             $$("grdPlanItem").updateItem(row, getval);
                                             $$("grdPlanItem").refresh();
                                         },
                                         'onItemClick': function (id) {                                          
                                             var getval = this.getItem(id.row);
                                             var getColumn = id.column;

                                             if (getColumn == 'btnISrch') {

                                                 if ($.trim(getval.VALID_FOR) == "I") {

                                                     fnSubGrpSrchPopup("PI");
                                                 }
                                                 else if ($.trim(getval.VALID_FOR) == "S") {

                                                     fnSubGrpMenuPopup();
                                                 }
                                             }
                                             $$("grdPlanItem").refresh();
                                            
                                         },
                                         'onAfterEditStop': function (state, editor) {
                                             debugger;
                                             var dtplanitems = $$("grdPlanItem").getSelectedItem(true);
                                             if (editor.column == 'QTY' ) {
                                                 var Qty = parseInt(dtplanitems[0].QTY);
                                                 if (isNaN(Qty)) {
                                                     dtplanitems[0].QTY = "1";
                                                     AlertMessage("Enter Qty !");
                                                 }
                                             }
                                             else if (editor.column == 'D_SQ') {
                                                 var Dseq = parseInt(dtplanitems[0].D_SQ);
                                                 if (isNaN(Dseq)) {
                                                     dtplanitems[0].D_SQ = "";
                                                     AlertMessage("Enter SeqNo !");

                                                 }
                                             }
                             
                                             $$("grdPlanItem").refresh();
                                         },
                                     },
                                 },
                                 {
                                     view: "datatable",
                                     id: "grdPredefItm",
                                     select: "row",
                                     data: [],
                                     height: 250,
                                     minWidth: 150,
                                     width:370,
                                     editable: true,
                                     scroll: true,
                                     columns: [
                                             { header: "ItemNMID", id: "I_ID", width: 30, hidden: true, },
                                               { header: "Item Name", id: "vItemNm", width: 180, css: { 'text-align': 'right ! important' }, attributes: { maxlength: 25 }, },// editor: 'text', liveEdit: true
                                                  { header: "", id: "btnISrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                { header: "Qty", id: "I_Q", width: 50, format: webix.i18n.intFormat, css: { 'text-align': 'right ! important' },  editor: 'text', liveEdit: true },
                                                { header: "SeqNo", id: "SQ_NO", width: 80, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true },
                                     ],

                                     on: {
                              
                                         'onKeyPress': function (e, id) {
                                             
                                             if (e == 40) {
                                                 fnGrdPredefItmRowAdd();
                                             }
                                         },
           
                                         onAfterEditStart: function (id) {
                                             if (id.column == 'QTY')
                                                 this.getEditor().getInputNode().setAttribute("maxlength", 5);
                                             if (id.column == 'SQ_NO')
                                                 this.getEditor().getInputNode().setAttribute("maxlength", 5);
                                             $$("grdPredefItm").refresh(); 
                                            
                                         },
                                         'onItemClick': function (id) {

                                             var getval = this.getItem(id.row);

                                             if (id.column == 'btnISrch') {

                                                 fnSubGrpSrchPopup("PD");
                                                 fnItemNmSrchPopup();

                                             }
                                           
                                         },
                                         'onAfterEditStop': function (state, editor) {
                                             debugger;
                                             var dtplanitems = $$("grdPredefItm").getSelectedItem(true);


                                             if (editor.column == 'I_Q') {
                                                 var Qty = parseInt(dtplanitems[0].I_Q);
                                                 
                                                
                                                 if (isNaN(Qty)) {
                                                     dtplanitems[0].I_Q = "";
                                                     AlertMessage("Enter Qty !");
                                                  
                                                 }
                                               
                                             }
                                             else if (editor.column == 'SQ_NO') {
                                                 var SQ_NO = parseInt(dtplanitems[0].SQ_NO);
                                                 if (isNaN(SQ_NO)) {
                                                     dtplanitems[0].SQ_NO = "";
                                                     AlertMessage("Enter SeqNo !");
                                                 }
                                             }

                                             $$("grdPredefItm").refresh();
                                         },
                                     
                                     },},
                                 {minwidth:100},
                                
                             ]
                         },

                         {
                             cols: [
                                 {
                                     view: "text",
                                     id: "txtLnkrevenue",
                                     label: "Link Revenue",
                                     labelAlign: "Left",
                                     labelWidth: 120,
                                     inputWidth: 280,
                                     width: 280,
                                     readonly:true,
                                     attributes: { maxlength: 50 }
                                 },
                                 {
                                     view: "button",
                                     id: 'btnRevenueSrch',
                                     minWidth: 250,
                                     labelWidth: 0,
                                     width: 30,
                                     height: 28,
                                     type: 'icon',
                                     icon: 'wxi-search',
                                     css: "Ar_search",
                                    
                                     on: {
                                         onItemClick: function () {
                                             fnLnkRevenueSrchPopup();
                                         }
                                     }
                                 },
                                 {
                                     id: "btnDeltxtrevenue",
                                     view: 'button',

                                     type: "icon",
                                     icon: "wxi-close-circle",
                                     inputWidth: 30,
                                     width: 80,
                                     on: {
                                         onItemClick: function () {
                                             $("#hdnRevenueId").val("");
                                             $$("txtLnkrevenue").setValue("");
                                         }
                                     }
                                 },
                                 
                             ]
                         },
                          {
                              view: "richselect",
                              id: "ddlVatTp",
                              label: "Vat Tp",
                              labelAlign: "Left",
                              hidden: ($("#hdnMU_TAX").val() == "1" ? false : true),
                              labelWidth: 120,
                              inputWidth: 400,
                              width: 400,
                              on: {
                                  onChange: function (newval, oldval) {
                                  }
                              }
                          },
                    ]
                }
            ]
        }
      
    });
    
  
    function fnCallDelPlnRow() {
        var grdPlanItem = $$("grdPlanItem").serialize();
        if (grdPlanItem.length == 1) {
            var SelRow = $$("grdPlanItem").getSelectedId(false);
            $$("grdPlanItem").editStop();
            $$("grdPlanItem").editStop();
            if (SelRow == undefined || SelRow == null) SelRow = $$("grdPlanItem").getLastId();
            $$("grdPlanItem").remove(SelRow);
            $$("grdPlanItem").refresh();
            fngrdPlanItemRowAdd();
            $$("grdPlanItem").refresh();
        }
        if (grdPlanItem.length > 1) {
            var SelRow = $$("grdPlanItem").getSelectedId(false);
            $$("grdPlanItem").editStop();
            if (SelRow == undefined || SelRow == null) SelRow = $$("grdPlanItem").getLastId();
            $$("grdPlanItem").remove(SelRow);
            $$("grdPlanItem").refresh();  
        }
    }

    function fnCallDelpredefRow() {
        var SelRow = $$("grdPredefItm").getSelectedId(false);
        $$("grdPredefItm").editStop();
        if (SelRow == undefined || SelRow == null) SelRow = $$("grdPredefItm").getLastId();
        $$("grdPredefItm").remove(SelRow);
        $$("grdPlanItem").refresh(); 
    }

function fnGrdPredefItmRowAdd() {
    var dtPredefItem = $$("grdPredefItm").serialize();
        for (i = 0; i < dtPredefItem.length; i++) {

            if (($.trim(dtPredefItem[i].vItemNm) == "") && ($.trim(dtPredefItem[i].SQ_NO) == "")) {
                AlertMessage("Cannot Insert empty Row");
                return false;
                $$("grdPlanItem").refresh(); 
            }
        }
        $$("grdPredefItm").editStop();
        $$("grdPredefItm").add({ "I_ID": "", "vItemNm": "", "I_Q": "", "SQ_NO": "" }); 
        $$("grdPredefItm").refresh();
        $$("grdPredefItm").refreshColumns();
}

function fngrdPlanItemRowAdd() {
    var dtplnitem = $$("grdPlanItem").serialize();
        for (i = 0; i < dtplnitem.length; i++) {
            if ($.trim(dtplnitem[i].ITEM_NM) == "") {
                AlertMessage("Item Name Cannot be empty");
                return false;
            }
            if ($.trim(dtplnitem[i].D_SQ) == "") {
                AlertMessage("SeqNo Cannot be empty");
                return false;
            }
            if (dtplnitem[i].VALID_FOR == "I" || dtplnitem[i].VALID_FOR == "S") {
                if (dtplnitem[i].vIGRPNM == null || dtplnitem[i].vIGRPNM == "") {
                    AlertMessage("Item/Sub Group cannot be empty !");
                    return false;
                }
            }
    }
        $$("grdPlanItem").editStop();
        $$("grdPlanItem").add({ "ITEM_id": "", "ITEM_NM": "", "QTY": "1", "D_SQ": "", "VALID_FOR": "", "PROD_ID": "", "PROD_GR_ID": "", "vIGRPNM": "" });  //
        $$("grdPlanItem").refresh();
        $$("grdPlanItem").refreshColumns();
}
                        

function fnDisable() {
    $$("txtPlanId").disable();
    $$("txtPlanNm").disable();
    $$("txtRate").disable();
    $$("txtMaxDiscount").disable();
    $$("ChkActive").disable();
    $$("ddlTaxstruc").disable();
    $$("grdPlanItem").disable();
    $$("grdPredefItm").disable();
    $$("txtLnkrevenue").disable();
    $$("ddlVatTp").disable();
    $$("btnRevenueSrch").disable();
    $$("btnDeltxtrevenue").disable();
    $$("btnDelpredefitem").disable();
    $$("btnDelplnitem").disable();
}

function fnEnable() {
    $$("txtPlanId").enable();
    $$("txtPlanNm").enable();
    $$("txtRate").enable();
    $$("txtMaxDiscount").enable();
    $$("ChkActive").enable();
    $$("ddlTaxstruc").enable();
    $$("grdPlanItem").enable();
    $$("grdPredefItm").enable();
    $$("txtLnkrevenue").enable();
    $$("ddlVatTp").enable();
    $$("btnRevenueSrch").enable();
    $$("btnDeltxtrevenue").enable();
    $$("btnDelpredefitem").enable();
    $$("btnDelplnitem").enable();
}

function fnSavePlanItemData() {
    debugger;
    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }
    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_PLANITEMSSAVE";
    dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["hdnPlnItem"] = $("#hdnPlnItem").val();
    dataparam["hdnRevenueId"] = $("#hdnRevenueId").val();
    dataparam["txtPlanId"] = $.trim($$("txtPlanId").getValue());
    dataparam["ChkActive"] = $.trim($$("ChkActive").getValue());
    dataparam["txtPlanNm"] = $.trim($$("txtPlanNm").getValue());
    dataparam["txtRate"] = $.trim($$("txtRate").getValue());
    dataparam["txtMaxDiscount"] = $.trim($$("txtMaxDiscount").getValue());
    dataparam["ddlTaxstruc"] = $.trim($$("ddlTaxstruc").getValue());
    dataparam["hdnMutax"] = "";
    dataparam["ddlVatTp"] = "";
    if ($("#hdnMU_TAX").val() == "1") {
        dataparam["hdnMutax"] = $("#hdnMU_TAX").val();
       
        dataparam["ddlVatTp"] = $.trim($$("ddlVatTp").getValue());
    }
    var data = $$("grdPlanItem").serialize();
    dataparam["data"] = JSON.stringify(data);
    var data1 = $$("grdPredefItm").serialize();
    dataparam["data1"] = JSON.stringify(data1);
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {

                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
            }
        },
    });
}


function fnLoadTaxStructure() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_TAXSTRUCTURELOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnCallGrpSrchPopup() {

    var Dataset = fnLoadPlnMasterData();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSessionSrch",     
        head: "Session Name Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,     
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
                    id: "grdSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Plan id", id: "BN_ITEM_ID",hidden:true },
                            { header: ["Plan Name", { content: "textFilter" }, ], id: "BN_ITEM_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.BN_ITEM_ID) == $.trim(selectedRows[0].BN_ITEM_ID);
                            });
                            if (Filter1.length > 0) {
                                var planID = $.trim(Filter1[0].BN_ITEM_ID);
                                $$("txtPlanId").setValue($.trim(Filter1[0].BN_ITEM_ID));
                                $$("txtPlanNm").setValue($.trim(Filter1[0].BN_ITEM_NM));
                                $$("txtRate").setValue($.trim(Filter1[0].RATE));
                                var SESSION_DISP_IND = (Filter1[0].SESSION_DISP_IND == null || ($.trim(Filter1[0].SESSION_DISP_IND) == "0") == true ? "0" : "1");
                                $$("ddlTaxstruc").setValue($.trim(Filter1[0].TAX_STRUCT_ID));
                                $$("txtMaxDiscount").setValue($.trim(Filter1[0].SALE_DISC_PER));
                                $$("txtLnkrevenue").setValue($.trim(Filter1[0].REVENUE_NM));
                                $("#hdnRevenueId").val($.trim(Filter1[0].REV_ID));
                                var ChkVal = (Filter1[0].A_IND == null || ($.trim(Filter1[0].A_IND) == "0") == true ? "1" : "0");
                                $$("ChkActive").setValue(ChkVal);
                                $$("grdPlanItem").clearAll();
                                $$("grdPredefItm").clearAll();
                                loadplangrid(planID);
                                loadPredefItmGrid(planID);
                            }

                            $$('PopupSessionSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupSessionSrch').hide();
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

    $$("PopupSessionSrch").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function loadplangrid(planid) {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_LOADPLANGRID";
    dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PlanId"] = planid;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdPlanItem").parse(rowData);
                $$("grdPlanItem").refresh();
            }
        }
    });
}

function loadPredefItmGrid(planid) {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_LOADPREDEFGRID";
    dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PlanId"] = planid;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdPredefItm").parse(rowData);
                $$("grdPredefItm").refresh();
            }
        }
    });
}

function fnLnkRevenueSrchPopup() {

    var Dataset = fnLoadLnkRevenue();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "LnkRevenueSrch",
        head: "Session Name Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
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
                    id: "grdLnkRevenuesrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Revenue id", id: "REVENUE_ID", hidden: true, },
                            { header: ["Revenue Name", { content: "textFilter" }, ], id: "REVENUE_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = $$("grdLnkRevenuesrch").getSelectedItem();
                            var GrdRow = $$("grdLnkRevenuesrch").getSelectedItem();
                            $("#hdnRevenueId").val($.trim(selectedRows.REVENUE_ID));
                            $$("txtLnkrevenue").setValue($.trim(selectedRows.REVENUE_NM));
                            $$('LnkRevenueSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('LnkRevenueSrch').hide();
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

    $$("LnkRevenueSrch").show();

    $$("grdLnkRevenuesrch").clearAll();
    $$("grdLnkRevenuesrch").parse(Dataset);
    $$("grdLnkRevenuesrch").refresh();
}

function fnLoadLnkRevenue() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_LINKREVENUELOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                
            }
        }
    });

     return rowData;
}

function fnLoadSubGrp(load) {
    var LoadGrd = "";
    if (load == "I") {
        LoadGrd = "I";
    }
    else if (load == "S") {
        LoadGrd = "S";
    }
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_SUBGRPLOAD";
    dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["LoadGrd"] = LoadGrd;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

            }
        }
    });

    return rowData;
}

function fnSubGrpMenuPopup() {
      var Dataset = fnLoadSubGrp("S");
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SubGrpMenuSrch",
        head: "Menu Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
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
                    id: "grdSubmenuGrp",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Prod id", id: "G_I", hidden: true, },
                            { header: ["Menu Name", { content: "textFilter" }, ], id: "G_N", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = $$("grdSubmenuGrp").getSelectedItem();
                            var GrdRow = $$("grdPlanItem").getSelectedItem();
                            GrdRow.PROD_GR_ID = ($.trim(selectedRows.G_I));
                            GrdRow.vIGRPNM = ($.trim(selectedRows.G_N));
                            $$("grdPlanItem").refresh();
                            $$('SubGrpMenuSrch').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('SubGrpMenuSrch').hide();
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

    $$("SubGrpMenuSrch").show();

    $$("grdSubmenuGrp").clearAll();
    $$("grdSubmenuGrp").parse(Dataset);
    $$("grdSubmenuGrp").refresh();
}

function fnLoadPlnItemValid() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnPlnItem").val(rowData[0]["R3_Ind"]);
            }
        }
    });
    return rowData;
}

function fnLoadPlnMasterData() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_LOADPLNMASTER";
    dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });

    return rowData;
}

function fnLoadChkPlanID() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PLANID";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });

    return rowData;
}

function fnBQValidate() {
    var Dataset = fnLoadChkPlanID();

    if ($("#hdnCurMode").val() == "N") {

        if ($.trim($$("txtPlanId").getValue()) == "") {

            AlertMessage("Plan Id cannot be empty !");
            return false;

        }
    }

    if ($("#hdnCurMode").val() == "N") {

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.BN_ITEM_ID) == $.trim($$("txtPlanId").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }


    if ($.trim($$("txtPlanNm").getValue()) == "") {

        AlertMessage("Plan Name cannot be empty !");
        return false;

    }
    if ($.trim($$("txtRate").getValue()) == "" || $.trim($$("txtRate").getValue()) == "0") {

        AlertMessage("Rate cannot be empty !");
        return false;

    }
    if ($$("ddlTaxstruc").getValue() == "") {

        AlertMessage("Tax Structure cannot be empty !");
        return false;

    }

    var data = $$("grdPlanItem").serialize();
    var LenPlnItm = data.length;
    if ((LenPlnItm == "0") || (LenPlnItm == null)) {
        AlertMessage("Plan Items cannot be empty Row !");
        return false;
    }
    for (var i = 0; i < LenPlnItm; i++) {

        if ($.trim(data[i].ITEM_NM) == null || $.trim(data[i].ITEM_NM) == "") {
            AlertMessage("Item Name cannot be empty !");
            return false;
        }
        if ($.trim(data[i].QTY) == null || $.trim(data[i].QTY) == "") {
            AlertMessage("Enter Qty !");
            return false;
        }
        else if ($.trim(data[i].D_SQ) == null || $.trim(data[i].D_SQ) == "") {
            AlertMessage("SeqNo cannot be empty !");
            return false;
        }

        if (data[i].VALID_FOR == "I" || data[i].VALID_FOR == "S") {
            if ($.trim(data[i].vIGRPNM) == null || $.trim(data[i].vIGRPNM) == "") {
                AlertMessage("Item/Sub Group cannot be empty !");
                return false;
            }
        }

    }

    var data = $$("grdPredefItm").serialize();
    var LenPredefItm = data.length;
    for (var i = 0; i < LenPredefItm; i++) {

        if ($.trim(data[i].vItemNm) == null || $.trim(data[i].vItemNm) == "") {
            AlertMessage("Item Name cannot be empty !");
            return false;
        }
            if ($.trim(data[i].vItemNm) != null && $.trim(data[i].vItemNm) != "") {
                if ($.trim(data[i].SQ_NO) == null || $.trim(data[i].SQ_NO) == "") {
                    AlertMessage("SeqNo cannot be empty !");
                    return false;
                }
            }
            if ($.trim(data[i].I_Q) == null || $.trim(data[i].I_Q) == "") {
                AlertMessage("Enter Qty !");
                return false;
            }
        }

        return true;
    }

    function fnLoadVatTp() {

        debugger;
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_MST_LOADVATTP";
        dataparam["PROGNAME"] = "GET_MST_PLANITEMS";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/BQMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);
                    $$("ddlVatTp").define("options", rowData);
                }
            }
        });
    }

    function fnLoadMUTAX() {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_MSTCOMPANY";
        dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/BQMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);
                    $("#hdnIN_GST_IND").val(rowData[0]["IN_GST_IND"]);
                    $("#hdnMU_TAX").val(rowData[0]["MUTAX"]);
                }
            }
        });
    }

    function fnSubGrpSrchPopup(GrdType) {

        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "PopupOthrProdSrch",
            head: "Plan Item Search",
            position: "center",
            minWidth: 500,
            maxWidth: 500,
            resizeColumn: true,
            move: true,
            resizeRow: true,
            css: "webix_header_border",
            height: 570,
            body: {
                view: 'form',
                minWidth: 530,
                maxWidth: 530,
                elements: [
                    {
                        rows: [
                            {
                                cols: [
                                    {
                                        view: "richselect",
                                        id: "ddlProdgrp1",
                                        label: "Group",
                                        labelAlign: "Left",
                                        labelWidth: 45,
                                        inputWidth: 190,
                                        width: 200,
                                        on: {
                                            onChange: function (newval, oldval) {
                                                if (oldval != "") {

                                                    var dataparam = {};
                                                    var rowData = [];
                                                    dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                    dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                    dataparam["COMPID"] = $("#hdnCompId").val();
                                                    var DataVal = JSON.stringify(dataparam);
                                                    $.ajax({
                                                        async: false,
                                                        url: "/BQTrans/COMAPI_CALL",
                                                        type: 'POST',
                                                        data: "request=" + DataVal,
                                                        success: function (d) {
                                                            if (d != "") {
                                                                rowData = JSON.parse(d);

                                                                var Prodgrp = rowData.TBLPRODITEM;

                                                                var FilterProd = [];

                                                                if (newval != "00") {
                                                                    FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                        return ($$("ddlProdSubgrp1").getValue() == "00" ? $.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim(newval) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim($$("ddlProdSubgrp1").getValue())));
                                                                    });

                                                                }
                                                                else {
                                                                    FilterProd = Prodgrp;
                                                                }

                                                                $$("grdMProd1").clearAll();
                                                                $$("grdMProd1").parse(FilterProd);
                                                                $$("grdMProd1").refresh();
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                     {
                                         view: "richselect",
                                         id: "ddlProdSubgrp1",
                                         label: "Sub Group",
                                         labelAlign: "Right",
                                         labelWidth: 75,
                                         inputWidth: 260,
                                         width: 260,
                                         on: {
                                             onChange: function (newval, oldval) {
                                                 if (oldval != "") {

                                                     var dataparam = {};
                                                     var rowData = [];
                                                     dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
                                                     dataparam["PROGNAME"] = "GET_BQRESCODE01";
                                                     dataparam["COMPID"] = $("#hdnCompId").val();
                                                     var DataVal = JSON.stringify(dataparam);
                                                     $.ajax({
                                                         async: false,
                                                         url: "/BQTrans/COMAPI_CALL",
                                                         type: 'POST',
                                                         data: "request=" + DataVal,
                                                         success: function (d) {
                                                             if (d != "") {
                                                                 var rowData = JSON.parse(d);

                                                                 var Prodgrp = rowData.TBLPRODITEM;

                                                                 var FilterProd = [];

                                                                 if (newval != "00") {
                                                                     FilterProd = Prodgrp.filter(function (Prodgrp) {
                                                                         return ($$("ddlProdgrp1").getValue() == "00" ? $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval) : ($.trim(Prodgrp.PROD_GR_ID) == $.trim($$("ddlProdgrp1").getValue()) && $.trim(Prodgrp.PROD_SUB_GR_ID) == $.trim(newval)));
                                                                     });

                                                                 }
                                                                 else {
                                                                     FilterProd = Prodgrp;
                                                                 }

                                                                 $$("grdMProd1").clearAll();
                                                                 $$("grdMProd1").parse(FilterProd);
                                                                 $$("grdMProd1").refresh();
                                                             }
                                                         }
                                                     });
                                                 }
                                             }
                                         }
                                     },
                                ]
                            },
                            {
                                view: "datatable",
                                id: "grdMProd1",
                                select: "row",
                                data: [],
                                height: 350,
                                scroll: "y",
                                columns: [
                                        { header: ["Item ID", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' } },
                                        { header: ["Item Name", { content: "textFilter" }], id: "PROD_NM1", width: 350, css: { 'text-align': 'left ! important' } },

                                ],
                                on: {
                                    'onItemDblClick': function (id, e, node) {

                                        if (GrdType == "PI") {
                                            var selectedRows = $$("grdMProd1").getSelectedItem();

                                            var GrdRow = $$("grdPlanItem").getSelectedItem();


                                            GrdRow.PROD_ID = ($.trim(selectedRows.PROD_ID));
                                            GrdRow.vIGRPNM = ($.trim(selectedRows.PROD_NM1));
                                            $$("grdPlanItem").refresh();
                                        }

                                        else if (GrdType == "PD") {
                                            var selectedRows = $$("grdMProd1").getSelectedItem();

                                            var GrdRow = $$("grdPredefItm").getSelectedItem();

                                            GrdRow.I_ID = ($.trim(selectedRows.PROD_ID));
                                            GrdRow.vItemNm = ($.trim(selectedRows.PROD_NM1));
                                            $$("grdPredefItm").refresh();
                                        }
                                        $$('PopupOthrProdSrch').hide();
                                        fnCallMenuDetStore();
                                        $$('PopupOthrProdSrch').hide();
                                    }
                                }
                            }
                        ]
                    },
                    {
                        PaddingY: 20,
                        cols: [
                             {
                                 minWidth: 450,
                                 paddingX: 380,
                                 rows: [
                                     {
                                         cols: [
                                             {
                                                 paddingX: 40,
                                                 view: 'button',
                                                 label: 'Close', type: "icon", icon: "wxi-close-circle",
                                                 width: 70,
                                                 on: {
                                                     onItemClick: function () {
                                                         $$('PopupOthrProdSrch').hide();
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

        fnMenuprodSearch('2');
        $$("PopupOthrProdSrch").show();
    }

    function fnMenuprodSearch(Option) {
        var dataparam = {};
        var rowData = [];
        dataparam["REQTYPE"] = "GET_BQMENUPRODSRCH";
        dataparam["PROGNAME"] = "GET_BQRESCODE01";
        dataparam["COMPID"] = $("#hdnCompId").val();
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/BQTrans/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {
                    rowData = JSON.parse(d);

                    if (Option == '1') {
                        $$("grdMProd").clearAll();
                        $$("grdMProd").parse(rowData.TBLPRODITEM);
                        $$("grdMProd").refresh();

                        $$("ddlProdgrp").define("options", rowData.TBLPRODGR);
                        $$("ddlProdgrp").refresh();

                        $$("ddlProdSubgrp").define("options", rowData.TBLPRODSGR);
                        $$("ddlProdSubgrp").refresh();

                        $$("ddlProdgrp").setValue("00");
                        $$("ddlProdgrp").refresh();

                        $$("ddlProdSubgrp").setValue("00");
                        $$("ddlProdSubgrp").refresh();
                    }
                    else {

                        $$("grdMProd1").clearAll();
                        $$("grdMProd1").parse(rowData.TBLPRODITEM);
                        $$("grdMProd1").refresh();

                        $$("ddlProdgrp1").define("options", rowData.TBLPRODGR);
                        $$("ddlProdgrp1").refresh();

                        $$("ddlProdSubgrp1").define("options", rowData.TBLPRODSGR);
                        $$("ddlProdSubgrp1").refresh();

                        $$("ddlProdgrp1").setValue("00");
                        $$("ddlProdgrp1").refresh();

                        $$("ddlProdSubgrp1").setValue("00");
                        $$("ddlProdSubgrp1").refresh();
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
    }
