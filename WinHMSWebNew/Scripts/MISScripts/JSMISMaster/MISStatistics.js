
var pageload = function () {
    debugger;

    webix.ui({ container: "divlblStatisId", view: "label", id: "lblStatisName", label: "Statistics Name" });
    webix.ui({ container: "divStatisId", view: "text", id: "txtStatisID", maxwidth: 80, type: "text", hidden: true, inputAlign: "left", attributes: { maxlength: 5 } });
    webix.ui({ container: "divStatisId", view: "text", id: "txtStatisName", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 60 } });
    webix.ui({ container: "divStatisId", view: "richselect", maxWidth: 400, id: "ddlstatisId",placeholder: "<-Select->", hidden: true, on: { onChange: function () { fnddlStatisChange(); } } });
    webix.ui({ container: "divchkactive", view: "checkbox", id: "Chkactive", labelWidth: 0, maxWidth: 25, customCheckbox: false });
    webix.ui({ container: "divlblchkactive", view: "label", id: "lblchkactive", label: "Active", });


    webix.ui({ container: "divlblType", view: "label", id: "lblType", label: "Type", });
    webix.ui({ container: "divddlType", view: "richselect", maxWidth: 400, id: "ddlType",placeholder: "<-Select->", on: { onChange: function () { fnddlTypeChange(); } } });

    webix.ui({ container: "divlblhdnlbl1", view: "label", id: "lblhdn1", hidden: true, label: "" });
    webix.ui({ container: "divhdncntrl1", view: "richselect", maxWidth: 400,placeholder: "<-Select->", id: "ddloutlet", hidden: true, });
    webix.ui({ container: "divhdncntrl1", view: "text", id: "txtSegment", hidden: true, readonly: true, maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 25 } });
    webix.ui({ container: "divhdncntrl1", view: "text", id: "txtRevenue", hidden: true, readonly: true, maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblhdnlbl2", view: "label", id: "lblhdn2", label: "", hidden: true, });
    webix.ui({ container: "divhdncntrl2", view: "richselect",placeholder: "<-Select->", maxWidth: 400, id: "ddlsession", hidden: true, });
    webix.ui({ container: "divhdncntrl2", view: "richselect",placeholder: "<-Select->", maxWidth: 400, id: "ddlCategory", hidden: true, });


    webix.ui({ container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property", on: { onChange: function () { fnPropChange(); } } });



}



function fnPropertyLoad(CompId) {
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_PROPERTYLOAD",
        PROGNAME: "GET_COMFUNCCLASS",
        COMPID: CompId,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
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
    fnddlTypeLoad();

    fnLoadddloutlet();
    fnLoaddlsession();

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
       
    })
}

function fnNew() {
    debugger;
    $$("Chkactive").setValue("1");
    $("#hdnbtnmode").val("new");
    $$("txtStatisName").setValue("");
    $$("txtStatisName").enable();
    $$("ddlType").setValue("");
    $$("ddlType").enable();
    $$("Chkactive").enable();  
    document.getElementById("btnOpen").disabled = true;
    document.getElementById("btnSave").disabled = false;
}

function fnddlTypeLoad(){
   
        debugger;
        var vcmpid = "";
        vcmpid = $$("Property").getValue();
        var ChkActive = $$("Chkactive").getValue();
        var FOcatID = $("#hdnFOCATID").val();
        var rowDatad = [];
        try {
            Request = {
                PROGNAME: "GET_FNLOADTYPE",
                vcmpid: vcmpid,
               
                ChkActive: ChkActive,
                FOCATID: FOcatID
              
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
                        $$("ddlType").define("options", rowDatad);

                    }

                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
};

function fnRefresh() {
    debugger;
    document.getElementById("btnOpen").disabled = false;

    document.getElementById("btnNew").disabled = false;
    document.getElementById("btnSave").disabled = true;
    $$("ddlType").setValue();
    
  
    $("#hdnbtnmode").val("");
    $("#hdnREVENUEID").val("");
    $("#hdnSegmentID").val("");
    $$("txtStatisID").disable();
    $$("txtStatisID").setValue("");
    $$("txtStatisName").disable();
    $$("Chkactive").disable();
    $$("ddlType").disable();
    $$("txtStatisName").setValue("");
    
    $("#btnsrcStatisNm").hide();
    $$("Chkactive").setValue("");//
    $("#btnsrcSegment").hide();
    $("#btnsrcRevenue").hide();

    $$("lblhdn1").hide();
    $$("ddloutlet").hide();
    $$("txtSegment").hide();
    $$("txtSegment").setValue("");
    $$("txtRevenue").hide();
    $$("txtRevenue").setValue("");
    $$("lblhdn2").hide();
    $$("ddlsession").hide();
    $$("ddlCategory").hide();
}

function fnOpen() {
    debugger;
   // fnRefresh();
    $("#hdnbtnmode").val("open");

    document.getElementById("btnSave").disabled = false;
    document.getElementById("btnNew").disabled = true;
    
    $("#btnsrcStatisNm").show();
};


function fnsave() {
    debugger;

    var bValid = fnValidation();
    if (bValid == true) {
        debugger;
        var btnmode = $("#hdnbtnmode").val();
        var Stat_Id = "";
        if (btnmode == "open") {
            
            Stat_Id = $$("txtStatisID").getValue();
        }

        var StatisName = $$("txtStatisName").getValue();
        var ChkActive = $$("Chkactive").getValue();
        var ddlType = $$("ddlType").getValue();


        var FB_CAT_ID = $("#hdnFBCATID").val();
        var RevId = "";
        var StatCat = "";
        var SgId = ""; 
        var OutletId = "";
        var sessionId = "";
        
            


        if (ddlType == "100" || ddlType == "101") {
                if (FB_CAT_ID == "0") {
                    OutletId = $$("ddloutlet").getValue();
                }
                else if (FB_CAT_ID == "S") {
                    sessionId = $$("ddlsession").getValue();
                }
                else if (FB_CAT_ID == "U" || FB_CAT_ID == "") {
                    OutletId = $$("ddloutlet").getValue();
                    sessionId = $$("ddlsession").getValue();
                }

            }
        if (ddlType == "010") {
            //SgId = $$("txtSegment").getValue();
            SgId = $("#hdnSegmentID").val();
           
        }
        if (ddlType == "009") {
            //RevId = $$("txtRevenue").getValue();
            RevId = $("#hdnREVENUEID").val();
            StatCat = $$("ddlCategory").getValue();
        }
        
        
        vcmpid = $$("Property").getValue();
        try {

            Request = {
                PROGNAME: "GET_FNSAVESTATISTIC",

                StatisticName: StatisName,
                ChkActive: ChkActive,
                btnmode: btnmode,
                vcmpid: vcmpid,
                RevId: RevId,
                StatCat: StatCat,
                SgId: SgId,
                OutletId: OutletId,
                sessionId: sessionId,
                Stat_Ty: ddlType,
                Stat_Id: Stat_Id
               
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

   

    if ($.trim($$("txtStatisName").getValue()) == "") {
       
        AlertMessage("Statistic Name cannot be empty");
        webix.UIManager.setFocus($$("txtStatisName"));
        return false;;
    }
    if ($$("ddlType").getValue() == "") {
        
        AlertMessage("Type cannot be empty");
       
        return false;;
    }

    return true;
}

function fnSrchStatisticNm() {
    debugger;
    serchStatNmgrid();

    //fnLoadPkgSel();
    fnLoadGridStatNM();
    $$("gridStatNM").show();
    $$("StatisticNMSearch").show();

    $$("txtStatisName").enable();
    $$("txtStatisName").enable();
    $$("ddlType").enable();
    $$("Chkactive").enable();
    
}

function serchStatNmgrid() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "StatisticNMSearch",
        head: "STATISTICS NAME SEARCH",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridStatNM",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [
                           { id: "STAT_ID", header: ['STAT ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           
                           { id: "STAT_NM", header: ['Statistics Name', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },

                           { id: "STAT_TY_ID", header: ['StatTyId', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "A_IND", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "OUTLET_ID", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "SESSION_ID", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "SG_ID", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "REV_ID", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "STAT_CAT", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "seg_nm", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           { id: "revenue_nm", header: ['chkact', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                           
                   ],
                   data: [],
                   on: {


                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridStatNM").getSelectedItem();
                          
                           $$("txtStatisName").setValue(selRow.STAT_NM);
                           $$("txtStatisID").setValue(selRow.STAT_ID);
                           $$("ddlType").setValue($.trim(selRow.STAT_TY_ID));



                           var chkact = selRow.A_IND;
                           if (chkact == "1") {
                               $$("Chkactive").setValue("");
                           }
                           else
                               $$("Chkactive").setValue("1");

                           //fnddlTypeChange();

                           fnLoadddloutlet();
                           $$("ddloutlet").setValue((selRow.OUTLET_ID));
                           fnLoaddlsession();
                           $$("ddlsession").setValue((selRow.SESSION_ID));
                           $$("txtSegment").setValue(selRow.seg_nm);
                           $("#hdnSegmentID").val(selRow.SG_ID);

                           $$("txtRevenue").setValue(selRow.revenue_nm);
                           $("#hdnREVENUEID").val(selRow.REV_ID);
                           fnLoadddlCategory();
                           $$("ddlCategory").setValue((selRow.STAT_CAT));
                           
                           $$("StatisticNMSearch").hide();
                           $$("gridStatNM").hide();



                       },


                   },

               },



            ],
        }

    });
}

function fnLoadGridStatNM() {
    {
        debugger;

        var vcmpid = $$("Property").getValue();

        var rowDatad = [];
        try {
            Request = {
                PROGNAME: "GET_FNLoadGridStatNM",
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

                        $$("gridStatNM").parse(rowDatad);
                        $$("gridStatNM").refresh();

                    }

                },

            });

        }
        catch (e) {
            console.log(e.message);

        }
    };

}


function fnsrchSegment() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SegmentSearch",
        head: "SEGMENT SEARCH",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridSegment",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [
                       
                           { id: "guest_inform_id", header: ['guest_inform_id', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },

                           { id: "guest_inform_nm", header: ['Segment', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           
                          
                   ],
                   data: [],
                   on: {


                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridSegment").getSelectedItem();
                           $$("txtSegment").setValue(selRow.guest_inform_nm);
                           $("#hdnSegmentID").val(selRow.guest_inform_id);            
                           $$("gridSegment").hide();
                           $$("SegmentSearch").hide();



                       },


                   },

               },



            ],
        }

    });
}

function fnsrchRevenue() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RevenueSearch",
        head: "REVENUE SEARCH",
        position: "center",
        css: "WebIxStyle",
        height: 500,
        width: 383,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridRevenue",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [

                           { id: "revenue_id", header: ['revenue_id', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },

                           { id: "revenue_nm", header: ['Revenue Name', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                   ],
                   data: [],
                   on: {


                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridRevenue").getSelectedItem();
                           $$("txtRevenue").setValue(selRow.revenue_nm);
                           //hdnREVENUEID
                           $("#hdnREVENUEID").val(selRow.revenue_id);
                           $$("gridRevenue").hide();
                           $$("RevenueSearch").hide();



                       },


                   },

               },



            ],
        }

    });
}


function fnddlTypeChange() {
    debugger;
    $$("lblhdn1").hide();
    $$("ddloutlet").hide();
    $$("txtSegment").hide();
    $$("txtRevenue").hide();
    $$("lblhdn2").hide();
    $$("ddlsession").hide();
    $$("ddlCategory").hide();
    $("#btnsrcSegment").hide();
    $("#btnsrcRevenue").hide();
    //btnsrcRevenue

    $$("lblhdn2").setValue("");
    $$("lblhdn1").setValue("");
    $$("txtSegment").setValue("");
    $$("txtRevenue").setValue("");

    var FB_CAT_ID="";

  //  fnLoadddloutlet();
    var ddlTypeValue = $$("ddlType").getValue();

    var FB_CAT_ID = $("#hdnFBCATID").val();
    if (ddlTypeValue == "100" || ddlTypeValue == "101") {
        if (FB_CAT_ID == "0") {
            $$("lblhdn1").show();
            $$("lblhdn1").setValue("Outlet");
            $$("ddloutlet").show();
            $$("lblhdn2").setValue("");
            $$("ddlsession").hide();
            fnLoadddloutlet();
        }
        else if (FB_CAT_ID == "S") {
            $$("lblhdn1").show();
            $$("lblhdn1").setValue("Session");
            $$("ddlsession").show()
            //$$("lblhdn1").setValue("Outlet");
            $$("ddloutlet").hide();
            $$("lblhdn2").setValue("");
            fnLoaddlsession();

        }
        else if (FB_CAT_ID == "U" || FB_CAT_ID == "") {
            $$("lblhdn1").show();
            $$("lblhdn1").setValue("Outlet");
            $$("ddloutlet").show();
            $$("ddlsession").show();
            //$$("lblhdn1").setValue("Outlet");
            $$("lblhdn2").show();
            $$("lblhdn2").setValue("Session");
            fnLoadddloutlet();
            fnLoaddlsession();

        }
    }
    if (ddlTypeValue == "010") {
        $$("lblhdn1").show();
            $$("lblhdn1").setValue("Segment");
            $$("txtSegment").show();
            $("#btnsrcSegment").show();
        }

    if (ddlTypeValue == "009") {
        $$("lblhdn1").show();
            $$("lblhdn1").setValue("Revenue");
            $$("txtRevenue").show();
        // $("#btnsrcSegment").show();
            $("#btnsrcRevenue").show();
            $$("lblhdn2").show();
            $$("lblhdn2").setValue("Category");
            $$("ddlCategory").show();
            fnLoadddlCategory();
        }

}


function fnLoadddloutlet() {

    debugger;
    var vcmpid = "";
    vcmpid = $$("Property").getValue();
    //var ChkActive = $$("Chkactive").getValue();
    var rowDatad = [];
    try {
        Request = {
            PROGNAME: "GET_FnLoadOutlet",
            vcmpid: vcmpid,
           
            //ChkActive: ChkActive

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
                    $$("ddloutlet").define("options", rowDatad);

                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }
};


function fnLoaddlsession() {

    debugger;
    var vcmpid = "";
    vcmpid = $$("Property").getValue();

    var rowDatad = [];
    try {
        Request = {
            PROGNAME: "GET_FnLoadSession",
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
                    //var Sa = rowDatad;
                    var Rows = [];
                    $$("ddlsession").define("options", rowDatad);

                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }
};


function fnLoadddlCategory() {
    debugger;
    var category = [
        {
            "id": "N", "value": "Room Nights"
        },
        {
            "id": "P", "value": "Pax"
        },
         {
             "id": "R", "value": "Room Revenue"
         }
    ]
    
    $$("ddlCategory").define("options", category);
}


function fnLoadCATID() {

    debugger;
    var vcmpid = "";
    vcmpid = $$("Property").getValue();

    var rowDatad = [];
    try {
        Request = {
            PROGNAME: "GET_FnLoadCATID",
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
                    //var Sa = rowDatad;
                    var Rows = [];

                    if (rowDatad != "" && rowDatad != null) {

                        if (rowDatad[0].C_IND != "" && rowDatad[0].C_IND != null) {
                            $("#hdnFOCATID").val(rowDatad[0]["FO_CAT_ID"]);
                        }

                            if (rowDatad[0].D_IND != "" && rowDatad[0].D_IND != null) {
                                $("#hdnFBCATID").val(rowDatad[0]["FB_CAT_ID"]);
                            }
                        

                    }
                }

            },

        });

    }
    catch (e) {
        console.log(e.message);

    }
};

function fnLoadSegmentRevGrd(SrchTy) {
    {
        debugger;

        var vcmpid = $$("Property").getValue();
        var ChkActive = $$("Chkactive").getValue();
        if (SrchTy == "S") {

        }
        else if (SrchTy == "R") {

        }

        var rowDatad = [];
        try {
            Request = {
                PROGNAME: "GET_FNLoadGridSegment",
                vcmpid: vcmpid,
                ChkActive: ChkActive,
                SearchType: SrchTy
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
                        if (SrchTy == "S") {
                            $$("gridSegment").parse(rowDatad);
                            $$("gridSegment").refresh();
                        }
                        else if (SrchTy == "R") {
                            $$("gridRevenue").parse(rowDatad);
                            $$("gridRevenue").refresh();
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
