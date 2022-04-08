
var app = angular.module('BQTApp', ['webix']); 

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();

  
    var valid = [ 
        { "id": "P", "value": "PS - Outlet Item Master" },
        { "id": "B", "value": "Banquet Item Master" }];


    
    var focost = fnLoadBanquetGrpCost();
    var foAnalysisGroup = fnLoadBanquetGrpAnalysisGrp();

    
    $scope.frmMstBanquetGroup = {

        id: "frmMstBanquetGroup",
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
                             id: "txtItemGroupId",
                             label: "Item Group ID",
                             labelAlign: "Right",
                             labelWidth: 180,
                             inputWidth: 280,
                             width: 280,
                             attributes: { maxlength: 1 },
                       

                         },
                           
                           {
                               view: "button",
                               id: 'btnGroupSrch',
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
                                       fnCallItemGrpSrchPopup();
                                   }
                               }
                           },
                       ]
                   },
                   
                   {
                       view: "text",
                       id: "txtItemGroupName",
                       label: "Item Group Name",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 280,
                       width: 300,
                       attributes: { maxlength: 20 }
                   },
                   {
                       view: "text",
                       id: "txtDisplaySqNo",
                       label: "Display Seq No ",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 280,
                       width: 300,
                       attributes: { maxlength: 2 },
                       pattern: { mask: "##", allow: /[0-9]/g },
                   },
                    {
                        view: "richselect",
                        id: "ddlItemType",
                        label: "Item Type ",
                        labelAlign: "Right",
                        labelWidth: 180,
                        inputWidth: 400,
                        width: 400,
                        attributes: { maxlength: 25 },
                        options: valid,
                        value: "P",
                        on: {
                            onChange: function (newval, oldval) {
                                fnchangeItmType();
                                if ($.trim(newval) == "P") {
                                    $$("ddlItemFoodCstPrdGrp").enable();

                                }
                                else if (($.trim(newval) == "B"))
                                {
                                    $$("ddlItemFoodCstPrdGrp").disable();
                                }
                            }
                        }
                    },
                   {
                       id: "ChkApplicFood",
                       view: "checkbox",
                       label: "Applicable For Food Costing",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 280,
                       width: 300,
                       value:"  ",
                       on: {
                           onChange: function (newval, oldval) {
                               if ($.trim(newval) == "1") {
                                   $$("ddlItemFoodCstPrdGrp").enable();

                               } else if ($.trim(newval) == "1" && ddlItemType.getValue=="B")
                               {
                                   $$("ddlItemFoodCstPrdGrp").enable();
                               }

                               else {
                                   $$("txtLnkrevenue").disable();
                                  //$$("ddlItemFoodCstPrdGrp").disable();
                               }
                           }
                       }
                   },
                    {
                        view: "richselect",
                        id: "ddlItemFoodCstPrdGrp",
                        label: "Food  Cost Product Group ",
                        labelAlign: "Right",
                        labelWidth: 180,
                        inputWidth: 400,
                        width: 400,
                        options: focost,
                        attributes: { maxlength: 25 },
                       
                        on: {
                            onChange: function (newval, oldval) {
                            }
                        }
                    },
                    

                  {
                      cols:[
                   {
                       view: "richselect",
                       id: "ddlAnalysisGroup",
                       label: "Analysis Group ",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 400,
                       width: 400,
                       options: foAnalysisGroup,
                       attributes: { maxlength: 25 },
                       //hidden:true,
                     
                       on: {
                           onChange: function (newval, oldval) {
                           }
                       }
                   },
                 
                           {
                               view: "text",
                               id: "txtLnkrevenue",
                               label: "Link Revenue",
                               labelAlign: "Right",
                               labelWidth: 180,
                               inputWidth: 280,
                               width: 300,
                               readonly: true,
                               attributes: { maxlength: 50 },
                               hidden:true,
                               // hidden: ($("#hdnBkrAppl").val() == "1" ? false : true),
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
                                  hidden: true,

                                  on: {
                                      onItemClick: function () {
                                          fnLnkRevenueSrchPopup();
                                      }
                                  }
                              }
                           ]
                              },
                      
                   
                            
                               
                              
                { cols:[ {
                    
                    id: "rbtnRpts",
                    view:"label",
                    label: "",
                    labelWidth: 180,
                    inputWidth: 180,
                    width: 180,
                                
                },{
                    id: "rbtnRpt",
                    view: "radio",
                    value: "R",                    
                    labelAlign: "Right",
                    vertical: true,
                    inputWidth: 280,
                    width: 300,
                    height: 60,
                    options: [
                                   { "id": "R", "value": "F&B Charge Group" },
                                   { "id": "D", "value": " Other Charge Group" },
                                
                    ],

                },] },
                   {
                       id: "ChkApplicBudgetApp",
                       view: "checkbox",
                       label: "Applicable For Budget With Apc ",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 280,
                       width: 300,
                       
                       on: {
                           "onChange": function (newval, oldVal) {
                             
                                   if (newval == "1") {
                                       $$("ChkApplicBudget").setValue("0");
                                   }
                                   //else {
                                   //    $$("ChkApplicBudget").setValue("1");
                                   //}
                               

                           }
                       }
                   },
                   {
                       id: "ChkApplicBudget",
                       view: "checkbox",
                       label: "Applicable For Budget",
                       labelAlign: "Right",
                       labelWidth: 180,
                       inputWidth: 280,
                       width: 300,
                      
                       on: {
                           "onChange": function (newval, oldVal) {
                           
                                   if (newval == "1") {
                                       $$("ChkApplicBudgetApp").setValue("0");
                                   }
                                   //else {
                                   //    $$("ChkApplicBudgetApp").setValue("1");
                                   //}
                               
                           }
                       }
                   },
                  
                ]
            }
        ]
    }
});

{
    
function fnDisable() {
    $$("txtItemGroupId").disable();
    $$("txtItemGroupName").disable();
    $$("txtDisplaySqNo").disable();
    $$("ddlItemType").disable();
    $$("ChkApplicFood").disable();
    $$("ddlItemFoodCstPrdGrp").disable()
    $$("ddlAnalysisGroup").disable();
    $$("rbtnRpt").disable();
    $$("ChkApplicBudgetApp").disable();
    $$("ChkApplicBudget").disable();
}

function fnEnable() {
    $$("txtItemGroupId").enable();
    $$("txtItemGroupName").enable();
    $$("txtDisplaySqNo").enable();
    $$("ddlItemType").enable();
    $$("ChkApplicFood").enable();
    $$("ddlItemFoodCstPrdGrp").enable()
    $$("ddlAnalysisGroup").enable();
    $$("rbtnRpt").enable();
    $$("ChkApplicBudgetApp").enable();
    $$("ChkApplicBudget").enable();

}

function ClearData()
    
{
    debugger;
    $$("txtItemGroupId").setValue("");
    $$("txtItemGroupName").setValue("");
    $$("txtDisplaySqNo").setValue("");
    $$("ddlItemType").setValue("");
    $$("ChkApplicFood").setValue("");
    $$("ddlItemFoodCstPrdGrp").setValue("");
    $$("ddlAnalysisGroup").setValue("");
    $$("txtLnkrevenue").setValue("");
    $$("btnRevenueSrch").setValue("");
    $$("rbtnRpt").setValue("");
    $$("ChkApplicBudgetApp").setValue("");
    $$("ChkApplicBudget").setValue("");
  
}

function fnBanquetSaveGroup() {
    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;

    }
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_BANQUETSAVE";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_GROUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["txtItemGroupId"] = $.trim($$("txtItemGroupId").getValue());
    dataparam["txtItemGroupName"] = $.trim($$("txtItemGroupName").getValue());
    dataparam["txtDisplaySqNo"] = $.trim($$("txtDisplaySqNo").getValue());
    dataparam["ddlItemType"] = $.trim($$("ddlItemType").getValue());
    dataparam["ChkApplicFood"] = $.trim($$("ChkApplicFood").getValue());
    dataparam["ddlItemFoodCstPrdGrp"] = $.trim($$("ddlItemFoodCstPrdGrp").getValue());
    dataparam["ddlAnalysisGroup"] = $.trim($$("ddlAnalysisGroup").getValue());
    dataparam["rbtnRpt"] = $.trim($$("rbtnRpt").getValue());
    dataparam["ChkApplicBudgetApp"] = $.trim($$("ChkApplicBudgetApp").getValue());
    dataparam["ChkApplicBudget"] = $.trim($$("ChkApplicBudget").getValue());
    dataparam["hdnRevenueId"] = $("#hdnRevenueId").val();
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
                else if($.trim(rowData) == "false") {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
                else   {
                    AlertMessage($.trim(rowData));
                    $("#LoadDIv").hide();
                    return;
                }

            }

        },
    });
}

function fnBQValidate() {
    debugger;
    if ($("#hdnCurMode").val() == "N") {

        if ($.trim($$("txtItemGroupId").getValue()) == "") {
            AlertMessage("Item Group Item Id cannot be empty !");
            return false;
        }
    }
        if ($.trim($$("txtItemGroupName").getValue()) == "") {
            AlertMessage("Item Group Name cannot be empty !");
            return false;
        }
        if ($.trim($$("txtDisplaySqNo").getValue()) == "") {
            AlertMessage("Display Seq No  cannot be empty !");
            return false;
        }
        if ($.trim($$("ddlItemFoodCstPrdGrp").getValue()) == "") {
            AlertMessage("Food Cost Product Group  cannot be empty !");
            return false;
        }
        if ($.trim($$("ddlAnalysisGroup").getValue()) == "" && $.trim($$("ddlAnalysisGroup").getValue())=="B") {
            AlertMessage("Analysis  Group  cannot be empty !");
            return false;
        }

    var Dataset = fnLoadItemGroup();

        if ($("#hdnCurMode").val() == "N") {
            var Filter3 = Dataset.filter(function (Dataset) {
                return $.trim(Dataset.BN_GR_ID) == $.trim($$("txtItemGroupId").getValue());
            });
            
            if (Filter3.length > 0) {
                AlertMessage("Record Already exisit !");
                return false;
            }
        }

        return true;
    }

function fnLoadBanquetGrpCost() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_BANQUETGrpFooCst";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_GROUP";
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

function fnLoadBanquetGrpAnalysisGrp() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_BANQUETGrpAnalysisGrp";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_GROUP";
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
    debugger;
    return rowData;
}

function fnchangeItmType() {

    var ItemType = $.trim($$("ddlItemType").getValue());
    if (ItemType == "B") {
        $$("txtLnkrevenue").show();
        $$("btnRevenueSrch").show();
        $$("ddlAnalysisGroup").hide();
    }
    else {
        $$("txtLnkrevenue").hide();
        $$("btnRevenueSrch").hide();
        $$("ddlAnalysisGroup").show();
    }

}

function fnLnkRevenueSrchPopup() {

    var Dataset = fnLoadLnkRevenue();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "LnkRevenueSrch",
        head: " Link Revenue Search",
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
                            { header: ["Revenue Name", { content: "textFilter" }, ], id: "Revenue_Nm", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = $$("grdLnkRevenuesrch").getSelectedItem();
                            var GrdRow = $$("grdLnkRevenuesrch").getSelectedItem();


                            $("#hdnRevenueId").val($.trim(selectedRows.REVENUE_ID));
                            $$("txtLnkrevenue").setValue($.trim(selectedRows.Revenue_Nm));


                            // }
                            //var selectedRows = this.getSelectedItem(id.row);

                            //var Filter1 = Dataset.filter(function (Dataset) {
                            //    return $.trim(Dataset.SESSION_ID) == $.trim(selectedRows[0].SESSION_ID);
                            //});

                            //fnLoadDefFunction();

                            //if (Filter1.length > 0) {

                            //    //$$("txtSessionId").setValue($.trim(Filter1[0].SESSION_ID));
                            //    $("#hdnRevenueId").val($.trim(Filter1[0].REVENUE_ID));
                            //    $$("txtLnkrevenue").setValue("");
                            //    $$("txtLnkrevenue").setValue($.trim(Filter1[0].REVENUE_NM));

                            //}

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

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_LnkRevenueLoad";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_GROUP";
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

function fnCallItemGrpSrchPopup() {

    var Dataset = fnLoadItemGroup();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "btnGroupSrch1",
        head: "Item  Group Name Search",
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
                            { header: "ItemGroup id", id: "BN_GR_ID", hidden: true, },
                            { header: ["ItemGroup Name", { content: "textFilter" }, ], id: "BN_GR_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.BN_GR_ID) == $.trim(selectedRows[0].BN_GR_ID);
                            });

                            //fnLoadDefFunction();

                            if (Filter1.length > 0) {

                                $$("txtItemGroupId").setValue($.trim(Filter1[0].BN_GR_ID));
                                $$("txtItemGroupName").setValue($.trim(Filter1[0].BN_GR_NM));
                                $$("txtDisplaySqNo").setValue($.trim(Filter1[0].DISP_SEQ_NO));

                                $$("ddlItemType").setValue($.trim(Filter1[0].ITEM_TYPE));
                                $$("ChkApplicFood").setValue($.trim(Filter1[0].RESERVE_IND));
                                $$("ddlItemFoodCstPrdGrp").setValue($.trim(Filter1[0].LINK_PROD_GR_ID));
                                $$("ddlAnalysisGroup").setValue(Filter1[0].G_ID);
                                var rbtn = (Filter1[0].A_IND ==1 ? "R" : "D");
                                $$("rbtnRpt").setValue(rbtn);
                                $$("txtLnkrevenue").setValue($.trim(Filter1[0].REVENUE_NM));
                                $("#hdnRevenueId").val($.trim(Filter1[0].REVENUE_ID));
                                $$("ChkApplicBudgetApp").setValue(Filter1[0].COVER_IND);
                                if ((Filter1[0]["COVER_IND"] == "1"))
                                {
                                    $$("ChkApplicBudgetApp").setValue("0");
                                    $$("ChkApplicBudget").setValue("0");
                                }
                               else if ((Filter1[0]["COVER_IND"] == "2")) {
                                   
                                    $$("ChkApplicBudget").setValue("1");
                                }
                                else {
                                   $$("ChkApplicBudgetApp").setValue("1");
                                }
                               
                            }


                            $$('btnGroupSrch1').hide();
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
                                                     $$('btnGroupSrch1').hide();
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

    $$("btnGroupSrch1").show();

    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}

function fnLoadItemGroup() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_GroupItemOPEN";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_GROUP";
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
}




