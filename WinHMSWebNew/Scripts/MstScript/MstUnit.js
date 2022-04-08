var PageLoad = function () {
    webix.ui({ container: "divlblUnitid", view: "label", id: "lblUnitId", label: "Unit Id" });
    webix.ui({ container: "divtxtUnitId", view: "text", id: "txtunitId", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 2 } });
    webix.ui({ container: "divtxtUnitId", view: "richselect", id: "ddlUnitId", on: { onChange: function () { fnddlUnitIdChng(); } } });
    webix.ui({ container: "divlblUnitName", view: "label", id: "lblUnitname", label: "Unit Name" });
    webix.ui({ container: "divtxtUnitName", view: "text", id: "txtunitname", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 60 } });

    webix.ui({ container: "divlblAddr", view: "label", id: "lblAddress", label: "Address" });
    webix.ui({ container: "divtxtAddr1", view: "text", id: "txtAddr1", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblAddr2", view: "label", id: "lblAddress", label: "" });
    webix.ui({ container: "divtxtAddr2", view: "text", id: "txtAddr2", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblAddr3", view: "label", id: "lblAddress", label: "" });
    webix.ui({ container: "divtxtAddr3", view: "text", id: "txtAddr3", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblAddr4", view: "label", id: "lblAddress", label: "" });
    webix.ui({ container: "divtxtAddr4", view: "text", id: "txtAddr4", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblCountry", view: "label", id: "lblCountry", label: "Country" });
    webix.ui({ container: "divtxtCountry", view: "text", id: "txtCountry", maxwidth: 80, type: "text", inputAlign: "left",disabled:true, attributes: { maxlength: 4 } });


    webix.ui({ container: "divlblTeleph", view: "label", id: "lblTelephone", label: "Telephone" });//divSrchGsrForReg
    webix.ui({ container: "divtxtTeleph", view: "text", id: "txtTelephone", maxwidth: 80, type: "text", inputAlign: "left",on: { "onkeypress": function (code, e) { return fnNumericText(code, e); } }, attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblFax", view: "label", id: "lblFax", label: "Fax" });
    webix.ui({ container: "divtxtFax", view: "text", id: "txtFax", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblMobile", view: "label", id: "lblMobile", label: "Mobile" });
    webix.ui({ container: "divtxtMobile", view: "text", id: "txtMobile", maxwidth: 80, type: "text", inputAlign: "left",on: { "onkeypress": function (code, e) { return fnNumericText(code, e); } }, attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblContactPer", view: "label", id: "lblContactPer", label: "Contact Person" });
    webix.ui({ container: "divtxtContactPer", view: "text", id: "txtContactPer", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });


    webix.ui({ container: "divlblEmail", view: "label", id: "lblEmail", label: "Email" });
    webix.ui({ container: "divtxtEmail", view: "text", id: "txtEmail", maxwidth: 80, type: "text", inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblGlDivision", view: "label", id: "lblGlDivision", label: "Gl Division" });
    webix.ui({ container: "divddlGlDivision", view: "richselect", id: "ddlGlDivision", }); //on: { onChange: function () { fnddlGroupName(); } }

    webix.ui({ container: "divlblGstReg", view: "label", id: "lblGstReg", label: "Gst for Registration" });
    webix.ui({ container: "divtxtGstReg", view: "text", id: "txtGstReg", maxwidth: 80, type: "text", disabled: true, inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblGstIn", view: "label", id: "lblGstIn", label: "GstIn" });
    webix.ui({ container: "divtxtGstIn", view: "text", id: "txtGstIn", maxwidth: 80, type: "text", disabled: true, inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divlblState", view: "label", id: "lblState", label: "State" });
    webix.ui({ container: "divtxtState", view: "text", id: "txtState", maxwidth: 80, type: "text", disabled: true, inputAlign: "left", attributes: { maxlength: 40 } });

    webix.ui({ container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property", });


};

function clrControl() {
    debugger;
    $$("txtunitId").setValue("");
    $$("txtunitname").setValue("");
    $$("txtAddr1").setValue("");
    $$("txtAddr2").setValue("");
    $$("txtAddr3").setValue("");
    $$("txtAddr4").setValue("");
    $$("txtCountry").setValue("");
    $("#hdnCountry_Id").val("");
    $$("txtTelephone").setValue("");
    $$("txtFax").setValue("");
    $$("txtMobile").setValue("");
    $$("txtContactPer").setValue("");
    $$("txtEmail").setValue("");
    $$("ddlGlDivision").setValue("");
    $$("txtGstReg").setValue("");
    $$("txtGstIn").setValue("");
    $$("txtState").setValue("");
    $$("ddlUnitId").setValue("");
}

function disablectrl() {
    debugger;
    $$("txtunitId").show();
    $$("ddlUnitId").hide();
    $$("txtunitId").disable();
    $$("txtunitname").disable();
    $$("txtAddr1").disable();
    $$("txtAddr2").disable();
    $$("txtAddr3").disable();
    $$("txtAddr4").disable();
    $$("txtCountry").disable();
    //$("#hdnCountry_Id").val("");
    $$("txtTelephone").disable();
    $$("txtFax").disable();
    $$("txtMobile").disable();
    $$("txtContactPer").disable();
    $$("txtEmail").disable();
    $$("ddlGlDivision").disable();
 
}

function Enablectrl() {
    debugger;
    $$("txtunitId").enable();
    $$("txtunitname").enable();
    $$("txtAddr1").enable();
    $$("txtAddr2").enable();
    $$("txtAddr3").enable();
    $$("txtAddr4").enable();
    $$("txtCountry").enable();
    //$("#hdnCountry_Id").val("");
    $$("txtTelephone").enable();
    $$("txtFax").enable();
    $$("txtMobile").enable();
    $$("txtContactPer").enable();
    $$("txtEmail").enable();
    $$("ddlGlDivision").enable();

    document.getElementById("btnsrcCountry").hidden = false;
    document.getElementById("btnsrcGstReg").hidden = false;
}


function fnRefresh() {
    $("#hdnCurMode").val("");
    clrControl();
    disablectrl();
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("SAVE").disabled = true;
    document.getElementById("btnsrcCountry").hidden = true;
    document.getElementById("btnsrcGstReg").hidden = true;
}

function fnddlUnitIdChng() {
    debugger;
    var rowData = [];
    var Comp_ID = $$("Property").getValue();
    var unitid = $$("ddlUnitId").getValue();
    try {
        Request = {
            REQTYPE: "GET_FNCHANGUNITID",
            Comp_ID: Comp_ID,
            UnitId: unitid,
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

                        $$("txtunitname").setValue($.trim(rowData[0]["UNIT_NM"]));
                        $$("txtAddr1").setValue($.trim(rowData[0]["A1"]));
                        $$("txtAddr2").setValue($.trim(rowData[0]["A2"]));
                        $$("txtAddr3").setValue($.trim(rowData[0]["A3"]));
                        $$("txtAddr4").setValue($.trim(rowData[0]["A4"]));
                        $$("txtCountry").setValue($.trim(rowData[0]["COUNTRY_NM"]));
                        $("#hdnCountry_Id").val(rowData[0]["C_ID"]);
                        $$("txtTelephone").setValue($.trim(rowData[0]["T_NO"]));
                        $$("txtFax").setValue($.trim(rowData[0]["F_NO"]));
                        $$("txtMobile").setValue($.trim(rowData[0]["M_NO"]));
                        $$("txtContactPer").setValue($.trim(rowData[0]["C_P"]));
                        $$("txtEmail").setValue($.trim(rowData[0]["E_ID"]));
                        $$("ddlGlDivision").setValue(rowData[0]["DIV_ID"]);
                        $$("txtGstReg").setValue($.trim(rowData[0]["TX_RG_CD"]));
                        $$("txtGstIn").setValue($.trim(rowData[0]["TX_RG_NO"]));
                        $$("txtState").setValue($.trim(rowData[0]["ST_NM"]));
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


function fnNumericText(code, e) {
    debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    if (charCode == 46 || charCode == 37 || charCode == 39) {
        return true
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        debugger;
        return true;
    }
}

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


function fnsave() {
    debugger;

    var bValid = fnValidation();
    if (bValid == true) {
        if ($("#hdnCurMode").val() == "N") {
            var unit_id= $$("txtunitId").getValue();
        }
        else if($("#hdnCurMode").val() == "O"){
            var unit_id= $$("ddlUnitId").getValue();
        }
        if ($.trim($$("txtEmail").getValue()) != "") {
            var emailvalid = IsEmail($.trim($$("txtEmail").getValue()));
            if (emailvalid == false) {
                return;
            }
         
        }
        debugger;
        try {

            Request = {
                REQTYPE: "GET_FNSAVEUNITMASTER",
                UnitId: unit_id,
                UnitName: $$("txtunitname").getValue(),
                Address1: $$("txtAddr1").getValue(),
                Address2: $$("txtAddr2").getValue(),
                Address3: $$("txtAddr3").getValue(),
                Address4: $$("txtAddr4").getValue(),
                Country:  $("#hdnCountry_Id").val(),
                Telephone: $$("txtTelephone").getValue(),
                Fax: $$("txtFax").getValue(),
                Mobile: $$("txtMobile").getValue(),
                ContactPerson: $$("txtContactPer").getValue(),
                Email: $$("txtEmail").getValue(),
                GlDivision: $$("ddlGlDivision").getValue(),
                GstForReg: $$("txtGstReg").getValue(),
                GSTIN: $$("txtGstIn").getValue(),
                State: $$("txtState").getValue(),
                CurMode : $("#hdnCurMode").val(),
                Comp_ID : $$("Property").getValue(),
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
                        if ($.trim(rowData) == "True") {

                            if ($("#hdnCurMode").val() == "N") {
                                //AlertMessage("created Successfully");
                             
                                webix.message({
                                    type: 'warning',
                                    text: "created Successfully",
                                })
                                fnRefresh();
                            }
                            else {
                                //AlertMessage("Updated Successfully");
                               
                                webix.message({
                                    type: 'warning',
                                    text: "Updated Successfully",
                                })
                                fnRefresh();
                            }

                            $("#LoadDIv").hide();
                            return;
                        }
                        else if ($.trim(rowData) == "Id already exists!...") {
                            webix.message({
                                type: 'warning',
                                text: "Id already exists!...",
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
    
    if ( ($("#hdnCurMode").val()=="N") && ($.trim($$("txtunitId").getValue()) == "")) {
        webix.message({ type: 'warning', text: 'Unit Id cannot be empty' });
        webix.UIManager.setFocus($$("txtunitId"));
        return false;
    }
    if (($("#hdnCurMode").val() == "O") && ($.trim($$("ddlUnitId").getValue()) == "")) {
        webix.message({ type: 'warning', text: 'Select Unit Id' });
        webix.UIManager.setFocus($$("ddlUnitId"));
        return false;
    }
  

    return true;
}

function fnNew() {
    $("#hdnCurMode").val("N");
    fnLoadGlDivision();
    Enablectrl();
    document.getElementById("NEW").disabled = false;
    document.getElementById("OPEN").disabled = true;
    document.getElementById("SAVE").disabled = false;
}

function fnOpen() {
    debugger;
    $("#hdnCurMode").val("O");
    fnLoadGlDivision();
    Enablectrl();
    $$("txtunitId").hide();
    $$("ddlUnitId").show();
    fnddlUnitId();
    document.getElementById("NEW").disabled = true;
    document.getElementById("OPEN").disabled = false;
    document.getElementById("SAVE").disabled = false;

}

function fnddlUnitId() {
    debugger;
    var rowdata = [];
    var Comp_ID = $$("Property").getValue();
    try {
        Request = {
            REQTYPE: "GET_FNLOADUNITID",
            Comp_ID: Comp_ID,
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

                        $$("ddlUnitId").define("options", rowdata);
                        $$("ddlUnitId").refresh();
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
                           { id: "COUNTRY_ID", header: ['COUNTRY ID', ], width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
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
                           $$("txtCountry").setValue("");
                           //var vCmpId = $$("Property").getValue();  hdnCountry_Id

                           //var GrdRow = $$("gridMain").getSelectedItem();
                          // GrdRow["COMPANY_NM"] = selRow.COUNTRY_NM;
                           $$("txtCountry").setValue(selRow.COUNTRY_NM);
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
}


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


function serchGsrforReg() {
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GsrforRegGrd",
        head: "GST For Registration",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 483,
        move: true,
        body: {
            rows: [
               {
                   view: "datatable",
                   id: "gridGstRegGrd",
                   select: 'row',
                   //editable: true,
                   css: "webix_header_border",
                   //scrollX: false,
                   columns: [
                           { id: "TX_RG_CD", header: ['Tax Reg Code', ], width: 50, css: { 'text-align': 'left ! important' }, },
                           { id: "TX_RG_NO", header: ['Reg No', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { id: "ST_NM", header: ['State Nm', ], width: 210, css: { 'text-align': 'left ! important' }, fillspace: true, hidden: true },
                           { id: "Date", header: ['Date', ], width: 70, css: { 'text-align': 'left ! important' }, fillspace: true, },
                           { id: "TX_RG_NM", header: ['Name', ], width: 280, css: { 'text-align': 'left ! important' }, fillspace: true, },

                   ],
                   data: [],
                   on: {


                       'onItemDblClick': function (id) {
                           debugger;
                           var selRow = $$("gridGstRegGrd").getSelectedItem();
                           $$("txtGstReg").setValue("");
                           $$("txtGstIn").setValue("");
                           $$("txtState").setValue("");
                           $$("txtGstReg").setValue(selRow.TX_RG_CD);
                           $$("txtGstIn").setValue(selRow.TX_RG_NO);
                           $$("txtState").setValue(selRow.ST_NM);
             

                           $("#hdnCountry_Id").val(selRow.COUNTRY_ID);
                           $$("gridGstRegGrd").hide();
                           $$("GsrforRegGrd").hide();


                       },


                   },

               },



            ],
        }

    });
}


function fnLoadGstReg() {
    debugger;
    var rowdata = [];

    try {
        Request = {
            REQTYPE: "GET_FNLOADGSTFORREG",
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

                        $$("gridGstRegGrd").parse(rowdata);
                        $$("gridGstRegGrd").refresh();
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

function fnLoadGlDivision() {
    debugger;
    var rowdata = [];
    var Comp_ID = $$("Property").getValue();
    try {
        Request = {
            REQTYPE: "GET_FNLOADGLDIVISION",
            Comp_ID: Comp_ID,
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

                        $$("ddlGlDivision").define("options", rowdata);
                        $$("ddlGlDivision").refresh();
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


