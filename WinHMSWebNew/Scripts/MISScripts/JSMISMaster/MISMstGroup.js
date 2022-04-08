
var app = angular.module('MISTApp', ['webix']);

app.controller("MISMasterController", function ($scope) {
    var searchicon = "<span class='fa fa-search ' ></span>";
    $("#LoadDIv").hide();
    var dataProp = fnPropertyLoad();

    debugger;
    $scope.frmMISMstGroup = {
        id: "frmMISMstGroup",
        view: 'form',
       
        minWidth: 1080,
        maxWidth: 1340,
        disabled: true,
       borderless:true,
  
        elements: [
             {
                 paddingX: 20,
                 //paddingX: 5,
                 //PaddingY: 5,
                 rows: [

                     {
                         rows: [
                           {
                               cols: [
                                   {
                                       view: "label",
                                       id: "lblMISGrpID",
                                       stringResult: true,
                                       label: "MIS GROUP NAME",
                                       labelAlign: "Left",
                                       labelWidth: 120,
                                       width: 150,
                                   },
                                    {
                                        view: "text",
                                        id: "txtGMISGrpID",
                                        stringResult: true,
                                        inputWidth: 150,
                                        width: 150,
                                        maxlength: 50,

                                        hidden: true
                                    },
                                    {
                                        view: "text",
                                        id: "txtMisGrpName",
                                        stringResult: true,
                                        inputWidth: 200,
                                        width: 200,
                                        maxlength: 60,


                                    },
                                    {
                                       


                                        view: "button",
                                        id: 'btnsrchGrpName',
                                        minWidth: 250,
                                        labelWidth: 0,
                                        inputWidth: 30,
                                        width: 40,
                                        height: 28,
                                        type: 'icon',
                                        icon: 'wxi-search',
                                        css: "Ar_search",
                                        hidden: true,

                                        on: {
                                            onItemClick: function () {
                                                fnSrchGrpnm();
                                            }
                                        }


                                   
                                    },
                                   

                                    {
                                        view: "radio",
                                        id: "rdbtnGRP",
                                        value: 1,
                                        inputWidth: 300,
                                        width: 300,
                                        maxlength: 60,
                                        options: [{ "id": 1, "value": "Income" }, { "id": 2, "value": "Expense" }],
                                        on: { onChange: function () { fnrRtbtnChange(); } }


                                    },
                               ]
                           }
                         ]
                     },
                     {
                         rows:[{ width:20,
                             cols:[{width:200},]
                         }]
                     },
                    
                     

                     
                      {
                          rows: [
                            {
                                
                                cols: [

                                    {
                                        width: 100,
                                    },
                                    { width: 250, },
                                    {
                                        id: "btnAdd",
                                        view: 'button',
                                        type: "icon",
                                        icon: "wxi-plus",
                                        label: "",
                                        inputWidth: 80,
                                        width: 80,
                                        on: {
                                            onItemClick: function () {
                                                fnCallAddRow();
                                            }
                                        }
                                    },
                                     {
                                         id: "btnDelRow",
                                         view: 'button',
                                 
                                         type: "icon",
                                         icon: "wxi-trash",
                                         inputWidth: 80,
                                         width: 80,
                                         on: {
                                             onItemClick: function () {
                                                 fnCallDelRow();
                                             }
                                         }
                                     },
                                     {},
                                     {
                                         id: "btnAddGrp",
                                         view: 'button',
                                         type: "icon",
                                         icon: "wxi-plus",
                                         label: "",
                            
                                         inputWidth: 80,
                                         width: 80,
                                         on: {
                                             onItemClick: function () {
                                                 fnCallAddRowGrp();
                                             }
                                         }
                                     },
                                      {
                                          id: "btnDelRowGrp",
                                          view: 'button',
                                    
                                          type: "icon",
                                          icon: "wxi-trash",
                                          inputWidth: 80,
                                          width: 80,
                                          on: {
                                              onItemClick: function () {
                                                  fnCallDelRowGrp();
                                              }
                                          }
                                      },
                                ]
                            }
                          ]
                      },


                     {
                         cols:[
                             {
                                 id: "gridMain",
                                 select: 'row',
                                 view: "treetable",
                                 fixedRowHeight: false,
                                 rowLineHeight: 23,
                                 autoConfig: true,
                                 editable: true,
                                 height: 350,
                                 width: 500,


                                 position: "flex",
                                 css: "webix_header_border",
                                 data: [],
                                 columns: [


                                         { id: "GROUP_ID", header: 'Linked Ledger', width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                                         { id: "GROUP_NM", header: 'Linked Ledger', width: 440, css: { 'text-align': 'left ! important' }, },
                                          { id: "RCSEARCH", header: "", width: 40, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                 ],
                                 data: [],

                                 on: {
                                     'onItemClick': function (id) {
                                         debugger;

                                         var SelRow = this.getItem(id.row);
                                         var getColumn = id.column;

                                         if (getColumn == "RCSEARCH") {

                                             $("#hdnGridType").val("");
                                             $("#hdnGridType").val("GRDLEDGER");
                                             serchgrid();
                                             $$("PropSel").show();

                                             fnLoadPropSel();
                                             fnLoadGroupddl();
                                             $$("PropSel").show();
                                             $$("gridPropSel").show();

                                         }

                                     }

                                 },
                             },
                             {},
                              {



                                  id: "gridLinkedGrp",

                                  select: 'row',
                                  view: "treetable",
                                  fixedRowHeight: false,
                                  rowLineHeight: 23,
                                  autoConfig: true,
                                  editable: true,
                                  height: 350,
                                  width: 500,
                                  position: "flex",
                                  css: "webix_header_border",
                                  data: [],
                                  columns: [


                                          { id: "GROUP_ID", header: 'Linked GroupId', width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                                          { id: "GROUP_NM", header: 'Linked Group', width: 440, css: { 'text-align': 'left ! important' }, },
                                           { id: "RCSEARCH", header: "", width: 40, template: searchicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                  ],
                                  data: [],

                                  on: {
                                      'onItemClick': function (id) {
                                          debugger;

                                          var SelRow = this.getItem(id.row);
                                          var getColumn = id.column;

                                          if (getColumn == "RCSEARCH") {

                                              $("#hdnGridType").val("");
                                              $("#hdnGridType").val("GRDGROUP");
                                              serchgrid();
                                              $$("PropSel").show();

                                              fnLoadPropSel();
                                              fnLoadGroupddl();
                                              $$("PropSel").show();
                                              $$("gridPropSel").show();

                                          }

                                      }
                                  },


                              },

                         ]


                     }, 

                    
                 ],
             }]
    };
    
});


function sidebarFn() {
    $$("frmMISMstGroup").resize();
    $$("frmMISMstGroup").adjust();
    $$("gridMain").resize();
    $$("gridMain").adjust();
    $$("gridLinkedGrp").resize();
    $$("gridLinkedGrp").adjust();


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
       
    })
}

function fnrRtbtnChange() {
    debugger;
    $$("gridMain").clearAll();
    $$("gridLinkedGrp").clearAll();

}


function fnRefresh() {
    document.getElementById("btnOpen").disabled = false;

    document.getElementById("btnNew").disabled = false;
    document.getElementById("btnSave").disabled = true;
    $$("gridMain").clearAll();
    $$("gridLinkedGrp").clearAll();
    $("#hdnGridType").val("");
    $("#hdnbtnmode").val("");
    $$("txtGMISGrpID").disable();
    $$("txtMisGrpName").disable();
    $$("txtMisGrpName").setValue("");

    $$("btnsrchGrpName").hide();
    $$("rdbtnGRP").setValue("");
    $$("btnDelRow").disable();
    $$("btnAdd").disable();
    $$("btnDelRowGrp").disable();
    $$("btnAddGrp").disable();
}



function fnNew() {
    debugger;
    $$("frmMISMstGroup").enable();
    $$("rdbtnGRP").setValue("1");
    $("#hdnbtnmode").val("new");
    $$("txtGMISGrpID").disable();
    $$("txtMisGrpName").enable();

    $$("btnDelRow").enable();
    $$("btnAdd").enable();
    $$("btnDelRowGrp").enable();
    $$("btnAddGrp").enable();

 
    document.getElementById("btnOpen").disabled = true;
    document.getElementById("btnSave").disabled = false;

};
function fnOpen() {
    debugger;
    $$("frmMISMstGroup").enable();
    $("#hdnbtnmode").val("open");

    document.getElementById("btnSave").disabled = false;
    document.getElementById("btnNew").disabled = true;

    $$("btnsrchGrpName").show();
};


function fnsave() {
    debugger;

    var bValid = fnValidation();
    if (bValid == true) {
        debugger;

        var data = $$("gridMain").serialize();
        data = JSON.stringify(data);
        var data1 = $$("gridLinkedGrp").serialize();
        data1 = JSON.stringify(data1);
        var MISGrpName = $$("txtMisGrpName").getValue();
        var GRPRDTYPE = $$("rdbtnGRP").getValue();
        var GRPID = "";
        var btnmode = $("#hdnbtnmode").val();
        if (btnmode == "open") {
            GRPID = $$("txtGMISGrpID").getValue();
        }
        vcmpid = $$("Property").getValue();
        try {

            Request = {
                PROGNAME: "GET_FNSAVEMISGROUP",
                gridLedger: data,
                gridGroup: data1,
                MISGrpName: MISGrpName,
                GRPRDTYPE: GRPRDTYPE,
                btnmode: btnmode,
                vcmpid: vcmpid,
                GrpId: GRPID,
            }

            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: true,
                url: "/MISMaster/COMAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (data) {
                    debugger;
                    if (data != "") {
                        debugger;
                        rowData = JSON.parse(data);
                        if (!rowData) rowData = "";
                        if (rowData.Status == "0") {

                            AlertMessage('Operation Failed');

                        }
                        else if (rowData.Status == "1") {
                            if (btnmode == "new") {

                                SuccessMsg('Saved Successfully');
                            }
                            else
                                SuccessMsg('Updated Successfully')
                            fnRefresh();
                        }

                    }

                },

            });

        }
        catch (e) {
            console.log(e.message);

        }

    }
};



function fnValidation() {
    debugger;
    var data = $$("gridMain").serialize();
    var Lenmaingrd = data.length;
    var data1 = $$("gridLinkedGrp").serialize();
    var LenLinkedGrp = data1.length;



    if ($$("txtMisGrpName").getValue() == "") {
       
        AlertMessage("MIS GroupName cannot be empty");
        webix.UIManager.setFocus($$("txtMisGrpName"));
        return false;;
    }

    if ((Lenmaingrd == 0) && (LenLinkedGrp == 0)) {
        
        AlertMessage("Linked Ledger && Linked Group cannot be empty");

        return false;
    }
    if (Lenmaingrd > 0) {
        for (i = 0; i < Lenmaingrd; i++) {
            if (data[i].GROUP_ID == null || data[i].GROUP_ID == undefined || data[i].GROUP_ID == "") {
        
                AlertMessage("Linked Ledger Row cannot be empty");
                return false;
            }
        }
    }
    if (LenLinkedGrp > 0) {
        for (i = 0; i < LenLinkedGrp; i++) {
            if (data1[i].GROUP_ID == null || data1[i].GROUP_ID == undefined || data1[i].GROUP_ID == "") {
                
                AlertMessage("Linked Group Row cannot be empty");
                return false;
            }
        }
    }

    debugger;
    if (Lenmaingrd > 0 && LenLinkedGrp > 0) {
        for (i = 0; i < Lenmaingrd; i++) {
            if (data[i].GROUP_ID != null || data[i].GROUP_ID != undefined || data[i].GROUP_ID != "") {
                var ledgId = data[i].GROUP_ID;
                var lenid = ledgId.length;
                var loopcount = lenid / 4;
                for (k = 1; k < loopcount - 1; k++) {
                    ledgId = ledgId.substring(0, ledgId.length - 4)

                    for (j = 0; j < LenLinkedGrp; j++) {
                        if (data1[j].GROUP_ID != null || data1[j].GROUP_ID != undefined || data1[j].GROUP_ID != "") {

                            var grpId = data1[j].GROUP_ID;
                            if (ledgId == grpId) {
                              
                                AlertMessage("Ledger Already Linked in Group");
                                return false;

                            }
                        }


                    }
                }
            }
        }
    }

    if (LenLinkedGrp > 0) {
        for (i = 0; i < LenLinkedGrp; i++) {
            var grpid = data1[i].GROUP_ID;
            for (j = 0; j < LenLinkedGrp; j++) {
                if (i != j) {

                    debugger;
                    var vcmpid = "";
                    var accid = "";
                    var accnm = "";
                    vcmpid = $$("Property").getValue();
                    var rowDatad = [];

                    Request = {
                        PROGNAME: "GET_FNGETGRPID",
                        vcmpid: vcmpid,
                        FISCALYEAR: window.FiscalYear,
                        GRPID: grpid,
                     
                    }
                    requestData = JSON.stringify(Request);
                    requestData = encodeURIComponent(requestData);

                    $.ajax({
                        async: false,
                        url: "/GLMaster/COMAPI_CALL",
                        type: 'POST',
                        data: "request=" + requestData,
                        success: function (d) {
                            debugger;
                            if (d != "") {
                                rowDatad = JSON.parse(d);
                              
                                var Rows = [];

                                accid = rowDatad[0]["AC_ID"];
                                accnm = rowDatad[0]["AC_ALT_NM"];
                            }
                        }

                    });

                    if (accid == grpid) {
                
                        AlertMessage(accnm + 'Already Linked in Group' + grpid);
                        return false;
                    }
                }

            }
        }
    }
    return true;

}


function fnCallAddRow() {
    debugger;

    $$("gridMain").editStop();
    $$("gridMain").add({ "GROUP_ID": "", "GROUP_NM": "" });
    $$("gridMain").refresh();
    $$("gridMain").refreshColumns();

}

function fnCallAddRowGrp() {
    debugger;
    $$("gridLinkedGrp").editStop();
    $$("gridLinkedGrp").add({ "GROUP_ID": "", "GROUP_NM": "" });
    $$("gridLinkedGrp").refresh();
    $$("gridLinkedGrp").refreshColumns();


}

function fnCallDelRow() {
    debugger;

    var SelRow = $$("gridMain").getSelectedId(false);
    $$("gridMain").editStop();
    if (SelRow == undefined || SelRow == null) SelRow = $$("gridMain").getLastId();
    $$("gridMain").remove(SelRow);
}


function fnCallDelRowGrp() {
    debugger;

    var SelRow = $$("gridLinkedGrp").getSelectedId(false);
    $$("gridLinkedGrp").editStop();
    if (SelRow == undefined || SelRow == null) SelRow = $$("gridLinkedGrp").getLastId();
    $$("gridLinkedGrp").remove(SelRow);
}


function fnSrchGrpnm() {
    debugger;
    serchGrpNamegrid();
    $$("GrpNMSearch").show();
    //fnLoadPkgSel();
    fnLoadGridGrpNM();
    $$("GrpNMSearch").show();
    $$("gridGRPNM").show();
    $$("txtMisGrpName").enable();
    $$("btnAddGrp").enable();
    $$("btnDelRowGrp").enable();
    $$("btnAdd").enable();
    $$("btnDelRow").enable();


}


function serchGrpNamegrid() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GrpNMSearch",
        head: " MIS GROUPNAME SEARCH",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridGRPNM",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [
                           { id: "GROUP_ID", header: ['Group ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "TYPE", header: ['TYPE', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "GROUP_NM", header: ['GROUP NAME', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },

                   ],
                   data: [],
                   on: {


                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridGRPNM").getSelectedItem();

                           $$("txtMisGrpName").setValue(selRow.GROUP_NM);
                           $$("txtGMISGrpID").setValue(selRow.GROUP_ID);
                           var GroupID = selRow.GROUP_ID;
                           var rtbtnTYPE = selRow.TYPE;
                           if (rtbtnTYPE == "I") {
                               $$("rdbtnGRP").setValue(1);
                           }
                           else
                               $$("rdbtnGRP").setValue(2);
                           var gridtype = "ledgerGrid";
                           fnLoadLedgrpGrid(GroupID, gridtype);
                           gridtype = "";
                           gridtype = "groupGrid";
                           fnLoadLedgrpGrid(GroupID, gridtype);

                           $$("gridGRPNM").hide();
                           $$("GrpNMSearch").hide();


                       },


                   },

               },



            ],
        }

    });
}


function fnLoadGridGrpNM() {
    {
        debugger;

        var vcmpid = $$("Property").getValue();

        var rowDatad = [];
        try {
            Request = {
                PROGNAME: "GET_FNGETGRPNM",
                vcmpid: vcmpid,
            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);

            $.ajax({
                async: true,
                url: "/MISMaster/COMAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    debugger;
                    if (d != "") {
                        rowDatad = JSON.parse(d);

                        var Rows = [];

                        $$("gridGRPNM").parse(rowDatad);
                        $$("gridGRPNM").refresh();

                    }

                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
    };

}


function fnLoadLedgrpGrid(GroupId, gridtype) {
    {
        debugger;

        var vcmpid = $$("Property").getValue();
        var GRPID = GroupId;
        var GridType = gridtype;
        var rowDatad = [];
        try {
            Request = {
                PROGNAME: "GET_FNLoadLedger",
                vcmpid: vcmpid,
                GRPID: GRPID,
                FISCALYEAR: window.FiscalYear,
                GridType: GridType,
            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);

            $.ajax({
                async: true,
                url: "/MISMaster/COMAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    debugger;
                    if (d != "") {
                        rowDatad = JSON.parse(d);

                        var Rows = [];
                        if (GridType == "ledgerGrid") {
                            $$("gridMain").parse(rowDatad);
                            $$("gridMain").refresh();
                        }
                        else if (GridType == "groupGrid") {
                            $$("gridLinkedGrp").parse(rowDatad);
                            $$("gridLinkedGrp").refresh();
                        }

                    }

                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
    };

}

function serchgrid() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PropSel",
        head: "MIS LEDGER",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 450,
        move: true,
        body: {
            rows: [


                {
                    cols: [
                        {
                            id: "lblgrpna", view: "label", label: "GROUP", css: { 'text-align': 'right ! important' },

                        },
                        {
                            id: "ddlgrpname", view: "richselect",placeholder: "<-Select->", on: { onChange: function () { fnddlGrpChange(); } }

                        },
                    ]

                },

               {
                   view: "datatable",
                   id: "gridPropSel",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [
                           { id: "AC_ID", header: ['COMPANY ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "AC_ALT_NM", header: ['COMPANY NAME', { content: "textFilter" }], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },

                            { header: ["Select All", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "ChkAccsel", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },

                   ],
                   data: [],
                   on: {
                   },

               },


               {
                   margin: 10,
                   padding: { top: 5, bottom: 5, right: 5 },
                   cols: [
                           


                           {
                               view: "button",
                               label: "Ok",
                               inputWidth: 70,
                               css: "webix_primary",

                               click: function () {
                                   debugger;
                                   var vAcId = "";
                                   var vAcNm = "";
                                   var vAdd = false;

                                   var GrdType = $("#hdnGridType").val();

                                   if (GrdType == "GRDLEDGER") {
                                       fnCallDelRow();
                                       $$("gridPropSel").data.each(function (obj) {
                                           //debugger;

                                           if (obj.ChkAccsel) {
                                               vAcId = obj.AC_ID;
                                               vAcNm = obj.AC_ALT_NM;


                                               var GrdRow = $$("gridMain").getSelectedItem();


                                               $$("gridMain").add({ "GROUP_ID": vAcId, "GROUP_NM": vAcNm, });
                                               $$("gridMain").refresh();
                                               vAdd = true;
                                           }
                                       });
                                   }
                                   else if (GrdType == "GRDGROUP") {
                                       fnCallDelRowGrp();
                                       $$("gridPropSel").data.each(function (obj) {
                                           //debugger;
                                           if (obj.ChkAccsel) {
                                               vAcId = obj.AC_ID;
                                               vAcNm = obj.AC_ALT_NM;

                                               var GrdRow = $$("gridLinkedGrp").getSelectedItem();

                                               $$("gridLinkedGrp").add({ "GROUP_ID": vAcId, "GROUP_NM": vAcNm, });
                                               $$("gridLinkedGrp").refresh();
                                               vAdd = true;
                                           }
                                       });

                                   }

                                   if (vAdd == true) {

                                       $$("PropSel").hide();
                                   }

                                   else {
                                       if (GrdType == "GRDLEDGER") {
                                           fnCallAddRow();
                                       }
                                       else if (GrdType == "GRDGROUP") {
                                           fnCallAddRowGrp();
                                       }
                                       webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                                   }

                               },
                               align: "right"
                           }
                   ]
               }



            ],
        }

    });
}


function fnLoadPropSel() {
    debugger;

    $$("gridPropSel").clearAll();

    var GrdType = $("#hdnGridType").val();

    var vcmpid = "";
    var AccountId = "";
    var LoadType = "1";
    vcmpid = $$("Property").getValue();
    var rdbtnvalue = $$("rdbtnGRP").getValue();

    if (GrdType == "GRDLEDGER") {
        var data = $$("gridMain").serialize();
        var LenRmTy = data.length;

        if (LenRmTy != 0) {

            for (var i = 0; i < LenRmTy; i++) {
                if (AccountId == "") {
                    if (data[i].GROUP_ID != null && data[i].GROUP_ID != undefined && data[i].GROUP_ID != "")
                        AccountId = "'" + data[i].GROUP_ID + "'";

                }
                else {
                    if (data[i].GROUP_ID != null && data[i].GROUP_ID != undefined)
                        AccountId += ",'" + data[i].GROUP_ID + "'";
                }
            }
        }
    }

    else if (GrdType == "GRDGROUP") {
        var data = $$("gridLinkedGrp").serialize();
        var Lengrdgrp = data.length;

        if (Lengrdgrp != 0) {

            for (var i = 0; i < Lengrdgrp; i++) {
                if (AccountId == "") {
                    if (data[i].GROUP_ID != null && data[i].GROUP_ID != undefined && data[i].GROUP_ID != "")
                        AccountId = "'" + data[i].GROUP_ID + "'";

                }
                else {
                    if (data[i].GROUP_ID != null && data[i].GROUP_ID != undefined)
                        AccountId += ",'" + data[i].GROUP_ID + "'";
                }
            }
        }
    };


    var rowDatad = "";
    try {
        Request = {
            PROGNAME: "GET_FNGETLEDGER",
            vcmpid: vcmpid,
            FISCALYEAR: window.FiscalYear,
            LoadType: LoadType,
            Ac_Id: AccountId,
            GRDTYPE: GrdType,
            Rdbtnvalue: rdbtnvalue

        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: true,
            url: "/MISMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);

                    var Rows = [];
                    $$("gridPropSel").parse(rowDatad);
                    $$("gridPropSel").refresh();
                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }
};


function fnLoadGroupddl() {
    debugger;
    var vcmpid = "";
    vcmpid = $$("Property").getValue();
    var GrdType = $("#hdnGridType").val();
    var rowDatad = [];
    try {
        Request = {
            PROGNAME: "GET_FNLOADGROUP",
            vcmpid: vcmpid,
            FISCALYEAR: window.FiscalYear,
            GRDTYPE: GrdType,

        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: true,
            url: "/MISMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);

                    var Rows = [];
                    $$("ddlgrpname").define("options", rowDatad);

                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }
};

function fnddlGrpChange() {

    debugger;

    $$("gridPropSel").clearAll();
    var vcmpid = "";
    vcmpid = $$("Property").getValue();
    var GrdType = $("#hdnGridType").val();

    var ddlGroupID = $$("ddlgrpname").getValue();
    var LoadType = "2";
    var rowDatad = "";
    try {
        Request = {
            PROGNAME: "GET_FNGETLEDGER",
            vcmpid: vcmpid,
            FISCALYEAR: window.FiscalYear,
            GroupId: ddlGroupID,
            LoadType: LoadType,
            GRDTYPE: GrdType

        }
        requestData = JSON.stringify(Request);
        requestData = encodeURIComponent(requestData);

        $.ajax({
            async: true,
            url: "/MISMaster/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (d) {
                debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);
                    //var Sa = rowDatad;
                    var Rows = [];
                    $$("gridPropSel").parse(rowDatad);
                    $$("gridPropSel").refresh();
                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }

}



function fnLoadProperty() {

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "Property",
        container: "ddlPropertyCont",
        //label: "Property",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
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
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}












