var PageLoad = function () {
    webix.ui({ container: "divlblLocid", view: "label", id: "lbllocId", label: "Location Id" });
    webix.ui({ container: "divtxtLocId", view: "text", id: "txtlocId", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 2 } });

    webix.ui({ container: "divlblLocname", view: "label", id: "lbllocname", label: "Location Name" });
    webix.ui({ container: "divtxtLocname", view: "text", id: "txtlocname", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });
    //on: { onChange: function () { fnddlUnitIdChng(); } } });

    webix.ui({ container: "divlblshortname", view: "label", id: "lblshortname", label: "Short Name" });
    webix.ui({ container: "divtxtshortname", view: "text", id: "txtshortname", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 15 } });

    webix.ui({ container: "divlblcountname", view: "label", DataTextField:"Text", id: "lblcountid", label: "Country Id" });
    webix.ui({ container: "divtxtcountname", view: "text", id: "ddlcountid", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 4 } });

    webix.ui({ container: "divlblzip", view: "label", id: "lblzip", label: "Zip" });
    webix.ui({ container: "divtxtzip", view: "text", id: "txtzip", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 10 } });

    webix.ui({ container: "divlbltelno", view: "label", id: "lbltelno", label: "TelNo" });
    webix.ui({ container: "divtxttelno", view: "text", id: "txttelno", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlbladdr1", view: "label", id: "lbladdr1", label: "Address1" });
    webix.ui({ container: "divtxtaddr1", view: "text", id: "txtaddr1", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlbladdr2", view: "label", id: "lbladdr2", label: "Address2" });
    webix.ui({ container: "divtxtaddr2", view: "text", id: "txtaddr2", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlbladdr3", view: "label", id: "lbladdr3", label: "Address3" });
    webix.ui({ container: "divtxtaddr3", view: "text", id: "txtaddr3", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlbladdr4", view: "label", id: "lbladdr4", label: "Address4" });
    webix.ui({ container: "divtxtaddr4", view: "text", id: "txtaddr4", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblfax", view: "label", id: "lblfax", label: "Fax" });
    webix.ui({ container: "divtxtfax", view: "text", id: "txtfax", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblemail", view: "label", id: "lblemail", label: "E-mail" });
    webix.ui({ container: "divtxtemail", view: "text", id: "txtemail", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 200 } });

    webix.ui({ container: "divlbladdr5", view: "label",  id: "lbladdr5", label: "Pomaterial Receipt is Applicable,Yes" });
    webix.ui({ container: "divtxtaddr5", view: "checkbox", id: "txtaddr5", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 5 } });

    webix.ui({ container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property", });
    disablectrl();
    

};
function ClearValues() {
    debugger;
    $$("txtlocId").setValue("");
    $$("txtlocname").setValue("");
    $$("txtshortname").setValue("");
    $$("ddlcountid").setValue("");
    $$("txtzip").setValue("");
    $$("txttelno").setValue("");
    $$("txtaddr1").setValue("");
    $$("txtaddr2").setValue("");
    $$("txtaddr3").setValue("");
    $$("txtaddr4").setValue("");
    $$("txtfax").setValue("");
    $$("txtemail").setValue("");
    $$("txtaddr5").setValue("");
}

function enablectrl() {
    debugger;
    $$("txtlocId").enable();
    $$("txtlocname").enable();
    $$("txtshortname").enable();
    $$("ddlcountid").enable();
    $$("txtzip").enable();
    $$("txttelno").enable();
    $$("txtaddr1").enable();
    $$("txtaddr2").enable();
    $$("txtaddr3").enable();
    $$("txtaddr4").enable();
    $$("txtfax").enable();
    $$("txtemail").enable();
    document.getElementById("btnsrcCountry").hidden = false;
    document.getElementById("srchlocid").hidden = true;
    //$$("pomaterial").enable();
};

function disablectrl() {
    debugger;
    $$("txtlocId").disable();
    $$("txtlocname").disable();
    $$("txtshortname").disable();
    $$("ddlcountid").disable();
    $$("txtzip").disable();
    $$("txttelno").disable();
    $$("txtaddr1").disable(); 
    $$("txtaddr2").disable();
    $$("txtaddr3").disable();
    $$("txtaddr4").disable();
    $$("txtfax").disable();
    $$("txtemail").disable();
    //document.getElementById("btnsrcCountry").hidden = true;
    //document.getElementById("srchlocid").hidden = true;
    //$$("pomaterial").enable();
};

function fnRefresh() {
    debugger;
    $("#hdnCurMode").val("");
    ClearValues();
    disablectrl();
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("SAVE").disabled = true;
    
    document.getElementById("btnsrcCountry").hidden = true;
    document.getElementById("srchlocid").hidden = true;
}

function fnNew() {
    debugger;
    $("#hdnCurMode").val("N");

    enablectrl();

    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("btnsrcCountry").hidden = false;
}

function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
    enablectrl();
    fnLoadlocid();
    document.getElementById("NEW").disabled = true;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("SAVE").disabled = false;
    document.getElementById("btnsrcCountry").hidden = false;
    document.getElementById("srchlocid").hidden = false;

}


function IsEmail(email) {
    debugger;
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        webix.message({ type: 'warning', text: 'Invalid Email Address' });
        return false;
    } else {
        return true;
    }
}

function fnValidation() {
    debugger;

    if (($("#hdnCurMode").val() == "N") && ($.trim($$("txtlocId").getValue()) == "")) {
        webix.message({ type: 'warning', text: 'Location Id cannot be empty' });
        webix.UIManager.setFocus($$("txtlocId"));
        return false;
    }
    if (($("#hdnCurMode").val() == "O") && ($.trim($$("txtlocId").getValue()) == "")) {
        webix.message({ type: 'warning', text: 'Select Unit Id' });
        webix.UIManager.setFocus($$("txtlocId"));
        return false;
    }
    
    return true;
};
                          

function serchCountrygrid() {
                                    debugger;
                                    webix.ui({
                                        view: "window",
                                        close: true,
                                        modal: true,
                                        id: "CountryGrd",
                                        head: "COUNTRY SEARCH",
                                        position: "center",
                                        css: "WebIxStyle",
                                        height: 500,
                                        width: 383,
                                        move: true,
                                        body: {
                                            rows: [
                                               {
                                                   view: "datatable",
                                                   id: "gridCountryGrd",
                                                   select: 'row',
                                                   //editable: true,
                                                   css: "webix_header_border",
                                                   //scrollX: false,
                                                   columns: [
                                                           { id: "COUNTRY_ID", header: ['COUNTRY ID', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' },  },
                                                         //  { id: "COUNTRY_NM", header: ['COUNTRY NAME', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                                                            { header: ["COUNTRY NAME", { content: "textFilter" }], id: "COUNTRY_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },

                                                   ],
                                                   data: [],
                                                   on: {


                                                       'onItemDblClick': function (id) {
                                                           debugger;
                                                           var selRow = $$("gridCountryGrd").getSelectedItem();
                                                           //var PkgId = selRow.ID;
                                                           $("#hdnCountry_Id").val("");
                                                           $$("ddlcountid").setValue("");
                                                           //var vCmpId = $$("Property").getValue();  hdnCountry_Id

                                                           //var GrdRow = $$("gridMain").getSelectedItem();
                                                           // GrdRow["COMPANY_NM"] = selRow.COUNTRY_NM;
                                                           $$("ddlcountid").setValue(selRow.COUNTRY_ID);
                                                           // GrdRow["COMPANY_ID"] = selRow.COUNTRY_ID;

                                                           $("#hdnCountry_Id").val(selRow.COUNTRY_ID);
                                                           $$("gridCountryGrd").hide();
                                                           $$("CountryGrd").hide();


                                                       },


                                                   },

                                               },



                                            ],
                                        }

                                    });
};

function fnLoadCountry() {
                                    debugger;
                                    var rowdata = [];

                                    try {
                                        Request = {
                                            REQTYPE: "GET_FNLOADCOUNTRYNM",
                                        }

                                        requestData = JSON.stringify(Request);
                                        requestData = encodeURIComponent(requestData);
                                        $.ajax({
                                            async: true,
                                            url: "/Master/MSTAPI_CALL",
                                            type: 'POST',
                                            data: "request=" + requestData,
                                            success: function (d) {
                                                debugger;
                                                if (d != "" && d != null) {
                                                    rowdata = JSON.parse(d);
                                                    if (rowdata != null && rowdata != "") {

                                                        $$("gridCountryGrd").parse(rowdata);
                                                        $$("gridCountryGrd").refresh();
                                                    }
                                                    else {

                                                    }
                                                }


                                            },

                                        });

                                    }
                                    catch (e) {
                                        console.log(e.message);

                                    }
};

 function serchlocidgrid() {
                                    debugger;
                                    webix.ui({
                                        view: "window",
                                        close: true,
                                        modal: true,
                                        id: "locidgrd",
                                        head: "LOCATION ID SEARCH",
                                        position: "center",
                                        css: "WebIxStyle",
                                        height: 500,
                                        width: 383,
                                        move: true,
                                        body: {
                                            rows: [
                                               {
                                                   view: "datatable",
                                                   id: "gridlocid",
                                                   select: 'row',
                                                   //editable: true,
                                                   css: "webix_header_border",
                                                   //scrollX: false,
                                                   columns: [
                                                           { id: "LOC_ID", header: ['LOCATION ID', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' }, fillspace: true, },
                                                         //  { id: "COUNTRY_NM", header: ['COUNTRY NAME', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                                                            { header: ["LOCATION NAME", ], id: "LOC_NM", width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                                                              { header: "", id: "LOC_SHRT_NM", hidden: true },
                                                                { header: "", id: "ADDR_1", hidden: true },
                                                                  { header: "", id: "ADDR_2", hidden: true },
                                                                    { header: "", id: "ADDR_3", hidden: true },
                                                               { header: "", id: "ADDR_4", hidden: true },
                                                                 { header: "", id: "ZIP_CD", hidden: true },
                                                                 { header: "", id: "COUNTRY_ID", hidden: true },
                                                                 { header: "", id: "PHONE", hidden: true },
                                                                 { header: "", id: "FAX", hidden: true },
                                                                 { header: "", id: "EMAIL", hidden: true },
                                                                 { header: "", id: "PO_APPL_IND", hidden: true },


                                                   ],
                                                   data: [],
                                                   on: {


                                                       'onItemDblClick': function (id) {
                                                           debugger;
                                                           var selRow = $$("gridlocid").getSelectedItem();
                                                           //var PkgId = selRow.ID;
                                                           $("#hdnCountry_Id").val("");
                                                           $$("txtlocId").setValue("");
                                                           //var vCmpId = $$("Property").getValue();  hdnCountry_Id

                                                           //var GrdRow = $$("gridMain").getSelectedItem();
                                                           // GrdRow["COMPANY_NM"] = selRow.COUNTRY_NM;
                                                           $$("txtlocId").setValue(selRow.LOC_ID);
                                                           $$("txtlocname").setValue(selRow.LOC_NM);
                                                           $$("txtshortname").setValue(selRow.LOC_SHRT_NM);
                                                           $$("ddlcountid").setValue(selRow.COUNTRY_ID);
                                                           $$("txtzip").setValue(selRow.ZIP_CD);
                                                           $$("txttelno").setValue(selRow.PHONE);
                                                           $$("txtaddr1").setValue(selRow.ADDR_1);
                                                           $$("txtaddr2").setValue(selRow.ADDR_2);
                                                           $$("txtaddr3").setValue(selRow.ADDR_3);
                                                           $$("txtaddr4").setValue(selRow.ADDR_4);
                                                           $$("txtfax").setValue(selRow.FAX);
                                                           $$("txtemail").setValue(selRow.EMAIL);
                                                           $$("txtaddr5").setValue(selRow.PO_APPL_IND);
                                                           $("#hdnCountry_Id").val(selRow.COUNTRY_ID);
                                                           $$("gridlocid").hide();
                                                           $$("locidgrd").hide();


                                                       },


                                                   },

                                               },



                                            ],
                                        }

                                    });
                                }

function fnLoadlocid() {
                                    debugger;
                                    var rowdata = [];

                                    try {
                                        Request = {
                                            REQTYPE: "GET_FNLOADLOCID",
                                        }

                                        requestData = JSON.stringify(Request);
                                        requestData = encodeURIComponent(requestData);
                                        $.ajax({
                                            async: true,
                                            url: "/Master/MSTAPI_CALL",
                                            type: 'POST',
                                            data: "request=" + requestData,
                                            success: function (d) {
                                                debugger;
                                                if (d != "" && d != null) {
                                                    rowdata = JSON.parse(d);
                                                    if (rowdata != null && rowdata != "") {

                                                        $$("gridlocid").parse(rowdata);
                                                        $$("gridlocid").refresh();
                                                    }
                                                    else {

                                                    }
                                                }


                                            },

                                        });

                                    }
                                    catch (e) {
                                        console.log(e.message);

                                    }
                                };


 function fnddlLocIdChng() {
                                    debugger;
                                    var rowData = [];
                                    var Comp_ID = $$("Property").getValue();
                                    var locid = $$("txtlocId").getValue();
                                    try {
                                        Request = {
                                            REQTYPE: "GET_FNCHANGLOCTID",
                                            Comp_ID: Comp_ID,
                                            LocationId: locid,
                                        }

                                        requestData = JSON.stringify(Request);
                                        requestData = encodeURIComponent(requestData);
                                        $.ajax({
                                            async: true,
                                            url: "/Master/MSTAPI_CALL",
                                            type: 'POST',
                                            data: "request=" + requestData,
                                            success: function (d) {
                                                debugger;
                                                if (d != "" && d != null) {
                                                    rowData = JSON.parse(d);
                                                    if (rowData != null && rowData != "") {

                                                        $$("txtlocname").setValue($.trim(rowData[0]["LOC_NM"]));
                                                        $$("txtshortname").setValue($.trim(rowData[0]["LOC_SHRT_NM"]));
                                                        $$("ddlcountid").setValue($.trim(rowData[0]["COUNTRY_ID"]));
                                                        $$("txtzip").setValue($.trim(rowData[0]["ZIP_CD"]));
                                                        $$("txttelno").setValue($.trim(rowData[0]["PHONE"]));
                                                        $$("txtaddr1").setValue($.trim(rowData[0]["ADDR_1"]));
                                                        $("txtaddr2").val(rowData[0]["ADDR_2"]);
                                                        $$("txtaddr3").setValue($.trim(rowData[0]["ADDR_3"]));
                                                        $$("txtaddr4").setValue($.trim(rowData[0]["ADDR_4"]));
                                                        $$("txtfax").setValue($.trim(rowData[0]["FAX"]));
                                                        $$("txtemail").setValue($.trim(rowData[0]["EMAIL"]));
                                                        $$("txtaddr5").setValue($.trim(rowData[0]["PO_APPL_IND"]));
                      
                                                    }
                                                    else {

                                                    }
                                                }


                                            },

                                        });

                                    }
                                    catch (e) {
                                        console.log(e.message);

                                    }



                                };


  function fnsave() {
                                    debugger;

                                    var bValid = fnValidation();
                                    if (bValid == true) {
                                        if ($("#hdnCurMode").val() == "N") {
                                            var loc_id = $$("txtlocId").getValue();
                                        }
                                        else if ($("#hdnCurMode").val() == "O") {
                                            var loc_id = $$("txtlocId").getValue();
                                        }

                                        if ($.trim($$("txtemail").getValue()) != "") {
                                            var emailvalid = IsEmail($.trim($$("txtemail").getValue()));
                                            if (emailvalid == false) {
                                                return;
                                            }

                                        }

                                        debugger;
                                        try {

                                            Request = {
                                                REQTYPE: "GET_FNSAVECMPLOCMASTER",
                                                LocationId: loc_id,
                                                LocationName: $$("txtlocname").getValue(),
                                                ShortName: $$("txtshortname").getValue(),
                                                CountryId: $$("ddlcountid").getValue(),
                                                Zip: $$("txtzip").getValue(),
                                                TelNo: $$("txttelno").getValue(),
                                                Address1: $$("txtaddr1").getValue(),
                                                Address2: $$("txtaddr2").getValue(),
                                                Address3: $$("txtaddr3").getValue(),
                                                Address4: $$("txtaddr4").getValue(),
                                                Fax: $$("txtfax").getValue(),
                                                Email: $$("txtemail").getValue(),
                                                PomaterialReceiptisApplicable: $$("txtaddr5").getValue(),
               
                                                CurMode: $("#hdnCurMode").val(),
                                                Comp_ID: $$("Property").getValue(),
                                            }

                                            requestData = JSON.stringify(Request);
                                            requestData = encodeURIComponent(requestData);
                                            $.ajax({
                                                async: true,
                                                url: "/Master/MSTAPI_CALL",
                                                type: 'POST',
                                                data: "request=" + requestData,
                                                success: function (data) {
                                                    debugger;
                                                    if (data != "") {
                                                        rowData = JSON.parse(data);
                                                        //if ($.trim(rowData) == "True") {

                                                        //    if ($("#hdnCurMode").val() == "N") {
                               
                                                        //        webix.message({
                                                        //            type: 'warning',
                                                        //            text: "created Successfully",
                                                        //        })
                                                        //        fnRefresh();
                                                        //    }
                                                        //    else {
                              

                                                        //        webix.message({
                                                        //            type: 'warning',
                                                        //            text: "Updated Successfully",
                                                        //        })
                                                        //        fnRefresh();
                                                        //    }


                                                        //if (rowData == "1") {
                                                        //    webix.message({ type: 'success', text: 'Saved Successfully' });
                                                        //    $("#btnRef").click();
                                                        //}
                                                        //else {
                                                        //    webix.message({ type: 'warning', text: 'Operation failed' });
                                                        //    return;
                                                        //}



                                                        if (!rowData) rowData = "";
                                                        if (rowData.Status == "0") {
                                                            webix.message({
                                                                type: 'warning',
                                                                text: rowData.Message,
                                                            })
                                                            bSuc = 0;
                                                            $("#loading").hide();
                                                        }
                                                        else if (rowData.Status == "1") {
                                                            $("#loading").hide();
                                                            if ($("#hdnCurMode").val() == "N") {

                                                                webix.message({
                                                                    type: 'success',
                                                                    text: 'Saved Successfully.',

                                                                })
                                                                 fnRefresh();

                                                            }
                                                            else
                                                            {
                                                                        webix.message({
                                                                            type: 'success',
                                                                            text: "Updated Successfully.",
                                                                        })
                                                                        fnRefresh();

                                                            }



                                                            $("#LoadDIv").hide();
                                                            return;
                                                        }
                                                        
                                                     

                                                        else if ($.trim(rowData) == "false") {
                                                            webix.message({
                                                                type: 'warning',
                                                                text: "Save Failed",
                                                            })
                                                            fnRefresh();
                                                            $("#LoadDIv").hide();
                                                            return;
                                                        }
                                                        else {
                                                            webix.message({
                                                                type: 'warning',
                                                                text: "Operation Failed",
                                                            })
                                                            fnRefresh();
                                                            $("#LoadDIv").hide();
                                                            return;
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
                                

  function fnPropertyLoad(CompId) {
      var dataparam = {};
      var rowData = [];
      Request = {
          REQTYPE: "GET_PROPERTYLOAD",
          COMPID: CompId,
      }

      var DataVal = JSON.stringify(Request);
      $.ajax({
          async: false,
          url: "/Master/MSTAPI_CALL",
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
  };


  
                               
                          
                            
                   
