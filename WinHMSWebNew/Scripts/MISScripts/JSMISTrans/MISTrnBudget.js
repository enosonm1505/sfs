
var app = angular.module('MISTApp', ['webix']);
var LoadTrnTy = "";
app.controller("MISTransController", function ($scope) {
  
    
    $("#LoadDIv").hide();
    var dataProp = fnPropertyLoad();
    var dataFyear = fnFyearLoad();
   
  
    var Filter3 = dataProp.filter(function (dataProp) {
        return (dataProp.id == $.trim($("#hdnCompId").val()));
    });

    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmMISTrnBudget = {

        id: "frmMISTrnBudget",
        view: 'form',
        minWidth: 1100,
        //minWidth: 1200,
        //maxWidth:1200,
        borderless:true,
        paddingX: 5,
        elements: [
            {
                paddingX: 5,
                PaddingY: 5,
                rows: [
                   {
                       rows: [
                           {
                               cols: [
                                    {
                                        view: "richselect",
                                        id: "ddlFYear",
                                        value: $("#hdnFiscalYr").val(),
                                        label: "Fiscal Year",
                                        labelAlign: "Left",
                                        labelWidth: 80,
                                        inputWidth: 325,
                                        width: 325,
                                        options: dataFyear,
                                        on: {
                                            onChange: function (newval, oldval) {
                                                GridClear();

                                            }
                                        },
                                    },
                                    {
                                        id: "BtnDisplay",
                                        view: 'button',
                                        label: "Display",
                                        inputWidth: 70,
                                        width: 70,
                                        on: {

                                            onItemClick: function () {
                                                FnLoadMISBudget();
                                            }
                                        }
                                    },
                                    {width:400},
                                
                                   {
                                       view: 'radio',
                                       minWidth: 100,
                                       id: "RadInc",
                                       value: 1,                               
                                       options: [
                                       { "id": 1, "value": "Income" } 
                                       ],                                
                                       on: {
                                           "onChange": function (newValue, oldValue) {
                                               if(newValue==1)
                                               {
                                                   $$("RadExp").setValue(0);
                                                   $$("RadMISGrp").setValue(0);
                                                   $$("RadStat").setValue(0);
                                                   window.GroupIds = "";
                                                   window.LevelIds = "";
                                                   window.LedgerIds = "";
                                                   $$("TxtGroup").setValue("");
                                                   $$("TxtLedger").setValue("");
                                                   $$("TxtLedger").show();
                                                   $$("HidLedger").hide();
                                                   $$("ChkFilterLed").show();
                                                   $$("HidGroup").hide();
                                                   $$("TxtGroup").show();
                                                   $$("HidFilterLed").hide();
                                                   GridClear();
                                               }
                                           }
                                       }
                                     
                                   },
                                    {
                                        view: 'radio',
                                        minWidth: 100,
                                        id: "RadMISGrp",
                                        value: 0,
                                        options: [
                                        { "id": 1, "value": "MIS Group" }
                                        ],

                                        on: {
                                            "onChange": function (newValue, oldValue) {
                                                debugger;
                                                if (newValue == 1) {
                                                    $$("RadExp").setValue(0);
                                                    $$("RadInc").setValue(0);
                                                    $$("RadStat").setValue(0);
                                                    window.GroupIds = "";
                                                    window.LevelIds = "";
                                                    window.LedgerIds = "";
                                                    $$("TxtGroup").setValue("");
                                                    $$("TxtLedger").setValue("");
                                                    $$("HidGroup").hide();
                                                    $$("TxtGroup").show();
                                                    $$("TxtLedger").hide();
                                                    $$("HidLedger").show();
                                                    $$("ChkFilterLed").hide();
                                                    $$("HidFilterLed").show();
                                                    
                                                }
                                                GridClear();
                                            }
                                        }
                                    },
                                     
      
                                 
                                  
                               ]
                           },
                           {
                               cols: [
                                  { width: 325, label: "", id: "HidGroup", hidden: true },
                                  {
                                      view: "search",
                                      id: "TxtGroup",
                                      label: "Group",
                                      readonly: true,
                                      placeholder: "<-ALL->",
                                      labelAlign: "Left",
                                      labelWidth: 80,
                                      inputWidth: 325,
                                      width: 325,
                                      on: {
                                          onSearchIconClick: function () {
                                              debugger;
                                              btnGrpSrchClick();
                                              GridClear();
                                          },
                                         
                                      }
                                  },
                                   { width: 70 },
                                   { width: 400 },
                                  {
                                      view: 'radio',
                                      minWidth: 100,
                                      id: "RadExp",
                                      value: 0,
                                      options: [
                                      { "id": 1, "value": "Expenses" }
                                      ],

                                      on: {
                                          "onChange": function (newValue, oldValue) {
                                              if (newValue == 1)
                                              {
                                                  $$("RadInc").setValue(0);
                                                  $$("RadMISGrp").setValue(0);
                                                  $$("RadStat").setValue(0);
                                                  window.GroupIds = "";
                                                  window.LevelIds = "";
                                                  window.LedgerIds = "";
                                                  $$("TxtGroup").setValue("");
                                                  $$("TxtLedger").setValue("");
                                                  $$("TxtLedger").show();
                                                  $$("HidLedger").hide();
                                                  $$("ChkFilterLed").show();
                                                  $$("HidFilterLed").hide();
                                                  $$("HidGroup").hide();
                                                  $$("TxtGroup").show();
                                                 
                                              }
                                              GridClear();
                                             
                                          }
                                      }
                                  },
                                  {
                                      view: 'radio',
                                      minWidth: 100,
                                      id: "RadStat",
                                      value: 0,
                                      options: [
                                      { "id": 1, "value": "Statistics" }
                                      ],

                                      on: {
                                          "onChange": function (newValue, oldValue) {
                                              if (newValue == 1)
                                              {
                                                  $$("RadExp").setValue(0);
                                                  $$("RadMISGrp").setValue(0);
                                                  $$("RadInc").setValue(0);
                                                  window.GroupIds = "";
                                                  window.LevelIds = "";
                                                  window.LedgerIds = "";
                                                  $$("TxtGroup").setValue("");
                                                  $$("TxtLedger").setValue("");
                                                  $$("TxtLedger").hide();
                                                  $$("HidLedger").show();
                                                  $$("ChkFilterLed").hide();
                                                  $$("HidFilterLed").show();
                                                  $$("HidGroup").show();
                                                  $$("TxtGroup").hide();
                                              }
                                             
                                              GridClear();
                                          }
                                      }
                                  },
                                    
                                 
                                 
                                 
                                  
                                    
                                    
                                    
                               ]
                           },
                           {
                               cols: [
                                   { width: 325, label: "", id: "HidLedger", hidden:true},
                                       {
                                           view: "search",
                                           readonly: true,
                                           id: "TxtLedger",
                                           label: "Ledger",
                                           labelAlign: "Left",
                                           labelWidth: 80,
                                           inputWidth: 325,
                                           width: 325,
                                           placeholder: "<-ALL->",
                                           on: {
                                               onChange: function (newVal, OldVal) {
                                               }
                                           },

                                           on: {
                                               onSearchIconClick: function () {
                                                   debugger;
                                                   if (window.GroupIds != "") btnLedgSrchClick();
                                                   GridClear();
                                                 
                                               }
                                           }
                                       },
                                        { width: 70 },
                                        { width: 400 },
                                        { width: 250, label: "", id: "HidFilterLed", hidden: true },
                                        {
                                            view: "checkbox",
                                            id: "ChkFilterLed",
                                            labelRight: "Filter Ledgers refered in MIS Group ",
                                            labelWidth: 1,
                                            width: 250,
                                            value: "1",
                                            click: function () {
                                                GridClear();
                                            }
                                        },
                                         
                                 
                                  

                                      
                                       

                                     
                                  
                               ]
                           },

                        
                       ]
                   },
                   {
                       paddingY: 10,

                       cols: [

                           {
                               view: "datatable",
                               id: "GridData",
                               select: "row",
                               data: [],
                               minwidth:900,
                               height: 430,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               footer: true,
                               tooltip: function (obj, common) {
                                 
                                  
                               },
                               columns: [
                                        { header: "", id: "IxLevel", hidden: true },
                                        { header: "", id: "IxLedID", hidden: true },
                                          { header: ["Ledger Name"], id: "IxLedNm", width: 200, css: { 'text-align': 'left ! important' } },
                               ],
                               on: {
                     
                                  
                                  
                                   
                                  
                                  
                                   'onItemClick': function (id, index, cell) {
                                       debugger;
                                      
                                           if (id.column != 'IxLedNm' && id.column!='IxTotal') {
                                           debugger;
                                          var getval = this.getItem(id.row);
                                          var ACID = getval.IxLedID;
                                          var TCID = id.column;
                                               //btnDeptSrchClick(Dept);
                                       
                                            window.AcId = ACID;
                                            window.TcId = TCID;
                                            $$("LblLedger").define("label", getval.IxLedNm);
                                            $$("LblLedger").refresh();
                                           FnLoadMISMonthLoad();
                                           $$("BudgetPopup").show();
                                       }
                                       //if (id.column == 'ixLedGroupSel') {
                                       //    debugger;
                                       //    var getval = this.getItem(id.row);
                                           
                                    
                                       //    var AcId = getval.ixLedGroupId;
                                       //    var Ty = $.trim(getval.ixLG);
                                       //    if (Ty == "") {
                                       //        AlertMessage('Please Select Ledger or Group');
                                       //        return false;
                                       //    }
                                       //    btnLedGrpSrchClick(AcId, Ty);

                                       //}




                                   },

                              
                               },
                               scheme: {
                                   $change: function (item) {
                                       debugger;


                                   },

                               },

                           }
                       ]
                   },
                   {
                       rows: [
                           {
                               cols: [
                                   {
                                       
                                   },
                                   {
                                      
                                   },
                                   {
                                        
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

function sidebarFn() {
    $$("frmMISTrnBudget").resize();
    $$("frmMISTrnBudget").adjust();
    $$("GridData").resize();
    $$("GridData").adjust();
}


function TemplPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "TemplPopup",
        head: "Template",
        position: "center",
        minWidth: 340,
        maxWidth: 340,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtTemplPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Template Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "TemplId", id: "id", hidden: true },
                     
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id, e, node) {
                        //debugger;
                        var selectedRows = this.getSelectedItem(id.row);
                        GridClear();
                        $$("TxtTemplate").setValue("");
                        window.TemplId = "";

                        var vNm = $.trim(selectedRows[0].value);
                    //    var vId = "'" + $.trim(selectedRows[0].id) + "'";
                        var vId = $.trim(selectedRows[0].id);
                       

                        if (vId != "") {
                            window.TemplId = vId;
                            $$("TxtTemplate").setValue(vNm);
                            FnLoadGridTemplate();
                            window.clr = "1";
                            $$("TemplPopup").hide();

                        }



                    }

                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [

                    {

                        view: "button",
                        label: "Close",
                        inputWidth: 80,
                        click: function () {
                            GridClear();
                        
                            $$("TxtTemplate").setValue("");
                            window.TemplId = "";
                            $$("TemplPopup").hide();

                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};


function GridClear() {
    $$("GridData").clearAll();
}

function fnPropChange() {
  
    
    GridClear();
    $$("TxtGroup").setValue("");
    $$("TxtLedger").setValue("");
    window.GroupIds = "";
    window.LedgerIds = "";
 

};

function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
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
function fnLoadProperty() {
    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "",//Property
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                debugger;
                //debugger;
                $("#hdnCompId").val(newval);

                var Filter3 = dataProp.filter(function (dataProp) {
                    return (dataProp.id == $.trim(newval));
                });
                fnPropChange(newval);

            //    $$("txtCompany").setValue(Filter3[0].value);

               

            }
        }
    });
}
function fnFyearLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FISCALYEARLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
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
function GroupPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "GroupPopup",
        head: "Group",
        position: "center",
        minWidth: 340,
        maxWidth: 340,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtGroupPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "Account Code", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "AC_ID", id: "id", hidden: true },
                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id, e, node) {
                        //debugger;
                        var selectedRows = this.getSelectedItem(id.row);
                        GridClear();
                        var vGrpNm = "";
                        var vGrpId = "";
                        var vLvlId = "";
                        window.GroupIds = "";
                        window.LevelIds = "";
                        $$("TxtGroup").setValue("");
                        $$("TxtLedger").setValue("");

                        var vGrpNm = $.trim(selectedRows[0].value);
                        var vGrpId = "'" + $.trim(selectedRows[0].id) + "'";
                        var vLvlId = "'" + $.trim(selectedRows[0].LEVEL_NO) + "'";

                        if (vGrpId != "") {
                            window.GroupIds = vGrpId;
                            window.LevelIds = vLvlId;
                            $$("GroupPopup").hide();
                            $$("TxtGroup").setValue(vGrpNm);

                        }



                    }

                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [

                    {

                        view: "button",
                        label: "Close",
                        inputWidth: 80,
                        click: function () {
                            GridClear();
                            window.GroupIds = "";
                            window.LevelIds = "";
                            window.LedgerIds = "";
                            $$("TxtGroup").setValue("");
                            $$("TxtLedger").setValue("");
                            $$("GroupPopup").hide();

                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};
function btnGrpSrchClick() {
    fnGroupLoad();
    $$("dtGroupPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtGroupPop").filterByAll();

    var ids = window.GroupIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtGroupPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtGroupPop").updateItem(obj.id, obj)

    })
    $$("dtGroupPop").refresh();

    $$("GroupPopup").show();
    $$("dtGroupPop").select($$("dtGroupPop").getFirstId());
    webix.UIManager.setFocus($$("dtGroupPop"));
    $$("dtGroupPop").moveSelection("top");

};
function fnGroupLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("ddlProperty").getValue();
    var Type = "";
    if ($$("RadInc").getValue() == "1") Type = "I";
    if ($$("RadExp").getValue() == "1") Type = "E";
    if ($$("RadMISGrp").getValue() == "1") Type = "G";
    if ($$("RadStat").getValue() == "1") Type = "S";
    Request = {
        PROGNAME: "GET_GROUPLOAD",
        COMPID: CompId,
        FISCALYEAR: window.FiscalYear,
        TYPE:Type
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                $$("dtGroupPop").clearAll();
                $$("dtGroupPop").parse(rowData);
                $$("dtGroupPop").refresh();



            }
        },
    });

    //return rowData;
};
function btnLedgSrchClick() {
    debugger;
    fnLoadLedgerGrid();
    $$("dtLedgerPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtLedgerPop").filterByAll();
    var ids = window.LedgerIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtLedgerPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtLedgerPop").updateItem(obj.id, obj)

    })
    $$("dtLedgerPop").refresh();

    $$("LedgerPopup").show();
    $$("dtLedgerPop").select($$("dtLedgerPop").getFirstId());
    webix.UIManager.setFocus($$("dtLedgerPop"));
    $$("dtLedgerPop").moveSelection("top");

}
function fnLoadLedgerGrid() {
    debugger;
    var rowDatad = [];
    var CompId = $$("ddlProperty").getValue();
    var GrpIds = window.GroupIds;
    var FilterLed = $$("ChkFilterLed").getValue();
    Request = {
        PROGNAME: "GET_LEDGERLOAD",
        COMPID: CompId,
        FISCALYEAR: window.FiscalYear,
        GROUP_ID: GrpIds,
        FILTERLED: FilterLed
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtLedgerPop").clearAll();
                $$("dtLedgerPop").parse(rowDatad);
                $$("dtLedgerPop").refresh();

            }
        }
    })

};
function LedgerPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "LedgerPopup",
        head: "Ledger",
        position: "center",
        minWidth: 340,
        maxWidth: 340,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtLedgerPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "Account Code", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "AC_ID", id: "id", hidden: true },
                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id, e, node) {
                        //debugger;
                        var selectedRows = this.getSelectedItem(id.row);
                        GridClear();
                        var vGrpNm = "";
                        var vGrpId = "";
                        var vLvlId = "";
                       
                        window.LedgerIds = "";
                        $$("TxtLedger").setValue("");

                        var vLedNm = $.trim(selectedRows[0].value);
                        var vLedId = "'" + $.trim(selectedRows[0].id) + "'";
                        var vLvlId = "'" + $.trim(selectedRows[0].LEVEL_NO) + "'";

                        if (vLedId != "") {
                            window.LedgerIds = vLedId;
                            $$("LedgerPopup").hide();
                            $$("TxtLedger").setValue(vLedNm);

                        }



                    }
                   
                }
            },
              {
                  margin: 10,
                  padding: { top: 5, bottom: 5, right: 5 },
                  cols: [

                      {

                          view: "button",
                          label: "Close",
                          inputWidth: 80,
                          click: function () {
                              GridClear();
                              window.LedgerIds = "";
                              $$("TxtLedger").setValue("");
                              $$("LedgerPopup").hide();

                          },
                          align: "right"
                      },


                  ]

              }
            ],

        }
    });
};
function FnLoadMISBudget() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("ddlProperty").getValue();
    var GrpIds = window.GroupIds;
    var LedgerIds = window.LedgerIds;
    var FilterLed = $$("ChkFilterLed").getValue();
    var Type = "";
    if ($$("RadInc").getValue() == "1") Type = "I";
    if ($$("RadExp").getValue() == "1") Type = "E";
    if ($$("RadMISGrp").getValue() == "1") Type = "G";
    if ($$("RadStat").getValue() == "1") Type = "S";
   var FiscalYear= $$("ddlFYear").getValue();
    Request = {
        PROGNAME: "GET_MISBUDGETLOAD",
        COMPID: CompId,
        //  FISCALYEAR: window.FiscalYear,
        FISCALYEAR:FiscalYear,
        TYPE: Type,
        FILTERLED:FilterLed,
        GROUPID: GrpIds,
        LEDGERID: LedgerIds,
      
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
              //  $$("GridData").destructor();
                var ColVal = [];
                $$("GridData").clearAll();
                $$("GridData").config.columns = ColVal;
                $$("GridData").refreshColumns();
             
                //$$("GridData").parse(rowData);
                //$$("GridData").refresh();
                var str = [];
                $.each(rowData.GridCol, function (key, value) {
                    //debugger;
                   
                    var Hdr = value.toString();
                    str = Hdr.split('_');
                  
                    var HId = "";
                    if (str.length > 0) {
                        Hdr = str[0];
                        HId =  str[1];
                    }
                    //var Hdr = value.toString();
                    var vCss = "";
                    var vWidth = 100;
                 

                    //if (value == "COL2") vWidth = 200;
                    //var set = {
                    //    id: $.trim(value), header: { text: Hdr, height: 40 }, width: vWidth,

                                                  
                    //};

                 
                    if (HId == "IxLedNm") {
                        var set = {
                            id: $.trim(HId), width: 200, footer: "Total:",header: { text: Hdr },// cssFormat: Fontstyle,
                        };

                    }
                    else {
                        var set = {
                            id: $.trim(HId), width: 100, footer: { content: 'summColumn' }, format: webix.i18n.numberFormat,header: { text: Hdr },// cssFormat: Fontstyle,
                        };
                    }
                    //
                    ColVal.push(set);



                });
                var set = {
                    id: "IxLevel", hidden: true
                };
                ColVal.push(set);

                var set = {
                    id: "IxLedID", hidden: true
                };
                ColVal.push(set);

                $$("GridData").config.columns = ColVal;
                $$("GridData").refreshColumns();
                $$("GridData").parse(rowData.GridData);
               // $$("GridData").getColumnConfig("COL2").header = "Ledger";
             //   $$("GridData").refreshColumns();



            }
        },
    });

    //return rowData;
};
function MonthBudgetPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "BudgetPopup",
        head: "MonthWise Budget",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        autowidth: true,
        body: {
            rows: [
                {
                    width: 240, view: 'label', label: "", id: "LblLedger",
                },

                {
                    margin: 10,
                    padding: { left:10,top: 5, bottom: 5, right: 5 },
                    cols:[
                        {
                            view: "datatable",
                            id: "dtBudgetPop",
                            select: "row",
                            data: [],
                            css: "webix_header_border",
                            editable: true,
                            width: 240,
                            height: 400,
                            footer: true,
                            columns: [
                                   { header: ["Month"], id: "IxPerNm", width: 100, footer: "Total:", css: { 'text-align': 'left ! important' } },
                                   { header: "Budget", id: "IxBudAmt", width: 120, footer: { content: 'summColumn' }, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true },
                                   { header: "Period Sno", id: "IxPerSno", hidden: true },

                            ],
                            data: [{}],
                            on: {
                                'onItemDblClick': function (id, e, node) {
                                    //debugger;
                                    var selectedRows = this.getSelectedItem(id.row);



                                },
                                'onAfterEditStop': function (state, editor) {
                                    //debugger;

                                    if (editor.column == 'IxBudAmt') {
                                        //var getval = this.getItem(editor.row);

                                        //if (state.value != "") {

                                        //  getval.IxBudAmt = parseFloat(state.value.replace(",", "").replace(",", "")).toFixed(2);
                                        //}


                                        //var tot = $$("dtBudgetPop").getFooterNode("IxBudAmt").innerText;
                                        //if (tot != "" && tot != null && tot != undefined) {
                                        //    $$("Projection_Value").setValue(tot);//S.Vijayalakshmi''22/5/20
                                        //}



                                        $$("dtBudgetPop").refresh();
                                    }
                                },

                            }
                        }
                    ]
               
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                      {

                          view: "button",
                          label: "Copy",
                          inputWidth: 60,
                          width: 60,
                          click: function () {
                              debugger;
                              var rowid = $$("dtBudgetPop").getSelectedId();
                              var chk = "";
                              var Amt = "";
                              $$("dtBudgetPop").data.each(function (obj) {
                                  //  debugger;
                                  if (rowid.row == obj.id)
                                  {
                                        chk = "1";
                                        Amt = obj.IxBudAmt;
                                  }
                                  if(chk=="1")  obj.IxBudAmt=Amt;
                              });
                              $$("dtBudgetPop").refresh();

                          },
                          //  align: "right"
                      },
                     {

                         view: "button",
                         label: "Distribute",
                         inputWidth: 80,
                         width: 80,
                         click: function () {
                             debugger;
                             var rowid = $$("dtBudgetPop").getFirstId();
                             
                             var GridData = $$("dtBudgetPop").serialize(true);
                             var lenval = GridData.length;

                             if (lenval > 0 && rowid!=undefined)
                             {
                                 var Amt = "";
                                 $$("dtBudgetPop").data.each(function (obj) {
                                     //  debugger;
                                     if (rowid == obj.id) {
                                         Amt = (obj.IxBudAmt).replace(",","");
                                         if (parseFloat(Amt) > 0) Amt = Amt / lenval;
                                         Amt = parseFloat(Amt).toFixed(2);
                                         if (Amt == "NaN") Amt = "";

                                     }

                                     obj.IxBudAmt = Amt;
                                 });
                                 $$("dtBudgetPop").refresh();
                             }
                            

                         },
                         //  align: "right"
                     },
                      {

                          view: "button",
                          label: "Delete",
                          inputWidth: 60,
                          width: 60,
                          click: function () {
                              $$("dtBudgetPop").data.each(function (obj) {
                                  debugger;
                                  obj.IxBudAmt = "";
                              });
                              $$("dtBudgetPop").refresh();

                          },
                          //   align: "right"
                      },

                    {

                        view: "button",
                        label: "Save",
                        inputWidth: 60,
                        width: 60,
                        click: function () {
                            FnSaveBudget();
                            $$("BudgetPopup").hide();

                        },
                        //   align: "right"
                    },


                ]

            }
            ],

        }
    });
};
function FnLoadMISMonthLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("ddlProperty").getValue();
    var TcId = window.TcId;
    var AcId = window.AcId;
   
    var Type = "";
    if ($$("RadInc").getValue() == "1") Type = "I";
    if ($$("RadExp").getValue() == "1") Type = "E";
    if ($$("RadMISGrp").getValue() == "1") Type = "G";
    if ($$("RadStat").getValue() == "1") Type = "S";
    var FiscalYear = $$("ddlFYear").getValue();
    Request = {
        PROGNAME: "GET_MISBUDGETMONTHLOAD",
        COMPID: CompId,
        //FISCALYEAR: window.FiscalYear,
        FISCALYEAR: FiscalYear,
        TYPE: Type,
        ACID: AcId,
        TCID: TcId,
        LID:"1",

    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);                
                $$("dtBudgetPop").clearAll();
                $$("dtBudgetPop").parse(rowData);
                $$("dtBudgetPop").refresh();
            }
        },
    });

    //return rowData;
};





function FnSaveBudget() {
    $("#LoadDIv").show();
    debugger;
    
    var GridData = $$("dtBudgetPop").serialize(true);
    var lenval = GridData.length;

    var DataStore = [];

    var dataparam = {};

    debugger;

    if (lenval > 0) {
        
        DataStore = GridData;
    }

    dataparam["PROGNAME"] = "GET_MISBUDGETSAVE";
    dataparam["COMPID"] = $("#hdnCompId").val();
  //  dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["FiscalYear"] = $$("ddlFYear").getValue();
    var Type = "";
    if ($$("RadInc").getValue() == "1") Type = "I";
    if ($$("RadExp").getValue() == "1") Type = "E";
    if ($$("RadMISGrp").getValue() == "1") Type = "G";
    if ($$("RadStat").getValue() == "1") Type = "S";
   
    dataparam["TYPE"] = Type;
    dataparam["grdData"] = GridData;
    dataparam["TCID"] = $.trim(window.TcId);
    dataparam["ACID"] = $.trim(window.AcId);
    dataparam["LID"] ="1";
    window.TcId = ""; window.AcId = "";
    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
       // cache: false,
        url: "/MISTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Updated Successfully');
                    FnLoadMISBudget();
                    $$("BudgetPopup").hide();
                }
                else {
                    AlertMessage($.trim(rowData));
                }

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
    $("#LoadDIv").hide();
}
function FnLoadGridTemplate() {
    $("#LoadDIv").show();
  
    debugger;

    var dataparam = {};
    dataparam["PROGNAME"] = "GET_MISTEMPLATELOADGRID";
    //dataparam["PROGNAME"] = "GET_GLTRNIMPORTVOUCHER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TemplId"] = window.TemplId;   
    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    debugger;
    $.ajax({
        type: 'POST',
        async: false,
        // cache: false,
        url: "/MISTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (data) {
            //debugger;
            if (data != "") {
                debugger
                rowData = JSON.parse(data);
                $$("TxtSeqNo").setValue(rowData.dtTemp[0].SeqNo);
                $$("ChkLastChk").setValue(rowData.dtTemp[0].M_IND);
                window.DeptIds = rowData.DeptId;
                $$("TxtDept").setValue(rowData.DeptNm);
                $$("GridData").clearAll();
                $$("GridData").parse(rowData.dtPart);
                $$("GridData").refresh();
               

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
    $("#LoadDIv").hide();
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