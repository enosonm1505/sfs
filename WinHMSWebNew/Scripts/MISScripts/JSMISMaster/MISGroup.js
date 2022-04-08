function fnPropertyLoad(CompId) {
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNPROPERTYLOAD",
        COMPID: CompId,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/GLReports/RPTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("Property").define("options", rowData)
            }
        },
    });

    //return rowData;
};

function fnPropChange() {
    debugger;
    fnRefresh();

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

function fnrRtbtnChange() {
    debugger;
    $$("gridMain").clearAll();
    $$("gridLinkedGrp").clearAll();

}


function fnRefresh() {
    document.getElementById("btnDelRow").disabled = true;
    document.getElementById("btnAdd").disabled = true;
    document.getElementById("btnOpen").disabled = false;
    document.getElementById("btnDelRowGrp").disabled = true;
    document.getElementById("btnAddGrp").disabled = true;
    document.getElementById("btnNew").disabled = false;
    document.getElementById("btnSave").disabled = true;
    $$("gridMain").clearAll();
    $$("gridLinkedGrp").clearAll();
    $("#hdnGridType").val("");
    $("#hdnbtnmode").val("");
    $$("txtGMISGrpID").disable();
    $$("txtMisGrpName").disable();
    $$("txtMisGrpName").setValue("");
    //$$("srchgrpnm").hide();
    $("#btnsrchGrpName").hide();
    $$("rdbtnGRP").setValue("");//
}



function fnNew() {
    debugger;
    $$("rdbtnGRP").setValue("1");
    $("#hdnbtnmode").val("new");
    $$("txtGMISGrpID").disable();
    $$("txtMisGrpName").enable();
    document.getElementById("btnDelRow").disabled = false;
    document.getElementById("btnAdd").disabled = false;
    document.getElementById("btnDelRowGrp").disabled = false;
    document.getElementById("btnAddGrp").disabled = false;
    document.getElementById("btnOpen").disabled = true;
    document.getElementById("btnSave").disabled = false;

};
function fnOpen() {
    debugger;
    $("#hdnbtnmode").val("open");

    document.getElementById("btnSave").disabled = false;
    document.getElementById("btnNew").disabled = true;
    //$$("srchgrpnm").show();
    $("#btnsrchGrpName").show();
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
                REQTYPE: "GET_FNSAVEMISGROUP",
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
                url: "/GLMaster/COMAPI_CALL",
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
                    
                            SuccessMsg('Saved Successfully');
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
        //webix.message({ type: 'warning', text: 'MIS GroupName cannot be empty' });
        AlertMessage("MIS GroupName cannot be empty");
        webix.UIManager.setFocus($$("txtMisGrpName"));
        return false;;
    }

    if ((Lenmaingrd == 0) && (LenLinkedGrp == 0)) {
        //webix.message({ type: 'warning', text: 'Link Property cannot be empty' });
        AlertMessage("Linked Ledger && Linked Group cannot be empty");

        return false;
    }
    if (Lenmaingrd > 0) {
        for (i = 0; i < Lenmaingrd; i++) {
            if (data[i].GROUP_ID == null || data[i].GROUP_ID == undefined || data[i].GROUP_ID == "") {
                //webix.message({ type: 'warning', text: 'Linked Ledger cannot be empty' });
                AlertMessage("Linked Ledger Row cannot be empty");
                return false;
            }
        }
    }
    if (LenLinkedGrp > 0) {
        for (i = 0; i < LenLinkedGrp; i++) {
            if (data1[i].GROUP_ID == null || data1[i].GROUP_ID == undefined || data1[i].GROUP_ID == "") {
                //webix.message({ type: 'warning', text: 'Linked GRoup cannot be empty' });
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
                                //webix.message({ type: 'warning', text: 'Ledger Already Linked in Group' });
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
                        REQTYPE: "GET_FNGETGRPID",
                        vcmpid: vcmpid,
                        FISCALYEAR: window.FiscalYear,
                        GRPID: grpid,
                        //GL_COMPID: window.GL_CompanyID,
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
                                //var Sa = rowDatad;
                                var Rows = [];

                                accid = rowDatad[0]["AC_ID"];
                                accnm = rowDatad[0]["AC_ALT_NM"];
                            }
                        }

                    });

                    if (accid == grpid) {
                        //webix.message({ type: 'warning', text: accnm + 'Already Linked in Group' + grpid });
                        AlertMessage(accnm + 'Already Linked in Group' + grpid);
                        return false;
                    }
                }

            }
        }}
        return true;

    }
    function Griddesign() {
        var searchicon = "<span class='fa fa-search ' ></span>";

        webix.ui({
            id: "gridMain",
            container: "divgridMain",
            select: 'row',
            view: "treetable",
            fixedRowHeight: false,
            rowLineHeight: 23,
            autoConfig: true,
            editable: true,
            height: 280,
            width: 500,
            //scroll: false,
            //autoheight: true,


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


            onBlur: function () {
                debugger;



            },
            onBeforeClose: function () {
                return false;
            },

            onAfterEditStart: function () {
                debugger;
                this.getEditor().getInputNode().setAttribute("maxlength", 200);
                this.getEditor().getInputNode().style.textAlign = "left";
            },

        })
    };
    function gridLinkedGrp() {
        var searchicon = "<span class='fa fa-search ' ></span>";

        webix.ui({
            id: "gridLinkedGrp",
            container: "divgridLinkedGrp",
            select: 'row',
            view: "treetable",
            fixedRowHeight: false,
            rowLineHeight: 23,
            autoConfig: true,
            editable: true,
            height: 280,
            width: 500,
            //scroll: false,
            //autoheight: true,


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


            onBlur: function () {
                debugger;



            },
            onBeforeClose: function () {
                return false;
            },

            onAfterEditStart: function () {
                debugger;
                this.getEditor().getInputNode().setAttribute("maxlength", 200);
                this.getEditor().getInputNode().style.textAlign = "left";
            },

        })
    };

    function fnCallAddRow() {
        debugger;

        $$("gridMain").editStop();
        $$("gridMain").add({ "GROUP_ID": "", "GROUP_NM": "" });
        $$("gridMain").refresh();
        $$("gridMain").refreshColumns();

    }

    function fnCallAddRowGrp() {
  
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
        document.getElementById("btnDelRow").disabled = false;
        document.getElementById("btnAdd").disabled = false;
        document.getElementById("btnDelRowGrp").disabled = false;
        document.getElementById("btnAddGrp").disabled = false;
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
                    REQTYPE: "GET_FNGETGRPNM",
                    vcmpid: vcmpid,
                }
                requestData = JSON.stringify(Request);
                requestData = encodeURIComponent(requestData);

                $.ajax({
                    async: true,
                    url: "/GLMaster/COMAPI_CALL",
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
                    REQTYPE: "GET_FNLoadLedger",
                    vcmpid: vcmpid,
                    GRPID: GRPID,
                    FISCALYEAR: window.FiscalYear,
                    GridType: GridType,
                }
                requestData = JSON.stringify(Request);
                requestData = encodeURIComponent(requestData);

                $.ajax({
                    async: true,
                    url: "/GLMaster/COMAPI_CALL",
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
                                id: "lblgrpna", view: "label", label: "GROUP", css: { 'text-align': 'center ! important' },

                            },
                            {
                                id: "ddlgrpname", view: "richselect", on: { onChange: function () { fnddlGrpChange(); } }

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
                                //  { id: "ChkAccsel", header: "", editor: "Checkbox", width: 30, css: "check_box", template: "{common.checkbox()}", css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
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
                               //{
                               //    view: "checkbox", id: "ChkAllAccsel", labelWidth: 0, labelRight: "Select All", customCheckbox: false,

                               //    click: function () {
                               //        debugger;

                               //        //if ($$("ChkAllAccsel").getValue() == "1") {
                               //        //    $$("gridPropSel").data.each(function (obj) {
                               //        //        //    //debugger;

                               //        //        obj.ChkAccsel = "1";
                               //        //        debugger;
                               //        //    });
                               //        //}
                               //        //else {
                               //        //    $$("gridPropSel").data.each(function (obj) {
                               //        //        //    //debugger;

                               //        //        obj.ChkAccsel = "0";
                               //        //        debugger;
                               //        //    });
                               //        //};
                                          

                               //    }

                               //},



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
                REQTYPE: "GET_FNGETLEDGER",
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
                url: "/GLMaster/COMAPI_CALL",
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
                REQTYPE: "GET_FNLOADGROUP",
                vcmpid: vcmpid,
                FISCALYEAR: window.FiscalYear,
                GRDTYPE: GrdType,
             
            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);

            $.ajax({
                async: true,
                url: "/GLMaster/COMAPI_CALL",
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
                REQTYPE: "GET_FNGETLEDGER",
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
                url: "/GLMaster/COMAPI_CALL",
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
