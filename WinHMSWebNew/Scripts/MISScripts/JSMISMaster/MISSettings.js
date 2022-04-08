

var pageload = function () {
   debugger;

webix.ui({ container: "divlblStatappl", view: "label", id: "lblStatapplic", label: "Statistics Applicable" });
webix.ui({ container: "divchkstatappl", view: "checkbox", id: "ChkStaticApplic", labelWidth: 0, maxWidth: 25, customCheckbox: false, on: { onItemClick: function () { fnchkstatappChange(); } } });

webix.ui({ container: "divlblfoStatappl", view: "label", id: "lblfoStatappl", label: "FO Statistics Applicable" });
webix.ui({ container: "divchkfostatappl", view: "checkbox", id: "Chkfostatapplic", labelWidth: 0, maxWidth: 25, customCheckbox: false, on: { onItemClick: function () { fnChkfostatapplicChange(); } } });

webix.ui({ container: "divlblapplicdept", view: "label", id: "lblApplicDept", label: "Applicable Departments" });
webix.ui({ container: "divtxtapplicdept", view: "text", id: "txtAplicDept", readonly: true, maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 5000 } });

webix.ui({ container: "divlblCategory", view: "label", id: "lblCategory", label: "Category" });
webix.ui({ container: "divddlcategory", view: "richselect", maxWidth: 400, id: "ddlCategory", placeholder: "<-Select->" });

webix.ui({ container: "divlblFBStat", view: "label", id: "lblfoStatapplic", label: "F&B Statistics Applicable" });
webix.ui({ container: "divchkFBStat", view: "checkbox", id: "ChkFbStatApplic", labelWidth: 0, maxWidth: 25, customCheckbox: false, on: { onItemClick: function () { fnChkFbStatApplicChange(); } } });

webix.ui({ container: "divlblapplicdept2", view: "label", id: "lblApplicDept2", label: "Applicable Departments" });
webix.ui({ container: "divtxtapplicdept2", view: "text", id: "txtAplicDept2", readonly: true, maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 5000 } });

webix.ui({ container: "divlblCategory2", view: "label", id: "lblCategory2", label: "Category" });
webix.ui({ container: "divddlcategory2", view: "richselect", maxWidth: 400, id: "ddlCategory2", placeholder: "<-Select->" });

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

function fnRefresh() {
    debugger;

    $$("ChkStaticApplic").disable();
    $$("ChkStaticApplic").setValue("");
    $$("Chkfostatapplic").disable();
    $$("Chkfostatapplic").setValue("");
    $$("txtAplicDept").disable();
    //$("#btnsrcAppllicdt").disabled = true;
    $("#btnsrcAppllicdt").hide();
   
    $$("ddlCategory").setValue();
    $$("ddlCategory2").setValue();
    $$("ddlCategory").disable();
    $$("ChkFbStatApplic").disable();
    $$("ChkFbStatApplic").setValue("");
    $$("txtAplicDept2").disable();
    $$("ddlCategory2").disable();
    //$("#btnsrcAppllicdt2").disabled = true;
    $("#btnsrcAppllicdt2").hide();
    document.getElementById("btnSave").disabled = true;

    $("#hdnTC_ID").val("");
    $("#hdnFBTC_ID").val("");
    $$("txtAplicDept").setValue("");
    $$("txtAplicDept2").setValue("");
}

function fnOpen() {
    $$("ChkStaticApplic").enable();
    document.getElementById("btnSave").disabled = false;
    fopenSettings(); 

    
}

    function fopenSettings() {
        {
            debugger;

            var vcmpid = $$("Property").getValue();

            var rowDatad = [];
            try {
                Request = {
                    PROGNAME: "GET_FNOpenSettings",
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

                            var B_IND = rowDatad[0]["B_IND"];
                            if (B_IND == "1") {
                                $$("ChkStaticApplic").setValue("1")
                                fnchkstatappChange();
                            }
                            var C_IND = rowDatad[0]["C_IND"];
                            if (C_IND == "1") {
                                $$("Chkfostatapplic").setValue("1")
                                fnChkfostatapplicChange();
                                $$("txtAplicDept").setValue(rowDatad[0]["FO_DEPT_NM"]);
                                $("#hdnTC_ID").val("");
                                 $("#hdnTC_ID").val(rowDatad[0]["FO_DEPT_ID"]);
                                 fnLoadddlFoCategory();
                                 $$("ddlCategory").setValue($.trim(rowDatad[0]["FO_CAT_ID"]));

                            }

                            var D_IND = rowDatad[0]["D_IND"];
                            if (D_IND == "1") {
                                $$("ChkFbStatApplic").setValue("1")
                                fnChkFbStatApplicChange();
                                $$("txtAplicDept2").setValue(rowDatad[0]["FB_DEPT_NM"]);
                                $("#hdnFBTC_ID").val("");
                                $("#hdnFBTC_ID").val(rowDatad[0]["FB_DEPT_ID"]);
                                $$("ddlCategory2").setValue($.trim(rowDatad[0]["FB_CAT_ID"]));

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



function fnchkstatappChange(){
    debugger;

    if ($$("ChkStaticApplic").getValue() == "0") {
       
        $$("Chkfostatapplic").setValue("0");

        $$("Chkfostatapplic").disable();
        $$("txtAplicDept").disable();
        $$("txtAplicDept").setValue("");
        //document.getElementById("btnsrcAppllicdt").disabled = true;
        $("#btnsrcAppllicdt").show();
        
        $$("ddlCategory").disable();
        $$("ddlCategory").setValue("");

        $$("ChkFbStatApplic").setValue("0");
        $$("ChkFbStatApplic").disable();

        $$("txtAplicDept2").disable();
        $$("txtAplicDept2").setValue("");
        //document.getElementById("btnsrcAppllicdt2").disabled = true;
        $("#btnsrcAppllicdt2").show();

        $$("ddlCategory2").disable();
        $$("ddlCategory2").setValue("");


    }
    else {
        $$("Chkfostatapplic").enable();
        $$("ChkFbStatApplic").enable();
    }



   

}

function fnsave() {
    debugger;

    var bValid = fnValidation();
    if (bValid == true) {
        debugger;
        //var btnmode = $("#hdnbtnmode").val();
        vcmpid = $$("Property").getValue();

        var B_IND = "";
        var C_IND = "";
        var D_IND = "";
        var FO_DEPT_ID = "";
        var FO_DEPT_NM = "";
        var Fo_CAT_id = "";
        var FB_DEPT_ID = "";
        var FB_DEPT_NM = "";
        var Fb_CAT_id = "";

        if ($$("ChkStaticApplic").getValue() == "1") {
            B_IND = "1";
            if ($$("Chkfostatapplic").getValue() == "1") {
                C_IND = "1";

                FO_DEPT_ID = $("#hdnTC_ID").val();
                FO_DEPT_NM = $$("txtAplicDept").getValue();
                Fo_CAT_id = $$("ddlCategory").getValue();
            }
            if ($$("ChkFbStatApplic").getValue() == "1") {
                D_IND = "1";

                FB_DEPT_ID = $("#hdnFBTC_ID").val();
                FB_DEPT_NM = $$("txtAplicDept2").getValue();
                Fb_CAT_id = $$("ddlCategory2").getValue();
            }
        }

        try {

            Request = {
                PROGNAME: "GET_FNSAVEMisSettings",
                vcmpid: vcmpid,
                B_IND: B_IND,
                C_IND: C_IND,
                D_IND: D_IND,
                FO_DEPT_ID: FO_DEPT_ID,
                FO_DEPT_NM: FO_DEPT_NM,
                Fo_CAT_id: Fo_CAT_id,
                FB_DEPT_ID: FB_DEPT_ID,
                FB_DEPT_NM: FB_DEPT_NM,
                Fb_CAT_id: Fb_CAT_id
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

    if ($$("ChkStaticApplic").getValue() == "1" && $$("Chkfostatapplic").getValue() == "1") {

        if ($.trim($$("txtAplicDept").getValue()) == "") {
            
            AlertMessage("FO Applicable Department cannot be empty");
            webix.UIManager.setFocus($$("txtAplicDept"));
            return false;;
        }
    }
    if ($$("ChkStaticApplic").getValue() == "1" && $$("Chkfostatapplic").getValue() == "1") {
        if ($$("ddlCategory").getValue() == "") {
            
            AlertMessage("FO Category cannot be empty");

            return false;;
        }
    }

    if ($$("ChkStaticApplic").getValue() == "1" && $$("ChkFbStatApplic").getValue() == "1") {

        if ($.trim($$("txtAplicDept2").getValue()) == "") {

            AlertMessage("FB Applicable Department cannot be empty");
            webix.UIManager.setFocus($$("txtAplicDept2"));
            return false;;
        }
    }

    if ($$("ChkStaticApplic").getValue() == "1" && $$("ChkFbStatApplic").getValue() == "1") {
        if ($$("ddlCategory").getValue() == "") {
           
            AlertMessage("FB Category cannot be empty");

            return false;;
        }
    }
    if ($$("Chkfostatapplic").getValue() == "0" && $$("ChkFbStatApplic").getValue() == "0") {
        AlertMessage("FO And F&B Statistic Applicable cannot be empty");

        return false;;
    }
    if ($$("ChkStaticApplic").getValue() == "0") {
        AlertMessage("Statistic Applicable cannot be empty");

        return false;;
    }


    return true;
}

function fnChkfostatapplicChange() {

    if ($$("Chkfostatapplic").getValue() == "1") {
        $$("txtAplicDept").enable();
        $$("txtAplicDept").setValue("");
        //document.getElementById("btnsrcAppllicdt").disabled = false;
        $("#btnsrcAppllicdt").show();
        $$("ddlCategory").enable();
    }
    else {
        $$("txtAplicDept").disable();
        //document.getElementById("btnsrcAppllicdt").disabled = true;
        $("#btnsrcAppllicdt").hide();
        $$("ddlCategory").disable();
    }

}

function fnChkFbStatApplicChange() {

    if ($$("ChkFbStatApplic").getValue() == "1") {
        $$("txtAplicDept2").enable();
        $$("txtAplicDept2").setValue("");
        //document.getElementById("btnsrcAppllicdt2").disabled = false;
        $("#btnsrcAppllicdt2").show();
        $$("ddlCategory2").enable();
    }
    else {
        $$("txtAplicDept2").disable();
        $("#btnsrcAppllicdt2").hide();
        $$("ddlCategory2").disable();
    }
}







    function fnsrchApplicDept() {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "SrchApplicDept",
            head: "MIS Analysis",
            position: "center",
            css: "WebIxStyle",
            height: 500,
            width: 450,
            move: true,
            body: {
                rows: [

                   {
                       view: "datatable",
                       id: "gridApplicDept",
                       select: 'row',
                       css: "webix_header_border",
                       columns: [
                               { id: "TC_ID", header: ['COMPANY ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                               { id: "TC_NM", header: ['NAME', { content: "textFilter" }], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
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
                               view: "checkbox", id: "Chkactive", labelWidth: 0, labelRight: "Active", customCheckbox: false, on: { onItemClick: function () { fnchkactiveChange(); } }
                           },
                               
                               {
                                   view: "button",
                                   label: "Ok",
                                   inputWidth: 70,
                                   css: "webix_primary",

                                   click: function () {
                                       debugger;
                                       //var Rows = [];
                                       var vTcId = "";
                                       var vTcNm = "";
                                       var vAdd = false;

                                  
                                       $$("gridApplicDept").data.each(function (obj) {
                                             
                                           if (obj.ChkAccsel=="1") {
                                               if (vTcNm != "") {
                                                   vTcNm = vTcNm + "," + $.trim(obj.TC_NM)
                                               }
                                               else
                                               {
                                                   vTcNm = $.trim(obj.TC_NM);
                                               }

                                               if (vTcId != "") {
                                                   vTcId = vTcId + "," + $.trim(obj.TC_ID);
                                               }
                                               else {
                                                   vTcId = $.trim(obj.TC_ID);
                                               }
                                               vAdd = true;
                                           }

                                                   
                                               
                                       });

                                       if (vTcId != "") {
                                           $("#hdnTC_ID").val("");
                                           $("#hdnTC_ID").val(vTcId);
                                           $$("txtAplicDept").setValue("");
                                           $$("txtAplicDept").setValue(vTcNm);
                                           //
                                       }
                                       

                                       if (vAdd == true) {
                                           $$("SrchApplicDept").hide();
                                           
                                       }

                                       else {
                                           
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

    function fnchkactiveChange() {
        debugger;   
       // $("#hdnTC_ID").val("");
        
        //$$("txtAplicDept").setValue("");
        $$("gridApplicDept").clearAll();
            fnloadGrdApp("FOAPP");
        
    };

    function fnchkFBactiveChange() {
        //$("#hdnFBTC_ID").val("");
        $$("gridFBAppDept").clearAll();
        //$$("txtAplicDept2").setValue("");
     
            fnloadGrdApp("FBAPP");
        
    };


    function fnLoadGrdApplicDt() {
        debugger;   

       var lendata= $$("txtAplicDept").getValue();
           fnsrchApplicDept();
           fnloadGrdApp("FOAPP");

    }

    function fnLoadGrdFBAppDt() {
        debugger;

        var lendata = $$("txtAplicDept2").getValue();
            fnsrchFBAppDept();
            fnloadGrdApp("FBAPP");

    }

    
    function fnloadGrdApp(GRDTYPE) {
            
                debugger;

                var vcmpid = $$("Property").getValue();
                var chkact = "";
              
                if (GRDTYPE == "FOAPP") {
                    if ($$("Chkactive").getValue() == "1") {
                        chkact = "ACTIVE";
                    }
                }
                
              
                if (GRDTYPE == "FBAPP") {
                    if ($$("Chkactivefo").getValue() == "1") {
                        chkact = "ACTIVE";
                    }
                }

                var rowDatad = [];
                try {
                    Request = {
                        PROGNAME: "GET_FNLoadGridFoApplic",
                        vcmpid: vcmpid,
                        chkact: chkact,
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
                                var hdnFOId = $("#hdnTC_ID").val();
                                var hdnFBId = $("#hdnFBTC_ID").val();
                                if(GRDTYPE=="FOAPP"){
                                    $$("gridApplicDept").parse(rowDatad);
                                    var data = $$("gridApplicDept").serialize();
                                    var lendata = data.length;
                                    strFOID = [];
                                    strFOID = hdnFOId.split(',');
                                  
                                    if (lendata != 0) {
                                        for (i = 0; i < lendata; i++) {
                                            var tcid = data[i].TC_ID

                                            for (j = 0; j < strFOID.length; j++) {
                                                var intfoid = strFOID[j]

                                                intfoid = parseInt(intfoid);
                                                if (intfoid == tcid) {
                                                    data[i].ChkAccsel = "1";
                                                    break;
                                                }
                                                else
                                                    data[i].ChkAccsel = "0";
                                            }
                                       
                                        }
                                    }

                                    $$("gridApplicDept").refresh();
                                }

                                    else if (GRDTYPE == "FBAPP") {
                                   $$("gridFBAppDept").parse(rowDatad);
                                   var data = $$("gridFBAppDept").serialize();
                                   var lendata = data.length;

                                   strFBID = [];
                                   strFBID = hdnFBId.split(',');

                                   if (lendata != 0) {
                                       for (i = 0; i < lendata; i++) {
                                           var tcid = data[i].TC_ID

                                           for (j = 0; j < strFBID.length; j++) {
                                               var intfbid = strFBID[j]

                                               intfbid = parseInt(intfbid);
                                               if (intfbid == tcid) {
                                                   data[i].ChkAccsel = "1";
                                                   break;
                                               }
                                               else
                                                  data[i].ChkAccsel = "0";
                                           }
                                         
                                       }
                                   }

                                        // 04/02/2021
                                   
                                   
                                   
                                   
                                   $$("gridFBAppDept").refresh();
                                }

                            }

                        },

                    });

                }
                catch (e) {
                    console.log(e.message);

                }
            };


        function fnLoadddlFoCategory() {
            debugger;
            var category = [
                {
                    "id": "A", "value": "Rate Type Wise Revenue"
                },
                {
                    "id": "S", "value": "Segment Wise"
                },
                 {
                     "id": "R", "value": "Room Revenue"
                 }
            ]

            $$("ddlCategory").define("options", category);
        }


        function fnLoadddlFBCategory() {
            debugger;
            var category = [
                {
                    "id": "S", "value": "Session"
                },
                {
                    "id": "U", "value": "Outlet & Session"
                },
                 {
                     "id": "O", "value": "Outlet Wise"
                 }
            ]

            $$("ddlCategory2").define("options", category);
        }

        function fnsrchFBAppDept() {
            webix.ui({
                view: "window",
                close: true,
                modal: true,
                id: "SrchFBAppDept",
                head: "MIS Analysis",
                position: "center",
                css: "WebIxStyle",
                height: 500,
                width: 450,
                move: true,
                body: {
                    rows: [

                       {
                           view: "datatable",
                           id: "gridFBAppDept",
                           select: 'row',
                           //editable: true,
                           css: "webix_header_border",
                           //scrollX: false,
                           columns: [
                                   { id: "TC_ID", header: ['COMPANY ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                                   { id: "TC_NM", header: ['NAME', { content: "textFilter" }], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
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
                               {
                                   view: "checkbox", id: "Chkactivefo", labelWidth: 0, labelRight: "Active", customCheckbox: false, on: { onItemClick: function () { fnchkFBactiveChange(); } }
                               },
                                   



                                   {
                                       view: "button",
                                       label: "Ok",
                                       inputWidth: 70,
                                       css: "webix_primary",

                                       click: function () {
                                           debugger;
                                           //var Rows = [];
                                           var vTcId = "";
                                           var vTcNm = "";
                                           var vAdd = false;

                                           $$("gridFBAppDept").data.each(function (obj) {
                                               //debugger;


                                               if (obj.ChkAccsel == "1") {
                                                   if (vTcNm != "") {
                                                       vTcNm = vTcNm + "," + $.trim(obj.TC_NM)
                                                   }
                                                   else {
                                                       vTcNm = $.trim(obj.TC_NM)
                                                   }

                                                   if (vTcId != "") {
                                                       vTcId = vTcId + "," + $.trim(obj.TC_ID)
                                                   }
                                                   else {
                                                       vTcId = $.trim(obj.TC_ID)
                                                   }
                                                   vAdd = true;
                                               }


                                           });

                                           if (vTcId != "") {
                                               $("#hdnFBTC_ID").val("");
                                               $("#hdnFBTC_ID").val(vTcId);
                                               $$("txtAplicDept2").setValue("");
                                               $$("txtAplicDept2").setValue(vTcNm);
                                               //
                                           }


                                           if (vAdd == true) {
                                        
                                               $$("SrchFBAppDept").hide();

                                           }

                                           else {

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