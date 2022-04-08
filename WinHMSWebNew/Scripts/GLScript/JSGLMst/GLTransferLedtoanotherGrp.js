var app = angular.module('GLMApp', ['webix']);
function FormLoad()
{
    $("#LoadDIv").hide();
    webix.ui({
        id: "GLTransferLedtoanotherGrp",
        container: 'DivForm',
        view: 'form',
        minWidth: 900,
        css: 'GLTransferLedtoanotherGrp',
        maxWidth: 5000,
        borderless: true,
        ready: function () {
            gridResize("1");
        },
        elements: [
            {
                rows: [
                {
                    cols: [
                    {                     
                        view: "search",
                        id: "TxtLedger",
                        label:"Ledger",
                        readonly: true,
                        inputAlign: "left",
                        labelWidth: 70,
                        width:320,
                            on: {
                                onSearchIconClick: function () {
                                    debugger;
                                    fnCallLedgerSearch();
                                }
                            }
                    }, 
                    {
                        view: "text",
                        id: "TxtReason",
                        width: 300,
                        label: "Reason",
                        labelWidth: 70,
                        inputWidth: 280,
                        attributes: { maxlength: 60 },
                    },
                    { 
                    view: "search",
    id: "TxtGroup",
    label:"Group",
    readonly: true,
    inputAlign: "left",
    labelWidth:70,
    width: 350,                                     
    on: {
        onSearchIconClick: function () {
            debugger;
            fnCallGroupSearch();
        }
    }},
                    ]
                },
                {
                   
                    padding: { left: 5, top:5, right: 2, },
                    type: "space",
                    cols: [
                           {
                               margin: { top: 5, bottom: 2, },
                               padding: {left:2, right:2,},
                               rows: [
                       
                                    //{ view: "label", width: 260, label: "From Group", },

                                    {
                                        view: "template", template: "From Group", type: "header",  width: 260,
                                    },                             
                                 
                                {
                                    view: "tree",
                                    select: true,
                                    id: "TreeFromGrp",
                                    data: [],
                                    minHeight: 450,
                                    maxHeight: 450,
                                    width: 600,
                                    scheme: {                                                                           //Sets Header color
                                        $change: function (item, h) {
                                            debugger;
                                            var Id = item.id;
                                            if (Id.includes("G_") == true) {
                                                item.$css = "TreeGrpClr";
                                            }
                                            if(Id.includes("L_")==true)
                                            {
                                                item.$css="TreeLedClr";
                                            }

                                        }
                                    },
                                    on: {
                                        "onItemClick": function (id, e, node) {

                                        }
                                    }
                                }

                              ]
                           },                            
                           {
                            //paddingX: 5,
                               rows: [
                                  {
                                      view: "template", template: "To Group", type: "header", width: 260,
                                  },
                                {
                                    view: "tree",
                                    select: true,
                                    id: "TreeToGrp",
                                    data: [],
                                    minHeight: 450,
                                    maxHeight: 450,
                                    width: 450,
                                    scheme: {                                                                           //Sets Header color
                                        $change: function (item, h) {
                                            debugger;
                                            var Id = item.id;
                                            if (Id.includes("G_") == true) {
                                                item.$css = "TreeGrpClr";
                                            }

                                        }
                                    },
                                    on: {
                                        "onItemClick": function (id, e, node) {

                                        }
                                    }
                                }

                               ]
                           }
                    ]
                },             
                ]
            }]
    });
}
function fnLoadGlAccTree() {
    debugger;
    var rowDatad = [];

    var GrpIds = "";
    Request = {
        REQTYPE: "GET_GLACCOUNTTREELOAD",
        COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
        GROUP_ID: GrpIds
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                var data = JSON.parse(d);
                rowDatad = data.TBLFRMGRP;
                fnLoadfrmGrp(rowDatad);

                //To Group
                rowDatad = [];
                rowDatad = data.TBLTOGRP;
                fnLoadToGrp(rowDatad);              
            }         
    } 
    })
};
function fnLoadfrmGrp(rowDatad) {
    debugger;
    var TreeArr = [];
    var TreeArr1 = [];
    var TreeArr2 = [];
    var TreeArr3 = [];
    var TreeArr4 = [];
    var TreeArr5 = [];
    for (i = 0; i < rowDatad.length; i++) {
        if (rowDatad[i].AC_ID.trim() == "0001" || rowDatad[i].AC_ID.trim() == "0002" || rowDatad[i].AC_ID.trim() == "0003" || rowDatad[i].AC_ID.trim() == "0004" || rowDatad[i].AC_ID.trim() == "0005") {
            TreeArr2 = [];
            var test1 = {};
            test1['id'] = rowDatad[i].AC_CAT.trim()  + "_" + rowDatad[i].AC_ID.trim();
            test1['value'] = rowDatad[i].AC_NM.trim();
            for (k = 0; k < rowDatad.length; k++) {
                if (rowDatad[k].AC_ID.length == 8 && rowDatad[k].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim()) {
                    TreeArr3 = [];
                    var test2 = {};
                    test2['id'] = rowDatad[k].AC_CAT.trim() + "_" +  rowDatad[k].AC_ID.trim();
                    test2['value'] = rowDatad[k].AC_NM.trim();
                    for (m = 0; m < rowDatad.length; m++) {
                        if (rowDatad[m].AC_ID.length == 12 && rowDatad[m].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[m].AC_ID.substring(0, rowDatad[m].AC_ID.length - 4) == rowDatad[k].AC_ID.trim()) {
                            var test3 = {};
                            test3['id'] = rowDatad[m].AC_CAT.trim() + "_" +  rowDatad[m].AC_ID.trim();
                            test3['value'] = rowDatad[m].AC_NM.trim();
                            for (n = 0; n < rowDatad.length; n++) {
                                if (rowDatad[n].AC_ID.length == 16 && rowDatad[n].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[n].AC_ID.substring(0, rowDatad[n].AC_ID.length - 4) == rowDatad[m].AC_ID.trim()) {
                                    var test4 = {};
                                    test4['id'] = rowDatad[n].AC_CAT.trim() + "_" +  rowDatad[n].AC_ID.trim();
                                    test4['value'] = rowDatad[n].AC_NM.trim();
                                    for (v = 0; v < rowDatad.length; v++) {
                                        if (rowDatad[v].AC_ID.length == 20 && rowDatad[v].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[v].AC_ID.substring(0, rowDatad[v].AC_ID.length - 4) == rowDatad[n].AC_ID.trim()) {
                                            var test5 = {};
                                            test5['id'] = rowDatad[v].AC_CAT.trim() + "_" +  rowDatad[v].AC_ID.trim();
                                            test5['value'] = rowDatad[v].AC_NM.trim();
                                            TreeArr5.push(test5);
                                        }
                                    }
                                    test4['data'] = TreeArr5;
                                    TreeArr4.push(test4);
                                    TreeArr5 = [];
                                }
                            }
                            test3['data'] = TreeArr4;
                            TreeArr3.push(test3);
                            TreeArr4 = [];
                        }
                    }
                    test2['data'] = TreeArr3;
                    TreeArr2.push(test2);
                    TreeArr3 = [];
                }
            }
            test1['data'] = TreeArr2;
            TreeArr1.push(test1);
            TreeArr2 = [];
        }
    }
    $$('TreeFromGrp').clearAll();
    $$("TreeFromGrp").parse(TreeArr1);
    $$("TreeFromGrp").refresh();
    $$("TreeFromGrp").select($$("TreeFromGrp").getFirstId());
    webix.UIManager.setFocus($$("TreeFromGrp"));
    var itemval = $$("TreeFromGrp").getSelectedId();
    $$("TreeFromGrp").select(itemval);    
}
function fnLoadToGrp(rowDatad) {
    debugger;
    var TreeArr = [];
    var TreeArr1 = [];
    var TreeArr2 = [];
    var TreeArr3 = [];
    var TreeArr4 = [];
    var TreeArr5 = [];
    for (i = 0; i < rowDatad.length; i++) {
        if (rowDatad[i].AC_ID.trim() == "0001" || rowDatad[i].AC_ID.trim() == "0002" || rowDatad[i].AC_ID.trim() == "0003" || rowDatad[i].AC_ID.trim() == "0004" || rowDatad[i].AC_ID.trim() == "0005") {
            TreeArr2 = [];
            var test1 = {};
            test1['id'] = rowDatad[i].AC_CAT.trim() + "_"  + rowDatad[i].AC_ID.trim();
            test1['value'] = rowDatad[i].AC_NM.trim();
            for (k = 0; k < rowDatad.length; k++) {
                if (rowDatad[k].AC_ID.length == 8 && rowDatad[k].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim()) {
                    TreeArr3 = [];
                    var test2 = {};
                    test2['id'] = rowDatad[k].AC_CAT.trim() + "_" + rowDatad[k].AC_ID.trim();
                    test2['value'] = rowDatad[k].AC_NM.trim();
                    for (m = 0; m < rowDatad.length; m++) {
                        if (rowDatad[m].AC_ID.length == 12 && rowDatad[m].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[m].AC_ID.substring(0, rowDatad[m].AC_ID.length - 4) == rowDatad[k].AC_ID.trim()) {
                            var test3 = {};
                            test3['id'] = rowDatad[m].AC_CAT.trim() + "_" + rowDatad[m].AC_ID.trim();
                            test3['value'] = rowDatad[m].AC_NM.trim();
                            for (n = 0; n < rowDatad.length; n++) {
                                if (rowDatad[n].AC_ID.length == 16 && rowDatad[n].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[n].AC_ID.substring(0, rowDatad[n].AC_ID.length - 4) == rowDatad[m].AC_ID.trim()) {
                                    var test4 = {};
                                    test4['id'] = rowDatad[n].AC_CAT.trim() + "_" +rowDatad[n].AC_ID.trim();
                                    test4['value'] = rowDatad[n].AC_NM.trim();
                                    for (v = 0; v < rowDatad.length; v++) {
                                        if (rowDatad[v].AC_ID.length == 20 && rowDatad[v].AC_ID.substring(0, 4) == rowDatad[i].AC_ID.trim() && rowDatad[v].AC_ID.substring(0, rowDatad[v].AC_ID.length - 4) == rowDatad[n].AC_ID.trim()) {
                                            var test5 = {};
                                            test5['id'] = rowDatad[v].AC_CAT.trim() + "_" + rowDatad[v].AC_ID.trim();
                                            test5['value'] = rowDatad[v].AC_NM.trim();
                                            TreeArr5.push(test5);
                                        }
                                    }


                                    test4['data'] = TreeArr5;
                                    TreeArr4.push(test4);
                                    TreeArr5 = [];
                                }
                            }
                            test3['data'] = TreeArr4;
                            TreeArr3.push(test3);
                            TreeArr4 = [];
                        }
                    }
                    test2['data'] = TreeArr3;
                    TreeArr2.push(test2);
                    TreeArr3 = [];
                }
            }
            test1['data'] = TreeArr2;
            TreeArr1.push(test1);
            TreeArr2 = [];
        }
    }
    $$('TreeToGrp').clearAll();
    $$("TreeToGrp").parse(TreeArr1);
    $$("TreeToGrp").refresh();
    $$("TreeToGrp").select($$("TreeToGrp").getFirstId());
    webix.UIManager.setFocus($$("TreeToGrp"));
    var itemval = $$("TreeToGrp").getSelectedId();
    //itemval = $("#hdnLedgerId").val();
    //$$("TreeFromGrp").select(itemval);
    // webix.UIManager.setFocus($$("TreeFromGrp"));
   // $$("TreeToGrp").open(itemval);
}
function fnCallLedgerSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupLoadLedger",
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
                    id: "grdLedger",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: "AC_CD", id: "AC_CD", hidden: true },
                               { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            //debugger;
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            $("#hdnLedgerId").val($.trim(selectedRows[0].AC_ID));
                            $$("TxtLedger").setValue(AcNm);
                            
                            var  itemval = "L_" + $("#hdnLedgerId").val();
                            $$("TreeFromGrp").select(itemval);
                            webix.UIManager.setFocus($$("TreeFromGrp"));
                            var AcId=$("#hdnLedgerId").val();
                            AcId = AcId.substring(0,AcId.length-4);
                            $$("TreeFromGrp").open("G_" + AcId, true);
                            // $$("TreeFromGrp").moveSelection("top");
                            //   $$("TreeFromGrp").move(itemval, 0);
                            $$("TreeFromGrp").showItem(itemval)
                            $$('PopupLoadLedger').hide();
                           
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
                                                     $$('PopupLoadLedger').hide();
                                                    
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

    fnLoadLedgerGrid();
    $$("PopupLoadLedger").show();
}
function fnCallGroupSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupLoadGroup",
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
                    id: "grdGroup",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: "AC_CD", id: "AC_CD", hidden: true },
                               { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                            $("#hdnGrpId").val($.trim(selectedRows[0].AC_ID));
                            $$("TxtGroup").setValue(AcNm);
                            var itemval = "G_"+ $("#hdnGrpId").val();
                            $$("TreeToGrp").select(itemval);
                            webix.UIManager.setFocus($$("TreeToGrp"));
                            var AcId = $("#hdnGrpId").val();
                            if(AcId.length>4)  AcId = AcId.substring(0, AcId.length - 4);
                            $$("TreeToGrp").open("G_" + AcId, true);
                            $$("TreeToGrp").showItem(itemval)
                            $$('PopupLoadGroup').hide();

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
                                                     $$('PopupLoadGroup').hide();
                                                     
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

    fnLoadGroupGrid();
    $$("PopupLoadGroup").show();
}
function fnLoadLedgerGrid() {
    debugger;
    var rowDatad = [];
   
    var GrpIds = "";
    Request = {
        REQTYPE: "GET_LEDGERLOAD",
        COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
        GROUP_ID: GrpIds
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("grdLedger").clearAll();
                $$("grdLedger").parse(rowDatad);
                $$("grdLedger").refresh();

            }
        }
    })

};
function fnLoadGroupGrid() {
    debugger;
    var rowDatad = [];

    var GrpIds = "";
    Request = {
        REQTYPE: "GET_GROUPLOAD",
        COMPID: $("#hdnCompId").val(),
        FISCALYEAR: $("#hdnFiscalYr").val(),
        GROUP_ID: GrpIds
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("grdGroup").clearAll();
                $$("grdGroup").parse(rowDatad);
                $$("grdGroup").refresh();

            }
        }
    })

};
function fnTransLedtoGrpSave() {
    debugger;
    var L_AC_ID = $$("TreeFromGrp").getSelectedId();
   
    var D_GRP = $$("TreeToGrp").getSelectedId();
  
    if (L_AC_ID == ""|| L_AC_ID.includes("G_")) {
        AlertMessage("Select From Ledger...!");
        return false;
    }

    if (D_GRP == "") {
        AlertMessage("Select To Group...!");
        return false;
    }
    if (L_AC_ID.length > 13)
    {
        if (L_AC_ID.substring(2, 14) == "000100010001" || L_AC_ID.substring(2, 14) == "000100010003") {
            AlertMessage("Reserved Ledger not allowed to move...!");
            return false;
        }
    }
    if (D_GRP.length > 13) {
        if (D_GRP.substring(2, 14) == "000100010001" ||  D_GRP.substring(2, 14) == "000100010002" || D_GRP.substring(2, 14) == "000100010003") {
            AlertMessage("Ledger not allowed to move to Reserved Group...!");
            return false;
        }
    }
   
    //if (L_AC_ID.substring(2, 6) == D_GRP.substring(2, 6))
    //{
    //    AlertMessage("Same Group Not allowed...!");
    //    return false;
    //}

    if ($$("TxtReason").getValue() == "") {
        AlertMessage("Reason cannot be empty !");
        return false;
    }
        

    L_AC_ID = L_AC_ID.substring(2, L_AC_ID.length);
    D_GRP = D_GRP.substring(2, D_GRP.length);
   
    webix.confirm({
        title: "Confirmation ",
        ok: "Yes", cancel: "No",
        text: "Are you sure want to move ledger ?"
    })
       .then(function () {
      
           $("#LoadDIv").show();
        var rowDatad = [];
      //  $('#btnSave').prop('disabled', true);
        Request = {
            REQTYPE: "GET_TRANSFERLEDGTOGRPSAVE",
            COMPID: $("#hdnCompId").val(),
            FISCALYEAR: $("#hdnFiscalYr").val(),
            L_AC_ID: $.trim(L_AC_ID),
            S_GRP: "",
            D_GRP: D_GRP,
            Reason:  $.trim($$("TxtReason").getValue()).replace(/&/g, '~'),
        }

        var DataVal = JSON.stringify(Request);
        $.ajax({
            async: true,
            cache: false,
            url: "/GLMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                //debugger;
                if (d != "" && d != undefined && d != null) {
                    rowDatad = d;//JSON.parse(d);
                    if ($.trim(rowDatad) == "s")
                    {
                        AlertMessage("Moved Successfully");
                        $$("TxtReason").setValue("");
                        $$("TxtLedger").setValue("");
                        $$("TxtGroup").setValue("");
                        $("#hdnLedgerId").val("");
                        $("#hdnGrpId").val("");
                        $$('TreeFromGrp').clearAll();
                        $$('TreeToGrp').clearAll();
                        fnLoadGlAccTree();
                       
                    }
                    else {
                        AlertMessage($.trim(rowDatad));
                    }
                    $("#LoadDIv").hide();
                
                  

                }
                else
                {
                    AlertMessage("Error");
                    $("#LoadDIv").hide();
                }
            }
        })

       })
    .fail(function () {

    });

   
    

    

};
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
function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        labelwidth: 1,
        inputwidth: 180,
        width: 250,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnPropertyLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
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
webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("GLTransferLedtoanotherGrp").define("width", vWidth);
    $$("GLTransferLedtoanotherGrp").resize();


    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    var vWidth1 = window.innerWidth
                                  || document.documentElement.clientWidth
                                  || document.body.clientWidth;
  
    $$("GLTransferLedtoanotherGrp").define("height", vheight - 50);//100
    $$("GLTransferLedtoanotherGrp").resize();

    
   
 
}